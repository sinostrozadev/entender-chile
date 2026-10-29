VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-29T21:22:50Z

Correcciones:
1. Dónde: la lista de encabezados pasa de "## Medioambiente y clima" (línea
   112) a "## Internacional" (línea 123) sin "## Chile en regiones", y la
   línea 138 afirma "Ninguna de las áreas obligatorias quedó sin candidatas."
   · Regla: "COBERTURA OBLIGATORIA. Barre estas áreas y anota al menos una
   candidata por cada una donde realmente haya algo. Si un área viene vacía,
   escríbelo explícitamente al final", sobre la lista "Política · Economía y
   bolsillo · Seguridad y Justicia · Plata pública · Vivienda y ciudad ·
   Trabajo y pensiones · Salud · Educación · Ciencia y tecnología ·
   Medioambiente y clima · Chile en regiones · Internacional" · Debe quedar:
   una sección "## Chile en regiones" con al menos una candidata, ubicada
   antes de "## Internacional", o la línea 138 nombrando esa área como vacía.
   Hay material y no hace falta salir del barrido: contenido/barrido/
   2026-10-29.md trae "## Chile en regiones (11)" en su línea 52, y cuatro de
   esas once señales no aparecen en ninguna parte de la pieza (búsqueda
   explícita sobre el archivo, cero coincidencias de "Requínoa", "tornado",
   "Frei", "Malvinas", "Cobquecura", "pescador", "sismo", "ANFP" y "Milad"):
   el tornado de Requínoa con daños en cerca de 70 viviendas y una escuela
   (línea 84 del barrido), la alerta de Frei por una posible interceptación de
   un barco chileno rumbo a Malvinas (línea 57), el pescador desaparecido
   frente a Cobquecura (línea 75) y la clausura de la ANFP (línea 63). Dos de
   esas cuatro traen referencia temporal relativa en el titular del barrido
   ("el lunes" en el tornado, "este miércoles" en el sismo de la línea 81): si
   entran, la fecha va absoluta en DD-MM-AAAA, porque la regla 35 es dura.
2. Dónde: las 50 líneas "Por qué podría importar", que son once frases únicas
   repetidas idénticas dentro de cada área: ocho veces "Puede cambiar reglas,
   equilibrios institucionales o decisiones del Gobierno y el Congreso." en
   Política (líneas 6, 8, 10, 12, 14, 16, 18 y 20), seis veces "Importa por
   sus efectos en seguridad pública, persecución penal y funcionamiento de la
   justicia." en Seguridad y Justicia, seis veces "Compromete control
   institucional, recursos públicos o probidad de autoridades y funcionarios."
   en Plata pública, y así en las ocho áreas restantes · Regla: "Por qué
   podría importar: <una frase, concreta: a quién afecta, cuánta plata, qué
   cambia, o qué historia continúa>" · Debe quedar: una frase propia por
   candidata, que diga de esa noticia a quién afecta, cuánta plata mueve, qué
   cambia o qué historia continúa. Una plantilla por área no dice nada de la
   candidata: sirve de referencia la preselección del 28-10-2026, que tiene 59
   frases distintas para 59 candidatas.
3. Dónde: 49 de los 50 titulares son el titular del barrido copiado literal
   (comparación carácter por carácter tras normalizar tildes, comillas y
   espacios: líneas 5, 7, 9, 11, 13, 15, 17, 19, 24, 26, 30, 32, 37, 39, 41,
   43, 45, 47, 52, 54, 56, 58, 60, 62, 67, 69, 71, 73, 78, 80, 82, 87, 89, 91,
   96, 98, 100, 105, 107, 109, 114, 116, 118, 120, 125, 127, 129, 131 y 133;
   la única excepción es la línea 28, la del comunicado del Banco Central) ·
   Regla: "- <titular en tus palabras, claro y específico> | <medio o medios>
   | <URL>" · Debe quedar: los titulares reescritos. Tres arrastran el error
   del barrido y son las que hay que arreglar primero: la línea 118 dice
   "Alerta en Chule", que no es un lugar y deja el titular sin la región ni el
   complejo volcánico; la línea 116 empieza con el rótulo "[Soy Chile]", que
   es marca del feed y no parte de la noticia; y la línea 19 empieza con
   "ENADE 2026 |", que además rompe el formato (corrección 4).
4. Dónde: la línea 19, "- ENADE 2026 | Presidente Kast proyecta cifras
   históricas de inversión en Chile: "La cifra más alta en la última década" |
   Radio Agricultura | <URL>", que trae cuatro campos separados por barra ·
   Regla: "FORMATO DE SALIDA (estricto, una noticia por bloque de dos
   líneas): - <titular en tus palabras, claro y específico> | <medio o medios>
   | <URL>" · Debe quedar: tres campos exactos, con la barra solo entre
   titular, medio y URL, y "ENADE 2026" dentro del titular sin barra.
