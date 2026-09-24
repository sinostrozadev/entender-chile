VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-24T10:19:46Z

Correcciones:
1. Dónde: las ocho marcas [DATO] del guion, en orden, son cifra (línea 25),
   cifra (línea 50), cifra (línea 59), comparacion (línea 70), cifra (línea
   79), cifra (línea 98), cifra (línea 107) y cifra (línea 147): tres
   [DATO cifra] seguidas primero y cuatro seguidas después.
   Regla: "VARIEDAD (capa aparte, DESPUÉS del árbol y nunca encima de él):
   nunca más de dos [DATO cifra] seguidas en el guion" (y control interno 17,
   "Variedad visual: no hay más de dos [DATO cifra] seguidas").
   Debe quedar: ninguna corrida de tres o más [DATO cifra] consecutivas. El
   árbol está bien aplicado en las siete (cada una lleva UN solo valor), así
   que el remedio es el que da el propio prompt, "deja la cifra sobrante en la
   narración" y "se deja el párrafo sin marca": elimina al menos una marca
   entre las líneas 25, 50 y 59, y al menos dos entre las líneas 79, 98, 107 y
   147, eligiéndolas de modo que no queden tres cifra seguidas (por ejemplo
   fuera 25, 98 y 147). No se pierde ningún dato: la narración ya dice
   "veinticinco organizaciones criminales" (línea 26), "doscientas ochenta y
   seis" (línea 51), "cerca de quince pesos" (línea 57), "cien mil empleos"
   (línea 77), "tres por ciento" (línea 99), "más de trescientos milímetros"
   (línea 108) y "un litro de agua" (línea 148).

2. Dónde: titular de la línea 114, "CMPC venderá su negocio de corrugados por
   cuatrocientos veinte millones de dólares."
   Regla: "lo mismo con los verbos de TRÁMITE ("aprobó", "despachó", "votó",
   "firmó") cuando el informe dice que queda un paso pendiente (remisión,
   votación, ratificación, entrada en vigencia): el titular conserva el
   trámite, no salta al resultado". El informe (línea 52) dice "CMPC acordó
   vender a Smurfit Westrock su negocio de cartón corrugado en Chile por
   US$420 millones. La operación incluye activos industriales y queda sujeta a
   las autorizaciones correspondientes": la venta está acordada, no hecha.
   Debe quedar: el titular conserva el acuerdo y no anuncia la venta como
   hecha. Redacción verificada contra el tope de doce palabras, tiene diez:
   "CMPC acordó vender corrugados por cuatrocientos veinte millones de
   dólares."

3. Dónde: línea 41, "[FUENTE La Nación, 23 sep; Cámara de Diputadas, 23 sep]".
   Regla: "Las fuentes que cites en las marcas provienen exclusivamente del
   informe". El informe nombra a esa institución siempre completa, "Cámara de
   Diputadas y Diputados" (líneas 30, 136 y 148), y nunca "Cámara de
   Diputadas". Esa marca se pinta al pie de todas las tarjetas del bloque, así
   que en pantalla queda acreditado un organismo que no existe.
   Debe quedar: una fuente tal como la trae el informe y dentro del formato
   legible. La marca admite una sola fuente, así que basta
   "[FUENTE La Nación, 23 sep]": el informe atribuye esa noticia a "La Nación y
   Cámara de Diputadas y Diputados, 23 sep" (línea 30), y "La Nación, 23 sep"
   entra holgado en el máximo de seis palabras.

4. Dónde: el bloque "## Dólar sobre novecientos sesenta pesos" (líneas 55 a
   64) no dice en ninguna parte cuándo subió el dólar, y la etiqueta de la
   línea 59 lo fecha como "alza del dólar en la jornada", que en un video del
   24 de septiembre se lee como hoy.
   Regla: "La FECHA EXACTA manda: si el informe da la fecha de un hecho, nunca
   la reemplaces por "esta semana", "hace unos días" o "recientemente", y
   menos en la frase que abre el bloque". El informe (línea 40) fecha el
   movimiento: "El dólar avanzó cerca de $15 el 23-09-2026, superó los $960".
   Debe quedar: la fecha del informe, dicha en el bloque y en la etiqueta.
   Redacciones verificadas: la [TESIS] "El dólar subió cerca de quince pesos el
   veintitrés de septiembre y superó los novecientos sesenta." tiene dieciséis
   palabras, bajo el tope de dieciocho; la etiqueta "alza del dólar el 23 de
   septiembre" tiene siete palabras, dentro del rango de tres a ocho.

