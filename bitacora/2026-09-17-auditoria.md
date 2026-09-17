ESTADO: CON OBSERVACIONES — la cadena corrió completa, sin atascos y con menos correcciones que ayer (dos vueltas en total, contra tres el 16-09), y "Fuentes consultadas" pasó por primera vez sin corrección tras costar vuelta el 15-09 y el 16-09. No hay fallas técnicas ni HOY. Hay tres hallazgos: un problema de forma en el informe que se repite sin cambios el tercer día seguido (15, 16 y 17-09), un error de cálculo en el panel interno (`contenido/estado/FECHA.md`) que muestra mal la hora de llegada del banco de temas, y una carrera de 29 segundos entre el observatorio y el informe que dejó fuera un hito de hoy de "¿En qué quedó?".

Auditada el 17-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`ea01a6d`, "métricas 2026-09-17 [bot]"). Horas esperadas tomadas de `contenido/estado/2026-09-17.md` (columna "Se espera a las") y del cronograma vigente (`bitacora/cronograma.json`, actualizado 2026-09-16); horas reales, de `mcp__github__actions_list` sobre el repo (barrido.yml, edicion-diaria.yml, metricas.yml, web.yml, estado.yml) más `git log` de cada pieza.

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:40 (01:31 según cronograma) | 01:33 | ok |
| Preselección → CORREGIR v1 01:45 → APROBADA v1 | 02:10 | 01:40 (primera versión), aprobada 01:47 | ok, 1 vuelta |
| Observatorio plata pública (hito de hoy) | 01:45 | 01:54 | +9 min, ver hallazgo 3 |
| Informe → APROBADA v0 | 02:40 | 01:55, aprobado 02:00 | ok, sin correcciones |
| Guion del informe → CORREGIR v1 02:10 → APROBADA v1 | 03:10 | 02:03 (primera versión), aprobado 02:14 | ok, 1 vuelta |
| Revisión final (`contenido/revisiones/2026-09-17.md`), APROBADA | 03:30 | 02:15 | ok |
| Banco de temas de la Clave | 04:00 | 02:17 (real; el panel muestra 04:18, ver hallazgo 2) | ok |
| Edición diaria (compuerta → render → videos listos) | 05:15 | arrancó 02:15, videos listos 02:42, Actions cerró 02:48 | ok |
| Web (publica podcast) | continuo | 02:48 | ok |
| Reloj de métricas → Métricas | 05:00 | despertador 05:05 → archivo 05:05 | +5 min, ok |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

`contenido/estado/2026-09-17.md`: `ETAPA: videos_listos`, `VEREDICTO: APROBADA`, `FALTA: nada, el día está completo`. Las tres piezas validadas tienen veredicto `APROBADA` verificado en `contenido/veredictos/2026-09-17-*.md`. Verificado con `mcp__github__actions_list`: las 28 corridas de hoy sobre `main` (barrido, estado, edición diaria, web, métricas) terminaron `conclusion: success`; ninguna `failure` ni `cancelled`. No hubo Clave hoy, lo que corresponde: desde el 16-09 (CLAVE 4) ya no es diaria y no hay entrega de Claude en `contenido/claves/2026-09-17-*.md` (listado el directorio: solo están las de fechas anteriores).

## Qué falló

Sin fallas técnicas. `node scripts/validar-tarjetas.js --fecha 2026-09-17`: "variedad OK: ninguna cuota rota, ninguna marca malformada" (4 cifra, 2 comparación, 1 esquema, 11 bloques con fuente). Duración real del episodio de hoy (`contenido/podcast/episodios.json`, entrada `2026-09-17`/`informe`): 627 s = 10,4 min, dentro de "~10 min, 12-13 en día cargado". El informe de hoy deja un `PENDIENTE DE CIERRE` (salvoconducto para venezolanos, línea 60), pero es del propio día, con fecha 2026-09-17, no vencido; el informe de ayer no dejó ninguno pendiente para hoy.

