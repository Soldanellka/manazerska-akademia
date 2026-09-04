# Pamäťové pavúky – Občianske právo hmotné (A1–A40)

Autorka obsahu: Babu. Tento súbor je ZDROJ pre pole `spider` v
`ob-pravo-app/data/hmotne/A{n}.json`.

## Formát – čítať pred konverziou

- `## A{n} — Názov okruhu` → jeden okruh, jeden súbor `A{n}.json`
- `**Centrum:** ...` → `spider.center` (text centrálnej dlaždice)
- `### Názov vetvy` → `branches[].label`
- `- položka` → `branches[].leaves[]`

Centrálna dlaždica sa ZOBRAZUJE. Ak `spider.center` chýba, renderer použije
názov okruhu z `json.title` – preto je `center` voliteľné pole, nie povinné.

Sú **len dve úrovne**. Vnorené odrážky z pôvodného návrhu sú už vyriešené:
kde mala položka veľa pododrážok, stala sa samostatnou vetvou; kde mala jednu
alebo dve, sú zlúčené do textu listu za dvojbodkou.

**Code neprepisuje formulácie, nedopĺňa právo, neskracuje texty.**
Farby vetiev sa nezapisujú – priraďujú sa po indexe.

POZOR: A1 už `spider` pole má (staršia, chudobnejšia verzia). Pri konverzii sa
PREPÍŠE obsahom nižšie, nepridáva sa druhé pole.

Zapracované opravy oproti pôvodnému návrhu:
- **A21** – zákonný úrok z omeškania uvedený ako „sadzba ECB + 5 p. b.“
  (§ 517 ods. 2 OZ + § 3 nar. vlády č. 87/1995 Z. z.), nie fixné percento;
  dvojročná záruka pri spotrebiteľskej kúpe naviazaná na OZ.
- **A29** – zákon č. 102/2014 Z. z. nahradený zákonom č. 108/2024 Z. z.
  o ochrane spotrebiteľa (účinný 1. 7. 2024).

---

## A1 — Pojem, predmet a systém občianskeho práva, pramene

**Centrum:** Občianske právo – pojem a systém

### Pojem OP
- súkromné právo
- rovnosť subjektov
- štát ako subjekt, nie autorita
- autonómia vôle
- zmluvná sloboda
- ochrana vlastníctva

### Predmet OP
- majetkové vzťahy: vlastníctvo, držba, vecné práva, záväzky
- osobné nemajetkové vzťahy: osobnosť, meno, súkromie
- rodinné vzťahy: manželstvo, rodičovské práva, výživné
- dedičské vzťahy: dedenie, závet, odmietnutie dedičstva

### Systém OP
- všeobecná časť: subjekty, právne skutočnosti, zastúpenie, premlčanie
- vecné právo: vlastníctvo, spoluvlastníctvo, držba
- záväzkové právo: zmluvy, delikty, bezdôvodné obohatenie
- dedičské právo: tituly, závet, dedičské konanie
- rodinné právo: manželstvo, osvojenie, výživné

### Pramene OP
- OZ (40/1964 Zb.)
- Zákon o rodine (36/2005 Z. z.)
- Ústava SR – čl. 12, 19
- osobitné zákony: spotrebiteľ, osobné údaje
- judikatúra NS SR, ÚS SR
- právo EÚ: smernice spotrebiteľské, zmluvné

---

## A2 — Základné zásady občianskeho práva

**Centrum:** Základné zásady občianskeho práva (hodnotový základ súkromného práva, interpretačné pravidlá OZ)

### Zásada zákonnosti
- konanie v medziach zákona
- právne následky len z právnych skutočností
- právna istota

### Rovnosť subjektov
- rovnaké postavenie účastníkov
- štát ako subjekt, nie autorita
- zákaz diskriminácie

### Autonómia vôle a zmluvná sloboda
- slobodné formovanie vzťahov
- limity: zákon, dobré mravy, verejný poriadok
- pacta sunt servanda

### Ochrana osobnosti
- dôstojnosť, česť, súkromie
- meno a prejavy osobnosti
- § 11 a nasl. OZ

### Ochrana dobrých mravov
- právne úkony odporujúce dobrým mravom sú neplatné
- korektív autonómie vôle
- judikatúra NS SR

### Zákaz zneužívania práv
- výkon práva nesmie poškodiť iného
- šikanózny výkon práva nepožíva ochranu
- princíp proporcionality

### Subsidiarita OZ
- OZ ako všeobecný predpis súkromného práva
- použitie pri absencii osobitnej úpravy
- význam pri výklade

### Normatívny význam zásad
- zásady usmerňujú výklad právnych noriem
- pomáhajú pri posudzovaní platnosti právnych úkonov
- usmerňujú rozhodovanie súdov
- dopĺňajú medzery v zákone

---

## A3 — Právne skutočnosti v občianskom práve – pojem, druhy

**Centrum:** Právne skutočnosti v občianskom práve – pojem, druhy (vznik, zmena, zánik práv a povinností)

### Právne úkony
- prejav vôle smerujúci k právnym následkom
- jednostranné: výpoveď, závet
- dvojstranné: zmluvy
- podmienky platnosti: spôsobilosť, určitý prejav, súlad so zákonom a dobrými mravmi

### Protiprávne úkony (delikty)
- konanie v rozpore s právom
- spôsobenie škody alebo ujmy
- následok: povinnosť nahradiť škodu
- patria sem: škoda porušením povinnosti, bezdôvodné obohatenie, zásah do osobnostných práv

### Právne udalosti
- nastávajú nezávisle od vôle človeka
- právne následky automaticky
- príklady: narodenie, smrť, uplynutie času, plynutie lehôt, prírodné udalosti
- objektívne, nevyžadujú prejav vôle

### Právne stavy
- dlhodobejšie právne situácie
- trvajú určitý čas
- príklady: manželstvo, rodičovstvo, držba, podnikateľský status
- vznik: právny úkon, udalosť alebo rozhodnutie orgánu verejnej moci

### Význam právnych skutočností
- určujú vznik, zmenu a zánik práv a povinností
- sú základom dynamiky občianskoprávnych vzťahov
- určujú, kedy sa mení právne postavenie subjektov
- sú nevyhnutné pre aplikáciu OZ

---

## A4 — Právne úkony, náležitosti právnych úkonov

**Centrum:** Právne úkony – pojem a náležitosti (prejav vôle smerujúci k vzniku, zmene alebo zániku práv a povinností)

### Pojem právneho úkonu
- prejav vôle podľa § 34 OZ
- smeruje k právnym následkom
- základ autonómie vôle
- musí byť platný, aby vyvolal účinky

### Subjekt právneho úkonu
- spôsobilosť na právne úkony
- fyzická osoba: plnoletosť
- právnická osoba: štatutárny orgán
- nedostatok spôsobilosti → neplatnosť

### Vôľa
- musí byť slobodná
- vážna, určitá, zrozumiteľná
- nesmie byť v omyle, tiesni, pod nátlakom
- omyl v podstatnej náležitosti → neplatnosť

### Prejav vôle
- musí byť určitý a zrozumiteľný
- formy: ústne, písomne, konkludentne
- konkludentné konanie, ak zákon nevyžaduje formu
- prejav musí umožniť určiť obsah úkonu

### Forma právneho úkonu
- voľná forma, ak zákon neustanovuje inak
- písomná forma pri nehnuteľnostiach
- prevod vlastníctva, vecné práva, niektoré rodinné úkony
- nedodržanie formy → neplatnosť

### Význam právnych úkonov
- základný nástroj autonómie vôle
- určujú vznik, zmenu, zánik práv a povinností
- musia spĺňať všetky náležitosti, aby boli platné
- kľúčové pre fungovanie občianskoprávnych vzťahov

---

## A5 — Následky vadnosti právnych úkonov

**Centrum:** Následky vadnosti právnych úkonov (neplatnosť – absolútna / relatívna – účinky)

### Vadnosť právneho úkonu
- úkon nespĺňa zákonné náležitosti
- následok: neplatnosť
- môže byť absolútna alebo relatívna
- ovplyvňuje vznik, zmenu, zánik práv a povinností

### Absolútna neplatnosť (§ 39 OZ)
- nastáva ex lege (automaticky)
- súd prihliada z úradnej povinnosti
- účinky ex tunc (od začiatku)
- chráni verejný záujem

### Dôvody absolútnej neplatnosti
- rozpor so zákonom
- rozpor s dobrými mravmi
- obchádzanie zákona
- nedodržanie zákonnej formy
- úkon osoby nespôsobilej na právne úkony

### Relatívna neplatnosť (§ 40a OZ)
- úkon je neplatný, len ak sa oprávnená osoba dovolá
- súd neprihliada automaticky
- chráni individuálne záujmy

### Dôvody relatívnej neplatnosti
- omyl v podstatnej náležitosti (§ 49a OZ)
- tieseň
- lesť (podvod)
- výhrážka (§ 49 OZ)
- omyl vyvolaný druhou stranou alebo jej vedomosť o omyle

### Účinky neplatnosti
- úkon nevyvoláva zamýšľané právne následky
- strany si vracajú plnenia → bezdôvodné obohatenie
- pri relatívnej neplatnosti sa úkon považuje za platný, kým sa neplatnosti niekto nedovolá

### Význam pre prax
- kontrola platnosti právnych úkonov
- ochrana verejného záujmu (absolútna)
- ochrana slabšej strany (relatívna)
- zásadné pre zmluvné právo, rodinné právo, vecné práva

---

## A6 — Čas ako právna skutočnosť, premlčanie, preklúzia

**Centrum:** Čas ako právna skutočnosť – premlčanie, preklúzia (plynutie času → vznik, zmena, zánik práv a povinností)

### Čas ako právna skutočnosť
- právny poriadok spája následky s plynutím času
- vznik, zmena, zánik práv a povinností
- význam pri lehotách, premlčaní, preklúzii, vydržaní
- čas ako objektívna právna udalosť

### Premlčanie (§ 100–114 OZ)
- právo nezaniká, ale stáva sa nevymáhateľným
- súd neprihliada automaticky
- dlžník musí vzniesť námietku premlčania
- všeobecná lehota: 3 roky
- týka sa majetkových práv, škody, bezdôvodného obohatenia

