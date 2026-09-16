ESTADO: CON OBSERVACIONES — la cadena corrió completa y sin intervención por primera vez desde que la v3 entró en producción (el fix de `estado.yml` del 15-09 quedó probado hoy: cinco piezas, tres correcciones, cero atascos). No hay fallas técnicas. Sí hay dos hallazgos de calidad que se repiten: el patrón "anuncio narrado como hecho consumado" volvió a aparecer, esta vez con un verbo que la regla del 14-09 no cubre, y "Fuentes consultadas" volvió a costar una vuelta de corrección, la segunda vez en los dos días que lleva viva la v3.

Auditada el 16-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`794e9d1`, "métricas 2026-09-16 [bot]"). Horas esperadas tomadas de `contenido/estado/2026-09-16.md` (columna "Se espera a las", que ya calcula `scripts/estado.js` pieza por pieza) y contrastadas con `bitacora/cronograma.json`.

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:40 (01:31 según cronograma) | 01:33 | ok |
| Preselección (GPT), APROBADA vuelta 0 | 02:10 (~01:38) | 01:39 | ok |
| Observatorio plata pública | 01:45 | 01:52 | +7 min, dentro de lo normal |
| Informe (GPT) → CORREGIR v1 01:56 → APROBADA v1 | 02:40 (~02:00) | 01:50 (primera versión), aprobado 02:01 | ok |
| Guion del informe → CORREGIR v1 02:14 → APROBADA v1 | 03:10 | 02:06 (primera versión), aprobado 02:18 | ok |
| Entrega de Clave → CORREGIR v1 02:27 → APROBADA v1 | 03:40 | 02:23 (primera versión), aprobado 02:30 | ok |
| Guion de la Clave, APROBADA vuelta 0 | 04:10 | 02:33 | ok |
| Revisión final (`contenido/revisiones/2026-09-16.md`), APROBADA | 04:30 | 02:39 | ok |
| Edición diaria (compuerta → render → release) | 06:15 | arrancó 02:39, videos y descripciones a las 03:57, release publicado 03:57 | ok, sin el error de release del 13-09 |
| Web (publica podcast) | continuo | 04:11 | ok |
| Reloj de métricas → Métricas | 05:00 | despertador 05:05 → archivo 05:05 | +5 min, ok |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

`contenido/estado/2026-09-16.md`: `ETAPA: videos_listos`, `VEREDICTO: APROBADA`, `FALTA: nada, el día está completo`. Las ocho piezas llegaron antes de su horario esperado. Las cinco piezas del contrato de archivos tienen veredicto `APROBADA` verificado en `contenido/veredictos/2026-09-16-*.md` (cinco archivos, uno por pieza). Verificado con `mcp__github__actions_list` sobre `barrido.yml`, `edicion-diaria.yml`, `metricas.yml`, `web.yml` y `estado.yml`: todas las corridas de hoy (más de 25) terminaron `conclusion: success`, ninguna en `failure` ni `cancelled`.

## Qué falló

Sin fallas técnicas. `node scripts/validar-tarjetas.js --fecha 2026-09-16` no dejó avisos ("variedad OK: ninguna cuota rota, ninguna marca malformada"). Duración real (`contenido/podcast/episodios.json`): informe 640 s (10,7 min), Clave 683 s (11,4 min), ambas dentro de "~10 min, 12-13 en día cargado". Sin marcas `PENDIENTE DE CIERRE` en el informe de hoy.

Sí hay dos hallazgos de calidad, evidencia abajo.

**1. El patrón "anuncio convertido en hecho consumado" volvió a aparecer, con un verbo nuevo.** `contenido/revisiones/2026-09-16.md`, hallazgo de "Guion del informe": el titular "Bolivia extendió por noventa días el estado de excepción" (guion del informe, línea con el bloque de titulares) dice hecho consumado mientras `contenido/informes/2026-09-16.md` dice que el Gobierno "aprobó extender" y "remitió la medida a la Asamblea Legislativa" (pendiente de ratificación). El veredicto lo marca no bloqueante y no lo corrige, igual que las tres veces anteriores. Es la misma familia de error que `bitacora/PENDIENTES.md` línea 642 ya tiene abierta desde el 14-09 (12, 13 y 14-09, todas sobre los verbos "proyecta/anticipa/prevé/anunció"), y la regla que se agregó entonces a `prompts/guion-informe.md` línea 110 sigue en el texto (verificado) y sigue sin cubrir este caso: el informe usa "aprobó" (una acción ya ocurrida) para describir un trámite interno que todavía necesita el paso siguiente ("remitió... a la Asamblea"), y la regla actual solo protege los verbos de intención ("proyecta", "anticipa", "prevé", "anunció", "propone"), no los de aprobación-con-trámite-pendiente.

