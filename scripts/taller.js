#!/usr/bin/env node
/**
 * taller.js - El Taller de una página, fase 2: OCHO módulos en un solo HTML
 * autocontenido (Bandeja, Hoy, Semana, Clave, Medir, Experimentos, Prompts,
 * Flujos y rutinas), con botones que abren GitHub con el trabajo ya hecho.
 * Especificación validada por Santiago en la sección D de
 * archivo/bitacora/2026-09-26-propuesta-limpieza-y-taller.md.
 *
 * La BANDEJA es del 27-09-2026 ("crea en el Taller un sistema de
 * notificaciones: cuando algo necesita mi aprobación, que lo pueda ver ahí") y
 * va PRIMERA con un contador en la pestaña y en el título de la página: lo que
 * espera una decisión suya tiene que verse antes de abrir nada. No la calcula
 * este script: la calcula scripts/bandeja.js en bitacora/bandeja.json, porque
 * la misma lista la leen el informe de la mañana y la rutina que manda el aviso
 * al teléfono, y tres cálculos distintos de "qué está esperando" habrían dado
 * tres respuestas distintas.
 *
 * Por qué los botones son enlaces a GitHub y no un formulario: la fase 1
 * (20-09) solo leía, y cada decisión de Santiago volvía al chat o a la consola.
 * Un enlace `/new/main?filename=...&value=...` abre el editor de GitHub con la
 * ruta y el contenido ya rellenados; Santiago aprieta "Commit" y ese push mueve
 * la máquina (estado-clave.yml) igual que scripts/clave.js. No hay tokens, no
 * hay servidor, no consume cuota de nadie y funciona desde el teléfono. Lo que
 * es un workflow abre su página de "Run workflow" con la instrucción al lado.
 *
 * El texto de los archivos de decisión NO se arma aquí: sale de las funciones
 * exportadas de scripts/clave.js. Si el formato viviera en dos lados derivaría,
 * y estado-clave.js leería una cosa u otra según quién escribió el archivo.
 *
 * El repo es la única verdad; esto es una vista. Lee:
 *   contenido/estado/FECHA.{md,json} y contenido/estado/clave-<slug>.json,
 *   bitacora/FECHA-auditoria.md (ESTADO y triage HOY), el git log de 24 horas,
 *   contenido/claves/semana/ (ranking y candidatos), contenido/claves/flujo/,
 *   bitacora/metricas/FECHA.json, bitacora/experimentos.json,
 *   bitacora/cronograma.json, bitacora/rutinas.md, contenido/veredictos/,
 *   contenido/informes/ y prompts/*.md.
 *
 * Uso:  node scripts/taller.js [--fecha AAAA-MM-DD] [--imagenes DIR] [salida.html]
 *   --imagenes DIR: carpeta con caratula-hoy.jpg y caratula-manana.jpg para el
 *   módulo Hoy (se pasan a mano; fase 3: saldrán del release del día).
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const clave = require("./clave.js");
const { urlVer, urlEditar, urlNuevo, urlFlujo } = require("./botones.js");

const RAIZ = path.join(__dirname, "..");
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const enChile = (d = new Date()) => new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const AHORA = enChile();
const FECHA = opt("--fecha") || AHORA.slice(0, 10);
const IMG = opt("--imagenes");
const salida = args.find((a) => a.endsWith(".html")) || path.join("bitacora", "taller.html");

const leer = (p) => { try { return fs.readFileSync(path.join(RAIZ, p), "utf8"); } catch { return ""; } };
const existe = (p) => fs.existsSync(path.join(RAIZ, p));
const json = (p, def) => { try { return JSON.parse(leer(p)); } catch { return def; } };
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const ddmm = (iso) => (iso || "").slice(0, 10).split("-").reverse().join("-");
const diasEntre = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
// TZ fijada: el git log tiene que dar horas de Chile aunque la máquina que
// genera la página esté en otra zona (las auditorías se equivocaron por esto).
const git = (cmd) => { try { return execSync(`git ${cmd}`, { cwd: RAIZ, encoding: "utf8", env: { ...process.env, TZ: "America/Santiago" } }).trim(); } catch { return ""; } };
const fechas = (n) => Array.from({ length: n }, (_, i) => { const d = new Date(`${FECHA}T12:00:00Z`); d.setUTCDate(d.getUTCDate() - i); return d.toISOString().slice(0, 10); });
const campo = (txt, k) => (txt.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1] || "";
const unaLinea = (s) => String(s ?? "").replace(/\s+/g, " ").trim();
const corta = (s, n) => (s.length > n ? `${s.slice(0, n)}…` : s);
// markdown de una línea, para las celdas de las tablas de bitacora/rutinas.md
const inline = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");

// ---------- los enlaces a GitHub: la única forma de decidir sin tokens
// Las URL salen de scripts/botones.js, que comparte con scripts/bandeja.js: el
// href de un botón del Taller y el del mismo botón en la Bandeja tienen que ser
// el mismo, porque ese push es el que mueve la máquina.
const boton = (href, texto, ayuda = "", clase = "") => `<span class="boton"><a class="btn${clase ? ` ${clase}` : ""}" href="${esc(href)}">${esc(texto)}</a>${ayuda ? `<span class="ayuda">${ayuda}</span>` : ""}</span>`;
// Un archivo que YA existe no se puede crear: GitHub rechaza /new con esa ruta.
// Ahí el botón abre el editor y lo dice, para que nadie crea que pisa una
// decisión sin verla; y como el editor no acepta contenido prellenado, el texto
// que habría llevado el botón queda a la vista para copiarlo.
const botonArchivo = (ruta, contenido, texto, ayuda) => (existe(ruta)
  ? boton(urlEditar(ruta), `${texto} (editar, ya existe)`, `${ayuda}. El archivo ya está escrito, así que GitHub lo abre tal cual y hay que reemplazar su contenido: <details><summary>qué dejar escrito</summary><pre>${esc(contenido)}</pre></details>`)
  : boton(urlNuevo(ruta, contenido), texto, ayuda, "primario"));

// ---------- datos comunes
const metricas = json(`bitacora/metricas/${FECHA}.json`, null) || json(`bitacora/metricas/${fechas(2)[1]}.json`, {});
const experimentos = json("bitacora/experimentos.json", { experimentos: [] }).experimentos || [];
const cronograma = json("bitacora/cronograma.json", { fases: [] });
const PIEZAS = { preseleccion: "prompts/seleccion.md", informe: "prompts/informe.md", guion_informe: "prompts/guion-informe.md", clave: "prompts/claves.md", guion_clave: "prompts/guion-claves.md" };
const veredicto = (fecha, pieza) => {
  const t = leer(`contenido/veredictos/${fecha}-${pieza}.md`);
  if (!t) return null;
  return { fecha, veredicto: campo(t, "VEREDICTO"), vuelta: Number(campo(t, "VUELTA") || 0), observacion: unaLinea((t.match(/Observaciones:\s*\n-\s*([\s\S]*?)(?=\n-\s|\n\n|$)/) || [])[1] || "") };
};
const dias7 = fechas(7);
const semana7 = dias7.map((f) => {
  const inf = leer(`contenido/informes/${f}.md`);
  const titulo = (inf.match(/^### \[A\]\s+(.+)$/m) || [])[1] || (inf.match(/^NOTICIA DE PORTADA:\s*([^|\n]+)/m) || [])[1] || "";
  const vueltas = Object.keys(PIEZAS).map((p) => [p, veredicto(f, p)]).filter(([, v]) => v);
  const video = Object.values(metricas.videos || {}).filter((v) => v.publicado === f && v.durSeg > 180 && !/^Clave:|^¿/.test(v.titulo)).sort((a, b) => b.vistas - a.vistas)[0];
  return { fecha: f, titulo: titulo.trim(), vueltas, vistas: video ? video.vistas : null, existe: Boolean(inf) };
}).filter((d) => d.existe);

// ---------- 0. Bandeja -------------------------------------------------------
// La lista no se calcula acá: la calcula scripts/bandeja.js. Si el json no está
// o quedó viejo, el módulo lo dice en vez de inventar una bandeja vacía: "nada
// espera tu decisión" y "no sé qué espera tu decisión" no son lo mismo.
const bandeja = json("bitacora/bandeja.json", null);
const itemsBandeja = bandeja?.items || [];
const ROTULO_TIPO = { clave: "Clave", bloqueo: "bloqueo", semana: "semana", pendiente: "pendiente", imagen: "imagen" };
const itemHtml = (it) => `<article class="item-bandeja ${esc(it.tipo)}">
  <div class="exp-cab"><span class="chip espera">${esc(ROTULO_TIPO[it.tipo] || it.tipo)}</span><span class="mono gris">desde ${ddmm(it.desde)}</span></div>
  <h3>${esc(it.titulo)}</h3>
  ${it.detalle ? `<p class="nota">${esc(it.detalle)}</p>` : ""}
  <div class="botones">${(it.acciones || []).map((a, i) => boton(a.href, a.texto, "", i === 1 && it.tipo === "clave" ? "primario" : "")).join("")}</div>
</article>`;

const modBandeja = `
<section id="bandeja" class="mod">
  <header class="mod-cab"><span class="eyebrow">Bandeja</span><h2>Espera tu decisión${itemsBandeja.length ? ` <span class="badge">${itemsBandeja.length}</span>` : ""}</h2>
    <p>Todo lo que no avanza hasta que tú decidas, en un solo lugar y en orden de urgencia: primero la Clave y los bloqueos. Vista de <span class="mono">bitacora/bandeja.json</span>${bandeja ? `, calculada ${esc(bandeja.generado || "")}` : ""}. El mismo archivo alimenta el informe de la mañana y el aviso al teléfono.</p></header>
  ${bandeja === null
    ? `<p class="aviso">No hay <span class="mono">bitacora/bandeja.json</span> en el repo: corre <span class="mono">node scripts/bandeja.js</span> y vuelve a generar esta página. Sin ese archivo no se puede saber qué está esperando.</p>`
    : itemsBandeja.length
      ? itemsBandeja.map(itemHtml).join("")
      : `<p class="nota">Nada espera tu decisión.</p>`}
</section>`;

// ---------- 1. Hoy -----------------------------------------------------------
// Si el estado de hoy todavía no está escrito (la cadena parte a la 01:30), se
// muestra el más reciente de la semana y se dice de qué día es.
const fechaEstado = dias7.find((f) => existe(`contenido/estado/${f}.json`)) || FECHA;
const estadoMd = leer(`contenido/estado/${fechaEstado}.md`);
const est = json(`contenido/estado/${fechaEstado}.json`, {});
const piezasHoy = est.piezas || [];
const marcaPieza = { falta: "falta", por_validar: "por validar", reparar: "devuelta a GPT", bloqueada: "BLOQUEADA", lista: "aprobada", listo: "listo" };

const fechaAud = dias7.find((f) => existe(`bitacora/${f}-auditoria.md`));
const audTxt = fechaAud ? leer(`bitacora/${fechaAud}-auditoria.md`) : "";
const audEstado = unaLinea((audTxt.match(/^ESTADO:\s*([\s\S]*?)(?:\n\s*\n|$)/) || [])[1] || "");
// Sin la bandera /m: con ella, `$` corta en el primer fin de LÍNEA y el triage
// quedaba en media frase (los puntos HOY ocupan dos o tres líneas cada uno).
const triage = (audTxt.match(/\n##\s+Triage\s*([\s\S]*?)(?=\n##\s|$)/) || [])[1] || "";
const puntosHoy = triage.split(/\n(?=\s*-\s)/).map((b) => unaLinea(b))
  .filter((b) => /^-\s*\*\*HOY\*\*/.test(b)).map((b) => b.replace(/^-\s*\*\*HOY\*\*:?\s*/, ""));

