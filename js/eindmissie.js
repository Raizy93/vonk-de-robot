/* ============================================================
   EINDMISSIE — De vragenset van Wereld 6: "Cyberkasteel".

   Leerdoel: alles toepassen. Dit is het grote eindexamen: een
   gemengde set vragen uit ALLE eerdere werelden, met alle zeven
   vraagvormen door elkaar. Wie hier doorheen komt, is een echte
   cyberheld!

   Vraagvormen (zie vraagmodule.js):
     "veilig"   : is dit wachtwoord veilig?           (Wereld 1)
     "sterkste" : welk wachtwoord is het sterkst?     (Wereld 1)
     "verbeter" : hoe maak je dit sterker?            (Wereld 2)
     "geheim"   : is dit oké?                         (Wereld 3)
     "echtnep"  : kun je dit bericht vertrouwen?      (Wereld 4)
     "beveilig" : slim of niet slim?                  (Wereld 5)
     "situatie" : wat doe je?
   ============================================================ */

const EINDMISSIE_VRAGEN = [

  /* ----- Wachtwoorden herkennen (Wereld 1) ----- */
  { type: "veilig", password: "welkom123", safe: false,
    explanation: "Niet veilig: een makkelijk woord met een voorspelbaar cijfer, dat veel mensen gebruiken." },
  { type: "veilig", password: "SterkeZin#2026", safe: true,
    explanation: "Veiliger: lang, met hoofdletters, kleine letters, een cijfer en een speciaal teken." },
  { type: "veilig", password: "voetbal2027", safe: false,
    explanation: "Niet veilig: een bekend woord met een jaartal is snel te raden." },
  { type: "veilig", password: "MijnKatSpringt@7", safe: true,
    explanation: "Veiliger: een lange zin met een cijfer en een teken — moeilijk te raden." },
  { type: "sterkste", opties: ["hond123", "GroeneDraak!58", "hond"], juist: 1,
    explanation: "GroeneDraak!58 is het sterkst: lang, met hoofdletters, cijfers en een teken." },
  { type: "sterkste", opties: ["qwerty", "MijnFietsRijdt#82", "fiets2026"], juist: 1,
    explanation: "MijnFietsRijdt#82 is het sterkst: een lange zin met een cijfer en een speciaal teken." },

  /* ----- Wachtwoorden verbeteren (Wereld 2) ----- */
  { type: "verbeter", password: "zomer", juist: 1, opties: [
      "Het jaartal erachter zetten: zomer2026",
      "Er een zin met tekens van maken: ZomerZonScheen!24",
      "Het woord twee keer typen: zomerzomer"],
    explanation: "Een jaartal of herhaling helpt amper. Een lange zin met hoofdletters, cijfers en een teken wél." },
  { type: "verbeter", password: "12345678", juist: 2, opties: [
      "Er nog cijfers achter zetten",
      "De cijfers omdraaien naar 87654321",
      "Letters, hoofdletters en tekens toevoegen"],
    explanation: "Alleen cijfers blijven voorspelbaar. Een mix van letters, hoofdletters en tekens maakt het sterk." },

  /* ----- Geheim houden (Wereld 3) ----- */
  { type: "geheim", oke: false,
    situatie: "Je schrijft je wachtwoord op een briefje en plakt het op je scherm.",
    explanation: "Niet doen! Iedereen die langsloopt kan het lezen. Een wachtwoord houd je in je hoofd of veilig thuis." },
  { type: "geheim", oke: true,
    situatie: "Je wacht met inloggen tot niemand op je scherm kan meekijken.",
    explanation: "Slim! Meekijken (schoudersurfen) is de makkelijkste manier waarop een wachtwoord uitlekt." },
  { type: "geheim", oke: false,
    situatie: "Je vriend vraagt je wachtwoord om jouw skin te gebruiken, en je geeft het.",
    explanation: "Niet doen! Een wachtwoord deel je met niemand — ook niet met je beste vriend." },

  /* ----- Phishing / nepberichten (Wereld 4) ----- */
  { type: "echtnep", echt: false,
    bericht: "GEFELICITEERD! Je hebt een gratis telefoon gewonnen! Klik snel en vul je gegevens in!",
    explanation: "Nep! Je kunt niets winnen zonder mee te doen, en echte acties vragen nooit je gegevens via een link." },
  { type: "echtnep", echt: false,
    bericht: "Je pakketje kon niet bezorgd worden. Betaal 1,99 euro via deze link om het opnieuw te sturen.",
    explanation: "Nep! Een bekende oplichterstruc. Bezorgers vragen nooit om via een linkje bij te betalen." },
  { type: "echtnep", echt: true,
    bericht: "Hoi! De bibliotheek op school is woensdag dicht. Groetjes, juf Sanne.",
    explanation: "Te vertrouwen: gewone informatie, geen link, geen vraag om gegevens, en je kent de afzender." },
  { type: "echtnep", echt: false,
    bericht: "Je account wordt geblokkeerd! Log NU in via deze link om dat te voorkomen.",
    explanation: "Nep! Haast maken ('NU!') en een link naar inloggen zijn dé kenmerken van phishing. Ga zelf naar de echte site." },

  /* ----- Accounts beveiligen (Wereld 5) ----- */
  { type: "beveilig", slim: true,
    situatie: "Je zet tweestapsverificatie aan: naast je wachtwoord vraagt je account ook een extra code.",
    explanation: "Slim! Een extra code is een tweede slot. Zelfs met je wachtwoord komt een inbreker er dan niet in." },
  { type: "beveilig", slim: false,
    situatie: "Je krijgt een melding 'nieuw apparaat ingelogd' terwijl jij het niet was, en je doet niets.",
    explanation: "Niet slim! Dat is een alarmsignaal. Verander meteen je wachtwoord en vertel het thuis." },
  { type: "beveilig", slim: true,
    situatie: "Op de schoolcomputer log je uit als je klaar bent en laat je niets onthouden.",
    explanation: "Slim! Zo kan de volgende leerling niet in jouw account. Uitloggen = je digitale deur op slot." },
  { type: "beveilig", slim: false,
    situatie: "Iemand belt: 'Ik ben van de helpdesk, geef even de code die je net kreeg.' Je geeft de code.",
    explanation: "Niet slim! Een echte helpdesk vraagt nooit je code. Een verificatiecode geef je nooit weg." },

  /* ----- Gemengde 'wat doe je?'-situaties ----- */
  { type: "situatie", juist: 1,
    vraag: "Je krijgt een inlogcode per sms terwijl jij niet aan het inloggen bent. Wat doe je?",
    opties: [
      "De code snel invullen, dan is het klaar",
      "Niets invullen én je wachtwoord veranderen: iemand probeert in te loggen",
      "De code doorsturen naar een vriend"],
    explanation: "Een code die je niet aanvroeg betekent dat iemand je wachtwoord probeert. Vul hem nooit in en verander je wachtwoord." },
  { type: "situatie", juist: 1,
    vraag: "Een onbekende stuurt: 'Haha, ben jij dit in deze video?? [link]'. Wat doe je?",
    opties: [
      "Snel klikken, misschien sta ik er echt in",
      "Niet klikken, verwijderen en het nummer blokkeren",
      "De link doorsturen naar je vrienden"],
    explanation: "Nooit op onbekende links klikken — zo raak je je account kwijt. En doorsturen brengt je vrienden in gevaar." },
  { type: "situatie", juist: 2,
    vraag: "Je hebt per ongeluk je wachtwoord in de groepschat gezet. Wat doe je?",
    opties: [
      "Snel verwijderen, dan heeft vast niemand het gezien",
      "Niets doen, het waait wel over",
      "Meteen je wachtwoord veranderen en het thuis vertellen"],
    explanation: "Verwijderen is niet genoeg: mensen kunnen het al gezien hebben. Alleen veranderen maakt je account weer veilig." },
  { type: "situatie", juist: 0,
    vraag: "Wat is de beste manier om een sterk wachtwoord te onthouden?",
    opties: [
      "Een lange, gekke zin verzinnen met cijfers en een teken",
      "Overal hetzelfde korte woord gebruiken",
      "Het op je hand schrijven"],
    explanation: "Een lange zin (bijv. DrieKattenDansen#22) is makkelijk te onthouden én moeilijk te raden." },
  { type: "situatie", juist: 1,
    vraag: "Een online 'vriend' die je nooit echt ontmoette, vraagt om een foto van jou. Wat doe je?",
    opties: [
      "Een foto sturen, hij is toch aardig",
      "Geen foto sturen en het met je ouders of juf/meester bespreken",
      "Alleen sturen als hij er eerst een stuurt"],
    explanation: "Stuur nooit foto's naar mensen die je alleen online kent. Iemand vertellen is slim, niet kinderachtig." },
  { type: "situatie", juist: 1,
    vraag: "Waarom is het slim om je apps en systeem te updaten?",
    opties: [
      "Alleen voor mooiere kleuren",
      "Updates dichten beveiligingslekken",
      "Updates maken je account langzamer"],
    explanation: "Bij updates worden zwakke plekken gerepareerd. Een bijgewerkt apparaat is veel lastiger te hacken." }
];

/* --- Feedback voor Wereld 6 (triomfantelijk eindexamen) --- */
const EINDMISSIE_FEEDBACK_GOED = [
  "Cyberheld!",
  "Perfect toegepast!",
  "Jij weet echt alles van online veilig zijn!",
  "Sterk! De cyberkasteel-poort gaat open.",
  "Top gedaan!"
];

const EINDMISSIE_FEEDBACK_FOUT = [
  "Bijna!",
  "Denk terug aan wat je in de eerdere werelden leerde.",
  "Een echte cyberheld kijkt nog één keer goed.",
  "Bijna goed — lengte, geheimhouden, links of een extra slot?"
];
