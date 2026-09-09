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

## 5. Corrección de errores dentro del bucle

- **Cuándo**: por evento, apenas existen los dos guiones (~02:00), no a las
  04:45. Y la **web publica el informe solo con estado ≥ `aprobada`**: se
  cierra la ventana de hoy (5 h con un error público).
- **Quién corrige**: (a) la revisión misma, cuando puede comprobar el dato
  (hoy ya es así: v3 en Fable, modo corrección); (b) si no puede, devuelve al
  autor (GPT informe / Claude guionista) la lista de hallazgos con estado
  `rechazada, vuelta N`; el autor corrige solo esas frases y vuelve a
  `guiones_listos`.
- **Tope**: dos vueltas. A la tercera, `bloqueado_humano` + aviso al teléfono
  con qué dato falta y dónde se buscó. Nunca un bucle infinito.
- El exprés mantiene su control aparte (`verificar-expres.js`): es otro
  circuito, más corto.

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

## 8. Preguntas para la tarde

1. ¿Estado escrito por cada tarea (A), calculado desde los archivos (B), o la mezcla?
2. ¿Uno o cuatro despachadores de Claude? ¿Cuál modelo para cada tarea?
3. ¿Cada disparo de una tarea de GPT arranca con contexto limpio? (verificar)
4. ¿La web espera a la revisión, o publica y corrige?
5. ¿Dos vueltas de corrección antes de pedir humano, o una?
6. ¿Qué se queda por reloj y qué pasa a estado (en especial el informe de la mañana)?
7. ¿En qué orden migramos? (propuesto: 1 → 2 → 3 → 4 → 5)
