# Análisis y plan: tomar el control (01-11-2026)

Para validar por Santiago. Sale de tres fuentes medidas hoy: las métricas del
canal (`bitacora/metricas/`), una investigación con fuentes sobre YouTube y
las herramientas de IA (agente de investigación, 01-11), y un inventario de
solo lectura del repo completo (agente explorador, 01-11). Nada de esto es
memoria: cada número tiene archivo o enlace.

## 1. Diagnóstico

**Los Shorts son el canal; los largos son un costo.** Del 01-10 al 01-11:

| | 01-10 | 01-11 | Por día |
|---|---|---|---|
| Vistas de Shorts | 9.354 | 19.614 | 330 |
| Vistas de largos | 1.228 | 1.924 | 22 |
| Suscriptores | 23 | 47 | 0,8 |
| Horas vistas de largos (30 días) | | 15,3 | 0,5 |

Los 15 videos más vistos del mes son todos Shorts o exprés; 11 de los 15
empiezan con una pregunta. Los exprés de la guardia son los que más suben en
24 horas (el del exlautarista: 566 en un día). El informe largo queda entre 2
y 80 vistas con 10 a 30 % visto. El 78 % de los minutos vistos del canal son
de Shorts (2.444 de 3.130 en 30 días).

**La meta de las 4.000 horas murió antes de llegar.** Desde el 01-02-2027,
para quien no esté dentro del programa, YouTube pide 8.000 horas de largos o
20 millones de vistas de Shorts en 90 días (ppc.land 10-08-2026, Tubefilter;
la página oficial confirma cambios en esa fecha). Con 15 horas al mes, ni la
meta vieja ni la nueva eran alcanzables. Además, 1.000 suscriptores son la
puerta de cualquier camino, y a 0,8 por día faltan tres años.

**Los canales "de IA espectacular" no son el modelo.** YouTube eliminó en
enero al menos 18 canales de ese tipo, uno en español con más de 1.200
millones de vistas (Tubefilter, 29-01-2026), por la política de contenido
inauténtico: repetitivo, producido en masa o con apariencia de plantilla no
monetiza y la sanción es al canal entero. Un canal con plantilla diaria y voz
sintética está en la zona de riesgo; lo que lo saca de ahí es criterio
editorial propio, variedad y aporte visible, que es justo lo que este canal
tiene y esos no.

**La máquina produce, pero se cae y nadie se entera a tiempo.** Hoy la cadena
murió a las 02:12 y la edición salió a las 09:45 porque `estado.yml` no
recalcula tras relanzar el barrido; el reloj del barrido reportó éxito sin
escribir; las dos últimas carátulas salieron rotas (una corrupta, una
truncada a medio subir) y nadie lo detectó antes de subir; el validador no se vuelve a
despertar si una pieza cambia tras su veredicto (tuvo parada la Clave cinco
días el 12-10).

**El repo ya no cuadra consigo mismo.** El inventario encontró, entre otras:
REGLAS-DURAS dice que la Clave es diaria (reglas 14 y 40, disputa 6) y todo lo
demás dice semanal; el README dice informe de 15 minutos y es de 3 a 4; dice
que GPT escribe la preselección y desde el 06-10 la escribe Claude; dice 13
workflows y hay 16; `rutinas.md` tiene 8 filas de 22 muertas y no sabe que la
validadora tiene cuatro roles; PENDIENTES tiene 2.489 líneas, 23 marcas de
hecho sin borrar y unas 74 entradas anteriores al 15-10; `revisar-mecanico.js`
valida "En titulares", que ya no existe; ElevenLabs se retiró pero sus secrets
siguen en el workflow; hay 21 archivos de bancos de prueba de septiembre en
`src/` y una cadena de 1.760 líneas apagada por interruptor (la biblioteca).

## 2. Estrategia propuesta

**La meta de 2026 cambia.** No es monetizar: es construir la audiencia que
hace posible cualquier camino después. Meta medible al 31-12-2026: 500
suscriptores (el primer umbral de beneficios: financiación de fans) y un
"visto frente a deslizado" en Shorts sobre el 70 % sostenido. Se mide en
Studio cada semana y queda en `bitacora/metricas/`.

**Los Shorts pasan a ser el producto principal, no un derivado.**

1. **Tres Shorts al día en vez de uno:** el del informe (ya existe), uno o dos
   exprés de la guardia (ya existen, son los que más pegan) y uno nuevo, "la
   pregunta del día": 25 a 35 segundos que explican UNA cosa que la gente se
   pregunta hoy, con título en forma de pregunta. Sale de la pauta de la Clave
   o del informe, lo escribe Claude (no gasta cuota de GPT).
2. **La Clave semanal se mantiene y se parte en Shorts:** cada Clave de 10
   minutos deja 3 o 4 Shorts de 30 segundos, uno por dato o por pregunta, con
   el mural como fondo. Hoy la Clave cuesta lo mismo y rinde 8 vistas; partida
   multiplica su alcance sin costo nuevo.
