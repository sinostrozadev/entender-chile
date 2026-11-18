VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-18T06:11:51Z

Correcciones:
1. Dónde: líneas 16, 30 y 44, "[Seguridad y Justicia]", "[Vivienda y ciudad]"
   y "[Trabajo y empleo]" · Regla: "LA CATEGORÍA ENTRE CORCHETES ES OBLIGATORIA
   en los bloques de noticia, y es UNA de estas doce, tal cual, en minúscula y
   sin tilde: clima, emergencia, economia, seguridad, congreso, salud,
   educacion, internacional, plata-publica, regiones, dato-curioso, deporte" ·
   Debe quedar: línea 16 `[seguridad]`; línea 30 `[regiones]`, porque la regla
   del 24-09-2026 descarta `emergencia` (no hay víctimas, evacuados, daños ni
   alerta declarada, es un mapa de riesgo y un plan preventivo) y descarta
   `clima`, que es solo el estado del cielo; línea 44 `[congreso]`, que es la
   tramitación en la Comisión de Hacienda y la Sala de la Cámara. Ninguna otra
   palabra entra: son las tres categorías con que el video elige imagen, color
   y pictograma del bloque, y hoy `node scripts/validar-tarjetas.js` cuenta "0
   secciones de noticia" porque ninguna de las tres existe en la lista.
2. Dónde: línea 14, "seguimos la ruta de tres decisiones que ya exigen
   respuesta: quién puede seguir en el Estado, cómo se protege a familias ante
   incendios y qué falta para ampliar la sala cuna" · Regla: punto 2, "APERTURA:
   DESPUÉS de la noticia del día, máximo 15 segundos (25 a 40 palabras): sitúa
   la fecha y adelanta en una frase las OTRAS DOS noticias que vienen, sin
   repetir la ya dada", y "No anuncies cuántas noticias vienen ni que el video
   es corto" · Debe quedar: una apertura que sitúe la fecha y adelante solo los
   campamentos en riesgo de incendio y el avance de Sala Cuna Universal, sin
   volver a nombrar las condenas en el Estado, que ya se dijeron entera en "La
   noticia del día", y sin la cuenta de noticias ("tres decisiones"), entre 25 y
   40 palabras.
3. Dónde: línea 2, la "Descripción sugerida", que nombra solo las tres noticias
   narradas y cierra con "El informe completo está en el enlace de la
   descripción" · Regla: FORMATO DE SALIDA, "Resume la jornada COMPLETA del
   informe (las tres noticias del video y, en una frase, otras dos o tres del
   día), porque la descripción acompaña al informe entero de la web" · Debe
   quedar: una frase más que nombre dos o tres de las otras noticias del
   informe, por ejemplo los dos instrumentos de cooperación que firmaron Kast y
   Xi (línea 81 del informe), la apertura de la postulación al DS1 a las 08:30
   del 18-11-2026 (línea 47) y la rebaja de combustibles desde el 19-11-2026
   (línea 103). Cabe dentro de las dos a cuatro frases del campo, y el espacio
   puede salir de la frase del enlace, que el sistema agrega solo al final de la
   descripción.
4. Dónde: el bloque de la portada, líneas 16 a 28, con 103 palabras narradas
   contando la [TESIS], contra 117 del bloque de los campamentos y 134 del de
   Sala Cuna · Regla: "Reparto orientativo: ... cada noticia 110 a 160 (la de
   portada, la más larga)", y el punto 17d del control interno, "Si saqué alguna
   de la voz, su lugar quedó ocupado con material no numérico del informe y el
   bloque no quedó más corto que los otros dos" · Debe quedar: el bloque de la
   portada sobre las 110 palabras narradas y más largo que los otros dos, con
   material no numérico que el informe ya trae: que la condena puede generar una
   inhabilidad sobreviniente para ejercer el cargo y que no todas las sentencias
   tienen el mismo efecto, y que Contraloría ordenó investigaciones o
   procedimientos para revisar cada situación (línea 19 del informe), y que la
   nómina no equivale a 315 destituciones (línea 21). Sin sumar cifras habladas:
   el bloque ya narra dos y el tope es tres.
