/* ============================================================
   INPUT — Toetsenbordbesturing.

   Links/rechts : pijltjes of A/D
   Springen     : spatie, pijltje omhoog of W
   Pauze        : P     Opnieuw: R
   ============================================================ */

class Invoer {

  constructor() {
    this.ingedrukt = {};      // welke toetsen zijn nu ingedrukt
    this.springBuffer = 0;    // 'onthoudt' een sprongdruk heel even

    window.addEventListener("keydown", (e) => this.bijKeyDown(e));
    window.addEventListener("keyup", (e) => this.bijKeyUp(e));
  }

  bijKeyDown(e) {
    const toets = e.key.toLowerCase();

    // Sprongdruk bufferen (alleen bij de eerste druk, niet bij herhaling)
    if (!e.repeat && (toets === " " || toets === "arrowup" || toets === "w")) {
      this.springBuffer = CONFIG.springBufferTijd;
    }

    this.ingedrukt[toets] = true;
  }

  bijKeyUp(e) {
    this.ingedrukt[e.key.toLowerCase()] = false;
  }

  /* Is dit een toets die de pagina laat scrollen? (voor preventDefault) */
  static isSpelToets(e) {
    const toets = e.key.toLowerCase();
    return [" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(toets);
  }

  links()   { return this.ingedrukt["arrowleft"]  || this.ingedrukt["a"]; }
  rechts()  { return this.ingedrukt["arrowright"] || this.ingedrukt["d"]; }
  springt() { return this.ingedrukt[" "] || this.ingedrukt["arrowup"] || this.ingedrukt["w"]; }

  /* De buffer telt af; de speler 'consumeert' hem bij het springen */
  update(dt) {
    if (this.springBuffer > 0) this.springBuffer -= dt;
  }

  reset() {
    this.ingedrukt = {};
    this.springBuffer = 0;
  }
}
