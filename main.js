/* WinSpotlight landing page. No dependencies. */
"use strict";

// ---- settings you will want to change -------------------------------------------------------
const CONFIG = {
  price: "3.99",
  currency: "USD",
  storeUrl: "",  // Microsoft Store link once it is published; empty shows "coming soon"
  betaUrl: "https://github.com/xTony7/WinSpotlight/releases/latest",
};

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---- language -----------------------------------------------------------------------------------
// Spanish lives in the HTML; English is here. JS-only strings carry both.
const EN = {
  "nav.features": "Features", "nav.privacy": "Privacy", "nav.price": "Pricing", "nav.faq": "FAQ", "nav.cta": "Get it",
  "hero.pill": "New in v1.3 · Liquid glass",
  "hero.t1": "Your whole PC,", "hero.t2": "one shortcut away.",
  "hero.sub": "The search bar with the look of macOS Tahoe, built for Windows. Open apps, find files by what's inside them, convert currencies and get back what you copied. Just press <kbd>Alt</kbd> + <kbd>Space</kbd>.",
  "hero.buy": "Get it", "hero.how": "See how it works",
  "hero.note": "Windows 10 and 11 · Works offline · No account",
  "demo.ph": "Search", "demo.foot": "All on your PC · 0.03 s",
  "feat.eyebrow": "Features", "feat.title": "Small details.<br><span class=\"grad\">Big difference.</span>",
  "f1.t": "Liquid glass", "f1.p": "The buttons bud off the bar like drops and melt back into it as you type. Spring animations, as smooth as on a Mac.",
  "f2.t": "Search by meaning", "f2.p": "Type what you remember, not the exact name. It reads inside your PDFs, Word documents and code.",
  "f2.hit": "“…amount due, billing period March…”",
  "f3.t": "Instant conversions", "f3.p": "Currencies, distance, weight and temperature as you type. Press ↵ and the result is copied.",
  "f4.t": "2-hour clipboard", "f4.p": "Text, images and files you copied. Find them and copy them again with one Enter.",
  "f4.c1": "Shipping address…", "f4.c2": "Screenshot",
  "f5.t": "Grid or list", "f5.p": "Big icons for your apps or compact rows for your files. Switch with one click.",
  "f6.t": "Shortcuts for everything", "f6.p": "Lock the PC, empty the Recycle Bin, take a screenshot, create a document or search YouTube. No menus.",
  "keys.space": "Space", "keys.title": "One shortcut.<br><span class=\"grad\">Your whole PC.</span>",
  "keys.p": "It appears over any window and gets out of the way when you're done. No switching apps, no reaching for the mouse.",
  "keys.enter": "Open", "keys.reveal": "Show in File Explorer", "keys.scopes": "Apps, files, shortcuts, clipboard", "keys.esc": "Clear, go back or close",
  "pers.eyebrow": "Appearance", "pers.title": "Make it <span class=\"grad\">yours.</span>",
  "pers.p": "Light or dark, eight accent colors, blur, transparency, size and bar length. Try it:",
  "priv.eyebrow": "Privacy", "priv.title": "What you search for<br><span class=\"grad\">stays on your PC.</span>",
  "priv.1t": "Local index", "priv.1p": "Your files, searches and clipboard never leave your computer. There is no cloud.",
  "priv.2t": "No account, no tracking", "priv.2p": "No email sign-up, no telemetry, no ads. Install it and it works.",
  "priv.3t": "Locked down", "priv.3p": "The search engine only answers WinSpotlight, with a key no website knows.",
  "priv.4t": "Open source", "priv.4p": "Anyone can check what it does. Based on LSearch, Apache 2.0 licensed.",
  "price.eyebrow": "Pricing", "price.title": "Pay once.<br><span class=\"grad\">Yours forever.</span>",
  "price.once": "One-time purchase · no subscription",
  "price.l1": "Every feature, no limits", "price.l2": "Updates included", "price.l3": "Free trial before you buy", "price.l4": "Windows 10 and 11 · English and Spanish",
  "price.store": "Coming soon to the Microsoft Store", "price.storeBuy": "Buy on the Microsoft Store", "price.beta": "Try the free beta",
  "faq.title": "Questions",
  "faq.q1": "Does it need the internet?", "faq.a1": "No. It only downloads the search models the first time and, if you convert currencies, fetches exchange rates. Everything else works offline.",
  "faq.q2": "What do I need to run it?", "faq.a2": "64-bit Windows 10 (1809 or later) or 11, 8 GB of RAM and about 400 MB of disk plus the index. No need to install Python or .NET.",
  "faq.q3": "Does my data leave my PC?", "faq.a3": "No. The index, your searches and your clipboard history are stored only on your computer. Read the <a href=\"privacy.html\">privacy policy</a>.",
  "faq.q4": "Can I change the shortcut?", "faq.a4": "Yes. In Settings, click the shortcut and press the combination you prefer.",
  "faq.q5": "Which folders does it search?", "faq.a5": "The ones you pick when you install it (Documents, Desktop, Downloads…). It also finds Start-menu and Microsoft Store apps, and optionally your browser history.",
  "final.title": "Search less.<br><span class=\"grad\">Find more.</span>",
  "foot.privacy": "Privacy",
  "foot.legal": "© 2026 WinSpotlight. Based on <a href=\"https://github.com/blueprintnerd/LSearch\" rel=\"noopener\">LSearch</a> by blueprintnerd (Apache 2.0). macOS is a trademark of Apple Inc.; Windows is a trademark of Microsoft. This project is not affiliated with either.",
};
const ES_JS = { "price.storeBuy": "Comprar en Microsoft Store" };
const ES = {};
$$("[data-i18n]").forEach(el => { ES[el.dataset.i18n] = el.innerHTML.trim(); });

