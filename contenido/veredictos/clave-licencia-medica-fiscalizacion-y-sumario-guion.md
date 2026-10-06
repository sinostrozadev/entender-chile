VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion
SLUG: licencia-medica-fiscalizacion-y-sumario
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-10-06T03:19:53Z

Correcciones:
1. Dónde: línea 10, "se informó que siete mil doscientos siete servidores
   públicos viajaron fuera de Chile" · Regla: "REGLA DE REDONDEO EN VOZ
   (Santiago, 04-09): las cifras grandes se narran REDONDEADAS, con 'más de',
   'casi', 'cerca de' o 'unos' ... Tope: TRES cifras significativas habladas
   por número (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no).
   La cifra exacta va en la marca [DATO], que es para pantalla." 7.207 son
   cuatro cifras significativas habladas y van sin aproximador; no cae en
   ninguna excepción de la regla (no es porcentaje con un decimal, año, fecha,
   hora, número de ley ni resultado de votación) · Debe quedar: "más de siete
   mil doscientos servidores públicos" (7.207 es mayor que 7.200, y "siete mil
   doscientos" son tres cifras significativas). La cifra exacta ya está en la
   marca de la línea 9, "servidores 2025: 7207", que es la que va a pantalla,
   así que no se pierde nada. El guion del informe del 03-10-2026 narra esta
   misma cifra así, y su veredicto lo dejó verificado
   (contenido/veredictos/2026-10-05-guion_informe.md, líneas 29 a 33).
2. Dónde: línea 80, "mil quinientos cuarenta y tres estaban cerrados con
   resolución ejecutoriada" · Regla: la misma REGLA DE REDONDEO EN VOZ, "Tope:
   TRES cifras significativas habladas por número" · Debe quedar: "más de mil
   quinientos estaban cerrados con resolución ejecutoriada" (1.543 es mayor que
   1.500, y "mil quinientos" son dos cifras significativas, bajo el tope). La
   cifra exacta queda en la marca de la línea 79, "cerrados: 1543". Verificado
   que las otras cifras habladas del guion sí cumplen el tope: "más de cuatro
   mil quinientas" (4.522), "quinientas sesenta y seis" (566), "doscientas once
   de cuatrocientas dieciséis" (211 y 416), "más de veinticinco mil" (25.078 y
   25.352), "más de veintiún mil" (21.098), "más de treinta y un mil quinientos
   millones" (31.571.798.643) y "cerca de veintiséis mil millones".
3. Dónde: línea 89, "[DATO comparacion | Fiscalía y La Tercera, 31-08-2026]" ·
   Regla: "Fuente: una sola, la principal, con fecha. No se narra. Es la fuente
   PRIMARIA del dato tal como aparece en la entrega". La marca trae dos fuentes
   en vez de una, y además "Fiscalía" no tiene línea en el bloque "Fuentes:"
   del guion (verificado: las líneas 112 a 137 no la traen), lo que choca con
   la REGLA DE CRÉDITO TOTAL · Debe quedar: una sola fuente en la marca, la que
   la entrega da para la sentencia y el perjuicio en su línea 84, "(Emol y La
   Tercera, 31-08-2026)": "[DATO comparacion | Emol, 31-08-2026]". Emol ya
   tiene su línea en "Fuentes:" (línea 136) y La Tercera también (línea 137),
   así que con ese cambio ninguna fuente de la marca queda sin crédito.
4. Dónde: bloque "Fuentes:" del guion, líneas 112 a 137 · Regla: "Al final:
   'Fuentes:' con una línea por cada fuente de las marcas [DATO] y [CITA] Y por
   cada fuente de la entrega cuyo contenido narraste, tal como aparecen en la
   entrega. Una fuente cuyo contenido se narró no puede quedar sin crédito" ·
   Debe quedar: agregar la línea que falta, tal como la entrega la trae en su
   línea 142, "- SUSESO, Circular 3906:
   https://www.suseso.gob.cl/612/w3-article-785452.html". Es la única fuente de
   la entrega que el guion no acredita (comparadas las dos listas completas: 26
   líneas en el guion contra 27 en la entrega, y la diferencia es esa) y su
   contenido sí se narra: la entrega sostiene con ella, en su línea 18, que "Un
   funcionario público sujeto a estatuto conserva su remuneración, mientras la
   entidad pagadora reembolsa al empleador público cuando corresponde", que el
   guion narra en su línea 49, "En el sector público, el funcionario sujeto a
   estatuto conserva su remuneración, y la entidad pagadora reembolsa al
   empleador público cuando corresponde".

Observaciones:
- Para la pieza siguiente: nada queda pendiente de esta cadena, porque el guion
  es la última pieza del flujo de esta Clave. Lo que sí conviene arrastrar al
  próximo tema: el sondeo del 01-10-2026 quedó declarado no ubicado desde la
  investigación y el guion lo trató bien (línea 33: lo nombra y dice que no se
  usa como prueba ni como cifra), así que el camino para una entrada de prensa
  sin documento ya está probado.
