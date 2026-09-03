// Categorías de la web (WEB 1, aprobado por Santiago el 03-09).
// Cada sección del informe se clasifica por su título con las mismas señales
// que usa el video para elegir familia de fondo (src/fondos.tsx), pero al
// nivel editorial: ocho categorías navegables, cada una con su color y su
// imagen de cabecera (public/img/secciones/).
export type Cat = { id: string; nombre: string; color: string; imagen: string };

export const CATEGORIAS: Cat[] = [
  { id: "economia", nombre: "Economía", color: "#8A6F3F", imagen: "economia" },
  { id: "seguridad", nombre: "Seguridad y justicia", color: "#7A5560", imagen: "seguridad" },
  { id: "politica", nombre: "Política", color: "#2F7263", imagen: "congreso" },
  { id: "regiones", nombre: "Chile en regiones", color: "#44546A", imagen: "regiones" },
  { id: "salud", nombre: "Salud", color: "#37716A", imagen: "salud" },
  { id: "educacion", nombre: "Educación y ciencia", color: "#5C5A82", imagen: "educacion" },
  { id: "internacional", nombre: "Internacional", color: "#556B7A", imagen: "internacional" },
  { id: "plata-publica", nombre: "Plata pública", color: "#7A6248", imagen: "plata-publica" },
];
export const catPorId = (id: string) => CATEGORIAS.find((c) => c.id === id) ?? null;

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// Secciones de servicio del informe: no llevan categoría ni franja.
const SIN_CATEGORIA = /^(en una mirada|apertura|la noticia del dia|agenda|ademas|en titulares|dato curioso|cierre|fuentes|.en que quedo|para salir|historia)/;

// El orden importa: la primera que calza gana (plata pública antes que
// seguridad, para que "licencias médicas" no caiga en lo policial).
const REGLAS: Array<[RegExp, string]> = [
  [/contralor|plata publica|fondos publicos|licencias medicas|malversa|convenios|fundaciones/, "plata-publica"],
  [/internacional|mundo|eeuu|estados unidos|argentin|bolivia|peru\b|brasil|venezuela|gaza|ucrania|china|milei|cumbre|foro de/, "internacional"],
  [/region|clima|tiempo|meteoro|incendio|lluvia|alerta|rio |volcan|sismo|terremoto|tornado|emergencia|desastre|concepcion|valparaiso|nuble|antofagasta|araucania|magallanes|aysen|atacama|coquimbo|biobio|los lagos|los rios|maule|o'higgins|tarapaca|arica/, "regiones"],
  [/salud|hospital|isapre|fonasa|medicament|vacuna|virus|pandemia/, "salud"],
  [/educacion|universidad|colegio|escuela|ciencia|investigacion|gratuidad|profesor|\bcae\b/, "educacion"],
  [/econom|imacec|mercado|bolsillo|empleo|desempleo|trabajo|pension|\bpgu\b|subsidio|inflacion|\bipc\b|sueldo|salario|cobre|miner|banco|dolar|tasa|impuesto|hacienda|presupuesto|comercio|litio|energia|fondos generacionales|hipotec/, "economia"],
  [/seguridad|polic|fiscal|justicia|corte|tribunal|delito|crimen|homicid|narco|carabinero|\bpdi\b|carcel|secuestro|megafraude|balacera|condena|sentencia/, "seguridad"],
  [/congreso|senado|camara|gobierno|reforma|\bley\b|constituc|eleccion|presiden|minist|politic|diputad|servel|municip/, "politica"],
];

export function categoriaDe(tituloSeccion: string): Cat | null {
  const t = norm(tituloSeccion);
  if (SIN_CATEGORIA.test(t)) return null;
  for (const [re, id] of REGLAS) if (re.test(t)) return catPorId(id);
  return null;
}
