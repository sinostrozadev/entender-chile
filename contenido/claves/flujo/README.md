# Flujo de la Clave (CLAVE 4, con el tema de la semana desde el 26-09-2026)

Un directorio por Clave, nombrado por su slug. La Clave no es diaria: sale una
por semana y cuenta EN PROFUNDIDAD el tema que más se repitió esos días.

## DOS CAMINOS, y cada flujo dice el suyo

Desde el **27-09-2026** hay un camino nuevo. Lo pidió Santiago con estas
palabras: "siempre, antes de que envíes a trabajar a GPT, me presentes del tema
todo lo que debe tocar y contener, y cuando te confirmo recién avanzamos, para
que GPT solo trabaje cuando estamos seguros". Y sobre el contenido: la Clave
"te dé el contexto suficiente para entender aunque no sepas nada: cómo inició,
datos importantes hasta llegar a lo que se sabe hoy, responder las dudas que se
presenten, evaluar (solo si corresponde) beneficios, riesgos".

Lo que cambió: **lo que Santiago aprueba ya no es la idea que escribía GPT, sino
la PAUTA que escribe Claude**, y GPT no trabaja hasta que ella está aprobada.
Cuando la idea no era la que él quería, lo gastado era cuota de GPT y una vuelta
entera; la pauta cuesta una lectura del repo y se corrige en dos líneas. Además
GPT ahora **investiga con fuentes antes de escribir**
(`prompts/investigacion-clave.md`, que hasta el 26-09 estaba huérfano).

El camino de un flujo lo decide `clave.caminoDe(slug)` y la vista del estado lo
dice en su línea `CAMINO:`: es `pauta` si ya hay `pauta.md` o si el `ELEGIDO:`
de `tema.md` es del 27-09-2026 o posterior, y `idea` si no. El flujo que estaba
abierto ese día (`acuerdo-internacional-sin-tratado`) termina por el camino
viejo: cambiarle las etapas a mitad de recorrido lo habría dejado en una etapa
que ningún archivo sostiene.

## Desde el 12-11-2026: Claude elige y aprueba, Santiago veta

Donde esta guía dice "Santiago elige" o "Santiago aprueba" (`pautar`,
`pauta_lista`), léase **Claude** (`clave.js elegir|aprobar ... --por claude
--motivo`). Santiago solo veta: archivo `contenido/estado/veto-clave.txt`
(todas) o `<slug>/veto.txt` (una); etapa `vetada`, vale hasta el render. Tras la
aprobación hay una ventana de 12 h (`ventana_veto`, `VETO_HASTA`) antes de que
GPT arranque. Criterios y cadencia: `prompts/eleccion-clave.md`.

## Los archivos de un flujo

    <slug>/tema.md           Santiago eligió el tema         (scripts/clave.js elegir)
    <slug>/pauta.md          Claude escribió la pauta        (prompts/pauta-clave.md)      [camino pauta]
    <slug>/eleccion.md       Claude dejó el porqué de la elección (desde 12-11-2026)
    <slug>/aprobacion.md     Santiago (hoy Claude) aprobó o pidió cambios (clave.js aprobar | cambiar)
    <slug>/investigacion.md  GPT investigó con fuentes       (prompts/investigacion-clave.md) [camino pauta]
    <slug>/idea.md           GPT propuso la idea             (prompts/clave-idea.md)       [camino idea]
    <slug>/mural.json        el mural cosido y medido        (scripts/clave-mural.js lo lee)

`mural.json` (desde el 12-10-2026) es lo que hace que la Clave salga con EL
MURAL en vez del formato clásico: los trozos del mural en `public/`, su ancho,
una parada de cámara por sección y el velo de cada parada. No lo escribe GPT:
sale de coser y medir los paneles (`scripts/mural-coser.js`,
`scripts/mural-velos.js`). Sin él, la Clave sale clásica; con él pero sin
calzar con el guion (otra cantidad de paradas que de secciones), el paso de la
Clave se detiene. Detalle en `scripts/clave-mural.js` y `scripts/dia.js`.

