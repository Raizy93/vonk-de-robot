/* ============================================================
   WACHTWOORDEN — De vragensets van Wereld 1 en Wereld 2.

   WACHTWOORD_VRAGEN_HERKENNEN  → Wereld 1: Wachtwoordschool
     Sterk of zwak HERKENNEN. Twee vraagvormen:
       type "veilig" (of geen type): één wachtwoord → Veilig / Niet veilig
         { password, safe: true/false, explanation }
       type "sterkste": drie wachtwoorden → kies het sterkste
         { type: "sterkste", opties: [pw1, pw2, pw3], juist: index,
           explanation }

   WACHTWOORD_VRAGEN_VERBETEREN → Wereld 2: Wachtwoordwerkplaats
     Zwakke wachtwoorden VERBETEREN. Eén vraagvorm:
       type "verbeter": zwak wachtwoord → kies de beste verbetering
         { type: "verbeter", password, opties: [3], juist: index,
           explanation }

   LET OP: dit zijn nepwachtwoorden om mee te oefenen.
   Voeg gerust eigen vragen toe — meer vragen = meer variatie!
   ============================================================ */

/* ================= WERELD 1: HERKENNEN (48 vragen) ================= */

const WACHTWOORD_VRAGEN_HERKENNEN = [

  /* ---------- Veilig of Niet veilig? ---------- */
  { password: "12345678",          safe: false, explanation: "Dit is niet veilig, omdat het een veel te voorspelbare cijferreeks is." },
  { password: "qwerty",            safe: false, explanation: "Dit is niet veilig, omdat qwerty een bekend toetsenbordpatroon is." },
  { password: "welkom123",         safe: false, explanation: "Dit is niet veilig, omdat veel mensen dit wachtwoord gebruiken en het makkelijk te raden is." },
  { password: "voetbal2026",       safe: false, explanation: "Dit is niet erg veilig, omdat het een bekend woord met een jaartal is." },
  { password: "danny2014",         safe: false, explanation: "Dit is niet veilig, omdat een naam met een jaartal makkelijk te raden kan zijn." },
  { password: "school123",         safe: false, explanation: "Dit is niet veilig, omdat het kort en voorspelbaar is." },
  { password: "password",          safe: false, explanation: "Dit is niet veilig, omdat password een van de bekendste zwakke wachtwoorden is." },
  { password: "iloveyou",          safe: false, explanation: "Dit is niet veilig, omdat het een bekende en vaak gebruikte zin is." },
  { password: "abc123",            safe: false, explanation: "Dit is niet veilig, omdat het heel kort en voorspelbaar is." },
  { password: "naamgeboortejaar",  safe: false, explanation: "Dit is niet veilig, omdat persoonlijke informatie makkelijk te raden kan zijn." },
  { password: "BlauweTijger!47",   safe: true,  explanation: "Dit is veiliger, omdat het lang is en hoofdletters, kleine letters, cijfers en een teken gebruikt." },
  { password: "MijnFietsRijdt#82", safe: true,  explanation: "Dit is veiliger, omdat het een langere zin is met cijfers en een speciaal teken." },
  { password: "RegenBoog?319",     safe: true,  explanation: "Dit is veiliger, omdat het lang genoeg is en verschillende soorten tekens gebruikt." },
  { password: "IkLees3Boeken!",    safe: true,  explanation: "Dit is veiliger, omdat het een zin is met hoofdletters, een cijfer en een speciaal teken." },
  { password: "SterkeZin#2026",    safe: true,  explanation: "Dit is veiliger, omdat het langer is en verschillende soorten tekens bevat." },
  { password: "GroeneDraak!58",    safe: true,  explanation: "Dit is veiliger, omdat het niet makkelijk te raden is en meerdere soorten tekens gebruikt." },
  { password: "MijnKatSpringt@7",  safe: true,  explanation: "Dit is veiliger, omdat het een lange combinatie is met woorden, cijfer en teken." },
  { password: "ZomerRegen#42",     safe: true,  explanation: "Dit is veiliger dan een los woord, omdat het langer is en een cijfer en teken bevat." },
  { password: "Boekenkast!91",     safe: true,  explanation: "Dit is redelijk veilig, omdat het lang is en verschillende soorten tekens gebruikt." },
  { password: "VrolijkeMaan?63",   safe: true,  explanation: "Dit is veiliger, omdat het een onvoorspelbare combinatie van woorden, cijfers en tekens is." },
  { password: "Pietje2015",        safe: false, explanation: "Dit is niet veilig, omdat een naam met een geboortejaar makkelijk te raden kan zijn." },
  { password: "hallo",             safe: false, explanation: "Dit is niet veilig, omdat het kort en heel makkelijk te raden is." },
  { password: "00000000",          safe: false, explanation: "Dit is niet veilig, omdat het alleen uit hetzelfde cijfer bestaat." },
  { password: "computer",          safe: false, explanation: "Dit is niet veilig, omdat het één gewoon woord is." },
  { password: "groep8",            safe: false, explanation: "Dit is niet veilig, omdat het kort en makkelijk te raden is." },
  { password: "MijnHondIsLief",    safe: false, explanation: "Dit is al langer, maar mist cijfers en speciale tekens. Het kan sterker." },
  { password: "TafelVan9!81",      safe: true,  explanation: "Dit is veiliger, omdat het hoofdletters, kleine letters, cijfers en een teken bevat." },
  { password: "NooitDelen#55",     safe: true,  explanation: "Dit is veiliger, omdat het lang is en verschillende soorten tekens gebruikt." },
  { password: "VeiligeSleutel@24", safe: true,  explanation: "Dit is veiliger, omdat het een langere combinatie is met cijfer en speciaal teken." },
  { password: "AppelPeerBanaan",   safe: false, explanation: "Dit is langer, maar bestaat alleen uit gewone woorden zonder cijfers of speciale tekens." },
  { password: "geheim2025",        safe: false, explanation: "Dit is niet veilig, omdat een bekend woord met een jaartal makkelijk te raden is." },
  { password: "minecraft",         safe: false, explanation: "Dit is niet veilig, omdat namen van bekende spellen vaak geprobeerd worden." },
  { password: "11111111",          safe: false, explanation: "Dit is niet veilig, omdat het alleen uit hetzelfde cijfer bestaat." },
  { password: "letmein",           safe: false, explanation: "Dit is niet veilig, omdat dit Engelse zinnetje in elke raadlijst staat." },
  { password: "juf2026",           safe: false, explanation: "Dit is niet veilig, omdat het kort is: een gewoon woord met een jaartal." },
  { password: "ZonnigeDag!88",     safe: true,  explanation: "Dit is veiliger, omdat het lang is en hoofdletters, cijfers en een teken bevat." },
  { password: "TweeKatten#95",     safe: true,  explanation: "Dit is veiliger, omdat het een onverwachte combinatie is met cijfers en een teken." },
  { password: "SpringMaarHoog?12", safe: true,  explanation: "Dit is veiliger, omdat het een lange zin is met een cijfer en een vraagteken." },
  { password: "WinterPret!206",    safe: true,  explanation: "Dit is veiliger, omdat het lang genoeg is en verschillende soorten tekens gebruikt." },
  { password: "DansenIsLeuk#71",   safe: true,  explanation: "Dit is veiliger, omdat het een zin is met hoofdletters, cijfers en een speciaal teken." },

  /* ---------- Welk wachtwoord is het sterkst? ---------- */
  { type: "sterkste", opties: ["hallo123", "BlauweTijger!47", "voetbal"], juist: 1,
    explanation: "BlauweTijger!47 is het sterkst: lang, met hoofdletters, cijfers en een teken. De andere twee zijn kort en voorspelbaar." },
  { type: "sterkste", opties: ["qwerty", "welkom2026", "MijnKatSpringt@7"], juist: 2,
    explanation: "MijnKatSpringt@7 is het sterkst: een lange zin met een cijfer en een teken. Qwerty en welkom2026 staan in elke raadlijst." },
  { type: "sterkste", opties: ["RegenBoog?319", "regenboog", "regenboog123"], juist: 0,
    explanation: "RegenBoog?319 is het sterkst: hoofdletters, cijfers en een teken maken het veel moeilijker te raden dan alleen het woord." },
  { type: "sterkste", opties: ["12345678", "IkLees3Boeken!", "iklees"], juist: 1,
    explanation: "IkLees3Boeken! is het sterkst: een lange zin met een hoofdletter, cijfer en teken. Cijferreeksen zijn heel voorspelbaar." },
  { type: "sterkste", opties: ["SterkeZin#2026", "sterkezin", "zin2026"], juist: 0,
    explanation: "SterkeZin#2026 is het sterkst: dezelfde woorden, maar mét hoofdletters, een teken en cijfers wordt het veel sterker." },
  { type: "sterkste", opties: ["piet2015", "PietIsCool", "PietFietstSnel!91"], juist: 2,
    explanation: "PietFietstSnel!91 is het sterkst: het is het langst en gebruikt hoofdletters, cijfers én een teken." },
  { type: "sterkste", opties: ["hond", "hond123", "MijnHondRent!88"], juist: 2,
    explanation: "MijnHondRent!88 is het sterkst: een zin met hoofdletters, cijfers en een teken. 'hond' en 'hond123' raadt iemand zo." },
  { type: "sterkste", opties: ["abc123", "ZomerRegen#42", "zomer"], juist: 1,
    explanation: "ZomerRegen#42 is het sterkst: twee woorden, een teken en cijfers. De andere twee zijn kort en heel bekend." }
];

