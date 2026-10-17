VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-17T05:51:29Z

Correcciones:
1. Dónde: las nueve líneas de "Fuentes:" (líneas 53 a 61), todas terminadas en
   ": https://...", por ejemplo "- La Tercera, libertad condicional de
   Maturana, 16 oct: https://www.latercera.com/nacional/noticia/condenado-por-
   dejar-ciega-a-la-senadora-fabiola-campillai..." · Regla: "No incluyas URLs,
   emojis, paréntesis, bibliografía, notas al editor, marcas de tiempo,
   indicaciones de edición ni advertencias fuera de las marcas definidas"
   (prompts/guion-informe.md, FORMATO DE SALIDA). "Fuentes:" no es una de las
   marcas definidas, y el propio prompt advierte que "la lista se publica en
   YouTube tal cual": scripts/dia.js la copia sin tocarla a
   contenido/descripciones/ en su línea 227 · Debe quedar: las mismas nueve
   líneas, en el mismo orden y con el mismo texto hasta la fecha, sin la
   dirección web, es decir exactamente estas:
   - Ministerio de Relaciones Exteriores de Chile, declaración conjunta Chile-Bolivia, 16 oct
   - Presidencia de Bolivia, visita y acuerdos bilaterales, 16 oct
   - La Tercera, libertad condicional de Maturana, 16 oct
   - Cooperativa, libertad condicional de Maturana, 16 oct
   - La Tercera, reacción del presidente Kast, 16 oct
   - Fiscalía de Chile, formalización caso medialuna, 16 oct
   - BioBioChile, caso medialuna, 16 oct
   - INE, población comunal de Chillán, Censo 2024, presentación regional publicada mar 2025
   - Dirección Meteorológica de Chile, meteograma de Pudahuel, generado 16 oct
   No se agrega ni se quita ninguna línea: la lista está completa, cada entrada
   calza literal con "Fuentes consultadas" del informe y cubre las dos marcas
   [DATO], los tres [FUENTE], la reacción de Kast que sí se narra, el Censo del
   cálculo por habitante y la Dirección Meteorológica del "Para salir hoy".
   Ninguna edición anterior lleva direcciones web en esa lista (verificado en
   los guiones del 10-10-2026, 11-10-2026, 12-10-2026, 13-10-2026 y
   16-10-2026: 203 líneas de fuentes, cero con URL), y el 16-10-2026 esto mismo
   ya costó una corrección.

Observaciones:
- Para la pieza siguiente: después de esta no hay pieza de GPT en la cadena
  diaria. Lo que sigue, cuando quede aprobada, es la revisión del día en
  contenido/revisiones/2026-10-17.md. La corrección toca solo la lista de
  fuentes y no el texto narrado, así que no mueve ni una marca ni el largo: la
  pieza queda igual en 557 palabras narradas contando las líneas [TESIS], 497
  según scripts/validar-tarjetas.js, que no las cuenta, y las dos cifras
  dentro de 420 a 600.
- Verificado requisito por requisito y sin hallazgos, para que la vuelta 1 no
  se lleve nada por delante: la selección es la que manda el prompt (el
  informe trae exactamente tres [A] y el guion narra esas tres, la portada de
  Chile y Bolivia primera, sin "En titulares", sin Dato curioso, sin Agenda y
  sin "¿En qué quedó?"); las cuatro [TESIS] con 13, 14, 15 y 18 palabras, cada
  una con su línea en blanco detrás; las dos marcas [DATO cifra] con etiqueta
  de 7 palabras con contexto, unidad pegada al valor, un solo valor, fuente y
  fecha, y sin quedar seguidas; el monto del perjuicio completo y sin redondear
  ($2100000000) y el mismo indicador en la tesis y en la tarjeta; el [ESQUEMA]
  del caso de la medialuna cubriendo la noticia de proceso con tres elementos
  del informe; los tres [FUENTE] de cinco palabras, más el de "La noticia del
  día", y Apertura y Cierre sin ninguno; la noticia del día en 28 palabras y
  dos frases, antes de la Apertura y sin preámbulo; la Apertura en 31 palabras,
  con la fecha y las otras dos noticias; el cierre en 57 palabras, con el
  enlace del informe completo, el "Para salir hoy" integrado y el tagline "El
  resumen sin gritos." como última frase hablada; las tres carátulas de dos
  líneas y máximo cuatro palabras, con pregunta, contradicción y segundo giro;
  "Clima de carátula: internacional", una de las seis que reconoce
  prompts/caratula-pedido.txt; las tres categorías entre corchetes de la lista
  de doce; cero rayas largas o medias y cero paréntesis en todo el archivo;
  ningún conector de ensayo escrito; ninguna referencia temporal relativa
  (scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos" y
  scripts/validar-tarjetas.js da cuatro bloques con fuente, variedad sin cuotas
  rotas y ninguna marca malformada); y la fidelidad contra el informe dato por
  dato, incluidas las tres cifras habladas del bloque de Chillán (dos mil cien
  millones, más de tres mil doscientos setenta millones y cerca de once mil
  pesos por habitante), todas redondeadas y con su "más de" o "cerca de".
- El informe no trae ninguna sección "Análisis" (verificado buscando sobre el
  archivo completo: las dos apariciones de la palabra están en el bloque de
  Presupuesto y en el rastro interno de descartes), así que la ausencia de
  marcas [INTERPRETACIÓN] es correcta y no un hueco.
- El bloque de la portada quedó en 148 palabras narradas y el de la medialuna
  en 154, así que la noticia de portada no es el bloque más largo. No bloquea:
  el reparto de 110 a 160 por noticia el prompt lo da como orientativo, y
  sumadas las 28 palabras de "La noticia del día", que es la misma noticia, la
  portada llega a 176 y sí recibe el mayor desarrollo de la edición. Queda
  anotado porque la diferencia es de seis palabras y se arregla sin tocar nada
  más si la corrección pasa por ahí.
- La "Carátula 3" ("Cooperación acordada, / relación incompleta") es un segundo
  giro y no una cifra con referencia. El prompt lo permite cuando no hay cifra
  que se entienda sola, y acá la única es el cuatro, que ya está en la
  "Carátula 2" y que suelto no se lee en un segundo. Es la tercera edición
  seguida con esta observación: conviene probar una carátula con cifra cuando
  el día traiga una que se entienda sin contexto.
- La carátula del día todavía no está en el repo: contenido/caratulas/ no tiene
  2026-10-17.png, ni 2026-10-17-prompt.txt, ni 2026-10-17-NO-PUDE.md
  (verificado listando la carpeta). A esta hora es lo correcto, porque el
  prompt manda commitear el guion primero y la imagen después, en su propio
  commit, y prohíbe que una imagen que no salió frene la edición. Queda anotado
  para que la vuelta no se cierre sin la imagen ni sin el archivo que explique
  por qué falta.
- El antecedente que el veredicto del informe dejó como observación, desde
  cuándo Chile y Bolivia no intercambian embajadores, no suena en el guion. No
  es hallazgo: el informe tampoco lo trae y la fidelidad prohíbe que el guion
  lo agregue. Si se quiere en cámara, tiene que entrar antes por el informe.
- El guion no ensanchó el tramo territorial del sistema frontal, que era el
  riesgo anotado en el veredicto del informe: esa noticia no se narra y la
  descripción solo dice "la vigilancia ante el sistema frontal", sin nombrar
  regiones.
