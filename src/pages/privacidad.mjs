import { site } from "../data/site.mjs";
import { ext, whatsappUrl } from "../partials/helpers.mjs";

export default () => ({
  key: "privacidad",
  pathname: "/privacidad/",
  priority: 0.2,
  title: "Política de privacidad — Lourdes Rugby Club",
  description:
    "Cómo Lourdes Rugby Club trata los datos que nos enviás por el formulario de contacto o WhatsApp: para qué los usamos, cuánto tiempo y cómo pedir su eliminación.",
  body: `
<section class="section legal">
  <div class="container legal__inner">
    <p class="eyebrow">Legal</p>
    <h1 class="display section-title">Política de privacidad</h1>
    <p>En ${site.name} cuidamos los datos de las personas que se comunican con nosotros.</p>
    <h2>Qué datos recibimos</h2>
    <p>${
      site.contactMode === "whatsapp"
        ? "El formulario de contacto no guarda ni envía datos a este sitio: arma tu mensaje en tu navegador y lo abre en WhatsApp para que vos decidas enviarlo. Cuando nos escribís por WhatsApp, recibimos tu nombre, tu número y lo que nos cuentes, además de los datos que esa aplicación comparte."
        : "Cuando completás el formulario de contacto recibimos tu nombre, tu email, tu teléfono (si lo indicás), el motivo y el texto de tu mensaje. Si nos escribís por WhatsApp, recibimos los datos que esa aplicación comparte."
    }</p>
    <h2>Para qué los usamos</h2>
    <p>Únicamente para responder tu consulta y coordinar la colaboración, el voluntariado o la inscripción que nos plantees. No los vendemos ni los cedemos a terceros, ni los usamos para enviar publicidad.</p>
    <h2>Donaciones</h2>
    <p>Las donaciones mensuales se procesan en Mercado Pago. El club no recibe ni almacena los datos de tu tarjeta o cuenta: rigen las políticas de privacidad de esa plataforma.</p>
    <h2>Fotos de menores</h2>
    <p>Las fotos publicadas en este sitio corresponden a actividades del club. Si sos madre, padre o tutor y querés que retiremos una imagen, escribinos y la quitamos.</p>
    <h2>Tus derechos</h2>
    <p>Podés pedir acceder, corregir o eliminar tus datos en cualquier momento escribiéndonos por ${ext(whatsappUrl(), "WhatsApp")} o desde el <a href="/contacto/">formulario de contacto</a>. Conforme a la Ley 25.326 de Protección de los Datos Personales, la Agencia de Acceso a la Información Pública es el órgano de control.</p>
  </div>
</section>
`,
});
