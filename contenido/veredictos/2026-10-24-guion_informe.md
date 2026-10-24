VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-24T06:11:28Z

Correcciones:
1. Dónde: el encabezado quedó partido en dos líneas, la etiqueta sola y el
   contenido en la línea siguiente ("Título sugerido:" línea 1 y el título en
   la línea 2; "Carátula sugerida:" línea 7 y el gancho en la 8; "Carátula 2:"
   línea 10 y su gancho en la 11; "Carátula 3:" línea 13 y su gancho en la 14;
   "Clima de carátula:" línea 16 y la palabra en la 17) ·
   Regla: prompts/contrato-archivos.md, "FORMATO OBLIGATORIO de los dos
   guiones (el parser depende de esto): Título sugerido: ... Descripción
   sugerida: ...", y prompts/guion-informe.md, "Primera línea: 'Título
   sugerido:' seguida de un título de una sola idea" y "Tercera, cuarta y
   quinta líneas: TRES CARÁTULAS para la noticia de portada, con este formato
   exacto: Carátula sugerida: ¿Y Estación Central? / Tren Melipilla, a medias" ·
   Debe quedar: etiqueta y contenido en la MISMA línea, una línea por campo,
   como en el guion del 23-10-2026. Comprobado en esta corrida con el parser
   del repo (scripts/parse.js) sobre el archivo tal como está: devuelve
   titulo "", caratulas [] y clima null, es decir el video se publicaría sin
   título y sin gancho de carátula; el mismo parser sobre el guion del
   23-10-2026 devuelve el título y las tres carátulas completas.
2. Dónde: líneas 22, 30 y 52, "[FUENTE 24 Horas; Emol; EL PAÍS, 22 y
   23-10-2026]" (tres fuentes, ocho palabras), "[FUENTE Ministerio de
   Justicia; CIPER; EL PAÍS; La Tercera, 23-10-2026]" (cuatro fuentes, nueve
   palabras) y "[FUENTE Senapred; La Tercera; Canal 9; SoyChile.cl, 22 y
   23-10-2026]" (cuatro fuentes, nueve palabras) ·
   Regla: "la fuente principal del bloque (una, o dos separadas por punto y
   coma), tomada del informe, en el mismo formato legible de las marcas [DATO]
   (institución o medio + fecha, máximo seis palabras)" ·
   Debe quedar: en cada uno de esos tres bloques, una o dos fuentes como
   máximo y seis palabras contando la fecha, igual que la línea 42
   ("[FUENTE Banco Central de Chile; BioBioChile, 23-10-2026]"), que sí
   cumple. Las demás fuentes del bloque siguen acreditadas en "Fuentes:".
3. Dónde: las tres carátulas, "¿Qué pasa con / 56 rebajas de condena",
   "Frenan nuevas rebajas / 56 ya concedidas" y "56 rebajas firmadas / ¿Se
   pueden anular?": ninguna dice a quién se concedieron las rebajas ·
   Regla: "EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026, Santiago) ... si el
   hecho depende de un delito o de un grupo, ese dato va en el gancho o en el
   título, no solo en el cuerpo" y "PRUEBA DEL GANCHO: si un desconocido
   necesita preguntarte '¿qué?' o '¿de quién?', no es gancho" ·
   Debe quedar: en cada carátula, una de las dos líneas trae a quién, con las
   palabras del informe ("agresores sexuales de menores", informe líneas 11 y
   15), respetando el tope de cuatro palabras por línea y los tres enfoques
   (pregunta, contradicción, cifra o segundo giro). Verificado contra el tope:
   "¿Quiénes recibieron las rebajas? / Agresores sexuales de menores" son
   cuatro y cuatro palabras.
4. Dónde: línea 23, "[DATO comparacion | EL PAÍS, 23-10-2026] rebajas por
   abuso sexual de menores: 27 decretos ; rebajas por violación de menores:
   29 decretos", mientras el párrafo que acompaña (línea 24) se sostiene en
   "cincuenta y seis beneficios ya fueron concedidos" ·
   Regla: "CRITERIO DE LA CIFRA (obligatorio) ... Cada párrafo narrado que se
   sostiene en una cifra así lleva su [DATO] con ESA cifra (una, la
   principal); las de acompañamiento quedan solo en el texto", y control
   interno 7 ·
   Debe quedar: la única marca de "La noticia del día" muestra el 56 que dice
   la voz, con su etiqueta de contexto de 3 a 8 palabras y su unidad pegada,
   por ejemplo "[DATO cifra | EL PAÍS, 23-10-2026] rebajas ya concedidas a
   agresores sexuales de menores: 56 decretos" (etiqueta de ocho palabras,
   verificada). El desglose de 27 y 29 decretos queda en la narración del
   bloque, no en la tarjeta de apertura.
5. Dónde: bloque "## Dólar y swap con China [economia]", líneas 47 y 49:
   narra cuatro cifras, "novecientos ochenta y seis pesos con cincuenta y
   ocho centavos", "cien dólares", "noventa y ocho mil seiscientos cincuenta y
   ocho pesos" y "unos siete mil quinientos millones de dólares" ·
   Regla: "Cifras: narra las que sostienen la idea de cada noticia, máximo
   tres cifras habladas por bloque. Las demás pueden ir en una marca [DATO]
   para que aparezcan en pantalla" ·
   Debe quedar: tres cifras habladas como máximo en ese bloque. Sale de la voz
   el valor exacto del dólar, que ya está en la tarjeta de la línea 45 y en la
   [TESIS] como "cerca de mil pesos", y se conservan el ejemplo a escala
   humana (cien dólares y su equivalente en pesos) y el monto del swap. El
   plazo del acuerdo ("cinco años") y las fechas no se cuentan como cifras
   habladas.
