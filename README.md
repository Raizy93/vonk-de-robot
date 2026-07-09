# Vonk de Robot — De Wachtwoordmissie

Een educatieve 2D-platformgame in pure HTML/CSS/JavaScript over digitale
veiligheid voor kinderen (groep 7/8). Geen frameworks, geen afbeeldingen,
geen installatie — alles wordt met canvas getekend (en het geluid met de
WebAudio API) en werkt direct in de browser (desktop/laptop/Chromebook).

## De zes werelden (leerlijn digitale veiligheid)

| Wereld | Leerdoel | Status |
|---|---|---|
| **1 — Wachtwoordschool** (6 levels) | Sterk of zwak herkennen | ✅ speelbaar |
| **2 — Wachtwoordwerkplaats** (6 levels) | Zwakke wachtwoorden verbeteren (+ wachtwoord-bouwer, + zap-blaster) | ✅ speelbaar |
| **3 — Geheimenkluis** (6 levels) | Wachtwoorden en codes geheim houden (+ **zoeklichten**: blijf uit het licht!) | ✅ speelbaar |
| **4 — Phishingrivier** (6 levels) | Nepberichten en verdachte links herkennen (+ **water**, **drijvende vlotten** en **happers** die uit het water springen) | ✅ speelbaar |
| **5 — Accountstad** (6 levels) | Accounts extra beveiligen (+ **beveiligingslasers** die aan/uit knipperen: glip erdoor als ze uit zijn) | ✅ speelbaar |
| **6 — Cyberkasteel** (6 levels) | Eindmissie: alles toepassen (gemengd eindexamen + álle obstakels en vijanden samen) | ✅ speelbaar |

De leerdoelen lopen niet door elkaar: in Wereld 1 (school) alleen
*herkennen*-vragen, in Wereld 2 (werkplaats) alleen *verbeter*-vragen
én de wachtwoord-bouwer na elke finish. Alles is gebundeld in
`js/werelden.js`; een wereld afbouwen = levelbestand + vragenset maken
en daar `beschikbaar: true` zetten.

**Navigatie:** Spelen → **wereldkiezer** (zes kaarten naast elkaar, elk
met een canvas-getekend plaatje, leerdoel en sterrenteller) → klik op
een wereld → de levels van díe wereld. Vergrendelde werelden tonen een
slotje, nog niet gebouwde werelden "Binnenkort!".

## Hoe het werkt

Vanuit het **hoofdmenu** kies je:

1. **Wat is een veilig wachtwoord?** — kindvriendelijke uitleg met voorbeelden
2. **Spelen** — opent de wereldkiezer, daarna de levels van die wereld
3. **Speluitleg** — hoe het spel werkt + besturing
4. **Winkel** — drie afdelingen: **🤖 Robots** (skins), **⚡ Lasers**
   (kleur van je zap-schoten; gaat open zodra Wereld 2 ontgrendeld is)
   en **🎁 Codewoord** — geheime woorden van de werkbladen inwisselen.
   Codewoorden beheer je bovenin `js/winkel.js` (`CODEWOORDEN`); elk
   woord is per speler één keer te verzilveren, hoofdletters maken
   niet uit. Eén codewoord per wereld, oplopende beloning:

   | Werkblad | Codewoord | Beloning |
   |---|---|---|
   | W1 Wachtwoordschool | STERK | +10 sleutels |
   | W2 Wachtwoordwerkplaats | BOUW | +15 sleutels |
   | W3 Geheimenkluis | KLUIS | +20 sleutels |
   | W4 Phishingrivier | SCHILD | +25 sleutels |
   | W5 Accountstad | SLOTEN | +30 sleutels |
   | W6 Cyberkasteel | EXPERT | 🌟 de geheime **Schaduwheld**-skin |

   De Schaduwheld staat niet te koop: hij verschijnt pas in de winkel
   nadat EXPERT is ingewisseld (en wordt dan meteen aangetrokken).

In de levels zweven **gouden slotjes**. Raak je er een, dan verschijnt een
wachtwoordvraag, passend bij het leerdoel van de wereld:

- Wereld 1: **Veilig of niet veilig?** en **Welk is het sterkst?**
- Wereld 2: **Hoe maak je dit sterker?** — de foute antwoorden zijn
  bewust ongeveer even lang als het goede, zodat kinderen op inhoud
  moeten kiezen (niet gewoon "het langste antwoord")

