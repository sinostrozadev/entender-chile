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

**Corrección de la revisión (02-09, tarde).** La cortina entra en fundido:
`entrada` va de 0 a 1 en 0,14 s (`tarjetas.tsx:496`), así que en el
fotograma EXACTO del inicio del capítulo la cortina es transparente y lo
que se ve es la última tarjeta de la sección anterior. Si YouTube muestrea
el primer fotograma, la tira mostraría tarjetas viejas; si muestrea medio
segundo después, la cortina. No sabemos cuál de las dos hace. Las dos son
nuestras de arreglar: la cortina debe nacer opaca (sin fundido de entrada,
que además nadie percibe en 0,14 s) o `chapters.js` debe correr cada
capítulo medio segundo hacia adelante. Lo primero es una línea.

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
- El audio de la edición dura **13:32** (`contenido/podcast/episodios.json`,
  `durSeg`); el video suma el sello, unos 3 s más. El bloque es el **23%
  de la edición**. (La primera versión de este documento decía "13:20":
  era un número puesto sin medir. El porcentaje se sostiene igual.)
- Son **18 noticias** leídas seguidas, sin desarrollo, en el tramo final,
  a unos 10 segundos cada una.
- Últimas cuatro ediciones: 15, 25, 19 y 18 titulares. No es un día raro.
  (La primera versión decía 16, 26, 20 y 19: contaba la línea de entrada
  "Y en titulares:" como si fuera una noticia.)

Tres minutos de lista plana al final es exactamente donde una audiencia se
va, y encima se lleva puesto el cierre, que es lo único que pide volver
mañana. Tienes razón: hay que ponerle tope.

**Dos formas de bajar los tres minutos a uno y medio.** La primera
versión de este documento proponía solo la A. La revisión encontró la B, y
es mejor porque no rompe nada.

- **A. Tope de cantidad**: 8 titulares, ordenados por alcance +
  consecuencia + proximidad (0-2 cada uno). Rompe la regla de
  `prompts/guion-informe.md:92` (ninguna noticia del informe queda sin
  sonar): entre 7 y 17 noticias por día dejarían de leerse, y pasarían a la
  descripción del video con una línea "y otras once noticias del día, en la
  descripción". **Esta la decide Santiago**, porque la promesa de que todo
  lo del informe suena fue una decisión suya de diseño.
- **B. Tope de largo, no de cantidad**: cada titular de **12 palabras como
  máximo**. Hoy miden unas 30 (medido en el 02-09: 185 s entre 18 son 10 s
  por titular, que a la velocidad de la voz son 28 a 32 palabras). A 12
  palabras son 4 a 5 s cada uno: los 18 del 02-09 caben en **80 a 90
  segundos** y todo sigue sonando. La regla del formato: el hecho y, si es
  imprescindible, una cifra; sin quién dijo, sin contexto, sin segunda
  cláusula. "Contraloría detectó hongos y humedad en obras del Hospital
  Las Higueras" son 11 palabras; la versión actual tiene 19.

**Recomendación: B primero.** Se aplica en el prompt, se mide en la
siguiente edición (el bloque debe bajar de 100 s), y solo si un día de 25
titulares vuelve a pasar de dos minutos se agrega la A con tope de 12. Así
la promesa se mantiene mientras se pueda mantener.

**En los dos casos, mover el bloque antes del Dato curioso.** Hoy el orden
es dato curioso, agenda, titulares, cierre: la edición termina con una
lista. Con el bloque antes, los últimos dos minutos son el dato curioso,
la agenda y el cierre, que es un final mucho mejor.

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
3. **Dos localidades: Santiago y una que rota**, distinta cada día, sobre
   la lista fija de las **15 capitales regionales** fuera de Santiago:
   Arica, Iquique, Antofagasta, Copiapó, La Serena, Valparaíso, Rancagua,
   Talca, Chillán, Concepción, Temuco, Valdivia, Puerto Montt, Coyhaique,
   Punta Arenas. (La primera versión ponía Osorno, que no es capital
   regional, y decía 16.) **Rotación por día del año, no sorteo**: el
   número de día módulo 15 elige la ciudad. Un sorteo con la fecha como
   semilla puede repetir la misma ciudad dos días seguidos; la rotación
   garantiza 15 días sin repetir y sigue siendo determinista, así que la
   edición se reproduce igual.

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
(y con él el del logo sonoro, `Informe.tsx:91`, que hoy suena en 0:00) y
agregar una sección "La noticia del día" al comienzo del guion. El detalle
que lo hace posible sin tapar voz: si esa apertura es una sección propia
del guion, el TTS ya le inserta una pausa de 1.200 ms al terminar
(`tts-azure.js:17`), y el sello con su logo caben en esa pausa, igual que
hoy caben las cortinas. `inicioNarracion` pasa a 0 y el sello se coloca en
la primera pausa de `pausas.json`. El capítulo 1 pasa a llamarse por la
noticia, no "Apertura", que además mejora la tira de capítulos.

---

## 6. El criterio de portada: título, miniatura y apertura

