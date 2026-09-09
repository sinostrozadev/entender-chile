# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó están `REALIZADOS.md` y el archivo del día.

Última actualización: 02-09-2026, sesión de la noche (limpieza ORDEN 1:
fuera lo hecho y lo resuelto sin marcar; la sección histórica "La puerta"
vive en decisiones.md, entradas del 28-08 y 30-08).

---

## CANAL DE AVISOS BARRIDO→CHATGPT — CONSTRUIDO (04-09, diseño de Santiago)

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
CUALQUIER push del repo — la API no acepta filtro por rutas ni ramas.** Se
neutralizó con guardas de salida-en-segundos (dedup + ventana horaria
03:20-04:25) y la Clave quedó sin webhook (esperadora pura). Además no hay
API para BORRAR un webhook ya creado: si mete ruido, el remedio es
desactivar la rutina o pedir el filtro. **LADO DE SANTIAGO: APAGAR las 2
tareas de GPT de guiones (04:00 y 04:15)** — si corren igual, solo
duplican (pisan el guion de Claude con uno equivalente), no rompen.
El plan original, para referencia: GPT queda solo donde su navegación vale (preselección ya
por evento ✓; migrar informe y claves a escucha de evento); Claude toma los
2 guiones (puras transformaciones del repo, sin web) como rutinas
disparadas por WEBHOOK de GitHub (push del informe → guion informe; push de
la entrega → guion clave; create_webhook_trigger de la API), con prompt
vivo en prompts/. Además, NUEVA CONVENCIÓN para las tareas de GPT: el texto
en ChatGPT es solo el arranque de 3 líneas y las indicaciones viven en
prompts/ (las validaciones del evento viven como PASO CERO dentro de
prompts/seleccion.md — un archivo por tarea, corrección de Santiago; su
tarea corta de ChatGPT apunta a seleccion.md como siempre). Límite real
de Claude: no es el número de rutinas, es la cuota compartida (five_hour) —
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
en la lista del cambio de hora del 6-09) — si no hay
`contenido/preseleccion/FECHA.md` en main, la hace Claude leyendo AHORA
`prompts/seleccion.md` + contrato (prompt vivo:
`prompts/respaldo-preseleccion.md`); si tampoco hay barrido, lo despierta y
espera; sin material NO inventa: avisa. Notifica SOLO si intervino o no
pudo; silencio cuando GPT cumplió.

## MÁQUINA DE ESTADOS — paso 1 HECHO (08-09 noche)

- [x] **Vigía y estado del día.** ✅ 08-09, 23:05. `scripts/estado.js` calcula la
      etapa desde los archivos (probado en 4 casos) y `prompts/vigia.md` +
      rutina `trig_01LUtn4fSJjBsCzqdoWeVviH` (Haiku, 02:15 y 05:15, con repo
      montado) avisan al teléfono solo si falta un eslabón. Probada con corrida
      real: 13 s, salida 0, sin notificar. Primera vigilancia de verdad: 02:15.
- [ ] **Nadie escribe todavía `contenido/estado/FECHA.md` en el repo.** El vigía
      solo lee (`--solo-leer`) para no meter commits en la madrugada. Mientras
      no se escriba, GPT no puede leer el estado y el panel no lo muestra. Paso
      siguiente y barato: correr `node scripts/estado.js` en el workflow de
      métricas (ya corre panel-cronograma.js ahí) y, más adelante, en cada push
      de contenido. **Ojo: un estado viejo commiteado es peor que ninguno** — si
      se escribe, que sea siempre fresco.
- [ ] **Lo que sigue de la máquina** (orden acordado): re-chequeo antes del push
      (mata el bug del 07-09) → revisión por evento + la web esperando el
      veredicto → GPT a un solo PR → Claude a dos despachadoras. El §5 del
      diseño ya tiene la vuelta del bucle como principio general, con la tabla
      de quién repara qué.
- [x] **Decidido: la web ESPERA el veredicto** (Santiago, 08-09 noche). Se
      implementa en `web/src/lib/contenido.ts` → `informes()`, con fecha de corte
      desde el 09-09 para no borrar del sitio los informes anteriores a la
      revisión. Va junto con mover la revisión a por evento (paso 3).