### Priebeh premlčania
- začiatok: deň, keď sa právo mohlo vykonať po prvý raz
- prerušenie: uznanie dlhu, uplatnenie práva na súde
- stavanie: prekážky brániace uplatneniu práva

### Preklúzia
- právo zaniká po uplynutí lehoty
- súd prihliada z úradnej povinnosti
- nemožno požadovať splnenie ani náhradu
- týka sa práv viazaných na presnú lehotu
- prísnejší následok ako premlčanie

### Čas a vydržanie
- dlhodobá držba → nadobudnutie vlastníctva
- podmienky: dobrá viera, nepretržitá držba
- čas je rozhodujúci prvok vydržania

### Význam pre prax
- právna istota
- motivácia konať v primeranom čase
- ochrana veriteľa aj dlžníka
- zásadné pre majetkové práva, zmluvy, držbu

---

## A7 — Fyzické osoby

**Centrum:** Fyzické osoby – subjektivita, spôsobilosť, ochrana osobnosti (základný subjekt občianskoprávnych vzťahov)

### Právna subjektivita (§ 7 OZ)
- vznik: narodením
- zánik: smrťou
- neodňateľná, trvá celý život
- schopnosť byť nositeľom práv a povinností

### Spôsobilosť na právne úkony
- vznik: plnoletosť (18 rokov)
- schopnosť vlastným konaním nadobúdať práva a povinnosti
- môže byť obmedzená alebo odňatá súdom
- dôvod: duševná porucha brániaca samostatnému konaniu

### Maloletí a obmedzenie spôsobilosti
- maloletí konajú cez zákonných zástupcov
- môžu robiť úkony primerané veku
- pri obmedzení spôsobilosti koná opatrovník
- rozsah obmedzenia určuje súd

### Ochrana osobnosti (§ 11–16 OZ)
- život a zdravie
- česť a dôstojnosť
- meno
- súkromie
- prejavy osobnej povahy (fotky, záznamy)
- na použitie podoby, mena, prejavov je potrebný súhlas osoby

### Práva pri zásahu do osobnosti
- právo na zdržanie sa zásahu
- právo na odstránenie následkov
- právo na primerané zadosťučinenie
- možnosť žiadať nemajetkovú ujmu v peniazoch
- osobnostné práva sú neprevoditeľné, nepostúpiteľné, nepremlčateľné

### Význam pre prax
- základ subjektov občianskoprávnych vzťahov
- ochrana integrity človeka
- limity autonómie vôle pri úkonoch maloletých
- zásadné pre zmluvy, rodinné právo, osobnostné spory

---

## A8 — Zastúpenie v občianskom práve

**Centrum:** Zastúpenie v občianskom práve (konanie v mene a na účet zastúpeného)

### Pojem zastúpenia (§ 22–33a OZ)
- zástupca koná v mene a na účet zastúpeného
- právne účinky vznikajú priamo zastúpenému
- umožňuje konať osobám bez spôsobilosti alebo s potrebou odbornej pomoci
- základný inštitút civilného práva

### Zákonné zastúpenie
- vzniká priamo zo zákona
- rodičia zastupujú maloletých
- opatrovník osoby s obmedzenou spôsobilosťou
- ďalšie zákonné situácie bez plnej moci
- rozsah určuje zákon alebo rozhodnutie súdu

### Zmluvné zastúpenie (plná moc, § 31 OZ)
- vzniká na základe prejavu vôle zastúpeného
- formy plnej moci: ústna, písomná, konkludentná
- ak úkon vyžaduje písomnú formu, plná moc musí byť písomná
- splnomocnenec koná v medziach plnej moci
- prekročenie oprávnenia: úkon je účinný len po schválení zastúpeným

### Prokúra (Obchodný zákonník)
- osobitný druh obchodného zastúpenia
- udeľuje ju podnikateľ
- prokurista môže konať vo všetkých úkonoch súvisiacich s prevádzkou podniku
- výnimka: scudzenie a zaťaženie nehnuteľností, ak nie je výslovne uvedené
- musí byť zapísaná v obchodnom registri

### Účinky zastúpenia
- právne následky konania zástupcu vznikajú priamo zastúpenému
- ak zástupca koná v rámci oprávnenia, úkon je účinný
- pri prekročení oprávnenia je úkon účinný až po schválení
- chráni právnu istotu a umožňuje flexibilné právne konanie

### Význam pre prax
- umožňuje konať osobám bez spôsobilosti
- zjednodušuje právne úkony v bežnom živote aj podnikaní
- kľúčové pre zmluvy, rodinné právo, obchodné právo
- chráni zastúpeného pred konaním mimo oprávnenia

---

## A9 — Právnické osoby

**Centrum:** Právnické osoby – pojem, druhy, vznik, zánik, konanie (umelý subjekt práva s vlastnou právnou subjektivitou)

### Pojem právnickej osoby (§ 18 OZ)
- umelý subjekt odlišný od fyzickej osoby
- má právnu subjektivitu
- môže nadobúdať práva a povinnosti
- vystupuje v právnych vzťahoch, uzatvára zmluvy
- nesie právnu zodpovednosť

### Druhy právnických osôb
- združenia osôb: spolky, občianske združenia, obchodné spoločnosti
- účelové združenia majetku: nadácie, neziskové fondy
- jednotky územnej samosprávy: obce, VÚC
- iné právnické osoby podľa osobitných zákonov: komory, verejnoprávne inštitúcie

### Vznik právnickej osoby (§ 19 OZ)
- vzniká zápisom do registra
- zápis má konštitutívny účinok
- právnická osoba existuje až odo dňa zápisu

### Registre
- obchodný register
- register mimovládnych organizácií
- register nadácií
- register neziskových organizácií
- osobitné registre

### Zánik právnickej osoby (§ 19a OZ)
- zánik: výmaz z registra (konštitutívny účinok)
- predchádza mu zrušenie (s likvidáciou alebo bez)
- rozhodnutie orgánu právnickej osoby
- rozhodnutie súdu
- uplynutie doby, na ktorú bola založená

### Konanie právnickej osoby (§ 20 OZ)
- štatutárne orgány: konateľ, predstavenstvo, predseda
- zamestnanci alebo poverené osoby v rámci oprávnenia
- zástupcovia na základe plnej moci
- úkony štatutára zaväzujú právnickú osobu priamo

### Význam pre prax
- umožňujú organizovanú činnosť osôb a majetku
- sú základom podnikania, verejnej správy, neziskového sektora
- právna istota: jasné pravidlá vzniku, zániku a konania
- kľúčové pre zmluvné právo, obchodné právo, správne právo

---

## A10 — Ochrana osobnosti fyzickej osoby

**Centrum:** Ochrana osobnosti fyzickej osoby, § 11–16 OZ (telesná integrita, dôstojnosť, súkromie, prejavy osobnej povahy)

### Pojem a povaha osobnostných práv
- chránia fyzickú osobu ako jedinečnú ľudskú bytosť
- neprevoditeľné
- nepostúpiteľné
- nepremlčateľné
- nemožno sa ich platne vzdať

### Chránené hodnoty (§ 11 OZ)
- život a zdravie
- občianska česť a ľudská dôstojnosť
- meno
- súkromie
- prejavy osobnej povahy (fotografie, obrazové a zvukové záznamy)

### Súhlas so zásahom
- potrebný na použitie podoby, mena, prejavov osobnej povahy
- výnimky: zákonné prípady, napr. spravodajské účely v primeranom rozsahu
- bez súhlasu ide o zásah do osobnostných práv

### Formy zásahu
- neoprávnené konanie alebo opomenutie
- zverejnenie informácií bez súhlasu
- šírenie nepravdivých tvrdení
- neprimeraný zásah do súkromia
- neoprávnené nakladanie s fotografiami alebo záznamami

### Prostriedky ochrany (§ 13 OZ)
- upustenie od zásahu
- odstránenie následkov: ospravedlnenie, stiahnutie článku, zničenie záznamu
- primerané zadosťučinenie morálne alebo peňažné (nemajetková ujma)
- výška závisí od intenzity zásahu, následkov, úmyslu, verejnosti, opakovania

### Konanie vo veciach ochrany osobnosti
- právomoc: krajský súd ako súd prvého stupňa
- dôvod: závažnosť a osobitný charakter sporov
- rozhoduje o zásahu, následkoch, zadosťučinení

### Význam pre prax
- chráni ľudskú dôstojnosť a integritu
- kľúčové pri mediálnych sporoch, online zásahoch, fotografiách, reputácii
- poskytuje účinné nástroje proti nepravdivým tvrdeniam a zásahom do súkromia
- posilňuje ochranu jednotlivca v digitálnom priestore

---

## A11 — Vecné práva: pojem, druhy, charakteristika

**Centrum:** Vecné práva – pojem, druhy, zásady (absolútne práva pôsobiace erga omnes)

### Pojem vecných práv
- absolútne práva pôsobiace voči každému
- upravujú priame právne panstvo nad vecou
- poskytujú silnejšiu ochranu než záväzkové práva
- verejná evidencia, najmä kataster

### Zásady vecných práv
- numerus clausus: taxatívny výpočet, nemožno vytvárať zmluvne
- droit de suite: právo nasleduje vec aj k nadobúdateľom
- droit de préférence: prednostné uspokojenie, najmä záložné právo

### Vlastnícke právo
- najširšie vecné právo
- držba
- užívanie
- nakladanie
- umožňuje vylúčiť iných z užívania veci

### Spoluvlastníctvo
- vlastnícke právo viacerých osôb k jednej veci
- podielové spoluvlastníctvo: podiel vyjadruje mieru účasti
- bezpodielové spoluvlastníctvo manželov (BSM)
- spoločné rozhodovanie o veci

### Záložné právo
- zabezpečovací inštitút
- veriteľ sa môže uspokojiť z predmetu záložného práva
- silný preferenčný účinok
- pôsobí voči každému (erga omnes)

### Vecné bremená
- obmedzujú vlastníka nehnuteľnosti v prospech inej osoby
- povinnosť niečo strpieť: prechod, prejazd
- alebo niečo konať: udržiavať studňu
- viažu sa na nehnuteľnosť, prechádzajú na nadobúdateľov

