VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-23T05:44:30Z

Correcciones:
1. Dónde: línea 16, "## Rabat y las rebajas de condena [institucional]" ·
   Regla: "LA CATEGORÍA ENTRE CORCHETES ES OBLIGATORIA en los bloques de
   noticia, y es UNA de estas doce, tal cual, en minúscula y sin tilde:
   clima, emergencia, economia, seguridad, congreso, salud, educacion,
   internacional, plata-publica, regiones, dato-curioso, deporte" ·
   Debe quedar: el corchete con una de esas doce. `institucional` no está en
   la lista: es una de las seis palabras de "Clima de carátula", que es otra
   cosa y viaja a otro lado. Para este bloque (decretos del Ministerio de
   Justicia, Corte Suprema, recursos de condenados) la que un lector usaría
   para archivarlo es `seguridad`; `congreso` solo calzaría si el bloque
   tratara la tramitación del proyecto. Comprobado en el código además del
   prompt: scripts/imagenes-secciones.js líneas 33 y 34 traen esas doce en
   SECCIONES y su línea 41 solo respeta la categoría
   declarada si está en esa lista; con `institucional` cae al clasificador
   por palabras clave, que es el que falla 59% de las veces y decide la
   imagen, el color y el pictograma del bloque.
2. Dónde: línea 43, "[DATO barras | ENAP, 21 oct] gasolina 93 y 97 por litro:
   $41,3 ; diésel por litro: $91,5 ; kerosene por litro: $24,8 ; GLP vehicular
   por litro: $13,9" · Regla: "ETIQUETA CON CONTEXTO (obligatorio): la
   etiqueta dice QUÉ es la cifra y EN QUÉ SITUACIÓN, en 3 a 8 palabras, de
   modo que la tarjeta se entienda con el video en silencio" · Debe quedar:
   cada etiqueta tiene que decir que la cifra es el ALZA estimada por litro,
   no el precio por litro. Tal como está, la tarjeta en silencio dice que la
   gasolina 93 y 97 cuesta $41,3 el litro, que es falso y no es lo que trae la
   entrada: el informe de hoy, línea 75, dice "aumentos de $41,3 por litro
   para gasolinas de 93 y 97 octanos, $91,5 para diésel, $24,8 para kerosene y
   $13,9 para GLP vehicular". Sirven, contadas una por una dentro del rango de
   3 a 8 palabras: "alza por litro en gasolinas 93 y 97" (8), "alza por litro
   en diésel" (5), "alza por litro en kerosene" (5), "alza por litro en GLP
   vehicular" (6). Los valores no se tocan.
3. Dónde: línea 46, "[DATO comparacion | ENAP, 21 oct] carga de gasolina de 40
   litros: $1652 ; carga de diésel de 60 litros: $5490" · Regla: la misma
   ETIQUETA CON CONTEXTO, "la etiqueta dice QUÉ es la cifra y EN QUÉ
   SITUACIÓN, en 3 a 8 palabras" · Debe quedar: las dos etiquetas tienen que
   decir que la cifra es CUÁNTO SUBE esa carga, no lo que cuesta. En silencio,
   "carga de gasolina de 40 litros: $1652" se lee como el precio de llenar el
   tanque. La entrada, informe línea 83: "Una carga de 40 litros de gasolina
   subiría $1.652 y una de 60 litros de diésel, $5.490, si el ajuste se
   traspasara completo". Sirven, dentro del rango: "alza en carga de 40 litros
   de gasolina" (8) y "alza en carga de 60 litros de diésel" (8). Los valores
   no se tocan.
