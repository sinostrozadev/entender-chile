// Entrada propia del Short (vertical). Se renderiza con --props, igual que el informe:
//   npx remotion render src/short-entry.tsx Short out/FECHA/FECHA-short.mp4 --props=./out/FECHA/short/timeline.json
import React from "react";
import { Composition, registerRoot } from "remotion";
import { ShortVideo } from "./Short";
import type { Timeline } from "./Informe";

const vacio: Timeline = {
  version: 1,
  meta: { titulo: "", fps: 30, width: 1080, height: 1920, duracionSeg: 10 },
  audio: null,
  fuentes: [],
  eventos: [],
};

const RootShort: React.FC = () => (
  <Composition
    id="Short"
    component={ShortVideo}
    defaultProps={vacio}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={300}
    calculateMetadata={({ props }) => {
      const m = (props as Timeline).meta;
      const fps = m?.fps ?? 30;
      return { fps, width: 1080, height: 1920, durationInFrames: Math.max(60, Math.ceil((m?.duracionSeg ?? 10) * fps)) };
    }}
  />
);

registerRoot(RootShort);
