'use strict';

/* ============================================================
   OSOBNÝ PREHĽAD PROGRESU – Fáza 3
   ============================================================
   Vzorec % témy: priemer cez aktivity ktoré pre daný okruh EXISTUJÚ
   (kvíz, kartičky, prípady, bifľovačka), každá svojím najlepším
   výsledkom. Nespravená, ale EXISTUJÚCA aktivita = 0 % (ťahá dole).
   NEEXISTUJÚCA aktivita (chýba obsah) z priemeru VYPADNE, nepočíta
   sa ako 0 % – inak by neúplný okruh mal navždy strop pod 100 %.

   Bifľovačka je zapojená LEN tam, kde je mapovanie
   biflovacka/{slug}.json okruh.id → "A{id}" OVERENÉ ako spoľahlivé
   (tph, tpp, ob_hmotne, ob_procesne). Pracovné právo má nezávislé,
   nezhodné číslovanie tém a Európske právo nemá manuálny súbor vôbec
   (auto-generované balíčky bez per-okruh id) – kým sa to nevyrieši
   (ručná prekladová tabuľka / oprava fallbacku), bifľovačka sa pre
   tieto dve oblasti do priemeru NEZAPOČÍTAVA (biflovackaSlug: null).
============================================================ */
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { generateMemoryPackages } from '../memoryDefinitions.js';

export const DASHBOARD_AREAS = [
  {
    title: 'Pracovné právo',
    appId: 'pracovne',
    subAreas: [
      { subArea: 'main', areaTitle: 'Pracovné právo', maxOkruh: 50, biflovackaSlug: null }
    ]
  },
  {
    title: 'Trestné právo',
    appId: 'trestne',
    subAreas: [
      { subArea: 'hmotne', areaTitle: 'Trestné právo hmotné', maxOkruh: 30, biflovackaSlug: 'tph' },
      { subArea: 'procesne', areaTitle: 'Trestné právo procesné', maxOkruh: 30, biflovackaSlug: 'tpp' }
    ]
  },
  {
    title: 'Občianske právo',
    appId: 'obcianske',
    subAreas: [
      { subArea: 'hmotne', areaTitle: 'Občianske právo hmotné', maxOkruh: 40, biflovackaSlug: 'ob_hmotne' },
      { subArea: 'procesne', areaTitle: 'Občianske právo procesné', maxOkruh: 45, biflovackaSlug: 'ob_procesne' }
    ]
  },
  {
    title: 'Európske právo',
    appId: 'eu',
    subAreas: [
      // biflovackaSlug: null – žiadny biflovacka/eu.json, auto-generované balíčky
      // nemajú per-okruh id (pozri memoryDefinitions.js generateMemoryPackages fallback)
      { subArea: 'main', areaTitle: 'Európske právo', maxOkruh: 38, biflovackaSlug: null }
    ]
  }
];

const ACTIVITY_LABELS = { quiz: 'kvíz', flashcards: 'kartičky', cases: 'prípady', biflovacka: 'bifľovačka', statnica: 'štátnica' };

function okruhKeysFor(subAreaCfg) {
  return Array.from({ length: subAreaCfg.maxOkruh }, (_, i) => `A${i + 1}`);
}

function findAreaAndSubArea(areaTitle) {
  for (const area of DASHBOARD_AREAS) {
    const sub = area.subAreas.find(s => s.areaTitle === areaTitle);
    if (sub) return { area, subAreaCfg: sub };
  }
  return null;
}

function contentExists(store, areaTitle, okruhKey) {
  const list = store?.[areaTitle];
  return Array.isArray(list) && list.some(item => item && item.source === okruhKey);
}

