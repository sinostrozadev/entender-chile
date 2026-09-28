# Qué debe ser configurable, y en cuál de las dos pantallas

**Inventario del 28-09-2026.** Sale de leer el código, no de imaginar: cada
fila tiene archivo y línea. La pregunta de Santiago fue "qué otros parámetros
deben ser configurables, en pro de las vistas que tenemos en el taller".

## El criterio: qué entra y qué no

No entra todo lo que se puede cambiar. Entra lo que cumple **al menos una** de
estas tres, que son las que hacen daño:

1. **Santiago ya lo cambió alguna vez pidiéndolo por chat.** Si pasó una vez,
   va a pasar de nuevo, y cada vez cuesta una sesión.
2. **Difiere entre piezas y está escrito en un lugar que sirve a todas.** Es
   el error que mordió dos veces el 28-09: el titular de sección y la pausa de
   voz. Un valor bueno para el informe aplicado sin mirar a quién más le llega.
3. **La misma cosa está escrita en más de un archivo** y nada obliga a
   mantenerlos iguales.

Lo que no cumple ninguna se queda en el código. Un taller que lo muestra todo
no se entiende, y eso ya pasó una vez.

## Lo que las dos pantallas NO cubren

Las dos vistas de hoy son Trabajos y Secciones. Hay un tercer grupo que no es
de un trabajo ni de una sección: **es del canal entero.** La voz, la paleta,
las horas de publicación. Hoy no tiene dónde ir. Son pocos y no urgen, pero
conviene decidirlo antes de repartirlos a la fuerza en las dos que hay.

---

## PANTALLA TRABAJOS: lo que cambia de una pieza a otra

Es la que más falta hace, y la que habría evitado los dos errores del 28-09.

### Voz

| Parámetro | Hoy | Dónde | Por qué entra |
|---|---|---|---|
| Pausa entre secciones | informe y Clave 3.000 ms, Short y exprés 1.200 | `scripts/pausas.js` | **YA RESUELTO el 28-09**, y es el que originó todo esto: estaba en `tts-azure.js`, que sirve a las cuatro piezas, y el Short salió con 20,2 s de silencio sobre 40 s de voz |
| Pausa de la primera | informe y Clave 5.200 ms, verticales 1.200 | `scripts/pausas.js` | igual |
| Velocidad de habla | `-10%` para todas | `scripts/tts-azure.js:38` | Santiago la cambió una vez ("es como si leyera corriendo"). Es candidata a diferir: el vertical tolera más rápido que el informe |
| Voz de Azure | `es-CL-LorenzoNeural` | `scripts/tts-azure.js:35` | criterio 1: hubo un taller de voces entero para elegirla. No urge, pero es del canal más que de la pieza |

### Cuánto dura cada cosa en pantalla (solo informe y Clave)

El vertical no tiene nada de esto: es otra composición (`src/Short.tsx`) con
corte seco entre bloques.

| Parámetro | Hoy | Dónde | Por qué entra |
|---|---|---|---|
| Portada antes de empezar | 3,5 s | `scripts/prueba-video.js:208` y el plan | criterio 1 |
| Titular de sección en pantalla | mínimo 1,0 s | `scripts/secuencia-plan.js:70` | **Santiago lo dictó textual**: "tiene que tener por lo menos 1 s el titular de mínimo en vista" |
| Fundido del titular | 0,25 s mínimo, 1,67 s pedido | `secuencia-plan.js:76` y `:32` | criterio 1 |
| Respiro entre el titular y el texto | 0,12 s | `scripts/secuencia-plan.js:74` | nuevo el 28-09, sale de un defecto que él reportó tres veces |
| Cola de cada tarjeta | 0,3 s | `scripts/secuencia-plan.js:37` | es la que causó el otro texto superpuesto |
| Relevo entre tarjetas | 0,25 s | `src/secuencia.tsx:335` | nuevo el 28-09 |
| Texto apagado antes de la salida | 1,0 s | `src/secuencia.tsx:49` | **Santiago lo dictó**: "haz que el texto desvanezca 1 s antes" |
| Salida de sección | 0,9 s | `src/secuencia.tsx:45` | criterio 1 |
| Viaje de cámara entre secciones | 4,0 s | `scripts/secuencia-plan.js:86` | **Santiago lo pidió dos veces**: "se movió muy rápido el cambio de sección, no se aprecia nada" |
| Presentación del mosaico | 10 s | `scripts/secuencia-plan.js:87` | criterio 1 |

### Qué bloques entran en cada pieza

**Acá está el hallazgo más concreto de este inventario.** Cuatro archivos saben
hoy, cada uno a su manera y sin hablarse, cuáles bloques son armazón y cuáles
son noticia:

| Archivo | Qué decide | Cómo |
|---|---|---|
| `scripts/parse.js:31` | cuáles no se anuncian con voz | regex anclado |
| `scripts/short.js:66` | cuáles no entran al Short | regex **sin anclar** |
| `scripts/guion-corto.js:39-41` | cuáles van en la muestra corta | tres regex |
| `contenido/guiones/*.md` | lo que GPT escribe | prosa libre |

