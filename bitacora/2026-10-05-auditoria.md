# Auditoría matinal · 05-10-2026

ESTADO: CON OBSERVACIONES — HOY: la idea de la Clave de la semana 39 lleva
nueve mañanas sin que Santiago la apruebe o pida cambios y nunca quedó
anotada en PENDIENTES; sigue faltando la carátula del 04-10-2026 (tercera
mañana); y una contradicción de prompt en `guion-informe.md` va en su sexta
aparición sin registrarse en ningún lado.

## Qué salió y a qué hora

Todas las piezas de hoy llegaron, varias con margen amplio sobre lo
esperado (`contenido/estado/2026-10-05.md`). No hubo plan B:
`contenido/estado/plan-b.txt` no existe y los tres commits de piezas llevan
el mensaje normal de edición, no el de recuperación a mano.

| Pieza | Hora real (Chile) | Hora esperada | Diferencia |
|---|---|---|---|
| Barrido | 01:40 | 01:40 | a tiempo |
| Preselección (GPT, vuelta 0) | 01:45 | 02:10 | 25 min antes |
| Veredicto preselección | 02:02 | — | APROBADA vuelta 0 |
| Informe (GPT, vuelta 1) | 02:11 | 02:40 | 29 min antes |
| Veredicto informe | 02:19 | — | APROBADA vuelta 1 |
| Guion del informe (GPT, vuelta 1) | 02:30 | 03:10 | 40 min antes |
| Veredicto guion | 02:38 | — | APROBADA vuelta 1 |
| Revisión (compuerta, `contenido/revisiones/2026-10-05.md`) | 02:48 | 03:30 | 42 min antes |
| Edición diaria (voz, render, subida, podcast, carátula) | `videos_listos` 03:29 | 05:15 | 106 min antes |
| Carátula propia | `contenido/caratulas/2026-10-05.png` generada | — | sí, a tiempo |
| Podcast (`episodios.json`) | 696 s = 11,6 min | "~10 min, 12-13 en día cargado" | dentro del rango |
| Reloj de métricas (despertador) | push 05:17 | 05:00 | 17 min, dentro de la tolerancia de 20 |
| Métricas (`bitacora/metricas/2026-10-05.md`) | 05:18 | — | OK |
| Auditoría matinal (esta) | ~05:3x | 05:30 | a tiempo |
| Guardia | no corrió entre 04:00 y 09:00 UTC | correcto, su ventana es 08:00-22:00 Chile | sin novedad |
| Clave | no corrió | correcto, no es diaria | ver hallazgo 2 |
| GitHub Actions (todas las corridas de hoy) | Barrido, Edición diaria (3), Estado del día (17), Web (4), Métricas, Reintento del despertador (13) | — | **todas `success`, ninguna se reintentó** (verificado con `mcp__github__actions_list`) |

`node scripts/validar-tarjetas.js --fecha 2026-10-05`: "variedad OK: ninguna
cuota rota, ninguna marca malformada" (11 tarjetas: 4 cifra, 3 comparacion, 3
cambio, 2 esquema).

## Qué falló

1. **La carátula del 04-10-2026 sigue sin generarse y sin `NO-PUDE.md`,
   ahora la tercera mañana.** Verificado listando `contenido/caratulas/`: de
   octubre están `2026-10-01.png`, `2026-10-02.png`, `2026-10-03.png` (esta
   última entró HOY, en diferido: el commit es de esta madrugada aunque es
   la carátula del 03-10) y `2026-10-05.png`. Sigue faltando
   `2026-10-04.png`, y buscando `*-NO-PUDE.md` solo existen los del 25 y
   26-09-2026. `prompts/suplente.md` sigue sin la palabra "carátula"
   (verificado con búsqueda explícita sobre el archivo completo: cero
   resultados), así que ninguna de las dos propuestas de las auditorías del
   03-10 y el 04-10 se aplicó. El video del 04-10 quedó en `videos_listos`
   con carátula de respaldo, a la espera del clic de Santiago.

