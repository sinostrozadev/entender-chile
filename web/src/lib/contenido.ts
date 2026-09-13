// Lee contenido/ del repositorio en tiempo de build y lo convierte en HTML.
// No hace falta ningún formato nuevo: el markdown de informes/ y claves/ se
// transforma aquí (pesos [A]/[B]/[C] → chips, etiquetas Contexto/Clave,
// anclas por sección, "Para salir hoy").
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const RAIZ = path.resolve(process.cwd(), "..", "contenido");

// Links del canal (web/canal.json). Vacío = no se muestra.
export const canal: { youtube: string; whatsapp: string; spotify: string } = (() => {
  try { return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "canal.json"), "utf8")); }
  catch { return { youtube: "", whatsapp: "", spotify: "" }; }
})();

// id de un video de YouTube a partir de su URL (watch, youtu.be, shorts, live)
export const youtubeId = (u: string | null): string | null => {
  if (!u) return null;
  const m = u.match(/(?:v=|youtu\.be\/|\/shorts\/|\/live\/|\/embed\/)([A-Za-z0-9_-]{6,})/);
  if (m) return m[1];
  // también un id pelado (11 caracteres), por si el archivo trae solo el id
  return /^[A-Za-z0-9_-]{11}$/.test(u.trim()) ? u.trim() : null;
};

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
export const url = (p: string) => BASE + p.replace(/^\//, "");

export type Seccion = { id: string; texto: string };
export type Noticia = { id: string; texto: string; peso: "a" | "b" };
export type Stats = { noticias: number; fuentes: number; minutos: number };
export type Informe = {
  fecha: string; titular: string; portada: string | null; resumenHtml: string; mirada: string[]; salir: string | null;
  html: string; secciones: Seccion[]; noticias: Noticia[]; stats: Stats; video: string | null;
};

// El html rendereado, partido por sección (h2): para pintar cada bloque con
// su categoría (WEB 1). El preámbulo es lo que va antes de la primera h2.
export type Trozo = { id: string; titulo: string; html: string };
export function trocear(html: string): { preambulo: string; trozos: Trozo[] } {
  const partes = html.split(/(?=<h2 id=")/);
  const trozos: Trozo[] = [];
  let preambulo = "";
  for (const p of partes) {
    const m = p.match(/^<h2 id="([^"]+)">([\s\S]*?)<\/h2>/);
    if (!m) { preambulo += p; continue; }
    trozos.push({ id: m[1], titulo: textoLlano(m[2]), html: p });
  }
  return { preambulo, trozos };
}
// Titulares con peso dentro de un trozo (para las páginas de categoría).
export const noticiasDe = (html: string): { id: string; texto: string; peso: "a" | "b" }[] => {
  const out: { id: string; texto: string; peso: "a" | "b" }[] = [];
  const re = /<h3 class="noticia peso-([ab])" id="([^"]+)">([\s\S]*?)<\/h3>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) out.push({ id: m[2], texto: textoLlano(m[3]), peso: m[1] as "a" | "b" });
  return out;
};
export type Clave = {
  slug: string; fecha: string; titulo: string; pregunta: string;
  html: string; secciones: Seccion[]; video: string | null;
};

