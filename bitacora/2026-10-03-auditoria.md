ESTADO: CON OBSERVACIONES — HOY: la carátula del 03-10-2026 no se generó ni
quedó declarada ausente; el video ya está en `videos_listos` con la de
respaldo, a la espera de que Santiago lo publique.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Nota |
|---|---|---|---|
| Barrido | 01:40 (run 37097303459, `success`) | ~01:31 | 9 min, dentro de tolerancia |
| Plan B activado | 02:35 (`contenido/estado/plan-b.txt`) | — | GPT no respondió el turno `barrido_listo` en 23 min tras dos avisos de `reintento.yml` |
| Preselección (Suplente + validación) | APROBADA vuelta 0, 02:53 / veredicto 03:00 | ~01:35 en adelante | el suplente escribió sin navegar prensa; seis fuentes institucionales sin feed quedaron sin abrir, declarado en el veredicto |
| Informe (Suplente + validación) | APROBADA vuelta 0, 03:18 / veredicto 03:26 | tras preselección | sin sección "Agenda de hoy" (la entrada no trae hitos con fecha), declarado en el bloque interno |
| Guion del informe (Suplente + validación) | CORREGIR v1 03:37, APROBADA v1 03:56 (reparación del suplente, commit 06:51 UTC = 03:51 Chile) | ~03:10 | 1 vuelta, 3 incumplimientos de forma (tarjetas y una fecha relativa), ninguno de contenido |
| Revisión (compuerta, `contenido/revisiones/2026-10-03.md`) | APROBADA | ~03:10 | la propia revisión mide la cadena entre 27 y 43 minutos detrás de lo previsto |
| Edición diaria (voz, render, subida, carátula, podcast) | `videos_listos` 04:41 / actualizado 04:54 (`contenido/estado/2026-10-03.md`) | ~04:00-05:15 | adelantada en el render; **sin carátula propia y sin `NO-PUDE.md`** (ver hallazgo 1) |
| Podcast (`contenido/podcast/episodios.json`) | 835 s = 13,9 min | "~10 min, 12-13 en día cargado" | por sobre el rango prometido, dato medido del json |
| Métricas | reloj 05:15 (run 37109064680, `success`) | 05:00 | dentro de tolerancia, igual que días previos |
| Clave | no corrió | — | correcto, no es diaria; la idea "acuerdo-internacional-sin-tratado" sigue en `idea_lista` esperando el sí de Santiago (ver hallazgo 5) |

Todas las corridas de Actions de hoy en `main` terminaron en `success`
(barrido run 102, edición diaria runs 165-167, métricas run 101, reintento
con corridas cada ~17-20 min entre las 05:35 y las 08:34 UTC), verificado con
`mcp__github__actions_list`.

## Qué falló

