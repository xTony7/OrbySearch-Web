# WinSpotlight — website

Landing page for [WinSpotlight](https://github.com/xTony7/WinSpotlight), the macOS-Tahoe-style search bar for Windows.

Plain HTML, CSS and JavaScript: no framework and no build step. The hero demo runs the app's own
liquid-glass algorithm (metaball necks and SwiftUI-style springs) ported to JavaScript.

| File | What it is |
| --- | --- |
| `index.html` | The page (Spanish text; English lives in `main.js`) |
| `styles.css` | All styles and CSS animations |
| `main.js` | Language switch, scroll effects, feature animations, the live demo |
| `privacy.html` | Privacy policy (Spanish and English), needed for the Microsoft Store listing |
| `netlify.toml` | Netlify settings: publish this folder, security headers |
| `og.html` | Source of `assets/og.png`, the link preview image |

## Change the price or the Store link

At the top of `main.js`:

```js
const CONFIG = {
  price: "3.99",
  currency: "USD",
  storeUrl: "",  // Microsoft Store link once published
  betaUrl: "https://github.com/xTony7/WinSpotlight/releases/latest",
};
```

## Run locally

Any static server works, for example `python -m http.server 8080`, then open http://localhost:8080.

## Deploy on Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub** and pick this repository.
2. Leave the build command empty; the publish directory is `.` (already set in `netlify.toml`).
3. Deploy. Every push to `main` redeploys the site.

## Credits

WinSpotlight is based on [LSearch](https://github.com/blueprintnerd/LSearch) by blueprintnerd (Apache 2.0).
macOS is a trademark of Apple Inc.; Windows is a trademark of Microsoft. Not affiliated with either.
