/* ============================================================
   WINKEL — Hier kopen kinderen skins en lasers met verdiende
   sleutels. Twee afdelingen met een eigen titel:

     🤖 Robots    — de skins van de speler (zie skins.js)
     ⚡ Lasers    — de kleur van je zap-schoten (zie skins.js)

   (Codewoorden inwisselen heeft een eigen scherm in het menu —
    zie het Codewoord-object onderaan dit bestand.)

   De laser-afdeling gaat pas open zodra Wereld 2 ontgrendeld
   is (daar krijg je immers pas de zap-blaster).

   Per item: preview (canvas), naam, prijs en een knop:
     "Kopen" → "Selecteren" → "Geselecteerd ✔"
   Te weinig sleutels? Dan verschijnt een nette melding.
   Alles wordt bewaard via Opslag (localStorage).
   ============================================================ */

/* --- Codewoorden: één per werkblad/wereld. Hoofdletters maken
       niet uit bij het invoeren; elk woord kan per speler maar
       één keer verzilverd worden. De beloning loopt op per
       wereld; het laatste woord geeft geen sleutels maar de
       GEHEIME SKIN (zet daarvoor 'skin' in plaats van
       'sleutels'). --- */
const CODEWOORDEN = [
  { woord: "STERK",  sleutels: 10 },          // Wereld 1 — Wachtwoordschool
  { woord: "BOUW",   sleutels: 15 },          // Wereld 2 — Wachtwoordwerkplaats
  { woord: "KLUIS",  sleutels: 20 },          // Wereld 3 — Geheimenkluis
  { woord: "SCHILD", sleutels: 25 },          // Wereld 4 — Phishingrivier
  { woord: "SLOTEN", sleutels: 30 },          // Wereld 5 — Accountstad
  { woord: "EXPERT", skin: "schaduwheld" }    // Wereld 6 — exclusieve skin!
];

class Winkel {

  constructor(bijWijziging) {
    this.lijstEl = document.getElementById("vg-winkel-lijst");
    this.sleutelsEl = document.getElementById("vg-winkel-sleutels");
    this.bijWijziging = bijWijziging;   // callback: er is iets gekocht/gekozen
    this.previews = [];                 // skin-previews (blijven animeren)
  }

  /* Zijn de lasers al te koop? Pas als Wereld 2 open is. */
  get lasersOntgrendeld() {
    return Opslag.sterren(`0-${WERELDEN[0].levels.length - 1}`) >= 1;
  }

  /* De hele winkel (opnieuw) opbouwen — aanroepen bij het openen */
  render() {
    this.sleutelsEl.textContent = Opslag.totaleSleutels;
    this.lijstEl.innerHTML = "";
    this.previews = [];

    /* --- Afdeling 1: Robots ---
       Geheime skins blijven verborgen totdat ze zijn vrijgespeeld
       met een codewoord — daarna staan ze hier met een ★-label. */
    this.lijstEl.appendChild(this.maakTitel("\u{1F916} Robots"));
    const robotGrid = document.createElement("div");
    robotGrid.className = "vg-winkel-grid";
    for (const skin of SKINS) {
      if (skin.geheim && !Opslag.gekochteSkins.includes(skin.id)) continue;
      robotGrid.appendChild(this.maakSkinKaart(skin));
    }
    this.lijstEl.appendChild(robotGrid);

    /* --- Afdeling 2: Lasers (op slot tot Wereld 2 open is) --- */
    const open = this.lasersOntgrendeld;
    this.lijstEl.appendChild(this.maakTitel(
      "⚡ Lasers" + (open ? "" : " — \u{1F512} maak Wereld 1 af om te ontgrendelen")));
    const laserGrid = document.createElement("div");
    laserGrid.className = "vg-winkel-grid";
    for (const laser of LASERS) laserGrid.appendChild(this.maakLaserKaart(laser, open));
    this.lijstEl.appendChild(laserGrid);
  }