### Význam pre prax
- vysoká právna istota
- verejná evidencia v katastri
- zásadné pre vlastníctvo, nehnuteľnosti, zabezpečenie pohľadávok
- pôsobia voči každému, teda silná ochrana oprávneného

---

## A12 — Vlastnícke právo: pojem, obsah, nadobúdanie, ochrana

**Centrum:** Vlastnícke právo – pojem, obsah, nadobúdanie, ochrana (najúplnejšie vecné právo, pôsobí erga omnes)

### Pojem vlastníckeho práva (§ 123 OZ)
- najúplnejšie vecné právo
- absolútne právo pôsobiace voči každému
- každý musí rešpektovať vlastnícke postavenie
- najširšie právne panstvo nad vecou

### Obsah vlastníckeho práva
- ius possidendi: právo vec držať
- ius utendi: právo vec užívať
- ius fruendi: právo požívať plody a úžitky
- ius disponendi: právo nakladať (previesť, zaťažiť, zničiť)
- obmedzenia: zákon (susedské práva, životné prostredie) alebo zmluva

### Nadobúdanie vlastníctva
- zmluvou: pri nehnuteľnostiach uzavretie zmluvy a vklad do katastra (konštitutívny účinok)
- vydržaním (§ 134 OZ): originárny spôsob, oprávnená držba, dobrá viera, nepretržitá držba
- lehoty vydržania: 10 rokov nehnuteľnosti, 3 roky hnuteľné veci
- dedičstvom: vlastníctvo prechádza smrťou poručiteľa
- rozhodnutím orgánu verejnej moci: exekúcia, konkurz, vyvlastnenie

### Ochrana vlastníckeho práva
- reivindikačná žaloba (§ 126 OZ): žaloba na vydanie veci proti tomu, kto ju neoprávnene drží
- negatórna žaloba (§ 127 OZ): odstránenie neoprávneného zásahu a zdržanie sa ďalších zásahov
- typicky: imisie, obťažovanie, zásahy do pozemku
- ochrana vlastníctva je absolútna
- súdy chránia vlastníka aj proti zásahom verejnej moci, ak nie sú zákonné

### Význam pre prax
- základ nehnuteľností, podnikania, majetkových vzťahov
- vysoká právna istota: kataster, verejnosť údajov
- silná súdna ochrana
- kľúčové pre spory o držbu, hranice pozemkov, imisie, dedičstvo

---

## A13 — Vecné bremená: pojem, vznik, zánik

**Centrum:** Vecné bremená – pojem, druhy, vznik, zánik (obmedzenie vlastníka v prospech inej osoby, erga omnes)

### Pojem vecného bremena (§ 151n OZ)
- vecné právo obmedzujúce vlastníka nehnuteľnosti
- pôsobí erga omnes, každý musí rešpektovať
- obsah: povinnosť strpieť, konať alebo sa zdržať
- typické: prechod, prejazd, inžinierske siete

### Druhy vecných bremien
- in rem: viaže sa na panujúcu nehnuteľnosť
- oprávnenie prechádza na každého ďalšieho vlastníka (droit de suite)
- in personam: viaže sa na konkrétnu osobu
- zaniká jej smrťou, nie je spojené s vlastníctvom nehnuteľnosti

### Vznik vecného bremena
- zmluvou: písomná forma a vklad do katastra (konštitutívny účinok)
- závetom: poručiteľ môže zriadiť bremeno v prospech dediča alebo tretej osoby
- rozhodnutím súdu alebo správneho orgánu: napr. vyvlastnenie, prístupová cesta
- vydržaním: dlhodobé a oprávnené vykonávanie práva zodpovedajúceho bremenu

### Zánik vecného bremena
- výmazom z katastra (konštitutívny účinok pri in rem)
- smrťou oprávneného pri in personam
- zánikom panujúcej nehnuteľnosti alebo splnením účelu bremena
- dohodou alebo rozhodnutím súdu, ak zanikli dôvody jeho existencie

### Význam pre prax
- usporiadanie vzťahov medzi vlastníkmi nehnuteľností
- zabezpečenie prístupu, infraštruktúry, funkčného využívania pozemkov
- vysoká právna istota vďaka katastru
- pôsobenie voči každému, teda silná ochrana oprávneného

---

## A14 — Záložné právo: funkcie, vznik, zánik, výkon

**Centrum:** Záložné právo – funkcie, vznik, výkon, zánik (zabezpečenie pohľadávky, erga omnes, droit de préférence a droit de suite)

### Pojem záložného práva (§ 151a OZ)
- vecné právo na zabezpečenie pohľadávky
- veriteľ sa môže uspokojiť zo zálohu, ak dlžník nesplní záväzok
- pôsobí erga omnes
- droit de préférence: prednostné uspokojenie
- droit de suite: právo nasleduje vec

### Funkcie záložného práva
- zabezpečovacia: motivuje dlžníka plniť
- uspokojovacia: veriteľ sa uspokojí zo zálohu
- preventívna: znižuje riziko veriteľa

### Vznik záložného práva
- zmluvou: najčastejší spôsob, pri nehnuteľnostiach vklad do katastra (konštitutívny účinok)
- zo zákona: napr. záložné právo prenajímateľa
- rozhodnutím súdu alebo správneho orgánu: napr. zabezpečenie výživného
- vydržaním: dlhodobé vykonávanie práva zodpovedajúceho záložnému právu

### Predmet záložného práva
- hnuteľná vec
- nehnuteľnosť
- pohľadávka
- podnik
- majetkové právo

### Výkon záložného práva (§ 151j–151ma OZ)
- ak dlžník nesplní záväzok, veriteľ môže vykonať záložné právo
- dohodnutý spôsob: predaj mimo dražby
- verejná dražba
- predaj podľa osobitných predpisov: exekučný predaj
- výkon musí byť primeraný a nesmie poškodiť dlžníka nad nevyhnutnú mieru

### Zánik záložného práva
- zánikom zabezpečenej pohľadávky
- zánikom zálohu
- výmazom z katastra pri nehnuteľnostiach
- vzdanie sa záložného práva veriteľom
- splnením účelu zabezpečenia

### Význam pre prax
- najdôležitejší zabezpečovací inštitút
- vysoká právna istota: kataster, NCRP
- kľúčové pre úvery, hypotéky, podnikanie
- silná ochrana veriteľa cez prednostné uspokojenie

---

## A15 — Podielové spoluvlastníctvo

**Centrum:** Podielové spoluvlastníctvo, § 137–142 OZ (viac osôb vlastní tú istú vec, ideálne podiely)

### Pojem podielového spoluvlastníctva
- viac osôb vlastní tú istú vec
- každý má ideálny podiel (matematický, nie fyzický)
- ak nie je určené inak, podiely sú rovnaké
- podiel vyjadruje mieru účasti na právach a povinnostiach

### Práva a povinnosti spoluvlastníkov
- právo vec držať, užívať, nakladať podľa veľkosti podielu
- o hospodárení rozhoduje väčšina podľa podielov
- rozhodnutie väčšiny nesmie byť v rozpore s dobrými mravmi
- nesmie neprimerane zasahovať do práv menšinového spoluvlastníka

### Predkupné právo (§ 140 OZ)
- zákonné, automatické
- pri prevode podielu majú ostatní spoluvlastníci predkupné právo
- výnimka: prevod medzi blízkymi osobami
- porušenie: relatívna neplatnosť a možnosť požadovať nahradenie prejavu vôle
- chráni stabilitu spoluvlastníckych vzťahov

### Zánik spoluvlastníctva (§ 142 OZ)
- dohodou spoluvlastníkov: rozdelenie veci alebo zrušenie spoluvlastníctva
- súdnym rozhodnutím, ak sa spoluvlastníci nedohodnú
- súd môže vec rozdeliť, prikázať jednému spoluvlastníkovi za náhradu alebo nariadiť predaj
- predajom v dražbe, ak je to najvhodnejší spôsob vyporiadania
- nikto nesmie byť nútený zotrvať v spoluvlastníctve

### Význam pre prax
- časté pri nehnuteľnostiach, dedičstve, spoločnom majetku
- predkupné právo stabilizuje vlastnícke vzťahy
- súdne vyporiadanie chráni menšinu
- vysoká právna istota vďaka jasným pravidlám OZ

---

## A16 — Bezpodielové spoluvlastníctvo manželov (BSM)

**Centrum:** BSM – pojem, predmet, správa, zánik, vyporiadanie (osobitná forma spoluvlastníctva bez podielov)

### Pojem BSM
- vzniká automaticky uzavretím manželstva
- manželia nemajú podiely
- každý má rovnaké práva k celému spoločnému majetku
- ide o majetkové spoločenstvo manželov

### Čo patrí do BSM (§ 143 OZ)
- príjmy z práce
- veci kúpené z týchto príjmov
- majetok získaný spoločnou činnosťou

### Čo nepatrí do BSM
- majetok nadobudnutý pred manželstvom
- dedenie a darovanie
- veci osobnej potreby alebo výkonu povolania
- majetok patriaci výlučne jednému z manželov zo zákona

### Správa majetku BSM
- manželia majú rovnaké práva pri správe
- bežné úkony: každý môže konať samostatne
- závažné úkony, napr. prevod nehnuteľnosti, vyžadujú súhlas oboch
- povinnosť konať v záujme rodiny

### Zánik BSM (§ 148 OZ)
- zánik manželstva: rozvod, smrť
- rozhodnutie súdu o zrušení alebo obmedzení BSM
- napr. z dôvodu podnikania jedného z manželov
- dohoda manželov, ak to zákon umožňuje

### Vyporiadanie BSM (§ 149–150 OZ)
- dohoda manželov
- súdne rozhodnutie, ak sa nedohodnú
- zákonná fikcia po 3 rokoch: hnuteľné veci užívané jedným sa stávajú jeho vlastníctvom
- ostatné veci prechádzajú do podielového spoluvlastníctva
- pohľadávky a dlhy sa stávajú podielovými

### Kritériá súdu pri vyporiadaní
- zásada rovnosti podielov
- starostlivosť o rodinu
- príspevok k nadobudnutiu majetku
- správanie manželov

### Význam pre prax
- základ majetkového režimu manželov
- chráni ekonomickú stabilitu rodiny
- jasné pravidlá pri rozvode a dedičstve
- významné pri prevodoch nehnuteľností a podnikaní

