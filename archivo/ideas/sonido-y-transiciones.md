# Sonido y transiciones: melodías propias, cortinas de sección, cierre

Contexto: la música pasa de cama continua a puntuación. La razón está en
`estrategia/decisiones.md` (2026-08-27): la política de contenido no auténtico
de YouTube nombra explícitamente *"exactamente la misma música de fondo en
muchos videos"* como una de las señales, y nuestro `informe.mp3` corriendo
completo bajo cada video era justo ese patrón. Además, una cama continua bajo
una voz sintética suena a video de relleno, que es lo contrario de lo que
queremos parecer.

Entonces: silencio bajo la narración, y música en tres momentos concretos.

## De dónde salen las melodías: las generamos nosotros

`scripts/sonido.js` sintetiza los archivos desde cero. No se descarga nada.

Por qué así y no una librería libre:

- **Riesgo cero de Content ID.** Una reclamación bloquea la monetización del
  video entero, aunque sean dos segundos. Con música gratuita de banco eso pasa
  igual cuando alguien registra la pista en un distribuidor. Con música que
  salió de nuestro propio código, no hay a quién reclamar.
- **Es realmente nuestra.** El sello sonoro es identidad de marca. Que dependa
  de la licencia de un tercero que puede cambiar de términos es un pasivo.
- **Coherente con el proyecto.** El canal es "producido por código". La música
  también.
- **Variantes gratis.** Cambiar una nota es cambiar una línea.

Cómo suena: síntesis aditiva con parciales de barra percutida (fundamental más
armónicos que se apagan antes que el fundamental, que es lo que hace que suene
a algo golpeado y no a un pitido). Timbre entre marimba y campana suave.

    node scripts/sonido.js

Escribe WAV mono 44,1 kHz en `public/musica/`. Remotion reproduce WAV directo.

## El motivo: re - la - re

Tres notas. Quinta justa más octava: el intervalo más neutro que existe, ni
mayor ni menor, así que no suena alegre ni trágico. Sobrio, que es el tono del
canal. Todo lo demás son variaciones del mismo motivo, para que el oído lo
reconozca sin que se vuelva repetitivo.

| Archivo | Duración | Qué es | Volumen |
|---|---|---|---|
| `sello.wav` | 2,6 s | Apertura. El motivo completo, con octava grave de peso. Único lugar donde se oye entero. | 0,5 |
| `cortina-a.wav` | 1,05 s | Transición de sección: la4 → re5 | 0,85 |
| `cortina-b.wav` | 1,05 s | Transición: re4 → la4 | 0,85 |
| `cortina-c.wav` | 1,05 s | Transición: fa4 → re5 | 0,85 |
| `cierre.wav` | 3,2 s | El motivo al revés y bajando, cola larga | 0,6 |

Las cortinas son **dos notas, no tres**: el motivo insinuado, no repetido. Y son
tres variantes que se alternan, para que dentro de un mismo video las
transiciones no suenen calcadas. Eso es deliberado: la repetición mecánica es
exactamente la señal que queremos evitar.

## Las cortinas visuales: sí, pero con presupuesto duro

La pregunta era si va imagen de sección junto con la melodía y alguna
transición. Sí, con tres precisiones.

**No son imágenes, son tarjetas.** Sigue firme la decisión de no usar fotos ni
ilustraciones generadas. `CortinaSeccion` en `src/tarjetas.tsx` es tipografía y
una línea de color: el nombre de la sección en serif grande sobre papel, con la
línea del color de esa sección cruzando la pantalla. La transición **es** el
trazo: no hay efecto encima, la línea que cruza hace de barrido.

**1,1 segundos y ni un frame más.** Es lo único del video que no aporta
información. Está en el código como `CORTINA_SEG` con ese comentario: si alguna
vez hay que recortar el video, se recorta aquí primero. Cuatro secciones son 4,4
segundos de nada; a 1,5 s ya serían 6 s y empieza a doler en retención.

**La primera sección no lleva.** Ya está el sello de apertura. Dos aperturas
seguidas es una intro larga disfrazada, y eso no lo hacemos.

## La dependencia que hay que decir en voz alta

Una cortina a pantalla completa **tapa contenido hablado** si la narración no
calla en ese punto. Hoy la narración corre continua. Por eso las cortinas están
implementadas pero **apagadas por defecto**: solo se encienden cuando el
timeline trae `meta.cortinas`.

Encenderlas exige, en la Fase 1 (Azure):

1. Que el guion marque la pausa en cada `##`.
2. Que el TTS la produzca de verdad: `<break time="1200ms"/>` en SSML de Azure,
   dentro del mismo documento, para que los `WordBoundary` sigan siendo
   continuos y la alineación no se rompa.
3. Que `build-timeline.js` emita el evento de sección en el frame donde empieza
   la pausa, no donde termina la última palabra.

Mientras eso no exista, los archivos ya están generados y el componente ya está
probado, pero el video sale sin cortinas.

## Cómo se enciende

En el `meta` del timeline:

```json
"logo": "musica/sello.wav",
"cortinas": ["musica/cortina-a.wav", "musica/cortina-b.wav", "musica/cortina-c.wav"],
"cierre": "musica/cierre.wav",
"musica": null
```

`musica: null` es la parte importante: se acabó la cama.

## Decisiones abiertas

- ¿Se retira `informe.mp3` / `clave.mp3` de `public/musica/` o se dejan por si
  algún formato largo los pide? (Hay dos más en `revisar/`.)
- ¿La cortina lleva también el número de sección ("2 de 5")? Ayuda a la
  retención porque promete un final, pero agrega ruido tipográfico.
- ¿El cierre lleva una nota más grave todavía debajo? Hay que escucharlo en
  parlantes de teléfono antes de decidir: en audífonos se oye, en teléfono
  probablemente no.
- Escuchar `sello.wav` contra el `logo.mp3` actual y quedarse con uno. No se ha
  escuchado ninguno de los generados todavía.
