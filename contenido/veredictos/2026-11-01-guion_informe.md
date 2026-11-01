VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-01T12:19:27Z

Correcciones:
1. Dónde: la lista "Fuentes:" del guion (líneas 60 a 69) no trae CNN Chile ni
   Radio Atacama, y las dos sostienen material narrado. Buscadas una por una en
   esas diez líneas en esta corrida: no aparecen. CNN Chile es fuente de lo que
   narran las líneas 22 y 54 (informe, línea 15: "Fiscalía ECOH, vía
   BioBioChile y CNN Chile, 31 oct", de donde salen el fiscal Pablo Sabaj, el
   hallazgo en Colina y las instrucciones desde un recinto penitenciario;
   informe, línea 101: "La Tercera, CNN Chile y SENAPRED, 31 oct", de donde
   salen los recursos escalonados). Radio Atacama es fuente de lo que narra la
   línea 40 (informe, línea 51: "MOP, vía La Tercera y Radio Atacama, 31 oct",
   de donde salen las cinco quebradas, los veintiséis contratos, las seis
   consultorías y los veinticuatro diseños). · Regla: "Al final, bajo
   'Fuentes:', lista una línea por cada fuente de las marcas [DATO] y [CITA] Y
   por cada fuente del informe cuyas noticias narraste, tal como aparecen en el
   informe (...) una fuente cuyo contenido se narró no puede quedar sin
   crédito". · Debe quedar: dos líneas más en la lista, con la forma exacta que
   usa el informe en sus líneas 200 y 243: "- CNN Chile, 31-10-2026." y "-
   Radio Atacama, 31-10-2026."

2. Dónde: el bloque "## Reconstrucción de Atacama [economia]" lleva dos
   tarjetas seguidas del mismo tipo, la [DATO cifra] de la línea 36
   ("$115152000000") y la [DATO cifra] de la línea 42 ("$384892"), y con la
   [DATO cifra] de la línea 50 ("10 comunas") quedan tres [DATO cifra] seguidas
   en el guion. Es lo mismo que marca `node scripts/validar-tarjetas.js`
   ("línea 42: dos 'cifra' seguidas en el bloque"; "línea 50: tercera [DATO
   cifra] seguida"). · Regla: "VARIEDAD (...): nunca más de dos [DATO cifra]
   seguidas en el guion; nunca dos tarjetas del mismo tipo seguidas dentro del
   mismo bloque", y el control interno 17 ("Variedad visual: no hay más de dos
   [DATO cifra] seguidas"). · Debe quedar: fuera la marca completa de la línea
   42, y la cifra se queda solo en la narración de la línea 44, que ya la dice
   ("unos trescientos ochenta y cinco mil pesos por cada habitante censado").
   Es el remedio que el propio prompt indica cuando el árbol está bien
   aplicado: "deja la cifra sobrante en la narración". Verificado el árbol
   antes de pedirlo: las dos marcas llevan UN valor cada una, así que las dos
   son fila 7 (cifra) y ninguna se arregla cambiándole el tipo; no fuerces una
   `comparacion` entre un monto total y un monto por habitante, que no son la
   misma cosa medida dos veces.

3. Dónde: línea 42, "[DATO cifra | MOP e INE, 31 oct]". La marca cita dos
   instituciones y le pone "31 oct" al INE, fecha que el informe no le da: su
   línea 55 dice "el Censo 2024 del INE" y su lista de fuentes (línea 224)
   "Instituto Nacional de Estadísticas, Censo 2024". · Regla: "Fuente: una
   sola, la principal, con fecha, tomada del informe". · Debe quedar: si al
   resolver la corrección 2 sacas la marca de la línea 42, esta corrección
   queda resuelta con ella y no hay nada más que hacer. Si en cambio eliges
   sacar la marca de la línea 36 y conservar la de la línea 42, su pie queda
   con una sola fuente principal, "MOP, 31 oct", que es de donde sale el monto;
   el INE sigue acreditado en la lista "Fuentes:" (línea 66), igual que se
   resolvió la Organización Panamericana de la Salud en el veredicto del
   31-10-2026.

