VEREDICTO: CORREGIR
VUELTA: 2
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-24T06:20:37Z

Correcciones:
1. Dónde: línea 53, el cierre completo, que termina "En Santiago, viste por
   capas: la mañana ronda once grados y la temperatura aumenta. El resumen sin
   gritos.": no hay despedida. La vuelta 1 traía "Nos vemos mañana." y la
   corrección la quitó al reescribir el cierre ·
   Regla: estructura 8, "y la despedida con variaciones de 'Nos encontramos
   mañana en Entender Chile', que termina SIEMPRE con el tagline exacto como
   última frase hablada: 'El resumen sin gritos.'", y control interno 15 ·
   Debe quedar: una frase de despedida entre la frase de vestimenta y el
   tagline, con el tagline todavía como última frase hablada. El cierre tiene
   hoy 57 palabras narradas sobre un tope de 60, así que la despedida entra
   recortando la frase de vestimenta. Opción verificada en esta corrida: "En
   Santiago, viste por capas: la mañana ronda once grados. Nos encontramos
   mañana en Entender Chile. El resumen sin gritos.", que deja el cierre en 59
   palabras (contadas una por una) y el guion completo en 511 narradas, dentro
   de 420 a 600 según scripts/validar-tarjetas.js.
2. Dónde: línea 26, el párrafo nuevo "De los cincuenta y seis decretos,
   veintisiete beneficiaron a condenados por abuso sexual de menores y
   veintinueve a condenados por violación de menores", que es solo cifras y no
   lleva ninguna marca [DATO] ·
   Regla: "CRITERIO DE LA CIFRA (obligatorio) ... Cada párrafo narrado que se
   sostiene en una cifra así lleva su [DATO] con ESA cifra (una, la
   principal)", y control interno 7, "cada párrafo que se sostiene en una
   cifra trae su [DATO] con la cifra principal" ·
   Debe quedar: la marca del desglose vuelve, pero en ESTE bloque y no en la
   tarjeta de apertura, que es lo que pedía la corrección 4 de la vuelta 1 (el
   56 se queda solo en "La noticia del día"). Línea propuesta, puesta justo
   antes del párrafo:
   "[DATO comparacion | EL PAÍS, 23-10-2026] rebajas por abuso sexual de
   menores: 27 decretos ; rebajas por violación de menores: 29 decretos".
   Verificada en esta corrida: tipo comparacion por la fila 6 del árbol (dos
   valores de cosas distintas, misma unidad), cada valor con su propio rótulo
   y su unidad pegada, etiquetas de cinco palabras cada una, fuente de tres
   palabras, y con ella scripts/validar-tarjetas.js sigue dando "variedad OK"
   (cifra 3, esquema 1, comparacion 1, sin dos cifra seguidas) y
   scripts/revisar-mecanico.js sigue sin hallazgos.

Observaciones:
- Para la pieza siguiente: el informe trae dos cifras que el guion dejó fuera
  y que caben sin romper el tope de tres cifras habladas por bloque. En la
  cordillera de Coquimbo se advirtieron ráfagas de hasta 90 kilómetros por
  hora (informe línea 117), que es justamente la cifra que le falta a la
  advertencia con que cierra el bloque del sistema frontal. Y el dólar "cerró
  la semana en su mayor nivel desde abril de 2025" (informe línea 57), que es
  el caso para el que existe la línea opcional " | ref:" de la marca cifra.
- El título sigue diciendo "agresores de menores" donde el informe y su
  noticia de portada dicen "agresores sexuales de menores" (informe líneas 11
  y 15). Las tres carátulas ya traen el grupo completo, así que la regla del
  gancho del 23-10-2026 queda cumplida; recuperar "sexuales" en el título lo
  dejaría con el mismo sentido que la entrada.
- Carátula 3, "56 rebajas a agresores / sexuales de menores": el corte entre
  las dos líneas parte la frase al medio, y en pantalla se pintan como dos
  cajas separadas. Las dos primeras cortan en un punto natural.
- Línea 38, "A ese valor, una compra internacional de cien dólares": el
  "ese valor" al que remite ya no suena en la voz, porque el dato exacto del
  dólar quedó solo en la tarjeta de la línea 36 y la [TESIS] dice "cerca de
  mil pesos", con lo que la equivalencia hablada no cuadra con lo único que el
  oyente escuchó. Se arregla nombrando el valor aproximado en el propio
  párrafo, sin sumar una cuarta cifra hablada.
- Línea 48, "cifras parciales difundidas antes": el informe fecha esas cifras
  parciales de 300 y 735 viviendas el 22-10-2026 (informe línea 113). Con la
  fecha se evita una referencia relativa en un dato que la entrada sí fecha.
- Líneas 43 y 46, "Senapred" en la marca [FUENTE] y en el pie del [DATO]: la
  sigla se pinta en pantalla sin expandirse y no es de las de uso corriente
  que el prompt exime. El tope de seis palabras de esas marcas no deja
  expandirla ahí, así que el lugar es la narración de la línea 48. Lo mismo
  con "Equipos del Serviu" en la línea 50, que un oyente general puede no
  conocer.
- Línea 40, el párrafo del swap: el informe lo acredita a "Banco Central de
  Chile, 23-10-2026; CNN Chile y BioBioChile, 23-10-2026" (informe línea 59) y
  la lista "Fuentes:" no trae CNN Chile. Es la única fuente del informe cuyas
  noticias se narraron que quedó sin su línea.
- Lo que NO es incumplimiento, para que no se toque: las nueve correcciones de
  la vuelta 1 quedaron resueltas y verificadas en esta corrida (el encabezado
  en una línea por campo, comprobado con scripts/parse.js, que ahora devuelve
  el título, las tres carátulas y el clima; las cuatro marcas [FUENTE] con una
  o dos fuentes y seis palabras o menos; las tres carátulas con el grupo
  nombrado y cuatro palabras por línea; el 56 en la tarjeta de apertura con
  etiqueta de ocho palabras; tres cifras habladas en el bloque del dólar; el
  equivalente en pesos redondeado a tres cifras significativas; el enlace de
  la descripción y la frase de síntesis en el cierre; y el bloque del sistema
  frontal terminando en un hecho). También están correctos la selección de las
  tres noticias (portada primero y las dos [A] siguientes del informe, con
  Brasil fuera por ser la cuarta), las tres categorías entre corchetes, el
  largo narrado (509 palabras, de 420 a 600), las tres [TESIS] bajo 18
  palabras con su línea en blanco, y la lista de fuentes sin rutas internas
  del sistema.
