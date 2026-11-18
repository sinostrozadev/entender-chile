# Auditoría matinal, 11-11-2026

Auditada el 11-11-2026 entre las 08:39 y las 09:15 UTC (05:39 a 06:15 de
Chile), con el checkout sincronizado contra `origin/main` (`b7556f2`,
"reintento: despertador 05:12 [reloj]").

ESTADO: CON OBSERVACIONES. Nada se rompió ni se publicó con un defecto
visible: la cadena completa, el Short y la subida a YouTube terminaron bien.
Lo nuevo es que GPT no tomó el turno del guion y el plan B tuvo que
escribirlo (se autocorrigió solo); lo que sigue es que varios avisos del
repo (no de las piezas) llevan dos o tres días seguidos sin que nadie los
toque. Sin `HOY`.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Hora esperada (panel) | Resultado | Evidencia |
|---|---|---|---|---|
| Reloj del barrido + Barrido | 01:40:25 | 01:30 | éxito, 10 min tarde | Actions "Barrido" run `42960754416`, `conclusion: success` |
| Preselección (siempre del suplente desde el 06-10) | redactada 01:51:04, CORREGIR vuelta 1 (01:56:01), reparada por el suplente 01:58:43, APROBADA vuelta 1 02:01:39 | 02:10 | éxito, 8 min antes | `contenido/veredictos/2026-11-11-preseleccion.md` |
| Informe | redactado 02:07:59 (GPT), CORREGIR vuelta 1 (02:19:25, cuatro correcciones), reparado 02:21:16, APROBADA vuelta 1 02:25:00 | 02:40 | éxito, 15 min antes | `contenido/veredictos/2026-11-11-informe.md` |
| Guion del informe | GPT no tomó el turno `informe_listo`; plan B activado 03:18:24 tras 26 min sin respuesta pese a dos avisos; lo escribió el suplente, redactado 03:30:04, APROBADA vuelta 0 03:38:03 | 03:10 | éxito, pero 20 min 4 s tarde (hallazgo, ver abajo) | `contenido/estado/plan-b.txt`, `contenido/veredictos/2026-11-11-guion_informe.md` |
| Revisión (compuerta) | 03:40:14, APROBADA | 03:30 | éxito, 10 min tarde | `contenido/revisiones/2026-11-11.md` |
| Edición diaria (render, voz, Short, descripciones, podcast, subida programada) | corrió dos veces (push del guion 03:30:08 y push de la revisión 03:40:18), `videos_listos` 03:42:58 | ~05:15 (cuadro del panel) | éxito, bien antes | Actions "Edición diaria" runs `42972855937` y `42974058231`, ambos `conclusion: success`; `contenido/estado/2026-11-11.md` ("FALTA: nada, el día está completo") |
| Web | con cada push relevante | continuo | éxito | Actions "Web", todos `conclusion: success` |
| Reloj de métricas + Métricas | despertador 05:05, métricas 05:05:11→05:05:53 | 05:00 | éxito, 5 min tarde | Actions "Métricas", `conclusion: success`; `bitacora/metricas/2026-11-11.md` |
| Vigía de la cadena | sin aviso al teléfono (la cadena nunca quedó en `bloqueado_humano`) | 02:15 y 05:15 | sin novedad | `contenido/estado/2026-11-11.md` |
| Clave | no corresponde hoy (sin calendario, a juicio editorial, regla 14); no hay archivo con fecha 2026-11-11 en `contenido/claves/`, `contenido/guiones/claves/` ni `contenido/veredictos/clave-*` | cuando corresponda | sin novedad, no es hallazgo | listado de las tres carpetas |
| Short del día | subido `private` ("Los camioneros mantienen el paro y la fruta espera su viaje,"), pendiente de su hora de publicación (12:00) | 12:00 | pendiente de evaluar (hora de la auditoría es 05:39, antes del mediodía) | `bitacora/metricas/2026-11-11.md` |

Duración real del informe (audio ya en el repo): 247 segundos (4:07),
`contenido/podcast/episodios.json`, episodio del 11-11-2026. Siete segundos
sobre el techo de 4 minutos de la promesa (3 a 4, desde el 12-10-2026), pero
no es nuevo: el 26-10 (247 s) y el 02-11 (248 s) ya tocaron el mismo margen
sin que nadie lo marcara como falla. No se abre hallazgo nuevo por esto.

## Qué falló

