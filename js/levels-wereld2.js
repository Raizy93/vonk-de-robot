/* ============================================================
   LEVELS WERELD 2 — "Wachtwoordwerkplaats"
   (leerdoel: zwakke wachtwoorden verbeteren).

   Vanaf deze wereld heeft de speler de ZAP-BLASTER: richten met
   de muis, klikken om te schieten. Daarom zitten er meer vijanden in de levels
   (rollende tandwielen en schroefdrones, passend bij de Werkplaats) — die kun je nu ook op afstand
   verslaan. Stekelbollen zijn gepantserd: zappen helpt niet!
   Na elke finish volgt hier bovendien de WACHTWOORD-BOUWER.

   De opbouw per level is hetzelfde als in levels.js (zie de
   uitleg bovenaan dat bestand).
   ============================================================ */

const WERELD2_LEVELS = [

  /* ================================================================
     LEVEL 1 — Sleutelsmederij
     Rustig wennen aan de blaster: veel tandwielen en drones, geen nieuwe
     obstakels. Fris ochtendthema.
     ================================================================ */
  {
    naam: "Sleutelsmederij",
    breedte: 4200,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#7ec4f5",
      luchtOnder:    "#fff3d6",
      zon:           "#ffe27a",
      wolk:          "#ffffff",
      heuvelVer:     "#b5dba4",
      heuvelDichtbij:"#86c477",
      grondGras:     "#66bd66",
      grondAarde:    "#a87344",
      grondAardeRand:"#835a33",
      platformTop:   "#66bd66",
      platformHout:  "#b07a48"
    },

    platforms: [
      { x: 0,    y: 480, w: 850, h: 60, type: "grond" },
      { x: 970,  y: 480, w: 680, h: 60, type: "grond" },
      { x: 1770, y: 480, w: 730, h: 60, type: "grond" },
      { x: 2620, y: 480, w: 730, h: 60, type: "grond" },
      { x: 3470, y: 480, w: 730, h: 60, type: "grond" },

      { x: 280,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 500,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 720,  y: 365, w: 120, h: 24, type: "zwevend" },
      { x: 1050, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 1270, y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1500, y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 1850, y: 395, w: 130, h: 24, type: "zwevend" },
      { x: 2030, y: 325, w: 130, h: 24, type: "zwevend" },
      { x: 2210, y: 255, w: 140, h: 24, type: "zwevend" },
      { x: 2400, y: 350, w: 120, h: 24, type: "zwevend" },
      { x: 2700, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3100, y: 370, w: 140, h: 24, type: "zwevend" },
      { x: 3560, y: 380, w: 130, h: 24, type: "zwevend" }
    ],

    bollen: [
      { x: 350,  y: 335 }, { x: 570,  y: 260 }, { x: 780,  y: 325 },
      { x: 910,  y: 410 }, { x: 1125, y: 340 }, { x: 1340, y: 265 },
      { x: 1565, y: 330 }, { x: 1710, y: 420 }, { x: 1915, y: 355 },
      { x: 2095, y: 285 }, { x: 2280, y: 215 }, { x: 2560, y: 410 },
      { x: 2770, y: 340 }, { x: 2970, y: 260 }, { x: 3410, y: 410 },
      { x: 3625, y: 340 }
    ],

    vraagobjecten: [
      { x: 400,  y: 470 },
      { x: 1125, y: 370 },
      { x: 1565, y: 360 },
      { x: 1950, y: 470 },
      { x: 2095, y: 315 },
      { x: 2970, y: 290 },
      { x: 3170, y: 360 },
      { x: 3700, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 3790, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 600,  y: 456, w: 64 },
      { x: 2430, y: 456, w: 48 },
      { x: 3280, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "tandwiel",  x: 300,  minX: 250,  maxX: 560 },
      { type: "schroefdrone", x: 910,  basisY: 330, amplitude: 60 },
      { type: "tandwiel",  x: 1200, minX: 1050, maxX: 1500 },
      { type: "schroefdrone", x: 1710, basisY: 340, amplitude: 60 },
      { type: "tandwiel",  x: 1900, minX: 1820, maxX: 2150 },
      { type: "schroefdrone", x: 2560, basisY: 330, amplitude: 70 },
      { type: "tandwiel",  x: 2800, minX: 2680, maxX: 3100 },
      { type: "schroefdrone", x: 3410, basisY: 330, amplitude: 60 },
      { type: "tandwiel",  x: 3560, minX: 3480, maxX: 3740 }
    ],

    checkpoints: [
      { x: 1400 },
      { x: 2900 }
    ],

    finish: { x: 3960 }
  },

  /* ================================================================
     LEVEL 2 — Schroevenlaan
     Twee grote gaten met bewegende platforms en nog meer schroefdrones.
     ================================================================ */
  {
    naam: "Schroevenlaan",
    breedte: 4600,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#6db8e8",
      luchtOnder:    "#dff3ea",
      zon:           "#fff3a8",
      wolk:          "#f0fbff",
      heuvelVer:     "#8fc9b8",
      heuvelDichtbij:"#65a893",
      grondGras:     "#4fae7d",
      grondAarde:    "#8f6a48",
      grondAardeRand:"#6e5136",
      platformTop:   "#4fae7d",
      platformHout:  "#9c7550"
    },

    platforms: [
      { x: 0,    y: 480, w: 650, h: 60, type: "grond" },
      { x: 770,  y: 480, w: 580, h: 60, type: "grond" },
      { x: 1780, y: 480, w: 620, h: 60, type: "grond" },
      { x: 2520, y: 480, w: 630, h: 60, type: "grond" },
      { x: 3580, y: 480, w: 1020, h: 60, type: "grond" },

      { x: 220,  y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 430,  y: 295, w: 130, h: 24, type: "zwevend" },
      { x: 850,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1060, y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1250, y: 380, w: 90,  h: 24, type: "zwevend" },
      { x: 1860, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2060, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2250, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 2600, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2800, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3000, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3680, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3880, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4080, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 4280, y: 300, w: 120, h: 24, type: "zwevend" },

      /* Bewegende platforms over de twee grote gaten */
      { type: "bewegend", as: "x", min: 1390, max: 1650, y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 3190, max: 3440, y: 405, w: 110, duur: 4 }
    ],

    bollen: [
      { x: 285,  y: 335 }, { x: 495,  y: 255 }, { x: 710,  y: 420 },
      { x: 920,  y: 340 }, { x: 1130, y: 265 }, { x: 1520, y: 350 },
      { x: 1930, y: 340 }, { x: 2130, y: 260 }, { x: 2460, y: 420 },
      { x: 2670, y: 340 }, { x: 2870, y: 260 }, { x: 3310, y: 355 },
      { x: 3750, y: 340 }, { x: 3950, y: 260 }, { x: 4150, y: 335 },
      { x: 4340, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 920,  y: 370 },
      { x: 1930, y: 370 },
      { x: 2130, y: 290 },
      { x: 2670, y: 370 },
      { x: 2870, y: 290 },
      { x: 3750, y: 370 },
      { x: 4380, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4460, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 550,  y: 456, w: 56 },
      { x: 2300, y: 456, w: 56 },
      { x: 3050, y: 456, w: 56 },
      { x: 4200, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "tandwiel",  x: 250,  minX: 200,  maxX: 500 },
      { type: "schroefdrone", x: 710,  basisY: 330, amplitude: 60 },
      { type: "tandwiel",  x: 900,  minX: 820,  maxX: 1250 },
      { type: "schroefdrone", x: 1520, basisY: 320, amplitude: 70 },
      { type: "tandwiel",  x: 1900, minX: 1820, maxX: 2250 },
      { type: "schroefdrone", x: 2460, basisY: 320, amplitude: 70 },
      { type: "tandwiel",  x: 2700, minX: 2560, maxX: 3000 },
      { type: "schroefdrone", x: 3310, basisY: 330, amplitude: 70 },
      { type: "tandwiel",  x: 3800, minX: 3620, maxX: 4150 },
      { type: "schroefdrone", x: 4260, basisY: 320, amplitude: 60 }
    ],

    checkpoints: [
      { x: 1850 },
      { x: 3650 }
    ],

    finish: { x: 4550 }
  },

  /* ================================================================
     LEVEL 3 — Boutenmoeras
     Afbrokkelbrug, een gepantserde stekelbol en gifgroene mist.
     ================================================================ */
  {
    naam: "Boutenmoeras",
    breedte: 4800,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#5e7d5a",
      luchtOnder:    "#c9d8a8",
      zon:           "#e8f2a0",
      wolk:          "#a8b88f",
      heuvelVer:     "#4c6648",
      heuvelDichtbij:"#3d5439",
      grondGras:     "#7ba83f",
      grondAarde:    "#5c5a3a",
      grondAardeRand:"#46442c",
      platformTop:   "#7ba83f",
      platformHout:  "#6b6844"
    },

    platforms: [
      { x: 0,    y: 480, w: 600, h: 60, type: "grond" },
      { x: 720,  y: 480, w: 580, h: 60, type: "grond" },
      { x: 1720, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2470, y: 480, w: 630, h: 60, type: "grond" },
      { x: 3520, y: 480, w: 1280, h: 60, type: "grond" },

      { x: 200,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 400,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 880,  y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1080, y: 305, w: 140, h: 24, type: "zwevend" },
      { x: 1800, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 2000, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2190, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2550, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2750, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2950, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 3620, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3820, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4020, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 4220, y: 300, w: 120, h: 24, type: "zwevend" },

      /* Afbrokkelbrug over het tweede gat */
      { type: "brokkel", x: 1330, y: 410, w: 90 },
      { type: "brokkel", x: 1480, y: 380, w: 90 },
      { type: "brokkel", x: 1620, y: 410, w: 90 },

      /* Bewegend platform over het laatste gat */
      { type: "bewegend", as: "x", min: 3140, max: 3390, y: 400, w: 110, duur: 4 }
    ],

    bollen: [
      { x: 265,  y: 340 }, { x: 465,  y: 260 }, { x: 660,  y: 420 },
      { x: 950,  y: 340 }, { x: 1150, y: 265 }, { x: 1375, y: 370 },
      { x: 1525, y: 340 }, { x: 1665, y: 370 }, { x: 1870, y: 340 },
      { x: 2070, y: 260 }, { x: 2410, y: 420 }, { x: 2620, y: 340 },
      { x: 2820, y: 260 }, { x: 3260, y: 350 }, { x: 3890, y: 260 },
      { x: 4280, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 950,  y: 370 },
      { x: 1870, y: 370 },
      { x: 2070, y: 290 },
      { x: 2620, y: 370 },
      { x: 2820, y: 290 },
      { x: 3890, y: 290 },
      { x: 4450, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4530, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 56 },
      { x: 2250, y: 456, w: 56 },
      { x: 3000, y: 456, w: 56 },
      { x: 3700, y: 456, w: 48 },
      { x: 4350, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "tandwiel",     x: 250,  minX: 200,  maxX: 460 },
      { type: "schroefdrone",    x: 660,  basisY: 330, amplitude: 60 },
      { type: "tandwiel",     x: 850,  minX: 740,  maxX: 1250 },
      { type: "schroefdrone",    x: 1500, basisY: 320, amplitude: 70 },
      { type: "tandwiel",     x: 1850, minX: 1740, maxX: 2150 },
      { type: "schroefdrone",    x: 2410, basisY: 320, amplitude: 60 },
      { type: "stekelbol", cx: 2750, cy: 463, as: "x", bereik: 220, duur: 6 },
      { type: "schroefdrone",    x: 3260, basisY: 330, amplitude: 70 },
      { type: "tandwiel",     x: 3900, minX: 3780, maxX: 4150 },
      { type: "schroefdrone",    x: 4300, basisY: 310, amplitude: 60 }
    ],

    checkpoints: [
      { x: 1780 },
      { x: 3560 }
    ],

    finish: { x: 4680 }
  },

  /* ================================================================
     LEVEL 4 — Vijlenfjord
     IJskoud: verticale lift, dubbele mover-oversteek, brokkelbrug
     en twee stekelbollen.
     ================================================================ */
  {
    naam: "Vijlenfjord",
    breedte: 5000,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#7fa8d9",
      luchtOnder:    "#e8f4ff",
      zon:           "#f5fbff",
      wolk:          "#dfeefa",
      heuvelVer:     "#a8c4e0",
      heuvelDichtbij:"#7f9fc4",
      grondGras:     "#9fd8e8",
      grondAarde:    "#5f7590",
      grondAardeRand:"#48586e",
      platformTop:   "#9fd8e8",
      platformHout:  "#6f87a3"
    },

    platforms: [
      { x: 0,    y: 480, w: 550, h: 60, type: "grond" },
      { x: 1000, y: 480, w: 550, h: 60, type: "grond" },
      { x: 1670, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2850, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3570, y: 480, w: 560, h: 60, type: "grond" },
      { x: 4550, y: 480, w: 450, h: 60, type: "grond" },

      { x: 150,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 330,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1050, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1250, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1440, y: 375, w: 100, h: 24, type: "zwevend" },
      { x: 1750, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1950, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2140, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2900, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3100, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 3290, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 3650, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3850, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4620, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4800, y: 300, w: 130, h: 24, type: "zwevend" },

      /* Bewegende platforms */
      { type: "bewegend", as: "x", min: 590,  max: 850,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "y", x: 1150, min: 250, max: 400, w: 100, duur: 5 },
      { type: "bewegend", as: "x", min: 2340, max: 2520, y: 420, w: 100, duur: 3.5 },
      { type: "bewegend", as: "x", min: 2580, max: 2740, y: 350, w: 100, duur: 3.5, fase: 3.14 },

      /* Afbrokkelbrug over het laatste gat */
      { type: "brokkel", x: 4160, y: 410, w: 85 },
      { type: "brokkel", x: 4290, y: 380, w: 85 },
      { type: "brokkel", x: 4420, y: 410, w: 85 }
    ],

    bollen: [
      { x: 215,  y: 340 }, { x: 460,  y: 260 }, { x: 715,  y: 360 },
      { x: 1110, y: 340 }, { x: 1200, y: 215 }, { x: 1310, y: 260 },
      { x: 1810, y: 340 }, { x: 2010, y: 260 }, { x: 2390, y: 380 },
      { x: 2630, y: 310 }, { x: 2960, y: 340 }, { x: 3160, y: 260 },
      { x: 3910, y: 260 }, { x: 4330, y: 340 }, { x: 4680, y: 340 },
      { x: 4860, y: 260 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 1110, y: 370 },
      { x: 1810, y: 370 },
      { x: 2010, y: 290 },
      { x: 2960, y: 370 },
      { x: 3160, y: 290 },
      { x: 3910, y: 290 },
      { x: 4700, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4780, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 450,  y: 456, w: 56 },
      { x: 2200, y: 456, w: 56 },
      { x: 3350, y: 456, w: 56 },
      { x: 3700, y: 456, w: 48 }
    ],

    vijanden: [
      { type: "schroefdrone",    x: 775,  basisY: 330, amplitude: 80 },
      { type: "tandwiel",     x: 1080, minX: 1010, maxX: 1400 },
      { type: "schroefdrone",    x: 1610, basisY: 340, amplitude: 60 },
      { type: "tandwiel",     x: 1750, minX: 1690, maxX: 1930 },
      { type: "stekelbol", cx: 2050, cy: 463, as: "x", bereik: 200, duur: 6 },
      { type: "schroefdrone",    x: 2430, basisY: 300, amplitude: 70 },
      { type: "tandwiel",     x: 2950, minX: 2870, maxX: 3250 },
      { type: "schroefdrone",    x: 3510, basisY: 340, amplitude: 60 },
      { type: "stekelbol", cx: 4290, cy: 350, as: "y", bereik: 160, duur: 4 },
      { type: "tandwiel",     x: 4650, minX: 4570, maxX: 4900 }
    ],

    checkpoints: [
      { x: 1720 },
      { x: 3620 }
    ],

    finish: { x: 4920 }
  },

  /* ================================================================
     LEVEL 5 — Vonkendelta
     Zonsondergang boven de delta: alles door elkaar en flink
     wat vijanden om te zappen.
     ================================================================ */
  {
    naam: "Vonkendelta",
    breedte: 5200,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#d97b4f",
      luchtOnder:    "#ffd9a0",
      zon:           "#ffb85c",
      wolk:          "#f5c9a8",
      heuvelVer:     "#a85f48",
      heuvelDichtbij:"#8a4a38",
      grondGras:     "#d4a244",
      grondAarde:    "#7a4a35",
      grondAardeRand:"#5c3626",
      platformTop:   "#d4a244",
      platformHout:  "#8a5a3e"
    },

    platforms: [
      { x: 0,    y: 480, w: 500, h: 60, type: "grond" },
      { x: 950,  y: 480, w: 550, h: 60, type: "grond" },
      { x: 1620, y: 480, w: 630, h: 60, type: "grond" },
      { x: 2800, y: 480, w: 600, h: 60, type: "grond" },
      { x: 3520, y: 480, w: 530, h: 60, type: "grond" },
      { x: 4470, y: 480, w: 730, h: 60, type: "grond" },

      { x: 130,  y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 310,  y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1200, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 1390, y: 375, w: 100, h: 24, type: "zwevend" },
      { x: 1700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 1900, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2090, y: 375, w: 110, h: 24, type: "zwevend" },
      { x: 2900, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3200, y: 300, w: 130, h: 24, type: "zwevend" },
      { x: 3600, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 3800, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4550, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4750, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 4950, y: 375, w: 120, h: 24, type: "zwevend" },

      /* Bewegende platforms */
      { type: "bewegend", as: "x", min: 540,  max: 800,  y: 400, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 2290, max: 2470, y: 420, w: 100, duur: 3.5 },
      { type: "bewegend", as: "x", min: 2530, max: 2690, y: 350, w: 100, duur: 3.5, fase: 3.14 },
      { type: "bewegend", as: "y", x: 3050, min: 250, max: 400, w: 100, duur: 5 },

      /* Afbrokkelbrug */
      { type: "brokkel", x: 4080, y: 410, w: 85 },
      { type: "brokkel", x: 4210, y: 380, w: 85 },
      { type: "brokkel", x: 4340, y: 410, w: 85 }
    ],

    bollen: [
      { x: 195,  y: 340 }, { x: 440,  y: 260 }, { x: 725,  y: 360 },
      { x: 1060, y: 340 }, { x: 1260, y: 260 }, { x: 1450, y: 335 },
      { x: 1760, y: 340 }, { x: 1960, y: 260 }, { x: 2340, y: 380 },
      { x: 2580, y: 310 }, { x: 3100, y: 215 }, { x: 3260, y: 260 },
      { x: 3860, y: 260 }, { x: 4250, y: 340 }, { x: 4810, y: 260 },
      { x: 5010, y: 335 }
    ],

    vraagobjecten: [
      { x: 250,  y: 470 },
      { x: 1060, y: 370 },
      { x: 1760, y: 370 },
      { x: 1960, y: 290 },
      { x: 2910, y: 370 },
      { x: 3260, y: 290 },
      { x: 3860, y: 290 },
      { x: 5050, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5090, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 56 },
      { x: 2180, y: 456, w: 56 },
      { x: 3340, y: 456, w: 48 },
      { x: 3650, y: 456, w: 48 },
      { x: 4600, y: 456, w: 56 }
    ],

    vijanden: [
      { type: "schroefdrone",    x: 725,  basisY: 330, amplitude: 80 },
      { type: "tandwiel",     x: 1050, minX: 970,  maxX: 1330 },
      { type: "schroefdrone",    x: 1560, basisY: 340, amplitude: 60 },
      { type: "tandwiel",     x: 1800, minX: 1640, maxX: 1950 },
      { type: "stekelbol", cx: 2050, cy: 463, as: "x", bereik: 180, duur: 6 },
      { type: "schroefdrone",    x: 2380, basisY: 300, amplitude: 70 },
      { type: "tandwiel",     x: 2900, minX: 2820, maxX: 3200 },
      { type: "schroefdrone",    x: 3460, basisY: 330, amplitude: 60 },
      { type: "stekelbol", cx: 4245, cy: 345, as: "y", bereik: 150, duur: 4 },
      { type: "tandwiel",     x: 3850, minX: 3710, maxX: 4000 },
      { type: "tandwiel",     x: 4700, minX: 4660, maxX: 4950 },
      { type: "schroefdrone",    x: 4900, basisY: 310, amplitude: 60 }
    ],

    checkpoints: [
      { x: 1680 },
      { x: 3560 }
    ],

    finish: { x: 5160 }
  },

  /* ================================================================
     LEVEL 6 — Machinetoren
     De eindbaas-toren van de Werkplaats: donkerrood, dertien
     vijanden en drie gepantserde stekelbollen. Zap ze allemaal
     (behalve de stekelbollen — die ontwijk je)!
     ================================================================ */
  {
    naam: "Machinetoren",
    breedte: 5800,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#2b1530",
      luchtOnder:    "#6e2f3a",
      zon:           "#e85c5c",
      wolk:          "#4a2438",
      heuvelVer:     "#3d1f33",
      heuvelDichtbij:"#2e1826",
      grondGras:     "#d94f6b",
      grondAarde:    "#331a26",
      grondAardeRand:"#241019",
      platformTop:   "#d94f6b",
      platformHout:  "#472634"
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

    vijanden: [
      { type: "schroefdrone",    x: 675,  basisY: 320, amplitude: 80 },
      { type: "tandwiel",     x: 960,  minX: 920,  maxX: 1190 },
      { type: "schroefdrone",    x: 1600, basisY: 320, amplitude: 70 },
      { type: "tandwiel",     x: 2000, minX: 1950, maxX: 2330 },
      { type: "schroefdrone",    x: 2600, basisY: 270, amplitude: 60 },
      { type: "stekelbol", cx: 2700, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "tandwiel",     x: 3060, minX: 3010, maxX: 3400 },
      { type: "schroefdrone",    x: 3620, basisY: 330, amplitude: 60 },
      { type: "stekelbol", cx: 3950, cy: 463, as: "x", bereik: 240, duur: 5 },
      { type: "schroefdrone",    x: 4520, basisY: 300, amplitude: 60 },
      { type: "tandwiel",     x: 4850, minX: 4820, maxX: 5150 },
      { type: "stekelbol", cx: 5220, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "schroefdrone",    x: 5420, basisY: 320, amplitude: 60 }
    ],

    checkpoints: [
      { x: 1950 },
      { x: 3450 },
      { x: 4850 }
    ],

    finish: { x: 5700 }
  }
];
