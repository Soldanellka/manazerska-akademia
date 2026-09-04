'use strict';

import { normalizeOkruh } from './scripts/contentNormalize.js';
import { applyOverridesFromMap, loadContentOverridesForApp, AREA_SLUGS }
from './scripts/contentOverrides.js';

console.log("DATAJS NAČÍTANÝ");

/* =====================================================
   AUTO-DETEKCIA PROSTREDIA
===================================================== */

const LIVE = "https://www.lexarena.sk/";

/* =====================================================
   GLOBÁLNE OBJEKTY PRE DUELOVÝ ENGINE
===================================================== */

window.areas = {
  "Pracovné právo": [],
  "Trestné právo hmotné": [],
  "Trestné právo procesné": [],
  "Občianske právo hmotné": [],
  "Občianske právo procesné": [],
  "Európske právo": []
};

/* =====================================================
   ŠTUDIJNÉ MODULY – VRÁTENÉ VŠETKY
===================================================== */

window.catalog = {
  "Pracovné právo": {
    id: "pracovne",
    openExternal: LIVE + "pracovne-pravo-app/",
    externalPath: LIVE + "LuluLaw duel Pracovné právo/data/",
    desc: "Individuálne a kolektívne pracovné právo, kvízy, kartičky a prípady."
  },

  "Trestné právo": {
    id: "trestne",
    openExternal: LIVE + "trestne-pravo-app/",
    externalPath: LIVE + "Trestné právo hmotné/data/",
    desc: "Kompletná appka trestného práva: hmotné + procesné, kvízy, kartičky a prípady."
  },

  /* Kľúč je zároveň POPIS dlaždice (renderModules používa názov ako text),
     inak sa nikde nevyhľadáva – identita modulu je id: "obcianske"
     (progressTracking, ob-pravo-app). Skrátené z "Občianske právo –
     hmotné a procesné"; appka naďalej ťahá hmotné aj procesné, výber
     dvojice okruhov (dual) sa nemenil. */
  "Občianske právo": {
    id: "obcianske",
    openExternal: LIVE + "ob-pravo-app/",
    externalPath: LIVE + "ob-pravo-app/data/",
    desc: "Kompletná appka občianskeho práva: 40 okruhov hmotného + 45 procesného, kvízy, kartičky a prípady."
  },

  "Európske právo": {
    id: "eu",
    openExternal: LIVE + "eu-pravo-app/",
    externalPath: LIVE + "eu-pravo-app/data/",
    desc: "38 okruhov európskeho práva, kvízy, kartičky a prípady."
  },

  /* legacy: true = staršie samostatné appky (vlastné HTML, bez Firebase,
     bez nicku, bez zápisu progresu a bez §). V Študijných moduloch sa
     nezobrazujú priamo, ale až po rozbalení dlaždice "Ďalší obsah" –
     hlavný zoznam tak drží len plnohodnotné oblasti. */
  "Občan - teória a veľký kvíz": {
    id: "obcan",
    legacy: true,
    openExternal: LIVE + "Občan - teória a veľký kvíz/",
    externalPath: LIVE + "Občan - teória a veľký kvíz/data/",
    desc: "Veľký občiansky kvíz."
  },

  "TREST Veľký KVÍZ": {
    id: "trestvelky",
    legacy: true,
    openExternal: LIVE + "TREST Veľký KVÍZ/",
    externalPath: LIVE + "TREST Veľký KVÍZ/data/",
    desc: "Kompletný trestný kvíz."
  },

  "Trestné právo - spájačka": {
    id: "spajacka",
    legacy: true,
    openExternal: LIVE + "Trestné právo - spájačka/",
    externalPath: LIVE + "Trestné právo - spájačka/data/",
    desc: "Interaktívna spájačka."
  },

  "Trestné právo - teória a prípady": {
    id: "tppripady",
    legacy: true,
    openExternal: LIVE + "Trestné právo - teória a prípady/",
    externalPath: LIVE + "Trestné právo - teória a prípady/data/",
    desc: "Teória + prípady."
  }
};

/* =====================================================
   AUTO-LOADER JSON OTÁZOK

   🚀 DÁVKOVÉ NAČÍTANIE (2026-08). Pôvodná verzia bola striktne sériová:
   for (file of files) { await fetch(file); await <Firebase get pre okruh>; }
   – pri ~233 súboroch naprieč appkou to znamenalo ~233 HTTP round-tripov
   a ~233 Firebase čítaní za sebou. Na mobile to trvalo natoľko dlho, že
   chipy oblastí stihli zošednúť na „pripravuje sa“ a potom sa odblokovať
   (blikanie), a najväčšie oblasti (Pracovné 50 súborov, Občianske 40+45)
   dobiehali ako posledné.

   Po novom:
   ① overridy CELEJ oblasti jedným Firebase getom PRED cyklom
      (loadContentOverridesForApp) → 233 čítaní pre appku klesne na 6,
   ② súbory sa sťahujú po dávkach BATCH_SIZE paralelne (Promise.all),
      nie po jednom – dávka je zámerne malá, nech nezahltí mobilnú sieť.

   ⚠️ PORADIE SA NESMIE ZMENIŤ. Promise.all vracia výsledky v poradí
   vstupov a dávky idú za sebou, takže ploché polia questions/tiles/cases
   vzniknú presne v takom poradí ako doteraz (A1 → A2 → … → An, vnútri
   v poradí položiek). Kanonické indexy _ti/_ci/_quizIndex sú per-okruh,
   takže na ne dávkovanie nemá vplyv – ale poradie otázok v rámci okruhu
   číta groupBySource() v scripts/duels.js, preto sa drží aj to.

   ⚠️ FAIL-SOFT PER SÚBOR. Každá položka dávky má vlastný try/catch a pri
   chybe vracia null – jeden rozbitý/chýbajúci súbor nesmie zhodiť celú
   dávku ani oblasť. Rovnaké správanie ako pôvodný `continue` v cykle.
===================================================== */