## Los paneles del mural, sin pasos manuales (desde el 23-10-2026)

Tras el guion aprobado hay dos etapas más, `paneles` y `armar_mural`, y ninguna
gasta un turno de Claude: se validan por código. Las maneja
`scripts/mural-flujo.js`, que corre dentro de `estado-clave.yml`.

    <slug>/paneles/panel-NN.jpg   los paneles que entrega GPT         (scripts/mural-flujo.js los pide)
    <slug>/paneles/NO-PUDE.md     GPT no entregó tras dos reintentos  (frena el flujo, espera a Santiago)
    <slug>/pausa.txt              frena el flujo sin tocar su estado  (borrarlo lo reanuda)
    <slug>/formato-clasico.txt    saca el flujo de este camino: sale en tarjetas
    contenido/caratulas/claves/<fecha>-<slug>-1.jpg ... -3.jpg   las tres candidatas

1. **Pide** los paneles en tandas de **diez** (el tope de GPT por solicitud),
   con el color de empalme medido sobre el último panel de la tanda anterior.
   Las tres carátulas viajan en la última tanda si caben. El pedido es un
   `contenido/urgente/PEDIDO-mural-<slug>-t<N>.md`.
2. Si GPT entrega a medias, **reabre solo por lo que falta**, esperando 45
   minutos entre pedidos. Tras dos reintentos deja `NO-PUDE.md`.
3. Con todos los paneles los **cose** (`mural-coser.js`), calcula las paradas
   (inicio de cada panel más 440) y los velos (`mural-velos.js`), y escribe
   `mural.json`. Esa es la señal que activa el formato mural en `dia.js`.
   La carátula por defecto es la primera; para cambiarla basta dejar la elegida
   como `contenido/caratulas/claves/<fecha>-<slug>.jpg`.

Lo que la validación por código NO cubre, y es de Santiago al ver el video: las
junturas se miden por salto de luz, no se miran. Probado contra los 14 paneles
reales de licencias, reproduce las paradas y 13 de 14 velos del mural aprobado;
la diferencia está en tres junturas que se ensancharon a mano, decisión de gusto.

`aprobacion.md` tiene el mismo formato en los dos caminos (`APROBADA: fecha` o
`CAMBIAR: nota`) y lo escriben las mismas órdenes: en el camino nuevo aprueba la
PAUTA, en el viejo la IDEA, y en los dos fija la fecha de producción.

## De dónde sale el tema (el banco quedó congelado)

El **banco de temas diario se congeló el 26-09-2026**, por decisión de
Santiago: se llenaba de temas que quedaban ahí sin que nadie los eligiera.
`contenido/claves/banco-temas.md` se conserva tal cual como registro histórico,
pero ya nadie le agrega líneas y nada lo lee para decidir. La etapa diaria
`alimentar_banco` desapareció de la cadena, y su prompt se retiró a
`archivo/prompts/banco-temas.md`.

La fuente de temas ahora es **`contenido/claves/semana/`**:

    semana/AAAA-Www.md              ranking de la semana (scripts/semana.js)
    semana/AAAA-Www.json            el mismo ranking, para los scripts
    semana/AAAA-Www-candidatos.md   los tres candidatos (prompts/tema-semana.md)

`scripts/semana.js` lee los informes de lunes a sábado, agrupa las noticias que
hablan de lo mismo y las puntúa por repetición ponderada por nivel: [A] pesa 3,
[B] 2, [C] 1; por 1,5 si la noticia arrastra una marca de seguimiento; más 1 por
cada día extra en que el tema volvió; más 2 si el observatorio ya tiene dossier
del asunto. Quedan fuera los conceptos que ya tienen Clave en `indice.md`.

## La semana completa, camino `pauta` (el normal desde el 27-09-2026)

