ESTADO: CON FALLAS — la cadena de la madrugada corrió completa y a tiempo, sin bloqueos de infraestructura (a diferencia de ayer), pero el guion ya aprobado del informe (video sube a las 07:30 de Chile, dentro de ~2 horas) atribuye a la DMC oficial una cifra de +200 mm que en realidad viene de modelos privados, y llama "reforma migratoria" a la reforma constitucional de detención por expulsión administrativa. HOY: decidir antes de las 07:30 si se interviene el video ya renderizado, y bajar a la sesión de la noche dos ajustes de prompt para dos hallazgos que llevan 3+ días repitiéndose sin corregirse ni quedar anotados.

Auditada el 23-09-2026 desde las 05:30 de Chile, checkout sincronizado contra `origin/main` (`0acd512`, "métricas 2026-09-23 [bot]"). Horas reales de `git log` con `TZ=America/Santiago` fijado explícitamente (el contenedor corre en UTC; sin fijar el TZ las horas salían 3 h adelantadas) y de `mcp__github__actions_list` sobre los workflows del día. El checkout de esta sesión es un clon superficial (`git rev-parse --is-shallow-repository` → `true`): alcanza para todo lo de hoy, pero no para pedir horas de archivos de días anteriores por `git log`, así que la comparación con ayer usa el contenido de los archivos, no sus horas de commit.

## Qué salió y a qué hora

| Pieza | Hora real (Chile) | Esperada (cuadro) | Estado |
|---|---|---|---|
| Reloj del barrido | 01:40 | 01:30 | ok (+10 min) |
| Barrido | 01:41 | ~01:31 | ok |
| Preselección: v0 01:47 → CORREGIR v1 01:51 → v1 01:52 → APROBADA 01:54 | — | ~01:35 en adelante | ok, 1 vuelta |
| Informe: v0 02:06 → CORREGIR v1 02:12 → v1 02:15 → APROBADA 02:17 | — | tras preselección | ok, 1 vuelta |
| Guion del informe: v0 02:27 → CORREGIR v1 02:34 → v1 02:37 → APROBADA 02:40 | — | tras informe | ok, 1 vuelta |
| Revisión (veredicto final, compuerta) | 02:40 | tras guion | ok, APROBADA vuelta 1 |
| Edición diaria (render, voz, subida programada) | dispara 02:40, termina 03:09 (29 min) | ~04:00 en el cuadro, en la práctica arranca con la compuerta | ok, dentro del rango histórico (~28 min) |
| Banco de temas de la Clave | 02:42 | tras el día aprobado | ok, 4 conceptos agregados |
| Métricas | 05:15 | 05:00 | ok (+15 min, bajo el umbral de 20) |

No hubo Clave hoy: listado `contenido/claves/` y `contenido/guiones/claves/`, sin entradas del 23-09 (corresponde, CLAVE 4 no es diaria). Todos los workflows de GitHub Actions del día (`Barrido`, `Estado del día`, `Edición diaria`, `Web`, `Métricas`, `Estado de la Clave`) terminaron `completed`/`success`, sin reintentos ni fallas de infraestructura.

`node scripts/validar-tarjetas.js --fecha 2026-09-23`: `tarjetas de 2026-09-23.md (12 bloques con fuente): cifra: 4 · cita: 3 · comparacion: 2 · barras: 1 · esquema: 1` — `variedad OK: ninguna cuota rota, ninguna marca malformada.`

Duración real (`contenido/podcast/episodios.json`, campo `durSeg` del informe de hoy): **613 s = 10,2 min**, dentro de "~10 min, 12-13 en día cargado". Sin `PENDIENTE DE CIERRE` en `contenido/informes/2026-09-23.md` (verificado con grep sobre el archivo completo, sin resultados).

## Qué falló

