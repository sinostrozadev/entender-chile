# Auditoría matinal, 30-10-2026

ESTADO: CON FALLAS. El historial de git de main se destruyó hoy a las
01:55:56 de Chile (04:55:56 UTC) y hay que repararlo antes del Barrido de
mañana, 31-10-2026, o la única copia que queda se pierde también.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (cuadro) | Veredicto | Evidencia |
|---|---|---|---|---|
| Barrido | 01:45 | 01:40 | éxito | Actions "Barrido", run 41004620108 |
| Preselección | redactada 01:58, veredicto 02:05 | 02:10 | APROBADA vuelta 0 | contenido/veredictos/2026-10-30-preseleccion.md |
| Informe | redactado 02:09, veredicto 02:25 | 02:40 | APROBADA vuelta 1 (CORREGIR en 02:18) | contenido/veredictos/2026-10-30-informe.md |
| Guion del informe | redactado 02:28, veredicto 02:51 | 03:10 | APROBADA vuelta 2 (CORREGIR en 02:36 y 02:46) | contenido/veredictos/2026-10-30-guion_informe.md |
| Revisión (compuerta) | 02:51 | 03:30 | APROBADA vuelta 2 | contenido/revisiones/2026-10-30.md |
| Edición diaria (render, descripciones, podcast) | videos_listos 03:07 | (no aplica) | éxito | Actions "Edición diaria", run 41010763530 |
| Métricas | reloj 05:07, bajada 05:08 | 05:00 | éxito | bitacora/metricas/2026-10-30.md |
| Clave | no corresponde hoy (no es domingo, CLAVE 4 no es diaria desde el 16-09) | | | |

Ninguna pieza de la cadena de contenido llegó con más de 20 minutos de
atraso: al contrario, las cinco piezas y el render terminaron antes de lo
que marca el cuadro del panel vigente (bitacora/panel-interno.html, tabla
fechada 27-10). Eso ya pasaba el 27-10 (real 03:05 contra esperado 05:15
para "videos listos") y vuelve a pasar hoy, así que el cuadro de horas
esperadas parece desactualizado contra el ritmo real del pipeline. Anotado
como MIRAR, no HOY: no bloquea nada, solo vuelve inútil la comparación de
atrasos.

## Qué falló

**1. Grave, fuera de la cadena de piezas: el historial real de git en main
quedó destruido hoy.** A las 01:55:56 de Chile (04:55:56 UTC) se subió a
main el commit `2549835e8e49dbe5b03490528020245546474362`
("observatorio 2026-10-30 [claude]", autor Claude, Co-Authored-By Claude
Opus 5, sesión `https://claude.ai/code/session_01GSL5CyeEVqQBiH2Gh2VAUd`,
que es la de la rutina Observatorio de plata pública). Ese commit NO TIENE
PADRE (`git show --no-patch --format=%P 2549835` no devuelve nada) y agrega
de una sola vez 2.030 archivos y 1.513.597 líneas: el árbol completo del
repo convertido en un commit raíz nuevo. Verificado, no es una sospecha:

- `git rev-list --count main` da 50 commits, los 50 fechados hoy entre las
  04:56 y las 08:36 UTC.
- El tag `edicion-2026-10-29` (creado por la propia edición del 29-10, a
  las 22:42 UTC de ese día) tiene 134 commits reales de historia y NO es
  ancestro de main: `git merge-base --is-ancestor edicion-2026-10-29 main`
  devuelve que no.
