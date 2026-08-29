# Propuesta acordada: el informe crece, el guion resume y nombra todo

Acordado entre Santiago y la sesión de día el 29-08-2026. Esta sesión no
toca prompts: aquí está el texto exacto para que la sesión de la noche lo
pegue. Tres archivos.

Lo decidido: las [A] se desarrollan con la pauta de cinco preguntas (en
prueba); asumimos que el video no siempre durará diez minutos; el bloque
"En titulares" va antes del cierre.

Contexto que motiva el cambio, medido en la edición del 29-08: la [A]
principal (desempleo 9,5%) tiene 220 palabras y deja las preguntas de
seguimiento sin responder; 13 noticias preseleccionadas se descartaron por
"espacio" o "menor" sin dejar ni una línea pública; y el tope [A]+[B] <= 10
está en el informe por culpa de la duración del video, que la web no paga.

---

## 1. En `prompts/informe.md`

### 1a. REEMPLAZAR el bloque de jerarquización actual

Buscar el bloque que empieza con "JERARQUIZACIÓN:" y reemplazar las
definiciones de [A], [B], [C] y el tope por esto:

```
JERARQUIZACIÓN:
- Asigna a cada noticia un peso visible al inicio del titular: [A], [B] o [C].
  [A] = las noticias que definen la jornada. Objetivo 3, máximo 4; si hay
  más candidatas, elige y baja las demás a [B].
  [B] = relevante pero no central. Uno o dos párrafos.
  [C] = registro en una línea para "Además, hoy".
- El informe NO tiene tope de cantidad ni de largo: es la edición completa
  para la web. El recorte por duración lo hace el guion del video, no el
  informe. Aquí el criterio es la relevancia y la verificación, nunca el
  espacio.
- Toda noticia preseleccionada que NO haya sido descartada por calidad
  (sin segunda fuente, duplicada, no verificable) entra al informe al menos
  como [C]. "Espacio" y "menor" dejan de ser motivos de exclusión del
  informe: si estaba en la olla y es verificable, se nombra. El rastro del
  descarte en el bloque interno queda solo para los descartes de calidad.

DESARROLLO OBLIGATORIO DE CADA [A] (pauta de cinco preguntas):
Toda noticia [A] debe responder, en este orden natural y sin subtítulos:
  1. Qué ocurrió, con sus cifras y fuentes.
  2. Qué dicen los involucrados: la autoridad, el afectado, el que discrepa.
     Con nombre, cargo y fuente. Si nadie ha reaccionado aún, no se inventa
     ni se rellena: se omite.
  3. Qué antecedente lo explica: desde cuándo, qué lo causó, cuándo fue la
     última vez que pasó algo así. Con fechas.
  4. Qué viene ahora: la audiencia, la votación, el plazo, la próxima
     publicación del dato. Con fecha cuando exista.
  5. La escala humana ya obligatoria (cálculo propio sobre base real).
La regla de honestidad manda sobre la pauta: cada una de estas partes son
HECHOS con fuente, nunca párrafos de contexto genérico. Si una pregunta no
tiene respuesta verificable hoy, esa parte se omite sin anunciarlo. Alargar
por alargar es peor que quedar corto.
```

### 1b. En la sección "Además, hoy" de ESTRUCTURA

Reemplazar la línea que la define (la que dice "todas las noticias [C]
agrupadas, una frase cada una, hasta diez") por:

```
- Además, hoy: todas las noticias [C], una frase cada una, SIN TOPE de
  cantidad. Aquí aterriza todo lo preseleccionado verificable que no
  alcanzó desarrollo. Un trámite administrativo menor sigue sin ser
  noticia: el filtro es relevancia mínima y verificabilidad, no un número.
```

### 1c. En "CONTROL ANTES DE ENTREGAR"

Reemplazar el punto 1 ("Toda noticia tiene peso [A], [B] o [C]; hasta 4
[A], hasta 8 [B], y entre [A] y [B] no más de 10 en total.") por:

```
1. Toda noticia tiene peso [A], [B] o [C]; hasta 4 [A]. Sin tope de [B] ni
   de [C]. Toda [A] responde la pauta de cinco preguntas (o omite en
   silencio las que no tienen respuesta verificable).
```

---

## 2. En `prompts/guion-informe.md`

### 2a. Donde defina qué se narra

Dejar explícito (ajustando el texto existente):

```
QUÉ SE NARRA: el guion narra completas las [A] (todas) y las [B] más
relevantes, hasta un total combinado de 10 noticias narradas. El informe ya
no trae tope: el recorte por duración es TRABAJO DEL GUION. Comprimir y
elegir es la función de esta pieza.

La duración objetivo es en torno a 10 minutos y puede llegar a 12 o 13 en
días cargados. En días así, preferir recortar desarrollo de las [B] antes
que eliminar el bloque "En titulares".
```

### 2b. Bloque nuevo, ANTES del cierre

```
EN TITULARES (obligatorio, penúltima sección del guion, justo antes del
Cierre):
- Una sección "## En titulares" con UNA frase por cada noticia del informe
  que no se narró: las [B] que quedaron fuera del corte y todas las [C].
- Cada frase: el hecho y, si cabe natural, la cifra. Sin desarrollo, sin
  fuente hablada (las fuentes van en la lista "Fuentes:"), sin opinión.
- Entrada fija del bloque, siempre la misma: "Y en titulares:". Es la señal
  para el que escucha de que viene el barrido rápido.
- Ninguna noticia del informe puede quedar sin narrar Y sin titular: todo
  lo que está en el informe suena en el video, aunque sea una frase.
```

---

## 3. En el prompt de la rutina de revisión (y `prompts/CALIDAD.md`)

La regla del 29 dice que una [C] narrada es hallazgo. Con "En titulares"
eso quedaría mal calibrado. Reemplazar la categoría a. por:

```
a. Una noticia [A] o [B] del informe omitida POR COMPLETO en el guion (ni
   narrada ni en "En titulares"), o una [C] DESARROLLADA en la narración
   (las [C] solo pueden aparecer como frase única en "En titulares").
```

Y agregar a la categoría d. (elemento obligatorio ausente): `el bloque "En
titulares" cuando el informe tiene más noticias que las narradas`.

Registrar el cambio en la bitácora de `prompts/CALIDAD.md` con fecha
30-08, como pide ese archivo.

---

## Lo que hay que mirar los días siguientes (para la auditoría)

1. Que las [A] no se inflen: la pauta pide hechos, no párrafos. Si aparecen
   cierres abstractos o contexto genérico, la pauta está mal aplicada.
2. La duración real del guion con titulares: estimado +45 s por 8 frases.
3. Que "Además, hoy" no se vuelva basurero: si un día trae 25 líneas,
   revisar si la preselección está dejando pasar ruido.
4. El caso tornado: una noticia de tornado en Chile del 29-08 no aparece ni
   en el barrido ni en la preselección ni en el informe. Problema de
   cobertura de fuentes, anterior a estas reglas. Investigar qué medio la
   dio y por qué las 22 fuentes no la trajeron.
