#!/usr/bin/env node
/**
 * clave.js - Las dos decisiones de Santiago en el flujo de la Clave, escritas
 * al repo (CLAVE 4: "antes de hacerla video me presentas la lista de
 * disponibles... luego que decidimos el tema, me presentarás la idea completa,
 * y recién cuando te dé el sí lo harás video"). Fase 1 del Taller: Santiago
 * decide en el chat y la sesión corre esto; en fase 2 lo hacen los botones.
 *
 * Desde el 26-09-2026 el tema NO sale del banco diario (congelado), sino del
 * barrido semanal: scripts/semana.js puntúa la semana y prompts/tema-semana.md
 * deja tres candidatos en contenido/claves/semana/AAAA-Www-candidatos.md.
 *
 *   node scripts/clave.js listar
 *       los tres candidatos de la última semana disponible y los flujos abiertos
 *   node scripts/clave.js elegir <slug> --candidato <n> [--semana AAAA-Www]
 *       escribe contenido/claves/flujo/<slug>/tema.md  → etapa tema_elegido (GPT propone la idea)
 *   node scripts/clave.js elegir <slug> --concepto "..." --noticia "..." --origen AAAA-MM-DD
 *       el camino manual, para un tema que no viene del ranking
 *   node scripts/clave.js aprobar <slug> [--fecha AAAA-MM-DD]
 *       escribe aprobacion.md "APROBADA: fecha"        → etapa idea_aprobada (GPT escribe la entrega)
 *       sin --fecha: el PRÓXIMO MIÉRCOLES, que es el día en que sale la Clave
 *   node scripts/clave.js cambiar <slug> --nota "qué cambiar"
 *       escribe aprobacion.md "CAMBIAR: nota"          → etapa reparar_idea (GPT rehace la idea con la nota)
 *
 * Cada orden commitea y pushea (con --sin-push, solo escribe).
 *
 * Por qué hay funciones exportadas: los botones del Taller de una página
 * (scripts/taller-tablero.js) abren GitHub con el archivo YA escrito, así que
 * necesitan el mismo texto que escribe este script. Si el formato viviera en
 * dos lados derivaría, y estado-clave.js leería una cosa u otra según quién
 * apretó el botón. Por eso el texto se arma en un solo lugar, aquí, y el
 * Taller lo pide con require.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const RAIZ = path.join(__dirname, "..");
const DIR_SEMANA = path.join(RAIZ, "contenido/claves/semana");
const hoyChile = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
const ddmm = (f) => `${f.slice(8, 10)}-${f.slice(5, 7)}`;

// --- los candidatos de la semana -------------------------------------------
// La última semana con archivo de candidatos; si se pide una, esa.
const semanasDisponibles = () => (fs.existsSync(DIR_SEMANA)
  ? fs.readdirSync(DIR_SEMANA).filter((f) => /-candidatos\.md$/.test(f)).map((f) => f.replace("-candidatos.md", "")).sort()
  : []);
const ultimaSemana = () => semanasDisponibles().slice(-1)[0] || null;

// El archivo de candidatos tiene formato fijo (prompts/tema-semana.md): un
// bloque "## n. concepto" por candidato, con Puntaje/Días/Slug y dos párrafos.
const leerCandidatos = (semana) => {
  const ruta = path.join(DIR_SEMANA, `${semana}-candidatos.md`);
  if (!fs.existsSync(ruta)) return null;
  const txt = fs.readFileSync(ruta, "utf8");
  const bloques = txt.split(/^##\s+/m).slice(1);
  return bloques.map((b) => {
    const concepto = b.split("\n")[0].replace(/^\d+\.\s*/, "").trim();
    const campo = (k) => (b.match(new RegExp(`${k}:\\s*([^|\\n]+)`, "i")) || [])[1]?.trim() || "";
    // los dos párrafos largos: "Historia hasta hoy" corta donde empieza "Qué
    // enseñaría la Clave", y ese segundo llega hasta el fin del bloque (el
    // split por "## " ya separó a los candidatos entre sí).
    const historia = (b.match(/Historia hasta hoy:\s*([\s\S]*?)(?=\n\s*Qué enseñaría la Clave\s*:|$)/i) || [])[1];
    const ensenaria = (b.match(/Qué enseñaría la Clave:\s*([\s\S]*)$/i) || [])[1];
    return {
      numero: Number(b.match(/^(\d+)\./)?.[1] || 0),
      concepto,
      puntaje: campo("Puntaje"),
      dias: campo("Días").split(",").map((s) => s.trim()).filter(Boolean),
      slug: campo("Slug propuesto"),
      historia: (historia || "").trim(),
      ensenaria: (ensenaria || "").trim(),
    };
  }).filter((c) => c.numero);
};

