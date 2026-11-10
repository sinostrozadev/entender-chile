# Auditoría matinal, 10-11-2026

Auditada el 10-11-2026 entre las 08:33 y las 09:10 UTC (05:33 a 06:10 de
Chile), con el checkout sincronizado contra `origin/main` (`573f0515`,
"reintento: despertador 05:13 [reloj]").

ESTADO: CON OBSERVACIONES. Sin falla nueva ni dato perdido: la cadena
terminó bien, con menos vueltas de corrección que ayer. HOY (continúa):
"ninguna cifra llegó verificada desde la preselección" entra a su sexta
mañana seguida (de nuevo sin costar un defecto publicado, porque el informe
la atrapó).

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | despertador 01:40:20, barrido 01:40:48 | 01:30 (cron) | éxito, 10 min tarde | Actions "Barrido" run `42757344794`, `conclusion: success` |
| Preselección | redactada 01:49:38, APROBADA vuelta 0 01:55:22 | tras `barrido_listo` (01:41) | éxito, sin vueltas | `contenido/veredictos/2026-11-10-preseleccion.md` |
| Informe | redactado 02:46:11 (ver hallazgo de atraso), CORREGIR vuelta 1 (02:54:47, siete correcciones de cautela y fuentes), APROBADA 03:01:57 | tras cada pieza | éxito, una vuelta | `contenido/veredictos/2026-11-10-informe.md` |
| Guion del informe | redactado 03:04:44, APROBADA vuelta 0 03:11:52 | tras cada pieza | éxito, sin vueltas | `contenido/veredictos/2026-11-10-guion_informe.md` |
| Revisión (compuerta) | 03:13:02, APROBADA | tras cada pieza | éxito, pero 23 min sobre el cuadro (ver hallazgo) | `contenido/revisiones/2026-11-10.md` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | `videos_listos` 03:15:56 | ~02:50 (cuadro del panel) | éxito | Actions "Edición diaria" run `42767019133`, `conclusion: success`; `contenido/estado/2026-11-10.md` ("FALTA: nada") |
| Web | con cada push relevante | continuo | éxito | Actions "Web" runs, todos `conclusion: success` (último `42767301494`) |
| Reloj de métricas + Métricas | despertador 05:05:59, métricas 05:06:45 | 05:00 | éxito, 6 min tarde | Actions "Métricas" run `42780000599`, `conclusion: success`; `bitacora/metricas/2026-11-10.md` |
| Vigía de la cadena | sin aviso al teléfono | 02:15 y 05:15 | la de 05:15 corrió y cerró a las 05:16:55 Chile, `ROUTINE_RUN_STATUS_SUCCEEDED` | `trig_01LUtn4fSJjBsCzqdoWeVviH` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14); no hay archivo con fecha 2026-11-10 en `contenido/claves/` ni `contenido/guiones/claves/` | cuando corresponda | sin novedad, no es hallazgo | listado de ambas carpetas |
| Short del día | subido `private` ("Camioneros mantienen el paro..."), pendiente de su hora de publicación | 12:00 | pendiente de evaluar (hora de la auditoría es 05:33, antes del mediodía) | `bitacora/metricas/2026-11-10.md` |

Duración real del informe (audio ya en el repo): 206 segundos (3:26), dentro
de la promesa de 3 a 4 minutos. `contenido/podcast/episodios.json`, episodio
del 10-11-2026.

## Qué falló

- **El despachador GPT se demoró 45 minutos en empezar el informe de hoy
  porque atendió primero un pedido de imagen de OTRO canal de Santiago.**
  La preselección quedó lista (`preseleccion_lista`) a las 01:55:37 Chile; el
  primer push del informe no llegó hasta las 02:46:11, con el commit
  `edición 2026-11-10: imagen externa` (02:41:07) escribiendo
  `contenido/caratulas/externos/cepillo-activo/2026-11-09-capitan-cepillo-poses.png`
  cinco minutos antes, en el medio del hueco. Es el mecanismo documentado en
  `contenido/caratulas/externos/README.md` (pedidos de otros canales que
  atiende el mismo GPT), funcionando como está diseñado, pero hoy es la
  primera vez que se mide su costo sobre la cadena principal: empujó la
  compuerta (revisión aprobada) a las 03:13:02, 23 minutos sobre el `~02:50`
  del cuadro del panel, el primer atraso de la cadena que supera el umbral de
  20 minutos en varios días. La cadena no se rompió (todo terminó con
  éxito) y nadie necesitó reintentar nada, así que no es `HOY`.
