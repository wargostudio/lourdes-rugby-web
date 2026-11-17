import { site } from "../data/site.mjs";
import { img, icon, ext, chalk, pageHero, whatsappUrl } from "../partials/helpers.mjs";

const uses = [
  { icon: "ball", label: "Más pelotas" },
  { icon: "box", label: "Más indumentaria" },
  { icon: "pin", label: "Más viajes a encuentros" },
  { icon: "calendar", label: "Más horas de entrenamiento" },
];

export default () => ({
  key: "colaborar",
  pathname: "/colaborar/",
  priority: 0.9,
  title: "Cómo colaborar: doná o sumate — Lourdes Rugby Club",
  description:
    "Doná mensualmente, sumate como voluntario/a, aliá a tu empresa o inscribí a tu hijo/a. Todas las formas de ser parte de Lourdes Rugby Club en Argüello Lourdes.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      name: "Donación mensual a Lourdes Rugby Club",
      target: site.donateUrl,
      recipient: { "@id": `${site.url}/#organizacion` },
    },
  ],
  body: `
${pageHero({
  eyebrow: "Cómo colaborar",
  title: "Hay un lugar para vos en este equipo",
  lead: "Ya sea para sumar un jugador, ser voluntario o apoyar el proyecto, estamos siempre listos para escucharte. Elegí cómo querés entrar a la cancha.",
  image: "ronda-tierra",
  note: "cuando todos empujan para el mismo lado, los resultados se multiplican",
})}

<nav class="subnav" aria-label="Formas de colaborar">
  <div class="container">
    <ul>
      <li><a href="#donar">${icon("heart")}Donar</a></li>
      <li><a href="#voluntariado">${icon("hand")}Voluntariado</a></li>
      <li><a href="#empresas">${icon("handshake")}Empresas y alianzas</a></li>
      <li><a href="#especie">${icon("box")}Donaciones en especie</a></li>
      <li><a href="#familias">${icon("family")}Familias</a></li>
    </ul>
  </div>
</nav>

<section class="section donate" id="donar" aria-labelledby="donate-title">
  <div class="container donate__grid">
    <div class="donate__card" data-reveal>
      <p class="eyebrow">Donación mensual</p>
      <h2 class="display donate__title" id="donate-title" data-split>Tu aporte, todos los meses, en la cancha</h2>
      <p>Tu aporte mensual nos permite planificar, crecer y llegar a más niños y niñas de Argüello Lourdes. No hace falta donar grandes sumas: la constancia y el compromiso de muchos hace la diferencia.</p>
      ${ext(site.donateUrl, `${icon("heart")}Donar mensualmente`, "btn btn--navy btn--lg", "data-magnet")}
      <p class="donate__note">El pago se procesa de forma segura en Mercado Pago. Podés gestionar o cancelar tu suscripción desde tu cuenta.</p>
      ${chalk("b", "donate__chalk")}
    </div>
    <div class="donate__uses">
      <p class="hand donate__hand">Cada donación se convierte directamente en…</p>
      <ul class="uses" role="list">
        ${uses.map((u) => `<li class="use" data-reveal>${icon(u.icon, "use__icon")}<span>${u.label}</span></li>`).join("")}
      </ul>
      <p class="donate__closing" data-reveal>…para los chicos del barrio. Si creés en el poder del deporte para cambiar realidades, este es tu lugar.</p>
    </div>
  </div>
</section>

<section class="section section--paper2 way" id="voluntariado" aria-labelledby="vol-title">
  <div class="container way__grid">
    <div class="way__media" data-reveal="clip">${img("charla-ronda", undefined, { sizes: "(min-width: 900px) 30vw, 90vw" })}</div>
    <div class="way__text">
      <p class="eyebrow" data-reveal>Voluntariado</p>
      <h2 class="display section-title" id="vol-title" data-split>Doná tu tiempo y tu energía</h2>
      <p data-reveal>El club creció gracias al esfuerzo colectivo de voluntarios, padres, madres y colaboradores. Comprometerse significa aparecer: en los entrenamientos, en los encuentros y en las jornadas de mantenimiento del predio.</p>
      <div class="btn-row" data-reveal>
        ${ext(whatsappUrl("voluntario"), `${icon("whatsapp")}Quiero ser voluntario/a`, "btn btn--navy")}
        <a class="btn btn--line" href="/contacto/?motivo=voluntariado#formulario">Escribir un mensaje${icon("arrow")}</a>
      </div>
    </div>
  </div>
</section>

<section class="section way way--reverse" id="empresas" aria-labelledby="emp-title">
  <div class="container way__grid">
    <div class="way__media" data-reveal="clip">${img("equipo-encuentro", undefined, { sizes: "(min-width: 900px) 30vw, 90vw" })}</div>
    <div class="way__text">
      <p class="eyebrow" data-reveal>Empresas, clubes e instituciones</p>
      <h2 class="display section-title" id="emp-title" data-split>Alianzas que multiplican oportunidades</h2>
      <p data-reveal>Hemos recibido visitas y donaciones de instituciones de todo el país. Si tu empresa, club u organización quiere acompañar al club con patrocinios, alianzas o aportes, conversemos sobre cómo hacerlo juntos.</p>
      <div class="btn-row" data-reveal>
        <a class="btn btn--navy" href="/contacto/?motivo=empresa#formulario">${icon("handshake")}Quiero ser aliado</a>
        ${ext(whatsappUrl("empresa"), `${icon("whatsapp")}Hablar por WhatsApp`, "btn btn--line")}
      </div>
    </div>
  </div>
</section>

<section class="section section--navy way way--dark" id="especie" aria-labelledby="esp-title">
  <div class="container way__grid">
    <div class="way__media" data-reveal="clip">${img("tres-pelotas", undefined, { sizes: "(min-width: 900px) 30vw, 90vw" })}</div>
    <div class="way__text">
      <p class="eyebrow eyebrow--gold" data-reveal>Donaciones en especie</p>
      <h2 class="display section-title" id="esp-title" data-split>Pelotas, indumentaria y equipamiento</h2>
      <p data-reveal>Gestionamos donaciones de materiales que se transforman en más horas de juego para los chicos. Escribinos antes de acercar tu aporte y coordinamos juntos qué hace falta.</p>
      <div class="btn-row" data-reveal>
        ${ext(whatsappUrl("especie"), `${icon("whatsapp")}Coordinar una donación`, "btn btn--gold")}
      </div>
    </div>
  </div>
</section>

<section class="section way" id="familias" aria-labelledby="fam-title">
  <div class="container way__grid">
    <div class="way__media" data-reveal="clip">${img("seis-en-la-tierra", undefined, { sizes: "(min-width: 900px) 30vw, 90vw" })}</div>
    <div class="way__text">
      <p class="eyebrow" data-reveal>Familias del barrio</p>
      <h2 class="display section-title" id="fam-title" data-split>Sumá a tu hijo o hija al equipo</h2>
      <p data-reveal>Para niños y niñas de ${site.ages}. Para transformar la vida de un niño hay que involucrar a toda su familia: por eso las madres y los padres también son protagonistas del club.</p>
      <div class="btn-row" data-reveal>
        ${ext(whatsappUrl("inscripcion"), `${icon("whatsapp")}Consultar por WhatsApp`, "btn btn--navy")}
        <a class="btn btn--line" href="/contacto/?motivo=inscripcion#formulario">Dejar una consulta${icon("arrow")}</a>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight other" aria-labelledby="other-title">
  <div class="container other__inner" data-reveal>
    <h2 class="display other__title" id="other-title">¿Tenés otra idea para colaborar?</h2>
    <p>Toda ayuda suma. Contanos qué se te ocurre y lo pensamos juntos.</p>
    <a class="btn btn--gold" href="/contacto/" data-magnet>Contactanos${icon("arrow")}</a>
  </div>
</section>
`,
});
