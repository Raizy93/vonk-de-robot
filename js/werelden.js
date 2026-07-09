/* ============================================================
   WERELDEN — De zes werelden van de game, elk met een eigen
   leerdoel. Wereld 1 en 2 zijn speelbaar; wereld 3 t/m 6 staan
   al in de wereldkiezer als "Binnenkort".

   Per wereld:
     naam         : korte naam
     titel        : volledige titel (getoond in de kiezers)
     leerdoel     : wat leren de kinderen hier?
     beschikbaar  : false = nog niet gebouwd ("Binnenkort")
     levels       : de levellijst (alleen bij beschikbare werelden)
     vragen       : de vragenset voor de slotjes in deze wereld
     feedbackGoed / feedbackFout : zinnetjes bij goed/fout
     bouwer       : true = wachtwoord-bouwer na de finish
     blaster      : true = zap-blaster (muis richten + klikken)
     icoon        : tekenfunctie voor het wereldplaatje (canvas)

   Een wereld afbouwen? Maak een levelbestand + vragenset, zet
   beschikbaar op true en vul levels/vragen in — de wereldkiezer,
   sterren en ontgrendeling werken er automatisch mee.
   ============================================================ */

const WERELDEN = [
  {
    naam: "Wachtwoordschool",
    titel: "Wereld 1 — Wachtwoordschool",
    leerdoel: "Sterke en zwakke wachtwoorden herkennen",
    beschikbaar: true,
    levels: WERELD1_LEVELS,
    vragen: WACHTWOORD_VRAGEN_HERKENNEN,
    feedbackGoed: FEEDBACK_GOED,
    feedbackFout: FEEDBACK_FOUT,
    bouwer: false,     // eigen wachtwoorden bouwen leer je pas in Wereld 2!
    blaster: false,
    icoon: tekenIcoonSchool
  },
  {
    naam: "Wachtwoordwerkplaats",
    titel: "Wereld 2 — Wachtwoordwerkplaats",
    leerdoel: "Zwakke wachtwoorden verbeteren",
    beschikbaar: true,
    levels: WERELD2_LEVELS,
    vragen: WACHTWOORD_VRAGEN_VERBETEREN,
    feedbackGoed: FEEDBACK_GOED,
    feedbackFout: FEEDBACK_FOUT,
    bouwer: true,      // na elke finish: zelf een sterk wachtwoord bouwen
    blaster: true,     // nieuw speelgoed: de zap-blaster!
    icoon: tekenIcoonWerkplaats
  },
  {
    naam: "Geheimenkluis",
    titel: "Wereld 3 — Geheimenkluis",
    leerdoel: "Wachtwoorden en codes geheim houden",
    beschikbaar: true,
    levels: WERELD3_LEVELS,
    vragen: GEHEIM_VRAGEN,
    feedbackGoed: GEHEIM_FEEDBACK_GOED,
    feedbackFout: GEHEIM_FEEDBACK_FOUT,
    bouwer: false,
    blaster: true,     // de blaster blijft — maar pas op voor zoeklichten!
    icoon: tekenIcoonKluis
  },
  {
    naam: "Phishingrivier",
    titel: "Wereld 4 — Phishingrivier",
    leerdoel: "Nepberichten en verdachte links herkennen",
    beschikbaar: true,
    levels: WERELD4_LEVELS,
    vragen: ONLINE_VRAGEN,               // echtnep- en situatievragen
    feedbackGoed: ONLINE_FEEDBACK_GOED,
    feedbackFout: ONLINE_FEEDBACK_FOUT,
    bouwer: false,
    blaster: true,     // de blaster blijft — pas op voor het water en de happers!
    icoon: tekenIcoonRivier
  },
  {
    naam: "Accountstad",
    titel: "Wereld 5 — Accountstad",
    leerdoel: "Accounts extra beveiligen",
    beschikbaar: true,
    levels: WERELD5_LEVELS,
    vragen: ACCOUNT_VRAGEN,
    feedbackGoed: ACCOUNT_FEEDBACK_GOED,
    feedbackFout: ACCOUNT_FEEDBACK_FOUT,
    bouwer: false,
    blaster: true,     // de blaster blijft — pas op voor de beveiligingslasers!
    icoon: tekenIcoonStad
  },
  {
    naam: "Cyberkasteel",
    titel: "Wereld 6 — Cyberkasteel",
    leerdoel: "Eindmissie: alles toepassen",
    beschikbaar: true,
    levels: WERELD6_LEVELS,
    vragen: EINDMISSIE_VRAGEN,
    feedbackGoed: EINDMISSIE_FEEDBACK_GOED,
    feedbackFout: EINDMISSIE_FEEDBACK_FOUT,
    bouwer: false,
    blaster: true,     // alle wapens en gevaren komen hier samen!
    icoon: tekenIcoonKasteel
  }
];

