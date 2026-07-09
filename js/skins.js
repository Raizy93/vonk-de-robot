/* ============================================================
   SKINS — De koopbare uiterlijkjes van de speler.

   Elke skin is een eigen canvas-tekening (geen afbeeldingen).
   Alle skins worden getekend rond hetzelfde punt: de ONDERKANT-
   MIDDEN van de figuur (0,0), met dezelfde afmetingen als de
   speler-hitbox (36 breed, 46 hoog). Zo werkt elke skin meteen
   in de game én als preview in de winkel.

   Een skin toevoegen? Voeg een object toe aan SKINS met een
   eigen teken-functie en hij verschijnt vanzelf in de winkel.
   ============================================================ */

const SKINS = [
  {
    id: "standaard",
    naam: "Standaard",
    prijs: 0,
    teken: tekenSkinStandaard
  },
  {
    id: "robot",
    naam: "Robot",
    prijs: 20,     // prijzen zijn in sleutels (1 sleutel per goed antwoord)
    teken: tekenSkinRobot
  },
  {
    id: "ridder",
    naam: "Ridder",
    prijs: 45,
    teken: tekenSkinRidder
  },
  {
    id: "cyberheld",
    naam: "Cyberheld",
    prijs: 80,
    teken: tekenSkinCyberheld
  },
  {
    id: "schaduwheld",
    naam: "Schaduwheld",
    prijs: 0,
    geheim: true,     // niet te koop: alleen via het codewoord EXPERT
    teken: tekenSkinSchaduwheld
  }
];

/* Skin opzoeken op id (valt terug op de standaard-skin) */
function vindSkin(id) {
  return SKINS.find(s => s.id === id) || SKINS[0];
}

/* ============================================================
   LASERS — De koopbare laserkleuren voor de zap-blaster.
   (De blaster zelf krijg je in Wereld 2; de laserwinkel gaat
   dan ook pas open zodra Wereld 2 ontgrendeld is.)

   kleur = de kern van het schot en het richtkruis,
   gloed = de zachte gloed eromheen.
   ============================================================ */

const LASERS = [
  {
    id: "cyaan",
    naam: "Cyaanflits",
    prijs: 0,
    kleur: "#39ffec",
    gloed: "rgba(57, 255, 236, 0.35)"
  },
  {
    id: "groen",
    naam: "Gifgroen",
    prijs: 15,
    kleur: "#7dff5a",
    gloed: "rgba(125, 255, 90, 0.35)"
  },
  {
    id: "roze",
    naam: "Rozevonk",
    prijs: 35,
    kleur: "#ff3ed6",
    gloed: "rgba(255, 62, 214, 0.35)"
  },
  {
    id: "goud",
    naam: "Goudstraal",
    prijs: 60,
    kleur: "#ffd23f",
    gloed: "rgba(255, 210, 63, 0.4)"
  }
];

/* Laser opzoeken op id (valt terug op de standaard-laser) */
function vindLaser(id) {
  return LASERS.find(l => l.id === id) || LASERS[0];
}

