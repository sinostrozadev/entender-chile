// Lee contenido/ del repositorio en tiempo de build y lo convierte en HTML.
// No hace falta ningún formato nuevo: el markdown de informes/ y claves/ se
// transforma aquí (pesos [A]/[B]/[C] → chips, etiquetas Contexto/Clave,
// anclas por sección, "Para salir hoy").
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const RAIZ = path.resolve(process.cwd(), "..", "contenido");

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
export const url = (p: string) => BASE + p.replace(/^\//, "");

export type Seccion = { id: string; texto: string };
export type Informe = {
  fecha: string; titular: string; resumenHtml: string; salir: string | null;
  html: string; secciones: Seccion[]; video: string | null;
};
export type Clave = {
  slug: string; fecha: string; titulo: string; pregunta: string;
  html: string; secciones: Seccion[]; video: string | null;
};

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
function render(md: string): { html: string; secciones: Seccion[] } {
  let html = marked.parse(md, { async: false, gfm: true }) as string;
  const secciones: Seccion[] = [];
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, n, inner) => {
    const limpio = inner.replace(/\[([ABC])\]\s*/g, "");
    const id = slugify(limpio);
    if (n === "2") secciones.push({ id, texto: limpio.replace(/<[^>]+>/g, "") });
    return `<h${n} id="${id}">${inner}</h${n}>`;
  });
  html = html.replace(/\[([ABC])\]\s*/g, (_m, p) =>
    `<span class="peso peso-${p.toLowerCase()}" title="${p === "A" ? "Noticia que define la jornada" : p === "B" ? "Relevante" : "Registro breve"}">${p}</span> `);
  html = html.replace(/<strong>(Contexto|Clave|Análisis|Analisis):<\/strong>/g,
    (_m, e) => `<strong class="etq etq-${slugify(e)}">${e}</strong>`);
  html = html.replace(/<p><strong>Para salir hoy:<\/strong>/g, `<p class="salir"><strong>Para salir hoy</strong>`);
  return { html, secciones };
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

export function informes(): Informe[] {
  const dir = path.join(RAIZ, "informes");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort().reverse()
    .map((f) => {
      const fecha = f.replace(/\.md$/, "");
      const md = fs.readFileSync(path.join(dir, f), "utf8");
      const mA = md.match(/^#{1,3}\s+\[A\]\s+(.+)$/m);
      const mH1 = md.match(/^#\s+(.+)$/m);
      const titular = (mA?.[1] || mH1?.[1] || `Informe del ${fecha}`).trim();
      const resumenMd = seccionDe(md, /^##\s+En una mirada/i);
      const mSalir = md.match(/^\*\*Para salir hoy:\*\*\s*(.+)$/m);
      // cuerpo: sin el H1 ni "En una mirada" (va como entradilla) ni la línea de salir (va como chip)
      let cuerpo = md.replace(/^#\s+.+\n/m, "");
      cuerpo = cuerpo.replace(/^##\s+En una mirada[\s\S]*?(?=^#{1,6}\s)/m, "");
      cuerpo = cuerpo.replace(/^\*\*Para salir hoy:\*\*.*$/m, "");
      const { html, secciones } = render(cuerpo);
      return {
        fecha, titular,
        resumenHtml: marked.parse(resumenMd, { async: false }) as string,
        salir: mSalir ? mSalir[1].replace(/\s*\([^)]*\)\s*$/, "").trim() : null,
        html, secciones, video: video(`${fecha}-informe`),
      };
    });
}

export function claves(): Clave[] {
  const dir = path.join(RAIZ, "claves");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-.+\.md$/.test(f))
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
