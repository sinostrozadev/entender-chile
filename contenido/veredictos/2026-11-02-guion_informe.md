VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-02T05:42:00Z

Observaciones:
- Las cuatro correcciones de la vuelta 1 quedaron resueltas, comprobadas una
  por una contra el diff a49960a..1b6d7dd, que no toca ninguna otra línea de la
  pieza. La primera frase narrada de "La noticia del día" recuperó la
  atribución y el modo del informe ("Según Sernatur, el grupo habría ingresado
  por un sector no habilitado", línea 12), que el informe sostiene con esas
  mismas palabras en su línea 18. La carátula 2 (línea 4) y la carátula 3
  (línea 5) quedaron como se pidieron: cuatro y cuatro palabras la primera,
  cuatro y tres la segunda, y las dos traen ahora el objeto de la noticia, la
  balsa. El esquema del segundo bloque (línea 42) describe el trámite que el
  informe sí relata, con sus cuatro elementos tomados de las líneas 26 y 28 del
  informe, en lugar de la secuencia que el informe desmiente ("Ambos caminos,
  la responsabilidad política del ministro y el cambio legal, continúan por
  separado", línea 32 del informe).
- Ninguna corrección movió un tope: validar-tarjetas.js da 477 palabras
  narradas, dentro de 420 a 600; el cuerpo de "La noticia del día" queda en 28
  palabras y dos frases, dentro de las 25 a 35 que pide la estructura; la
  edición sigue con dos esquemas, que es el máximo por edición; y
  revisar-mecanico.js no encontró hallazgos.
- La carátula 2 quedó con dos puntos dentro del texto ("Sernatur: sector no
  habilitado"), que es la forma que tomó la atribución. No rompe el parser, y
  se comprobó corriendo scripts/parse.js sobre la pieza: devuelve las tres
  carátulas completas y la segunda se parte en "Sernatur: sector no habilitado"
  y "Trece en una balsa". La regla de la línea 176 de scripts/parse.js captura
  todo lo que sigue al primer "Carátula 2:", así que el segundo dos puntos
  viaja dentro del texto.
- Quedan en pie, sin bloquear, las cuatro observaciones de la vuelta 1 sobre
  partes que la corrección no tenía que tocar. La marca [DATO comparacion] de
  la línea 38 mezcla dos rótulos de unidad distinta (decretos y solicitudes) en
  una comparación que el árbol pide con la misma unidad. El guion nunca dice
  cuándo ocurrió el accidente: el informe lo fecha el 01-11-2026 y el video
  sale el 02-11-2026, así que quien escuche puede entender que fue hoy. "antes
  del treinta y uno de enero" (línea 52) omite el año que el informe sí fija,
  el 31-01-2027. Y "El Gobierno ya suspendió la tramitación de nuevos decretos"
  (línea 44) atribuye al Gobierno en general lo que el informe atribuye al
  Ministerio de Justicia (línea 30).
- Para el próximo validador, porque estuvo a punto de costar un hallazgo falso
  en la vuelta 1: scripts/validar-tarjetas.js no cuenta las líneas "[TESIS]"
  como palabras narradas, porque filtra todo lo que empieza con corchete
  (línea 90). Con ese criterio, que es el que manda el prompt del validador, el
  cuerpo de "La noticia del día" son 28 palabras y el total 477. Contando las
  tesis serían 43 y 535, y el reparto orientativo del prompt cuadra con el
  criterio del script.
