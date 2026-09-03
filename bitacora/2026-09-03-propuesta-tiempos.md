# Propuesta: acortar la madrugada y que los agentes dependientes escuchen

Pedido de Santiago, 03-09-2026 16:40: "optimizar los tiempos, que los agentes
dependientes escuchen y actúen, acotar el proceso". Medido sobre la corrida
de hoy y las de los tres días anteriores.

## 1. Lo medido: la cadena tarda 4 h 10 y trabaja 1 h 45

Corrida del 03-09, hora de Chile, con lo que cada pieza tardó de verdad:

| Hora | Pieza | Tardó | Esperó antes de empezar |
|---|---|---|---|
| 01:32 | Barrido (falló hoy; corrió a las 06:06 por el cron) | 2 min | |
| 01:45 | Observatorio (falló hoy) | 5 min | |
| 03:10 | Preselección | ~10 min | **1 h 28** desde el barrido |
| 03:30 | Informe | 14 min | 10 min |
| 03:45 | Claves | ~10 min | 1 min |
| 04:00 | Guion del informe | 16 min | 16 min |
| 04:15 | Guion de la Clave | 3 min | 0 |
| 04:40 | Revisión editorial | 3 min | **22 min** |
| 04:43 | Render de las 4 piezas, subida, podcast, web | **59 min** | 0 |
| 05:42 | Todo en YouTube privado | | |

De barrido a video listo: **4 h 10**. Tiempo en que alguien está haciendo
algo: **1 h 45**. El resto es espera de relojes fijos. Y no hay colchón
para fallar: si una pieza de las 03:30 se cae, no hay hora en que reintentarla
antes de que el video deba estar publicado.

## 2. Por qué está así: dos tipos de agente

- **Los que escuchan** (ya existen): el workflow de edición se dispara con
  el push de la revisión; el de la web con el push de las descripciones; el
  guardia espera en un bucle de `git pull` cada 30 segundos hasta que aparece
  su archivo y actúa al segundo. Todo eso es evento, no reloj.
- **Los que solo tienen reloj**: las cinco tareas de ChatGPT (preselección,
  informe, Claves, dos guiones) y las rutinas de Claude de revisión y
  guardián. Cada una corre a una hora fija con holgura "por si acaso", y las
  holguras sumadas son las dos horas y media de espera.

Limitación dura: **una tarea de ChatGPT no se puede disparar por evento**.
Corre a su hora y punto. Lo que sí se puede es (a) ponerla a la hora justa
medida, y (b) darle una instrucción de espera corta si su entrada no está.

## 3. La propuesta, en tres movimientos

### A. Todo agente de Claude nace esperando, no a la hora

La rutina no se programa "a la hora en que ya debería estar la entrada" sino
"a la hora en que PODRÍA estar", y hace lo que hace el guardia: bucle de
`git pull` cada 30 segundos hasta que aparece el archivo de entrada del día,
con tope (20 minutos). Aparece, actúa; no aparece, escribe una línea FALTA y
avisa. Es el patrón `prompts/guardia-reloj.md`, paso 4, ya probado cinco
veces hoy. Se aplica a:

- **Revisión editorial**: espera el guion del informe y revisa; luego espera
  el guion de la Clave y revisa. Dos pushes, dos renders (ver C).
- **Guardián**: espera las descripciones del día (= hubo video). Si en 20
  minutos no aparecen, alerta. Deja de mirar a las 06:07 una edición que
  terminó a las 05:42: mira a las 04:00 una edición que debería haber
  terminado a las 03:50.
- **Auditoría matinal**: espera el guardián.

### B. Las tareas de ChatGPT, a la hora medida y con espera corta

Se corren al tiempo real de la pieza anterior más 5 minutos de holgura, y
cada prompt recibe la misma cláusula: "si tu archivo de entrada de HOY no
existe, espera 2 minutos y vuelve a mirar, hasta 4 veces; si sigue sin
existir, haz tu respaldo (la preselección barre sola; el informe trabaja
con la preselección de ayer y lo declara en el bloque interno)". Es lo que
la preselección hizo hoy sin que nadie se lo pidiera, convertido en regla.

