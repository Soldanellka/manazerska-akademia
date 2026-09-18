'use strict';

/* ============================================================
   scripts/trening.js
   Tréning spätnej väzby (fáza E) – hráč dostane pracovnú situáciu,
   napíše vlastnými slovami, čo by povedal, a traja mentori (obsah,
   forma, vzťah) povedia, čo funguje a čo by odpoveď posilnilo.

   Samostatný modul – Štátnicová sieň (scripts/statnice.js) ostáva
   skrytá a nedotknutá.

   ZÁSADY (rozhodnutia zadávateľky, 2026-09-17):
   - Mentori nedávajú známku. Do Môj progres sa nezapisuje nič.
   - Energia (ENERGY.TRENING) aj odmena (REWARDS.TRENING_ATTEMPT) sa
     pohnú AŽ PO úspešnej odpovedi mentorov – pri zlyhaní AI ani pri
     odpovedi mimo témy hráč nič nezaplatí a nič nedostane. Kredity sa
     tak nedajú zbierať prázdnym poľom ani zlyhanými volaniami.
   - Odmena je rovnaká za každý ohodnotený pokus, nie za kvalitu; ide
     cez econAward BEZ skipCap (denný strop).
   - Vzorové odpovede sú len na serveri (api/_trening-kalibracia.js),
     klient ich nikdy nedostane.
============================================================ */

import { econAward, econEnergyLeft, econEnergyMissingMsg, econSpendEnergy, ECONOMY_CONFIG } from './economy.js';
import { escapeHtml } from '../core.js';
import { showRewardToast } from '../ui.js';

const SITUACIE_URL = 'obsah/trening/situacie.json';
const ENDPOINT = '/api/mentor-feedback';
const REQUEST_TIMEOUT_MS = 25000; // server má 20 s na AI + načítanie obsahu
const MAX_CHARS = 1500;           // rovnaké ako MAX_ANSWER_LENGTH v api/mentor-feedback.js

// Poradie oblastí ako v data.js.
const OBLASTI = ['Asertivita', 'Spätná väzba', 'Ja-výroky', 'Komunikačné polohy', 'Poznávanie druhých', 'Aktívne počúvanie'];

/* Mentori – na karte je len meno; kontrolné otázky sa ukážu AŽ POD
   hodnotením ako checklist na ďalší pokus (nie nápoveda dopredu).
   Znenie otázok je rodovo neutrálne (návrh zadávateľky). Podrobné
   kritériá sú v prompte na serveri. */
const MENTORI = [
  { key: 'obsah', emoji: '🎯', meno: 'Mentor obsahu', otazka: 'Je v tom konkrétna situácia alebo správanie — nie povaha človeka?' },
  { key: 'forma', emoji: '✍️', meno: 'Mentor formy', otazka: 'Je to Ja-výrok: fakt, pocit, potreba? Bez „vždy“ a „nikdy“?' },
  { key: 'vztah', emoji: '🤝', meno: 'Mentor vzťahu', otazka: 'Je v tom priestor na reakciu, alebo je to rozsudok?' }
];

const FAIL_MSG = 'Mentori sa teraz neozvali, skús to o chvíľu — tvoja odpoveď ostala v poli.';

let overlayEl = null;
let opening = false;
let situacieCache = null;

function getNick() { return localStorage.getItem('playerNick') || null; }
function energyCost() { return ECONOMY_CONFIG.ENERGY.TRENING; }
function minWords() { return ECONOMY_CONFIG.TRENING.MIN_WORDS; }
function minChars() { return ECONOMY_CONFIG.TRENING.MIN_CHARS; }

// Rovnaké počítanie ako countWords v api/mentor-feedback.js.
function countWords(text) {
  return String(text || '').trim().split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w)).length;
}
function isLongEnough(text) {
  const t = String(text || '').trim();
  return t.length >= minChars() && countWords(t) >= minWords();
}

