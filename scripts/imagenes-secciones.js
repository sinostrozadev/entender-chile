// Mapeo sección → imagen (public/fondos/seccion-<nombre>.jpg) para el lado
// Node (dia.js: carátulas). ESPEJO de IMAGENES en src/fondos.tsx (el lado
// Remotion no puede compartir módulo con Node sin tocar el bundler): si
// cambias una lista, cambia la otra igual. Mismo orden, misma semántica.
const IMAGENES = [
  [/cerimedo/, "congreso"],
  [/licencias? m[eé]dicas|contralor|plata p[uú]blica|malversa|fraude/, "plata-publica"],
  [/internacional|mundo|argentin|milei|bolivia|per[uú]\b|ir[aá]n|ormuz|eeuu|ucrania|gaza|china|alemania|estrecho/, "internacional"],
  [/dato curioso/, "dato-curioso"],
  [/salud|hospital|isapre|fonasa|medicament/, "salud"],
  [/educaci|ciencia|universidad|escuela|inteligencia artificial/, "educacion"],
  [/seguridad|polic|fiscal|justicia|corte|delito|carabinero|crimen|homicid|narco|robo|secuestro|c[aá]rcel|condena|\bcaso\b/, "seguridad"],
  [/econom|mercado|bolsillo|empleo|imacec|hipotec|pensi|subsidio|inflaci|\bipc\b|cobre|miner|banc|tasa|d[oó]lar|bono|sueldo|fondos|vivienda|arriendo/, "economia"],
  [/clima|tiempo|aire|alerta|incendio|lluvia|sismo|terremoto|volc[aá]n|medioambiente|tornado/, "clima"],
  [/regi[oó]n|antofagasta|araucan|magallanes|concepci|valpara|[ñn]uble|ays[eé]n|atacama|coquimbo|biob/, "regiones"],
  [/congreso|senado|c[aá]mara|gobierno|reforma|\bley\b|elecci|presiden|minist|feriado|pol[ií]tic/, "congreso"],
];
// Las diez secciones válidas, más deporte, que apareció en los guiones y no
// existía en el sistema (medido el 24-09).
const SECCIONES = ["clima", "economia", "seguridad", "congreso", "salud", "educacion",
  "internacional", "plata-publica", "regiones", "dato-curioso", "deporte"];

// Si el guion DECLARA la categoría entre corchetes, manda esa. El clasificador
// por palabras clave queda solo de respaldo para guiones viejos: medido sobre
// 510 bloques reales, fallaba el 59% de las veces porque busca palabras en un
// titular libre ("Sistema frontal" es clima y no calzaba con nada).
const imagenDe = (texto, categoria) => {
  if (categoria && SECCIONES.includes(String(categoria).toLowerCase())) return String(categoria).toLowerCase();
  const s = (texto || "").toLowerCase();
  for (const [re, f] of IMAGENES) if (re.test(s)) return f;
  return null;
};
module.exports = { imagenDe, SECCIONES };