  /* Afdelingstitel ("Robots" / "Lasers") */
  maakTitel(tekst) {
    const titel = document.createElement("p");
    titel.className = "vg-winkel-titel";
    titel.textContent = tekst;
    return titel;
  }

  /* ---------- Robots ---------- */

  maakSkinKaart(skin) {
    const gekocht = Opslag.gekochteSkins.includes(skin.id);
    const actief = Opslag.skin === skin.id;

    const kaart = document.createElement("div");
    kaart.className = "vg-skin-kaart" + (actief ? " vg-skin-actief" : "");

    // Preview-canvas met de skin erop getekend (animeert mee)
    const canvas = document.createElement("canvas");
    canvas.width = 90;
    canvas.height = 96;
    canvas.className = "vg-skin-preview";
    kaart.appendChild(canvas);
    this.previews.push({ canvas, skinId: skin.id });

    this.vulKaart(kaart, skin.naam, skin.prijs, skin.geheim);
    kaart.appendChild(this.maakActieKnop({
      gekocht, actief,
      koop: () => Opslag.koopSkin(skin.id, skin.prijs),
      selecteer: () => Opslag.selecteerSkin(skin.id),
      kaart
    }));
    kaart.appendChild(this.maakMelding());
    return kaart;
  }

  /* ---------- Lasers ---------- */

  maakLaserKaart(laser, afdelingOpen) {
    const gekocht = Opslag.gekochteLasers.includes(laser.id);
    const actief = Opslag.laser === laser.id;

    const kaart = document.createElement("div");
    kaart.className = "vg-skin-kaart" +
      (actief && afdelingOpen ? " vg-skin-actief" : "") +
      (afdelingOpen ? "" : " vg-skin-dicht");

    // Statische preview van het zap-schot in deze kleur
    const canvas = document.createElement("canvas");
    canvas.width = 90;
    canvas.height = 96;
    canvas.className = "vg-skin-preview";
    tekenLaserPreview(canvas.getContext("2d"), laser, 90, 96);
    kaart.appendChild(canvas);

    this.vulKaart(kaart, laser.naam, laser.prijs);

    if (!afdelingOpen) {
      // Nog op slot: alleen een uitgeschakeld knopje tonen
      const knop = document.createElement("button");
      knop.className = "vg-knop vg-knop-winkel";
      knop.innerHTML = "&#128274; Op slot";
      knop.disabled = true;
      kaart.appendChild(knop);
    } else {
      kaart.appendChild(this.maakActieKnop({
        gekocht, actief,
        koop: () => Opslag.koopLaser(laser.id, laser.prijs),
        selecteer: () => Opslag.selecteerLaser(laser.id),
        kaart
      }));
    }
    kaart.appendChild(this.maakMelding());
    return kaart;
  }

  /* ---------- Gedeelde kaartonderdelen ---------- */

  /* Naam + prijs op de kaart zetten */
  vulKaart(kaart, naamTekst, prijsWaarde, geheim = false) {
    const naam = document.createElement("p");
    naam.className = "vg-skin-naam";
    naam.textContent = naamTekst;
    kaart.appendChild(naam);

    const prijs = document.createElement("p");
    prijs.className = "vg-skin-prijs";
    prijs.innerHTML = geheim
      ? `<span class="vg-sleutel-icoon">★</span> Geheim!`
      : (prijsWaarde === 0
          ? "Gratis"
          : `${prijsWaarde} <span class="vg-sleutel-icoon">&#128273;</span>`);
    kaart.appendChild(prijs);
  }

  /* De Kopen / Selecteren / Geselecteerd-knop */
  maakActieKnop({ gekocht, actief, koop, selecteer, kaart }) {
    const knop = document.createElement("button");
    knop.className = "vg-knop vg-knop-winkel";

    if (actief) {
      knop.textContent = "Geselecteerd ✔";
      knop.disabled = true;
      knop.classList.add("vg-knop-geselecteerd");
    } else if (gekocht) {
      knop.textContent = "Selecteren";
      knop.classList.add("vg-knop-licht");
      knop.addEventListener("click", () => {
        Geluid.klik();
        selecteer();
        this.render();
        this.bijWijziging();
      });
    } else {
      knop.textContent = "Kopen";
      knop.addEventListener("click", () => {
        if (koop()) {
          Geluid.bevestiging();
          selecteer();          // nieuwe aankoop meteen aandoen
          this.render();
          this.bijWijziging();
        } else {
          Geluid.weigering();
          const melding = kaart.querySelector(".vg-skin-melding");
          melding.textContent = "Nog niet genoeg sleutels.";
          setTimeout(() => { melding.textContent = ""; }, 2500);
        }
      });
    }
    return knop;
  }