- **GPT no tomó el turno `informe_listo` y el plan B tuvo que escribir el
  guion del informe, por primera vez en semanas.** `contenido/estado/plan-b.txt`:
  "motivo: GPT no respondio el turno informe_listo (vuelta 0) en 26 min tras
  dos avisos, activado: 2026-11-11T06:18:24Z por reintento.yml". Es la
  primera activación de plan B que aparece en el historial de commits desde
  al menos mediados de octubre (`git log --all --grep="plan B activado"` no
  trae otra). El mecanismo funcionó exactamente como está diseñado
  (`estrategia/decisiones.md:811`, "existe el plan B...vence al día
  siguiente"): el suplente (Claude) escribió el guion, citó correctamente
  por qué no lleva líneas de carátula (la decisión del 04-11), repartió bien
  las tres noticias y midió palabras y caracteres antes de commitear
  (`git log -1 --format=%B` del commit "edición 2026-11-11: guion informe").
  No hay defecto publicado ni dato perdido. El único costo medible es que el
  guion llegó a las 03:30:04, 20 minutos y 4 segundos después de las 03:10
  del panel, pasando por 4 segundos el umbral de "más de 20 minutos" de esta
  auditoría.
- **Repite por tercer día el aviso contradictorio de "Carátula sugerida".**
  `contenido/revisiones/2026-11-11.md`: "van tres días: validar-tarjetas.js
  sigue avisando por la falta de Carátula sugerida aunque el propio prompt
  diga que desde el 04-11-2026 no se pide carátula del día." Verificado
  directo: `contenido/guiones/informe/2026-11-09.md`, `2026-11-10.md` y
  `2026-11-11.md` no tienen ninguna de las cuatro líneas (ni
  `Carátula sugerida:` ni `Clima de carátula:`); `2026-11-08.md` sí las
  tenía completas. `prompts/guion-informe.md` todavía exige esas cuatro
  líneas en su bloque "FORMATO DE SALIDA" (líneas 142 a 165) y solo doce
  líneas más abajo (línea 177) dice "Desde el 04-11-2026 no se pide carátula
  del día", una nota puesta DESPUÉS del bloque que contradice, no dentro de
  él. `scripts/validar-tarjetas.js:71` no conoce esa nota y avisa todos los
  días citando la regla vieja del 05-09-2026. Las dos auditorías anteriores
  (09 y 10-11) ya propusieron el arreglo exacto; sigue sin aplicarse.
- **Repite por tercera revisión seguida que "FUENTES CONSULTADAS" no trae un
  solo enlace.** `contenido/revisiones/2026-11-09.md`, `2026-11-10.md`
  ("segundo día con la misma anotación") y `2026-11-11.md` (ver hallazgo del
  caso "Interferencia") lo anotan los tres días. Verificado directo: ningún
  informe desde al menos el 15-10-2026 tiene un `http` dentro de su sección
  "FUENTES CONSULTADAS" (`contenido/informes/2026-10-15.md`,
  `2026-10-20.md`, `2026-10-25.md`, `2026-11-01.md`, `2026-11-05.md`,
  `2026-11-07.md`, `2026-11-08.md`: cero enlaces en todos). No es una
  regresión de estos tres días: es una característica del formato de
  semanas, y lo nuevo es que la revisión la repite tres mañanas seguidas sin
  que exista una propuesta concreta de qué hacer con ella (a diferencia del
  caso de la carátula, que sí tiene arreglo escrito). `prompts/informe.md`
  no exige enlaces en esa sección.
- **La frase que cierra el guion ("el informe completo está en el enlace de
  la descripción") sigue repitiéndose casi palabra por palabra.**
  `contenido/revisiones/2026-11-11.md`: "la frase del enlace salió palabra
  por palabra igual a la del 08-11-2026 (...) y las del 07, 09 y 10-11-2026
  son la misma con un inciso (...) es la tercera revisión seguida que la
  anota." `prompts/guion-informe.md:119` pide "con tus palabras y con
  variaciones entre días" sin dar un mecanismo para lograrlo, el mismo hueco
  que señaló la auditoría de ayer para la apertura (que hoy sí varió).
- **`bitacora/PENDIENTES.md` cita un archivo que no existe.** La entrada de
  "ninguna cifra llegó verificada desde la preselección" (línea 202 y
  siguientes) propone tocar `prompts/preseleccion.md`, repetido en las
  actualizaciones del 07, 08, 09 y 10-11-2026. Ese archivo no existe
  (`find . -iname "*preseleccion*"` solo encuentra
  `archivo/prompts/respaldo-preseleccion.md`, un archivo viejo). El prompt
  real de esta etapa es `prompts/seleccion.md` (así lo cita el propio
  veredicto de hoy: "PROMPT: prompts/seleccion.md"). Quien vaya a aplicar la
  propuesta de los últimos cuatro días va a buscar un archivo que no está.
- Sin novedad hoy sobre: "ninguna cifra llegó verificada desde la
  preselección" (la propia revisión y los veredictos de hoy no repiten la
  frase, primera pausa desde el 05-11-2026), pero la causa de fondo sigue
  intacta: `prompts/seleccion.md` sigue sin el campo de verificación por
  candidata que proponen las auditorías del 07 al 10-11. No se cierra, solo
  se anota que hoy no costó un defecto nuevo ni una mención nueva.
- Sin novedad hoy sobre las seis fuentes institucionales sin feed
  (Contraloría, Banco Central, Cámara, Senado, Dirección Meteorológica y
  Ministerio Público): `contenido/revisiones/2026-11-11.md` dice "otra vez
  sin abrir...y van dos días" (con el 10-11). Ya está en
  `bitacora/PENDIENTES.md` desde el 16-10-2026 como `AGUANTA` sin dueño; no
  se duplica.

## Propuestas

1. En `prompts/guion-informe.md`, borrar las líneas 142 a 165 (el bloque
   completo de "Tercera, cuarta y quinta líneas: TRES CARÁTULAS" y "Sexta
   línea: Clima de carátula") y dejar solo la nota de la línea 177,
   integrada donde antes estaba el bloque borrado. En
   `scripts/validar-tarjetas.js:67-78`, condicionar el aviso completo a que
   NO exista `contenido/estado/sin-video-informe.txt` (hoy ese archivo
   existe siempre desde el 04-11, así que el aviso se puede apagar sin
   condicional adicional). Arreglo de una sola sesión, ya escrito dos veces
   en las auditorías del 09 y 10-11.
2. Decidir, y escribirlo en `estrategia/decisiones.md`, si "FUENTES
   CONSULTADAS" debe traer enlaces cuando el barrido los tenga. Si la
   respuesta es sí: agregar en `prompts/informe.md`, cerca de la
   instrucción de esa sección, "cuando el barrido traiga la URL de la nota,
   cítala en la línea de la fuente". Si la respuesta es no (es una decisión
   legítima: las fuentes institucionales casi nunca tienen URL estable),
   que la revisión deje de repetirlo cada mañana sin motivo nuevo
   (`prompts/validador.md`, agregar que no se anote salvo que cambie algo).
3. En `bitacora/PENDIENTES.md:215, 223, 233, 242` (las cuatro menciones de
   "prompts/preseleccion.md"), corregir a "prompts/seleccion.md".
4. Darle al guionista un banco corto de cierres alternativos para la frase
   del enlace a la descripción, igual a la propuesta de ayer para la
   apertura (que hoy sí funcionó: la apertura varió). Archivo:
   `prompts/guion-informe.md`, cerca del punto 8 (línea 119).

## Triage

- `HOY`: ninguno.
- `AGUANTA`:
  - El aviso contradictorio de "Carátula sugerida" en el prompt y en el
    script, ya en su tercer día sin tocarse (propuesta 1).
  - "FUENTES CONSULTADAS" sin un solo enlace, repetido tres mañanas en la
    revisión sin que exista una decisión de fondo (propuesta 2).
  - La ruta inexistente `prompts/preseleccion.md` en `bitacora/PENDIENTES.md`
    (propuesta 3).
  - La frase de cierre del guion repitiéndose casi igual, tercera revisión
    seguida (propuesta 4).
  - Las seis fuentes institucionales sin feed, sin dueño desde el 16-10
    (ya en `bitacora/PENDIENTES.md`, continúa igual).
- `MIRAR`:
  - GPT no tomó un turno por primera vez en semanas. El plan B funcionó
    bien y sin costo real, pero si se repite en los próximos días conviene
    revisar si es la cuota de GPT agotándose otra vez cerca del turno 45
    (`estrategia/decisiones.md:796`), no un hecho aislado.
  - El guion llegó 20 minutos y 4 segundos tarde, justo sobre el umbral de
    esta auditoría; la causa ya está identificada (el punto anterior) y no
    amerita código nuevo todavía si no se repite.

## Comparación con ayer (10-11-2026)

- **Mejoró:** la apertura del guion salió de la fórmula "Es `<día>`
  `<fecha>` de dos mil veintiséis" que llevaba repitiéndose desde el
  08-11-2026 (`contenido/revisiones/2026-11-11.md`, "lo que mejoró"); el
  rótulo del alza del diésel ya no confunde un piso con un tope, el error
  exacto que marcó la auditoría de ayer; y la cadena se autocorrigió sola
  cuando GPT no respondió, sin que nadie tuviera que intervenir a mano.
- **Sigue igual:** el aviso contradictorio de "Carátula sugerida" (tercer
  día); la frase de cierre del guion repitiéndose (tercera/cuarta vez
  seguida); "FUENTES CONSULTADAS" sin enlaces (tercer día en la revisión);
  las seis fuentes institucionales sin feed (segundo día explícito, aunque
  pendiente desde el 16-10); todas las Actions en verde.
- **Es nuevo:** la primera activación de plan B medida en semanas (GPT no
  tomó el turno del guion); los suscriptores subieron a 54 (+1, contra +0
  ayer) y las vistas del día subieron a +535 (contra +116 ayer), empujadas
  por el Short de ayer ("Camioneros mantienen el paro...", +525 vistas
  desde que se hizo público); y el hallazgo de hoy sobre la ruta
  inexistente en `bitacora/PENDIENTES.md`.
