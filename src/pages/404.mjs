import { icon, chalk } from "../partials/helpers.mjs";

export default () => ({
  key: "error",
  pathname: "/404.html",
  file: "404.html",
  noindex: true,
  title: "Página no encontrada — Lourdes Rugby Club",
  description:
    "La página que buscás no existe o cambió de lugar. Volvé al inicio de Lourdes Rugby Club o conocé cómo colaborar con los chicos del Barrio Argüello Lourdes.",
  body: `
<section class="section error-page">
  ${chalk("a", "error-page__chalk")}
  <div class="container error-page__inner">
    <p class="hand error-page__hand">¡pelota afuera!</p>
    <h1 class="display error-page__title">Esta jugada no existe</h1>
    <p>La página que buscás no está o cambió de lugar. Volvamos a la cancha.</p>
    <div class="btn-row">
      <a class="btn btn--navy" href="/">Ir al inicio${icon("arrow")}</a>
      <a class="btn btn--line" href="/colaborar/">Quiero colaborar</a>
    </div>
  </div>
</section>
`,
});
