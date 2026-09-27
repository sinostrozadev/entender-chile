#!/usr/bin/env node
/**
 * botones.js - Los enlaces a GitHub con los que Santiago decide sin tokens.
 *
 * Por qué existe este módulo aparte: los armaba scripts/taller.js, y desde el
 * 27-09-2026 los necesita también scripts/bandeja.js (la Bandeja calcula los
 * mismos botones para bitacora/bandeja.json, que además lee el informe de la
 * mañana). Dos copias del constructor de URL habrían derivado: un botón del
 * Taller y el href de la Bandeja apuntando a rutas distintas para la misma
 * decisión es exactamente el error que el repo no puede permitirse, porque el
 * push de ese botón es lo que mueve la máquina.
 *
 * Aquí viven SOLO las URL. El HTML (las clases, la ayuda, el <details> con el
 * texto a copiar) se queda en taller.js: es presentación, y la Bandeja no la
 * necesita, porque su json guarda pares {texto, href}.
 *
 * Un archivo que YA existe no se puede crear: GitHub rechaza /new con esa
 * ruta. Por eso hrefArchivo decide entre /new (con el contenido prellenado) y
 * /edit (que no acepta contenido y obliga a reemplazar a mano).
 */
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const REPO = "https://github.com/sinostrozadev/entender-chile";

const urlVer = (ruta) => `${REPO}/blob/main/${ruta}`;
const urlEditar = (ruta) => `${REPO}/edit/main/${ruta}`;
const urlNuevo = (ruta, contenido) => `${REPO}/new/main?filename=${encodeURIComponent(ruta)}&value=${encodeURIComponent(contenido)}`;
const urlFlujo = (archivo) => `${REPO}/actions/workflows/${archivo}`;

// El enlace para dejar escrito `ruta` con `contenido`: crear si no existe,
// editar si ya está. `raiz` es parámetro para que una prueba pueda apuntar a
// un clon sin tocar el repo de trabajo.
const hrefArchivo = (ruta, contenido, raiz = RAIZ) => (fs.existsSync(path.join(raiz, ruta))
  ? { href: urlEditar(ruta), existe: true }
  : { href: urlNuevo(ruta, contenido), existe: false });

module.exports = { REPO, RAIZ, urlVer, urlEditar, urlNuevo, urlFlujo, hrefArchivo };
