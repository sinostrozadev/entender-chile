# archivo/: lo que ya cumplió su función

Nada del proyecto se borra: lo que dejó de ser criterio vivo se retira aquí,
con una línea que diga qué fue y dónde vive hoy lo que lo reemplazó. Regla de
la propuesta de orden del 02-09 (`archivo/bitacora/2026-09-02-orden-del-repo.md`).

- `plan-produccion.md` (de estrategia/): plan por fases del arranque. Fases
  0 a 3 cumplidas al 30-08; la 4 vive en `bitacora/PENDIENTES.md` y la 5 en
  `estrategia/modelo-de-negocio.md`.
- `musica.md` (de prompts/): prompts para pedir la cama musical. Superado
  por la decisión del 27-08: sin cama, sonido sintetizado por código
  (`scripts/sonido.js`).
- `ejecutar.md`, `IMPLEMENTAR.md`, `hechas.md` (de ideas/): tres listas de
  backlog sin movimiento desde el 27-08; nada pasó nunca de ejecutar a
  hechas. El backlog vivo es `bitacora/PENDIENTES.md`; lo cumplido,
  `bitacora/REALIZADOS.md`. Ojo: `IMPLEMENTAR.md` aún trataba la voz clonada
  como requisito (disputa 2 de `REGLAS-DURAS.md`).
- `prompts/banco-temas.md` (de prompts/) - prompt de la etapa diaria
  `alimentar_banco`, retirada el 26-09-2026. El banco crecía y nadie elegía de
  él; hoy los temas de la Clave salen del barrido semanal (`scripts/semana.js`)
  y del prompt del domingo (`prompts/tema-semana.md`). El banco en sí queda
  congelado y sin tocar en `contenido/claves/banco-temas.md`.
- `timeline-schema.md` (de docs/): describía el esquema del timeline
  anterior al 27-08: hoy desinforma. Si vuelve a hacer falta un esquema, se
  regenera desde `scripts/build-timeline.js`, que es la verdad.

## Limpieza del 26-09-2026 (propuesta `archivo/bitacora/2026-09-26-propuesta-limpieza-y-taller.md`)

Prompts de flujos que ya no existen. Los seis salieron de `prompts/`, que
desde acá vuelve a ser solo lo vivo:

- `prompts/guionista.md` - prompt del guionista de Claude (informe y Clave),
  fusionado el 07-09. Desde la cadena lineal v3 del 14-09 el guion lo escribe
  GPT por turno (`prompts/guion-informe.md`, `prompts/guion-claves.md`) y
  Claude solo valida (`prompts/validador.md`).
- `prompts/revision-editorial.md` - la revisión de las 04:45. La absorbió el
  validador en su etapa `validar_final`, que es quien deja
  `contenido/revisiones/` y abre la compuerta del render.
- `prompts/prueba-flujo.md` y `prompts/prueba-validador.md` - el bucle de
  prueba de la máquina v2 (GPT escribe, Claude valida, sobre
  `contenido/pruebas/flujo/`). La v3 en producción desde el 15-09 es esa misma
  prueba hecha de verdad, así que el simulacro sobraba.
- `prompts/respaldo-informe.md` y `prompts/respaldo-preseleccion.md` - las
  rutinas que los leían se borraron el 26-09. El respaldo hoy es el suplente
  con la regla 20 y 20 (`prompts/suplente.md`, dentro del validador).

Workflows retirados a `archivo/workflows/`. Ninguno queda en
`.github/workflows/`, así que dejan de aparecer en la interfaz de Actions:

- `prueba-flujo.yml` - el eslabón de Actions del bucle de prueba de arriba.
  Seguía ACTIVO en GitHub y su propia cabecera decía que se podía borrar.
- `senal-informe.yml` y `senal-preseleccion.yml` - las señales #3 y #4, que
  reseteaban las ramas `automatizacion/informe-listo` y
  `automatizacion/preseleccion-lista` para despertar a las tareas viejas de
  GPT. Deshabilitadas a mano en GitHub desde el 14-09, cuando el PR #6
  "Estado del día" pasó a ser el único disparador
  (`prompts/despachador-gpt.md`). El inventario de `bitacora/rutinas.md`
  quedó en trece workflows.

