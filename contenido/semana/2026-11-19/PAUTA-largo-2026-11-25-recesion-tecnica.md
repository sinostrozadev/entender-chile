> **ACTUALIZADO 18-11-2026 (mediodía): SE USÓ EL PLAN B.** Con las Cuentas Nacionales del 18-11 el 2.º trimestre quedó en 0,0 % interanual y +0,1 % contra el trimestre anterior (La Tercera): ya no hay recesión técnica ni "dos centésimas". El largo aprobado es `2026-11-25-largo-el-cobre-que-no-salio.json` ("El cobre que no salió: por qué el PIB de Chile cayó 1,1 %"), ya en esta carpeta. El resto de esta pauta es el borrador histórico.

# Largo del miércoles 25-11-2026, 19:00: "¿Recesión técnica por dos centésimas? Qué significa para ti"

Estado (17-11-2026): **borrador de guion escrito pero NO aprobado**: `contenido/borradores-semana/2026-11-19/2026-11-25-largo-recesion-tecnica-dos-centesimas.json`
(plantilla `tesis`, 1.533 palabras habladas, 4 capítulos; pasa `validar.mts`, `verificar-cifras.mts` y `tsc`). El revisor independiente lo rechazó
dos rondas seguidas (promedio 3,57 y 3,86; criterio más débil: cierre = 3; ver `contenido/borradores-semana/2026-11-19/revisiones/README-veredictos.md`),
así que NO está en `semana/` y `producir.yml` no lo produce. Se escribió **antes** de las Cuentas Nacionales del 18-11-2026 08:30. Fuentes y URLs:
`contenido/borradores-semana/2026-11-19/verificacion-24-25.md`. Se regenera con `python3 -I contenido/borradores-semana/2026-11-19/generar-24-25.py`.
Título distinto de esta pauta: "¿Recesión técnica por dos centésimas? Qué cambia y qué no", porque hay dos reglas de medida y el canal no toma partido.
Para publicarlo: hacer los pasos de abajo, pasar una ronda 3 con el revisor y recién entonces mover el JSON a `contenido/semana/2026-11-19/`.

## ACTUALIZAR EL 18-11 (después de las 08:30, antes de fusionar la rama)
1. Abrir las Cuentas Nacionales (bcentral.cl) y anotar: PIB del 3.er trimestre, y 1.er y 2.º trimestre revisados, contra el trimestre
   anterior (con decimales, si el Banco Central o un medio los da) y contra un año antes.
2. **Si el 2.º trimestre quedó en 0,00 % o más contra el trimestre anterior** (ya no hay caída por esa regla): el gancho, el rótulo
   (`¿RECESIÓN POR 0,02 %?`), la miniatura, el número que nadie mira y el título pierden sentido. Usar el plan B de abajo el mismo día,
   o rehacer el gancho con la regla interanual. No fusionar con el guion actual.
3. Si las caídas se mantienen (aunque cambien centésimas): actualizar en `generar-24-25.py` los datos `R_PIB`, `R_PIBR`, `R_PIBA`, `R_REV`,
   `R_PIBA3` y los textos que repiten esas cifras (gancho, cap. 1 escenas 2 a 4, cap. 2 escena 4, número que nadie mira, remate),
   regenerar, y correr `validar.mts`, `verificar-cifras.mts` y `tsc --noEmit`.
3b. **Obligatorio:** cap. 4, escena 1 debe decir qué publicó el Banco Central el 18-11 (PIB del 3.er trimestre y revisiones) con las cifras reales; hoy solo dice que "ya salió". Revisar también "la hubo igual" (gancho), "se volvieron a revisar" (cap. 1), "12 veces menos" (número que nadie mira), "con la actividad frenada" (cap. 3) y la descripción de la publicación.
4. Cap. 2, escena 4 ("el tercer trimestre estimado en 0,8 % anual"): reemplazar por el dato publicado el 18-11. Cap. 4, escena 1: ya dice
   que el dato "ya salió"; añadir qué dijo si se quiere.
5. Si cambia el titular de la carátula, ajustar el pedido `contenido/urgente/PEDIDO-ec-recesion-tecnica.md` antes de enviarlo.
6. El render toma unos 12 minutos: hay margen hasta el martes 24-11.

## Los dos datos dudosos de la propuesta: confirmados con matiz (verificacion.md §6)

