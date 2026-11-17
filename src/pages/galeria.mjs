import { site, gallery, galleryCats } from "../data/site.mjs";
import { img, icon, ext, imgUrl, imgSize, pageHero, ctaBand } from "../partials/helpers.mjs";

export default () => ({
  key: "galeria",
  pathname: "/galeria/",
  priority: 0.7,
  title: "Galería de fotos — Lourdes Rugby Club, Argüello Lourdes",
  description:
    "Fotos de entrenamientos, encuentros y momentos de comunidad de Lourdes Rugby Club en el Barrio Argüello Lourdes, Córdoba. Cada imagen cuenta una historia real.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: "Galería de Lourdes Rugby Club",
      image: gallery.map((g) => ({ "@type": "ImageObject", contentUrl: `${site.url}${imgUrl(g.slug)}`, description: g.alt })),
    },
  ],
  body: `
${pageHero({
  eyebrow: "Galería",
  title: "Momentos que nos definen",
  lead: "Cada entrenamiento, cada encuentro y cada sonrisa es parte de la historia que construimos juntos en el barrio.",
})}

<section class="section section--tight gallery" aria-labelledby="gallery-title">
  <div class="container">
    <h2 class="sr-only" id="gallery-title">Fotos del club</h2>
    <div class="filters" role="group" aria-label="Filtrar fotos por categoría" data-filters>
      ${galleryCats
        .map(
          (c, i) =>
            `<button type="button" class="filter" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}<span class="filter__count">${
              c.id === "todas" ? gallery.length : gallery.filter((g) => g.cat === c.id).length
            }</span></button>`
        )
        .join("")}
    </div>
    <p class="sr-only" aria-live="polite" data-filter-status></p>
    <ul class="masonry" role="list" data-gallery>
      ${gallery
        .map((g, i) => {
          const m = imgSize(g.slug);
          return `<li class="masonry__item" data-cat="${g.cat}">
        <button type="button" class="masonry__btn" data-lightbox="${imgUrl(g.slug)}" data-w="${m.widths.at(-1)}" data-h="${Math.round((m.h * m.widths.at(-1)) / m.w)}" data-index="${i}">
          ${img(g.slug, g.alt, { sizes: "(min-width: 1100px) 25vw, (min-width: 700px) 33vw, 50vw" })}
          <span class="masonry__zoom" aria-hidden="true">${icon("expand")}</span>
          <span class="sr-only">Ampliar foto</span>
        </button>
      </li>`;
        })
        .join("")}
    </ul>
    <div class="gallery__more" data-reveal>
      <p class="hand">¿Querés ver más?</p>
      <p>Las novedades, los encuentros y el día a día del club se publican en Instagram.</p>
      ${ext(site.social[0].url, `${icon("instagram")}Seguinos en ${site.social[0].handle}`, "btn btn--navy")}
    </div>
  </div>
</section>

<div class="lightbox" data-lightbox-root hidden role="dialog" aria-modal="true" aria-label="Foto ampliada">
  <button type="button" class="lightbox__close" data-lb-close><span class="sr-only">Cerrar</span>${icon("close")}</button>
  <button type="button" class="lightbox__nav lightbox__nav--prev" data-lb-prev><span class="sr-only">Foto anterior</span>${icon("chev-left")}</button>
  <figure class="lightbox__figure">
    <img data-lightbox-img alt="">
    <figcaption data-lb-caption></figcaption>
  </figure>
  <button type="button" class="lightbox__nav lightbox__nav--next" data-lb-next><span class="sr-only">Foto siguiente</span>${icon("chev-right")}</button>
</div>

${ctaBand()}
`,
});
