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
const circulares = []; // líneas de [DATO]/[CITA] con el Informe diario como fuente
for (let i = 0; i < lineas.length; i++) {
  const l = lineas[i].trim();
  if (l.startsWith("## ")) { bloque = l.slice(3).trim(); continue; }
  if (/^\[FUENTE /.test(l)) { fuentes++; continue; }
  // La marca DIARIO de "Entender el caso" (02-11-2026) es el escenario de la
  // sección, no una tarjeta ni texto narrado: no entra a ninguna cuota. El
  // conteo de palabras ya salta toda línea que abre con corchete; esto lo
  // deja dicho para que nadie la cuente como marca desconocida mañana.
  if (/^\[DIARIO\b/i.test(l)) continue;
  // La tesis va a una tarjeta pensada para 18 palabras. Un texto muy largo
  // significa casi siempre que el parser se comió el párrafo siguiente
  // (BUG 1, 02-09), y eso se ve como texto desbordado en el video.
  let mt;
  if ((mt = l.match(/^\[TESIS\]\s*(.*)$/i))) {
    tesis.push({ largo: mt[1].trim().length, bloque, linea: i + 1, pegada: (lineas[i + 1] || "").trim() !== "" && !/^(\[|## )/.test((lineas[i + 1] || "").trim()) });
    continue;
  }
  let m;
  // Fuente circular: un [DATO]/[CITA] que cita al propio Informe diario como
  // fuente de una cifra (04-09, gancho de la Clave). La fuente de una marca
  // es la primaria; el informe se puede nombrar en la prosa, no en la marca.
  if (/^\[(DATO|CITA)\b[^\]]*\|[^\]]*(entender chile|informe diario)/i.test(l))
    circulares.push(i + 1);
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
const esClave = /guiones[\\/]claves[\\/]/.test(ruta);
// Carátula sugerida (regla 05-09): el gancho de la miniatura lo escribe el
// guionista; sin la línea, dia.js cae al título recortado (funciona, pero
// pierde el gancho pensado). Avisar para que el ciclo aprenda.
if (!lineas.some((l) => /^car[áa]tula sugerida:/i.test(l.trim().replace(/\*\*/g, "")))) {
  avisos.push('sin línea "Carátula sugerida:": la miniatura usará el título recortado en vez de un gancho pensado (prompts/guion-informe.md y guion-claves.md la exigen desde el 05-09)');
}
// Carátulas v3 (20-09, solo el informe): tres ganchos de dos líneas, hasta
// cuatro palabras por línea. Más palabras no caben en las cajas; sin " / "
// el render parte la frase al medio a ciegas.
if (!esClave) {
  const cars = lineas.map((l) => l.trim().replace(/\*\*/g, "")).map((l) => l.match(/^car[áa]tula\s*(sugerida|2|3):\s*(.+)$/i)).filter(Boolean);
  if (cars.length && cars.length < 3) avisos.push(`carátulas: hay ${cars.length} y el prompt pide tres ("Carátula sugerida:", "Carátula 2:", "Carátula 3:"); sin las otras dos no hay prueba A/B`);
  for (const c of cars) {
    const partes = c[2].split(/\s*\/\s*/).map((s) => s.trim()).filter(Boolean);
    if (partes.length !== 2) { avisos.push(`carátula ${c[1]}: debe traer DOS líneas separadas por " / " ("${c[2]}")`); continue; }
    for (const p of partes) if (p.split(/\s+/).length > 4) avisos.push(`carátula ${c[1]}: "${p}" tiene ${p.split(/\s+/).length} palabras (máximo cuatro por línea)`);
  }
}
// Techo de duración (auditoría 03-09): palabras NARRADAS, o sea antes del
// bloque "Fuentes:" y sin marcas ni encabezados. Calibrado con audio real
// del 03-09: 1.590 narradas = 11,9 min → ~135 ppm; 13 min ≈ 1.760.
// Desde el 12-10-2026 se cuenta solo DESPUÉS de "Guion:": con el informe de
// 3 a 4 minutos el piso es de 420 palabras, y las carátulas, el clima y la
// descripción de varias líneas inflaban el conteo en 40 a 80 palabras que la
// voz no lee, lo bastante para que un guion corto pasara el piso sin tenerlo.
const corteFuentes = lineas.findIndex((l) => /^Fuentes:/.test(l.trim()));
const inicioGuion = lineas.findIndex((l) => /^Guion:\s*$/.test(l.trim()));
const narrables = (corteFuentes >= 0 ? lineas.slice(0, corteFuentes) : lineas);
const narradas = narrables.filter((l, i) => i > inicioGuion && l.trim() && !/^(\[|## |#|Título sugerido:|Descripción sugerida:|Guion:)/.test(l.trim()))
  .join(" ").split(/\s+/).filter(Boolean).length;
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
// Con el informe corto (12-10-2026) caben tres a seis tarjetas en total, y
// pedir tres tipos obligaba a forzar una tarjeta que el dato no trae, que es
// justo lo que la regla de variedad prohíbe. La Clave sigue con la de antes.
if (esClave && tarjetas.length >= 3 && Object.keys(conteo).length < 3)
  avisos.push(`solo ${Object.keys(conteo).length} tipo(s) de tarjeta en ${tarjetas.length} marcas (cuota: al menos tres tipos)`);
if (!esClave && tarjetas.length >= 4 && Object.keys(conteo).length < 2)
  avisos.push(`solo un tipo de tarjeta en ${tarjetas.length} marcas (cuota del informe corto: al menos dos tipos)`);

for (const n of circulares)
  avisos.push(`línea ${n}: la marca cita "Informe diario de Entender Chile" como fuente; va la fuente primaria (el informe solo se nombra en la prosa)`);

// Números compuestos en la prosa ("tres mil seiscientos cuarenta millones
// quinientos cuarenta y cuatro mil ochocientos pesos"): el conversor ya los
// junta, pero si la pantalla igual mostrara "3.640 millones 544.800" es que
// algo se rompió. Se mide la salida real del conversor, no la intención.
{
  const { aNumerales } = require("./numerales");
  narrables.forEach((l, i) => {
    if (!l.trim() || /^(\[|## |#)/.test(l.trim())) return;
    const t = aNumerales(l);
    if (/\d[\d.]*\s+(millones|millón)\s+\d/.test(t))
      avisos.push(`línea ${i + 1}: cifra compuesta partida en pantalla ("${t.match(/\d[\d.]*\s+(?:millones|millón)\s+\d[\d.]*/)[0]}")`);
    // Redondeo en voz (Santiago, 04-09): más de tres cifras significativas
    // habladas desconcentran. 762.326 o 3.640.544.800 en la narración son
    // aviso; 25.000, 3.640 millones, años, leyes y votaciones no.
    const re = /(?:^|[^\d.,])(\d{1,3}(?:\.\d{3})+)(?![\d.,]*%)/g;
    let m;
    while ((m = re.exec(t))) {
      const antes = t.slice(Math.max(0, m.index - 14), m.index + 1).toLowerCase();
      if (/(ley|n°|nº|decreto|rol|causa|folio|artículo|art\.)\s*(n°|nº)?\s*$/.test(antes)) continue;
      const valor = Number(m[1].replace(/\./g, ""));
      if (valor >= 1500 && valor <= 2099 && /(de|en|año|desde|hasta|del)\s$/.test(antes)) continue; // "tratados de 1881": un año
      const digitos = m[1].replace(/\./g, "").replace(/0+$/, "");
      if (digitos.length > 3) avisos.push(`línea ${i + 1}: cifra exacta en voz ("${m[1]}"): redondear a tres cifras significativas ("más de ...") y dejar el número exacto en la marca [DATO]`);
    }
  });
}

// Piso de la Clave (Santiago, 09-09, aplicado el 13-09): 8 minutos ≈ 1.080
// palabras narradas. El techo de 13 min sigue rigiendo para las dos series.
if (esClave && narradas < 1050)
  avisos.push(`guion de ${narradas} palabras narradas (~${(narradas / 135).toFixed(1)} min a 135 ppm reales): bajo el PISO de 8 min de la Clave (1.080)`);
if (esClave && narradas > 1760)
  avisos.push(`guion de ${narradas} palabras narradas (~${(narradas / 135).toFixed(1)} min a 135 ppm reales): sobre el techo de 13 min de la promesa (1.760)`);
// El informe pasa a 3 o 4 minutos (Santiago, 12-10-2026): el largo de 10 a 12
// juntaba 2 a 80 vistas con 10 a 30% visto y la mitad se iba antes del
// segundo 40. 420 a 600 narradas, a 135 ppm, son 3,1 a 4,4 min de voz. Y el
// formato son tres noticias, sin el barrido de titulares: una cuarta sección
// o un "En titulares" es el guionista volviendo al formato largo.
if (!esClave) {
  if (narradas < 420)
    avisos.push(`guion de ${narradas} palabras narradas (~${(narradas / 135).toFixed(1)} min): bajo el piso del informe corto (420, unos 3 min)`);
  if (narradas > 600)
    avisos.push(`guion de ${narradas} palabras narradas (~${(narradas / 135).toFixed(1)} min): sobre el techo del informe corto (600, unos 4,4 min)`);
  const noticias = lineas.filter((l) => /^## .+\[[a-z-]+\]\s*$/.test(l.trim())).length;
  if (noticias !== 3)
    avisos.push(`${noticias} secciones de noticia: el informe corto narra exactamente tres`);
  if (lineas.some((l) => /^## (En titulares|Dato curioso|Agenda|¿En qu[eé] qued[oó]\?)\s*$/i.test(l.trim())))
    avisos.push(`el guion trae una sección de la cola del formato largo (En titulares, Dato curioso, Agenda o ¿En qué quedó?), retirada el 12-10-2026`);
}

const resumen = Object.entries(conteo).sort((a, b) => b[1] - a[1]).map(([t, n]) => `${t}: ${n}`).join(" · ") || "sin tarjetas";
console.log(`tarjetas de ${path.basename(ruta)} (${fuentes} bloques con fuente, ${narradas} palabras narradas, ~${(narradas / 135).toFixed(1)} min): ${resumen}`);
if (avisos.length) {
  console.log(`AVISOS (${avisos.length}):`);
  for (const a of avisos) console.log(`  - ${a}`);
} else {
  console.log("variedad OK: ninguna cuota rota, ninguna marca malformada.");
}
// La cuota es una alarma, no una obligación: por defecto no bloquea nada.
process.exit(args.includes("--estricto") && avisos.length ? 1 : 0);
