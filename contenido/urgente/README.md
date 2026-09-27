# contenido/urgente/ : la guardia y los Shorts exprés

La guardia (`prompts/guardia-reloj.md`, cada 2 horas entre las 08:00 y las
22:00) trabaja acá. Los prefijos dicen quién escribe cada archivo:

    despertador.txt        lo toca la rutina; su push dispara guardia.yml
    AAAA-MM-DD-HHMM-<slug>.md   el hallazgo de la guardia
    RECHAZADO-...          el hallazgo que no pasó el criterio, con el motivo
    PEDIDO-<slug>.md       lo que Claude necesita de la web o una imagen; su
                           push emite el evento a GPT (pedido-gpt.yml)
    FUENTE-<slug>.md       lo que GPT leyó en las páginas, con citas textuales
                           (prompts/lector-gpt.md, o lector.yml)
    GUION-<slug>.md        el guion del Short exprés; su push dispara
                           short-expres.yml
    SUBIDO-<slug>.md       la marca de que el Short se subió, que además
                           deduplica si el guion se pushea dos veces
