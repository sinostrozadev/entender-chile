VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-13T02:37:20Z

Correcciones:
1. Dónde: el bloque "## Chile entra en recesión técnica [economia]" (línea 28)
   va segundo y "## Alertas rojas por calor extremo [emergencia]" (línea 40) va
   tercero · Regla: punto 2 de QUÉ SE NARRA, "va SEGUNDA la que le cambia el
   día a más gente (lo que se paga, lo que se come, el trabajo, la salud, el
   transporte que ya funciona, una alerta vigente), y queda TERCERA la más
   local, la más especializada o la que todavía no le pasa a nadie porque es un
   anuncio a futuro", y punto 1b del control interno ("Si están al revés,
   cámbialas de lugar antes de entregar") · Debe quedar: los dos bloques
   intercambiados, "Alertas rojas por calor extremo" segundo y "Chile entra en
   recesión técnica" tercero. La alerta roja está vigente hoy, es de salud y
   trae una indicación para las próximas horas (evitar el sol entre las once y
   las diecisiete); la recesión técnica es la más especializada, tanto que el
   propio bloque tiene que explicar la definición, y no le cambia el día a
   nadie hoy. Es el mismo caso que el prompt cita del 11-11-2026, cuando la
   alerta por calor extremo quedó tercera. Cambia también el orden en que la
   Apertura las nombra (línea 12), para que no quede al revés del desarrollo.
   Las tesis no se tocan: miden 106 caracteres cada una y la suma de las cuatro
   sigue en 384.
2. Dónde: "[DATO cambio | Banco Central de Chile, 12 nov] mediana crecimiento
   2026 en octubre: 0,2% -> mediana crecimiento 2026 en noviembre: 0,0% (baja
   mal)" (línea 34) · Regla: el formato de la marca, "[DATO tipo | fuente,
   fecha] etiqueta: valor ; etiqueta: valor", más "CADA VALOR CON SU PROPIO
   RÓTULO" y "CADA VALOR CON SU UNIDAD, pegada al número" · Debe quedar un solo
   rótulo con los dos valores, igual que el ejemplo del propio prompt ("buques
   por día en Ormuz: 17 -> 7"):
   [DATO cambio | Banco Central de Chile, 12 nov] mediana de crecimiento esperado para 2026: 0,2% -> 0,0% (baja mal)
   Comprobado con node scripts/parse.js sobre las dos versiones: tal como está,
   el segundo valor sale sin etiqueta, con el número 2026 y con "mediana
   crecimiento en noviembre: 0,0%" de unidad, o sea la tarjeta pinta 2026; con
   la redacción propuesta sale 0,2% a 0,0% con la flecha de baja. Los meses ya
   están en el párrafo narrado, así que no se pierde nada. La base elegida está
   bien: octubre es la vigente y no el 2,5% de enero (punto 17c).
3. Dónde: "[FUENTE Senapred, 12 nov]" (línea 41) y "[DATO cifra | Senapred, 12
   nov]" (línea 46), con "Senapred" sin expandir en ninguna parte del guion ·
   Regla: "toda sigla que se PINTE EN PANTALLA (en esta marca o en el pie de un
   [DATO]) va expandida la primera vez que aparece en el guion: Dirección
   Meteorológica (DMC), no DMC a secas", y punto 17b del control interno. Las
   salvadas son solo las de uso corriente (IPC, PIB, ONU, INE, Carabineros,
   PDI) · Debe quedar: la primera aparición en pantalla expandida y dentro del
   tope de seis palabras de la marca [FUENTE], por ejemplo
   [FUENTE Prevención de Desastres (Senapred), 12 nov]
   y de ahí en adelante ya puede decir "Senapred" a secas, así que la marca
   [DATO cifra] del mismo bloque queda igual. Comprobado con parse.js: la
   fuente de sección se lee entera. El guion del 01-11-2026 la expandió en
   prosa; en este no aparece expandida en ningún lugar.

Observaciones:
- Para la pieza siguiente: en una marca [DATO cambio] los dos valores van bajo
  UN rótulo ("etiqueta: valor1 -> valor2"), nunca con rótulo propio cada uno
  separado por la flecha. El parseo deja el segundo valor sin etiqueta y pinta
  el año como si fuera la cifra.
- Para la pieza siguiente: node scripts/validar-tarjetas.js vuelve a avisar por
  la falta de la línea "Carátula sugerida:", y es el cuarto día seguido (09,
  10, 11 y 12-11-2026). No es incumplimiento, por tercera vez con la misma
  evidencia: el propio prompt cierra el bloque con "Desde el 04-11-2026 no se
  pide carátula del día", contenido/estado/sin-video-informe.txt existe y
  .github/workflows/estado.yml salta el pedido justamente con ese marcador
  ("la carátula del día solo la usaba el video del informe ... el Short no
  lleva miniatura"). Lo que falta es limpiar la contradicción: el prompt sigue
  pidiendo las tres carátulas y el "Clima de carátula:" como líneas tercera a
  sexta obligatorias, y el script las exige desde el 05-09. Es trabajo de la
  sesión de día sobre el prompt o sobre el script, no del guion.
- La Apertura (línea 12) dice "también dejó dos señales que conviene mirar de
  cerca". El prompt pide no anunciar cuántas noticias vienen; nombrar las dos
  ya basta y basta con sacar el número. No bloquea.
- El primer bloque repite tres hechos que ya dio "La noticia del día" (la
  reunión sin acuerdo, el congelamiento hasta febrero, rutas y puertos). No son
  frases literales, así que cumple el "sin repetir literalmente sus frases",
  pero el prompt pide que ese bloque CONTINÚE con el detalle, los actores y el
  antecedente: el párrafo gana si entra directo al retiro del proyecto y a lo
  que pidió el Presidente, que el informe trae y el guion no usa.
- Lo que sí quedó bien y conviene conservar en la corrección: 483 palabras
  narradas (420 a 600), tesis de 63, 109, 106 y 106 caracteres con suma de 384
  (365 a 423), línea en blanco después de cada tesis, tres tipos distintos de
  tarjeta sin dos cifras seguidas, el [ESQUEMA] del trámite del proyecto, la
  categoría "emergencia" bien puesta en la alerta roja declarada, "Para salir
  hoy" integrada en el cierre y el tagline cerrando. Sin hallazgos mecánicos en
  revisar-mecanico.js.
