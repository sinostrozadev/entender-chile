# El flujo de Entender Chile (Estrategia A, desde el 19-11-2026)

Tres pasos, una rutina por paso, un reloj por tarea. Reemplaza la cadena
diaria de madrugada (barrido → preselección → informe → guion → validaciones
→ edición), que se retiró el 13-11-2026 (`estrategia/limpieza-2026-11.md`).
Horas de Chile en horario de verano (UTC-3). Cuando Chile vuelva a UTC-4
(abril), los crons de GitHub y de las rutinas, que están en UTC, se corren una
hora antes en hora de Chile: hay que sumarles 1 a la hora UTC si se quiere
mantener la hora local.

## 1. Diagrama

```
 barrido.yml (cron diario 01:50)            observatorio (vie 02:00)
   contenido/barrido/  ─────────┐            contenido/casos/ ──┐
                                 ▼                               ▼
 ┌─────────────── PASO 1: PLAN Y GUIONES (jueves 17:30, rutina Opus) ───────────────┐
 │ revisión semanal → bitacora/semanal/  ·  compuerta (¿seguir?)                     │
 │ elige 7 Shorts + 1 largo (jue +7 → mié +13) → verifica cifras con fuentes         │
 │ escribe contenido/semana/AAAA-MM-DD/*.json → video/scripts/validar.mts            │
 │ revisor independiente (subagente Opus) → corrige → PEDIDO de carátula del largo   │
 │ un commit + push a main                                                           │
 └───────────────────────────────────────┬───────────────────────────────────────────┘
                                         │ push de contenido/semana/**  (sin reloj)
                                         ▼
 ┌─────────────── PASO 2: RENDER Y SUBIDA (producir.yml, GitHub Actions) ────────────┐
 │ por cada guion sin marca: validar → voz Edge (es-CL Lorenzo) → datos y mapas      │
 │ → render Remotion → subida PROGRAMADA a YouTube (12:00 Shorts, mié 19:00 largo)   │
 │ → marca contenido/semana/*/hechos/<id>.txt  ·  mp4 como artifact 14 días          │
 │ push de contenido/caratulas/listas/<id>.png (GPT) → pone la carátula del largo    │
 └───────────────────────────────────────┬───────────────────────────────────────────┘
                                         │ YouTube publica solo a su hora
                                         ▼
 ┌─────────────── PASO 3: MÉTRICAS Y REVISIÓN ───────────────────────────────────────┐
 │ metricas.yml (cron 06:30) → bitacora/metricas/AAAA-MM-DD.json                      │
 │ revisión diaria (10:30, rutina Sonnet) → bitacora/diaria/ · aviso solo si falla    │
 │ revisión semanal = primera parte del paso 1 del jueves → bitacora/semanal/         │
 └────────────────────────────────────────────────────────────────────────────────────┘
```

**Cambios del 18-11-2026** (`estrategia/decisiones.md`): el Short abre con el
mapa del lugar (`validar.mts` lo exige desde el 26-11), el largo sigue el
modelo chilenómetro (tema chileno visual, de rivalidad o "cómo creció X",
arranque con escena, título de pregunta o paradoja) y el Short del miércoles
12:00 es su tráiler. EC hace solo Chile; las comparaciones entre países son de
En Números Rojos. Todo está en `prompts/plan-semanal.md` §1b y §4.

Lo que NO está en el flujo y no debe volver: relojes que pushean despertadores
cada 20 minutos, reintentos de GPT, validación pieza por pieza, el informe
diario de GPT, el mural de la Clave, el vigía y la auditoría. Si algo falla,
la revisión diaria lo anota y lo arregla la sesión, no un reloj nuevo.

## 2. Tabla de horarios (una fila por reloj)

