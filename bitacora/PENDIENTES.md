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
