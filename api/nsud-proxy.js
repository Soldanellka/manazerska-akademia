'use strict';

/* ============================================================
   api/nsud-proxy.js — Vercel Serverless Function

   Tenký GET proxy pre open-data API Najvyššieho súdu SR
   (https://www.nsud.sk/ws/opendata.php). Dôvod existencie: API
   samo o sebe nepridáva Access-Control-Allow-Origin hlavičku
   (overené naživo z prehliadača pri diagnostike – fetch skončí
   ako "Failed to fetch", no-cors fetch vráti opaque response),
   takže čisto klientský fetch naň z LexArena stránky prehliadač
   zablokuje. Tento endpoint beží na tej istej doméne ako appka
   (klient volá fetch('/api/nsud-proxy?...') relatívnou cestou),
   teda z pohľadu prehliadača je to same-origin – žiadny CORS
   preflight, žiadne Access-Control-* hlavičky netreba (rovnaká
   situácia ako api/grade-answer.js, pozri jeho hlavičkový komentár).

   Žiadny LLM, žiadny § náklad, žiadny API kľúč – NS SR API je
   verejné a zadarmo. Endpoint iba prepošle presne dve akcie:
     GET /api/nsud-proxy?action=search&term=<reťazec>
       → https://www.nsud.sk/ws/opendata.php?searchDecision&art_obsah=<reťazec>
     GET /api/nsud-proxy?action=detail&id=<číslo>
       → https://www.nsud.sk/ws/opendata.php?getDecision&id=<číslo>

   ⚠️ SSRF: cieľová URL sa skladá VÝHRADNE zo server-side konštanty
   NSUD_BASE + validovaný `term`/`id` – klient nikdy nedodáva žiadnu
   URL ani jej časť mimo týchto dvoch validovaných parametrov, takže
   nemá spôsob, ako endpoint prinútiť volať iný cieľ než nsud.sk.

   ⚠️ OCHRANA PRED ZNEUŽITÍM – rovnaké dve vrstvy ako
   api/grade-answer.js, v tom istom poradí (najlacnejšie/najskôr
   zamietajúce prvé). Bez limitu dĺžky vstupu v štýle
   MAX_SUMMARY_LENGTH (netreba – žiadny LLM náklad, ktorý by dlhý
   vstup nafúkol), namiesto toho jednoduchý MAX_TERM_LENGTH nižšie,
   aby niekto neposlal absurdne dlhý query string:
   1. Rate limit per IP (rovnaký best-effort Map vzor, POZOR na
      poznámku pri rateLimitMap – neprežije cold start ani
      paralelné inštancie).
   2. Origin check (ALLOWED_ORIGINS) – rovnaký zoznam ako
      grade-answer.js.
   Rate limit je tu voľnejší (60/min namiesto 10/min) – jediné
   kliknutie na inštitút v scripts/judikatura.js vyvolá až ~17
   volaní tohto endpointu naraz (2 searchDecision + do 15
   getDecision pre inštitúty s dvomi termínmi v skupine), takže
   10/min by blokoval aj úplne bežné jednotlivé prezeranie appky.
============================================================ */

const NSUD_BASE = 'https://www.nsud.sk/ws/opendata.php';
const REQUEST_TIMEOUT_MS = 15000;
const MAX_TERM_LENGTH = 100;

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minúta
const RATE_LIMIT_MAX_REQUESTS = 60;
const rateLimitMap = new Map();

// Rovnaký zoznam ako api/grade-answer.js – pozri jeho komentár pri
// ALLOWED_ORIGINS, prečo práve tieto tri pôvody.
const ALLOWED_ORIGINS = new Set([
  'https://www.lexarena.sk',
  'https://lexarena.sk',
  'https://lex-arena-seven.vercel.app'
]);

function isAllowedOrigin(req) {
  const origin = req.headers['origin'];
  if (origin) return ALLOWED_ORIGINS.has(origin);
  const referer = req.headers['referer'];
  if (referer) {
    try {
      return ALLOWED_ORIGINS.has(new URL(referer).origin);
    } catch (e) {
      return false;
    }
  }
  return false;
}

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  if (rateLimitMap.size > 1000) {
    for (const [key, entry] of rateLimitMap) {
      if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(key);
    }
  }
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX_REQUESTS;
}

// term ide do URL presne raz cez encodeURIComponent – tu sa nič iné
// s ním nerobí (žiadna vlastná dekódovacia/kódovacia logika), aby sa
// nezopakoval Latin-1 bug z curl diagnostiky (ten bol spôsobený
// argument-passingom mimo prehliadača, tu ide o čistý JS string).
function buildTargetUrl(action, query) {
  if (action === 'search') {
    const term = query.term;
    if (typeof term !== 'string' || !term.trim()) return { error: 'Chýba parameter "term".' };
    if (term.length > MAX_TERM_LENGTH) return { error: `Parameter "term" je príliš dlhý (max ${MAX_TERM_LENGTH} znakov).` };
    return { url: `${NSUD_BASE}?searchDecision&art_obsah=${encodeURIComponent(term)}` };
  }
  if (action === 'detail') {
    const id = query.id;
    if (typeof id !== 'string' || !/^\d+$/.test(id) || id.length > 12) {
      return { error: 'Neplatné "id" (očakáva sa číselný reťazec).' };
    }
    return { url: `${NSUD_BASE}?getDecision&id=${id}` };
  }
  return { error: 'Neplatná "action" (očakáva sa "search" alebo "detail").' };
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Len GET.' });
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({ ok: false, error: 'Príliš veľa požiadaviek, skús to o chvíľu znova.' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false, error: 'Neplatný pôvod požiadavky.' });
  }

  const query = req.query || {};
  const built = buildTargetUrl(query.action, query);
  if (built.error) {
    return res.status(400).json({ ok: false, error: built.error });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let upstreamRes;
  try {
    upstreamRes = await fetch(built.url, { signal: controller.signal });
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      return res.status(504).json({ ok: false, error: 'NS SR API neodpovedalo včas (timeout).' });
    }
    return res.status(502).json({ ok: false, error: 'Volanie NS SR API zlyhalo: ' + (e.message || String(e)) });
  }
  clearTimeout(timeoutId);

  const rawText = await upstreamRes.text().catch(() => '');

  if (!upstreamRes.ok) {
    // Pri diagnostike NS SR API občas vrátilo "502 Bad Gateway" ako HTML
    // stránku, nie JSON – klientovi treba jasnú chybu, nie pokus o
    // JSON.parse HTML tela.
    return res.status(502).json({ ok: false, error: `NS SR API vrátilo chybu (${upstreamRes.status}).` });
  }

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'NS SR API vrátilo neplatnú odpoveď (nie JSON).' });
  }

  return res.status(200).json({ ok: true, data });
};
