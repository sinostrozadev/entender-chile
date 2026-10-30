VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-10-30T05:34:58Z

Correcciones:
1. Dónde: línea 40, "## Alcalde de Río Bueno [plata-publica]" · Regla:
   "Si con eso no llegas a tres, completa con las [B] de mayor peso: las que
   el informe pone en 'En una mirada' y, entre ellas, las que aparecen
   primero" (QUÉ SE NARRA, punto 3) · Debe quedar: el tercer bloque es
   Codelco, no el alcalde de Río Bueno. "En una mirada" (informe línea 5)
   nombra dos [B]: Codelco primero y Coquimbo después; Río Bueno no aparece
   ahí. El bloque se escribe con el material de las líneas 53 a 57 del
   informe (ocho ejecutivos y profesionales de Chuquicamata, Ministro Hales,
   Salvador y la casa matriz; auditoría con posibles duplicidades en
   registros de producción e inventarios de 2024 y 2025; antecedentes al
   Ministerio Público comunicados el 06-10-2026; efecto económico todavía no
   determinado). Arrastra tres cambios: la Apertura (línea 14) anuncia Río
   Bueno y tiene que anunciar Codelco; el cierre (línea 51) nombra "contratos
   municipales" y tiene que nombrar hechos del bloque nuevo; y en "Fuentes:"
   salen "Diario de Valdivia, 29-10-2026" y "Noticias Los Ríos, 29-10-2026",
   que ya no se narran, y entra "Codelco, 06 y 29-10-2026" (La Tercera se
   queda, porque también respalda Codelco). Ojo con el largo: la pieza está
   en 423 palabras narradas y el piso es 420, así que hay que recontar con
   `node scripts/validar-tarjetas.js` después del cambio.
2. Dónde: línea 21, "un poco más de un millón siete mil personas buscando
   trabajo" · Regla: "Tope: TRES cifras significativas habladas por número
   (3.640 millones sí; 3.640.544.800 no; 762 mil sí; 762.326 no)" (REGLA DE
   REDONDEO EN VOZ) · Debe quedar: "un poco más de un millón de personas
   buscando trabajo". "un millón siete mil" son cuatro cifras significativas
   (1, 0, 0, 7). El número exacto ya está en la marca [DATO], que es para
   pantalla.
3. Dónde: línea 10, "| ref: más de un millón" · Regla: "CUÁNDO PONERLA, y es
   lo único que la justifica: cuando lo que hace NOTICIA al dato no es su
   tamaño sino contra qué se mide... Si el dato es noticia por su tamaño y
   nada más, NO la pongas" (REFERENCIA) · Debe quedar: la marca sin la
   referencia, "[DATO cifra | INE, 29 oct] personas desocupadas en Chile:
   1007976 personas (sube mal)". "más de un millón" repite el tamaño de la
   propia cifra en vez de decir contra qué se mide, y el informe no dice en
   ninguna línea que sea la primera vez que se cruza ese umbral, así que la
   versión que sí sería referencia afirmaría una serie histórica que el
   informe no trae.
4. Dónde: líneas 20 y 25, dos marcas "[DATO comparacion | INE, 29 oct]"
   seguidas dentro del bloque "Desempleo supera el millón [economia]" ·
   Regla: "nunca dos tarjetas del mismo tipo seguidas dentro del mismo
   bloque... si el árbol está bien aplicado, deja la cifra sobrante en la
   narración" (VARIEDAD) · Debe quedar: la línea 20 se queda solo con el
   aumento, "[DATO cifra | INE, 29 oct] aumento anual de personas
   desocupadas: 133756 personas (sube mal)". Las 1.007.976 personas ya están
   en pantalla en la tarjeta de "La noticia del día" (línea 10), así que
   repetirlas es la cifra sobrante. La línea 25 queda igual: dos valores de
   cosas distintas con la misma unidad son comparacion.
5. Dónde: línea 28, "[DATO cifra | INE, 29 oct] empleo asalariado formal:
   (baja mal)" · Regla: "Un valor puede ser SOLO el indicador cuando no hay
   cifra pero sí una dirección clara" (INDICADOR) · Debe quedar: "[DATO cifra
   | INE, 29 oct] caída anual del empleo asalariado formal: -2,5% (baja
   mal)". Acá sí hay cifra: el informe, línea 15, dice "El empleo asalariado
   formal retrocedió 2,5%", así que el modo señal no corresponde.
