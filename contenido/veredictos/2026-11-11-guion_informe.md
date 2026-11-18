VEREDICTO: APROBADA
VUELTA: 0
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-11T06:38:03Z

Observaciones:
- Selección verificada contra el informe y no de memoria: el informe trae
  exactamente tres [A], así que el reparto no admitía elección. La portada
  declarada en la línea 10 del informe (camioneros, 9/10) va primera y las
  otras dos siguen el orden del informe, teleférico (línea 92) y calor
  extremo (línea 110). Tres bloques de noticia, ninguno más, y sin "En
  titulares", sin Dato curioso, sin Agenda y sin "¿En qué quedó?".
- Las tesis quedaron en 60, 106, 106 y 107 caracteres contados acá, suma 379.
  Las tres de bloque caen dentro de 105 a 118 y la de "La noticia del día"
  dentro de 54 a 66, así que por la recta del punto 3b el Short debería durar
  unos 42 segundos, en la banda de 41 a 45. El cuerpo del commit fbec806
  declara 108, 108 y 107 con suma 383: la diferencia no saca nada de banda,
  pero el margen real al piso de 365 son 14 caracteres y no 18. Conviene
  contar sobre el archivo guardado.
- La tesis de "La noticia del día" nombra a los camioneros, el grupo humano al
  que le pasa el hecho, y no a la institución ni al indicador, que es lo que
  pide el punto 14c. El sujeto sobrevivió entero dentro de los 66 caracteres.
- Las tres escalas humanas que el veredicto del informe dejó verificadas se
  usaron tal cual y ninguna se inventó acá: los dos mil pesos que agrega una
  carga de cincuenta litros y los mil con el tope (línea 24 del informe), los
  cincuenta y cuatro minutos diarios (línea 102) y las seis horas continuas de
  la ventana preventiva de las once a las cinco (línea 120).
- La base del [DATO cambio] del teleférico es el mínimo informado, cuarenta
  minutos, y no el máximo de sesenta que daría el salto mayor: es lo que pide
  la regla de BASE DE COMPARACIÓN. La narración agrega "y a veces bastante
  más", que conserva el rango del informe sin llevar la cifra alta a pantalla.
- No bloquea, y es tema del prompt antes que de la pieza: el script
  validar-tarjetas.js sigue avisando que falta la línea "Carátula sugerida:",
  porque el bloque FORMATO DE SALIDA de prompts/guion-informe.md todavía pide
  tres carátulas y la línea "Clima de carátula:", mientras la línea siguiente
  del mismo prompt dice que desde el 04-11-2026 no se pide carátula del día.
  La ausencia no se marca como incumplimiento porque la retirada es explícita
  y los guiones del 09-11-2026 y del 10-11-2026 se aprobaron sin esas líneas,
  pero el aviso va a salir todos los días hasta que el prompt y el script se
  pongan de acuerdo.
- No bloquea: el bloque del teleférico quedó con categoría regiones para una
  obra entre Providencia y Huechuraba, que es Región Metropolitana. La
  categoría es una de las doce permitidas y ninguna de la lista calza mejor
  (no hay "ciudad" ni "transporte"), pero esa palabra decide la imagen y el
  color del bloque, así que vale mirar si la lista necesita una entrada para
  obras urbanas.
- La cadencia repetida de advertencias que marcó el veredicto del informe no
  se heredó: el guion no arrastra ninguna de esas fórmulas de cautela y los
  tres bloques cierran en un hecho concreto (el trámite en el Congreso, la
  tarifa por definir antes de abrir y el ajuste de medidas si cambia el
  pronóstico).
