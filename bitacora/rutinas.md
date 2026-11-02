# Rutinas de la nube y workflows: el inventario

**Última actualización: 01-11-2026.**

## Para qué existe

Listar las rutinas de Claude por API cuesta unos **75 KB por llamada** (el
volcado trae el prompt completo de cada una), y una sesión que quiere saber
"¿quién toca el barrido?" paga ese precio entero para leer una línea. Esta
tabla responde eso gratis. Lo mismo con los workflows: en vez de abrir
dieciséis archivos YAML, se lee una fila.

## Cómo se mantiene

**Quien crea, cambia, apaga o borra una rutina edita esta tabla en el mismo
commit.** No hay proceso automático que la refresque: si se hace en dos pasos,
el segundo no ocurre y la tabla empieza a mentir, que es peor que no tenerla.
Lo mismo para los workflows cuando cambia su `on:` o su razón de ser.

Los **IDs de rutinas y de sesiones no son secretos** y por eso están acá, igual
que en `prompts/` y en las bitácoras. Los **tokens sí** lo son y no van nunca en
el repo: el volcado de la API trae un campo `api_token_hint` que **no se
copia**, ni siquiera vacío.

## De dónde salen estos datos

Esta versión NO consultó la API. Sale de cuatro fuentes del repo:

- El inventario anterior (volcado de la API del 26-09-2026, página 1 de 2, más
  las rutinas creadas a mano ese día).
- `bitacora/2026-10-12.md` y la sección del 06-10 de `bitacora/PENDIENTES.md`:
  la noche del 12-10 apagó el informe de la mañana y silenció las
  notificaciones de siete rutinas.
- `bitacora/2026-11-01.md` y `bitacora/REALIZADOS.md` para los cambios del
  01-11.
- Los dieciséis archivos de `.github/workflows/`, leídos el 01-11-2026.

Se sacaron ocho filas muertas que la tabla arrastraba desde septiembre: los
tres "Respaldo" del plan B del 24-09 (preselección `trig_01CEfUBNnqtRYgEgyYhYocUU`,
informe `trig_01VU2rZ6AejJCNC1tY7imx9Q` y guion `trig_01TgYrtBrSEKqpzwiTnPRUDH`,
borrados el 26-09), la "Revisión editorial en Fable" (`trig_012mLfmCi2jDoiS3zRFqETy8`,
rota sin créditos), la "Revisión editorial (Sonnet)" (`trig_019cchTdDCVeVzVh8HjrZrYG`,
apagada el 10-09), el "Respaldo de la preselección original"
(`trig_01CVyy1m21cpCGHk9sKfVY9r`, apagado el 04-09) y el Guionista con su red
(`trig_01HUjC4MjKGmmpDMApn8gtJm` y `trig_017nkjJWR5Voud4dYgPhvwF7`, apagados
el 15-09). Los IDs quedan acá por si alguno reaparece en un listado de la API.

Cuando alguien vuelva a volcar la API completa, conviene cerrar los "no
consta" y confirmar las dos dudas de abajo.

Hora de Chile = UTC menos 3.

## Rutinas de Claude en la nube

`Creada desde`: **http_api** significa que se puede editar desde la sesión
local; **meta_mcp** y **web** significan que solo se toca desde claude.ai.
`Avisos`: **silenciada** es `notifications: {email: false, push: false}`,
puesto por la noche del 12-10-2026 a pedido de Santiago, porque entre la 01:00
y las 06:00 llegaban unas 46 sesiones de rutina al teléfono y nadie las leía.