| Cuándo | Quién | Qué pasa | Etapa que queda |
|---|---|---|---|
| Domingo | Claude | `node scripts/semana.js` y después `prompts/tema-semana.md`: escribe los TRES candidatos en `semana/AAAA-Www-candidatos.md` y se los presenta a Santiago | |
| Domingo o lunes | Santiago | elige: `node scripts/clave.js elegir <slug> --candidato n` → `tema.md` | `pautar` |
| Lunes | **Claude** | escribe la PAUTA con todo lo que el video debe tocar (`prompts/pauta-clave.md`) | `pauta_lista` |
| Lunes | **Santiago** | lee la pauta (el Taller la muestra completa) y aprueba (`clave.js aprobar <slug>`, sin fecha usa el próximo miércoles) o pide cambios (`clave.js cambiar`) | `pauta_aprobada` o `reparar_pauta` |
| Lunes | GPT | INVESTIGA con fuentes (`prompts/investigacion-clave.md`) → `investigacion.md` | `validar_investigacion` |
| Lunes | Claude | valida el dossier | `investigacion_lista` |
| Martes | GPT | escribe la entrega siguiendo la pauta y la investigación (`prompts/claves.md`, MODO FLUJO) | `validar_entrega` → `entrega_lista` |
| Martes | GPT | escribe el guion (`prompts/guion-claves.md`) | `validar_guion` → `aprobada` |
| Miércoles | Actions | con la Clave `aprobada`, render y subida programada | `videos_listos` |

Las correcciones de GPT (`reparar_investigacion`, `reparar_entrega`,
`reparar_guion`) vuelven a él como en la cadena diaria. `reparar_pauta` es de
**Claude**, no de GPT: es la única reparación que no sale de un veredicto sino
de la nota de Santiago en `aprobacion.md`.

Quién hace cada etapa, en una línea: **Claude** en `pautar`, `reparar_pauta` y
todas las `validar_*`; **Santiago** en `pauta_lista`; **GPT** en
`pauta_aprobada`, `investigacion_lista`, `entrega_lista` y sus tres
`reparar_*`; **Actions** en `aprobada`.

## La semana completa, camino `idea` (el viejo, solo el flujo que quedó abierto)

| Cuándo | Quién | Qué pasa | Etapa que queda |
|---|---|---|---|
| Domingo o lunes | Santiago | elige el tema → `tema.md` | `tema_elegido` |
| Lunes | GPT | escribe la idea (`prompts/clave-idea.md`) | `validar_idea` |
| Lunes | Claude | valida la idea | `idea_lista` |
| Lunes o martes | Santiago | aprueba o pide cambios | `idea_aprobada` o `reparar_idea` |
| Martes | GPT | escribe la entrega (`prompts/claves.md`, MODO FLUJO) | `validar_entrega` → `entrega_lista` |
| Martes | GPT | escribe el guion (`prompts/guion-claves.md`) | `validar_guion` → `aprobada` |
| Miércoles | Actions | render y subida programada | `videos_listos` |

La entrega y el guion van donde siempre, con la fecha de producción que fija la
aprobación: `contenido/claves/FECHA-<slug>.md` y
`contenido/guiones/claves/FECHA-<slug>.md`. Los veredictos del validador:
`contenido/veredictos/clave-<slug>-{idea,investigacion,entrega,guion}.md` (la
pauta no lleva veredicto: la escribe Claude y la aprueba Santiago). La vista del
estado: `contenido/estado/clave-<slug>.md` (la escribe `estado-clave.yml`).

Cuando la etapa queda en `pauta_lista` o `idea_lista`, `estado-clave.yml`
dispara además un AVISO al teléfono de Santiago y el ítem aparece en
`bitacora/bandeja.json`, que es lo que muestra el módulo Bandeja del Taller.

Diseño: `bitacora/PENDIENTES.md`, entrada CLAVE 4, y
`estrategia/decisiones.md`, entradas del 26-09-2026 y del 27-09-2026.