- [ ] **Sigue abierto:** si la guardia reescribe el exprés rechazado (hoy el
      prompt se lo prohíbe; bajo el principio del bucle debería, ciñéndose al
      material capturado y con tope de dos vueltas).
- [ ] **Antes del paso 4, Santiago verifica en ChatGPT:** cuántas tareas tiene
      ocupadas de las 5 (¿3 de contenido, o 5 con los respaldos del informe y la
      Clave?) y si una tarea programada puede volver a dispararse mientras ya
      está corriendo. Si NO puede, un disparo que llegue mientras escribe el
      informe se pierde: por eso el despachador único va acompañado de UNA tarea
      de respaldo por reloj (2 en total, 3 slots libres), y el vigía avisa igual.

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

## URGENTE — con plazo

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

- [x] ~~Responder a Google la revisión de la API~~ **DECIDIDO NO ENVIAR
      (07-09).** Santiago frenó el envío y tenía razón en las tres objeciones.
      Verificado contra la doc oficial: la restricción de "privado" aplica al
      MOMENTO DE LA SUBIDA, no impide publicar (prueba: 33 videos subidos por
      la API, 29 públicos). Lo único que destrabaría la auditoría es que el
      script programe solo, y programar ya se puede desde Studio. A cambio, el
      correo era un dossier que enfatiza la automatización justo cuando la
      política de contenido inauténtico desmonetiza canales de plantilla.
      Razonamiento completo: `docs/auditoria-api/DECISION-07-09.md`. El plazo
      se deja expirar; nada cambia en la operación.

## EL AGENTE DE GUARDIA — LUZ VERDE (02-09 noche, con la condición resuelta)

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

**✅ PROYECTO DE LA NOCHE — HECHO (noche del 03→04-09): la fase 2 está
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
ÁNGULO ("¿por qué le importa a una persona común?" — sin ángulo no se fuerza
el Short, se notifica para decisión humana), y la regla de cifras afinada (una
publicación oficial citada por la prensa SÍ habilita la cifra nombrando a la
institución). Rutina v4 cargada; el Short de la tasa se reescribió con las
cifras reales de la EOF (TPM 4,5%, sin cambios a 24 meses, inflación esperada
3,3%) y se re-produjo como ejemplar del formato. **Le queda a Santiago: borrar
en Studio los DOS videos viejos de la prueba: `AZpTnPoPg2I` (deformado) y
`GMSTAx1-62o` (formato corto sin contexto).**
Patrón nuevo (04-09, pedido de Santiago): **el prompt vivo de la guardia ES
`prompts/guardia-reloj.md`** — la rutina solo sincroniza y lee el archivo en
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
hallazgo — la rutina redactora no navega, hoy escribe con el material + el
informe. Y alimentar `datos/series/` (disputa 9). Otro cabo: al PUBLICAR un
video nadie escribe `contenido/videos/` (por eso la web estuvo sin embeds
30-08→03-09; esta noche se rellenaron a mano los 10 ids) — el reloj de
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

## Dependen de Santiago



- [x] **Auditoría matinal: RUTINA CREADA (noche 02-09)**, con la disputa 7
      cerrada por Santiago: la rutina de las 09:30
      (`trig_01GDbvJ1Wjzy25bnVRCXgygZ`) escribe `bitacora/FECHA-auditoria.md`
      y la sesión de día la LEE y profundiza, ya no la reescribe. Primera
      corrida: mañana 03-09.

- [x] **Disputa 1 CERRADA (03-09)**: las imágenes generadas entran como
      identificadores de serie y sección, con variación diaria por código y
      la tipografía mandando en los datos (regla 29 nueva de REGLAS-DURAS;
      entrada en decisiones.md). Las 10 de sección ya están commiteadas.

- [ ] **Fondos: elegir intensidad en las láminas de Descargas**
      (`entender-chile-demo-imagen/`): 4 familias x 3 fuerzas por modo
      (cortina y tarjeta). A la fuerza original eran invisibles; se itera
      con Santiago hasta conseguirlo. La apertura en frío ya quedó ACTIVADA
      aparte (debuta el 03-09).

- [ ] **Reservar el handle** @entenderchile en TikTok e Instagram (no
      implica publicar).
