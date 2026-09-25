ESTADO: CON FALLAS — la cadena de hoy se congeló en la preselección (GPT no respondió) y el reintento automático no corrió ni una vez

Auditada el 25-09-2026 desde las 05:30 de Chile, checkout sincronizado
contra `origin/main` (`3838ef1`, "métricas 2026-09-25 [bot]"). Horas reales
de `git log` con `TZ=America/Santiago` fijado explícitamente, de
`mcp__github__actions_list` sobre los workflows del día, y de
`contenido/estado/2026-09-25.md`/`.json` (vista que calcula el propio repo,
no una estimación mía) y de la rama `automatizacion/estado`
(`contenido/estado/ultimo-evento.txt`).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada | Estado |
|---|---|---|---|
| Barrido | 01:40 (commit `4bd3c2c`, 04:40 UTC) | 01:40 | ok, a horario |
| Estado emitido a GPT (`barrido_listo`, PR de eventos) | 01:41:11 (evento `automatizacion/estado`) | 01:41 | ok, a horario |
| Preselección | no llegó | 02:10 | **falta, +5h26 a las 08:36 UTC** |
| Informe | no llegó | 02:40 | **falta** (bloqueado por preselección) |
| Guion del informe | no llegó | 03:10 | **falta** (bloqueado) |
| Revisión (veredicto final) | no llegó | 03:30 | **falta** (bloqueado) |
| Banco de temas de la Clave | no llegó | 04:00 | **sin alimentar** (bloqueado) |
| Edición diaria (videos) | no llegó | 05:15 | **falta** (bloqueado) |
| Métricas | 05:16 (commit `3838ef1`, 08:16:57 UTC) | 05:00 | ok, +16 min, bajo el umbral de 20 |
| Observatorio de plata pública | 01:53 (commit `a8a7fb7`, 04:53 UTC) | ~01:45 | ok |

Tabla tomada de `contenido/estado/2026-09-25.md` (ETAPA: `barrido_listo`,
VUELTA: 0) más las horas de commit y de eventos verificadas por separado.

## Qué falló

**GPT nunca respondió al aviso de preselección, y la red de reintento no
corrió ni una vez para insistir.** La cadena de eventos, verificada punto
por punto:

1. `estado.yml` emitió correctamente el aviso a GPT a las
   `2026-09-25T04:41:11Z` (01:41 Chile) — `contenido/estado/ultimo-evento.txt`
   en la rama `automatizacion/estado` dice `etapa=barrido_listo`,
   `pieza=preseleccion`, `prompt=prompts/seleccion.md`. Esta parte funcionó
   bien.
2. A las 08:36 UTC (hora de este chequeo) han pasado **235 minutos** desde
   ese aviso sin que `contenido/preseleccion/2026-09-25.md` exista (verificado
   listando la carpeta: el último archivo es `2026-09-24.md`). Muy por
   encima del margen normal de GPT (5-15 min) y de los `ESPERA_MIN=25`
   minutos que tolera `reintento.yml` antes de reinsistir.
3. `reintento.yml` (`.github/workflows/reintento.yml`) está diseñado
   exactamente para este caso: cada 20 minutos entre las 04:00 y las 09:59
   UTC revisa si la etapa activa es de GPT y el evento lleva más de 25
   minutos sin respuesta, y reemite hasta 3 veces antes de fallar en rojo
   con un error explícito. Consultado con `mcp__github__actions_list`
   (fuente de GitHub, no una ausencia deducida del repo): su última
   ejecución fue la `#5`, `2026-09-24T13:55:31Z` — de AYER por la tarde,
   fuera de cualquier ventana de madrugada. **Cero corridas hoy**, a pesar
   de que son las 08:36 UTC y la ventana lleva más de 4 horas y media
   abierta (debieron dispararse unas 13-14 veces de 04:00 a 08:36).
4. Total, en todo su historial (20 corridas), `reintento.yml` solo se ha
   disparado por horario DENTRO de su propia ventana dos veces: el 23-09 a
   las 08:57 UTC y el 24-09 a las 08:52 UTC — ambas casi al final de la
   ventana (05:5x Chile), nunca cada 20 minutos como está escrito. El resto
   de sus disparos por horario cayeron fuera de la ventana (13:55, 14:04
   UTC) o fueron manuales. Es decir: el cron de GitHub para este workflow
   no solo falló hoy, viene fallando de forma sistemática desde que existe.

**Consecuencia medible**: sin preselección no hay informe, guion, revisión
ni banco de temas ni videos. A las 05:36 de Chile —hora en que debía estar
listo el informe hace casi tres horas— no se produjo una sola pieza de
contenido hoy. `node scripts/validar-tarjetas.js --fecha 2026-09-25`
confirma que no hay nada que validar todavía (`sin guion... nada que
contar`), consistente con la ausencia real, no con un error del script.

