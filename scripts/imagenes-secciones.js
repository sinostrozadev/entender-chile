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
  [/seguridad|polic|fiscal|justicia|corte|delito|carabinero|crimen|homicid|narco|robo|secuestr|c[aá]rcel|condena|\bcaso\b/, "seguridad"],
  [/econom|mercado|bolsillo|empleo|imacec|hipotec|pensi|subsidio|inflaci|\bipc\b|cobre|miner|banc|tasa|d[oó]lar|bono|sueldo|fondos|vivienda|arriendo/, "economia"],
  // EMERGENCIA antes que clima (24-09): un terremoto, un tsunami, una
  // avalancha o una erupción NO son fenómenos del tiempo, son geológicos, y
  // estaban todos cayendo en "clima". Va DESPUÉS de seguridad a propósito,
  // para que un rescate de secuestrados siga siendo seguridad.
  [/emergencia|cat[aá]strofe|desastre|terremoto|sismo|tsunami|erupci[oó]n|volc[aá]n|avalancha|aluvi[oó]n|derrumbe|deslizamiento|incendio|evacua|damnificad|senapred|alerta roja|alerta amarilla|inundaci|anegad|desborde/, "emergencia"],
  // clima es solo el estado del cielo: pronóstico y condiciones, sin
  // víctimas. Se le sacó "alerta" a secas, que se llevaba a clima cosas como
  // "alerta por Listeria" (eso es salud).
  [/clima|tiempo|pron[oó]stico|sistema frontal|lluvia|nieve|nevaz[oó]n|granizo|helada|ola de calor|temperatura|viento|aire|medioambiente|tornado/, "clima"],
  [/regi[oó]n|antofagasta|araucan|magallanes|concepci|valpara|[ñn]uble|ays[eé]n|atacama|coquimbo|biob/, "regiones"],
  [/congreso|senado|c[aá]mara|gobierno|reforma|\bley\b|elecci|presiden|minist|feriado|pol[ií]tic/, "congreso"],
];
// Las diez secciones válidas, más deporte, que apareció en los guiones y no
// existía en el sistema, y más emergencia (24-09, pregunta de Santiago: "¿y
// qué pasa cuando es avalancha?"). Emergencia y clima son cosas distintas:
// clima es el estado del cielo y no hay víctimas; emergencia es que algo
// pasó. Medido sobre 63 días de barrido, las palabras de emergencia
// (sismo, terremoto, tsunami, evacúan, derrumbe, alerta roja…) aparecen unas
// seis veces más que las de pronóstico.
const SECCIONES = ["clima", "emergencia", "economia", "seguridad", "congreso", "salud",
  "educacion", "internacional", "plata-publica", "regiones", "dato-curioso", "deporte"];

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
