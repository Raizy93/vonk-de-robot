/* ============================================================
   GEHEIMEN — De vragenset van Wereld 3: "Geheimenkluis".

   Leerdoel: wachtwoorden en codes geheim houden.

   Twee vraagvormen:

   1. type "geheim": de speler ziet een situatie en kiest of
      dit oké is of niet.
        { type: "geheim", situatie, oke: true/false, explanation }

   2. type "situatie": een situatie met drie keuzes — wat doe je?
        { type: "situatie", vraag, opties: [3], juist: index,
          explanation }

   Voeg gerust eigen vragen toe — meer vragen = meer variatie!
   ============================================================ */

const GEHEIM_VRAGEN = [

  /* ---------- Vorm 1: Is dit oké? ---------- */
  { type: "geheim", oke: false,
    situatie: "Je beste vriend vraagt je wachtwoord, zodat hij jouw level kan spelen.",
    explanation: "Niet doen! Wachtwoorden deel je met niemand — ook niet met je beste vriend. Hij kan er per ongeluk iets mee doen, of het doorvertellen." },
  { type: "geheim", oke: true,
    situatie: "Je vertelt je wachtwoord aan je ouders, zodat zij je kunnen helpen als er iets is.",
    explanation: "Prima! Je ouders of verzorgers mogen je wachtwoord weten. Zij helpen je als er iets misgaat." },
  { type: "geheim", oke: false,
    situatie: "Je schrijft je wachtwoord op een briefje en plakt het op je scherm.",
    explanation: "Niet doen! Iedereen die langsloopt kan het lezen. Een briefje bewaar je hooguit op een veilige plek thuis." },
  { type: "geheim", oke: false,
    situatie: "Je zegt je wachtwoord hardop in de klas, zodat je het niet vergeet.",
    explanation: "Niet doen! Hardop zeggen is hetzelfde als het aan de hele klas geven. Oefen het in je hoofd." },
  { type: "geheim", oke: true,
    situatie: "Je wacht met het intypen van je wachtwoord tot niemand op je scherm kan meekijken.",
    explanation: "Slim! Meekijkers (dat heet 'schoudersurfen') zijn de makkelijkste manier waarop een wachtwoord uitlekt." },
  { type: "geheim", oke: false,
    situatie: "Je gebruikt overal hetzelfde wachtwoord — dan hoef je er maar één te onthouden.",
    explanation: "Riskant! Als iemand dat ene wachtwoord ontdekt, kan hij meteen in ál je accounts. Gebruik verschillende wachtwoorden." },
  { type: "geheim", oke: true,
    situatie: "Je logt uit op de schoolcomputer als je klaar bent.",
    explanation: "Heel goed! Anders kan de volgende leerling zo in jouw account. Uitloggen = je digitale deur op slot doen." },
  { type: "geheim", oke: false,
    situatie: "Een klasgenoot wil je telefoon 'even lenen' en vraagt je toegangscode.",
    explanation: "Niet doen! Je code is net zo geheim als je wachtwoord. Wil je iets laten zien? Ontgrendel hem dan zelf." },
  { type: "geheim", oke: true,
    situatie: "Je bewaart je wachtwoorden in een schriftje dat veilig thuis in een la ligt.",
    explanation: "Prima! Een veilige plek thuis is oké. Neem zo'n lijstje alleen nooit mee naar school of buiten." },
  { type: "geheim", oke: false,
    situatie: "Op de gedeelde computer in de bibliotheek klik je op 'wachtwoord onthouden'.",
    explanation: "Niet doen! Dan kan iedereen die daarna op die computer werkt zo jouw account in. Alleen op je eigen apparaat is dat oké." },
  { type: "geheim", oke: true,
    situatie: "Iemand zag per ongeluk je wachtwoord, dus je verandert het meteen.",
    explanation: "Precies goed! Zodra iemand je wachtwoord kent — per ongeluk of expres — verander je het direct." },
  { type: "geheim", oke: false,
    situatie: "Je stuurt je wachtwoord in een chatbericht naar jezelf, dan raak je het niet kwijt.",
    explanation: "Beter niet! Chats kunnen meegelezen of gehackt worden, en berichten blijven lang bewaard. Kies een veiligere plek." },
  { type: "geheim", oke: true,
    situatie: "Je vult je wachtwoord alleen in op de echte website of app zelf.",
    explanation: "Heel goed! Nep-inlogpagina's via linkjes zijn dé manier waarop wachtwoorden gestolen worden." },
  { type: "geheim", oke: false,
    situatie: "Je fluistert je pincode aan je beste vriendin — zij kan echt geheimen bewaren.",
    explanation: "Niet doen! Hoe lief ze ook is: een pincode is alleen van jou. Elk gedeeld geheim kan uitlekken." },

  /* ---------- Vorm 2: Wat doe je? ---------- */
  { type: "situatie", juist: 1,
    vraag: "Je vriend wil je wachtwoord 'even lenen' om jouw coole skin te gebruiken. Wat doe je?",
    opties: [
      "Geven — hij is mijn beste vriend, dus te vertrouwen",
      "Niet geven: wachtwoorden deel je nooit, ook niet met vrienden",
      "Geven, maar het daarna snel weer veranderen"],
    explanation: "Nooit delen is de enige veilige keuze. Ook 'even geven en dan veranderen' gaat vaak mis — veranderen vergeet je zo." },
  { type: "situatie", juist: 2,
    vraag: "Je ziet per ongeluk het wachtwoord van een klasgenoot op haar scherm. Wat doe je?",
    opties: [
      "Onthouden — je weet nooit wanneer het handig is",
      "Aan een paar anderen vertellen, wel grappig",
      "Het haar vertellen, zodat ze het kan veranderen"],
    explanation: "Eerlijk zeggen is het sterkst: dan kan zij haar wachtwoord veranderen en is haar account weer veilig." },
  { type: "situatie", juist: 1,
    vraag: "Iemand kijkt over je schouder mee terwijl je wilt inloggen. Wat doe je?",
    opties: [
      "Gewoon intypen, zo snel kan niemand meelezen",
      "Even wachten of je scherm afschermen tot niemand meekijkt",
      "Je wachtwoord maar hardop zeggen, dan is het eerlijk"],
    explanation: "Afschermen of even wachten is slim. Meekijken is precies hoe wachtwoorden 'per ongeluk' uitlekken." },
  { type: "situatie", juist: 2,
    vraag: "Oeps — je wachtwoord staat per ongeluk in de groepschat! Wat doe je?",
    opties: [
      "Snel verwijderen, dan heeft vast niemand het gezien",
      "Niets doen, het waait wel over",
      "Meteen je wachtwoord veranderen en het thuis vertellen"],
    explanation: "Verwijderen is niet genoeg: mensen kunnen het al gezien of geschermafdrukt hebben. Veranderen is de enige echte oplossing." },
  { type: "situatie", juist: 1,
    vraag: "Je broertje heeft de code van je tablet ontdekt. Wat doe je?",
    opties: [
      "Heel boos worden en niets veranderen",
      "De code veranderen in een nieuwe die hij niet kent",
      "Voortaan je tablet onder je kussen verstoppen"],
    explanation: "Een uitgelekte code vervang je gewoon door een nieuwe. Verstoppen of boos worden lost niets op." },
  { type: "situatie", juist: 1,
    vraag: "Een website vraagt het wachtwoord van je e-mail om 'vrienden voor je te zoeken'. Wat doe je?",
    opties: [
      "Invullen, dat scheelt zoekwerk",
      "Niet invullen: je e-mailwachtwoord geef je nooit aan een andere site",
      "Eerst een nep-wachtwoord proberen om te kijken wat er gebeurt"],
    explanation: "Wie jouw e-mail kan lezen, kan overal 'wachtwoord vergeten' klikken en al je accounts overnemen. Nooit afgeven dus!" },
  { type: "situatie", juist: 0,
    vraag: "Een klasgenoot blijkt ingelogd te zijn geweest op jouw account, zonder te vragen. Wat doe je?",
    opties: [
      "Wachtwoord veranderen en het vertellen aan je juf, meester of ouders",
      "Op zíjn account inloggen, dan staan jullie quitte",
      "Niets — het is toch al gebeurd"],
    explanation: "Veranderen + melden is precies goed. Wraak nemen maakt jou net zo fout, en niets doen laat de deur openstaan." },
  { type: "situatie", juist: 1,
    vraag: "Waar bewaar je een lijstje met je wachtwoorden het veiligst?",
    opties: [
      "In je etui, dan heb je het altijd bij je",
      "Op een veilige plek thuis, bijvoorbeeld in een la",
      "Op een briefje in je jaszak"],
    explanation: "Thuis op een veilige plek is prima. Alles wat je meeneemt (etui, jaszak) kun je verliezen — mét al je wachtwoorden." },
  { type: "situatie", juist: 1,
    vraag: "Je moet inloggen op een computer van de bibliotheek. Wat is slim?",
    opties: [
      "Op 'wachtwoord onthouden' klikken, dat is makkelijk",
      "Inloggen zonder 'onthouden' en na afloop netjes uitloggen",
      "Ingelogd blijven, je komt er morgen toch weer"],
    explanation: "Op een gedeelde computer log je altijd uit en laat je niets onthouden — anders kan de volgende gebruiker in jouw account." },
  { type: "situatie", juist: 1,
    vraag: "Een gamevriend (die je alleen online kent) zegt: 'Geef je wachtwoord, dan zet ik gratis munten op je account!' Wat doe je?",
    opties: [
      "Doen! Gratis munten wil iedereen",
      "Niet doen: zo stelen ze juist je account",
      "Eerst vragen of hij de helft vooruit betaalt"],
    explanation: "Dit is een bekende accountsteel-truc. Niemand geeft gratis munten — ze willen je wachtwoord, meer niet." }
];

/* --- Feedback voor Wereld 3 (past bij het geheimen-thema) --- */
const GEHEIM_FEEDBACK_GOED = [
  "Goed geheim gehouden!",
  "Jij bent een echte kluiswachter!",
  "Sterk! Jouw geheimen zijn veilig.",
  "Top! Dat blijft mooi in de kluis.",
  "Knap gedaan!"
];

const GEHEIM_FEEDBACK_FOUT = [
  "Bijna!",
  "Denk eraan: een wachtwoord is als je tandenborstel — alleen van jou.",
  "Een geheim blijft alleen geheim als je het niet deelt.",
  "Bijna goed — wie mag jouw wachtwoord eigenlijk écht weten?"
];
