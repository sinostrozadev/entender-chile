# Propuesta: el Taller

**Pedido de Santiago (14-09, y de nuevo el 20-09: "dale una vuelta al taller").**
Con sus palabras: el lugar donde se leen, evalúan y mejoran los prompts, y donde
se definen y configuran los distintos flujos; mezcla de taller técnico y
taller estratégico, para evaluar estrategias, ver qué resulta y qué no,
carátulas, títulos, imágenes. Además, CLAVE 4 lo necesita para sus dos
aprobaciones (elegir el tema, aprobar la idea) y CARÁTULA 2 para la imagen
por tema.

Estado: PROPUESTA. La fase 1 se construyó la noche del 20-09 como página de
lectura con datos reales, para que Santiago la vea y decida: https://claude.ai/artifact/2WH2fioUJK7tQHrKbXtBfw

## 1. Qué es, en una frase

**El Taller es donde se mira lo que salió, se mide qué resultó, se decide qué
probar y se mejora el prompt que lo produce.** El panel dice cómo va la
máquina; el Taller dice cómo mejora el canal. Son dos usos de la misma
página.

## 2. Lo que aprendimos de lo que ya existe

- El Taller de hoy (`taller/`, 02-09) es un navegador y editor de prompts con
  diff y borradores. Sirve para cambiar texto, no para ver ni medir. Y desde
  MODO 1 la sesión de día edita prompts directo con el sí de Santiago, así
  que el editor perdió su razón de ser.
- Lo que sí funcionó como taller: el tablero de carátulas del 05-09 (14
  propuestas lado a lado, decisión en el día) y el del 20-09 (tres ediciones,
  cuatro variantes cada una, decisión en minutos: "me gusta, y cobre y
  tinta"). Lo que no funcionó: la vuelta 2 de bocetos del 05-09, sin
  imágenes renderizadas, sin decisión en dos semanas.
- Conclusión: **sin render no hay decisión**, y **sin métrica al lado no hay
  evaluación**. El Taller tiene que traer las dos cosas.

## 3. Los cinco módulos

| Módulo | Pregunta que responde | De dónde sale | Quién actúa |
|---|---|---|---|
| **Ver** | ¿Qué salió hoy y en los últimos días? | carátulas del release, primer cuadro, título, la vista del estado | Santiago mira |
| **Medir** | ¿Qué resultó? | métricas diarias: vistas, fuentes de tráfico, curva de retención por video | nadie: son datos |
| **Experimentos** | ¿Qué estamos probando y cuándo se decide? | `bitacora/experimentos.json` | la auditoría cuenta los días; Santiago cierra |
| **Decidir** | ¿Qué tema de Clave, qué idea, qué variante? | banco de temas, fichas de idea, tableros de variantes | **Santiago, desde el teléfono** |
| **Mejorar** | ¿Qué prompt cuesta correcciones y por qué? | veredictos por pieza (vueltas), hallazgos repetidos de la auditoría, historial de cada prompt | la sesión de día propone; Santiago aprueba |

Y **Flujos**, que no es módulo sino mapa: para cada flujo (diario, Clave,
exprés) sus etapas, quién actúa en cada una y con qué prompt. Hoy vive en
`bitacora/cronograma.json` y en `scripts/estado.js`; el Taller lo dibuja.

## 4. La columna vertebral: los experimentos

Cada cambio visible del canal es un experimento con esta ficha:

    id · hipótesis · qué cambió (archivos) · desde · métrica que lo juzga ·
    cuántos días (regla 26: dos semanas) · veredicto

Un cambio a la vez por métrica: si no, nada se puede atribuir. La auditoría
de la mañana lee el registro y dice cuántos días le faltan a cada prueba; al
cumplirse, propone el veredicto con los números, y Santiago cierra. Hoy
corren tres: la carátula v3 (desde el 21-09, métrica: vistas de largos y
CTR), la apertura en frío (desde el 03-09, métrica: audiencia al 5%, que
recién desde hoy se mide), y el título fórmula A del Short (desde el 05-09).

## 5. Dónde vive y cómo vuelven las decisiones

**Una página, generada desde el repo.** Como el panel: un script
(`scripts/taller.js`) lee el repo y escribe un HTML con todo adentro;
la sesión de la mañana lo republica como artifact privado junto al panel (o
en su lugar: propongo fusionarlos, dos pestañas). El repo sigue siendo la
única verdad; la página es una vista.

**Las decisiones vuelven al repo, no se quedan en la página.** Dos caminos,
por fases:

- **Fase 1, ya:** la página es de lectura y las decisiones se toman en el
  chat con la sesión de día (MODO 1: el día propone, Santiago dice sí, el
  día ejecuta y anota). Es lo que hicimos hoy con la carátula.
- **Fase 2, con botones:** la página escribe en el repo con el conector de
  GitHub del visitante (el artifact puede llamar conectores de claude.ai con
  las credenciales de quien mira). Un botón "Elegir tema" crea
  `contenido/claves/flujo/<slug>/decision.md`; "Aprobar idea" lo actualiza;
  `estado.yml` lo lee y despierta a quien toque. Sin sesión de Claude en el
  medio: Santiago aprieta, la máquina sigue. Requiere probar las tools del
  conector con una llamada real antes de confiar en ellas, y una convención
  de archivos de decisión que el estado entienda.

## 6. Plan por fases

1. **Lectura (esta noche):** Ver, Medir, Experimentos, Mejorar, Decidir en
   solo lectura, Flujos. Datos reales. Se publica y Santiago lo comenta.
2. **Decidir con botones:** el flujo de la Clave (CLAVE 4 c-d-e): lista de
   temas con "Elegir", ficha de idea con "Aprobar", y los tableros de
   variantes con "Esta". Convención de decisiones en el repo + `estado.yml`.
3. **Ver con historia:** las carátulas y el primer cuadro de cada día salen
   del release (desde el 21-09 el release trae las tres carátulas); la
   página los muestra siete días para atrás, con sus vistas al lado.
4. **Experimentos en la auditoría:** la rutina de las 05:30 lee
   `experimentos.json` y dice cuántos días faltan y cómo va la métrica.
5. **Retirar el editor** (`taller/`) o dejarlo como módulo "Archivos" de
   solo lectura.

## 7. Lo que decide Santiago

1. ¿Panel y Taller son una sola página con pestañas? (Recomiendo que sí.)
2. ¿Las decisiones con botón van por GitHub desde la página (fase 2), o
   seguimos por el chat con la sesión de día?
3. ¿Qué se retira del Taller viejo?
