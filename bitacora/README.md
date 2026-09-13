# bitácora: el puente entre la sesión de día y la de noche

Santiago usa la sesión en la nube durante el día para analizar, decidir y
anotar ideas. Al llegar a casa abre la sesión local para ejecutar. Esta
carpeta es lo único que tiene que leer para pasar de una a otra.

## Dónde vive esto y por qué aquí

No en el `CLAUDE.md` global ni en `~/.claude/skills/`: el contenedor de la
sesión en la nube se recicla, así que todo lo que viva ahí se pierde, y
además la sesión local nunca lo vería. **El repo es la única superficie
compartida entre las dos sesiones.** Por eso la bitácora es una carpeta
versionada y la rutina es una skill del proyecto, no del usuario.

## Qué hay

    bitacora/PENDIENTES.md        la lista viva. Lo único que no caduca.
    bitacora/AAAA-MM-DD.md        lo que se habló y decidió ese día.
    bitacora/AAAA-MM-DD-auditoria.md   el análisis de la mañana.

`PENDIENTES.md` existe porque un archivo por día pierde continuidad: lo que
no se hizo el lunes desaparece de la vista el martes. Ahí no.

## La rutina

**En la mañana**, la auditoría base la escribe la rutina de las 09:30
(disputa 7, decidida el 02-09); la sesión de día corre `/bitacora auditoria`
para LEERLA, verificar su triage y profundizarla en el mismo archivo. Solo
si la rutina falló, la sesión de día mide el
estado real del proyecto contra lo que la estrategia promete y escribe
`AAAA-MM-DD-auditoria.md`. Compara con la auditoría anterior: qué mejoró,
qué sigue igual, qué apareció nuevo.

**Durante el día** se conversa. Cada decisión, hallazgo o idea se anota en
`AAAA-MM-DD.md` a medida que ocurre, no al final.

**Al cerrar**, la sesión de día corre `/bitacora cierre`: deja el archivo
del día ordenado y actualiza `PENDIENTES.md`.

**En la noche**, Santiago lee `PENDIENTES.md` y el archivo del día, y
ejecuta desde ahí.

## La regla que separa las dos sesiones

Desde el 28-08-2026: **la sesión de día no toca el comportamiento del
proyecto.** No modifica prompts, scripts, workflows ni `src/`. Solo lee,
analiza, recomienda y escribe aquí. Todo cambio de código o de prompt lo
ejecuta la sesión de la noche, decidido por Santiago.

Cuando el análisis encuentre algo que hay que arreglar, se escribe en
`PENDIENTES.md` con el archivo y la línea. No se arregla.

## Dónde se anota cada cosa (estándar del 13-09-2026)

Antes de esto había pendientes en nueve lugares y nadie sabía cuál mandaba. La
regla ahora es corta: **una sola lista de trabajo, y cuatro listas de material
que escribe la máquina.**

### Lo que hay que HACER: `bitacora/PENDIENTES.md`, y nada más

Toda tarea vive ahí, venga de donde venga: de una auditoría, de una idea, de
un hallazgo de la revisión, de una conversación. Una entrada trae **qué pasa,
con qué evidencia (archivo y línea), quién la ejecuta** (noche, día o Santiago)
y, si está bloqueada, **qué falta para destrabarla**. Si algo no está acá, no
existe: nadie lo va a hacer.

Las tres secciones por dueño son fijas: "Para la sesión de la noche (código y
prompts)", "Para la sesión de día (solo análisis)" y "Dependen de Santiago".

### Las cuatro listas que NO se mudan, porque las escribe la máquina

No son tareas del repo, son material editorial con su propio ciclo. Cada una
tiene dueño y un momento del día en que se mira:

| Lista | La escribe | Se revisa |
|---|---|---|
| `contenido/casos/por-abrir.md` | `scripts/casos.js` con las marcas EN SEGUIMIENTO del informe | la sesión de día, al abrir dossiers |
| `contenido/casos/por-verificar.md` | el observatorio, cuando no pudo confirmar un dato | la rutina de la mañana |
| marcas `PENDIENTE DE CIERRE:` y `EN SEGUIMIENTO:` dentro de los informes | el informe del día | el informe del día siguiente, obligatorio (regla dura 9) |
| `bitacora/taller.json` | la sesión que prepara un tablero de variantes | Santiago, cuando decide |

Si una de estas se queda pegada (un caso sin abrir tres días, un tablero sin
decidir una semana), **ahí sí baja una entrada a PENDIENTES**: lo pegado es
una tarea, lo que fluye no.

### Lo que todavía no es tarea

- `ideas/evaluar.md`: ideas crudas, con fecha, qué es, valor y esfuerzo.
  Cuando una se aprueba **se convierte en entrada de PENDIENTES** (ya no pasa
  por `ejecutar.md`, que está en `archivo/`). Cuando se descarta va a
  `ideas/descartadas.md` con el porqué.
- `estrategia/hoja-de-ruta.md`: el mapa del proyecto, no una lista de tareas.
  Lo que de ahí esté vivo y sea accionable, baja a PENDIENTES.
- `REGLAS-DURAS.md`, sección de disputas: criterio en discusión. Una disputa se
  cierra con una decisión de Santiago, y la decisión se registra en
  `estrategia/decisiones.md`.

### Lo que YA SE HIZO: tres lugares, cada uno con su función

1. **`bitacora/REALIZADOS.md`**: una línea por cosa terminada, con fecha,
   append-only. Es además la evidencia de aporte humano que pide YouTube.
2. **`estrategia/decisiones.md`**: solo las decisiones de fondo, con el
   formato de ese archivo (qué, quién decidió, cuándo, qué regla resultó).
   Una decisión de NO hacer algo también se registra acá: si no, la auditoría
   la vuelve a proponer cada mañana.
3. **El mensaje del commit**: el detalle técnico y el porqué. El archivo del
   día (`bitacora/AAAA-MM-DD.md`) lleva el relato de la jornada.

Y lo hecho **se borra de PENDIENTES**, no se tacha. Tachar engorda la lista
hasta que deja de leerse: el 13-09 tenía 908 líneas, doce de ellas cosas
terminadas hacía una semana.

### La conexión que fallaba

El triage de la auditoría de la mañana (HOY / AGUANTA / MIRAR) **no aterrizaba
en ninguna parte**: la cifra mala del 11-09 se marcó HOY tres mañanas seguidas
sin que nadie la anotara. Desde el 13-09 la propia rutina de auditoría escribe
sus HOY en PENDIENTES antes de terminar (`prompts/auditoria-matinal.md`). Una
propuesta marcada HOY que no llega a la lista viva es una propuesta que no
ocurrió.
