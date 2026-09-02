Primero lee del repositorio (rama main, versión más reciente) el informe de hoy: contenido/informes/AAAA-MM-DD.md, con la fecha local de Chile. Ese archivo es el "Resumen diario" al que se refiere el resto de este prompt.

VALIDACIÓN DEL HANDOFF:
- Usa ese archivo como FUENTE DE VERDAD. No reconstruyas el informe por memoria, no uses ediciones de otras fechas y no vuelvas a investigar las noticias del día.
- Si el archivo de hoy falta o está vacío, no inventes contenido: indica que el informe de hoy no está en el repositorio y termina la ejecución sin generar entrega.

Segundo, lee del repositorio contenido/claves/indice.md y contenido/claves/banco-temas.md. Si existen, léelos completos antes de trabajar: son el catálogo de todos los conceptos ya explicados en entregas anteriores y de los temas pendientes. Si no existen, créalos en esta ejecución según el contrato de archivos.

PROPÓSITO DE LA SERIE:
La serie se llama "Claves para entender las noticias". El Resumen diario responde "qué pasó"; esta serie responde "qué tengo que entender para comprender de verdad lo que pasó y para interpretar mejor futuras noticias similares". Cada entrega nace de una noticia del día, pero su cuerpo principal debe ser conocimiento permanente, útil meses o años después. Piensa cada entrega como una pieza de una biblioteca acumulativa.

SELECCIÓN DEL TEMA:
- El caso de entrada debe ser una noticia PRESENTE TEXTUALMENTE en el informe de hoy (contenido/informes/AAAA-MM-DD.md). Nunca uses como gancho una noticia de otra edición, recordada o encontrada por tu cuenta.
- Identifica las noticias del informe cuya comprensión requiera conocer mejor un concepto, institución, mecanismo, antecedente histórico, proceso político, indicador económico o regla jurídica. No fuerces explicaciones cuando una noticia se entiende por sí sola.
- Produce UNA sola profundización por edición: la de mayor valor para un ciudadano general. Elige con esta pregunta guía: "¿Qué necesita entender una persona para interpretar correctamente esta noticia y futuras noticias sobre el mismo tema?".
- Si otras noticias del día también justificaban una profundización, no las desarrolles: regístralas en la sección "Banco de temas" del índice, con el concepto y la fecha, para futuras entregas.
- La serie es DIARIA: todos los días hay entrega. Cuando ninguna noticia del día justifica una profundización genuina, NO fabriques un gancho artificial: toma el mejor tema pendiente del Banco de temas (contenido/claves/banco-temas.md) y desarrolla ese como "Edición de biblioteca", indicándolo en una línea inmediatamente después del Slug. Elige del Banco el tema de mayor valor permanente para entender Chile. Solo si el Banco está vacío Y ninguna noticia da pie -caso excepcional- indica "Sin entrega de Claves para la edición de hoy".
- Consulta el índice antes de elegir: si el concepto ya fue explicado, solo corresponde una nueva entrega cuando puedas profundizar una dimensión distinta, explicar qué cambió o cuando un cambio material haga necesario actualizar la explicación. En ese caso, da por conocido lo anterior y enlázalo brevemente ("como vimos en la entrega sobre X"), sin repetir desde cero.
- Las Claves de "cómo leer un indicador" (Imacec, IPC, desempleo, cualquier dato de publicación periódica) van el día DESPUÉS de que el indicador se publique, nunca el día antes. Con el dato en la mano el ejercicio es real ("el Imacec cayó 1,5%: veamos qué dice y qué no"); sin él es teoría, y encima obliga a poner en pantalla el número equivocado por ser el único que existe (pasó el 01-09: la Clave "cómo leer el Imacec" salió horas antes del Imacec y su única tarjeta fue el índice industrial). Si la noticia del día es "mañana se publica X", el tema va al Banco con nota de fecha, y se desarrolla en la edición siguiente.

TÍTULO:
- Cada entrega lleva un TÍTULO PROPIO, único, descriptivo, atemporal y fácil de recuperar meses o años después. El título nombra el conocimiento permanente que se aprenderá, nunca la coyuntura.
- Correcto: "Estados de excepción en Chile: cómo funcionan, qué derechos pueden restringir y quién los controla"; "Cómo una baja de la TPM se transmite a créditos, dólar e inflación"; "Comisión mixta: cómo se resuelven las diferencias entre Cámara y Senado".
- Incorrecto: "El nuevo proyecto del Gobierno", "Contexto del día", cualquier título que dependa de la noticia que lo originó.
- El título aparece UNA sola vez, al inicio. Junto al título define un slug corto en minúsculas y con guiones (por ejemplo "estados-de-excepcion-chile") para el nombre del archivo.

ESTRUCTURA DE CADA ENTREGA:

1. "La noticia que abrió esta pregunta - [fecha de hoy]": explica muy brevemente qué hecho del Resumen diario motivó la profundización. En una Edición de biblioteca, esta sección se llama "Por qué esta clave - [fecha de hoy]" y explica en pocas líneas por qué el concepto ayuda a entender Chile, mencionando -si existe- la noticia que lo dejó en el Banco, con su fecha original. Todo dato susceptible de cambiar queda explícitamente fechado. Nunca escribas como verdad permanente algo coyuntural: en lugar de "el proyecto todavía no es ley", escribe "al [fecha], el proyecto aún no era ley". La meta es que cada frase siga siendo verdadera si se relee años después.

2. "La pregunta de fondo": formula la pregunta conceptual que la noticia permite explorar y que seguirá siendo útil fuera de esta coyuntura.

3. Explicación profunda y atemporal: la mayor parte del texto, idealmente 80 a 90% del contenido. Explica desde cero, en lenguaje claro pero no infantil: qué es el concepto, cómo funciona, por qué existe, quién decide, qué permite y qué no, qué reglas lo limitan, antecedentes históricos o institucionales relevantes, diferencias con conceptos parecidos, ejemplos, consecuencias prácticas y errores comunes de interpretación. Si el tema es económico, explica mecanismos y relaciones causales; si es jurídico o político, explica instituciones, facultades, límites y contrapesos; si es histórico, explica procesos y causas sin reducirlo a cronología. Escribe en prosa continua apta para ser adaptada después a narración de video; usa listas solo cuando realmente ordenen mejor la información, no como esqueleto permanente del texto.

4. "Aplicado al caso de hoy - [fecha de hoy]": vuelve a la noticia y usa el conocimiento recién explicado para interpretarla correctamente. Esta sección puede ser coyuntural, pero toda afirmación cambiante va explícitamente fechada.

5. "Qué conviene recordar": 3 a 5 ideas permanentes que deberían seguir siendo útiles aunque el lector olvide por completo la noticia de origen.

6. Opcional, solo cuando aporte: "Qué observar en esta discusión - [mes y año]", claramente fechada y distinguida del conocimiento permanente.

HECHOS, INTERPRETACIÓN Y FUENTES:
- Distingue estrictamente hechos y contexto factual de cualquier interpretación propia. Si incluyes análisis, identifícalo explícitamente y susténtalo. No conviertas opiniones en hechos.
- Los datos del caso de entrada provienen exclusivamente del Resumen diario. Puedes usar fuentes actuales y confiables SOLO para verificar o completar el contenido conceptual permanente (leyes, cifras estructurales, historia institucional), nunca para sustituir o modificar lo que el Resumen diario dice sobre la noticia del día.
- Toda cifra, norma legal, fecha histórica o dato verificable relevante lleva su fuente en texto plano: (BCN, Ley 16.282), (Banco Central, jun 2026). Al final de la entrega, bajo "Fuentes:", lista una línea por fuente utilizada.
- Antes de guardar, verifica que el texto no contenga marcadores internos de citas de la herramienta ni referencias técnicas: toda referencia debe estar como (Fuente, fecha) en texto plano.

LIMPIEZA:
- Todo en español: nombres de países, instituciones y cargos incluidos.
- Sin emojis, URLs en el cuerpo, tokens de herramienta, caracteres sueltos ni títulos duplicados.
- Incisos con comas o paréntesis, nunca con guiones ni rayas. Frases del tipo "Esta diferencia es central." o "Esto es clave." no aportan: reemplázalas por el porqué concreto.

PERSISTENCIA:
La ÚNICA persistencia es el repositorio: la entrega, el índice y el banco de
temas se guardan en las rutas exactas que define el contrato de archivos. No
guardes copias en la Biblioteca de ChatGPT. Si no generaste entrega, actualiza
solo el Banco de temas si corresponde. Si por algún motivo técnico no puedes
guardar o pushear, indícalo claramente al final de la ejecución.

CONTROL ANTES DE ENTREGAR:
1. El caso de entrada está textualmente en el informe de hoy (contenido/informes/AAAA-MM-DD.md).
2. Hay una sola profundización, con un solo tema central.
3. El índice fue consultado y no estás re-explicando desde cero un concepto ya cubierto.
4. El título nombra conocimiento permanente, aparece una sola vez y tiene slug.
5. Las secciones fechadas están efectivamente fechadas y la explicación central es atemporal en al menos 80% del texto.
6. Hechos e interpretación están separados; el análisis está identificado.
7. Todas las fuentes están en texto plano y listadas al final; no quedan marcadores internos.
8. La entrega, el índice y el banco de temas quedaron guardados y pusheados en el repositorio según el contrato de archivos, o el fallo quedó reportado.

CONTRATO DE ARCHIVOS: aplica el contrato de prompts/contrato-archivos.md del
mismo repositorio. Léelo COMPLETO en esta misma ejecución: define las rutas
exactas, el formato obligatorio de los guiones y las reglas de commit.
ESTILO TIPOGRÁFICO (obligatorio en todo entregable):
- Nunca uses la raya larga (—) ni la raya media (–). Donde caería una raya,
  usa coma, dos puntos, punto o paréntesis.
- Los rangos se escriben con guion corto (2026-2027, 8-10) o con "a" (8 a 10).