/* ============================================================
   Wereldplaatjes — simpele canvas-tekeningen (96 × 64).
   Elke functie tekent in een assenstelsel met (0,0) linksboven.
   ============================================================ */

/* W1: schoolgebouw met vlag en een wachtwoordbordje */
function tekenIcoonSchool(ctx) {
  ctx.fillStyle = "#d97b5a";                       // muren
  ctx.fillRect(18, 26, 60, 34);
  ctx.fillStyle = "#a8503a";                       // dak
  ctx.beginPath();
  ctx.moveTo(12, 28); ctx.lineTo(48, 8); ctx.lineTo(84, 28);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#f2c14e";                       // vlaggetje
  ctx.fillRect(47, 0, 2, 12);
  ctx.beginPath();
  ctx.moveTo(49, 1); ctx.lineTo(62, 4); ctx.lineTo(49, 8);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#7d4030";                       // deur
  ctx.fillRect(42, 42, 12, 18);
  ctx.fillStyle = "#fffdf5";                       // bordje met sterretjes
  ctx.fillRect(23, 32, 15, 10);
  ctx.fillStyle = "#2b3a8f";
  ctx.font = "bold 8px monospace";
  ctx.fillText("***", 25, 40);
  ctx.fillStyle = "#fffdf5";
  ctx.fillRect(58, 32, 15, 10);
}

/* W2: gekruiste moersleutel en hamer */
function tekenIcoonWerkplaats(ctx) {
  ctx.save();
  ctx.translate(48, 32);
  // Moersleutel
  ctx.save();
  ctx.rotate(-0.6);
  ctx.strokeStyle = "#8fa5bd";
  ctx.lineWidth = 7;
  ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(18, 0); ctx.stroke();
  ctx.strokeStyle = "#8fa5bd";
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(-24, 0, 8, 0.6, -0.6, false); ctx.stroke();
  ctx.beginPath(); ctx.arc(24, 0, 8, Math.PI + 0.6, Math.PI - 0.6, false); ctx.stroke();
  ctx.restore();
  // Hamer
  ctx.save();
  ctx.rotate(0.6);
  ctx.strokeStyle = "#b07a48";
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-16, 0); ctx.lineTo(20, 0); ctx.stroke();
  ctx.fillStyle = "#54637a";
  ctx.fillRect(-30, -8, 16, 16);
  ctx.restore();
  ctx.restore();
}

/* W3: kluisdeur met draaiknop */
function tekenIcoonKluis(ctx) {
  ctx.fillStyle = "#5a6273";
  ctx.beginPath(); ctx.roundRect(18, 6, 60, 52, 8); ctx.fill();
  ctx.strokeStyle = "#3d4450";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = "#f2c14e";                     // draaiknop
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.arc(48, 32, 12, 0, Math.PI * 2); ctx.stroke();
  ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) {
    const hoek = i * Math.PI / 2 + 0.4;
    ctx.beginPath();
    ctx.moveTo(48 + Math.cos(hoek) * 8, 32 + Math.sin(hoek) * 8);
    ctx.lineTo(48 + Math.cos(hoek) * 15, 32 + Math.sin(hoek) * 15);
    ctx.stroke();
  }
  ctx.fillStyle = "#3d4450";                       // hendel
  ctx.fillRect(68, 26, 5, 12);
}

