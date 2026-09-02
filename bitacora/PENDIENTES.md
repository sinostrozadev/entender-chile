# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó está el archivo del día.

Última actualización: 02-09-2026, sesión de la noche.

---

## URGENTE — con plazo

- [ ] **Responder a Google la revisión de la API (plazo: 7 días hábiles
      desde el 01-09 ≈ 10-09).** Pidieron *"the script / screencast of how
      you are uploading videos along with the end-results"*. TODO listo en
      `docs/auditoria-api/respuesta-revision-2026-09-02.md`: borrador del
      correo en inglés para pegar (Reply EN EL MISMO HILO desde
      entenderchile@gmail.com), checklist de 3 capturas y el screencast
      opcional de 60-90 s. Al script se le pega el fuente completo de
      `scripts/youtube-subir.js`.

## EL AGENTE DE ÚLTIMA HORA — conversarlo mañana (02-09, Santiago se fue a
## acostar pidiendo dejarlo anotado para discutirlo mejor)

Origen: el Imacec del 01-09 salió a las 08:30 con mejor historia que la
anunciada y nadie lo capturó en el día.

**La preferencia de Santiago (dicha textual antes de dormir):** un agente
**cada 2 o 3 horas** consultando, y si encuentra algo con categoría de
**"muy importante"** (sea lo que sea, no solo datos anunciados), tener la
noticia fresca y **"lanzarla de una"**.

**Lo que la noche había propuesto (registrado, no decidido):** solo vigilar
lo ANUNCIADO (marcas PENDIENTE DE CIERRE + Agenda) una vez al día a las
09:20; el prompt quedó escrito en `prompts/vigia.md` y sirve tal cual como
subconjunto o pieza del agente mayor. El argumento en contra del barrido
frecuente era costo, ruido y controles de calidad; Santiago lo leyó y aun
así prefiere la vigilancia cada 2-3 horas: esa preferencia manda la
conversación de mañana.

**Lo que hay que resolver juntos mañana (para que la conversación sea corta):**
1. **El criterio de "muy importante"**: tiene que ser mecánico y auditable
   (como el árbol de tarjetas), no un juicio libre del modelo, o va a
   disparar falsos positivos o callarse ante lo grande. Candidato: la lista
   de palabras de ALARMA del barrido + datos macro publicados + hechos con
   declaración oficial de emergencia + umbral de "está en 3+ portadas".
2. **Qué significa "lanzarla de una" HOY**: mientras la auditoría de la API
   no pase, toda subida llega PRIVADA y publicar es un clic de Santiago. Y
   un Short necesita guion + voz + render: sin el workflow "Short exprés"
   (fase 2, abajo) el agente solo puede avisar con el material listo. O sea:
   el agente de 2-3 horas y el Short exprés son UN proyecto, no dos.
3. **Frecuencia y ventana**: cada 2 h entre 08:00 y 22:00 son 8 corridas/día.
   ¿Barrido liviano (portadas + fuentes primarias) o el barrido completo?
   Costo en tareas de GPT o rutinas de Claude, y en cuota de Actions si cada
   corrida puede disparar render.
4. **Controles**: el circuito nocturno tiene verificación de dos fuentes y
   revisión editorial. La pieza de mediodía necesita su versión exprés de
   eso (mínimo: solo fuentes primarias u oficiales, y el gate humano del
   clic de publicar se mantiene).
5. **División del trabajo**: detección y guion = ¿GPT (editorial, como
   quiere Santiago) o rutina Claude (puede notificar al teléfono y ya tiene
   el repo montado)? Render y subida = workflow, eso sí está claro.

- [ ] **Sistema, fase 2 — "Short exprés"**: workflow que convierta
      `contenido/urgente/*.md` en un Short con voz en ~10 minutos (subida
      privada; Santiago publica). Con la preferencia de Santiago pasa de
      "cuando se pruebe el flujo" a pieza NECESARIA del agente de última
      hora: sin él no existe el "lanzarla de una".

---

## La puerta de salida: ABIERTA el 30-08-2026

Santiago dio por resueltas las cinco condiciones y decidió lanzar: 2 videos
y 2 Shorts al día, subidos en privado, con el clic de publicación como gate
humano. Registrado en estrategia/decisiones.md. Se conserva la lista
original como referencia de lo que se exigió:

## Lo que la puerta exigía (cerrado el 30-08)

Decidido por Santiago el 28-08-2026. Cinco condiciones, todas suyas. Hasta
que estén resueltas no se sube ningún video, aunque el pipeline funcione.

1. **El video no le gusta todavía.** Hay que trabajarlo. Falta el cold open,
   la miniatura, la regla de los 5-7 segundos y los visuales propios.
2. ~~**No hay voz.**~~ Resuelto el 29-08: Azure activo, secrets cargados, primer video con voz en Descargas/entender-chile-primera-voz. Falta que Santiago lo escuche y diga si esa voz sirve.
3. **El criterio de selección no convence.** Hoy quedaron fuera noticias
   importantes. Ver el análisis del 28-08 más abajo.
4. **Todavía se nota la IA en los informes.** Falta identificar exactamente
   en qué se nota, con ejemplos concretos del texto.
5. **Todavía hay errores en los informes.** Las revisiones los detectan y
   nadie los corrige.

Esto reemplaza la recomendación de la auditoría del 28 de crear el canal y
empezar a publicar ya. Se mantiene una sola parte de aquella: **reservar el
handle no es publicar y no cuesta nada**, y si alguien lo toma antes, se
pierde el nombre.

---

## Bloquean todo y dependen de Santiago

