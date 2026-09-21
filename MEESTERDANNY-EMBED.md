# Vonk de Robot embedden op meesterdanny.com

De game mag technisch via GitHub Pages geladen worden, maar leerkrachten hoeven die GitHub-url niet te zien.
Gebruik daarom op meesterdanny.com gewone pagina's met een iframe.

## Leerkracht-dashboard

Plaats dit op:

```txt
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-leerkrachtdashboard
```

```html
<iframe
  src="https://raizy93.github.io/vonk-de-robot/leerkracht.html"
  width="100%"
  height="1000"
  style="border:none; border-radius:16px; display:block;"
  loading="lazy"
  allow="fullscreen">
</iframe>
```

## Wachtwoord herstellen

Maak daarnaast een tweede pagina op meesterdanny.com:

```txt
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-wachtwoord-herstellen
```

Plaats daarop deze HTML. Deze snippet geeft de Supabase recovery-token uit de adresbalk door aan de resetpagina in het iframe.

```html
<iframe
  id="vonk-reset-frame"
  width="100%"
  height="760"
  style="border:none; border-radius:16px; display:block;"
  loading="eager"
  allow="fullscreen">
</iframe>

<script>
  const frame = document.getElementById("vonk-reset-frame");
  const basis = "https://raizy93.github.io/vonk-de-robot/reset-wachtwoord.html";
  frame.src = basis + window.location.search + window.location.hash;
</script>
```

## Supabase instellingen

Ga in Supabase naar:

```txt
Authentication → URL Configuration
```

Zet bij **Site URL**:

```txt
https://www.meesterdanny.com
```

Voeg bij **Redirect URLs** toe:

```txt
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-wachtwoord-herstellen
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-wachtwoord-herstellen/**
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-leerkrachtdashboard
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-leerkrachtdashboard/**
```

Daarna gebruik je in het leerkracht-dashboard de link **Wachtwoord vergeten?**.
De herstelmail gaat dan naar de MeesterDanny-pagina, niet naar GitHub.

De knoppen **Terug naar dashboard**, **Annuleren** en **Naar leerkracht-dashboard**
op de resetpagina openen bewust de bovenste browserpagina (`target="_top"`) naar:

```txt
https://www.meesterdanny.com/leerkracht/digitale-geletterdheid/vonk-de-robot-leerkrachtdashboard
```
