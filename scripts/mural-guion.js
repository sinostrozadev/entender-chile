// Arma el guion del mural desde el guion de la Clave.
// Por qué por oración y no por párrafo ni por trozo: cuando llegue la voz, la
// voz habla en oraciones, y un bloque de nueve palabras cortaría la frase a la
// mitad mientras una oración cae en la respiración. Medido sobre la Clave del
// 07-10-2026: 87 bloques, mediana de 15 palabras y solo tres sobre 30, así que
// no hay que partir ninguno.
//
// La duración de cada bloque sale de 1,95 s más 0,295 s por palabra. Los dos
// números están ajustados para que el total quede un diez por ciento sobre lo
// que tarda un locutor a 155 palabras por minuto: así se lee cómodo cuando no
// hay voz. CON VOZ (12-10-2026) esa estimación ya no manda: la duración de cada
// bloque la pone lo que de verdad tardó Azure en decir esa oración, y eso lo
// hace scripts/clave-mural.js, que usa este mismo armador como módulo.
//
// uso (CLI, para pruebas del taller):
//   node scripts/mural-guion.js --guion contenido/guiones/claves/FECHA-slug.md \
//     --ancho 27580 --paradas 440,2460,... --trozos claves/slug/mural14 --salida ejemplos/clave-mural14.json
const fs = require("fs");
const { aNumerales, cifraCorta, cifraDeDato } = require("./numerales");

const palabras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const dura = (t) => Math.round((1.95 + 0.295 * palabras(t)) * 100) / 100;

// Las secciones del guion con sus partes, en el orden en que se dicen.
const leerSecciones = (md) => {
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
    // letras ("Sí se narra") y el armador la tiraba junto con las marcas de
    // producción: 14 frases, 180 palabras, el 10% de lo narrado, y no
    // cualquier 10% sino la idea central de cada sección. La Clave que subió
    // el 13-10-2026 salió sin ellas.
    const tz = l.match(/^\[TESIS\]\s*(.+)$/);
    if (tz) { actual.partes.push({ tipo: "prosa", texto: tz[1].trim(), tesis: true }); continue; }
    // la fuente de la sección baja al pie de los planos que muestren una cifra
    // (reglas 6 y 32). Antes esta línea se descartaba en silencio.
    const fz = l.match(/^\[FUENTE\]\s*(.+)$/);
    if (fz) { actual.fuente = fz[1].trim(); continue; }
    if (l.startsWith("[ESQUEMA")) continue;
    // [HECHO] e [INTERPRETACIÓN] SÍ son prosa narrada, con la marca del canal
    // adelante. Saltárselas dejó la sección 12 sin una sola palabra.
    const mk = l.match(/^\[(HECHO|INTERPRETACI[ÓO]N)\]\s*(.+)$/i);
    if (mk) {
      actual.partes.push({ tipo: "prosa", texto: mk[2].trim(), marca: /^HECHO$/i.test(mk[1]) ? "hecho" : "interpretacion" });
      continue;
    }
    const d = l.match(/^\[DATO\s+(\w+)\s*\|\s*([^\]]+)\]\s*(.+)$/);
    if (d) { actual.partes.push({ tipo: "dato", forma: d[1].toLowerCase(), fuente: d[2].trim(), crudo: d[3].trim() }); continue; }
    if (l.startsWith("[")) continue;
    actual.partes.push({ tipo: "prosa", texto: l });
  }
  return secciones;
};

const oraciones = (t) =>
  t.replace(/([.?!])\s+(?=[¿¡A-ZÁÉÍÓÚÑ])/g, "$1\u0001").split("\u0001").map((s) => s.trim()).filter(Boolean);

