CONTRATO DE ARCHIVOS — repo entender-chile (todas las rutas desde la raíz)
Este contrato es compartido por las cuatro tareas; cada prompt lo referencia.

Fecha = fecha local de Chile (America/Santiago), formato AAAA-MM-DD.
Slug = minúsculas, guiones, sin tildes ni ñ, solo [a-z0-9-].
Codificación UTF-8, Markdown plano.

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
  "edición AAAA-MM-DD: <pieza>" donde <pieza> es informe, claves,
  guion informe o guion clave.
- Jamás modificar archivos de fechas anteriores; re-ejecuciones del mismo
  día sí sobreescriben los archivos de ese día.
- Si un día no hay Clave (excepcional), simplemente no crear sus archivos.