/* Preview van een laser voor in de winkel: een schuin zap-schot */
function tekenLaserPreview(ctx, laser, b, h) {
  ctx.clearRect(0, 0, b, h);
  ctx.save();
  ctx.translate(b / 2, h / 2);
  ctx.rotate(-0.5);

  // Staart (drie vervagende bolletjes achter het schot)
  for (let i = 3; i >= 1; i--) {
    ctx.fillStyle = laser.gloed;
    ctx.beginPath();
    ctx.arc(-i * 11, 0, 7 - i, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gloed + kern
  ctx.fillStyle = laser.gloed;
  ctx.beginPath();
  ctx.arc(6, 0, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = laser.kleur;
  ctx.beginPath();
  ctx.arc(6, 0, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.beginPath();
  ctx.arc(4, -2, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/*
 * Tekent de figuur van een skin.
 *   ctx     : canvas-context, al verplaatst naar onderkant-midden
 *   tijd    : speltijd (voor knipperen/gloed)
 *   opties  : { stap: voetanimatie -5..5, opGrond: boolean }
 */
function tekenFiguur(ctx, skinId, tijd, opties = {}) {
  const stap = opties.stap || 0;
  vindSkin(skinId).teken(ctx, tijd, stap);
}

/* --- Gedeelde hulpjes: alle figuren zijn 36 breed en 46 hoog --- */
const FIG_B = 36;   // breedte
const FIG_H = 46;   // hoogte

/* Twee voetjes tekenen (stap = animatie-offset) */
function tekenVoetjes(ctx, kleur, stap) {
  ctx.fillStyle = kleur;
  ctx.beginPath();
  ctx.ellipse(-9 + stap, -4, 8, 5, 0, 0, Math.PI * 2);
  ctx.ellipse( 9 - stap, -4, 8, 5, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* Basislijf: afgeronde rechthoek met rand */
function tekenLijf(ctx, vulKleur, randKleur) {
  ctx.fillStyle = vulKleur;
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2, -FIG_H + 6, FIG_B, FIG_H - 12, 10);
  ctx.fill();
  ctx.strokeStyle = randKleur;
  ctx.lineWidth = 3;
  ctx.stroke();
}

/* ============ SKIN 1: Standaard (het oranje robotje Vonk) ============ */
function tekenSkinStandaard(ctx, tijd, stap) {
  const K = CONFIG.kleuren;

  tekenVoetjes(ctx, K.spelerDonker, stap);
  tekenLijf(ctx, K.speler, K.spelerDonker);

  // Buikpaneel
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 7, -FIG_H / 2 + 2, FIG_B - 14, 12, 5);
  ctx.fill();

  // Visor met ronde oogjes (knippert af en toe)
  ctx.fillStyle = K.spelerVisor;
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 4, -FIG_H + 12, FIG_B - 8, 16, 7);
  ctx.fill();

  const knipper = Math.sin(tijd * 1.7) > 0.97;
  ctx.fillStyle = K.spelerOog;
  if (knipper) {
    ctx.fillRect(-8, -FIG_H + 19, 7, 2);
    ctx.fillRect( 3, -FIG_H + 19, 7, 2);
  } else {
    ctx.beginPath();
    ctx.arc(-4, -FIG_H + 20, 3.4, 0, Math.PI * 2);
    ctx.arc( 7, -FIG_H + 20, 3.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Antenne met gloeiend bolletje
  ctx.strokeStyle = K.spelerDonker;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -FIG_H + 6);
  ctx.lineTo(0, -FIG_H - 6);
  ctx.stroke();

  const gloed = 0.6 + Math.sin(tijd * 6) * 0.4;
  ctx.fillStyle = `rgba(125, 249, 255, ${gloed})`;
  ctx.beginPath();
  ctx.arc(0, -FIG_H - 10, 5, 0, Math.PI * 2);
  ctx.fill();
}

/* ============ SKIN 2: Robot (staalblauw met klinknagels) ============ */
function tekenSkinRobot(ctx, tijd, stap) {
  tekenVoetjes(ctx, "#3d4a5c", stap);
  tekenLijf(ctx, "#8fa5bd", "#3d4a5c");

  // Klinknagels op de hoeken
  ctx.fillStyle = "#3d4a5c";
  for (const [nx, ny] of [[-11, -14], [11, -14], [-11, -34], [11, -34]]) {
    ctx.beginPath();
    ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Borstluikje met schroef
  ctx.strokeStyle = "#3d4a5c";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-9, -24, 18, 12, 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, -18, 2.5, 0, Math.PI * 2);
  ctx.stroke();

  // Rechthoekige groene oogjes op een donker paneel
  ctx.fillStyle = "#2b3444";
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 4, -FIG_H + 12, FIG_B - 8, 16, 5);
  ctx.fill();
  ctx.fillStyle = "#7dff8a";
  ctx.fillRect(-9, -FIG_H + 17, 7, 6);
  ctx.fillRect( 3, -FIG_H + 17, 7, 6);

  // Antenne met knipperend rood lampje
  ctx.strokeStyle = "#3d4a5c";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -FIG_H + 6);
  ctx.lineTo(0, -FIG_H - 6);
  ctx.stroke();
  const aan = Math.sin(tijd * 8) > 0;
  ctx.fillStyle = aan ? "#ff5a5a" : "#7a3030";
  ctx.beginPath();
  ctx.arc(0, -FIG_H - 10, 5, 0, Math.PI * 2);
  ctx.fill();
}

/* ============ SKIN 3: Ridder (zilveren helm met rode pluim) ============ */
function tekenSkinRidder(ctx, tijd, stap) {
  tekenVoetjes(ctx, "#6b7280", stap);
  tekenLijf(ctx, "#c8cdd6", "#6b7280");

  // Schild-embleem op de borst
  ctx.fillStyle = "#e0b93f";
  ctx.beginPath();
  ctx.moveTo(0, -28);
  ctx.lineTo(8, -24);
  ctx.lineTo(8, -16);
  ctx.lineTo(0, -10);
  ctx.lineTo(-8, -16);
  ctx.lineTo(-8, -24);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#8a6d1c";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Helm (over de bovenkant) met kijkspleet
  ctx.fillStyle = "#9aa3b2";
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 2, -FIG_H + 8, FIG_B - 4, 22, 9);
  ctx.fill();
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#2b2f3a";
  ctx.beginPath();
  ctx.roundRect(-11, -FIG_H + 16, 22, 5, 2.5);
  ctx.fill();

  // Rode pluim bovenop (wappert zachtjes)
  const wapper = Math.sin(tijd * 5) * 2;
  ctx.fillStyle = "#d13a3a";
  ctx.beginPath();
  ctx.moveTo(-3, -FIG_H + 8);
  ctx.quadraticCurveTo(wapper, -FIG_H - 14, 3 + wapper, -FIG_H - 12);
  ctx.quadraticCurveTo(4, -FIG_H - 2, 3, -FIG_H + 8);
  ctx.closePath();
  ctx.fill();
}

/* ============ SKIN 4: Cyberheld (donker met neonstrepen) ============ */
function tekenSkinCyberheld(ctx, tijd, stap) {
  tekenVoetjes(ctx, "#1b1f33", stap);
  tekenLijf(ctx, "#2a2f4a", "#1b1f33");

  // Neonstrepen op het lijf (pulseren zachtjes)
  const puls = 0.65 + Math.sin(tijd * 4) * 0.35;
  ctx.strokeStyle = `rgba(255, 62, 214, ${puls})`;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-12, -26); ctx.lineTo(-12, -12);
  ctx.moveTo( 12, -26); ctx.lineTo( 12, -12);
  ctx.stroke();
  ctx.strokeStyle = `rgba(57, 255, 236, ${puls})`;
  ctx.beginPath();
  ctx.moveTo(-7, -10); ctx.lineTo(7, -10);
  ctx.stroke();

  // Doorlopende cyaan visor
  ctx.fillStyle = "#12152b";
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 4, -FIG_H + 12, FIG_B - 8, 16, 7);
  ctx.fill();
  ctx.fillStyle = `rgba(57, 255, 236, ${0.7 + puls * 0.3})`;
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 8, -FIG_H + 18, FIG_B - 16, 5, 2.5);
  ctx.fill();

  // Led-kam bovenop (drie gloeiende punten)
  for (let i = -1; i <= 1; i++) {
    const gloed = 0.5 + Math.sin(tijd * 6 + i) * 0.5;
    ctx.fillStyle = `rgba(255, 62, 214, ${0.4 + gloed * 0.6})`;
    ctx.beginPath();
    ctx.moveTo(i * 9 - 4, -FIG_H + 8);
    ctx.lineTo(i * 9,     -FIG_H - 4 - gloed * 3);
    ctx.lineTo(i * 9 + 4, -FIG_H + 8);
    ctx.closePath();
    ctx.fill();
  }
}

