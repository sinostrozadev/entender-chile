Tarea: imagen
Salida: contenido/caratulas/listas/2026-11-25-largo-recesion-tecnica-dos-centesimas.png
Prompt: prompts/imagen-caratula.md
Canal: Entender Chile (@entenderchile)
Para: largo "¿Recesión técnica por dos centésimas? Qué cambia y qué no", sale mié 2026-11-25 19:00 (id 2026-11-25-largo-recesion-tecnica-dos-centesimas)

# Carátula del largo "recesión técnica" (fórmula de la skill caratulas-con-gpt §2b)

> ESTADO: el largo está en borradores y rechazado por el revisor; no enviar hasta que el guion esté aprobado y en `contenido/semana/`.
> ANTES DE ENVIAR (lo hace la sesión que fusiona, no GPT): confirmar que tras las Cuentas Nacionales del 18-11-2026 el segundo
> trimestre sigue en caída contra el trimestre anterior. Si cambió, se rehace el titular de abajo (no se envía este pedido tal cual).

## El prompt (va tal cual al generador, no se reinterpreta)

Crea una carátula de YouTube para un video largo explicativo de economía de un canal chileno de noticias explicadas con datos oficiales. Tono serio y claro, sin alarmismo.

DATOS QUE YO ENTREGO
SUJETO (línea 1, letra enorme, mayúsculas): CHILE
CAJA DE TENSIÓN (línea 2, dentro de una caja de color cobre, mayúsculas, exacta): RECESIÓN TÉCNICA
LÍNEA PEQUEÑA (debajo de la caja, exacta): ¿POR 0,02 %?
IMAGEN HÉROE: un gráfico de barras que cae, a sangre completa. Dos columnas cobre que bajan desde una línea de cero hacia abajo: la primera larga y la segunda casi pegada a la línea de cero (apenas un rasguño). Detrás, tenue y en gris azulado, la silueta alargada de Chile de norte a sur. Fondo azul marino casi negro.

TU TAREA
Diseña la carátula con estas reglas fijas. No son sugerencias.

FORMATO
16:9 horizontal, mínimo 1280x720, PNG. El texto VA DENTRO de la imagen, exacto como lo entrego, y debe leerse perfecto a 160 píxeles de ancho (así se ve en un teléfono).

LA REGLA PRINCIPAL: QUE SE ENTIENDA QUIÉN Y QUÉ EN MEDIO SEGUNDO
Sin leer el título del video, se entiende que es sobre CHILE y sobre una recesión técnica. Por eso CHILE va escrito, grande y nombrado, y no solo sugerido por la silueta.

COMPOSICIÓN
- Imagen héroe a sangre, ocupando todo el cuadro (nada de collage ni de recortes pegados).
- Arriba a la izquierda: CHILE en blanco roto, tipografía sans condensada muy pesada. Justo debajo, la caja cobre con RECESIÓN TÉCNICA en letra oscura, bordes levemente irregulares como papel recortado. Debajo de la caja, la línea pequeña ¿POR 0,02 %? en blanco roto.
- Un solo acento de color: el cobre (las dos columnas y la caja). El resto, azul marino, gris azulado y blanco roto.
- La esquina inferior derecha queda LIBRE (YouTube pone ahí la duración).
- Marca pequeña y discreta, abajo a la izquierda: ENTENDER CHILE, en mayúsculas espaciadas.
- Ningún otro texto, ninguna cifra extra, sin ejes ni rejilla.

PROHIBIDO
Rostros de personas, reales o inventados. Banderas como fondo. Logos, escudos, nombres de medios o de instituciones. Billetes, monedas, signos de dólar. Flechas gigantes, círculos, signos de exclamación, emojis, rojo o amarillo de tabloide, estética de collage, 3D plástico. Cualquier texto que no sea CHILE, RECESIÓN TÉCNICA, ¿POR 0,02 %? y ENTENDER CHILE.

TEXTO
Español con tildes correctas. Sin raya larga ni media. Revisa letra por letra que CHILE, RECESIÓN TÉCNICA y ¿POR 0,02 %? digan exactamente lo que entregué.

PRUEBA FINAL ANTES DE ENTREGAR
¿Sin leer el título se entiende que es sobre Chile y una recesión técnica? ¿Se lee todo a 160 px? ¿Hay un solo acento (cobre) y ninguna cara? ¿La esquina inferior derecha está limpia? Si algo falla, corrígelo antes de generar.

## Qué entrega GPT (reglas del canal de pedidos)
1. Un PNG VÁLIDO, 16:9, mínimo 1280x720, en la ruta EXACTA de `Salida:` (rama main), subido como binario.
2. Comprobar que llegó entero: leerlo de vuelta desde main, mismo tamaño en bytes, empieza con la firma PNG (89 50 4E 47) y termina con IEND (`producir.mts` rechaza PNG de menos de 20 KB o truncados).
3. Dejar el prompt que usó en `contenido/caratulas/listas/2026-11-25-largo-recesion-tecnica-dos-centesimas-prompt.txt`.
4. Si no pudo: `contenido/caratulas/listas/2026-11-25-largo-recesion-tecnica-dos-centesimas-NO-PUDE.md` con qué intentó y el error textual.
