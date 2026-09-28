#!/usr/bin/env node
/**
 * validar-solapes.js - Que no queden DOS TEXTOS ENCIMA en el video.
 *
 * Por que existe (28-09-2026): Santiago reporto tres veces que al empezar
 * cada seccion se leian dos textos superpuestos, el titular de la noticia y
 * el parrafo del desarrollo. Las tres veces el defecto llego a YouTube,
 * porque no habia manera de verlo sin rendir doce minutos de video: la
 * cuenta de cuando se ve cada tarjeta vivia dentro del componente que dibuja.
 *
 * Y habia una segunda razon por la que no se veia. La voz SIMULADA de las
 * pruebas locales separa las tarjetas casi medio segundo, y la voz de verdad
 * de Azure las deja pegadas: el final de una frase es el comienzo de la otra.
 * Asi que el defecto solo aparecia con voz real, o sea solo de noche y solo
 * en produccion. Por eso este guardian corre sobre el timeline de la corrida
 * de verdad y no sobre una prueba.
 *
 * Ahora las ventanas las publica scripts/secuencia-plan.js dentro del
 * timeline (bloques[].tarjetas, con `desde` y `hasta` en segundos desde el
 * inicio del bloque), y esto las LEE: no rehace la cuenta, porque un
 * verificador que repite la cuenta del verificado solo comprueba que sabe
 * copiar.
 *
 * Uso:
 *   node scripts/validar-solapes.js [out/FECHA/timeline.json] [--estricto]
 *   (--estricto: sale con codigo 1 si hay solapes; por defecto siempre 0)
 *   node scripts/validar-solapes.js --barrido
 *   (prueba el plan contra TODOS los aires posibles, sin necesitar un guion)
 */
const fs = require("fs");

const args = process.argv.slice(2);
const estricto = args.includes("--estricto");

// EL BARRIDO DE AIRES. Un timeline real solo prueba los cortes que tuvo esa
// edicion, y los cortes apretados (poco silencio entre una seccion y la
// siguiente) son justo los que rompen: ahi el titular y la primera tarjeta se
// pelean los mismos segundos. Esto corre el plan con un guion de mentira y va
// moviendo el aire de 0,3 a 4 s para revisar el borde entero de una vez, que
// es lo unico que demuestra que no queda una franja mala esperando su noche.
if (args.includes("--barrido")) {
  const { planear } = require("./secuencia-plan.js");
  const fallas = [];
  let probados = 0;
  for (let aire = 0.3; aire <= 4.0; aire += 0.02) {
    const tl = { meta: { duracionSeg: 60 }, eventos: [
      { overlay: true, texto: "A", from: 0, to: 1e8, categoria: null, pausaDur: 0 },
      { tipo: "narracion", texto: "a", seccion: "A", from: 0.1, to: 5 },
      { overlay: true, texto: "B", from: 10, to: 1e8, categoria: null, pausaDur: 0 },
      { tipo: "entrada", muda: true, texto: "B", seccion: "B", from: 10, to: 10 + Math.min(aire * 0.7, 1.9) },
      { tipo: "tesis", texto: "b", seccion: "B", from: 10 + aire, to: 10 + aire + 3 },
      { tipo: "narracion", texto: "c", seccion: "B", from: 10 + aire + 3, to: 20 },
    ] };
    const plan = planear(tl);
    const b = plan && plan.bloques[1];
    if (!b || !b.lleno) continue;
    probados++;
    const a2 = aire.toFixed(2);
    const primera = Math.min(...b.tarjetas.map((v) => v.desde));
    if (b.lleno[1] > primera) fallas.push(`aire ${a2}s: el titular se apaga en ${b.lleno[1]}s y la tarjeta entra en ${primera}s.`);
    if (b.lleno[1] <= b.lleno[0]) fallas.push(`aire ${a2}s: el titular no tiene fundido (${JSON.stringify(b.lleno)}).`);
    b.tarjetas.forEach((v, k) => {
      const sig = b.tarjetas[k + 1];
      if (sig && v.hasta > sig.desde) fallas.push(`aire ${a2}s: la tarjeta ${k} se pasa de la ${k + 1}.`);
    });
  }
  console.log(`Barrido: ${probados} aires con cabecera, de 0,3 a 4 s.`);
  if (!fallas.length) { console.log("Ninguno superpone nada."); process.exit(0); }
  fallas.slice(0, 12).forEach((f) => console.log(`  FALLA  ${f}`));
  console.log(`${fallas.length} fallas.`);
  process.exit(1);
}
const ruta = args.find((a) => a.endsWith(".json")) || "out/timeline.json";
if (!fs.existsSync(ruta)) { console.log(`(sin timeline en ${ruta}: nada que revisar)`); process.exit(0); }

const tl = JSON.parse(fs.readFileSync(ruta, "utf8"));
const plan = tl.meta && tl.meta.secuencia;
if (!plan || !plan.bloques) { console.log("(este timeline no lleva secuencia: nada que revisar)"); process.exit(0); }

const fps = tl.meta.fps || 24;
const cuadro = (s) => Math.round(s * fps);
const recorte = (s) => String(s || "").replace(/\s+/g, " ").slice(0, 52);

const avisos = [];
let conVentanas = 0;
let tarjetas = 0;

plan.bloques.forEach((b, i) => {
  const v = b.tarjetas;
  if (!v) return;
  conVentanas++;
  tarjetas += v.length;
  v.forEach((t, k) => {
    const ev = (tl.eventos || [])[t.ev];
    const sig = v[k + 1];
    // el solape de verdad, ya redondeado a cuadros: es lo que se ve
    if (sig && cuadro(t.hasta) > cuadro(sig.desde)) {
      const juntos = cuadro(t.hasta) - cuadro(sig.desde);
      avisos.push(`bloque ${i} "${b.texto}": la tarjeta ${k} (${ev ? ev.tipo : "?"}) sigue en pantalla ` +
        `${juntos} cuadro${juntos === 1 ? "" : "s"} despues de que entra la ${k + 1}. ` +
        `Se leerian a la vez: "${recorte(ev && (ev.textoPantalla || ev.texto))}"`);
    }
    if (t.hasta <= t.desde) avisos.push(`bloque ${i} "${b.texto}": la tarjeta ${k} no dura nada (${t.desde} a ${t.hasta}).`);
    if (!ev) avisos.push(`bloque ${i} "${b.texto}": la ventana ${k} apunta al evento ${t.ev}, que no existe.`);
  });
  // el titular de la seccion tampoco puede pisar a la primera tarjeta
  if (b.lleno && v.length) {
    const primera = Math.min(...v.map((t) => t.desde));
    if (b.lleno[1] > primera) {
      avisos.push(`bloque ${i} "${b.texto}": el titular se apagaria en ${b.lleno[1]}s y la primera tarjeta ` +
        `entra en ${primera}s. Lo recorta src/secuencia.tsx, pero el plan no deberia pedirlo.`);
    }
  }
});

if (!conVentanas) {
  console.log("(el plan de este timeline no trae ventanas de tarjeta: es anterior al 28-09-2026)");
  process.exit(0);
}

console.log(`Solapes: ${plan.bloques.length} bloques, ${tarjetas} tarjetas con ventana.`);
if (!avisos.length) {
  console.log("Ningun par de textos se ve a la vez.");
  process.exit(0);
}
avisos.forEach((a) => console.log(`  AVISO  ${a}`));
console.log(`${avisos.length} aviso${avisos.length === 1 ? "" : "s"}.`);
process.exit(estricto ? 1 : 0);
