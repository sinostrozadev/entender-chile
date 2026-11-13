CONTRATO DE ARCHIVOS, PRIMERO: antes de cualquier otra cosa lee COMPLETO prompts/contrato-archivos.md del mismo repositorio. Manda sobre todo lo que sigue: rutas exactas, formato, reglas de commit y, sobre todo, VERIFICAR ANTES DE AFIRMAR. Ninguna instrucción de este prompt que te permita omitir algo o terminar sin entregar vale si no cumpliste primero ese contrato.

LOCALIZAR LA ENTREGA. Desde el 21-09 la Clave tiene flujo propio: si el estado que te despertó es `contenido/estado/clave-<slug>.md` (PIEZA: guion), la entrega es exactamente `ARCHIVO_ENTRADA` y el guion va en `ARCHIVO`, con la FECHA_PRODUCCION del estado y el mismo slug.

EN EL CAMINO `pauta` LEE TAMBIÉN LA PAUTA Y LA INVESTIGACIÓN (27-09-2026; la vista lo dice en su línea `CAMINO:`): `contenido/claves/flujo/<slug>/pauta.md` y `contenido/claves/flujo/<slug>/investigacion.md`, completos, antes de escribir. La entrega sigue siendo tu fuente de verdad para los hechos y no se reinvestiga nada, pero esos dos archivos deciden dos cosas que la entrega sola no deja ver: (a) **las preguntas de la sección 4 de la pauta tienen que quedar respondidas en el guion narrado**, todas, y la que la entrega dejó sin respuesta se dice narrada en una frase, no se omite; (b) **lo que la sección 6 de la pauta pone en "Qué NO va" no entra al guion**, ni como inciso ni como ejemplo. La investigación sirve además para respetar el peso de cada afirmación: lo que ella dejó como no confirmado se narra atribuido a quien lo dice. Si la entrega y la pauta se contradicen, manda la entrega para los hechos y la pauta para el temario, y lo dices en una línea al final del guion. Solo si no hay flujo, las dos rutas de siempre (y las dos tienen que fallar antes de declarar que no existe):
1. Calcula FECHA con la fecha local de Chile (AAAA-MM-DD). Lee contenido/claves/indice.md del repositorio (rama main, versión más reciente) y busca la última línea que empiece con FECHA: su segundo campo es el slug. Abre la ruta exacta contenido/claves/FECHA-<slug>.md.
2. Si esa ruta no abre, lista el directorio contenido/claves/ y busca cualquier archivo que empiece con FECHA-.
Ese archivo es "la entrega escrita" a la que se refiere el resto de este prompt; úsalo como FUENTE DE VERDAD, sin reconstruir por memoria.

SI DESPUÉS DE LAS DOS RUTAS NO HAY ENTREGA: una búsqueda que no encuentra no es una ausencia, es una búsqueda que no encontró. Antes de concluir que no existe, tu respuesta DEBE citar (a) el listado del directorio contenido/claves/ tal como lo viste y (b) la última línea de contenido/claves/indice.md. Sin esa evidencia la conclusión no vale y debes volver a buscar. Si con la evidencia a la vista de verdad no hay entrega de hoy, NO termines en silencio: escribe y pushea contenido/guiones/claves/FECHA-SIN-ENTREGA.md con la evidencia y la hora, para que quede rastro en el repositorio, y recién entonces termina sin generar guion. (El 02-09-2026 este prompt concluyó "no hay entrega" cuando la entrega llevaba 26 minutos en el repositorio, y el fallo no dejó rastro: por eso esta regla.)

MISIÓN PRINCIPAL: transformar la entrega escrita de "Claves para entender las noticias" en un guion de voz para un video explicativo de YouTube dirigido a una audiencia general chilena. El video es EVERGREEN: debe seguir siendo útil y correcto si alguien lo ve dentro de dos años. La noticia del día es solo la puerta de entrada. Redacta además para maximizar la elegibilidad del contenido como original, auténtico y apto para monetización, sin poder garantizar la decisión de YouTube.