Taller viejo (02-09), a `archivo/taller/` y `archivo/scripts/`:

- `taller/app.js`, `taller/body.html`, `taller/head.html` y
  `scripts/taller.js` - el navegador de archivos con editor y diff que se
  armaba en un HTML. Lo reemplaza el Taller de una página, hoy
  `scripts/taller.js`, que pasará a llamarse `scripts/taller.js`.

Carpeta `revisar/` completa, a `archivo/revisar/`. Su propio README decía que
nada de ahí participaba del día a día y llevaba un mes esperando decisión:

- `revisar/generar.js` - el plan B por API que generaba la edición si GPT no
  pusheaba. Decisión consciente del 28-08: no se usa la API. El plan B de hoy
  es el suplente y los relojes de reintento.
- `revisar/propuesta-pipeline-editorial.md` - la propuesta del 26-08 de
  separar el pipeline en etapas. Se implementó (barrido, `seleccion.md`, olla
  commiteada), pero recomendaba lo contrario de lo decidido. Queda como
  registro de cómo se llegó acá.
- `revisar/guion-real-2026-08-23.md` - duplicado de
  `ejemplos/guion-2026-08-23.md`, que es el que citan los scripts.
- `revisar/README.md` - la lista de decisiones pendientes de esa carpeta,
  todas cerradas por esta limpieza.
- BORRADOS de verdad: `revisar/informe-claude.mp3` y `revisar/logo-claude.mp3`
  (800 KB de camas musicales alternativas de una prueba). El canal no usa
  cama musical desde el 27-08: el sonido lo sintetiza `scripts/sonido.js`.
- `revisar/temario maestro historia de Chile.md` NO se retiró: es material de
  una serie posible, así que se movió a `ideas/historia-de-chile-temario.md`,
  sin tocarlo por dentro.

Ejemplos superados, a `archivo/ejemplos/`:

- `ejemplos/demo-cambios-02-09.js`, `ejemplos/fondos-lamina.tsx` y
  `ejemplos/fondos-video.tsx` - demos de los fondos de lámina y de video. Los
  reemplaza `src/taller-secciones.tsx`, que rinde las variantes reales. Se
  quedan en `ejemplos/` los tres que sí se usan: `guion-2026-08-23.md`,
  `timeline.ejemplo.json` (lo lee el build) y `short-urgente-demo.tsx`.

Evidencia y datos congelados:

- Las siete `bitacora/capturas-*.jpg` (06, 08 y 15-09), a
  `archivo/capturas/`. Son la evidencia de decisiones visuales ya cerradas
  (tarjetas, titulares en un párrafo, sello del short, carátulas).
- `bitacora/panel/consumo.json` y `bitacora/panel/madrugadas.json`, a
  `archivo/bitacora-panel/`. Nadie los escribe ni los lee desde el 01-09; el
  panel interno solo los nombraba como histórico y ahora apunta acá.

Documentación del trámite con Google, a `archivo/docs/auditoria-api/`:

- Toda `docs/auditoria-api/` menos `DECISION-07-09.md`: `RESPUESTAS.md`, el
  correo listo para enviar, el log de subida del 06-09, la respuesta a la
  revisión marcada "NO ENVIADO" y las seis capturas de prueba. El trámite se
  cerró el 07-09 con la decisión de no responder. En `docs/auditoria-api/`
  quedan la decisión y un README que dice dónde está el resto.

Scripts sin uso, a `archivo/scripts/`:

- `scripts/tts-elevenlabs.js` - la voz por ElevenLabs. La voz de producción
  es Azure (`scripts/tts-azure.js`, es-CL Lorenzo) y su respaldo cuando se
  agota el F0 gratis NO es otro proveedor: es el recurso S0 de Azure
  (`AZURE_SPEECH_KEY2` / `AZURE_SPEECH_REGION2`), que resuelve el mismo
  script por dentro. `scripts/dia.js` ya no ofrece el camino de ElevenLabs:
  tener dos proveedores escondía que la cuota se acabó, que es justo lo que
  hay que ver.
