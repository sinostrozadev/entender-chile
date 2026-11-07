VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-07T05:39:38Z

Observaciones:
- Para la pieza siguiente: la cadena diaria no tiene pieza después de esta.
  El veredicto final del día va en contenido/revisiones/2026-11-07.md, en esta
  misma corrida.
- Las cinco correcciones de la vuelta 1 quedaron resueltas, verificadas con
  git diff entre las dos versiones de la pieza y con los dos scripts: las
  cuatro líneas [TESIS] (10, 19, 30 y 42) llevan su línea en blanco antes del
  párrafo o de la marca, y revisar-mecanico.js y validar-tarjetas.js no dejan
  hallazgos; "La noticia del día" quedó en dos frases y 26 palabras contadas,
  con una sola marca y su [FUENTE]; el bloque de Paraguay bajó a tres cifras
  habladas (44 senadores, 2,9 millones de clientes y 97%); el bloque del IPC
  bajó a tres (4,5% anual en la [TESIS], y los cien mil y quinientos pesos del
  ejemplo a escala humana, que el prompt pide narrar); y la marca de las 56
  rebajas quedó inmediatamente antes del párrafo que las narra, con el mismo
  tipo, fuente y etiqueta.
- La fecha del hecho de Paraguay, el 06-11-2026 del informe en sus líneas 16 y
  22, ya no suena en ninguna parte del guion: la frase que la traía salió al
  recortar "La noticia del día" por la corrección 2, y la única fecha hablada
  es la del día en la Apertura. No es incumplimiento, porque no se reemplazó
  por una referencia relativa y revisar-mecanico.js no encuentra ninguna, pero
  un oyente puede situar la destitución el 07-11-2026. En el bloque cabe sin
  costo de palabras ("el seis de noviembre" en la línea 22).
- Línea 24, "concentraba buena parte de los depósitos de organismos públicos":
  es la redacción que propuso el veredicto de la vuelta 1 para sacar la cuarta
  cifra, así que no se cobra. Pero el informe dice "concentraba alrededor de
  US$800 millones en depósitos de entidades públicas" (su línea 18) y no dice
  qué proporción del total era ese monto. La próxima vez conviene que la cifra
  salga de la voz hacia la etiqueta de un [DATO], con su unidad pegada al
  número, antes que hacia una magnitud vaga.
- El bloque del IPC quedó en unas 92 palabras narradas, bajo el reparto
  orientativo de 110 a 160 por noticia, y es ahora el más corto de los tres
  (Paraguay unas 139, Justicia unas 135). No bloquea, porque ese reparto es
  orientativo y el tope duro es el total, que queda en 467 dentro de 420 a
  600, pero la segunda noticia perdió desarrollo al sacarle las cifras: lo que
  antes narraba cada división ahora lo resume una línea de once palabras.
- Línea 35, los rótulos del [DATO barras] nuevo ("transporte", "alimentos",
  "vestuario y calzado"), no dicen que son variaciones mensuales de octubre.
  No se cobra porque el ejemplo de la fila 4 del árbol usa rótulos de una
  palabra ("industria -5,1% ; minería -7,2% ; manufactura -4,9%") y porque el
  tipo es el que corresponde. Queda anotado por si la etiqueta con contexto se
  extiende a barras. El rótulo "alimentos" abrevia "Alimentos y bebidas no
  alcohólicas" del informe, sin cambiar el sentido.
- "ABC Color/EFE" se sigue pintando en el [FUENTE] de la línea 18 sin que EFE
  quede expandida antes, y no está entre las siglas de uso corriente que el
  prompt salva. Es el mismo choque anotado en la vuelta 1, el 04-11-2026 con
  CIPER y el 06-11-2026: el tope de seis palabras de esas marcas no deja
  expandirla y el informe la trae así en sus líneas 16 y 18. No se cobra; es
  material para la definición del prompt.
- Carátula 2, "Cayó el banco / cayó el presidente", no nombra Paraguay, a Peña
  ni a Ueno Bank en ninguna de sus dos líneas. Sin cambios desde la vuelta 1 y
  no bloquea, porque el título y la Carátula sugerida, que es la que sale al
  aire, sí nombran a Peña. Queda anotada por si entra en la prueba A/B.
- Verificado y sin hallazgos, para que la aprobación no tape lo que ya estaba
  bien: la selección es la que manda el informe (la portada de Paraguay
  primera y las otras dos [A], IPC y Justicia, en el orden del informe, con
  las siete [B] y las veintiocho [C] solo en la web); tres bloques de noticia y
  ninguno más, sin "En titulares", sin Dato curioso, sin Agenda y sin "¿En qué
  quedó?"; la Apertura tiene 32 palabras, sitúa la fecha y adelanta las otras
  dos sin repetir la portada; el Cierre tiene 58, dice que el informe completo
  está en el enlace de la descripción, integra la línea "Para salir hoy" del
  informe y termina con el tagline exacto; las cuatro [TESIS] están bajo las
  18 palabras (12, 11, 14 y 10); las tres categorías son de las doce
  permitidas y el clima de carátula es una de las seis; las tres carátulas
  tienen dos líneas de cuatro palabras como tope; las etiquetas del [DATO
  cifra] de los 44 senadores y del de las 56 rebajas dicen qué es la cifra y
  en qué situación, y el [DATO comparacion] trae su rótulo propio por valor;
  el [ESQUEMA] de la línea 49 corresponde, porque la noticia de Justicia es de
  proceso, y sale del informe (su línea 46); la variedad no se rompe (cifra,
  comparacion, barras, cifra y esquema, sin dos cifra seguidas ni dos del
  mismo tipo dentro de un bloque); los tres valores del barras y los tres del
  comparacion calzan con el informe (sus líneas 28 y 30); la lista de
  "Fuentes:" trae las doce fuentes de las tres noticias narradas, tal como el
  informe las escribe, y no cuela ningún archivo interno; cero rayas largas o
  medias, cero paréntesis, cero URL y cero conectores de ensayo escrito en el
  texto narrado; la advertencia del ejemplo a escala humana quedó, como pedía
  el veredicto del informe; la cautela de Paraguay suena una sola vez; y el
  reajuste de 8% de la [B] de San Antonio, que el veredicto del informe pidió
  no narrar, no aparece.