- **La apertura y el cierre del guion llevan repitiendo la misma fórmula
  varios días, violando la regla de ORIGINALIDAD del propio prompt.** El
  validador lo dice en `contenido/veredictos/2026-11-10-guion_informe.md`:
  la apertura usa "Es `<día>` `<fecha>` de dos mil veintiséis" más un
  conector de repaso por tercer día seguido (08, 09 y 10-11-2026, solo
  cambia el conector), y la frase del enlace a la descripción sale idéntica
  palabra por palabra el 06, 07, 09 y 10-11-2026. `prompts/guion-informe.md:42`
  pide explícitamente "Evita aperturas, transiciones, estructuras de frase o
  cierres idénticos día tras día", y el punto 8 (línea 119) pide la frase
  del enlace "con tus palabras y con variaciones entre días". Ninguna de las
  dos repeticiones bloqueó un veredicto porque el prompt no da una regla
  mecánica para medirlas, solo la general.
- **Repite por segundo día el aviso contradictorio de "Carátula sugerida".**
  `contenido/revisiones/2026-11-10.md` y el veredicto del guion anotan que
  `node scripts/validar-tarjetas.js` sigue avisando por la falta de esa
  línea citando una regla del 05-09-2026 que la decisión del 04-11-2026
  dejó sin efecto, y que `prompts/guion-informe.md` todavía lista esas
  cuatro líneas en FORMATO DE SALIDA (líneas 137 a 139) aunque la línea 167
  del mismo archivo diga "Desde el 04-11-2026 no se pide carátula del día".
  Ya apareció el 09-11-2026 con la misma explicación.

Sin fallas nuevas más allá de estas tres: todas las Actions corrieron en
verde, los tres veredictos aprobaron, y el Short, aunque todavía privado, es
lo esperable a esta hora.

## Propuestas

1. **Si el pedido de otro canal puede esperar, que espere a después de la
   compuerta.** En el workflow o en el prompt del despachador, antes de
   atender un `contenido/urgente/PEDIDO-<canal>-<slug>.md`, comprobar si
   `contenido/estado/FECHA.md` todavía no llegó a `aprobada`; si no llegó,
   dejar el pedido para después de la compuerta de hoy. Archivo a tocar:
   el prompt del despachador que lee `contenido/urgente/` (no está en este
   repo si vive del lado de GPT; si vive acá, es el que cita
   `prompts/imagen-caratula.md`, sección "Pedidos externos").
2. **En `prompts/guion-informe.md`, borrar las líneas 137 a 139** (los
   tres ejemplos de "Carátula sugerida/2/3" del bloque FORMATO DE SALIDA)
   y, **en `scripts/validar-tarjetas.js`, condicionar el aviso de las
   líneas 67 a 78** a que NO exista `contenido/estado/sin-video-informe.txt`
   (hoy el archivo existe siempre, así que el aviso no se apaga nunca).
3. **Darle al despachador un banco corto de aperturas y cierres alternativos
   en `prompts/guion-informe.md`**, cerca de la línea 42 (ORIGINALIDAD), o
   pedirle explícitamente que lea la apertura y el cierre del guion de AYER
   antes de escribir el de hoy y cambie la estructura si coincide. Hoy el
   prompt solo dice "evita... idénticos día tras día" sin mecanismo para
   cumplirlo.

## Triage

- `HOY` (continúa, no es nuevo de hoy): "ninguna cifra llegó verificada
  desde la preselección" entra a su sexta mañana seguida. Ya está en
  `bitacora/PENDIENTES.md`, sección "Para la sesión de la noche", marcada
  por primera vez el 07-11-2026 y actualizada cada mañana desde entonces.
  Se agrega la línea de hoy en el mismo commit de esta auditoría.
- `AGUANTA`:
  - El despachador compartido retrasa la cadena cuando atiende pedidos de
    otros canales (propuesta 1).
  - La apertura y el cierre del guion repiten fórmula día tras día
    (propuesta 3).
  - El aviso contradictorio de "Carátula sugerida" en el prompt y en el
    script (propuesta 2).
- `MIRAR`:
  - La clasificación "Sin área" del barrido sigue dejando noticias de peso
    sin área propia (43 de 147 hoy) y la preselección las reubica a mano
    todos los días; no empeoró hoy, pero lleva así varias semanas.
  - El atraso de 23 minutos en la compuerta de hoy: si el pedido de otro
    canal vuelve a coincidir con la ventana de la madrugada, conviene ver
    si se repite antes de proponer código nuevo.

## Comparación con ayer (09-11-2026)

- **Mejoró:** el informe necesitó una sola vuelta de corrección hoy, contra
  dos ayer; el guion no necesitó ninguna, contra una ayer. La cadena total
  (barrido a compuerta) salió con menos trabajo de reparación.
- **Sigue igual:** todas las Actions en verde; "FUENTES CONSULTADAS" sigue
  sin un solo enlace (ya anotado el 09 y el 10); el Short del día sigue
  subiendo privado hasta su hora de las 12:00; los suscriptores no se
  movieron hoy (53, +0) después de subir +2 y +3 los dos días previos.
- **Es nuevo:** el atraso de 45 minutos del despachador por un pedido de
  otro canal, medido por primera vez con su causa exacta en vez de
  inferida; la apertura del guion cruzó el umbral de tres días seguidos con
  la misma fórmula, que es el punto en que esta auditoría empieza a
  contarlo como patrón y no como coincidencia.
