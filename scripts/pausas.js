#!/usr/bin/env node
/**
 * pausas.js - Cuánto calla el locutor entre secciones, POR TIPO DE PIEZA.
 *
 * Por qué existe (28-09-2026): el 27-09 la pausa de sección subió de 1.200 a
 * 3.000 ms, y la primera a 5.200, por una razón que vale SOLO para el informe:
 * ese silencio es lo único que el viaje de cámara al mosaico tiene para
 * moverse, y la primera pausa además tiene que aguantar la melodía de apertura
 * entera. Con 1.200 ms Santiago lo dijo dos veces: "se movió muy rápido el
 * cambio de sección, no se aprecia nada".
 *
 * Pero la constante estaba escrita dentro de tts-azure.js, que es el
 * sintetizador de TODAS las piezas, así que el Short y el exprés se comieron
 * el cambio sin pedirlo. Medido sobre lo que se estaba produciendo hoy:
 *
 *   el exprés del 28-09 (660 caracteres):  3,6 s de silencio  ->  11,2 s
 *   el Short del informe del 28-09 (555):  7,2 s de silencio  ->  20,2 s
 *
 * Veinte segundos de silencio en una pieza cuya voz dura cuarenta. Santiago lo
 * vio en el aire: "tarda un montón entre puntos en el short y en el exprés".
 * El vertical no tiene viaje de cámara ni melodía de apertura que esperar: su
 * corte entre bloques es instantáneo, así que no hay nada que llenar.
 *
 * Acá viven los números de cada pieza. Es lo que el taller va a editar cuando
 * se le construya la pantalla: hoy se cambian en este archivo y mañana en la
 * pantalla, pero el lugar único ya existe y no vuelve a haber una constante
 * escondida en el sintetizador.
 */
const PAUSAS = {
  // El informe y la Clave: videos largos con recorrido de cámara entre
  // secciones. El silencio ES el viaje.
  informe: { seccion: 3000, intro: 5200 },
  clave: { seccion: 3000, intro: 5200 },
  // El Short y el exprés: verticales de menos de un minuto, corte seco entre
  // bloques. Son los valores que corrieron semanas sin una queja, hasta el
  // 27-09. La primera no es distinta: no hay presentación que esperar.
  short: { seccion: 1200, intro: 1200 },
  expres: { seccion: 1200, intro: 1200 },
};

// EL TALLER MANDA, SI DIJO ALGO (28-09-2026). contenido/config/trabajos.json
// es lo que Santiago configuró en la pantalla del taller, bajado al repo
// (ver contenido/config/README.md: la base del taller vive en claude.ai y
// GitHub Actions no la puede leer, así que el puente es un archivo).
//
// Si el archivo falta, está roto o no trae esta pieza, manda la tabla de
// arriba y no pasa nada más. Esto corre a las tres de la mañana sin nadie
// mirando: un JSON mal escrito no puede costar la edición del día.
const fs = require("fs");
const path = require("path");
const RUTA = path.join(__dirname, "..", "contenido", "config", "trabajos.json");
const delTaller = (pieza) => {
  try {
    const cfg = JSON.parse(fs.readFileSync(RUTA, "utf8"))[pieza];
    if (!cfg) return null;
    const seccion = Number(cfg.pausaSeccionMs);
    const intro = Number(cfg.pausaIntroMs);
    // un cero o un negativo no es una pausa, y medio minuto tampoco: fuera de
    // ese rango se ignora el valor y manda el del código
    const sano = (n) => Number.isFinite(n) && n >= 0 && n <= 30000;
    if (!sano(seccion) || !sano(intro)) {
      console.warn(`pausas.js: ${RUTA} trae pausas fuera de rango para "${pieza}", uso las del código.`);
      return null;
    }
    return { seccion, intro };
  } catch (e) {
    if (e.code !== "ENOENT") console.warn(`pausas.js: no pude leer ${RUTA} (${e.message}), uso las del código.`);
    return null;
  }
};

// Lo que hay que pasarle a tts-azure.js para que hable como esa pieza.
//
// Una pieza que no esté en la tabla AVISA y sigue con los números del informe,
// no rompe: esto corre a las tres de la mañana y sin nadie mirando, y quedarse
// sin edición por un número de pausa sería cambiar un defecto de tres segundos
// por un video que no existe. El aviso queda en el log de la corrida.
const entornoDe = (pieza) => {
  if (!PAUSAS[pieza]) {
    console.warn(`pausas.js: no conozco la pieza "${pieza}", uso las del informe. Son: ${Object.keys(PAUSAS).join(", ")}.`);
  }
  const p = delTaller(pieza) || PAUSAS[pieza] || PAUSAS.informe;
  return { PAUSA_SECCION_MS: String(p.seccion), PAUSA_INTRO_MS: String(p.intro) };
};

module.exports = { PAUSAS, entornoDe };

if (require.main === module) {
  const pieza = process.argv[2];
  if (pieza) console.log(JSON.stringify(PAUSAS[pieza] || null));
  else Object.entries(PAUSAS).forEach(([k, v]) => console.log(`${k.padEnd(8)} sección ${v.seccion} ms · primera ${v.intro} ms`));
}
