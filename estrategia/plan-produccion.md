# El plan: de aquí al primer video que se puede publicar

Estado: DECIDIDO (2026-08-27), tras la investigación de voz e imágenes.
Se ejecuta en orden: cada fase desbloquea la siguiente.

## Las decisiones que ordenan todo

1. **Voz: Azure AI Speech, capa F0** para probar (gratis permanente, uso
   comercial, voces chilenas reales). ElevenLabs después, solo para clonar la
   voz de Santiago.
2. **Imágenes: ninguna.** Ni fotos ni generadas. Miniatura tipográfica hecha
   con Remotion.
3. **Datos: sí.** Datos abiertos del Estado (CC0) y mapas vectoriales de la
   BCN. Es nuestro material visual y es mejor que cualquier ilustración.
4. **Música: pasa de cama a puntuación** cuando llegue la voz (ver Fase 2).

## Fase 0: la cuenta de Azure (SANTIAGO, bloquea todo)

Nada avanza hasta esto. Pasos:
1. Crear cuenta en Azure (portal.azure.com) y un recurso de "Speech Service".
2. Elegir la capa **F0 (gratuita)**, no S0. Son 500.000 caracteres al mes.
3. Copiar la clave y la región del recurso.
4. Cargarlas como secrets del repositorio en GitHub:
   `AZURE_SPEECH_KEY` y `AZURE_SPEECH_REGION`.

Verificar al crearla: que la región elegida ofrezca las voces es-CL. Si no
aparecen, cambiar de región.

## Fase 1: la voz en el pipeline (CLAUDE, una sesión)

1. **`scripts/tts-azure.js`**, hermano de `tts-elevenlabs.js`. Sintetiza con
   `es-CL-LorenzoNeural` y captura los eventos `WordBoundary` (offset y
   duración por palabra).
2. **Adaptador palabra a caracter**: reparte el intervalo de cada palabra
   proporcionalmente entre sus caracteres, y produce el mismo `alignment.json`
   que `build-timeline.js` ya espera. Cero cambios aguas abajo.
3. **`dia.js`**: la bandera `--voz` elige proveedor según qué secret exista
   (Azure primero, ElevenLabs si algún día vuelve).
4. **Normalización previa**: el guion ya escribe cifras y siglas en palabras.
   Verificar que Azure las lea bien y, si no, usar `<phoneme>` de SSML para
   los nombres propios que salgan mal.
5. **Pausa en cada cambio de sección**: `<break time="1200ms"/>` en el mismo
   documento SSML, y que `build-timeline.js` emita el evento de sección donde
   empieza la pausa, no donde termina la última palabra. Sin esto las cortinas
   no se pueden encender: taparían voz. Ver `ideas/sonido-y-transiciones.md`.
6. **Segunda voz para las citas**: la narración va en Lorenzo y cada `[CITA]`
   la lee Catalina, en el mismo SSML. La frontera de la palabra ajena se oye
   sola. Normalizar sonoridad entre ambas antes de concatenar.

**Criterio de éxito**: un informe real, renderizado con voz chilena, con las
tarjetas sincronizadas. Ahí recién se sabe si esto funciona.

## Fase 2: escuchar y ajustar (SANTIAGO + CLAUDE)

1. **Escuchar el video completo.** Es el paso que no se automatiza nunca.
2. Juzgar: ¿la voz aguanta 10 minutos sin cansar? ¿pronuncia bien apellidos
   chilenos, cifras, siglas? ¿el ritmo calza con las tarjetas?
3. **Música a puntuación**: hecho y en el repo. `scripts/sonido.js` genera por
   síntesis el sello, tres cortinas de sección y el cierre; `CortinaSeccion`
   dibuja la tarjeta de 1,1 s. Falta solo escucharlos y encender `meta.cortinas`
   una vez que exista la pausa del punto 5 de la Fase 1. `musica: null`: se
   acabó la cama continua.
4. Si la voz no convence, alternativa inmediata: `es-CL-CatalinaNeural`, o
   Google WaveNet (4M caracteres gratis al mes, sin acento chileno).

## Fase 3: miniatura (CLAUDE, media sesión)

Composición tipográfica con `remotion still`: cifra enorme o tres palabras en
tinta sobre papel, barra verde, sin fotos. Se genera desde el mismo timeline,
sin herramienta externa, sin licencias, sin riesgo de divulgación.

Aprobada desde el 24-08 en ideas/ejecutar.md; ahora tiene camino claro.

## Fase 4: lo visual que sí nos distingue (CLAUDE, iterativo)

En este orden, porque así rinde:
1. **Cold open**: el dato más fuerte del día 3 a 5 segundos ANTES del sello.
   Sin cara, la retención de los primeros 30 segundos decide si el canal
   existe. Deja de ser mejora y pasa a requisito.
2. **Regla de los 5-7 segundos**: ninguna tarjeta muerta más de 6 segundos.
   Count-up en cifras, subrayados que se dibujan.
3. **Mapas de comunas** con datos de datos.gob.cl, en SVG. Simplificar con
   mapshaper antes del bundle (las 346 comunas pesan).
4. **Gráficos de serie larga** para los indicadores del país, reutilizables
   entre video y web.

## Fase 5: cumplimiento antes de publicar (SANTIAGO)

Lo que no se puede saltar:
1. Escuchar el audio completo de cada edición.
2. Marcar "contenido alterado" igual, aunque con Catalina y Lorenzo casi
   seguro no aplica: la divulgación apunta a voces realistas de personas
   reales.
3. Consentimiento escrito del uso de la voz, guardado. En suspenso mientras la
   clonación siga aparcada.
4. Registro de aporte editorial humano al día (decisiones.md, revisiones/).
5. Variación real entre ediciones: es la defensa de fondo contra la política
   de contenido inauténtico.

**Lo que hay que decir claro**: nada de esto garantiza la monetización. Sacar
la cama musical elimina uno de los tres elementos del ejemplo textual de la
política, pero quedan los otros dos (voz sintética y plantilla visual). La
defensa real no es técnica: es que el canal hace trabajo original que nadie
más hace (el seguimiento de la plata pública) y que ese trabajo se vea en el
video. Queda riesgo residual y no se puede reducir a cero por adelantado.

## El orden, en una línea

Cuenta Azure → voz en el pipeline → escuchar y ajustar → miniatura → cold
open y visuales → cumplimiento → publicar.

## Lo que NO está en el camino crítico

Indicadores del país, palabra del día, Shorts, canal de WhatsApp, Ko-fi. Todo
eso es valioso y está documentado, pero ninguno acerca el primer video
publicable. Se retoman después de la Fase 3.
