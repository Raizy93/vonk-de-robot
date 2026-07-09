/* ============================================================
   CAMERA — Volgt de speler soepel door de wereld (scrolling).
   ============================================================ */

class Camera {

  constructor(wereldBreedte) {
    this.x = 0;
    this.wereldBreedte = wereldBreedte;
  }

  /* Volg de speler: die staat iets links van het midden,
     zodat je goed kunt zien wat er vóór je aankomt. */
  volg(speler, dt) {
    const doelX = speler.x + speler.w / 2 - CONFIG.canvasBreedte * 0.4;

    // Soepel naar het doel toe bewegen (lerp)
    this.x += (doelX - this.x) * Math.min(1, dt * 8);

    // Binnen de wereldgrenzen blijven
    this.x = Math.max(0, Math.min(this.x, this.wereldBreedte - CONFIG.canvasBreedte));
  }

  /* Meteen naar de speler springen (bij respawn/herstart) */
  centreerOp(speler) {
    this.x = speler.x + speler.w / 2 - CONFIG.canvasBreedte * 0.4;
    this.x = Math.max(0, Math.min(this.x, this.wereldBreedte - CONFIG.canvasBreedte));
  }
}