- [ ] **Programar la auditoría matinal a las 09:30 de Chile**, apuntando a
      `prompts/auditoria-matinal.md` (pedida el 02-09). Corre después de la
      última ejecución del día, evalúa cómo salió todo, propone arreglos y
      **clasifica cada uno en HOY / AGUANTA / MIRAR**. No la creo yo: una
      rutina creada por un agente nace sin el repo montado, que fue
      exactamente el bug del guardián.

- [ ] **Pegar `prompts/guardian.md` en la rutina del guardián**
      (`trig_01Dk4PXRmGEMPHzrvs6amTgf`): un agente no puede editarla. Hasta
      entonces, el guardián no vigila la Clave.
- [ ] **Programar el vigía en ChatGPT a las 09:20** apuntando a
      `prompts/vigia.md`, como las otras cinco tareas.
- [ ] **Publicar desde Studio la Clave y el Short de la Clave del 02-09**,
      que subieron privados a las 08:28.

- [x] **Azure: LISTO (29-08, noche).** Secrets `AZURE_SPEECH_KEY` y
      `AZURE_SPEECH_REGION` cargados en GitHub; copia local fuera del repo en
      `~/.claude/projects/-home-santiago-projects-daily/secrets/azure.env`.
      Probado: 9.100 caracteres → 8,6 min de voz es-CL en 40 s, 15 trozos, 14
      pausas de sección. El límite de 3.000 caracteres es de la herramienta
      del Speech Studio, no de la API: el corte por sección ya lo cubre.
      **Primera edición con voz: la del 30-08** (validar que el workflow la
      tomó: el log del paso 3 no debe decir "video mudo").
- [ ] **Escuchar el primer video con voz** (Descargas/entender-chile-primera-voz:
      mp4 de 8,6 min y el mp3 de la narración): ¿sirve LorenzoNeural o se
      prueba otra voz es-CL? (`AZURE_VOICE` permite cambiarla sin tocar código).

- [ ] **Reservar el handle** (@entenderchile o variante) en YouTube,
      TikTok e Instagram. No implica publicar.

## Para la sesión de la noche (código y prompts)

- [ ] **IMAGEN 0: encender lo que ya está construido (02-09, tarde).** Hecho
      y commiteado, todo APAGADO por defecto para no tocar producción sin
      verlo: `src/fondos.tsx` (las cuatro familias, papel tintado, azar
      sembrado, máscara que despeja la zona del texto), `Marco` y
      `CortinaSeccion` lo usan solo si el timeline trae `meta.fondos: true`;
      la cortina nace opaca en ese modo; `meta.selloEn` corre el sello para
      la apertura en frío; `REMOTION_FUENTES_LOCALES=1` sirve las fuentes
      desde `public/fuentes` sin red. Video de ejemplo con el guion real del
      02-09: `node ejemplos/demo-cambios-02-09.js`. Para encenderlo en
      producción: `build-timeline.js` pone `fondos: true` y `selloEn` = fin
      de la primera pausa, y el workflow exporta la variable de fuentes.
      Antes de encender, mirar el video de ejemplo con Santiago.

- [ ] **DATOS 1: la base de series, una para validar y para dibujar.**
      `datos/series/<indicador>.json` (fuente, unidad, periodicidad, alias,
      valores por período), alimentada por el vigía, histórico inicial de los
      CSV del Banco Central y del INE. `validar-tarjetas.js` avisa cuando un
      [DATO] no calza con el valor publicado (el 5,1 contra 1,5 del 01-09);
      `build-timeline.js` adjunta los últimos 24 valores a las marcas
      `lineas`; y se construye por fin `TarjetaDatoLineas`. Detalle en
      `ideas/imagen-y-retencion.md` punto 8. Cierra VISUAL 2.

- [ ] **DATOS 2: tarjetas.** (1) Párrafo → frase clave de hasta 20 palabras
      marcada en el guion, solo esa va a pantalla. (2) Cifra con referencia
      abajo (valor anterior o mismo mes del año pasado, desde la base).
      (3) Count-up y flecha que se dibuja. (4) Cita con cargo, contexto y
      comilla grande; quitar el guion corto del nombre en TarjetaCita.
      Detalle en `ideas/imagen-y-retencion.md` punto 7.

- [ ] **IMAGEN 1: fondos por sección, empezando por la cortina.** Todo el
      análisis está en `ideas/imagen-y-retencion.md` (02-09). Lo primero es
      `CortinaSeccion` en `src/tarjetas.tsx:492`: es el fotograma que YouTube
      toma para CADA capítulo, así que un solo componente define catorce
      miniaturas de la tira. Ojo: hoy entra en fundido de 0,14 s, así que en
      el fotograma exacto del inicio es transparente; debe nacer opaca (una
      línea) o los capítulos correrse medio segundo en `chapters.js`. Textura procedural dibujada en código (cuatro
      familias: topográfica, pauta de gráfico, trama de diario, rayado), papel
      tintado 2 a 4% con el color que ya da `colorDeSeccion()`, y azar sembrado
      con `fecha + sección` para que la misma edición se rinda siempre igual.
      Nada de fondos fotográficos y nada sobre 0,10 de opacidad: la firma del
      canal es que la cifra se lee.

- [ ] **IMAGEN 2: "En titulares" a 90 segundos.** Medido en el 02-09: el
      bloque va de 09:59 a 13:04, tres minutos cinco segundos, el 23% de una
      edición de 13:32, 18 noticias en fila al final a 10 s cada una.
      **Primero la opción B, que no rompe nada**: tope de 12 palabras por
      titular (hoy miden unas 30), con lo que los 18 caben en 80 a 90 s y
      todo sigue sonando. Medir en la siguiente edición; solo si un día de 25
      vuelve a pasar de dos minutos, tope de cantidad (12) con criterio de
      alcance + consecuencia + proximidad, que sí rompe la regla de
      `prompts/guion-informe.md:92` y la decide Santiago. En los dos casos el
      bloque se mueve ANTES del dato curioso para que la edición no termine
      en una lista.

