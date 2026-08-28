# El estado como campo de toda noticia, y por qué hoy se pierde el 70%

Origen: Santiago detectó que hechos grandes no aparecen en el informe, y
que a los que aparecen no se les hace seguimiento salvo cuando son plata
pública. Preguntó si el problema son las categorías.

Las categorías son parte, pero no la principal. Lo que sigue sale de medir
los cinco informes y de leer `prompts/seleccion.md` y `prompts/informe.md`.

## Lo que se mide

De 49 preseleccionadas el 28-08 llegaron 15 noticias al informe. En los
cinco días: 15, 12, 12, 9, 15. **Se pierde alrededor del 70% de la olla.**

Secciones que aparecieron, sobre 5 informes:

| Sección | Días que apareció |
|---|---|
| Economía | 5 |
| Vivienda y ciudad, Internacional, Política, Medioambiente | 4 |
| **Seguridad y Justicia** | **3** |
| Ciencia y tecnología, Chile en regiones | 2 |
| Salud, Trabajo | 1 |
| **Educación** | **0** |
| **Plata pública** | **0** |
| **Mercados y bolsillo (finanzas)** | **0** |

Seguridad y Justicia es el área que más candidatas aporta cada día (5 de 49
el 28-08) y falta en dos de cinco ediciones. Finanzas existe en el prompt y
no se abrió nunca.

## Las cinco causas, en orden de fuerza

### 1. El tope del video está recortando la web

`prompts/informe.md` dice, textual: *"Tope conjunto: [A] + [B] no pasan de
10, porque son las que se narran en el video"*.

El video paga cada noticia en minutos. **La web no paga nada.** Y sin
embargo el recorte se aplica en el informe, que es lo que lee el ciudadano
en el sitio. Se está tirando información por un costo que solo existe en
otro producto.

Peor: la válvula de escape gratuita está sin usar. Las `[C]` no tienen costo
de duración y el prompt permite hasta diez. Se usaron 2, 3, 2, 2 y 4.

### 2. Tres áreas no tienen dónde aterrizar

La preselección barre doce áreas. El informe tiene sus propias secciones y
**no coinciden**. No existe sección para Plata pública ni para Educación, y
finanzas está como "Mercados y bolsillo, solo cuando haya novedad
relevante": un candado que en cinco días no se abrió nunca.

Una noticia preseleccionada en un área sin casilla de destino no se
descarta por criterio. Se evapora.

### 3. Dieciséis secciones compiten por diez cupos

Con esa aritmética, la mitad de las secciones se queda vacía cada día por
construcción, y las que ganan son siempre las mismas.

### 4. El sistema premia lo fácil de verificar por sobre lo importante

Esta es la causa profunda y la menos evidente.

Para ser `[A]` una noticia necesita dos fuentes coincidentes, y toda cifra
lleva fuente y fecha. Un anuncio institucional llega empaquetado: hay
organismo, hay documento, hay fecha. Se escribe solo y pasa todos los
controles.

Un hecho en desarrollo, donde todavía no se sabe qué pasó, no tiene cifras
firmes y tiene fuentes que se contradicen. El prompt sí dice "si las fuentes
discrepan, informa la discrepancia", pero es una línea contra una batería de
reglas que empujan al revés, más la orden de omitir secciones sin novedad
relevante.

El resultado es el sesgo que ya se ve en los datos: **lo anunciado por una
institución le gana a lo que acaba de ocurrir y todavía no se entiende.** Y
lo que todavía no se entiende es exactamente lo que hay que seguir.

### 5. Ninguna noticia tiene estado, salvo las de plata pública

El único mecanismo de memoria del proyecto es el observatorio, y por diseño
está limitado: *"Si alguna noticia del día compromete FONDOS DEL ESTADO"*.
Todo lo demás nace y muere en el día.

La preselección produce una sección "Historias en curso sin novedad hoy", y
el prompt del informe no la lee nunca.

## La propuesta

### Separar dos cosas que hoy están mezcladas

