// MUESTRA: las dos imágenes que generó Santiago, montadas donde de verdad
// irían (29-09-2026). Es la comparación que decide el estilo de la biblioteca,
// y por eso el cuadro se arma igual que en el video: el mismo pie de fuente,
// la misma barra cobre, el mismo velo cuando corresponde.
//
// Los cuatro cuadros:
//   0  papel, sin velo          lo que se vería si la imagen entra tal cual
//   1  papel, bajo el velo      el mismo, con el velo que el video le pone hoy
//                               a toda imagen de fondo
//   2  oscuro, sin velo         la otra candidata, tal cual
//   3  oscuro con la cifra      el 35% de los párrafos lleva un número, y la
//                               firma del canal es que toda cifra va con su
//                               fuente a la vista: la imagen reemplaza la
//                               prosa, nunca el dato
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { tema } from "./tema";

const PAPEL = "biblioteca/gobierno-papel.png";
const OSCURO = "biblioteca/gobierno-oscuro.png";
const FUENTE = "FUENTE · Senapred vía La Tercera, 26 sep";

const CUADROS = [
  { img: PAPEL, velo: false, rotulo: "Papel, sin velo", claro: false },
  { img: PAPEL, velo: true, rotulo: "Papel, bajo el velo del video", claro: true },
  { img: OSCURO, velo: false, rotulo: "Oscuro, sin velo", claro: true },
  { img: OSCURO, velo: false, rotulo: "Oscuro, con la cifra encima", claro: true, cifra: true },
];

export const MuestraBiblioteca: React.FC = () => {
  const f = useCurrentFrame();
  const c = CUADROS[Math.min(f, CUADROS.length - 1)];
  const tinta = c.claro ? "#F7F6F2" : "#3A3D42";
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Img src={staticFile(c.img)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {c.velo ? <AbsoluteFill style={{ backgroundColor: "rgba(21,23,26,0.76)" }} /> : null}
      <div style={{ position: "absolute", left: tema.margen - 34, top: 150, bottom: 150, width: 4, backgroundColor: "#D08A5B" }} />
      {c.cifra ? (
        // la cifra se corre a la izquierda para no taparle el motivo: el dato
        // manda, pero el dibujo tiene que seguir leyéndose
        <AbsoluteFill style={{ padding: tema.margen, justifyContent: "center" }}>
          <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#5BA391", marginBottom: 22 }}>Viviendas con daño</div>
          <div style={{ display: "flex", gap: 64, alignItems: "flex-end" }}>
            {[["209", "daño mayor"], ["977", "daño menor"]].map(([n, q]) => (
              <div key={n}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 104, lineHeight: 1, color: "#F7F6F2" }}>{n}</div>
                <div style={{ fontFamily: tema.sans, fontSize: 28, color: "rgba(242,242,239,0.74)", marginTop: 10 }}>{q}</div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      ) : null}
      <div style={{ position: "absolute", left: tema.margen, top: 92, fontFamily: tema.mono, fontSize: 24,
        letterSpacing: "0.22em", textTransform: "uppercase", color: tinta, opacity: 0.7 }}>{c.rotulo}</div>
      <div style={{ position: "absolute", left: tema.margen, bottom: 58, fontFamily: tema.mono, fontSize: 24,
        letterSpacing: "0.14em", color: tinta, opacity: 0.5 }}>{FUENTE}</div>
    </AbsoluteFill>
  );
};
