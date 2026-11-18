VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-18T04:53:58Z

Observaciones:
- Para la pieza siguiente: la propia olla deja marcada una discrepancia que el
  informe tiene que resolver eligiendo una cifra y citando la fuente. CNN Chile
  habla de 64 comunas con más de mil hectáreas en zonas de muy alto riesgo de
  incendio y Cooperativa de 65 comunas con "alto riesgo" (barrido del
  18-11-2026, entradas de CNN Chile y Cooperativa). No son la misma medición.
- Para la pieza siguiente: cuatro fuentes institucionales sin feed quedaron sin
  revisar directamente (Cámara de Diputados, Senado, Dirección Meteorológica y
  Ministerio Público), porque el turno lo tomó el suplente y el suplente no
  navega, y el barrido declara caídas congreso, gnews-portada, ciencia y clima.
  Resultado práctico: hoy no hay material propio de clima ni de ciencia, y los
  avisos meteorológicos de Coquimbo a Los Lagos que vencían el 17-11-2026
  quedaron sin cierre. Si el informe los menciona, tiene que decir que la
  fuente de clima no respondió.
- Para la pieza siguiente: tres candidatas vienen marcadas "(sin confirmar)"
  porque el barrido las trae de un solo medio (el posible paro nacional de
  profesores del 24-11-2026, el temblor en el norte y el derrumbe parcial del
  puente de Crimea). Si alguna llega al informe necesita segunda fuente o la
  marca explícita de que la da un solo medio.
- Para la pieza siguiente: Educación entra con una sola candidata y es
  justamente una de las tres sin confirmar. Es el área más débil de esta olla.
- Para la pieza siguiente: la candidata de Rangers de Talca (línea 164) entra
  con el titular descrito y no reescrito ("Reportaje de Interferencia sobre la
  crisis del club Rangers de Talca") y con la advertencia "por verificar de qué
  trata exactamente". El prompt de la preselección solo pide fuente
  identificable, así que entra, pero el informe no puede narrarla sin abrir la
  nota.
- Falta la línea en blanco entre la última candidata de Internacional
  (línea 191) y el encabezado "## Áreas sin material hoy" (línea 192). No
  rompe el formato declarado ni a quien lee el archivo (scripts/estado.js y
  scripts/taller.js solo comprueban que exista), pero conviene no repetirlo.

Verificado contra los archivos, no de memoria:
- 56 candidatas, dentro del rango de 35 a 60 que pide el prompt, cada una con
  su línea "Por qué podría importar" (56 y 56).
- Las 12 áreas de cobertura obligatoria tienen al menos una candidata, así que
  "Áreas sin material hoy: ninguna" es consistente.
- Las 56 URL de la pieza existen en contenido/barrido/2026-11-18.md: ninguna
  candidata viene de fuera del barrido.
- La consolidación de medios es fiel. Dos casos revisados uno por uno: Kast y
  Xi Jinping (La Tercera, EL PAÍS y Radio Pauta están en el barrido) y los 315
  funcionarios de Contraloría (BioBioChile, El Desconcierto, El Observatodo y
  El MorroCotudo, también).
- Las tres marcas "(sin confirmar)" caen exactamente en las tres entradas que
  el barrido rotula "un solo medio por ahora". Las candidatas de medios
  pequeños sin marca (El Martutino, ContrapoderChile.cl, Ñuble Actual, Atacama
  Noticias, Radio Sago, zonazero.cl) están corroboradas en dos fuentes según el
  barrido, así que no les correspondía la marca.
- contenido/informes/2026-11-17.md no contiene ninguna línea "PENDIENTE DE
  CIERRE:" (búsqueda explícita en el archivo completo, 324 líneas), así que no
  había candidatas obligatorias por esa vía. Los dos hitos con fecha de su
  agenda sí están en la olla: la postulación en línea al DS1 Tramo 4.000 y la
  rebaja de combustibles.
- Las nueve "Historias en curso sin novedad hoy" salen todas del informe del
  17-11-2026, incluidas la desocupación sobre el millón de personas (línea
  146), la negociación del reajuste del sector público (línea 302) y la marcha
  contra las AFP del 28-11-2026 (línea 304).
- Cuota de regiones cumplida con holgura: Los Ríos, Antofagasta, Ñuble,
  Valparaíso, Biobío, Los Lagos, Rapa Nui, Atacama, Maule y Magallanes.
- Sin rayas largas ni medias, sin emojis, sin fechas relativas, fechas de prosa
  en DD-MM-AAAA y AAAA-MM-DD solo en rutas. node scripts/revisar-mecanico.js
  no encontró hallazgos.
- Ruta y commit según prompts/contrato-archivos.md: la pieza está en
  contenido/preseleccion/2026-11-18.md, el commit 5e70528 dice
  "edición 2026-11-18: preselección", lleva cuerpo con "Tarea:" y toca un solo
  archivo.
- Las seis fuentes institucionales sin abrir están declaradas en "Notas del
  barrido", que es lo que pide prompts/suplente.md cuando el suplente no puede
  entrar a las páginas. Por eso no es incumplimiento.
