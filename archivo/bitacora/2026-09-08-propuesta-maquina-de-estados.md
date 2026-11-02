# Propuesta: un solo disparador y una máquina de estados

**Idea de Santiago (08-09-2026, 07:45). Para conversar con calma en la tarde.**
Estado: BORRADOR PARA DISCUTIR. No se ha tocado nada del sistema.

## 1. La idea, como la planteó Santiago

- **Un solo PR disparador para GPT** (hoy son tres: #2, #3, #4).
- **Un estado** que diga en qué tarea del día estamos.
- El **barrido activa el PR**: es la entrada del bucle (el "do while").
- GPT entra al bucle, **lee un archivo que según el estado le dice qué tarea
  ejecutar**; cada tarea termina **actualizando el estado y lanzando el
  disparador**. Evaluar si GPT debe limpiar su contexto en cada cierre.
- **Lo mismo con Claude**: dejar una sola rutina (o una por modelo: Haiku,
  Sonnet, Opus, Fable) que **despierte con cada push** y haga lo que el estado
  le indique.
- Resumen: GPT y Claude **reaccionan a cada disparador (PR o webhook), evalúan
  qué les corresponde según el estado**, y así en bucle hasta el estado final.
- Entre medio, **definir cómo se evalúa y corrige un error** dentro del bucle.
- Condición: **cada prompt y cada instrucción muy clara y en orden.**

## 2. Cómo está hoy (para comparar)

- Tres PR permanentes (#2 barrido, #3 preselección, #4 informe) → tres tareas
  de GPT, cada una escuchando el suyo.
- Claude: un guionista por webhook (despierta con TODO push, sin filtro) más
  relojes fijos: 03:35 y 03:50 (respaldos de guiones), 04:45 revisión, 05:00
  métricas, 05:30 auditoría, 06:00 informe de la mañana, guardia cada 2 h.
- **El estado existe pero es implícito**: "qué archivos hay en
  `contenido/<pieza>/<fecha>`". Cada prompt lo reconstruye a su manera.

Lo que eso cuesta, con evidencia de esta semana:
1. **Dedup a mano en cada prompt**: el 07-09 el guion del informe se
   sobreescribió por una guarda omitida (se revirtió solo en 26 s).
2. **Webhook sin filtro**: hoy el guionista despertó 10 veces por pushes
   ajenos (~25 s cada una). Barato, pero es ruido que crece con cada rutina.
3. **La revisión va por reloj (04:45), lejos de los guiones (~02:00)**: hoy el
   informe con dos cifras malas estuvo público en la web de 01:43 a 06:46.
4. **Tres tareas de GPT** que hay que mantener a mano en ChatGPT; cualquier
   cambio de orden obliga a tocar las tres.
5. **Nadie vigila que los eslabones existan.** Esa misma noche (08-09, 22:30)
   se descubrió que la rutina nueva de revisión se había creado sin repo y que
   la vieja estaba apagada: la madrugada iba a quedar sin control de calidad y
   sin video, y NADA en el sistema lo habría avisado hasta la mañana siguiente.
   Lo encontró una revisión a mano. Un estado explícito con vigía convierte eso
   en una alarma automática: "son las 04:55 y el estado sigue en
   `guiones_listos`". Es el argumento más fuerte de esta propuesta.

## 3. La máquina, ordenada (borrador)

| # | Estado | Quién actúa | Prompt que lee | Deja | Pasa a |
|---|---|---|---|---|---|
| 0 | `nuevo_dia` | reloj 01:30 → Actions barrido | — | `contenido/barrido/F.md` | `barrido_listo` |
| 1 | `barrido_listo` | GPT | `prompts/seleccion.md` | `contenido/preseleccion/F.md` | `preseleccion_lista` |
| 2 | `preseleccion_lista` | GPT | `prompts/informe.md` | `contenido/informes/F.md` | `informe_listo` |
| 3a | `informe_listo` | GPT | `prompts/claves.md` | `contenido/claves/F-*.md` | `clave_lista` |
| 3b | `informe_listo` | Claude (guionista) | `prompts/guion-informe.md` | `contenido/guiones/informe/F.md` | `guion_informe_listo` |
| 4 | `clave_lista` | Claude (guionista) | `prompts/guion-claves.md` | `contenido/guiones/claves/F-*.md` | `guion_clave_listo` |
| 5 | `guiones_listos` (3b y 4) | Claude (revisión, Fable) | `prompts/revision-editorial.md` | `contenido/revisiones/F.md` | `aprobada` o `rechazada` |
| 6 | `rechazada` | corrección (ver §5) | hallazgos de la revisión | archivos corregidos | `guiones_listos` (vuelta +1) |
| 7 | `aprobada` | Actions edición | — | videos, descripciones, podcast | `videos_subidos` |
| 8 | `videos_subidos` | Claude (informe de la mañana, Opus) | `prompts/guardian.md` | mensaje al teléfono | `dia_cerrado` |

Notas:
- **3a y 3b corren en paralelo**: el estado no puede ser un solo valor; es un
  archivo con una bandera por pieza y la etapa derivada de ellas.
- **Quedan por reloj** lo que depende de la hora y no de la cadena: barrido
  01:30 (única entrada), métricas 05:00, auditoría 05:30, guardia cada 2 h.
  El informe de la mañana podría pasar a estado (`videos_subidos`) o quedarse
  a las 06:00: decidir.
- **Vigía**: un reloj cada 30 min que mira si el estado lleva más de X minutos
  sin cambiar (alguien no despertó) y re-dispara o avisa. Reemplaza a los
  relojes de respaldo de hoy (03:35, 03:50, respaldos de barrido y edición).

### Dónde vive el estado: dos opciones

**(A) Archivo escrito por cada tarea** (`contenido/estado/F.json`): cada agente
lo actualiza al terminar. Simple de leer; el riesgo es que dos agentes lo
escriban a la vez o que uno se caiga a medio camino y lo deje mentiroso.

**(B) Estado calculado desde los archivos**: la verdad sigue siendo "qué
archivos existen" (no pueden mentir), y un script único `scripts/estado.js`
lo escribe como vista en `contenido/estado/F.json` después de cada push (un
workflow). Los agentes leen esa vista; GPT lee la **primera línea en texto
plano** (`ETAPA: informe_listo`) porque no ejecuta scripts.

Recomendación inicial: **B para la verdad, con un "reclamo" tipo A** para la
concurrencia: antes de trabajar, el agente escribe `en_curso: guion_informe
por claude 01:51` y pushea; si el push es rechazado porque otro reclamó
primero, se retira. Es exactamente lo que faltó el 07-09.

## 4. El disparador único

- **GPT**: un solo PR permanente (`automatizacion/estado`), cuya rama se
  fuerza con cada cambio de estado; **una sola tarea de GPT** que lee la
  etapa, elige su prompt (`seleccion` / `informe` / `claves`) o sale si no le
  toca. Pendiente verificar con ChatGPT: ¿cada disparo del PR es una
  conversación limpia? Si no, el despachador debe decir "ignora corridas
  anteriores" y el estado tiene que bastarse solo.
- **Claude**: el webhook ya dispara con cada push, o sea el disparador ya
  existe. Un **despachador** de 10 líneas (`prompts/despachador-claude.md`)
  lee la etapa y ejecuta el prompt que corresponde. Las rutinas tienen modelo
  fijo, así que hay tres caminos:
  1. **Cuatro despachadores** (Haiku, Sonnet, Opus, Fable): cada push despierta
     a los cuatro y tres salen en ~20 s. Costo ≈ 4 × pushes/día × 25 s.
  2. **Uno solo en un modelo medio** (Sonnet) para guiones, y Fable/Opus solo
     para revisión e informe de la mañana, que pueden seguir por reloj.
  3. **Uno solo en Fable** para todo: el más simple y el más caro por corrida.
- Contexto: las rutinas de Claude ya arrancan limpias en cada corrida
  (`persist_session=false`, verificado hoy por API).

## 5. La vuelta del bucle: quién repara (Santiago, 08-09 noche)

> **El principio, con sus palabras:** "si hay error debe volver a la parte que
> cometió el error, verificarlo y repararlo. Esto para todo, no solo la web."

Es la pieza que le faltaba al borrador. Sin ella la cadena es una flecha: si
algo sale mal, se detiene. Con ella es un bucle de verdad.

**Por qué el que detecta NO es el que arregla:**
1. Quien escribió la pieza tiene el material a mano — el barrido, la captura,
   las fuentes que ya consultó. El detector solo tiene el resultado.
2. Si el detector parcha, el autor nunca se entera y su prompt queda igual. El
   mismo error vuelve mañana. La vuelta al autor es lo que deja rastro.
3. Un revisor que reescribe deja de ser revisor. Se pierde la separación que
   hace que el control valga algo.

**El mecanismo, igual para toda la cadena:**
1. **Quien detecta** escribe el hallazgo (qué está mal, contra qué fuente, en
   qué línea) y deja el estado en `reparar:<pieza>`. No toca la pieza.
2. **El dueño de la pieza** despierta con el disparador, ve que le toca, y lo
   primero que hace es **verificar el hallazgo**: el detector también se
   equivoca (el 08-09 la auditoría propuso "62 años" y el dato real era 34).
   - Hallazgo correcto → repara SOLO eso, deja constancia de qué decía y qué
     dice ahora, y devuelve el estado a su etapa (vuelta +1).
   - Hallazgo equivocado → lo rebate por escrito con la evidencia y devuelve el
     estado sin tocar la pieza. No se repara lo que no está malo. Un detector
     que se equivoca dos veces en lo mismo es un prompt que hay que ajustar.
3. **Tope: dos vueltas.** A la tercera el estado pasa a `bloqueado_humano` y
   suena el teléfono con qué dato falta y dónde se buscó. Nunca un bucle
   infinito a las cuatro de la mañana.

**La única excepción, y bien acotada.** Cuando el arreglo es UN dato puntual y
el detector puede comprobarlo, dejarlo corregir ahorra una vuelta entera y
salva el día (fue exactamente el caso del 08-09: sin corrección no había
video). Puede corregir solo si se cumplen las tres: (a) es una cifra, nombre o
fecha puntual, no un criterio; (b) la comprueba con fuente primaria o con la
propia aritmética del informe; (c) deja escrito qué decía y qué dice ahora. Eso
ya es el modo corrección de `prompts/revision-editorial.md`. Todo lo demás
vuelve al autor.

**Dónde aplica — "esto para todo":**

| Quién detecta | Qué detecta | Vuelve a | Qué hace el dueño |
|---|---|---|---|
| `verificar-expres.js` | cifra del exprés que no está en el material | la guardia (redactor) | reescribe ciñéndose a la captura, o declara que no hay ángulo |
| revisión editorial | el guion no cuadra con el informe | guionista | reescribe solo las frases marcadas |
| revisión editorial | dato malo en el informe mismo | GPT del informe | verifica contra la fuente y corrige |
| `validar-tarjetas.js` | formato, duración, carátula ausente | guionista | ajusta |
| edición diaria (compuerta) | falta una pieza o el veredicto | su dueño | la escribe |
| vigía | un eslabón que no llegó a tiempo | su dueño | la escribe |
| métricas / auditoría | una propuesta que lleva días sin aplicarse | la sesión que toca el repo | la aplica o dice por qué no |

**Lo que esto cambia hoy mismo (pendiente de decidir).** El paso 8 de
`prompts/guardia-reloj.md` dice hoy: "NO reescribas el guion en esta corrida".
Esa regla se escribió cuando no existía la verificación y reescribir de memoria
era justo el error. Bajo este principio pasa a ser: la guardia SÍ reescribe,
pero solo con lo que está en el material capturado, y el verificador vuelve a
correr — con el mismo tope de dos vueltas. Es la vuelta del bucle aplicada al
circuito del exprés.

## 6. Qué gana y qué arriesga

Gana: un solo lugar para ver dónde va el día (el panel lo lee), menos relojes
(de 8 a 4), revisión 2-3 h antes, GPT de tres tareas a una, y prompts en dos
capas limpias: despachador (qué toca) + tarea (cómo se hace).

Arriesga: carreras entre agentes (se resuelve con el reclamo), un estado
que se queda pegado porque nadie despertó (lo cubre el vigía), y que GPT
lea mal el estado (por eso la primera línea es texto plano).

## 7. Migración por pasos (cada uno se prueba en una noche)

1. **Observabilidad**: `scripts/estado.js` calcula y commitea la vista del
   estado tras cada push. Nada cambia de conducta; el panel lo muestra.
2. **GPT**: un PR + `prompts/despachador-gpt.md`; se retiran #3 y #4.
3. **Claude**: `prompts/despachador-claude.md` en la rutina del guionista
   (ya funciona con ese patrón); se retiran los relojes 03:35 y 03:50.
4. **Revisión por evento** y web que espera la aprobación; se retira el 04:45.
5. **Vigía** cada 30 min; se retiran los respaldos que queden.

## 8. Decidido y lo que queda

**Decidido el 08-09 en la noche:**
- **Primero el vigía y el estado**, porque no tocan GPT ni la madrugada y son
  lo que habría cazado solo el incidente de esa noche. ✅ HECHO: `scripts/estado.js`
  y `prompts/vigia.md` (rutina `trig_01LUtn4fSJjBsCzqdoWeVviH`, 02:15 y 05:15).
- **La vuelta del bucle** es principio general, no un caso de la web (§5).
- El estado se **calcula desde los archivos** (opción B): la verdad no cambia
  de dueño. La vista vive en `contenido/estado/FECHA.md`.

**Lo que queda por decidir:**

1. ✅ **DECIDIDO (Santiago, 08-09): la web ESPERA el veredicto.** Un informe sin
   `VEREDICTO: APROBADA` no se publica. Dónde se implementa: `web/src/lib/contenido.ts`,
   función `informes()` (línea ~171) — es el único punto por donde el sitio los
   lista, así que la compuerta va ahí y no en el workflow (el workflow también
   publica casos, videos y podcast, que no deben quedar bloqueados).
   **Cuidado obligatorio:** poner una fecha de corte (desde el 09-09) o los
   informes viejos, anteriores a que existiera la revisión, desaparecerían del
   sitio. Y como el informe queda invisible hasta ~04:50, conviene hacerlo junto
   con mover la revisión a por evento (~02:00), que es el mismo paso 3.
2. ¿Dos despachadoras de Claude (Sonnet para guiones, Fable para revisión) con
   Opus quedándose por reloj a las 06:00? Es lo que propongo: el modelo se fija
   al crear la rutina, así que una sola no puede elegirlo.
3. ¿Cada disparo de una tarea de GPT arranca con contexto limpio? (verificar)
4. ¿La web espera a la revisión, o publica y corrige?
5. ¿Dos vueltas de corrección antes de pedir humano, o una? ¿Y la guardia
   reescribe el exprés rechazado (ver el final del §5)?
6. ¿Qué se queda por reloj y qué pasa a estado (en especial el informe de la mañana)?
7. Orden restante: re-chequeo antes del push → revisión por evento → GPT a un
   PR → Claude a dos despachadoras.
