// ---------------------------------------------------------------------------
// Build del sitio de Lourdes Rugby Club — Node puro, sin dependencias.
//   node tools/build.mjs        → genera /dist listo para subir al hosting
// ---------------------------------------------------------------------------
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, nav, whatsappUrl } from "../src/data/site.mjs";
import { icon, sprite } from "../src/partials/icons.mjs";
import { esc, ext, VERSION } from "../src/partials/helpers.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, "src");
const DIST = path.join(ROOT, "dist");
const today = new Date();

// ---------- Schema.org ----------
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "@id": `${site.url}/#organizacion`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  sport: "Rugby",
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/icon-512.png`,
  image: `${site.url}/assets/img/og-lourdes.jpg`,
  address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
  areaServed: { "@type": "Place", name: `${site.barrio}, ${site.city}` },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Consultas, voluntariado y donaciones",
    telephone: `+${site.whatsapp}`,
    availableLanguage: "es",
  },
  sameAs: site.social.map((s) => s.url),
};

// ---------- layout ----------
function head({ title, description, pathname, ogImage, schema = [], noindex = false }) {
  const canonical = `${site.url}${pathname}`;
  const og = `${site.url}${ogImage || "/assets/img/og-lourdes.jpg"}`;
  const ld = [orgSchema, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n  ");
  return `<!doctype html>
<html lang="es-AR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
  <meta name="theme-color" content="#0e1f3a">
  <meta name="format-detection" content="telephone=no">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="${site.locale}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Chicos de Lourdes Rugby Club abrazados en la cancha">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${og}">

  <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preload" href="/assets/fonts/big-shoulders-var.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/figtree-var.woff2" as="font" type="font/woff2" crossorigin>
  <script src="/assets/js/boot.js?v=${VERSION}"></script>
  <link rel="stylesheet" href="/assets/css/styles.css?v=${VERSION}">

  <script defer src="/assets/lib/gsap.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/ScrollTrigger.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/SplitText.min.js?v=${VERSION}"></script>
  <script defer src="/assets/lib/DrawSVGPlugin.min.js?v=${VERSION}"></script>
  <script defer src="/assets/js/main.js?v=${VERSION}"></script>
  ${ld}
</head>`;
}

const brand = (cls = "") => `
    <a class="brand ${cls}" href="/" aria-label="${site.name} — Inicio">
      <img class="brand__rose" src="/assets/img/rosa-96.png" width="96" height="96" alt="">
      <span class="brand__word" aria-hidden="true"><span>Lourdes</span><span>Rugby Club</span></span>
    </a>`;

function header(active) {
  const links = nav
    .filter((n) => n.key !== "inicio")
    .map((n) => `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}</a></li>`)
    .join("");
  const mobileLinks = [...nav, { key: "colaborar", label: "Colaborar", href: "/colaborar/" }]
    .map(
      (n, i) =>
        `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}><span class="hand">${String(i + 1).padStart(2, "0")}</span>${n.label}</a></li>`
    )
    .join("");
  return `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="site-header__inner">
    ${brand()}
    <nav class="main-nav" aria-label="Principal">
      <ul>${links}</ul>
    </nav>
    <div class="site-header__cta">
      <a class="btn btn--sm btn--gold" href="/colaborar/"${active === "colaborar" ? ' aria-current="page"' : ""} data-magnet>${icon("heart")}Quiero colaborar</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-movil" data-menu-toggle>
        <span class="sr-only" data-menu-label>Abrir menú</span><span class="menu-toggle__bars" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="menu-movil" data-mobile-menu hidden>
  <nav aria-label="Menú móvil"><ul>${mobileLinks}</ul></nav>
  <div class="mobile-menu__foot">
    ${ext(site.donateUrl, `${icon("heart")}Donar mensualmente`, "btn btn--gold btn--block")}
    ${ext(whatsappUrl(), `${icon("whatsapp")}Escribinos por WhatsApp`, "mobile-menu__line")}
    <div class="mobile-menu__social">${site.social.map((s) => ext(s.url, icon(s.id) + `<span class="sr-only">${s.label}</span>`)).join("")}</div>
  </div>
