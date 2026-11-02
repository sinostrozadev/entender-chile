// Entrada solo del tablero de estilos. No entra en ningún video.
import React from "react";
import { Composition, registerRoot } from "remotion";
import { TableroEstilos } from "./tablero-estilos";

registerRoot(() => (
  <Composition id="Tablero" component={TableroEstilos} durationInFrames={6} fps={24} width={1920} height={1080} />
));
