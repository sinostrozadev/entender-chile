#!/usr/bin/env node
/**
 * slug-noticia.js - el nombre estable de cada noticia del diario.
 *
 * Por qué existe (01-11-2026, formato "Entender el caso"). El largo por tema
 * muestra la página real del día en que salió cada noticia y hace zoom a ella.
 * El guion nombra la noticia desde el markdown del informe, mucho antes de que
 * exista ninguna captura, así que el nombre tiene que poder calcularse aquí,
 * sin Astro, y dar exactamente lo mismo que el ancla que pone la web.
 *
 * La función vive dos veces: aquí (CommonJS, para los scripts) y en
 * web/src/lib/slug-noticia.js (módulo ES, para el build). El bloque común es
 * idéntico letra por letra; scripts/slug-noticia.test.js lo compara y además
 * comprueba que los titulares de un informe den los mismos slugs en las dos.
 *
 * Uso suelto: node scripts/slug-noticia.js contenido/informes/2026-11-01.md
 *   imprime nivel, slug y titular de cada noticia, en orden de lectura.
 */
const fs = require("fs");

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

// Texto llano de un titular en markdown: lo mismo que la web lee del HTML ya
// rendido. Importan los links ([texto](url) deja solo el texto) y las
// etiquetas; el resto de la puntuación el slug la vuelve guion igual.
const llano = (md) => md
  .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
  .replace(/<[^>]+>/g, "")
  .replace(/[*`]/g, "")
  .replace(/\s+/g, " ").trim();

// Las noticias de un informe en orden de lectura: [A] y [B] son encabezados,
// [C] son viñetas (con sus líneas de continuación). Los comentarios HTML no
// se publican, así que tampoco cuentan.
function noticiasDelInforme(md) {
  const lineas = md.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const slug = repartidorDeSlugs();
  const out = [];
  for (let i = 0; i < lineas.length; i++) {
    const h = lineas[i].match(/^#{1,4}\s+\[([AB])\]\s*(.+?)\s*#*\s*$/);
    if (h) { const titular = llano(h[2]); out.push({ nivel: h[1], titular, slug: slug(titular) }); continue; }
    const c = lineas[i].match(/^\s*(?:[-*+]|\d+[.)])\s+\[C\]\s*(.*)$/);
    if (c) {
      let texto = c[1];
      while (i + 1 < lineas.length && lineas[i + 1].trim() && !/^\s*(?:[-*+]|\d+[.)])\s|^#/.test(lineas[i + 1])) texto += " " + lineas[++i].trim();
      const titular = llano(texto);
      out.push({ nivel: "C", titular, slug: slug(titular) });
    }
  }
  return out;
}

module.exports = { slugNoticia, repartidorDeSlugs, noticiasDelInforme, LARGO_SLUG };

if (require.main === module) {
  const ruta = process.argv[2];
  if (!ruta) { console.error("uso: node scripts/slug-noticia.js contenido/informes/AAAA-MM-DD.md"); process.exit(1); }
  for (const n of noticiasDelInforme(fs.readFileSync(ruta, "utf8"))) console.log(`${n.nivel}  ${n.slug}  ${n.titular}`);
}
