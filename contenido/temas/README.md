# contenido/temas/ : los casos que el canal sigue día a día

Desde el 01-11-2026 la Clave pasó a ser "Entender el caso": un largo por tema,
sin calendario, que explica un caso desde su origen con la información
acumulada y usa como escenario la página real del diario escrito
(`https://entender.sinodev.cl/AAAA-MM-DD/`) con zoom a la noticia del día en
que salió cada hito. Para contar un caso desde el origen hace falta haberlo
seguido: esta carpeta es ese seguimiento.

## Qué es un tema

Un tema es un caso que el diario sigue a lo largo de varios días: una crisis
política, una investigación, una reforma, una emergencia. Generaliza
`contenido/casos/`, que sigue solo casos de plata pública con su contador; un
tema puede ser cualquier asunto y no lleva montos ni contador. Un caso de plata
pública puede tener además su tema: el dossier sigue en `contenido/casos/` y la
ficha del tema lo nombra en su cronología.

Un directorio por tema, nombrado por su slug:

    temas/<slug>/ficha.md                   la ficha viva del tema
    temas/<slug>/propuesta.md               una propuesta de largo abierta (a lo más una)
    temas/<slug>/propuestas/AAAA-MM-DD-<explicar|actualizar>.md   las propuestas ya cerradas
    temas/seguimiento/AAAA-MM-DD.md         la marca de que el seguimiento de ese día ya corrió

Igual que los dossiers de `contenido/casos/`, las fichas SÍ se editan en el
tiempo: son documentos vivos. El resto de `contenido/` se escribe una vez.

## La ficha (`temas/<slug>/ficha.md`)

Formato fijo, porque la leen la pauta del largo (`prompts/pauta-clave.md`),
`scripts/clave.js` y `scripts/bandeja.js`:

    # <Título del tema, una línea>
    Estado: abierto | explicado | actualizado
    Abierto: AAAA-MM-DD
    Última actualización: AAAA-MM-DD

    ## Origen
    <Dos o tres frases: qué pasó, cuándo, por qué importa. Con fecha absoluta.>

    ## Cronología
    - AAAA-MM-DD | <hito en una frase, con cifra si la hay> | diario: AAAA-MM-DD#<slug> | sección: <categoría del diario>
    ...

    ## Qué falta por saber
    - <pregunta abierta>

    ## Publicado
    - AAAA-MM-DD | exprés | <id de YouTube> | <título>
    - AAAA-MM-DD | largo | <id> | <título>

Cómo se llena cada hito:

- **La primera fecha es la del hecho**, tal como la fechan las fuentes del
  informe. La del `diario:` es la de la PÁGINA donde salió la noticia, que
  suele ser el día siguiente. Son dos cosas distintas y las dos sirven: la
  narración dice cuándo pasó, el render muestra dónde lo contó el diario.
- **`diario: AAAA-MM-DD#<slug>`**: la fecha del informe y el slug de esa
  noticia, calculado con `scripts/slug-noticia.js` sobre el titular exacto del
  informe. Es el mismo slug que la web pone en `data-noticia`, y el render lo
  usa para hacer zoom. Para sacarlo:
  `node scripts/slug-noticia.js contenido/informes/AAAA-MM-DD.md` imprime nivel,
  slug y titular de cada noticia, en orden. Nunca se escribe a mano: el slug
  de un titular que se repite en la misma página lleva `-2`, y solo el script
  lo sabe.
- **`sección:`**: la categoría del informe bajo la que está la noticia (el
  `##` que la contiene: Actualidad, Política, Seguridad y Justicia, Además,
  hoy...).
- **Un hito que no salió en el diario** (llegó por un exprés, por ejemplo):
  `diario:` apunta a la página del primer informe que lo recogió; si ninguno
  lo recogió, `diario: ninguno | sección: ninguna`. Esa sección del largo va
  sin escenario de diario.
- Si un día trae dos hechos distintos del mismo tema, son dos hitos con la
  misma página.

Los estados: `abierto` (se sigue y todavía no tiene largo), `explicado` (ya
salió su largo y desde entonces no hubo actualización) y `actualizado` (salió
al menos una actualización). Lo cambia quien registra el largo en `## Publicado`.

## Las reglas de rigor

Son las de `contenido/casos/README.md`, sección "Reglas de rigor (no
negociables)", y se cumplen todas: lo reportado por prensa va con medio y
fecha; **presunción de inocencia**, con la situación procesal exacta y fechada
de cada persona; solo personas ya individualizadas; sin relleno; fechas
absolutas. No se repiten aquí para que no deriven: manda ese archivo.

