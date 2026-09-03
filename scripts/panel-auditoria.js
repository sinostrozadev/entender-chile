#!/usr/bin/env node
/**
 * panel-auditoria.js - Inyecta la auditoría matinal más reciente en el panel.
 *
 * Lo corre la rutina de las 09:30 justo después de escribir
 * bitacora/FECHA-auditoria.md (y cualquier sesión, cuando quiera refrescar).
 * Busca la auditoría más nueva, saca su línea ESTADO y mete el informe
 * completo (plegado) entre los marcadores <!--AUDITORIA-INICIO/FIN--> de
 * bitacora/panel-interno.html. Sin dependencias.
 */
const fs = require("fs");
const path = require("path");

const DIR = "bitacora";
const archivos = fs.readdirSync(DIR).filter((f) => /^\d{4}-\d{2}-\d{2}-auditoria\.md$/.test(f)).sort();
if (!archivos.length) { console.log("sin auditorías que inyectar"); process.exit(0); }
const archivo = archivos[archivos.length - 1];
const fecha = archivo.slice(0, 10);
const md = fs.readFileSync(path.join(DIR, archivo), "utf8");

const lineaEstado = (md.split("\n").find((l) => /^ESTADO:/i.test(l)) || "").replace(/^ESTADO:\s*/i, "").trim()
  || "(el archivo no trae línea ESTADO; auditoría escrita por la sesión de día)";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const color = /TODO EN ORDEN/i.test(lineaEstado) ? "var(--acento)"
  : /FALLAS|HOY/i.test(lineaEstado) ? "var(--cobre)" : "#8A6F3F";

const html = `<!--AUDITORIA-INICIO-->
    <p class="eyebrow">Auditoría de la mañana · ${fecha.split("-").reverse().join("-")} <span style="letter-spacing:normal;text-transform:none;color:var(--gris)">· la escribe sola la rutina de las 09:30; archivo completo en bitacora/${archivo}</span></p>
    <div style="font-family:'IBM Plex Mono',monospace;font-size:14.5px;color:${color};margin-bottom:10px">ESTADO: ${esc(lineaEstado)}</div>
    <details>
      <summary style="cursor:pointer;font-size:13px;color:var(--gris)">ver el informe completo</summary>
      <pre style="white-space:pre-wrap;font-family:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif;font-size:13.5px;line-height:1.55;color:var(--tinta);margin:12px 0 0">${esc(md)}</pre>
    </details>
    <!--AUDITORIA-FIN-->`;

const rutaPanel = path.join(DIR, "panel-interno.html");
const panel = fs.readFileSync(rutaPanel, "utf8");
const re = /<!--AUDITORIA-INICIO-->[\s\S]*?<!--AUDITORIA-FIN-->/;
if (!re.test(panel)) { console.error("el panel no trae los marcadores AUDITORIA"); process.exit(1); }
fs.writeFileSync(rutaPanel, panel.replace(re, () => html));
console.log(`panel: auditoría del ${fecha} inyectada (${lineaEstado.slice(0, 60)})`);
