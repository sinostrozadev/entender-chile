#!/usr/bin/env node
/**
 * panel-cronograma.js - Inyecta el cronograma de tareas y el índice del
 * taller en el panel interno, desde sus fuentes de verdad:
 *   bitacora/cronograma.json  → entre <!--CRONOGRAMA-INICIO/FIN-->
 *   bitacora/taller.json      → entre <!--TALLER-INICIO/FIN-->
 *
 * Lo llama el workflow de métricas tras metricas.js (refresco diario) y
 * cualquier sesión que cambie la arquitectura (edita el json y corre esto).
 * Sin dependencias.
 */
const fs = require("fs");
const path = require("path");

const DIR = path.join(__dirname, "..", "bitacora");
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const TIPOS = {
  claude: ["Claude", "#B06A3B"],
  gpt: ["GPT", "#2C7A5B"],
  actions: ["Actions", "#5A6B8C"],
  senal: ["Señal", "#8C5A78"],
};
const chip = (tipo) => {
  const [n, c] = TIPOS[tipo] || [tipo, "var(--gris)"];
  return `<span style="font-size:11px;letter-spacing:.08em;text-transform:uppercase;border:1px solid ${c};color:${c};padding:1px 7px;white-space:nowrap">${n}</span>`;
};

const cron = JSON.parse(fs.readFileSync(path.join(DIR, "cronograma.json"), "utf8"));
let htmlCron = `<p class="eyebrow">Cronograma del sistema · actualizado ${esc(cron.actualizado)}</p>`;
for (const fase of cron.fases) {
  htmlCron += `<p style="font-weight:600;margin:14px 0 6px">${esc(fase.nombre)}</p>`;
  htmlCron += `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13.5px">`;
  for (const it of fase.items) {
    htmlCron += `<tr style="border-top:1px solid var(--linea,#8883)">` +
      `<td class="num" style="padding:7px 10px 7px 0;white-space:nowrap;vertical-align:top;font-variant-numeric:tabular-nums">${esc(it.hora)}</td>` +
      `<td style="padding:7px 10px 7px 0;white-space:nowrap;vertical-align:top">${chip(it.tipo)}</td>` +
      `<td style="padding:7px 12px 7px 0;vertical-align:top;font-weight:600;min-width:150px">${esc(it.quien)}</td>` +
      `<td style="padding:7px 0;vertical-align:top;color:var(--gris)">${esc(it.que)}</td></tr>`;
  }
  htmlCron += `</table></div>`;
}
htmlCron += `<p class="nota" style="margin-top:10px">Fuente de verdad: bitacora/cronograma.json: quien cambia una tarea, actualiza ese archivo en el mismo commit.</p>`;

const taller = JSON.parse(fs.readFileSync(path.join(DIR, "taller.json"), "utf8"));
let htmlTaller = `<p class="eyebrow">Taller · tableros y decisiones de diseño</p><div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:13.5px">`;
for (const it of taller.items) {
  const abierto = /PENDIENTE/i.test(it.estado);
  const estado = `<span style="font-size:11px;letter-spacing:.06em;text-transform:uppercase;padding:1px 7px;white-space:nowrap;border:1px solid ${abierto ? "#B0413B" : "#2C7A5B"};color:${abierto ? "#B0413B" : "#2C7A5B"}">${esc(it.estado)}</span>`;
  const titulo = it.url ? `<a href="${esc(it.url)}" style="color:inherit">${esc(it.titulo)}</a>` : esc(it.titulo);
  htmlTaller += `<tr style="border-top:1px solid var(--linea,#8883)">` +
    `<td class="num" style="padding:7px 10px 7px 0;white-space:nowrap;vertical-align:top">${esc(it.fecha)}</td>` +
    `<td style="padding:7px 12px 7px 0;vertical-align:top;font-weight:600">${titulo}</td>` +
    `<td style="padding:7px 10px 7px 0;vertical-align:top">${estado}</td>` +
    `<td style="padding:7px 0;vertical-align:top;color:var(--gris)">${esc(it.nota || "")}</td></tr>`;
}
htmlTaller += `</table></div>`;

const rutaPanel = path.join(DIR, "panel-interno.html");
let panel = fs.readFileSync(rutaPanel, "utf8");
const reCron = /<!--CRONOGRAMA-INICIO-->[\s\S]*?<!--CRONOGRAMA-FIN-->/;
const reTaller = /<!--TALLER-INICIO-->[\s\S]*?<!--TALLER-FIN-->/;
if (!reCron.test(panel) || !reTaller.test(panel)) { console.error("el panel no trae los marcadores CRONOGRAMA/TALLER"); process.exit(1); }
panel = panel.replace(reCron, () => `<!--CRONOGRAMA-INICIO-->\n${htmlCron}\n<!--CRONOGRAMA-FIN-->`);
panel = panel.replace(reTaller, () => `<!--TALLER-INICIO-->\n${htmlTaller}\n<!--TALLER-FIN-->`);
fs.writeFileSync(rutaPanel, panel);
console.log(`panel: cronograma (${cron.fases.reduce((a, f) => a + f.items.length, 0)} tareas) y taller (${taller.items.length} ítems) inyectados`);