// marked deja las comillas y ampersands como entidades dentro de los títulos;
// para índices, listas y anclas hace falta el texto llano (el 30-08 el
// titular de "R15" salió como &quot;R15&quot; en la categoría y en el índice).
export const desentidar = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const textoLlano = (html: string) => desentidar(html.replace(/<[^>]+>/g, ""));

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
   .replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const fmt = (f: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("es-CL", { ...opts, timeZone: "UTC" }).format(new Date(`${f}T12:00:00Z`));
export const fechaLarga = (f: string) => { const t = fmt(f, { weekday: "long", day: "numeric", month: "long", year: "numeric" }); return t.charAt(0).toUpperCase() + t.slice(1); };
export const fechaCorta = (f: string) => fmt(f, { day: "numeric", month: "short" }).replace(".", "");
export const mesLargo = (f: string) => { const t = fmt(f, { month: "long", year: "numeric" }); return t.charAt(0).toUpperCase() + t.slice(1); };

const leer = (p: string) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
const video = (nombre: string) => {
  const t = leer(path.join(RAIZ, "videos", `${nombre}.txt`));
  return t ? t.trim().split("\n")[0].trim() : null;
};

// markdown → html con las transformaciones del canal
// "En una mirada" en frases sueltas (para leer de un vistazo)
export function frases(texto: string): string[] {
  const protegido = texto.replace(/\s+/g, " ").trim()
    .replace(/\b(EE|UU|Sr|Sra|Dr|Dra|Ud|N|art|arts|N°|Nº)\./g, "$1§");
  return protegido.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"“(])/)
    .map((f) => f.replace(/§/g, ".").trim()).filter((f) => f.length > 0);
}

// Fechas AAAA-MM-DD → DD-MM-AAAA en el texto visible. Las etiquetas HTML
// (hrefs) y los textos que son URLs no se tocan.
export const fechasHumanas = (html: string): string =>
  html.split(/(<[^>]+>)/g).map((seg) =>
    seg.startsWith("<") || seg.includes("://") ? seg
      : seg.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, "$3-$2-$1")
  ).join("");
export const fechaCortaNum = (f: string) => { const m = f.match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? `${m[3]}-${m[2]}-${m[1]}` : f; };

// Marcas y notas dirigidas al operador, no al lector. Nunca se publican, en
// ninguna pieza: el 27-08 una nota de plomería ("PRESELECCIÓN NO DISPONIBLE:
// ...no existía al iniciar esta ejecución") salió al aire en el informe.
const MARCAS_INTERNAS = /^\s*(EN SEGUIMIENTO|FUERA DE LA OLLA|PENDIENTE DE CIERRE|NOTICIA DE PORTADA|PRESELECCI[ÓO]N NO DISPONIBLE|NOTA INTERNA|NOTA DEL SISTEMA|AVISO INTERNO)\b.*$/gim;
export const quitarInterno = (md: string): string =>
  md.replace(/<!--[\s\S]*?-->/g, "").replace(MARCAS_INTERNAS, "");

function render(md: string): { html: string; secciones: Seccion[]; noticias: Noticia[] } {
  let html = marked.parse(quitarInterno(md), { async: false, gfm: true }) as string;
  const secciones: Seccion[] = [];
  const noticias: Noticia[] = [];
  // Titulares con peso editorial [A]/[B]: el peso NO se muestra como letra
  // (jerga interna); se expresa con el tamaño del titular. Van como h3 con
  // clase, cualquiera sea el nivel que traiga el markdown.
  html = html.replace(/<h([1-4])>\s*\[([AB])\]\s*([\s\S]*?)<\/h\1>/g, (_m, _n, p, inner) => {
    const id = slugify(textoLlano(inner));
    noticias.push({ id, texto: textoLlano(inner), peso: p.toLowerCase() as "a" | "b" });
    return `<h3 class="noticia peso-${p.toLowerCase()}" id="${id}">${inner}</h3>`;
  });
  // Secciones (## sin peso) → índice y anclas
  html = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_m, inner) => {
    const id = slugify(textoLlano(inner));
    secciones.push({ id, texto: textoLlano(inner) });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  html = html.replace(/<h1>([\s\S]*?)<\/h1>/g, (_m, inner) => `<h2 id="${slugify(inner)}">${inner}</h2>`);
  // Cualquier marca de peso restante ([C] en listas, etc.) se elimina.
  html = html.replace(/\[([ABC])\]\s*/g, "");
  html = html.replace(/<strong>(Contexto|Clave|Análisis|Analisis):<\/strong>/g,
    (_m, e) => `<strong class="etq etq-${slugify(e)}">${e}</strong>`);
  html = html.replace(/<p><strong>Para salir hoy:<\/strong>/g, `<p class="salir"><strong>Para salir hoy</strong>`);
  html = fechasHumanas(html);
  html = agruparSecundarias(html);
  return { html, secciones, noticias };
}