---

## A17 — Záväzkové právne vzťahy: pojem, prvky, vznik záväzkov

**Centrum:** Záväzkové právne vzťahy – pojem, prvky, vznik (veriteľ – pohľadávka, dlžník – dlh, inter partes)

### Pojem záväzkového právneho vzťahu (§ 488 OZ)
- právny vzťah medzi veriteľom a dlžníkom
- veriteľ má pohľadávku, dlžník má dlh
- pôsobí inter partes, len medzi účastníkmi
- základ výmeny plnení, obchodu a spolupráce

### Subjekty
- veriteľ: oprávnený požadovať plnenie
- dlžník: povinný plniť

### Obsah
- práva a povinnosti strán
- dlžník poskytuje plnenie, veriteľ ho môže požadovať

### Predmet (plnenie)
- dare: niečo dať
- facere: niečo vykonať
- non facere: niečoho sa zdržať
- pati: niečo strpieť
- plnenie musí byť možné, dovolené, určité

### Vznik záväzkov zo zmluvy
- najčastejší a najdôležitejší zdroj záväzkov
- zmluva je dvojstranný právny úkon
- OZ upravuje všeobecné pravidlá a typové zmluvy
- kúpna, darovacia, nájomná, zmluva o dielo

### Vznik záväzkov z protiprávneho konania
- zodpovednosť za škodu (§ 420 a nasl.)
- porušenie právnej povinnosti → škoda → povinnosť nahradiť
- bezdôvodné obohatenie (§ 451 a nasl.)
- obohatenie bez právneho dôvodu → povinnosť vydať

### Vznik záväzkov z iných právnych skutočností
- nálezné (§ 135 OZ): nález cudzej veci
- rozhodnutie orgánu verejnej moci
- zákon
- vydanie veci z držby
- konanie bez príkazu

### Význam pre prax
- dynamická časť občianskeho práva
- umožňuje ekonomické a spoločenské procesy
- základ obchodných vzťahov, služieb, zmlúv
- jasné pravidlá pre vznik, zmenu a zánik práv a povinností

---

## A18 — Zabezpečenie záväzkov (§ 544–558 OZ)

**Centrum:** Zabezpečenie záväzkov – druhy, funkcie, účinky (posilnenie veriteľa, motivácia dlžníka, istota plnenia)

### Pojem zabezpečenia záväzkov
- právne prostriedky posilňujúce postavenie veriteľa
- motivujú dlžníka k riadnemu plneniu
- poskytujú alternatívne možnosti uspokojenia pohľadávky
- zvyšujú právnu istotu

### Zmluvná pokuta (§ 544 OZ)
- paušalizovaná náhrada škody
- dlžník zaplatí pokutu pri porušení povinnosti
- veriteľ ju môže požadovať aj bez vzniku škody
- súd môže pokutu primerane znížiť
- silný preventívny účinok

### Ručenie (§ 546–550 OZ)
- ručiteľ plní, ak dlžník nesplní po výzve veriteľa
- subsidiárne: veriteľ sa najprv obracia na dlžníka
- ručiteľ môže uplatniť námietky dlžníka
- vzniká najčastejšie písomnou zmluvou

### Záložné právo
- vecné právo umožňujúce uspokojenie zo zálohu
- predmet: vec, nehnuteľnosť, pohľadávka, podnik
- droit de préférence: prednostné uspokojenie
- droit de suite: právo nasleduje vec

### Záloha
- dlžník odovzdá veriteľovi vec ako zabezpečenie
- pri nesplnení záväzku môže veriteľ vec použiť na uspokojenie pohľadávky
- jednoduchý a praktický prostriedok

### Uznanie záväzku (§ 558 OZ)
- dlžník písomne uzná svoj dlh
- posilňuje postavenie veriteľa
- má účinok prerušenia premlčania

### Zádržné právo
- veriteľ môže zadržať vec dlžníka, ktorú má u seba
- trvá do splnenia záväzku
- rýchly a efektívny zabezpečovací prostriedok

### Význam pre prax
- zvyšujú istotu veriteľa
- motivujú dlžníka k riadnemu plneniu
- umožňujú rýchlejšie a efektívnejšie uspokojenie pohľadávok
- kľúčové v obchodných vzťahoch, úveroch, zmluvách

---

## A19 — Zmena záväzkov

**Centrum:** Zmena záväzkov – subjekty, obsah, právne formy (flexibilná úprava záväzkov bez ich zániku)

### Postúpenie pohľadávky (cesia, § 524 OZ)
- pôvodný veriteľ je postupca, nový veriteľ postupník
- nevyžaduje sa súhlas dlžníka
- dlžník musí byť o postúpení informovaný
- postupuje sa pohľadávka s príslušenstvom: úroky, zabezpečenie
- dlžník môže voči postupníkovi uplatniť všetky námietky, ktoré mal voči postupcovi

### Prevzatie dlhu (§ 531 OZ)
- tretia osoba preberá záväzok dlžníka
- vyžaduje sa súhlas veriteľa
- pôvodný dlžník je záväzku zbavený
- mení sa osoba, od ktorej má veriteľ právo požadovať plnenie

### Pristúpenie k záväzku (§ 533 OZ)
- tretia osoba vstupuje ako ďalší dlžník
- nový dlžník plní solidárne s pôvodným
- veriteľ môže požadovať plnenie od ktoréhokoľvek
- pôvodný dlžník nie je zbavený záväzku

### Novácia
- dohoda strán, pôvodný záväzok sa ruší
- nahrádza sa novým záväzkom
- musí byť zrejmé, že strany chcú pôvodný záväzok zrušiť
- mení sa predmet plnenia, rozsah povinností alebo právny dôvod

### Iné formy zmeny záväzkov
- uznanie dlhu: posilňuje veriteľa, prerušuje premlčanie
- zmena podmienok plnenia: splátky, lehota, spôsob plnenia
- dohoda o zmene zmluvy, ak to zákon alebo zmluva umožňuje

### Význam pre prax
- umožňuje flexibilné prispôsobenie záväzkov novým okolnostiam
- zabraňuje zbytočnému zániku a opätovnému vytváraniu záväzkov
- kľúčové pri úveroch, obchodných vzťahoch, dlhovej reštrukturalizácii
- posilňuje právnu istotu a stabilitu záväzkových vzťahov

---

## A20 — Zánik záväzkov

**Centrum:** Zánik záväzkov – spôsoby, účinky, právna istota (zánik povinnosti dlžníka plniť)

### Splnenie (§ 559 OZ)
- najčastejší a prirodzený spôsob zániku záväzku
- dlžník poskytne riadne, včas a úplné plnenie
- plnenie musí byť podľa zmluvy a na správnom mieste
- záväzok zaniká definitívne

### Kompenzácia – vzájomný zápočet (§ 580 OZ)
- veriteľ a dlžník majú voči sebe vzájomné pohľadávky
- podmienky: rovnaký druh plnenia, splatnosť
- môže byť jednostranná alebo dohodou
- záväzok zaniká v rozsahu, v akom sa pohľadávky kryjú

### Dohoda o narovnaní (§ 585 OZ)
- strany odstránia sporné alebo pochybné práva
- nahradia ich novým záväzkom
- pôvodný záväzok zaniká
- narovnanie stabilizuje právny vzťah

### Odstúpenie od zmluvy (§ 48 OZ)
- zmluva sa ruší ex tunc, od začiatku
- strany si musia vrátiť plnenia
- možné len ak to umožňuje zákon alebo zmluva

### Nemožnosť plnenia (§ 575 OZ)
- záväzok zaniká, ak sa plnenie stane objektívne nemožným
- nemožnosť musí byť skutočná, nie subjektívna
- finančná neschopnosť dlžníka nie je nemožnosť plnenia

### Konfúzia (splynutie)
- veriteľ a dlžník sa stanú tou istou osobou
- typicky: dedenie, zlúčenie spoločností
- záväzok zaniká automaticky

### Preklúzia
- zánik práva uplynutím prekluzívnej lehoty
- ak zanikne právo, zaniká aj záväzok

### Smrť dlžníka alebo veriteľa
- záväzok zaniká, ak je plnenie viazané na osobu
- napr. umelecké dielo, osobné služby

### Význam pre prax
- uzatvára právny vzťah
- odstraňuje povinnosť dlžníka plniť
- poskytuje právnu istotu a stabilitu
- umožňuje efektívne riešenie sporov a vyrovnanie pohľadávok

---

## A21 — Zodpovednosť za vady a zodpovednosť za omeškanie

**Centrum:** Zodpovednosť za vady a omeškanie – práva veriteľa, povinnosti dlžníka (kľúčové inštitúty záväzkového práva)

### Zodpovednosť za vady (§ 499–510 OZ)
- vzniká, keď odovzdaná vec nezodpovedá zmluve
- vady zjavné: odhaliteľné pri prevzatí
- vady skryté: prejavia sa neskôr
- dlžník zodpovedá za vady existujúce pri odovzdaní, aj keď sa prejavia neskôr
- vady musia byť uplatnené v záručnej dobe; pri spotrebiteľskej kúpe podľa OZ 2 roky

### Práva kupujúceho pri vadách
- oprava veci
- výmena za bezvadnú
- primeraná zľava z ceny
- odstúpenie od zmluvy pri podstatnom porušení zmluvy
- pri skrytých vadách lehota primeraná povahe veci

### Zodpovednosť za omeškanie dlžníka (§ 517 OZ)
- dlžník nesplní záväzok v dobe plnenia
- veriteľ môže požadovať úrok z omeškania
- pri peňažných záväzkoch je zákonná sadzba určená ako sadzba ECB + 5 p. b.
- dlžník zodpovedá za škodu spôsobenú omeškaním, ak ju veriteľ preukáže
- veriteľ nemusí prijímať čiastkové plnenia, ak by mu to spôsobilo ťažkosti

### Omeškanie veriteľa (§ 520 OZ)
- veriteľ neprijme riadne ponúknuté plnenie
- dlžník nezodpovedá za škodu
- dlžník môže plnenie uložiť do súdnej úschovy

### Význam pre prax
- chráni kupujúceho pred nekvalitným plnením
- motivuje dlžníka plniť včas
- umožňuje veriteľovi kompenzovať škodu a omeškanie
- stabilizuje zmluvné vzťahy a podporuje právnu istotu

