# Imagen y retención: fondos, titulares, apertura y criterio de portada

Conversación del 02-09-2026 con Santiago, a partir de la tira de capítulos
del informe del 02-09. Seis temas, con lo medido primero y la propuesta
después. Nada de esto está aplicado: es el material para la sesión de la
noche.

---

## 1. Qué muestra realmente la tira de capítulos

Las ocho imágenes idénticas de la tira NO son fotogramas del video: son el
MISMO archivo, `out/FECHA/miniatura.png`, repetido. Se reconoce porque la
miniatura es marina oscura (`estilo: "marino"`, fondo `banner-fondo.png`) y
el video entero es papel claro (`tema.papel`, #F2F2EF). YouTube muestra la
carátula en todos los capítulos mientras genera los fotogramas propios.

O sea: la tira todavía no dice nada sobre la monotonía del video. Pero el
diagnóstico de fondo sigue en pie, y por una razón más fuerte: cuando
YouTube genere los fotogramas reales, los quince capítulos van a mostrar
quince veces el MISMO papel con la MISMA composición.

**El hallazgo que esto abre.** El fotograma que YouTube toma para cada
capítulo es el del segundo en que el capítulo empieza, y en ese segundo
exacto lo que está en pantalla es la CORTINA DE SECCIÓN
(`CortinaSeccion`, 1,1 s desde `ev.from`, y los capítulos se generan desde
ese mismo `ev.from` en `scripts/chapters.js`). La cortina es hoy papel
blanco + una línea de color + el nombre en serif. Es decir: el lugar de
mayor palanca visual de todo el proyecto es un componente de 35 líneas que
nadie ha mirado, porque define catorce miniaturas de la tira de capítulos.

Cualquier trabajo de fondos empieza ahí.

---

## 2. Fondos distintos por sección

De acuerdo con la idea, con una corrección de método.

**Lo que no hay que hacer: fondos fotográficos.** El sistema visual entero
está construido sobre papel frío + tinta + una pátina, y su firma es que
toda cifra se lee. Una foto detrás de un párrafo de 38 px mata el
contraste, y además la tarjeta se queda en pantalla 20 a 40 segundos: lo
que en una miniatura es textura, en medio minuto es ruido y cansa.

**Lo que sí: textura procedural, dibujada en código.** Sin archivos de
imagen, sin pedirle arte a nadie, reproducible y con peso cero. Cuatro
familias, todas sobre papel:

| Familia | Trazo | Para qué secciones |
|---|---|---|
| Topográfica | curvas de nivel muy tenues | territorio, regiones, clima, medioambiente |
| Pauta de gráfico | línea base + marcas de eje | economía, cifras, mercado, empleo |
| Trama de diario | halftone de puntos | política, institucional, Congreso, justicia |
| Rayado diagonal | líneas finas inclinadas | seguridad, policial, judicial |

Encima, dos capas de variación:

1. **Tinte del papel**: el color de sección que ya calcula
   `colorDeSeccion()` mezclado al 2 a 4% sobre el papel. Suficiente para
   que dos secciones seguidas se sientan distintas, insuficiente para
   notarse como "color de fondo".
2. **Azar sembrado**: ángulo del trazo, densidad, posición de la barra de
   color y posición de uno o dos fragmentos de texto difuminado (la misma
   técnica que ya usa la miniatura con `extractos`, `src/marca.tsx:72`).
   La semilla es `fecha + nombre de sección`, así que la misma edición
   siempre se rinde igual (un render que cambia entre corridas es
   imposible de depurar) y dos ediciones nunca coinciden.

**Regla dura de contraste**: nada de la textura pasa de 0,10 de opacidad
sobre el papel, y nada de textura detrás de una cifra grande. Si hay duda,
gana la legibilidad: el fondo es el escenario, no el actor.

**Orden de trabajo**, de más a menos rendimiento por hora:

1. `CortinaSeccion` con la familia y el tinte a sangre completa. Catorce
   miniaturas distintas en la tira de capítulos con un solo componente.
2. `Marco` (el fondo de todas las tarjetas) con la textura al 0,06.
3. `Miniatura`: una variante de fondo por familia, para que dos ediciones
   seguidas no se vean iguales en la grilla del canal.

Aparte de esto quedan los fondos por TIPO de informe, que ya existen
(marino para el informe, verde para la Clave). No se tocan.

---

## 3. "En titulares": el tope y el criterio

**Lo medido, edición del 02-09** (de `contenido/descripciones/`):

- El bloque va de **09:59 a 13:04**: **3 minutos 5 segundos**.
- El video dura 13:20. El bloque es el **23% de la edición**.
- Son **19 noticias** leídas seguidas, sin desarrollo, en el tramo final.
- Últimas cuatro ediciones: 16, 26, 20 y 19 titulares. No es un día raro.

Tres minutos de lista plana al final es exactamente donde una audiencia se
va, y encima se lleva puesto el cierre, que es lo único que pide volver
mañana. Tienes razón: hay que ponerle tope.

**Propuesta.**

- **Tope duro: 8 titulares, alrededor de 90 segundos.**
- **Criterio de selección** (puntaje 0 a 6, se ordena y entran los ocho
  primeros): alcance (0-2, a cuánta gente le cambia algo) + consecuencia
  (0-2, si cambia algo concreto: plata, un derecho, un servicio, una
  fecha) + proximidad (0-2, si le pasa a Chile o a un lugar nombrable).
  Empate: gana el de más consecuencia.
- **Mover el bloque antes del Dato curioso.** Hoy el orden es dato curioso,
  agenda, titulares, cierre: la edición termina con una lista. Con el
  bloque antes, los últimos dos minutos son el dato curioso, la agenda y
  el cierre, que es un final mucho mejor.

**Esto rompe una promesa vigente y la decisión es de Santiago.** La regla
actual (`prompts/guion-informe.md:92`) dice que ninguna noticia del informe
queda sin sonar en el video. Con tope de 8, entre 8 y 18 noticias por día
dejan de sonar. La compensación: siguen íntegras en el informe publicado en
la web y pasan a la descripción del video, y el guion cierra el bloque con
una línea del tipo "y otras once noticias del día, en la descripción". El
trabajo periodístico no se pierde, deja de leerse en voz alta.

---

## 4. La recomendación del tiempo

Hoy: `prompts/informe.md:77` pide una frase de vestimenta para Santiago,
que el guion integra en la despedida (`guion-informe.md:94`).

Tres cambios:

1. **Nunca nombrar lo que no va a pasar.** "Salga sin paraguas" gasta la
   frase en una negación. Si no llueve, no se menciona la lluvia.
2. **Muy corta y casual**: máximo 12 palabras por localidad, en tono de
   quien avisa de paso, no de servicio meteorológico. Sin mínima y máxima
   entre paréntesis, sin fuente hablada.
3. **Dos localidades: Santiago y una que rota**, distinta cada día,
   sorteada con la fecha como semilla sobre una lista fija de capitales
   regionales (Arica, Iquique, Antofagasta, Copiapó, La Serena, Valparaíso,
   Rancagua, Talca, Chillán, Concepción, Temuco, Valdivia, Osorno, Puerto
   Montt, Coyhaique, Punta Arenas). Determinista, así que la edición es
   reproducible, y no se repite en dos semanas.

Efecto secundario que no es menor: nombrar una región distinta cada día es
la única parte de la edición que le habla directo a alguien fuera de
Santiago. Es barato y puede traer audiencia regional.

---

## 5. Abrir con la noticia, no con la presentación

Hoy la edición abre así: sello de marca 2,8 s, después "Apertura" de
**31 segundos** (medido: el capítulo 2 empieza en 00:31) donde se anuncia
lo que se va a ver. La primera noticia concreta llega en el segundo 31.

Los primeros 30 segundos son los que deciden si alguien se queda. Gastarlos
en un índice hablado es el error de retención más caro que tiene el
formato.

**Propuesta: apertura en frío.**

1. **0:00 a 0:12**, la noticia más importante del día, dicha entera y sin
   preámbulo, con su tarjeta y su cifra en pantalla. La misma noticia del
   título y de la miniatura: el que hizo clic por el título recibe eso
   mismo en el primer segundo, que es lo que sostiene la retención.
2. **0:12 a 0:15**, el sello de marca (hoy va en 0:00; se corre).
3. **0:15 en adelante**, la apertura actual, acortada a 15 segundos, y el
   resto igual.

Técnicamente es mover el `<Sequence>` del `Sello` en `src/Informe.tsx:123`
y agregar una sección "La noticia del día" al comienzo del guion. El
capítulo 1 pasa a llamarse por la noticia, no "Apertura", que además mejora
la tira de capítulos.

---

## 6. El criterio de portada: título, miniatura y apertura

**Cómo se decide hoy** (esto no estaba escrito en ninguna parte):

- El **título** es la línea "Título sugerido:" que el agente del guion
  inventa libre, con la única regla de "una sola idea, concreto, sin
  clickbait" (`guion-informe.md:108`).
- La **cifra de la miniatura** es el primer `[DATO]` no automático del
  primer bloque de noticia (`scripts/dia.js:128`).
- La **noticia de apertura** es "siempre una [A]" (`informe.md:35`), sin
  decir cuál de las tres o cuatro.

O sea: hoy no hay criterio. Hay tres decisiones tomadas por separado, en
tres archivos distintos, y la miniatura además arrastra hacia lo económico
porque toma la primera cifra que encuentra.

**Lo medido** (métricas del 02-09, videos largos):

| Video largo | Vistas |
|---|---|
| Milei llega a Chile tras el impasse por el Estrecho de Magallanes | **142** (+80 en un día) |
| La industria cae 5,1% antes del Imacec de julio | 41 |
| Concepción en Alerta Roja por el aumento del río Andalién | 15 |

El de Milei tiene **3,5 veces** las vistas del segundo y sigue siendo el
que más crece. La diferencia entre esos títulos no es sutil: el primero
nombra un protagonista, un conflicto y un territorio; el segundo es la
lectura de un indicador. El tercero nombra un lugar y una emergencia, y
quedó tercero porque es local.

**Propuesta: un solo puntaje que decide las tres cosas.** El informe elige
la NOTICIA DE PORTADA entre sus [A] y la declara en una línea; el guion, la
miniatura y la apertura en frío la leen de ahí en vez de decidir cada uno
por su cuenta.

PUNTAJE DE PORTADA, 0 a 10, cinco criterios de 0 a 2:

- **Alcance**: a cuánta gente le cambia algo. 2 = al país o a cientos de
  miles.
- **Consecuencia**: si cambia algo concreto y ya decidido. 2 = tiene efecto
  con fecha.
- **Conflicto identificable**: partes con nombre en desacuerdo público.
  2 = dos actores nombrados, enfrentados, hoy.
- **Proximidad**: si le pasa a Chile, a los chilenos o a un lugar
  nombrable. 2 = territorio, soberanía o una ciudad.
- **Novedad**: 2 = ocurrió en las últimas 24 horas y no se sabía.

Empate: gana el de más conflicto; después, el de más consecuencia.

Prohibido subir el puntaje con indignación, morbo, daño a personas o
sospecha sin fallo. Eso es clickbait, y además rompe la revisión de
monetización que el propio prompt exige (`guion-informe.md:11`).

**Contra los datos reales**: Milei da 1+1+2+2+2 = **8**. La industria da
2+1+0+1+1 = **5**. Concepción da 1+2+0+2+2 = **7**. El orden que predice
(8, 7, 5) es el orden observado (142, 15, 41) en dos de tres, y falla en
Concepción, que quedó último con el segundo puntaje. Con cuatro videos
largos y 620 vistas de canal esto es una hipótesis calibrada con muy poco,
no una ley. **La forma de saber si sirve**: anotar el puntaje de portada de
cada edición en la bitácora y mirar dentro de dos semanas si los de puntaje
alto tienen más vistas que los de puntaje bajo.

Lo que sí es seguro sin esperar dos semanas: hoy la decisión no la toma
nadie, y eso es peor que un criterio imperfecto escrito.
