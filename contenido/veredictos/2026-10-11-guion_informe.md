VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-11T06:24:40Z

Observaciones:
- Para la pieza siguiente: nada. El guion del informe cierra la cadena diaria,
  así que no hay pieza posterior que preparar. Con esta aprobación la cadena
  del 11-10-2026 queda completa y el veredicto final del día va en
  contenido/revisiones/2026-10-11.md en esta misma corrida.
- Las seis correcciones de la vuelta 1 quedaron resueltas, comparadas una por
  una contra la versión anterior (commit 46e8cea) y la de ahora (c447358) en
  esta corrida. El diff toca exactamente seis líneas, las seis que el veredicto
  nombró, y ninguna otra: (1) la línea 61 narra "más de cuatrocientos treinta y
  siete mil puestos" y "más de treinta y dos mil empresas", las dos con
  marcador de aproximación y dentro de las tres cifras significativas, mientras
  la marca [DATO cifra] de la línea 60 conserva 437.611 sola, sin que se le
  agregara 32.290; (2) el titular de la línea 116 quedó "El Gobierno informó
  más de mil ochocientas expulsiones acumuladas.", nueve palabras y una cifra,
  fiel al acumulado de 1.874 personas de la línea 61 del informe; (3) el de la
  línea 117 quedó "Un operativo con Bolivia recuperó veintitrés vehículos.",
  siete palabras, una cifra y una cláusula; (4) el de la línea 138 quedó "El
  Ejecutivo anunció la compra de radares meteorológicos.", ocho palabras, con
  el verbo "anunció" tal como lo trae la línea 181 del informe; (5) la frase
  sobre economías lejanas al conflicto salió del bloque de Riad, que ahora
  cierra en el hecho del precio internacional del petróleo, tomado de la línea
  207 del informe; (6) la marca de la línea 19 quedó "[FUENTE Gobierno de
  Chile, 10 oct; La Tercera, 10 oct]", cinco y cuatro palabras, las dos bajo el
  tope de seis.
- La corrección no rompió nada de lo que la vuelta 1 había dejado verificado,
  comprobado en esta corrida sobre la versión nueva: el bloque de Riad queda
  con cuatro frases narradas, dentro de las tres a cinco de una noticia [B], y
  termina en un hecho y no en síntesis abstracta; los titulares siguen siendo
  32, uno por línea, con un máximo de 12 palabras (cinco llegan justo a 12);
  quitar "veinte detenidos" y la hebra de la plataforma chilena no dejó ninguna
  noticia del informe sin sonar, porque el operativo con Bolivia y el debate de
  radares son una noticia cada uno y cada uno conserva su frase; y el recorte
  del [FUENTE] de la línea 19 no dejó medios sin crédito, porque Radio
  Universidad de Chile y Gobierno de Chile conservan su línea en "Fuentes:"
  (líneas 219 y 199, buscadas una por una).
- Duración: 1.571 palabras narradas, unos 10,5 minutos, dentro del "en torno a
  10 minutos". Bajó cuatro palabras respecto de la versión anterior, por la
  frase que salió del bloque de Riad.
- Siguen en pie, sin bloquear, las mismas observaciones que dejó la vuelta 1 y
  que la corrección no tocaba: las cuatro marcas [DATO] usan solo dos tipos,
  cifra y comparacion, contra el "al menos tres tipos distintos por edición",
  con el árbol bien aplicado marca por marca y con el propio prompt diciendo
  que "la cuota es una alarma, no una obligación"; los 20 focos de Aedes
  aegypti de la línea 149 del informe y los US00 millones de Panamá de su
  línea 211 se quedaron fuera de la voz y de la pantalla, conservando el
  sentido, y cualquiera de las dos daría el tercer tipo de la cuota; "FIBE" y
  "OCDE" se pintan en una [TESIS] antes de su expansión, que llega en la
  narración inmediatamente después (líneas 25 y 72), y el alcance de la regla
  de siglas está escrito para [FUENTE] y para el pie de un [DATO]; "## Dato
  curioso" va sin corchete de categoría y el lugar de "¿En qué quedó?" después
  de la Agenda sigue sin estar fijado por el prompt; y los cierres de bloque de
  las líneas 35, 54 y 65 quedan cerca de la síntesis abstracta sin cruzarla.
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Búsqueda explícita aparte en el archivo completo: cero
  rayas largas y cero rayas medias.
