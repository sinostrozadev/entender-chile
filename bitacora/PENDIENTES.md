# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó están `REALIZADOS.md` y el archivo del día.

Última actualización: 13-09-2026, sesión de la noche (la corrección del
11-09 queda CERRADA por decisión de Santiago, ver estrategia/decisiones.md;
entra el bug de medición de metricas.js; la retención de los largos queda
medida y deja de necesitar decisión).

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

## AGENDA DEL 15-09 (Santiago, la noche del 14): si la v3 salió bien

- [ ] **Revisión completa del proyecto**: recorrer todo el repo y dejar SOLO
      lo que hoy se usa; borrar (o mover a `archivo/`) lo que ya no sirve.
      Candidatos evidentes tras la v3: `prompts/guionista.md` y
      `prompts/revision-editorial.md` (sin rutina que los lea), los prompts y
      workflow de la prueba de flujo (`prueba-flujo.md`, `prueba-validador.md`,
      `prueba-flujo.yml`, `contenido/pruebas/`), las rutinas apagadas, los
      workflows `senal-*`, documentos que describan la cadena anterior
      (cronograma viejo, propuestas ya ejecutadas), y las secciones de esta
      lista que ya no aplican.
- [ ] **Preparar el Taller**: el lugar donde se leen, evalúan y mejoran los
      prompts, y donde se definen y configuran los distintos flujos (informe,
      Clave, exprés, ...). Mezcla de taller técnico y taller estratégico:
      evaluar estrategias, qué resulta y qué no, carátulas, títulos, imágenes.
      Punto de partida: `taller/` (hoy navegador + editor de prompts) y la
      entrada TALLER 3 de esta lista (tableros de variantes renderizadas,
      registro de experimentos, módulo "Ver").

## LO QUE APARECIÓ AL UNIFICAR LOS PENDIENTES (13-09)

- [ ] **Revisar qué MÁS depende de un push del bot.** El 14-09 se descubrió que
      `estado.yml` no se enteraba del barrido porque los pushes con
      GITHUB_TOKEN no disparan workflows. Se arregló con `workflow_run`, pero
      la misma trampa puede estar en otros lados: `web.yml` escucha rutas de
      contenido y hay piezas que commitea el bot (descripciones, podcast,
      métricas). Listar qué workflow escucha a qué, y cuál de esos disparos
      viene de un push de bot. Una noche.

- [ ] **`contenido/casos/por-verificar.md` lleva 64 líneas y nadie lo vacía.**
      Crece unas 5 por día desde el 27-08 y las más viejas, de hace diecisiete
      días, siguen ahí (JUNAEB-SOSER, Democracia Viva). Su README dice "la
      rutina de la mañana lo revisa": o la rutina no lo está revisando o lo
      revisa y no puede cerrar nada, y en los dos casos la lista dejó de ser
      una lista. Decidir cuál de las dos es, y si el que verifica debe ser la
      sesión local (la nube no abre varios medios chilenos por el proxy).
      Dueño: sesión de día para el diagnóstico, noche para el arreglo.
- [ ] **`estrategia/hoja-de-ruta.md` tiene 23 casillas sin marcar** y varias ya
      están hechas hace semanas (identidad de cuentas, escaparate del canal).
      Revisarla entera una vez, marcar lo hecho, y bajar a esta lista lo que
      siga vivo y sea accionable. Después la hoja de ruta se queda como mapa
      del proyecto, no como lista de tareas (regla 41). Dueño: sesión de día.

## MÁQUINA DE ESTADOS: CADENA LINEAL v3 EN PRODUCCIÓN desde la madrugada del 15-09