/* ============================================================
   NAČÍTANIE DÁT (bulk – jeden get() na appId/slug, nie per okruh)
============================================================ */
export async function loadDashboardData(nick, { appIds = null, biflovackaSlugs = null } = {}) {
  const db = window.db;
  const wantedAppIds = appIds || [...new Set(DASHBOARD_AREAS.map(a => a.appId))];
  const wantedSlugs = biflovackaSlugs !== null
    ? biflovackaSlugs
    : [...new Set(DASHBOARD_AREAS.flatMap(a => a.subAreas.map(s => s.biflovackaSlug).filter(Boolean)))];

  const progressByApp = {};
  const biflovackaProgressBySlug = {};
  const biflovackaPackagesBySlug = {};

  await Promise.all([
    ...wantedAppIds.map(async id => {
      if (!db || !nick) { progressByApp[id] = {}; return; }
      const snap = await get(ref(db, `users/${nick}/progress/${id}`));
      progressByApp[id] = snap.exists() ? snap.val() : {};
    }),
    ...wantedSlugs.map(async slug => {
      biflovackaPackagesBySlug[slug] = await generateMemoryPackages(slug);
      if (!db || !nick) { biflovackaProgressBySlug[slug] = {}; return; }
      const snap = await get(ref(db, `users/${nick}/memoryProgress/${slug}`));
      biflovackaProgressBySlug[slug] = snap.exists() ? snap.val() : {};
    })
  ]);

  return { progressByApp, biflovackaProgressBySlug, biflovackaPackagesBySlug };
}

/* Priemerný % bifľovačky pre okruh (všetky definície toho okruhu,
   nezodpovedané = 0), alebo null ak pre okruh nie je žiadna bifľovačka
   definícia (obsah pre bifľovačku pre tento okruh neexistuje). */
function computeBiflovackaPercent(slug, okruhKey, data) {
  const packages = data.biflovackaPackagesBySlug?.[slug] || [];
  const bifId = okruhKey.replace(/^A/, '');
  const forOkruh = packages.filter(p => p.okruhId === bifId);
  if (!forOkruh.length) return null;

  const progress = data.biflovackaProgressBySlug?.[slug] || {};
  const scores = forOkruh.map(p => {
    const entry = progress[p.id];
    return entry && typeof entry.score === 'number' ? entry.score : 0;
  });
  return Math.round(scores.reduce((s, v) => s + v, 0) / scores.length);
}

/* ============================================================
   % TÉMY PRE JEDEN OKRUH
   Vráti { percent, missingActivities: [...], hasAnyContent }.
============================================================ */
function titleFor(areaTitle, okruhKey) {
  return window.areaOkruhTitles?.[areaTitle]?.[okruhKey] || okruhKey;
}

export function computeOkruhStats(okruhKey, subAreaCfg, appId, data) {
  const progressNode = (data.progressByApp?.[appId]?.[subAreaCfg.subArea]?.[okruhKey]) || {};
  const parts = [];

  if (contentExists(window.areas, subAreaCfg.areaTitle, okruhKey)) {
    parts.push({ key: 'quiz', value: progressNode.quiz?.best ?? 0 });
  }
  if (contentExists(window.areaTiles, subAreaCfg.areaTitle, okruhKey)) {
    parts.push({ key: 'flashcards', value: progressNode.flashcards?.best ?? 0 });
  }
  if (contentExists(window.areaCases, subAreaCfg.areaTitle, okruhKey)) {
    parts.push({ key: 'cases', value: progressNode.cases?.best ?? 0 });
  }
  // 5b: štátnica sa do priemeru okruhu zaráta LEN ak preň existuje zápis (best je number).
  // Žiadny contentExists – štátnica nemá predformovaný obsah; bránou je existencia výsledku.
  if (typeof progressNode?.statnica?.best === 'number') {
    parts.push({ key: 'statnica', value: progressNode.statnica.best });
  }
  if (subAreaCfg.biflovackaSlug) {
    const bifPct = computeBiflovackaPercent(subAreaCfg.biflovackaSlug, okruhKey, data);
    if (bifPct !== null) parts.push({ key: 'biflovacka', value: bifPct });
  }

  const percent = parts.length ? Math.round(parts.reduce((s, p) => s + p.value, 0) / parts.length) : 0;
  const missingActivities = parts.filter(p => p.value === 0).map(p => ACTIVITY_LABELS[p.key]);
  const title = titleFor(subAreaCfg.areaTitle, okruhKey);

  return { percent, missingActivities, hasAnyContent: parts.length > 0, title, parts };
}

