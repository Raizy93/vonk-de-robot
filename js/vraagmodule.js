/* ============================================================
   VRAAGMODULE — Het wachtwoordvraagvenster.

   Ondersteunt zeven vraagvormen:
     "veilig"   : één wachtwoord → kies Veilig / Niet veilig
     "sterkste" : drie wachtwoorden → kies het sterkste
     "verbeter" : zwak wachtwoord → kies de beste verbetering
     "echtnep"  : een bericht → te vertrouwen of niet?
     "geheim"   : een situatie → is dit oké of niet? (Wereld 3)
     "beveilig" : een keuze → slim of niet slim? (Wereld 5)
     "situatie" : wat doe je? → drie keuzes

   Gebruik:
     vraagModule.open(vraag, bijAntwoord)
       - bijAntwoord(goed) wordt één keer aangeroepen met true/false

   Bij goed  : positieve feedback + uitleg + sleutel erbij.
   Bij fout  : rustige feedback + uitleg waarom, geen sleutel.
   Daarna klikt de speler "Verder spelen" en gaat het spel door.
   Het spel staat ondertussen veilig op pauze (status "vraag").
   ============================================================ */

class VraagModule {

  constructor(bijVerder) {
    this.scherm       = document.getElementById("vg-scherm-vraag");
    this.titelEl      = document.getElementById("vg-vraag-titel");
    this.wachtwoordEl = document.getElementById("vg-vraag-wachtwoord");
    this.keuzesEl     = document.getElementById("vg-vraag-keuzes");
    this.feedbackEl   = document.getElementById("vg-vraag-feedback");
    this.uitlegEl     = document.getElementById("vg-vraag-uitleg");
    this.sleutelsEl   = document.getElementById("vg-vraag-sleutels");
    this.verderKnop   = document.getElementById("vg-knop-vraag-verder");

    this.bijVerder = bijVerder;   // callback: venster dicht, spel hervatten
    this.verderKnop.addEventListener("click", () => this.sluit());

    // Standaard-feedback; per wereld te vervangen via zetFeedback()
    this.feedbackGoedLijst = FEEDBACK_GOED;
    this.feedbackFoutLijst = FEEDBACK_FOUT;
  }

  /* Elke wereld heeft eigen feedbackzinnen (zie werelden.js) */
  zetFeedback(goedLijst, foutLijst) {
    this.feedbackGoedLijst = goedLijst;
    this.feedbackFoutLijst = foutLijst;
  }

  open(vraag, bijAntwoord) {
    this.vraag = vraag;
    this.bijAntwoord = bijAntwoord;
    const type = vraag.type || "veilig";

    // Venster terugzetten naar de beginstand
    this.feedbackEl.classList.add("vg-verborgen");
    this.feedbackEl.className = "vg-verborgen";
    this.uitlegEl.classList.add("vg-verborgen");
    this.sleutelsEl.classList.add("vg-verborgen");
    this.verderKnop.classList.add("vg-verborgen");
    this.keuzesEl.innerHTML = "";

    // Titel, tekstvak en knoppen per vraagvorm
    if (type === "veilig") {
      this.titelEl.textContent = "Is dit wachtwoord veilig?";
      this.toonWachtwoord(vraag.password);
      this.maakTweeKnoppen("✔ Veilig", "✖ Niet veilig", vraag.safe);
    } else if (type === "sterkste") {
      this.titelEl.textContent = "Welk wachtwoord is het sterkst?";
      this.toonWachtwoord(null);
      this.maakOptieKnoppen(vraag.opties, true);    // monospace: het zijn wachtwoorden
    } else if (type === "verbeter") {
      this.titelEl.textContent = "Hoe maak je dit wachtwoord sterker?";
      this.toonWachtwoord(vraag.password);
      this.maakOptieKnoppen(vraag.opties, false);   // gewone tekstopties
    } else if (type === "echtnep") {
      this.titelEl.textContent = "Kun je dit bericht vertrouwen?";
      this.toonBericht(vraag.bericht);
      this.maakTweeKnoppen("✔ Te vertrouwen", "✖ Niet te vertrouwen", vraag.echt);
    } else if (type === "geheim") {
      this.titelEl.textContent = "Is dit oké?";
      this.toonBericht(vraag.situatie);
      this.maakTweeKnoppen("✔ Prima!", "✖ Niet doen!", vraag.oke);
    } else if (type === "beveilig") {
      this.titelEl.textContent = "Slim of niet slim?";
      this.toonBericht(vraag.situatie);
      this.maakTweeKnoppen("✔ Slim", "✖ Niet slim", vraag.slim);
    } else if (type === "situatie") {
      this.titelEl.textContent = vraag.vraag;
      this.toonWachtwoord(null);
      this.maakOptieKnoppen(vraag.opties, false);
    }

    this.scherm.classList.remove("vg-verborgen");
  }

