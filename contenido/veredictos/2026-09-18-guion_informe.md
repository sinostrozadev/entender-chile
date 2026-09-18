VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-18T05:46:50Z

Observaciones:
- Las cuatro correcciones de la vuelta 1 quedaron resueltas y el diff no toca
  nada más (commit b437907, cuatro cambios exactos):
  1. Línea 9: ahora dice "EFE declaró desierta la licitación del tramo
     soterrado hasta Alameda y mantiene dos mil veintiocho como horizonte de
     inicio para lo que sigue", fiel a la línea 16 del informe ("declaró
     desierta la licitación del tramo soterrado entre Lo Errázuriz y Alameda",
     "mantuvo 2028 como horizonte de inicio para la parte que sigue en
     ejecución"). La sección "## La noticia del día" queda en dos frases y
     treinta y cuatro palabras contadas (once de la [TESIS] más veintitrés),
     dentro de las 25 a 35 que pide la estructura, con una sola marca de
     tarjeta y su [FUENTE].
  2. Se quitó "[DATO cifra | EFE, 17-18 sep] avance de tramos activos: 30%";
     el bloque "## El tramo que sigue" queda con una sola tarjeta de cifra
     (viajes diarios proyectados) y el treinta por ciento sigue narrado en la
     línea 24, que es el remedio que da la propia regla de VARIEDAD.
  3. Se quitó "[DATO cifra | IPS, 16 sep] beneficiarios afectados estimados:
     53000"; la cifra sigue narrada en la línea 94. La secuencia de marcas de
     la edición queda cifra, comparacion, barras, comparacion, cifra, cifra:
     nunca más de dos [DATO cifra] seguidas, tres tipos distintos, una de
     barras y una de comparacion, y el [ESQUEMA] de la línea 20 intacto.
  4. Línea 140: "Personas de treinta a cuarenta y cuatro años concentran los
     deudores estudiados", doce palabras contadas, dentro del tope de EN
     TITULARES. Los otros treinta y tres titulares no se tocaron.
- Ese titular, al comprimir a doce palabras, deja fuera el cuarenta y uno por
  ciento que trae la línea 118 del informe. La regla pide el hecho y "si es
  imprescindible, UNA cifra", así que omitirla está permitido y no cambia
  ninguna cifra dicha, pero la frase sin el porcentaje se escucha más absoluta
  que la del informe. Es la redacción que propuso el veredicto de la vuelta 1.
- Siguen en pie, sin bloquear, las observaciones de la vuelta 1 sobre partes
  que la corrección no tenía que tocar: la cadencia uniforme de los siete
  bloques [B] narrados (control interno 11, que ninguna regla fija en un largo
  distinto); los tres cierres de bloque con frase de método (líneas 60, 70 y
  90), que salen del informe y no son del tipo prohibido; "en los próximos
  meses" en la línea 114, plazo que el informe no pone y que no cambia ninguna
  cifra; y la apertura de la línea 12, que anticipa "vivienda, minería y
  bolsillo" como rótulos genéricos más que como asuntos de "En una mirada".
- Lo verificado de nuevo sobre la pieza completa (227 líneas) y que sigue en
  regla: las diez noticias narradas son las tres [A] y siete [B], el tope
  combinado del prompt; los treinta y cuatro titulares cubren una a una las
  trece [B] fuera del corte y las veintiuna [C], cada uno en su propia línea y
  bajo la entrada fija "Y en titulares:"; nada del informe queda sin sonar y no
  hay noticia agregada; las doce [TESIS] van de once a dieciocho palabras,
  todas con su línea en blanco detrás; cada bloque de noticia trae su [FUENTE]
  y Apertura, Dato curioso, Agenda, En titulares y Cierre no la llevan; "En
  titulares" va antes del dato curioso y la agenda; las cifras de todas las
  marcas están en el informe y sus valores van en numerales; la narración no
  trae rayas, paréntesis, URLs, símbolos, números en cifras ni conectores de
  ensayo escrito; la lista "Fuentes:" no cuela rutas internas; el cierre
  integra "Para salir hoy" y termina en "El resumen sin gritos."; ruta y
  formato conformes al contrato (contenido/guiones/informe/2026-09-18.md, con
  "Título sugerido:", "Descripción sugerida:", "Carátula sugerida:", "Guion:" y
  "Fuentes:") y commit "edición 2026-09-18: guion informe" con un solo archivo
  tocado.