**1. La tarjeta `[DATO comparacion]` del guion le atribuye a la fuente oficial una cifra que no es suya, y el video publica en ~2 horas.** `contenido/guiones/informe/2026-09-23.md`, línea 22: `[DATO comparacion | DMC vía BioBioChile, 22 sep] alerta oficial en algunas zonas: 105 mm ; acumulado modelado en cordillera: más de 200 mm`. El párrafo siguiente narra correctamente que los 105 mm son la alerta oficial de la DMC y que los +200 mm son de "modelos privados" (Meteored y ADN Radio, según `contenido/informes/2026-09-23.md`). Con el video en silencio o pausado, la tarjeta en pantalla deja los dos valores bajo la misma fuente oficial. El propio validador lo anotó en `contenido/veredictos/2026-09-23-guion_informe.md` y lo dejó pasar como no bloqueante porque "el prompt pide una sola fuente por marca" — es un límite de la regla, no un error del validador. `scripts/youtube-subir.js` sube el informe con `--programar 07:30` (o el valor de `vars.YT_HORA_INFORME`), y el video ya está renderizado (`Edición diaria` run 35823383577, terminado 03:09 Chile): a esta hora (05:31 Chile) quedan cerca de 2 horas antes de que salga de "private".

**2. La Apertura del guion, ya narrada en audio, llama "reforma migratoria" a una reforma constitucional.** `contenido/guiones/informe/2026-09-23.md`, línea 12: "la Cámara frena por un voto una reforma migratoria". `contenido/informes/2026-09-23.md`, línea 38-40, la nombra correctamente como "la reforma constitucional del Gobierno que buscaba ampliar el plazo de detención de personas con una orden de expulsión administrativa"; el bloque desarrollado del guion (línea ~39 en adelante) también usa el nombre correcto. Solo la Apertura, que es de las primeras frases que se escuchan, la nombra mal. Mismo problema de fondo que (1): ya está en el audio renderizado del video que publica a las 07:30.

**3. La sigla "DMC" se pinta en pantalla sin expandir por tercer día consecutivo, y nunca quedó anotada en `bitacora/PENDIENTES.md`.** `contenido/guiones/informe/2026-09-23.md`, líneas 8 y 17: `[FUENTE DMC vía BioBioChile, ...]`. La revisión de hoy (`contenido/revisiones/2026-09-23.md`) dice explícitamente "Viene repitiéndose desde el 21-09"; la de ayer (`contenido/revisiones/2026-09-22.md`) dice "misma observación del 21-09"; la del 21-09 (`contenido/revisiones/2026-09-21.md`) ya la describe de cero. Tres validaciones seguidas señalan lo mismo, el veredicto la aprueba las tres veces como no bloqueante, y ninguna de las tres bajó una tarea a `bitacora/PENDIENTES.md`: es exactamente el patrón de "el ciclo revisa y no aprende" que esta auditoría existe para cazar.

**4. El cierre de cautela repetitivo del informe se heredó al guion, y tampoco está anotado.** La auditoría del 20-09 y la del 21-09 (`bitacora/2026-09-20-auditoria.md`, `bitacora/2026-09-21-auditoria.md`) ya registran, citando las revisiones de esos días, "cuarto día seguido" en que casi todas las [B] y [C] del informe cierran con la misma fórmula de cautela. Hoy, `contenido/revisiones/2026-09-23.md` constata que ese molde ("falta revisar", "el seguimiento queda puesto en") ya cruzó al guion: "Tres bloques seguidos del guion cierran con la misma cadencia... heredada del informe." Búsqueda en `bitacora/PENDIENTES.md` y `estrategia/decisiones.md` por "cautela", "falta revisar" y "molde": sin resultados. Tampoco está cerrado por una decisión de Santiago: es un hallazgo que se repite hace más de una semana sin que nadie lo convierta en tarea.

Nada de esto es un problema de fidelidad de fondo ni de infraestructura: las 42 noticias del informe suenan en el video (diez narradas, treinta y dos en titulares), ninguna cifra del guion es ajena al material de entrada, y los tres pases de corrección (preselección, informe, guion) tocaron exactamente lo pedido. Sin fallas nuevas en el barrido, la preselección ni el pipeline de GitHub Actions.

## Propuestas

