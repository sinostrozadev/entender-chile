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
 * La etapa se nombra igual que en bitacora/2026-09-08-propuesta-maquina-de-estados.md.
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
  { id: "preseleccion", etiqueta: "Preselección", dueno: "GPT · prompts/seleccion.md", esperada: "02:10",
    archivos: (F) => [`contenido/preseleccion/${F}.md`] },
  { id: "informe", etiqueta: "Informe", dueno: "GPT · prompts/informe.md", esperada: "02:40",
    archivos: (F) => [`contenido/informes/${F}.md`] },
  { id: "clave", etiqueta: "Clave (entrega)", dueno: "GPT · prompts/claves.md", esperada: "03:10",
    patron: (F) => ["contenido/claves", new RegExp(`^${F}-(?!SIN-ENTREGA).+\\.md$`)] },
  { id: "guion_informe", etiqueta: "Guion del informe", dueno: "Claude · prompts/guionista.md", esperada: "03:10",
    archivos: (F) => [`contenido/guiones/informe/${F}.md`] },
  { id: "guion_clave", etiqueta: "Guion de la Clave", dueno: "Claude · prompts/guionista.md", esperada: "04:10",
    patron: (F) => ["contenido/guiones/claves", new RegExp(`^${F}-.+\\.md$`)] },
  { id: "revision", etiqueta: "Revisión editorial", dueno: "Claude · prompts/revision-editorial.md", esperada: "05:00",
    archivos: (F) => [`contenido/revisiones/${F}.md`] },
  { id: "videos", etiqueta: "Videos y descripciones", dueno: "Actions · edicion-diaria.yml", esperada: "06:15",
    archivos: (F) => [`contenido/descripciones/${F}-informe.txt`, `contenido/descripciones/${F}-clave.txt`] },
];