5. Dónde: líneas 20 y 24, dos marcas "[DATO comparacion | Contraloría, 17 nov]"
   seguidas dentro del mismo bloque, y la de la línea 20 lleva 166 y 149, dos
   cifras que ningún párrafo narra · Regla: VARIEDAD, "nunca dos tarjetas del
   mismo tipo seguidas dentro del mismo bloque"; "Va justo antes del párrafo que
   menciona esos números"; y punto 7 del control interno, "cada párrafo que se
   sostiene en una cifra trae su [DATO] con la cifra principal" · Debe quedar:
   en la línea 20, una tarjeta de otro tipo con la cifra que sí narra el párrafo
   de la línea 22 y que además es la del título, así: "[DATO cifra | Contraloría,
   17 nov] personas con condenas vigentes en funciones públicas: 315 personas ·
   317 condenas". Y la etiqueta de la tarjeta que queda en la línea 24 tiene que
   decir de quiénes son esas condenas, "condenas por delitos en funciones
   públicas: 73 condenas ; condenas por simples delitos: 244 condenas", porque
   "condenas por delitos" a secas no se entiende con el video en silencio
   (ETIQUETA CON CONTEXTO, 3 a 8 palabras). El reparto entre administración
   central y municipios queda fuera de pantalla; si lo quieres narrar, nómbralo
   sin sus cifras, para no pasar el tope de tres cifras habladas del bloque.
6. Dónde: línea 42, "También habrá que publicar rutas de evacuación y
   responsables antes de cada alerta" · Regla: FIDELIDAD TOTAL AL INFORME, "NO
   agregues noticias, datos, opiniones ni predicciones" · Debe quedar: fuera. El
   informe no pide publicar rutas ni responsables en su bloque de campamentos
   (líneas 35 a 45): lo que dice es que falta el calendario por asentamiento, el
   presupuesto disponible y cuántas familias recibirán solución antes del
   período de mayor peligro, y que el avance medible será la ejecución local del
   plan y de los cortafuegos anunciados (línea 45). La frase sobre publicar
   responsables existe en el informe, pero en la noticia de Kast y Xi (línea
   89), que hoy no se narra. Si al quitarla el bloque baja de 110 palabras,
   ocupa su lugar con lo que el informe sí trae y no es cifra: los cortafuegos
   anunciados (línea 45) y que en esos asentamientos el acceso de carros, el
   agua y las vías de evacuación suelen ser limitados (línea 39).
7. Dónde: línea 60, el cierre completo, que dice el enlace, la ropa de hoy y la
   despedida, sin ninguna frase de síntesis · Regla: punto 8, "CIERRE: corto, 40
   a 60 palabras. Una frase de síntesis que conecte las tres noticias por hechos
   concretos, sin decirle a la audiencia qué debe pensar" · Debe quedar: UNA
   frase de síntesis, antes de la frase del enlace, que nombre los tres hechos
   concretos (las condenas vigentes de quienes siguen en el Estado, los
   campamentos en riesgo alto o muy alto de incendio y el paso de Sala Cuna
   Universal a la Sala de la Cámara), sin abstracciones del tipo "decisiones de
   fondo" ni "la jornada deja". El cierre mide 45 palabras y el techo es 60, así
   que la frase cabe sin recortar nada.
8. Dónde: líneas 8 y 10, "La noticia del día", 40 palabras narradas (7 de la
   [TESIS] más 33 del párrafo) · Regla: punto 1, "Dos frases, 25 a 35 palabras
   en total, con su [TESIS] o su [DATO] principal como tarjeta (una sola marca)
   y su [FUENTE]" · Debe quedar: 35 palabras o menos contando la [TESIS], que sí
   se narra, que es como las contó el veredicto del 17-11-2026 (esa pieza quedó
   justo en 35). Una forma que cumple, contada: dejar la segunda frase en "Cada
   institución deberá revisar si corresponde el término del vínculo", lo que
   deja la sección en 34 palabras y conserva lo que dice el informe en su línea
   21.

Observaciones:
- Para la pieza siguiente: en la cadena diaria no queda pieza de GPT después de
  esta, así que estas observaciones son para la corrección de hoy y para la
  próxima edición.
- Para la pieza siguiente: las ocho correcciones son de forma y de reparto, no
  de hechos. Fuera de la línea 42, cada cifra, cada fuente y cada afirmación de
  la pieza calza con su línea del informe, así que la corrección no debería
  tocar la selección ni las cifras: con cambiar las tres categorías, la
  apertura, una tarjeta, el largo de dos secciones y el cierre, la pieza queda.
- El tope de tres cifras habladas por bloque se cumple en los tres: el de las
  condenas narra dos (trescientas quince y trescientas diecisiete), el de los
  campamentos tres (siete de cada diez, ochocientos diecisiete y sesenta y
  cuatro) y el de Sala Cuna tres (cero coma tres por ciento, un millón de pesos
  y tres mil pesos). "Dos aportes al seguro de cesantía" (línea 54) no se contó
  como cuarta cifra del bloque, porque es una cuenta de instrumentos y no una
  magnitud, y ninguna tarjeta podría llevarla. Queda anotado para que el
  criterio sea el mismo mañana, y porque la palabra "dos" ahí no hace falta.