async function loadSituacie() {
  if (situacieCache) return situacieCache;
  const res = await fetch(SITUACIE_URL, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`situacie.json HTTP ${res.status}`);
  const data = await res.json();
  const list = (data.situacie || []).filter(s => s && s.id && s.oblast && s.zadanie);
  if (!list.length) throw new Error('situacie.json je prázdny');
  situacieCache = list;
  return list;
}

function pickRandom(list, avoidId) {
  const pool = list.length > 1 ? list.filter(s => s.id !== avoidId) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function closeTrening() {
  if (overlayEl) { overlayEl.remove(); overlayEl = null; }
  document.body.style.overflow = '';
}

export async function openTrening() {
  if (opening || overlayEl) return;
  opening = true;
  try {
    // Energia sa overí už pri otvorení, nech hráč nepíše zbytočne.
    // Odpočíta sa až po úspešnej odpovedi mentorov (viď odoslat()).
    const left = await econEnergyLeft();
    if (left < Math.abs(energyCost())) {
      showRewardToast(econEnergyMissingMsg(energyCost(), left));
      return;
    }
    let situacie;
    try {
      situacie = await loadSituacie();
    } catch (e) {
      console.error('[TRÉNING] situácie sa nenačítali', e);
      showRewardToast('💬 Tréning sa teraz nepodarilo načítať, skús to o chvíľu.');
      return;
    }
    render(situacie);
  } finally {
    opening = false;
  }
}

function render(situacie) {
  closeTrening();
  overlayEl = document.createElement('div');
  overlayEl.className = 'avatar-modal trening-modal';
  overlayEl.setAttribute('role', 'dialog');
  overlayEl.setAttribute('aria-modal', 'true');
  overlayEl.setAttribute('aria-labelledby', 'treningTitle');
  const oblastiSoSituaciou = OBLASTI.filter(o => situacie.some(s => s.oblast === o));
  overlayEl.innerHTML = `
    <div class="avatar-panel game-panel trening-panel">
      <div class="game-panel-header">
        <h3 id="treningTitle">💬 Tréning spätnej väzby</h3>
        <button class="btn" type="button" data-t="close">Zavrieť</button>
      </div>
      <p class="small muted trening-intro">Vyber si oblasť alebo náhodnú situáciu. Napíš vlastnými slovami, čo povieš — traja mentori ti povedia, čo funguje a čo by odpoveď posilnilo. Známky tu nie sú.</p>
      <div class="list trening-oblasti" role="group" aria-label="Oblasť">
        ${oblastiSoSituaciou.map(o => `<button class="chip" type="button" data-oblast="${escapeHtml(o)}">${escapeHtml(o)}</button>`).join('')}
        <button class="chip" type="button" data-oblast="">🎲 Náhodná</button>
      </div>
      <div data-t="body" class="trening-body"></div>
    </div>`;
  document.body.appendChild(overlayEl);
  document.body.style.overflow = 'hidden';

  const state = { situacie, oblast: null, situacia: null, sending: false };
  overlayEl.querySelector('[data-t="close"]').onclick = closeTrening;
  overlayEl.querySelectorAll('[data-oblast]').forEach(btn => {
    btn.onclick = () => {
      state.oblast = btn.dataset.oblast || null;
      overlayEl.querySelectorAll('[data-oblast]').forEach(b => b.classList.toggle('active', b === btn));
      novaSituacia(state);
    };
  });
  overlayEl.querySelector('[data-t="body"]').innerHTML =
    '<div class="small muted trening-hint">👆 Začni výberom oblasti.</div>';
}

function novaSituacia(state) {
  const pool = state.oblast ? state.situacie.filter(s => s.oblast === state.oblast) : state.situacie;
  state.situacia = pickRandom(pool, state.situacia && state.situacia.id);
  renderPisanie(state, '');
}

function situaciaCard(s) {
  return `
    <div class="trening-situacia">
      <div class="trening-situacia-meta">${escapeHtml(s.oblast)} · ${escapeHtml(s.nazov || '')}</div>
      <div class="trening-situacia-text">${escapeHtml(s.zadanie)}</div>
    </div>`;
}

function renderPisanie(state, text, chyba = '') {
  if (!overlayEl) return;
  const body = overlayEl.querySelector('[data-t="body"]');
  body.innerHTML = `
    ${situaciaCard(state.situacia)}
    <label class="trening-label" for="treningOdpoved">Tvoja odpoveď</label>
    <textarea id="treningOdpoved" class="trening-input" maxlength="${MAX_CHARS}" rows="5"
      placeholder="Napíš, čo povieš — vlastnými slovami."></textarea>
    <div class="trening-counter small muted" data-t="counter" aria-live="polite"></div>
    ${chyba ? `<div class="trening-error" role="alert">${escapeHtml(chyba)}</div>` : ''}
    <div class="trening-actions">
      <button class="btn btn-primary" type="button" data-t="send">Odoslať mentorom · ⚡ ${Math.abs(energyCost())}</button>
      <button class="btn" type="button" data-t="other">Iná situácia</button>
    </div>
    <div class="small muted trening-cost-note">Energia sa odpočíta a ${ECONOMY_CONFIG.REWARDS.TRENING_ATTEMPT} 🪙 pripíše až vtedy, keď mentori odpovedia.</div>`;

  const ta = body.querySelector('#treningOdpoved');
  const sendBtn = body.querySelector('[data-t="send"]');
  const counter = body.querySelector('[data-t="counter"]');
  ta.value = text;
  const tvar = (n, jeden, dva, pat) => `${n} ${n === 1 ? jeden : (n >= 2 && n <= 4 ? dva : pat)}`;
  const update = () => {
    const w = countWords(ta.value);
    const ok = isLongEnough(ta.value);
    sendBtn.disabled = !ok || state.sending;
    counter.textContent = ok
      ? tvar(w, 'slovo', 'slová', 'slov')
      : `Aspoň ${minWords()} slová a ${minChars()} znakov – zatiaľ ${tvar(w, 'slovo', 'slová', 'slov')}, ${tvar(ta.value.trim().length, 'znak', 'znaky', 'znakov')}.`;
  };
  ta.addEventListener('input', update);
  update();
  sendBtn.onclick = () => odoslat(state, ta.value);
  body.querySelector('[data-t="other"]').onclick = () => novaSituacia(state);
  ta.focus({ preventScroll: true });
}

async function callMentors(situaciaId, odpoved) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ situaciaId, odpoved }),
      signal: controller.signal
    });
    let data = null;
    try { data = await res.json(); } catch (e) { /* nižšie ako zlyhanie */ }
    return { status: res.status, data };
  } finally {
    clearTimeout(timeoutId);
  }
}

