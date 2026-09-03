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

## Banner del canal (arte de fondo, sin texto; el texto lo pone src/marca.tsx)

YouTube pide 2560x1440. Lo que se ve en TODOS los dispositivos es solo la
franja central de 1546x423; el escritorio muestra una franja de 2560x423 y la
TV la imagen completa. Por eso el motivo va a los extremos y el centro queda
limpio para "Entender Chile". Al recibirlo, guardar como
`public/fondos/banner-fondo.png` y regenerar con
`npx remotion still src/marca.tsx Banner out/marca/banner.png --props='{"fondo":"fondos/banner-fondo.png"}'`.

> Imagen horizontal 16:9 de 2560x1440 para el banner de un canal de noticias,
> estilo ilustración vectorial plana y elegante. Fondo azul marino profundo
> (#0F1A2B) con líneas topográficas muy sutiles, casi imperceptibles. En el
> borde DERECHO, la silueta larga del mapa de Chile de norte a sur, rellena
> con texturas de cobre (#B5642F, #D08A5B) y algunas franjas crema (#EDE6DA),
> acabado metálico suave, ocupando como máximo el 15% del ancho. En el borde
> IZQUIERDO, un detalle abstracto pequeño de líneas de cobre, discreto. La
> franja horizontal CENTRAL de la imagen (el 60% del ancho y el 30% del alto,
> centrada) completamente despejada y oscura, sin ningún elemento, porque ahí
> irá el nombre del canal. Sin texto, sin letras, sin logos, sin marcas de
> agua, sin personas, sin fotografías. Composición limpia y simétrica en
> peso, mucho espacio negativo, iluminación uniforme.

## Fondos por sección (pedidos por Santiago, 02-09 en la noche)

Uno por sección recurrente, para TENER en reserva (la decisión de usarlos
dentro del video es la disputa 1, aún abierta; mientras, el plan A son las
texturas por código de src/fondos.tsx). Guardarlos como
`public/fondos/seccion-<nombre>.png`. Todos comparten el estilo de la casa;
lo único que cambia es el motivo y el pictograma de la esquina.

PLANTILLA COMÚN (pegar antes de cada motivo):
"Imagen horizontal 16:9. Fondo de papel frío gris verdoso muy claro (#F2F2EF)
con una ilustración lineal MUY tenue estilo grabado editorial, en tinta gris
oscura (#17191C) al 8% de opacidad, con un único acento verde pátina de cobre
(#2F7263) usado con muchísima moderación. Sobrio, elegante, sin texto, sin
personas reconocibles, sin logos de marcas. El tercio izquierdo y el centro
quedan casi vacíos (ahí irá texto superpuesto). En la esquina inferior
derecha, un pictograma pequeño de una sola línea en verde pátina (60 px
aprox) que identifique la sección: [PICTOGRAMA]. Motivo de fondo:
[MOTIVO]."

| Sección | [PICTOGRAMA] | [MOTIVO] |
|---|---|---|
| Economía | una línea de gráfico que sube y baja con una flecha fina | pauta de papel milimetrado muy tenue con una curva de serie económica que cruza el tercio derecho |
| Seguridad y justicia | una balanza de la justicia minimalista | rayado diagonal fino tipo aguafuerte, más denso hacia la esquina superior derecha |
| Política y Congreso | el frontis del ex Congreso: cuatro columnas y frontón, en cinco trazos | trama de puntos de rotativa de diario, desvaneciéndose hacia el centro |
| Chile en regiones | el contorno alargado de Chile en un solo trazo | curvas de nivel topográficas de una cordillera, concentradas a la derecha |
| Clima y emergencias | una nube con tres gotas, nada más (sin fuego ni rayos) | isobaras muy tenues SOLO en el tercio derecho; el centro completamente vacío (v2 del 03-09: la v1 puso una nube al centro, donde va el texto) |
| Salud | una cruz de línea fina dentro de un círculo | trama de líneas de electrocardiograma casi planas que cruzan el tercio inferior |
| Educación y ciencia | un libro abierto con un átomo encima | renglones tenues + libro abierto SOLO, apoyado, estrictamente sin manos ni cuerpo humano (v2 del 03-09: la v1 trajo una mano) |
| Internacional | un globo con meridianos, tres trazos | meridianos y paralelos de un mapamundi en proyección suave, desvanecidos hacia el centro |
| Plata pública | una lupa sobre una moneda LISA | libro contable tenue a la derecha + lupa sobre moneda lisa: círculo con borde acanalado, SIN rostro, números ni inscripciones (v2 del 03-09: la v1 trajo cara y texto inventado) |
| Dato curioso | un signo de interrogación dentro de un rombo | constelación de puntos unidos por líneas finas, esquina superior derecha |

Regla al recibirlos: reducir a 200 px de ancho y comprobar que NO compiten
con texto encima; si un fondo se nota más que el titular, se descarta o se
baja su opacidad en edición.
