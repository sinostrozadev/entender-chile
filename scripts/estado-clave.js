#!/usr/bin/env node
/**
 * estado-clave.js - El estado del FLUJO DE LA CLAVE (CLAVE 4, decisión de
 * Santiago del 16-09): la Clave ya no es diaria; sale una o dos veces por
 * semana, con dos aprobaciones suyas. Un flujo por tema, en
 * contenido/claves/flujo/<slug>/, y una vista por flujo en
 * contenido/estado/clave-<slug>.md (+ .json). Como estado.js, esto es una
 * VISTA calculada desde los archivos: la verdad son los archivos.
 *
 *   tema.md        Santiago eligió el tema (lo escribe scripts/clave.js elegir)
 *   pauta.md       Claude escribe la pauta (prompts/pauta-clave.md)
 *   aprobacion.md  Santiago aprueba (clave.js aprobar) o pide cambios (clave.js cambiar)
 *   investigacion.md  GPT investiga con fuentes (prompts/investigacion-clave.md)
 *   entrega        contenido/claves/<FECHA_PROD>-<slug>.md            (prompts/claves.md, modo flujo)
 *   guion          contenido/guiones/claves/<FECHA_PROD>-<slug>.md    (prompts/guion-claves.md)
 *   veredictos     contenido/veredictos/clave-<slug>-{investigacion,entrega,guion}.md
 *   video          contenido/descripciones/<FECHA_PROD>-clave.txt      (edicion-diaria)
 *
 * UN SOLO CAMINO, el de la pauta. La vista sigue diciendo `CAMINO: pauta`
 * porque la Bandeja, el Taller y estado-clave.yml leen esa línea. Desde el
 * 27-09-2026 Santiago pidió ver ANTES lo que el video debe tocar ("para que GPT
 * solo trabaje cuando estamos seguros"), así que la pauta la escribe Claude y
 * GPT no se mueve hasta que ella está aprobada. El camino anterior (GPT escribía
 * una idea y Santiago la aprobaba) se retiró el 04-11-2026, cuando ya no
 * quedaba ningún flujo abierto en él: su prompt está en archivo/prompts/. Si
 * clave.caminoDe() vuelve a ver un tema.md anterior al corte, el flujo se
 * salta con un error en vez de calcularle etapas que ya nadie atiende.
 *
 * Etapas, en orden: pautar (Claude) → pauta_lista (espera a
 * Santiago) → (reparar_pauta, Claude) → pauta_aprobada (GPT investiga) →
 * validar_investigacion (Claude) → (reparar_investigacion) → investigacion_lista
 * (GPT escribe la entrega) → validar_entrega → (reparar_entrega) →
 * entrega_lista (GPT escribe el guion) → validar_guion → (reparar_guion) →
 * aprobada → videos_listos.
 *
 * Turnos: GPT en pauta_aprobada, investigacion_lista, entrega_lista y
 * reparar_{investigacion,entrega,guion}; Claude en validar_*, pautar y
 * reparar_pauta; Santiago en pauta_lista; Actions en aprobada.
 *
 *   node scripts/estado-clave.js              → todos los flujos abiertos
 *   node scripts/estado-clave.js --slug X     → uno
 *   node scripts/estado-clave.js --solo-leer  → imprime sin escribir
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
// el camino del flujo lo decide un solo lugar (scripts/clave.js): la orden que
// escribe la aprobación y la vista que la lee tienen que estar de acuerdo
const clave = require("./clave.js");

const RAIZ = path.join(__dirname, "..");
const arg = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : null; };
const bandera = (n) => process.argv.includes(n);
const enChile = (d = new Date()) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const AHORA = enChile();

const existe = (p) => fs.existsSync(path.join(RAIZ, p));
const leer = (p) => (existe(p) ? fs.readFileSync(path.join(RAIZ, p), "utf8") : "");
const campo = (txt, k) => (txt.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim() || "";
let esShallow = null;
const clonCompleto = () => { if (esShallow === null) { try { esShallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], { cwd: RAIZ, encoding: "utf8" }).trim() === "true"; } catch { esShallow = false; } } return !esShallow; };
const ultimaMod = (ruta) => {
  try { if (clonCompleto()) { const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ruta], { cwd: RAIZ, encoding: "utf8" }).trim(); if (iso) return new Date(iso).getTime(); } } catch { /* sin git */ }
  try { return fs.statSync(path.join(RAIZ, ruta)).mtimeMs; } catch { return 0; }
};
const hora = (ruta) => { const t = ultimaMod(ruta); return t ? enChile(new Date(t)).slice(11) : ""; };

