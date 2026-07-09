/* ============================================================
   LEVELS WERELD 1 — "De Sleutelbergen" (leerdoel: wachtwoorden).
   De levels van Wereld 2 staan in levels-wereld2.js; de werelden
   worden samengevoegd in werelden.js.

   Alles is data: je kunt platforms, bollen, vijanden enzovoort
   verplaatsen door alleen getallen aan te passen. Coördinaten
   zijn in pixels; (0,0) is linksboven. De grond ligt op y = 480.

   Onderdelen per level:
     naam        : naam van het level
     breedte     : totale breedte van de wereld in pixels
     spelerStart : startpositie van Vonk
     platforms   : { x, y, w, h, type: "grond" | "zwevend" }
                   { type: "bewegend", as: "x"|"y", min, max, w,
                     y (bij as x) of x (bij as y), duur }  → schuift
                   { type: "brokkel", x, y, w }  → stort in na betreden
     bollen      : energiebollen om te verzamelen { x, y } (middelpunt)
     vraagobjecten : gouden slotjes met een wachtwoordvraag { x, y, poortId? }
                   - de vraag zelf komt willekeurig uit wachtwoorden.js
                   - poortId (optioneel): deze poort opent na de vraag
     poorten     : { id, x, y, w, h } — dicht tot de vraag beantwoord is.
                   Gebruik altijd y: 0 en h: 480 (volledige hoogte),
                   anders kan de speler eroverheen springen en komt
                   hij klem te zitten aan de finishkant!
     stekels     : kristalstekels op de grond { x, y, w }
     vijanden    : { type: "slijm", x, minX, maxX }  (loopt heen en weer)
                   { type: "zoemer", x, basisY, amplitude } (zweeft op/neer)
     checkpoints : lantaarns die je respawnpunt worden { x }
     finish      : het lichtportaal aan het einde { x }
   ============================================================ */

