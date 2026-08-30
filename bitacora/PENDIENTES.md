# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó está el archivo del día.

Última actualización: 29-08-2026, sesión de la noche (ejecutó la lista de la sesión de día).

---

## La puerta de salida: nada se publica hasta resolver esto

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
- [ ] **YouTube, lado de Santiago** (guía paso a paso en `docs/youtube.md`):
      personalizar el canal (avatar y banner en Descargas/entender-chile-marca,
      descripción de identidad.md, teléfono verificado), crear el proyecto de
      Google Cloud + cliente OAuth, correr `node scripts/youtube-auth.js` y
      cargar los tres secrets YT_*. Con eso el workflow sube cada edición en
      privado. Después: pedir la auditoría de la API para poder programar
      publicaciones.
- [ ] **Short diario** (idea de Santiago, propuesta en `ideas/shorts-diarios.md`):
      5 tesis del guion en vertical, 45-55 s, voz + música de la Biblioteca
      de audio de YouTube. Se arma solo desde parsed.json; faltan 3
      decisiones de Santiago (voz o solo música, pistas, hora de publicación).
- [ ] **Miniatura automática por edición**: `dia.js` renderiza
      `out/FECHA/miniatura.png` con `src/marca.tsx` (cifra = primer [DATO] del
      guion, titular = "Título sugerido"), la sube al release y
      `youtube-subir.js` ya la toma si existe.
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
