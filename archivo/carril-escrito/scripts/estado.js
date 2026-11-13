#!/usr/bin/env node
/**
 * estado.js - En qué punto de la cadena va el día, calculado desde los
 * archivos que existen. NO es una fuente de verdad nueva: la verdad son los
 * archivos del repo (regla dura 20), esto es una VISTA que los lee y los
 * deja legibles de un vistazo, en texto plano, para GPT (que no ejecuta
 * scripts), para el panel y para el vigía.
 *
 *   node scripts/estado.js              → escribe contenido/estado/FECHA.md y .json
 *   node scripts/estado.js --fecha X    → para otro día (auditorías)
 *   node scripts/estado.js --vigilar    → además compara con la hora esperada;
 *                                         sale 1 si algo va atrasado (lo usa el vigía)
 *   node scripts/estado.js --solo-leer  → no escribe nada, solo imprime
 *   node scripts/estado.js --ahora 05:30 → finge esa hora de Chile (pruebas)
 *
 * La etapa se nombra igual que en archivo/bitacora/2026-09-08-propuesta-maquina-de-estados.md.
 * Sin dependencias.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const RAIZ = path.join(__dirname, "..");
const arg = (n) => {
  const i = process.argv.indexOf(n);
  return i >= 0 ? process.argv[i + 1] : null;
};
const bandera = (n) => process.argv.includes(n);

// --- hora de Chile, sin depender de la TZ del proceso
const enChile = (d = new Date()) =>
  new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Santiago",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(d); // "2026-09-08 22:40"

const RELOJ = enChile();
const HORA = arg("--ahora") || RELOJ.slice(11);
const AHORA = RELOJ.slice(0, 10) + " " + HORA;
const FECHA = arg("--fecha") || RELOJ.slice(0, 10);
const minutos = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

// --- las piezas de la cadena, en orden. `esperada` es la hora de Chile a la
//     que ya debería existir con holgura (no la hora a la que suele llegar).
const PIEZAS = [
  { id: "barrido", etiqueta: "Barrido", dueno: "Actions · barrido.yml", esperada: "01:40",
    archivos: (F) => [`contenido/barrido/${F}.md`] },
  // Desde el 15-09 (cadena lineal v3, pedido de Santiago): GPT escribe las
  // cinco piezas en este orden y Claude valida CADA una antes de la siguiente.
  { id: "preseleccion", etiqueta: "Preselección", dueno: "GPT · prompts/seleccion.md", esperada: "02:10",
    prompt: "prompts/seleccion.md", archivos: (F) => [`contenido/preseleccion/${F}.md`] },
  { id: "informe", etiqueta: "Informe", dueno: "GPT · prompts/informe.md", esperada: "02:40",
    prompt: "prompts/informe.md", archivos: (F) => [`contenido/informes/${F}.md`] },
  { id: "guion_informe", etiqueta: "Guion del informe", dueno: "GPT · prompts/guion-informe.md", esperada: "03:10",
    prompt: "prompts/guion-informe.md", archivos: (F) => [`contenido/guiones/informe/${F}.md`] },
  // La Clave SALIÓ de la cadena diaria el 16-09 (CLAVE 4): tiene flujo propio.
  // Desde el 26-09 el día tampoco alimenta su banco de temas: el banco quedó
  // congelado y los temas salen del barrido semanal (scripts/semana.js), que
  // corre el domingo y no es parte de la cadena diaria. El día cierra con el
  // veredicto final y los videos.
  { id: "revision", etiqueta: "Revisión (veredicto final)", dueno: "Claude · prompts/validador.md", esperada: "03:30",
    archivos: (F) => [`contenido/revisiones/${F}.md`] },
  { id: "videos", etiqueta: "Videos y descripciones", dueno: "Actions · edicion-diaria.yml", esperada: "05:15",
    archivos: (F) => [`contenido/descripciones/${F}-informe.txt`] },
];
const VALIDADAS = ["preseleccion", "informe", "guion_informe"]; // en este orden

const existe = (p) => fs.existsSync(path.join(RAIZ, p));
const resolver = (pieza) => {
  if (pieza.archivos) {
    const rutas = pieza.archivos(FECHA);
    const hay = rutas.every(existe);
    return { hay, rutas: rutas.filter(existe), faltan: hay ? [] : rutas };
  }
  const [dir, re] = pieza.patron(FECHA);
  let encontradas = [];
  try {
    encontradas = fs.readdirSync(path.join(RAIZ, dir)).filter((f) => re.test(f)).map((f) => `${dir}/${f}`);
  } catch { /* la carpeta puede no existir todavía */ }
  return { hay: encontradas.length > 0, rutas: encontradas, faltan: [] };
};

