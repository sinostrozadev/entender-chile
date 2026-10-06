// MUESTRA del formato de la Clave: imagen a un lado, texto avanzando palabra
// por palabra al otro (06-10-2026, para que Santiago vea cómo se ve antes de
// construirlo en serio).
//
// Por qué existe. Las imágenes de sección se pidieron para este formato y no
// había NADA con qué mirarlas en movimiento: la única composición registrada
// era "Informe". Pedir catorce imágenes sin poder verlas montadas es el mismo
// error que ya se evitó el 28-09 con prueba-parrafo.tsx, cuando se probó el
// cuadro vacío ANTES de encargar cuarenta dibujos.
//
// Es una MUESTRA, no la pieza: sin voz, sin tarjetas de datos, sin marca y sin
// cierre. Solo responde una pregunta, que es la que Santiago hizo: cómo se ve.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

export type SeccionMuestra = { imagen: string; titulo: string; texto: string; seg: number };

// El velo: la imagen nace oscura del lado del texto, pero no se puede confiar
// en que SIEMPRE lo esté (la sección 5 del 06-10 llegó con el motivo cruzando
// al 44%). Así que el texto trae su propio respaldo, que se apaga antes de la
// mitad para no ensuciar el motivo.
const Velo: React.FC = () => (
  <AbsoluteFill style={{
    background: `linear-gradient(90deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.88) 38%, rgba(10,12,16,0.45) 50%, rgba(10,12,16,0) 62%)`,
  }} />
);

const Texto: React.FC<{ titulo: string; texto: string; dur: number }> = ({ titulo, texto, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const palabras = texto.split(/\s+/).filter(Boolean);
  // el texto empieza después del rótulo y termina un segundo antes del corte
  const desde = fps * 0.8;
  const hasta = dur - fps * 1.0;
  const visibles = Math.round(interpolate(frame, [desde, hasta], [0, palabras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  }));
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "50%", justifyContent: "center" }}>
      <div style={{
        fontFamily: tema.mono, fontSize: 24, letterSpacing: 2, textTransform: "uppercase",
        color: tema.patina, marginBottom: 28,
        opacity: interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: "clamp" }),
      }}>{titulo}</div>
      <div style={{ fontFamily: tema.serif, fontSize: 46, lineHeight: 1.42, color: tema.papel }}>
        {palabras.map((p, i) => (
          <span key={i} style={{
            opacity: i < visibles ? 1 : 0.14,
            transition: "none",
            textShadow: "0 2px 18px rgba(10,14,22,0.75)",
          }}>{p}{" "}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const ClaveMuestra: React.FC<{ secciones: SeccionMuestra[] }> = ({ secciones }) => {
  const { fps } = useVideoConfig();
  let t = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      {secciones.map((s, i) => {
        const dur = Math.round(s.seg * fps);
        const desde = t; t += dur;
        return (
          <Sequence key={i} from={desde} durationInFrames={dur}>
            <AbsoluteFill>
              <Img src={staticFile(s.imagen)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <Velo />
              <Texto titulo={s.titulo} texto={s.texto} dur={dur} />
              {/* SONIDO (06-10-2026, pedido de Santiago). DOS por sección y no
                  uno por palabra: a cuarenta palabras por sección, un sonido
                  por palabra es una máquina tragamonedas. El golpe grave marca
                  el cambio de sección y el tic acompaña al rótulo. Los dos se
                  generaron a mano (public/sonidos/) para que el canal no
                  dependa de un banco externo ni de una licencia ajena, y van
                  bajos a propósito: esto se llama "el resumen sin gritos". */}
              <Audio src={staticFile("sonidos/seccion.wav")} volume={0.5} />
              <Sequence from={Math.round(fps * 0.45)}>
                <Audio src={staticFile("sonidos/rotulo.wav")} volume={0.35} />
              </Sequence>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
