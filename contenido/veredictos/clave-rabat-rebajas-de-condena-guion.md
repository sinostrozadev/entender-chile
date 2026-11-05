VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion
SLUG: rabat-rebajas-de-condena
PROMPT: prompts/guion-claves.md
VALIDADO: 2026-11-05T03:13:50Z

Observaciones:
- Para la pieza siguiente: los dos [DATO cifra] (líneas 9 y 51) llevan tres
  valores y en pantalla va a salir solo el primero, porque TarjetaDatoCifra
  toma (ev.series ?? [])[0] en src/tarjetas.tsx, línea 883. No es INCUMPLE: el
  prompt de la Clave no fija cuántos valores lleva cada tipo (el árbol de tipos
  vive en prompts/guion-informe.md, que no es el prompt de esta pieza). Con
  tipo comparacion el renderizador dibuja los tres, como ya ocurre en las
  líneas 23, 86 y 100. node scripts/validar-tarjetas.js lo avisa en esas dos
  líneas.
- Para la pieza siguiente: la línea 119 narra "el boletín dieciocho mil
  ochocientos seis", cinco cifras significativas habladas. No es INCUMPLE,
  porque es un identificador y no una magnitud, y el prompt exceptúa los
  números de ley por esa razón, pero se escucha mejor si el bloque dice "el
  proyecto que el Ejecutivo ingresó al Senado" y deja el número fuera de la
  voz.
- Queda pendiente en el prompt, no en la pieza: las tres fuentes de la entrega
  que son informes propios (informes del 27, 29 y 31-10-2026, entrega líneas
  130 a 132) no están en el bloque "Fuentes:" del guion y parte de su contenido
  sí se narra. La REGLA DE CRÉDITO TOTAL las pide y el mismo bloque prohíbe
  listar archivos internos del sistema: la contradicción conviene resolverla en
  prompts/guion-claves.md. No la cuento contra la pieza porque cada hecho tiene
  además su fuente pública acreditada en la lista.
- El bloque "## Cierre" (líneas 126 a 129) termina con tres frases más el
  tagline y la estructura pide "Despedida de una frase". No es INCUMPLE: el
  tagline está exacto ("El resumen sin gritos.") y el párrafo es el cierre
  natural de la explicación, no relleno.

Lo que quedó verificado en esta vuelta:
- Las seis correcciones de la vuelta 1 están tomadas, una por una: la [TESIS]
  de la línea 28 dice "cincuenta y seis"; los tres [DATO] mal anclados quedaron
  inmediatamente antes del párrafo que los narra (líneas 23 y 24, 42 y 43, 51 y
  52) y el párrafo de la línea 40 quedó con "[FUENTE] The Clinic, 25-10-2026"
  (la fuente que la entrega da para las más de 250 negativas, entrega línea
  47); los dos [INTERPRETACIÓN] narran la fórmula explícita "Una lectura
  posible es que" (líneas 89 y 113); los bloques "Quién decidía realmente" y
  "Qué mirar después" tienen su [FUENTE] al principio (líneas 68 y 118); la
  carátula sugerida es "¿Quién les acortó la condena?" (cinco palabras) y el
  mismo gancho está en los tres prompts de carátula del archivo de imágenes; y
  los dieciséis encabezados de sección de ese archivo quedaron numerados "## 1."
  a "## 16.", en el mismo orden que las secciones del guion.
- La corrección no introdujo nada: el diff contra la versión anterior toca solo
  la línea de la carátula, la posición de tres marcas, dos prefijos de
  interpretación, tres marcas [FUENTE] nuevas y la numeración del archivo de
  imágenes. Ningún párrafo narrado cambió de contenido.
- Las siete preguntas de la sección 4 de la pauta siguen respondidas en lo
  narrado, comparadas con la pauta abierta: la 1 en "De dónde viene el
  beneficio" (líneas 18, 21 y 24); la 2 en "Quién decidía realmente" (líneas
  66, 70 y 72); la 3 en "El cambio de criterio" (líneas 47, 49, 52 y 54); la 4
  dicha como sin respuesta pública (líneas 33 y 103); la 5 en la línea 101, con
  treinta y tres identificados y veintitrés sin confirmar; la 6 en la línea 106
  y su bloque; la 7 en la línea 111.
- Nada de la sección 6 de la pauta entró: no hay afirmación ni insinuación de
  delito y cada mención lleva su situación procesal fechada (líneas 76, 78, 93
  y 95), no aparecen la red internacional ni la querella contra el diputado
  Bassa, no se suman los cincuenta y seis con las trescientas treinta y dos
  víctimas y no se especula con el resultado de la acusación ni de la
  investigación (líneas 116 y 124 lo dicen al revés).
- Las siete marcas [DIARIO] son idénticas a las de la sección 9 de la pauta,
  comparadas una por una, y cada una es la primera línea de su sección, antes
  de la [TESIS].
- Extensión: 1.230 palabras narradas, unos 9,1 minutos, dentro de las 1.050 a
  1.650 del control interno 3. Dieciséis bloques y dieciséis [TESIS], con línea
  en blanco después de cada una. Los tres [ESQUEMA] tienen tres elementos de
  hasta cuatro palabras. Sin raya larga ni raya media en el guion ni en el
  archivo de imágenes. node scripts/revisar-mecanico.js imprime "sin hallazgos
  mecánicos".
