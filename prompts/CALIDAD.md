# Calidad editorial: rúbrica y bitácora de iteración de prompts

Cada mañana se evalúa la edición del día con esta rúbrica y se anotan aquí
los hallazgos y los cambios aplicados a los prompts. Objetivo: que nadie
pueda decir "esto lo escribió una máquina" - por estilo, no por datos.

## Rúbrica (0-3 cada una; meta: todo en 3)

1. **Precisión y fuentes**: cifras, fechas y nombres con fuente; nada inventado.
2. **Jerarquía**: lo importante primero y con más desarrollo; cero relleno de cuota.
3. **Escala humana**: al menos un ejemplo concreto para una persona por [A] económica/social.
4. **Silueta variable**: las noticias no repiten la misma estructura ni los mismos cierres.
5. **Cero tics de generación**: sin "es relevante porque", sin "no solo X sino Y" repetido, sin cierres abstractos, sin conectores de ensayo en lo hablado.
6. **Oralidad (guiones)**: suena a persona que cuenta, no a texto leído; TESIS cortas; agenda sin trámites; cifras grandes redondeadas en voz (tres cifras significativas, "más de..."; el número exacto va en la tarjeta), regla del 04-09.
7. **Marca**: tagline al cierre; "Para salir hoy" integrada.

## Bitácora

### 2026-08-25 (primera edición 100% automática)
**Precisión** 3/3: la revisión de las 4:40 solo encontró hallazgos menores.
**Jerarquía** 2/3: agenda y "Además, hoy" rellenados con trámites (webinar
AGROMET, charla UAI, resolución de un concurso de estudios) para cumplir el
"3 a 5 hitos" del prompt.
**Escala humana** 0/3: el 0,9% de la CRP nunca se tradujo a pesos para un
sueldo concreto. Es el dato que faltaba para que la apertura se sintiera real.
**Silueta variable** 1/3: todas las [A] con la misma forma (párrafo, párrafo,
Contexto, Clave) y todas cerrando en abstracción.
**Tics** 1/3: "no solo... sino" tres veces; "La cifra es relevante porque";
"La evolución colombiana importa especialmente a Chile por"; cierres tipo
"marca el momento en que una de las piezas estructurales empieza a
funcionar"; en el guion, "por tanto", "la jornada deja algo bastante
concreto: decisiones que parecían legislativas...".
**Oralidad** 2/3: buenos recursos ("Y acá está la diferencia importante"),
pero TESIS de 35-40 palabras (tarjeta ilegible) y agenda narrada completa.
**Marca** 1/3: faltó el tagline y faltó "Para salir hoy" en la despedida.

**Veredicto**: se nota que es generado, no por los datos (excelentes) sino
por la silueta uniforme, los cierres abstractos y la ausencia de escala
humana. **Cambios aplicados hoy** en informe.md, guion-informe.md,
claves.md y guion-claves.md: bloque ESTILO ANTI-PLANTILLA (relevancia no se
declara, "no solo/sino" 1 vez, silueta variable, cierres concretos, escala
humana obligatoria, incisos sin guiones), agenda y [C] sin relleno, TESIS
de 18 palabras, registro oral sin conectores de ensayo, tagline al cierre
y controles nuevos 14-16 en el guion. Mañana se mide contra esta misma
rúbrica.