const WERELD1_LEVELS = [
  {
    naam: "Zonnige Heuvels",
    breedte: 4200,
    spelerStart: { x: 80, y: 434 },

    platforms: [
      /* --- Grondstukken (met gaten ertussen: pas op, vallen!) --- */
      { x: 0,    y: 480, w: 900, h: 60, type: "grond" },
      { x: 1000, y: 480, w: 700, h: 60, type: "grond" },
      { x: 1820, y: 480, w: 780, h: 60, type: "grond" },
      { x: 2720, y: 480, w: 680, h: 60, type: "grond" },
      { x: 3520, y: 480, w: 680, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 300,  y: 370, w: 150, h: 24, type: "zwevend" },
      { x: 520,  y: 295, w: 140, h: 24, type: "zwevend" },
      { x: 740,  y: 360, w: 130, h: 24, type: "zwevend" },
      { x: 1080, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 1300, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1550, y: 365, w: 140, h: 24, type: "zwevend" },
      { x: 1900, y: 400, w: 120, h: 24, type: "zwevend" },
      { x: 2080, y: 330, w: 120, h: 24, type: "zwevend" },
      { x: 2260, y: 255, w: 150, h: 24, type: "zwevend" },
      { x: 2470, y: 350, w: 130, h: 24, type: "zwevend" },
      { x: 2820, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 3020, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3220, y: 370, w: 150, h: 24, type: "zwevend" },
      { x: 3620, y: 380, w: 130, h: 24, type: "zwevend" }
    ],

    /* --- Energiebollen (16 stuks) --- */
    bollen: [
      { x: 375,  y: 335 },
      { x: 590,  y: 260 },
      { x: 805,  y: 325 },
      { x: 950,  y: 400 },   // boven het eerste gat
      { x: 1155, y: 345 },
      { x: 1375, y: 265 },
      { x: 1620, y: 330 },
      { x: 1760, y: 420 },   // boven het tweede gat
      { x: 1960, y: 365 },
      { x: 2140, y: 295 },
      { x: 2335, y: 220 },   // hoog op de trap
      { x: 2660, y: 420 },   // boven het derde gat
      { x: 2895, y: 345 },
      { x: 3090, y: 265 },
      { x: 3460, y: 420 },   // boven het vierde gat
      { x: 3685, y: 345 }
    ],

    /* --- Vraagobjecten: gouden slotjes met een wachtwoordvraag.
           De vraag wordt willekeurig gekozen (zie wachtwoorden.js).
           Bij een goed antwoord verdient de speler muntjes.
           poortId (optioneel): die poort gaat open na de vraag. --- */
    /* Tip: zet y ± 10 boven de ondergrond (grond = 480, platform = zijn
       eigen y), dan raakt de speler het slotje ook al lopend. */
    vraagobjecten: [
      { x: 500,  y: 470 },                       // op de grond, vroeg oefenen
      { x: 1155, y: 370 },                       // op platform (1080)
      { x: 1620, y: 355 },                       // op platform (1550)
      { x: 2000, y: 470 },                       // op de grond
      { x: 2140, y: 320 },                       // op platform (2080)
      { x: 2895, y: 370 },                       // op platform (2820)
      { x: 3090, y: 290 },                       // op platform (3020), hoog
      { x: 3760, y: 470, poortId: "poort1" }     // vlak voor de poort
    ],

    /* --- Poorten (gaan open bij een goed antwoord) --- */
    poorten: [
      { id: "poort1", x: 3800, y: 0, w: 34, h: 480 }
    ],

    /* --- Kristalstekels (au!) --- */
    stekels: [
      { x: 640,  y: 456, w: 64 },
      { x: 2500, y: 456, w: 64 },
      { x: 3290, y: 456, w: 64 }
    ],

    /* --- Vijanden --- */
    vijanden: [
      { type: "slijm",  x: 430,  minX: 380,  maxX: 620 },
      { type: "slijm",  x: 1150, minX: 1060, maxX: 1420 },
      { type: "slijm",  x: 1950, minX: 1880, maxX: 2150 },
      { type: "zoemer", x: 2660, basisY: 340, amplitude: 60 },
      { type: "slijm",  x: 2900, minX: 2780, maxX: 3230 },
      { type: "zoemer", x: 3470, basisY: 320, amplitude: 60 }
    ],

    /* --- Checkpoints (lantaarns) --- */
    checkpoints: [
      { x: 1440 },
      { x: 2900 }
    ],

    /* --- Finish: het lichtportaal --- */
    finish: { x: 4040 }
  },

  /* ================================================================
     LEVEL 2 — Schemervallei (ontgrendelt na 1 ster in level 1)
     Iets langer en pittiger: bredere gaten, meer zoemers en een
     eigen avondkleurenthema via 'thema' (zie achtergrond.js).
     ================================================================ */
  {
    naam: "Schemervallei",
    breedte: 4600,
    spelerStart: { x: 80, y: 434 },

    /* Avondkleuren: warme lucht én warm avondgras/aarde */
    thema: {
      luchtBoven:    "#8f7fd6",
      luchtOnder:    "#ffd9c4",
      zon:           "#ffcf8a",
      wolk:          "#ffeef8",
      heuvelVer:     "#9a86c9",
      heuvelDichtbij:"#7562ad",
      grondGras:     "#55a066",
      grondAarde:    "#8a5a3c",
      grondAardeRand:"#6b4229",
      platformTop:   "#55a066",
      platformHout:  "#96683e"
    },

    platforms: [
      /* --- Grondstukken --- */
      { x: 0,    y: 480, w: 700, h: 60, type: "grond" },
      { x: 830,  y: 480, w: 570, h: 60, type: "grond" },
      { x: 1540, y: 480, w: 560, h: 60, type: "grond" },
      { x: 2250, y: 480, w: 650, h: 60, type: "grond" },
      { x: 3040, y: 480, w: 560, h: 60, type: "grond" },
      { x: 3750, y: 480, w: 850, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 250,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 430,  y: 300, w: 120, h: 24, type: "zwevend" },
      { x: 610,  y: 360, w: 110, h: 24, type: "zwevend" },
      { x: 900,  y: 390, w: 130, h: 24, type: "zwevend" },
      { x: 1090, y: 320, w: 140, h: 24, type: "zwevend" },
      { x: 1290, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 1445, y: 390, w: 90,  h: 24, type: "zwevend" },   // eilandje boven gat
      { x: 1650, y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 1850, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 2030, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 2320, y: 390, w: 130, h: 24, type: "zwevend" },
      { x: 2520, y: 310, w: 140, h: 24, type: "zwevend" },
      { x: 2720, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 2930, y: 400, w: 100, h: 24, type: "zwevend" },   // eilandje boven gat
      { x: 3120, y: 370, w: 140, h: 24, type: "zwevend" },
      { x: 3330, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 3520, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3630, y: 400, w: 110, h: 24, type: "zwevend" },   // eilandje boven gat
      { x: 3850, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4050, y: 300, w: 140, h: 24, type: "zwevend" }
    ],

    /* --- Energiebollen (16 stuks) --- */
    bollen: [
      { x: 310,  y: 340 },
      { x: 490,  y: 260 },
      { x: 665,  y: 320 },
      { x: 770,  y: 430 },   // boven het eerste gat
      { x: 965,  y: 350 },
      { x: 1160, y: 280 },
      { x: 1350, y: 340 },
      { x: 1470, y: 350 },
      { x: 1715, y: 330 },
      { x: 1920, y: 250 },
      { x: 2170, y: 430 },   // boven het derde gat
      { x: 2385, y: 350 },
      { x: 2590, y: 270 },
      { x: 2965, y: 360 },
      { x: 3190, y: 330 },
      { x: 3400, y: 250 }
    ],

    /* --- Vraagobjecten (8 slotjes) --- */
    vraagobjecten: [
      { x: 350,  y: 470 },                       // op de grond
      { x: 960,  y: 380 },                       // op platform (900)
      { x: 1600, y: 470 },                       // op de grond
      { x: 1920, y: 280 },                       // op platform (1850)
      { x: 2450, y: 470 },                       // op de grond
      { x: 2790, y: 370 },                       // op platform (2720)
      { x: 3400, y: 280 },                       // op platform (3330), hoog
      { x: 4150, y: 470, poortId: "poort1" }     // vlak voor de poort
    ],

    /* --- Poorten --- */
    poorten: [
      { id: "poort1", x: 4250, y: 0, w: 34, h: 480 }
    ],

    /* --- Kristalstekels --- */
    stekels: [
      { x: 600,  y: 456, w: 64 },
      { x: 1760, y: 456, w: 64 },
      { x: 2620, y: 456, w: 64 },
      { x: 3450, y: 456, w: 48 }
    ],

    /* --- Vijanden (8 stuks) --- */
    vijanden: [
      { type: "slijm",  x: 300,  minX: 250,  maxX: 560 },
      { type: "slijm",  x: 1000, minX: 880,  maxX: 1300 },
      { type: "zoemer", x: 1470, basisY: 340, amplitude: 70 },   // boven gat 2
      { type: "slijm",  x: 1600, minX: 1560, maxX: 1740 },
      { type: "zoemer", x: 2170, basisY: 330, amplitude: 70 },   // boven gat 3
      { type: "slijm",  x: 2400, minX: 2300, maxX: 2580 },
      { type: "zoemer", x: 2965, basisY: 330, amplitude: 60 },   // bij het eilandje
      { type: "slijm",  x: 3900, minX: 3800, maxX: 4100 }
    ],

    /* --- Checkpoints --- */
    checkpoints: [
      { x: 1700 },
      { x: 3200 }
    ],

    /* --- Finish --- */
    finish: { x: 4450 }
  },

  /* ================================================================
     LEVEL 3 — Wolkenhaven
     Nieuw: BEWEGENDE PLATFORMS! Grote gaten steek je over door op
     een schuivend platform te springen en mee te liften.
       { type:"bewegend", as:"x"|"y", min, max, w, y/x, duur }
     ================================================================ */
  {
    naam: "Wolkenhaven",
    breedte: 5000,
    spelerStart: { x: 80, y: 434 },

    /* Fris luchteiland-thema: helder gras en licht hout */
    thema: {
      luchtBoven:    "#4da9f0",
      luchtOnder:    "#eaf7ff",
      wolk:          "#ffffff",
      heuvelVer:     "#c2e0f5",
      heuvelDichtbij:"#96cbee",
      grondGras:     "#69cc6d",
      grondAarde:    "#bc8752",
      grondAardeRand:"#93643a",
      platformTop:   "#69cc6d",
      platformHout:  "#c08b55"
    },

    platforms: [
      /* --- Grondstukken --- */
      { x: 0,    y: 480, w: 620, h: 60, type: "grond" },
      { x: 750,  y: 480, w: 530, h: 60, type: "grond" },
      { x: 1720, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2800, y: 480, w: 650, h: 60, type: "grond" },
      { x: 3580, y: 480, w: 570, h: 60, type: "grond" },
      { x: 4520, y: 480, w: 480, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 200,  y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 400,  y: 290, w: 130, h: 24, type: "zwevend" },
      { x: 850,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1050, y: 310, w: 130, h: 24, type: "zwevend" },
      { x: 1800, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2000, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2180, y: 380, w: 110, h: 24, type: "zwevend" },
      { x: 2900, y: 370, w: 140, h: 24, type: "zwevend" },
      { x: 3100, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 3300, y: 370, w: 120, h: 24, type: "zwevend" },
      { x: 3700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4600, y: 380, w: 120, h: 24, type: "zwevend" },

      /* --- Bewegende platforms (over de grote gaten) --- */
      { type: "bewegend", as: "x", min: 1310, max: 1590, y: 400, w: 120, duur: 4 },
      { type: "bewegend", as: "x", min: 2390, max: 2670, y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "y", x: 2250, min: 280, max: 400, w: 100, duur: 5 },
      { type: "bewegend", as: "x", min: 4180, max: 4390, y: 410, w: 120, duur: 3.5 }
    ],

    bollen: [
      { x: 260,  y: 330 }, { x: 460,  y: 250 }, { x: 685,  y: 420 },
      { x: 910,  y: 340 }, { x: 1110, y: 270 }, { x: 1450, y: 350 },
      { x: 1860, y: 340 }, { x: 2060, y: 260 }, { x: 2300, y: 240 },
      { x: 2530, y: 350 }, { x: 2960, y: 330 }, { x: 3160, y: 250 },
      { x: 3515, y: 420 }, { x: 3960, y: 260 }, { x: 4290, y: 360 },
      { x: 4660, y: 340 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 910,  y: 370 },
      { x: 1110, y: 300 },
      { x: 1900, y: 470 },
      { x: 2060, y: 290 },
      { x: 3160, y: 280 },
      { x: 3760, y: 370 },
      { x: 4700, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4790, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 64 },
      { x: 2200, y: 456, w: 48 },
      { x: 3350, y: 456, w: 64 },
      { x: 4050, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "slijm",  x: 200,  minX: 150,  maxX: 450 },
      { type: "zoemer", x: 685,  basisY: 330, amplitude: 60 },
      { type: "slijm",  x: 1850, minX: 1780, maxX: 2120 },
      { type: "zoemer", x: 2520, basisY: 320, amplitude: 70 },
      { type: "slijm",  x: 2950, minX: 2850, maxX: 3300 },
      { type: "zoemer", x: 3520, basisY: 340, amplitude: 60 },
      { type: "slijm",  x: 3800, minX: 3650, maxX: 4000 }
    ],

    checkpoints: [
      { x: 1780 },
      { x: 3650 }
    ],

    finish: { x: 4900 }
  },

  /* ================================================================
     LEVEL 4 — Kristalgrot
     Nieuw: AFBROKKELPLATFORMS (trillen en storten in — blijf niet
     staan!) en de eerste STEKELBOL (kun je NIET op springen).
       { type:"brokkel", x, y, w }
       { type:"stekelbol", cx, cy, as, bereik, duur }
     ================================================================ */
  {
    naam: "Kristalgrot",
    breedte: 5200,
    spelerStart: { x: 80, y: 434 },

    /* Grot-thema: blauwgrijze steen met mos in plaats van gras */
    thema: {
      luchtBoven:    "#31406b",
      luchtOnder:    "#5f7ba6",
      zon:           "#9fe8dc",
      wolk:          "#4d6089",
      heuvelVer:     "#2a3556",
      heuvelDichtbij:"#222b47",
      grondGras:     "#43948b",
      grondAarde:    "#4c5673",
      grondAardeRand:"#3a4258",
      platformTop:   "#43948b",
      platformHout:  "#5d6884"
    },

    platforms: [
      /* --- Grondstukken --- */
      { x: 0,    y: 480, w: 550, h: 60, type: "grond" },
      { x: 670,  y: 480, w: 480, h: 60, type: "grond" },
      { x: 1600, y: 480, w: 650, h: 60, type: "grond" },
      { x: 2700, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3430, y: 480, w: 520, h: 60, type: "grond" },
      { x: 4380, y: 480, w: 820, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 150,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 330,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 700,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 900,  y: 310, w: 140, h: 24, type: "zwevend" },
      { x: 1700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2100, y: 380, w: 110, h: 24, type: "zwevend" },
      { x: 2750, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2950, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3150, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 3500, y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 3700, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 4450, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4650, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4850, y: 380, w: 120, h: 24, type: "zwevend" },

      /* --- Afbrokkelbruggen over de twee grote gaten --- */
      { type: "brokkel", x: 1180, y: 410, w: 90 },
      { type: "brokkel", x: 1330, y: 380, w: 90 },
      { type: "brokkel", x: 1480, y: 410, w: 90 },
      { type: "brokkel", x: 2280, y: 400, w: 90 },
      { type: "brokkel", x: 2430, y: 370, w: 90 },
      { type: "brokkel", x: 2580, y: 400, w: 90 },

      /* --- Bewegend platform over het laatste gat --- */
      { type: "bewegend", as: "x", min: 3990, max: 4250, y: 400, w: 110, duur: 4 }
    ],

    bollen: [
      { x: 210,  y: 340 }, { x: 390,  y: 260 }, { x: 760,  y: 340 },
      { x: 960,  y: 270 }, { x: 1225, y: 370 }, { x: 1375, y: 340 },
      { x: 1525, y: 370 }, { x: 1960, y: 260 }, { x: 2325, y: 360 },
      { x: 2475, y: 330 }, { x: 2625, y: 360 }, { x: 3010, y: 260 },
      { x: 3560, y: 330 }, { x: 3760, y: 250 }, { x: 4115, y: 360 },
      { x: 4710, y: 260 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 950,  y: 300 },
      { x: 1750, y: 470 },
      { x: 2150, y: 370 },
      { x: 2810, y: 470 },
      { x: 3760, y: 280 },
      { x: 4510, y: 370 },
      { x: 4950, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5000, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 450,  y: 456, w: 64 },
      { x: 2050, y: 456, w: 64 },
      { x: 3200, y: 456, w: 64 },
      { x: 3550, y: 456, w: 48 },
      { x: 4550, y: 456, w: 64 }
    ],

    vijanden: [
      { type: "slijm",     x: 750,  minX: 700,  maxX: 1050 },
      { type: "zoemer",    x: 1390, basisY: 330, amplitude: 70 },
      { type: "slijm",     x: 1750, minX: 1650, maxX: 2000 },
      { type: "zoemer",    x: 2500, basisY: 320, amplitude: 70 },
      { type: "stekelbol", cx: 3000, cy: 463, as: "x", bereik: 280, duur: 6 },
      { type: "zoemer",    x: 4160, basisY: 330, amplitude: 60 },
      { type: "slijm",     x: 4600, minX: 4450, maxX: 4850 }
    ],

    checkpoints: [
      { x: 1650 },
      { x: 3480 }
    ],

    finish: { x: 5120 }
  },

  /* ================================================================
     LEVEL 5 — Stormpiek
     Alles komt samen: bewegende platforms (ook LIFTEN omhoog),
     afbrokkelbruggen én twee stekelbollen. Kijk goed en time je
     sprongen!
     ================================================================ */
  {
    naam: "Stormpiek",
    breedte: 5400,
    spelerStart: { x: 80, y: 434 },

    /* Storm-thema: koude rots met verweerd bergmos */
    thema: {
      luchtBoven:    "#5a6b8c",
      luchtOnder:    "#aebccf",
      zon:           "#e8ecf2",
      wolk:          "#c9d2dc",
      heuvelVer:     "#4a5872",
      heuvelDichtbij:"#3a465c",
      grondGras:     "#5f8a6b",
      grondAarde:    "#5f6774",
      grondAardeRand:"#49505c",
      platformTop:   "#5f8a6b",
      platformHout:  "#6e7787"
    },

    platforms: [
      /* --- Grondstukken --- */
      { x: 0,    y: 480, w: 500, h: 60, type: "grond" },
      { x: 950,  y: 480, w: 550, h: 60, type: "grond" },
      { x: 1640, y: 480, w: 560, h: 60, type: "grond" },
      { x: 2750, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3500, y: 480, w: 550, h: 60, type: "grond" },
      { x: 4600, y: 480, w: 800, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 120,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 300,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1350, y: 300, w: 120, h: 24, type: "zwevend" },
      { x: 1700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2080, y: 380, w: 100, h: 24, type: "zwevend" },
      { x: 2800, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3150, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 3550, y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 3750, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 3930, y: 370, w: 100, h: 24, type: "zwevend" },
      { x: 4700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 5100, y: 380, w: 120, h: 24, type: "zwevend" },

      /* --- Bewegende platforms --- */
      { type: "bewegend", as: "x", min: 540,  max: 800,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "y", x: 1200, min: 250, max: 400, w: 100, duur: 5 },
      { type: "bewegend", as: "x", min: 2240, max: 2420, y: 420, w: 100, duur: 3.5 },
      { type: "bewegend", as: "x", min: 2480, max: 2640, y: 350, w: 100, duur: 3.5, fase: 3.14 },
      { type: "bewegend", as: "y", x: 3050, min: 250, max: 400, w: 100, duur: 5 },

      /* --- Afbrokkelbrug over het laatste grote gat --- */
      { type: "brokkel", x: 4080, y: 410, w: 85 },
      { type: "brokkel", x: 4210, y: 380, w: 85 },
      { type: "brokkel", x: 4340, y: 410, w: 85 },
      { type: "brokkel", x: 4470, y: 380, w: 85 }
    ],

    bollen: [
      { x: 180,  y: 340 }, { x: 360,  y: 260 }, { x: 670,  y: 360 },
      { x: 1060, y: 340 }, { x: 1250, y: 220 }, { x: 1410, y: 260 },
      { x: 1760, y: 340 }, { x: 1960, y: 250 }, { x: 2330, y: 380 },
      { x: 2560, y: 310 }, { x: 3100, y: 215 }, { x: 3210, y: 260 },
      { x: 3810, y: 250 }, { x: 4130, y: 370 }, { x: 4760, y: 340 },
      { x: 4960, y: 260 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 1060, y: 370 },
      { x: 1960, y: 290 },
      { x: 2810, y: 470 },
      { x: 3210, y: 290 },
      { x: 3810, y: 280 },
      { x: 4760, y: 370 },
      { x: 5150, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5190, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 64 },
      { x: 1780, y: 456, w: 64 },
      { x: 3200, y: 456, w: 48 },
      { x: 3560, y: 456, w: 48 },
      { x: 4750, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "zoemer",    x: 725,  basisY: 330, amplitude: 80 },
      { type: "slijm",     x: 1050, minX: 970,  maxX: 1330 },
      { type: "slijm",     x: 1950, minX: 1900, maxX: 2140 },
      { type: "zoemer",    x: 2340, basisY: 300, amplitude: 70 },
      { type: "slijm",     x: 2850, minX: 2770, maxX: 3150 },
      { type: "zoemer",    x: 3425, basisY: 340, amplitude: 60 },
      { type: "stekelbol", cx: 3775, cy: 463, as: "x", bereik: 250, duur: 6 },
      { type: "stekelbol", cx: 4270, cy: 350, as: "y", bereik: 160, duur: 4 },
      { type: "slijm",     x: 4900, minX: 4820, maxX: 5150 }
    ],

    checkpoints: [
      { x: 1700 },
      { x: 3600 }
    ],

    finish: { x: 5320 }
  },

  /* ================================================================
     LEVEL 6 — Cyberburcht
     Het eindlevel: nachtthema, alle soorten platforms en vijanden
     door elkaar, en drie stekelbollen. Alleen voor echte
     wachtwoordexperts!
     ================================================================ */
  {
    naam: "Cyberburcht",
    breedte: 5800,
    spelerStart: { x: 80, y: 434 },

    /* Cyber-thema: donkere burcht met oplichtende neonranden */
    thema: {
      luchtBoven:    "#161b38",
      luchtOnder:    "#3a2f5c",
      zon:           "#a794e8",
      wolk:          "#2b3560",
      heuvelVer:     "#232b4d",
      heuvelDichtbij:"#1a2140",
      grondGras:     "#5b6ee1",
      grondAarde:    "#2a3052",
      grondAardeRand:"#1e2340",
      platformTop:   "#5b6ee1",
      platformHout:  "#3a4166"
    },

    platforms: [
      /* --- Grondstukken --- */
      { x: 0,    y: 480, w: 450, h: 60, type: "grond" },
      { x: 900,  y: 480, w: 500, h: 60, type: "grond" },
      { x: 1900, y: 480, w: 550, h: 60, type: "grond" },
      { x: 3000, y: 480, w: 550, h: 60, type: "grond" },
      { x: 3700, y: 480, w: 550, h: 60, type: "grond" },
      { x: 4800, y: 480, w: 1000, h: 60, type: "grond" },

      /* --- Zwevende platforms --- */
      { x: 100,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 280,  y: 300, w: 120, h: 24, type: "zwevend" },
      { x: 950,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1150, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1980, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 2160, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2340, y: 380, w: 100, h: 24, type: "zwevend" },
      { x: 3050, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3250, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3430, y: 380, w: 100, h: 24, type: "zwevend" },
      { x: 3760, y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 3950, y: 290, w: 140, h: 24, type: "zwevend" },
      { x: 4130, y: 370, w: 100, h: 24, type: "zwevend" },
      { x: 4850, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 5050, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 5250, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 5450, y: 300, w: 120, h: 24, type: "zwevend" },

      /* --- Bewegende platforms --- */
      { type: "bewegend", as: "x", min: 490,  max: 750,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 2490, max: 2670, y: 420, w: 100, duur: 3 },
      { type: "bewegend", as: "x", min: 2730, max: 2890, y: 340, w: 100, duur: 3, fase: 3.14 },
      { type: "bewegend", as: "x", min: 4400, max: 4640, y: 380, w: 100, duur: 3.5 },

      /* --- Afbrokkelbrug + losse brokkelstap --- */
      { type: "brokkel", x: 1430, y: 410, w: 85 },
      { type: "brokkel", x: 1560, y: 380, w: 85 },
      { type: "brokkel", x: 1690, y: 410, w: 85 },
      { type: "brokkel", x: 4280, y: 410, w: 85 }
    ],

    bollen: [
      { x: 160,  y: 340 }, { x: 340,  y: 260 }, { x: 620,  y: 360 },
      { x: 1010, y: 340 }, { x: 1210, y: 260 }, { x: 1620, y: 340 },
      { x: 2040, y: 340 }, { x: 2220, y: 260 }, { x: 2580, y: 380 },
      { x: 2780, y: 300 }, { x: 3110, y: 340 }, { x: 3310, y: 260 },
      { x: 4020, y: 250 }, { x: 4520, y: 340 }, { x: 5110, y: 260 },
      { x: 5510, y: 260 }
    ],

    vraagobjecten: [
      { x: 200,  y: 470 },
      { x: 1210, y: 290 },
      { x: 2220, y: 290 },
      { x: 3310, y: 290 },
      { x: 3820, y: 360 },
      { x: 4010, y: 280 },
      { x: 4910, y: 370 },
      { x: 5500, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5570, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 380,  y: 456, w: 56 },
      { x: 1230, y: 456, w: 64 },
      { x: 2390, y: 456, w: 48 },
      { x: 3480, y: 456, w: 56 },
      { x: 4180, y: 456, w: 56 },
      { x: 5350, y: 456, w: 64 }
    ],

    vijanden: [
      { type: "zoemer",    x: 675,  basisY: 320, amplitude: 80 },
      { type: "slijm",     x: 960,  minX: 920,  maxX: 1190 },
      { type: "zoemer",    x: 1600, basisY: 320, amplitude: 70 },
      { type: "slijm",     x: 2000, minX: 1950, maxX: 2330 },
      { type: "zoemer",    x: 2600, basisY: 270, amplitude: 60 },
      { type: "stekelbol", cx: 2700, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "slijm",     x: 3060, minX: 3010, maxX: 3400 },
      { type: "stekelbol", cx: 3950, cy: 463, as: "x", bereik: 240, duur: 5 },
      { type: "zoemer",    x: 4520, basisY: 300, amplitude: 60 },
      { type: "slijm",     x: 4850, minX: 4820, maxX: 5150 },
      { type: "stekelbol", cx: 5220, cy: 463, as: "x", bereik: 200, duur: 5 }
    ],

    checkpoints: [
      { x: 1950 },
      { x: 3450 },
      { x: 4850 }
    ],

    finish: { x: 5700 }
  }
];