---

## A22 — Prevencia a všeobecná zodpovednosť za škodu

**Centrum:** Prevencia (§ 415–419 OZ) a všeobecná zodpovednosť za škodu (§ 420 OZ) (predchádzanie škodám a reparácia škody pri porušení povinnosti)

### Preventívna povinnosť (§ 415 OZ)
- každý je povinný konať tak, aby nedochádzalo ku škodám
- platí pre zdravie, majetok, prírodu, práva iných
- základný princíp civilnej zodpovednosti
- porušenie prevencie býva prvým krokom k vzniku škody

### Obsah preventívnej povinnosti
- zdržať sa konania, ktoré môže spôsobiť škodu
- vykonať opatrenia na odvrátenie škody
- upozorniť na hroziacu škodu, ak jej nemožno zabrániť
- povinnosť predvídať následky svojho konania

### Všeobecná zodpovednosť za škodu (§ 420 OZ)
- založená na zavinení
- domnienka zavinenia, dlžník sa musí liberovať
- chráni poškodeného, posilňuje jeho postavenie
- základ civilného deliktu

### Podmienky vzniku zodpovednosti
- protiprávny úkon: konanie alebo opomenutie porušujúce právnu povinnosť
- škoda majetková: skutočná škoda a ušlý zisk
- škoda nemajetková: nemajetková ujma
- príčinná súvislosť: škoda musí byť následkom protiprávneho konania
- zavinenie: úmysel alebo nedbanlivosť, predpokladá sa

### Formy náhrady škody (§ 442 OZ)
- uvedenie do pôvodného stavu
- peňažná náhrada, ak uvedenie nie je možné alebo účelné
- cieľ: úplná reparácia škody

### Význam pre prax
- prevencia minimalizuje riziko sporov
- všeobecná zodpovednosť poskytuje poškodenému účinnú ochranu
- domnienka zavinenia uľahčuje dokazovanie
- kľúčové pri dopravných nehodách, škodách na majetku, profesionálnej zodpovednosti

---

## A23 — Osobitné prípady zodpovednosti za škodu

**Centrum:** Osobitné režimy zodpovednosti za škodu (objektívna zodpovednosť, posilnená ochrana poškodeného)

### Prevádzková činnosť (§ 420a OZ)
- objektívna zodpovednosť
- škoda spôsobená okolnosťami majúcimi pôvod v prevádzke: stroje, technológie, doprava
- zavinenie sa nevyžaduje
- liberačné dôvody: neodvrátiteľná udalosť, konanie poškodeného

### Vadný výrobok (zákon č. 294/1999 Z. z.)
- výrobca zodpovedá za škodu spôsobenú vadou výrobku
- objektívna zodpovednosť
- poškodený musí preukázať škodu, vadu výrobku a príčinnú súvislosť

### Škoda na vnesených veciach (§ 433 OZ)
- prevádzkovateľ ubytovania zodpovedá za veci vnesené hosťom
- objektívna zodpovednosť
- obmedzený limit zodpovednosti, ak vec nebola prevzatá do úschovy

### Škoda spôsobená zvieraťom (§ 431 OZ)
- zodpovedá ten, kto zviera držal alebo nad ním vykonával dohľad
- objektívna zodpovednosť
- liberačný dôvod: preukázanie, že dohľad nezanedbal

### Škoda spôsobená osobou nespôsobilou (§ 422 OZ)
- zodpovedá ten, kto vykonáva dohľad nad osobou nespôsobilou posúdiť následky
- napr. dieťa, osoba s duševnou poruchou
- objektívna zodpovednosť
- liberačný dôvod: riadny výkon dohľadu

### Podstata objektívnej zodpovednosti
- nezisťuje sa zavinenie
- stačí vznik škody a príčinná súvislosť
- zbavenie zodpovednosti len preukázaním zákonných liberačných dôvodov

### Význam pre prax
- posilňuje ochranu poškodeného
- zjednodušuje dokazovanie, netreba preukazovať zavinenie
- kľúčové pri dopravných nehodách, ubytovaní, výrobkoch, zvieratách
- dopĺňa všeobecnú zodpovednosť za škodu a preventívnu povinnosť

---

## A24 — Spôsob a rozsah náhrady škody

**Centrum:** Náhrada škody – rozsah, spôsob, korekcie (úplná reparácia ujmy a spravodlivé úpravy)

### Rozsah náhrady škody (§ 442 OZ)
- cieľ: uviesť poškodeného do stavu, v ktorom by bol bez škody
- skutočná škoda (damnum emergens): priame zmenšenie majetku
- ušlý zisk (lucrum cessans): to, čo by poškodený získal
- poškodený musí preukázať vznik škody, jej výšku a príčinnú súvislosť

### Spôsob náhrady škody
- naturálna reštitúcia: uvedenie do pôvodného stavu
- oprava veci, obnovenie stavu, vrátenie veci
- preferovaná, ak je možná a účelná
- peňažná náhrada, ak naturálna reštitúcia nie je možná alebo účelná
- výška podľa ceny v čase vzniku škody

### Spoluzavinenie poškodeného (§ 441 OZ)
- ak poškodený prispel k vzniku škody, náhrada sa zníži
- nedbanlivosť
- nerešpektovanie pokynov
- nebezpečné správanie
- pri hrubom spoluzavinení výrazná redukcia náhrady

### Zníženie náhrady škody (§ 450 OZ)
- súd môže náhradu primerane znížiť, ak škodca konal v tiesni
- ak škoda vznikla za mimoriadnych okolností
- ak by plná náhrada bola vzhľadom na pomery škodcu neprimerane tvrdá
- umožňuje zohľadniť sociálne a ľudské okolnosti

### Význam pre prax
- zabezpečuje úplnú reparáciu poškodeného
- umožňuje spravodlivé korekcie pri spoluzavinení a mimoriadnych okolnostiach
- kľúčové pri dopravných nehodách, škodách na majetku, profesionálnej zodpovednosti
- jasné pravidlá pre výpočet a spôsob náhrady

---

## A25 — Bezdôvodné obohatenie

**Centrum:** Bezdôvodné obohatenie – podstata, predmet vydania, špeciálne prípady, premlčanie (navrátenie majetkovej rovnováhy)

### Podstata bezdôvodného obohatenia (§ 451 OZ)
- majetkový prospech bez právneho dôvodu, napr. omylom zaslané peniaze
- prospech z neplatného právneho úkonu
- prospech z právneho dôvodu, ktorý odpadol
- prospech z konania bez príkazu, ak nie je v súlade so zákonom
- prospech z majetku iného bez právneho odôvodnenia
- obohatený musí vydať vec alebo jej hodnotu

### Predmet vydania (§ 456 OZ)
- skutočný prospech
- úžitky, ktoré obohatený získal
- hodnota, ak vec nemožno vrátiť
- pri dobrej viere vydáva len to, čo mu zostalo
- pri zlej viere vydáva všetko vrátane úžitkov

### Špeciálne prípady (§ 458 OZ)
- plnenie za iného: kto plnil za niekoho iného, má právo požadovať náhradu od tejto osoby
- neplatný právny úkon: strany si vracajú plnenia navzájom

### Premlčanie (§ 107 OZ)
- subjektívna lehota 2 roky odo dňa, keď sa poškodený dozvedel o obohatení a o tom, kto sa obohatil
- objektívna lehota 3 roky odo dňa, keď k obohateniu došlo
- úmyselné obohatenie: predĺžená objektívna lehota 10 rokov

### Význam pre prax
- zabraňuje neoprávnenému obohateniu na úkor iného
- obnovuje majetkovú rovnováhu
- kľúčové pri omylom zaslaných platbách, neplatných zmluvách, konaní bez príkazu
- jasné pravidlá pre vydanie prospechu a premlčanie

---

## A26 — Predpoklady dedenia

**Centrum:** Predpoklady dedenia – smrť, dedič, spôsobilosť, tituly, nespôsobilosť, konanie (dedičstvo prechádza smrťou poručiteľa)

### Smrť poručiteľa (§ 460 OZ)
- dedičstvo sa otvára smrťou poručiteľa
- môže ísť aj o vyhlásenie za mŕtveho
- až týmto okamihom vzniká dedičské právo

### Existencia dedičov
- dedičom môže byť fyzická alebo právnická osoba
- musí byť živý v okamihu smrti poručiteľa
- alebo počatý a narodiť sa živý

### Spôsobilosť dediť (§ 469 OZ)
- dedič musí mať právnu subjektivitu
- nesmie existovať dôvod dedičskej nespôsobilosti
- spôsobilosť je základnou podmienkou dedenia

### Tituly dedenia
- závet: prejav poslednej vôle, má prednosť
- zákon: ak niet závetu alebo nepokrýva celý majetok
- dohoda dedičov v rámci dedičského konania
- závet musí byť platný a spôsobilý vyvolať právne účinky

### Dedičská nespôsobilosť (§ 469a OZ)
- úmyselný trestný čin proti poručiteľovi, jeho manželovi, deťom alebo rodičom
- závažné porušenie povinností voči poručiteľovi
- konanie proti prejavu poslednej vôle, napr. falšovanie závetu
- nespôsobilosť pôsobí automaticky, dedič sa posudzuje, akoby neexistoval

### Dedičské konanie
- prechod dedičstva sa realizuje pred súdom a notárom ako súdnym komisárom
- dedičstvo sa nadobúda právoplatným rozhodnutím
- konanie zabezpečuje určenie dedičov, rozsahu dedičstva a jeho rozdelenie

### Význam pre prax
- zabezpečuje, aby dedičstvo prešlo na osoby určené zákonom alebo poručiteľom
- vylučuje osoby, ktoré sa voči poručiteľovi závažne previnili
- vytvára právnu istotu pri prechode majetku po smrti
- kľúčové pri sporoch o dedičské právo, platnosť závetu, nespôsobilosť

---

## A27 — Dedenie zo zákona

**Centrum:** Dedenie zo zákona – dedičské skupiny, postupnosť, odúmrť (nastupuje, ak niet závetu alebo nepokrýva celý majetok)

