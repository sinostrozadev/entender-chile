ESTADO: CON OBSERVACIONES — el guion del informe omitió por completo dos noticias [B] elegidas hoy (Arica y Atacama, "Chile en regiones") y el video del informe ya se renderizó así, privado; corregible antes de publicarlo en Studio.

Auditada el 09-09-2026 a las 05:38 de Chile, con el checkout sincronizado contra `origin/main` (`885c55f`). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 2026-09-08).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | ~01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:37 | ok |
| Informe | ~02:00 | 01:42 | ok (18 min antes) |
| Entrega de Clave | ~02:30 | 01:46 | ok, reaccionó al evento en 4 min |
| Guion del informe | ~02:10 | 01:52 | ok |
| Guion de la Clave | ~02:35 | 01:55 | ok |
| Revisión editorial (Sonnet) | 04:40 | 04:46 | ok (+6 min), VEREDICTO base con 2 hallazgos |
| Revisión editorial (Opus, corrección) | 04:45 | 04:52 | ok (+7 min), VEREDICTO: APROBADA |
| Edición diaria (arranque del render) | ~04:50 | 04:46 | arrancó puntual con el primer push de la revisión |
| Edición diaria (video del informe) | — | terminó 05:23 | render de 37 min, igual que el del 08-09 (37:40) |
| Edición diaria (Short del informe) | — | terminó 05:26 | ok |
| Edición diaria (video de la Clave) | — | **en curso al cierre de esta auditoría** (arrancó 05:26) | ver "Qué falló" 2 |
| Reloj de métricas → Métricas | 05:00 | 05:08 | ok (+8 min) |
| Auditoría matinal (esta) | 05:30 | 05:38 | ok |

Ningún atraso mayor a 20 minutos en ninguna pieza tomada individualmente. Los tres eslabones de la Clave: entrega (01:46) y guion (01:55) están, el video sigue en el paso 4 de `edicion-diaria.yml` (run 34325533526) al momento de cerrar este archivo.

## Qué falló

1. **[HOY] El guion del informe omite por completo dos noticias [B] que sí fueron elegidas para la edición de hoy, y el video ya se renderizó sin ellas.**
   Evidencia leída completa en `contenido/revisiones/2026-09-09.md` (hallazgo [GRAVE] categoría a, línea 8) y verificada de nuevo aquí: `contenido/informes/2026-09-09.md` líneas 146-152 tiene "### [B] Estudio detecta plomo, zinc y arsénico en suelos de Arica" y "### [B] Atacama inicia rehabilitación de sistemas de riego"; busqué "Arica", "plomo", "Atacama" y "riego" en `contenido/guiones/informe/2026-09-09.md` completo (152 líneas) y no aparecen ni narradas ni en "## En titulares" (líneas 113-145). El modo de corrección automática de la revisión (3c) solo cubre categorías b y c, no la omisión completa (categoría a), así que nadie lo arregló y el render (GitHub Actions run 34325533526, paso "3 · Producir video del informe", terminado 05:23) ya produjo el video del informe sin esas dos noticias. El video queda privado hasta que Santiago lo publique en Studio: todavía hay ventana para corregirlo antes de que salga así.

2. **[MIRAR] La Edición diaria seguía renderizando el video de la Clave al cerrar esta auditoría (05:38), por la misma razón que retrasó a la revisión: dos pushes (VEREDICTO base 04:46 y corrección 04:52) hacen que el render arranque 6-12 minutos más tarde que el bloque 04:40+04:45 del cuadro.** Con los tiempos por paso del 08-09 como referencia (video Clave 16 min, Short Clave 2 min, YouTube 11 min), la edición de hoy terminaría de subir y republicar la web cerca de las 05:55-06:05 de Chile — encima o después de las 06:00 en que corre el informe de la mañana. `prompts/guardian.md`, punto 2, no tiene una espera corta antes de declarar "⚠️ FALTA descripciones" (a diferencia de `prompts/contrato-archivos.md`, sección "Espera corta antes del respaldo"), así que si la edición sigue en curso a las 06:00, el guardián puede reportarle a Santiago una falta que en realidad es solo un render que no ha terminado. No es una falla hoy: la máquina sigue produciendo sola: es una tendencia a vigilar si se repite.

3. **[MIRAR] La revisión de hoy detectó por primera vez que la lista final "Fuentes:" del guion no acredita a la mayoría de los medios y organismos que sostienen las noticias resumidas en "En titulares", y afirma (línea 10 de `contenido/revisiones/2026-09-09.md`) que el mismo patrón está en los guiones del 07 y 08-09 y pasó sin marcarse.** Comprobé el guion del 08-09: su lista "Fuentes:" (18 líneas) no incluye, por ejemplo, "Radio Universidad de Chile" ni "Contraloría" pese a que "En titulares" de ese día narra noticias de Contraloría (Hospital de Chillán) y de la Universidad de Chile no aparece tampoco pese a citarse en el cuerpo del informe de ese día; el patrón es consistente con lo que dice la revisión. `prompts/guion-informe.md`, línea 150, exige acreditar "cada fuente de las marcas [DATO] y [CITA]" y "TODA fuente mencionada EN LA PROSA", pero no menciona las noticias resumidas en "En titulares": el hueco está en la regla, no en un guionista descuidado, y por eso se repite sin que nadie lo note. Categoría distinta de la de ayer (categoría b, cifras mal calculadas) y de la del 07-09 (categoría c, pérdida de precisión): no es un hallazgo idéntico repetido, es una carencia de formato que la revisión recién aprendió a cazar.

