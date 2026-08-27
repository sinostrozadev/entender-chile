# Sonido del canal

**No hay cama musical.** Bajo la narración hay silencio. La música puntúa:
suena en la apertura, en cada cambio de sección y en el cierre, y nada más.
Ver `ideas/sonido-y-transiciones.md` y la decisión del 2026-08-27.

## Archivos generados por nosotros

Salen de `scripts/sonido.js` por síntesis, no se descargan:

    node scripts/sonido.js

    sello.wav        2,6 s   apertura, el motivo completo
    cortina-a.wav    1,05 s  transición de sección
    cortina-b.wav    1,05 s  transición de sección
    cortina-c.wav    1,05 s  transición de sección
    cierre.wav       3,2 s   final, el motivo bajando

Las tres cortinas se alternan dentro de un mismo video: la repetición mecánica
es una de las señales que mira la política de contenido no auténtico.

**Por qué generadas y no de un banco**: música que salió de nuestro propio
código no la puede reclamar Content ID, y una reclamación bloquea la
monetización del video entero aunque sean dos segundos. Además el sello sonoro
es identidad de marca: no conviene que dependa de la licencia de un tercero.

## Cómo se enciende en el timeline

    "logo": "musica/sello.wav",
    "cortinas": ["musica/cortina-a.wav", "musica/cortina-b.wav", "musica/cortina-c.wav"],
    "cierre": "musica/cierre.wav",
    "musica": null

`meta.cortinas` está apagado por defecto: la tarjeta de sección ocupa la
pantalla completa y taparía voz si la narración no calla ahí. Se enciende
cuando el TTS produzca la pausa en cada `##` (Fase 1 del plan de producción).

## Lo que queda de antes

`informe.mp3` y `clave.mp3` eran la cama continua. Siguen aquí hasta decidir si
se retiran; hoy el pipeline no debería usarlos. Si alguna vez vuelve a entrar
música prestada, la regla sigue siendo: solo libre de reclamos (YouTube Audio
Library o licencia activa), nunca nada con Content ID.

Nota: `public/*.mp3` de la raíz está gitignoreado (ahí van las narraciones);
esta subcarpeta no, para que viaje al repo y al render en la nube.
