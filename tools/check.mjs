// Control de calidad del build: enlaces internos, recursos, H1 único,
// jerarquía de encabezados, alt de imágenes, metadatos SEO y JSON-LD.
//   node tools/check.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DIST = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), "dist");
const pages = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".html")) pages.push(p);
  }
})(DIST);

const exists = (url) => {
  const clean = decodeURIComponent(url.split("#")[0].split("?")[0]);
  if (!clean) return true;
  const p = path.join(DIST, clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
};

let problems = 0;
const warn = (page, msg) => { problems++; console.log(`  ✗ ${path.relative(DIST, page)} — ${msg}`); };

for (const page of pages) {
  const html = fs.readFileSync(page, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  // enlaces y recursos internos
  for (const m of html.matchAll(/\s(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) warn(page, `recurso inexistente: ${m[1]}`);
  for (const m of html.matchAll(/srcset="([^"]+)"/g))
    for (const part of m[1].split(",")) { const u = part.trim().split(" ")[0]; if (u.startsWith("/") && !exists(u)) warn(page, `srcset inexistente: ${u}`); }
  for (const m of html.matchAll(/data-(?:lightbox|preview)="(\/[^"]+)"/g)) if (!exists(m[1])) warn(page, `data-* inexistente: ${m[1]}`);
  for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(m[1])) warn(page, `ancla sin destino: #${m[1]}`);
  for (const m of html.matchAll(/href="\/([a-z]+)\/#([^"]+)"/g)) {
    const target = fs.readFileSync(path.join(DIST, m[1], "index.html"), "utf8");
    if (!target.includes(`id="${m[2]}"`)) warn(page, `ancla externa sin destino: /${m[1]}/#${m[2]}`);
  }
  // botones/enlaces vacíos
  for (const m of html.matchAll(/<a\s[^>]*href="(#?)"/g)) warn(page, "enlace sin destino");
  // encabezados
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) warn(page, `${h1} etiquetas <h1>`);
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) warn(page, `salto de encabezado h${levels[i - 1]} → h${l}`); });
  // imágenes
  for (const m of html.matchAll(/<img\s[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) warn(page, `img sin alt: ${m[0].slice(0, 80)}`);
    if (!/data-lightbox-img/.test(m[0]) && (!/\swidth="/.test(m[0]) || !/\sheight="/.test(m[0]))) warn(page, `img sin width/height: ${m[0].slice(0, 80)}`);
  }
  // SEO
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || "";
  const desc = (html.match(/name="description" content="([^"]*)"/) || [])[1] || "";
  if (title.length < 20 || title.length > 75) warn(page, `title de ${title.length} caracteres`);
  if (desc.length < 70 || desc.length > 170) warn(page, `description de ${desc.length} caracteres`);
  if (!/rel="canonical"/.test(html)) warn(page, "sin canonical");
  if (!/property="og:image"/.test(html)) warn(page, "sin og:image");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { warn(page, "JSON-LD inválido"); }
  }
  if (/type="module"/.test(html)) warn(page, "script type=module");
  console.log(`  ${path.relative(DIST, page).padEnd(24)} title ${String(title.length).padStart(2)} · desc ${String(desc.length).padStart(3)} · h${levels.join(",h")}`);
}
console.log(problems ? `\n${problems} problema(s)` : "\nSin problemas.");
process.exit(problems ? 1 : 0);