/* Koľko súborov naraz. Pozor, NIE je to celkový počet súbežných requestov:
   šesť oblastí sa načítava paralelne (šesť volaní loadJsonQuestions bez
   awaitu nižšie), takže reálna súbežnosť je 6 × BATCH_SIZE. Pri 4 je to
   24 requestov naraz – výrazne rýchlejšie než sériovo, ale ešte šetrné
   k mobilnej sieti (pri 8 by ich bolo 48). */
const BATCH_SIZE = 4;

async function fetchOkruhJson(folderUrl, file, areaTitle, overridesByOkruh) {
  try {
    const res = await fetch(folderUrl + file);
    if (!res.ok) return null;                       // chýbajúci súbor – ticho preskočiť

    const raw = await res.json();
    /* Normalizácia na jeden vnútorný tvar (summary/theory, question/q,
       explanation v 3 tvaroch, zdroj/source) – nech engine prijme
       všetky existujúce tvary JSON bez prepisovania súborov. */
    const normalized = normalizeOkruh(raw);
    /* Firebase override (admin/garant oprava) navrství sa nad pôvodný
       JSON – chýbajúci override alebo nedostupná Firebase necháva
       pôvodný obsah bez zmeny. Zdroj je predčítaná mapa oblasti, takže
       tu už žiadne sieťové volanie nie je. */
    const json = applyOverridesFromMap(normalized, areaTitle, file.replace('.json', ''), overridesByOkruh);
    return { file, json };
  } catch (e) {
    console.warn("⚠️ Chyba pri načítaní:", file, e);
    return null;
  }
}

