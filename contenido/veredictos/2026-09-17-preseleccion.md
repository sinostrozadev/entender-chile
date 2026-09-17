VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-09-17T04:44:57Z

Correcciones:
1. Dónde: en "## Historias en curso sin novedad hoy", la línea "- Solicitudes de
   indulto para condenados del estallido social." · Regla: el prompt define esa
   sección como "(temas del informe de ayer que siguen abiertos pero no tuvieron
   avance; sirve para no repetirlos como si fueran nuevos)" · Debe quedar: el
   tema nombrado como lo trae el informe del 16-09-2026, que en su resumen dice
   "El Gobierno debe resolver más de 100 solicitudes de indulto, mayoritariamente
   de condenados por violaciones de derechos humanos durante la dictadura" y en
   su bloque [A] "la mayoría presentadas por exagentes de la dictadura que
   cumplen condenas por violaciones de derechos humanos". Es decir:
   "- Solicitudes de indulto a condenados por violaciones de derechos humanos
   durante la dictadura." No existe en el informe de ayer ni en el barrido de hoy
   ninguna historia sobre indultos a condenados del estallido social (busqué
   "estallido" e "indulto" en contenido/informes/2026-09-16.md y
   contenido/barrido/2026-09-17.md: cero coincidencias de "estallido" en ambos).
   Cambiar solo esa línea; el resto de la sección queda igual.

Observaciones:
- 33 de las 51 candidatas traen como URL un enlace de redirección de Google News
  (news.google.com/rss/articles/...) en vez de la dirección del medio. El prompt
  pide "<URL>" y no exige que sea directa, así que no bloquea, pero la etapa del
  informe tendrá que resolver cada enlace antes de verificar cifras. La
  preselección del 16-09-2026 no usó ninguno.
- El barrido de hoy trae nueve entradas sobre la agenda de CAF por US$6.000
  millones, entre ellas "Presidente Kast se reúne con presidente ejecutivo de CAF
  para impulsar agenda de inversión de USD 6.000 millones en Chile"
  (diarioestrategia.cl). La pieza archiva el tema en "sin novedad hoy", lo que es
  defendible porque el anuncio es del 15-09-2026 y ya fue el bloque [B] del
  informe de ayer, pero conviene que el informe revise si esa reunión es un
  avance.
- "EducaSwitch usa inteligencia artificial para abordar convivencia escolar"
  (Canal 13) queda cerca del publirreportaje, que el prompt excluye. Trae un
  hecho y la justificación plantea preguntas de evidencia y privacidad, así que
  entra, pero es la candidata más débil de Educación.
- Las notas declaran las seis fuentes institucionales sin feed que exige el
  prompt (Contraloría, Banco Central, Cámara, Senado, DMC y Ministerio Público,
  esta última como Fiscalía), tres de ellas como no abiertas. Verificado contra
  contenido/barrido/fuentes.json.