- [ ] **IMAGEN 3: la recomendación del tiempo, casual y con dos localidades.**
      Nunca nombrar lo que no va a pasar ("salga sin paraguas" se prohíbe),
      máximo 12 palabras por localidad, y Santiago más una capital regional
      que rota por día del año (módulo 15) sobre la lista fija de las 15
      capitales fuera de Santiago: rotación, no sorteo, para que no se repita
      en 15 días. Toca
      `prompts/informe.md:77` y `prompts/guion-informe.md:94`.

- [ ] **IMAGEN 4: apertura en frío.** Hoy la primera noticia concreta llega en
      el segundo 31 (medido). Propuesta: 0:00 a 0:12 la noticia de portada
      entera, después el sello (mover el `<Sequence>` de `src/Informe.tsx:123`),
      después la apertura acortada a 15 segundos. El capítulo 1 pasa a llamarse
      por la noticia.

- [ ] **IMAGEN 5: puntaje de portada, una decisión para las tres.** Hoy el
      título lo inventa libre el agente del guion, la cifra de la miniatura es
      la primera que encuentra `scripts/dia.js:128` y la noticia de apertura es
      "una [A]" cualquiera: tres decisiones sueltas en tres archivos. Propuesta:
      el informe declara la NOTICIA DE PORTADA con un puntaje de 0 a 10
      (alcance, consecuencia, nombre propio buscable, proximidad, novedad) y
      las tres piezas la leen de ahí. Lo medido: el video de Milei tiene 158
      vistas, casi 4 veces el segundo, e hizo 5, 62 y 158 en sus tres días:
      no lo empujaron los suscriptores, lo empujó YouTube por búsqueda del
      nombre. Por eso el criterio es "nombre propio buscable" y no
      "conflicto". **Anotar el puntaje de cada
      edición en la bitácora y revisar en dos semanas si predice vistas.**

- [ ] **TALLER 1: traer el panel de métricas como cuarto módulo.** El Taller
      quedó publicado el 02-09 con tres módulos (Archivos, Borradores, Cómo
      funciona) más el muelle de Claude:
      https://claude.ai/code/artifact/48d0192b-0b54-4d8c-9c72-4e628c520d0f
      No mudé el panel de métricas el mismo día a propósito: funciona y se
      actualiza solo desde `metricas.js`, y romperlo el día que se estrena el
      Taller habría dejado a Santiago sin las dos cosas. Cuando el Taller
      lleve unos días de uso, el panel entra como cuarto módulo y se termina
      de una vez el problema de PANEL 3 (dos copias del mismo tablero).

- [ ] **TALLER 2: barrer las 38 rayas largas del repo.** La regla del
      proyecto prohíbe `—` y `–`, y hay 38 repartidas en `src/tarjetas.tsx`,
      los tres workflows, `README.md`, una docena de scripts y
      `ejemplos/guion-2026-08-23.md`. Son previas a la regla, no las
      introdujo nadie hoy. Es exactamente el trabajo para el que sirve el
      Taller: abrir el archivo, pedirle el reemplazo a Claude, mirar el diff
      y guardar el borrador.

- [ ] **PANEL 3: el artifact publicado no se actualiza solo, y hay que decidir
      qué hacer con eso.** Santiago pidió las métricas de hoy y el panel
      publicado seguía mostrando las de ayer.
      **Dos causas, las dos mías, la primera ya corregida:**
      1. *(ARREGLADO hoy)* Las tarjetas de "Hoy", las barras por video, la
         lectura del día y la columna "Hoy" de la proyección estaban escritas
         a mano en el HTML. `metricas.js` solo refresca los bloques entre
         marcadores (SERIE y HIST), así que esos números quedaban viejos cada
         día por diseño. Ahora **todo se dibuja desde HIST**: una medición
         nueva actualiza la página entera, incluida la fecha del encabezado y
         el ritmo de la proyección, que antes calculaba yo a mano.
      2. *(ABIERTO)* El **artifact publicado es una copia**, no el archivo del
         repo. `metricas.js` escribe el archivo; republicar el artifact
         necesita credenciales que un workflow no tiene. Hoy solo se actualiza
         cuando yo lo republico desde una sesión, o sea que **entre sesiones
         el panel publicado siempre va un día atrás**.
      **Tres salidas, de menos a más trabajo:**
      a. Dejarlo así y republicar en cada sesión de la mañana, sumándolo a la
         rutina de la auditoría. Cero código, pero depende de acordarse.
      b. Que la web pública del canal (`entender-chile-web`, que ya se
         reconstruye sola en el paso 8) sirva el panel en una ruta no
         enlazada. Deja de haber copia: una sola fuente, actualizada por el
         mismo pipeline. Es la que yo haría.
      c. Darle al artifact la capacidad `sample` o `db` para que lea datos en
         vivo. Descartado por ahora: los conectores de Santiago son Gmail,
         Calendar y Drive, no hay GitHub, así que la página no puede leer el
         repo sola.