### 1. dedičská skupina (§ 473 OZ)
- dedia deti poručiteľa a manžel alebo manželka
- každé dieťa dedí rovnaký diel
- manžel dedí rovnaký diel ako deti
- ak dieťa nededí, nastupujú jeho potomkovia (právo reprezentácie)

### 2. dedičská skupina (§ 474 OZ)
- ak niet potomkov, dedia manžel alebo manželka a rodičia poručiteľa
- osoby žijúce s poručiteľom najmenej rok v spoločnej domácnosti
- ktoré sa starali o domácnosť alebo boli odkázané na výživu
- manžel dedí najmenej polovicu dedičstva

### 3. dedičská skupina (§ 475 OZ)
- ak niet dedičov z 1. ani 2. skupiny, dedia súrodenci poručiteľa
- osoby žijúce s poručiteľom v spoločnej domácnosti ako v 2. skupine
- ak súrodenec nededí, nastupujú jeho deti (právo reprezentácie)

### 4. dedičská skupina (§ 475a OZ)
- ak niet dedičov z predchádzajúcich skupín, dedia prarodičia poručiteľa
- ak prarodič nededí, dedí jeho línia, teda ďalší predkovia v tej vetve

### Dedenie štátom (§ 462 OZ)
- ak niet žiadnych dedičov, dedičstvo pripadne štátu
- ide o odúmrť
- štát dedí bez povinnosti prijatia

### Podstata zákonného dedenia
- chráni rodinné väzby
- zabezpečuje, aby majetok prešiel na osoby s najbližším vzťahom k poručiteľovi
- nastupuje len vtedy, ak poručiteľ neurčil inak závetom

### Význam pre prax
- jasná postupnosť dedičských skupín zabezpečuje právnu istotu
- reprezentácia chráni potomkov pred vylúčením
- štát dedí len ako posledná možnosť
- kľúčové pri dedičských sporoch, neplatných závetoch, neúplnom pokrytí majetku

---

## A28 — Dedenie zo závetu

**Centrum:** Dedenie zo závetu – formy, podstata, neopomenuteľní dediči, obsah, neplatnosť (závet ako prejav poslednej vôle poručiteľa)

### Vlastnoručný závet (holografný)
- celý napísaný vlastnou rukou
- poručiteľ ho musí podpísať
- nepotrebuje svedkov

### Alografický závet
- napísaný inou osobou alebo technicky
- poručiteľ ho vlastnoručne podpíše
- prítomnosť dvoch svedkov, ktorí potvrdia prejav vôle

### Notárska zápisnica
- najbezpečnejšia forma
- spisuje notár
- ukladá sa do centrálneho registra závetov

### Podstata závetu
- osobný právny úkon, nemožno ho urobiť cez zástupcu
- odvolateľný, poručiteľ ho môže kedykoľvek zmeniť alebo zrušiť
- musí byť urobený slobodne, vážne, určito, zrozumiteľne
- má prednosť pred zákonom, ak je platný a účinný

### Neopomenuteľní dediči (§ 479 OZ)
- poručiteľ nemôže úplne vylúčiť svoje deti bez dôvodu
- maloleté deti majú nárok na celý zákonný podiel
- plnoleté deti aspoň na polovicu zákonného podielu
- pri opomenutí je závet v tejto časti relatívne neplatný

### Obsah závetu
- určenie dedičov
- určenie podielov
- odkaz (legát)
- podmienky a príkazy, ak nie sú v rozpore so zákonom

### Neplatnosť závetu
- nebola dodržaná forma
- poručiteľ nebol spôsobilý
- závet bol urobený pod nátlakom
- obsahuje nezrozumiteľné alebo neurčité ustanovenia

### Význam pre prax
- umožňuje poručiteľovi autonómne rozhodnúť o majetku
- chráni deti cez povinný podiel
- poskytuje flexibilitu: odkazy, podmienky, príkazy
- jasné formálne pravidlá zabezpečujú právnu istotu pri dedičských sporoch

---

## A29 — Spotrebiteľská zmluva

**Centrum:** Spotrebiteľská zmluva – pojem, subjekty, neprijateľné podmienky, ochrana spotrebiteľa (zmluva medzi podnikateľom a spotrebiteľom)

### Pojem spotrebiteľskej zmluvy (§ 52 OZ)
- zmluva medzi dodávateľom (podnikateľom) a spotrebiteľom (nepodnikateľom)
- cieľ: ochrana slabšej strany
- špeciálne pravidlá obmedzujú zmluvnú voľnosť dodávateľa

### Subjekty spotrebiteľskej zmluvy
- dodávateľ: podnikateľ konajúci v rámci podnikania
- spotrebiteľ: fyzická osoba nekonajúca v rámci podnikania
- spotrebiteľ sa nemôže vopred vzdať práv, ktoré mu zákon priznáva

### Pojmové znaky
- asymetria medzi stranami
- štandardizované podmienky, formulárové zmluvy
- informačná povinnosť dodávateľa
- výklad v prospech spotrebiteľa (§ 54 OZ)

### Neprijateľné podmienky (§ 53 OZ)
- sú v rozpore s dobrou vierou
- spôsobujú výraznú nerovnováhu v neprospech spotrebiteľa
- sú neplatné
- príklady: vylúčenie alebo obmedzenie zodpovednosti dodávateľa
- jednostranné zmeny zmluvy bez dôvodu, neprimerané sankcie, obmedzenie práva odstúpiť

### Zmluvy na diaľku a mimo prevádzkových priestorov
- spotrebiteľ má právo odstúpiť do 14 dní bez uvedenia dôvodu
- ak dodávateľ nepoučí, lehota sa predlžuje na 12 mesiacov
- upravené zákonom č. 108/2024 Z. z. o ochrane spotrebiteľa (účinný od 1. 7. 2024)

### Ochranné mechanizmy
- zákaz neprijateľných podmienok
- informačné povinnosti
- právo na reklamáciu
- právo na odstúpenie
- výklad v prospech spotrebiteľa

### Význam pre prax
- chráni spotrebiteľa pred nekalými praktikami
- zabezpečuje férové zmluvné podmienky
- posilňuje transparentnosť a rovnováhu medzi stranami
- kľúčové pri e-commerce, službách, telekomunikáciách, bankových produktoch

---

## A30 — Kúpna, zámenná a darovacia zmluva

**Centrum:** Kúpna, zámenná a darovacia zmluva – podstata, náležitosti, rozdiely (tri základné typy prevodových zmlúv v OZ)

### Kúpna zmluva (§ 588–600 OZ)
- predávajúci odovzdá vec a prevedie vlastníctvo
- kupujúci zaplatí kúpnu cenu
- podstatné náležitosti: predmet kúpy a cena alebo spôsob jej určenia
- zodpovednosť za vady podľa § 597–600 OZ: oprava, výmena, zľava, odstúpenie
- pri nehnuteľnostiach písomná forma

### Zámenná zmluva (§ 611 OZ)
- obe strany si navzájom prevádzajú vlastnícke právo
- každá strana je súčasne predávajúcim aj kupujúcim
- pravidlá o kúpe sa použijú primerane
- ak sú veci nerovnakej hodnoty, je možný doplatok
- vhodná pri výmene nehnuteľností, pozemkov, hnuteľných vecí

### Darovacia zmluva (§ 628–630 OZ)
- darca bezodplatne prenechá dar obdarovanému
- obdarovaný dar prijíma
- podstatné znaky: bezodplatnosť, dobrovoľnosť, prejav vôle darcu dar odovzdať
- forma: ústna, ak sa dar odovzdá pri uzavretí; pri nehnuteľnostiach písomná
- vrátenie daru (§ 630 OZ) pri hrubej nevďačnosti obdarovaného

### Rozdiely medzi zmluvami
- kúpna zmluva: odplatná, synallagmatická, plnenie za plnenie
- zámenná zmluva: obojstranné prevody, odplatná, ale bez ceny
- darovacia zmluva: bezodplatná, jednostranné obohatenie obdarovaného

### Význam pre prax
- kúpna zmluva je najčastejší typ prevodu majetku
- zámena je praktická pri výmene nehnuteľností
- darovanie je časté v rodine, s možnosťou vrátenia daru pri nevďačnosti
- jasné odlíšenie pomáha pri voľbe správnej zmluvy a riešení sporov

---

## A31 — Zmluva o dielo

**Centrum:** Zmluva o dielo – pojem, náležitosti, vady, osobitné druhy, odovzdanie (zmluva výsledku, cieľom je hotové dielo)

### Pojem diela (§ 631 OZ)
- zhotovenie veci
- oprava
- úprava
- údržba
- hmotná alebo nehmotná zmena veci: softvér, projektová dokumentácia
- dielo môže byť vykonané osobne alebo cez subdodávateľov, ak to zmluva nevylučuje

### Podstatné náležitosti zmluvy
- predmet diela musí byť určitý, vykonateľný, jasne definovaný
- odmena: pevná suma, podľa rozpočtu alebo spôsob výpočtu
- ak je odmena určená rozpočtom, zhotoviteľ ju nesmie jednostranne zvýšiť bez súhlasu objednávateľa
- lehota a spôsob vykonania; ak nie je dohodnuté, vykonanie v primeranej lehote

### Zodpovednosť za vady diela (§ 633–637 OZ)
- zhotoviteľ zodpovedá za vady, ktoré mal predmet diela pri odovzdaní
- odstránenie vady
- zľava z ceny
- odstúpenie od zmluvy pri podstatných vadách
- pri stavbách minimálna záručná doba 24 mesiacov, ak sa strany nedohodnú inak

### Osobitné druhy zmluvy o dielo
- dielo na nehnuteľnosti: často vyžaduje písomnú formu, odovzdanie protokolom
- projektové práce: výsledkom je dokumentácia, nie fyzická vec
- opravy a údržba: zhotoviteľ zodpovedá za správne vykonanie zásahu
- dielo na veci objednávateľa: zhotoviteľ musí vec chrániť a po vykonaní diela ju vrátiť

### Odovzdanie diela (§ 642 OZ)
- dielo je splnené jeho riadnym dokončením a odovzdaním
- objednávateľ je povinný dielo prevziať, ak nemá podstatné vady

