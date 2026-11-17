VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-11-13T11:57:23Z

Observaciones:
- Para la pieza siguiente: el título de hoy lleva una cifra ("$142 por litro")
  y la sección "## La noticia del día" no tiene ninguna tarjeta [DATO], solo su
  [TESIS], así que la regla del 01-10-2026 ("si el título del video dice un
  número, la tarjeta de La noticia del día muestra ESE número grande") no se
  puede cumplir sin romper la otra regla de esa sección, que admite una sola
  marca. No es incumplimiento, porque el prompt permite "su [TESIS] o su
  [DATO] principal", pero el que escriba mañana con un número en el título
  conviene que elija: o la tesis nombra ese número, o la única marca de la
  sección es el [DATO] con la cifra del título.
- Para la pieza siguiente: el cierre (línea 51) quedó en 62 palabras narradas,
  dos sobre las "40 a 60" del punto 8 de ESTRUCTURA. No bloquea, por el mismo
  criterio del veredicto del 10-11-2026: ese número está en el "Reparto
  orientativo" de EXTENSIÓN y el largo que manda es el total de 420 a 600, que
  acá da 462 contados por "node scripts/validar-tarjetas.js". Es el tercer
  cierre sobre 60 en cinco días, así que conviene mirarlo al escribir.
- El bloque de Ovalle narra 101 palabras y el de Rabat bajó a 100, los dos bajo
  el piso orientativo de 110 por noticia, mientras camioneros lleva 123. El de
  Rabat perdió una palabra por la corrección 3 de la vuelta 1, que era lo
  pedido. El informe daba material para el párrafo que falta en Ovalle (su
  línea 111 trae los nuevos avisos SAE que pueda emitir la autoridad).
- La marca de la línea 23 lleva indicador "(baja bien)" sobre una etiqueta que
  es un ahorro ("ahorro en carga de 50 litros: $7100"). En pantalla eso dibuja
  una flecha hacia abajo junto a una cifra que para el bolsillo es una mejora.
  Lo que baja es el precio, no el ahorro. Queda anotado para la próxima: o la
  etiqueta habla del precio por carga, o el indicador sobra.
- Fidelidad, matiz menor que viene de la vuelta 1: el informe (su línea 109)
  dice que Senapred "proyectó que los mayores caudales podrían persistir" desde
  el 15-11-2026, y el guion (línea 35) lo narra como "proyectó caudales mayores
  desde el quince de noviembre". El verbo sigue siendo una proyección, así que
  no es incumplimiento, pero el condicional del informe se perdió.

Verificado corrección por corrección contra el veredicto de la vuelta 1, con el
diff de la edición a la vista (un solo cambio, el del bloque de Rabat):
(1) la marca "[DATO cifra | Diario Financiero, 12 nov] votos necesarios para
aprobar la acusación: 78 votos" quedó entre el "[ESQUEMA | Trámite de la
acusación]" y el párrafo que narra los setenta y ocho votos, o sea justo antes
del párrafo que menciona ese número, como pide la marca [DATO];
(2) el bloque "## Acusación contra Fernando Rabat [congreso]" ya no tiene dos
[DATO cifra] seguidas: el orden quedó cifra (22 reducciones), esquema, cifra
(78 votos), y "node scripts/validar-tarjetas.js" confirma "variedad OK:
ninguna cuota rota, ninguna marca malformada";
(3) ese bloque narra ahora tres cifras habladas, "tres capítulos", "veintidós
reducciones" y "setenta y ocho votos", porque el "cinco" de la comisión salió
de la narración y sigue en pantalla dentro del [ESQUEMA]. Las fechas no cuentan,
con el mismo método de conteo de las vueltas anteriores.

Verificado además que la corrección no introdujo nada: 462 palabras narradas,
dentro de 420 a 600; tesis de 60, 107, 105 y 114 caracteres, suma 386, todas
dentro de los topes de los puntos 14b, 14c y 14d; línea en blanco después de
cada [TESIS]; tres bloques de noticia con la portada primero y el mismo orden
que ya se verificó en la vuelta 1; el ESQUEMA y la marca movida no quedaron
como dos tarjetas del mismo tipo seguidas; "node scripts/revisar-mecanico.js"
sin hallazgos mecánicos; sin rayas. Fidelidad del bloque corregido contra el
informe, línea por línea: los tres capítulos y los 78 votos están en su línea
38, los criterios contradictorios y el respaldo del Consejo de Defensa del
Estado en la 40, las 22 reducciones en la 42, y la cuenta formal del 16-11-2026
con la comisión de cinco diputadas y diputados en la 44.