// Dos o más noticias [B] seguidas van lado a lado, como las secundarias de
// un diario (04-09). Cada segmento empieza en un encabezado; los h2 quedan al
// nivel superior, así que trocear() y noticiasDe() no cambian.
export function agruparSecundarias(html: string): string {
  const seg = html.split(/(?=<h[23][\s>])/);
  const esB = (x: string) => /^<h3 class="noticia peso-b"/.test(x);
  const out: string[] = [];
  for (let i = 0; i < seg.length; ) {
    if (!esB(seg[i])) { out.push(seg[i]); i++; continue; }
    let j = i;
    while (j < seg.length && esB(seg[j])) j++;
    if (j - i >= 2) out.push(`<div class="fila-b">` + seg.slice(i, j).map((x) => `<div class="nota-b">${x}</div>`).join("") + `</div>\n`);
    else out.push(seg[i]);
    i = j;
  }
  return out.join("");
}

function seccionDe(md: string, titulo: RegExp): string {
  const lineas = md.split("\n");
  const i = lineas.findIndex((l) => titulo.test(l));
  if (i < 0) return "";
  const out: string[] = [];
  for (let j = i + 1; j < lineas.length; j++) {
    if (/^#{1,6}\s/.test(lineas[j])) break;
    out.push(lineas[j]);
  }
  return out.join("\n").trim();
}

// --- La compuerta de la revisión (decisión de Santiago, 08-09; implementada el
// 13-09). Una pieza no se publica hasta que la revisión editorial del día dice
// APROBADA. Antes de esto el informe salía al aire apenas GPT lo pusheaba: el
// 08-09 uno con dos cifras malas estuvo público desde la 01:43 hasta las 06:46,
// y la revisión recién corría a las 04:45.
// La fecha de corte protege lo ya publicado: las ediciones anteriores nacieron
// sin compuerta y no se bajan del sitio por aplicarla hacia atrás.
const CORTE_REVISION = "2026-09-14";
export function aprobada(fecha: string): boolean {
  if (fecha < CORTE_REVISION) return true;
  const ruta = path.join(RAIZ, "revisiones", `${fecha}.md`);
  if (!fs.existsSync(ruta)) return false; // todavía no la revisan: no sale
  const primera = fs.readFileSync(ruta, "utf8").split("\n")[0].trim();
  return /^VEREDICTO:\s*APROBADA/i.test(primera);
}

export function informes(): Informe[] {
  const dir = path.join(RAIZ, "informes");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .filter((f) => aprobada(f.replace(/\.md$/, "")))
    .sort().reverse()
    .map((f) => {
      const fecha = f.replace(/\.md$/, "");
      const md = fs.readFileSync(path.join(dir, f), "utf8");
      const mA = md.match(/^#{1,3}\s+\[A\]\s+(.+)$/m);
      const mH1 = md.match(/^#\s+(.+)$/m);
      const titular = (mA?.[1] || mH1?.[1] || `Informe del ${fecha}`).trim();
      // La marca interna NOTICIA DE PORTADA (desde el 03-09): el titular que
      // manda en el hero. Se extrae ANTES de que quitarInterno la borre.
      const portada = md.match(/^NOTICIA DE PORTADA:\s*([^|\n]+)/m)?.[1]?.trim() ?? null;
      // OJO: la entradilla se extrae del md crudo, así que las marcas internas
      // se filtran AQUÍ también (el 03-09 la NOTICIA DE PORTADA salió como
      // viñeta de "En una mirada" por saltarse este paso).
      const resumenMd = quitarInterno(seccionDe(md, /^##\s+En una mirada/i)).trim();
      // "Para salir hoy": como línea en negrita (el formato del contrato) o
      // como sección propia (variante que apareció el 03-09).
      const mSalir = md.match(/^\*\*Para salir hoy:\*\*\s*(.+)$/m);
      const salirSeccion = seccionDe(md, /^##\s+Para salir hoy\s*$/im).split("\n")[0]?.trim() || null;
      // cuerpo: sin el H1 ni "En una mirada" (va como entradilla) ni salir (va como chip)
      let cuerpo = md.replace(/^#\s+.+\n/m, "");
      cuerpo = cuerpo.replace(/^##\s+En una mirada[\s\S]*?(?=^#{1,6}\s)/m, "");
      // las marcas internas las quita render() para todas las piezas
      cuerpo = cuerpo.replace(/^\*\*Para salir hoy:\*\*.*$/m, "");
      cuerpo = cuerpo.replace(/^##\s+Para salir hoy\s*$[\s\S]*?(?=^#{1,6}\s|(?![\s\S]))/im, "");
      const { html, secciones, noticias } = render(cuerpo);
      const fuentes = seccionDe(md, /^##\s+Fuentes consultadas/i).split("\n").filter((l) => l.trim()).length;
      const palabras = md.split(/\s+/).length;
      return {
        fecha, titular, portada,
        resumenHtml: marked.parse(resumenMd, { async: false }) as string,
        mirada: frases(resumenMd.replace(/\*\*/g, "")),
        noticias, stats: { noticias: noticias.length, fuentes, minutos: Math.max(1, Math.round(palabras / 220)) },
        salir: (() => { const bruto = mSalir?.[1] ?? salirSeccion; if (!bruto) return null;
          const t = bruto.replace(/^\*\*Para salir hoy:?\*\*\s*/i, "").replace(/\s*\([^)]*\)\.?\s*$/, "").trim();
          return t ? t.charAt(0).toUpperCase() + t.slice(1) : null; })(),
        html, secciones, video: video(`${fecha}-informe`),
      };
    });
}

export function claves(): Clave[] {
  const dir = path.join(RAIZ, "claves");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
    .filter((f) => aprobada(f.slice(0, 10)))
    .sort().reverse()
    .map((f) => {
      const m = f.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/)!;
      const fecha = m[1];
      const md = fs.readFileSync(path.join(dir, f), "utf8");
      const mSlug = md.match(/^Slug:\s*([a-z0-9-]+)\s*$/m);
      const slug = mSlug?.[1] || m[2];
      const mH1 = md.match(/^#\s+(.+)$/m);
      const titulo = (mH1?.[1] || md.match(/^T[íi]tulo:\s*(.+)$/m)?.[1] || slug).trim();
      const pregunta = seccionDe(md, /^##\s+La pregunta de fondo/i).split("\n\n")[0]
        .replace(/\s+/g, " ").trim();
      let cuerpo = md.replace(/^#\s+.+\n/m, "").replace(/^(Slug|T[íi]tulo):.*$/gm, "");
      const { html, secciones } = render(cuerpo);
      return { slug, fecha, titulo, pregunta, html, secciones, video: video(`${fecha}-clave`) };
    });
}

// ---------------- ¿En qué quedó? (observatorio de la plata pública) ----------------
export type Caso = {
  slug: string; nombre: string; estado: string; abierto: string; actualizado: string;
  cuestionado: number | null; recuperado: number | null; retenido: number | null;
  naturaleza: string; notaCifra: string; publicar: boolean; proximoHito: string;
  html: string; secciones: Seccion[];
};
export type Contador = {
  cuestionado: number; recuperado: number; retenido: number; porcentaje: number;
  nDuros: number; aparte: Caso[]; nCasos: number; nAbiertos: number;
};

// Mismas reglas que scripts/casos.js: solo se suman cifras comparables.
const DURAS = ["perjuicio-veredicto", "perjuicio-acusado", "observado-contraloria", "denunciado", "investigado"];
export const esDura = (n: string) => DURAS.includes(n);
export const NATURALEZA: Record<string, string> = {
  "perjuicio-veredicto": "perjuicio según veredicto",
  "perjuicio-acusado": "perjuicio según la acusación",
  "observado-contraloria": "observado por Contraloría",
  "denunciado": "denunciado por un organismo",
  "investigado": "investigado por Fiscalía",
  "transferido-auditado": "monto transferido, en auditoría",
  "estimacion": "estimación",
};
export const naturalezaTexto = (n: string) => NATURALEZA[n] || n;

export const pesos = (n: number | null): string => n == null ? "sin cifra" :
  n === 0 ? "$0" :
  n >= 1e9 ? `$${(n / 1e9).toLocaleString("es-CL", { maximumFractionDigits: 1 })} mil millones` :
  n >= 1e6 ? `$${(n / 1e6).toLocaleString("es-CL", { maximumFractionDigits: 1 })} millones` :
  `$${n.toLocaleString("es-CL")}`;

export function casos(): Caso[] {
  const dir = path.join(RAIZ, "casos");
  if (!fs.existsSync(dir)) return [];
  const excluidos = new Set(["README.md", "indice.md", "candidatos.md", "hitos.md", "por-abrir.md", "por-verificar.md"]);
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !excluidos.has(f))
    .map((f) => {
      const md = fs.readFileSync(path.join(dir, f), "utf8");
      const slug = f.replace(/\.md$/, "");
      const nombre = (md.match(/^# Caso:\s*(.+)$/m)?.[1] || slug).trim();
      const estado = (md.match(/^Estado:\s*(\S+)/m)?.[1] || "ACTIVO").trim();
      const abierto = md.match(/Dossier abierto:\s*(\d{4}-\d{2}-\d{2})/)?.[1] || "";
      const actualizado = md.match(/Última actualización:\s*(\d{4}-\d{2}-\d{2})/)?.[1] || abierto;
      const d: Record<string, string> = {};
      const mD = md.match(/<!--\s*datos([\s\S]*?)-->/);
      if (mD) for (const l of mD[1].split("\n")) { const i = l.indexOf(":"); if (i > 0) d[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
      const num = (v?: string) => { if (v == null || v === "") return null; const n = Number(v.replace(/[^\d]/g, "")); return Number.isFinite(n) ? n : null; };
      let cuerpo = md.replace(/^# Caso:.*\n/m, "").replace(/^Estado:.*\n/m, "").replace(/^Dossier abierto:.*\n/m, "")
        .replace(/<!--[\s\S]*?-->\s*/g, ""); // datos, interno y cualquier otro comentario: nunca se publican
      let { html, secciones } = render(cuerpo);
      // El registro interno se presenta al lector como lo que es: la historia
      // de cómo fue cambiando este seguimiento.
      const REGISTRO = "Registro de actualizaciones del dossier";
      const REGISTRO_PUB = "Cómo ha cambiado este seguimiento";
      html = html.split(REGISTRO).join(REGISTRO_PUB);
      secciones = secciones.map((x) => x.texto === REGISTRO ? { ...x, texto: REGISTRO_PUB } : x);
      // primer "próximo hito": es lo que le dice al lector cuándo volver
      const proximoHito = ((md.split(/^## Próximos hitos conocidos\s*$/m)[1] || "")
        .split(/^## /m)[0].split("\n")
        .map((l) => l.replace(/^[-*]\s*|^\d+\.\s*/, "").trim())
        .filter((l) => l.length > 30)[0] || "").replace(/\*\*/g, "");
      return {
        slug, nombre, estado, abierto, actualizado, proximoHito,
        cuestionado: num(d.cuestionado), recuperado: num(d.recuperado), retenido: num(d.retenido),
        naturaleza: d.naturaleza || "?", notaCifra: fechasHumanas(d["nota-cifra"] || ""),
        publicar: (d.publicar || "si").toLowerCase() !== "no",
        html, secciones,
      };
    })
    .filter((c) => c.publicar)
    .sort((a, b) => (b.actualizado > a.actualizado ? 1 : b.actualizado < a.actualizado ? -1 : a.nombre.localeCompare(b.nombre)));
}

export function contador(lista: Caso[]): Contador {
  const duros = lista.filter((c) => esDura(c.naturaleza));
  const cuestionado = duros.reduce((a, c) => a + (c.cuestionado || 0), 0);
  const recuperado = lista.reduce((a, c) => a + (c.recuperado || 0), 0);
  const retenido = lista.reduce((a, c) => a + (c.retenido || 0), 0);
  return {
    cuestionado, recuperado, retenido,
    porcentaje: cuestionado ? (recuperado / cuestionado) * 100 : 0,
    nDuros: duros.length, aparte: lista.filter((c) => !esDura(c.naturaleza)),
    nCasos: lista.length, nAbiertos: lista.filter((c) => c.estado !== "CERRADO").length,
  };
}
