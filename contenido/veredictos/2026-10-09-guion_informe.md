VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-09T06:02:23Z

Correcciones:
1. Dónde: línea 129, "Presupuestos propone mil ochocientos setenta y dos
   millones para Carabineros." · Regla: "No cambies el sentido de ninguna
   cifra" (punto 4 de la estructura) y "REGLA DE REDONDEO EN VOZ ... Tope:
   TRES cifras significativas habladas por número". El informe dice "1.872
   millones de dólares" en su línea 122 y el titular dice solo "millones", que
   en Chile se oye como pesos: la cifra queda convertida en otra, unas mil
   veces menor. Y "mil ochocientos setenta y dos" son cuatro cifras
   significativas · Debe quedar: la unidad dicha y la cifra redondeada, en un
   titular dentro del tope de doce palabras y con una sola cifra hablada, por
   ejemplo "Presupuestos propone más de mil ochocientos millones de dólares
   para Carabineros." (contadas una por una en esta corrida: Presupuestos,
   propone, más, de, mil, ochocientos, millones, de, dólares, para,
   Carabineros, once palabras). El verbo "propone" se conserva, porque el
   informe dice que la cifra "queda sometida a la tramitación del Congreso".
2. Dónde: línea 78, "Contraloría detectó mil cuarenta y cinco recetas de
   fentanilo, metadona y clonazepam" · Regla: "REGLA DE REDONDEO EN VOZ
   (Santiago, 04-09): las cifras grandes se narran REDONDEADAS, con 'más de',
   'casi', 'cerca de' o 'unos' ... Tope: TRES cifras significativas habladas
   por número ... La cifra exacta va en la marca [DATO], que es para pantalla".
   "Mil cuarenta y cinco" son cuatro cifras significativas · Debe quedar la
   cifra redondeada en la voz y la exacta solo en pantalla: "Contraloría
   detectó más de mil recetas de fentanilo, metadona y clonazepam emitidas por
   médicos sin vínculo acreditado con el Hospital de Talagante." El 1.045 ya
   está en la marca [DATO] de la línea 77 y no se toca. Sirve igual "unas mil
   cincuenta recetas", que son tres cifras significativas.
