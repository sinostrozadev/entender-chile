# Voz para el canal: qué usar para probar y qué para producir

Estado: INVESTIGADO (2026-08-27). Pregunta de Santiago: probar con una voz
gratuita antes de clonar la suya.

ADVERTENCIA DE MÉTODO: el proxy bloqueó los sitios de precios de casi todos
los proveedores (elevenlabs.io, aws, azure, openai, cartesia). Solo se pudo
leer directamente la página de Google Cloud. El resto son fragmentos
indexados del dominio oficial, marcados como tales. Verificar antes de
contratar. Los volúmenes se calcularon sobre 500.000 a 900.000 caracteres al
mes (informe + Clave, a diario).

## La recomendación

**Para probar ahora: Azure AI Speech, capa gratuita F0.**
500.000 caracteres al mes, **gratis de forma permanente** (no es un trial de
30 días), con **uso comercial permitido** (Microsoft respondió explícitamente
en su foro que la capa gratuita es un nivel de precio, no una licencia
distinta). Y lo mejor:

**Es el único proveedor con voces entrenadas en español de CHILE**:
`es-CL-CatalinaNeural` y `es-CL-LorenzoNeural`. Descritas como hablantes
santiaguinas, con /s/ aspirada y ritmo local. Ni Google, ni Amazon, ni
ElevenLabs tienen locale es-CL formal.

Con 500.000 caracteres gratis al mes cabe el informe diario completo sin
pagar un peso, y si se pasa, S0 cuesta USD 16 por millón: unos **USD 14 al
mes** por el volumen completo de los dos formatos. Es la opción más barata
con voz chilena real.

**Para producción con tu voz clonada: ElevenLabs.** Es el único del grupo que
combina clonación profesional simple con alineación por caracter en la misma
llamada. La clonación de Azure existe pero es de acceso restringido: hay que
postular y ser aprobado, y la versión profesional solo está para clientes
gestionados por equipos de cuenta de Microsoft. Eso es fricción que no
queremos en el camino crítico.

## El hallazgo que desbloquea todo

**El requisito de "timestamps por caracter" no es un filtro real.**

Hoy `tts-elevenlabs.js` pide alineación por caracter porque ElevenLabs la
da. Pero las tarjetas se disparan en fronteras de frase o de palabra, nunca
en el caracter 7 de una palabra. Con alineación **por palabra** basta:
se reparte el intervalo proporcionalmente entre sus caracteres y el
resultado es idéntico en pantalla.

Eso amplía el campo de golpe: Azure (`WordBoundary` con offset y duración),
Google WaveNet (marcas SSML `<mark>`, que además **no cuentan para la
facturación**), Cartesia y Polly cumplen. El filtro real es "por palabra o
mejor".

Trabajo que implica: un adaptador de palabra a caracter en el pipeline. Es
chico y hay que hacerlo igual (ver más abajo).

## Tabla

| Opción | Costo | Timestamps | Chile | Comercial | Local |
|---|---|---|---|---|---|
| **Azure AI Speech** | F0: 500k/mes gratis permanente. S0: USD 16 por 1M | sí, por palabra | **sí, es-CL** | sí | no |
| Google WaveNet | **4M/mes gratis permanente**, luego USD 4 por 1M | sí, por marcas SSML (gratis) | no | sí | no |
| Google Chirp 3 HD | 1M/mes gratis, luego USD 30 por 1M | **no** (no acepta SSML) | no | sí | no |
| Amazon Polly Neural | 1M/mes gratis **solo 12 meses**, luego USD 16 por 1M | sí, pero **se cobran aparte** (duplica el gasto) | no | sí | no |
| **ElevenLabs** | Free 10k, Starter 6, Creator 22, Pro 99, Scale 299 USD/mes | **sí, por caracter** | voces chilenas de comunidad + clonación | **sí, salvo el Free** | no |
| Cartesia Sonic | ~USD 50 por 1M (sin confirmar) | sí, por palabra | sin confirmar | sí | no |
| OpenAI TTS | ~USD 15/mes estimado | **no** | genérico | sí | no |
| Kokoro 82M | gratis | sí, derivables | 3 voces es, irregular | **sí, Apache 2.0** | **sí, CPU** |
| Piper | gratis | experimental desde 1.3.1 | es_MX, es_AR | código sí, **cada voz tiene licencia propia** | **sí, CPU** |
| Chatterbox v3 | gratis | no | sí, clona | **sí, MIT** | sí (GPU) |

## Las trampas, que son varias

**XTTS v2 y F5-TTS: gratis pero NO comercial.** Es el error clásico. Los
pesos de XTTS están bajo licencia estrictamente no comercial, y como Coqui
cerró en enero de 2024 **ya no existe nadie a quien comprarle la licencia**.
F5-TTS tiene código MIT pero pesos CC-BY-NC. Quedan fuera para un canal
monetizado. (Alternativa limpia: OpenF5-TTS-Base, Apache 2.0.)

