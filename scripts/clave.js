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
 *       escribe contenido/claves/flujo/<slug>/tema.md  → etapa pautar (Claude escribe la pauta)
 *   node scripts/clave.js elegir <slug> --concepto "..." --noticia "..." --origen AAAA-MM-DD
 *       el camino manual, para un tema que no viene del ranking
 *   node scripts/clave.js elegir <slug> --tema-de <slug-del-tema>
 *       "Entender el caso" (02-11-2026): el tema.md sale de la ficha
 *       contenido/temas/<slug-del-tema>/ficha.md, con TEMA: y FORMATO: diario,
 *       y la propuesta abierta del tema se cierra en propuestas/
 *   node scripts/clave.js aprobar <slug> [--fecha AAAA-MM-DD]
 *       escribe aprobacion.md "APROBADA: fecha"        → etapa pauta_aprobada (GPT investiga)
 *       sin --fecha: el PRÓXIMO MIÉRCOLES, que es el día en que sale la Clave
 *   node scripts/clave.js cambiar <slug> --nota "qué cambiar"
 *       escribe aprobacion.md "CAMBIAR: nota"          → etapa reparar_pauta (Claude rehace la pauta)
 *
 * Lo que Santiago aprueba es la PAUTA que escribe Claude, y GPT recién
 * trabaja después (decisión del 27-09-2026: "siempre, antes de que envíes a
 * trabajar a GPT, me presentes del tema todo lo que debe tocar y contener").
 * Hasta el 26-09 aprobaba una idea que escribía GPT; ese camino se retiró el
 * 04-11-2026, sin flujos abiertos en él, y `aprobar` y `cambiar` se niegan a
 * tocar un flujo que caminoDe() todavía reconozca como viejo.
 *
 * Cada orden commitea y pushea (con --sin-push, solo escribe).
 *
 * Por qué --tema-de (02-11-2026). Desde el 01-11-2026 la Clave es "Entender el
 * caso": un largo por tema que cuenta un caso desde su origen con la página
 * del diario de cada hito. Ese material ya está reunido en la ficha del tema
 * (contenido/temas/README.md), con la fecha y el slug de cada noticia, así que
 * el tema.md no se escribe a mano: se arma desde la ficha, y la línea TEMA:
 * le dice a la pauta dónde está. FORMATO: diario es la señal para el render.
 * El ELEGIDO: lleva la fecha de hoy, posterior al corte, para que caminoDe dé
 * "pauta": el largo pasa por la pauta de Claude antes de que GPT trabaje.
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
const contenidoTema = ({ slug, concepto, noticia = "", origen = "", cabecera = "", cuerpo = "", ahora = hoyChile(), por = "Santiago" }) =>
  `CONCEPTO: ${concepto}\nNOTICIA: ${noticia || ""}\nORIGEN: ${origen || ""}\n${cabecera}`
  + `ELEGIDO: ${ahora} (hora de Chile), por ${por}\n${cuerpo}`
  + `\nTema elegido por ${por} para una Clave (CLAVE 4, flujo propio). Desde el\n27-09-2026: Claude escribe la PAUTA (prompts/pauta-clave.md) con todo lo que el\nvideo debe tocar; se aprueba con scripts/clave.js aprobar ${slug} y\nrecién entonces GPT investiga y escribe. Desde el 12-11-2026 elige y aprueba\nClaude y Santiago solo tiene veto (ver vetoDe).\n`;

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
  // DIAS son las fechas de los informes que la pauta y la entrega tienen que
  // leer: con ORIGEN ocupado por la semana, es la única pista de dónde está
  // el material.
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

// El tema.md de un flujo que viene de un tema seguido día a día. CONCEPTO es
// el título de la ficha y ORIGEN su fecha de apertura; NOTICIA es el primer
// hito, que es lo que dispara la historia. El cuerpo lleva el Origen de la
// ficha para que el Taller muestre de qué se trata sin abrir otro archivo; la
// cronología NO se copia, porque copiada envejece mientras la ficha sigue
// creciendo: la pauta la lee de la ficha. Devuelve null si no hay ficha.
const seccionDe = (md, nombre) => {
  const lineas = md.split("\n");
  const i = lineas.findIndex((l) => new RegExp(`^##\\s+${nombre}\\s*$`).test(l));
  if (i < 0) return "";
  const fin = lineas.findIndex((l, j) => j > i && /^##\s/.test(l));
  return lineas.slice(i + 1, fin < 0 ? undefined : fin).join("\n").trim();
};
const temaDeFicha = (slugTema, opciones = {}, raiz = RAIZ) => {
  const rutaFicha = `contenido/temas/${slugTema}/ficha.md`;
  let ficha;
  try { ficha = fs.readFileSync(path.join(raiz, rutaFicha), "utf8"); } catch { return null; }
  const titulo = (ficha.match(/^#\s+(.+)$/m) || [])[1]?.trim() || slugTema;
  const abierto = (ficha.match(/^Abierto:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1] || "";
  const primer = seccionDe(ficha, "Cronología").match(/^-\s*(\d{4}-\d{2}-\d{2})\s*\|\s*([^|]+)/m);
  const noticia = primer ? `${primer[1]}: ${primer[2].trim()}` : "";
  const origen = seccionDe(ficha, "Origen");
  return {
    rutaFicha, titulo,
    contenido: contenidoTema({
      slug: opciones.slug || slugTema, concepto: titulo, noticia, origen: abierto,
      cabecera: `TEMA: ${rutaFicha}\nFORMATO: diario\n`,
      cuerpo: origen ? `\n## Origen (de la ficha del tema)\n\n${origen}\n` : "",
      ahora: opciones.ahora, por: opciones.por,
    }),
  };
};


// --- el veto de Santiago (regla del 12-11-2026: Claude elige y aprueba, él veta) ---
// Un archivo, una línea: crear contenido/estado/veto-clave.txt (frena la Clave
// en curso y impide elegir otra) o contenido/claves/flujo/<slug>/veto.txt (frena
// solo esa). Vale en cualquier etapa hasta que el video se renderiza. Borrar el
// archivo reanuda. Antes de VETO_HASTA (12 h tras la aprobación de Claude) GPT ni
// siquiera arranca, para que un veto temprano no gaste cuota de nadie.
const VETO_GLOBAL = "contenido/estado/veto-clave.txt";
const VENTANA_VETO_HORAS = 12;
const vetoDe = (slug, raiz = RAIZ) => {
  const globalV = path.join(raiz, VETO_GLOBAL), flujoV = slug ? path.join(raiz, "contenido/claves/flujo", slug, "veto.txt") : null;
  if (fs.existsSync(globalV)) return VETO_GLOBAL;
  if (flujoV && fs.existsSync(flujoV)) return `contenido/claves/flujo/${slug}/veto.txt`;
  return null;
};
// "AAAA-MM-DD HH:MM" (hora de Chile) más n horas, sin zonas: se opera como reloj de pared.
const sumarHoras = (ahora, n) => {
  const d = new Date(`${ahora.slice(0, 10)}T${ahora.slice(11, 16)}:00Z`);
  d.setUTCHours(d.getUTCHours() + n);
  return d.toISOString().slice(0, 10) + " " + d.toISOString().slice(11, 16);
};

// La Clave de la semana sale el MIÉRCOLES: sin fecha, el próximo miércoles.
// Estrictamente el próximo: si hoy es miércoles, el de la semana siguiente,
// porque el video de hoy ya no alcanza a producirse.
const proximoMiercoles = (desde = hoyChile().slice(0, 10)) => {
  const d = new Date(`${desde}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + (((3 - d.getUTCDay() + 7) % 7) || 7));
  return d.toISOString().slice(0, 10);
};

// El camino del flujo. Hoy el único vivo es "pauta" (27-09-2026): Claude
// escribe pauta.md, Santiago la aprueba, y recién entonces GPT investiga y
// escribe. "idea" era el anterior y se retiró el 04-11-2026; se sigue
// DETECTANDO para que un tema.md viejo que reaparezca falle con un mensaje en
// vez de recorrer etapas que ya nadie atiende. Criterio, en este orden: si ya
// hay pauta.md, es pauta; si no, la fecha de `ELEGIDO:` en tema.md contra el
// corte, porque un flujo nuevo todavía no tiene pauta.md la primera vez que el
// estado lo mira.
const CORTE_PAUTA = "2026-09-27";
const caminoDe = (slug, raiz = RAIZ) => {
  const dir = path.join(raiz, "contenido/claves/flujo", slug);
  if (fs.existsSync(path.join(dir, "pauta.md"))) return "pauta";
  let tema = "";
  try { tema = fs.readFileSync(path.join(dir, "tema.md"), "utf8"); } catch { return "pauta"; }
  const elegido = (tema.match(/^ELEGIDO:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1];
  return !elegido || elegido >= CORTE_PAUTA ? "pauta" : "idea";
};

// Las dos decisiones sobre la pauta (`APROBADA: fecha` y `CAMBIAR: nota`).
// El Taller y la Bandeja todavía pasan un tercer argumento con el camino;
// se ignora, porque el único camino es la pauta.
const contenidoAprobacion = (fecha, ahora = hoyChile(), por = "Santiago", motivo = "") =>
  `APROBADA: ${fecha}\nAPROBO: ${por}, ${ahora} (hora de Chile)\n`
  + (por !== "Claude" ? "" : `VETO_HASTA: ${sumarHoras(ahora, VENTANA_VETO_HORAS)} (hora de Chile)\n`)
  + (motivo ? `MOTIVO: ${motivo}\n` : "")
  + `\nAprobada la PAUTA: GPT ya puede trabajar. Investiga con fuentes\n(investigacion.md) y después escribe la entrega y el guion, que llevan la\nfecha ${fecha}; el video sube programado ese día a la hora de la Clave.\n`
  + (por !== "Claude" ? "" : `\nAprobó Claude por la regla del 12-11-2026 (Claude aprueba, Santiago veta). Hasta\nVETO_HASTA GPT no se mueve; el veto (${VETO_GLOBAL} o <flujo>/veto.txt) frena el\nflujo en cualquier etapa, hasta el render.\n`);

const contenidoCambio = (nota, ahora = hoyChile()) =>
  `CAMBIAR: ${nota}\nPIDIO: Santiago, ${ahora} (hora de Chile)\n\n`
  + `Claude rehace la pauta con esta nota (etapa reparar_pauta) y vuelve a\nSantiago. GPT no trabaja hasta que la pauta esté aprobada.\n`;

module.exports = {
  hoyChile, ddmm, semanasDisponibles, ultimaSemana, leerCandidatos, temaDelRanking,
  contenidoTema, temaDeCandidato, temaDeFicha, seccionDe, proximoMiercoles, contenidoAprobacion, contenidoCambio,
  caminoDe, CORTE_PAUTA, vetoDe, VETO_GLOBAL, VENTANA_VETO_HORAS, sumarHoras,
};

// --- la orden de la consola -------------------------------------------------
// Bajo require.main para que el Taller pueda pedir las funciones de arriba sin
// que el script intente ejecutar una orden que nadie escribió.
if (require.main === module) {
  const args = process.argv.slice(2);
  const orden = args[0], slug = args[1];
  const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
  // Desde el 12-11-2026 elige y aprueba Claude (--por claude, con --motivo) y
  // Santiago solo veta. Con veto puesto, Claude no elige ni aprueba nada.
  const porClaude = (opt("--por") || "").toLowerCase() === "claude";
  const por = porClaude ? "Claude" : "Santiago";
  const motivo = opt("--motivo") || "";
  if (porClaude && (orden === "elegir" || orden === "aprobar")) {
    const v = vetoDe(orden === "aprobar" ? slug : null);
    if (v) { console.error(`VETO de Santiago puesto (${v}): Claude no ${orden === "elegir" ? "elige" : "aprueba"} hasta que lo borre.`); process.exit(3); }
    if (!motivo) { console.error("--por claude exige --motivo \"por qué\": criterios cumplidos y por qué este tema y no los otros"); process.exit(2); }
  }

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

  if (!orden || !slug || !/^[a-z0-9-]+$/.test(slug)) { console.error("uso: clave.js listar | elegir <slug> --candidato <n> | elegir <slug> --concepto ... --noticia ... | elegir <slug> --tema-de <slug-del-tema> | aprobar <slug> | cambiar <slug> --nota ...  (slug en minúsculas, con guiones)"); process.exit(2); }
  const dir = path.join(RAIZ, "contenido/claves/flujo", slug);
  // `archivo` puede ser una ruta o varias: elegir --tema-de escribe tema.md y
  // además mueve la propuesta, y las dos cosas viajan en el mismo commit o la
  // Bandeja vería abierta una propuesta ya aprobada. `add -A` con rutas
  // explícitas registra también el borrado de la propuesta movida.
  const commit = (msg, archivo) => {
    const rutas = [].concat(archivo);
    if (args.includes("--sin-push")) { console.log(`escrito ${rutas.join(", ")} (sin push)`); return; }
    execSync(`git add -A -- ${rutas.map((r) => `"${r}"`).join(" ")} && git commit -q -m "${msg}" && git -c rebase.autoStash=true pull --rebase -q origin main && git push -q origin main`, { cwd: RAIZ, stdio: "inherit" });
    console.log(`pusheado: ${msg}`);
  };

  if (orden === "elegir") {
    const concepto = opt("--concepto"), noticia = opt("--noticia"), origen = opt("--origen");
    let md;
    const extra = [];
    if (opt("--tema-de")) {
      const slugTema = opt("--tema-de");
      if (!/^[a-z0-9-]+$/.test(slugTema)) { console.error("--tema-de lleva el slug del tema, en minúsculas y con guiones"); process.exit(2); }
      const armado = temaDeFicha(slugTema, { slug, por });
      if (!armado) { console.error(`no hay ficha en contenido/temas/${slugTema}/ficha.md`); process.exit(2); }
      md = armado.contenido;
      // La propuesta abierta del tema se cierra al elegirlo: se archiva con su
      // fecha y su tipo, y deja libre el lugar para la próxima (hay una sola
      // abierta por tema, prompts/seguimiento-temas.md).
      const dirTema = path.join(RAIZ, "contenido/temas", slugTema);
      const rutaProp = path.join(dirTema, "propuesta.md");
      if (fs.existsSync(rutaProp)) {
        const prop = fs.readFileSync(rutaProp, "utf8");
        const tipo = /^PROPUESTA:\s*actualizar/im.test(prop) ? "actualizar" : "explicar";
        const fechaProp = (prop.match(/^FECHA:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1] || hoyChile().slice(0, 10);
        fs.mkdirSync(path.join(dirTema, "propuestas"), { recursive: true });
        let destino = path.join(dirTema, "propuestas", `${fechaProp}-${tipo}.md`);
        for (let n = 2; fs.existsSync(destino); n++) destino = path.join(dirTema, "propuestas", `${fechaProp}-${tipo}-${n}.md`);
        fs.renameSync(rutaProp, destino);
        extra.push(path.relative(RAIZ, rutaProp), path.relative(RAIZ, destino));
        console.log(`propuesta cerrada: ${path.relative(RAIZ, destino)}`);
      }
    } else if (opt("--candidato")) {
      const semana = opt("--semana") || ultimaSemana();
      if (!semana) { console.error("no hay ninguna semana con candidatos; corre scripts/semana.js y prompts/tema-semana.md"); process.exit(2); }
      const armado = temaDeCandidato(semana, opt("--candidato"), { slug, concepto, noticia });
      if (armado) armado.contenido = armado.contenido.replace(/por Santiago\n/, `por ${por}\n`);
      if (!armado) { console.error(`no hay candidato ${opt("--candidato")} en la semana ${semana}`); process.exit(2); }
      md = armado.contenido;
    } else {
      if (!concepto) { console.error("falta --concepto (o --candidato <n> de la semana)"); process.exit(2); }
      md = contenidoTema({ slug, concepto, noticia, origen });
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "tema.md"), md);
    // El porqué de la elección queda escrito (criterios en prompts/eleccion-clave.md)
    if (porClaude) {
      fs.writeFileSync(path.join(dir, "eleccion.md"), `ELEGIDO: ${hoyChile()} (hora de Chile), por Claude\n\n${motivo}\n\nVeto de Santiago: crear ${VETO_GLOBAL} (frena esta y cualquier Clave) o contenido/claves/flujo/${slug}/veto.txt (solo esta).\n`);
      extra.push(`contenido/claves/flujo/${slug}/eleccion.md`);
    }
    commit(`clave ${slug}: tema elegido por ${por}`, [`contenido/claves/flujo/${slug}/tema.md`, ...extra]);
  } else if (orden === "aprobar" || orden === "cambiar") {
    // un flujo del camino retirado no tiene quién lo atienda: escribirle una
    // aprobación lo dejaría en una etapa que estado-clave.js ya no calcula
    if (caminoDe(slug) !== "pauta") { console.error(`${slug} es del camino de la idea, retirado el 04-11-2026: escríbele pauta.md o muévelo a contenido/claves/descartadas/`); process.exit(2); }
    if (orden === "aprobar") {
      // se exige que la pauta exista, porque aprobar lo que nadie escribió deja
      // el flujo en una etapa que ningún archivo sostiene
      if (!fs.existsSync(path.join(dir, "pauta.md"))) { console.error(`no hay pauta que aprobar en ${dir}`); process.exit(2); }
      const fecha = opt("--fecha") || proximoMiercoles();
      fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoAprobacion(fecha, hoyChile(), por, motivo));
      commit(`clave ${slug}: pauta aprobada por ${por}, sale el ${fecha}`, `contenido/claves/flujo/${slug}/aprobacion.md`);
    } else {
      const nota = opt("--nota"); if (!nota) { console.error("falta --nota"); process.exit(2); }
      fs.writeFileSync(path.join(dir, "aprobacion.md"), contenidoCambio(nota, hoyChile()));
      commit(`clave ${slug}: Santiago pide cambios en la pauta`, `contenido/claves/flujo/${slug}/aprobacion.md`);
    }
  } else { console.error(`orden desconocida: ${orden}`); process.exit(2); }
}
