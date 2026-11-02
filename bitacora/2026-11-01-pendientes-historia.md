# Historia de PENDIENTES (sale de la lista el 01-11-2026)

El 01-11-2026 `bitacora/PENDIENTES.md` tenía 2.445 líneas, 23 marcas de hecho
sin borrar y decenas de entradas anteriores al 15-10 que las decisiones de
Santiago de ese día (`estrategia/decisiones.md`, "Tomar el control") dejaron
sin objeto. La regla 41 dice que la lista viva tiene solo tareas vivas, así
que se podó. Para no perder nada:

- **Las secciones históricas** van abajo con su texto completo, cada una con
  el encabezado de dónde venía (números de línea de la versión anterior a la
  poda, que se puede ver con `git log -p bitacora/PENDIENTES.md`).
- **Las entradas hechas** (las marcadas como hechas o con `[x]`) se borraron
  de la lista y quedan acá en una línea cada una; su detalle está en
  `bitacora/REALIZADOS.md` y en el archivo del día.
- **Las entradas superadas o vencidas** se borraron con una línea de resumen
  que dice por qué.

Nada de este archivo es una tarea. Si algo de acá vuelve a importar, se baja a
PENDIENTES con fecha, dueño y evidencia nueva.

## Entradas hechas, borradas de la lista

- 07-10, arreglar el guion de la Clave de licencias con GPT: hecho el 12-10, guion APROBADO en la vuelta 4.
- 12-10, la última revisión de Santiago del video final de la Clave de licencias antes de subirlo: hecho, la aprobó y se subió el 12-10 (la nueva subida con las tesis sigue viva en PENDIENTES).
- 12-10, conectar el mural al pipeline con voz, carátula y hora nueva: hecho el 12-10 (`CLAVE_FORMATO`, commit `6b64d9b`).
- 12-10, cinco planos con una cifra sin fuente al pie: hecho, la fuente al pie está en main desde el 16-10 (REALIZADOS, 16-10).
- 12-10, la Clave debe subir con la carátula elegida de GPT: hecho el 16-10 (REALIZADOS); el tipo jpg de `scripts/youtube-caratula.js` se arregló el 01-11.
- 23-10, el mural se pide y se cose solo: hecho ese día (`scripts/guion-de-clave.js`, `scripts/mural-flujo.js`, reintento del render); lo que no se pudo probar sigue vivo en PENDIENTES.
- 06-10, apagar el informe de la mañana de las 06:00: hecho la noche del 12-10, `trig_01DHmsrrShT2Mnj8WDg4CQ42` con `enabled: false`.
- 06-10, silenciar las notificaciones de las rutinas de reloj: hecho la noche del 12-10 en siete rutinas (relojes A, B y C, barrido, métricas, observatorio y validador).
- Responder a Google la revisión de la API: decidido NO enviar el 07-09 (`archivo/docs/auditoria-api/DECISION-07-09.md`).
- 26-09, la corrección del informe atascada tres horas: hecho el 26-09, a mano, y reemplazados los respaldos.
- 26-09, `reintento.yml` sin disparar en su ventana: hecho la noche del 26-09 con un reloj propio de Claude.
- 25-09, GPT atascado en la preselección y el reintento sin correr: hecho la noche del 26-09, igual que el anterior.
- 26-09, apagar el plan B cuando GPT volviera: hecho la noche del 26-09 (regla 20 y 20 en `reintento.yml`).
- Habilitar la YouTube Reporting API: hecho el 23-09, trabajo `channel_reach_basic_a1` creado.
- IMPRESIONES 1, la vía de las impresiones: hecho el 23-09 (`scripts/impresiones.js`).
- REINTENTO 1, la máquina reintenta sola: hecho el 22-09.
- Auditoría matinal: rutina creada la noche del 02-09.
- Disputa 1 cerrada (imágenes generadas): hecho el 03-09.
- CARÁTULA 5, el taller del 23-09: hecho, la fórmula quedó en `prompts/imagen-caratula.md`.
- SUBIDA 23-09, exprés público e informe a las 06:30: hecho el 23-09.
- PROMPTS 23-09, las dos reglas de siglas y del cierre de cautela: hecho el 23-09.
- 23-09, el tope al cierre de cautela repetido: lo cerró la regla del 23-09 en `prompts/informe.md`.
- RELEASE 1, un HTTP 500 al crear el release: hecho, `edicion-diaria.yml` comprueba con `gh release view` y reintenta.
- VALIDADOR 1, tope de vueltas y convergencia: hecho, el tope es de cuatro vueltas (`prompts/validador.md`, TOPE).
- GPT 1, limitar los despertares: aplicadas las medidas (1), (2) y la convergencia el 15-09.
- YOUTUBE 1, dejar los videos programados: hecho, `edicion-diaria.yml` sube con `publishAt` (`YT_HORA_*`).
- MÁQUINA 5, el agente de GPT despertado por un PR: hecho con el despachador y el PR #6 (14-09).
- 27-09, revisar el primer video con la secuencia del 24-09: hecho, la secuencia está en producción.
- ACTIONS 1, el render a la mitad: (a) y (b) hechos el 16-09; la compra de minutos queda fuera por la decisión 5 (sin gastos nuevos).
- Separar los flujos (14-09): hecho, la Clave tiene `estado-clave.yml` propio.

## Entradas superadas o vencidas, borradas de la lista

- 12-10, decisiones de diseño del mural (qué secciones llevan tensión, `[ESQUEMA]` y `[TESIS]` fuera del mural, el sello de tres notas) y su duplicado de la sección de la noche: superadas, el largo por tema usa el diario escrito como escenario (decisión 2 del 01-11); la tesis narrada ya se arregló el 16-10.
- 12-10, el panel 6 del mural de licencias mal hecho: en pausa desde el 16-10 y sin objeto con el modelo nuevo; la pieza está esquivada.
- 09-10 al 16-10, la cadena y la auditoría mudas por la cuenta de Claude: el texto completo va abajo; lo vivo es la entrada de la alarma que no depende de Claude.
- 27-09, la idea de la Clave de la semana 39 sin aprobar: superada, el flujo quedó EN PAUSA (entrada viva en PENDIENTES).
- 27-09, elegir el tema de la semana 39: vencida.
- 27-09, la carátula generada se pierde por el conector sin binarios: superada, las carátulas llegan por el canal de pedidos; lo vivo es la entrada del 01-11 sobre carátulas rotas.
- 23-09, el video del informe con dos datos mal atribuidos: decidido ese día, se publicó (ver la entrada hecha de PROMPTS 23-09).
- 22-09, la cadena congelada en el informe por GPT: superada por la regla 20 y 20 y el suplente.
- Fondos, elegir intensidad de las láminas (02-09): superada por la secuencia del 24-09 en producción.
- Voz de respaldo S0 en Azure: fuera por la decisión 5 (sin gastos nuevos).
- Las noticias que faltaron el 29-08: vencida.
- 12-10, decisiones abiertas del informe corto (REGLAS-DURAS, la web en GitHub Pages, el podcast acortado, el Short que repite la portada): resueltas el 01-11 (REGLAS-DURAS versión 2, el diario en entender.sinodev.cl, el podcast pasa a leer el diario escrito); lo del Short sigue en la entrada de imagen propia.
- 12-10, el error de imagen de la Clave que vio Santiago: él decidió dejarla así.
- 12-10, el barrido sin noticias de pensiones: superada, las AFP salieron 6 de 6 días del 17 al 23-10.
- 03-10, la carátula del 03-10 no generada: vencida; lo vivo es la entrada del 01-11 de carátulas.
- 24-09, el despertador del barrido con commit vacío: superada por `reintento.yml`, que relanza el Barrido desde las 01:48 (01-11), y por la entrada viva del prompt del reloj.
- CARÁTULA 6, conectar el clima de la carátula: en pausa desde el 16-10 (sin mejoras) y fuera del modelo nuevo.
- CARÁTULA 4 y CARÁTULA 2, la prueba A/B de Studio: nunca anduvo; el experimento `caratula-v3` se cerró el 01-11 sin dato.
- GPT 2, el poder de GPT por etapa: superada por el reparto del 06-10 (`contenido/estado/reparto.txt`).
- SERIE 1, El Estrecho: vencida, la interpelación fue el 28-09.
- CALIDAD 1, el bloque visual y de guion del 12-09: superada, el informe cambió de formato el 12-10.
- TALLER 3, el Taller por fases: la interfaz `taller/` se retiró el 01-11 (decisión 5); la página de `scripts/taller.js` sigue.
- CLAVE 2, el tema desde el banco: superada por el tema de la semana (26-09) y después por el largo por tema (01-11).
- CASOS 1, abrir el dossier de Fonasa prestadores: la decisión vive en `contenido/casos/por-abrir.md`, que es material editorial y no se muda (regla 41).
- TARJETA 3, el esquema de la Clave encima del párrafo: formato viejo de la Clave, reemplazado por el mural.
- EVENTOS 1 y TIEMPOS 1: superadas por la cadena lineal v3 (14-09) y el apagado de los guionistas.
- ORDEN, noches 2 y 3: superada por la limpieza del 01-11.
- DATOS 1, DATOS 2, IMAGEN 2 a 5, TALLER 1, TALLER 2, PANEL 3, VISUAL 3, verificar las fuentes, secciones Plata pública y Educación, línea base de "¿Lo cumplió?": mejoras del informe largo o del taller, en pausa desde el 16-10 y fuera del modelo nuevo. Si vuelven, se reabren desde `ideas/`.
- 23-10, la cifra de comunas con clases suspendidas en el Gran Concepción: vencida, la noticia es del 23-10.
- 13-10, revisar el primer informe corto al aire: cubierto por el análisis del 01-11 (`bitacora/2026-11-01-analisis-y-plan.md`).
- 27-09, la voz con pausas de 2,5 s entre secciones: mejora en pausa desde el 16-10.
- Análisis de septiembre sin dueño (dónde se nota la IA, inventario de errores reales, criterio de selección, El Shot, las dos decisiones huérfanas): sin dueño desde septiembre; si vuelven, desde `ideas/`.
- Diferido, el escudo de la testera del congreso: era una imagen de la biblioteca, archivada el 01-11.
- El "Duda" de la noche del 12-10 sobre el AVISADOR quedó anotado en `bitacora/rutinas.md`.

