# prompts/ : la única fuente de verdad de los prompts

Cada tarea lee desde AQUÍ, en el repo y en la corrida, el prompt de su pieza y
`contrato-archivos.md`. No hay copia en ChatGPT ni en una rutina de Claude que
valga: si cambias un prompt, cámbialo aquí y commitea. Las tareas solo dicen
"lee tal archivo del repo y cúmplelo", así que **editar un archivo de esta
carpeta ES cambiar el comportamiento** desde la corrida siguiente.

Esta carpeta es solo lo vivo. Lo que dejó de correr está en
`archivo/prompts/`, con su porqué en `archivo/README.md`.

**El modelo desde el 01-11-2026** (`estrategia/decisiones.md`, "Tomar el
control"): la Clave pasa a ser el largo por tema, "Entender el caso", sin
calendario, con el diario escrito como escenario. Desde el 02-11-2026 su flujo
existe: el turno SEGUIMIENTO (`seguimiento-temas.md`) lleva cada día la ficha
de cada tema en `contenido/temas/` (origen, hitos con la página del diario
donde salió cada uno, qué falta) y propone los largos a la Bandeja; con el sí
(de Claude desde el 04-11-2026, regla 24: Santiago se entera),
`scripts/clave.js elegir <slug> --tema-de <tema>` abre el flujo
de la Clave por el camino `pauta`. La pauta se arma desde la ficha
(`pauta-clave.md`, sección "Cuando el flujo viene de un tema") y fija, por
sección del video, la marca `[DIARIO AAAA-MM-DD | slug]` que el guion copia
(`guion-claves.md`) y que le dice al render qué página mostrar y a qué noticia
acercarse. Contrato completo en `contenido/temas/README.md`.

**Desde el 04-11-2026** (decisión "El despegue"): el informe diario en video y
los exprés están apagados. El guion del informe (`guion-informe.md`) sigue
escribiéndose cada día como guion narrado de tres noticias, porque de él salen
el Short del día y el podcast.

## Lo que escribe GPT (una sola tarea, el despachador)

Desde el 14-09-2026 hay **una** tarea de ChatGPT. La despierta el PR #6
"Estado del día" y no tiene horario propio: lee el estado, y el estado le dice
qué pieza le toca y con qué prompt. Nada de esto corre por reloj.

| Archivo | Lo dispara | Qué escribe |
|---|---|---|
| `despachador-gpt.md` | el PR #6, en cada evento | nada: es el prompt de la tarea, el que decide a cuál de los de abajo ir |
| `seleccion.md` | etapa `barrido_listo`. **Desde el 06-10-2026 NO la escribe GPT**: es turno permanente de Claude (`contenido/estado/reparto.txt`, ver la tabla de abajo) | `contenido/preseleccion/FECHA.md`, la olla de candidatas |
| `informe.md` | etapa `preseleccion_lista` | `contenido/informes/FECHA.md`, la edición completa que publica la web |
| `guion-informe.md` | etapa `informe_listo` | `contenido/guiones/informe/FECHA.md`, el guion narrado del que salen el Short y el podcast. Desde el 04-11-2026 ya no pide la carátula del día en el mismo turno |
| `caratula-pedido.txt` | **es el prompt que se manda al generador, tal cual**, con tres marcadores que rellena quien lo usa. Desde el 04-11-2026 solo para carátulas de largos o pedidos manuales | una carátula |
| `imagen-caratula.md` | un pedido `tarea=imagen` (hasta el 04-11-2026 también el turno del guion del informe); desde ese día solo para carátulas de largos o pedidos manuales. Dice de dónde salen los tres datos y adónde va la imagen, no cómo se dibuja | `contenido/caratulas/FECHA.png` y `FECHA-prompt.txt` |
| `imagen-caratula.md`, sección "Pedidos externos" (06-11-2026) | un pedido `tarea=imagen` cuya `Salida` cae en `contenido/caratulas/externos/<canal>/` (lo dejan los otros canales de Santiago por `gh api`; procedimiento en la skill global `caratulas-con-gpt`) | la imagen en esa ruta, con el prompt que vino entero dentro del pedido |
| `investigacion-clave.md` | etapa `pauta_aprobada` de un flujo de la Clave | `contenido/claves/flujo/<slug>/investigacion.md`, el dossier con fuentes |
| `claves.md` (MODO FLUJO) | etapa `investigacion_lista` | `contenido/claves/FECHA-<slug>.md`, la entrega |
| `guion-claves.md` | etapa `entrega_lista` | `contenido/guiones/claves/FECHA-<slug>.md` |
| `lector-gpt.md` | un pedido `tarea=lectura` (`pedido-gpt.yml`) | `contenido/urgente/FUENTE-<slug>.md`, citas textuales para que Claude contraste |
| `mural-clave.md` | la etapa `paneles` del flujo de la Clave: `scripts/mural-flujo.js` le pide los paneles en tandas de diez, y `scripts/clave-mural.js` cose y mide con sus reglas | `contenido/claves/flujo/<slug>/paneles/panel-NN.jpg` |
| `doc-youtube.md` | el pedido mensual que abre `doc-youtube.yml` el día 1 (`scripts/pedir-doc-youtube.js`) | `contenido/referencia/youtube/AAAA-MM-politicas.md`, las políticas de YouTube con fecha, para el skill `caratula` |

Regla de Santiago del 23-09-2026: **todo lo que requiere entrar a las páginas o
generar una imagen lo hace GPT.** Claude no navega.

## Lo que hacen las rutinas de Claude

Los IDs, las horas exactas y el estado de cada rutina están en
`bitacora/rutinas.md`, que es el inventario y se edita en el mismo commit que
la rutina. Acá va solo qué prompt lee cada una.

| Archivo | Quién lo ejecuta | Cuándo | Qué escribe |
|---|---|---|---|
| `validador.md` | la rutina validadora | la despierta `estado.yml` por API en cada etapa `validar_*`; reloj de red 02:20 y 04:45 | `contenido/veredictos/FECHA-<pieza>.md`, y en `validar_final` la `contenido/revisiones/FECHA.md` que abre la compuerta del render |
| `suplente.md` | la misma rutina, en MODO SUPLENTE | siempre en las etapas de la línea `claude:` de `contenido/estado/reparto.txt` (hoy la preselección, desde el 06-10-2026), y además en los turnos de GPT mientras exista `contenido/estado/plan-b.txt` de hoy (lo escribe `reintento.yml` con la regla 20 y 20) | la pieza que le tocaba a GPT, en la ruta que diga el estado |
| `pauta-clave.md` | la misma rutina, en MODO PAUTADOR | la despierta `estado-clave.yml` en las etapas `pautar` y `reparar_pauta` | `contenido/claves/flujo/<slug>/pauta.md`, lo que el video debe tocar y contener, que es lo que aprueba Santiago antes de que GPT trabaje |
| `seguimiento-temas.md` | la misma rutina, en MODO SEGUIMIENTO (desde el 02-11-2026) | la despierta `estado.yml` una vez por edición cuando la etapa del día llega a `aprobada`, porque lee el informe final; su punto 0 lo retoma en cualquier despertar mientras falte la marca del día | las fichas de `contenido/temas/<slug>/ficha.md`, una `propuesta.md` cuando un tema da para un largo, la marca `contenido/temas/seguimiento/FECHA.md`, `bitacora/bandeja.json` y UNA notificación si propuso |
| `validador.md`, punto 0 MODO AVISADOR | la misma rutina | la despierta `estado-clave.yml` en `pauta_lista`, y `estado.yml` en `bloqueado_humano` | `bitacora/bandeja.json` si cambió, y UNA notificación push al teléfono de Santiago |
| `tema-semana.md` | la rutina del tema de la semana | domingos 09:00 | `contenido/claves/semana/AAAA-Www-candidatos.md`, tres candidatos para que Santiago elija |
| `caso-seguimiento.md` | el observatorio de la plata pública | 01:45, en paralelo a la cadena | engorda los dossiers de `contenido/casos/` solo si hay novedad verificable |
| `guardia-reloj.md` | la guardia. **Apagada desde el 04-11-2026** (los exprés se apagaron con la decisión "El despegue"); la fila queda como registro | era cada 2 horas, 08:00 a 22:00 | `contenido/urgente/GUION-<slug>.md` para el Short exprés, y `PEDIDO-<slug>.md` cuando necesita que GPT lea una página |
| `vigia.md` | el vigía de la cadena | 02:15 y 05:15 | nada en el repo: avisa al teléfono si un eslabón falta a destiempo |
| `auditoria-matinal.md` | la auditoría de la mañana | 05:30, con las métricas ya en el repo | `bitacora/AAAA-MM-DD-auditoria.md` con el triage HOY / AGUANTA / MIRAR, y baja sus HOY a `bitacora/PENDIENTES.md` |

La validadora tiene así **cinco roles** (validador, suplente, pautador,
avisador y seguimiento) en una sola rutina. El informe de la mañana de las 06:00
(`trig_01DHmsrrShT2Mnj8WDg4CQ42`) está **apagado desde el 12-10-2026**, porque
Santiago lee la revisión del skill `revision`.

## Lo que se lee, no se ejecuta

| Archivo | Quién lo lee | Para qué |
|---|---|---|
| `contrato-archivos.md` | TODAS las tareas, antes de escribir | rutas, formatos, reglas de commit y escritura verificada. Manda sobre cualquier prompt |
| `CALIDAD.md` | la sesión que itera los prompts | la rúbrica de calidad editorial y la bitácora de cada cambio de regla, con fecha |
| `web.md` | la sesión que toca `web/` o lo publicable | qué necesita la web y qué no le sirve, frente a lo que necesita el guion narrado |

`investigacion-clave.md` estuvo escrito y huérfano desde que se creó. **Desde el
27-09-2026 ya está enganchado**: es el turno `pauta_aprobada` del flujo de la
Clave, el primero de GPT en el camino nuevo, y va arriba en la tabla de lo que
escribe GPT. Lee la pauta y escribe el dossier con el que después se escriben la
entrega y el guion.
