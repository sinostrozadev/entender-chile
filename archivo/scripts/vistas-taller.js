#!/usr/bin/env node
/**
 * vistas-taller.js - Las vistas previas de cada pieza, rendidas de verdad.
 *
 * Por qué existe (28-09-2026, pedido de Santiago: "agrega las vistas previas
 * de trabajos"): el taller muestra cómo se ve cada pieza, y una vista previa
 * dibujada a mano miente desde el primer cambio de diseño. Estas salen del
 * MISMO render que produce el video, así que si el informe cambia, la vista
 * cambia con él; lo único que hay que hacer es volver a correr esto.
 *
 * Y por eso existe como script y no como algo que hice una vez: una imagen
 * rendida a mano en una sesión es una imagen que nadie sabe rehacer.
 *
 * Uso:
 *   node scripts/vistas-taller.js --timeline out/FECHA/timeline.json [--salida out/vistas]
 *   node scripts/vistas-taller.js --timeline ... --vertical out/FECHA/short/timeline.json
 *
 * Deja los PNG en la carpeta de salida. Subirlos al taller y anotarlos en su
 * base es el paso siguiente, y lo hace la sesión de día con el artefacto.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const args = process.argv.slice(2);
const opt = (n, def = null) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : def; };
const SALIDA = opt("--salida", path.join("out", "vistas"));
const CHROMIUM = process.env.CHROMIUM_TALLER || "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";

// EL CUADRO QUE REPRESENTA AL INFORME: uno con imagen de sección Y tarjeta
// encima, que es lo que el informe es la mayor parte del tiempo. Se calcula
// del propio plan y no se escribe a mano: un número fijo apunta a otra cosa
// en cuanto cambia la edición.
const cuadroDelInforme = (tl) => {
  const fps = tl.meta.fps || 24;
  const f = (s) => Math.round(s * fps);
  const plan = tl.meta && tl.meta.secuencia;
  if (!plan || !plan.bloques) return null;
  const b = plan.bloques.find((x) => x.tarjetas && x.tarjetas.length > 1 && x.imagen && String(x.imagen).indexOf("secciones/") === 0)
    || plan.bloques.find((x) => x.tarjetas && x.tarjetas.length > 1);
  if (!b) return null;
  const v = b.tarjetas[0];
  return { cuadro: f(b.from) + f(v.desde) + Math.round((f(v.hasta) - f(v.desde)) * 0.5), seccion: b.texto };
};

// El cuadro del vertical: la mitad de su primera tesis, que es el texto grande.
const cuadroDelVertical = (tl) => {
  const fps = tl.meta.fps || 24;
  const t = (tl.eventos || []).filter((e) => e.tipo === "tesis" && !e.overlay);
  if (!t.length) return null;
  return { cuadro: Math.round(((t[0].from + t[0].to) / 2) * fps), seccion: t[0].seccion || "" };
};

const rendir = (entrada, props, cuadro, destino, escala) => {
  const partes = entrada ? [entrada, "Short"] : ["Informe"];
  execFileSync("npx", ["remotion", "still", ...partes, destino,
    `--props=${props}`, `--frame=${cuadro}`, `--scale=${escala}`,
    `--browser-executable=${CHROMIUM}`, "--log=error"],
    { stdio: "inherit", env: { ...process.env, REMOTION_FUENTES_LOCALES: "1" } });
};

fs.mkdirSync(SALIDA, { recursive: true });
let hechas = 0;

const largo = opt("--timeline");
if (largo && fs.existsSync(largo)) {
  const tl = JSON.parse(fs.readFileSync(largo, "utf8"));
  const c = cuadroDelInforme(tl);
  if (c) {
    const destino = path.join(SALIDA, "informe.png");
    rendir(null, largo, c.cuadro, destino, 0.5);
    console.log(`informe: ${c.seccion}, cuadro ${c.cuadro} → ${destino}`);
    hechas++;
    // EL MISMO CUADRO SIN IMÁGENES DE SECCIÓN: es el estilo "color", y sale de
    // quitarle las imágenes al plan, no de otro render distinto. Así las dos
    // vistas que se comparan en el taller son de verdad el mismo instante.
    const sin = JSON.parse(JSON.stringify(tl));
    sin.meta.secuencia.bloques.forEach((b) => { if (b.imagen && String(b.imagen).indexOf("secciones/") === 0) b.imagen = null; });
    const props = path.join(SALIDA, "timeline-sin-imagen.json");
    fs.writeFileSync(props, JSON.stringify(sin));
    const d2 = path.join(SALIDA, "informe-color.png");
    rendir(null, props, c.cuadro, d2, 0.5);
    console.log(`informe sin imágenes: cuadro ${c.cuadro} → ${d2}`);
    hechas++;
  } else console.warn(`${largo} no trae plan de secuencia: sin vista del informe.`);
}

for (const [bandera, nombre] of [["--vertical", "vertical"], ["--expres", "expres"]]) {
  const ruta = opt(bandera);
  if (!ruta || !fs.existsSync(ruta)) continue;
  const tl = JSON.parse(fs.readFileSync(ruta, "utf8"));
  const c = cuadroDelVertical(tl);
  if (!c) { console.warn(`${ruta} no trae tesis: sin vista.`); continue; }
  const destino = path.join(SALIDA, `${nombre}.png`);
  rendir("src/short-entry.tsx", ruta, c.cuadro, destino, 0.4);
  console.log(`${nombre}: cuadro ${c.cuadro} → ${destino}`);
  hechas++;
}

if (!hechas) {
  console.error("Nada que rendir. Pasa al menos --timeline, --vertical o --expres.");
  process.exit(1);
}
console.log(`${hechas} vista${hechas === 1 ? "" : "s"} en ${SALIDA}.`);
