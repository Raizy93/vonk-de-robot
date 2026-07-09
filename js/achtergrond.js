/* ============================================================
   ACHTERGROND — Parallax-lagen voor een diepte-effect.

   Elke laag scrolt met een eigen snelheid mee met de camera:
   verre lagen langzaam, dichtbije lagen sneller. Alle vormen
   worden met canvas getekend (geen afbeeldingen nodig).
   ============================================================ */

/* Het luchtverloop is duur om elk frame opnieuw te maken; we
   bewaren hem en maken hem alleen opnieuw als de kleuren wisselen
   (dus bij het laden van een level met een ander thema). */
const luchtCache = { sleutel: null, gradient: null };

/* thema (optioneel): per level andere kleuren, zie levels.js.
   Ontbrekende kleuren vallen terug op CONFIG.kleuren. */
function tekenAchtergrond(ctx, cameraX, tijd, thema = {}) {
  const B = CONFIG.canvasBreedte;
  const H = CONFIG.canvasHoogte;
  const K = { ...CONFIG.kleuren, ...thema };

  /* --- Lucht: verloop van blauw naar lichtblauw (uit de cache) --- */
  const sleutel = K.luchtBoven + K.luchtOnder;
  if (luchtCache.sleutel !== sleutel) {
    const lucht = ctx.createLinearGradient(0, 0, 0, H);
    lucht.addColorStop(0, K.luchtBoven);
    lucht.addColorStop(1, K.luchtOnder);
    luchtCache.sleutel = sleutel;
    luchtCache.gradient = lucht;
  }
  ctx.fillStyle = luchtCache.gradient;
  ctx.fillRect(0, 0, B, H);

  /* --- Zon (staat stil) --- */
  ctx.fillStyle = K.zon;
  ctx.beginPath();
  ctx.arc(820, 90, 46, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 243, 168, 0.35)";
  ctx.beginPath();
  ctx.arc(820, 90, 64, 0, Math.PI * 2);
  ctx.fill();

  /* --- Wolken (parallax-factor 0.15, drijven ook langzaam zelf) --- */
  tekenHerhalendeLaag(ctx, cameraX * 0.15 - tijd * 8, 460, (x, i) => {
    const y = 60 + ((i * 53) % 90);
    ctx.fillStyle = K.wolk;
    ctx.beginPath();
    ctx.arc(x,      y,      22, 0, Math.PI * 2);
    ctx.arc(x + 26, y - 8,  26, 0, Math.PI * 2);
    ctx.arc(x + 56, y,      20, 0, Math.PI * 2);
    ctx.fill();
  });

  /* --- Verre heuvels (parallax-factor 0.3) --- */
  tekenHerhalendeLaag(ctx, cameraX * 0.3, 330, (x, i) => {
    const hoogte = 120 + ((i * 37) % 60);
    ctx.fillStyle = K.heuvelVer;
    ctx.beginPath();
    ctx.ellipse(x, H - 40, 220, hoogte, 0, Math.PI, 0);
    ctx.fill();
  });

  /* --- Dichtbije heuvels (parallax-factor 0.55) --- */
  tekenHerhalendeLaag(ctx, cameraX * 0.55, 420, (x, i) => {
    const hoogte = 70 + ((i * 29) % 50);
    ctx.fillStyle = K.heuvelDichtbij;
    ctx.beginPath();
    ctx.ellipse(x, H - 30, 180, hoogte, 0, Math.PI, 0);
    ctx.fill();
  });
}

/*
 * Hulpfunctie: tekent een patroon dat zich elke 'afstand' pixels
 * herhaalt, verschoven met 'offset'. De teken-callback krijgt de
 * x-positie op het scherm en een indexnummer (voor kleine variaties).
 */
function tekenHerhalendeLaag(ctx, offset, afstand, teken) {
  const B = CONFIG.canvasBreedte;
  const eerste = Math.floor(offset / afstand) - 1;
  const laatste = Math.floor((offset + B) / afstand) + 1;

  for (let i = eerste; i <= laatste; i++) {
    const schermX = i * afstand - offset;
    teken(schermX, ((i % 7) + 7) % 7);   // index altijd 0..6
  }
}
