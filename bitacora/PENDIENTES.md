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
- [ ] **EL ARMAZÓN NO ES UNA LISTA, ES UN REGEX CON AGUJEROS (28-09).**
      `scripts/parse.js:31` decide con un regex escrito a mano cuáles bloques
      son estructura (Apertura, Cierre, Agenda, En titulares, La noticia del
      día, ¿En qué quedó?) y por lo tanto no se anuncian con voz ni llevan
      color de tema. Está anclado, que es correcto, pero deja fuera variantes
      que los guiones YA escribieron: `Agenda de hoy` (4 guiones de agosto) y
      toda la familia `En qué quedó...` con el caso pegado atrás (4 más). Un
      bloque del armazón leído como tema sale con color de sección y, desde el
      28-09 con `ENTRADA_VOZ`, **el locutor lo anuncia en voz alta**. No ha
      salido al aire porque esos guiones son anteriores a la voz de entrada,
      pero nada lo impide la próxima vez que GPT escriba una de esas variantes.
      Los seis y sus alias ya están en el taller.
      **Decide Santiago:** si `parse.js` pasa a leer la lista del taller (que
      es el paso pendiente de todo lo demás) o si por ahora se tapa el agujero
      ampliando el regex. **Dueño: el día.**
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

## MÁQUINA DE ESTADOS: CADENA LINEAL v3 EN PRODUCCIÓN (desde el 15-09; tres piezas desde el 17-09)

- [ ] **Separar los flujos** (Santiago, 14-09): un estado y una tabla por
      flujo. El primero es el de la Clave (CLAVE 4 c-d-e), que necesita el
      Taller para las dos aprobaciones; después el exprés.
- [ ] **Vigilar la madrugada del 17-09**, la primera con tres piezas y con el
      banco como etapa: que la cadena cierre en `guion_informe_listo` →
      `validar_final` → `aprobada` → `alimentar_banco` → `videos_listos`, que
      `contenido/claves/banco-temas.md` tenga commit del día, y cuánto tarda el
      render con 24 fps y concurrency 100%.

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

- [ ] **27-09, HOY: la carátula que SÍ se genera se pierde, porque el
      conector de esa ejecución no admite binarios y la ruta queda en un
      scratch que se borra.** Auditoría del 27-09
      (`bitacora/2026-09-27-auditoria.md`). Evidencia:
      `contenido/caratulas/2026-09-27-NO-PUDE.md` dice que la imagen se
      generó bien y quedó en
      `/workspace/scratch/3b1551457c46/generated_images/exec-....png`, una
      ruta que no sobrevive a la sesión. No es el mismo problema del 25 y
      26-09 (`contenido/caratulas/2026-09-25-NO-PUDE.md` y
      `2026-09-26-NO-PUDE.md`: esos días no había generador de imágenes en
      el entorno). Hoy sí generó, y aun así se perdió: es la tercera mañana
      seguida sin carátula nueva y la primera por pérdida de un archivo ya
      hecho, no por falta de herramienta. `contenido/revisiones/2026-09-27.md`
      ya lo marcó "PARA SANTIAGO" y dice que es la segunda cosa del día que
      se detiene por el mismo motivo. Falta decidir por dónde sube el PNG:
      qué conector o tipo de sesión soporta binarios para esta tarea, o si
      conviene un camino de respaldo (por ejemplo, que la sesión que genera
      la imagen la codifique en base64 y la deje como
      `contenido/caratulas/FECHA.png.b64`, texto plano que sí acepta
      cualquier conector, con un paso nuevo en `edicion-diaria.yml` o en
      `scripts/dia.js` que la decodifique antes de armar `miniatura-3.png`).
      Mientras no se decida, cada carátula que sí se genere se sigue
      perdiendo igual.

- [ ] **27-09: nombre de la Clave semanal.** Santiago quiere evaluar un
      renombre; opciones propuestas por la noche: mantener La Clave, En
      contexto, Para entender; decidir antes del primer video del camino nuevo
      (el del miércoles 30-09, si el tema se elige hoy).

- [ ] **27-09 (domingo): elegir el tema de la semana 39.** Los tres
      candidatos están en `contenido/claves/semana/2026-W39-candidatos.md`; se
      elige con `node scripts/clave.js elegir <slug> --candidato n`. Video el
      miércoles 30-09.

- [x] **26-09, HOY: la corrección del informe de hoy lleva 3+ horas
      atascada — GPT no respondió ni una pieza en toda la madrugada, segunda
      noche seguida.** Auditoría del 26-09 (`bitacora/2026-09-26-auditoria.md`).
      Los commits de preselección, informe y guion de hoy dicen literalmente
      en el cuerpo "recuperación a mano de la edición del 26-09-2026, segunda
      noche sin GPT" (una sesión de Claude los escribió sin GPT, igual que la
      madrugada del 25-09). `contenido/veredictos/2026-09-26-informe.md`
      pidió 5 correcciones menores a las 02:25:58 Chile;
      `contenido/estado/2026-09-26.md` sigue en `ETAPA: reparar_informe`,
      `REPARA: GPT (despachador)`, sin ningún cambio desde entonces (verificado
      con `git log --since`: solo hubo un commit de aviso de estado y las
      métricas de rutina). A diferencia de la escritura inicial, esta vez
      ninguna sesión de repuesto entró a aplicar la corrección: el atasco
      sigue en pie a la hora de esta auditoría (05:37 Chile) con la
      publicación (~06:30 Chile) cada vez más cerca. **Acción inmediata**:
      revisar/relanzar la tarea "Despachador Entender Chile" en ChatGPT, o
      aplicar a mano las 5 correcciones de ese veredicto sobre
      `contenido/informes/2026-09-26.md` y arrastrarlas al guion, como ya se
      hizo dos veces esta madrugada. Es la misma clase de falla que la
      entrada "22-09, HOY" más abajo en esta sección (GPT sin responder), que
      sigue sin marcarse como resuelta: van al menos tres ocurrencias
      (22-09, 25-09, 26-09), y las dos últimas fueron mañanas seguidas.
      ✅ 26-09: la sesión de día aplicó las correcciones a mano (09:05 a
      10:11) y el video salió a las 10:44; en la mañana reemplazó los tres
      respaldos por la rutina "Cadena nocturna sin GPT" (01:55), que escribe
      Y repara en bucle. En la noche se sumó el SUPLENTE (prompts/suplente.md,
      commit b278cc1): con contenido/estado/plan-b.txt vigente, estado.yml
      despierta por API a la rutina validadora en los turnos de GPT que nadie
      cubre (reparar_* si la Cadena ya se fue, alimentar_banco, la Clave).
      Ver bitacora/2026-09-26.md.

