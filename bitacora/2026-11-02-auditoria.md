# Auditoría matinal, 02-11-2026

ESTADO: CON OBSERVACIONES. La cadena corrió completa y limpia, sin un solo
reintento ni workflow fallido, pero el informe narró 249 segundos (4:09) y la
promesa sigue siendo 3 a 4 minutos, y la olla repite, cuarto día seguido
(30-10, 31-10, 01-11 y hoy), el mismo subconteo de palabras sin que nadie lo
toque.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido (rutina) | 01:45 | 01:30 | éxito, 15 min tarde | `contenido/barrido/despertador.txt`, commit `ae25f0c` |
| Barrido | 01:45 | ~01:31 | éxito | Actions "Barrido" run 190, commit `084c8c1` "barrido 2026-11-02 [bot]" |
| Observatorio plata pública | 01:54 | 01:45 | éxito, sin cambios en los dossiers (DNS no resuelve los dominios de prensa en este entorno, declarado en el propio commit) | commit "observatorio 2026-11-02 [claude]" |
| Preselección (suplente, reparto permanente del 06-10) | redactada 01:59, veredicto 02:05 | tras `barrido_listo` | APROBADA vuelta 0 | `contenido/veredictos/2026-11-02-preseleccion.md` |
| Informe | redactado 02:09, veredicto 02:19 (CORREGIR) | tras cada pieza | APROBADA vuelta 1, redactado de nuevo 02:20, veredicto 02:25 | `contenido/veredictos/2026-11-02-informe.md` |
| Guion del informe | redactado 02:27, veredicto 02:36 (CORREGIR) | tras cada pieza | APROBADA vuelta 1, redactado de nuevo 02:37 | `contenido/veredictos/2026-11-02-guion_informe.md` |
| Revisión (compuerta) | 02:43 | tras cada pieza | APROBADA vuelta 1 | `contenido/revisiones/2026-11-02.md` |
| Edición diaria (render, carátulas, podcast, subida programada) | 02:43 a 02:59 | ~04:00 | éxito | Actions "Edición diaria" run 299, success |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs 432 a 435, todos success |
| Clave | no corresponde hoy (sin calendario desde el 01-11, a juicio editorial) | cuando corresponda | sin novedad, no es hallazgo | `contenido/claves/`, `contenido/guiones/claves/` sin archivo de hoy |
| Reloj de métricas → Métricas | 05:09 | 05:00 | éxito, 9 min tarde | `bitacora/metricas/2026-11-02.md`, commit `aa6780d` |
| Vigía de la cadena | corrió (se reporta SUCCEEDED) | 02:15 y 05:15 | sin nada atrasado que avisar | no hay evidencia de aviso al teléfono, consistente con que no hubo atraso que reportar |

## Qué falló

Sin fallas que rompan la cadena de hoy. Dos cosas quedan anotadas porque
siguen sin corregirse pese a estar identificadas con precisión:

- **El contador de palabras de `scripts/validar-tarjetas.js` vuelve a medir
  bajo, cuarta edición seguida con la misma nota** (30-10, 31-10, 01-11 y
  hoy, todas en `contenido/revisiones/`): su filtro de la línea 90 descarta
  toda línea que empieza con corchete y deja fuera las `[TESIS]`, que el
  prompt declara narradas. Hoy imprimió 477 palabras cuando lo que se oye son
  535 (`contenido/revisiones/2026-11-02.md`). El propio archivo decide con
  esto el piso de 25 a 35 palabras de "La noticia del día", que con un
  criterio da 28 y con el otro 43: no es solo un número feo en un log, es la
  vara que decide si un bloque cumple. Cuatro días sin que nadie lo toque es
  el patrón que importa, no el bug original.
- **El informe narró 249 segundos (4:09)**, ocho segundos sobre el techo de
  4 minutos que fija `prompts/guion-informe.md` desde el 12-10-2026
  (`contenido/podcast/episodios.json`, episodio del 02-11, `durSeg: 248`; el
  video final mide 249 según `bitacora/metricas/2026-11-02.json`). Es la
  primera vez en los últimos días que se sale del rango por arriba: el
  01-11 cerró en 240, justo en el límite.

## Propuestas

- En `scripts/validar-tarjetas.js`, línea 90, sumar al conteo de palabras
  narradas el texto de las líneas que empiezan con `[TESIS]` (hoy quedan
  excluidas junto con el resto de las marcas entre corchetes). Mismo arreglo
  que pidieron las revisiones del 30-10, 31-10 y 01-11 sin que se aplicara.
- Sin propuesta de código para el largo del informe: 249 segundos sobre un
  techo de 240 es un exceso menor (3,75%) y no hay una sola causa aislable en
  esta edición; si se repite por tres o más ediciones seguidas, ahí sí
  conviene mirar el guion.

## Triage

- **AGUANTA**: el subconteo de `scripts/validar-tarjetas.js:90` (molesta la
  medición, no rompe la producción; ya lleva cuatro días sin dueño que lo
  tome).
- **MIRAR**: el informe se salió del techo de 4 minutos por primera vez en
  varios días (249 s contra 240); todavía es un dato suelto, no una
  tendencia.
- **MIRAR**: la votación del boletín 18817-07 (pérdidas previsionales de las
  AFP) sigue `PENDIENTE DE CIERRE` por segundo día con la misma fecha de
  cierre prometida (`contenido/informes/2026-11-01.md:61` prometía hoy,
  `contenido/informes/2026-11-02.md:70` vuelve a prometer hoy): es un atraso
  que crece y lo hereda la edición del 03-11.
- **MIRAR**: la cadena completa (barrido a `videos_listos`) terminó a las
  02:59, muy antes de las ~04:00 que todavía marca el cuadro del panel; es el
  mismo patrón que ya anotaron las auditorías del 27, 30 y 31-10, y el cuadro
  de horas esperadas sigue sin corregirse.
- No hay ningún `HOY`.

Nada de lo anterior tiene decisión de "no hacer" registrada en
`estrategia/decisiones.md` ni en `bitacora/REALIZADOS.md`; sigue sin dueño
porque es AGUANTA o MIRAR, no porque se haya resuelto.

## Comparación con ayer

Mejoró: ayer (01-11) la cadena entera murió en silencio tras el barrido por
una falla de `estado.yml` que no reaccionó a un `workflow_run`; hoy
`estado.yml` encadenó cada etapa sin un solo salto, y las tres piezas
quedaron APROBADA sin necesitar el reintento manual que ayer sí hizo falta.
Sigue igual: las seis fuentes institucionales sin feed, el clasificador de
áreas mandando fútbol a "Ciencia y tecnología" y el subconteo de palabras de
`validar-tarjetas.js`, los tres ya documentados día tras día sin corregirse.
Nuevo: el informe se pasó del techo de duración por primera vez en varios
días, y el Short del día salió a tiempo (40 s, subido junto con el informe),
con los suscriptores planos en 47 (+0) tras el salto de +7 del 01-11.