// Los titulares de origen no están en el archivo de candidatos (su formato es
// fijo y corto): se recuperan del ranking, que es el mismo dato. Se busca el
// tema por puntaje y por los días, que juntos no se repiten.
const temaDelRanking = (semana, cand) => {
  const ruta = path.join(DIR_SEMANA, `${semana}.json`);
  if (!fs.existsSync(ruta)) return null;
  const { ranking = [] } = JSON.parse(fs.readFileSync(ruta, "utf8"));
  const mismoPuntaje = ranking.filter((t) => String(t.puntaje).replace(".", ",") === String(cand.puntaje).replace(".", ","));
  const exacto = mismoPuntaje.find((t) => t.dias.map(ddmm).join(",") === cand.dias.join(","));
  return exacto || mismoPuntaje.find((t) => t.dias.length === cand.dias.length) || mismoPuntaje[0] || null;
};

// --- el texto exacto de cada decisión, en un solo lugar ---------------------
// `ahora` es parámetro y no una llamada fija al reloj para que el Taller pueda
// fijarlo (y para que una prueba pueda comparar dos textos sin que la hora los
// separe).
const contenidoTema = ({ slug, concepto, noticia = "", origen = "", cabecera = "", cuerpo = "", ahora = hoyChile() }) =>
  `CONCEPTO: ${concepto}\nNOTICIA: ${noticia || ""}\nORIGEN: ${origen || ""}\n${cabecera}`
  + `ELEGIDO: ${ahora} (hora de Chile), por Santiago\n${cuerpo}`
  + `\nTema elegido por Santiago para una Clave (CLAVE 4, flujo propio). GPT propone\nla idea con prompts/clave-idea.md; Claude la valida; Santiago la aprueba con\nscripts/clave.js aprobar ${slug}.\n`;

// El tema.md completo de un candidato del ranking: lo que escribe
// `elegir <slug> --candidato n` y lo que lleva el botón "Elegir este tema".
// Devuelve null si ese candidato no existe en esa semana.
const temaDeCandidato = (semana, numero, opciones = {}) => {
  const cands = leerCandidatos(semana);
  const c = (cands || []).find((x) => x.numero === Number(numero));
  if (!c) return null;
  const tema = temaDelRanking(semana, c);
  const slug = opciones.slug || c.slug;
  // la noticia de origen del tema de la semana son los titulares de los días
  const noticia = opciones.noticia || (tema ? tema.titulares.map((t) => `${ddmm(t.fecha)}: ${t.titular}`).join(" | ") : c.dias.join(", "));
  const fechas = tema ? tema.titulares.map((t) => t.fecha) : [];
  // DIAS son las fechas de los informes que la idea y la entrega tienen que
  // leer: con ORIGEN ocupado por la semana, es la única pista de dónde está
  // el material (así lo dice prompts/clave-idea.md).
  const cabecera = `SEMANA: ${semana}\nCANDIDATO: ${c.numero}\nPUNTAJE: ${c.puntaje}\n`
    + `DIAS: ${fechas.length ? fechas.join(", ") : c.dias.join(", ")}\n`
    + `CANDIDATOS: contenido/claves/semana/${semana}-candidatos.md\n`
    + (tema?.dossier ? `DOSSIER: contenido/casos/${tema.dossier.slug}.md\n` : "");
  const cuerpo = `\n## Historia hasta hoy\n\n${c.historia}\n\n## Qué enseñaría la Clave\n\n${c.ensenaria}\n`;
  return {
    semana, slug, candidato: c, tema,
    ruta: `contenido/claves/flujo/${slug}/tema.md`,
    contenido: contenidoTema({ slug, concepto: opciones.concepto || c.concepto, noticia, origen: `tema de la semana ${semana}`, cabecera, cuerpo, ahora: opciones.ahora }),
  };
};

