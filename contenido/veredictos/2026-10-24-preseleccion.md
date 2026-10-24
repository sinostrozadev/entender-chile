VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-24T05:17:34Z

Correcciones:
1. Dónde: línea 193, la candidata de Internacional "Cómo Trump está tratando
   de influir para que Bolsonaro gane en Brasil | El Mostrador (corroborada en
   2 fuentes)" · Regla: el FORMATO DE SALIDA (estricto) del prompt manda
   "- <titular en tus palabras, claro y específico> | <medio o medios> | <URL>",
   y ese titular es el de El Mostrador copiado carácter por carácter (línea 630
   de contenido/barrido/2026-10-24.md y el campo titulo de la misma noticia en
   contenido/barrido/2026-10-24.json: la comparación exacta da idéntico), además
   de no decir qué hace Trump, que es lo que pide "específico". Es la única de
   las 57 candidatas en esa situación: las otras 56 están reescritas. · Debe
   quedar: el titular reescrito en tus palabras y con el hecho concreto, tomado
   solo de lo que hay en el repo. Si el hecho no está sin abrir la nota (el
   barrido entrega de esa noticia nada más que el título), hay dos salidas
   válidas: usar el hecho que sí traen las noticias vecinas del mismo tema en el
   JSON del día, por ejemplo la acusación de Lula a Flávio Bolsonaro en el
   último debate (ADN Radio), cuidando no repetir la candidata de la línea 190;
   o sacar la candidata y poner en su lugar una de las que tú misma dejaste a la
   vista en las notas, el sobreseimiento de Milei en la causa $LIBRA
   (BioBioChile y La Tercera) o el exjefe de inteligencia de Bolsonaro que
   Estados Unidos deja permanecer en Florida (CIPER). Con cualquiera de las dos,
   Internacional conserva candidata y el total sigue dentro del rango de 35 a 60.

Observaciones:
- Para la pieza siguiente: las seis fuentes institucionales sin feed de
  contenido/barrido/fuentes.json (Contraloría General de la República, Banco
  Central de Chile, Cámara de Diputados, Senado, Dirección Meteorológica de
  Chile y Ministerio Público) no se abrieron, y la pieza lo declara en su nota,
  como corresponde a quien no navega. Quedan para el informe, que sí puede
  entrar, con los cuatro pedidos que la propia pieza deja anotados: el acto con
  que el Ministerio de Justicia suspende los decretos de rebaja de penas, que
  hoy solo consta en declaraciones; el comunicado del Banco Central sobre la
  renovación del swap con China, con monto y plazo; los avisos de la Dirección
  Meteorológica para el Biobío y la cordillera de Coquimbo, con su hora; y la
  causa de la Fiscalía Centro Norte por el Fondo E, con su RUC.
- Para la pieza siguiente: las cuatro cifras que la pieza deja marcadas como no
  coincidentes se cierran con fuente primaria y no entre medios. La caída de la
  inmigración irregular en la frontera norte (85% según el ministro de Defensa
  en CNN Chile, 87% en la inspección de Colchane según La Tercera) la fija el
  Servicio Nacional de Migraciones o la Delegación Presidencial de Tarapacá. Las
  expulsiones mezclan dos bases distintas (2.000 en 2026 contra 1.704 bajo el
  actual Gobierno): cada número necesita su período. El dólar aparece con tres
  valores el mismo día (máximos desde abril de 2025 en Diario Financiero, $986,9
  en Publimicro y "a $5 de los $1.000" en REDIMIN) y el cierre lo da el Banco
  Central. Y las viviendas dañadas por el sistema frontal van de 300 a 750 entre
  el 23 y el 24-10-2026: el reporte de Senapred con su hora de corte es el único
  que sirve en cámara.
- Para la pieza siguiente: las trece candidatas marcadas "(sin confirmar)" no
  deben ir a cámara sin fuente primaria, y tres pesan más que el resto porque
  son alarmas o conflictos de interés: el brote de sarna noruega del Hospital de
  Chillán con 13 contagiados (BioBioChile, única fuente de una alarma
  sanitaria), la inmobiliaria ligada al biministro Daniel Mas con proyectos del
  Minvu de Coquimbo y el nombramiento de la seremi de Salud del Maule (las dos
  de ContrapoderChile.cl, un medio que no está entre los de referencia).
- Para la pieza siguiente: la fecha del 28-10-2026 para la definición opositora
  sobre la acusación constitucional contra el ministro Rabat es cálculo propio
  de la pieza sobre un "el próximo miércoles" de La Tercera del 23-10-2026, y va
  dicho así en su propia línea. La verifica la Cámara de Diputados antes de que
  suene en el video.