El de `short.js` no está anclado y ya descarta un titular de noticia real:
**"Cierre de Orionx"** (el cierre de una empresa) se descarta porque contiene
la palabra "cierre". Medido sobre los 36 guiones escritos.

| Parámetro | Hoy | Por qué entra |
|---|---|---|
| Cuántos bloques lleva el Short | 5 el del informe, 4 el de la Clave | `scripts/short.js:49`, criterio 2 |
| Largo máximo del gancho | 66 caracteres | `scripts/short.js:138`, criterio 1 |
| Qué bloques descarta cada pieza | cuatro regex distintos | **criterio 3, y ya falla** |

La pantalla de Secciones ya tiene desde hoy el campo que arregla esto: el tipo
(tema o estructura) y los alias. Falta que los cuatro archivos lo lean.

### Publicación

| Parámetro | Hoy | Dónde | Por qué entra |
|---|---|---|---|
| Hora de publicación | informe 06:30, Short 12:00, Clave 14:00 | variables de GitHub, `edicion-diaria.yml:266` | ya es configurable, pero en un lugar donde Santiago no entra. Es lo más "de trabajo" que existe |
| Privacidad al subir | privado y programado | `scripts/youtube-subir.js:53` | regla 19, gate humano: se toca con cuidado |
| Playlist | por pieza, en `contenido/youtube.json` | `youtube-subir.js:167` | ya es dato, solo falta la pantalla |
| Etiquetas y categoría de YouTube | fijas para todas | `youtube-subir.js:143` | criterio 2: el exprés y el informe no se etiquetan igual |
| Cuántas carátulas | tres | `scripts/miniaturas.js` | criterio 1 |

### Lo que NO pondría en esta pantalla

- **Resolución y cuadros por segundo** (1920x1080 a 24, `build-timeline.js:216`).
  El 24 se eligió midiendo tiempo de render, no gusto. Cambiarlo desde una
  pantalla invita a un render de dos horas sin querer.
- **El corte de Azure en 5.000 caracteres** (`tts-azure.js:58`): es un límite
  del proveedor, no una decisión.

---

## PANTALLA SECCIONES: lo que ya existe y lo que falta

La pantalla ya lleva nombre, tipo, slug, color, claves, alias, imagen y
pictograma. Lo que falta:

| Parámetro | Hoy | Dónde | Por qué entra |
|---|---|---|---|
| Orden de las secciones en el video | el del guion | ninguna parte | criterio 1: hoy manda GPT y no hay dónde decirlo |
| Cuánto tiñe el color de la sección | 0,3 | `src/secuencia.tsx:104` | se ajustó a ojo una vez |
| Cuánto se ve el pictograma | 0,085 | `src/secuencia.tsx:105` | igual |
| Oscurecido de la sección sin imagen | 0,6 | `src/secuencia.tsx:142` | existe porque sin él el color se apagaba hasta desaparecer |
| Oscurecido de la sección con imagen | 0,76 | `src/tarjetas.tsx`, `velo()` | criterio 1 |
| Si la sección puede ir en el Short | hoy lo decide un regex | `short.js:66` | **criterio 3, y ya falla** |

Los tres oscurecidos y tintes son de la familia "el aspecto de una sección", y
puede que no valga la pena editarlos uno por uno: quizá van juntos como un
solo ajuste de "cuánto se lee el texto sobre la imagen".

---

## EL TERCER GRUPO: del canal, no de una pieza ni de una sección

No tienen dónde ir en las dos pantallas de hoy.

| Parámetro | Hoy | Dónde |
|---|---|---|
| Los cuatro colores del canal | papel, tinta, pátina, cobre | `src/tema.ts` |
| Las tres tipografías | Fraunces, IBM Plex Sans, IBM Plex Mono | `src/tema.ts` |
| Ancho de la caja de texto | 1.340 px, y 900 sobre imagen | `src/tema.ts:55`, `tarjetas.tsx:150` |
| Sello, cortinas y melodía de cierre | generados por `scripts/sonido.js` | `dia.js:105-112` |
| Handle del canal | `@entenderchile` | `short.js:46` |
| Ventana de la guardia | cada 2 h, 08:00 a 22:00 | `guardia.yml`, `guardia.js:34` |
| Memoria del barrido | 7 días | `barrido.js:22` |
| Medios que se barren | unos 22 | `barrido.js` |

**Los medios del barrido son el candidato más fuerte a pantalla propia**: son
una lista que crece, que Santiago sí querría tocar, y que no cabe en ninguna de
las dos actuales.

---

## Si hubiera que hacer solo tres cosas

1. **Que los cuatro archivos lean el tipo de sección del taller** en vez de
   llevar cada uno su regex. Es lo único de esta lista que YA está fallando en
   producción, y el dato ya existe en la base desde hoy.
2. **La pantalla de Trabajos con los tiempos**, empezando por las pausas de
   voz, que es el caso probado, y siguiendo por los del video. Es lo que
   habría evitado los dos errores del 28-09.
3. **Las horas de publicación**, que es lo más barato: ya son configurables,
   solo están en un lugar donde Santiago no entra.

Lo demás aguanta.