- [ ] **Primera noche en vivo de la v3 (15-09). Nunca corrió con piezas
      reales.** Lo decidió Santiago el 14-09 en la noche ("prefiero que nos
      arriesguemos ahora ya"). Qué es: GPT escribe las CINCO piezas (vuelve a
      escribir los guiones), una por turno, y Claude valida cada una contra su
      prompt antes de que exista la siguiente. Orden: preselección → informe →
      guion del informe → entrega de Clave → guion de la Clave. El estado
      (`scripts/estado.js`) es lineal y lo mueven los veredictos por pieza de
      Claude (`contenido/veredictos/FECHA-<pieza>.md`); la vista trae PIEZA,
      PROMPT y ARCHIVO, que GPT y el validador leen tal cual. Tope: dos vueltas
      de corrección por pieza, después BLOQUEADA y etapa `bloqueado_humano`
      (el vigía alarma). La revisión del día la escribe el validador al aprobar
      la última pieza: sigue siendo la compuerta del render y de la web.
      **Qué mirar en la mañana:** `contenido/estado/2026-09-15.md` (ETAPA,
      VUELTA, PIEZA), `contenido/veredictos/2026-09-15-*.md` (cinco archivos,
      con sus vueltas), el log de `estado.yml` ("Claude despertado por API" en
      cada validar_*), y las corridas de `trig_01B8tLFaXe7h1YBCciFE2iKf`.
      **Riesgos conocidos:** (1) el despachador espera el veredicto hasta 10
      min en la misma corrida; si ChatGPT no sostiene la espera, el PR #6 lo
      despierta igual con cada veredicto. (2) Si un veredicto se pierde, la
      etapa queda en validar_* y el reloj de las 02:20 del validador la toma.
      (3) Los guiones vuelven a GPT: calidad por ver contra la rúbrica.
      **Apagado, no borrado:** rutinas `trig_01CR3g2re9G7warvfdt4MfMS`
      (revisión 04:45), `trig_01HUjC4MjKGmmpDMApn8gtJm` (guionista) y
      `trig_017nkjJWR5Voud4dYgPhvwF7` (guionista de la Clave); workflows
      `senal-preseleccion.yml` y `senal-informe.yml`; las tres tareas viejas de
      GPT. `prompts/guionista.md` y `prompts/revision-editorial.md` quedan sin
      rutina que los lea. Si la v3 falla, volver atrás es reactivar eso.
- [ ] **Antes del paso 4, Santiago verifica en ChatGPT:** ya no aplica, el
      despachador único está en producción con una sola tarea.
- [ ] **Después: separar los flujos** (Santiago, 14-09): un estado y una
      tabla por flujo (informe, Clave, exprés), sobre la misma máquina.

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
- [ ] **Hipótesis (b), la única viva: el tráfico de afuera rebota.** Cómo se
      mira, sin pedir nada nuevo a nadie: Analytics separa por fuente con
      `insightTrafficSourceType`, así que una consulta más en `metricas.js`
      dice qué porcentaje de las vistas de los largos viene de Shorts, de
      sugeridos o de búsqueda, y qué retiene cada una. Si los sugeridos rebotan,
      lo que hay que trabajar es la apertura y la promesa del título (CALIDAD 1
      punto 4 y IMAGEN 4, apertura en frío), no la duración.

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

- [ ] **PR #5, abierto desde el 11-09: fusionarlo o cerrarlo.** Trae la
      corrección completa de la cifra del 11-09 en los cuatro archivos, escrita
      por la revisión editorial que rechazó esa edición. Decidiste dejar el
      texto como está, pero la corrección está lista y fusionarla es un clic; si
      no se fusiona, conviene cerrarlo para que no se pudra ahí. Ojo con lo
      segundo: mientras siga abierto, hay una rutina en la nube
      (`trig_01Kckz7b9oRBzYjyi65x641j`) que despierta cada 4 horas a mirarlo y
      se vuelve a agendar sola. Ya lleva más de veinte corridas.


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