// hora del commit que trajo el archivo (informativo; si no hay git, se omite)
// En un clon SHALLOW (el checkout por defecto de GitHub Actions) el log por
// archivo no existe y `git log` devuelve el único commit que hay, o sea la
// hora del checkout: ocho piezas con la misma hora inventada. Una hora falsa
// es peor que ninguna, así que en ese caso no se muestra.
let esShallow = null;
const clonCompleto = () => {
  if (esShallow === null) {
    try {
      esShallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"],
        { cwd: RAIZ, encoding: "utf8" }).trim() === "true";
    } catch { esShallow = false; }
  }
  return !esShallow;
};
const horaDe = (ruta) => {
  if (!clonCompleto()) return "";
  try {
    const log = (args) => execFileSync("git", args, { cwd: RAIZ, encoding: "utf8" }).trim();
    // la primera vez que apareció (--diff-filter=A), no su última edición: lo
    // que interesa es a qué hora llegó la pieza del día.
    const iso = log(["log", "--diff-filter=A", "-1", "--format=%cI", "--", ruta]) || log(["log", "-1", "--format=%cI", "--", ruta]);
    return iso ? enChile(new Date(iso)).slice(11) : "";
  } catch { return ""; }
};

// --- última modificación de un archivo (ISO), para la VIGENCIA: en el bucle
//     de corrección una pieza puede existir y aun así estar vieja (un guion
//     escrito antes de que GPT corrigiera el informe; una revisión escrita
//     antes de que se corrigieran las piezas). Existir no basta: hay que ser
//     más nuevo que lo que te origina. Sale del último commit que tocó el
//     archivo; sin historia (clon shallow) cae a la fecha del sistema de
//     archivos, que en un checkout fresco es la del checkout (peor es nada).
const ultimaMod = (ruta) => {
  try {
    if (clonCompleto()) {
      const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ruta], { cwd: RAIZ, encoding: "utf8" }).trim();
      if (iso) return new Date(iso).getTime();
    }
  } catch { /* sin git */ }
  try { return fs.statSync(path.join(RAIZ, ruta)).mtimeMs; } catch { return 0; }
};
const modDe = (rutas) => Math.max(0, ...rutas.map(ultimaMod));

// --- veredictos POR PIEZA (los escribe Claude, el validador): la forma en
//     que Claude "cambia el estado". contenido/veredictos/FECHA-<pieza>.md,
//     primera línea VEREDICTO: APROBADA | CORREGIR | BLOQUEADA, luego VUELTA: N.
//     Una pieza está LISTA solo si existe y tiene APROBADA más nueva que ella.
const leerVeredicto = (id) => {
  const ruta = `contenido/veredictos/${FECHA}-${id}.md`;
  if (!existe(ruta)) return null;
  const txt = fs.readFileSync(path.join(RAIZ, ruta), "utf8");
  const primera = txt.split("\n")[0].trim();
  let v = "ilegible";
  if (/^VEREDICTO:\s*APROBADA/i.test(primera)) v = "APROBADA";
  else if (/^VEREDICTO:\s*(CORREGIR|RECHAZADA)/i.test(primera)) v = "CORREGIR";
  else if (/^VEREDICTO:\s*BLOQUEADA/i.test(primera)) v = "BLOQUEADA";
  return { ruta, veredicto: v, vuelta: Number(txt.match(/^VUELTA:\s*(\d+)/im)?.[1] || 0), mod: ultimaMod(ruta) };
};

