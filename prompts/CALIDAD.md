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
6. **Oralidad (guiones)**: suena a persona que cuenta, no a texto leído; TESIS cortas; agenda sin trámites.
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
