VEREDICTO: APROBADA
VUELTA: 1
PIEZA: preseleccion
PROMPT: prompts/seleccion.md
VALIDADO: 2026-10-24T05:26:46Z

Observaciones:
- Para la pieza siguiente: las seis fuentes institucionales sin feed de
  contenido/barrido/fuentes.json (Contraloría General de la República, Banco
  Central de Chile, Cámara de Diputados, Senado, Dirección Meteorológica de
  Chile y Ministerio Público) no se abrieron, y la pieza lo declara en su nota.
  Quedan para el informe, que sí puede entrar, con los cuatro pedidos que la
  propia pieza deja anotados: el acto con que el Ministerio de Justicia
  suspende los decretos de rebaja de penas, que hoy solo consta en
  declaraciones; el comunicado del Banco Central sobre la renovación del swap
  con China, con monto y plazo; los avisos de la Dirección Meteorológica para
  el Biobío y la cordillera de Coquimbo, con su hora; y la causa de la Fiscalía
  Centro Norte por el Fondo E, con su RUC.
- Para la pieza siguiente: las cuatro cifras que la pieza deja marcadas como no
  coincidentes se cierran con fuente primaria y no entre medios. La caída de la
  inmigración irregular en la frontera norte (85% según el ministro de Defensa
  en CNN Chile, 87% en la inspección de Colchane según La Tercera) la fija el
  Servicio Nacional de Migraciones o la Delegación Presidencial de Tarapacá.
  Las expulsiones mezclan dos bases distintas (2.000 en 2026 contra 1.704 bajo
  el actual Gobierno): cada número necesita su período. El dólar aparece con
  tres valores el mismo día (máximos desde abril de 2025 en Diario Financiero,
  $986,9 en Publimicro y "a $5 de los $1.000" en REDIMIN) y el cierre lo da el
  Banco Central. Y las viviendas dañadas por el sistema frontal van de 300 a
  750 entre el 23 y el 24-10-2026: el reporte de Senapred con su hora de corte
  es el único que sirve en cámara.
- Para la pieza siguiente: las trece candidatas marcadas "(sin confirmar)" no
  deben ir a cámara sin fuente primaria, y tres pesan más que el resto porque
  son alarmas o conflictos de interés: el brote de sarna noruega del Hospital
  de Chillán con 13 contagiados (BioBioChile, única fuente de una alarma
  sanitaria), la inmobiliaria ligada al biministro Daniel Mas con proyectos del
  Minvu de Coquimbo y el nombramiento de la seremi de Salud del Maule (las dos
  de ContrapoderChile.cl, un medio que no está entre los de referencia).
- Para la pieza siguiente: la fecha del 28-10-2026 para la definición opositora
  sobre la acusación constitucional contra el ministro Rabat es cálculo propio
  de la pieza sobre un "el próximo miércoles" de La Tercera del 23-10-2026, y
  va dicho así en su propia línea. La verifica la Cámara de Diputados antes de
  que suene en el video.
- Para la pieza siguiente: la nueva candidata de Internacional (línea 193, el
  exjefe de inteligencia de Bolsonaro que Estados Unidos deja residir en
  Florida, CIPER) entró en esta vuelta en reemplazo de la que traía el titular
  de El Mostrador. Su "por qué podría importar" la amarra a la candidata de
  Política de la línea 27 (la coalición anticárteles, con Chile evaluando
  entrar solo como observador): si el informe narra una, conviene que la otra
  no quede suelta. Del barrido de hoy no sale más que el título de esa nota de
  CIPER, así que cualquier detalle adicional hay que buscarlo en la fuente.
- Para la pieza siguiente: si falta material, la pieza deja a la vista
  diecinueve candidatas que quedaron fuera por tamaño, varias del mismo tema
  que domina el día: la defensa del subsecretario Luis Silva a las rebajas de
  condena, los 300 fusiles CZ Scorpion EVO 3 para reemplazar las UZI de
  Carabineros, Fintual anunciando que creará una AFP y Chile líder del ranking
  de pensiones de CFA Institute y Mercer pese a la crisis del Fondo E.
- La nota de las URL (línea 223) sigue equivocando un conteo, y es la nota que
  el informe lee para saber qué se limpió: dice "las dos candidatas de ese
  medio" por Interferencia y hay una sola (línea 9). El otro conteo quedó al
  día solo: ahora las candidatas de CIPER son efectivamente tres (líneas 15,
  126 y 193). La limpieza en sí está verificada y bien hecha, también en la
  candidata nueva: la dirección de la línea 193 es la del JSON del día sin sus
  parámetros utm ni las entidades "&#038;" pegadas al final.
- Qué quedó verificado en esta vuelta: la corrección 1 de la vuelta 1 está
  cumplida por la segunda salida que el propio veredicto dejaba abierta. El
  diff entre b769f69 y 02accfa toca dos lugares y nada más: la candidata de la
  línea 193 y la línea de candidatas fuera por tamaño, de donde esa misma
  noticia salió para no quedar dicha de dos maneras contrarias. El titular
  nuevo no es copia: el del barrido es "Estados Unidos permite que permanezca
  en Florida un exjefe de inteligencia de Bolsonaro ya condenado en Brasil"
  (línea 372 de contenido/barrido/2026-10-24.md y el campo titulo de la misma
  noticia en el JSON) y la pieza escribe "Estados Unidos deja residir en
  Florida a un exjefe de inteligencia de Bolsonaro que ya tiene condena en
  Brasil", con el hecho concreto adelante. La URL calza con la del JSON sin los
  parámetros de seguimiento y el medio es CIPER, el mismo. El reenvío interno
  de su "por qué podría importar" es cierto: la línea 27 trae esa candidata de
  Política y el barrido la respalda (línea 129, "Chile ingresaría como
  observador a coalición anticarteles de Trump: reparos sobre soberanía").
  Lo que la vuelta 1 ya había verificado sigue en pie tras el cambio:
  node scripts/revisar-mecanico.js imprime "sin hallazgos mecánicos"; las 57
  candidatas (recontadas una por una, y la pieza declara 57) vienen en bloques
  de dos líneas, todas con sus dos barras, su URL y su línea "Por qué podría
  importar"; las doce áreas de cobertura obligatoria tienen candidata, con lo
  que "Ninguna" en áreas sin material es consistente, e Internacional conserva
  dos; el tamaño cae en el rango de 35 a 60; las tres secciones finales están
  en su orden; cero rayas largas o medias y cero emojis. El commit 02accfa es
  "edición 2026-10-24: preselección", con su línea "Tarea: suplente (reparto
  permanente, no plan B)" y tocando solo su propio archivo.
