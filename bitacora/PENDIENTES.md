# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó está el archivo del día.

Última actualización: 29-08-2026, sesión de la noche (ejecutó la lista de la sesión de día).

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

- [ ] **VISUAL 1: el esquema. Barato, hoy mismo, cero código.**
      `TarjetaEsquema` está construida y funcionando, y el prompt ya la
      ofrece (`prompts/guion-informe.md` línea 124:
      `[ESQUEMA | título] elemento -> elemento -> elemento`). El informe del
      01-09 la usó **cero veces**, igual que `cita`, `comparacion`,
      `marcador` y `tabla`.
      No falta motor, falta que el guion la pida. Agregar a
      `prompts/guion-informe.md` una regla de variedad obligatoria, del tipo:
      nunca más de dos `[DATO cifra]` seguidas, y al menos un `[ESQUEMA]` por
      edición cuando el día tenga una noticia de proceso (trámite
      legislativo, etapa judicial, quién decide qué y en qué orden), que es
      casi todos los días.
      Por qué este primero: `ideas/formato-video.md` lo tiene identificado
      como la ventaja del formato sobre un conductor con cámara ("un esquema
      animado es superior a una persona explicándolo con las manos"). Es lo
      más barato con más efecto de toda la lista visual.
      Riesgo a vigilar: que el modelo empiece a meter esquemas forzados. La
      regla debe ser condicional ("cuando la noticia sea un proceso"), no una
      cuota fija.

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

- [ ] **ARREGLO 3: `vistasTotales` no cuadra con la suma de los videos.**
      En `bitacora/metricas/2026-09-01.md` la cabecera dice **135 vistas
      totales** y la tabla suma **372**. Mismo archivo, misma corrida de
      `scripts/metricas.js`.
      **Ya se descartaron dos falsas alarmas, no perder tiempo en ellas:**
      - "10 videos" contra 14 en la tabla: correcto. Son 14 subidos y 10
        públicos. Falta una palabra en la etiqueta, nada más.
      - `vistasLargos: 49` y `vistasShorts: 322` del JSON: **ambos están
        bien**. Sumando solo los públicos y clasificando bien (el Short
        "Clave: ¿Por qué el mercado de capitales...?" es Short, aunque el
        título salga cortado a 60 caracteres y se pierda el #), da
        exactamente 322 + 49 = 371 públicas, más 1 vista de un video en
        privado = 372.
      **El único campo malo es `vistasTotales`.** Marca 135 y debería marcar
      371. No es 49 (solo largos) ni 371 ni 372: no corresponde a ningún
      subconjunto obvio, así que hay que ir a leer de dónde sale. Hipótesis a
      comprobar en el código, no a suponer: que venga de
      `channels.list(statistics).viewCount`, que en canales con Shorts
      arrastra inconsistencias conocidas, mientras la tabla suma
      `videos.list(statistics).viewCount` video por video.
      **Por qué importa y no es cosmético:** el JSON de la serie guarda
      `vistasTotales`, y de ahí salen los gráficos del panel. Si ese es el
      número flojo, la curva de la meta está mal dibujada desde el día uno.
      Arreglo probable: usar la suma por video como `vistasTotales`, y si se
      quiere conservar el dato del canal, guardarlo aparte con otro nombre.
      Mientras tanto el panel usa la suma por video y deja el descuadre
      anotado a la vista.

- [ ] **ARREGLO 0, lo primero: el guardián nunca ha comprobado nada. La rutina
      no tiene el repositorio montado.** Hallazgo del 01-09 (tarde), a partir
      del aviso que llegó al teléfono a las 06:14: *"El guardián de Entender
      Chile no pudo ejecutarse hoy: sin acceso al repositorio."*
      Comparando las cinco rutinas con `list_triggers`, la diferencia es
      exacta y única: barrido, observatorio, revisión y métricas traen
      `session_context.sources = [{git_repository: .../entender-chile}]`; el
      guardián `trig_01TNcYi1Pe46NtnL7eXN6YAx` **no trae `sources` en
      absoluto** (tampoco `model`). Cada mañana despierta en una carpeta
      vacía, no encuentra el repo y avisa que no pudo. Las otras cuatro se
      crearon `via http_api`; el guardián `via meta_mcp`, que no permite
      declarar fuentes.
      Lo que SÍ está bien y no hay que tocar: la hora (cron `0 10 * * *`,
      dispara 10:07-10:12 UTC = 06:07 Chile) y el canal de aviso
      (`notifications: {push:true}`), que funciona: esa notificación es la
      prueba de que la alerta de emergencia llega al teléfono.
      **Arreglo: recrearlo con el repo como fuente.** No se puede parchar:
      `update_trigger` solo cambia nombre, cron, enabled, modelo y prompt, no
      las fuentes. Hay que borrarlo y crearlo de nuevo por la misma vía que
      los otros cuatro, conservando el prompt tal cual (está bien escrito) y
      `push:true`. Aprovechar de fijarle modelo (los otros lo declaran; este
      no) y de sumarle los clientes del ARREGLO 2b.
      **Consecuencia para leer el historial:** ninguna de las mañanas desde
      el 29-08 tuvo guardián de verdad. Los días que la edición salió bien no
      fue porque el guardián lo confirmara.

- [ ] **ARREGLO 2b: unificar el patrón de commit en los tres workflows.**
      Pedido de Santiago el 01-09. Hoy solo `metricas.yml` tiene el patrón
      completo; `barrido.yml` y `edicion-diaria.yml` arrastran el mismo
      riesgo latente que se comió dos mediciones. El patrón a dejar igual en
      los tres:

          git add <TODO lo que el script realmente escribe, no solo su carpeta>
          git diff --cached --quiet || {
            git commit -m "..."
            git -c rebase.autoStash=true pull --rebase origin main
            git push || { git -c rebase.autoStash=true pull --rebase origin main; git push; }
          }

      Cuatro diferencias con lo que hay hoy, y por qué cada una:
      1. **`autoStash`**: guarda solo lo que quedó sin preparar, rebasea, y lo
         devuelve. Es lo único que habría evitado el `cannot pull with rebase:
         You have unstaged changes` de hoy. Barato y sin efectos: si no hay
         nada suelto, no hace nada.
      2. **`origin main` explícito**: sin eso, `git pull --rebase` a secas
         depende del upstream configurado del checkout, que en un runner es
         una suposición. Los cinco prompts de las rutinas ya lo nombran; los
         workflows no.
      3. **Reintento**: `barrido.yml` y el paso 2 de `edicion-diaria.yml` no
         tienen ninguno. Corregir de paso la afirmación imprecisa que quedó
         en el commit de hoy: el reintento vive en los *prompts de las
         rutinas*, no en los workflows.
      4. **Auditar qué escribe cada script fuera de su carpeta**, que es la
         causa raíz. Revisar con `grep -n "writeFileSync\|appendFileSync"` en
         `scripts/barrido.js`, `scripts/dia.js`, `scripts/casos.js`,
         `scripts/short.js`, `scripts/podcast-subir.js`. El paso 2 de la
         edición hace `git add contenido/` y `casos.js` escribe dentro de
         `contenido/casos/`, así que hoy zafa; el día que un script toque
         `bitacora/`, `public/` o `out/` fuera de esa raíz, se repite el
         mismo fallo silencioso.
      Y la regla de fondo, que vale más que los tres arreglos: **un paso de
      commit no puede fallar en silencio**. Cuando falla, la pieza del día se
      pierde y nadie se entera hasta que alguien mira. Por eso el ARREGLO 0
      va primero.

- [ ] **REVISAR EL ARREGLO 1, que ya se aplicó de día (01-09, a pedido de
      Santiago, levantando la regla de solo lectura para este caso).** Lo que
      se cambió en el paso Commit de `.github/workflows/metricas.yml`:
      `git add` ahora incluye `bitacora/panel-interno.html`, el `pull` lleva
      `-c rebase.autoStash=true` y nombra `origin main`, y se agregó un
      reintento. Revisar con calma que el patrón es el que se quiere para
      todo el proyecto: **los demás workflows (barrido, edición) tienen el
      mismo riesgo latente** si algún día su script toca algo fuera de la
      carpeta que preparan, y ninguno tiene reintento ni autoStash. Vale la
      pena decidir si se unifica el patrón en los tres.

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

- [ ] **ARREGLO 2: el guardián no mira las métricas.** El paso falló a las
      12:58 y nadie se enteró: los números se bajaron de YouTube y nunca
      llegaron al repo. Sumar a `trig_01TNcYi1Pe46NtnL7eXN6YAx` (guardián de
      las 10:00 UTC) la comprobación de que existe
      `bitacora/metricas/FECHA.md` del día, y contarlo como alerta si falta.
      Ojo con el orden: hoy el despertador de métricas corre 12:57 UTC y el
      guardián a las 10:00, así que el guardián pasaría antes. O se adelanta
      el despertador, o el guardián se atrasa, o la comprobación mira el día
      anterior.

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
