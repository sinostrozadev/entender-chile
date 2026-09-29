// Entrada solo de la muestra. No entra en ningún video.
import React from "react";
import { Composition, registerRoot } from "remotion";
import { MuestraBiblioteca } from "./muestra-biblioteca";

registerRoot(() => (
  <Composition id="Muestra" component={MuestraBiblioteca} durationInFrames={4} fps={24} width={1920} height={1080} />
));
