VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-20T05:52:06Z

Correcciones:
1. Dónde: línea 13, "Las clases de este martes se suspendieron allí y hay tres
   perímetros de seguridad." · Regla: "La FECHA EXACTA manda: si el informe da
   la fecha de un hecho, nunca la reemplaces por 'esta semana', 'hace unos
   días' o 'recientemente', y menos en la frase que abre el bloque" (y regla
   dura 35, "nunca 'ayer' ni 'la semana pasada' en un texto que se lee
   después"). El informe da la fecha exacta en la línea 13: "suspendió las
   clases del 20-10-2026 en las diez comunas bajo alerta". "Este martes" es una
   referencia relativa sin resolver, y está en la primera frase que se oye del
   video, que es la que queda publicada. La apertura de la línea 16 sí dice
   "Este veinte de octubre", así que la pieza queda inconsistente consigo
   misma. · Debe quedar: la fecha dicha en la misma frase, por ejemplo "Las
   clases del veinte de octubre se suspendieron allí y hay tres perímetros de
   seguridad." (o "este martes veinte de octubre", que también la resuelve).
   Verificado: con ese reemplazo "La noticia del día" queda en 29 palabras
   narradas y dos frases, dentro del rango de 25 a 35 que pide la estructura.
2. Dónde: línea 39, "sin fecha de votación de sala comunicada en las fuentes
   del informe." · Regla: "Nárralo como propio, sin mencionar el informe como
   documento: nunca 'el informe usa una comparación', 'según el informe de
   hoy'. Para el oyente no existe ningún informe; existe lo que tú le cuentas."
   El guion narra "las fuentes del informe", que nombra el documento interno
   dentro del texto hablado. No es el caso del cierre: ahí la estructura 8 pide
   decir que el informe completo está en el enlace de la descripción, y esa
   frase se queda como está. · Debe quedar: la misma información sin nombrar el
   documento ni la ausencia, por ejemplo "Quedó en la Comisión de Derechos
   Humanos de la Cámara, y el próximo paso es la discusión en la sala.", que es
   lo que dice el informe en su línea 23 ("El próximo paso es la discusión
   legislativa en la Cámara") y cierra el bloque con un hecho concreto.
   Verificado: con ese reemplazo el guion queda en 523 palabras narradas,
   dentro del rango de 420 a 600.

Observaciones:
- La tercera carátula, "Diez comunas, / tres perímetros", cumple el formato
  (dos líneas, cuatro palabras como tope, tres enfoques distintos) y no
  bloquea, pero son dos cifras sin referencia: el prompt pide para la tercera
  "una CIFRA CON REFERENCIA (solo si la cifra se entiende en un segundo sin
  contexto)". "Tres perímetros" no se entiende solo, y la prueba del gancho
  (un desconocido no debería tener que preguntar "¿de qué?") la pasa justo. El
  guion del 19-10-2026 salió con la misma forma ("Siete regiones, / diez
  comunas sin clases"), así que es un patrón que conviene cortar, no un
  hallazgo nuevo de esta pieza: con una referencia ("Diez comunas, / ¿la tuya
  entre ellas?") el gancho queda más claro.
- La marca de la línea 30 lleva "[FUENTE Cámara de Diputadas y Diputados, 19
  oct]", siete palabras contra el tope de seis del formato legible. Se toma
  tal cual del informe y es el nombre oficial de la institución, y hay
  precedentes aprobados más largos (el 13-10-2026 pasó "Observatorio del
  Contexto Económico (OCEC-UDP), 12 oct"), así que no bloquea. Si se quiere
  dentro del tope, "Cámara de Diputados, 19 oct" lo deja en cuatro.
- El veredicto del informe de hoy avisó que el tope de un cierre de cautela ya
  estaba gastado en la línea 79 del informe ("cada familia debe confirmar la
  resolución de su comuna o establecimiento"). Ese tope es del prompt del
  informe y no del prompt del guion, así que no es INCUMPLE acá, pero la
  cadencia sí cruzó: el guion trae cinco cierres de ese tipo (líneas 25, 27,
  33, 45 y 48). Los cinco son consecuencias concretas y están sostenidos por
  el informe; lo que se nota es la repetición de la fórmula "X no es lo mismo
  que Y", y con tres noticias se escucha más que con diez.
- "La noticia del día" y el primer bloque repiten los dos mismos hechos: las
  clases suspendidas (líneas 13 y 22) y los tres perímetros (líneas 13 y 25).
  La estructura pide que el primer bloque CONTINÚE desde la apertura en frío
  con el detalle y los actores, y eso se cumple (la lista de las diez comunas,
  el biministro, San Carlos de Apoquindo), pero las dos frases de arranque
  suenan parecidas.
- Lo que quedó verificado y no hay que volver a tocar: la selección es exacta
  (portada primera y las otras dos [A] en el orden del informe, sin "En
  titulares", Dato curioso, Agenda ni "¿En qué quedó?"); las cuatro etiquetas
  de las marcas [DATO] dicen qué es la cifra y en qué situación, una por una
  ("comunas metropolitanas bajo alerta roja", "perímetros de seguridad
  delimitados en la región", "integrantes del Consejo del instituto",
  "prohibición mínima de reingreso en ciertos casos"); los dos [DATO cambio]
  se miden contra la base vigente (once integrantes y tres años, los de la ley
  actual); las cuatro [TESIS] están bajo las 18 palabras y con su línea en
  blanco; los dos [ESQUEMA] corresponden a los dos trámites legislativos; las
  ocho líneas de "Fuentes:" cubren las marcas y las fuentes narradas y ninguna
  nombra un archivo interno del repo; y la fidelidad al informe cierra en las
  diez comunas, los tres polígonos, el llamado de Máximo Pavez antes de las
  10:00 del 20-10-2026, los 128 votos a favor y once en contra, el Consejo de
  once a cinco y la prohibición de reingreso de tres a cinco años.
  `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos" y
  `node scripts/validar-tarjetas.js` da 524 palabras narradas con variedad OK.
