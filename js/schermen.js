/* ============================================================
   SCHERMEN — Beheert alle menu-overlays:
   hoofdmenu, uitleg (veilig wachtwoord), speluitleg, winkel,
   pauze, game-over en level-voltooid.
   ============================================================ */

class Schermen {

  constructor() {
    this.schermen = {
      menu:       document.getElementById("vg-scherm-menu"),
      uitlegWw:   document.getElementById("vg-scherm-uitleg-ww"),
      speluitleg: document.getElementById("vg-scherm-speluitleg"),
      winkel:     document.getElementById("vg-scherm-winkel"),
      werelden:   document.getElementById("vg-scherm-werelden"),
      levels:     document.getElementById("vg-scherm-levels"),
      bouwer:     document.getElementById("vg-scherm-bouwer"),
      pauze:      document.getElementById("vg-scherm-pauze"),
      gameover:   document.getElementById("vg-scherm-gameover"),
      klaar:      document.getElementById("vg-scherm-klaar"),
      klaslogin:  document.getElementById("vg-scherm-klaslogin"),
      codewoord:  document.getElementById("vg-scherm-codewoord")
    };
    this.spelknoppen = document.getElementById("vg-spelknoppen");
  }

  /* Toon één scherm (of geen enkel scherm met naam null = spelen) */
  toon(naam) {
    for (const [key, el] of Object.entries(this.schermen)) {
      el.classList.toggle("vg-verborgen", key !== naam);
    }
    // Pauze/herstart-knopjes alleen tijdens het spelen tonen
    this.spelknoppen.classList.toggle("vg-verborgen", naam !== null);
  }

  /* Score invullen op het game-over-scherm */
  zetGameoverScore(score, sleutelsRonde) {
    document.getElementById("vg-score-gameover").textContent = score;
    document.getElementById("vg-sleutel-gameover").textContent = sleutelsRonde;
  }

  /* Scores, sleutels en sterren invullen op het level-voltooid-scherm */
  zetKlaarScore(score, sleutelsRonde, totaleSleutels, sterren) {
    document.getElementById("vg-score-klaar").textContent = score;
    document.getElementById("vg-sleutel-klaar").textContent = sleutelsRonde;
    document.getElementById("vg-totaal-klaar").textContent = totaleSleutels;

    // Sterren: goud voor behaald, grijs voor niet behaald
    document.getElementById("vg-sterren-klaar").innerHTML =
      Schermen.sterrenHtml(sterren);
  }

  /* "★★☆"-weergave bouwen (goud + grijs) */
  static sterrenHtml(aantal) {
    let html = "";
    for (let i = 1; i <= 3; i++) {
      html += `<span class="${i <= aantal ? "vg-ster-goud" : "vg-ster-grijs"}">★</span>`;
    }
    return html;
  }
}
