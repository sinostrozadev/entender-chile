/**
 * clave-mural.js - La Clave de producción con EL MURAL (src/clave-mural.tsx).
 *
 * Por qué existe (12-10-2026, Santiago: "cablea la Clave y dame la versión
 * final con voz y música"). Hasta hoy el mural vivía solo en el taller: un
 * guion de prueba armado a mano (ejemplos/clave-mural14.json) con duraciones
 * ESTIMADAS por cantidad de palabras, sin voz, con las rutas de esta Clave
 * escritas en el JSON. Producción seguía saliendo con el formato clásico.
 *
 * Lo que este archivo resuelve, y por qué de esta forma:
 *
 *   EL MATERIAL SE DECLARA EN LA CARPETA DE LA CLAVE. Lo que es propio de cada
 *   mural (los trozos, su ancho, dónde para la cámara en cada sección y cuánto
 *   velo necesita cada parada) no se puede deducir del guion: sale de coser y
 *   medir los paneles (mural-coser.js, mural-velos.js). Vive en
 *   contenido/claves/flujo/<slug>/mural.json, y si ese archivo no está la Clave
 *   sale con el formato clásico como siempre. El número de paneles no se
 *   escribe en ninguna parte: son las paradas, y tienen que ser tantas como
 *   secciones tiene el guion (regla 1 de prompts/mural-clave.md).
 *
 *   LA VOZ MANDA EL RELOJ. Con voz, cada bloque dura lo que Azure tardó en
 *   decir su oración, medido en la alineación por carácter, más la entrada
 *   (y el tecleo del rótulo, si abre sección) y una cola para que el texto se
 *   vaya después de que la voz terminó. La voz se sintetiza UNA vez, de corrido
 *   (la entonación de una oración depende de la anterior), y el componente toca
 *   cada tramo en su bloque. Así el viaje de cámara y el plano del dato quedan
 *   en silencio de voz sin cortar nada: simplemente no hay tramo ahí.
 *
 *   LA CAMA SE GENERA DESDE ESOS TIEMPOS, no desde la estimación: la música
 *   transporta por sección y calla en los datos (scripts/clave-musica.js), así
 *   que tiene que conocer los tiempos reales o callaría en el lugar equivocado.
 *
 * Uso como módulo desde scripts/dia.js (el camino normal):
 *   const { materialMural, producirMural } = require("./clave-mural");
 *
 * Interruptor: CLAVE_FORMATO = (vacío) | mural | clasico. Ver dia.js.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { armarBloques } = require("./mural-guion");
const { entornoDe } = require("./pausas.js");

const RAIZ = path.join(__dirname, "..");
const FPS = 24;

// TIEMPOS DE CADA BLOQUE CON VOZ, en segundos.
// ENTRA: el texto empieza a aparecer a los 0,25 s del bloque (src/clave-mural.tsx)
// y la voz entra con él, no antes: la primera palabra que se oye ya está en
// pantalla.
const ENTRA = 0.25;
// El rótulo se teclea a 2,2 cuadros por letra con su sonido de tecla. Si la voz
// arranca encima, las teclas pisan la primera frase de cada sección: la voz
// espera a que el rótulo termine, más un respiro.
const RITMO_TECLA = 2.2;
const RESPIRO_ROTULO = 0.3;
// COLA: lo que el texto se queda después de que la voz terminó. El texto se
// desvanece en los últimos 0,45 s, así que con 0,7 nunca se va mientras la voz
// todavía dice la última palabra.
const COLA = 0.7;
// ANTES DEL DATO, un poco más de silencio (regla del mural: el silencio es el
// énfasis). La cama ya calla medio segundo antes de la cifra; esto le da a la
// voz el mismo aire, para que el número no llegue pegado a la última sílaba.
const PREVIA_DATO = 0.4;
// EL FINAL RESPIRA. Con la cola normal el video se cortaba 0,7 s después de
// "el resumen sin gritos", con la cama todavía arriba: se sentía como un corte
// y no como un cierre. Dos segundos y medio más sobre el último bloque dejan
// que la cama baje (su fundido final dura 4 s) y que el mural quede quieto.
const COLA_FINAL = 2.5;
// lo que se le deja a la voz antes de la primera palabra y después de la
// última dentro de su tramo: sin esto el recorte se come el arranque de la
// consonante y la caída de la vocal final
const MARGEN_VOZ_ANTES = 0.05, MARGEN_VOZ_DESPUES = 0.15;
// LA CAMA CONTRA LA VOZ: +4 dB sobre lo que entrega el generador, medido el
// 07-10-2026 en scripts/mezclar-voz.js (la música quedaba 20,1 dB bajo la voz y
// la referencia para narración es 15 a 20). El nivel del conjunto lo fija
// después el loudnorm a -14 LUFS en dia.js.
const MUSICA_DB = 4;

const slugDe = (rutaGuion) => path.basename(rutaGuion, ".md").replace(/^\d{4}-\d{2}-\d{2}-/, "");

// El material del mural de una Clave, o null si no tiene. `problemas` lista lo
// que no calza: un mural que no corresponde a su guion no se rinde.
const materialMural = (rutaGuion) => {
  const slug = slugDe(rutaGuion);
  const ruta = path.join("contenido", "claves", "flujo", slug, "mural.json");
  if (!fs.existsSync(path.join(RAIZ, ruta))) return null;
  const problemas = [];
  let m;
  try { m = JSON.parse(fs.readFileSync(path.join(RAIZ, ruta), "utf8")); }
  catch (e) { return { slug, ruta, material: null, problemas: [`${ruta} no se puede leer: ${e.message}`] }; }
  const trozos = Array.isArray(m.trozos) ? m.trozos : [];
  if (!trozos.length) problemas.push("mural.json no trae `trozos`");
  for (const t of trozos) if (!fs.existsSync(path.join(RAIZ, "public", t))) problemas.push(`falta el trozo public/${t}`);
  if (!(Number(m.anchoMural) > 0)) problemas.push("mural.json no trae `anchoMural`");
  if (!Array.isArray(m.paradas) || !m.paradas.length) problemas.push("mural.json no trae `paradas`");
  const { secciones } = armarBloques(fs.readFileSync(path.resolve(rutaGuion), "utf8"));
  if (Array.isArray(m.paradas) && m.paradas.length !== secciones.length) {
    problemas.push(`el mural tiene ${m.paradas.length} paradas y el guion ${secciones.length} secciones: panel N es sección N, y si no calzan la cámara se detiene sobre el motivo equivocado`);
  }
  if (m.velos && (!Array.isArray(m.velos) || m.velos.length !== (m.paradas || []).length)) problemas.push("`velos` tiene que traer uno por parada");
  return { slug, ruta, material: m, problemas };
};

// LA TENSIÓN, por defecto. La decisión del 07-10-2026 es que el arco crece a lo
// largo de varias secciones, llega arriba justo antes del Cierre y se queda
// ahí. Qué secciones exactas no quedó escrito como regla; el ejemplo de
// scripts/clave-musica.js ("9-13") es el de esta misma Clave, que son las cinco
// que preceden al Cierre. Eso es lo que se toma por defecto, y CLAVE_TENSION
// lo pisa ("9-13", "12", o "ninguna").
const rangoTension = (secciones) => {
  const v = (process.env.CLAVE_TENSION || "").trim().toLowerCase();
  if (v === "ninguna") return "";
  if (v) return v;
  let cierre = secciones.findIndex((s) => /^cierre|qu[ée] conviene recordar/i.test(s.titulo));
  if (cierre < 0) cierre = secciones.length;           // sin cierre: hasta el final
  const hasta = cierre;                                // 1-based: la anterior al cierre
  const desde = Math.max(1, hasta - 4);
  return hasta >= 1 ? `${desde}-${hasta}` : "";
};

const rotuloSeg = (r) => (r ? (Array.from(r).length * RITMO_TECLA) / FPS + RESPIRO_ROTULO : 0);

// Tramos de voz por bloque desde la alineación por carácter de tts-azure.js.
const tramosDeVoz = (alineacion, rangos) => {
  const ini = alineacion.character_start_times_seconds, fin = alineacion.character_end_times_seconds;
  const chars = alineacion.characters;
  return rangos.map(([a, b]) => {
    let t0 = null, t1 = null;
    for (let k = a; k < b; k++) {
      if (/\s/.test(chars[k])) continue;
      if (t0 === null) t0 = ini[k];
      t1 = Math.max(t1 ?? 0, fin[k]);
    }
    return { t0: t0 ?? 0, t1: t1 ?? 0 };
  });
};

const producirMural = ({ guion, OUT, fecha, conVoz, mat }) => {
  const md = fs.readFileSync(guion, "utf8");
  const { secciones, bloques } = armarBloques(md);
  const m = mat.material;
  const viajeSeg = Number(m.viajeSeg ?? 1.5);
  const dir = path.join(OUT, "mural");
  fs.mkdirSync(dir, { recursive: true });

  let voz = null;
  if (conVoz) {
    // Un solo texto con los bloques separados por párrafo, y el rango de
    // caracteres de cada uno para devolverle sus tiempos después.
    const habla = bloques.filter((b) => b.tipo !== "dato");
    let texto = "";
    const rangos = habla.map((b) => {
      if (texto) texto += "\n\n";
      const a = texto.length;
      texto += b.dicho.replace(/-/g, " ");   // la voz no lee guiones: "centro-sur" se dice "centro sur"
      return [a, texto.length];
    });
    fs.writeFileSync(path.join(dir, "narracion.txt"), texto);
    // sin cortes de sección: las pausas del mural son los viajes y los datos,
    // y ya las pone el reloj de los bloques. Un parsed.json vacío al lado de la
    // narración le dice eso a tts-azure.js sin que avise de que falta.
    fs.writeFileSync(path.join(dir, "parsed.json"), JSON.stringify({ eventos: [] }));
    execFileSync("node", [path.join(RAIZ, "scripts", "tts-azure.js"), path.join(dir, "narracion.txt"), dir],
      { stdio: "inherit", env: { ...process.env, ...entornoDe("clave") } });
    const alineacion = JSON.parse(fs.readFileSync(path.join(dir, "alignment.json"), "utf8"));
    const tramos = tramosDeVoz(alineacion, rangos);
    habla.forEach((b, i) => {
      const { t0, t1 } = tramos[i];
      const siguiente = tramos[i + 1] ? tramos[i + 1].t0 : t1 + 1;
      b._voz = [Math.max(0, t0 - MARGEN_VOZ_ANTES), Math.min(siguiente, t1 + MARGEN_VOZ_DESPUES)];
      b._habla = Math.max(0.3, t1 - t0);
    });
    voz = `${fecha}-clave-mural.mp3`;
    fs.copyFileSync(path.join(dir, "narracion.mp3"), path.join(RAIZ, "public", voz));
  }

  // el reloj: con voz, lo que tardó la voz; sin voz, la estimación de siempre
  let previa = bloques.length ? bloques[0].parada : 0;
  bloques.forEach((b, i) => {
    const viaje = b.parada !== previa ? viajeSeg : 0;
    previa = b.parada;
    if (b.tipo === "dato") return;   // 4,8 s, como en el taller
    if (b._voz) {
      const entra = ENTRA + rotuloSeg(b.rotulo);
      const antesDeDato = bloques[i + 1] && bloques[i + 1].tipo === "dato" ? PREVIA_DATO : 0;
      b.entra = Math.round(entra * 1000) / 1000;
      b.habla = Math.round(b._habla * 1000) / 1000;
      b.voz = b._voz.map((x) => Math.round(x * 1000) / 1000);
      const final = i === bloques.length - 1 ? COLA_FINAL : 0;
      b.seg = Math.round((viaje + entra + b._habla + COLA + antesDeDato + final) * 1000) / 1000;
    }
    delete b._voz; delete b._habla;
  });

  const props = {
    mural: m.trozos,
    anchoMural: Number(m.anchoMural),
    viajeSeg,
    paradas: m.paradas,
    ...(m.velos ? { velos: m.velos } : {}),
    ...(voz ? { voz, musicaDb: MUSICA_DB } : {}),
    bloques,
  };
  const rutaProps = path.join(OUT, "clave-mural.json");
  fs.writeFileSync(rutaProps, JSON.stringify(props, null, 2) + "\n");

  // LA CAMA, desde los tiempos reales. Va a public/ porque Remotion solo sirve
  // desde ahí, y no se guarda en el repo (37 MB que se rehacen del guion).
  const cama = path.join("sonidos", "cama-clave.wav");
  const tension = rangoTension(secciones);
  try {
    execFileSync("node", [path.join(RAIZ, "scripts", "clave-musica.js"), "--guion", rutaProps,
      "--salida", path.join(RAIZ, "public", cama), ...(tension ? ["--tension", tension] : [])], { stdio: "inherit" });
    props.musica = cama;
    fs.writeFileSync(rutaProps, JSON.stringify(props, null, 2) + "\n");
  } catch (e) {
    // una Clave sin cama sigue siendo una Clave: el componente sin `musica`
    // suena como antes. Perder el video entero por la música no.
    console.warn(`AVISO: la cama no se pudo generar (${e.message}); la Clave sale sin música.`);
  }

  // los capítulos, con el mismo formato que lee scripts/chapters.js
  let fr = 0, cur = null;
  const eventos = [];
  for (const b of bloques) {
    if (b.parada !== cur) { cur = b.parada; eventos.push({ tipo: "seccion", texto: secciones[b.parada].titulo, from: fr / FPS }); }
    fr += Math.round(b.seg * FPS);
  }
  const rutaCap = path.join(OUT, "capitulos-clave-mural.json");
  fs.writeFileSync(rutaCap, JSON.stringify({ meta: { duracionSeg: fr / FPS }, eventos }, null, 2));
  console.log(`mural: ${secciones.length} secciones, ${bloques.length} bloques, ${Math.floor(fr / FPS / 60)}m${Math.round((fr / FPS) % 60)}s` +
    `${voz ? ", con voz" : ", sin voz (estimado)"}, tensión ${tension || "ninguna"}`);
  return { rutaProps, rutaCap, duracionSeg: fr / FPS };
};

module.exports = { materialMural, producirMural, slugDe };
