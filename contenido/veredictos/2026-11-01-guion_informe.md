VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-01T12:27:14Z

Observaciones:
- Para la pieza siguiente: la edición del 02-11-2026 llega con dos deudas con
  fecha, y las dos caen ese mismo día. La votación del proyecto sobre pérdidas
  de las AFP (informe de hoy, línea 61, marca PENDIENTE DE CIERRE con fecha
  2026-11-02) y las audiencias de formalización de la causa de Martín Pérez
  (informe, línea 17), que es la portada de hoy y queda abierta en el punto que
  el guion narra en su línea 30.
- Para la pieza siguiente: si la causa de Martín Pérez vuelve a ser portada, el
  informe no trae la forma larga de ECOH y hoy el guion tuvo que glosarla de su
  cosecha ("la fiscalía especializada en homicidios", línea 26). Lo mismo con
  SENAPRED y SERNAGEOMIN, que el informe usa solo en sigla (sus líneas 97, 99 y
  101) y el guion expandió en su línea 52. Las tres glosas son correctas y las
  pidió la corrección 5 de la vuelta 1, pero el camino limpio es que el informe
  traiga la forma larga la primera vez que usa la sigla: así el guion no aporta
  nada que la entrada no diga.
- El conteo de "máximo tres cifras habladas por bloque" vuelve a quedar sin
  zanjar, y hoy decidió si un bloque se aprobaba. En "Reconstrucción de
  Atacama" quedan narradas el monto del plan (línea 38), las cinco quebradas
  (línea 40) y los pesos por habitante (línea 42): tres con el mismo método de
  conteo de la vuelta 1, que deja fuera los años y no cuenta dos veces un
  valor. Contando también la duración "tres años" de la [TESIS] (línea 34)
  serían cuatro. Apliqué el método de la vuelta 1, que es el que midió esas
  seis cifras y calculó el remedio que GPT ejecutó al pie de la letra, así que
  la corrección 4 está resuelta. Es la tercera edición que pide lo mismo
  (`contenido/veredictos/2026-10-13-guion_informe.md` y la vuelta 1 de hoy):
  conviene que `prompts/guion-informe.md` diga si cuentan fechas, duraciones y
  menciones repetidas, y no decidirlo corrida por corrida.
- Con ese mismo método, el bloque "Caso Martín Pérez" narra cuatro cifras:
  "diecinueve años" (línea 22), "cincuenta millones de pesos", "cinco personas"
  y "dos comparecieron el sábado" (las tres en la línea 26). No es hallazgo: la
  vuelta 1 no marcó ese bloque y esas tres frases de la línea 26 llegan sin
  cambio desde la versión anterior, así que la regla de convergencia lo impide.
  Queda anotado porque es el mismo tope de la observación de arriba, visto en
  otro bloque, y porque la edición de mañana lo va a encontrar igual.
- Largo verificado en esta corrida: 503 palabras narradas, dentro de 420 a 600.
  `node scripts/validar-tarjetas.js` imprime 445 porque su filtro (línea 90 de
  `scripts/validar-tarjetas.js`) descarta las líneas que empiezan con corchete
  y deja fuera las cuatro [TESIS], que el prompt declara narradas: suman 58
  (16, 12, 14 y 16). Tercera edición seguida con esta nota, junto a
  `contenido/veredictos/2026-10-31-guion_informe.md` y la vuelta 1 de hoy. El
  reparto de hoy: noticia del día 29, apertura 26, portada 139, Atacama 140,
  alertas 112, cierre 57, todos dentro de su rango orientativo.
- La expansión de las dos siglas resolvió además la nota de la vuelta 1 sobre
  el bloque de alertas: pasó de 96 a 112 palabras y ya entra en el reparto
  orientativo de 110 a 160.
- Línea 40: al salir los conteos de contratos, consultorías y diseños quedó
  "las consultorías deberán producir diseños de obras mayores", con artículo
  definido y sin que el guion las haya presentado antes. El recorte era lo
  pedido y no incumple ninguna regla del prompt; se oye mejor "varias
  consultorías" o "las consultorías contratadas".
- Las carátulas 2 y 3 abren las dos con los cinco detenidos ("Cinco detenidos",
  línea 4; "Cinco fueron detenidos", línea 5). No es hallazgo: son enfoques
  distintos, la contradicción y la cifra con referencia, ninguna línea repite
  otra palabra por palabra, y la tercera la fijó la corrección 7 de la vuelta 1
  después de verificarla contra las otras dos. Para la prueba A/B de YouTube
  conviene que la segunda tome otro ángulo del informe, porque dos de las tres
  compiten con el mismo número.
- El cierre sigue abriendo con "La jornada deja audiencias pendientes...", la
  misma fórmula que la vuelta 1 anotó. No bloquea por lo mismo que entonces (la
  regla prohíbe que un bloque TERMINE en síntesis abstracta, el cierre termina
  con el tagline y la frase nombra hechos concretos), pero es una formulación
  que el propio prompt cita entre las que evita, y la regla anti plantilla pide
  variarla entre días.

