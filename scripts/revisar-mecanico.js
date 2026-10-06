#!/usr/bin/env node
/**
 * revisar-mecanico.js - Las comprobaciones que NO necesitan criterio.
 *
 * Por qué existe (06-10-2026). Medidas las 47 vueltas de corrección de los
 * catorce días anteriores, diez gastaron un turno entero de GPT por UN SOLO
 * hallazgo, y siete de esos diez eran de formato o de estructura: un titular
 * de trece palabras, el bloque "Fuentes:" ausente, el formato de dos líneas de
 * la preselección roto, una línea en blanco que faltaba después de una [TESIS].
 * Cosas que un grep encuentra en un segundo y por las que estábamos pagando
 * una vuelta completa de la cadena: el validador mira la pieza, escribe el
 * veredicto, GPT despierta, corrige una coma y vuelve a entregar.
 *
 * LA REGLA QUE MANDA ACÁ: solo entra lo que es CIERTO. Un falso positivo
 * cuesta exactamente la vuelta que este script existe para ahorrar, así que
 * ante la duda la comprobación no se escribe. Nada que dependa del contexto,
 * del sentido o de la fuente: eso es del validador, que sabe leer.
 *
 * Por eso quedaron FUERA, a propósito:
 *   - "hoy" y "mañana" como referencias temporales: el informe tiene una línea
 *     obligatoria que se llama "Para salir hoy", y "la mañana" es un sustantivo.
 *   - las fechas en prosa tipo "23 de septiembre": las marcas [DATO] y [FUENTE]
 *     usan legítimamente "INE, 30 sep", y distinguir prosa de marca sin
 *     entender la línea es justo donde nacen los falsos positivos.
 *   - el formato de dos líneas de la preselección. Se escribió, se probó sobre
 *     los seis días de octubre y marcó 70 viñetas legítimas: las de "Áreas sin
 *     material hoy", "Historias en curso sin novedad" y "Notas del barrido",
 *     que son listas de prosa y no llevan barras. La regla solo rige en las
 *     secciones de noticias, y distinguirlas pide leer los encabezados de cada
 *     día, que cambian. Esa regla apareció UNA vez en catorce días: no paga el
 *     riesgo. Queda para el validador, que sabe en qué sección está parado.
 *
 * Y dos exclusiones dentro de la comprobación de fechas relativas, las dos
 * descubiertas probándola contra los guiones ya aprobados:
 *   - las líneas de gancho ("Carátula sugerida:", "Carátula 2:", "Título
 *     sugerido:") no son prosa, son titulares. "Ayer era pronóstico, hoy hay
 *     evacuados" es una figura, no una fecha sin resolver, y corregirla
 *     empeoraría la carátula.
 *   - una referencia relativa RESUELTA en la misma línea por una fecha absoluta
 *     no infringe nada: "Este lunes cinco de octubre" dice exactamente cuándo.
 *     Lo que la regla 35 persigue es la referencia que queda colgando.
 *
 * Uso:  node scripts/revisar-mecanico.js <archivo> [...]
 * Sale con 1 si encontró algo, con 0 si no. Imprime una línea por hallazgo,
 * con el número de línea, para que se pueda pegar tal cual en un veredicto.
 */
const fs = require("fs");
const path = require("path");

// Referencias temporales relativas: regla dura 35. Solo las inequívocas.
const RELATIVAS = [
  /\bayer\b/i, /\banteayer\b/i, /\banoche\b/i,
  /\besta semana\b/i, /\besta madrugada\b/i, /\beste lunes\b/i,
  /\bla semana pasada\b/i, /\bel mes pasado\b/i, /\bel año pasado\b/i,
  /\bla próxima semana\b/i, /\bel próximo mes\b/i,
];

const palabras = (s) => s.trim().split(/\s+/).filter(Boolean).length;

