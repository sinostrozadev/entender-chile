ESTADO: CON OBSERVACIONES — la cadena corrió completa y sin fallas técnicas (todas las corridas de Actions sobre `main` de hoy, `conclusion: success`, verificado con `mcp__github__actions_list`), pero con dos vueltas de corrección en el informe (contra una el 19-09) que lo dejaron al borde del tope de dos vueltas, y con un hallazgo de preselección que venía como aislado el 19-09 y hoy se triplicó: 28 de 44 candidatas con URL de portada en vez del artículo. Se identificó la causa exacta en `scripts/barrido.js:305`. No hay `HOY`.

Auditada el 20-09-2026 a partir de las 05:32 de Chile (08:32 UTC), con el checkout sincronizado contra `origin/main` (`357b93b`, "métricas 2026-09-20 [bot]"). Horas reales tomadas de `mcp__github__actions_list` (workflows barrido, estado, edición diaria, web, métricas) y de `git log` con `TZ=America/Santiago` sobre el historial completo del repo (sin clon shallow). No hubo Clave hoy, lo que corresponde desde CLAVE 4 (16-09): ni `contenido/claves/` ni `contenido/guiones/claves/` tienen entrada de fecha 2026-09-20 (comprobado listando ambas carpetas completas).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Estado |
|---|---|---|
| Reloj del barrido → Barrido | 01:33 → archivo listo | ok |
| Preselección → APROBADA v0 | 01:40 → aprobada 01:44 | ok, sin vuelta |
| Observatorio plata pública | 01:52 | ok; sin hito nuevo hoy (`contenido/casos/hitos.md` termina en 19-09), no compite con el informe |
| Informe: v0 01:50 → CORREGIR v1 01:57 → CORREGIR v2 02:03 → APROBADA v2 02:06 | — | ok, 2 vueltas, ver hallazgo 1 |
| Guion del informe: v0 02:10 → CORREGIR v1 02:16 → APROBADA v1 02:21 | — | ok, 1 vuelta (cinco correcciones) |
| Revisión final (`contenido/revisiones/2026-09-20.md`) | 02:21 | APROBADA |
| Banco de temas de la Clave | 02:23 (real) | ok; panel sigue mostrando otra hora, ver hallazgo 3 |
| Edición diaria (render → videos → YouTube → podcast → web) | arrancó 02:21, todo listo 02:42 (job completo, 21 pasos, todos `success`) | ok, muy adelantada |
| Reloj de métricas → Métricas | 05:05 | ok, +5 min |

`node scripts/validar-tarjetas.js --fecha 2026-09-20`: "variedad OK: ninguna cuota rota, ninguna marca malformada" (5 cifra, 2 barras, 2 esquema, 1 cita, 1 cambio, 12 bloques con fuente). Duración real del episodio de hoy (`contenido/podcast/episodios.json`, entrada `2026-09-20`/`informe`): 641 s = 10,7 min, dentro de "~10 min, 12-13 en día cargado". El informe de hoy no deja ningún `PENDIENTE DE CIERRE` (comprobado con grep sobre el archivo completo, sin resultados). No hay marcas vencidas de días anteriores: el único caso abierto de fondo, la investigación por secuestro extorsivo vinculada al exfiscal Fodich (`PENDIENTE DE CIERRE` del 11-09, "hechos formalizados y medidas cautelares"), sigue sin ese cierre formal a los 9 días, pero no está estancado: el informe de hoy trae un desarrollo nuevo del caso ([B], línea 56, la unidad de la PDI investigada), así que se sigue cubriendo, no es una omisión.

## Qué falló

Sin fallas técnicas. Tres hallazgos de calidad, dos de arrastre y uno que empeoró de forma medible.

**1. El informe necesitó dos vueltas de corrección y quedó al borde del tope (BLOQUEADA es la vuelta siguiente).** `contenido/veredictos/2026-09-20-informe.md`: CORREGIR vuelta 1 (01:57, la cita de Claudio Alvarado con un cargo que no calzaba con el resto del repo), CORREGIR vuelta 2 (02:03, la corrección de vuelta 1 dejó otro cargo distinto), APROBADA vuelta 2 (02:06, recién a la tercera escritura del dato). El propio contrato de archivos fija el tope en dos vueltas; hoy se llegó exactamente ahí. No es un hallazgo de proceso (el validador hizo su trabajo, verificando el cargo contra cinco piezas previas del repo antes de aprobar), es una señal de que la fuente de origen (el barrido) no traía el cargo de Alvarado de forma resoluble a la primera, algo a vigilar si se repite.

