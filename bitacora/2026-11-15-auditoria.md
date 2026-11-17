# Auditoría matinal, 15-11-2026

ESTADO: CON OBSERVACIONES. No hay HOY nuevo: el atraso de hoy es la sexta
aparición de una falla ya escalada a Santiago desde el 16-10-2026
(`bitacora/PENDIENTES.md`, sección DEPENDEN DE SANTIAGO) y esta auditoría
solo confirma la recurrencia y la agrega a esa misma entrada.

## Qué salió y a qué hora (15-11-2026, hora de Chile)

| Pieza | Hora real | Esperada (`bitacora/cronograma.json` / `contenido/estado/2026-11-15.md`) | Estado |
|---|---|---|---|
| Reloj del barrido | disparó 01:39:48, **falló** (`ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`) | 01:30 | falló por cuota, ver Qué falló |
| Barrido | corrió recién a las 04:51:53 (Actions run `43691837105`, éxito), disparado por el commit `e4a3351` "reintento: despertador 04:51 [reloj]" | ~01:31 | +3h21min sobre el cron |
| Preselección, vuelta 0 → CORREGIR vuelta 1 → APROBADA vuelta 1 | escrita 05:12 (`a313886`), corregida y reaprobada 05:28 (`4fb110a`) | ~02:10 en adelante | +3h18min, una sola vuelta de corrección, calidad normal |
| Informe | no escrito a la hora de esta auditoría (05:33) | ~02:40 (sigue a la preselección) | en curso, `contenido/estado/2026-11-15.md` lo marca "falta", +168 min según esa vista |
| Guion del informe | no escrito a la hora de esta auditoría | ~03:10 | en curso, "falta", +138 min |
| Revisión (compuerta) | no escrita a la hora de esta auditoría | ~02:50 | en curso, "falta", +118 min |
| Edición diaria (Short, podcast, web) | no disparada (espera la compuerta) | ~02:50 | en curso, "falta", +13 min sobre su propia espera |
| Reloj de métricas → Métricas | despertador 08:04 UTC (05:04 Chile), Actions corrió a tiempo | 05:00 | ok |
| Auditoría matinal (esta) | 05:33 | 05:30 | ok, a tiempo pese al atraso de todo lo anterior |
| Clave (no hay turno diario, a juicio editorial) | sin entrega ni guion hoy | cuando corresponda | sin novedad: la Clave en curso (`codelco-produccion-inflada`) sigue con fecha de producción 18-11-2026 |

Corrida verificada con `mcp__github__actions_list` (runs `43691837105` de
Barrido), `get_trigger` sobre `trig_01W5KEjHbr5wWPsmmJ4ygNEh` (Reloj del
barrido) y sobre los tres relojes de reintento, `git log` de los commits de
la cadena y `contenido/estado/2026-11-15.md` (la vista que calcula
`scripts/estado.js`), no de memoria. Esta auditoría corre en el punto exacto
en que `contenido/estado/2026-11-15.md` queda: preselección aprobada, el
resto de la cadena diaria todavía sin escribir, así que los puntos de
Calidad y Números que dependen del informe, el guion o la revisión de hoy no
se pueden evaluar todavía y se dice así, en vez de inventarlos.

## Calidad de lo que salió

- `node scripts/validar-tarjetas.js --fecha 2026-11-15`: no corresponde
  todavía, `contenido/informes/2026-11-15.md` no existe (verificado listando
  `contenido/informes/`: el archivo más reciente es `2026-11-14.md`).
- `contenido/revisiones/2026-11-15.md` tampoco existe (verificado listando
  `contenido/revisiones/`: el más reciente es `2026-11-14.md`), así que no
  hay hallazgos de hoy que comparar contra los tres días anteriores.
- Duración real del informe de hoy: no se puede calcular, `contenido/podcast/episodios.json`
  no tiene ningún episodio con fecha 2026-11-15 (verificado, 0 coincidencias).
  No se estima por palabras.
- El barrido de hoy sí se completó entero una vez que corrió: "125 noticias
  con señal, de 434 únicas recogidas en 22 fuentes" (`contenido/barrido/2026-11-15.md`,
  línea 3). La caída de 15 de 22 fuentes del 14-11 no se repitió: queda sin
  confirmarse como tendencia, era ruido de un día.
- El veredicto de preselección (`contenido/veredictos/2026-11-15-preseleccion.md`)
  deja, otra vez, las seis fuentes institucionales sin feed (Contraloría,
  Banco Central, Cámara, Senado, Dirección Meteorológica, Ministerio
  Público) para que las abra el informe: es el mismo hallazgo de siempre,
  ya en `bitacora/PENDIENTES.md` desde el 16-10 (AGUANTA), no se repite acá.
- Ninguna marca `PENDIENTE DE CIERRE` que revisar: no hay informe de hoy
  todavía.

## Los números (`bitacora/metricas/2026-11-15.md` contra el de ayer)

- Canal: 58 suscriptores (+2, el mejor salto de la semana, venía de +0/+1
  los últimos días), 25.995 vistas sumadas por video (+653), 237 subidos,
  229 públicos.