- `scripts/manana.sh` - la rutina local de la mañana del 25-08 (pull, informe
  y clave con voz simulada, y reapuntar `src/Root.tsx`). Nadie la usa desde
  que el pipeline corre en Actions; a mano queda
  `node scripts/dia.js [--clave] [--voz] [--render]`.

Fuera de git, borrados del disco local: los seis mp3 sueltos de `public/`
(70 MB de renders del 29 y 30-08, ya ignorados por `.gitignore`).

Documentación reescrita el 26-09-2026 (bloque B de la misma propuesta):

- `README-horarios-2026-09.md` (del `README.md` de la raíz) - el cuadro de
  horarios de la madrugada: cuatro tareas de ChatGPT por hora fija, Clave
  diaria, guionista de Claude, revisión de las 04:45 y las señales #3 y #4.
  Describía la máquina anterior al 14-09. El README de la raíz quedó corto y
  con la cadena lineal; el inventario al día de rutinas y workflows vive en
  `bitacora/rutinas.md`.

Ideas ya implementadas, a `archivo/ideas/`. Se retiran porque una idea hecha en
un backlog compite por la atención con las que faltan:

- `ideas/shorts-diarios.md` - la propuesta de hacer un Short vertical por
  pieza. La implementó `scripts/short.js` (y `scripts/short-urgente.js` para el
  exprés de la guardia); el Short del informe sale todos los días con la
  edición.
- `ideas/sonido-y-transiciones.md` - el estudio de qué sonidos necesita el
  canal. Lo implementó `scripts/sonido.js` con la decisión del 27-08: cero
  bancos de música y cero cama bajo la voz, todo sintetizado (sello, cortinas
  de sección, cierre).
- `ideas/voz-opciones.md` - la comparación de proveedores de voz. La cerró
  `scripts/tts-azure.js`: Azure es-CL Lorenzo al 90% de velocidad, con el
  recurso S0 como respaldo cuando se agota el F0 gratis.

## Selector de diseño de la web (01-11-2026)

- `web/selector-diseno.txt`: los scripts, los botones y el CSS que dejaban
  elegir entre el diseño 1 (revista) y el 2 (diario) con `?diseno=` y
  localStorage. Santiago fijó el 2 como único; hoy vive en
  `web/src/styles/diseno2.css`, aplicado siempre.

## Limpieza del 01-11-2026, primera parte: bancos de prueba, biblioteca y taller viejo

Pedido de Santiago del 01-11-2026: "que no haya código basura; veamos qué está
en stand by". Nada de esto corría en la edición diaria; se verificó que el
timeline de producción (informes del 30-10, 31-10 y 01-11 con voz simulada)
sale idéntico byte a byte antes y después.

Bancos de prueba de Remotion, a `archivo/src/`. Cada uno tenía su propia
entrada (`*-entry.tsx`) y solo se rendían a mano para comparar variantes; el
formato que eligió Santiago ya vive en el código de producción:

- `taller-caratulas.tsx` (23-09) y `taller-entry.tsx`: variantes de carátula.
  La carátula al aire la hace `MiniaturaV3` en `src/marca.tsx`.
- `taller-express.tsx`, `taller-herramientas.tsx`, `taller-mosaico.tsx`,
  `taller-secciones.tsx`, `taller-video.tsx` (24-09) con sus entradas: los
  fondos de tarjeta, las herramientas, el mosaico, las imágenes de sección y el
  formato del informe. Lo aprobado pasó a `src/tarjetas.tsx`,
  `src/mosaico.tsx` y `src/fondos.tsx`. La cabecera de `taller-secciones.tsx`
  sigue explicando cómo rearmar `public/secciones/` a mano.
