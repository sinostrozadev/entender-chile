# La voz de Entender Chile (comparación del 13-11-2026)

## Cómo se generaba hasta el 18-11-2026

| | Hoy (cadena vieja) |
|---|---|
| Proveedor | Azure AI Speech, SDK oficial (`microsoft-cognitiveservices-speech-sdk`), script `scripts/tts-azure.js` (retirado en la rama `estrategia-a`; queda en la historia de git) |
| Voz | `es-CL-LorenzoNeural` a −10 % de velocidad, SSML con pausas `<break>` por sección |
| Dónde corre | GitHub Actions, en `edicion-diaria.yml` (pasos 3 y 3b) |
| Secretos | `AZURE_SPEECH_KEY`, `AZURE_SPEECH_REGION` y un respaldo pagado `AZURE_SPEECH_KEY2` / `AZURE_SPEECH_REGION2` |
| Cuota y costo | Recurso F0: 500.000 caracteres al mes gratis. Al agotarse, el script cae al recurso S0 y se paga el exceso (~US$16 por millón de caracteres). Es el único punto de la cadena que podía generar un cobro |

## Los canales hermanos

En Números Rojos y Línea Punteada usan **Edge TTS** con el paquete `msedge-tts` (`numeros-rojos/scripts/voz.mts`):
gratis, sin clave, sin cuota publicada, funciona igual en el PC y en Actions. Reglas que ya pagaron su
aprendizaje: **tono único** (Santiago, 08-11-2026: "mejor que dejes siempre el mismo tono"; el servicio no acepta
SSML, solo velocidad y tono por pedido) y **cifras con separador de miles convertidas a palabras** antes de mandar
el texto (es-MX lee "1.000" como decimal; `textoParaVoz`).

## La prueba

Misma frase de ~20 s con Edge TTS, generada en el PC el 13-11-2026:
- `Escritorio\bolita-canciones-preview\voz-EC-edge.mp3`: Edge, `es-CL-LorenzoNeural`, −4 %.
- `Escritorio\bolita-canciones-preview\voz-EC-edge-catalina.mp3`: Edge, `es-CL-CatalinaNeural`, −4 %.
- `Escritorio\bolita-canciones-preview\voz-EC-actual.mp3`: la voz actual, Azure Lorenzo, tomada del Short del
  12-11-2026 (release `edicion-2026-11-12`). **No es la misma frase**: generar la frase con Azure exigía la
  clave, que vive solo en los secretos de GitHub y no se tocó.

## Comparación

| | Azure (actual) | Edge TTS (propuesta) |
|---|---|---|
| Calidad | Lorenzo neural; admite SSML (pausas, énfasis) | **La misma voz neural Lorenzo** (Edge sirve el catálogo de voces neurales de Microsoft); sin SSML, solo velocidad y tono por pedido |
| Identidad del canal | es-CL, la voz que ya conoce la audiencia | Igual: mismo timbre y acento chileno |
| Costo | 0 hasta 500.000 caracteres/mes; después pago por exceso | 0 |
| Cuota | 500.000 caracteres/mes (el largo semanal de ~12.000 caracteres más 7 Shorts de ~800 caben de sobra) | sin cuota publicada |
| Secretos | dos claves (y dos de respaldo pagado) | ninguno |
| Riesgo | bajo: servicio oficial con SLA | **medio**: es el servicio de lectura en voz alta del navegador, no un producto con contrato; Microsoft ya lo cortó un par de veces y el paquete se actualizó. Si cae, no hay voz |
| Tiempos por palabra | WordBoundary | WordBoundary (mismo alineador) |

## Recomendación

**Edge TTS con `es-CL-LorenzoNeural` como voz por defecto de las plantillas nuevas**, con **Azure como respaldo
configurable**: `VOZ_PROVEEDOR=azure` en `producir.yml` usa el SDK oficial con la misma voz y los secretos que ya
existen (`video/scripts/voz.mts`). Motivos: es la misma voz que el canal ya tiene (no se pierde identidad), cuesta
cero sin tope, no necesita secretos y es lo que ya funciona en los dos canales hermanos. El riesgo de que Edge se
caiga se cubre con el respaldo, que es un cambio de una línea. No se mezclan proveedores dentro de una semana.

Lo que Santiago puede hacer para decidir de oído: escuchar `voz-EC-edge.mp3` y `voz-EC-actual.mp3`. Si prefiere
Catalina (voz femenina), el cambio es `"voz": "es-CL-CatalinaNeural"` en el guion o en `VOZ_POR_DEFECTO`.
