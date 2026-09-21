#!/usr/bin/env node
/**
 * taller-tablero.js - El Taller, fase 1 (lectura): una página generada desde
 * el repo con seis módulos: Ver, Medir, Experimentos, Decidir, Mejorar y
 * Flujos. Propuesta en bitacora/2026-09-20-propuesta-taller.md.
 *
 * El repo es la única verdad; esto es una vista. Se rearma y se republica
 * como artifact (como el panel). Lee:
 *   contenido/estado/FECHA.md, contenido/veredictos/*.md, contenido/informes/,
 *   bitacora/metricas/FECHA.json, bitacora/experimentos.json,
 *   bitacora/cronograma.json, bitacora/taller.json, contenido/claves/banco-temas.md,
 *   bitacora/*-auditoria.md, prompts/*.md (+ git log para la última edición).
 *
 * Uso:  node scripts/taller-tablero.js [--fecha AAAA-MM-DD] [--imagenes DIR] [salida.html]
 *   --imagenes DIR: carpeta con caratula-hoy.jpg y caratula-manana.jpg para el
 *   módulo Ver (fase 1: se pasan a mano; fase 3: saldrán del release del día).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const RAIZ = path.join(__dirname, "..");
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const FECHA = opt("--fecha") || new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const IMG = opt("--imagenes");
const salida = args.find((a) => a.endsWith(".html")) || path.join("bitacora", "taller-tablero.html");

const leer = (p) => { try { return fs.readFileSync(path.join(RAIZ, p), "utf8"); } catch { return ""; } };
const json = (p, def) => { try { return JSON.parse(leer(p)); } catch { return def; } };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ddmm = (iso) => (iso || "").slice(0, 10).split("-").reverse().join("-");
const diasEntre = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const git = (cmd) => { try { return execSync(`git ${cmd}`, { cwd: RAIZ, encoding: "utf8" }).trim(); } catch { return ""; } };
const fechas = (n) => Array.from({ length: n }, (_, i) => { const d = new Date(`${FECHA}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - i); return d.toISOString().slice(0, 10); });

// ---------- datos
const estado = leer(`contenido/estado/${FECHA}.md`);
const campo = (txt, k) => (txt.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1] || "";
const metricas = json(`bitacora/metricas/${FECHA}.json`, null) || json(`bitacora/metricas/${fechas(2)[1]}.json`, {});
const experimentos = json("bitacora/experimentos.json", { experimentos: [] }).experimentos || [];
const cronograma = json("bitacora/cronograma.json", { fases: [] });
const tableros = json("bitacora/taller.json", { items: [] }).items || [];

const PIEZAS = { preseleccion: "prompts/seleccion.md", informe: "prompts/informe.md", guion_informe: "prompts/guion-informe.md", clave: "prompts/claves.md", guion_clave: "prompts/guion-claves.md" };
const veredicto = (fecha, pieza) => {
  const t = leer(`contenido/veredictos/${fecha}-${pieza}.md`);
  if (!t) return null;
  return { veredicto: campo(t, "VEREDICTO"), vuelta: Number(campo(t, "VUELTA") || 0) };
};
const dias7 = fechas(7);
const semana = dias7.map((f) => {
  const inf = leer(`contenido/informes/${f}.md`);
  const titulo = (inf.match(/^### \[A\]\s+(.+)$/m) || [])[1] || (inf.match(/^NOTICIA DE PORTADA:\s*([^|\n]+)/m) || [])[1] || "";
  const vueltas = Object.keys(PIEZAS).map((p) => [p, veredicto(f, p)]).filter(([, v]) => v);
  const video = Object.values(metricas.videos || {}).filter((v) => v.publicado === f && v.durSeg > 180 && !/^Clave:|^¿/.test(v.titulo)).sort((a, b) => b.vistas - a.vistas)[0];
  return { fecha: f, titulo: titulo.trim(), vueltas, vistas: video ? video.vistas : null, existe: Boolean(inf) };
}).filter((d) => d.existe);

// ---------- Ver
const img = (nombre) => { if (!IMG) return ""; const p = path.join(IMG, nombre); if (!fs.existsSync(p)) return ""; return "data:image/jpeg;base64," + fs.readFileSync(p).toString("base64"); };
const hoy = semana[0] || { titulo: "", vueltas: [] };
const modVer = `
<section id="ver" class="mod">
  <header class="mod-cab"><span class="eyebrow">Ver</span><h2>Lo que salió hoy, ${ddmm(FECHA)}</h2>
    <p>${esc(hoy.titulo || "Sin informe de hoy todavía")}. Estado: <b>${esc(campo(estado, "ETAPA") || "sin vista")}</b>${campo(estado, "VUELTA") ? ` · vuelta ${esc(campo(estado, "VUELTA"))}` : ""}.</p></header>
  <div class="caratulas">
    ${img("caratula-hoy.jpg") ? `<figure><img src="${img("caratula-hoy.jpg")}" alt="Carátula de hoy" width="640" height="360"><figcaption><span class="rotulo">Salió hoy</span>la carátula que se publicó</figcaption></figure>` : ""}
    ${img("caratula-manana.jpg") ? `<figure><img src="${img("caratula-manana.jpg")}" alt="Carátula de la regla nueva" width="640" height="360"><figcaption><span class="rotulo cobre">Desde mañana</span>la regla nueva sobre la misma noticia (ejemplo)</figcaption></figure>` : ""}
  </div>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Día</th><th>Portada</th><th>Vueltas de corrección</th><th>Vistas del largo</th></tr></thead>
    <tbody>${semana.map((d) => `<tr><td class="mono">${ddmm(d.fecha)}</td><td>${esc(d.titulo)}</td><td class="mono">${d.vueltas.length ? d.vueltas.map(([p, v]) => `${p.replace("_", " ")}: ${v.vuelta}`).join(" · ") : "sin veredictos (cadena anterior)"}</td><td class="num">${d.vistas ?? "-"}</td></tr>`).join("")}</tbody>
  </table></div>
  <p class="nota">Las vueltas cuentan cuántas veces Claude devolvió la pieza a GPT antes de aprobarla. Las vistas son las acumuladas al ${ddmm(metricas.fecha || FECHA)}; un largo del día lleva pocas horas al aire.</p>
</section>`;

// ---------- Medir
const NOMBRE = { SHORTS: "Shorts", YT_SEARCH: "búsqueda", SUBSCRIBER: "suscriptores", YT_CHANNEL: "página del canal", RELATED_VIDEO: "sugeridos", NOTIFICATION: "notificaciones", PLAYLIST: "listas", EXT_URL: "enlaces externos", NO_LINK_OTHER: "directo", YT_OTHER_PAGE: "otras páginas", SHORTS_CONTENT_LINKS: "enlace desde un Short", END_SCREEN: "pantalla final" };
const nom = (s) => NOMBRE[s] || String(s).toLowerCase();
const ret = metricas.retencion || {};
const vids = metricas.videos || {};
let minLargos = 0, pesoPct = 0, pesoVistas = 0;
for (const [id, r] of Object.entries(ret)) { if ((vids[id]?.durSeg ?? 0) <= 75) continue; minLargos += r.minutos; pesoPct += r.pct * r.vistas; pesoVistas += r.vistas; }
const canalFuentes = Object.entries(metricas.fuentes?.canal || {}).filter(([s]) => s !== "SHORTS").sort((a, b) => b[1].minutos - a[1].minutos).slice(0, 6);
const maxMin = Math.max(1, ...canalFuentes.map(([, x]) => x.minutos));
const curvas = Object.entries(metricas.fuentes?.videos || {}).filter(([, x]) => x.curva).sort((a, b) => (ret[b[0]]?.vistas ?? 0) - (ret[a[0]]?.vistas ?? 0));
const sparkline = (serie) => {
  const w = 240, h = 64, n = serie.length;
  const pts = serie.map((v, i) => `${((i / (n - 1)) * w).toFixed(1)},${(h - Math.min(1, v) * h).toFixed(1)}`).join(" ");
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Curva de retención"><line x1="0" y1="${h * 0.5}" x2="${w}" y2="${h * 0.5}" class="guia"/><line x1="${w * 0.05}" y1="0" x2="${w * 0.05}" y2="${h}" class="guia"/><polyline points="${pts}" class="curva"/></svg>`;
};
const modMedir = `
<section id="medir" class="mod">
  <header class="mod-cab"><span class="eyebrow">Medir</span><h2>Qué resultó</h2><p>Analytics de los últimos 30 días, medido el ${ddmm(metricas.fecha || FECHA)}. La meta son 4.000 horas de largos antes del 01-02-2027.</p></header>
  <div class="cifras">
    <div class="cifra"><span class="n">${(minLargos / 60).toFixed(1)}</span><span class="q">horas vistas en largos, 30 días</span></div>
    <div class="cifra"><span class="n">${pesoVistas ? (pesoPct / pesoVistas).toFixed(1) : "-"}%</span><span class="q">retención media ponderada de los largos</span></div>
    <div class="cifra"><span class="n">${metricas.canal?.suscriptores ?? "-"}</span><span class="q">suscriptores</span></div>
    <div class="cifra"><span class="n">${Object.values(vids).reduce((s, v) => s + (v.vistas || 0), 0)}</span><span class="q">vistas totales, suma por video</span></div>
  </div>
  <h3>De dónde vienen los minutos de los largos</h3>
  <div class="barras">${canalFuentes.map(([s, x]) => `<div class="barra-fila"><span class="etq">${esc(nom(s))}</span><span class="pista"><span class="relleno" style="width:${(100 * x.minutos / maxMin).toFixed(0)}%"></span></span><span class="mono val">${x.minutos} min · ${x.vistas} vistas</span></div>`).join("")}</div>
  <h3>Dónde se va la gente</h3>
  <p class="nota">Cada curva es la audiencia que sigue viendo a lo largo del video (de 0 a 100% de su duración). La línea vertical marca el 5%, unos 30-40 segundos. Solo existe para largos con ~20 vistas o más.</p>
  <div class="curvas">${curvas.map(([id, x]) => { const top = Object.entries(x.fuentes).sort((a, b) => b[1] - a[1])[0]; const c = x.curva; return `<div class="curva-tarjeta"><div class="curva-titulo">${esc(vids[id]?.titulo || id)}</div>${sparkline(c.serie)}<div class="curva-datos mono">${ret[id]?.vistas ?? "-"} vistas · ${top ? esc(nom(top[0])) + " " + Math.round(100 * top[1] / (ret[id]?.vistas || 1)) + "%" : ""}<br>al 5%: <b>${c.p05}%</b> · al 25%: ${c.p25}% · al final: ${c.p75}%<br>mayor caída: segundo ${c.caidaMayor.segundo} (${c.caidaMayor.puntos} puntos)</div></div>`; }).join("") || "<p class='nota'>Sin curvas todavía.</p>"}</div>
</section>`;

// ---------- Experimentos
const modExp = `
<section id="experimentos" class="mod">
  <header class="mod-cab"><span class="eyebrow">Experimentos</span><h2>Qué estamos probando</h2><p>Un cambio a la vez por métrica, dos semanas, veredicto con números (regla 26). Registro: <span class="mono">bitacora/experimentos.json</span>.</p></header>
  <div class="exp-lista">${experimentos.map((e) => { const t = diasEntre(e.desde, FECHA); const faltan = Math.max(0, (e.dias || 14) - t); const fin = e.estado !== "en_curso"; return `<article class="exp ${esc(e.estado)}"><div class="exp-cab"><span class="chip ${esc(e.estado)}">${fin ? esc(e.estado) : t < 0 ? `empieza en ${-t} d` : faltan ? `día ${t} de ${e.dias || 14}` : "listo para juzgar"}</span><span class="mono gris">desde ${ddmm(e.desde)}</span></div><h3>${esc(e.titulo)}</h3><p>${esc(e.hipotesis)}</p><dl><dt>Cambió</dt><dd class="mono">${esc(e.cambio)}</dd><dt>Lo juzga</dt><dd>${esc(e.metrica)}</dd><dt>Control</dt><dd>${esc(e.control)}</dd>${e.veredicto ? `<dt>Veredicto</dt><dd>${esc(e.veredicto)}</dd>` : ""}</dl></article>`; }).join("")}</div>
</section>`;

// ---------- Decidir
const banco = leer("contenido/claves/banco-temas.md").split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).split("|").map((s) => s.trim())).reverse();
const modDecidir = `
<section id="decidir" class="mod">
  <header class="mod-cab"><span class="eyebrow">Decidir</span><h2>Lo que espera a Santiago</h2><p>Fase 1: se decide en el chat con la sesión de día (el día propone, Santiago dice sí, el día ejecuta). Fase 2: los botones de esta página escriben la decisión en el repo y la máquina sigue sola.</p></header>
  <h3>Banco de temas de la Clave <span class="gris">(${banco.length} temas; los ${Math.min(15, banco.length)} más nuevos)</span></h3>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Fecha</th><th>Concepto</th><th>Noticia de origen</th><th></th></tr></thead>
    <tbody>${banco.slice(0, 15).map(([c, n, f]) => `<tr><td class="mono">${ddmm(f)}</td><td>${esc(c)}</td><td class="gris">${esc(n)}</td><td><button type="button" class="btn" disabled title="Fase 2: escribe la decisión en el repo">Elegir</button></td></tr>`).join("")}</tbody>
  </table></div>
  <h3>Tableros</h3>
  <ul class="tableros">${tableros.map((t) => `<li><span class="chip ${/APROBADO|CERRADO/.test(t.estado) ? "cerrado" : "en_curso"}">${esc(t.estado)}</span> <b>${esc(t.titulo)}</b> <span class="mono gris">${esc(t.fecha)}</span>${t.url ? ` · <a href="${esc(t.url)}">abrir</a>` : ""}<br><span class="gris">${esc(t.nota)}</span></li>`).join("")}</ul>
</section>`;

// ---------- Mejorar
const audits = fechas(7).map((f) => ({ fecha: f, txt: leer(`bitacora/${f}-auditoria.md`) })).filter((a) => a.txt);
const propuestas = (txt) => { const m = txt.match(/## Propuestas([\s\S]*?)## Triage/); return m ? m[1].split("\n").filter((l) => /^\d+\./.test(l.trim())) : []; };
const lectores = {};
for (const f of cronograma.fases || []) for (const i of f.items || []) for (const p of (i.que || "").match(/prompts\/[a-z-]+\.md/g) || []) (lectores[p] = lectores[p] || new Set()).add(i.quien);
const prompts = fs.readdirSync(path.join(RAIZ, "prompts")).filter((f) => f.endsWith(".md") && !/README|CALIDAD/.test(f)).map((f) => {
  const p = `prompts/${f}`;
  const pieza = Object.entries(PIEZAS).find(([, v]) => v === p)?.[0];
  const vueltas = pieza ? dias7.map((d) => veredicto(d, pieza)).filter(Boolean).reduce((s, v) => s + v.vuelta, 0) : null;
  const dias = audits.filter((a) => propuestas(a.txt).some((l) => l.includes(f)));
  const ultima = dias[0] ? propuestas(dias[0].txt).find((l) => l.includes(f)) : "";
  return { p, lineas: leer(p).split("\n").length, editado: git(`log -1 --format=%ad --date=short -- ${p}`), lee: [...(lectores[p] || [])].join(", ") || "(nadie en el cronograma)", vueltas, diasAud: dias.length, ultima: (ultima || "").replace(/^\d+\.\s*/, "").slice(0, 220) };
}).sort((a, b) => (b.vueltas ?? -1) - (a.vueltas ?? -1) || b.diasAud - a.diasAud);
const modMejorar = `
<section id="mejorar" class="mod">
  <header class="mod-cab"><span class="eyebrow">Mejorar</span><h2>Qué prompt cuesta, y por qué</h2><p>Vueltas de corrección de los últimos siete días (lo que Claude devolvió a GPT) y en cuántas auditorías apareció una propuesta sobre ese archivo. Lo que se repite es lo que hay que cambiar.</p></header>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Prompt</th><th>Lo lee</th><th>Vueltas, 7 días</th><th>Auditorías, 7 días</th><th>Última propuesta de la auditoría</th><th>Editado</th></tr></thead>
    <tbody>${prompts.map((x) => `<tr><td class="mono">${esc(x.p.replace("prompts/", ""))}<br><span class="gris">${x.lineas} líneas</span></td><td>${esc(x.lee)}</td><td class="num">${x.vueltas ?? "-"}</td><td class="num">${x.diasAud || "-"}</td><td class="gris">${esc(x.ultima) || "-"}</td><td class="mono">${ddmm(x.editado)}</td></tr>`).join("")}</tbody>
  </table></div>
</section>`;

