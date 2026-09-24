#!/usr/bin/env node
/**
 * lector.js — entra a las páginas del hallazgo y deja el texto por escrito.
 *
 * POR QUÉ EXISTE (24-09-2026). La regla del 23-09 mandaba toda lectura de
 * páginas a GPT, porque Claude no navega. El 24-09 ChatGPT se quedó sin cuota
 * hasta el domingo y la guardia quedó sin poder hacer Shorts: el hallazgo de
 * las 18:15 (caso Chureja) se quedó parado esperando un FUENTE que nunca iba
 * a llegar.
 *
 * La salida no es que Claude navegue, que no puede: es que un script suyo
 * corra donde SÍ hay red. El barrido entra a 22 fuentes todas las noches
 * desde GitHub Actions; este lector hace lo mismo con el cuerpo de la nota.
 *
 * QUÉ NO HACE, a propósito: no resume, no interpreta y no elige citas. Baja
 * el texto y lo deja tal cual, que es justo lo que pide prompts/lector-gpt.md
 * ("dejar por escrito lo que dicen, con sus mismas palabras"). Quien decide
 * qué vale es el guionista después, con el texto a la vista.
 *
 * Uso:  node scripts/lector.js [slug]
 *       sin slug, toma el PEDIDO de lectura abierto más nuevo.
 */
const fs = require("fs");
const path = require("path");

const URGENTE = path.join("contenido", "urgente");
const TOPE_CARACTERES = 14000;   // por fuente: una nota larga entera, sin novela
const ESPERA_MS = 20000;

const campo = (txt, nombre) => {
  const m = txt.match(new RegExp(`^${nombre}:\\s*(.+)$`, "im"));
  return m ? m[1].trim() : null;
};

// ── elegir el pedido ─────────────────────────────────────────────────────
function pedidoAbierto() {
  const files = fs.readdirSync(URGENTE)
    .filter((f) => f.startsWith("PEDIDO-") && f.endsWith(".md"))
    .map((f) => ({ f, t: fs.statSync(path.join(URGENTE, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);
  for (const { f } of files) {
    const slug = f.replace(/^PEDIDO-/, "").replace(/\.md$/, "");
    const txt = fs.readFileSync(path.join(URGENTE, f), "utf8");
    const tarea = (campo(txt, "Tarea") || "lectura").toLowerCase();
    if (tarea !== "lectura") continue;
    const salida = campo(txt, "Salida") || path.join(URGENTE, `FUENTE-${slug}.md`);
    if (!fs.existsSync(salida)) return slug;
  }
  return null;
}

// ── bajar y limpiar una página ───────────────────────────────────────────
const ENTIDADES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", ntilde: "ñ",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú", Ntilde: "Ñ",
  uuml: "ü", Uuml: "Ü", laquo: "«", raquo: "»", ldquo: "“", rdquo: "”",
  lsquo: "‘", rsquo: "’", hellip: "…", mdash: "-", ndash: "-", deg: "°" };

const decodificar = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&([a-z]+);/gi, (m, n) => (n in ENTIDADES ? ENTIDADES[n] : m));

function textoDe(html) {
  let h = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|iframe|form)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(nav|header|footer|aside)\b[\s\S]*?<\/\1>/gi, " ");
  // si la nota viene envuelta en <article>, quedarse con eso: saca menús,
  // relacionadas y pies de página sin tener que adivinar clases por medio
  const art = h.match(/<article\b[\s\S]*?<\/article>/i);
  if (art && art[0].length > 400) h = art[0];
  const titulo = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const parrafos = [];
  const re = /<(p|h1|h2|h3|li|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m;
  while ((m = re.exec(h))) {
    const t = decodificar(m[2].replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
    // los fragmentos cortos casi siempre son menú, pie o botones
    if (t.length >= 45) parrafos.push(m[1].toLowerCase() === "blockquote" ? `> ${t}` : t);
  }
  const vistos = new Set();
  const limpio = parrafos.filter((p) => !vistos.has(p) && vistos.add(p));
  return { titulo: titulo ? decodificar(titulo).replace(/\s+/g, " ").trim() : null,
    texto: limpio.join("\n\n").slice(0, TOPE_CARACTERES) };
}

async function bajar(url) {
  const ctrl = new AbortController();
  const reloj = setTimeout(() => ctrl.abort(), ESPERA_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal, redirect: "follow",
      headers: {
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
        "accept": "text/html,application/xhtml+xml",
        "accept-language": "es-CL,es;q=0.9",
      },
    });
    if (!res.ok) return { error: `HTTP ${res.status}` };
    const finalUrl = res.url || url;
    // Google News no redirige de verdad: arma el salto con JavaScript, así que
    // si seguimos en su dominio, la nota original no se alcanzó.
    if (/(^|\.)news\.google\.com$/.test(new URL(finalUrl).hostname)) {
      return { error: "enlace de Google News: no resuelve a la nota original" };
    }
    const { titulo, texto } = textoDe(await res.text());
    if (texto.length < 400) return { error: "la página cargó pero casi no trae texto (probable muro de pago o carga por JavaScript)", finalUrl, titulo };
    return { titulo, texto, finalUrl };
  } catch (e) {
    return { error: String(e && e.message ? e.message : e) };
  } finally { clearTimeout(reloj); }
}

