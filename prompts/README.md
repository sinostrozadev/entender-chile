# prompts/ - la única fuente de verdad de los prompts

Cada tarea programada de ChatGPT lee desde AQUÍ, en el repo, el prompt de su
pieza y `contrato-archivos.md` antes de ejecutar. No hay copia en ChatGPT que
valga: si cambias un prompt, cámbialo aquí y commitea. Las tareas solo dicen
"lee tal archivo del repo y cúmplelo".

Piezas y horas (Chile), en el orden en que corren:

| Hora  | Pieza                | Prompt              | Lee                                   | Escribe                               |
|-------|----------------------|---------------------|---------------------------------------|---------------------------------------|
| 03:10 | Preselección (la olla) | `seleccion.md`    | `contenido/barrido/FECHA.md`          | `contenido/preseleccion/FECHA.md`     |
| 03:30 | Informe (edición completa para la web) | `informe.md` | la preselección          | `contenido/informes/FECHA.md`         |
| 03:45 | Claves               | `claves.md`         | el informe                            | `contenido/claves/FECHA-<slug>.md`    |
| 04:00 | Guion del informe    | `guion-informe.md`  | el informe                            | `contenido/guiones/informe/FECHA.md`  |
| 04:15 | Guion de la Clave    | `guion-claves.md`   | la clave                              | `contenido/guiones/claves/FECHA-<slug>.md` |

Antes de todo eso corre el barrido (`scripts/barrido.js`, disparado por la
rutina "Reloj del barrido" de Claude en la nube a las 01:30 Chile) y el
observatorio de plata pública (`caso-seguimiento.md`, rutina de Claude en la
nube, 01:45 Chile). Después, la revisión editorial (rutina de Claude, 04:40)
lee informe y guion y deja `contenido/revisiones/FECHA.md`; su push dispara
el render.

Otros archivos de esta carpeta:
- `contrato-archivos.md`: rutas, formatos, reglas de commit, escritura
  verificada y "verificar antes de afirmar". Lo leen TODAS las tareas.
- `CALIDAD.md`: la rúbrica de la revisión de la mañana y su bitácora diaria.
  Ahí se registra cada cambio de regla con fecha.
- `web.md`: cómo se publica el contenido en la web (qué es público y qué no).
- `musica.md`: los prompts con los que se pidieron los sonidos del canal
  (sello, cortinas, cierre).

`scripts/generar.js`, el antiguo plan B que corría estos prompts por API, fue
retirado a `revisar/` el 28-08-2026 y ya no corre: si una pieza no llega, el
gate frena el render y la revisión deja constancia.
