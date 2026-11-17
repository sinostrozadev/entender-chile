VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-14T05:06:00Z

Observaciones:
- Para la pieza siguiente: los US$900 millones del acuerdo con los camioneros
  (línea 86) vienen de un solo medio, La Nación, y son una cifra distinta de
  la rebaja de $142 por litro de diésel que contó el informe del 13-11-2026.
  No son el mismo dato y ninguna de las dos tiene segunda fuente en el
  barrido de hoy: hay que confirmarlas antes de decirlas en cámara. La propia
  pieza lo advierte en su línea 234 y propone la nota de Ex-Ante sobre la
  negociación de diez horas como camino para confirmarlas.
- Para la pieza siguiente: el barrido del 14-11-2026 salió roto y eso limita
  el informe. Verificado en contenido/barrido/2026-11-14.json: 15 de 22
  fuentes caídas, las 14 consultas de Google News más la portada, todas con
  HTTP 503. Hoy no hay prensa regional ni fuentes institucionales propias, y
  Vivienda y ciudad quedó sin ninguna candidata.
- Para la pieza siguiente: la nota de Ex-Ante "Paro de camioneros: Por qué
  esta vez Kast privilegió lo político en contraste con el bencinazo" está en
  el barrido (contenido/barrido/2026-11-14.md, línea 75) y no aparece ni entre
  las 57 candidatas ni entre las exclusiones que la pieza nombra. Es material
  sobre la historia principal del día, por si el informe la necesita.
- Para la pieza siguiente: la candidata de la diabetes (línea 121) viene de
  latercera.com/lt-board/, sección cuya otra entrada en el barrido es una nota
  institucional de universidad. Conviene verificar que no sea contenido de
  marca antes de usar la cifra de "más de 300 mil personas".
- Para la pieza siguiente: "la segunda caída que el canal cuenta en días
  seguidos" (línea 138) gana si nombra la referencia en formato absoluto, la
  caída de Microsoft 365 que el informe del 13-11-2026 contó con fecha
  12-11-2026. No es una fecha relativa y no bloqueó, pero el guion la va a
  necesitar dicha con fecha.
- La corrección de la vuelta 1 quedó resuelta y es el único cambio de esta
  versión: la línea 152 pasó de "quien salga de paseo el fin de semana" a
  "quien salga de paseo a la cordillera mientras la alerta esté vigente",
  exactamente la redacción que proponía el veredicto, sin inventar una
  ventana de vigencia que el barrido no trae. Comprobado con el diff de
  dbe0ad4 a ed53a82: una línea cambiada, ningún otro requisito tocado, y
  `node scripts/revisar-mecanico.js` imprime "sin hallazgos mecánicos".
- Las seis fuentes institucionales sin feed que el prompt manda abrir
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público) quedaron sin abrir, y la pieza lo declara en sus notas.
  No es descuido: prompts/suplente.md, línea 116, dice "No navegas. Tu entorno
  no abre páginas de prensa (proxy)". Es una incompatibilidad entre dos
  prompts del repo y no se arregla reescribiendo la pieza, así que no bloquea.
  Queda como cosa de día, no de la cadena.
- El recuento de la línea 228, "catorce no entran por regla del prompt", junta
  nueve exclusiones por regla con cuatro entradas que sí están en la olla por
  otra URL (la acusación contra Rabat, las dos de Pavez y la del Minsal) y
  deja una sin nombrar, la de Ex-Ante sobre el paro. Y "no habría pasado de
  quince candidatas" (línea 237) no cuadra con 27 menos 14. El prompt no pide
  ese recuento, así que no bloquea.
- Las citas de línea del barrido en las notas van corridas: `&#038;` está en
  las líneas 44, 47 y 71 del .md (la nota dice 43 y 70) y `&#8220;` aparece
  también en la 90 (la nota dice 27 y 75). El diagnóstico es correcto, la
  referencia no.
- Lo verificado y cumplido: 57 candidatas, dentro del rango de 35 a 60; las 12
  áreas de cobertura obligatoria presentes y la única vacía declarada al
  final; nueve candidatas fuera de la Región Metropolitana, sobre la cuota
  blanda de 5; las 57 URL existen en el barrido del día, sin ninguna inventada
  y sin repetidas; los medios citados calzan con el barrido, incluidos los
  tres casos de dos medios; las tres secciones finales están en el orden que
  pide el prompt; sin rayas ni emojis en las 237 líneas; sin referencias
  temporales relativas; y el commit cumple el contrato ("edición 2026-11-14:
  preselección" con "Tarea:", y toca solo su propio archivo).
