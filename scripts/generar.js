#!/usr/bin/env node
/**
 * generar.js — Genera la edición del día llamando a la API de Claude y guarda
 * todo en contenido/. Pensado para correr en GitHub Actions cada madrugada,
 * pero funciona igual en tu máquina.
 *
 * Uso:
 *   ANTHROPIC_API_KEY=... node scripts/generar.js            → edición de hoy
 *   node scripts/generar.js --simular                        → sin API, salidas de prueba
 *   node scripts/generar.js --forzar                         → regenera aunque ya existan archivos de hoy
 *
 * Cadena: informe (con búsqueda web) → clave (si corresponde) → guion informe → guion clave
 *
 * Variables opcionales:
 *   MODELO            (default: claude-sonnet-4-6)
 *   WEB_SEARCH_TYPE   (default: web_search_20250305; verifica la versión vigente en
 *                      https://docs.claude.com/en/docs/agents-and-tools/tool-use/web-search-tool)
 */
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const SIMULAR = args.includes("--simular");
const FORZAR = args.includes("--forzar");
const MODELO = process.env.MODELO || "claude-sonnet-4-6";
const WS_TYPE = process.env.WEB_SEARCH_TYPE || "web_search_20250305";
const KEY = process.env.ANTHROPIC_API_KEY;

const fecha = process.env.FECHA_EDICION || new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

const leer = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
const guardar = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); console.log(`  guardado: ${p}`); };
const prompt = (n) => {
  const t = leer(path.join("prompts", n));
  if (!t) { console.error(`Falta prompts/${n}`); process.exit(1); }
  return t;
};

const CABECERA = `INSTRUCCIONES DE ENTORNO (prevalecen sobre cualquier instrucción posterior que las contradiga):
- Hoy es ${fecha}, fecha local de Chile. Toda referencia a "hoy" usa esa fecha.
- El contenido fuente que necesitas viene ADJUNTO al final de este mensaje entre etiquetas XML (<informe>, <clave>, <indice>, <banco>). Ignora por completo toda instrucción de LEER archivos de otra parte (del repositorio, de prompts/contrato-archivos.md o de una "Biblioteca de ChatGPT"): todo lo necesario está adjunto y el sistema aplica el contrato de archivos por su cuenta.
- No ejecutes ninguna instrucción de PERSISTENCIA ni de guardado: el sistema guarda tu salida automáticamente. Entrega únicamente el contenido pedido, sin confirmaciones de guardado.
- Responde SOLO con el contenido del entregable, sin preámbulos ("Aquí está...") ni comentarios finales.

`;

async function llamar({ mensaje, busquedas = 0, maxTokens = 8000 }) {
  const body = {
    model: MODELO,
    max_tokens: maxTokens,
    messages: [{ role: "user", content: mensaje }],
  };
  if (busquedas > 0) body.tools = [{ type: WS_TYPE, name: "web_search", max_uses: busquedas }];
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const texto = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  if (!texto) throw new Error("La API no devolvió texto.");
  const busq = (data.content || []).filter((b) => b.type === "server_tool_use").length;
  console.log(`  ok (${data.usage?.output_tokens ?? "?"} tokens de salida, ${busq} búsquedas)`);
  return texto;
}