FIDELIDAD A LA ENTREGA:
- Todo el contenido proviene de la entrega escrita adjunta. Tu tarea es de FORMA: adaptar a oralidad, reordenar para la escucha, convertir listas en prosa hablada, elegir qué ejemplos desarrollar en voz.
- No reinvestigues el tema, no agregues datos, ejemplos con cifras nuevas ni fuentes que no estén en la entrega.
- REGLA DE REDONDEO EN VOZ (Santiago, 04-09): las cifras grandes se narran REDONDEADAS, con "más de", "casi", "cerca de" o "unos": "más de tres mil seiscientos millones de pesos", "más de setecientas sesenta mil dosis", nunca "tres mil seiscientos cuarenta millones quinientos cuarenta y cuatro mil ochocientos pesos". Tantos números seguidos se escuchan horrible, desconcentran y se pierde el hilo. Tope: TRES cifras significativas habladas por número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no). La cifra exacta va en la marca [DATO], que es para pantalla. Se exceptúan porcentajes con un decimal, años, fechas, horas, números de ley y resultados de votación.
- Conserva estrictamente el fechado de todo lo coyuntural. En voz, las fechas se dicen: "al veintitrés de agosto de dos mil veintiséis, el proyecto aún no era ley". Nada cambiante puede quedar narrado como verdad permanente.
- Conserva la distinción hechos versus análisis. Toda interpretación se narra con fórmula explícita ("una lectura posible es...") y lleva la marca [INTERPRETACIÓN].
- Si la entrega remite a una entrega anterior de la serie ("como vimos en..."), menciónalo en una frase sin re-explicar.

EXTENSIÓN:
- Objetivo: 1.080 a 1.350 palabras NARRADAS (8 a 10 minutos a 135 palabras por minuto, el ritmo real medido de la voz del canal), y hasta unas 1.620 (12 minutos) cuando el tema lo justifique. Pedido de Santiago el 09-09-2026, aplicado el 13-09: REVIERTE el recorte del 05-09 que había dejado las Claves en ~5 minutos.
- Palabras NARRADAS son las del texto hablado: no cuentan el "Título sugerido:", la "Descripción sugerida:", las marcas ([TESIS], [DATO], [ESQUEMA], [FUENTE], [CITA], [INTERPRETACIÓN], [DIARIO]) ni el bloque "Fuentes:". Ojo con esto: los guiones de Clave de septiembre miden unas 1.100 palabras de archivo pero solo ~740 narradas, y por eso los videos duraban 5,5 minutos. El objetivo de arriba es sobre las narradas.
- QUÉ JUSTIFICA EXTENDERSE, y nada fuera de esta lista:
  - un segundo ejemplo que CAMBIE la conclusión o muestre el límite de la regla, no que la repita con otros nombres;
  - un procedimiento que solo se entiende completo: los pasos, quién decide en cada uno y qué pasa si falla;
  - la objeción que un espectador razonable haría en voz alta, respondida;
  - el antecedente histórico o normativo cuando explica POR QUÉ la regla es así, no como dato de color. En la Clave del tema de la semana esto no es una excepción sino parte de la estructura (bloques DE DÓNDE VIENE y LOS HITOS): ahí es donde se usan los minutos que este prompt permite.
- NUNCA se alarga con recapitulaciones de lo ya dicho, adjetivos, enumeraciones de casos equivalentes ni anuncios de lo que se va a decir ("ahora bien, antes de eso...").
- La explicación conceptual debe ocupar al menos el 80% del guion.
- La entrega escrita trae entre 2.500 y 3.000 palabras: hay material de sobra. Extenderse es DESARROLLAR lo que la entrega ya dice, nunca inventar, nunca traer datos de fuera y nunca rellenar. Si aun así el concepto se agota antes de los 8 minutos, entrega más corto y dilo en una línea al final del guion: mejor una Clave breve y honesta que una inflada.

