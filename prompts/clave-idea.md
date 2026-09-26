# La idea de una Clave: lo que Santiago aprueba antes de que exista el video

Prompt vivo de la etapa `tema_elegido` del flujo de la Clave (CLAVE 4, 16-09;
construido el 21-09; reorientado a la profundidad el 26-09-2026). Santiago
eligió el TEMA DE LA SEMANA entre los tres candidatos del barrido semanal y lo
dejó en `contenido/claves/flujo/<slug>/tema.md`. Tú escribes la IDEA COMPLETA
de esa Clave en `contenido/claves/flujo/<slug>/idea.md`: es lo que él va a leer
en el teléfono para decidir si se hace. No es la entrega ni el guion: es la
promesa, en una página. Claude la valida contra este prompt; con el sí de
Santiago se escribe la entrega (prompts/claves.md) y después el guion.

**Qué clase de Clave es esta** (decisión de Santiago, 26-09-2026): la del tema
que más se repitió en la semana, "explicando en profundidad y enseñando,
trayendo contexto, comienzo de la historia, cosas por las que ha pasado". No es
la explicación de una noticia suelta: es la historia completa de un asunto que
el canal viene contando hace días. La idea tiene que prometer eso o no sirve.

## Qué lees antes

1. `tema.md` del flujo: CONCEPTO, NOTICIA de origen y ORIGEN.
2. Tu material, según lo que diga `ORIGEN`:
   - Si `ORIGEN` es una fecha (AAAA-MM-DD), el informe de ese día,
     `contenido/informes/<ORIGEN>.md`, y los informes posteriores que nombren la
     historia (busca el concepto y la noticia en `contenido/informes/`).
   - Si `ORIGEN` dice "tema de la semana AAAA-Www" (el caso normal desde el
     26-09), lee los informes de TODAS las fechas de la línea `DIAS:` de
     `tema.md`, y además `contenido/claves/semana/AAAA-Www-candidatos.md`, que
     trae la historia ya reunida y el concepto que la Clave viene a enseñar.
     Si `tema.md` trae una línea `DOSSIER:`, léelo completo: ahí están los
     hitos anteriores a esta semana.
   La Clave nace de noticias que el canal ya contó: ese es todo tu material.
3. `contenido/claves/indice.md`: lo ya explicado. Si el concepto ya tiene
   Clave, la idea tiene que decir qué dimensión NUEVA explica, o proponer
   otro ángulo; nunca repetir.
4. `prompts/claves.md`, secciones PROPÓSITO DE LA SERIE y ESTRUCTURA: la idea
   tiene que caber en esa serie y en esa estructura.
5. Si `aprobacion.md` existe y empieza con `CAMBIAR:`, esa nota de Santiago
   manda: rehaces la idea atendiéndola punto por punto y dices al final qué
   cambiaste.

## Qué escribes, con estos encabezados exactos

    # Idea de Clave: <título propuesto>

    SLUG: <el del flujo>
    CONCEPTO: <el de tema.md, tal cual>
    NOTICIA DE ORIGEN: <titular> (<ORIGEN>)

    ## La promesa
    Una o dos frases: qué va a entender el espectador al terminar, dicho
    desde él ("vas a poder leer un IPoM sin que te lo expliquen").

    ## Las preguntas que responde
    Tres a cinco, en orden, cada una de una línea. Son las secciones del
    video en potencia.

    ## El caso de entrada
    Lo que pasó ESTA SEMANA, contado en tres líneas y con sus fechas, y por
    qué sin el concepto no se entiende bien. Si el asunto volvió varios días,
    dilo: es la razón por la que se eligió.

    ## De dónde viene
    Tres a cinco líneas: el comienzo de la historia. Qué decisión, ley o
    hecho la creó, en qué fecha, y por qué hitos ha pasado desde entonces.
    Solo con lo que está en los informes, en el archivo de candidatos y en el
    dossier de casos/ si lo hay. Si el material no alcanza para el origen,
    dilo aquí en una línea en vez de rellenar.

    ## Estructura tentativa
    Seis bloques, uno por línea, en este orden y con lo que sostiene a cada
    uno (solo cifras que estén en los informes; nada de memoria):
    1. gancho con lo que pasó esta semana;
    2. de dónde viene: origen, fecha, decisión que lo creó;
    3. los hitos por los que ha pasado;
    4. cómo funciona el mecanismo o el concepto, enseñado con un ejemplo del
       ciudadano ocupado (alguien que trabaja y quiere entender en diez
       minutos);
    5. qué está en juego ahora;
    6. qué mirar después: la fecha, el trámite o la decisión que viene.

    ## Lo que NO va
    Dos o tres cosas que un espectador esperaría y que quedan fuera, y por
    qué (evita que el video prometa de más).

    ## Carátulas
    Tres, con la regla de la casa: dos líneas separadas por " / ", máximo
    cuatro palabras por línea, desde el espectador, nunca la conclusión.
    Carátula 1 (pregunta): ...
    Carátula 2 (contradicción): ...
    Carátula 3 (cifra con referencia): ...

    ## Duración y fuentes
    Duración estimada (8 a 12 minutos, con el porqué) y las tres a cinco
    fuentes primarias que la entrega va a necesitar (organismo, ley,
    informe), nombradas.

Extensión: entre 400 y 700 palabras (subió el 26-09 al entrar el bloque
"De dónde viene"). Es una idea, no un borrador de guion.

## Reglas

- Todo lo fáctico sale de los informes del repo, del archivo de candidatos y
  del dossier si lo hay; si necesitas un dato que no está, lo dices en
  "Duración y fuentes" como pendiente de verificar, no lo inventas.
- La idea EXIGE que haya historia y concepto. Si al leer el material no hay
  origen que contar ni mecanismo que enseñar, no escribas una idea floja:
  escribe la idea con lo que sí hay y di en "Lo que NO va", en una línea, qué
  parte de la historia el material no sostiene. Santiago decide con eso a la
  vista.
- Sin clickbait, sin morbo, sin sospecha sin fallo (revisión de monetización).
- Sin rayas largas; fechas DD-MM-AAAA en prosa.
- Publica con el commit `clave <slug>: idea propuesta` y el cuerpo
  `Tarea: despachador`. Tu push despierta al validador; el sí lo da Santiago.
