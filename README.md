# Manažérska akadémia

Manažérska akadémia je tréningová appka na komunikáciu v práci — asertivitu,
spätnú väzbu, Ja-výroky, komunikačné polohy, poznávanie druhých a aktívne
počúvanie. Obsahuje súboje, kartičky, prípady z praxe, bifľovačku a Tréning
spätnej väzby, v ktorom odpoveď hráča prejdú traja AI mentori.

Appka beží bez build kroku: čisté ES moduly, Firebase RTDB cez gstatic,
serverless funkcie na Verceli (`api/`).

## Počítanie otvorení aplikácie

**Čo sa počíta.** Jediná vec: koľkokrát sa appka za deň otvorila. Počíta sa
každé otvorenie vrátane anonymného — modul prezývku vôbec nevidí.

**Kde to je uložené.** Vo Firebase RTDB, vetva `analyticsDaily/{YYYY-MM-DD}`
s jediným poľom `visits`. Nič iné sa nezapisuje.

**Čo sa neukladá.** V prehliadači nevzniká žiadny kľúč — ani localStorage, ani
sessionStorage, ani cookie. Jednotliví návštevníci sa nerozlišujú, čísla sa
nespájajú s prezývkou ani s IP adresou a nepoužíva sa žiadny externý merací
nástroj.

**Kód.** `scripts/visits.js` (zápis, prehľad, mazanie starých dní); volá sa
z `init.js` pri štarte appky, mimo akejkoľvek vetvy „ak má hráč prezývku“,
bez `await` a celé v `try/catch`.

**Prehľad.** Admin panel → *📊 Otvorenia aplikácie*: dnešok, 7 dní, 30 dní,
graf a tabuľka za posledných 14 dní. Pod prehľadom je tlačidlo, ktoré na
vyžiadanie zmaže dni staršie ako 12 mesiacov (žiadna automatika).

**⚠️ Dni pred 18. 10. 2026 nie sú porovnateľné** s novšími. Dovtedy appka
počítala len otvorenia prihlásených prezývok (`if (!nick) return;`), takže
staršie čísla sú výrazne nižšie, než aká bola skutočná návštevnosť.

**⚠️ `analyticsDaily` NEPATRÍ do zoznamu mazaných vetiev pri resete databázy**
(fáza F, ukážkový režim). Reset vracia hráčske dáta do východiskového stavu;
počet otvorení appky s hráčmi nesúvisí a vymazaním by sa stratila jediná
dlhodobá rada o využívaní. Keď bude reset vznikať, táto veta patrí priamo ku
zoznamu vetiev.

**Zrušená analytika.** Do 18. 10. 2026 existovala vetva `analytics/{prezývka}`
(`firstSeen`, `lastSeen`, `visitCount`, zoznam dní) a rozlišovanie nových od
vracajúcich sa. Bol to verejne čitateľný záznam o prítomnosti konkrétneho
človeka v čase, preto je vetva aj s kódom zmazaná. Rozlišovanie návštevníkov
by vyžadovalo značku v zariadení, a tá nie je nevyhnutná na fungovanie služby —
teda by potrebovala súhlasovú lištu. Miesto, kde by taká funkcia vznikala, je
označené konštantou `REZIM_S_IDENTIFIKATOROM` v `scripts/visits.js`.

## Ako pridať okruh

Počet okruhov v oblasti je na troch miestach a musí sedieť:

1. `data.js` — `loadJsonQuestions("Názov oblasti", "obsah/<slug>/", <počet>)`
2. `memoryDefinitions.js` — `MEMORY_AREAS[].count`
3. `scripts/dashboardStats.js` — `DASHBOARD_AREAS[].subAreas[].maxOkruh`

## Obsah na odbornú kontrolu

Texty okruhov, situácie v Tréningu spätnej väzby aj vzorové odpovede
(`api/_trening-kalibracia.js`) sú podklady na odbornú kontrolu, nie hotové
učebné materiály. Obsah stojí na verejne známych modeloch z oblasti
komunikácie a psychológie (transakčná analýza, Johariho okno, asertívne práva,
Riemann-Thomann, techniky aktívneho počúvania), spracovaných vlastnými slovami.