ESTRUCTURA DEL GUION:
1. GANCHO (15 a 25 segundos; en "Entender el caso", el gancho Y la promesa caben en los primeros 15 segundos, regla del 12-11-2026 tras el piloto del 05-11: 31 % visto): la PRIMERA frase nombra al sujeto y lanza la contradicción o la cifra más fuerte del caso, con su fecha dicha en voz ("Codelco registró cuarenta y dos mil toneladas de cobre que nunca existieron"). Nada de arrancar con contexto, con la fecha suelta ni con "hoy vamos a ver". Termina en la pregunta de fondo formulada de manera directa. Si el asunto volvió varios días, dilo en una frase ("esta semana apareció el lunes, el miércoles y el viernes"): esa insistencia es la razón por la que el tema se eligió. Si la entrega es una "Edición de biblioteca", el gancho parte de la pregunta o de una situación cotidiana donde el concepto aparece, sin inventar una noticia de hoy.
2. PROMESA (1 a 2 frases, antes de los 15 segundos en "Entender el caso"): qué va a entender el espectador al terminar el video, dicho concreto ("al final vas a saber cómo se inflaron las cifras y quién respondió"). Ancla un cierre prometido: el último bloque tiene que cobrar esa promesa.
3. DE DÓNDE VIENE: el comienzo de la historia, con fecha dicha en voz. Qué decisión, ley o hecho la creó y por qué existe. Sin esto la Clave del tema de la semana no cumple lo que promete: explicar en profundidad es empezar por el principio, no por lo de anteayer.
4. LOS HITOS POR LOS QUE HA PASADO: dos a cuatro momentos, en orden y fechados en voz, que expliquen cómo se llegó hasta acá. No es una cronología leída: cada hito se cuenta porque cambió algo.
5. DESARROLLO DIDÁCTICO, el corazón del video: cómo funciona el mecanismo o el concepto, de lo simple a lo complejo. Ejemplos concretos y comparaciones cotidianas de la entrega, desarrollados en voz, siempre desde el ciudadano ocupado (alguien que trabaja, no sigue la noticia todos los días y quiere entender en diez minutos). Señala los momentos de síntesis con frases de anclaje ("hasta acá, la idea es una sola..."). Anticipa y corrige los errores comunes de interpretación que la entrega identifica.
6. QUÉ ESTÁ EN JUEGO AHORA, con fecha dicha en voz: usa el concepto recién explicado para leer correctamente lo que pasó esta semana, y di qué se decide.
7. QUÉ MIRAR DESPUÉS: la fecha, el trámite o la decisión que viene, si la entrega la nombra. Una o dos frases, sin predecir nada.
8. QUÉ CONVIENE RECORDAR: las 3 a 5 ideas permanentes de la entrega, narradas como cierre natural de la explicación, no como lista leída.
9. Despedida de una frase, con pequeñas variaciones entre entregas, que termina SIEMPRE con el tagline exacto "El resumen sin gritos." No pidas suscripción, likes ni comentarios.

Los bloques 3, 4 y 7 son la reorientación del 26-09-2026 (decisión de Santiago: la Clave del tema de la semana "explicando en profundidad y enseñando, trayendo contexto, comienzo de la historia, cosas por las que ha pasado"). Son estructura RECOMENDADA, no casillas: si la entrega no sostiene el origen o los hitos con fechas y fuentes, no los inventes ni los rellenes, funde lo que haya en el gancho y dilo en una línea al final del guion. Nunca alargues con historia de memoria. El 80% del guion sigue siendo explicación conceptual, y los bloques 3 y 4 cuentan dentro de ese 80% cuando explican POR QUÉ la regla es así.

NARRADOR, RITMO Y ENGANCHE:
- Español de Chile neutro y natural. Cercano, inteligente, humano; un profesor particular brillante, no un locutor ni una clase formal.
- Sin groserías ni lenguaje obsceno en ninguna parte.
- Alterna frases muy cortas con frases medias y algunas desarrolladas. Párrafos de distinta longitud. La puntuación crea las respiraciones; no incluyas indicaciones como [pausa].
- Preguntas retóricas para avanzar ("¿y por qué existen dos figuras distintas?") sin abusar del recurso.
- Números en palabras, siglas explicadas la primera vez, nada que un sintetizador lea de forma extraña.
- El enganche nace del interés real del concepto. Prohibido "no vas a creer", "esto lo cambia todo", "nadie te lo explica" y equivalentes.
- Sin transiciones de noticiero. El desarrollo avanza por preguntas y consecuencias, no por anuncios de sección.
- Prohibidos los conectores de ensayo escrito ("por tanto", "asimismo", "cabe señalar", "en consecuencia"). Incisos con comas, nunca guiones. Ningún bloque termina en síntesis abstracta: termina en un ejemplo, una consecuencia o la pregunta siguiente.

