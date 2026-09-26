# Flujo de la Clave (CLAVE 4, con el tema de la semana desde el 26-09-2026)

Un directorio por Clave, nombrado por su slug. La Clave no es diaria: sale una
por semana y cuenta EN PROFUNDIDAD el tema que más se repitió esos días.

    <slug>/tema.md         Santiago eligió el tema       (scripts/clave.js elegir)
    <slug>/idea.md         GPT propuso la idea           (prompts/clave-idea.md)
    <slug>/aprobacion.md   Santiago aprobó o pidió cambios (clave.js aprobar | cambiar)

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

## La semana completa

| Cuándo | Quién | Qué pasa |
|---|---|---|
| Domingo | Claude | `node scripts/semana.js` y después `prompts/tema-semana.md`: escribe los TRES candidatos en `semana/AAAA-Www-candidatos.md` y se los presenta a Santiago |
| Domingo o lunes | Santiago | elige: `node scripts/clave.js elegir <slug> --candidato n` → `tema.md`, etapa `tema_elegido` |
| Lunes | GPT | escribe la idea (`prompts/clave-idea.md`) → `validar_idea` |
| Lunes | Claude | valida la idea → `idea_lista` |
| Lunes o martes | Santiago | aprueba (`clave.js aprobar <slug>`, sin fecha usa el próximo miércoles) o pide cambios (`clave.js cambiar`) → `idea_aprobada` |
| Martes | GPT | escribe la entrega (`prompts/claves.md`, MODO FLUJO) → `validar_entrega` → `entrega_lista` |
| Martes | GPT | escribe el guion (`prompts/guion-claves.md`) → `validar_guion` |
| Miércoles | Actions | con la Clave `aprobada`, render y subida programada; luego `videos_listos` |

Las correcciones (`reparar_idea`, `reparar_entrega`, `reparar_guion`) vuelven a
GPT como en la cadena diaria.

La entrega y el guion van donde siempre, con la fecha de producción que fija la
aprobación: `contenido/claves/FECHA-<slug>.md` y
`contenido/guiones/claves/FECHA-<slug>.md`. Los veredictos del validador:
`contenido/veredictos/clave-<slug>-{idea,entrega,guion}.md`. La vista del
estado: `contenido/estado/clave-<slug>.md` (la escribe `estado-clave.yml`).

Diseño: `bitacora/PENDIENTES.md`, entrada CLAVE 4, y
`estrategia/decisiones.md`, entrada del 26-09-2026.
