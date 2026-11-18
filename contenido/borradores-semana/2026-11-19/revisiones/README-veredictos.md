# Veredictos del revisor independiente (Sonnet, 17-11-2026)
Rúbrica: `/home/santiago/projects/yt/_propuestas/criterios-entender-chile.md` (el repo aún no tiene `docs/CRITERIOS-GUION.md`). Umbral: bloqueantes OK, promedio >= 4, ningún criterio < 3. Máximo 2 rondas.
Resultado: **las 3 piezas quedaron RECHAZADAS tras la ronda 2**, por eso viven aquí y no en `contenido/semana/` (`producir.mts` solo lee `contenido/semana/`). Tras la ronda 2 se aplicaron los cambios que pidió cada revisor, SIN ronda 3: hay que revisarlas de nuevo antes de moverlas a `semana/`.

| Pieza | R1 promedio / criterio más débil | R2 promedio / criterio más débil | Bloqueantes R2 |
|---|---|---|---|
| 2026-11-24-short-desempleo-regiones | 3,4 / 3 (gancho, claridad, cierre, referente); B2 y B5 fallaban | 3,71 / 3 (claridad, cierre) | todos OK |
| 2026-11-25-short-mineria-contra-el-resto | 3,0 / 2 (equilibrio, cierre); B2 y B3 fallaban | 3,57 / 3 (claridad, cierre, referente) | todos OK |
| 2026-11-25-largo-recesion-tecnica-dos-centesimas | 3,57 / 3 (gancho, cierre, referente); B2 fallaba | 3,86 / 3 (cierre); B2 falla leve | B2 leve |

## Lo que objetó la ronda 2 (y qué se hizo después)
- Short 24-11: gancho con relleno y "llegó a" (ahora "Dos regiones de Chile, el mismo trimestre..."), mecanismo "trimestre móvil" ausente de la voz (agregado), selección de 4 regiones poco clara (agregado), remate plano (ahora hace bucle con el gancho). ~140 palabras habladas: medir la duración con la voz real.
- Short 25-11: faltaba decir que el 2 % es sin ajuste y el 0,8 % es la serie ajustada contra un año antes (agregado); el rótulo "SIN MINERÍA: +2 %" contradecía la voz (ahora "RESTO: +2,0 %"); "por eso" como causa única (quitado); remate plano.
- Largo: remate lógicamente incorrecto, "nadie discute" absoluto, "la hubo igual" sin fechar, "sin la minería, creció" sin acotar a agosto-septiembre, "el desempleo sube" para Aysén sin dato de variación, juicio no atribuido, pregunta-cebo, "el Gobierno proyecta" (era Quiroz). Todo cambiado. **Pendiente (no se puede hacer antes del 18-11):** que el cap. 4 diga qué publicó el Banco Central el 18-11 (obligatorio) y reemplazar la estimación del tercer trimestre (cap. 2).
- Los revisores confirmaron en la web: Ñuble 11,8, Aysén 4,0, Antofagasta 6,7, Biobío 10,5 (fichas INE); nacional 9,8 / +1,3 pp / RM 10,4 +1,6 pp (INE 29-10); Imacec septiembre y agosto (Emol); T1/T2 (Emol 18-08, DF 11-11); posturas de Vergara, Lehmann y Quiroz; IPC octubre; TPM 4,5 % por unanimidad el 27-10 con pausa desde dic-2025; desocupación jun-ago 9,6 %.
- No confirmado contra la fuente primaria: la página del Banco Central no cargó (el 0,8 % no minero ajustado se apoya en Emol, MCh y Portal Innova); el 8,5 % de jul-sep 2025 sale de 9,8 − 1,3.

