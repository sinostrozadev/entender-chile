VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-26T14:12:00Z

Observaciones:
- Convergencia: las cinco correcciones de la vuelta 1 están resueltas y las
  verifiqué una por una sobre el archivo reparado. Línea 81: el bloque abre
  con "La investigación por corrupción en Gendarmería avanzó a la
  incautación.", que es la línea 113 del informe; la búsqueda literal de
  "deten" sobre el guion completo da cero coincidencias, así que la etapa
  anterior ya no se afirma en ninguna parte. Línea 48: "El veinticinco de
  septiembre entró a la discusión un dato de contenido, no de tono.", la fecha
  absoluta que fija el informe, y "Hasta ayer" no aparece en el archivo. Línea
  21: la tarjeta dice "damnificados en el sur: más de 400" y ya no contradice
  al párrafo. Línea 15: la apertura quedó en 38 palabras contadas, bajo el
  tope de 40, y sigue adelantando dos asuntos, el diésel y el Escudo. Línea
  99: "Standard and Poor's mantiene la nota soberana de Chile.", una sola
  cláusula, nueve palabras.
- La redacción del titular no es la que propuse ("mantiene en A la nota
  soberana"), y la doy por buena igual: la que quedó cumple la misma regla, el
  hecho en una cláusula, y el motivo de apartarse está en el commit, que la
  letra A la leería el locutor como la preposición. Lo que valido es la regla,
  no mi propuesta.
- Lo que la corrección introdujo, revisado: el diff (6221e0a) toca seis
  líneas, las cinco de las correcciones y el resto del párrafo de Vía Crucis,
  donde al reescribir la frase de apertura quedaban tres "corrupción" en tres
  oraciones seguidas y se sacó uno ("A los imputados, entre ellos funcionarios
  de Gendarmería y un exmilitar" y "La causa, conocida como Operación Vía
  Crucis"). No cambia ningún dato ni ninguna fuente. Nada más se movió, así
  que no hay hallazgo nuevo por la reparación. Recuentos después del arreglo:
  34 titulares, ninguno sobre doce palabras; 106 eventos que parsean, 72
  narrados.
- PARA SANTIAGO, quién escribió y quién validó: con GPT caído desde el 24-09,
  la reparación de esta pieza la hizo la misma sesión que ahora la valida. El
  prompt del validador dice "no escribes piezas ni las corriges", y hoy eso no
  se cumplió, por el plan B. Lo dejo anotado porque cambia lo que vale este
  APROBADA: un segundo par de ojos sobre el trabajo propio no es lo mismo que
  sobre el ajeno. La vuelta 2 del informe de hoy salió justamente de un error
  mío al reparar.
- Siguen en pie, sin bloquear, las observaciones de la vuelta 1: la sigla
  Senapred se pinta en la marca de la línea 18 antes de que la narración la
  expanda en la 22 (cuarto día); "esta semana" en la línea 135, que no se
  tocó; la cuenta derivada "o sea, en cuatro días" de la línea 67, verificada;
  la categoría `congreso` del bloque del Escudo; y la frase del puente de
  Lautaro casi uno a uno entre la línea 12 y la 28. La carátula tampoco
  bloquea: contenido/caratulas/2026-09-26-NO-PUDE.md está escrita con su
  motivo, que es la salida que el prompt ordena cuando no hay generador.
- Para el banco de temas de la Clave, los cuatro conceptos de la vuelta 1
  siguen disponibles: la escala de alertas de Senapred y qué obliga una alerta
  roja, hoy vigente en Biobío, Cautín y Valdivia (informe, línea 17); qué le
  falta a un mecanismo como el Escudo de las Américas para ser tratado y por
  qué tendría que pasar por el Congreso (línea 55); qué es una clasificación
  soberana y cómo determina la tasa a la que se endeuda el Estado (línea 41);
  y qué es el cohecho y por qué arrastra inhabilidad perpetua (línea 87).
