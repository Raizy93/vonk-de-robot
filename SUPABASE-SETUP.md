# Klas-omgeving instellen (Supabase)

De game heeft een leerkracht-dashboard (`leerkracht.html`) en een klas-login
voor leerlingen. Alles draait op een gratis Supabase-project. Eenmalig
instellen kost ± 5 minuten:

## Stap 1 — Supabase-project maken

1. Ga naar <https://supabase.com> en maak een gratis account.
2. Klik **New project**, kies een naam (bijv. `vonk-de-robot`) en een
   database-wachtwoord (bewaar dat ergens, je hebt het verder niet nodig).
3. Wacht tot het project klaar is (± 1 minuut).

## Stap 2 — Database aanmaken

1. Open in je project de **SQL Editor** (linkermenu).
2. Open het bestand `supabase-schema.sql` (zit in deze map), kopieer de
   hele inhoud, plak in de editor en klik **Run**.
3. Je ziet "Success" — klaar. (Nogmaals runnen kan geen kwaad.)

## Stap 3 — Sleutels invullen

1. Ga in Supabase naar **Project Settings → API**.
2. Kopieer de **Project URL** en de **anon public**-key.
3. Open `js/supabase-config.js` en vul beide in:

```js
const SUPABASE_CONFIG = {
  url:     "https://abcdefgh.supabase.co",
  anonKey: "eyJhbGciOi..."
};
```

De anon-key mag gewoon openbaar in de code staan: de beveiliging zit in
de database (Row Level Security — leerkrachten zien alleen hun eigen
klassen; leerlingen kunnen alleen via hun eigen login bij hun voortgang).

## Stap 4 — (Aanbevolen) e-mailbevestiging uitzetten

Standaard stuurt Supabase leerkrachten eerst een bevestigingsmail.
Wil je dat niet: **Authentication → Sign In / Providers → Email →
Confirm email** uitzetten. (Aanstaan werkt ook — het dashboard vraagt
dan om eerst je mail te bevestigen.)

## Klaar! Zo werkt het

**Leerkracht** — open `leerkracht.html`:
- Account aanmaken → klas aanmaken (kies een unieke naam, bijv.
  `groep7-vonkschool`) → leerlingnamen plakken (één per regel).
- Iedere leerling krijgt automatisch een oefenwachtwoord
  (bijv. `Vos-Raket-42`). Met **🖨️ Inloggegevens printen** print je
  uitdeelkaartjes.
- Per leerling zie je: hoe ver ze zijn, per wereld het aantal gehaalde
  levels en het percentage goed beantwoorde vragen, en wanneer ze voor
  het laatst speelden.
- Met de schakelaars zet je werelden **open of dicht** voor de hele
  klas. Een open wereld is voor iedereen speelbaar — ook voor
  leerlingen die de vorige wereld nog niet af hebben.

**Leerling** — open de game (`index.html`):
- Klik in het menu op **🏫 Klas-login** → klasnaam typen → op je naam
  klikken → wachtwoord typen.
- Voortgang wordt automatisch in de cloud bewaard en werkt dus op elk
  apparaat (ook op gedeelde Chromebooks).
- De login blijft bewaard tot de leerling uitlogt.

**Zonder Supabase-gegevens** (of zonder internet) werkt de game gewoon
zoals altijd: voortgang lokaal op het apparaat, klas-login-knop
onzichtbaar.

## Handig om te weten

- Wachtwoordcontrole bij leerlingen is hoofdletterongevoelig en negeert
  spaties — kindvriendelijk.
- Leerling wachtwoord kwijt? Klik in het dashboard op **🔑 nieuw ww**.
- Zet je een wereld dicht terwijl leerlingen spelen? Dan zien ze dat
  zodra ze terug in de wereldkiezer komen.
- Klasnamen zijn wereldwijd uniek (leerlingen loggen ermee in) — maak
  hem dus specifiek genoeg.