- La marca de la línea 79 usa el tipo "tabla", que el prompt define para
  "posiciones u ordenamientos", y lo que lleva es un desglose de tres conteos
  (25.352 totales, 21.098 en curso, 1.543 cerrados). No es corrección porque el
  tipo existe y scripts/validar-tarjetas.js lo acepta sin aviso, pero "barras"
  describe mejor tres magnitudes comparables y evita que la tarjeta se dibuje
  como un ranking que no es.
- El bloque "Qué está en juego" (líneas 92 a 97) no dice ninguna fecha en voz,
  y el punto 6 de la estructura pide "QUÉ ESTÁ EN JUEGO AHORA, con fecha dicha
  en voz". No va en correcciones porque nada de lo que ese bloque narra es
  coyuntural (es la lectura conceptual del control, con su [HECHO] y su
  [INTERPRETACIÓN]) y la lectura fechada de la semana sí ocurre, en los dos
  bloques anteriores: línea 80, "fechado el cinco de febrero de dos mil
  veintiséis", y línea 90, "al cinco de octubre de dos mil veintiséis". El
  control interno 2 del prompt, "Todo lo coyuntural queda fechado también en la
  versión hablada", se cumple. Aun así, una fecha en ese bloque lo ancla mejor.
- Verificado lo que no es hallazgo, para que no vuelva a aparecer: la fecha del
  séptimo balance de Dipres, "fechado el cinco de febrero de dos mil
  veintiséis" (línea 80), no está en la entrega pero tampoco es un dato
  inventado: la pidió el veredicto de la entrega en su observación para la
  pieza siguiente, y está en el informe del 03-10-2026, línea 101, "el séptimo
  balance ... del 05-02-2026, con datos al 31-12-2025".
- Las dos comprobaciones contra la pauta quedaron hechas pregunta por pregunta,
  con la pauta abierta. Sección 4: la 1 se responde en el bloque "Qué es una
  licencia" (líneas 36 a 42); la 2 en "Quién paga" (líneas 45 a 49), con el
  origen de los fondos incluido; la 3 en "Qué permite el reposo" (líneas 52 a
  58), con la casa, el país y la excepción acreditada; la 4 entre "Qué es una
  licencia" (línea 42, COMPIN o Isapre y la Superintendencia) y "De dónde
  viene" (línea 24, las facultades de la Ley 21.746); la 5 en "Qué
  consecuencias puede haber" (líneas 68 a 74), con el Estado y la empresa
  privada por separado; la 6 en "Por qué el caso sigue abierto" (líneas 77 a
  82); y la 7 en "Condena no es recuperación" (líneas 85 a 90), dicha como lo
  que no se pudo acreditar y por qué. Sección 6: no entró nada. No hay nombres
  ni penas del megafraude (línea 87 narra solo lo que probó), no se especula
  con VigIA (línea 102 cierra con "sin anticipar si la herramienta funcionará o
  fallará"), no se da por recuperado el dinero (línea 90), no se trata al
  enfermo como sospechoso (líneas 58 y 97) y las dos noticias de inteligencia
  artificial del 28-09-2026 y del 30-09-2026 no aparecen.
- Lo demás del prompt quedó verificado y cumple: título de 64 caracteres,
  atemporal y en pregunta; descripción de dos frases sin lista de fuentes;
  "Carátula sugerida: ¿Quién decide tu reposo?", cuatro palabras y sin el
  término que el video explica; los 14 bloques con su [TESIS] y la línea en
  blanco obligatoria después de cada una; tres [ESQUEMA], dentro del rango de
  uno a tres, los tres de tres elementos y ninguno con más de cuatro palabras
  por elemento; una [HECHO] y una [INTERPRETACIÓN], las dos en el mismo bloque
  y sin pasar el máximo por bloque; las dos marcas [DATO] bien puestas
  inmediatamente antes del párrafo que las narra; 1.402 palabras narradas al
  modo en que las cuenta scripts/validar-tarjetas.js (10,4 minutos a 135
  palabras por minuto, dentro de los 10 a 11 que pide la sección 8 de la
  pauta); ninguna raya larga ni raya media; ningún conector de ensayo de los
  prohibidos; ninguna fórmula de clickbait; sin paréntesis ni URLs en el texto
  narrado; y el cierre termina con el tagline exacto. El archivo de imágenes
  que el prompt pide desde el 06-10-2026 también está completo
  (contenido/guiones/claves/2026-10-07-licencia-medica-fiscalizacion-y-sumario-imagenes.md):
  tres prompts de carátula con el gancho de la línea "Carátula sugerida:" y 14
  prompts de sección, numerados y en el mismo orden que los 14 bloques.
