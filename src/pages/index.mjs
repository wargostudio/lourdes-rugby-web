import { site, pillars, programs, gallery } from "../data/site.mjs";
import { img, icon, chalk, ext, whatsappUrl } from "../partials/helpers.mjs";

const stack = [
  { slug: "tres-pelotas", note: "una escuela de vida" },
  { slug: "barro", note: "juntos se llega más lejos" },
  { slug: "pelota-en-alto", note: "cada entrenamiento cuenta" },
  { slug: "cinco-abrazados", note: "acá hay futuro" },
];

const ball = `<svg class="tape__ball" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-ball"/></svg>`;
const tapeWords = ["Trabajo en equipo", "Respeto", "Compromiso", "Esfuerzo y disciplina", "Comunidad", "Inclusión"];
const tape = (cls) =>
  `<div class="tape ${cls}" aria-hidden="true"><div class="tape__track" data-marquee>${[0, 1]
    .map(() => `<span class="tape__group">${tapeWords.map((w) => `<span>${w}</span>${ball}`).join("")}</span>`)
    .join("")}</div></div>`;

// Fotitos intercaladas en el manifiesto
const pill = (slug) => `<span class="pill-photo" aria-hidden="true">${img(slug, "", { sizes: "120px" })}</span>`;

export default () => ({
  key: "inicio",
  pathname: "/",
  priority: 1.0,
  title: "Lourdes Rugby Club — Rugby social en Argüello Lourdes, Córdoba",
  description:
    "Generamos oportunidades a través del rugby para niños y niñas de 6 a 13 años del Barrio Argüello Lourdes, Córdoba. Conocé el club y sumate a colaborar.",
  body: `
<section class="hero" aria-labelledby="hero-title">
  <div class="container hero__grid">
    <div class="hero__text">
      <p class="eyebrow" data-reveal><span class="dot" aria-hidden="true"></span>Rugby social · ${site.barrio}, ${site.city}</p>
      <h1 class="display hero__title" id="hero-title" data-hero-title>
        <span class="hero__line">Una cancha,</span>
        <span class="hero__line">un equipo,</span>
        <span class="hero__line hero__line--gold">un futuro.</span>
      </h1>
      <p class="lead hero__lead" data-reveal>En el corazón del ${site.barrio} creemos que el deporte puede cambiar vidas. Generamos oportunidades a través del rugby para niños y niñas de ${site.ages}.</p>
      <div class="btn-row" data-reveal>
        <a class="btn btn--navy" href="/colaborar/" data-magnet>${icon("heart")}Quiero colaborar</a>
        <a class="btn btn--line" href="/nosotros/">Conocé nuestra historia${icon("arrow")}</a>
      </div>
    </div>
    <div class="hero__visual">
      <div class="photo-stack" data-stack>
        ${stack
          .map(
            (s, i) => `<figure class="photo-stack__card" data-stack-card style="--i:${i}">
          ${img(s.slug, undefined, { sizes: "(min-width: 900px) 30vw, 70vw", eager: i >= stack.length - 2 })}
          <figcaption class="hand">${s.note}</figcaption>
        </figure>`
          )
          .join("")}
        <button class="photo-stack__next" type="button" data-stack-next>
          <span class="sr-only">Ver la siguiente foto</span>${icon("arrow")}
        </button>
      </div>
      <p class="hero__sticker hand" aria-hidden="true">¡vamos<br>Lourdes!</p>
    </div>
  </div>
  ${chalk("a", "hero__chalk")}
  <a class="scroll-cue" href="#manifiesto"><span>Conocé el club</span>${icon("arrow-down")}</a>
</section>

<div class="tapes">${tape("tape--gold")}${tape("tape--blue")}</div>

<section class="manifesto section" id="manifiesto" aria-labelledby="manifesto-title">
  <div class="container">
    <p class="eyebrow" data-reveal>Más que un club</p>
    <h2 class="display manifesto__title" id="manifesto-title" data-split>El rugby es mucho más que un deporte: es una herramienta para transformar vidas.</h2>
    <p class="manifesto__text" data-highlight>
      Lourdes Rugby Club es mucho más que un club ${pill("cinco-abrazados")} es un espacio de contención, aprendizaje y comunidad donde niños y niñas en situación de vulnerabilidad ${pill("nene-pelota")} encuentran una cancha, un equipo y un futuro. ${pill("ronda-tierra")}
    </p>
    <div class="manifesto__foot" data-reveal>
      <a class="link-arrow" href="/nosotros/">Conocé nuestra historia${icon("arrow")}</a>
      <p class="hand manifesto__hand">— nacimos en la ${site.origin}</p>
    </div>
  </div>
</section>

<section class="pillars section" aria-labelledby="pillars-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Lo que nos mueve</p>
      <h2 class="display section-title" id="pillars-title" data-split>Cinco pilares, un mismo partido</h2>
    </div>
    <ol class="pillar-stack" role="list">
      ${pillars
        .map(
          (p, i) => `<li class="pillar-card pillar-card--${p.id}" style="--n:${i}" data-pillar>
        <div class="pillar-card__text">
          <p class="pillar-card__num">0${i + 1}<span>/05</span></p>
          <p class="pillar-card__word display" aria-hidden="true">${p.word}</p>
          <h3 class="pillar-card__title"><span class="sr-only">${p.word}: </span>${p.title}</h3>
          <p>${p.text}</p>
        </div>
        <div class="pillar-card__media">${img(p.img, undefined, { sizes: "(min-width: 900px) 40vw, 90vw" })}</div>
      </li>`
        )
        .join("")}
    </ol>
  </div>
</section>

<section class="work section section--paper2" aria-labelledby="work-title">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow" data-reveal>Qué hacemos</p>
        <h2 class="display section-title" id="work-title" data-split>Deporte, comunidad y compromiso social</h2>
      </div>
      <p class="section-head__aside" data-reveal>En Lourdes Rugby Club trabajamos todos los días para que el barrio tenga más oportunidades.</p>
    </div>
    <div class="work-grid">
      ${programs
        .map(
          (p) => `<article class="work-card" data-reveal>
        <a class="work-card__link" href="/nuestro-trabajo/#${p.id}">
          <div class="work-card__media">${img(p.img2, undefined, { sizes: "(min-width: 900px) 30vw, 90vw" })}</div>
          <div class="work-card__body">
            <p class="work-card__n hand">${p.n}</p>
            <p class="work-card__kicker">${p.kicker}</p>
            <h3 class="work-card__title">${p.title}</h3>
            <span class="work-card__more">Ver más${icon("arrow")}</span>
          </div>
        </a>
      </article>`
        )
        .join("")}
    </div>
    <div class="center" data-reveal><a class="btn btn--navy" href="/nuestro-trabajo/">Descubrí nuestro trabajo${icon("arrow")}</a></div>
  </div>
</section>

<section class="origin section" aria-labelledby="origin-title">
  <div class="origin__media" data-parallax>${img("banda-ronda", "Ronda de chicos abrazados, en blanco y negro", { sizes: "(min-width: 900px) 50vw, 100vw" })}</div>
  <div class="container origin__grid">
    <div class="origin__text">
      <p class="eyebrow eyebrow--gold" data-reveal>Nuestra historia</p>
      <h2 class="display section-title" id="origin-title" data-split>Un puñado de soñadores y una capilla de barrio</h2>
      <p data-reveal>Lourdes Rugby Club nació en el seno de la ${site.origin}, en el ${site.barrio}. Desde sus comienzos fue concebido como una herramienta de transformación social: el rugby no solo como deporte, sino como canal de participación, inclusión y superación para los chicos y las familias del barrio.</p>
      <a class="btn btn--gold" href="/nosotros/" data-reveal>Conocé nuestra historia${icon("arrow")}</a>
    </div>
  </div>
</section>

<section class="impact-teaser section" aria-labelledby="impact-title">
  <div class="container impact-teaser__grid">
    <blockquote class="big-quote" data-reveal>
      <span class="big-quote__mark" aria-hidden="true">“</span>
      <p class="display" id="impact-title">Cada acción del club es un mensaje claro: <span class="text-blue">acá hay futuro.</span></p>
    </blockquote>
    <article class="story-card" data-reveal>
      <p class="eyebrow">Una visita que lo dijo todo</p>
      <p>Los jugadores de M13 del Club Universitario de Buenos Aires (CUBA) viajaron hasta Córdoba especialmente para compartir una mañana de rugby, donaciones y valores con nuestros chicos.</p>
      <p class="story-card__muted">Esa visita dejó en evidencia lo que Lourdes Rugby Club significa para toda la comunidad rugbística argentina.</p>
      <a class="link-arrow" href="/impacto/">Ver nuestro impacto${icon("arrow")}</a>
      ${chalk("b", "story-card__chalk")}
    </article>
  </div>
</section>

<section class="reel section section--tight" aria-labelledby="reel-title">
  <div class="container section-head section-head--split">
    <div>
      <p class="eyebrow" data-reveal>Momentos que nos definen</p>
      <h2 class="display section-title" id="reel-title" data-split>Cada entrenamiento, cada encuentro, cada sonrisa</h2>
    </div>
    <a class="btn btn--line" href="/galeria/" data-reveal>Ver la galería${icon("arrow")}</a>
  </div>
  <div class="reel__rows" aria-hidden="true">
    ${[0, 1]
      .map((r) => {
        const set = gallery.filter((_, i) => i % 2 === r).slice(0, 9);
        return `<div class="reel__row reel__row--${r}"><div class="reel__track" data-marquee data-reverse="${r}">${[0, 1]
          .map(() => `<div class="reel__group">${set.map((g) => `<div class="reel__item">${img(g.slug, "", { sizes: "280px" })}</div>`).join("")}</div>`)
          .join("")}</div></div>`;
      })
      .join("")}
  </div>
</section>

<section class="join section" aria-labelledby="join-title">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow" data-reveal>Sumate al equipo</p>
      <h2 class="display section-title" id="join-title" data-split>Hay muchas formas de entrar a la cancha</h2>
    </div>
    <div class="join-grid">
      <article class="join-card join-card--gold" data-reveal>
        ${icon("heart", "join-card__icon")}
        <h3>Doná todos los meses</h3>
        <p>Tu aporte mensual nos permite planificar, crecer y llegar a más niños y niñas de Argüello Lourdes.</p>
        ${ext(site.donateUrl, `Donar ahora${icon("arrow-up-right")}`, "join-card__cta")}
      </article>
      <article class="join-card" data-reveal>
        ${icon("hand", "join-card__icon")}
        <h3>Sumate como voluntario/a</h3>
        <p>Tu tiempo y tu energía hacen posible cada entrenamiento y cada encuentro.</p>
        <a class="join-card__cta" href="/colaborar/#voluntariado">Quiero ser voluntario/a${icon("arrow")}</a>
      </article>
      <article class="join-card" data-reveal>
        ${icon("handshake", "join-card__icon")}
        <h3>Empresas e instituciones</h3>
        <p>Alianzas, patrocinios y donaciones que multiplican lo que pasa en la cancha.</p>
        <a class="join-card__cta" href="/colaborar/#empresas">Ser aliado del club${icon("arrow")}</a>
      </article>
      <article class="join-card join-card--blue" data-reveal>
        ${icon("family", "join-card__icon")}
        <h3>Sumá a tu hijo o hija</h3>
        <p>Si tenés chicos de ${site.ages} en el barrio, hay un lugar para ellos en el equipo.</p>
        ${ext(whatsappUrl("inscripcion"), `Consultar por WhatsApp${icon("arrow-up-right")}`, "join-card__cta")}
      </article>
    </div>
  </div>
</section>
`,
});