| Hora de Chile | Rutina | ID | Encendida | Avisos | Modelo | Creada desde | Para qué |
|---|---|---|---|---|---|---|---|
| 01:10, 02:10, 03:10, 04:10 y 05:10 (`10 4-8 * * *`) | Reloj del reintento A | `trig_016JsVfFwrJFut5vy2f4c8TS` | sí | silenciada | Haiku 4.5 | http_api | Aprieta el botón de `reintento.yml`: toca `contenido/estado/reintento-despertador.txt` y pushea, porque el cron de GitHub no disparó en ventana el 24, 25 ni 26-09 |
| 01:30 | Reloj del barrido | `trig_01W5KEjHbr5wWPsmmJ4ygNEh` | sí | silenciada | Haiku | no consta | Toca `contenido/barrido/despertador.txt` y pushea: ese push dispara el Barrido. Existe porque el cron de GitHub llegaba con 11 horas de atraso. **El 01-11 se reportó exitoso sin escribir en main**: su prompt debe fallar si el push no entró (texto propuesto en `bitacora/2026-11-01.md`, pendiente) |
| 01:30, 02:30, 03:30, 04:30 y 05:30 (`30 4-8 * * *`) | Reloj del reintento B | `trig_01E8tyJPqyfNdVTog477sf6Z` | sí | silenciada | Haiku | http_api | Igual que el A, corrido veinte minutos, para que la ventana quede cubierta cada veinte |
| 01:45 | Observatorio de plata pública | `trig_01MzKjYwnyH8PfJfCBrtJvv4` | sí | silenciada | Opus | no consta | Busca novedades verificables de cada caso en seguimiento y actualiza los dossiers de "¿En qué quedó?" que publica la web (`prompts/caso-seguimiento.md`) |
| 01:50, 02:50, 03:50, 04:50 y 05:50 (`50 4-8 * * *`) | Reloj del reintento C | `trig_01RevKvPn6mufpcUCK9fii2X` | sí | silenciada | Haiku | http_api | Igual que el A, corrido cuarenta minutos |
| 01:55 (`55 4 * * *`) | Cadena nocturna sin GPT | `trig_01NscKtv2hPKqkV6ft8X6GKG` | **apagada el 26-09** | no consta | el de la cuenta | meta_mcp | Plan B de la caída de ChatGPT de septiembre. La reemplazó el suplente con la regla 20 y 20 de `reintento.yml`. Se deja en la tabla porque sigue existiendo y solo se borra desde la interfaz |
| 02:15 y 05:15 | Vigía de la cadena | `trig_01LUtn4fSJjBsCzqdoWeVviH` | sí | con aviso (a propósito) | no consta | no consta | Mira si algún eslabón falta a destiempo o si el estado quedó en `bloqueado_humano`, y avisa al teléfono. No escribe ni repara nada. Solo avisa cuando hay algo atrasado (`prompts/vigia.md`) |
| despertada por `estado.yml` y `estado-clave.yml` por API; reloj de red 02:20 | La validadora: validador, suplente, pautador y avisador | `trig_01B8tLFaXe7h1YBCciFE2iKf` | sí | silenciada (el AVISADOR manda su push aparte) | Opus | no consta | **Cuatro roles en una rutina.** VALIDADOR (`prompts/validador.md`): valida cada pieza requisito por requisito y escribe `contenido/veredictos/`. SUPLENTE (`prompts/suplente.md`): las etapas de la línea `claude:` de `contenido/estado/reparto.txt` son suyas siempre (hoy la preselección, desde el 06-10) y, mientras exista `contenido/estado/plan-b.txt`, también las de su línea `turnos:`. PAUTADOR (`prompts/pauta-clave.md`): escribe la pauta de la Clave en `pautar` y `reparar_pauta`. AVISADOR (punto 0 de `validador.md`): en `pauta_lista`, `idea_lista` y `bloqueado_humano` recalcula `bitacora/bandeja.json` y manda UNA notificación al teléfono de Santiago |
| 04:45 | Red del validador | `trig_01CR3g2re9G7warvfdt4MfMS` | sí | no consta | Opus | no consta | Si la corrida temprana no dejó veredicto, esta lo hace antes de la edición |
| 05:00 | Reloj de métricas | `trig_01MxzGdh2P489TmgkUi9spWd` | sí | silenciada | Haiku | no consta | Toca `bitacora/metricas/despertador.txt` y pushea: ese push dispara el workflow de Métricas |
| 05:30 (`30 8 * * *`) | Auditoría matinal | `trig_01GDbvJ1Wjzy25bnVRCXgygZ` | sí | no consta | no consta | no consta | Audita la madrugada con las métricas ya en el repo (`prompts/auditoria-matinal.md`): horas reales contra esperadas, vueltas de corrección, hallazgos, triage HOY / AGUANTA / MIRAR, y baja sus HOY a PENDIENTES |
| 06:00 (`0 9 * * *`) | Informe de la mañana (el guardián) | `trig_01DHmsrrShT2Mnj8WDg4CQ42` | **apagada el 12-10** (`enabled: false`) | no aplica | Opus | http_api | Armaba el resumen diario para el teléfono. Se apagó por decisión de Santiago del 06-10: "el informe de la mañana no lo veo, dámelo tú en la revisión de la mañana" (skill `revision`). Su prompt, `guardian.md`, se retira de `prompts/` el 01-11-2026 |
| 08, 10, 12, 14, 16, 18, 20 y 22 (`0 23,1,11,13,15,17,19,21 * * *`) | Guardia (reloj, redactor y mensajero) | `trig_01HLSWkJ8VpVFPuxQ51YiG4d` | sí | `push: false` desde antes del 12-10 | no consta | no consta | Barrido liviano de última hora con criterio mecánico; si caza algo, redacta el guion exprés, espera la marca `SUBIDO-` y avisa al teléfono con el link (`prompts/guardia-reloj.md`). Desde el 01-11 `guardia.yml` tiene cron de red por si este reloj calla |
| cada 4 horas, sin hora fija | Re-check PR #5 (**una sola fila para dieciocho rutinas**) | el vivo al 26-09 era `trig_01Jw1QAE68ZZ1NQsnshyBgez`; los otros diecisiete quedaban `enabled: false` | no consta desde el 26-09 | no consta | el de la cuenta | meta_mcp | Cadena de recordatorios de un solo disparo que se reagenda sola cada cuatro horas para mirar el PR #5, sesión persistente `session_01GZbDrbTYnw545j1wKZXtt1`. **Se corta cerrando o fusionando el PR #5**, no apagando rutinas |
| Domingos 09:00 (`0 12 * * 0`) | Tema de la semana | `trig_01BLVuzow3cvDVY6ffn7okKL` | sí | no consta | Opus | http_api | Corre `scripts/semana.js` sobre los informes de lunes a sábado y escribe los tres candidatos de `contenido/claves/semana/AAAA-Www-candidatos.md` con `prompts/tema-semana.md`. Desde el 01-11-2026 la Clave no tiene calendario (es el largo por tema): sus candidatos sirven de material, no de turno semanal |