**2. "Fuentes consultadas" volvió a costar una vuelta de corrección: 2 de 2 días desde que existe la v3.** El veredicto `CORREGIR vuelta 1` del informe de hoy (`contenido/veredictos/2026-09-16-informe.md`, corrección 1) pidió sumar once medios citados en el cuerpo que faltaban en "Fuentes consultadas" (El Mostrador, Meganoticias, Diario Concepción, Radio Pauta, El Dínamo, Notichile, Canal 9 Bío Bío Televisión, Diario de Puerto Montt, DUPLOS, La Voz del Norte y Publimetro). El 15-09, la misma sección fue la razón de que el informe necesitara dos vueltas para acreditar 59 medios (`contenido/revisiones/2026-09-15.md`, resumen). Es el mismo defecto los dos únicos días que lleva viva la cadena v3: GPT arma la lista de fuentes a mano en vez de derivarla de las citas que ya escribió en el cuerpo, y se le escapan nombres cada vez.

## Propuestas

1. En `prompts/guion-informe.md`, sección 9 "EN TITULARES" (línea 110), agregar al final de la frase del matiz: además de "proyecta", "anticipa", "prevé", "anunció" y "propone", proteger también "aprobó" (o cualquier verbo de trámite interno) cuando el propio informe indique un paso siguiente pendiente (remisión, votación, ratificación, entrada en vigencia). Ejemplo concreto para dejar en el prompt: "Bolivia aprobó extender su estado de excepción" en vez de "Bolivia extendió...", tomado del caso de hoy.
2. En `prompts/informe.md`, cerca de la línea 89 ("Al final de la edición, incluye 'Fuentes consultadas'..."), agregar un paso de autoverificación: antes de cerrar el informe, listar cada medio o institución citado en el cuerpo (entre paréntesis o con "vía", "según") y comprobar que cada uno tenga su línea en "Fuentes consultadas"; ninguno puede faltar. Es exactamente el chequeo que hoy hace el validador después, y que le ha costado una vuelta completa al informe los dos días que lleva viva la v3.

## Triage

- **AGUANTA**: propuesta 1. No bloqueó nada y el veredicto lo dejó pasar como no bloqueante, pero es la cuarta vez que aparece la misma familia de error (12, 13, 14 y ahora 16-09) y la regla que se puso para las primeras tres no alcanza para esta variante.
- **AGUANTA**: propuesta 2. No pierde datos ni rompe la edición de mañana (el validador lo atrapa y GPT lo corrige en la misma madrugada), pero es 2 de 2 en los días que lleva viva la cadena v3 y cada vuelta de corrección le cuesta a la cadena unos 5 minutos que hoy sobraron pero no siempre van a sobrar.

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista.

## Comparación con ayer

**Mejoró:**
- La cadena lineal v3 corrió completa por primera vez: barrido, preselección, informe, guion del informe, entrega y guion de la Clave, revisión, render, release y publicación del podcast, sin ningún atasco ni intervención manual. El 15-09 se había congelado entera a las 01:44 porque `estado.yml` no escuchaba `contenido/veredictos/**`; el fix (agregar esa ruta, línea 29 del workflow, con el comentario que explica por qué) está verificado en el archivo y hoy quedó probado en producción: más de 25 corridas de Actions, todas `success`.
- El release de los videos se publicó limpio a las 03:57 (`edicion-2026-09-16`), sin el error 500 de `gh release create` que afectó al 13-09.
- Horas vistas en videos largos siguen subiendo: 18,1 h (13-09) → 18,1 h (14-09) → 18,8 h (15-09) → **19,3 h** (16-09). Vistas totales del canal +231 respecto de ayer, el salto más grande de la semana.
- Nota de archivo: `bitacora/PENDIENTES.md` línea 572 sigue listando como abierto el `estado.yml` de arriba ("marcado HOY, auditoría del 15-09"), pero el fix ya está aplicado y probado hoy en producción. Le corresponde a la sesión de cierre de hoy pasarlo a `bitacora/REALIZADOS.md`; esta auditoría no lo toca porque no es un `HOY` nuevo.

**Sigue igual:**
- El barrido y la preselección siguen puntuales (01:33 y 01:39, dentro del rango de los últimos días).
- La preselección sigue enlazando portada o sección en vez del artículo directo en buena parte de sus candidatas (20 de 50 hoy), la misma observación no bloqueante del 15-09; y Contraloría, Banco Central y Ministerio Público llevan dos días seguidos sin feed consultable directo.

**Nuevo:**
- Retención media ponderada de los largos bajó de 36,0% (15-09) a 33,1% (16-09), tras haber subido los dos días anteriores; una sola caída no es tendencia, conviene mirar mañana si sigue.
- El gancho del guion de la Clave de hoy midió 82 palabras narradas (~36 segundos a 135 ppm), contra los 15 a 25 segundos que pide la estructura (`contenido/revisiones/2026-09-16.md`, hallazgo de "Guion de la Clave"); no bloqueó porque el total de palabras narradas (1.643) siguió dentro de la banda de 1.050 a 1.650, pero es la primera vez que se anota un gancho fuera de rango.

## Objetivo

138 días hasta el 1 de febrero de 2027. 19,3 horas vistas medidas (Analytics, últimos 30 días) de las 4.000 horas que exige el YPP: el canal sigue en una fracción mínima del objetivo, subiendo de forma sostenida (18,1 → 18,1 → 18,8 → 19,3 h en las últimas cuatro mediciones) pero a un ritmo que, de mantenerse, no alcanza a cerrar la brecha en los días que quedan. No es un hallazgo nuevo de hoy: es el contexto en el que se leen todos los de arriba.
