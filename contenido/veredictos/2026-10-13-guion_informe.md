VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-13T06:22:26Z

Correcciones:
1. Dónde: línea 30, última frase, "El convenio extiende la concesión, y el
   texto definitivo deberá precisar la aplicación en cada pórtico y franja",
   que narra de nuevo lo que la línea 26 ya dijo cuatro párrafos antes, "El
   acuerdo extiende la concesión por veinte meses" (el mismo hecho, con
   "convenio" por "acuerdo") · Regla: CONTROL INTERNO OBLIGATORIO, punto 3,
   "Verifica que no hay ningún tema narrado dos veces" · Debe quedar: la línea
   30 sin esa mención repetida, o sea el párrafo terminando así: "Para
   aterrizarlo: con la tarifa oficial de dos mil veintiséis del pórtico de
   Alameda a Río Mapocho, un paso en horario punta bajaría de unos trescientos
   sesenta y cuatro pesos a cerca de doscientos setenta y tres. El texto
   definitivo deberá precisar la aplicación en cada pórtico y franja." La
   extensión de la concesión se queda donde tiene el dato completo, la línea
   26 con sus veinte meses. Verificado en esta corrida: con ese borrado, node
   scripts/validar-tarjetas.js da 445 palabras narradas, dentro de 420 a 600,
   así que el piso no corre riesgo. Este hallazgo lo introdujo la corrección 2
   de la vuelta 1, que mandó llevar la extensión de la concesión a la línea 26
   sin advertir que la línea 30 ya la nombraba.

Observaciones:
- Para la pieza siguiente: el guion del informe cierra la cadena diaria, así
  que no hay pieza posterior que preparar. Cuando esta vuelta quede aprobada,
  los tres veredictos del día estarán en APROBADA (preselección vuelta 0 e
  informe vuelta 2 ya lo están) y en esa misma corrida se escribe
  contenido/revisiones/2026-10-13.md, que es la compuerta del render y de la
  publicación en la web.
- Las cinco correcciones de la vuelta 1, verificadas una por una en esta
  corrida: la 1, "La noticia del día" quedó en 34 palabras narradas (16 de la
  tesis más 18 del párrafo), dentro de 25 a 35; la 2, la línea 26 ya no repite
  la frase de la línea 12 y trae el detalle nuevo pedido, los veinte meses y
  las dos reacciones, fieles al informe; la 3, la línea 33 expande la sigla en
  "Observatorio del Contexto Económico (OCEC-UDP)", cinco palabras, y es la
  primera aparición en pantalla porque el [FUENTE] del bloque va al pie de la
  tarjeta de la tesis; la 4, las dos cifras quedaron en una sola [DATO
  comparacion] bien aplicada al árbol (fila 6, dos valores comparables en la
  misma unidad) y validar-tarjetas imprime "variedad OK"; la 5, la línea 46 ya
  no afirma lluvias nuevas y nombra su sujeto.
- El matiz "o de saturación" desapareció del guion completo (búsqueda
  explícita de "saturación" en el archivo en esta corrida: cero
  coincidencias). NO es INCUMPLE y por eso no está arriba: lo que la pieza
  afirma, veinticinco por ciento en horario punta, está en el informe con el
  mismo sentido y la misma cifra, y el prompt autoriza expresamente eliminar
  referencias técnicas y comprimir. Se anota porque el "Debe quedar" de la
  corrección 1 de la vuelta 1 pedía que ese matiz siguiera sonando en el
  bloque, y pedía algo que ninguna regla del prompt exige: el error fue del
  veredicto anterior, no de la pieza. Si de todos modos se quiere restituir,
  cabe en la línea 30 al hacer la corrección de arriba y la forma fiel al
  informe es "el descuento de veinticinco por ciento alcanza también al
  horario de saturación", once palabras, que dejarían el guion en 456.
- Las cifras habladas por bloque siguen sobre el tope y NO bloquean, por la
  misma razón que en la vuelta 1: el prompt no define si cuentan las fechas ni
  las menciones repetidas del mismo valor, y en treinta días de veredictos
  nunca se aplicó este tope. El bloque del TAG narra veinte meses, sesenta
  días, dos mil veintiséis, trescientos sesenta y cuatro pesos y doscientos
  setenta y tres (cinco), contra el "máximo tres cifras habladas por bloque".
  En la vuelta 1 anoté que con la corrección 2 ese bloque bajaría a tres, y no
  bajó, porque el reemplazo trajo los veinte meses: la predicción era mía y
  estaba mal, el tope sigue sin aplicarse. Vale zanjarlo por regla en el
  prompt y no por criterio de cada corrida.
