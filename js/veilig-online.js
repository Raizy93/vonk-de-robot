/* ============================================================
   VEILIG ONLINE — Vragenset voor Wereld 4: "Phishingrivier"
   (die wereld wordt later gebouwd; deze vragen staan al klaar).

   Leerdoel: nepberichten (phishing) herkennen en veilig
   reageren op situaties online.

   Twee vraagvormen:

   1. type "echtnep": de speler ziet een bericht en kiest of
      het te vertrouwen is.
        { type: "echtnep", bericht, echt: true/false, explanation }

   2. type "situatie": een situatie met drie keuzes — wat doe je?
        { type: "situatie", vraag, opties: [3], juist: index,
          explanation }

   LET OP: dit zijn verzonnen oefenberichten.
   Wil je een ander leerdoel in Wereld 2? Vervang deze lijst
   (zelfde structuur) en pas eventueel de teksten in werelden.js
   aan — meer hoeft niet.
   ============================================================ */

const ONLINE_VRAGEN = [

  /* ---------- Vorm 1: Kun je dit bericht vertrouwen? ---------- */
  { type: "echtnep", echt: false,
    bericht: "GEFELICITEERD! Je hebt een gratis telefoon gewonnen! Klik snel op deze link en vul je naam, adres en bankgegevens in!",
    explanation: "Nep! Je kunt niets winnen zonder mee te doen. En echte winacties vragen nooit om je bankgegevens via een link." },
  { type: "echtnep", echt: false,
    bericht: "Hoi, ik ben het, je neef. Ik heb een nieuw nummer. Kun je snel 50 euro overmaken? Het is dringend!",
    explanation: "Nep! Oplichters doen alsof ze familie zijn. Bel altijd eerst het oude nummer om te checken of het echt klopt." },
  { type: "echtnep", echt: false,
    bericht: "Beste klant, uw bankpas verloopt vandaag. Klik hier en voer uw pincode in om uw pas te verlengen.",
    explanation: "Nep! Een bank vraagt NOOIT om je pincode — niet via een bericht, niet via een link, nooit." },
  { type: "echtnep", echt: false,
    bericht: "Je wachtwoord verloopt over 5 minuten! Log NU in via deze link, anders ben je je account voor altijd kwijt!",
    explanation: "Nep! Haast maken ('NU, snel, laatste kans!') is een bekende oplichterstruc. Echte bedrijven geven je rustig de tijd." },
  { type: "echtnep", echt: true,
    bericht: "Hoi allemaal, de bieb op school is woensdag dicht vanwege een verbouwing. Groetjes, juf Sanne.",
    explanation: "Dit lijkt te vertrouwen: gewone informatie, geen link, geen vraag om gegevens of geld, en je kent de afzender." },
  { type: "echtnep", echt: false,
    bericht: "GRATIS 10.000 gamemunten!!! Download deze app en log in met je game-account om ze te krijgen!",
    explanation: "Nep! Zo stelen ze je game-account. Log nooit met je account in op een onbekende app of site." },
  { type: "echtnep", echt: false,
    bericht: "Je pakketje kon niet bezorgd worden. Betaal 1,99 euro via deze link om het opnieuw te versturen.",
    explanation: "Nep! Dit is een bekende pakketjes-truc. Bezorgers vragen nooit om via een linkje bij te betalen." },
  { type: "echtnep", echt: true,
    bericht: "Hoi! Leuk dat je meedeed aan de tekenwedstrijd. De uitslag hoor je vrijdag in de klas. Groetjes, meester Tim.",
    explanation: "Dit lijkt te vertrouwen: geen link, geen haast, geen gevraag om gegevens — gewoon een berichtje van iemand die je kent." },
  { type: "echtnep", echt: false,
    bericht: "Dit is je LAATSTE KANS! Alleen vandaag: klik hier en verdien 500 euro per dag vanuit je slaapkamer!",
    explanation: "Nep! 'Snel rijk worden' bestaat niet. Hoe mooier de belofte, hoe groter de kans dat het oplichting is." },
  { type: "echtnep", echt: true,
    bericht: "Denk je aan je gymschoenen morgen? We beginnen meteen het eerste uur met gym.",
    explanation: "Dit lijkt te vertrouwen: een gewoon herinneringsbericht zonder link en zonder vraag om iets geheims." },
  { type: "echtnep", echt: false,
    bericht: "Uw account is geblokkeerd. Stuur ons uw wachtwoord, dan ontgrendelen wij het voor u.",
    explanation: "Nep! Niemand mag ooit om je wachtwoord vragen — geen bedrijf, geen 'helpdesk', zelfs geen vriend." },
  { type: "echtnep", echt: false,
    bericht: "Hé, ik zag je profiel, je lijkt me super leuk! Hoe oud ben je en op welke school zit je?",
    explanation: "Niet te vertrouwen! Een onbekende die meteen om persoonlijke informatie vraagt is een rood alarm. Niet antwoorden en melden." },
  { type: "echtnep", echt: false,
    bericht: "Je bent getagd in een video! Log hier eerst even in met je wachtwoord om hem te bekijken.",
    explanation: "Nep! Via zulke nep-inlogpagina's stelen ze je wachtwoord. Ga altijd zelf naar de app of site, nooit via zo'n link." },
  { type: "echtnep", echt: true,
    bericht: "Trainen gaat zaterdag niet door, het veld is te nat. Volgende week gewoon weer om 9 uur. Groet, trainer Mo.",
    explanation: "Dit lijkt te vertrouwen: bekende afzender, gewone informatie, geen link en geen gevraag om gegevens." },

  /* ---------- Vorm 2: Wat doe je? ---------- */
  { type: "situatie", juist: 1,
    vraag: "Iemand die je niet kent stuurt een vriendschapsverzoek met een heel mooi profiel. Wat doe je?",
    opties: [
      "Accepteren, hoe meer vrienden hoe beter",
      "Niet accepteren, en het vertellen aan je ouders als het blijft gebeuren",
      "Eerst vragen waar diegene woont"],
    explanation: "Accepteer alleen mensen die je in het echt kent. Een mooi profiel kan door iedereen gemaakt zijn." },
  { type: "situatie", juist: 1,
    vraag: "Je krijgt van een onbekend nummer: 'Haha, ben jij dit in deze video?? [link]'. Wat doe je?",
    opties: [
      "Snel klikken, misschien sta ik er echt in",
      "Niet klikken, bericht verwijderen en het nummer blokkeren",
      "De link doorsturen naar je vrienden om te vragen wat het is"],
    explanation: "Nooit klikken op onbekende links — zo raak je je account kwijt. En doorsturen brengt je vrienden ook in gevaar." },
  { type: "situatie", juist: 1,
    vraag: "Een online 'vriend' die je nooit in het echt hebt ontmoet, vraagt om een foto van jou. Wat doe je?",
    opties: [
      "Een foto sturen, hij is toch aardig",
      "Geen foto sturen en het met je ouders of je juf/meester bespreken",
      "Alleen een foto sturen als hij er eerst zelf een stuurt"],
    explanation: "Stuur nooit foto's naar mensen die je alleen online kent. Iemand vertellen is slim, niet kinderachtig." },
  { type: "situatie", juist: 0,
    vraag: "Je wilt een nieuw spelletje op je tablet. Waar download je dat het veiligst?",
    opties: [
      "In de officiële app-store van je tablet",
      "Via een onbekende site met een 'gratis' versie",
      "Via een link die iemand in een chat stuurde"],
    explanation: "De officiële app-store controleert apps. 'Gratis' versies van andere sites zitten vaak vol virussen." },
  { type: "situatie", juist: 1,
    vraag: "Iemand in een game-chat scheldt je uit en blijft doorgaan. Wat is slim?",
    opties: [
      "Keihard terugschelden",
      "Diegene melden en blokkeren, en het aan iemand thuis vertellen",
      "Je wachtwoord geven zodat diegene stopt"],
    explanation: "Melden en blokkeren werkt echt. Terugschelden maakt het erger, en je wachtwoord geef je nooit aan iemand." },
  { type: "situatie", juist: 1,
    vraag: "Welke informatie kun je het veiligst online delen?",
    opties: [
      "Je volledige naam, adres en telefoonnummer",
      "Je lievelingsdier of je favoriete game",
      "De naam van je school met een foto van jou in je klas"],
    explanation: "Je lievelingsdier verklapt niets over wie of waar je bent. Adres, telefoonnummer en school houd je voor jezelf." },
  { type: "situatie", juist: 2,
    vraag: "Je hebt per ongeluk op een rare link geklikt. Wat doe je?",
    opties: [
      "Niets zeggen, anders krijg je straf",
      "Snel je tablet verstoppen",
      "Het meteen aan je ouders of leerkracht vertellen"],
    explanation: "Meteen vertellen is altijd goed — dan kan iemand je helpen. Je krijgt geen straf voor eerlijk zijn." },
  { type: "situatie", juist: 1,
    vraag: "Een pop-up zegt: 'Je tablet heeft 5 virussen! Klik hier om ze te verwijderen!' Wat doe je?",
    opties: [
      "Snel klikken, virussen zijn gevaarlijk",
      "Niet klikken en de pop-up wegklikken of een volwassene roepen",
      "Je wachtwoord invullen zodat de scanner kan werken"],
    explanation: "Zulke pop-ups zijn zelf de oplichting! Echte viruswaarschuwingen komen nooit als schreeuwerige pop-up van een website." },
  { type: "situatie", juist: 0,
    vraag: "Iemand online vraagt: 'Zullen we afspreken? Kom alleen, dan is het gezelliger.' Wat doe je?",
    opties: [
      "Niet afspreken en het meteen aan je ouders vertellen",
      "Afspreken op een plek die jij kiest",
      "Alleen gaan als diegene ook een kind is (dat zegt hij zelf)"],
    explanation: "Nooit in je eentje afspreken met iemand van internet. 'Kom alleen' is een groot alarmsignaal — vertel het altijd thuis." },
  { type: "situatie", juist: 2,
    vraag: "Je beste vriend vraagt om je wachtwoord, 'gewoon voor de grap'. Wat doe je?",
    opties: [
      "Geven, hij is toch je beste vriend",
      "Geven, maar alleen als hij het zijne ook geeft",
      "Niet geven — wachtwoorden deel je met niemand, ook niet met vrienden"],
    explanation: "Een wachtwoord is als je tandenborstel: alleen van jou. Ook een goede vriend kan er per ongeluk iets mee doen." }
];

/* --- Feedback voor Wereld 2 (past bij het online-thema) --- */
const ONLINE_FEEDBACK_GOED = [
  "Goed gezien!",
  "Slim gedacht!",
  "Jij trapt er niet in!",
  "Top! Jij bent online niet te foppen.",
  "Knap gedaan!"
];

const ONLINE_FEEDBACK_FOUT = [
  "Bijna!",
  "Let op linkjes, haast en vragen om gegevens.",
  "Oplichters zijn slimmer dan je denkt — kijk nog eens goed.",
  "Bijna goed — denk aan: zou een echt bedrijf dit vragen?"
];