- [x] **26-09: tercer día seguido sin que `reintento.yml` dispare ni una vez
      dentro de su ventana de cron (04:00-09:59 UTC), y hoy sí importa.**
      Auditoría del 26-09 (`bitacora/2026-09-26-auditoria.md`).
      `mcp__github__actions_list` confirma cero corridas hoy (la última fue
      ayer 25-09 a las 14:37 UTC, fuera de ventana). La etapa activa
      (`reparar_informe`, GPT atascado desde las 02:25 Chile) es exactamente
      el caso para el que existe el workflow. Esta es la misma falla de fondo
      que la entrada "25-09, HOY" en la sección "Para la sesión de la noche"
      ya marcó `HOY` ayer con la misma propuesta (agregar un despertador
      propio como el de `barrido.yml`/`metricas.yml`/`guardia.yml`): sigue
      sin implementarse y hoy lleva ya **tres mañanas seguidas** (24, 25,
      26-09) con cero corridas en ventana.
      ✅ 26-09 noche: reloj propio creado (trig_016JsVfFwrJFut5vy2f4c8TS,
      Haiku, 01:10/02:10/03:10/04:10 Chile) que toca
      contenido/estado/reintento-despertador.txt; reintento.yml tiene `on:
      push` sobre esa ruta (commit b278cc1). Precisión: el cron de GitHub SÍ
      corre, dos veces al día a horas al azar (26-09: 08:56Z y 13:35Z), casi
      siempre fuera de ventana. Verificar el 27-09 que aparezcan commits
      "reintento: despertador HH:MM [reloj]" a esas horas.

- [x] **UN CLIC EN GOOGLE CLOUD: habilitar la YouTube Reporting API.** ✅ 23-09 Es lo
      único que falta para que las impresiones de carátula empiecen a medirse.
      El código quedó listo y probado el 23-09, pero la primera corrida real
      devolvió: "YouTube Reporting API has not been used in project
      456975949202 before or it is disabled". Se habilita acá, con la cuenta
      dueña del proyecto:
      https://console.developers.google.com/apis/api/youtubereporting.googleapis.com/overview?project=456975949202
      (Ese proyecto es el mismo de los secrets YT_ del canal; no hay que crear
      credenciales nuevas ni volver a autorizar nada: el scope
      yt-analytics.readonly que ya tenemos sirve.) Después de habilitarla,
      la corrida siguiente de Métricas crea el trabajo sola. **Ojo con el
      reloj**: la Reporting API solo genera informes desde el día en que se
      crea el trabajo, y el primero tarda hasta 48 horas. Si se habilita hoy,
      el primer dato de carátulas aparece el 25 o 26; si se deja para la
      semana que viene, ese plazo corre desde entonces.
      **PRIMER INTENTO, 23-09: la cuenta no ve el proyecto.** Santiago abrió
      el enlace con sinostrozadev@gmail.com y Google respondió "You need
      additional access to the project: 456975949202", permiso faltante
      `resourcemanager.projects.get`. Eso no es que falte un rol: es que esa
      cuenta no ve el proyecto. **No apretar "Request access"**: ese botón
      redacta un mensaje para un administrador que somos nosotros mismos en
      otra cuenta, y no lo manda solo.
      El proyecto sí es el nuestro: el error salió de usar YT_CLIENT_ID, y
      todo client id empieza con el número del proyecto
      (`456975949202-....apps.googleusercontent.com`). O sea, las credenciales
      del canal se crearon desde OTRA cuenta de Google, casi seguro la del
      canal y no la de desarrollo.
      **Cómo encontrarla**: en el avatar de arriba a la derecha de la consola,
      cambiar de cuenta y abrir https://console.cloud.google.com/apis/credentials
      buscando un cliente OAuth cuyo id parta con 456975949202. La cuenta
      donde aparezca es la dueña, y ahí la Reporting API se habilita con un
      clic. Vale la pena probar primero la cuenta con la que se autorizaron
      los tokens de YouTube (la dueña del canal).
      **Plan B si ninguna cuenta lo ve**: proyecto nuevo con la cuenta del
      canal, habilitar YouTube Data API v3, YouTube Analytics y YouTube
      Reporting, credenciales OAuth nuevas y volver a emitir los cuatro
      secrets (YT_CLIENT_ID, YT_CLIENT_SECRET, YT_REFRESH_TOKEN y
      YT_ANALYTICS_REFRESH_TOKEN). Es bastante más trabajo, necesita el
      navegador de la sesión local para el consentimiento, y mientras tanto
      todo lo demás sigue funcionando: los secrets actuales son válidos.
      **HABILITADA Y TRABAJO CREADO (23-09, 16:33 UTC).** Santiago encontró
      la cuenta y habilitó la API; la corrida siguiente de Métricas creó el
      trabajo `channel_reach_basic_a1`, id
      `512e38a3-6714-4fdd-b6bc-0a4a375117b3`, y dejó
      `bitacora/metricas/impresiones.json` e `impresiones-diario.json` vacíos,
      que es exactamente lo que corresponde el primer día. **El reloj de 48
      horas partió hoy.** No hay que hacer nada más: Métricas corre cada
      mañana y baja sola los días que aparezcan. **Mirar el 25-09**: si para
      esa mañana `impresiones.json` sigue con `videos: {}`, el trabajo no está
      generando y hay que revisar el log del paso de impresiones. La primera
      lectura útil de carátulas (impresiones y CTR por video) será la del
      26-09, con dos días acumulados.

