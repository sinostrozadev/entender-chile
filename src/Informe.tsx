import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow } from "./tema";
import { Tarjeta, SeccionBanner, Evento } from "./tarjetas";

export type Timeline = {
  version: number;
  meta: {
    titulo: string;
    descripcion?: string;
    fecha?: string;              // AAAA-MM-DD (Chile), para el sello de inicio
    serie?: string;              // "informe" | "clave"
    musica?: string | null;      // ruta en public/, ej. "musica/informe.mp3"
    logo?: string | null;        // logo sonoro del sello (2 s)
    fps: number;
    width: number;
    height: number;
    duracionSeg: number;
  };
  audio: string | null;
  fuentes: string[];
  eventos: Evento[];
};

// Sello de identidad: 2,8 s al inicio, corre BAJO la narración (nunca la
// retrasa) y se desvanece revelando la primera tarjeta. Marca sin costo de
// retención — jamás una intro larga.
const SELLO_SEG = 2.8;

const Sello: React.FC<{ fecha?: string; serie?: string }> = ({ fecha, serie }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const salida = interpolate(frame, [(SELLO_SEG - 0.6) * fps, SELLO_SEG * fps], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const entrada = interpolate(frame, [0, 0.35 * fps], [0, 1], { extrapolateRight: "clamp" });
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = txt.charAt(0).toUpperCase() + txt.slice(1);
  }
  const eyebrow = serie === "clave" ? "Claves para entender las noticias" : "El informe diario";
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel, opacity: salida, alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: entrada, textAlign: "center" }}>
        <div style={{ ...estiloEyebrow, marginBottom: 30 }}>{eyebrow}</div>
        <div style={{ fontFamily: tema.serif, fontSize: 132, fontWeight: 600, color: tema.tinta, lineHeight: 1.05 }}>
          Entender Chile
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: tema.patina, margin: "38px auto" }} />
        {fechaLarga ? (
          <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: tema.gris }}>{fechaLarga}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
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
      {tl.meta.musica ? (
        // cama musical: baja bajo la voz, protagonista mientras el video es mudo
        <Audio src={staticFile(tl.meta.musica)} volume={tl.audio ? 0.1 : 0.3} loop />
      ) : null}
      {tl.meta.logo ? (
        // logo sonoro: suena junto al sello de identidad
        <Sequence from={0} durationInFrames={Math.round(2.4 * fps)}>
          <Audio src={staticFile(tl.meta.logo)} volume={0.5} />
        </Sequence>
      ) : null}
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
      <Sequence from={0} durationInFrames={Math.round(SELLO_SEG * fps)}>
        <Sello fecha={tl.meta.fecha} serie={tl.meta.serie} />
      </Sequence>
    </AbsoluteFill>
  );
};
