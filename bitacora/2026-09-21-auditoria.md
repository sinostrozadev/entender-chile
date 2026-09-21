ESTADO: CON OBSERVACIONES — la cadena corrió completa, rápida y sin fallas técnicas (todas las corridas de GitHub Actions sobre `main` de hoy, `conclusion: success`, verificado con `mcp__github__actions_list`), con el informe bajando a una sola vuelta de corrección (dos ayer) y sin las infracciones puntuales de prompt de ayer (Salud fuera de lista, peso [B] al deporte). Pero dos historias del barrido —el caso Ojeda, que el canal cubrió los días 10 a 13-09, y una alarma de 16 muertos en un hogar de ancianos de Pitrufquén— no llegaron ni a la preselección ni al informe sin dejar ningún rastro de descarte, y se identificó por qué: el despachador solo lee las `Correcciones:` de un veredicto CORREGIR, nunca las `Observaciones` no bloqueantes de un APROBADA, así que lo que el propio validador recomendó hoy ("recógela por FUERA DE LA OLLA") nunca llegó a quien escribe el informe. No hay `HOY`.

Auditada el 21-09-2026 a partir de las 05:30 de Chile (aprox. 08:31 UTC), con el checkout sincronizado contra `origin/main` (`781fd8e`, "métricas 2026-09-21 [bot]"). Horas reales tomadas de `mcp__github__actions_list` (workflows Barrido, Estado del día, Edición diaria, Web, Métricas) y de `git log` con `TZ=America/Santiago` sobre el historial del repo. No hubo Clave hoy, lo que corresponde desde CLAVE 4 (16-09): la última entrega sigue siendo la del 16-09 (comprobado listando `contenido/claves/` y `contenido/guiones/claves/` completas, sin entradas de fecha 21-09-2026).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada | Estado |
|---|---|---|---|
| Barrido | 01:33 | 01:30 | ok, +3 min |
| Preselección → APROBADA v0 | 01:43 → 01:47 | ~01:35 en adelante | ok, sin vuelta |
| Observatorio plata pública | 01:51 (push `observatorio 2026-09-21`) | ~01:45 | ok |
| Informe: v0 01:53 → CORREGIR v1 02:00 → APROBADA v1 02:03 | — | — | ok, 1 vuelta (mejora sobre las 2 de ayer) |
| Guion del informe: v0 02:08 → CORREGIR v1 02:14 → APROBADA v1 02:19 | — | — | ok, 1 vuelta |
| Revisión final (`contenido/revisiones/2026-09-21.md`) | 02:19 | — | APROBADA |
| Banco de temas de la Clave | 02:20 (real, commit `0657d19`) | — | ok; panel muestra 04:18, ver hallazgo 1 |
| Edición diaria (render → videos → YouTube → podcast → web) | arrancó 02:19, `videos_listos` 02:46 (Actions `run 112`, `conclusion: success`) | ~04:00–05:15 | ok, muy adelantada |
| Reloj de métricas → Métricas | 05:06 (Actions, `conclusion: success`) | 05:00 | ok, +6 min |

`node scripts/validar-tarjetas.js --fecha 2026-09-21`: "variedad OK: ninguna cuota rota, ninguna marca malformada" (3 cifra, 2 esquema, 2 comparación, 1 barras, 1 cambio, 11 bloques con fuente). Duración real del episodio de hoy (`contenido/podcast/episodios.json`, entrada `2026-09-21`/`informe`): 664 s = 11,1 min, dentro de "~10 min, 12-13 en día cargado". El informe de hoy deja un `PENDIENTE DE CIERRE` nuevo y con fecha de hoy (línea 24, balance final de Fiestas Patrias) y su propio bloque interno confirma que el del 20-09 no tenía marca exigible hoy; no hay marcas vencidas. El caso Fodich (`PENDIENTE DE CIERRE` del 11-09, sigue sin el cierre formal a 10 días) no aparece hoy, pero no está estancado: se cubrió hasta ayer (20-09, `### Investigación por secuestro extorsivo`) y hoy simplemente no hubo desarrollo nuevo que reportar.

## Qué falló

Sin fallas técnicas. Cuatro hallazgos de calidad: dos de arrastre sin corregir, uno nuevo sobre un hueco de proceso concreto (con causa identificada) y uno sobre la fiabilidad del propio ciclo de revisión.

**1. El panel interno sigue mostrando mal la hora de llegada del banco de temas, ahora quinto día seguido, con la misma corrección redactada el 17-09 sin aplicar.** `contenido/estado/2026-09-21.md` muestra "Banco de temas de la Clave | al día | 04:18", pero el commit real (`0657d19`, "banco de temas 2026-09-21 [gpt]") es de las 02:20:22 de Chile — comprobado con `git log --format=%cI` sobre el archivo. `scripts/estado.js` líneas 102-108 (`horaDe`) sigue intentando primero `git log --diff-filter=A` (la primera aparición del archivo) antes de caer al último commit; el propio comentario del código lo admite ("la primera vez que apareció... no su última edición"). Es un error solo del panel; no afecta lo publicado.