// El formato es el que pide el encargo. `%an` y `%s` caen en la misma celda
// porque un espacio no distingue dónde termina el nombre del autor.
const commits = git(`log --since="24 hours ago" --format='%h %ad %an %s' --date=format-local:'%H:%M'`)
  .split("\n").filter(Boolean).map((l) => {
    const m = l.match(/^(\S+)\s+(\d{2}:\d{2})\s+([\s\S]*)$/);
    return m ? { hash: m[1], hora: m[2], quien: m[3] } : { hash: "", hora: "", quien: l };
  });

const img = (nombre) => { if (!IMG) return ""; const p = path.join(IMG, nombre); if (!fs.existsSync(p)) return ""; return `data:image/jpeg;base64,${fs.readFileSync(p).toString("base64")}`; };

const botonesEmergencia = [
  boton(urlFlujo("barrido.yml"), "Relanzar barrido", 'Run workflow: marca <code>forzar</code> solo si hay que pisar el barrido que ya existe'),
  boton(urlFlujo("estado.yml"), "Recalcular estado", "Run workflow sin campos: recalcula la vista del día y despierta al validador"),
  boton(urlFlujo("reintento.yml"), "Simular reintento", 'Run workflow con <code>simular</code> marcado: imprime cada decisión y no pushea ni llama a la API'),
  boton(urlFlujo("edicion-diaria.yml"), "Producir edición", 'Run workflow: <code>fecha</code> vacía es hoy en Chile; <code>forzar</code> solo para rehacer piezas que ya están en el release'),
].join("");