- [ ] **23-09, HOY: el video del informe de hoy publica a las 07:30 con dos
      datos mal atribuidos — decidir si se corrige antes de esa hora.**
      Auditoría del 23-09 (`bitacora/2026-09-23-auditoria.md`, puntos 1 y 2).
      El guion ya aprobado y renderizado (`contenido/guiones/informe/2026-09-23.md`)
      tiene: (1) línea 22, la tarjeta `[DATO comparacion | DMC vía BioBioChile,
      22 sep] ... 105 mm ; ... más de 200 mm` deja ambos valores bajo la fuente
      oficial, cuando el informe (`contenido/informes/2026-09-23.md`) atribuye
      los +200 mm a modelos privados (Meteored y ADN Radio); (2) línea 12, la
      Apertura llama "reforma migratoria" a la reforma constitucional de
      detención para expulsiones administrativas (nombrada bien en el resto
      del guion y en el informe). El validador ya lo señaló en
      `contenido/veredictos/2026-09-23-guion_informe.md` y lo dejó pasar como
      no bloqueante. `scripts/youtube-subir.js` sube el informe con
      `--programar 07:30` (`vars.YT_HORA_INFORME`): a las 05:31 de hoy quedan
      cerca de 2 horas antes de que salga de "private". Primera vez que se
      marca: 23-09-2026.

- [ ] **22-09, HOY: la cadena se congeló en el informe — revisar/relanzar la
      tarea "Despachador Entender Chile" de ChatGPT.** `estado.yml` avisó bien
      a las 01:58:50 (commit `35e98cb` en el PR #6, `pieza=informe`,
      `prompt=prompts/informe.md`) que le tocaba el informe a GPT, con la
      preselección ya aprobada. A las 05:38 —3h40 después— no había respuesta:
      ni informe, ni guion, ni revisión, ni banco de temas, ni videos de hoy.
      Es la misma falla de fondo que "GPT 1" (15-09, más abajo en esta
      sección) dejó sin cerrar: nada en el repo distingue "GPT no responde" de
      "GPT no tiene cuota" ni avisa antes de que una persona mire el reloj.
      Primera vez que se marca esta ocurrencia puntual: 22-09-2026 (ver
      `bitacora/2026-09-22-auditoria.md`).
      **Vuelve a pasar el 25 y el 26-09, dos mañanas seguidas**: GPT no
      escribió ninguna pieza ninguna de las dos noches (los commits de
      recuperación a mano de ambos días lo dicen literalmente), y el 26-09
      además dejó atascada la corrección del informe por más de 3 horas sin
      que nadie la tomara (entrada nueva al comienzo de esta sección,
      `bitacora/2026-09-26-auditoria.md`).

- [ ] **PR #5, abierto desde el 11-09: fusionarlo o cerrarlo.** Trae la
      corrección completa de la cifra del 11-09 en los cuatro archivos, escrita
      por la revisión editorial que rechazó esa edición. Decidiste dejar el
      texto como está, pero la corrección está lista y fusionarla es un clic; si
      no se fusiona, conviene cerrarlo para que no se pudra ahí. Ojo con lo
      segundo: mientras siga abierto, hay una rutina en la nube que despierta
      cada 4 horas a mirarlo y se vuelve a agendar sola (26-09: ya no es un
      ID fijo, es una cadena de recordatorios de un solo disparo, dieciocho
      entre el 23 y el 26, sesión persistente
      `session_01GZbDrbTYnw545j1wKZXtt1`; el vivo hoy es
      `trig_01Jw1QAE68ZZ1NQsnshyBgez` para las 19:30Z). Se corta cerrando o
      fusionando el PR.

- [x] **26-09: cuando GPT vuelva (domingo 27), apagar el plan B y decidir
      el flujo de respaldo.** Apagar = borrar `contenido/estado/plan-b.txt`
      y commitear (una línea; el suplente deja de dispararse solo) y apagar
      o dejar como red la rutina "Cadena nocturna sin GPT" de la 01:55
      (`trig_01NscKtv2hPKqkV6ft8X6GKG`, creada por la sesión de día desde
      la web, así que se apaga desde ahí). La decisión de flujo para la
      próxima caída de GPT: (a) Cadena nocturna (una sesión larga que
      escribe las tres piezas y repara en bucle) o (b) suplente en TODOS
      los turnos (agregar `barrido_listo *_lista *_listo` a la línea
      `turnos:` de plan-b.txt: la cadena lineal tal cual, con Claude en la
      silla de GPT y validación entre pieza y pieza). Hoy convive: la
      Cadena escribe y repara; el suplente cubre banco, Clave y las
      reparaciones que la Cadena ya no alcanza. bitacora/2026-09-26.md.
      ✅ 26-09 noche: GPT volvió; plan B automático (regla 20 y 20) en
      reintento.yml; Cadena nocturna apagada; plan-b.txt borrado.


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

- [ ] **26-09: `contenido/README.md` describe el flujo viejo** (veredicto de la
      revisión editorial, Clave diaria). La limpieza del 26-09 reescribió los
      README de las subcarpetas pero no este mapa. Reescribirlo corto,
      apuntando a los README de cada subcarpeta.

