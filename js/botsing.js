/* ============================================================
   BOTSING — Collision detection (AABB: rechthoek tegen rechthoek).
   ============================================================ */

/* Raken twee rechthoeken elkaar? (beide hebben x, y, w, h) */
function rechthoekenRaken(a, b) {
  return a.x < b.x + b.w &&
         a.x + a.w > b.x &&
         a.y < b.y + b.h &&
         a.y + a.h > b.y;
}

/*
 * Beweegt een entiteit (met x, y, w, h, vx, vy) en lost botsingen
 * met vaste blokken op. Eerst horizontaal, dan verticaal — zo
 * blijft de speler netjes op platforms staan en tegen muren hangen.
 *
 * Geeft terug: { grond, plafond, muur } (booleans)
 */
function beweegMetBotsing(ent, blokken, dt) {
  const resultaat = { grond: false, plafond: false, muur: false };

  /* --- Horizontaal bewegen en oplossen --- */
  ent.x += ent.vx * dt;
  for (const blok of blokken) {
    if (rechthoekenRaken(ent, blok)) {
      if (ent.vx > 0)      ent.x = blok.x - ent.w;       // tegen linkerkant
      else if (ent.vx < 0) ent.x = blok.x + blok.w;      // tegen rechterkant
      resultaat.muur = true;
    }
  }

  /* --- Verticaal bewegen en oplossen --- */
  ent.y += ent.vy * dt;
  for (const blok of blokken) {
    if (rechthoekenRaken(ent, blok)) {
      if (ent.vy > 0) {                                   // naar beneden: landen
        ent.y = blok.y - ent.h;
        ent.vy = 0;
        resultaat.grond = true;
      } else if (ent.vy < 0) {                            // omhoog: hoofd stoten
        ent.y = blok.y + blok.h;
        ent.vy = 0;
        resultaat.plafond = true;
      }
    }
  }

  return resultaat;
}