2. **La idea de la Clave de la semana 39 lleva nueve mañanas sin decisión de
   Santiago, y nunca quedó anotada en PENDIENTES.** Verificado en
   `contenido/estado/clave-acuerdo-internacional-sin-tratado.md`: `ETAPA:
   idea_lista`, `TURNO: Santiago: aprobar o pedir cambios`, `ACTUALIZADO:
   2026-09-27 00:31`. El tema se eligió el 26-09
   (`bitacora/REALIZADOS.md:21`) para salir el miércoles 30-09; hoy son
   nueve mañanas después de esa fecha sin aprobación ni cambios. La
   auditoría del 04-10 (`bitacora/2026-10-04-auditoria.md`, hallazgo 6) dijo
   "ya está en `bitacora/PENDIENTES.md` (sección 'Dependen de Santiago'); no
   se duplica", pero leída completa esa sección (líneas 450 a 691) hoy, no
   hay ninguna entrada sobre esta idea: la única entrada de Clave ahí es la
   de elegir el tema de la semana 39 (27-09), que ya está resuelta y
   obsoleta. Es exactamente el caso que esta auditoría está hecha para
   evitar: un hallazgo que se repite (visto en al menos 3 auditorías
   anteriores como "MIRAR" u "octava mañana") y que nunca llegó a la lista
   viva. Además esto bloquea aguas abajo: `contenido/claves/semana/2026-W40-candidatos.md`
   ya existe (generado el 04-10) pero excluye su mejor candidato (el Escudo
   de las Américas, puntaje 13) precisamente porque el flujo de la semana 39
   sigue abierto; la semana 40 no puede avanzar mientras la 39 no se cierre.

3. **Contradicción de prompt en `prompts/guion-informe.md` en su sexta
   aparición, nunca anotada.** `contenido/revisiones/2026-10-05.md` repite
   el hallazgo de que el piso de 3 a 8 palabras de la ETIQUETA CON CONTEXTO
   (línea 237) choca con el propio ejemplo que el prompt da para
   `comparacion` en la línea 229 ("fallecidos: 797 ; desaparecidos: 3048",
   etiquetas de una palabra): hoy las tres etiquetas de las tarjetas
   `comparacion` del guion quedaron con una palabra ("Flávio Bolsonaro",
   "Lula", "prisión preventiva") mientras las de `cifra` y `cambio` sí se
   corrigieron a 3-8 palabras. Mismo hallazgo del 22-09, 26-09, 02-10,
   03-10 y 04-10 (este último lo clasificó AGUANTA en
   `bitacora/2026-10-04-auditoria.md`, propuesta 3, y por ser AGUANTA nunca
   se bajó a PENDIENTES). Verificado con búsqueda explícita en
   `bitacora/PENDIENTES.md`: no hay ninguna línea con "ETIQUETA CON
   CONTEXTO" ni con "fallecidos: 797". Nunca bloqueó un veredicto, pero son
   seis mañanas sin que el prompt diga qué corresponde.

4. **Tarjetas mal tipificadas, una vez, ya corregidas.** El guion de hoy
   traía dos tarjetas con el tipo leído por el nombre del dato y no por su
   forma (una `cambio` con dos indicadores distintos de un valor cada uno, y
   una `comparacion` entre pesos y puestos de trabajo). Se corrigieron en la
   vuelta 1 y no bloquearon. Primera vez que se ve este patrón concreto
   (verificado: no aparece en `contenido/revisiones/2026-10-0{2,3,4}.md`),
   así que no es todavía un hallazgo repetido.

5. **Fuentes institucionales sin feed, tercer día seguido con el mismo
   costo.** El Consolidado N° 26 de la Contraloría y los avisos de la
   Dirección Meteorológica volvieron a entrar por los medios que los
   recogieron, no por la fuente directa: `contenido/barrido/fuentes.json`
   documenta esto desde el 27-08-2026 como diseño ("institucionales_sin_feed",
   "las revisa la tarea de GPT, no el script"), y el guion igual acredita a
   ambas instituciones. Mismo hallazgo del 03-10 y el 04-10
   (`contenido/revisiones/2026-10-0{3,4}.md`). No pierde información (el
   informe y el guion citan la fuente igual) y no bloquea, así que no sube a
   HOY; si aparece una cuarta vez sin que nadie decida si conviene usar el
   lector automático (`lector.yml`) contra esas páginas, correspondería
   escribirlo en PENDIENTES para que lo mire la sesión de día.

