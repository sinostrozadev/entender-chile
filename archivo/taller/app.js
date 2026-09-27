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
    modo: "ver",        // ver | editar | comparar
    edicion: "",        // texto en el editor
    lado: window.innerWidth > 760,  // comparar: lado a lado (true) o unificado (false)
    cambio: -1,         // índice del bloque de cambio en el que está parado
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

  /**
   * Traduce el diff a marcas POR LÍNEA DEL TEXTO EDITADO, que es lo que el
   * editor necesita para pintar el margen en caliente mientras se escribe:
   *   marcas[i]  ''   sin tocar
   *              add  línea nueva
   *              mod  línea que reemplaza a otra
   *   borrados   línea del editor -> cuántas líneas se borraron justo antes
   *   bloques    primera línea de cada cambio (para el "cambio siguiente")
   */
  function analizar(A, B) {
    const d = diffLineas(A, B);
    const marcas = new Array(B.split("\n").length).fill("");
    const borrados = new Map();
    const bloques = [];
    let j = 0, k = 0, mas = 0, menos = 0;
    while (k < d.length) {
      if (d[k][0] === "=") { j++; k++; continue; }
      const inicio = j;
      let del = 0, add = 0;
      while (k < d.length && d[k][0] === "-") { del++; menos++; k++; }
      while (k < d.length && d[k][0] === "+") { marcas[j] = del ? "mod" : "add"; add++; mas++; j++; k++; }
      if (del && !add) borrados.set(inicio, (borrados.get(inicio) || 0) + del);
      bloques.push(inicio);
    }
    return { marcas, borrados, bloques, mas, menos, d };
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

  /**
   * El editor es un textarea transparente montado sobre una capa espejo que
   * repite el texto línea por línea. La capa es la que pinta los números y el
   * color del margen; el textarea solo aporta el cursor y las letras. Las dos
   * comparten tipografía, interlineado, ancho y sangrías, así que el corte de
   * línea cae en el mismo punto y las marcas quedan pegadas a su línea aunque
   * el párrafo se envuelva en tres.
   */
  function capaHTML(txt, an) {
    const lineas = txt.split("\n");
    const inicios = new Set(an.bloques);
    let h = "";
    for (let i = 0; i < lineas.length; i++) {
      const m = an.marcas[i];
      const borr = an.borrados.get(i);
      const cls = "ln" + (m ? " " + m : "") + (borr ? " borr" : "") + (inicios.has(i) ? " inicio" : "");
      h += '<div class="' + cls + '"' + (inicios.has(i) ? ' data-cambio="1"' : "") +
        (borr ? ' data-borr="' + borr + " línea" + (borr > 1 ? "s" : "") + ' borrada' + (borr > 1 ? "s" : "") + '"' : "") +
        '><span class="num">' + (i + 1) + "</span>" + (esc(lineas[i]) || " ") + "</div>";
    }
    // marca de borrado al final del archivo, que no cuelga de ninguna línea
    const cola = an.borrados.get(lineas.length);
    if (cola) h += '<div class="ln borr cola" data-cambio="1" data-borr="' + cola + ' al final"><span class="num"></span> </div>';
    return h;
  }

  function pintarCodigo(txt, an, editable) {
    return '<div class="cod" id="cod"><div class="capa" id="capa">' + capaHTML(txt, an) + "</div>" +
      '<textarea class="edit" id="ta" spellcheck="false"' + (editable ? "" : " readonly") + "></textarea></div>";
  }

  // Recalcula las marcas sin volver a montar el textarea: el cursor no se mueve
  // y la escritura no parpadea.
  let temporizador = null;
  function refrescarMarcas() {
    const capa = $("#capa"); if (!capa || !st.abierto) return;
    const an = analizar(original(st.abierto), st.edicion);
    capa.innerHTML = capaHTML(st.edicion, an);
    pintarCuenta(an);
  }

  function pintarCuenta(an) {
    const n = an.bloques.length;
    const c = $("#cambios");
    c.hidden = !n;
    $("#cuenta-cambios").textContent = n ? (st.cambio >= 0 ? st.cambio + 1 : "-") + "/" + n : "";
    const r = st.abierto;
    $("#ruta").innerHTML = '<b>' + esc(hoja(r)) + "</b> · " + esc(carpeta(r)) +
      (st.borradores.has(r) ? ' · <span style="color:var(--cobre)">con borrador</span>' : "") +
      (n ? ' · <span class="mas">+' + an.mas + '</span> <span class="menos">-' + an.menos + "</span>" : "");
  }

  // ═══════════ comparación lado a lado, al modo de Meld ═══════════
  /**
   * Las dos columnas viven en UNA sola rejilla dentro de UN solo contenedor con
   * barra: bajar es bajar en los dos lados por construcción, sin escuchar el
   * scroll de uno para empujar el del otro (que siempre termina temblando). El
   * relleno rayado ocupa el hueco del lado que no tiene línea, así que las
   * líneas iguales quedan siempre frente a frente.
   */
  function filasMeld(A, B) {
    const d = diffLineas(A, B);
    const filas = [];
    let na = 0, nb = 0, i = 0;
    while (i < d.length) {
      if (d[i][0] === "=") { na++; nb++; filas.push(["=", d[i][1], d[i][1], na, nb]); i++; continue; }
      const menos = [], mas = [];
      while (i < d.length && d[i][0] === "-") menos.push(d[i++][1]);
      while (i < d.length && d[i][0] === "+") mas.push(d[i++][1]);
      const n = Math.max(menos.length, mas.length);
      for (let k = 0; k < n; k++) {
        const izq = k < menos.length ? menos[k] : null, der = k < mas.length ? mas[k] : null;
        filas.push([k === 0 ? "x0" : "x", izq, der, izq !== null ? ++na : null, der !== null ? ++nb : null]);
      }
    }
    return filas;
  }

  function pintarMeld(A, B) {
    const filas = filasMeld(A, B);
    if (!filas.some((f) => f[0] !== "=")) return '<div class="vacio"><b>Sin cambios</b><div>El texto es idéntico al del repositorio.</div></div>';
    const cerca = new Set();
    filas.forEach((f, k) => { if (f[0] !== "=") for (let o = -3; o <= 3; o++) cerca.add(k + o); });
    let h = '<div class="meld"><div class="cab izq">Original en el repositorio</div><div class="cab der">Tu versión</div>';
    let hueco = false;
    filas.forEach((f, k) => {
      if (!cerca.has(k)) { hueco = true; return; }
      if (hueco) { h += '<div class="salto">···</div>'; hueco = false; }
      const cam = f[0] !== "=";
      const marca = f[0] === "x0" ? ' data-cambio="1"' : "";
      const celda = (lado, txt, num, quitado) =>
        '<div class="c ' + lado + (txt === null ? " hueco" : cam ? (quitado ? " menos" : " mas") : "") + '"' + (lado === "izq" ? marca : "") + ">" +
        '<span class="num">' + (num || "") + "</span>" + (txt === null ? "" : esc(txt) || " ") + "</div>";
      h += celda("izq", f[1], f[3], true) + celda("der", f[2], f[4], false);
    });
    return h + "</div>";
  }

  function pintarUnificado(A, B) {
    const d = diffLineas(A, B);
    const cambios = d.filter((x) => x[0] !== "=").length;
    if (!cambios) return '<div class="vacio"><b>Sin cambios</b><div>El texto es idéntico al del repositorio.</div></div>';
    const cerca = new Set();
    d.forEach((x, k) => { if (x[0] !== "=") for (let o = -3; o <= 3; o++) cerca.add(k + o); });
    let html = "", hueco = false, previo = "=";
    d.forEach((x, k) => {
      if (!cerca.has(k)) { hueco = true; return; }
      if (hueco) { html += '<div class="salto">···</div>'; hueco = false; }
      const cls = x[0] === "+" ? "a" : x[0] === "-" ? "b" : "ctx";
      const marca = x[0] === "+" ? "+ " : x[0] === "-" ? "- " : "  ";
      const nuevo = x[0] !== "=" && previo === "=";
      html += '<div class="' + cls + '"' + (nuevo ? ' data-cambio="1"' : "") + ">" + esc(marca + x[1]) + "</div>";
      previo = x[0];
    });
    return '<div class="dif">' + html + "</div>";
  }

  // conservar=true mantiene la posición de lectura al pasar de ver a editar y
  // al revés: es el mismo archivo en la misma disposición, saltar al principio
  // (o peor, al final, donde deja el cursor el focus) hace perder el punto.
  function pintarVisor(conservar) {
    const previo = $("#cod"), pos = previo ? previo.scrollTop : 0;
    const b = $("#b-editar"), cp = $("#b-comparar"), v = $("#b-vista"),
      g = $("#b-guardar"), x = $("#b-cancelar"), c = $("#b-ctx");
    if (!st.abierto) {
      [b, cp, g, c].forEach((e) => (e.disabled = true));
      [cp, v, g].forEach((e) => (e.hidden = true));
      x.hidden = true; $("#cambios").hidden = true;
      return;
    }
    const r = st.abierto;
    const an = analizar(original(r), st.edicion);
    c.disabled = false;
    st.cambio = -1;

    if (st.modo === "comparar") {
      b.hidden = true; cp.hidden = false; cp.disabled = false; cp.textContent = "Volver al editor";
      v.hidden = false; v.textContent = st.lado ? "Unificado" : "Lado a lado";
      g.hidden = false; g.disabled = false; x.hidden = false;
      $("#lienzo").innerHTML = '<div class="scroll" id="scroll">' +
        (st.lado ? pintarMeld(original(r), st.edicion) : pintarUnificado(original(r), st.edicion)) + "</div>";
    } else {
      const editando = st.modo === "editar";
      b.hidden = editando; b.disabled = false; b.textContent = "Editar";
      cp.hidden = !editando; cp.disabled = false; cp.textContent = "Comparar";
      v.hidden = true;
      g.hidden = !editando; g.disabled = !editando;
      x.hidden = !editando;
      $("#lienzo").innerHTML = pintarCodigo(st.edicion, an, editando);
      const ta = $("#ta");
      ta.value = st.edicion;
      ajustarAlto(ta);
      if (editando) {
        ta.addEventListener("input", () => {
          st.edicion = ta.value;
          ajustarAlto(ta);
          clearTimeout(temporizador);
          temporizador = setTimeout(refrescarMarcas, 140);
        });
        ta.setSelectionRange(0, 0);
        ta.focus({ preventScroll: true });   // sin esto el foco arrastra al final
      }
      if (conservar && previo) $("#cod").scrollTop = pos;
    }
    pintarCuenta(an);
  }

  // El textarea no lleva barra propia: crece hasta su contenido y el que baja
  // es el contenedor, que es el mismo que baja la capa de las marcas.
  function ajustarAlto(ta) { ta.style.height = "auto"; ta.style.height = ta.scrollHeight + "px"; }

  function irACambio(paso) {
    const cont = $("#cod") || $("#scroll"); if (!cont) return;
    const nodos = [...cont.querySelectorAll("[data-cambio]")];
    if (!nodos.length) return;
    st.cambio = st.cambio < 0 ? (paso > 0 ? 0 : nodos.length - 1) : (st.cambio + paso + nodos.length) % nodos.length;
    const n = nodos[st.cambio];
    cont.scrollTop = n.offsetTop - cont.clientHeight / 3;
    nodos.forEach((e) => e.classList.remove("aqui"));
    n.classList.add("aqui");
    $("#cuenta-cambios").textContent = (st.cambio + 1) + "/" + nodos.length;
  }

  function abrir(r) {
    st.abierto = r; st.modo = "ver"; st.edicion = texto(r);
    pintarArbol(); pintarVisor(); chip();
    if (window.innerWidth <= 860) cerrarArbol();
    const c = $("#cod"); if (c) c.scrollTop = 0;
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
      const a = analizar(original(r), b.texto);
      h += '<div class="bor"><h4>' + esc(r) + "</h4>" +
        '<div class="meta"><span class="mas">+' + a.mas + '</span> · <span class="menos">-' + a.menos + "</span> líneas · guardado " +
        new Date(b.ts).toLocaleString("es-CL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) + "</div>" +
        '<div class="acciones"><button class="btn" data-abrir-bor="' + esc(r) + '">Abrir y comparar</button>' +
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

  $("#b-editar").onclick = () => { st.modo = "editar"; pintarVisor(true); };
  $("#b-comparar").onclick = () => { st.modo = st.modo === "comparar" ? "editar" : "comparar"; pintarVisor(); };
  $("#b-vista").onclick = () => { st.lado = !st.lado; pintarVisor(); };
  $("#b-prev").onclick = () => irACambio(-1);
  $("#b-next").onclick = () => irACambio(1);
  $("#b-guardar").onclick = guardar;
  $("#b-cancelar").onclick = () => { st.modo = "ver"; st.edicion = texto(st.abierto); pintarVisor(true); };
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
    st.edicion = t.propuesta.texto; st.modo = "comparar"; pintarVisor();
    $("#dock").classList.add("cerrado");
    mod("archivos");
  });

  $("#p-borradores").addEventListener("click", (e) => {
    const a = e.target.closest("[data-abrir-bor]");
    if (a) { mod("archivos"); abrir(a.dataset.abrirBor); st.modo = "comparar"; pintarVisor(); return; }
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
  document.querySelectorAll(".n-arch").forEach((e) => (e.textContent = ARCHIVOS.length));
  pintarArbol(); pintarBorradores(); chip();
  if (window.innerWidth <= 860) $("#arbol").classList.add("oculto");

  claude.use("sample").then((s) => {
    st.sample = s;
    if (!s) {
      $("#charla").innerHTML = '<div class="aviso"><b>Claude no está disponible en esta vista.</b> El árbol, el visor, el editor y el comparador funcionan igual. Para conversar, abre el taller desde claude.ai.</div>';
    } else if (!st.turnos.length) {
      $("#charla").innerHTML = '<div class="aviso">Claude ve el índice de los <b>' + ARCHIVOS.length +
        " archivos</b> y el que tengas abierto. Pídele un cambio concreto y te devuelve el archivo entero reescrito, con su comparación antes de guardar nada.</div>";
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
