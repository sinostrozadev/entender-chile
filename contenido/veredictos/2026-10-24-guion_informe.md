VEREDICTO: APROBADA
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-24T06:30:00Z

Observaciones:
- Para la pieza siguiente: el informe trae dos cifras que el guion dejó fuera y
  que caben sin romper el tope de tres cifras habladas por bloque. En la
  cordillera de Coquimbo se advirtieron ráfagas de hasta 90 kilómetros por hora
  (informe línea 117), que es la cifra que le falta a la advertencia con que
  cierra el bloque del sistema frontal. Y el dólar "cerró la semana en su mayor
  nivel desde abril de 2025" (informe línea 57), que es el caso para el que
  existe la línea opcional " | ref:" de la marca cifra. Las dos van en esta
  lista desde la vuelta 1 y siguen sin usarse.
- El título dice "agresores de menores" donde el informe y su noticia de
  portada dicen "agresores sexuales de menores" (informe líneas 11 y 15). Las
  tres carátulas sí traen el grupo completo, así que la regla del gancho del
  23-10-2026 queda cumplida y esto no bloquea; recuperar "sexuales" dejaría el
  título con el mismo sentido que la entrada.
- Carátula 3, "56 rebajas a agresores / sexuales de menores": el corte entre
  las dos líneas parte la frase al medio, y en pantalla se pintan como dos
  cajas separadas. Las dos primeras cortan en un punto natural.
- Línea 40, "A ese valor, una compra internacional de cien dólares": el valor
  al que remite no suena en la voz, porque el dato exacto del dólar quedó solo
  en la tarjeta de la línea 38 y la [TESIS] dice "cerca de mil pesos". Se
  arregla nombrando el valor aproximado en el propio párrafo, sin sumar una
  cuarta cifra hablada.
- Línea 50, "cifras parciales difundidas antes": el informe fecha esas cifras
  parciales de 300 y 735 viviendas el 22-10-2026 (informe línea 113). Con la
  fecha se evita una referencia relativa en un dato que la entrada sí fecha.
- Líneas 45 y 48, "Senapred" en la marca [FUENTE] y en el pie del [DATO]: la
  sigla se pinta en pantalla sin expandirse y no es de las de uso corriente que
  el prompt exime. El tope de seis palabras de esas marcas no deja expandirla
  ahí, así que el lugar es la narración de la línea 50. Lo mismo con "Equipos
  del Serviu" en la línea 52, que un oyente general puede no conocer.
- Línea 42, el párrafo del swap: el informe lo acredita a "Banco Central de
  Chile, 23-10-2026; CNN Chile y BioBioChile, 23-10-2026" (informe línea 59) y
  la lista "Fuentes:" no trae CNN Chile. Es la única fuente del informe cuyas
  noticias se narraron que quedó sin su línea. Queda como observación y no como
  incumplimiento porque así se anotó en la vuelta 2, y la convergencia no deja
  convertir en bloqueante lo que la vuelta anterior no marcó.
- Qué se corrigió en esta vuelta y cómo quedó: el diff contra la versión
  anterior toca exactamente los dos lugares que pedía la vuelta 2 y ninguno
  más, así que la corrección no pudo introducir nada nuevo. La corrección 1
  (cierre sin despedida) quedó con la redacción que el propio veredicto dejaba
  verificada: "En Santiago, viste por capas: la mañana ronda once grados. Nos
  encontramos mañana en Entender Chile. El resumen sin gritos.", con el cierre
  en 59 palabras narradas sobre un tope de 60 (contadas una por una) y el
  tagline exacto como última frase hablada. La corrección 2 (el desglose sin
  marca) entró como "[DATO comparacion | EL PAÍS, 23-10-2026] rebajas por abuso
  sexual de menores: 27 decretos ; rebajas por violación de menores: 29
  decretos", en el bloque de las rebajas y justo antes del párrafo que narra
  esos números, con el 56 quedándose solo en la tarjeta de "La noticia del día"
  como pedía la vuelta 1: tipo comparacion por la fila 6 del árbol, cada valor
  con su rótulo y su unidad pegada, etiquetas de seis y cinco palabras, fuente
  de tres, y fiel al informe (línea 19, "27 a condenados por abuso sexual y 29
  por violación de menores").
- Verificado sobre esta versión y no heredado: scripts/revisar-mecanico.js
  imprime "sin hallazgos mecánicos"; scripts/validar-tarjetas.js da 511
  palabras narradas (de 420 a 600) y "variedad OK", con cifra 3, esquema 1 y
  comparacion 1, sin dos tarjetas cifra seguidas dentro de un bloque;
  scripts/parse.js devuelve el título, las tres carátulas y el clima, con lo
  que la corrección 1 de la vuelta 1 sigue en pie; las tres [TESIS] tienen 13,
  16 y 13 palabras, bajo el tope de 18, cada una con su línea en blanco
  después; las seis líneas de carátula respetan las cuatro palabras por línea;
  cero rayas largas o medias; y la selección sigue correcta, la portada primero
  y las dos [A] siguientes del informe (el dólar con el swap y el sistema
  frontal), con Brasil fuera por ser la cuarta [A], que no es omisión.
