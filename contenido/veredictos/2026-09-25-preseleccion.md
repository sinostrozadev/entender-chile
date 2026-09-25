VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-25T11:50:15Z

Observaciones:
- Para la pieza siguiente: la candidata del paro nacional de la Confech para el
  01-10-2026 (línea 147) viene de un solo medio, Vilas Radio, y el barrido la
  trae marcada como "alarma: paro nacional (un solo medio por ahora)" (línea
  648 de contenido/barrido/2026-09-25.md). La pieza no le puso "(sin
  confirmar)", aunque sí marcó las otras tres candidatas de un solo medio por
  ahora (notichile en línea 77, ADN Radio en línea 80, Canal 9 Bío Bío
  Televisión en línea 133). El prompt deja la marca al criterio de quien
  escribe, así que no bloquea, pero el informe debería confirmar la
  convocatoria y la fecha antes de narrarla.
- Para la pieza siguiente: el balance del sistema frontal trae tres cifras
  distintas en la misma entrada. La pieza dice "16 personas aisladas y 370
  viviendas dañadas" (línea 116), igual que el titular del barrido (línea 678),
  pero la URL de La Tercera que cita termina en "16-personas-aisladas-y-369-
  viviendas-con-dano-menor" y otra entrada del barrido habla de "más de 70 de
  viviendas con daños" (línea 669). La propia pieza advierte que es "el dato
  que el informe debe verificar y actualizar": conviene resolver 370 contra 369
  y el matiz de "daño menor" contra "dañadas" con Senapred antes de ponerlo en
  cámara.
- Para la pieza siguiente: el Escudo de las Américas es el eje del día y la
  pieza lo cubre con siete candidatas en Política (líneas 5, 8, 11, 14, 17, 20 y
  23), pero deja fuera las exclusivas de investigación y el contrapunto
  oficialista que el barrido sí trae:
  "Controvertido giro hacia Washington: críticas y dudas por la trastienda de
  adhesión de Chile al Escudo" (Interferencia, línea 363), "La coordinación de
  los excancilleres opositores y cómo se prepara la interpelación a Pérez
  Mackenna" (Ex-Ante, línea 378), "Guillermo Ramírez, presidente de la UDI: la
  interpelación al canciller es una irresponsabilidad" (Ex-Ante, línea 390),
  "La explicación del gobierno por las declaraciones a las que adhirió Chile
  cuando aún no oficializaba su ingreso" (latercera.com, línea 84), "Libertarios
  ofician al canciller y al ministro Barros para que detallen los efectos de la
  adhesión" (La Tercera, línea 87) y la postura de Parisi (ADN Radio, línea 90).
  Las dos primeras dan trastienda y las dos siguientes dan la vereda de
  enfrente, que hoy la olla solo tiene en la respuesta de Kast (línea 20).
- Para la pieza siguiente: la frase del Presidente Kast "Hemos logrado un
  control casi total de la inmigración irregular" está en el barrido en tres
  entradas (líneas 243, 336 y 585) y la pieza la dejó solo como historia sin
  novedad, sin candidata propia. Es una declaración presidencial citable y
  empalma con el 93% de baja en cruces irregulares detectados en la frontera
  norte que trae el informe del 24-09-2026 (línea 32), donde quedó marcada
  FUERA DE LA OLLA. Si el informe la usa, el par declaración más cifra es el
  que la hace verificable.
- Para la pieza siguiente: el barrido trae alertas rojas con comuna y río
  concretos que la pieza resume solo en la alerta general de Senapred (línea
  110): "Alerta Roja en Cautín: desbordes de ríos amenazan a viviendas y
  sectores poblados" (línea 687), "Temporal en el sur de Chile causa estragos:
  Alerta Roja en Cautín y desborde de dos ríos en Carahue" (línea 714) y
  "Aumento de caudales en cuatro ríos activa Alerta Roja en región del Bío Bío"
  (línea 693). Para narrar el temporal con lugares, esos son los datos.
- Para la pieza siguiente: queda sin recoger una alarma de Seguridad, "Fiscalía
  activa protocolo de Interpol para buscar a paraguaya desaparecida en Chile"
  (abc.com.py, línea 330, un solo medio por ahora).
- Para la pieza siguiente: el informe del 24-09-2026 no contiene ninguna línea
  "PENDIENTE DE CIERRE" (búsqueda literal sobre contenido/informes/2026-09-24.md:
  cero coincidencias), así que hoy no hay cierres prometidos que resolver con el
  número real. Lo que sí queda abierto y sin novedad en el barrido está en la
  sección correspondiente de la pieza, y esas ausencias las comprobé una por
  una: reforma al sistema político, Antibarricadas, Escondida, CMPC corrugados
  y expediente Fodich no aparecen en contenido/barrido/2026-09-25.md.
- Para la pieza siguiente: en la olla de hoy no hay ninguna candidata de fuente
  primaria institucional. La pieza la escribió el respaldo, que no navega, y las
  seis fuentes sin feed de contenido/barrido/fuentes.json (Contraloría, Banco
  Central, Cámara, Senado, Dirección Meteorológica y Ministerio Público) no se
  abrieron. El informe debería contar con que todo lo de hoy viene del barrido y
  verificar sus cifras contra la fuente primaria donde importe.
- La limitación de no abrir las institucionales no es incumplimiento: el punto 6
  de prompts/respaldo-preseleccion.md autoriza expresamente al respaldo a
  trabajar solo con el material del repo y le exige declarar la limitación en el
  bloque interno. Está declarada ahí y también en "Notas del barrido" (líneas
  207 y 208), que es donde el formato de prompts/seleccion.md pide anotar si
  alguna fuente institucional no abrió. Por lo mismo tampoco bloquea el bloque
  interno en comentario HTML del final, que el respaldo obliga a incluir, ni
  haber saltado el PASO CERO, que el propio prompt permite saltar cuando la
  corrida no viene del evento del PR.
- Fidelidad verificada contra la entrada: las 54 URL de la pieza están en
  contenido/barrido/2026-09-25.md (comprobación una por una, 54 de 54), y los
  medios citados coinciden con los del barrido en todas. El único caso donde la
  pieza suma medios que el bloque de esa URL no trae es la candidata de la
  reunión Kast y Delcy Rodríguez (línea 186, "MPPRE, Bloomberg Línea,
  Universidad de Chile"): las tres están en el barrido para el mismo hecho
  (líneas 612, 168 y 246), así que la atribución se sostiene.
- Requisitos de forma cumplidos: 54 candidatas, dentro del rango de 35 a 60; las
  doce áreas obligatorias con al menos una candidata cada una; todas las
  candidatas en el bloque de dos líneas con titular, medio y URL, y con su línea
  "Por qué podría importar" de una sola frase (comprobado en las 54); las tres
  secciones de cierre presentes; cuota de regiones cumplida holgadamente (San
  Rosendo y Santa Bárbara, Chuquicamata, Rengo, Lanco, La Unión, Curarrehue y
  Pucón, isla Huar y Calbuco, Vallenar, Magallanes y Arica); sin rayas largas ni
  emojis (búsqueda explícita de U+2012 a U+2015 y de símbolos: cero
  coincidencias); fechas en prosa en DD-MM-AAAA. La ruta y el mensaje de commit
  siguen el contrato: "edición 2026-09-25: preselección", con cuerpo "Tarea:".
