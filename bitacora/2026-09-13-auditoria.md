ESTADO: CON FALLAS — la cadena de hoy corrió puntual y sin errores nuevos graves, pero el HOY de las dos auditorías anteriores (la cifra de portada del 11-09, "tres jueces removidos y 25 absueltos" sobre "25 de 56 cuadernos", que no cuadra) sigue publicada sin corregir, va en su tercer día consecutivo señalada por esta auditoría, y nunca se agregó a `bitacora/PENDIENTES.md` pese a que la auditoría de ayer lo pidió explícitamente como HOY.

Auditada el 13-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`db15eab`, "métricas 2026-09-13 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 10-09-2026).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:34 (Actions: 01:33:44) | ok |
| Preselección | ~01:38 | 01:37 | ok |
| Observatorio plata pública | 01:45 | 01:53 | +8 min |
| Informe | ~02:00 | 01:57 | ok |
| Entrega de Clave ("Investigación de catástrofes y responsabilidades") | ~02:30 | 02:00 | ok (30 min antes) |
| Guion del informe | ~02:10 | 02:05 | ok |
| Guion de la Clave | ~02:35 | 02:10 | ok (25 min antes) |
| Revisión editorial (Opus) | 04:45 | 04:51 | +6 min, VEREDICTO: APROBADA (una corrección grave resuelta en el momento) |
| Edición diaria (compuerta y render) | ~04:50 | 04:51 arrancó; en curso a las 05:31 | dentro de lo normal: mismo ritmo que ayer (a esta hora iba en el paso 14 de 20, "Producir video de la Clave"; ayer a la misma hora del día iba en el paso 13 de 20) |
| Reloj de métricas → Métricas | 05:00 | 05:05 | ok |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

Los tres eslabones de la Clave de hoy (entrega, guion, y el video en curso) van sin incidentes. `contenido/descripciones/` todavía no tiene piezas del 13-09 porque el render no ha terminado (va en el paso 14 de 20 de 20): correcto, no es una ausencia real.

## Qué falló

1. **[GRAVE, arrastrado desde el 11-09, día 3 sin ejecutarse]** La cifra de portada del 11-09 sigue mal y sigue publicada, y el HOY de la auditoría de ayer para escalarla a la lista viva tampoco se ejecutó. Verificado ahora: `contenido/informes/2026-09-11.md` línea 16 sigue diciendo "Tres jueces fueron removidos y 25 personas resultaron absueltas en esta primera etapa" sobre "los primeros 25 de 56 cuadernos" (3+25=28, no 25); `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` líneas 7 y 103 repiten la misma cifra. `grep -n "11-09\|2026-09-11\|cuadernos\|jueces removid" bitacora/PENDIENTES.md` no devuelve ninguna línea, y `bitacora/REALIZADOS.md` tampoco registra ninguna corrección de este caso. No existe ningún commit posterior a "revisión 2026-09-11 [claude]" que toque esos archivos. Es la tercera auditoría seguida (11, 12 y ahora 13-09) que verifica lo mismo sin que haya cambiado nada.

2. **[MENOR, día 2 del mismo patrón, señalado por el propio revisor]** Titular que convierte una proyección en hecho cierto. `contenido/guiones/informe/2026-09-13.md` línea 121: "El Presupuesto 2027 declarará al empleo como prioridad", cuando el informe (línea 34) dice que "El Ejecutivo anticipó" esa prioridad y que "la definición efectiva se conocerá cuando Hacienda ingrese el erario al Congreso". La revisión editorial de hoy (`contenido/revisiones/2026-09-13.md`) lo marca como "el mismo patrón marcado ayer en el titular de los subsidios bolivianos" (revisión del 12-09: "Bolivia retirará subsidios..." en vez de "Bolivia prevé retirar..."). Dos días seguidos, no tres: todavía no es "el ciclo no aprende", pero ya es una tendencia.

3. **[MENOR, regresión de un día para otro]** Fuente ausente en el listado del guion de hoy. `contenido/guiones/informe/2026-09-13.md`, cierre del guion (línea 158): da "cerca de los cuatro grados" y "unos dieciocho grados", datos que el informe (línea 260) atribuye a la Dirección Meteorológica de Chile, pero el bloque "Fuentes:" del guion no la incluye. Los guiones del 10 y el 12 de septiembre sí la listaban (hallazgo de la revisión editorial de hoy, categoría d).

