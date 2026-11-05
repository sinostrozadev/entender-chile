# contenido/ - la fuente de verdad del canal

Aquí vive todo el material editorial, un archivo por pieza, nombrado por fecha
local de Chile. Lo escriben de madrugada las tareas de ChatGPT, las rutinas de
Claude en la nube y el workflow de GitHub; el pipeline (Short, podcast y
largos) y la web leen desde acá. Este directorio SE COMMITEA: es el archivo histórico real del canal.

    contenido/
      barrido/             2026-08-29.json        ← todo lo recogido (850 únicas)
                           2026-08-29.md          ← solo lo con señal: lo lee la olla
                           fuentes.json           ← las fuentes que se consultan
                           despertador.txt        ← lo toca la rutina de la nube;
                                                     su push dispara el barrido
      preseleccion/        2026-08-29.md          ← la olla: ~40 candidatas con
                                                     "por qué podría importar"
      informes/            2026-08-29.md          ← la edición completa (web)
      claves/              2026-08-29-<slug>.md   ← entrega de Claves (si hubo)
      guiones/
        informe/           2026-08-29.md          ← guion narrado de 3 noticias:
                                                     de él salen el Short del
                                                     día y el podcast (el informe
                                                     en video se apagó el
                                                     04-11-2026)
        claves/            2026-08-29-<slug>.md   ← guion del video de Claves
      revisiones/          2026-08-29.md          ← veredicto de la revisión
                                                     editorial (su push dispara
                                                     el render)
      descripciones/       2026-08-29-informe.txt ← lo que se pega en YouTube
                                                     (el -informe.txt era del
                                                     informe en video, apagado
                                                     el 04-11-2026)
      casos/               <slug>.md              ← observatorio "¿En qué quedó?"
                           hitos.md, por-verificar.md, por-abrir.md
      videos/              2026-08-29-informe.txt ← histórico: id del video
                                                     publicado en YouTube; nada
                                                     lo escribe desde el
                                                     04-09-2026
      palabras/                                   ← palabra del día (diferido)

Reglas:
- El nombre SIEMPRE parte con la fecha AAAA-MM-DD (hora de Chile). En la prosa
  las fechas van día-mes-año; la web convierte las ISO.
- Un archivo por pieza; nunca se sobreescribe una fecha anterior.
- Lo público y lo interno: el informe y los dossiers se publican enteros en la
  web. Las notas para el sistema o el editor van al FINAL ABSOLUTO del archivo
  dentro de `<!-- interno ... -->`; la web quita todos los comentarios HTML y
  las marcas de una línea (EN SEGUIMIENTO, FUERA DE LA OLLA).
- El informe deja en su bloque interno el rastro del descarte: una línea por
  cada preseleccionada que no entró, con su motivo.
- Los videos renderizados NO se commitean (quedan en out/, ignorado por git);
  se publican como release `edicion-FECHA`.
