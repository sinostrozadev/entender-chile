# Imágenes, gráficos y recursos visuales: qué se puede usar

Estado: INVESTIGADO (2026-08-27). Pregunta de Santiago sobre miniaturas,
fondos de sección y elementos 2D/3D.

ADVERTENCIA DE MÉTODO: el proxy bloqueó casi todos los sitios oficiales
(support.google.com, remotion.dev, los sitios de precios). Las citas de
política de YouTube son snippets verificados de búsqueda restringida al
dominio oficial, no lecturas completas. Los precios vienen de agregadores y
están marcados como sin confirmar. Antes de contratar o de tomar una
decisión de riesgo, abrir la página directamente. Nada de esto es asesoría
legal.

## Los dos hallazgos que cambian el planteamiento

### 1. Las miniaturas con IA NO requieren divulgación

Contra lo que suponíamos. La página oficial de divulgación de contenido
sintético dice, textual:

> "production assistance, like using generative AI tools to create or improve
> a video outline, script, thumbnail, title, or infographic does not need to
> be disclosed."

La miniatura está nombrada explícitamente como asistencia de producción.
También el guion, el título y las infografías. Lo que sí obliga a divulgar es
contenido REALISTA que confunda: hacer que una persona real parezca decir
algo que no dijo, alterar imágenes de un hecho real, o generar una escena
verosímil que no ocurrió.

Para el canal: un pictograma, un mapa o una composición tipográfica no son
"realistas" y no gatillan nada. Un retrato generado de una autoridad chilena
sí, y además abre riesgo de derechos de imagen. La estética austera nos deja
del lado seguro sin esfuerzo.
(support.google.com/youtube/answer/14328491)

### 2. El riesgo real está en otra parte, y nos apunta directo

La política de monetización renombrada en julio de 2025 de "repetitious" a
"inauthentic content" da un ejemplo que es casi la descripción de este
proyecto:

> "Channels that use the exact same background music and repetitive AI
> generated imagery across many videos, with each video reading out an
> AI-generated script"

Música idéntica + imágenes de IA repetidas + guion leído por IA. Tenemos dos
de los tres, y el tercero sería exactamente lo que ocurriría si llenáramos
los videos de imágenes generadas.

La defensa no es visual, es editorial: aporte humano documentado, selección
propia, datos propios, reporteo. Todo eso ya existe en el proyecto
(decisiones.md, revisiones/, el observatorio, el barrido con su traza), pero
esto confirma que **agregar imágenes generadas nos acercaría al patrón que la
política describe, no nos alejaría**.
(support.google.com/youtube/answer/1311392)

## Recomendación

**Cero fotos, cero imágenes generadas en el video. Miniatura tipográfica
hecha con Remotion.**

Razones, en orden de peso:
1. Nos aleja del patrón de "contenido inauténtico", que es el riesgo
   existencial del canal.
2. La identidad (papel, tinta, un acento) es lo único que nos hace
   reconocibles en dos segundos. Llenarla de render la vuelve genérica.
3. Costo cero, reproducible, sin licencias que revisar ni precios que suban.
4. En una miniatura el texto tiene que ser perfectamente legible, y eso es
   justo lo que ningún generador garantiza.
5. Ya tenemos algo mejor que una ilustración: el dato con su fuente.

La miniatura ideal de este canal: cifra enorme o tres palabras en tinta sobre
papel, barra verde, pictograma vectorial. Se genera con `remotion still`
desde el mismo timeline, sin herramienta externa.

## Si igual se quiere un generador (casos puntuales)

Precios de agregadores, 2026, SIN CONFIRMAR. Verificar en el proveedor.

| Herramienta | Precio | Comercial | Texto dentro de la imagen |
|---|---|---|---|
| Ideogram | gratis 10/día (públicas); pago 7 a 48 USD/mes | sí en pago | el mejor, 90-95% de acierto |
| Recraft | gratis 50 créditos/día (Recraft retiene propiedad); pago 10 a 48 USD/mes | solo en pago | bueno, y exporta SVG real |
| Nano Banana Pro (Google) | 0,134 USD/imagen; batch 0,067 | sí | muy bueno; marca SynthID no desactivable |
| Adobe Firefly | 9,99 a 19,99 USD/mes | sí, entrenado con stock licenciado | mediocre |
| Midjourney | 10 a 120 USD/mes | sí | débil en texto, no sirve para titulares |
| FLUX | API 0,04-0,055 USD/imagen | ojo: [dev] es NO comercial; [schnell] y [klein] Apache 2.0 | bueno |
| Stable Diffusion local | hardware | SD3.x gratis bajo 1M USD de ingresos; SDXL sin umbral | malo en texto |

Si algún día se necesita: **Ideogram** para texto dentro de la imagen,
**Recraft** si se quiere SVG editable que calce con la línea gráfica.

## Lo que SÍ podemos usar

**Datos y mapas (la vía correcta para este canal):**
- datos.gob.cl: por estándar de Gobierno Digital, los datasets del Estado se
  abren bajo CC0 salvo asignación explícita. Algunos varían (BIDAT usa CC BY,
  Presupuesto Abierto CC BY-SA).
- Mapas vectoriales de la BCN (bcn.cl/siit/mapas_vectoriales): regiones,
  provincias y comunas. Licencia exacta SIN CONFIRMAR.
