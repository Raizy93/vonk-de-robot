/* ============================================================
   GAME — De hoofdmodule: spelstatus, game-loop, botsingslogica,
   score/levens, sleutels, sterren en de HUD.

   Spelstatussen:
     "menu"     : hoofdmenu of een van de submenu's
     "spelen"   : het spel loopt
     "pauze"    : gepauzeerd
     "vraag"    : wachtwoordvraag is open (spel staat veilig stil)
     "bouwer"   : de wachtwoord-bouwer (na de finish)
     "gameover" : alle harten op
     "klaar"    : level voltooid (na de bouwer)

   Sleutelsysteem:
     sleutelsRonde        : verdiend in deze ronde (goede antwoorden
                            + bonus uit de wachtwoord-bouwer)
     Opslag.totaleSleutels: totaal, bewaard in localStorage
   Aan het einde van het level worden de sleutels van de ronde
   bij het totaal opgeteld.

   Sterren per ronde (beste resultaat wordt bewaard):
     ★     finish gehaald
     ★★    minstens de helft van de vragen goed
     ★★★   alle vragen goed
   ============================================================ */

class Spel {

  constructor() {
    this.canvas = document.getElementById("vg-canvas");
    this.ctx = this.canvas.getContext("2d");

    // Bewaarde spelstand (sleutels, skins, sterren, geluid) laden
    Opslag.laad();

    this.invoer = new Invoer();
    this.schermen = new Schermen();
    this.vraagModule = new VraagModule(() => this.hervatNaVraag());
    this.winkel = new Winkel(() => this.bijWinkelWijziging());
    Codewoord.init(this);   // het codewoord-scherm (eigen menuknop)
    Muziek.init();          // achtergrondmuziek (start bij eerste klik/toets)
    this.bouwer = new WachtwoordBouwer((bonus) => this.bouwerKlaar(bonus));

    this.status = "menu";
    this.tijd = 0;              // totale speltijd (voor animaties)
    this.vorigeFrame = 0;

    /* Zap-blaster (Wereld 2+): richten met de muis */
    this.muis = { x: CONFIG.canvasBreedte / 2, y: CONFIG.canvasHoogte / 2 };
    this.canvas.addEventListener("mousemove", (e) => this.bijMuisBeweging(e));
    this.canvas.addEventListener("mousedown", () => {
      if (this.wereld.blaster && this.status === "spelen") this.schiet();
    });

    this.koppelKnoppen();
    this.koppelToetsen();
    this.werkGeluidKnoppenBij();
    this.werkMuziekKnoppenBij();

    this.laadLevel(0, 0);
    this.naarMenu();

    requestAnimationFrame((t) => this.loop(t));
  }

  /* ---------- Level laden / herstarten ---------- */

  laadLevel(wereldIndex, levelIndex) {
    this.wereldIndex = wereldIndex;
    this.levelIndex = levelIndex;
    this.wereld = WERELDEN[wereldIndex];
    const data = this.wereld.levels[levelIndex];
    this.level = data;

    // Levelkleuren: het thema kan alles overschrijven (lucht, heuvels,
    // maar ook grond- en platformkleuren voor donkere levels)
    this.kleuren = { ...CONFIG.kleuren, ...(data.thema || {}) };

    // Alle levelobjecten opbouwen vanuit de data.
    // Platforms worden gesplitst op soort: vaste platforms (grond/
    // zwevend), bewegende platforms en afbrokkelplatforms.
    this.platforms = data.platforms.filter(p => p.type === "grond" || p.type === "zwevend");
    this.bewegendePlatforms = data.platforms
      .filter(p => p.type === "bewegend").map(p => new BewegendPlatform(p));
    this.brokkelPlatforms = data.platforms
      .filter(p => p.type === "brokkel").map(p => new BrokkelPlatform(p));
    this.drijvendePlatforms = data.platforms
      .filter(p => p.type === "drijvend").map(p => new DrijvendPlatform(p));

    this.waterZones    = data.water || [];   // watervlakken (Wereld 4)
    this.plonzen       = [];                  // plons-ringen als je in het water valt
    this.bollen        = data.bollen.map(b => new Bol(b));
    this.zoeklichten   = (data.zoeklichten || []).map(z => new Zoeklicht(z));
    this.lasers        = (data.lasers || []).map(l => new Beveiligingslaser(l));
    this.vraagobjecten = data.vraagobjecten.map(v => new VraagObject(v));
    this.poorten       = data.poorten.map(p => new Poort(p));
    this.checkpoints   = data.checkpoints.map(c => new Checkpoint(c));
    this.vijanden      = data.vijanden.map(v => maakVijand(v)).filter(v => v);
    this.finish        = new Finish(data.finish);

    // Speler (met de gekozen skin), camera, score en levens
    this.speler = new Speler(data.spelerStart.x, data.spelerStart.y);
    this.speler.skinId = Opslag.skin;
    this.camera = new Camera(data.breedte);
    this.camera.centreerOp(this.speler);

    this.score = 0;
    this.sleutelsRonde = 0;     // sleutels verdiend in deze ronde
    this.vragenGoed = 0;        // goed beantwoorde vragen (voor de sterren)
    this.vragenGeprobeerd = 0;  // geprobeerde vragen (voorwaarde voor de finish)
    this.finishMelding = 0;     // korte pauze tussen "finish dicht"-meldingen
    this.harten = CONFIG.startHarten;
    this.respawnPunt = { x: data.spelerStart.x, y: data.spelerStart.y };
    this.zwevendeTeksten = [];  // "+10"-effectjes

    // Blaster-toestand voor deze ronde
    this.projectielen = [];
    this.schietCooldown = 0;
    this.blasterHint = this.wereld.blaster ? 7 : 0;   // uitlegregel in beeld (s)

    // Nieuwe geschudde vragenstapel uit de vragenset van deze wereld;
    // geen dubbele vragen binnen één ronde
    this.vraagStapel = new VraagStapel(this.wereld.vragen);
    this.vraagModule.zetFeedback(this.wereld.feedbackGoed, this.wereld.feedbackFout);
  }

