/* ============================================================
   OPSLAG — Bewaart sleutels, skins, sterren en instellingen in
   localStorage, zodat alles bewaard blijft na opnieuw laden.

   Alles zit achter try/catch: als localStorage niet werkt
   (bijv. geblokkeerd door de browser), speelt de game gewoon
   door zonder te bewaren.
   ============================================================ */

const Opslag = {

  /* De actuele spelstand (wordt geladen uit localStorage) */
  totaleSleutels: 0,
  gekochteSkins: ["standaard"],
  skin: "standaard",
  gekochteLasers: ["cyaan"],
  laser: "cyaan",
  verzilverdeCodes: [],   // codewoorden die al zijn ingewisseld (kleine letters)
  sterrenPerLevel: {},   // beste sterren per level, sleutel "wereld-level",
                         // bijv. { "0-0": 3, "0-1": 1, "1-0": 2 }
  vragenStats: {},       // per wereld: { goed, totaal } over álle pogingen,
                         // bijv. { "0": { goed: 12, totaal: 15 } }
                         // (de leerkracht ziet hiervan het percentage)
  laatsteLevel: null,    // laatst gestarte level, bijv. "5-1" (wereld-level);
                         // de leerkracht ziet dit als "W6 L2"
  geluidAan: true,

  BASIS_SLEUTEL: "vonk-wachtwoordgame",
  SLEUTEL: "vonk-wachtwoordgame",   // naam in localStorage (wisselt bij klas-login)

  /* --- Laden bij het opstarten van de game --- */
  laad() {
    try {
      const data = JSON.parse(localStorage.getItem(this.SLEUTEL));
      if (!data) return;

      // Migratie: oude versies bewaarden "muntjes" (10 per goed antwoord).
      // Nu zijn het sleutels (1 per goed antwoord), dus delen door 10.
      if (data.totaleMuntjes !== undefined && data.totaleSleutels === undefined) {
        this.totaleSleutels = Math.round(data.totaleMuntjes / 10);
      } else {
        this.totaleSleutels = data.totaleSleutels || 0;
      }

      this.gekochteSkins = Array.isArray(data.gekochteSkins) && data.gekochteSkins.length
        ? data.gekochteSkins : ["standaard"];
      this.skin = data.skin || "standaard";

      // Migratie: oude sterren hadden alleen een levelnummer ("0".."5");
      // sinds de werelden heten ze "wereld-level" ("0-0".."0-5").
      this.sterrenPerLevel = {};
      for (const [sleutel, waarde] of Object.entries(data.sterrenPerLevel || {})) {
        this.sterrenPerLevel[/^\d+$/.test(sleutel) ? `0-${sleutel}` : sleutel] = waarde;
      }

      this.geluidAan = data.geluidAan !== false;   // standaard aan

      // Veiligheid: geselecteerde skin moet ook echt gekocht zijn
      if (!this.gekochteSkins.includes(this.skin)) this.skin = "standaard";

      this.gekochteLasers = Array.isArray(data.gekochteLasers) && data.gekochteLasers.length
        ? data.gekochteLasers : ["cyaan"];
      this.laser = data.laser || "cyaan";
      if (!this.gekochteLasers.includes(this.laser)) this.laser = "cyaan";

      this.verzilverdeCodes = Array.isArray(data.verzilverdeCodes)
        ? data.verzilverdeCodes : [];

      this.vragenStats = (data.vragenStats && typeof data.vragenStats === "object")
        ? data.vragenStats : {};

      this.laatsteLevel = data.laatsteLevel || null;
    } catch (e) {
      // localStorage niet beschikbaar: gewoon met standaardwaarden spelen
    }
  },

  /* --- De complete spelstand als één object (voor localStorage
         én voor de cloud-opslag bij een klas-login) --- */
  snapshot() {
    return {
      totaleSleutels: this.totaleSleutels,
      gekochteSkins: this.gekochteSkins,
      skin: this.skin,
      gekochteLasers: this.gekochteLasers,
      laser: this.laser,
      verzilverdeCodes: this.verzilverdeCodes,
      sterrenPerLevel: this.sterrenPerLevel,
      vragenStats: this.vragenStats,
      laatsteLevel: this.laatsteLevel,
      geluidAan: this.geluidAan
    };
  },

  /* --- Bewaren na elke wijziging --- */
  bewaar() {
    try {
      localStorage.setItem(this.SLEUTEL, JSON.stringify(this.snapshot()));
    } catch (e) {
      // Bewaren lukt niet: geen probleem, spel werkt gewoon door
    }
    // Ingelogd via de klas-login? Dan ook (vertraagd) naar de cloud.
    if (window.Online) Online.planSync();
  },

  /* --- Alles terug naar de beginwaarden (vóór het laden van een
         andere spelstand, bij in-/uitloggen) --- */
  resetNaarStandaard() {
    this.totaleSleutels = 0;
    this.gekochteSkins = ["standaard"];
    this.skin = "standaard";
    this.gekochteLasers = ["cyaan"];
    this.laser = "cyaan";
    this.verzilverdeCodes = [];
    this.sterrenPerLevel = {};
    this.vragenStats = {};
    this.laatsteLevel = null;
    // geluidAan bewust NIET resetten: dat is een apparaat-instelling
  },

  /* --- Klas-login: overschakelen naar de spelstand van deze
         leerling. De cloud-voortgang is leidend; de anonieme
         lokale spelstand blijft onaangetast bewaard. --- */
  wisselNaarLeerling(leerlingId, cloudVoortgang) {
    this.SLEUTEL = `${this.BASIS_SLEUTEL}-ll-${leerlingId}`;
    if (cloudVoortgang && Object.keys(cloudVoortgang).length) {
      try {
        localStorage.setItem(this.SLEUTEL, JSON.stringify(cloudVoortgang));
      } catch (e) {}
    }
    this.resetNaarStandaard();
    this.laad();
  },

  /* --- Uitloggen: terug naar de anonieme (lokale) spelstand --- */
  wisselNaarAnoniem() {
    this.SLEUTEL = this.BASIS_SLEUTEL;
    this.resetNaarStandaard();
    this.laad();
  },

  /* --- Sleutels toevoegen (aan het einde van een ronde) --- */
  voegSleutelsToe(aantal) {
    this.totaleSleutels += aantal;
    this.bewaar();
  },

  /* --- Een skin kopen: geeft true terug als het gelukt is --- */
  koopSkin(skinId, prijs) {
    if (this.gekochteSkins.includes(skinId)) return true;   // al gekocht
    if (this.totaleSleutels < prijs) return false;          // te weinig sleutels

    this.totaleSleutels -= prijs;
    this.gekochteSkins.push(skinId);
    this.bewaar();
    return true;
  },

  /* --- Een gekochte skin selecteren --- */
  selecteerSkin(skinId) {
    if (this.gekochteSkins.includes(skinId)) {
      this.skin = skinId;
      this.bewaar();
    }
  },

  /* --- Een laser kopen: geeft true terug als het gelukt is --- */
  koopLaser(laserId, prijs) {
    if (this.gekochteLasers.includes(laserId)) return true;
    if (this.totaleSleutels < prijs) return false;

    this.totaleSleutels -= prijs;
    this.gekochteLasers.push(laserId);
    this.bewaar();
    return true;
  },

  /* --- Een gekochte laser selecteren --- */
  selecteerLaser(laserId) {
    if (this.gekochteLasers.includes(laserId)) {
      this.laser = laserId;
      this.bewaar();
    }
  },

  /* --- Een codewoord verzilveren (elk woord maar één keer).
         Geeft true terug als het gelukt is. --- */
  verzilverCode(woordKlein, sleutels) {
    if (this.verzilverdeCodes.includes(woordKlein)) return false;

    this.verzilverdeCodes.push(woordKlein);
    this.totaleSleutels += sleutels;
    this.bewaar();
    return true;
  },

  /* --- Een (geheime) skin vrijspelen zonder te betalen,
         bijvoorbeeld via een codewoord --- */
  ontgrendelSkin(skinId) {
    if (!this.gekochteSkins.includes(skinId)) {
      this.gekochteSkins.push(skinId);
      this.bewaar();
    }
  },

  /* --- Laatst gestarte level onthouden (voor de leerkracht) --- */
  zetLaatsteLevel(wereldIndex, levelIndex) {
    this.laatsteLevel = `${wereldIndex}-${levelIndex}`;
    this.bewaar();
  },

  /* --- Vraagstatistieken: elke beantwoorde vraag telt mee,
         per wereld. De leerkracht ziet hiervan het percentage
         goed (het leerdoel van die wereld). --- */
  telVraag(wereldIndex, goed) {
    const w = String(wereldIndex);
    if (!this.vragenStats[w]) this.vragenStats[w] = { goed: 0, totaal: 0 };
    this.vragenStats[w].totaal++;
    if (goed) this.vragenStats[w].goed++;
    this.bewaar();
  },

  /* --- Sterren: alleen het beste resultaat per level bewaren.
         'sleutel' is "wereld-level", bijv. "0-3" of "1-0". --- */
  zetSterren(sleutel, sterren) {
    if (sterren > this.sterren(sleutel)) {
      this.sterrenPerLevel[sleutel] = sterren;
      this.bewaar();
    }
  },

  sterren(sleutel) {
    return this.sterrenPerLevel[sleutel] || 0;
  },

  /* --- Geluid aan/uit --- */
  zetGeluid(aan) {
    this.geluidAan = aan;
    this.bewaar();
  }
};
