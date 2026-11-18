VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-18T06:22:52Z

Observaciones:
- Para la pieza siguiente: en la cadena diaria no queda pieza de GPT después de
  esta, así que estas observaciones son para la próxima edición.
- Para la pieza siguiente: las ocho correcciones de la vuelta 1 quedaron
  resueltas y la corrección no introdujo ningún incumplimiento nuevo. Una por
  una: las tres categorías de bloque son ahora `seguridad`, `regiones` y
  `congreso`, las tres de la lista de doce, y validar-tarjetas cuenta cuatro
  bloques con fuente donde antes contaba cero secciones de noticia; la Apertura
  (línea 14) mide 29 palabras, sitúa la fecha, adelanta solo las otras dos
  noticias y ya no cuenta cuántas vienen; la Descripción (línea 2) agrega la
  frase con Kast y Xi, la apertura del DS1 a las 08:30 y la rebaja de
  combustibles del 19-11-2026, y queda en dos frases; el bloque de la portada
  pasó de 103 a 146 palabras narradas y es el más largo de los tres (127 los
  campamentos, 134 Sala Cuna), con la inhabilidad sobreviniente, el efecto
  distinto de cada sentencia, las investigaciones ordenadas por Contraloría y la
  nómina que no equivale a una destitución automática, todo de las líneas 19 y
  21 del informe y sin sumar una sola cifra hablada; la línea 20 es ahora la
  tarjeta `cifra` con el 315 del título y el 317 en la etiqueta, y la
  `comparacion` de la línea 26 dice de quiénes son esas condenas; la frase sobre
  publicar rutas de evacuación y responsables, que el informe traía en la
  noticia de Kast y Xi y no en la de campamentos, salió, y su lugar lo ocupan el
  acceso de carros, el agua y las vías de evacuación limitados (línea 39 del
  informe) y la ejecución local de los cortafuegos (línea 45); el cierre abre
  con una frase de síntesis que nombra los tres hechos concretos; y "La noticia
  del día" bajó de 40 a 34 palabras contando la [TESIS].
- Línea 62: al agregar la síntesis, la frase del enlace se acortó de "El informe
  completo, con todas las noticias y sus fuentes, está en el enlace de la
  descripción" a "El informe completo está en el enlace". No bloquea, porque la
  frase sigue diciendo que el informe completo está en el enlace, que es lo que
  piden el punto 8 y el punto 15 del control interno. Pero no hacía falta
  recortar: el cierre mide 50 palabras contra un techo de 60, y así lo decía la
  corrección 7 de la vuelta 1. "en el enlace de la descripción" cabe entero.
- Línea 28, "Carabineros concentró la mayor cantidad institucional de casos": el
  informe da 84 casos en Carabineros, 22 en el Ejército y ocho en la Armada
  (línea 17) y no afirma que sea la mayor entre todos los organismos. Igual que
  en la vuelta 1, no bloquea porque se sigue de las cifras que el informe trae,
  y "la mayor cantidad entre las instituciones informadas" sería exacto.
- Línea 36, etiqueta "campamentos monitoreados": dos palabras, bajo las 3 a 8 de
  ETIQUETA CON CONTEXTO. Se repite de la vuelta 1 y no bloquea, porque la
  segunda etiqueta de la misma tarjeta ("campamentos en riesgo alto o muy alto")
  pone la situación en pantalla. "Campamentos monitoreados por riesgo de
  incendio" son seis palabras y se entiende sola.
- La [TESIS] de "La noticia del día" sigue en 51 caracteres, bajo los 54 del
  reparto del punto 3b. No bloquea, el tope de 66 se cumple y nombra al grupo
  humano ("Personas"), pero sobran quince caracteres y con ellos cabe la palabra
  que falta: "Personas con condenas vigentes seguían en funciones públicas" mide
  60 y dice qué era lo irregular.