function isValidResult(d) {
  if (!d || d.ok !== true) return false;
  if (d.mimoTemy === true) return typeof d.vyzva === 'string';
  const m = d.mentori;
  return !!m && MENTORI.every(x => m[x.key] && typeof m[x.key].funguje === 'string' && typeof m[x.key].posilni === 'string');
}

async function odoslat(state, text) {
  if (state.sending) return;
  const odpoved = String(text || '').trim();
  if (!isLongEnough(odpoved)) return; // tlačidlo je vtedy aj tak neaktívne
  const situacia = state.situacia;

  // Energia sa overí aj pred volaním AI – inak by sa dalo hodnotenie
  // získavať bez energie (odpočet je až po odpovedi).
  const left = await econEnergyLeft();
  if (left < Math.abs(energyCost())) {
    renderPisanie(state, text, econEnergyMissingMsg(energyCost(), left));
    return;
  }

  state.sending = true;
  const body = overlayEl && overlayEl.querySelector('[data-t="body"]');
  if (body) {
    body.innerHTML = `${situaciaCard(situacia)}
      <div class="trening-wait" role="status">🎯 ✍️ 🤝 Mentori čítajú tvoju odpoveď…</div>`;
  }

  let result;
  try {
    result = await callMentors(situacia.id, odpoved);
  } catch (e) {
    console.warn('[TRÉNING] volanie mentorov zlyhalo', e);
    result = null;
  }
  state.sending = false;
  if (!overlayEl) return; // hráč medzitým zavrel – nič sa neúčtuje

  if (!result || !isValidResult(result.data)) {
    // 400/429 so zrozumiteľnou hláškou servera (krátka odpoveď, príliš veľa
    // pokusov) ukážeme priamo; všetko ostatné je „mentori sa neozvali“.
    const serverMsg = result && result.data && result.data.error;
    const msg = result && (result.status === 400 || result.status === 429) && serverMsg ? serverMsg : FAIL_MSG;
    if (result) console.warn('[TRÉNING] mentori nevrátili hodnotenie', result.status, serverMsg || '');
    renderPisanie(state, text, msg);
    return;
  }

  if (result.data.mimoTemy) {
    // Odpoveď mimo témy nie je pokus – žiadna energia, žiadna odmena.
    renderPisanie(state, text, result.data.vyzva);
    return;
  }

  const nick = getNick();
  const spent = await econSpendEnergy(nick, energyCost(), `tréning spätnej väzby – ${situacia.id}`);
  let reward = null;
  if (spent && nick) {
    try {
      reward = await econAward(nick, ECONOMY_CONFIG.REWARDS.TRENING_ATTEMPT, `tréning spätnej väzby – ${situacia.id}`);
    } catch (e) {
      console.warn('[TRÉNING] odmena zlyhala', e);
    }
  }
  if (reward !== null && reward !== undefined) {
    showRewardToast(`+${ECONOMY_CONFIG.REWARDS.TRENING_ATTEMPT} 🪙 za pokus v tréningu`);
  }
  renderVysledok(state, text, result.data.mentori, { spent, rewarded: reward !== null && reward !== undefined, nick });
}