Goed antwoord = 1 sleutel (en altijd korte uitleg, ook bij een fout
antwoord). In **Wereld 2** volgt na elke finish de **wachtwoord-bouwer**:
bouw zelf een supersterk oefenwachtwoord met een live sterkte-meter en
checklist, goed voor maximaal 3 bonussleutels. (In Wereld 1 draait alles
om herkennen — daar is de bouwer bewust niet.)

**Leervoorwaarde:** de finish werkt pas als de speler minstens
**5 slotjes heeft geprobeerd** (goed óf fout — het gaat om het oefenen).
De teller staat in de HUD en boven de finish hangt een voortgangsbadge
zolang die nog dicht is. Aanpassen kan via `CONFIG.minVragenVoorFinish`.

**Sterren per level** (beste resultaat wordt bewaard):
★ finish gehaald · ★★ helft van de vragen goed · ★★★ alles goed.
Elk volgend level ontgrendelt na 1 ster in het level ervoor;
Wereld 2 opent na 1 ster in het laatste level van Wereld 1.

**De zap-blaster (Wereld 2)**: richt met de muis (richtkruis in beeld)
en klik om een zap-schot af te vuren. Daarmee versla je slijmpjes en
zoemers op afstand — stekelbollen zijn gepantserd en ketsen het schot
af. Instelbaar in `js/config.js` (`blasterCooldown`, `projectielSnelheid`).

**De levels** bouwen op in uitdaging, elk met een eigen kleurthema —
niet alleen de lucht en heuvels, maar ook de vloer en platforms kleuren
mee (gras overdag, mos in de grot, neonranden in de burchten):

| Wereld 1 | Nieuw | Wereld 2 | Nieuw |
|---|---|---|---|
| Zonnige Heuvels | de basis | Sleutelsmederij | de zap-blaster |
| Schemervallei | bredere gaten | Schroevenlaan | dubbele mover-oversteek |
| Wolkenhaven | **bewegende platforms** | Boutenmoeras | brokkelbrug + stekelbol |
| Kristalgrot | **afbrokkelplatforms** + **stekelbol** | Vijlenfjord | lift + 2 stekelbollen |
| Stormpiek | liften, brokkelbruggen | Vonkendelta | alles gemixt |
| Cyberburcht | eindlevel wereld 1 | Machinetoren | eindlevel: 13 vijanden |

Stekelbollen kun je **niet** verslaan — niet door erop te springen en
niet met de blaster (gepantserd): ontwijken is de enige optie.

Sleutels, skins, sterren en de geluidsinstelling worden bewaard in
**localStorage**, dus alles blijft staan als de pagina opnieuw laadt.
(Oude spaarstanden in "muntjes" worden automatisch omgerekend.)

| Toets | Actie |
|---|---|
| ← → of A / D | lopen |
| Spatie, ↑ of W | springen |
| P | pauze |
| R | level opnieuw |

## Embedden op je website

Kopieer uit `index.html` het hele `<div class="vg-container">`-blok, de
`<link>` naar `css/stijl.css` en de `<script>`-tags (volgorde behouden!).
Alle CSS is beperkt tot `.vg-container`, dus je pagina-layout blijft
ongemoeid. Embedden via een `<iframe>` kan natuurlijk ook.

## Aanpassen

| Wat | Waar |
|---|---|
| Wachtwoordvragen (54 stuks, 3 vormen) | `js/wachtwoorden.js` |
| Feedbackzinnen (goed/fout) | `js/wachtwoorden.js` — `FEEDBACK_GOED` / `FEEDBACK_FOUT` |
| Checklist/bonus van de bouwer | `js/bouwer.js` |
| Geluidseffecten | `js/geluid.js` |
| Skins en lasers (namen, kleuren, prijzen) | `js/skins.js` |
| Sleutels per goed antwoord | `CONFIG.sleutelsPerGoedAntwoord` in `js/config.js` |
| Levels: platforms (ook bewegend/brokkel), slotjes, vijanden, poorten, kleurthema | `js/levels.js` — alles is data |
| Snelheden, zwaartekracht, levens, kleuren | `js/config.js` |
| Uitlegteksten en menu's | `index.html` + `css/stijl.css` |

### Vragen toevoegen (drie vormen)

