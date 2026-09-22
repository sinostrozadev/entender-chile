# Flujo de la Clave (CLAVE 4)

Un directorio por Clave, nombrado por su slug. La Clave ya no es diaria: sale
una o dos veces por semana, con dos aprobaciones de Santiago.

    <slug>/tema.md         Santiago eligió el tema      (scripts/clave.js elegir)
    <slug>/idea.md         GPT propuso la idea          (prompts/clave-idea.md)
    <slug>/aprobacion.md   Santiago aprobó o pidió cambios (clave.js aprobar | cambiar)

La entrega y el guion van donde siempre, con la fecha de producción que fija
la aprobación: `contenido/claves/FECHA-<slug>.md` y
`contenido/guiones/claves/FECHA-<slug>.md`. Los veredictos del validador:
`contenido/veredictos/clave-<slug>-{idea,entrega,guion}.md`. La vista del
estado: `contenido/estado/clave-<slug>.md` (la escribe `estado-clave.yml`).

Etapas: tema_elegido → validar_idea → idea_lista (Santiago) → idea_aprobada →
validar_entrega → entrega_lista → validar_guion → aprobada (render y subida) →
videos_listos. Las correcciones (reparar_*) vuelven a GPT como en la cadena
diaria. Diseño: bitacora/PENDIENTES.md, entrada CLAVE 4.