4. **[MIRAR] Segundo día consecutivo de baja en la retención media ponderada de los videos largos:** 35,5% (06 y 07-09) → 33,9% (08-09) → 33,2% (09-09), mientras las horas vistas siguen subiendo (13,1 → 13,1 → 14,0 → 15,1). Ya lo marcó como MIRAR la auditoría de ayer; con dos caídas seguidas empieza a ser una tendencia, no un dato suelto de un día.

5. El validador de tarjetas (`node scripts/validar-tarjetas.js --fecha 2026-09-09`) dio un aviso: línea 40 del guion, "cien mil seiscientos pesos" es una cifra exacta en voz. La propia revisión de las 04:45 la revisó y la consideró correcta porque va precedida de "unos" (aproximación); el validador la marca igual porque su regla no distingue esa palabra. No es un hallazgo de contenido, es una discrepancia entre el validador y el criterio de la revisión que vale la pena anotar.

Sin más fallas: barrido, preselección, informe, entrega de Clave, guiones, la corrección de la cifra del fraude de Fonasa (RESUELTO, ver `contenido/revisiones/2026-09-09.md` línea 9) y métricas corrieron a tiempo y sin incidentes de escritura. El `PENDIENTE DE CIERRE: IPoM de septiembre | 2026-09-09` (línea 84 del informe de hoy) no está vencido: el IPoM se publica a las 9:00 de hoy, después del cierre de esta edición, y le toca a la de mañana.

## Propuestas

1. En `contenido/guiones/informe/2026-09-09.md`, después de la línea 145 ("Un sismo de magnitud cuatro coma cinco se sintió cerca de Ollagüe."), agregar dos líneas al bloque "## En titulares": una por "Estudio detecta plomo, zinc y arsénico en suelos de Arica" y otra por "Atacama inicia rehabilitación de sistemas de riego" (fuentes: Universidad de Chile y Radio Universidad de Chile; autoridades regionales y Portal Agro Chile). Tras corregir, volver a disparar `edicion-diaria.yml` con `workflow_dispatch` y `forzar: informe` para que el video y el Short del informe se rehagan con el guion completo antes de que Santiago los publique en Studio.
2. En `prompts/guardian.md`, punto 2, agregar una espera corta antes de declarar "⚠️ FALTA descripciones/videos": si la Edición diaria del día sigue `in_progress` en GitHub Actions, decir "la edición sigue en curso (paso X)" en vez de "FALTA", replicando el patrón de `prompts/contrato-archivos.md`, sección "Espera corta antes del respaldo".
3. En `prompts/guion-informe.md`, línea 150, agregar explícitamente que las fuentes de las noticias resumidas en "## En titulares" también deben figurar en "Fuentes:", no solo las de las marcas [DATO]/[CITA] y la prosa narrada.
4. Si la retención media ponderada de los largos sigue bajando en la métrica de mañana (10-09), revisar si coincide con algún cambio de duración o de estructura de los videos largos de la última semana.

## Triage

- **HOY**:
  - Propuesta 1 (dos noticias de "Chile en regiones" omitidas del guion y ya renderizadas sin ellas): el video sigue privado, hay ventana para corregirlo antes de publicarlo.
- **AGUANTA**: ninguna.
- **MIRAR**:
  - Propuesta 2 (el guardián de las 06:00 podría leer una edición en curso como una falta).
  - Propuesta 3 (la regla de "Fuentes:" no cubre "En titulares" y el hueco lleva al menos tres días sin corregirse; hoy es la primera vez que se detecta).
  - Propuesta 4 (retención de los largos: dos días seguidos a la baja).
  - El aviso de `validar-tarjetas.js` sobre la cifra "cien mil seiscientos pesos" (línea 40 del guion), que la revisión ya evaluó y dejó pasar.

## Comparación con ayer

**Mejoró**:
- La revisión de hoy salió APROBADA desde el primer ciclo (base 04:46 + corrección 04:52), sin el rechazo y la producción perdida de ayer.
- `prompts/auditoria-matinal.md` y `scripts/panel-auditoria.js` ya dicen "05:30" en vez del horario viejo "09:30": la propuesta que llevaba tres días repitiéndose (06, 07 y 08-09) se corrigió el 08-09 a las 07:33-07:36 de Chile (commits `c394bff` y `9a1efc9`). Deja de ser un hallazgo de esta auditoría.
- Las dos cifras "Escala humana"/[DATO] que la revisión de ayer tuvo que corregir a mano no se repitieron hoy: el único hallazgo de esa familia (el fraude de Fonasa narrado como hecho consumado) se corrigió en el mismo ciclo de revisión, sin rechazo.

**Sigue igual**:
- La retención media ponderada de los largos sigue bajando (ver Triage, MIRAR).
- El validador de tarjetas no encuentra roturas de formato, solo avisos de estilo (hoy y el 07/08-09).

**Nuevo**:
- Primera vez que la revisión marca un hallazgo de categoría a (noticia elegida y completamente omitida del guion) desde que existe este trigger; no es una repetición de un hallazgo anterior.
- Primera vez que se marca el hueco de "Fuentes:" con noticias de "En titulares" (categoría d), aunque la propia revisión sostiene que el defecto ya estaba en los guiones del 07 y 08-09 sin ser detectado: no es un hallazgo que se repite sin corregirse, es un hallazgo que el proceso de revisión recién aprendió a cazar.
- Primera vez que dos pushes de revisión (VEREDICTO base + corrección) hacen que la Edición diaria siga en curso al momento de cerrar esta auditoría.
