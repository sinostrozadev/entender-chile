# Plan B: la cadena sin ChatGPT (24-09-2026 → domingo 27)

Santiago avisó la noche del 24 que ChatGPT se quedó sin cuota y no responde
hasta el domingo, y se retiró hasta entonces: "procura que todo funcione este
finde, yo no me meteré más". Esto es lo que quedó armado y lo que hay que
mirar si algo falla.

## Lo que se verificó, en vez de suponerlo

- **Claude no puede navegar desde la sesión.** Probado contra emol.com: el
  proxy de red devuelve EGRESS_BLOCKED. No es solo la regla del 23-09.
- **Pero un script de Claude en GitHub Actions sí navega.** El barrido entra
  a 22 fuentes todas las noches desde ahí. De eso salió el lector automático.
- **La carátula B ya existía y ya era automática.** `scripts/dia.js`: si no
  hay ilustración de GPT del día, la carátula principal sale con
  `MiniaturaV4`, el pictograma más la cifra, todo dibujado por código. No
  hubo que tocar nada.

## La cadena nocturna, como queda estos días

    01:30  barrido (workflow, no depende de GPT)
    01:55  RESPALDO PRESELECCIÓN   trig_01CEfUBNnqtRYgEgyYhYocUU   NUEVA
    02:35  RESPALDO INFORME        trig_01VU2rZ6AejJCNC1tY7imx9Q   NUEVA
    03:15  RESPALDO GUION          trig_01TgYrtBrSEKqpzwiTnPRUDH   NUEVA
    ~04:50 edición diaria (workflow): render, voz, miniaturas, subida
    05:15  vigía (ya existía, encendido)

Las tres nuevas siguen el patrón prompt-en-el-repo: la rutina solo sincroniza
y lee su archivo. Los archivos son `prompts/respaldo-preseleccion.md`,
`prompts/respaldo-informe.md` (nuevo) y `prompts/guionista.md` (el del
guionista de siempre, que ya era idempotente: si el guion existe y es más
nuevo que el informe, no hace nada).

**Por qué la de preselección es nueva y no la vieja:** la original
(`trig_01CVyy1m21cpCGHk9sKfVY9r`) fue creada por la web y desde la sesión no
se puede editar ni encender. Quedó apagada; la nueva tiene el mismo prompt y
corre a la 01:55 en vez de las 03:30, porque con GPT caído no tiene sentido
esperarlo.

**Cuando GPT vuelva:** apagar las tres nuevas, o correrlas más tarde para que
vuelvan a ser red de seguridad en vez de camino principal.

## Lo que se construyó

**`scripts/lector.js` + `.github/workflows/lector.yml`.** Entra a las páginas
del hallazgo desde Actions y deja `FUENTE-<slug>.md` con el texto tal cual,
sin resumir y sin elegir citas. Probado con el caso Chureja: leyó 2 de 3
páginas. Límites que el propio archivo declara: muros de pago no, notas que
se arman con JavaScript devuelven poco, y los enlaces de Google News no
resuelven a la nota original. Cada página que falla queda marcada "no
accesible" con su motivo.

**El arreglo de la guardia, que era el más urgente y no estaba pedido.** La
guardia solo procesaba los hallazgos NUEVOS de su corrida: comparaba la lista
de antes con la de después. Un hallazgo cuya lectura llegaba más tarde
quedaba tirado para siempre, porque en la corrida siguiente ya no era nuevo.
Pasó con el de las 18:15 del 24 y se habría repetido cada dos horas todo el
fin de semana. Ahora cada corrida barre también los pendientes del día y, si
pasada una hora la lectura no llegó, redacta con los titulares declarando la
limitación.

**`contenido/secciones/PROMPTS-PARA-PEGAR.md`.** Las imágenes se piden a mano
desde el chat de ChatGPT, que sí funciona. Está el pedido pendiente de clima
v2 y el molde de las nueve que faltan.

## Lo que hay que mirar si algo falla

1. **Ninguna notificación en la madrugada del viernes** es mala señal, no
   buena: las tres rutinas nuevas avisan cuando intervienen, y se espera que
   intervengan todas las noches. Silencio total = no corrieron.
2. **Si falta el informe**: mirar si hubo preselección. Sin preselección el
   respaldo del informe no escribe nada a propósito, y avisa.
3. **Si falta el video pero está el guion**: es la edición diaria, no los
   respaldos. Revisar Actions.
4. **Las rutinas nuevas corren sin conectores MCP** (limitación de cómo se
   crearon). No los necesitan: trabajan con git y el repo. Pero si un día hay
   que darles conectores, se recrean desde la web.

## Lo que quedó sin terminar

- **El video.** Santiago: "va mejor, pero no convence". Quedaron sin resolver
  el intro (propuesta: sin textos, con la marca del canal fija en una esquina
  durante todo el video) y los saltos que él iba a listar. Todo el trabajo
  está en `src/taller-secuencia.tsx`, nada de eso toca producción.
- **La v2 de la imagen de cielo** de clima: el pedido salió, GPT nunca
  respondió. El prompt para pedirla a mano está en PROMPTS-PARA-PEGAR.md.
- **La guardia de pedidos** que se propuso dos veces y nunca se aprobó: un
  workflow que avise cuando un PEDIDO lleva horas sin respuesta. Con el
  lector automático ya no urge para lecturas, pero sigue faltando para las
  imágenes.

## 26-09: lo que cambió (para no buscar IDs que ya no existen)

- Los tres respaldos de arriba (`trig_01CEfU…`, `trig_01VU2r…`,
  `trig_01TgYr…`) **ya no existen**: la sesión de día los reemplazó el 26-09
  a las 09:06 por UNA rutina, "Cadena nocturna sin GPT (01:55 Chile):
  escribir Y reparar hasta aprobar" (`trig_01NscKtv2hPKqkV6ft8X6GKG`,
  sesión persistente `session_01DLpwxAZS4q3pexq9GBPVY4`, con el repo
  clonado). Esa misma sesión fue la que escribió las piezas del 25 y del 26
  a las 02:0x. Ahora además repara en bucle hasta `aprobada`.
- La noche del 26 se sumó el **suplente** (`prompts/suplente.md`): la rutina
  validadora hace los turnos de GPT que la Cadena no cubre, mientras exista
  `contenido/estado/plan-b.txt` (interruptor y única lista de turnos). Y el
  **reloj del reintento** (`trig_016JsVfFwrJFut5vy2f4c8TS`). Detalle en
  `bitacora/2026-09-26.md`.
- **Cuando GPT vuelva:** borrar `plan-b.txt`, y apagar (o dejar de red) la
  Cadena nocturna desde la web. Decisión pendiente de Santiago en
  PENDIENTES ("cuando GPT vuelva").
- **Desde la noche del 26 el plan B se activa SOLO** (regla 20 y 20 en
  `reintento.yml`: un aviso a los 20 minutos, suplente a los 40) y dura un día,
  porque a la madrugada siguiente vence y el mismo workflow lo borra. GPT
  vuelve a ser la primera opción cada mañana; nadie enciende ni apaga nada a
  mano. Detalle en `bitacora/2026-09-26.md`.

