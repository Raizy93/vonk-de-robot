/* ============================================================
   ACCOUNTS — De vragenset van Wereld 5: "Accountstad".

   Leerdoel: je accounts extra beveiligen (tweestapsverificatie,
   inlogmeldingen, uitloggen, updates, verificatiecodes).

   Twee vraagvormen:

   1. type "beveilig": de speler ziet een situatie en kiest of
      dit een slimme beveiligingskeuze is.
        { type: "beveilig", situatie, slim: true/false, explanation }

   2. type "situatie": een situatie met drie keuzes — wat doe je?
        { type: "situatie", vraag, opties: [3], juist: index,
          explanation }

   Voeg gerust eigen vragen toe — meer vragen = meer variatie!
   ============================================================ */

const ACCOUNT_VRAGEN = [

  /* ---------- Vorm 1: Slim of niet slim? ---------- */
  { type: "beveilig", slim: true,
    situatie: "Je zet tweestapsverificatie aan: naast je wachtwoord vraagt je account ook een extra code.",
    explanation: "Slim! Een extra code (bijvoorbeeld via je telefoon) is een tweede slot. Zelfs met je wachtwoord komt een inbreker er dan niet in." },
  { type: "beveilig", slim: false,
    situatie: "Je krijgt een melding dat er is ingelogd vanaf een apparaat dat je niet kent, en je negeert het.",
    explanation: "Niet slim! Zo'n melding is een waarschuwing. Verander meteen je wachtwoord en vertel het thuis — misschien probeert iemand in je account." },
  { type: "beveilig", slim: true,
    situatie: "Je zet automatische updates aan op je telefoon en apps.",
    explanation: "Slim! Updates dichten beveiligingslekken. Een up-to-date apparaat is veel moeilijker te kraken." },
  { type: "beveilig", slim: false,
    situatie: "Je gebruikt voor al je accounts precies hetzelfde wachtwoord.",
    explanation: "Niet slim! Als iemand dat ene wachtwoord ontdekt, kan hij in ál je accounts. Gebruik voor elk account een ander wachtwoord." },
  { type: "beveilig", slim: true,
    situatie: "Je zet een schermvergrendeling met een pincode op je telefoon.",
    explanation: "Slim! Een schermslot houdt je account veilig als je je telefoon even neerlegt of kwijtraakt." },
  { type: "beveilig", slim: false,
    situatie: "Je krijgt per sms een inlogcode en typt die over aan iemand die je opbelt.",
    explanation: "Niet slim! Een verificatiecode is geheim en van jou alleen. Wie hem krijgt, kan zó in je account. Nooit doorgeven." },
  { type: "beveilig", slim: true,
    situatie: "Je vult als herstel-e-mail een adres in dat alleen jij kunt bekijken.",
    explanation: "Slim! Via je herstel-e-mail kun je weer bij je account als je iets vergeet. Zorg dat alleen jij daarbij kunt." },
  { type: "beveilig", slim: false,
    situatie: "Op een openbare computer klik je op 'onthoud dit apparaat' zodat je snel weer in kunt loggen.",
    explanation: "Niet slim! Op een gedeelde computer laat je niets onthouden — de volgende gebruiker kan dan zo in jouw account." },
  { type: "beveilig", slim: true,
    situatie: "In je accountinstellingen bekijk je af en toe welke apparaten zijn ingelogd.",
    explanation: "Slim! Zo zie je meteen of er een vreemd apparaat tussen staat, en kun je dat uitloggen." },
  { type: "beveilig", slim: false,
    situatie: "Je maakt als beveiligingsvraag 'Hoe heet mijn hond?', terwijl dat op je profiel staat.",
    explanation: "Niet slim! Een beveiligingsvraag waarvan het antwoord online staat, kan iedereen raden. Kies iets dat alleen jij weet." },
  { type: "beveilig", slim: true,
    situatie: "Je gebruikt een authenticator-app die elke keer een nieuwe code maakt voor het inloggen.",
    explanation: "Slim! Een authenticator-app is een sterke tweede stap: de code verandert steeds, dus hij is bijna niet te misbruiken." },
  { type: "beveilig", slim: false,
    situatie: "Je stuurt je verificatiecode even naar jezelf in een openbare groepschat.",
    explanation: "Niet slim! In een groepschat kan iedereen meelezen. Codes deel je nergens — ook niet 'even naar jezelf'." },
  { type: "beveilig", slim: true,
    situatie: "Als je klaar bent op de computer van school, log je netjes uit.",
    explanation: "Slim! Uitloggen is je digitale deur op slot doen, zodat de volgende leerling niet in jouw account kan." },
  { type: "beveilig", slim: false,
    situatie: "Je account vraagt of je tweestapsverificatie wilt aanzetten, en je klikt 'nee, te veel gedoe'.",
    explanation: "Jammer! Die ene extra stap kost een paar seconden, maar houdt inbrekers buiten. Zet het juist wél aan." },

  /* ---------- Vorm 2: Wat doe je? ---------- */
  { type: "situatie", juist: 1,
    vraag: "Je krijgt een inlogcode per sms, terwijl jij helemaal niet aan het inloggen bent. Wat doe je?",
    opties: [
      "De code snel invullen, dan is het klaar",
      "Niets invullen én je wachtwoord veranderen: iemand probeert in te loggen",
      "De code doorsturen naar een vriend om te vragen wat het is"],
    explanation: "Een code die je niet zelf aanvroeg betekent dat iemand je wachtwoord probeert. Verander het meteen en vul nooit die code in." },
  { type: "situatie", juist: 0,
    vraag: "Wat beveiligt je account het best, bovenop een sterk wachtwoord?",
    opties: [
      "Tweestapsverificatie aanzetten",
      "Je wachtwoord op je bureau plakken",
      "Elke dag opnieuw inloggen"],
    explanation: "Tweestapsverificatie voegt een tweede slot toe. Zelfs met je wachtwoord komt een inbreker er dan niet zomaar in." },
  { type: "situatie", juist: 1,
    vraag: "Je ziet: 'Nieuw apparaat ingelogd op je account'. Jij was het niet. Wat doe je?",
    opties: [
      "Niets, dat gebeurt wel vaker",
      "Meteen je wachtwoord veranderen en het thuis vertellen",
      "Wachten of het vanzelf overgaat"],
    explanation: "Een onbekende login is een alarmsignaal. Verander direct je wachtwoord en schakel hulp in — zo sluit je de inbreker buiten." },
  { type: "situatie", juist: 1,
    vraag: "Een goede beveiligingsvraag is er een die...",
    opties: [
      "iedereen makkelijk kan raden",
      "alleen jij weet en die niet online staat",
      "je op je profielpagina hebt gezet"],
    explanation: "Een beveiligingsvraag beschermt alleen als het antwoord geheim is. Kies iets dat niemand anders weet of kan opzoeken." },
  { type: "situatie", juist: 1,
    vraag: "Je speelt op de computer van een vriend en logt in op je game-account. Wat doe je als je klaar bent?",
    opties: [
      "Ingelogd laten, je komt vast nog terug",
      "Uitloggen en 'onthoud mij' niet aanvinken",
      "Je wachtwoord op een briefje bij de computer leggen"],
    explanation: "Op andermans of een gedeelde computer log je altijd uit en laat je niets onthouden, anders kan een ander in jouw account." },
  { type: "situatie", juist: 0,
    vraag: "Waarom is het slim om je apps en je systeem te updaten?",
    opties: [
      "Updates dichten beveiligingslekken",
      "Updates maken je account juist langzamer",
      "Alleen voor mooiere kleuren"],
    explanation: "Bij updates worden zwakke plekken gerepareerd. Een bijgewerkt apparaat is veel lastiger te hacken." },
  { type: "situatie", juist: 1,
    vraag: "Je krijgt een mail: 'Bevestig je account, klik hier en log in'. Je twijfelt. Wat doe je?",
    opties: [
      "Op de link klikken en inloggen",
      "Zelf naar de echte app of site gaan om het te checken",
      "Je wachtwoord in de mail terugtypen"],
    explanation: "Klik niet op zulke links — ze leiden vaak naar nep-inlogpagina's. Ga altijd zelf naar de echte app of site." },
  { type: "situatie", juist: 1,
    vraag: "Wat is tweestapsverificatie eigenlijk?",
    opties: [
      "Twee wachtwoorden achter elkaar typen",
      "Naast je wachtwoord ook een extra code, bijvoorbeeld via je telefoon",
      "Twee keer op de inlogknop klikken"],
    explanation: "Tweestapsverificatie = je wachtwoord (stap 1) plus een extra code (stap 2). Samen vormen ze een dubbel slot." },
  { type: "situatie", juist: 1,
    vraag: "Iemand belt: 'Ik ben van de helpdesk, geef even de code die je net kreeg.' Wat doe je?",
    opties: [
      "De code geven, het is toch de helpdesk",
      "Niet geven — een code deel je nooit, ook niet met 'de helpdesk'",
      "Alleen de eerste helft van de code geven"],
    explanation: "Een echte helpdesk vraagt nooit je code. Dit is een bekende inbrekerstruc. Geef nooit een verificatiecode weg." },
  { type: "situatie", juist: 1,
    vraag: "In je instellingen zie je dat je nog ingelogd bent op een oud apparaat dat je niet meer gebruikt. Wat doe je?",
    opties: [
      "Gewoon zo laten staan",
      "Dat apparaat uitloggen of verwijderen in je accountinstellingen",
      "Je hele account maar weggooien"],
    explanation: "Oude ingelogde apparaten zijn een risico. Log ze uit, dan kan niemand er nog via binnenkomen." }
];

/* --- Feedback voor Wereld 5 (past bij het beveiligings-thema) --- */
const ACCOUNT_FEEDBACK_GOED = [
  "Goed beveiligd!",
  "Jij houdt je account op slot!",
  "Sterk! Zo blijft je account veilig.",
  "Top! Een echte accountbewaker.",
  "Knap gedaan!"
];

const ACCOUNT_FEEDBACK_FOUT = [
  "Bijna!",
  "Denk aan een extra slot: tweestapsverificatie.",
  "Een code of wachtwoord deel je nooit met iemand.",
  "Bijna goed — hoe houd je een inbreker buiten?"
];
