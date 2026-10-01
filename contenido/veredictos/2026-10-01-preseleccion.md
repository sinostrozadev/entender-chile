VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-01T04:51:01Z

Correcciones:
1. Dónde: las 50 líneas "Por qué podría importar" de la pieza traen solo 12
   frases distintas, una por área, repetidas palabra por palabra en cada
   candidata de esa área. Las cinco de Política dicen todas "Puede cambiar
   decisiones del Gobierno, la discusión legislativa o el equilibrio entre
   oficialismo y oposición" (líneas 6, 9, 12, 15 y 18); las siete de Economía y
   bolsillo, todas "Puede afectar precios, actividad, inversión o el presupuesto
   cotidiano de los hogares" (líneas 23, 26, 29, 32, 35, 38 y 41), y así en las
   diez áreas restantes. · Regla: el formato de salida del prompt exige
   "Por qué podría importar: <una frase, concreta: a quién afecta, cuánta plata,
   qué cambia, o qué historia continúa>". · Debe quedar: cada una de las 50
   candidatas con su propia frase, referida a ese hecho y no al área: a quién
   alcanza, cuánta plata hay en juego, qué regla cambia o qué historia continúa.
   Por ejemplo, la línea 26 (Banco Central y la debilidad del empleo) tiene que
   decir qué atribuye el Banco Central y a quién afecta, no la frase genérica de
   precios e inversión. Las 12 frases de área no pueden volver a aparecer
   repetidas en más de una candidata.