### 2026-08-26 (primera edición con los prompts anti-plantilla)
**Precisión** 3/3: revisión de las 4:40 APROBADA, hallazgos menores.
**Jerarquía** 3/3: agenda con 2 hitos reales (sin webinars), "Además, hoy"
con 2 noticias útiles (aguinaldo de pensionados). El relleno desapareció.
**Escala humana** 2/3: EXCELENTE en la apertura ($800.000 → $28.000 y
$7.200, "sin descontarse del sueldo líquido") y en subsidios (239 millones =
2.988 subsidios de $80.000). Pero se sobreaplicó: "costo de reconexión para
el usuario, $0" es trivial, y "US$400 millones sobre una base hipotética de
100.000 empleos" inventa el denominador. Ajuste aplicado hoy: base real o
no hay cálculo.
**Silueta variable** 2/3: mejor; la [A] previsional cierra en Contexto, no en
Clave, y aparece el primer [ESQUEMA] (escalones 1% → 3,5% → 8,5%). Todavía
se nota la plantilla en las [B].
**Tics** 3/3: cero "no solo/sino", cero "es relevante porque", cero "por
tanto". Cierre en una frase concreta.
**Oralidad** 3/3: "Llevémoslo a un sueldo concreto." TESIS de 12-18
palabras. Un tic nuevo: el narrador dijo "el informe usa una comparación
puramente ilustrativa" (habla del documento al aire). Ajuste aplicado hoy.
**Marca** 3/3: "Para salir hoy" integrada y "El resumen sin gritos." cerrando.

**Veredicto**: salto grande en un día. Lo que ayer delataba a la máquina
(relleno, abstracción, ausencia de escala humana, cierre sin marca) se fue.
Queda pulir la sobreaplicación de la escala humana y la silueta de las [B].
**Incidencia**: GPT no entregó el guion de la Clave (tarea 4 no corrió) y
generar.js frenó el render del informe por eso; corregido: el informe manda,
la Clave se omite con aviso.

### Regla de revisión, alineada (29-08-2026)

Doce de los catorce hallazgos de las cuatro primeras revisiones eran el
mismo: "el guion omite un dato que está en el informe". Esa regla quedó
desalineada cuando se decidió (28-08) que el video narra solo las [A] y
[B] y que las [C] viven en la web: desde entonces COMPRIMIR ES EL TRABAJO
DEL GUION, y penalizarlo es penalizar lo correcto.

Qué ES hallazgo desde hoy:
1. Una noticia [A] o [B] omitida por completo, o una [C] narrada.
2. Un dato alterado o inventado (cifra, fecha, nombre, cargo, cita).
3. Una omisión que cambia el sentido o pierde precisión de hecho (decir
   "esta semana" donde el informe da la fecha exacta; dar el rango nuevo
   sin el de partida cuando la noticia ES el cambio de rango).
4. Un elemento obligatorio ausente: formato, TESIS por bloque, "Para salir
   hoy" integrada, tagline al cierre, fuentes de lo narrado en "Fuentes:".

Qué NO es hallazgo: que una noticia narrada tenga menos detalle que el
informe. Para eso existe el guion.

### Recalibración por "En titulares" (30-08-2026)

**SUPERADA el 12-10-2026**: el guion del informe narra tres noticias en 3 o 4
minutos y ya no tiene bloque "En titulares" (`prompts/guion-informe.md`;
`estrategia/decisiones.md`, "El informe pasa a 3 o 4 minutos"). Una [A] o [B]
que no esté en el guion ya no es una omisión: el informe completo vive en la
web. Lo que sigue queda como registro de cómo se medía antes.

Desde la edición del 30-08 el informe no tiene tope (es la edición completa
para la web) y el guion recorta: narra las [A] y las [B] más relevantes
hasta 10, y todo lo demás suena como UNA frase en el bloque "En titulares",
penúltima sección antes del cierre. Con eso, la regla 1 cambia:
1. Una noticia [A] o [B] del informe omitida POR COMPLETO en el guion (ni
   narrada ni en "En titulares"), o una [C] DESARROLLADA en la narración
   (las [C] solo pueden aparecer como frase única en "En titulares").
Y a la regla 4 (elemento obligatorio ausente) se suma: el bloque "En
titulares" cuando el informe tiene más noticias que las narradas.
Decidido por Santiago el 29-08 (estrategia/decisiones.md); detalle en
archivo/bitacora/2026-08-29-propuesta-informe-largo.md. Lo que hay que vigilar los
primeros días: que las [A] no se inflen con contexto genérico (la pauta pide
hechos), la duración real con titulares (+45 s estimados por 8 frases) y que
"Además, hoy" no se vuelva basurero.