/* ============ GEHEIME SKIN: Schaduwheld ============
   Alleen vrij te spelen met het codewoord EXPERT (werkblad
   Wereld 6). Een gehulde schim met een magenta-gevoerde cape,
   gloeiende cyaan ogen en een cyaan amulet. */
function tekenSkinSchaduwheld(ctx, tijd, stap) {
  const gloed = 0.65 + Math.sin(tijd * 4) * 0.35;      // ogen/amulet pulseren
  const wapper = Math.sin(tijd * 3) * 2 + stap * 0.4;  // cape golft mee

  /* Cape achter de figuur: magenta voering met donkerpaarse rand,
     onderaan gerafeld en zachtjes wapperend */
  ctx.fillStyle = "#d633b8";
  ctx.beginPath();
  ctx.moveTo(-10, -FIG_H + 10);
  ctx.quadraticCurveTo(-20 - wapper, -FIG_H / 2, -17 - wapper, -2);
  ctx.lineTo(-11, -6);
  ctx.lineTo(-6, -1);
  ctx.lineTo(0, -6);
  ctx.lineTo(6, -1);
  ctx.lineTo(11, -6);
  ctx.lineTo(17 + wapper, -2);
  ctx.quadraticCurveTo(20 + wapper, -FIG_H / 2, 10, -FIG_H + 10);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#3a2354";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  /* Laarzen met magenta zolen */
  ctx.fillStyle = "#2a1d3e";
  ctx.beginPath();
  ctx.ellipse(-8 + stap, -4, 7, 5, 0, 0, Math.PI * 2);
  ctx.ellipse( 8 - stap, -4, 7, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d633b8";
  ctx.fillRect(-14 + stap, -3, 12, 3);
  ctx.fillRect(  2 - stap, -3, 12, 3);

  /* Lijf (donker pak) */
  ctx.fillStyle = "#2a1d3e";
  ctx.beginPath();
  ctx.roundRect(-FIG_B / 2 + 3, -FIG_H + 10, FIG_B - 6, FIG_H - 16, 9);
  ctx.fill();
  ctx.strokeStyle = "#171025";
  ctx.lineWidth = 3;
  ctx.stroke();

  /* Riem met magenta gesp */
  ctx.fillStyle = "#171025";
  ctx.fillRect(-FIG_B / 2 + 4, -18, FIG_B - 8, 5);
  ctx.fillStyle = "#d633b8";
  ctx.beginPath();
  ctx.roundRect(-4, -19, 8, 7, 2);
  ctx.fill();

  /* Handschoenen met magenta manchetten */
  ctx.fillStyle = "#171025";
  ctx.beginPath();
  ctx.arc(-FIG_B / 2 + 2, -14, 4.5, 0, Math.PI * 2);
  ctx.arc( FIG_B / 2 - 2, -14, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#d633b8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-FIG_B / 2 + 2, -14, 5.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc( FIG_B / 2 - 2, -14, 5.5, 0, Math.PI * 2);
  ctx.stroke();

  /* Amulet op de borst (cyaan edelsteen, pulseert) */
  ctx.fillStyle = `rgba(57, 255, 236, ${0.35 * gloed})`;
  ctx.beginPath();
  ctx.arc(0, -26, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#39ffec";
  ctx.beginPath();
  ctx.moveTo(0, -31);
  ctx.lineTo(4, -26);
  ctx.lineTo(0, -20);
  ctx.lineTo(-4, -26);
  ctx.closePath();
  ctx.fill();

  /* Capuchon: puntige kap met magenta rand */
  ctx.fillStyle = "#3a2354";
  ctx.beginPath();
  ctx.moveTo(0, -FIG_H - 8);                          // punt bovenaan
  ctx.quadraticCurveTo(-15, -FIG_H - 2, -14, -FIG_H + 22);
  ctx.lineTo(14, -FIG_H + 22);
  ctx.quadraticCurveTo(15, -FIG_H - 2, 0, -FIG_H - 8);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#d633b8";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  /* Donker gezicht in de kap */
  ctx.fillStyle = "#0d0d16";
  ctx.beginPath();
  ctx.ellipse(0, -FIG_H + 14, 10, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  /* Gloeiende, schuine cyaan ogen */
  ctx.fillStyle = `rgba(57, 255, 236, ${gloed})`;
  ctx.beginPath();
  ctx.moveTo(-8, -FIG_H + 11);
  ctx.lineTo(-2, -FIG_H + 13);
  ctx.lineTo(-7, -FIG_H + 15);
  ctx.closePath();
  ctx.moveTo(8, -FIG_H + 11);
  ctx.lineTo(2, -FIG_H + 13);
  ctx.lineTo(7, -FIG_H + 15);
  ctx.closePath();
  ctx.fill();

  /* Klein gloeiend mondje */
  ctx.fillStyle = `rgba(57, 255, 236, ${0.8 * gloed})`;
  ctx.beginPath();
  ctx.roundRect(-3, -FIG_H + 18, 6, 2.5, 1.2);
  ctx.fill();
}