2. Dónde: 49 de los 50 titulares están copiados textualmente del barrido, con
   coincidencia exacta tras normalizar comillas y tildes. Entre ellos la línea 8
   ("Con un gran maletín: ministro Quiroz llega al Congreso y entrega el proyecto
   de Presupuesto 2027", línea 66 del barrido), la línea 120 ("¿Estrellas
   artificiales hechas en Chile? La curiosa misión de los enormes láseres que
   iluminan Atacama") y la línea 168, que arrastra hasta el nombre del programa
   del medio ("En Contexto - Venta de tierras a extranjeros en Argentina: ¿qué
   hay detrás del fallo del Supremo?"). · Regla: el formato de salida del prompt
   exige "- <titular en tus palabras, claro y específico> | <medio o medios> |
   <URL>", y el material de entrada está declarado como "material bruto para la
   preselección: no es contenido publicable ni está verificado". · Debe quedar:
   cada titular reescrito por el editor, sin el gancho ni el nombre de programa
   del medio, diciendo el hecho y su sujeto. La línea 8, por ejemplo, como
   "El ministro Quiroz entrega en el Congreso el proyecto de Presupuesto 2027";
   la línea 168 como "La Corte Suprema argentina falla sobre la venta de tierras
   a extranjeros". La URL y el campo de medio no se tocan.
3. Dónde: línea 112, "movilizaciones convocadas para el 1 de octubre a lo largo
   de todo Chile". · Regla: las reglas de estilo del prompt piden "Fechas en la
   prosa como DD-MM-AAAA". · Debe quedar: la fecha escrita 01-10-2026 en esa
   línea, dentro del titular reescrito que pide la corrección 2.

Observaciones:
- Para la pieza siguiente: la alerta del Sernac por falla técnica en más de
  1.700 camionetas quedó fuera de la olla y el barrido la trae con cinco medios
  (se buscó "sernac" y "camioneta" en contenido/preseleccion/2026-10-01.md, cero
  coincidencias en ambas). Afecta directamente a dueños identificables de un
  modelo determinado, así que conviene que el informe la evalúe.
- Para la pieza siguiente: el Escudo de las Américas entra solo con una columna
  de opinión de Ex-Ante (línea 5) y quedan fuera las dos investigaciones del
  barrido sobre el mismo acuerdo: "El otro Escudo de las Américas: los minerales
  críticos", de CIPER, y "Escudo de las Américas: lo que dice Washington, lo que
  respondió el canciller y lo que nadie le preguntó", de Interferencia, las dos
  marcadas "exclusiva de medio de investigación". También falta que diputados
  pidan a Cancillería y Defensa explicar el alcance de la adhesión. El informe
  del 30-09-2026 ya abrió el tema en su línea 30, así que es seguimiento con
  material nuevo.
- Para la pieza siguiente: del Presupuesto 2027 entra solo la llegada del
  ministro al Congreso (línea 8) y no el contenido, que el barrido tiene en la
  exclusiva de Ex-Ante "Lo que se sabe del Presupuesto 2027 y del gasto de 1,5%
  que propondría el primer erario de la era Kast". El informe del 30-09-2026 ya
  había proyectado ese 1,5% en su línea 51.
- Para la pieza siguiente: cuatro candidatas repiten hechos que el informe del
  30-09-2026 ya narró, así que son seguimiento y no hechos nuevos: la condena a
  la falsa periodista de Maipú (línea 73 de la pieza, línea 74 del informe), la
  declaración de Hermosilla sobre nombramientos judiciales, que en la pieza
  aparece por el lado de Cordero (línea 62, informe línea 82), el Escudo de las
  Américas (línea 5, informe línea 30) y el Presupuesto 2027 (línea 8, informe
  línea 51).
- Para la pieza siguiente: la candidata de la huelga de supervisores de Escondida
  (línea 40) descansa en un solo medio, La Tercera, y el barrido la clasifica
  como "alarma: huelga (un solo medio por ahora)". No pedía la marca
  "(sin confirmar)", porque La Tercera no es una fuente dudosa ni un medio
  desconocido, pero el informe necesita confirmarla con el sindicato o con la
  empresa antes de darla por hecha.
- Para la pieza siguiente: el único PENDIENTE DE CIERRE con fecha de hoy no está
  en el informe de ayer sino en el del 29-09-2026 (línea 152, variación oficial
  de precios de combustibles, vence el 01-10-2026). La pieza dice bien que el
  informe del 30-09-2026 no trae ninguna línea PENDIENTE DE CIERRE, y se verificó
  buscándolas en ese archivo sin resultado, así que no era candidata obligatoria.
  La candidata de los combustibles sí entró, en la línea 31, sin la marca
  "(cierre pendiente del DD-MM)": al informe de hoy le toca igual resolver ese
  dato con el número oficial.
- El tamaño queda en el objetivo del prompt, 50 candidatas, y es el mejor de la
  semana (38 el 29-09-2026 y 52 el 30-09-2026). Los doce encabezados
  obligatorios están con su nombre exacto y todos con al menos una candidata, así
  que el "ninguna" de "Áreas sin material hoy" es correcto. Las tres secciones
  finales están presentes (líneas 177, 181 y 185), la pieza no trae raya larga ni
  media (cero coincidencias de U+2014 y U+2013 en el archivo completo) y no hay
  preámbulo ni comentario final.
- Las 50 URL de la pieza aparecen con coincidencia exacta en
  contenido/barrido/2026-10-01.md, y los 50 medios citados calzan con el medio
  que el barrido asigna a esa URL: no hay ninguna fuente inventada. Las notas
  del barrido también calzan con la cabecera del archivo, que declara 239
  noticias con señal de 22 fuentes y radiouchile como fuente caída.
- La cuota blanda de regiones se cumple con holgura: Atacama, Coquimbo, Chile
  Chico, Lota, Biobío, Tarapacá, Valparaíso, Punta Arenas y el Paso de Agua
  Negra están fuera de la Región Metropolitana.
- Bien excluidos los cuatro bloques de fútbol que el barrido clasificó por error
  en "Ciencia y tecnología" (el regreso de Sampaoli y el fallo del TAS sobre
  Unión La Calera), que son deporte de rutina. Queda anotado para el barrido, sin
  bloquear: esa clasificación hace que un área obligatoria llegue inflada con
  material que no entra.
- La revisión de las fuentes institucionales sin feed se declara en bloque, como
  "revisión automatizada", sin decir qué devolvió cada una. El prompt pide
  abrirlas una por una (Contraloría, Banco Central, Cámara de Diputados, Senado,
  Dirección Meteorológica y Ministerio Público). No bloquea, porque la nota
  afirma que se revisaron y nombra el caso del Imacec de agosto y el del Senado,
  pero conviene nombrarlas con lo que cada una mostró.
