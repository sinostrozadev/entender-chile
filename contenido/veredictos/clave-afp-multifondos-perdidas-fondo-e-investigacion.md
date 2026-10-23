VEREDICTO: APROBADA
VUELTA: 1
PIEZA: investigacion
SLUG: afp-multifondos-perdidas-fondo-e
PROMPT: prompts/investigacion-clave.md
VALIDADO: 2026-10-23T19:22:18Z

Observaciones:
- Para la pieza siguiente: el fallo contra AFP Uno del 05-10-2026 NO se puede
  usar. La sección 3 de la pauta lo trae como confirmado, pero las líneas 66 y
  98 del dossier declaran que no se recuperó fuente verificable ni sentencia,
  con los buscadores que se revisaron. La entrega no puede citarlo como
  precedente ni decir que existe un derecho general a reintegro. De los
  recursos del 19-10-2026 sí hay fuente: Radio Universidad de Chile,
  19-10-2026, línea 66, y sin fallo.
- Para la pieza siguiente: cuántas personas hay en los fondos D y E no tiene
  cifra oficial. La línea 101 declara que la Ficha N° 167 no la trae y da como
  referencia secundaria El País, 20-10-2026, con más de 770.000 afiliados en E
  y 1,6 millones en D. Si la entrega los usa, van atribuidos a ese medio y a
  esa fecha, nunca como dato de la Superintendencia.
- Para la pieza siguiente: cuándo el Fondo E pasó a perder no está en el
  dossier (línea 100: no se obtuvo la serie mensual). La entrega no puede
  decir en qué mes de 2026 el acumulado se dio vuelta. Lo que sí tiene es el
  corte de doce meses, 17,3% real negativo al 30-09-2026 (línea 90).
- Para la pieza siguiente: la cifra del encaje atribuida a Mario Marcel no
  existe como declaración verificada (línea 107), y la de Franco Parisi solo
  vale como lo que él dijo, con T13, 22-10-2026 (línea 69), contra la línea
  106, que declara que ningún acto oficial confirma monto, fecha ni
  promotores. La respuesta a la pregunta 12, en la línea 122, dice que las
  acusaciones políticas quedan fuera: hoy la línea 69 las recoge como "se
  dice", y la sección 8 de la pauta deja esa pregunta como la primera que se
  recorta si el tiempo aprieta.
- Para la pieza siguiente: el ejemplo aritmético sigue siendo el único
  permitido ($1.000.000 en Fondo E, variación real de 10,39% negativo,
  resultado $896.100, líneas 14 y 112) y no se puede convertir en pensión: la
  línea 104 declara que no se obtuvo simulación oficial que traduzca una caída
  de saldo en variación de la mensualidad.
- Para la pieza siguiente: el plazo de 30 días corridos del recurso de
  protección viene del Auto Acordado Acta N° 19-2023 y de una sentencia del
  28-05-2021 (línea 40), y la misma línea dice que computarlo en un caso
  individual requiere revisión jurídica. Se cuenta así, no como fecha de
  vencimiento personal.
- Para la pieza siguiente: tres fechas de la pauta quedaron corregidas contra
  la publicación y mandan las del dossier. El costo sobre US$7.000 millones es
  de Resumen.cl, 18-10-2026, y no del 15-10-2026; la estimación sobre
  US$18.000 millones es de Manuel Riesco y CENDA, texto del 06-10-2026, que El
  Clarín reconsigna el 14-10-2026 y no el 13-10-2026; el reportaje de
  BioBioChile sobre los swaps es del 21-10-2026, la fecha que trae su propio
  enlace, y no del 22-10-2026 que anotó la pauta. Los US$7.700 millones son de
  El País, 20-10-2026, reproducidos el 22-10-2026 por prensa internacional.
- Las líneas 101 y 102 ponen material confirmado dentro de "Lo que NO se pudo
  averiguar": los afiliados según El País y las resoluciones exentas N° 368 del
  04-03-2026, N° 549 del 09-04-2026 y N° 1195 del 01-09-2026. No bloquea,
  porque las dos secciones que el prompt manda separar, lo confirmado y lo que
  se dice, siguen separadas y nada sin confirmar se presenta como hecho; cada
  ítem acompaña el dato con lo que no se consiguió. Si una vuelta futura las
  toca, el dato confirmado va en su sección y la ausencia queda acá.
- Las líneas 69 y 70 califican lo citado como "acusación política" y
  "declaración política difundida por prensa". Va por lo mismo que la nota del
  veredicto anterior sobre los encabezados de las secciones 2 y 4: no bloquea,
  porque las dos dicen el alcance probatorio de lo que citan y ninguna
  atribuye responsabilidad a nadie, que es lo que prohíbe la sección 6 de la
  pauta.
- Siguen las fechas sin año en la prosa ("05-10", "12-10", "19-10", "20-10",
  "22-10", en las líneas 40, 64, 65 y 66) y el "hoy" del encabezado de la
  sección 5, contra la regla dura 35. Se repite lo del veredicto anterior y lo
  del veredicto de la investigación de la Clave de licencias médicas del
  06-10-2026: prompts/investigacion-clave.md sigue siendo el único prompt del
  flujo sin la línea de control que prompts/clave-idea.md trae en su cierre, y
  cerrar ese hueco es tarea de la sesión de día, no de la pieza.