const modHoy = `
<section id="hoy" class="mod">
  <header class="mod-cab"><span class="eyebrow">Hoy</span><h2>En qué va el día ${ddmm(fechaEstado)}</h2>
    <p>Etapa <b>${esc(campo(estadoMd, "ETAPA") || "sin vista")}</b>${campo(estadoMd, "VUELTA") ? ` · vuelta ${esc(campo(estadoMd, "VUELTA"))}` : ""}${campo(estadoMd, "VEREDICTO") ? ` · veredicto ${esc(campo(estadoMd, "VEREDICTO"))}` : ""}. Vista de <span class="mono">contenido/estado/${esc(fechaEstado)}.md</span>, actualizada ${esc(campo(estadoMd, "ACTUALIZADO") || "sin hora")}.${fechaEstado !== FECHA ? ` <b>Es el estado del ${ddmm(fechaEstado)}</b>, no del ${ddmm(FECHA)}: el de hoy todavía no está escrito.` : ""}</p></header>
  ${campo(estadoMd, "PIEZA") ? `<p class="dato">Pieza en juego: <b>${esc(campo(estadoMd, "PIEZA"))}</b> con <a href="${esc(urlVer(campo(estadoMd, "PROMPT")))}">${esc(campo(estadoMd, "PROMPT"))}</a>${campo(estadoMd, "ARCHIVO") ? ` → <span class="mono">${esc(campo(estadoMd, "ARCHIVO"))}</span>` : ""}.${campo(estadoMd, "REPARA") ? ` Repara: ${esc(campo(estadoMd, "REPARA"))}.` : ""}</p>` : ""}
  ${(est.atrasos || []).length ? `<p class="aviso">Atrasadas: ${est.atrasos.map((a) => `${esc(a.etiqueta)} (+${a.atraso} min, ${esc(a.dueno)})`).join("; ")}.</p>` : ""}
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Pieza</th><th>Estado</th><th>Llegó</th><th>Se espera a las</th><th>Quién la escribe</th></tr></thead>
    <tbody>${piezasHoy.map((p) => `<tr><td>${esc(p.etiqueta)}</td><td>${esc(marcaPieza[p.situacion] || p.situacion)}</td><td class="mono">${esc(p.hora || "sin llegar")}</td><td class="mono">${esc(p.esperada)}</td><td class="gris">${esc(p.dueno)}</td></tr>`).join("") || `<tr><td colspan="5" class="gris">Sin vista del estado todavía.</td></tr>`}</tbody>
  </table></div>
  <h3>Botones de emergencia</h3>
  <p class="nota">Cada uno abre la página "Run workflow" de ese workflow en GitHub Actions. El texto al lado dice qué poner antes de apretar.</p>
  <div class="botones">${botonesEmergencia}</div>
  <h3>La auditoría de la mañana ${fechaAud ? `<span class="gris">(${ddmm(fechaAud)})</span>` : ""}</h3>
  ${audTxt ? `<p class="dato"><b>ESTADO:</b> ${inline(audEstado)} <a class="mas" href="${esc(urlVer(`bitacora/${fechaAud}-auditoria.md`))}">leer completa</a></p>
  ${puntosHoy.length ? `<ul class="hoy">${puntosHoy.map((p) => `<li><span class="chip">HOY</span>${inline(p)}</li>`).join("")}</ul>` : `<p class="nota">El triage de esa auditoría no dejó puntos HOY.</p>`}` : `<p class="nota">No hay auditoría en los últimos siete días.</p>`}
  ${img("caratula-hoy.jpg") || img("caratula-manana.jpg") ? `<h3>Carátulas</h3><div class="caratulas">
    ${img("caratula-hoy.jpg") ? `<figure><img src="${img("caratula-hoy.jpg")}" alt="Carátula de hoy" width="640" height="360"><figcaption><span class="rotulo">Salió hoy</span>la carátula que se publicó</figcaption></figure>` : ""}
    ${img("caratula-manana.jpg") ? `<figure><img src="${img("caratula-manana.jpg")}" alt="Carátula de la regla nueva" width="640" height="360"><figcaption><span class="rotulo cobre">Desde mañana</span>la regla nueva sobre la misma noticia (ejemplo)</figcaption></figure>` : ""}
  </div>` : ""}
  <h3>Lo que salió estos siete días</h3>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Día</th><th>Portada</th><th>Vueltas de corrección</th><th>Vistas del largo</th></tr></thead>
    <tbody>${semana7.map((d) => `<tr><td class="mono">${ddmm(d.fecha)}</td><td>${esc(d.titulo)}</td><td class="mono">${d.vueltas.length ? d.vueltas.map(([p, v]) => `${p.replace("_", " ")}: ${v.vuelta}`).join(" · ") : "sin veredictos"}</td><td class="num">${d.vistas ?? "-"}</td></tr>`).join("")}</tbody>
  </table></div>
  <p class="nota">Las vueltas cuentan cuántas veces Claude devolvió la pieza a GPT antes de aprobarla. Las vistas son las acumuladas al ${ddmm(metricas.fecha || FECHA)}; un largo del día lleva pocas horas al aire.</p>
  <h3>Commits de las últimas 24 horas <span class="gris">(${commits.length})</span></h3>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Hora</th><th>Commit</th><th>Quién y qué</th></tr></thead>
    <tbody>${commits.map((c) => `<tr><td class="mono">${esc(c.hora)}</td><td class="mono">${esc(c.hash)}</td><td>${esc(c.quien)}</td></tr>`).join("") || `<tr><td colspan="3" class="gris">Sin commits en 24 horas.</td></tr>`}</tbody>
  </table></div>
</section>`;

// ---------- 2. Semana --------------------------------------------------------
// Desde el 26-09 el tema de la Clave sale del barrido semanal (scripts/semana.js
// + prompts/tema-semana.md) y no del banco diario, que quedó congelado.
const DIR_SEMANA = "contenido/claves/semana";
const semanas = (() => { try { return fs.readdirSync(path.join(RAIZ, DIR_SEMANA)).filter((f) => /^\d{4}-W\d{2}\.json$/.test(f)).map((f) => f.replace(".json", "")).sort(); } catch { return []; } })();
const ultima = clave.ultimaSemana() || semanas.slice(-1)[0] || null;
const ranking = ultima ? (json(`${DIR_SEMANA}/${ultima}.json`, {}).ranking || []) : [];
const candidatos = ultima ? (clave.leerCandidatos(ultima) || []) : [];
const flujoDe = (slug) => `contenido/claves/flujo/${slug}`;
const candidatosHtml = candidatos.map((c) => {
  const armado = clave.temaDeCandidato(ultima, c.numero, { ahora: AHORA });
  if (!armado) return "";
  const yaHay = existe(`${flujoDe(armado.slug)}/tema.md`);
  return `<article class="candidato">
    <div class="exp-cab"><span class="chip">candidato ${c.numero}</span><span class="mono gris">puntaje ${esc(c.puntaje)} · días ${esc(c.dias.join(", "))}</span></div>
    <h4>${esc(c.concepto)}</h4>
    <p class="mono gris">slug: ${esc(armado.slug)}</p>
    <p><b>Historia hasta hoy.</b> ${esc(c.historia)}</p>
    <p><b>Qué enseñaría la Clave.</b> ${esc(c.ensenaria)}</p>
    <div class="botones">${yaHay
      ? boton(urlVer(`${flujoDe(armado.slug)}/tema.md`), "Elegido", 'ya tiene flujo abierto: <a href="#clave">verlo en el módulo Clave</a>', "hecho")
      : botonArchivo(armado.ruta, armado.contenido, "Elegir este tema", `crea <code>${esc(armado.ruta)}</code> ya escrito; al confirmar el commit, <code>estado-clave.yml</code> abre el flujo y GPT propone la idea`)}</div>
  </article>`;
}).join("");

