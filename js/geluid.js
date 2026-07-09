/* ============================================================
   GELUID — Alle geluidseffecten via de WebAudio API.

   Er zijn geen geluidsbestanden nodig: elk effect is een kort
   toontje dat live wordt opgebouwd met oscillators. Zet geluid
   aan/uit met de 🔊-knop (wordt bewaard via Opslag).

   Eigen geluid toevoegen? Maak een methode die this.toon(...)
   aanroept en roep hem aan vanuit game.js.
   ============================================================ */

const Geluid = {

  audioCtx: null,
  bestanden: {},
  limieten: {
    "shoot.wav": 4,
    "enemyhit.wav": 3,
    "jump.wav": 2,
    "buttonclick.wav": 2,
    "happerjump.wav": 2,
    "happerlanding.wav": 2
  },

  /* Speel een WAV-effect af. Als laden of afspelen niet lukt,
     wordt het oorspronkelijke WebAudio-effect gebruikt. Elke sound
     heeft een kleine herbruikbare pool, zodat snel schieten niet
     voortdurend nieuwe Audio-objecten en geheugenafval aanmaakt. */
  speelBestand(naam, fallback, volume = 1) {
    if (!Opslag.geluidAan) return;

    try {
      if (!this.bestanden[naam]) {
        const aantal = this.limieten[naam] || 1;
        this.bestanden[naam] = {
          spelers: Array.from({ length: aantal }, () => {
            const audio = new Audio(`assets/audio/${naam}`);
            audio.preload = "auto";
            return audio;
          }),
          volgende: 0
        };
      }

      const pool = this.bestanden[naam];
      const vrij = pool.spelers.find(audio => audio.paused || audio.ended);
      const audio = vrij || pool.spelers[pool.volgende];
      pool.volgende = (pool.spelers.indexOf(audio) + 1) % pool.spelers.length;

      // Is de hele pool bezet, dan wordt alleen de oudste speler hergebruikt.
      // Zo blijft het aantal gelijktijdige audiokanalen altijd begrensd.
      if (!audio.paused) audio.pause();
      audio.currentTime = 0;
      audio.volume = Math.max(0, Math.min(1, volume));
      const gestart = audio.play();
      if (gestart && typeof gestart.catch === "function") {
        gestart.catch(() => fallback());
      }
    } catch (e) {
      fallback();
    }
  },

  /* AudioContext pas aanmaken na de eerste klik (browserregel) */
  zorgContext() {
    if (!this.audioCtx) {
      try {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return;   // geen audio-ondersteuning: stil verder spelen
      }
    }
    if (this.audioCtx.state === "suspended") this.audioCtx.resume();
  },

  /*
   * Bouwsteen: één toon.
   *   freq   : frequentie in Hz
   *   duur   : lengte in seconden
   *   opties : { type, volume, na (startvertraging), glijNaar (eindfrequentie) }
   */
  toon(freq, duur, opties = {}) {
    if (!Opslag.geluidAan) return;
    this.zorgContext();
    if (!this.audioCtx) return;

    const { type = "sine", volume = 0.12, na = 0, glijNaar = null } = opties;
    const t0 = this.audioCtx.currentTime + na;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glijNaar) osc.frequency.exponentialRampToValueAtTime(glijNaar, t0 + duur);

    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duur);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + duur + 0.02);
  },

  /* --- De effecten zelf --- */

  spring()     { this.speelBestand("jump.wav", () =>
                   this.toon(300, 0.18, { type: "square", volume: 0.012, glijNaar: 620 }),
                   0.10); },

  bol()        { this.speelBestand("getkeyorcoin.wav", () => {
                   this.toon(880, 0.10, { type: "triangle", volume: 0.04 });
                   this.toon(1320, 0.14, { type: "triangle", volume: 0.03, na: 0.06 });
                 }, 0.35); },

  goed()       { this.speelBestand("goodanswer.wav", () =>
                   [523, 659, 784, 1047].forEach((f, i) =>
                     this.toon(f, 0.16, { type: "triangle", volume: 0.055, na: i * 0.09 })),
                   0.50); },

  fout()       { this.speelBestand("wronganswer.wav", () =>
                   this.toon(220, 0.30, { type: "sawtooth", volume: 0.025, glijNaar: 170 }),
                   0.45); },

  /* Korte UI-tonen voor winkelacties en meldingen. Zo blijven de
     antwoordbestanden uitsluitend gekoppeld aan echte vragen. */
  bevestiging(){ [523, 659, 784, 1047].forEach((f, i) =>
                   this.toon(f, 0.16, { type: "triangle", volume: 0.055, na: i * 0.09 })); },

  weigering()  { this.toon(220, 0.30, { type: "sawtooth", volume: 0.025, glijNaar: 170 }); },

  schade()     { this.speelBestand("playerhurt.wav", () =>
                   this.toon(400, 0.25, { type: "sawtooth", volume: 0.035, glijNaar: 120 }),
                   0.25); },

  stomp()      { this.speelBestand("enemystomp.wav", () =>
                   this.toon(260, 0.15, { type: "square", volume: 0.04, glijNaar: 100 }),
                   0.20); },

  checkpoint() { this.speelBestand("checkpoint.wav", () => {
                   this.toon(660, 0.12, { type: "triangle", volume: 0.045 });
                   this.toon(880, 0.18, { type: "triangle", volume: 0.045, na: 0.10 });
                 }, 0.25); },

  poort()      { this.speelBestand("dooropen.wav", () =>
                   this.toon(200, 0.50, { type: "sine", volume: 0.09, glijNaar: 800 }),
                   0.40); },

  finish()     { this.speelBestand("finish.wav", () =>
                   [523, 659, 784, 659, 784, 1047].forEach((f, i) =>
                     this.toon(f, 0.18, { type: "triangle", volume: 0.11, na: i * 0.11 }))); },

  klik()       { this.speelBestand("buttonclick.wav", () =>
                   this.toon(520, 0.06, { type: "square", volume: 0.018 }),
                   0.10); },

  /* De zap-blaster (Wereld 2+) */
  zap()        { this.speelBestand("shoot.wav", () =>
                   this.toon(950, 0.14, { type: "square", volume: 0.015, glijNaar: 320 }),
                   0.12); },

  zapRaak()    { this.speelBestand("enemyhit.wav", () => {
                   this.toon(500, 0.08, { type: "triangle", volume: 0.025 });
                   this.toon(1000, 0.12, { type: "triangle", volume: 0.02, na: 0.05 });
                 }, 0.18); },

  /* Zap ketst af op een gepantserde stekelbol */
  zapAfketsen(){ this.speelBestand("ricochet.wav", () =>
                   this.toon(280, 0.12, { type: "square", volume: 0.03, glijNaar: 200 }),
                   0.18); },

  /* Alarm van een zoeklicht (Wereld 3): tuu-taa! */
  alarm()      { this.speelBestand("alarmsound.wav", () => {
                   this.toon(740, 0.16, { type: "square", volume: 0.03 });
                   this.toon(555, 0.20, { type: "square", volume: 0.03, na: 0.16 });
                 }, 0.45); },

  /* Plons: in het water vallen (Wereld 4) */
  plons()      { this.speelBestand("splash.wav", () =>
                   this.toon(520, 0.22, { type: "sine", volume: 0.045, glijNaar: 150 }),
                   0.18); },

  gameover()   { this.speelBestand("gameover.wav", () =>
                   this.toon(180, 0.65, { type: "sawtooth", volume: 0.035, glijNaar: 80 }),
                   0.40); },

  brokkel()    { this.speelBestand("crumble.wav", () =>
                   this.toon(150, 0.35, { type: "triangle", volume: 0.03, glijNaar: 70 }),
                   0.18); },

  vraagOpen()  { this.speelBestand("lockandquestionopen.wav", () => {
                   this.toon(420, 0.10, { type: "square", volume: 0.025 });
                   this.toon(720, 0.18, { type: "triangle", volume: 0.03, na: 0.08 });
                 }, 0.30); },

  happerSpring(){ this.speelBestand("happerjump.wav", () =>
                   this.toon(300, 0.16, { type: "sine", volume: 0.02, glijNaar: 650 }),
                   0.18); },

  happerLand() { this.speelBestand("happerlanding.wav", () =>
                   this.toon(430, 0.20, { type: "sine", volume: 0.025, glijNaar: 140 }),
                   0.18); },

  /* Spetter: de Happer maakt zich klaar om te springen */
  spetter()    { this.toon(300, 0.10, { type: "sine", volume: 0.02, glijNaar: 620 }); }
};
