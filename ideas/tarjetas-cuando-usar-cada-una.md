# Qué tarjeta usar en cada caso: el algoritmo

Abierto el 01-09-2026. Pedido de Santiago: *"hay que súper validar las reglas
para que nos entregue lo que queremos, para que sepa cuál usar en cada caso,
quizás un algoritmo en el que evalúe de alguna forma cuál es mejor para cada
caso"*.

Este documento es la propuesta. **No está aplicado**: los prompts no se
tocan desde la sesión de día.

## El principio: la forma de la tarjeta la decide la forma del dato

El error de hoy es que el prompt ofrece once tipos, los describe bien, y no
dice **cuándo** usar cada uno. Frente a esa libertad el modelo hace lo que
haría cualquiera: se va siempre al más fácil, que es `cifra`. Once de catorce
marcas del 01-09 fueron `cifra`.

La corrección no es pedirle "más variedad", que es una instrucción de gusto y
no se puede verificar. Es darle una **regla mecánica**: mirar cuántos valores
hay y qué relación tienen entre ellos. Eso sí es decidible, y por lo tanto
también es auditable después.

## Paso 0: ¿hay tarjeta?

Antes de elegir tipo, la pregunta previa, que ya está en el prompt y hay que
conservar: **la cifra que va a pantalla es la que cambia algo para alguien**.
Si el párrafo no se sostiene en una cifra así, no lleva marca `[DATO]`: la
`[TESIS]` del bloque ya está en pantalla y el párrafo se lee tal cual.

Esta regla manda sobre todo lo demás. Ninguna cuota de variedad justifica
inventar una tarjeta.

## Paso 1: el árbol de decisión

Se recorre en orden y gana la primera que calza.

| # | Si el dato es... | Tipo | Ejemplo |
|---|---|---|---|
| 1 | Un indicador en **4 o más momentos** del tiempo | `lineas` | IPC de los últimos 24 meses |
| 2 | El **mismo** indicador en **dos** momentos (antes y después) | `cambio` | PGU: $231.732 → $250.275 |
| 3 | Dos lados con un **resultado** entre ellos | `marcador` | Chile 2 - 1 Perú |
| 4 | **3 a 6** valores de la misma familia y misma unidad, donde importa el tamaño relativo | `barras` | industria -5,1%, minería -7,2%, manufactura -4,9% |
| 5 | **3 o más** valores **ordenados por posición** (un ranking) | `tabla` | las cinco comunas con más denuncias |
| 6 | **2 o 3** valores de cosas distintas pero comparables, misma unidad | `comparacion` | lo pedido vs lo aprobado |
| 7 | **Un** valor | `cifra` | -5,1% de caída industrial |
| 8 | Una **dirección sin número** | `cifra` en modo señal | "Empleo formal" con flecha roja |

Si nada de eso calza porque **la noticia no es una cifra**, dos preguntas
más, también en orden:

| # | Si la noticia es... | Tipo |
|---|---|---|
| 9 | Un **orden**: etapas, pasos, actores que se pasan algo. Señales en el texto: "primero... luego", "pasa a", "debe ser aprobado por", "queda en manos de", "la siguiente etapa" | `esquema` |
| 10 | Algo cuyo valor está en **quién lo dijo y cómo lo dijo**, textual, con autor identificado | `cita` |
| 11 | Nada de lo anterior | solo `[TESIS]` y párrafo |

**Regla de desempate cuando dos calzan:** gana la de más abajo en la tabla,
o sea la más simple. Una tarjeta que sobra explica menos que la que no está.

## Paso 2: las cuotas de variedad (capa aparte, y no manda)

Esto es lo que rompe la monotonía, y va **después** del árbol, nunca encima:

- Máximo **dos `cifra` consecutivas** en todo el video.
- Nunca dos tarjetas del mismo tipo seguidas dentro del mismo bloque.
- Con 8 o más noticias en la edición: al menos **un `esquema`** y al menos
  una de `barras`, `tabla` o `comparacion`.
- Al menos **tres tipos distintos** por edición.

**Y la regla que protege todo lo anterior:** *la variedad nunca justifica un
dato que no está en el informe, ni una tarjeta forzada.* Si el día no da para
un esquema, no hay esquema. La cuota es una alarma, no una obligación.

Ese es el riesgo real de este cambio y hay que escribirlo en el prompt con
todas sus letras: un modelo al que se le pide variedad empieza a inventar
para cumplirla.

## Paso 3: la validación, que es lo que Santiago pidió de verdad

"Súper validar" no puede significar escribir la regla mejor. Una regla en un
prompt es una intención, no una garantía: hoy el prompt ya ofrece los once
tipos y el resultado fueron cuatro. **Hay que medir la salida, no confiar en
la instrucción.** Es la misma lección de los workflows que fallaban en
silencio.

Tres capas, de más barata a más cara:

**a. Un contador mecánico.** Un script que lee el guion del día y cuenta
marcas por tipo. Si se rompe una cuota, avisa. No depende de que ningún
modelo se porte bien. Es media hora de trabajo y es la capa que más rinde.

**b. La revisión editorial.** Ya corre todos los días a las 04:40. Agregarle
una categoría nueva de hallazgo `[MENOR]`: "monotonía visual", con el conteo
por tipo y las cuotas rotas. Ojo: hay que agregarla con cuidado, porque el
prompt de revisión ya tuvo el problema de marcar doce veces la misma no
falla, y está explícitamente calibrado contra eso.

**c. El panel interno.** Un histórico de tipos por edición, para ver si la
variedad se sostiene o se degrada con las semanas. Es lo único que responde
"¿esto funcionó?" pasado un mes.

**Orden:** (a) primero, porque no depende de nadie. (b) después. (c) cuando
haya dos semanas de datos que mirar.

## Lo que hay que revisar antes de aplicar nada

1. `lineas` está en el árbol pero **no está construida** (ver VISUAL 2 en
   PENDIENTES). Hasta que exista, la fila 1 del árbol no se puede pedir: hoy
   dibuja una tarjeta de comparación.
2. `marcador` solo aplica a deporte, y el prompt del guion dice que el
   deporte entra "solo si el informe lo incluyó como noticia". Es el tipo que
   menos se va a usar y está bien así.
3. El árbol hay que probarlo contra ediciones reales antes de meterlo al
   prompt: tomar los guiones del 29, 30, 31 y 01, aplicar el árbol a mano
   marca por marca, y ver si el resultado es mejor que lo que salió. Si el
   árbol no mejora esos cuatro días, está mal el árbol.
