#!/usr/bin/env node
/**
 * casos.js - Observatorio de la plata pública: actualiza los dossiers de
 * contenido/casos/ buscando novedades en la web vía la API de Claude.
 *
 * Uso:
 *   ANTHROPIC_API_KEY=... node scripts/casos.js          → todos los casos abiertos
 *   node scripts/casos.js contenido/casos/<caso>.md      → un caso específico
 *
 * Corre en la madrugada (workflow, tras generar la edición). Sin API key
 * no falla: avisa y sale 0, para no bloquear la edición diaria.
 * Siempre regenera contenido/casos/indice.md desde las fichas.
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join("contenido", "casos");
const MODELO = process.env.MODELO || "claude-sonnet-4-6";
const WS_TYPE = process.env.WEB_SEARCH_TYPE || "web_search_20250305";
const KEY = process.env.ANTHROPIC_API_KEY;

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

const leer = (p) => fs.readFileSync(p, "utf8");
const campo = (t, re) => { const m = t.match(re); return m ? m[1].trim() : "?"; };

// Bloque <!-- datos ... --> de cada dossier: la unica fuente de las cifras del
// contador. Se lee de ahi y NUNCA de la prosa de la ficha: parsear el texto ya
// produjo dos errores de cifra (un "recuperado" tomado de una mencion ajena).
function datos(texto) {
  const m = texto.match(/<!--\s*datos([\s\S]*?)-->/);
  const d = { cuestionado: null, recuperado: null, retenido: null, naturaleza: "?" };
  if (!m) return d;
  for (const linea of m[1].split("\n")) {
    const i = linea.indexOf(":");
    if (i < 0) continue;
    const clave = linea.slice(0, i).trim();
    const valor = linea.slice(i + 1).trim();
    if (["cuestionado", "recuperado", "retenido"].includes(clave)) {
      const n = Number(valor.replace(/[^\d]/g, ""));
      d[clave] = Number.isFinite(n) ? n : null;
    } else if (clave === "naturaleza") d.naturaleza = valor;
  }
  return d;
}

const pesos = (n) => n == null ? "?" :
  n === 0 ? "$0" :
  n >= 1e9 ? `$${(n / 1e9).toLocaleString("es-CL", { maximumFractionDigits: 1 })} mil millones` :
  n >= 1e6 ? `$${(n / 1e6).toLocaleString("es-CL", { maximumFractionDigits: 1 })} millones` :
  `$${n.toLocaleString("es-CL")}`;

function listarDossiers() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !["README.md", "indice.md", "candidatos.md", "hitos.md", "por-abrir.md", "por-verificar.md"].includes(f))
    .map((f) => path.join(DIR, f));
}

function regenerarIndice() {
  const filas = listarDossiers().map((p) => {
    const t = leer(p);
    return {
      archivo: path.basename(p),
      caso: campo(t, /^# Caso:\s*(.+)$/m),
      estado: campo(t, /^Estado:\s*(\S+)/m),
      actualizado: campo(t, /Última actualización:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/),
      ...datos(t),
    };
  });

  const suma = (clave, filtro = () => true) =>
    filas.filter(filtro).reduce((a, f) => a + (f[clave] || 0), 0);

  // El contador NO suma peras con manzanas: solo agrega lo que un tribunal o
  // Contraloria cuantifico sobre hechos concretos. Las estimaciones y los
  // totales transferidos se muestran aparte, con su etiqueta.
  const DURAS = ["perjuicio-veredicto", "perjuicio-acusado", "observado-contraloria", "denunciado", "investigado"];
  const esDura = (f) => DURAS.includes(f.naturaleza);
  const cuestionadoDuro = suma("cuestionado", esDura);
  const recuperado = suma("recuperado");
  const retenido = suma("retenido");
  const porcentaje = cuestionadoDuro ? (recuperado / cuestionadoDuro * 100) : 0;

  const aparte = filas.filter((f) => !esDura(f));

  const lineas = [
    "# Índice del observatorio de la plata pública",
    "",
    "(Generado por scripts/casos.js; no editar a mano. Las cifras salen del",
    "bloque `<!-- datos -->` de cada dossier, no de la prosa.)",
    "",
    "## El contador",
    "",
    `- **Cuestionado** (cifras de tribunales, Contraloría, Fiscalía o denuncias institucionales, ${filas.filter(esDura).length} casos): **${pesos(cuestionadoDuro)}**`,
    `- **Recuperado y confirmado**: **${pesos(recuperado)}** (${porcentaje.toFixed(2)}% de lo cuestionado)`,
    `- **Retenido sin cobrar** (dinero congelado que no ha vuelto al Fisco): ${pesos(retenido)}`,
    "",
    ...(aparte.length ? [
      "Fuera del contador, por no ser comparables (se listan igual, con su etiqueta):",
      ...aparte.map((f) => `- ${f.caso}: ${pesos(f.cuestionado)} (${f.naturaleza})`),
      "",
    ] : []),
    "## Casos",
    "",
    "| Caso | Estado | Cuestionado | Naturaleza | Recuperado | Actualizado | Dossier |",
    "|---|---|---|---|---|---|---|",
    ...filas.map((f) =>
      `| ${f.caso} | ${f.estado} | ${pesos(f.cuestionado)} | ${f.naturaleza} | ${pesos(f.recuperado)} | ${f.actualizado} | ${f.archivo} |`),
    "",
    `${filas.length} caso(s) en seguimiento, ${filas.filter((f) => f.estado !== "CERRADO").length} abierto(s). Última regeneración: ${fecha}.`,
    "",
  ];
  fs.writeFileSync(path.join(DIR, "indice.md"), lineas.join("\n"));
  console.log(`indice.md regenerado (${filas.length} casos, ${pesos(recuperado)} recuperados de ${pesos(cuestionadoDuro)}).`);
}

// Cada cambio real en un dossier queda registrado en hitos.md: es lo que dispara
// la alerta del informe diario y lo que Santiago revisa para decidir si un hito
// merece video propio.
function registrarHito(archivo, caso, resumen) {
  const ruta = path.join(DIR, "hitos.md");
  const cabecera = "# Hitos del observatorio\n\n" +
    "Registro append-only de cada novedad detectada en un caso. Lo lee el\n" +
    "generador del informe diario para la alerta, y Santiago para decidir\n" +
    "qué hito merece video propio. No se edita a mano.\n\n";
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, cabecera);
  fs.appendFileSync(ruta, `- ${fecha} | ${caso} | ${resumen} | ${archivo}\n`);
  console.log("  hito registrado en hitos.md");
}

async function actualizar(ruta) {
  const dossier = leer(ruta);
  const estado = campo(dossier, /^Estado:\s*(\S+)/m);
  if (estado === "CERRADO") { console.log(`- ${path.basename(ruta)}: CERRADO, se omite.`); return; }
  const ultima = campo(dossier, /Última actualización:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/);
  if (ultima === fecha) { console.log(`- ${path.basename(ruta)}: ya actualizado hoy, se omite.`); return; }

  console.log(`- ${path.basename(ruta)}: buscando novedades...`);
  const prompt = leer(path.join("prompts", "caso-seguimiento.md"));
  const mensaje = `Hoy es ${fecha}, fecha local de Chile.\n\n${prompt}\n\n<dossier>\n${dossier}\n</dossier>`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 8000,
      messages: [{ role: "user", content: mensaje }],
      tools: [{ type: WS_TYPE, name: "web_search", max_uses: 8 }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const texto = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  if (!texto) throw new Error("la API no devolvió texto");
  if (/^sin novedades\.?$/i.test(texto)) { console.log("  sin novedades."); return; }
  if (!texto.startsWith("# Caso:")) {
    console.warn("  AVISO: respuesta con formato inesperado, no se guarda. Primeros 120 chars: " + texto.slice(0, 120));
    return;
  }
  fs.writeFileSync(ruta, texto.endsWith("\n") ? texto : texto + "\n");
  console.log("  dossier actualizado.");
  // la ultima linea del registro de actualizaciones describe que cambio
  const registro = texto.split("## Registro de actualizaciones")[1] || "";
  const ultimaLinea = registro.trim().split("\n").filter((l) => l.startsWith("-")).pop() || "";
  registrarHito(path.basename(ruta), campo(texto, /^# Caso:\s*(.+)$/m),
    ultimaLinea.replace(/^-\s*[0-9-]{10}:\s*/, "").replace(/\s*\(agente de investigación\)\s*$/, "").trim() || "actualización sin detalle");
}