### Význam pre prax
- kľúčová zmluva pre stavebníctvo, IT, opravy, kreatívne práce
- jasné pravidlá pre odmenu, vady a odovzdanie
- flexibilná úprava umožňuje široké využitie
- chráni objednávateľa aj zhotoviteľa cez presné povinnosti

---

## A32 — Zmluva o pôžičke a zmluva o výpožičke

**Centrum:** Pôžička a výpožička – pojem, náležitosti, povinnosti, rozdiely (zastupiteľné vs. individuálne veci, prechod vlastníctva vs. užívanie)

### Zmluva o pôžičke (§ 657–658 OZ)
- reálna zmluva, vzniká až odovzdaním veci
- predmet: zastupiteľné veci, napr. peniaze, potraviny, suroviny
- dlžník vracia rovnaké množstvo rovnakého druhu a kvality
- prechádza vlastnícke právo na dlžníka, ktorý môže vec spotrebovať
- odmena vo forme úrokov môže byť dohodnutá, inak ide o bezodplatnú pôžičku

### Zmluva o výpožičke (§ 659–662 OZ)
- požičiavateľ prenecháva vec na dočasné a bezodplatné užívanie
- predmet: individuálne určená vec
- vracia sa tá istá vec, nie vec rovnakého druhu
- vypožičiavateľ musí vec užívať riadne a chrániť ju pred poškodením
- vlastníctvo neprechádza na vypožičiavateľa

### Rozdiely medzi pôžičkou a výpožičkou
- pôžička: zastupiteľné veci, prechod vlastníctva, vracia sa množstvo
- výpožička: individuálna vec, bez prechodu vlastníctva, vracia sa tá istá vec
- pôžička je reálna zmluva, výpožička konsenzuálna
- pôžička môže byť odplatná, výpožička je vždy bezodplatná

### Praktické príklady
- pôžička: 100 eur, 5 kg múky, liter benzínu
- výpožička: bicykel, kniha, náradie, hudobný nástroj

### Význam pre prax
- pôžička sa uplatňuje vo finančných vzťahoch, krátkodobých aj dlhodobých
- výpožička je typická pre bežné občianske, susedské a rodinné vzťahy
- jasné odlíšenie bráni sporom o vlastníctvo, poškodenie veci či povinnosť vrátiť

---

## A33 — Nájomná zmluva

**Centrum:** Nájomná zmluva – pojem, náležitosti, práva a povinnosti, osobitné druhy nájmu (dočasné užívanie cudzej veci za odplatu)

### Pojem nájomnej zmluvy (§ 663 OZ)
- prenajímateľ prenechá vec na dočasné užívanie
- nájomca platí nájomné
- vlastníkom zostáva prenajímateľ
- typická zmluva užívania, nie prevodu

### Podstatné náležitosti
- predmet nájmu: určitá vec spôsobilá na užívanie
- nájomné: pevne dohodnuté alebo určené spôsobom výpočtu
- čas nájmu: určitý alebo neurčitý
- pri neurčitom čase je možná výpoveď

### Práva a povinnosti strán (§ 665–676 OZ)
- prenajímateľ: odovzdať vec v stave spôsobilom na užívanie
- prenajímateľ: zabezpečiť nerušené užívanie a vykonávať potrebné opravy
- nájomca: platiť nájomné a užívať vec riadne podľa zmluvy
- nájomca: vykonávať bežnú údržbu a drobné opravy
- nájomca: vrátiť vec v stave zodpovedajúcom obvyklému opotrebeniu
- pri vadách veci môže nájomca požadovať zľavu alebo odstúpiť od zmluvy

### Nájom bytu (§ 685–716 OZ)
- zvýšená ochrana nájomcu
- nájomné možno zvyšovať len podľa zákona
- prenajímateľ môže vypovedať len zo zákonných dôvodov
- nájomca platí úhrady za služby a má právo na nerušené užívanie

### Nájom nebytových priestorov (zákon č. 116/1990 Zb.)
- používa sa pri podnikaní
- vyžaduje sa písomná forma
- širšie výpovedné dôvody
- väčšia zmluvná voľnosť, bez osobitnej ochrany nájomcu

### Podnájom
- nájomca môže prenechať vec tretej osobe, ak to prenajímateľ dovolí
- podnájom zaniká najneskôr so zánikom nájmu

### Význam pre prax
- stabilizuje užívanie majetku bez prechodu vlastníctva
- jasné rozdelenie opráv a povinností
- špeciálna ochrana pri nájme bytu
- dôležité pri podnikaní v nebytových priestoroch

---

## A34 — Nájom bytu

**Centrum:** Nájom bytu podľa OZ a krátkodobý nájom – pojem, ochrana, výpoveď, rozdiely (osobitná ochrana nájomcu vs. flexibilita krátkodobého nájmu)

### Nájom bytu podľa OZ (§ 685–716 OZ)
- prenajímateľ prenechá byt na užívanie za nájomné
- nájomca byt riadne užíva, platí nájomné a služby
- prenajímateľ musí zabezpečiť byt v stave spôsobilom na užívanie
- prenajímateľ musí zabezpečiť nerušené bývanie
- nájomca vykonáva bežnú údržbu a drobné opravy

### Výpoveď nájmu bytu (§ 711 OZ)
- prenajímateľ môže vypovedať nájom len z taxatívnych dôvodov
- hrubé porušenie povinností nájomcu: neplatenie, poškodzovanie
- potreba bytu pre prenajímateľa alebo jeho blízkych
- užívanie bytu inak, než bolo dohodnuté, bez súhlasu
- výpovedná lehota spravidla 3 mesiace

### Ochrana nájomcu
- výpoveď musí byť písomná
- nájomca môže podať žalobu na neplatnosť výpovede
- prenajímateľ nemôže jednostranne zvyšovať nájomné bez zákonného postupu
- silná ochrana nájomcu ako slabšej strany

### Krátkodobý nájom bytu (zákon č. 98/2014 Z. z.)
- určený na flexibilné bývanie, najviac 6 rokov
- zmluva musí byť písomná
- musí byť registrovaná v Notárskom centrálnom registri nájmov
- výpovedná lehota len 15 dní, jednoduchšie ukončenie nájmu
- prenajímateľ má širšie možnosti výpovede a väčšiu kontrolu

### Rozdiely medzi OZ nájmom a krátkodobým nájmom
- nájom podľa OZ: silná ochrana nájomcu, dlhodobé bývanie
- nájom podľa OZ: prísne výpovedné dôvody, 3-mesačná výpovedná lehota
- krátkodobý nájom: flexibilita, rýchle ukončenie do 15 dní
- krátkodobý nájom: slabšia ochrana nájomcu, vhodný na krátkodobé bývanie

### Význam pre prax
- nájom podľa OZ chráni stabilitu bývania
- krátkodobý nájom umožňuje rýchle a flexibilné riešenia
- prenajímateľ má pri krátkodobom nájme väčšiu kontrolu
- nájomca musí poznať rozdiely, aby si zvolil vhodný typ bývania

---

## A35 — Príkazná, sprostredkovateľská a obstarávacie zmluvy

**Centrum:** Príkaz, sprostredkovanie a obstaranie – pojem, náležitosti, rozdiely (konanie v mene príkazcu, vyhľadanie záujemcu, konanie vo vlastnom mene)

### Príkazná zmluva (§ 724–736 OZ)
- príkazník sa zaväzuje obstarať vec alebo vykonať právny úkon pre príkazcu
- môže byť bezodplatná alebo odplatná
- príkazník koná v mene príkazcu
- povinnosť konať s odbornou starostlivosťou
- príkazca poskytuje súčinnosť a nahrádza náklady
- príkaz možno vypovedať, ale príkazník musí dokončiť úkony, ktoré neznesú odklad

### Sprostredkovateľská zmluva (§ 642–651 ObchZ)
- sprostredkovateľ sa zaväzuje vyhľadať záujemcu na uzavretie určitej zmluvy
- sprostredkovateľ nevykonáva právny úkon
- odmena sa platí spravidla až po uzavretí zmluvy
- povinnosť konať čestne, informovať a chrániť záujmy objednávateľa
- v občianskoprávnych vzťahoch sa OZ použije subsidiárne
- typické príklady: realitné služby, pracovné agentúry, obchodné kontakty

### Zmluva o obstaraní veci (§ 733 OZ)
- obstaranie kúpy alebo dodania veci
- obstarávateľ koná vlastným menom, ale na účet objednávateľa
- objednávateľ nahrádza náklady a platí odmenu
- obstarávateľ musí konať podľa pokynov objednávateľa

### Zmluva o obstaraní predaja veci (§ 734 OZ)
- obstaranie predaja veci objednávateľa
- obstarávateľ predáva vo vlastnom mene, ale na účet objednávateľa
- odmena býva percentuálna
- podobná komisionárskej zmluve

### Rozdiely medzi zmluvami
- príkazná zmluva: príkazník koná v mene príkazcu
- sprostredkovanie: sprostredkovateľ len vyhľadá záujemcu, právny úkon nevykonáva
- obstarávacie zmluvy: obstarávateľ koná vo vlastnom mene, ale na účet objednávateľa

### Význam pre prax
- príkaz sa využíva pri právnych úkonoch, zastupovaní, správe majetku
- sprostredkovanie pri realitných službách, obchodných kontaktoch, pracovných agentúrach
- obstaranie pri nákupe, predaji, komisionárskych vzťahoch
- jasné odlíšenie bráni sporom o zodpovednosť, odmenu a právne účinky konania

---

## A36 — Zmluvy o preprave

**Centrum:** Zmluvy o preprave – pojem, náležitosti, druhy, zodpovednosť dopravcu (bezpečné a riadne vykonanie prepravy osôb alebo vecí)

### Pojem prepravnej zmluvy
- dopravca sa zaväzuje prepraviť osobu alebo vec do určeného miesta
- odosielateľ alebo cestujúci sa zaväzuje zaplatiť odplatu
- podstatou je bezpečné, riadne a včasné vykonanie prepravy
- dopravca zodpovedá za škodu, ak nepreukáže liberačné dôvody

### Podstatné náležitosti
- dopravca
- cestujúci alebo odosielateľ
- predmet prepravy: osoba, zásielka, náklad
- miesto určenia
- odplata: cestovné, prepravné

