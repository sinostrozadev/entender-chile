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
// para el índice: solo la primera cifra en pesos de la línea (la ficha completa vive en el dossier)
const cifra = (texto) => { const m = String(texto).match(/(?:USD\s*)?\$\s?[\d.,]+(?:\s*(?:millones|mil millones))?/); return m ? m[0] : String(texto).slice(0, 60); };

function listarDossiers() {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !["README.md", "indice.md"].includes(f))
    .map((f) => path.join(DIR, f));
}

function regenerarIndice() {
  const filas = listarDossiers().map((p) => {
    const t = leer(p);
    return {
      archivo: path.basename(p),
      caso: campo(t, /^# Caso:\s*(.+)$/m),
      estado: campo(t, /^Estado:\s*(\S+)/m),
      confirmado: cifra(campo(t, /Monto CONFIRMADO[^:\n]*:\s*(.+)$/m)),
      recuperado: cifra(campo(t, /Dinero recuperado[^:\n]*:\s*(.+)$/m)),
      actualizado: campo(t, /Última actualización:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/),
    };
  });
  const lineas = [
    "# Índice del observatorio",
    "",
    "(Generado por scripts/casos.js; no editar a mano.)",
    "",
    "| Caso | Estado | Monto confirmado | Recuperado | Actualizado | Dossier |",
    "|---|---|---|---|---|---|",
    ...filas.map((f) =>
      `| ${f.caso} | ${f.estado} | ${f.confirmado} | ${f.recuperado} | ${f.actualizado} | ${f.archivo} |`),
    "",
    `${filas.length} caso(s) en seguimiento, ${filas.filter((f) => f.estado !== "CERRADO").length} abierto(s). Última regeneración: ${fecha}.`,
    "",
  ];
  fs.writeFileSync(path.join(DIR, "indice.md"), lineas.join("\n"));
  console.log(`indice.md regenerado (${filas.length} casos).`);
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
}

async function main() {
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
