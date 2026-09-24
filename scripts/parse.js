#!/usr/bin/env node
/**
 * parse.js - Convierte un guion marcado (.md) en:
 *   out/parsed.json     eventos estructurados con offsets de caracteres
 *   out/narracion.txt   texto limpio que se envía a la voz (TTS)
 *
 * Uso: node scripts/parse.js ejemplos/guion.md out/
 *
 * Marcas soportadas (una por línea):
 *   ## Sección
 *   [TESIS] frase
 *   [DATO tipo | fuente] etiqueta: valor ; etiqueta: valor
 *   [ESQUEMA | título] A -> B -> C
 *   [HECHO] párrafo        [INTERPRETACIÓN] párrafo
 *   [CITA | quién | fuente] texto
 *   [FUENTE medio, fecha]  fuente principal del bloque: va al pie de todas sus tarjetas
 *
 * Indicadores en los valores de [DATO]: "9,5% (sube)", "-11% (baja)", "(baja mal)",
 * "(bien)", "(mal)", "(igual)". Un valor puede ser solo el indicador: la
 * tarjeta muestra la etiqueta grande con la flecha ("Empleo formal (baja)").
 */
const fs = require("fs");
const path = require("path");
const { aNumerales, formatoCifra } = require("./numerales");

const DIRS = { sube: "sube", baja: "baja", igual: "igual" };
const SENTIDOS = { bien: "bien", mal: "mal" };
function parseNumero(raw) {
  // "-0,2%" -> {num:-0.2, unidad:"%"} ; "6.000" -> 6000 ; "49" -> 49 ; "9,5% (sube mal)" -> tendencia
  let texto = String(raw).trim();
  let tendencia = null;
  const t = texto.match(/\(\s*(sube|baja|igual|bien|mal)(?:\s+(bien|mal))?\s*\)\s*$/i);
  if (t) {
    const a = t[1].toLowerCase(), b = (t[2] || "").toLowerCase();
    tendencia = { dir: DIRS[a] || null, sentido: SENTIDOS[b] || SENTIDOS[a] || null };
    texto = texto.slice(0, t.index).trim();
  }
  texto = formatoCifra(texto); // 25000 -> 25.000 ; US$1970 millones -> US$1.970 millones
  const m = texto.match(/[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?|[+-]?\d+(?:,\d+)?/);
  const base = m
    ? { num: parseFloat(m[0].replace(/\./g, "").replace(",", ".")), unidad: texto.replace(m[0], "").trim(), raw: texto }
    : { num: null, unidad: texto, raw: texto };
  return tendencia ? { ...base, tendencia } : base;
}

// Cifra principal de un párrafo sin [DATO]: la primera que no sea fecha, hora
// ni año, con una etiqueta corta sacada de las palabras que la siguen.
const MESES = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)$/i;
const FUNCION = new Set(["en", "de", "del", "a", "al", "para", "por", "el", "la", "los", "las", "que", "y", "o", "con", "sin", "sobre", "entre", "hasta", "desde", "más", "menos", "este", "esta", "esa", "ese", "su", "sus", "un", "una", "como", "según", "durante", "tras", "pero", "aunque", "cuando", "donde", "mientras"]);
const VERBOS = /^(equivale|alcanz|lleg|subi|baj|cay|creci|pas|fue|es|son|era|eran|tiene|tienen|representa|supera|marca|deja|suma|significa|implica|muestra|registr|anot|cerr|abri|qued|sigue|mantiene|frente|contra|respecto|será|serán|habrá|hubo|hay|está|están|estaba|estaban|se|lo|le|les|ya|no|también|solo|apenas|casi|más|menos|tras|desde|hasta|durante|dijo|afirm|señal|explic|sostuvo|declar)/i;
const MAGNITUD = /^(millones|millón|millon|mil)$/i;
// Unidades que hacen que una cifra suelta valga una tarjeta sin que el guion la
// haya elegido. Lo demás (gramos, km/h, buques, toneladas) lo decide el guion:
// "500 gramos" en pantalla fue el error del 29-08.
const UNIDAD_FUERTE = /^(personas|trabajadores|trabajadoras|empleos|hogares|familias|estudiantes|alumnos|muertos|fallecidos|heridos|detenidos|casos|viviendas|votos|pesos|dólares|dolares|millones|millón|mil)$/i;
const UNIDAD = /^(de\s+(dólares|pesos|barriles|toneladas|personas|hogares|viviendas|cupos|hectáreas|litros|kilos|casos))?/i;
function cifraPrincipal(textoPantalla) {
  const re = /(?:US\$|\$)?[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?%?|(?:US\$|\$)?[+-]?\d+(?:,\d+)?%?/g;
  let m;
  while ((m = re.exec(textoPantalla))) {
    const valor = m[0];
    const antes = textoPantalla.slice(Math.max(0, m.index - 12), m.index).toLowerCase();
    const despues = textoPantalla.slice(m.index + valor.length);
    const sig = despues.trim().split(/\s+/);
    const n = Number(valor.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."));
    const conMagnitud = MAGNITUD.test((sig[0] || "").replace(/[.,;:]+$/, ""));
    // "7 de cada 10" es UNA cifra (una proporción), no dos. Sin esto el 7 se
    // descartaba por chico y salía el "10" solo, con la etiqueta cortada en
    // "personas consultadas cree que existe" (informe del 06-09, minuto 2:04).
    if (/^de\s+cada\s*$/i.test(antes.trim().slice(-8)) || /\bde\s+cada\s*$/i.test(antes)) continue; // es el M: ya lo toma el N
    const prop = despues.match(/^\s+de\s+cada\s+([\d.,]+)\s+(.*)$/i);
    if (prop) {
      const resto = prop[2].split(/\s+/);
      const palabras = [];
      for (const w of resto) {
        const limpia = w.replace(/[.,;:!?)]+$/g, "");
        if (VERBOS.test(limpia) && palabras.length) break;
        if (/^(y|e|o|u|pero|ni|que|cree|creen|piensa|piensan)$/i.test(limpia) && palabras.length) break;
        palabras.push(limpia);
        if (/[.,;:!?)]$/.test(w) || palabras.length >= 4) break;
      }
      while (palabras.length && FUNCION.has(palabras[palabras.length - 1].toLowerCase())) palabras.pop();
      const et = palabras.join(" ");
      if (!et) continue; // proporción sin sujeto claro: mejor sin tarjeta
      return { raw: `${valor} de cada ${prop[1]}`, etiqueta: et };
    }
    if (Number.isInteger(n) && n >= 1900 && n <= 2099 && !/[$%]/.test(valor) && !conMagnitud) continue;          // año
    if (sig[0] && (MESES.test(sig[0]) || (sig[0] === "de" && sig[1] && MESES.test(sig[1])))) continue;          // fecha
    if (/a las\s*$|las\s*$/.test(antes) || /^(horas?|hrs)\b/i.test(sig[0] || "")) continue;                     // hora
    if (/(millones|millón|millon|mil)\s*$/.test(antes)) continue;                                                // cola de un número compuesto ("3.640 millones 544.800"): nunca es cifra propia
    if (/^(meses|años|día|días|semanas|minutos|jornadas|veces)\b/i.test(sig[0] || "")) continue;                    // un plazo no es una cifra
    if (Math.abs(n) < 10 && !/[$%]/.test(valor) && !conMagnitud) continue;                                        // "4 países": no es una cifra grande
    if (sig.slice(0, 4).some((w, k) => k > 0 && /^\d/.test(w))) continue;                                       // rango o dos cifras seguidas: que lo elija el guion
    // valor: cifra + magnitud + unidad ("2.000 millones de pesos", "540.000 toneladas")
    let raw = valor, resto = sig;
    if (conMagnitud) {
      raw += " " + sig[0].replace(/[.,;:]+$/, ""); resto = sig.slice(1);
      const u = resto.slice(0, 2).join(" ").match(UNIDAD);
      if (u && u[0]) { raw += " " + u[0]; resto = resto.slice(2); }
    }
    // etiqueta: solo si lo que sigue es un sustantivo claro; si empieza con verbo o
    // nexo, mejor sin etiqueta (el párrafo va abajo como pie) que con una mala.
    const primera = (resto[0] || "").replace(/[.,;:!?)]+$/g, "");
    let etiqueta = "";
    if (primera && !FUNCION.has(primera.toLowerCase()) && !VERBOS.test(primera) && !/^\d/.test(primera)) {
      const palabras = [];
      for (const w of resto) {
        const limpia = w.replace(/[.,;:!?)]+$/g, "");
        if (VERBOS.test(limpia) && palabras.length) break;
        if (/^(y|e|o|u|pero|ni)$/i.test(limpia) && palabras.length) break; // "pesos y formuló un reparo" no es etiqueta
        palabras.push(limpia);
        if (/[.,;:!?)]$/.test(w) || palabras.length >= 5) break;
      }
      while (palabras.length && FUNCION.has(palabras[palabras.length - 1].toLowerCase())) palabras.pop();
      etiqueta = palabras.join(" ");
    }
    if (etiqueta.length > 60) etiqueta = "";
    const fuerte = /[%$]/.test(valor) || conMagnitud || UNIDAD_FUERTE.test(primera);
    if (!fuerte || !etiqueta) continue; // sin señal fuerte o sin contexto, no hay tarjeta automática
    return { raw: formatoCifra(raw), etiqueta };
  }
  return null;
}