4. Dónde: el bloque "## Reconstrucción de Atacama [economia]" narra SEIS
   cifras: "más de ciento quince mil millones de pesos" (línea 38), "cinco
   quebradas", "veintiséis contratos", "seis consultorías" y "veinticuatro
   diseños" (las cuatro en la línea 40) y "unos trescientos ochenta y cinco mil
   pesos" (línea 44). Contadas dejando fuera los años ("dos mil veintiséis",
   "dos mil veintiocho", "dos mil veintisiete"), que el prompt exceptúa, y sin
   contar dos veces el mismo valor. · Regla: "Cifras: narra las que sostienen
   la idea de cada noticia, máximo tres cifras habladas por bloque. Las demás
   pueden ir en una marca [DATO] para que aparezcan en pantalla". · Debe
   quedar: tres cifras habladas como máximo en ese bloque. Las que sostienen la
   noticia son el monto del plan y la comparación por habitante, así que la
   salida más corta es dejar la línea 40 sin los conteos de contratos,
   consultorías y diseños (siguen completos en el informe de la web, que es
   donde el formato corto los deja) y conservar, si quieres la tercera, las
   cinco quebradas y el río Huasco, que son las obras que ya están en marcha.
   Al recortar, cuida el piso: hoy el guion tiene 485 palabras narradas
   (contadas en esta corrida, con las cuatro [TESIS] que el prompt declara
   narradas: 16, 12, 14 y 16), y el rango es 420 a 600.

5. Dónde: líneas 47, 50 y 54. SENAPRED se pinta en pantalla en la marca
   [FUENTE] de la línea 47 y en el pie de la [DATO] de la línea 50, y suena en
   la narración de la línea 54, sin quedar expandida en ninguna parte del
   guion; SERNAGEOMIN suena en esa misma línea 54 sin ninguna explicación; y
   ECOH suena en la línea 26 ("La Fiscalía ECOH Metropolitana") también sin
   explicación. Buscadas sus formas largas en el archivo completo: no están. ·
   Regla: "toda sigla que se PINTE EN PANTALLA (en esta marca o en el pie de un
   [DATO]) va expandida la primera vez que aparece en el guion (...) Se salvan
   las de uso corriente que cualquiera lee sin traducir (IPC, PIB, ONU, INE,
   Carabineros, PDI)", y "Explica siglas la primera vez cuando un oyente
   general pueda no conocerlas". Ninguna de las tres está en la lista de
   salvadas. · Debe quedar: la narración expande cada una la primera vez que
   suena y después puede abreviar, y las marcas mantienen la forma corta, que
   es como se resolvió lo mismo en el veredicto del 31-10-2026. Para SENAPRED y
   SERNAGEOMIN, su nombre completo ("el Servicio Nacional de Prevención y
   Respuesta ante Desastres, SENAPRED"; "el Servicio Nacional de Geología y
   Minería, SERNAGEOMIN"). Para ECOH el informe no trae la forma larga, así que
   no la inventes: basta decir qué es con las palabras del propio informe, que
   la llama fiscalía especializada ("fiscal jefe ECOH Metropolitano", línea
   15), por ejemplo "la fiscalía especializada en homicidios, la ECOH".

6. Dónde: línea 3, "Carátula sugerida: ¿Qué cargos enfrentarán? / Caso Martín
   Pérez", y línea 1, "Título sugerido: Caso Martín Pérez: las audiencias que
   definirán los cargos". El hecho de la portada depende de un delito, el
   secuestro y homicidio (informe, líneas 11 y 13), y ese dato no está ni en el
   gancho ni en el título: solo aparece en la descripción de la línea 2, que es
   el cuerpo. · Regla: "EL GANCHO NOMBRA DE QUÉ SE TRATA (23-10-2026,
   Santiago): (...) si el hecho depende de un delito o de un grupo, ese dato va
   en el gancho o en el título, no solo en el cuerpo". · Debe quedar: el delito
   nombrado en la línea 3 o en la línea 1, con las palabras del informe. Sirve,
   contado y verificado contra el máximo de cuatro palabras por línea:
   "Carátula sugerida: ¿Qué cargos enfrentarán? / Secuestro de Martín Pérez"
   (tres palabras la primera línea, cuatro la segunda), que mantiene la
   pregunta que pide la primera carátula y el objeto de la noticia.