**Esto no es la misma falla que ayer, pero es la misma causa de fondo.**
La auditoría del 24-09 (`bitacora/2026-09-24-auditoria.md`) encontró que el
despertador del barrido dejó un commit vacío y que, además, ninguna de las
dos redes de respaldo (los crons de `barrido.yml` y el de `reintento.yml`)
disparó ese día. Hoy el despertador del barrido funcionó bien y el barrido
corrió a horario — ese síntoma puntual no se repitió. Pero `reintento.yml`
volvió a tener cero corridas dentro de su ventana, y esta vez sí importa
directamente: hoy la etapa que se atascó (GPT en preselección) es
precisamente el caso de uso para el que existe ese workflow, no un borde
que no cubre. Dos mañanas seguidas confirmando que el cron nativo de
GitHub no dispara `reintento.yml` en su ventana es la misma tendencia que
ya se había marcado `AGUANTA` ayer, y hoy causó daño real por primera vez.

## Propuestas

1. En `.github/workflows/reintento.yml`, agregar un despertador propio
   (una rutina de Claude en la nube que toque un archivo como
   `contenido/estado/despertador-reintento.txt` y pushee cada 20 minutos en
   la ventana 01:00-07:00 Chile, con un paso `on: push` sobre esa ruta que
   ejecute el mismo cuerpo del job), igual que ya hacen `barrido.yml`,
   `metricas.yml` y `guardia.yml` para no depender del cron nativo de
   GitHub. Es la misma receta que la auditoría del 24-09 ya propuso como
   propuesta 2 (`AGUANTA`); con la evidencia de hoy (0 corridas en ventana
   por segundo día consecutivo, y esta vez con GPT genuinamente atascado)
   sube de prioridad.
2. Mientras no exista el despertador propio, considerar bajar el cron de
   respaldo de `reintento.yml` (línea 27, `*/20 4-9 * * *`) a un
   `workflow_dispatch` que dispare la rutina de auditoría misma cuando
   detecte una etapa de GPT vencida — no es una solución de fondo, pero
   evita que la única red para "GPT no responde" dependa 100% de un cron
   que en 20 corridas históricas nunca disparó cada 20 minutos como está
   escrito.
3. Nada que reparar en `estado.yml`: el aviso a GPT se emitió bien y a
   tiempo (04:41:11 UTC); el problema está enteramente en que nadie volvió
   a tocarle el timbre a GPT ni se avisó de que no respondía.

## Triage

- **HOY**: propuesta 1 — la edición de hoy completa está detenida desde
  las 02:10 Chile (más de 3 horas y media a esta hora) y no hay ningún
  mecanismo automático insistiéndole a GPT ni avisando del atasco; ya está
  en la primera línea de este archivo. Acción inmediata sugerida a
  Santiago (fuera del alcance de esta auditoría, que no ejecuta):
  redisparar la tarea de ChatGPT o `workflow_dispatch` de `reintento.yml`
  a mano.
- **AGUANTA**: propuesta 2 (cron de respaldo más agresivo) — parche
  temporal mientras se construye la propuesta 1.
- **MIRAR**: ya no aplica como "mirar" — la tendencia de `reintento.yml`
  sin corridas en su ventana, marcada `AGUANTA`/vigilancia ayer, se
  confirmó hoy como problema real. Pasa a `HOY` (propuesta 1).

## Comparación con ayer

Ayer (24-09) la cadena tampoco arrancó, pero por una causa distinta y ya
corregida en el síntoma (el despertador del barrido escribió un commit
vacío); hoy el barrido corrió perfecto. Lo que **no mejoró** es la red de
reintento: sigue sin disparar dentro de su ventana, dos días seguidos, y
hoy el costo fue mayor porque el caso que se perdió (GPT atascado en
preselección) es exactamente el que `reintento.yml` fue diseñado para
cubrir, no una excepción. Lo que es **nuevo** hoy: por primera vez se
confirma con el historial completo de `mcp__github__actions_list` que en
20 corridas históricas el cron nativo de `reintento.yml` jamás disparó
cada 20 minutos como indica su propio archivo — solo dos veces cayó
dentro de la ventana, y casi al final de ella. Los números del canal
(`bitacora/metricas/2026-09-25.md` vs `2026-09-24.md`) siguen moviéndose
por tráfico del catálogo existente, no por pieza nueva: 18→19 suscriptores
(+1), 6713→7140 vistas (+427, con un salto llamativo en los dos videos del
Escudo de las Américas, +97 y +125, y en el video de Minera Escondida,
+96 — tráfico externo o sugerido, no publicación de hoy), horas vistas de
largos 24.3h→24.9h (+0.6h), retención ponderada de largos 33.0%→31.8%
(-1.2pp, dentro del rango plano de semanas previas). Nada de esto depende
de la falla de hoy; vuelve a moverse por contenido nuevo en cuanto la
cadena se destrabe.
