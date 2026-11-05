# contenido/urgente/ : pedidos a GPT (y el histórico de los exprés)

La guardia y los Shorts exprés se apagaron el 04-11-2026 (decisión "El
despegue" en `estrategia/decisiones.md`: el canal solo explica). Lo que dejaron
acá es histórico y no se borra:

    AAAA-MM-DD-HHMM-<slug>.md    los hallazgos de la guardia
    GUION-<slug>.md              los guiones de los Shorts exprés
    SUBIDO-<slug>.md             la marca de que cada exprés se subió
    FUENTE-<slug>.md             lo que GPT leyó en las páginas para un exprés
    PEDIDO-AAAA-MM-DD-HHMM-*.md  los pedidos de lectura de la guardia
    PEDIDO-seccion-*.md          pedidos de imagen de sección del informe en video
    despertador.txt              el disparador de la guardia, ya sin efecto

La carpeta sigue viva para los pedidos a GPT. Cada `PEDIDO-*.md` que se
pushea acá lo toma `pedido-gpt.yml`, que emite el evento a GPT según las
líneas `Tarea:`, `Salida:` y `Prompt:` del propio pedido. Los que se siguen
usando:

    PEDIDO-caratula-*.md      la carátula de una pieza
    PEDIDO-doc-youtube-*.md   las políticas de YouTube del mes (doc-youtube.yml)
    PEDIDO-mural-*.md         los paneles del mural de la Clave (scripts/mural-flujo.js)
    PEDIDO-clave-*.md         otros encargos del flujo de la Clave

Lo que GPT entrega vuelve a la ruta que diga la línea `Salida:` del pedido, no
necesariamente a esta carpeta.
