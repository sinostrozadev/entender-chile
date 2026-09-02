CONTRATO DE ARCHIVOS - repo entender-chile (todas las rutas desde la raíz)
Este contrato es compartido por las cuatro tareas; cada prompt lo referencia.

Fecha = fecha local de Chile (America/Santiago), formato AAAA-MM-DD.
Slug = minúsculas, guiones, sin tildes ni ñ, solo [a-z0-9-].
Codificación UTF-8, Markdown plano.

0. Preselección del día (la olla):
   contenido/preseleccion/AAAA-MM-DD.md

1. Informe diario:
   contenido/informes/AAAA-MM-DD.md

2. Entrega de Claves:
   contenido/claves/AAAA-MM-DD-<slug>.md
   Además, AGREGAR (nunca reescribir) una línea al final de:
   contenido/claves/indice.md        → "AAAA-MM-DD | <slug> | Título completo"
   contenido/claves/banco-temas.md   → "- concepto | noticia de origen | fecha"
                                        (solo si detectó temas nuevos)

3. Guion del video del informe (NOMBRE EXACTO, dia.js lo busca por fecha):
   contenido/guiones/informe/AAAA-MM-DD.md

4. Guion del video de la Clave:
   contenido/guiones/claves/AAAA-MM-DD-<slug>.md
   (mismo slug que la entrega)

FORMATO OBLIGATORIO de los dos guiones (el parser depende de esto):
   Título sugerido: ...
   Descripción sugerida: ...
   Guion:
   (texto con las marcas ## / [TESIS] / [DATO ...] / [HECHO] /
    [INTERPRETACIÓN] / [CITA ...] / [ESQUEMA ...], cada marca en su
    propia línea, valores de [DATO] en numerales)
   Fuentes:
   (una línea por fuente)

REGLAS DE COMMIT:
- Cada tarea commitea y pushea SOLO sus propios archivos. Mensaje:
  "edición AAAA-MM-DD: <pieza>" donde <pieza> es preselección, informe,
  claves, guion informe o guion clave.
- Jamás modificar archivos de fechas anteriores; re-ejecuciones del mismo
  día sí sobreescriben los archivos de ese día.
- Si un día no hay Clave (excepcional), simplemente no crear sus archivos.

ESCRITURA VERIFICADA (obligatorio en toda tarea que escriba en el repo):
- Escribe el archivo. Si la escritura falla, NO des por perdida la ejecución:
  consulta de inmediato si el archivo quedó creado igual, porque un error de
  respuesta no significa que la escritura no ocurrió.
- Si no existe y el error parece transitorio, reintenta hasta 3 veces.
- Después de escribir, vuelve a LEER el archivo desde main y verifica dos
  cosas: que la ruta es la que manda este contrato y que el contenido está
  completo. Una escritura no está hecha hasta que se leyó de vuelta.
- Si aparece un conflicto porque el archivo fue creado entre intentos, lee su
  SHA y actualízalo, pero SOLO si corresponde a la fecha de hoy. Nunca pises
  un archivo de otra fecha.
- Los errores permanentes (permisos, autorización, ruta inválida) NO entran en
  bucle: se reportan al final de la ejecución, nombrando el archivo que no se
  pudo escribir y el error exacto que devolvió GitHub.
- Al terminar, di explícitamente qué archivos quedaron escritos y verificados.
  Si alguno falta, dilo en la primera línea de tu respuesta, no al final.

VERIFICAR ANTES DE AFIRMAR:
Una ausencia también es un hecho y debe verificarse. Cuando vayas a afirmar
algo sobre un archivo del repo (que falta, que no contiene tal línea, que
está vacío, que no se pudo leer), ábrelo y compruébalo en esa misma ejecución
antes de decirlo: una búsqueda explícita o la lectura de la sección completa.
Nunca deduzcas el estado de un archivo a partir de lo que recuerdes, de una
lectura anterior o de lo que parezca razonable. Si la lectura quedó truncada,
NO puedes inferir ausencia: vuelve a leer desde el final.
Una búsqueda que no encuentra no es una ausencia: es una búsqueda que no
encontró. Antes de declarar que un archivo no existe, lista su carpeta y cita
en tu respuesta lo que viste.

Esto vale sobre todo cuando la conclusión te lleva a OMITIR algo: si crees que
un elemento obligatorio no está en la fuente, vuelve a leer la fuente antes de
dejarlo fuera. Omitir por una premisa falsa es peor que preguntar, porque no
deja rastro y se descubre días después.

Si después de comprobarlo el dato efectivamente no está, entonces sí: no lo
inventes, sigue adelante y dilo, nombrando el archivo y la línea que buscaste.
