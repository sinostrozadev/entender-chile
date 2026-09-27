#!/usr/bin/env node
/**
 * taller.js - Arma el Taller: la página del sistema interno.
 *
 * Junta taller/head.html + taller/body.html + el corpus de archivos del repo
 * + taller/app.js en un solo HTML, y lo deja donde le digas.
 *
 * El corpus son los archivos que contienen CRITERIO (prompts, estrategia,
 * ideas, bitácora, docs, dossiers de casos), no el producto diario
 * (informes, guiones, barridos): eso es lo que se revisa, no lo que se
 * mejora. Van dentro de la página, así que la página refleja el repo del
 * momento en que se armó; para actualizarla hay que rearmarla y republicarla.
 *
 * Uso:  node scripts/taller.js [salida.html]
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const RAIZ = ["prompts", "estrategia", "ideas", "docs", "bitacora", "contenido/casos"];
const SALTAR = /\/(metricas|informes|guiones|claves|barrido|preseleccion|revisiones|descripciones|podcast)\//;
const salida = process.argv[2] || "bitacora/taller.html";

const archivos = [];
function recorrer(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!/node_modules|\.git/.test(p)) recorrer(p); continue; }
    if (!/\.(md|txt)$/.test(e.name)) continue;
    if (SALTAR.test("/" + p + "/")) continue;
    const t = fs.readFileSync(p, "utf8");
    if (t.length > 200000) continue;           // un archivo enorme rompe el peso de la página
    archivos.push({ r: p, t });
  }
}
for (const d of RAIZ) if (fs.existsSync(d)) recorrer(d);
for (const f of ["README.md", "CLAUDE.md"]) if (fs.existsSync(f)) archivos.push({ r: f, t: fs.readFileSync(f, "utf8") });
archivos.sort((a, b) => (a.r < b.r ? -1 : 1));

const sello = execSync("git log -1 --date=format-local:'%d-%m-%Y %H:%M' --format=%cd", { encoding: "utf8" }).trim();
const leer = (f) => fs.readFileSync(path.join("taller", f), "utf8");

const html =
  leer("head.html") + leer("body.html") +
  "\n<script>\n/*CORPUS-INICIO*/ const ARCHIVOS = " + JSON.stringify(archivos) +
  "; const SELLO = " + JSON.stringify(sello) + "; /*CORPUS-FIN*/\n</script>\n" +
  "<script>\n" + leer("app.js") + "\n</script>\n";

fs.mkdirSync(path.dirname(salida), { recursive: true });
fs.writeFileSync(salida, html);
const kb = Math.round(Buffer.byteLength(html) / 1024);
console.log(`${salida}: ${archivos.length} archivos, ${kb} KB (repo al ${sello})`);
