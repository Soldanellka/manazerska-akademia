'use strict';

/* ============================================================
   scripts/analytics.js
   Návratnosť hráčov – čisto Firebase RTDB, žiadne /api, žiadne
   externé služby. Logovanie beží na pozadí (nikdy neblokuje UI,
   zlyhanie ide len do console).

   Firebase model:
   analytics/{nick}: { firstSeen, lastSeen, visitCount, days:{date:true} }
   analyticsDaily/{YYYY-MM-DD}: { visits, newUsers, returningUsers }

   Session = jedna návšteva. Nová session, ak od poslednej aktivity
   (v TEJTO karte) ubehlo >30 min, alebo ak ide o novú kartu/otvorenie
   (sessionStorage sa vtedy prirodzene vynuluje).
============================================================ */

import { ref, get, set, update, runTransaction }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const SESSION_KEY = 'lexarena_analytics_session_ts';
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function getDb() { return window.db || null; }
function todayKey() { return new Date().toISOString().slice(0, 10); }

function isNewSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return true;
  const last = parseInt(raw, 10);
  if (isNaN(last) || (Date.now() - last) > SESSION_TIMEOUT_MS) return true;
  return false;
}

function touchSession() {
  sessionStorage.setItem(SESSION_KEY, String(Date.now()));
}

/* Zavolaj raz po zistení nicku pri štarte appky. Nič nevracia,
   nič neblokuje – prípadné zlyhanie sa len zaloguje. */
export async function logVisit(nick) {
  try {
    if (!nick) return;
    const db = getDb();
    if (!db) return;
    if (!isNewSession()) return; // táto session je už zalogovaná
    touchSession();

    const today = todayKey();
    const now = Date.now();

    const userRef = ref(db, `analytics/${nick}`);
    const snap = await get(userRef);
    const isNewUser = !snap.exists();
    const data = snap.exists() ? snap.val() : null;
    const hadToday = !!(data && data.days && data.days[today]);

    if (isNewUser) {
      await set(userRef, {
        firstSeen: now,
        lastSeen: now,
        visitCount: 1,
        days: { [today]: true }
      });
    } else {
      await update(userRef, {
        lastSeen: now,
        visitCount: (data.visitCount || 0) + 1,
        [`days/${today}`]: true
      });
    }

    // Denné súhrny – viacero hráčov naraz môže inkrementovať rovnaký
    // deň, preto transakcia (result.committed rozhoduje, nie flag
    // z callbacku – rovnaký vzor ako economy.js settlePeriod).
    await runTransaction(ref(db, `analyticsDaily/${today}/visits`), (cur) => (cur || 0) + 1);
    if (isNewUser) {
      await runTransaction(ref(db, `analyticsDaily/${today}/newUsers`), (cur) => (cur || 0) + 1);
    } else if (!hadToday) {
      await runTransaction(ref(db, `analyticsDaily/${today}/returningUsers`), (cur) => (cur || 0) + 1);
    }
  } catch (e) {
    console.warn('⚠️ analytics: logVisit zlyhalo', e);
  }
}

/* ============================================================
   ADMIN PREHĽAD – jedno čítanie analytics/* + analyticsDaily/*,
   žiadne čítanie per hráč. Agregáty; ak sa zobrazujú jednotlivci,
   len nick + počet dní (žiadne herné výsledky).
============================================================ */
export async function getAnalyticsOverview() {
  const db = getDb();
  if (!db) return null;

  const [usersSnap, dailySnap] = await Promise.all([
    get(ref(db, 'analytics')),
    get(ref(db, 'analyticsDaily'))
  ]);

  const users = usersSnap.exists() ? usersSnap.val() : {};
  const daily = dailySnap.exists() ? dailySnap.val() : {};

  const nicks = Object.keys(users);
  const totalUsers = nicks.length;

  const returningCount = nicks.filter(n => {
    const d = users[n].days || {};
    return Object.keys(d).length >= 2;
  }).length;

  const today = todayKey();
  const todayRaw = daily[today] || {};
  const todayStats = {
    visits: todayRaw.visits || 0,
    newUsers: todayRaw.newUsers || 0,
    returningUsers: todayRaw.returningUsers || 0
  };

  // D1 retencia za posledných 7 dní: z hráčov, čo mali firstSeen presne
  // v deň D, koľko má aspoň jeden ďalší deň návštevy (≥2 rôzne dni).
  const d1ByDay = [];
  for (let i = 1; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayKey = d.toISOString().slice(0, 10);

    const cohort = nicks.filter(n => {
      const days = users[n].days || {};
      return !!days[dayKey] && Object.keys(days).sort()[0] === dayKey;
    });
    const returned = cohort.filter(n => Object.keys(users[n].days || {}).length >= 2).length;

    d1ByDay.push({ day: dayKey, cohortSize: cohort.length, returned });
  }
  const d1CohortTotal = d1ByDay.reduce((s, x) => s + x.cohortSize, 0);
  const d1ReturnedTotal = d1ByDay.reduce((s, x) => s + x.returned, 0);
  const d1RetentionPct = d1CohortTotal ? Math.round((d1ReturnedTotal / d1CohortTotal) * 100) : 0;

  // Posledných 14 dní z analyticsDaily
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayKey = d.toISOString().slice(0, 10);
    const s = daily[dayKey] || { visits: 0, newUsers: 0, returningUsers: 0 };
    last14.push({ day: dayKey, visits: s.visits || 0, newUsers: s.newUsers || 0, returningUsers: s.returningUsers || 0 });
  }

  return {
    totalUsers,
    returningCount,
    returningPct: totalUsers ? Math.round((returningCount / totalUsers) * 100) : 0,
    today: todayStats,
    d1RetentionPct,
    d1CohortTotal,
    d1ReturnedTotal,
    last14
  };
}
