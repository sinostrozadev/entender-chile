VEREDICTO: APROBADA
VUELTA: 2
PIEZA: investigacion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/investigacion-clave.md
VALIDADO: 2026-10-06T02:41:59Z

Observaciones:
- Para la pieza siguiente: la línea 109, en "Lo que NO se pudo averiguar", dice
  que las cifras y la metodología básica del CIC N°26 "fueron contrastadas con
  el enlace institucional y múltiples publicaciones coincidentes", pero el
  enlace institucional que había (un agregador) salió del dossier en esta
  vuelta, así que ya no hay a qué apuntar: la única acreditación que queda del
  Consolidado es de prensa (Cooperativa y ADN Radio del 02-10-2026 y BioBioChile
  del 04-10-2026). La entrega puede usar las cifras atribuyéndolas a esas
  publicaciones, nunca al documento de Contraloría como si se hubiera leído, y
  sigue sin poder usar el desglose por servicio ni las notas metodológicas
  literales, que el dossier declara no conseguidos.
- Para la pieza siguiente: en la sección 9, la línea 72 explica con qué pasos se
  cobra un fallo civil y lo acredita con la nota de BioBioChile del 03-09-2026,
  que trata de una prisión preventiva revocada y no de la ejecución del fallo.
  La respuesta 7 ya quedó sin ese enlace y remitida a lo que no se pudo
  averiguar, que es la salida correcta; la entrega debería tomar de ahí la
  explicación y no de la línea 72. No va en correcciones porque la vuelta 1 y la
  vuelta 2 marcaron la respuesta 7 y no ese pasaje, y la convergencia prohíbe
  sumar un hallazgo nuevo sobre una parte que antes no se marcó.
- Para la pieza siguiente: el sondeo del 01-10-2026, que la pauta trae marcado
  "(se dice)" en su sección 3, quedó declarado como no ubicado (línea 108). La
  entrega no puede usarlo como dato; si lo menciona, tiene que ser por lo que el
  dossier dice, que no se encontró una publicación con ficha técnica y enlace.
- Para la pieza siguiente: dos datos de la sección 3 de la pauta no están en el
  dossier, y ninguno venía marcado "(por verificar)", así que no son hallazgo:
  la red de 16 sociedades de fachada que entre 2020 y 2022 emitió más de 60.000
  licencias falsas, y el anuncio de sanciones del Gobierno del 03-10-2026 tras
  el desglose regional. Si la entrega los va a usar, necesitan fuente propia.
- Para la pieza siguiente: la cautela de que no todos los días de licencia se
  pagan del mismo modo no está dicha en ninguna parte, pero los hechos que la
  sostienen sí (la sección 1, con la remuneración que conserva el funcionario
  público y el subsidio que recibe el privado, y la sección 2, con el día desde
  el que se paga según duración y régimen). La entrega tiene con qué explicarla.
- Para la pieza siguiente: el dossier repite dentro de "Lo confirmado" dos
  ausencias que también están en "Lo que NO se pudo averiguar" (la ficha pública
  de variables de VigIA, sección 5, y la constancia de ingreso al Fisco, sección
  9). No lo prohíbe el prompt, pero la entrega debería tomarlas de la sección
  que les corresponde para no contarlas dos veces.
- Las dos rayas largas que encierran el monto de $1,9 millones brutos
  mensualizados en la sección 7 (línea 60) y la fecha en palabras de la línea 6
  ("Corte de información: 5 de octubre de 2026") contradicen las reglas duras 34
  y 35, pero prompts/investigacion-clave.md no las pide: es el único prompt del
  flujo sin la línea de control que sí trae prompts/clave-idea.md en su cierre
  ("Sin rayas largas; fechas DD-MM-AAAA en prosa"). Por eso van acá, igual que
  en las vueltas 1 y 2. Cerrar ese hueco en el prompt es tarea de la sesión de
  día, no de esta pieza, y no podía bloquear una tercera vuelta.
- "aproximadamente $257 millones" en multas de VigIA (líneas 40 y 103),
  "aproximadamente 63%" (línea 98) y "cerca de $26.000 millones" de la demanda
  civil (líneas 70 y 104) chocan con "Nada de 'unos', 'cerca de' ni 'varios' si
  el número existe", pero no se puede afirmar desde el repo que la cifra exacta
  exista y el validador no navega para averiguarlo: la pauta misma usa "unos
  $26.000 millones" en su sección 3. El porcentaje es distinto, porque ahí la
  pauta sí da el dato sin matiz ("63% menos que los 19.963 de 2023", su línea
  52) y el dossier lo suaviza dos veces; si el documento de Contraloría trae el
  porcentaje y el de SUSESO el monto de las multas al peso, la entrega debería
  usarlos tal cual.