- El salto de vistas lo explica casi solo el Short "Camioneros siguen
  movilizados y el Gobierno anuncia fuerza..." (292 vistas, +268 desde ayer,
  quedó público ayer tras la ventana de revisión): es el Short, no un
  cambio de fondo en el resto del catálogo.
- El video "Cómo Codelco registra su producción y quién la controla" está
  `private` con 0 vistas: es una Clave recién subida, en la ventana de
  revisión de Santiago (regla 19), no una falla.
- Short del día (15-11): todavía no existe, porque la Edición diaria no ha
  corrido (depende de la compuerta, que depende del informe y el guion de
  hoy). A las 05:33 no es un hallazgo: el Short publica por defecto a las
  12:00 y la cadena, aunque atrasada 3 horas, históricamente termina sola
  bastante antes de esa hora (precedente del 06-11: atraso de 67 min en el
  barrido, Edición diaria igual cerró con video listo a las 03:37).

## Qué falló

1. **El Reloj del barrido (`trig_01W5KEjHbr5wWPsmmJ4ygNEh`, 01:30 Chile)
   falló por cuota agotada**, verificado directo con `get_trigger`:
   `last_run.status: ROUTINE_RUN_STATUS_FAILED`,
   `failure_reason: ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`, disparo
   a las 04:39:48 UTC (01:39:48 Chile). El barrido real no corrió hasta las
   04:51:53 Chile (Actions run `43691837105`), levantado por uno de los tres
   relojes de reintento (A/B/C, cada 20 minutos). El `git log` no tiene
   ningún commit `reintento: despertador HH:MM [reloj]` entre las 01:10
   Chile (primer disparo esperado de los tres relojes) y las 04:51 Chile, y
   `get_trigger` sobre el Reloj B (`trig_01E8tyJPqyfNdVTog477sf6Z`) confirma
   al menos un intento FALLIDO dentro de esa misma ventana, a las 04:36:34
   Chile, con el mismo `ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`: más
   de tres horas en las que, a juzgar por el log de commits, los tres
   relojes de reintento tampoco lograron pushear, no solo el reloj del
   barrido. Arrastró a toda la cadena (preselección, y detrás, informe,
   guion y revisión, todavía sin escribir a las 05:33), pero ninguna pieza
   perdió calidad por eso hasta ahora: la preselección se aprobó en una sola
   vuelta de corrección, igual que en los atrasos anteriores. Es la **sexta
   vez documentada** que la cuota de Claude frena un reloj de la madrugada
   (14 y 15-10, 05-11, 06-11 y hoy); sigue escalado a Santiago desde el
   16-10 en `bitacora/PENDIENTES.md`, sección DEPENDEN DE SANTIAGO, con la
   propuesta ya escrita (workflow de GitHub Actions con cron propio, ajeno a
   la cuota de Claude, que abra un issue si a una hora fija no existe el
   video del día) todavía sin el sí de Santiago.

Sin otras fallas nuevas hoy.

## Propuestas

1. Para la falla 1: ninguna propuesta nueva, la que existe sigue esperando
   el sí de Santiago (`bitacora/PENDIENTES.md`, sección DEPENDEN DE
   SANTIAGO, entrada del 16-10).

## Triage

- **HOY**: ninguno nuevo. La falla 1 ya está en PENDIENTES desde el 16-10 y
  depende de una decisión de Santiago, no de código que esta sesión pueda
  tocar; esta auditoría solo le agrega la sexta ocurrencia.
- **AGUANTA**: ninguna nueva hoy. Siguen sin tocarse, sin cambios desde el
  14-11, el reseteo de los reintentos de render de la Clave de Codelco
  (`contenido/estado/ultimo-render-clave-codelco-produccion-inflada.txt`
  sigue en "2026-11-18 3 1794635803", y `.github/workflows/estado-clave.yml:234`
  sigue sin la condición de fecha de producción) y las seis fuentes
  institucionales sin feed.
- **MIRAR**: ninguno nuevo. La caída de 15 de 22 fuentes del barrido del
  14-11 no se repitió hoy (22 de 22), así que no pasa a hallazgo de código.

## Comparación con ayer (14-11-2026)

- **Igual que ayer**: la Clave de Codelco sigue con sus tres reintentos de
  render gastados y sin la corrección de `estado-clave.yml:234`; las seis
  fuentes institucionales siguen sin feed propio.
- **Peor que ayer**: ayer la cadena corrió a tiempo de punta a punta
  (barrido 01:41, preselección-informe-guion-revisión cerrados a las 03:10,
  Edición diaria lista a las 03:12). Hoy el mismo mecanismo de cuota que
  calló dos mañanas completas el 12 y el 13-11 volvió a aparecer, esta vez
  solo retrasando la madrugada (3h18min hasta la preselección) en vez de
  perder el día: a las 05:33 todavía falta informe, guion, revisión y
  Edición diaria.
- **Nuevo hoy**: nada de fondo. El salto de +2 suscriptores y +653 vistas es
  ruido bueno de un Short que pegó, no una tendencia confirmada.