5. Dónde: ninguna de las 50 candidatas lleva "(sin confirmar)" (cero
   coincidencias de "sin confirmar" en el archivo), y tres vienen de un solo
   medio que el propio barrido marca así: la línea 41 (Quinta Normal,
   "Epicentro Chile · alarma: secuestro (un solo medio por ahora)"), la línea
   118 (volcán, "La Política Ambiental · alarma: erupcion (un solo medio por
   ahora)", línea 670 del barrido) y la línea 131 (Newcastle, "El Productor
   (Ecuador) · alarma: brote (un solo medio por ahora)") · Regla: "Sí marca
   con "(sin confirmar)" cualquier candidata que venga de una sola fuente
   dudosa o de un medio que no reconozcas." · Debe quedar: "(sin confirmar)"
   al final del titular de esas tres, antes de la primera barra, y de
   cualquier otra que quede con un solo medio no reconocible. Las diecinueve
   preselecciones del 06-10-2026 al 28-10-2026 usan la marca, entre 2 y 26
   veces cada una; esta es la primera con cero desde el 05-10-2026.

Observaciones:
- Para la pieza siguiente: el informe del 28-10-2026, el del día anterior que
  el prompt manda leer, no existe, y está verificado, no supuesto.
  contenido/informes/ lista hasta 2026-10-27.md y
  `git cat-file -e origin/main:contenido/informes/2026-10-28.md` responde que
  la ruta no existe en main, así que la nota de la línea 142 de la pieza es
  exacta y no hay candidata obligatoria que reclamar. Pero el informe del
  27-10-2026 sí dejó un cierre vencido, en su línea 58: "PENDIENTE DE CIERRE:
  decisión de tasa de política monetaria de octubre | 2026-10-27". La
  candidata que lo resuelve ya está en la pieza, en la línea 28, con el
  comunicado de la Reunión de Política Monetaria del Banco Central como
  fuente primaria, y va sin la marca "(cierre pendiente del DD-MM)" porque el
  prompt saca esas líneas del informe del 28-10-2026 y ese archivo no existe.
  El informe del 29-10-2026 tiene que cerrarla con el número real y su
  fuente, porque la edición lo prometió en cámara.
- Para la pieza siguiente: dos pares de candidatas son el mismo hecho contado
  dos veces en áreas distintas, y el prompt no lo prohíbe, así que no bloquea,
  pero infla las 50 y el informe no debería narrarlo dos veces. Las líneas 58
  y 78 son los diez días que la Contraloría da a la Superintendencia de
  Pensiones por su fiscalización a las AFP (Radio Camila TV y Radio U. de
  Chile, el mismo requerimiento del diputado Pinilla y las pérdidas del Fondo
  E). Las líneas 11 y 125 son la abstención de Chile en la Asamblea de la ONU
  sobre el embargo a Cuba (elciudadano.com en Política, Ex Ante y Teletrece en
  Internacional, los mismos 33 años). Las líneas 19 y 32 son las dos del ENADE
  2026 y esas sí son hechos distintos: la proyección de inversión y el pedido
  a los empresarios sobre la rebaja de impuestos.
- Para la pieza siguiente: si al corregir falta material, las once señales de
  "## Chile en regiones" del barrido son la reserva más limpia del día, y
  cuatro están sin usar (corrección 1). La clausura de la ANFP no es deporte
  de rutina: es la institución del fútbol clausurada, que el prompt deja
  entrar como "crisis institucional" y "la plata detrás del fútbol".
- Qué quedó verificado en esta vuelta, sobre esta versión y archivo por
  archivo, para que la corrección no rompa lo que ya está bien:
  `node scripts/revisar-mecanico.js contenido/preseleccion/2026-10-29.md`
  imprime "sin hallazgos mecánicos". Las candidatas son 50, recontadas una por
  una, justo en el objetivo del prompt y dentro del rango 35 a 60, y la nota
  de la línea 146 las declara así. Las 50 vienen en bloques de dos líneas, con
  su línea "Por qué podría importar" con sangría de dos espacios y una sola
  frase, y las tres secciones finales están en su orden, cada encabezado con
  su línea en blanco antes. Cero rayas largas y cero rayas medias en las 148
  líneas, y cero emojis. Las fechas en prosa van DD-MM-AAAA y no hay
  referencia temporal relativa. Las 50 URL son distintas entre sí y 49 existen
  textuales en contenido/barrido/2026-10-29.md y en el JSON del día; la única
  que no es la de la línea 28, que apunta al comunicado de la Reunión de
  Política Monetaria en bcentral.cl, y eso es cumplir el material de entrada 2
  del prompt, no un invento. Cada medio declarado está respaldado en el
  barrido, los 50. La cuota blanda de regiones se cumple con holgura y la nota
  de la línea 148 es exacta: hay candidatas de Aysén (Chile Chico), Los Lagos
  (marea roja y Chonchi), Ñuble (San Carlos y Chillán), Biobío (Lota),
  Tarapacá (Tramo 4 del MINVU) y las zonas del sistema frontal. Las cifras de
  la nota del barrido calzan con contenido/barrido/2026-10-29.json: destacadas
  en 217, que son las 217 señales que la pieza dice haber revisado, con
  total_unico en 758, total_bruto en 884, fuentes_consultadas en 22,
  fuentes_caidas vacío, descartadas_por_antiguas en 31 y ventana_desde
  2026-10-28T03:00:00.000Z. De las seis institucionales sin feed, la novedad
  que la pieza declara del Banco Central está en su línea 28 con fuente
  propia, y entran además Contraloría por la línea 58 y el Congreso por la
  línea 17. El commit d277c5b es "edición 2026-10-29: preselección" y toca un
  solo archivo, el suyo.
