ESTADO: CON FALLAS — la cadena arrancó rápido y bien (barrido 01:33, preselección APROBADA a las 01:58, ambas antes de su hora esperada) pero se congeló ahí: a las 05:40 de Chile, 3 h 42 min después de que `estado.yml` avisara a la tarea de ChatGPT que le tocaba el informe, no hay informe, ni guion, ni revisión, ni banco de temas, ni videos de hoy. La señal salió bien (verificado en el PR #6 y en `contenido/estado/2026-09-22.md`); la falta de respuesta es del lado de la tarea de ChatGPT, invisible desde el repo. HOY: revisar/relanzar esa tarea ahora, antes de que la ventana de publicación de hoy se pierda.

Auditada el 22-09-2026 desde las 05:30 de Chile, checkout sincronizado contra `origin/main` (`b59694a`, "métricas 2026-09-22 [bot]"). Horas reales de `git log` con `TZ=America/Santiago` y de `mcp__github__actions_list`/`actions_get` sobre los workflows Barrido, Estado del día y Señal preselección/informe. Aviso: mi primera pasada por `git log --date=format-local` corrió sin fijar `TZ` (el contenedor es UTC) y me hizo leer 3 h de atraso donde no lo había; quedó corregida fijando `TZ=America/Santiago` antes de citar cualquier hora en este archivo, y todas las horas de abajo están ya en hora de Chile.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada | Estado |
|---|---|---|---|
| Barrido | 01:33 | 01:40 | ok |
| Preselección: v0 01:47 → CORREGIR v1 01:53 → v1 01:56 → APROBADA 01:58 | — | 02:10 | ok, 1 vuelta, adelantada |
| Evento a GPT "te toca el informe" (PR #6, `automatizacion/estado`) | 01:58:50 | — | emitido, verificado (`ultimo-evento.txt` en la rama) |
| Informe | **no llegó** | 02:40 | **FALLA, +178 min a las 05:38** |
| Guion del informe | no llegó (depende del informe) | 03:10 | FALLA |
| Revisión (veredicto final) | no llegó (depende del guion) | 03:30 | FALLA |
| Banco de temas de la Clave | sin alimentar hoy (depende del informe) | 04:00 | FALLA |
| Videos y descripciones | no llegó (depende de todo lo anterior) | 05:15 | FALLA |
| Métricas | commit `b59694a` a las 05:05 | 05:00 | ok |

No hubo Clave hoy, lo que corresponde desde CLAVE 4 (16-09): confirmado listando `contenido/claves/` y `contenido/guiones/claves/` completos, sin entradas del 22-09 (la última entrega sigue siendo la del 16-09).

`node scripts/validar-tarjetas.js --fecha 2026-09-22`: `(sin guion en contenido/guiones/informe/2026-09-22.md: nada que contar)`. No hay episodio de hoy en `contenido/podcast/episodios.json` (no puede haberlo sin guion): no hay duración que comparar contra la promesa, y no la invento. No hay `contenido/revisiones/2026-09-22.md` que revisar ni `PENDIENTE DE CIERRE` de hoy que verificar, por la misma razón.

## Qué falló

**1. La cadena se congeló entre preselección aprobada e informe: el aviso a GPT salió bien, la respuesta nunca llegó.** Evidencia: `contenido/estado/2026-09-22.md` (escrito por Actions con checkout completo, no por mí) dice `ETAPA: preseleccion_lista`, `PIEZA: informe`, `ACTUALIZADO: 2026-09-22 01:58`. La corrida de `estado.yml` que generó ese archivo (run `35688907646`, disparada por el push del veredicto APROBADA) terminó en éxito a las 01:58:54 UTC y, según su propio código (`.github/workflows/estado.yml` líneas 123-161), emitió el evento al PR #6 porque `preseleccion_lista` matchea `[a-z_]+_lista`. Confirmado en la rama misma: `git show origin/automatizacion/estado:contenido/estado/ultimo-evento.txt` trae `fecha_chile=2026-09-22`, `etapa=preseleccion_lista`, `pieza=informe`, `prompt=prompts/informe.md`, `emitido_utc=2026-09-22T04:58:50Z`. Desde ese commit (`35e98cb`) hasta las 05:38 de Chile —2h40 después de la hora esperada del informe y 3h40 después del evento— no hubo un solo commit relacionado con el informe, en ninguna rama. La señal no es la falla: la tarea de ChatGPT que la escucha no respondió, y desde el repo no hay forma de saber si es que no despertó, si se agotó su cuota o si está trabajando y solo muy atrasada.
   Esto es exactamente el punto que `bitacora/PENDIENTES.md` (sección "Para la sesión de la noche", entrada "GPT 1") dejó abierto el 15-09: *"el vigía (o el estado) tiene que distinguir 'GPT no responde' de 'GPT no tiene cuota', y avisar con la hora del último evento sin respuesta; hoy nadie avisó, lo vio la sesión de día mirando el reloj"*. Hoy se repitió el mismo patrón, siete días después: nadie avisó antes que esta auditoría.

**2. Como consecuencia directa de (1): guion del informe, revisión, banco de temas del día y videos no existen.** No son fallas nuevas de sus propias etapas — no hay nada que corregir en `prompts/guion-informe.md`, `prompts/validador.md` ni `prompts/banco-temas.md`, porque ninguno llegó a correr. Las marco separado en la tabla solo para que quede el registro de qué depende de qué.

Nota metodológica, no hallazgo del pipeline: mi checkout de esta sesión resultó ser un clon superficial (`git rev-parse --is-shallow-repository` → `true`), a diferencia del checkout de Actions (`fetch-depth: 0`). Correr `node scripts/estado.js` YO MISMO con ese clon superficial le hace creer a la pieza "banco" (que usa `git log -1 --format=%cI`, y si falla cae a la fecha de archivo en disco) que el banco de temas está "al día", porque la fecha de archivo del checkout es la de hoy. El archivo autoritativo `contenido/estado/2026-09-22.md`, escrito por Actions con clon completo, sí dice correctamente "sin alimentar hoy". Lo dejo anotado porque casi lo reporto como bug de `scripts/estado.js` antes de comparar contra el archivo ya commiteado — no lo es.

## Propuestas

1. **Ahora, hoy, del lado de Santiago: revisar la tarea "Despachador Entender Chile" en ChatGPT** (la que escucha el PR #6) — si está caída, sin cuota o nunca se disparó con el commit `35e98cb` (01:58:50), y si hace falta, relanzarla a mano apuntando a `prompts/informe.md` con la preselección de hoy ya aprobada. Sin esto, nada de lo de abajo tiene sentido escribirlo.
2. En `.github/workflows/estado.yml`, extender el bloque "Despertar dirigido a Claude" (líneas 163-217), que hoy solo actúa sobre etapas `validar_*`, para que un turno de GPT (`_lista`/`_listo`/`reparar_*`) que lleve más de, por ejemplo, 45-60 minutos sin que su pieza aparezca (comparando `emitido_utc` de `contenido/estado/ultimo-evento.txt` contra la hora actual) dispare un aviso — reutilizando el mismo POST a `/fire` que ya existe para el validador, pero a una rutina que solo avise a Santiago, no que reintente el trabajo de GPT. Cierra el punto que "GPT 1" en `bitacora/PENDIENTES.md` dejó pendiente el 15-09.

## Triage

- **HOY**: propuesta 1. La edición completa de hoy —informe, guion, revisión, banco de temas y videos— está detenida y sin ella no hay nada que publicar hoy. Va en la primera línea del archivo.
- **AGUANTA**: propuesta 2. Es la mejora estructural (alertar antes de las 05:30 la próxima vez); no arregla lo de hoy, evita que la próxima vez se entere recién la auditoría.

## Comparación con ayer

**Mejoró:** el arranque de la noche fue más rápido que ayer — barrido a las 01:33 (igual) y preselección APROBADA a las 01:58, contra las 02:03 del 21-09 —, y con una sola vuelta de corrección, igual que ayer.

**Sigue igual:** las URLs de portada en la preselección y las fuentes primarias inaccesibles en el barrido no se pudieron comparar hoy porque no hay `contenido/revisiones/2026-09-22.md`; se retoma mañana si la cadena corre completa.

**Peor / nuevo:** por primera vez desde que hay registro en esta serie de auditorías, la cadena se detuvo por completo después de la preselección y no produjo NADA del resto del día — ni informe, ni guion, ni revisión, ni banco de temas, ni videos —, algo que ni el 21-09 (CON OBSERVACIONES, pero con todo publicado) ni los días anteriores mostraron. Es la misma clase de falla que "GPT 1" (15-09) ya había anticipado sin que se cerrara la parte de aviso automático.
