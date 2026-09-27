VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: idea
SLUG: acuerdo-internacional-sin-tratado
PROMPT: prompts/clave-idea.md
VALIDADO: 2026-09-27T02:32:07Z

Correcciones:
1. Dónde: en "El caso de entrada", "El 23-09 la Cámara preparó una
   interpelación al canciller; el 24-09 Bachelet y Boric pidieron reconsiderar
   la permanencia" y "El 25-09 el ministro Martín Arrau dijo"; y en "De dónde
   viene", "el control de la Cámara el 23-09, las objeciones y gestiones ante
   Senado y Contraloría el 24-09, y la precisión gubernamental del 25-09" ·
   Regla: prompts/clave-idea.md, sección "Reglas": "Sin rayas largas; fechas
   DD-MM-AAAA en prosa" (regla dura 35) · Debe quedar: las seis fechas con año,
   23-09-2026, 24-09-2026 y 25-09-2026 en cada uno de los dos bloques. Y las
   dos referencias a informes que arrastran un día suelto sin mes ni año,
   "(informes del 24 y 25-09-2026)" y "(informes del 24 al 26-09-2026)",
   quedan "(informes del 24-09-2026 y del 25-09-2026)" y "(informes del
   24-09-2026 al 26-09-2026)". Las otras once fechas del archivo ya están
   completas y no se tocan.
2. Dónde: en "Duración y fuentes", "La entrega necesitará Constitución y
   Biblioteca del Congreso Nacional para tratados; Cancillería para el
   instrumento de adhesión; Cámara para la interpelación; Senado para la sesión
   especial; y Contraloría para la presentación" · Regla:
   prompts/clave-idea.md, bloque "Duración y fuentes": "las tres a cinco
   fuentes primarias que la entrega va a necesitar (organismo, ley, informe),
   nombradas" · Debe quedar: una cuenta que no admita dos lecturas. Hoy el
   primer grupo nombra dos fuentes de distinta clase (la Constitución es ley,
   la Biblioteca del Congreso Nacional es organismo), así que la lista se lee
   como cinco o como seis, y seis pasa el tope. Basta dejar el primer grupo
   como una sola fuente, por ejemplo "la Constitución, en la edición de la
   Biblioteca del Congreso Nacional, para tratados", y que las otras cuatro
   queden igual: cinco fuentes contadas sin ambigüedad.

Observaciones:
Ninguna de estas pide cambios en esta vuelta. Por la regla de convergencia
(prompts/validador.md, punto 2) lo único que corresponde corregir ahora son las
dos correcciones de arriba; las tres primeras observaciones son para la entrega,
si Santiago aprueba la idea.

- Para la pieza siguiente: cuatro de los seis bloques de "Estructura tentativa"
  son coyunturales (gancho de la semana, hitos, qué está en juego ahora, qué
  mirar después) y solo el 2 y el 4 son conocimiento permanente. El punto 5 del
  control de prompts/claves.md exige que la explicación central sea atemporal en
  al menos 80% del texto. La idea cabe en la estructura que le manda su propio
  prompt, así que no hay incumplimiento acá, pero la entrega tendrá que cargar
  el peso en el bloque 4 (tratado frente a coordinación, de dónde viene la
  distinción en la Constitución, qué controles quedan) para no quedar bajo el
  piso.
