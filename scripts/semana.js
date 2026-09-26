#!/usr/bin/env node
/**
 * semana.js - El barrido semanal de temas: qué se repitió esta semana y con
 * cuánto peso. Reemplaza al banco de temas diario, que se congeló el
 * 26-09-2026 (decisión de Santiago: "el banco de temas lo estamos llenando de
 * temas que quedan ahí... una vez a la semana se hace un barrido semanal y
 * puntuamos, los más relevantes o los más repetidos").
 *
 * No gasta tokens, no navega y no decide nada: lee los informes de la semana
 * (lunes a sábado), agrupa las noticias que hablan de lo mismo, las puntúa y
 * deja el ranking escrito. Quien elige los tres candidatos es Claude, con
 * prompts/tema-semana.md; quien elige el tema es Santiago, con clave.js.
 *
 *   node scripts/semana.js                      → la semana que acaba de cerrar
 *   node scripts/semana.js --semana 2026-W39    → esa semana ISO
 *   node scripts/semana.js --hasta 2026-09-26   → la semana que termina ese sábado
 *   node scripts/semana.js --sin-escribir       → solo imprime, no toca el repo
 *
 * Salida: contenido/claves/semana/AAAA-Www.md y AAAA-Www.json
 * Sin dependencias. Determinista: la misma semana da siempre el mismo ranking.
 */
const fs = require("fs");
const path = require("path");

const RAIZ = path.join(__dirname, "..");
const arg = (n) => { const i = process.argv.indexOf(n); return i >= 0 ? process.argv[i + 1] : null; };
const bandera = (n) => process.argv.includes(n);

// ---------------------------------------------------------------- calendario
// Todo en UTC a mediodía para que el cambio de hora de Chile no corra un día.
const dia = (iso) => new Date(`${iso}T12:00:00Z`);
const iso = (d) => d.toISOString().slice(0, 10);
const sumar = (d, n) => { const x = new Date(d); x.setUTCDate(x.getUTCDate() + n); return x; };
const hoyChile = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
const ddmm = (f) => `${f.slice(8, 10)}-${f.slice(5, 7)}`;

// Semana ISO: el jueves de la semana manda el año, y la semana 1 es la que
// contiene el primer jueves de enero. Se calcula a mano para no depender de
// ninguna librería de fechas.
const etiquetaISO = (lunes) => {
  const jueves = sumar(lunes, 3);
  const anio = jueves.getUTCFullYear();
  const primerJueves = (() => {
    const e4 = dia(`${anio}-01-04`);
    return sumar(e4, 3 - ((e4.getUTCDay() + 6) % 7));
  })();
  const n = 1 + Math.round((jueves - primerJueves) / (7 * 86400000));
  return `${anio}-W${String(n).padStart(2, "0")}`;
};
// El lunes de una etiqueta AAAA-Www (el camino inverso).
const lunesDe = (etiqueta) => {
  const [anio, n] = etiqueta.split("-W").map(Number);
  const e4 = dia(`${anio}-01-04`);
  const lunes1 = sumar(e4, -((e4.getUTCDay() + 6) % 7));
  return sumar(lunes1, (n - 1) * 7);
};

// La semana por defecto es la que termina el último sábado anterior o igual a
// hoy: el domingo, la que acaba de cerrar; el sábado, la que cierra hoy.
const semanaPorDefecto = () => {
  const h = dia(hoyChile());
  const dow = h.getUTCDay(); // 0 domingo, 6 sábado
  const atras = (dow + 1) % 7; // sábado 0, domingo 1, lunes 2...
  return sumar(sumar(h, -atras), -5); // el lunes de esa semana
};

let LUNES;
if (arg("--semana")) LUNES = lunesDe(arg("--semana"));
else if (arg("--hasta")) { const h = dia(arg("--hasta")); LUNES = sumar(h, -((h.getUTCDay() + 6) % 7)); }
else LUNES = semanaPorDefecto();
const SEMANA = etiquetaISO(LUNES);
const DIAS = Array.from({ length: 6 }, (_, i) => iso(sumar(LUNES, i))); // lunes a sábado

