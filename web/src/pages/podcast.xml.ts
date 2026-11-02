// Feed RSS del podcast (el informe diario en audio). Spotify, Apple y el
// resto lo leen solos. Desde el 01-11-2026 la casa del sitio es
// https://entender.sinodev.cl/podcast.xml; Spotify lo tiene registrado en la
// dirección vieja de GitHub Pages, que se sigue publicando con el mismo
// contenido hasta que se redirija (PENDIENTES), así que no se corta nada.
// Los episodios los anota scripts/podcast-subir.js en contenido/podcast/episodios.json;
// los mp3 viven como release "audio" del repo público de la web.
import fs from "node:fs";
import path from "node:path";
import type { APIRoute } from "astro";

type Episodio = { fecha: string; tipo?: string; titulo: string; descripcion?: string; url: string; bytes: number; durSeg: number };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = () => {
  const ruta = path.resolve(process.cwd(), "..", "contenido", "podcast", "episodios.json");
  const eps: Episodio[] = fs.existsSync(ruta) ? JSON.parse(fs.readFileSync(ruta, "utf8")) : [];
  const sitio = "https://entender.sinodev.cl";
  const items = eps.slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).map((e) => `
  <item>
    <title>${esc(e.titulo)}</title>
    <description>${esc(e.descripcion || "")}</description>
    <enclosure url="${e.url}" length="${e.bytes}" type="audio/mpeg"/>
    <guid isPermaLink="false">entender-chile-${e.tipo || "informe"}-${e.fecha}</guid>
    <pubDate>${new Date(e.fecha + (e.tipo === "clave" ? "T16:00:00Z" : "T10:30:00Z")).toUTCString()}</pubDate>
    <itunes:duration>${Math.round(e.durSeg)}</itunes:duration>
    <itunes:image href="${sitio}/podcast-portada-${e.tipo === "clave" ? "clave" : "informe"}.jpg"/>
    <itunes:explicit>false</itunes:explicit>
  </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Entender Chile</title>
  <link>${sitio}/</link>
  <atom:link href="${sitio}/podcast.xml" rel="self" type="application/rss+xml"/>
  <language>es-cl</language>
  <description>Las noticias de Chile explicadas cada mañana en unos diez minutos. Cada cifra con su fuente y los hechos separados de las opiniones. El resumen sin gritos.</description>
  <itunes:author>Entender Chile</itunes:author>
  <itunes:owner><itunes:name>Entender Chile</itunes:name><itunes:email>entenderchile@gmail.com</itunes:email></itunes:owner>
  <itunes:image href="${sitio}/podcast-portada.png"/>
  <itunes:category text="News"><itunes:category text="Daily News"/></itunes:category>
  <itunes:explicit>false</itunes:explicit>${items}
</channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
