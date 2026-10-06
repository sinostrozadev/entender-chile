VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: investigacion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/investigacion-clave.md
VALIDADO: 2026-10-06T02:26:34Z

Correcciones:
1. Dónde: en "Lo que se dice pero no está confirmado", el ítem "Que la
   percepción de que es “fácil” conseguir licencias demuestra una tasa real de
   fraude. Un sondeo mide opiniones; sin ficha técnica y contraste con datos
   administrativos no prueba prevalencia." · Regla: prompts/investigacion-clave.md,
   "Cada afirmación con su fuente: medio o institución + fecha + enlace. Sin
   fuente no se escribe", y el encargo de la pauta sobre lo marcado "(se dice)",
   "para intentar confirmarlo o dejarlo declarado como no confirmado" · Debe
   quedar: ese ítem con la fuente del sondeo (medio o institución, fecha
   01-10-2026 y enlace), que es el único lugar del dossier donde el sondeo
   aparece y hoy llega sin ninguna; si el sondeo no se pudo ubicar, el ítem baja
   a "Lo que NO se pudo averiguar" diciendo qué se buscó y por qué no aparece.
   Buscadas en el archivo completo las palabras "sondeo", "encuesta",
   "percepción" y "01-10": una sola coincidencia, esta línea.

2. Dónde: siete pasajes de "Lo confirmado" que concluyen en vez de citar:
   (1) sección 1, "Por eso no es correcto decir que todos los días de licencia
   se pagan del mismo modo."; (2) sección 5, "por eso no corresponde afirmar que
   VigIA prueba fraude o que toma decisiones autónomas"; (3) sección 6, "lo que
   ayuda a explicar por qué muchos procesos siguen abiertos"; (4) sección 6,
   "pero no es correcto equiparar cualquier salida durante una licencia con
   fraude penal"; (5) sección 6, "señal de que no existía una causal automática y
   específica ya vigente"; (6) sección 8, "La baja de 63% no cierra el tema
   porque persiste un núcleo reincidente, hay miles de sumarios sin término y las
   autoridades recién están incorporando nuevos cruces y priorización de casos.
   Son tres problemas diferentes: frecuencia de viajes, tiempo de resolución
   disciplinaria y capacidad de detectar emisiones sin fundamento."; (7) sección
   9, "por lo que “cero recuperado” describe ausencia de cobro acreditado al
   corte, no que la condena carezca de efecto" · Regla:
   prompts/investigacion-clave.md, "Sin opinión, sin adjetivos de color, sin
   conclusiones. Eso viene después", y prompts/validador.md, punto 2, que en
   validar_investigacion marca como incumplimiento "una opinión o una conclusión,
   que en el dossier no van" · Debe quedar: en "Lo confirmado", de cada uno de
   esos siete pasajes solo lo que la fuente citada afirma, sin la cláusula que
   interpreta. Los hechos que los sostienen ya están en el mismo párrafo y se
   quedan: que el funcionario público conserva su remuneración y el privado
   recibe subsidio (sección 1); que VigIA selecciona casos para revisión humana
   (sección 5); los plazos del sumario y su prórroga, y que el proyecto del
   boletín 17.914-13 seguía en tramitación al 05-10-2026 (sección 6); las 4.522 y
   566 personas repetidas, los 21.098 sumarios en curso y la incorporación de
   VigIA (sección 8); que no consta ingreso efectivo al Fisco y que había
   recursos pendientes (sección 9). Las cuatro cautelas que valga conservar
   (1, 2, 4 y 7) van en "Lo que se dice pero no está confirmado", donde tres de
   ellas ya figuran con su fuente, y no se repiten en "Lo confirmado".

3. Dónde: en "Las preguntas de la pauta", la respuesta 6, "Porque 5.088 personas
   aparecen en dos o tres años" · Regla: prompts/validador.md, punto 2, que en
   validar_investigacion marca como incumplimiento "una cifra sin unidad, sin
   fecha o sin origen", y prompts/investigacion-clave.md, "Cifras exactas, con su
   unidad, su fecha y de dónde salen" · Debe quedar: las dos cifras como las
   entrega el CIC N°26, "4.522 personas en dos de los tres años y 566 en los
   tres (Contraloría, CIC N°26, 02-10-2026)", o el total escrito como la suma de
   esas dos con esa misma atribución. Buscado "5.088" en el dossier, en la pauta
   y en contenido/casos: aparece solo en esa línea, y las tres fuentes que la
   acompañan (CIC por Cooperativa, Dipres y SUSESO) no traen ese número.