- `taller-secuencia.tsx` (24-09) y su entrada: la secuencia completa tal como
  la dictó Santiago. Su HEREDERO es `src/secuencia.tsx`, que la portó al
  informe (`SECUENCIA=2409`); las citas de `scripts/secuencia-plan.js`,
  `scripts/prueba-video.js` y `contenido/secciones/` apuntan acá.
- `taller-entrada.tsx` (05-10): la entrada de marca para compararla. La de
  producción es `src/entrada.tsx`.
- `tablero-estilos.tsx`, `muestra-biblioteca.tsx`, `prueba-parrafo.tsx`
  (28 y 29-09) con sus entradas: las pruebas que decidieron el estilo de la
  biblioteca de dibujos (ver más abajo).
- `clave-muestra.tsx` (06-10) con `archivo/ejemplos/clave-muestra.json`: la
  muestra del formato de la Clave, que era la composición `ClaveMuestra` de
  `src/Root.tsx` (quitada de ahí). La reemplazó el mural
  (`src/clave-mural.tsx`, composición `ClaveMuralProduccion`).
- `ejemplos/guion-2026-08-23.md` y `ejemplos/short-urgente-demo.tsx`, a
  `archivo/ejemplos/`: un guion de muestra y una demo del exprés que ya no
  citaba ningún script. En `ejemplos/` quedan `timeline.ejemplo.json` y los
  `clave-*.json` que importa `src/Root.tsx`.

La biblioteca de dibujos por párrafo (29-09 a 01-11), ARCHIVADA por decisión
de Santiago del 01-11-2026. Estuvo siempre apagada (`DIBUJOS_PARRAFO=1`, que
ningún workflow encendió nunca):

- `contenido/biblioteca/` entera (56 MB: los PNG de `grabado/`, `pruebas/` y
  `pruebas-recortadas/`, `CONCEPTOS.md`, `ESTILOS.md`, `PROMPTS-CONCEPTOS.md`,
  `conceptos.json`), a `archivo/contenido-biblioteca/`.
- Sus scripts, a `archivo/scripts/`: `conteo-conceptos.js` (contaba conceptos
  en los guiones), `frases-concepto.js`, `ranura-narracion.js`,
  `dibujo-parrafo.js` (el repartidor que leía `build-timeline.js`),
  `vocabulario.js`, `recortar-imagen.js` y `revisar-imagen.js` (la puerta de
  los PNG).
- `contenido/config/ranura-narracion.json` y `contenido/config/tablero-dibujos.json`,
  a `archivo/contenido-config/`: los escribía la cadena y solo los leía el
  taller.
- `scripts/build-timeline.js` ya no requiere el repartidor ni lee
  `DIBUJOS_PARRAFO`. `scripts/parse.js` sigue tragándose la marca
  `[SIN DIBUJO]` para que la voz no la lea si un guion la trae.
- Lo que NO se movió: `src/fondo-biblioteca.tsx` y el camino que pinta
  `ev.imagen` en `src/tarjetas.tsx` y `src/Informe.tsx`. Son parte del render
  de producción (los importa `tarjetas.tsx`) aunque ya nadie les mande una
  imagen; sacarlos toca el render y queda como trabajo aparte.

La interfaz del taller de configuración (28-09 a 05-10), a
`archivo/taller-configuracion/`. Su propio README decía que no mandaba sobre
el render; el código sigue leyendo `contenido/config/`:

- `taller/taller.html`, `taller/tarjetas.html`, `taller/menu.js`,
  `taller/datos.js`, `taller/conceptos.js`, `taller/README.md` y
  `taller/medios/` (21 MB de clips y fotogramas de muestra).
- `taller/PARAMETROS.md` NO se movió: es el inventario de qué debe ser
  configurable y lo cita `bitacora/PENDIENTES.md`.
- `scripts/datos-taller.js` (copiaba `contenido/config/` al taller) y
  `scripts/vistas-taller.js` (rendía las vistas previas), a `archivo/scripts/`.
