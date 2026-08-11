/* ============================================================
   LEERKRACHT-DASHBOARD — alle logica van leerkracht.html

   Praat rechtstreeks met Supabase via fetch:
   - Auth  : e-mail + wachtwoord (Supabase Auth)
   - Data  : tabellen "klassen" en "leerlingen" (via REST,
             beveiligd met Row Level Security)

   Er zijn geen extra libraries nodig.
   ============================================================ */

/* De 6 werelden van de game (naam + leerdoel + aantal levels).
   Moet gelijk lopen met js/werelden.js in de game. */
const WERELD_INFO = [
  { naam: "Wachtwoordschool",     doel: "Sterke en zwakke wachtwoorden herkennen", levels: 6 },
  { naam: "Wachtwoordwerkplaats", doel: "Zwakke wachtwoorden verbeteren",          levels: 6 },
  { naam: "Geheimenkluis",        doel: "Wachtwoorden geheim houden",              levels: 6 },
  { naam: "Phishingrivier",       doel: "Nepberichten herkennen",                  levels: 6 },
  { naam: "Accountstad",          doel: "Accounts extra beveiligen",               levels: 6 },
  { naam: "Cyberkasteel",         doel: "Eindmissie: alles samen",                 levels: 6 }
];

/* Het codewoord van elke wereld (van de werkbladen; moet gelijk
   lopen met CODEWOORDEN in js/winkel.js — daar kleingeschreven) */
const WERELD_CODEWOORDEN = ["STERK", "BOUW", "KLUIS", "SCHILD", "SLOTEN", "EXPERT"];

/* Woordenlijsten voor de oefenwachtwoorden (bijv. "Vos-Raket-42") */
const WW_DIEREN = ["Vos", "Uil", "Kat", "Wolf", "Beer", "Egel", "Otter", "Valk",
                   "Haai", "Panda", "Tijger", "Draak", "Bever", "Zwaan", "Lynx", "Mol"];
const WW_DINGEN = ["Raket", "Fiets", "Toren", "Schild", "Laser", "Anker", "Kompas",
                   "Lamp", "Trein", "Ballon", "Magneet", "Planeet", "Helm", "Vlot",
                   "Poort", "Kristal"];

/* ------------------------------------------------------------
   DB — kleine Supabase-client (auth + REST) met sessiebeheer
   ------------------------------------------------------------ */

