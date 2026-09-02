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
