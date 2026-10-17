VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-17T05:56:30Z

Observaciones:
- Para la pieza siguiente: después de esta no hay pieza de GPT en la cadena
  diaria. Lo que sigue es la revisión del día, en
  contenido/revisiones/2026-10-17.md, que esta misma corrida escribe.
- La única corrección de la vuelta 1 quedó resuelta y verificada. El diff entre
  la versión anterior y esta toca las nueve líneas de "Fuentes:" y nada más:
  salieron las nueve direcciones web y quedó el texto exacto que pedía el
  veredicto, en el mismo orden, sin agregar ni quitar ninguna línea. Cada una
  calza literal, hasta la fecha, con una línea de "Fuentes consultadas" del
  informe (líneas 92 a 98, 117 y 121). Por convergencia (15-09-2026) no
  corresponde sumar ningún hallazgo sobre partes que la vuelta 1 no marcó, y la
  corrección no introdujo ninguno: no toca el texto narrado, ni una marca, ni
  el largo.
- El largo no se movió: scripts/validar-tarjetas.js sigue dando cuatro bloques
  con fuente, 497 palabras narradas (unos 3,7 minutos), dos [DATO cifra] y un
  [ESQUEMA], con variedad sin cuotas rotas y ninguna marca malformada, dentro
  del rango de 420 a 600. scripts/revisar-mecanico.js imprime "sin hallazgos
  mecánicos", y la búsqueda de raya larga y raya media sobre el archivo
  completo no devuelve ninguna coincidencia.
- La carátula del día ya está en el repositorio, que era lo que la vuelta 1
  dejó anotado como pendiente: contenido/caratulas/2026-10-17.png y su
  contenido/caratulas/2026-10-17-prompt.txt (más un 2026-10-17-ajuste-prompt.txt),
  y ningún archivo NO-PUDE. El orden que manda el prompt se cumplió: primero el
  guion, la imagen después y en su propio commit.
- La "Carátula 3" ("Cooperación acordada, / relación incompleta") sigue siendo
  un segundo giro y no una cifra con referencia. El prompt lo permite cuando no
  hay cifra que se entienda sola, y acá la única es el cuatro, que ya está en la
  "Carátula 2". Es la tercera edición seguida con esta observación: conviene
  probar una carátula con cifra el día que traiga una que se lea en un segundo.
- El bloque de la portada quedó en 148 palabras narradas y el de la medialuna en
  154, así que el bloque de portada no es el más largo. No bloquea: el reparto
  de 110 a 160 por noticia el prompt lo da como orientativo, y sumadas las 28
  palabras de "La noticia del día", que es la misma noticia, la portada llega a
  176 y recibe el mayor desarrollo de la edición.
- Quedan sin cerrar, y no son hallazgo porque el informe tampoco los trae: el
  antecedente de desde cuándo Chile y Bolivia no intercambian embajadores. Si se
  quiere en cámara, tiene que entrar antes por el informe. El guion sí respetó
  el otro riesgo anotado en el veredicto del informe: no ensanchó el tramo
  territorial del sistema frontal, que no se narra y en la descripción aparece
  solo como "la vigilancia ante el sistema frontal".
