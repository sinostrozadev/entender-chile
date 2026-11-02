// QUÉ DIBUJO LE TOCA A CADA PÁRRAFO (30-09-2026, decisión de Santiago).
//
// El híbrido: EL SISTEMA PONE, EL GUION VETA. La regla mira el párrafo, le
// busca un concepto de la biblioteca y aplica cuatro guardas; el guion puede
// tacharla párrafo por párrafo con la marca [SIN DIBUJO].
//
// Por qué así y no de otra manera, con lo que costó averiguarlo:
//
//   Que ELIJA EL GUION se descartó por el catálogo. GPT no puede pedir un
//   dibujo sin saber cuáles existen, así que la lista tendría que vivir dentro
//   de prompts/guion-informe.md y crecer con cada dibujo nuevo: hoy 14, y el
//   vocabulario tiene 91 conceptos. Cada PNG que llega obligaría a editar el
//   prompt antes de servir de algo. Acá el catálogo es la carpeta: un dibujo
//   nuevo entra esa misma noche sin tocar nada.
//
//   Que elija SOLO EL SISTEMA se descartó al probarlo sobre guiones reales.
//   La regla sin guardas pone hasta 28 dibujos en una edición de 30 párrafos,
//   el mismo hasta nueve veces y hasta ocho seguidos. Y aun con guardas se
//   equivoca donde hace falta entender el párrafo y no reconocerlo: en la
//   edición del 29-09 le pondría La Moneda a un duelo nacional por un
//   carabinero asesinado. Esa es exactamente la que el veto existe para tachar.
//
// LAS CUATRO GUARDAS, cada una medida por separado sobre 38 guiones
// (scripts/ranura-narracion.js), en dibujos por edición:
//
//   sin ninguna                                        15
//   1. nunca donde hay una cifra que mostrar           10
//   2. nunca dos párrafos seguidos                      8
//   3. un concepto, tantas veces como variantes tenga   6
//   4. nunca en las secciones de estructura             6
//   5. nunca en un párrafo con dato o esquema encima     (ver abajo)
//
// La primera no es de ritmo sino de la firma del canal: toda cifra visible va
// con su fuente, así que la imagen reemplaza la prosa y nunca el dato (regla
// del 28-09). La cuarta salió de mirar los párrafos que la regla elegía: en
// Apertura y Cierre caían dibujos sobre el índice del día y sobre el resumen,
// que no hablan de un hecho. Cuesta un dibujo por edición y saca dos errores.
//
// LA QUINTA salió de rendir la muestra, no de medir. Un [DATO] o un [ESQUEMA]
// se anclan a un párrafo y se reparten SU intervalo entero (ver el agrupado por
// ancla en build-timeline), así que su tarjeta cubre el párrafo de punta a
// punta. Un dibujo ahí no se ve jamás, y encima gasta una variante y dispara la
// guarda de no dos seguidos para el párrafo que sigue: el dibujo se perdía dos
// veces. Ninguna medición sobre el texto podía encontrarlo, porque el choque no
// está en el guion sino en cómo el timeline reparte el tiempo.
//
// APAGADO POR DEFECTO. Es un cambio en lo que se VE, y lo que se ve lo elige
// Santiago (regla 19). DIBUJOS_PARRAFO=1 lo enciende. Sin la variable el
// timeline sale byte por byte igual que antes de que esto existiera.
const fs = require("fs");
const path = require("path");
const { CATEGORIAS } = require("./vocabulario.js");
const { encaja } = require("./conteo-conceptos.js");

const ORIGEN = path.join("contenido", "biblioteca", "grabado");
const DESTINO = path.join("public", "biblioteca");
const ORDEN = path.join(ORIGEN, "orden.json");

const activo = () => process.env.DIBUJOS_PARRAFO === "1";

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// UNA CIFRA QUE EL CANAL EXIGE MOSTRAR CON SU FUENTE. No cuenta un año ni una
// hora: "el 2027" o "las 14 horas" no son un dato que haya que acreditar.
const TIENE_CIFRA = /\d+(?:,\d+)?\s*%|\$\s?\d|\d{1,3}(?:\.\d{3})+|\bmil(?:lones|es)?\b|\bpor ciento\b/i;

// Las secciones que no cuentan un hecho: el índice, el resumen, lo que viene.
// Misma lista que ESTRUCTURA en scripts/parse.js, con dato curioso añadido.
const ESTRUCTURA = /^(apertura|la noticia del d[ií]a|en titulares|agenda|cierre|dato curioso|¿en que quedo\?)/;

// Los términos vienen agrupados por familia en el vocabulario; acá se aplanan
// conservando el orden, que es el mismo que usa el conteo: así las dos
// mediciones dicen lo mismo sobre el mismo texto.
const TERMINOS = [];
for (const grupo of CATEGORIAS) for (const t of grupo.terminos) TERMINOS.push([t[0], t[1]]);

