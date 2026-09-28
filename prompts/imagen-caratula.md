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
carátula de pictograma. La tabla está en la regla 7, más abajo. Una imagen
sombría para una noticia declarada `bueno` está mal aunque la metáfora sea
perfecta.

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
2. Genera la imagen respetando todo lo de abajo (16:9, sin texto, sin
   personas reconocibles, y nunca la escena de la noticia).
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

## LA FÓRMULA (23-09-2026, sacada de seis vueltas con Santiago en el taller)

Seis intentos sobre las mismas dos noticias dejaron esto. No es gusto: cada
regla viene de una carátula que falló.

**1. Dos capas, siempre.** El FONDO dice DÓNDE vive la noticia (un lugar
genérico, anónimo, vacío y muy desenfocado). El PRIMER PLANO dice QUÉ pasó,
en un objeto nítido. Ninguna de las dos capas sola alcanza: el objeto solo
flota sin contexto, y el lugar solo no cuenta nada.

**2. El objeto sale de una de cuatro figuras.** Primero se decide qué le
pasó a la noticia, y de ahí sale el objeto:

| Si la noticia es... | La figura es | Ejemplo probado |
|---|---|---|
| algo que faltó, se perdió o no llegó | **AUSENCIA** | butacas iguales e iluminadas, una sola a oscuras |
| algo que superó un límite | **DESBORDE** | el vaso de medir rebalsado por sobre su marca |
| algo que se decidió por poco, o dos lados | **DESEQUILIBRIO** | la balanza casi pareja con un solo grano |
| algo que quedó a punto y no pasó, o cruzó una raya | **UMBRAL** | la línea marcada y el nivel que no llega |

Si ninguna calza, el objeto es **el instrumento con que se mide el tema**:
el pluviómetro, el reloj, la regla, la pesa.

**3. Destacar por AUSENCIA le gana a destacar por luz.** Fue el hallazgo de
Santiago y cambió la mejor carátula del día: el ojo va antes al hueco negro
entre cosas iluminadas que al foco sobre una cosa. Cuando la noticia es que
algo faltó, se muestra lo que falta, no lo que quedó.

**4. El objeto destacado es IGUAL a sus pares.** Lo distingue la luz, nunca
su jerarquía. En una prueba salió un sillón de respaldo alto entre butacas
normales, y la imagen pasó a decir "el que preside", que no era la noticia.

**5. El detalle que lleva la idea va EXAGERADO y en el tercio superior.** La
primera perla en la balanza medía dos píxeles y la imagen no decía nada. Lo
que explica la metáfora se dibuja más grande de lo que sería en la vida real
y nunca abajo, donde el texto lo tapa.

**6. El cobre no entra en la imagen.** Es el color del banner y de nada más.
Con el paraguas cobre sobre fondo azul, el banner dejó de resaltar y la
carátula se aplanó.

**7. El clima lo manda la noticia.** No todas pueden salir sombrías o el
canal parece una sola noticia repetida (y la regla 29 pide variación). El
guion declara `Clima de carátula:` y de ahí sale la luz:

| Clima | Luz y paleta de la imagen |
|---|---|
| `grave` | NOCHE. Azul noche, contraluz duro, casi monocromo |
| `institucional` | DÍA nublado. Gris piedra y azul acero, luz de ventana entrando de lado |
| `cotidiano` | DÍA claro. Grises cálidos y beige, luz natural, sombras suaves |
| `bueno` | MAÑANA. Luz cálida y dorada, fondo claro, aire limpio |
| `curioso` | DÍA. Colores limpios y saturados, fondo claro, luz pareja |
| `deporte` | Luz de estadio o exterior, alto contraste, verdes o azules saturados |

**SOLO `grave` es de noche.** Los otros cinco son de día, con luz. Esto no es
un detalle: el 24-09 salió una carátula nocturna para una noticia declarada
`institucional` porque más abajo este mismo archivo fijaba "azul noche" para
todas, y la instrucción concreta le ganó a la tabla. Si la mayoría de los
días es `institucional` o `cotidiano`, la mayoría de las carátulas tiene que
ser de día, o el canal entero se ve igual a la semana.

La mayoría de los días va a ser `institucional` o `cotidiano`, y está bien:
una noticia mala con luz de mañana se ve falsa y es peor que sombría.

**8. Lo que no cambia nunca** (esto es la marca): fondo desenfocado, objeto
nítido arriba a la derecha, mitad inferior izquierda oscura y libre, los dos
banners abajo a la izquierda, el sello en mono arriba. Un espectador tiene
que reconocer que el video es del canal antes de leer una palabra.

