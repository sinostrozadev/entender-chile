# Retención: qué tenemos escrito, qué falta y qué haría yo

Abierto el 01-09-2026 a pedido de Santiago. Este archivo junta lo que ya
está decidido y disperso en el repo, agrega lo que falta, y deja las
preguntas que tiene que responder él.

## 0. La verdad que hay que decir primero: no medimos retención

Ninguna de las cifras que usamos hoy es retención real.

`horasEst` del panel se calcula como **vistas de largos x duración x 40% de
retención supuesta**. Ese 40% es un número que pusimos nosotros, no un dato
de YouTube. O sea que las "4,26 horas" acumuladas no son una medición: son
una suposición multiplicada. Podrían ser 2 o podrían ser 7.

Sin el scope `yt-analytics.readonly` no sabemos: el porcentaje de retención,
la curva (dónde exactamente se van), la duración media vista, ni el
swipe-away de los Shorts. Está anotado como métricas fase 2 y pide
reautorizar, cinco minutos juntos.

**Todo lo que sigue son hipótesis razonadas, no conclusiones.** Y la primera
recomendación es esa: medir antes de rediseñar, porque si no vamos a estar
arreglando el minuto equivocado.

## 1. Lo que el video de hoy dice de sí mismo

Esto sí se puede leer sin Analytics, y ya dice bastante. Capítulos reales
del informe del 01-09:

| Tramo | Duración | Qué es |
|---|---|---|
| 00:00 a 00:32 | 32 s | Apertura |
| 00:32 a 09:29 | 8 min 57 | **once noticias**, la más larga 1 min 44 |
| 09:29 a 09:50 | 21 s | Dato curioso |
| 09:50 a 10:14 | 24 s | Agenda |
| 10:14 a 13:10 | **2 min 56** | En titulares |
| 13:10 al final | | Cierre |

Tres cosas saltan solas:

**a. Las primeras palabras son la fecha.** El guion abre con "Es martes
primero de septiembre de dos mil veintiséis". Los primeros ocho segundos,
que son los más caros del video, se gastan en algo que el espectador ya
sabe. Y no es culpa del guionista: el prompt lo pide así ("entrada oral que
sitúe la fecha y adelante 2 a 4 asuntos", `prompts/guion-informe.md` línea
76). El cold open que está pendiente desde el 25-08 arregla exactamente
esto.

**b. Once noticias de 49 segundos promedio, ninguna sobre 1 min 44.** Es una
lista de iguales. El problema de una lista de iguales es que no da ninguna
razón para quedarse pasada la noticia por la que entraste: no hay una
historia que se esté desarrollando, hay once que empiezan y terminan. El
formato que la investigación del 25-08 recomendó (una historia grande de
unos 4 minutos + breves) nunca se aplicó.

**c. El 22% del video es una lista de titulares al final.** Casi tres
minutos, después del dato curioso y la agenda, o sea después de dos señales
de cierre. Sin Analytics no puedo probar que ahí se caen, pero es el lugar
donde yo miraría primero.

## 2. Lo que ya está escrito y decidido (y no se ha hecho)

Nada de esto es idea nueva: está en el repo, algunas desde el 25-08.

**Decididas y sin construir, en orden de cuánto pesan:**

1. **Cold open**: el dato más fuerte del día 3 a 5 segundos ANTES del sello.
   `ideas/IMPLEMENTAR.md` lo tiene como número 1 de la semana desde el
   25-08; `estrategia/plan-produccion.md` lo repite; `ideas/formato-video.md`
   dice textualmente que sin cara deja de ser mejora y pasa a ser requisito.
2. **Regla de los 5 a 7 segundos**: count-up en las cifras, subrayados que se
   dibujan, entradas con delay, ninguna tarjeta muerta más de 6 segundos.
3. **Estructura tipo TLDR**: una historia grande + tres breves, en vez de
   once iguales.
4. **"¿En qué quedó?" como sección diaria fija de 60 segundos**. En
   `ideas/formato-video.md` está calificada como "la joya": es lo único que
   un canal con cara no puede sostener, porque exige un archivo que se
   mantenga solo. Sigue sin decidirse si entra diaria o solo cuando hay hito.
5. **"Esto en tu bolsillo"** como tarjeta recurrente, misma posición todos
   los días.
6. **Duración honesta**: si el día da para siete minutos, dura siete, y se
   anuncia al inicio.
7. **Pregunta del día al cierre + comentario fijado + responder los primeros
   10 a 15 comentarios.**
8. **Cambio de cama musical a mitad del video** (minuto 4 a 5) y sello sonoro
   al cierre.
9. **Cero opinión dicho en voz alta** en la apertura, como promesa y filtro.

**Ya hechas y que trabajan a favor de la retención:**