// EL DATO VA DESPUÉS DEL PÁRRAFO QUE ACOMPAÑA, no antes. En el guion la línea
// [DATO] va pegada arriba del párrafo que ilustra, porque ahí es su etiqueta.
// Respetar ese orden al pie hacía que la Clave ABRIERA con un número pelado,
// antes de que nadie supiera de qué era el número. Y de paso dejaba los
// primeros cinco segundos sin música, porque el dato va en silencio.
const ordenar = (partes) => {
  partes = partes.slice();
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

// EL VALOR DEL DATO, ESCRITO PARA LEERSE DE UN GOLPE (12-10-2026). El guion
// trae la cifra cruda ("31571798643") y así salía al plano, a 168 px: once
// dígitos sin un punto, más anchos que la pantalla. Ahora lleva punto de miles
// como en todo el canal, y desde cien millones se dice en millones, que es como
// lo dice la voz ("más de treinta y un mil quinientos millones"): el plano está
// para que el número se entienda en un segundo, no para auditarlo, y la cifra
// exacta queda en la fuente que va abajo.
// Lo resuelve cifraCorta (regla 42): corta en el millón, no en los cien
// millones, y respeta la unidad pegada al número ("$31571798643" sale
// "$31.572 millones"). El corte anterior dejaba pasar siete dígitos seguidos,
// y la unidad se perdía entera porque el número con "$" ni siquiera entraba
// en la condición.
const valorDato = (v) => cifraCorta(String(v).trim());

// "servidores 2023: 19963 ; servidores 2025: 7207"
// EL RÓTULO DE CADA VALOR (12-10-2026). Antes se tomaba la etiqueta del primer
// par sin el año y se botaba el resto, así que el plano decía "servidores
// 19963 -> 7207" sin decir de cuándo a cuándo, y la tabla de sumarios salía
// como "25352 -> 1543", una comparación que el guion nunca hizo: eran tres
// columnas (totales, en curso, cerrados), no un antes y un después. Ahora lo
// común de las etiquetas va arriba y lo propio de cada una va bajo su número.
const armarDato = (p) => {
  let pares = p.crudo.split(";").map((x) => x.trim()).filter(Boolean).map((x) => {
    const i = x.lastIndexOf(":");
    return i > -1 ? { etiqueta: x.slice(0, i).trim(), valor: x.slice(i + 1).trim() } : { etiqueta: "", valor: x };
  });
  // "cambio": etiqueta: antes -> después
  if (pares.length === 1 && /->|→/.test(pares[0].valor)) {
    const [antes, despues] = pares[0].valor.split(/->|→/).map((v) => v.trim());
    pares = [{ etiqueta: pares[0].etiqueta, valor: antes }, { etiqueta: "", valor: despues }];
  }
  const palabrasDe = pares.map((x) => x.etiqueta.split(/\s+/).filter(Boolean));
  let comun = 0;
  if (pares.length > 1) {
    while (palabrasDe.every((w) => w[comun] !== undefined && w[comun].toLowerCase() === palabrasDe[0][comun].toLowerCase())) comun++;
  }
  const etiqueta = pares.length > 1 ? palabrasDe[0].slice(0, comun).join(" ") : pares[0].etiqueta;
  const valores = pares.map((x, i) => ({ rotulo: pares.length > 1 ? palabrasDe[i].slice(comun).join(" ") : "", valor: valorDato(x.valor) }));
  // la flecha dice "esto pasó a ser esto otro", así que solo va cuando es la
  // MISMA cosa medida dos veces (un cambio, o una comparación con etiqueta
  // común: servidores 2023 y servidores 2025). "Perjuicio informado" contra
  // "demanda civil acogida" son dos cosas distintas y una flecha entre ellas
  // diría que una se convirtió en la otra. El resto (tabla, barras, serie) son
  // columnas que conviven.
  const flecha = pares.length === 2 && (p.forma === "cambio" || (/^comparaci[oó]n$/.test(p.forma) && comun > 0));
  // 4,8 s estaba medido para un número solo. Leer un rótulo y su valor cuesta
  // más que leer una cifra, y acá hay dos o tres pares.
  const seg = Math.round((3.6 + 1.2 * valores.length) * 100) / 100;
  const b = { tipo: "dato", etiqueta, a: valores[valores.length - 1].valor, fuente: p.fuente, valores, flecha, seg };
  // el valor exacto no se pierde aunque la pantalla lo abrevie (regla 42)
  pares.forEach((x, i) => { if (valores[i].valor.includes("millones")) valores[i].exacto = x.valor; });
  if (valores.length > 1) b.de = valores[0].valor;
  return b;
};

// Los bloques del mural. `texto` es lo que se ve y `dicho` lo que se dice: la
// pantalla lleva cifras (aNumerales, el mismo conversor de las tarjetas del
// informe) y la voz las lee en palabras, como las escribió el guion.
const armarBloques = (md) => {
  const secciones = leerSecciones(md);
  const bloques = [];
  secciones.forEach((sec, i) => {
    let primera = true;
    // REGLAS 6 Y 32: ninguna cifra en pantalla sin su fuente al pie, porque la
    // pieza tiene que entenderse con el video en silencio. La fuente de la
    // sección es su marca [FUENTE] y, si no la hay, la del primer [DATO].
    const fuenteSeccion = sec.fuente || (sec.partes.find((x) => x.tipo === "dato") || {}).fuente;
    for (const p of ordenar(sec.partes)) {
      if (p.tipo === "dato") {
        const b = { ...armarDato(p), parada: i };
        if (primera) { b.rotulo = sec.titulo; primera = false; }
        bloques.push(b);
      } else {
        oraciones(p.texto).forEach((o, k) => {
          const b = { texto: aNumerales(o), dicho: o, parada: i, seg: dura(o) };
          if (p.tesis) b.tesis = true;
          // solo donde hay una cifra DE DATO: una fecha o el número de una ley
          // no necesitan fuente al pie, y una línea repetida en cada plano
          // deja de leerse
          if (cifraDeDato(b.texto) && fuenteSeccion) b.fuente = fuenteSeccion;
          // la marca va solo en la primera oración del párrafo marcado: repetirla
          // en cada oración la convierte en ruido y deja de distinguir nada
          if (p.marca && k === 0) b.marca = p.marca;
          if (primera) { b.rotulo = sec.titulo; primera = false; }
          bloques.push(b);
        });
      }
    }
  });
  return { secciones, bloques };
};

module.exports = { leerSecciones, armarBloques, palabras, dura };

if (require.main === module) {
  const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : d; };
  const md = fs.readFileSync(arg("guion"), "utf8");
  const anchoMural = Number(arg("ancho"));
  const paradas = arg("paradas").split(",").map(Number);
  const base = arg("trozos");
  const destino = arg("salida", "ejemplos/clave-mural14.json");
  const { secciones, bloques } = armarBloques(md);
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
}