1. **Jorge Quiroz, ministro de Hacienda, reconoció la recesión técnica el 11-11-2026** (no el 12-11), en una
   entrevista con Bloomberg publicada por DF: "Se le puede llamar técnicamente una recesión". En agosto la negaba
   con la serie desestacionalizada (Emol, 18-08-2026: "Fueron -0,3% ... y 0%").
2. **Dos trimestres seguidos de caída del PIB desestacionalizado**: T1 2026 −0,25 % y T2 2026 −0,02 % (el Banco
   Central publica −0,3 y 0,0). La segunda caída es de dos centésimas.

**Regla del 18-11:** si la revisión mantiene las dos caídas, o si el T3 también cae, el largo sale como está
(actualizando cifras). Si la revisión deja el T2 en 0,00 o más, **ya no hay recesión técnica** y se usa el plan B
el mismo día y a la misma hora.

## Estructura (4 capítulos, 10 a 12 min, 2 cortes publicitarios)

- **Gancho (0 a 15 s)**: "Chile entró en recesión técnica por dos centésimas." Gráfico de barras de los
  trimestres (desestacionalizado, contra el trimestre anterior) que ya se mueve en el frame 0; rótulo
  "−0,02 %". Promesa antes de los 20 s: "Al final vas a saber qué es una recesión técnica, por qué pasó y qué
  cambia en tu sueldo, tu crédito y tu bencina."
- **Cap. 1, qué es y qué no es** (mapa de Chile entero + barras trimestrales): la definición de dos
  trimestres; por qué el Banco Central la redondea a 0,0; Quiroz en agosto contra noviembre. Giro: el PIB del
  año está casi igual al del año pasado; no es una crisis, es un estancamiento.
- **Cap. 2, por qué pasó** (mapa con Antofagasta, Tarapacá, Atacama y O'Higgins resaltadas + barras minero
  contra no minero): Imacec de septiembre +0,2 % anual, minería −12,1 %, no minero +2,0 % (Banco Central vía
  Emol, 02-11-2026); Quiroz: el cobre resta "un punto" directo y entre 1 y 1,5 en total (Emol, 17-09-2026).
  Giro: sin la minería, la economía crece.
- **Cap. 3, cómo llega a tu casa** (líneas): desempleo 9,8 % en julio a septiembre, el más alto desde mayo de
  2021 (INE vía Emol, 29-10-2026); dólar a $984,8 el 10-11-2026, su mayor alza diaria desde el 05-06 (confirmar
  abriendo La Tercera o mindicador.cl); diésel con seis alzas seguidas desde julio y el proyecto de congelamiento
  (Short del 19 y del 23-11). Giro: la expectativa de crecimiento 2026 cayó de 2,5 % en enero a 0,0 % en
  noviembre (Short del 21-11).
- **Cap. 4, qué mirar** (iconos con fechas): Cuentas Nacionales del 18-11 (ya publicadas cuando salga el
  video: decir qué dijeron), tasa de política monetaria en 4,5 % y reunión del martes 15-12-2026, desempleo del
  trimestre agosto a octubre. Significado sin consejo financiero.
- **Remate simétrico** + pregunta que abre el siguiente largo.

## Plan B (verificado, mismo día): "El cobre que no salió: cómo la minería frenó a Chile en 2026"

Imacec minero −12,1 % contra +2,0 % no minero; producción de cobre bajo 5 millones de toneladas, la más baja
en más de 20 años (DF/Bloomberg, 11-11-2026); Quiroz: el cobre resta 1 a 1,5 puntos; desempleo 9,8 %. Mapa de
las regiones mineras. Antes de nombrar faenas suspendidas, confirmarlas con Cochilco o Codelco.

## Carátula (skill `caratulas-con-gpt` §2b)

Foto o gráfico héroe a sangre: dos barras rojas bajando sobre fondo marino; sujeto nombrado "CHILE" en la
línea 1 y caja cobre "RECESIÓN TÉCNICA" en la línea 2, con "¿Y AHORA?" pequeño; esquina inferior derecha
libre. Pedido: `contenido/urgente/PEDIDO-ec-recesion-tecnica.md` con `Salida:
contenido/caratulas/listas/2026-11-25-largo-recesion-tecnica.png` (lo deja quien escriba el JSON).