### Preprava osôb (§ 760–764 OZ)
- dopravca sa zaväzuje bezpečne prepraviť cestujúceho
- cestujúci má právo na bezpečnú prepravu
- cestujúci je povinný dodržiavať prepravný poriadok
- dopravca zodpovedá za škodu na zdraví cestujúceho a na veciach, ktoré mal pri sebe
- zmluva vzniká nastúpením do dopravného prostriedku alebo zakúpením cestovného lístka

### Preprava nákladu a zásielky (§ 765–773 OZ)
- odosielateľ odovzdáva zásielku dopravcovi, dopravca ju doručí príjemcovi
- povinnosť dopravcu dodať zásielku v neporušenom stave
- odosielateľ platí prepravné
- dopravca zodpovedá za škodu na zásielke od prevzatia po vydanie
- môže požadovať prepravný doklad, nákladný list

### Cestovná zmluva (organizovaný zájazd)
- komplexná zmluva o kombinácii služieb cestovného ruchu
- upravená zákonom o zájazdoch
- organizátor poskytuje dopravu, ubytovanie a program
- vysoká ochrana spotrebiteľa

### Význam pre prax
- kľúčové pri cestovaní, logistike, doručovaní zásielok
- jasné pravidlá zodpovednosti dopravcu
- ochrana cestujúceho pri úrazoch a škodách
- cestovná zmluva chráni spotrebiteľa pri zájazdoch

---

## A37 — Poistná zmluva

**Centrum:** Poistná zmluva – pojem, náležitosti, poistná udalosť, druhy poistenia, zánik (finančná ochrana pred náhodnými udalosťami)

### Pojem poistnej zmluvy (§ 788 OZ)
- poisťovateľ sa zaväzuje poskytnúť poistné plnenie pri vzniku poistnej udalosti
- poistník sa zaväzuje platiť poistné
- účel: finančná ochrana pred následkami náhodných udalostí
- zmluva upravuje rozsah poistenia, výluky a podmienky plnenia

### Podstatné náležitosti
- poistná udalosť: náhodná skutočnosť zakladajúca povinnosť poisťovateľa plniť
- poistná suma: horná hranica poistného plnenia
- poistné: cena poistenia, platená jednorazovo alebo pravidelne
- rozsah poistenia, výluky, poistné obdobie
- podmienky vzniku nároku na plnenie

### Poistná udalosť
- musí byť náhodná
- nezávislá od vôle poistníka
- presne definovaná
- poisťovateľ neplní pri úmyselnom konaní, podvode alebo konaní v rozpore s poistnými podmienkami

### Druhy poistenia
- životné poistenie: smrť, dožitie, úraz, choroba, invalidita
- životné poistenie býva spojené so sporením alebo investovaním
- neživotné poistenie: majetok, zodpovednosť, cestovné, úrazové
- povinné poistenie uložené zákonom, napr. PZP
- dobrovoľné poistenie podľa potreby poistníka

### Zánik poistenia
- uplynutím poistného obdobia
- nezaplatením poistného
- výpoveďou
- dohodou strán

### Význam pre prax
- chráni pred finančnými následkami škôd, úrazov, chorôb
- umožňuje plánovanie rizík a stabilitu majetku
- povinné poistenia chránia tretie osoby
- jasné pravidlá zmluvy bránia sporom o plnenie

---

## A38 — Zmluva o úschove a zmluva o združení

**Centrum:** Úschova a združenie – pojem, náležitosti, povinnosti, zodpovednosť, zánik (držanie cudzej veci vs. spolupráca na spoločnom účele)

### Zmluva o úschove (§ 747–753 OZ)
- schovateľ prevezme vec a zaväzuje sa ju uschovať a vrátiť
- predmetom je individuálne určená vec
- schovateľ vec len drží, nevyužíva ju
- úschova môže byť odplatná aj bezodplatná

### Povinnosti schovateľa a uschovateľa
- schovateľ: starať sa o vec s odbornou starostlivosťou
- schovateľ: chrániť ju pred poškodením, stratou, zničením
- schovateľ: vrátiť ju v stave, v akom ju prevzal
- uschovateľ: nahradiť náklady spojené s úschovou
- uschovateľ: prevziať vec späť po skončení úschovy

### Zodpovednosť pri úschove
- schovateľ zodpovedá za škodu pri porušení povinností
- zodpovedá aj za škodu spôsobenú osobou, ktorú pri úschove použil
- ak vec zanikne alebo sa poškodí bez jeho zavinenia, nezodpovedá

### Zmluva o združení (§ 829–841 OZ)
- viac osôb sa združí na dosiahnutie dohodnutého účelu
- združenie nie je právnickou osobou
- ide o záväzkový vzťah medzi účastníkmi
- účastníci sa zaväzujú spolupracovať
- vkladajú prácu, majetok alebo iné hodnoty
- nesú spoločné záväzky voči tretím osobám, ak vzniknú pri plnení účelu

### Majetok a práva účastníkov
- majetok získaný činnosťou združenia je spoločným majetkom účastníkov
- právo podieľať sa na rozhodovaní
- právo kontrolovať činnosť združenia
- právo vystúpiť, ak tým neohrozí účel združenia

### Zánik združenia
- dohodou účastníkov
- splnením účelu
- vystúpením účastníkov, ak tým združenie stratí zmysel

### Rozdiely medzi úschovou a združením
- úschova: držanie cudzej veci, povinnosť chrániť a vrátiť
- združenie: spolupráca viacerých osôb na spoločnom účele
- úschova sa týka individuálnej veci, združenie spoločného majetku a záväzkov
- úschova je pasívna starostlivosť, združenie aktívna činnosť

### Význam pre prax
- úschova: hotely, sklady, garáže, bezpečnostné schránky
- združenie: spoločné projekty, hobby skupiny, investičné aktivity
- jasné pravidlá bránia sporom o zodpovednosť, majetok a povinnosti

---

## A39 — Zmluva o dôchodku, stávka a hra

**Centrum:** Dôchodok, stávka a hra – pojem, náležitosti, právne účinky, rozdiely (pravidelné plnenie, naturálna obligácia, hazardné hry)

### Zmluva o dôchodku (§ 842–844 OZ)
- jedna strana sa zaväzuje vyplácať dôchodkové dávky
- pravidelné plnenie, mesačné alebo ročné
- dlhodobý charakter
- môže byť odplatná aj bezodplatná
- doživotný dôchodok trvá až do smrti oprávneného
- časovo obmedzený dôchodok, napr. na 10 rokov

### Podstatné náležitosti dôchodku
- výška dávok
- periodicita
- podmienky zániku
- zánik uplynutím doby alebo smrťou oprávneného pri doživotnom dôchodku

### Stávka a hra (§ 845–846 OZ)
- ide o naturálnu obligáciu
- víťaz nemá žalovateľný nárok na výhru
- ak bola výhra dobrovoľne vyplatená, nemožno žiadať jej vrátenie
- výsledok závisí od náhody alebo zručnosti
- právny poriadok nechráni nárok na výhru

### Hazardné hry – zákonná výnimka
- pri hazardných hrách povolených zákonom vzniká vymáhateľný nárok na výhru
- lotérie
- stávkové hry
- kasínové hry a kurzové stávky
- prevádzkovateľ je povinný vyplatiť výhru podľa pravidiel hry

### Rozdiely
- dôchodok: dlhodobé pravidelné plnenie, žalovateľný záväzok
- stávka a hra: naturálna obligácia, výhra nie je vymáhateľná
- hazardné hry: výnimka, výhra je vymáhateľná, ak je hra povolená

### Význam pre prax
- dôchodok slúži na dlhodobé finančné zabezpečenie
- stávka a hra sú právne nevymáhateľné záväzky spojené s rizikovým správaním
- hazardné hry sú regulované s povinnosťou vyplatiť výhru
- jasné odlíšenie bráni sporom o vymáhateľnosť plnenia

---

## A40 — Verejná súťaž a verejný prísľub

**Centrum:** Verejná súťaž a verejný prísľub – pojem, náležitosti, odvolanie, rozdiely (jednostranné právne úkony s odmenou za návrh alebo výkon)

### Verejná súťaž (§ 847–849 OZ)
- vyhlasovateľ vyhlási súťaž na najlepší návrh a zaväzuje sa poskytnúť odmenu víťazovi
- vyhlásenie musí byť verejné
- musia byť určené podmienky súťaže, kritériá hodnotenia a odmena
- návrhy sa posudzujú podľa kritérií vo vyhlásení
- vyhlasovateľ je povinný odmenu poskytnúť víťazovi
- návrh možno odvolať len do uplynutia lehoty na podanie návrhov

### Podmienky a priebeh súťaže
- verejné vyhlásenie
- presné kritériá hodnotenia
- určená odmena
- objektívne posúdenie návrhov
- povinnosť vyhlasovateľa odmenu vyplatiť

### Verejný prísľub (§ 850–852 OZ)
- vyhlasovateľ sa verejne zaväzuje poskytnúť odmenu tomu, kto vykoná určitý výkon
- prísľub musí byť verejný: oznámenie, reklama, vyhlásenie
- výkon musí byť určitý a uskutočniteľný
- odmenu získava ten, kto výkon splní ako prvý
- vyhlasovateľ je povinný odmenu poskytnúť, ak bol výkon splnený

### Odvolanie súťaže a prísľubu
- prísľub možno odvolať rovnakým spôsobom, akým bol vyhlásený
- odvolanie neúčinkuje voči tomu, kto už výkon splnil
- súťaž možno zrušiť len zo zákonných dôvodov, napr. podstatná zmena okolností
- návrh možno odvolať len pred uplynutím lehoty

### Rozdiely medzi súťažou a prísľubom
- verejná súťaž: odmena za najlepší návrh
- verejný prísľub: odmena za splnený výkon
- súťaž hodnotí návrhy, prísľub vyžaduje splnenie výkonu
- oba sú jednostranné právne úkony, záväzok vzniká len na strane vyhlasovateľa
- nejde o zmluvu, druhá strana nevstupuje do záväzku, len vykoná výkon

### Význam pre prax
- verejná súťaž: architektonické, literárne, dizajnérske súťaže
- verejný prísľub: odmeny za nález veci, za informácie, za splnenie úlohy
- jasné pravidlá bránia sporom o odmenu a platnosť odvolania