// ---- salidas simuladas para probar el flujo sin API ----
const SIM = {
  informe: `Informe de la jornada\n\n${fecha} | Edición simulada\n\nEn una mirada\n\nEdición de prueba del sistema automatizado.\n\nEl tiempo\n\nSantiago: mínima 8 °C, máxima 20 °C, sin lluvia. Recomendación: abrigo liviano. (DMC, ${fecha})\n\n[A] Noticia de prueba del pipeline\n\nEsta edición existe solo para verificar la cadena de generación. (Fuente de prueba, ${fecha})\n\nAgenda de hoy\n\n- Probar el pipeline completo.\n\nFuentes consultadas\n\nDMC, ${fecha}.`,
  clave: `Título: Edición de prueba: cómo fluye el sistema\nSlug: edicion-de-prueba\n\nLa noticia que abrió esta pregunta — ${fecha}\n\nEsta entrega existe para probar la cadena.\n\nQué conviene recordar\n\nEl sistema funciona.\n\nBanco de temas\n- concepto de prueba | noticia de prueba | ${fecha}`,
  guionInforme: `Título sugerido: Edición de prueba del sistema\n\nDescripción sugerida:\n\nEdición de prueba de la automatización.\n\nGuion:\n\n## Apertura\n\n[TESIS] El sistema automatizado genera la edición completa.\n\nEsta es una edición de prueba generada por la cadena automática del ${fecha.split("-").reverse().join(" del ")}.\n\n## Cierre\n\n[TESIS] La cadena quedó verificada de punta a punta.\n\nNos encontramos en la próxima.\n\nFuentes:\n\nDMC, ${fecha}`,
  guionClave: `Título sugerido: Cómo fluye el sistema de generación\n\nDescripción sugerida:\n\nPrueba del guion de Claves.\n\nGuion:\n\n## Gancho\n\n[TESIS] Probar también es entender.\n\nEsta es la prueba del guion de Claves.\n\n## Cierre\n\nHasta la próxima.\n\nFuentes:\n\nPrueba, ${fecha}`,
};