Sí hay tres hallazgos, evidencia abajo.

**1. El informe no sigue el orden de secciones del prompt, sin cambios el tercer día seguido.** `contenido/revisiones/2026-09-17.md`, hallazgo de "Informe": "siguen en pie, sin bloquear, el orden de secciones que no sigue el de la lista del prompt, 'Plata pública' y 'Salud' fuera de esa lista, las catorce [C] con sección propia en vez de 'Además, hoy', y la ausencia de 'Agenda de hoy' y 'Dato curioso'". La misma familia de observación está en `contenido/revisiones/2026-09-16.md` ("el orden de secciones que no sigue el del prompt... diecisiete [C] fuera de 'Además, hoy'... la ausencia de 'Agenda de hoy'") y ya asomaba el 15-09 (`contenido/revisiones/2026-09-15.md`: "dieciséis [C] llevan sección propia en las secciones temáticas y solo cinco están en 'Además, hoy'"). Tres días, mismo defecto, ningún cambio: el ciclo lo revisa y lo deja pasar como no bloqueante, pero GPT no lo corrige porque el veredicto nunca lo exige.

**2. `contenido/estado/2026-09-17.md` muestra mal la hora de llegada del banco de temas.** La fila "Banco de temas de la Clave" dice `Llegó: 04:18`, pero el archivo se actualizó por última vez a las 02:48 (línea 5, "ACTUALIZADO: 2026-09-17 02:48") y el commit real que escribió el banco de temas de hoy es de las 02:17 (`git log --format='%cI' -- contenido/claves/banco-temas.md`, commit `a51c21b`, "banco de temas 2026-09-17 [gpt]", 2026-09-17T02:17:39-03:00). 04:18 no puede ser la hora de un evento posterior al cierre del archivo. Causa, en `scripts/estado.js`: la fila "banco" (línea 62-63) es una pieza `hoy: true`, un archivo que se acumula día a día en vez de crearse de nuevo; pero la columna "Llegó" (línea 157: `horaDe(r.rutas[0])`) siempre llama a `horaDe` (línea 102-110), que usa `git log --diff-filter=A` — la hora de la PRIMERA vez que el archivo se creó, hace semanas — y solo le corta el minuto y la hora con `.slice(11)`, sin fecha. Para `banco-temas.md`, que nunca se vuelve a crear, eso imprime para siempre la hora de un commit viejo, no la de hoy. Hoy dio 04:18 solo por azar de qué hora tenía ese commit original.

**3. El observatorio y el informe corrieron con 29 segundos de diferencia y el hito de hoy no llegó a tiempo.** `contenido/veredictos/2026-09-17-informe.md` ya lo señala: "el hito del 17-09 sobre licencias médicas de funcionarios públicos entró en el commit d164c37 (04:54:21 UTC), 39 segundos antes del commit del informe, de modo que no estaba disponible en su lectura". Confirmado en Actions: el push "observatorio 2026-09-17 [claude]" quedó registrado a las 04:54:33 UTC (01:54:33 Chile) y la edición del informe a las 04:55:02 UTC (01:55:02 Chile) — 29 segundos de por medio. El observatorio tiene horario nominal 01:45 (`bitacora/cronograma.json`) pero corrió a las 01:54 hoy; si sigue corriendo más tarde, la carrera con el informe (que hoy llegó a las 01:55) se va a repetir y el informe se va a quedar sin el hito del día en "¿En qué quedó?" cada vez más seguido.

## Propuestas

