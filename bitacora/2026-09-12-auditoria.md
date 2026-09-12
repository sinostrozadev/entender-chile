ESTADO: CON FALLAS — el HOY de la auditoría de ayer (la cifra de portada de la Corte Suprema, publicada con un error aritmético) sigue sin corregirse veinticuatro horas después: el 11-09 se perdió por completo (cero videos, informe y Clave) y hoy el error sigue en vivo en la web pública, sin que nadie lo haya tocado ni lo haya anotado en `bitacora/PENDIENTES.md`.

Auditada el 12-09-2026 a las 05:31 de Chile (08:31 UTC), con el checkout sincronizado contra `origin/main` (`f3ff696`, "métricas 2026-09-12 [bot]"). Horas esperadas tomadas de `bitacora/cronograma.json` (actualizado 10-09-2026).

## Qué salió y a qué hora

| Pieza | Hora esperada | Hora real (Chile) | Estado |
|---|---|---|---|
| Barrido | 01:31 | 01:33 | ok |
| Preselección | ~01:38 | 01:37 | ok |
| Observatorio plata pública | 01:45 | 01:55 | +10 min, mismo atraso que ayer |
| Informe | ~02:00 | 01:41 | ok (19 min antes) |
| Entrega de Clave ("Prisión preventiva en Chile") | ~02:30 | 01:44 | ok |
| Guion del informe | ~02:10 | 01:48 | ok |
| Guion de la Clave | ~02:35 | 01:53 | ok |
| Revisión editorial (Opus) | 04:45 | 04:52 | +7 min, VEREDICTO: APROBADA (con una corrección grave resuelta en el momento) |
| Edición diaria (compuerta y render) | ~04:50 | 04:52 arrancó; en curso a las 05:31 | dentro de lo normal: el render completo suele tomar 50 a 60 min desde que arranca (así corrió el 10-09, de 04:44 a 05:46 Chile); a la hora de esta auditoría iba en el paso 13 de 20 ("Short del informe") |
| Reloj de métricas → Métricas | 05:00 | 05:05 | ok |
| Auditoría matinal (esta) | 05:30 | 05:31 | ok |

Los tres eslabones de la Clave de hoy (entrega, guion, y el video en curso) van sin incidentes. `descripciones/` todavía no tiene piezas del 12-09 porque el render no ha terminado: correcto, no es una ausencia real.

## Qué falló

1. **[GRAVE, HOY de ayer sin ejecutar] La cifra de portada del 11-09 sigue mal y sigue publicada.** La auditoría de ayer (`bitacora/2026-09-11-auditoria.md`) marcó como HOY corregir `contenido/informes/2026-09-11.md` línea 16 y los tres archivos que arrastran el mismo error ("tres jueces removidos y 25 personas absueltas" para "25 de 56 cuadernos", una suma que no cuadra), republicar y volver a correr la revisión a mano para destrabar `edicion-diaria.yml`. Verificado ahora: la línea 16 de `contenido/informes/2026-09-11.md` y las líneas 7 y 103 de `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` siguen con la misma cifra sin corregir, no hay ningún commit posterior a "revisión 2026-09-11 [claude]" (07:50 UTC del 11-09) que toque esos archivos, y `bitacora/PENDIENTES.md` (última actualización 02-09-2026) no tiene ninguna entrada sobre esto. La cadena de commits pasó directo de la revisión rechazada del 11-09 a "edición 2026-09-12: preselección" sin volver atrás.

   Consecuencia medida: el 11-09 terminó con **cero videos** (ni informe ni Clave, ni sus dos Shorts): `contenido/descripciones/` salta del 10-09 al 12-09 sin ninguna pieza del 11-09, y `contenido/podcast/episodios.json` no tiene entrada para el 11-09. Es la primera vez en la serie observada que un día completo de producción se pierde en vez de solo atrasarse.

2. Sin fallas nuevas en la cadena de hoy: `node scripts/validar-tarjetas.js --fecha 2026-09-12` no dio avisos ("variedad OK: ninguna cuota rota, ninguna marca malformada"). El único `PENDIENTE DE CIERRE` abierto (Fodich, del 11-09) se cerró hoy mismo en el informe (línea 240: "cerrado con prisión preventiva para Fodich y otros dos imputados"). El de IPoM (09-09) ya se había cerrado el 10-09.

