# Auditoría del día 10: la noche ejecutó los ocho puntos y el guardián volvió a existir

Medido el 02-09-2026 a las 06:56 de Chile. Las métricas del día todavía no
corren (el reloj toca a las 08:45), así que las cifras del canal son las del
01-09.

## Qué existe

| | 30-08 (auditoría anterior) | 02-09 |
|---|---|---|
| Barridos | 13 | 16 |
| Informes | 7 | 10 |
| Guiones del informe | 7 | 10 |
| Claves entregadas | 7 | 10 |
| Guiones de Claves | 6 | **8** |
| Revisiones | 6 | 9 |
| Descripciones (= hubo video) | 12 | **18** |
| Veredictos APROBADA seguidos | 3 | **6** |

La fila que importa: **claves 10 contra guiones de claves 8**. Hoy es uno de
los dos días de diferencia.

## Lo que la noche ejecutó, punto por punto

Los ocho de la lista del cierre, verificados en el repo, no en el registro de
commits:

1. **ARREGLO 0, el guardián.** Recreado como `trig_01Dk4PXRmGEMPHzrvs6amTgf`
   con el repo declarado en `sources`, modelo Sonnet 5 y la herramienta
   `PushNotification`. **Corrió hoy a las 10:09 UTC y terminó bien**: es la
   primera vez desde que existe, el 29-08, que comprueba algo de verdad. Le
   sumaron un chequeo que no tenía: que las métricas de AYER hayan llegado al
   repo, con la explicación de por qué no puede pedir las de hoy.
2. **ARREGLO 3.** `vistasTotales` ahora es la suma video por video
   (`metricas.js:64`) y el contador del canal queda como nota al lado, con la
   palabra correcta: "va con rezago". El conteo de subidos dejó de venir del
   contador del canal y viene de la lista real de videos.
3. **PANEL 1.** `metricas.js:136` refresca el bloque HIST del panel, y
   conservaron el arrastre de duraciones (líneas 98 a 103) con el comentario
   que explica por qué existe. Sin eso, el 30 y el 31 volvían a marcar cero
   Shorts.
4. **ARREGLO 2b.** `autoStash`, reintento y `origin main` explícito en
   barrido, edición diaria y métricas. `web.yml` no commitea nada, así que no
   aplica: la unificación está completa, no a medias.
5. **VISUAL 1, el esquema.** Ver abajo, es el cambio más visible del día.
6. **EDITORIAL 1.** Nació `prompts/vigia.md`, un vigía de datos anunciados a
   las 09:20 de Chile, después de los horarios típicos de publicación.
7. **VISUAL 3.** Existe `scripts/validar-tarjetas.js` y corre. Sobre el guion
   de hoy responde: *"variedad OK: ninguna cuota rota, ninguna marca
   malformada"*.
8. **PANEL 2** era una decisión, no código.

## El cambio que se ve: las tarjetas dejaron de ser todas iguales

| Marca | 01-09 | 02-09 |
|---|---|---|
| `[DATO cifra]` | **11** | **3** |
| `[TESIS]` | 10 | 10 |
| `[DATO cambio]` | 2 | 2 |
| `[DATO barras]` | 1 | 2 |
| `[DATO comparacion]` | 0 | **1** |
| `[ESQUEMA]` | 0 | **1** |
| Párrafos narrados | 84 | 73 |
| **Tipos distintos usados** | **4** | **6** |

La cifra grande pasó de ser el 46% de las marcas a ser el 16%. No fue un
ajuste cosmético: el guion cambió de forma. Y el validador mecánico ya está
ahí para que no se degrade en dos semanas, que era el punto.

## El Imacec se cerró, y mejor de lo pedido

La [A] de hoy trae el dato real (-1,5% interanual), la serie desestacionalizada
(-1,7% contra junio, -2,1% a doce meses), el **Imacec no minero en -0,3%**,
la atribución del Banco Central a minería y clima, y la reacción de Hacienda
bajando su proyección. Más un "cálculo propio" que traduce la caída a
$100 de julio de 2025 contra $98,50 en julio de 2026: eso es exactamente el
beat "esto en tu bolsillo" que llevaba semanas pendiente en `ideas/`.

