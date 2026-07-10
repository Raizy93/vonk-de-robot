/* ============================================================
   MUZIEK — Achtergrondmuziek voor de game.

   Dit bestand wordt ALLEEN door index.html geladen, dus de
   muziek speelt niet in het leerkracht-dashboard.

   Zo voeg je je eigen muziek toe:
   1. Zet je mp3 in de map  assets/audio/
   2. Zorg dat de bestandsnaam hieronder klopt (BESTAND).

   De muziek:
   - loopt continu en zacht op de achtergrond,
   - start bij de eerste klik of toetsaanslag (browsers mogen
     audio pas afspelen na een handeling van de gebruiker),
   - heeft een eigen 🎵 Muziek aan/uit-knop, los van de
     geluidseffecten (SFX).

   Bestaat het bestand (nog) niet? Dan gebeurt er simpelweg
   niets — de game blijft gewoon werken.
   ============================================================ */

const Muziek = {

  BESTAND: "assets/audio/achtergrondmuziek.mp3",
  VOLUME: 0.14,         // zacht op de achtergrond (pas gerust aan naar smaak)

  audio: null,
  gestart: false,

  /* Eén keer aanroepen bij het opstarten (vanuit game.js) */
  init() {
    try {
      this.audio = new Audio(this.BESTAND);
      this.audio.loop = true;
      this.audio.volume = this.VOLUME;
      this.audio.preload = "auto";
    } catch (e) {
      this.audio = null;
      return;
    }

    // Browserregel: audio mag pas afspelen na een gebaar van de
    // gebruiker. We starten daarom bij de eerste klik/toets.
    const startBijGebaar = () => {
      this.start();
      window.removeEventListener("pointerdown", startBijGebaar);
      window.removeEventListener("keydown", startBijGebaar);
    };
    window.addEventListener("pointerdown", startBijGebaar);
    window.addEventListener("keydown", startBijGebaar);
  },

  start() {
    this.gestart = true;
    this.werkBij();
  },

  /* Muziek laten lopen of pauzeren op basis van de muziek-instelling.
     Wordt ook aangeroepen als de speler op de 🎵-knop klikt. */
  werkBij() {
    if (!this.audio || !this.gestart) return;
    if (Opslag.muziekAan) {
      const bezig = this.audio.play();
      if (bezig && typeof bezig.catch === "function") bezig.catch(() => {});
    } else {
      this.audio.pause();
    }
  }
};
