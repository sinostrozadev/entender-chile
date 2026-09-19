ESTADO: CON OBSERVACIONES — la cadena corrió completa y sin fallas técnicas (28 corridas de Actions sobre `main` hoy, todas `success`), con dos vueltas de corrección (informe y guion del informe) contra una sola ayer. No hay `HOY`. Tres hallazgos siguen sin cambios (el orden de secciones del informe, quinto día, con la propuesta de dos auditorías atrás todavía sin aplicar en `prompts/informe.md`; el error de la hora del banco de temas en el panel interno, tercer día, con la misma propuesta sin aplicar en `scripts/estado.js`; y la carrera observatorio-informe, que se repite por tercera vez y esta vez deja al informe con el hito de AYER pese a que el observatorio pusheó antes del commit final de hoy), y uno es nuevo y positivo con reserva: la preselección no trajo ningún enlace de redirección de Google News por primera vez en cinco días, aunque el código que causaba el problema no cambió.

Auditada el 19-09-2026 a las 05:39 de Chile (08:39 UTC), con el checkout sincronizado contra `origin/main` (`6a1735f`, "métricas 2026-09-19 [bot]"). El clon empezó shallow (50 commits) y se profundizó con `git fetch --unshallow` antes de calcular cualquier hora, porque `scripts/estado.js` usa `git log --diff-filter=A` para la hora de llegada y un historial corto falsea esa fecha para archivos acumulativos como `banco-temas.md` (ver hallazgo 2). Horas esperadas tomadas de `contenido/estado/2026-09-19.md` (columna "Se espera a las"); horas reales, de `mcp__github__actions_list` sobre el repo (barrido.yml, edicion-diaria.yml, metricas.yml, web.yml, estado.yml) más `git log` de cada pieza sobre el historial completo.

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:40 | despertador 01:33 → archivo 01:33 | ok |
| Preselección → APROBADA v0 | 02:10 | 01:41 → aprobada 01:45 | ok, sin vuelta |
| Observatorio plata pública (hito de hoy) | 01:45 | 01:56 | +11 min, ver hallazgo 3 |
| Informe → CORREGIR v1 → APROBADA v1 | 02:40 | 01:49 (v0), corregido 01:58, aprobado 02:01 | ok, 1 vuelta (siete correcciones) |
| Guion del informe → CORREGIR v1 → APROBADA v1 | 03:10 | 02:04 (v0), corregido 02:12, aprobado 02:14 | ok, 1 vuelta (cuatro correcciones) |
| Revisión final (`contenido/revisiones/2026-09-19.md`), APROBADA | 03:30 | 02:14-02:15 | ok |
| Banco de temas de la Clave | 04:00 | 02:16 (real; el panel muestra 04:18, ver hallazgo 2) | ok |
| Edición diaria (compuerta → render → videos listos) | 05:15 | arrancó 02:15, videos listos 02:36 (job de Actions) | ok, muy adelantada |
| Web (publica podcast) | continuo | 02:36 | ok |
| Reloj de métricas → Métricas | 05:00 | despertador 05:04 → archivo 05:05 | +5 min, ok |
| Auditoría matinal (esta) | 05:30 | 05:39 | +9 min, ok |

`contenido/estado/2026-09-19.md`: `ETAPA: videos_listos`, `VEREDICTO: APROBADA`, `FALTA: nada, el día está completo`. Las tres piezas validadas tienen veredicto `APROBADA` en `contenido/veredictos/2026-09-19-*.md` (preseleccion vuelta 0, informe vuelta 1, guion_informe vuelta 1). Verificado con `mcp__github__actions_list`: las 28 corridas de hoy sobre `main` en barrido, estado, edición diaria, web y métricas terminaron `conclusion: success`; ninguna `failure` ni `cancelled`. No hubo Clave hoy (listados `contenido/claves/` y `contenido/guiones/claves/`: ninguna entrada con fecha 2026-09-19), lo que corresponde desde CLAVE 4 (16-09).

## Qué falló

Sin fallas técnicas. `node scripts/validar-tarjetas.js --fecha 2026-09-19`: "variedad OK: ninguna cuota rota, ninguna marca malformada" (4 cifra, 1 esquema, 1 comparación, 12 bloques con fuente). Duración real del episodio de hoy (`contenido/podcast/episodios.json`, entrada `2026-09-19`/`informe`): 508 s = 8,5 min, bajo el "~10 min" habitual (ayer fueron 11,8 min) pero sin incumplir nada del prompt; se anota en la comparación con ayer, no como hallazgo. El informe de hoy no deja ningún `PENDIENTE DE CIERRE` (comprobado con grep sobre el archivo completo, sin resultados); tampoco lo dejaba el de ayer.

