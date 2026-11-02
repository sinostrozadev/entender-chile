// Entrada solo para la prueba de composición del párrafo. No entra en ningún
// video: se rinde a mano para mirar los tres estados y decidir.
import React from "react";
import { Composition, registerRoot } from "remotion";
import { PruebaParrafo } from "./prueba-parrafo";

registerRoot(() => (
  <Composition id="PruebaParrafo" component={PruebaParrafo} durationInFrames={3} fps={24} width={1920} height={1080} />
));
