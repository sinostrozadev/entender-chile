# La doc de YouTube: traerla entera, una vez al mes

Quién lo hace: **GPT**, que es quien puede abrir páginas. Una vez al mes, por
el canal de pedidos (`Tarea: lectura`).

## Por qué existe

El 06-10-2026 la revisión de una carátula se quedó a medias: el rojo salpicado
de una candidata parecía sangre, la política de miniaturas de YouTube tiene un
ítem sobre eso, y **no se pudo leer la regla**. El proxy de salida de las
sesiones de Claude bloquea `support.google.com` entero, comprobado ese día por
dos vías. Sin la regla delante no se prohíbe nada, que es la decisión de
Santiago, pero entonces el skill `caratula` no puede cumplir su propia promesa
de "verificado contra la fuente y no contra memoria".

La solución no es adivinar ni citar de memoria: es que quien sí puede abrir las
páginas las traiga, y que queden en el repo con su fecha. Desde ahí las lee
cualquiera, siempre, sin red.

**No creemos que cambien todos los meses.** Mensual es barato (un turno de GPT)
y suficiente. Lo que de verdad importa no es la frecuencia sino que el archivo
diga CUÁNDO se trajo, para que una decisión apoyada en doc vieja se vea que lo
está.

## La regla dura de este pedido

**Transcribir, no resumir.** Si en vez del texto llega un resumen, construimos
reglas sobre una paráfrasis, que es exactamente lo que no hacemos con las
cifras. Un resumen fiel es inútil acá: necesitamos las palabras.

**Y una ausencia también es un hecho.** Si una página no se puede abrir, se
escribe "NO SE PUDO ABRIR" con el mensaje de error textual. No se reconstruye
de memoria, no se busca una fuente secundaria que diga más o menos lo mismo, no
se deja el hueco en silencio. Una página que no se pudo leer y está marcada
sirve; una inventada envenena todo lo que se apoye en ella.

## Qué páginas

| Qué manda | URL |
|---|---|
| Miniaturas | https://support.google.com/youtube/answer/9229980 |
| Contenido apto para publicidad | https://support.google.com/youtube/answer/6162278 |
| Buenas prácticas de contenido apto para publicidad | https://support.google.com/youtube/answer/9348366 |
| Spam, prácticas engañosas y estafas | https://support.google.com/youtube/answer/2801973 |
| Violencia y contenido gráfico | https://support.google.com/youtube/answer/2802008 |
| Actualizaciones recientes de normas de publicidad | https://support.google.com/youtube/answer/9725604 |

En español si la página lo ofrece (`?hl=es`), y si no, en inglés. Si traes las
dos versiones y difieren en algo que importa, dilo: la versión en inglés suele
ir primero.

## Qué entregas, y en qué formato

UN archivo, en la ruta exacta que dice la línea `Salida:` del pedido
(`contenido/referencia/youtube/AAAA-MM-politicas.md`). Adentro:

1. Una cabecera con la fecha de la consulta en DD-MM-AAAA y nada más.
2. Una sección `## <nombre de la página>` por cada URL de la tabla, en ese
   orden. Cada una empieza con su URL y la fecha, y sigue con **el texto de la
   página, transcrito**: los títulos, las listas de lo permitido y lo
   prohibido, los ejemplos y las consecuencias. Si la página es muy larga,
   prioriza en este orden: lo prohibido, los criterios con que YouTube decide,
   las consecuencias, las excepciones. Lo que dejes fuera, dilo en una línea.
3. Si una página no abrió: `## <nombre>` y debajo `NO SE PUDO ABRIR` con el
   error textual y la hora. Nada más.

Reglas del repo que valen acá igual: todo en español salvo las citas, que van
en el idioma en que están; **sin raya larga ni raya media** (regla 34), y
fechas en DD-MM-AAAA en la prosa (regla 35).

## Qué NO hacer

- No opines sobre las políticas ni las interpretes. Acá no se analiza, se
  transcribe. La interpretación es del skill `caratula`, con el texto delante.
- No borres ni edites los archivos de meses anteriores. Se acumulan: la serie
  es la que muestra si una regla cambió y cuándo.
- No cites una política que no pudiste abrir, ni siquiera "según recuerdo".