Hay tres hallazgos que siguen de auditorías anteriores y uno nuevo (positivo, con reserva). Evidencia abajo.

**1. La preselección no trae hoy ningún enlace de redirección de Google News, por primera vez en cinco días — pero el código que causaba el problema no cambió, así que no está claro que sea un arreglo.** `grep -c "news.google.com" contenido/preseleccion/2026-09-19.md` da 0 (contra 38 ayer). Comprobado en `scripts/barrido.js`: la línea ~121 sigue armando las URL de las consultas de Google News tal cual, sin resolver la redirección, y el barrido bruto de hoy trae 175 de 226 noticias destacadas con URL de Google News (77%, medido sobre `contenido/barrido/2026-09-19.json`, campo `motivo_destaque` presente). Las 35 candidatas de hoy simplemente cayeron todas del lado de las 51 destacadas con URL directa, o GPT las resolvió por su cuenta al escribir la preselección; no hay forma de distinguir ambos casos desde el repo. Además, cuatro candidatas de hoy sí tienen un problema de URL distinto: apuntan a una portada o sección en vez del artículo (`https://www.contraloria.cl/portalweb/web/cgr/noticias` para dos candidatas de Contraloría, `https://edicionimpresa.soychile.cl/valparaiso/` para dos de SoyChile), señalado en `contenido/veredictos/2026-09-19-preseleccion.md`.

**2. `contenido/estado/2026-09-19.md` sigue mostrando mal la hora de llegada del banco de temas, tercer día seguido, y la corrección propuesta hace dos auditorías tampoco se aplicó.** La fila "Banco de temas de la Clave" de hoy dice `Llegó: 04:18`, pero el commit real que escribió el banco de temas de hoy es de las 02:16 (`banco de temas 2026-09-19 [gpt]`, verificado con `git log` sobre el historial completo). El `04:18` no es un dato corrupto: es la hora exacta del commit `edición 2026-08-25: claves`, que fue la PRIMERA vez que `contenido/claves/banco-temas.md` se creó, hace 25 días. La causa, diagnosticada el 17-09 y otra vez el 18-09: `scripts/estado.js` línea 102-108 (`horaDe`) usa `git log --diff-filter=A`, que devuelve la primera aparición del archivo, no su último commit; existe una rama especial para piezas `hoy: true` (línea 76, usada para la "vigencia") pero `horaDe` no la usa. Comprobado hoy leyendo esas líneas: sin cambios desde el 18-09. Es un error solo del panel interno; no afecta lo publicado.

**3. La carrera entre el observatorio y el informe se repitió por tercera vez, y esta vez el observatorio llegó antes del commit final del informe sin que eso alcanzara a corregirlo.** El observatorio pusheó el hito de hoy (los nombres de los cuatro jueces cuyos requerimientos fueron declarados inadmisibles) a las 01:56; la corrección del informe (vuelta 1) se pusheó a las 01:58, dos minutos después. Aun así, la sección "¿En qué quedó?" del informe publicado trae la versión de AYER (los "siete cuadernos... pendientes... La Tercera y El Mostrador, 18 sep"), no la de hoy. Comprobado con el diff exacto de la corrección (`git diff bf52ad0 e98de3f -- contenido/informes/2026-09-19.md`): las siete correcciones de la vuelta 1 no tocan la sección "¿En qué quedó?", porque el prompt (`prompts/informe.md` línea 153) instruye leer `contenido/casos/hitos.md` "en esta misma ejecución", es decir, cuando GPT escribió la vuelta 0 a las 01:49 — siete minutos antes de que el observatorio corriera. El commit final llegando después del observatorio no ayuda si nada dentro del ciclo de corrección vuelve a mirar los hitos. Es la tercera vez (17-09 el informe ganó por 29 s, 18-09 el observatorio llegó 6 min tarde, hoy el observatorio llegó a tiempo pero la arquitectura de la corrección igual lo dejó afuera): la auditoría del 18-09 ya avisó que si se repetía una tercera vez debía dejar de ser "mirar".

## Propuestas

