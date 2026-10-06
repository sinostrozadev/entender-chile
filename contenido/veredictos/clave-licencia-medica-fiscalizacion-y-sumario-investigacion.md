VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: investigacion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/investigacion-clave.md
VALIDADO: 2026-10-06T02:34:05Z

Correcciones:
1. Dónde: las cinco menciones que acreditan el CIC N°26 con
   "https://linktr.ee/contraloriacl": los dos párrafos de la sección 8 (el de
   los 7.207 servidores públicos y el de la metodología del cruce), la
   cronología del 02-10-2026, la línea de los 7.207 en "Cifras" y la fuente 12
   de la lista (líneas 64, 66, 92, 97 y 138) · Regla:
   prompts/investigacion-clave.md, "Cada afirmación con su fuente: medio o
   institución + fecha + enlace", y la propia pieza declara en "Lo que NO se
   pudo averiguar" que no pudo descargar el PDF del Consolidado · Debe quedar:
   cada una de esas cinco menciones acreditada con la publicación de prensa que
   cubrió el dato, nombrada como tal (Cooperativa del 02-10-2026 y ADN Radio
   del 02-10-2026 ya están citadas al lado en la sección 8), o con la URL
   directa del documento de Contraloría si se consigue. Un linktr.ee es un
   agregador de enlaces: no acredita nada, su contenido cambia sin aviso y
   presentarlo como "enlace institucional" le da al dato una firmeza que no
   tiene. Buscado "linktr" en el archivo completo: cinco coincidencias, esas.
   (Era la corrección 4 de la vuelta 1 y vuelve sin cambios.)

2. Dónde: en "Las preguntas de la pauta", la respuesta 7, "¿Por qué no se
   recuperó dinero pese a las condenas?" (línea 123), acreditada solo con
   "[BioBioChile, 03-09-2026](...corte-suprema-acoge-amparo-y-revoca-prision-preventiva...)"
   · Regla: prompts/investigacion-clave.md, "Cada afirmación con su fuente:
   medio o institución + fecha + enlace", que exige que la fuente citada
   sostenga lo que se afirma · Debe quedar: la afirmación de que condenar y
   cobrar son etapas distintas, con una fuente que trate de la ejecución del
   fallo o del cobro; o sin enlace y declarado que no se encontró fuente, con
   la remisión a la línea de "Lo que NO se pudo averiguar" que ya dice que no
   hay constancia de ingreso al Fisco. La nota citada trata de una prisión
   preventiva revocada, que es otro asunto. (Era la corrección 5 de la vuelta 1
   y vuelve sin cambios.)

3. Dónde: la Circular 3890, citada en la cronología del 05-11-2025 (línea 88)
   como "suseso.gob.cl/612/w3-article-767521.html" y en sus otras cinco
   menciones como "suseso.gob.cl/622/w3-propertyvalue-774967.html": los dos
   párrafos de la sección 3, el primer ítem de "Lo que se dice pero no está
   confirmado", la respuesta 3 y la fuente 4 de la lista (líneas 26, 28, 76,
   119 y 130) · Regla: una fuente, una dirección; el lector que sigue la
   cronología tiene que llegar al mismo documento que el que sigue las Fuentes,
   que es lo que pide "Cada afirmación con su fuente: medio o institución +
   fecha + enlace" · Debe quedar: las seis menciones apuntando al mismo
   documento, o dicho cuál es la circular y cuál el compendio, si de verdad son
   dos. (Era la corrección 6 de la vuelta 1 y vuelve sin cambios; la vuelta 1
   contó cuatro menciones del segundo enlace y son cinco.)

Observaciones:
- Para la pieza siguiente: el enlace que sostiene el CIC N°26 en cinco pasajes
  sigue siendo un agregador, y la pieza declara que no pudo descargar el PDF
  íntegro del Consolidado. Eso no es incumplimiento, porque dice qué se buscó y
  por qué no aparece, y es material del video: la entrega puede usar las cifras,
  pero no el desglose por servicio ni las notas metodológicas literales, que
  siguen sin verificar.
- Para la pieza siguiente: el sondeo del 01-10-2026, que la pauta trae marcado
  "(se dice)" en su sección 3, quedó declarado como no ubicado. La entrega no
  puede usarlo como dato, y si lo menciona tiene que ser por lo que la pieza
  dice: que no se encontró una publicación con ficha técnica y enlace.
- Para la pieza siguiente: dos datos de la sección 3 de la pauta no están en el
  dossier, y ninguno venía marcado "(por verificar)", así que no son hallazgo:
  la red de 16 sociedades de fachada que entre 2020 y 2022 emitió más de 60.000
  licencias falsas, y el anuncio de sanciones del Gobierno del 03-10-2026 tras
  el desglose regional. Si la entrega los va a usar, necesitan fuente propia.
- Para la pieza siguiente: al sacar las cláusulas que concluían, la cautela de
  que no todos los días de licencia se pagan del mismo modo quedó sin decirse
  en ninguna parte. El hecho que la sostiene sigue en la sección 1 (el
  funcionario público conserva su remuneración y el privado recibe subsidio),
  así que la entrega tiene con qué explicarla; el prompt del dossier no la pide
  y por eso va acá.