  /* Het voorbeeldwachtwoord tonen (of verbergen bij null) */
  toonWachtwoord(tekst) {
    this.wachtwoordEl.classList.toggle("vg-verborgen", tekst === null);
    this.wachtwoordEl.classList.remove("vg-bericht");
    if (tekst !== null) this.wachtwoordEl.textContent = tekst;
  }

  /* Een (nep)bericht tonen: als chatballon in plaats van wachtwoord */
  toonBericht(tekst) {
    this.wachtwoordEl.classList.remove("vg-verborgen");
    this.wachtwoordEl.classList.add("vg-bericht");
    this.wachtwoordEl.textContent = tekst;
  }

  /* --- Twee ja/nee-knoppen (veilig/niet-veilig, echt/nep).
         'waarheid' = true als de groene knop het juiste antwoord is. --- */
  maakTweeKnoppen(tekstJa, tekstNee, waarheid) {
    this.keuzesEl.className = "vg-vraag-keuzes vg-keuzes-2";

    const ja = this.maakKnop(tekstJa, "vg-antwoord-veilig");
    const nee = this.maakKnop(tekstNee, "vg-antwoord-nietveilig");

    const juisteKnop = waarheid ? ja : nee;
    ja.addEventListener("click", () => this.kies(ja, juisteKnop, waarheid === true));
    nee.addEventListener("click", () => this.kies(nee, juisteKnop, waarheid === false));
  }

  /* --- Vormen "sterkste"/"verbeter": drie keuzeknoppen onder elkaar --- */
  maakOptieKnoppen(opties, monospace) {
    this.keuzesEl.className = "vg-vraag-keuzes vg-keuzes-1";

    const knoppen = opties.map(tekst =>
      this.maakKnop(tekst, "vg-antwoord-optie" + (monospace ? " vg-antwoord-mono" : "")));

    const juisteKnop = knoppen[this.vraag.juist];
    knoppen.forEach((knop, index) => {
      knop.addEventListener("click", () => this.kies(knop, juisteKnop, index === this.vraag.juist));
    });
  }

  maakKnop(tekst, klasse) {
    const knop = document.createElement("button");
    knop.className = "vg-antwoord " + klasse;
    knop.textContent = tekst;
    this.keuzesEl.appendChild(knop);
    return knop;
  }

  /* De speler heeft gekozen */
  kies(gekozenKnop, juisteKnop, goed) {
    // Alle knoppen op slot; het juiste antwoord licht groen op
    for (const knop of this.keuzesEl.querySelectorAll("button")) knop.disabled = true;
    juisteKnop.classList.add("vg-goed");
    if (!goed) gekozenKnop.classList.add("vg-fout");

    // Feedbackzin (willekeurig gekozen uit de wereldlijstjes)
    const zinnen = goed ? this.feedbackGoedLijst : this.feedbackFoutLijst;
    this.feedbackEl.textContent = zinnen[Math.floor(Math.random() * zinnen.length)];
    this.feedbackEl.className = goed ? "vg-feedback-goed" : "vg-feedback-fout";

    // Altijd de uitleg tonen: daar leren ze van!
    this.uitlegEl.textContent = this.vraag.explanation;
    this.uitlegEl.classList.remove("vg-verborgen");

    // Bij goed antwoord: duidelijk laten zien wat je verdient
    if (goed) {
      const n = CONFIG.sleutelsPerGoedAntwoord;
      this.sleutelsEl.innerHTML = `+${n} \u{1F511} sleutel${n > 1 ? "s" : ""}!`;
      this.sleutelsEl.classList.remove("vg-verborgen");
    }

    this.verderKnop.classList.remove("vg-verborgen");
    this.bijAntwoord(goed);
  }

  sluit() {
    this.scherm.classList.add("vg-verborgen");
    this.bijVerder();
  }
}
