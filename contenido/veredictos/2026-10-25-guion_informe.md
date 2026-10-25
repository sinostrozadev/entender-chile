VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-25T05:49:17Z

Observaciones:
- Las tres correcciones de la vuelta 1 quedaron resueltas, verificadas sobre
  esta versión y una por una. La 1: la línea 11 dice "eligen este veinticinco
  de octubre", con la fecha absoluta del informe (su línea 14, "están
  habilitadas para votar este 25-10-2026") resuelta en la misma frase que abre
  el video; la sección queda en treinta y una palabras narradas, dentro del
  rango de 25 a 35. La 2: el bloque de Carabineros narra ahora tres cifras
  habladas (setenta mil, doscientos cuarenta y ocho mil, ciento setenta y ocho
  mil), cumple el tope de tres por bloque y las tres calzan con el informe
  (línea 24: desde $70.000 a $248.000, diferencia de $178.000 mensuales); el
  total anual salió de la voz y no quedó afirmado en ninguna parte. La 3: el
  bloque "Fuentes:" suma las líneas 52 y 53, "- Datafolha, sondeo difundido el
  24-10-2026." y "- Quaest, sondeo difundido el 24-10-2026.", idénticas a las
  líneas 149 y 150 del informe, así que los sondeos que el guion narra en su
  [TESIS] y en su línea 23 ya tienen crédito.
- La corrección no introdujo nada nuevo: el diff entre la versión de las 02:38
  y la de las 02:46 son exactamente esas dos frases reescritas y las dos
  líneas sumadas a Fuentes, nada más. El largo narrado subió de 420 a 423
  palabras, sigue dentro del rango de 420 a 600 y ya no está pegado al piso.
- Sigue en pie, y sin bloquear, lo que ya quedó anotado en la vuelta 1: el
  título de la línea 1 dice "Bolsonaro" a secas mientras el informe distingue
  "Flávio Bolsonaro" en sus líneas 5, 12 y 14, y las marcas [FUENTE] de las
  líneas 9 y 17 pintan "Tribunal Electoral" cuando el nombre completo,
  "Tribunal Superior Electoral de Brasil, 24 oct", cabe en las seis palabras de
  la marca y es el que usa la narración de la línea 20. Ninguna de las dos es
  requisito del prompt.
- Para la próxima edición: la fecha suena dos veces seguidas, en la línea 11
  ("este veinticinco de octubre") y en la línea 14 ("Es veinticinco de
  octubre"). El prompt pide que la Apertura sitúe la fecha y la regla de fecha
  exacta manda donde se cuenta el hecho, así que las dos están bien pedidas,
  pero la Apertura puede situar el día con otra formulación y evitar el eco.
- Qué quedó verificado en esta vuelta, sobre esta versión: node
  scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos"; node
  scripts/validar-tarjetas.js da "4 bloques con fuente, 423 palabras narradas,
  ~3.1 min" y "variedad OK: ninguna cuota rota, ninguna marca malformada";
  cero rayas largas, cero rayas medias y cero signos menos, contados carácter
  por carácter sobre el archivo completo; exactamente tres bloques de noticia,
  con la portada primera, que son las tres [A] del informe (Brasil línea 12,
  Carabineros línea 22, sistema frontal línea 94), sin "## En titulares", sin
  Dato curioso, sin Agenda y sin "¿En qué quedó?"; las tres líneas [TESIS]
  llevan su línea en blanco detrás (19, 30 y 40) y ninguna pasa de dieciocho
  palabras; el formato del contrato está completo en su orden ("Título
  sugerido:", "Descripción sugerida:", las tres carátulas, "Clima de
  carátula:", "Guion:" y "Fuentes:"); la ruta es la exacta del contrato,
  contenido/guiones/informe/2026-10-25.md; y el commit 82bb813 es "edición
  2026-10-25: guion informe", con cuerpo "Tarea: despachador" y tocando un
  solo archivo, el suyo.
