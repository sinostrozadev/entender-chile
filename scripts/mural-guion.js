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
const { aNumerales, cifraCorta, cifraDeDato } = require("./numerales");
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
  // LA TESIS SE NARRA. prompts/guion-claves.md:61 lo dice con todas sus
  // letras ("Sí se narra") y este armador la tiraba junto con el resto de las
  // marcas: 14 frases, 180 palabras, el 10% de lo narrado, y no cualquier 10%
  // sino la idea central de cada sección. Es el mismo error que dejó la
  // sección 12 sin texto el 07-10-2026: tratar todo corchete como marca de
  // producción sin leer cuáles sí se dicen.
  const tz = l.match(/^\[TESIS\]\s*(.+)$/);
  if (tz) { actual.partes.push({ tipo: "prosa", texto: tz[1].trim(), tesis: true }); continue; }
  // la fuente de la sección va al pie de todo bloque que muestre una cifra
  // (reglas 6 y 32). Antes esta línea se descartaba en silencio.
  const fz = l.match(/^\[FUENTE\]\s*(.+)$/);
  if (fz) { actual.fuente = fz[1].trim(); continue; }
  if (l.startsWith("[ESQUEMA")) continue;
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

// EL DATO VA DESPUÉS DEL PÁRRAFO QUE ACOMPAÑA, no antes. En el guion la línea
// [DATO] va pegada arriba del párrafo que ilustra, porque ahí es su etiqueta.
// Respetar ese orden al pie hacía que la Clave ABRIERA con un número pelado,
// antes de que nadie supiera de qué era el número. Y de paso dejaba los
// primeros cinco segundos sin música, porque el dato va en silencio.
const ordenar = (partes) => {
  const salida = [];
  for (let i = 0; i < partes.length; i++) {
    if (partes[i].tipo !== "dato") { salida.push(partes[i]); continue; }
    const prosa = partes.findIndex((x, k) => k > i && x.tipo === "prosa");
    if (prosa === -1) { salida.push(partes[i]); continue; }
    salida.push(partes[prosa]);
    salida.push(partes[i]);
    partes.splice(prosa, 1);
  }
  return salida;
};

const bloques = [];
secciones.forEach((sec, i) => {
  let primera = true;
  // REGLAS 6 Y 32: ninguna cifra en pantalla sin su fuente al pie, porque la
  // pieza tiene que entenderse con el video en silencio. El informe ya lo hace
  // (parse.js, fuenteSeccion); acá 33 bloques de prosa mostraban cifras sin
  // una sola fuente a la vista. La fuente de la sección es su marca [FUENTE]
  // y, si no la hay, la del primer [DATO] de esa misma sección.
  const fuenteSeccion = sec.fuente || (sec.partes.find((x) => x.tipo === "dato") || {}).fuente;
  for (const p of ordenar(sec.partes)) {
    if (p.tipo === "dato") {
      // CADA VALOR CONSERVA SU PROPIO RÓTULO. La primera versión se quedaba con
      // el rótulo del primer par, le arrancaba el año y pintaba el primer valor
      // y el último separados por una flecha. En pantalla eso daba
      // "SERVIDORES 19963 → 7207", dos números pelados que no se entiende qué
      // son, y en el dato de tres valores mentía: "sumarios totales: 25352 ;
      // en curso: 21098 ; cerrados: 1543" salía como 25352 → 1543, o sea un
      // desplome que nunca ocurrió, cuando es el desglose de un mismo total.
      const valores = p.crudo.split(";").map((par) => {
        const c = par.lastIndexOf(":");
        const crudo = par.slice(c + 1).trim();
        const v = { rotulo: par.slice(0, c).trim(), valor: cifraCorta(crudo) };
        // el valor exacto no se pierde aunque la pantalla lo abrevie (regla 42)
        if (v.valor.includes("millones")) v.exacto = crudo;
        return v;
      });
      // LA FLECHA SIGNIFICA UNA COSA SOLA: lo mismo medido en dos momentos. Si
      // los rótulos no son la misma raíz con años distintos, no hay antes ni
      // después que mostrar y va una lista, que no afirma ninguna dirección.
      const anios = valores.map((v) => (v.rotulo.match(/\s(\d{4})$/) || [])[1]);
      const raices = valores.map((v) => v.rotulo.replace(/\s*\d{4}$/, "").trim());
      const flecha = valores.length === 2 && anios.every(Boolean) && raices[0] === raices[1];
      // 4,8 s estaba medido para un número solo. Leer un rótulo y su valor
      // cuesta más que leer una cifra, y acá hay dos o tres pares.
      const b = {
        tipo: "dato",
        forma: flecha ? "flecha" : "lista",
        valores: flecha ? valores.map((v, k) => ({ rotulo: anios[k], valor: v.valor })) : valores,
        fuente: p.fuente,
        parada: i,
        seg: Math.round((3.6 + 1.2 * valores.length) * 100) / 100,
      };
      if (flecha) b.etiqueta = raices[0];
      if (primera) { b.rotulo = sec.titulo; primera = false; }
      bloques.push(b);
    } else {
      const os = oraciones(p.texto);
      os.forEach((o, k) => {
        const b = { texto: o, parada: i, seg: dura(o) };
        // REGLA 36: la voz lee palabras, la pantalla muestra numerales. Está
        // decidido desde el 29-08-2026 y el informe lo hace en parse.js:324;
        // este armador nació después y nunca lo aplicó, así que la Clave salió
        // con "dos mil veintiséis" y "siete mil doscientos" escritos en
        // pantalla. La duración se calcula sobre el texto narrado, que es el
        // que tarda.
        const pant = aNumerales(o).trim();
        if (pant !== o) b.textoPantalla = pant;
        if (p.tesis) b.tesis = true;
        if (cifraDeDato(pant) && fuenteSeccion) b.fuente = fuenteSeccion;
        // la marca va solo en la primera oración del párrafo marcado: repetirla
        // en cada oración la convierte en ruido y deja de distinguir nada
        if (p.marca && k === 0) b.marca = p.marca;
        if (primera) { b.rotulo = sec.titulo; primera = false; }
        bloques.push(b);
      });
    }
  }
});

// NO PISAR LAS CLAVES QUE YA ESTABAN. El 09-10-2026 este armador escribía un
// objeto fijo sin "musica", así que al rearmar el guion contra la reescritura de
// GPT la pista de audio desapareció sin aviso y el render de once minutos salió
// mudo. Lo que este script calcula se sobreescribe; lo demás se conserva.
const previo = fs.existsSync(destino) ? JSON.parse(fs.readFileSync(destino, "utf8")) : {};
const guion = {
  ...previo,
  mural: [1, 2, 3].map((i) => `${base}-${i}.jpg`),
  anchoMural,
  viajeSeg: 1.5,
  paradas,
  bloques,
};
// los velos se resuelven contra las paradas, así que un guion nuevo los invalida
if (previo.velos && previo.velos.length !== paradas.length) delete guion.velos;
fs.writeFileSync(destino, JSON.stringify(guion, null, 2) + "\n");
if (!guion.musica) console.log("OJO: el guion no tiene clave musica, el video saldrá mudo");
const tot = bloques.reduce((a, b) => a + b.seg, 0);
console.log("secciones:", secciones.length, "| bloques:", bloques.length, "| duración:", Math.floor(tot / 60) + "m" + Math.round(tot % 60) + "s");
console.log("rótulos:", secciones.map((s) => s.titulo).join(" / "));
const largas = bloques.filter((b) => b.texto && palabras(b.texto) > 30);
console.log("oraciones sobre 30 palabras:", largas.length, largas.map((b) => palabras(b.texto)).join(","));