5. Dónde: titular de la línea 136, "Un estudio vinculó un hábito con mayor
   riesgo de osteoartritis."
   Regla: fidelidad al informe, "lo que la pieza afirma tiene que estar en su
   entrada, con el mismo sentido y las mismas cifras". El informe (línea 119)
   dice "Un estudio advirtió que un hábito frecuente puede agravar la
   osteoartritis de rodilla": agravar una enfermedad que ya existe no es lo
   mismo que aumentar el riesgo de tenerla.
   Debe quedar: el titular dice que el hábito puede agravar la osteoartritis,
   no que aumente el riesgo de sufrirla. Redacción verificada contra el tope de
   doce palabras, tiene diez: "Un estudio advirtió que un hábito puede agravar
   la osteoartritis."

Observaciones:
- Para la pieza siguiente: el informe de hoy deja cuatro conceptos que sirven
  para el banco de temas de la Clave sin depender de una noticia nueva: qué es
  una interpelación en la Cámara y qué efectos tiene sobre un ministro; el
  Tratado Interamericano de Asistencia Recíproca, que la declaración del
  Escudo de las Américas menciona y que nadie explica; la recesión técnica
  como definición operativa, dos trimestres consecutivos de contracción, que
  hoy alcanza a tres regiones; y el plazo legal del 30 de septiembre para
  ingresar el Presupuesto al Congreso, con lo que viene después de esa fecha.
- Carátula 3, "Soberanía chilena, / bajo examen", repite el ángulo de las dos
  anteriores en vez de ser la cifra con referencia o el segundo giro que pide
  el prompt. No bloquea, pero es la más débil de las tres para la prueba A/B.
- El bloque "## Actividad regional" (líneas 66 a 73) narra tres cifras, "tres
  regiones", "dos trimestres" y "otras tres", sobre el tope de dos cifras
  habladas para una [B]. Viene tal cual de la redacción del informe (línea 48)
  y no entra como corrección, pero si mañana hay que apretar, es el lugar.
- En la línea 18, "[FUENTE La Tercera, 23 sep; Cámara de Diputadas y
  Diputados, 23 sep]" queda en siete palabras si la fecha cuenta como dos,
  contra el máximo de seis del formato legible. Ahí el nombre sí está completo
  y correcto, así que no lo mando a corregir; si se quiere ajustar, el informe
  (línea 16) ofrece "Clarín, 23 sep" para esa noticia.
- Los titulares de las líneas 142 y 144 convierten el "acordaron avanzar" y el
  "acordaron fortalecer" del informe (líneas 125 y 127) en futuro simple,
  "avanzarán" y "reforzarán". El informe no declara un paso pendiente en esos
  dos casos, así que no los cuento como el error de trámite de la corrección 2,
  pero el matiz del acuerdo se escucha mejor si se conserva.
- Siglas en pantalla: "CIPER" (líneas 47 y 50) y "Senapred" (línea 104) van sin
  expandir, y quedan bajo la salvedad de "las de uso corriente que cualquiera
  lee sin traducir". La Dirección Meteorológica, que salió como "DMC" tres días
  seguidos el 21, 22 y 23-09, hoy va con nombre completo en las líneas 104 y
  147: ese hallazgo está resuelto.
- Cuentas verificadas, por si la corrección toca el reparto: el informe trae 3
  [A], 12 [B] y 26 [C]. El guion narra las tres [A] y siete [B], diez noticias
  narradas, justo en el tope, y deja 31 titulares, uno por cada una de las
  cinco [B] fuera del corte y de las 26 [C]. Nada del informe queda sin sonar.
- Extensión: 1.332 palabras narradas, unos 10,1 minutos a las 132 palabras por
  minuto con que calcula el prompt. Dentro del "en torno a 10 minutos", con
  holgura para lo que agreguen las correcciones 2, 4 y 5.
