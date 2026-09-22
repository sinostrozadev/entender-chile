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
 *   idea.md        GPT propone la idea (prompts/clave-idea.md)
 *   aprobacion.md  Santiago aprueba la idea (clave.js aprobar) o pide cambios (clave.js cambiar)
 *   entrega        contenido/claves/<FECHA_PROD>-<slug>.md            (prompts/claves.md, modo flujo)
 *   guion          contenido/guiones/claves/<FECHA_PROD>-<slug>.md    (prompts/guion-claves.md)
 *   veredictos     contenido/veredictos/clave-<slug>-{idea,entrega,guion}.md (el validador)
 *   video          contenido/descripciones/<FECHA_PROD>-clave.txt      (edicion-diaria)
 *
 * Etapas, en orden: tema_elegido → validar_idea → (reparar_idea) → idea_lista
 * (espera a Santiago) → idea_aprobada → validar_entrega → (reparar_entrega) →
 * entrega_lista → validar_guion → (reparar_guion) → aprobada → videos_listos.
 * Turnos: GPT en tema_elegido, idea_aprobada, entrega_lista y reparar_*;
 * Claude en validar_*; Santiago en idea_lista; Actions en aprobada.
 *
 *   node scripts/estado-clave.js              → todos los flujos abiertos
 *   node scripts/estado-clave.js --slug X     → uno
 *   node scripts/estado-clave.js --solo-leer  → imprime sin escribir
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

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
  const tema = `${base}/tema.md`, idea = `${base}/idea.md`, aprob = `${base}/aprobacion.md`;
  if (!existe(tema)) return null;
  const temaTxt = leer(tema);
  // fecha de producción: la fija la aprobación de Santiago; antes de eso no hay entrega ni guion
  const aprobTxt = leer(aprob);
  const aprobVigente = existe(aprob) && existe(idea) && ultimaMod(aprob) >= ultimaMod(idea);
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
  const PIEZAS = [
    { id: "idea", etiqueta: "Idea", prompt: "prompts/clave-idea.md", archivo: idea, entrada: tema, ...situar(idea, "idea") },
    { id: "entrega", etiqueta: "Entrega escrita", prompt: "prompts/claves.md", archivo: entrega, entrada: idea, ...situar(entrega, "entrega") },
    { id: "guion", etiqueta: "Guion", prompt: "prompts/guion-claves.md", archivo: guion, entrada: entrega, ...situar(guion, "guion") },
  ];
  const [pIdea, pEntrega, pGuion] = PIEZAS;
  const listaDe = { idea: "tema_elegido", entrega: "idea_aprobada", guion: "entrega_lista" };

  let etapa, foco = null, vuelta = 0, quien = "";
  const enJuego = (p) => { foco = p; vuelta = p.v?.vuelta || 0; };
  if (video && existe(video)) { etapa = "videos_listos"; quien = "nadie: cerrado"; }
  else if (pIdea.sit !== "lista") {
    enJuego(pIdea);
    etapa = { falta: "tema_elegido", por_validar: "validar_idea", reparar: "reparar_idea", bloqueada: "bloqueado_humano" }[pIdea.sit];
    quien = { tema_elegido: "GPT", validar_idea: "Claude", reparar_idea: "GPT", bloqueado_humano: "Santiago" }[etapa];
  } else if (cambiar) { enJuego(pIdea); etapa = "reparar_idea"; quien = "GPT (con las notas de Santiago en aprobacion.md)"; }
  else if (!aprobada) { enJuego(pIdea); etapa = "idea_lista"; quien = "Santiago: aprobar o pedir cambios (scripts/clave.js aprobar | cambiar)"; }
  else if (pEntrega.sit !== "lista") {
    enJuego(pEntrega);
    etapa = { falta: "idea_aprobada", por_validar: "validar_entrega", reparar: "reparar_entrega", bloqueada: "bloqueado_humano" }[pEntrega.sit];
    quien = { idea_aprobada: "GPT", validar_entrega: "Claude", reparar_entrega: "GPT", bloqueado_humano: "Santiago" }[etapa];
  } else if (pGuion.sit !== "lista") {
    enJuego(pGuion);
    etapa = { falta: "entrega_lista", por_validar: "validar_guion", reparar: "reparar_guion", bloqueada: "bloqueado_humano" }[pGuion.sit];
    quien = { entrega_lista: "GPT", validar_guion: "Claude", reparar_guion: "GPT", bloqueado_humano: "Santiago" }[etapa];
  } else { etapa = "aprobada"; quien = "Actions: edicion-diaria.yml renderiza y sube"; foco = pGuion; }

  const lineas = [
    `FLUJO: clave`, `SLUG: ${slug}`, `ETAPA: ${etapa}`, `VUELTA: ${vuelta}`, `TURNO: ${quien}`,
    `FECHA_PRODUCCION: ${fechaProd || "(la fija Santiago al aprobar la idea)"}`,
    `ACTUALIZADO: ${AHORA} (hora de Chile)`,
  ];
  if (foco) {
    lineas.push(`PIEZA: ${foco.id}`, `PROMPT: ${foco.prompt}`, `ARCHIVO: ${foco.archivo || `(sin fecha de producción todavía)`}`, `ARCHIVO_ENTRADA: ${foco.entrada}`);
    if (foco.v) lineas.push(`VEREDICTO_PIEZA: ${foco.v.veredicto} (vuelta ${foco.v.vuelta}, en ${foco.v.ruta})`);
    if (etapa.startsWith("reparar_")) lineas.push(`REPARAR: ${foco.id}`, `CORRECCIONES: ${cambiar && foco.id === "idea" ? aprob : foco.v?.ruta || ""}`);
  }
  const concepto = campo(temaTxt, "CONCEPTO") || temaTxt.split("\n").find((l) => l.trim()) || slug;
  let md = lineas.join("\n") + "\n\n";
  md += `Tema: ${concepto}\n${campo(temaTxt, "NOTICIA") ? `Noticia de origen: ${campo(temaTxt, "NOTICIA")} (${campo(temaTxt, "ORIGEN")})\n` : ""}\n`;
  md += `Vista calculada por scripts/estado-clave.js desde los archivos del repo. No la\nedites a mano: la verdad son los archivos, esto solo los lee.\n\n`;
  md += `| Paso | Estado | Hora | Quién |\n|---|---|---|---|\n`;
  md += `| Tema elegido | listo | ${hora(tema)} | Santiago |\n`;
  const marca = { falta: "falta", por_validar: "por validar", reparar: "devuelta a GPT", bloqueada: "BLOQUEADA", lista: "aprobada" };
  md += `| Idea | ${marca[pIdea.sit]} | ${pIdea.sit !== "falta" ? hora(idea) : ""} | GPT, valida Claude |\n`;
  md += `| Aprobación de Santiago | ${aprobada ? "aprobada" : cambiar ? "pidió cambios" : existe(aprob) && !aprobVigente ? "vieja (la idea cambió después)" : "espera"} | ${existe(aprob) ? hora(aprob) : ""} | Santiago |\n`;
  md += `| Entrega escrita | ${marca[pEntrega.sit]} | ${pEntrega.sit !== "falta" ? hora(entrega) : ""} | GPT, valida Claude |\n`;
  md += `| Guion | ${marca[pGuion.sit]} | ${pGuion.sit !== "falta" ? hora(guion) : ""} | GPT, valida Claude |\n`;
  md += `| Video | ${video && existe(video) ? "listo" : "falta"} | ${video && existe(video) ? hora(video) : ""} | Actions |\n`;
  const json = { flujo: "clave", slug, etapa, vuelta, turno: quien, fecha_produccion: fechaProd || null, actualizado: AHORA, concepto,
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
