// Uso: node ejemplos/demo-cambios-02-09.js out/demo.json && REMOTION_FUENTES_LOCALES=1 npx remotion render src/index.ts Informe out/demo.mp4 --props=out/demo.json
// Arma un timeline corto de ejemplo con los cambios conversados el 02-09,
// a partir del guion real del 02-09. Silencioso: los tiempos salen del
// conteo de palabras (2,5 por segundo), no de una voz.
const fs = require("fs");
const { parseGuion } = require("../scripts/parse.js");
const guion = fs.readFileSync("contenido/guiones/informe/2026-09-02.md", "utf8");
const p = parseGuion(guion);
let sec = ""; const por = {};
for (const e of p.eventos) { if (e.tipo === "seccion") { sec = e.texto; por[sec] = []; continue; } (por[sec] = por[sec] || []).push(e); }
const dur = (t) => Math.max(3, Math.round(((t || "").split(/\s+/).length / 2.5) * 10) / 10);
const ev = []; let t = 0;
const seccion = (nombre) => { ev.push({ tipo: "seccion", texto: nombre, from: t, to: 0, overlay: true }); };
const push = (e, d, extra = {}) => { const from = t; t = +(t + d).toFixed(2); ev.push({ ...e, ...extra, from, to: t }); };
const cerrar = () => { for (let i = ev.length - 1; i >= 0; i--) if (ev[i].tipo === "seccion" && !ev[i].to) { ev[i].to = t; break; } };
const tesis = (n) => por[n].find((e) => e.tipo === "tesis");
const datos = (n) => por[n].filter((e) => e.tipo === "dato");
const narr = (n) => por[n].filter((e) => e.tipo === "narracion");

// 1. Apertura en frío: la noticia de portada, entera, antes del sello.
seccion("La noticia del día");
push(tesis("Economía"), 4.5, { seccion: "La noticia del día" });
push(datos("Economía")[0], 6, { seccion: "La noticia del día", caption: narr("Economía")[0].texto.split(". ")[0] + "." });
cerrar();
// 2. Sello (2,8 s) en el hueco.
const selloEn = t; t = +(t + 3.0).toFixed(2);
// 3. Apertura corta (15 s en vez de 31).
seccion("Apertura");
push({ tipo: "narracion", texto: "Es miércoles dos de septiembre. Hacienda corregirá su proyección de crecimiento, la Fiscalía investiga un plan contra el alcalde de San Bernardo, y ya está definido cómo funcionarán los diez fondos generacionales." }, 12, { seccion: "Apertura" });
cerrar();
// 4. Economía: familia "gráfico".
seccion("Economía");
push(datos("Economía")[1], 7, { seccion: "Economía", caption: narr("Economía")[1].texto.split(". ")[0] + "." });
push(datos("Economía")[2], 6, { seccion: "Economía" });
cerrar();
// 5. Seguridad: familia "rayado".
seccion("Seguridad en San Bernardo");
push(tesis("Seguridad en San Bernardo"), 4.5, { seccion: "Seguridad en San Bernardo" });
push({ ...narr("Seguridad en San Bernardo")[0], texto: narr("Seguridad en San Bernardo")[0].texto.split(". ").slice(0, 2).join(". ") + "." }, 7, { seccion: "Seguridad en San Bernardo" });
cerrar();
// 6. Fondos generacionales: familia "gráfico", con esquema.
seccion("Fondos generacionales");
push(tesis("Fondos generacionales"), 4.5, { seccion: "Fondos generacionales" });
push(por["Fondos generacionales"].find((e) => e.tipo === "esquema"), 8, { seccion: "Fondos generacionales" });
cerrar();
// 7. Dato curioso: familia "topográfica".
seccion("Dato curioso");
push({ ...narr("Dato curioso")[0], texto: narr("Dato curioso")[0].texto.split(". ").slice(0, 2).join(". ") + "." }, 8, { seccion: "Dato curioso" });
cerrar();
// 8. En titulares con tope de 12 palabras.
seccion("En titulares");
const items = [
  "La Cámara rechazó investigar los vínculos entre Fernando Cerimedo y el Gobierno.",
  "Subtel ordenó bloquear cuarenta y dos sitios de apuestas en línea.",
  "Contraloría detectó hongos y humedad en obras del Hospital Las Higueras.",
  "El Gobierno postergaría hasta 2027 la nueva Ley de Protección de Datos.",
].map((texto) => { const from = t; t = +(t + 4.5).toFixed(2); return { texto, from, to: t }; });
ev.push({ tipo: "titulares", items, seccion: "En titulares", from: items[0].from, to: t });
cerrar();
// 9. Cierre con el tiempo en dos localidades.
seccion("Cierre");
push({ tipo: "narracion", texto: "La economía cayó en julio y Hacienda prepara una proyección más baja, mientras la Fiscalía reforzó la protección del alcalde de San Bernardo. Nos encontramos mañana en Entender Chile." }, 9, { seccion: "Cierre" });
push({ tipo: "narracion", texto: "Para salir hoy: en Santiago, capas y abrigo liviano en la mañana. En Valparaíso, chaqueta para el viento de la tarde. El resumen sin gritos." }, 8, { seccion: "Cierre" });
cerrar();

const tl = {
  version: 1,
  meta: { titulo: p.titulo, fecha: "2026-09-02", serie: "informe", inicioNarracion: 0, fondos: true, selloEn,
    cortinas: null, logo: null, cierre: null, musica: null, fps: 30, width: 1920, height: 1080, duracionSeg: t + 0.5 },
  audio: null, fuentes: p.fuentes, eventos: ev,
};
// las cortinas se activan por meta.cortinas (audio); acá sin audio las simulamos con una pista vacía no: Informe exige archivo. Se activan igual porque el filtro solo mira la lista.
fs.writeFileSync(process.argv[2], JSON.stringify(tl, null, 1));
console.log("duración", t, "s · secciones", ev.filter((e) => e.tipo === "seccion").map((e) => e.texto + "@" + e.from).join(" | "), "· selloEn", selloEn);
