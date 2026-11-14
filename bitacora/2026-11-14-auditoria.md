# Auditoría matinal, 14-11-2026

ESTADO: CON OBSERVACIONES. HOY (ya estaba en PENDIENTES, no es hallazgo nuevo):
terminar de implementar esta noche el aviso de auditoría faltante en
`reintento.yml`, porque las rutinas de Claude volvieron a apagarse dos
mañanas seguidas (12 y 13-11-2026) y esta vez queda la causa confirmada: tope
de uso de la cuenta.

## Qué salió y a qué hora (14-11-2026, hora de Chile)

| Pieza | Hora real | Esperada (`bitacora/cronograma.json`) | Estado |
|---|---|---|---|
| Reloj del barrido | 01:40 | 01:30 | ok, +10 min |
| Barrido | corrió hasta 01:41 (`barrido.yml` run 226, éxito) | ~01:31 | ok, pero 15 de 22 fuentes devolvieron HTTP 503 (ver Calidad) |
| Preselección, vuelta 1 (CORREGIR → APROBADA) | 01:58 → 02:02 | ~01:35 en adelante | ok |
| Informe, vuelta 1 (CORREGIR → APROBADA) | 02:38 → 02:53 | (sin hora propia, sigue a la preselección) | ok |
| Guion del informe, vuelta 1 (CORREGIR → APROBADA) | 02:55 → 03:09 | (sin hora propia, sigue al informe) | ok |
| Revisión (compuerta, VEREDICTO APROBADA) | 03:10 | ~02:50 | +20 min, al borde del margen; se explica por las tres vueltas de corrección, no por un atraso de reloj |
| Edición diaria (render Short, carátulas, YouTube, podcast, web) | dispara 03:10:13, termina 03:12:47 (2m34s) | compuerta | éxito; corta porque el informe en video sigue apagado desde el 04-11 (`contenido/estado/sin-video-informe.txt`), solo produce Short + podcast |
| Reloj de métricas | 05:04 | 05:00 | ok |
| Auditoría matinal (esta) | 05:33 | 05:30 | ok |
| Clave (no hay turno diario, a juicio editorial) | sin entrega ni guion hoy | cuando corresponda | sin novedad: la Clave en curso (`codelco-produccion-inflada`) tiene fecha de producción 18-11-2026, no hoy |

Corrida verificada con `mcp__github__actions_list` (runs de `barrido.yml`,
`edicion-diaria.yml` y `web.yml` del 14-11, todos `conclusion: success`) y con
`git show -s --format=%cI` sobre los commits de la cadena (preselección,
informe, guion, veredictos y revisión), no de memoria.

## Calidad de lo que salió

- `node scripts/validar-tarjetas.js --fecha 2026-11-14`: sin avisos. "tarjetas
  de 2026-11-14.md (4 bloques con fuente, 499 palabras narradas, ~3.7 min):
  cifra: 3 · esquema: 2. variedad OK: ninguna cuota rota, ninguna marca
  malformada."
- Duración real contra la promesa (3 a 4 minutos, `prompts/guion-informe.md`):
  `contenido/podcast/episodios.json`, episodio de hoy, `durSeg: 241` = 4:01,
  un segundo sobre el techo informal. Dentro de la banda reciente (206 a 247 s
  del 09 al 13-11). No es hallazgo.
- Ninguna marca `PENDIENTE DE CIERRE` vencida: `contenido/informes/2026-11-14.md`
  no trae ninguna (grep vacío), igual que el de ayer.
- El barrido de hoy perdió 15 de 22 fuentes (HTTP 503, incluidas las 14
  consultas de Google News y la portada): lo dice la propia revisión
  (`contenido/revisiones/2026-11-14.md`). La cadena se sostuvo igual, en una
  sola vuelta de corrección cada pieza, pero casi todos los diez hallazgos de
  hoy (seis fuentes institucionales sin abrir, una cifra de un solo medio, una
  nota de Ex-Ante fuera de la olla, una candidata de dudoso contenido de
  marca) son consecuencia de esa caída externa, no de las piezas. No hay
  antecedente en las auditorías de esta semana de una caída así de ancha de
  medios chilenos a la vez: queda para MIRAR si se repite.