// El informe del dia marca los casos nuevos con "EN SEGUIMIENTO: <nombre>".
// Aca se detectan los que aun no tienen dossier y se dejan anotados en
// por-abrir.md, ruidosamente, para que nadie se entere tres semanas despues.
function detectarNuevos() {
  const rutaInforme = path.join("contenido", "informes", `${fecha}.md`);
  if (!fs.existsSync(rutaInforme)) return;
  const marcas = [...leer(rutaInforme).matchAll(/^EN SEGUIMIENTO:\s*(.+)$/gm)]
    .map((m) => m[1].trim()).filter(Boolean);
  if (!marcas.length) return;

  const normalizar = (t) => t.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
  const existentes = listarDossiers().map((p) => normalizar(campo(leer(p), /^# Caso:\s*(.+)$/m) + " " + path.basename(p)));
  const palabrasUtiles = (t) => normalizar(t).split(" ").filter((w) => w.length > 4);

  const nuevos = marcas.filter((m) => {
    const palabras = palabrasUtiles(m);
    if (!palabras.length) return true;
    // ya existe si algun dossier comparte la mayoria de las palabras largas
    return !existentes.some((e) => palabras.filter((w) => e.includes(w)).length >= Math.ceil(palabras.length / 2));
  });
  if (!nuevos.length) { console.log(`Marcas EN SEGUIMIENTO del día: ${marcas.length}, todas con dossier abierto.`); return; }

  const ruta = path.join(DIR, "por-abrir.md");
  if (!fs.existsSync(ruta)) fs.writeFileSync(ruta,
    "# Casos marcados en el informe y aún sin dossier\n\n" +
    "Los agrega scripts/casos.js al leer las marcas EN SEGUIMIENTO del informe\n" +
    "del día. Al abrir el dossier, borra la línea correspondiente.\n\n");
  for (const n of nuevos) fs.appendFileSync(ruta, `- ${fecha} | ${n}\n`);
  console.log(`\n*** ${nuevos.length} CASO(S) NUEVO(S) POR ABRIR (ver contenido/casos/por-abrir.md):`);
  for (const n of nuevos) console.log(`      ${n}`);
  console.log("");
}

async function main() {
  detectarNuevos();
  const explicito = process.argv[2];
  const dossiers = explicito ? [explicito] : listarDossiers();
  if (!dossiers.length) { console.log("Sin dossiers en contenido/casos/. Nada que hacer."); return; }
  if (!KEY) {
    console.log("Sin ANTHROPIC_API_KEY: no se buscan novedades (solo se regenera el índice).");
  } else {
    for (const d of dossiers) {
      try { await actualizar(d); }
      catch (e) { console.error(`  ERROR en ${path.basename(d)}: ${e.message} (se continúa con el resto)`); }
    }
  }
  regenerarIndice();
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