---

## Encabezado anterior

_Venía de `bitacora/PENDIENTES.md`, líneas 1 a 11 de la versión del 01-11-2026 anterior a la poda._

# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó están `REALIZADOS.md` y el archivo del día.

Última actualización: 12-10-2026, sesión de día (sale la corrección del guion
de la Clave, que GPT corrió y Santiago aprobó; entra el encargo del mural al
pipeline para la noche, el panel 6, las cinco cifras sin fuente al pie y la
medición de retención por duración).

---

---

## EL MURAL DE LA CLAVE (07-10-2026): las entradas que salieron

_Venía de `bitacora/PENDIENTES.md`, líneas 47 a 81 de la versión del 01-11-2026 anterior a la poda._

- [ ] **12-10, quedó parametrizado y espera decisión (día o Santiago).** Tres
      cosas del mural que no son código sino diseño:
      (1) qué secciones lleva la TENSIÓN: por defecto las cinco anteriores al
      Cierre (9 a 13 en esta Clave, el ejemplo de `scripts/clave-musica.js`),
      se cambia con `CLAVE_TENSION` y no hay regla por tipo de sección escrita;
      (2) las marcas `[ESQUEMA]` y `[TESIS]` no aparecen en el mural (el armador
      las salta desde el 07-10), aunque el validador cuenta la tesis como
      narrada; (3) el sello de tres notas no suena en el mural: la cama ya
      arranca con re, la, re. Evidencia: `scripts/clave-mural.js`
      (`rangoTension`) y `scripts/mural-guion.js` (`leerSecciones`).
- [ ] **12-10, PARA LA NOCHE: conectar el mural al pipeline, con voz, carátula y
      hora nueva.** El encargo completo, con contexto acotado, lista cerrada de
      archivos, criterio de terminado y comandos de verificación, está en
      `bitacora/2026-10-12-encargo-mural-al-pipeline.md`. El día no puede
      hacerlo: no tiene `AZURE_SPEECH_KEY` ni `YT_REFRESH_TOKEN`. Evidencia del
      bloqueo: `scripts/dia.js:174` renderiza la composición `Informe` también
      para la Clave, así que hoy el workflow produciría el formato viejo de
      tarjetas y no el mural que Santiago aprobó el 12-10-2026.

- [ ] **12-10: el panel 6 del mural de licencias está mal hecho.** Volvió de GPT
      como una foto de oficina a plena luz, mucho más clara que los otros trece,
      y sobre ese fondo el velo tiene que apretar a 1,5 (el más alto del mural)
      y termina en un filo vertical visible. Está ESQUIVADO, no arreglado: la
      cámara de la sección 5 se movió de 8670 a 7400 y ahora el panel claro solo
      se cruza durante el viaje. Arreglarlo de verdad es pedirle a GPT que lo
      rehaga con la cuarta regla nueva de `scripts/mural-pedido.js` (la luz es
      la misma en los catorce) y volver a coser el mural, que necesita `sharp`.

- [ ] **12-10: cinco planos muestran una cifra sin fuente al pie.** Las
      secciones 3, 6, 8 y 13 de la Clave de licencias no traen `[FUENTE]` y sus
      cifras salen sin respaldo a la vista, contra las reglas 6 y 32. El
      mecanismo ya existe (`scripts/mural-guion.js` baja la fuente de la sección
      a los planos con cifra) y la marca `[FUENTE]` ya entró al contrato en
      `prompts/guion-claves.md`. Taparlo en ESTA pieza necesita otra vuelta de
      GPT; de la próxima en adelante sale solo.

---

## PARA LA SESIÓN DE LA NOCHE (06-10-2026): EL MODO DE OPERACIÓN DESDE EL 16-10-2026

_Venía de `bitacora/PENDIENTES.md`, líneas 189 a 210 de la versión del 01-11-2026 anterior a la poda._

### 00. EL MODO DE OPERACIÓN DESDE EL 16-10-2026: no gastar en mejoras

Santiago, 16-10-2026: **"me queda poco límite, así que quiero dejar límite para
los informes y no seguir gastando en mejoras de momento."**

Lo que sigue corriendo: informe corto diario con su Short, los exprés cuando la
guardia caza algo, y la Clave de la semana que ya está definida. Nada más.

