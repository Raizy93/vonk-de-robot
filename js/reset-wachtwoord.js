/* ============================================================
   RESET-WACHTWOORD — verwerkt Supabase recovery-links.

   Supabase stuurt na "Send recovery mail" een link terug naar
   deze pagina met een access_token in de URL-hash. Met dat token
   mag precies het wachtwoord van deze gebruiker worden aangepast.
   ============================================================ */

const ResetWachtwoord = {

  token: null,

  start() {
    this.token = this.haalTokenUitUrl();
    this.zetDashboardLinks();
    this.bind();

    if (!this.ingesteld()) {
      this.toonFout("Supabase is nog niet ingesteld in js/supabase-config.js.");
      return;
    }

    if (!this.token) {
      document.getElementById("rw-formulier").classList.add("lk-verborgen");
      document.getElementById("rw-geen-token").classList.remove("lk-verborgen");
      return;
    }

    document.getElementById("rw-wachtwoord").focus();
  },

  ingesteld() {
    return typeof SUPABASE_CONFIG !== "undefined" &&
           !!SUPABASE_CONFIG.url &&
           !!SUPABASE_CONFIG.anonKey &&
           SUPABASE_CONFIG.url.indexOf("JOUW-") === -1;
  },

  dashboardUrl() {
    return (typeof SUPABASE_CONFIG !== "undefined" && SUPABASE_CONFIG.dashboardUrl)
      ? SUPABASE_CONFIG.dashboardUrl
      : "leerkracht.html";
  },

  zetDashboardLinks() {
    for (const link of document.querySelectorAll("[data-dashboard-link]")) {
      link.href = this.dashboardUrl();
      link.target = "_top";
    }
  },

  bind() {
    document.getElementById("rw-knop-opslaan")
      .addEventListener("click", () => this.opslaan());

    for (const id of ["rw-wachtwoord", "rw-wachtwoord-herhaal"]) {
      document.getElementById(id).addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.opslaan();
      });
    }
  },

  haalTokenUitUrl() {
    const hash = new URLSearchParams((window.location.hash || "").replace(/^#/, ""));
    const zoek = new URLSearchParams(window.location.search || "");
    const fout = hash.get("error_description") || zoek.get("error_description");
    if (fout) {
      setTimeout(() => this.toonFout(decodeURIComponent(fout).replace(/\+/g, " ")), 0);
    }
    return hash.get("access_token") || zoek.get("access_token") || null;
  },

  toonFout(tekst) {
    const fout = document.getElementById("rw-fout");
    const info = document.getElementById("rw-info");
    fout.textContent = tekst || "";
    fout.classList.toggle("lk-verborgen", !tekst);
    info.classList.add("lk-verborgen");
  },

  toonInfo(tekst) {
    const fout = document.getElementById("rw-fout");
    const info = document.getElementById("rw-info");
    info.textContent = tekst || "";
    info.classList.toggle("lk-verborgen", !tekst);
    fout.classList.add("lk-verborgen");
  },

  async opslaan() {
    const wachtwoord = document.getElementById("rw-wachtwoord").value;
    const herhaal = document.getElementById("rw-wachtwoord-herhaal").value;

    if (!this.token) {
      this.toonFout("Deze herstel-link mist een geldige code. Vraag een nieuwe mail aan.");
      return;
    }
    if (wachtwoord.length < 8) {
      this.toonFout("Kies een wachtwoord van minstens 8 tekens.");
      return;
    }
    if (wachtwoord !== herhaal) {
      this.toonFout("De twee wachtwoorden zijn niet gelijk.");
      return;
    }

    const knop = document.getElementById("rw-knop-opslaan");
    knop.disabled = true;
    knop.textContent = "Opslaan...";

    try {
      const antwoord = await fetch(`${SUPABASE_CONFIG.url}/auth/v1/user`, {
        method: "PUT",
        headers: {
          "apikey": SUPABASE_CONFIG.anonKey,
          "Authorization": `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password: wachtwoord })
      });

      const data = await antwoord.json().catch(() => ({}));
      if (!antwoord.ok) {
        throw new Error(data.msg || data.error_description || data.message ||
                        `Fout (${antwoord.status})`);
      }

      this.toonInfo("Gelukt! Je wachtwoord is aangepast. Je wordt zo teruggestuurd naar het dashboard.");
      window.history.replaceState(null, "", window.location.pathname);
      setTimeout(() => { this.gaNaarDashboard(); }, 1800);
    } catch (fout) {
      this.toonFout(`Opslaan lukte niet: ${fout.message || fout}. Vraag eventueel een nieuwe herstelmail aan.`);
      knop.disabled = false;
      knop.textContent = "Wachtwoord opslaan";
    }
  }
,

  gaNaarDashboard() {
    const url = this.dashboardUrl();
    try {
      window.top.location.href = url;
    } catch (e) {
      window.location.href = url;
    }
  }
};

window.addEventListener("DOMContentLoaded", () => ResetWachtwoord.start());