- [x] **BUG 1 CORREGIDO Y LAS PIEZAS REHECHAS (02-09, con la regla de solo
      lectura levantada por Santiago).** El texto se desbordaba porque
      `parse.js` metía el párrafo narrado dentro de la tesis cuando el guion
      no dejaba línea en blanco. Tres capas aplicadas: el parser emite la
      tesis como evento cerrado (578 caracteres pasan a 107 en el guion de
      hoy), `tamanoProsa()` encoge el texto en los dos formatos por si acaso,
      y `validar-tarjetas.js` avisa si una tesis pasa de 180 caracteres o va
      pegada al párrafo (cazó los tres casos de hoy). Más la regla de la
      línea en blanco en los dos prompts de guion, que es lo que lo evita
      desde el origen.
      Run 25 rehizo las cuatro piezas: `rWOxj_0Iris` (informe),
      `hCObnchAo2U` (Short), `qzn2RJefxic` (Clave), `JpWGFsV-mMc` (Short de
      la Clave), todas privadas y con miniatura.
      **Queda para Santiago:** borrar en Studio los cuatro viejos (los dos de
      la mañana, `8X_lOUPmLbE` y `814rdrOmAz0`). YouTube no deja reemplazar
      el archivo de un video, así que la subida crea IDs nuevos.
      **Pendiente de mirar mañana:** el guion del 03-09 debería venir con la
      línea en blanco después de cada [TESIS] y el paso 2c no debería avisar
      nada. Si vuelve a avisar, la regla del prompt no se aplicó.
- [ ] **ESTADO 02-09, 07:50: Santiago levantó la regla de solo lectura para
      HOY 1 a 4. Qué quedó aplicado y qué no, verificado:**
      - **HOY 4, HECHO Y PROBADO** (`221b15d`, run 22 a las 07:52): edición
        diaria reentrante por pieza, path de `guiones/claves/**`, input
        `fecha`, paso 7 protegido. Santiago lo disparó desde "Run workflow"
        (el disparo desde la integración da 403, como el 31-08). Saltó el
        informe y su Short, produjo la Clave y su Short, los subió privados
        (`8X_lOUPmLbE`, `814rdrOmAz0`), completó el release, el podcast y la
        web. La guarda del paso 7 resultó necesaria. Detalle en la auditoría.
        **Dato nuevo para el cuadro de horas:** la Clave sola tarda 25
        minutos en renderizar.
      - **HOY 2, APLICADO en los prompts** (`127d49f`): contrato al inicio de
        los cinco prompts, localización por dos rutas, ausencia con evidencia,
        `FECHA-SIN-ENTREGA.md`, y la frase en el contrato. Rige desde la tarea
        de las 04:15 de mañana, porque ChatGPT lee los prompts del repo.
        **Pero el guardián NO**: `update_trigger` rebotó con "Agents can only
        update routines they created" (la rutina se creó por la API). El
        prompt nuevo quedó versionado en **`prompts/guardian.md`**, listo
        para pegar en `trig_01Dk4PXRmGEMPHzrvs6amTgf` desde la interfaz o
        para que la sesión local lo recree por su vía. Hasta que se pegue, el
        guardián sigue sin vigilar la Clave.
      - **HOY 3, HECHO**: la rutina vieja `trig_01TNcYi1Pe46NtnL7eXN6YAx` fue
        borrada.
      - **HOY 1 corregido**: el vigía es un prompt para ChatGPT, no una
        rutina de Claude. Santiago lo programa a las 09:20. La línea de
        origen ya está corregida (`d35cb1b`).

- [ ] **EDITORIAL 1b, para la mañana: verificar si la edición del 02-09 cerró
      el Imacec (cayó 1,5%) por su cuenta.** Si lo hizo, fue por ser noticia
      de ayer, no por regla; la regla 2 ya quedó escrita igual.

- [x] **PANEL 1 — HECHO (noche 01-09).** `metricas.js` ahora reconstruye
      ENTEROS `proyeccion.json` y los bloques SERIE e HIST del panel desde
      todos los `bitacora/metricas/*.json`, con el arrastre de durSeg hacia
      atrás por id (reproduce exactamente lo reconstruido a mano: 5/17/0.38 ·
      23/129/1.88 · 105/360/9.37) y tope de 30 días en HIST. Modo
      `--solo-panel` para refrescar sin tocar YouTube.

- [x] **PANEL 2 — DECIDIDO (noche 01-09): se queda en dos clics.** Un botón
      de un clic exigiría un token de GitHub dentro de una página publicada, y
      eso no se hace. Se revisa solo si la operación diaria lo pide.

- [x] **VISUAL 3 (capa a) — HECHO (noche 01-09), con la prueba previa
      hecha.** Árbol aplicado a mano a las 31 marcas del 29 al 01: nunca
      empeora y mejora 4 (la ganancia 2025→2026 era `cambio`; dos `cifra`
      traían 2-3 valores de unidades distintas, tarjeta malformada; el viento
      100/90 era `comparacion`). La monotonía del 30 y del 01 la corrigen las
      cuotas, no el árbol. Aplicado: árbol + cuotas + regla protectora en
      `prompts/guion-informe.md`, y el contador mecánico
      `scripts/validar-tarjetas.js` como paso 2c de la edición (avisa en el
      log, no bloquea). Probado contra los 4 guiones reales: caza las 3
      marcas malformadas del 29, la monotonía del 30 (6/6 cifra) y las 11
      cifras del 01.

- [ ] **VISUAL 3 (capas b y c), después:** categoría `[MENOR]` "monotonía
      visual" en la revisión editorial (con cuidado: ese prompt está
      calibrado contra repetir hallazgos) y el histórico de tipos por edición
      en el panel, cuando haya dos semanas de datos que mirar.

- [x] **VISUAL 1 — HECHO (noche 01-09).** `[ESQUEMA]` pasó de "úsalo con
      moderación" a obligatorio-condicional (al menos uno cuando el día tenga
      una noticia de proceso, sin forzar), máximo dos `[DATO cifra]` seguidas,
      y el punto 17 nuevo del control interno del guion.