1. En `scripts/estado.js`, línea 102-108 (`horaDe`), para las piezas con `pieza.hoy` (hoy solo "banco"), usar el último commit del archivo (`git log -1 --format=%cI`, sin `--diff-filter=A`) en vez de la primera aparición — la misma corrección redactada el 17-09 y el 18-09, todavía sin llevar al código.
2. En `prompts/informe.md`, línea 101 ("Secciones troncales y opcionales..."), agregar la autoverificación de estructura que ya tiene "Fuentes consultadas" (línea 89): antes de cerrar, listar las secciones usadas y compararlas contra el orden de las líneas 101-118, confirmando que cada [C] quedó en "Además, hoy" y no en sección propia — la misma corrección redactada el 17-09 y el 18-09, todavía sin llevar al prompt.
3. Sobre la carrera observatorio-informe (hallazgo 3): dado que ya son tres repeticiones con resultados distintos cada vez, la solución de horario (correr el observatorio más temprano) ya demostró no ser suficiente por sí sola. Proponer en su lugar un cambio de arquitectura: que el paso de corrección del informe (`prompts/informe.md`, la instrucción de la línea 153) se vuelva a ejecutar contra `contenido/casos/hitos.md` en CADA vuelta de corrección, no solo en la vuelta 0, para que un hito que llegue tarde por minutos aún pueda entrar si hay una corrección en curso. Alternativa más simple: que el validador, al recibir la pieza para revisar, compare la fecha de `contenido/casos/hitos.md` contra la hora de escritura del informe y, si el observatorio es más nuevo, lo señale como corrección obligatoria de la vuelta.
4. Sobre las cuatro URL de portada/sección en la preselección de hoy (hallazgo 1): no hay una propuesta de código todavía; es un caso puntual de la etapa de preselección al no encontrar el enlace directo. Vale la pena revisar en la próxima auditoría si vuelve a pasar antes de proponer un arreglo — hoy sería una propuesta sin evidencia de patrón.

## Triage

- **AGUANTA**: propuesta 1. Tercer día del mismo defecto de panel interno; la propuesta ya existe redactada desde el 17-09 y no se aplicó.
- **AGUANTA**: propuesta 2. Quinto día del mismo defecto de forma; la propuesta ya existe redactada desde el 17-09 y no se aplicó.
- **AGUANTA**: propuesta 3. Tercera repetición de la carrera, con un mecanismo nuevo (el observatorio llegó a tiempo y aun así no entró). Deja de ser "mirar" por el propio criterio de la auditoría de ayer, pero tampoco rompe la edición de mañana ni pierde datos: el informe queda con información de ayer en una sección secundaria, no con un error.
- **MIRAR**: hallazgo 1 (URLs de Google News). Falta un segundo día sin el problema para saber si es una mejora real o una coincidencia de qué candidatas se eligieron hoy; las cuatro URL de portada/sección son un caso nuevo y aislado, a vigilar si se repite.

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista. No se agrega nada a `bitacora/PENDIENTES.md`.

## Comparación con ayer

**Mejoró:**
- La preselección de hoy no trae ningún enlace de redirección de Google News (38 ayer, 0 hoy), aunque con la reserva del hallazgo 1.
- Horas vistas en videos largos siguen subiendo: 19,9 h (17-09) → 20,8 h (18-09) → **21,1 h** (19-09).

**Sigue igual:**
- El orden de secciones del informe (`prompts/informe.md`, propuesta 2), quinto día, propuesta sin aplicar.
- El error de la hora del banco de temas en el panel interno (`scripts/estado.js`, propuesta 1), tercer día, propuesta sin aplicar.
- La retención media ponderada de los largos se mantiene prácticamente estable: 33,0% (18-09) → 32,5% (19-09).
- Suscriptores sin cambio: 15 (+0).

**Peor / nuevo:**
- Dos vueltas de corrección hoy (informe y guion del informe) contra una sola ayer (solo guion del informe); ninguna alcanzó el tope ni bloqueó nada.
- La carrera observatorio-informe (hallazgo 3) se repite por tercera vez, ahora con el observatorio llegando a tiempo respecto al commit final y aun así sin que el hito entrara — ver propuesta 3.
- El episodio de hoy duró 8,5 minutos, bajo el "~10 min" habitual (11,8 min ayer); no incumple el prompt pero es la duración más corta reciente.

Objetivo YPP: 135 días hasta el 1 de febrero de 2027, con 21,1 horas vistas medidas de las 4.000 que exige el programa. Sigue subiendo (20,8 → 21,1 h) pero muy por debajo del ritmo necesario para cerrar la brecha; no es un hallazgo nuevo de hoy, es el contexto de todo lo de arriba.