function renderVysledok(state, text, mentori, { spent, rewarded, nick }) {
  if (!overlayEl) return;
  const body = overlayEl.querySelector('[data-t="body"]');
  const rewardLine = rewarded
    ? `+${ECONOMY_CONFIG.REWARDS.TRENING_ATTEMPT} 🪙 za pokus`
    : (!nick ? 'Kredity sa pripisujú len s nickom.' : (spent ? 'Denný strop kreditov je dnes už naplnený.' : ''));
  body.innerHTML = `
    ${situaciaCard(state.situacia)}
    <div class="trening-moja">
      <div class="trening-label">Tvoja odpoveď</div>
      <div class="trening-moja-text">${escapeHtml(String(text).trim())}</div>
    </div>
    <div class="trening-mentori">
      ${MENTORI.map(m => `
        <div class="trening-mentor">
          <div class="trening-mentor-meno"><span aria-hidden="true">${m.emoji}</span> ${m.meno}</div>
          <div class="trening-mentor-riadok"><strong>Čo funguje:</strong> ${escapeHtml(mentori[m.key].funguje)}</div>
          <div class="trening-mentor-riadok"><strong>Čo by to posilnilo:</strong> ${escapeHtml(mentori[m.key].posilni)}</div>
        </div>`).join('')}
    </div>
    <p class="small muted trening-pohlad">Aj experti formulujú spätnú väzbu nedokonale. Ak s mentorom nesúhlasíš, je to v poriadku — mentor je pohľad, nie rozsudok.</p>
    <div class="trening-checklist">
      <div class="trening-label">Otázky na ďalší pokus:</div>
      <ul>${MENTORI.map(m => `<li><span aria-hidden="true">${m.emoji}</span> ${escapeHtml(m.otazka)}</li>`).join('')}</ul>
    </div>
    ${rewardLine ? `<div class="small trening-reward">${escapeHtml(rewardLine)}</div>` : ''}
    <div class="trening-actions">
      <button class="btn btn-primary" type="button" data-t="again">Skúsiť znova</button>
      <button class="btn" type="button" data-t="other">Iná situácia</button>
    </div>`;
  body.querySelector('[data-t="again"]').onclick = () => renderPisanie(state, text);
  body.querySelector('[data-t="other"]').onclick = () => novaSituacia(state);
  body.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