// ---------- Flujos
const modFlujos = `
<section id="flujos" class="mod">
  <header class="mod-cab"><span class="eyebrow">Flujos</span><h2>Quién hace qué, y con qué prompt</h2><p>Del cronograma (<span class="mono">bitacora/cronograma.json</span>, actualizado ${ddmm(cronograma.actualizado || "")}). Hoy hay un flujo diario; la Clave y el exprés tendrán el suyo.</p></header>
  ${(cronograma.fases || []).map((f) => `<h3>${esc(f.nombre)}</h3><ol class="flujo">${(f.items || []).map((i) => `<li><span class="mono hora">${esc(i.hora)}</span><span class="chip tipo-${esc(i.tipo)}">${esc(i.tipo)}</span><b>${esc(i.quien)}</b><span class="gris">${esc((i.que || "").slice(0, 200))}${(i.que || "").length > 200 ? "…" : ""}</span></li>`).join("")}</ol>`).join("")}
</section>`;

// ---------- página
const html = `<title>Taller Entender Chile</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root { --papel:#F2F2EF; --alto:#FCFCFA; --tinta:#17191C; --gris:#6B6E6A; --linea:#DDDDD5; --patina:#2F7263; --patina-suave:#E4EEEA; --cobre:#D08A5B; --ambar:#F0E3C6;
    --serif:'Fraunces',Georgia,'Times New Roman',serif; --sans:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif; --mono:'IBM Plex Mono','Courier New',monospace; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --papel:#15181A; --alto:#1F2326; --tinta:#EDE6DA; --gris:#A6A399; --linea:#2E3336; --patina:#5FA48F; --patina-suave:#1E2E2A; --cobre:#E0A175; --ambar:#3A3222; } }
  :root[data-theme="dark"] { --papel:#15181A; --alto:#1F2326; --tinta:#EDE6DA; --gris:#A6A399; --linea:#2E3336; --patina:#5FA48F; --patina-suave:#1E2E2A; --cobre:#E0A175; --ambar:#3A3222; }
  body { background:var(--papel); color:var(--tinta); font-family:var(--sans); font-size:15px; line-height:1.5; padding-inline:20px; padding-block:24px 80px; max-width:1180px; margin:0 auto; }
  h1,h2,h3 { font-family:var(--serif); font-weight:600; margin:0; text-wrap:balance; }
  h1 { font-size:clamp(30px,4.5vw,44px); line-height:1.05; } h2 { font-size:clamp(22px,3vw,30px); line-height:1.15; } h3 { font-size:19px; margin-top:26px; }
  p { margin:0; max-width:70ch; } a { color:var(--patina); }
  .eyebrow { font-family:var(--mono); font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--patina); }
  .mono { font-family:var(--mono); font-size:13px; } .gris { color:var(--gris); } .num { font-family:var(--mono); text-align:right; font-variant-numeric:tabular-nums; } .nota { color:var(--gris); font-size:14px; margin-top:10px; }
  .cab { display:grid; gap:10px; padding-bottom:22px; } .cab p { color:var(--gris); }
  nav.tabs { position:sticky; top:env(safe-area-inset-top,0px); z-index:3; background:var(--papel); border-block:1px solid var(--linea); display:flex; gap:4px; overflow-x:auto; padding-block:8px; margin-bottom:8px; }
  nav.tabs a { flex:0 0 auto; font:500 14px var(--sans); color:var(--tinta); text-decoration:none; padding:8px 14px; border-radius:2px; } nav.tabs a:hover, nav.tabs a:focus-visible { background:var(--patina-suave); outline:none; }
  .mod { padding-block:34px; border-bottom:1px solid var(--linea); scroll-margin-top:60px; } .mod-cab { display:grid; gap:8px; margin-bottom:18px; } .mod-cab p { color:var(--gris); }
  .caratulas { display:flex; flex-wrap:wrap; gap:18px; margin-bottom:22px; } .caratulas figure { margin:0; width:420px; max-width:100%; display:grid; gap:8px; } .caratulas img { width:100%; height:auto; aspect-ratio:16/9; display:block; box-shadow:0 2px 10px rgba(0,0,0,.18); }
  .caratulas figcaption { font-size:13px; color:var(--gris); display:grid; gap:2px; } .rotulo { font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--patina); } .rotulo.cobre { color:var(--cobre); }
  .tabla-envoltura { overflow-x:auto; } table { border-collapse:collapse; width:100%; font-size:14px; } th, td { text-align:left; padding:9px 10px; border-bottom:1px solid var(--linea); vertical-align:top; } th { font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--gris); font-weight:500; }
  .cifras { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-bottom:8px; } .cifra { background:var(--alto); border:1px solid var(--linea); padding:16px 18px; display:grid; gap:4px; } .cifra .n { font-family:var(--serif); font-size:40px; line-height:1; font-variant-numeric:tabular-nums; } .cifra .q { font-size:13px; color:var(--gris); }
  .barras { display:grid; gap:8px; max-width:720px; } .barra-fila { display:grid; grid-template-columns:150px 1fr auto; gap:12px; align-items:center; font-size:14px; } .pista { height:12px; background:var(--patina-suave); } .relleno { display:block; height:100%; background:var(--patina); } .val { color:var(--gris); white-space:nowrap; }
  .curvas { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:14px; margin-top:12px; } .curva-tarjeta { background:var(--alto); border:1px solid var(--linea); padding:14px; display:grid; gap:8px; } .curva-titulo { font-size:14px; font-weight:500; line-height:1.3; } .curva-tarjeta svg { width:100%; height:auto; max-width:100%; } .curva { fill:none; stroke:var(--patina); stroke-width:2; } .guia { stroke:var(--linea); stroke-width:1; stroke-dasharray:3 3; } .curva-datos { color:var(--gris); line-height:1.5; }
  .exp-lista { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:14px; } .exp { background:var(--alto); border:1px solid var(--linea); border-left:4px solid var(--patina); padding:16px 18px; display:grid; gap:10px; } .exp.cancelado { border-left-color:var(--gris); } .exp.cerrado { border-left-color:var(--cobre); } .exp h3 { margin:0; } .exp-cab { display:flex; justify-content:space-between; gap:10px; align-items:center; }
  .exp dl { display:grid; grid-template-columns:auto 1fr; gap:4px 12px; font-size:13px; margin:0; } .exp dt { color:var(--gris); font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; padding-top:2px; } .exp dd { margin:0; }
  .chip { display:inline-block; font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; background:var(--patina-suave); color:var(--patina); } .chip.cancelado { background:var(--linea); color:var(--gris); } .chip.cerrado { background:var(--ambar); color:var(--tinta); }
  .chip.tipo-gpt { background:var(--ambar); color:var(--tinta); } .chip.tipo-actions { background:var(--linea); color:var(--tinta); } .chip.tipo-senal { background:var(--linea); color:var(--gris); }
  .btn { font:500 13px var(--sans); color:var(--patina); background:transparent; border:1px solid var(--patina); padding:5px 12px; } .btn:disabled { color:var(--gris); border-color:var(--linea); cursor:not-allowed; }
  .tableros { list-style:none; padding:0; margin:0; display:grid; gap:12px; font-size:14px; }
  .flujo { list-style:none; padding:0; margin:0 0 8px; display:grid; gap:8px; } .flujo li { display:grid; grid-template-columns:130px auto 1fr; gap:6px 12px; align-items:baseline; font-size:14px; padding:8px 0; border-bottom:1px solid var(--linea); } .flujo li .gris { grid-column:1/-1; font-size:13px; } .hora { color:var(--gris); white-space:nowrap; }
  @media (max-width:600px) { .barra-fila { grid-template-columns:1fr; gap:4px; } .flujo li { grid-template-columns:1fr; } }
</style>
<header class="cab">
  <span class="eyebrow">Entender Chile · fase 1, lectura</span>
  <h1>Taller</h1>
  <p>Donde se mira lo que salió, se mide qué resultó, se decide qué probar y se mejora el prompt que lo produce. Generado desde el repo el ${ddmm(FECHA)}; el repo es la única verdad.</p>
</header>
<nav class="tabs" aria-label="Módulos"><a href="#ver">Ver</a><a href="#medir">Medir</a><a href="#experimentos">Experimentos</a><a href="#decidir">Decidir</a><a href="#mejorar">Mejorar</a><a href="#flujos">Flujos</a></nav>
${modVer}${modMedir}${modExp}${modDecidir}${modMejorar}${modFlujos}
`;
fs.writeFileSync(path.join(RAIZ, salida), html);
console.log(`${salida}: ${(html.length / 1024).toFixed(0)} KB · ${semana.length} días · ${curvas.length} curvas · ${experimentos.length} experimentos · ${prompts.length} prompts · ${banco.length} temas`);