- Para la pieza siguiente: si falta material, la pieza deja a la vista veinte
  candidatas que quedaron fuera por tamaño, varias del mismo tema que domina el
  día: la defensa del subsecretario Luis Silva a las rebajas de condena, los 300
  fusiles CZ Scorpion EVO 3 para reemplazar las UZI de Carabineros, Fintual
  anunciando que creará una AFP y Chile líder del ranking de pensiones de CFA
  Institute y Mercer pese a la crisis del Fondo E.
- La nota de las URL se equivoca en dos conteos, y es la nota que el informe lee
  para saber qué se limpió: dice "las dos candidatas de ese medio" por
  Interferencia y hay una sola (línea 9), y dice "las tres de CIPER" y hay dos
  (líneas 15 y 126). La limpieza en sí está verificada y bien hecha: la
  dirección de la línea 9 es la versión sin el ancla HTML de la que trae el JSON
  del día, que viene con "%3Ca%20href%3D%22" metido dentro del enlace.
- Qué quedó verificado en esta vuelta: node scripts/revisar-mecanico.js imprime
  "sin hallazgos mecánicos"; las 57 candidatas vienen en bloques de dos líneas,
  todas con sus dos barras, su URL y su línea "Por qué podría importar" de una
  sola oración, con línea en blanco entre bloques y sin líneas sueltas; las doce
  áreas de cobertura obligatoria tienen candidata, con lo que "Ninguna" en áreas
  sin material es consistente; el tamaño (57, y la pieza lo declara) cae en el
  rango de 35 a 60; la cuota de regiones se cumple con once regiones distintas
  fuera de la Metropolitana, entre ellas Magallanes (línea 50 y línea 109), Los
  Lagos (75), Atacama (177), Valparaíso (12) y La Araucanía (el bono
  combustible); las tres secciones finales están en su orden; cero rayas largas
  o medias, cero emojis, las fechas en prosa van en DD-MM-AAAA y las que
  aparecen como AAAA-MM-DD son todas rutas de archivo; nada de farándula ni
  deporte de rutina entró y los descartes van declarados uno por uno; el commit
  b769f69 es "edición 2026-10-24: preselección", con su línea "Tarea: suplente
  (reparto permanente, no plan B)" y tocando solo su propio archivo.
  Las candidatas obligatorias por cierre pendiente se verificaron por ausencia y
  no por memoria: contenido/informes/2026-10-23.md existe, es el informe de la
  fecha anterior, y la búsqueda de "PENDIENTE DE CIERRE" sobre sus 204 líneas da
  cero; sus dos líneas "EN SEGUIMIENTO" (Junaeb y SOSER en la 39, hospital
  modular Barros Luco en la 69) están las dos resueltas en las historias sin
  novedad. Las siete cifras del encabezado del barrido que la pieza repite calzan
  una por una con contenido/barrido/2026-10-24.json: 216 destacadas, 826 únicas,
  22 fuentes consultadas, 967 brutos, 40 de días previos, 10 de ruido y
  fuentes_caidas vacío. Las 57 candidatas se rastrearon hasta el barrido: 47 con
  la URL exacta del JSON, 9 con la misma URL sin sus parámetros de seguimiento y
  la de Interferencia con el ancla HTML sacada. Los "cero coincidencias" de las
  historias sin novedad se comprobaron sobre los títulos y los medios de las 826
  noticias del JSON: junaeb, soser, barros luco, sistema de admisión, admisión
  escolar, SAE, google, centro de datos, data center, ácido sulfúrico, laguna
  del inca, avalancha, barriga y medialuna dan cero, tal como la pieza lo dice
  (sobre el JSON completo, google y SAE sí aparecen, pero dentro de las URL de
  news.google.com, no en el material editorial). Cuatro de las doce historias
  sin novedad no vienen del informe del 23-10-2026 sino del informe del
  21-10-2026 o de la preselección del 23-10-2026 (la reforma al INDH, Cathy
  Barriga, la Medialuna de Chillán y el tiktoker formalizado), lo que amplía la
  sección sin contradecir lo que pide el prompt. Los conteos de medios se
  comprobaron contra el JSON en los casos con más medios declarados: la colecta
  de TECHO y BancoEstado está en los cuatro que nombra (BioBioChile,
  Meganoticias, The Clinic y NOSTÁLGICA cl) y el mall de Antofagasta en los dos
  (ADN Radio y Epicentro Chile). Y las trece candidatas de una sola fuente
  llevan todas su marca "(sin confirmar)": no quedó ninguna sin marcar.