- [ ] **Funciones avanzadas de YouTube**: Settings → Channel → Feature
      eligibility → Advanced (cédula o video). Desbloquea enlaces externos,
      pruebas A/B de miniaturas y la postulación a monetización.
- [ ] **Voz de respaldo S0 (~día 17 del mes)**: segundo recurso Speech plan
      S0 en portal.azure.com → secrets `AZURE_SPEECH_KEY2` y
      `AZURE_SPEECH_REGION2`. El código ya cae solo al respaldo.
- [ ] **Facebook**: el Reel diario de la fase 1 (dos semanas midiendo antes
      de automatizar; plan en `ideas/facebook.md`).
- [ ] **Tagline**: sigue en duda "El resumen sin gritos"; alternativas en
      `ideas/tagline-alternativas.md`.
- [ ] **Música de los Shorts**: elegir una pista en la Biblioteca de audio
      de YouTube, si se quiere música (hoy salen sin ella y funcionan).
- [ ] **Noticias que faltaron el 29** según tu ojo: nombrarlas para rastrear
      en qué etapa se perdieron (barrido, olla o informe).
- [ ] **Notificaciones**: permitir que la app de Claude se salte el modo
      silencio en Android, si quieres que las alertas de madrugada
      despierten.

## Para la sesión de la noche (código y prompts)

- [x] ~~**SHORT 1: el sello se superpone a la primera tarjeta**~~ **RESUELTO
      (06-09, sesión local).** Causa confirmada: la sesión de la noche del
      05-09 hizo que los Shorts partieran en frío (EN_FRIO=1, narración en 0)
      pero `src/Short.tsx` tenía el sello clavado en `from={0}`, mientras
      `Informe.tsx` sí respeta `meta.selloEn`. Intento 1 (mover el sello a
      selloEn, como el informe) NO sirvió: en el Short las tarjetas van
      pegadas (0,6 s de hueco) y el sello dura 2,8 s, así que solo movió el
      choque a la segunda tarjeta, verificado con frames. **Arreglo final:**
      el sello VISUAL sale del Short (`meta.selloEn = -1` en short.js y
      short-urgente.js; Short.tsx respeta selloEn y -1 = sin sello) y la
      marca SONORA se queda en 0. La identidad no se pierde: la cabecera
      "ENTENDER CHILE" y el handle están en pantalla todo el video.
      Verificado con frames en el segundo 1 y el 8 del Short de la Clave del
      06-09, enviados a Santiago. Rige desde la edición de mañana; el Short
      de la Clave de HOY quedó con el defecto (ya publicado).
- [ ] ~~SHORT 1 original~~ (referencia): **el sello se superpone a la primera tarjeta en el Short de
      la Clave** (Santiago, 05-09 21:31, viendo el Short de la Clave del 06-09
      en el teléfono; captura en
      `bitacora/capturas-2026-09-06-short-clave-sello-superpuesto.jpg`). Se ven
      a la vez el texto grande "Entender Chile" con "Claves para entender las
      noticias" y la fecha (el sello) y, debajo, la tarjeta de apertura "Una
      clave para entender las noticias. ¿Por qué un senador necesita permiso
      judicial para ser juzgado?". Lo que pide Santiago: que ese texto
      "Entender Chile" no quede encima; o el sello va solo y la tarjeta
      espera, o el sello desaparece del Short. Pista para la sesión local:
      en `src/Short.tsx` el sello está fijo en 0 a 2,8 s (SELLO_SEG, línea
      202) y la voz del Short arranca en 3,0 (INICIO_NARRACION en
      `build-timeline.js`, no aplica la apertura en frío porque la primera
      sección del Short es "Apertura"); revisar desde cuándo parte la
      primera tesis (t.from) en el timeline del Short y si algún cambio del
      02 al 04-09 (BUG 1, apertura en frío, Short exprés) movió ese anclaje.
      Verlo en la sesión local, no en la remota.

