VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-25T05:12:54Z

Observaciones:
- Para la pieza siguiente: las seis fuentes institucionales sin feed de
  contenido/barrido/fuentes.json (Contraloría General de la República, Banco
  Central de Chile, Cámara de Diputados, Senado, Dirección Meteorológica de
  Chile y Ministerio Público) no se abrieron, y la pieza lo declara en su nota.
  Quedan para el informe, que sí puede entrar, con los cinco pedidos que la
  propia pieza deja anotados: el texto despachado de la ley de expulsiones
  administrativas y el de la ley que moderniza Carabineros, los dos en la
  Cámara o el Senado; el informe financiero de esa ley policial, con el costo
  de subir la remuneración de los alumnos de $70.000 a $248.000; el aviso de la
  Dirección Meteorológica para el 26-10-2026 entre Coquimbo y Los Lagos, con su
  hora; la causa de la Fiscalía por las pérdidas de las AFP, con su RUC; y el
  reporte de Senapred del evento meteorológico, con su hora de corte.
- Para la pieza siguiente: las tres cifras que la pieza deja marcadas como no
  coincidentes se cierran con fuente primaria y no entre medios, y las tres
  quedaron comprobadas en el barrido de hoy. La frontera norte: 11,9 kilómetros
  de zanja y caída del 85% en Publimicro contra "casi 12 kilómetros" y "caída
  superior al 85%" en ICNDiario, de modo que el número lo tiene que dar el
  Servicio Nacional de Migraciones o la Delegación Presidencial de Tarapacá.
  Las viviendas dañadas por el sistema frontal: "más de 700" en Meteored Chile
  contra las "más de 750" que el informe del 24-10-2026 consolidó en sus líneas
  8 y 111 a 113, que son dos cortes distintos y hay que decir cuál. Y los
  muertos del ataque a la iglesia en Jordania: siete en Radio Agricultura
  contra nueve en BioBioChile, Infobae y Canal 9 Bío Bío Televisión, así que la
  cifra necesita fuente oficial jordana.
- Para la pieza siguiente: quedó fuera una candidata corroborada que calza con
  un criterio de entrada del prompt, "Chile y la Unión Europea refuerzan agenda
  comercial y de seguridad" (Portal Metropolitano, corroborada en 3 fuentes,
  línea 36 del barrido, dentro de su sección de Política). Es internacional con
  efecto directo sobre Chile por el lado comercial, y no aparece ni entre las 58
  candidatas, ni en las historias en curso, ni en la lista de las que quedaron
  fuera por tamaño: con 58 de un tope de 60 había espacio. El prompt no obliga a
  incluirla, así que no bloquea, pero el informe puede recuperarla del barrido.
- Para la pieza siguiente: las nueve candidatas marcadas "(sin confirmar)" no
  deben ir a cámara sin fuente primaria, y la marca está bien puesta: las nueve
  son las que el barrido trae con una sola repetición y sin motivo de destaque,
  mientras las que la pieza deja sin marcar aun declarando un solo medio
  (Publimicro en el swap con China, Moody's, las alzas de alimentos y América
  Móvil; G5noticias en el estudio de Marsh; laconexion.cl en Puente Alto;
  Epicentro Chile en Copiapó) vienen todas corroboradas en dos o más fuentes.
  Tres pesan más que el resto: la tasa de desempleo de 9,6% (Soy de Osorno, un
  dato que el INE publica y que el veredicto del 23-10-2026 ya pidió no tomar de
  un titular), el pago de $4,5 millones a 6.300 profesores por deuda histórica
  (Publimicro, plata con nómina en el Mineduc) y el presidio perpetuo a "Los
  Piratas" (Puranoticia.cl, una condena que necesita rol y tribunal).
- Para la pieza siguiente: tres fechas de la pieza son cálculo propio sobre el
  día de la semana que escribieron los medios, y van dichas así en su propia
  candidata: la formalización del alcalde de Coronel el 26-10-2026, la
  ampliación de la detención del imputado de Maipú hasta el 27-10-2026 y el
  02-11-2026 del Presupuesto 2027. Las tres las verifica el informe en el
  tribunal o en el Congreso antes de que suenen en el video.
- Para la pieza siguiente: si falta material, la pieza deja a la vista
  veintisiete candidatas que quedaron fuera por tamaño, varias del mismo tema
  que domina el día: el caso por violación que Ex-Ante reconstruye como punto de
  quiebre de las rebajas de pena, Karla Rubilar pidiendo a Kast reconocer un
  "error gravísimo", el riesgo de un impuesto de hasta 26,5% al salmón chileno
  en Brasil y la muerte de un paciente por mordedura de araña de rincón en La
  Serena.