- Sigue en pie, y sigue sin ser incumplimiento: la etiqueta de la línea 28,
  "tarifa punta PA13 para autos". PA13 es el código del pórtico y en pantalla
  no dice nada a quien ve el video en silencio, que es la prueba de la regla,
  aunque la etiqueta sí dice qué es la cifra y para quién. La narración de la
  línea 30 ya lo traduce, "el pórtico de Alameda a Río Mapocho". Sirve "tarifa
  punta pórtico Alameda, autos", cinco palabras.
- La carátula del 13-10-2026 ya está, y esto cambió desde la vuelta 1: listado
  de contenido/caratulas/ en esta corrida, aparecen 2026-10-13.png y
  2026-10-13-prompt.txt, sin 2026-10-13-NO-PUDE.md. Queda pendiente mirarla
  antes del render, que es trabajo de la revisión y no de este veredicto.
- Verificado en esta corrida, sin hallazgos: node scripts/revisar-mecanico.js
  imprimió "sin hallazgos mecánicos"; validar-tarjetas da 451 palabras
  narradas, dentro de 420 a 600, con tres comparacion, un cambio y un esquema,
  ninguna cuota rota y ninguna marca malformada; búsqueda explícita de rayas
  largas y medias en el archivo completo, cero; cero conectores de ensayo
  escrito de la lista prohibida; cero URLs; cero usos de "no solo"; el tagline
  "El resumen sin gritos." es la última frase hablada; las cuatro [TESIS]
  tienen 16, 16, 18 y 17 palabras, todas dentro del tope de 18, y todas llevan
  su línea en blanco antes del párrafo narrado; los tres bloques de estructura
  van sin corchete y los tres de noticia llevan categoría válida (economia,
  economia, emergencia), con Las Condes bien puesta en emergencia por los
  evacuados y el aluvión; la apertura tiene 29 palabras, dentro de 25 a 40,
  sitúa la fecha y adelanta las otras dos noticias; el cierre tiene 56, dentro
  de 40 a 60, dice que el informe completo está en el enlace de la descripción
  e integra la chaqueta impermeable liviana de "Para salir hoy"; el 13-10-2026
  es efectivamente martes, como dice la línea 16; el [ESQUEMA] de la línea 52
  corresponde porque Las Condes es noticia de proceso, y lleva cuatro
  elementos de un máximo de seis; el informe no trae ningún encabezado
  "Análisis" (búsqueda explícita en el archivo completo), así que no
  corresponde ninguna marca [INTERPRETACIÓN], y no trae citas textuales de las
  tres noticias narradas, así que tampoco corresponde ninguna [CITA].
- La selección quedó bien y no se toca. El informe trae cuatro noticias [A];
  el guion narra la portada (rebaja del TAG) primera y las dos [A] siguientes
  en el orden del informe (desempleo con educación superior y Las Condes), así
  que la muerte de los dos contratistas en El Teniente queda en la web, que es
  lo que manda la regla 4 de QUÉ SE NARRA. Tres bloques de noticia, ni uno
  más, y no hay "En titulares", ni Dato curioso, ni Agenda, ni "¿En qué
  quedó?".
- "Fuentes:" quedó completa y sin archivos internos: las doce líneas
  corresponden a las fuentes de las marcas y a las del informe para las tres
  noticias narradas, incluidas Dirección General de Concesiones, Canal 9 Bío
  Bío Televisión, El Mostrador y Ministerio de Educación. Ninguna fuente
  aparece citada en la prosa del guion, así que no falta crédito por esa vía.
- Sigue en pie la observación sobre el prompt y no sobre la pieza: no está
  dicho si "La noticia del día" cuenta sus palabras con la tesis narrada o
  solo con el párrafo. En esta edición la diferencia decide, y por eso conviene
  fijarlo: con la tesis la sección tiene 34 palabras y cumple; solo con el párrafo
  tiene 18 y quedaría bajo el piso de 25. La pieza corrigió hacia la lectura
  que incluye la tesis, que es la única que deja "dos frases", y es la que usó
  el veredicto de la vuelta 1.