const modSemana = `
<section id="semana" class="mod">
  <header class="mod-cab"><span class="eyebrow">Semana</span><h2>El tema de la Clave</h2>
    <p>Ranking de <span class="mono">scripts/semana.js</span> sobre los informes de la semana ${esc(ultima || "(sin semana)")}, y los tres candidatos que escribió <span class="mono">prompts/tema-semana.md</span>. El banco de temas diario quedó congelado el 26-09-2026.</p></header>
  <h3>Ranking de la semana</h3>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>#</th><th>Puntaje</th><th>Días</th><th>Tema</th><th>Titular más reciente</th></tr></thead>
    <tbody>${ranking.slice(0, 10).map((t) => `<tr><td class="mono">${t.puesto}</td><td class="mono">${String(t.puntaje).replace(".", ",")}</td><td class="mono">${t.dias.map(ddmm).join(", ")}</td><td>${esc(t.terminos.slice(0, 5).join(", "))}</td><td class="gris">${esc(t.titulares[t.titulares.length - 1]?.titular || "")}</td></tr>`).join("") || `<tr><td colspan="5" class="gris">Sin ranking: corre <span class="mono">node scripts/semana.js</span>.</td></tr>`}</tbody>
  </table></div>
  <h3>Los tres candidatos</h3>
  ${candidatosHtml || `<p class="nota">Todavía sin candidatos escritos: corre <span class="mono">node scripts/semana.js</span> y después la rutina del domingo (<span class="mono">prompts/tema-semana.md</span>).</p>`}
  <p class="nota">El botón abre GitHub con <span class="mono">tema.md</span> completo (concepto, titulares de origen, días de los informes, historia y qué enseñaría). Es el mismo texto que escribe <span class="mono">node scripts/clave.js elegir &lt;slug&gt; --candidato n</span>: lo arma la misma función. La hora del campo <span class="mono">ELEGIDO</span> es la de generación de esta página.</p>
</section>`;

