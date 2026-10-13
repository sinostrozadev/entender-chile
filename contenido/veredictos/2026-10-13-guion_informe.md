VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-13T06:10:58Z

Correcciones:
1. Dónde: la sección "## La noticia del día" suma 37 palabras narradas, la
   [TESIS] de la línea 10 (16 palabras) más el párrafo de la línea 12 (21
   palabras) · Regla: ESTRUCTURA DEL GUION, punto 1: "Dos frases, 25 a 35
   palabras en total, con su [TESIS] o su [DATO] principal como tarjeta (una
   sola marca) y su [FUENTE]" · Debe quedar: las dos frases de la sección
   sumando entre 25 y 35 palabras. Recortar el párrafo de la línea 12 a 18
   palabras deja la sección en 34, contado en esta corrida: "La reducción llega
   al veinticinco por ciento en horario punta y al diez por ciento fuera de
   punta." El matiz "o de saturación", que el informe trae, tiene que seguir
   sonando dentro del bloque de la noticia (líneas 22 a 30), no en esta
   sección.
2. Dónde: línea 26, primera frase, "El descuento será de veinticinco por ciento
   en horario punta o de saturación, y de diez por ciento fuera de punta", que
   repite la frase de la línea 12, "La reducción llegará al veinticinco por
   ciento en horario punta o de saturación y al diez por ciento fuera de punta"
   (15 de sus 21 palabras son las mismas y en el mismo orden) · Regla:
   ESTRUCTURA DEL GUION, punto 3: "El primero CONTINÚA desde 'La noticia del
   día' (el detalle, los actores, el antecedente) sin repetir literalmente sus
   frases", y CONTROL INTERNO 3: "Verifica que no hay ningún tema narrado dos
   veces" · Debe quedar: esa frase se borra y en su lugar va detalle que la
   sección de apertura no dijo y que el informe sí trae, en la entrada "[A]
   Autopista Central tendrá rebajas de 25% en horario punta y 10% fuera de
   punta": que el acuerdo extiende la concesión por veinte meses, y las dos
   reacciones que el informe registra (Franco Parisi, secretario general del
   Partido de la Gente, dijo que la extensión favorece a la concesionaria; la
   senadora Camila Flores, presidenta de la Comisión de Transportes, valoró la
   rebaja y criticó que no alcance a las regiones). La segunda frase de la línea
   26, la de las cuentas pagadas dentro de los primeros sesenta días, se
   conserva. OJO CON EL PISO: hoy el guion tiene 424 palabras narradas según
   node scripts/validar-tarjetas.js, y entre esta corrección y la 1 se van 24,
   así que el reemplazo tiene que sumar al menos 20 palabras narradas nuevas
   para no bajar del piso de 420. Vuelve a correr el script antes de entregar.
3. Dónde: línea 33, "[FUENTE OCEC-UDP vía CNN Chile, 12 oct]", primera
   aparición en pantalla de la sigla, que se repite en las marcas [DATO] de las
   líneas 36 y 40 y nunca queda expandida en el guion (la expansión solo
   aparece en "Fuentes:", línea 68, que no se pinta) · Regla: FORMATO DE SALIDA,
   marca [FUENTE]: "toda sigla que se PINTE EN PANTALLA (en esta marca o en el
   pie de un [DATO]) va expandida la primera vez que aparece en el guion:
   'Dirección Meteorológica (DMC)', no 'DMC' a secas. Después ya se puede
   abreviar. Se salvan las de uso corriente que cualquiera lee sin traducir
   (IPC, PIB, ONU, INE, Carabineros, PDI)", y CONTROL INTERNO 17b · Debe
   quedar: la línea 33 con la sigla expandida y dentro del tope de seis
   palabras de la marca, por ejemplo "[FUENTE Observatorio del Contexto
   Económico (OCEC-UDP), 12 oct]", que son cinco palabras contadas en esta
   corrida. Las líneas 36 y 40 pueden seguir con "OCEC-UDP", porque después de
   la primera expansión la regla permite abreviar.