- El taller de voz: `scripts/taller-voz.js`, `taller-voz-lista.js`,
  `taller-voz-neutras.js` y `.github/workflows/taller-voz.yml` (a
  `archivo/workflows/`, deja de aparecer en Actions), con lo que produjeron,
  `contenido/taller/voz/` (18 MB de mp3), a `archivo/contenido-taller/`. La voz
  se eligió: Azure es-CL Lorenzo (`scripts/tts-azure.js`).
- Los talleres de sonido: `scripts/taller-notas.js`, `taller-sonido.js`,
  `taller-tension.js` y `demo-piano.js`, a `archivo/scripts/`. Generaban
  candidatos para escuchar y elegir; lo elegido vive en `scripts/sonido.js` y
  `scripts/motor-sonido.js`. Sus `require("./motor-sonido")` ya no resuelven
  desde `archivo/scripts/`: para volver a correrlos hay que devolverlos a
  `scripts/`.
- `scripts/taller.js` (el Taller de control, `bitacora/taller.html`) se QUEDA:
  no tenía módulos que apuntaran a nada de lo retirado.

## Limpieza del 01-11-2026, segunda parte: prompts sin disparador y documentos cerrados

Prompts que ya nadie lee, a `archivo/prompts/`:

- `prompts/guardian.md` - el prompt del "Informe de la mañana" (06:00), la
  rutina que se apagó el 12-10-2026. Su revisión la hace hoy la sesión de día
  con la skill `revision`. Ojo: su sección 2, la que comprueba si la Edición
  diaria sigue en curso antes de dar por faltante un video (consulta el
  workflow y escribe "todavía en curso" en vez de una falta), sigue valiendo
  para esa revisión de la mañana y conviene no perderla.
- `prompts/caratula-pedido-corta.txt` - la versión resumida del pedido de
  carátula que Santiago dejó junto al prompt del 05-10-2026. Su propia fila en
  `prompts/README.md` decía "NO SE USA. Nada la lee".
- `prompts/clave-idea.md` NO se retiró: el flujo
  `acuerdo-internacional-sin-tratado` sigue abierto en `CAMINO: idea`
  (`contenido/estado/clave-acuerdo-internacional-sin-tratado.md`) y
  `scripts/estado-clave.js` lo nombra como prompt de esa etapa. Se retira
  cuando ese flujo cierre.

Documentos cerrados de `bitacora/`, a `archivo/bitacora/`. Son propuestas,
planes e investigaciones cuyo resultado ya está aplicado y anotado en
`estrategia/decisiones.md` o en `bitacora/REALIZADOS.md`; ningún workflow ni
script los ejecuta, solo los citaban como diseño, y esas citas apuntan ahora a
la ruta nueva (`scripts/estado.js`, `scripts/taller.js`,
`.github/workflows/estado.yml`, `prompts/vigia.md`, `prompts/CALIDAD.md`,
`ideas/evaluar.md`):

- `2026-08-24-ideas-hechas.md`, `2026-08-28-investigacion-cron.md`,
  `2026-08-28-plan-barrido.md`, `2026-08-28-quien-ejecuta-que.md`,
  `2026-08-29-propuesta-informe-largo.md`, `2026-08-30-manana.md`,
  `2026-09-02-orden-del-repo.md`, `2026-09-03-propuesta-tiempos.md`,
  `2026-09-08-propuesta-maquina-de-estados.md` (el diseño de la máquina de
  estados: la implementan `scripts/estado.js` y `estado.yml`),
  `2026-09-20-propuesta-taller.md`, `2026-09-24-plan-b-gpt-caido.md` (el plan
  del fin de semana del 24 al 27-09; el plan B vivo es `prompts/suplente.md`
  con `contenido/estado/plan-b.txt`), `2026-09-26-propuesta-limpieza-y-taller.md`
  y `2026-10-12-encargo-mural-al-pipeline.md` (el mural ya está en producción,
  `scripts/clave-mural.js`).