/* W4: rivier met een hengel die een envelop opvist */
function tekenIcoonRivier(ctx) {
  ctx.strokeStyle = "#4da9f0";                     // golven
  ctx.lineWidth = 4;
  for (let rij = 0; rij < 2; rij++) {
    ctx.beginPath();
    for (let x = 8; x <= 88; x += 16) {
      ctx.arc(x, 48 + rij * 9, 8, Math.PI, 0);
    }
    ctx.stroke();
  }
  ctx.strokeStyle = "#8a5a3c";                     // hengel
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(14, 40); ctx.lineTo(52, 6); ctx.stroke();
  ctx.strokeStyle = "#9aa2b8";                     // vislijn
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(52, 6); ctx.lineTo(62, 26); ctx.stroke();
  ctx.fillStyle = "#fffdf5";                       // envelop aan de haak
  ctx.fillRect(54, 26, 18, 13);
  ctx.strokeStyle = "#d95252";
  ctx.beginPath();
  ctx.moveTo(54, 26); ctx.lineTo(63, 34); ctx.lineTo(72, 26);
  ctx.stroke();
}

/* W5: skyline met een beschermend schildje */
function tekenIcoonStad(ctx) {
  ctx.fillStyle = "#5b6ee1";
  ctx.fillRect(12, 24, 16, 36);
  ctx.fillRect(32, 12, 18, 48);
  ctx.fillRect(54, 30, 14, 30);
  ctx.fillRect(72, 20, 14, 40);
  ctx.fillStyle = "#ffe27a";                       // raampjes
  for (const [bx, by] of [[16, 30], [36, 18], [40, 30], [58, 36], [76, 26], [76, 40]]) {
    ctx.fillRect(bx, by, 5, 6);
  }
  ctx.fillStyle = "#3cb54a";                       // schildje
  ctx.beginPath();
  ctx.moveTo(48, 26); ctx.lineTo(60, 32); ctx.lineTo(60, 44);
  ctx.quadraticCurveTo(60, 54, 48, 58);
  ctx.quadraticCurveTo(36, 54, 36, 44);
  ctx.lineTo(36, 32);
  ctx.closePath(); ctx.fill();
  ctx.strokeStyle = "#fffdf5";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(42, 42); ctx.lineTo(47, 47); ctx.lineTo(56, 35);   // vinkje
  ctx.stroke();
}

/* W6: kasteel met neon-torens */
function tekenIcoonKasteel(ctx) {
  ctx.fillStyle = "#2a2f4a";
  ctx.fillRect(16, 28, 16, 32);                    // linkertoren
  ctx.fillRect(64, 28, 16, 32);                    // rechtertoren
  ctx.fillRect(28, 38, 40, 22);                    // muur
  // Kantelen
  for (const tx of [16, 22, 28, 64, 70, 76]) ctx.fillRect(tx, 22, 5, 8);
  ctx.fillStyle = "#39ffec";                       // neon poort + ramen
  ctx.beginPath();
  ctx.arc(48, 60, 9, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(21, 34, 5, 7);
  ctx.fillRect(69, 34, 5, 7);
  ctx.strokeStyle = "#ff3ed6";                     // vlaggetjes
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(23, 22); ctx.lineTo(23, 12); ctx.stroke();
  ctx.fillStyle = "#ff3ed6";
  ctx.beginPath();
  ctx.moveTo(23, 12); ctx.lineTo(33, 15); ctx.lineTo(23, 18);
  ctx.closePath(); ctx.fill();
}