Verificado en esta corrida, una por una, que las siete correcciones de la
vuelta 1 quedaron resueltas, con el diff de la versión anterior a la mano
(949ba4d contra 62ec9fa) para no marcar como nuevo lo que ya estaba:
1. "Fuentes:" trae ahora "- CNN Chile, 31-10-2026." (línea 61) y "- Radio
Atacama, 31-10-2026." (línea 65), con la forma exacta de las líneas 200 y 243
del informe, y la lista no tiene ninguna ruta interna del sistema. 2. Fuera la
marca de la línea 42: el orden de marcas queda cifra, esquema, cifra, cifra, y
`node scripts/validar-tarjetas.js` imprime "variedad OK: ninguna cuota rota,
ninguna marca malformada", sin dos tarjetas del mismo tipo seguidas dentro de
un bloque ni más de dos [DATO cifra] seguidas en el guion. 3. Con esa marca
salió también el pie "MOP e INE, 31 oct", y el INE sigue acreditado en la lista
"Fuentes:" (línea 66) como "Instituto Nacional de Estadísticas, Censo 2024",
igual que en la línea 224 del informe. 4. El bloque de Atacama narra tres
cifras con el método de conteo de la vuelta 1, y el piso de palabras aguantó el
recorte. 5. La narración expande las tres siglas la primera vez que suenan ("la
fiscalía especializada en homicidios, la ECOH Metropolitana", línea 26; "El
Servicio Nacional de Geología y Minería, SERNAGEOMIN" y "El Servicio Nacional
de Prevención y Respuesta ante Desastres, SENAPRED", línea 52) y las marcas
mantienen la forma corta, que es el estándar del veredicto del 31-10-2026 y lo
único que cabe en el máximo de seis palabras de un pie. MOP queda igual, con su
nombre completo en la narración de la línea 38. 6. La carátula de la línea 3 es
"¿Qué cargos enfrentarán? / Secuestro de Martín Pérez", tres y cuatro palabras
contadas, con el delito en el gancho y la pregunta que pide la primera. 7. La
carátula de la línea 5 es "Solo uno en prisión / Cinco fueron detenidos",
cuatro y tres palabras, el uno de cinco en prisión preventiva de la línea 13
del informe, sin repetir línea de las otras dos y sin subir el gancho con
morbo.

Verificado además, para que no se abra una vuelta por algo que ya está bien:
`node scripts/revisar-mecanico.js` imprimió "sin hallazgos mecánicos"; cero
rayas largas y cero rayas medias en el archivo completo; nada de lo que
cambiaron las correcciones contradice el informe (el secuestro y homicidio en
sus líneas 5, 11 y 13; los cinco detenidos y el único en prisión preventiva en
la 13; las cinco quebradas y el río Huasco en la 51; las diez comunas y
SERNAGEOMIN en la 99; los recursos escalonados de SENAPRED en la 101); los tres
bloques de noticia y su orden siguen siendo los que manda QUÉ SE NARRA, con
cuatro [A] en el informe (líneas 11, 47, 95 y 141), la portada primero y el
ébola quedándose en la web, que es lo correcto porque sus cifras están cortadas
al 20-10-2026 y el guion no las narra; sin "En titulares", sin Dato curioso,
sin Agenda y sin "¿En qué quedó?"; las categorías `seguridad`, `economia` y
`emergencia` son las que el tema pide, y los bloques de estructura no llevan
corchete; las cuatro [TESIS] siguen con 16, 12, 14 y 16 palabras bajo el máximo
de 18 y con su línea en blanco antes del párrafo; el [ESQUEMA] de la línea 28
cubre la noticia de proceso y es el único; las tres marcas [DATO] que quedaron
llevan un solo valor cada una con su unidad pegada y el monto completo sin
redondear, y sus etiquetas, listadas una por una, tienen contexto y entre cinco
y seis palabras ("rescate exigido por los captores", "inversión en
reconstrucción de Atacama 2026-2028", "comunas metropolitanas bajo Alerta
Roja"); sus valores calzan con el informe ($50 millones en su línea 15,
$115.152 millones en la 49, las diez comunas en la 99); las cifras grandes se
narran redondeadas y con tope de tres cifras significativas; el título no trae
número, así que la regla de la cifra del título no aplica; el clima de carátula
sigue siendo `policial`, una de las seis que reconoce el generador; la
descripción sugerida son tres frases, resume la jornada completa y no trae
fuentes ni enlace; ningún bloque termina en síntesis abstracta; no quedan
conectores de ensayo escrito; no hay comparativo ni superlativo que el informe
no traiga; no hay tema narrado dos veces ni frase que narre ausencia de
noticias; el cierre tiene 57 palabras, dice que el informe completo está en el
enlace de la descripción, integra la línea "Para salir hoy" del informe (su
línea 253) y termina con el tagline exacto "El resumen sin gritos."; y la ruta
del archivo es la que manda el contrato.
