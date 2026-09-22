VEREDICTO: APROBADA
VUELTA: 1
PIEZA: guion_informe
PROMPT: prompts/guion-informe.md
VALIDADO: 2026-09-22T14:42:21Z

Las cuatro correcciones de la vuelta 1 quedaron resueltas, verificadas una por
una sobre contenido/guiones/informe/2026-09-22.md (commit f73193b):
1. Resuelta: quedan dos [DATO cifra] consecutivas, no cinco. La secuencia de
   marcas es barras (DMC), comparacion (Seguridad Pública), barras
   (Carabineros), comparacion (Contraloría), barras (Contraloría), cifra
   (Contraloría) y cifra (Gobierno Regional): dentro del tope de VARIEDAD,
   "nunca más de dos [DATO cifra] seguidas". Las tres cifras sobrantes (los 37
   dominios de Subtel, los más de 37.000 puestos de la UFRO y las 400.000
   viviendas) quedaron solo en la narración, que ya las traía, y sus fuentes
   siguen en la lista "Fuentes:". Se mantienen los otros topes: tres tipos
   distintos de tarjeta, dos [ESQUEMA] (tope de dos), y ninguna repetición de
   tipo seguida dentro de un mismo bloque.
2. Resuelta: el titular dice "Antofagasta incautó más de mil cuatrocientos
   kilos de cannabis" (nueve palabras, una cifra, tres cifras significativas
   con "más de"), fiel a los 1.429 kilos del informe.
3. Resuelta: el titular dice "Las condenas por el ataque al molino suman más de
   mil años" (doce palabras, dentro del tope, una sola cifra), fiel al informe,
   que dice que las penas sumadas superan mil años.
4. Resueltas las tres [TESIS]: "Contraloría contó cuatrocientas ochenta y cinco
   suspensiones pagadas y doscientas veintiuna que ya superaban un año" (16
   palabras), "El balance bajó frente a dos mil veinticinco, aunque esta
   celebración tuvo un día menos" (15) y "Cumplir la meta de dos mil treinta
   exige acelerar fuertemente la entrega mensual de viviendas" (15). Los
   números van en palabras y las tres están bajo el tope de 18.

La corrección solo tocó los cuatro lugares pedidos: el resto del guion es
idéntico al de la vuelta anterior, comprobado con el diff completo entre las
dos versiones. Sigue con las tres [A] y siete [B] narradas, diez noticias en el
tope, los 38 titulares en su propia línea y ninguno sobre doce palabras, la
línea en blanco después de cada [TESIS], el tagline de cierre y el contrato de
archivos (ruta contenido/guiones/informe/2026-09-22.md, commit "edición
2026-09-22: guion informe", un solo archivo tocado).

Observaciones:
- Para la pieza siguiente: el guion queda listo para el render. Las tarjetas
  que conviene mirar en el video son las de abajo; ninguna bloquea, pero son
  las que peor se leen con el video en silencio.
- Extensión: el texto narrado suma 2.124 palabras, contra 1.532 el 21-09 y
  1.507 el 20-09. Al ritmo con que el propio prompt calcula el bloque de
  titulares (unas 132 palabras por minuto), la edición se va a unos 16 minutos,
  por encima del "en torno a 10 minutos... 12 o 13 en días cargados". No
  bloquea, porque el prompt no fija presupuesto de palabras, pero es lo primero
  que conviene apretar mañana: "recorta desarrollo de las [B] antes que
  eliminar el bloque En titulares".
- "[FUENTE DMC, 21 y 22 sep]" y "[DATO barras | DMC, 21 sep]" abrevian la
  Dirección Meteorológica en dos marcas que se pintan en pantalla, donde la
  sigla no se explica sola; el bloque siguiente sí escribe "Dirección
  Meteorológica". Misma observación que quedó el 21-09.
- Etiquetas de dos palabras en "[DATO comparacion] fallecidos viales: 20" y
  "[DATO comparacion] funcionarios suspendidos: 485", frente al piso de "3 a 8
  palabras" que pide ETIQUETA CON CONTEXTO. Con el video en silencio no se ve
  que la primera es del balance de Fiestas Patrias ni que la segunda es de
  suspensiones con sueldo.
- "[DATO barras | DMC, 21 sep]" lleva rangos (30-50 mm, 50-75 mm, 70-100 mm) en
  vez de valores únicos; una barra dibuja un valor, no un intervalo.
- El bloque de Bachelet suma seis frases contando la [TESIS] narrada, el borde
  del rango de tres a cinco que el prompt da para las [B]. Es la misma
  observación que quedó el 21-09 con el bloque de Criteria.
- El bloque de la noticia de portada suma 286 palabras narradas contando "La
  noticia del día", y el de Contraloría, 289. Quedan empatados, cuando el
  prompt pide que la noticia de apertura reciba "el mayor desarrollo".
- "[ESQUEMA | Trámite de Sala Cuna Universal] discusión inmediata -> debate en
  cámara -> despacho -> siguiente etapa" cierra con "siguiente etapa", que no
  es un paso que el informe nombre.
- El titular "En la Universidad de Chile, gratuidad cubre casi medio pregrado."
  redondea hacia arriba el 44,9% del informe, que es un porcentaje con un
  decimal y que la regla de redondeo exceptúa.
- El titular "El alcalde Luis Álvarez tiene noventa y cuatro años." entrega la
  edad, pero no el hecho del informe: que es el alcalde más longevo del país.
