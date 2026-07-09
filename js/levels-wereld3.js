/* ============================================================
   LEVELS WERELD 3 — "Geheimenkluis"
   (leerdoel: wachtwoorden en codes geheim houden).

   Nieuw obstakel: het ZOEKLICHT — een zwaaiende lichtbundel
   aan het plafond. Sta je in het licht, dan gaat het alarm af
   en verlies je een hart. Sluip er langs als de bundel weg is!
     zoeklichten: [{ cx, bereik, duur, fase? }]

   Eigen vijanden: kluisbots (patrouillerende kluisjes op
   pootjes) en spiedogen (zwevende spionnen-ogen). De blaster
   uit Wereld 2 werkt hier gewoon; stekelbollen blijven
   gepantserd.

   De opbouw per level is verder hetzelfde als in levels.js.
   ============================================================ */

const WERELD3_LEVELS = [

  /* ================================================================
     LEVEL 1 — Fluisterpad
     Rustige start in de schemer: kennismaken met kluisbots,
     spiedogen en één traag zoeklicht.
     ================================================================ */
  {
    naam: "Fluisterpad",
    breedte: 4300,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#4a4a7a",
      luchtOnder:    "#9a8fc4",
      zon:           "#d8c47a",
      wolk:          "#5f5f94",
      heuvelVer:     "#3d3d66",
      heuvelDichtbij:"#33335a",
      grondGras:     "#8a7fc4",
      grondAarde:    "#3a3660",
      grondAardeRand:"#2b2848",
      platformTop:   "#8a7fc4",
      platformHout:  "#4a4577"
    },

    platforms: [
      { x: 0,    y: 480, w: 700, h: 60, type: "grond" },
      { x: 820,  y: 480, w: 680, h: 60, type: "grond" },
      { x: 1620, y: 480, w: 680, h: 60, type: "grond" },
      { x: 2420, y: 480, w: 680, h: 60, type: "grond" },
      { x: 3220, y: 480, w: 1080, h: 60, type: "grond" },

      { x: 250,  y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 450,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 900,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1100, y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1300, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 1700, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2100, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2500, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2700, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2900, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 3300, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3500, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3700, y: 375, w: 120, h: 24, type: "zwevend" }
    ],

    bollen: [
      { x: 315,  y: 335 }, { x: 515,  y: 260 }, { x: 760,  y: 420 },
      { x: 970,  y: 340 }, { x: 1170, y: 265 }, { x: 1360, y: 335 },
      { x: 1560, y: 420 }, { x: 1770, y: 340 }, { x: 1970, y: 260 },
      { x: 2360, y: 420 }, { x: 2570, y: 340 }, { x: 2770, y: 260 },
      { x: 3160, y: 420 }, { x: 3370, y: 340 }, { x: 3570, y: 260 },
      { x: 3760, y: 335 }
    ],

    vraagobjecten: [
      { x: 350,  y: 470 },
      { x: 970,  y: 370 },
      { x: 1170, y: 295 },
      { x: 1770, y: 370 },
      { x: 1970, y: 290 },
      { x: 2570, y: 370 },
      { x: 2770, y: 290 },
      { x: 3820, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 3900, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 600,  y: 456, w: 56 },
      { x: 2200, y: 456, w: 56 },
      { x: 3000, y: 456, w: 56 }
    ],

    zoeklichten: [
      { cx: 3450, bereik: 240, duur: 6 }
    ],

    vijanden: [
      { type: "kluisbot", x: 250,  minX: 180,  maxX: 520 },
      { type: "spiedoog", x: 760,  basisY: 330, amplitude: 60 },
      { type: "kluisbot", x: 1000, minX: 900,  maxX: 1350 },
      { type: "spiedoog", x: 1560, basisY: 330, amplitude: 60 },
      { type: "kluisbot", x: 1800, minX: 1700, maxX: 2150 },
      { type: "spiedoog", x: 2360, basisY: 330, amplitude: 60 },
      { type: "kluisbot", x: 2600, minX: 2500, maxX: 2950 }
    ],

    checkpoints: [
      { x: 1680 },
      { x: 3280 }
    ],

    finish: { x: 4150 }
  },

  /* ================================================================
     LEVEL 2 — Sleutelgang
     Twee mover-oversteken en de eerste dubbele zoeklichten.
     ================================================================ */
  {
    naam: "Sleutelgang",
    breedte: 4700,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#3d4a70",
      luchtOnder:    "#8fa0c9",
      zon:           "#e0cc88",
      wolk:          "#54618a",
      heuvelVer:     "#333f5e",
      heuvelDichtbij:"#2a3450",
      grondGras:     "#7d94c9",
      grondAarde:    "#333f5c",
      grondAardeRand:"#263048",
      platformTop:   "#7d94c9",
      platformHout:  "#445475"
    },

    platforms: [
      { x: 0,    y: 480, w: 600, h: 60, type: "grond" },
      { x: 720,  y: 480, w: 580, h: 60, type: "grond" },
      { x: 1740, y: 480, w: 610, h: 60, type: "grond" },
      { x: 2470, y: 480, w: 580, h: 60, type: "grond" },
      { x: 3490, y: 480, w: 1210, h: 60, type: "grond" },

      { x: 200,  y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 400,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 800,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1000, y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1200, y: 375, w: 90,  h: 24, type: "zwevend" },
      { x: 1820, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2020, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2220, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2550, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2750, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2950, y: 375, w: 90,  h: 24, type: "zwevend" },
      { x: 3570, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3770, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3970, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 4170, y: 300, w: 120, h: 24, type: "zwevend" },

      /* Bewegende platforms over de twee grote gaten */
      { type: "bewegend", as: "x", min: 1340, max: 1600, y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 3090, max: 3350, y: 405, w: 110, duur: 4 }
    ],

    bollen: [
      { x: 265,  y: 335 }, { x: 465,  y: 260 }, { x: 660,  y: 420 },
      { x: 870,  y: 340 }, { x: 1070, y: 265 }, { x: 1470, y: 350 },
      { x: 1890, y: 340 }, { x: 2090, y: 260 }, { x: 2410, y: 420 },
      { x: 2620, y: 340 }, { x: 2820, y: 260 }, { x: 3220, y: 355 },
      { x: 3640, y: 340 }, { x: 3840, y: 260 }, { x: 4030, y: 335 },
      { x: 4230, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 870,  y: 370 },
      { x: 1890, y: 370 },
      { x: 2090, y: 290 },
      { x: 2620, y: 370 },
      { x: 2820, y: 290 },
      { x: 3640, y: 370 },
      { x: 4450, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4530, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 56 },
      { x: 2280, y: 456, w: 56 },
      { x: 2980, y: 456, w: 48 },
      { x: 4300, y: 456, w: 48 }
    ],

    zoeklichten: [
      { cx: 1060, bereik: 260, duur: 5.5 },
      { cx: 4150, bereik: 280, duur: 5, fase: 2 }
    ],

    vijanden: [
      { type: "kluisbot", x: 250,  minX: 200,  maxX: 450 },
      { type: "spiedoog", x: 660,  basisY: 330, amplitude: 60 },
      { type: "kluisbot", x: 900,  minX: 820,  maxX: 1250 },
      { type: "spiedoog", x: 1470, basisY: 320, amplitude: 70 },
      { type: "kluisbot", x: 1900, minX: 1820, maxX: 2200 },
      { type: "spiedoog", x: 2410, basisY: 320, amplitude: 70 },
      { type: "kluisbot", x: 2700, minX: 2560, maxX: 2950 },
      { type: "spiedoog", x: 3220, basisY: 330, amplitude: 70 },
      { type: "kluisbot", x: 3900, minX: 3700, maxX: 4200 }
    ],

    checkpoints: [
      { x: 1800 },
      { x: 3560 }
    ],

    finish: { x: 4620 }
  },

  /* ================================================================
     LEVEL 3 — Codekelder
     Diep onder de grond: twee afbrokkelbruggen, een stekelbol
     en zoeklichten tussen de pilaren.
     ================================================================ */
  {
    naam: "Codekelder",
    breedte: 4900,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#2f4547",
      luchtOnder:    "#6d938f",
      zon:           "#a3e8c8",
      wolk:          "#41605d",
      heuvelVer:     "#283b39",
      heuvelDichtbij:"#1f302e",
      grondGras:     "#52a08a",
      grondAarde:    "#29403c",
      grondAardeRand:"#1d2f2c",
      platformTop:   "#52a08a",
      platformHout:  "#39564f"
    },

    platforms: [
      { x: 0,    y: 480, w: 550, h: 60, type: "grond" },
      { x: 670,  y: 480, w: 580, h: 60, type: "grond" },
      { x: 1670, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2420, y: 480, w: 580, h: 60, type: "grond" },
      { x: 3420, y: 480, w: 1480, h: 60, type: "grond" },

      { x: 180,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 380,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 750,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 950,  y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1750, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1950, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2150, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2500, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2700, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3500, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3700, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3900, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 4100, y: 300, w: 120, h: 24, type: "zwevend" },
      { x: 4300, y: 375, w: 110, h: 24, type: "zwevend" },

      /* Afbrokkelbruggen over de twee grote gaten */
      { type: "brokkel", x: 1280, y: 410, w: 90 },
      { type: "brokkel", x: 1430, y: 380, w: 90 },
      { type: "brokkel", x: 1580, y: 410, w: 90 },
      { type: "brokkel", x: 3030, y: 410, w: 90 },
      { type: "brokkel", x: 3180, y: 380, w: 90 },
      { type: "brokkel", x: 3330, y: 410, w: 90 }
    ],

    bollen: [
      { x: 245,  y: 340 }, { x: 445,  y: 260 }, { x: 610,  y: 420 },
      { x: 820,  y: 340 }, { x: 1020, y: 265 }, { x: 1325, y: 370 },
      { x: 1475, y: 340 }, { x: 1625, y: 370 }, { x: 1820, y: 340 },
      { x: 2020, y: 260 }, { x: 2360, y: 420 }, { x: 2570, y: 340 },
      { x: 2770, y: 260 }, { x: 3075, y: 370 }, { x: 3375, y: 370 },
      { x: 3770, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 820,  y: 370 },
      { x: 1820, y: 370 },
      { x: 2020, y: 290 },
      { x: 2570, y: 370 },
      { x: 2770, y: 290 },
      { x: 3770, y: 290 },
      { x: 4600, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4680, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 450,  y: 456, w: 56 },
      { x: 2230, y: 456, w: 56 },
      { x: 2900, y: 456, w: 48 },
      { x: 4000, y: 456, w: 56 },
      { x: 4450, y: 456, w: 48 }
    ],

    zoeklichten: [
      { cx: 2100, bereik: 220, duur: 5.5 },
      { cx: 4250, bereik: 300, duur: 5, fase: 1.5 }
    ],

    vijanden: [
      { type: "kluisbot",  x: 230,  minX: 180,  maxX: 430 },
      { type: "spiedoog",  x: 610,  basisY: 330, amplitude: 60 },
      { type: "kluisbot",  x: 850,  minX: 700,  maxX: 1200 },
      { type: "spiedoog",  x: 1450, basisY: 320, amplitude: 70 },
      { type: "kluisbot",  x: 1850, minX: 1750, maxX: 2100 },
      { type: "spiedoog",  x: 2360, basisY: 320, amplitude: 60 },
      { type: "stekelbol", cx: 2760, cy: 463, as: "x", bereik: 180, duur: 6 },
      { type: "spiedoog",  x: 3210, basisY: 320, amplitude: 60 },
      { type: "kluisbot",  x: 4300, minX: 4150, maxX: 4420 }
    ],

    checkpoints: [
      { x: 1750 },
      { x: 3500 }
    ],

    finish: { x: 4800 }
  },

  /* ================================================================
     LEVEL 4 — Wachtwoordgewelf
     Liften omhoog, een dubbele mover-oversteek en een zwevende
     stekelbol boven de afbrokkelbrug.
     ================================================================ */
  {
    naam: "Wachtwoordgewelf",
    breedte: 5100,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#38284f",
      luchtOnder:    "#7a5f9e",
      zon:           "#d8b56a",
      wolk:          "#4d3a6b",
      heuvelVer:     "#2e2244",
      heuvelDichtbij:"#251b38",
      grondGras:     "#9a7fd4",
      grondAarde:    "#2e2344",
      grondAardeRand:"#211933",
      platformTop:   "#9a7fd4",
      platformHout:  "#3f3159"
    },

    platforms: [
      { x: 0,    y: 480, w: 500, h: 60, type: "grond" },
      { x: 950,  y: 480, w: 550, h: 60, type: "grond" },
      { x: 1620, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2800, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3520, y: 480, w: 580, h: 60, type: "grond" },
      { x: 4520, y: 480, w: 580, h: 60, type: "grond" },

      { x: 150,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 330,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1250, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2100, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2850, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3100, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 3560, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3760, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3960, y: 375, w: 100, h: 24, type: "zwevend" },
      { x: 4570, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4770, y: 300, w: 130, h: 24, type: "zwevend" },

      /* Bewegende platforms (waaronder twee liften omhoog) */
      { type: "bewegend", as: "x", min: 540,  max: 800,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "y", x: 1150, min: 250, max: 400, w: 100, duur: 5 },
      { type: "bewegend", as: "x", min: 2290, max: 2470, y: 420, w: 100, duur: 3.5 },
      { type: "bewegend", as: "x", min: 2530, max: 2690, y: 350, w: 100, duur: 3.5, fase: 3.14 },
      { type: "bewegend", as: "y", x: 3000, min: 250, max: 400, w: 100, duur: 5 },

      /* Afbrokkelbrug over het laatste gat */
      { type: "brokkel", x: 4130, y: 410, w: 85 },
      { type: "brokkel", x: 4260, y: 380, w: 85 },
      { type: "brokkel", x: 4390, y: 410, w: 85 }
    ],

    bollen: [
      { x: 210,  y: 340 }, { x: 460,  y: 260 }, { x: 715,  y: 360 },
      { x: 1060, y: 340 }, { x: 1200, y: 215 }, { x: 1310, y: 260 },
      { x: 1760, y: 340 }, { x: 1960, y: 260 }, { x: 2340, y: 380 },
      { x: 2580, y: 310 }, { x: 3050, y: 215 }, { x: 3160, y: 260 },
      { x: 3820, y: 260 }, { x: 4280, y: 340 }, { x: 4630, y: 340 },
      { x: 4830, y: 260 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 1060, y: 370 },
      { x: 1760, y: 370 },
      { x: 1960, y: 290 },
      { x: 2910, y: 370 },
      { x: 3160, y: 290 },
      { x: 3820, y: 290 },
      { x: 4700, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4780, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 56 },
      { x: 2180, y: 456, w: 56 },
      { x: 3300, y: 456, w: 48 },
      { x: 3650, y: 456, w: 48 }
    ],

    zoeklichten: [
      { cx: 2000, bereik: 240, duur: 5 },
      { cx: 4600, bereik: 160, duur: 4.5, fase: 1 }
    ],

    vijanden: [
      { type: "spiedoog",  x: 725,  basisY: 330, amplitude: 80 },
      { type: "kluisbot",  x: 1080, minX: 1010, maxX: 1400 },
      { type: "spiedoog",  x: 1560, basisY: 340, amplitude: 60 },
      { type: "kluisbot",  x: 1750, minX: 1690, maxX: 1930 },
      { type: "spiedoog",  x: 2430, basisY: 300, amplitude: 70 },
      { type: "kluisbot",  x: 2950, minX: 2870, maxX: 3250 },
      { type: "spiedoog",  x: 3450, basisY: 340, amplitude: 60 },
      { type: "stekelbol", cx: 4270, cy: 350, as: "y", bereik: 160, duur: 4 },
      { type: "kluisbot",  x: 4900, minX: 4850, maxX: 5050 }
    ],

    checkpoints: [
      { x: 1700 },
      { x: 3580 }
    ],

    finish: { x: 4950 }
  },

  /* ================================================================
     LEVEL 5 — Alarmzaal
     Drie zoeklichten, twee stekelbollen en alle oversteek-trucs
     door elkaar. Timing is alles!
     ================================================================ */
  {
    naam: "Alarmzaal",
    breedte: 5300,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#402531",
      luchtOnder:    "#8a5560",
      zon:           "#ff9f6a",
      wolk:          "#5c3644",
      heuvelVer:     "#33202b",
      heuvelDichtbij:"#281922",
      grondGras:     "#d99a4a",
      grondAarde:    "#33202b",
      grondAardeRand:"#241620",
      platformTop:   "#d99a4a",
      platformHout:  "#4a2f3c"
    },

    platforms: [
      { x: 0,    y: 480, w: 500, h: 60, type: "grond" },
      { x: 950,  y: 480, w: 530, h: 60, type: "grond" },
      { x: 1600, y: 480, w: 600, h: 60, type: "grond" },
      { x: 2750, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3470, y: 480, w: 530, h: 60, type: "grond" },
      { x: 4420, y: 480, w: 880, h: 60, type: "grond" },

      { x: 130,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 310,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1200, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1650, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1850, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2050, y: 375, w: 100, h: 24, type: "zwevend" },
      { x: 2800, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3000, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 3200, y: 375, w: 100, h: 24, type: "zwevend" },
      { x: 3520, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3720, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4470, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4670, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4870, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 5070, y: 300, w: 110, h: 24, type: "zwevend" },

      /* Bewegende platforms */
      { type: "bewegend", as: "x", min: 540,  max: 800,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 2240, max: 2420, y: 420, w: 100, duur: 3.5 },
      { type: "bewegend", as: "x", min: 2480, max: 2640, y: 350, w: 100, duur: 3.5, fase: 3.14 },

      /* Afbrokkelbrug */
      { type: "brokkel", x: 4030, y: 410, w: 85 },
      { type: "brokkel", x: 4160, y: 380, w: 85 },
      { type: "brokkel", x: 4290, y: 410, w: 85 }
    ],

    bollen: [
      { x: 190,  y: 340 }, { x: 440,  y: 260 }, { x: 725,  y: 360 },
      { x: 1060, y: 340 }, { x: 1260, y: 260 }, { x: 1450, y: 335 },
      { x: 1710, y: 340 }, { x: 1910, y: 260 }, { x: 2290, y: 380 },
      { x: 2530, y: 310 }, { x: 2860, y: 340 }, { x: 3060, y: 260 },
      { x: 3780, y: 260 }, { x: 4200, y: 340 }, { x: 4730, y: 260 },
      { x: 4930, y: 335 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 1060, y: 370 },
      { x: 1710, y: 370 },
      { x: 1910, y: 290 },
      { x: 2860, y: 370 },
      { x: 3060, y: 290 },
      { x: 3780, y: 290 },
      { x: 5050, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5130, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 48 },
      { x: 2100, y: 456, w: 48 },
      { x: 3280, y: 456, w: 48 },
      { x: 3600, y: 456, w: 48 },
      { x: 4550, y: 456, w: 56 }
    ],

    zoeklichten: [
      { cx: 1240, bereik: 280, duur: 5 },
      { cx: 1950, bereik: 200, duur: 4.5, fase: 2 },
      { cx: 4750, bereik: 320, duur: 5.5, fase: 1 }
    ],

    vijanden: [
      { type: "spiedoog",  x: 725,  basisY: 330, amplitude: 80 },
      { type: "kluisbot",  x: 1050, minX: 970,  maxX: 1330 },
      { type: "spiedoog",  x: 1540, basisY: 340, amplitude: 60 },
      { type: "kluisbot",  x: 1800, minX: 1620, maxX: 2020 },
      { type: "spiedoog",  x: 2330, basisY: 300, amplitude: 70 },
      { type: "kluisbot",  x: 2900, minX: 2770, maxX: 3020 },
      { type: "stekelbol", cx: 3100, cy: 463, as: "x", bereik: 140, duur: 6 },
      { type: "spiedoog",  x: 3410, basisY: 340, amplitude: 60 },
      { type: "stekelbol", cx: 4210, cy: 345, as: "y", bereik: 150, duur: 4 },
      { type: "kluisbot",  x: 4700, minX: 4620, maxX: 4950 }
    ],

    checkpoints: [
      { x: 1650 },
      { x: 3520 }
    ],

    finish: { x: 5230 }
  },

  /* ================================================================
     LEVEL 6 — De Grote Kluis
     De donkerste kluis met gouden accenten: drie zoeklichten,
     drie stekelbollen en alles wat je onderweg leerde. Alleen
     voor echte kluiswachters!
     ================================================================ */
  {
    naam: "De Grote Kluis",
    breedte: 5800,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#1a1a2e",
      luchtOnder:    "#3d3453",
      zon:           "#f2c14e",
      wolk:          "#2a2a44",
      heuvelVer:     "#22223a",
      heuvelDichtbij:"#1a1a30",
      grondGras:     "#f2c14e",
      grondAarde:    "#23233a",
      grondAardeRand:"#17172a",
      platformTop:   "#f2c14e",
      platformHout:  "#37374f"
    },

    platforms: [
      { x: 0,    y: 480, w: 450, h: 60, type: "grond" },
      { x: 900,  y: 480, w: 500, h: 60, type: "grond" },
      { x: 1900, y: 480, w: 550, h: 60, type: "grond" },
      { x: 3000, y: 480, w: 550, h: 60, type: "grond" },
      { x: 3700, y: 480, w: 550, h: 60, type: "grond" },
      { x: 4800, y: 480, w: 1000, h: 60, type: "grond" },

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

      /* Bewegende platforms */
      { type: "bewegend", as: "x", min: 490,  max: 750,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 2490, max: 2670, y: 420, w: 100, duur: 3 },
      { type: "bewegend", as: "x", min: 2730, max: 2890, y: 340, w: 100, duur: 3, fase: 3.14 },
      { type: "bewegend", as: "x", min: 4400, max: 4640, y: 380, w: 100, duur: 3.5 },

      /* Afbrokkelbrug + losse brokkelstap */
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

    zoeklichten: [
      { cx: 1100, bereik: 240, duur: 5 },
      { cx: 3250, bereik: 260, duur: 4.5, fase: 1.5 },
      { cx: 5050, bereik: 280, duur: 5, fase: 2.5 }
    ],

    vijanden: [
      { type: "spiedoog",  x: 675,  basisY: 320, amplitude: 80 },
      { type: "kluisbot",  x: 960,  minX: 920,  maxX: 1190 },
      { type: "spiedoog",  x: 1600, basisY: 320, amplitude: 70 },
      { type: "kluisbot",  x: 2000, minX: 1950, maxX: 2330 },
      { type: "spiedoog",  x: 2600, basisY: 270, amplitude: 60 },
      { type: "stekelbol", cx: 2700, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "kluisbot",  x: 3060, minX: 3010, maxX: 3400 },
      { type: "spiedoog",  x: 3620, basisY: 330, amplitude: 60 },
      { type: "stekelbol", cx: 3950, cy: 463, as: "x", bereik: 240, duur: 5 },
      { type: "spiedoog",  x: 4520, basisY: 300, amplitude: 60 },
      { type: "kluisbot",  x: 4850, minX: 4820, maxX: 5150 },
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
