/* ============================================================
   LEVELS WERELD 6 — "Cyberkasteel" (de eindmissie: alles toepassen).

   Geen nieuw obstakel: dit is de grote remix. Alle gevaren uit de
   eerdere werelden komen hier samen — water met vlotten en happers
   (W4), zoeklichten (W3), beveiligingslasers (W5), bewegende
   platforms, afbrokkelbruggen en stekelbollen — plus àlle
   vijandtypes door elkaar. Donker cyberkasteel met neonranden.

   Finishvolgorde altijd: slotje → poort (muur) → finish.
   ============================================================ */

const WERELD6_LEVELS = [

  /* ================================================================
     LEVEL 1 — Slotgracht
     Terug in het zadel: lasers en een zoeklicht boven de stoep.
     ================================================================ */
  {
    naam: "Slotgracht",
    breedte: 4400,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#12122e",
      luchtOnder:    "#37205a",
      zon:           "#39ffec",
      wolk:          "#241a40",
      heuvelVer:     "#1e1842",
      heuvelDichtbij:"#161232",
      grondGras:     "#39ffec",
      grondAarde:    "#1e1a3c",
      grondAardeRand:"#14112a",
      platformTop:   "#39ffec",
      platformHout:  "#2a2450"
    },

    platforms: [
      { x: 0,    y: 480, w: 820,  h: 60, type: "grond" },
      { x: 940,  y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1680, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2520, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 3360, y: 480, w: 1040, h: 60, type: "grond" },

      { x: 260,  y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 480,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 700,  y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 1220, y: 305, w: 150, h: 24, type: "zwevend" },
      { x: 1760, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1980, y: 305, w: 150, h: 24, type: "zwevend" },
      { x: 2200, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2600, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 2820, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3040, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3440, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3660, y: 305, w: 150, h: 24, type: "zwevend" },
      { x: 3880, y: 375, w: 130, h: 24, type: "zwevend" }
    ],

    bollen: [
      { x: 335,  y: 335 }, { x: 550,  y: 260 }, { x: 765,  y: 330 },
      { x: 880,  y: 415 }, { x: 1075, y: 340 }, { x: 1295, y: 265 },
      { x: 1620, y: 415 }, { x: 1830, y: 340 }, { x: 2055, y: 265 },
      { x: 2265, y: 335 }, { x: 2670, y: 340 }, { x: 2895, y: 260 },
      { x: 3105, y: 335 }, { x: 3510, y: 340 }, { x: 3730, y: 265 },
      { x: 3945, y: 335 }
    ],

    vraagobjecten: [
      { x: 350,  y: 470 },
      { x: 1075, y: 370 },
      { x: 1295, y: 295 },
      { x: 1830, y: 470 },
      { x: 2055, y: 295 },
      { x: 2670, y: 370 },
      { x: 2895, y: 290 },
      { x: 4040, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4120, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 600,  y: 456, w: 56 },
      { x: 2280, y: 456, w: 48 },
      { x: 3160, y: 456, w: 48 }
    ],

    lasers: [
      { x: 2050, aan: 1.2, uit: 1.8 },
      { x: 3050, aan: 1.2, uit: 1.8, fase: 1.4 }
    ],

    zoeklichten: [
      { cx: 3520, bereik: 240, duur: 6 }
    ],

    vijanden: [
      { type: "slijm",    x: 300,  minX: 250,  maxX: 560 },
      { type: "camdrone", x: 880,  basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 1200, minX: 1050, maxX: 1500 },
      { type: "zoemer",   x: 1620, basisY: 340, amplitude: 60 },
      { type: "bewaker",  x: 1900, minX: 1820, maxX: 2150 },
      { type: "camdrone", x: 2670, basisY: 330, amplitude: 60 },
      { type: "slijm",    x: 2900, minX: 2780, maxX: 3180 }
    ],

    checkpoints: [
      { x: 1720 },
      { x: 3400 }
    ],

    finish: { x: 4280 }
  },

  /* ================================================================
     LEVEL 2 — Wachttorens
     Dubbele zoeklichten en lasers tussen de torens, plus liften
     naar de hoge uitkijkposten.
     ================================================================ */
  {
    naam: "Wachttorens",
    breedte: 4700,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#1a1030",
      luchtOnder:    "#4a2050",
      zon:           "#ff3ed6",
      wolk:          "#2e1a44",
      heuvelVer:     "#28183e",
      heuvelDichtbij:"#1c122c",
      grondGras:     "#ff3ed6",
      grondAarde:    "#241638",
      grondAardeRand:"#170e26",
      platformTop:   "#ff3ed6",
      platformHout:  "#33244e"
    },

    platforms: [
      { x: 0,    y: 480, w: 760,  h: 60, type: "grond" },
      { x: 880,  y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1620, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2460, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 3300, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 4040, y: 480, w: 660,  h: 60, type: "grond" },

      { x: 230,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 450,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 640,  y: 225, w: 140, h: 24, type: "zwevend" },
      { x: 940,  y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1160, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1680, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2120, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2520, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2740, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2960, y: 225, w: 140, h: 24, type: "zwevend" },
      { x: 3360, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3580, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4100, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4320, y: 300, w: 150, h: 24, type: "zwevend" },

      /* Liften omhoog naar de uitkijkposten (over de grond, bonus) */
      { type: "bewegend", as: "y", x: 560, min: 300, max: 440, w: 90, duur: 4.5 },
      { type: "bewegend", as: "y", x: 2880, min: 300, max: 440, w: 90, duur: 4.5, fase: 2 }
    ],

    bollen: [
      { x: 300,  y: 335 }, { x: 520,  y: 260 }, { x: 710,  y: 185 },
      { x: 1015, y: 335 }, { x: 1235, y: 260 }, { x: 1560, y: 415 },
      { x: 1755, y: 335 }, { x: 1975, y: 260 }, { x: 2380, y: 415 },
      { x: 2595, y: 335 }, { x: 3030, y: 185 }, { x: 3240, y: 415 },
      { x: 3435, y: 335 }, { x: 3655, y: 260 }, { x: 4170, y: 335 },
      { x: 4390, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1015, y: 365 },
      { x: 1755, y: 365 },
      { x: 1975, y: 290 },
      { x: 2595, y: 365 },
      { x: 3435, y: 365 },
      { x: 3655, y: 290 },
      { x: 4340, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4420, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 560,  y: 456, w: 48 },
      { x: 2200, y: 456, w: 48 },
      { x: 3200, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1300, aan: 1.2, uit: 1.7 },
      { x: 3020, aan: 1.2, uit: 1.7, fase: 1.5 }
    ],

    zoeklichten: [
      { cx: 2100, bereik: 240, duur: 5.5 },
      { cx: 4200, bereik: 260, duur: 5, fase: 2 }
    ],

    vijanden: [
      { type: "bewaker",  x: 300,  minX: 250,  maxX: 500 },
      { type: "spiedoog", x: 760,  basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 960,  minX: 890,  maxX: 1200 },
      { type: "camdrone", x: 1560, basisY: 320, amplitude: 70 },
      { type: "bewaker",  x: 1900, minX: 1820, maxX: 2120 },
      { type: "spiedoog", x: 2380, basisY: 320, amplitude: 70 },
      { type: "bewaker",  x: 2700, minX: 2560, maxX: 2900 },
      { type: "camdrone", x: 3435, basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 4100, minX: 4020, maxX: 4300 }
    ],

    checkpoints: [
      { x: 1640 },
      { x: 3320 }
    ],

    finish: { x: 4580 }
  },

  /* ================================================================
     LEVEL 3 — Spiegelzaal
     De gracht is terug: water met vlotten en een happer, plus een
     laser en een zoeklicht.
     ================================================================ */
  {
    naam: "Spiegelzaal",
    breedte: 4900,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#0e1430",
      luchtOnder:    "#1e3a5c",
      zon:           "#39d0ff",
      wolk:          "#182842",
      heuvelVer:     "#162640",
      heuvelDichtbij:"#101c30",
      grondGras:     "#39d0ff",
      grondAarde:    "#182238",
      grondAardeRand:"#101726",
      platformTop:   "#39d0ff",
      platformHout:  "#243a5a",
      waterBoven:    "#3a7fd0",
      waterOnder:    "rgba(18, 40, 80, 0.9)"
    },

    platforms: [
      { x: 0,    y: 480, w: 760,  h: 60, type: "grond" },
      { x: 1140, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1880, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2720, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 3560, y: 480, w: 1340, h: 60, type: "grond" },

      { x: 230,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 450,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1200, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1420, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1940, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2160, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2380, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2780, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 3000, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3220, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3620, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3840, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4260, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4480, y: 300, w: 150, h: 24, type: "zwevend" },

      /* Vlotten over de gracht */
      { type: "drijvend", x: 850,  y: 452, w: 90 },
      { type: "drijvend", x: 1000, y: 448, w: 90, fase: 1.5 }
    ],

    water: [
      { x: 760, w: 380 }
    ],

    bollen: [
      { x: 300,  y: 335 }, { x: 520,  y: 260 }, { x: 950,  y: 410 },
      { x: 1275, y: 335 }, { x: 1495, y: 260 }, { x: 1720, y: 415 },
      { x: 2015, y: 335 }, { x: 2235, y: 260 }, { x: 2640, y: 415 },
      { x: 2855, y: 335 }, { x: 3075, y: 260 }, { x: 3480, y: 415 },
      { x: 3695, y: 335 }, { x: 3915, y: 260 }, { x: 4330, y: 335 },
      { x: 4550, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1275, y: 365 },
      { x: 2015, y: 365 },
      { x: 2235, y: 290 },
      { x: 2855, y: 365 },
      { x: 3075, y: 290 },
      { x: 3695, y: 365 },
      { x: 4540, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4620, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 1400, y: 456, w: 48 },
      { x: 2560, y: 456, w: 48 },
      { x: 3360, y: 456, w: 48 }
    ],

    lasers: [
      { x: 2300, aan: 1.2, uit: 1.8 },
      { x: 3900, aan: 1.2, uit: 1.8, fase: 1.4 }
    ],

    zoeklichten: [
      { cx: 3200, bereik: 240, duur: 5.5 }
    ],

    vijanden: [
      { type: "slijm",    x: 300,  minX: 250,  maxX: 500 },
      { type: "happer",   x: 950,  hoogte: 175 },
      { type: "camdrone", x: 1720, basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 1960, minX: 1880, maxX: 2200 },
      { type: "spiedoog", x: 2640, basisY: 320, amplitude: 70 },
      { type: "bewaker",  x: 2820, minX: 2740, maxX: 3040 },
      { type: "camdrone", x: 3695, basisY: 330, amplitude: 60 },
      { type: "slijm",    x: 4200, minX: 3980, maxX: 4400 }
    ],

    checkpoints: [
      { x: 1900 },
      { x: 3580 }
    ],

    finish: { x: 4780 }
  },

  /* ================================================================
     LEVEL 4 — Vuurgang
     Een gang vol lasers en zoeklichten, met twee stekelbollen.
     Timing is alles!
     ================================================================ */
  {
    naam: "Vuurgang",
    breedte: 5000,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#26102a",
      luchtOnder:    "#5a2038",
      zon:           "#ff6a4a",
      wolk:          "#3a1830",
      heuvelVer:     "#301428",
      heuvelDichtbij:"#220e1e",
      grondGras:     "#ff5a7a",
      grondAarde:    "#2a1626",
      grondAardeRand:"#1a0e18",
      platformTop:   "#ff5a7a",
      platformHout:  "#3a2030"
    },

    platforms: [
      { x: 0,    y: 480, w: 720,  h: 60, type: "grond" },
      { x: 840,  y: 480, w: 600,  h: 60, type: "grond" },
      { x: 1560, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2400, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 3240, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 4080, y: 480, w: 920,  h: 60, type: "grond" },

      { x: 220,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 440,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 900,  y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1120, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1620, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1840, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2060, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2460, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2680, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2900, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3300, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3520, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4140, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4360, y: 300, w: 150, h: 24, type: "zwevend" }
    ],

    bollen: [
      { x: 290,  y: 335 }, { x: 510,  y: 260 }, { x: 780,  y: 415 },
      { x: 975,  y: 335 }, { x: 1195, y: 260 }, { x: 1500, y: 415 },
      { x: 1695, y: 335 }, { x: 1915, y: 260 }, { x: 2340, y: 415 },
      { x: 2535, y: 335 }, { x: 2755, y: 260 }, { x: 3180, y: 415 },
      { x: 3375, y: 335 }, { x: 3595, y: 260 }, { x: 4210, y: 335 },
      { x: 4430, y: 260 }
    ],

    vraagobjecten: [
      { x: 290,  y: 470 },
      { x: 975,  y: 365 },
      { x: 1695, y: 365 },
      { x: 1915, y: 290 },
      { x: 2535, y: 365 },
      { x: 2755, y: 290 },
      { x: 3375, y: 365 },
      { x: 4640, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4720, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 48 },
      { x: 2160, y: 456, w: 48 },
      { x: 3040, y: 456, w: 48 },
      { x: 3960, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1200, aan: 1.3, uit: 1.5 },
      { x: 2620, aan: 1.3, uit: 1.5, fase: 1.0 },
      { x: 3600, aan: 1.3, uit: 1.5, fase: 2.0 }
    ],

    zoeklichten: [
      { cx: 2000, bereik: 220, duur: 5 },
      { cx: 4300, bereik: 260, duur: 5, fase: 1.5 }
    ],

    vijanden: [
      { type: "camdrone",  x: 780,  basisY: 330, amplitude: 70 },
      { type: "bewaker",   x: 900,  minX: 850,  maxX: 1150 },
      { type: "spiedoog",  x: 1500, basisY: 340, amplitude: 60 },
      { type: "stekelbol", cx: 1900, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "bewaker",   x: 2450, minX: 2410, maxX: 2680 },
      { type: "camdrone",  x: 3180, basisY: 320, amplitude: 70 },
      { type: "stekelbol", cx: 3550, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "bewaker",   x: 4200, minX: 4100, maxX: 4400 }
    ],

    checkpoints: [
      { x: 1580 },
      { x: 3260 }
    ],

    finish: { x: 4880 }
  },

  /* ================================================================
     LEVEL 5 — Neonwallen
     Twee grachten met vlotten en happers, plus lasers, een
     zoeklicht en een stekelbol.
     ================================================================ */
  {
    naam: "Neonwallen",
    breedte: 5200,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#12122e",
      luchtOnder:    "#2a2a5c",
      zon:           "#8f7fff",
      wolk:          "#1e1e44",
      heuvelVer:     "#1a1a42",
      heuvelDichtbij:"#131332",
      grondGras:     "#8f7fff",
      grondAarde:    "#1c1c40",
      grondAardeRand:"#12122c",
      platformTop:   "#8f7fff",
      platformHout:  "#28285a",
      waterBoven:    "#4a6fd0",
      waterOnder:    "rgba(22, 28, 78, 0.9)"
    },

    platforms: [
      { x: 0,    y: 480, w: 700,  h: 60, type: "grond" },
      { x: 1080, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1820, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2920, y: 480, w: 620,  h: 60, type: "grond" },
      { x: 3660, y: 480, w: 1540, h: 60, type: "grond" },

      { x: 220,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 440,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1140, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1360, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1880, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2100, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2320, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2980, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 3200, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3720, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3940, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4160, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 4560, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4780, y: 300, w: 150, h: 24, type: "zwevend" },

      /* Vlotten over de twee grachten */
      { type: "drijvend", x: 790,  y: 452, w: 90 },
      { type: "drijvend", x: 940,  y: 448, w: 90, fase: 1.5 },
      { type: "drijvend", x: 2630, y: 452, w: 90, fase: 1 },
      { type: "drijvend", x: 2780, y: 448, w: 90, fase: 2.5 }
    ],

    water: [
      { x: 700,  w: 380 },
      { x: 2540, w: 380 }
    ],

    bollen: [
      { x: 290,  y: 335 }, { x: 510,  y: 260 }, { x: 890,  y: 410 },
      { x: 1215, y: 335 }, { x: 1435, y: 260 }, { x: 1740, y: 415 },
      { x: 1955, y: 335 }, { x: 2175, y: 260 }, { x: 2730, y: 410 },
      { x: 3055, y: 335 }, { x: 3275, y: 260 }, { x: 3580, y: 415 },
      { x: 3795, y: 335 }, { x: 4015, y: 260 }, { x: 4630, y: 335 },
      { x: 4850, y: 260 }
    ],

    vraagobjecten: [
      { x: 290,  y: 470 },
      { x: 1215, y: 365 },
      { x: 1955, y: 365 },
      { x: 2175, y: 290 },
      { x: 3055, y: 365 },
      { x: 3275, y: 290 },
      { x: 3795, y: 365 },
      { x: 4840, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4920, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 1400, y: 456, w: 48 },
      { x: 2000, y: 456, w: 48 },
      { x: 3300, y: 456, w: 48 },
      { x: 4400, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1500, aan: 1.3, uit: 1.6 },
      { x: 4100, aan: 1.2, uit: 1.7, fase: 1.5 }
    ],

    zoeklichten: [
      { cx: 3250, bereik: 240, duur: 5.5 }
    ],

    vijanden: [
      { type: "slijm",     x: 290,  minX: 240,  maxX: 500 },
      { type: "happer",    x: 890,  hoogte: 180 },
      { type: "camdrone",  x: 1740, basisY: 330, amplitude: 60 },
      { type: "bewaker",   x: 1960, minX: 1880, maxX: 2180 },
      { type: "happer",    x: 2730, hoogte: 175, fase: 0.7 },
      { type: "stekelbol", cx: 3200, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "spiedoog",  x: 3795, basisY: 330, amplitude: 60 },
      { type: "bewaker",   x: 4300, minX: 4200, maxX: 4500 }
    ],

    checkpoints: [
      { x: 1840 },
      { x: 3680 }
    ],

    finish: { x: 5080 }
  },

  /* ================================================================
     LEVEL 6 — De Troonzaal
     De grote finale: water met vlotten en happers, een
     afbrokkelbrug, zoeklichten, lasers, drie stekelbollen en àlle
     vijandtypes door elkaar. Alleen voor de echte cyberheld!
     ================================================================ */
  {
    naam: "De Troonzaal",
    breedte: 5900,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#0a0a1e",
      luchtOnder:    "#241040",
      zon:           "#ff3ed6",
      wolk:          "#180f34",
      heuvelVer:     "#14103a",
      heuvelDichtbij:"#0d0a28",
      grondGras:     "#39ffec",
      grondAarde:    "#161036",
      grondAardeRand:"#0d0a22",
      platformTop:   "#ff3ed6",
      platformHout:  "#241c50",
      waterBoven:    "#3a5fd0",
      waterOnder:    "rgba(16, 22, 66, 0.92)"
    },

    platforms: [
      { x: 0,    y: 480, w: 640,  h: 60, type: "grond" },
      { x: 1020, y: 480, w: 600,  h: 60, type: "grond" },
      { x: 1740, y: 480, w: 700,  h: 60, type: "grond" },
      { x: 2860, y: 480, w: 700,  h: 60, type: "grond" },
      { x: 3940, y: 480, w: 700,  h: 60, type: "grond" },
      { x: 4760, y: 480, w: 1140, h: 60, type: "grond" },

      { x: 200,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 420,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1080, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1300, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1800, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2020, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2240, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2920, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 3140, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3360, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 4000, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4220, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4440, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 4820, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 5040, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 5260, y: 375, w: 130, h: 24, type: "zwevend" },

      /* Vlotten over de twee grachten */
      { type: "drijvend", x: 730,  y: 452, w: 90 },
      { type: "drijvend", x: 880,  y: 448, w: 90, fase: 1.5 },
      { type: "drijvend", x: 3650, y: 452, w: 90, fase: 1 },
      { type: "drijvend", x: 3800, y: 448, w: 90, fase: 2.5 },

      /* Afbrokkelbrug over de derde gracht */
      { type: "brokkel", x: 2470, y: 430, w: 90 },
      { type: "brokkel", x: 2610, y: 430, w: 90 },
      { type: "brokkel", x: 2750, y: 430, w: 90 }
    ],

    water: [
      { x: 640,  w: 380 },
      { x: 3560, w: 380 }
    ],

    bollen: [
      { x: 270,  y: 335 }, { x: 490,  y: 260 }, { x: 830,  y: 410 },
      { x: 1155, y: 335 }, { x: 1375, y: 260 }, { x: 1660, y: 415 },
      { x: 1875, y: 335 }, { x: 2095, y: 260 }, { x: 2610, y: 400 },
      { x: 2995, y: 335 }, { x: 3215, y: 260 }, { x: 3720, y: 410 },
      { x: 4075, y: 335 }, { x: 4295, y: 260 }, { x: 4890, y: 335 },
      { x: 5110, y: 260 }
    ],

    vraagobjecten: [
      { x: 270,  y: 470 },
      { x: 1155, y: 365 },
      { x: 1875, y: 365 },
      { x: 2095, y: 290 },
      { x: 2995, y: 365 },
      { x: 3215, y: 290 },
      { x: 4075, y: 365 },
      { x: 5440, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5520, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 1500, y: 456, w: 48 },
      { x: 2000, y: 456, w: 48 },
      { x: 3360, y: 456, w: 48 },
      { x: 4400, y: 456, w: 48 },
      { x: 5000, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1400, aan: 1.3, uit: 1.5 },
      { x: 3300, aan: 1.3, uit: 1.5, fase: 1.2 },
      { x: 4680, aan: 1.2, uit: 1.6, fase: 2.2 }
    ],

    zoeklichten: [
      { cx: 2150, bereik: 220, duur: 5 },
      { cx: 4250, bereik: 260, duur: 5, fase: 1.5 }
    ],

    vijanden: [
      { type: "happer",    x: 830,  hoogte: 180 },
      { type: "tandwiel",  x: 1100, minX: 1040, maxX: 1360 },
      { type: "camdrone",  x: 1660, basisY: 320, amplitude: 70 },
      { type: "bewaker",   x: 1900, minX: 1820, maxX: 2100 },
      { type: "spiedoog",  x: 2610, basisY: 300, amplitude: 60 },
      { type: "stekelbol", cx: 2980, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "schroefdrone", x: 3215, basisY: 320, amplitude: 60 },
      { type: "happer",    x: 3720, hoogte: 180, fase: 0.8 },
      { type: "stekelbol", cx: 4250, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "kluisbot",  x: 4820, minX: 4780, maxX: 5040 },
      { type: "slijm",     x: 5240, minX: 5180, maxX: 5420 },
      { type: "stekelbol", cx: 5110, cy: 320, as: "y", bereik: 120, duur: 3.5 }
    ],

    checkpoints: [
      { x: 1760 },
      { x: 2880 },
      { x: 3960 }
    ],

    finish: { x: 5680 }
  }
];