1. **La carátula del 03-10-2026 no se generó y tampoco quedó declarada
   ausente.** El informe y el guion de hoy los escribió el suplente, porque
   el plan B quedó activo "hasta: 2026-10-03" desde las 02:35
   (`contenido/estado/plan-b.txt`). `prompts/guion-informe.md:150-174` manda
   generar la imagen de portada o, si falla, dejar
   `contenido/caratulas/FECHA-NO-PUDE.md` con el motivo: no pasó ninguna de
   las dos cosas. Verificado listando `contenido/caratulas/`: de octubre solo
   están `2026-10-01.png` y `2026-10-02.png`, y los únicos `*-NO-PUDE.md` que
   existen en el repo son del 25 y 26-09-2026. La propia revisión del día
   (`contenido/revisiones/2026-10-03.md`) nombra el problema ("el suplente...
   no genera imágenes") pero sin el archivo de declaración que el contrato
   exige. El video ya está en `videos_listos` (`contenido/estado/2026-10-03.md`,
   04:41/04:54) con la carátula de respaldo, pendiente de que Santiago lo
   publique con ese defecto visible.

2. **`prompts/suplente.md` no cubre el paso de la carátula.** Su lista de
   diferencias con GPT (líneas 96-110) dice "No navegas" y "No esperas el
   veredicto", pero no dice qué hacer con el paso de imagen que
   `prompts/guion-informe.md:158` le exige a quien escriba el guion. Por eso
   la omisión de hoy quedó muda en vez de declarada. No es un hallazgo nuevo
   del 03-10: es un hueco del prompt que existe desde que el suplente nació
   (26-09) y que hoy tuvo su primer caso real verificado, porque es la
   primera vez que el suplente escribe el guion completo del informe (los
   días anteriores con plan B activo, GPT volvió antes de llegar a esa
   etapa).

3. Duración del episodio del informe: 835 s = 13,9 min, por sobre el rango
   prometido ("~10 min, 12-13 en día cargado") y la más alta de la semana
   (601, 669, 617, 656, 585, 835 s en los últimos seis días,
   `contenido/podcast/episodios.json`). Es la primera vez que se pasa del
   rango; no hay evidencia todavía de causa (el guion pasó variedad y forma
   sin observaciones de largo), así que no se propone arreglo, solo queda
   anotado para ver si se repite.

4. Horas vistas en videos LARGOS (ventana de 30 días, la única serie que
   suma para las 4.000 horas) bajando cuatro días seguidos: 30.2 (30-09) →
   28.9 (01-10) → 27.4 (02-10) → 23.9 (03-10), -21% desde el máximo. La
   retención media ponderada de los largos no tiene tendencia clara en el
   mismo período (36.6% → 28.7% → 39.5% → 28.9%), así que el movimiento
   parece venir de qué videos quedan dentro de la ventana de 30 días, no de
   que los nuevos retengan peor. (`bitacora/metricas/2026-09-30.md` a
   `2026-10-03.md`.)

5. La Clave sigue en `idea_lista` desde el 27-09-2026
   (`contenido/estado/clave-acuerdo-internacional-sin-tratado.md`,
   `bitacora/bandeja.json` sin regenerar desde esa fecha), esperando el sí de
   Santiago para fijar la fecha de producción. Hoy se cumple la séptima
   mañana seguida sin avance. Ya está anotado en `bitacora/PENDIENTES.md`
   (línea 1049, "CLAVE 4", sección "Dependen de Santiago"); no se duplica.

## Propuestas

1. **HOY.** Generar ahora `contenido/caratulas/2026-10-03.png` siguiendo
   `prompts/imagen-caratula.md`, con los datos ya escritos en
   `contenido/guiones/informe/2026-10-03.md:3-6` (clima "institucional",
   carátula sugerida "¿Y el computador / que te prometieron?"), antes de que
   Santiago publique el video. Si esta noche no hay generador de imágenes
   disponible, dejar `contenido/caratulas/2026-10-03-NO-PUDE.md` con el
   motivo, igual que se hizo el 25 y 26-09-2026.

2. **AGUANTA.** En `prompts/suplente.md`, después de la línea 107 ("No
   esperas el veredicto..."), agregar una tercera diferencia: "No genera la
   carátula: si el turno es el guion del informe, al llegar al paso de
   `prompts/imagen-caratula.md` escribe de inmediato
   `contenido/caratulas/FECHA-NO-PUDE.md` con el motivo ('Suplente sin
   generador de imágenes') y sigue; nunca lo omitas en silencio." Así la
   próxima vez que el plan B llegue hasta el guion, la ausencia queda
   declarada como manda `prompts/guion-informe.md:171-174`.

## Triage

- **HOY**: hallazgo 1 (carátula del 03-10 sin generar y sin declarar) →
  propuesta 1.
- **AGUANTA**: hallazgo 2 (hueco de `prompts/suplente.md` sobre la carátula)
  → propuesta 2.
- **MIRAR**: hallazgo 3 (episodio de hoy sobre el rango de duración, primera
  vez).
- **MIRAR**: hallazgo 4 (horas vistas en los largos cayendo cuatro días
  seguidos).
- **MIRAR**: hallazgo 5 (Clave en `idea_lista` desde el 27-09, séptima
  mañana; ya en PENDIENTES).

## Comparación con ayer

- **Mejoró / se mantuvo**: a pesar de que el plan B cubrió el día entero por
  primera vez desde la preselección (no solo tramos sueltos), la calidad no
  se resintió: las tres piezas llegaron a APROBADA con una sola vuelta de
  corrección (igual que ayer), y todas las corridas de Actions terminaron en
  éxito.
- **Sigue igual**: "Agenda de hoy" sigue ausente en el informe, por falta de
  hitos con fecha en la entrada (correcto, no se inventa); la cuota de
  variedad de tarjetas se cumplió por tercer día.
- **Nuevo hoy**: por primera vez se verifica que el suplente, al escribir el
  guion completo, no genera la carátula ni declara su ausencia (hallazgos 1 y
  2); y el episodio de audio superó por primera vez el rango de duración
  prometido (hallazgo 3).
- **Peor que ayer**: las horas vistas en los largos, que venían subiendo
  hasta el 30-09, llevan cuatro días cayendo (hallazgo 4).