4. Dónde: líneas 36 y 40, "[DATO cifra | OCEC-UDP vía CNN Chile, 12 oct]
   desocupación con educación superior: 8,3% (sube mal)" y "[DATO cifra |
   OCEC-UDP vía BioBioChile, 12 oct] menores de 30 con educación superior: 15,9%
   (sube mal)", las dos dentro del bloque "## Desempleo con educación superior
   [economia]"; node scripts/validar-tarjetas.js lo marca en la línea 40 ·
   Regla: marca [DATO], VARIEDAD: "nunca dos tarjetas del mismo tipo seguidas
   dentro del mismo bloque", con su remedio: "Si una cuota se rompe, primero
   revisa si aplicaste mal el árbol (la causa más común); si el árbol está bien
   aplicado, deja la cifra sobrante en la narración" · Debe quedar: el árbol
   quedó mal aplicado. 8,3% y 15,9% son dos valores de cosas distintas,
   comparables y en la misma unidad, o sea la fila 6, comparacion. Una sola
   tarjeta en el bloque, por ejemplo "[DATO comparacion | OCEC-UDP vía CNN
   Chile, 12 oct] desocupación con educación superior: 8,3% total ; 15,9%
   menores de 30", y la marca de la línea 40 se borra. Sirve igual la otra
   salida que la regla permite: dejar la de la línea 36 como cifra y el 15,9%
   solo en la narración de la línea 42. Las dos cifras ya están narradas, así
   que ninguna información se pierde.
5. Dónde: línea 48, segunda frase, "La medida respondió a nuevas lluvias sobre
   suelos afectados por el aluvión del ocho de octubre" · Regla: FIDELIDAD
   TOTAL AL INFORME: "Usa exclusivamente el contenido del informe de hoy
   (contenido/informes/AAAA-MM-DD.md) como fuente informativa base" y "NO
   agregues noticias, datos, opiniones ni predicciones". El informe, en la
   entrada "[A] Las Condes levanta la evacuación preventiva y mantiene
   suspendidas las clases", dice: "La orden había fijado la evacuación desde
   las 13:00 y el despeje del área antes de las 15:00, debido al pronóstico de
   lluvias sobre suelos afectados por el aluvión del 08-10-2026". Lo que
   motivó la evacuación fue el PRONÓSTICO de lluvias; el informe no afirma en
   ninguna de sus líneas que hayan caído lluvias nuevas (búsqueda explícita de
   "lluvia" en el archivo completo en esta corrida: aparece en esa entrada, en
   la alerta de Senapred para Coquimbo y Valparaíso y en "Para salir hoy", y
   las tres hablan de pronóstico o de riesgo) · Debe quedar: la frase dice que
   la evacuación se había ordenado por el pronóstico de lluvias, no que una
   lluvia nueva haya caído, y nombra su sujeto, porque "La medida" viene
   justo después de la frase que autoriza el regreso y se lee como si el
   regreso fuera la respuesta a las lluvias. Por ejemplo: "La evacuación se
   había ordenado por el pronóstico de lluvias sobre suelos que el aluvión del
   ocho de octubre dejó dañados."

Observaciones:
- Para la pieza siguiente: el guion del informe cierra la cadena diaria, así
  que no hay pieza posterior que preparar. Cuando esta vuelta quede aprobada,
  los tres veredictos del día estarán en APROBADA y en esa misma corrida se
  escribe contenido/revisiones/2026-10-13.md, que es la compuerta del render y
  de la publicación en la web.
- La selección quedó bien y no se toca en la corrección. El informe trae cuatro
  noticias [A]; el guion narra la portada (rebaja del TAG) primera y las dos [A]
  siguientes en el orden del informe (desempleo con educación superior y Las
  Condes), así que la muerte de los dos contratistas en El Teniente queda en la
  web, que es lo que manda la regla 4 de QUÉ SE NARRA. Tres bloques de noticia,
  ni uno más, y no hay "En titulares", ni Dato curioso, ni Agenda, ni "¿En qué
  quedó?".