## Ronda 3 (Sonnet, 18-11-2026)
El largo se reescribió entero al plan B con las Cuentas Nacionales del 18-11 (ver `verificacion-24-25.md`, sección ACTUALIZACIÓN). Los Shorts recibieron cambios de la ronda 3 y se re-revisaron.
| Pieza | Resultado | Promedio / criterio más débil | Dónde queda |
|---|---|---|---|
| 2026-11-24-short-desempleo-regiones | **APRUEBA** (ronda 3 dio 3,71 y se corrigió; revisión final) | 4,00 / parecido al referente = 3 (cierre 5, claridad 4) | `contenido/semana/2026-11-19/` |
| 2026-11-25-largo-el-cobre-que-no-salio (ex "recesión técnica") | **APRUEBA** tras 1 reescritura (1.ª pasada 3,1, cierre 2; final 4,14) y 3 correcciones mecánicas pedidas (aplicadas y revisadas por el generador) | 4,14 / varios en 4 (gancho, ritmo, sobriedad, cierre, referente); claridad 5 | `contenido/semana/2026-11-19/` |
| 2026-11-25-short-mineria-contra-el-resto | **RECHAZADO** (3,57 → 3,86 tras la corrección; umbral 4) | 3,86 / gancho = 3 y referente = 3 | queda en `borradores-semana/` |
Short minería: el revisor final pidió abrir con la paradoja y cotejar el 0,8 %. Ambos cambios YA están aplicados en el borrador (gancho "En septiembre la minería cayó 12,1 % y, aun así, el Imacec subió…"; atribución al Banco Central en la escena 1), pero la regla ("una corrección y una última revisión") se agotó: NO se movió. Con esos dos cambios el revisor estimó 4,0. Falta una revisión que lo confirme (o la decisión de Santiago) y mover el JSON a `semana/`.

## Ronda 4 (Sonnet, revisor independiente, 18-11-2026) · Short minería contra el resto
**NO APRUEBA** (promedio 3,86; umbral 4). No se movió ni se corrigió; sigue en `borradores-semana/`.
Notas: gancho 4 (abre con la paradoja; sin persona dentro) · claridad 4 · equilibrio 4 · ritmo visual 4 · sobriedad 4 · cierre 4 (bucle con el gancho; el lema lo pone `tokens.ts`) · parecido al referente 3. Promedio 27/7 = 3,86; ninguno < 3.
Máquinas: `validar.mts` OK; `verificar-cifras.mts` "TODAS LAS CIFRAS CUADRAN".
Fuentes reabiertas hoy (Emol, Imacec septiembre, 02-11): -12,1 % minería y "menores leyes del mineral y la suspensión temporal de faenas" CONFIRMADOS (la causa de septiembre ya no es solo un resultado de búsqueda). Emol dice "no minero creció 0,9 % mensual y 0,8 % anual" y NO dice que sea desestacionalizado.
Bloqueante parcial (B1/B2): la escena 1 afirma "Según el Banco Central ... ajustado por estación, el resto creció 0,8 %". Que sea serie desestacionalizada es una inferencia (el 0,9 % mensual solo existe en esa serie; el total desestacionalizado en Emol es -0,9 % anual), no algo que la fuente leída diga, y el comunicado primario no se abrió. Atribuirlo al Banco Central como hecho es más de lo que se verificó.
Vigencia: coherente con el largo del mismo día (ambos usan -12,1 % y +2,0 % de septiembre; el Short reenvía al largo con PIB -1,1 % y minería -14,7 %, sin contradecirlo). Aun así, el 25-11 el Imacec de septiembre (publicado el 02-11) es noticia vieja frente al PIB del 18-11, y el gancho pierde fuerza; la escena 3 no dice "contra un año antes" para el -1,1 %.
Cambios que subirían a >= 4: (1) abrir el comunicado del Banco Central o retirar "ajustado por estación" (decir solo "según Emol, con datos del Banco Central, 0,8 % anual en la serie no minera" o quitar la cifra); (2) en la escena 3 decir "contra el mismo trimestre de 2025"; (3) un gancho con persona o consecuencia concreta, para acercarlo al referente.
