# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó están `REALIZADOS.md` y el archivo del día.

Última actualización: 02-09-2026, sesión de la noche (limpieza ORDEN 1:
fuera lo hecho y lo resuelto sin marcar; la sección histórica "La puerta"
vive en decisiones.md, entradas del 28-08 y 30-08).

---

## URGENTE — con plazo

- [ ] **Responder a Google la revisión de la API (plazo: 7 días hábiles
      desde el 01-09 ≈ 10-09).** Pidieron *"the script / screencast of how
      you are uploading videos along with the end-results"*. TODO listo en
      `docs/auditoria-api/respuesta-revision-2026-09-02.md`: borrador del
      correo en inglés para pegar (Reply EN EL MISMO HILO desde
      entenderchile@gmail.com), checklist de 3 capturas y el screencast
      opcional de 60-90 s. Al script se le pega el fuente completo de
      `scripts/youtube-subir.js`. Al aprobarse la auditoría: cargar
      `YT_PUBLICAR_HORA` y pasar a hora de publicación POR PIEZA (el paso 7
      hoy usa una sola para las cuatro; sugerido informe 07:00, Short 12:00,
      Clave 14:00, Short de la Clave 18:00, como variables del repo).

## EL AGENTE DE ÚLTIMA HORA — conversarlo (Santiago lo pidió el 02-09)

Origen: el Imacec del 01-09 salió a las 08:30 con mejor historia que la
anunciada y nadie lo capturó en el día.

**La preferencia de Santiago (textual):** un agente **cada 2 o 3 horas**
consultando, y si encuentra algo con categoría de **"muy importante"** (sea
lo que sea, no solo datos anunciados), tener la noticia fresca y **"lanzarla
de una"**.

**Lo que la noche había propuesto (registrado, no decidido):** solo vigilar
lo ANUNCIADO (marcas PENDIENTE DE CIERRE + Agenda) una vez al día a las
09:20; el prompt está en `prompts/vigia.md` y sirve tal cual como pieza del
agente mayor. El argumento en contra del barrido frecuente era costo, ruido
y controles; Santiago lo leyó y aun así prefiere cada 2-3 horas: esa
preferencia manda la conversación.

**Las cinco decisiones para que la conversación sea corta:**
1. **El criterio de "muy importante"**: mecánico y auditable (como el árbol
   de tarjetas). Candidato: palabras de ALARMA del barrido + dato macro
   publicado + declaración oficial de emergencia + "está en 3+ portadas".
2. **Qué significa "lanzarla de una" HOY**: sin auditoría aprobada toda
   subida llega PRIVADA y el clic es de Santiago; y sin el workflow "Short
   exprés" el agente solo puede avisar con el material listo. El agente y el
   Short exprés son UN proyecto.
3. **Frecuencia y ventana**: cada 2 h entre 08:00 y 22:00 son 8 corridas al
   día. ¿Barrido liviano (portadas + fuentes primarias) o completo? Costo en
   tareas y en Actions si cada corrida puede disparar render.
4. **Controles**: la versión exprés de la verificación (solo fuentes
   primarias u oficiales) y el gate humano del clic se mantienen.
5. **División**: detección y guion (¿GPT o rutina Claude?); render y subida
   = workflow, eso está claro.

- [ ] **Sistema — "Short exprés"**: workflow que convierta
      `contenido/urgente/*.md` en un Short con voz en ~10 minutos (subida
      privada; Santiago publica). Pieza NECESARIA del agente de última hora.

---

## Dependen de Santiago

- [ ] **Publicar desde Studio la Clave y el Short de la Clave del 02-09**
      (`qzn2RJefxic`, `JpWGFsV-mMc`) **y borrar los cuatro videos viejos**
      de la corrida con el texto desbordado: los dos de la mañana del
      informe, más `8X_lOUPmLbE` y `814rdrOmAz0`.
- [ ] **Programar el vigía en ChatGPT a las 09:20** apuntando a
      `prompts/vigia.md`, como las otras tareas. (O se absorbe en la
      conversación del agente de última hora: es la misma familia.)
- [ ] **Auditoría matinal de las 09:30** (`prompts/auditoria-matinal.md`):
      antes de programarla hay que cerrar la **disputa 7** de
      REGLAS-DURAS (la skill de la sesión de día y esta tarea escribirían
      LAS DOS `bitacora/FECHA-auditoria.md`). Nota de la noche: la rutina
      la puedo crear yo por API con el repo montado (igual que el guardián);
      lo que falta es la decisión de quién escribe ese archivo, no la
      técnica.
- [ ] **Las diez disputas de `REGLAS-DURAS.md`** (sección final): cada una
      es una línea en decisiones.md y se borra la versión perdedora. Las
      dos más pesadas: imágenes generadas (la 1, ya descrita en la decisión
      de hecho del 30-08) y voz clonada (la 2).
- [ ] **Ver el video de ejemplo de IMAGEN 0** (`node
      ejemplos/demo-cambios-02-09.js`): fondos por sección, apertura en
      frío y fuentes locales están construidos y APAGADOS por bandera;
      sin tu visto bueno no se encienden en producción.
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
- [ ] **IMAGEN 1: fondos por sección, empezando por la cortina**
      (`CortinaSeccion`, `src/tarjetas.tsx:492`): es el fotograma que
      YouTube toma para CADA capítulo. Debe nacer opaca (hoy entra en
      fundido de 0,14 s y en el fotograma exacto es transparente) o los
      capítulos correrse medio segundo en `chapters.js`. Cuatro familias
      procedurales + papel tintado 2-4% + azar sembrado con fecha+sección;
      nada sobre 0,10 de opacidad. La construcción base ya existe en
      `src/fondos.tsx` (IMAGEN 0, bajo bandera `meta.fondos`).
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
      10:00 → 09:00, reloj métricas 12:45 → 11:45) y los crons de GitHub
      (barrido 05:50 → 04:50, edición 09:00 → 08:00, métricas 15:00 →
      14:00). Las tareas de ChatGPT van en hora de Chile y no cambian.
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