- [x] ~~**TARJETA 2: "En titulares" en un párrafo**~~ **RESUELTO (07-09), y la
      causa NO era la que se sospechaba.** No fueron los commits del 05-09: es
      que **el guionista nuevo (Claude) escribe los titulares todos seguidos en
      un párrafo, y GPT los escribía uno por línea**, que es como `parse.js` los
      agrupa. Por eso nació el 06-09, el primer día del guionista nuevo, y por
      eso hoy tampoco se veía en local (el guion del 06-09 que probó la sesión
      remota SÍ venía por líneas; el del 07-09 no). Verificado bajando el mp4
      del release del 07-09: el muro seguía ahí. Arreglado por los dos lados:
      el prompt exige una línea por titular, y `parse.js` trae una RED que
      parte el párrafo en frases si llega junto (con su textoPantalla y sus
      offsets propios, que era el detalle que hacía que el primer intento
      pintara el muro igual). Verificado con frame del guion real de hoy.
      Detalle original: de 30 frases en una
      sola tarjeta, con el rótulo "EN TITULARES" tapado por el texto** (Santiago,
      06-09 20:09, informe del 06-09 "La disputa por el Estrecho golpea la
      imagen de...", captura en
      `bitacora/capturas-2026-09-06-titulares-en-un-parrafo.jpg`). Lo que se
      comprobó desde la sesión remota: el guion (commit da52866, 04:47) trae
      los 30 titulares uno por línea, bien; `parse.js` de HOY los agrupa en 7
      tarjetas de 4 a 6 frases (probado sobre ese guion); el 05-09 también
      agrupaba (4 tarjetas). Aun así el video renderizado a las 08:43 muestra
      todo junto en una tarjeta de narración. Sospechosos, por fecha: los dos
      commits del 05-09 previos al render, `d25c0db` 21:25 (Shorts EN_FRIO,
      toca `build-timeline.js`) y `776a1ad` 23:02 (carátulas v2, toca
      `parse.js` +7/-2 y `dia.js`). Verlo en la sesión local reproduciendo el
      render del 06-09 (out/ de ese día o `dia.js` sin voz) y mirando si los
      eventos `titulares` llegan al timeline o si las narraciones de soporte
      se juntan. El rótulo tapado es consecuencia: la tarjeta desbordó.

