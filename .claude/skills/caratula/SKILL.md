---
name: caratula
description: Revisa una carátula de Entender Chile antes de que salga al aire y advierte lo que puede perjudicar al canal, verificado contra fuentes reales y no contra memoria. Usar SIEMPRE que aparezca una carátula, propia o candidata, aunque nadie lo pida.
---

# Revisar una carátula

Pedido de Santiago del 06-10-2026: "necesito que estés atento y me adviertas si
encuentras algo que nos pueda perjudicar, pero validado contra información real
y verifica".

**Esta revisión se hace sola, sin que nadie la pida**, cada vez que aparece una
carátula: la del día, una candidata, una que Santiago mande por el chat. No es
opcional y no espera a que él pregunte.

La regla que manda sobre todo lo demás: **nada se afirma de memoria.** Una
carátula lleva una cifra y una afirmación a la portada del canal, y el único
activo de Entender Chile es que sus cifras son precisas. Decir "se ve bien" sin
haber comprobado la cifra es peor que no revisar, porque da una seguridad falsa.

## Los cinco controles, en este orden

### 1. La cifra, contra fuentes de verdad

Busca de dónde sale el número en el repo (el guion del día, sus marcas `[DATO]`
con su fuente) y después **verifícalo en la web**. No basta con que el guion lo
diga: el guion también puede equivocarse, y una cifra mal en la carátula se ve
más que cualquier error del cuerpo.

Si la red de salida bloquea la fuente, **dilo**: "no pude abrir X". Una cifra no
verificada se reporta como no verificada, nunca como correcta.

Y para las reglas de YouTube hay un atajo que evita ese callejón: el proxy
bloquea `support.google.com`, así que desde el 06-10-2026 GPT trae las
políticas una vez al mes y quedan en `contenido/referencia/youtube/`, un
archivo por mes, transcritas y con fecha. **Esa es la fuente que se cita**, con
el mes del archivo al lado, porque de ahí se sabe qué edad tiene. Si la sección
que necesitas dice `NO SE PUDO ABRIR`, esa política NO está verificada: se
informa como no verificada y no se prohíbe nada contra ella. Si no hay ningún
archivo todavía, se puede adelantar el pedido desde Actions, workflow "Doc de
YouTube (mensual)".

### 2. La comparación, que es donde se esconde el sesgo

Este es el control que más rinde y el que nadie hace. Una cifra puede ser cierta
y la comparación que la acompaña puede estar elegida para que el salto parezca
más grande.

Preguntas: ¿contra qué se compara? ¿Existe otra base de comparación que la
prensa esté usando y que dé un número distinto? ¿El guion eligió la que da el
salto mayor? ¿Omite un paso intermedio?

El caso que lo fundó, 06-10-2026: el guion comparaba el techo de deuda de 2027
(US$25.000 millones) contra los US$17.400 millones del presupuesto original de
2026, un salto de 44%. Omitía que durante 2026 el Congreso ya había autorizado
US$6.200 millones más, dejando el margen vigente en US$23.600 millones: contra
ese, el alza real es de 5,9%. Las dos cifras son verdaderas; una de las dos
cuenta otra historia.

### 3. El lugar y el objeto identificables

Si la imagen muestra un edificio, un monumento o un lugar reconocible, ¿es ESE
edificio, con su geometría correcta? La regla del canal es dura: un lugar real
se dibuja bien o no se dibuja. Una versión casi correcta cuesta más credibilidad
que una genérica, porque el que conoce el lugar lo nota y deja de creer el resto.

### 4. Las personas

¿Hay caras reconocibles? Desde marzo de 2026 YouTube extendió su detección de
semejanza a políticos, autoridades, candidatos y periodistas: una coincidencia
deja que la persona pida la baja por privacidad, y el castigo cae sobre el canal,
no sobre el video. No es una infracción automática y el comentario de interés
público está protegido, así que **se informa el riesgo, no se prohíbe**:
Santiago decidió el 05-10-2026 soltar ese límite y esa decisión se respeta.

### 5. Lo técnico, que es barato de comprobar

- 16:9 y al menos 1280x720.
- **Bajo 2 MB**, que es el tope de YouTube para una miniatura.
- El archivo completo (`node scripts/imagen-entera.js <ruta>`): el 28-09-2026
  salió al aire una carátula truncada porque nadie lo comprobaba.
