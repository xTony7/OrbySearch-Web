# OrbySearch — website

Landing page for **OrbySearch**, the fast liquid-glass search bar for Windows.

Plain HTML, CSS and JavaScript: no framework and no build step. The hero demo runs the app's own
liquid-glass algorithm (metaball necks and spring physics) ported to JavaScript.

| File | What it is |
| --- | --- |
| `index.html` | The page (Spanish text; English lives in `main.js`) |
| `styles.css` | All styles and CSS animations |
| `main.js` | Language switch, scroll effects, feature animations, the live demo |
| `privacy.html` | Privacy policy (Spanish and English), needed for the Microsoft Store listing |
| `netlify.toml` | Netlify settings: publish this folder, security headers |
| `og.html` | Source of `assets/og.png`, the link preview image |

## "Notify me" sign-ups

The form in the pricing card uses **Netlify Forms** (no server code). After the first deploy, Netlify
detects the form named `espera`; sign-ups appear under **Site → Forms**, and you can turn on email
notifications there. The free plan includes 100 submissions a month.

## Change the price or the Store link

At the top of `main.js`:

```js
const CONFIG = {
  price: "3.99",
  currency: "USD",
  storeUrl: "",  // Microsoft Store link once published
};
```

## Run locally

Any static server works, for example `python -m http.server 8080`, then open http://localhost:8080.

## Deploy on Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub** and pick this repository.
2. Leave the build command empty; the publish directory is `.` (already set in `netlify.toml`).
3. Deploy. Every push to `main` redeploys the site.

## Legal

© 2026 OrbySearch. All rights reserved. Windows and Microsoft Store are trademarks of Microsoft;
OrbySearch is not affiliated with Microsoft.
