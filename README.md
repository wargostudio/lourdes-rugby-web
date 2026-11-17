# Lourdes Rugby Club — sitio web

Sitio estático (HTML + CSS + JS vanilla, sin dependencias en producción) para lourdesrugbyclub.com.
Contenido y fotos tomados de la web anterior (WordPress). Diseño y desarrollo: Wargo Studio.

## Estructura

```
src/
  data/site.mjs        ← TODO el contenido: datos, valores, programas, pilares, galería (con textos alternativos)
  pages/*.mjs          ← una página por archivo (inicio, nosotros, nuestro-trabajo, impacto, galeria, colaborar, contacto, privacidad, 404)
  partials/            ← helpers (img responsive, bloques compartidos) e íconos SVG
  assets/              ← css, js, fuentes autoalojadas, GSAP local, imágenes WebP generadas
  static/              ← .htaccess, manifest, favicon y contacto/enviar.php (se copian tal cual)
originals/             ← fotos originales descargadas de la web anterior
tools/
  build.mjs            ← node tools/build.mjs → genera dist/ (incluye sitemap.xml y robots.txt)
  check.mjs            ← control de calidad: enlaces, recursos, H1, encabezados, alt, SEO, JSON-LD
  images.py            ← pipeline WebP responsive + íconos + imagen Open Graph (requiere Pillow)
  preview-sync.sh      ← compila y copia dist/ a la carpeta de vista previa (.preview-dir)
  router.php           ← router para `php -S` (sirve 404.html como en producción)
```

## Comandos

```bash
node tools/build.mjs && node tools/check.mjs
```

Para regenerar imágenes (después de cambiar `originals/` o `tools/images.py`): `python3 tools/images.py` con Pillow instalado.

## Publicar en Hostinger

1. Compilar (`node tools/build.mjs`). El formulario está en modo WhatsApp (`contactMode` en `src/data/site.mjs`); para pasarlo a email ver PENDIENTES.md.
2. Hacer backup del WordPress actual y vaciar `public_html`.
3. Subir **el contenido** de `dist/` (incluido `.htaccess`, que es un archivo oculto).
4. Probar: `/`, `/mision-e-historia/` (debe redirigir a `/nosotros/`), el formulario y el 404.

## Notas técnicas

- Animaciones: GSAP 3.15 + ScrollTrigger + SplitText + DrawSVG (archivos locales, sin CDN).
- Sin JavaScript el sitio se lee completo; los revelados tienen red de seguridad a los 6 s.
- `prefers-reduced-motion` solo apaga lo intrusivo (marquesinas, carrusel automático, sticker).
- Cache busting `?v=AAAAMMDD` automático en cada build.