3. Dónde: línea 112, "[DATO comparacion | Corte Suprema, 09 oct] jueces
   removidos en esta revisión: 4 ; total de jueces removidos: 15 ; cuadernos de
   remoción pendientes: 5" · Regla: la fila 6 del árbol de tipos, "Dos o tres
   valores de cosas distintas pero comparables, MISMA unidad -> comparacion".
   Los dos primeros valores son jueces y el tercero son cuadernos de remoción,
   que es otra unidad, así que la marca no calza con la fila que usa ni con
   ninguna otra del árbol (barras, la otra que admite tres valores, también
   pide "misma familia y misma unidad") · Debe quedar la tarjeta con los dos
   valores en jueces: "[DATO comparacion | Corte Suprema, 09 oct] jueces
   removidos en esta revisión: 4 ; total de jueces removidos: 15". Los cinco
   cuadernos pendientes ya están narrados en la línea 113 ("resolverá cinco
   casos pendientes el diecinueve de octubre") y ahí se quedan, como manda la
   regla de VARIEDAD ("si el árbol está bien aplicado, deja la cifra sobrante
   en la narración").
4. Dónde: línea 71, "Al mismo tiempo, la medición de Paz Ciudadana registró una
   caída cercana a dos puntos en victimización.", en un bloque que ya habla
   "setenta por ciento" y "setenta y ocho por ciento" en la línea 69 · Regla:
   "En noticias [B], máximo dos cifras habladas". El bloque corresponde a la
   noticia [B] del informe (su línea 84) y narra tres cifras · Debe quedar la
   tercera cifra fuera de la voz, sin perder el hecho: "Al mismo tiempo, la
   medición de Paz Ciudadana registró una caída en victimización." La
   afirmación sigue sostenida por el informe, que en su línea 86 dice "La
   experiencia directa bajó en esa medición", y la [TESIS] de la línea 66 no
   necesita el número. (El veredicto del 24-09-2026 dejó un caso igual como
   observación y no como corrección; lo marco porque el tope está escrito en
   números y se puede contar, y porque acá la cifra se puede sacar sin que el
   bloque pierda nada.)

Observaciones:
- Para la pieza siguiente: nada. El guion del informe cierra la cadena diaria,
  así que al aprobarlo corresponde el veredicto final del día en
  contenido/revisiones/2026-10-09.md.
- La edición no tiene dato curioso porque el informe no trae esa sección:
  verificado en esta corrida con búsqueda explícita de "curioso" en
  contenido/informes/2026-10-09.md, cero coincidencias, y la lectura de sus
  encabezados uno por uno. La cola del video queda En titulares, Agenda y
  Cierre, que es lo que el informe permite. No es del guion arreglarlo.
- "La noticia del día" suma 43 palabras, once de la [TESIS] narrada y 32 del
  párrafo, contra las "25 a 35" del punto 1 de la estructura. No lo marco, por
  lo mismo que los veredictos del 05-10-2026 y del 07-10-2026: solo el párrafo
  son 32 palabras en dos frases, que es lo que el punto pide, y el tope se mide
  distinto según se cuente o no la [TESIS]. Sigue conviniendo que el prompt
  diga cuál de las dos cuentas manda.
- "Mineduc" se pinta en la marca [DATO] de la línea 23, y "REDIMIN" y "CIPER"
  en las [FUENTE] de las líneas 83 y 65, sin quedar expandidas antes en el
  guion. No lo marco, por lo mismo que la observación de "Senapred" del
  07-10-2026: el formato de esas marcas tiene tope de seis palabras y la
  expansión no cabe, así que la regla de siglas y el tope se contradicen. En el
  caso de REDIMIN el informe tampoco trae el nombre desarrollado, de modo que
  el guion no puede inventarlo. Es del prompt resolverlo.
- Línea 21, "El torrente fue observado cerca de las cinco de la tarde": el
  informe fecha el hecho "A las 17:00" (su línea 16). La hora está entre las
  excepciones del redondeo, así que no bloquea, pero la hora exacta estaba
  disponible y el "cerca de" no agrega nada.
- Línea 50, "un espacio estratégico para la navegación y la política exterior
  chilena": el informe no dice eso del Estrecho de Magallanes, solo que Estados
  Unidos condicionó su apoyo y que la Cancillería respondió. Es una
  caracterización añadida, del mismo tipo que "la cautelar más intensa" que el
  veredicto del 06-10-2026 dejó anotada sin bloquear. Lo mismo, más leve, con
  "una percepción de inseguridad muy alta" en la línea 69, donde el informe
  dice "alta".
- Línea 133, el titular "Quebrada Honda mantiene bajo revisión las obras de
  mitigación pendientes": sus dos hechos ya están narrados en la línea 28
  (Pavez y el desborde, Ex-Ante y las obras pendientes), porque el informe
  trata el tema en dos lugares. Queda entre dos reglas que tiran para lados
  distintos, "no lo reintroduzcas" y "Ninguna noticia del informe puede quedar
  sin narrar Y sin titular", así que no lo mando a corregir. Si Santiago quiere
  un criterio fijo, el lugar es el prompt.
- La edición usa dos tipos de [DATO], cifra y comparacion, contra los tres que
  pide la cuota de VARIEDAD. El árbol está bien aplicado en las otras cuatro
  marcas y el propio prompt dice que "la cuota es una alarma, no una
  obligación" y que "antes que inventar con qué variar, se repite el tipo o se
  deja el párrafo sin marca". No bloquea: el día no trae un antes y un después
  del mismo indicador ni una familia de valores con la misma unidad.
- La Carátula 2, "Clases suspendidas / La emergencia sigue", no es una
  contradicción ni un giro: son dos descripciones, y la 3 vuelve a ser una
  pregunta como la primera. El punto de las tres es dar enfoques distintos a la
  prueba A/B de YouTube.
- El bloque "¿En qué quedó?" no dice de qué son las remociones de la Corte
  Suprema. En el informe van bajo "Licencias médicas de funcionarios públicos"
  (su línea 214) y en el guion quedan como "jueces removidos" a secas: quien
  escuche no sabe por qué los removieron. No es INCUMPLE porque el prompt no
  exige narrar el encabezado de la sección.
- No hay carátula de hoy: listada contenido/caratulas/ en esta corrida, los
  archivos más nuevos son 2026-10-07.png y 2026-10-07-prompt.txt, y no hay
  ninguno de 2026-10-09, ni el .png, ni el -prompt.txt, ni el -NO-PUDE.md.
  Tampoco hay ninguno de 2026-10-08. No lo marco porque el prompt
  manda la carátula DESPUÉS de commitear el guion y prohíbe que detenga la
  edición. Queda anotado.

Verificado en esta corrida sobre el checkout de hoy (e9e6957), contra
contenido/informes/2026-10-09.md y no de memoria:

1. Mecánico: node scripts/revisar-mecanico.js sobre la pieza imprimió "sin
   hallazgos mecánicos". Las cuatro correcciones salen de la lectura a mano.
2. Noticias: las dos [A] del informe están narradas (aluviones en Las Condes y
   el despacho de las reglas de uso de la fuerza). Narradas en total diez, el
   tope exacto del punto QUÉ SE NARRA, con ocho [B] (Talagante, cirugía
   robótica, política exterior, inseguridad, recetas de Talagante, inflación,
   alimentación escolar y Eduardo Bolsonaro). Las otras siete [B] y las
   veinte [C] tienen su titular: los 27 titulares de las líneas 117 a 143
   corresponden uno a uno con esas 27 noticias, cotejadas de a una contra los
   encabezados del informe. Nada del informe queda sin sonar y no hay ninguna
   noticia agregada. La sección "¿En qué quedó?" del informe se narra, con sus
   dos casos (Maipú y las remociones de la Corte Suprema).
3. Topes: las once [TESIS] están bajo dieciocho palabras (la mayor, la de la
   línea 40, tiene catorce) y todas llevan línea en blanco después, comprobado
   línea por línea. Los 27 titulares están en doce palabras o menos, recontados
   uno por uno (el mayor, el de la línea 132, tiene doce justas); cada uno va en
   su propia línea y "Y en titulares:" va sola en la suya, línea 116. La
   apertura tiene 34 palabras contra las "unas 40" y nombra tres asuntos de "En
   una mirada" distintos de la portada. La agenda nombra tres hitos, el máximo.
4. Tarjetas: cinco marcas [DATO], todas con fuente y fecha dentro del tope de
   seis palabras, y las ocho etiquetas entre cuatro y seis palabras, todas
   diciendo qué es la cifra y en qué situación. Tipos en orden: cifra,
   comparacion, cifra, cifra, comparacion, así que nunca hay más de dos [DATO
   cifra] seguidas ni dos del mismo tipo seguidas dentro de un bloque. Un
   [ESQUEMA], el de la línea 60, para la noticia de proceso del día, con cinco
   elementos bajo el tope de seis y los cinco tomados de la línea 78 del
   informe. Valores en numerales. Ninguna marca lleva un dato que no esté en el
   informe: las ocho cifras (10, 70%, 78%, 1.045, 0,4%, 4, 15, 5) están en sus
   líneas 16, 86, 98, 106 y 216. Lo que no calza es el tipo de la línea 112,
   corrección 3.
5. Fuentes: comparadas las 49 fuentes consultadas del informe contra el bloque
   "Fuentes:" del guion, están las 49, una por línea y con el mismo texto. Las
   fuentes nombradas en prosa también tienen crédito: Ex-Ante y Senapred de la
   línea 28, Paz Ciudadana de la línea 71. Búsqueda explícita de "contenido/" y
   de ".md" en el archivo: cero coincidencias, así que no hay ninguna ruta
   interna del sistema en la lista.
6. Estructura: "## La noticia del día" abre antes de la Apertura, con su
   [FUENTE] y una sola marca. Los diez bloques de noticia y el de "¿En qué
   quedó?" llevan su [FUENTE]; Apertura, En titulares, Agenda y Cierre no la
   llevan, como corresponde. Las diez categorías entre corchetes son de las
   doce permitidas, los bloques de estructura van sin corchete, y [emergencia]
   para los aluviones y para Talagante es la correcta: hay alerta roja
   declarada y evacuación, y un aluvión no es un fenómeno meteorológico. "En
   titulares" va inmediatamente después del último bloque narrado y antes de la
   Agenda y el Cierre.
7. Cierre: una sola frase de síntesis y conecta las dos [A] (línea 149); la
   línea "Para salir hoy" del informe queda integrada en la despedida (línea
   151, "usa capas livianas y lleva impermeable o paraguas"); "El resumen sin
   gritos." es la última frase hablada.
8. Tipografía y números: búsqueda explícita de raya larga y de raya media en
   todo el archivo, cero coincidencias. Sin URLs ni emojis, y el único
   paréntesis es el indicador "(sube mal)" de la línea 86. Ningún dígito en
   línea narrada: búsqueda explícita de [0-9] sobre las líneas 8 a 153
   excluyendo las marcas, cero coincidencias. De las cifras habladas, dos pasan
   de tres cifras significativas, las de las correcciones 1 y 2.
9. Fechas: ninguna referencia temporal relativa. "Es viernes nueve de octubre
   de dos mil veintiséis" (línea 15) es correcta, comprobado en esta corrida
   que el 09-10-2026 cae viernes, y las demás fechas van dichas enteras
   (ocho de octubre, dieciséis de octubre, siete y diecinueve de octubre).
10. Duración: 1.476 palabras narradas, unos diez minutos, dentro del objetivo.
    Búsqueda explícita de los siete conectores de ensayo escrito y de la
    construcción "no solo ... sino": cero coincidencias. Ningún bloque termina
    en síntesis abstracta y no hay frases que narren ausencia de noticias.
    Sin [HECHO] ni [INTERPRETACIÓN], que es lo que corresponde: el informe de
    hoy no trae ninguna sección "Análisis".