**ElevenLabs Free no sirve.** No incluye licencia comercial y obliga a poner
"elevenlabs.io" en el título de lo que publiques. Descartado por licencia,
no por volumen.

**edge-tts: zona gris.** Da las mismas voces chilenas de Azure, gratis y sin
cuenta, pero no está afiliado a Microsoft y su foro responde que usar esos
endpoints comercialmente viola los términos. Además se cae seguido (cortes
por token en enero 2026, bloqueo de IPs de datacenter). Para un canal que
debe ser monetizable, no. Como banco de pruebas local desechable, sirve.

**PlayHT ya no existe.** Meta compró al equipo; la API se apagó el 26 de
julio de 2025 y la plataforma se dio de baja el 31 de diciembre, borrando
cuentas y clones sin ruta de migración. Ni considerarlo.

**Kokoro no pronuncia bien los números ni expande siglas.** En un noticiario
lleno de cifras, fechas y siglas eso es descalificador sin un normalizador
propio bastante serio.

**Polly cobra los timestamps aparte**, como una segunda síntesis: pedir audio
y marcas cuesta el doble (unos USD 29/mes por nuestro volumen).

## Lo que conviene construir igual: alineación forzada propia

Si el pipeline calcula los timestamps a partir del guion y el audio (en vez
de pedírselos al proveedor), **queda desacoplado del proveedor**: se puede
cambiar de TTS sin tocar la capa de sincronía. Como vamos a migrar de una voz
de prueba a la voz clonada, vale la pena tenerlo.

Tres opciones, de menor a mayor peso:
- **aeneas**: la más liviana y probablemente la adecuada. Alinea un texto
  CONOCIDO contra un audio conocido, sin transcribir. Como ya tenemos el
  guion exacto, es justo nuestro caso, y a nivel de frase o línea basta.
- **WhisperX**: por defecto de la industria, licencias limpias (BSD-2 y MIT).
  Hay un issue abierto reportando menor precisión que MFA.
- **Montreal Forced Aligner**: el más preciso, pero instalación pesada y
  necesita diccionario de pronunciación (en Chile eso significa mantener uno
  propio para apellidos y topónimos).

## Costo real por escenario

- **Pruebas ahora**: USD 0 con Azure F0 (500k/mes) o Google WaveNet (4M/mes).
- **Producción sin clonar**: ~USD 14/mes con Azure S0, con voz chilena.
- **Producción con voz clonada**: ElevenLabs. Con el modelo Multilingual v2
  el volumen completo pide Scale (USD 299). Con Flash v2.5 vía API el consumo
  se reduce a la mitad y **Pro (USD 99) alcanzaría**. Falta verificar si el
  endpoint `with-timestamps` funciona con Flash: eso decide 99 contra 299.

## Recomendación operativa

1. **Ahora**: cuenta de Azure, capa F0, voz `es-CL-LorenzoNeural` para el
   informe. Cero costo, licencia comercial, acento chileno real.
2. **Adaptador palabra a caracter** en el pipeline (chico) para que
   `build-timeline.js` reciba lo que espera.
3. **Alineación forzada con aeneas** como respaldo, para no quedar amarrados.
4. **Al clonar tu voz**: ElevenLabs Creator (USD 22) para hacerla, y decidir
   Pro o Scale según el volumen real y la respuesta sobre Flash.
5. **Normalizar el texto antes de enviarlo** en cualquier motor: cifras,
   porcentajes, fechas y siglas escritas en palabras (ya está en los prompts
   del guion) y `<phoneme>` de SSML para nombres propios problemáticos
   (Azure, Google y Polly lo soportan; ElevenLabs no).

## Sobre la política de YouTube

Ninguna herramienta prohíbe el uso monetizado, salvo las tres trampas ya
dichas (Free de ElevenLabs, XTTS, F5-TTS oficial). Sobre el canal: desde
julio de 2025 la regla de "contenido repetitivo" se llama "contenido no
auténtico" y desmonetiza producción en masa con voz sintética **sin aporte
creativo**. No se prohíbe la IA: se prohíbe la industria sin criterio
editorial. Un noticiario con selección propia, contexto y datos verificados
no cae ahí por usar TTS.

## Por verificar antes de pagar

- Los planes de ElevenLabs: los fragmentos oficiales dan Creator 121k, Pro
  600k, Scale 1,8M, pero varios comparadores publican cifras distintas
  (Creator 100k, Pro 500k, Scale USD 330). Mirar en la cuenta.
- **Si `with-timestamps` funciona con Flash v2.5.** Decide USD 99 contra 299.
- Cómo interactúa la capa F0 de Azure con S0 al pasarse de los 500k.
- Si Cartesia tiene voces chilenas y su precio oficial.