**Con una advertencia que hay que decir en voz alta:** esto salió bien porque
el Imacec era la noticia económica de ayer, no porque una regla lo obligara.
El vigía existe como prompt y todavía no lo dispara nadie (ver abajo). La
prueba real es el próximo dato anunciado.

## Lo que no funcionó

### 1. Hoy no hubo Clave en video, y nadie avisó

`contenido/claves/2026-09-02-fondos-generacionales-ciclo-de-vida.md` existe,
escrita a las 03:48 de Chile. **No existe su guion**, y por lo tanto tampoco
`contenido/descripciones/2026-09-02-clave.txt`. Se cayó la tarea de ChatGPT
de las 04:15. Resultado: **1 video y 1 Short en vez de 2 y 2**, el primer día
así desde el lanzamiento.

Y el guardián no lo marcó, porque su regla dice textual: *"si no hay Clave
ese día es normal y NO es alerta"*. Esa regla se escribió cuando la Clave era
opcional. **Desde el 30-08 la serie es diaria**, y además el caso de hoy no
es "no hay Clave": es una Clave escrita a medio hacer, que es peor, porque el
trabajo se hizo y se perdió. Son dos casos distintos y el guardián solo
conoce uno.

### 2. El vigía existe pero no lo dispara nadie

`prompts/vigia.md` está escrito y bien pensado. En `list_triggers` hay cinco
rutinas (barrido, observatorio, revisión, guardián, métricas) y **ninguna es
el vigía**. Un prompt sin reloj es un documento. Es el pendiente más
importante que dejó la noche.

### 3. El guion sigue creciendo y la promesa sigue diciendo diez minutos

11,4 min (27-08) → 16,0 (30-08) → 17,1 (31-08) → 18,0 (01-09) → **17,3 hoy**.
`estrategia/identidad.md` y `estrategia/publico.md` siguen prometiendo diez.
Es la tercera auditoría seguida que lo marca y la distancia ya es del 73%.

### 4. Deriva documental, cuarta auditoría seguida

`README.md`, `prompts/README.md` y `estrategia/hoja-de-ruta.md` siguen
describiendo un pipeline que no existe (la API de Anthropic, la voz clonada
como bloqueante). Cuatro auditorías sin que nadie los toque significa que no
son urgentes, pero también que en algún momento van a engañar a alguien.

### 5. Restos de la noche

- La rutina vieja del guardián (`trig_01TNcYi1Pe46NtnL7eXN6YAx`) sigue
  existiendo, deshabilitada y renombrada para borrar. Falta borrarla, y su
  nombre nuevo trae una raya larga, que el proyecto prohíbe en todos sus
  textos.
- `prompts/vigia.md` dice que nació porque "el informe de esa mañana
  [02-09] anunció el Imacec". Fue el informe del **01-09**. Es una línea de
  contexto, no una regla, pero está mal.

## Lo que mejoró, lo que sigue igual, lo que es nuevo

**Mejoró**: el guardián pasó de decorativo a funcionando; las tarjetas de 4 a
6 tipos con la cifra grande cayendo de 11 a 3; el commit de los tres
workflows unificado; el histórico del panel con quien lo alimente; el Imacec
cerrado con más profundidad que la anticipación.

**Sigue igual**: la duración del guion contra la promesa, la deriva de los
tres documentos, y el hecho de que las vistas se concentran en Shorts que no
suman horas.

**Nuevo**: la Clave a medio hacer, que es un modo de falla que no habíamos
visto, y el vigía sin reloj.

## El objetivo

Quedan **152 días** para el 1-feb-2027. Al cierre de ayer: 5 suscriptores,
427 vistas sumando video por video, 12 públicos de 14 subidos. Los Shorts son
343 de esas 427 y **no cuentan** para las 4.000 horas.

La máquina está mejor que ayer en todo lo que se puede medir. Lo que decide
si el objetivo se cumple sigue sin estar en la máquina: que los videos largos
se vean. Ayer el mejor movimiento fue el informe de Milei pasando de 26 a 55
vistas, y esa es la única serie que importa para el contador.

