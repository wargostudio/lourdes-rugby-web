// ---------------------------------------------------------------------------
// Contenido central del sitio de Lourdes Rugby Club.
// Todo lo que está acá sale de lourdesrugbyclub.com (relevamiento 17/11/2026).
// Lo que falta confirmar está en PENDIENTES.md: no inventar datos.
// ---------------------------------------------------------------------------

export const site = {
  name: "Lourdes Rugby Club",
  shortName: "Lourdes RC",
  url: "https://lourdesrugbyclub.com",
  locale: "es_AR",
  tagline: "Generamos oportunidades a través del rugby",
  description:
    "Lourdes Rugby Club es una organización deportiva y social del Barrio Argüello Lourdes, Córdoba, que genera oportunidades a través del rugby para niños y niñas de 6 a 13 años.",
  ages: "6 a 13 años",
  barrio: "Barrio Argüello Lourdes",
  city: "Córdoba",
  region: "Córdoba",
  country: "AR",
  origin: "Capilla Nuestra Señora de Lourdes",
  // WhatsApp configurado en la web actual (botón flotante "joinchat")
  whatsapp: "5493515199569",
  whatsappDisplay: "+54 9 351 519-9569",
  // Formulario de contacto: "whatsapp" (arma el mensaje y abre WhatsApp) o "email"
  // (envía por contacto/enviar.php; requiere configurar DESTINO en ese archivo).
  contactMode: "whatsapp",
  // Suscripción mensual de Mercado Pago (botón "Donar ahora" de la web actual)
  donateUrl: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=a6e7b5271ca44356bc2fc845ba22f3ea",
  social: [
    { id: "instagram", label: "Instagram", handle: "@lourdesrugbyclub", url: "https://www.instagram.com/lourdesrugbyclub/" },
    { id: "facebook", label: "Facebook", handle: "/lourdesrugbyclub", url: "https://www.facebook.com/lourdesrugbyclub" },
    { id: "linkedin", label: "LinkedIn", handle: "Lourdes Rugby Club", url: "https://www.linkedin.com/company/lourdes-rugby-club/" },
  ],
};

export const nav = [
  { key: "inicio", label: "Inicio", href: "/" },
  { key: "nosotros", label: "Nosotros", href: "/nosotros/" },
  { key: "trabajo", label: "Nuestro trabajo", href: "/nuestro-trabajo/" },
  { key: "impacto", label: "Impacto", href: "/impacto/" },
  { key: "galeria", label: "Galería", href: "/galeria/" },
  { key: "contacto", label: "Contacto", href: "/contacto/" },
];

/** Mensajes de WhatsApp prearmados según el motivo. */
export const waMessages = {
  general: "Hola, les escribo desde la página web de Lourdes Rugby Club.",
  voluntario: "Hola, les escribo desde la página web. Quiero sumarme como voluntario/a de Lourdes Rugby Club.",
  inscripcion: "Hola, les escribo desde la página web. Quiero información para que mi hijo/a juegue en Lourdes Rugby Club.",
  empresa: "Hola, les escribo desde la página web. Represento a una empresa/institución y queremos colaborar con Lourdes Rugby Club.",
  especie: "Hola, les escribo desde la página web. Quiero donar materiales o indumentaria para Lourdes Rugby Club.",
};

