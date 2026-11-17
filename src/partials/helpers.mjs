// Helpers y bloques compartidos por el build y las páginas.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { site, whatsappUrl, alt } from "../data/site.mjs";
import { icon } from "./icons.mjs";

const SRC = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifest = JSON.parse(fs.readFileSync(path.join(SRC, "assets/img/manifest.json"), "utf8"));

export const VERSION = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // ?v=YYYYMMDD

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** <img> responsive (WebP + srcset + width/height para evitar CLS). alt por defecto: el de la galería. */
export function img(slug, altText, { sizes = "100vw", cls = "", eager = false, attrs = "" } = {}) {
  const m = manifest[slug];
  if (!m) throw new Error(`Imagen inexistente: ${slug}`);
  const a = altText ?? alt[slug];
  if (a === undefined) throw new Error(`Falta texto alternativo: ${slug}`);
  const largest = m.widths[m.widths.length - 1];
  const h = Math.round((m.h * largest) / m.w);
  return `<img src="/assets/img/${slug}-${largest}.webp" srcset="${srcsetOf(slug)}" sizes="${sizes}" width="${largest}" height="${h}" alt="${esc(a)}"${cls ? ` class="${cls}"` : ""} ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async"${attrs ? " " + attrs : ""}>`;
}

export const srcsetOf = (slug) => manifest[slug].widths.map((w) => `/assets/img/${slug}-${w}.webp ${w}w`).join(", ");

export const imgUrl = (slug, w) => {
  const m = manifest[slug];
  if (!m) throw new Error(`Imagen inexistente: ${slug}`);
  const width = w ? m.widths.find((x) => x >= w) || m.widths.at(-1) : m.widths.at(-1);
  return `/assets/img/${slug}-${width}.webp`;
};

export const imgSize = (slug) => manifest[slug];

/** Enlace externo seguro. */
export const ext = (href, inner, cls = "", extra = "") =>
  `<a href="${href}" target="_blank" rel="noopener"${cls ? ` class="${cls}"` : ""}${extra ? " " + extra : ""}>${inner}<span class="sr-only"> (se abre en una pestaña nueva)</span></a>`;

/**
 * Pizarra táctica: trazos de tiza dibujados a mano (X, O, flechas punteadas).
 * Elemento gráfico del universo del rugby, decorativo y animado con DrawSVG.
 */
export function chalk(variant = "a", cls = "") {
  const v = {
    a: `<path class="chalk__dash" d="M40 230 C 120 140, 230 120, 330 150 S 470 230, 540 120"/>
        <path d="M528 108 l14 10 -4 -18"/>
        <path d="M62 78 l30 30 M92 78 l-30 30"/>
        <path d="M180 60 l26 26 M206 60 l-26 26"/>
        <circle cx="300" cy="62" r="16"/>
        <circle cx="420" cy="230" r="16"/>
        <path class="chalk__dash" d="M196 92 C 210 160, 280 190, 404 226"/>`,
    b: `<path class="chalk__dash" d="M30 60 C 160 40, 260 120, 300 220"/>
        <path d="M290 206 l10 16 6 -18"/>
        <path d="M60 180 l26 26 M86 180 l-26 26"/>
        <circle cx="200" cy="200" r="15"/>
        <path d="M330 70 c 30 -22, 70 -22, 100 0 c -30 22, -70 22, -100 0 Z"/>`,
  }[variant];
  return `<svg class="chalk${cls ? " " + cls : ""}" viewBox="0 0 580 260" fill="none" aria-hidden="true" focusable="false" data-chalk>${v}</svg>`;
}

/** Encabezado de página interior. */
export function pageHero({ eyebrow, title, lead, image, imageAlt, note }) {
  return `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div class="page-hero__text">
      <p class="eyebrow" data-reveal>${eyebrow}</p>
      <h1 class="display page-hero__title" data-split>${title}</h1>
      ${lead ? `<p class="lead page-hero__lead" data-reveal>${lead}</p>` : ""}
    </div>
    ${
      image
        ? `<figure class="page-hero__media">
      <div class="page-hero__frame" data-reveal="clip">${img(image, imageAlt, { sizes: "(min-width: 900px) 42vw, 92vw", eager: true })}</div>
      ${note ? `<figcaption class="hand page-hero__note" data-reveal>${note}</figcaption>` : ""}
    </figure>`
        : ""
    }
  </div>
  ${chalk("b", "page-hero__chalk")}
</section>`;
}

/** Banda de llamada a colaborar, reutilizada al pie de cada página. */
export function ctaBand({ title = "Ayudanos a seguir transformando vidas", text } = {}) {
  return `
<section class="cta-band" aria-labelledby="cta-band-title">
  <div class="cta-band__bg" aria-hidden="true">${img("banda-entrenamiento", "", { sizes: "100vw" })}</div>
  <div class="container cta-band__inner">
    <p class="eyebrow eyebrow--gold" data-reveal>Sumate al equipo</p>
    <h2 class="display cta-band__title" id="cta-band-title" data-split>${title}</h2>
    <p class="cta-band__text" data-reveal>${
      text ||
      "Cada donación se convierte directamente en más pelotas, más indumentaria, más viajes a encuentros y más horas de entrenamiento para los chicos del barrio. No hace falta donar grandes sumas: la constancia y el compromiso de muchos hace la diferencia."
    }</p>
    <div class="btn-row" data-reveal>
      ${ext(site.donateUrl, `${icon("heart")}Donar mensualmente`, "btn btn--gold", "data-magnet")}
      <a class="btn btn--ghost-light" href="/colaborar/">Otras formas de colaborar${icon("arrow")}</a>
    </div>
  </div>
</section>`;
}

export { icon, whatsappUrl, site };