// --- veredicto final del día (contenido/revisiones/FECHA.md): lo escribe el
//     validador al aprobar la última pieza; es la compuerta del render y de la web.
let veredicto = "pendiente";
const rutaRev = `contenido/revisiones/${FECHA}.md`;
if (existe(rutaRev)) {
  const primera = fs.readFileSync(path.join(RAIZ, rutaRev), "utf8").split("\n")[0].trim();
  veredicto = /^VEREDICTO:\s*APROBADA/i.test(primera) ? "APROBADA" : "sin veredicto final";
}

const estado = PIEZAS.map((p) => {
  const r = resolver(p);
  return { ...p, ...r, hora: r.hay && r.rutas.length ? horaDe(r.rutas[0]) : "", mod: r.hay ? modDe(r.rutas) : 0 };
});
const pieza = (id) => estado.find((p) => p.id === id);
const hecha = (id) => pieza(id)?.hay;

// situación de cada pieza validada: falta | por_validar | reparar | bloqueada | lista
for (const id of VALIDADAS) {
  const p = pieza(id);
  const v = leerVeredicto(id);
  p.veredicto = v;
  if (!p.hay) p.situacion = "falta";
  else if (!v || v.mod < p.mod) p.situacion = "por_validar"; // sin veredicto, o veredicto anterior a la última edición
  else if (v.veredicto === "APROBADA") p.situacion = "lista";
  else if (v.veredicto === "BLOQUEADA") p.situacion = "bloqueada";
  else p.situacion = "reparar"; // CORREGIR más nuevo que la pieza: la pelota es de GPT
}

// --- la etapa, LINEAL: la primera pieza que no está lista dice en qué vamos.
//     Nombres que GPT y el validador leen tal cual:
//       <pieza anterior>_lista / barrido_listo  → GPT escribe la siguiente
//       validar_<pieza>                          → Claude valida
//       reparar_<pieza>                          → GPT corrige
//       aprobada → videos_listos                 → Actions
let etapa, actual = null, vuelta = 0;
const listaDe = { preseleccion: "barrido_listo", informe: "preseleccion_lista", guion_informe: "informe_listo" };
if (hecha("videos")) etapa = "videos_listos";
else if (!hecha("barrido")) etapa = "nuevo_dia";
else {
  const pendiente = VALIDADAS.map(pieza).find((p) => p.situacion !== "lista");
  if (!pendiente) {
    if (veredicto !== "APROBADA") etapa = "validar_final"; // todo aprobado; falta el veredicto final
    else etapa = "aprobada"; // el render; desde el 26-09 no hay etapa de banco entre medio
  } else {
    actual = pendiente;
    vuelta = pendiente.veredicto?.vuelta || 0;
    etapa = { falta: listaDe[pendiente.id], por_validar: `validar_${pendiente.id}`,
      reparar: `reparar_${pendiente.id}`, bloqueada: "bloqueado_humano" }[pendiente.situacion];
  }
}
if (etapa === "validar_final") { actual = pieza("guion_informe"); }

// --- de quién es la pelota (para la vista y para el vigía)
let reparar = null;
if (actual && (etapa.startsWith("reparar_") || etapa === "bloqueado_humano")) {
  reparar = { piezas: [actual.id], pieza: actual.id, dueno: "GPT (despachador)", motivo: actual.veredicto?.ruta, vuelta };
}

// --- atrasos: qué debería existir a esta hora y no está
// solo se avisa de atrasos del día en curso; con --ahora se evalúa igual
// (es el modo de prueba y el que usan las auditorías para reconstruir un día)
const mismoDia = FECHA === RELOJ.slice(0, 10) || arg("--ahora") !== null;
const atrasos = !mismoDia ? [] : estado.filter((p) => !p.hay && minutos(HORA) > minutos(p.esperada) && minutos(HORA) < 20 * 60)
  .map((p) => ({ ...p, atraso: minutos(HORA) - minutos(p.esperada) }));

// --- salida
const marca = (p) => (p.situacion ? { falta: "falta", por_validar: "por validar", reparar: "devuelta a GPT", bloqueada: "BLOQUEADA", lista: "aprobada" }[p.situacion] : p.hay ? "listo" : "falta");
const lineas = [
  `ETAPA: ${etapa}`,
  `VEREDICTO: ${veredicto}`,
  `VUELTA: ${vuelta}`,
  `FECHA: ${FECHA}`,
  `ACTUALIZADO: ${AHORA} (hora de Chile)`,
];
// qué pieza está en juego y con qué prompt: lo lee GPT (para escribir o
// corregir) y lo lee el validador (para saber contra qué prompt verificar)
const enJuego = actual || (etapa in { barrido_listo: 1 } ? pieza("preseleccion") : null);
const siguiente = etapa.endsWith("_listo") || etapa.endsWith("_lista")
  ? VALIDADAS.map(pieza).find((p) => listaDe[p.id] === etapa) : null;