Lo que NO se hace hasta que Santiago lo pida, aunque esté anotado más abajo en
esta lista y aunque sea barato: el panel 6 del mural, la alarma que no dependa
de Claude, las mejoras de los shorts, las mejoras visuales del informe corto, la
etiqueta de serie en la carátula (el tablero está armado y espera su elección,
https://claude.ai/artifact/NJ2m4cnykMdR8sis3jFpQe), y la música con Gemini.
Todo eso queda en pausa, no cancelado.

**Dónde se va la cuota, medido el 16-10:** las tres piezas de ese día las
escribió el SUPLENTE (Claude), no GPT. La preselección es suya de forma
permanente desde el 06-10, pero el informe y el guion entraron por plan B. Esa
es la diferencia entre un día barato y uno caro: con GPT escribiendo, Claude
solo valida; sin GPT, Claude escribe tres piezas con Opus. Si hay que recortar
algo, eso es lo que hay que mirar primero, no los relojes, que son Haiku y
aprietan un botón.

---

## PARA LA SESIÓN DE LA NOCHE (06-10-2026): el pedido del día y lo que el día pide no tener

_Venía de `bitacora/PENDIENTES.md`, líneas 252 a 319 de la versión del 01-11-2026 anterior a la poda._

Santiago, 06-10-2026: "deja todas las indicaciones de lo que no puedes hacer
para la sesión de la noche, anota por ahí para que él las vea, y pide también
los secretos para que tú tengas acceso".

### 1. Apagar el "Informe de la mañana" de las 06:00. ✅ HECHO 12-10 (noche): `trig_01DHmsrrShT2Mnj8WDg4CQ42` con `enabled: false`

Decisión de Santiago del 06-10: **"el informe de la mañana no lo veo, dámelo tú
en la revisión de la mañana. Y quita el otro."** La revisión ya existe como
skill (`.claude/skills/revision/SKILL.md`, creado hoy).

La sesión de día lo intentó y **no puede**: `update_trigger` devuelve "this
routine was created via http_api, not by an agent. Agents can only update
routines they created". La rutina es
`trig_01DHmsrrShT2Mnj8WDg4CQ42` ("Informe de la mañana Entender Chile (06:00)",
cron `0 9 * * *`). `bitacora/rutinas.md` dice que las creadas desde `http_api`
sí se editan desde la sesión local: **la noche la apaga**, o Santiago en
https://claude.ai/code/routines/trig_01DHmsrrShT2Mnj8WDg4CQ42

Al apagarla, `prompts/guardian.md` queda sin rutina que lo lea. No borrarlo: su
sección 2 (la comprobación de si la Edición diaria sigue `in_progress` antes de
declarar que faltan videos) es un método que vale y que la revisión del día
debería heredar.

### 2. Las notificaciones de las rutinas de reloj. ✅ HECHO 12-10 (noche): desde la sesión local la API SÍ acepta `notifications`; quedaron en `{email: false, push: false}` las siete de la lista (relojes A, B, C, barrido, métricas, observatorio, validador). Vigía y guardia sin tocar. Duda: verificar mañana que el AVISADOR del validador (PushNotification) siga llegando, porque ahora la rutina tiene las notificaciones de corrida apagadas

Entre la 01:00 y las 06:00 disparan **~46 sesiones de rutina**, y 15 de ellas
son los relojes del reintento, que solo responden "OK 02:10" tras apretar un
botón. Santiago recibe ese ruido y no lo lee.

**El día no lo puede arreglar**: la herramienta `update_trigger` acepta nombre,
horario, modelo, prompt y encendido, pero **no acepta el campo `notifications`**.
Solo `create_trigger` lo acepta, al crear. Comprobado hoy contra el esquema de
la herramienta, no supuesto.

Las dos salidas, las dos de la noche o de Santiago:
- Apagar las notificaciones en la interfaz, una por una (no pierde historial).
- Borrarlas y recrearlas con `notifications: {}` (pierde el historial de
  corridas de cada una; no recomendado).

Qué apagar: relojes del reintento A (`trig_016JsVfFwrJFut5vy2f4c8TS`), B
(`trig_01E8tyJPqyfNdVTog477sf6Z`) y C (`trig_01RevKvPn6mufpcUCK9fii2X`), reloj
del barrido (`trig_01W5KEjHbr5wWPsmmJ4ygNEh`), reloj de métricas
(`trig_01MxzGdh2P489TmgkUi9spWd`), observatorio
(`trig_01MzKjYwnyH8PfJfCBrtJvv4`) y el validador/suplente
(`trig_01B8tLFaXe7h1YBCciFE2iKf`, 17 disparos el 06-10).
Qué DEJAR: el vigía (`trig_01LUtn4fSJjBsCzqdoWeVviH`, que solo avisa cuando hay
algo atrasado y nunca un "todo bien") y la guardia
(`trig_01HLSWkJ8VpVFPuxQ51YiG4d`, que ya tiene `push: false`).

### 3. Lo que el día PIDE, y lo que pide NO tener

Santiago autorizó pedir lo que falte. El día pide dos cosas, y las dos son de
acceso, no de secretos:

- **Abrir la red de salida** a `suseso.gob.cl`, `bcn.cl`, `dipres.gob.cl` y
  `support.google.com`. Son las fuentes de las que dependen la Clave y la
  revisión de carátulas, y hoy el proxy las bloquea enteras: por eso la
  política de miniaturas de YouTube tuvo que delegarse a GPT
  (`.github/workflows/doc-youtube.yml`, creado hoy) y por eso una revisión del
  06-10 quedó sin verificar. Es política de red del entorno, no un secreto.
- **Que la noche haga los dos arreglos de arriba**, o que recree esas rutinas
  con `create_trigger` para que queden editables desde el día.

Y lo que el día **NO quiere tener, a propósito**: los tokens de Azure, de
YouTube ni el `AUDIO_TOKEN`. El día no renderiza, no sube y no publica; la regla
19 dice que el clic de publicación es de Santiago y la 23 que los tokens viven
en los secrets de GitHub. Tenerlos a mano agregaría riesgo sin agregar
capacidad. Si algún día el día necesita uno, se pide ESE, con el motivo.

---

## CANAL DE AVISOS BARRIDO→CHATGPT: CONSTRUIDO (04-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 323 a 388 de la versión del 01-11-2026 anterior a la poda._

## CANAL DE AVISOS BARRIDO→CHATGPT: CONSTRUIDO (04-09, diseño de Santiago)

**PR permanente #2** (rama `automatizacion/barrido-listo` → main, etiqueta
`barrido-listo`, NO se fusiona). Al final del workflow Barrido, cuando el
barrido del día quedó en main, un paso resetea la rama a main + el archivo
`contenido/barrido/ultimo-evento.txt` (fecha_chile, barrido_commit,
estado=listo, completado_utc) y pushea: ese commit nuevo en el PR es el
evento que despierta la tarea de ChatGPT. UNA emisión por día (dedup por
fecha_chile); si el paso falla, la corrida siguiente lo repara solo. El
primer evento real sale con el barrido de esta madrugada (~01:35).
**Lado de Santiago: HECHO (04-09 ~00:50):** la tarea de ChatGPT ya escucha
el PR. **PRUEBA ESTA NOCHE**: evento ~01:35 → GPT debería dejar la
preselección temprano. Si sale bien, se migra toda la cadena a esta forma.
**✅ PRUEBA SUPERADA (01:03):** evento emitido 05:01:16Z → GPT pusheó
`edición 2026-09-04: preselección` a las 05:03:23Z (2 min 7 s), citando el
commit exacto del barrido, con el pendiente EOF bien tratado y commit según
contrato. **✅ EJECUTADO (noche del 05-09):** cambio de hora COMPLETO (7 rutinas por
API + 5 crons de GitHub, todos −1 h UTC; horas de Chile intactas tras pasar
a UTC-3) y MIGRACIÓN de los 2 guiones a Claude: rutinas
`trig_01HUjC4MjKGmmpDMApn8gtJm` (guionista informe, esperadora 03:35 Chile
+ webhook de GitHub con guardas) y `trig_017nkjJWR5Voud4dYgPhvwF7`
(guionista Clave, esperadora 03:50). Ambas leen AHORA los mismos
prompts/guion-*.md + contrato (los prompts son agnósticos del modelo),
dedup silencioso, escritura verificada, push solo en fallo.
**LIMITACIÓN DESCUBIERTA del webhook (create_webhook_trigger): dispara con
CUALQUIER push del repo: la API no acepta filtro por rutas ni ramas.** Se
neutralizó con guardas de salida-en-segundos (dedup + ventana horaria
03:20-04:25) y la Clave quedó sin webhook (esperadora pura). Además no hay
API para BORRAR un webhook ya creado: si mete ruido, el remedio es
desactivar la rutina o pedir el filtro. **LADO DE SANTIAGO: APAGAR las 2
tareas de GPT de guiones (04:00 y 04:15)**: si corren igual, solo
duplican (pisan el guion de Claude con uno equivalente), no rompen.
El plan original, para referencia: GPT queda solo donde su navegación vale (preselección ya
por evento ✓; migrar informe y claves a escucha de evento); Claude toma los
2 guiones (puras transformaciones del repo, sin web) como rutinas
disparadas por WEBHOOK de GitHub (push del informe → guion informe; push de
la entrega → guion clave; create_webhook_trigger de la API), con prompt
vivo en prompts/. Además, NUEVA CONVENCIÓN para las tareas de GPT: el texto
en ChatGPT es solo el arranque de 3 líneas y las indicaciones viven en
prompts/ (las validaciones del evento viven como PASO CERO dentro de
prompts/seleccion.md, un archivo por tarea, corrección de Santiago; su
tarea corta de ChatGPT apunta a seleccion.md como siempre). Límite real
de Claude: no es el número de rutinas, es la cuota compartida (five_hour):
los guiones van en Sonnet, por evento (sin relojes) y fuera de la ventana
crítica 01:30-01:45.
**CADENA POR EVENTOS COMPLETA (noche del 05-09):** tres PR permanentes:
#2 barrido-listo → preselección GPT (probado ✓), #3 preseleccion-lista →
informe GPT (primer evento ~01:40 del 06-09), #4 informe-listo → Clave GPT.
PASO CERO en seleccion.md, informe.md y claves.md; workflows emisores
senal-preseleccion.yml y senal-informe.yml (dedup diaria + auto-reparación;
emite Actions porque el reseteo limpio exige force-push). Los guionistas
Claude cierran la cadena (webhook + relojes 03:35/03:50). Santiago
configura los disparadores de informe y Clave en ChatGPT con textos cortos
que apuntan a los prompts; las tareas fijas quedan de respaldo con la
guarda "si ya existe la pieza de hoy, no la rehagas" hasta que la prueba
esté verde. CARÁTULAS: cambio masivo aplicado (14/14) con OK de Santiago
sobre el tablero; criterio amarrado en prompts + generador + validador.
**Red de seguridad creada y luego DESACTIVADA a pedido de Santiago** (la
prueba funcionó): rutina
`trig_01CVyy1m21cpCGHk9sKfVY9r` a las **02:30 Chile** (`30 6 * * *`; entra
en la lista del cambio de hora del 6-09): si no hay
`contenido/preseleccion/FECHA.md` en main, la hace Claude leyendo AHORA
`prompts/seleccion.md` + contrato (prompt vivo:
`prompts/respaldo-preseleccion.md`); si tampoco hay barrido, lo despierta y
espera; sin material NO inventa: avisa. Notifica SOLO si intervino o no
pudo; silencio cuando GPT cumplió.

---

## AGENDA PENDIENTE (Santiago, la noche del 14-09): revisión completa y el Taller

_Venía de `bitacora/PENDIENTES.md`, líneas 390 a 413 de la versión del 01-11-2026 anterior a la poda._

## AGENDA PENDIENTE (Santiago, la noche del 14): revisión completa y el Taller