Verificado y conforme:
- Corrección 1 de la vuelta 2, resuelta: el agregador salió del dossier.
  Buscado "linktr" en las 143 líneas del archivo, cero coincidencias. Las cinco
  menciones que lo usaban quedaron acreditadas con prensa nombrada como tal: los
  dos párrafos de la sección 8 (Cooperativa del 02-10-2026 y BioBioChile del
  04-10-2026 en el de los 7.207; ADN Radio del 02-10-2026 en el de la
  metodología), la cronología del 02-10-2026 (Cooperativa), la línea de los
  7.207 en "Cifras" (Cooperativa) y la fuente 12 de la lista, que ahora es la
  nota de ADN Radio del 02-10-2026 con la misma dirección que cita la sección 8.
- Corrección 2 de la vuelta 2, resuelta: la respuesta 7 ya no cuelga de la nota
  del amparo. Dice que no se encontró una fuente que acreditara la ejecución del
  fallo ni el cobro y remite a "Lo que NO se pudo averiguar", que en su línea
  113 declara que no hay constancia oficial de ingreso al Fisco al 05-10-2026.
  Es la segunda salida que la corrección permitía.
- Corrección 3 de la vuelta 2, resuelta: la Circular 3890 tiene una sola
  dirección. La cronología del 05-11-2025 pasó de "612/w3-article-767521.html" a
  "622/w3-propertyvalue-774967.html". Buscado "767521" en el archivo completo,
  cero coincidencias; buscado "774967", seis, que son las seis menciones
  (secciones 3 y 3 segundo párrafo, el primer ítem de lo que se dice, la
  cronología, la respuesta 3 y la fuente 4).
- La corrección no introdujo incumplimientos: el cambio toca siete líneas
  (git diff c28b996 35158ac) y todas son de acreditación. Las siete secciones
  del formato de salida siguen en el orden que manda el prompt (líneas 8, 74,
  81, 95, 106, 115 y 125), la cronología sigue en orden por fecha de inicio de
  cada hito y con enlace en cada uno, "Lo que NO se pudo averiguar" conserva sus
  seis ítems y ninguno dice "nada" (buscada la palabra en el archivo completo,
  cero coincidencias), las siete preguntas de la sección 4 de la pauta siguen
  respondidas una por una en "Las preguntas de la pauta", y las cifras de los
  sumarios siguen cuadrando: 21.098 en curso más 4.254 con resolución dan
  25.352; 2.711 por cerrar más 1.543 cerrados dan 4.254; y 577, 584, 262, 65 y
  55 suman los 1.543 cerrados.
- Nada de la sección 6 de la pauta entró al dossier: ninguna de las siete líneas
  que cambiaron nombra a los condenados ni sus penas, ninguna anticipa si VigIA
  servirá, ninguna da por recuperado el dinero (la nueva respuesta 7 dice lo
  contrario) y ninguna trata al trabajador enfermo como sospechoso. Las dos
  noticias de inteligencia artificial del 28-09-2026 y del 30-09-2026 no
  aparecen.
- Contrato de archivos: la pieza está en la ruta que nombra el estado,
  contenido/claves/flujo/licencia-medica-fiscalizacion-y-sumario/investigacion.md,
  y el commit que la trajo (35158ac) toca solo ese archivo, con el encabezado
  "clave licencia-medica-fiscalizacion-y-sumario: investigación" y el cuerpo
  "Tarea: despachador".
- Convergencia: esta es la vuelta 2 y los tres incumplimientos que quedaban
  están resueltos, así que la pieza se aprueba sin abrir una vuelta 3. Lo que
  encontré de nuevo (la línea 109 y la línea 72) va en observaciones, porque son
  pasajes que las vueltas anteriores no marcaron o que el prompt del dossier no
  exige.
- Lo que NO se pudo comprobar de esta pieza, dicho en vez de darlo por bueno: el
  validador no navega, así que se verificó coherencia interna, cobertura de la
  pauta y calce de cada cita con lo que afirma; NO que las páginas existan ni
  que digan lo que se les atribuye.
