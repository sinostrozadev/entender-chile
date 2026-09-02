(function () {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const carpeta = (r) => { const i = r.lastIndexOf("/"); return i < 0 ? "raíz" : r.slice(0, i); };
  const hoja = (r) => r.slice(r.lastIndexOf("/") + 1);
  const clave = (r) => r.replace(/[^A-Za-z0-9_-]/g, "_");

  // ARCHIVOS viene del bloque de datos. Cada uno: {r: ruta, t: texto}.
  const porRuta = new Map(ARCHIVOS.map((a) => [a.r, a]));
  const ORDEN = ["prompts", "estrategia", "ideas", "bitacora", "docs", "docs/auditoria-api", "contenido/casos", "raíz"];
  const grupos = new Map();
  for (const a of ARCHIVOS) {
    const c = carpeta(a.r);
    if (!grupos.has(c)) grupos.set(c, []);
    grupos.get(c).push(a);
  }
  const carpetas = [...grupos.keys()].sort((a, b) => {
    const ia = ORDEN.indexOf(a), ib = ORDEN.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || (a < b ? -1 : 1);
  });

  const st = {
    abierto: null,      // ruta
    modo: "ver",        // ver | editar | diff
    edicion: "",        // texto en el editor
    abiertas: new Set(carpetas.slice(0, 3)),
    filtro: "",
    borradores: new Map(),  // ruta -> {texto, ts}
    turnos: [],         // conversación con Claude
    adjuntos: new Set(),
    pidiendo: false,
    db: null,
    sample: null,
  };

  // ═══════════ diff por líneas (LCS) ═══════════
  function diffLineas(A, B) {
    const a = A.split("\n"), b = B.split("\n");
    // recorta prefijo y sufijo iguales: el LCS solo trabaja sobre lo que cambió
    let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
    let s = 0; while (s < a.length - p && s < b.length - p && a[a.length - 1 - s] === b[b.length - 1 - s]) s++;
    const ac = a.slice(p, a.length - s), bc = b.slice(p, b.length - s);
    const n = ac.length, m = bc.length;
    const salida = [];
    for (let i = 0; i < p; i++) salida.push(["=", a[i], i + 1]);
    if (n * m > 4000000) {           // archivos enormes: sin LCS, bloque contra bloque
      for (const l of ac) salida.push(["-", l]);
      for (const l of bc) salida.push(["+", l]);
    } else {
      const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
      for (let i = n - 1; i >= 0; i--)
        for (let j = m - 1; j >= 0; j--)
          L[i][j] = ac[i] === bc[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
      let i = 0, j = 0;
      while (i < n && j < m) {
        if (ac[i] === bc[j]) { salida.push(["=", ac[i], p + i + 1]); i++; j++; }
        else if (L[i + 1][j] >= L[i][j + 1]) { salida.push(["-", ac[i]]); i++; }
        else { salida.push(["+", bc[j]]); j++; }
      }
      while (i < n) salida.push(["-", ac[i++]]);
      while (j < m) salida.push(["+", bc[j++]]);
    }
    for (let i = 0; i < s; i++) salida.push(["=", a[a.length - s + i], a.length - s + i + 1]);
    return salida;
  }

  function pintarDiff(A, B) {
    const d = diffLineas(A, B);
    const cambios = d.filter((x) => x[0] !== "=").length;
    if (!cambios) return '<div class="vacio"><b>Sin cambios</b><div>El texto es idéntico al original.</div></div>';
    // muestra 3 líneas de contexto alrededor de cada cambio
    const cerca = new Set();
    d.forEach((x, k) => { if (x[0] !== "=") for (let o = -3; o <= 3; o++) cerca.add(k + o); });
    let html = "", hueco = false;
    d.forEach((x, k) => {
      if (!cerca.has(k)) { hueco = true; return; }
      if (hueco) { html += '<div class="salto">···</div>'; hueco = false; }
      const cls = x[0] === "+" ? "a" : x[0] === "-" ? "b" : "ctx";
      const marca = x[0] === "+" ? "+ " : x[0] === "-" ? "- " : "  ";
      html += '<div class="' + cls + '">' + esc(marca + x[1]) + "</div>";
    });
    return '<div class="dif">' + html + "</div>";
  }

  // ═══════════ árbol ═══════════
  function coincide(a) {
    if (!st.filtro) return true;
    const f = st.filtro.toLowerCase();
    return a.r.toLowerCase().includes(f) || a.t.toLowerCase().includes(f);
  }
  function pintarArbol() {
    let html = "";
    for (const c of carpetas) {
      const items = grupos.get(c).filter(coincide);
      if (!items.length) continue;
      const abierta = st.abiertas.has(c) || !!st.filtro;
      html += '<button class="carpeta" data-carpeta="' + esc(c) + '" aria-expanded="' + abierta + '">' +
        '<svg class="tri" width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6l4 4 4-4"/></svg>' +
        esc(c) + '<span class="cuenta">' + items.length + "</span></button>";
      if (!abierta) continue;
      for (const a of items) {
        const tiene = st.borradores.has(a.r);
        html += '<button class="arch" data-ruta="' + esc(a.r) + '"' + (st.abierto === a.r ? ' aria-current="true"' : "") + ">" +
          esc(hoja(a.r).replace(/\.(md|txt)$/, "")) + (tiene ? '<span class="punto" title="tiene borrador"></span>' : "") + "</button>";
      }
    }
    $("#lista").innerHTML = html || '<div class="vacio" style="height:auto;padding:40px 20px"><b>Nada</b><div>Ningún archivo coincide.</div></div>';
  }

  // ═══════════ visor ═══════════
  function texto(r) { return st.borradores.has(r) ? st.borradores.get(r).texto : porRuta.get(r).t; }
  function original(r) { return porRuta.get(r).t; }

  function pintarVisor() {
    const b = $("#b-editar"), d = $("#b-diff"), g = $("#b-guardar"), x = $("#b-cancelar"), c = $("#b-ctx");
    if (!st.abierto) {
      [b, d, g, c].forEach((e) => (e.disabled = true));
      [d, g].forEach((e) => (e.hidden = true)); x.hidden = true;
      return;
    }
    const r = st.abierto, tieneBor = st.borradores.has(r);
    $("#ruta").innerHTML = '<b>' + esc(hoja(r)) + "</b> · " + esc(carpeta(r)) +
      (tieneBor ? ' · <span style="color:var(--cobre)">con borrador</span>' : "");
    c.disabled = false;
    if (st.modo === "ver") {
      b.disabled = false; b.hidden = false; b.textContent = "Editar";
      d.hidden = true; g.hidden = true; x.hidden = true;
      $("#lienzo").innerHTML = '<pre class="texto">' + esc(texto(r)) + "</pre>";
    } else if (st.modo === "editar") {
      b.hidden = true; d.hidden = false; d.disabled = false; g.hidden = false; g.disabled = false; x.hidden = false;
      $("#lienzo").innerHTML =
        '<div class="dividido"><div class="lado"><h3>Original en el repositorio</h3>' +
        '<div class="lienzo"><pre class="texto">' + esc(original(r)) + '</pre></div></div>' +
        '<div class="lado"><h3>Tu versión</h3><div class="lienzo"><textarea class="edit" id="ta" spellcheck="false"></textarea></div></div></div>';
      const ta = $("#ta"); ta.value = st.edicion; ta.addEventListener("input", () => { st.edicion = ta.value; });
    } else {
      b.hidden = true; d.hidden = false; d.textContent = "Seguir editando"; g.hidden = false; g.disabled = false; x.hidden = false;
      $("#lienzo").innerHTML = '<div class="lienzo">' + pintarDiff(original(r), st.edicion) + "</div>";
    }
  }

  function abrir(r) {
    st.abierto = r; st.modo = "ver"; st.edicion = texto(r);
    pintarArbol(); pintarVisor(); chip();
    if (window.innerWidth <= 860) cerrarArbol();
    $("#lienzo").scrollTop = 0;
  }

  // ═══════════ Claude ═══════════
  function indice() {
    return ARCHIVOS.map((a) => {
      const t = a.t.split("\n").find((l) => l.trim()) || "";
      return a.r + " · " + t.replace(/^#+\s*/, "").slice(0, 90);
    }).join("\n");
  }
  function chip() {
    const partes = [];
    if (st.abierto) partes.push(hoja(st.abierto));
    if (st.adjuntos.size) partes.push(st.adjuntos.size + " adjunto" + (st.adjuntos.size > 1 ? "s" : ""));
    $("#ctx-chip").textContent = "contexto: índice completo" + (partes.length ? " + " + partes.join(" + ") : "");
    $("#adjuntos").innerHTML = [...st.adjuntos].map((r) =>
      '<span>' + esc(hoja(r)) + '<button data-quitar="' + esc(r) + '" aria-label="Quitar del contexto">×</button></span>').join("");
  }

  function armarPrompt(pregunta) {
    let ctx = "Eres el copiloto editorial de \"Entender Chile\", un canal chileno de noticias automatizado. " +
      "Santiago está revisando los archivos que definen el criterio del proyecto (prompts, estrategia, ideas, bitácora) " +
      "para mejorarlos. Respondes en español de Chile, directo y sin adornos.\n\n" +
      "REGLAS DE ESTILO DEL PROYECTO, obligatorias en todo lo que escribas: nunca uses la raya larga ni la raya media; " +
      "donde caería una raya usa coma, dos puntos, punto o paréntesis. Fechas absolutas (DD-MM-AAAA). Sin relleno.\n\n" +
      "ÍNDICE DE LOS " + ARCHIVOS.length + " ARCHIVOS DEL PROYECTO (ruta y primera línea):\n" + indice() + "\n\n";
    const incluidos = new Set(st.adjuntos);
    if (st.abierto) incluidos.add(st.abierto);
    for (const r of incluidos) {
      const t = st.borradores.has(r) ? st.borradores.get(r).texto : porRuta.get(r).t;
      ctx += "═══ ARCHIVO: " + r + (st.borradores.has(r) ? "  (versión con tu borrador sin aplicar)" : "") +
        " ═══\n" + t + "\n═══ FIN DE " + r + " ═══\n\n";
    }
    ctx += "CÓMO RESPONDER:\n" +
      "- Si te piden análisis o una opinión, responde en prosa. Sin listas de relleno.\n" +
      "- Si te piden un CAMBIO CONCRETO en el archivo abierto, primero explica en dos o tres frases qué cambias y por qué, " +
      "y después entrega el archivo COMPLETO reescrito dentro de un bloque que empiece con la línea " +
      "<<<ARCHIVO " + (st.abierto || "ninguno") + " y termine con la línea ARCHIVO>>>. " +
      "Completo de verdad: se reemplaza entero, así que no recortes ni escribas \"resto igual\".\n" +
      "- Si no tienes el archivo que necesitas en el contexto, dilo y pide que lo adjunten. No lo inventes de memoria.\n\n" +
      "PREGUNTA DE SANTIAGO:\n" + pregunta;
    return ctx;
  }

  function pintarCharla() {
    $("#charla").innerHTML = st.turnos.map((t, i) => {
      if (t.rol === "yo") return '<div class="msg yo"><div class="quien">Santiago</div><div class="cont">' + esc(t.texto) + "</div></div>";
      let h = '<div class="msg"><div class="quien">Claude</div><div class="cont">' + esc(t.visible || t.texto) + "</div>";
      if (t.propuesta) h += '<div class="propuesta"><header>propone reescribir <b>' + esc(hoja(t.propuesta.ruta)) +
        '</b><button class="btn" data-ver="' + i + '">Ver el cambio</button></header></div>';
      h += "</div>";
      return h;
    }).join("") + (st.pidiendo ? '<div class="msg"><div class="quien">Claude</div><div class="cont pensando" id="vivo">Pensando...</div></div>' : "");
    $("#charla").scrollTop = $("#charla").scrollHeight;
  }

  function partirRespuesta(txt) {
    const m = txt.match(/<<<ARCHIVO\s+(\S+)\s*\n([\s\S]*?)\nARCHIVO>>>/);
    if (!m) return { visible: txt, propuesta: null };
    const ruta = porRuta.has(m[1]) ? m[1] : st.abierto;
    return {
      visible: txt.slice(0, m.index).trim() || "Propuesta de reescritura lista.",
      propuesta: ruta ? { ruta, texto: m[2] } : null,
    };
  }

  async function preguntar() {
    const q = $("#q-claude").value.trim();
    if (!q || st.pidiendo) return;
    if (!st.sample) {
      st.turnos.push({ rol: "claude", texto: "No puedo responder en esta vista: la capacidad de Claude no está disponible aquí. Abre el taller desde claude.ai." });
      pintarCharla(); return;
    }
    $("#q-claude").value = ""; $("#q-claude").style.height = "auto";
    st.turnos.push({ rol: "yo", texto: q });
    st.pidiendo = true; pintarCharla();
    try {
      const { text } = await st.sample(armarPrompt(q), {
        modelTier: "complex",
        cache: false,
        onText: ({ text }) => { const v = $("#vivo"); if (v) { v.classList.remove("pensando"); v.textContent = text; $("#charla").scrollTop = $("#charla").scrollHeight; } },
      });
      st.pidiendo = false;
      const { visible, propuesta } = partirRespuesta(text);
      st.turnos.push({ rol: "claude", texto: text, visible, propuesta });
    } catch (e) {
      st.pidiendo = false;
      const cod = e && e.code;
      const msg = cod === "not_granted" ? "No autorizaste el uso de Claude en esta página."
        : cod === "rate_limited" ? "Demasiadas preguntas seguidas. Espera un momento."
        : cod === "cancelled" ? "Cancelado."
        : "No se pudo consultar a Claude" + (cod ? " (" + cod + ")" : "") + ".";
      st.turnos.push({ rol: "claude", texto: msg + (e && e.text ? "\n\nLo que alcanzó a escribir:\n" + e.text : "") });
    }
    pintarCharla();
  }

  // ═══════════ borradores ═══════════
  async function guardar() {
    if (!st.abierto) return;
    const r = st.abierto;
    if (st.edicion === original(r)) { st.borradores.delete(r); }
    else { st.borradores.set(r, { texto: st.edicion, ts: new Date().toISOString() }); }
    st.modo = "ver"; pintarArbol(); pintarVisor(); pintarBorradores();
    if (st.db) {
      try {
        if (st.edicion === original(r)) await st.db.doc("borradores/" + clave(r)).delete();
        else await st.db.doc("borradores/" + clave(r)).set({ ruta: r, texto: st.edicion, base: original(r).length, ts: new Date().toISOString(), estado: "pendiente" });
      } catch (e) { console.warn("no se pudo guardar en la base", e); }
    }
  }

  function pintarBorradores() {
    const n = st.borradores.size;
    $("#n-bor").textContent = n ? "(" + n + ")" : "";
    if (!n) {
      $("#p-borradores").innerHTML = '<div class="vacio" style="height:auto;padding:50px 20px"><b>Sin borradores</b>' +
        "<div>Cuando edites un archivo y guardes, el cambio queda acá esperando a que lo commitee en la sesión de la noche.</div></div>";
      return;
    }
    let h = '<p class="eyebrow">Borradores sin aplicar</p><h2 style="font-family:\'Fraunces\',Georgia,serif;font-weight:600;margin:6px 0 6px">' +
      n + " cambio" + (n > 1 ? "s" : "") + " esperando</h2>" +
      '<p style="color:var(--gris);font-size:13.5px;margin:0 0 18px;max-width:70ch">Nada de esto tocó el repositorio todavía. En la sesión de la noche los leo, los reviso y los commiteo. Si te arrepientes, descártalo acá.</p>';
    for (const [r, b] of st.borradores) {
      const d = diffLineas(original(r), b.texto);
      const mas = d.filter((x) => x[0] === "+").length, menos = d.filter((x) => x[0] === "-").length;
      h += '<div class="bor"><h4>' + esc(r) + "</h4>" +
        '<div class="meta"><span style="color:var(--acento)">+' + mas + '</span> · <span style="color:var(--cobre)">-' + menos + "</span> líneas · guardado " +
        new Date(b.ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) + "</div>" +
        '<div class="acciones"><button class="btn" data-abrir-bor="' + esc(r) + '">Abrir y revisar</button>' +
        '<button class="btn" data-tirar="' + esc(r) + '">Descartar</button></div></div>';
    }
    $("#p-borradores").innerHTML = h;
  }

  // ═══════════ eventos ═══════════
  function cerrarArbol() { $("#arbol").classList.add("oculto"); $("#velo").classList.remove("on"); }
  function alternarArbol() {
    const a = $("#arbol"), oculto = a.classList.toggle("oculto");
    if (window.innerWidth <= 860) $("#velo").classList.toggle("on", !oculto);
  }
  $("#b-arbol").onclick = alternarArbol;
  $("#velo").onclick = cerrarArbol;

  $("#lista").addEventListener("click", (e) => {
    const c = e.target.closest("[data-carpeta]");
    if (c) { const k = c.dataset.carpeta; st.abiertas.has(k) ? st.abiertas.delete(k) : st.abiertas.add(k); pintarArbol(); return; }
    const a = e.target.closest("[data-ruta]");
    if (a) abrir(a.dataset.ruta);
  });
  $("#q").addEventListener("input", (e) => { st.filtro = e.target.value.trim(); pintarArbol(); });

  $("#b-editar").onclick = () => { st.edicion = texto(st.abierto); st.modo = "editar"; pintarVisor(); };
  $("#b-diff").onclick = () => { st.modo = st.modo === "diff" ? "editar" : "diff"; $("#b-diff").textContent = st.modo === "diff" ? "Seguir editando" : "Ver cambios"; pintarVisor(); };
  $("#b-guardar").onclick = guardar;
  $("#b-cancelar").onclick = () => { st.modo = "ver"; st.edicion = texto(st.abierto); $("#b-diff").textContent = "Ver cambios"; pintarVisor(); };
  $("#b-ctx").onclick = () => { if (st.abierto) { st.adjuntos.add(st.abierto); chip(); } };
  $("#adjuntos").addEventListener("click", (e) => { const b = e.target.closest("[data-quitar]"); if (b) { st.adjuntos.delete(b.dataset.quitar); chip(); } });

  $("#dock-cab").onclick = () => $("#dock").classList.toggle("cerrado");
  $("#b-enviar").onclick = preguntar;
  $("#q-claude").addEventListener("input", (e) => { e.target.style.height = "auto"; e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px"; });
  $("#q-claude").addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); preguntar(); } });

  $("#charla").addEventListener("click", (e) => {
    const v = e.target.closest("[data-ver]");
    if (!v) return;
    const t = st.turnos[+v.dataset.ver];
    if (!t || !t.propuesta) return;
    if (st.abierto !== t.propuesta.ruta) abrir(t.propuesta.ruta);
    st.edicion = t.propuesta.texto; st.modo = "diff"; pintarVisor();
    $("#dock").classList.add("cerrado");
    mod("archivos");
  });

  $("#p-borradores").addEventListener("click", (e) => {
    const a = e.target.closest("[data-abrir-bor]");
    if (a) { mod("archivos"); abrir(a.dataset.abrirBor); st.modo = "diff"; pintarVisor(); return; }
    const t = e.target.closest("[data-tirar]");
    if (t) {
      const r = t.dataset.tirar;
      st.borradores.delete(r);
      if (st.db) st.db.doc("borradores/" + clave(r)).delete().catch(() => {});
      if (st.abierto === r) { st.edicion = original(r); st.modo = "ver"; pintarVisor(); }
      pintarArbol(); pintarBorradores();
    }
  });

  function mod(n) {
    document.querySelectorAll(".mods button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.mod === n)));
    document.querySelectorAll("[data-panel]").forEach((p) => p.toggleAttribute("data-activo", p.dataset.panel === n));
  }
  document.querySelectorAll(".mods button").forEach((b) => (b.onclick = () => mod(b.dataset.mod)));

  // ═══════════ arranque ═══════════
  $("#sello").textContent = SELLO;
  pintarArbol(); pintarBorradores(); chip();
  if (window.innerWidth <= 860) $("#arbol").classList.add("oculto");

  claude.use("sample").then((s) => {
    st.sample = s;
    if (!s) {
      $("#charla").innerHTML = '<div class="aviso"><b>Claude no está disponible en esta vista.</b> El árbol, el visor, el editor y el diff funcionan igual. Para conversar, abre el taller desde claude.ai.</div>';
    } else if (!st.turnos.length) {
      $("#charla").innerHTML = '<div class="aviso">Claude ve el índice de los <b>' + ARCHIVOS.length +
        " archivos</b> y el que tengas abierto. Pídele un cambio concreto y te devuelve el archivo entero reescrito, con su diff antes de guardar nada.</div>";
    }
  });

  claude.use("db").then(async (d) => {
    st.db = d;
    if (!d) return;
    try {
      const snap = await d.collection("borradores").get();
      snap.forEach((doc) => {
        const v = doc.data();
        if (v && v.ruta && porRuta.has(v.ruta) && v.estado !== "aplicado") st.borradores.set(v.ruta, { texto: v.texto, ts: v.ts });
      });
      pintarArbol(); pintarBorradores();
      if (st.abierto) { st.edicion = texto(st.abierto); pintarVisor(); }
    } catch (e) { console.warn("no se pudieron leer los borradores", e); }
  });
})();
