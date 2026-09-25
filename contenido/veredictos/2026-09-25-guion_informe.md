VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-25T12:17:30Z

Correcciones:
1. Dónde: línea 25, "[DATO cambio | Senapred, 24 sep] viviendas dañadas en el
   balance de Senapred: 70 -> 370 (sube mal)" · Regla: el árbol de tipos define
   `cambio` como "El mismo indicador en DOS momentos (antes y después, subió,
   cayó, pasó de X a Y)", y el control interno 17 exige que "ninguna marca lleva
   un dato que no esté en el informe"; el informe (línea 21) dice "Las cifras
   del daño no coinciden entre los reportes del mismo día y aquí se consignan
   las dos", no que las viviendas dañadas hayan subido de 70 a 370, y escribe
   "más de 70", no 70. La tarjeta además contradice al párrafo que la acompaña,
   que narra que los números no calzan y que nadie cerró la diferencia · Debe
   quedar: una marca que no afirme un alza. Con el informe basta una cifra:
   "[DATO cifra | Senapred, 24 sep] viviendas dañadas en el balance más
   reciente: 370". La discrepancia no se pierde, porque el párrafo siguiente ya
   narra las dos versiones. Si al cambiarla la edición queda con dos tipos de
   [DATO] en vez de tres, no fuerces una tercera: el propio prompt dice que "la
   cuota es una alarma, no una obligación" y que "la variedad NUNCA justifica un
   dato que no está en el informe".

2. Dónde: la lista "Fuentes:", líneas 159 a 228 · Regla: "lista una línea por
   cada fuente de las marcas [DATO] y [CITA] Y por cada fuente del informe cuyas
   noticias narraste, tal como aparecen en el informe", y "una fuente cuyo
   contenido se narró no puede quedar sin crédito" · Debe quedar: la lista
   igual a la del informe vigente, con estos tres cambios exactos, que son la
   diferencia entre el informe reparado (commit 401c221) y el anterior
   (8d98c63), del que la lista quedó copiada: (a) borrar la línea 183, "- El
   Dínamo, 24 sep 2026.", porque "Dínamo" no aparece en ninguna línea del
   informe de hoy, comprobado con búsqueda sobre el archivo completo; (b) dejar
   la línea 198 como "- La Tercera, 15, 23 y 24 sep 2026.", que es como aparece
   en el informe, en vez de "- La Tercera, 15, 23, 24 y 25 sep 2026."; (c)
   agregar entre las líneas 179 y 180, después de "Diario Financiero" y antes de
   "eju.tv", la línea "- Dirección Meteorológica de Chile, 25 sep 2026.", que es
   la fuente con que el informe (línea 247) respalda la línea "Para salir hoy"
   que el guion narra en su línea 156.

