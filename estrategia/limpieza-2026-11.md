# Limpieza del repo para la Estrategia A (13-11-2026)

Encargo de Santiago: aprobar la Estrategia A "Chile en mapas y datos"
(`estrategia/propuesta-2026-11.md`) y dejar el repo "livianito". Todo se hizo
en la rama `estrategia-a`, en commits separados y reversibles con `git revert`.
Clasificación: **SIRVE** (se queda tal cual o casi), **REEMPLAZAR** (su función
sigue pero la hace otra pieza), **BORRAR** (muerto; vive en la historia de git)
y **ARCHIVO** (dudoso, movido a `archivo/` porque depende de una decisión de
Santiago). El flujo que queda está en `docs/FLUJO.md`.

## Conteo antes y después

| Pieza | Antes (main, 12-11-2026) | Después (rama `estrategia-a`) |
|---|---|---|
| Workflows en `.github/workflows/` | 14 | 8 (7 que siguen + `producir.yml`) |
| Crons de GitHub | 9 entradas en 7 workflows | 3 (barrido, métricas, doc mensual) |
| Rutinas de Claude encendidas | 12 (más la cadena del PR #5) | 3 (plan semanal, revisión diaria, observatorio semanal) |
| Prompts vivos en `prompts/` | 27 | 11 vivos + 8 avisos de retiro de 5 líneas (se borran cuando sus rutinas estén apagadas) |
| Scripts en `scripts/` | 60 | 9 (el motor nuevo vive en `video/scripts/`) |
| Motor de video | `src/` (18 archivos, Remotion 4 viejo, React 18) | `video/` (copia de En Números Rojos con mapa de Chile y satélite de Línea Punteada) |
| Skills del repo | 7 | 5 |
| `archivo/` | 249 archivos, 100 MB | 143 archivos, 6,6 MB (se sacaron 95 MB del taller y de la biblioteca; entró el carril escrito) |

## Workflows

| Workflow | Veredicto | Motivo |
|---|---|---|
| `barrido.yml` | SIRVE | Es el banco de temas fechado y con fuentes. Queda con un solo cron y sin el evento a GPT ni el recálculo del estado. |
| `metricas.yml` | SIRVE | Indispensable para la compuerta. Un solo cron; el despertador queda como botón de la revisión diaria. Sale el paso del panel del Taller. |
| `pedido-gpt.yml` | SIRVE | Canal de carátulas de TODOS los canales de Santiago (skill `caratulas-con-gpt`). |
| `caratula.yml` | SIRVE | Cambiar la carátula de un video ya subido. |
| `privacidad.yml` | SIRVE | Cambiar la privacidad de un video ya subido. |
| `doc-youtube.yml` | SIRVE | Políticas de YouTube al día, una vez al mes. |
| `web.yml` | SIRVE | Mantiene viva la web con lo ya publicado (casos, claves, informes viejos). |
| `edicion-diaria.yml` | REEMPLAZAR por `producir.yml` | Producía el informe en video (apagado), el Short de "cinco cosas" y la Clave; todo eso lo reemplaza el formato nuevo. Borrado. |
| `estado.yml` | ARCHIVO (`archivo/carril-escrito/`) | Máquina de estados del informe diario de GPT. Se pausa con el carril escrito. |
| `reintento.yml` | ARCHIVO (`archivo/carril-escrito/`) | Unas 54 corridas diarias para reanimar a GPT en tiempo real; sin cadena diaria no hace falta. |
| `estado-clave.yml` | BORRAR | Flujo de "Entender el caso" con cron cada 4 h para 1 largo por semana. El largo nuevo sale del plan semanal. |
| `guardia.yml` | BORRAR | Apagada desde el 04-11-2026. |
| `lector.yml` | BORRAR | Apagado desde el 04-11-2026. |
| `short-expres.yml` | BORRAR | Apagado desde el 04-11-2026. |
| `producir.yml` (nuevo) | nuevo | Paso 2 del flujo: render y subida programada por push de guiones. |

## Rutinas de Claude en la nube (no se tocan desde el repo: lista para el momento de fusionar, `docs/FLUJO.md` §5)

| Rutina | Veredicto | Motivo |
|---|---|---|
| Plan semanal (era "Tema de la semana", `trig_01BLVuzow3cvDVY6ffn7okKL`) | REEMPLAZAR (se reutiliza) | Paso 1 del flujo, jueves 17:30. |
| Revisión diaria (era "Mejora diaria", `trig_012bFrH9XnJMjV74uHxVYz8c`) | REEMPLAZAR (se reutiliza) | Paso 3, 10:30, Sonnet. |
| Observatorio de plata pública (`trig_01MzKjYwnyH8PfJfCBrtJvv4`) | SIRVE, de diaria a semanal | Alimenta temas (Contraloría, municipios) y la sección de la web. |
| Reloj del reintento A, B y C | BORRAR (apagar) | Despertadores de `reintento.yml`, 15 disparos por noche, duplicados con su propio cron. |
| Reloj del barrido | BORRAR (apagar) | Cuarto camino al mismo barrido; el cron basta porque ya nadie espera al barrido a una hora. |
| Reloj de métricas | BORRAR (apagar) | Duplicaba los dos crons de `metricas.yml`. |
| La validadora (5 roles) | BORRAR (apagar) | Validación pieza por pieza con Opus 3 a 4 veces al día; la reemplazan los validadores mecánicos de `video/` y el revisor del jueves. |
| Red del validador | BORRAR (apagar) | Red de la anterior. |
| Vigía | BORRAR (apagar) | Vigilaba la madrugada que ya no existe. |
| Auditoría matinal | BORRAR (apagar) | Quinta lectura del mismo estado; la reemplaza la revisión diaria. |
| Re-check del PR #5 (18 rutinas de un disparo) | BORRAR (cerrar el PR #5) | Se corta cerrando el PR, no apagando rutinas. |
| Cadena nocturna sin GPT, informe de la mañana, guardián viejo, guardia | ya apagadas | Borrarlas desde claude.ai cuando se pueda. |

## Prompts

| Prompt | Veredicto | Motivo |
|---|---|---|
| `plan-semanal.md` (nuevo) | nuevo | Paso 1. |
| `revision-diaria.md` (nuevo) | nuevo | Paso 3. |
| `contrato-archivos.md` | SIRVE | Lo citan los pedidos a GPT. |
| `despachador-gpt.md` | SIRVE | Prompt de la tarea de GPT; desde ahora solo le llegan pedidos (`flujo=pedido`). |
| `imagen-caratula.md`, `caratula-pedido.txt`, `caratula-caso.md` | SIRVE | Carátulas de este canal y de los hermanos. |
| `lector-gpt.md` | SIRVE | Prompt por defecto de un pedido de lectura. |
| `doc-youtube.md` | SIRVE | Pedido mensual de políticas. |
| `caso-seguimiento.md` | SIRVE | Observatorio. |
| `README.md` | REEMPLAZAR (reescrito) | Describía la cadena vieja. |
| `seleccion.md`, `informe.md`, `guion-informe.md`, `web.md`, `CALIDAD.md` | ARCHIVO (`archivo/carril-escrito/prompts/`) | Carril escrito en pausa. |
| `validador.md`, `suplente.md`, `vigia.md`, `auditoria-matinal.md`, `seguimiento-temas.md`, `tema-semana.md`, `pauta-clave.md`, `guardia-reloj.md` | REEMPLAZAR por aviso de retiro | Los leen rutinas que se apagan al fusionar; el aviso las hace terminar sin escribir si despiertan antes. Texto completo en `archivo/carril-escrito/prompts/`. Borrar los avisos cuando las rutinas estén apagadas. |
| `claves.md`, `guion-claves.md`, `investigacion-clave.md`, `eleccion-clave.md`, `mural-clave.md` | BORRAR | Flujo de la Clave y su mural de paneles. |

## Scripts (`scripts/`)

| Script | Veredicto | Motivo |
|---|---|---|
| `barrido.js`, `metricas.js`, `impresiones.js` | SIRVE | Banco de temas y métricas. |
| `youtube-auth.js`, `youtube-caratula.js`, `youtube-privacidad.js` | SIRVE | OAuth local y los dos workflows de video subido. |
| `pedir-doc-youtube.js` | SIRVE | Doc mensual. |
| `casos.js` | SIRVE | Índice del observatorio para la web. |
| `imagen-entera.js` | SIRVE | Verifica que una carátula de GPT llegó completa. |
| `estado.js`, `gate.js`, `pedir-caratula.js`, `revisar-mecanico.js`, `semana.js` | ARCHIVO (`archivo/carril-escrito/scripts/`) | Solo sirven a la cadena del informe. |
| `dia.js`, `short.js`, `build-timeline.js`, `parse.js`, `tts-azure.js`, `sonido.js`, `motor-sonido.js`, `sello.js`, `miniaturas.js`, `secuencia-plan.js`, `texto-bloques.js`, `pausas.js`, `numerales.js`, `validar-solapes.js`, `validar-tarjetas.js`, `imagenes-secciones.js`, `mezclar-voz.js`, `mock-tts.js`, `largo-diario.js`, `diario-captura.js`, `slug-noticia.js` (+ test), `chapters.js`, `podcast-subir.js`, `youtube-subir.js` | REEMPLAZAR por `video/` | Motor viejo del informe, del Short de cinco cosas y del podcast. La voz Azure pasa a ser respaldo dentro de `video/`. |
| `clave.js`, `clave-mural.js`, `clave-musica.js`, `guion-de-clave.js`, `estado-clave.js`, `mural-coser.js`, `mural-flujo.js`, `mural-guion.js`, `mural-pedido.js`, `mural-velos.js` | BORRAR | La Clave y su mural de paneles. |
| `taller.js`, `bandeja.js`, `botones.js`, `panel-cronograma.js`, `panel-auditoria.js` | BORRAR | El Taller y la Bandeja, que nadie mira desde el 04-11-2026. |
| `guardia.js`, `lector.js`, `short-urgente.js`, `verificar-expres.js` | BORRAR | Guardia, lector y exprés, apagados. |
| `metricas-studio.js`, `cron.txt` | BORRAR | Pedían entrar al crontab del PC y al piloto, que no ve la cuenta de este canal. El canal no debe estar en el crontab. |

## Carpetas y archivos

| Ruta | Veredicto | Motivo |
|---|---|---|
| `video/` (nuevo) | nuevo | Motor del formato nuevo, autocontenido. |
| `contenido/semana/` (nuevo) | nuevo | Guiones de cada semana y sus marcas de hecho. |
| `contenido/barrido/`, `contenido/temas/`, `contenido/casos/` | SIRVE | Banco de temas. |
| `contenido/informes/`, `claves/`, `guiones/`, `revisiones/`, `veredictos/`, `preseleccion/`, `estado/`, `descripciones/`, `podcast/`, `videos/` | SIRVE como histórico | Las lee la web. No crecen más mientras el carril escrito esté en pausa. |
| `src/`, `ejemplos/`, `public/`, `tsconfig.json` | BORRAR | Motor viejo y sus fondos, música, fuentes y fotos. |
| `archivo/taller*`, `archivo/contenido-taller`, `archivo/contenido-biblioteca` | BORRAR | 95 MB del Taller y la biblioteca de imágenes del informe, retirados el 01-11. |
| `bitacora/taller.json`, `bitacora/taller/`, `bitacora/bandeja.json` | BORRAR | Datos del Taller y la Bandeja. |
| `bitacora/panel-interno.html` | SIRVE | Gráfico de métricas que `metricas.js` refresca solo. |
| `.claude/skills/madrugada`, `noche` | BORRAR | Revisaban la cadena de madrugada. |
| `.claude/skills/revision` | REEMPLAZAR | Reescrita para el flujo nuevo. |
| `.claude/skills/despegue` | REEMPLAZAR (actualizada) | Flujo y reglas nuevas. |
| `.claude/skills/bitacora`, `encargo`, `caratula` | SIRVE | Cierre de sesión, delegar y revisar carátulas. |
| `package.json` raíz | REEMPLAZAR | Solo `googleapis` (métricas y utilidades); Remotion vive en `video/`. |

## PR 7 y PR 8

Quedan **obsoletos**: los dos mejoraban los primeros segundos del Short viejo
(`src/Short.tsx` y `scripts/short.js`), y esos archivos ya no existen en esta
rama. Lo que pedían (gancho en el fotograma 0, nada de "cinco cosas") está en
el contrato del Short nuevo. Santiago puede cerrarlos.

## Pregunta abierta para Santiago: el carril escrito

El diario de la web y el podcast de Spotify salían del informe diario de GPT
con la validación de Claude, que era casi todo el gasto. En la rama quedan
**en pausa** (archivo, no borrado). No hay dato de lectores ni de oyentes en
el repo. Si los tienen y quieres conservarlos, se reactiva con los pasos de
`archivo/carril-escrito/README.md`, pero cuesta lo que costaba.