- **Hallazgo que se repite sin cambiar, y van más de tres días (desde el
  16-10-2026, ya en `bitacora/PENDIENTES.md`):** las seis fuentes
  institucionales sin feed de `contenido/barrido/fuentes.json` (Contraloría,
  Banco Central, Cámara, Senado, Dirección Meteorológica y Ministerio
  Público) siguen sin entrar a la preselección. Hoy la propia revisión lo
  dice con una precisión que no tenía antes: "es una incompatibilidad entre
  dos prompts del repo, no un descuido de la pieza, y no se arregla
  reescribiéndola" (`contenido/revisiones/2026-11-14.md`). Es exactamente lo
  que `prompts/seleccion.md:59-62` pide ("Ábrelos tú") contra lo que
  `prompts/suplente.md:116` declara ("No navegas. Tu entorno no abre páginas
  de prensa"). Ver Propuestas.

## Los números (`bitacora/metricas/2026-11-14.md` contra el de ayer)

- Canal: 55 suscriptores (+0, igual que ayer salvo un +1 el 13-11), 25.308
  vistas sumadas por video (-277, por reordenamiento de videos entre público
  y privado durante la ventana de revisión, no por pérdida: los mismos
  videos con los mismos conteos de ayer siguen presentes hoy, verificado
  línea por línea para los dos casos con dos versiones del mismo título).
  235 subidos, 227 públicos.
- El Short de hoy ("Camioneros siguen movilizados y el Gobierno anuncia
  fuerza...") está `private` con 0 vistas: es la subida programada de la
  ventana de revisión de Santiago (regla 19), no una falla; el paso "7 ·
  Subir a YouTube" del run de Edición diaria terminó en éxito en 12 segundos.
  El Short de ayer (13-11) ya está público con 194 vistas (+65 desde que se
  publicó), dentro del rango reciente.
- Sin novedad de fondo en el ritmo de suscriptores (53 el 09-11 a 55 hoy, +2
  en cinco días): ni acelera ni retrocede, sigue el mismo goteo de las
  últimas semanas.

## Qué falló

1. **Las rutinas de Claude (auditoría matinal, mejora diaria y, el 12-11,
   seguimiento de temas) no corrieron durante dos mañanas, 12 y 13-11-2026,
   y nadie lo registró hasta ahora.** Evidencia, verificada listando la
   carpeta y no de memoria: `bitacora/` no tiene `2026-11-12-auditoria.md` ni
   `2026-11-13-auditoria.md` (el listado salta de `2026-11-11-auditoria.md` a
   hoy); `bitacora/mejoras/` no tiene `2026-11-12.md` ni `2026-11-13.md`
   (salta de `2026-11-11.md` a hoy); no existe `bitacora/2026-11-12.md` ni
   `bitacora/2026-11-13.md`; y el commit de seguimiento del 13-11 lo dice
   él mismo: "No hubo seguimiento el 12-11-2026 pese a que esa edición quedó
   aprobada". La cadena de producción (GPT + validador) sí corrió completa
   los dos días: `contenido/preseleccion/`, `contenido/informes/`,
   `contenido/guiones/informe/`, `contenido/veredictos/` y
   `bitacora/metricas/` tienen sus archivos de 2026-11-12 y 2026-11-13. Causa
   confirmada, no conjeturada: el `last_run` de la rutina "Mejora diaria"
   (`trig_012bFrH9XnJMjV74uHxVYz8c`) quedó en
   `ROUTINE_RUN_STATUS_FAILED` / `ROUTINE_RUN_FAILURE_REASON_USAGE_LIMIT_REACHED`
   el 13-11-2026 a las 07:31 de Chile. Esto ya pasó antes (22 y 24-10-2026,
   `bitacora/PENDIENTES.md` línea 389) y la propuesta de esa vez
   (que `reintento.yml` avise si `bitacora/<FECHA>-auditoria.md` no existe a
   las 05:50 de Chile) nunca se implementó: verificado hoy, `reintento.yml`
   no tiene ninguna mención a "auditoria" ni al chequeo propuesto.
2. **El render automático de la Clave en curso quedó sin reintentos antes de
   que llegue su fecha de producción.** `contenido/estado/ultimo-render-clave-codelco-produccion-inflada.txt`
   dice `2026-11-18 3 1794635803`: ya gastó sus tres intentos (commits
   `cc798a1` intento 3, 05:56 UTC de hoy, y uno anterior a las 00:55 UTC)
   porque `.github/workflows/estado-clave.yml:234-251` dispara el render de
   cualquier Clave en etapa `aprobada` cada vez que pasan tres horas, sin
   mirar si su fecha de producción (`FECHAP`, aquí 18-11-2026, cuatro días
   adelante) ya llegó. Los tres intentos fallaron igual, con el mismo error
   esperado: "ERROR: no existe contenido/guiones/informe/2026-11-18.md - no
   hay nada que renderizar" (log del run 43563922897). Como el contador
   `M_INT` solo se resetea cuando `M_FECHA` cambia (línea 244) y `FECHAP`
   sigue siendo 18-11-2026 durante los próximos cuatro días, el flujo se
   queda sin ningún reintento disponible y, cuando el guion del 18-11 por fin
   exista, nada en el código va a disparar el render solo: se va a necesitar
   mirarlo a mano, justo lo que la marca de 16-10 que arregló este mecanismo
   (`bitacora/REALIZADOS.md`, entrada sin fecha sobre el gate rechazado de
   esa semana) quería evitar.

## Propuestas

1. **Implementar de una vez el aviso ya propuesto el 25-10-2026**, en
   `.github/workflows/reintento.yml`, junto al paso de la línea 70: agregar
   un paso que a las 08:50 UTC (05:50 de Chile) revise si
   `bitacora/<FECHA>-auditoria.md` existe para la fecha de hoy en Chile, y si
   no, escriba `contenido/estado/alerta-auditoria-faltante.txt` y lo pushee.
   No depende de que otra rutina de Claude esté viva para avisar, porque
   `reintento.yml` corre por cron nativo de GitHub.
2. **En `.github/workflows/estado-clave.yml`, línea 234**, cambiar
   `if [ "$ETAPA" = "aprobada" ] && [ -n "$FECHAP" ]; then` por una condición
   que además exija `[ "$FECHAP" \< "$(TZ=America/Santiago date +%F)" -o
   "$FECHAP" = "$(TZ=America/Santiago date +%F)" ]`, para que el contador de
   intentos solo corra desde el día de producción, no desde el día en que se
   aprueba la pauta. De paso, resetear a mano
   `contenido/estado/ultimo-render-clave-codelco-produccion-inflada.txt`
   (o borrarlo) para que la Clave de Codelco llegue al 18-11 con sus tres
   intentos intactos.
3. **En `prompts/seleccion.md`, punto 2 (línea 59-62)**, dejar de pedirle a
   quien escriba la preselección que abra las seis fuentes institucionales
   sin feed cuando sea el suplente (que no navega, `prompts/suplente.md:116`)
   quien tenga el turno: o se marca esa fuente como "(sin cobertura
   institucional, suplente no navega)" en vez de intentarlo y fallar
   callado, o se construye el feed propio que `bitacora/PENDIENTES.md`
   (entrada del 16-10) ya propone. Mientras no se elija una de las dos, cada
   revisión va a seguir encontrando lo mismo.

## Triage

- **HOY** (ya en PENDIENTES desde el 23-10, línea 389; esta auditoría solo
  confirma causa y agrega recurrencia): implementar el aviso de
  `reintento.yml` (propuesta 1). Es la tercera vez que el sistema pierde su
  capa de autovigilancia sin que nada lo avise, y esta vez se perdieron dos
  mañanas, no una.
- **AGUANTA**: el reseteo de los reintentos de la Clave de Codelco
  (propuesta 2). No rompe la edición de mañana ni pierde datos hoy, pero si
  no se corrige antes del 18-11-2026 el render de esa Clave no va a
  dispararse solo.
- **AGUANTA** (ya en PENDIENTES desde el 16-10, línea 488; esta auditoría
  agrega el diagnóstico más preciso de hoy): las seis fuentes institucionales
  sin feed (propuesta 3).
- **MIRAR**: la caída de 15 de 22 fuentes del barrido de hoy. Sin
  antecedente esta semana; si se repite dos mañanas más, deja de ser ruido
  externo y pasa a ser un hallazgo de código (reintentos, espejos, timeout).

## Comparación con ayer (13-11-2026)

- **Igual que ayer**: cada pieza (preselección, informe, guion) se aprobó en
  una sola vuelta de corrección; ninguna de las dos cadenas tuvo un rechazo
  de fondo. Las seis fuentes institucionales sin feed faltaron los dos días
  (ver AGUANTA de arriba).
- **Nuevo hoy**: la caída ancha del barrido (15 de 22 fuentes, incluida toda
  Google News), que ayer no aparece mencionada en
  `contenido/revisiones/2026-11-13.md`; y el diagnóstico de la revisión de
  hoy sobre las fuentes institucionales, que por primera vez nombra la causa
  exacta (incompatibilidad entre dos prompts) en vez de solo repetir el
  síntoma.
- **Lo que esta auditoría agrega que ayer no se pudo decir** (porque ayer no
  hubo auditoría): que el apagón de rutinas de Claude del 12 y 13-11 tuvo
  causa confirmada (tope de uso), y que la Clave de Codelco ya gastó sus tres
  reintentos de render antes de que llegue su fecha.
