// EL MENÚ DEL TALLER (01-10-2026, pedido de Santiago: "agrega un menú y agrega
// un submenú de tarjetas, modos y eventos").
//
// POR QUÉ ES UN ARCHIVO Y NO UN TROZO DE HTML EN CADA PÁGINA: el taller vive en
// DOS artefactos de claude.ai, con una URL cada uno, porque las pantallas del
// video traen medios pesados (los clips de transición y los cuadros de cada
// tarjeta) y meterlos en la misma página que la biblioteca la haría pesar de
// más para quien solo viene a cambiar un color. Para quien lo usa tiene que
// leerse como un solo taller con un menú, así que el menú se escribe una vez
// acá y las dos páginas lo pintan igual. Si se agrega una pantalla, se agrega
// en esta lista y aparece en las dos.
//
// Las URLs son las de los artefactos publicados. Si alguna cambia, se cambia
// acá y se republican las dos páginas.
window.MENU = {
  grupos: [
    {
      id: "canal",
      nombre: "El canal",
      url: "https://claude.ai/artifact/1R4oBLvc2YsVZPKbCYsbB8",
      pantallas: [
        { id: "trabajos", nombre: "Formatos" },
        { id: "secciones", nombre: "Secciones" },
        { id: "estilos", nombre: "Estilos" },
        { id: "biblioteca", nombre: "Biblioteca" }
      ]
    },
    {
      id: "video",
      nombre: "El video",
      url: "https://claude.ai/artifact/KWxSLBrQUfE5yjAb2uTGfR",
      pantallas: [
        { id: "entrada", nombre: "Entrada" },
        { id: "tarjetas", nombre: "Tarjetas" },
        { id: "fondos", nombre: "Fondos" },
        { id: "eventos", nombre: "Eventos" },
        { id: "transiciones", nombre: "Transiciones" }
      ]
    }
  ]
};

// Pinta el menú dentro de `donde`. `grupoAqui` es el id del grupo que vive en
// ESTA página: sus pantallas se muestran como pestañas y las del otro grupo
// como un enlace que lleva a la otra página. `alElegir` recibe el id de la
// pantalla cuando se hace clic en una de las de acá.
window.pintarMenu = function (donde, grupoAqui, activa, alElegir) {
  var M = window.MENU;
  if (!donde || !M) return;
  donde.textContent = "";
  M.grupos.forEach(function (g) {
    var caja = document.createElement("div");
    caja.className = "menu-grupo" + (g.id === grupoAqui ? " aqui" : "");
    var titulo = document.createElement("div");
    titulo.className = "menu-titulo";
    titulo.textContent = g.nombre;
    caja.appendChild(titulo);
    var fila = document.createElement("div");
    fila.className = "menu-fila";
    g.pantallas.forEach(function (p) {
      if (g.id === grupoAqui) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "menu-item" + (p.id === activa ? " activa" : "");
        b.textContent = p.nombre;
        b.setAttribute("aria-current", p.id === activa ? "page" : "false");
        b.addEventListener("click", function () { alElegir(p.id); });
        fila.appendChild(b);
      } else {
        // la otra página: un enlace con el ancla de la pantalla, para que abra
        // directo donde uno iba y no siempre en la primera
        var a = document.createElement("a");
        a.className = "menu-item";
        a.href = g.url + "#" + p.id;
        a.textContent = p.nombre;
        fila.appendChild(a);
      }
    });
    caja.appendChild(fila);
    donde.appendChild(caja);
  });
};