Sin fallas nuevas en la cadena de hoy: `node scripts/validar-tarjetas.js --fecha 2026-09-13` no dio avisos ("variedad OK: ninguna cuota rota, ninguna marca malformada"). Sin marcas `PENDIENTE DE CIERRE` en `contenido/informes/2026-09-13.md` (verificado, no hay ninguna). El patrón de "más de" perdido en una marca `[DATO]` que se repitió el 11 y el 12-09 no volvió a aparecer hoy como hallazgo nuevo.

## Propuestas

1. En `contenido/informes/2026-09-11.md` línea 16, `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` líneas 7 y 103, `contenido/guiones/informe/2026-09-11.md` líneas 5, 12, 23 y 27, y `contenido/guiones/claves/2026-09-11-disciplina-remocion-jueces-chile.md` línea 47: verificar con una fuente fuera del proxy bloqueado cuántos de los 25 cuadernos resueltos terminaron en absolución, corregir las cuatro cifras de forma consistente y republicar. Decidir aparte (Santiago, no la auditoría) si se corre `edicion-diaria.yml` a mano con `FECHA=2026-09-11` para producir el video atrasado o si se da el día por perdido y solo se corrige el texto público.
2. Agregar HOY una entrada a `bitacora/PENDIENTES.md` con la propuesta 1 y la constancia de que dos auditorías seguidas (11 y 12-09) la marcaron HOY sin que nadie la ejecutara: si esta tercera auditoría tampoco deja rastro en la lista viva, el problema no es ya la cifra del 11-09 sino que el HOY de esta auditoría no llega a ningún lado.
3. En `contenido/guiones/informe/2026-09-13.md` línea 121, cambiar "El Presupuesto 2027 declarará al empleo como prioridad" por "El Ejecutivo anticipa que el Presupuesto 2027 priorizará el empleo".
4. En `contenido/guiones/informe/2026-09-13.md`, bloque "Fuentes:" (cerca de la línea 158), agregar "Dirección Meteorológica de Chile".

## Triage

- **HOY**: Propuesta 1 y 2 (el error de portada del 11-09 sigue publicado casi 48 horas después y el HOY de dos auditorías seguidas nunca se ejecutó; es la tercera vez que se marca HOY).
- **AGUANTA**:
  - Propuesta 4 (fuente meteorológica ausente del listado del guion; no afecta lo narrado).
- **MIRAR**:
  - Propuesta 3 y el patrón que describe: dos días seguidos (12 y 13-09) con el mismo tipo de error (proyección presentada como hecho cierto en un titular). Si aparece un tercer día, pasa a ser un patrón que el prompt del guionista no está corrigiendo.
  - Observatorio plata pública: hoy corrió con +8 minutos de atraso; no rompe nada todavía, pero conviene seguir mirando si crece.

## Comparación con ayer

**Mejoró**:
- La revisión editorial resolvió en el momento otro error GRAVE en modo corrección (la hora del aviso de emergencia del incendio de Pitrufquén, adelantada media hora en el guion), comprobado contra el propio informe y dos coberturas de prensa independientes. Es el segundo día seguido (ayer corrigió el día de la semana) que el mecanismo de corrección funciona sin necesidad de rechazar.
- El patrón de la marca `[DATO]` que perdía el "más de" de su fuente, repetido el 11 y el 12-09, no volvió a aparecer hoy: no llegó a ser el hallazgo de tres días que preocupaba a la auditoría de ayer.
- Horas vistas en videos largos (la única serie que suma para las 4.000 horas): 18.9 horas hoy contra 18.4 ayer (+0.5 h), con retención media ponderada estable en 49.4%. El canal sumó +1 suscriptor (14→15) y +380 vistas totales, con un salto notorio en los videos del caso Fodich (por ejemplo "¿Qué admitió el exfiscal Vinko Fodich..." +175 vistas), contenido de días anteriores que sigue sumando.

**Sigue igual**:
- La cadena de la madrugada (barrido a guion de Clave) sigue puntual, sin atrasos mayores a 20 minutos.
- `validar-tarjetas.js` sigue sin encontrar roturas de formato.
- La cifra incorrecta del 11-09 sigue en este momento visible en el sitio público (informe y Claves), ahora con cerca de 48 horas en el aire, y sigue sin ninguna entrada en `bitacora/PENDIENTES.md`.

**Nuevo**:
- Un patrón distinto de titular (proyección u anuncio presentado como hecho cierto) apareció dos días seguidos, 12 y 13-09, y la propia revisión editorial de hoy lo reconoció como repetición del de ayer.
- Regresión puntual: el guion de hoy dejó fuera del listado de fuentes a la Dirección Meteorológica de Chile, algo que los guiones del 10 y el 12-09 sí hacían bien.