**Quince filas**, y la del PR #5 resume dieciocho rutinas, así que cubre
treinta y dos rutinas. Doce encendidas y dos apagadas que siguen existiendo;
la del PR #5 no consta.

**Dos dudas que solo la API cierra:**

1. La tabla anterior listaba el informe de la mañana con
   `trig_01Dk4PXRmGEMPHzrvs6amTgf`, el ID con que se recreó el guardián el
   01-09 (`bitacora/2026-09-01.md`). El que la noche del 12-10 apagó por API
   es `trig_01DHmsrrShT2Mnj8WDg4CQ42`. No consta si el primero se borró o si
   siguen existiendo los dos; si aparece encendido, se apaga.
2. La noche del 12-10 dejó anotada una duda: si el AVISADOR de la validadora
   sigue llegando al teléfono con las notificaciones de corrida silenciadas.
   No hay registro de que se haya comprobado.

## Workflows de GitHub Actions

Dieciséis archivos en `.github/workflows/`. Regla de fondo (31-08-2026): **el
cron de GitHub nunca es reloj principal**, solo red de respaldo, porque
demostró atrasos de diez y once horas; los despertadores de verdad son rutinas
de Claude que pushean un archivo. La excepción es `doc-youtube.yml`, mensual,
donde llegar diez horas tarde no cambia nada.

