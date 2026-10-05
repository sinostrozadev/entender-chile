// LA PANTALLA DE LA ENTRADA, para el taller (05-10-2026).
//
// La entrada de marca es lo primero que ve quien abre el video y hasta hoy no
// estaba en ninguna pantalla del taller: se decidió el 01-10 mirando dos clips
// sueltos que nunca quedaron publicados. Acá queda, para poder compararla
// cuando se le cambie el fondo, que es justo lo que pasó hoy.
//
// El texto y la fecha son los de una edición real, para que el clip muestre un
// párrafo del largo que de verdad llega y no uno de prueba.
import React from "react";
import { registerRoot, Composition } from "remotion";
import { EntradaDeMarca } from "./entrada";

const TEXTO = "Brasil decidirá su presidencia en segunda vuelta el 25 de octubre, después de que ninguno de los dos candidatos llegara a la mayoría absoluta.";
const DUR = 8;

// `texto` vacío sirve para MEDIR: deja la zona del párrafo con el fondo y el
// velo y sin letras encima, que es lo único contra lo que tiene sentido medir
// el contraste. Medirlo con el texto puesto da 1:1, porque el píxel más
// parecido al texto es el texto.
const Pantalla: React.FC<{ texto: string }> = ({ texto }) => (
  <EntradaDeMarca fecha="2026-10-05" serie="informe" texto={texto} vozEn={2.2} durSeg={DUR} />
);

registerRoot(() => (
  <Composition id="Entrada" component={Pantalla} width={1920} height={1080} fps={24}
    durationInFrames={24 * DUR} defaultProps={{ texto: TEXTO }} />
));
