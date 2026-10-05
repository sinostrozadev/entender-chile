# Estilo Lámina

La variante de fondos de sección que nació el 05-10-2026, cuando Santiago pasó
un fondo azul oscuro para la pantalla de entrada, lo vimos puesto y lo sacó:
"ese formato de imagen no va con el estilo claro, es otro estilo". Entonces
pasó el que sí va, y de ahí sale esto.

## Qué lo distingue de los otros dos

| estilo | el motivo | para qué sirve |
|---|---|---|
| `papel` | chico, en la esquina de abajo a la derecha, más una marca de agua enorme y casi invisible | el fondo de una tarjeta: tiene que desaparecer detrás del texto |
| `fondo-claro` | ninguno, solo materia | lo que va debajo de todo, sin nada que mirar |
| **`lamina`** | **el objeto de la sección dibujado a línea, GRANDE, en la mitad derecha** | **una pantalla con texto a la izquierda: la entrada, una apertura, un cierre** |

La diferencia no es de gusto, es de uso. Los de `papel` están hechos para que
el texto pase por encima de todo el cuadro; estos están hechos para una
composición partida, con el texto ocupando la izquierda y el dibujo quieto a la
derecha. Por eso el motivo puede ser grande: nunca va a tener una palabra
encima.

## La regla que no se negocia

**La mitad izquierda va limpia.** No "casi limpia": sin trazos, sin el borde
del motivo asomando, sin la cuadrícula marcándose más. Es donde vive el texto,
y el 05-10-2026 se midió lo que pasa cuando no se respeta: con un fondo cuya
zona limpia terminaba al 57% del ancho, el párrafo de apertura (que ocupa el
70%) caía sobre la parte más brillante de la imagen y el contraste mínimo bajo
el texto era de 1,00 a 1, o sea texto invisible.

El video pone un velo detrás del texto para defenderse (`src/legible.tsx`),
pero un velo no salva letras blancas sobre una banda casi blanca: solo
compensa manchas, no un motivo puesto donde va el texto.

## Dónde está cada cosa

- `_muestra-portada.png`: la lámina que entregó Santiago y que fijó el estilo.
  Es la que está al aire como fondo de la pantalla de entrada
  (`public/fondos/entrada.png`), y sirve de vara para las que vengan.
- El prompt vive en la biblioteca del taller, estilo `lamina`, para poder
  compararlo con los otros y pedirlo desde ahí.
- Mientras esta carpeta no tenga las once imágenes de sección, activarla en
  `contenido/config/estilo.json` no rompe nada: el video sale con las de
  siempre.
