# Rutinas de la nube y workflows: el inventario

**Última actualización: 26-09-2026.**

## Para qué existe

Listar las rutinas de Claude por API cuesta unos **75 KB por llamada** (el
volcado trae el prompt completo de cada una), y una sesión que quiere saber
"¿quién toca el barrido?" paga ese precio entero para leer una línea. Esta
tabla responde eso gratis. Lo mismo con los workflows: en vez de abrir
trece archivos YAML, se lee una fila.

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

- Las filas marcadas **API** salen del volcado de la API del 26-09-2026.
- Las marcadas **a mano** son rutinas creadas ese mismo día, posteriores al
  volcado.
- Las marcadas **repo** salen de la cabecera del prompt vivo de cada rutina
  (`prompts/*.md`), de `bitacora/cronograma.json` y de las bitácoras. El
  volcado que se guardó quedó en la **página 1 de 2** (20 rutinas de más de 20,
  `has_more: true`, y las dos copias guardadas resultaron idénticas), así que
  las rutinas de producción de la madrugada no vinieron por esa vía. Cuando
  alguien vuelva a volcar la API completa, conviene cerrar los "no consta".

Hora de Chile = UTC menos 3.

## Rutinas de Claude en la nube

`Creada desde`: **http_api** significa que se puede editar desde la sesión
local; **meta_mcp** y **web** significan que solo se toca desde claude.ai.