- GeoJSON ya convertido en GitHub: caracena/chile-geojson, fcortes/Chile-GeoJSON,
  alvaroparedesl/geochile, niclabs/maps.
- Nota técnica: las 346 comunas pesan; simplificar con mapshaper o topojson
  antes del bundle o el render se dispara.
- Nota editorial: usar cartografía de BCN o IGM. Los mapas de Chile tienen
  sensibilidades (límites, Antártica, territorio insular).

**Imágenes, si alguna vez hacen falta:**
- Prensa Presidencia: fotos oficiales liberadas, "sin alteraciones y citando
  la fuente" (condición SIN CONFIRMAR; ojo, "sin alteraciones" podría impedir
  recortar o superponer texto).
- Wikimedia Commons: licencia archivo por archivo. Dominio público o CC BY
  sí; **evitar CC BY-SA**, que por "compartir igual" podría contaminar el
  video completo (riesgo real, sin jurisprudencia chilena clara).
- Memoria Chilena y Biblioteca Nacional Digital: dominio público, citando
  autor, título, fuente y colección. Dan alta resolución gratis a pedido.
- Unsplash, Pexels: comercial sin atribución (Unsplash SÍ exige atribución si
  se usa vía API). Pixabay traslada todo el riesgo al usuario: evitarlo.

## Lo que NO se puede usar

Fotos de medios chilenos e internacionales, de agencias (Reuters, AFP, AP,
EFE), capturas de noticieros, portadas de diarios, fotos de redes sociales de
terceros, stills de video ajeno. **Nada de esto se vuelve usable por acreditar
la fuente ni por poner "todos los derechos al autor".**

Dos razones concretas:
- **Chile no tiene fair use.** La Ley 17.336 tiene excepciones taxativas. El
  derecho de cita (art. 71 B) cubre "fragmentos breves", y una foto completa
  no es un fragmento de sí misma. La excepción abierta (art. 71 Q) exige uso
  "incidental y excepcional": usar fotos ajenas a diario no es ninguna de las
  dos cosas.
- **Un reclamo de Content ID impide monetizar el video completo**, aunque
  sean pocos segundos, y los ingresos van al reclamante mientras dure.

Sí es libre el HECHO noticioso y el dato (las simples informaciones de prensa
no tienen derecho de autor): se puede contar la noticia con palabras y datos
propios. Lo que no se puede es copiar la foto ni la redacción.

**Práctica obligatoria si alguna vez entra un asset externo:** un archivo de
procedencia en el repo (URL de origen, licencia exacta, fecha de descarga,
línea de crédito requerida). Si llega un reclamo, la disputa se gana con ese
registro o no se gana.

## 2D y 3D programático en Remotion

**Licencia de Remotion, dato importante:** gratis para individuos y
organizaciones de hasta 3 empleados, uso comercial incluido, sin diferencias
funcionales. Monetizar este canal está cubierto. (Verificado en LICENSE.md
del repositorio oficial.) Los planes de pago (Creators 25 USD/asiento,
Automators desde 100 USD/mes) aplican a otra escala.

**SVG animado: la vía natural.** Todo lo que la estética pide (líneas,
barras, subrayados, cifras que suben, sellos, tachados) es SVG puro dentro de
React, con `useCurrentFrame`, `interpolate` y `spring`. Sin costo, sin
dependencias, render rápido.

**Lottie:** existe `@remotion/lottie` y es oficial. Útil si se compran
animaciones hechas, pero para una identidad tan específica probablemente sea
más limpio escribir el SVG. Ojo: las animaciones descargadas tienen licencia
propia, se revisan igual que una foto.

**3D con Three.js: mala inversión para un canal diario.** Existe
`@remotion/three` y funciona, pero:
- Multiplica el tiempo de render y agrega dependencia de drivers y GPU.
- Dato contraintuitivo del issue 4955 del repo de Remotion: con React Three
  Fiber y concurrencia 3, **Chrome Headless Shell rindió en 7,10 minutos y
  Chrome for Testing CON GPU en 21,5 minutos**. Prender la GPU fue tres veces
  más lento. No asumir: medir con `npx remotion benchmark`.
- Aporta poco a una estética deliberadamente plana.

Si se quiere profundidad, hay atajos 2D mucho más baratos: paralaje de capas
SVG, sombras duras, grano de papel como textura, tipografía en perspectiva
con `matrix3d` en CSS.

## Decisiones abiertas

1. ¿Se confirma cero fotos y cero imágenes generadas en el video?
2. ¿La miniatura tipográfica se hace ya con `remotion still` (está en la cola
   de ideas/ejecutar.md desde el 24-08)?
3. ¿Se abre `assets/PROCEDENCIA.md` desde ahora, aunque todavía no haya
   assets externos?
4. Los mapas de comunas con datos de datos.gob.cl: ¿entran al video, a la web
   (sección de indicadores), o a las dos?

## Por verificar antes de decidir en firme

- Leer directamente las páginas de YouTube: answer/14328491 (divulgación) y
  answer/1311392 (contenido inauténtico). Todo lo citado acá es snippet.
- La aclaración de YouTube de julio de 2026 sobre "AI slop" (existe, no se
  pudo leer).
- Condiciones exactas de Prensa Presidencia, en particular el alcance de "sin
  alteraciones".
- Licencia formal de los mapas vectoriales de la BCN.
