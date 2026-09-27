# archivo/ — lo que ya cumplió su función

Nada del proyecto se borra: lo que dejó de ser criterio vivo se retira aquí,
con una línea que diga qué fue y dónde vive hoy lo que lo reemplazó. Regla de
la propuesta de orden del 02-09 (`bitacora/2026-09-02-orden-del-repo.md`).

- `plan-produccion.md` (de estrategia/) — plan por fases del arranque. Fases
  0 a 3 cumplidas al 30-08; la 4 vive en `bitacora/PENDIENTES.md` y la 5 en
  `estrategia/modelo-de-negocio.md`.
- `musica.md` (de prompts/) — prompts para pedir la cama musical. Superado
  por la decisión del 27-08: sin cama, sonido sintetizado por código
  (`scripts/sonido.js`).
- `ejecutar.md`, `IMPLEMENTAR.md`, `hechas.md` (de ideas/) — tres listas de
  backlog sin movimiento desde el 27-08; nada pasó nunca de ejecutar a
  hechas. El backlog vivo es `bitacora/PENDIENTES.md`; lo cumplido,
  `bitacora/REALIZADOS.md`. Ojo: `IMPLEMENTAR.md` aún trataba la voz clonada
  como requisito (disputa 2 de `REGLAS-DURAS.md`).
- `prompts/banco-temas.md` (de prompts/) - prompt de la etapa diaria
  `alimentar_banco`, retirada el 26-09-2026. El banco crecía y nadie elegía de
  él; hoy los temas de la Clave salen del barrido semanal (`scripts/semana.js`)
  y del prompt del domingo (`prompts/tema-semana.md`). El banco en sí queda
  congelado y sin tocar en `contenido/claves/banco-temas.md`.
- `timeline-schema.md` (de docs/) — describía el esquema del timeline
  anterior al 27-08: hoy desinforma. Si vuelve a hacer falta un esquema, se
  regenera desde `scripts/build-timeline.js`, que es la verdad.

## Limpieza del 26-09-2026 (propuesta `bitacora/2026-09-26-propuesta-limpieza-y-taller.md`)

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
  `scripts/taller-tablero.js`, que pasará a llamarse `scripts/taller.js`.

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
