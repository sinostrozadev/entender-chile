VEREDICTO: CORREGIR
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-21T05:14:18Z

Correcciones:
1. Dónde: línea 44, "Al cierre del informe todavía no se había publicado el
   horario de la intervención presidencial." · Regla: "Nárralo como propio, sin
   mencionar el informe como documento: nunca 'el informe usa una comparación',
   'según el informe de hoy'. Para el oyente no existe ningún informe; existe lo
   que tú le cuentas." · Debe quedar: la misma frase sin nombrar el informe, por
   ejemplo "Hasta anoche no se había publicado el horario de la intervención
   presidencial", o la frase eliminada.
2. Dónde: línea 28, "Al cierre del jueves dieciocho se contaban trece fallecidos
   y ciento treinta y seis siniestros." · Regla: "Fidelidad total al informe: lo
   que la pieza afirma tiene que estar en su entrada, con el mismo sentido" y
   "La FECHA EXACTA manda". El informe fija el corte "hasta las 23.59 horas del
   sábado 19" (línea 16) y el parcial "hasta la noche del día 18" (línea 20): si
   el 19 es sábado, el 18 es viernes, y el propio guion llama "jueves diecisiete"
   al 17 en la línea 20. El jueves 18 no existe en la entrada. · Debe quedar:
   "Al cierre del viernes dieciocho se contaban trece fallecidos y ciento treinta
   y seis siniestros." (también sirve "del día dieciocho").
3. Dónde: línea 51, "El resultado fue un sobregasto de diez mil seiscientos
   quince millones de pesos." · Regla: "REGLA DE REDONDEO EN VOZ: las cifras
   grandes se narran REDONDEADAS, con 'más de', 'casi', 'cerca de' o 'unos' [...]
   Tope: TRES cifras significativas habladas por número". "Diez mil seiscientos
   quince" son cinco dígitos significativos y van sin fórmula de redondeo. · Debe
   quedar: "más de diez mil seiscientos millones de pesos". La cifra exacta se
   conserva donde corresponde, en la marca [DATO cifra] de la línea 50.
4. Dónde: línea 54, "Gendarmería encabezó el listado con dos mil ochocientos
   treinta y cinco millones de pesos". · Regla: la misma de arriba, "Tope: TRES
   cifras significativas habladas por número (3.640 millones sí; 3.640.544.800
   no)". "Dos mil ochocientos treinta y cinco" son cuatro dígitos
   significativos. · Debe quedar: "más de dos mil ochocientos millones de pesos",
   con el exacto en la marca. Los "mil trescientos treinta millones" del
   Instituto Geográfico Militar, en esa misma línea, sí cumplen el tope y no hay
   que tocarlos.
5. Dónde: línea 53, "[DATO barras | Dipres, 21 sep] Gendarmería: $2.835 millones
   ; Instituto Geográfico Militar: $1.330 millones" · Regla: el árbol de tipos,
   "gana la PRIMERA fila que calza": barras es "De 3 a 6 valores de la misma
   familia y misma unidad" y aquí hay DOS valores, así que la fila que calza es
   "Dos o tres valores de cosas distintas pero comparables, MISMA unidad ->
   comparacion". · Debe quedar: la misma marca con los mismos dos valores y la
   misma fuente, como "[DATO comparacion | Dipres, 21 sep]". Y como el bloque no
   puede llevar "dos tarjetas del mismo tipo seguidas", la marca de la línea 56
   ("[DATO comparacion | Dipres, 21 sep] alimentos: 73,2% ; aseo e higiene:
   19,3%") sale del guion: sus dos porcentajes ya están narrados en la línea 57 y
   ahí se quedan, como manda la regla de VARIEDAD ("si el árbol está bien
   aplicado, deja la cifra sobrante en la narración").
6. Dónde: línea 112, "El sistema fue clasificado en categoría cuatro y podría
   dejar hasta ochenta milímetros en sectores de cuatro regiones." · Regla: "En
   noticias [B], máximo dos cifras habladas". El bloque del río atmosférico es
   [B] y habla tres: "categoría cuatro", "ochenta milímetros" y "cuatro
   regiones". · Debe quedar: el bloque con dos cifras habladas como mucho, por
   ejemplo "El sistema fue clasificado en categoría cuatro y podría dejar hasta
   ochenta milímetros en sectores de la zona centro-sur.", que es como el informe
   ubica el evento en su línea 80.

Observaciones:
- Línea 100, "[FUENTE Corte de Valparaíso; Minvu, 20 sep]": el informe fecha a
  la Corte de Apelaciones de Valparaíso y al Minvu el 19 sep, y solo a Epicentro
  Chile el 20 sep (línea 74). Es el mismo tipo de desajuste que quedó anotado sin
  bloquear el 20-09, así que tampoco bloquea hoy; con "19 sep" la marca sigue
  cumpliendo el tope de seis palabras.
- El bloque del río atmosférico abrevia "DMC" en [FUENTE] y en [DATO] (líneas 108
  y 111), mientras el bloque siguiente escribe "Dirección Meteorológica" (línea
  117). Las dos marcas se pintan en pantalla, donde la sigla no se explica sola.
- "[ESQUEMA | Agenda chilena en Naciones Unidas] seguridad regional -> comercio
  -> sede oceánica en Valparaíso" (línea 40) encadena con flechas tres objetivos
  paralelos, no un proceso, una jerarquía ni una línea de tiempo, que es para lo
  que el prompt define la marca. El otro esquema, el del trámite de las RUF
  (línea 69), sí es del tipo que pide la regla.
- "Carátula 2: Fiestas largas / Costos irreparables" queda en abstracto: contra
  la prueba del gancho, un desconocido pregunta "¿qué costos?". La primera y la
  tercera sí nombran el hecho.
- El desarrollo vuelve sobre dos cosas que ya dio "La noticia del día": las dos
  muertes del domingo pendientes (línea 25) y el par dieciocho fallecidos en
  doscientos sesenta y siete siniestros (línea 28). No es repetición literal, y
  en el segundo caso el sentido es otro, la comparación con el parcial, pero el
  arranque del bloque queda cerca del límite que fija el punto 3 de ESTRUCTURA.
- El bloque de Criteria suma seis frases contando la [TESIS] (cinco sin ella),
  el borde del rango de tres a cinco que el prompt da para las [B].
- Cobertura verificada una por una sobre esta versión: se narran las tres [A] y
  siete [B], diez noticias, justo en el tope; las tres [B] restantes y las
  veintiuna [C] tienen su frase en "En titulares", veinticuatro líneas, una por
  línea y ninguna sobre doce palabras; no hay noticias agregadas. Las once
  [TESIS] están en dieciocho palabras o menos y todas llevan su línea en blanco
  antes del párrafo. "La noticia del día" suma treinta palabras en dos frases,
  con una sola marca y su [FUENTE]. La apertura tiene treinta y dos palabras y
  adelanta los otros tres asuntos de "En una mirada". No hay rayas, paréntesis
  fuera del indicador de [DATO], conectores de ensayo, numerales en la narración
  ni fuentes internas del sistema en la lista final.