// Qué conceptos tienen dibujo y en qué orden se usan sus variantes. El catálogo
// es la carpeta: no hay lista que mantener en ningún prompt.
//
// EL ORDEN NO ES DECORACIÓN. VARIANTES.md dice desde el 29-09 que la -a es la
// de por defecto y que las otras están para elegir según el contexto, o sea que
// no son equivalentes: congreso-b "trajo los emblemas y perdió la geometría".
// La primera versión de esta regla las rotaba por fecha, que es tratarlas como
// si dieran lo mismo, y sacó congreso-b en la primera prueba. Ahora manda el
// alfabético, que pone la -a adelante, salvo donde orden.json diga otra cosa
// (fiscalia no tiene -a: sus tres intentos son b, c y d, y el bueno es el d).
const catalogo = () => {
  const mapa = {};
  if (!fs.existsSync(ORIGEN)) return mapa;
  for (const f of fs.readdirSync(ORIGEN).filter((n) => n.endsWith(".png")).sort()) {
    const concepto = f.replace(/-[a-z]\.png$/, "");
    if (concepto === f.replace(/\.png$/, "")) continue;  // sin sufijo de variante
    (mapa[concepto] = mapa[concepto] || []).push(f);
  }
  let excepciones = {};
  try { excepciones = JSON.parse(fs.readFileSync(ORDEN, "utf8")).orden || {}; }
  catch (e) { if (e.code !== "ENOENT") console.warn(`orden.json: ${e.message}, uso el alfabético.`); }
  for (const [concepto, lista] of Object.entries(excepciones)) {
    if (!mapa[concepto]) continue;
    // solo reordena lo que existe: un nombre que sobra en orden.json no puede
    // hacer que el video pida un archivo que no está
    const primero = lista.filter((f) => mapa[concepto].includes(f));
    mapa[concepto] = [...primero, ...mapa[concepto].filter((f) => !primero.includes(f))];
  }
  return mapa;
};

const conceptoDe = (texto, disponibles) => {
  const plano = " " + sinTildes(texto) + " ";
  for (const [c, variantes] of TERMINOS) {
    for (const v of variantes) {
      if (encaja(plano, sinTildes(v)) >= 0) return disponibles[c] ? c : null;
    }
  }
  return null;
};

// UN REPARTIDOR POR EDICIÓN, porque dos de las guardas son con memoria: hay que
// saber qué salió recién y cuántas veces salió cada concepto. Una función suelta
// no puede saberlo y terminaría contando mal entre una edición y la siguiente.
//
// Un concepto que sale dos veces en la misma edición usa su segunda variante,
// y así: siempre empezando por la de por defecto, nunca rotando.
const repartidor = () => {
  const disponibles = catalogo();
  const usado = {};
  const puestos = new Set();
  let anterior = false;

  const dar = ({ texto, seccion, sinDibujo, tapado }) => {
    if (!activo()) return null;
    // un dato o un esquema anclado a este párrafo ocupa su intervalo entero
    if (tapado) { anterior = false; return null; }
    // el veto del guion manda sobre todo lo demás, incluso sobre la racha: un
    // párrafo tachado no cuenta como dibujo puesto y el siguiente sigue libre
    if (sinDibujo) { anterior = false; return null; }
    if (ESTRUCTURA.test(sinTildes(seccion || ""))) { anterior = false; return null; }
    if (TIENE_CIFRA.test(texto || "")) { anterior = false; return null; }
    if (anterior) { anterior = false; return null; }

    const c = conceptoDe(texto || "", disponibles);
    if (!c) { anterior = false; return null; }
    const variantes = disponibles[c];
    const veces = usado[c] || 0;
    if (veces >= variantes.length) { anterior = false; return null; }

    const archivo = variantes[veces];
    usado[c] = veces + 1;
    anterior = true;
    puestos.add(archivo);
    return { concepto: c, ruta: `biblioteca/${archivo}` };
  };

  // Copia a public/ SOLO los dibujos que se usaron, igual que copiarSecciones:
  // Remotion solo sirve desde public, y copiar los 24 cuando salen 6 es cargar
  // el bundle con archivos que nadie va a pedir.
  const copiar = () => {
    if (!puestos.size) return 0;
    fs.mkdirSync(DESTINO, { recursive: true });
    for (const f of puestos) fs.copyFileSync(path.join(ORIGEN, f), path.join(DESTINO, f));
    return puestos.size;
  };

  return { dar, copiar, get puestos() { return [...puestos]; } };
};

module.exports = { activo, catalogo, repartidor };