async function loadJsonQuestions(areaTitle, folderUrl, maxFiles) {
  console.log("📥 Načítavam JSON otázky pre:", areaTitle);

  const files = Array.from({ length: maxFiles }, (_, i) => `A${i + 1}.json`);
  const questions = [];
  const tiles = [];
  const cases = [];

  /* Jeden get na celú oblasť namiesto jedného na každý okruh. Fail-soft:
     pri nedostupnej Firebase vráti {} a obsah sa zobrazí bez úprav. */
  const overridesByOkruh = await loadContentOverridesForApp(AREA_SLUGS[areaTitle]);

  for (let start = 0; start < files.length; start += BATCH_SIZE) {
    const batch = files.slice(start, start + BATCH_SIZE);
    const loaded = await Promise.all(
      batch.map(file => fetchOkruhJson(folderUrl, file, areaTitle, overridesByOkruh))
    );

    /* Skladanie AŽ TU a v poradí dávky – pozri poznámku o poradí vyššie. */
    for (const item of loaded) {
      if (!item) continue;                          // preskočený/rozbitý súbor
      const { file, json } = item;

      /* 📛 Názov okruhu (title z A*.json) – doteraz sa načítal, ale nikde
         sa neukladal, takže dashboard/garant test builder mali k dispozícii
         len interný kľúč "A1". Uloženie tu (bez ďalšieho fetchu) rieši oba
         naraz – jeden zdroj pravdy pre názov okruhu naprieč appkou. */
      window.areaOkruhTitles = window.areaOkruhTitles || {};
      window.areaOkruhTitles[areaTitle] = window.areaOkruhTitles[areaTitle] || {};
      window.areaOkruhTitles[areaTitle][file.replace('.json', '')] = json.title || null;

      /* 🃏 Dlaždice pre memory (pojem ↔ definícia) */
      if (Array.isArray(json.tiles)) {
        /* _ti = kanonický index dlaždice v json.tiles jeho okruhu (rovnaký dôvod
           ako _ci pri prípadoch nižšie): zoznam je PLOCHÝ a cez-okruhový, takže
           pozícia v ňom nie je index, ktorý čaká applyContentOverrides
           (tile_${i}). Hlavná appka dnes dlaždice needituje, ale sploštenie tým
           prestáva informáciu strácať. */
        json.tiles.forEach((t, ti) => {
          if (t && t.term && t.definition) {
            tiles.push({ term: t.term, definition: t.definition, source: file.replace('.json',''), _area: areaTitle, zdroj: t.zdroj || null, _ti: ti });
          }
        });
      }

      /* 📋 Prípady z praxe (jeden prípad = viac krokov) */
      if (Array.isArray(json.cases)) {
        json.cases.forEach((c, ci) => {
          if (c && Array.isArray(c.steps)) {
            cases.push({
              title: c.title || 'Prípad',
              difficulty: c.difficulty || '',
              steps: c.steps, // už normalizované (question/explanation/zdroj na krok)
              source: file.replace('.json',''),
              /* Kanonický index prípadu v json.cases jeho okruhu. Zoznam nižšie
                 je PLOCHÝ a cez-okruhový (a v cases.js sa ešte filtruje na
                 vybranú dvojicu okruhov), takže pozícia v ňom NIE JE totožná
                 s indexom, ktorý čaká applyContentOverrides (contentOverrides.js
                 case_${ci}_step_${si}). Bez tohto poľa by sa admin úprava
                 uložila pod cudzí/neexistujúci index. */
              _ci: ci,
              /* Pôvodná (nezlúčená) oblasť tohto prípadu – niektoré výbery
                 v cases.js zlučujú viac oblastí do jedného poľa (napr.
                 "Trestné právo" = hmotné + procesné), takže areaTitle
                 parameter v renderJsonCase() by nebol spoľahlivý na
                 identifikáciu contentOverrides app slugu. */
              area: areaTitle,
              zdroj: c.zdroj || null
            });
          }
        });
      }

      if (json.quiz) {
        json.quiz.forEach((q, qi) => {
          questions.push({
            question: q.question, // už normalizované (question || q)
            options: q.options,
            correct: q.correct,
            explanation: q.explanation, // už normalizované na {correct,wrong} | null
            zdroj: q.zdroj || null,
            _seal: q._seal || null,
            /* Kanonický index v okruh.quiz[] (pred zamiešaním) + oblasť –
               potrebné pre admin/garant inline editáciu (contentOverrides
               cast kľúč quiz_{i}), keďže toto pole je zlúčené naprieč
               všetkými súbormi danej oblasti a stráca pôvodný index. */
            _quizIndex: qi,
            _area: areaTitle,
            /* =========================
               🔥 OPRAVA: source sa nastavuje podľa
               skutočného súboru (napr. "A23"), nie podľa
               interného json.id, ktoré môže byť v rôznych
               JSON súboroch zhodné/duplicitné a spôsobovať
               nesprávne zoskupovanie otázok do párov
               (napr. 12 otázok namiesto 10 v duely.js).
               ========================= */
            source: file.replace('.json', '')
          });
        });
      }
    }
  }

  window.areas[areaTitle] = questions;
  window.areaTiles = window.areaTiles || {};
  window.areaCases = window.areaCases || {};
  window.areaTiles[areaTitle] = tiles;
  window.areaCases[areaTitle] = cases;

  /* 🏁 Príznak "načítanie dokončené" – nezávisí od počtu otázok,
     aby waitForQuestions() vedel odlíšiť "ešte sa načítava" od
     "načítané, ale zatiaľ prázdne" (napr. oblasť s čiastočne
     doplnenými JSON súbormi) a zbytočne nečakal celých 10 sekúnd. */
  window.areasLoaded = window.areasLoaded || {};
  window.areasLoaded[areaTitle] = true;

  console.log(`✅ ${areaTitle}: ${questions.length} otázok, ${tiles.length} dlaždíc, ${cases.length} prípadov`);
}

/* =====================================================
   NAČÍTANIE OBLASTÍ PRE DUEL
===================================================== */

// Pracovné právo → 50 JSON (A1-A50)
loadJsonQuestions(
  "Pracovné právo",
  LIVE + "LuluLaw duel Pracovné právo/data/",
  50
);

// Trestné právo hmotné → 30 JSON
loadJsonQuestions(
  "Trestné právo hmotné",
  LIVE + "Trestné právo hmotné/data/",
  30
);

// Trestné právo procesné → 30 JSON
loadJsonQuestions(
  "Trestné právo procesné",
  LIVE + "Trestné právo procesné/data/",
  30
);

// Občianske právo hmotné → 40 JSON
loadJsonQuestions(
  "Občianske právo hmotné",
  LIVE + "ob-pravo-app/data/hmotne/",
  40
);

// Občianske právo procesné → 45 JSON
loadJsonQuestions(
  "Občianske právo procesné",
  LIVE + "ob-pravo-app/data/procesne/",
  45
);

// Európske právo → 38 JSON (jednoúrovňové, nie hmotné/procesné)
loadJsonQuestions(
  "Európske právo",
  LIVE + "eu-pravo-app/data/",
  38
);

/* =====================================================
   OTVORENIE EXTERNEJ APPKY
===================================================== */

window.catalog.openExternal = function (slug) {
  console.log("Otváram externú appku:", slug);

  const loader = document.createElement("div");
  loader.id = "globalLoader";
  loader.style = `
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    color: white;
    font-size: 22px;
    font-weight: 600;
  `;
  loader.textContent = "Načítavam externú aplikáciu…";
  document.body.appendChild(loader);

  setTimeout(() => {
    window.location.href = slug;
  }, 200);
};
