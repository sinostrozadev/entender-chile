// Arma el guion del mural desde el guion de la Clave.
// Por qué por oración y no por párrafo ni por trozo: cuando llegue la voz, la
// voz habla en oraciones, y un bloque de nueve palabras cortaría la frase a la
// mitad mientras una oración cae en la respiración. Medido sobre la Clave del
// 07-10-2026: 87 bloques, mediana de 15 palabras y solo tres sobre 30, así que
// no hay que partir ninguno.
//
// La duración de cada bloque sale de 1,95 s más 0,295 s por palabra. Los dos
// números están ajustados para que el total quede un diez por ciento sobre lo
// que tarda un locutor a 155 palabras por minuto: así la voz entra sin apurarse
// cuando llegue, y mientras tanto se lee cómodo.
//
// uso:
//   node scripts/mural-guion.js --guion contenido/guiones/claves/FECHA-slug.md \
//     --ancho 27580 --paradas 440,2460,... --trozos claves/slug/mural14 --salida ejemplos/clave-mural14.json
const fs = require("fs");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
const md = fs.readFileSync(arg("guion"), "utf8");
const anchoMural = Number(arg("ancho"));
const paradas = arg("paradas").split(",").map(Number);
const base = arg("trozos");
const destino = arg("salida", "ejemplos/clave-mural14.json");

const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const dura = (t) => Math.round((1.95 + 0.295 * palabras(t)) * 100) / 100;

// LAS FUENTES NO VAN EN EL VIDEO. Van en la descripción. El 07-10-2026 el
// armador las leía como prosa y el cierre se comía 110 segundos recitando 28
// URLs en pantalla, un cuarto de la Clave entera.
const cuerpo = md.split(/^Fuentes:\s*$/m)[0];

const secciones = [];
let actual = null;
for (const linea of cuerpo.split("\n")) {
  const h = linea.match(/^##\s+(.+)$/);
  if (h) { actual = { titulo: h[1].trim(), partes: [] }; secciones.push(actual); continue; }
  if (!actual) continue;
  const l = linea.trim();
  if (!l) continue;
  if (l.startsWith("[TESIS]") || l.startsWith("[ESQUEMA")) continue;
  // [HECHO] e [INTERPRETACIÓN] SÍ son prosa narrada, con la marca del canal
  // adelante. Saltárselas dejó la sección 12 sin una sola palabra.
  const mk = l.match(/^\[(HECHO|INTERPRETACIÓN)\]\s*(.+)$/);
  if (mk) {
    actual.partes.push({ tipo: "prosa", texto: mk[2].trim(), marca: mk[1] === "HECHO" ? "hecho" : "interpretacion" });
    continue;
  }
  const d = l.match(/^\[DATO\s+\w+\s*\|\s*([^\]]+)\]\s*(.+)$/);
  if (d) { actual.partes.push({ tipo: "dato", fuente: d[1].trim(), crudo: d[2].trim() }); continue; }
  if (l.startsWith("[")) continue;
  actual.partes.push({ tipo: "prosa", texto: l });
}

const oraciones = (t) =>
  t.replace(/([.?!])\s+(?=[¿¡A-ZÁÉÍÓÚÑ])/g, "$1\u0001").split("\u0001").map((s) => s.trim()).filter(Boolean);

const bloques = [];
secciones.forEach((sec, i) => {
  let primera = true;
  for (const p of sec.partes) {
    if (p.tipo === "dato") {
      // "servidores 2023: 19963 ; servidores 2025: 7207"
      const pares = p.crudo.split(";").map((x) => x.trim());
      const vals = pares.map((x) => x.split(":").pop().trim());
      const etq = pares[0].split(":")[0].replace(/\s*\d{4}$/, "").trim();
      const b = { tipo: "dato", etiqueta: etq, a: vals[vals.length - 1], fuente: p.fuente, parada: i, seg: 4.8 };
      if (vals.length > 1) b.de = vals[0];
      if (primera) { b.rotulo = sec.titulo; primera = false; }
      bloques.push(b);
    } else {
      const os = oraciones(p.texto);
      os.forEach((o, k) => {
        const b = { texto: o, parada: i, seg: dura(o) };
        // la marca va solo en la primera oración del párrafo marcado: repetirla
        // en cada oración la convierte en ruido y deja de distinguir nada
        if (p.marca && k === 0) b.marca = p.marca;
        if (primera) { b.rotulo = sec.titulo; primera = false; }
        bloques.push(b);
      });
    }
  }
});

const guion = {
  mural: [1, 2, 3].map((i) => `${base}-${i}.jpg`),
  anchoMural,
  viajeSeg: 1.5,
  paradas,
  bloques,
};
fs.writeFileSync(destino, JSON.stringify(guion, null, 2) + "\n");
const tot = bloques.reduce((a, b) => a + b.seg, 0);
console.log("secciones:", secciones.length, "| bloques:", bloques.length, "| duración:", Math.floor(tot / 60) + "m" + Math.round(tot % 60) + "s");
console.log("rótulos:", secciones.map((s) => s.titulo).join(" / "));
const largas = bloques.filter((b) => b.texto && palabras(b.texto) > 30);
console.log("oraciones sobre 30 palabras:", largas.length, largas.map((b) => palabras(b.texto)).join(","));