**2. Preselección: 28 de las 44 candidatas de hoy traen la URL de la portada del medio (soychile.cl/, biobiochile.cl/, cooperativa.cl/, infobae.com/chile/) en vez del enlace de la noticia — el triple que el 19-09 (4 candidatas) — y se encontró la causa exacta.** Comprobado cruzando `contenido/barrido/2026-09-20.json` (630 noticias, ninguna con URL de portada) contra `contenido/barrido/2026-09-20.md` (lo que GPT lee para escribir la preselección): las 28 candidatas afectadas vienen todas de una búsqueda de Google News cuyo `link` es un redirect `news.google.com/rss/articles/...` (verificado por título: "Exportaciones de litio...", "Suspendieron al secretario municipal de Puerto Montt...", el femicidio de Villarrica, todas con ese patrón en el JSON). `scripts/barrido.js` línea 305 omite deliberadamente la URL cuando contiene `news.google.com` (`n.url && !n.url.includes("news.google.com") ? ... : ""`), así que esas entradas llegan al `.md` sin ninguna URL — comprobado línea por línea: "Exportaciones de litio..." (barrido.md:149-150) no trae URL debajo, mientras una noticia con `link` directo como "Presidente Kast..." (barrido.md:362-364) sí la trae. Sin URL que copiar, GPT rellena con la portada del medio al escribir la preselección. Esto confirma y cierra la duda que dejó abierta la auditoría del 19-09 ("no hay forma de distinguir ambos casos desde el repo"): sí hay forma, y la causa está identificada.

**3. El panel interno sigue mostrando mal la hora de llegada del banco de temas, ahora cuarto día seguido, con la misma corrección redactada el 17-09 sin aplicar.** `scripts/estado.js` línea 102-108 (`horaDe`) sigue usando `git log --diff-filter=A` (la primera aparición del archivo, hace 25 días) en vez de su último commit para la pieza `hoy: true`; el propio comentario del código lo admite ("la primera vez que apareció... no su última edición"), sin cambios desde el 18-09. Es un error solo del panel; no afecta lo publicado.

**4. Siguen sin aplicarse las tres observaciones estructurales del informe que arrastra la cadena, y una de ellas hoy tiene una infracción concreta y no solo de forma.** (a) 12 de las 13 noticias [C] de hoy quedan repartidas en secciones temáticas en vez de "Además, hoy" (que trae solo una, Puerto Montt) — la autoverificación de estructura que pide la propuesta del 19-09 sigue sin estar en `prompts/informe.md`. (b) "## Salud" aparece como encabezado de sección (línea 98) sin figurar en la lista de secciones del prompt (líneas 108-118). (c) El bloque `### [B] Chile obtiene un oro inédito en vóleibol femenino` (línea 186) lleva peso `[B]`, contra `prompts/informe.md` línea 75: "Deportes, dato curioso, el tiempo y agenda no llevan peso; tienen formato propio" — esta no es una preferencia de forma, es una regla explícita que el informe de hoy incumple directamente. Además, el cierre de cautela del mismo molde en casi todas las [B] y [C] se repite, cuarto día seguido (según el propio veredicto de hoy).

**5. Cuarto día con fuentes primarias declaradas inaccesibles en el barrido.** Hoy: Contraloría, Banco Central, Cámara y Ministerio Público no pudieron abrirse, y la Dirección Meteorológica cargó sin el detalle de sus avisos (declarado en `contenido/veredictos/2026-09-20-preseleccion.md`); el 18-09 ya se anotó "por tercer día" el mismo patrón con un conjunto de fuentes parecido. La preselección de hoy se apoyó casi solo en prensa.

## Propuestas