- [x] ~~**TARJETA 1: "7 de cada 10" sale como "10"**~~ **RESUELTO (07-09):**
      `cifraPrincipal` reconoce las proporciones "N de cada M" como UNA cifra
      y las muestra enteras, con la etiqueta cortada en el sustantivo
      ("7 de cada 10 · personas consultadas"). El M solo ya no genera tarjeta.
      Probado con la frase real del informe del 06-09. Detalle original: (Santiago, 05-09 noche,
      informe del 06-09 "La disputa por el Estrecho golpea la imagen de...",
      sección "El Estrecho y la respuesta del Gobierno", minuto 2:04; captura
      en `bitacora/capturas-2026-09-06-tarjeta-7-de-cada-10.jpg`). El párrafo
      dice "7 de cada 10 personas consultadas cree que existe una pretensión
      argentina sobre el paso" y la tarjeta automática muestra el número
      grande "10" con la etiqueta "personas consultadas cree que existe". Es
      el extractor automático de `parse.js` (cifraPrincipal): descarta el 7
      por ser menor que 10 y toma el 10 porque lo sigue "personas". Una
      proporción "N de cada M" es UNA cifra y debe mostrarse entera ("7 de
      cada 10") o no mostrarse; y la etiqueta cortada en "cree que existe"
      es el mismo problema de etiquetas que no terminan en sustantivo. Misma
      familia que el "544.800" del 04-09: cada cifra automática nueva que
      falla suma un argumento para que el guion marque sus [DATO] y el
      automático quede solo como red. Verlo en la sesión local.

- [ ] **REVISIÓN 2: la rutina de Fable se recreó bien; decidir cuándo apagar
      la de Sonnet.** ⚠️ REABIERTO el 08-09 a las 22:30. La rutina que dejó la
      sesión remota (`trig_012mLfmCi2jDoiS3zRFqETy8`) se creó **sin `sources`**:
      arrancaba en un directorio vacío, sin repo, y su única corrida murió
      intentando clonar (403). Como yo había apagado la vieja a las 07:32
      fiándome de la nota, la madrugada del 09-09 iba a quedar sin revisión y
      sin video. Arreglado la misma noche: vieja **reactivada** (04:40), rota
      **desactivada**, y creada `trig_01CR3g2re9G7warvfdt4MfMS` (Fable, 04:45,
      con el repo montado y con WebSearch, que el modo corrección necesita).
      Las dos corren esta noche; el punto 3b del prompt evita el trabajo doble.
      **Qué falta:** ver dos o tres madrugadas seguidas de la de Fable y recién
      ahí apagar la de Sonnet. Nueva regla dura 27 para que no se repita.
      Origen: Santiago decidió que la revisión corra en Fable y que, ante un
      rechazo por cifra, verifique el dato correcto, corrija y republique. La
      sesión remota creó la rutina nueva `trig_012mLfmCi2jDoiS3zRFqETy8`
      "Revisión editorial Entender Chile (Fable, 04:45)", cron `45 7 * * *`,
      modelo claude-fable-5-1, prompt vivo en `prompts/revision-editorial.md`
      (v3, con el punto 3c "modo corrección"). La vieja
      `trig_019cchTdDCVeVzVh8HjrZrYG` sigue activa a las 04:40 y solo la
      sesión local puede desactivarla; mientras exista, la nueva la toma como
      primera lectura (punto 3b) y no duplica el push. Desactivar la vieja y
      dejar a la nueva sola. Con esto REVISIÓN 1 queda absorbido.

- [x] **REVISIÓN 1: cargar el prompt nuevo en la rutina "Revisión editorial"**
      (04-09). ✅ ABSORBIDO por REVISIÓN 2 (08-09): la rutina nueva lee el
      prompt vivo del repo, así que nunca más hay que "cargarlo". El prompt con la categoría e (redondeo en voz) y la fuente
      circular como categoría b está en `prompts/revision-editorial.md`. La
      rutina (trig_019cchTdDCVeVzVh8HjrZrYG) se creó por API desde la sesión
      local y solo esa sesión puede actualizarla: la sesión remota lo intentó
      y fue rechazada. Hasta que se cargue, la revisión sigue con las cuatro
      categorías de antes; el validador ya avisa igual.

- [ ] **AUDITORIA 1: guarda de dedup omitida, el guionista del informe se
      disparó dos veces** (hallazgo de `bitacora/2026-09-07-auditoria.md`).
      `contenido/guiones/informe/2026-09-07.md` quedó bien a las 01:49, pero a
      las 04:05:58 una segunda ejecución de la misma rutina lo reescribió con
      contenido distinto (commit `1e1b98e`), justo después del push del guion
      de la Clave (03:58). El propio sistema lo detectó y revirtió solo 26
      segundos después (commit `0449173`, "guarda de dedup omitida"), sin
      pérdida de datos. Causa: `prompts/guion-informe.md` no tiene, en
      ninguna de sus 184 líneas, una instrucción que le diga a la rutina que
      compruebe si `contenido/guiones/informe/AAAA-MM-DD.md` ya existe en
      main antes de generar. **Fix:** agregar entre la línea 1 (el contrato de
      archivos) y la línea 3 ("Primero lee del repositorio...") un párrafo de
      guarda de dedup: si el archivo de hoy ya existe completo en main, no
      regenerarlo. Ver también EVENTOS 1 abajo: esto pasó porque la rutina
      del guion informe escucha CUALQUIER push, no solo el suyo.

- [ ] **AUDITORIA 2: el horario viejo de esta misma auditoría sigue en dos
      archivos** (hallazgo de `bitacora/2026-09-07-auditoria.md`, segundo día
      seguido; propuesta 3 de la auditoría del 06-09 ya lo pedía y no se
      aplicó). En `prompts/auditoria-matinal.md` líneas 3-4: cambiar "Tarea
      diaria de las **09:30** de Chile... (las métricas llegan ~08:47)" por
      "**05:30**... (las métricas llegan ~05:00)"; la línea 10-11 ("No
      confundir con el guardián (06:07)... corre tres horas después") también
      quedó vieja, pero antes de reescribirla hay que confirmar contra qué
      rutina se compara ahora ("guardián" del Informe de la mañana a las
      06:00, o "Guardia" de urgentes cada 2 horas: son dos cosas distintas).
      Además, en `scripts/panel-auditoria.js` línea 28 (y el comentario de la
      línea 5) el mismo texto fijo "la rutina de las 09:30" se inyecta cada
      mañana en el panel que ve Santiago: cambiarlo a "05:30".

- [ ] **EVENTOS 1: que las rutinas de Claude despierten con la finalización
      de las rutinas de GPT, no con cualquier push** (pedido de Santiago,
      07-09, revisando la auditoría del día). Hoy se vio el costo concreto de
      no tenerlo bien resuelto: el guionista del informe (AUDITORIA 1) se
      disparó de nuevo porque su webhook "dispara con CUALQUIER push del
      repo" (limitación ya documentada arriba, sección CANAL DE AVISOS
      BARRIDO→CHATGPT: `create_webhook_trigger` no acepta filtro por rutas ni
      ramas, y no hay API para borrar un webhook ya creado). Por eso hoy
      conviven dos soluciones a medias: el guionista del informe
      (`trig_01HUjC4MjKGmmpDMApn8gtJm`) usa webhook + guardas de dedup y
      ventana horaria, y el guionista de la Clave
      (`trig_017nkjJWR5Voud4dYgPhvwF7`) quedó como "esperadora pura" (solo
      reloj 03:50) precisamente para evitar el ruido del webhook. El propio
      `bitacora/cronograma.json` (fila "Guionista de la Clave") ya anota
      "pendiente fusionar los dos guionistas en una rutina reactiva". Revisar
      en la sesión local: si ya existen los PR de señal por evento (#2, #3,
      #4: barrido-listo, preseleccion-lista, informe-listo) que SÍ dan un
      commit específico y filtrable por archivo tocado, ¿pueden los dos
      guionistas (y quizás la revisión editorial) escuchar esos PR en vez del
      webhook general del repo, con guarda de dedup por fecha como ya usa el
      canal de avisos? Relacionado con TIEMPOS 1 (la propuesta de acortar la
      madrugada ya tocaba este mismo punto, "que los agentes dependientes
      escuchen"): esto podría resolverse como parte de esa migración en vez
      de por separado.

- [ ] **TIEMPOS 1: acortar la madrugada dos horas y que los agentes
      dependientes escuchen** (pedido de Santiago, 03-09). Propuesta completa
      en `bitacora/2026-09-03-propuesta-tiempos.md`: medido, la cadena tarda
      4 h 10 y trabaja 1 h 45. Tres movimientos: las rutinas de Claude nacen
      esperando su archivo de entrada con el bucle del guardia (revisión de
      dos vueltas, guardián a las 04:00); las tareas de ChatGPT a la hora
      medida con cláusula de espera corta en el contrato; y dos cadenas en
      paralelo con el workflow reentrante (el informe se rinde sin esperar a
      la Clave). Video listo ~03:35 en vez de 05:42, con tres horas de colchón
      para reintentar. Programar ya con las horas de verano del 06-09.
      Santiago la aprobó el 03-09 por la tarde para empezar esta noche y va
      a contrastar las propuestas con GPT antes; lo que GPT aporte se suma
      al archivo de la propuesta, no lo reemplaza. Corrección hecha en la
      propuesta: los minutos de Actions no iban al 93%; agosto cerró en 23%
      y septiembre lleva ~395 min en tres días, pero el ritmo de 150 min
      diarios por re-renders agotaría los 2.000 cerca del día 13.

- [x] **WEB 1 — EN PRODUCCIÓN (03-09, madrugada)**, con el boceto aprobado
      por Santiago: 8 categorías con chips en toda la web y páginas
      /categorias/<id>/ (archivo día por día con anclas al informe); informe
      rediseñado con hero de franja ilustrada, bloques por categoría y el
      video anclado; portada del sitio con el mismo hero; imágenes de
      sección optimizadas (276 KB las 8); web.yml despliega también con
      cambios de web/**. Verificado en vivo. AFINAR CON USO: la
      clasificación sección→categoría es por reglas (web/src/lib/
      categorias.ts): si un bloque cae en la categoría equivocada, se
      agrega la palabra a la regla.

- [ ] **ORDEN, noches 2 y 3** (`bitacora/2026-09-02-orden-del-repo.md`; la
      noche 1 se ejecutó el 02-09: archivo/, PENDIENTES limpio, decisiones
      reordenada con las huérfanas, README raíz y de estrategia). Noche 2:
      engordar el contrato y quitar las copias de los cinco prompts;
      recortar guion-claves y caso-seguimiento; verificar en la edición
      siguiente que nada cambió (la revisión de las 04:40 es el control).
      Noche 3: fusiones de ideas/ (video.md, audio.md, crecimiento.md,
      secciones-de-seguimiento.md), dejando los originales en archivo/
      hasta el visto bueno. Quedaron sin registrar 2 de las 8 decisiones
      huérfanas (los diseños de la web y una octava sin nombre): la sesión
      de día las precisa con su evidencia y se agregan.
- [ ] **DATOS 1: la base de series, una para validar y para dibujar.**
      `datos/series/<indicador>.json` (fuente, unidad, periodicidad, alias,
      valores), histórico inicial de los CSV del Banco Central y del INE;
      `validar-tarjetas.js` avisa cuando un [DATO] no calza con el valor
      publicado (el 5,1 contra 1,5 del 01-09); `build-timeline.js` adjunta
      los últimos 24 valores a las marcas `lineas`; y se construye
      `TarjetaDatoLineas` (hoy `tarjetas.tsx` la manda a comparación).
      Cierra VISUAL 2. Detalle: `ideas/imagen-y-retencion.md` punto 8.
      Disputa 9 pendiente (quién la alimenta: el vigía o la tarea de GPT).
- [ ] **DATOS 2: tarjetas.** (1) Párrafo → frase clave de hasta 20 palabras
      marcada en el guion, solo esa a pantalla. (2) Cifra con referencia
      abajo (valor anterior o mismo mes del año pasado, desde la base).
      (3) Count-up y flecha que se dibuja. (4) Cita con cargo, contexto y
      comilla grande; quitar el guion corto del nombre en TarjetaCita.
      Detalle: `ideas/imagen-y-retencion.md` punto 7.
- [x] **IMAGEN 1 — EN PRODUCCIÓN (03-09, mañana)**: las cortinas y tarjetas
      usan las imágenes de sección con variación diaria sembrada (regla 29),
      velo 0,24/0,84, cortina opaca. Verificado en el video renderizado del
      03-09 (re-corrida de las 06:32, los 4 nuevos privados ~07:57).

- [ ] **IMAGEN 2: "En titulares" a 90 segundos.** Primero la opción B (tope
      de 12 palabras por titular; hoy miden ~30 y el bloque es el 23% del
      video) y mover el bloque ANTES del dato curioso. Medir en la edición
      siguiente; el tope de cantidad (opción A) rompe "nada queda sin
      sonar" y es la disputa 3, de Santiago.
- [ ] **IMAGEN 3: el tiempo casual y con dos localidades** (Santiago + una
      capital regional que ROTA por día del año, módulo 15; nunca nombrar
      lo que no va a pasar; máximo 12 palabras por localidad). Toca
      `prompts/informe.md` y `prompts/guion-informe.md`. Roza la disputa 4
      (el clima como excepción declarada).
- [ ] **IMAGEN 4: apertura en frío.** 0:00-0:12 la noticia de portada
      entera, después el sello, después la apertura acortada a 15 s. El
      sello cabe en la pausa de sección del TTS. El capítulo 1 pasa a
      llamarse por la noticia. (La mecánica del sello movible ya existe:
      `meta.selloEn`, IMAGEN 0.)
- [ ] **IMAGEN 5: puntaje de portada, una decisión para las tres.** El
      informe declara la NOTICIA DE PORTADA (0-10: alcance, consecuencia,
      nombre propio buscable, proximidad, novedad) y título, miniatura y
      apertura la leen de ahí. Esto absorbe también el defecto viejo de que
      la cifra de la miniatura puede ser de otra noticia que el titular, y
      el rediseño de miniaturas que Santiago pidió (se ven lavadas: probar
      lienzo invertido, máximo 4 palabras, legibilidad a 120 px).
      **Anotar el puntaje de cada edición en la bitácora y revisar en dos
      semanas si predice vistas.**
- [ ] **TALLER 1**: el panel de métricas como cuarto módulo del Taller
      (https://claude.ai/code/artifact/48d0192b-0b54-4d8c-9c72-4e628c520d0f),
      cuando el Taller lleve unos días de uso.
- [ ] **TALLER 2**: barrer las 38 rayas largas viejas del repo (previas a
      la regla; en src/tarjetas.tsx, workflows, README, scripts y un
      ejemplo).
- [ ] **PANEL 3 (decisión pendiente): el artifact publicado va un día
      atrás entre sesiones.** La causa de datos ya se corrigió (todo se
      dibuja desde HIST); queda que el artifact es una copia que solo se
      republica desde una sesión. Salidas: (a) republicar en cada sesión de
      la mañana; (b) servirlo desde la web pública en ruta no enlazada —
      recomendada por la sesión de día, PERO ojo de la noche: el panel
      trae ids de rutinas, horarios internos y pendientes; en una web
      pública "no enlazada" es seguridad por oscuridad. Si se toma la b,
      antes definir qué secciones NO viajan. (c) capacidad de datos en el
      artifact: descartada hoy.
- [ ] **VISUAL 3 (capas b y c)**: hallazgo `[MENOR]` "monotonía visual" en
      la revisión editorial (con cuidado) y el histórico de tipos por
      edición en el panel, con dos semanas de datos.
- [ ] **Verificar las fuentes, no solo citarlas**
      (`scripts/verificar-fuentes.js`): abrir las URLs del bloque interno
      del informe y buscar la cifra principal de cada noticia; lo que no
      calce, a la bitácora. Una noche.
- [ ] **Cambio de hora del 6-09 (Chile pasa a UTC-3), hacerlo la noche del
      5-09**: rutinas de la nube una hora antes en UTC (reloj barrido 05:30
      → 04:30, observatorio 05:45 → 04:45, revisión 08:40 → 07:40, guardián
      10:00 → 09:00, reloj métricas 12:45 → 11:45, auditoría matinal
      13:30 → 12:30) y los crons de GitHub
      (barrido 05:50 → 04:50, edición 09:00 → 08:00, métricas 15:00 →
      14:00). Las tareas de ChatGPT van en hora de Chile y no cambian.
- [ ] **Vigilancia de la apertura en frío (mañana 03-09)**: el guion debe
      abrir con "## La noticia del día" (2 frases, 25-35 palabras, una
      tarjeta), la voz partir en 0 y el sello sonar al cierre de esa
      sección; el capítulo 1 de YouTube mostrará esa sección. Si el guion no
      trae la sección, todo cae al comportamiento de siempre (sin riesgo).
- [ ] **Vigilancia del BUG 1 (mañana 03-09)**: el guion nuevo debe traer la
      línea en blanco tras cada [TESIS] y el paso 2c no debe avisar nada.
      Si avisa, la regla del prompt no se aplicó.
- [ ] **Secciones Plata pública y Educación** en el informe + alinear las
      áreas de `prompts/seleccion.md` con las secciones de
      `prompts/informe.md` (hoy son dos listas distintas). Decisiones
      abiertas en `ideas/estado-de-las-noticias.md`.
- [ ] **Extraer la línea base de "¿Lo cumplió?"** (solo local: la nube no
      abre servel.cl): bajar el PDF del Servel al repo, clasificar según el
      criterio congelado el 28-08, 30 a 50 fichas, commit de congelación.

## Para la sesión de día (solo análisis)

- [ ] **Dónde se nota la IA**: lista de frases concretas con cita, sobre
      los informes publicados.
- [ ] **Inventario de errores reales** en los informes, separando error de
      hecho de omisión deliberada.
- [ ] **Auditar el criterio de selección** con varios días, a ver si el
      sesgo del 28-08 se repite.
- [ ] Ver videos de El Shot y otros canales chilenos con
      `ideas/formato-video.md` al lado: qué hacen en los primeros 30 s.
- [ ] Precisar, con evidencia, las dos decisiones huérfanas que faltan en
      decisiones.md (diseños de la web + la octava del conteo del 02-09).

## Ideas para retomar (no son tareas todavía)

- **Nota de arquitectura**: plata pública, historias abiertas y promesas
  son el mismo mecanismo (entidad con estado, evidencia fechada y una
  pregunta que la cierra). Construirlo una vez, usarlo tres veces.
- **Retención fase 2** (`ideas/retencion.md`, `ideas/formato-video.md`):
  cold open del Short, versión 15 s en días de noticia enorme, comentario
  fijado con el link al informe.

## Diferido

Palabra del día · canal de WhatsApp · Ko-fi. (Los indicadores del país
dejaron de estar diferidos: son DATOS 1.)