- Las cortinas de sección con melodía y transición (30-08). Son marcadores de
  capítulo: le dicen al oído que algo cambió.
- Los capítulos en la descripción, con marca de tiempo por noticia. Ya salen
  en cada video y son la herramienta más subestimada que tenemos: dejan que
  alguien salte a lo suyo en vez de irse.
- El mini gancho del dato curioso (25-08).

## 3. Lo que haría yo, en este orden

**Primero, y es una decisión de negocio, no de edición: el puente del Short
al informe.**

Los datos del 01-09: los Shorts se llevan 322 de las 371 vistas públicas, el
87%. El largo más visto tiene 26. Y las vistas de Shorts **no cuentan** para
las 4.000 horas del Programa de Partners.

O sea: tenemos tráfico donde no sirve para la meta, y no tenemos tráfico
donde sí. Convertir el 10% de las vistas de Shorts en vistas del informe
vale más que cualquier mejora de edición sobre un video que ven 26 personas.
Formas concretas, todas baratas:

- El Short termina apuntando al informe del día, no a la nada.
- Comentario fijado en cada Short con el enlace al informe completo.
- Pantalla final del Short y del informe con la pieza del día anterior. Cada
  video extra que alguien mira suma horas a la misma cuenta.
- Vincular cada Short a su video largo en Studio (ya está en la rutina
  diaria de Santiago, hay que confirmar que se hace todos los días).

**Segundo: los primeros ocho segundos.** Cold open. Cambiar el prompt para
que la apertura empiece por la cifra o el hecho más fuerte y la fecha venga
después, y reordenar el timeline en Remotion para que el sello quede segundo.

**Tercero: decidir qué pasa con "En titulares".** Casi tres minutos de lista
al final. Tres caminos posibles y hay que elegir uno a ojo antes de tener
Analytics: dejarlo como está, moverlo a antes del dato curioso para que el
video no termine en lista, o sacarlo del video y dejarlo solo en el informe
de la web. Ojo: sacarlo contradice el principio rector fijado el 29-08 y
recalibrado el 30-08, así que es decisión de Santiago, no de nadie más.

**Cuarto: una historia grande de verdad.** Cuatro o cinco minutos a la
noticia del día, con desarrollo, y el resto comprimido. Es el punto 3 de la
lista de arriba y sigue sin hacerse.

## 4. Ideas nuevas para evaluar (no están en el repo)

**La regla del no punto final.** Hoy cada bloque termina y empieza otro. Que
ningún bloque cierre en punto: que la última frase apunte a la siguiente
("y esto se conecta con lo que pasó en el Congreso, que es lo que viene").
Es gratis, es una línea en el prompt del guion, y es de lo que más mueve la
curva en formatos de lista.

**Un solo lazo abierto por video, anunciado en la apertura.** El prompt ya
lo permite para el dato curioso ("y antes del cierre, un dato que...") pero
solo cuando el dato lo merece. Hacerlo obligatorio, y que el lazo sea la
pieza más fuerte del video, no el dato curioso.

**"¿En qué quedó?" como gancho del minuto 1, no como sección.** En vez de
darle un bloque propio a los 60 segundos, usarlo como la razón de quedarse:
"al minuto seis te cuento cuánta de esa plata volvió". Es la ventaja
estructural del canal usada como mecánica de retención, no como contenido.

**Anunciar la duración real en la apertura.** "Hoy son ocho minutos." Suena
a nada y hace dos cosas: cumple la promesa de respetar el tiempo del que
mira, y le quita la ansiedad de no saber en qué se está metiendo.

**Contra programar el minuto 3.** Es donde típicamente cae un formato de
lista. Poner ahí a propósito lo más visual del día: el esquema, el gráfico
de barras, el dato del bolsillo. Se puede hacer desde el prompt sin tocar
código.

**Medir la retención de los Shorts como laboratorio del largo.** Un Short se
mide entero en horas, no en semanas. Lo que funcione en el gancho de un
Short se puede llevar al cold open del informe. Es el ciclo de aprendizaje
más rápido que tenemos y hoy no lo estamos usando.

## 5. Lo que tiene que decidir Santiago

1. ¿Se activa el scope de Analytics ya, o seguimos diseñando a ciegas?
2. "En titulares": ¿se queda, se mueve o sale del video?
3. ¿"¿En qué quedó?" entra como sección diaria, como gancho del minuto 1, o
   sigue apareciendo solo cuando hay hito?
4. ¿El informe apunta a la web y corta, o intenta ser completo?
5. ¿La duración se anuncia al inicio o solo se practica?

Las cinco están abiertas desde el 27-08 en `ideas/formato-video.md`. Ninguna
necesita código para responderse.