const foco = siguiente || enJuego;
if (foco) {
  lineas.push(`PIEZA: ${foco.id}`);
  lineas.push(`PROMPT: ${foco.prompt}`);
  lineas.push(`ARCHIVO: ${foco.rutas[0] || (foco.archivos ? foco.archivos(FECHA)[0] : `${foco.patron(FECHA)[0]}/${FECHA}-<slug>.md`)}`);
  if (foco.veredicto) lineas.push(`VEREDICTO_PIEZA: ${foco.veredicto.veredicto} (vuelta ${foco.veredicto.vuelta}, en ${foco.veredicto.ruta})`);
}
if (reparar) lineas.push(`REPARAR: ${reparar.pieza}`);
if (reparar) lineas.push(`REPARA: ${reparar.dueno}, leyendo las correcciones en ${reparar.motivo} (vuelta ${reparar.vuelta})`);
const faltantes = estado.filter((p) => !p.hay);
lineas.push(`FALTA: ${faltantes.length ? faltantes.map((p) => p.etiqueta).join(", ") : "nada, el día está completo"}`);

let md = lineas.join("\n") + "\n\n";
md += `Vista calculada por scripts/estado.js desde los archivos del repo. No la\n`;
md += `edites a mano: la verdad son los archivos, esto solo los lee.\n\n`;
md += `| Pieza | Estado | Llegó | Se espera a las | Quién la escribe |\n|---|---|---|---|---|\n`;
for (const p of estado) {
  md += `| ${p.etiqueta} | ${marca(p)} | ${p.hora || "—"} | ${p.esperada} | ${p.dueno} |\n`;
}
if (atrasos.length) {
  md += `\nATRASADAS a las ${HORA}: ` + atrasos.map((p) => `${p.etiqueta} (+${p.atraso} min, ${p.dueno})`).join("; ") + "\n";
}

const json = {
  fecha: FECHA, etapa, veredicto, vuelta, actualizado: AHORA, reparar,
  piezas: estado.map((p) => ({ id: p.id, etiqueta: p.etiqueta, hay: p.hay, situacion: p.situacion || (p.hay ? "listo" : "falta"), prompt: p.prompt || null, hora: p.hora, esperada: p.esperada, dueno: p.dueno, rutas: p.rutas })),
  atrasos: atrasos.map((p) => ({ id: p.id, etiqueta: p.etiqueta, atraso: p.atraso, dueno: p.dueno })),
};

if (bandera("--solo-leer")) {
  console.log(md);
} else {
  const dir = path.join(RAIZ, "contenido", "estado");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${FECHA}.md`), md);
  fs.writeFileSync(path.join(dir, `${FECHA}.json`), JSON.stringify(json, null, 2) + "\n");
  console.log(`estado ${FECHA}: ${etapa} · veredicto ${veredicto} · faltan ${faltantes.length}`);
}

if (bandera("--vigilar")) {
  if (etapa === "bloqueado_humano") {
    console.error(`BLOQUEADO a las ${HORA} (Chile): la revisión agotó las vueltas de corrección (vuelta ${vuelta}). Piezas: ${reparar?.pieza}. Lo destraba una persona leyendo ${rutaRev}.`);
    process.exit(1);
  }
  if (atrasos.length) {
    console.error(`ATRASO a las ${HORA} (Chile):`);
    for (const p of atrasos) console.error(`  - ${p.etiqueta}: se esperaba a las ${p.esperada}, van +${p.atraso} min. La escribe ${p.dueno}.`);
    if (reparar) console.error(`  - Además hay una reparación pendiente: ${reparar.pieza} (${reparar.motivo}).`);
    process.exit(1);
  }
  console.log(`sin atrasos a las ${HORA}`);
}
