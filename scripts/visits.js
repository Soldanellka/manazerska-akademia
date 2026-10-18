'use strict';

/* ============================================================
   scripts/visits.js
   POČÍTANIE OTVORENÍ APLIKÁCIE (B2, 2026-10-18)

   Počíta sa JEDINÁ vec: koľkokrát sa appka za deň otvorila.
     analyticsDaily/{YYYY-MM-DD}/visits  – celé číslo, transakcia

   ⚠️ ŽIADNA ZNAČKA V ZARIADENÍ. Modul nič neukladá do localStorage,
   sessionStorage ani do cookies a prezývku vôbec nevidí – nedostane
   ju ako parameter a nečíta ju. Preto je veta v Zásadách „neukladáme
   vo vašom zariadení žiadny identifikátor“ pravdivá bez výnimiek.

   ⚠️ PREČO JE TO INAK NEŽ PREDTÝM. Predchádzajúca analytika
   (scripts/analytics.js, zmazaná v tomto commite) zapisovala
   analytics/{prezývka} s dátumami návštev a rozlišovala „nových“ od
   „vracajúcich sa“ podľa toho, či taký záznam v databáze už bol. Dve
   chyby naraz: bol to verejne čitateľný záznam o prítomnosti
   konkrétneho človeka v čase a zároveň sa vôbec nepočítali otvorenia
   bez prezývky – teda väčšina návštev. Nové počítanie ráta KAŽDÉ
   otvorenie a o nikom si nepamätá nič.

   ⚠️ NIČ NESMIE ZDRŽAŤ. Volanie je bez await, celé v try/catch; keď
   Firebase nie je, zlyhá ticho do konzoly a appka beží ďalej.
============================================================ */

import { runTransaction, ref, get, update }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

/* ⚠️ NEZAPÍNAŤ. Keby sme raz chceli rozlišovať jednotlivých
   návštevníkov (nový verzus vracajúci sa), musela by appka uložiť do
   zariadenia značku. Taká značka nie je nevyhnutná na fungovanie
   služby, takže podľa predpisov o ukladaní údajov v zariadení
   vyžaduje SÚHLAS – teda súhlasovú lištu hneď na úvode a úpravu
   Zásad. Prepnutie tejto konštanty samo osebe nič nezapne; je to
   značka miesta, kde by sa taká funkcia pridávala, aby bolo jasné,
   čo k nej patrí. */
export const REZIM_S_IDENTIFIKATOROM = false;

const DEN_MS = 24 * 60 * 60 * 1000;

function getDb() { return window.db || null; }

/* Rovnaký pojem „dňa“ ako v ekonomike (economyConfig.todayKey) – UTC. */
function dnesKluc() { return new Date().toISOString().slice(0, 10); }

function klucPred(dni) {
  return new Date(Date.now() - dni * DEN_MS).toISOString().slice(0, 10);
}

/* ============================================================
   ZÁPIS – volá sa raz pri načítaní appky, MIMO akejkoľvek vetvy
   „ak má hráč prezývku“. Žiadny parameter, žiadna identita.
============================================================ */
export function logOtvorenie() {
  try {
    const db = getDb();
    if (!db) return;
    runTransaction(ref(db, `analyticsDaily/${dnesKluc()}/visits`), (cur) => (cur || 0) + 1)
      .catch(e => console.warn('⚠️ visits: zápis zlyhal', e));
  } catch (e) {
    console.warn('⚠️ visits: zápis zlyhal', e);
  }
}

/* ============================================================
   PREHĽAD PRE ADMIN PANEL – jedno čítanie celej vetvy.
   Vracia dnešok, súčty za 7 a 30 dní a posledných 14 dní na graf.
============================================================ */
export async function getVisitsOverview() {
  const db = getDb();
  if (!db) return null;

  const snap = await get(ref(db, 'analyticsDaily'));
  const daily = snap.exists() ? snap.val() : {};
  const visitsZaDen = (key) => {
    const d = daily[key];
    return (d && typeof d.visits === 'number') ? d.visits : 0;
  };

  const sucet = (dni) => {
    let s = 0;
    for (let i = 0; i < dni; i++) s += visitsZaDen(klucPred(i));
    return s;
  };

  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const day = klucPred(i);
    last14.push({ day, visits: visitsZaDen(day) });
  }

  const dni = Object.keys(daily).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).sort();

  return {
    dnes: visitsZaDen(dnesKluc()),
    za7: sucet(7),
    za30: sucet(30),
    last14,
    najstarsiDen: dni[0] || null,
    pocetDni: dni.length
  };
}

/* ============================================================
   UPRATANIE STARÝCH DNÍ – len na vyžiadanie z admin panelu,
   žiadna automatika. Zmaže dni staršie ako 12 mesiacov.
============================================================ */
export async function zmazStareDni(mesiace = 12) {
  const db = getDb();
  if (!db) return { zmazane: 0 };

  const hranica = klucPred(Math.round(mesiace * 30.4));
  const snap = await get(ref(db, 'analyticsDaily'));
  const daily = snap.exists() ? snap.val() : {};
  const naZmazanie = Object.keys(daily).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k) && k < hranica);
  if (!naZmazanie.length) return { zmazane: 0, hranica };

  const updates = {};
  naZmazanie.forEach(k => { updates[k] = null; });
  await update(ref(db, 'analyticsDaily'), updates);
  return { zmazane: naZmazanie.length, hranica };
}

/* Skloňovanie: 1 otvorenie, 2–4 otvorenia, 5+ otvorení. */
export function otvoreniaTvar(n) {
  if (n === 1) return `${n} otvorenie`;
  if (n >= 2 && n <= 4) return `${n} otvorenia`;
  return `${n} otvorení`;
}
