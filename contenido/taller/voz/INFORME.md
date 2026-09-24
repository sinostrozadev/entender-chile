# Taller de voz: qué se puede y qué no

Prueba del 2026-09-24. Mismo párrafo, varias formas de decirlo. Se decide escuchando.

| Variante | Qué prueba | ¿Funcionó? |
|---|---|---|
| **1-actual** · Como suena hoy | Una sola velocidad al 90% y nada más. Es la referencia contra la que se comparan las otras. | ✅ 446 KB |
| **2-ritmo** · Velocidad y pausas por tipo de frase | La tesis más lenta, la cifra con una pausa antes para que pese, la pregunta con aire después. Solo prosody y break: esto funciona seguro. | ✅ 516 KB |
| **3-tono** · Ritmo más movimiento de tono | Lo anterior, y además el tono sube en la pregunta y baja en el cierre. Es lo que hace que una voz suene viva y no leída. | ✅ 516 KB |
| **4-dos-voces** · Segunda voz para la cita | La regla 31 permite dos voces cuando el cambio significa algo. Una cita leída por otra voz se entiende como cita sin decir comillas. | ✅ 491 KB |
| **5-estilo-noticiero** · Estilo noticiero (PUEDE FALLAR) | mstts:express-as con estilo newscast. No sé si las voces chilenas lo soportan; si Azure lo rechaza, queda escrito acá y dejamos de preguntárnoslo. | ✅ 456 KB |
| **6-enfasis-y-siglas** · Énfasis y siglas (PUEDE FALLAR EL ÉNFASIS) | emphasis sobre la palabra que importa, y sub para que una sigla se lea expandida sin tocar el texto del guion. | ✅ 213 KB |
| **7-procesada** · La misma voz, procesada | Compresión suave, menos barro en 180 Hz, más presencia en 3,2 kHz y volumen parejo. Hecha sobre 3-tono.mp3. | ✅ lista |

## Texto usado

> La Cámara rechazó por un voto ampliar la detención para ejecutar expulsiones administrativas. La reforma obtuvo ochenta y ocho votos a favor. Necesitaba ochenta y nueve. ¿Qué pasa ahora con el proyecto? El Gobierno todavía puede pedir que el Senado revise la reforma.

Lleva a propósito una tesis, una cifra, una pregunta y una cita: si una
variante mejora la cifra pero arruina la cita, con un texto pobre no nos
daríamos cuenta.
