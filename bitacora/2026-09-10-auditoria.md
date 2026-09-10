ESTADO: CON OBSERVACIONES — nada roto ni publicado con defecto visible; hay tres tendencias que ya llevan más de un día repitiéndose y una cita de commit equivocada dentro de la propia revisión.

Auditada el 10-09-2026 a las 05:36 de Chile, con el checkout sincronizado contra `origin/main` (`4421d55`, "descripciones 2026-09-10 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 2026-09-08).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | ~01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:37 | ok |
| Informe | ~02:00 | 01:42 | ok (18 min antes) |
| Entrega de Clave ("Cómo leer el IPoM") | ~02:30 | 01:47 | ok |
| Guion del informe | ~02:10 | 01:53 | ok |
| Guion de la Clave | ~02:35 | 01:56 | ok |
| Revisión editorial (Sonnet, base) | 04:40 | 04:44 | ok (+4 min), VEREDICTO: APROBADA, "Sin hallazgos" |
| Revisión editorial (Opus, consolidación) | 04:45 | 04:49 | ok (+4 min), VEREDICTO: APROBADA, 6 hallazgos MENOR |
| Edición diaria (arranque del render) | ~04:50 | 04:44 (con el push de Sonnet) | arrancó puntual |
| Edición diaria (video del informe) | — | terminó 05:15:57 | render de 30:44 |
| Edición diaria (Short del informe) | — | terminó 05:18:30 | ok, 2:33 |
| Edición diaria (video de la Clave) | — | terminó 05:33:52 | ok, 15:22 |
| Edición diaria (Short de la Clave) | — | terminó 05:35:26 | ok, 1:34 |
| Edición diaria (descripciones + release) | — | terminó 05:35:33 | ok |
| Edición diaria (YouTube, podcast, web) | — | **en curso al cierre de esta auditoría** (subida a YouTube en progreso desde 05:35:33) | ver "Qué falló" 1 |
| Reloj de métricas → Métricas | 05:00 | 05:05 | ok (+5 min) |
| Auditoría matinal (esta) | 05:30 | 05:36 | ok |

Ningún atraso mayor a 20 minutos en ninguna pieza tomada individualmente. Los tres eslabones de la Clave (entrega, guion, video) están completos y con guion.

## Qué falló

1. **[MIRAR] Segundo día consecutivo en que la Edición diaria sigue en curso al cierre de la auditoría de las 05:30, por el mismo motivo que el 09-09: dos pushes de revisión (Sonnet 04:44 y Opus 04:49) hacen que el render arranque con el primero y la corrida completa se estire más allá de la ventana esperada.** Hoy terminó de subir videos y descripciones a las 05:35:33 y seguía subiendo a YouTube al cerrar este archivo — mejor que ayer (que llegó a las 06:00), pero la propuesta 2 de la auditoría del 09-09 ("en `prompts/guardian.md`, punto 2, agregar una espera corta antes de declarar '⚠️ FALTA descripciones/videos' si la Edición diaria sigue `in_progress`") **no se aplicó**: `prompts/guardian.md` líneas 18-25 siguen sin mencionar el estado de GitHub Actions ni una espera corta, igual que ayer. Si algún día el render se atrasa más que hoy, el guardián de las 06:00 puede volver a reportarle a Santiago una "falta" que en realidad es un render en curso.

2. **[MIRAR] Segundo día consecutivo del mismo tipo de hallazgo [MENOR] categoría b en la revisión: una afirmación comparativa sin respaldo en el informe, en la posición de cierre de un bloque [A]/[B].** Hoy: "Es la corrección más dura desde que empezó esta desaceleración" (guion, línea 12), sobre el IPoM. La propia revisión de hoy lo cita como "del mismo tipo que la TESIS del IPC marcada el 09-09" (`contenido/revisiones/2026-09-10.md`, línea 8), que decía "la variación fue la más alta en varios meses" (`contenido/revisiones/2026-09-09.md`). Comprobé `prompts/guion-informe.md`: no hay ninguna regla que prohíba explícitamente comparaciones o superlativos ("más dura", "más alta") no verificables contra el informe; las únicas menciones de TESIS (líneas 79, 119, 136, 138, 168, 170, 179) hablan de formato y longitud, no de contra qué se verifica su contenido. Dos días con el mismo defecto y ningún cambio en el prompt que lo produce.

3. **[MIRAR] Cuarto día consecutivo de baja en la retención media ponderada de los videos largos:** 35,5% (06 y 07-09) → 33,9% (08-09) → 33,2% (09-09) → **31,3% (10-09)**, mientras las horas vistas siguen subiendo (13,1 → 13,1 → 14,0 → 15,1 → **16,6**). Las auditorías del 08 y 09-09 ya lo marcaron MIRAR con dos y tres puntos de la serie; hoy son cuatro caídas seguidas y todavía nadie investigó una causa (la propuesta 4 de la auditoría del 09-09, "revisar si coincide con algún cambio de duración o estructura de los largos", sigue sin ejecutarse).

4. **[MIRAR] La revisión de las 04:49 (Opus) cita un commit equivocado como evidencia de la revisión de las 04:44 (Sonnet).** `contenido/revisiones/2026-09-10.md`, línea 3: "consolida... la revisión de las 04:40 (commit aef39a8)". Comprobado con `git show aef39a8 --stat`: ese commit es "edición 2026-09-10 [bot]", que solo toca `contenido/casos/por-abrir.md` (el paso "1b · Observatorio de casos" de `edicion-diaria.yml`, corrida por el push de Sonnet) — no es una revisión. La revisión de Sonnet real es el commit `0f13838` ("revisión 2026-09-10 [claude]", 04:44), cuyo contenido sí coincide palabra por palabra con lo que la revisión de Opus describe ("Sin hallazgos", mismo resumen). El contenido citado es correcto; el número de commit que lo respalda no. Es la misma revisión que pide "VERIFICAR ANTES DE AFIRMAR" citando evidencia exacta, y su propia cita de commit no pasa esa prueba.

Sin más fallas: barrido, preselección, informe, entrega de Clave, guiones y métricas corrieron a tiempo y sin incidentes de escritura. `node scripts/validar-tarjetas.js --fecha 2026-09-10` no dio avisos ("variedad OK: ninguna cuota rota, ninguna marca malformada"). El informe de hoy no dejó ningún `PENDIENTE DE CIERRE`; el que venía de ayer (IPoM de septiembre) se cerró con la Clave "Cómo leer el IPoM" de hoy. La duración real del episodio de hoy (informe y Clave) todavía no está en `contenido/podcast/episodios.json` — el archivo termina en las entradas del 09-09 porque el paso "7b · Episodio del podcast" de la Edición diaria de hoy todavía no corre (va después de YouTube, que sigue en curso): no se estima, se deja pendiente para la próxima auditoría o el informe de la mañana si ya está.

## Propuestas

1. En `prompts/guardian.md`, línea 23 (donde dice `Si algo FALTA: esa es la PRIMERA`), agregar antes de declarar "⚠️ FALTA": consultar `gh run list --workflow=edicion-diaria.yml --branch main -L 1` (o el estado de la corrida de hoy); si sigue `in_progress`, decir "la edición sigue en curso (paso X)" en vez de "FALTA", igual que ya hace `prompts/contrato-archivos.md` en su sección "Espera corta antes del respaldo". (Repite la propuesta 2 de la auditoría del 09-09, sin aplicar.)
2. En `prompts/guion-informe.md`, después de la línea 170 ("Cada [TESIS] tiene 18 palabras o menos"), agregar una regla explícita: ninguna [TESIS] ni frase de cierre de bloque puede afirmar una comparación o superlativo temporal ("el más alto en...", "la corrección más dura desde...") que no esté en el informe fuente; si el informe no da la serie de comparación, la frase se limita al dato del propio bloque.
3. En `prompts/revision-editorial.md`, en el punto 4 (formato del veredicto, línea 67), agregar que toda cita de commit como evidencia debe verificarse con `git show <hash> --stat` antes de escribirse, no derivarse de memoria del historial reciente.
4. Si la retención media ponderada de los largos sigue bajando en la métrica de mañana (11-09), abrir una revisión puntual (no de esta auditoría) sobre duración/estructura de los últimos 4-5 videos largos publicados, ya con cuatro días de caída consecutiva.

## Triage

- **HOY**: ninguna.
- **AGUANTA**: ninguna.
- **MIRAR**:
  - Propuesta 1 (edición diaria en curso al cierre de la auditoría, segundo día seguido; la corrección de ayer no se aplicó).
  - Propuesta 2 (comparación sin respaldo en TESIS/cierre, segundo día seguido con el mismo patrón).
  - Propuesta 4 / hallazgo 3 (retención de los largos, cuarto día de baja consecutiva).
  - Propuesta 3 (cita de commit equivocada en la revisión de las 04:49; no afecta el contenido revisado, sí la trazabilidad de la revisión).

## Comparación con ayer

**Mejoró**:
- La Edición diaria de hoy terminó de subir videos, Shorts y descripciones a las 05:35 (vs. la de ayer, que seguía en el paso de la Clave a las 05:38 y proyectaba terminar 05:55-06:05); el atraso por el doble push de revisión sigue existiendo pero esta vez no llegó a chocar con el horario del guardián de las 06:00.
- La revisión no encontró ningún hallazgo [GRAVE]: los seis hallazgos de hoy son todos [MENOR], y la carencia [GRAVE] categoría d de "Fuentes:" que venía del 09-09 quedó "prácticamente cerrada" (de una mayoría de fuentes faltantes a solo tres nombres).
- Ninguna noticia [A] o [B] quedó omitida del guion (a diferencia del 09-09).

**Sigue igual**:
- El patrón de dos pushes de revisión retrasando el arranque/duración total de la Edición diaria (día 2 de esta observación).
- La retención de los largos sigue bajando (día 4 de la serie).
- `validar-tarjetas.js` sigue sin encontrar roturas de formato, solo confirma variedad OK.

**Nuevo**:
- Primera vez que se detecta una cita de commit incorrecta dentro de una revisión editorial.
- Primera vez que se documenta explícitamente que dos hallazgos de días distintos (09-09 y 10-09) son "del mismo tipo" citado por la propia revisión, no solo detectado por esta auditoría.