- Nueve titulares están reescritos apenas, con artículos agregados y la
  puntuación cambiada, y quedan casi palabra por palabra como el del barrido
  (líneas 35, 47, 55, 72, 75, 78, 129, 154 y 165). El prompt pide el titular "en
  tus palabras" y no fija una distancia, y la medición que el validador viene
  aplicando desde el 02-10-2026 se cumple (cero coincidencias literales tras
  normalizar comillas, tildes, entidades HTML y espacios, sobre las 58
  candidatas), así que no bloquea. Conviene igual apretarlo: con solo sumar
  artículos el titular no aporta el ángulo que esta etapa debería fijar.
- Falta la línea en blanco antes de "## Áreas sin material hoy" (línea 198), que
  queda pegada al "Por qué podría importar" de la última candidata de
  Internacional. El encabezado se sigue leyendo como tal y el formato estricto
  que el prompt describe es el del bloque de dos líneas de cada noticia, así que
  no bloquea; las otras catorce secciones sí traen su línea en blanco.
- Qué quedó verificado en esta vuelta, sobre esta versión y archivo por archivo:
  node scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos". Las 58
  candidatas (recontadas una por una, y la pieza declara 58) caen en el rango de
  35 a 60, vienen en bloques de dos líneas con sus dos barras, su URL y su línea
  "Por qué podría importar" con sangría de dos espacios, y las nueve marcas "(sin
  confirmar)" van al final del titular, antes de la primera barra. Las doce áreas
  de cobertura obligatoria tienen su propia sección y al menos una candidata, con
  lo que "Ninguna" en áreas sin material es consistente, y la cuota de regiones se
  cumple con holgura (Tarapacá, Antofagasta, Atacama, Coquimbo, Valparaíso,
  O'Higgins, Maule, Ñuble, Biobío, Los Lagos y Magallanes). Las tres secciones
  finales están en su orden. Cero rayas largas o medias y cero emojis en las 235
  líneas; las fechas en prosa van DD-MM-AAAA y las únicas AAAA-MM-DD son rutas
  del repo. Las 58 URL existen en contenido/barrido/2026-10-25.json, una por una,
  y cada medio declarado está respaldado ahí (los que no aparecen en el campo
  medios de la noticia principal están como medio de otra entrada del mismo tema
  o en su propio campo medios, como RFI en la nota de metrolibre). Las cifras de
  la nota del barrido calzan con el JSON del día: 224 con señal, 680 únicas, 22
  fuentes, 863 brutos, 31 de días previos, 10 de ruido, 54 descartadas por
  antiguas y ciper como única fuente caída; las doce notas de medios de
  investigación son todas de Ex-Ante y ninguna es de CIPER. La ausencia de
  cierres obligatorios se comprobó leyendo el informe anterior:
  contenido/informes/2026-10-24.md no trae ninguna línea "PENDIENTE DE CIERRE" en
  sus 239 líneas y su única "EN SEGUIMIENTO" es la de la línea 103, el alcalde de
  Chillán, que la pieza manda a historias sin novedad. Las dieciséis líneas de
  esa sección se verificaron término por término contra el JSON: cero
  coincidencias de "ojeda", "fonasa", "junji", "junaeb", "soser", "barros luco",
  "techo", "geosismos", "cicitem", "aguas del desierto", "fintual", "pisco",
  "transpacífico", "barriga", "medialuna", "google", "ácido sulfúrico" y
  "alcalde de chillán", y las coincidencias parciales son las que la pieza
  declara (tres de "Chillán", todas del brote de sarna; una de "Chonchi", un
  operativo médico dental; una de "Florida", el voto anticipado de Trump). Lo que
  la pieza dice del Markdown del barrido también es exacto: no tiene secciones de
  Salud, Educación ni Trabajo y pensiones, deja 37 noticias en "Sin área", rotula
  "Ciencia y tecnología" una sección de 15 donde once son fútbol, y pone el brote
  de sarna en "Economía", el incendio del colegio de Arauco y el temblor en
  "Medioambiente y clima" y los nuevos controles de licencias en "Vivienda y
  ciudad". El commit c685cee es "edición 2026-10-25: preselección", con su línea
  "Tarea: suplente (reparto permanente)" y tocando un solo archivo, el suyo.
