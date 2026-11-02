---
name: revision
description: La revisión de la mañana de Entender Chile, la que Santiago lee de verdad. Mide cómo salió la edición de la madrugada, qué dice el contenido, cómo van los números y cómo está la máquina, todo contra el repo y nunca de memoria. Usar cuando Santiago diga "revisemos cómo salió el día", "revisemos el informe", "cómo quedó" o pida la revisión matutina.
---

# La revisión de la mañana

Pedido de Santiago del 06-10-2026: "lo que yo miro cada mañana es la revisión
que me haces tú cuando te digo revisemos cómo salió el día". Esto no es un
resumen de lo que ya está escrito en el repo: es el único informe que él lee
completo, y por eso tiene que valer más que la suma de lo que ya recibió.

**Lo que la distingue de todo lo demás.** A las 05:30 la auditoría escribió su
archivo (el informe de la rutina de las 06:00 está apagado desde el 12-10-2026:
esta revisión lo reemplaza). La auditoría dice QUÉ pasó. Esta revisión dice
**qué significa y qué haría yo hoy**, y para eso mide cosas que la auditoría no
mide.

## La regla que manda

**Nada que se pueda medir se estima, y nada se afirma de memoria.** Cada número
de esta revisión sale de un comando que se corrió en esta sesión. Si algo no se
pudo comprobar, se dice "no lo pude comprobar" y se sigue: una ausencia también
es un hecho y hay que verificarla, porque una búsqueda que no encuentra no es
una ausencia.

Y la verdad está en `main`, no en el checkout. Partir siempre por
`git fetch origin main && git reset --hard origin/main`.

## Qué se mide, en este orden

### 1. La edición salió, o no

De `contenido/estado/FECHA.json`: la etapa final, y pieza por pieza la hora
real contra la esperada. Los atrasos se dan en minutos, no en adjetivos.

Si la etapa final no es `videos_listos` ni `aprobada`, **esa es la primera
línea de todo**, antes que cualquier otra cosa.

### 2. Cuánto costó, que es lo que nadie mira

- Vueltas de corrección de la noche, por pieza:
  `git log --since=1.day --format="%s" | grep "estado.*reparar_"`
- ¿Entró el plan B? `cat contenido/estado/plan-b.txt` (si existe, por qué).
- ¿Hizo Claude lo que le toca por reparto? El 06-10-2026 la preselección pasó a
  ser suya (`contenido/estado/reparto.txt`): comprobar que `barrido_listo` lo
  resolvió el suplente y no quedó colgado.
- Turnos de GPT del día = piezas entregadas + vueltas de reparación. Es el
  número que decide si la cuota llega al domingo.

### 3. El contenido, leído y no listado

Leer el informe y el guion de hoy **de verdad**, no sus encabezados. El titular
de portada, las [A], la carátula sugerida. Y la pregunta que importa: ¿hay algo
acá que nos pueda perjudicar? Cifras que no cuadran, una base de comparación
elegida para que el salto parezca mayor, un titular que convierte un anuncio en
un hecho.

**Si hay carátula del día, se revisa con el skill `caratula`, siempre**, aunque
nadie lo pida. Está escrito ahí y vale acá.

### 4. Los números

De `bitacora/metricas/FECHA.md` contra el día anterior. Y lo que de verdad
mueve la aguja, que no son las vistas totales: desde el 01-11-2026 la meta es
la audiencia con los Shorts como producto principal (regla 39), así que
**los suscriptores, las vistas y el visto frente a deslizado de los Shorts, y
si el Short del día salió**, más el CTR y la retención de los largos. Si
un número se movió, decir por qué se movió o decir que no se sabe.

### 5. Qué haría yo hoy

Dos o tres cosas, con su porqué y su costo. No una lista de deseos: lo que se
puede empezar hoy. Si lo que corresponde es no hacer nada, se dice.

## Cómo se entrega

En el chat, para leerse de corrido. **Lo que puede perjudicar va primero**,
aunque sea la parte más corta. Después lo que está bien, en pocas líneas. Al
final lo que yo haría.

Tres cosas que nunca se hacen:

- **Repetir lo que ya dijo la rutina de las 05:30.** Si la auditoría ya lo
  anotó, se nombra en una línea y se pasa a lo que ella no vio.
- **Decir "todo bien" sin haber medido.** El 28-09-2026 salió al aire una
  carátula truncada porque nadie comprobaba el archivo.
- **Dar por buena una hora, una cifra o una ausencia sin el comando delante.**

## Y una cosa que esta revisión sí hace

Si durante la noche algo se rompió y se arregló solo (plan B, un reintento, una
pieza que llegó tarde), **decirlo igual aunque haya terminado bien**. Lo que se
arregla solo y nadie mira es exactamente lo que después falla sin red: el
pedido de carátula se abrió nueve días seguidos sin que nadie se enterara, y
costaba un turno de GPT diario.