/* ============================================================
   % PRE VŠETKY OKRUHY JEDNEJ (POD)OBLASTI (areaTitle napr.
   "Trestné právo hmotné") – používa dashboardUI.js aj
   scripts/duels.js (📗/📕 mode picker).
============================================================ */
export async function getOkruhPercentMap(nick, areaTitle, okruhKeys) {
  const found = findAreaAndSubArea(areaTitle);
  if (!found) return {};

  const data = await loadDashboardData(nick, {
    appIds: [found.area.appId],
    biflovackaSlugs: found.subAreaCfg.biflovackaSlug ? [found.subAreaCfg.biflovackaSlug] : []
  });

  const map = {};
  okruhKeys.forEach(k => {
    map[k] = computeOkruhStats(k, found.subAreaCfg, found.area.appId, data).percent;
  });
  return map;
}

/* ============================================================
   OKRUHY S "ZELENOU FAJKOU" ŠTUDIJNÉHO MODULU – na rozdiel od
   getOkruhPercentMap() vyššie (priemer quiz/flashcards/cases/
   bifľovačka) číta VÝHRADNE progress.{appId}.{subArea}.{okruh}.quiz.best.
   Rovnaká definícia "preštudované" ako readDoneOkruhIndices() v
   scripts/progressTracking.js (prah 60 %, len tam vracia INDEXY do
   poľa okruhov, tu "A{n}" kľúče – zdroj dát aj prah sú duplikované na
   dvoch miestach zámerne, pozri dlh #12). Používa scripts/duels.js
   (📗 mode picker pojednávaní).

   try/catch rovnako ako fetchPercentMapSafe() v scripts/okruhSelector.js
   – zlyhanie Firebase nesmie zhodiť volajúceho, len tichý fallback na
   prázdny Set (spustí existujúci usedFallback → 🎲). logLabel ide do
   console.warn prefixu, rovnaká konvencia ako pri dlhu #1. */
export async function getOkruhDoneKeys(nick, areaTitle, okruhKeys, threshold = 60, logLabel = 'dashboardStats') {
  const found = findAreaAndSubArea(areaTitle);
  if (!found) return new Set();

  try {
    const data = await loadDashboardData(nick, {
      appIds: [found.area.appId],
      biflovackaSlugs: []
    });

    const bySubArea = data.progressByApp?.[found.area.appId]?.[found.subAreaCfg.subArea] || {};
    const done = new Set();
    okruhKeys.forEach(k => {
      const best = bySubArea[k]?.quiz?.best;
      if (typeof best === 'number' && best >= threshold) done.add(k);
    });
    return done;
  } catch (e) {
    console.warn(`[${logLabel}] getOkruhDoneKeys zlyhalo – fallback na náhodný výber`, e);
    return new Set();
  }
}

/* ============================================================
   CELÝ DASHBOARD – všetky oblasti, všetky okruhy, s dátami
   načítanými raz (na použitie v UI aj pri kontrole odmien).
============================================================ */
export async function computeFullDashboard(nick) {
  const data = await loadDashboardData(nick);

  return DASHBOARD_AREAS.map(area => {
    const subAreas = area.subAreas.map(subAreaCfg => {
      const okruhy = okruhKeysFor(subAreaCfg).map(key => {
        const stats = computeOkruhStats(key, subAreaCfg, area.appId, data);
        return { key, areaTitle: subAreaCfg.areaTitle, ...stats };
      }).filter(o => o.hasAnyContent); // okruh bez akéhokoľvek obsahu (napr. súbor chýba) sa nezobrazuje

      return { subArea: subAreaCfg.subArea, areaTitle: subAreaCfg.areaTitle, okruhy };
    });

    return { title: area.title, appId: area.appId, subAreas };
  });
}
