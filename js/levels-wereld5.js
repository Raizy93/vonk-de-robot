/* ============================================================
   LEVELS WERELD 5 — "Accountstad"
   (leerdoel: je accounts extra beveiligen).

   Nieuw obstakel: de BEVEILIGINGSLASER — een verticale straal
   die aan/uit knippert. Loop erdoorheen als hij UIT is; raak je
   hem als hij AAN is, dan kost dat een hart. Er is eerst een
   korte rode waarschuwing zodat je kunt anticiperen.
     lasers: [{ x, y?, h?, aan?, uit?, fase? }]

   Eigen vijanden: bewakers (patrouillerende bewakingsrobots) en
   camdrones (zwevende bewakingscamera's). De blaster werkt hier
   gewoon; stekelbollen blijven gepantserd. Stadsthema met liften
   (verticale bewegende platforms) tussen de gebouwen.

   Finishvolgorde altijd: slotje → poort (muur) → finish.
   ============================================================ */

const WERELD5_LEVELS = [

  /* ================================================================
     LEVEL 1 — Poortplein
     Rustige kennismaking met bewakers, camdrones en één laser.
     ================================================================ */
  {
    naam: "Poortplein",
    breedte: 4300,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#6f9ad4",
      luchtOnder:    "#dbe7f5",
      zon:           "#fff3b0",
      wolk:          "#ffffff",
      heuvelVer:     "#9fb2cc",
      heuvelDichtbij:"#7f95b6",
      grondGras:     "#8a94b0",
      grondAarde:    "#5a6480",
      grondAardeRand:"#434a63",
      platformTop:   "#8a94b0",
      platformHout:  "#6a7290"
    },

    platforms: [
      { x: 0,    y: 480, w: 820,  h: 60, type: "grond" },
      { x: 940,  y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1680, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 2520, y: 480, w: 720,  h: 60, type: "grond" },
      { x: 3360, y: 480, w: 940,  h: 60, type: "grond" },

      { x: 260,  y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 480,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 700,  y: 370, w: 130, h: 24, type: "zwevend" },
      { x: 1000, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 1220, y: 305, w: 150, h: 24, type: "zwevend" },
      { x: 1440, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 1760, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1980, y: 305, w: 150, h: 24, type: "zwevend" },
      { x: 2200, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2600, y: 380, w: 150, h: 24, type: "zwevend" },
      { x: 2820, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3040, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3440, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3660, y: 305, w: 150, h: 24, type: "zwevend" },

      /* Stadslift (verticaal bewegend platform) */
      { type: "bewegend", as: "y", x: 2360, min: 300, max: 430, w: 100, duur: 4.5 }
    ],

    bollen: [
      { x: 335,  y: 335 }, { x: 550,  y: 260 }, { x: 765,  y: 330 },
      { x: 880,  y: 415 }, { x: 1075, y: 340 }, { x: 1295, y: 265 },
      { x: 1500, y: 335 }, { x: 1620, y: 415 }, { x: 1830, y: 340 },
      { x: 2055, y: 265 }, { x: 2265, y: 335 }, { x: 2670, y: 340 },
      { x: 2895, y: 260 }, { x: 3105, y: 335 }, { x: 3300, y: 415 },
      { x: 3730, y: 265 }
    ],

    vraagobjecten: [
      { x: 350,  y: 470 },
      { x: 1075, y: 370 },
      { x: 1295, y: 295 },
      { x: 1830, y: 470 },
      { x: 2055, y: 295 },
      { x: 2670, y: 370 },
      { x: 2895, y: 290 },
      { x: 3940, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4020, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 600,  y: 456, w: 56 },
      { x: 2280, y: 456, w: 48 },
      { x: 3160, y: 456, w: 48 }
    ],

    lasers: [
      { x: 2050, aan: 1.1, uit: 1.9 }
    ],

    vijanden: [
      { type: "bewaker",  x: 300,  minX: 250,  maxX: 560 },
      { type: "camdrone", x: 880,  basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 1200, minX: 1050, maxX: 1500 },
      { type: "camdrone", x: 1620, basisY: 340, amplitude: 60 },
      { type: "bewaker",  x: 1900, minX: 1820, maxX: 2150 },
      { type: "camdrone", x: 2670, basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 2900, minX: 2780, maxX: 3180 }
    ],

    checkpoints: [
      { x: 1720 },
      { x: 3400 }
    ],

    finish: { x: 4180 }
  },

  /* ================================================================
     LEVEL 2 — Wachtwachtlaan
     Meer lasers en een echte stadslift-oversteek.
     ================================================================ */
  {
    naam: "Wachtwachtlaan",
    breedte: 4700,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#5f86c4",
      luchtOnder:    "#e6edf7",
      zon:           "#fff0a0",
      wolk:          "#f4f8ff",
      heuvelVer:     "#93a8c8",
      heuvelDichtbij:"#748bad",
      grondGras:     "#7f8aa8",
      grondAarde:    "#525b74",
      grondAardeRand:"#3d4459",
      platformTop:   "#7f8aa8",
      platformHout:  "#626c88"
    },

    platforms: [
      { x: 0,    y: 480, w: 700,  h: 60, type: "grond" },
      { x: 820,  y: 480, w: 620,  h: 60, type: "grond" },
      { x: 1560, y: 480, w: 700,  h: 60, type: "grond" },
      { x: 2380, y: 480, w: 640,  h: 60, type: "grond" },
      { x: 3140, y: 480, w: 640,  h: 60, type: "grond" },
      { x: 3900, y: 480, w: 800,  h: 60, type: "grond" },

      { x: 230,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 450,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 880,  y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1100, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1320, y: 375, w: 120, h: 24, type: "zwevend" },
      { x: 1620, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1840, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2060, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2440, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2660, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2880, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 3200, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3420, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3960, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4180, y: 300, w: 150, h: 24, type: "zwevend" },

      /* Twee stadsliften */
      { type: "bewegend", as: "y", x: 1470, min: 300, max: 430, w: 100, duur: 4.5 },
      { type: "bewegend", as: "y", x: 3030, min: 300, max: 430, w: 100, duur: 4.5, fase: 2.2 }
    ],

    bollen: [
      { x: 300,  y: 335 }, { x: 520,  y: 260 }, { x: 760,  y: 415 },
      { x: 955,  y: 335 }, { x: 1175, y: 260 }, { x: 1520, y: 335 },
      { x: 1695, y: 335 }, { x: 1915, y: 260 }, { x: 2320, y: 415 },
      { x: 2515, y: 335 }, { x: 2735, y: 260 }, { x: 3080, y: 415 },
      { x: 3270, y: 335 }, { x: 3495, y: 260 }, { x: 4030, y: 335 },
      { x: 4255, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 955,  y: 365 },
      { x: 1915, y: 290 },
      { x: 2320, y: 470 },
      { x: 2515, y: 365 },
      { x: 2735, y: 290 },
      { x: 3270, y: 365 },
      { x: 4340, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4420, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 500,  y: 456, w: 56 },
      { x: 2200, y: 456, w: 48 },
      { x: 3320, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1200, aan: 1.1, uit: 1.8 },
      { x: 2560, aan: 1.2, uit: 1.8, fase: 1.5 }
    ],

    vijanden: [
      { type: "bewaker",  x: 300,  minX: 250,  maxX: 500 },
      { type: "camdrone", x: 760,  basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 900,  minX: 830,  maxX: 1150 },
      { type: "camdrone", x: 1520, basisY: 320, amplitude: 70 },
      { type: "bewaker",  x: 1900, minX: 1820, maxX: 2120 },
      { type: "camdrone", x: 2320, basisY: 320, amplitude: 70 },
      { type: "bewaker",  x: 2700, minX: 2560, maxX: 2900 },
      { type: "camdrone", x: 3270, basisY: 330, amplitude: 60 },
      { type: "bewaker",  x: 4000, minX: 3920, maxX: 4200 }
    ],

    checkpoints: [
      { x: 1580 },
      { x: 3160 }
    ],

    finish: { x: 4580 }
  },

  /* ================================================================
     LEVEL 3 — Codegracht
     Avondstad: lasers, een stekelbol en een afbrokkelbrug.
     ================================================================ */
  {
    naam: "Codegracht",
    breedte: 4900,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#3f4d78",
      luchtOnder:    "#c98f6a",
      zon:           "#ffcf8a",
      wolk:          "#6a6f94",
      heuvelVer:     "#4a4f74",
      heuvelDichtbij:"#3a3f5e",
      grondGras:     "#6a6f94",
      grondAarde:    "#40445e",
      grondAardeRand:"#2e3245",
      platformTop:   "#6a6f94",
      platformHout:  "#4e5273"
    },

    platforms: [
      { x: 0,    y: 480, w: 640,  h: 60, type: "grond" },
      { x: 1120, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 1800, y: 480, w: 700,  h: 60, type: "grond" },
      { x: 2620, y: 480, w: 640,  h: 60, type: "grond" },
      { x: 3380, y: 480, w: 1520, h: 60, type: "grond" },

      { x: 200,  y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 420,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1180, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 1400, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 1860, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2080, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2300, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 2680, y: 375, w: 150, h: 24, type: "zwevend" },
      { x: 2900, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3440, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 3660, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 3880, y: 375, w: 130, h: 24, type: "zwevend" },
      { x: 4260, y: 375, w: 140, h: 24, type: "zwevend" },
      { x: 4480, y: 300, w: 150, h: 24, type: "zwevend" },

      /* Afbrokkelbrug over de gracht */
      { type: "brokkel", x: 720,  y: 430, w: 90 },
      { type: "brokkel", x: 870,  y: 430, w: 90 },
      { type: "brokkel", x: 1010, y: 430, w: 90 },

      /* Stadslift */
      { type: "bewegend", as: "y", x: 2510, min: 300, max: 430, w: 100, duur: 4.5 }
    ],

    bollen: [
      { x: 270,  y: 335 }, { x: 490,  y: 260 }, { x: 900,  y: 400 },
      { x: 1255, y: 335 }, { x: 1475, y: 260 }, { x: 1670, y: 335 },
      { x: 1935, y: 335 }, { x: 2155, y: 260 }, { x: 2560, y: 415 },
      { x: 2755, y: 335 }, { x: 2975, y: 260 }, { x: 3515, y: 335 },
      { x: 3735, y: 260 }, { x: 3950, y: 335 }, { x: 4330, y: 335 },
      { x: 4550, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1255, y: 365 },
      { x: 1935, y: 365 },
      { x: 2155, y: 290 },
      { x: 2755, y: 365 },
      { x: 2975, y: 290 },
      { x: 3515, y: 365 },
      { x: 4540, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4620, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 450,  y: 456, w: 48 },
      { x: 2280, y: 456, w: 48 },
      { x: 3300, y: 456, w: 48 },
      { x: 4100, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1500, aan: 1.2, uit: 1.8 },
      { x: 3800, aan: 1.2, uit: 1.8, fase: 1.5 }
    ],

    vijanden: [
      { type: "bewaker",   x: 300,  minX: 250,  maxX: 500 },
      { type: "camdrone",  x: 900,  basisY: 330, amplitude: 60 },
      { type: "bewaker",   x: 1250, minX: 1140, maxX: 1440 },
      { type: "camdrone",  x: 1670, basisY: 320, amplitude: 70 },
      { type: "bewaker",   x: 1900, minX: 1820, maxX: 2200 },
      { type: "stekelbol", cx: 2850, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "camdrone",  x: 3515, basisY: 330, amplitude: 60 },
      { type: "bewaker",   x: 3950, minX: 3820, maxX: 4200 }
    ],

    checkpoints: [
      { x: 1820 },
      { x: 3400 }
    ],

    finish: { x: 4780 }
  },

  /* ================================================================
     LEVEL 4 — Verificatietoren
     Omhoog de toren in: veel liften, lasers tussen de verdiepingen.
     ================================================================ */
  {
    naam: "Verificatietoren",
    breedte: 5100,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#4a5fa0",
      luchtOnder:    "#aec0e0",
      zon:           "#e8eefc",
      wolk:          "#7f92c0",
      heuvelVer:     "#4a5789",
      heuvelDichtbij:"#3a466e",
      grondGras:     "#7e8ab8",
      grondAarde:    "#4a5378",
      grondAardeRand:"#363d5a",
      platformTop:   "#7e8ab8",
      platformHout:  "#5c6690"
    },

    platforms: [
      { x: 0,    y: 480, w: 560,  h: 60, type: "grond" },
      { x: 1060, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 2100, y: 480, w: 600,  h: 60, type: "grond" },
      { x: 3200, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 4240, y: 480, w: 860,  h: 60, type: "grond" },

      { x: 160,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 340,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1120, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1340, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2160, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2380, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2560, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 3260, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3480, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4300, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 4520, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4740, y: 380, w: 130, h: 24, type: "zwevend" },

      /* Trams over de brede pleinen tussen de torens (horizontaal) */
      { type: "bewegend", as: "x", min: 600,  max: 1000, y: 405, w: 110, duur: 4.5 },
      { type: "bewegend", as: "x", min: 1660, max: 1980, y: 405, w: 110, duur: 4.5 },
      { type: "bewegend", as: "x", min: 2780, max: 3140, y: 405, w: 110, duur: 4.5 },
      { type: "bewegend", as: "x", min: 3800, max: 4120, y: 405, w: 110, duur: 4.5, fase: 2 }
    ],

    bollen: [
      { x: 225,  y: 340 }, { x: 410,  y: 260 }, { x: 800,  y: 360 },
      { x: 1190, y: 340 }, { x: 1410, y: 260 }, { x: 1720, y: 250 },
      { x: 2230, y: 340 }, { x: 2455, y: 260 }, { x: 2960, y: 360 },
      { x: 3330, y: 340 }, { x: 3550, y: 260 }, { x: 3860, y: 250 },
      { x: 4370, y: 340 }, { x: 4590, y: 260 }, { x: 4810, y: 340 },
      { x: 5000, y: 400 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1190, y: 370 },
      { x: 2230, y: 370 },
      { x: 2455, y: 290 },
      { x: 3330, y: 370 },
      { x: 3550, y: 290 },
      { x: 4370, y: 370 },
      { x: 4740, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 4820, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 420,  y: 456, w: 48 },
      { x: 2320, y: 456, w: 48 },
      { x: 3400, y: 456, w: 48 },
      { x: 4460, y: 456, w: 48 }
    ],

    lasers: [
      { x: 2400, aan: 1.2, uit: 1.7 },
      { x: 3500, aan: 1.2, uit: 1.7, fase: 1.4 }
    ],

    vijanden: [
      { type: "camdrone",  x: 800,  basisY: 330, amplitude: 80 },
      { type: "bewaker",   x: 1120, minX: 1060, maxX: 1400 },
      { type: "camdrone",  x: 1600, basisY: 340, amplitude: 60 },
      { type: "bewaker",   x: 2150, minX: 2110, maxX: 2400 },
      { type: "stekelbol", cx: 2560, cy: 350, as: "y", bereik: 150, duur: 4 },
      { type: "camdrone",  x: 3050, basisY: 320, amplitude: 70 },
      { type: "bewaker",   x: 3260, minX: 3210, maxX: 3500 },
      { type: "camdrone",  x: 4590, basisY: 320, amplitude: 60 },
      { type: "bewaker",   x: 4900, minX: 4820, maxX: 5060 }
    ],

    checkpoints: [
      { x: 2120 },
      { x: 4260 }
    ],

    finish: { x: 4980 }
  },

  /* ================================================================
     LEVEL 5 — Firewallplein
     Nachtstad met neon: veel lasers, twee stekelbollen.
     ================================================================ */
  {
    naam: "Firewallplein",
    breedte: 5300,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#241a44",
      luchtOnder:    "#5a3f7a",
      zon:           "#ff8fd0",
      wolk:          "#3a2a5c",
      heuvelVer:     "#2e2250",
      heuvelDichtbij:"#241a40",
      grondGras:     "#a24fd0",
      grondAarde:    "#33265a",
      grondAardeRand:"#241940",
      platformTop:   "#a24fd0",
      platformHout:  "#3d2f6e"
    },

    platforms: [
      { x: 0,    y: 480, w: 540,  h: 60, type: "grond" },
      { x: 1080, y: 480, w: 520,  h: 60, type: "grond" },
      { x: 2080, y: 480, w: 560,  h: 60, type: "grond" },
      { x: 3160, y: 480, w: 520,  h: 60, type: "grond" },
      { x: 4200, y: 480, w: 1100, h: 60, type: "grond" },

      { x: 150,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 340,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1140, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1360, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2140, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2360, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2560, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 3220, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3440, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4260, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 4480, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4700, y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 4920, y: 300, w: 130, h: 24, type: "zwevend" },

      /* Trams over de brede pleinen (horizontaal) */
      { type: "bewegend", as: "x", min: 590,  max: 1000, y: 405, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 1660, max: 1960, y: 405, w: 110, duur: 4.5 },
      { type: "bewegend", as: "x", min: 2740, max: 3120, y: 405, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 3740, max: 4080, y: 405, w: 110, duur: 4.5, fase: 2 }
    ],

    bollen: [
      { x: 215,  y: 340 }, { x: 410,  y: 260 }, { x: 795,  y: 360 },
      { x: 1210, y: 340 }, { x: 1430, y: 260 }, { x: 1720, y: 250 },
      { x: 2210, y: 340 }, { x: 2435, y: 260 }, { x: 2930, y: 360 },
      { x: 3290, y: 340 }, { x: 3510, y: 260 }, { x: 3840, y: 250 },
      { x: 4330, y: 340 }, { x: 4550, y: 260 }, { x: 4770, y: 340 },
      { x: 4985, y: 260 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1210, y: 370 },
      { x: 2210, y: 370 },
      { x: 2435, y: 290 },
      { x: 3290, y: 370 },
      { x: 3510, y: 290 },
      { x: 4330, y: 370 },
      { x: 4940, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5020, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 420,  y: 456, w: 48 },
      { x: 2300, y: 456, w: 48 },
      { x: 3380, y: 456, w: 48 },
      { x: 4440, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1300, aan: 1.3, uit: 1.6 },
      { x: 2440, aan: 1.3, uit: 1.6, fase: 1.2 },
      { x: 4620, aan: 1.2, uit: 1.7, fase: 2.4 }
    ],

    vijanden: [
      { type: "camdrone",  x: 795,  basisY: 330, amplitude: 80 },
      { type: "bewaker",   x: 1140, minX: 1090, maxX: 1400 },
      { type: "camdrone",  x: 1600, basisY: 340, amplitude: 60 },
      { type: "bewaker",   x: 2120, minX: 2090, maxX: 2380 },
      { type: "stekelbol", cx: 2560, cy: 350, as: "y", bereik: 150, duur: 4 },
      { type: "camdrone",  x: 3050, basisY: 320, amplitude: 70 },
      { type: "bewaker",   x: 3220, minX: 3170, maxX: 3460 },
      { type: "stekelbol", cx: 4290, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "camdrone",  x: 4770, basisY: 320, amplitude: 60 },
      { type: "bewaker",   x: 5060, minX: 4980, maxX: 5240 }
    ],

    checkpoints: [
      { x: 2100 },
      { x: 4220 }
    ],

    finish: { x: 5180 }
  },

  /* ================================================================
     LEVEL 6 — Datacentrum
     De eindmissie van Accountstad: alles gecombineerd, drie
     stekelbollen en een gordijn van lasers. Alleen voor echte
     accountbewakers!
     ================================================================ */
  {
    naam: "Datacentrum",
    breedte: 5800,
    spelerStart: { x: 80, y: 434 },

    thema: {
      luchtBoven:    "#111a30",
      luchtOnder:    "#243a5c",
      zon:           "#4ad0ff",
      wolk:          "#1c2a48",
      heuvelVer:     "#182642",
      heuvelDichtbij:"#111d34",
      grondGras:     "#39a0ff",
      grondAarde:    "#1a2848",
      grondAardeRand:"#111d34",
      platformTop:   "#39a0ff",
      platformHout:  "#243a66"
    },

    platforms: [
      { x: 0,    y: 480, w: 500,  h: 60, type: "grond" },
      { x: 1040, y: 480, w: 480,  h: 60, type: "grond" },
      { x: 2060, y: 480, w: 540,  h: 60, type: "grond" },
      { x: 3140, y: 480, w: 500,  h: 60, type: "grond" },
      { x: 4180, y: 480, w: 520,  h: 60, type: "grond" },
      { x: 5240, y: 480, w: 560,  h: 60, type: "grond" },

      { x: 150,  y: 380, w: 130, h: 24, type: "zwevend" },
      { x: 340,  y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 1100, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 1320, y: 300, w: 140, h: 24, type: "zwevend" },
      { x: 2120, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 2340, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 2540, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 3200, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 3420, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4240, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 4460, y: 300, w: 150, h: 24, type: "zwevend" },
      { x: 4680, y: 380, w: 120, h: 24, type: "zwevend" },
      { x: 5300, y: 380, w: 140, h: 24, type: "zwevend" },
      { x: 5520, y: 300, w: 130, h: 24, type: "zwevend" },

      /* Trams + afbrokkelbrug (horizontale oversteek) */
      { type: "bewegend", as: "x", min: 560,  max: 960,  y: 405, w: 110, duur: 4 },
      { type: "bewegend", as: "x", min: 1580, max: 1900, y: 405, w: 110, duur: 4.5 },
      { type: "brokkel",  x: 2700, y: 430, w: 90 },
      { type: "brokkel",  x: 2840, y: 430, w: 90 },
      { type: "brokkel",  x: 2980, y: 430, w: 90 },
      { type: "bewegend", as: "x", min: 3700, max: 4020, y: 405, w: 110, duur: 4.5 },
      { type: "bewegend", as: "x", min: 4740, max: 5140, y: 405, w: 110, duur: 4, fase: 2 }
    ],

    bollen: [
      { x: 215,  y: 340 }, { x: 410,  y: 260 }, { x: 760,  y: 360 },
      { x: 1170, y: 340 }, { x: 1390, y: 260 }, { x: 1680, y: 250 },
      { x: 2190, y: 340 }, { x: 2415, y: 260 }, { x: 2890, y: 400 },
      { x: 3270, y: 340 }, { x: 3490, y: 260 }, { x: 3760, y: 250 },
      { x: 4310, y: 340 }, { x: 4530, y: 260 }, { x: 4940, y: 360 },
      { x: 5370, y: 340 }
    ],

    vraagobjecten: [
      { x: 300,  y: 470 },
      { x: 1170, y: 370 },
      { x: 2190, y: 370 },
      { x: 2415, y: 290 },
      { x: 3270, y: 370 },
      { x: 3490, y: 290 },
      { x: 4310, y: 370 },
      { x: 5480, y: 470, poortId: "poort1" }
    ],

    poorten: [
      { id: "poort1", x: 5560, y: 0, w: 34, h: 480 }
    ],

    stekels: [
      { x: 400,  y: 456, w: 48 },
      { x: 2280, y: 456, w: 48 },
      { x: 3360, y: 456, w: 48 },
      { x: 4400, y: 456, w: 48 },
      { x: 5680, y: 456, w: 48 }
    ],

    lasers: [
      { x: 1240, aan: 1.3, uit: 1.6 },
      { x: 2320, aan: 1.3, uit: 1.5, fase: 1.0 },
      { x: 3520, aan: 1.3, uit: 1.5, fase: 2.0 },
      { x: 4560, aan: 1.2, uit: 1.6, fase: 0.6 }
    ],

    vijanden: [
      { type: "camdrone",  x: 760,  basisY: 320, amplitude: 80 },
      { type: "bewaker",   x: 1100, minX: 1050, maxX: 1380 },
      { type: "camdrone",  x: 1600, basisY: 320, amplitude: 70 },
      { type: "bewaker",   x: 2100, minX: 2070, maxX: 2340 },
      { type: "stekelbol", cx: 2540, cy: 300, as: "y", bereik: 130, duur: 4 },
      { type: "bewaker",   x: 3160, minX: 3150, maxX: 3400 },
      { type: "stekelbol", cx: 3950, cy: 463, as: "x", bereik: 200, duur: 5 },
      { type: "camdrone",  x: 4530, basisY: 320, amplitude: 60 },
      { type: "bewaker",   x: 5300, minX: 5250, maxX: 5480 },
      { type: "stekelbol", cx: 5370, cy: 320, as: "y", bereik: 120, duur: 3.5 }
    ],

    checkpoints: [
      { x: 2080 },
      { x: 3160 },
      { x: 4200 }
    ],

    finish: { x: 5720 }
  }
];