// Una fecha absoluta en la misma línea RESUELVE la referencia relativa.
const MESES = "enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre";
const ABSOLUTA = new RegExp(`\\b\\d{2}-\\d{2}-\\d{4}\\b|\\b(${MESES})\\b|\\b\\d{1,2}\\s+(ene|feb|mar|abr|may|jun|jul|ago|sep|sept|oct|nov|dic)\\b`, "i");
// Los ganchos no son prosa: son titulares de carátula.
const ES_GANCHO = /^\s*(Carátula(\s+\d+|\s+sugerida)?|Título(\s+\d+|\s+sugerido)?|Clima de carátula)\s*:/i;

// Qué pieza es, por su ruta: cada una tiene comprobaciones distintas.
const pieza = (ruta) => {
  const p = ruta.replace(/\\/g, "/");
  if (p.includes("/guiones/")) return "guion";
  if (p.includes("/informes/")) return "informe";
  return "otra";
};

function revisar(ruta) {
  const hallazgos = [];
  const anotar = (linea, regla, debe) => hallazgos.push({ ruta, linea, regla, debe });
  if (!fs.existsSync(ruta)) { anotar(0, "el archivo existe", `crear ${ruta}`); return hallazgos; }
  const texto = fs.readFileSync(ruta, "utf8");
  const lineas = texto.split("\n");
  const tipo = pieza(ruta);

  // 1. Referencias temporales relativas. Vale para todas las piezas.
  lineas.forEach((l, i) => {
    if (ES_GANCHO.test(l) || ABSOLUTA.test(l)) return;   // ver las exclusiones de la cabecera
    const m = RELATIVAS.find((r) => r.test(l));
    if (m) anotar(i + 1, "regla dura 35: fechas absolutas, nunca una referencia relativa",
      `reemplazar "${(l.match(m) || [])[0]}" por la fecha en DD-MM-AAAA, o resolverla en la misma frase`);
  });

  if (tipo === "guion") {
    // 2. Titulares de más de 12 palabras, solo dentro del bloque "En titulares".
    let dentro = false;
    lineas.forEach((l, i) => {
      if (/^##\s/.test(l)) dentro = /^##\s+En titulares/i.test(l);
      if (!dentro) return;
      const t = l.trim();
      if (!t || /^##/.test(t) || /^Y en titulares:/i.test(t) || /^\[/.test(t) || /^Fuentes:/i.test(t)) return;
      const n = palabras(t);
      if (n > 12) anotar(i + 1, "EN TITULARES: cada frase, MÁXIMO 12 PALABRAS",
        `recortar de ${n} a 12 palabras o menos, sin convertir un anuncio en un hecho`);
    });

    // 3. El bloque "Fuentes:" tiene que existir y no puede ir vacío.
    const iF = lineas.findIndex((l) => /^Fuentes:\s*$/i.test(l.trim()));
    if (iF === -1) anotar(lineas.length, 'el guion cierra con una lista "Fuentes:"',
      'agregar la sección "Fuentes:" con una línea por fuente');
    else if (!lineas.slice(iF + 1).some((l) => l.trim())) anotar(iF + 1,
      'la lista "Fuentes:" lleva una línea por cada fuente', "llenarla: quedó vacía");

    // 4. Línea en blanco después de cada [TESIS]. Sin ella el párrafo entra
    //    dentro de la tarjeta y el texto se sale del video (01-09 y 02-09).
    lineas.forEach((l, i) => {
      if (!/^\[TESIS\]/.test(l.trim())) return;
      const sig = lineas[i + 1];
      if (sig !== undefined && sig.trim() !== "") anotar(i + 1,
        "FORMATO, REGLA DURA: después de cada [TESIS] va una LÍNEA EN BLANCO",
        "dejar la línea en blanco antes del párrafo narrado");
    });
  }


  return hallazgos;
}

const rutas = process.argv.slice(2);
if (!rutas.length) {
  console.error("uso: node scripts/revisar-mecanico.js <archivo> [...]");
  process.exit(2);
}
const todos = rutas.flatMap(revisar);
for (const h of todos) {
  console.log(`${path.basename(h.ruta)}:${h.linea} · Regla: ${h.regla} · Debe quedar: ${h.debe}`);
}
if (!todos.length) console.log("sin hallazgos mecánicos.");
process.exit(todos.length ? 1 : 0);
