# Investigación para una Clave

Quién: **GPT**, que es quien navega. Llega por el canal de pedidos con
`tarea=lectura` y un `prompt=` que apunta a este archivo.

Qué se espera: un DOSSIER, no un artículo. Es el insumo con el que después se
escribe el guion, así que importa más la precisión que la prosa. Todo lo que
escribas acá tiene que poder citarse.

## Reglas

- **Cada afirmación con su fuente**: medio o institución + fecha + enlace. Sin
  fuente no se escribe.
- **Separa lo confirmado de lo que se dice.** Dos secciones distintas, siempre.
  Si algo lo afirma un solo medio sin documento detrás, va como "se dice", no
  como hecho.
- **Di lo que NO encontraste.** Es tan importante como lo que sí: si el texto
  de un acuerdo no es público, esa frase es material del video, no un vacío.
  Nunca rellenes con lo que suena razonable.
- **Cifras exactas**, con su unidad, su fecha y de dónde salen. Nada de "unos",
  "cerca de" ni "varios" si el número existe.
- **Fechas en orden.** Una cronología aunque sea corta: el video la necesita.
- Sin opinión, sin adjetivos de color, sin conclusiones. Eso viene después.
- Si una pregunta del pedido no se puede responder con fuentes, escríbela en
  la sección de lo que no se sabe y sigue con las otras. No inventes.

## Formato de salida

    # <tema>
    ## Lo confirmado
    (por sub-tema; cada punto con fuente y fecha)
    ## Lo que se dice pero no está confirmado
    ## Cronología
    ## Cifras
    ## Lo que NO se pudo averiguar
    (con qué buscaste y por qué no aparece: ¿no es público, es reservado,
     no existe todavía?)
    ## Fuentes
    (lista con enlaces)