// La Clave de la semana sale el MIÉRCOLES: sin fecha, el próximo miércoles.
// Estrictamente el próximo: si hoy es miércoles, el de la semana siguiente,
// porque el video de hoy ya no alcanza a producirse.
const proximoMiercoles = (desde = hoyChile().slice(0, 10)) => {
  const d = new Date(`${desde}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + (((3 - d.getUTCDay() + 7) % 7) || 7));
  return d.toISOString().slice(0, 10);
};

const contenidoAprobacion = (fecha, ahora = hoyChile()) =>
  `APROBADA: ${fecha}\nAPROBO: Santiago, ${ahora} (hora de Chile)\n\nLa entrega y el guion llevan la fecha ${fecha}; el video sube programado ese\ndía a la hora de la Clave.\n`;

const contenidoCambio = (nota, ahora = hoyChile()) =>
  `CAMBIAR: ${nota}\nPIDIO: Santiago, ${ahora} (hora de Chile)\n\nGPT rehace la idea con esta nota (etapa reparar_idea); Claude la valida de\nnuevo y vuelve a Santiago.\n`;

module.exports = {
  hoyChile, ddmm, semanasDisponibles, ultimaSemana, leerCandidatos, temaDelRanking,
  contenidoTema, temaDeCandidato, proximoMiercoles, contenidoAprobacion, contenidoCambio,
};

// --- la orden de la consola -------------------------------------------------
// Bajo require.main para que el Taller pueda pedir las funciones de arriba sin
// que el script intente ejecutar una orden que nadie escribió.
if (require.main === module) {
  const args = process.argv.slice(2);
  const orden = args[0], slug = args[1];
  const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };

  if (orden === "listar") {
    const semana = opt("--semana") || ultimaSemana();
    const cands = semana ? leerCandidatos(semana) : null;
    if (!cands || !cands.length) {
      console.log("No hay candidatos escritos todavía. Corre `node scripts/semana.js` y después prompts/tema-semana.md.");
    } else {
      console.log(`Candidatos de la semana ${semana} (contenido/claves/semana/${semana}-candidatos.md):\n`);
      for (const c of cands) {
        console.log(`${String(c.numero).padStart(2)}. ${c.concepto}`);
        console.log(`    puntaje ${c.puntaje} · días ${c.dias.join(", ")} · slug propuesto: ${c.slug}`);
        console.log(`    elegir: node scripts/clave.js elegir ${c.slug} --candidato ${c.numero}\n`);
      }
    }
    const dirFlujo = path.join(RAIZ, "contenido/claves/flujo");
    const abiertos = fs.existsSync(dirFlujo) ? fs.readdirSync(dirFlujo, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name) : [];
    console.log(abiertos.length ? `Flujos abiertos: ${abiertos.join(", ")} (estado en contenido/estado/clave-<slug>.md)` : "Sin flujos de Clave abiertos.");
    process.exit(0);
  }

  if (!orden || !slug || !/^[a-z0-9-]+$/.test(slug)) { console.error("uso: clave.js listar | elegir <slug> --candidato <n> | elegir <slug> --concepto ... --noticia ... | aprobar <slug> | cambiar <slug> --nota ...  (slug en minúsculas, con guiones)"); process.exit(2); }
  const dir = path.join(RAIZ, "contenido/claves/flujo", slug);
  const commit = (msg, archivo) => {
    if (args.includes("--sin-push")) { console.log(`escrito ${archivo} (sin push)`); return; }
    execSync(`git add "${archivo}" && git commit -q -m "${msg}" && git -c rebase.autoStash=true pull --rebase -q origin main && git push -q origin main`, { cwd: RAIZ, stdio: "inherit" });
    console.log(`pusheado: ${msg}`);
  };

  if (orden === "elegir") {
    const concepto = opt("--concepto"), noticia = opt("--noticia"), origen = opt("--origen");
    let md;
    if (opt("--candidato")) {
      const semana = opt("--semana") || ultimaSemana();
      if (!semana) { console.error("no hay ninguna semana con candidatos; corre scripts/semana.js y prompts/tema-semana.md"); process.exit(2); }
      const armado = temaDeCandidato(semana, opt("--candidato"), { slug, concepto, noticia });
      if (!armado) { console.error(`no hay candidato ${opt("--candidato")} en la semana ${semana}`); process.exit(2); }
      md = armado.contenido;
    } else {
      if (!concepto) { console.error("falta --concepto (o --candidato <n> de la semana)"); process.exit(2); }
      md = contenidoTema({ slug, concepto, noticia, origen });
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "tema.md"), md);
    commit(`clave ${slug}: tema elegido por Santiago`, `contenido/claves/flujo/${slug}/tema.md`);
  } else if (orden === "aprobar") {
    if (!fs.existsSync(path.join(dir, "idea.md"))) { console.error(`no hay idea que aprobar en ${dir}`); process.exit(2); }
    const fecha = opt("--fecha") || proximoMiercoles();
    fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoAprobacion(fecha));
    commit(`clave ${slug}: idea aprobada por Santiago, sale el ${fecha}`, `contenido/claves/flujo/${slug}/aprobacion.md`);
  } else if (orden === "cambiar") {
    const nota = opt("--nota"); if (!nota) { console.error("falta --nota"); process.exit(2); }
    fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoCambio(nota));
    commit(`clave ${slug}: Santiago pide cambios en la idea`, `contenido/claves/flujo/${slug}/aprobacion.md`);
  } else { console.error(`orden desconocida: ${orden}`); process.exit(2); }
}