1. En `contenido/guiones/informe/2026-09-23.md`, línea 22: partir la marca en dos `[DATO cifra]` con su propia fuente cada una ("alerta oficial DMC: 105 mm" / "acumulado modelado, Meteored y ADN Radio: más de 200 mm"), o cambiar la etiqueta de fuente a "DMC vía BioBioChile; Meteored y ADN Radio, 21 sep" para que la tarjeta no deje ambos valores bajo un solo nombre. Es una corrección puntual al archivo ya escrito, para decidir si se aplica antes de las 07:30.
2. En `contenido/guiones/informe/2026-09-23.md`, línea 12: cambiar "una reforma migratoria" por "la reforma constitucional que ampliaba la detención para expulsiones administrativas" (o una forma corta equivalente), igual que el bloque desarrollado. Misma urgencia que la propuesta 1.
3. En `prompts/guion-informe.md`, agregar una regla explícita: toda sigla que se pinte en pantalla (marcas `[FUENTE ...]`, `[DATO ...]`) debe ir expandida la primera vez que aparece, salvo las de uso público general. Cierra el hallazgo que se repite desde el 21-09 (punto 3).
4. En `prompts/informe.md`, agregar un tope explícito: no más de una [B] o [C] por edición puede cerrar con la fórmula "queda [para verificar/en seguimiento/pendiente]" o equivalente; variar el cierre del resto. Como el guion hereda el texto del informe, esto también resuelve el arrastre al guion (punto 4).

## Triage

- **HOY**: propuestas 1 y 2, para Santiago — el video del informe publica a las 07:30 de Chile (dentro de ~2 horas) con estos dos defectos ya renderizados; decidir si se corrige el archivo y se vuelve a renderizar antes de esa hora, se ajusta la descripción/tarjeta después de publicado, o se deja así. Va en la primera línea del archivo.
- **HOY**: propuestas 3 y 4, para la sesión de la noche — no son urgentes por el video de hoy, pero llevan repitiéndose sin corregirse ni anotarse (3 días la sigla, más de una semana el cierre de cautela) y deben quedar en el prompt antes de la corrida de esta madrugada que viene.
- **AGUANTA**: nada adicional — el resto de los hallazgos de `contenido/revisiones/2026-09-23.md` (etiqueta "abstenciones" corta, bloque del subsidio laboral sobre el rango de [B], líneas compartidas en "Fuentes consultadas") son de forma, no se repiten con la misma claridad en los tres días comparados, y el propio validador ya los dejó para "si mañana el guion se alarga" o como nota menor.
- **MIRAR**: las 23,6 horas vistas en videos LARGOS de los últimos 30 días (Analytics) no se movieron entre el 22-09 y el 23-09 (23.6 → 23.6, retención 33.4% → 33.4%). Un día sin movimiento no es una tendencia; si se repite mañana, sí lo es.

## Comparación con ayer

**Mejoró, y bastante:** ayer (22-09) la cadena se congeló por completo después de la preselección — el informe nunca llegó a horario, la edición completa (informe, guion, revisión, banco de temas, videos) recién salió a las 12:15 del mediodía tras intervención manual, `bitacora/2026-09-22-auditoria.md` lo marcó CON FALLAS y HOY. Hoy la cadena completa corrió sola entre las 01:40 y las 02:42, sin intervención, con la misma cantidad de vueltas de corrección (una por pieza) que en días normales. `REINTENTO 1`, la propuesta que salió de esa misma auditoría de ayer, ya está marcada como hecha en `bitacora/PENDIENTES.md`; hoy no hizo falta que se activara porque GPT respondió a tiempo, así que queda sin probar en una madrugada real, pero el síntoma que la motivó no se repitió.

**Sigue igual:** cada una de las tres piezas (preselección, informe, guion) volvió a costar exactamente una vuelta de corrección, por omisión y no por error de dato — el mismo patrón que describen las revisiones del 20, 21 y 22-09. La sigla "DMC" sin expandir en pantalla sigue sin corregirse, tercer día.

**Peor / nuevo:** por primera vez en los últimos días, un veredicto APROBADA deja pasar un guion con una atribución de dato incorrecta (punto 1) y un nombre de reforma equivocado (punto 2) hacia un video que sí llega a publicarse — a diferencia de días anteriores donde hallazgos similares (por ejemplo, el río atmosférico del 22-09) se resolvían narrando la salvedad correctamente. Y se confirma, revisando `bitacora/PENDIENTES.md` completo, que ni la sigla DMC (3 días) ni el cierre de cautela repetido (más de una semana) llegaron nunca a esa lista pese a que las revisiones los nombran una y otra vez.