6. Dónde: línea 47, "equivalía a noventa y ocho mil seiscientos cincuenta y
   ocho pesos" ·
   Regla: "REGLA DE REDONDEO EN VOZ (Santiago, 04-09): las cifras grandes se
   narran REDONDEADAS, con 'más de', 'casi', 'cerca de' o 'unos' ... Tope:
   TRES cifras significativas habladas por número ... La cifra exacta va en la
   marca [DATO], que es para pantalla" (hallazgo también de
   scripts/validar-tarjetas.js, línea 47) ·
   Debe quedar: el equivalente en pesos redondeado a tres cifras
   significativas, por ejemplo "cerca de noventa y ocho mil seiscientos
   pesos". El informe trae el exacto ($98.658, informe línea 63) si se quiere
   dejar en una marca.
7. Dónde: línea 62, el cierre dice "El informe completo de hoy reúne además la
   investigación por el Fondo E, las expulsiones y el resto de la jornada" y
   en ninguna parte dice dónde está ·
   Regla: control interno 15, "El cierre dice que el informe completo está en
   el enlace de la descripción", y estructura 8, "una frase que diga que el
   informe completo, con todas las noticias del día, está en el enlace de la
   descripción (con tus palabras y con variaciones entre días; sin nombrar un
   dominio ni deletrear una dirección)" ·
   Debe quedar: una frase del cierre dice que el informe completo, con todas
   las noticias del día, está en el enlace de la descripción.
8. Dónde: el cierre (línea 62) pasa directo del informe completo a la frase de
   vestimenta: no hay frase de síntesis de las tres noticias narradas ·
   Regla: estructura 8, "CIERRE: corto, 40 a 60 palabras. Una frase de
   síntesis que conecte las tres noticias por hechos concretos, sin decirle a
   la audiencia qué debe pensar" ·
   Debe quedar: una frase, y solo una, que conecte por hechos concretos las
   rebajas de condena, el dólar con el swap y los daños del sistema frontal,
   sin abstracciones. El cierre completo sigue entre 40 y 60 palabras: hoy
   tiene 51, así que la mención del Fondo E y las expulsiones tiene que
   comprimirse o salir para que quepan la síntesis y la frase del enlace.
9. Dónde: línea 59, el bloque "## Daños por el sistema frontal [emergencia]"
   termina con "La prioridad sigue siendo proteger a las personas y evaluar
   daños con un mismo corte horario" ·
   Regla: "Ningún bloque termina con una síntesis abstracta ... Cada bloque
   termina con un hecho, una consecuencia concreta para alguien, o una
   pregunta que el bloque siguiente responde", y "NO agregues noticias,
   datos, opiniones ni predicciones" (el informe no dice en ninguna parte cuál
   es la prioridad) ·
   Debe quedar: el bloque cierra con un hecho del informe. Basta con eliminar
   esa frase: la anterior, la advertencia por ráfagas en Coquimbo, ya es un
   hecho concreto.

Observaciones:
- Para la pieza siguiente: el informe trae dos datos que el guion dejó fuera y
  que entran sin romper el tope de cifras habladas. El dólar "cerró la semana
  en su mayor nivel desde abril de 2025" (informe línea 57), que es justo lo
  que justifica la línea opcional " | ref:" de la marca cifra, la única que
  distingue un dato que rompe una marca de uno rutinario. Y en la cordillera
  de Coquimbo se advirtieron ráfagas de hasta 90 kilómetros por hora (informe
  línea 117), que es la cifra que le falta a la advertencia del bloque del
  sistema frontal.
- El título dice "agresores de menores"; el informe y su noticia de portada
  dicen "agresores sexuales de menores" (informe líneas 11 y 15). Recuperar
  "sexuales" deja el título con el mismo sentido que la entrada y pone el
  delito donde pide la regla del gancho del 23-10-2026.
- El cierre lee la etiqueta del informe tal cual, "Para salir hoy: Viste por
  capas en Santiago". La regla pide integrarla "de forma natural": en las
  ediciones del 21 y del 23-10-2026 la frase de vestimenta iba sin la
  etiqueta ("En Santiago, lleva paraguas o chaqueta impermeable").
- Línea 57, "cifras parciales difundidas antes": el informe fecha esas cifras
  parciales de 300 y 735 viviendas el 22-10-2026 (informe línea 113). Con la
  fecha se evita una referencia relativa en un dato que el informe sí fecha.
- Línea 59, "Equipos del Serviu": la sigla no se explica en voz y un oyente
  general puede no saber qué es. El prompt pide explicar las siglas la primera
  vez cuando puedan no conocerse.
- Lo que NO es incumplimiento, para que no se toque: que Brasil, una noticia
  [A] del informe, no suene en el video está bien (el formato corto narra la
  portada y las dos [A] siguientes en el orden del informe, y Brasil es la
  cuarta); el largo narrado está en rango (512 palabras, de 420 a 600); y la
  selección, las tres categorías entre corchetes, la línea en blanco después
  de cada [TESIS] y la lista de fuentes sin rutas internas del sistema están
  correctas.