const DB = {

  sessie: null,   // { access_token, refresh_token, verloopt_op }
  SESSIE_SLEUTEL: "vonk-leerkracht-sessie",

  ingesteld() {
    return typeof SUPABASE_CONFIG !== "undefined" &&
           !!SUPABASE_CONFIG.url &&
           SUPABASE_CONFIG.url.indexOf("JOUW-") === -1 &&
           SUPABASE_CONFIG.url.indexOf("https://") === 0;
  },

  /* --- Auth --- */

  async authVerzoek(pad, body) {
    const antwoord = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/${pad}`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_CONFIG.anonKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
    const data = await antwoord.json().catch(() => ({}));
    if (!antwoord.ok) {
      throw new Error(data.msg || data.error_description || data.message ||
                      `Fout (${antwoord.status})`);
    }
    return data;
  },

  bewaarSessie(data) {
    this.sessie = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      // 60 s marge zodat we nooit met een nét verlopen token werken
      verloopt_op: Date.now() + (data.expires_in - 60) * 1000
    };
    try {
      localStorage.setItem(this.SESSIE_SLEUTEL, JSON.stringify(this.sessie));
    } catch (e) {}
  },

  laadSessie() {
    try {
      this.sessie = JSON.parse(localStorage.getItem(this.SESSIE_SLEUTEL));
    } catch (e) { this.sessie = null; }
  },

  wisSessie() {
    this.sessie = null;
    try { localStorage.removeItem(this.SESSIE_SLEUTEL); } catch (e) {}
  },

  async login(email, wachtwoord) {
    const data = await this.authVerzoek("token?grant_type=password",
      { email, password: wachtwoord });
    this.bewaarSessie(data);
  },

  /* Account aanmaken. Geeft true terug als er direct een sessie is;
     false als Supabase eerst een bevestigingsmail stuurt. */
  async registreer(email, wachtwoord) {
    const data = await this.authVerzoek("signup", { email, password: wachtwoord });
    if (data.access_token) { this.bewaarSessie(data); return true; }
    return false;
  },

  /* Zorg dat het token geldig is (zo nodig verversen) */
  async zorgVoorSessie() {
    if (!this.sessie) return false;
    if (Date.now() < this.sessie.verloopt_op) return true;
    try {
      const data = await this.authVerzoek("token?grant_type=refresh_token",
        { refresh_token: this.sessie.refresh_token });
      this.bewaarSessie(data);
      return true;
    } catch (e) {
      this.wisSessie();
      return false;
    }
  },

  /* --- REST (tabellen) --- */

  async api(methode, pad, body = null, prefer = null) {
    if (!(await this.zorgVoorSessie())) throw new Error("Niet ingelogd");

    const headers = {
      "apikey": SUPABASE_CONFIG.anonKey,
      "Authorization": `Bearer ${this.sessie.access_token}`,
      "Content-Type": "application/json"
    };
    if (prefer) headers["Prefer"] = prefer;

    const antwoord = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${pad}`, {
      method: methode,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    if (!antwoord.ok) {
      const fout = await antwoord.json().catch(() => ({}));
      throw new Error(fout.message || `Fout (${antwoord.status})`);
    }
    if (antwoord.status === 204) return null;
    const tekst = await antwoord.text();
    return tekst ? JSON.parse(tekst) : null;
  }
};

/* ------------------------------------------------------------
   DASHBOARD — de schermen en acties
   ------------------------------------------------------------ */

const Dashboard = {

  klassen: [],
  klas: null,        // de geopende klas
  leerlingen: [],    // leerlingen van de geopende klas

  /* --- Opstarten --- */

  async start() {
    this.bind();

    if (!DB.ingesteld()) { this.toonView("config"); return; }

    DB.laadSessie();
    if (DB.sessie && await DB.zorgVoorSessie()) {
      await this.naarKlassen();
    } else {
      this.toonView("auth");
    }
  },

  toonView(naam) {
    for (const view of ["config", "auth", "klassen", "klas"]) {
      document.getElementById(`lk-view-${view}`)
        .classList.toggle("lk-verborgen", view !== naam);
    }
    document.getElementById("lk-knop-uitloggen")
      .classList.toggle("lk-verborgen", naam === "auth" || naam === "config");
  },

  zetMelding(elementId, tekst) {
    const el = document.getElementById(elementId);
    el.textContent = tekst || "";
    el.classList.toggle("lk-verborgen", !tekst);
  },

  bind() {
    const k = (id, fn) => document.getElementById(id).addEventListener("click", fn);

    k("lk-knop-inloggen",    () => this.authActie(false));
    k("lk-knop-registreren", () => this.authActie(true));
    document.getElementById("lk-auth-wachtwoord").addEventListener("keydown",
      (e) => { if (e.key === "Enter") this.authActie(false); });

    k("lk-knop-uitloggen", () => {
      DB.wisSessie();
      this.toonView("auth");
    });

    k("lk-knop-klas-maken", () => this.maakKlas());
    document.getElementById("lk-nieuwe-klas").addEventListener("keydown",
      (e) => { if (e.key === "Enter") this.maakKlas(); });

    k("lk-knop-terug",     () => this.naarKlassen());
    k("lk-knop-verversen", () => this.openKlas(this.klas.id));
    k("lk-knop-printen",   () => this.printInloggegevens());
    k("lk-knop-klas-verwijderen",       () => this.verwijderKlas());
    k("lk-knop-leerlingen-toevoegen",   () => this.voegLeerlingenToe());

    /* Volledig scherm: knop + F-toets (niet terwijl je in een veld typt) */
    k("lk-knop-fullscreen", () => this.toggleFullscreen());
    document.addEventListener("keydown", (e) => {
      const inVeld = ["input", "textarea"].includes((e.target.tagName || "").toLowerCase());
      if (e.key.toLowerCase() === "f" && !inVeld) this.toggleFullscreen();
    });
    document.addEventListener("fullscreenchange", () => this.werkFullscreenKnopBij());
  },

  /* Volledig scherm aan/uit (de hele dashboardpagina).
     Werkt ook in een iframe met 'allow="fullscreen"'. */
  toggleFullscreen() {
    const el = document.documentElement;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  },

  werkFullscreenKnopBij() {
    const knop = document.getElementById("lk-knop-fullscreen");
    if (knop) knop.innerHTML = document.fullscreenElement
      ? "⛶ Verlaten" : "⛶ Volledig scherm";
  },

  /* --- Inloggen / registreren --- */

  async authActie(nieuw) {
    const email = document.getElementById("lk-auth-email").value.trim();
    const wachtwoord = document.getElementById("lk-auth-wachtwoord").value;
    this.zetMelding("lk-auth-fout", "");
    this.zetMelding("lk-auth-info", "");

    if (!email || !wachtwoord) {
      this.zetMelding("lk-auth-fout", "Vul je e-mailadres en wachtwoord in.");
      return;
    }
    if (nieuw && wachtwoord.length < 8) {
      this.zetMelding("lk-auth-fout",
        "Kies een wachtwoord van minstens 8 tekens. (Goed voorbeeld doet volgen!)");
      return;
    }

    try {
      if (nieuw) {
        const directIngelogd = await DB.registreer(email, wachtwoord);
        if (!directIngelogd) {
          this.zetMelding("lk-auth-info",
            "Account aangemaakt! Check je mail om je adres te bevestigen en log daarna hier in.");
          return;
        }
      } else {
        await DB.login(email, wachtwoord);
      }
      await this.naarKlassen();
    } catch (fout) {
      const tekst = String(fout.message || fout);
      this.zetMelding("lk-auth-fout",
        tekst.indexOf("Invalid login") >= 0
          ? "Onjuist e-mailadres of wachtwoord."
          : tekst.indexOf("already registered") >= 0
            ? "Er bestaat al een account met dit e-mailadres. Log in."
            : `Dat lukte niet: ${tekst}`);
    }
  },

  /* --- Klassenoverzicht --- */

  async naarKlassen() {
    try {
      this.klassen = await DB.api("GET",
        "klassen?select=id,naam,open_werelden,leerlingen(count)&order=naam");
    } catch (fout) {
      this.toonView("auth");
      this.zetMelding("lk-auth-fout", `Kon de klassen niet laden: ${fout.message}`);
      return;
    }

    const lijst = document.getElementById("lk-klassen-lijst");
    lijst.innerHTML = "";
    if (!this.klassen.length) {
      lijst.innerHTML = `<p class="lk-stil">Nog geen klassen — maak hieronder je eerste klas aan.</p>`;
    }
    for (const klas of this.klassen) {
      const aantal = klas.leerlingen && klas.leerlingen[0] ? klas.leerlingen[0].count : 0;
      const open = (klas.open_werelden || []).filter(Boolean).length;
      const kaart = document.createElement("div");
      kaart.className = "lk-klas-kaart";
      kaart.innerHTML = `<b>${this.veilig(klas.naam)}</b>
        <p>${aantal} leerling${aantal === 1 ? "" : "en"} &middot; ${open}/6 werelden open</p>`;
      kaart.addEventListener("click", () => this.openKlas(klas.id));
      lijst.appendChild(kaart);
    }

    this.zetMelding("lk-klassen-fout", "");
    this.toonView("klassen");
  },

  async maakKlas() {
    const naam = document.getElementById("lk-nieuwe-klas").value.trim();
    this.zetMelding("lk-klassen-fout", "");
    if (naam.length < 3) {
      this.zetMelding("lk-klassen-fout", "Kies een klasnaam van minstens 3 tekens.");
      return;
    }

    try {
      const rijen = await DB.api("POST", "klassen", { naam }, "return=representation");
      document.getElementById("lk-nieuwe-klas").value = "";
      await this.openKlas(rijen[0].id);
    } catch (fout) {
      this.zetMelding("lk-klassen-fout",
        String(fout.message).indexOf("duplicate") >= 0 ||
        String(fout.message).indexOf("uniek") >= 0
          ? `De klasnaam “${naam}” is al in gebruik (ook door andere scholen). Maak hem unieker, bijv. met je schoolnaam erin.`
          : `Dat lukte niet: ${fout.message}`);
    }
  },

  /* --- Klasdetail --- */

  async openKlas(klasId) {
    try {
      const [klassen, leerlingen] = await Promise.all([
        DB.api("GET", `klassen?id=eq.${klasId}&select=*`),
        DB.api("GET", `leerlingen?klas_id=eq.${klasId}` +
                      `&select=id,naam,wachtwoord,voortgang,laatst_gespeeld&order=naam`)
      ]);
      if (!klassen.length) { await this.naarKlassen(); return; }
      this.klas = klassen[0];
      this.leerlingen = leerlingen;
    } catch (fout) {
      alert(`Kon de klas niet laden: ${fout.message}`);
      return;
    }

    document.getElementById("lk-klas-titel").textContent = this.klas.naam;
    document.getElementById("lk-klas-loginnaam").textContent = this.klas.naam;
    this.zetMelding("lk-klas-fout", "");
    this.renderWerelden();
    this.renderLeerlingen();
    this.toonView("klas");
  },

  async verwijderKlas() {
    const zeker = confirm(
      `Weet je zeker dat je klas “${this.klas.naam}” wilt verwijderen?\n` +
      `Alle leerlingen en hun voortgang worden dan ook verwijderd!`);
    if (!zeker) return;
    try {
      await DB.api("DELETE", `klassen?id=eq.${this.klas.id}`);
      await this.naarKlassen();
    } catch (fout) {
      alert(`Verwijderen lukte niet: ${fout.message}`);
    }
  },

  /* --- Werelden open/dicht --- */

  renderWerelden() {
    const houder = document.getElementById("lk-werelden");
    houder.innerHTML = "";

    WERELD_INFO.forEach((info, w) => {
      const open = this.klas.open_werelden[w] === true;

      const blok = document.createElement("div");
      blok.className = "lk-wereld" + (open ? " lk-wereld-open" : "");
      blok.innerHTML = `
        <div class="lk-wereld-info">
          <b>Wereld ${w + 1} — ${info.naam}</b>
          <span>${info.doel}</span>
        </div>
        <label class="lk-schakel">
          <input type="checkbox" ${open ? "checked" : ""}>
          <span class="lk-schuif"></span>
        </label>`;

      blok.querySelector("input").addEventListener("change", (e) => {
        this.zetWereld(w, e.target.checked);
      });
      houder.appendChild(blok);
    });
  },

  async zetWereld(w, open) {
    const nieuw = this.klas.open_werelden.slice();
    nieuw[w] = open;
    try {
      await DB.api("PATCH", `klassen?id=eq.${this.klas.id}`, { open_werelden: nieuw });
      this.klas.open_werelden = nieuw;
    } catch (fout) {
      alert(`Opslaan lukte niet: ${fout.message}`);
    }
    this.renderWerelden();   // ook bij een fout: schakelaar terugzetten
  },

  /* --- Leerlingen: tabel met voortgang --- */

  renderLeerlingen() {
    const kop = document.querySelector("#lk-leerlingen-tabel thead");
    const romp = document.querySelector("#lk-leerlingen-tabel tbody");
    document.getElementById("lk-leerlingen-leeg")
      .classList.toggle("lk-verborgen", this.leerlingen.length > 0);
    document.getElementById("lk-leerlingen-tabel")
      .classList.toggle("lk-verborgen", !this.leerlingen.length);
    if (!this.leerlingen.length) { kop.innerHTML = ""; romp.innerHTML = ""; return; }

    // Koppen: per wereld één kolom ("levels af · % goed")
    kop.innerHTML = `<tr>
      <th>Naam</th>
      <th>Wachtwoord</th>
      <th title="Gehaalde levels (alle werelden samen) en totaal aantal sterren">Totaal</th>
      ${WERELD_INFO.map((info, w) =>
        `<th class="lk-th-wereld" title="${info.naam} — ${info.doel}">W${w + 1}</th>`).join("")}
      <th>Laatst gespeeld</th>
      <th></th>
    </tr>`;

    romp.innerHTML = "";
    for (const leerling of this.leerlingen) {
      romp.appendChild(this.maakLeerlingRij(leerling));
    }
  },

  maakLeerlingRij(leerling) {
    const voortgang = leerling.voortgang || {};
    const sterren = voortgang.sterrenPerLevel || {};
    const stats = voortgang.vragenStats || {};
    const codes = voortgang.verzilverdeCodes || [];

    const rij = document.createElement("tr");

    // Per wereld: levels gehaald + % vragen goed + codewoord ✓/✗
    const wereldCellen = WERELD_INFO.map((info, w) => {
      let levelsAf = 0;
      for (let l = 0; l < info.levels; l++) {
        if ((sterren[`${w}-${l}`] || 0) >= 1) levelsAf++;
      }
      const stat = stats[String(w)];
      const procent = stat && stat.totaal > 0
        ? Math.round(100 * stat.goed / stat.totaal) : null;

      // Codewoord van deze wereld verzilverd? (opgeslagen in kleine letters)
      const woord = WERELD_CODEWOORDEN[w];
      const verzilverd = codes.includes(woord.toLowerCase());
      const codeRegel = verzilverd
        ? `<span class="lk-code lk-code-ok" title="Codewoord ${woord} verzilverd">&#10003; ${woord}</span>`
        : `<span class="lk-code lk-code-nee" title="Codewoord ${woord} nog niet verzilverd">&#10007; ${woord}</span>`;

      const voortgangRegel = (levelsAf === 0 && procent === null)
        ? `<span class="lk-leeg">—</span>`
        : `${levelsAf}/${info.levels}` + (procent === null ? "" :
            ` &middot; <span class="${
              procent >= 80 ? "lk-procent-goed" :
              procent >= 55 ? "lk-procent-matig" : "lk-procent-laag"
            }" title="${procent}% van de vragen goed beantwoord">${procent}%</span>`);

      return `<td class="lk-td-wereld">${voortgangRegel}<br>${codeRegel}</td>`;
    }).join("");

    rij.innerHTML = `
      <td><b>${this.veilig(leerling.naam)}</b></td>
      <td><span class="lk-ww">${this.veilig(leerling.wachtwoord)}</span></td>
      <td>${this.totaal(sterren)}</td>
      ${wereldCellen}
      <td>${this.wanneer(leerling.laatst_gespeeld)}${this.laatsteLevel(voortgang)}</td>
      <td></td>`;

    // Actieknoppen (nieuw wachtwoord / verwijderen)
    const acties = rij.lastElementChild;

    const nieuwWw = document.createElement("button");
    nieuwWw.className = "lk-knop lk-knop-mini";
    nieuwWw.textContent = "🔑 nieuw ww";
    nieuwWw.title = "Nieuw wachtwoord genereren (bijv. als een leerling het kwijt is)";
    nieuwWw.addEventListener("click", () => this.nieuwWachtwoord(leerling));
    acties.appendChild(nieuwWw);

    const weg = document.createElement("button");
    weg.className = "lk-knop lk-knop-mini lk-knop-gevaar";
    weg.textContent = "🗑";
    weg.title = "Leerling verwijderen";
    weg.addEventListener("click", () => this.verwijderLeerling(leerling));
    acties.appendChild(weg);

    return rij;
  },

  /* "Totaal": gehaalde levels over alle werelden + totaal sterren.
     (Bewust géén "verste level": leerlingen kunnen vooruit springen
      naar werelden die de leerkracht heeft opengezet.) */
  totaal(sterren) {
    const totaalLevels = WERELD_INFO.reduce((som, info) => som + info.levels, 0);
    let levelsAf = 0;
    for (let w = 0; w < WERELD_INFO.length; w++) {
      for (let l = 0; l < WERELD_INFO[w].levels; l++) {
        if ((sterren[`${w}-${l}`] || 0) >= 1) levelsAf++;
      }
    }
    if (levelsAf === 0) return `<span class="lk-leeg">nog niet gespeeld</span>`;
    const totaalSterren = Object.values(sterren).reduce((a, b) => a + b, 0);
    return `${levelsAf}/${totaalLevels} levels
      <span class="lk-sterretje">★</span>${totaalSterren}`;
  },

  /* Laatst gestarte level, bijv. " · W6 L2" (als de game dat al
     heeft doorgegeven — oudere voortgang heeft dit veld nog niet) */
  laatsteLevel(voortgang) {
    if (!voortgang.laatsteLevel) return "";
    const [w, l] = String(voortgang.laatsteLevel).split("-").map(Number);
    if (isNaN(w) || isNaN(l)) return "";
    return ` &middot; W${w + 1} L${l + 1}`;
  },

  wanneer(tijdstip) {
    if (!tijdstip) return `<span class="lk-leeg">—</span>`;
    const datum = new Date(tijdstip);
    const vandaag = new Date();
    const gisteren = new Date(Date.now() - 86400000);
    const zelfdeDag = (a, b) => a.toDateString() === b.toDateString();
    const uurMin = datum.toLocaleTimeString("nl-NL",
      { hour: "2-digit", minute: "2-digit" });
    if (zelfdeDag(datum, vandaag))  return `vandaag ${uurMin}`;
    if (zelfdeDag(datum, gisteren)) return `gisteren ${uurMin}`;
    return datum.toLocaleDateString("nl-NL",
      { day: "numeric", month: "short" });
  },

  /* --- Leerlingen toevoegen / beheren --- */

  maakWachtwoord() {
    const kies = (lijst) => lijst[Math.floor(Math.random() * lijst.length)];
    const getal = 10 + Math.floor(Math.random() * 90);
    return `${kies(WW_DIEREN)}-${kies(WW_DINGEN)}-${getal}`;
  },

  async voegLeerlingenToe() {
    const invoer = document.getElementById("lk-nieuwe-leerlingen");
    this.zetMelding("lk-klas-fout", "");

    const bestaand = new Set(this.leerlingen.map(l => l.naam.toLowerCase()));
    const namen = [];
    for (const regel of invoer.value.split("\n")) {
      const naam = regel.trim();
      if (!naam) continue;
      if (bestaand.has(naam.toLowerCase())) {
        this.zetMelding("lk-klas-fout",
          `“${naam}” staat al in deze klas. Gebruik bijv. een achternaam-letter erbij (Sanne B.).`);
        return;
      }
      bestaand.add(naam.toLowerCase());
      namen.push(naam);
    }
    if (!namen.length) {
      this.zetMelding("lk-klas-fout", "Typ eerst één of meer namen (één per regel).");
      return;
    }

    const rijen = namen.map(naam => ({
      klas_id: this.klas.id,
      naam,
      wachtwoord: this.maakWachtwoord()
    }));

    try {
      await DB.api("POST", "leerlingen", rijen);
      invoer.value = "";
      await this.openKlas(this.klas.id);
    } catch (fout) {
      this.zetMelding("lk-klas-fout", `Toevoegen lukte niet: ${fout.message}`);
    }
  },

  async nieuwWachtwoord(leerling) {
    const nieuw = this.maakWachtwoord();
    const zeker = confirm(
      `Nieuw wachtwoord voor ${leerling.naam}: ${nieuw}\n\n` +
      `Het oude wachtwoord werkt daarna niet meer. Doorgaan?`);
    if (!zeker) return;
    try {
      await DB.api("PATCH", `leerlingen?id=eq.${leerling.id}`, { wachtwoord: nieuw });
      await this.openKlas(this.klas.id);
    } catch (fout) {
      alert(`Dat lukte niet: ${fout.message}`);
    }
  },

  async verwijderLeerling(leerling) {
    const zeker = confirm(
      `${leerling.naam} verwijderen uit de klas?\n` +
      `De voortgang van deze leerling gaat dan verloren.`);
    if (!zeker) return;
    try {
      await DB.api("DELETE", `leerlingen?id=eq.${leerling.id}`);
      await this.openKlas(this.klas.id);
    } catch (fout) {
      alert(`Dat lukte niet: ${fout.message}`);
    }
  },

  /* --- Printbare inlogkaartjes --- */

  printInloggegevens() {
    if (!this.leerlingen.length) {
      alert("Er zijn nog geen leerlingen om te printen.");
      return;
    }
    const houder = document.getElementById("lk-print");
    houder.innerHTML = this.leerlingen.map(l => `
      <div class="lk-kaartje">
        <h4>🤖 Vonk de Robot — inloggen</h4>
        <p>Klas: <b>${this.veilig(this.klas.naam)}</b></p>
        <p>Naam: <b>${this.veilig(l.naam)}</b></p>
        <p>Wachtwoord: <span class="lk-ww">${this.veilig(l.wachtwoord)}</span></p>
      </div>`).join("");
    window.print();
  },

  /* Tekst veilig maken voor innerHTML */
  veilig(tekst) {
    const el = document.createElement("span");
    el.textContent = tekst == null ? "" : String(tekst);
    return el.innerHTML;
  }
};

window.addEventListener("DOMContentLoaded", () => Dashboard.start());