### C. Dos cadenas en paralelo, no una en fila

Hoy Claves y guion del informe dependen solo del informe, y corren una
después de la otra. Y el render de las cuatro piezas espera al último
guion. El workflow ya es reentrante por pieza (02-09), así que:

- Al push de la revisión del informe se renderiza **informe + Short** (31
  min) mientras la Clave todavía se está escribiendo.
- Al push de la revisión de la Clave se renderiza **Clave + Short de la
  Clave** (25 min) en su propia corrida.

El video principal deja de esperar a la Clave.

## 4. La madrugada propuesta

| Hora | Pieza | Quién | Cómo se dispara |
|---|---|---|---|
| 01:30 | Reloj → barrido | rutina Claude + workflow | push |
| 01:45 | Observatorio | rutina Claude | reloj (independiente) |
| 01:45 | Preselección | ChatGPT | reloj, con espera corta |
| 02:05 | Informe | ChatGPT | reloj, con espera corta |
| 02:30 | Guion del informe **y** Claves, a la vez | ChatGPT (dos tareas) | reloj |
| 02:45 | Revisión: espera el guion del informe, revisa, push | rutina Claude esperadora | evento |
| ~02:50 | Render informe + Short | workflow | push |
| 02:50 | Guion de la Clave | ChatGPT | reloj |
| ~03:00 | Revisión: espera el guion de la Clave, revisa, push | la misma rutina, segunda vuelta | evento |
| ~03:05 | Render Clave + Short de la Clave | workflow | push |
| ~03:25 | **Informe en YouTube privado** | | |
| ~03:35 | **Clave en YouTube privado** | | |
| 04:00 | Guardián: espera las descripciones, alerta si faltan | rutina Claude esperadora | evento |
| 04:15 | Auditoría matinal | rutina Claude | reloj |
| 06:30 | Santiago publica | | |

De 05:42 a **03:35**: dos horas antes. Y lo más importante no es la hora
sino el **colchón de tres horas** entre el video listo y la publicación: si
una tarea de ChatGPT se cae a las 02:05, el guardián lo dice a las 04:00 y
hay tiempo de relanzarla a mano y rendir de nuevo antes de las 06:30. Hoy
ese colchón era cero.

## 5. Lo que no mejora con esto, y hay que decirlo

1. **Las caídas por cupo** (cuatro hoy: barrido, observatorio, guardia de
   las 08:14, métricas) no se arreglan con horarios: son del plan de Claude.
   Un reloj más apretado las hace más visibles, no menos frecuentes. Lo que
   sí ayuda es el colchón: una rutina que falló a las 01:45 se puede
   relanzar a las 04:00.
2. **El cron de GitHub de respaldo del barrido corrió hoy a las 06:06**,
   4 h 16 tarde. Sigue sin servir de red (regla del 31-08). La red real
   del barrido es que la preselección barra sola, que ya pasó.
3. **Los minutos de Actions**: el render en dos corridas no gasta más
   minutos (son los mismos 59), pero un reintento sí. El cupo va al 93%.
   Si el colchón se usa para reintentar seguido, hay que pagar el excedente
   (US$2 a 5 al mes) o bajar el render a 1080p.
4. **El cambio de hora del sábado 06-09**: todos los crones están en UTC.
   Si se reprograma la madrugada, hacerlo ya con las horas de verano
   (UTC-3), para no tocarlo dos veces en una semana.

## 6. Qué hacer esta noche, en orden

1. Reescribir la rutina de revisión como esperadora de dos vueltas (guion
   del informe, luego guion de la Clave), con el bucle del guardia.
2. Reprogramar las cinco tareas de ChatGPT a las horas de la tabla, con la
   cláusula de espera corta en `prompts/contrato-archivos.md` (una vez, no
   cinco).
3. Guardián a las 04:00 esperando descripciones; auditoría a las 04:15.
4. Verificar en la primera corrida que el workflow reentrante rinde solo
   las piezas de cada push (el paso 0 ya lo decide por los assets del
   release).
5. Anotar las horas nuevas en `prompts/README.md`, que es el único cuadro
   de horarios que debe quedar (propuesta de orden del 02-09).
