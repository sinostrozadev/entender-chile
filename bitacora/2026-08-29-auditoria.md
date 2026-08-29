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

### CORRECCIÓN (08:55): la hipótesis del horario era falsa

Santiago mostró la conversación de ChatGPT. **La tarea sí corrió y sí generó
el guion.** Lo que falló fue la escritura:

> El guion del 29 de agosto fue generado siguiendo el prompt actual y el
> informe de hoy, pero no pude completar la persistencia obligatoria en
> GitHub: la escritura de contenido/guiones/informe/2026-08-29.md fue
> bloqueada por el sistema al intentar crear el archivo.

ChatGPT no conserva el mensaje técnico exacto y, correctamente, no quiso
inventar la causa.

Lo que el repo permite descartar:

- **No es un problema de acceso.** El guion de la Clave se escribió sin
  problema quince minutos después, a las 08:17.
- **No es una carrera de escrituras.** Entre las 07:48:13 y las 08:17:05 no
  hubo ni un solo commit en el repo: la tarea del guion corrió en un repo
  quieto.
- **No es el cambio de prompt.** `prompts/guion-informe.md` cambió a las
  04:49 UTC, tres horas antes, pero es una sola línea sobre acreditar
  fuentes: no toca la persistencia ni el tamaño.

Al reintentar a las 13:04 funcionó (`d1e7c53`), así que el bloqueo fue
puntual. Queda sin causa identificada.

### Y en el reintento apareció algo peor que el bloqueo

ChatGPT avisó: *"el prompt exige integrar Para salir hoy en el cierre, pero
el informe de hoy no contiene esa línea. No la inventé."*

**Es falso.** El informe de hoy trae esa línea en la 157, y la trae desde su
commit original de las 07:30 (`d64f689`), que nunca se modificó:

> Para salir hoy: abrigo liviano por la mañana y capas que puedas retirar
> durante la tarde en Santiago (Dirección Meteorológica de Chile, 29 ago).

Y sobre esa creencia equivocada actuó: **el guion de hoy cierra sin la
recomendación.** El del 28 sí la traía ("si sales hoy en Santiago, lleva
paraguas y una capa impermeable liviana"). El de hoy no.

Es una regresión sobre una función de un día: la integración del cierre entró
el 28 y hoy se perdió, no porque falte el dato, sino porque el modelo leyó mal
su fuente y dedujo que faltaba.

### Segunda corrección (09:30): por qué los dos teníamos razón

ChatGPT insistió en que la línea no está. Al mirar la estructura del archivo
se entiende todo:

    línea 122   <!-- interno
    línea 155   -->
    línea 157   Para salir hoy: abrigo liviano por la mañana...

El informe tiene 156 líneas. **La recomendación de cierre es la última línea
del archivo**, después de un bloque interno de 33 líneas. Es pública y está
ahí, así que mi verificación era correcta. Y la lectura de ChatGPT quedó
truncada antes de llegar al final, así que su fragmento tampoco mentía.

Él mismo lo reconoció con precisión: *"no debía afirmar su ausencia
basándome en un fragmento truncado. Esa parte sí fue un error
metodológico."*

**Su regla propuesta es mejor que la mía y hay que adoptarla tal cual**: una
ausencia también es un hecho y debe verificarse. Si una ejecución va a decir
"no existe X" o "el archivo no contiene X", tiene que buscar explícitamente o
leer la sección completa antes de afirmarlo, y **si la lectura quedó
truncada, no puede inferir ausencia**.

### Y el hallazgo que estaba debajo

El problema de fondo no es de método, es de orden: **el único elemento
obligatorio del cierre está en la posición más frágil del archivo**, la
última línea, detrás de treinta y tres líneas de notas internas que el lector
nunca ve.

Cualquier truncamiento se lo come primero, todos los días. Y hoy pasó.

El arreglo es de una línea de prompt: que el bloque `<!-- interno -->` vaya
**después** de "Para salir hoy", al final absoluto. Lo que hay que narrar deja
de ser lo primero que se pierde, y lo que nadie lee pasa a ser lo sacrificable.

Esto le da a la revisión de hoy su primera prueba real: con la regla nueva de
esta madrugada, "elemento obligatorio ausente" es hallazgo. Si se vuelve a
correr, debería detectarlo.

**Y hay algo estructural que sí se puede arreglar**: el fallo fue mudo para
el pipeline. ChatGPT lo dijo en su propio chat, donde nadie mira a las cuatro
de la mañana, y en el repo no quedó rastro. La revisión sí lo detectó y dejó
constancia, y el gate frenó el render, así que la **detección funcionó**. Lo
que falta es el **aviso**: nadie se enteró hasta la auditoría, cuatro horas
después.

La cadena de consecuencias quedó toda a la vista, y eso es buena señal:

1. Sin guion, la revisión **no emite veredicto**. Lo dice explícitamente:
   *"no se emite VEREDICTO en esta revisión"*.
2. Sin veredicto, el gate del render falla. Falló en 26 segundos.
3. Sin render, **no hay video hoy**: no existe
   `contenido/descripciones/2026-08-29-*`.

Hay que decirlo claro: **el gate hizo exactamente lo que debía**. No dejó
renderizar una edición incompleta. Lo que falló está aguas arriba.

## Lo que sigue igual

**El canal de YouTube ya existe** (Santiago, 29-08). Es el primer movimiento
real hacia el objetivo en seis días: hasta ayer el punto más barato de la
hoja de ruta llevaba cinco días sin ejecutarse.

Falta el dato en el repo: `web/canal.json` sigue con YouTube vacío y
`contenido/videos/` sin crear. Cero videos publicados, cero horas vistas.

Ojo con llenar `canal.json` de inmediato: al hacerlo aparece el botón
"Suscríbete" en la cabecera de la web, apuntando a un canal todavía sin
videos. Es una decisión, no un trámite.

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

1. **Reintentar la escritura del guion desde ChatGPT** y capturar el error
   exacto si vuelve a fallar. Recuperar el video de hoy son dos pasos, no
   uno: que el guion llegue al repo, y que algo vuelva a correr la revisión,
   porque la de las 08:41 ya se ejecutó sin veredicto y el render se dispara
   con su llegada.
2. **Reintentar Azure**, empezando por otra tarjeta.
3. Los tres documentos con deriva, que llevan dos auditorías seguidas
   apareciendo.