// ------------------------------------------------------------- normalización
// Lista corta de palabras vacías: solo function words de cuatro letras o más
// (las cortas ya las descarta el filtro de largo) y un puñado de verbos y
// muletillas del registro noticioso que agrupan por casualidad.
const VACIAS = new Set(`ante bajo cada como contra cual cuales cuando cuanto desde donde durante entre hacia hasta mientras para pero porque
quien quienes segun sino sobre tambien tras aunque ademas luego mismo misma mismos mismas otro otra otros otras todo toda todos todas
este esta estos estas esos esas aquel aquella algun alguna algunos algunas cualquier varios varias
sera seran seria serian fueron sido siendo haber habia habian hacen hace hacer tiene tienen tener puede pueden poder debe deben
dice dicen dijo dijeron sigue siguen queda quedan quedo deja dejan dejo pide piden pidio llega llegan llego tuvo tuvieron
anuncia anuncio anuncian busca buscan abre abren pasa pasan vuelve vuelven suma suman
solo solos menos nuevo nueva nuevos nuevas gran grande grandes mayor menor primer primera primero segundo
anos dias hora horas semana semanas mes meses vez veces caso casos parte partes
dos tres cuatro cinco seis siete ocho nueve diez once doce quince veinte treinta cien mil millon millones
chile chilena chileno chilenos gobierno pais paises nacional nacionales`.split(/\s+/).filter(Boolean));

const sinTildes = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
// Plurales al singular a lo bruto: sin esto "subsidio" y "subsidios" son dos
// términos distintos y la misma historia no se reconoce entre un día y otro.
const singular = (p) => (p.length > 5 && p.endsWith("es") ? p.slice(0, -2) : p.length > 4 && p.endsWith("s") ? p.slice(0, -1) : p);
const palabras = (t) => sinTildes(t.toLowerCase()).replace(/[^a-z0-9ñ\s]/g, " ").split(/\s+/).filter(Boolean);
// "Términos raros": lo que queda del titular cuando se sacan las palabras
// vacías y las de menos de cuatro letras. Son los que identifican el tema.
const raros = (t) => palabras(t).filter((p) => p.length >= 4 && !VACIAS.has(p) && !/^\d+$/.test(p)).map(singular);

// Bigramas de nombres propios: dos palabras seguidas con mayúscula inicial
// ("Banco Central", "Corte Suprema", "Estados Unidos"). Se salta la primera
// palabra del titular, que va en mayúscula por posición y no por ser nombre.
const bigramas = (titular) => {
  const tk = titular.replace(/\([^)]*\)/g, " ").split(/\s+/).filter(Boolean);
  const out = [];
  for (let i = 1; i < tk.length - 1; i++) {
    const a = tk[i].replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "");
    const b = tk[i + 1].replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, "");
    if (a.length < 4 || b.length < 4) continue;
    if (!/^[A-ZÁÉÍÓÚÑ]/.test(a) || !/^[A-ZÁÉÍÓÚÑ]/.test(b)) continue;
    const na = sinTildes(a.toLowerCase()), nb = sinTildes(b.toLowerCase());
    if (VACIAS.has(na) || VACIAS.has(nb)) continue;
    out.push(`${na} ${nb}`);
  }
  return out;
};

