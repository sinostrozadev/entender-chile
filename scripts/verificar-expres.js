#!/usr/bin/env node
/**
 * verificar-expres.js - El control de calidad del Short exprés, ANTES de producirlo.
 *
 * Uso: node scripts/verificar-expres.js contenido/urgente/GUION-<slug>.md
 *
 * Por qué existe (07-09-2026): el exprés era la única pieza del canal que iba
 * del modelo a YouTube sin un segundo par de ojos. El informe y la Clave pasan
 * por la revisión editorial de las 04:40; el exprés no pasaba por nada. Ese día
 * salió publicado un Short que decía "el Banco Central recortó su proyección de
 * crecimiento a 1,3%" cuando la fuente decía que la MEDIANA DE UNA ENCUESTA a
 * analistas había bajado a eso, y el dato venía de un informe de cinco días
 * antes. Santiago lo despublicó.
 *
 * Qué verifica (determinista, sin modelo, milisegundos):
 *   1. CIFRAS TRAZABLES: cada cifra del guion aparece en el material capturado,
 *      en el informe de HOY o en las citas de FUENTE-<slug>.md (la lectura de
 *      GPT, 23-09). Es exactamente el error de la TPM.
 *   2. FUENTE: hay al menos una marca [FUENTE ...].
 *   3. LARGO: 60 a 140 palabras narradas (el prompt pide 90-120; el margen
 *      evita rechazar por una palabra).
 *   4. FORMATO: título, descripción, "Guion:" y "Fuentes:".
 *
 * Si algo falla escribe contenido/urgente/RECHAZADO-<slug>.txt con los motivos
 * y sale con código 1: el workflow no produce el video y la rutina de guardia
 * avisa al teléfono con la causa. NO verifica que el guion no reformule la
 * fuente (eso pide criterio): para eso está la regla del prompt.
 */
const fs = require("fs");
const path = require("path");

const ruta = process.argv[2];
if (!ruta || !fs.existsSync(ruta)) { console.error("Uso: node scripts/verificar-expres.js contenido/urgente/GUION-<slug>.md"); process.exit(2); }
const slug = path.basename(ruta).replace(/^GUION-/, "").replace(/\.md$/, "");
const fecha = slug.slice(0, 10);
const guion = fs.readFileSync(ruta, "utf8");

const fuente = path.join("contenido", "urgente", `FUENTE-${slug}.md`);
// De la lectura de GPT (23-09) solo cuentan las citas textuales: las
// "Respuestas al pedido" son su paráfrasis y no habilitan cifras.
const citas = fs.existsSync(fuente)
  ? fs.readFileSync(fuente, "utf8").split("\n").filter((l) => /^\s*>/.test(l)).join("\n") : "";
const permitido = [path.join("contenido", "urgente", `${slug}.md`), path.join("contenido", "informes", `${fecha}.md`)]
  .filter((p) => fs.existsSync(p)).map((p) => fs.readFileSync(p, "utf8")).concat(citas).join("\n");

const fallas = [];
if (!permitido.trim()) fallas.push("no encontré el material del hallazgo ni el informe de hoy: sin fuentes contra las que verificar");

const cuerpo = guion.split(/^Guion:/m)[1] || guion;
const narrado = cuerpo.split(/^Fuentes:/m)[0];
const cifras = [...narrado.matchAll(/(?:US\$|\$)?\d{1,3}(?:\.\d{3})+(?:,\d+)?%?|(?:US\$|\$)?\d+(?:,\d+)?%?/g)]
  .map((m) => m[0]).filter((c) => {
    const n = Number(c.replace(/[^\d,.]/g, "").replace(/\./g, "").replace(",", "."));
    if (Number.isInteger(n) && n >= 1900 && n <= 2099 && !/[$%]/.test(c)) return false; // año
    // El umbral de magnitud NO aplica a porcentajes ni montos: "1,3%" es una
    // cifra de pleno derecho y era justo la del error de la TPM (07-09).
    return /[$%]/.test(c) || Math.abs(n) >= 2;
  });
// Escape declarado: el redactor de la guardia NO navega, así que en el flujo
// automático toda cifra sale del repo. Pero un exprés A PEDIDO (Santiago pide
// uno y la sesión con web va a la fuente primaria) sí puede traer cifras de
// afuera; para eso el guion las declara, con su URL, en líneas
// "Verificado en fuente primaria: ..." dentro del bloque Fuentes. Declararlo
// es el punto: deja rastro de dónde salió cada número.
const declaradas = (guion.match(/^Verificado en fuente primaria:.*$/gim) || []).join(" ");
const huerfanas = [...new Set(cifras)].filter((c) => {
  const limpio = c.replace(/[^\d,.%]/g, "");
  const enAlguna = (t) => t.includes(limpio) || t.includes(limpio.replace(",", "."));
  return !enAlguna(permitido) && !enAlguna(declaradas);
});
for (const c of huerfanas) fallas.push(`la cifra "${c}" no aparece en el material capturado, ni en el informe de hoy, ni en las citas de FUENTE-${slug}.md (regla del 07-09: cada cifra sale del material permitido, nunca de memoria ni de informes viejos)`);

if (!/\[FUENTE /.test(guion)) fallas.push("el guion no trae ninguna marca [FUENTE institución, fecha]");

const palabras = narrado.split("\n").map((l) => l.trim())
  .filter((l) => l && !/^(## |#)/.test(l))
  .map((l) => l.replace(/^\[TESIS\]\s*/, "").replace(/^\[[^\]]+\]\s*/, ""))
  .filter((l) => l).join(" ").split(/\s+/).filter(Boolean).length;
if (palabras < 60) fallas.push(`solo ${palabras} palabras narradas: le falta contexto (el prompt pide 90-120)`);
if (palabras > 140) fallas.push(`${palabras} palabras narradas: se pasa del formato (el prompt pide 90-120)`);

for (const [re, que] of [[/^T[íi]tulo sugerido:/m, "Título sugerido:"], [/^Descripci[óo]n sugerida:/m, "Descripción sugerida:"], [/^Guion:/m, "Guion:"], [/^Fuentes:/m, "Fuentes:"]])
  if (!re.test(guion)) fallas.push(`falta la línea "${que}"`);

const marca = path.join("contenido", "urgente", `RECHAZADO-${slug}.txt`);
if (fallas.length) {
  const txt = [`RECHAZADO ${new Date().toISOString()}`, `guion: ${ruta}`, "", ...fallas.map((f) => `- ${f}`), "",
    "El Short NO se produjo. Corrige el guion y vuelve a pushearlo, o descártalo.", ""].join("\n");
  fs.writeFileSync(marca, txt);
  console.error(txt);
  process.exit(1);
}
if (fs.existsSync(marca)) fs.unlinkSync(marca);
console.log(`verificación OK: ${palabras} palabras narradas, ${new Set(cifras).size} cifra(s) trazada(s) al material.`);