4. Dónde: el bloque "Fuentes:", líneas 54 a 62, donde no hay ninguna línea de
   Contraloría (buscada explícitamente en esas nueve líneas en esta corrida:
   cero coincidencias de "Contralor") · Regla: "Al final, bajo 'Fuentes:',
   lista una línea por cada fuente de las marcas [DATO] y [CITA] Y por cada
   fuente del informe cuyas noticias narraste, tal como aparecen en el
   informe", y "TODA fuente mencionada EN LA PROSA del guion ('según X', 'el
   Informe diario señalaba', 'como reportó Y') también va en la lista, aunque
   no tenga marca" · Debe quedar: agregar la línea de Contraloría tal como la
   trae el informe, línea 180: "- Contraloría General de la República,
   informes citados el 11 y 22-10-2026: https://www.contraloria.cl/". El
   guion la nombra dos veces en texto que se narra (línea 30, "Contraloría
   exige un plan para reutilizar sus bienes"; línea 35, "Contraloría formuló
   un reparo... y observó falta de gestiones") y el informe atribuye a
   Contraloría justo lo narrado (línea 63, "Contraloría vía BioBioChile,
   11-10-2026", para el plan de distribución; línea 59, para la observación de
   falta de gestiones). Las otras ocho líneas de "Fuentes:" están bien y no se
   tocan.

Observaciones:
- La "Carátula 3", línea 5, "56 decretos / ¿Quién decidió?": la tercera tiene
  que ser "una CIFRA CON REFERENCIA (solo si la cifra se entiende en un
  segundo sin contexto) o un segundo giro si no hay cifra", y "56 decretos" no
  trae contra qué se mide ni dice decretos de qué, así que no pasa la prueba
  del gancho ("si un desconocido necesita preguntarte '¿qué?' o '¿de quién?',
  no es gancho"). Además repite el enfoque de pregunta de la "Carátula
  sugerida" ("¿Quién las autorizó?"), de modo que la prueba A/B sale con dos
  enfoques y no con tres. Queda como observación y no bloquea, igual que el
  mismo hallazgo en los veredictos del 17-10 y del 19-10-2026: el lugar de
  resolverlo de una vez es el prompt, que pide una cifra que casi nunca cabe
  en cuatro palabras entendibles solas.
- El bloque de combustibles narra cinco o más cifras habladas (cuarenta y un
  pesos, casi noventa y dos pesos, cuarenta litros, mil seiscientos cincuenta
  pesos, sesenta litros, cinco mil quinientos pesos, cinco alzas), sobre el
  "máximo tres cifras habladas por bloque" de EXTENSIÓN Y SELECCIÓN. No lo
  marco INCUMPLE porque el propio prompt obliga a narrar el ejemplo a escala
  humana que el informe trae en su línea 83 ("Si el informe trae un ejemplo a
  escala humana, nárralo"), y porque la cadena viene aprobando cargas
  equivalentes (el bloque de AFP del 21-10-2026 narró cinco). Las dos reglas
  se contradicen cuando el ejemplo a escala humana tiene cuatro números: eso
  se arregla en el prompt, no en la pieza. Todas las cifras van redondeadas
  con aproximador y tres cifras significativas, que es lo que protege al
  oyente.
- La etiqueta de la línea 10, "rebajas firmadas en seis meses", se entiende
  mejor como "rebajas de condena firmadas en seis meses" (7 palabras, dentro
  del rango): "rebajas" sola, en pantalla y en silencio, puede leerse como
  rebajas de precio. No es INCUMPLE porque la etiqueta sí dice situación
  (firmadas, en seis meses) y el "en seis meses" consta en el informe,
  línea 25.
- El guion nunca dice de qué es ministro Rabat. El informe abre con "El
  ministro de Justicia reconoció" (línea 17) y el guion lo deja en "El
  ministro Rabat" (línea 11). No lo exige ninguna regla del prompt, pero el
  que llega por el título no sabe qué cartera firmó los decretos.
- La "Descripción sugerida", línea 2, dice "explicó por qué La Moneda sostiene
  que el Presidente no conocía cada expediente". El informe atribuye eso a
  Rabat, no a La Moneda como institución ("Rabat sostuvo que el Presidente
  José Antonio Kast no conocía cada caso", línea 19). La descripción no se
  narra y el sentido se sostiene, así que no bloquea, pero la atribución
  exacta de la entrada es la del ministro.
- Mediciones de esta corrida, por si sirven en la corrección: node
  scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos"; node
  scripts/validar-tarjetas.js da 477 palabras narradas, cuatro bloques con
  fuente y tipos comparacion 2, cifra 1, esquema 1, barras 1, con "variedad
  OK". Contadas acá, incluyendo las tres [TESIS] que sí se narran, son 521
  palabras: las dos cuentas entran en el rango de 420 a 600. El reparto
  también entra en el orientativo: noticia del día 29 (25 a 35), apertura 29
  (25 a 40), los tres bloques 138, 127 y 138 (110 a 160) y cierre 60 (40 a
  60). Las cuatro correcciones de arriba no mueven palabras narradas, salvo
  la 1, que no toca texto hablado.
- Lo demás verificado contra el informe de hoy, archivo por archivo y no de
  memoria: las tres noticias narradas son las tres [A] del informe con la
  portada primera (líneas 15, 55 y 73 del informe, y la marca NOTICIA DE
  PORTADA de la línea 11); no hay cuarta noticia, ni "En titulares", ni Dato
  curioso, ni Agenda, ni "¿En qué quedó?"; las tres [TESIS] tienen 14, 16 y 14
  palabras, bajo el tope de 18, y las tres llevan su línea en blanco detrás;
  los cuatro bloques con fuente la traen en formato legible y bajo seis
  palabras; el [DATO cifra] de la línea 10 muestra grande el 56 que dice el
  título, como pide la regla del 01-10-2026; los tipos de las cuatro marcas
  calzan con el árbol (un valor, dos pares comparables de la misma unidad y
  cuatro valores de la misma familia); las cifras 56, 27, 29, 565 bienes,
  $2.102 millones, $859.629.807, $41,3, $91,5, $24,8, $13,9, $1.652 y $5.490
  calzan una por una con el informe, y los montos van completos sin redondear
  en las marcas; el [ESQUEMA] de la línea 22 describe el proceso que el
  informe sostiene en sus líneas 19 y 21, y cubre la exigencia de al menos un
  esquema cuando una de las tres noticias es de proceso; el matiz de que las
  nuevas normas no revierten los decretos ya firmados sobrevivió al recorte;
  ningún párrafo narrado trae dígitos, paréntesis, URL ni símbolos, y los
  números están en palabras; ningún bloque cierra en síntesis abstracta
  (terminan en los decretos ya firmados, el plan que debe presentar el
  servicio y el paro que los camioneros descartaron); los siete conectores de
  ensayo escrito prohibidos, buscados uno por uno, no aparecen, y tampoco la
  construcción "no solo X, sino Y"; "Fuentes:" no trae ninguna ruta interna
  del sistema, y el contenido/casos/hitos.md que el informe sí lista quedó
  fuera, como corresponde porque esa noticia no se narró; el 23-10-2026 es
  viernes, como dice la apertura; y el cierre lleva el enlace al informe
  completo, la línea "Para salir hoy" del informe (línea 194) integrada como
  una sola frase de vestimenta y el tagline exacto "El resumen sin gritos."
  como última frase hablada.