- La captura `bitacora/capturas-2026-09-26-short-expres-descifra.jpg`, a
  `archivo/capturas/`, junto a las otras siete capturas de decisiones visuales
  ya cerradas.

Duplicados y restos:

- `docs/auditoria-api/` deja de existir: `DECISION-07-09.md` y su README
  (el más nuevo) se sumaron a `archivo/docs/auditoria-api/`, donde ya estaba
  el resto del expediente; el README viejo de esa carpeta quedó como
  `seguimiento-2026-08-30.md`. Queda vivo `docs/youtube.md`.
- `contenido/pruebas/flujo/` (la pieza, el estado y el veredicto de la prueba
  v2 del 14-09), a `archivo/contenido-pruebas/`. Es lo que producía el bucle de
  prueba que ya se retiró el 26-09 (`archivo/workflows/prueba-flujo.yml`).

ElevenLabs, sin restos: `.github/workflows/edicion-diaria.yml` ya no pasa
`ELEVENLABS_API_KEY` ni `VOICE_ID` a los pasos 3 y 4, y la condición de voz es
solo Azure. Con la condición vieja, un secret de ElevenLabs sin Azure pedía
`--voz` y la edición se caía en `scripts/dia.js` en vez de salir muda. Los
secrets siguen en GitHub y se pueden borrar desde la interfaz.

## Limpieza del 04-11-2026: el camino de la idea, el taller viejo y las pruebas del informe en video

Decisión "El despegue" (`estrategia/decisiones.md`, 04-11-2026): se archiva lo
que ninguna pieza viva referencia. El mismo día se apagaron el informe en
video y los Shorts exprés.

- `prompts/clave-idea.md` (de prompts/): el prompt con que GPT escribía la
  idea de una Clave en el camino viejo, anterior al 27-09-2026. El último flujo
  en ese camino, `acuerdo-internacional-sin-tratado`, quedó descartado el
  03-11-2026, y los tres flujos abiertos van por la pauta que escribe Claude
  (`prompts/pauta-clave.md`). Con él salieron las etapas `tema_elegido`,
  `validar_idea`, `reparar_idea`, `idea_lista` e `idea_aprobada` de
  `scripts/estado-clave.js`, `scripts/clave.js`, `scripts/bandeja.js`,
  `estado-clave.yml`, `reintento.yml` y los prompts del despachador, del
  suplente y del validador. `clave.caminoDe()` sigue detectando un tema.md
  anterior al corte, para que falle con un mensaje en vez de quedar a medias.
- `taller/PARAMETROS.md` (de taller/, que quedó vacía y se borró): el
  inventario de qué debía ser configurable en el render, con archivo y línea.
  Lo citaba la interfaz del taller retirada el 01-11-2026 y sus líneas ya no
  calzan con el código; si vuelve a hacer falta, se rehace desde el código.
- `scripts/guion-corto.js` (a `archivo/scripts/`) y
  `.github/workflows/prueba-voz.yml` (a `archivo/workflows/`, deja de aparecer
  en Actions): la muestra corta con voz real del informe en video, del
  27-09-2026. Sin informe en video no hay voz que probar.
- `scripts/prueba-video.js` (a `archivo/scripts/`): el video de prueba que
  rendía una edición publicada con las imágenes de
  `contenido/secciones/pruebas/`. Era solo del informe en video. Lo que sí
  sigue vivo y él usaba, `scripts/secuencia-plan.js` y `scripts/miniaturas.js`,
  se quedó en `scripts/` (sus `require` ya no resuelven desde `archivo/`: para
  correrlo hay que devolverlo a `scripts/`). Los comentarios de `src/` y de
  `scripts/secuencia-plan.js` que lo nombran no se tocaron.
- `scripts/reglas-repetidas.js` (a `archivo/scripts/`): la medición del
  06-10-2026 de qué reglas incumplía GPT, leyendo el historial de veredictos.
  Ningún workflow lo corría; solo lo citaba `bitacora/REALIZADOS.md`. Su línea
  base quedó en `bitacora/metricas/`.
