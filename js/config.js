/* ============================================================
   CONFIG — Alle instelbare waarden van de game op één plek.
   Pas hier snelheden, kleuren en spelregels aan.
   ============================================================ */

const CONFIG = {

  /* --- Canvas (16:9) --- */
  canvasBreedte: 960,
  canvasHoogte: 540,

  /* --- Natuurkunde (pixels per seconde) --- */
  zwaartekracht: 2200,     // hoe hard Vonk naar beneden valt
  maxValsnelheid: 950,     // maximale valsnelheid
  loopSnelheid: 270,       // loopsnelheid links/rechts
  springKracht: 760,       // beginsnelheid van een sprong (omhoog)
  korteSprong: 280,        // sprong wordt afgekapt als de toets losgelaten wordt
  coyoteTijd: 0.10,        // seconden dat je nog mag springen ná een randje
  springBufferTijd: 0.12,  // seconden dat een sprongdruk 'onthouden' wordt

  /* --- Speler --- */
  spelerBreedte: 36,
  spelerHoogte: 46,
  startHarten: 3,          // aantal levens (energieharten)
  onkwetsbaarTijd: 1.5,    // seconden onkwetsbaar na een tik
  terugstootX: 320,        // knockback-snelheid na een tik
  terugstootY: 420,

  /* --- Punten en sleutels --- */
  puntenBol: 10,               // score per energiebol
  puntenVijand: 25,            // score per verslagen vijand (erop springen)
  sleutelsPerGoedAntwoord: 1,  // sleutels per goed beantwoorde wachtwoordvraag

  /* --- Leervoorwaarde: zoveel slotjes (vragen) moet de speler
         minstens geprobeerd hebben voordat de finish werkt --- */
  minVragenVoorFinish: 5,

  /* --- Zap-blaster (vanaf Wereld 2): richten met de muis --- */
  blasterCooldown: 0.45,       // seconden tussen twee schoten
  projectielSnelheid: 620,     // snelheid van een zap-schot (px/s)

  /* --- Kleuren (pas gerust aan!) --- */
  kleuren: {
    luchtBoven:   "#8fd3ff",
    luchtOnder:   "#dff3ff",
    zon:          "#fff3a8",
    heuvelVer:    "#a8d8a0",
    heuvelDichtbij:"#7cc46e",
    wolk:         "#ffffff",
    grondGras:    "#5cb85c",
    grondAarde:   "#a06a3c",
    grondAardeRand:"#7d5230",
    platformTop:  "#5cb85c",
    platformHout: "#b07a48",
    speler:       "#ff8c42",
    spelerDonker: "#d96b23",
    spelerVisor:  "#2b3a8f",
    spelerOog:    "#7df9ff",
    slijm:        "#9b6ad1",
    slijmDonker:  "#7a4cab",
    zoemer:       "#ffd23f",
    zoemerDonker: "#d9a300",
    stekel:       "#e05c5c",
    stekelDonker: "#a83232",
    bol:          "#ffd23f",
    bolGloed:     "rgba(255, 210, 63, 0.35)",
    slot:         "#f2c14e",   // het gouden vraagslotje
    slotBeugel:   "#a37b1e",
    sleutel:      "#f2c14e",   // sleutels in de HUD
    bewegend:     "#8fa5bd",   // bewegende platforms (metaal)
    bewegendRand: "#54637a",
    brokkel:      "#cfa76a",   // afbrokkelplatforms (oud hout)
    brokkelRand:  "#8a6a3a",
    stekelbol:    "#5a4a6e",   // de stekelbol-vijand
    stekelbolPunt:"#e05c5c",
    waterBoven:   "#57bfae",   // watervlakken (Wereld 4), themabaar
    waterOnder:   "rgba(28, 74, 72, 0.9)",
    vlot:         "#b07a48",   // drijvende vlotten (hout)
    vlotDonker:   "#7d5230",
    happer:       "#3f8a76",   // de spring-vis (Happer)
    happerBuik:   "#c4ead2",
    happerDonker: "#2a5f52",
    bewaker:      "#42539a",   // bewaker-robot (Wereld 5)
    bewakerLicht: "#8fa0d8",
    bewakerDonker:"#2b3766",
    camdrone:     "#5a6478",   // bewakingsdrone (Wereld 5)
    camdroneDonker:"#363d4d",
    laser:        "#ff4a5a",   // beveiligingslaser (Wereld 5)
    laserGloed:   "rgba(255, 74, 90, 0.35)",
    projectiel:   "#39ffec",   // zap-schoten van de blaster
    projectielGloed: "rgba(57, 255, 236, 0.35)",
    poort:        "#5b6ee1",
    checkpointUit:"#9aa2b8",
    checkpointAan:"#37e0c8",
    finish:       "#37e0c8",
    hudTekst:     "#2b3a8f",
    hart:         "#ff5a79"
  }
};
