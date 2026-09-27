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
 *       escribe aprobacion.md "APROBADA: fecha"        → etapa pauta_aprobada (GPT investiga)
 *       en el camino viejo: idea_aprobada (GPT escribe la entrega)
 *       sin --fecha: el PRÓXIMO MIÉRCOLES, que es el día en que sale la Clave
 *   node scripts/clave.js cambiar <slug> --nota "qué cambiar"
 *       escribe aprobacion.md "CAMBIAR: nota"          → etapa reparar_pauta (Claude rehace la pauta)
 *       en el camino viejo: reparar_idea (GPT rehace la idea con la nota)
 *
 * DOS CAMINOS desde el 27-09-2026 (decisión de Santiago: "siempre, antes de
 * que envíes a trabajar a GPT, me presentes del tema todo lo que debe tocar y
 * contener"). En el camino NUEVO lo que Santiago aprueba es la PAUTA que
 * escribe Claude, y GPT recién trabaja después; en el VIEJO aprobaba la idea
 * que escribía GPT. `aprobar` y `cambiar` sirven para los dos: lo que cambia
 * es qué archivo quedó esperando y qué etapa sigue, y eso lo decide
 * caminoDe(slug), no la orden.
 *
 * Cada orden commitea y pushea (con --sin-push, solo escribe).
 *
 * Por qué hay funciones exportadas: los botones del Taller de una página
 * (scripts/taller.js) abren GitHub con el archivo YA escrito, así que
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
  + `\nTema elegido por Santiago para una Clave (CLAVE 4, flujo propio). Desde el\n27-09-2026: Claude escribe la PAUTA (prompts/pauta-clave.md) con todo lo que el\nvideo debe tocar; Santiago la aprueba con scripts/clave.js aprobar ${slug} y\nrecién entonces GPT investiga y escribe.\n`;

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

// El camino del flujo, que decide qué etapas tiene y qué aprueba Santiago:
//   "pauta" → el nuevo (27-09-2026): Claude escribe pauta.md, Santiago la
//             aprueba, y recién entonces GPT investiga y escribe.
//   "idea"  → el viejo: GPT escribía idea.md y Santiago aprobaba esa idea.
// Criterio, en este orden: si ya hay pauta.md, es nuevo; si no, la fecha de
// `ELEGIDO:` en tema.md contra el corte. Hacen falta los dos: un flujo nuevo
// todavía no tiene pauta.md la primera vez que el estado lo mira, y un flujo
// viejo no va a tener pauta.md nunca, aunque se recalcule dentro de un año.
const CORTE_PAUTA = "2026-09-27";
const caminoDe = (slug, raiz = RAIZ) => {
  const dir = path.join(raiz, "contenido/claves/flujo", slug);
  if (fs.existsSync(path.join(dir, "pauta.md"))) return "pauta";
  let tema = "";
  try { tema = fs.readFileSync(path.join(dir, "tema.md"), "utf8"); } catch { return "pauta"; }
  const elegido = (tema.match(/^ELEGIDO:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1];
  return !elegido || elegido >= CORTE_PAUTA ? "pauta" : "idea";
};

// Las dos decisiones, con el mismo formato en los dos caminos (`APROBADA:
// fecha` y `CAMBIAR: nota`): lo único que cambia es la prosa que explica qué
// sigue, porque quien rehace la pieza devuelta es Claude en el camino nuevo y
// GPT en el viejo.
const contenidoAprobacion = (fecha, ahora = hoyChile(), camino = "pauta") =>
  `APROBADA: ${fecha}\nAPROBO: Santiago, ${ahora} (hora de Chile)\n\n`
  + (camino === "pauta"
    ? `Aprobada la PAUTA: GPT ya puede trabajar. Investiga con fuentes\n(investigacion.md) y después escribe la entrega y el guion, que llevan la\nfecha ${fecha}; el video sube programado ese día a la hora de la Clave.\n`
    : `La entrega y el guion llevan la fecha ${fecha}; el video sube programado ese\ndía a la hora de la Clave.\n`);

const contenidoCambio = (nota, ahora = hoyChile(), camino = "pauta") =>
  `CAMBIAR: ${nota}\nPIDIO: Santiago, ${ahora} (hora de Chile)\n\n`
  + (camino === "pauta"
    ? `Claude rehace la pauta con esta nota (etapa reparar_pauta) y vuelve a\nSantiago. GPT no trabaja hasta que la pauta esté aprobada.\n`
    : `GPT rehace la idea con esta nota (etapa reparar_idea); Claude la valida de\nnuevo y vuelve a Santiago.\n`);

module.exports = {
  hoyChile, ddmm, semanasDisponibles, ultimaSemana, leerCandidatos, temaDelRanking,
  contenidoTema, temaDeCandidato, proximoMiercoles, contenidoAprobacion, contenidoCambio,
  caminoDe, CORTE_PAUTA,
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
    if (!abiertos.length) console.log("Sin flujos de Clave abiertos.");
    else {
      console.log("Flujos abiertos (la vista completa, en contenido/estado/clave-<slug>.md):\n");
      for (const s of abiertos) {
        // el camino y el turno salen de la vista si existe; el camino se puede
        // saber igual sin ella, porque lo dicen los archivos del flujo
        let vista = {};
        try { vista = JSON.parse(fs.readFileSync(path.join(RAIZ, "contenido/estado", `clave-${s}.json`), "utf8")); } catch { /* sin vista */ }
        console.log(`  ${s}`);
        console.log(`    camino ${vista.camino || caminoDe(s)} · etapa ${vista.etapa || "(sin vista: corre node scripts/estado-clave.js)"} · vuelta ${vista.vuelta ?? 0}`);
        console.log(`    turno: ${vista.turno || "(sin vista)"}\n`);
      }
    }
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
    // la misma orden aprueba la pauta (camino nuevo) o la idea (camino viejo):
    // se exige que la pieza exista, porque aprobar lo que nadie escribió deja
    // el flujo en una etapa que ningún archivo sostiene
    const camino = caminoDe(slug);
    const pieza = camino === "pauta" ? "pauta" : "idea";
    if (!fs.existsSync(path.join(dir, `${pieza}.md`))) { console.error(`no hay ${pieza} que aprobar en ${dir}`); process.exit(2); }
    const fecha = opt("--fecha") || proximoMiercoles();
    fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoAprobacion(fecha, hoyChile(), camino));
    commit(`clave ${slug}: ${pieza} aprobada por Santiago, sale el ${fecha}`, `contenido/claves/flujo/${slug}/aprobacion.md`);
  } else if (orden === "cambiar") {
    const nota = opt("--nota"); if (!nota) { console.error("falta --nota"); process.exit(2); }
    const camino = caminoDe(slug);
    const pieza = camino === "pauta" ? "pauta" : "idea";
    fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoCambio(nota, hoyChile(), camino));
    commit(`clave ${slug}: Santiago pide cambios en la ${pieza}`, `contenido/claves/flujo/${slug}/aprobacion.md`);
  } else { console.error(`orden desconocida: ${orden}`); process.exit(2); }
}
