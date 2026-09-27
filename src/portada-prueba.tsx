// PORTADA DEL VIDEO DE PRUEBA (27-09-2026).
//
// Existe por un pedido concreto de Santiago: antes de decidir las imágenes
// planas de sección quiere ver la carátula ilustrada y la fila de secciones
// pasando en el video, no en una lámina de contacto. El video de muestra que
// rinde scripts/prueba-video.js abre con la carátula a pantalla completa y
// después entra a las secciones.
//
// NO es producción y no cambia nada en producción: se monta solo si el
// timeline trae meta.portada, y ese campo lo escribe únicamente el modo de
// prueba. El timeline del día no lo tiene, así que en la edición real este
// archivo no se ejecuta nunca.
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

const COBRE = "#D08A5B";

export const PortadaPrueba: React.FC<{ imagen: string; titulo?: string; fecha?: string }> =
({ imagen, titulo, fecha }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // entra y sale con un fundido corto: un corte seco desde la carátula a la
  // primera tarjeta es el golpe que ya se pagó en el informe del 24-09
  const entrada = interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(frame, [durationInFrames - 0.5 * fps, durationInFrames], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      day: "numeric", month: "long", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = ` · ${txt}`;
  }
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta, opacity: Math.min(entrada, salida) }}>
      {/* EL RESPIRO DE LA PORTADA (27-09-2026). La ilustracion del dia estaba
          completamente quieta y era lo primero que se veia del video: un
          cuadro fijo durante tres segundos y medio se lee como una foto
          pegada. El zoom es lento y solo mueve la IMAGEN; el gancho y el
          nombre del canal van aparte y quedan clavados. */}
      <Img src={staticFile(imagen)} style={{ position: "absolute", inset: 0,
        width: "100%", height: "100%", objectFit: "cover",
        transform: `scale(${1.02 + frame * 0.00035})` }} />
      {/* el velo va abajo y a la izquierda, donde vive el texto: la
          ilustración tiene que quedar a la vista, que es lo que se está
          juzgando en esta prueba */}
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 18%, rgba(23,25,28,0.3) 60%, rgba(23,25,28,0) 100%)" }} />
      <div style={{ position: "absolute", left: 120, top: 92, fontFamily: tema.mono, fontSize: 26,
        letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.8)" }}>
        Entender Chile
      </div>
      <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1420 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em",
          textTransform: "uppercase", color: COBRE, marginBottom: 24 }}>
          El informe diario{fechaLarga}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 104, lineHeight: 1.02, color: "#F7F6F2" }}>
          {titulo || ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};