function parseGuion(md) {
  const lineas = md.replace(/\r\n/g, "\n").split("\n");
  let titulo = null, caratula = null, descripcion = [], fuentes = [];
  // CLIMA DE CARÁTULA (23-09): la luz de la carátula la manda la noticia, no
  // el gusto. Sin esta línea todas salían con la misma penumbra y el canal
  // parecía una sola noticia repetida. Si el guion no la trae, vale
  // "institucional", que es el tono neutro del informe.
  let clima = null;
  const caratulas = []; // 20-09: hasta tres ganchos ("Carátula sugerida:", "Carátula 2:", "Carátula 3:")
  let zona = "pre"; // pre | descripcion | guion | fuentes
  const eventos = [];
  let buffer = null; // párrafo narrado en construcción
  let seccionNombre = "";

  const flush = () => {
    if (buffer && buffer.lineas.length) {
      eventos.push({ ...buffer, texto: buffer.lineas.join(" ").replace(/\s+/g, " ").trim(), _seccionNombre: seccionNombre });
    }
    buffer = null;
  };

  for (let cruda of lineas) {
    const linea = cruda.trim();
    const sinNegrita = linea.replace(/\*\*/g, "");

    if (/^t[íi]tulo sugerido:/i.test(sinNegrita)) { titulo = sinNegrita.replace(/^t[íi]tulo sugerido:/i, "").trim(); continue; }
    // Carátula sugerida (05-09): el gancho de 3-5 palabras para la miniatura,
    // escrito por el guionista. Dice lo que el título no dice; nunca se narra.
    { const m = sinNegrita.match(/^clima\s+de\s+car[áa]tula:\s*([a-záéíóú]+)/i); if (m) { clima = m[1].toLowerCase(); continue; } }
    if (/^car[áa]tula sugerida:/i.test(sinNegrita)) { caratula = sinNegrita.replace(/^car[áa]tula sugerida:/i, "").trim(); caratulas[0] = caratula; continue; }
    // Carátulas 2 y 3 (20-09): alternativas para la prueba A/B de YouTube.
    // Tampoco se narran: sin este continue irían a la voz como un párrafo.
    { const m = sinNegrita.match(/^car[áa]tula\s*([23]):\s*(.+)$/i); if (m) { caratulas[Number(m[1]) - 1] = m[2].trim(); continue; } }
    // El texto puede venir en la MISMA línea que la etiqueta o en las
    // siguientes: los dos guionistas alternan. Si se descarta la línea entera,
    // la descripción del video queda vacía (pasó con la Clave del 06-09, lo
    // cazó el Informe de la mañana).
    if (/^descripci[óo]n sugerida:/i.test(sinNegrita)) {
      zona = "descripcion";
      const resto = sinNegrita.replace(/^descripci[óo]n sugerida:/i, "").trim();
      if (resto) descripcion.push(resto);
      continue;
    }
    if (/^guion:/i.test(sinNegrita)) { flush(); zona = "guion"; continue; }
    if (/^fuentes:/i.test(sinNegrita)) { flush(); zona = "fuentes"; continue; }

    if (zona === "descripcion") { if (linea) descripcion.push(linea); continue; }
    if (zona === "fuentes") { if (linea) fuentes.push(linea); continue; }
    if (zona !== "guion") continue;

    if (!linea) { flush(); continue; }

    if (linea.startsWith("## ")) {
      flush();
      // CATEGORÍA DECLARADA (24-09): "## Sistema frontal [clima]". Antes la
      // sección visual se adivinaba buscando palabras clave en el TITULAR, y
      // medido sobre 510 bloques reales fallaba el 59% de las veces: el guion
      // titula "Sistema frontal" y no dice "clima", así que caía al respaldo.
      // Es el mismo error que el clima de la carátula: adivinar en vez de
      // preguntar. El corchete es opcional, así que los guiones viejos siguen
      // funcionando con el clasificador de siempre.
      const bruto = linea.slice(3).trim();
      const m = bruto.match(/^(.*?)\s*\[([a-záéíóúñ-]+)\]$/i);
      const texto = (m ? m[1] : bruto).trim();
      const categoria = m ? m[2].toLowerCase() : null;
      eventos.push({ tipo: "seccion", texto, ...(categoria ? { categoria } : {}) });
      seccionNombre = texto;
      continue;
    }

    let m;
    // La TESIS es de UNA línea por definición (el prompt le pone tope de 18
    // palabras) y se emite cerrada: si abriera buffer, el párrafo narrado que
    // venga en la línea siguiente sin línea en blanco de por medio quedaría
    // dentro de ella. Pasó el 01-09 (1 tesis) y el 02-09 (3), y el texto se
    // desbordó del video: la tarjeta de San Bernardo llegó a 578 caracteres.
    if ((m = linea.match(/^\[TESIS\]\s*(.*)$/i))) {
      flush();
      eventos.push({ tipo: "tesis", texto: m[1].trim(), _seccionNombre: seccionNombre });
      continue;
    }
    if ((m = linea.match(/^\[DATO\s+(\w+)\s*\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      const grafico = m[1].toLowerCase();
      let series = m[3].split(";").map(par => {
        const i = par.indexOf(":");
        const etiqueta = i >= 0 ? par.slice(0, i).trim() : par.trim();
        const valor = i >= 0 ? par.slice(i + 1).trim() : "";
        return { etiqueta, ...parseNumero(valor) };
      }).filter(s => s.etiqueta);
      // "cambio": etiqueta: antes -> después (indicador). Dos series, la segunda con la tendencia.
      if (grafico === "cambio" && series.length && /->|→/.test(series[0].raw)) {
        const [antes, despues] = series[0].raw.split(/->|→/).map((v) => v.trim());
        const t = series[0].tendencia;
        const a = parseNumero(antes), d = parseNumero(despues);
        const dir = t?.dir || (a.num != null && d.num != null ? (d.num > a.num ? "sube" : d.num < a.num ? "baja" : "igual") : null);
        series = [{ etiqueta: series[0].etiqueta, ...a }, { etiqueta: "", ...d, tendencia: { dir, sentido: t?.sentido || null } }];
      }
      eventos.push({ tipo: "dato", grafico, fuente: m[2].trim(), series });
      continue;
    }
    if ((m = linea.match(/^\[ESQUEMA\s*\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      eventos.push({ tipo: "esquema", titulo: m[1].trim(), elementos: m[2].split("->").map(e => e.trim()).filter(Boolean) });
      continue;
    }
    if ((m = linea.match(/^\[HECHO\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "narracion", etiqueta: "hecho", lineas: [m[1]] };
      continue;
    }
    if ((m = linea.match(/^\[INTERPRETACI[ÓO]N\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "narracion", etiqueta: "interpretacion", lineas: [m[1]] };
      continue;
    }
    if ((m = linea.match(/^\[FUENTE\s*\|?\s*([^\]]+)\]\s*$/i))) {
      flush();
      eventos.push({ tipo: "fuente", texto: m[1].trim() });
      continue;
    }
    if ((m = linea.match(/^\[CITA\s*\|\s*([^|]+)\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "cita", autor: m[1].trim(), fuente: m[2].trim(), lineas: [m[3]] };
      continue;
    }
    // línea de texto normal: continúa el párrafo actual o abre uno nuevo
    if (!buffer) buffer = { tipo: "narracion", etiqueta: null, lineas: [] };
    buffer.lineas.push(linea);
  }
  flush();

  // Texto para PANTALLA: los números en palabras pasan a numerales. La
  // narración (cleanText) sigue en palabras, que es lo que la voz lee bien.
  for (const ev of eventos) if (ev.texto && ["tesis", "narracion", "cita"].includes(ev.tipo)) ev.textoPantalla = aNumerales(ev.texto);

  // Fuente del bloque: la marca [FUENTE] si existe; si no, la primera fuente de
  // un [DATO] o [CITA] del bloque. Va al pie de todas las tarjetas del bloque.
  {
    let inicio = 0;
    const cerrar = (fin) => {
      const bloque = eventos.slice(inicio, fin);
      const marca = bloque.find((e) => e.tipo === "fuente");
      const fuente = marca ? marca.texto : (bloque.find((e) => (e.tipo === "dato" || e.tipo === "cita") && e.fuente) || {}).fuente;
      if (fuente) for (const e of bloque) if (e.tipo !== "seccion" && e.tipo !== "fuente" && !e.fuente) e.fuenteSeccion = fuente;
    };
    eventos.forEach((e, i) => { if (e.tipo === "seccion" && i > inicio) { cerrar(i); inicio = i; } });
    cerrar(eventos.length);
    for (let i = eventos.length - 1; i >= 0; i--) if (eventos[i].tipo === "fuente") eventos.splice(i, 1);
  }

  // Cifras automáticas: un párrafo narrado que trae una cifra y no tiene [DATO]
  // igual la muestra grande (pedido de Santiago, 29-08: "en cada diapositiva
  // que tenga cifras, el número grande y el texto abajo"). Se marcan como
  // automáticas para poder distinguirlas de las que eligió el guion.
  for (let i = eventos.length - 1; i >= 0; i--) {
    const ev = eventos[i];
    if (ev.tipo !== "narracion" || !ev.textoPantalla) continue;
    const previo = eventos[i - 1], siguiente = eventos[i + 1];
    if (previo && (previo.tipo === "dato" || previo.tipo === "esquema")) continue; // ya tiene su tarjeta
    // Un [DATO] escrito DESPUÉS del párrafo (el guion eligió su tarjeta, solo la
    // puso en la línea siguiente): no se le suma una automática con el mismo
    // número partido (gancho del 04-09).
    if (siguiente && (siguiente.tipo === "dato" || siguiente.tipo === "esquema")) continue;
    if (/^(en titulares|agenda|cierre|apertura)$/i.test(ev._seccionNombre || "")) continue;
    const c = cifraPrincipal(ev.textoPantalla);
    if (!c) continue;
    eventos.splice(i, 0, { tipo: "dato", grafico: "cifra", automatico: true, fuente: ev.fuenteSeccion || null, fuenteSeccion: ev.fuenteSeccion, series: [{ etiqueta: c.etiqueta, ...parseNumero(c.raw) }] });
  }

  // "En titulares" agrupado (decidido el 30-08): la voz lee frase a frase, pero
  // en pantalla van tarjetas de a 4 con la frase activa destacada. 16 tarjetas
  // de una frase hacían de la cola un desfile de 2 minutos.
  {
    const iSec = eventos.findIndex((e) => e.tipo === "seccion" && /^en titulares$/i.test(e.texto));
    if (iSec >= 0) {
      let fin = eventos.findIndex((e, i) => i > iSec && e.tipo === "seccion");
      if (fin < 0) fin = eventos.length;
      // RED (07-09): si el guionista escribió los titulares TODOS SEGUIDOS en un
      // párrafo en vez de uno por línea, aquí llega una sola narración enorme y
      // el video mostraba un muro de 30 frases que tapaba el rótulo (06 y 07-09,
      // los dos primeros días del guionista nuevo). El prompt ya pide una línea
      // por titular; esto es la red para que ningún modelo pueda romper el video
      // por un salto de línea: se parte en frases y se sigue igual.
      for (let i = iSec + 1; i < fin; i++) {
        const ev = eventos[i];
        if (ev.tipo !== "narracion") continue;
        const t = (ev.texto || "").replace(/^Y en titulares:\s*/i, "").trim();
        const partes = t.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"“(])/).map((x) => x.trim()).filter(Boolean);
        if (partes.length < 4) continue; // un párrafo normal, no el muro
        const base = ev;
        // OJO: cada frase necesita SU propio texto Y su propio textoPantalla y
        // lineas. Heredar los del párrafo (spread de base) deja los tiempos
        // bien pero pinta el muro completo en cada tarjeta.
        const frase = (texto) => ({ ...base, texto, textoPantalla: texto, lineas: [texto], _partidoDeTitulares: true });
        const nuevos = partes.map(frase);
        if (/^Y en titulares:/i.test(ev.texto || "")) nuevos.unshift(frase("Y en titulares:"));
        eventos.splice(i, 1, ...nuevos);
        fin += nuevos.length - 1;
        i += nuevos.length - 1;
        console.log(`(titulares: el guion los traía en un párrafo; partidos en ${partes.length} frases)`);
      }
      const frases = [];
      for (let i = iSec + 1; i < fin; i++) if (eventos[i].tipo === "narracion") frases.push(i);
      if (frases.length > 2) {
        const grupos = [];
        for (let i = 0; i < frases.length; i += 4) grupos.push(frases.slice(i, i + 4));
        if (grupos.length > 1 && grupos[grupos.length - 1].length < 3) {
          grupos[grupos.length - 2].push(...grupos.pop());
        }
        // se insertan al final; build-timeline los ordena por tiempo
        for (const g of grupos) {
          for (const i of g) eventos[i].soporte = true;
          eventos.push({ tipo: "titulares", itemsIdx: g });
        }
      }
    }
  }

  // Texto limpio + offsets, y anclaje de eventos no narrados
  let cleanText = "";
  const SEP = "\n\n";
  let ultimoNarradoIdx = -1;
  eventos.forEach((ev, i) => {
    const narrado = ev.tipo === "tesis" || ev.tipo === "narracion" || ev.tipo === "cita";
    if (narrado) {
      if (cleanText) cleanText += SEP;
      ev.charStart = cleanText.length;
      cleanText += ev.texto;
      ev.charEnd = cleanText.length; // exclusivo
      ultimoNarradoIdx = i;
    }
  });
  // anclar dato/esquema/seccion al SIGUIENTE evento narrado
  for (let i = 0; i < eventos.length; i++) {
    const ev = eventos[i];
    if (ev.tipo === "dato" || ev.tipo === "esquema" || ev.tipo === "seccion") {
      let j = i + 1;
      while (j < eventos.length && !["tesis", "narracion", "cita"].includes(eventos[j].tipo)) j++;
      ev.anchor = j < eventos.length ? j : null;
      if ((ev.tipo === "dato" || ev.tipo === "esquema") && ev.anchor != null) {
        eventos[ev.anchor].soporte = true; // ese párrafo se muestra como pie del gráfico
        ev.caption = eventos[ev.anchor].textoPantalla || eventos[ev.anchor].texto;
      }
    }
  }

  return { titulo, caratula, clima, caratulas: caratulas.filter(Boolean), descripcion: descripcion.join(" "), fuentes, eventos, cleanText };
}

// ---- CLI ----
if (require.main === module) {
  const [, , entrada, salidaDir = "out/"] = process.argv;
  if (!entrada) { console.error("Uso: node scripts/parse.js <guion.md> [dirSalida]"); process.exit(1); }
  const md = fs.readFileSync(entrada, "utf8");
  const r = parseGuion(md);
  fs.mkdirSync(salidaDir, { recursive: true });
  fs.writeFileSync(path.join(salidaDir, "parsed.json"), JSON.stringify(r, null, 2));
  fs.writeFileSync(path.join(salidaDir, "narracion.txt"), r.cleanText, "utf8");
  const n = r.eventos.filter(e => e.charStart != null).length;
  console.log(`OK: ${r.eventos.length} eventos (${n} narrados), ${r.cleanText.length} caracteres de narración.`);
  const sinAncla = r.eventos.filter(e => (e.tipo === "dato" || e.tipo === "esquema") && e.anchor == null);
  if (sinAncla.length) console.warn(`AVISO: ${sinAncla.length} dato/esquema sin párrafo posterior; no se mostrarán.`);
}
module.exports = { parseGuion };
