Tarea: imagen
Salida: contenido/caratulas/listas/2026-11-25-largo-el-cobre-que-no-salio.png
Prompt: prompts/imagen-caratula.md
Canal: Entender Chile (@entenderchile)
Para: largo "El cobre que no salió: por qué el PIB de Chile cayó 1,1 %", sale mié 2026-11-25 19:00 (id 2026-11-25-largo-el-cobre-que-no-salio)

# Carátula del largo "El cobre que no salió" (plan B: PIB del 3.er trimestre) (fórmula de la skill caratulas-con-gpt §2b)

> ESTADO (18-11-2026): reescrito para el plan B tras las Cuentas Nacionales del 18-11 (PIB 3.er trimestre -1,1 %, minería -14,7 %, resto +1,0 %). Ya NO dice "recesión técnica": con la revisión el 2.º trimestre quedó en 0,0 %. Enviar solo cuando el guion esté aprobado y en `contenido/semana/`.

## El prompt (va tal cual al generador, no se reinterpreta)

Crea una carátula de YouTube para un video largo explicativo de economía de un canal chileno de noticias explicadas con datos oficiales. Tono serio y claro, sin alarmismo.

DATOS QUE YO ENTREGO
SUJETO (línea 1, letra enorme, mayúsculas): CHILE
CAJA DE TENSIÓN (línea 2, dentro de una caja de color cobre, mayúsculas, exacta): CAYÓ 1,1 %
LÍNEA PEQUEÑA (debajo de la caja, exacta): LA MINERÍA, 14,7 %
IMAGEN HÉROE: un gráfico de dos barras, a sangre completa. Una columna cobre muy larga que cae desde una línea de cero hacia abajo (la minería) y, a su lado, una columna corta gris azulada que sube apenas sobre la línea de cero (el resto de la economía). Detrás, tenue y en gris azulado, la silueta alargada de Chile de norte a sur. Fondo azul marino casi negro.

TU TAREA
Diseña la carátula con estas reglas fijas. No son sugerencias.

FORMATO
16:9 horizontal, mínimo 1280x720, PNG. El texto VA DENTRO de la imagen, exacto como lo entrego, y debe leerse perfecto a 160 píxeles de ancho (así se ve en un teléfono).

LA REGLA PRINCIPAL: QUE SE ENTIENDA QUIÉN Y QUÉ EN MEDIO SEGUNDO
Sin leer el título del video, se entiende que es sobre CHILE y sobre una caída ligada a la minería. Por eso CHILE va escrito, grande y nombrado, y no solo sugerido por la silueta.

COMPOSICIÓN
- Imagen héroe a sangre, ocupando todo el cuadro (nada de collage ni de recortes pegados).
- Arriba a la izquierda: CHILE en blanco roto, tipografía sans condensada muy pesada. Justo debajo, la caja cobre con CAYÓ 1,1 % en letra oscura, bordes levemente irregulares como papel recortado. Debajo de la caja, la línea pequeña LA MINERÍA, 14,7 % en blanco roto.
- Un solo acento de color: el cobre (la columna larga y la caja). El resto, azul marino, gris azulado y blanco roto.
- La esquina inferior derecha queda LIBRE (YouTube pone ahí la duración).
- Marca pequeña y discreta, abajo a la izquierda: ENTENDER CHILE, en mayúsculas espaciadas.
- Ningún otro texto, ninguna cifra extra, sin ejes ni rejilla.

PROHIBIDO
Rostros de personas, reales o inventados. Banderas como fondo. Logos, escudos, nombres de medios o de instituciones. Billetes, monedas, signos de dólar. Flechas gigantes, círculos, signos de exclamación, emojis, rojo o amarillo de tabloide, estética de collage, 3D plástico. Cualquier texto que no sea CHILE, CAYÓ 1,1 %, LA MINERÍA, 14,7 % y ENTENDER CHILE.

TEXTO
Español con tildes correctas. Sin raya larga ni media. Revisa letra por letra que CHILE, CAYÓ 1,1 % y LA MINERÍA, 14,7 % digan exactamente lo que entregué.

PRUEBA FINAL ANTES DE ENTREGAR
¿Sin leer el título se entiende que es sobre Chile y una caída por la minería? ¿Se lee todo a 160 px? ¿Hay un solo acento (cobre) y ninguna cara? ¿La esquina inferior derecha está limpia? Si algo falla, corrígelo antes de generar.

## Qué entrega GPT (reglas del canal de pedidos)
1. Un PNG VÁLIDO, 16:9, mínimo 1280x720, en la ruta EXACTA de `Salida:` (rama main), subido como binario.
2. Comprobar que llegó entero: leerlo de vuelta desde main, mismo tamaño en bytes, empieza con la firma PNG (89 50 4E 47) y termina con IEND (`producir.mts` rechaza PNG de menos de 20 KB o truncados).
3. Dejar el prompt que usó en `contenido/caratulas/listas/2026-11-25-largo-el-cobre-que-no-salio-prompt.txt`.
4. Si no pudo: `contenido/caratulas/listas/2026-11-25-largo-el-cobre-que-no-salio-NO-PUDE.md` con qué intentó y el error textual.
