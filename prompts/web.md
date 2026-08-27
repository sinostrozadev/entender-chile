Indicaciones para lo que se publica en la WEB de Entender Chile
(entenderchile: sitio en Astro, se compila desde contenido/ y se republica
solo cuando cambia el contenido).

Este documento es a la web lo que guion-informe.md es a YouTube: define lo
que el medio necesita y lo que NO le sirve. El guion está escrito para ser
escuchado una vez, en orden, sin poder volver atrás. La web es lo contrario:
se lee salteado, se vuelve, se busca, se copia una cifra, se comparte un
enlace. Lo que funciona en un medio estorba en el otro.

## Qué publica la web hoy

1. El informe diario, renderizado desde contenido/informes/AAAA-MM-DD.md.
2. Las Claves, desde contenido/claves/.
3. "¿En qué quedó?", desde contenido/casos/ (reglas propias en
   estrategia/seccion-plata-publica.md).
4. La palabra del día, desde contenido/palabras/ (ver abajo).

Los tres primeros NO se escriben aparte para la web: el sitio los transforma
en HTML. Escribir dos versiones del informe sería duplicar el trabajo y
garantizar que se contradigan. Si algo debe verse distinto en la web, se
resuelve en el sitio, no escribiendo otro texto.

## La palabra del día (esto sí se genera para la web)

Es lo único que la web publica y el video no. Una palabra por día, explicada
en dos líneas: qué significa, cómo se usa, dónde la viste.

Se toma de contenido/palabras/banco.md con la prioridad definida en
contenido/palabras/README.md: primero una palabra que aparezca en el informe
de HOY (el lector acaba de tropezar con ella), después una del banco cuyo
tema esté en la conversación, después la siguiente de la cola. El entregable
va a contenido/palabras/AAAA-MM-DD.md con el formato del README.

Regla que la define: si explicar la palabra necesita otra palabra difícil,
está mal escrita.

## Diferencias de forma respecto del guion

- **Nada de oralidad.** El guion escribe los números en palabras ("cero coma
  nueve por ciento") porque los lee una voz. La web escribe cifras: 0,9%.
  Igual con las siglas, las fechas y los porcentajes.
- **Sin muletillas de locución.** "Y acá está la diferencia importante",
  "vamos por partes", "como decíamos" son andamios de la escucha. Leídos
  sobran.
- **Subtítulos que se puedan escanear.** Quien lee salta: cada sección debe
  decir de qué trata sin leer el párrafo. El guion puede permitirse un
  subtítulo elegante; la web no.
- **Los enlaces son la fuente.** En el video la fuente se dice y aparece en
  pantalla; en la web va enlazada al documento original cuando exista
  (informe de Contraloría, comunicado, ley). Un enlace roto es peor que
  ninguno: si no se puede verificar la URL, se cita sin enlazar.
- **Las cifras se pueden mirar dos veces.** En pantalla una tabla de cuatro
  filas es ilegible; en la web es la mejor forma de mostrarlas.
- **Nada depende del orden de lectura.** Cada sección se entiende sola. Nada
  de "como vimos más arriba" sin decir qué se vio.

## Título y descripción (SEO honesto)

El título de cada página es el titular real, no una fórmula de buscador.
Nunca preguntas cebo ("¿Sabías que...?"), nunca mayúsculas sostenidas, nunca
prometer más de lo que el texto entrega.

La palabra o entidad concreta va al principio: "Cotización con Rentabilidad
Protegida: qué cambia en tu sueldo desde agosto" funciona; "Todo lo que
tienes que saber sobre la reforma" no dice nada y compite con todos.

La descripción resume lo que hay, en una frase. Si al leerla alguien decide
no entrar porque el tema no le interesa, la descripción hizo bien su trabajo.

## Lo que NO va a la web

- Marcas internas de producción: [TESIS], [DATO], [HECHO], [A]/[B]/[C],
  "EN SEGUIMIENTO:", "FUERA DE LA OLLA:". Son instrucciones para el pipeline
  y el sitio las filtra; si aparecen a la vista, es un error.
- El barrido y la preselección. Son material de trabajo sin verificar
  (contenido/barrido/, contenido/preseleccion/): no se publican ni se citan.
- Los dossiers marcados con `publicar: no` en su bloque de datos.
- Notas para Santiago, dudas del generador o cualquier texto dirigido al
  equipo y no al lector.

## Reglas del canal que también rigen acá

Toda cifra con su fuente y su fecha. Hechos separados de interpretación.
Presunción de inocencia con situación procesal exacta. Sin raya larga: coma,
dos puntos, punto o paréntesis. Fechas en prosa como DD-MM-AAAA.

Los errores se corrigen a la vista: en la web se puede editar en silencio, y
justamente por eso no se hace. Si un dato publicado estaba mal, la corrección
queda anotada con su fecha.
