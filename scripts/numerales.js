#!/usr/bin/env node
/**
 * numerales.js - Los números escritos en palabras pasan a numerales, SOLO para
 * lo que se lee en pantalla. La narración que va a la voz sigue en palabras
 * (la voz las lee sin sorpresas); en pantalla "veinticinco mil" se ve raro y
 * "25.000" se entiende de un golpe.
 *
 *   aNumerales("veinticinco mil cupos")            -> "25.000 cupos"
 *   aNumerales("nueve coma cinco por ciento")      -> "9,5%"
 *   aNumerales("quinientos noventa y tres millones de dólares") -> "593 millones de dólares"
 *   formatoCifra("US$1970 millones")               -> "US$1.970 millones"
 *
 * Estilo chileno: punto de miles, coma decimal, los años sin punto.
 * "un", "una" y "uno" sueltos son artículos y no se tocan ("una bonificación").
 */
const UNIDADES = {
  cero: 0, un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5, seis: 6, siete: 7, ocho: 8, nueve: 9,
  diez: 10, once: 11, doce: 12, trece: 13, catorce: 14, quince: 15, dieciseis: 16, dieciséis: 16, diecisiete: 17,
  dieciocho: 18, diecinueve: 19, veinte: 20, veintiun: 21, veintiún: 21, veintiuno: 21, veintiuna: 21, veintidos: 22,
  veintidós: 22, veintitres: 23, veintitrés: 23, veinticuatro: 24, veinticinco: 25, veintiseis: 26, veintiséis: 26,
  veintisiete: 27, veintiocho: 28, veintinueve: 29,
};
const DECENAS = { treinta: 30, cuarenta: 40, cincuenta: 50, sesenta: 60, setenta: 70, ochenta: 80, noventa: 90 };
const CENTENAS = {
  cien: 100, ciento: 100, doscientos: 200, doscientas: 200, trescientos: 300, trescientas: 300, cuatrocientos: 400,
  cuatrocientas: 400, quinientos: 500, quinientas: 500, seiscientos: 600, seiscientas: 600, setecientos: 700,
  setecientas: 700, ochocientos: 800, ochocientas: 800, novecientos: 900, novecientas: 900,
};
const ARTICULOS = new Set(["un", "uno", "una"]);
const bajo = (w) => w.toLowerCase();
const esNumero = (w) => w in UNIDADES || w in DECENAS || w in CENTENAS;

// Valor de una secuencia de palabras-número (sin "millones": eso queda como palabra).
function valorDe(palabras) {
  let total = 0, actual = 0;
  for (const w of palabras) {
    if (w === "y") continue;
    if (w === "mil") { actual = (actual || 1) * 1000; total += actual; actual = 0; continue; }
    if (w in CENTENAS) { actual += CENTENAS[w]; continue; }
    if (w in DECENAS) { actual += DECENAS[w]; continue; }
    if (w in UNIDADES) { actual += UNIDADES[w]; continue; }
  }
  return total + actual;
}

const esAnio = (n) => Number.isInteger(n) && n >= 1900 && n <= 2099;
function conMiles(n) {
  const s = String(Math.abs(n));
  const conPuntos = esAnio(n) ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (n < 0 ? "-" : "") + conPuntos;
}

// Lee una secuencia de palabras-número desde `start`: número (y número)* (mil)?
// Devuelve las palabras y la posición siguiente. Compartida por el número
// principal y por la parte que sigue a "millones" en los compuestos.
function leerSecuencia(tokens, start, tomar) {
  const seq = []; let j = start; let ultimoTipo = null;
    while (j < tokens.length) {
    const tok = tokens[j];
    if (/^\s+$/.test(tok)) { j++; continue; }
    const s = tomar(j);
    const cola = tokens[j].slice(s.length); // puntuación pegada, ej. "cinco,"
    if (s === "y") {
      const prev = seq[seq.length - 1], next = j + 2 < tokens.length ? tomar(j + 2) : "";
      if (prev in DECENAS && next in UNIDADES && UNIDADES[next] >= 1 && UNIDADES[next] <= 9) { seq.push("y"); j++; continue; }
      break;
    }
    if (s === "mil") { if (ultimoTipo === "mil") break; seq.push("mil"); ultimoTipo = "mil"; j++; if (cola) break; continue; }
    if (esNumero(s)) {
      // un número después de "mil" ya cerrado o dos unidades seguidas ("cinco tres") no se juntan
      if (ultimoTipo === "unidad" && (s in UNIDADES || s in DECENAS) && !(seq[seq.length - 1] in DECENAS)) break;
      seq.push(s); ultimoTipo = s in CENTENAS ? "centena" : s in DECENAS ? "decena" : "unidad"; j++;
      if (cola) break;
      continue;
    }
    break;
  }
  return { seq, j };
}