- [ ] **MÁQUINA V2, PRUEBA 1: PASÓ ENTERA (14-09, 22:27 a 22:41), incluido
      el despertar de Claude por evento (con webhook `push`, no `pull_request`).** Rastro en
      `contenido/pruebas/flujo/2026-09-14-pieza.md` y `-veredicto.md`: pieza
      vuelta 1 (3 regiones, sin firma) → CORREGIR → vuelta 2 (5 regiones +
      FIRMA) → APROBADA → FIN "aprobada en la vuelta 2". Doce minutos, cero
      intervención humana en el lado de GPT: sus tres turnos los despertó el PR
      #6 (v1 a mano para arrancar; v2 y FIN por evento).
      **Lo que NO funcionó:** el webhook de GitHub tipo `pull_request` sobre la
      rutina validadora (`eb97eecb`, creado 01:28Z) no disparó con ninguno de
      los tres eventos del PR #6 que llegaron después. Los dos veredictos de
      Claude salieron de corridas lanzadas a mano por API desde la sesión
      local, no del webhook. Como el filtro por rama no se puede expresar por
      API, se creó un segundo webhook tipo `push` (`8925b806`, 01:39Z), que es
      el tipo que ya usa el guionista y despierta con CUALQUIER push del repo;
      el PASO CERO del validador lo hace salir en segundos cuando no es su
      turno. **PROBADO a las 01:40Z:** despertó un segundo después del push y
      terminó en 25 s sin tocar nada. Con eso el eslabón de Claude por evento
      queda demostrado; lo que cuesta es que despierta con TODOS los pushes
      (unos 30 al día, Opus, ~25 s cada uno), así que la rutina quedó
      DESACTIVADA hasta la próxima prueba (se enciende con un `update
      enabled:true` por API o desde claude.ai/code/routines).
      Rutina: `trig_01Rp682KSf5rAjThxSoEWHm7` (Opus, repo adjunto). Aprendido:
      las rutinas creadas por agente SÍ nacen con el repo si se pasa `sources`.
      La API del webhook exige `hook_type=app`, `source=github`, `scope_id` y
      `events`; ningún nombre de filtro por rama (`head_ref`, `branch`,
      `branches`, `paths`) fue aceptado con efecto.
      **Ojo con el horario de cualquier prueba nueva:** comparte la rama del PR
      #6 con producción y cada evento de prueba despierta también al
      despachador real (sale solo). Nunca entre 01:00 y 05:00.
      **PRUEBA 2 (por API): HECHA el 14-09 a las 22:58, y ya está en
      producción para la revisión.** Santiago generó el token de la rutina de
      revisión temprana desde la interfaz (lápiz → Selecciona un disparador →
      Agregar otro disparador → API → Generar token); quedó en GitHub como
      secrets `CLAUDE_RUTINA_REVISION_ID` y `CLAUDE_RUTINA_REVISION_TOKEN`.
      Disparo directo probado: HTTP 200, la rutina arrancó en 3 s con el repo,
      leyó el payload como aviso (llega envuelto en routine-fire-payload,
      marcado como dato) y salió por la guarda 0a en 27 s sin tocar nada.
      Desde esta madrugada `estado.yml` la despierta cuando la etapa pasa a
      `guiones_listos` (~01:52); los relojes de 02:20 y 04:45 quedan de red.
      Ojo: el token se pegó en el chat de la sesión local; conviene
      REGENERARLO en el mismo modal cuando haya calma y actualizar el secret.
      Para el resto de las rutinas que en el paso 5 pasen a evento, es el
      mismo camino: token por rutina, un secret por rutina, un `case` más en
      `estado.yml`.
      Limpieza pendiente cuando termine: borrar `prompts/prueba-flujo.md`,
      `prompts/prueba-validador.md`, el workflow y `contenido/pruebas/`, o
      moverlos a `archivo/`; y archivar la sesión persistente
      `session_01SSDPuw54qE8NwJ7FGxgUQ3` (fue el respaldo manual del 14-09).

- [ ] **Titular que convierte una proyección o un anuncio en hecho consumado — 3 mañanas seguidas marcado (12, 13, 14-09), auditoría del 14-09.**
      `prompts/guion-informe.md`, sección "EN TITULARES" (cerca de la línea
      110): falta una regla que proteja el matiz "proyecta / anticipa / prevé
      / anunció" al comprimir a titular de máximo 12 palabras. Sin ella, la
      revisión editorial encuentra el error pero no lo corrige (no es un dato
      verificable contra fuente externa, cae fuera del punto 3c de modo
      corrección). Casos verificados: 12-09 "Bolivia retirará subsidios..."
      por "proyecta eliminar..." (`contenido/revisiones/2026-09-12.md` línea
      24); 13-09 "El Presupuesto 2027 declarará al empleo como prioridad" por
      "El Ejecutivo anticipó..." (línea 24 de esa revisión); 14-09 "Bolivia
      amplió su estado de excepción" por "anunció un decreto para ampliar"
      (`contenido/revisiones/2026-09-14.md` línea 22, que cita expresamente
      "el mismo patrón marcado el 12 y el 13 de septiembre"). Propuesta:
      agregar a esa sección la regla "si el informe usa 'proyecta',
      'anticipa', 'prevé', 'anunció' o un anuncio no ejecutado, el titular
      debe conservar ese matiz, no convertirlo en hecho consumado".

