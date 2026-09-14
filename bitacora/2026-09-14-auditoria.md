ESTADO: CON OBSERVACIONES — la máquina corrió puntual, sin cortes ni datos perdidos, y la revisión editorial resolvió sola un error GRAVE antes de publicar. Pero el mismo tipo de titular (una proyección o un anuncio narrado como hecho ya ocurrido) se repite por tercer día consecutivo (12, 13 y 14-09) sin que el prompt del guionista lo corrija: es el hallazgo que se repite tres veces sin que cambie nada, y por eso va como HOY.

Auditada el 14-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`3da88fe`, "métricas 2026-09-14 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 13-09-2026).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:33:57 (push despertador 01:33:34) | ok |
| Preselección | ~01:38 | 01:36:30 | ok |
| Observatorio plata pública | 01:45 | 01:55:10 | +10 min |
| Informe | ~02:00 | 01:40:06 | ok (20 min antes) |
| Entrega de Clave ("¿Quién decide cuánto gasta el Estado cada año?") | ~02:30 | 01:43:32 | ok (47 min antes) |
| Guion del informe | ~02:10 | 01:48:09 | ok |
| Guion de la Clave | ~02:35 | 01:51:35 | ok |
| Revisión editorial (Opus, temprana) | 02:20 | 02:20:56 disparo → archivo 02:27:30 | ok, VEREDICTO: APROBADA (1 corrección GRAVE resuelta en el momento) |
| Edición diaria (compuerta y render) | ~04:50 | arrancó 02:27:34, videos listos 04:12:17/04:12:26 | ok, terminó antes de lo esperado |
| Reloj de métricas → Métricas | 05:00 | despertador 05:06:04 → archivo 05:06:29 | +6 min |
| Auditoría matinal (esta) | 05:30 | 05:31:12 | ok |

Los tres eslabones de la Clave de hoy (entrega `contenido/claves/2026-09-14-ley-presupuestos-chile.md`, guion `contenido/guiones/claves/2026-09-14-ley-presupuestos-chile.md`, video dentro del mismo render de las 02:27-04:12) están completos. Descripciones (`contenido/descripciones/2026-09-14-informe.txt` y `-clave.txt`) existen, ambas con hora de creación 04:51-06:55 UTC, dentro del mismo render. `bitacora/metricas/2026-09-14.md` existe y quedó escrito a las 05:06.

## Qué falló

1. **[el hallazgo que importa, 3er día consecutivo]** Un titular narra como hecho ya ocurrido algo que el propio informe deja como anuncio o proyección. `contenido/revisiones/2026-09-14.md` línea 22: guion línea 145 dice "Bolivia amplió su estado de excepción", pero el informe (línea 176) dice que el Gobierno boliviano "anunció un decreto para ampliar el estado de excepción" y que territorios y duración "dependen del texto oficial". La propia revisión lo marca: "Es el mismo patrón marcado el 12 y el 13 de septiembre." Verificado en las fuentes: `contenido/revisiones/2026-09-12.md` línea 24 ("Bolivia retirará subsidios..." vs "proyecta eliminar...") y `contenido/revisiones/2026-09-13.md` línea 24 ("El Presupuesto 2027 declarará al empleo como prioridad" vs "El Ejecutivo anticipó"). Tres días, tres noticias distintas, el mismo error de modo verbal: el prompt del guionista no tiene ninguna regla que proteja el matiz "proyecta/anuncia/prevé" al comprimir a titular, y la revisión editorial lo detecta pero no lo corrige porque no es un dato verificable contra fuente externa (cae fuera del punto 3c, modo corrección).

2. **[2do día seguido, mismo tipo]** El listado "Fuentes:" no acredita fuentes no-mediáticas que el guion sí usa en pantalla. `contenido/revisiones/2026-09-14.md` línea 26: faltan Criteria (líneas 88 y 93 del guion), la Fiscalía Supraterritorial (línea 77) y la OCDE (línea 91); el listado del guion es copia del informe (`contenido/informes/2026-09-14.md`, líneas 216-232), que arrastra la misma omisión. Ayer (`contenido/revisiones/2026-09-13.md` línea 20) fue la Dirección Meteorológica de Chile la que faltó, también "regresión respecto de ayer" en ese momento. Dos días distintos, mismo tipo de bache en el mismo paso (el listado se copia del informe sin revisar fuentes no-medio).

