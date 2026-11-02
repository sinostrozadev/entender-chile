# Taller de voz · ronda 2: voces, no trucos

Prueba del 2026-09-24.

Santiago escuchó la ronda 1 y descartó las tres variantes que tocan la
interpretación a mano: el tono "suena artificial", el ritmo por frase
"tampoco", y del estilo noticiero "no detecto el cambio". Así que esta
ronda cambia de camino: se prueban VOCES y AIRE, no interpretación.

## Voces que Azure declara para es-CL

| Voz | Género | Estilos |
|---|---|---|
| `es-CL-CatalinaNeural` | femenina | ninguno |
| `es-CL-LorenzoNeural` | masculina | ninguno |

## Variantes

| Variante | Qué prueba | ¿Funcionó? |
|---|---|---|
| **v-catalina** · Voz es-CL-CatalinaNeural, tal cual | Sin ningún truco: solo la velocidad de siempre. Lo que se compara es la voz, no la interpretación. | ✅ 480 KB |
| **v-lorenzo** · Voz es-CL-LorenzoNeural, tal cual | Sin ningún truco: solo la velocidad de siempre. Lo que se compara es la voz, no la interpretación. | ✅ 446 KB |
| **aire-puntuacion** · Aire por puntuación, sin dirigir frase por frase | mstts:silence agrega silencio en comas y puntos de forma pareja. Es lo contrario de la ronda 1: el aire lo pone la puntuación, no yo. | ✅ 420 KB |
| **lento** · Más lento, y nada más | La misma voz al 84% en vez del 90%. A veces lo único que falta es tiempo para respirar. | ✅ 478 KB |
| **procesada-sola** · La voz tal cual, solo procesada | Compresión suave, menos barro en 180 Hz, más presencia en 3,2 kHz y volumen parejo. Sobre v-catalina.mp3, sin ningún SSML de interpretación. | ✅ lista |

## Texto usado

> La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas. La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve. ¿Qué pasa ahora con el proyecto? El Gobierno todavía puede pedir que el Senado revise la reforma.