- [ ] **RELEASE 1: un HTTP 500 al crear el release deja los videos
      renderizados pero sin publicar** (auditoría del 14-09; Santiago pidió
      anotarlo para la noche). El 13-09 la ejecución 34746265785 renderizó los
      4 videos y commiteó las descripciones, pero `gh release create` recibió
      un 500 de GitHub, la línea `|| echo "release ya existía"` lo tomó por
      duplicado y el `gh release upload` siguiente falló con "release not
      found": job en failure a las 05:52 y videos públicos recién a las 11:22,
      con el estado en `videos_listos` a las 19:16. Pasó 21 minutos después
      de la auditoría y del vigía, así que nadie lo vio. Arreglo en
      `.github/workflows/edicion-diaria.yml` (líneas 230-232): tras un fallo
      de `create`, comprobar con `gh release view "$TAG"`; si no existe,
      reintentar `create` con una pausa corta (dos o tres veces) antes de
      subir; y que el job no termine en failure silencioso: si el release no
      existe al final, avisar (el vigía de las 05:15 ya pasó, así que hace
      falta un chequeo tardío o que `estado.yml` marque `reparar` cuando
      Edición diaria termina en failure, que ya lo escucha por
      `workflow_run`).

- [ ] **SERIE 1: montar "El Estrecho: la ruta en disputa"** (decidida con
      Santiago el 09-09; idea completa en `ideas/ruta-del-estrecho.md`).
      Serie de largos con cuenta regresiva a la interpelación del canciller
      del 28-09, cinco episodios ya definidos con su material, episodio por
      hecho nuevo y no diario, cada uno con su Short propio de gancho (no el
      resumen de cinco cosas). Sustento medido: los dos largos más vistos del
      canal son de este tema (220 y 150) y el segundo Short más visto también
      (353), pero otros dos largos del mismo tema hicieron 11 y 11, así que
      lo que predice es el hecho con nombre buscable, no el tema. Las Claves
      NO se matan: bajan a dos por semana dentro del hilo (retienen 49% a
      57%, lo mejor del canal), lo que reemplaza a CLAVE 2. Quedan fuera por
      decisión: escenarios de enfrentamiento militar, "a quién apoya Estados
      Unidos" y el nombre "Chile vs Argentina"; el motivo está escrito en el
      archivo. Para la noche: el prompt de la serie, la carátula con
      contador, y probar el prompt de imagen en Gemini.