- Las cifras habladas por bloque están sobre el tope y NO bloquean, porque el
  prompt no define si cuentan las fechas ni las menciones repetidas del mismo
  valor, y en treinta días de veredictos nunca se aplicó este tope. Lo cuento
  para que se pueda zanjar por regla y no por criterio: el bloque del TAG narra
  veinticinco por ciento, diez por ciento, sesenta días, trescientos sesenta y
  cuatro pesos y doscientos setenta y tres (cinco), contra el "máximo tres
  cifras habladas por bloque"; con la corrección 2 ese bloque baja a tres. El
  bloque del desempleo narra 8,3% en la tesis y otra vez en la línea 38, más
  trescientas cincuenta y seis mil personas y quince coma nueve por ciento. El
  de Las Condes narra veintiún establecimientos, doce colegios y nueve jardines
  infantiles, más tres fechas.
- Etiqueta de la línea 28, "tarifa punta PA13 para autos": PA13 es el código
  del pórtico y en pantalla no dice nada a quien ve el video en silencio, que
  es la prueba de la regla. La narración de la línea 30 ya lo dice en palabras
  entendibles, "el pórtico de Alameda a Río Mapocho". Sirve "tarifa punta
  pórtico Alameda, autos", cinco palabras. No es incumplimiento porque la
  etiqueta sí dice qué es la cifra y para quién.
- La línea 30 dice "El convenio extiende la concesión" y el informe trae el
  plazo, veinte meses. No lo exige ninguna regla, pero es material disponible y
  es justo lo que conviene usar en el reemplazo que pide la corrección 2.
- El tope de 18 palabras de la [TESIS] quedó al borde en la línea 34, con 18
  exactas. Está dentro, y se avisa porque cualquier palabra que la corrección 4
  agregue ahí la pasa.
- Verificado en esta corrida, sin hallazgos: node scripts/revisar-mecanico.js
  imprimió "sin hallazgos mecánicos"; búsqueda explícita de rayas largas y
  medias en el archivo completo, cero; cero conectores de ensayo escrito de la
  lista prohibida; cero URLs; el tagline "El resumen sin gritos." es la última
  frase hablada; las cuatro [TESIS] llevan su línea en blanco antes del párrafo
  narrado; los bloques de estructura van sin corchete y los tres de noticia
  llevan categoría válida (economia, economia, emergencia), con Las Condes bien
  puesta en emergencia por los evacuados y el aluvión; las tres carátulas
  cumplen el máximo de cuatro palabras por línea y los tres enfoques (pregunta,
  giro, cifra con referencia); "Clima de carátula: economico" es una de las seis
  palabras y calza con la portada; el cierre tiene 56 palabras, dentro de 40 a
  60, dice que el informe completo está en el enlace de la descripción e integra
  la chaqueta impermeable liviana de "Para salir hoy"; la apertura tiene 29
  palabras, sitúa la fecha y adelanta las otras dos noticias; y el 13-10-2026 es
  efectivamente martes, como dice la línea 16.
- "Fuentes:" quedó completa y sin archivos internos: están las ocho fuentes de
  las marcas y las del informe para las tres noticias narradas, incluidas
  Dirección General de Concesiones, Canal 9 Bío Bío Televisión, El Mostrador y
  Ministerio de Educación. Ninguna fuente aparece citada en la prosa del guion.
- La carátula de hoy todavía no está. Listado de contenido/caratulas/ en esta
  corrida: los últimos con fecha son 2026-10-12.png y 2026-10-12-prompt.txt, y
  la búsqueda de "2026-10-13" en esa carpeta devuelve cero coincidencias, sin
  2026-10-13-NO-PUDE.md. No bloquea, porque el prompt manda commitear el guion
  primero y la imagen después, pero conviene mirarlo antes del render.
- Sigue en pie la observación de ayer sobre el prompt y no sobre la pieza: no
  está dicho si "La noticia del día" cuenta sus palabras con la tesis narrada o
  solo con el párrafo. Hoy no cambia nada, porque las dos lecturas quedan fuera
  del rango (37 con la tesis, 21 sin ella, contra un rango de 25 a 35) y la
  única que deja "dos frases" es la que incluye la tesis. Valdría la pena fijarlo
  en el prompt.
