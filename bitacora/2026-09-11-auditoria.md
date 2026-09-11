ESTADO: CON FALLAS — un error aritmético de la noticia de portada (3 removidos + 25 absueltos ≠ 25 expedientes resueltos) está publicado ahora mismo en la web pública (informe y Claves) y bloqueó los cuatro videos del día completo.

Auditada el 11-09-2026 a las 05:31 de Chile, con el checkout sincronizado contra `origin/main` (`d979247`, "métricas 2026-09-11 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 2026-09-10).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | ~01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:36 | ok |
| Observatorio plata pública | ~01:45 | 01:55 | ok (+10 min) |
| Informe | ~02:00 | 01:41 | ok (19 min antes) |
| Entrega de Clave ("Disciplina y remoción de jueces") | ~02:30 | 01:45 | ok |
| Guion del informe | ~02:10 | 01:50 | ok |
| Guion de la Clave | ~02:35 | 01:55 | ok |
| Revisión editorial (Opus, único revisor desde el 10-09) | 04:45 | 04:50 | +5 min, **VEREDICTO: RECHAZADA** |
| Edición diaria (compuerta) | ~04:50 | 04:50 | arrancó puntual, bloqueada por la compuerta (correcto) |
| Web (informe) | continuo | 01:41 | publicó igual, sin compuerta |
| Web (claves) | continuo | 01:45 | publicó igual, sin compuerta |
| Reloj de métricas → Métricas | 05:00 | 05:06 | ok (+6 min) |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

Los tres eslabones de la Clave (entrega, guion) están completos; el video es el que falta, y falta por diseño de la compuerta, no por atraso.

## Qué falló

1. **[GRAVE] La cifra de portada no cuadra y ya está publicada en la web pública.** `contenido/informes/2026-09-11.md`, línea 16: "El pleno de la Corte Suprema avanzó el 10 de septiembre en los primeros 25 de 56 cuadernos... Tres jueces fueron removidos y 25 personas resultaron absueltas en esta primera etapa." Tres removidos más veinticinco absueltos son 28 resultados para 25 expedientes resueltos: la suma no cuadra con su propio enunciado. El mismo texto está en `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` (líneas 7 y 103). Comprobado: `.github/workflows/web.yml` se dispara por push a `contenido/informes/**` y `contenido/claves/**` sin pasar por la compuerta de revisión (esa compuerta solo protege `edicion-diaria.yml`, el render de video). El commit "edición 2026-09-11: informe" (01:41) y "edición 2026-09-11: claves" (01:45) dispararon los runs de Web 34563128588 y 34563420369 (ambos `conclusion: success`) horas antes de que la revisión de las 04:50 detectara el problema. El sitio público sigue mostrando esa cifra en este momento, porque nadie ha corregido ni republicado.

   El guion del informe (`contenido/guiones/informe/2026-09-11.md`) arrastra y amplifica el error, sin publicar todavía porque la compuerta lo bloqueó: [TESIS] línea 12 ("tres jueces removidos, veinticinco absueltos"), [ESQUEMA] línea 23 ("3 removidos y 25 absueltos -> 31 casos pendientes"), [DATO cifra] línea 27 ("expedientes aún por resolver: 31", atribuido al Poder Judicial sin que esa cifra exista en ninguna fuente) y la carátula sugerida línea 5 ("Y vienen 31 casos más"). Lo mismo en `contenido/guiones/claves/2026-09-11-disciplina-remocion-jueces-chile.md`, línea 47 ("[DATO comparacion] removidos: 3 ; absueltos: 25").

   La revisión (`contenido/revisiones/2026-09-11.md`) intentó el MODO CORRECCIÓN con cuatro búsquedas web, pero no pudo abrir las dos fuentes decisivas (latercera.com y pjud.cl) porque el proxy de salida de ese entorno las bloqueó ("EGRESS_BLOCKED"); sin poder comprobar el número correcto, rechazó en vez de inventar. Correcto seguir el estándar del punto 3c, pero el bloqueo de red es en sí mismo el motivo por el que no se pudo cerrar hoy.

Sin más fallas nuevas: barrido, preselección, observatorio, entrega de Clave y guiones corrieron a tiempo y sin incidentes de escritura. `node scripts/validar-tarjetas.js --fecha 2026-09-11` no dio avisos ("variedad OK: ninguna cuota rota, ninguna marca malformada"). El único `PENDIENTE DE CIERRE` del informe de hoy (formalización de Fodich) es del propio día, no vencido. El episodio de hoy todavía no está en `contenido/podcast/episodios.json`: correcto, porque el render nunca llegó a correr (compuerta cerrada), no se estima.

## Propuestas

1. Verificar con una fuente que sí resuelva desde fuera del proxy bloqueado (el comunicado del Poder Judicial o la nota de La Tercera del 10-09) cuántas personas quedaron absueltas dentro de los 25 cuadernos resueltos, y corregir de forma consistente: `contenido/informes/2026-09-11.md` línea 16, `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` líneas 7 y 103, `contenido/guiones/informe/2026-09-11.md` líneas 5, 12, 23 y 27, `contenido/guiones/claves/2026-09-11-disciplina-remocion-jueces-chile.md` línea 47. Republicar (el push a informe/claves ya dispara Web solo) y volver a correr `prompts/revision-editorial.md` a mano para destrabar `edicion-diaria.yml`, porque el veredicto RECHAZADA no se reintenta solo.
2. En `.github/workflows/web.yml`, considerar si conviene que la publicación de `contenido/informes/**` y `contenido/claves/**` espere el veredicto de la revisión (igual que ya hace `edicion-diaria.yml`) para que un error [GRAVE] categoría b no llegue al sitio público antes de que la revisión de las 04:45 alcance a revisarlo. Hoy el error quedó público 3 horas antes de que existiera la revisión que lo hubiera detenido.
3. En el entorno donde corre `prompts/revision-editorial.md`, revisar por qué el proxy de salida bloquea latercera.com y pjud.cl (evidencia: "EGRESS_BLOCKED" citado textual en `contenido/revisiones/2026-09-11.md`, línea 18) y si se puede permitir esos dominios: son las dos fuentes primarias que el MODO CORRECCIÓN necesita para cerrar casos como el de hoy en vez de rechazar.
4. `contenido/guiones/informe/2026-09-11.md`, antes de la línea 132 ("Y en titulares:"), agregar el encabezado "## En titulares" que sí llevan los guiones del 8, 9 y 10-09 (hallazgo [MENOR] categoría d de la propia revisión).
5. `contenido/guiones/informe/2026-09-11.md`, línea 116: cambiar "[DATO comparacion | La Tercera, 10 sep] fallecidos: 7 ; heridos: 70" por "heridos: más de 70", porque el informe (línea 154) y la propia narración dicen "más de 70 heridos" (hallazgo [MENOR] categoría c de la propia revisión).

## Triage

- **HOY**: Propuesta 1 (cifra de portada incorrecta, ya pública en la web, y los cuatro videos del día bloqueados hasta corregirla).
- **AGUANTA**:
  - Propuesta 4 (falta "## En titulares" en el guion del informe).
  - Propuesta 5 (marca [DATO] de heridos sin el "más de" de su fuente).
- **MIRAR**:
  - Propuesta 2 (Web publica informe y Claves sin compuerta de revisión; hoy fue la primera vez que eso expuso un error [GRAVE] al público).
  - Propuesta 3 (proxy de salida del entorno de revisión bloquea las fuentes primarias que el MODO CORRECCIÓN necesita).

## Comparación con ayer

**Mejoró**:
- Las dos propuestas de la auditoría del 10-09 que pedían cambios de prompt sí se aplicaron: `prompts/guardian.md` ahora trae la espera corta antes de declarar "FALTA descripciones/videos" (líneas 26-30, "regla del 10-09, tras dos días seguidos de falsa alarma"), y `prompts/guion-informe.md` (líneas 76-88) ahora prohíbe explícitamente comparaciones o superlativos temporales no verificables en el cierre de un [TESIS] ("regla añadida el 10-09, tras dos días seguidos con el mismo hallazgo"). Hoy el guion no repitió ese patrón.
- La retención media ponderada de los largos, que llevaba cuatro días bajando (35,5% → 33,9% → 33,2% → 31,3%), saltó a 43,4% el 10-09 y se mantuvo ahí hoy (sin video nuevo que la mueva). La tendencia MIRAR de la auditoría anterior queda cerrada, no confirmada como problema.
- El proceso de revisión ya no duplica el push (la rutina vieja de Sonnet de las 04:40 se apagó el 10-09, según `bitacora/cronograma.json`): un solo push de revisión hoy, sin la carrera entre dos revisores que estiraba la Edición diaria los dos días anteriores. Con eso, la cita de commit equivocada que señaló la auditoría del 10-09 (propuesta 3, sin aplicar en el prompt) deja de tener terreno donde repetirse: ya no hay dos revisiones el mismo día que confundir entre sí.

**Sigue igual**:
- `validar-tarjetas.js` sigue sin encontrar roturas de formato.
- La cadena de la madrugada (barrido a guion de Clave) sigue corriendo puntual, sin atrasos mayores a 20 minutos.

**Nuevo**:
- Primera vez en la serie observada (08, 09 y 10-09, las tres APROBADA sin hallazgos) que la revisión editorial RECHAZA la edición.
- Primera vez que se confirma que la web pública se publica sin esperar el veredicto de la revisión, y que eso deja un error [GRAVE] visible al público durante horas.
- Primera vez que un rechazo cita un bloqueo de red del propio entorno de revisión (EGRESS_BLOCKED) como la razón de no poder corregir en el momento.