- ¿Se lee a 168 píxeles de ancho, que es el tamaño real en un teléfono? Si
  hay duda, redúcela de verdad y mírala, no la estimes.

## Cómo se informa

Separado en tres montones, y en este orden:

1. **Lo que puede perjudicar**, con la evidencia al lado y el enlace de la
   fuente. Si no se pudo verificar, dicho.
2. **Lo que está bien**, corto. Sirve para saber que se miró.
3. **Lo que yo cambiaría**, como recomendación y no como condición.

Y una cosa que nunca se hace: dar por buena una carátula porque "se ve
profesional". El diseño no es el riesgo. El riesgo es la cifra, la comparación
y el lugar.

## Después de informar: la vuelta al prompt

Instrucción de Santiago del 06-10-2026: "cada vez que veamos un detalle en la
carátula recorremos el prompt y ajustamos, si puedes encontrar mejoras lo mismo.
Así vamos auto mejorando el prompt hasta obtener el prompt perfecto".

Una revisión no termina en el informe. Termina en el prompt. Cada defecto que se
ve en una imagen es casi siempre un hueco del prompt, no una falla del
generador: el generador hizo exactamente lo que se le pidió, y lo que no se le
pidió lo inventó. Así que después de informar se abre el prompt que produjo esa
imagen (`prompts/caratula-pedido.txt` para la carátula del informe, el
`PROMPT-*.md` de la sección para los fondos, el archivo de prompts de la Clave
para sus imágenes) y se corrige.

**El norte, y lo decide todo lo demás:** una carátula WOW, que el usuario quiera
entrar. Un prompt que produce imágenes seguras y aburridas falló. Lo único que
el norte cede es la desmonetización, y solo cuando está comprobada.

### La regla que gobierna qué se puede agregar

Esta es la regla dura del 06-10-2026, y es más fuerte que cualquier instinto de
prudencia:

> "No prohíbas cosas por si acaso, solo prohíbe si infringe una regla de
> YouTube, verifica contra la regla, y ponlo en el informe que me darás. Si no
> hay nada no se hace nada."

En la práctica, cada cambio que se quiera hacer al prompt pasa por esta puerta:

- **¿Le quita libertad al generador?** (una prohibición, un "nunca", un límite,
  una lista de lo que no se puede). Entonces hay que **citar la regla de YouTube
  que se infringe**, haberla verificado en la fuente, y escribirla en el
  informe. Sin regla citada, el cambio no entra. Una prohibición "por si acaso"
  es la forma más cara de empeorar una carátula, porque el costo (todas las
  imágenes futuras, más pobres) no se ve nunca y el beneficio no existía.
- **¿Es una mejora que le da al generador algo que antes no tenía?** (un encuadre
  medido, un porqué, un ejemplo, una precisión de composición, un formato).
  Entonces entra directo, sin pedir permiso a ninguna regla. Acá es donde está
  casi todo el rendimiento.
- **Si la revisión no encontró nada**, el prompt no se toca. "Si no hay nada no
  se hace nada" también significa que no hay que inventar una mejora para tener
  algo que entregar.

Y una distinción que ya costó una confusión: un problema de **precisión
editorial** (una cifra, una base de comparación mal elegida) no se arregla
prohibiendo nada en el prompt de la carátula. Se arregla donde nace, que es el
prompt del guion. La carátula solo repite lo que el guion decidió.

### Cómo queda escrito

En el mismo archivo del prompt, al final, una sección **Vueltas**: una entrada
por vuelta, con la fecha, qué se vio en la imagen, qué línea se agregó y qué
defecto la pagó. Sin ese registro la vuelta siguiente vuelve a discutir lo
mismo, y el prompt deja de mejorar y empieza a oscilar.

### Y el informe para Santiago

Siempre, aunque el cambio sea de una línea. Tres cosas:

1. Qué se vio en la imagen.
2. Qué se cambió en el prompt y por qué.
3. **Qué se prohibió y contra qué regla de YouTube**, con el enlace. Si no se
   prohibió nada, se dice así de claro: "contra reglas de YouTube, nada que
   corregir". Esa línea no se omite nunca, porque su ausencia se lee como que no
   se miró.