// ---------- 3. Clave ---------------------------------------------------------
const slugsFlujo = (() => { try { return fs.readdirSync(path.join(RAIZ, "contenido/claves/flujo"), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort(); } catch { return []; } })();
const TURNO = {
  pautar: "Claude escribe la pauta", reparar_pauta: "Claude rehace la pauta con tu nota",
  pauta_lista: "te toca a ti", pauta_aprobada: "GPT investiga con fuentes",
  validar_investigacion: "Claude valida la investigación", reparar_investigacion: "GPT rehace la investigación",
  investigacion_lista: "GPT escribe la entrega",
  tema_elegido: "GPT escribe la idea", validar_idea: "Claude valida la idea", reparar_idea: "GPT rehace la idea",
  idea_lista: "te toca a ti", idea_aprobada: "GPT escribe la entrega", validar_entrega: "Claude valida la entrega",
  reparar_entrega: "GPT rehace la entrega", entrega_lista: "GPT escribe el guion", validar_guion: "Claude valida el guion",
  reparar_guion: "GPT rehace el guion", aprobada: "Actions renderiza y sube", videos_listos: "cerrado",
  bloqueado_humano: "te toca a ti: está bloqueado",
};
// La pauta se muestra RENDERIZADA en la página: Santiago la aprueba desde el
// teléfono y no puede depender de abrir GitHub para leerla. Es un markdown
// acotado y conocido (el que escribe prompts/pauta-clave.md): encabezados,
// párrafos y listas. Nada de HTML crudo del archivo: todo pasa por esc().
// Va línea por línea y no por bloques separados con línea en blanco: una pauta
// real trae el encabezado pegado a su texto y las listas pegadas a su párrafo,
// y con el corte por bloques esos encabezados salían como texto con almohadillas
// a la vista (visto en la prueba del 27-09).
const mdHtml = (txt) => {
  const salida = [];
  let parrafo = [], lista = null;
  const cerrarParrafo = () => { if (parrafo.length) { salida.push(`<p>${parrafo.map(inline).join("<br>")}</p>`); parrafo = []; } };
  const cerrarLista = () => { if (lista) { salida.push(`<${lista.tag}>${lista.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${lista.tag}>`); lista = null; } };
  const cerrar = () => { cerrarParrafo(); cerrarLista(); };
  for (const linea of txt.replace(/\r/g, "").split("\n")) {
    if (!linea.trim()) { cerrar(); continue; }
    const enc = linea.match(/^(#{1,6})\s+(.+)$/);
    if (enc) { cerrar(); const n = Math.min(6, enc[1].length + 2); salida.push(`<h${n}>${inline(enc[2])}</h${n}>`); continue; }
    const item = linea.match(/^\s*(?:[-*]|\d+[.)])\s+(.+)$/);
    if (item) {
      const tag = /^\s*[-*]\s/.test(linea) ? "ul" : "ol";
      cerrarParrafo();
      if (lista && lista.tag !== tag) cerrarLista();
      lista = lista || { tag, items: [] };
      lista.items.push(item[1]);
      continue;
    }
    cerrarLista();
    parrafo.push(linea.trim());
  }
  cerrar();
  return salida.join("");
};
const flujosHtml = slugsFlujo.map((slug) => {
  const e = json(`contenido/estado/clave-${slug}.json`, null) || {};
  const etapa = e.etapa || "sin vista";
  const camino = e.camino || clave.caminoDe(slug, RAIZ);
  const base = flujoDe(slug);
  // la pieza que Santiago aprueba, distinta en cada camino
  const pieza = camino === "pauta" ? "pauta" : "idea";
  const rutaPieza = `${base}/${pieza}.md`;
  const rutaAprob = `${base}/aprobacion.md`;
  const decide = etapa === "pauta_lista" || etapa === "idea_lista";
  const fechaMiercoles = clave.proximoMiercoles(FECHA);
  const botones = decide ? [
    botonArchivo(rutaAprob, clave.contenidoAprobacion(fechaMiercoles, AHORA, camino), `Aprobar ${pieza}`, `fija la producción para el <b>${esc(ddmm(fechaMiercoles))}</b>, el próximo miércoles${camino === "pauta" ? ", y suelta a GPT a investigar" : ""}`),
    botonArchivo(rutaAprob, clave.contenidoCambio(`ESCRIBE AQUÍ LA NOTA (qué hay que cambiar en la ${pieza})`, AHORA, camino), "Pedir cambios", "reemplaza <code>ESCRIBE AQUÍ LA NOTA</code> por lo que hay que cambiar antes de confirmar"),
    botonArchivo(rutaAprob, clave.contenidoAprobacion("ESCRIBE-AQUI-LA-FECHA-AAAA-MM-DD", AHORA, camino), "Fijar fecha", "igual que aprobar, pero tú pones la fecha de producción en las dos líneas que la llevan"),
  ].join("") : "";
  const textoPauta = camino === "pauta" && etapa === "pauta_lista" ? leer(rutaPieza) : "";
  return `<article class="flujo-clave">
    <div class="exp-cab"><span class="chip${decide ? " espera" : ""}">${esc(etapa)}</span><span class="mono gris">camino ${esc(camino)} · vuelta ${e.vuelta ?? 0}${e.fecha_produccion ? ` · sale el ${ddmm(e.fecha_produccion)}` : ""}</span></div>
    <h3>${esc(e.concepto || slug)}</h3>
    <p class="mono gris">${esc(slug)}</p>
    <p><b>Turno:</b> ${esc(TURNO[etapa] || e.turno || "sin turno")}${TURNO[etapa] && /[:(]/.test(e.turno || "") ? ` <span class="gris">(${esc(e.turno)})</span>` : ""}.</p>
    <p class="dato">Archivos:
      <a href="${esc(urlVer(`${base}/tema.md`))}">tema.md</a>${existe(rutaPieza) ? ` · <a href="${esc(urlVer(rutaPieza))}">${pieza}.md</a>` : ` · <span class="gris">${pieza}.md todavía no existe</span>`}${existe(`${base}/investigacion.md`) ? ` · <a href="${esc(urlVer(`${base}/investigacion.md`))}">investigacion.md</a>` : ""}${existe(rutaAprob) ? ` · <a href="${esc(urlVer(rutaAprob))}">aprobacion.md</a>` : ""} · <a href="${esc(urlVer(`contenido/estado/clave-${slug}.md`))}">estado</a></p>
    ${textoPauta ? `<div class="pauta">${mdHtml(textoPauta)}</div>` : ""}
    ${decide ? `<p class="nota">La ${pieza} espera tu decisión${camino === "pauta" ? " y GPT no trabaja hasta que la apruebes" : ""}. Cada botón abre GitHub con <span class="mono">aprobacion.md</span> escrito; al confirmar el commit, <span class="mono">estado-clave.yml</span> mueve la etapa.</p><div class="botones">${botones}</div>`
      : `<p class="nota">Los botones de decisión aparecen cuando la etapa es <span class="mono">${camino === "pauta" ? "pauta_lista" : "idea_lista"}</span>, que es el único momento en que la pelota es tuya.</p>`}
  </article>`;
}).join("");

const modClave = `
<section id="clave" class="mod">
  <header class="mod-cab"><span class="eyebrow">Clave</span><h2>Los flujos abiertos</h2>
    <p>Una Clave por tema, con flujo propio (CLAVE 4). Desde el 27-09-2026 hay dos caminos, y cada flujo dice el suyo: en el camino <b>pauta</b> Claude escribe la pauta, <b>tú la apruebas</b> y recién entonces GPT investiga, escribe la entrega y el guion; en el camino <b>idea</b>, el anterior, GPT escribía la idea y tú aprobabas esa. Vista de <span class="mono">scripts/estado-clave.js</span>.</p></header>
  ${flujosHtml || `<p class="nota">Sin flujos de Clave abiertos. Se abre uno eligiendo un tema en el módulo <a href="#semana">Semana</a>.</p>`}
  <div class="botones">${boton(urlFlujo("estado-clave.yml"), "Recalcular el estado de la Clave", "Run workflow sin campos, si la vista quedó vieja")}</div>
</section>`;

// ---------- 4. Medir ---------------------------------------------------------
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
// impresiones y CTR: el json del día los trae desde el 20-09; si no, el archivo
// acumulado que escribe scripts/impresiones.js.
const imp = metricas.impresiones || json("bitacora/metricas/impresiones.json", {});
const impVideos = Object.entries(imp.videos || {});
const impTotal = impVideos.reduce((s, [, x]) => s + (x.impresiones || 0), 0);
const clicsTotal = impVideos.reduce((s, [, x]) => s + (x.clics || 0), 0);
const impTop = impVideos.filter(([id]) => (vids[id]?.durSeg ?? 0) > 75).sort((a, b) => b[1].impresiones - a[1].impresiones).slice(0, 8);
const impDias = Object.entries(imp.dias || {}).sort((a, b) => a[0].localeCompare(b[0])).slice(-10);

const modMedir = `
<section id="medir" class="mod">
  <header class="mod-cab"><span class="eyebrow">Medir</span><h2>Qué resultó</h2><p>Analytics de los últimos 30 días, medido el ${ddmm(metricas.fecha || FECHA)}. La meta son 4.000 horas de largos antes del 01-02-2027.</p></header>
  <div class="cifras">
    <div class="cifra"><span class="n">${(minLargos / 60).toFixed(1)}</span><span class="q">horas vistas en largos, 30 días</span></div>
    <div class="cifra"><span class="n">${pesoVistas ? (pesoPct / pesoVistas).toFixed(1) : "-"}%</span><span class="q">retención media ponderada de los largos</span></div>
    <div class="cifra"><span class="n">${metricas.canal?.suscriptores ?? "-"}</span><span class="q">suscriptores</span></div>
    <div class="cifra"><span class="n">${Object.values(vids).reduce((s, v) => s + (v.vistas || 0), 0)}</span><span class="q">vistas totales, suma por video</span></div>
    <div class="cifra"><span class="n">${impTotal}</span><span class="q">impresiones, ${imp.ventanaDias || 30} días</span></div>
    <div class="cifra"><span class="n">${impTotal ? (100 * clicsTotal / impTotal).toFixed(2) : "-"}%</span><span class="q">CTR del canal (${clicsTotal} clics)</span></div>
  </div>
  <h3>De dónde vienen los minutos de los largos</h3>
  <div class="barras">${canalFuentes.map(([s, x]) => `<div class="barra-fila"><span class="etq">${esc(nom(s))}</span><span class="pista"><span class="relleno" style="width:${(100 * x.minutos / maxMin).toFixed(0)}%"></span></span><span class="mono val">${x.minutos} min · ${x.vistas} vistas</span></div>`).join("")}</div>
  <h3>Impresiones y CTR por largo <span class="gris">(los ocho más mostrados)</span></h3>
  <p class="nota">Impresión es una miniatura mostrada en YouTube; CTR es qué porcentaje de esas veces alguien entró. Es la métrica que juzga la carátula y el título, no el contenido.</p>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Video</th><th>Impresiones</th><th>Clics</th><th>CTR</th></tr></thead>
    <tbody>${impTop.map(([id, x]) => `<tr><td>${esc(vids[id]?.titulo || id)}</td><td class="num">${x.impresiones}</td><td class="num">${x.clics}</td><td class="num">${(x.ctr ?? 0).toFixed(2)}%</td></tr>`).join("") || `<tr><td colspan="4" class="gris">Sin impresiones todavía.</td></tr>`}</tbody>
  </table></div>
  ${impDias.length ? `<h3>Últimos diez días</h3><div class="tabla-envoltura"><table>
    <thead><tr><th>Día</th><th>Impresiones</th><th>CTR</th></tr></thead>
    <tbody>${impDias.map(([f, x]) => `<tr><td class="mono">${ddmm(f)}</td><td class="num">${x.impresiones}</td><td class="num">${(x.ctr ?? 0).toFixed(2)}%</td></tr>`).join("")}</tbody>
  </table></div>` : ""}
  <h3>Dónde se va la gente</h3>
  <p class="nota">Cada curva es la audiencia que sigue viendo a lo largo del video (de 0 a 100% de su duración). La línea vertical marca el 5%, unos 30 a 40 segundos. Solo existe para largos con unas 20 vistas o más.</p>
  <div class="curvas">${curvas.map(([id, x]) => { const top = Object.entries(x.fuentes).sort((a, b) => b[1] - a[1])[0]; const c = x.curva; return `<div class="curva-tarjeta"><div class="curva-titulo">${esc(vids[id]?.titulo || id)}</div>${sparkline(c.serie)}<div class="curva-datos mono">${ret[id]?.vistas ?? "-"} vistas · ${top ? `${esc(nom(top[0]))} ${Math.round(100 * top[1] / (ret[id]?.vistas || 1))}%` : ""}<br>al 5%: <b>${c.p05}%</b> · al 25%: ${c.p25}% · al final: ${c.p75}%<br>mayor caída: segundo ${c.caidaMayor.segundo} (${c.caidaMayor.puntos} puntos)</div></div>`; }).join("") || "<p class='nota'>Sin curvas todavía.</p>"}</div>
</section>`;

// ---------- 5. Experimentos --------------------------------------------------
const modExp = `
<section id="experimentos" class="mod">
  <header class="mod-cab"><span class="eyebrow">Experimentos</span><h2>Qué estamos probando</h2><p>Un cambio a la vez por métrica, dos semanas, veredicto con números (regla 26). Registro: <a href="${esc(urlVer("bitacora/experimentos.json"))}">bitacora/experimentos.json</a>.</p></header>
  <div class="exp-lista">${experimentos.map((e) => { const t = diasEntre(e.desde, FECHA); const faltan = Math.max(0, (e.dias || 14) - t); const fin = e.estado !== "en_curso"; return `<article class="exp ${esc(e.estado)}"><div class="exp-cab"><span class="chip ${esc(e.estado)}">${fin ? esc(e.estado) : t < 0 ? `empieza en ${-t} d` : faltan ? `día ${t} de ${e.dias || 14}` : "listo para juzgar"}</span><span class="mono gris">desde ${ddmm(e.desde)}</span></div><h3>${esc(e.titulo)}</h3><p>${esc(e.hipotesis)}</p><dl><dt>Cambió</dt><dd class="mono">${esc(e.cambio)}</dd><dt>Lo juzga</dt><dd>${esc(e.metrica)}</dd><dt>Control</dt><dd>${esc(e.control)}</dd>${e.veredicto ? `<dt>Veredicto</dt><dd>${esc(e.veredicto)}</dd>` : ""}</dl></article>`; }).join("")}</div>
</section>`;

// ---------- 6. Prompts -------------------------------------------------------
const audits = dias7.map((f) => ({ fecha: f, txt: leer(`bitacora/${f}-auditoria.md`) })).filter((a) => a.txt);
const propuestas = (txt) => { const m = txt.match(/## Propuestas([\s\S]*?)## Triage/); return m ? m[1].split("\n").filter((l) => /^\d+\./.test(l.trim())) : []; };
const lectores = {};
for (const f of cronograma.fases || []) for (const i of f.items || []) for (const p of (i.que || "").match(/prompts\/[a-z-]+\.md/g) || []) (lectores[p] = lectores[p] || new Set()).add(i.quien);
const prompts = fs.readdirSync(path.join(RAIZ, "prompts")).filter((f) => f.endsWith(".md") && !/README|CALIDAD/.test(f)).map((f) => {
  const p = `prompts/${f}`;
  const pieza = Object.entries(PIEZAS).find(([, v]) => v === p)?.[0];
  const vs = pieza ? dias7.map((d) => veredicto(d, pieza)).filter(Boolean) : [];
  const vueltas = pieza ? vs.reduce((s, v) => s + v.vuelta, 0) : null;
  const dias = audits.filter((a) => propuestas(a.txt).some((l) => l.includes(f)));
  const ultimaProp = dias[0] ? propuestas(dias[0].txt).find((l) => l.includes(f)) : "";
  return { p, archivo: f, lineas: leer(p).split("\n").length, editado: git(`log -1 --format=%ad --date=short -- ${p}`), lee: [...(lectores[p] || [])].join(", ") || "(nadie en el cronograma)", vueltas, ultimoV: vs[0] || null, diasAud: dias.length, ultima: unaLinea(ultimaProp || "").replace(/^\d+\.\s*/, "") };
}).sort((a, b) => (b.vueltas ?? -1) - (a.vueltas ?? -1) || b.diasAud - a.diasAud);

const modPrompts = `
<section id="prompts" class="mod">
  <header class="mod-cab"><span class="eyebrow">Prompts</span><h2>Qué prompt cuesta, y por qué</h2><p>Vueltas de corrección de los últimos siete días (lo que Claude devolvió a GPT), el último hallazgo del validador y en cuántas auditorías apareció una propuesta sobre ese archivo. Lo que se repite es lo que hay que cambiar.</p></header>
  <div class="tabla-envoltura"><table>
    <thead><tr><th>Prompt</th><th>Lo lee</th><th>Vueltas, 7 días</th><th>Último veredicto del validador</th><th>Auditorías, 7 días</th><th>Última propuesta de la auditoría</th><th>Editado</th><th></th></tr></thead>
    <tbody>${prompts.map((x) => `<tr>
      <td class="mono">${esc(x.archivo)}<br><span class="gris">${x.lineas} líneas</span></td>
      <td>${esc(x.lee)}</td>
      <td class="num">${x.vueltas ?? "-"}</td>
      <td class="gris">${x.ultimoV ? `<b>${esc(x.ultimoV.veredicto)}</b> vuelta ${x.ultimoV.vuelta} (${ddmm(x.ultimoV.fecha)})${x.ultimoV.observacion ? `: ${esc(corta(x.ultimoV.observacion, 200))}` : ""}` : "-"}</td>
      <td class="num">${x.diasAud || "-"}</td>
      <td class="gris">${esc(corta(x.ultima, 220)) || "-"}</td>
      <td class="mono">${ddmm(x.editado)}</td>
      <td>${boton(urlEditar(x.p), "Editar en GitHub", "")}</td>
    </tr>`).join("")}</tbody>
  </table></div>
  <p class="nota">El botón abre el editor de GitHub en ese archivo: se corrige desde el teléfono y el commit queda con tu nombre.</p>
</section>`;

// ---------- 7. Flujos y rutinas ---------------------------------------------
// Las dos tablas de bitacora/rutinas.md se renderizan tal cual: ese archivo es
// el inventario a mano que evita pagar 75 KB por llamada a la API de rutinas.
const tablasDeMarkdown = (txt) => {
  const salidas = []; let titulo = "", actual = null;
  for (const linea of txt.split("\n")) {
    const h = linea.match(/^##\s+(.+)$/);
    if (h) { titulo = h[1].trim(); actual = null; continue; }
    if (!/^\s*\|/.test(linea)) { actual = null; continue; }
    if (/^\s*\|[\s:|-]+\|?\s*$/.test(linea)) continue; // la línea separadora
    const celdas = linea.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
    if (!actual) { actual = { titulo, cabecera: celdas, filas: [] }; salidas.push(actual); }
    else actual.filas.push(celdas);
  }
  return salidas;
};
const celda = (c) => { const m = c.match(/^`([a-z0-9-]+\.yml)`$/); return m ? `<a class="mono" href="${esc(urlFlujo(m[1]))}">${esc(m[1])}</a>` : inline(c); };
const tablaHtml = (t) => `<h3>${esc(t.titulo)}</h3><div class="tabla-envoltura"><table>
  <thead><tr>${t.cabecera.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>
  <tbody>${t.filas.map((f) => `<tr>${f.map((c) => `<td>${celda(c)}</td>`).join("")}</tr>`).join("")}</tbody>
</table></div>`;
const rutinas = tablasDeMarkdown(leer("bitacora/rutinas.md"));

const modFlujos = `
<section id="flujos" class="mod">
  <header class="mod-cab"><span class="eyebrow">Flujos y rutinas</span><h2>Quién hace qué, con qué prompt y desde dónde se edita</h2>
    <p>La cadena sale de <a href="${esc(urlVer("bitacora/cronograma.json"))}">bitacora/cronograma.json</a> (actualizado ${ddmm(cronograma.actualizado || "")}); el inventario de rutinas y workflows, de <a href="${esc(urlVer("bitacora/rutinas.md"))}">bitacora/rutinas.md</a>. Quien crea, cambia o apaga una rutina edita esa tabla en el mismo commit.</p></header>
  ${(cronograma.fases || []).map((f) => `<h3>${esc(f.nombre)}</h3><ol class="flujo">${(f.items || []).map((i) => `<li><span class="mono hora">${esc(i.hora)}</span><span class="chip tipo-${esc(i.tipo)}">${esc(i.tipo)}</span><b>${esc(i.quien)}</b><span class="gris">${esc(corta(i.que || "", 200))}</span></li>`).join("")}</ol>`).join("")}
  ${rutinas.map(tablaHtml).join("")}
  <div class="botones">${boton(urlEditar("bitacora/rutinas.md"), "Editar el inventario en GitHub", "cuando una rutina cambie de hora, de modelo o se apague")}</div>
</section>`;

// ---------- la página --------------------------------------------------------
const commitHash = git("rev-parse --short HEAD") || "sin git";
// La Bandeja va primera y con contador: el número en la pestaña y en el título
// de la página es lo que se ve en la lista de pestañas del teléfono sin abrir
// nada.
const NAV = [["bandeja", "Bandeja", itemsBandeja.length], ["hoy", "Hoy"], ["semana", "Semana"], ["clave", "Clave"], ["medir", "Medir"], ["experimentos", "Experimentos"], ["prompts", "Prompts"], ["flujos", "Flujos y rutinas"]];
const html = `<!doctype html>
<html lang="es">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Taller${itemsBandeja.length ? ` (${itemsBandeja.length})` : ""} · Entender Chile</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
  :root { --papel:#F2F2EF; --alto:#FCFCFA; --tinta:#17191C; --gris:#6B6E6A; --linea:#DDDDD5; --patina:#2F7263; --patina-suave:#E4EEEA; --cobre:#D08A5B; --ambar:#F0E3C6;
    --serif:'Fraunces',Georgia,'Times New Roman',serif; --sans:'IBM Plex Sans','Helvetica Neue',Arial,sans-serif; --mono:'IBM Plex Mono','Courier New',monospace; }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --papel:#15181A; --alto:#1F2326; --tinta:#EDE6DA; --gris:#A6A399; --linea:#2E3336; --patina:#5FA48F; --patina-suave:#1E2E2A; --cobre:#E0A175; --ambar:#3A3222; } }
  :root[data-theme="dark"] { --papel:#15181A; --alto:#1F2326; --tinta:#EDE6DA; --gris:#A6A399; --linea:#2E3336; --patina:#5FA48F; --patina-suave:#1E2E2A; --cobre:#E0A175; --ambar:#3A3222; }
  * { box-sizing:border-box; }
  html { background:var(--papel); }
  body { background:var(--papel); color:var(--tinta); font-family:var(--sans); font-size:15px; line-height:1.5; padding-inline:16px; padding-block:20px 80px; max-width:1180px; margin:0 auto; overflow-wrap:break-word; }
  @media (min-width:720px) { body { padding-inline:24px; } }
  h1,h2,h3,h4 { font-family:var(--serif); font-weight:600; margin:0; text-wrap:balance; }
  h1 { font-size:clamp(28px,4.5vw,44px); line-height:1.05; } h2 { font-size:clamp(21px,3vw,30px); line-height:1.15; } h3 { font-size:19px; margin-top:26px; } h4 { font-size:17px; }
  p { margin:0; max-width:74ch; } a { color:var(--patina); }
  .eyebrow { font-family:var(--mono); font-size:12px; letter-spacing:.22em; text-transform:uppercase; color:var(--patina); }
  .mono, code { font-family:var(--mono); font-size:13px; } .gris { color:var(--gris); } .num { font-family:var(--mono); text-align:right; font-variant-numeric:tabular-nums; }
  .nota { color:var(--gris); font-size:14px; margin-top:10px; } .dato { font-size:14px; margin-top:10px; } .mas { font-size:13px; white-space:nowrap; }
  .cab { display:grid; gap:10px; padding-bottom:18px; } .cab p { color:var(--gris); } .sello { font-family:var(--mono); font-size:12px; color:var(--gris); }
  nav.tabs { position:sticky; top:0; z-index:3; background:var(--papel); border-block:1px solid var(--linea); display:flex; gap:4px; overflow-x:auto; padding-block:8px; margin-bottom:8px; }
  nav.tabs a { flex:0 0 auto; font:500 14px var(--sans); color:var(--tinta); text-decoration:none; padding:8px 12px; border-radius:2px; } nav.tabs a:hover, nav.tabs a:focus-visible { background:var(--patina-suave); outline:none; }
  .mod { padding-block:30px; border-bottom:1px solid var(--linea); scroll-margin-top:60px; } .mod-cab { display:grid; gap:8px; margin-bottom:16px; } .mod-cab p { color:var(--gris); }
  .caratulas { display:flex; flex-wrap:wrap; gap:18px; margin:14px 0 22px; } .caratulas figure { margin:0; width:420px; max-width:100%; display:grid; gap:8px; } .caratulas img { width:100%; height:auto; aspect-ratio:16/9; display:block; box-shadow:0 2px 10px rgba(0,0,0,.18); }
  .caratulas figcaption { font-size:13px; color:var(--gris); display:grid; gap:2px; } .rotulo { font-family:var(--mono); font-size:11px; letter-spacing:.16em; text-transform:uppercase; color:var(--patina); } .rotulo.cobre { color:var(--cobre); }
  .tabla-envoltura { overflow-x:auto; margin-top:10px; -webkit-overflow-scrolling:touch; } table { border-collapse:collapse; width:100%; font-size:14px; } th, td { text-align:left; padding:9px 10px; border-bottom:1px solid var(--linea); vertical-align:top; } th { font-family:var(--mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--gris); font-weight:500; white-space:nowrap; }
  .cifras { display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:12px; margin-bottom:8px; } .cifra { background:var(--alto); border:1px solid var(--linea); padding:16px 18px; display:grid; gap:4px; } .cifra .n { font-family:var(--serif); font-size:36px; line-height:1; font-variant-numeric:tabular-nums; } .cifra .q { font-size:13px; color:var(--gris); }
  .barras { display:grid; gap:8px; max-width:720px; } .barra-fila { display:grid; grid-template-columns:150px 1fr auto; gap:12px; align-items:center; font-size:14px; } .pista { height:12px; background:var(--patina-suave); } .relleno { display:block; height:100%; background:var(--patina); } .val { color:var(--gris); white-space:nowrap; }
  .curvas { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; margin-top:12px; } .curva-tarjeta { background:var(--alto); border:1px solid var(--linea); padding:14px; display:grid; gap:8px; } .curva-titulo { font-size:14px; font-weight:500; line-height:1.3; } .curva-tarjeta svg { width:100%; height:auto; max-width:100%; } .curva { fill:none; stroke:var(--patina); stroke-width:2; } .guia { stroke:var(--linea); stroke-width:1; stroke-dasharray:3 3; } .curva-datos { color:var(--gris); line-height:1.5; }
  .exp-lista { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:14px; } .exp { background:var(--alto); border:1px solid var(--linea); border-left:4px solid var(--patina); padding:16px 18px; display:grid; gap:10px; } .exp.cancelado { border-left-color:var(--gris); } .exp.cerrado { border-left-color:var(--cobre); } .exp h3 { margin:0; } .exp-cab { display:flex; justify-content:space-between; gap:10px; align-items:center; flex-wrap:wrap; }
  .exp dl { display:grid; grid-template-columns:auto 1fr; gap:4px 12px; font-size:13px; margin:0; } .exp dt { color:var(--gris); font-family:var(--mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; padding-top:2px; } .exp dd { margin:0; }
  .candidato, .flujo-clave, .item-bandeja { background:var(--alto); border:1px solid var(--linea); border-left:4px solid var(--patina); padding:16px 18px; display:grid; gap:10px; margin-top:14px; } .candidato p, .flujo-clave p, .item-bandeja p { font-size:14px; }
  .item-bandeja { border-left-color:var(--cobre); } .item-bandeja.clave, .item-bandeja.bloqueo { border-left-width:6px; } .item-bandeja h3 { margin:0; font-size:18px; }
  .badge { display:inline-block; font-family:var(--mono); font-size:14px; letter-spacing:0; vertical-align:middle; background:var(--cobre); color:var(--papel); padding:1px 9px; border-radius:999px; }
  nav.tabs a .badge { font-size:12px; padding:0 7px; }
  .pauta { border-top:1px solid var(--linea); border-bottom:1px solid var(--linea); padding:6px 0 12px; } .pauta h3 { font-size:17px; margin-top:18px; } .pauta h4, .pauta h5, .pauta h6 { font-size:15px; margin-top:16px; } .pauta p, .pauta li { font-size:14px; } .pauta ul, .pauta ol { margin:8px 0; padding-left:22px; } .pauta li { margin-bottom:4px; }
  .chip { display:inline-block; font-family:var(--mono); font-size:11px; letter-spacing:.1em; text-transform:uppercase; padding:3px 8px; background:var(--patina-suave); color:var(--patina); } .chip.cancelado { background:var(--linea); color:var(--gris); } .chip.cerrado, .chip.espera { background:var(--ambar); color:var(--tinta); }
  .chip.tipo-gpt { background:var(--ambar); color:var(--tinta); } .chip.tipo-actions { background:var(--linea); color:var(--tinta); } .chip.tipo-senal { background:var(--linea); color:var(--gris); }
  .botones { display:grid; gap:10px; margin-top:12px; } .boton { display:grid; gap:4px; } .btn { display:inline-block; justify-self:start; font:500 14px var(--sans); color:var(--patina); background:transparent; border:1px solid var(--patina); padding:8px 14px; text-decoration:none; } .btn:hover, .btn:focus-visible { background:var(--patina-suave); outline:none; }
  .btn.primario { background:var(--patina); color:var(--papel); } .btn.primario:hover, .btn.primario:focus-visible { background:var(--tinta); border-color:var(--tinta); } .btn.hecho { color:var(--gris); border-color:var(--linea); }
  .ayuda { font-size:13px; color:var(--gris); max-width:70ch; }
  details summary { cursor:pointer; color:var(--patina); } pre { font-family:var(--mono); font-size:12px; white-space:pre-wrap; background:var(--papel); border:1px solid var(--linea); padding:10px; margin:6px 0 0; overflow-x:auto; color:var(--tinta); }
  .aviso { background:var(--ambar); color:var(--tinta); border-left:4px solid var(--cobre); padding:10px 14px; font-size:14px; margin-top:12px; }
  .hoy { list-style:none; padding:0; margin:12px 0 0; display:grid; gap:10px; font-size:14px; } .hoy li { display:grid; grid-template-columns:auto 1fr; gap:10px; align-items:baseline; }
  .flujo { list-style:none; padding:0; margin:0 0 8px; display:grid; gap:8px; } .flujo li { display:grid; grid-template-columns:130px auto 1fr; gap:6px 12px; align-items:baseline; font-size:14px; padding:8px 0; border-bottom:1px solid var(--linea); } .flujo li .gris { grid-column:1/-1; font-size:13px; } .hora { color:var(--gris); white-space:nowrap; }
  @media (max-width:600px) { .barra-fila { grid-template-columns:1fr; gap:4px; } .flujo li { grid-template-columns:1fr; } .hoy li { grid-template-columns:1fr; } }
</style>
<header class="cab">
  <p class="sello">Generado el ${ddmm(AHORA)} ${AHORA.slice(11)} (hora de Chile) desde el commit ${esc(commitHash)}</p>
  <span class="eyebrow">Entender Chile · fase 2, ocho módulos</span>
  <h1>Taller</h1>
  <p>Una sola página para ver qué espera tu decisión, mirar el día, elegir el tema de la semana, aprobar la pauta de la Clave, medir qué resultó y arreglar el prompt que lo produce. Los botones abren GitHub con el archivo ya escrito: tú solo confirmas el commit, y ese push mueve la máquina. El repo es la única verdad; esto es una vista.</p>
</header>
<nav class="tabs" aria-label="Módulos">${NAV.map(([id, t, n]) => `<a href="#${id}">${t}${n ? ` <span class="badge">${n}</span>` : ""}</a>`).join("")}</nav>
${modBandeja}${modHoy}${modSemana}${modClave}${modMedir}${modExp}${modPrompts}${modFlujos}
</html>
`;
fs.writeFileSync(path.join(RAIZ, salida), html);
const cuentaBotones = (html.match(/class="btn/g) || []).length;
console.log(`${salida}: ${(html.length / 1024).toFixed(0)} KB · ${itemsBandeja.length} en la bandeja · estado ${fechaEstado} (${campo(estadoMd, "ETAPA") || "sin vista"}) · ${commits.length} commits 24 h · ${candidatos.length} candidatos de ${ultima || "sin semana"} · ${slugsFlujo.length} flujos de Clave · ${curvas.length} curvas · ${experimentos.length} experimentos · ${prompts.length} prompts · ${rutinas.reduce((s, t) => s + t.filas.length, 0)} filas de rutinas · ${cuentaBotones} botones`);
