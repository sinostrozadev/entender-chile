#!/usr/bin/env node
/**
 * pedir-doc-youtube.js - Abre el pedido mensual de la doc de YouTube.
 *
 * Por qué existe (06-10-2026). El proxy de salida de las sesiones de Claude
 * bloquea support.google.com entero: ese día una revisión de carátula quedó
 * sin poder verificar el ítem de sangre de la política de miniaturas, y la
 * regla de Santiago es que sin la regla delante no se prohíbe nada. GPT sí
 * puede abrir esas páginas. Así que una vez al mes las trae y quedan en el
 * repo con su fecha, que es lo que convierte "no pude leerlo" en "acá está".
 *
 * Es el pedido más barato que tenemos: UN turno de GPT al mes. No hace nada si
 * la doc del mes ya está, ni si el pedido del mes ya se abrió, así que correrlo
 * de más es gratis.
 *
 * La salida lleva el mes en el nombre a propósito: los archivos se acumulan y
 * la serie es la única forma de ver si una regla cambió y cuándo. El prompt
 * prohíbe expresamente borrar los meses anteriores.
 */
const fs = require("fs");
const path = require("path");

const hoy = new Date();
const MES = process.env.MES_DOC || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit",
}).format(hoy).slice(0, 7);

const salida = path.join("contenido", "referencia", "youtube", `${MES}-politicas.md`);
const pedido = path.join("contenido", "urgente", `PEDIDO-doc-youtube-${MES}.md`);
const fin = (m) => { console.log(m); process.exit(0); };

if (fs.existsSync(salida)) fin(`la doc de YouTube de ${MES} ya está en ${salida}: sin pedido.`);
if (fs.existsSync(pedido)) fin(`el pedido de la doc de ${MES} ya está abierto: no se repite.`);

const cuerpo = [
  `# PEDIDO · la doc de políticas de YouTube, ${MES}`,
  "Tarea: lectura",
  `Salida: ${salida}`,
  "Prompt: prompts/doc-youtube.md",
  "Pedido por: doc-youtube.yml, una vez al mes.",
  "",
  "Lee prompts/doc-youtube.md COMPLETO antes de empezar: trae las seis páginas",
  "que lista y las TRANSCRIBE, no las resume. Un resumen fiel no sirve acá,",
  "porque sobre este archivo se van a decidir prohibiciones de carátula y lo que",
  "necesitamos son las palabras exactas de YouTube.",
  "",
  "Y si una página no abre, se escribe NO SE PUDO ABRIR con el error textual.",
  "No se reconstruye de memoria ni se reemplaza por una fuente secundaria: una",
  "ausencia marcada sirve, una página inventada envenena todo lo que se apoye",
  "en ella.",
  "",
  `Deja el archivo en ${salida}, rama main, y no toques los meses anteriores.`,
].join("\n");

fs.mkdirSync(path.dirname(pedido), { recursive: true });
fs.writeFileSync(pedido, cuerpo);
console.log(`pedido de la doc de YouTube abierto: ${pedido}`);
