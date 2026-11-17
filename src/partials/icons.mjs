// Iconografía: trazo 1.8px redondeado, grilla 24px.
// Se inyecta una vez como sprite y se usa con <use href="#i-nombre">.
const paths = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  "arrow-up-right": '<path d="M7 17 17 7M8 7h9v9"/>',
  "arrow-down": '<path d="M12 4v15M6 13l6 6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/>',
  hand: '<path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V11M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V11M16 11V8.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.6a6 6 0 0 1-4.6-2.2L3.6 14.6a1.6 1.6 0 0 1 2.3-2.2L7 13.5"/>',
  handshake: '<path d="m11 7-1.3-1.2a3 3 0 0 0-4.2.1L2 9.5l5.5 5.5"/><path d="m13 7 1.3-1.2a3 3 0 0 1 4.2.1L22 9.5l-6 6"/><path d="M7.5 15 10 17.5a1.5 1.5 0 0 0 2.1-2.1M10 12.5l3.5 3.5a1.5 1.5 0 0 0 2.1-2.1L11 9.4 9 11.3a1.6 1.6 0 0 1-2.2-2.2L11 5"/>',
  box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.3l8 4.5"/>',
  family: '<circle cx="8" cy="6" r="2.4"/><circle cx="16.5" cy="9" r="1.9"/><path d="M3.5 20v-4.5A4.5 4.5 0 0 1 8 11a4.5 4.5 0 0 1 4.3 3.2M12.5 20v-2.7a4 4 0 0 1 8 0V20"/>',
  ball: '<ellipse cx="12" cy="12" rx="9.5" ry="5.6" transform="rotate(-35 12 12)"/><path d="m8.6 15.4 6.8-6.8M10.4 11.1l2.5 2.5M12 9.5l2.5 2.5M8.8 12.7l2.5 2.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  send: '<path d="M21 3 10 14M21 3l-6.5 18-4.5-7-7-4.5Z"/>',
  quote: '<path d="M10 7H6a2 2 0 0 0-2 2v3h5v5H4M20 7h-4a2 2 0 0 0-2 2v3h5v5h-5"/>',
  // Glifo oficial de WhatsApp (relleno, no trazo)
  whatsapp:
    '<path fill="currentColor" stroke="none" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>',
  instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.9" cy="7.1" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.5-1.5H17V4.5A20 20 0 0 0 14.8 4.4c-2.2 0-3.8 1.4-3.8 3.9v2.2H8.5v3H11V21"/>',
  linkedin: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  "chev-left": '<path d="m15 5-7 7 7 7"/>',
  "chev-right": '<path d="m9 5 7 7-7 7"/>',
  "chev-down": '<path d="m5 9 7 7 7-7"/>',
};

export const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(
  paths
)
  .map(
    ([k, v]) =>
      `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`
  )
  .join("")}</defs></svg>`;

export const icon = (name, cls = "") => {
  if (!paths[name]) throw new Error(`Ícono inexistente: ${name}`);
  return `<svg class="icon${cls ? " " + cls : ""}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
};