- La rama `origin/automatizacion/barrido-listo` sí conserva la cadena real
  completa, 144 commits, con `edicion-2026-10-29` como ancestro. Su padre
  inmediato, `fdea01240c30eedf019b8d106a2ac17f005d755a` ("barrido 2026-10-30
  [bot]", 04:45 UTC de hoy), es con alta probabilidad el verdadero último
  commit de main, once minutos antes de que lo reemplazaran.
- Esa misma rama es, hoy, la única copia accesible de esos dos meses de
  historial, y es también lo que puede destruirla: `barrido.yml` líneas 86
  a 95 la resetea cada madrugada (`git checkout -B automatizacion/barrido-listo
  origin/main`) y la sube con `git push -f`. La corrida de mañana
  (31-10-2026, hacia la 01:30 a 01:45 de Chile) va a tomar como base el main
  YA ROTO y va a sobreescribir esta rama. Después de esa corrida, recuperar
  el historial sin pasar por soporte de GitHub puede dejar de ser posible.
- No hay ninguna decisión en `estrategia/decisiones.md` ni línea en
  `bitacora/REALIZADOS.md` que explique esto: no es un cambio decidido, es
  un accidente de hoy. El contenido de los archivos no se perdió (todo lo
  de abajo se verificó sobre el main actual y está bien), lo que se perdió
  es el rastro: los commits reales de los dos meses de producción, que son
  justamente la evidencia de aporte humano distribuido en el tiempo que
  pide YouTube y que cita el encabezado de CLAUDE.md.

**2. AGUANTA, ya señalada por la propia revisión de hoy: las observaciones
del validador empujan a incumplir el prompt.** `contenido/revisiones/2026-10-30.md`
(hallazgos 1 y 2) dice que el veredicto del informe recomendó una [B] por
"tener más material" en vez de nombrar la que manda la regla (la primera de
"En una mirada" cuando el informe trae menos de tres [A]), y que una
corrección de la vuelta 1 pidió reescribir el cierre sin decirle el rango de
palabras, así que salió en 64 contra un techo de 60. Las dos vueltas del
guion de hoy las provocó esto. Ayer (29-10) el guion también costó dos
vueltas, por una variante distinta del mismo problema de fondo (ver
Comparación con ayer).

**3. MIRAR: la edición de hoy quedó sin margen.** 422 palabras narradas
contra un piso de 420, y un cierre de 60 contra un techo de 60, como ya lo
advierte `contenido/revisiones/2026-10-30.md` ("la edición quedó sin
margen"). No es una falla hoy: lo sería si mañana un hallazgo pide quitar
algo y no hay de dónde.

Sin más fallas en el contenido: `node scripts/validar-tarjetas.js --fecha
2026-10-30` no dejó avisos (422 palabras narradas, ~3,1 min, variedad OK), y
la duración real del episodio de hoy (`contenido/podcast/episodios.json`,
`durSeg: 220`, 3,67 min) está dentro del objetivo vigente de 3 a 4 minutos
(decisión de Santiago del 12-10-2026, `estrategia/decisiones.md`), no contra
la vieja promesa de ~10 minutos. No hay marcas `PENDIENTE DE CIERRE`
vencidas sin cerrar: la única que existe en los informes recientes
(27-10-2026, sobre la tasa del Banco Central) ya quedó resuelta por la
edición posterior, que narró "Banco Central no bajó la tasa".

## Propuestas

1. **Para la falla 1 (HOY).** Primero, asegurar una copia del historial
   real fuera de la rama que el propio workflow sobreescribe, sin tocar
   main todavía: `git push origin
   fdea01240c30eedf019b8d106a2ac17f005d755a:refs/tags/respaldo-historial-2026-10-30`
   (un tag nuevo, ningún workflow lo fuerza). Después, con el sí explícito
   de Santiago porque es una reescritura de main (regla dura 24):
   reconstruir main sobre `fdea0124` y volver a aplicar encima los commits
   reales de hoy, que son legítimos en su contenido aunque hoy cuelguen del
   commit raíz falso (desde `3b50b7c` "edición 2026-10-30: preselección"
   hasta la punta actual), por ejemplo con `git rebase --onto fdea0124
   2549835 main`, y recién ahí `push --force-with-lease` a main. Conviene
   además revisar la sesión de la rutina Observatorio
   (`https://claude.ai/code/session_01GSL5CyeEVqQBiH2Gh2VAUd`) para entender
   por qué su checkout quedó sin la historia real antes de comitear.
2. **Para la falla 2 (AGUANTA).** En `prompts/validador.md`, en la sección
   que escribe las observaciones para el despachador: exigir que, cuando el
   informe trae menos de tres [A], la observación nombre la [B] exacta que
   manda la regla (la primera de "En una mirada") y no una recomendación por
   volumen de material; y que toda corrección que mande reescribir una
   sección con rango propio (apertura, cierre, noticia del día) cite ese
   rango en la misma línea de la corrección.
3. **Para el MIRAR 3.** En `prompts/guion-informe.md`, subir el objetivo
   interno de palabras narradas de 420 a entre 440 y 460 (sigue dentro de
   los 3 a 4 minutos vigentes), tal como ya lo sugiere
   `contenido/revisiones/2026-10-30.md`, para dejar margen a una corrección
   que necesite acortar.

## Triage

- **HOY**: la destrucción del historial de git en main (falla 1). Baja a
  `bitacora/PENDIENTES.md` en este mismo commit.
- **AGUANTA**: el defecto de las observaciones del validador sobre qué [B]
  narrar y sobre los rangos de las correcciones (falla 2).
- **MIRAR**: el cuadro de horas esperadas del panel, desactualizado contra
  el ritmo real de la cadena; y el margen cero de palabras narradas de hoy
  (hallazgo 3).

## Comparación con ayer (29-10-2026)

- **Nuevo**: la falla 1 no existía ayer. Es de hoy, a las 01:55 de Chile.
- **Igual**: el guion volvió a costar dos vueltas, como ayer. Ayer el costo
  fue de fidelidad en pantalla y un relleno que la regla prohíbe; hoy fue
  elegir la [B] equivocada y un cierre sin rango. Dos días seguidos con dos
  vueltas de guion, por variantes del mismo problema de fondo (qué hacer
  cuando el informe trae menos de tres [A] y cómo se redactan las
  correcciones que cambian el largo), está en la frontera de la regla de
  "tres días sin aprender": si pasa una tercera vez, el hallazgo ya no es el
  guion, es que el ciclo revisa y no corrige la causa.
- **Mejoró**: la preselección de hoy salió aprobada sin vueltas (ayer costó
  una) y el informe costó solo una vuelta igual que ayer.
- **Sigue igual, ya anotado y no se duplica aquí**: las seis fuentes
  institucionales sin feed (Contraloría, Banco Central, Cámara, Senado,
  Dirección Meteorológica, Ministerio Público) siguen sin abrirse. Aparecen
  en las revisiones del 25, 26, 27 y hoy 30 de octubre (no en la del 29, y
  la del 28 no existe porque ese día la cadena se detuvo en la
  preselección). Es AGUANTA desde el 16-10 en `bitacora/PENDIENTES.md`
  línea 1268.
- **Números del canal** (`bitacora/metricas/2026-10-30.md` contra el de
  ayer): 39 suscriptores (+0, igual que ayer), 21.655 vistas totales (+55,
  contra +23 ayer), 210 subidos y 201 públicos (+6 y +4, porque el video
  largo de ayer, la acusación constitucional contra Rabat, pasó de privado a
  público hoy junto con su Short). El video largo de hoy (el desempleo)
  sigue privado, a la espera del clic de Santiago, que es el estado normal
  antes de publicarse. Nada que mover en la serie de los largos todavía: el
  único largo nuevo de hoy no tiene vistas porque no está publicado.
