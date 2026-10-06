VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-06T03:25:59Z

Observaciones:
- Para la pieza siguiente: el guion es la última pieza del flujo de esta Clave,
  así que no queda nada pendiente en esta cadena. Lo que conviene arrastrar al
  próximo tema: el camino para una entrada de prensa sin documento quedó
  probado (el sondeo del 01-10-2026 se nombra y se dice que no se usa como
  prueba ni como cifra, línea 33), y la regla de redondeo en voz costó las dos
  únicas correcciones de forma de este guion, así que vale revisarla antes de
  entregar, no después.
- Las cuatro correcciones de la vuelta 1 quedaron resueltas tal como las pedía
  el veredicto, y el diff entre las dos versiones toca solo esas cuatro líneas
  (verificado con git diff d46b89a 219d87e): línea 10, "más de siete mil
  doscientos servidores públicos" (7.207 es mayor que 7.200, tres cifras
  significativas habladas); línea 80, "más de mil quinientos estaban cerrados
  con resolución ejecutoriada" (1.543 es mayor que 1.500); línea 89, "[DATO
  comparacion | Emol, 31-08-2026]", una sola fuente y la que la entrega da en
  su línea 84; y la línea 117 del bloque "Fuentes:", "SUSESO, Circular 3906:
  https://www.suseso.gob.cl/612/w3-article-785452.html", copiada igual a la
  línea 142 de la entrega. Ninguna de las cuatro introdujo un incumplimiento
  nuevo.
- El crédito de fuentes quedó completo: 27 líneas en el guion contra 27 en la
  entrega, comparadas una por una. La única diferencia que queda es de
  mayúscula, "SUSESO, subsidio de origen laboral" en el guion (línea 123)
  contra "SUSESO, Subsidio de origen laboral" en la entrega (línea 131). No es
  corrección: la fuente está acreditada y el enlace es el mismo.
- Las palabras narradas se pueden contar de dos maneras y conviene saberlo
  antes de medir la duración. scripts/validar-tarjetas.js descarta toda línea
  que empiece con corchete y da 1.402 (10,4 minutos a 135 palabras por minuto,
  dentro de los 10 a 11 que pide la sección 8 de la pauta). El prompt dice que
  no cuentan las MARCAS, no el texto que las sigue, y que la tesis "sí se
  narra": contando el texto de las 14 líneas [TESIS] y de las dos marcas
  [HECHO] e [INTERPRETACIÓN] son 1.643 palabras (12,2 minutos). Las dos
  cuentas caben en el rango del control interno 3 del prompt, 1.050 a 1.650,
  así que no hay hallazgo, pero la segunda queda a siete palabras del techo y
  pasa los 11 minutos de la pauta. Para el próximo guion de Clave, apuntar más
  cerca de 1.500 deja margen con las dos reglas a la vez.
- La marca de la línea 79 sigue usando el tipo "tabla", que el prompt define
  para "posiciones u ordenamientos", y lo que lleva es un desglose de tres
  conteos (25.352 totales, 21.098 en curso, 1.543 cerrados). No es corrección
  porque el tipo existe y scripts/validar-tarjetas.js lo acepta sin aviso, pero
  "barras" describe mejor tres magnitudes comparables.
- El bloque "Qué está en juego" (líneas 92 a 97) sigue sin decir una fecha en
  voz. No va en correcciones por lo mismo que en la vuelta 1: nada de lo que
  ese bloque narra es coyuntural, y la lectura fechada de la semana ocurre en
  los dos bloques anteriores (línea 80, "fechado el cinco de febrero de dos mil
  veintiséis", y línea 90, "al cinco de octubre de dos mil veintiséis").
- Las dos comprobaciones contra la pauta se repitieron pregunta por pregunta,
  con la pauta abierta. Sección 4: la 1 en "Qué es una licencia" (líneas 36 a
  42); la 2 en "Quién paga" (líneas 45 a 49), con el origen de los fondos; la 3
  en "Qué permite el reposo" (líneas 52 a 58), con la casa, el país y la
  excepción acreditada; la 4 entre la línea 42 (COMPIN o Isapre y la
  Superintendencia) y la línea 24 (las facultades de la Ley 21.746); la 5 en
  "Qué consecuencias puede haber" (líneas 68 a 74), con el Estado y la empresa
  privada por separado; la 6 en "Por qué el caso sigue abierto" (líneas 77 a
  82); la 7 en "Condena no es recuperación" (líneas 85 a 90), dicha como lo que
  no se pudo acreditar y por qué. Sección 6: no entró nada. Sin nombres ni
  penas del megafraude (línea 87 narra solo lo que probó), sin especular con
  VigIA (línea 102, "sin anticipar si la herramienta funcionará o fallará"),
  sin dar por recuperado el dinero (línea 90), sin tratar al enfermo como
  sospechoso (líneas 58 y 97), y las dos noticias de inteligencia artificial
  del 28-09-2026 y del 30-09-2026 no aparecen (búsqueda explícita en el
  archivo, sin resultados).
- Lo demás del prompt quedó verificado de nuevo sobre esta versión: título de
  65 caracteres, atemporal y en pregunta; descripción de dos frases sin lista
  de fuentes; "Carátula sugerida: ¿Quién decide tu reposo?", cuatro palabras y
  sin el término que el video explica; 14 bloques, cada uno con su [TESIS] y
  con la línea en blanco obligatoria después (comprobado línea por línea); tres
  [ESQUEMA], dentro del rango de uno a tres, los tres de tres elementos y
  ninguno con más de cuatro palabras por elemento; una [HECHO] y una
  [INTERPRETACIÓN], las dos en el mismo bloque; las tres marcas [DATO]
  inmediatamente antes del párrafo que las narra y con valores en numerales;
  ninguna raya larga ni raya media; ningún conector de ensayo de los
  prohibidos; ninguna fórmula de clickbait; sin paréntesis ni URLs en el texto
  narrado; el cierre termina con el tagline exacto; y
  scripts/validar-tarjetas.js corre sin un solo aviso ("variedad OK: ninguna
  cuota rota, ninguna marca malformada"). El archivo de imágenes que el prompt
  pide desde el 06-10-2026 sigue completo
  (contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario-imagenes.md):
  tres prompts de carátula y 14 prompts de sección, numerados y en el mismo
  orden que los 14 bloques del guion.