const existe = (p) => fs.existsSync(path.join(RAIZ, p));
const resolver = (pieza) => {
  if (pieza.archivos) {
    const rutas = pieza.archivos(FECHA);
    return { hay: rutas.every(existe), rutas: rutas.filter(existe), faltan: rutas.filter((r) => !existe(r)) };
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
    // la primera vez que apareció (--diff-filter=A), no su última edición
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

// --- veredicto de la revisión: la primera línea literal manda (la lee el pipeline)
//     Desde el 14-09 (bucle v2) hay cuatro: APROBADA, CORREGIR (vuelve al
//     autor, con REPARAR: y VUELTA:), BLOQUEADA (tope de vueltas: humano) y la
//     vieja RECHAZADA, que se trata como CORREGIR.
let veredicto = "pendiente";
let vuelta = 0;
let reparaPiezas = [];
const rutaRev = `contenido/revisiones/${FECHA}.md`;
if (existe(rutaRev)) {
  const rev = fs.readFileSync(path.join(RAIZ, rutaRev), "utf8");
  const primera = rev.split("\n")[0].trim();
  if (/^VEREDICTO:\s*APROBADA/i.test(primera)) veredicto = "APROBADA";
  else if (/^VEREDICTO:\s*(CORREGIR|RECHAZADA)/i.test(primera)) veredicto = "CORREGIR";
  else if (/^VEREDICTO:\s*BLOQUEADA/i.test(primera)) veredicto = "BLOQUEADA";
  else veredicto = "sin veredicto";
  vuelta = Number(rev.match(/^VUELTA:\s*(\d+)/im)?.[1] || 0);
  reparaPiezas = (rev.match(/^REPARAR:\s*(.+)$/im)?.[1] || "")
    .split(/[,\s]+/).map((s) => s.trim().toLowerCase()).filter(Boolean);
}

const estado = PIEZAS.map((p) => {
  const r = resolver(p);
  return { ...p, ...r, hora: r.hay && r.rutas.length ? horaDe(r.rutas[0]) : "", mod: r.hay ? modDe(r.rutas) : 0 };
});
const pieza = (id) => estado.find((p) => p.id === id);
const hecha = (id) => pieza(id)?.hay;
// vigente = existe Y no es más vieja que lo que la origina
const vigente = (id, origenes) => hecha(id) && origenes.every((o) => !hecha(o) || pieza(id).mod >= pieza(o).mod);
const guionInformeVigente = vigente("guion_informe", ["informe"]);
const guionClaveVigente = vigente("guion_clave", ["clave"]);
const revisionVigente = vigente("revision", ["informe", "clave", "guion_informe", "guion_clave"]);
for (const p of estado) {
  if (p.id === "guion_informe" && p.hay && !guionInformeVigente) p.vieja = true;
  if (p.id === "guion_clave" && p.hay && !guionClaveVigente) p.vieja = true;
  if (p.id === "revision" && p.hay && !revisionVigente) p.vieja = true;
}

// --- la etapa: la última pieza completa de la cadena, más el veredicto.
//     Ojo: clave y guion_informe corren EN PARALELO desde informe_listo, así
//     que la etapa no es un número: es la frontera de lo que ya está listo.
let etapa;
// Un día con videos publicados está CERRADO: lo que se edite después en el
// informe o los guiones es una corrección a la vista (regla dura 11), no una
// vuelta del bucle. Sin esto, agregar una fuente al informe de un día ya
// emitido dejaba el guion "viejo" y el estado reabría la cadena entera.
if (hecha("videos")) etapa = "videos_listos";
else if (!hecha("barrido")) etapa = "nuevo_dia";
else if (!hecha("preseleccion")) etapa = "barrido_listo";
else if (!hecha("informe")) etapa = "preseleccion_lista";
else if (!guionInformeVigente || !hecha("clave") || !guionClaveVigente) etapa = "informe_listo"; // guiones faltantes o viejos
else if (!revisionVigente) etapa = "guiones_listos"; // sin revisión, o revisión anterior a una corrección
else if (veredicto === "CORREGIR") etapa = "reparar";
else if (veredicto === "BLOQUEADA") etapa = "bloqueado_humano";
else if (veredicto !== "APROBADA") etapa = "guiones_listos"; // veredicto ilegible: que la revisión vuelva a mirar
else etapa = "aprobada";

// --- la vuelta del bucle (Santiago, 08-09): un error no lo parcha quien lo
//     detecta, vuelve a quien lo cometió, que verifica y repara. El estado
//     dice de quién es la pelota.
let reparar = null;
if (etapa === "reparar" || etapa === "bloqueado_humano") {
  const dueno = (id) => ({ informe: "GPT (despachador)", clave: "GPT (despachador)",
    guion_informe: "Claude (guionista)", guion_clave: "Claude (guionista)" }[id] || id);
  const piezas = reparaPiezas.length ? reparaPiezas : ["informe"];
  reparar = {
    piezas,
    pieza: piezas.join(", "),
    dueno: [...new Set(piezas.map(dueno))].join(" y "),
    motivo: rutaRev,
    vuelta,
  };
}

// --- atrasos: qué debería existir a esta hora y no está
// solo se avisa de atrasos del día en curso; con --ahora se evalúa igual
// (es el modo de prueba y el que usan las auditorías para reconstruir un día)
const mismoDia = FECHA === RELOJ.slice(0, 10) || arg("--ahora") !== null;
const atrasos = !mismoDia ? [] : estado.filter((p) => !p.hay && minutos(HORA) > minutos(p.esperada) && minutos(HORA) < 20 * 60)
  .map((p) => ({ ...p, atraso: minutos(HORA) - minutos(p.esperada) }));

// --- salida
const marca = (p) => (p.vieja ? "vieja (anterior a una corrección)" : p.hay ? "listo" : "falta");
const lineas = [
  `ETAPA: ${etapa}`,
  `VEREDICTO: ${veredicto}`,
  `VUELTA: ${vuelta}`,
  `FECHA: ${FECHA}`,
  `ACTUALIZADO: ${AHORA} (hora de Chile)`,
];
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
  piezas: estado.map((p) => ({ id: p.id, etiqueta: p.etiqueta, hay: p.hay, vieja: !!p.vieja, hora: p.hora, esperada: p.esperada, dueno: p.dueno, rutas: p.rutas })),
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
