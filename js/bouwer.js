/* ============================================================
   BOUWER — De wachtwoord-bouwer: het afsluitmoment na de finish.

   De speler bouwt zelf een supersterk (nep!)wachtwoord. Een
   live sterkte-meter en checklist laten zien wat er goed is:
     ✔ minstens 10 tekens          ✔ een cijfer
     ✔ een hoofdletter             ✔ een speciaal teken
     ✔ een kleine letter           ✔ geen makkelijk woord

   Hoe sterker het wachtwoord, hoe meer bonussleutels:
     0-2 punten → 0   |   3-4 → +1   |   5 → +2   |   6 → +3

   Zo passen kinderen de regels zelf toe in plaats van ze alleen
   te herkennen. Het venster benadrukt: nooit je echte wachtwoord!
   ============================================================ */

/* Woorden die te makkelijk te raden zijn (kleine letters) */
const MAKKELIJKE_WOORDEN = [
  "welkom", "wachtwoord", "qwerty", "azerty", "password", "letmein",
  "12345", "54321", "hallo", "iloveyou", "voetbal", "minecraft",
  "school", "geheim", "abc", "000", "111"
];

class WachtwoordBouwer {

  constructor(bijKlaar) {
    this.invoerEl   = document.getElementById("vg-bouwer-invoer");
    this.meterEl    = document.getElementById("vg-bouwer-meter-vulling");
    this.labelEl    = document.getElementById("vg-bouwer-label");
    this.bonusEl    = document.getElementById("vg-bouwer-bonus");
    this.checklistEl= document.getElementById("vg-bouwer-checklist");
    this.klaarKnop  = document.getElementById("vg-knop-bouwer-klaar");
    this.slaKnop    = document.getElementById("vg-knop-bouwer-overslaan");

    this.bijKlaar = bijKlaar;   // callback(bonusSleutels)

    this.invoerEl.addEventListener("input", () => this.werkBij());
    this.invoerEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.rondAf();
      e.stopPropagation();   // typen mag de game-toetsen (R/P) niet triggeren
    });
    this.klaarKnop.addEventListener("click", () => this.rondAf());
    this.slaKnop.addEventListener("click", () => this.bijKlaar(0));
  }

  /* Venster openen met een leeg invoerveld */
  open() {
    this.invoerEl.value = "";
    this.werkBij();
    // Even wachten tot het scherm zichtbaar is, dan focus op het veld
    setTimeout(() => this.invoerEl.focus(), 50);
  }

  /* --- De 6 controles: geeft { punten, checks } terug --- */
  controleer(wachtwoord) {
    const klein = wachtwoord.toLowerCase();

    const checks = {
      lang:        wachtwoord.length >= 10,
      hoofdletter: /[A-Z]/.test(wachtwoord),
      kleineletter:/[a-z]/.test(wachtwoord),
      cijfer:      /[0-9]/.test(wachtwoord),
      teken:       /[^A-Za-z0-9]/.test(wachtwoord),
      // Geen makkelijk woord erin én niet steeds hetzelfde teken
      nietMakkelijk: wachtwoord.length > 0 &&
                     !MAKKELIJKE_WOORDEN.some(w => klein.includes(w)) &&
                     !/^(.)\1+$/.test(wachtwoord)
    };

    const punten = Object.values(checks).filter(Boolean).length;
    return { punten, checks };
  }

  /* Punten omrekenen naar bonussleutels */
  bonusSleutels(punten) {
    if (punten >= 6) return 3;
    if (punten >= 5) return 2;
    if (punten >= 3) return 1;
    return 0;
  }

  /* Meter, checklist en bonustekst live bijwerken tijdens het typen */
  werkBij() {
    const { punten, checks } = this.controleer(this.invoerEl.value);

    // Sterkte-meter (breedte + kleur)
    const stappen = [
      { label: "Nog leeg…",   kleur: "#c3c9d8" },
      { label: "Zwak",        kleur: "#d95252" },
      { label: "Zwak",        kleur: "#d95252" },
      { label: "Oké",         kleur: "#e8a33d" },
      { label: "Oké",         kleur: "#e8a33d" },
      { label: "Sterk",       kleur: "#8bc34a" },
      { label: "Supersterk!", kleur: "#3cb54a" }
    ];
    const stap = stappen[punten];
    this.meterEl.style.width = `${(punten / 6) * 100}%`;
    this.meterEl.style.background = stap.kleur;
    this.labelEl.textContent = this.invoerEl.value.length === 0 ? stappen[0].label : stap.label;

    // Checklist: vinkje per behaalde regel
    for (const [naam, behaald] of Object.entries(checks)) {
      const li = this.checklistEl.querySelector(`[data-check="${naam}"]`);
      if (li) li.classList.toggle("vg-check-behaald", behaald);
    }

    // Bonus-voorproefje
    const bonus = this.bonusSleutels(punten);
    this.bonusEl.textContent = bonus > 0
      ? `Bonus: +${bonus} sleutel${bonus > 1 ? "s" : ""} 🔑`
      : "Nog geen bonus — maak het sterker!";
  }

  /* Klaar: bonus uitrekenen en teruggeven aan de game */
  rondAf() {
    const { punten } = this.controleer(this.invoerEl.value);
    this.bijKlaar(this.bonusSleutels(punten));
  }
}