4. Dónde: "[CIC N°26, 02-10-2026](https://linktr.ee/contraloriacl)" y las otras
   cinco menciones del mismo enlace, entre ellas la cifra que abre la Clave,
   los 7.207 funcionarios · Regla: prompts/investigacion-clave.md, "Cada
   afirmación con su fuente: medio o institución + fecha + enlace", y la propia
   pieza declara en "Lo que NO se pudo averiguar" que no pudo descargar el PDF
   del Consolidado · Debe quedar: el dato acreditado con la publicación de
   prensa que lo cubrió, nombrada como tal, o con la URL directa del documento
   de Contraloría si se consigue. Un linktr.ee es un agregador de enlaces: no
   acredita nada, su contenido cambia sin aviso y presentarlo como "enlace
   institucional" le da al dato una firmeza que no tiene.

5. Dónde: en "Las preguntas de la pauta", la respuesta 7, "¿Por qué no se
   recuperó dinero pese a las condenas?", acreditada con "[BioBioChile,
   03-09-2026](...corte-suprema-acoge-amparo-y-revoca-prision-preventiva...)" ·
   Regla: prompts/investigacion-clave.md, la fuente citada tiene que sostener
   lo que se afirma · Debe quedar: la afirmación de que condenar y cobrar son
   etapas distintas, con una fuente que trate de la ejecución del fallo o del
   cobro; o sin enlace y declarado que no se encontró fuente. La nota citada
   trata de una prisión preventiva revocada, que es otro asunto.

6. Dónde: la Circular 3890, citada en la cronología como
   "suseso.gob.cl/612/w3-article-767521.html" y en las otras cuatro menciones,
   incluida la lista de Fuentes, como
   "suseso.gob.cl/622/w3-propertyvalue-774967.html" · Regla: una fuente, una
   dirección; el lector que sigue la cronología tiene que llegar al mismo
   documento que el que sigue las Fuentes · Debe quedar: las cinco menciones
   apuntando al mismo documento, o dicho cuál es la circular y cuál el
   compendio, si de verdad son dos.

Observaciones:
- Para la pieza siguiente: la pauta pide en su sección 7 el Consolidado N°26 "el
  documento y no la nota de prensa", y el dossier declara en "Lo que NO se pudo
  averiguar" que no logró descargar el PDF íntegro desde el buscador público de
  Contraloría. Eso no es incumplimiento, porque dice qué se buscó y por qué no
  aparece, y es material del video: la entrega puede usar las cifras, pero no el
  desglose por servicio ni las notas metodológicas literales, que siguen sin
  verificar. El enlace que hoy sostiene el CIC N°26 en tres pasajes es
  linktr.ee, un agregador, no el documento.
- Para la pieza siguiente: dos datos de la sección 3 de la pauta no están en el
  dossier, y ninguno venía marcado "(por verificar)", así que no son hallazgo:
  la red de 16 sociedades de fachada que entre 2020 y 2022 emitió más de 60.000
  licencias falsas, y el anuncio de sanciones del Gobierno del 03-10-2026 tras
  el desglose regional. Si la entrega los va a usar, necesitan fuente propia.
- Para la pieza siguiente: el dossier repite dentro de "Lo confirmado" dos
  ausencias que ya están en "Lo que NO se pudo averiguar" (la ficha pública de
  variables de VigIA, en la sección 5, y la constancia de ingreso al Fisco, en
  la sección 9). No lo prohíbe el prompt, pero la entrega debería tomarlas de
  la sección que les corresponde para no contarlas dos veces.
