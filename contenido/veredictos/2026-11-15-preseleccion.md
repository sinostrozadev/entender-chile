VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-11-15T08:20:27Z

Correcciones:
1. Dónde: en "Historias en curso sin novedad hoy", la línea "El Presupuesto
   2027 en el Senado: ... Se buscó "Presupuesto" en el barrido del 15-11-2026
   y las coincidencias son las tres candidatas de análisis que ya están en la
   olla (CIPER en educación, las asignaciones de niñez y el paquete de RN),
   ninguna del trámite legislativo." · Regla: el prompt abre con "VERIFICAR
   ANTES DE AFIRMAR" del contrato, que manda sobre todo lo que sigue, y ese
   contrato precisa: "Esto vale sobre todo cuando la conclusión te lleva a
   OMITIR algo: si crees que un elemento obligatorio no está en la fuente,
   vuelve a leer la fuente antes de dejarlo fuera. Omitir por una premisa
   falsa es peor que preguntar, porque no deja rastro y se descubre días
   después." La afirmación no se sostiene contra el barrido: las coincidencias
   de "presupuesto" en el barrido del 15-11-2026 (archivo .md más JSON del
   día) son tres, y la tercera NO es el paquete de RN. El registro de RN
   ("RN propone subsidio de US$725 millones para impulsar empleo y apoyo a
   víctimas de abusos", Nuevo Poder) no contiene la palabra "presupuesto" en
   ningún campo. La tercera coincidencia real es "Reportaje | Menos
   presupuesto, mayor precariedad: el costo de vivir en Chile bajo
   condiciones de subsistencia" (Portal Educa, publicado el 14-11-2026, campo
   origen "educacion" del JSON), que no está en la olla ni nombrada en ninguna
   nota de la pieza, y que cumple el primer criterio de entrada del prompt
   ("Afecta directamente la vida de muchas personas (precios, salarios,
   pensiones...)"), con el agravante de que el prompt ordena "Criterio amplio:
   en la duda, entra" y "no haber visto una noticia no se arregla después" ·
   Debe quedar: esa línea nombrando la tercera coincidencia por lo que es (el
   reportaje de Portal Educa sobre el costo de vivir bajo condiciones de
   subsistencia) y no como el paquete de RN, y el reportaje con rastro: o
   entra a "Economía y bolsillo" como una candidata más, marcada "(sin
   confirmar)" por venir de un solo medio, lo que deja la olla en 60 y sigue
   dentro del rango de 35 a 60 que pide el prompt, o se queda fuera pero dicho
   en esa misma línea con la razón. Si entra, la nota que hoy dice "Catorce
   candidatas van marcadas "(sin confirmar)"" pasa a quince y suma el
   reportaje a su lista, para que la corrección no deje otra cifra desalineada.

Observaciones:
- Para la pieza siguiente: las seis fuentes institucionales sin feed no se
  abrieron en esta corrida y la pieza lo declara (Contraloría, Banco Central,
  Cámara de Diputados, Senado, Dirección Meteorológica y Ministerio Público).
  El informe sí navega, así que le quedan pendientes el dólar del Banco
  Central (la candidata del dólar sobre los $1.000 ya se cayó una vez el
  14-11-2026 por falta de segunda fuente), los dos hallazgos de Contraloría
  que entran citados por Veredictum, el estado del Presupuesto 2027 en el
  Senado y las alertas vigentes de la Dirección Meteorológica y de Senapred,
  que hoy entran citadas por la prensa.
- Para la pieza siguiente: catorce candidatas vienen marcadas "(sin
  confirmar)" por venir de un solo medio, y dos cifras quedan en disputa: la
  condena a la extesorera del hospital aparece hoy como $117 millones y el
  14-11-2026 como $120 millones, y el sistema frontal entra con "hasta 100
  milímetros" citando a REDIMIN y ADN Radio, mientras la entrada de ADN Radio
  en el barrido dice "hasta 30 mm en 24 horas". Ninguna de las dos es
  incumplimiento de esta etapa, porque el prompt de la preselección manda NO
  verificar cifras todavía, pero las dos llegan a cámara si el informe no las
  fija con la fuente primaria.
- Para la pieza siguiente: tres candidatas son reacciones al mismo acuerdo con
  los camioneros (Briones en Política, el senador Núñez y el economista Álvaro
  García en Plata pública). El informe debería quedarse con la que aporte el
  hecho nuevo, no con las tres.
- La nota sobre el área Internacional dice "quedaron fuera las tres" cuando
  quedaron fuera siete (cuatro versiones de la declaración peruana sobre el
  papa y tres del video del gobierno argentino). La sustancia es correcta y
  las siete están nombradas, así que no esconde nada: es imprecisión de
  redacción.
- Quedó fuera sin rastro en las notas "Asociación Americana de Juristas alerta
  con profunda preocupación por el estado de derecho en Chile" (elciudadano.com
  y Crónica Digital, corroborada en dos fuentes en el barrido). Se cruza con la
  acusación constitucional contra el ministro de Justicia que la Cámara ve el
  16-11-2026 y con el largo del canal sobre las rebajas de condena. Dejarla
  fuera es decisión editorial defendible por el peso de los dos medios, pero
  conviene que quede con razón escrita, como están los demás descartes.
- La nota que documenta que 44 de las 125 noticias con señal quedaron bajo
  "Sin área", con candidatas fuertes dentro (el gendarme de Antofagasta, la
  querella contra Ulloa, la doctrina Rabat de Interferencia y las alertas de
  Senapred), es el hallazgo más útil del día para arreglar el barrido. No es
  tarea de esta pieza: le sirve a quien toque scripts/barrido.
