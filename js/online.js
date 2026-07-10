/* ============================================================
   ONLINE — De koppeling met Supabase voor de klas-login.

   Twee onderdelen:
   - Online    : praat met Supabase (login, voortgang opslaan)
   - KlasLogin : het klas-login-scherm in het menu
                 (klasnaam typen → op je naam klikken → wachtwoord)

   Werkt volledig via fetch (geen extra libraries). Als er geen
   Supabase-gegevens zijn ingevuld in supabase-config.js, doet
   dit bestand niets en speelt de game gewoon offline.
   ============================================================ */

const Online = {

  /* De ingelogde leerling, of null als niemand is ingelogd:
     { id, naam, klasnaam, wachtwoord, openWerelden } */
  leerling: null,

  SESSIE_SLEUTEL: "vonk-klas-sessie",   // onthoudt de login in localStorage
  _syncTimer: null,
  _laatsteSyncJson: null,               // niet twee keer hetzelfde versturen

  /* Is Supabase ingesteld? Zo niet: game werkt gewoon offline. */
  actief() {
    return typeof SUPABASE_CONFIG !== "undefined" &&
           !!SUPABASE_CONFIG.url &&
           SUPABASE_CONFIG.url.indexOf("JOUW-") === -1 &&
           SUPABASE_CONFIG.url.indexOf("https://") === 0;
  },

  /* Eén RPC-functie in Supabase aanroepen */
  async rpc(functie, parameters, keepalive = false) {
    const antwoord = await fetch(
      `${SUPABASE_CONFIG.url}/rest/v1/rpc/${functie}`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_CONFIG.anonKey,
          "Authorization": `Bearer ${SUPABASE_CONFIG.anonKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parameters),
        keepalive
      });
    if (!antwoord.ok) throw new Error(`Supabase ${functie}: ${antwoord.status}`);
    return antwoord.json();
  },

  /* Namenlijst van een klas ophalen (stap 2 van de login) */
  async haalKlasNamen(klasnaam) {
    const rijen = await this.rpc("klas_login_namen", { p_klas: klasnaam });
    return rijen.map(r => r.naam);
  },

  /* Leerling inloggen. Geeft true terug als het gelukt is. */
  async login(klasnaam, naam, wachtwoord) {
    const res = await this.rpc("leerling_login", {
      p_klas: klasnaam, p_naam: naam, p_wachtwoord: wachtwoord
    });
    if (!res || res.ok !== true) return false;

    this.leerling = {
      id: res.leerling_id,
      naam: naam.trim(),
      klasnaam: res.klasnaam,
      wachtwoord: wachtwoord.trim(),
      openWerelden: Array.isArray(res.open_werelden) ? res.open_werelden : []
    };

    // Login onthouden zodat de leerling na F5 ingelogd blijft
    try {
      localStorage.setItem(this.SESSIE_SLEUTEL, JSON.stringify({
        klas: this.leerling.klasnaam,
        naam: this.leerling.naam,
        wachtwoord: this.leerling.wachtwoord
      }));
    } catch (e) { /* geen probleem */ }

    // Voortgang uit de cloud wordt de actieve spelstand
    Opslag.wisselNaarLeerling(this.leerling.id, res.voortgang);

    // Was de cloud nog leeg maar staat er lokaal al voortgang?
    // Dan die meteen omhoog sturen.
    this._laatsteSyncJson = null;
    this.planSync();
    return true;
  },

  /* Uitloggen: terug naar de anonieme (lokale) spelstand */
  logout() {
    clearTimeout(this._syncTimer);
    this.syncNu();                       // laatste stand nog even opslaan
    this.leerling = null;
    try { localStorage.removeItem(this.SESSIE_SLEUTEL); } catch (e) {}
    Opslag.wisselNaarAnoniem();
  },

  /* Bij het opstarten: was er nog een login van de vorige keer? */
  async herstelSessie() {
    if (!this.actief()) return false;
    let sessie = null;
    try { sessie = JSON.parse(localStorage.getItem(this.SESSIE_SLEUTEL)); } catch (e) {}
    if (!sessie || !sessie.klas) return false;
    try {
      return await this.login(sessie.klas, sessie.naam, sessie.wachtwoord);
    } catch (e) {
      return false;   // geen internet? Dan gewoon offline verder.
    }
  },

  /* Open werelden verversen (de leerkracht kan ze net hebben
     open- of dichtgezet). Stilletjes; fouten negeren we. */
  async ververs() {
    if (!this.leerling) return;
    try {
      const res = await this.rpc("leerling_login", {
        p_klas: this.leerling.klasnaam,
        p_naam: this.leerling.naam,
        p_wachtwoord: this.leerling.wachtwoord
      });
      if (res && res.ok === true) {
        this.leerling.openWerelden =
          Array.isArray(res.open_werelden) ? res.open_werelden : [];
      }
    } catch (e) { /* offline: cached versie blijft gelden */ }
  },

  /* Voortgang opslaan in de cloud — met een korte vertraging,
     zodat snel achter elkaar bewaren maar één verzoek wordt. */
  planSync() {
    if (!this.leerling || !this.actief()) return;
    clearTimeout(this._syncTimer);
    this._syncTimer = setTimeout(() => this.syncNu(), 2000);
  },

  async syncNu(keepalive = false) {
    if (!this.leerling || !this.actief()) return;
    const voortgang = Opslag.snapshot();
    const json = JSON.stringify(voortgang);
    if (json === this._laatsteSyncJson) return;   // niets veranderd

    try {
      await this.rpc("leerling_bewaar", {
        p_leerling_id: this.leerling.id,
        p_wachtwoord: this.leerling.wachtwoord,
        p_voortgang: voortgang
      }, keepalive);
      this._laatsteSyncJson = json;
    } catch (e) { /* geen internet: volgende bewaar-moment opnieuw */ }
  }
};

/* Bij het sluiten/verlaten van de pagina: laatste stand nog versturen */
window.addEventListener("pagehide", () => { Online.syncNu(true); });


/* ============================================================
   KLASLOGIN — Het scherm waar leerlingen inloggen:
   stap 1: klasnaam typen
   stap 2: op je eigen naam klikken
   stap 3: je wachtwoord typen
   ============================================================ */

const KlasLogin = {

  klasnaam: "",
  gekozenNaam: "",

  /* Alle knoppen van het scherm vastmaken (één keer, bij het laden) */
  bind() {
    document.getElementById("vg-knop-klas").addEventListener("click", () => {
      if (window.Geluid) Geluid.klik();
      this.open();
    });
    document.getElementById("vg-knop-terug-klaslogin").addEventListener("click", () => {
      if (window.Geluid) Geluid.klik();
      window.vonkSpel.naarMenu();
    });
    document.getElementById("vg-knop-klas-zoek").addEventListener("click", () => this.zoekKlas());
    document.getElementById("vg-klas-invoer").addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.zoekKlas();
    });
    document.getElementById("vg-knop-klas-login").addEventListener("click", () => this.probeerLogin());
    document.getElementById("vg-klas-wachtwoord").addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.probeerLogin();
    });
    document.getElementById("vg-knop-klas-anders").addEventListener("click", () => {
      this.toonStap(2);   // verkeerde naam gekozen → terug naar de namen
    });
    document.getElementById("vg-knop-klas-uitloggen").addEventListener("click", () => {
      if (window.Geluid) Geluid.klik();
      Online.logout();
      this.vernieuwMenuKnop();
      window.vonkSpel.naarMenu();
    });
  },

  /* Het scherm openen (vanuit het menu) */
  open() {
    this.zetFout("");
    if (Online.leerling) {
      this.toonStap("ingelogd");
      document.getElementById("vg-klas-ingelogd-tekst").innerHTML =
        `Je bent ingelogd als <b>${this.veilig(Online.leerling.naam)}</b>` +
        ` uit klas <b>${this.veilig(Online.leerling.klasnaam)}</b>.` +
        `<br>Je voortgang wordt automatisch bewaard.`;
    } else {
      this.toonStap(1);
      document.getElementById("vg-klas-invoer").value = this.klasnaam;
    }
    window.vonkSpel.schermen.toon("klaslogin");
    if (!Online.leerling) document.getElementById("vg-klas-invoer").focus();
  },

  /* Eén stap tonen, de rest verbergen */
  toonStap(stap) {
    const blokken = { 1: "vg-klas-stap1", 2: "vg-klas-stap2",
                      3: "vg-klas-stap3", ingelogd: "vg-klas-ingelogd" };
    for (const [s, id] of Object.entries(blokken)) {
      document.getElementById(id)
        .classList.toggle("vg-verborgen", s !== String(stap));
    }
  },

  zetFout(tekst) {
    const el = document.getElementById("vg-klas-fout");
    el.textContent = tekst;
    el.classList.toggle("vg-verborgen", !tekst);
  },

  /* Stap 1 → 2: klas opzoeken en de namen laten zien */
  async zoekKlas() {
    const invoer = document.getElementById("vg-klas-invoer").value.trim();
    if (!invoer) { this.zetFout("Typ eerst de naam van je klas."); return; }
    this.zetFout("");

    let namen;
    try {
      namen = await Online.haalKlasNamen(invoer);
    } catch (e) {
      this.zetFout("Er ging iets mis. Is er internet?");
      return;
    }
    if (!namen.length) {
      this.zetFout(`Geen klas gevonden met de naam “${invoer}”. Vraag je leerkracht om de juiste klasnaam.`);
      return;
    }

    this.klasnaam = invoer;
    document.getElementById("vg-klas-naam-titel").innerHTML =
      `Klas <b>${this.veilig(invoer)}</b> — klik op je naam:`;

    const raster = document.getElementById("vg-klas-namen");
    raster.innerHTML = "";
    for (const naam of namen) {
      const knop = document.createElement("button");
      knop.className = "vg-knop vg-klas-naamknop";
      knop.textContent = naam;
      knop.addEventListener("click", () => {
        if (window.Geluid) Geluid.klik();
        this.gekozenNaam = naam;
        this.zetFout("");
        document.getElementById("vg-klas-welkom").innerHTML =
          `Hoi <b>${this.veilig(naam)}</b>! Typ je wachtwoord:`;
        document.getElementById("vg-klas-wachtwoord").value = "";
        this.toonStap(3);
        document.getElementById("vg-klas-wachtwoord").focus();
      });
      raster.appendChild(knop);
    }
    this.toonStap(2);
  },

  /* Stap 3: inloggen met het getypte wachtwoord */
  async probeerLogin() {
    const wachtwoord = document.getElementById("vg-klas-wachtwoord").value.trim();
    if (!wachtwoord) { this.zetFout("Typ eerst je wachtwoord."); return; }
    this.zetFout("");

    let gelukt = false;
    try {
      gelukt = await Online.login(this.klasnaam, this.gekozenNaam, wachtwoord);
    } catch (e) {
      this.zetFout("Er ging iets mis. Is er internet?");
      return;
    }
    if (!gelukt) {
      this.zetFout("Dat wachtwoord klopt niet. Probeer het nog eens, of vraag je leerkracht.");
      return;
    }

    if (window.Geluid) Geluid.goed();
    this.vernieuwMenuKnop();
    window.vonkSpel.naarMenu();
  },

  /* De klas-login-knop in het menu bijwerken */
  vernieuwMenuKnop() {
    const knop = document.getElementById("vg-knop-klas");

    if (!Online.actief()) {
      knop.classList.add("vg-verborgen");   // geen Supabase → knop weg
      return;
    }
    knop.classList.remove("vg-verborgen");
    knop.innerHTML = Online.leerling
      ? `\u{1F464} ${this.veilig(Online.leerling.naam)}`
      : "\u{1F3EB} Klas-login";
    // Saldo kan veranderd zijn door het wisselen van spelstand
    document.getElementById("vg-menu-sleutels").textContent = Opslag.totaleSleutels;
  },

  /* Tekst veilig maken voor innerHTML */
  veilig(tekst) {
    const el = document.createElement("span");
    el.textContent = tekst;
    return el.innerHTML;
  }
};

/* Expliciet aan window hangen: game.js en opslag.js checken op
   "window.Online" (een const wordt namelijk géén window-property). */
window.Online = Online;
window.KlasLogin = KlasLogin;

/* Bij het laden: knoppen vastmaken en de vorige login herstellen.
   (setTimeout zodat window.vonkSpel — uit game.js — al bestaat.) */
window.addEventListener("DOMContentLoaded", () => {
  KlasLogin.bind();
  setTimeout(async () => {
    KlasLogin.vernieuwMenuKnop();
    const hersteld = await Online.herstelSessie();
    if (hersteld) KlasLogin.vernieuwMenuKnop();
  }, 0);
});