## Qué imagen pedir

UNA metáfora visual de la noticia de portada. No la escena literal de la
noticia: el objeto o la situación que resume la idea, con una vuelta. Si el
tema es cuánta lluvia cae, no un paisaje lluvioso: un vaso de medir
desbordado, una regadera del tamaño de un cerro, un paraguas hecho pedazos
por el peso del agua. Si el tema es plata que no se cobró, no un edificio
público: una alcancía con la ranura tapada, una boleta que se enrolla sin
final. La prueba: si al verla alguien piensa "ah, buena", sirve; si piensa
"una foto de archivo", no.

## Reglas duras

- **Sin texto.** Ni letras ni números ni cifras dentro de la imagen: eso lo
  pinta el código encima. Una imagen con texto generado se descarta.
- **Sin personas reconocibles**, sin caras de figuras públicas, sin logos,
  marcas ni banderas.
- **Nada que parezca una fotografía DEL HECHO.** Regla 29: la imagen es un
  identificador de ambiente, nunca el registro de lo que pasó. Puede verse
  fotográfica si muestra un objeto o un ambiente genérico; no puede mostrar
  la escena de la noticia.
- **Nada morboso**: sin sangre, sin cuerpos, sin armas apuntando, sin
  sufrimiento explícito. La monetización se revisa y esto la rompe.

## Cómo tiene que verse

- **Estilo: imagen fotorrealista de ambiente** (regla 29 ampliada por
  Santiago el 23-09). Fondo DESENFOCADO a la izquierda, sujeto NÍTIDO a la
  derecha, contraluz, profundidad de campo real. Se permite que parezca una
  fotografía, con su luz, su textura y su grano, porque lo que se muestra es
  AMBIENTE U OBJETO y no afirma nada sobre la noticia.
- **El límite que no se cruza**: la imagen NUNCA representa el hecho
  noticioso. Un paraguas bajo la lluvia, sí; el río desbordado de hoy, el
  choque, la marcha o el edificio del que habla la nota, JAMÁS. Eso sería un
  registro falso de algo que nadie fotografió. Y en ningún caso lugares
  identificables ni personas reconocibles.
- **El cobre NO va en la imagen.** El acento cobre queda reservado para el
  banner del texto, que es donde tiene que pegar. La ilustración va en azul
  noche, grafito y blanco frío, con las luces cálidas al mínimo. Si la
  imagen también es cobre, el banner deja de resaltar y la carátula se
  aplana (probado el 23-09 con el paraguas).
- **Formato 16:9**, mínimo 1280 x 720.
- **Paleta de la imagen: la que diga el CLIMA** (tabla de la regla 7). No hay
  una paleta fija: eso es lo que hacía que todas salieran de noche. Lo único
  invariable es que el cobre #D08A5B NO se usa en la imagen: vive en el
  banner del texto.
- **Composición con el texto en mente** (corregido el 23-09 al montar la
  primera imagen real): el sujeto va arriba y a la DERECHA, y queda libre y
  oscura **la mitad inferior izquierda**, no el tercio. Los dos banners del
  gancho son anchos y altos: con un tercio no alcanza y le comen la base al
  motivo.
- **El detalle que lleva la idea va en la parte ALTA del sujeto.** En la
  primera prueba, la banda de cobre que marcaba "el nivel esperado" era la
  idea entera de la imagen y quedó justo detrás del texto. Lo que explica la
  metáfora tiene que vivir en el tercio superior del cuadro.
- **Un solo sujeto, grande.** La carátula se ve a 168 píxeles de ancho en un
  teléfono: lo que no se lee en un cuadrado de dos centímetros no existe.

## El pedido, para pegar tal cual

> Imagen fotorrealista en 16:9 (1280x720) para la carátula de un
> video de noticias de Chile. Tema: <la noticia de portada en una frase>.
> Quiero una METÁFORA VISUAL ingeniosa, no la escena literal. Fondo
> atmosférico DESENFOCADO a la izquierda y el sujeto NÍTIDO arriba a la
> derecha, con contraluz y profundidad de campo. Puede parecer una
> fotografía. Clima: <grave | institucional | cotidiano | bueno | curioso |
> deporte>, con la luz y la paleta que ese clima pide (solo `grave` es de
> noche; los demás son de día). Nada de cobre ni naranjo en la imagen. La MITAD INFERIOR IZQUIERDA queda oscura y despejada, ahí va
> el texto. SIN texto, sin letras ni números. Sin personas reconocibles, sin
> lugares identificables, sin logos, sin banderas.