**2. Preselección: las URL de portada en vez del enlace de la noticia siguen sin corregirse, tercer día del mismo patrón (24 de 45 candidatas hoy).** `contenido/revisiones/2026-09-21.md`: "Es la misma observación del 19 y del 20-09." La proporción bajó de 28/44 (63,6%, ayer) a 24/45 (53,3%, hoy), pero la causa identificada el 20-09 —`scripts/barrido.js` línea 305, que descarta la URL cuando es un redirect de `news.google.com`— sigue sin tocarse.

**3. Dos historias reales del barrido de hoy no llegaron a ninguna pieza publicada y no dejaron ningún rastro de descarte, y se identificó la causa exacta: el despachador nunca lee las observaciones no bloqueantes de un veredicto APROBADA.** `contenido/veredictos/2026-09-21-preseleccion.md` (APROBADA vuelta 0, así que sin sección `Correcciones:`) documenta en su texto libre de "Observaciones": (a) el caso Ojeda — "La Fiscalía de Chile volvió a apuntar a Diosdado Cabello por el asesinato del exmilitar venezolano Ronald Ojeda" / "Fiscal chileno confirma que Diosdado Cabello contrató al Tren de Aragua para asesinar a Ronald Ojeda", corroborado en 4 fuentes (`contenido/barrido/2026-09-21.md` líneas 19, 77 y 141), historia que el canal contó en los informes del 10 al 13-09; el propio validador escribió que "la etapa del informe debería recogerla por la vía FUERA DE LA OLLA"; (b) la alarma "Incendio en hogar de ancianos en Pitrufquén, Chile: 16 muertos" (`contenido/barrido/2026-09-21.md` línea 153, Pulzo, un solo medio), que el prompt de selección debía marcar "(sin confirmar)" y en cambio no dejó ningún rastro. Comprobado: ni "Ojeda", ni "Cabello", ni "Tren de Aragua" aparecen en `contenido/preseleccion/2026-09-21.md` ni en `contenido/informes/2026-09-21.md` ni en `contenido/guiones/informe/2026-09-21.md` (grep sobre los tres archivos, sin resultados); la preselección de hoy tampoco trae ninguna sección de rastro de descarte por candidata (a diferencia del bloque interno del informe, que sí la tiene). La causa: `prompts/despachador-gpt.md` línea 73 solo hace leer las `Correcciones:` numeradas cuando el veredicto es CORREGIR; con APROBADA, el despachador nunca abre el resto del veredicto, así que la recomendación del validador quedó escrita pero invisible para quien redacta la siguiente pieza. No bloquea (el prompt de selección no exige una lista fija de titulares), pero es una historia con desarrollo real que el canal ya venía siguiendo y hoy se cayó sin que nadie —fuera de quien lea el veredicto a mano— vuelva a verla.

**4. El contador de días del hallazgo de "cautela del mismo molde" no avanzó entre ayer y hoy: los dos veredictos dicen, literalmente, "cuarto día seguido".** `contenido/revisiones/2026-09-20.md`: "el cierre de cautela del mismo molde en casi todas las [B] y [C], cuarto día seguido." `contenido/revisiones/2026-09-21.md`: "Cuarto día seguido en que casi todas las [B] y [C] del informe cierran con una frase de cautela del mismo molde." Debería decir "quinto". El patrón de fondo (los cierres de [B]/[C] repiten la misma fórmula de cautela) parece real —aparece consecutivamente desde el 19-09—, pero el número que el validador le pone no es un conteo fiable: dos días seguidos con el mismo dígito sugiere que se copia la frase en vez de recalcularla. Es un hallazgo sobre el propio ciclo de revisión, no sobre el informe.

**Nota, no hallazgo:** la retención real y las horas vistas en videos largos (`bitacora/metricas/2026-09-21.md` línea 103) quedaron en el mismo valor exacto que ayer, 22,8 h y 32,7%, tras cinco días de alza sostenida (19,3 → 19,9 → 20,8 → 21,1 → 22,8). Es una ventana de Analytics de 30 días con rezago de procesamiento conocido; sin una segunda coincidencia no alcanza para proponer nada. Vigilar mañana.

## Propuestas