- Las dos rayas largas que encierran el monto de $1,9 millones brutos
  mensualizados en la sección 7, y la fecha en palabras de la línea 6 ("Corte
  de información: 5 de octubre de 2026"), contradicen las reglas duras 34 y 35, pero prompts/investigacion-clave.md no
  las pide: es el único prompt del flujo que no lleva la línea de control que sí
  trae prompts/clave-idea.md en su cierre ("Sin rayas largas; fechas DD-MM-AAAA
  en prosa"). Por eso van acá y no en las correcciones. Cerrar ese hueco en el
  prompt es tarea de la sesión de día, no de esta pieza.
- "aproximadamente $257 millones" en multas de VigIA y "cerca de $26.000
  millones" de la demanda civil chocan con "Nada de 'unos', 'cerca de' ni
  'varios' si el número existe", pero no se puede afirmar desde el repo que la
  cifra exacta exista y el validador no navega para averiguarlo: la pauta usa
  igual "unos $26.000 millones". Si el documento de SUSESO trae el monto al
  peso, la entrega debería usarlo.

Verificado y conforme:
- Las nueve secciones del formato de salida están y en el orden que manda el
  prompt: título, SLUG, PAUTA, "Lo confirmado" (por sub-tema, nueve), "Lo que se
  dice pero no está confirmado", "Cronología", "Cifras", "Lo que NO se pudo
  averiguar", "Las preguntas de la pauta" y "Fuentes", con 17 fuentes
  enumeradas y con enlace.
- Los ocho encargos de la sección 7 de la pauta llegaron: la Ley 21.746 con qué
  agregó y qué existía antes bajo DS 3, Ley 20.585 y Ley 16.395 (sección 4); el
  DS 3 y las salidas justificadas del artículo 55 (sección 3); el Estatuto
  Administrativo con medidas y plazos, y el Código del Trabajo por el artículo
  160 N°7 (sección 6); el CIC N°26 con desglose y qué cuenta como salida del
  país (sección 8, con la limitación declarada); VigIA con qué hace, con qué
  datos y en qué etapa entra (sección 5); los $36.876 millones como estimación
  de Dipres y no gasto acreditado (sección 7); el término de los sumarios, con
  los 1.543 cerrados desglosados (sección 7); y quién paga el subsidio por
  régimen y desde qué día (sección 2).
- Las siete preguntas de la sección 4 de la pauta tienen material y ninguna
  queda en silencio: la sección final las recorre una por una, numeradas igual
  que en la pauta.
- Los tres puntos "(por verificar)" de las secciones 2 y 3 de la pauta están
  respondidos: qué agregó la Ley 21.746 y qué podían hacer antes SUSESO y COMPIN,
  qué hace VigIA, y en qué terminaron los sumarios.
- Nada de la sección 6 de la pauta aparece en el dossier: no hay nombres ni
  penas del megafraude (la sección 9 entra solo por lo que probó), no se
  especula sobre si VigIA servirá, no se da el dinero por recuperado, no se
  trata al trabajador enfermo como sospechoso, y las dos noticias de
  inteligencia artificial del 28-09-2026 y del 30-09-2026 no están.
- Las cifras cuadran: 21.098 en curso más 4.254 con resolución suman los 25.352
  sumarios; 2.711 por cerrar más 1.543 cerrados dan esos 4.254; y 577
  absoluciones, 584 censuras, 262 destituciones, 65 suspensiones y 55 multas
  suman los 1.543 cerrados.
- La cronología existe, va en orden (1984, 2012, 20-05-2025, 24-05-2025,
  25-06-2025, 05-11-2025, 23-06-2026, 31-08-2026, 21-08-2026 por sub-tema,
  29-09-2026, 02-10-2026 y el corte del 05-10-2026) y cada hito lleva enlace.
- La sección de lo que no se pudo averiguar trae cinco ítems y ninguno dice
  "nada": cada uno nombra qué se buscó y por qué no aparece.
- Contrato de archivos: la pieza está en la ruta que nombra el estado,
  contenido/claves/flujo/licencia-medica-fiscalizacion-y-sumario/investigacion.md,
  y el commit que la trajo toca solo su propio archivo.
- Convergencia: esta es la vuelta 1 y acá quedan TODOS los incumplimientos que
  encontré, revisadas las 145 líneas del archivo. En las vueltas siguientes solo
  pueden volver estos tres y lo que la corrección introduzca.

- Estas correcciones 4, 5 y 6 las agregó la sesión de día después de que la
  rutina escribiera el veredicto, y no se pisan con las tres primeras: son seis
  hallazgos distintos sobre la misma pieza. Se suman acá en vez de abrir una
  vuelta aparte para que GPT las arregle todas de una.
- Lo que NO se pudo comprobar de esta pieza, dicho en vez de darlo por bueno:
  ninguno de sus 17 enlaces abre desde el contenedor de la sesión de día,
  porque la red de salida bloquea bcn.cl, suseso.gob.cl, dipres.gob.cl y
  linktr.ee. Se validó coherencia interna, cobertura de la pauta y calce de
  cada cita con lo que afirma; NO que las páginas existan ni que digan lo que
  se les atribuye.
