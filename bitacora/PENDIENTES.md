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
      **Para el reintento del 30**, en orden de probabilidad. El error fue
      "No es apto para una suscripción de Azure", tanto en la prueba gratuita
      como en pago por uso, con `santiagoinostroza@outlook.com`:
      1. **Otra tarjeta.** Es la causa más frecuente: prepago y virtuales
         están excluidas, y las de débito chilenas fallan seguido. Crédito
         Visa o Mastercard.
      2. **Coherencia**: país de la cuenta, dirección y país de emisión de la
         tarjeta tienen que coincidir; teléfono en formato internacional.
      3. **Mirar si ya existe algo** en portal.azure.com, sección
         Suscripciones. Puede que no haya que crear nada.
      4. **Cuenta Microsoft nueva y limpia.**
      5. **Soporte de Azure**, que atiende registro sin suscripción. Pide el
         SessionID que muestra la propia página del error; el del intento del
         29-08 fue `88472e46-1015-40d9-9414-3e410a554f31`, 04:49:29 UTC.
      Dos recordatorios que ahorran tiempo: **no hace falta la prueba
      gratuita ni sus USD 200** (F0 es gratis sobre cualquier suscripción,
      incluida la de pago por uso), y con pago por uso conviene crear un
      **presupuesto con alerta en USD 1**, porque la tarjeta queda registrada.
      Si Azure se cierra del todo, es decisión de fondo: es el único
      proveedor con voces de español de Chile. Cambiar no es reemplazar, es
      renunciar al acento.
- [ ] **Reservar el handle** (@entenderchile o variante) en YouTube,
      TikTok e Instagram. No implica publicar.

## Para la sesión de la noche (código y prompts)

- [ ] **Dos bloques nuevos en `prompts/contrato-archivos.md`**, redactados por
      Santiago el 29-08 a partir de los dos fallos del día. Van al final del
      archivo, después de REGLAS DE COMMIT. Texto listo para pegar:

```
ESCRITURA VERIFICADA (obligatorio en toda tarea que escriba en el repo):
- Escribe el archivo. Si la escritura falla, NO des por perdida la ejecución:
  consulta de inmediato si el archivo quedó creado igual, porque un error de
  respuesta no significa que la escritura no ocurrió.
- Si no existe y el error parece transitorio, reintenta hasta 3 veces.
- Después de escribir, vuelve a LEER el archivo desde main y verifica dos
  cosas: que la ruta es la que manda este contrato y que el contenido está
  completo. Una escritura no está hecha hasta que se leyó de vuelta.
- Si aparece un conflicto porque el archivo fue creado entre intentos, lee su
  SHA y actualízalo, pero SOLO si corresponde a la fecha de hoy. Nunca pises
  un archivo de otra fecha.
- Los errores permanentes (permisos, autorización, ruta inválida) NO entran en
  bucle: se reportan al final de la ejecución, nombrando el archivo que no se
  pudo escribir y el error exacto que devolvió GitHub.
- Al terminar, di explícitamente qué archivos quedaron escritos y verificados.
  Si alguno falta, dilo en la primera línea de tu respuesta, no al final.

VERIFICAR ANTES DE AFIRMAR:
Cuando vayas a afirmar algo sobre un archivo del repo (que falta, que no
contiene tal línea, que está vacío, que no se pudo leer), ábrelo y
compruébalo en esa misma ejecución antes de decirlo. Nunca deduzcas el estado
de un archivo a partir de lo que recuerdes, de una lectura anterior o de lo
que parezca razonable.

Esto vale sobre todo cuando la conclusión te lleva a OMITIR algo: si crees que
un elemento obligatorio no está en la fuente, vuelve a leer la fuente antes de
dejarlo fuera. Omitir por una premisa falsa es peor que preguntar, porque no
deja rastro y se descubre días después.

Si después de comprobarlo el dato efectivamente no está, entonces sí: no lo
inventes, sigue adelante y dilo, nombrando el archivo y la línea que buscaste.
```

      El primero responde al bloqueo de escritura de las 08:00, que resultó
      puntual: al reintentar a las 13:04 funcionó. El segundo responde a que
      ChatGPT afirmó que el informe no traía "Para salir hoy" cuando sí la
      traía desde las 07:30, y por esa premisa falsa omitió el cierre.

- [ ] **El aviso que falta cuando una pieza no llega.** Hoy el guion del
      informe no se escribió (bloqueo puntual de GitHub, resuelto al
      reintentar a las 13:04). La **detección funcionó**: la revisión dejó
      constancia y el gate frenó el render en 26 segundos. El **aviso no**:
      ChatGPT lo dijo solo en su propio chat y nadie se enteró hasta la
      auditoría, cuatro horas después. Falta que la ausencia de una pieza
      deje rastro visible en el repo o llegue a alguna parte.

- [ ] **El guion de hoy perdió el cierre "Para salir hoy".** ChatGPT afirmó
      que el informe no traía esa línea; sí la trae, en la 157, desde el
      commit original de las 07:30. Actuó sobre esa premisa falsa y cerró sin
      la recomendación. Es regresión de una función de un día. Ver si la
      regla nueva de `prompts/CALIDAD.md` lo detecta como elemento
      obligatorio ausente al volver a correr la revisión.

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