- [ ] **CALIDAD 1: bloque visual y de guion pedido por Santiago el 12-09**
      ("hay trabajo que hacer, esas vistas no llegarán solas ni menos la
      retención"). Seis puntos, con lo medido al lado para que la noche
      decida con datos y no con gusto.
      (1) **El Short de la Clave no gusta: trabajarlo, sacarlo o cambiarlo.**
      Lo medido le da la razón: sus vistas son un tercio de las del Short del
      informe (mediana 59 contra 176) y NO convierte a la Clave larga: de 9
      pares Short→Clave, 7 pasan menos del 6% de las vistas (56→3, 35→2,
      59→2, 220→2, 99→4); la única excepción es la interpelación (82→23).
      Con SERIE 1 la Clave baja a dos por semana, así que la decisión es
      chica: o el Short de la Clave se vuelve un gancho de UNA pregunta con
      respuesta a medias (formato que sí funciona en el del informe) o se
      retira y la Clave se promociona desde el Short del informe.
      (2) **Láminas: 56 de 94 secciones de los últimos cuatro días no tienen
      imagen** (caen a textura). Dos causas distintas: el catálogo tiene 10
      láminas y el emparejador es una lista de regex en `src/fondos.tsx`
      (espejo en `scripts/imagenes-secciones.js`), así que "Fodich en
      prisión preventiva", "cupón de gas", "PISA", "Coca-Cola", "Ataques
      rusos" o "Primer 11 de septiembre" no calzan con nada; y un FALSO
      POSITIVO: `\bcaso\b` hace que la sección "Aplicado al caso" de TODAS
      las Claves (PISA, IPoM, jueces) salga con la lámina de seguridad.
      Camino en dos pasos: primero ampliar el catálogo a 30 o 40 láminas
      pedidas a Gemini en una sola sesión (educación, vivienda, energía y
      combustibles, transporte, memoria y DD.HH., tribunales, empresas,
      guerra y Ucrania, gas y servicios básicos, deporte) y darle al
      emparejador una palabra clave por sección escrita por el guionista
      (`[LÁMINA economia]`) en vez de adivinar por el título; después,
      recién, el pedido programado de 3 imágenes por edición que propone
      Santiago, que hoy no tiene por dónde ejecutarse sin una persona al
      medio (no hay API de imagen en el pipeline) y que calza con MÁQUINA 5
      si el agente de GPT genera imágenes. Regla 29 sigue: identificadores,
      no ilustración del contenido; la variación diaria por código ya está.
      (3) **La pantalla escribe todo lo que se lee.** `TarjetaParrafo`
      muestra `textoPantalla ?? texto`, y `textoPantalla` es solo el párrafo
      con numerales (`parse.js:238`): no existe síntesis. Propuesta: que el
      guionista escriba una línea de pantalla por párrafo (`[PANTALLA] ...`,
      máximo 12 palabras, o el dato) y que la tarjeta muestre ESO en grande
      y el párrafo narrado no aparezca; sin la línea, la tarjeta cae al
      comportamiento de hoy. Es un cambio de prompt + parse + tarjeta, y
      además abre espacio para la lámina del punto (2) dentro de la tarjeta.
      (4) **Se lee el título, empieza el tema y repite lo mismo.** El título
      de sección NO se narra (parse.js:146), lo que se oye repetido es la
      TESIS y el párrafo que la sigue o la cierra diciendo lo mismo con
      otras palabras. Ejemplo de hoy: tesis "once fuera, veintiséis se
      salvaron y diez casos siguen en pausa" y tres párrafos después "once
      jueces quedaron fuera, otros veintiséis se salvaron ... y diez
      expedientes siguen suspendidos". Arreglo en el prompt del guion (la
      tesis anuncia, el párrafo no la reformula: aporta el cómo o el por
      qué) y un aviso en el validador cuando tesis y párrafo comparten más
      de la mitad de sus palabras de contenido.
      (5) **Las carátulas deben llamar a entrar.** Sigue abierta la vuelta 2
      de bocetos (taller.json, PENDIENTE DE DECISIÓN desde el 05-09): ahí
      está la decisión que falta antes de iterar más.
      (6) **Reorganizar el Taller** para que sea un taller de verdad: ver
      TALLER 3 abajo.

- [ ] **TALLER 3: convertir el Taller en un lugar de pruebas, no un editor
      de prompts** (Santiago, 12-09). Hoy `taller/` es navegador + editor con
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

- [ ] **YOUTUBE 1: dejar los videos PROGRAMADOS directamente, no privados**
      (Santiago, 09-09). Hoy el paso 7 sube las cuatro piezas en privado y él
      las publica a mano cada mañana. La pieza de código YA EXISTE:
      `scripts/youtube-subir.js` acepta `--programar HH:MM` (o la variable
      `YT_PUBLICAR_HORA`) y arma el `publishAt` en hora de Chile (líneas 46,
      120 y 122). Falta decidir y probar tres cosas.
      (1) **Probarlo, porque nunca se probó.** La cabecera del script afirma
      que `publishAt` "SOLO funciona cuando el proyecto pasó la auditoría",
      y el 07-09 se decidió no enviarla (`docs/auditoria-api/DECISION-07-09.md`).
      Pero esa afirmación es una premisa heredada de la misma familia que ya
      resultó equivocada una vez: el 07-09 se verificó contra la doc oficial
      que la restricción de "privado" aplica al MOMENTO DE LA SUBIDA y no
      impide publicar. Puede que `publishAt` sí funcione. Es barato
      comprobarlo: subir una pieza con `--programar` y mirar si YouTube
      acepta la hora o la deja privada. Si funciona, no hace falta ninguna
      auditoría.
      (2) **La hora por pieza.** Sugerido en su momento: informe 07:00, Short
      12:00, Clave 14:00, Short de la Clave 18:00. Hoy el paso 7 usaría una
      sola hora para las cuatro; habría que pasar `--programar` distinto por
      pieza, o cuatro variables de repositorio.
      (3) **Qué pasa con la revisión.** La regla del canal es que Santiago
      revisa antes de publicar. Programar directo la elimina, salvo que la
      hora quede lo bastante lejos de la subida (sube ~07:56, se programa
      para las 12:00) como para alcanzar a cancelar en Studio. Definir esa
      holgura mínima, y qué hace el guardián si detecta una pieza programada
      que no pasó revisión.

