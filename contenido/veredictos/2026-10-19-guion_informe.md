VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-19T05:46:01Z

Correcciones:
1. Dónde: las nueve líneas del bloque "Fuentes:" (líneas 61 a 69), todas con
   dirección web, por ejemplo "- Emol, suspensión de clases, 18-10-2026:
   https://www.emol.com/noticias/Nacional/2026/10/18/1214497/suspenden-clases-10-comunas-rm.html"
   · Regla: "No incluyas URLs, emojis, paréntesis, bibliografía, notas al
   editor, marcas de tiempo, indicaciones de edición ni advertencias fuera de
   las marcas definidas" · Debe quedar: las mismas nueve líneas sin la
   dirección web, conservando medio o institución, tema y fecha tal como el
   informe los trae ("- Emol, suspensión de clases, 18-10-2026"). Esa lista se
   publica tal cual en YouTube.
2. Dónde: el bloque "Fuentes:" (líneas 59 a 69) no trae línea para la
   Dirección Meteorológica de Chile, pese a que la marca de la línea 29 la
   cita como fuente y la línea 30 la nombra en la prosa ("La Dirección
   Meteorológica de Chile prevé"); tampoco para Carabineros, nombrada en la
   prosa de las líneas 49, 51 y 53 y fuente de la marca de la línea 48, ni
   para Senapred ni para el Ministerio del Interior, que son las fuentes del
   informe para la alerta roja y la suspensión de clases que narra el primer
   bloque · Regla: "lista una línea por cada fuente de las marcas [DATO] y
   [CITA] Y por cada fuente del informe cuyas noticias narraste, tal como
   aparecen en el informe" y "TODA fuente mencionada EN LA PROSA del guion
   ('según X', 'el Informe diario señalaba', 'como reportó Y') también va en
   la lista, aunque no tenga marca" · Debe quedar: cuatro líneas más en
   "Fuentes:", copiadas de "Fuentes consultadas" del informe (líneas 88, 89,
   90 y 91) y sin dirección web: "- Ministerio del Interior, anuncio de
   suspensión de clases y perímetros de seguridad, 18-10-2026"; "- Senapred,
   alerta roja en diez comunas metropolitanas, 18-10-2026"; "- Carabineros,
   balance preliminar del 18-O, 18-10-2026"; "- Dirección Meteorológica de
   Chile, pronóstico comunicado por su meteorólogo Cristóbal Torres,
   18-10-2026".
3. Dónde: las dos marcas del bloque "Emergencia preventiva y suspensión de
   clases", "[DATO cifra | Emol, 18 oct] comunas metropolitanas con clases
   suspendidas: 10 comunas" (línea 24) y "[DATO cifra | Dirección
   Meteorológica de Chile, 18 oct] lluvia máxima prevista en Santiago el
   martes: 35 mm" (línea 29), que son dos tarjetas del mismo tipo seguidas
   dentro del mismo bloque · Regla: "VARIEDAD ... nunca dos tarjetas del mismo
   tipo seguidas dentro del mismo bloque", y la salida que el propio prompt
   fija: "si el árbol está bien aplicado, deja la cifra sobrante en la
   narración" · Debe quedar: el bloque con una sola marca [DATO], la de la
   línea 24, que es la cifra del título del video. La línea 29 completa sale
   del guion y los milímetros quedan solo narrados, donde ya están en la línea
   30 ("entre veinticinco y treinta y cinco milímetros de lluvia en Santiago
   el martes"). No se agrega ninguna marca nueva: el árbol está bien aplicado
   en las dos, cada una lleva un solo valor, y la variedad nunca justifica una
   tarjeta forzada ni un dato que el informe no traiga.

Observaciones:
- Para la pieza siguiente: después de esta no hay otra pieza de GPT en la
  cadena diaria; lo que sigue, cuando quede aprobada, es la revisión del día
  en contenido/revisiones/2026-10-19.md. Para la corrección, mover solo el
  bloque "Fuentes:" y la línea 29: el resto del guion quedó verificado en esta
  corrida y no tiene que tocarse.
- Verificado y sin hallazgo, para que la corrección no lo mueva:
  scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos" y
  scripts/validar-tarjetas.js da cuatro bloques con fuente y 472 palabras
  narradas (unos 3,5 minutos), dentro de 420 a 600. Tres bloques de noticia y
  no cuatro, la portada primero, y son las tres [A] del informe (emergencia
  preventiva, Cadem y el balance del 18-O), sin "En titulares", sin Dato
  curioso, sin Agenda y sin "¿En qué quedó?". Las cuatro [TESIS] en 16, 14, 15
  y 13 palabras, todas con su línea en blanco detrás. Las cuatro marcas [DATO]
  con fuente y fecha de seis palabras o menos, etiqueta con contexto de 3 a 8
  palabras y unidad pegada al valor, listadas una por una: "comunas
  metropolitanas con clases suspendidas", "lluvia máxima prevista en Santiago
  el martes", "aprobación presidencial en Cadem" con "desaprobación
  presidencial en Cadem", y "detenidos en manifestaciones de Santiago". Cero
  rayas largas y cero rayas medias en el archivo completo, cero paréntesis y
  ninguna URL fuera de "Fuentes:". "La noticia del día" en 29 palabras y dos
  frases, la apertura en 32, el cierre en 52 con la línea "Para salir hoy"
  integrada y "El resumen sin gritos." como última frase hablada. Las cifras
  narradas van en palabras y redondeadas, y las exactas solo en las marcas.
- Fidelidad comprobada contra el informe, dato por dato: siete regiones
  nombradas una a una, las diez comunas de la alerta roja nombradas una a una,
  el decreto vigente del 18 al 23-10-2026, los 25 a 35 milímetros como
  pronóstico y no como agua caída, la evacuación de Las Condes como evaluada y
  no ejecutada, 30% y 65% de Cadem, los 17 ministros, las mayorías de 60% y
  55% narradas como mayorías, los 29 detenidos como balance preliminar y los
  2.500 asistentes como estimación de Carabineros. El superlativo "su menor
  nivel desde el inicio del mandato" sí está en el informe (línea 28) y va
  atribuido a la serie de Cadem, así que no cae en la regla del 10-09-2026.
- El bloque de Cadem lleva la categoría [congreso] y la noticia es una
  encuesta de aprobación presidencial, no un trámite del Congreso. No es
  hallazgo: de las doce categorías permitidas es la única de política
  institucional, y el prompt pide elegir la que un lector usaría para
  archivar. Queda anotado porque esa palabra decide el color y el pictograma
  del bloque en el video.
- Ninguna de las tres noticias es de proceso en sentido estricto (no hay
  trámite legislativo, etapa judicial ni cronograma de decisiones), así que la
  ausencia de [ESQUEMA] no bloquea: el prompt lo pide condicional y no por
  cuota. Si se quisiera uno, lo único que el informe sustenta es la secuencia
  del decreto: solicitud de Senapred, decreto exento 1407, alerta roja en diez
  comunas, suspensión de clases.
- Cinco construcciones del tipo "es X, no Y" en una edición de 472 palabras:
  "Es un pronóstico, no un registro de agua caída" (línea 30), "Son opiniones
  medidas, no decisiones tomadas" (línea 40), "Es una petición política, no
  una ley aprobada" (línea 42), "no había cerrado una cifra oficial" (línea
  51) y "describe un procedimiento policial, no personas condenadas" (línea
  53). Cada una es una precisión correcta que viene del informe, y por eso no
  es hallazgo, pero repetidas cinco veces se oyen como cadencia de plantilla.
  Una o dos pueden resolverse dentro de la frase que las precede.
- La "Carátula 2" ("Alerta roja, / colegios cerrados") es más una consecuencia
  que una contradicción o un giro, y la "Carátula 3" ("Siete regiones, / diez
  comunas sin clases") repite el enfoque de la primera. No bloquea, porque las
  tres cumplen el formato de dos líneas y cuatro palabras y la primera es la
  pregunta que pide el prompt, pero la prueba A/B de YouTube rinde más con
  tres enfoques distintos.