## Añadido a las 08:30: la Clave se rescató con el workflow reentrante

Santiago levantó la regla de solo lectura para HOY 1 a 4. El workflow
reentrante (`221b15d`) se disparó a mano a las 07:52 (run 22,
`workflow_dispatch`, con `fecha` vacía, que cae a hoy) y produjo solo lo que
faltaba. Verificado paso por paso en el job, en el release y en el repo:

| Paso | Resultado | Hora Chile |
|---|---|---|
| 0 · piezas en el release | `HAY_INFORME=1`, `HAY_SHORT=1` | 07:52 |
| 3 y 3b · informe y su Short | **saltados**, ya estaban | |
| 4 · video de la Clave | ok, **25 minutos** de render | 07:53 a 08:18 |
| 4b · Short de la Clave | ok | 08:18 a 08:21 |
| 5 · descripciones | `2026-09-02-clave.txt` commiteado | 08:21 |
| 6 · release | 4 assets nuevos, `--clobber` no pisó nada | 08:21 |
| 7 · YouTube | Clave `8X_lOUPmLbE` y Short `814rdrOmAz0`, privados, con miniatura | 08:21 a 08:28 |
| 7b · podcast | informe: "sin episodio" y siguió (exit 0, como se predijo); Clave: mp3 subido y episodio 8 anotado | 08:28 |
| 8 · web | despachada (run 33630110998) | 08:28 |

Dos cosas que la corrida demostró y no eran obvias de antemano:

- **La guarda del paso 7 era necesaria.** Sin ella, `youtube-subir.js`
  habría salido con 1 al no encontrar el informe y el bloque se habría
  cortado antes de subir la Clave. Con la guarda, la primera línea se saltó y
  las dos subidas de la Clave corrieron.
- **La Clave sola tarda 25 minutos en renderizar**, no 10. La edición
  completa de la mañana tomó 47 (08:44 a 09:31 UTC). Vale para el cuadro de
  horas del panel: el respaldo de las 05:00 no alcanza si el timbre suena
  tarde.

Título subido: "¿Cómo funcionan los fondos generacionales y qué riesgo
asumen?", 65 caracteres, distinto del informe. El release del día quedó con
las ocho piezas (video y mp3 de informe, Short, Clave y Short de la Clave).

Lo que sigue tuyo: publicar las dos piezas nuevas desde Studio, pegar
`prompts/guardian.md` en la rutina del guardián, y programar el vigía en
ChatGPT a las 09:20.

## Añadido a las 09:00: el texto se desborda de las tarjetas (BUG 1)

Santiago mandó una captura del Short de hoy con el texto saliéndose del
cuadro, encima del sello y de la fecha. Dice que en ese Short pasó dos veces
y que también lo vio en un video largo.

**No es un problema de diseño, es el parser.** En `scripts/parse.js`, la
marca `[TESIS]` abre un buffer que solo se cierra con una línea en blanco,
un `##` o una marca. Cuando el guion pega el párrafo narrado en la línea
inmediatamente siguiente, la cola del bucle lo empuja dentro de la tesis. El
bloque "Seguridad en San Bernardo" de hoy llega al render con **578
caracteres** en una tarjeta pensada para 18 palabras, pintada a tamaño fijo
sin ajuste por largo.

Alcance medido sobre todos los guiones: ninguna tesis afectada hasta el
31-08, **1 de 10 el 01-09 y 3 de 10 hoy**. Es una regresión reciente que
empeoró, no un defecto de siempre.

Queda como BUG 1 en PENDIENTES con los tres arreglos (el parser, la defensa
en el render y la alarma en el validador) más la regla para el prompt. Vale
la pena subrayar una cosa: **el validador de tarjetas que la noche construyó
ayer habría cazado esto el 01-09**, cuando afectaba a una sola tesis, si
hubiera tenido un tope de largo. Es exactamente el argumento de medir la
salida en vez de confiar en la instrucción.
