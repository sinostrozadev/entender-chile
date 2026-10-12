VEREDICTO: APROBADA
VUELTA: 0
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-12T05:11:28Z

Observaciones:
- Para la pieza siguiente: las cifras del aluvión de San Carlos de Apoquindo
  siguen sin cerrar y hoy no hay ninguna de organismo. Verificado en esta
  corrida sobre el barrido del 12-10-2026: cero coincidencias de "FIBE" y de
  "damnificad", y las dos de "Senapred" son la Alerta Temprana Preventiva de
  Valparaíso, no el aluvión. La de Senapred que trajo el veredicto del
  11-10-2026 (384 damnificados y más de 1.200 rescatados) no reaparece. La
  única cifra nueva es municipal y de un solo medio: 2.015 viviendas afectadas
  y 933 atenciones en vacunatorios, La Tercera en la línea 417 del barrido,
  marcada ahí mismo como "alarma: aluvion (un solo medio por ahora)". El
  informe las pide a la Municipalidad de Las Condes o a Senapred antes de
  ponerlas en cámara, igual que lo advirtieron los veredictos del 10-10-2026 y
  del 11-10-2026.
- Para la pieza siguiente: las seis candidatas marcadas "(sin confirmar)" no
  pasan a cámara con el titular solo (líneas 38, 52, 86, 89, 100 y 131 de la
  pieza, contadas en esta corrida, más la nota que las declara en la 222).
  Contra qué verificar cada una: la fecha del alza del sueldo mínimo, que da El
  ConceCuente solo, contra la ley vigente y no contra el medio que la anuncia;
  la reparación de la fundición de Potrerillos, que da El Zorro Nortino solo,
  contra Codelco o la CONFEMIN; las contrataciones por más de $73 millones en
  escuelas del Servicio Local de Educación Costa Araucanía, contra el informe
  de la propia Contraloría; los más de $257 millones del exdirector del SLEP
  Atacama, contra la Contraloría o el servicio; y la primera cuota de la deuda
  histórica de los profesores, que da DUPLOS.CL solo, contra la ley y el
  Mineduc. La sexta es la cifra municipal del aluvión, ya dicha arriba.
- Para la pieza siguiente: cuatro candidatas no vienen del barrido en Markdown
  sino del JSON del día, así que entran con un solo medio y sin corroboración.
  Verificado en esta corrida: cero coincidencias de "Costa Araucanía", "257",
  "salud mental" y "deuda histórica" en contenido/barrido/2026-10-12.md, y una
  de cada una en contenido/barrido/2026-10-12.json. La pieza las declara en su
  línea 221 y las marca en su propia línea, que es lo correcto.
- Para la pieza siguiente: el informe del 11-10-2026 no dejó ninguna línea
  "PENDIENTE DE CIERRE:", así que esta preselección no tenía candidatas
  obligatorias por cierre pendiente y no las trae. Verificado en esta corrida
  con la marca literal sobre contenido/informes/2026-10-11.md, con y sin
  distinguir mayúsculas: cero coincidencias. Sí quedan tres compromisos con
  fecha que conviene no volver a prometer sin ella: la audiencia del caso de la
  Municipalidad de Maipú el 19-10-2026, la visita presidencial a Bolivia el
  16-10-2026 y el balotaje brasileño el 25-10-2026.
- Para la pieza siguiente: Trabajo y pensiones entra con empleo y con nada de
  pensiones chilenas, y la pieza lo declara en su línea 223. Verificado en esta
  corrida sobre el barrido en Markdown: cero coincidencias de "pensión",
  "pensiones", "cotizacion" y "jubila". La única entrada de AFP es el proyecto
  de retiro de 4 UIT de la línea 129, que es peruano (medio El Popular), así
  que no da candidata chilena. Es información para mejorar el barrido, no un
  hueco del editor.
- Precisión sobre esa misma nota: las dos coincidencias de "AFP" no son la
  misma entrada. La de la línea 129 es el proyecto peruano; la de la línea 230
  cae dentro del texto codificado de una URL de Google News que pertenece a
  otra entrada (Kast por los contratistas de El Teniente). La conclusión de
  fondo no cambia: candidata chilena de pensiones no hay.
- Las seis fuentes institucionales sin feed de contenido/barrido/fuentes.json
  no se abrieron, y la pieza lo declara en su línea 219. No es hallazgo: el
  turno es de Claude por el reparto permanente del 06-10-2026 y
  prompts/suplente.md dice "No navegas" y manda declararlo, que es lo que hizo.
  Lo que sí deja: del Banco Central y del Ministerio Público no hay entrada
  propia en el barrido de hoy, así que esas dos áreas entran solo por prensa.
- Dos candidatas quedan al borde de lo que el prompt deja fuera y conviene que
  el informe las descarte barato si no rinden: los veintitrés años de Memoria
  Chilena (línea 142), que es aniversario y no hecho nuevo, y la guía de
  limpieza después de un aluvión (línea 120), que es nota de servicio y se
  sostiene solo por la emergencia en curso. Entran bien igual: el prompt pide
  criterio amplio y manda que en la duda entre.
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Comprobado aparte en el archivo completo: cero rayas
  largas y cero rayas medias, cero fechas en prosa del tipo "N de mes", las
  doce áreas de cobertura obligatoria con material, 57 candidatas (dentro del
  rango de 35 a 60), 57 bloques de dos líneas con las tres barras y su URL, y
  los 57 "Por qué podría importar" de una sola oración, cerrada con un solo
  punto. Esto último es lo que costó la vuelta 1 del 11-10-2026 y hoy está
  bien en los 57.
- El commit b81fa14 toca solo su propio archivo (1 file changed), lleva el
  encabezado "edición 2026-10-12: preselección" que manda el contrato y en el
  cuerpo "Tarea: suplente (reparto)", que recoge lo que pidió el veredicto del
  11-10-2026 sobre nombrar el reparto y no el plan B.
