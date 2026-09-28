# La biblioteca de imágenes: la idea, medida

**28-09-2026.** Idea de Santiago: generar imágenes sueltas por palabra y armar
el fondo de cada bloque combinándolas. "En la sección emergencia habla de nieve
en un volcán: revisas la biblioteca, si tienes nieve y tienes volcán, generas
algo". El objetivo es que el video sea más dinámico.

Antes de opinar se midió sobre los **36 guiones del informe, 408 bloques de
noticia**, que es todo lo que el canal ha escrito.

## Lo que la medición dice

**La combinación de dos objetos casi nunca se puede hacer.**

| | bloques | de 408 |
|---|---|---|
| con al menos UNA palabra dibujable | 73 | 18% |
| con DOS o más dibujables | 8 | **2%** |

El caso del ejemplo es literalmente uno entre 408: **"volcán" aparece una vez**
en todo el corpus y **"nieve" ninguna**. Una biblioteca pensada para componer
pares estaría apagada el 98% de las veces.

**El motivo es que las noticias chilenas no hablan de objetos.** Las palabras
que de verdad se repiten son abstractas:

    chile 42 · gobierno 29 · empleo y desempleo 24 · vivienda 23 · seguridad 17
    contraloría 15 · reforma 13 · fiscalía 13 · caso 12 · investigación 11
    presupuesto 7 · dólar 7 · cobre 6 · arriendo 5

Las dibujables aparecen poco: vivienda 23, banco 9, viento 7, cobre 6,
lluvia 4, incendio 3, terremoto 1, volcán 1, hospital 1.

**Pero la cola sí se amortiza, si se indexa por CONCEPTO y no por objeto.**

| biblioteca de | bloques con 1+ palabra | con 2+ |
|---|---|---|
| 20 palabras | 56% | 26% |
| 40 palabras | 75% | 45% |
| 80 palabras | 86% | 63% |
| 120 palabras | 92% | 75% |

## Lo que se propone en vez

1. **Una imagen por bloque, no dos compuestas.** Con 40 conceptos se toca el
   75% de los bloques con una sola imagen. Componer dos grabados en un fondo
   además es un problema de diseño (se pelean) para ganar el 45%.
2. **Conceptos, no objetos**: "una reforma", "un presupuesto", "la vivienda",
   "el empleo", "una fiscalía", "el cobre". Son los que se repiten.
3. **Por estilo**, como pidió Santiago, y es la parte más importante de su
   idea: una biblioteca mezclada se ve como un collage. Cada estilo, su serie.

## La objeción que no es técnica

Hoy `contenido/secciones/README.md` dice: *"No representan ninguna noticia: son
el fondo sobre el que se pinta el rótulo"*, y la regla 29 prohíbe lugares
identificables. Una imagen armada con las palabras de la noticia **deja de ser
un identificador de sección y pasa a ser una ilustración del hecho**: un volcán
nevado al lado de una nota sobre los Nevados de Chillán se lee como una foto de
eso, aunque sea un grabado.

Se puede cruzar esa línea, pero tiene que ser una decisión y no una
consecuencia. Si se cruza, la salvaguarda es que el dibujo siga siendo
**grabado y abstracto**, nunca fotográfico y nunca un lugar reconocible.

## El camino barato que hay que evaluar primero

El problema real es que el video se ve estático. Eso se puede atacar con mucho
menos: **tres variantes por sección** en vez de una. Son **36 imágenes** contra
las **80** de una biblioteca de 40 conceptos, no necesita máquina nueva (el
código ya elige la imagen de la sección) y no cruza la línea editorial, porque
siguen sin representar ninguna noticia.

Si con eso el video deja de verse repetido, la biblioteca no hace falta. Si no,
la biblioteca se construye sabiendo que el problema era otro.

## Si se hace, qué habría que construir

- Una pantalla **Biblioteca** que unifique lo que hoy está repartido: las
  carátulas de sección (ya están en Estilos) y las nuevas.
- La lista de palabras, que sale de esta medición y no de la intuición.
- Dos prompts por palabra, para que Santiago genere y suba.
- Cómo se elige la imagen de un bloque, que es donde está el riesgo de que
  quede eligiendo mal y nadie se entere.
