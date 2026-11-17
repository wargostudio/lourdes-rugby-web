import { site } from "../data/site.mjs";
import { icon, ext, pageHero, whatsappUrl } from "../partials/helpers.mjs";

export const motivos = [
  { id: "voluntariado", label: "Quiero ser voluntario/a" },
  { id: "donacion", label: "Quiero donar" },
  { id: "inscripcion", label: "Quiero que mi hijo/a juegue en el club" },
  { id: "empresa", label: "Empresa, club o institución" },
  { id: "historia", label: "Quiero compartir mi historia con el club" },
  { id: "otra", label: "Otra consulta" },
];

const mapQuery = encodeURIComponent(`Barrio Argüello Lourdes, Córdoba, Argentina`);

const wa = site.contactMode === "whatsapp";

export default () => ({
  key: "contacto",
  pathname: "/contacto/",
  priority: 0.8,
  title: "Contacto — Lourdes Rugby Club, Argüello Lourdes, Córdoba",
  description:
    "Escribinos para sumar un jugador, ser voluntario/a, donar o apoyar el proyecto. WhatsApp, formulario y redes de Lourdes Rugby Club, Barrio Argüello Lourdes.",
  schema: [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contacto — Lourdes Rugby Club",
      url: `${site.url}/contacto/`,
      about: { "@id": `${site.url}/#organizacion` },
    },
  ],
  body: `
${pageHero({
  eyebrow: "Contacto",
  title: "Hablemos, el equipo te espera",
  lead: "Ya sea para sumar un jugador, ser voluntario o apoyar el proyecto, estamos siempre listos para escucharte.",
})}

<section class="section section--tight contact" aria-label="Formas de contacto">
  <div class="container contact__grid">
    <div class="contact__form-wrap" id="formulario">
      <h2 class="display contact__title">Dejanos tu mensaje</h2>
      <p class="contact__intro">${
        wa
          ? "Contanos qué necesitás: voluntariado, donaciones, cómo inscribir a tus hijos o cualquier otra consulta. Al enviar, tu mensaje se abre en WhatsApp listo para mandar."
          : "Respondemos consultas sobre voluntariado, donaciones, cómo inscribir a tus hijos y cualquier otra cosa que quieras saber del club."
      } Los campos marcados con <span aria-hidden="true">*</span><span class="sr-only">asterisco</span> son obligatorios.</p>

      <form class="form" ${
        wa ? `action="https://wa.me/${site.whatsapp}" method="get" target="_blank" data-mode="whatsapp"` : 'action="/contacto/enviar.php" method="post" data-mode="email"'
      } novalidate data-contact-form>
        <div class="form__status" role="status" aria-live="polite" tabindex="-1" data-form-status hidden></div>

        <div class="field">
          <label for="f-nombre">Nombre y apellido <span aria-hidden="true">*</span></label>
          <input id="f-nombre" name="nombre" type="text" autocomplete="name" required maxlength="120" aria-describedby="e-nombre">
          <p class="field__error" id="e-nombre" data-error-for="nombre"></p>
        </div>
        ${
          wa
            ? ""
            : `<div class="form__row">
          <div class="field">
            <label for="f-email">Email <span aria-hidden="true">*</span></label>
            <input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160" aria-describedby="e-email">
            <p class="field__error" id="e-email" data-error-for="email"></p>
          </div>
          <div class="field">
            <label for="f-telefono">Teléfono <span class="field__opt">(opcional)</span></label>
            <input id="f-telefono" name="telefono" type="tel" autocomplete="tel" maxlength="40" inputmode="tel">
          </div>
        </div>`
        }
        <div class="field">
          <label for="f-motivo">Motivo de la consulta</label>
          <div class="select">
            <select id="f-motivo" name="motivo" data-motivo>
              ${motivos.map((m) => `<option value="${m.id}">${m.label}</option>`).join("")}
            </select>
            ${icon("chev-down")}
          </div>
        </div>
        <div class="field">
          <label for="f-mensaje">Mensaje <span aria-hidden="true">*</span></label>
          <textarea id="f-mensaje" name="${wa ? "text" : "mensaje"}" rows="5" required maxlength="${wa ? 1500 : 4000}" aria-describedby="e-mensaje" data-field="mensaje"></textarea>
          <p class="field__error" id="e-mensaje" data-error-for="mensaje"></p>
        </div>
        ${
          wa
            ? `<p class="form__note">${icon("whatsapp")}Se abre WhatsApp (en la app o en WhatsApp Web) con tu mensaje escrito para ${site.whatsappDisplay}. Solo falta tocar “Enviar”.</p>`
            : `<div class="field field--check">
          <input id="f-acepto" name="acepto" type="checkbox" value="si" required aria-describedby="e-acepto">
          <label for="f-acepto">Acepto que Lourdes Rugby Club use estos datos solo para responder mi consulta (<a href="/privacidad/">política de privacidad</a>). <span aria-hidden="true">*</span></label>
          <p class="field__error" id="e-acepto" data-error-for="acepto"></p>
        </div>
        <div class="hp" aria-hidden="true">
          <label for="f-web">No completar</label>
          <input id="f-web" name="sitio_web" type="text" tabindex="-1" autocomplete="off">
        </div>
        <input type="hidden" name="t" value="" data-form-time>`
        }

        <div class="form__actions">
          ${
            wa
              ? `<button class="btn btn--navy btn--lg" type="submit" data-submit>${icon("whatsapp")}<span data-submit-label>Enviar por WhatsApp</span><span class="sr-only"> (se abre en una pestaña nueva)</span></button>`
              : `<button class="btn btn--navy btn--lg" type="submit" data-submit>${icon("send")}<span data-submit-label>Enviar mensaje</span></button>
          <button class="btn btn--line" type="button" data-wa-send>${icon("whatsapp")}Enviar por WhatsApp</button>`
          }
        </div>
      </form>
    </div>

    <aside class="contact__aside" aria-label="Otros canales">
      <div class="contact-card contact-card--wa">
        <p class="eyebrow">${wa ? "Hablá directo con el club" : "La forma más rápida"}</p>
        <h2 class="contact-card__title">WhatsApp</h2>
        <p>${site.whatsappDisplay}</p>
        ${ext(whatsappUrl(), `${icon("whatsapp")}Abrir chat`, "btn btn--gold btn--block")}
      </div>
      <div class="contact-card">
        <h2 class="contact-card__title">Redes sociales</h2>
        <ul class="social-list" role="list">
          ${site.social.map((s) => `<li>${ext(s.url, `${icon(s.id)}<span><strong>${s.label}</strong><small>${s.handle}</small></span>${icon("arrow-up-right", "social-list__go")}`)}</li>`).join("")}
        </ul>
      </div>
      <div class="contact-card">
        <h2 class="contact-card__title">Dónde estamos</h2>
        <p>${icon("pin")} ${site.barrio}, ${site.city}, Argentina.</p>
        ${ext(`https://www.google.com/maps/search/?api=1&query=${mapQuery}`, `Abrir en Google Maps${icon("arrow-up-right")}`, "link-arrow")}
      </div>
    </aside>
  </div>
</section>
`,
});
