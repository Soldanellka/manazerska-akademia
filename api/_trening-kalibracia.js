'use strict';

/* ============================================================
   api/_trening-kalibracia.js – KALIBRÁCIA MENTOROV (len server)

   Vzorové odpovede a časté chyby k situáciám z obsah/trening/situacie.json.
   ⚠️ Súbor ZÁMERNE nie je v obsah/ ani nikde, kam vidí prehliadač: vzor sa
   hráčovi nesmie ukázať pred jeho vlastným pokusom. Podčiarkovník na
   začiatku mena = Vercel z neho nerobí endpoint; číta ho len
   api/mentor-feedback.js cez require().

   Vzor NIE JE jediné správne riešenie – je to kalibrácia pre AI, ako
   znie dobrá odpoveď. Obsah na odbornú kontrolu (README, fáza H).
   Pravidlo pre texty: žiadny minulý čas v 1. osobe s rodom
   („strácal som", „vedel by som") – rod sa zradne vracia práve tadiaľ.
============================================================ */

module.exports = {
  S1: {
    vzor: '„Keď podklady prídu deň pred termínom, nestíham ich prejsť a chyby idú ďalej. Potrebujem ich mať tri dni vopred. Čo by ti k tomu pomohlo?“',
    casteChyby: 'nálepka („si nespoľahlivý“); hovorenie za iných („všetci sa sťažujú“); slová vždy a nikdy; chýbajúca potreba'
  },
  S2: {
    vzor: '„Bolo mi nepríjemné, keď si môj návrh zhodil pred celým tímom. Potrebujem, aby sme si takéto veci povedali medzi sebou.“',
    casteChyby: '„ty nemáš takt“ (nálepka); ustúpenie („veď to bola sranda“); útok na povahu namiesto pomenovania situácie'
  },
  S3: {
    vzor: '„Chceš spätnú väzbu k porade? … Najviac sa mi páčilo, ako si zvládla tú ťažkú otázku – povedala si rovno, že to nevieš, a do večera si to zistila. To dáva ľuďom istotu. A pri čítaní z papiera sa mi strácala niť – pomohlo by mi pár odrážok namiesto celého textu.“',
    casteChyby: 'iba kritika; „aspoň si to skúsila“ (útecha, nie spätná väzba); žiadne opýtanie sa, či o spätnú väzbu stojí; všeobecné „bolo to fajn“'
  },
  S4: {
    vzor: '„Rozumiem. Môžeme si po porade na päť minút sadnúť? Chcem vedieť, čo konkrétne v tej správe nesedelo, aby sa to dalo opraviť.“',
    casteChyby: 'obrana a vysvetľovanie pred skupinou; mlčanie; protiútok na to, že to zaznelo verejne, skôr než sa vec vyrieši'
  },
  S5: {
    vzor: '„Nie, tento víkend to nejde.“ A pri ďalšom tlaku: „Chápem, a predsa nie.“',
    casteChyby: 'dlhé vysvetľovanie (ukazuje, kde tlačiť ďalej); ústupok; protiútok; sľub typu „uvidím“'
  },
  S6: {
    vzor: '„Znie to, akoby ti to vadilo. Mne na tom záleží – povedz mi priamo, čo sa deje?“',
    casteChyby: 'ospravedlňovanie sa naslepo; rovnako štipľavá odpoveď; mlčanie'
  },
  S7: {
    vzor: '„Dnes chcem počuť, čo na tom nesedí vám – začnime tým. Kto má prvú námietku?“',
    casteChyby: 'všeobecné „ak niekto niečo má, nech sa ozve“; vyčítanie mlčania; sľub, že „tentoraz to zvládneme lepšie“'
  },
  S8: {
    vzor: '„Zdá sa mi, že sa ťa niečo dotklo. Čo sa stalo?“',
    casteChyby: 'obhajoba vlastnej vety; súd o povahe („je konfliktný“); stiahnutie sa a mlčanie'
  },
  S9: {
    vzor: '„Takže si to hlásila trikrát a nikto sa neozval? Vidím, že ťa to štve – a chápem prečo. Poď, pozrime sa na to.“',
    casteChyby: 'okamžitá rada bez vypočutia; odbytie „jasné, nefunguje“; zovšeobecnenie „to je typické, tak to tu chodí“'
  }
};