Verificado y conforme:
- Las once correcciones de la vuelta 1 están resueltas, una por una, revisadas
  contra el diff del commit d2d10da, que toca solo esta pieza y cambia 28
  líneas:
  1. Las dos afirmaciones sin fuente se borraron y quedó solo la constancia de
     lo no encontrado (líneas 40 y 60), que es lo que la corrección permitía.
  2. Las tres cifras de pérdida quedan atribuidas una por una, con autor,
     fecha y enlace (línea 64), y el eco de la línea 99 agrega qué se revisó.
  3. Los recursos del 19-10-2026 traen medio, fecha y enlace (línea 66) y el
     caso AFP Uno pasó a declararse no verificado en vez de afirmarse.
  4. El ítem de "Cifras" sobre rentabilidad mínima y encaje trae ahora fecha
     del texto y los dos enlaces (línea 93).
  5. El Régimen de Inversión aparece con las resoluciones que lo modificaron
     en 2026, quién las dictó y sus fechas, y con por qué no hay comparación
     artículo por artículo (línea 102).
  6. La serie mensual del Fondo E queda declarada como no conseguida, con los
     dos lugares donde se buscó (línea 100).
  7. Los afiliados en D y E y la composición del Fondo E quedan declarados con
     qué se revisó, y con la referencia secundaria marcada como tal (línea 101).
  8. El plazo del recurso de protección está con su norma, su fecha y su
     enlace (línea 40).
  9. "Advertidas cuatro veces" y "siguiendo a la manada" entran como "se dice"
     con medio, fecha y enlace (línea 68) y en la cronología (líneas 83 y 85);
     las fechas que no calzaban con la pauta quedaron verificadas contra la
     publicación: CIPER tiene dos artículos distintos, el del 16-10-2026 y el
     del 22-10-2026 que nombra la pauta, El Clarín quedó en 14-10-2026 con la
     corrección dicha en la línea 64, y BioBioChile queda en 21-10-2026, la
     fecha que trae el enlace del propio reportaje.
  10. La renta temporal con renta vitalicia diferida está nombrada y explicada
      con qué saldo se financia cada etapa, con fuente, fecha y enlace
      (línea 59).
  11. La declaración del ministro del Trabajo está con medio, fecha y enlace
      (línea 70), la de Parisi igual (línea 69) y la de Marcel queda declarada
      como no recuperada, con dónde se buscó (línea 107).
- Convergencia: no hay hallazgo nuevo sobre partes que la vuelta 1 no marcó.
  Las líneas nuevas que la corrección introdujo (40, 59, 60, 64, 66, 68, 69,
  70, 83, 85, 93, 99 a 102, 107 y las fuentes 17 a 21) se revisaron una por
  una y todas traen institución o medio, fecha y enlace, salvo las que solo
  declaran una ausencia, que no lo necesitan.
- Mecánica: node scripts/revisar-mecanico.js sobre la pieza imprime "sin
  hallazgos mecánicos". Buscadas rayas largas y medias en el archivo completo:
  cero coincidencias, regla 34 cumplida. Buscados "unos", "cerca de",
  "varios", "aproximadamente" y "alrededor de": cero coincidencias.
- Formato: las siete secciones del prompt están y en su orden (líneas 7, 62,
  73, 88, 96, 109 y 125), con el título, el SLUG y la línea PAUTA arriba. La
  cronología va en orden de fecha con los dos hitos agregados en su lugar.
  "Lo que NO se pudo averiguar" tiene diez ítems y ninguno dice "nada":
  buscada la palabra en el archivo, cero coincidencias.
- Las trece preguntas de la sección 4 de la pauta están las trece, una por
  línea, en "Las preguntas de la pauta" (líneas 111 a 123), y el material que
  faltaba detrás de las preguntas 9, 12 y 13 llegó en esta vuelta o quedó
  declarado como no conseguido, con dónde se buscó, que es lo que el prompt
  permite para un encargo de la sección 7.
- Nada de la sección 6 de la pauta entró al dossier: buscados "superintendente",
  "retiro de fondos", "ahorro para vivienda" y "ciclo de vida", cero
  coincidencias; no se afirma que las AFP perdieron la plata por su culpa
  (líneas 26 y 71), no se nombra culpables (la línea 71 dice que no hay
  resolución que atribuya culpa a nadie), no se recomienda cambiarse ni
  quedarse (línea 41), no se da una sola cifra de pérdida como buena
  (línea 64) y los fondos generacionales entran solo como qué cambia el
  01-04-2027 (líneas 35 y 117).
- Aritmética, que se comprueba sin navegar: $1.000.000 con 10,39% negativo da
  los $896.100 de las líneas 14 y 112, con diferencia de $103.900; los
  patrimonios de las líneas 90 a 92 dan 8,8% para el Fondo E y 15,3% para el D
  sobre el total; el ponderado 20/60/20 de 2,10%, 1,22% y 1,06% da el 1,36% de
  la línea 94; y las rentabilidades del E y del D calzan con la sección 3 de la
  pauta (4,92% y 10,39% negativos; 4,19% y 6,38%).
- Contrato de archivos: la pieza está en la ruta que nombra el estado,
  contenido/claves/flujo/afp-multifondos-perdidas-fondo-e/investigacion.md, y
  el commit d2d10da toca solo ese archivo, con el encabezado "clave
  afp-multifondos-perdidas-fondo-e: investigación" y el cuerpo "Tarea:
  despachador".
- Lo que NO se pudo comprobar de esta pieza, dicho en vez de darlo por bueno:
  el validador no navega, así que se verificó coherencia interna, cobertura de
  la pauta y calce de cada cita con lo que afirma; NO que las páginas existan
  ni que digan lo que se les atribuye. En particular no se abrieron las
  fuentes nuevas de esta vuelta (Radio Universidad de Chile, T13, El
  Desconcierto, Resumen.cl, El Clarín, El País, La Nación de Paraguay, los dos
  enlaces del Poder Judicial y las resoluciones de la Superintendencia).
