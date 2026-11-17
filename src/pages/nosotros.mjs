import { site, values } from "../data/site.mjs";
import { img, icon, pageHero, ctaBand } from "../partials/helpers.mjs";

const chapters = [
  {
    label: "El origen",
    title: "Nacimos en la Capilla",
    text: `Lourdes Rugby Club nació en el seno de la ${site.origin}, en el ${site.barrio} de la ciudad de Córdoba, Argentina. Desde sus comienzos, el club fue concebido como una herramienta de transformación social: un puñado de soñadores que creyeron en el rugby no solo como deporte, sino como canal de participación, inclusión y superación para los chicos y las familias del barrio.`,
    img: "nene-pelota",
  },
  {
    label: "La misión",
    title: "Generar oportunidades reales",
    text: "Nuestra misión es contribuir al desarrollo formativo de niños y niñas en situación de vulnerabilidad, generando oportunidades reales a través del deporte. Entendemos el rugby como una escuela de vida donde se aprende a trabajar en equipo, a respetar al otro y a comprometerse con algo más grande que uno mismo.",
    img: "charla-entrenador",
  },
  {
    label: "El crecimiento",
    title: "Un esfuerzo colectivo",
    text: "A lo largo de los años, el club creció gracias al esfuerzo colectivo de voluntarios, padres, madres y colaboradores que donan su tiempo, su energía y sus recursos para que cada chico del barrio tenga la posibilidad de calzarse los botines y salir a la cancha. Recibimos visitas y donaciones de instituciones de todo el país, como el Club Universitario de Buenos Aires (CUBA), cuyos jugadores de M13 viajaron hasta Córdoba para compartir una mañana de rugby, donaciones y valores con nuestros chicos.",
    img: "ronda-encuentro",
  },
  {
    label: "Hoy",
    title: "Seguimos creciendo juntos",
    text: "Hoy, con años de trayectoria y una comunidad consolidada, seguimos entrenando, jugando y creciendo juntos. Porque el mejor partido siempre es el que se juega de este lado de la cancha.",
    img: "foto-grupal",
  },
];

const people = [
  {
    icon: "family",
    title: "Comisión Directiva de Padres",
    text: "Madres y padres que trabajan en equipo, asumen responsabilidades y se convierten en protagonistas del club.",
  },
  {
    icon: "hand",
    title: "Voluntarios y entrenadores",
    text: "Personas que donan su tiempo y su energía para que cada entrenamiento y cada encuentro sean posibles.",
  },
  {
    icon: "handshake",
    title: "Colaboradores e instituciones",
    text: `La red comunitaria de la ${site.origin}, clubes que nos visitan y quienes aportan sus recursos al proyecto.`,
  },
];

export default () => ({
  key: "nosotros",
  pathname: "/nosotros/",
  priority: 0.9,
  title: "Nosotros: historia, misión y valores — Lourdes Rugby Club",
  description:
    "Conocé los orígenes de Lourdes Rugby Club, nacido en la Capilla Nuestra Señora de Lourdes del Barrio Argüello, Córdoba: su misión, sus valores y quiénes lo sostienen.",
  body: `
${pageHero({
  eyebrow: "Nosotros",
  title: "Nuestros orígenes, nuestra identidad",
  lead: "Desde la Capilla Nuestra Señora de Lourdes hasta cada cancha que pisamos, esta es la historia de un sueño que se construye día a día en el barrio.",
  image: "cuatro-abrazados",
  note: "el mejor partido se juega de este lado de la cancha",
})}

<section class="section history" aria-labelledby="history-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Nuestra historia</p>
      <h2 class="display section-title" id="history-title" data-split>Un sueño que se construye en el barrio</h2>
    </div>
    <div class="timeline-wrap" data-timeline>
    <svg class="timeline__line" viewBox="0 0 10 100" preserveAspectRatio="none" aria-hidden="true"><path d="M5 0 V100" data-timeline-line/></svg>
    <ol class="timeline" role="list">
      ${chapters
        .map(
          (c, i) => `<li class="timeline__item" data-reveal>
        <div class="timeline__marker" aria-hidden="true"><span>${i + 1}</span></div>
        <div class="timeline__text">
          <p class="timeline__label hand">${c.label}</p>
          <h3 class="timeline__title">${c.title}</h3>
          <p>${c.text}</p>
        </div>
        <div class="timeline__media">${img(c.img, undefined, { sizes: "(min-width: 900px) 34vw, 90vw" })}</div>
      </li>`
        )
        .join("")}
    </ol>
    </div>
  </div>
</section>

<section class="section section--navy mission" aria-labelledby="mission-title">
  <div class="container mission__grid">
    <p class="eyebrow eyebrow--gold" data-reveal>Misión</p>
    <h2 class="display mission__title" id="mission-title" data-split>Contribuir al desarrollo formativo de niños y niñas en situación de vulnerabilidad, generando oportunidades reales a través del deporte.</h2>
    <p class="mission__text" data-reveal>El rugby tiene una cultura única en el mundo del deporte. En Lourdes Rugby Club tomamos esa cultura y la ponemos al servicio de nuestra comunidad.</p>
  </div>
</section>

<section class="section values" id="valores" aria-labelledby="values-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal>Nuestros valores</p>
        <h2 class="display section-title" id="values-title" data-split>Lo que aprendemos dentro y fuera de la cancha</h2>
      </div>
      <p class="section-head__aside" data-reveal>Estos son los valores que nos guían, en cada entrenamiento y en cada reunión de la Comisión.</p>
    </div>
    <div class="values-grid">
      ${values
        .map(
          (v, i) => `<article class="value-card" data-reveal data-tilt>
        <div class="value-card__media">${img(v.img, undefined, { sizes: "(min-width: 900px) 24vw, 90vw" })}</div>
        <p class="value-card__n display" aria-hidden="true">0${i + 1}</p>
        <h3 class="value-card__title">${v.title}</h3>
        <p class="value-card__lead">${v.lead}</p>
        <p>${v.text}</p>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section--paper2 people" aria-labelledby="people-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Equipo y referentes</p>
      <h2 class="display section-title" id="people-title" data-split>Quiénes sostienen el club</h2>
    </div>
    <div class="people-grid">
      ${people
        .map(
          (p) => `<article class="people-card" data-reveal>
        ${icon(p.icon, "people-card__icon")}
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </article>`
        )
        .join("")}
    </div>
    <p class="people__note" data-reveal>¿Querés sumarte a este equipo? <a href="/colaborar/#voluntariado">Conocé cómo ser voluntario/a</a>.</p>
  </div>
</section>

${ctaBand()}
`,
});