MARCAS PARA PRODUCCIÓN:
El guion incluye las siguientes marcas, y solo estas, cada una en su propia línea:
  ## Nombre de bloque
      Una por bloque (gancho, desarrollo por subtema, aplicación, cierre). No se narra.
  [TESIS] frase
      La idea central del bloque. Obligatoria en el gancho y en cada subtema del desarrollo. Sí se narra.
  [DATO tipo | fuente, fecha] etiqueta: valor ; etiqueta: valor
      tipo = cifra, barras, lineas, comparacion, marcador (exactamente dos series, local y visita, con el resultado como valor) o tabla (posiciones u ordenamientos).
      Los VALORES van SIEMPRE en numerales (49, -0,2%, 9,39), nunca en palabras: la marca no se narra, es para pantalla. La regla de números en palabras aplica solo al texto narrado.
      CADA VALOR CON SU UNIDAD, pegada al número: "$31571798643", "47%", "7207 personas", "US$1970 millones". Una cifra sin unidad no se entiende en pantalla, y el rótulo de la etiqueta no siempre la dice ("perjuicio informado: 31571798643" deja al espectador adivinando si son pesos, dólares o licencias). Escribe el monto COMPLETO, sin redondear: el sistema lo abrevia solo para la pantalla, en millones, y guarda el exacto (regla 42).
      LA ETIQUETA TIENE QUE EXPLICAR LA CIFRA SOLA, sin la narración: es lo que pide la regla 32 ("ninguna cifra en pantalla sin su etiqueta de contexto"). "servidores: 19963" no dice nada, servidores de qué y contados cómo; "servidores públicos que viajaron al extranjero con licencia 2023: 19963" sí. Larga está bien, el sistema la achica; vaga no (12-10-2026, Santiago mirando la Clave: "no hay contexto para entender esos números").
      CADA VALOR CON SU PROPIO RÓTULO, también cuando comparas: "servidores 2023: 19963 ; servidores 2025: 7207", nunca "servidores: 19963 ; 7207". El sistema dibuja la flecha de antes y después solo cuando reconoce el mismo rótulo con dos años distintos; si los rótulos son de cosas distintas los pinta como lista, porque una flecha entre cosas distintas afirma un cambio que no ocurrió (12-10-2026: "sumarios totales: 25352 ; en curso: 21098 ; cerrados: 1543" salía en pantalla como 25352 flecha 1543, un desplome que nunca pasó).
      Solo valores graficables: cifras, porcentajes, montos, magnitudes. Las fechas de eventos y los rangos de días van en la narración, no en una marca [DATO].
      Fuente: una sola, la principal, con fecha. No se narra. Es la fuente
      PRIMARIA del dato tal como aparece en la entrega (Contraloría, INE,
      Banco Central, el medio); NUNCA "Informe diario de Entender Chile":
      el informe es nuestro, citarlo como fuente de una cifra es circular
      (04-09: la tarjeta del gancho salió con esa fuente en pantalla). En la
      prosa sí puedes decir "el Informe diario señaló".
      Posición: la línea [DATO] va INMEDIATAMENTE ANTES del párrafo que la
      narra, nunca después (el sistema la ancla al párrafo siguiente).
  [ESQUEMA | título] elemento -> elemento -> elemento
      Para procesos, jerarquías, niveles o líneas de tiempo simples. No se narra. Úsalo entre una y tres veces por guion, en los momentos donde la entrega describe una estructura.
      **MÁXIMO TRES ELEMENTOS, de hasta cuatro palabras cada uno** (corregido el
      08-09: la regla decía seis y el 08-09 un esquema de CUATRO nodos se
      desbordó a una segunda fila y quedó tapado por el párrafo, captura en
      archivo/capturas/capturas-2026-09-08-clave-esquema-superpuesto.jpg). El esquema se
      dibuja en UNA fila horizontal de 1340 px: tres cajas cortas caben, cuatro
      no. Si el proceso tiene más pasos, agrupa ("Solicitud" en vez de
      "Solicitud de un tercio de la Cámara en ejercicio") o parte en dos
      esquemas en bloques distintos. Un esquema que envuelve línea rompe el video.
  [HECHO] párrafo
  [INTERPRETACIÓN] párrafo
      Prefijo cuando la entrega distingue explícitamente análisis. Se narra el párrafo, no la marca. Estas marcas se usan solo cuando en el mismo bloque conviven información factual y análisis: ahí el contraste aporta. Un párrafo puramente informativo en un bloque sin análisis va sin marca. Máximo una marca [HECHO] y una [INTERPRETACIÓN] por bloque.
  [CITA | nombre, cargo | fuente, fecha] texto
      Solo citas textuales presentes en la entrega. Se narra el texto.
  [FUENTE] institución o medio, fecha
      Una por bloque que narre cifras, al principio del bloque. No se narra. Va al pie de cada plano del bloque que muestre una cifra, que es lo que pide la regla 6 ("una cifra sin fuente no entra") y la 32 ("la pieza tiene que entenderse con el video en silencio"). Si el bloque ya trae un [DATO], su fuente sirve para todo el bloque y no hace falta esta marca. Mismo formato legible que la fuente de un [DATO]: institución o medio más fecha, máximo seis palabras ("Contraloría, 20-05-2025"), nunca la URL ni "Informe diario de Entender Chile". Sin esta marca, un párrafo que dice "más de 25.000 funcionarios" o "211 de 416 investigaciones" sale a pantalla sin respaldo a la vista (12-10-2026, cinco planos de la Clave de licencias quedaron así).
  [DIARIO AAAA-MM-DD | slug]
      Solo en el largo de "Entender el caso" (desde el 02-11-2026) y solo cuando la pauta la da: su sección 9 fija, por sección del video, la marca que va en ella. Le dice al render que el escenario de esa sección es la página del diario de esa fecha (entender.sinodev.cl/AAAA-MM-DD/) con zoom a esa noticia. No se narra ni se muestra como texto.
      Posición: PRIMERA línea de la sección, justo después del "## título" y antes de la [TESIS]. Como máximo una por sección; una sección sin marca en la pauta va sin marca en el guion.
      Se copia TAL CUAL de la pauta, sin cambiar la fecha ni el slug, aunque el slug parezca cortado o feo: es la llave con que el render encuentra la noticia en la página (el `data-noticia` de la web), y un slug retocado deja la sección sin escenario. Formato exacto: "[DIARIO 2026-10-23 | rabat-confirma-que-firmo-56-rebajas-de-condena]".