const DIR = "contenido/claves/flujo";
const slugs = arg("--slug") ? [arg("--slug")] : (existe(DIR) ? fs.readdirSync(path.join(RAIZ, DIR), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name) : []);

const leerVeredicto = (slug, pieza) => {
  const ruta = `contenido/veredictos/clave-${slug}-${pieza}.md`;
  if (!existe(ruta)) return null;
  const t = leer(ruta);
  const v = /^VEREDICTO:\s*APROBADA/im.test(t) ? "APROBADA" : /^VEREDICTO:\s*BLOQUEADA/im.test(t) ? "BLOQUEADA" : /^VEREDICTO:\s*(CORREGIR|RECHAZADA)/im.test(t) ? "CORREGIR" : "ilegible";
  return { ruta, veredicto: v, vuelta: Number(campo(t, "VUELTA") || 0), mod: ultimaMod(ruta) };
};

const calcular = (slug) => {
  const base = `${DIR}/${slug}`;
  const tema = `${base}/tema.md`, pauta = `${base}/pauta.md`;
  const aprob = `${base}/aprobacion.md`, investigacion = `${base}/investigacion.md`;
  if (!existe(tema)) return null;
  const temaTxt = leer(tema);
  const camino = clave.caminoDe(slug, RAIZ);
  if (camino !== "pauta") {
    console.error(`clave-${slug}: camino "${camino}" retirado el 04-11-2026; solo existe el camino pauta. El flujo se salta: o se le escribe pauta.md o se mueve a contenido/claves/descartadas/.`);
    process.exitCode = 1;
    return null;
  }
  // lo que Santiago aprueba es la pauta
  const aprobada_ = pauta;
  // fecha de producción: la fija la aprobación de Santiago; antes de eso no hay entrega ni guion
  const aprobTxt = leer(aprob);
  const aprobVigente = existe(aprob) && existe(aprobada_) && ultimaMod(aprob) >= ultimaMod(aprobada_);
  const aprobada = aprobVigente && /^APROBADA/m.test(aprobTxt);
  const cambiar = aprobVigente && /^CAMBIAR/m.test(aprobTxt);
  const fechaProd = (aprobTxt.match(/^APROBADA:\s*(\d{4}-\d{2}-\d{2})/m) || [])[1] || "";
  const entrega = fechaProd ? `contenido/claves/${fechaProd}-${slug}.md` : "";
  const guion = fechaProd ? `contenido/guiones/claves/${fechaProd}-${slug}.md` : "";
  const video = fechaProd ? `contenido/descripciones/${fechaProd}-clave.txt` : "";

  // situación de una pieza validada: falta | por_validar | reparar | bloqueada | lista
  const situar = (ruta, pieza, extraVieja = 0) => {
    if (!ruta || !existe(ruta)) return { sit: "falta", v: null };
    const v = leerVeredicto(slug, pieza);
    const mod = ultimaMod(ruta);
    if (!v || v.mod < mod || v.mod < extraVieja) return { sit: "por_validar", v };
    if (v.veredicto === "APROBADA") return { sit: "lista", v };
    if (v.veredicto === "BLOQUEADA") return { sit: "bloqueada", v };
    return { sit: "reparar", v };
  };
  // La PAUTA no lleva veredicto: la escribe Claude y la aprueba Santiago, así
  // que su situación es solo si está escrita o no. Todo lo demás pasa por el
  // validador y usa situar().
  const pPauta = { id: "pauta", etiqueta: "Pauta", prompt: "prompts/pauta-clave.md", archivo: pauta, entrada: tema, sit: existe(pauta) ? "lista" : "falta", v: null };
  const pInvestigacion = { id: "investigacion", etiqueta: "Investigación", prompt: "prompts/investigacion-clave.md", archivo: investigacion, entrada: pauta, ...situar(investigacion, "investigacion") };
  const pEntrega = { id: "entrega", etiqueta: "Entrega escrita", prompt: "prompts/claves.md", archivo: entrega, entrada: investigacion, ...situar(entrega, "entrega") };
  const pGuion = { id: "guion", etiqueta: "Guion", prompt: "prompts/guion-claves.md", archivo: guion, entrada: entrega, ...situar(guion, "guion") };
  const PIEZAS = [pPauta, pInvestigacion, pEntrega, pGuion];

  let etapa, foco = null, vuelta = 0, quien = "";
  const enJuego = (p) => { foco = p; vuelta = p.v?.vuelta || 0; };
  const QUIEN = {
    pautar: "Claude: escribe la pauta (prompts/pauta-clave.md)",
    reparar_pauta: "Claude (con las notas de Santiago en aprobacion.md)",
    pauta_lista: "Santiago: aprobar o pedir cambios (scripts/clave.js aprobar | cambiar)",
    pauta_aprobada: "GPT", investigacion_lista: "GPT", entrega_lista: "GPT",
    validar_investigacion: "Claude", validar_entrega: "Claude", validar_guion: "Claude",
    reparar_investigacion: "GPT", reparar_entrega: "GPT", reparar_guion: "GPT",
    paneles: "GPT: genera los paneles del mural (pedido en contenido/urgente/, en tandas de diez)", armar_mural: "Actions: cose y mide el mural (scripts/mural-flujo.js)",
    bloqueado_humano: "Santiago", vetada: "nadie: Santiago vetó esta Clave (borrar el archivo de veto la reanuda)", ventana_veto: "nadie: ventana de veto de Santiago (12 h tras la aprobación de Claude)",
    aprobada: "Actions: edicion-diaria.yml renderiza y sube", videos_listos: "nadie: cerrado",
  };
  // la etapa de una pieza que todavía no está lista, según su situación
  const etapaDe = (p, falta) => ({ falta, por_validar: `validar_${p.id}`, reparar: `reparar_${p.id}`, bloqueada: "bloqueado_humano" })[p.sit];

  // TRAS EL GUION APROBADO VIENEN LOS PANELES (23-10-2026). Hasta hoy el flujo
  // pasaba directo de guion aprobado a "aprobada" y a renderizar, y los paneles
  // del mural no los pedía nadie: la Clave de la semana quedó con sus tres
  // veredictos en APROBADA y sin forma de salir. Ahora hay dos etapas más y
  // ninguna gasta un turno de Claude: se validan por código (archivo entero,
  // proporción, juntura medida). Las maneja scripts/mural-flujo.js.
  //   paneles       GPT: falta alguna imagen; el script abre el pedido en tandas de diez
  //   armar_mural   Actions: están todos los paneles; se cosen y se deja mural.json
  // Un flujo con mural.json, o con formato-clasico.txt, sigue como siempre.
  // Un guion con marcas DIARIO tampoco lleva mural (04-11-2026): sale sobre la
  // página del diario, y mandarlo a paneles pedía imágenes que nadie usaría.
  const tras_guion = () => {
    const m = require("./mural-flujo.js").situacion(slug, RAIZ);
    if (!m.ctx || m.mural || m.clasico || m.diario) return "aprobada";
    if (m.noPude || m.pausa) return "bloqueado_humano";
    return m.panelesCompletos ? "armar_mural" : "paneles";
  };

  if (video && existe(video)) etapa = "videos_listos";
  else {
    if (!existe(pauta)) { enJuego(pPauta); etapa = "pautar"; }
    else if (cambiar) { enJuego(pPauta); etapa = "reparar_pauta"; }
    else if (!aprobada) { enJuego(pPauta); etapa = "pauta_lista"; }
    else if (pInvestigacion.sit !== "lista") { enJuego(pInvestigacion); etapa = etapaDe(pInvestigacion, "pauta_aprobada"); }
    else if (pEntrega.sit !== "lista") { enJuego(pEntrega); etapa = etapaDe(pEntrega, "investigacion_lista"); }
    else if (pGuion.sit !== "lista") { enJuego(pGuion); etapa = etapaDe(pGuion, "entrega_lista"); }
    else { etapa = tras_guion(); foco = pGuion; }
  }
  // REGLA DEL 12-11-2026: Claude elige y aprueba, Santiago veta. Dos frenos, ambos por archivo:
  //  - veto (contenido/estado/veto-clave.txt o <flujo>/veto.txt): congela el flujo en cualquier
  //    etapa que aún no sea video listo, incluida `aprobada` (así el render no sale).
  //  - ventana de veto: si aprobó Claude, hasta VETO_HASTA la etapa de GPT (pauta_aprobada) espera.
  const veto = clave.vetoDe(slug, RAIZ);
  let notaVeto = "";
  if (etapa !== "videos_listos" && veto) { etapa = "vetada"; notaVeto = `VETO: ${veto}`; }
  else if (etapa === "pauta_aprobada" && /^APROBO:\s*Claude/m.test(aprobTxt)) {
    const hasta = (aprobTxt.match(/^VETO_HASTA:\s*(\d{4}-\d{2}-\d{2} \d{2}:\d{2})/m) || [])[1];
    if (hasta && AHORA.slice(0, 16) < hasta) { etapa = "ventana_veto"; notaVeto = `VETO_HASTA: ${hasta}`; }
  }
  quien = QUIEN[etapa] || "";

  const lineas = [
    `FLUJO: clave`, `SLUG: ${slug}`, `CAMINO: ${camino}`, `ETAPA: ${etapa}`, `VUELTA: ${vuelta}`, `TURNO: ${quien}`,
    `FECHA_PRODUCCION: ${fechaProd || `(la fija quien aprueba la pauta: Claude, con veto de Santiago)`}`,
    `ACTUALIZADO: ${AHORA} (hora de Chile)`,
  ];
  if (notaVeto) lineas.push(notaVeto);
  if (foco) {
    lineas.push(`PIEZA: ${foco.id}`, `PROMPT: ${foco.prompt}`, `ARCHIVO: ${foco.archivo || `(sin fecha de producción todavía)`}`, `ARCHIVO_ENTRADA: ${foco.entrada}`);
    if (foco.v) lineas.push(`VEREDICTO_PIEZA: ${foco.v.veredicto} (vuelta ${foco.v.vuelta}, en ${foco.v.ruta})`);
    // de dónde salen las correcciones: del veredicto del validador, salvo
    // cuando quien pidió cambios fue Santiago sobre la pieza que él aprueba
    if (etapa.startsWith("reparar_")) lineas.push(`REPARAR: ${foco.id}`, `CORRECCIONES: ${cambiar && foco.id === "pauta" ? aprob : foco.v?.ruta || ""}`);
  }
  const concepto = campo(temaTxt, "CONCEPTO") || temaTxt.split("\n").find((l) => l.trim()) || slug;
  let md = lineas.join("\n") + "\n\n";
  md += `Tema: ${concepto}\n${campo(temaTxt, "NOTICIA") ? `Noticia de origen: ${campo(temaTxt, "NOTICIA")} (${campo(temaTxt, "ORIGEN")})\n` : ""}\n`;
  md += `Vista calculada por scripts/estado-clave.js desde los archivos del repo. No la\nedites a mano: la verdad son los archivos, esto solo los lee.\n\n`;
  md += `| Paso | Estado | Hora | Quién |\n|---|---|---|---|\n`;
  md += `| Tema elegido | listo | ${hora(tema)} | Santiago |\n`;
  const marca = { falta: "falta", por_validar: "por validar", reparar: "devuelta a GPT", bloqueada: "BLOQUEADA", lista: "aprobada" };
  const esperaAprob = aprobada ? "aprobada" : cambiar ? "pidió cambios"
    : existe(aprob) && !aprobVigente ? `vieja (la pauta cambió después)` : "espera";
  md += `| Pauta | ${existe(pauta) ? "escrita" : "falta"} | ${existe(pauta) ? hora(pauta) : ""} | Claude |\n`;
  md += `| Aprobación (Claude, veto de Santiago) | ${esperaAprob} | ${existe(aprob) ? hora(aprob) : ""} | Claude |\n`;
  md += `| Investigación | ${marca[pInvestigacion.sit]} | ${pInvestigacion.sit !== "falta" ? hora(investigacion) : ""} | GPT, valida Claude |\n`;
  md += `| Entrega escrita | ${marca[pEntrega.sit]} | ${pEntrega.sit !== "falta" ? hora(entrega) : ""} | GPT, valida Claude |\n`;
  md += `| Guion | ${marca[pGuion.sit]} | ${pGuion.sit !== "falta" ? hora(guion) : ""} | GPT, valida Claude |\n`;
  md += `| Video | ${video && existe(video) ? "listo" : "falta"} | ${video && existe(video) ? hora(video) : ""} | Actions |\n`;
  const json = { flujo: "clave", slug, camino, etapa, vuelta, turno: quien, fecha_produccion: fechaProd || null, actualizado: AHORA, concepto,
    pieza: foco ? { id: foco.id, prompt: foco.prompt, archivo: foco.archivo, entrada: foco.entrada } : null,
    piezas: PIEZAS.map((p) => ({ id: p.id, situacion: p.sit, archivo: p.archivo })) };
  return { slug, etapa, md, json };
};

const resultados = slugs.map(calcular).filter(Boolean);
for (const r of resultados) {
  if (bandera("--solo-leer")) { console.log(r.md); continue; }
  const dir = path.join(RAIZ, "contenido", "estado");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `clave-${r.slug}.md`), r.md);
  fs.writeFileSync(path.join(dir, `clave-${r.slug}.json`), JSON.stringify(r.json, null, 2) + "\n");
  console.log(`clave-${r.slug}: ${r.etapa}`);
}
if (!resultados.length) console.log("sin flujos de Clave abiertos");