| Workflow | Archivo | Disparadores (`on:`) | Para qué |
|---|---|---|---|
| Barrido | `barrido.yml` | push de `contenido/barrido/despertador.txt`; crons de red `50 4 * * *` y `20 5 * * *`; dispatch con `forzar` | Junta lo que publicó la prensa chilena (unos 22 medios) y lo deja en `contenido/barrido/`. El cron lleva `--si-falta` para no pisar jamás un barrido ya escrito. Desde el 01-11, cuando lo lanzó otro workflow por dispatch, pide `estado.yml` al terminar, porque GitHub no crea el `workflow_run` en ese caso |
| Cambiar carátula | `caratula.yml` | solo dispatch (imagen, fecha, pieza, id) | Cambia la carátula de un video YA publicado, sin entrar a Studio a mano. La imagen tiene que estar ya en `contenido/caratulas/listas/` |
| Doc de YouTube | `doc-youtube.yml` | cron `0 12 1 * *` (el día 1 de cada mes); dispatch | Abre el pedido mensual a GPT para traer las políticas de YouTube al repo (`prompts/doc-youtube.md`, `scripts/pedir-doc-youtube.js`), porque el proxy de las sesiones de Claude bloquea `support.google.com` y el skill `caratula` necesita la regla delante |
| Edición diaria | `edicion-diaria.yml` | push de `contenido/revisiones/`, `contenido/guiones/informe/` o `contenido/guiones/claves/`; cron de red `0 8 * * *`; dispatch con fecha y `forzar` | La fábrica: voz Azure, render 1440p, Short, carátulas, release, subida a YouTube programada (informe 06:30, Short 12:00, Clave 14:00 por defecto, variables `YT_HORA_*`), podcast. **Es el timbre, no el despertador**: lo toca la última pieza que el render necesita |
| Estado de la Clave | `estado-clave.yml` | push de `contenido/claves/flujo/`, `contenido/claves/*.md`, `contenido/guiones/claves/` o `contenido/veredictos/clave-*`; `workflow_run` de Edición diaria; cron `23 */4 * * *`; dispatch | El estado del flujo propio de la Clave, separado a propósito del diario. El cron de cada cuatro horas existe para que la espera entre reintentos de los paneles y el reintento del render tengan quien vuelva a mirar |
| Estado del día | `estado.yml` | push de las carpetas de contenido y de `contenido/veredictos/`; `workflow_run` de Barrido y de Edición diaria; dispatch | Escribe la vista del estado en `contenido/estado/FECHA.md`, emite la etapa al PR #6 y despierta a la validadora por API. Desde el 01-11 la marca de disparo lleva el commit de la pieza, para que una pieza reescrita en la misma vuelta se vuelva a validar |
| Guardia | `guardia.yml` | push de `contenido/urgente/despertador.txt`; cron de red `40 1-23/2 * * *` (desde el 01-11); dispatch con `ventana` | Barrido liviano de última hora cada 2 horas entre las 08:00 y las 22:00 de Chile. El cron de red se retira si el reloj corrió hace menos de 90 minutos y termina en rojo si perdió una pasada entera, porque el 14 y el 15-10 la guardia calló dos días sin que nadie lo notara |
| Lector automático | `lector.yml` | push de `contenido/urgente/PEDIDO-*.md`; dispatch con `slug` | Corre el lector de páginas donde SÍ hay red y deja el `FUENTE-` en el repo. Nació el 24-09 porque, con GPT caído, la guardia se quedó sin poder hacer Shorts |
| Métricas | `metricas.yml` | push de `bitacora/metricas/despertador.txt`; crons de red `30 9 * * *` y `0 11 * * *`; dispatch | Baja las cifras del canal a `bitacora/metricas/FECHA.md` (más el json de los deltas y las impresiones de la Reporting API) y redibuja el panel |
| Pedido a GPT | `pedido-gpt.yml` | push de `contenido/urgente/PEDIDO-*.md`; dispatch | Emite al PR #6 el pedido que Claude no puede cumplir (entrar a una página o generar una imagen), en su propio archivo de evento para no pisar el dedup de la cadena diaria |
| Privacidad de un video | `privacidad.yml` | solo dispatch (id, privacidad) | Cambia la privacidad de un video YA subido (`scripts/youtube-privacidad.js`). Nace el 28-09, cuando hubo que retirar a mano en Studio una edición reemplazada. No borra nada: borrar es irreversible y no lo decide un workflow |
| Prueba de voz | `prueba-voz.yml` | solo dispatch (fecha, entrada, secciones, fondo) | Rinde una muestra del informe CON VOZ REAL para escuchar un cambio de lo que se dice antes de que entre al aire. Nace el 27-09. No commitea nada: deja el mp4 en el release `prueba-voz`. Sin cron porque cada corrida gasta cupo de Azure |
| Reintento del despertar | `reintento.yml` | push de `contenido/estado/reintento-despertador.txt`; cron `*/20 4-9 * * *`; dispatch | Vuelve a tocarle el timbre a GPT cuando no responde (regla 20 y 20: a los 40 minutos escribe `plan-b.txt`), reintenta las etapas del reparto, relanza el Barrido desde las 01:48 si el despertador no trae la marca de hoy, y desde el 01-11 pide `estado.yml` si hay barrido y no hay vista. El 22-09 la cadena quedó parada nueve horas por falta de un reintento |
| Short exprés | `short-expres.yml` | push de `contenido/urgente/GUION-*.md`; dispatch con `guion` | Produce el Short vertical de piel vino del hallazgo de la guardia, lo sube público y deja la marca `SUBIDO-`, que además deduplica si el guion se pushea dos veces |
| Taller de voz | `taller-voz.yml` | solo dispatch (ronda, voces, texto, procesar) | Sintetiza el mismo párrafo en varias variantes de SSML para escucharlas seguidas. Sin cron a propósito: gasta cupo de Azure, se corre cuando hay algo que decidir |
| Web | `web.yml` | push de las carpetas publicables (`informes`, `revisiones`, `claves`, `casos`, `videos`, `podcast`) y de `web/`; dispatch | Publica el diario (Astro) en https://entender.sinodev.cl (Cloudflare Pages, desde el 01-11-2026) y en la copia vieja de GitHub Pages, que sigue saliendo porque Spotify lee el feed del podcast de ahí. La revisión es la que abre la compuerta: sin ese push, el informe aprobado se queda fuera del sitio |
