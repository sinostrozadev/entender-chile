# La doc de YouTube, guardada acá

Las políticas de YouTube que mandan sobre lo que publicamos, traídas por GPT
una vez al mes y guardadas con su fecha.

**Por qué están en el repo.** El proxy de salida de las sesiones de Claude
bloquea `support.google.com` entero. El 06-10-2026 una revisión de carátula se
quedó sin poder verificar el ítem de sangre de la política de miniaturas, y la
regla de Santiago de ese mismo día es que **sin la regla delante no se prohíbe
nada**. GPT sí puede abrir esas páginas. Desde acá las lee cualquiera, siempre.

**Cómo se llenan.** `.github/workflows/doc-youtube.yml` corre el día 1 de cada
mes y abre el pedido con `scripts/pedir-doc-youtube.js`; GPT responde siguiendo
`prompts/doc-youtube.md`. Se puede adelantar a mano desde la pestaña Actions
con "Run workflow".

**Un archivo por mes, y no se borran.** `AAAA-MM-politicas.md`. La serie es la
única forma de ver si una regla cambió y cuándo: un archivo solo dice qué decía
YouTube ese mes, dos dicen si se movió.

**Lo que dice un archivo es TRANSCRIPCIÓN, no resumen**, y así se pidió a
propósito: sobre esto se deciden prohibiciones de carátula y lo que hace falta
son las palabras exactas. Si una sección dice `NO SE PUDO ABRIR`, eso también
es un dato: significa que esa política no está verificada ese mes, y no se cita
como si lo estuviera.