let lang = (() => {
  try { const saved = localStorage.getItem("lang"); if (saved === "es" || saved === "en") return saved; } catch {}
  return navigator.language?.toLowerCase().startsWith("es") ? "es" : (navigator.language ? "en" : "es");
})();
const t = key => (lang === "en" ? EN[key] : (ES[key] ?? ES_JS[key])) ?? key;
const pick = (es, en) => (lang === "en" ? en : es);

function applyLang() {
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  $("#lang").textContent = lang === "en" ? "ES" : "EN";
  document.title = pick("WinSpotlight — Todo tu PC, a un atajo", "WinSpotlight — Your whole PC, one shortcut away");
  applyPrice();
  fillActions();
  layoutDemo?.refresh();
}
$("#lang").addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  try { localStorage.setItem("lang", lang); } catch {}
  applyLang();
});

function applyPrice() {
  const money = lang === "en" ? `$${CONFIG.price}` : `${CONFIG.price.replace(".", ",")} ${CONFIG.currency}`;
  $$("[data-price]").forEach(el => { el.textContent = `· ${money}`; });
  const big = $("[data-price-big]");
  big.innerHTML = lang === "en" ? `$${CONFIG.price}<small>${CONFIG.currency}</small>` : `${CONFIG.price.replace(".", ",")}<small>${CONFIG.currency}</small>`;
  const store = $("#storeBtn"), beta = $("#betaBtn");
  beta.href = CONFIG.betaUrl;
  if (CONFIG.storeUrl) {
    store.href = CONFIG.storeUrl;
    store.textContent = t("price.storeBuy");
    store.removeAttribute("aria-disabled");
  } else {
    store.setAttribute("aria-disabled", "true");
    store.textContent = t("price.store");
  }
}
$("#storeBtn").addEventListener("click", e => { if (!CONFIG.storeUrl) e.preventDefault(); });

