/* ============================================================
   OBJECTEN — Verzamelobjecten, vraagboeken, poorten,
   checkpoints, stekels, de finish en de platform-tekenstijl.
   ============================================================ */

/* --- Energiebol: het verzamelobject (deint op en neer) --- */
class Bol {

  constructor(gegevens) {
    this.cx = gegevens.x;      // middelpunt
    this.cy = gegevens.y;
    this.r = 10;
    this.gepakt = false;
    this.fase = (gegevens.x * 0.01) % (Math.PI * 2);   // eigen deinritme
  }

  /* Botsingsrechthoek (iets ruimer zodat pakken lekker aanvoelt) */
  get rechthoek() {
    return { x: this.cx - this.r - 2, y: this.cy - this.r - 2,
             w: this.r * 2 + 4, h: this.r * 2 + 4 };
  }

  teken(ctx, tijd) {
    if (this.gepakt) return;

    const K = CONFIG.kleuren;
    const y = this.cy + Math.sin(tijd * 3 + this.fase) * 4;

    // Zachte gloed
    ctx.fillStyle = K.bolGloed;
    ctx.beginPath();
    ctx.arc(this.cx, y, this.r + 7, 0, Math.PI * 2);
    ctx.fill();

    // De bol zelf
    ctx.fillStyle = K.bol;
    ctx.beginPath();
    ctx.arc(this.cx, y, this.r, 0, Math.PI * 2);
    ctx.fill();

    // Glansje
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    ctx.arc(this.cx - 3, y - 3, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Vraagobject: een gouden slotje dat het vraagvenster opent.
       Raak je het aan, dan verschijnt een wachtwoordvraag.
       Na het antwoord (goed of fout) verdwijnt het slotje,
       zodat dezelfde vraag niet blijft terugkomen. --- */
class VraagObject {

  constructor(gegevens) {
    this.w = 32;
    this.h = 36;
    this.x = gegevens.x - this.w / 2;
    this.y = gegevens.y - this.h;
    this.poortId = gegevens.poortId || null;   // optioneel: opent deze poort
    this.gebruikt = false;
  }

  teken(ctx, tijd) {
    if (this.gebruikt) return;

    const K = CONFIG.kleuren;
    const zweef = Math.sin(tijd * 2.5 + this.x) * 4;
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2 + zweef;

    ctx.save();
    ctx.translate(cx, cy);

    // Gouden gloed eromheen
    ctx.fillStyle = "rgba(230, 180, 50, 0.25)";
    ctx.beginPath();
    ctx.arc(0, 0, 27, 0, Math.PI * 2);
    ctx.fill();

    // Beugel (de boog bovenop het slot)
    ctx.strokeStyle = K.slotBeugel;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, -8, 9, Math.PI, 0);
    ctx.moveTo(-9, -8); ctx.lineTo(-9, -3);
    ctx.moveTo( 9, -8); ctx.lineTo( 9, -3);
    ctx.stroke();

    // Slotkast
    ctx.fillStyle = K.slot;
    ctx.beginPath();
    ctx.roundRect(-13, -4, 26, 22, 5);
    ctx.fill();
    ctx.strokeStyle = K.slotBeugel;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sleutelgat
    ctx.fillStyle = K.slotBeugel;
    ctx.beginPath();
    ctx.arc(0, 4, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(-1.5, 4, 3, 7);

    // Vraagteken-glinstering erboven
    const glinster = 0.5 + Math.sin(tijd * 5 + this.x) * 0.5;
    ctx.fillStyle = `rgba(255, 255, 255, ${glinster})`;
    ctx.beginPath();
    ctx.arc(10, -16, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

/* --- Poort: blokkeert de weg tot een vraag goed beantwoord is --- */
class Poort {

  constructor(gegevens) {
    this.id = gegevens.id;
    this.x = gegevens.x;
    this.y = gegevens.y;
    this.w = gegevens.w;
    this.h = gegevens.h;
    this.open = false;
    this.openheid = 0;    // 0 = dicht, 1 = helemaal open (animatie)
  }

  update(dt) {
    if (this.open && this.openheid < 1) {
      this.openheid = Math.min(1, this.openheid + dt * 1.5);
    }
  }

  /* Een open poort telt niet meer mee als muur */
  get isVast() { return this.openheid < 0.4; }

  teken(ctx, tijd) {
    if (this.openheid >= 1) return;

    const K = CONFIG.kleuren;
    const zichtbaarH = this.h * (1 - this.openheid);   // schuift omhoog open
    const y = this.y;

    // Energieveld
    const puls = 0.5 + Math.sin(tijd * 5) * 0.2;
    ctx.fillStyle = `rgba(91, 110, 225, ${0.55 * (1 - this.openheid) + 0.1})`;
    ctx.fillRect(this.x, y, this.w, zichtbaarH);

    // Streepjes in het veld
    ctx.strokeStyle = `rgba(255, 255, 255, ${puls})`;
    ctx.lineWidth = 3;
    for (let sy = y + 12; sy < y + zichtbaarH - 6; sy += 24) {
      ctx.beginPath();
      ctx.moveTo(this.x + 5, sy);
      ctx.lineTo(this.x + this.w - 5, sy);
      ctx.stroke();
    }

    // Randen
    ctx.strokeStyle = K.poort;
    ctx.lineWidth = 4;
    ctx.strokeRect(this.x, y, this.w, zichtbaarH);
  }
}

/* --- Checkpoint: een lantaarn die aangaat als respawnpunt --- */
class Checkpoint {

  constructor(gegevens) {
    this.x = gegevens.x;
    this.grondY = 480;
    this.w = 16;
    this.h = 80;
    this.actief = false;
  }

  /* Botsingszone: een ruime strook rond de lantaarn */
  get rechthoek() {
    return { x: this.x - 20, y: this.grondY - this.h, w: 56, h: this.h };
  }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;
    const topY = this.grondY - this.h;
    const kleur = this.actief ? K.checkpointAan : K.checkpointUit;

    // Paal
    ctx.fillStyle = "#5a6273";
    ctx.fillRect(this.x + 5, topY + 14, 6, this.h - 14);
    ctx.fillRect(this.x - 2, this.grondY - 6, 20, 6);   // voetje

    // Lamp
    if (this.actief) {
      const gloed = 0.35 + Math.sin(tijd * 4) * 0.15;
      ctx.fillStyle = `rgba(55, 224, 200, ${gloed})`;
      ctx.beginPath();
      ctx.arc(this.x + 8, topY + 8, 20, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = kleur;
    ctx.beginPath();
    ctx.arc(this.x + 8, topY + 8, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

/* --- Finish: het lichtportaal aan het einde van het level --- */
class Finish {

  constructor(gegevens) {
    this.w = 70;
    this.h = 110;
    this.x = gegevens.x - this.w / 2;
    this.y = 480 - this.h;
  }

  get rechthoek() { return { x: this.x, y: this.y, w: this.w, h: this.h }; }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2 + 8;

    // Draaiende gloedringen
    for (let i = 3; i >= 1; i--) {
      const puls = Math.sin(tijd * 3 + i) * 3;
      ctx.strokeStyle = `rgba(55, 224, 200, ${0.25 * i})`;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 14 + i * 8 + puls, 34 + i * 10 + puls, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Kern van het portaal
    ctx.fillStyle = K.finish;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 16, 38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 7, 22, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bordje "FINISH" erboven
    ctx.fillStyle = "#fffdf5";
    ctx.strokeStyle = "#2b3a8f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cx - 36, this.y - 26, 72, 22, 6);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2b3a8f";
    ctx.font = "bold 13px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("FINISH", cx, this.y - 10);
  }
}

/* --- Drijvend vlot: een houten vlot dat op het water deint
       (nieuw platform van Wereld 4: Phishingrivier). De speler
       lift automatisch mee, net als bij een bewegend platform.
       Leveldata: { type:"drijvend", x, y, w, amplitude?, duur? } --- */
class DrijvendPlatform {

  constructor(gegevens) {
    this.x = gegevens.x;
    this.baseY = gegevens.y;
    this.y = gegevens.y;
    this.w = gegevens.w;
    this.h = gegevens.h || 18;
    this.amplitude = gegevens.amplitude || 6;   // hoe ver het op en neer deint
    this.duur = gegevens.duur || 2.6;
    this.fase = gegevens.fase !== undefined ? gegevens.fase : gegevens.x * 0.012;
    this.dx = 0;   // een vlot deint alleen verticaal
    this.dy = 0;
  }

  update(dt, tijd) {
    const nieuwY = this.baseY +
      Math.sin(tijd * 2 * Math.PI / this.duur + this.fase) * this.amplitude;
    this.dy = nieuwY - this.y;
    this.y = nieuwY;
  }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;
    const kantel = Math.sin(tijd * 2 * Math.PI / this.duur + this.fase) * 0.03;

    ctx.save();
    ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
    ctx.rotate(kantel);
    ctx.translate(-this.w / 2, -this.h / 2);

    // Houten planken
    ctx.fillStyle = K.vlot;
    ctx.beginPath();
    ctx.roundRect(0, 0, this.w, this.h, 5);
    ctx.fill();
    ctx.strokeStyle = K.vlotDonker;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Plankverdeling + touwbindingen
    ctx.strokeStyle = K.vlotDonker;
    ctx.lineWidth = 1.5;
    for (let px = 14; px < this.w; px += 14) {
      ctx.beginPath();
      ctx.moveTo(px, 2); ctx.lineTo(px, this.h - 2);
      ctx.stroke();
    }
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(6, 4); ctx.lineTo(6, this.h - 4);
    ctx.moveTo(this.w - 6, 4); ctx.lineTo(this.w - 6, this.h - 4);
    ctx.stroke();

    ctx.restore();
  }
}

/* --- Water tekenen: een golvend, half doorzichtig watervlak dat
       een gat vult (Wereld 4). De kleuren komen uit het thema. --- */
function tekenWater(ctx, zone, tijd, kleuren) {
  const K = kleuren || CONFIG.kleuren;
  const top = 498;        // wateroppervlak
  const bodem = 540;      // onderkant van het speelveld

  // Diepte-vulling
  ctx.fillStyle = K.waterOnder;
  ctx.fillRect(zone.x, top, zone.w, bodem - top);

  // Golvend oppervlak (lichtere band bovenop)
  ctx.fillStyle = K.waterBoven;
  ctx.beginPath();
  ctx.moveTo(zone.x, top + 8);
  for (let x = zone.x; x <= zone.x + zone.w; x += 10) {
    const y = top + Math.sin(x * 0.06 + tijd * 2.2) * 3;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(zone.x + zone.w, top + 8);
  ctx.closePath();
  ctx.fill();

  // Glinsteringen die langzaam meedrijven
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = 2;
  for (let x = zone.x + 20; x < zone.x + zone.w - 10; x += 60) {
    const gx = x + Math.sin(tijd * 0.8 + x) * 6;
    const gy = top + 14 + Math.sin(x) * 4;
    ctx.beginPath();
    ctx.moveTo(gx, gy);
    ctx.lineTo(gx + 10, gy);
    ctx.stroke();
  }
}

/* --- Zoeklicht: een zwaaiende lichtbundel aan het plafond
       (nieuw obstakel van Wereld 3: Geheimenkluis). Sta je in
       het licht, dan gaat het alarm af en verlies je een hart —
       blijf dus in de schaduw, net als je geheimen!
       Leveldata: { cx, bereik, duur, fase? } — de bundel zwaait
       heen en weer rond cx over 'bereik' pixels. --- */
class Zoeklicht {

  constructor(gegevens) {
    this.cx = gegevens.cx;              // middelpunt van de zwaai
    this.bereik = gegevens.bereik;      // totale zwaai-afstand
    this.duur = gegevens.duur || 5;     // seconden per heen-en-weer
    this.fase = gegevens.fase || 0;
    this.breedte = gegevens.breedte || 46;
    this.x = this.cx - this.breedte / 2;
    this.alarm = 0;                     // > 0 = rood knipperen (net geraakt)
    this.bodemY = 480;                  // waar de bundel eindigt (zie update)
  }

  /* 'blokken' zijn de platforms: het licht stopt op het eerste
     platform dat het raakt — daaronder kun je veilig sluipen! */
  update(dt, tijd, blokken = []) {
    const offset = (this.bereik / 2) * Math.sin(tijd * 2 * Math.PI / this.duur + this.fase);
    this.x = this.cx + offset - this.breedte / 2;
    if (this.alarm > 0) this.alarm -= dt;

    // De bundel eindigt op het hoogste platform eronder (of de grond)
    this.bodemY = 540;
    const links = this.x + 4;
    const rechts = this.x + this.breedte - 4;
    for (const blok of blokken) {
      if (blok.x < rechts && blok.x + blok.w > links &&
          blok.y >= 60 && blok.y < this.bodemY) {
        this.bodemY = blok.y;
      }
    }
  }

  /* De raakzone: iets smaller dan de bundel en alleen tot waar
     het licht komt — onder een platform ben je veilig */
  get rechthoek() {
    return { x: this.x + 8, y: 70, w: this.breedte - 16,
             h: Math.max(0, this.bodemY - 70) };
  }

  teken(ctx, tijd) {
    const cx = this.x + this.breedte / 2;
    const rood = this.alarm > 0 && Math.floor(tijd * 10) % 2 === 0;
    const bodem = this.bodemY;

    // Rail aan het plafond waar de lamp langs schuift
    ctx.strokeStyle = "#3d4450";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.cx - this.bereik / 2 - 20, 34);
    ctx.lineTo(this.cx + this.bereik / 2 + 20, 34);
    ctx.stroke();

    // De bundel wordt breder naar onderen; als hij op een platform
    // stopt, is hij daar dus smaller dan op de grond
    const deel = (bodem - 48) / (480 - 48);
    const halfOnder = 9 + (this.breedte / 2 - 9) * deel;

    // De lichtbundel (half doorzichtig, tot aan het platform/de grond)
    ctx.fillStyle = rood ? "rgba(255, 90, 90, 0.35)" : "rgba(255, 230, 120, 0.25)";
    ctx.beginPath();
    ctx.moveTo(cx - 9, 48);
    ctx.lineTo(cx + 9, 48);
    ctx.lineTo(cx + halfOnder, bodem);
    ctx.lineTo(cx - halfOnder, bodem);
    ctx.closePath();
    ctx.fill();

    // Lichtvlek waar de bundel eindigt
    ctx.fillStyle = rood ? "rgba(255, 90, 90, 0.4)" : "rgba(255, 230, 120, 0.35)";
    ctx.beginPath();
    ctx.ellipse(cx, bodem, halfOnder + 6, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // De lamp zelf
    ctx.fillStyle = "#3d4450";
    ctx.beginPath();
    ctx.roundRect(cx - 12, 30, 24, 20, 6);
    ctx.fill();
    ctx.fillStyle = rood ? "#ff5a5a" : "#ffe27a";
    ctx.beginPath();
    ctx.ellipse(cx, 50, 9, 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Beveiligingslaser: een verticale laserstraal die aan/uit
       knippert (nieuw obstakel van Wereld 5: Accountstad). Loop
       erdoorheen als hij UIT is; raak je hem als hij AAN is, dan
       kost dat een hart. Er is eerst een korte WAARSCHUWING (rood
       geflikker) zodat je kunt anticiperen.

       De fase hangt af van 'tijd' (niet van dt), zodat de laser
       tijdens een vraag of pauze netjes bevriest en daarna precies
       verdergaat waar hij was.

       Leveldata: { x, y?, h?, aan?, uit?, fase? }
         y   : bovenkant van de straal (standaard 92)
         h   : hoogte van de straal (standaard tot de grond)
         aan : seconden dat de laser gevaarlijk is (standaard 1.2)
         uit : seconden dat de laser veilig is (standaard 1.7) --- */
class Beveiligingslaser {

  constructor(gegevens) {
    this.x = gegevens.x;
    this.top = gegevens.y !== undefined ? gegevens.y : 92;
    this.h = gegevens.h !== undefined ? gegevens.h : (480 - this.top);
    this.uitTijd = gegevens.uit || 1.7;
    this.waarschuwingTijd = 0.5;                 // korte telegraaf voor de sprong
    this.aanTijd = gegevens.aan || 1.2;
    this.fase = gegevens.fase || 0;
    this.breedte = 10;
  }

  /* Waar in de cyclus zitten we? "uit" (veilig) → "waarschuwing"
     (veilig, flikkert) → "aan" (gevaarlijk). */
  faseNu(tijd) {
    const cyclus = this.uitTijd + this.waarschuwingTijd + this.aanTijd;
    const p = ((tijd + this.fase) % cyclus + cyclus) % cyclus;
    if (p < this.uitTijd) return "uit";
    if (p < this.uitTijd + this.waarschuwingTijd) return "waarschuwing";
    return "aan";
  }

  isGevaarlijk(tijd) { return this.faseNu(tijd) === "aan"; }

  /* Smalle raakzone (iets smaller dan de straal, zodat het eerlijk voelt) */
  get rechthoek() {
    return { x: this.x - 3, y: this.top, w: 6, h: this.h };
  }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;
    const fase = this.faseNu(tijd);
    const cx = this.x;
    const onder = this.top + this.h;

    // Zenders boven en onder (kastjes)
    ctx.fillStyle = "#3a4152";
    ctx.beginPath();
    ctx.roundRect(cx - 8, this.top - 6, 16, 10, 3);
    ctx.roundRect(cx - 8, onder - 4, 16, 10, 3);
    ctx.fill();

    // Statuslampje in de zenders
    ctx.fillStyle = fase === "aan" ? "#ff4a5a" : (fase === "waarschuwing" ? "#ffb04a" : "#4ad07a");
    ctx.beginPath();
    ctx.arc(cx, this.top - 1, 2.5, 0, Math.PI * 2);
    ctx.arc(cx, onder + 1, 2.5, 0, Math.PI * 2);
    ctx.fill();

    if (fase === "uit") {
      // Veilig: alleen een dun stippellijntje
      ctx.strokeStyle = "rgba(255, 74, 90, 0.2)";
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(cx, this.top + 4); ctx.lineTo(cx, onder - 2);
      ctx.stroke();
      ctx.setLineDash([]);
      return;
    }

    // Waarschuwing: flikkerende dunne straal; Aan: dikke gloeiende straal
    const flikker = fase === "waarschuwing" ? (Math.floor(tijd * 20) % 2 === 0 ? 0.6 : 0.15) : 1;
    const dik = fase === "aan" ? this.breedte : 4;

    ctx.fillStyle = `rgba(255, 74, 90, ${0.3 * flikker})`;
    ctx.fillRect(cx - dik, this.top + 4, dik * 2, this.h - 6);   // gloed
    ctx.fillStyle = `rgba(255, 90, 100, ${0.9 * flikker})`;
    ctx.fillRect(cx - dik / 2, this.top + 4, dik, this.h - 6);   // kern
    ctx.fillStyle = `rgba(255, 235, 235, ${0.9 * flikker})`;
    ctx.fillRect(cx - 1.5, this.top + 4, 3, this.h - 6);         // felle binnenlijn
  }
}

/* --- Stekels tekenen (kristalpunten op de grond) --- */
function tekenStekels(ctx, stekel) {
  const K = CONFIG.kleuren;
  const punten = Math.floor(stekel.w / 16);

  for (let i = 0; i < punten; i++) {
    const px = stekel.x + i * 16;
    ctx.fillStyle = i % 2 === 0 ? K.stekel : K.stekelDonker;
    ctx.beginPath();
    ctx.moveTo(px, 480);
    ctx.lineTo(px + 8, 480 - 24);
    ctx.lineTo(px + 16, 480);
    ctx.closePath();
    ctx.fill();
  }
}

/* --- Bewegend platform: schuift heen en weer (of op en neer).
       De speler lift automatisch mee als hij erop staat.
       Leveldata: { type:"bewegend", as:"x"|"y", min, max, w,
                    y (bij as "x") of x (bij as "y"), duur, fase? }
       min/max zijn de linker- (as x) of bovenkant-posities (as y). --- */
class BewegendPlatform {

  constructor(gegevens) {
    this.as = gegevens.as;
    this.min = gegevens.min;
    this.max = gegevens.max;
    this.w = gegevens.w;
    this.h = gegevens.h || 20;
    this.duur = gegevens.duur || 4;     // seconden per heen-en-weer
    this.fase = gegevens.fase || 0;

    if (this.as === "x") { this.y = gegevens.y; this.x = this.min; }
    else                 { this.x = gegevens.x; this.y = this.min; }

    this.dx = 0;   // verplaatsing dit frame (voor het meeliften)
    this.dy = 0;
  }

  update(dt, tijd) {
    const midden = (this.min + this.max) / 2;
    const amplitude = (this.max - this.min) / 2;
    const positie = midden + amplitude * Math.sin(tijd * 2 * Math.PI / this.duur + this.fase);

    if (this.as === "x") { this.dx = positie - this.x; this.dy = 0; this.x = positie; }
    else                 { this.dy = positie - this.y; this.dx = 0; this.y = positie; }
  }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;

    // Metalen plank met klinknagels
    ctx.fillStyle = K.bewegend;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h, 6);
    ctx.fill();
    ctx.strokeStyle = K.bewegendRand;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = K.bewegendRand;
    for (const bx of [8, this.w - 8]) {
      ctx.beginPath();
      ctx.arc(this.x + bx, this.y + this.h / 2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pijltjes die de beweegrichting laten zien
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (this.as === "x") {
      ctx.moveTo(cx - 10, cy); ctx.lineTo(cx - 5, cy - 4);
      ctx.moveTo(cx - 10, cy); ctx.lineTo(cx - 5, cy + 4);
      ctx.moveTo(cx + 10, cy); ctx.lineTo(cx + 5, cy - 4);
      ctx.moveTo(cx + 10, cy); ctx.lineTo(cx + 5, cy + 4);
    } else {
      ctx.moveTo(cx - 8, cy); ctx.lineTo(cx - 4, cy - 4);
      ctx.moveTo(cx - 8, cy); ctx.lineTo(cx - 12, cy - 4);
      ctx.moveTo(cx + 8, cy); ctx.lineTo(cx + 4, cy + 4);
      ctx.moveTo(cx + 8, cy); ctx.lineTo(cx + 12, cy + 4);
    }
    ctx.stroke();
  }
}

/* --- Afbrokkelplatform: begint te trillen zodra je erop staat,
       stort dan in en komt na een paar seconden weer terug.
       Leveldata: { type:"brokkel", x, y, w } --- */
class BrokkelPlatform {

  constructor(gegevens) {
    this.x = gegevens.x;
    this.y = gegevens.y;
    this.w = gegevens.w;
    this.h = gegevens.h || 20;
    this.status = "heel";     // "heel" → "tril" → "weg" → weer "heel"
    this.timer = 0;
  }

  /* Alleen een heel of trillend platform is vast */
  get vast() { return this.status !== "weg"; }

  /* De speler staat erop: aftellen naar instorten */
  triggeer() {
    if (this.status === "heel") {
      this.status = "tril";
      this.timer = 0.7;       // trilt 0,7 s voordat het instort
    }
  }

  update(dt) {
    if (this.status === "tril") {
      this.timer -= dt;
      if (this.timer <= 0) {
        this.status = "weg";
        this.timer = 3;
        return true;   // precies dit frame stort het platform in
      }
    } else if (this.status === "weg") {
      this.timer -= dt;
      if (this.timer <= 0) this.status = "heel";
    }
    return false;
  }

  teken(ctx, tijd) {
    const K = CONFIG.kleuren;

    // Weg: alleen een vage stippellijn laten zien (komt terug!)
    if (this.status === "weg") {
      ctx.strokeStyle = "rgba(138, 106, 58, 0.35)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(this.x, this.y, this.w, this.h);
      ctx.setLineDash([]);
      return;
    }

    // Trillen: kleine willekeurige schudbeweging
    const schud = this.status === "tril" ? Math.sin(tijd * 60) * 2 : 0;

    ctx.save();
    ctx.translate(schud, 0);

    ctx.fillStyle = K.brokkel;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h, 5);
    ctx.fill();
    ctx.strokeStyle = K.brokkelRand;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Barsten in het hout
    ctx.strokeStyle = K.brokkelRand;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(this.x + this.w * 0.3, this.y + 2);
    ctx.lineTo(this.x + this.w * 0.4, this.y + this.h - 3);
    ctx.moveTo(this.x + this.w * 0.65, this.y + this.h - 2);
    ctx.lineTo(this.x + this.w * 0.75, this.y + 3);
    ctx.stroke();

    ctx.restore();
  }
}

/* --- Platforms tekenen ---
   kleuren (optioneel): het levelthema kan de grond- en platform-
   kleuren overschrijven (zie 'thema' in levels.js), zodat donkere
   levels ook een donkere vloer krijgen. --- */
function tekenPlatform(ctx, p, kleuren) {
  const K = kleuren || CONFIG.kleuren;

  if (p.type === "grond") {
    // Aarde
    ctx.fillStyle = K.grondAarde;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    // Graslaag met golfjes
    ctx.fillStyle = K.grondGras;
    ctx.fillRect(p.x, p.y, p.w, 12);
    ctx.beginPath();
    for (let gx = p.x; gx < p.x + p.w; gx += 24) {
      ctx.arc(Math.min(gx + 12, p.x + p.w), p.y + 12, 7, 0, Math.PI);
    }
    ctx.fill();
    // Steentjes in de aarde
    ctx.fillStyle = K.grondAardeRand;
    for (let gx = p.x + 18; gx < p.x + p.w - 12; gx += 57) {
      ctx.beginPath();
      ctx.arc(gx, p.y + 34, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Zwevend platform: houten plank met graslaagje
    ctx.fillStyle = K.platformHout;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 8);
    ctx.fill();
    ctx.fillStyle = K.platformTop;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, 10, [8, 8, 0, 0]);
    ctx.fill();
  }
}