### 2026-08-29 (primera edición con el embudo completo; guion tardío)
Sin puntaje: la revisión corrió sin guion (llegó a las 09:04 por un bloqueo
de escritura de GitHub en ChatGPT, reintento manual) y no emitió veredicto.
Lo verificable a mano: **Marca** 1/3, el guion cerró SIN "Para salir hoy"
por una lectura truncada del informe (la línea estaba, en la 157, detrás de
33 líneas de bloque interno; desde hoy el bloque interno va al final
absoluto y el contrato exige verificar antes de afirmar una ausencia).
**Jerarquía** 3/3: 3 [A] + 7 [B] + 8 [C], 40 de 40 preseleccionadas con
rastro (22 descartes con motivo). Duración con voz real (Azure, primera
vez): 8,6 min. Primer día en que el barrido alimentó la olla.

### 2026-08-27 (primera edición del embudo con topes)
**Precisión** 3/3: APROBADA; el informe cazó un error en comunicados
oficiales (Ley 21.836 vs 21.748) verificando en la BCN. **Jerarquía** 3/3:
agenda con un solo hito, sin relleno. **Escala humana** 3/3: la regla
funcionó negándose ("no corresponde estimarlo" en Quiborax, sin base real).
**Silueta** 2/3. **Tics** 3/3: cero "no solo", cero conectores de ensayo.
**Oralidad** 3/3: TESIS máx 20 palabras. **Marca** 2/3: tagline sí, pero
"Para salir hoy" NO se integró a la despedida. **19/21.** Duración: 9,7
min, primera vez en rango. SOSER quedó archivado en "Chile en regiones"
siendo plata pública nacional.

### 2026-08-28 (primera edición con preselección; el barrido aún no llegaba)
**Precisión** 3/3: APROBADA; dos de los cuatro hallazgos eran listas de
"Fuentes:" incompletas, y ahí el desalineado era el prompt del guion
(ordenaba listar solo las fuentes de las marcas): corregido hoy. El
hallazgo del rango del PIB sin el rango de partida sí es legítimo (regla
3). **Jerarquía** 2/3: [C] usadas de a dos cuando admiten diez.
**Escala humana** 3/3. **Silueta** 2/3. **Tics** 3/3. **Oralidad** 3/3:
13 TESIS, máx 18 palabras. **Marca** 3/3: tagline y "Para salir hoy"
integrados. **19/21.** Duración: 11,9 min, sobre la promesa de 10; el
tope conjunto de 10 narradas rige desde la edición del 29.

### 2026-09-04 (tarjeta del gancho de la Clave: "544.800 pesos")
La tarjeta automática del gancho mostró "544.800" con la etiqueta "pesos y
formuló un reparo": el conversor pasó "tres mil seiscientos cuarenta
millones quinientos cuarenta y cuatro mil ochocientos" a "3.640 millones
544.800" y el extractor tomó la cola como cifra propia. Además la marca
[DATO] citaba "Informe diario de Entender Chile" como fuente (circular) y
estaba escrita después del párrafo, no antes. Cuatro capas cerradas hoy:
(1) `numerales.js` junta los compuestos con millones y lo prueba en su
autoprueba, que ahora corre en el workflow antes del render; (2) `parse.js`
no crea cifra automática si el número viene detrás de "millones" ni si el
párrafo tiene un [DATO] al lado (antes o después); (3) `validar-tarjetas.js`
avisa por fuente circular y por cifra compuesta partida, y revisa también el
guion de la Clave; (4) `guion-claves.md`: la fuente de una marca es la
primaria y el [DATO] va antes del párrafo.

### 2026-09-04 (regla de redondeo en voz)
Santiago, tras oír el gancho de la Clave: las cifras grandes se narran
redondeadas ("más de tres mil seiscientos millones de pesos"), nunca los
diez dígitos; tantos números seguidos desconcentran y se pierde el hilo.
Tope de tres cifras significativas habladas; el número exacto va a la
tarjeta. Está en `guion-informe.md`, `guion-claves.md`, REGLAS-DURAS (38b) y
`validar-tarjetas.js` avisa por cada cifra exacta larga en la narración.

