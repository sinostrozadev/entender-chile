# Auditoría del día 6: cuatro cosas se arreglaron y apareció una falla nueva

Fecha: 29-08-2026, 08:44 de Chile. Comparación contra
`bitacora/2026-08-28-auditoria.md`.

Es la primera auditoría de la serie que puede comparar, y el resultado es
bueno: de los seis problemas que traía ayer, cuatro están cerrados con
evidencia. Pero hoy no hay video, por una causa nueva.

## Lo que mejoró

### 1. El barrido llegó a tiempo. Por primera vez.

| | Hora (UTC) |
|---|---|
| Barrido | **04:17** |
| Preselección | 07:11 |

Dos horas y cincuenta y cuatro minutos de margen. Ayer el barrido de su día
llegaba once horas tarde, y llevaba cinco días seguidos sin servir para nada.

La prueba que pedí ayer era una frase, y está escrita. Las "Notas del
barrido" de la preselección de hoy dicen:

> El archivo automático de hoy estuvo disponible: reunió 120 noticias con
> señal de 850 únicas en 22 fuentes.

Ayer, en el mismo lugar, decía que el archivo no existía y que se había
hecho un barrido manual. **Las 22 fuentes, la deduplicación y el criterio de
exclusivas alimentaron una edición por primera vez.**

### 2. El descarte dejó rastro, y el embudo ya es auditable

45 preseleccionadas, 10 titulares en el informe, y por primera vez **28
descartes con su motivo**, en vocabulario cerrado:

| Motivo | Veces |
|---|---|
| menor | 8 |
| sin segunda fuente | 6 |
| espacio | 5 |
| continúa sin novedad | 5 |
| duplicada | 4 |

El primer día de datos ya dice algo. **"Sin segunda fuente" es el segundo
motivo más frecuente**, y eso es exactamente el sesgo que diagnostiqué ayer
en `ideas/estado-de-las-noticias.md`: el sistema premia lo fácil de verificar
por sobre lo importante. Ahora se puede medir en vez de discutirlo.

Conviene mirar caso a caso algunos: "Alza histórica de sífilis" salió por
espacio y "Vientos de hasta 120 km/h en cuatro regiones" por duplicada.

### 3. La bitácora de calidad se retomó

`prompts/CALIDAD.md` estaba cortada desde el 26. Ahora tiene entradas del 27
y del 28. El ciclo volvió a registrar.

### 4. El render por push respondió

Se disparó a las 08:41:26, en el mismo minuto en que llegó la revisión. El
timbre nuevo funciona: ya no depende del cron.

## Lo que falló hoy, y es nuevo

**No se generó el guion del informe.** Es la primera falla de una tarea de
ChatGPT desde que se mide: pasa de trece de trece a **catorce de quince**.

Lo llamativo es que las otras tareas del día sí entregaron, incluido el guion
de la Clave a las 08:17. Falló una sola.

**Hipótesis con nombre**: ayer Santiago movió esa tarea de las 04:15 a las
04:00, y la primera ejecución después del cambio no entregó. Lo primero es
abrir la tarea y confirmar que quedó guardada y activa.

La cadena de consecuencias quedó toda a la vista, y eso es buena señal:

1. Sin guion, la revisión **no emite veredicto**. Lo dice explícitamente:
   *"no se emite VEREDICTO en esta revisión"*.
2. Sin veredicto, el gate del render falla. Falló en 26 segundos.
3. Sin render, **no hay video hoy**: no existe
   `contenido/descripciones/2026-08-29-*`.

Hay que decirlo claro: **el gate hizo exactamente lo que debía**. No dejó
renderizar una edición incompleta. Lo que falló está aguas arriba.

## Lo que sigue igual

**El canal no existe.** `web/canal.json` con YouTube vacío,
`contenido/videos/` sin crear. Cero videos publicados, cero suscriptores,
cero horas vistas. Sin cambio desde ayer.

**Azure bloqueado.** Ni prueba gratuita ni pago por uso. Reintento el 30. El
lado del código ya está listo (`tts-azure.js` con pausas de sección y
selección de proveedor), así que en cuanto existan los secrets la madrugada
siguiente sale con voz.

**El video dura más de lo prometido.** Hoy no hay guion que medir. Los dos
últimos dieron 11,4 y 11,9 minutos contra los diez que prometen
`identidad.md` y `publico.md`.

**Tres documentos siguen sin decir la verdad**: `README.md`,
`prompts/README.md` y `estrategia/hoja-de-ruta.md`. Este último sigue
pidiendo `ELEVENLABS_API_KEY` y llamando "EXISTENCIAL" a la voz clonada,
cuando el 27 se decidió lo contrario (línea 28).

## El objetivo

Quedan **156 días** hasta el 1-feb-2027. El contador de horas vistas sigue en
cero, y va a seguir mientras no exista un canal.

La diferencia con ayer es real pero es interna: **el pipeline mejoró, la
distancia al objetivo no se movió**. Eso es consistente con la decisión de
Santiago del 28 de no publicar hasta cerrar sus cinco condiciones, y de esas
cinco hoy avanzó una sola, la del criterio de selección, gracias al rastro
del descarte.

## Lo que hay que hacer hoy

1. **Revisar la tarea del guion del informe** en ChatGPT: que esté activa y
   guardada a las 04:00. Es la causa de que hoy no haya video.
2. **Reintentar Azure**, empezando por otra tarjeta.
3. Los tres documentos con deriva, que llevan dos auditorías seguidas
   apareciendo.