| Hora de Chile | Rutina | ID | Encendida | Modelo | Creada desde | Para qué | Dato |
|---|---|---|---|---|---|---|---|
| 01:10, 02:10, 03:10, 04:10 y 05:10 (`10 4-8 * * *`) | Reloj del reintento A | `trig_016JsVfFwrJFut5vy2f4c8TS` | sí | Haiku 4.5 | http_api | Aprieta el botón de `reintento.yml`: toca `contenido/estado/reintento-despertador.txt` y pushea, porque el cron de GitHub no disparó en ventana el 24, 25 ni 26-09 | API (el volcado todavía la muestra con `10 4-7`, antes de extenderla hoy) |
| 01:30 | Reloj del barrido | `trig_01W5KEjHbr5wWPsmmJ4ygNEh` | sí | Haiku | no consta | Toca `contenido/barrido/despertador.txt` y pushea: ese push dispara el Barrido. Existe porque el cron de GitHub llegaba con 11 horas de atraso | repo |
| 01:30, 02:30, 03:30, 04:30 y 05:30 (`30 4-8 * * *`) | Reloj del reintento B | `trig_01E8tyJPqyfNdVTog477sf6Z` | sí | Haiku | http_api | Igual que el A, corrido veinte minutos, para que la ventana quede cubierta cada veinte | a mano (26-09) |
| 01:45 | Observatorio de plata pública | `trig_01MzKjYwnyH8PfJfCBrtJvv4` | sí | Opus | no consta | Busca novedades verificables de cada caso en seguimiento y actualiza los dossiers de "¿En qué quedó?" que publica la web | repo |
| 01:50, 02:50, 03:50, 04:50 y 05:50 (`50 4-8 * * *`) | Reloj del reintento C | `trig_01RevKvPn6mufpcUCK9fii2X` | sí | Haiku | http_api | Igual que el A, corrido cuarenta minutos | a mano (26-09) |
| 01:55 (`55 4 * * *`) | Cadena nocturna sin GPT: escribir Y reparar hasta aprobar | `trig_01NscKtv2hPKqkV6ft8X6GKG` | **apagada el 26-09** | el de la cuenta (no declarado) | meta_mcp | Plan B de la caída de ChatGPT: escribe las piezas que falten y después entra en un bucle de dos minutos aplicando las `Correcciones:` hasta que la etapa sea `aprobada`. Sesión persistente con el repo clonado | API (el volcado del mediodía todavía la muestra encendida) |
| 01:55 | Respaldo de la preselección (plan B del 24-09) | `trig_01CEfUBNnqtRYgEgyYhYocUU` | **borrada el 26-09** | no consta | http_api | La reemplazó la Cadena nocturna. El ID ya devuelve 404 | repo |
| 02:15 y 05:15 | Vigía de la cadena | `trig_01LUtn4fSJjBsCzqdoWeVviH` | sí | no consta | no consta | Mira si algún eslabón falta a destiempo o si el estado quedó en `bloqueado_humano`, y avisa al teléfono. No escribe ni repara nada | repo |
| 02:20 (reloj de red; lo normal es que la despierte `estado.yml` por API en cada `validar_*`) | Validador y Suplente | `trig_01B8tLFaXe7h1YBCciFE2iKf` | sí | Opus | no consta | **Dos roles desde el 26-09.** Validador: lee el prompt de la pieza y verifica requisito por requisito, y escribe `contenido/veredictos/`. Suplente: mientras exista `contenido/estado/plan-b.txt`, hace el turno de GPT en las etapas que dice su línea `turnos:` | repo |
| 02:35 | Respaldo del informe (plan B del 24-09) | `trig_01VU2rZ6AejJCNC1tY7imx9Q` | **borrada el 26-09** | no consta | http_api | La reemplazó la Cadena nocturna. El ID ya devuelve 404 | repo |
| 03:15 | Respaldo del guion (plan B del 24-09) | `trig_01TgYrtBrSEKqpzwiTnPRUDH` | **borrada el 26-09** | no consta | http_api | La reemplazó la Cadena nocturna. El ID ya devuelve 404 | repo |
| por webhook de cualquier push, con reloj de respaldo a las 03:35 | Guionista (informe y Clave) | `trig_01HUjC4MjKGmmpDMApn8gtJm` | sí | no consta | no consta | En cada disparo mira qué guion falta y escribe el que corresponda. Fusionada el 07-09: un solo webhook sirve a las dos piezas | repo |
| 03:50 | Guionista de la Clave (segunda red por reloj) | `trig_017nkjJWR5Voud4dYgPhvwF7` | sí | no consta | no consta | Red del guionista fusionado; su dedup la hace callar cuando el otro ya escribió | repo |
| 04:45 | Red del validador | `trig_01CR3g2re9G7warvfdt4MfMS` | sí | Opus | no consta | Si la corrida temprana no dejó veredicto, esta lo hace antes de la edición | repo |
| 05:00 | Reloj de métricas | `trig_01MxzGdh2P489TmgkUi9spWd` | sí | Haiku | no consta | Toca `bitacora/metricas/despertador.txt` y pushea: ese push dispara el workflow de Métricas | repo |
| 05:30 (`30 8 * * *`) | Auditoría matinal | `trig_01GDbvJ1Wjzy25bnVRCXgygZ` | sí | no consta | no consta | Audita la madrugada con las métricas ya en el repo: horas reales contra esperadas, vueltas de corrección, hallazgos, triage HOY / AGUANTA / MIRAR, y baja sus HOY a PENDIENTES | repo |
| 06:00 | Informe de la mañana (el guardián v2) | `trig_01Dk4PXRmGEMPHzrvs6amTgf` | sí | Opus | http_api | Verifica pieza por pieza la edición y arma el informe diario para el teléfono de Santiago. Su respuesta ES el informe | repo |
| 08, 10, 12, 14, 16, 18, 20 y 22 (`0 23,1,11,13,15,17,19,21 * * *`) | Guardia (reloj, redactor y mensajero) | `trig_01HLSWkJ8VpVFPuxQ51YiG4d` | sí | no consta | no consta | Barrido liviano de última hora con criterio mecánico; si caza algo, redacta el guion exprés, espera la marca `SUBIDO-` y avisa al teléfono con el link | repo |
| cada 4 horas, sin hora fija | Re-check PR #5 (**una sola fila para dieciocho rutinas**) | el vivo hoy es `trig_01Jw1QAE68ZZ1NQsnshyBgez`; los otros diecisiete quedan `enabled: false` | sí (uno a la vez) | el de la cuenta (no declarado) | meta_mcp | Cadena de recordatorios de un solo disparo que se reagenda sola cada cuatro horas para mirar el PR #5, sesión persistente `session_01GZbDrbTYnw545j1wKZXtt1`. Dieciocho entre el 23 y el 26-09. **Se corta cerrando o fusionando el PR #5**, no apagando rutinas | API |
| antes 04:45 | Revisión editorial (Sonnet) | `trig_019cchTdDCVeVzVh8HjrZrYG` | **apagada el 10-09** | Sonnet | no consta | Corría antes de que la revisión pasara a Opus y se acercara a las 02:20 | repo |
| sin hora | Revisión editorial en Fable | `trig_012mLfmCi2jDoiS3zRFqETy8` | no (rota) | Fable | no consta | Quedó inservible por falta de créditos de Fable. Una rutina no cae sola a otro modelo: si no puede correr, no corre | repo |
| antes 03:30 | Respaldo de la preselección (original) | `trig_01CVyy1m21cpCGHk9sKfVY9r` | **apagada el 04-09** | no consta | web | Apagada la misma noche en que se creó, porque el disparo por PR funcionó. Como la creó la web, solo Santiago puede reactivarla | repo |
| Domingos 09:00 (`0 12 * * 0`) | Tema de la semana | `trig_01BLVuzow3cvDVY6ffn7okKL` | sí | Opus | http_api | Corre `scripts/semana.js` sobre los informes de lunes a sábado y escribe los tres candidatos de `contenido/claves/semana/AAAA-Www-candidatos.md` con `prompts/tema-semana.md`; si el archivo ya existe, no lo pisa. Creada el 26-09 | API |

**Veintidós filas**, y la del PR #5 resume dieciocho rutinas, así que cubre
treinta y nueve rutinas en total.

