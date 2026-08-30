# Prompts para los fondos verticales (Gemini / Imagen)

Reglas que aprendimos con el primer fondo (30-08-2026): el texto va a la
izquierda, así que el 60% izquierdo debe estar casi vacío y oscuro; el mapa
o el motivo va en el tercio derecho; sin texto, sin marca de agua, sin
figuras decorativas grandes (las "tarjetas" flotantes del primer fondo
competían con la cifra); resolución nativa vertical (1080x1920 o más).
Paleta del canal: marino `#0F1A2B`, cobre `#B5642F` y `#D08A5B`, crema
`#EDE6DA`, pátina `#2F7263`.

## Fondo del Short del informe (versión 2, opcional)

> Fondo vertical 9:16 (1080x1920) para un video de noticias, estilo ilustración
> vectorial plana y elegante. Fondo azul marino profundo (#0F1A2B) con líneas
> topográficas muy sutiles, casi imperceptibles, en un tono apenas más claro.
> En el tercio DERECHO, la silueta larga del mapa de Chile de norte a sur,
> rellena con texturas de cobre (#B5642F, #D08A5B) y algunas franjas crema
> (#EDE6DA), con acabado metálico suave. El 60% IZQUIERDO completamente
> despejado y oscuro, sin elementos, porque ahí irá texto. Sin texto, sin
> letras, sin logos, sin marcas de agua, sin personas, sin fotografías.
> Composición limpia, mucho espacio negativo, iluminación uniforme.

## Fondo del Short de la Clave

La Clave explica conceptos, no noticias del día: conviene que se distinga
del Short del informe de un vistazo, con la misma familia visual. Propuesta:
mismo estilo, color dominante **verde pátina oscuro** en vez de marino, y en
vez del mapa, un motivo de "entender": líneas que se ordenan.

> Fondo vertical 9:16 (1080x1920) para una serie de videos explicativos,
> estilo ilustración vectorial plana y elegante. Fondo verde pátina muy
> oscuro (#14332C) con líneas topográficas muy sutiles. En el tercio DERECHO,
> un motivo abstracto de líneas finas de cobre (#B5642F, #D08A5B) que entran
> enredadas por abajo y se van ordenando en líneas paralelas limpias hacia
> arriba (la idea: algo confuso que se vuelve claro), con pequeños acentos
> crema (#EDE6DA). El 60% IZQUIERDO completamente despejado y oscuro, sin
> elementos, porque ahí irá texto. Sin texto, sin letras, sin logos, sin
> marcas de agua, sin personas, sin fotografías. Composición limpia, mucho
> espacio negativo.

Al recibirlo: guardar como `public/fondos/fondo-clave-vertical.png`;
`scripts/short.js --clave` lo toma solo si existe (si no, usa el del mapa).
Si Gemini entrega 768 px de ancho, pedir "en la máxima resolución" o
exportar a 2K: a 1080 se escala 1,4x y se nota poco, pero mejor nativo.