3. **El informe de 3 a 4 minutos sigue** como el único largo diario, porque es
   lo que deja horas y lo que alimenta la web y el podcast. No se le invierte
   más que mantenerlo.

**El video se vuelve interesante sin pagar primero.** En este orden:

1. **Movimiento con lo que ya tenemos (Remotion, costo cero):** zoom y paralaje
   lentos sobre el mural y las imágenes de sección, subtítulos grandes palabra
   por palabra en los Shorts, cambio de plano cada 2 o 3 segundos, el dato que
   entra con golpe. Es lo que recomienda la investigación como lo más barato y
   no obliga a etiquetar nada.
2. **Voz: prueba A/B de una semana** con ElevenLabs Creator (22 dólares al mes,
   precio oficial) contra Azure: diez Shorts con cada una, misma estructura.
3. **Un solo experimento generativo con tope de 10 dólares:** diez clips de 5 a
   8 segundos (Runway Gen-4 Turbo o el Veo vigente; Sora cerró) para ilustrar
   conceptos abstractos, nunca hechos reales. Si no mueve la retención, no se
   repite.
4. **Sin avatares ni presentadores sintéticos.** YouTube no monetiza personas
   de IA que se presentan como expertas en temas políticos o legales, y el
   riesgo de reputación es alto.

**Cómo se mide para no engañarnos:** cada cambio es un experimento en
`bitacora/experimentos.json` con línea base (los diez Shorts anteriores),
diez Shorts por variante, dos semanas, y tres métricas: visto frente a
deslizado, retención a 3 y a 15 segundos, suscriptores por Short. Sin eso,
ningún cambio se puede atribuir, y las tres fichas abiertas hoy están vencidas
hace 40 a 60 días sin veredicto.

## 3. Orden de la casa: tres encargos

**Encargo A, coherencia (Opus):** REGLAS-DURAS (Clave semanal como regla, la 27
duplicada, "41" o 42, la disputa 3 de titulares sin objeto, la disputa 8 de la
hora de publicación), README.md y prompts/README.md (informe de 3 a 4,
preselección por Claude, 16 workflows, mural-clave y doc-youtube), rutinas.md
reescrito desde la API (8 filas muertas fuera, cuatro roles de la validadora,
tres workflows que faltan), PENDIENTES podado (historia a archivo/, marcas
hechas borradas, lo anterior al 15-10 cerrado o re-fechado con evidencia),
`identidad.md` ("diez minutos"), `prompts/claves.md` línea 48,
`auditoria-matinal.md` y `CALIDAD.md`.

**Encargo B, basura y stand by (Opus):** a `archivo/` con nota los 21 bancos de
prueba de `src/`, los 12 documentos de propuestas cerradas de `bitacora/`,
`docs/auditoria-api/` duplicado, `demo-piano.js`, `contenido/pruebas/`,
`ejemplos/` huérfanos, la captura suelta; quitar ElevenLabs del workflow y de
`dia.js`; podar "En titulares" de `revisar-mecanico.js`; cerrar las tres fichas
vencidas de experimentos. La biblioteca (1.760 líneas, 56 MB) espera decisión.

**Encargo C, que la máquina no se caiga en silencio (Opus):** `estado.yml`
recalcula tras un barrido relanzado; el reloj del barrido falla si no escribió
en main; el validador se vuelve a despertar si la pieza cambia tras el
veredicto; una carátula inválida cae al respaldo (ya en curso hoy); y un
veredicto automático de carátula antes del render (16:9, PNG válido, sin
texto: lo puede mirar la validadora con la imagen). Más un cron de respaldo
para `guardia.yml`, que hoy no tiene.

Después de A, B y C, y no antes, vienen los encargos de estrategia: la
"pregunta del día", la Clave partida en Shorts, el movimiento con Remotion y
el A/B de voz.

## 4. Lo que decide Santiago

1. **La meta de 2026:** 500 suscriptores y gancho sostenido, en vez de las
   4.000 horas. Sí o no.
2. **Shorts como producto principal**, con los tres formatos de arriba. Sí o no.
3. **La Clave: semanal como regla escrita** (hoy REGLAS-DURAS dice diaria).
4. **La biblioteca de dibujos por párrafo** (apagada, 1.760 líneas): encender,
   archivar o seguir en pausa.
5. **La hora de publicación:** la decisión escrita (antes de las 06:00 y Short
   a las 07:30) o la real del workflow (06:30, 12:00, 14:00).
6. **`guardian.md` y la interfaz `taller/`:** retirar o conservar.
7. **Gasto:** autorizar 22 dólares de ElevenLabs por un mes y 10 de clips
   generativos, o nada.

## 5. Orden de ejecución propuesto

1. Hoy: las dos carátulas rehechas (en curso) y el encargo C, porque la cadena
   de esta madrugada ya falló una vez.
2. Mañana: encargos A y B, en paralelo, con tus respuestas a 3, 4, 5 y 6.
3. Esta semana: la "pregunta del día" y la Clave partida en Shorts, con sus
   fichas de experimento y línea base.
4. Semana siguiente: movimiento con Remotion y el A/B de voz.