**Cómo se decide hoy** (esto no estaba escrito en ninguna parte):

- El **título** es la línea "Título sugerido:" que el agente del guion
  inventa libre, con la única regla de "una sola idea, concreto, sin
  clickbait" (`guion-informe.md:108`).
- La **cifra de la miniatura** es el primer `[DATO]` no automático del
  primer bloque de noticia (`scripts/dia.js:128`). La miniatura no elige
  la noticia: hereda la de apertura y le busca un número. Ya tiene un modo
  sin cifra, con el título grande (`marca.tsx:93`), así que un día de
  conflicto sin número no la deja vacía.
- La **noticia de apertura** es "siempre una [A]" (`informe.md:35`), sin
  decir cuál de las tres o cuatro.

O sea: hoy no hay criterio. Hay tres decisiones tomadas por separado, en
tres archivos distintos, y ninguna sabe de las otras. (La primera versión
decía que la miniatura "arrastra hacia lo económico": no es exacto, la
miniatura hereda lo que el informe abrió. El sesgo, si lo hay, está en el
informe.)

**Lo medido** (métricas del 02-09, videos largos):

| Video largo | Vistas (medición de las 15:50) |
|---|---|
| Milei llega a Chile tras el impasse por el Estrecho de Magallanes | **158** (+96 en un día) |
| La industria cae 5,1% antes del Imacec de julio | 41 |
| Concepción en Alerta Roja por el aumento del río Andalién | 15 |

El de Milei tiene casi **4 veces** las vistas del segundo y sigue siendo el
que más crece. La diferencia entre esos títulos no es sutil: el primero
nombra un protagonista, un conflicto y un territorio; el segundo es la
lectura de un indicador. El tercero nombra un lugar y una emergencia, y
quedó tercero.

**Lo que la revisión agregó: CÓMO creció.** Día a día, el de Milei hizo
5 vistas el día que salió, 62 al día siguiente y 158 al tercero. El primer
día no pasó nada: no fueron los suscriptores (son 7) ni el título en la
grilla del canal. Despegó al segundo día y aceleró al tercero, que es la
firma de YouTube empujándolo por búsqueda o sugeridos. "Milei" y "Chile"
son términos que la gente busca; "industria" e "Imacec" no. Así que el
mecanismo más probable no es "un título con conflicto atrae clics", sino
**un nombre propio con demanda de búsqueda hace que YouTube lo muestre**.
Las dos cosas son compatibles, pero la segunda es más precisa y cambia el
criterio: lo que hay que puntuar es si la noticia tiene un nombre propio
que alguien vaya a escribir en el buscador hoy.

**Propuesta: un solo puntaje que decide las tres cosas.** El informe elige
la NOTICIA DE PORTADA entre sus [A] y la declara en una línea; el guion, la
miniatura y la apertura en frío la leen de ahí en vez de decidir cada uno
por su cuenta.

PUNTAJE DE PORTADA, 0 a 10, cinco criterios de 0 a 2:

- **Alcance**: a cuánta gente le cambia algo. 2 = al país o a cientos de
  miles.
- **Consecuencia**: si cambia algo concreto y ya decidido. 2 = tiene efecto
  con fecha.
- **Nombre propio buscable**: un actor, lugar o entidad que alguien
  escribiría hoy en el buscador. 2 = un nombre con demanda de búsqueda
  real (un presidente extranjero, una ciudad en emergencia, una empresa
  conocida) en disputa pública; 1 = nombre conocido sin disputa; 0 = solo
  instituciones o indicadores. (La primera versión lo llamaba "conflicto
  identificable"; el conflicto ayuda, pero lo que YouTube mueve es la
  búsqueda del nombre.)
- **Proximidad**: si le pasa a Chile, a los chilenos o a un lugar
  nombrable. 2 = territorio, soberanía o una ciudad.
- **Novedad**: 2 = ocurrió en las últimas 24 horas y no se sabía.

Empate: gana el de mayor nombre propio buscable; después, el de más
consecuencia.

Prohibido subir el puntaje con indignación, morbo, daño a personas o
sospecha sin fallo. Eso es clickbait, y además rompe la revisión de
monetización que el propio prompt exige (`guion-informe.md:11`).

**Contra los datos reales**: Milei da 1+1+2+2+2 = **8**. La industria da
2+1+0+1+1 = **5**. Concepción da 1+2+1+2+2 = **8** (la ciudad en emergencia
puntúa en nombre buscable). El puntaje predice Milei y Concepción
empatados arriba y la industria abajo; lo observado es 158, 41 y 15: acierta
el primero y falla el orden de los otros dos. Dicho con precisión: de las
tres comparaciones de a pares, acierta dos. Con tres videos largos
públicos esto es una hipótesis que se puede formular, no una que se pueda
sostener. **La forma de saber si sirve**: anotar el puntaje de portada de
cada edición en la bitácora y mirar dentro de dos semanas si los de puntaje
alto tienen más vistas que los de puntaje bajo.

Lo que sí es seguro sin esperar dos semanas: hoy la decisión no la toma
nadie, y eso es peor que un criterio imperfecto escrito.