- Para la pieza siguiente: el dossier repite dentro de "Lo confirmado" dos
  ausencias que ya están en "Lo que NO se pudo averiguar" (la ficha pública de
  variables de VigIA, en la sección 5, y la constancia de ingreso al Fisco, en
  la sección 9). No lo prohíbe el prompt, pero la entrega debería tomarlas de
  la sección que les corresponde para no contarlas dos veces.
- Las dos rayas largas que encierran el monto de $1,9 millones brutos
  mensualizados en la sección 7, y la fecha en palabras de la línea 6 ("Corte
  de información: 5 de octubre de 2026"), contradicen las reglas duras 34 y 35,
  pero prompts/investigacion-clave.md no las pide: es el único prompt del flujo
  que no lleva la línea de control que sí trae prompts/clave-idea.md en su
  cierre ("Sin rayas largas; fechas DD-MM-AAAA en prosa"). Por eso van acá y no
  en las correcciones, igual que en la vuelta 1. Cerrar ese hueco en el prompt
  es tarea de la sesión de día, no de esta pieza.
- "aproximadamente $257 millones" en multas de VigIA y "cerca de $26.000
  millones" de la demanda civil chocan con "Nada de 'unos', 'cerca de' ni
  'varios' si el número existe", pero no se puede afirmar desde el repo que la
  cifra exacta exista y el validador no navega para averiguarlo: la pauta usa
  igual "unos $26.000 millones". Si el documento de SUSESO trae el monto al
  peso, la entrega debería usarlo.

Verificado y conforme:
- Corrección 1 de la vuelta 1, resuelta: el ítem del sondeo salió de "Lo que se
  dice pero no está confirmado" y entró a "Lo que NO se pudo averiguar" con qué
  se buscó (la fecha y las expresiones "sondeo", "encuesta", "percepción" y
  "facilidad para obtener licencias médicas") y por qué no aparece. Buscadas
  "sondeo", "encuesta" y "percepción" en el archivo completo: una sola
  coincidencia, esa línea. El punto que la pauta trae como "(se dice)" queda
  declarado como no confirmado, que es la salida que el prompt permite.
- Corrección 2 de la vuelta 1, resuelta: los siete pasajes que concluían ya no
  están, mirados uno por uno. Salieron la cláusula de la sección 1 sobre cómo
  se pagan los días, la de la sección 5 sobre lo que VigIA prueba, las tres de
  la sección 6 (los procesos abiertos, la equivalencia con fraude penal y la
  causal automática) y la de la sección 9 sobre el "cero recuperado"; el párrafo
  de la sección 8 que interpretaba la baja de 63% se eliminó completo. Los
  hechos que los sostenían siguen en su lugar: la remuneración del funcionario
  y el subsidio del privado (sección 1), que VigIA selecciona casos para
  revisión humana (sección 5), los plazos del sumario y la tramitación del
  boletín 17.914-13 al 05-10-2026 (sección 6), las 4.522 y 566 personas
  repetidas y los 21.098 sumarios en curso (sección 8 y "Cifras"), y que no
  consta ingreso al Fisco con recursos pendientes (sección 9).
- Corrección 3 de la vuelta 1, resuelta: el 5.088 ya no está (buscado en el
  archivo completo, cero coincidencias). La respuesta 6 entrega ahora las dos
  cifras como las da el Consolidado, 4.522 personas en dos de los tres años y
  566 en los tres, atribuidas a Contraloría, y las mismas cifras llevan su
  fecha, 02-10-2026, en la sección 8 y en "Cifras".
- La corrección no introdujo incumplimientos nuevos: las nueve secciones del
  formato de salida siguen en el orden que manda el prompt, la cronología sigue
  en orden y con enlace por hito, "Lo que NO se pudo averiguar" tiene ahora seis
  ítems y ninguno dice "nada", las siete preguntas de la sección 4 de la pauta
  siguen respondidas una por una, nada de la sección 6 de la pauta entró al
  dossier, y las cifras de los sumarios siguen cuadrando: 21.098 en curso más
  4.254 con resolución dan 25.352; 2.711 por cerrar más 1.543 cerrados dan
  4.254; y 577, 584, 262, 65 y 55 suman los 1.543 cerrados.
- Contrato de archivos: la pieza está en la ruta que nombra el estado,
  contenido/claves/flujo/licencia-medica-fiscalizacion-y-sumario/investigacion.md,
  y el commit que la trajo (c28b996) toca solo su propio archivo.
- Convergencia: esta es la vuelta 2 y acá vuelven solo los tres incumplimientos
  de la vuelta 1 que siguen sin resolver, sin un hallazgo nuevo sobre ninguna
  otra parte. Revisadas las 143 líneas del archivo.
- Por qué volvieron los tres: las correcciones 4, 5 y 6 se sumaron al veredicto
  de la vuelta 1 a las 02:29:37Z y la versión corregida de la pieza se
  commiteó a las 02:30:27Z, cincuenta segundos después, así que la pieza
  responde a las tres primeras y no alcanzó a ver estas. No es un hallazgo
  nuevo ni una vuelta perdida por desatención.
- Lo que NO se pudo comprobar de esta pieza, dicho en vez de darlo por bueno:
  el validador no navega, así que se verificó coherencia interna, cobertura de
  la pauta y calce de cada cita con lo que afirma; NO que las páginas existan
  ni que digan lo que se les atribuye.
