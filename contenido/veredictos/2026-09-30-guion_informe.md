VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-30T05:48:59Z

Observaciones:
- Para la pieza siguiente: el cierre pendiente que dejó el informe del
  29-09-2026, la variación oficial de precios de combustibles, vence el
  01-10-2026, así que es obligatorio en la edición de mañana. Lo anotaron ya
  los veredictos de la preselección y del informe de hoy.
- Para la pieza siguiente: la edición vuelve a quedar con dos tipos de tarjeta,
  comparacion y cifra, y la causa está en la entrada, no en el guion. De las
  diez noticias narradas solo una trae dos valores de la misma unidad (los
  110 millones de pesos del caso de Maipú y su promedio mensual). No es
  incumplimiento, por lo mismo que se anotó el 28 y el 29-09-2026: el prompt
  pone el árbol de tipos sobre la cuota y dice que "la cuota es una alarma, no
  una obligación". Si el informe trajera, para alguna noticia narrada, un antes
  y un después del mismo indicador o dos cifras comparables en la misma unidad,
  la edición tendría su tercer tipo sin forzar nada. Las listas de espera no
  GES y el dólar son los dos candidatos naturales y hoy llegaron sin cifra.
- Para la pieza siguiente: "Confusam" (línea 67) y "CIPER" (línea 73) se pintan
  en el pie de las tarjetas de sus bloques sin expandirse en ninguna parte del
  guion, y ninguna está entre las siglas de uso corriente que el prompt salva.
  No lo levanto, por lo mismo que en la vuelta 1: "CIPER" pasó igual el
  29-09-2026 y sumar la regla dentro de un veredicto de corrección habría sido
  cambiar el estándar a mitad del bucle. Para la próxima edición,
  "Confederación de Funcionarios de Salud Municipal (Confusam)" en la narración
  deja el pie acreditado.
- Para la pieza siguiente: sigue en pie lo de la vuelta 1 sobre el clima de
  carátula. "Clima de carátula: grave" (línea 6) convive con el bloque de
  portada declarado "[clima]" (línea 17), y el prompt llama a esos dos tonos
  opuestos. No es incumplimiento porque la palabra queda al criterio de quien
  escribe, pero los días anteriores con "grave" (25, 26 y 27-09-2026) tenían
  alerta roja, evacuados o aislados, y la portada de hoy es un cierre
  preventivo sin víctimas ni daños.
- Las seis correcciones de la vuelta 1 se verificaron una por una sobre esta
  versión (commit 80e17ce), y el diff contra la anterior cambia solo esas seis
  cosas, cinco líneas reemplazadas y dos marcas eliminadas:
  1) La carátula 2 quedó "Los Libertadores cerrado / Reapertura sin fecha"
     (línea 4), tres y tres palabras, y ahora sí es un giro: el cierre
     preventivo está en la línea 16 del informe y la reapertura sigue sin fecha
     en las líneas 18 y 282, condicionada a la evaluación de la ruta.
  2) La carátula 3 quedó "Pasajeros y carga / sin paso a Argentina" (línea 5),
     tres y cuatro palabras, segundo giro y no repite la pregunta de la
     carátula 1. Se sostiene en la línea 16 del informe, "efecto inmediato
     sobre viajes y transporte de carga entre Chile y Argentina".
  3) Las dos etiquetas de la marca comparacion (línea 39) quedaron en seis
     palabras cada una, "pagos a la exfuncionaria de Maipú" y "promedio mensual
     estimado en 48 meses", dentro del rango de tres a ocho y con la situación
     dicha. Verificadas contra las líneas 76 y 78 del informe.
  4) Quedan dos marcas "[DATO cifra]" en todo el guion (líneas 48 y 61), con lo
     que se cumple el tope de dos seguidas. Se eliminaron la de la duración del
     paro, que se sigue narrando en la línea 70, y la de la droga incautada,
     cuya magnitud va hablada en la [TESIS] de la línea 80 y cuyo avalúo se
     narra en la línea 82. Los dos bloques conservan su [FUENTE] y "Fiscalía de
     Chile" mantiene su línea en "Fuentes:" (línea 170), así que nada quedó sin
     crédito. Es el remedio que da el propio prompt, "deja la cifra sobrante en
     la narración", y no se agregó ninguna tarjeta nueva.
  5) El bloque "## ¿En qué quedó?" trae ahora "[FUENTE Corte de Apelaciones,
     29 sep]" (línea 91), cinco palabras, tomada de la línea 273 del informe.
  6) "Portal Red Salud, 29 sep 2026." quedó en la lista "Fuentes:" (línea 171),
     tal como aparece en las líneas 277 y 323 del informe, que es de donde sale
     el dato del robot MARS del bloque "## Dato curioso".
- La reescritura no introdujo nada nuevo que incumpla: se revisó línea por línea
  lo que el diff toca y su entorno. Las tres carátulas siguen dentro del tope de
  cuatro palabras por lado y son tres enfoques distintos (pregunta, giro, giro);
  la marca de la línea 39 mantiene sus dos valores en numerales y su fuente con
  fecha; los once bloques de noticia siguen con su [FUENTE] en la línea
  siguiente al encabezado y sus once [TESIS] con línea en blanco después; los
  bloques de estructura siguen sin corchete de categoría; el [ESQUEMA] de la
  línea 31 sigue en su lugar para la noticia de proceso del día; no hay raya
  larga ni media en las 171 líneas (cero coincidencias de U+2014 y U+2013 en el
  archivo completo); y el archivo cierra con el tagline exacto "El resumen sin
  gritos." después de la despedida que integra "Para salir hoy".
