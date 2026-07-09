/* ============================================================
   LEVELS WERELD 4 — "Phishingrivier"
   (leerdoel: nepberichten en verdachte links herkennen).

   Nieuw in deze wereld:
     - WATER in de gaten (val je erin, dan kost dat een hart):
         water: [{ x, w }]   (oppervlak op y = 498)
     - DRIJVENDE VLOTTEN die op het water deinen; spring van
       vlot naar vlot om over te steken:
         { type:"drijvend", x, y, w, amplitude?, duur? }
     - de HAPPER: een vis die uit het water springt. Er komen
       eerst SPETTERS (waarschuwing), dan pas de sprong:
         { type:"happer", x, hoogte?, duikTijd?, fase? }

   De blaster uit Wereld 2 werkt hier gewoon. Groene slijmen en
   zoemers passen als moerasbeestjes; stekelbollen blijven
   gepantserd.
   ============================================================ */

const WERELD4_LEVELS = [

  /* ================================================================
     LEVEL 1 — Moerasmonding
     Kennismaken met water, vlotten en de eerste happers.
     ================================================================ */
  {
    naam: "Moerasmonding",
    breedte: 4400,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#6fae8f",
      luchtOnder:    "#dff3d6",
      zon:           "#f2e27a",
      wolk:          "#c6e6c9",
      heuvelVer:     "#7fb896",
      heuvelDichtbij:"#5c9670",
      grondGras:     "#68b85a",
      grondAarde:    "#6e5a38",
      grondAardeRand:"#54452a",
      platformTop:   "#68b85a",
      platformHout:  "#8a6a44",
      waterBoven:    "#57bfae",
      waterOnder:    "rgba(28, 74, 72, 0.9)"
    },

    platforms: [
      { x: 0,    y: 480, w: 780,  h: 60, type: "grond" },
      { x: 1020, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1880, y: 480, w: 640,  h: 60, type: "grond" },
      { x: 2760, y: 480, w: 640,  h: 60, type: "grond" },
      { x: 3640, y: 480, w: 760,  h: 60, type: "grond" },

      { x: 250,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 470,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1080, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1300, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1500, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 1950, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2170, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2380, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 2820, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3040, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3250, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3720, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3940, y: 300, w: 140, h: 24, type: "zwevend" },

      /* Vlotten als stapstenen over het water */
      { type: "drijvend", x: 855,  y: 455, w: 90 },
      { type: "drijvend", x: 1715, y: 455, w: 90, fase: 1 },
      { type: "drijvend", x: 2595, y: 455, w: 90, fase: 2 },
      { type: "drijvend", x: 3475, y: 455, w: 90, fase: 3 }
    ],

    water: [
      { x: 780,  w: 240 },
      { x: 1640, w: 240 },
      { x: 2520, w: 240 },
      { x: 3400, w: 240 }
    ],

    bollen: [
      { x: 315,  y: 335 }, { x: 535,  y: 260 }, { x: 900,  y: 415 },
      { x: 1150, y: 335 }, { x: 1370, y: 260 }, { x: 1555, y: 330 },
      { x: 1760, y: 415 }, { x: 2020, y: 335 }, { x: 2240, y: 260 },
      { x: 2640, y: 415 }, { x: 2890, y: 335 }, { x: 3110, y: 260 },
      { x: 3520, y: 415 }, { x: 3790, y: 335 }, { x: 4010, y: 260 },
      { x: 4200, y: 420 }
    ],

    vraagobjecten: [
      { x: 350,  y: 470 },
      { x: 1150, y: 365 },
      { x: 1370, y: 290 },
      { x: 2020, y: 470 },
      { x: 2240, y: 290 },
      { x: 2890, y: 365 },
      { x: 3110, y: 290 },
      { x: 4130, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4210, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 600,  y: 456, w: 56 },
      { x: 2350, y: 456, w: 48 },
      { x: 3300, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "slijm",  x: 300,  minX: 250,  maxX: 560 },
      /* Happers aan de rand van het water: het vlot is een veilige
         wachtplek, je hopt over zodra de vis net gedoken is. */
      { type: "happer", x: 985,  hoogte: 160 },
      { type: "zoemer", x: 1360, basisY: 330, amplitude: 60 },
      { type: "slijm",  x: 2000, minX: 1920, maxX: 2260 },
      { type: "happer", x: 2725, hoogte: 170, fase: 1 },
      { type: "zoemer", x: 3100, basisY: 330, amplitude: 60 },
      { type: "slijm",  x: 3800, minX: 3700, maxX: 4000 }
    ],

    checkpoints: [
      { x: 1900 },
      { x: 3450 }
    ],

    finish: { x: 4340 }
  },

  /* ================================================================
     LEVEL 2 — Rietkraag
     Bredere watervlakken met dubbele vlotoversteken.
     ================================================================ */
  {
    naam: "Rietkraag",
    breedte: 4800,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#5ba0a0",
      luchtOnder:    "#d6f0e6",
      zon:           "#eaf2a0",
      wolk:          "#bfe6df",
      heuvelVer:     "#6fae9c",
      heuvelDichtbij:"#4f8c7c",
      grondGras:     "#5cb06a",
      grondAarde:    "#665738",
      grondAardeRand:"#4c412a",
      platformTop:   "#5cb06a",
      platformHout:  "#836a46",
      waterBoven:    "#4fb8b0",
      waterOnder:    "rgba(24, 70, 70, 0.9)"
    },

    platforms: [
      { x: 0,    y: 480, w: 660,  h: 60, type: "grond" },
      { x: 1080, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 2000, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 3040, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 3980, y: 480, w: 820,  h: 60, type: "grond" },

      { x: 230,  y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 440,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2060, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2280, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2480, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3100, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3320, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3520, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 4040, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4260, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4470, y: 370, w: 120, h: 24, type: "zwevend" },

      /* Vlotoversteken — elk van de vier watervlakken heeft vlotten,
         met korte sprongen (~90px) zodat het ruim haalbaar is */
      { type: "drijvend", x: 730,  y: 455, w: 90 },
      { type: "drijvend", x: 910,  y: 445, w: 90, fase: 1.5 },
      { type: "drijvend", x: 1730, y: 452, w: 90, fase: 0.5 },
      { type: "drijvend", x: 1880, y: 448, w: 90, fase: 1.8 },
      { type: "drijvend", x: 2700, y: 455, w: 90, fase: 1 },
      { type: "drijvend", x: 2870, y: 445, w: 90, fase: 2.5 },
      { type: "drijvend", x: 3690, y: 452, w: 90, fase: 2 },
      { type: "drijvend", x: 3840, y: 448, w: 90, fase: 0.9 }
    ],

    water: [
      { x: 660,  w: 420 },
      { x: 1640, w: 360 },
      { x: 2620, w: 420 },
      { x: 3600, w: 380 }
    ],

    bollen: [
      { x: 295,  y: 335 }, { x: 505,  y: 260 }, { x: 820,  y: 405 },
      { x: 1210, y: 335 }, { x: 1430, y: 260 }, { x: 1820, y: 415 },
      { x: 2130, y: 335 }, { x: 2350, y: 260 }, { x: 2790, y: 405 },
      { x: 3170, y: 335 }, { x: 3390, y: 260 }, { x: 3790, y: 415 },
      { x: 4110, y: 335 }, { x: 4330, y: 260 }, { x: 4530, y: 330 },
      { x: 4700, y: 420 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1210, y: 365 },
      { x: 2130, y: 365 },
      { x: 2350, y: 290 },
      { x: 3170, y: 365 },
      { x: 3390, y: 290 },
      { x: 4110, y: 365 },
      { x: 4520, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4600, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 56 },
      { x: 2450, y: 456, w: 48 },
      { x: 3450, y: 456, w: 48 },
      { x: 4400, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "slijm",  x: 300,  minX: 250,  maxX: 500 },
      { type: "happer", x: 840,  hoogte: 175 },
      { type: "zoemer", x: 1430, basisY: 330, amplitude: 60 },
      { type: "slijm",  x: 2120, minX: 2040, maxX: 2400 },
      { type: "happer", x: 2800, hoogte: 180, fase: 0.6 },
      { type: "zoemer", x: 3390, basisY: 320, amplitude: 70 },
      { type: "happer", x: 3790, hoogte: 165, fase: 1.4 },
      { type: "slijm",  x: 4200, minX: 4020, maxX: 4400 }
    ],

    checkpoints: [
      { x: 2020 },
      { x: 4000 }
    ],

    finish: { x: 4740 }
  },

  /* ================================================================
     LEVEL 3 — Slibdiepte
     Diep, donker moeras: afbrokkelbruggen boven het water en de
     eerste stekelbol.
     ================================================================ */
  {
    naam: "Slibdiepte",
    breedte: 5000,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#3f5a50",
      luchtOnder:    "#7fa08f",
      zon:           "#b8d89a",
      wolk:          "#556e60",
      heuvelVer:     "#33473d",
      heuvelDichtbij:"#283a31",
      grondGras:     "#5a8a4a",
      grondAarde:    "#3f4a34",
      grondAardeRand:"#2e3626",
      platformTop:   "#5a8a4a",
      platformHout:  "#5a5238",
      waterBoven:    "#3d8a80",
      waterOnder:    "rgba(18, 52, 50, 0.92)"
    },

    platforms: [
      { x: 0,    y: 480, w: 600,  h: 60, type: "grond" },
      { x: 1080, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 2020, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 3060, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 4000, y: 480, w: 1000, h: 60, type: "grond" },

      { x: 180,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 390,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2080, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2300, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2500, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3120, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3340, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4060, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4280, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4490, y: 370, w: 120, h: 24, type: "zwevend" },
      { x: 4680, y: 300, w: 120, h: 24, type: "zwevend" },

      /* Afbrokkelbruggen over het water — blijf niet staan! */
      { type: "brokkel", x: 700,  y: 455, w: 90 },
      { type: "brokkel", x: 850,  y: 455, w: 90 },
      { type: "brokkel", x: 940,  y: 455, w: 90 },
      { type: "brokkel", x: 2740, y: 455, w: 90 },
      { type: "brokkel", x: 2890, y: 455, w: 90 },

      /* Deinende vlotten als oversteek (korte sprongen ~90px) */
      { type: "drijvend", x: 1730, y: 450, w: 90, fase: 1 },
      { type: "drijvend", x: 1880, y: 446, w: 90, fase: 2.3 },
      { type: "drijvend", x: 3710, y: 452, w: 90, fase: 1.6 },
      { type: "drijvend", x: 3860, y: 448, w: 90, fase: 0.4 }
    ],

    water: [
      { x: 600,  w: 480 },
      { x: 1640, w: 380 },
      { x: 2640, w: 420 },
      { x: 3620, w: 380 }
    ],

    bollen: [
      { x: 245,  y: 340 }, { x: 455,  y: 260 }, { x: 830,  y: 415 },
      { x: 1210, y: 335 }, { x: 1430, y: 260 }, { x: 1830, y: 405 },
      { x: 2150, y: 335 }, { x: 2370, y: 260 }, { x: 2820, y: 415 },
      { x: 3190, y: 335 }, { x: 3410, y: 260 }, { x: 3800, y: 415 },
      { x: 4130, y: 335 }, { x: 4350, y: 260 }, { x: 4550, y: 330 },
      { x: 4740, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1210, y: 365 },
      { x: 2150, y: 365 },
      { x: 2370, y: 290 },
      { x: 3190, y: 365 },
      { x: 3410, y: 290 },
      { x: 4130, y: 365 },
      { x: 4720, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4800, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 450,  y: 456, w: 48 },
      { x: 2450, y: 456, w: 48 },
      { x: 3400, y: 456, w: 48 },
      { x: 4600, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "slijm",     x: 300,  minX: 250,  maxX: 500 },
      { type: "happer",    x: 840,  hoogte: 180 },
      { type: "zoemer",    x: 1430, basisY: 330, amplitude: 60 },
      { type: "slijm",     x: 2150, minX: 2060, maxX: 2420 },
      { type: "happer",    x: 2820, hoogte: 185, fase: 0.7 },
      { type: "stekelbol", cx: 3350, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "zoemer",    x: 3800, basisY: 330, amplitude: 70 },
      { type: "slijm",     x: 4300, minX: 4020, maxX: 4500 }
    ],

    checkpoints: [
      { x: 2040 },
      { x: 4020 }
    ],

    finish: { x: 4950 }
  },

  /* ================================================================
     LEVEL 4 — Nevelbrug
     Vlotten én bewegende platforms boven brede kolken, met een
     zwevende stekelbol.
     ================================================================ */
  {
    naam: "Nevelbrug",
    breedte: 5200,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#4a5a72",
      luchtOnder:    "#aec2c9",
      zon:           "#dceae0",
      wolk:          "#6a7d84",
      heuvelVer:     "#3d4c56",
      heuvelDichtbij:"#313e46",
      grondGras:     "#5a9a7a",
      grondAarde:    "#4a5450",
      grondAardeRand:"#38403c",
      platformTop:   "#5a9a7a",
      platformHout:  "#5f6a64",
      waterBoven:    "#4aa0a8",
      waterOnder:    "rgba(22, 58, 62, 0.92)"
    },

    platforms: [
      { x: 0,    y: 480, w: 560,  h: 60, type: "grond" },
      { x: 1060, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 2100, y: 480, w: 600,  h: 60, type: "grond" },
      { x: 3200, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 4240, y: 480, w: 960,  h: 60, type: "grond" },

      { x: 160,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 350,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1120, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1340, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2160, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2380, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2580, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3260, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3480, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4300, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4520, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4720, y: 370, w: 120, h: 24, type: "zwevend" },
      { x: 4920, y: 300, w: 120, h: 24, type: "zwevend" },

      /* Vlotten + bewegende platforms — elk gat heeft een oversteek */
      { type: "drijvend", x: 660,  y: 450, w: 100 },
      { type: "drijvend", x: 860,  y: 446, w: 100, fase: 1.2 },
      { type: "drijvend", x: 1700, y: 452, w: 100 },
      { type: "drijvend", x: 1900, y: 452, w: 100, fase: 1.5 },
      { type: "drijvend", x: 2760, y: 450, w: 100, fase: 1 },
      { type: "bewegend", as: "x", min: 2860, max: 3040, y: 405, w: 100, duur: 3.5, fase: 3.14 },
      { type: "drijvend", x: 3840, y: 452, w: 100, fase: 0.7 },
      { type: "drijvend", x: 4040, y: 452, w: 100, fase: 2.2 }
    ],

    water: [
      { x: 560,  w: 500 },
      { x: 1600, w: 500 },
      { x: 2700, w: 500 },
      { x: 3740, w: 500 }
    ],

    bollen: [
      { x: 220,  y: 340 }, { x: 415,  y: 260 }, { x: 800,  y: 400 },
      { x: 1190, y: 335 }, { x: 1410, y: 260 }, { x: 1830, y: 405 },
      { x: 2230, y: 335 }, { x: 2450, y: 260 }, { x: 2870, y: 400 },
      { x: 3330, y: 335 }, { x: 3550, y: 260 }, { x: 3980, y: 405 },
      { x: 4370, y: 335 }, { x: 4590, y: 260 }, { x: 4790, y: 330 },
      { x: 4980, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1190, y: 365 },
      { x: 2230, y: 365 },
      { x: 2450, y: 290 },
      { x: 3330, y: 365 },
      { x: 3550, y: 290 },
      { x: 4370, y: 365 },
      { x: 4920, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5000, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 420,  y: 456, w: 48 },
      { x: 2560, y: 456, w: 48 },
      { x: 3600, y: 456, w: 48 },
      { x: 4650, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "happer",    x: 800,  hoogte: 185 },
      { type: "zoemer",    x: 1410, basisY: 330, amplitude: 70 },
      { type: "slijm",     x: 2200, minX: 2120, maxX: 2500 },
      { type: "happer",    x: 2870, hoogte: 190, fase: 0.6 },
      { type: "stekelbol", cx: 3550, cy: 350, as: "y", bereik: 150, duur: 4 },
      { type: "happer",    x: 3980, hoogte: 180, fase: 1.2 },
      { type: "zoemer",    x: 4500, basisY: 320, amplitude: 60 },
      { type: "slijm",     x: 4900, minX: 4820, maxX: 5100 }
    ],

    checkpoints: [
      { x: 2120 },
      { x: 4260 }
    ],

    finish: { x: 5150 }
  },

  /* ================================================================
     LEVEL 5 — Kolkstroom
     Snelle happers en veel water: van vlot naar vlot springen
     terwijl de vissen loeren.
     ================================================================ */
  {
    naam: "Kolkstroom",
    breedte: 5400,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#3a4f6a",
      luchtOnder:    "#8fb0c9",
      zon:           "#cfe6ea",
      wolk:          "#546f88",
      heuvelVer:     "#31445c",
      heuvelDichtbij:"#26374b",
      grondGras:     "#4f9a86",
      grondAarde:    "#3f5258",
      grondAardeRand:"#2e3d42",
      platformTop:   "#4f9a86",
      platformHout:  "#4f6068",
      waterBoven:    "#3f9aa8",
      waterOnder:    "rgba(18, 54, 60, 0.93)"
    },

    platforms: [
      { x: 0,    y: 480, w: 520,  h: 60, type: "grond" },
      { x: 1080, y: 480, w: 500,  h: 60, type: "grond" },
      { x: 2080, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 3160, y: 480, w: 520,  h: 60, type: "grond" },
      { x: 4200, y: 480, w: 1200, h: 60, type: "grond" },

      { x: 150,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 340,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2560, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3220, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3440, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4260, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4480, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4700, y: 370, w: 120, h: 24, type: "zwevend" },
      { x: 4900, y: 300, w: 120, h: 24, type: "zwevend" },
      { x: 5100, y: 370, w: 110, h: 24, type: "zwevend" },

      /* Reeksen vlotten over de brede stroom — elk gat overbrugd */
      { type: "drijvend", x: 620,  y: 450, w: 90 },
      { type: "drijvend", x: 780,  y: 445, w: 90, fase: 1.4 },
      { type: "drijvend", x: 940,  y: 450, w: 90, fase: 2.8 },
      { type: "drijvend", x: 1700, y: 452, w: 100 },
      { type: "drijvend", x: 1900, y: 452, w: 100, fase: 1.5 },
      { type: "drijvend", x: 2720, y: 450, w: 90, fase: 0.8 },
      { type: "drijvend", x: 2880, y: 445, w: 90, fase: 2.2 },
      { type: "drijvend", x: 3040, y: 450, w: 90, fase: 3.6 },
      { type: "drijvend", x: 3800, y: 452, w: 100, fase: 0.9 },
      { type: "drijvend", x: 4000, y: 452, w: 100, fase: 2.6 }
    ],

    water: [
      { x: 520,  w: 560 },
      { x: 1580, w: 500 },
      { x: 2640, w: 520 },
      { x: 3680, w: 520 }
    ],

    bollen: [
      { x: 210,  y: 340 }, { x: 405,  y: 260 }, { x: 800,  y: 400 },
      { x: 1210, y: 335 }, { x: 1430, y: 260 }, { x: 1820, y: 405 },
      { x: 2210, y: 335 }, { x: 2430, y: 260 }, { x: 2880, y: 400 },
      { x: 3290, y: 335 }, { x: 3510, y: 260 }, { x: 3920, y: 405 },
      { x: 4330, y: 335 }, { x: 4550, y: 260 }, { x: 4770, y: 330 },
      { x: 4970, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1210, y: 365 },
      { x: 2210, y: 365 },
      { x: 2430, y: 290 },
      { x: 3290, y: 365 },
      { x: 3510, y: 290 },
      { x: 4330, y: 365 },
      { x: 5120, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5200, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 48 },
      { x: 2540, y: 456, w: 48 },
      { x: 3560, y: 456, w: 48 },
      { x: 4640, y: 456, w: 56 }
    ],

    vijanden: [
      { type: "happer",    x: 700,  hoogte: 190, duikTijd: 1.4 },
      { type: "happer",    x: 940,  hoogte: 175, duikTijd: 1.4, fase: 0.8 },
      { type: "zoemer",    x: 1430, basisY: 330, amplitude: 70 },
      { type: "slijm",     x: 2200, minX: 2100, maxX: 2500 },
      { type: "happer",    x: 2800, hoogte: 190, duikTijd: 1.3, fase: 0.5 },
      { type: "happer",    x: 3040, hoogte: 180, duikTijd: 1.3, fase: 1.6 },
      { type: "stekelbol", cx: 3510, cy: 300, as: "y", bereik: 140, duur: 4 },
      { type: "zoemer",    x: 3920, basisY: 330, amplitude: 60 },
      { type: "slijm",     x: 4500, minX: 4220, maxX: 4700 }
    ],

    checkpoints: [
      { x: 2100 },
      { x: 4220 }
    ],

    finish: { x: 5350 }
  },

  /* ================================================================
     LEVEL 6 — De Grote Delta
     De monding waar alles samenkomt: brede watervlakken, vlotten,
     bewegende platforms, afbrokkelbruggen en drie stekelbollen.
     Alleen voor echte rivierloodsen!
     ================================================================ */
  {
    naam: "De Grote Delta",
    breedte: 5900,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#233a4a",
      luchtOnder:    "#4a6a72",
      zon:           "#8fd8c8",
      wolk:          "#33505a",
      heuvelVer:     "#1f3440",
      heuvelDichtbij:"#182a34",
      grondGras:     "#3f9a7a",
      grondAarde:    "#2a4048",
      grondAardeRand:"#1c2e34",
      platformTop:   "#3f9a7a",
      platformHout:  "#3a4c52",
      waterBoven:    "#37a0a0",
      waterOnder:    "rgba(14, 48, 52, 0.94)"
    },

    platforms: [
      { x: 0,    y: 480, w: 500,  h: 60, type: "grond" },
      { x: 1060, y: 480, w: 480,  h: 60, type: "grond" },
      { x: 2080, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 3160, y: 480, w: 500,  h: 60, type: "grond" },
      { x: 4200, y: 480, w: 520,  h: 60, type: "grond" },
      { x: 5260, y: 480, w: 640,  h: 60, type: "grond" },

      { x: 150,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 340,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1120, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 1340, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 2360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2560, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 3220, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3440, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4260, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4480, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4680, y: 370, w: 110, h: 24, type: "zwevend" },
      { x: 5320, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 5540, y: 300, w: 130, h: 24, type: "zwevend" },

      /* Alles gecombineerd: vlotten, bewegende platforms, brokkelbrug
         — elk van de vijf watervlakken heeft een oversteek */
      { type: "drijvend", x: 600,  y: 450, w: 90 },
      { type: "drijvend", x: 760,  y: 445, w: 90, fase: 1.6 },
      { type: "drijvend", x: 940,  y: 448, w: 100, fase: 1.1 },
      { type: "drijvend", x: 1660, y: 452, w: 100 },
      { type: "drijvend", x: 1880, y: 452, w: 100, fase: 1.4 },
      { type: "drijvend", x: 2720, y: 450, w: 90, fase: 0.9 },
      { type: "brokkel",  x: 2860, y: 450, w: 85 },
      { type: "brokkel",  x: 2960, y: 450, w: 85 },
      { type: "bewegend", as: "y", x: 3760, min: 330, max: 450, w: 100, duur: 4.5 },
      { type: "drijvend", x: 3920, y: 450, w: 90, fase: 2.1 },
      { type: "drijvend", x: 4080, y: 452, w: 100, fase: 1.3 },
      { type: "drijvend", x: 4840, y: 452, w: 100, fase: 0.6 },
      { type: "drijvend", x: 5060, y: 452, w: 100, fase: 2.4 }
    ],

    water: [
      { x: 500,  w: 560 },
      { x: 1540, w: 540 },
      { x: 2620, w: 540 },
      { x: 3660, w: 540 },
      { x: 4720, w: 540 }
    ],

    bollen: [
      { x: 210,  y: 340 }, { x: 405,  y: 260 }, { x: 780,  y: 400 },
      { x: 1190, y: 335 }, { x: 1410, y: 260 }, { x: 1810, y: 405 },
      { x: 2210, y: 335 }, { x: 2430, y: 260 }, { x: 2900, y: 400 },
      { x: 3290, y: 335 }, { x: 3510, y: 260 }, { x: 3960, y: 405 },
      { x: 4350, y: 335 }, { x: 4570, y: 260 }, { x: 5060, y: 405 },
      { x: 5400, y: 335 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1190, y: 365 },
      { x: 2210, y: 365 },
      { x: 2430, y: 290 },
      { x: 3290, y: 365 },
      { x: 3510, y: 290 },
      { x: 4350, y: 365 },
      { x: 5500, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5560, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 48 },
      { x: 2560, y: 456, w: 48 },
      { x: 3560, y: 456, w: 48 },
      { x: 4640, y: 456, w: 48 },
      { x: 5680, y: 456, w: 56 }
    ],

    vijanden: [
      { type: "happer",    x: 690,  hoogte: 190, duikTijd: 1.4 },
      { type: "zoemer",    x: 1410, basisY: 330, amplitude: 70 },
      { type: "slijm",     x: 2200, minX: 2100, maxX: 2500 },
      { type: "happer",    x: 2900, hoogte: 195, duikTijd: 1.3, fase: 0.7 },
      { type: "stekelbol", cx: 3510, cy: 300, as: "y", bereik: 140, duur: 4 },
      { type: "happer",    x: 3960, hoogte: 190, duikTijd: 1.3, fase: 1.5 },
      { type: "stekelbol", cx: 4640, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "zoemer",    x: 5060, basisY: 330, amplitude: 60 },
      { type: "slijm",     x: 5560, minX: 5300, maxX: 5720 },
      { type: "stekelbol", cx: 5400, cy: 320, as: "y", bereik: 120, duur: 3.5 }
    ],

    checkpoints: [
      { x: 2100 },
      { x: 3180 },
      { x: 4220 }
    ],

    finish: { x: 5720 }
  }
];