- [x] **25-09, HOY: GPT se atascó en la preselección y `reintento.yml` no
      corrió ni una vez dentro de su ventana — segundo día seguido.**
      Auditoría del 25-09 (`bitacora/2026-09-25-auditoria.md`). El aviso a
      GPT se emitió bien (`automatizacion/estado`, `04:41:11Z`, etapa
      `preseleccion`), pero a las 08:36 UTC (235 min después,
      `contenido/preseleccion/2026-09-25.md` verificado ausente) no hubo
      respuesta ni un solo reintento: `mcp__github__actions_list` sobre
      `reintento.yml` marca **cero corridas** en su ventana de hoy
      (04:00-09:59 UTC), y en las 20 corridas de todo su historial solo dos
      cayeron dentro de la ventana (23-09 08:57 UTC, 24-09 08:52 UTC), casi
      al cierre de ella, nunca cada 20 minutos como indica
      `.github/workflows/reintento.yml:27` (`*/20 4-9 * * *`). Consecuencia:
      sin preselección no hubo informe, guion, revisión, banco de temas ni
      videos hoy. **Propuesta**: agregar a `reintento.yml` un despertador
      propio (rutina Claude que toque un archivo y pushee cada 20 min en
      01:00-07:00 Chile, con `on: push` sobre esa ruta), igual que ya usan
      `barrido.yml`, `metricas.yml` y `guardia.yml`, en vez de depender del
      cron nativo de GitHub. Relacionado con la propuesta 2 de la auditoría
      del 24-09 (más abajo), que ya señalaba esta misma falla de fondo como
      `AGUANTA`; hoy causó una cadena completa perdida, así que sube a
      `HOY`. Primera vez que se marca esta ocurrencia puntual (GPT atascado
      + reintento sin correr causando daño real): 25-09-2026.
      **26-09: van dos mañanas seguidas** con la misma verificación (cero
      corridas de `reintento.yml` en ventana); hoy el atasco real es
      `reparar_informe` (`bitacora/2026-09-26-auditoria.md`).
      ✅ 26-09 noche: hecho tal como se propuso, con reloj de Claude cada
      hora (no cada 20 min: el reintento espera 25 min de gracia de todos
      modos). Detalle en la entrada del 26-09 de "Dependen de Santiago" y en
      bitacora/2026-09-26.md.

- [ ] **24-09, HOY: el despertador del barrido corrió a horario y dejó un
      commit vacío — la cadena entera de hoy no arrancó.** Auditoría del
      24-09 (`bitacora/2026-09-24-auditoria.md`). El commit `98abc93`
      ("despertador 2026-09-24 [reloj]", 2026-09-24 04:40:16 UTC) no tiene
      ningún archivo cambiado; `contenido/barrido/despertador.txt` quedó con
      la marca de AYER (`2026-09-23 04:40:45 UTC`). Como `barrido.yml`
      dispara por push sobre ese path exacto
      (`.github/workflows/barrido.yml:16`), el push no cumplió el filtro y
      el workflow nunca corrió. Las dos redes de respaldo tampoco dispararon
      ni una vez hoy: los crons de `barrido.yml:23-24` (04:50 y 05:20 UTC) y
      el de `reintento.yml` (cada 20 min, 04:00-09:59 UTC) llevan cero
      corridas en todo el día según `mcp__github__actions_list` — y aunque
      `reintento.yml` hubiera corrido, su chequeo de la línea 53-54 exige
      que ya exista `contenido/estado/$FECHA.md`, que nunca se creó porque
      el barrido nunca puso nada en main: no cubre este caso. Consecuencia:
      a las 05:33 Chile, `node scripts/estado.js --solo-leer` marca
      ETAPA `nuevo_dia` y todo atrasado, de Barrido (+233 min) a Videos
      (+18 min); sin barrido no hay preselección, informe, guion, revisión
      ni edición diaria, y no hay video del informe hoy. **Acción
      inmediata**: retocar `contenido/barrido/despertador.txt` con la hora
      actual y pushear (a mano o re-disparando `trig_01W5KE`), o disparar
      `barrido.yml` por `workflow_dispatch`, para arrancar la cadena hoy
      aunque sea tarde — cada hora que pasa achica el margen antes de la
      hora de publicación del informe (06:30 Chile). Propuesta de fondo (no
      urgente): en `.github/workflows/reintento.yml`, antes de la línea 53,
      agregar un chequeo previo que, si pasan las ~02:00 Chile sin
      `contenido/barrido/$FECHA.md` ni estado del día y el despertador del
      barrido no trae la fecha de hoy, lo retoque y pushee él mismo — la
      misma receta de despertador-que-dispara-workflow que ya usan barrido,
      métricas y guardia, aplicada a esta falla en vez de solo a "GPT no
      responde". Primera vez que se marca: 24-09-2026.

