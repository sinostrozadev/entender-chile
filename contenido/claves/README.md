# contenido/claves/ : la serie "Claves para entender las noticias"

Una Clave por semana, con flujo propio y dos aprobaciones de Santiago
(`estado-clave.yml`). Qué hay acá:

    AAAA-MM-DD-<slug>.md   la entrega, que escribe GPT con prompts/claves.md
                           (MODO FLUJO), fechada por su día de producción
    flujo/<slug>/          tema.md (lo deja scripts/clave.js al elegir),
                           idea.md (GPT, prompts/clave-idea.md) y aprobacion.md
    semana/                el ranking de la semana (scripts/semana.js) y los
                           tres candidatos (Claude, prompts/tema-semana.md)
    indice.md              lo regenera el script: el catálogo de conceptos ya
                           explicados. No se edita a mano
    banco-temas.md         congelado el 26-09-2026: los temas ya no salen de un
                           banco diario sino del barrido semanal

Las entregas de agosto y de la primera mitad de septiembre son diarias: así
funcionaba la serie antes de la decisión del 16-09-2026.
