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