- **La sección** dice de qué trata la noticia. Es temática.
- **El estado** dice en qué punto está la historia. Es temporal.

Hoy solo existe lo primero, así que una historia sin resolver no tiene forma
de existir más allá del día en que ocurrió.

### Cinco estados

| Estado | Qué significa |
|---|---|
| `ABIERTA` | Ocurrió y no se sabe qué pasó. Lleva una pregunta abierta explícita. |
| `EN CURSO` | Avanza, hay novedades que reportar. |
| `EN PAUSA` | Sin novedad hace días y sigue sin respuesta. |
| `CERRADA` | Se supo. Se escribe la respuesta. |
| `SIN RESPUESTA` | Nadie va a contestar. Cierre honesto. |

`SIN RESPUESTA` no es un fracaso: **es una noticia**. Que una muerte, un
desastre o una acusación queden sin explicación es información sobre el
país, y es lo que ningún otro canal va a decir porque nadie se acuerda.

### El campo que de verdad importa no es el estado, es la pregunta

Cada historia abierta lleva **una frase que dice qué no se sabe todavía**.

Sin ese campo, "seguimiento" degenera en repetir titulares. Con él, la
historia tiene línea de llegada: se cierra cuando la pregunta se responde, y
cualquiera puede verificar si se respondió o no.

### Dónde vive

Generalizando lo que ya funciona. Los dossiers de `contenido/casos/` tienen
un bloque `<!-- datos -->` legible por máquina, y `scripts/casos.js` los lee
sin adivinar. El mismo patrón, más liviano, para el resto:

    contenido/historias/<slug>.md

con su bloque de datos: estado, pregunta abierta, última novedad con fecha,
próximo hito conocido si existe.

La plata pública no cambia: es una historia con estado que además tiene
dossier, contador y sección propia. El observatorio pasa a ser el caso
especial de un mecanismo general, en vez de ser el único mecanismo.

### Cómo llega al video sin comerse los cupos

Tres reglas, y las tres son verificables:

1. **El tope se muda al guion.** El informe deja de tener tope y publica
   todo lo relevante. El recorte a diez lo hace el guion, que es quien paga
   la duración, marcando qué se narra y qué queda solo en la web.
2. **Cupos reservados.** De lo que se narra, al menos dos son continuación
   de historias abiertas cuando las haya. Sin eso, lo nuevo siempre le gana
   a lo pendiente, porque lo nuevo es más atractivo.
3. **Caducidad.** Una historia `ABIERTA` que no reaparece en N días pasa a
   `EN PAUSA` y entra igual al "¿En qué quedó?" con su pregunta sin
   responder. Que no haya novedad no es razón para dejar de preguntar; es
   precisamente el momento en que los demás dejan de preguntar.

### Sobre las categorías

Un solo listado compartido entre selección e informe. Hoy son dos listas
distintas y la diferencia se traga noticias.

Y **finanzas como sección de verdad, sin candado**: dólar, cobre, UF, tasas,
combustibles. Cambia todos los días y le pega al bolsillo de la persona a la
que le hablamos. Que en cinco días no se haya abierto nunca prueba que el
candado está mal puesto, no que no haya noticias.

## Lo que hay que decidir antes de tocar nada

1. ¿Cuántos días de silencio convierten una `ABIERTA` en `EN PAUSA`? Sugiero
   tres, y siete para `SIN RESPUESTA`.
2. ¿Cuántas historias abiertas puede sostener el canal a la vez sin que el
   informe se vuelva un boletín de pendientes? Sugiero un techo de doce, y
   que entrar obligue a cerrar o pausar otra.
3. ¿Quién decide que una historia se abre? Si abre cualquiera, en dos
   semanas hay cuarenta. El umbral tiene que ser tan explícito como el de
   los dossiers de plata pública.
4. ¿El estado se le muestra al lector, o es solo maquinaria interna? A favor
   de mostrarlo: es la prueba visible de que el canal no se olvida. En
   contra: agrega ruido a una página que hoy se lee limpia.