- La [TESIS] de "La noticia del día" mide 51 caracteres, bajo los 54 del reparto
  del punto 3b, y no bloquea: el tope de 66 se cumple y la suma de las cuatro
  tesis queda en 313 caracteres, dentro de 292 a 380, lo que pone el Short en
  37,5 segundos con la ley del punto 3b. Pero sobran quince caracteres, y con
  ellos cabe la palabra que falta: "Personas con condenas vigentes seguían en
  funciones públicas" mide 60 caracteres contados y dice qué era lo irregular.
- Línea 26, "Carabineros concentró la mayor cantidad institucional de casos": el
  informe da 84 casos en Carabineros, 22 en el Ejército y ocho en la Armada
  (línea 17) y no afirma que sea la mayor entre todos los organismos. No
  bloquea, porque se sigue de las cifras que el informe sí trae, pero "la mayor
  cantidad entre las instituciones informadas" sería exacto.
- Línea 34, etiqueta "campamentos monitoreados": dos palabras, bajo las 3 a 8
  que pide ETIQUETA CON CONTEXTO. No bloquea porque la segunda etiqueta de la
  misma tarjeta ("campamentos en riesgo alto o muy alto") pone la situación en
  pantalla. "Campamentos monitoreados por riesgo de incendio" son seis palabras
  y se entiende sola.
- El título dice "315" y "La noticia del día" no tiene tarjeta de cifra, solo su
  [TESIS], así que la regla "LA CIFRA GRANDE ES LA DEL TÍTULO" no tiene dónde
  cumplirse. No es incumplimiento: el prompt admite una sola marca en esa
  sección y acepta que sea la [TESIS]. Con la corrección 5, el 315 del título
  aparece igual en pantalla, en la primera tarjeta del bloque siguiente.
- Falta "Carátula sugerida:" y falta "Clima de carátula:", y
  `scripts/validar-tarjetas.js` lo avisa. No es incumplimiento, por séptimo día
  seguido: el propio prompt cierra ese bloque con "Desde el 04-11-2026 no se
  pide carátula del día", existe `contenido/estado/sin-video-informe.txt` y
  `estado.yml` salta el pedido. La contradicción del FORMATO DE SALIDA, que
  mantiene las tres carátulas como líneas tercera a quinta, sigue en pie y es
  trabajo de la sesión de día, no de la pieza.
- Verificado y sin hallazgos en esta corrida: `node scripts/revisar-mecanico.js`
  imprime "sin hallazgos mecánicos"; cero rayas largas y cero rayas medias por
  búsqueda literal; 474 palabras narradas, dentro de 420 a 600, repartidas en 40
  de "La noticia del día", 35 de Apertura, 103, 117 y 134 de los tres bloques y
  45 del cierre; exactamente tres bloques de noticia y la portada primero, con
  la selección que manda el prompt, porque el informe trae cuatro noticias [A]
  (líneas 15, 35, 61 y 81) y se narran la portada y las dos [A] siguientes en el
  orden del informe, con la de Kast y Xi quedando en la web; el orden del punto
  1b correcto, con los campamentos segundos, que es riesgo vigente, y Sala Cuna
  tercera, que todavía no es ley; las tres tesis de bloque en 93, 87 y 82
  caracteres, dentro de 80 a 105, y las cuatro con 18 palabras o menos (7, 13,
  15 y 14); línea en blanco después de cada [TESIS]; cada bloque de noticia con
  su [FUENTE] y Apertura y Cierre sin ella; un [ESQUEMA] de cuatro elementos
  para el bloque de proceso; el árbol de tipos bien aplicado en las cinco marcas
  [DATO], con las tres comparacion entre valores de la misma unidad y rótulo
  propio y las dos cifra con un solo valor; cada valor con su unidad pegada; no
  más de dos [DATO cifra] seguidas en la edición; sin ningún superlativo de
  serie histórica que el informe no traiga escrito; sin conectores de ensayo
  escrito ni la construcción "no solo, sino"; sin paréntesis, URLs, emojis ni
  siglas sueltas en pantalla, con Conaf y Senapred en la narración y por el
  mismo criterio de uso corriente con que pasaron el 16-11-2026 y el 08-11-2026;
  ningún tema narrado dos veces y ninguna frase que narre ausencia de noticia;
  el tagline "El resumen sin gritos." como última frase hablada y la línea "Para
  salir hoy" del informe integrada en el cierre; y las doce líneas de "Fuentes:"
  corresponden a fuentes del informe, sin ninguna ruta interna del sistema.
