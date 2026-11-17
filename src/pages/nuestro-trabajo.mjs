import { site, programs, pillars } from "../data/site.mjs";
import { img, icon, ext, pageHero, ctaBand, whatsappUrl } from "../partials/helpers.mjs";

export default () => ({
  key: "trabajo",
  pathname: "/nuestro-trabajo/",
  priority: 0.9,
  title: "Nuestro trabajo: rugby, familia y barrio — Lourdes Rugby Club",
  description:
    "Rugby para niños y niñas de 6 a 13 años, una Comisión Directiva de Padres activa y encuentros que abren oportunidades en el Barrio Argüello Lourdes, Córdoba.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Programas de Lourdes Rugby Club",
      itemListElement: programs.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${site.url}/nuestro-trabajo/#${p.id}`,
      })),
    },
  ],
  body: `
${pageHero({
  eyebrow: "Nuestro trabajo",
  title: "Todos los días, más oportunidades para el barrio",
  lead: "Nuestras acciones combinan deporte, comunidad y compromiso social. Así trabajamos para que cada chico del barrio tenga una cancha, un equipo y un futuro.",
  image: "entrenamiento",
  note: "cada entrenamiento es una oportunidad",
})}

<nav class="subnav" aria-label="Programas">
  <div class="container">
    <ul>${programs.map((p) => `<li><a href="#${p.id}"><span class="hand">${p.n}</span>${p.title}</a></li>`).join("")}</ul>
  </div>
</nav>

${programs
  .map(
    (p, i) => `
<section class="section program${i % 2 ? " program--alt section--paper2" : ""}" id="${p.id}" aria-labelledby="${p.id}-title">
  <div class="container program__grid">
    <div class="program__media">
      <figure class="program__main" data-reveal="clip">${img(p.img, undefined, { sizes: "(min-width: 900px) 40vw, 90vw" })}</figure>
      <figure class="program__second" data-reveal>${img(p.img2, undefined, { sizes: "(min-width: 900px) 22vw, 50vw" })}</figure>
    </div>
    <div class="program__text">
      <p class="program__n display" aria-hidden="true">${p.n}</p>
      <p class="eyebrow" data-reveal>${p.kicker}</p>
      <h2 class="display section-title" id="${p.id}-title" data-split>${p.title}</h2>
      <p data-reveal>${p.text}</p>
      <ul class="check-list" data-reveal>${p.points.map((t) => `<li>${icon("check")}${t}</li>`).join("")}</ul>
    </div>
  </div>
</section>`
  )
  .join("")}

<section class="section section--navy pillar-grid-section" aria-labelledby="pg-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow eyebrow--gold" data-reveal>Cómo lo pensamos</p>
      <h2 class="display section-title" id="pg-title" data-split>Cinco pilares detrás de cada entrenamiento</h2>
    </div>
    <ol class="pillar-grid" role="list">
      ${pillars
        .map(
          (p, i) => `<li class="pillar-mini" data-reveal>
        <p class="pillar-mini__n hand">0${i + 1}</p>
        <h3 class="pillar-mini__word display">${p.word}</h3>
        <p>${p.text}</p>
      </li>`
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="section families" id="familias" aria-labelledby="families-title">
  <div class="container families__grid">
    <div class="families__media" data-reveal="clip">${img("tres-pelotas", undefined, { sizes: "(min-width: 900px) 34vw, 90vw" })}</div>
    <div class="families__text">
      <p class="eyebrow" data-reveal>Para las familias del barrio</p>
      <h2 class="display section-title" id="families-title" data-split>¿Tu hijo o hija quiere jugar al rugby?</h2>
      <p data-reveal>El club es un espacio seguro y estimulante para niños y niñas de ${site.ages}. Escribinos y te contamos cómo sumarlos al equipo.</p>
      <div class="btn-row" data-reveal>
        ${ext(whatsappUrl("inscripcion"), `${icon("whatsapp")}Consultar por WhatsApp`, "btn btn--navy")}
        <a class="btn btn--line" href="/contacto/?motivo=inscripcion#formulario">Dejar una consulta${icon("arrow")}</a>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`,
});
