#!/usr/bin/env node
/**
 * parse.js — Convierte un guion marcado (.md) en:
 *   out/parsed.json     eventos estructurados con offsets de caracteres
 *   out/narracion.txt   texto limpio que se envía a la voz (TTS)
 *
 * Uso: node scripts/parse.js ejemplos/guion.md out/
 *
 * Marcas soportadas (una por línea):
 *   ## Sección
 *   [TESIS] frase
 *   [DATO tipo | fuente] etiqueta: valor ; etiqueta: valor
 *   [ESQUEMA | título] A -> B -> C
 *   [HECHO] párrafo        [INTERPRETACIÓN] párrafo
 *   [CITA | quién | fuente] texto
 */
const fs = require("fs");
const path = require("path");

function parseNumero(raw) {
  // "-0,2%" -> {num:-0.2, unidad:"%"} ; "6.000" -> 6000 ; "49" -> 49
  const m = String(raw).trim().match(/[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?|[+-]?\d+(?:,\d+)?/);
  if (!m) return { num: null, unidad: String(raw).trim(), raw: String(raw).trim() };
  const num = parseFloat(m[0].replace(/\./g, "").replace(",", "."));
  const unidad = String(raw).replace(m[0], "").trim();
  return { num, unidad, raw: String(raw).trim() };
}

function parseGuion(md) {
  const lineas = md.replace(/\r\n/g, "\n").split("\n");
  let titulo = null, descripcion = [], fuentes = [];
  let zona = "pre"; // pre | descripcion | guion | fuentes
  const eventos = [];
  let buffer = null; // párrafo narrado en construcción

  const flush = () => {
    if (buffer && buffer.lineas.length) {
      eventos.push({ ...buffer, texto: buffer.lineas.join(" ").replace(/\s+/g, " ").trim() });
    }
    buffer = null;
  };

  for (let cruda of lineas) {
    const linea = cruda.trim();
    const sinNegrita = linea.replace(/\*\*/g, "");

    if (/^t[íi]tulo sugerido:/i.test(sinNegrita)) { titulo = sinNegrita.replace(/^t[íi]tulo sugerido:/i, "").trim(); continue; }
    if (/^descripci[óo]n sugerida:/i.test(sinNegrita)) { zona = "descripcion"; continue; }
    if (/^guion:/i.test(sinNegrita)) { flush(); zona = "guion"; continue; }
    if (/^fuentes:/i.test(sinNegrita)) { flush(); zona = "fuentes"; continue; }

    if (zona === "descripcion") { if (linea) descripcion.push(linea); continue; }
    if (zona === "fuentes") { if (linea) fuentes.push(linea); continue; }
    if (zona !== "guion") continue;

    if (!linea) { flush(); continue; }

    if (linea.startsWith("## ")) {
      flush();
      eventos.push({ tipo: "seccion", texto: linea.slice(3).trim() });
      continue;
    }

    let m;
    if ((m = linea.match(/^\[TESIS\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "tesis", lineas: [m[1]] };
      continue;
    }
    if ((m = linea.match(/^\[DATO\s+(\w+)\s*\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      const series = m[3].split(";").map(par => {
        const i = par.indexOf(":");
        const etiqueta = i >= 0 ? par.slice(0, i).trim() : par.trim();
        const valor = i >= 0 ? par.slice(i + 1).trim() : "";
        return { etiqueta, ...parseNumero(valor) };
      }).filter(s => s.etiqueta);
      eventos.push({ tipo: "dato", grafico: m[1].toLowerCase(), fuente: m[2].trim(), series });
      continue;
    }
    if ((m = linea.match(/^\[ESQUEMA\s*\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      eventos.push({ tipo: "esquema", titulo: m[1].trim(), elementos: m[2].split("->").map(e => e.trim()).filter(Boolean) });
      continue;
    }
    if ((m = linea.match(/^\[HECHO\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "narracion", etiqueta: "hecho", lineas: [m[1]] };
      continue;
    }
    if ((m = linea.match(/^\[INTERPRETACI[ÓO]N\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "narracion", etiqueta: "interpretacion", lineas: [m[1]] };
      continue;
    }
    if ((m = linea.match(/^\[CITA\s*\|\s*([^|]+)\|\s*([^\]]+)\]\s*(.*)$/i))) {
      flush();
      buffer = { tipo: "cita", autor: m[1].trim(), fuente: m[2].trim(), lineas: [m[3]] };
      continue;
    }
    // línea de texto normal: continúa el párrafo actual o abre uno nuevo
    if (!buffer) buffer = { tipo: "narracion", etiqueta: null, lineas: [] };
    buffer.lineas.push(linea);
  }
  flush();

  // Texto limpio + offsets, y anclaje de eventos no narrados
  let cleanText = "";
  const SEP = "\n\n";
  let ultimoNarradoIdx = -1;
  eventos.forEach((ev, i) => {
    const narrado = ev.tipo === "tesis" || ev.tipo === "narracion" || ev.tipo === "cita";
    if (narrado) {
      if (cleanText) cleanText += SEP;
      ev.charStart = cleanText.length;
      cleanText += ev.texto;
      ev.charEnd = cleanText.length; // exclusivo
      ultimoNarradoIdx = i;
    }
  });
  // anclar dato/esquema/seccion al SIGUIENTE evento narrado
  for (let i = 0; i < eventos.length; i++) {
    const ev = eventos[i];
    if (ev.tipo === "dato" || ev.tipo === "esquema" || ev.tipo === "seccion") {
      let j = i + 1;
      while (j < eventos.length && !["tesis", "narracion", "cita"].includes(eventos[j].tipo)) j++;
      ev.anchor = j < eventos.length ? j : null;
      if ((ev.tipo === "dato" || ev.tipo === "esquema") && ev.anchor != null) {
        eventos[ev.anchor].soporte = true; // ese párrafo se muestra como pie del gráfico
        ev.caption = eventos[ev.anchor].texto;
      }
    }
  }

  return { titulo, descripcion: descripcion.join(" "), fuentes, eventos, cleanText };
}

// ---- CLI ----
if (require.main === module) {
  const [, , entrada, salidaDir = "out/"] = process.argv;
  if (!entrada) { console.error("Uso: node scripts/parse.js <guion.md> [dirSalida]"); process.exit(1); }
  const md = fs.readFileSync(entrada, "utf8");
  const r = parseGuion(md);
  fs.mkdirSync(salidaDir, { recursive: true });
  fs.writeFileSync(path.join(salidaDir, "parsed.json"), JSON.stringify(r, null, 2));
  fs.writeFileSync(path.join(salidaDir, "narracion.txt"), r.cleanText, "utf8");
  const n = r.eventos.filter(e => e.charStart != null).length;
  console.log(`OK: ${r.eventos.length} eventos (${n} narrados), ${r.cleanText.length} caracteres de narración.`);
  const sinAncla = r.eventos.filter(e => (e.tipo === "dato" || e.tipo === "esquema") && e.anchor == null);
  if (sinAncla.length) console.warn(`AVISO: ${sinAncla.length} dato/esquema sin párrafo posterior; no se mostrarán.`);
}
module.exports = { parseGuion };