</div>`;
}

function footer() {
  const year = today.getFullYear();
  return `
<footer class="site-footer">
  <div class="container">
    <div class="site-footer__top">
      <p class="display site-footer__claim">Una cancha,<br>un equipo,<br><span class="text-gold">un futuro.</span></p>
      <div class="btn-row">
        ${ext(site.donateUrl, `${icon("heart")}Donar ahora`, "btn btn--gold")}
        <a class="btn btn--ghost-light" href="/colaborar/#voluntariado">Ser voluntario/a${icon("arrow")}</a>
      </div>
    </div>
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        ${brand("brand--light")}
        <p>${site.tagline}. Rugby, contención y comunidad en el ${site.barrio}, ${site.city}.</p>
      </div>
      <nav class="site-footer__col" aria-label="Secciones del sitio">
        <p class="label">El club</p>
        <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
      </nav>
      <div class="site-footer__col">
        <p class="label">Participá</p>
        <ul>
          <li><a href="/colaborar/#donar">Donar</a></li>
          <li><a href="/colaborar/#voluntariado">Voluntariado</a></li>
          <li><a href="/colaborar/#empresas">Empresas y alianzas</a></li>
          <li><a href="/colaborar/#familias">Sumá a tu hijo o hija</a></li>
        </ul>
      </div>
      <div class="site-footer__col">
        <p class="label">Contacto</p>
        <ul>
          <li>${ext(whatsappUrl(), `${icon("whatsapp")}${site.whatsappDisplay}`)}</li>
          ${site.social.map((s) => `<li>${ext(s.url, `${icon(s.id)}${s.label}`)}</li>`).join("")}
          <li><span>${icon("pin")}${site.barrio}, ${site.city}</span></li>
        </ul>
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${year} ${site.name}. Hecho con orgullo en el barrio.</p>
      <p><a href="/privacidad/">Privacidad</a> · Diseño y desarrollo: <a href="https://wargostudio.com" target="_blank" rel="noopener noreferrer">Wargo Studio</a></p>
    </div>
  </div>
</footer>
${ext(whatsappUrl(), icon("whatsapp"), "wa-float", `aria-label="Escribir a ${site.name} por WhatsApp"`)}`;
}

function render(page) {
  return `${head(page)}
<body class="page-${page.key}">
${sprite}
${header(page.key)}
<main id="contenido" tabindex="-1">
${page.body}
</main>
${footer()}
</body>
</html>
`;
}

// ---------- build ----------
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    if (e.name === ".DS_Store" || e.name === "manifest.json") continue;
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

async function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, "assets"), path.join(DIST, "assets"));
  copyDir(path.join(SRC, "static"), DIST);

  const pageFiles = fs.readdirSync(path.join(SRC, "pages")).filter((f) => f.endsWith(".mjs"));
  const urls = [];
  for (const f of pageFiles) {
    const mod = await import(path.join(SRC, "pages", f));
    const page = mod.default();
    const out = page.pathname === "/" ? "index.html" : page.file || path.join(page.pathname, "index.html");
    fs.mkdirSync(path.dirname(path.join(DIST, out)), { recursive: true });
    fs.writeFileSync(path.join(DIST, out), render(page));
    if (!page.noindex) urls.push({ loc: page.pathname, priority: page.priority ?? 0.7 });
    console.log(`  ✓ ${out}`);
  }

  const lastmod = today.toISOString().slice(0, 10);
  urls.sort((a, b) => b.priority - a.priority);
  fs.writeFileSync(
    path.join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${site.url}${u.loc}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority.toFixed(1)}</priority></url>`).join("\n")}
</urlset>
`
  );
  fs.writeFileSync(
    path.join(DIST, "robots.txt"),
    `User-agent: *
Allow: /
Disallow: /contacto/enviar.php

Sitemap: ${site.url}/sitemap.xml
`
  );
  console.log(`OK — ${pageFiles.length} páginas · v=${VERSION} → dist/`);
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