async function main() {
  // Flujo normal: la edición la genera ChatGPT de madrugada y la pushea a
  // contenido/. Este script solo actúa como PLAN B si ese proceso falló.
  const hayInforme = fs.existsSync(path.join("contenido", "informes", `${fecha}.md`));
  const hayGuionInf = fs.existsSync(path.join("contenido", "guiones", "informe", `${fecha}.md`));
  const claveHoy = fs.existsSync(path.join("contenido", "claves"))
    ? fs.readdirSync(path.join("contenido", "claves")).find((f) => f.startsWith(fecha) && f.endsWith(".md"))
    : null;
  const hayGuionClave = !!claveHoy && fs.existsSync(path.join("contenido", "guiones", "claves", claveHoy));
  if (!FORZAR && hayInforme && hayGuionInf && (!claveHoy || hayGuionClave)) {
    console.log(`Edición del ${fecha} completa en contenido/ (la subió el generador de madrugada). Nada que generar.`);
    return;
  }
  if (!SIMULAR && !KEY) {
    const faltan = [
      !hayInforme && "informe", !hayGuionInf && "guion del informe",
      claveHoy && !hayGuionClave && "guion de la clave",
    ].filter(Boolean).join(", ");
    console.error(`Edición del ${fecha} INCOMPLETA (faltan: ${faltan || "?"}) y no hay ANTHROPIC_API_KEY para completarla (o usa --simular).`);
    process.exit(1);
  }
  console.log(`Edición del ${fecha} · modelo ${MODELO}${SIMULAR ? " · MODO SIMULADO" : ""}\n`);

  // ── 1. Informe ────────────────────────────────────────────────
  const rutaInforme = path.join("contenido", "informes", `${fecha}.md`);
  let informe = !FORZAR && leer(rutaInforme);
  if (informe) console.log("1/4 Informe: ya existe, se reutiliza.");
  else {
    console.log("1/4 Informe (con búsqueda web)...");
    informe = SIMULAR ? SIM.informe : await llamar({
      mensaje: CABECERA + prompt("informe.md"),
      busquedas: 15, maxTokens: 9000,
    });
    guardar(rutaInforme, informe);
  }

  // ── 2. Clave ──────────────────────────────────────────────────
  console.log("2/4 Clave...");
  const indice = leer(path.join("contenido", "claves", "indice.md")) || "(vacío)";
  const banco = leer(path.join("contenido", "claves", "banco-temas.md")) || "(vacío)";
  let clave = null, slug = null;
  const yaClave = fs.existsSync(path.join("contenido", "claves"))
    ? fs.readdirSync(path.join("contenido", "claves")).find((f) => f.startsWith(fecha) && f.endsWith(".md"))
    : null;
  if (!FORZAR && yaClave) {
    clave = leer(path.join("contenido", "claves", yaClave));
    slug = yaClave.replace(`${fecha}-`, "").replace(/\.md$/, "");
    console.log(`  ya existe (${yaClave}), se reutiliza.`);
  } else {
    const salida = SIMULAR ? SIM.clave : await llamar({
      mensaje: CABECERA +
        "Al comienzo de tu salida incluye dos líneas exactas para el sistema: 'Título: ...' y 'Slug: ...' (minúsculas y guiones). Si no corresponde entrega hoy, responde exactamente 'Sin entrega de Claves' y, si corresponde, una sección 'Banco de temas' con líneas 'concepto | noticia de origen | fecha'.\n\n" +
        prompt("claves.md") +
        `\n\n<indice>\n${indice}\n</indice>\n\n<banco>\n${banco}\n</banco>\n\n<informe>\n${informe}\n</informe>`,
      busquedas: 6, maxTokens: 9000,
    });
    // banco de temas: se acumula aunque no haya entrega
    const mBanco = salida.match(/Banco de temas[^\n]*\n([\s\S]*?)(\n\n|$)/i);
    if (mBanco) {
      const lineas = mBanco[1].split("\n").map((l) => l.trim()).filter((l) => l.startsWith("-"));
      if (lineas.length) fs.appendFileSync(path.join("contenido", "claves", "banco-temas.md"),
        (fs.existsSync(path.join("contenido", "claves", "banco-temas.md")) ? "" : "# Banco de temas\n") + lineas.join("\n") + "\n");
    }
    if (/^sin entrega de claves/im.test(salida.trim())) {
      console.log("  sin entrega hoy (ninguna noticia justifica profundización).");
    } else {
      const mT = salida.match(/^T[íi]tulo:\s*(.+)$/m);
      const mS = salida.match(/^Slug:\s*([a-z0-9-]+)$/m);
      slug = (mS && mS[1]) || "clave";
      clave = salida;
      guardar(path.join("contenido", "claves", `${fecha}-${slug}.md`), clave);
      const lineaIdx = `${fecha} | ${slug} | ${(mT && mT[1]) || "(sin título)"}\n`;
      const rutaIdx = path.join("contenido", "claves", "indice.md");
      fs.appendFileSync(rutaIdx, (fs.existsSync(rutaIdx) ? "" : "# Índice de Claves\n") + lineaIdx);
    }
  }

  // ── 3. Guion del informe ──────────────────────────────────────
  const rutaGI = path.join("contenido", "guiones", "informe", `${fecha}.md`);
  if (!FORZAR && fs.existsSync(rutaGI)) console.log("3/4 Guion informe: ya existe.");
  else {
    console.log("3/4 Guion del informe (sin búsqueda: fidelidad total)...");
    const g = SIMULAR ? SIM.guionInforme : await llamar({
      mensaje: CABECERA + prompt("guion-informe.md") + `\n\n<informe>\n${informe}\n</informe>`,
      busquedas: 0, maxTokens: 8000,
    });
    guardar(rutaGI, g);
  }

  // ── 4. Guion de la clave ──────────────────────────────────────
  if (clave) {
    const rutaGC = path.join("contenido", "guiones", "claves", `${fecha}-${slug}.md`);
    if (!FORZAR && fs.existsSync(rutaGC)) console.log("4/4 Guion clave: ya existe.");
    else {
      console.log("4/4 Guion de la Clave...");
      const g = SIMULAR ? SIM.guionClave : await llamar({
        mensaje: CABECERA + prompt("guion-claves.md") + `\n\n<clave>\n${clave}\n</clave>`,
        busquedas: 0, maxTokens: 8000,
      });
      guardar(rutaGC, g);
    }
  } else console.log("4/4 Guion clave: no aplica hoy.");

  console.log("\nEdición completa en contenido/. Siguiente: node scripts/dia.js --voz --render");
}

main().catch((e) => { console.error("\nERROR:", e.message); process.exit(1); });