1. En `scripts/barrido.js`, línea 305, no descartar la URL cuando es un redirect de `news.google.com`: imprimirla igual (con una nota "redirect, resolver antes de citar" si se quiere marcar), en vez de dejar la entrada sin ningún enlace. Hoy GPT no tiene otra fuente de URL que fabricar la portada del medio; darle el redirect, aunque no sea el enlace final, es mejor que nada y detiene la fabricación de URLs falsas. Alternativa más completa, para una noche con más tiempo: resolver el redirect con una petición HTTP antes de escribir el `.md`, y cachear el resultado.
2. En `prompts/informe.md`, línea 89 (donde ya existe la autoverificación de "Fuentes consultadas"), agregar una autoverificación de estructura antes de cerrar: listar las secciones usadas y las noticias [C], y confirmar que ninguna sección usada quede fuera de las líneas 108-118 (así "Salud" no puede colarse) y que todo [C] esté en "Además, hoy". Misma propuesta redactada el 17-09, ahora con dos infracciones concretas de hoy (Salud, y el peso [B] del deporte) como evidencia adicional de que sin autoverificación automática el prompt no se respeta solo.
3. En `scripts/estado.js`, línea 102-108 (`horaDe`), para las piezas con `pieza.hoy`, usar `git log -1 --format=%cI` (sin `--diff-filter=A`) en vez de la primera aparición del archivo. Misma corrección redactada el 17-09.
4. Sobre el hallazgo 1 (dos vueltas del informe): sin propuesta de código todavía, es un caso puntual de una cita mal resuelta a la primera. Revisar en la próxima auditoría si vuelve a pasar antes de proponer un cambio al prompt del informe o del validador.

## Triage

- **AGUANTA**: propuesta 1 (URLs de portada en la preselección). Pasó de aislado (4 candidatas, 19-09) a mayoritario (28 de 44, 20-09) con causa ya identificada; no rompe la edición de mañana (la etapa del informe puede seguir abriendo la fuente de nuevo, como ya hace), pero cada día que pasa sin la corrección le suma trabajo manual a esa etapa y candidatas mal citadas si nadie reabre la fuente.
- **AGUANTA**: propuesta 2 (estructura del informe). Sexto día del mismo defecto de forma (redactado el 17-09), y hoy con dos infracciones puntuales de una regla explícita del propio prompt (Salud fuera de lista, peso [B] al deporte).
- **AGUANTA**: propuesta 3 (hora del banco de temas en el panel). Cuarto día del mismo defecto, cosmético, sin efecto en lo publicado.
- **MIRAR**: hallazgo 1 (dos vueltas de corrección, al borde del tope). Un solo día; si se repite, deja de ser "mirar" y hay que revisar si el barrido está entregando bien los cargos y roles de las fuentes citadas.
- **MIRAR**: hallazgo 5 (fuentes primarias inaccesibles). Cuarto día del mismo patrón general, pero con instituciones que varían día a día (posible intermitencia del lado de esos sitios, no necesariamente del barrido); vigilar si es siempre el mismo conjunto antes de proponer un reintento en código.

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista. No se agrega nada a `bitacora/PENDIENTES.md`.

## Comparación con ayer

**Mejoró:**
- Horas vistas en videos largos siguen subiendo: 20,8 h (18-09) → 21,1 h (19-09) → **21,9 h** (20-09), el mayor salto de los tres días.
- La carrera observatorio-informe (hallazgo 3 de ayer, tercera repetición) no se repitió hoy porque no hubo hito nuevo que disputar; sigue sin corregirse en el código, pero hoy no causó daño.
- Se cerró la duda que dejó abierta la auditoría del 19-09 sobre las URL de portada: hoy se pudo probar la causa exacta (`scripts/barrido.js:305`) en vez de dejarla como sospecha.

**Sigue igual:**
- El orden de secciones del informe (`prompts/informe.md`, propuesta 2), sexto día, propuesta sin aplicar.
- El error de la hora del banco de temas en el panel interno (`scripts/estado.js`, propuesta 3), cuarto día, propuesta sin aplicar.
- Fuentes primarias inaccesibles en el barrido, cuarto día del mismo patrón.
- Retención media ponderada de los largos, estable: 32,5% (19-09) → 32,7% (20-09).
- Suscriptores sin cambio: 15 (+0).

**Peor / nuevo:**
- Dos vueltas de corrección en el informe hoy (una sola vuelta cada día del 17-09 al 19-09); llegó al borde del tope de dos vueltas.
- Las URL de portada en la preselección pasaron de 4 candidatas (19-09) a 28 de 44 (20-09).
- El cierre de cautela del mismo molde en las [B]/[C] llega a su cuarto día seguido (según el propio veredicto de hoy).
- El peso `[B]` en una noticia de deporte contradice, por primera vez de forma explícita en las auditorías recientes, una regla textual del prompt (línea 75) y no solo una preferencia de orden.

Objetivo YPP: 134 días hasta el 1 de febrero de 2027, con 21,9 horas vistas medidas de las 4.000 que exige el programa. Sigue subiendo (20,8 → 21,1 → 21,9 h) con el mayor incremento diario de la semana, pero muy por debajo del ritmo necesario para cerrar la brecha; no es un hallazgo nuevo de hoy, es el contexto de todo lo de arriba.
