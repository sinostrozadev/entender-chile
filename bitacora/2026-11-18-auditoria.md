# Auditoría matinal, 18-11-2026

ESTADO: CON FALLAS. HOY (heredado del 16-11-2026, tercera mañana sin
corregir): el informe del 15-11-2026 sigue publicado en entender.sinodev.cl
con los defectos de su única vuelta de corrección, que nunca se aplicó.

## Qué salió y a qué hora (18-11-2026, hora de Chile)

Todas las horas de esta tabla salen de `contenido/estado/2026-11-18.md`
(columnas "Llegó" y "Se espera a las", calculadas por `scripts/estado.js`
desde los archivos y verificadas contra `git log` y `mcp__github__actions_list`
sobre `barrido.yml`, `edicion-diaria.yml`, `metricas.yml`, `web.yml` y
`estado.yml`: más de 25 corridas de hoy, todas `conclusion: success`).

| Pieza | Llegó | Se esperaba | Estado |
|---|---|---|---|
| Barrido | 01:41 | 01:40 | a tiempo |
| Preselección | aprobada 01:49 (vuelta 0) | 02:10 | antes de hora, sin corrección |
| Informe | aprobada 02:38 (vuelta 1) | 02:40 | antes de hora, una vuelta |
| Guion del informe | aprobada 03:02 (vuelta 1) | 03:10 | antes de hora, una vuelta |
| Revisión (compuerta) | APROBADA 03:24 | 03:30 | antes de hora |
| Videos y descripciones (Short, podcast, web) | `videos_listos` 03:27 | 05:15 | muy antes de hora |
| Observatorio plata pública | 01:53 | 01:45 | ~8 min, sin hallazgo |
| Reloj de métricas → Métricas | despertador 05:04:51, `bitacora/metricas/2026-11-18.md` escrito 05:05:20 (30.503 bytes, con contenido real, a diferencia de ayer) | 05:00 | ~5 min, sin hallazgo |
| Clave (Codelco, producción inflada) | entrega y guion 01:41, investigación aprobada, `ETAPA: videos_listos` | sin calendario (regla 14) | los tres eslabones completos, nada perdido |

`node scripts/validar-tarjetas.js --fecha 2026-11-18`: un aviso, "sin línea
Carátula sugerida" (4 bloques con fuente, 520 palabras narradas, ~3,9 min,
Short previsto en 37,5 s). El podcast de hoy dura 240 s = 4,0 min
(`contenido/podcast/episodios.json`, campo `durSeg`, leído del json, no
estimado por palabras), en el borde superior de la promesa de 3 a 4 min pero
dentro de ella; el 14-11 ya había tocado 241 s, así que no es una tendencia
nueva. Ninguna marca `PENDIENTE DE CIERRE` en el informe de hoy (verificado,
sin resultados al buscar en `contenido/informes/2026-11-18.md`). El Short de
hoy ("Personas con condenas seguían en funciones públicas") está en
`private`: coincide con la [TESIS] de `contenido/guiones/informe/2026-11-18.md:8`
y su publicación programada es a las 12:00 de Chile, hora que todavía no
llega; no es una falla, es la ventana de revisión de Santiago (regla 19).

## Qué falló

**Heredado del 16-11, sin corregir (tercera mañana): el informe del
15-11-2026 sigue publicado con los defectos de su vuelta 1.** Verificado de
nuevo hoy, no de memoria: `contenido/informes/2026-11-15.md:104` todavía dice
"durante el cierre de esta edición" (nota de proceso en el cuerpo público) y
la línea 169 (el `[C]` de Sernac sobre frenos de motos Gas Gas) sigue sin el
prefijo obligatorio "FUERA DE LA OLLA:". El bullet de `bitacora/PENDIENTES.md`
(sección DEPENDE DE SANTIAGO) ya tiene la evidencia completa; no se duplica,
se le agrega la marca de tercera mañana en este mismo commit.

