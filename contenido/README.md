# contenido/ - la fuente de verdad del canal

Aquí vive todo el material editorial, un archivo por pieza, nombrado por fecha
local de Chile. Cada mañana copias las salidas de la Biblioteca a su carpeta y
el pipeline (y más adelante la web) leen desde acá. Este directorio SE COMMITEA:
es el archivo histórico real del canal.

    contenido/
      informes/            2026-08-25.md          ← Resumen diario
      claves/              2026-08-25-<slug>.md   ← entrega de Claves (si hubo)
      guiones/
        informe/           2026-08-25.md          ← guion del video diario
        claves/            2026-08-25-<slug>.md   ← guion del video de Claves
      descripciones/       2026-08-25.txt         ← lo que se pega en YouTube
                                                     (descripción + capítulos)

Reglas:
- El nombre SIEMPRE parte con la fecha AAAA-MM-DD (hora de Chile).
- Un archivo por pieza; nunca se sobreescribe una fecha anterior.
- Los videos renderizados NO se commitean (quedan en out/, ignorado por git).
- La futura web estática se genera leyendo informes/ y claves/ tal cual.
