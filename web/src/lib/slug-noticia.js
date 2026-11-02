// El ancla de cada noticia del diario (01-11-2026, formato "Entender el caso").
// El largo por tema muestra la página real del día y hace zoom a la noticia
// que narra; para eso cada noticia necesita un nombre estable que se pueda
// calcular TAMBIÉN fuera de Astro, desde el markdown del informe, porque el
// guion del largo nombra la noticia antes de que exista ninguna captura.
// Por eso esta función vive dos veces: aquí (la usa contenido.ts) y en
// scripts/slug-noticia.js (la usan los scripts, que son CommonJS). El bloque
// común es idéntico letra por letra, y scripts/slug-noticia.test.js lo
// comprueba: si alguien cambia una copia y no la otra, el test falla.

// --- inicio común (idéntico en web/src/lib/slug-noticia.js y scripts/slug-noticia.js) ---
// El slug de una noticia: minúsculas, sin tildes, guiones, a lo más 60
// caracteres cortando en un guion para no dejar media palabra. Se calcula
// sobre el titular en texto llano (sin marcas de markdown ni etiquetas).
const LARGO_SLUG = 60;
function slugNoticia(titular) {
  const s = String(titular || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (s.length <= LARGO_SLUG) return s || "noticia";
  const corto = s.slice(0, LARGO_SLUG);
  const corte = s[LARGO_SLUG] === "-" ? corto : corto.slice(0, Math.max(corto.lastIndexOf("-"), 1));
  return corte.replace(/-+$/, "") || "noticia";
}
// Repartidor de slugs de UNA página, en orden de lectura: el segundo titular
// que da el mismo slug lleva -2, el tercero -3. El orden importa: la web y
// los scripts recorren las noticias igual (A, B y C mezcladas, de arriba abajo).
function repartidorDeSlugs() {
  const usados = new Set();
  return (titular) => {
    const base = slugNoticia(titular);
    let slug = base, n = 1;
    while (usados.has(slug)) slug = `${base}-${++n}`;
    usados.add(slug);
    return slug;
  };
}
// --- fin común ---

export { slugNoticia, repartidorDeSlugs, LARGO_SLUG };
