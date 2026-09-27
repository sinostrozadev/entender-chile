# prompts/ : la única fuente de verdad de los prompts

Cada tarea lee desde AQUÍ, en el repo y en la corrida, el prompt de su pieza y
`contrato-archivos.md`. No hay copia en ChatGPT ni en una rutina de Claude que
valga: si cambias un prompt, cámbialo aquí y commitea. Las tareas solo dicen
"lee tal archivo del repo y cúmplelo", así que **editar un archivo de esta
carpeta ES cambiar el comportamiento** desde la corrida siguiente.

Esta carpeta es solo lo vivo. Lo que dejó de correr está en
`archivo/prompts/`, con su porqué en `archivo/README.md`.

## Lo que escribe GPT (una sola tarea, el despachador)

Desde el 14-09-2026 hay **una** tarea de ChatGPT. La despierta el PR #6
"Estado del día" y no tiene horario propio: lee el estado, y el estado le dice
qué pieza le toca y con qué prompt. Nada de esto corre por reloj.

| Archivo | Lo dispara | Qué escribe |
|---|---|---|
| `despachador-gpt.md` | el PR #6, en cada evento | nada: es el prompt de la tarea, el que decide a cuál de los de abajo ir |
| `seleccion.md` | etapa `barrido_listo` (y el PR #2 del barrido) | `contenido/preseleccion/FECHA.md`, la olla de candidatas |
| `informe.md` | etapa `preseleccion_lista` | `contenido/informes/FECHA.md`, la edición completa que publica la web |
| `guion-informe.md` | etapa `informe_listo` | `contenido/guiones/informe/FECHA.md`, y en el mismo turno la carátula del día |
| `imagen-caratula.md` | dentro del turno del guion del informe, o un pedido `tarea=imagen` | `contenido/caratulas/FECHA.png` |
| `clave-idea.md` | etapa `tema_elegido` de un flujo de la Clave | `contenido/claves/flujo/<slug>/idea.md`, la promesa que aprueba Santiago |
| `claves.md` (MODO FLUJO) | etapa `idea_aprobada` | `contenido/claves/FECHA-<slug>.md`, la entrega |
| `guion-claves.md` | etapa `entrega_lista` | `contenido/guiones/claves/FECHA-<slug>.md` |
| `lector-gpt.md` | un pedido `tarea=lectura` (`pedido-gpt.yml`) | `contenido/urgente/FUENTE-<slug>.md`, citas textuales para que Claude contraste |

Regla de Santiago del 23-09-2026: **todo lo que requiere entrar a las páginas o
generar una imagen lo hace GPT.** Claude no navega.

## Lo que hacen las rutinas de Claude

Los IDs, las horas exactas y el estado de cada rutina están en
`bitacora/rutinas.md`, que es el inventario y se edita en el mismo commit que
la rutina. Acá va solo qué prompt lee cada una.

| Archivo | Quién lo ejecuta | Cuándo | Qué escribe |
|---|---|---|---|
| `validador.md` | la rutina validadora | la despierta `estado.yml` por API en cada etapa `validar_*`; reloj de red 02:20 y 04:45 | `contenido/veredictos/FECHA-<pieza>.md`, y en `validar_final` la `contenido/revisiones/FECHA.md` que abre la compuerta del render |
| `suplente.md` | la misma rutina, en MODO SUPLENTE | solo mientras exista `contenido/estado/plan-b.txt` de hoy (lo escribe `reintento.yml` con la regla 20 y 20) | la pieza que le tocaba a GPT, en la ruta que diga el estado |
| `tema-semana.md` | la rutina del tema de la semana | domingos 09:00 | `contenido/claves/semana/AAAA-Www-candidatos.md`, tres candidatos para que Santiago elija |
| `caso-seguimiento.md` | el observatorio de la plata pública | 01:45, en paralelo a la cadena | engorda los dossiers de `contenido/casos/` solo si hay novedad verificable |
| `guardia-reloj.md` | la guardia | cada 2 horas, 08:00 a 22:00 | `contenido/urgente/GUION-<slug>.md` para el Short exprés, y `PEDIDO-<slug>.md` cuando necesita que GPT lea una página |
| `vigia.md` | el vigía de la cadena | 02:15 y 05:15 | nada en el repo: avisa al teléfono si un eslabón falta a destiempo |
| `auditoria-matinal.md` | la auditoría de la mañana | 05:30, con las métricas ya en el repo | `bitacora/AAAA-MM-DD-auditoria.md` con el triage HOY / AGUANTA / MIRAR, y baja sus HOY a `bitacora/PENDIENTES.md` |
| `guardian.md` | el informe de la mañana | 06:00 | nada en el repo: su respuesta ES el informe que llega al teléfono de Santiago |

## Lo que se lee, no se ejecuta

| Archivo | Quién lo lee | Para qué |
|---|---|---|
| `contrato-archivos.md` | TODAS las tareas, antes de escribir | rutas, formatos, reglas de commit y escritura verificada. Manda sobre cualquier prompt |
| `CALIDAD.md` | la sesión que itera los prompts | la rúbrica de calidad editorial y la bitácora de cada cambio de regla, con fecha |
| `web.md` | la sesión que toca `web/` o lo publicable | qué necesita la web y qué no le sirve, frente a lo que necesita el video |

`investigacion-clave.md` está escrito y probado, pero **hoy no lo dispara
ningún flujo**: la propuesta del 26-09-2026 es engancharlo al flujo de la Clave
como pedido a GPT entre la idea aprobada y la entrega (GPT sí navega, y la
Clave en profundidad necesita fuentes). La decisión está pendiente; mientras no
esté, ninguna etapa lo nombra.
