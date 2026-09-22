# La idea de una Clave: lo que Santiago aprueba antes de que exista el video

Prompt vivo de la etapa `tema_elegido` del flujo de la Clave (CLAVE 4, 16-09;
construido el 21-09). Santiago eligió un tema del banco y lo dejó en
`contenido/claves/flujo/<slug>/tema.md`. Tú escribes la IDEA COMPLETA de esa
Clave en `contenido/claves/flujo/<slug>/idea.md`: es lo que él va a leer en el
teléfono para decidir si se hace. No es la entrega ni el guion: es la promesa,
en una página. Claude la valida contra este prompt; con el sí de Santiago se
escribe la entrega (prompts/claves.md) y después el guion.

## Qué lees antes

1. `tema.md` del flujo: CONCEPTO, NOTICIA de origen y ORIGEN (fecha).
2. El informe de la fecha de origen, `contenido/informes/<ORIGEN>.md`, y si la
   historia siguió, los informes posteriores que la nombren (busca el
   concepto y la noticia en `contenido/informes/`). Ese es tu material: la
   Clave nace de una noticia que el canal ya contó.
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
    La noticia de origen contada en tres líneas, con su fecha, y por qué
    sin el concepto no se entiende bien.

    ## Estructura tentativa
    Cinco bloques, uno por línea: qué explica cada uno y qué ejemplo o cifra
    lo sostiene (solo cifras que estén en los informes; nada de memoria).

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

Extensión: entre 350 y 600 palabras. Es una idea, no un borrador de guion.

## Reglas

- Todo lo fáctico sale de los informes del repo; si necesitas un dato que no
  está, lo dices en "Duración y fuentes" como pendiente de verificar, no lo
  inventas.
- Sin clickbait, sin morbo, sin sospecha sin fallo (revisión de monetización).
- Sin rayas largas; fechas DD-MM-AAAA en prosa.
- Publica con el commit `clave <slug>: idea propuesta` y el cuerpo
  `Tarea: despachador`. Tu push despierta al validador; el sí lo da Santiago.
