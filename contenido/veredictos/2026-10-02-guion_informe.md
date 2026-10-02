VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-02T05:58:17Z

Observaciones:
- Para la pieza siguiente: el informe del 02-10-2026 sigue sin sección "##
  Agenda", así que el guion cerró sin el bloque que pide el punto 8 de la
  ESTRUCTURA. Lo verifiqué de nuevo sobre esta versión del informe: "agenda"
  aparece una sola vez, en la línea 89, dentro de "agenda estadística". Los
  tres hitos con fecha quedaron dentro de sus bloques (el próximo Imacec el
  02-11-2026, línea 30 del guion; el Informe de Finanzas Públicas el
  06-10-2026, línea 72; la próxima Encuesta Nacional de Empleo el 29-10-2026,
  línea 58). Conviene que el informe de mañana recupere la sección.
- Las ocho correcciones de la vuelta 1 quedaron resueltas, verificadas una por
  una contra el lugar que cada una nombraba, y el diff no tocó nada más: son 7
  líneas agregadas y 9 borradas, exactamente los ocho lugares pedidos. La 1,
  la tarjeta de "La noticia del día", quedó como "[DATO cifra | Banco Central,
  01 oct] actividad económica de agosto, minería -17,4%: -1,0% (baja mal)",
  con el número del título en grande. La 2 y la 3 subieron sus etiquetas al
  piso de ETIQUETA CON CONTEXTO (5 y 6 palabras) y la 3 borró la línea "ref:".
  La 4 y la 6 bajaron los dos números hablados al tope de tres cifras
  significativas, con su aproximación. La 5 dejó una sola tarjeta de tipo
  cifra en el bloque del Servicio Médico Legal y borró la de horas docentes.
  La 7 dejó dos cifras habladas en ese bloque [B]. La 8 dejó el titular en
  diez palabras y una cifra.
- Verificado sobre esta versión, porque las correcciones movían justo eso: las
  cuatro [DATO cifra] (líneas 10, 36, 56 y 86) nunca quedan más de dos
  seguidas, no hay dos tarjetas del mismo tipo seguidas dentro de un bloque, y
  la edición conserva cuatro tipos distintos (cifra, comparacion, barras y
  cambio), con la de barras de la línea 26 y los dos [ESQUEMA] en su lugar.
  Las cifras de las cuatro tarjetas y de los dos párrafos reescritos están en
  el informe: -1,0% y -17,4% en las líneas 15, 17 y 19; las 21 personas
  formalizadas por asociación criminal en la línea 59; las 989.400 personas
  desocupadas y la fuerza de trabajo de 10.263.145 en la línea 91; los 1.571
  millones de pesos y el 34% de ocupación en la línea 75; las 52 salidas desde
  la instalación del Gobierno en la línea 49.
- La tarjeta de la línea 10 separa las dos cifras del mismo hecho con una coma
  ("actividad económica de agosto, minería -17,4%") y la regla del 01-10-2026
  dice "separadas por ' · '". No lo marco como incumplimiento porque la propia
  marca obliga a escribir "etiqueta: valor", así que el " · " no puede ir
  entre las dos cifras sin romper el formato que el parser necesita, y la
  redacción es la que pidió la corrección 1. Para la próxima edición, el
  separador dentro de la etiqueta conviene que sea " · ".
- El bloque de las horas docentes (líneas 90 a 94) quedó sin tarjeta, como
  pidió la corrección 5. Su cifra sigue sonando en la [TESIS], que es lo que
  el prompt permite cuando la variedad obliga a dejar "la cifra sobrante en la
  narración", y el párrafo narrado no se sostiene en una cifra.
- Siguen en pie, sin bloquear, las observaciones de la vuelta 1 que la
  corrección no tocaba: "Dipres" (línea 67) y "TN" (línea 104) se pintan en el
  pie de sus tarjetas sin expandir, aunque están escritas tal como las
  acredita el informe; la última frase del bloque del Servicio Médico Legal
  (línea 88) sigue copiada de la línea 75 del informe y sigue cerrando el
  bloque con una formulación administrativa; y las etiquetas de las tarjetas
  de varios valores siguen en una o dos palabras ("servicios", "comercio",
  "mujeres", "hombres"), como en el propio ejemplo del prompt.
- No se movió nada de lo que la vuelta 1 ya había dado por verificado, y se
  volvió a comprobar sobre esta versión lo que las correcciones podían romper:
  las tres noticias [A] narradas, las veintinueve líneas de titular (una por
  línea, ninguna sobre doce palabras, "Y en titulares:" sola en su línea), las
  diez [TESIS] bajo dieciocho palabras y con su línea en blanco, ningún
  sobrante de línea en blanco donde se borró la tarjeta, cada bloque de
  noticia con su [FUENTE], "Para salir hoy" en la despedida, "El resumen sin
  gritos." como última frase y el archivo sin raya larga ni raya media (cero
  coincidencias en el archivo completo).