/* ================ WERELD 2: VERBETEREN (20 vragen) ================
   Let op bij het schrijven van nieuwe vragen: maak de foute
   antwoorden ongeveer even lang als het goede antwoord, en laat
   het goede antwoord soms juist het kortst zijn — anders leren
   kinderen "kies het langste" in plaats van echt na te denken. */

const WACHTWOORD_VRAGEN_VERBETEREN = [
  { type: "verbeter", password: "voetbal", juist: 0, opties: [
      "Cijfers en tekens toevoegen en het woord langer maken",
      "Er drie keer het cijfer 1 achter zetten: voetbal111",
      "Het woord twee keer achter elkaar typen: voetbalvoetbal"],
    explanation: "Langer maken met cijfers en tekens helpt echt. 'voetbal111' of 'voetbalvoetbal' raadt een computer nog steeds heel snel." },
  { type: "verbeter", password: "anna2014", juist: 1, opties: [
      "Je achternaam en je huisnummer er ook nog bij zetten",
      "Geen naam en geboortejaar, maar een langere zin met tekens",
      "De naam met een hoofdletter schrijven: Anna2014"],
    explanation: "Namen, jaartallen en adressen zijn makkelijk te raden voor mensen die jou kennen. Een lange zin met tekens is veel sterker." },
  { type: "verbeter", password: "welkom", juist: 2, opties: [
      "Er de cijfers 123 achter zetten: welkom123",
      "Het hele woord in hoofdletters typen: WELKOM",
      "Een lange eigen zin met cijfers en tekens kiezen"],
    explanation: "'welkom123' en 'WELKOM' staan allebei gewoon in raadlijsten. Een lange, eigen zin met cijfers en tekens is de echte verbetering." },
  { type: "verbeter", password: "kat", juist: 1, opties: [
      "Het woord drie keer achter elkaar typen: katkatkat",
      "Er een lange zin van maken: DrieKattenDansen#22",
      "Er twee uitroeptekens achter zetten: kat!!"],
    explanation: "Herhalen of een teken erbij helpt amper. Van een kort woord maak je iets sterks met een lange zin vol variatie." },
  { type: "verbeter", password: "12345678", juist: 2, opties: [
      "Er nog vier cijfers achter zetten: 123456789012",
      "Alle cijfers omdraaien zodat het 87654321 wordt",
      "Letters, hoofdletters en tekens toevoegen"],
    explanation: "Alleen cijfers blijven voorspelbaar, ook omgedraaid of langer. Mix cijfers met letters, hoofdletters en tekens." },
  { type: "verbeter", password: "MijnHondIsLief", juist: 0, opties: [
      "Er een cijfer en een speciaal teken aan toevoegen",
      "Het inkorten tot MijnHond, dat onthoud je makkelijker",
      "Alle hoofdletters weghalen: mijnhondislief"],
    explanation: "De zin is al lekker lang! Met een cijfer en een teken erbij (bijv. MijnHondIsLief!7) wordt hij pas echt sterk." },
  { type: "verbeter", password: "zomer", juist: 1, opties: [
      "Het jaartal erachter zetten zodat het zomer2026 wordt",
      "Er een zin met tekens van maken: ZomerZonScheen!24",
      "Het woord twee keer typen zodat het zomerzomer wordt"],
    explanation: "Een jaartal erachter is de eerste truc die geprobeerd wordt. Een lange zin met een cijfer en teken is veel sterker." },
  { type: "verbeter", password: "geheim", juist: 2, opties: [
      "Er de cijfers 123 achter zetten: geheim123",
      "De letters omdraaien zodat het miemeg wordt",
      "Een heel ander, langer wachtwoord met tekens kiezen"],
    explanation: "'geheim123' en omgedraaide woorden kraken computers zo. Kies iets dat alleen jij kunt verzinnen — lang en met tekens." },
  { type: "verbeter", password: "fiets", juist: 0, opties: [
      "Langer maken met een hoofdletter, cijfers en een teken",
      "Er alleen een uitroepteken achter zetten: fiets!",
      "Het woord twee keer achter elkaar typen: fietsfiets"],
    explanation: "Eén teken of het woord herhalen helpt bijna niets. Langer + hoofdletters + cijfers + tekens = pas echt sterk." },
  { type: "verbeter", password: "juf2026", juist: 1, opties: [
      "De naam van je juf er ook nog bij zetten",
      "Geen schoolwoorden en jaartallen: een eigen lange zin",
      "Alleen het jaartal veranderen: juf2027"],
    explanation: "Schoolwoorden en jaartallen zijn zo geraden door iemand die jou kent. Een eigen, onverwachte zin is veel veiliger." },
  { type: "verbeter", password: "aaabbb", juist: 1, opties: [
      "Er nog drie letters achter zetten: aaabbbccc",
      "Een afwisselende mix van letters, cijfers en tekens",
      "Alles in hoofdletters typen zodat het AAABBB wordt"],
    explanation: "Herhaalpatronen (aaa, abab) zijn heel voorspelbaar. Afwisseling maakt een wachtwoord sterk." },
  { type: "verbeter", password: "pizza4", juist: 0, opties: [
      "Er een zin van maken: PizzaMetAnanas?43",
      "Er nog een 4 bij zetten zodat het pizza44 wordt",
      "Het cijfer naar voren verplaatsen: 4pizza"],
    explanation: "Het cijfer verplaatsen of verdubbelen helpt niet. Een lange zin met hoofdletters en een teken wel!" },
  { type: "verbeter", password: "qwerty", juist: 1, opties: [
      "Er de cijfers 123 achter zetten: qwerty123",
      "Geen toetsenbordrij: verzin een lange eigen zin",
      "De letters omdraaien zodat het ytrewq wordt"],
    explanation: "Toetsenbordrijen kennen computers uit hun hoofd — ook omgedraaid of met 123. Een eigen zin is de enige echte verbetering." },
  { type: "verbeter", password: "sam2013", juist: 1, opties: [
      "Het jaartal eentje ophogen zodat het sam2014 wordt",
      "De naam en het jaartal weglaten en iets langers verzinnen",
      "De naam in hoofdletters schrijven: SAM2013"],
    explanation: "Een ander jaartal of hoofdletters veranderen niets aan het probleem: naam + jaartal is te persoonlijk en te kort." },
  { type: "verbeter", password: "welkom1", juist: 1, opties: [
      "Er nog een cijfer bij zetten zodat het welkom12 wordt",
      "Een zin kiezen als WelkomInMijnKasteel#9",
      "Er een uitroepteken achter zetten: welkom1!"],
    explanation: "Eén cijfertje of teken erbij aan een bekend woord helpt amper. Maak er een lange, eigen zin van." },
  { type: "verbeter", password: "hond", juist: 0, opties: [
      "Er een zin van maken: HondjeBlaftDrieKeer!33",
      "Er het cijfer 1 achter zetten zodat het hond1 wordt",
      "De letters omdraaien zodat het dnoh wordt"],
    explanation: "Korte woorden blijven zwak, ook omgedraaid. Een lange zin met hoofdletters, cijfers en een teken is super sterk." },
  { type: "verbeter", password: "1234", juist: 1, opties: [
      "Er een cijfer bij zetten zodat het 12345 wordt",
      "Letters, hoofdletters en tekens toevoegen",
      "De cijfers omdraaien zodat het 4321 wordt"],
    explanation: "Cijferreeksen zijn het állerbekendst. Alleen een flinke mix van letters, hoofdletters en tekens maakt hier iets sterks van." },
  { type: "verbeter", password: "gamer", juist: 1, opties: [
      "Er het jaartal achter zetten: gamer2026",
      "Er een zin van maken: GamenDoeIkGraag?55",
      "Er pro voor zetten zodat het progamer wordt"],
    explanation: "Gamewoorden met een jaartal worden heel vaak geprobeerd. Een eigen zin met cijfers en tekens niet." },
  { type: "verbeter", password: "banaan", juist: 0, opties: [
      "Er een gekke zin van maken: BanaanInDeBocht!81",
      "Er twee negens achter zetten zodat het banaan99 wordt",
      "Het woord in hoofdletters typen zodat het BANAAN wordt"],
    explanation: "Een gekke, lange zin met hoofdletters, cijfers en een teken onthoud je makkelijk én is moeilijk te raden." },
  { type: "verbeter", password: "lente", juist: 0, opties: [
      "Er een zin van maken: LenteZonInMaart#44",
      "Er het jaartal achter zetten: lente2026",
      "Het woord dubbel typen zodat het lentelente wordt"],
    explanation: "Seizoenen met jaartallen en herhalingen zijn voorspelbaar. Lang + gevarieerd wint altijd." }
];