- [ ] **VISUAL 2: la serie histórica (`lineas`). NO está construida: son dos
      trabajos, no uno.** Ojo, esto se creía hecho y no lo está.
      `src/tarjetas.tsx` línea 448 dice textual:
      `case "lineas": // v1: las líneas caen a comparación; componente propio en v2`
      O sea que hoy pedir `[DATO lineas]` dibuja una tarjeta de comparación.
      El tipo está ofrecido en el prompt (línea 116) y aceptado por el
      parser, pero el componente propio no existe.
      **Parte A, el componente:** escribir `TarjetaDatoLineas` en
      `src/tarjetas.tsx` y despacharlo desde `TarjetaDato`. Una serie de
      tiempo con eje, el último punto marcado, y la animación de trazado
      (encaja con la regla de los 5 a 7 segundos: una línea que se dibuja no
      es una tarjeta muerta).
      **Parte B, y es la de verdad: de dónde salen los datos.** Hoy el guion
      solo lleva los valores que él mismo escribe en la marca, así que una
      serie de 24 meses no puede venir del guion: necesita una fuente. Es lo
      que `estrategia/indicadores-pais.md` ya diseñó (IPC, desempleo, UF,
      Imacec, con su cadencia de actualización). Decidir si se baja una vez
      al día a un JSON del repo y el guion solo nombra el indicador, o si se
      resuelve de otra forma.
      **Por qué vale el trabajo:** es la identidad del canal convertida en
      imagen. La frase ya está escrita en indicadores-pais.md y es la mejor
      del proyecto: *"el informe cuenta el episodio, la serie da los últimos
      veinte años. Una noticia sin serie es una anécdota."* Hoy "la industria
      cayó 5,1%" es un número solo en pantalla.
      **Orden sugerido:** primero VISUAL 1 (una regla en un prompt, esta
      noche), y VISUAL 2 como proyecto aparte con sus dos partes, después de
      los ARREGLOS 0 a 3.

- [x] **ARREGLO 3 — HECHO (noche 01-09).** Hipótesis confirmada en el
      código: venía de `channels.list.statistics.viewCount` (rezagado en
      canales con Shorts). Ahora `vistasTotales` = suma video por video,
      también hacia atrás (23 · 152 · 465), y el contador del canal queda
      aparte como `vistasCanal`. La cabecera del md muestra ambos y dice
      "N subidos, M públicos".

- [x] **ARREGLO 0 — HECHO (noche 01-09).** Guardián nuevo
      `trig_01Dk4PXRmGEMPHzrvs6amTgf` creado por http_api con el repo como
      fuente y modelo declarado (sonnet), mismo prompt + la comprobación de
      métricas de AYER (ARREGLO 2), cron `0 10 * * *` y push al teléfono.
      Corrida de prueba REAL: montó el repo y respondió exactamente
      "Edición 2026-09-01 completa." en 19 segundos. El viejo quedó
      deshabilitado y renombrado "(ROTO, reemplazado 01-09)"; borrarlo desde
      claude.ai cuando se pueda (la API no expone delete).

