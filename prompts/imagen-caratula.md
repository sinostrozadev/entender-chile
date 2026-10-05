# Imagen de carátula (opción 3)

Quién la hace: **GPT**, que desde el 23-09-2026 se encarga de todo lo que sea
navegar páginas y generar imágenes. Una por edición del informe.

**CUÁNDO** (desde el 24-09): la del día la genera GPT en el MISMO turno del
guion del informe, después de commitear el guion y sin bloquearlo nunca; la
instrucción vive en `prompts/guion-informe.md`. No se pide por un evento
aparte: eso gastaría un despertar más de una cuota que ya se agotó una vez.
El canal de pedidos (`tarea=imagen`) queda para las pruebas y los extras del
taller, cuando la edición del día ya está cerrada.

**LA LUZ LA MANDA EL CLIMA.** El guion declara `Clima de carátula:` y esa
palabra decide la luz de esta imagen, igual que decide el color de la
carátula de pictograma. La tabla de las seis palabras y su luz vive ahora
dentro de `prompts/caratula-pedido.txt`, en su sección CLIMA, para que viaje
con el prompt. Una imagen sombría para una noticia declarada `bueno` está mal
aunque la metáfora sea perfecta.

Dónde queda: `contenido/caratulas/FECHA.png` (o .jpg). `scripts/dia.js` la
copia sola a `public/caratulas/` y la usa para `miniatura-3.png`. Si el día no
llegó ninguna imagen, la tercera carátula sale igual con el pictograma: la
edición NUNCA se frena por esto.

## Cuando te llega un pedido (así trabaja GPT)

El evento `contenido/estado/ultimo-evento-pedido.txt` trae `tarea=imagen`,
`pedido=` con el archivo del encargo y `salida=` con la ruta exacta donde
tiene que quedar la imagen. Entonces:

1. Lee el archivo de `pedido=`. Bajo el encabezado va la DESCRIPCIÓN concreta
   de la imagen de ese día: úsala tal cual, no la reinterpretes.
2. Genera la imagen con el prompt de `prompts/caratula-pedido.txt`, con sus
   tres marcadores rellenados: ese texto va entero al generador, sin
   reescribirlo. Si el pedido trae una DESCRIPCIÓN concreta del día, esa
   descripción es la que reemplaza `{{NOTICIA}}`.
3. Súbela al repo, rama `main`, en la ruta EXACTA de `salida=`. El nombre y
   la extensión importan: `scripts/dia.js` busca `contenido/caratulas/FECHA`
   con extensión png, jpg, jpeg o webp, y no busca en ninguna otra parte.

3 bis. **COMPRUEBA QUE LLEGÓ ENTERA, y si no, vuelve a subirla.** Subir no es
   lo mismo que haber llegado. Después de subir, lee de vuelta el archivo
   desde `main` y confirma dos cosas: que el TAMAÑO EN BYTES es el mismo que
   el de la imagen que generaste, y que el archivo termina donde tiene que
   terminar (un PNG cierra con el bloque `IEND`; un JPEG, con los bytes
   `FF D9`). Si el tamaño no calza, o no puedes leerlo de vuelta, o no
   termina bien: **súbela de nuevo**, hasta tres veces. Si a la tercera sigue
   sin calzar, deja el `-NO-PUDE.md` diciendo exactamente eso, con los dos
   tamaños, el que enviaste y el que quedó.

   El 28-09-2026 esto no se hacía y pasó lo que tenía que pasar: la carátula
   quedó en el repo con 786.444 bytes pero incompleta, sin su bloque de
   cierre y con solo un cuarto de los datos de imagen. Nadie se dio cuenta
   porque el navegador que dibuja el video es tolerante: pinta lo que puede y
   deja el resto vacío, así que el render no falló. Salió al aire, en la
   portada del video y en la miniatura de YouTube, la ilustración cortada al
   cuarto. Una imagen a medias es peor que ninguna, porque ninguna tiene
   respaldo y una a medias se publica.

   Desde ese día `scripts/imagen-entera.js` también lo comprueba de este lado
   y descarta la imagen rota, así que si no la vuelves a subir el video sale
   sin ilustración. Comprobarlo tú es lo que evita las dos cosas.
4. Si por lo que sea no puedes subir la imagen al repo, NO lo dejes en
   silencio: escribe `<salida sin extensión>-NO-PUDE.md`. Y ahí manda esta
   regla, que costó un día entero: **un reporte de falla no es evidencia de
   falla**. El archivo tiene que decir QUÉ INTENTASTE, con el nombre de la
   herramienta que llamaste, y CITAR EL ERROR que te devolvió, literal. Una
   causa sin mensaje de error no es una causa: si no llegaste a intentarlo,
   escribe "no lo intenté" y di por qué.

   El 27-09-2026 el NO-PUDE dijo que el conector "solo permite crear archivos
   de texto UTF-8 y no admite subir binarios PNG". Era falso. Cuando Santiago
   preguntó, la respuesta fue: "revisé la función para archivos de texto y
   pasé por alto la opción para subir imágenes como blobs binarios. No
   comprobé ningún cambio del conector que impidiera hacerlo". La imagen
   subió sin problema al segundo intento, y el mismo tipo de tarea había
   subido un PNG de 4,2 MB tres días antes. El costo de esa frase escrita sin
   comprobar fue un informe publicado sin portada y media mañana de
   diagnóstico sobre una causa inventada.

   Antes de escribir que algo no se puede: intenta la vía binaria (subir la
   imagen como blob), y solo si te devuelve un error, cópialo.

   Si aun así no sube, no pasa nada grave: desde el 27-09-2026 `estado.yml`
   abre solo un pedido de reintento cuando el guion está y la imagen no, así
   que va a haber una ejecución nueva. Lo que no se recupera es una causa
   falsa escrita en el repo, porque manda a todos a buscar donde no es.