/* --- Positieve feedback bij een goed antwoord (willekeurig gekozen) --- */
const FEEDBACK_GOED = [
  "Goed gezien!",
  "Sterk gekozen!",
  "Jij denkt als een wachtwoordexpert!",
  "Top! Dat klopt helemaal.",
  "Knap gedaan!"
];

/* --- Rustige feedback bij een fout antwoord --- */
const FEEDBACK_FOUT = [
  "Bijna!",
  "Kijk nog eens naar lengte, cijfers en tekens.",
  "Dit wachtwoord is makkelijker te raden dan je denkt.",
  "Bijna goed — let op wat het wachtwoord sterk of zwak maakt."
];

/* --- Hulpfunctie: lijst willekeurig schudden (Fisher-Yates) --- */
function schudLijst(lijst) {
  for (let i = lijst.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lijst[i], lijst[j]] = [lijst[j], lijst[i]];
  }
  return lijst;
}

/*
 * VraagStapel: deelt vragen uit in willekeurige volgorde.
 * Binnen één ronde komt een vraag nooit twee keer voor;
 * pas als de stapel op is, wordt de lijst opnieuw geschud.
 */
class VraagStapel {

  constructor(vragen) {
    this.bron = vragen;
    this.stapel = [];
  }

  volgende() {
    if (this.stapel.length === 0) {
      this.stapel = schudLijst([...this.bron]);
    }
    return this.stapel.pop();
  }
}
