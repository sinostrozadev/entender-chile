VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-27T05:49:39Z

Observaciones:
- Las cuatro correcciones de la vuelta 1 quedaron aplicadas y el diff entre las
  dos versiones (commits ada00f4 y e75d68f) toca SOLO esas cuatro líneas, sin
  arrastre a ninguna otra parte de la pieza. Una por una, verificadas contra la
  entrada: (1) la sigla EF ya se decodifica la primera vez que suena, con la
  glosa textual del informe ("vientos capaces de causar daños considerables",
  línea 16 de contenido/informes/2026-10-27.md), y "La noticia del día" queda
  en 33 palabras narradas, dentro del tope de 25 a 35, en dos frases y con una
  sola marca; de paso la línea 11 cambió "la precordillera" por "diez comunas",
  que es lo que dice el informe. (2) La marca de las rebajas quedó
  `comparacion` y no `barras`, que es la fila que le corresponde en el árbol
  por traer dos valores. (3) Sus dos rótulos dicen ahora que son rebajas y no
  población de condenados ("rebajas a condenados por abuso sexual", 6
  palabras; "rebajas a condenados por violación", 5), y el desglose 27 y 29
  calza con la línea 24 del informe y suma los 56 del titular. (4) Los dos
  valores del rango de viviendas llevan su rótulo completo (7 y 7 palabras),
  con lo que "más de 70" ya no queda en pantalla sin decir qué cuenta; el
  rango se conserva como rango, que era lo que pedía el veredicto del informe.
- La carátula del día, que en la vuelta 1 no estaba, ya está en el repo:
  contenido/caratulas/2026-10-27.png y su contenido/caratulas/2026-10-27-prompt.txt.
  Queda cerrada esa observación.
- Para el día: en la marca de la línea 10 el valor es "EF-2" y ahí el código se
  pinta en pantalla antes de que la voz lo explique. La regla de siglas pide la
  expansión la primera vez que la sigla aparece en el guion, y la narración de
  la línea 11 la resuelve un renglón después, así que no bloquea y no se marcó
  en la vuelta 1. Si el mismo código vuelve a portada, conviene que la etiqueta
  lo traiga ya decodificado ("tornado en Requínoa, daños considerables: EF-2"),
  porque la tarjeta se lee con el video en silencio.
- Qué quedó verificado en esta vuelta, sobre esta versión: node
  scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos" y node
  scripts/validar-tarjetas.js da 459 palabras narradas (rango 420 a 600),
  cuatro bloques con fuente y "variedad OK", con dos comparacion, dos esquemas
  y una cifra. La selección sigue siendo la correcta: tres bloques de noticia,
  la portada declarada en la línea 10 del informe primera y las dos [A]
  siguientes en el orden del informe (Kast y Rabat de la línea 24, Hermosilla
  de la línea 38); la cuarta [A], la comisión investigadora de los fondos D y
  E de la línea 62, se queda en la web, que es lo que manda el formato corto.
  Sin "En titulares", sin Dato curioso, sin Agenda y sin "¿En qué quedó?".
  Cada bloque de noticia con su [FUENTE] y su [TESIS] de 18 palabras o menos,
  con línea en blanco después de cada tesis. Cero rayas largas o medias en las
  66 líneas, sin conectores de ensayo escrito, sin paréntesis ni URL en lo
  narrado, números narrados en palabras y cifras grandes redondeadas. El
  cierre nombra hechos concretos, manda el informe completo al enlace de la
  descripción, integra "Para salir hoy" y termina con el tagline exacto. Las
  trece líneas de "Fuentes:" cubren las fuentes de las marcas y de los tres
  bloques narrados, y ninguna es una ruta interna del sistema.