3. **[MENOR, repite dos días]** El mismo hallazgo de revisión aparece hoy y ayer: una marca `[DATO]` que redondea hacia abajo perdiendo el "más de" de su fuente (ayer: heridos del incendio; hoy: bombas molotov en Cerro Navia, guion línea 56). Dos días seguidos con el mismo patrón todavía no es "el ciclo no aprende" (serían tres), pero ya es una tendencia a mirar.

## Propuestas

1. En `contenido/informes/2026-09-11.md` línea 16, `contenido/claves/2026-09-11-disciplina-remocion-jueces-chile.md` líneas 7 y 103, `contenido/guiones/informe/2026-09-11.md` líneas 5, 12, 23 y 27, y `contenido/guiones/claves/2026-09-11-disciplina-remocion-jueces-chile.md` línea 47: verificar con una fuente fuera del proxy bloqueado cuántos de los 25 cuadernos resueltos terminaron en absolución, corregir las cuatro cifras de forma consistente y republicar. El 11-09 ya no puede "alcanzar" al render normal (la cadena ya pasó al 12-09), así que esto exige decidir aparte: ¿se corre `edicion-diaria.yml` a mano con `FECHA=2026-09-11` para producir el video atrasado, o se da el día por perdido y solo se corrige el texto público? Cualquiera de las dos requiere una decisión de Santiago, no una auditoría.
2. Agregar la propuesta 1 a `bitacora/PENDIENTES.md` explícitamente hoy: es la causa de que un HOY se haya perdido en el aire ayer. Mientras la auditoría solo escriba en su propio archivo y nadie lo traspase a la lista viva, un HOY puede desaparecer un día completo sin que nadie lo note hasta que otra auditoría vuelva a tropezar con él.
3. `contenido/guiones/informe/2026-09-12.md` línea 56: cambiar "bombas molotov incautadas en Cerro Navia: 90" por "más de 90", igual que la corrección pendiente del 11-09 con los heridos.

## Triage

- **HOY**: Propuesta 1 y 2 (el error de portada del 11-09 sigue publicado y sin corregir, y el HOY de ayer nunca llegó a la lista viva de pendientes; ya es el segundo día que pasa sin que nadie lo ejecute).
- **AGUANTA**:
  - Propuesta 3 (marca `[DATO]` de hoy sin el "más de" de su fuente).
- **MIRAR**:
  - El hallazgo del "más de" perdido lleva dos días seguidos (11 y 12-09); si aparece un tercer día, deja de ser un hallazgo aislado y pasa a ser un patrón que el ciclo de revisión no está corrigiendo en el prompt del guionista.
  - Observatorio plata pública sigue corriendo con el mismo atraso de +10 minutos que ayer; todavía no rompe nada, pero ya son dos días con el mismo margen.

## Comparación con ayer

**Mejoró**:
- La revisión editorial encontró hoy un error grave (el guion decía "viernes doce de septiembre" cuando el 12 de septiembre de 2026 es sábado) y esta vez sí lo corrigió en el momento ("modo corrección", verificado con dos cálculos de calendario independientes y con prensa del 11-09), a diferencia de ayer donde el mismo mecanismo de corrección se topó con el proxy bloqueado (EGRESS_BLOCKED) y tuvo que rechazar. El mecanismo de corrección funciona cuando puede verificar el dato.
- El `PENDIENTE DE CIERRE` de Fodich, abierto ayer, se cerró hoy mismo con la información nueva (prisión preventiva), como corresponde.

**Sigue igual**:
- La cadena de la madrugada (barrido a guion de Clave) sigue puntual, sin atrasos mayores a 20 minutos.
- Observatorio plata pública repite el atraso de +10 minutos de ayer.
- `validar-tarjetas.js` sigue sin encontrar roturas de formato.

**Nuevo**:
- El 11-09 quedó sin ningún video (informe ni Clave): la primera vez que un rechazo de revisión no se resuelve el mismo día se convierte en un día entero perdido, no solo en un atraso.
- El HOY de la auditoría de ayer nunca se ejecutó ni quedó anotado en `bitacora/PENDIENTES.md`: es la primera vez que se puede confirmar que un hallazgo HOY se cae entre la auditoría matinal y la sesión de la noche sin dejar rastro en la lista viva.
- La cifra incorrecta del 11-09 sigue en este momento visible en el sitio público (informe y Claves), ahora con casi 28 horas en el aire en vez de las 3 horas que llevaba cuando se detectó ayer.
