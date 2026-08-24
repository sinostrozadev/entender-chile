import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { tema } from "./tema";
import { Tarjeta, SeccionBanner, Evento } from "./tarjetas";

export type Timeline = {
  version: number;
  meta: { titulo: string; descripcion?: string; fps: number; width: number; height: number; duracionSeg: number };
  audio: string | null;
  fuentes: string[];
  eventos: Evento[];
};

export const InformeVideo: React.FC<Timeline> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const HOLD = Math.round(fps * 0.3); // pequeña cola para que no haya huecos entre tarjetas

  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte);
  const overlays = tl.eventos.filter((e) => e.overlay);

  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel }}>
      {tl.audio ? <Audio src={staticFile(tl.audio)} /> : null}
      {tarjetas.map((ev, i) => (
        <Sequence key={i} from={f(ev.from)} durationInFrames={Math.max(1, f(ev.to) - f(ev.from) + HOLD)}>
          <Tarjeta ev={ev} />
        </Sequence>
      ))}
      {overlays.map((ev, i) => (
        <Sequence key={"ov" + i} from={f(ev.from)} durationInFrames={Math.max(1, f(ev.to) - f(ev.from))}>
          <SeccionBanner texto={ev.texto ?? ""} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