function aNumerales(texto) {
  if (!texto) return texto;
  const tokens = texto.split(/(\s+)/); // conserva los espacios
  const out = [];
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    const w = bajo(t).replace(/[.,;:()"“”]+$/g, "");
    if (!esNumero(w) && w !== "mil") { out.push(t); i++; continue; }

    // juntar la secuencia numérica: número (y número)* (mil)? ...
    const tomar = (k) => { const s = bajo(tokens[k]); return s.replace(/[.,;:()"“”]+$/g, ""); };
    const { seq, j: jSeq } = leerSecuencia(tokens, i, tomar);
    let j = jSeq;
    const soloArticulo = seq.length === 1 && ARTICULOS.has(seq[0]);
    const siguiente = (() => { let k = j; while (k < tokens.length && /^\s+$/.test(tokens[k])) k++; return k < tokens.length ? bajo(tokens[k]).replace(/[.,;:]+$/g, "") : ""; })();
    const sigueMillon = /^millon(es)?$|^millón$/.test(siguiente);
    if (!seq.length || (soloArticulo && !sigueMillon) || (seq.length === 1 && seq[0] === "cero" && siguiente !== "coma")) {
      out.push(t); i++; continue;
    }
    let numero = valorDe(seq);
    let textoNum = conMiles(numero);

    // compuestos con "millones": "tres mil seiscientos cuarenta millones
    // quinientos cuarenta y cuatro mil ochocientos pesos" es UN número
    // (3.640.544.800), no "3.640 millones" y luego "544.800". El 04-09 la
    // tarjeta automática del gancho mostró "544.800 pesos" por esto.
    let k = j; while (k < tokens.length && /^\s+$/.test(tokens[k])) k++;
    if (k < tokens.length && sigueMillon && !/[.,;:]$/.test(tokens[k])) {
      let m = k + 1; while (m < tokens.length && /^\s+$/.test(tokens[m])) m++;
      if (m < tokens.length) {
        const s2 = tomar(m);
        if (esNumero(s2) || s2 === "mil") {
          const r2 = leerSecuencia(tokens, m, tomar);
          if (r2.seq.length && !(r2.seq.length === 1 && ARTICULOS.has(r2.seq[0]))) {
            numero = numero * 1e6 + valorDe(r2.seq);
            textoNum = conMiles(numero);
            j = r2.j;
          }
        }
      }
    }
    // decimales: "nueve coma cinco" / "cero coma ocho" / "doce coma veinticinco"
    k = j; while (k < tokens.length && /^\s+$/.test(tokens[k])) k++;
    if (k < tokens.length && bajo(tokens[k]) === "coma") {
      let m = k + 1; while (m < tokens.length && /^\s+$/.test(tokens[m])) m++;
      const dec = [];
      while (m < tokens.length) {
        const s = tomar(m);
        if (!esNumero(s) || s === "mil") break;
        dec.push(s); const cola = tokens[m].slice(s.length); m++;
        if (cola) break;
        let n2 = m; while (n2 < tokens.length && /^\s+$/.test(tokens[n2])) n2++;
        if (n2 < tokens.length && tomar(n2) === "y" && s in DECENAS) { m = n2 + 1; continue; }
        m = n2;
        if (!(s in DECENAS)) break; // un solo grupo decimal salvo "treinta y dos"
      }
      if (dec.length) {
        const decTxt = dec[0] === "cero" ? dec.map((d) => String(valorDe([d]))).join("") : String(valorDe(dec));
        textoNum += "," + decTxt;
        j = m;
      }
    }
    // por ciento
    let p = j; while (p < tokens.length && /^\s+$/.test(tokens[p])) p++;
    let cola = "";
    if (p < tokens.length && bajo(tokens[p]) === "por") {
      let q = p + 1; while (q < tokens.length && /^\s+$/.test(tokens[q])) q++;
      if (q < tokens.length && /^cien(to)?[.,;:)]*$/.test(bajo(tokens[q]))) {
        textoNum += "%"; cola = tokens[q].replace(/^[a-záé]+/i, ""); j = q + 1;
      }
    }
    // la puntuación que venía pegada a la última palabra del número
    if (!cola) {
      const ultimo = tokens[j - 1] || "";
      const s = bajo(ultimo).replace(/[.,;:()"“”]+$/g, "");
      cola = ultimo.slice(s.length);
    }
    out.push(textoNum + cola);
    while (j > i && /^\s+$/.test(tokens[j - 1])) j--; // el espacio que sigue al número se conserva
    i = j;
  }
  return out.join("");
}

// Numerales ya escritos: punto de miles donde falte ("25000" -> "25.000"), años intactos.
function formatoCifra(raw) {
  if (raw == null) return raw;
  const str = String(raw);
  return str.replace(/(?<![\d.,])(\d{4,})(?![\d.]|,\d)/g, (m, _g, offset) => {
    const n = Number(m);
    const antes = str[offset - 1] || "";
    const despues = (str.slice(offset + m.length).match(/^\s*([a-záéíóú%]+)/i) || [])[1] || "";
    const esMonto = /[$€]/.test(antes) || /^(millones|millón|millon|mil|%|toneladas|personas|cupos|hogares|viviendas|casos)$/i.test(despues);
    return m.length === 4 && esAnio(n) && !esMonto ? m : m.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  });
}

module.exports = { aNumerales, formatoCifra };

if (require.main === module) {
  const casos = [
    ["veinticinco mil cupos a nivel nacional", "25.000 cupos a nivel nacional"],
    ["nueve coma cinco por ciento en el trimestre", "9,5% en el trimestre"],
    ["cayó once por ciento hasta quinientas sesenta y cuatro mil toneladas", "cayó 11% hasta 564.000 toneladas"],
    ["quinientos noventa y tres millones de dólares", "593 millones de dólares"],
    ["sesenta y cinco mil millones de barriles", "65.000 millones de barriles"],
    ["activó una bonificación para empresas", "activó una bonificación para empresas"],
    ["un millón de personas y un tercio", "1 millón de personas y un tercio"],
    ["el veintinueve de agosto de dos mil veintiséis", "el 29 de agosto de 2026"],
    ["subió a veintiséis coma cinco por ciento.", "subió a 26,5%."],
    ["cero coma ocho puntos porcentuales", "0,8 puntos porcentuales"],
    ["mil quinientos millones", "1.500 millones"],
    ["cien por ciento de los casos", "100% de los casos"],
    ["dos mil veintiséis fue el año", "2026 fue el año"],
    ["ciento ocho días trabajados", "108 días trabajados"],
    ["siete buques el jueves, diecisiete el día anterior", "7 buques el jueves, 17 el día anterior"],
    ["Uno de cada tres hogares", "Uno de cada 3 hogares"],
    ["treinta y dos coma cuatro por ciento", "32,4%"],
    // compuestos con millones (04-09: la tarjeta del gancho mostró "544.800 pesos")
    ["un perjuicio fiscal de tres mil seiscientos cuarenta millones quinientos cuarenta y cuatro mil ochocientos pesos y formuló", "un perjuicio fiscal de 3.640.544.800 pesos y formuló"],
    ["mil quinientos millones trescientos mil pesos", "1.500.300.000 pesos"],
    ["un millón doscientas mil personas", "1.200.000 personas"],
    ["dos millones de dólares y tres mil pesos", "2 millones de dólares y 3.000 pesos"],
  ];
  let mal = 0;
  for (const [entrada, esperado] of casos) {
    const r = aNumerales(entrada);
    if (r !== esperado) { mal++; console.log(`✗ ${entrada}\n    → ${r}\n    esperado ${esperado}`); }
  }
  const f = [["25000", "25.000"], ["US$1970 millones", "US$1.970 millones"], ["2026", "2026"], ["1500", "1.500"], ["9,5%", "9,5%"], ["564.000", "564.000"], ["100 km/h", "100 km/h"], ["US$100000 millones", "US$100.000 millones"]];
  for (const [a, b] of f) if (formatoCifra(a) !== b) { mal++; console.log(`✗ formato ${a} → ${formatoCifra(a)} (esperado ${b})`); }
  console.log(mal ? `${mal} casos fallan` : `OK: ${casos.length + f.length} casos`);
  process.exit(mal ? 1 : 0);
}
