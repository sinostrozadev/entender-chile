ESTADO: CON OBSERVACIONES — HOY: sigue sin carátula propia, ahora dos
ediciones seguidas (03-10 y 04-10), ninguna con `NO-PUDE.md` declarado.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Nota |
|---|---|---|---|
| Barrido | 01:40 (`contenido/estado/2026-10-04.md`, run 37177675544, `success`) | 01:40 | a tiempo |
| Plan B activado | 02:34:41 (`contenido/estado/plan-b.txt`) | — | GPT no respondió el turno `barrido_listo` en 23 min tras dos avisos; `hasta: 2026-10-04`, cubrió el día entero |
| Preselección (Suplente + validación) | APROBADA vuelta 0, 02:46 | 02:10 | +36 min |
| Informe (Suplente + validación) | APROBADA vuelta 1, 03:13 | 02:40 | +33 min; 1 vuelta por 4 cosas de forma |
| Guion del informe (Suplente + validación) | APROBADA vuelta 0, 03:40 | 03:10 | +30 min |
| Revisión (compuerta, `contenido/revisiones/2026-10-04.md`) | APROBADA, 03:50 | 03:30 | +20 min |
| Edición diaria (voz, render, subida, podcast) | `videos_listos` 04:34 / actualizado 04:47 | 05:15 | 41 min antes, sin incidentes |
| Carátula propia | no se generó, sin `NO-PUDE.md` | — | segundo día seguido; ver hallazgo 1 |
| Podcast (`contenido/podcast/episodios.json`) | 809 s = 13,5 min | "~10 min, 12-13 en día cargado" | sobre el rango, segundo día seguido |
| Métricas | reloj 08:14 UTC = 05:14 Chile (run 37188290297, `success`) | 05:00 | 14 min, dentro de tolerancia |
| Clave | no corrió | — | correcto, no es diaria; la idea sigue en `idea_lista` desde el 27-09 (octava mañana, ver hallazgo 6) |

Todas las corridas de Actions de hoy en `main` terminaron en `success`
(verificado con `mcp__github__actions_list`: Barrido, Edición diaria,
Estado del día, Web, Métricas, Reintento del despertador).

## Qué falló