1. En `scripts/estado.js`, líneas 102-108 (`horaDe`), para las piezas con `pieza.hoy`, usar `git log -1 --format=%cI` (sin `--diff-filter=A`) en vez de la primera aparición del archivo. Misma corrección redactada el 17-09.
2. En `scripts/barrido.js`, línea 305, no descartar la URL cuando es un redirect de `news.google.com`: imprimirla igual (o resolver el redirect antes de escribir el `.md`). Misma corrección redactada el 20-09.
3. En `prompts/despachador-gpt.md`, cerca de la línea 73 ("Lee `contenido/veredictos/FECHA-<pieza>.md`. Trae `Correcciones:` numeradas..."), agregar que además de las `Correcciones:` de un CORREGIR, el despachador debe leer y considerar el texto de `Observaciones` de un veredicto APROBADA antes de escribir la pieza siguiente de la cadena (al menos las que el validador marque como candidatas a "FUERA DE LA OLLA" o a la marca "(sin confirmar)" de `prompts/seleccion.md`). Sin este cambio, cualquier observación no bloqueante que el validador escriba en una pieza aprobada seguirá siendo invisible para el resto de la cadena.
4. Sobre el hallazgo 4 (contador de días trabado): sin propuesta de código, es un defecto de redacción del validador, no del pipeline. Revisar en las próximas auditorías si el conteo se corrige solo o si conviene pedirle en `prompts/validador.md` que calcule el día contando hacia atrás en `contenido/revisiones/` en vez de estimarlo.

## Triage

- **AGUANTA**: propuesta 1 (hora del banco de temas en el panel). Quinto día del mismo defecto, cosmético, sin efecto en lo publicado.
- **AGUANTA**: propuesta 2 (URLs de portada en la preselección). Tercer día del mismo patrón; bajó en proporción pero la causa de código sigue sin tocarse.
- **AGUANTA**: propuesta 3 (observaciones no leídas del despachador). Primer día que se ve el efecto concreto (Ojeda, Pitrufquén), pero el hueco de proceso es estructural, no un accidente de hoy, y puede repetirse cualquier día que un veredicto APROBADA traiga una observación relevante.
- **MIRAR**: hallazgo 4 (contador de "día seguido" trabado). Un solo caso claro de no incremento; si vuelve a pasar deja de ser un defecto de redacción y hay que intervenir el prompt del validador.
- **MIRAR**: la nota de retención estancada en el mismo valor exacto dos días seguidos. Un solo caso; vigilar si se repite un tercer día antes de sospechar de la fuente de datos.
- **MIRAR** (arrastre): fuentes primarias inaccesibles en el barrido (hoy: Cámara bloqueada; Contraloría, Banco Central, Senado y Fiscalía Nacional sin novedades declaradas), mismo patrón que días anteriores con instituciones que varían.

Sin `HOY`: nada de lo encontrado hoy rompe la edición de mañana, pierde datos o quedó publicado con un defecto que un espectador note a simple vista. No se agrega nada a `bitacora/PENDIENTES.md`.

## Comparación con ayer

**Mejoró:**
- El informe necesitó una sola vuelta de corrección hoy, contra dos ayer (que lo habían dejado al borde del tope).
- Ninguna de las dos infracciones puntuales de ayer se repitió: no hay sección "Salud" fuera de la lista del prompt ni peso `[B]` en una noticia de deporte (hoy no hubo deporte).
- La proporción de URLs de portada bajó de 63,6% (28/44) a 53,3% (24/45), aunque la causa de fondo sigue igual.
- La cadena volvió a terminar muy adelantada (`videos_listos` a las 02:46, contra 02:42 ayer), sin atrasos en ningún tramo.

**Sigue igual:**
- El panel con la hora incorrecta del banco de temas (`scripts/estado.js`, propuesta 1), ahora quinto día, propuesta sin aplicar.
- Las URL de portada en la preselección (`scripts/barrido.js`, propuesta 2), tercer día del mismo patrón.
- Fuentes primarias inaccesibles en el barrido, mismo patrón de arrastre.
- Las ambigüedades estructurales del informe (EN SEGUIMIENTO vs. la regla que lo ancla a su sección; si un informe de Dipres abre dossier del observatorio) siguen para decisión de Santiago, sin resolver.

**Peor / nuevo:**
- Dos historias reales (Ojeda, la alarma de Pitrufquén) se cayeron de la cadena sin ningún rastro de descarte, y se identificó la causa concreta en `prompts/despachador-gpt.md` (propuesta 3, nueva hoy).
- El contador de "cuarto día seguido" del hallazgo de cautela no avanzó entre el veredicto de ayer y el de hoy (hallazgo 4, nuevo).
- Horas vistas y retención de los largos quedaron exactamente en el mismo valor que ayer (22,8 h, 32,7%), rompiendo cinco días de alza sostenida; sin segunda repetición no es aún un hallazgo con propuesta.

Objetivo YPP: 133 días hasta el 1 de febrero de 2027. Las horas vistas estimadas del canal (serie del panel, distinta de la ventana de 30 días de Analytics) bajaron levemente de 67,45 h a 66,38 h porque varios videos largos ya publicados perdieron vistas por corrección de YouTube (por ejemplo "Falla en la PGU afecta a cerca de 53 mil pensionados": -9 vistas en ambas versiones, ver `bitacora/metricas/2026-09-21.md`); es una corrección normal de la plataforma, no un fallo del sistema, y no cambia el diagnóstico de fondo: muy por debajo del ritmo necesario para cerrar la brecha a las 4.000 horas.
