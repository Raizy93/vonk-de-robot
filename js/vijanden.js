/* ============================================================
   VIJANDEN — Stuiterslijmpjes en zoemers.

   Beide kunnen verslagen worden door er bovenop te springen.
   Raak je ze van de zijkant, dan kost dat een energiehart.
   ============================================================ */

/* --- Slijmpje: kruipt heen en weer over de grond --- */
class Slijm {

  constructor(gegevens) {
    this.w = 38;
    this.h = 28;
    this.x = gegevens.x;
    this.y = 480 - this.h;          // staat op de grond
    this.minX = gegevens.minX;
    this.maxX = gegevens.maxX;
    this.snelheid = 60;
    this.richting = 1;
    this.dood = false;
    this.fase = Math.random() * 10; // eigen ritme voor de animatie
  }

  update(dt) {
    if (this.dood) return;

    this.x += this.richting * this.snelheid * dt;

    // Omdraaien bij de randen van het patrouillegebied
    if (this.x <= this.minX)          { this.x = this.minX; this.richting = 1; }
    if (this.x + this.w >= this.maxX) { this.x = this.maxX - this.w; this.richting = -1; }
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const K = CONFIG.kleuren;
    const wiebel = Math.sin(tijd * 6 + this.fase);
    const cx = this.x + this.w / 2;
    const onder = this.y + this.h;

    // Blubberig lijfje (halve druppel die meedeint)
    ctx.fillStyle = K.slijm;
    ctx.beginPath();
    ctx.ellipse(cx, onder, this.w / 2 + wiebel * 2, this.h - wiebel * 2, 0, Math.PI, 0);
    ctx.fill();
    ctx.strokeStyle = K.slijmDonker;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Oogjes (kijken in de looprichting)
    const kijk = this.richting * 3;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 8 + kijk, onder - 14, 5, 0, Math.PI * 2);
    ctx.arc(cx + 8 + kijk, onder - 14, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 8 + kijk * 1.5, onder - 14, 2.2, 0, Math.PI * 2);
    ctx.arc(cx + 8 + kijk * 1.5, onder - 14, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Zoemer: zweeft op en neer in de lucht --- */
class Zoemer {

  constructor(gegevens) {
    this.w = 34;
    this.h = 30;
    this.x = gegevens.x - this.w / 2;
    this.basisY = gegevens.basisY;
    this.amplitude = gegevens.amplitude;
    this.y = this.basisY;
    this.dood = false;
    this.fase = Math.random() * 10;
  }

  update(dt, tijd) {
    if (this.dood) return;
    // Zweeft in een sinusgolf op en neer
    this.y = this.basisY + Math.sin(tijd * 2 + this.fase) * this.amplitude - this.h / 2;
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const K = CONFIG.kleuren;
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const flap = Math.sin(tijd * 25 + this.fase) * 0.5;

    // Vleugeltjes (flapperen snel)
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.save();
    ctx.translate(cx, cy - 8);
    ctx.rotate(-0.5 + flap);
    ctx.beginPath();
    ctx.ellipse(-10, -6, 11, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.rotate(1.0 - flap * 2);
    ctx.beginPath();
    ctx.ellipse(10, -6, 11, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Rond lijfje met streepjes
    ctx.fillStyle = K.zoemer;
    ctx.beginPath();
    ctx.arc(cx, cy, this.w / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = K.zoemerDonker;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = K.zoemerDonker;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy - 12);
    ctx.lineTo(cx - 6, cy + 12);
    ctx.moveTo(cx + 6, cy - 12);
    ctx.lineTo(cx + 6, cy + 12);
    ctx.stroke();

    // Boze oogjes
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 4, 2.5, 0, Math.PI * 2);
    ctx.arc(cx + 5, cy - 4, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Stekelbol: een bal vol stekels die heen en weer (as "x")
       of op en neer (as "y") zweeft. LET OP: hier kun je NIET
       bovenop springen — elke aanraking doet pijn. Ontwijken dus!
       Leveldata: { type:"stekelbol", cx, cy, as, bereik, duur } --- */
class Stekelbol {

  constructor(gegevens) {
    this.w = 34;
    this.h = 34;
    this.cx = gegevens.cx;          // middelpunt van de beweging
    this.cy = gegevens.cy;
    this.as = gegevens.as || "x";
    this.bereik = gegevens.bereik;  // totale afstand heen-en-weer
    this.duur = gegevens.duur || 5;
    this.fase = gegevens.fase || 0;
    this.x = this.cx - this.w / 2;
    this.y = this.cy - this.h / 2;
    this.dood = false;
    this.stompbaar = false;         // erop springen helpt niet!
  }

  update(dt, tijd) {
    const offset = (this.bereik / 2) * Math.sin(tijd * 2 * Math.PI / this.duur + this.fase);
    if (this.as === "x") this.x = this.cx + offset - this.w / 2;
    else                 this.y = this.cy + offset - this.h / 2;
  }

  teken(ctx, tijd) {
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const K = CONFIG.kleuren;
    const draai = tijd * 1.5;       // de stekels draaien langzaam rond

    // Acht draaiende stekels
    ctx.fillStyle = K.stekelbolPunt;
    for (let i = 0; i < 8; i++) {
      const hoek = draai + i * Math.PI / 4;
      const px = cx + Math.cos(hoek) * 12;
      const py = cy + Math.sin(hoek) * 12;
      const tx = cx + Math.cos(hoek) * 22;
      const ty = cy + Math.sin(hoek) * 22;
      const zx = Math.cos(hoek + Math.PI / 2) * 4;
      const zy = Math.sin(hoek + Math.PI / 2) * 4;
      ctx.beginPath();
      ctx.moveTo(px + zx, py + zy);
      ctx.lineTo(tx, ty);
      ctx.lineTo(px - zx, py - zy);
      ctx.closePath();
      ctx.fill();
    }

    // De bal zelf
    ctx.fillStyle = K.stekelbol;
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = K.stekelbolPunt;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Boze oogjes (waarschuwing: gevaar!)
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 3, 3.5, 0, Math.PI * 2);
    ctx.arc(cx + 5, cy - 3, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 5, cy - 3, 1.7, 0, Math.PI * 2);
    ctx.arc(cx + 5, cy - 3, 1.7, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Tandwiel: de "slijm" van de Werkplaats (Wereld 2).
       Beweegt precies zoals een slijmpje (zelfde leveldata), maar
       ziet eruit als een rollend tandwiel — zo voelt Wereld 2 echt
       als een andere wereld. Ook gewoon stompbaar en zapbaar. --- */
class Tandwiel extends Slijm {

  constructor(gegevens) {
    super(gegevens);
    this.w = 34;
    this.h = 34;
    this.y = 480 - this.h;
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const hoek = this.x * 0.08;   // draait mee terwijl het rolt

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(hoek * this.richting);

    // Acht tanden rondom
    ctx.fillStyle = "#8d99ab";
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.rotate(i * Math.PI / 4);
      ctx.fillRect(-3.5, -19, 7, 8);
      ctx.restore();
    }

    // Het wiel zelf
    ctx.fillStyle = "#aab6c8";
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();

    // Boze oogjes (draaien niet mee, anders wordt hij duizelig)
    const kijk = this.richting * 3;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 5 + kijk, cy - 3, 4, 0, Math.PI * 2);
    ctx.arc(cx + 5 + kijk, cy - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 5 + kijk * 1.4, cy - 3, 1.8, 0, Math.PI * 2);
    ctx.arc(cx + 5 + kijk * 1.4, cy - 3, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Schroefdrone: de "zoemer" van de Werkplaats (Wereld 2).
       Zweeft op en neer zoals een zoemer (zelfde leveldata), maar
       is een koperen dronetje met een draaiende rotor. --- */
class Schroefdrone extends Zoemer {

  teken(ctx, tijd) {
    if (this.dood) return;

    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const spin = Math.sin(tijd * 28 + this.fase);   // snel draaiende rotor

    // Mastje + rotor
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx, cy - 15);
    ctx.stroke();
    ctx.fillStyle = "rgba(210, 220, 235, 0.85)";
    ctx.beginPath();
    ctx.ellipse(cx, cy - 16, Math.abs(spin) * 15 + 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Koperen lijfje
    ctx.fillStyle = "#c98a4a";
    ctx.beginPath();
    ctx.roundRect(this.x + 3, cy - 8, this.w - 6, 18, 8);
    ctx.fill();
    ctx.strokeStyle = "#8a5a30";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Klinknagels
    ctx.fillStyle = "#8a5a30";
    ctx.beginPath();
    ctx.arc(this.x + 8, cy + 6, 1.8, 0, Math.PI * 2);
    ctx.arc(this.x + this.w - 8, cy + 6, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Eén grote cameralens als oog
    ctx.fillStyle = "#fffdf5";
    ctx.beginPath();
    ctx.arc(cx, cy + 1, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8a5a30";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#d13a3a";
    ctx.beginPath();
    ctx.arc(cx, cy + 1, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Pootjes
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 7, cy + 10); ctx.lineTo(cx - 9, cy + 15);
    ctx.moveTo(cx + 7, cy + 10); ctx.lineTo(cx + 9, cy + 15);
    ctx.stroke();
  }
}

/* --- Kluisbot: de "slijm" van de Geheimenkluis (Wereld 3).
       Een kluisje op pootjes dat heen en weer patrouilleert —
       zelfde leveldata en gedrag als een slijmpje. --- */
class Kluisbot extends Slijm {

  constructor(gegevens) {
    super(gegevens);
    this.w = 34;
    this.h = 32;
    this.y = 480 - this.h;
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const cx = this.x + this.w / 2;
    const stap = Math.sin(tijd * 10 + this.fase) * 3;

    // Pootjes (trippelen)
    ctx.strokeStyle = "#3d4450";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 8 + stap, this.y + 24); ctx.lineTo(cx - 10 + stap, this.y + 32);
    ctx.moveTo(cx + 8 - stap, this.y + 24); ctx.lineTo(cx + 10 - stap, this.y + 32);
    ctx.stroke();

    // Kluisje
    ctx.fillStyle = "#5a6273";
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h - 5, 6);
    ctx.fill();
    ctx.strokeStyle = "#3d4450";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Gouden draaiknop
    ctx.strokeStyle = "#f2c14e";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, this.y + 16, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx, this.y + 16);
    ctx.lineTo(cx + Math.cos(tijd * 3) * 5, this.y + 16 + Math.sin(tijd * 3) * 5);
    ctx.stroke();

    // Boze oogjes bovenop
    const kijk = this.richting * 2;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(cx - 6 + kijk, this.y + 6, 3.5, 0, Math.PI * 2);
    ctx.arc(cx + 6 + kijk, this.y + 6, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 6 + kijk * 1.5, this.y + 6, 1.6, 0, Math.PI * 2);
    ctx.arc(cx + 6 + kijk * 1.5, this.y + 6, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Spiedoog: de "zoemer" van de Geheimenkluis (Wereld 3).
       Een zwevend spionnen-oog met vleugeltjes dat alles in de
       gaten houdt — zelfde gedrag als een zoemer. --- */
class Spiedoog extends Zoemer {

  teken(ctx, tijd) {
    if (this.dood) return;

    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const flap = Math.sin(tijd * 22 + this.fase) * 0.6;

    // Vleermuis-achtige vleugeltjes
    ctx.fillStyle = "rgba(90, 98, 115, 0.85)";
    for (const kant of [-1, 1]) {
      ctx.save();
      ctx.translate(cx + kant * 12, cy - 2);
      ctx.rotate(kant * (0.4 + flap));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(kant * 14, -10, kant * 16, 2);
      ctx.quadraticCurveTo(kant * 8, 4, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    // Het oog zelf
    ctx.fillStyle = "#fffdf5";
    ctx.beginPath();
    ctx.arc(cx, cy, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Iris die naar de speler-kant gluurt (heen en weer)
    const gluur = Math.sin(tijd * 1.3 + this.fase) * 4;
    ctx.fillStyle = "#8d4fc7";
    ctx.beginPath();
    ctx.arc(cx + gluur, cy, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx + gluur, cy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(cx + gluur - 1.5, cy - 2, 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Boos wenkbrauw-randje
    ctx.strokeStyle = "#5a6273";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 10, cy - 11);
    ctx.lineTo(cx + 10, cy - 13);
    ctx.stroke();
  }
}

/* --- Happer: een vis die uit het water springt (Wereld 4:
       Phishingrivier). Belangrijk voor de eerlijkheid: eerst
       verschijnen er SPETTERS aan het oppervlak (waarschuwing),
       daarna schiet de vis omhoog. Zo kan een kind anticiperen.

       Fasen: "duik" (onder water, ongevaarlijk) → "spetter"
       (spatten, telegraaf) → "sprong" (omhoog, gevaarlijk) → duik.
       Je kunt hem verslaan door er bovenop te springen of te zappen
       terwijl hij in de lucht is.
       Leveldata: { type:"happer", x, hoogte?, duikTijd?, fase? } --- */
class Happer {

  constructor(gegevens) {
    this.w = 38;
    this.h = 42;
    this.baseX = gegevens.x;
    this.x = gegevens.x - this.w / 2;
    this.surfaceY = 498;                       // wateroppervlak
    this.hoogte = gegevens.hoogte || 180;      // spronghoogte boven het water
    this.duikTijd = gegevens.duikTijd || 1.7;  // wachttijd onder water
    this.spetterTijd = 0.8;                    // duur van de waarschuwing
    this.sprongTijd = 1.3;                     // duur van de sprong
    this.dood = false;

    this.fase = "duik";
    this.timer = gegevens.fase || 0;           // startvertraging (variatie)
    this.tSprong = 0;
    this.y = 600;                              // begint onder water, uit beeld
    this.spatten = [];                         // groeiende spetter-ringen
    this.geluidGespeeld = false;
  }

  /* camX (optioneel): camerapositie. De spetter is alleen hoorbaar
     als de happer in beeld is — anders hoor je alle vissen van het
     hele level tegelijk. */
  update(dt, tijd, camX) {
    if (this.dood) return;

    // Spetter-ringen laten groeien en vervagen
    for (const s of this.spatten) { s.r += 40 * dt; s.leven -= dt; }
    this.spatten = this.spatten.filter(s => s.leven > 0);

    this.timer -= dt;

    if (this.fase === "duik") {
      this.y = 600;                            // veilig onder water
      if (this.timer <= 0) {
        this.fase = "spetter";
        this.timer = this.spetterTijd;
        this.maakSpat();
        const inBeeld = camX === undefined ||
          (this.baseX > camX - 40 && this.baseX < camX + CONFIG.canvasBreedte + 40);
        if (inBeeld) Geluid.spetter();
      }

    } else if (this.fase === "spetter") {
      this.y = 600;
      // Af en toe een nieuwe ring als opbouwende waarschuwing
      if (Math.random() < dt * 6) this.maakSpat();
      if (this.timer <= 0) {
        this.fase = "sprong";
        this.tSprong = 0;
        this.maakSpat();
        const inBeeld = camX === undefined ||
          (this.baseX > camX - 40 && this.baseX < camX + CONFIG.canvasBreedte + 40);
        if (inBeeld) Geluid.happerSpring();
      }

    } else if (this.fase === "sprong") {
      this.tSprong += dt;
      const p = this.tSprong / this.sprongTijd;          // 0..1
      const off = 4 * this.hoogte * p * (1 - p);         // paraboolsprong
      this.y = this.surfaceY - off;
      if (this.tSprong >= this.sprongTijd) {
        this.fase = "duik";
        this.timer = this.duikTijd;
        this.maakSpat();
        const inBeeld = camX === undefined ||
          (this.baseX > camX - 40 && this.baseX < camX + CONFIG.canvasBreedte + 40);
        if (inBeeld) Geluid.happerLand();
      }
    }
  }

  /* Een nieuwe spetter-ring aan het oppervlak toevoegen */
  maakSpat() {
    this.spatten.push({ r: 4, leven: 0.6 });
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const cx = this.baseX;

    // Spetter-ringen op het water (de waarschuwing)
    for (const s of this.spatten) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, s.leven)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(cx, this.surfaceY, s.r, s.r * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Waarschuwingsdruppels tijdens de spetter-fase
    if (this.fase === "spetter") {
      ctx.fillStyle = "rgba(200, 235, 255, 0.9)";
      for (let i = 0; i < 4; i++) {
        const hoek = tijd * 8 + i * 1.6;
        const dx = Math.cos(hoek) * 12;
        const dy = -Math.abs(Math.sin(tijd * 6 + i)) * 16;
        ctx.beginPath();
        ctx.arc(cx + dx, this.surfaceY + dy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      return;   // de vis zit nog onder water
    }

    if (this.fase !== "sprong") return;

    // De springende vis
    const K = CONFIG.kleuren;
    const bcx = this.x + this.w / 2;
    const bcy = this.y + this.h / 2;
    // Kantelt met de sprong mee: omhoog aan het begin, omlaag aan het eind
    const kantel = (this.tSprong / this.sprongTijd - 0.5) * 1.4;

    ctx.save();
    ctx.translate(bcx, bcy);
    ctx.rotate(kantel);

    // Staartvin
    ctx.fillStyle = K.happerDonker;
    ctx.beginPath();
    ctx.moveTo(-this.w / 2 + 2, 0);
    ctx.lineTo(-this.w / 2 - 8, -9);
    ctx.lineTo(-this.w / 2 - 8, 9);
    ctx.closePath();
    ctx.fill();

    // Lijf (druppelvorm)
    ctx.fillStyle = K.happer;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.w / 2, this.h / 2 - 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = K.happerDonker;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Lichte buik
    ctx.fillStyle = K.happerBuik;
    ctx.beginPath();
    ctx.ellipse(2, 6, this.w / 3, this.h / 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Rugvin
    ctx.fillStyle = K.happerDonker;
    ctx.beginPath();
    ctx.moveTo(-4, -this.h / 2 + 4);
    ctx.lineTo(4, -this.h / 2 - 4);
    ctx.lineTo(10, -this.h / 2 + 6);
    ctx.closePath();
    ctx.fill();

    // Boze oog
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(9, -4, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(11, -4, 2.4, 0, Math.PI * 2);
    ctx.fill();

    // Open, happende bek met tandjes
    ctx.strokeStyle = K.happerDonker;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.w / 2 - 4, 4, 6, -0.6, 1.4);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(this.w / 2 - 2, 0);
    ctx.lineTo(this.w / 2 + 1, 3);
    ctx.lineTo(this.w / 2 - 4, 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

/* --- Bewaker: de "slijm" van Accountstad (Wereld 5). Een
       bewakingsrobot die heen en weer patrouilleert over de
       stoep. Zelfde gedrag als een slijmpje. --- */
class Bewaker extends Slijm {

  constructor(gegevens) {
    super(gegevens);
    this.w = 34;
    this.h = 40;
    this.y = 480 - this.h;
  }

  teken(ctx, tijd) {
    if (this.dood) return;

    const K = CONFIG.kleuren;
    const cx = this.x + this.w / 2;
    const stap = Math.sin(tijd * 9 + this.fase) * 3;   // pootjes/loop

    // Beentjes
    ctx.strokeStyle = K.bewakerDonker;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 7 + stap, this.y + 30); ctx.lineTo(cx - 8 + stap, this.y + 40);
    ctx.moveTo(cx + 7 - stap, this.y + 30); ctx.lineTo(cx + 8 - stap, this.y + 40);
    ctx.stroke();

    // Lijf (uniform)
    ctx.fillStyle = K.bewaker;
    ctx.beginPath();
    ctx.roundRect(this.x + 3, this.y + 12, this.w - 6, 20, 5);
    ctx.fill();
    ctx.strokeStyle = K.bewakerDonker;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Badge/ster op de borst
    ctx.fillStyle = "#ffd23f";
    ctx.beginPath();
    ctx.arc(cx, this.y + 22, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Hoofd met pet-rand
    ctx.fillStyle = K.bewakerLicht;
    ctx.beginPath();
    ctx.roundRect(this.x + 6, this.y, this.w - 12, 14, 4);
    ctx.fill();
    ctx.strokeStyle = K.bewakerDonker;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.fillStyle = K.bewakerDonker;
    ctx.fillRect(this.x + 3, this.y + 4, this.w - 6, 3);   // klep van de pet

    // Strenge oogjes (kijken in de looprichting)
    const kijk = this.richting * 2;
    ctx.fillStyle = "#2b2b3a";
    ctx.beginPath();
    ctx.arc(cx - 4 + kijk, this.y + 10, 1.8, 0, Math.PI * 2);
    ctx.arc(cx + 4 + kijk, this.y + 10, 1.8, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* --- Camdrone: de "zoemer" van Accountstad (Wereld 5). Een
       zwevende bewakingscamera die op en neer deint. Zelfde
       gedrag als een zoemer. --- */
class Camdrone extends Zoemer {

  teken(ctx, tijd) {
    if (this.dood) return;

    const K = CONFIG.kleuren;
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    const spin = Math.sin(tijd * 26 + this.fase);        // rotor
    const knipper = Math.floor(tijd * 3 + this.fase) % 2 === 0;

    // Ophangbeugel + rotor bovenop
    ctx.strokeStyle = K.camdroneDonker;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy - 15);
    ctx.stroke();
    ctx.fillStyle = "rgba(210, 220, 235, 0.8)";
    ctx.beginPath();
    ctx.ellipse(cx, cy - 16, Math.abs(spin) * 13 + 3, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Camerabehuizing
    ctx.fillStyle = K.camdrone;
    ctx.beginPath();
    ctx.roundRect(this.x + 2, cy - 8, this.w - 4, 17, 5);
    ctx.fill();
    ctx.strokeStyle = K.camdroneDonker;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Lens (kijkt in de deinrichting)
    const kijk = Math.sin(tijd * 1.3 + this.fase) * 3;
    ctx.fillStyle = "#1b2233";
    ctx.beginPath();
    ctx.arc(cx + kijk, cy + 1, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#39d0ff";
    ctx.beginPath();
    ctx.arc(cx + kijk, cy + 1, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath();
    ctx.arc(cx + kijk - 1.5, cy - 0.5, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Knipperend opname-lampje
    ctx.fillStyle = knipper ? "#ff4a5a" : "#5a2530";
    ctx.beginPath();
    ctx.arc(this.x + this.w - 6, cy - 4, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* Maakt het juiste vijand-object op basis van de leveldata */
function maakVijand(gegevens) {
  if (gegevens.type === "happer")       return new Happer(gegevens);
  if (gegevens.type === "slijm")        return new Slijm(gegevens);
  if (gegevens.type === "zoemer")       return new Zoemer(gegevens);
  if (gegevens.type === "stekelbol")    return new Stekelbol(gegevens);
  if (gegevens.type === "tandwiel")     return new Tandwiel(gegevens);
  if (gegevens.type === "schroefdrone") return new Schroefdrone(gegevens);
  if (gegevens.type === "kluisbot")     return new Kluisbot(gegevens);
  if (gegevens.type === "spiedoog")     return new Spiedoog(gegevens);
  if (gegevens.type === "bewaker")      return new Bewaker(gegevens);
  if (gegevens.type === "camdrone")     return new Camdrone(gegevens);
  console.warn("Onbekend vijandtype:", gegevens.type);
  return null;
}