**AGUANTA, y es el hallazgo que importa: el arreglo de ayer al "reparto de
palabras" no sobrevivió su primera prueba.** La mejora del 17-11-2026
(`bitacora/REALIZADOS.md`, entrada del 17-11) reemplazó el chequeo del tope de
cifras por un procedimiento con nombre en `prompts/guion-informe.md:336`
("17d. Conté las cifras habladas de cada bloque... si saqué alguna de la voz,
su lugar quedó ocupado con material no numérico..."), verificado presente en
el archivo. Hoy, su primer día de vigencia real (la mejora se escribió
después de que la producción del 17-11 ya había corrido), el mismo defecto
volvió a pasar la primera vuelta: la portada quedó en 103 palabras narradas
contra 117 y 134 de los otros dos bloques (`contenido/revisiones/2026-11-18.md:23-29`),
exactamente el patrón que el punto 17d debía prevenir. El validador lo
corrigió en la vuelta 1 (no bloqueó), pero el procedimiento nuevo no cambió
el resultado: GPT no lo aplicó, o el punto 17d no alcanza a prevenirlo desde
la escritura. Es un solo día de evidencia post-arreglo, pero es la señal que
hay que mirar mañana: si se repite un tercer día con el 17d ya vigente, es el
hallazgo-que-no-aprende que pide escalar.

**AGUANTA, nuevo hoy: las tres categorías de bloque del guion salieron fuera
de la lista cerrada del prompt, con los nombres de las secciones del informe
en vez de las categorías del guion.** `contenido/revisiones/2026-11-18.md:30-35`:
`node scripts/validar-tarjetas.js` contó cero secciones de noticia donde
debía haber categorías de bloque. No bloqueó (se corrigió en la vuelta 1),
pero es la comprobación más mecánica de las tres y hoy la saltó GPT en los
tres bloques a la vez. Vale la pena que el despachador la compruebe antes de
commitear, como ya propone la revisión de hoy.

**AGUANTA, ya conocido, sin cambio: la contradicción del prompt sobre
carátulas sigue sin resolverse, pero el conteo de "días con el aviso" de las
revisiones anteriores está inflado.** Verifiqué `node scripts/validar-tarjetas.js`
sobre cada guion desde el 12-11: el aviso "sin línea Carátula sugerida"
apareció el 12-11, el 17-11 y hoy, pero NO el 13-11, el 14-11 ni el 16-11
(esos tres días el guion SÍ llevaba las líneas "Carátula sugerida:/2:/3:",
confirmado leyendo esos archivos). La revisión del 17-11 lo llamó "sexto día
con el aviso" y la de hoy "octavo"; la evidencia real son tres apariciones no
consecutivas, no una racha de seis ni de ocho. El problema de fondo sigue
siendo el mismo que ya propuso el 17-11 (`prompts/guion-informe.md:154-173`
contradice su propia línea 189), pero GPT alterna entre escribir las
carátulas y no escribirlas según el día, lo que confirma que la contradicción
sí afecta la salida, no es puro ruido como concluyó la auditoría del 17-11.

**AGUANTA, ya conocido, sin cambio:** las seis fuentes institucionales sin
feed propio (`bitacora/PENDIENTES.md:560`, AGUANTA desde el 16-10) y la
clasificación por área del barrido dejando noticias "Sin área"; hoy además
cuatro fuentes completas sin revisar (Cámara de Diputados, Senado, Dirección
Meteorológica y Ministerio Público) por el mismo turno del suplente
(`contenido/revisiones/2026-11-18.md:65-73`). Ninguno es nuevo hoy, ninguno
pierde datos ni bloquea.

## Propuestas

1. **[HOY, heredado]** Aplicar en `contenido/informes/2026-11-15.md` las seis
   correcciones de `contenido/veredictos/2026-11-15-informe.md` (línea 104 y
   la línea 169 del Sernac entre otras) y volver a pushear para que `web.yml`
   redespliegue. Ya está completo en `bitacora/PENDIENTES.md`, sección
   DEPENDE DE SANTIAGO; sigue esperando el sí de Santiago para la excepción
   de "no tocar fechas anteriores".
2. **[AGUANTA]** En `prompts/guion-informe.md`, cerca del punto 17d (línea
   336), agregar que el conteo de palabras por bloque se haga ANTES de narrar
   las cifras, no como chequeo posterior: hoy el punto existe y se saltó en
   su primer día de vigencia.
3. **[AGUANTA]** En el despachador o en `scripts/validar-tarjetas.js`,
   agregar una comprobación mecánica de que las tres categorías de bloque del
   guion pertenecen a la lista cerrada del prompt, no a los nombres de
   sección del informe.
4. **[AGUANTA]** En `prompts/guion-informe.md:154-173`, borrar o condicionar
   las instrucciones de "Carátula sugerida/2/3" y "Clima de carátula" (ya
   contradichas por la línea 189), porque GPT las sigue de forma intermitente
   y eso ya afectó la salida tres veces (12, 17 y 18-11), no es ruido inocuo.

## Triage

- **HOY**: propuesta 1 (heredada; ya en `PENDIENTES.md`, se le agrega la
  marca de tercera mañana en este commit).
- **AGUANTA**: propuestas 2, 3 y 4.
- **MIRAR**: si el reparto de palabras por bloque vuelve a romperse un
  tercer día consecutivo (sería el 19-11) ya con el punto 17d vigente, eso sí
  es el hallazgo-que-no-aprende y debe subir de categoría.

## Comparación con ayer

- **Mejoró**: los suscriptores volvieron a subir (+1 hoy, +1 ayer, después
  del día plano del 16-11, que queda descartado como tendencia); el reloj de
  métricas no repitió el commit vacío de ayer y escribió el archivo a tiempo.
- **Sigue igual**: el informe del 15-11 sigue sin corregir (tercera mañana);
  las fuentes institucionales sin feed y la clasificación "Sin área" siguen
  iguales; la contradicción de las carátulas en el prompt sigue sin tocarse.
- **Nuevo**: el arreglo del "reparto de palabras" que se escribió ayer no
  evitó que el mismo defecto volviera a pasar la primera vuelta hoy, en su
  primer día de vigencia; las tres categorías de bloque salieron fuera de la
  lista cerrada, algo que no se había visto en los días anteriores revisados
  (14, 16 y 17-11); y el conteo de "días con el aviso" de carátula que
  venían arrastrando las dos auditorías anteriores resultó estar inflado
  contra la evidencia real de `validar-tarjetas.js`.