// ---------------------------------------------------------------- los datos
// Cada noticia del informe: titular, nivel, sección, fecha y si arrastra una
// marca de seguimiento (EN SEGUIMIENTO o PENDIENTE DE CIERRE), que es la
// señal de que el canal ya la trata como historia y no como hecho suelto.
const noticias = [];
const diasConInforme = [];
for (const fecha of DIAS) {
  const ruta = path.join(RAIZ, "contenido", "informes", `${fecha}.md`);
  if (!fs.existsSync(ruta)) continue;
  diasConInforme.push(fecha);
  // el bloque interno del informe es cocina, no contenido: se corta.
  const txt = fs.readFileSync(ruta, "utf8").split("<!-- interno")[0];
  let seccion = "(sin sección)", ultima = null;
  for (const linea of txt.split("\n")) {
    const l = linea.trim();
    let m;
    if ((m = l.match(/^##\s+(.+)$/))) { seccion = m[1].trim(); ultima = null; continue; }
    if ((m = l.match(/^###\s+\[([ABC])\]\s*(.+)$/))) {
      ultima = { fecha, nivel: m[1], seccion, titular: limpiar(m[2]), seguimiento: false };
      noticias.push(ultima);
      continue;
    }
    if ((m = l.match(/^-\s+\[C\]\s*(.+)$/))) {
      ultima = { fecha, nivel: "C", seccion, titular: limpiar(m[1]), seguimiento: false };
      noticias.push(ultima);
      continue;
    }
    if (/^(EN SEGUIMIENTO|PENDIENTE DE CIERRE):/.test(l) && ultima) ultima.seguimiento = true;
  }
}
// El titular llega con la atribución entre paréntesis al final y a veces con
// punto: para puntuar estorban, y en pantalla tampoco aportan.
function limpiar(s) { return s.replace(/\s*\([^()]*\d{1,2}\s+\w{3}[^()]*\)\s*\.?\s*$/, "").replace(/\s+$/, "").replace(/\.$/, ""); }

for (const n of noticias) { n.terminos = [...new Set(raros(n.titular))]; n.bigramas = [...new Set(bigramas(n.titular))]; }

// Raro quiere decir raro: un término que aparece en muchos titulares de la
// misma semana ("millones", "proyecto", "fiscalía") no identifica ningún tema,
// y como la unión es transitiva basta con dos de esos para pegar historias que
// no tienen nada que ver (el primer ensayo del 26-09 juntó treinta noticias en
// un solo bloque por "millones" y "estados unidos"). Se calcula el umbral con
// la semana a la vista y no con una lista fija, que siempre queda corta.
const UMBRAL = Math.max(4, Math.ceil(noticias.length * 0.03));
const frecuencia = new Map();
for (const n of noticias) for (const t of n.terminos) frecuencia.set(t, (frecuencia.get(t) || 0) + 1);
const comunes = new Set([...frecuencia.entries()].filter(([, c]) => c > UMBRAL).map(([t]) => t));
for (const n of noticias) n.terminos = n.terminos.filter((t) => !comunes.has(t));
// Lo mismo con los bigramas: "Estados Unidos" aparece en media semana y no
// dice de qué historia se trata; "Minera Escondida" sí.
const frecBi = new Map();
for (const n of noticias) for (const b of n.bigramas) frecBi.set(b, (frecBi.get(b) || 0) + 1);
for (const n of noticias) n.bigramas = n.bigramas.filter((b) => frecBi.get(b) <= 3);

// ------------------------------------------------------------- agrupamiento
// Dos noticias son el mismo tema si comparten al menos dos términos raros o un
// bigrama de nombres propios. La unión es transitiva (A con B y B con C deja a
// los tres juntos): es lo que permite seguir una historia que va cambiando de
// titular a lo largo de la semana.
// El segundo requisito (un cuarto de los términos del titular más corto) existe
// por los titulares largos de las [B] y [C] del informe: con quince términos
// cada uno, dos coincidencias sueltas son casualidad, y con la unión transitiva
// esa casualidad arrastra media semana a un solo bloque.
const padre = noticias.map((_, i) => i);
const raiz = (i) => (padre[i] === i ? i : (padre[i] = raiz(padre[i])));
const unir = (a, b) => { const ra = raiz(a), rb = raiz(b); if (ra !== rb) padre[Math.max(ra, rb)] = Math.min(ra, rb); };
for (let i = 0; i < noticias.length; i++) {
  for (let j = i + 1; j < noticias.length; j++) {
    const compartidos = noticias[i].terminos.filter((t) => noticias[j].terminos.includes(t));
    const minimo = Math.min(noticias[i].terminos.length, noticias[j].terminos.length);
    const porTerminos = compartidos.length >= 2 && compartidos.length >= Math.ceil(minimo * 0.30);
    const porNombre = noticias[i].bigramas.some((b) => noticias[j].bigramas.includes(b));
    if (porTerminos || porNombre) unir(i, j);
  }
}
const grupos = new Map();
noticias.forEach((n, i) => { const r = raiz(i); if (!grupos.has(r)) grupos.set(r, []); grupos.get(r).push(n); });

// ------------------------------------------------------------------ dossiers
// Un tema con dossier previo en el observatorio ya tiene historia contada: es
// exactamente lo que la Clave de la semana necesita (contexto y hitos).
const DOSSIERS = (() => {
  const dir = path.join(RAIZ, "contenido", "casos");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const primera = fs.readFileSync(path.join(dir, f), "utf8").split("\n")[0].trim();
    return { archivo: `contenido/casos/${f}`, slug: f.replace(/\.md$/, ""), primera, titulo: primera.replace(/^#+\s*/, ""), terminos: [...new Set(raros(primera))] };
  // solo los dossiers de verdad: el índice, los hitos y las listas de trabajo
  // del observatorio también son .md y no son casos.
  }).filter((d) => /^#\s*Caso:/i.test(d.primera));
})();

// --------------------------------------------------------------- ya explicado
// El índice de Claves: AAAA-MM-DD | slug | título.
const INDICE = (() => {
  const ruta = path.join(RAIZ, "contenido", "claves", "indice.md");
  if (!fs.existsSync(ruta)) return [];
  return fs.readFileSync(ruta, "utf8").split("\n").filter((l) => l.includes("|")).map((l) => {
    const [fecha, slug, titulo] = l.split("|").map((s) => s.trim());
    return { fecha, slug, titulo, terminos: [...new Set([...raros(titulo || ""), ...raros((slug || "").replace(/-/g, " "))])] };
  }).filter((e) => e.slug);
})();

// ------------------------------------------------------------------ puntaje
// A=3, B=2, C=1 por noticia; x1,5 si arrastra marca de seguimiento; +1 por
// cada día distinto después del primero (la repetición es lo que más pesa);
// +2 si el observatorio ya tiene dossier del asunto.
const PESO = { A: 3, B: 2, C: 1 };
const temas = [...grupos.values()].map((ns) => {
  const ordenadas = ns.slice().sort((a, b) => a.fecha.localeCompare(b.fecha));
  const dias = [...new Set(ordenadas.map((n) => n.fecha))];
  const base = ordenadas.reduce((s, n) => s + PESO[n.nivel] * (n.seguimiento ? 1.5 : 1), 0);
  // los términos que definen el tema: los raros más repetidos entre sus noticias
  const cuenta = new Map();
  for (const n of ordenadas) for (const t of n.terminos) cuenta.set(t, (cuenta.get(t) || 0) + 1);
  const definen = [...cuenta.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8).map(([t]) => t);
  const dossier = DOSSIERS.find((d) => d.terminos.filter((t) => definen.includes(t)).length >= 2) || null;
  const explicado = INDICE.find((e) => e.terminos.filter((t) => definen.includes(t)).length >= 2) || null;
  const puntaje = base + Math.max(0, dias.length - 1) + (dossier ? 2 : 0);
  // un titular por día: el de mayor nivel de ese día
  const porDia = dias.map((f) => {
    const delDia = ordenadas.filter((n) => n.fecha === f).sort((a, b) => PESO[b.nivel] - PESO[a.nivel]);
    return { fecha: f, nivel: delDia[0].nivel, titular: delDia[0].titular, seccion: delDia[0].seccion };
  });
  return {
    puntaje: Math.round(puntaje * 10) / 10,
    dias, niveles: ordenadas.map((n) => n.nivel), secciones: [...new Set(ordenadas.map((n) => n.seccion))],
    seguimiento: ordenadas.some((n) => n.seguimiento), noticias: ordenadas.length,
    terminos: definen, titulares: porDia,
    dossier: dossier ? { slug: dossier.slug, titulo: dossier.titulo } : null,
    explicado: explicado ? { slug: explicado.slug, titulo: explicado.titulo } : null,
  };
}).sort((a, b) => b.puntaje - a.puntaje || b.dias.length - a.dias.length || a.terminos.join(" ").localeCompare(b.terminos.join(" ")));

const ranking = temas.filter((t) => !t.explicado).slice(0, 10).map((t, i) => ({ puesto: i + 1, ...t }));
const fuera = temas.filter((t) => t.explicado).slice(0, 10);

// ------------------------------------------------------------------- salida
const corto = (s, n = 90) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const celda = (s) => String(s).replace(/\|/g, "/");
const lunesTxt = ddmm(DIAS[0]), sabadoTxt = ddmm(DIAS[5]);

let md = `# Tema de la semana ${SEMANA}: barrido y puntaje\n\n`;
md += `Semana del ${lunesTxt}-${DIAS[0].slice(0, 4)} al ${sabadoTxt}-${DIAS[5].slice(0, 4)} (lunes a sábado). `;
md += `Informes leídos: ${diasConInforme.length} de 6 (${diasConInforme.map(ddmm).join(", ") || "ninguno"}). `;
md += `${noticias.length} noticias agrupadas en ${temas.length} temas.\n\n`;
md += `Cómo se puntúa, en cinco líneas:\n`;
md += `1. Cada noticia aporta el peso de su nivel: [A] vale 3, [B] vale 2, [C] vale 1.\n`;
md += `2. Ese peso se multiplica por 1,5 si la noticia arrastra una marca EN SEGUIMIENTO o PENDIENTE DE CIERRE.\n`;
md += `3. Se suma 1 punto por cada día distinto en que el tema volvió a aparecer, después del primero.\n`;
md += `4. Se suman 2 puntos si el observatorio de la plata pública ya tiene un dossier del asunto.\n`;
md += `5. Quedan fuera del ranking los temas cuyo concepto ya tiene Clave en contenido/claves/indice.md.\n\n`;
md += `Lo calcula scripts/semana.js leyendo los informes del repo; no lo edites a mano. Agrupa por\n`;
md += `palabras compartidas, así que un tema puede arrastrar una noticia que no es del mismo asunto:\n`;
md += `antes de escribir los candidatos hay que contrastarlo con los informes de esos días.\n\n`;
md += `| # | Puntaje | Días | Niveles | Titulares (uno por día) | Secciones | Términos que definen el tema |\n`;
md += `|---|---|---|---|---|---|---|\n`;
for (const t of ranking) {
  const tit = t.titulares.map((x) => `${ddmm(x.fecha)}: ${corto(x.titular, 80)}`).join("<br>");
  md += `| ${t.puesto} | ${String(t.puntaje).replace(".", ",")} | ${t.dias.map(ddmm).join(", ")} | ${t.niveles.join("")} | ${celda(tit)} | ${celda(t.secciones.join(", "))} | ${celda(t.terminos.join(", "))} |\n`;
}
if (!ranking.length) md += `| - | - | - | - | (sin informes de esta semana en el repo) | - | - |\n`;
md += `\n`;
if (fuera.length) {
  md += `## Fuera del ranking porque el concepto ya tiene Clave\n\n`;
  for (const t of fuera) md += `- ${t.terminos.slice(0, 5).join(", ")} (puntaje ${String(t.puntaje).replace(".", ",")}, ${t.dias.length} día(s)): ya explicado: ${t.explicado.slug}\n`;
  md += `\n`;
}
md += `## Detalle de los diez temas\n\n`;
for (const t of ranking) {
  md += `### ${t.puesto}. ${t.terminos.slice(0, 5).join(", ")}\n\n`;
  md += `Puntaje ${String(t.puntaje).replace(".", ",")} · ${t.noticias} noticia(s) en ${t.dias.length} día(s) · niveles ${t.niveles.join("")}`;
  md += t.seguimiento ? ` · con marca de seguimiento` : ``;
  md += t.dossier ? ` · dossier previo: ${t.dossier.slug}` : ``;
  md += `\n\n`;
  for (const x of t.titulares) md += `- ${ddmm(x.fecha)} [${x.nivel}] ${x.seccion}: ${x.titular}\n`;
  md += `\n`;
}

const json = {
  semana: SEMANA, lunes: DIAS[0], sabado: DIAS[5], dias: DIAS, dias_con_informe: diasConInforme,
  generado: hoyChile(), noticias: noticias.length, temas: temas.length,
  pesos: { A: 3, B: 2, C: 1, seguimiento: 1.5, dia_extra: 1, dossier: 2 },
  ranking, fuera_por_ya_explicado: fuera,
};

if (bandera("--sin-escribir")) {
  console.log(md);
} else {
  const dir = path.join(RAIZ, "contenido", "claves", "semana");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${SEMANA}.md`), md);
  fs.writeFileSync(path.join(dir, `${SEMANA}.json`), JSON.stringify(json, null, 2) + "\n");
  console.log(`semana ${SEMANA} (${DIAS[0]} a ${DIAS[5]}): ${diasConInforme.length}/6 informes · ${noticias.length} noticias · ${temas.length} temas · ${ranking.length} en el ranking`);
  if (ranking.length) console.log(ranking.slice(0, 3).map((t) => `  ${t.puesto}. ${String(t.puntaje).replace(".", ",")} · ${t.terminos.slice(0, 4).join(", ")}`).join("\n"));
}