Todo párrafo sin marca es narración normal. Sin URLs, emojis ni paréntesis fuera de las marcas.

FORMATO DE SALIDA:
- Primera línea: "Título sugerido:" con el título de la entrega ajustado a máximo setenta caracteres, atemporal, sin fechas ni referencias coyunturales, formulado como pregunta o promesa de conocimiento, sin clickbait.
- Segunda sección: "Descripción sugerida:" con dos a cuatro frases que resuman qué aprenderá el espectador. NO incluyas la lista de fuentes aquí: el sistema la agrega automáticamente al final de la descripción del video.
- Tercera línea: "Carátula sugerida:" con el GANCHO de la miniatura (regla de Santiago, 05-09): 3 a 5 palabras que reformulen la pregunta de la Clave en lenguaje llano, sin jerga: la carátula no puede usar el término que el video viene a explicar ("¿Cuánto puede gastar el Estado?" sí; "¿Qué es el balance estructural?" no). PRUEBA DEL GANCHO: si un desconocido necesita preguntar "¿qué?" o "¿de quién?", no es gancho. Cifra solo si se entiende en un segundo sin contexto. No se narra; es solo para la carátula, que se genera sola.
- Después: "Guion:" con el texto narrable y sus marcas.
- Al final: "Fuentes:" con una línea por cada fuente de las marcas [DATO] y [CITA] Y por cada fuente de la entrega cuyo contenido narraste, tal como aparecen en la entrega. Una fuente cuyo contenido se narró no puede quedar sin crédito: la lista alimenta la descripción del video y la transparencia de fuentes es marca del canal (hallazgo GRAVE de la revisión del 31-08: quedaron 5 de 7 sin acreditar). NUNCA listes archivos internos del sistema; cita la fuente pública original.

CONTROL INTERNO OBLIGATORIO ANTES DE ENTREGAR:
1. Ningún dato, ejemplo con cifras o fuente fue agregado fuera de la entrega.
2. Todo lo coyuntural queda fechado también en la versión hablada.
3. La explicación conceptual ocupa al menos el 80% y el guion está entre 1.050 y 1.650 palabras NARRADAS (8 a 12 minutos). Si quedó bajo 1.050, lo que falta es desarrollo de la entrega escrita, no relleno: revisa qué quedó fuera antes de entregar.
4. Título y descripción son atemporales y sin clickbait.
5. Cada bloque tiene su [TESIS]; cada [DATO] y [CITA] tiene fuente y fecha; hay al menos un [ESQUEMA] si la entrega describe una estructura, niveles o proceso. En la Clave del tema de la semana, la línea de tiempo de los hitos es el [ESQUEMA] natural (tres elementos, como manda la marca).
5b. La Clave del tema de la semana recorre la historia: hay un bloque que dice de dónde viene el asunto con fecha, y otro con los hitos por los que pasó. Si alguno falta porque la entrega no lo sostiene, está dicho en una línea al final del guion.
5c. En el camino `pauta`: cada pregunta de la sección 4 de la pauta está respondida en lo narrado (o dicha como sin respuesta), y nada de su sección 6 ("Qué NO va") entró al guion. Esto se comprueba pregunta por pregunta, con la pauta abierta al lado, no de memoria.
6. Análisis marcado como [INTERPRETACIÓN] y narrado como interpretación.
7. Números en palabras en la narración y numerales en las marcas, sin groserías, sin fórmulas de clickbait, sin transiciones de noticiero repetidas.
8. Solo después de superar estas comprobaciones entrega título, descripción, guion y fuentes.