| Hora de Chile | Días | Qué | Dónde corre | Reloj (UTC) | Gasta cupo de Claude |
|---|---|---|---|---|---|
| 01:50 | todos | Barrido de 22 medios (banco de temas) | GitHub Actions `barrido.yml` | cron `50 4 * * *` | no |
| 02:00 | viernes | Observatorio de plata pública (dossiers de "¿En qué quedó?") | rutina `trig_01MzKjYwnyH8PfJfCBrtJvv4`, Opus | `0 5 * * 5` | 1 sesión/semana |
| 06:30 | todos | Métricas del canal (Data, Analytics y Reporting API) | GitHub Actions `metricas.yml` | cron `30 9 * * *` | no |
| 10:30 | todos | Revisión diaria (`prompts/revision-diaria.md`) | rutina `trig_012bFrH9XnJMjV74uHxVYz8c`, Sonnet | `30 13 * * *` | 7 cortas/semana |
| 12:00 | todos | Publicación del Short (la hace YouTube, programada) | YouTube | ninguno | no |
| 17:30 | jueves | Plan semanal + revisión semanal + guiones (`prompts/plan-semanal.md`) | rutina `trig_01BLVuzow3cvDVY6ffn7okKL`, Opus | `30 20 * * 4` | 1 larga + 1 revisor/semana |
| tras el push del jueves | jueves | Render y subida de las 8 piezas | GitHub Actions `producir.yml` | sin reloj (push) | no |
| 19:00 | miércoles | Publicación del largo (programada) | YouTube | ninguno | no |
| 09:00 | día 1 de cada mes | Pedido a GPT de las políticas de YouTube | GitHub Actions `doc-youtube.yml` | cron `0 12 1 * *` | no |

Sin reloj (solo por push o a mano): `producir.yml`, `web.yml`, `pedido-gpt.yml`
(canal de carátulas de todos los canales de Santiago), `caratula.yml`,
`privacidad.yml`.

Total: **3 relojes de GitHub** (barrido, métricas, doc mensual; producir no
tiene ninguno) y **3 rutinas de Claude** (plan semanal, revisión diaria,
observatorio). Antes: 6 crons en 5 workflows más 12 rutinas encendidas.

## 3. Nada se pisa ni sale doble

- Dentro del repo: cada tarea tiene un solo disparador programado. Las rutas
  de push no se cruzan: `producir.yml` escucha `contenido/semana/**` y
  `contenido/caratulas/listas/**`; `web.yml` escucha `informes`, `revisiones`,
  `claves`, `casos`, `videos`, `podcast` y `web/` (no `semana`); `pedido-gpt.yml`
  escucha `contenido/urgente/PEDIDO-*.md`; `metricas.yml` su despertador.
  `producir.yml` tiene `concurrency: producir` y marca cada pieza hecha, así
  que dos pushes seguidos no suben un video dos veces.
- El Short viejo de las 12:00 salía de `edicion-diaria.yml`, que se borró en
  esta misma rama: tras fusionar, a las 12:00 sale un solo Short.
- Frente a los otros canales (`~/.claude/canales/calendario.json`): Entender
  Chile **no está en el crontab del PC y no debe estar**; renderiza en
  Actions, no toma el lock `/tmp/bolita-render.lock` ni el piloto 8777. Sus
  rutinas de Claude caen fuera de las ventanas de los otros canales: Bolita
  Lab (03:30, 08:00, dom 04:30, lun 05:00) y Línea Punteada (04:45, 08:15)
  corren en el PC; En Números Rojos no tiene reloj. Las de Actions de los
  hermanos (03:30, 04:45 y dom 04:30 de Chile) están en otros repos y no
  compiten por nada. El plan del jueves 17:30 cae después de la renovación
  del cupo de Claude y lejos de la sesión de Santiago (21:00 a 01:30).
- El cupo de Santiago se renueva el jueves a las 17:00 (dato del encargo del
  13-11-2026). La memoria compartida dice miércoles: si cambia, se mueve solo
  la fila del plan semanal.

## 4. Cuánto cuesta

Por semana: 1 sesión Opus larga (plan, 8 guiones, verificación) + 1 revisor
Opus + 7 revisiones Sonnet cortas + 1 observatorio Opus. Render: 8 piezas en
Actions (repo público, minutos gratis); un largo de 10 min rinde en unos 12
min y un Short de gráfico en 10 a 20. GPT: 1 carátula semanal. Voz: Edge
TTS, sin clave ni cuota (respaldo Azure con `VOZ_PROVEEDOR=azure`).

