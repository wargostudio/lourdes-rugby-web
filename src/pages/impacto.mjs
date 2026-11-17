import { site } from "../data/site.mjs";
import { img, icon, ext, chalk, pageHero, ctaBand, whatsappUrl } from "../partials/helpers.mjs";

// Lo que cambia, según cómo lo describe el propio club (sin cifras inventadas).
const changes = [
  {
    word: "Confianza",
    title: "Confianza, autoestima y superación",
    text: "El esfuerzo sostenido en el tiempo genera confianza, autoestima y capacidad de superación. Celebramos cada pequeño logro porque sabemos lo que cuesta conseguirlo.",
    img: "abrazo-en-la-tierra",
  },
  {
    word: "Habilidades",
    title: "Habilidades para toda la vida",
    text: "Cada entrenamiento desarrolla habilidades físicas, emocionales y sociales que acompañan a los chicos mucho más allá de la cancha.",
    img: "entrada-en-calor",
  },
  {
    word: "Familias",
    title: "Familias protagonistas",
    text: "El modelo de la Comisión Directiva de Padres fortalece los vínculos familiares y genera un sentido de pertenencia y orgullo en todo el barrio.",
    img: "equipo-palos",
  },
  {
    word: "Barrio",
    title: "Nuevas aspiraciones para el barrio",
    text: "Encuentros, torneos regionales y visitas de otros clubes muestran a los chicos que hay un mundo de posibilidades para ellos.",
    img: "equipo-cesped",
  },
];

export default () => ({
  key: "impacto",
  pathname: "/impacto/",
  priority: 0.8,
  title: "Impacto: lo que cambia con el rugby — Lourdes Rugby Club",
  description:
    "Cómo el rugby genera confianza, valores y pertenencia en los chicos y las familias del Barrio Argüello Lourdes, Córdoba. Historias reales de Lourdes Rugby Club.",
  body: `
${pageHero({
  eyebrow: "Impacto",
  title: "Lo que cambia cuando un chico sale a la cancha",
  lead: "El rugby enseña a respetar al rival, al árbitro y a los propios compañeros. En Lourdes Rugby Club eso se traduce en una cultura de convivencia sana que va mucho más allá del deporte.",
  image: "sonrisas",
  note: "el compromiso convierte a los niños de hoy en los adultos del mañana",
})}

<section class="section changes" aria-labelledby="changes-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Lo que vemos en la cancha</p>
      <h2 class="display section-title" id="changes-title" data-split>Cuatro cambios que se notan</h2>
    </div>
    <div class="changes-list">
      ${changes
        .map(
          (c, i) => `<article class="change" data-reveal>
        <p class="change__word display" aria-hidden="true">${c.word}</p>
        <div class="change__media">${img(c.img, undefined, { sizes: "(min-width: 900px) 26vw, 90vw" })}</div>
        <div class="change__text">
          <p class="hand change__n">0${i + 1}</p>
          <h3>${c.title}</h3>
          <p>${c.text}</p>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section--navy story" aria-labelledby="story-title">
  ${chalk("a", "story__chalk")}
  <div class="container story__grid">
    <div class="story__head">
      <p class="eyebrow eyebrow--gold" data-reveal>Historia de transformación</p>
      <h2 class="display section-title" id="story-title" data-split>Una mañana de rugby, donaciones y valores</h2>
    </div>
    <div class="story__body">
      <p class="story__lead" data-reveal>Los jugadores de M13 del Club Universitario de Buenos Aires (CUBA) viajaron hasta Córdoba especialmente para compartir una mañana con nuestros chicos.</p>
      <p data-reveal>Esa visita dejó en evidencia lo que Lourdes Rugby Club significa para toda la comunidad rugbística argentina: un ejemplo de que el deporte puede ser una herramienta de educación y superación en los contextos más desafiantes.</p>
      <p data-reveal>No fue la única: a lo largo de los años recibimos visitas y donaciones de instituciones de todo el país.</p>
    </div>
  </div>
</section>

<section class="section testimonials-invite" aria-labelledby="ti-title">
  <div class="container ti__grid">
    <div class="ti__media" data-reveal="clip">${img("cinco-abrazados", undefined, { sizes: "(min-width: 900px) 40vw, 90vw" })}</div>
    <div class="ti__text">
      <p class="eyebrow" data-reveal>Historias del club</p>
      <h2 class="display section-title" id="ti-title" data-split>¿Sos parte de esta historia?</h2>
      <p data-reveal>Jugadores, familias, entrenadores, voluntarios y clubes amigos: queremos reunir las experiencias que construyen Lourdes Rugby Club. Si tenés una historia para compartir, contanosla.</p>
      <div class="btn-row" data-reveal>
        <a class="btn btn--navy" href="/contacto/?motivo=historia#formulario">${icon("send")}Compartir mi historia</a>
        ${ext(site.social[0].url, `${icon("instagram")}Ver novedades en Instagram`, "btn btn--line")}
      </div>
    </div>
  </div>
</section>

<section class="section section--paper2 hashtag" aria-labelledby="hashtag-title">
  <div class="container hashtag__grid">
    <figure class="hashtag__media" data-reveal data-tilt>${img("yo-quiero-mi-cancha", undefined, { sizes: "(min-width: 900px) 46vw, 90vw" })}</figure>
    <div>
      <p class="eyebrow" data-reveal>La voz de los chicos</p>
      <h2 class="display section-title hashtag__title" id="hashtag-title" data-split>#YoQuieroMiCancha</h2>
      <p data-reveal>Cada chico que se calza los botines es una razón para seguir. Ayudanos a que el barrio siga teniendo su cancha, su equipo y su futuro.</p>
      ${ext(whatsappUrl("voluntario"), `${icon("whatsapp")}Quiero ayudar`, "btn btn--navy", "data-reveal")}
    </div>
  </div>
</section>

${ctaBand()}
`,
});