```js
// in js/wachtwoorden.js — vorm 1: veilig of niet
{ password: "Sterretje!2030", safe: true,
  explanation: "Dit is veiliger, omdat het lang is en cijfers en een teken bevat." }

// vorm 2: kies het sterkste (juist = index van het goede antwoord)
{ type: "sterkste", opties: ["hond", "hond123", "MijnHondRent!88"], juist: 2,
  explanation: "MijnHondRent!88 is het langst en het gevarieerdst." }

// vorm 3: hoe maak je het sterker?
{ type: "verbeter", password: "voetbal", juist: 0,
  opties: ["Cijfers en tekens toevoegen", "Er 1 achter zetten", "Twee keer typen"],
  explanation: "Langer en gevarieerder maken helpt echt." }
```

De vragen worden per ronde geschud en komen binnen één ronde nooit dubbel
voor. Zijn alle vragen op, dan wordt de lijst opnieuw geschud.

### Een level toevoegen of aanpassen

Kopieer in `js/levels.js` een levelobject en pas de data aan. De
levelkiezer, sterren en de "Volgende level"-knop werken er automatisch
mee; het nieuwe level ontgrendelt na 1 ster in het level ervoor. Met het
optionele `thema`-veld geef je het level eigen achtergrondkleuren.

Speciale platforms en obstakels (allemaal pure data):

```js
// schuift heen en weer (as "x") of op en neer (as "y"); de speler lift mee
{ type: "bewegend", as: "x", min: 1310, max: 1590, y: 400, w: 120, duur: 4 }

// trilt 0,7 s zodra je erop staat, stort in en komt na 3 s terug
{ type: "brokkel", x: 1330, y: 380, w: 90 }

// vijand die je NIET kunt verslaan; zweeft rond (cx, cy) heen en weer
{ type: "stekelbol", cx: 3000, cy: 463, as: "x", bereik: 280, duur: 6 }
```

## Mapstructuur (modulair)

```
index.html            — container, alle schermen/menu's, scriptvolgorde
css/stijl.css         — alle styling, beperkt tot .vg-container
js/config.js          — instellingen en kleuren (ook blaster)
js/wachtwoorden.js    — vragensets W1 (herkennen, 48) en W2 (verbeteren, 20)
js/geheimen.js        — vragenset W3 (geheim houden, 24)
js/veilig-online.js   — vragenset W4 (echt/nep + situaties, 24)
js/accounts.js        — vragenset W5 (accounts beveiligen, 24)
js/eindmissie.js      — vragenset W6 (gemengd eindexamen, alle 7 vormen)
js/opslag.js          — localStorage: sleutels, skins, sterren, geluid
js/geluid.js          — geluidseffecten via WebAudio (geen bestanden)
js/skins.js           — de 4 koopbare skins (canvas-tekeningen)
js/winkel.js          — het winkelscherm (kopen/selecteren)
js/bouwer.js          — de wachtwoord-bouwer met sterkte-meter
js/levels.js          — de 6 levels van Wereld 1 (data + kleurthema)
js/levels-wereld2.js  — de 6 levels van Wereld 2
js/levels-wereld3.js  — de 6 levels van Wereld 3 (incl. zoeklichten)
js/levels-wereld4.js  — de 6 levels van Wereld 4 (water, vlotten, happers)
js/levels-wereld5.js  — de 6 levels van Wereld 5 (beveiligingslasers)
js/levels-wereld6.js  — de 6 levels van Wereld 6 (alles gecombineerd)
js/werelden.js        — bundelt levels + vragen + extra's per wereld
js/input.js           — toetsenbordbesturing
js/botsing.js         — collision detection (AABB)
js/camera.js          — soepel scrollende camera
js/achtergrond.js     — parallax-achtergrond met diepte (+ thema's)
js/speler.js          — de speler: fysica, springen, animatie
js/vijanden.js        — slijmpjes, zoemers en stekelbollen
js/objecten.js        — bollen, slotjes, poorten, platforms, finish
js/vraagmodule.js     — het vraagvenster (5 vraagvormen)
js/schermen.js        — hoofdmenu, levelkiezer en alle overlays
js/game.js            — hoofdlus, werelden, blaster, score/sterren, HUD
```

**Belangrijk:** de wachtwoorden in de game zijn nepwachtwoorden om mee te
oefenen — laat kinderen nooit hun echte wachtwoord invullen of delen. 🤖