Mientras la imagen no exista en `salida=`, el pedido sigue abierto y te va a
volver a llegar.

### Cuando el generador de imágenes está topado (23-09)

Pasó el mismo día que se estrenó esto: seis pedidos en dos horas agotaron el
límite de uso del generador, y el séptimo quedó en silencio. El conector y el
webhook estaban sanos; lo único topado era el dibujo.

Si te pasa, **no te quedes esperando en silencio**: escribe
`<salida sin extensión>-NO-PUDE.md` diciendo que el generador está topado y
desde cuándo. Un pedido callado deja a alguien mirando el repo sin saber si
el problema es la cuota, el conector o el prompt.

**El ritmo normal es UNA imagen al día**, la de la carátula del informe. Las
pruebas y las variantes se piden cuando la edición del día ya está cerrada,
nunca antes: el generador es un recurso escaso y la edición manda.
## EL PROMPT NO SE INTERPRETA: SE COPIA (05-10-2026)

Decisión de Santiago: "quiero que le dejemos el prompt armado, que él no tenga
que interpretar nada".

Hasta hoy, acá abajo vivían 140 líneas de prosa (la fórmula en ocho reglas, qué
imagen pedir, las reglas duras, cómo tiene que verse) más una plantilla con
huecos al final. GPT tenía que leerlas todas, elegir el motivo, rellenar la
plantilla y resolver por su cuenta las contradicciones entre las dos. Tres
interpretaciones encadenadas, y ninguna quedaba escrita en ninguna parte: el
05-10-2026, buscando "cuál fue el prompt exacto", resultó que no existía.
Cuando una carátula salía mal no había forma de saber si falló la plantilla, la
descripción del día o el generador.

**El prompt completo vive ahora en `prompts/caratula-pedido.txt`.** Tiene tres
marcadores y nada más que rellenar:

| marcador | de dónde sale |
|---|---|
| `{{CLIMA}}` | la línea `Clima de carátula:` del guion de hoy |
| `{{GANCHO}}` | la línea `Carátula sugerida:` del guion de hoy |
| `{{NOTICIA}}` | el `[TESIS]` de la primera sección del guion |

### Qué haces tú, y nada más que esto

1. Abre `prompts/caratula-pedido.txt`, pega los tres datos del guion de hoy en
   sus marcadores y **manda ese texto tal cual** al generador. No lo reescribas,
   no lo resumas, no le agregues nada tuyo y no mezcles instrucciones de otro
   archivo.
2. Deja la imagen en `contenido/caratulas/AAAA-MM-DD.png` (o .jpg), rama main.
3. **Deja el prompt que usaste** en `contenido/caratulas/AAAA-MM-DD-prompt.txt`,
   exactamente como lo mandaste. Sin esto no se puede mejorar lo que no se ve.
4. **Si no pudiste, no te quedes en silencio**: escribe
   `contenido/caratulas/AAAA-MM-DD-NO-PUDE.md` diciendo QUÉ falló, con el
   mensaje de error textual. Una causa sin mensaje de error no es una causa, y
   el 27-09-2026 una conclusión escrita como hecho resultó falsa al segundo
   intento.

Cuando el reintento automático te abre un pedido
(`contenido/urgente/PEDIDO-caratula-FECHA.md`), el prompt ya viene armado
adentro de ese archivo, con los datos pegados: ahí no tienes que abrir nada
más.

### Lo que sigue valiendo de la época anterior

De todo lo que había acá, solo estos dos límites se mantienen, y están al final
del propio `caratula-pedido.txt` para que viajen con el prompt:

- **Sin personas reconocibles ni caras.** En Chile la propia imagen está
  protegida y el castigo de la política de contenido sintético cae sobre el
  canal entero, no sobre el video.
- **Nada morboso.** La monetización se revisa y esto la rompe.

Santiago los revisó el 01-10-2026 con el texto completo delante y decidió
mantenerlos. Lo demás (los lugares identificables, los logos, las banderas, el
cobre, la metáfora obligatoria) se liberó ese mismo día.

### Y el gancho no va dentro de la imagen

`scripts/miniaturas.js` pinta el gancho encima con la tipografía del canal, en
la mitad inferior izquierda. Si la imagen trae su propio texto, el gancho sale
dos veces. Por eso el prompt le pide a GPT una imagen sin letras y con esa zona
despejada.