3. **[nuevo, un día]** Cifra aproximada narrada como exacta. `contenido/revisiones/2026-09-14.md` línea 24: guion línea 154 dice "quinientos pacientes" (Chaitén); el informe (línea 197) dice "cerca de 500 pacientes". No es un patrón repetido todavía (no aparece en las revisiones del 10 al 13-09 revisadas).

4. **[bug de infraestructura, no de hoy pero recién visto, sin registrar]** La edición del 13-09 (`contenido/informes/2026-09-13.md` y sus piezas) tardó ~14 horas de más en publicarse porque el paso final de `edicion-diaria.yml` falló y nadie lo registró: la ejecución 34746265785 (commit `eb5e49e`, "edición 2026-09-13: corrección verificada + revisión") renderizó los 4 videos y commiteó las descripciones sin problema, pero en `.github/workflows/edicion-diaria.yml` líneas 230-231 (`gh release create "$TAG" ... || echo "release ya existía, subiendo archivos"`) la API de GitHub devolvió `HTTP 500` al crear el release; el script asumió que el error significaba "ya existía" y en la línea 232 intentó subir los videos a un release que en realidad nunca se creó, con el resultado `release not found` y el job en `failure` (log verificado: `##[error]Process completed with exit code 1`, 08:52:12 UTC). Los videos y el podcast del 13-09 recién quedaron públicos con una corrida posterior (`podcast 2026-09-13 [bot]` a las 14:22 UTC = 11:22 Chile, y `estado 2026-09-13: videos_listos` recién a las 22:16 UTC = 19:16 Chile). Ocurrió 21 minutos después de que la auditoría de ayer cerrara (05:31 Chile), por eso nadie lo vio: ni la auditoría del 13-09 ni el Vigía (que ya había pasado su chequeo de las 05:15) lo alcanzaron a mirar. No hay ninguna entrada sobre esto en `bitacora/PENDIENTES.md` ni en `bitacora/REALIZADOS.md`. Hoy (14-09) el mismo paso corrió sin problema (ejecución 34809712242, éxito), así que no es una falla de hoy, pero el bug en el script sigue ahí y puede repetirse con cualquier otro `HTTP 500` transitorio de GitHub.

`node scripts/validar-tarjetas.js --fecha 2026-09-14`: un aviso — "guion de 1819 palabras narradas (~13.5 min a 135 ppm reales): sobre el techo de 13 min de la promesa". Verificado contra la duración real en `contenido/podcast/episodios.json`: el informe de hoy mide 778 segundos (12 min 58 s), justo bajo el techo de 13 min para "día cargado". El aviso es la sobreestimación por conteo de palabras que ya está documentada (nota del 03-09 en `prompts/contrato-archivos.md`): no es una falla real. La Clave mide 668 segundos (11 min 8 s).

Sin marcas `PENDIENTE DE CIERRE` en `contenido/informes/2026-09-14.md` (verificado, no hay ninguna).

La cifra de portada del 11-09 (arrastrada tres auditorías, 11-12-13-09) está CERRADA por decisión de Santiago del 13-09 (`estrategia/decisiones.md`, sección "2026-09-13 - La cifra preliminar del 11-09 se deja como está"; confirmado también en `bitacora/REALIZADOS.md` línea 23): no se vuelve a proponer. Sigue abierto solo el trámite administrativo del PR #5 (fusionarlo o cerrarlo), que ya está anotado en `bitacora/PENDIENTES.md` línea 328-329; no lo repito aquí porque no es un hallazgo nuevo.

## Propuestas