Una regla propia: **la ficha se arma solo con lo que está en el repo**. Nunca
una cifra ni una fuente que no esté en el informe del día (o en el exprés que
la trajo). Un exprés que salió con errores se anota en `## Publicado` y su
texto no se usa como fuente de hitos.

## Quién la escribe: el turno SEGUIMIENTO

Lo hace el rol SEGUIMIENTO de la rutina validadora
(`trig_01B8tLFaXe7h1YBCciFE2iKf`), con `prompts/seguimiento-temas.md`, una
vez al día **después de que la edición queda aprobada** (existe
`contenido/revisiones/FECHA.md`). Corre ahí y no antes porque lee el informe
final, no un borrador que el validador todavía podía devolver. Lo despierta
`estado.yml` cuando la etapa del día llega a `aprobada`.

Sin navegar y sin WebSearch: solo el informe del día y las fichas. Por cada
noticia decide si pertenece a un tema abierto (agrega el hito), si abre un
tema nuevo, o nada, y deja la marca `temas/seguimiento/FECHA.md` con una línea
por noticia.

## Cómo se abre un tema

Una noticia sola no abre tema. Lo abren:

- **dos días seguidos** con el mismo asunto en el informe, o
- **un hecho mayor**: una formalización, un fallo, una cifra oficial, una
  acusación constitucional, una muerte, una emergencia nacional.

Al abrirlo, la ficha nace con el origen y todos los hitos que ya estaban en
los informes anteriores (el turno los busca en los siete días previos).

## Cómo se propone un largo (`temas/<slug>/propuesta.md`)

El mismo turno propone con criterio editorial, no con un contador:
**explicar** cuando un tema acumula lo suficiente para contarse desde el
origen (varios hitos o un hecho mayor) y todavía no tiene largo;
**actualizar** cuando ya fue explicado y avanzó de verdad desde el último
largo. Formato:

    PROPUESTA: explicar | actualizar
    FECHA: AAAA-MM-DD
    POR QUÉ: <hasta tres líneas>
    HITOS NUEVOS:
    - <los hitos de la ficha que la justifican, copiados tal cual>

Una sola propuesta abierta por tema: si ya hay una, no se pisa ni se escribe
otra. Puede haber dos propuestas en un día o ninguna en una semana. La
propuesta entra a la Bandeja del Taller (`scripts/bandeja.js`, tipo `tema`) y
llega al teléfono de Santiago con una notificación.

## Cómo aprueba Santiago

En conversación con la sesión de día. Con su sí, la sesión corre:

    node scripts/clave.js elegir <slug-del-flujo> --tema-de <slug-del-tema>

Eso escribe `contenido/claves/flujo/<slug>/tema.md` con las líneas
`TEMA: contenido/temas/<slug-del-tema>/ficha.md` y `FORMATO: diario`, y cierra
la propuesta moviéndola a `temas/<slug>/propuestas/`. Desde ahí el flujo sigue
por el camino `pauta` de la Clave (`contenido/claves/flujo/README.md`): Claude
escribe la pauta desde la ficha, Santiago la aprueba, GPT investiga y escribe,
Claude valida, render. Nada va a GPT sin el sí.

## El contrato con el render: la marca `[DIARIO AAAA-MM-DD | slug]`

Es la línea que le dice al render qué página del diario mostrar en cada
sección del largo y a qué noticia acercarse. Nace en la ficha, la fija la
pauta y el guion la copia:

1. **La ficha** guarda `diario: AAAA-MM-DD#<slug>` en cada hito.
2. **La pauta** (`prompts/pauta-clave.md`, sección "Cuando el flujo viene de
   un tema") fija, por cada sección que narra un hito, la línea
   `[DIARIO AAAA-MM-DD | slug]` con la fecha y el slug de ese hito. Un hito
   con `diario: ninguno` no lleva marca.
3. **El guion** (`prompts/guion-claves.md`, MARCAS PARA PRODUCCIÓN) la pone
   como primera línea de esa sección, justo después del `## título` y antes de
   la `[TESIS]`, copiada tal cual, a lo más una por sección. No se narra ni se
   muestra como texto.

Formato exacto: corchete, `DIARIO`, un espacio, la fecha `AAAA-MM-DD`, un
espacio, una barra vertical, un espacio, el slug, corchete. Por ejemplo
`[DIARIO 2026-10-23 | rabat-confirma-que-firmo-56-rebajas-de-condena]`. La
fecha y el slug vienen siempre de la ficha y nunca se reescriben: el render
busca esa página y ese `data-noticia`, y un slug inventado deja la sección sin
escenario.
