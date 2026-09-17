import React from "react";
import { Composition } from "remotion";
import { InformeVideo, Timeline } from "./Informe";
import timelineEjemplo from "../ejemplos/timeline.ejemplo.json";

export const Root: React.FC = () => {
  return (
    <Composition
      id="Informe"
      component={InformeVideo}
      defaultProps={timelineEjemplo as unknown as Timeline}
      calculateMetadata={({ props }) => {
        const m = (props as Timeline).meta;
        const fps = m?.fps ?? 24;
        return {
          fps,
          width: m?.width ?? 1920,
          height: m?.height ?? 1080,
          durationInFrames: Math.max(60, Math.ceil((m?.duracionSeg ?? 10) * fps)),
        };
      }}
    />
  );
};