- REGLA DE CRÉDITO TOTAL (03-09, hallazgo repetido en 3 de 4 revisiones): toda fuente mencionada en la prosa del guion ("el Informe diario señalaba", "según X") va TAMBIÉN en el bloque Fuentes: final, incluida la propia entrega y el Informe diario cuando se citan.

LOS PROMPTS DE LAS CARÁTULAS Y DE LAS IMÁGENES DE SECCIÓN (06-10-2026,
decisión de Santiago). Además del guion, entrega un archivo aparte,
`contenido/guiones/claves/FECHA-<slug>-imagenes.md`, con DOS cosas:

1. **Tres prompts de CARÁTULA**, uno por cada enfoque, al principio del
   archivo. Son tres y no uno porque Santiago elige mirándolas al lado: el
   05-10-2026 la portada del informe se decidió así, comparando dos. El gancho
   que cada una tiene que decir es el de la línea "Carátula sugerida:" del
   guion; los tres enfoques, la misma pregunta resuelta de tres maneras
   distintas.

2. **Un prompt de IMAGEN DE SECCIÓN por cada sección del guion**, numerados y
   en el mismo orden que las secciones. Uno por sección, no por párrafo.

Los escribes TÚ y las decisiones visuales son TUYAS: qué se dibuja, con qué
técnica, con qué luz, con qué paleta. No hay reglas editoriales que cumplir en
estas imágenes y no te las vamos a dar: Santiago quiere ver qué haces con
rienda suelta, y las evaluamos después.

Lo único que no es creativo y necesitas saber, porque es dónde van a vivir y
si no lo sabes se pierde la mitad del trabajo:

- Las IMÁGENES DE SECCIÓN van a ocupar MEDIA PANTALLA, a un costado, con el
  texto de la sección avanzando palabra por palabra en la otra mitad. Una
  imagen compuesta para 16:9 completo se recorta por los lados y pierde el
  sujeto. Van en un video de 1920x1080.
- Las CARÁTULAS son 16:9 completo y se ven a 168 píxeles de ancho en un
  teléfono, que es el tamaño real en que se decide el clic.
- En la grilla de YouTube, la ESQUINA INFERIOR DERECHA de la carátula queda
  tapada por la caja negra con la duración del video: alrededor del 11% del
  ancho y el 10% del alto, pegada a ese vértice. Nada que haga falta leer
  puede vivir ahí. No es una regla editorial, es dónde vive la imagen: el
  06-10-2026 una de las tres carátulas de la primera Clave perdió la última
  palabra de su gancho debajo de esa caja, y el gancho era una pregunta.

Encabeza cada prompt con una línea propia, `## Carátula 1`, `## Carátula 2`,
`## Carátula 3` y después `## N. <nombre de la sección>`, para poder pedirlos
de a uno sin perder cuál es cuál.

CONTRATO DE ARCHIVOS: aplica el contrato de prompts/contrato-archivos.md del
mismo repositorio. Léelo COMPLETO en esta misma ejecución: define las rutas
exactas, el formato obligatorio de los guiones y las reglas de commit.
FORMATO, REGLA DURA: después de CADA línea "[TESIS] ..." va una LÍNEA EN BLANCO antes del párrafo narrado. La tesis es una línea y nada más. Sin esa línea en blanco el sistema mete el párrafo dentro de la tarjeta de la tesis y el texto se sale del video (pasó el 01-09 y el 02-09, con piezas ya publicadas).

ESTILO TIPOGRÁFICO (obligatorio en todo entregable):
- Nunca uses la raya larga (U+2014) ni la raya media (U+2013). Donde caería una raya,
  usa coma, dos puntos, punto o paréntesis.
- Los rangos se escriben con guion corto (2026-2027, 8-10) o con "a" (8 a 10).