6. Dónde: línea 18, "[TESIS] Chile llegó a 9,8% de desempleo y el empleo
   asalariado formal también retrocedió." · Regla: "Convierte cifras,
   monedas, porcentajes, fechas y abreviaturas a una forma cómoda de
   pronunciar, escribiendo los números en palabras" (EXPLICACIÓN ORAL), y la
   [TESIS] "Sí se narra" · Debe quedar: "[TESIS] Chile llegó a nueve coma
   ocho por ciento de desempleo y el empleo asalariado formal también
   retrocedió." Son diecisiete palabras, bajo el tope de dieciocho. Los
   numerales solo valen en los valores de las marcas, que no se narran.
7. Dónde: líneas 53 a 62, el bloque "Fuentes:" · Regla: "lista una línea por
   cada fuente de las marcas [DATO] y [CITA] Y por cada fuente del informe
   cuyas noticias narraste, tal como aparecen en el informe... una fuente
   cuyo contenido se narró no puede quedar sin crédito" · Debe quedar: se
   agregan dos líneas, "- La Tribuna, 29-10-2026." y "- El País,
   29-10-2026.". La Tribuna respalda en el informe (línea 15) la caída de la
   industria manufacturera y del empleo asalariado formal, que el guion
   narra en las líneas 26 y 29; El País respalda (línea 25) que el libelo no
   había ingresado y la semana del 02-11-2026, que el guion narra en las
   líneas 33 y 36.
8. Dónde: línea 23, "En otras palabras, el deterioro combina más personas
   buscando empleo con menos puestos ocupados. Eso explica por qué el
   indicador subió incluso cuando la fuerza laboral se expandió. Ese cruce
   explica la presión actual." · Regla: "Sin párrafos de relleno ni de
   contexto que el oyente no necesita para entender el hecho" (EXTENSIÓN Y
   SELECCIÓN), y el control interno 3, "Verifica que no hay ningún tema
   narrado dos veces" · Debe quedar: el párrafo se reemplaza por material
   del informe que todavía no suena, y no por una reformulación de lo
   anterior. La línea 21 ya cierra con "La fuerza laboral creció, pero la
   cantidad de personas ocupadas disminuyó", y las tres frases de la línea 23
   dicen eso mismo otra vez, la última ("Ese cruce explica la presión
   actual") además en abstracto. Queda sin narrar en el informe: la
   informalidad en 26,4% y la Región Metropolitana en 10,4% (línea 13), y las
   caídas de ocupados por sector, 8,1% en industria manufacturera, 20,8% en
   información y comunicaciones y 14,1% en actividades financieras y de
   seguros (línea 15).

Observaciones:
- Para la pieza siguiente: la vuelta la provocó una observación mía. El
  veredicto del informe, `contenido/veredictos/2026-10-30-informe.md`,
  recomendó al alcalde de Río Bueno como tercera noticia ("La mejor surtida
  ahora es el alcalde de Río Bueno"), y eso contradice QUÉ SE NARRA punto 3,
  que no pregunta cuál [B] tiene más material sino cuál trae primero "En una
  mirada". En los veredictos del informe la observación tiene que nombrar esa
  [B], no la mejor surtida, porque el despachador la lee antes de escribir el
  guion y una observación no puede empujar a incumplir el prompt.
- La marca de la línea 20 pone juntos un total (1.007.976 personas) y su
  propio aumento (133.756 personas). En pantalla una comparacion dibuja dos
  magnitudes comparables, y acá la segunda es una parte de la primera. La
  corrección 4 lo deja resuelto, pero vale para los próximos días: el total y
  su incremento no son dos lados de una comparación.
- El cierre (línea 51) abre con "Empleo, control político y contratos
  municipales dejan preguntas concretas sobre ingresos, responsabilidades y
  uso de recursos públicos". La frase nombra los tres temas, así que cumple,
  pero el predicado es abstracto: "dejan preguntas concretas sobre" no es un
  hecho. Con el bloque nuevo hay que reescribirla de todos modos, y conviene
  que nombre hechos.
- La categoría del bloque que entra la decide el tema, no el título: una
  auditoría interna de la minera estatal con antecedentes en el Ministerio
  Público admite `economia` o `plata-publica`, y cualquiera de las dos se
  sostiene.
