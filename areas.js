'use strict';

/* =====================================================
   DEFINÍCIA OBLASTÍ PRE DUEL (bez tréningového režimu)
   ===================================================== */

/*
  Toto sú oblasti, ktoré duelový engine používa.
  Presne tieto názvy sa zobrazujú v UI a používajú sa
  ako kľúče v window.areas aj v startDuel(name).
*/

export const duelAreas = [
  "Pracovné právo",
  "Trestné právo",
  "Rímske právo",
  "Občianske právo",
  "Dejiny práva",
  "Európske právo"
];

/* =====================================================
   PRÍPRAVA GLOBÁLNEJ ŠTRUKTÚRY PRE DUELOVÉ OTÁZKY
   ===================================================== */

window.areas = {};

duelAreas.forEach(name => {
  // Každá oblasť má pole otázok, ktoré doplní data.js
  window.areas[name] = [];
});

console.log("AREAS INITIALIZED FOR DUELS:", Object.keys(window.areas));