7. Dónde: línea 5, "Carátula 3: Audiencias el lunes / Caso Martín Pérez". No es
   una cifra ni un giro, es el dato de cuándo, y su segunda línea repite palabra
   por palabra la segunda línea de la carátula de la línea 3, así que las tres
   carátulas no son tres enfoques distintos. · Regla: "Las tres son enfoques
   distintos: la primera, una PREGUNTA; la segunda, una CONTRADICCIÓN o un
   giro; la tercera, una CIFRA CON REFERENCIA (solo si la cifra se entiende en
   un segundo sin contexto) o un segundo giro si no hay cifra". · Debe quedar:
   una cifra con su referencia, de las que el informe trae y se entienden en un
   segundo. Sirve, contado y verificado contra el máximo de cuatro palabras por
   línea: "Carátula 3: Solo uno en prisión / Cinco fueron detenidos" (cuatro
   palabras y tres), que es el uno de cinco en prisión preventiva del informe
   (línea 13), no repite ninguna línea de las otras dos carátulas y no sube el
   gancho con morbo. Si prefieres otra cifra del informe, que no sea el rescate
   de los cincuenta millones: ese gancho queda pegado a la muerte de la víctima
   y rompe la revisión de monetización.

Observaciones:
- Para el día: el largo del guion no está en discusión, pero el número que
  imprime el script sigue sin ser el que manda. `node
  scripts/validar-tarjetas.js` dice 427 palabras narradas, y su filtro (línea
  90 de `scripts/validar-tarjetas.js`) descarta toda línea que empiece con
  corchete, así que deja fuera las cuatro [TESIS], que el prompt declara
  narradas ("Sí se narra"). Suman 58 palabras contadas (16, 12, 14 y 16), así
  que lo que de verdad se oye son 485. Hoy no cambia nada porque los dos
  números caen dentro de 420 a 600, y por eso no es corrección. Es la segunda
  edición seguida con la misma nota (está igual en
  `contenido/veredictos/2026-10-31-guion_informe.md`), y buscada explícitamente
  en `bitacora/PENDIENTES.md` ("narradas", líneas 30, 212 y 1708): lo anotado
  ahí es el filtro angosto de la línea 153, no la exclusión de las [TESIS] del
  conteo de la línea 90. El reparto verificado de hoy: noticia del día 29,
  apertura 26, portada 135, Atacama 142, alertas 96, cierre 57.
- El tope de "máximo tres cifras habladas por bloque" vuelve a aparecer, y en
  `contenido/veredictos/2026-10-13-guion_informe.md` quedó dicho que la regla
  no define si cuentan las fechas ni las menciones repetidas, y que por eso
  ese día no bloqueó con cinco cifras en un bloque. Hoy sí bloquea, y la
  diferencia no es de criterio: seis cifras siguen siendo el doble del tope
  descontando los años y sin contar dos veces ningún valor, así que la
  ambigüedad no alcanza para salvarlo. La petición de aquel veredicto sigue
  en pie: conviene zanjar en `prompts/guion-informe.md` si cuentan fechas y
  repeticiones, y no decidirlo corrida por corrida.
- El bloque de alertas queda en 96 palabras narradas, catorce bajo el reparto
  orientativo de 110 a 160. No bloquea, el reparto es orientativo, y la
  corrección 5 le suma palabras al expandir las dos siglas en esa misma zona.
- El cierre abre con "La jornada deja audiencias pendientes...", y el prompt
  nombra "la jornada deja..." entre las síntesis abstractas que evita. No es
  incumplimiento: la regla prohíbe que un bloque TERMINE en síntesis abstracta,
  el cierre termina con el tagline, y la frase nombra hechos concretos
  (audiencias pendientes, obras en Atacama, diez comunas bajo Alerta Roja),
  que es justo lo que el punto 8 del cierre pide. Queda anotado porque es una
  fórmula que el propio prompt cita, y la regla anti plantilla pide variar la
  formulación entre días.
- La [TESIS] de "La noticia del día" dice "las audiencias continúan el lunes"
  donde el informe da la fecha, 02-11-2026 (su línea 17). No bloquea: la
  narración de la línea 12 sí dice "el dos de noviembre", el lunes es correcto
  (comprobado: 02-11-2026 cae lunes, igual que el "domingo primero de
  noviembre" de la apertura, el "viernes treinta" y el "sábado treinta y uno"
  de la línea 26), y la regla de fecha exacta nombra "esta semana", "hace unos
  días" y "recientemente". Pero esa tesis es la tarjeta grande y viaja sola en
  pantalla, donde el día de la semana no dice de qué semana.
