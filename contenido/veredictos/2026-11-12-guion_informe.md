VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-13T02:43:46Z

Observaciones:
- Para la pieza siguiente: el orden de los tres bloques no se hereda del
  informe. Esta vuelta se gastó entera en eso, y es la segunda vez en dos días
  que la alerta vigente por calor queda detrás de una noticia económica
  especializada (el 11-11-2026 quedó tercera, y es el caso que el propio prompt
  cita en el punto 3a). La pregunta que decide el segundo bloque es cuál le
  cambia el día a alguien hoy, no cuál trae la cifra más grande ni cuál viene
  primero en el informe. Una alerta declarada con una indicación para las
  próximas horas gana siempre a una definición macroeconómica.
- Para la pieza siguiente: en una marca [DATO cambio] los dos valores van bajo
  UN solo rótulo ("etiqueta: valor1 -> valor2"). Verificado otra vez con
  scripts/parse.js sobre la versión corregida: ahora la serie sale con
  etiqueta "mediana de crecimiento esperado para 2026", 0,2% y 0,0% con
  tendencia de baja mal, que es la tarjeta que se quería. Con un rótulo propio
  por valor, el parseo dejaba el segundo sin etiqueta y pintaba el año.
- Para la pieza siguiente: toda sigla que se pinte en pantalla va expandida la
  primera vez, y la marca [FUENTE] admite seis palabras, así que la expansión
  tiene que caber ahí. "Prevención de Desastres (Senapred), 12 nov" mide
  exactamente seis y resolvió el caso sin tocar el cuerpo.
- Las tres correcciones de la vuelta 1 quedaron ejecutadas y el diff entre
  728ce61 y 7ef0c13 no tocó nada más: los bloques
  segundo y tercero intercambiados sin reescribir una palabra de su texto, la
  Apertura nombrando el calor antes que la recesión para no quedar al revés
  del desarrollo, la marca [DATO cambio] con un rótulo y dos valores, y la
  fuente de Senapred expandida.
- Lo verificado de nuevo sobre el archivo guardado, porque la corrección movió
  bloques y podía romperlo: 483 palabras narradas (420 a 600), tesis de 63,
  109, 106 y 106 caracteres con suma de 384 (la primera bajo su tope de 66, las
  tres de bloque dentro de 105 a 118, la suma dentro de 365 a 423), las cuatro
  con 18 palabras o menos, línea en blanco después de cada tesis, el bloque de
  portada como el más largo (133 palabras contra 125 y 103), la noticia del día
  en 34 palabras, la apertura en 29 y el cierre en 59. Las tarjetas quedaron de
  cuatro tipos distintos (comparacion, esquema, cifra, cambio) sin dos cifras
  seguidas. Sin hallazgos en scripts/revisar-mecanico.js y sin rayas.
- La selección no admitía elección: el informe trae exactamente tres [A], la
  portada declarada 9/10 en su línea 10, la recesión técnica de la línea 56 y
  la Alerta Roja por calor de la línea 108, y las tres son las narradas. La
  base del [DATO cambio] sigue siendo la vigente (octubre), no el 2,5% de
  enero, como pide el punto 17c. Las cifras del bloque que subió al segundo
  lugar calzan con el informe: 38 grados, comunas de Atacama y Antofagasta, y
  la ventana de las once a las diecisiete como seis horas continuas.
- La Apertura sigue diciendo "dos señales": el prompt pide no anunciar cuántas
  noticias vienen, y nombrarlas ya basta. Queda como observación por segunda
  vez y no bloquea, porque es una parte que la vuelta 1 no marcó como INCUMPLE.
- El cierre enumera las tres noticias en el orden viejo (paro, actividad
  económica, calor) mientras el desarrollo va paro, calor, actividad. El prompt
  solo le pide conectar las tres por hechos concretos, así que cumple y no se
  marca, pero el que corrige un orden conviene que mire también las dos frases
  que lo resumen.
- El primer bloque sigue repitiendo tres hechos que ya dio la noticia del día
  (la reunión sin acuerdo, el congelamiento hasta febrero, rutas y puertos), sin
  frases literales. Se anotó igual en la vuelta 1 y no bloquea: el retiro del
  proyecto y lo que pidió el Presidente están en el informe y el bloque los usa
  recién en el tercer párrafo.
- Pendiente de repo y no de la pieza, cuarto día seguido: validar-tarjetas.js
  avisa por la falta de "Carátula sugerida:" y no es incumplimiento, porque el
  propio prompt cierra ese bloque con "Desde el 04-11-2026 no se pide carátula
  del día", existe contenido/estado/sin-video-informe.txt y estado.yml salta el
  pedido con ese marcador. La contradicción sigue en pie: el prompt mantiene
  las tres carátulas y el "Clima de carátula:" como líneas tercera a sexta de
  FORMATO DE SALIDA, y el script las exige desde el 05-09-2026. Es trabajo de
  la sesión de día sobre el prompt o sobre el script.