1. **Sigue sin carátula propia, ahora dos ediciones.** Verificado listando
   `contenido/caratulas/`: de octubre solo existen `2026-10-01.png` y
   `2026-10-02.png`; buscados los `*-NO-PUDE.md`, solo existen los del 25 y
   26-09-2026. El plan B volvió a cubrir el día completo y el suplente
   escribió las tres piezas sin generar imagen ni declarar su ausencia, igual
   que ayer. `prompts/suplente.md` sigue sin mencionar la palabra "carátula"
   (verificado con búsqueda explícita sobre el archivo completo: cero
   resultados), así que la propuesta de la auditoría del 03-10 no se aplicó.
   Esto ya está en `bitacora/PENDIENTES.md` (sección "Para la sesión de la
   noche", entrada del 03-10) como HOY; no se duplica, se le agrega la
   escalada.

2. **Segundo día seguido de plan B activado desde el primer turno
   (`barrido_listo`), cubriendo la cadena entera.** `contenido/estado/plan-b.txt`
   registra el mismo motivo que ayer: "GPT no respondio el turno barrido_listo
   ... tras dos avisos". Antes del 03-10, GPT tomaba sus turnos sin
   intervención (01-10 y 02-10, `contenido/estado/2026-10-01.md` y
   `2026-10-02.md`, todas las piezas llegaron ANTES de lo esperado). La
   calidad no se resintió (vuelta 1 en el informe, por cosas de forma), pero
   es la primera racha de dos días seguidos sin que GPT tome un solo turno, y
   el propio `contenido/revisiones/2026-10-04.md` lo señala: "conviene mirar
   la causa en la interfaz y no en las piezas".

3. **Contradicción de prompt repetida cinco veces y nunca anotada en
   ningún lado.** `prompts/informe.md:57` dice "Deportes... no llevan peso" y
   `prompts/informe.md:121` (control 1) exige "Toda noticia tiene peso [A],
   [B] o [C]". El validador la resuelve igual las cinco veces que aparece
   (informes del 15-09, 20-09, 26-09, 03-10 y 04-10-2026, todos APROBADA,
   deporte entra como [B]), y lo dice en prosa cada vez, pero nunca llegó a
   `bitacora/PENDIENTES.md` ni a `estrategia/decisiones.md` (verificado con
   búsqueda explícita en ambos: cero resultados). Es el caso que describe el
   contrato de esta auditoría: el ciclo revisa y no aprende, y lo mismo pasa
   con `prompts/guion-informe.md:228` (el ejemplo del árbol para tarjetas de
   barras usa etiquetas de una palabra: "industria -5,1%") contra
   `prompts/guion-informe.md:237` (ETIQUETA CON CONTEXTO exige 3 a 8
   palabras), señalada en 22-09, 26-09, 02-10 y 03-10, tampoco en
   PENDIENTES ni en decisiones.

4. **Podcast sobre el rango prometido, segundo día seguido.** 809 s (13,5
   min) hoy, 835 s (13,9 min) ayer, contra "~10 min, 12-13 en día cargado".
   Los seis días previos a ayer estaban entre 585 y 718 s
   (`contenido/podcast/episodios.json`). Ayer se anotó como "primera vez"; hoy
   ya son dos seguidos por sobre el rango, los dos días con el suplente
   escribiendo el guion.

5. **Horas vistas en videos LARGOS cayendo cinco días seguidos.** 30,2
   (30-09) → 28,9 (01-10) → 27,4 (02-10) → 23,9 (03-10) → 21,0 (04-10) horas en
   la ventana de 30 días de Analytics (`bitacora/metricas/2026-09-30.md` a
   `2026-10-04.md`), -30,5% desde el máximo. La retención media ponderada
   también bajó hoy (26,3%) después de un repunte ayer (28,9%): 36,6% → 28,7%
   → 39,5% → 28,9% → 26,3%.

6. La Clave sigue en `idea_lista` desde el 27-09-2026
   (`contenido/estado/clave-acuerdo-internacional-sin-tratado.md`), hoy se
   cumple la octava mañana seguida sin que Santiago apruebe o pida cambios.
   Ya está en `bitacora/PENDIENTES.md` (sección "Dependen de Santiago"); no
   se duplica.

## Propuestas

1. **HOY.** Generar ahora `contenido/caratulas/2026-10-03.png` y
   `contenido/caratulas/2026-10-04.png` con los datos de
   `contenido/guiones/informe/2026-10-03.md` y
   `contenido/guiones/informe/2026-10-04.md` (ambos traen "Clima de
   carátula"), o dejar `contenido/caratulas/FECHA-NO-PUDE.md` si no hay
   generador disponible; y en `prompts/suplente.md`, después de la línea 107,
   agregar la diferencia sobre carátulas que propuso la auditoría del 03-10
   (declarar `NO-PUDE.md` en vez de omitir el paso en silencio). Misma
   propuesta de ayer, ahora con dos ediciones afectadas en vez de una.

2. **MIRAR, no AGUANTA todavía.** Revisar del lado de Santiago (no es un
   archivo del repo) si la tarea de ChatGPT que escucha el PR
   `automatizacion/barrido-listo` sigue activa y con cuota disponible: dos
   días seguidos sin tomar el primer turno es un cambio de patrón frente a
   los seis días previos. Si se confirma un tercer día, esto debería subir a
   HOY en la auditoría de mañana.

3. **AGUANTA.** En `prompts/informe.md`, resolver la contradicción entre la
   línea 57 ("Deportes... no llevan peso") y la línea 121 ("Toda noticia
   tiene peso [A], [B] o [C]"): la forma más simple es agregar a la línea 121
   la excepción ya aplicada en la práctica, "(deporte, dato curioso, el
   tiempo y agenda quedan fuera de este control, ver su regla propia)". Lo
   mismo en `prompts/guion-informe.md`, cambiando el ejemplo de la línea 228
   a etiquetas de 3 a 8 palabras ("industria manufacturera: -5,1%" en vez de
   "industria -5,1%") para que no contradiga la línea 237.

4. Podcast: sin arreglo propuesto todavía, como ayer; si hay un tercer día
   sobre el rango, revisar si el guion del suplente narra de más frente al
   de GPT (comparar extensión de texto narrado en
   `contenido/guiones/informe/2026-10-02.md` contra `2026-10-03.md` y
   `2026-10-04.md`).

5. Horas largos: seguir midiendo; la propuesta de ayer sigue en pie (mirar
   qué videos entran y salen de la ventana de 30 días, no asumir peor
   retención de los nuevos).

## Triage

- **HOY**: hallazgo 1 (carátula, dos ediciones sin generar ni declarar) →
  propuesta 1. Ya en `bitacora/PENDIENTES.md`; se le agrega la escalada.
- **MIRAR**: hallazgo 2 (GPT sin tomar turnos, segundo día seguido) →
  propuesta 2.
- **AGUANTA**: hallazgo 3 (contradicciones de prompt repetidas y nunca
  anotadas) → propuesta 3.
- **MIRAR**: hallazgo 4 (podcast sobre el rango, segundo día seguido).
- **MIRAR**: hallazgo 5 (horas largos cayendo cinco días seguidos, -30,5%).
- **MIRAR**: hallazgo 6 (Clave en `idea_lista`, octava mañana; ya en
  PENDIENTES).

## Comparación con ayer

- **Mejoró**: la "Agenda de hoy" volvió después de dos días ausente (02 y
  03-10); el informe de hoy la trae con tres hitos y el guion cerró con su
  bloque. Las siglas (Dipres, DMC) ya no se pintan sin expandir, hallazgo
  que venía del 21 al 23-09 y hoy quedó resuelto, verificado línea por línea.
- **Sigue igual**: el plan B sigue activo (segundo día), la calidad de las
  piezas del suplente no se resiente (una sola vuelta de corrección), y la
  carátula sigue sin generarse ni declararse ausente.
- **Nuevo hoy**: por primera vez el plan B cubre dos días consecutivos
  completos desde el primer turno; antes del 03-10 nunca había pasado dos
  días seguidos.
- **Peor que ayer**: las horas vistas en los largos siguen cayendo al mismo
  ritmo fuerte que ayer (-12,1% de 03 a 04-10, contra -12,8% de 02 a 03-10,
  tras caídas más chicas los días anteriores: -4,3% y -5,2%); la retención
  media volvió a bajar tras el repunte de ayer; y la carátula faltante pasó
  de una edición a dos.