- [ ] **CARÁTULA 6: conectar el CLIMA, lo único que quedó a medias del
      taller del 23-09.** La fórmula ya está escrita en
      `prompts/imagen-caratula.md` (regla 7): el guion declara
      `Clima de carátula: grave|institucional|cotidiano|bueno|curioso|deporte`
      y esa palabra decide la luz de la imagen y el color del pictograma, para
      que no salgan todas sombrías (Santiago, 23-09: "si la noticia es alegre,
      estilo alegre"). Falta: (a) la línea en `prompts/guion-informe.md`, junto
      a las tres carátulas; (b) leerla en `parse.js`; (c) pasarla al pedido de
      imagen y a `MiniaturaV4`. NO se tocó esa noche a propósito: cambiar el
      prompt del guion sin poder probarlo con GPT arriesga la edición del día
      siguiente.

- [x] **CARÁTULA 5: el taller del 23-09, seis vueltas y una fórmula.** ✅
      23-09, tarde y noche, con Santiago mirando cada render.
      Punto de partida: se bajaron las carátulas reales del 21, 22 y 23 y el
      problema no era el texto, era que NO HABÍA IMAGEN. Las diez láminas de
      `public/fondos` son texturas al 8% de tinta: a 168 px (el ancho real en
      un teléfono) la carátula era dos cajas de texto sobre blanco. Y el 22 y
      el 23 salieron idénticas, así que la variación diaria que pide la regla
      29 tampoco se estaba aplicando.
      Lo construido: `src/pictogramas.tsx` (diez símbolos por código),
      `MiniaturaV4` (pictograma + cifra) y `MiniaturaV5` (ilustración de GPT)
      en `src/marca.tsx`, tres diseños por edición en `dia.js`, y la tarea
      `imagen` en el canal de pedidos (`pedido-gpt.yml` ahora lee Tarea:,
      Salida: y Prompt: del propio PEDIDO).
      La regla 29 se amplió con el sí de Santiago: fotorrealismo permitido en
      ambiente y objeto, prohibido en el hecho noticioso.
      **La fórmula quedó en `prompts/imagen-caratula.md`** y cada regla viene
      de una carátula que falló: dos capas (fondo dice dónde, objeto dice
      qué), cuatro figuras (ausencia, desborde, desequilibrio, umbral),
      destacar por ausencia le gana a destacar por luz (hallazgo de Santiago,
      cambió la mejor imagen del día), el objeto igual a sus pares, el detalle
      exagerado y arriba, el cobre solo en el banner, el clima según la
      noticia y la estructura fija como marca.
      **Límite medido**: seis pedidos de imagen en dos horas agotaron el
      generador de GPT. El conector quedó sano (GPT lo confirmó); lo topado
      era el dibujo. Ritmo normal: UNA imagen al día, y las pruebas después de
      cerrar la edición. Quedaron sin hacer la prueba del dólar y la del
      15-09 ("54 años sin contagios"), que era el antes y el después.

- [x] **SUBIDA 23-09: el exprés sale público y el informe se publica a las
      6:30.** ✅ 23-09, sesión de día, pedido de Santiago ("deja los videos
      exprés públicos por defecto y los informes prográmalos para las 6.30").
      El Short exprés se sube PÚBLICO (`scripts/short-urgente.js` le pasa
      `--privacidad public` al subidor): es última hora, y esperar una
      revisión lo deja sin noticia. El informe pasa de 07:30 a **06:30** de
      Chile (`YT_HORA_INFORME` en `edicion-diaria.yml`). La edición termina
      cerca de las 03:00, así que el margen de revisión sigue siendo de más
      de tres horas y `YT_MARGEN_MIN` (90) no lo corre. **OJO**: si en
      Settings → Variables existe la variable `YT_HORA_INFORME`, manda ella y
      hay que cambiarla ahí; el default del archivo solo vale si no existe.
      El Short del día (12:00) y la Clave (14:00) quedan igual.

- [x] **PROMPTS 23-09: las dos reglas que la auditoría pedía, aplicadas.** ✅
      23-09, sesión de día, con el sí de Santiago ("deja el video, corrige las
      dos reglas de prompt").
      (1) `prompts/guion-informe.md`, en la marca [FUENTE] y en el control
      final: toda sigla que se pinte en pantalla va expandida la primera vez
      ("Dirección Meteorológica (DMC)"), salvo las de uso corriente. "DMC"
      salió sin expandir el 21, 22 y 23-09.
      (2) `prompts/informe.md`, junto a la definición de pesos y en el control
      final: tope duro de UNA sola [B] o [C] por edición que cierre diciendo lo
      que falta por saber; las demás cierran con lo que sí se sabe. Marcado
      cuatro días seguidos del 20 al 23-09, y el 23 la revisión lo encontró ya
      cruzado al guion.
      **Decisión sobre el video del 23-09**: se dejó publicar a las 07:30 con
      los dos defectos que marcó la auditoría (la tarjeta de lluvias atribuye a
      la DMC los +200 mm que vienen de modelos privados, y la apertura llama
      "reforma migratoria" a una reforma constitucional). Motivo: la narración
      SÍ aclara que la proyección viene de modelos privados, el bloque
      desarrollado sí nombra bien la reforma, y rehacer el render costaba una
      hora de Actions y la hora de publicación por un pie de tarjeta y una
      palabra. Queda verificado en la madrugada del 24 si las dos reglas
      nuevas evitan la repetición.

- [ ] **23-09, HOY: expandir siglas que se pintan en pantalla — la "DMC" lleva
      3 días repitiéndose sin corregirse ni anotarse.** Auditoría del 23-09
      (`bitacora/2026-09-23-auditoria.md`, punto 3). Las marcas `[FUENTE DMC
      vía ...]` y `[DATO ... DMC ...]` de `prompts/guion-informe.md` pintan la
      sigla sin expandir donde no se explica sola (la narración sí dice
      "Dirección Meteorológica de Chile"). `contenido/revisiones/2026-09-23.md`
      dice "Viene repitiéndose desde el 21-09"; `contenido/revisiones/2026-09-22.md`
      dice "misma observación del 21-09"; `contenido/revisiones/2026-09-21.md`
      la describe de cero. Tres veredictos seguidos la aprobaron como no
      bloqueante y ninguno bajó tarea aquí. Propuesta: en
      `prompts/guion-informe.md`, agregar que toda sigla en una marca que se
      pinta en pantalla vaya expandida la primera vez que aparece. Primera vez
      que se marca en esta lista: 23-09-2026 (lleva 3 mañanas seguidas
      señalada en las revisiones).
      **27-09: sigue sin cerrarse, ya van cinco mañanas.** El 25 y el 26-09
      la sigla fue Senapred (`contenido/revisiones/2026-09-26.md`: "cuarto
      día seguido"); hoy `contenido/revisiones/2026-09-27.md` marca "quinto
      día con la misma observación" y ya no es solo DMC: se pintan sin
      expandir SEC, Senapred y DW. La regla que se agregó a
      `prompts/guion-informe.md` el 23-09 no cerró el problema de fondo,
      solo cubrió el caso puntual de esa sigla: sigue faltando una lista de
      exentas o una regla general para cualquier sigla nueva.
      **28-09: sexto día, y la superficie cambió.** Hoy `contenido/revisiones/2026-09-28.md`
      marca SAG y CONAF sin expandir, pero ya no en `[FUENTE]`/`[DATO]`
      (lo que cubre la regla del 23-09) sino en el titular de la línea 118
      del guion: un titular no incumple la letra del prompt aunque se pinta
      en pantalla igual, así que la revisión no bloqueó por una razón de
      forma. La propia revisión de hoy dice textual: "o entra a la lista de
      exentas o empieza a bloquear". Auditoría del 28-09
      (`bitacora/2026-09-28-auditoria.md`).

- [ ] **23-09, HOY: tope al cierre de cautela repetido ("queda para
      verificar/en seguimiento/pendiente") — más de una semana sin corregirse
      ni anotarse, y ya cruzó del informe al guion.** Auditoría del 23-09
      (`bitacora/2026-09-23-auditoria.md`, punto 4). `bitacora/2026-09-20-auditoria.md`
      y `bitacora/2026-09-21-auditoria.md` ya registran "cuarto día seguido"
      de casi todas las [B] y [C] del informe cerrando con la misma fórmula de
      cautela. `contenido/revisiones/2026-09-23.md` constata que el molde
      ("falta revisar", "el seguimiento queda puesto en") ya se escucha en
      "Tres bloques seguidos del guion". Propuesta: en `prompts/informe.md`,
      topar a una sola [B]/[C] por edición el cierre con esa fórmula y variar
      el resto; como el guion hereda el texto del informe, resuelve también el
      arrastre. Primera vez que se marca en esta lista: 23-09-2026 (el patrón
      lleva señalado desde al menos el 20-09 sin bajar aquí).

- [x] **IMPRESIONES 1: la vía es la YouTube Reporting API, no Analytics** ✅ 23-09
      (respuesta de GPT con documentación oficial, 22-09). Cierra la
      investigación abierta hoy:
      - En `reports.query` de Analytics v2 estas métricas NO existen: los
        informes de alcance son "supported for channels (bulk) and content
        owners (bulk)". Por eso las cinco variantes dieron "The query is not
        supported". El intento diario que quedó en `scripts/metricas.js` se
        puede retirar.
      - Los nombres reales son `video_thumbnail_impressions` y
        `video_thumbnail_impressions_ctr`, en la **YouTube Reporting API**.
      - El informe es **`channel_reach_basic_a1`**, con campos `date`,
        `channel_id`, `video_id` más esas dos métricas. NO admite filtros: se
        descarga el CSV completo y se filtra en casa. No usa `channel==MINE`.
      - El scope actual sirve: `yt-analytics.readonly`. No está limitado a
        content owners; sin `onBehalfOfContentOwner` Google asume el canal
        propio.
      **Lo que hay que construir** (más grande que una consulta, por eso queda
      como tarea aparte): crear UNA vez el trabajo con `jobs.create`, y después
      un paso diario que liste los informes del trabajo, baje el CSV del día,
      lo cruce con `contenido/videos` y escriba impresiones y CTR por video en
      `bitacora/metricas/FECHA.json`, donde el reporte ya tiene el hueco hecho
      (la tabla de largos con 100 impresiones o más). Ojo con dos cosas: el
      informe es diario y asíncrono, así que el dato del día llega con rezago,
      y el trabajo empieza a generar informes recién desde que se crea, no
      hacia atrás. Doc: developers.google.com/youtube/reporting y
      /youtube/reporting/v1/reports/channel_reports.
      **CONSTRUIDO el 23-09** (sesión de día, con el sí de Santiago):
      `scripts/impresiones.js`. Busca el trabajo `channel_reach_basic_a1` y lo
      crea si no está; lista los informes, baja SOLO los días que faltan y
      guarda el crudo por día y por video en
      `bitacora/metricas/impresiones-diario.json` (45 días, se poda solo).
      De ahí sale `bitacora/metricas/impresiones.json`, el resumen de 30 días
      que `metricas.js` ahora LEE en vez de preguntarle a Analytics: el
      intento diario que sobraba se retiró. El CSV trae varias filas por video
      y por día (país, suscrito): se suman las impresiones y el CTR se pondera
      por impresiones, nunca se promedia. La escala del CTR (fracción o
      porcentaje) se decide por el máximo de cada archivo y queda dicha en el
      log. Corre en `metricas.yml`, antes de las métricas, con
      `continue-on-error`. Probado en seco contra una API falsa con dos días
      de CSV: suma, ponderación, poda y segunda corrida sin volver a bajar.
      **Lo que falta es esperar**: el trabajo se crea en la primera corrida
      real y el primer CSV tarda hasta 48 horas, así que el dato no aparece
      hasta el 25-09 y no habrá historia anterior a hoy.

- [x] **REINTENTO 1: la máquina reintenta sola cuando GPT no responde.** ✅
      22-09, sesión de día con el sí de Santiago. `.github/workflows/reintento.yml`:
      cada 20 minutos entre las 04:00 y las 09:59 UTC (la ventana cubre la
      madrugada de Chile con y sin horario de verano; fuera de 01:00-07:00 de
      Chile el job se retira en segundos). Mira el estado, y solo si la etapa
      es turno de GPT y el evento del PR #6 lleva 25 minutos o más sin que
      llegue la pieza, lo reemite con `reintentos=N` y el motivo. Tope de tres:
      al cuarto no insiste y falla con un error explícito, salvo en
      `alimentar_banco`, que no frena la edición y solo deja un aviso. La
      regla de qué etapa es de GPT es la MISMA de `estado.yml` línea 124 y hay
      que cambiarlas juntas: el ensayo en seco cazó que `alimentar_banco`
      faltaba en la primera versión. Queda verlo actuar en una madrugada real.
      El caso que lo motivó: Lo que pasó hoy: el
      conector de GitHub de ChatGPT devolvió "HTTP 400: Invalid MCP request
      metadata" y la tarea no pudo leer ni escribir el repo. La cadena quedó
      parada 9 horas, de las 01:58 a las 11:04, con todo el lado del repo
      correcto (el evento salió al PR #6 a las 01:58 y quedó registrado).
      **El diagnóstico, dicho por la propia tarea de GPT:** "no hubo
      reconexión manual: el error de metadatos era transitorio y el conector
      se recuperó al reintentar una lectura autenticada". O sea, un reintento
      cualquiera habría destrabado el día. La edición salió completa a las
      12:15 tras la intervención a mano, con aprobación en una sola vuelta.
      **Propuesta**: un workflow chico por reloj (cada 20 o 30 minutos entre
      la 01:30 y las 06:00 de Chile) que mire el estado; si la etapa es de GPT
      (`barrido_listo`, `*_lista`, `*_listo`, `reparar_*`) y la pieza que toca
      no aparece después de 25 minutos del último evento, reemite el evento al
      PR #6 exactamente como lo hace `estado.yml`. Tope de tres reintentos por
      etapa para no insistir sobre algo roto de verdad, y al tercero que avise
      al teléfono en vez de seguir. Cuesta un minuto de Actions por corrida y
      cubre la clase entera de fallo: conector caído, despertar perdido o
      evento agrupado. Hoy habría ahorrado nueve horas sin que nadie mirara.

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

- [ ] **CARÁTULA 4: la prueba A/B de Studio NO está andando y necesita a
      Santiago** (aclarado el 22-09). Lo que la máquina SÍ hace sola desde el
      21-09: el guionista escribe tres carátulas por edición, `dia.js` las
      renderiza (`miniatura.png`, `miniatura-2.png`, `miniatura-3.png`), el
      workflow las sube al release del día y la PRIMERA queda como carátula
      del video en YouTube. Lo que NO hace nadie: cargar las otras dos en
      "Probar y comparar" de YouTube Studio. Eso es manual, por video, desde
      el teléfono, bajando las dos alternativas del release.
      **Advertencia medida**: con largos de 1 a 9 vistas la prueba A/B no va a
      concluir, porque necesita impresiones suficientes para decidir. Por eso
      el orden correcto es primero tráfico (NÚMEROS 1) y después carátulas; la
      prueba conviene activarla en el video que más impresiones reciba, no en
      todos.

- [ ] **CARÁTULA 2: EN PRODUCCIÓN desde la edición del 21-09** (decidido por
      Santiago el 20-09 sobre el tablero, paleta cobre y tinta). Hecho: regla
      de tres carátulas de dos líneas en `prompts/guion-informe.md`;
      `parse.js` las lee y ninguna se narra; `dia.js` renderiza la primera
      como `miniatura.png` (V3) y las otras dos como `miniatura-2.png` y
      `miniatura-3.png`; el release las sube; `validar-tarjetas.js` avisa si
      falta una, si no trae " / " o si una línea pasa de cuatro palabras. Probado
      con el guion de hoy (formato viejo, una sola carátula corta): render
      correcto en una línea. **Queda:**
      (a) mirar la del 21-09, la primera con GPT escribiendo tres ganchos;
      (b) **Santiago**: cargar las alternativas 2 y 3 en YouTube Studio
      (Prueba y compara) durante dos semanas, con la 1 como control, y
      decidir la fórmula con ese dato (regla 26);
      (c) la imagen del tema: hoy es la lámina de sección (10 láminas) y cae al
      mapa cuando nada calza; el pedido de "un símbolo del tema generado o
      dibujado" sigue abierto y es parte del Taller.
      Tablero: https://claude.ai/artifact/XsfWbLELW4LWLv4rF6roZR
- [ ] **ACTIONS 1: el ciclo de minutos se agotó al día 15 (1.843 de 2.000;
      se reinicia el 1 de octubre).** Medido con la API el 15-09: 457
      corridas y ~2.004 minutos desde el 1-09; la Edición diaria se lleva
      1.500 (75%), a 55-105 minutos por render y 130 minutos por día en
      promedio, con cinco días de doble render. Decisión de Santiago (15-09):
      poner presupuesto en Manage budgets en vez de $0 para que el canal no
      se detenga (a $0,008 el minuto Linux, entre $9 y $17 hasta el 1-10; $20
      cubre). Para la noche, dos optimizaciones que deberían bajar el render
      a la mitad sin tocar la calidad, medir con un render real:
      (a) `scripts/dia.js` y `scripts/short.js`: pasar `--concurrency=100%`
      a `remotion render`; hoy va con el default, que en el runner de 4
      núcleos usa 2.
      (b) `scripts/build-timeline.js` línea 149: fps 30 → 24 (20% menos
      cuadros; en tarjetas de texto no se nota). Revisar que SELLO_SEG y los
      offsets en segundos no dependan de 30.
      **(a) y (b) HECHOS la noche del 16-09** (`--concurrency=100%` en dia.js y
      short.js; 24 fps en build-timeline.js y en los defaults de Root.tsx y
      short-entry.tsx). Medir con el render del 17-09: hoy tardó 92 minutos.
      Y dos desperdicios chicos (12% del ciclo): `web.yml` corre con cada
      push de contenido (96 corridas, 139 min): bastaría al aprobarse el día
      y al subir los videos; y la Guardia despierta cada dos horas por un
      minuto (96 corridas). Para octubre decidir: GitHub Pro ($4/mes, 3.000
      min) o runner propio en el computador de Santiago (gratis, equipo
      encendido a las 05:00).

- [ ] **GPT 2: elegir el poder de GPT por etapa, para analizar** (Santiago,
      15-09: "tener 4 PR distintos, uno para cada modelo de GPT, y despertar
      GPT dependiendo del poder que necesitamos; o ver si le podemos decir a
      GPT en cada mensaje qué modelo ocupar; o alguna solución similar").
      Motivo: la cuota de ChatGPT se agotó el 15-09 con 8 piezas y 20
      despertares, y no toda pieza necesita el modelo más caro (la
      preselección y las correcciones de forma no; el informe y los guiones
      sí). Lo que hay que averiguar antes de diseñar: (a) si una tarea
      programada de ChatGPT tiene el modelo fijo por tarea o se puede pedir
      por mensaje (hasta donde sabemos, es por tarea, y el texto del disparo
      no lo cambia); (b) cómo se contabiliza la cuota (por mensaje, por
      modelo, por tokens); (c) cuántas tareas caben (hoy hay tope de 5 y se
      usan 2). Diseño A, si el modelo es por tarea: un PR por nivel de poder
      (`automatizacion/estado-alto` y `-bajo`, no hacen falta cuatro), una
      tarea de ChatGPT por PR con su modelo, y `estado.yml` emite al PR que
      corresponde según la etapa: preselección y `reparar_*` de forma al bajo;
      informe, guiones y Clave al alto. Costo: dos PR permanentes más y una
      tabla etapa → poder en el estado. Diseño B, si el modelo se puede pedir
      por mensaje: una sola tarea y el evento lleva `modelo=` en
      `ultimo-evento.txt`. Diseño C, sin cambiar ChatGPT: bajar el trabajo por
      pieza (GPT 1 ya hizo la mitad) y mover la preselección a una rutina de
      Claude con Haiku, que es la pieza más mecánica. Medir una semana antes
      de elegir.

- [ ] **GPT 1: se agotó la cuota de ChatGPT a media cadena (15-09, 09:14) y hay
      que limitar los despertares** (Santiago: "tendremos que limitar, se agotó
      el uso"). La cadena quedó en `reparar_clave` con la Clave sin corregir;
      el evento se emitió a las 09:14 y se reemitió a mano a las 09:32 sin
      respuesta. Lo medido hoy: 20 eventos al PR #6 (cada uno despierta al
      despachador) para 8 piezas escritas (preselección, informe x3, guion x3,
      Clave). De los 20, once fueron etapas `validar_*`, que NO son turno de
      GPT: lo despiertan solo para que ESPERE hasta 10 minutos sondeando main
      (regla ESPERA del despachador). Y la tarea "Prueba flujo" de ChatGPT, si
      sigue encendida, también despierta con cada uno de esos 20 eventos.
      Cuatro medidas, en orden de rendimiento. **(1), (2) y la regla de
      convergencia de (4) APLICADAS el 15-09 desde la sesión de día con
      autorización de Santiago; (3) la hace él en ChatGPT; queda por medir
      una madrugada.**
      (1) **Emitir al PR #6 solo en turnos de GPT** (`*_lista`, `*_listo`,
      `reparar_*`), en `estado.yml`; a Claude ya lo despierta la API. Hoy eso
      habría sido 9 eventos en vez de 20.
      (2) **Quitar la ESPERA de 10 minutos** del despachador (o dejarla en 2):
      existía porque el evento podía no llegar, y desde hoy `estado.yml`
      escucha los veredictos y el evento llega. Dejar solo "si la etapa ya
      cambió a una tuya, sigue en la misma corrida".
      (3) **Apagar o borrar la tarea "Prueba flujo"** en ChatGPT: la prueba
      terminó el 14-09 y cada evento la despierta por nada.
      (4) **La regla de convergencia de VALIDADOR 1**: cada vuelta extra es una
      pieza reescrita entera por GPT (hoy el informe y el guion se escribieron
      tres veces cada uno).
      Y para el día en que la cuota igual se agote: el vigía (o el estado)
      tiene que distinguir "GPT no responde" de "GPT no tiene cuota", y avisar
      con la hora del último evento sin respuesta; hoy nadie avisó, lo vio la
      sesión de día mirando el reloj. Falta el dato de Santiago: cuál es el
      límite de ChatGPT y cómo se mide, para poner un presupuesto de
      despertares por día.

- [ ] **VALIDADOR 1: tope de vueltas alto, por etapa, y un plan B cuando se
      agote** (Santiago, 15-09 de mañana: "debiese tener un límite alto y por
      etapa, y un plan B para cuando se agote ese límite"). Hoy el tope es 2 y
      vive en `prompts/validador.md` (punto 3, "TOPE"), no en código: con
      `VUELTA: 2` y algún INCUMPLE el validador escribe BLOQUEADA, el estado
      pasa a `bloqueado_humano` y el único plan B es que el vigía avise a las
      02:15 o 05:15 y una persona destrabe. Sí es por pieza (estado.js lee la
      vuelta del veredicto de cada pieza), pero un día con cinco piezas y dos
      vueltas cada una puede bloquearse en cualquiera. Propuesta, en tres
      partes:
      (1) **Tope por pieza, 4 vueltas**, en `validador.md` y reflejado en
      `estado.js` (que hoy no valida el número, solo lee BLOQUEADA).
      (2) **Regla de convergencia, que importa más que el número**: el
      validador tiene que listar TODOS los INCUMPLE en la vuelta 1; en las
      siguientes solo puede arrastrar los no resueltos o los que la propia
      corrección introdujo, nunca sumar hallazgos nuevos sobre partes que ya
      había aprobado. Hoy (15-09) la vuelta 2 del informe trajo una corrección
      nueva (lista de fuentes) que la vuelta 1 no había marcado: así el tope
      se gasta sin que GPT haya fallado.
      (3) **Plan B al agotar el tope, por tipo de hallazgo**: si lo que queda
      es un dato o cifra que el validador no puede verificar, BLOQUEADA y
      aviso inmediato (que `estado.yml` despierte al vigía por API en
      `bloqueado_humano`, no esperar a su reloj); si lo que queda es de forma
      (formato, secciones, listas, marcas, fechas absolutas), el validador
      aplica él mismo las correcciones pendientes sobre la pieza, la aprueba
      con `VEREDICTO: APROBADA` y una línea `CORREGIDA POR EL VALIDADOR:
      vuelta N`, y la cadena sigue; la noche revisa esos casos para arreglar el
      prompt que los produjo. Es la única excepción a "el validador no corrige
      piezas", y existe para que el canal publique todos los días.
      Complemento: **tope por hora**: si son más de las 05:00 de Chile y la
      pieza sigue en CORREGIR por hallazgos de forma, pasar al plan B aunque
      queden vueltas; un informe a las 08:00 no sirve.

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

- [ ] **27-09: revisar el primer video de producción con la secuencia del
      24-09** (imagen de sección toda la sección, oscurecida, texto encima;
      encendida con `SECUENCIA=2409` en edicion-diaria.yml, commit 984a461).
      Mirar cabeceras (cortas o sin título si la voz no dejó pausas), la fila
      del mosaico (apretada) y la portada. Si falló el render por la
      secuencia: `SECUENCIA` en blanco y relanzar. bitacora/2026-09-27.md.
- [ ] **27-09: la voz debe dejar pausas de 2,5 s entre secciones** para que
      las cabeceras de la secuencia quepan en producción (hoy el plan las
      recorta al aire disponible). Es trabajo del TTS (scripts/tts-azure.js /
      build-timeline); proponer con alcance medido.

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