1. En `prompts/guion-informe.md`, en la sección "EN TITULARES" (cerca de la línea 110, junto a la regla de máximo 12 palabras), agregar: "Si el informe usa 'proyecta', 'anticipa', 'prevé', 'anunció' o un anuncio no ejecutado, el titular debe conservar ese matiz (no lo conviertas en un hecho consumado). Fue el mismo error tres días seguidos: 12, 13 y 14 de septiembre (ver `contenido/revisiones/`)." Sin esta regla explícita, la revisión editorial seguirá encontrando el mismo patrón sin poder corregirlo (no es un dato verificable contra fuente externa, así que cae fuera de su mandato de corrección).
2. En `.github/workflows/edicion-diaria.yml` líneas 230-232, cambiar el manejo de `gh release create`: en vez de asumir que cualquier fallo significa "ya existía", verificar con `gh release view "$TAG" >/dev/null 2>&1` antes de seguir a `gh release upload`; si la vista también falla, reintentar `gh release create` (con un `sleep` corto) en vez de continuar a la subida. Así un `HTTP 500` transitorio no deja el job en `failure` con los videos ya renderizados pero sin publicar.
3. En `contenido/informes/2026-09-14.md`, líneas 216-232 (listado "Fuentes:"), agregar Criteria, la Fiscalía Supraterritorial y la OCDE, ya que el guion las usa en pantalla y el listado del guion se copia del informe.
4. En `contenido/guiones/informe/2026-09-14.md` línea 154, cambiar "quinientos pacientes" por "cerca de quinientos pacientes".

## Triage

- **HOY**: Propuesta 1 (el patrón "proyección narrada como hecho" lleva tres días seguidos sin que el prompt lo prevenga; es exactamente el caso que este contrato pide escalar cuando "el ciclo revisa y no aprende").
- **AGUANTA**:
  - Propuesta 2 (el bug del release de GitHub ya causó una demora real de ~14 horas el 13-09, pero la máquina se recuperó sola con una corrida posterior y hoy no volvió a fallar).
  - Propuesta 3 (fuentes no acreditadas; no cambia lo narrado).
  - Propuesta 4 (cifra exacta en vez de aproximada; un solo día, no rompe nada).
- **MIRAR**:
  - Observatorio plata pública: +8 min ayer, +10 min hoy. Sigue sin romper nada, pero la tendencia crece por segundo día.
  - El listado de fuentes no acreditadas (propuesta 3) es la segunda vez en dos días que ocurre con fuentes distintas: si aparece una tercera vez, pasa a ser el mismo caso que la propuesta 1 y debería subir a HOY.

## Comparación con ayer

**Mejoró**:
- La cifra de portada del 11-09, arrastrada tres auditorías seguidas (11, 12, 13-09) sin acción, quedó CERRADA por una decisión explícita de Santiago el 13-09: es la primera vez en cuatro días que este ítem no vuelve a aparecer como HOY.
- La revisión editorial volvió a resolver sola un error GRAVE antes de publicar (el del año de comparación del gasto), tercer día seguido que el mecanismo de corrección en el momento funciona sin rechazar la edición.

**Sigue igual**:
- La cadena de la madrugada (barrido a guion de Clave) corrió puntual, sin atrasos mayores a 20 minutos.
- Horas vistas en videos largos: 18.1 h hoy, igual que las 18.1 h que muestra ahora `bitacora/metricas/2026-09-13.md` (retención media ponderada 32.6% hoy vs 32.5% ayer); prácticamente sin cambio. (La cifra que citó la auditoría de ayer —18.9 h y 49.4%— corresponde a una lectura de las 05:31 de ayer; el archivo de ayer se recalculó más tarde ese mismo día y hoy muestra 18.1 h/32.5%, que es la base real de comparación).
- `validar-tarjetas.js` sigue sin encontrar roturas de formato.

**Nuevo**:
- El patrón "proyección narrada como hecho" llegó a su tercer día (12, 13, 14-09) sin corregirse: pasa de tendencia a hallazgo formal (HOY).
- Se descubrió — con un día de retraso porque ocurrió después del cierre de la auditoría de ayer — que la edición del 13-09 falló en el paso de publicación del release de GitHub (`HTTP 500` mal manejado) y tardó ~14 horas de más en quedar disponible; nadie lo había registrado hasta ahora.
- Un segundo tipo de bache en el listado de fuentes (categoría d), esta vez con fuentes distintas a las de ayer (Criteria, Fiscalía Supraterritorial, OCDE en vez de la Dirección Meteorológica).