## 5. Lo que hay que hacer en las rutinas al fusionar (no se hace desde el repo)

Las rutinas viven en claude.ai y leen los prompts de `main`. Al fusionar la
rama `estrategia-a`, en el mismo rato:

**Apagar** (`enabled: false`):

| Rutina | ID |
|---|---|
| Reloj del reintento A | `trig_016JsVfFwrJFut5vy2f4c8TS` |
| Reloj del reintento B | `trig_01E8tyJPqyfNdVTog477sf6Z` |
| Reloj del reintento C | `trig_01RevKvPn6mufpcUCK9fii2X` |
| Reloj del barrido | `trig_01W5KEjHbr5wWPsmmJ4ygNEh` |
| Reloj de métricas | `trig_01MxzGdh2P489TmgkUi9spWd` |
| Vigía | `trig_01LUtn4fSJjBsCzqdoWeVviH` |
| La validadora | `trig_01B8tLFaXe7h1YBCciFE2iKf` |
| Red del validador | `trig_01CR3g2re9G7warvfdt4MfMS` |
| Auditoría matinal | `trig_01GDbvJ1Wjzy25bnVRCXgygZ` |

**Cambiar** (las tres están creadas por `http_api` o se tocan desde claude.ai):

| Rutina | ID | Nuevo cron (UTC) | Modelo | Prompt de la rutina |
|---|---|---|---|---|
| Plan semanal (era "Tema de la semana") | `trig_01BLVuzow3cvDVY6ffn7okKL` | `30 20 * * 4` | Opus | "Lee y cumple prompts/plan-semanal.md del repo sinostrozadev/entender-chile, rama main." |
| Revisión diaria (era "Mejora diaria") | `trig_012bFrH9XnJMjV74uHxVYz8c` | `30 13 * * *` | Sonnet | "Lee y cumple prompts/revision-diaria.md del repo sinostrozadev/entender-chile, rama main." |
| Observatorio | `trig_01MzKjYwnyH8PfJfCBrtJvv4` | `0 5 * * 5` | Opus | sin cambio (`prompts/caso-seguimiento.md`) |

Mientras alguna no se apague, su prompt en `main` es un aviso de cinco líneas
que la hace terminar sin escribir, así que olvidarse de una no rompe nada:
solo gasta una sesión corta. Los relojes A, B, C, barrido y métricas tienen
el prompt dentro de la rutina (no en el repo): esos sí hay que apagarlos, o
seguirán pusheando despertadores que ya nadie escucha.

**En GitHub (lo hace Santiago, el clasificador bloquea `gh pr close`):**
cerrar el PR #5 (corta la cadena de recordatorios de 4 h) y el PR del canal
de avisos `automatizacion/barrido-listo`. El PR #6 se queda: es el canal de
los pedidos de carátula a GPT de todos los canales.

## 6. Cuándo se fusiona la rama

Ventana: **el miércoles 18-11-2026, después de que el largo de Codelco y el
Short viejo de ese día aparezcan programados en Studio, y antes de las 23:59**.
- Antes de eso, la cadena vieja todavía tiene que producir el Codelco del
  18-11 (formato antiguo, no cuenta para la evaluación) y sus piezas viven
  en los workflows que esta rama borra.
- Después de la 01:00 del 19-11 la cadena vieja produciría otro Short viejo
  para el 19-11 a las 12:00, y saldrían dos.
- Al fusionar, el push de `contenido/semana/2026-11-19/` dispara
  `producir.yml`, que renderiza y programa los Shorts del 19 al 25-11 y el
  largo del 25-11.
- Si Codelco se atrasa más allá del 18-11, se prioriza el formato nuevo: se
  fusiona igual el 18-11 en la noche y Codelco se rinde a mano después con el
  commit anterior a la rama (o se descarta; no cuenta para la evaluación).
