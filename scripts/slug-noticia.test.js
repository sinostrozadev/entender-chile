#!/usr/bin/env node
/**
 * slug-noticia.test.js - las dos copias del slug de noticia dan lo mismo.
 *
 * Por qué existe (01-11-2026). El slug vive en web/src/lib/slug-noticia.js
 * (lo usa el build) y en scripts/slug-noticia.js (lo usan los scripts del
 * largo por tema). Si una copia cambia y la otra no, el guion pediría un zoom a
 * una noticia que la captura no encuentra, y eso se vería recién en el render.
 *
 * Uso: node --test scripts/slug-noticia.test.js
 */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const scripts = require("./slug-noticia.js");

const RAIZ = path.resolve(__dirname, "..");
const WEB = path.join(RAIZ, "web", "src", "lib", "slug-noticia.js");
const INFORME = path.join(RAIZ, "contenido", "informes", "2026-11-01.md");
const bloque = (archivo) => {
  const t = fs.readFileSync(archivo, "utf8");
  const m = t.match(/\/\/ --- inicio común[\s\S]*?\/\/ --- fin común ---/);
  assert.ok(m, `sin bloque común en ${archivo}`);
  return m[0];
};

test("el bloque común es idéntico en las dos copias", () => {
  assert.strictEqual(bloque(path.join(__dirname, "slug-noticia.js")), bloque(WEB));
});

test("las dos copias dan los mismos slugs sobre los titulares del 01-11-2026", async () => {
  const web = await import(pathToFileURL(WEB).href);
  const noticias = scripts.noticiasDelInforme(fs.readFileSync(INFORME, "utf8"));
  assert.ok(noticias.length > 30, `pocas noticias: ${noticias.length}`);
  const repWeb = web.repartidorDeSlugs();
  for (const n of noticias) {
    assert.strictEqual(web.slugNoticia(n.titular), scripts.slugNoticia(n.titular), n.titular);
    assert.strictEqual(repWeb(n.titular), n.slug, n.titular);
    assert.ok(n.slug.length <= 60 && /^[a-z0-9]+(-[a-z0-9]+)*$/.test(n.slug), n.slug);
  }
});

test("casos borde: tildes, eñe, largo y repetidos", () => {
  const { slugNoticia, repartidorDeSlugs } = scripts;
  assert.strictEqual(slugNoticia("Ñuñoa: ¿qué pasó?"), "nunoa-que-paso");
  const largo = slugNoticia("La acusación constitucional contra el ministro de Justicia sigue en preparación y todavía no entra");
  assert.ok(largo.length <= 60 && !largo.endsWith("-"), largo);
  const r = repartidorDeSlugs();
  assert.deepStrictEqual([r("Hola"), r("hola"), r("HOLA")], ["hola", "hola-2", "hola-3"]);
});

// Si el build de la web está hecho, el ancla que quedó en el HTML tiene que
// ser la misma que se calcula desde el markdown, en el mismo orden.
test("el HTML construido trae las mismas anclas que el markdown", { skip: !fs.existsSync(path.join(RAIZ, "web", "dist", "informes", "2026-11-01", "index.html")) && "sin web/dist" }, () => {
  const html = fs.readFileSync(path.join(RAIZ, "web", "dist", "informes", "2026-11-01", "index.html"), "utf8");
  const enHtml = [...html.matchAll(/data-noticia="([^"]+)" data-nivel="([ABC])"/g)].map((m) => `${m[2]} ${m[1]}`);
  const enMd = scripts.noticiasDelInforme(fs.readFileSync(INFORME, "utf8")).map((n) => `${n.nivel} ${n.slug}`);
  assert.deepStrictEqual(enHtml, enMd);
});