- La proyección de que la mayor ejecución se concentrará en 2027 (línea 44)
  sale de la línea 53 del informe, que acredita "Ministerio de Economía y
  BID". Economía está en la lista "Fuentes:" (línea 64) y el Banco
  Interamericano de Desarrollo no. No lo pido en las correcciones porque la
  frase narrada es la proyección del Gobierno y no la estimación del BID, que
  no se narra, pero si en la corrección 1 se toca la lista, es la tercera línea
  que conviene mirar (informe, línea 195: "- Banco Interamericano de
  Desarrollo, 29-10-2026.").
- MOP se pinta en las marcas de las líneas 33 y 36 sin expandir, y no entra en
  la corrección 5 porque la narración de la línea 38 dice el nombre completo,
  "El Ministerio de Obras Públicas", que es el estándar que fijó el veredicto
  del 31-10-2026 (expandir en la narración, marcas en forma corta).

Verificado además, para que no se abra una vuelta por algo que ya está bien:
`node scripts/revisar-mecanico.js` imprimió "sin hallazgos mecánicos"; cero
rayas largas y cero rayas medias en el archivo completo; la selección es la que
manda el prompt, con cuatro noticias [A] en el informe (líneas 11, 47, 95 y
141) y por tanto la portada primero y las dos [A] siguientes en el orden del
informe, Atacama y las alertas, con el ébola quedándose en la web; tres bloques
de noticia y ni uno más, sin "En titulares", sin Dato curioso, sin Agenda y sin
"¿En qué quedó?"; las tres categorías existen y son las que el tema pide
(`seguridad`, `economia` y `emergencia`, que es la correcta porque hay alerta
declarada y no pronóstico); los bloques de estructura no llevan corchete; "La
noticia del día" va antes de la Apertura, con su [FUENTE], una sola marca de
tarjeta y 29 palabras dentro de 25 a 35, y su párrafo son dos frases; la
apertura sitúa la fecha y adelanta las otras dos noticias en 26 palabras,
dentro de 25 a 40; las cuatro [TESIS] tienen 16, 12, 14 y 16 palabras, bajo el
máximo de 18, y cada una lleva su línea en blanco antes del párrafo; el
[ESQUEMA] de la línea 28 cubre la noticia de proceso que obliga a tener uno, y
es el único; las cuatro marcas [DATO] llevan su valor en numerales con unidad
pegada y el monto completo sin redondear, y sus etiquetas, listadas una por
una, tienen contexto y entre cinco y seis palabras, dentro de 3 a 8 ("rescate
exigido por los captores", "inversión en reconstrucción de Atacama 2026-2028",
"inversión por habitante censado de Atacama", "comunas metropolitanas bajo
Alerta Roja"); ninguna marca lleva un dato que el informe no traiga, y los
valores calzan con el informe ($50 millones en su línea 15, $115.152 millones
en la 49, $384.892 en la 55, las diez comunas en la 99); las cifras grandes se
narran redondeadas y con tope de tres cifras significativas ("más de ciento
quince mil millones", "unos trescientos ochenta y cinco mil pesos"); el título
no trae número, así que la regla de la cifra del título no aplica; el clima de
carátula es `policial`, una de las seis que el generador reconoce, y calza con
una portada de fiscalía y tribunales; la descripción sugerida son tres frases,
resume la jornada completa con las tres del video y otras tres del día, y no
trae lista de fuentes ni enlace; ningún bloque de noticia termina en síntesis
abstracta (los tres cierran con un hecho); no quedan conectores de ensayo
escrito; no hay comparativo ni superlativo que el informe no traiga; no hay
tema narrado dos veces ni frase que narre ausencia de noticias; las diez
comunas son exactamente las diez del informe; el cierre tiene 57 palabras
dentro de 40 a 60, dice que el informe completo está en el enlace de la
descripción, integra la línea "Para salir hoy" del informe (su línea 253) y
termina con el tagline exacto "El resumen sin gritos."; y la ruta del archivo
es la que manda el contrato.
