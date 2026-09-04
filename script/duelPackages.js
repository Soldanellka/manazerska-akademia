// =====================================
// LexArena – duelPackages.js (FINÁLNA VERZIA)
// Pracovné právo (stabilné páry) + Trestné právo (náhodné 5+5)
// =====================================

'use strict';

/* ============================================================
   1) PRACOVNÉ PRÁVO – stabilné páry A1–A50 (5+5 otázok)
============================================================ */

const PAIRS = [
  ["A1.json", "A2.json"],
  ["A3.json", "A4.json"],
  ["A5.json", "A6.json"],
  ["A7.json", "A8.json"],
  ["A9.json", "A10.json"],
  ["A11.json", "A12.json"],
  ["A13.json", "A14.json"],
  ["A15.json", "A16.json"],
  ["A17.json", "A18.json"],
  ["A19.json", "A20.json"],
  ["A21.json", "A22.json"],
  ["A23.json", "A24.json"],
  ["A25.json", "A26.json"],
  ["A27.json", "A28.json"],
  ["A29.json", "A30.json"],
  ["A31.json", "A32.json"],
  ["A33.json", "A34.json"],
  ["A35.json", "A36.json"],
  ["A37.json", "A38.json"],
  ["A39.json", "A40.json"],
  ["A41.json", "A42.json"],
  ["A43.json", "A44.json"],
  ["A45.json", "A46.json"],
  ["A47.json", "A48.json"],
  ["A49.json", "A50.json"]
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ============================================================
   2) TRESTNÉ PRÁVO – 30 JSON súborov v hmote aj procese
============================================================ */

const TPH_FILES = Array.from({ length: 30 }, (_, i) => `A${i + 1}.json`);
const TPP_FILES = Array.from({ length: 30 }, (_, i) => `A${i + 1}.json`);

/*  
   🔥 DÔLEŽITÉ:
   Test verzia musí ťahať otázky zo ŽIVEJ LexAreny.
   Preto používame ABSOLÚTNE URL.
*/

const LIVE = "https://www.lexarena.sk";

const TPH_BASE = `${LIVE}/Trestné právo hmotné/data/`;
const TPP_BASE = `${LIVE}/Trestné právo procesné/data/`;
const PRAC_BASE = `${LIVE}/LuluLaw duel Pracovné právo/data/`;

/* ============================================================
   3) Pomocná funkcia na načítanie JSON
============================================================ */

async function loadJsonFrom(base, file) {
  const res = await fetch(base + file, { cache: "no-store" });
  if (!res.ok) return { questions: [] };
  return await res.json();
}

/* ============================================================
   4) DUEL – PRACOVNÉ PRÁVO (stabilné páry)
============================================================ */

async function getDuelQuestionsPracovne() {
  const [file1, file2] = pickRandom(PAIRS);

  const json1 = await loadJsonFrom(PRAC_BASE, file1);
  const json2 = await loadJsonFrom(PRAC_BASE, file2);

  const q1 = json1.questions?.slice(0, 5) || [];
  const q2 = json2.questions?.slice(0, 5) || [];

  return [...q1, ...q2].map(q => ({
    question: q.text,
    options: q.answers,
    correct: q.correctIndex
  }));
}

/* ============================================================
   5) DUEL – TRESTNÉ PRÁVO (náhodný výber 1 JSON z hmoty + 1 z procesu)
============================================================ */

async function getDuelQuestionsTrestne() {
  const fileH = pickRandom(TPH_FILES);
  const jsonH = await loadJsonFrom(TPH_BASE, fileH);
  const qH = jsonH.questions?.slice(0, 5) || [];

  const fileP = pickRandom(TPP_FILES);
  const jsonP = await loadJsonFrom(TPP_BASE, fileP);
  const qP = jsonP.questions?.slice(0, 5) || [];

  return [...qH, ...qP].map(q => ({
    question: q.text,
    options: q.answers,
    correct: q.correctIndex
  }));
}

/* ============================================================
   6) HLAVNÁ FUNKCIA – podľa oblasti
============================================================ */

export async function getDuelQuestions(area = "pracovne") {
  if (area === "pracovne") return await getDuelQuestionsPracovne();
  if (area === "trestne") return await getDuelQuestionsTrestne();

  console.warn("Neznáma oblasť duelu:", area);
  return [];
}

/* ============================================================
   7) Uloženie balíka do localStorage
============================================================ */

export function saveDuelPackage(pkg) {
  if (!pkg || typeof pkg !== "object") return;

  let all = [];
  try {
    all = JSON.parse(localStorage.getItem("duelPackages") || "[]");
  } catch {}

  all.unshift(pkg);

  try {
    localStorage.setItem("duelPackages", JSON.stringify(all));
  } catch (e) {
    console.warn("LocalStorage disabled:", e);
  }
}

/* ============================================================
   8) Sprístupnenie do window
============================================================ */

window.getDuelQuestions = getDuelQuestions;