1. En `prompts/informe.md`, cerca de la línea 101 ("Secciones troncales y opcionales, en este orden..."), agregar el mismo tipo de paso de autoverificación que ya funcionó para "Fuentes consultadas" (línea 89 de este mismo prompt, agregado tras el 16-09 y que hoy pasó limpio por primera vez): antes de cerrar el informe, listar las secciones usadas y compararlas una por una contra el orden de la línea 101-118; comprobar que cada [C] quedó en "Además, hoy" (línea 116) y no en una sección propia; y decidir explícitamente si van "Agenda de hoy" (línea 118) y "Dato curioso" (línea 117), no omitirlas por defecto.
2. En `scripts/estado.js`, línea 157, para las piezas con `pieza.hoy` (hoy solo "banco", línea 62-63), usar la hora del último commit del archivo en vez de `horaDe`: por ejemplo, una función `horaUltimaDe(ruta)` que corra `git log -1 --format=%cI -- <ruta>` (sin `--diff-filter=A`) y aplique el mismo `enChile(...).slice(11)` de la línea 108. Así la columna "Llegó" de "Banco de temas de la Clave" muestra la hora de hoy y no la del commit que creó el archivo.
3. Pedirle a Santiago que decida el orden entre el observatorio (01:45 nominal) y el informe (~01:55 hoy): o el observatorio corre con más margen antes, o el informe espera un minuto de cortesía antes de leer `contenido/casos/hitos.md`, para que un hito del propio día no llegue tarde por segundos.

## Triage

- **AGUANTA**: propuesta 1. No bloquea ni pierde datos (el validador lo deja pasar como no bloqueante), pero es la tercera mañana seguida con el mismo defecto de forma sin ningún cambio.
- **AGUANTA**: propuesta 2. Es un error de un panel interno, no de la cadena de producción: no afecta lo que se publica ni lo que ve Santiago en el informe de la mañana, solo hace ilegible una fila del panel de estado todos los días.
- **MIRAR**: propuesta 3. Hoy no perdió nada (el hito de licencias médicas sigue disponible para el "¿En qué quedó?" de mañana), pero la carrera es de solo 29 segundos y el observatorio ya llegó 9 minutos más tarde que su hora nominal hoy; si ese atraso crece, el informe se va a quedar sin hitos del propio día de forma sistemática.

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista.

## Comparación con ayer

**Mejoró:**
- "Fuentes consultadas" pasó sin corrección por primera vez desde que existe la cadena v3 (vuelta 0 hoy), después de costarle vuelta al informe el 15-09 y el 16-09. La autoverificación agregada al prompt tras la auditoría del 16-09 (propuesta 2 de ese día) funcionó a la primera.
- Menos vueltas de corrección en total: 2 hoy (preselección y guion del informe) contra 3 ayer (informe, guion del informe y entrega de Clave). La cadena también es más corta desde el 16-09 (ya no incluye Clave), así que compara con esa salvedad.
- Horas vistas en videos largos siguen subiendo: 18,8 h (15-09) → 19,3 h (16-09) → **19,9 h** (17-09). La retención media ponderada de los largos, que había caído de 36,0% a 33,1% el 16-09, se mantuvo estable en 33,2% en vez de seguir bajando.

**Sigue igual:**
- El orden de secciones del informe y la falta de "Agenda de hoy"/"Dato curioso" (hallazgo 1 de arriba), sin cambios el tercer día.
- La preselección sigue enlazando redirecciones de Google News en vez del artículo directo (33 de 51 candidatas hoy); el 16-09 el mismo problema de fondo tomó otra forma (20 de 50 enlazaban portada o sección) y el 15-09 fue explícito con Google News también, así que es la misma familia de defecto con intensidad variable, no un hallazgo nuevo.

**Nuevo:**
- El error de la columna "Llegó" del banco de temas en el panel interno (hallazgo 2) y la carrera de 29 segundos entre observatorio e informe (hallazgo 3): ninguno de los dos se había anotado antes.
- Suscriptores bajó de 15 a 14 (-1) tras varios días estables en 15; una sola baja no es tendencia.

Objetivo YPP: 137 días hasta el 1 de febrero de 2027, con 19,9 horas vistas medidas de las 4.000 que exige el programa. Sigue subiendo (18,8 → 19,3 → 19,9 h) pero muy por debajo del ritmo necesario para cerrar la brecha; no es un hallazgo nuevo de hoy, es el contexto de todo lo de arriba.