## Workflows de GitHub Actions

Trece archivos en `.github/workflows/`, todos con `workflow_dispatch`. Los
tres que faltan respecto del 25-09 (`prueba-flujo.yml`, `senal-informe.yml` y
`senal-preseleccion.yml`) se retiraron a `archivo/workflows/` el 26-09-2026:
ver `archivo/README.md`. Regla de fondo (31-08-2026): **el
cron de GitHub nunca es reloj principal**, solo red de respaldo, porque demostró
atrasos de diez y once horas; los despertadores de verdad son rutinas de Claude
que pushean un archivo.

| Workflow | Archivo | Disparadores (`on:`) | Para qué |
|---|---|---|---|
| Barrido | `barrido.yml` | push de `contenido/barrido/despertador.txt`; crons de red `50 4 * * *` y `20 5 * * *`; dispatch con `forzar` | Junta lo que publicó la prensa chilena (unos 22 medios) y lo deja en `contenido/barrido/`. El cron lleva `--si-falta` para no pisar jamás un barrido ya escrito |
| Cambiar carátula | `caratula.yml` | solo dispatch (imagen, fecha, pieza, id) | Cambia la carátula de un video YA publicado, sin entrar a Studio a mano. La imagen tiene que estar ya en `contenido/caratulas/listas/` |
| Edición diaria | `edicion-diaria.yml` | push de `contenido/revisiones/`, `contenido/guiones/informe/` o `contenido/guiones/claves/`; cron de red `0 8 * * *`; dispatch con fecha y `forzar` | La fábrica: voz Azure, render 1440p, Short, carátulas, release, subida a YouTube, podcast. **Es el timbre, no el despertador**: lo toca la última pieza que el render necesita |
| Estado de la Clave | `estado-clave.yml` | push de `contenido/claves/flujo/`, `contenido/claves/*.md`, `contenido/guiones/claves/` o `contenido/veredictos/clave-*`; `workflow_run` de Edición diaria | El estado del flujo propio de la Clave (CLAVE 4), separado a propósito del diario para no tocar la cadena de la madrugada al construirlo |
| Estado del día | `estado.yml` | push de las carpetas de contenido y de `contenido/veredictos/`; `workflow_run` de Barrido y de Edición diaria | Escribe la vista del estado en `contenido/estado/FECHA.md`, emite la etapa al PR #6 y despierta al validador por API. El `workflow_run` está porque los pushes de Actions con `GITHUB_TOKEN` no disparan workflows |
| Guardia | `guardia.yml` | push de `contenido/urgente/despertador.txt`; dispatch con `ventana` | Barrido liviano de última hora cada 2 horas entre las 08:00 y las 22:00 de Chile. Sin cron de respaldo: perder una pasada no pierde nada que la siguiente no recupere |
| Lector automático | `lector.yml` | push de `contenido/urgente/PEDIDO-*.md`; dispatch con `slug` | Corre el lector de páginas donde SÍ hay red y deja el `FUENTE-` en el repo. Nació el 24-09 porque, con GPT caído, la guardia se quedó sin poder hacer Shorts |
| Métricas | `metricas.yml` | push de `bitacora/metricas/despertador.txt`; crons de red `30 9 * * *` y `0 11 * * *` | Baja las cifras del canal a `bitacora/metricas/FECHA.md` (más el json de los deltas) y redibuja el panel |
| Pedido a GPT | `pedido-gpt.yml` | push de `contenido/urgente/PEDIDO-*.md` | Emite al PR #6 el pedido que Claude no puede cumplir (entrar a una página o generar una imagen), en su propio archivo de evento para no pisar el dedup de la cadena diaria |
| Reintento del despertar | `reintento.yml` | push de `contenido/estado/reintento-despertador.txt`; cron `*/20 4-9 * * *` | Vuelve a tocarle el timbre a GPT cuando no responde, y desde el 24-09 también relanza el Barrido si la cadena nunca arrancó. El 22-09 la cadena quedó parada nueve horas por falta de un reintento |
| Short exprés | `short-expres.yml` | push de `contenido/urgente/GUION-*.md`; dispatch con `guion` | Produce el Short vertical de piel vino del hallazgo de la guardia y deja la marca `SUBIDO-`, que además deduplica si el guion se pushea dos veces |
| Taller de voz | `taller-voz.yml` | solo dispatch (ronda, voces, texto, procesar) | Sintetiza el mismo párrafo en varias variantes de SSML para escucharlas seguidas. Sin cron a propósito: gasta cupo de Azure, se corre cuando hay algo que decidir |
| Web | `web.yml` | push de las carpetas publicables (`informes`, `revisiones`, `claves`, `casos`, `videos`, `podcast`) y de `web/` | Publica el sitio (Astro) en el repo público `entender-chile-web`. La revisión es la que abre la compuerta: sin ese push, el informe aprobado se queda fuera del sitio |
