# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó está el archivo del día.

Última actualización: 28-08-2026.

---

## La puerta de salida: nada se publica hasta resolver esto

Decidido por Santiago el 28-08-2026. Cinco condiciones, todas suyas. Hasta
que estén resueltas no se sube ningún video, aunque el pipeline funcione.

1. **El video no le gusta todavía.** Hay que trabajarlo. Falta el cold open,
   la miniatura, la regla de los 5-7 segundos y los visuales propios.
2. **No hay voz.** Bloqueado por la cuenta de Azure.
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

- [ ] **Cuenta de Azure**: recurso de Speech en capa F0, verificar que la
      región ofrezca voces es-CL, cargar `AZURE_SPEECH_KEY` y
      `AZURE_SPEECH_REGION` como secrets del repo. Sin esto no hay voz, y
      sin voz no hay video publicable ni cortinas de sección.
- [ ] **Reservar el handle** (@entenderchile o variante) en YouTube,
      TikTok e Instagram. No implica publicar.

## Para la sesión de la noche (código y prompts)

- [ ] **Extraer la línea base de "¿Lo cumplió?".** El criterio ya está
      congelado y fechado en `estrategia/seccion-lo-cumplio.md`: umbral de
      tres condiciones, tamaño 30 a 50, estados, y el protocolo de
      extracción paso a paso con el formato de ficha. Falta solo lo que esta
      sesión no puede hacer: **abrir el programa de gobierno**. La política
      de egreso bloquea servel.cl y el resto, y solo llegan fragmentos de
      búsqueda; armar promesas atribuidas a una persona real desde resúmenes
      de terceros es justo el error que esta sección no puede permitirse.
      Pasos: bajar el PDF del Servel y guardarlo en el repo, leerlo entero,
      clasificar en admitidas y excluidas con motivo, elegir entre 30 y 50,
      una ficha por promesa con su bloque de datos, y commit de congelación.

- [ ] **Decidir la arquitectura de estado y categorías.** Propuesta completa
      en `ideas/estado-de-las-noticias.md`. Cuatro decisiones abiertas al
      final de ese documento antes de tocar un solo prompt. Los tres
      arreglos que salen de ahí, en orden de impacto:
      1. **Mudar el tope de 10 del informe al guion.** Hoy el informe
         recorta por la duración del video, y la web no paga duración.
         `prompts/informe.md` y `prompts/guion-informe.md`.
      2. **Crear las secciones que faltan**: Plata pública y Educación no
         existen en el informe, y finanzas ("Mercados y bolsillo") tiene un
         candado que en cinco días no se abrió nunca. Alinear el listado de
         áreas de `prompts/seleccion.md` con las secciones de
         `prompts/informe.md`: hoy son dos listas distintas.
      3. **Que el informe lea "Historias en curso sin novedad hoy"**, que la
         preselección ya produce y nadie consume.

- [ ] **Sacar el barrido del cron de GitHub. Es lo más urgente del pipeline.**
      Investigado hoy: el barrido **nunca** ha estado disponible cuando se
      escribió la edición de su día (26-08 llegó 20 h tarde, 27-08 10 h,
      28-08 11 h). Las 22 fuentes, la deduplicación, la continuidad y el
      criterio de exclusivas no los ha leído ninguna preselección: las cinco
      ediciones corrieron por el camino de respaldo. La hora elegida (06:30
      UTC) es correcta; falla quién aprieta el botón. El mecanismo confiable
      ya existe y está medido: las rutinas de Claude en la nube llegaron a
      las 08:41, 08:42, 08:42 y 08:43 UTC cuatro días seguidos. Cinco
      opciones con sus costos en `bitacora/2026-08-28.md`.

- [ ] **Render por push, no por cron.** (Problema distinto del anterior: el
      push sirve para el render, que ocurre cuando ya existe el guion; no
      sirve para el barrido, que necesita reloj.) El 28 no corrieron ni el barrido ni
      la edición diaria: cero videos ese día. El cron de Actions llegó a
      atrasarse once horas. Lo disparado por `push` funcionó 30 de 30.
      Disparar el render con `push` a `contenido/guiones/informe/**` y
      dejar el cron de respaldo. `.github/workflows/edicion-diaria.yml`.
- [ ] **Dejar rastro del descarte en la preselección.** Hoy 49 titulares
      preseleccionados terminaron en 11 del informe y no hay registro de
      por qué salieron los otros. Sin rastro no se puede auditar ni afinar
      el criterio. `prompts/informe.md`.
- [ ] **Resolver la contradicción de la rúbrica.** 12 de 14 hallazgos de
      las revisiones son el mismo: "el guion omite un dato que sí está en
      el informe", cuatro días seguidos. O el guion debe llevarlos
      (`prompts/guion-informe.md`) o comprimir es su trabajo y la rúbrica
      está mal (`prompts/CALIDAD.md`). No puede seguir en el limbo.
- [ ] **Retomar la bitácora de CALIDAD.md**, cortada desde el 26.
- [ ] **Bajar el informe a diez minutos** o cambiar la promesa. El guion da
      11,9 min contra los 10 que prometen `identidad.md` y `publico.md`.
- [ ] **Poner al día cuatro documentos que ya no dicen la verdad**:
      `estrategia/hoja-de-ruta.md` (sigue pidiendo los secrets de
      ElevenLabs y llamando "EXISTENCIAL" a la voz clonada, decidido al
      revés el 27), `prompts/README.md` ("los cuatro prompts que corre
      generar.js"), `README.md` raíz (generar.js como plan B),
      `contenido/README.md` (no menciona barrido, preseleccion ni casos).
- [ ] **Escuchar los cinco sonidos** (`public/musica/*.wav`, o
      `node scripts/sonido.js --muestra x.wav`) y decidir si sirven. Nadie
      los ha escuchado todavía.
- [ ] **Encender las cortinas** cuando exista la pausa del TTS: pide
      `<break time="1200ms"/>` en cada `##` y que `build-timeline.js` emita
      el evento de sección donde empieza la pausa.

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