## Propuestas

1. Para la carátula del 04-10: generar ahora
   `contenido/caratulas/2026-10-04.png` con los datos de
   `contenido/guiones/informe/2026-10-04.md`, o dejar
   `contenido/caratulas/2026-10-04-NO-PUDE.md` si no hay generador
   disponible; y en `prompts/suplente.md`, después de la línea 107, agregar
   la diferencia sobre carátulas (declarar `NO-PUDE.md` en vez de omitir el
   paso en silencio). Misma propuesta del 03-10 y el 04-10, ahora urgente
   porque ya son tres ediciones.

2. Para la idea de la Clave: nada que tocar en código. Es una decisión de
   Santiago (aprobar o pedir cambios con `node scripts/clave.js aprobar
   acuerdo-internacional-sin-tratado` o `clave.js cambiar`), pero hay que
   escribirla en PENDIENTES para que no se pierda una décima mañana.

3. Para la contradicción de etiquetas: en `prompts/guion-informe.md`, en la
   línea 237 o inmediatamente después, agregar una frase que diga si el piso
   de 3 a 8 palabras rige por cada lado de una `comparacion` (como su propio
   ejemplo de la línea 229 no cumple) o solo para la etiqueta única de una
   tarjeta `cifra` o `cambio`. Edición de una línea, sin riesgo.

## Triage

- **HOY**: hallazgo 1 (carátula del 04-10, tercera mañana) → propuesta 1.
  Ya en PENDIENTES; se le agrega la escalada.
- **HOY**: hallazgo 2 (idea de la Clave, nueve mañanas, nunca anotada) →
  propuesta 2. Nueva entrada en PENDIENTES, sección "Dependen de Santiago".
- **HOY**: hallazgo 3 (contradicción de etiquetas, sexta vez, nunca
  anotada) → propuesta 3. Nueva entrada en PENDIENTES, sección "Para la
  sesión de la noche". Se marca HOY no porque rompa nada, sino porque
  escribirla ahora es lo único que evita una séptima mañana sin registro,
  que es exactamente el patrón que esta auditoría existe para cortar.
- **AGUANTA**: hallazgo 4 (tarjetas mal tipificadas), ya corregido en la
  vuelta de hoy, sin propuesta porque es un caso aislado todavía.
- **AGUANTA**: hallazgo 5 (fuentes institucionales sin feed, tercer día) →
  sin escribir en PENDIENTES todavía; sube si aparece una cuarta vez.

## Comparación con ayer

- **Mejoró**: GPT volvió a tomar sus turnos directo, sin plan B, por
  primera vez desde el 02-10 (dos días de plan B el 03 y el 04-10); todas
  las piezas llegaron con margen amplio (25 a 106 minutos antes de lo
  esperado), al revés de ayer, donde todas llegaron tarde (20 a 36 minutos
  después). El podcast volvió al rango prometido (11,6 min, contra 13,5 el
  04-10 y 13,9 el 03-10, los dos días sobre el rango). La carátula del
  03-10-2026 por fin entró (en diferido), aunque la del 04-10 sigue
  faltando. Las horas vistas en los largos dejaron de caer: 21,0 horas hoy,
  igual que ayer, después de cinco días seguidos de baja (-30,5% acumulado
  desde el 30-09).
- **Sigue igual**: la retención media de los largos sigue bajando despacio
  (26,6% ayer → 25,6% hoy). La idea de la Clave sigue sin aprobación
  (novena mañana). Las fuentes institucionales sin feed vuelven a entrar
  por los medios (tercer día).
- **Nuevo hoy**: la contradicción de etiquetas y la idea de la Clave sin
  anotar se escriben por primera vez en PENDIENTES, pese a no ser hallazgos
  nuevos.
- **Peor que ayer**: nada medible; es la mejor madrugada de la semana en
  horarios y sin incidentes de GitHub Actions.