export const whatsappUrl = (motivo = "general") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(waMessages[motivo] || motivo)}`;

/** Valores (textos de la web actual). */
export const values = [
  {
    id: "equipo",
    title: "Trabajo en equipo",
    lead: "Solos se puede llegar más rápido, pero juntos se llega más lejos.",
    text: "Creemos que cada aporte es único e irrepetible, tanto dentro del campo de juego como fuera de él. La Comisión de Padres también funciona bajo esta lógica: cuando todos empujan para el mismo lado, los resultados se multiplican. Complementar capacidades individuales para alcanzar objetivos comunes es la esencia de lo que hacemos cada día en el club.",
    img: "ronda-cerrada",
  },
  {
    id: "respeto",
    title: "Respeto",
    lead: "Al rival, al árbitro y a los propios compañeros.",
    text: "En la cancha y fuera de ella, promovemos un trato amable, empático y comprensivo entre jugadores, familias y voluntarios. En Lourdes Rugby Club eso se traduce en una cultura de convivencia sana que va mucho más allá del deporte.",
    img: "ronda-encuentro",
  },
  {
    id: "compromiso",
    title: "Compromiso",
    lead: "Comprometerse con el club significa aparecer.",
    text: "En los entrenamientos, en los encuentros, en las jornadas de mantenimiento del predio y en las reuniones de la Comisión Directiva. El compromiso es el hábito que convierte a los niños de hoy en adultos responsables del mañana.",
    img: "charla-ronda",
  },
  {
    id: "esfuerzo",
    title: "Esfuerzo y disciplina",
    lead: "Celebramos cada pequeño logro porque sabemos lo que cuesta.",
    text: "La constancia de nuestros jugadores y sus familias, a pesar de cualquier adversidad, es uno de los factores más poderosos del club. El esfuerzo sostenido en el tiempo genera confianza, autoestima y capacidad de superación.",
    img: "barro",
  },
];

/** Qué hacemos (textos de "Misión e Historia"). */
export const programs = [
  {
    id: "contencion",
    n: "01",
    title: "Espacio de contención y aprendizaje",
    kicker: "Niños y niñas de 6 a 13 años",
    text: "Creamos un espacio seguro y estimulante para niños y niñas de 6 a 13 años, donde se divierten, hacen amigos y aprenden los valores fundamentales del rugby: el respeto, el esfuerzo, la disciplina y la solidaridad. Cada entrenamiento es una oportunidad para que los chicos desarrollen habilidades físicas, emocionales y sociales que los acompañarán toda la vida.",
    points: ["Entrenamientos de rugby", "Habilidades físicas, emocionales y sociales", "Valores del rugby: respeto, esfuerzo, disciplina, solidaridad"],
    img: "entrada-en-calor",
    img2: "tres-pelotas",
  },
  {
    id: "familia",
    n: "02",
    title: "Comunidad y familia",
    kicker: "Comisión Directiva de Padres",
    text: "Sabemos que para transformar la vida de un niño hay que involucrar a toda su familia. Por eso formamos una Comisión Directiva de Padres activa, donde madres y padres trabajan en equipo, asumen responsabilidades y se convierten en protagonistas del club. Este modelo fortalece los vínculos familiares y genera un sentido de pertenencia y orgullo en todo el barrio.",
    points: ["Madres y padres protagonistas del club", "Jornadas de mantenimiento del predio", "Sentido de pertenencia en todo el barrio"],
    img: "foto-grupal",
    img2: "cinco-abrazados",
  },
  {
    id: "barrio",
    n: "03",
    title: "Oportunidades para el barrio",
    kicker: "Encuentros, visitas y red comunitaria",
    text: "Más allá del deporte, Lourdes Rugby Club genera nuevas aspiraciones para el Barrio Argüello Lourdes. Participamos en encuentros y torneos regionales, recibimos visitas de otros clubes y organizaciones, gestionamos donaciones y colaboramos con la red comunitaria de la Capilla Nuestra Señora de Lourdes. Cada acción del club es un mensaje claro: acá hay futuro.",
    points: ["Encuentros y torneos regionales", "Visitas de otros clubes y organizaciones", "Red comunitaria de la Capilla Nuestra Señora de Lourdes"],
    img: "equipo-encuentro",
    img2: "ronda-encuentro",
  },
];

/** Los cinco pilares del concepto (cada uno anclado en un texto real del club). */
export const pillars = [
  {
    id: "deporte",
    word: "Deporte",
    title: "El rugby como escuela de vida",
    text: "Entendemos el rugby como una escuela de vida donde se aprende a trabajar en equipo, a respetar al otro y a comprometerse con algo más grande que uno mismo.",
    img: "pelota-en-alto",
  },
  {
    id: "inclusion",
    word: "Inclusión",
    title: "Una cancha para cada chico del barrio",
    text: "Trabajamos para que cada chico del barrio tenga la posibilidad de calzarse los botines y salir a la cancha, sin importar de dónde venga.",
    img: "seis-en-la-tierra",
  },
  {
    id: "educacion",
    word: "Educación",
    title: "Valores que acompañan toda la vida",
    text: "Cada entrenamiento es una oportunidad para desarrollar habilidades físicas, emocionales y sociales: respeto, esfuerzo, disciplina y solidaridad.",
    img: "charla-entrenador",
  },
  {
    id: "comunidad",
    word: "Comunidad",
    title: "Familias que empujan para el mismo lado",
    text: "Para transformar la vida de un niño hay que involucrar a toda su familia. Madres y padres son protagonistas del club.",
    img: "foto-grupal",
  },
  {
    id: "transformacion",
    word: "Transformación",
    title: "Acá hay futuro",
    text: "Desde sus comienzos, el club fue concebido como una herramienta de transformación social: un canal de participación, inclusión y superación para los chicos y las familias del barrio.",
    img: "cinco-abrazados",
  },
];

/** Fotos de la galería: slug, texto alternativo, categoría. */
export const gallery = [
  { slug: "cinco-abrazados", alt: "Cinco chicos del club abrazados y sonriendo con la camiseta azul y amarilla", cat: "comunidad" },
  { slug: "nene-pelota", alt: "Un niño pequeño apoyado sobre una pelota de rugby, en blanco y negro", cat: "entrenamientos" },
  { slug: "entrada-en-calor", alt: "Chicos en fila haciendo la entrada en calor en una cancha arbolada", cat: "entrenamientos" },
  { slug: "foto-grupal", alt: "Foto grupal de jugadores, jugadoras y adultos del club con camisetas a rayas amarillas y negras", cat: "comunidad" },
  { slug: "barro", alt: "Chicos embarrados y sonrientes tirados en la cancha después de jugar bajo la lluvia", cat: "entrenamientos" },
  { slug: "ronda-encuentro", alt: "Ronda de chicos de distintos clubes abrazados durante un encuentro", cat: "encuentros" },
  { slug: "espaldas-44-35", alt: "Dos jugadores de espaldas, abrazados, con las camisetas número 44 y 35", cat: "encuentros" },
  { slug: "pelota-en-alto", alt: "Un chico sostiene una pelota de rugby sobre su cabeza rodeado de compañeros", cat: "entrenamientos" },
  { slug: "equipo-cesped", alt: "Equipo infantil y entrenadores posando en el césped bajo el cielo azul", cat: "encuentros" },
  { slug: "yo-quiero-mi-cancha", alt: "Un chico con la camiseta del club sostiene un cartel con la consigna #YoQuieroMiCancha", cat: "comunidad" },
  { slug: "ronda-tierra", alt: "Ronda de jugadores y entrenadores en una cancha de tierra", cat: "entrenamientos" },
  { slug: "tres-pelotas", alt: "Tres chicos con la camiseta del club sostienen pelotas de rugby y sonríen", cat: "entrenamientos" },
  { slug: "sonrisas", alt: "Fila de chicos sonrientes con camisetas a rayas, en blanco y negro", cat: "comunidad" },
  { slug: "equipo-encuentro", alt: "Equipo y entrenadores posando en la cancha durante un encuentro", cat: "encuentros" },
  { slug: "espaldas-26-41", alt: "Jugadores abrazados de espaldas con las camisetas 26, 41 y 57", cat: "encuentros" },
  { slug: "cuatro-abrazados", alt: "Cuatro chicos abrazados como en un scrum, mirando a la cámara", cat: "comunidad" },
  { slug: "charla-entrenador", alt: "Un entrenador habla con los jugadores abrazados en ronda", cat: "entrenamientos" },
  { slug: "seis-en-la-tierra", alt: "Seis chicos con camisetas a rayas posan en una cancha de tierra", cat: "entrenamientos" },
  { slug: "ronda-cerrada", alt: "Ronda cerrada de jugadores abrazados, en blanco y negro", cat: "entrenamientos" },
  { slug: "equipo-palos", alt: "El equipo posa debajo de los palos de rugby", cat: "encuentros" },
  { slug: "abrazo-en-la-tierra", alt: "Dos chicos abrazados cabeza con cabeza sobre una cancha de tierra", cat: "entrenamientos" },
  { slug: "ronda-amarilla", alt: "Ronda de jugadores con camisetas amarillas y negras en la cancha", cat: "encuentros" },
  { slug: "entrenamiento", alt: "Chicos entrenando en fila sobre el césped", cat: "entrenamientos" },
  { slug: "charla-ronda", alt: "Jugadores y entrenador reunidos en ronda en la cancha de tierra", cat: "entrenamientos" },
  { slug: "espaldas-26", alt: "Jugadores de espaldas abrazados con la camiseta número 26 al centro", cat: "encuentros" },
  { slug: "ronda-abrazados", alt: "Chicos abrazados en ronda, en blanco y negro", cat: "comunidad" },
];

export const galleryCats = [
  { id: "todas", label: "Todas" },
  { id: "entrenamientos", label: "Entrenamientos" },
  { id: "encuentros", label: "Encuentros" },
  { id: "comunidad", label: "Comunidad" },
];

/** Textos alternativos centralizados (reutilizados en todas las páginas). */
export const alt = Object.fromEntries(gallery.map((g) => [g.slug, g.alt]));
