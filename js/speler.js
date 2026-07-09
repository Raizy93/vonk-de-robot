/* ============================================================
   SPELER — Vonk de robot: bewegen, springen, schade, tekenen.
   ============================================================ */

class Speler {

  constructor(startX, startY) {
    this.w = CONFIG.spelerBreedte;
    this.h = CONFIG.spelerHoogte;
    this.skinId = "standaard";   // wordt gezet vanuit de game (Opslag.skin)
    this.reset(startX, startY);
  }

  /* Terug naar een (start/respawn)positie */
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.opGrond = false;
    this.kijkricht = 1;        // 1 = rechts, -1 = links
    this.coyote = 0;           // resterende coyote-tijd
    this.onkwetsbaar = 0;      // resterende onkwetsbaarheid na een tik
    this.terugstoot = 0;       // resterende knockback-tijd
    this.loopCyclus = 0;       // voor de loopanimatie
    this.landSquash = 0;       // 'plof'-effect bij het landen
  }

  update(dt, invoer, blokken) {
    /* --- Timers aftellen --- */
    if (this.onkwetsbaar > 0) this.onkwetsbaar -= dt;
    if (this.terugstoot > 0)  this.terugstoot -= dt;
    if (this.landSquash > 0)  this.landSquash -= dt * 4;

    /* --- Horizontaal bewegen (niet tijdens knockback) --- */
    if (this.terugstoot <= 0) {
      let richting = 0;
      if (invoer.links())  richting -= 1;
      if (invoer.rechts()) richting += 1;

      this.vx = richting * CONFIG.loopSnelheid;
      if (richting !== 0) this.kijkricht = richting;
    }

    /* --- Springen: coyote-tijd + sprongbuffer voor een fijn gevoel --- */
    this.coyote = this.opGrond ? CONFIG.coyoteTijd : this.coyote - dt;

    if (invoer.springBuffer > 0 && this.coyote > 0) {
      this.vy = -CONFIG.springKracht;
      this.coyote = 0;
      invoer.springBuffer = 0;
      Geluid.spring();
    }

    // Korte sprong: loslaten van de toets kapt de sprong af
    if (!invoer.springt() && this.vy < -CONFIG.korteSprong) {
      this.vy = -CONFIG.korteSprong;
    }

    /* --- Zwaartekracht --- */
    this.vy += CONFIG.zwaartekracht * dt;
    this.vy = Math.min(this.vy, CONFIG.maxValsnelheid);

    /* --- Bewegen + botsen met platforms/poorten --- */
    const wasInLucht = !this.opGrond;
    const res = beweegMetBotsing(this, blokken, dt);
    this.opGrond = res.grond;

    if (this.opGrond && wasInLucht) this.landSquash = 1;   // plof!

    /* --- Loopanimatie bijwerken --- */
    if (this.opGrond && Math.abs(this.vx) > 1) {
      this.loopCyclus += dt * 14;
    }
  }

  /* Een tik van een vijand of stekel: knockback + korte onkwetsbaarheid */
  krijgTik(vanRechts) {
    this.onkwetsbaar = CONFIG.onkwetsbaarTijd;
    this.terugstoot = 0.25;
    this.vx = vanRechts ? -CONFIG.terugstootX : CONFIG.terugstootX;
    this.vy = -CONFIG.terugstootY;
  }

  /* --- De speler tekenen met de gekozen skin (zie skins.js) --- */
  teken(ctx, tijd) {
    // Knipperen tijdens onkwetsbaarheid
    if (this.onkwetsbaar > 0 && Math.floor(tijd * 12) % 2 === 0) return;

    const cx = this.x + this.w / 2;

    // Squash & stretch: platter bij het landen
    const squash = Math.max(0, this.landSquash) * 0.18;
    const schaalY = 1 - squash;
    const schaalX = 1 + squash;

    ctx.save();
    ctx.translate(cx, this.y + this.h);            // draaipunt: onderkant
    ctx.scale(this.kijkricht * schaalX, schaalY);  // omdraaien + squash

    // Voetanimatie tijdens het lopen (stilstand in de lucht)
    const stap = this.opGrond ? Math.sin(this.loopCyclus) * 5 : 0;

    // De skin (standaard/robot/ridder/cyberheld) tekent de figuur
    tekenFiguur(ctx, this.skinId, tijd, { stap, opGrond: this.opGrond });

    ctx.restore();
  }
}