- [x] **ARREGLO 2b — HECHO (noche 01-09).** Patrón completo (add exacto,
      autoStash, origin main explícito, reintento de push) unificado en
      barrido.yml y en los pasos 2, 5 y 7b de edicion-diaria.yml. Auditoría
      de escrituras hecha: cada script escribe dentro de la carpeta que su
      paso agrega; out/ y public/*.mp3 están gitignoreados.

- [x] **REVISAR ARREGLO 1 — HECHO (noche 01-09):** el patrón que la sesión
      de día dejó en metricas.yml es el correcto y quedó unificado en los
      tres workflows (ver ARREGLO 2b).

- [ ] ~~**ARREGLO 1 original: el commit de `metricas.yml` falla y pierde la medición del
      día. Causa exacta, del log del run 33510580263 (01-09, 12:58):**

          [main 8a549d8] métricas 2026-09-01 [bot]
           3 files changed, 162 insertions(+), 4 deletions(-)
          error: cannot pull with rebase: You have unstaged changes.
          error: Please commit or stash them.

      No es una carrera de push: el commit se hizo bien y el `pull --rebase`
      se negó a correr porque quedaron **cambios sin preparar en el árbol**.
      El paso hace `git add bitacora/metricas/` (solo esa carpeta), pero
      `metricas.js` también escribe fuera de ella: el log dice "datos del
      gráfico del panel refrescados", o sea toca el panel. Ese archivo queda
      modificado y sin `add`, y por eso el rebase aborta.
      Arreglo, cualquiera de los tres: incluir en el `git add` lo que el
      script realmente toca (o `git add -A`), o usar `git stash` antes del
      pull, o `git -c rebase.autoStash=true pull --rebase`. Y de paso
      **sumar el reintento** que todos los demás workflows del proyecto ya
      tienen y a este se le olvidó ("reintenta una vez con pull --rebase").
      Nota: el 04:10 no falló porque en ese momento el panel ya estaba al
      día y no quedó nada sin preparar. Es intermitente por diseño.

- [x] **ARREGLO 2 — HECHO (noche 01-09):** el guardián nuevo comprueba
      `bitacora/metricas/AYER.md` (mira el día ANTERIOR, por el orden de los
      relojes: él corre 10:07 UTC y las métricas bajan 12:57 UTC) y lo cuenta
      como alerta.

- [x] (CORREGIDO 1-09: paso 8 despacha la web) **El feed del podcast no se regenera cuando el bot registra episodios.**
      Causa exacta, confirmada hoy: el paso 7b commitea
      `contenido/podcast/episodios.json` con el GITHUB_TOKEN del workflow, y
      GitHub NO dispara workflows desde pushes hechos con ese token (regla
      anti-recursión). `web.yml` escucha `contenido/podcast/**` pero nunca ve
      ese push: hoy los episodios del 31 quedaron registrados a las 10:07 UTC
      y no hubo ejecución de Web después (la última fue 07:46). El RSS
      `/podcast.xml` quedó viejo y Spotify no ve episodios nuevos. Ayer no se
      notó porque pushes manuales posteriores reconstruyeron la web de
      rebote. Arreglo: que el paso 7b pushee con un PAT (como ya hace con
      AUDIO_TOKEN hacia el repo web) o que despache web.yml explícitamente
      tras registrar el episodio.

- [x] (HECHO 1-09) **Aplicar la regla nueva de relojes a metricas.yml** (decisión de
      Santiago del 31-08, en decisiones.md: el cron de GitHub no se usa como
      reloj principal, solo como red). Receta ya probada del barrido: rutina
      despertador que pushea un archivo + trigger por push en el workflow +
      cron de respaldo. Es el único proceso que sigue colgando del cron.

- [x] (CORREGIDO 1-09: rutina Reloj de métricas 12:45 UTC + trigger por push; cron de red a las 15:00 UTC) **El workflow de métricas no ha corrido nunca.** Cero ejecuciones desde
      su creación (30-08 18:44). Su primera cita era hoy a las 13:00 UTC y a
      las 13:35 no había disparado: el cron de GitHub otra vez, la misma
      enfermedad medida del 27-08. Los archivos del 30 los commiteó la sesión
      local a mano, no el workflow. Arreglo con evidencia a favor: darle el
      mismo reloj que ya salvó al barrido (rutina despertador o despacho
      desde una rutina de Claude), o aceptar el atraso si las métricas de
      media mañana bastan.

- [ ] **BUG del primer día publicado: el video del informe subió con el
      título de la Clave.** Causa exacta, confirmada en el código: informe y
      Clave escriben en la MISMA carpeta `out/FECHA/` y ambos generan
      `parsed.json` (`dia.js` línea 58: `OUT = out/fecha`, sin subcarpeta
      por pieza). El workflow renderiza informe (paso 3), después la Clave
      (paso 4) que SOBRESCRIBE `parsed.json`, y el paso 7 sube todo al
      final: cuando sube el informe, lee el título de la Clave
      (`youtube-subir.js` línea 39: `DIR_PARSED = OUT` para los no-Short).
      Arreglo: carpeta por pieza (`out/FECHA/informe/`, `out/FECHA/clave/`)
      o guardar `parsed-<etiqueta>.json` y que youtube-subir lea el suyo.
      Los Shorts no sufren el bug porque ya tienen subcarpeta propia.

- [ ] **Miniatura: la cifra es de otra noticia que el titular.** La de hoy
      dice "114 votos a favor en la Cámara" sobre el título "Concepción en
      Alerta Roja": la cifra sale del primer [DATO] del guion (`dia.js`
      líneas 124-135) y el titular de la apertura, y no tienen por qué
      coincidir. Regla: la cifra solo va si pertenece a la MISMA historia
      del titular (mismo bloque de sección); si no, miniatura sin cifra.

- [ ] **Rediseño de miniaturas (a Santiago no le gustan).** Las actuales se
      ven lavadas: papel claro sobre la interfaz blanca de YouTube hace que
      la carátula desaparezca, y el texto queda chico al tamaño real de
      feed (~120 px de ancho en el teléfono). Direcciones para probar,
      manteniendo la decisión de solo tipografía:
      1. **Invertir el lienzo**: tinta (fondo oscuro) con la cifra o palabra
         gancho en papel y el acento cobre. Contraste real en el feed.
      2. **Menos palabras, más grandes**: máximo 4 palabras de titular, no
         el titular completo. "ALERTA ROJA EN CONCEPCIÓN" y nada más.
      3. **El mapa de cobre como fondo** (ya existe para el Short vertical):
         identidad reconocible entre pieza y pieza.
      Probar legibilidad reduciendo la imagen a 120 px antes de aprobar.

- [ ] **Short de la Clave: abre con el fondo del informe y después salta al
      suyo.** El arranque (sello) usa el fondo marino por defecto y recién
      después entra el fondo propio de la Clave. Revisar `src/Short.tsx`:
      el fondo debe llegar por props también al bloque inicial.

- [ ] **Hora de publicación por pieza, no una para todo.** Hoy el paso 7 de
      `edicion-diaria.yml` sube las cuatro piezas con la misma configuración
      (`YT_PUBLICAR_HORA` aplica igual a informe, Clave y los dos Shorts).
      Para que el espaciado decidido en el lanzamiento sea automático
      (informe en la mañana, Clave a mediodía, Shorts en la tarde), el paso 7
      debe pasar `--programar` distinto por pieza. Sugerencia: informe 07:00,
      Short del informe 12:00, Clave 14:00, Short de la Clave 18:00, y las
      horas como variables del repo para ajustarlas sin tocar el workflow.
      **Solo tendrá efecto cuando Google apruebe la auditoría de la API**:
      hasta entonces YouTube ignora publishAt y deja todo privado, y el clic
      es de Santiago en Studio (que hoy es además el gate humano).
- [ ] **Verificar el estado de la auditoría de la API de YouTube** en Google
      Cloud Console (proyecto del cliente OAuth, pantalla de consentimiento /
      verificación). Mientras esté pendiente, la publicación programada por
      API no funciona. Anotar aquí cuándo se aprueba, porque ese día la
      variable de hora pasa a mandar de verdad y conviene revisar que las
      horas por pieza ya estén puestas.

Hecho el 29-08 en la noche (detalle en `bitacora/2026-08-29.md`): propuesta
del informe largo aplicada en los tres archivos + rutina de revisión
recalibrada; contrato con ESCRITURA VERIFICADA y VERIFICAR ANTES DE AFIRMAR
(con la regla de la ausencia); bloque interno al final absoluto; promesa de
duración actualizada; tornado investigado y corregido en el barrido; los
cuatro documentos con deriva puestos al día; render por push corregido
(lo dispara la última pieza en llegar, sin rojo si falta la otra).

- [ ] **Validar las fuentes de verdad, no solo citarlas.** Santiago (29-08):
      la fuente al pie de cada diapositiva gana confianza solo si llega
      validada. Hoy la valida el modelo que escribe el informe (regla de dos
      fuentes) y la revisión NO abre las fuentes (la nube no alcanza los
      medios chilenos). Propuesta: que el informe deje en su bloque interno
      la URL de cada fuente citada, y un script local de la mañana
      (`scripts/verificar-fuentes.js`) las abra y busque en ellas la cifra
      principal de cada noticia; lo que no calce va a la bitácora. Es trabajo
      de una noche.
- [ ] **Tagline**: Santiago duda de "El resumen sin gritos". Alternativas y
      recomendación en `ideas/tagline-alternativas.md`. Decide él.
- [ ] **Noticias que faltaron el 29** según Santiago: pendiente que las nombre
      para ver en qué etapa se perdieron (barrido, olla o informe).
- [x] **YouTube conectado (29-08, noche).** Canal, OAuth y secrets listos;
      prueba en privado OK. Quedan: (1) **pedir la auditoría de la API** para
      poder publicar/programar desde el workflow (formulario en
      support.google.com/youtube/contact/yt_api_form; hasta entonces cada
      video llega privado y Santiago lo publica con un clic); (2) al publicar
      un video, poner su id en `contenido/videos/FECHA-informe.txt` para que
      la web lo embeba; (3) borrar de Studio los dos videos de prueba del 29
      si no se van a publicar.
- [x] **Miniatura automática: lista y probada** (teléfono verificado el 30-08;
      la del video de prueba jsr27ZICuQ4 ya está puesta). Desde el 30-08 va
      sola con cada edición.
- [ ] **Funciones avanzadas de YouTube** (Santiago): Settings → Channel →
      Feature eligibility → 3. Advanced → Access features → verificar con
      cédula o con video. Desbloquea enlaces externos en las descripciones
      (el link al sitio), más subidas por día, pruebas A/B de miniaturas y
      la postulación a monetización. Sin esto, cuando llegue el umbral no se
      puede postular.
- [ ] **Cambio de hora del 6 de septiembre (Chile pasa a UTC-3):** correr una
      hora antes en UTC las rutinas de la nube (reloj del barrido 05:30 →
      04:30, observatorio 05:45 → 04:45, revisión 08:40 → 07:40, guardián
      10:00 → 09:00) y los crons de GitHub (barrido 05:50 → 04:50, respaldo
      09:00 → 08:00). Las tareas de ChatGPT van en hora de Chile y no cambian.
      Hacerlo la noche del 5-09.
- [ ] **Shorts (informe y Clave), en el workflow desde el 30-08** (pasos 3b y
      4b; fondo marino por defecto; cierre "El informe completo de hoy está
      en el canal Entender Chile"). Faltan: (1) fondo propio para el Short de
      la Clave: prompt listo en `ideas/fondos-prompts.md`, guardar como
      `public/fondos/fondo-clave-vertical.png`; (2) música, cuando Santiago
      elija una en la Biblioteca de audio de YouTube; (3) hora de publicación
      y tácticas: `ideas/viralizacion.md` (Short del informe 07:30, Clave
      13:00 o 20:30; medir retención y swipe-away antes de opinar).
- [ ] **Miniatura automática por edición**: `dia.js` renderiza
      `out/FECHA/miniatura.png` con `src/marca.tsx` (cifra = primer [DATO] del
      guion, titular = "Título sugerido"), la sube al release y
      `youtube-subir.js` ya la toma si existe.
- [ ] **Auditoría de la API: ENVIADA el 30-08 en la noche.** Esperar la
      respuesta en entenderchile@gmail.com (1 a 3 semanas; revisar spam los
      primeros días). Si repreguntan, las seis pruebas están en
      docs/auditoria-api/ y las respuestas en docs/youtube.md. Al aprobarse:
      cargar la variable YT_PUBLICAR_HORA (ej. 07:30) y la publicación queda
      programada sola.
- [ ] **Panel interno: regenerarlo cada mañana** (sesión de la noche/mañana):
      artifact privado con métricas, circuito, pendientes y documentos.
      URL en la memoria del proyecto. Fase siguiente: gráfico de serie cuando
      haya 5+ días de métricas.
- [ ] **Informe diario de métricas para Santiago (pedido 30-08).** Cada
      mañana, junto con la revisión del embudo, entregarle métricas y
      análisis: vistas, me gusta, suscriptores, y en cuanto haya datos,
      retención por video y swipe-away de Shorts. Fase 1 (ya posible): la
      sesión de la mañana los saca con la Data API (el token ya sirve) y los
      deja en bitacora/metricas/FECHA.md + resumen en conversación. Fase 2:
      retención e impresiones piden el scope yt-analytics.readonly → re-correr
      youtube-auth.js una vez con ese scope agregado. Fase 3: **página
      interna** con la serie completa (opciones: artifact privado de Claude
      actualizado a diario, o /interno en la web con URL no listada; decidir
      con Santiago qué más quiere ahí: embudo, costos, cuotas).
- [x] **Podcast: COMPLETO (30-08).** Feed RSS vivo, show en Spotify
      (open.spotify.com/show/2Ay5U3wUiQ0RaDbeakqGVp), informe Y Clave como
      episodios diarios automáticos (AUDIO_TOKEN cargado y verificado). El
      mismo feed sirve para Apple Podcasts y Amazon si se quiere después.
- [ ] **Facebook**: plan por etapas en `ideas/facebook.md` (página + Reels
      manuales dos semanas + medir antes de automatizar).
- [ ] **Voz: recurso de respaldo S0 (Santiago, cuando el F0 se acerque al
      tope, ~día 17 del mes).** El código ya cae solo al respaldo: portal
      .azure.com → crear un SEGUNDO recurso Speech, mismo grupo, plan **S0**
      → copiar su KEY y región → secrets `AZURE_SPEECH_KEY2` y
      `AZURE_SPEECH_REGION2` en GitHub. Se paga SOLO el exceso sobre el medio
      millón gratis: ~US$5-7/mes con el ritmo actual. Decisión de fondo
      (1-09): NO se recorta el fin de semana por costo; la promesa del canal
      es diaria y el ahorro serían ~US$6.
- [ ] **Mirar el 30-08 con lupa, primera edición con las reglas nuevas:**
      (1) que las [A] respondan las cinco preguntas sin inflarse; (2) que
      "Además, hoy" traiga todo lo verificable sin volverse basurero; (3) que
      el guion tenga "## En titulares" con "Y en titulares:" y nada del
      informe quede sin sonar; (4) duración real con voz y titulares; (5) que
      el bloque interno esté después de "Para salir hoy"; (6) que el barrido
      diga cuántas entraron por "mismo tema" y por "alarma"; (7) que el guion
      traiga [FUENTE] bajo cada sección y algún indicador "(sube mal)" bien
      usado; (8) que la voz entre después del sello y las cifras automáticas
      no muestren nada raro; (9) criterio de las cifras: que cada [DATO] sea
      una cifra que cambia algo para alguien, con etiqueta con contexto, tipo
      `cambio` para las variaciones y fuente legible (sin números de informe).
- [ ] **Extraer la línea base de "¿Lo cumplió?".** El criterio ya está
      congelado y fechado en `estrategia/seccion-lo-cumplio.md`: umbral de
      tres condiciones, tamaño 30 a 50, estados, y el protocolo de
      extracción paso a paso con el formato de ficha. Solo se puede hacer en
      local (la nube no abre servel.cl): bajar el PDF del Servel y guardarlo
      en el repo, leerlo entero, clasificar en admitidas y excluidas con
      motivo, elegir entre 30 y 50, una ficha por promesa con su bloque de
      datos, y commit de congelación.
- [ ] **Decidir la arquitectura de estado y categorías.** Propuesta completa
      en `ideas/estado-de-las-noticias.md`, cuatro decisiones abiertas al
      final. De los tres arreglos que salían de ahí, dos ya están (el tope se
      mudó al guion; el informe lee "Historias en curso sin novedad hoy").
      Falta el tercero: **crear las secciones Plata pública y Educación** en
      el informe y alinear el listado de áreas de `prompts/seleccion.md` con
      las secciones de `prompts/informe.md` (hoy son dos listas distintas).
- [ ] **Escuchar los cinco sonidos y aprobarlos o pedir cambios**: quedaron
      en Descargas/sonidos-entender-chile (mp3) junto a un render de muestra
      de 44 s. Ya suenan en el video del 29 (sello, 14 cortinas, cierre).
- [ ] **Si quieres que las alertas te despierten**: permitir que las
      notificaciones de la app de Claude se salten el modo silencio en
      Android. El canal funciona (revisión 04:50 + guardián 06:00); es solo
      configuración del teléfono.

## Para la sesión de día (solo análisis)

- [ ] **Dónde se nota la IA.** Leer los cinco informes marcando frases
      concretas: fórmulas repetidas, transiciones de ensayo, simetrías,
      cierres que suenan a plantilla. Entregar una lista de ejemplos con
      cita, no un diagnóstico general.
- [ ] **Inventario de errores reales** en los cinco informes, separando
      error de hecho de omisión deliberada.
- [ ] **Auditar el criterio de selección** con más de un día, para ver si
      el sesgo se repite o fue solo hoy.
- [ ] Ver dos o tres videos de El Shot y de otros canales chilenos con la
      lista de `ideas/formato-video.md` al lado, y anotar qué hace cada uno
      en los primeros 30 segundos.

## Ideas para retomar (no son tareas todavía)

- **"¿Lo cumplió?", seguimiento de promesas.** Idea de Santiago del 28-08.
  Opinión y esbozo completo en `ideas/promesas-de-campana.md`. Resumen: es
  la idea más fuerte que ha aparecido y la más peligrosa; no se construye
  ahora, pero **congelar la línea base sí conviene temprano**, porque hacerlo
  después nunca va a ser igual de creíble. Cuatro decisiones abiertas al
  final de ese documento.
- **Nota de arquitectura**: plata pública, historias abiertas y promesas son
  el mismo mecanismo (una entidad con estado, evidencia fechada y una
  pregunta que la cierra). Conviene construirlo una vez y usarlo tres veces.
  Si se hace al revés quedan tres scripts que hacen casi lo mismo y ninguno
  se mantiene.

## Diferido, con razón

Palabra del día, indicadores del país, Shorts, canal de WhatsApp, Ko-fi.
Todo está especificado y ninguno acerca el primer video publicable.
