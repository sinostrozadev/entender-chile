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
4. Si por lo que sea no puedes subir un archivo binario al repo, NO lo dejes
   en silencio: escribe `<salida sin extensión>-NO-PUDE.md` explicando qué
   falló y dónde quedó la imagen. Un pedido sin respuesta deja una rutina
   esperando con el reloj corriendo.

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

| Clima | Luz y paleta |
|---|---|
| `grave` | azul noche, contraluz duro, casi monocromo |
| `institucional` | grafito y azul frío, luz lateral de sala |
| `cotidiano` | luz de día neutra, grises cálidos, sombras suaves |
| `bueno` | luz cálida de mañana, dorados suaves, fondo claro |
| `curioso` | colores saturados y limpios, fondo claro, luz pareja |
| `deporte` | luz de estadio, alto contraste |

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
- **Paleta de la imagen**: azul noche, grafito y blanco frío. El cobre
  #D08A5B no se usa acá: vive en el banner del texto.
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
> fotografía. Paleta azul noche, grafito y blanco frío; nada de cobre ni naranjo
> en la imagen. La MITAD INFERIOR IZQUIERDA queda oscura y despejada, ahí va
> el texto. SIN texto, sin letras ni números. Sin personas reconocibles, sin
> lugares identificables, sin logos, sin banderas.