- Falta "Carátula sugerida:" y falta "Clima de carátula:", y
  `scripts/validar-tarjetas.js` lo avisa. No es incumplimiento, por octavo día
  seguido: el propio prompt cierra ese bloque con "Desde el 04-11-2026 no se
  pide carátula del día", existe `contenido/estado/sin-video-informe.txt` y
  `estado.yml` salta el pedido. La contradicción del FORMATO DE SALIDA, que
  mantiene las tres carátulas como líneas tercera a quinta, sigue en pie y es
  trabajo de la sesión de día, no de la pieza.
- El tope de tres cifras habladas por bloque se cumple en los tres, con el mismo
  criterio de la vuelta 1: dos en las condenas (trescientas quince y trescientas
  diecisiete), tres en los campamentos (siete de cada diez, ochocientos
  diecisiete y sesenta y cuatro) y tres en Sala Cuna (cero coma tres por ciento,
  un millón de pesos y tres mil pesos). "Dos aportes al seguro de cesantía"
  (línea 56) no se cuenta como cuarta, porque es una cuenta de instrumentos y no
  una magnitud, y ninguna tarjeta podría llevarla.
- Verificado y sin hallazgos en esta corrida: `node scripts/revisar-mecanico.js`
  imprime "sin hallazgos mecánicos"; cero rayas largas y cero rayas medias por
  búsqueda literal; 520 palabras narradas, dentro de 420 a 600, repartidas en 34
  de "La noticia del día" (dos frases, dentro de 25 a 35), 29 de Apertura, 146,
  127 y 134 de los tres bloques (los tres dentro de 110 a 160, la portada la más
  larga) y 50 del cierre; exactamente tres bloques de noticia y la portada
  primero, con la selección que manda el prompt, porque el informe trae cuatro
  noticias [A] (líneas 15, 35, 61 y 81) y se narran la portada y las dos [A]
  siguientes en el orden del informe, con la de Kast y Xi quedando en la web; el
  orden del punto 1b correcto, con los campamentos segundos, que es riesgo
  vigente, y Sala Cuna tercera, que todavía no es ley; las tres tesis de bloque
  en 93, 87 y 82 caracteres, dentro de 80 a 105, la de la portada en 51, bajo el
  tope de 66, y las cuatro con 18 palabras o menos (7, 13, 15 y 14); la suma de
  las cuatro tesis en 313 caracteres, dentro de 292 a 380, lo que pone el Short
  en 37,5 segundos con la ley del punto 3b; línea en blanco después de cada
  [TESIS]; cada bloque de noticia con su [FUENTE] y Apertura y Cierre sin ella;
  un [ESQUEMA] de cuatro elementos para el bloque de proceso; el árbol de tipos
  bien aplicado en las cinco marcas [DATO], con las dos comparacion entre
  valores de la misma unidad y rótulo propio y las tres cifra con un solo valor,
  y la de la línea 20 con el número del título en grande y el otro en la
  etiqueta, como pide "LA CIFRA GRANDE ES LA DEL TÍTULO"; ninguna tarjeta del
  mismo tipo seguida dentro de un bloque y no más de dos [DATO cifra] seguidas
  en la edición; cada valor con su unidad pegada; cada cifra narrada con tres
  cifras significativas o menos; sin ningún superlativo de serie histórica que el
  informe no traiga escrito, salvo el ya anotado de Carabineros; sin conectores
  de ensayo escrito ni la construcción "no solo, sino"; sin paréntesis, URLs,
  emojis ni siglas sueltas en pantalla, con Conaf y Senapred en la narración y
  por el mismo criterio de uso corriente con que pasaron el 16-11-2026 y el
  08-11-2026; ningún tema narrado dos veces, ninguna frase que narre ausencia de
  noticia y ningún bloque cerrado en síntesis abstracta; el tagline "El resumen
  sin gritos." como última frase hablada y la línea "Para salir hoy" del informe
  integrada en el cierre; las doce líneas de "Fuentes:" corresponden a fuentes
  del informe de las tres noticias narradas y de la línea del clima, sin ninguna
  ruta interna del sistema; y el formato y el commit del contrato cumplidos, con
  la pieza en contenido/guiones/informe/2026-11-18.md, el commit f419e9f con el
  encabezado "edición 2026-11-18: guion informe", cuerpo con "Tarea:" y un solo
  archivo tocado, el de hoy.