- [ ] **CLAVE 2: elegir el tema desde el banco organizado, y solo si no hay,
      desde una noticia del día** (Santiago, 09-09: "veamos de organizar las
      claves primero, si no, buscar de alguna noticia"). Hoy `prompts/claves.md`
      hace lo contrario: elige la profundización del día (línea 47) y solo
      cuando ninguna noticia la justifica toma el mejor tema pendiente del
      banco (línea 49). El banco ya tiene doce temas acumulados en
      `contenido/claves/banco-temas.md`. Lo que hay que resolver al invertir
      la prioridad: hoy el gancho de la Clave es la noticia del día ("el
      Informe diario del 4 de septiembre señaló..."), que es lo que la ancla
      a la actualidad y al Short; si el tema sale del banco, hay que definir
      con qué abre. Posible salida: ordenar el banco por prioridad editorial
      y exigir que el tema elegido tenga un ancla en el informe de los
      últimos siete días. Decidir en la noche.

- [ ] **MÁQUINA 5: agente de GPT despertado por un PR** (Santiago, 09-09, a
      partir de que la sesión remota no puede leer varios medios: el proxy
      bloquea biobiochile.cl, latercera.com, defensa.com, mineduc.cl). La
      idea: el PR es el despertador; el agente de GPT se activa con él, lee
      un archivo de instrucciones del repo y arranca el proceso completo,
      informes, revisiones, preparación de guiones. Encaja con el diseño de
      la máquina de estados de la sección de arriba (un solo disparador), así
      que va como paso de ese plan y no como pieza aparte. Lo que hay que
      definir: quién abre el PR y con qué contenido, dónde vive el archivo de
      instrucciones (candidato natural: `prompts/`, como el resto), cómo
      sabe el agente qué paso le toca (lo diría `contenido/estado/FECHA.md`)
      y qué pasa si el PR se abre dos veces. Ventaja concreta sobre lo de
      hoy: GPT sí alcanza los medios que a esta sesión le bloquea el proxy.

- [ ] **CASOS 1, la mitad hecha (13-09): falta DECIDIR si se abre el dossier de
      Fonasa.** El comparador de `scripts/casos.js` ya está arreglado (palabra
      completa en vez de subcadena, umbral de dos tercios, y lo dudoso se anota
      igual marcado como posible duplicado); probado contra el informe del 09-09,
      que ahora sí detecta la marca perdida. La línea quedó en
      `contenido/casos/por-abrir.md`. Lo que falta es editorial: Fonasa se
      querelló el 08-09-2026 contra cinco prestadores por fraude de subvenciones,
      perjuicio estimado cerca de $8.000 millones, más de 71 mil beneficiarios,
      330 mil bonos y 1,94 millones de prestaciones; ya había denunciado los
      hechos al Ministerio Público el 07-08-2026. Es un caso DISTINTO del
      megafraude de licencias falsas que ya tiene ficha: no mezclarlos.

- [ ] **TARJETA 3: el esquema de la Clave se dibuja ENCIMA del párrafo**
      (Santiago, 08-09 16:38, Clave "¿Qué es una interpelación y qué puede
      exigirle...", captura en
      `bitacora/capturas-2026-09-08-clave-esquema-superpuesto.jpg`). La marca
      es `[ESQUEMA | Camino de una interpelación]` con CUATRO nodos (línea 25
      del guion de la Clave): las dos primeras cajas se ven arriba y las dos
      últimas quedan tapadas por el párrafo narrado, que se pinta sobre ellas
      (se leen "Sesión de preguntas y respuestas" y "Consecuencias políticas
      posibles" en gris detrás del texto). El párrafo que sigue al esquema
      pasa los 500 caracteres. Pista: con 4 nodos la fila envuelve a dos
      líneas y la caja del esquema crece más de lo que el layout reserva;
      revisar `TarjetaEsquema` en `src/tarjetas.tsx` y si el ancla del
      esquema y la del párrafo caen en el mismo instante. Misma familia que
      TARJETA 2 (una tarjeta desborda y tapa lo de al lado), que ya se
      resolvió el 07-09 por otra vía.

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

- [ ] **ORDEN, noches 2 y 3** (una parte se hizo el 13-09: las disputas de
      REGLAS-DURAS.md estaban escritas como abiertas once días después de que
      Santiago las cerrara, y ya quedaron como registro cerrado) (`bitacora/2026-09-02-orden-del-repo.md`; la
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
