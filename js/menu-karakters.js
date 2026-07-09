/* ============================================================
   MENU-KARAKTERS — Een echt stukje level als hoofdmenu.

   Het hoofdmenu rendert dezelfde canvas-stijl als de game zelf:
   achtergrond, platforms, verzamelobjecten en karakters gebruiken
   bestaande tekenfuncties/classes. Zo voelt het menu als onderdeel
   van de wereld, niet als een losse illustratie.
   ============================================================ */

const MenuKarakters = {
  gestart: false,
  checkpoint: null,

  start() {
    if (this.gestart) return;
    this.gestart = true;
    this.checkpoint = new Checkpoint({ x: 118 });
    this.checkpoint.actief = true;
    requestAnimationFrame((t) => this.teken(t / 1000));
  },

  teken(tijd) {
    const menu = document.getElementById("vg-scherm-menu");
    if (menu && !menu.classList.contains("vg-verborgen")) {
      this.tekenMenuLevel(tijd);
    }
    requestAnimationFrame((t) => this.teken(t / 1000));
  },

  tekenMenuLevel(tijd) {
    const canvas = document.getElementById("vg-menu-level-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Echte game-achtergrond: lucht, zon, wolken en parallax-heuvels.
    tekenAchtergrond(ctx, 0, tijd * 0.28);

    // 2. Levelgeometrie op exact dezelfde tekenstijl als de levels.
    const platforms = [
      { type: "grond", x: 0,   y: 480, w: 690, h: 60 },
      { type: "grond", x: 760, y: 480, w: 260, h: 60 },
      { type: "platform", x: 135, y: 370, w: 145, h: 24 },
      { type: "platform", x: 345, y: 315, w: 140, h: 24 },
      { type: "platform", x: 615, y: 370, w: 120, h: 24 },
      { type: "platform", x: 810, y: 410, w: 150, h: 24 }
    ];
    for (const p of platforms) tekenPlatform(ctx, p);

    const bewegend = new BewegendPlatform({
      as: "x", min: 575, max: 680, y: 286, w: 105, h: 22, duur: 4.5, fase: 0.8
    });
    bewegend.update(0, tijd);
    bewegend.teken(ctx, tijd);

    // 3. Echte objecten uit de gamewereld.
    this.checkpoint.teken(ctx, tijd);
    this.tekenVraagObject(ctx, tijd, 255, 480);
    this.tekenVraagObject(ctx, tijd, 410, 315);
    new Bol({ x: 670, y: 245 }).teken(ctx, tijd);
    new Bol({ x: 850, y: 342 }).teken(ctx, tijd + 0.7);
    tekenStekels(ctx, { x: 545, w: 64 });

    // 4. Echte karakters uit de game, op dezelfde grond/platforms.
    this.tekenVonk(ctx, tijd, 145, 480);
    this.tekenSlijm(ctx, tijd, 195, 452);
    this.tekenHapper(ctx, tijd, 730, 438);
    this.tekenBewaker(ctx, tijd, 858, 440);
  },

  tekenVraagObject(ctx, tijd, x, y) {
    const slot = new VraagObject({ x, y });
    slot.teken(ctx, tijd);
  },

  tekenVonk(ctx, tijd, x, onderY) {
    if (typeof tekenFiguur !== "function") return;

    ctx.save();
    ctx.translate(x, onderY);
    ctx.scale(2.65, 2.65);
    tekenFiguur(ctx, Opslag.skin || "standaard", tijd, {
      stap: Math.sin(tijd * 5) * 2.2,
      opGrond: true
    });
    ctx.restore();
  },

  tekenSlijm(ctx, tijd, x, y) {
    const slijm = new Slijm({ x, minX: x - 20, maxX: x + 70 });
    slijm.y = y;
    slijm.richting = Math.sin(tijd * 1.25) > 0 ? 1 : -1;
    slijm.fase = 0.5;
    slijm.teken(ctx, tijd);
  },

  tekenHapper(ctx, tijd, x, y) {
    const happer = new Happer({ x, hoogte: 90 });
    happer.fase = "sprong";
    happer.tSprong = 0.48 + Math.sin(tijd * 1.5) * 0.12;
    happer.baseX = x;
    happer.x = x - happer.w / 2;
    happer.y = y + Math.sin(tijd * 1.5) * 8;
    happer.surfaceY = 498;
    happer.teken(ctx, tijd);
  },

  tekenBewaker(ctx, tijd, x, y) {
    const bewaker = new Bewaker({ x, minX: x - 20, maxX: x + 70 });
    bewaker.y = y;
    bewaker.richting = -1;
    bewaker.fase = 0.2;
    bewaker.teken(ctx, tijd);
  }
};

document.addEventListener("DOMContentLoaded", () => MenuKarakters.start());