// ── escribir el FUENTE ───────────────────────────────────────────────────
(async () => {
  const slug = process.argv[2] || pedidoAbierto();
  if (!slug) { console.log("Sin pedidos de lectura abiertos."); process.exit(0); }

  const rutaHallazgo = path.join(URGENTE, `${slug}.md`);
  if (!fs.existsSync(rutaHallazgo)) {
    console.error(`No existe el hallazgo ${rutaHallazgo}`); process.exit(1);
  }
  const hallazgo = fs.readFileSync(rutaHallazgo, "utf8");
  const titular = (hallazgo.match(/^#\s*(.+)$/m) || [])[1] || slug;

  const fuentes = [];
  for (const linea of hallazgo.split("\n")) {
    const m = linea.match(/^-\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(https?:\/\/\S+)\s*$/);
    if (m) fuentes.push({ titular: m[1], medio: m[2], url: m[3] });
  }
  if (!fuentes.length) { console.error("El hallazgo no trae titulares con URL."); process.exit(1); }

  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago",
    year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const hora = new Intl.DateTimeFormat("es-CL", { timeZone: "America/Santiago",
    hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());

  const bloques = [];
  let leidas = 0;
  for (const f of fuentes) {
    process.stderr.write(`leyendo ${f.medio}… `);
    const r = await bajar(f.url);
    if (r.error) {
      process.stderr.write(`no accesible (${r.error})\n`);
      bloques.push(`## ${f.medio} · ${f.titular}\nURL: ${f.url}\nTipo: prensa\nno accesible: ${r.error}`);
    } else {
      leidas++;
      process.stderr.write(`ok (${r.texto.length} caracteres)\n`);
      bloques.push(`## ${f.medio} · ${f.titular}\nURL: ${r.finalUrl}\nTipo: prensa\nTítulo de la página: ${r.titulo || "(sin título)"}\n\nTexto de la nota, sin resumir:\n\n${r.texto}`);
    }
  }

  const salida = path.join(URGENTE, `FUENTE-${slug}.md`);
  fs.writeFileSync(salida, `# FUENTE · ${titular}

Leído por el LECTOR AUTOMÁTICO (scripts/lector.js) el ${hoy} a las ${hora}
(hora de Chile), a pedido de PEDIDO-${slug}.md.

> Este archivo lo bajó un script, no una persona ni un modelo: el texto está
> tal como venía en la página, sin resumir y sin elegir citas. Quien decide
> qué vale es el guionista, con el texto a la vista. Las páginas marcadas
> "no accesible" NO se pueden reconstruir: si una cifra solo estaba ahí, no
> se publica.

Páginas leídas: ${leidas} de ${fuentes.length}.

${bloques.join("\n\n")}
`);
  console.log(`OK: ${salida} (${leidas}/${fuentes.length} páginas leídas)`);
  if (!leidas) { console.error("AVISO: no se pudo leer ninguna página."); process.exit(2); }
})();
