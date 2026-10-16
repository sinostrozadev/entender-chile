VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-16T05:50:00Z

Correcciones:
1. Dónde: "## Apertura", la sección completa ("Es viernes dieciséis de octubre
   de dos mil veintiséis. Hoy también miramos la visita de José Antonio Kast a
   Bolivia, donde se negocia una agenda bilateral, y una proyección de alivio
   en las cuentas de la luz que no será igual en todas las regiones."), que
   tiene 45 palabras narradas · Regla: ESTRUCTURA DEL GUION, punto 2: "APERTURA:
   DESPUÉS de la noticia del día, máximo 15 segundos (25 a 40 palabras)" ·
   Debe quedar: la apertura con 40 palabras narradas o menos, conservando la
   fecha y el adelanto en una frase de las otras dos noticias. Sirve quitar el
   inciso "donde se negocia una agenda bilateral": "Es viernes dieciséis de
   octubre de dos mil veintiséis. Hoy también miramos la visita de José Antonio
   Kast a Bolivia y una proyección de alivio en las cuentas de la luz que no
   será igual en todas las regiones." (39 palabras, contadas).

2. Dónde: bloque "## Kast viaja a Bolivia [internacional]", último párrafo, las
   dos frases finales: "Los cancilleres habían preparado el terreno con su
   reunión de octubre. La visita está programada para este dieciséis de octubre
   y los memorandos mencionados siguen en preparación." · Regla: CONTROL INTERNO
   OBLIGATORIO, punto 3: "Verifica que no hay ningún tema narrado dos veces", y
   FIDELIDAD TOTAL AL INFORME: "nárralo una sola vez, en el lugar de mayor
   desarrollo, y no lo reintroduzcas" · Debe quedar: fuera esas dos frases. La
   reunión de cancilleres del ocho de octubre ya se narró dos frases antes ("Ya
   hubo un paso previo: los cancilleres de ambos países se reunieron el ocho de
   octubre"); la fecha de la visita ya está en la apertura y en la primera frase
   del bloque; y "los memorandos siguen en preparación" ya se dijo en "Son
   documentos en preparación, no acuerdos cerrados". Si el bloque necesita una
   frase de cierre con un hecho, el informe trae uno todavía no narrado: la
   agenda boliviana lleva once asuntos en discusión (Presidencia de Bolivia, 9 y
   15 oct). Cuidando el piso de 420 palabras narradas del total.

3. Dónde: bloque "## Cuentas de la luz desde enero [economia]", segundo párrafo:
   "Pero hay una diferencia territorial: las coberturas del informe anticipan
   alzas en Los Ríos, Los Lagos y Magallanes." · Regla: FIDELIDAD TOTAL AL
   INFORME, "Usa exclusivamente el contenido del informe de hoy como fuente
   informativa base" y "No cambies el sentido de ninguna cifra"; el informe dice
   "El mismo informe prevé alzas en Los Ríos, Los Lagos y Magallanes, según las
   coberturas regionales", donde quien prevé las alzas es el informe técnico de
   la Comisión y las coberturas regionales son la fuente · Debe quedar: la
   previsión atribuida al informe técnico, no a las coberturas. Por ejemplo:
   "Pero hay una diferencia territorial: ese mismo informe técnico anticipa
   alzas en Los Ríos, Los Lagos y Magallanes." (18 palabras, contadas).

4. Dónde: sección "Fuentes:", sus dieciocho líneas, cada una con su dirección
   web ("- Cooperativa, 15 oct 2026: https://cooperativa.cl/noticias/...") ·
   Regla: FORMATO DE SALIDA: "No incluyas URLs, emojis, paréntesis,
   bibliografía, notas al editor, marcas de tiempo, indicaciones de edición ni
   advertencias fuera de las marcas definidas", y "lista una línea por cada
   fuente" · Debe quedar: cada línea con medio o institución y fecha, sin la
   dirección web, y una sola línea por fuente juntando sus fechas, como en las
   ediciones anteriores: "- Cooperativa, 1 y 15 oct 2026.", "- La Tercera, 29
   ago y 15 oct 2026.". Hoy Cooperativa ocupa tres líneas y La Tercera dos. Las
   fuentes y las fechas no cambian: sale la dirección y se juntan las repetidas.

Observaciones:
- Para la pieza siguiente: no hay pieza de GPT después de esta; lo que sigue es
  la revisión del día.
- La selección está correcta y verificada contra el informe: la portada
  (condena a Villegas, única [A]) primero, y las dos [B] que "En una mirada"
  trae primero (Kast en La Paz y la rebaja de la CNE). Tres bloques, sin "En
  titulares", sin Dato curioso, sin Agenda y sin "¿En qué quedó?".
- `scripts/revisar-mecanico.js` no encontró hallazgos y
  `scripts/validar-tarjetas.js` da 467 palabras narradas (dentro de 420 a 600),
  cuatro bloques con fuente y variedad sin cuotas rotas. Las correcciones 1 a 3
  restan unas treinta palabras: el total queda sobre el piso igual, pero
  conviene contarlo de nuevo antes de entregar.
- Las tres [TESIS] tienen 15, 14 y 15 palabras, con su línea en blanco detrás, y
  las dos marcas [DATO] traen etiqueta con contexto, fuente y fecha. El
  [ESQUEMA] del caso Ojeda cubre la exigencia de noticia de proceso.
- La "Carátula 3" es un segundo giro ("Primera sentencia oral / faltan otros
  juicios") y no una cifra con referencia. El prompt lo permite cuando no hay
  cifra que se entienda sola, y acá la única (veinte años) ya está en la
  "Carátula 2", así que no bloquea. Queda anotado por si conviene probar una
  tercera con cifra en otra edición.
