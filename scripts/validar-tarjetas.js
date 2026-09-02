#!/usr/bin/env node
/**
 * validar-tarjetas.js - El contador de variedad visual del guion.
 *
 * Lee el guion del día, cuenta las marcas de tarjeta por tipo y AVISA cuando
 * se rompe una cuota o una marca está malformada. No bloquea nada: una regla
 * en un prompt es una intención; esto es la medición de la salida (pedido de
 * Santiago, 01-09: "hay que súper validar"). Árbol y cuotas:
 * ideas/tarjetas-cuando-usar-cada-una.md.
 *
 * Uso:
 *   node scripts/validar-tarjetas.js [--fecha 2026-09-01] [ruta/al/guion.md] [--estricto]
 *   (--estricto: sale con código 1 si hay avisos; por defecto siempre 0)
 */
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const fecha = opt("--fecha") || new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const ruta = args.find((a) => a.endsWith(".md")) || path.join("contenido", "guiones", "informe", `${fecha}.md`);
if (!fs.existsSync(ruta)) { console.log(`(sin guion en ${ruta}: nada que contar)`); process.exit(0); }

const TIPOS = ["cifra", "cambio", "barras", "lineas", "comparacion", "marcador", "tabla"];
const lineas = fs.readFileSync(ruta, "utf8").split("\n");

let bloque = "(sin sección)";
let fuentes = 0;
const tarjetas = []; // { tipo, bloque, linea, valores }
const tesis = []; // { largo, bloque, linea, pegada }
for (let i = 0; i < lineas.length; i++) {
  const l = lineas[i].trim();
  if (l.startsWith("## ")) { bloque = l.slice(3).trim(); continue; }
  if (/^\[FUENTE /.test(l)) { fuentes++; continue; }
  // La tesis va a una tarjeta pensada para 18 palabras. Un texto muy largo
  // significa casi siempre que el parser se comió el párrafo siguiente
  // (BUG 1, 02-09), y eso se ve como texto desbordado en el video.
  let mt;
  if ((mt = l.match(/^\[TESIS\]\s*(.*)$/i))) {
    tesis.push({ largo: mt[1].trim().length, bloque, linea: i + 1, pegada: (lineas[i + 1] || "").trim() !== "" && !/^(\[|## )/.test((lineas[i + 1] || "").trim()) });
    continue;
  }
  let m;
  if ((m = l.match(/^\[DATO\s+(\S+)\s*\|[^\]]*\]\s*(.*)$/))) {
    const valores = m[2].split(";").map((s) => s.trim()).filter(Boolean);
    tarjetas.push({ tipo: m[1].toLowerCase(), bloque, linea: i + 1, valores });
  } else if (/^\[ESQUEMA[\s|]/.test(l)) {
    tarjetas.push({ tipo: "esquema", bloque, linea: i + 1, valores: [] });
  } else if (/^\[CITA[\s|]/.test(l)) {
    tarjetas.push({ tipo: "cita", bloque, linea: i + 1, valores: [] });
  }
}

const avisos = [];
const conteo = {};
for (const t of tarjetas) conteo[t.tipo] = (conteo[t.tipo] || 0) + 1;

// 1. tipos desconocidos y marcas malformadas
for (const t of tarjetas) {
  if (!TIPOS.includes(t.tipo) && t.tipo !== "esquema" && t.tipo !== "cita")
    avisos.push(`línea ${t.linea}: tipo desconocido "${t.tipo}"`);
  if (t.tipo === "cifra" && t.valores.length > 1)
    avisos.push(`línea ${t.linea}: [DATO cifra] con ${t.valores.length} valores; una cifra lleva UN valor (fila 7 del árbol; el resto va a narración u otro tipo)`);
  if (t.tipo === "cambio" && t.valores.length === 1 && !/->/.test(t.valores[0]))
    avisos.push(`línea ${t.linea}: [DATO cambio] sin "antes -> después"`);
  if (t.tipo === "lineas")
    avisos.push(`línea ${t.linea}: [DATO lineas] aún no está construida (hoy dibuja una comparación); usar cambio con el primer y el último valor`);
}

// 1b. tesis desbordada o pegada al párrafo (BUG 1)
for (const t of tesis) {
  if (t.pegada)
    avisos.push(`línea ${t.linea}: [TESIS] pegada al párrafo siguiente sin línea en blanco (bloque "${t.bloque}"): el parser se lo traga y el texto se desborda del video`);
  if (t.largo > 180)
    avisos.push(`línea ${t.linea}: [TESIS] de ${t.largo} caracteres en el bloque "${t.bloque}" (tope 180; el prompt pide 18 palabras)`);
}

// 2. más de dos cifra seguidas (cualquier otra tarjeta corta la racha)
let racha = 0;
for (const t of tarjetas) {
  racha = t.tipo === "cifra" ? racha + 1 : 0;
  if (racha === 3) avisos.push(`línea ${t.linea}: tercera [DATO cifra] seguida (cuota: máximo dos)`);
}

// 3. dos del mismo tipo seguidas dentro del mismo bloque
for (let i = 1; i < tarjetas.length; i++) {
  const a = tarjetas[i - 1], b = tarjetas[i];
  if (a.bloque === b.bloque && a.tipo === b.tipo)
    avisos.push(`línea ${b.linea}: dos "${b.tipo}" seguidas en el bloque "${b.bloque}"`);
}

// 4. cuotas de edición (solo con material suficiente)
if (fuentes >= 8) {
  if (!conteo.esquema) avisos.push(`edición con ${fuentes} bloques de noticia y ningún [ESQUEMA] (¿ninguna noticia de proceso hoy?)`);
  if (!conteo.barras && !conteo.tabla && !conteo.comparacion)
    avisos.push(`edición con ${fuentes} bloques de noticia y ninguna barras/tabla/comparacion`);
}
if (tarjetas.length >= 3 && Object.keys(conteo).length < 3)
  avisos.push(`solo ${Object.keys(conteo).length} tipo(s) de tarjeta en ${tarjetas.length} marcas (cuota: al menos tres tipos)`);

const resumen = Object.entries(conteo).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}: ${n}`).join(" · ") || "sin tarjetas";
console.log(`tarjetas de ${path.basename(ruta)} (${fuentes} bloques con fuente): ${resumen}`);
if (avisos.length) {
  console.log(`AVISOS (${avisos.length}):`);
  for (const a of avisos) console.log(`  - ${a}`);
} else {
  console.log("variedad OK: ninguna cuota rota, ninguna marca malformada.");
}
// La cuota es una alarma, no una obligación: por defecto no bloquea nada.
process.exit(args.includes("--estricto") && avisos.length ? 1 : 0);