  volledigOpnieuw() {
    this.laadLevel(this.wereldIndex, this.levelIndex);
    this.invoer.reset();
    this.status = "spelen";
    this.schermen.toon(null);
  }

  /* ---------- Knoppen en toetsen ---------- */

  koppelKnoppen() {
    const knop = (id) => document.getElementById(id);

    /* Hoofdmenu */
    knop("vg-knop-menu-uitleg-ww").addEventListener("click", () => { Geluid.klik(); this.schermen.toon("uitlegWw"); });
    knop("vg-knop-menu-spelen").addEventListener("click", () => { Geluid.klik(); this.openWereldkiezer(); });
    knop("vg-knop-menu-speluitleg").addEventListener("click", () => { Geluid.klik(); this.schermen.toon("speluitleg"); });
    knop("vg-knop-menu-winkel").addEventListener("click", () => { Geluid.klik(); this.openWinkel(); });
    knop("vg-knop-menu-codewoord").addEventListener("click", () => { Geluid.klik(); Codewoord.open(); });

    /* Terug-knoppen: levels → werelden → menu */
    knop("vg-knop-terug-uitleg-ww").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-terug-speluitleg").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-terug-winkel").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-terug-codewoord").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-terug-werelden").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-terug-levels").addEventListener("click", () => this.openWereldkiezer());

    /* Pauze */
    knop("vg-knop-hervat").addEventListener("click", () => this.hervat());
    knop("vg-knop-herstart-pauze").addEventListener("click", () => this.volledigOpnieuw());
    knop("vg-knop-menu-pauze").addEventListener("click", () => this.naarMenu());

    /* Game-over en level-voltooid */
    knop("vg-knop-opnieuw-gameover").addEventListener("click", () => this.volledigOpnieuw());
    knop("vg-knop-menu-gameover").addEventListener("click", () => this.naarMenu());
    knop("vg-knop-opnieuw-klaar").addEventListener("click", () => this.volledigOpnieuw());
    knop("vg-knop-volgende-klaar").addEventListener("click", () => {
      if (this.volgendeRonde) this.startRonde(this.volgendeRonde.w, this.volgendeRonde.l);
    });
    knop("vg-knop-menu-klaar").addEventListener("click", () => this.naarMenu());

    /* Knopjes in beeld tijdens het spelen */
    knop("vg-knop-pauze").addEventListener("click", () => this.pauzeer());
    knop("vg-knop-herstart").addEventListener("click", () => this.volledigOpnieuw());

    /* Effecten (SFX) aan/uit — in spel én in het menu */
    knop("vg-knop-geluid").addEventListener("click", () => this.toggleGeluid());
    knop("vg-knop-geluid-menu").addEventListener("click", () => this.toggleGeluid());

    /* Muziek aan/uit — in spel én in het menu */
    knop("vg-knop-muziek").addEventListener("click", () => this.toggleMuziek());
    knop("vg-knop-muziek-menu").addEventListener("click", () => this.toggleMuziek());

    /* Volledig scherm (knop in het menu én tijdens het spelen) */
    knop("vg-knop-fullscreen").addEventListener("click", () => { Geluid.klik(); this.toggleVolledigScherm(); });
    knop("vg-knop-fullscreen-spel").addEventListener("click", () => { Geluid.klik(); this.toggleVolledigScherm(); });
    document.addEventListener("fullscreenchange", () => this.werkFullscreenKnoppenBij());
    document.addEventListener("webkitfullscreenchange", () => this.werkFullscreenKnoppenBij());
  }

  koppelToetsen() {
    window.addEventListener("keydown", (e) => {
      const toets = e.key.toLowerCase();

      // Voorkom dat de pagina scrolt door pijltjes/spatie tijdens het spel
      if (this.status === "spelen" && Invoer.isSpelToets(e)) e.preventDefault();

      if (toets === "r" && ["spelen", "pauze", "gameover", "klaar"].includes(this.status)) {
        this.volledigOpnieuw();
      }
      if (toets === "p") {
        if (this.status === "spelen") this.pauzeer();
        else if (this.status === "pauze") this.hervat();
      }
      if (toets === "enter") {
        if (this.status === "gameover" || this.status === "klaar") this.volledigOpnieuw();
      }
      // F = volledig scherm (maar niet terwijl je in een invoerveld typt,
      //     bijv. bij het codewoord, de klas-login of de bouwer)
      const inVeld = ["input", "textarea"].includes((e.target.tagName || "").toLowerCase());
      if (toets === "f" && !inVeld) this.toggleVolledigScherm();
    });
  }

  /* Volledig scherm aan/uit. We zetten de ROOT (<html>) op fullscreen
     zodat de game op 16:9 blijft (zie stijl.css) i.p.v. uitgerekt.
     Werkt ook binnen een iframe, mits die 'allow="fullscreen"' heeft. */
  toggleVolledigScherm() {
    const doc = document;
    const el = document.documentElement;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc);
    } else {
      const aan = el.requestFullscreen || el.webkitRequestFullscreen;
      if (aan) { try { aan.call(el); } catch (e) {} }
    }
  }

  /* De labels van de fullscreen-knoppen bijwerken (aan/verlaten) */
  werkFullscreenKnoppenBij() {
    const aan = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const menuKnop = document.getElementById("vg-knop-fullscreen");
    if (menuKnop) menuKnop.innerHTML = aan ? "⛶ Verlaten" : "⛶ Volledig scherm";
  }

  /* ---------- Statuswissels ---------- */

  /* Nieuwe ronde: score en ronde-sleutels op 0, totaal blijft staan */
  startRonde(wereldIndex, levelIndex) {
    Opslag.zetLaatsteLevel(wereldIndex, levelIndex);   // voor de leerkracht
    this.laadLevel(wereldIndex, levelIndex);
    this.status = "spelen";
    this.schermen.toon(null);
    this.invoer.reset();
  }

  naarMenu() {
    this.status = "menu";
    document.getElementById("vg-menu-sleutels").textContent = Opslag.totaleSleutels;
    if (window.KlasLogin) KlasLogin.vernieuwMenuKnop();
    this.schermen.toon("menu");
  }

  openWinkel() {
    this.winkel.render();
    this.schermen.toon("winkel");
  }

  /* Is dit level ontgrendeld? Het allereerste level is altijd open;
     daarna heb je 1 ster in het vorige level nodig (over de
     wereldgrens heen: een wereld opent na 1 ster in het laatste
     level van de wereld ervoor). */
  levelOntgrendeld(w, l) {
    // Klas-login actief? Dan bepaalt de leerkracht welke werelden
    // open zijn; binnen een open wereld geldt de gewone volgorde.
    if (window.Online && Online.leerling) {
      if (Online.leerling.openWerelden[w] !== true) return false;
      return l === 0 || Opslag.sterren(`${w}-${l - 1}`) >= 1;
    }
    if (w === 0 && l === 0) return true;
    if (l > 0) return Opslag.sterren(`${w}-${l - 1}`) >= 1;
    return Opslag.sterren(`${w - 1}-${WERELDEN[w - 1].levels.length - 1}`) >= 1;
  }

  /* Is deze wereld speelbaar? (gebouwd én ontgrendeld) */
  wereldSpeelbaar(w) {
    if (WERELDEN[w].beschikbaar === false) return false;
    if (window.Online && Online.leerling) {
      return Online.leerling.openWerelden[w] === true;
    }
    return this.levelOntgrendeld(w, 0);
  }

  /* Totaal behaalde sterren in een wereld (voor op de wereldkaart) */
  wereldSterren(w) {
    if (!WERELDEN[w].levels) return 0;
    return WERELDEN[w].levels.reduce((som, _, l) => som + Opslag.sterren(`${w}-${l}`), 0);
  }

  /* --- Wereldkiezer: de zes werelden naast elkaar, met plaatje --- */
  openWereldkiezer() {
    // Klas-login: even bij Supabase checken of de leerkracht net
    // werelden open/dicht heeft gezet, en dan opnieuw tekenen
    // (alleen als de wereldkiezer dan nog steeds open staat).
    if (window.Online && Online.leerling) {
      Online.ververs().then(() => {
        const scherm = document.getElementById("vg-scherm-werelden");
        if (!scherm.classList.contains("vg-verborgen")) this.renderWereldkiezer();
      });
    }
    this.renderWereldkiezer();
  }

  renderWereldkiezer() {
    const lijst = document.getElementById("vg-wereld-lijst");
    lijst.innerHTML = "";

    WERELDEN.forEach((wereld, w) => {
      const speelbaar = this.wereldSpeelbaar(w);
      const binnenkort = wereld.beschikbaar === false;

      const kaart = document.createElement("div");
      kaart.className = "vg-wereld-kaart" + (speelbaar ? "" : " vg-wereld-dicht");

      // Het wereldplaatje (canvas-tekening, zie werelden.js).
      // De plaatjes zijn getekend voor 96×64; we schalen ze naar
      // het compactere kaartformaat.
      const canvas = document.createElement("canvas");
      canvas.width = 72;
      canvas.height = 48;
      canvas.className = "vg-wereld-plaatje";
      const ictx = canvas.getContext("2d");
      ictx.scale(72 / 96, 48 / 64);
      wereld.icoon(ictx);
      kaart.appendChild(canvas);

      const nummer = document.createElement("p");
      nummer.className = "vg-level-nummer";
      nummer.textContent = `Wereld ${w + 1}`;
      kaart.appendChild(nummer);

      const naam = document.createElement("p");
      naam.className = "vg-level-naam";
      naam.textContent = wereld.naam;
      kaart.appendChild(naam);

      const doel = document.createElement("p");
      doel.className = "vg-wereld-doel";
      doel.textContent = wereld.leerdoel;
      kaart.appendChild(doel);

      // Status onderaan de kaart
      const status = document.createElement("p");
      status.className = "vg-wereld-status";
      if (binnenkort) {
        status.innerHTML = "&#128679; Binnenkort!";
      } else if (!speelbaar) {
        status.innerHTML = (window.Online && Online.leerling)
          ? "&#128274; Nog dicht — vraag je leerkracht"
          : `&#128274; Maak wereld ${w} af`;
      } else {
        const maxSterren = wereld.levels.length * 3;
        status.innerHTML =
          `<span class="vg-ster-goud">★</span> ${this.wereldSterren(w)}/${maxSterren}`;
      }
      kaart.appendChild(status);

      if (speelbaar) {
        // De hele kaart is klikbaar → naar de levels van deze wereld
        kaart.classList.add("vg-wereld-klikbaar");
        kaart.addEventListener("click", () => { Geluid.klik(); this.openLevelkiezer(w); });
      }

      lijst.appendChild(kaart);
    });

    this.schermen.toon("werelden");
  }

  /* --- Levelkiezer: alleen de levels van de gekozen wereld --- */
  openLevelkiezer(w) {
    const wereld = WERELDEN[w];
    document.getElementById("vg-levels-titel").textContent = wereld.titel;
    document.getElementById("vg-levels-leerdoel").innerHTML =
      wereld.leerdoel + (wereld.blaster ? " &middot; met zap-blaster! &#128171;" : "");

    const lijst = document.getElementById("vg-level-lijst");
    lijst.innerHTML = "";

    const grid = document.createElement("div");
    grid.className = "vg-level-grid";

    wereld.levels.forEach((level, l) => {
      const open = this.levelOntgrendeld(w, l);

      const kaart = document.createElement("div");
      kaart.className = "vg-level-kaart" + (open ? "" : " vg-level-dicht");

      kaart.innerHTML = `
        <p class="vg-level-nummer">Level ${l + 1}</p>
        <p class="vg-level-naam">${level.naam}</p>
        <p class="vg-level-sterren">${Schermen.sterrenHtml(Opslag.sterren(`${w}-${l}`))}</p>`;

      const knop = document.createElement("button");
      knop.className = "vg-knop" + (open ? " vg-knop-spelen" : "");
      if (open) {
        knop.innerHTML = "&#9654; Spelen";
        knop.addEventListener("click", () => { Geluid.klik(); this.startRonde(w, l); });
      } else {
        knop.innerHTML = "&#128274; Op slot";
        knop.disabled = true;
        const hint = document.createElement("p");
        hint.className = "vg-level-hint";
        hint.textContent = "Haal 1 ster in het level hiervoor";
        kaart.appendChild(hint);
      }
      kaart.appendChild(knop);
      grid.appendChild(kaart);
    });

    lijst.appendChild(grid);
    this.schermen.toon("levels");
  }

  /* Vanuit de winkel: skin gewijzigd of gekocht → speler bijwerken */
  bijWinkelWijziging() {
    this.speler.skinId = Opslag.skin;
  }

  /* Geluidseffecten (SFX) aan/uit */
  toggleGeluid() {
    Opslag.zetGeluid(!Opslag.geluidAan);
    this.werkGeluidKnoppenBij();
    Geluid.klik();   // bevestigingsklikje (alleen hoorbaar als het nu aan is)
  }

  /* Achtergrondmuziek aan/uit (los van de effecten) */
  toggleMuziek() {
    Opslag.zetMuziek(!Opslag.muziekAan);
    this.werkMuziekKnoppenBij();
    Muziek.werkBij();
    Geluid.klik();
  }

  werkGeluidKnoppenBij() {
    const aan = Opslag.geluidAan;
    const icoon = aan ? "\u{1F50A}" : "\u{1F507}";
    document.getElementById("vg-knop-geluid").textContent = icoon;
    document.getElementById("vg-knop-geluid-menu").textContent =
      `${icoon} Effecten: ${aan ? "aan" : "uit"}`;
  }

  werkMuziekKnoppenBij() {
    const aan = Opslag.muziekAan;
    const knopSpel = document.getElementById("vg-knop-muziek");
    knopSpel.classList.toggle("vg-uit", !aan);   // gedimd = uit
    document.getElementById("vg-knop-muziek-menu").textContent =
      `\u{1F3B5} Muziek: ${aan ? "aan" : "uit"}`;
  }

  pauzeer()        { this.status = "pauze";  this.schermen.toon("pauze"); }
  hervat()         { this.status = "spelen"; this.schermen.toon(null); this.invoer.reset(); }
  hervatNaVraag()  { this.status = "spelen"; this.invoer.reset(); }

  naarGameover() {
    this.status = "gameover";
    Geluid.gameover();
    this.schermen.zetGameoverScore(this.score, this.sleutelsRonde);
    this.schermen.toon("gameover");
  }

  /* Finish geraakt: eerst de wachtwoord-bouwer, dan het eindscherm */
  naarBouwer() {
    this.status = "bouwer";
    Geluid.finish();
    this.schermen.toon("bouwer");
    this.bouwer.open();
  }

  /* De bouwer is klaar: bonus erbij en door naar het eindscherm */
  bouwerKlaar(bonusSleutels) {
    this.sleutelsRonde += bonusSleutels;
    this.naarKlaar();
  }

  /* Level voltooid: sterren bepalen, sleutels bewaren, scherm tonen */
  naarKlaar() {
    this.status = "klaar";

    // Sterren: 1 = finish, 2 = helft van de vragen goed, 3 = alles goed
    const totaalVragen = this.vraagobjecten.length;
    let sterren = 1;
    if (this.vragenGoed >= Math.ceil(totaalVragen / 2)) sterren = 2;
    if (this.vragenGoed === totaalVragen) sterren = 3;
    Opslag.zetSterren(`${this.wereldIndex}-${this.levelIndex}`, sterren);

    // Sleutels van deze ronde bij het totaal optellen (localStorage)
    Opslag.voegSleutelsToe(this.sleutelsRonde);

    this.schermen.zetKlaarScore(this.score, this.sleutelsRonde,
                                Opslag.totaleSleutels, sterren);

    // Wat is de volgende ronde? Volgend level, of level 1 van de
    // volgende (gebouwde!) wereld — of niets (dan verdwijnt de knop).
    this.volgendeRonde = null;
    if (this.levelIndex + 1 < this.wereld.levels.length) {
      this.volgendeRonde = { w: this.wereldIndex, l: this.levelIndex + 1 };
    } else if (this.wereldIndex + 1 < WERELDEN.length &&
               this.wereldSpeelbaar(this.wereldIndex + 1)) {
      // (wereldSpeelbaar houdt óók rekening met werelden die de
      //  leerkracht via de klas-login dicht heeft gezet)
      this.volgendeRonde = { w: this.wereldIndex + 1, l: 0 };
    }

    const volgendeKnop = document.getElementById("vg-knop-volgende-klaar");
    volgendeKnop.classList.toggle("vg-verborgen", !this.volgendeRonde);
    if (this.volgendeRonde) {
      volgendeKnop.innerHTML = this.volgendeRonde.w !== this.wereldIndex
        ? `&#9654; Naar ${WERELDEN[this.volgendeRonde.w].titel}!`
        : "&#9654; Volgende level";
    }

    this.schermen.toon("klaar");
  }

  /* ---------- De game-loop ---------- */

  loop(t) {
    // Delta-tijd in seconden, begrensd zodat lag geen rare sprongen geeft
    const dt = Math.min((t - this.vorigeFrame) / 1000, 1 / 30);
    this.vorigeFrame = t;

    // De wereldklok (this.tijd) staat stil tijdens een vraag of pauze.
    // Vijanden als zoemers en stekelbollen bewegen op deze klok; door
    // hem te bevriezen gaan ze daarna precies verder waar ze waren,
    // in plaats van naar een nieuwe plek te springen. Een echte pauze.
    if (this.status !== "vraag" && this.status !== "pauze") {
      this.tijd += dt;
    }

    if (this.status === "spelen") this.update(dt);
    this.teken();

    // In de winkel: de skin-previews levend houden
    if (!this.schermen.schermen.winkel.classList.contains("vg-verborgen")) {
      this.winkel.tekenPreviews(this.tijd);
    }

    requestAnimationFrame((t2) => this.loop(t2));
  }

  /* ---------- Spellogica per frame ---------- */

  update(dt) {
    this.invoer.update(dt);

    /* Bewegende platforms eerst verplaatsen; staat de speler erop
       (voetjes vlak bij de bovenkant en niet omhoog springend), dan
       plakt hij aan het platform vast en lift hij automatisch mee. */
    // Bewegende platforms én drijvende vlotten: de speler lift mee
    for (const p of [...this.bewegendePlatforms, ...this.drijvendePlatforms]) {
      p.update(dt, this.tijd);
      const vorigeLinks = p.x - p.dx;
      const vorigeTop = p.y - p.dy;
      const sp = this.speler;
      if (sp.vy >= 0 &&
          sp.x + sp.w > vorigeLinks && sp.x < vorigeLinks + p.w &&
          Math.abs(sp.y + sp.h - vorigeTop) < 6) {
        sp.x += p.dx;
        sp.y = p.y - sp.h;   // voetjes op de bovenkant houden
      }
    }

    // Vaste blokken: platforms + bewegende platforms + drijvende
    // vlotten + hele afbrokkelplatforms + dichte poorten
    const blokken = [
      ...this.platforms,
      ...this.bewegendePlatforms,
      ...this.drijvendePlatforms,
      ...this.brokkelPlatforms.filter(b => b.vast),
      ...this.poorten.filter(p => p.isVast)
    ];

    this.speler.update(dt, this.invoer, blokken);

    /* Zap-blaster: projectielen bewegen en raken (alleen Wereld 2+) */
    if (this.wereld.blaster) this.updateProjectielen(dt, blokken);
    if (this.blasterHint > 0) this.blasterHint -= dt;

    /* Afbrokkelplatforms: gaan trillen zodra de speler erop staat */
    for (const b of this.brokkelPlatforms) {
      if (b.update(dt)) Geluid.brokkel();
      if (b.status === "heel" && this.speler.opGrond &&
          this.speler.x + this.speler.w > b.x && this.speler.x < b.x + b.w &&
          Math.abs(this.speler.y + this.speler.h - b.y) < 3) {
        b.triggeer();
      }
    }

    // Niet buiten de linker-/rechterrand van de wereld lopen
    this.speler.x = Math.max(0, Math.min(this.speler.x, this.level.breedte - this.speler.w));

    for (const vijand of this.vijanden) vijand.update(dt, this.tijd, this.camera.x);
    for (const poort of this.poorten) poort.update(dt);
    for (const z of this.zoeklichten) z.update(dt, this.tijd, blokken);

    this.controleerBollen();
    this.controleerVraagobjecten();
    this.controleerVijanden();
    this.controleerStekels();
    this.controleerZoeklichten();
    this.controleerLasers();
    this.controleerWater();
    this.controleerCheckpoints();
    this.controleerVallen();
    this.controleerFinish();

    this.camera.volg(this.speler, dt);

    if (this.finishMelding > 0) this.finishMelding -= dt;

    // Plons-ringen laten uitdijen en vervagen
    for (const p of this.plonzen) { p.r += 60 * dt; p.leven -= dt; }
    this.plonzen = this.plonzen.filter(p => p.leven > 0);

    // "+10"-tekstjes omhoog laten zweven
    for (const t of this.zwevendeTeksten) { t.y -= 40 * dt; t.tijd -= dt; }
    this.zwevendeTeksten = this.zwevendeTeksten.filter(t => t.tijd > 0);
  }

  /* --- Energiebollen pakken (geven score) --- */
  controleerBollen() {
    for (const bol of this.bollen) {
      if (!bol.gepakt && rechthoekenRaken(this.speler, bol.rechthoek)) {
        bol.gepakt = true;
        this.score += CONFIG.puntenBol;
        Geluid.bol();
        this.toonTekst(bol.cx, bol.cy - 14, `+${CONFIG.puntenBol}`);
      }
    }
  }

  /* --- Vraagobjecten (slotjes): open het wachtwoordvraagvenster --- */
  controleerVraagobjecten() {
    for (const object of this.vraagobjecten) {
      if (!object.gebruikt && rechthoekenRaken(this.speler, object)) {
        this.status = "vraag";        // spel staat stil zolang de vraag open is
        this.invoer.reset();

        // Willekeurige vraag; komt in deze ronde niet nog een keer voor
        const vraag = this.vraagStapel.volgende();
        Geluid.vraagOpen();
        this.vraagModule.open(vraag, (goed) => this.bijAntwoord(goed, object));
        return;   // één vraag tegelijk
      }
    }
  }

  /* Het antwoord op een wachtwoordvraag is gegeven */
  bijAntwoord(goed, object) {
    // Het slotje verdwijnt altijd, zodat de vraag niet terugkomt
    object.gebruikt = true;
    this.vragenGeprobeerd++;   // telt mee voor de finish-voorwaarde

    // Statistiek per wereld bijhouden (het leerkracht-dashboard
    // toont hiervan het percentage goed)
    Opslag.telVraag(this.wereldIndex, goed);

    if (goed) {
      this.vragenGoed++;
      this.sleutelsRonde += CONFIG.sleutelsPerGoedAntwoord;
      Geluid.goed();
      this.toonTekst(object.x + object.w / 2, object.y - 12,
                     `+${CONFIG.sleutelsPerGoedAntwoord} sleutel`);
    } else {
      Geluid.fout();
    }

    // Hoort er een poort bij dit slotje? Die gaat na de vraag open
    // (ook bij een fout antwoord, anders komt de speler nooit verder —
    //  de sleutel verdien je alleen met een goed antwoord).
    if (object.poortId) {
      const poort = this.poorten.find(p => p.id === object.poortId);
      if (poort) { poort.open = true; Geluid.poort(); }
    }
  }

  /* --- Vijanden: erop springen = verslaan, aanraken = au --- */
  controleerVijanden() {
    for (const vijand of this.vijanden) {
      if (vijand.dood || !rechthoekenRaken(this.speler, vijand)) continue;

      const spelerVoeten = this.speler.y + this.speler.h;
      const raaktBovenkant = this.speler.vy > 120 &&
                             spelerVoeten < vijand.y + vijand.h * 0.6;

      // Stekelbollen kun je NIET verslaan door erop te springen
      if (raaktBovenkant && vijand.stompbaar !== false) {
        // Bovenop gesprongen: vijand verslagen + stuiter omhoog
        vijand.dood = true;
        this.speler.vy = -CONFIG.springKracht * 0.55;
        this.score += CONFIG.puntenVijand;
        Geluid.stomp();
        this.toonTekst(vijand.x + vijand.w / 2, vijand.y - 10, `+${CONFIG.puntenVijand}`);
      } else {
        // Zijkant geraakt: energiehart kwijt
        const vanRechts = vijand.x + vijand.w / 2 > this.speler.x + this.speler.w / 2;
        this.raakSchade(vanRechts);
      }
    }
  }

  /* --- Stekels --- */
  controleerStekels() {
    for (const stekel of this.level.stekels) {
      // Iets kleinere botsingszone zodat het eerlijk voelt
      const zone = { x: stekel.x + 4, y: stekel.y + 6, w: stekel.w - 8, h: 18 };
      if (rechthoekenRaken(this.speler, zone)) {
        this.raakSchade(false);
        return;
      }
    }
  }

  /* --- Zoeklichten: in het licht staan = alarm + hart kwijt --- */
  controleerZoeklichten() {
    for (const z of this.zoeklichten) {
      if (rechthoekenRaken(this.speler, z.rechthoek)) {
        if (this.speler.onkwetsbaar <= 0) {
          z.alarm = 1;        // de lamp knippert rood
          Geluid.alarm();
        }
        this.raakSchade(false);
        return;
      }
    }
  }

  /* --- Beveiligingslasers: sta je in een AAN-staande laser, dan
         kost dat een hart. Loop erdoor als hij uit is! --- */
  controleerLasers() {
    if (this.speler.onkwetsbaar > 0) return;
    for (const l of this.lasers) {
      if (l.isGevaarlijk(this.tijd) && rechthoekenRaken(this.speler, l.rechthoek)) {
        this.raakSchade(false);
        return;
      }
    }
  }

  /* --- Water: in het moeraswater vallen kost een hart + respawn.
         Triggert net onder het oppervlak, zodat je op een vlot
         (dat op het water deint) veilig blijft staan. --- */
  controleerWater() {
    if (this.speler.onkwetsbaar > 0) return;
    const voeten = this.speler.y + this.speler.h;
    if (voeten < 506) return;                 // ruim boven het water: veilig

    for (const w of this.waterZones) {
      if (this.speler.x + this.speler.w > w.x && this.speler.x < w.x + w.w) {
        Geluid.plons();
        this.maakPlons(this.speler.x + this.speler.w / 2);
        this.respawnNaVal();
        return;
      }
    }
  }

  /* Een paar plons-ringen op het wateroppervlak maken */
  maakPlons(x) {
    for (let i = 0; i < 3; i++) this.plonzen.push({ x, r: 4 + i * 6, leven: 0.6 });
  }

  /* --- Checkpoints activeren --- */
  controleerCheckpoints() {
    for (const cp of this.checkpoints) {
      if (!cp.actief && rechthoekenRaken(this.speler, cp.rechthoek)) {
        cp.actief = true;
        this.respawnPunt = { x: cp.x, y: cp.grondY - this.speler.h };
        Geluid.checkpoint();
        this.toonTekst(cp.x + 8, cp.grondY - cp.h - 14, "Checkpoint!");
      }
    }
  }

  /* --- In een gat gevallen (van het scherm af) --- */
  controleerVallen() {
    if (this.speler.y > CONFIG.canvasHoogte + 120) {
      this.respawnNaVal();
    }
  }

  /* Hart kwijt en terug naar het laatste checkpoint (of het startpunt) */
  respawnNaVal() {
    this.harten--;
    if (this.harten <= 0) { this.naarGameover(); return; }

    Geluid.schade();
    this.speler.reset(this.respawnPunt.x, this.respawnPunt.y);
    this.speler.skinId = Opslag.skin;
    this.speler.onkwetsbaar = CONFIG.onkwetsbaarTijd;
    this.camera.centreerOp(this.speler);
  }

  /* Hoeveel vragen moet de speler minstens geprobeerd hebben?
     (nooit meer dan er slotjes in het level zitten) */
  get vragenNodig() {
    return Math.min(CONFIG.minVragenVoorFinish, this.vraagobjecten.length);
  }

  /* --- Finish bereikt: alleen door als er genoeg slotjes zijn
         geprobeerd, anders een vriendelijke herinnering --- */
  controleerFinish() {
    if (!rechthoekenRaken(this.speler, this.finish.rechthoek)) return;

    if (this.vragenGeprobeerd >= this.vragenNodig) {
      // De wachtwoord-bouwer hoort bij de Werkplaats (Wereld 2);
      // in andere werelden ga je direct naar het eindscherm.
      if (this.wereld.bouwer) {
        this.naarBouwer();
      } else {
        Geluid.finish();
        this.naarKlaar();
      }
    } else if (this.finishMelding <= 0) {
      const nog = this.vragenNodig - this.vragenGeprobeerd;
      this.toonTekst(this.finish.x + this.finish.w / 2, this.finish.y - 60,
                     `Probeer eerst nog ${nog} slotje${nog > 1 ? "s" : ""}!`);
      Geluid.weigering();
      this.finishMelding = 2;   // niet elke frame opnieuw melden
    }
  }

  /* --- Schade krijgen (vijand of stekel) --- */
  raakSchade(vanRechts) {
    if (this.speler.onkwetsbaar > 0) return;   // net al geraakt

    this.harten--;
    if (this.harten <= 0) { this.naarGameover(); return; }

    Geluid.schade();
    this.speler.krijgTik(vanRechts);
  }

  /* --- Zwevend tekstje ("+10", "Checkpoint!") toevoegen --- */
  toonTekst(x, y, tekst) {
    this.zwevendeTeksten.push({ x, y, tekst, tijd: 0.9 });
  }

  /* ---------- De zap-blaster (Wereld 2+) ---------- */

  /* Muispositie omrekenen naar canvas-coördinaten (het canvas kan
     op de pagina geschaald zijn) */
  bijMuisBeweging(e) {
    const rand = this.canvas.getBoundingClientRect();
    this.muis.x = (e.clientX - rand.left) * CONFIG.canvasBreedte / rand.width;
    this.muis.y = (e.clientY - rand.top) * CONFIG.canvasHoogte / rand.height;
  }

  /* Eén zap-schot afvuren in de richting van de muis */
  schiet() {
    if (this.schietCooldown > 0) return;
    this.schietCooldown = CONFIG.blasterCooldown;

    const px = this.speler.x + this.speler.w / 2;
    const py = this.speler.y + this.speler.h / 2;
    const dx = (this.muis.x + this.camera.x) - px;   // muis in wereldruimte
    const dy = this.muis.y - py;
    const lengte = Math.hypot(dx, dy) || 1;

    this.projectielen.push({
      x: px, y: py,
      vx: dx / lengte * CONFIG.projectielSnelheid,
      vy: dy / lengte * CONFIG.projectielSnelheid,
      leven: 1.1
    });

    this.speler.kijkricht = dx >= 0 ? 1 : -1;   // kijk mee met het schot
    Geluid.zap();
  }

  /* Projectielen bewegen, en raken platforms of vijanden */
  updateProjectielen(dt, blokken) {
    if (this.schietCooldown > 0) this.schietCooldown -= dt;

    for (const p of this.projectielen) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.leven -= dt;
      if (p.leven <= 0) continue;

      const raakvlak = { x: p.x - 5, y: p.y - 5, w: 10, h: 10 };

      // Tegen een platform of dichte poort: schot dooft uit
      for (const blok of blokken) {
        if (rechthoekenRaken(raakvlak, blok)) { p.leven = 0; break; }
      }
      if (p.leven <= 0) continue;

      // Tegen een vijand: verslaan — behalve gepantserde stekelbollen
      for (const vijand of this.vijanden) {
        if (vijand.dood || !rechthoekenRaken(raakvlak, vijand)) continue;
        p.leven = 0;

        if (vijand.stompbaar === false) {
          Geluid.zapAfketsen();
          this.toonTekst(vijand.x + vijand.w / 2, vijand.y - 12, "Gepantserd!");
        } else {
          vijand.dood = true;
          this.score += CONFIG.puntenVijand;
          Geluid.zapRaak();
          this.toonTekst(vijand.x + vijand.w / 2, vijand.y - 10, `+${CONFIG.puntenVijand}`);
        }
        break;
      }
    }

    this.projectielen = this.projectielen.filter(p => p.leven > 0);
  }

  /* ---------- Alles tekenen ---------- */

  teken() {
    const ctx = this.ctx;

    /* 1. Achtergrond met parallax (met het kleurthema van het level) */
    tekenAchtergrond(ctx, this.camera.x, this.tijd, this.level.thema || {});

    /* 2. De wereld (verschoven door de camera).
       View-culling: alles wat buiten beeld valt wordt overgeslagen —
       dat scheelt flink veel tekenwerk in lange levels. */
    ctx.save();
    ctx.translate(-Math.round(this.camera.x), 0);

    const zichtLinks = this.camera.x - 120;
    const zichtRechts = this.camera.x + CONFIG.canvasBreedte + 120;
    const inBeeld = (x, w = 0) => x + w >= zichtLinks && x <= zichtRechts;

    for (const p of this.platforms) if (inBeeld(p.x, p.w)) tekenPlatform(ctx, p, this.kleuren);

    // Water in de gaten, met de plons-ringen erbovenop
    for (const w of this.waterZones) if (inBeeld(w.x, w.w)) tekenWater(ctx, w, this.tijd, this.kleuren);
    for (const pl of this.plonzen) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, pl.leven)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(pl.x, 498, pl.r, pl.r * 0.35, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Drijvende vlotten deinen op het water
    for (const p of this.drijvendePlatforms) if (inBeeld(p.x, p.w)) p.teken(ctx, this.tijd);
    for (const p of this.bewegendePlatforms) if (inBeeld(p.x, p.w)) p.teken(ctx, this.tijd);
    for (const b of this.brokkelPlatforms) if (inBeeld(b.x, b.w)) b.teken(ctx, this.tijd);
    for (const s of this.level.stekels) if (inBeeld(s.x, s.w)) tekenStekels(ctx, s);
    for (const poort of this.poorten) if (inBeeld(poort.x, poort.w)) poort.teken(ctx, this.tijd);
    for (const cp of this.checkpoints) if (inBeeld(cp.x - 30, 90)) cp.teken(ctx, this.tijd);
    if (inBeeld(this.finish.x, this.finish.w)) {
      this.finish.teken(ctx, this.tijd);
      this.tekenFinishVoorwaarde(ctx);
    }
    for (const bol of this.bollen) if (!bol.gepakt && inBeeld(bol.cx - 20, 40)) bol.teken(ctx, this.tijd);
    for (const object of this.vraagobjecten) if (inBeeld(object.x, object.w)) object.teken(ctx, this.tijd);
    for (const vijand of this.vijanden) if (inBeeld(vijand.x - 40, vijand.w + 80)) vijand.teken(ctx, this.tijd);
    this.speler.teken(ctx, this.tijd);

    // Zoeklichten over de speler heen (je staat ín het licht)
    for (const z of this.zoeklichten) {
      if (inBeeld(z.cx - z.bereik / 2 - 40, z.bereik + 80)) z.teken(ctx, this.tijd);
    }

    // Beveiligingslasers over de speler heen (je loopt erdoorheen)
    for (const l of this.lasers) {
      if (inBeeld(l.x - 20, 40)) l.teken(ctx, this.tijd);
    }

    // Zap-schoten in de gekozen laserkleur (zie de winkel)
    const laser = vindLaser(Opslag.laser);
    for (const p of this.projectielen) {
      ctx.fillStyle = laser.gloed;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = laser.kleur;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = laser.gloed;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03);
      ctx.stroke();
    }

    // Zwevende puntenteksten
    ctx.font = "bold 16px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "center";
    for (const t of this.zwevendeTeksten) {
      ctx.fillStyle = `rgba(43, 58, 143, ${Math.min(1, t.tijd * 2)})`;
      ctx.fillText(t.tekst, t.x, t.y);
    }

    ctx.restore();

    /* 3. HUD (score, sleutels, harten) — niet in het menu */
    if (this.status !== "menu") this.tekenHUD(ctx);

    /* 4. Richtkruis van de blaster (in schermruimte, boven alles) */
    if (this.wereld.blaster && this.status === "spelen") {
      ctx.strokeStyle = vindLaser(Opslag.laser).kleur;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(this.muis.x, this.muis.y, 9, 0, Math.PI * 2);
      ctx.moveTo(this.muis.x - 13, this.muis.y); ctx.lineTo(this.muis.x - 5, this.muis.y);
      ctx.moveTo(this.muis.x + 5,  this.muis.y); ctx.lineTo(this.muis.x + 13, this.muis.y);
      ctx.moveTo(this.muis.x, this.muis.y - 13); ctx.lineTo(this.muis.x, this.muis.y - 5);
      ctx.moveTo(this.muis.x, this.muis.y + 5);  ctx.lineTo(this.muis.x, this.muis.y + 13);
      ctx.stroke();

      // Korte uitleg bij de start van een blaster-level
      if (this.blasterHint > 0) {
        ctx.fillStyle = `rgba(43, 58, 143, ${Math.min(0.85, this.blasterHint)})`;
        ctx.beginPath();
        ctx.roundRect(CONFIG.canvasBreedte / 2 - 190, 470, 380, 30, 9);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 15px 'Trebuchet MS', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("\u{1F5B1} Richt met je muis en klik om te zappen!",
                     CONFIG.canvasBreedte / 2, 490);
      }
    }
  }

  /* Zolang de finish nog dicht is: badge met de voortgang erboven */
  tekenFinishVoorwaarde(ctx) {
    if (this.vragenGeprobeerd >= this.vragenNodig) return;

    const cx = this.finish.x + this.finish.w / 2;
    const y = this.finish.y - 58;

    ctx.fillStyle = "rgba(43, 58, 143, 0.88)";
    ctx.beginPath();
    ctx.roundRect(cx - 62, y, 124, 24, 8);
    ctx.fill();

    ctx.fillStyle = "#ffe9a8";
    ctx.font = "bold 14px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`\u{1F512} slotjes: ${this.vragenGeprobeerd}/${this.vragenNodig}`, cx, y + 17);
  }

  tekenHUD(ctx) {
    const K = CONFIG.kleuren;

    // Half doorzichtig balkje bovenin
    ctx.fillStyle = "rgba(255, 253, 245, 0.78)";
    ctx.beginPath();
    ctx.roundRect(10, 8, 560, 36, 10);
    ctx.fill();

    ctx.fillStyle = K.hudTekst;
    ctx.font = "bold 17px 'Trebuchet MS', sans-serif";
    ctx.textAlign = "left";

    // Score
    ctx.fillText(`Score: ${this.score}`, 22, 32);

    // Sleutels deze ronde (met sleutel-icoontje)
    this.tekenSleutel(ctx, 138, 26);
    ctx.fillStyle = K.hudTekst;
    ctx.fillText(`${this.sleutelsRonde}`, 155, 32);

    // Totale sleutels (bewaard over rondes heen)
    ctx.fillText(`Totaal:`, 205, 32);
    this.tekenSleutel(ctx, 276, 26);
    ctx.fillStyle = K.hudTekst;
    ctx.fillText(`${Opslag.totaleSleutels}`, 293, 32);

    // Slotjes geprobeerd (groen zodra de finish open is)
    this.tekenMiniSlot(ctx, 348, 26);
    ctx.fillStyle = this.vragenGeprobeerd >= this.vragenNodig ? "#2a8a35" : K.hudTekst;
    ctx.fillText(`${this.vragenGeprobeerd}/${this.vragenNodig}`, 364, 32);

    // Energieharten
    for (let i = 0; i < CONFIG.startHarten; i++) {
      this.tekenHart(ctx, 480 + i * 24, 18, i < this.harten);
    }
  }

  /* Mini-slotje voor in de HUD */
  tekenMiniSlot(ctx, x, y) {
    const K = CONFIG.kleuren;
    ctx.strokeStyle = K.slotBeugel;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y - 4, 5, Math.PI, 0);   // beugel
    ctx.stroke();
    ctx.fillStyle = K.slot;
    ctx.beginPath();
    ctx.roundRect(x - 7, y - 4, 14, 11, 3);   // kastje
    ctx.fill();
    ctx.strokeStyle = K.slotBeugel;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  /* Eén sleuteltje tekenen (ring + baard) */
  tekenSleutel(ctx, x, y) {
    ctx.strokeStyle = CONFIG.kleuren.sleutel;
    ctx.lineWidth = 3;
    // Ring
    ctx.beginPath();
    ctx.arc(x - 4, y, 4.5, 0, Math.PI * 2);
    ctx.stroke();
    // Steel met baard (de tandjes)
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + 10, y);
    ctx.moveTo(x + 6, y); ctx.lineTo(x + 6, y + 4);
    ctx.moveTo(x + 10, y); ctx.lineTo(x + 10, y + 4);
    ctx.stroke();
  }

  /* Eén hartje tekenen (vol of leeg) */
  tekenHart(ctx, x, y, vol = true) {
    ctx.fillStyle = vol ? CONFIG.kleuren.hart : "rgba(150,150,170,0.5)";
    ctx.beginPath();
    ctx.moveTo(x, y + 3);
    ctx.bezierCurveTo(x, y - 3, x - 9, y - 3, x - 9, y + 3);
    ctx.bezierCurveTo(x - 9, y + 9, x, y + 12, x, y + 15);
    ctx.bezierCurveTo(x, y + 12, x + 9, y + 9, x + 9, y + 3);
    ctx.bezierCurveTo(x + 9, y - 3, x, y - 3, x, y + 3);
    ctx.fill();
  }
}

/* ---------- Start de game zodra de pagina geladen is ---------- */
window.addEventListener("DOMContentLoaded", () => {
  window.vonkSpel = new Spel();
});
