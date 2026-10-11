VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-11T05:27:36Z

Observaciones:
- Para la pieza siguiente: las cifras del aluvión de San Carlos de Apoquindo
  siguen sin coincidir entre medios y la única con dos fuentes y organismo
  responsable es la de Senapred, 384 damnificados y más de 1.200 rescatados,
  verificada en esta corrida en el barrido (La Tercera en su línea 723, Radio
  Universidad de Chile en la 630 con "más de mil rescates", y la línea 807).
  Las viviendas afectadas (2.015 en un medio y más de 2.000 en otro) vienen de
  La Prensa de Monagas y van marcadas como alarma de un solo medio. Los heridos
  y los daños en dólares siguen con una fuente cada uno. El informe las pide a
  Senapred o a la municipalidad antes de ponerlas en cámara, igual que lo
  advirtió el veredicto de la preselección del 10-10-2026.
- Para la pieza siguiente: las seis candidatas marcadas "(sin confirmar)" no
  pueden pasar a cámara con el titular solo (líneas 50, 53, 115, 141, 165 y
  177 de la pieza, contadas en esta corrida, más la nota que las declara en la
  230). Contra qué verificar cada una: la huelga de Minera Escondida del
  14-10-2026 y el retiro de la propuesta de turnos 14x14, contra el sindicato
  de supervisores o la empresa; la huelga en Centinela, que da teleSUR sola,
  contra la empresa o el sindicato; la explosión en la Línea 5, que da La
  Tercera sola y sobre la que el barrido no dice qué explotó, contra Metro o
  Senapred, y si no se establece queda fuera; el llamado de la Sociedad
  Geológica, que da El Diario de Antofagasta solo, contra la propia sociedad;
  la nulidad buscada en el juicio del megafraude a Fonasa, que está solo en el
  JSON del día, contra el tribunal; y las viviendas afectadas, como dice la
  observación anterior.
- Para la pieza siguiente: el informe del 10-10-2026 no dejó ninguna línea
  "PENDIENTE DE CIERRE:", así que esta preselección no tenía candidatas
  obligatorias por cierre pendiente y no las trae, que es lo correcto.
  Verificado en esta corrida con la marca literal sobre
  contenido/informes/2026-10-10.md: una sola coincidencia, su línea 345, y es
  la mención de que el informe del 09-10-2026 tampoco la tenía. Sí quedan dos
  compromisos con fecha para el 19-10-2026, la audiencia del caso
  Municipalidad de Maipú y los cinco cuadernos de la Corte Suprema por
  licencias médicas: no son del 11-10-2026, y conviene que el informe no los
  vuelva a prometer sin fecha.
- Para la pieza siguiente: Trabajo y pensiones entra con empleo y sueldo mínimo
  y con nada de pensiones, y la pieza lo declara. Es información para mejorar
  el barrido, no un hueco del editor.
- Para la pieza siguiente: la candidata del sueldo mínimo viene redactada como
  "Meganoticias publica la fecha de la próxima alza". El informe tiene que dar
  el monto y la fecha contra la ley vigente, no contra el medio que los
  anuncia.
- La corrección de la vuelta 1 quedó bien y es la única: el diff entre la
  versión validada (commit 8056349) y la de ahora (f2d75a7) toca una sola
  línea, la 191, y deja la redacción que propuso el veredicto. El "Por qué
  podría importar" del ataque hutí a Riad es ahora una sola frase, con la
  advertencia de que las cifras de víctimas no coinciden entre medios dentro de
  la misma frase, así que el aviso no se perdió. Verificado además sobre los 59
  bloques en esta corrida: ninguno parte una segunda oración (cero
  coincidencias de punto seguido de mayúscula) y los 59 cierran con un solo
  punto. Todo lo demás de la pieza es idéntico a la versión que la vuelta 1 ya
  revisó candidata por candidata, así que no hay hallazgo nuevo que sumar
  (regla de convergencia del 15-09-2026).
- Mecánico: node scripts/revisar-mecanico.js sobre esta versión imprimió "sin
  hallazgos mecánicos". Comprobado aparte en el archivo completo: cero rayas
  largas y cero rayas medias, 59 candidatas (dentro del rango de 35 a 60) y 59
  bloques "Por qué podría importar".
- El commit f2d75a7 toca solo su propio archivo (1 file changed) y lleva el
  encabezado "edición 2026-10-11: preselección" que manda el contrato, con la
  línea "Tarea:" en el cuerpo, que el contrato permite. Su "Tarea: suplente
  (plan B)" no calza con el turno real, que el propio cuerpo explica bien: lo
  escribió Claude por el reparto permanente de contenido/estado/reparto.txt y
  no por plan B, porque contenido/estado/plan-b.txt no existe (verificado en
  esta corrida al decidir el rol). El contrato no fija un vocabulario para ese
  nombre, así que no bloquea, pero conviene que diga "reparto" cuando el turno
  venga de ahí: es el rastro que después se lee con git log.
