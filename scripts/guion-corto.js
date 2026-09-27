#!/usr/bin/env node
/**
 * guion-corto.js - Recorta un guion del informe a la portada, la principal y
 * una o dos secciones, para probar la VOZ sin gastar el cupo entero.
 *
 * Uso: node scripts/guion-corto.js contenido/guiones/informe/FECHA.md out.md [secciones]
 *
 * Por qué existe (27-09-2026, lo pidió Santiago: "prepara una presentación
 * corta para tener para renderizar la voz, 1 o 2 secciones"). Cada prueba con
 * voz real costaba 11.000 caracteres de Azure y 25 minutos de render, y las
 * cosas que estamos ajustando (el titular hablado, el recorrido, el barrido)
 * se ven todas en los primeros dos minutos. Tres corridas de esas se comieron
 * el 6,6% del cupo del mes en una tarde.
 *
 * Qué conserva, y por qué: la cabecera del guion entera (título, carátulas,
 * clima), "La noticia del día" y la "Apertura", porque ahí está la portada y
 * la melodía de apertura; después, las primeras N secciones de noticia; y el
 * "Cierre", para que el final suene como suena de verdad. Lo que se cae son
 * las otras secciones, "En titulares" y la "Agenda", que es donde está el
 * grueso de los caracteres.
 */
const fs = require("fs");

const [, , entrada, salida, nSec = "2"] = process.argv;
if (!entrada || !salida) {
  console.error("Uso: node scripts/guion-corto.js <guion.md> <salida.md> [secciones]");
  process.exit(2);
}
const N = Math.max(1, Number(nSec) || 2);
const texto = fs.readFileSync(entrada, "utf8");

// la cabecera es todo lo que va antes del primer "## "
const iPrimera = texto.search(/^## /m);
if (iPrimera < 0) { console.error("ese guion no tiene secciones"); process.exit(1); }
const cabecera = texto.slice(0, iPrimera);
const bloques = texto.slice(iPrimera).split(/^(?=## )/m).filter((b) => b.trim());

const nombre = (b) => (b.match(/^## (.+)$/m) || [, ""])[1].replace(/\s*\[[^\]]+\]\s*$/, "").trim();
const SIEMPRE = /^(la noticia del d[ií]a|apertura)$/i;
const FUERA = /^(en titulares|agenda|¿en qu[eé] qued[oó]\?)$/i;
const ES_CIERRE = /^cierre$/i;

const salen = [];
let noticias = 0;
for (const b of bloques) {
  const n = nombre(b);
  if (SIEMPRE.test(n)) { salen.push(b); continue; }
  if (ES_CIERRE.test(n) || FUERA.test(n)) continue;
  if (noticias < N) { salen.push(b); noticias++; }
}
const cierre = bloques.find((b) => ES_CIERRE.test(nombre(b)));
if (cierre) salen.push(cierre);

// "Fuentes:" vive dentro del último bloque del guion y parse.js lo necesita
const conFuentes = texto.match(/^Fuentes:[\s\S]*$/m);
let out = cabecera + salen.join("");
if (conFuentes && !/^Fuentes:/m.test(out)) out += "\n" + conFuentes[0];

fs.writeFileSync(salida, out);
const narrado = (s) => s.split("\n").filter((l) => l.trim() && !/^(#|\[)/.test(l)).join(" ").length;
console.log(`${salida}: ${salen.length} bloques (${noticias} de noticia), ${narrado(out)} caracteres narrados de ${narrado(texto)} (${Math.round(narrado(out) / narrado(texto) * 100)}%)`);
console.log(`bloques: ${salen.map(nombre).join(" · ")}`);
