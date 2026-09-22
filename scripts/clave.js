#!/usr/bin/env node
/**
 * clave.js - Las dos decisiones de Santiago en el flujo de la Clave, escritas
 * al repo (CLAVE 4: "antes de hacerla video me presentas la lista de
 * disponibles... luego que decidimos el tema, me presentarás la idea completa,
 * y recién cuando te dé el sí lo harás video"). Fase 1 del Taller: Santiago
 * decide en el chat y la sesión corre esto; en fase 2 lo harán los botones.
 *
 *   node scripts/clave.js listar
 *       el banco de temas numerado, del más nuevo al más viejo
 *   node scripts/clave.js elegir <slug> --tema <n> | --concepto "..." --noticia "..." --origen AAAA-MM-DD
 *       escribe contenido/claves/flujo/<slug>/tema.md  → etapa tema_elegido (GPT propone la idea)
 *   node scripts/clave.js aprobar <slug> [--fecha AAAA-MM-DD]
 *       escribe aprobacion.md "APROBADA: fecha"        → etapa idea_aprobada (GPT escribe la entrega)
 *       sin --fecha: hoy si son antes de las 10:00 de Chile, si no mañana (la Clave sube programada a las 14:00)
 *   node scripts/clave.js cambiar <slug> --nota "qué cambiar"
 *       escribe aprobacion.md "CAMBIAR: nota"          → etapa reparar_idea (GPT rehace la idea con la nota)
 *
 * Cada orden commitea y pushea (con --sin-push, solo escribe).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const RAIZ = path.join(__dirname, "..");
const args = process.argv.slice(2);
const orden = args[0], slug = args[1];
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const hoyChile = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
const banco = () => fs.readFileSync(path.join(RAIZ, "contenido/claves/banco-temas.md"), "utf8").split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).split("|").map((s) => s.trim())).reverse();

if (orden === "listar") {
  banco().forEach(([c, n, f], i) => console.log(`${String(i + 1).padStart(2)}. ${f} · ${c}\n    ${n}`));
  process.exit(0);
}
if (!orden || !slug || !/^[a-z0-9-]+$/.test(slug)) { console.error("uso: clave.js listar | elegir <slug> ... | aprobar <slug> | cambiar <slug> --nota ...  (slug en minúsculas, con guiones)"); process.exit(2); }
const dir = path.join(RAIZ, "contenido/claves/flujo", slug);
const commit = (msg, archivo) => {
  if (args.includes("--sin-push")) { console.log(`escrito ${archivo} (sin push)`); return; }
  execSync(`git add "${archivo}" && git commit -q -m "${msg}" && git -c rebase.autoStash=true pull --rebase -q origin main && git push -q origin main`, { cwd: RAIZ, stdio: "inherit" });
  console.log(`pusheado: ${msg}`);
};

if (orden === "elegir") {
  let concepto = opt("--concepto"), noticia = opt("--noticia"), origen = opt("--origen");
  if (opt("--tema")) { const t = banco()[Number(opt("--tema")) - 1]; if (!t) { console.error("no hay tema con ese número"); process.exit(2); } [concepto, noticia, origen] = t; }
  if (!concepto) { console.error("falta --concepto (o --tema <n> del banco)"); process.exit(2); }
  fs.mkdirSync(dir, { recursive: true });
  const md = `CONCEPTO: ${concepto}\nNOTICIA: ${noticia || ""}\nORIGEN: ${origen || ""}\nELEGIDO: ${hoyChile()} (hora de Chile), por Santiago\n\nTema elegido por Santiago para una Clave (CLAVE 4, flujo propio). GPT propone\nla idea con prompts/clave-idea.md; Claude la valida; Santiago la aprueba con\nscripts/clave.js aprobar ${slug}.\n`;
  fs.writeFileSync(path.join(dir, "tema.md"), md);
  commit(`clave ${slug}: tema elegido por Santiago`, `contenido/claves/flujo/${slug}/tema.md`);
} else if (orden === "aprobar") {
  if (!fs.existsSync(path.join(dir, "idea.md"))) { console.error(`no hay idea que aprobar en ${dir}`); process.exit(2); }
  let fecha = opt("--fecha");
  if (!fecha) { const ahora = hoyChile(); const d = new Date(`${ahora.slice(0, 10)}T12:00:00Z`); if (ahora.slice(11) >= "10:00") d.setUTCDate(d.getUTCDate() + 1); fecha = d.toISOString().slice(0, 10); }
  fs.writeFileSync(path.join(dir, "aprobacion.md"), `APROBADA: ${fecha}\nAPROBO: Santiago, ${hoyChile()} (hora de Chile)\n\nLa entrega y el guion llevan la fecha ${fecha}; el video sube programado ese\ndía a la hora de la Clave.\n`);
  commit(`clave ${slug}: idea aprobada por Santiago, sale el ${fecha}`, `contenido/claves/flujo/${slug}/aprobacion.md`);
} else if (orden === "cambiar") {
  const nota = opt("--nota"); if (!nota) { console.error("falta --nota"); process.exit(2); }
  fs.writeFileSync(path.join(dir, "aprobacion.md"), `CAMBIAR: ${nota}\nPIDIO: Santiago, ${hoyChile()} (hora de Chile)\n\nGPT rehace la idea con esta nota (etapa reparar_idea); Claude la valida de\nnuevo y vuelve a Santiago.\n`);
  commit(`clave ${slug}: Santiago pide cambios en la idea`, `contenido/claves/flujo/${slug}/aprobacion.md`);
} else { console.error(`orden desconocida: ${orden}`); process.exit(2); }