- Para la pieza siguiente: contenido/claves/indice.md ya trae dos entregas que
  esta Clave roza, interpelacion-ministerial-chile del 09-09-2026 y
  estrecho-magallanes-soberania-navegacion del 03-09-2026. El concepto de esta
  Clave es otro y no se repite, por eso no es hallazgo, pero prompts/claves.md
  pide dar por conocido lo anterior y enlazarlo brevemente ("como vimos en la
  entrega sobre X") en vez de volver a explicar la interpelación desde cero en
  el bloque 3.
- Para la pieza siguiente: el archivo hace bien en decir en "De dónde viene"
  que los informes no identifican el acto fundador del Escudo ni reproducen el
  instrumento de adhesión, y en dejarlo como pendiente de verificar. Eso queda
  como la deuda concreta de la entrega: sin esos dos documentos no se pueden
  atribuir obligaciones específicas, y el bloque 2 de la estructura ("verificar
  qué acto creó el mecanismo") sigue abierto.
- Las comillas angulares de "«no es un tratado»" y "«Chile se sumó»" no las
  prohíbe ningún prompt, pero el resto del repo escribe las citas con comillas
  dobles rectas. Unificarlas evitaría que el guion las arrastre a pantalla.
- "Lo que NO va" cumple con dos de sus tres ítems (operaciones militares y las
  25 bandas, ambos con su porqué). El del medio, "Tampoco confundirá ausencia
  de tratado con ausencia de compromisos", no es algo que quede fuera: es la
  promesa del video dicha al revés, y no trae porqué. El bloque igual cumple,
  porque el prompt pide dos o tres y hay dos válidos.
- En el bloque 4 de la estructura, el ejemplo ("alguien lee «Chile se sumó» y
  pregunta qué se firmó, qué hará la policía y qué autorización exige cada
  acción") es una pregunta de lector común, pero no muestra al ciudadano
  ocupado que define el prompt, alguien que trabaja y quiere entender en diez
  minutos. Cumple, y ganaría con esa caracterización.

Verificado y conforme:
- Encabezados: están los ocho exactos del prompt y en su orden ("La promesa",
  "Las preguntas que responde", "El caso de entrada", "De dónde viene",
  "Estructura tentativa", "Lo que NO va", "Carátulas", "Duración y fuentes"),
  más el título en la forma "# Idea de Clave: ...", una sola vez.
- SLUG, CONCEPTO y NOTICIA DE ORIGEN: el slug es el del flujo; el CONCEPTO es
  idéntico carácter por carácter al de tema.md (comparadas las dos líneas); la
  noticia va en la forma "<titular> (<ORIGEN>)" con el ORIGEN literal de
  tema.md, "tema de la semana 2026-W39".
- Fidelidad contra la entrada, hecho por hecho, contra los informes de los
  cuatro días de la línea DIAS: la formalización del 22-09-2026 con "aquí no
  hay un tratado" y el descarte de operaciones militares está en
  contenido/informes/2026-09-23.md, líneas 32 y 34; los 15 países y las 25
  organizaciones, en la línea 32 del mismo; Chile observador y Kast
  describiéndolo el 14-09-2026, en la línea 36; la interpelación al canciller
  Francisco Pérez Mackenna, en contenido/informes/2026-09-24.md, línea 16;
  Bachelet y Boric, la sesión especial del Senado con tres ministros citados y
  la bancada DC ante Contraloría, en contenido/informes/2026-09-25.md, líneas
  29 y 37; Arrau y el chequeo que encontró solo dos de las 25 organizaciones
  presentes en Chile, en contenido/informes/2026-09-26.md, líneas 53 y 55.
  Ninguna cifra cambia de valor y no hay ninguna que los informes no traigan.
- El desfase entre fecha del hecho y fecha del informe está bien resuelto en
  las seis atribuciones del archivo: cada hecho se atribuye al informe del día
  siguiente, que es donde efectivamente está.
- "Las preguntas que responde": cinco, dentro del rango de tres a cinco, cada
  una en su propia línea y en el orden de los bloques.
- "El caso de entrada": tres frases de hechos fechados más la frase que dice
  que el asunto volvió cuatro días y por qué sin el concepto el debate queda
  reducido a una etiqueta. Es lo que pide el prompt. El bloque no lleva
  saltos de línea, pero el prompt solo exige línea por ítem donde lo dice
  expresamente ("cada una de una línea", "uno por línea"), y acá no lo dice.
- "De dónde viene": cinco frases, dentro del rango de tres a cinco, con el
  primer antecedente que el material sostiene y con la falta declarada en una
  línea en vez de rellenada, que es exactamente la salida que el prompt
  autoriza.
- "Estructura tentativa": seis bloques, uno por línea, en el orden que fija el
  prompt, y las únicas cifras que aparecen (cuatro días, 15 países, 25
  organizaciones) están en los informes.
- Carátulas: tres, cada una en dos líneas separadas por " / ", con tres, tres,
  tres, tres, dos y dos palabras por línea, todas bajo el tope de cuatro.
  Contadas una por una. Las tres son preguntas o la cita de la posición del
  Gobierno, ninguna adelanta la conclusión, y la tercera lleva su referencia
  (informe del 23-09-2026), que es lo que pide el rótulo "cifra con
  referencia".
- Duración: 10 a 12 minutos, dentro del rango de 8 a 12, y con el porqué.
- Extensión: 543 palabras en el cuerpo y 622 con título y encabezados, dentro
  del rango de 400 a 700.
- Sin clickbait, sin morbo y sin sospecha sin fallo: el archivo descarta
  expresamente afirmar que la adhesión autoriza operaciones militares y separa
  compromisos documentados de afirmaciones de las partes.
- Rayas: buscadas la raya larga y la raya media en el archivo completo, no hay
  ninguna. Tampoco hay fechas en formato AAAA-MM-DD en la prosa.
- El concepto no tiene Clave en contenido/claves/indice.md: leídas sus 24
  líneas, ninguna cubre qué obliga un acuerdo internacional que no es tratado,
  así que la exigencia de declarar una dimensión nueva no se activa.
- No existe contenido/claves/flujo/acuerdo-internacional-sin-tratado/
  aprobacion.md: listada la carpeta, solo tiene idea.md y tema.md, de modo que
  no hay nota CAMBIAR: de Santiago que atender. tema.md tampoco trae línea
  DOSSIER:, buscada explícitamente, así que el material era el de los cuatro
  informes y contenido/claves/semana/2026-W39-candidatos.md.
- Contrato de archivos: la pieza está en la ruta que nombra el estado,
  contenido/claves/flujo/acuerdo-internacional-sin-tratado/idea.md, y el commit
  a9048f7 usa el encabezado que manda su prompt ("clave
  acuerdo-internacional-sin-tratado: idea propuesta") con el cuerpo "Tarea:
  despachador", y toca un solo archivo, el suyo.