3. Dónde: línea 111, el encabezado "## ¿En qué quedó?", seguido directamente por
   el párrafo narrado, sin marca de fuente · Regla: "En la línea siguiente a
   cada '## sección': la fuente principal del bloque (una, o dos separadas por
   punto y coma), tomada del informe... Cada bloque de noticia la lleva,
   incluida 'La noticia del día'; Apertura, Dato curioso, Agenda, En titulares y
   Cierre no": "¿En qué quedó?" no está entre las exentas y el propio prompt
   dice que "sí se narra, como noticias breves", así que hoy sus tarjetas se
   pintan sin pie de fuente · Debe quedar: en la línea siguiente al encabezado,
   la fuente que el informe da para esa sección (línea 161, "Corte de
   Apelaciones de Santiago, resolución del 03-09-2026"), en formato legible y
   dentro del máximo de seis palabras: "[FUENTE Corte de Apelaciones, 3 sep]",
   que son cinco palabras, contadas. El bloque no necesita [TESIS]: el prompt la
   exige en bloques con noticias [A] y [B], y esa sección del informe no trae
   peso.

Observaciones:
- Para la pieza siguiente: el informe de hoy deja cuatro conceptos que sirven
  para el banco de temas de la Clave sin depender de una noticia nueva: la
  escala de alertas de Senapred, que hoy convivió completa en un mismo día
  (tres rojas, cuatro amarillas y una temprana preventiva por tormentas
  eléctricas, líneas 17 y 23 del informe) y qué obliga cada una; la isoterma
  cero alta (línea 23) y por qué decide que un mismo frente termine en desborde
  y no en nieve; el mensaje SAE al celular con que se ordenó evacuar Santa
  Bárbara (línea 19), quién puede dispararlo y con qué alcance; y las tres vías
  de control político abiertas hoy sobre un mismo acto de gobierno (línea 37),
  la sesión especial del Senado, la interpelación en la Cámara y la
  presentación en Contraloría, que no son lo mismo ni tienen los mismos
  efectos.
- La apertura (línea 15) repite palabra por palabra la [TESIS] del bloque del
  Escudo (línea 32): "Bachelet y Boric piden reconsiderar la permanencia de
  Chile en el Escudo de las Américas". El prompt solo prohíbe expresamente
  repetir literalmente las frases de "La noticia del día" en su desarrollo, y
  eso sí se cumple, pero la frase se va a escuchar dos veces idéntica dentro
  del primer minuto y medio.
- La noticia de portada no es la de mayor desarrollo si se miden las palabras
  narradas: el bloque del Escudo suma 353 y el del temporal 300, o 340 contando
  "La noticia del día", que es su propio arranque. El prompt pide que la de
  portada "recibe el mayor desarrollo". El margen es de trece palabras, por eso
  no bloquea, pero es el lugar por donde apretar si mañana hay que recortar.
- Años en numerales dentro del texto narrado, frente a "escribiendo los números
  en palabras" de EXPLICACIÓN ORAL: "octubre de 2025" en la [TESIS] y en el
  párrafo del dólar (líneas 84 y 87), "Presupuesto 2027" en las líneas 59, 151
  y 154, y "producción de 2025" en el titular de Codelco (línea 118). Se anota y
  no se manda a corregir porque el guion del 24-09 pasó con siete casos iguales
  sin que se marcaran y porque un año no es un problema de pronunciación; si se
  quiere cerrar, conviene decidirlo de una vez y no a mitad de una cadena de
  correcciones.
- "[FUENTE Senapred, 24 sep]" (líneas 9 y 18) pinta la sigla en pantalla antes
  de que la narración la expanda, y la expansión llega recién en la línea 21.
  Expandirla dentro de la marca choca de frente con el "máximo seis palabras"
  del formato legible. Es la misma tensión que quedó anotada con DMC el 21, el
  22 y el 23-09: si se quiere resolver de verdad, hay que tocar el prompt, no el
  guion.
- La [CITA] de la línea 36 dice "Chile no debe verse obligado a escoger un
  bando". El informe (línea 29) entrecomilla solo "no debe verse obligado a
  escoger un bando" y deja "el país" fuera de la comilla. El sentido es el mismo
  y por eso no bloquea, pero lo que se pinta como textual lleva una palabra que
  la fuente no dijo.
- "[DATO cifra | La Tercera, 24 sep] imputados por corrupción detenidos en tres
  regiones: 9" (línea 65) convive con una [TESIS] que nombra "cuatro
  funcionarios de Gendarmería". La etiqueta desambigua bien, así que no entra
  como corrección, pero es exactamente el riesgo de lectura que dejó la regla
  del 01-09: el espectador junta el número grande con el nombre que tiene más
  cerca.
- Extensión: 1.872 palabras narradas, contra 1.366 el 23-09 y 1.334 el 24-09. NO
  se traduce a minutos por palabras: prompts/auditoria-matinal.md (líneas 54 a
  56) advierte que el 03-09 la estimación dio 15,7 minutos para un audio real de
  11,9. La duración de verdad se lee del campo durSeg de
  contenido/podcast/episodios.json cuando el episodio exista. Queda anotado
  porque es un 38% más de texto narrado que los dos días anteriores.
- Cuentas verificadas contra el informe: 3 [A], 16 [B] y 17 [C]. El guion narra
  las tres [A] y siete [B], diez noticias narradas, justo en el tope, y deja 26
  titulares, uno por cada una de las nueve [B] fuera del corte y de las 17 [C],
  cada uno en su propia línea y ninguno sobre doce palabras. Nada del informe
  queda sin sonar. Las once [TESIS] están dentro de las 18 palabras y todas
  llevan su línea en blanco antes del párrafo. No hay rayas, ni paréntesis fuera
  de las marcas, ni conectores de ensayo, ni URLs, ni rutas internas en la lista
  de fuentes.
