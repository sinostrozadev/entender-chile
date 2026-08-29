# Pendientes

Lista viva. Se actualiza cada día al cerrar. Lo hecho se borra, no se
tacha: para saber qué pasó está el archivo del día.

Última actualización: 28-08-2026, al cerrar la sesión de día.

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

- [ ] **Cuenta de Azure** (BLOQUEADA 29-08: la creación da error, Santiago reintenta el 30): recurso de Speech en capa F0,
      verificar voces es-CL en la región, cargar `AZURE_SPEECH_KEY` y
      `AZURE_SPEECH_REGION` como secrets del repo. El lado del código ya
      está listo (tts-azure.js + pausas de sección + selección de proveedor):
      con los secrets cargados, la siguiente madrugada sale CON VOZ, y la
      primera escucha se puede hacer al tiro en local.
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

- [ ] **Dejar rastro del descarte en la preselección.** Hoy 49 titulares
      preseleccionados terminaron en 11 del informe y no hay registro de
      por qué salieron los otros. Sin rastro no se puede auditar ni afinar
      el criterio. `prompts/informe.md`.
- [ ] **Bajar el informe a diez minutos** o cambiar la promesa. El guion da
      11,9 min contra los 10 que prometen `identidad.md` y `publico.md`.
- [ ] **Poner al día cuatro documentos que ya no dicen la verdad**:
      `estrategia/hoja-de-ruta.md` (sigue pidiendo los secrets de
      ElevenLabs y llamando "EXISTENCIAL" a la voz clonada, decidido al
      revés el 27), `prompts/README.md` ("los cuatro prompts que corre
      generar.js"), `README.md` raíz (generar.js como plan B),
      `contenido/README.md` (no menciona barrido, preseleccion ni casos).
- [ ] **Escuchar los cinco sonidos y aprobarlos o pedir cambios**: quedaron
      en Descargas/sonidos-entender-chile (mp3) junto a un render de muestra
      de 44 s con sello y primera cortina en contexto. Las cortinas YA están
      encendidas en el pipeline (video mudo no tapa voz; con voz, esperan
      las pausas de tts-azure, que ya existe).

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
