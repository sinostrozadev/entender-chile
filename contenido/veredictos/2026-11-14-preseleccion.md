VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-14T04:58:08Z

Correcciones:
1. Dónde: línea 152, "Por qué podría importar: es la alerta vigente que sigue a
   las evacuaciones de Ovalle por deshielo, y advierte el riesgo para quien
   salga de paseo el fin de semana." · Regla: regla dura 35, "Fechas
   absolutas. DD-MM-AAAA en la prosa; AAAA-MM-DD solo en rutas y líneas del
   sistema. Nunca 'ayer' ni 'la semana pasada' en un texto que se lee
   después", y REGLAS DE ESTILO del prompt, "Fechas en la prosa como
   DD-MM-AAAA" · Debe quedar: la línea sin ninguna referencia temporal
   relativa. Como el barrido solo trae el titular de La Tercera y no la
   ventana de vigencia de la alerta, no inventes la fecha: escribe "es la
   alerta vigente que sigue a las evacuaciones de Ovalle por deshielo, y
   advierte el riesgo para quien salga de paseo a la cordillera mientras la
   alerta esté vigente." Si la fecha consta en el material del repo, úsala en
   formato DD-MM-AAAA en lugar de la frase final.

Observaciones:
- Para la pieza siguiente: los US$900 millones del acuerdo con los camioneros
  (línea 86) vienen de un solo medio, La Nación, y son una cifra distinta de
  la rebaja de $142 por litro de diésel que contó el informe del 13-11-2026.
  No son el mismo dato y ninguna de las dos tiene segunda fuente en el
  barrido de hoy: hay que confirmarlas antes de decirlas en cámara.
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
- Las seis fuentes institucionales sin feed que el prompt manda abrir
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público) quedaron sin abrir, y la pieza lo declara en sus notas.
  No es descuido: prompts/suplente.md, línea 116, dice "No navegas. Tu entorno
  no abre páginas de prensa (proxy)". Es una incompatibilidad entre dos
  prompts del repo y no se arregla reescribiendo la pieza, así que no bloquea.
- "la segunda caída que el canal cuenta en días seguidos" (línea 138) no es
  una fecha y sigue siendo cierta leída después, así que no entra en la
  corrección, pero gana si nombra la referencia: la caída de Microsoft 365 que
  el informe del 13-11-2026 contó con fecha 12-11-2026.
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
- Lo verificado y cumplido, para que no se vuelva a discutir: 57 candidatas,
  dentro del rango de 35 a 60; las 12 áreas de cobertura obligatoria presentes
  y la única vacía declarada al final; nueve candidatas fuera de la Región
  Metropolitana, sobre la cuota blanda de 5; las 57 URL existen en el barrido
  del día, sin ninguna inventada y sin repetidas; los medios citados calzan
  con el barrido, incluidos los tres casos de dos medios; las tres secciones
  finales están en el orden que pide el prompt; sin rayas ni emojis; el commit
  cumple el contrato ("edición 2026-11-14: preselección" con "Tarea:"); y no
  hay cierre pendiente que entre como candidata obligatoria, comprobado
  buscando "PENDIENTE DE CIERRE" en contenido/informes/2026-11-13.md, sin
  ninguna coincidencia. Las seis ausencias que la pieza afirma del barrido
  (visas, Urrutia, Jadue, Pascua Lama, Teleférico y Lelio) se comprobaron una
  por una: cero coincidencias en el .md y en el .json.