// ---- scroll reveal, nav, hover effects ------------------------------------------------------
const io = new IntersectionObserver(entries => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
$$(".reveal").forEach(el => io.observe(el));

let lastY = scrollY;
addEventListener("scroll", () => {
  const y = scrollY;
  $("#nav").classList.toggle("hide", y > lastY && y > 300);
  lastY = y;
}, { passive: true });

$$(".glow").forEach(el => el.addEventListener("pointermove", e => {
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}));
if (!reduced) $$(".magnetic").forEach(el => {
  el.addEventListener("pointermove", e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.3}px`);
  });
  el.addEventListener("pointerleave", () => { el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); });
});

// ---- accent colors (the eight macOS accents, as in the app) ----------------------------------
const ACCENTS = [["#0a84ff", "Azul", "Blue"], ["#bf5af2", "Morado", "Purple"], ["#ff375f", "Rosa", "Pink"], ["#ff453a", "Rojo", "Red"],
  ["#ff9f0a", "Naranja", "Orange"], ["#e6b800", "Amarillo", "Yellow"], ["#30b050", "Verde", "Green"], ["#8e8e93", "Grafito", "Graphite"]];
function setAccent(c) {
  document.documentElement.style.setProperty("--accent", c);
  $$(".accent").forEach(b => b.setAttribute("aria-checked", String(b.dataset.c === c)));
}
ACCENTS.forEach(([c, es, en]) => {
  const b = document.createElement("button");
  b.className = "accent"; b.type = "button"; b.dataset.c = c;
  b.style.setProperty("--c", c);
  b.setAttribute("role", "radio");
  b.setAttribute("aria-label", pick(es, en));
  b.addEventListener("click", () => setAccent(c));
  $("#accents").append(b);
});
setAccent(ACCENTS[0][0]);

// ---- feature tiles ----------------------------------------------------------------------------
function fillActions() {
  const items = lang === "en"
    ? ["Lock this PC", "Empty Recycle Bin", "Take a screenshot", "New Word document", "Search YouTube", "Open Calculator", "Task Manager", "Notepad", "Windows Settings", "File Explorer"]
    : ["Bloquear el equipo", "Vaciar la papelera", "Captura de pantalla", "Nuevo documento de Word", "Buscar en YouTube", "Abrir la Calculadora", "Administrador de tareas", "Bloc de notas", "Configuración de Windows", "Explorador de archivos"];
  const colors = ["#0a84ff", "#ff453a", "#30d158", "#5e5ce6", "#ff375f", "#ff9f0a", "#64d2ff", "#ffd60a", "#bf5af2", "#5ac8fa"];
  const html = items.map((s, i) => `<span class="chip" style="--c:${colors[i]}"><i></i>${s}</span>`).join("");
  $("#actionsTrack").innerHTML = html + html; // twice, for a seamless loop
}

// Semantic-search tile: types a vague query, then the matching file appears.
async function typerLoop(el) {
  const hit = $(".mini-hit", el.closest(".tile"));
  for (;;) {
    const q = pick("factura de luz marzo", "electricity bill march");
    for (let i = 1; i <= q.length; i++) { el.textContent = q.slice(0, i); await sleep(70); }
    await sleep(350); hit.classList.add("show");
    await sleep(2600); hit.classList.remove("show");
    await sleep(400);
    for (let i = q.length; i >= 0; i--) { el.textContent = q.slice(0, i); await sleep(22); }
    await sleep(500);
  }
}

// Conversion tile: cycles through a few conversions, counting up the result.
async function convLoop() {
  const pairs = [[10, "USD", 184.64, "MXN", 2], [5, "km", 3.11, "mi", 2], [30, "°C", 86, "°F", 0], [2, "lb", 0.91, "kg", 2]];
  const from = $("#convFrom"), to = $("#convTo");
  for (let i = 0; ; i = (i + 1) % pairs.length) {
    const [a, ua, b, ub, dec] = pairs[i];
    from.textContent = `${a} ${ua}`;
    const t0 = performance.now(), dur = 900;
    await new Promise(done => {
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4);
        to.textContent = `${(b * e).toFixed(dec)} ${ub}`;
        p < 1 ? requestAnimationFrame(tick) : done();
      };
      requestAnimationFrame(tick);
    });
    await sleep(2200);
  }
}

// Grid/list tile: six items that rearrange between a grid and rows.
const layoutDemo = (() => {
  const box = $("#layoutDemo");
  const cols = [["#5ac8fa", "#0a84ff"], ["#ffd60a", "#ff9f0a"], ["#30d158", "#248a3d"], ["#ff375f", "#bf1a3c"], ["#bf5af2", "#5e5ce6"], ["#8e8e93", "#48484a"]];
  const items = cols.map(([a, b]) => { const s = document.createElement("span"); s.style.setProperty("--c1", a); s.style.setProperty("--c2", b); box.append(s); return s; });
  let grid = true;
  const place = () => items.forEach((s, i) => {
    if (grid) { s.style.width = "68px"; s.style.height = "64px"; s.style.borderRadius = "16px"; s.style.transform = `translate(${(i % 3) * 86}px, ${Math.floor(i / 3) * 84}px)`; }
    else { s.style.width = "240px"; s.style.height = "20px"; s.style.borderRadius = "7px"; s.style.transform = `translate(0, ${i * 26}px)`; }
  });
  place();
  return { refresh: place, toggle() { grid = !grid; place(); } };
})();

// ---- the live demo: liquid-glass bar + results card ------------------------------------------
// Port of the app's GooBar.cs / Spring.cs: SwiftUI-style springs and metaball necks.
class Spring {
  constructor(duration, bounce) { this.d = duration; this.b = bounce; }
  step(s, dt) {
    const k = (2 * Math.PI / this.d) ** 2, c = 4 * Math.PI * (1 - this.b) / this.d;
    for (let left = dt; left > 0; left -= 1 / 480) {
      const h = Math.min(left, 1 / 480);
      s.v += (-k * (s.x - s.t) - c * s.v) * h;
      s.x += s.v * h;
    }
  }
}
class SpringValue {
  constructor(x, eps = 0.001) { this.x = this.t = x; this.v = 0; this.delay = 0; this.eps = eps; this.sp = new Spring(0.35, 0); }
  set(x) { this.x = this.t = x; this.v = 0; this.delay = 0; }
  to(t, sp, delay = 0) { this.t = t; this.sp = sp; this.delay = delay; }
  get moving() { return this.delay > 0 || Math.abs(this.x - this.t) > this.eps || Math.abs(this.v) > this.eps * 10; }
  step(dt) {
    if (this.delay > 0) { this.delay -= dt; if (this.delay > 0) return true; dt = -this.delay; this.delay = 0; }
    this.sp.step(this, dt);
    if (this.moving) return true;
    this.x = this.t; this.v = 0; return false;
  }
}
class Animator {
  constructor(values, frame) { this.values = values; this.frame = frame; this.running = false; }
  start() {
    if (this.running) return;
    this.running = true;
    let last = performance.now();
    const tick = now => {
      const dt = Math.min(1 / 30, (now - last) / 1000); last = now;
      let moving = false;
      for (const v of this.values) moving = v.step(dt) || moving;
      this.frame();
      if (moving) requestAnimationFrame(tick); else this.running = false;
    };
    requestAnimationFrame(tick);
  }
}

const ICON = {
  search: '<svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L20 20"/></svg>',
  apps: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/></svg>',
  files: '<svg viewBox="0 0 24 24"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.2h7a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>',
  actions: '<svg viewBox="0 0 24 24"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/></svg>',
  clip: '<svg viewBox="0 0 24 24"><rect x="6" y="5" width="12" height="16" rx="2.5"/><path d="M9.5 5V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1"/></svg>',
};
const APPS = [
  ["Notas", "Notes", "#ffd60a", "#ff9f0a", '<path d="M7 7h10M7 11h10M7 15h6"/>'],
  ["Calculadora", "Calculator", "#8e8e93", "#3a3a3c", '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 8h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'],
  ["Calendario", "Calendar", "#ff6b6b", "#e0352f", '<rect x="4.5" y="6" width="15" height="13.5" rx="2.5"/><path d="M4.5 10h15M9 3.8v3.6M15 3.8v3.6"/>'],
  ["Fotos", "Photos", "#ffb340", "#ff2d55", '<circle cx="12" cy="12" r="3.2"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1"/>'],
  ["Música", "Music", "#ff375f", "#bf1a3c", '<path d="M9 17V6l10-2v11"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="15" r="2"/>'],
  ["Correo", "Mail", "#5ac8fa", "#0a84ff", '<rect x="4" y="6" width="16" height="12" rx="2.5"/><path d="M4.5 7l7.5 6 7.5-6"/>'],
  ["Mapas", "Maps", "#34c759", "#0f9d58", '<path d="M12 21s6-5.6 6-10.5a6 6 0 0 0-12 0C6 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>'],
  ["Navegador", "Browser", "#64d2ff", "#0071e3", '<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c2.5 2.7 2.5 13.3 0 16M12 4c-2.5 2.7-2.5 13.3 0 16"/>'],
  ["Terminal", "Terminal", "#48484a", "#1c1c1e", '<path d="M7 9l3 3-3 3M12.5 15H17"/>'],
  ["Código", "Code", "#5e5ce6", "#3634a3", '<path d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>'],
  ["Chat", "Chat", "#30d158", "#248a3d", '<path d="M5 17.5V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8.5z"/>'],
  ["Ajustes", "Settings", "#98989d", "#636366", '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2L18 18M6 18l1.8-1.8M16.2 7.8L18 6"/>'],
];

// Phones get a narrower demo (scaled less, so it stays legible) with a 4-column grid.
const DEMO_W = innerWidth < 620 ? 480 : 760;

const Demo = (() => {
  const W = DEMO_W, H = 52, R = 26, GAP = 10, N = 4;
  $("#demoScale").style.setProperty("--dw", `${W}px`);
  $("#demoScale").style.setProperty("--cols", W < 760 ? "4" : "6");
  ["#gooShadowSvg", "#gooRimSvg"].forEach(s => $(s).setAttribute("width", W));
  const glass = $("#gooGlass"), rim = $("#gooRim"), shadow = $("#gooShadow");
  const capsule = $("#capsule"), lead = $("#lead"), qText = $("#qText"), qPh = $("#qPh");
  const card = $("#card"), cardIn = $("#cardIn");
  const drops = ["apps", "files", "actions", "clip"].map(k => {
    const d = document.createElement("span");
    d.className = "drop"; d.innerHTML = `<span class="ic">${ICON[k]}</span>`;
    $("#drops").append(d); return d;
  });
  lead.innerHTML = ICON.search;

  const cap = new SpringValue(1), out = Array.from({ length: N }, () => new SpringValue(0)), cardH = new SpringValue(0, 0.3);
  let merged = true;

  const f = n => n.toFixed(2);
  const capsulePath = w => `M${R},0 L${f(w - R)},0 A${R},${R} 0 0 1 ${f(w - R)},${H} L${R},${H} A${R},${R} 0 0 1 ${R},0 Z`;
  const circlePath = (cx, cy, r) => `M${f(cx + r)},${cy} A${f(r)},${f(r)} 0 0 1 ${f(cx - r)},${cy} A${f(r)},${f(r)} 0 0 1 ${f(cx + r)},${cy} Z`;
  const at = (c, a, r) => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const pt = p => `${f(p[0])},${f(p[1])}`;
  const cross = (a, b) => a[0] * b[1] - b[0] * a[1];

  // Metaball bridge between two circles (Varun Vachhar's construction), wound clockwise.
  function neck(c1, r1, c2, r2, v, handle = 2.4) {
    const d = dist(c1, c2);
    if (r1 <= 0 || r2 <= 0 || d <= Math.abs(r1 - r2) || v <= 0.01) return "";
    let u1 = 0, u2 = 0;
    if (d < r1 + r2) {
      u1 = Math.acos(Math.max(-1, Math.min(1, (r1 * r1 + d * d - r2 * r2) / (2 * r1 * d))));
      u2 = Math.acos(Math.max(-1, Math.min(1, (r2 * r2 + d * d - r1 * r1) / (2 * r2 * d))));
    }
    const between = Math.atan2(c2[1] - c1[1], c2[0] - c1[0]);
    const spread = Math.acos(Math.max(-1, Math.min(1, (r1 - r2) / d)));
    const a1 = between + u1 + (spread - u1) * v, a2 = between - u1 - (spread - u1) * v;
    const a3 = between + Math.PI - u2 - (Math.PI - u2 - spread) * v, a4 = between - Math.PI + u2 + (Math.PI - u2 - spread) * v;
    const p1 = at(c1, a1, r1), p2 = at(c1, a2, r1), p3 = at(c2, a3, r2), p4 = at(c2, a4, r2);
    const total = r1 + r2, d2 = Math.min(v * handle, dist(p1, p3) / total) * Math.min(1, d * 2 / total);
    const h1 = at(p1, a1 - Math.PI / 2, r1 * d2), h2 = at(p2, a2 + Math.PI / 2, r1 * d2);
    const h3 = at(p3, a3 + Math.PI / 2, r2 * d2), h4 = at(p4, a4 - Math.PI / 2, r2 * d2);
    const large = d > r1 ? 1 : 0;
    const area = cross(p1, p3) + cross(p3, p4) + cross(p4, p2) + cross(p2, p1);
    return area > 0
      ? `M${pt(p1)} C${pt(h1)} ${pt(h3)} ${pt(p3)} A${f(r2)},${f(r2)} 0 ${large} 0 ${pt(p4)} C${pt(h4)} ${pt(h2)} ${pt(p2)} Z`
      : `M${pt(p2)} C${pt(h2)} ${pt(h4)} ${pt(p4)} A${f(r2)},${f(r2)} 0 ${large} 1 ${pt(p3)} C${pt(h3)} ${pt(h1)} ${pt(p1)} Z`;
  }

  function draw() {
    const restW = W - N * (2 * R + GAP), w = restW + (W - restW) * cap.x, capEnd = [w - R, H / 2];
    const blobs = out.map((o, i) => {
      const s = o.x, restX = restW + GAP + R + i * (2 * R + GAP);
      const c = [restW - R + (restX - (restW - R)) * s, H / 2], r = R * (0.55 + 0.45 * Math.max(0, Math.min(1, s)));
      const inside = c[0] <= capEnd[0] + 0.5 || c[0] - capEnd[0] <= R - r;
      return { c, r, s, shown: !inside && r > 1 };
    });
    const necks = [], joined = new Array(N + 1).fill(false);
    const join = (a, c1, r1, b, c2, r2, s) => {
      const reach = 6 + 30 * Math.pow(Math.max(0, Math.min(1, 1 - s)), 0.7);
      const gap = dist(c1, c2) - r1 - r2;
      if (gap >= reach) return;
      joined[a] = joined[b] = true;
      if (gap > -Math.min(r1, r2)) necks.push(neck(c1, r1, c2, r2, 0.6 * Math.max(0, Math.min(1, 1 - gap / reach))));
    };
    blobs.forEach((b, i) => {
      if (!b.shown) return;
      join(0, capEnd, R, i + 1, b.c, b.r, b.s);
      const nb = blobs[i + 1];
      if (nb?.shown) join(i + 1, b.c, b.r, i + 2, nb.c, nb.r, Math.min(b.s, nb.s));
    });
    let full = capsulePath(w), edge = joined[0] ? "" : capsulePath(w);
    blobs.forEach((b, i) => {
      if (!b.shown) return;
      const c = circlePath(b.c[0], b.c[1], b.r);
      full += c; if (!joined[i + 1]) edge += c;
    });
    full += necks.join("");
    glass.style.clipPath = `path('${full}')`;
    shadow.setAttribute("d", full);
    rim.setAttribute("d", edge);
    capsule.style.width = `${Math.max(w, 2 * R)}px`;
    drops.forEach((d, i) => {
      const b = blobs[i];
      d.style.transform = `translateX(${f(b.c[0] - R)}px) scale(${f(b.r / R)})`;
      d.style.opacity = b.shown ? Math.max(0, Math.min(1, (b.s - 0.55) / 0.4)) : 0;
    });
    card.style.height = `${Math.max(0, cardH.x)}px`;
  }
  const anim = new Animator([cap, ...out, cardH], draw);

  function setMerged(m, animate = true) {
    merged = m;
    if (!animate) { cap.set(m ? 1 : 0); out.forEach(o => o.set(m ? 0 : 1)); draw(); return; }
    if (m) { cap.to(1, new Spring(0.38, 0)); out.forEach((o, i) => o.to(0, new Spring(0.34, 0), i * 0.03)); }
    else { cap.to(0, new Spring(0.55, 0.12)); out.forEach((o, i) => o.to(1, new Spring(0.66, 0.3), (N - 1 - i) * 0.05)); }
    anim.start();
  }

  function setQuery(s) {
    qText.textContent = s;
    qPh.style.display = s ? "none" : "";
  }
  function setScope(scope) {
    lead.innerHTML = scope ? ICON.apps : ICON.search;
    lead.classList.toggle("scoped", !!scope);
    qPh.textContent = scope ? pick("Buscar en aplicaciones", "Search Applications") : t("demo.ph");
  }
  function openCard(html) {
    cardIn.innerHTML = html;
    card.classList.add("open");
    const target = cardIn.offsetHeight;
    if (cardH.x < 1) cardH.set(Math.min(target, 60));
    cardH.to(target, target >= cardH.x ? new Spring(0.42, 0.1) : new Spring(0.32, 0));
    anim.start();
  }
  function closeCard() { card.classList.remove("open"); cardH.to(0, new Spring(0.3, 0)); anim.start(); }

  setMerged(true, false);
  return { setMerged, setQuery, setScope, openCard, closeCard, drops, get merged() { return merged; } };
})();

// Result sets for the demo
const row = (cls, label, title, sub, i, sel) =>
  `<div class="row${sel ? " sel" : ""}" style="--i:${i}"><span class="fi ${cls}">${label}</span><span><b>${title}</b>${sub ? `<small>${sub}</small>` : ""}</span></div>`;
const sec = s => `<div class="sec">${s}</div>`;
const RESULTS = {
  report: () => pick(
    sec("Mejor resultado") + row("doc", "DOC", "Informe anual 2026.docx", "~/Documentos/Trabajo", 0, true) +
    sec("Documentos") + row("xls", "XLS", "informe_ventas_Q3.xlsx", "~/Documentos/Ventas", 1) + row("pdf", "PDF", "Informe de gastos.pdf", "~/Descargas", 2) +
    sec("Carpetas") + row("dir", "", "Informes", "~/Documentos", 3),
    sec("Top hit") + row("doc", "DOC", "Annual report 2026.docx", "~/Documents/Work", 0, true) +
    sec("Documents") + row("xls", "XLS", "sales_report_Q3.xlsx", "~/Documents/Sales", 1) + row("pdf", "PDF", "Expense report.pdf", "~/Downloads", 2) +
    sec("Folders") + row("dir", "", "Reports", "~/Documents", 3)),
  conv: () => sec(pick("Conversión", "Conversion")) + row("cv", "⇄", "= 184.64 MXN", pick("10 usd a mxn · ↵ copia el resultado", "10 usd to mxn · ↵ copies the result"), 0, true),
  bill: () => pick(
    sec("Mejor resultado") + row("pdf", "PDF", "recibo_cfe_03.pdf", "«…total a pagar · periodo marzo 2026…»", 0, true) +
    sec("Documentos") + row("pdf", "PDF", "recibo_cfe_02.pdf", "~/Documentos/Recibos", 1) + row("xls", "XLS", "gastos_casa_2026.xlsx", "~/Documentos", 2),
    sec("Top hit") + row("pdf", "PDF", "power_bill_03.pdf", "“…amount due · billing period March 2026…”", 0, true) +
    sec("Documents") + row("pdf", "PDF", "power_bill_02.pdf", "~/Documents/Bills", 1) + row("xls", "XLS", "home_expenses_2026.xlsx", "~/Documents", 2)),
  apps: filter => {
    const list = APPS.filter(a => !filter || a[lang === "en" ? 1 : 0].toLowerCase().startsWith(filter));
    return sec(pick("Aplicaciones", "Applications")) + `<div class="grid">${list.map((a, i) =>
      `<div class="app${i === 0 ? " sel" : ""}" style="--i:${i}"><span class="ai" style="background:linear-gradient(160deg,${a[2]},${a[3]})"><svg viewBox="0 0 24 24">${a[4]}</svg></span>${a[lang === "en" ? 1 : 0]}</div>`).join("")}</div>`;
  },
};

const caption = (() => {
  const box = $(".stage-caption"), key = $("#capKey"), text = $("#capText");
  return async (k, es, en) => {
    box.classList.add("fade");
    await sleep(250);
    key.textContent = k; text.textContent = pick(es, en);
    box.classList.remove("fade");
    key.classList.add("press"); await sleep(180); key.classList.remove("press");
  };
})();

let demoVisible = true;
new IntersectionObserver(([e]) => { demoVisible = e.isIntersecting; }, { threshold: 0.05 }).observe($("#stage"));
const wait = async ms => { await sleep(ms); while (!demoVisible || document.hidden) await sleep(300); };

async function type(text) {
  for (let i = 1; i <= text.length; i++) {
    Demo.setQuery(text.slice(0, i));
    if (i === 1 && !Demo.merged) Demo.setMerged(true);
    await wait(75 + Math.random() * 55);
  }
}
async function erase(text) {
  for (let i = text.length - 1; i >= 0; i--) { Demo.setQuery(text.slice(0, i)); await wait(26); }
}

async function demoLoop() {
  for (;;) try {
    Demo.setScope(null); Demo.setQuery(""); Demo.setMerged(true, false); Demo.closeCard();
    await caption("Alt ␣", "Abre WinSpotlight desde cualquier lugar", "Open WinSpotlight from anywhere");
    await wait(1500);
    await caption("Esc", "Los botones se desprenden como gotas", "The buttons bud off like drops");
    Demo.setMerged(false);
    await wait(2000);

    await caption("A–Z", "Al escribir, se funden con la barra", "Type and they melt back into the bar");
    const q1 = pick("informe", "report");
    await type(q1); Demo.openCard(RESULTS.report());
    await wait(2600);
    await caption("Esc", "Borra y vuelven a salir", "Clear it and they come back");
    await erase(q1); Demo.closeCard(); Demo.setMerged(false);
    await wait(1600);

    await caption(pick("Clic", "Click"), "Aplicaciones, en cuadrícula", "Applications, as a grid");
    const apps = Demo.drops[0];
    apps.classList.add("active"); await wait(380);
    apps.classList.remove("active");
    Demo.setScope("apps"); Demo.setMerged(true); Demo.openCard(RESULTS.apps(""));
    await wait(2600);
    await caption("A–Z", "Filtra mientras escribes", "Filter as you type");
    await type("cal"); Demo.openCard(RESULTS.apps("cal"));
    await wait(2200);
    await caption("Esc", "Esc vuelve a la búsqueda normal", "Esc goes back to normal search");
    await erase("cal"); Demo.closeCard(); Demo.setScope(null); Demo.setMerged(false);
    await wait(1300);

    await caption("A–Z", "Conversiones al instante", "Instant conversions");
    const q2 = pick("10 usd a mxn", "10 usd to mxn");
    await type(q2); Demo.openCard(RESULTS.conv());
    await wait(2400);
    await erase(q2); Demo.closeCard(); Demo.setMerged(false);
    await wait(1200);

    await caption("A–Z", "Encuentra archivos por lo que dicen", "Find files by what they say");
    const q3 = pick("factura de luz marzo", "electricity bill march");
    await type(q3); Demo.openCard(RESULTS.bill());
    await wait(3000);
    await erase(q3); Demo.closeCard(); Demo.setMerged(false);
    await wait(1400);
  } catch (e) { console.error(e); await sleep(1000); } // never let one hiccup stop the demo
}

// Fit the 760-px demo into the stage
function fitDemo() {
  const stage = $("#stage");
  const s = Math.min(1, (stage.clientWidth - 32) / DEMO_W);
  $("#demoScale").style.setProperty("--s", s.toFixed(4));
}
addEventListener("resize", fitDemo);

// ---- start ----------------------------------------------------------------------------------------
applyLang();
fitDemo();
if (reduced) {
  Demo.setMerged(false, false);
  caption("Alt ␣", "Abre WinSpotlight desde cualquier lugar", "Open WinSpotlight from anywhere");
} else {
  demoLoop();
  convLoop();
  typerLoop($(".typer"));
  setInterval(() => layoutDemo.toggle(), 2600);
}