- [ ] **Revisión completa del proyecto**: recorrer todo el repo y dejar SOLO
      lo que hoy se usa; borrar (o mover a `archivo/`) lo que ya no sirve.
      Candidatos evidentes tras la v3: `prompts/guionista.md` y
      `prompts/revision-editorial.md` (sin rutina que los lea), los prompts y
      workflow de la prueba de flujo (`prueba-flujo.md`, `prueba-validador.md`,
      `prueba-flujo.yml`, `contenido/pruebas/`), las rutinas apagadas, los
      workflows `senal-*`, documentos que describan la cadena anterior
      (cronograma viejo, propuestas ya ejecutadas), y las secciones de esta
      lista que ya no aplican.
- [ ] **Preparar el Taller**: fase 1 publicada el 20-09 (https://claude.ai/artifact/2WH2fioUJK7tQHrKbXtBfw); ver TALLER 3.
- [ ] **TALLER NUEVO (28-09, pedido de Santiago: el anterior no se entendía).**
      Se arma pantalla por pantalla. Publicado en
      https://claude.ai/artifact/1R4oBLvc2YsVZPKbCYsbB8, fuente en
      `taller/taller.html`, datos en la base del artefacto. Listas las dos
      primeras: Trabajos (nueve piezas) y Secciones (doce), las dos con
      agregar, editar y eliminar. **Dueño: el día.** Falta:
      (a) que el código LEA de ahí en vez de sus listas propias, que es el
      punto de todo: hoy una sección se configura en tres archivos a la vez
      (`scripts/imagenes-secciones.js:5` las claves y el slug, `src/tema.ts:60`
      el color, `src/pictogramas.tsx:22` el dibujo) y ninguno obliga a los
      otros a estar al día;
      (b) las pantallas que Santiago pida después, de a una.

---

## AGENDA PENDIENTE (continuación): la biblioteca, el párrafo y el taller

_Venía de `bitacora/PENDIENTES.md`, líneas 435 a 517 de la versión del 01-11-2026 anterior a la poda._

- [ ] **LA BIBLIOTECA DE IMÁGENES POR PALABRA (28-09, idea de Santiago).**
      Medida antes de opinar sobre los 36 guiones, 408 bloques: solo el **2%**
      tiene dos palabras dibujables, así que componer pares estaría apagado casi
      siempre ("volcán" aparece 1 vez y "nieve" ninguna). La medición, la
      contrapropuesta (una imagen por bloque indexada por CONCEPTO, que con 40
      palabras toca el 75% de los bloques) y la objeción editorial están en
      `ideas/biblioteca-de-imagenes.md`. **Decide Santiago** entre tres
      caminos: (a) el barato primero, tres variantes por sección, 36 imágenes,
      sin máquina nueva y sin cruzar la regla 29; (b) la biblioteca de
      conceptos, 80 imágenes; (c) no hacerla. **Dueño: el día.**
      **CORREGIDO el mismo día**: Santiago apuntó que el uso no es el fondo de
      sección sino **poner imágenes donde hoy va texto mientras habla el
      locutor**, y ahí los números son otros y favorables. El 34% del video (4,3
      min de 12,8) es el espectador leyendo lo que está oyendo, y con 40
      conceptos se cubre el 77% de los 879 párrafos narrados. La objeción
      editorial se cae (ilustrar un concepto no es documentar un hecho) y
      aparece otra: **el 35% de los párrafos lleva una cifra** y la firma del
      canal exige toda cifra visible con su fuente, así que la imagen reemplaza
      la prosa y nunca el dato.
      **APROBADA y empezada el 28-09.** Los 20 conceptos con sus 40 prompts
      están en `contenido/biblioteca/PROMPTS-CONCEPTOS.md` (20 cubren el 89%,
      no 40). La prueba de composición (`src/prueba-parrafo.tsx`) dejó dos
      cosas: el párrafo CON cifra se puede hacer **hoy y sin imágenes nuevas**,
      y el párrafo sin texto queda vacío con las imágenes de sección, así que
      las de biblioteca van con el motivo centrado ocupando el cuadro. Falta:
      (a) que Santiago genere las 40; (b) la pantalla Biblioteca en el taller;
      (c) cómo elige el video qué imagen va en cada párrafo.
      **AL DÍA 30-09**: (a) van 14 conceptos con imagen, 58% de los párrafos
      cubiertos; (b) hecha, y además la pantalla de tarjetas
      (https://claude.ai/artifact/KWxSLBrQUfE5yjAb2uTGfR). (c) sigue abierta y
      ahora tiene nombre: es la RANURA. Se separaron los tres niveles (evento,
      tarjeta, fondo) y quedó a la vista que `src/tarjetas.tsx:942` es un switch
      de una sola salida. La única ranura con más de una tarjeta es narración:
      párrafo, dibujo y texto, dibujo solo. Tres candidatas y nada que elija.
      Santiago dijo el 30-09 que la elección debe ser **por párrafo**.

- [ ] **UN PÁRRAFO CON DOS TEMAS (01-10, anotado por Santiago).** La tarjeta de
      un párrafo dura todo el párrafo. Si el párrafo es largo y trae otra idea a
      la mitad, la pantalla se queda mostrando lo mismo mientras la voz ya pasó a
      otra cosa. Santiago lo dejó anotado para cuando lleguemos a un párrafo así:
      no resolverlo antes de verlo. Las salidas posibles: partir el párrafo en
      el guion, que la tarjeta cambie a mitad, o que el [DATO] se ancle a media
      frase. **Dueño: el día, cuando aparezca el caso.**

- [ ] **EL SKILL DEL MÉTODO PÁRRAFO A PÁRRAFO (01-10, pedido de Santiago).**
      Destilar en un skill todo lo que se usó para cerrar el primer párrafo:
      cómo se abre, cómo se itera con muestras rendidas, qué se propone, dónde
      se guardan las ideas mientras el párrafo está abierto (parche en el
      scratchpad, repositorio intacto), y qué se toca al cerrar (código, datos,
      prompts, artefactos, bitácora, decisiones). **Dueño: el día.**

- [ ] **ELEGIR LA TRANSICIÓN POR CORTE (01-10).** Hoy no se puede: el video las
      decide con dos banderas del timeline (`meta.mosaico` y `meta.cortinas`),
      una para TODA la edición, así que no hay manera de pedir una distinta
      entre dos secciones. Las tres que existen ya están como datos en
      `contenido/config/transiciones.json` y se ven con su clip en El video /
      Transiciones. Falta: (a) que el timeline lleve el id de la transición por
      corte y no dos banderas globales; (b) que `src/Informe.tsx` elija por ese
      id; (c) que el campo del formato en el taller mande de verdad, que hoy
      anota y no manda. **Dueño: el día.**

- [ ] **DOS GRÁFICOS QUE EL GUION NO PIDE NUNCA (01-10).** Medido sobre las
      últimas 20 ediciones: `tabla` y `marcador` salen **cero** veces. El video
      sabe pintarlos (están en `src/tarjetas.tsx` y se ven en El video /
      Tarjetas, rendidos con datos de muestra) y `prompts/guion-informe.md` los
      tiene en su árbol. O el árbol nunca llega a esas filas, o las noticias que
      los justificarían no aparecen. Hay que mirar el árbol antes de opinar.
      **Dueño: el día.**

- [ ] **ENCENDER LA REGLA DE DIBUJOS (30-09).** Está escrita, medida y probada
      (`scripts/dibujo-parrafo.js`), pero APAGADA: falta que Santiago mire el
      tablero de seis cuadros en la pantalla de tarjetas
      (https://claude.ai/artifact/KWxSLBrQUfE5yjAb2uTGfR) y diga si van. Para
      encenderla hay que: (a) su visto bueno; (b) agregar `DIBUJOS_PARRAFO=1` al
      workflow de la edición; (c) confirmar que `public/biblioteca/` se llena en
      la nube, porque está en el .gitignore y hasta hoy nadie la copiaba en CI
      (lo hace `dibujos.copiar()` desde `build-timeline`, pero eso todavía no
      corrió una noche de verdad). **Dueño: la noche para (b) y (c).**
      Lo que queda abierto aparte: si `dibujo solo` (sin texto en pantalla)
      entra o no. Se dejó fuera a propósito hasta ver una edición con dibujos:
      quitar el texto toca justo el 34% del video que es el espectador leyendo
      lo que oye.


---

## AGENDA PENDIENTE (continuación): qué más debe ser configurable

_Venía de `bitacora/PENDIENTES.md`, líneas 524 a 532 de la versión del 01-11-2026 anterior a la poda._

- [ ] **QUÉ MÁS DEBE SER CONFIGURABLE (28-09).** Inventario completo con
      archivo y línea en `taller/PARAMETROS.md`, ordenado por las dos
      pantallas del taller. Las tres primeras, en orden: (1) que los cuatro
      archivos lean el tipo de sección del taller, que es lo único que ya
      falla en producción; (2) la pantalla de Trabajos con los tiempos,
      empezando por las pausas de voz, que es el caso probado; (3) las horas
      de publicación, que ya son configurables pero viven en las variables de
      GitHub, donde Santiago no entra. **Decide Santiago** cuál se hace y en
      qué orden. **Dueño: el día.**

---

## MÁQUINA DE ESTADOS: CADENA LINEAL v3 EN PRODUCCIÓN

_Venía de `bitacora/PENDIENTES.md`, líneas 557 a 566 de la versión del 01-11-2026 anterior a la poda._

## MÁQUINA DE ESTADOS: CADENA LINEAL v3 EN PRODUCCIÓN (desde el 15-09; tres piezas desde el 17-09)

- [ ] **Separar los flujos** (Santiago, 14-09): un estado y una tabla por
      flujo. El primero es el de la Clave (CLAVE 4 c-d-e), que necesita el
      Taller para las dos aprobaciones; después el exprés.
- [ ] **Vigilar la madrugada del 17-09**, la primera con tres piezas y con el
      banco como etapa: que la cadena cierre en `guion_informe_listo` →
      `validar_final` → `aprobada` → `alimentar_banco` → `videos_listos`, que
      `contenido/claves/banco-temas.md` tenga commit del día, y cuánto tarda el
      render con 24 fps y concurrency 100%.

---

## EL DISEÑO COMPLETO (08-09): un solo disparador y máquina de estados

_Venía de `bitacora/PENDIENTES.md`, líneas 568 a 578 de la versión del 01-11-2026 anterior a la poda._

## EL DISEÑO COMPLETO (08-09): un solo disparador y máquina de estados

- [ ] **Conversar y decidir la propuesta de Santiago (08-09 07:45):** un solo
      PR disparador para GPT, un estado explícito del día, GPT y Claude que
      despiertan con cada disparador y hacen lo que el estado indica, en bucle
      hasta el estado final; corrección de errores dentro del bucle; cada
      prompt claro y en orden. Borrador con tabla de estados, dónde vive el
      estado (A/B), despachador único, corrección con tope de vueltas,
      migración en 5 pasos y 7 preguntas:
      `bitacora/2026-09-08-propuesta-maquina-de-estados.md`. No se toca nada
      hasta conversarlo.

---

## RETENCIÓN de los largos: la serie estaba mala, ahora está medida (13-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 580 a 617 de la versión del 01-11-2026 anterior a la poda._

## RETENCIÓN de los largos: la serie estaba mala, ahora está medida (13-09)

- [ ] **MEDIDO el 13-09, y la serie que teníamos estaba MALA.** La subida de
      los últimos cuatro días (43,4% el 10 y el 11, 49,4% el 12, 53,7% el 13)
      era el bug de `metricas.js`: la medición se truncó en 50 videos justo el
      **10-09** (el canal declaraba 52) y los informes viejos, que son los de
      retención baja, fueron cayéndose del cálculo. Con la lista completa (68
      videos, corrida de esta noche) la retención ponderada real de hoy es
      **32,5%**, o sea plana contra el 35,5% del 06-09 y el 33,2% del 09-09.
      Ni se derrumbó ni se dio vuelta: lleva una semana en un tercio.
      Lo que sí sube de verdad son las horas de largos: 13,1 (06-09) a **18,1**
      (13-09), medidas por Analytics, que no dependía del truncamiento.
      **La hipótesis (a), largos demasiado largos, queda descartada con datos**
      (snapshot completo del 13-09): el de 14,2 minutos retiene 43,8% y el de
      10,9 minutos retiene 16,2%. Lo que predice la retención NO es la duración
      sino **de dónde viene el tráfico**: los cuatro largos más vistos del canal
      (221, 152, 47 y 41 vistas) retienen 29,3%, 16,2%, 29,9% y 19,4%, mientras
      los que solo ven los suscriptores (9 a 15 vistas) retienen entre 43% y
      68%. La gente que YouTube manda de afuera se va temprano: eso es apertura
      y promesa del título, no minutos de más. Queda abierta la hipótesis (b),
      y desde mañana la serie ya es comparable día a día.
- [ ] **MEDIDO el 20-09: la hipótesis (b) es cierta, y ya se mide todos los
      días.** `scripts/metricas.js` pide ahora a Analytics las fuentes de
      tráfico (canal y por largo) y la CURVA de retención por video (solo
      existe con ~20 vistas o más en la ventana; con menos YouTube devuelve
      vacío). Lo que dicen las curvas: de 100 que entran a un largo, ~50 se
      van antes del segundo 40 y después la curva es casi plana. Los que
      llegan por SUGERIDOS rebotan (el largo del 04-09, 153 vistas, queda 34%
      al 5% y 7% al final); los que llegan por BÚSQUEDA se quedan (fondos
      generacionales, búsqueda 49%: 67% al 5% y 40% al final). Los minutos de
      largos vienen de la página del canal (538), sugeridos (309), búsqueda
      (196) y listas (196); los suscriptores aportan 141. Y los largos de la
      cadena v3 (17 al 20-09) tienen 12, 9, 2 y 0 vistas: no hay retención
      que medir porque nadie entra. **Conclusión: primero la puerta (carátula
      y título, CARÁTULA 2), después los primeros 40 segundos (IMAGEN 4, la
      apertura), y recién ahí la duración.** Sección nueva en
      `bitacora/metricas/FECHA.md`: "De dónde vienen los minutos" y "Dónde se
      va la gente"; la auditoría puede leerla desde mañana.

---

## URGENTE, con plazo (04-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 619 a 633 de la versión del 01-11-2026 anterior a la poda._

## URGENTE, con plazo

- [ ] **Suscripción de Claude vencida = todas las rutinas caen (04-09).**
      Desde las 16:06 del 04-09 la guardia falló en cada corrida (cuatro
      seguidas) y no hubo vigilancia de urgentes hasta las 08:00 del 05-09.
      El síntoma exacto, en la sesión de la rutina: "Your organization has
      disabled Claude subscription access for Claude Code · Use an Anthropic
      API key instead, or ask your admin to enable access". NO es cuota
      (five_hour) ni un cambio de la organización: es el plan vencido, y se
      arregla renovando (Santiago lo renovó la noche del 04-09). Para el
      guardián y la auditoría: si aparece ese texto, la causa es esa y la
      única acción útil es avisar a Santiago; no buscar otra falla. Queda
      por decidir si el guardián revisa el estado del plan antes de la
      madrugada (una corrida de prueba a las 23:00) para que el barrido de
      la 01:30 no sea el primero en enterarse.

---

## EL AGENTE DE GUARDIA: LUZ VERDE (02-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 646 a 756 de la versión del 01-11-2026 anterior a la poda._

## EL AGENTE DE GUARDIA: LUZ VERDE (02-09 noche, con la condición resuelta)

Santiago aprobó la corrida cada 2-3 horas con una condición: que el hecho de
que GPT navega y Claude no, no complique. **Resuelto por arquitectura**: quien
entra a las páginas es un SCRIPT en GitHub Actions (como el barrido de cada
madrugada), no el modelo; la rutina de Claude es el reloj y el redactor
trabaja SOLO con el material que el script ya trajo al repo.

**ESTADO (madrugada del 03-09): FASE 1 EN MARCHA Y PROBADA.** Existen
`scripts/guardia.js` (probado en vivo: ruta negativa a las 00:05 y positiva
con ventana de 24 h, que cazó la muerte en el Metro con ALARMA+3 portadas),
`guardia.yml` (corrida verde en Actions: el runner SÍ alcanza los medios) y
la rutina `trig_01HLSWkJ8VpVFPuxQ51YiG4d` cada 2 h (prueba completa del
circuito: despertador → workflow → "sin novedades" sin notificar; endurecida
con sync inicial y bucle de espera literal). Primera guardia real: 03-09
08:04 (cayó por cupo; la de las 10:09 cazó la EOF).
**FASE 2 CONSTRUIDA (noche del 03-09):** piel VINO en Short.tsx,
`scripts/short-urgente.js` (pipeline completo, probado en local con el caso
real de la tasa: render verificado cuadro a cuadro), modo `--urgente` del
subidor con marca de deduplicación `SUBIDO-<slug>.txt` (un hallazgo = un
Short), workflow `short-expres.yml` (voz + render + subida privada), y la
rutina de guardia en **v3**: ahora REDACTA el guion (Sonnet, reglas duras:
~55 palabras, cifras solo de fuente primaria, atribución a prensa cuando
corresponde), espera el id y avisa al teléfono con el link del video listo.
Primera corrida real end-to-end disparada esta noche con la tasa. El diseño
original, para referencia:
1. `scripts/guardia.js`: barrido liviano (portadas RSS de 6-8 medios +
   fuentes primarias BC/INE/Senapred/Fiscalía + lo anunciado en PENDIENTE DE
   CIERRE y Agenda). Criterio "muy importante" MECÁNICO, 2 de 4: palabra de
   ALARMA · dato macro publicado hoy · declaración oficial de emergencia ·
   está en 3+ portadas. Lo anunciado se reporta siempre.
2. `guardia.yml`: se dispara con el push del despertador; si el script caza
   algo, escribe `contenido/urgente/FECHA-HHMM-<slug>.md` con el material
   (titulares, cifras, fuentes) y notifica.
3. Rutina Claude despertador **cada 2 h, 08:00-22:00 Chile** (absorbe al
   vigía de las 09:20: ya no se programa en GPT).
4. **Workflow "Short exprés"**: convierte el urgente en guion corto → voz →
   render vertical → sube PRIVADO con miniatura (~10 min) → push al teléfono
   "URGENTE: X, el Short está en Studio". El clic de Santiago sigue siendo
   el gate; con la auditoría de Google aprobada podrá salir programado.
5. Control exprés: cifras solo de fuente primaria u oficial; si solo hay
   prensa, el Short lo atribuye y la notificación lo advierte. Silencio
   total si no hay nada.
6. El guardia también ALIMENTA `datos/series/` (disputa 9): cada dato macro
   que ve publicado lo anota en la serie.

**✅ PROYECTO DE LA NOCHE, HECHO (noche del 03→04-09): la fase 2 está
construida y probada end-to-end con el caso real de la tasa.** Piezas:
`scripts/short-urgente.js` + workflow `short-expres.yml` (guion → voz →
render vertical piel VINO → subida privada, ~5 min de Actions) + modo
`--urgente` del subidor (deja `SUBIDO-<slug>.txt` con el id: un hallazgo =
un Short) + rutina de guardia **v3** (redacta el guion con reglas duras,
espera el id, notifica el link listo; copia en `prompts/guardia-reloj.md`).
La primera corrida real cazó un bug (el vertical se reescalaba a horizontal
antes de subir); corregido y re-subido en la segunda. **Feedback de Santiago (04-09, tras ver el primer Short): "ni siquiera sé de
qué está hablando, no tiene contexto... que sea una noticia wow y que se
entienda, tienes 50 seg".** → **Formato v2 aplicado la misma noche**: plantilla
gancho + contexto + qué significa (90-120 palabras, ~45-50 s), la PRUEBA DEL
ÁNGULO ("¿por qué le importa a una persona común?"; sin ángulo no se fuerza
el Short, se notifica para decisión humana), y la regla de cifras afinada (una
publicación oficial citada por la prensa SÍ habilita la cifra nombrando a la
institución). Rutina v4 cargada; el Short de la tasa se reescribió con las
cifras reales de la EOF (TPM 4,5%, sin cambios a 24 meses, inflación esperada
3,3%) y se re-produjo como ejemplar del formato. **Le queda a Santiago: borrar
en Studio los DOS videos viejos de la prueba: `AZpTnPoPg2I` (deformado) y
`GMSTAx1-62o` (formato corto sin contexto).**
Patrón nuevo (04-09, pedido de Santiago): **el prompt vivo de la guardia ES
`prompts/guardia-reloj.md`**: la rutina solo sincroniza y lee el archivo en
cada corrida; editarlo es cambiar la guardia sin tocar la API. Pendiente:
aplicar el mismo patrón prompt-vivo a las demás rutinas (barrido,
observatorio, revisión, guardián, métricas, auditoría) cuando toque
editarlas.
Cola corta pendiente (quedó de la tarde del 05-09): retención de Analytics
cableada a metricas.js (token listo en secrets/youtube-analytics.token +
falta subirlo como secret de GitHub y el query en el script); capítulos de
YouTube automáticos en la descripción; link directo Short→video largo;
vuelta 3 de carátulas según feedback de los bocetos.
Pendiente fase 2.1 (no esta noche): que guardia.js (Actions, que SÍ alcanza
la web) capture también el cuerpo de la fuente primaria en el archivo del
hallazgo: la rutina redactora no navega, hoy escribe con el material + el
informe. Y alimentar `datos/series/` (disputa 9). Otro cabo: al PUBLICAR un
video nadie escribe `contenido/videos/` (por eso la web estuvo sin embeds
30-08→03-09; esta noche se rellenaron a mano los 10 ids): el reloj de
métricas podría detectar el paso a público y escribir el archivo solo. El caso que motivó todo, para
referencia:

- El guardia corrió a las 00:12, 10:09, 12:08, 14:08 y 16:07 (la de las 08:14
  falló por cupo agotado, junto con barrido 01:32, observatorio 01:45 y
  reloj de métricas 08:45). A las **10:09 cazó la Encuesta de Operadores
  Financieros**, señal ANUNCIADO, cruzada con la marca PENDIENTE DE CIERRE
  que el informe dejó a las 03:30: es el circuito del caso Imacec cerrando
  solo por primera vez. Archivo:
  `contenido/urgente/2026-09-03-1009-tasa-interes-permanecera-nivel.md`.
- Ahí se detuvo, porque no existe quien lo convierta en pieza. Santiago lo
  notó como "no tengo ningún Short en privado": el guardia produce un
  archivo, no un video.
- Lo que el caso enseña para el diseño de la fase 2: (a) la captura es un
  titular de un medio (La Tercera) sin cifra ni fuente primaria, así que el
  Short exprés tiene que ir PRIMERO a la fuente oficial (acá, la EOF en
  bcentral.cl) y solo después escribir; si la primaria no abre, atribuye a
  prensa y la notificación lo advierte (punto 5). (b) Debe leer el
  `PENDIENTE DE CIERRE` del informe para saber qué se esperaba y cerrarlo
  con el valor real. (c) Un solo Short por hallazgo, aunque el guardia lo
  vea en cinco corridas: `.visto.json` ya deduplica el archivo; el
  workflow debe deduplicar el video con la misma firma.
- Por verificar con Santiago: si la notificación de las 10:09 llegó al
  teléfono. La rutina terminó bien y el archivo apareció dentro de su
  ventana de espera, pero el push no se puede comprobar desde el repo.
- Aclaración que salió hoy: el vigía de las 09:20 ya no se programa en GPT
  (punto 3, absorbido por el guardia); por eso no hay archivo del vigía y
  no es una falla.

---

## Dependen de Santiago: la cadena y la auditoría mudas (09-10 al 16-10)

_Venía de `bitacora/PENDIENTES.md`, líneas 789 a 879 de la versión del 01-11-2026 anterior a la poda._

- [ ] **09-10, HOY: el 07-10 y el 08-10 la cadena diaria y la propia
      auditoría de las 05:30 quedaron mudas más de 36 horas porque Claude
      nunca devolvió veredicto, y nadie se enteró hasta hoy.** Auditoría del
      09-10 (`bitacora/2026-10-09-auditoria.md`). Evidencia (con la historia
      completa de git, no el checkout shallow con el que arranca la
      auditoría): `contenido/estado/2026-10-07.md` quedó en
      `validar_guion_informe` / `pendiente` desde las 19:38 del 07-10 (el
      disparo a Claude de la vuelta 1 fue a las 06:00:20 UTC y nunca volvió);
      `contenido/estado/2026-10-08.md` quedó en `barrido_listo` / `pendiente`
      desde las 09:06 del 08-10 (el barrido llegó 7 horas tarde y la
      preselección, turno permanente de Claude desde el 06-10, tampoco
      respondió). Ningún archivo de la cadena de esos dos días existe después
      de esos puntos (ni revisión, ni video, ni podcast, ni descripción), y
      `bitacora/2026-10-07-auditoria.md` y `bitacora/2026-10-08-auditoria.md`
      no existen (comprobado con `git log --all --diff-filter=A` y `git show
      main:`, cero resultados los dos). Mismo síntoma que el 04-09
      ("Suscripción de Claude vencida", más arriba en "URGENTE, con plazo"),
      pero esta vez el guardián que debía avisarlo es el mismo turno que se
      quedó mudo, así que no hubo ningún aviso. Necesita que Santiago revise
      el estado de la cuenta/suscripción de Claude para esas fechas y
      confirme si ya está resuelto; después, la noche debería hacer que estos
      turnos fallen de forma ruidosa (un archivo o aviso explícito al agotar
      los reintentos) en vez de no dejar rastro.
      **12-10: tercera vez, y esta vez la explicación de la suscripción no
      alcanza.** Auditoría del 12-10 (`bitacora/2026-10-12-auditoria.md`).
      `bitacora/2026-10-11-auditoria.md` tampoco existe (comprobado con `git
      log --all --diff-filter=A`, cero resultados), pero esa mañana la
      cadena SÍ terminó completa y Claude SÍ trabajó: `contenido/estado/2026-10-11.md`
      dice `ETAPA: videos_listos` / `VEREDICTO: APROBADA`, y los tres
      veredictos de Claude (`contenido/veredictos/2026-10-11-*.md`) y la
      revisión (`contenido/revisiones/2026-10-11.md`) existen y están
      completos. Es decir: el turno de Claude como validador funcionó
      perfecto ese día, pero el turno de Claude como auditor de las 05:30
      (`trig_01GDbvJ1Wjzy25bnVRCXgygZ`) no dejó ningún rastro, ni archivo de
      auditoría ni `bitacora/2026-10-11.md`. `get_trigger` sobre esa rutina
      solo trae el último disparo (el de hoy); no hay forma desde el repo de
      saber si el disparo del 11-10 ocurrió y la sesión falló en silencio, o
      si el disparo mismo no llegó. Necesita que Santiago revise el
      historial de disparos de esa rutina para el 11-10 (la cuenta de
      Claude, no solo la suscripción, porque ese día el resto de Claude
      funcionó bien); después, la noche debería agregar una señal explícita
      de que la auditoría corrió (aunque sea un commit vacío con hora, antes
      de escribir el archivo completo) para que su propia ausencia se note
      sin depender de que otra auditoría la note días después.
      **16-10: sexta vez, y esta vez con la causa visible y con la cadena de
      producción entera muerta dos días, no solo la auditoría.** Auditoría
      del 16-10 (`bitacora/2026-10-16-auditoria.md`). `bitacora/2026-10-13-auditoria.md`,
      `2026-10-14-auditoria.md` y `2026-10-15-auditoria.md` tampoco existen
      (comprobado listando `bitacora/` con `ls`, cero coincidencias). El
      13-10 la cadena de producción sí había terminado bien ese día (como el
      11-10), pero el 14 y el 15-10 la cadena ENTERA murió otra vez, como el
      07 y el 08-10: `contenido/estado/2026-10-14.md` quedó en
      `ETAPA: barrido_listo` desde las 07:20 del 14-10 con las cinco piezas
      siguientes en "falta" (Preselección +310 min, Informe +280 min, Guion
      +250 min, Revisión +230 min, Videos +125 min, medido a esa hora y sin
      moverse después); `contenido/estado/2026-10-15.md` quedó igual desde
      las 07:04 del 15-10. No existe un solo archivo con fecha 2026-10-14 ni
      2026-10-15 en `contenido/preseleccion/`, `contenido/informes/`,
      `contenido/guiones/informe/`, `contenido/revisiones/` ni
      `contenido/veredictos/` (comprobado listando cada carpeta). El propio
      commit que escribió la preselección de hoy (`f7a10fb`) lo confirma sin
      inferencia: "La cadena quedó detenida tras el 13-10-2026 y el barrido
      del 16-10-2026 trae dos días de material que el canal nunca contó". Se
      perdieron dos días de video que no se recuperan: lo que pasó el 14 y
      el 15 quedó resumido dentro de la edición del 16, pero nunca hubo
      video largo, Short ni exprés propios de esos dos días.
      Causa visible esta vez (con historial completo de git, no el shallow
      con el que arranca la auditoría: hubo que `git fetch --unshallow`):
      los tres relojes del reintento, A (`trig_016JsVfFwrJFut5vy2f4c8TS`), B
      (`trig_01E8tyJPqyfNdVTog477sf6Z`) y C (`trig_01RevKvPn6mufpcUCK9fii2X`),
      que deben tocar `contenido/estado/reintento-despertador.txt` y pushear
      cada 20 minutos entre la 01:00 y las 07:00 de Chile, no dejaron NINGÚN
      commit "reintento: despertador" entre el del 13-10 a las 04:51 y el
      del 16-10 a las 04:10: casi tres días en cero. Sin ellos, el único
      disparador que quedó fue el cron nativo de GitHub
      (`*/20 4-9 * * *` de `reintento.yml`), que el propio workflow ya
      documenta como poco confiable, y que en la práctica corrió solo una o
      dos veces por día el 14 y el 15 en vez de las ~17 que le tocarían; las
      pocas veces que corrió dentro de ventana las gastó en relanzar el
      Barrido (también tarde: "no hay barrido de 2026-10-14 y son las 06 de
      Chile: relanzando el Barrido", run `38540333574`) y la ventana se
      cerró antes de que ninguna corrida llegara a notar que la preselección
      (turno permanente de Claude desde el 06-10, sin plan B que lo cubra)
      estaba colgada. El vigía de las 02:15 y 05:15 (`trig_01LUtn4fSJjBsCzqdoWeVviH`)
      no escribe nada en el repo, así que no se puede verificar desde acá si
      avisó al teléfono esos dos días y nadie actuó, o si no avisó.
      `get_trigger` sobre los tres relojes del reintento solo trae el último
      disparo de cada uno (hoy 16-10, los tres `SUCCEEDED`); no hay forma
      desde el repo de ver el historial del 14 y el 15. Necesita que
      Santiago revise en la interfaz el historial de corridas de esas tres
      rutinas para esas dos fechas.

---

## Para la sesión de la noche: NÚMEROS 1 (22-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 1769 a 1833 de la versión del 01-11-2026 anterior a la poda._

- [ ] **NÚMEROS 1 (PRIORIDAD ALTA, 22-09): el problema no es la carátula ni la
      retención de los largos, es que los largos no reciben tráfico.** Medido
      hoy sobre `bitacora/metricas/2026-09-22.json`:
      (a) **Los largos publicados del 17 al 21 tienen entre 1 y 9 vistas cada
      uno.** Con esa base, ningún porcentaje de retención (van de 15% a 99%)
      significa nada: son una o dos personas.
      (b) **El canal vive de los Shorts**: 5.051 de 5.881 vistas (86%), y la
      fuente SHORTS aporta 4.273. Los largos hacen 1.412 minutos vistos contra
      742 de los Shorts, o sea generan el doble de minutos con un sexto de las
      vistas: el problema de los largos es de ENTRADA, no de permanencia.
      (c) **Distancia a la monetización**: 23,5 horas vistas de largos de las
      4.000 que pide el YPP, y 16 suscriptores de 1.000. Por el camino de los
      largos, al ritmo actual, no se llega. Hay que decidir si el producto
      principal pasa a ser el Short.
      (d) **La pregunta de Santiago ("¿sirven las carátulas nuevas?") HOY NO SE
      PUEDE RESPONDER**, por dos razones: `scripts/metricas.js` no pide
      impresiones ni CTR (línea 94: solo views, estimatedMinutesWatched,
      averageViewDuration, averageViewPercentage), y aunque las pidiera, un
      largo con 3 vistas tiene decenas de impresiones y ninguna señal. La
      carátula v3 entró el 20-09; los largos del 20 y 21 hicieron 1 y 3
      vistas.
      **Lo que propongo, en orden:**
      1. **INTENTADO el 22-09 y NO FUNCIONA: la API rechaza las métricas de
      impresiones para este canal.** Se escribió la consulta con
      `videoThumbnailImpressions` y `videoThumbnailImpressionsClickRate`
      (nombres que una búsqueda web daba como agregados el 15-01-2026; NO se
      pudieron contrastar con la documentación oficial porque
      developers.google.com está bloqueado por el proxy de la sesión de día).
      Probado en dos corridas reales del workflow de métricas con los secrets:
      cinco variantes (por video con y sin sort, solo impresiones, junto a
      views, por día y sin dimensión) y las cinco devolvieron **"The query is
      not supported"**. El código quedó con UN intento diario y su explicación;
      si Google la habilita, el dato aparece solo. La retención y las fuentes
      no se vieron afectadas en ningún momento.
      **Lo que falta para cerrarlo, y no se puede desde la sesión de día:**
      abrir https://developers.google.com/youtube/analytics/v2/available_reports
      y la página de métricas desde la sesión local o desde el navegador de
      Santiago, y confirmar si la métrica existe con otro nombre, si es solo
      para content owners o si pide otro scope en el token de Analytics.
      **Delegado a GPT el 22-09** (Santiago: "él puede entrar a las páginas
      sin problemas"): investigar en la documentación oficial si la métrica
      existe, con qué nombre, en qué informe y con qué scope, y devolver la
      consulta exacta o la confirmación de que no está disponible para un
      canal propio. Cuando responda, la sesión de día aplica lo que diga.
      **Mientras tanto**, impresiones y CTR se leen a mano en YouTube Studio,
      y la prueba A/B de carátulas de Studio sigue siendo la vía para decidir
      entre la v3 y lo anterior (CARÁTULA 2, punto 4). El pedido original era:
      **Agregar impresiones y CTR a la recolección** (`metrics:
      "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage"`
      suma `impressions,impressionClickThroughRate` en la consulta por video, y
      la misma serie por día). Sin esto no se puede evaluar ninguna carátula,
      ni la v3 ni la que venga. Es código y lo puede hacer la sesión de día.
      2. **Mirar dónde abandonan los pocos largos que sí tienen vistas**: el
      script YA pide `audienceWatchRatio` por `elapsedVideoTimeRatio` (línea
      120) y ese dato no se está usando en ningún análisis. Con él se sabe si
      la caída es en el sello, en la apertura o en la tercera noticia.
      3. **Medir y forzar la conversión Short → largo**, que hoy es casi cero:
      enlace al largo en el comentario fijado y un cierre explícito en el
      Short. Es la única fuente de tráfico propia que el canal tiene.
      4. **Fórmula del Short**: los de pregunta con nombre propio funcionan
      mejor que el resumen genérico. Los ocho más vistos incluyen "¿Qué
      admitió el exfiscal Vinko Fodich...", "¿Quién fue Patricio Guzmán..." y
      "¿Por qué la aprobación de Kast tocó su peor nivel" (202 vistas el
      21-09, un exprés). Los "y otras 4 cosas de hoy" sostienen una mediana de
      134 y los de Clave apenas 59.

---

## Para la sesión de la noche: CLAVE 4, el flujo propio (21-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 1835 a 1899 de la versión del 01-11-2026 anterior a la poda._

- [ ] **CLAVE 4: FLUJO PROPIO CONSTRUIDO la noche del 21-09; falta la primera
      Clave real.** Cómo se usa (fase 1, decisiones por el chat):
      1. `node scripts/clave.js listar` muestra el banco numerado; Santiago
         elige; la sesión corre `node scripts/clave.js elegir <slug> --tema <n>`
         → GPT propone la idea (`prompts/clave-idea.md`, nuevo) → Claude la
         valida → etapa `idea_lista`.
      2. Santiago lee `contenido/claves/flujo/<slug>/idea.md` y dice sí o pide
         cambios: `clave.js aprobar <slug> [--fecha]` o `clave.js cambiar
         <slug> --nota "..."` → GPT escribe la entrega (`prompts/claves.md`,
         MODO FLUJO) → Claude valida → GPT el guion → Claude valida →
         `aprobada` → `estado-clave.yml` dispara la Edición diaria para la
         fecha de producción → video programado a la hora de la Clave.
      Piezas: `scripts/estado-clave.js` (vista `contenido/estado/clave-<slug>.md`
      con PIEZA/PROMPT/ARCHIVO/ARCHIVO_ENTRADA), `estado-clave.yml` (evento
      propio `ultimo-evento-clave.txt` en el PR #6, disparo del validador por
      API, render), despachador y validador con su rama de Clave, `gate.js`
      acepta la Clave aprobada por flujo, `contenido/claves/flujo/README.md`.
      Probado en local de punta a punta con un flujo de prueba (tema → idea →
      veredicto → aprobar → cambiar); nunca corrió con GPT y Claude de verdad.
      **Primera Clave real: cuando Santiago elija el tema.** Riesgos: el
      despachador tiene que leer el segundo archivo de evento; la entrega en
      MODO FLUJO es un prompt viejo con un párrafo nuevo encima. Fase 2 del
      Taller: las dos decisiones con botón en la página.
      **(a) y (b) HECHOS la noche del 16-09:** la cadena diaria es de tres piezas y termina en el guion del
      informe; el banco se alimenta cada día con la etapa `alimentar_banco`
      (`prompts/banco-temas.md`, GPT, sin validación, no frena el render).
      Quedan (c), (d) y (e), que necesitan el Taller. Diseño original: "La Clave la vamos a lanzar una
      o dos veces por semana dependiendo de la lista que tengamos, y la
      haremos bien. Antes de hacerla video me presentas la lista de
      disponibles. Esa lista se actualiza con cada informe si encontramos algo
      interesante. Luego que decidimos el tema, me presentarás la idea
      completa, y recién cuando te dé el sí lo harás video y subirás."
      **Lo que ya existe y sirve:** `contenido/claves/banco-temas.md` tiene 67
      temas con su noticia de origen y su fecha, y `contenido/claves/indice.md`
      lleva lo ya explicado. El prompt de la Clave ya sabe leer los dos.
      **Lo que hay que cambiar:**
      (a) **Sacar la Clave de la cadena diaria**: en `scripts/estado.js`,
      `VALIDADAS` pasa de cinco piezas a tres (preselección, informe, guion del
      informe) y la pieza `videos` deja de exigir la descripción de la Clave.
      La cadena del día termina en `guion_informe_listo` → `validar_final` →
      `aprobada` → videos. Un día sin Clave deja de ser un día incompleto.
      (b) **Alguien tiene que seguir alimentando el banco todos los días.** Hoy
      lo hace el prompt de la Clave, que corre cada madrugada; si la Clave sale
      de la cadena, ese paso desaparece. Propuesta: un paso corto y barato
      después del informe aprobado (GPT o una rutina de Haiku) que lea el
      informe del día y agregue al banco los temas que ameriten, con concepto,
      noticia de origen y fecha. Sin esto la lista se congela.
      (c) **Flujo propio con estado propio**, `contenido/estado/clave-<slug>`,
      con estas etapas: `banco_al_dia` → **`elegir_tema` (Santiago)** →
      `proponer_idea` (GPT, con título, promesa, las preguntas que responde,
      el caso de entrada y la carátula) → `validar_idea` (Claude, contra el
      prompt) → **`aprobar_idea` (Santiago)** → `entrega` → `validar_entrega`
      → `guion` → `validar_guion` → `aprobada` → video y subida. Los dos pasos
      en negrita son de Santiago y el flujo se detiene ahí hasta su respuesta.
      (d) **Disparo manual**: el flujo no arranca por reloj, sino porque
      Santiago lo pide ("hagamos la Clave de X"). Es el caso de uso del
      "despertar un flujo con un aviso" de MÁQUINA 5.
      (e) **Cadencia**: una o dos por semana según lo que tenga el banco.
      Sustituye a CLAVE 2 y ajusta lo dicho en SERIE 1 (dos por semana dentro
      del hilo del Estrecho).
      **Esto obliga a tener el Taller**: la lista de temas y la idea propuesta
      hay que presentarlas de una forma que Santiago pueda mirar y decidir
      desde el teléfono. Es TALLER 3, ahora con un uso concreto y urgente: un
      tablero de la lista de temas disponibles con su fecha y su noticia de
      origen, y una ficha de la idea propuesta con botón de aprobar.

---

## Para la sesión de la noche: TALLER 3 (20-09)

_Venía de `bitacora/PENDIENTES.md`, líneas 2137 a 2172 de la versión del 01-11-2026 anterior a la poda._

- [ ] **TALLER 3: FASE 1 PUBLICADA la noche del 20-09** (https://claude.ai/artifact/2WH2fioUJK7tQHrKbXtBfw):
      página de lectura generada desde el repo por `scripts/taller.js`
      con seis módulos (Ver, Medir, Experimentos, Decidir, Mejorar, Flujos) y
      el registro `bitacora/experimentos.json` estrenado con cuatro fichas.
      Propuesta completa y plan por fases en
      `bitacora/2026-09-20-propuesta-taller.md`. **Decide Santiago:** (1) si
      panel y Taller se fusionan en una página con pestañas; (2) si las
      decisiones con botón van por GitHub desde la página (fase 2) o siguen
      por el chat; (3) qué se retira del Taller viejo (`taller/`). Después:
      fase 2 (botones del flujo de la Clave, CLAVE 4 c-d-e), fase 3 (Ver con
      las carátulas del release, siete días atrás), fase 4 (la auditoría lee
      experimentos.json). El diseño original (Santiago, 12-09): Hoy `taller/` es navegador + editor con
      diff + borradores + Claude sobre los archivos de criterio: sirve para
      cambiar texto, no para ver ni medir. Lo que sí funcionó como taller
      fue el tablero de carátulas del 05-09 (14 propuestas lado a lado,
      decisión, 14/14 aplicadas el mismo día); lo que no funcionó fue la
      vuelta 2, sin decisión en una semana. Propuesta, en tres piezas:
      (a) **Tableros con variantes renderizadas.** Para cada prueba visual
      (tarjeta con lámina, tarjeta con línea de pantalla, cortina, carátula)
      la noche genera 2 o 3 variantes como fotogramas fijos con
      `remotion still` sobre una edición real, y las publica como tablero
      con un botón por variante. Santiago elige desde el teléfono. Sin
      render no hay tablero: los bocetos en texto no se deciden.
      (b) **Un registro de experimentos** (`bitacora/experimentos.json` o
      ampliar `taller.json`): hipótesis, qué cambió, desde qué fecha, qué
      métrica lo juzga (retención a 30 s, % visto, vistas del Short, clics a
      la Clave) y veredicto a las dos semanas (regla 26). Un cambio a la vez
      por métrica, si no nada se puede atribuir. Que la auditoría de la
      mañana lea este registro y diga cuántos días le faltan a cada prueba.
      (c) **Un módulo "Ver" en el Taller** con el último render por pieza
      (fotograma por sección, carátula, Short) y las métricas al lado, para
      mirar lo que se publica sin abrir YouTube. TALLER 1 (panel de métricas
      como cuarto módulo) entra aquí.
      Regla que lo hace posible: la sesión de día puede RENDERIZAR variantes
      y publicar tableros (no toca producción, regla 24 intacta); la noche
      aplica lo decidido y anota el experimento.