  /* Plek voor de "te weinig sleutels"-melding */
  maakMelding() {
    const melding = document.createElement("p");
    melding.className = "vg-skin-melding";
    return melding;
  }

  /* De skin-previews levend houden (aangeroepen vanuit de game-loop) */
  tekenPreviews(tijd) {
    for (const { canvas, skinId } of this.previews) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height - 8);
      ctx.scale(1.25, 1.25);
      tekenFiguur(ctx, skinId, tijd, { stap: Math.sin(tijd * 4) * 3 });
      ctx.restore();
    }
  }
}

/* ============================================================
   CODEWOORD — Eigen menuscherm om werkblad-codewoorden in te
   wisselen (voorheen een afdeling in de winkel; nu een aparte
   knop in het hoofdmenu zodat kinderen het makkelijk vinden).
   ============================================================ */

const Codewoord = {

  spel: null,

  /* Eén keer aanroepen bij het opstarten (vanuit game.js) */
  init(spel) {
    this.spel = spel;

    const invoer = document.getElementById("vg-codewoord-invoer");
    invoer.addEventListener("keydown", (e) => {
      e.stopPropagation();                       // R/P mogen de game niet sturen
      if (e.key === "Enter") this.verzilver();
    });
    document.getElementById("vg-knop-codewoord-verzilver")
      .addEventListener("click", () => this.verzilver());
  },

  /* Het scherm openen vanuit het menu */
  open() {
    document.getElementById("vg-codewoord-invoer").value = "";
    this.zetMelding("", "");
    this.werkSaldoBij();
    this.spel.schermen.toon("codewoord");
    document.getElementById("vg-codewoord-invoer").focus();
  },

  werkSaldoBij() {
    document.getElementById("vg-codewoord-sleutels").textContent =
      Opslag.totaleSleutels;
  },

  zetMelding(tekst, soort) {
    const melding = document.getElementById("vg-codewoord-melding");
    melding.textContent = tekst;
    melding.className = "vg-code-melding" + (soort ? ` vg-code-${soort}` : "");
  },

  /* Het getypte woord controleren en de beloning uitkeren */
  verzilver() {
    const invoer = document.getElementById("vg-codewoord-invoer");
    const woord = invoer.value.trim().toLowerCase();
    if (!woord) return;

    const code = CODEWOORDEN.find(c => c.woord.toLowerCase() === woord);

    if (!code) {
      Geluid.weigering();
      this.zetMelding("Hmm, dat codewoord klopt niet. Kijk nog eens goed!", "fout");
    } else if (!Opslag.verzilverCode(woord, code.sleutels || 0)) {
      Geluid.weigering();
      this.zetMelding("Dit codewoord heb je al een keer gebruikt.", "fout");
    } else if (code.skin) {
      // Speciale beloning: de geheime skin vrijspelen en meteen aandoen
      Geluid.bevestiging();
      Opslag.ontgrendelSkin(code.skin);
      Opslag.selecteerSkin(code.skin);
      this.spel.bijWinkelWijziging();
      this.zetMelding(
        `⭐ Gelukt! Je hebt de geheime skin ${vindSkin(code.skin).naam} vrijgespeeld!`,
        "goed");
      invoer.value = "";
    } else {
      Geluid.bevestiging();
      this.zetMelding(`Gelukt! +${code.sleutels} sleutels \u{1F511}`, "goed");
      this.werkSaldoBij();
      invoer.value = "";
    }
  }
};
