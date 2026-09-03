// Video de prueba de los fondos por sección GENERADOS (Gemini, 03-09).
// Ocho secciones, 6 s cada una: primero la cortina (imagen casi a plena
// vista + título), después una tarjeta real encima con el velo de papel que
// haría legible el texto en producción. Mudo, es para MIRAR.
//
//   REMOTION_FUENTES_LOCALES=1 npx remotion render ejemplos/fondos-video.tsx Fondos out/fondos-video.mp4
import React from "react";
import { AbsoluteFill, Composition, Img, registerRoot, staticFile, useCurrentFrame } from "remotion";
import { tema, colorDeSeccion } from "../src/tema";

const FPS = 30, SEG = 6, CORTINA = 1.4;

const SECS: Array<{ titulo: string; img: string; tesis: string; cifra?: string; etiqueta?: string }> = [
  { titulo: "Economía", img: "seccion-economia.jpg", tesis: "La economía cayó 1,5% y Hacienda ya prepara una nueva proyección.", cifra: "-1,5%", etiqueta: "Imacec de julio, en doce meses" },
  { titulo: "Seguridad y justicia", img: "seccion-seguridad.jpg", tesis: "La Fiscalía investiga un plan contra el alcalde de San Bernardo." },
  { titulo: "Política y Congreso", img: "seccion-congreso.jpg", tesis: "La reforma amplía su discusión de quince a treinta días por Cámara.", cifra: "15 → 30", etiqueta: "días de discusión por Cámara" },
  { titulo: "Chile en regiones", img: "seccion-regiones.jpg", tesis: "Cinco capitales regionales concentran el alza de las postulaciones." },
  { titulo: "Clima y emergencias", img: "seccion-clima.jpg", tesis: "Viento de hasta cien kilómetros por hora en la cordillera central.", cifra: "100 km/h", etiqueta: "viento proyectado en cordillera" },
  { titulo: "Salud", img: "seccion-salud.jpg", tesis: "El perjuicio al sistema público de salud supera los 31 mil millones.", cifra: "$31.571 M", etiqueta: "perjuicio al sistema público" },
  { titulo: "Internacional", img: "seccion-internacional.jpg", tesis: "La visita llega tras el impasse por el Estrecho de Magallanes." },
  { titulo: "Dato curioso", img: "seccion-dato-curioso.jpg", tesis: "El primer ascensor de Valparaíso funcionó con agua, no con motor." },
];

const Seccion: React.FC<{ s: (typeof SECS)[number]; desde: number }> = ({ s, desde }) => {
  const frame = useCurrentFrame() - desde * FPS;
  const t = frame / FPS;
  if (t < 0 || t >= SEG) return null;
  const enCortina = t < CORTINA;
  const color = colorDeSeccion(s.titulo);
  // velo: en cortina la imagen respira (0,25 de velo); en tarjeta el papel
  // vuelve a mandar (0,82) para que el texto gane siempre.
  const velo = enCortina ? 0.22 : 0.82;
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel }}>
      <Img src={staticFile(`fondos/${s.img}`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ backgroundColor: tema.papel, opacity: velo }} />
      {enCortina ? (
        <AbsoluteFill style={{ justifyContent: "center", padding: 120 }}>
          <div style={{ width: 120, height: 10, background: color, marginBottom: 30 }} />
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 96, color: tema.tinta, maxWidth: 1100 }}>{s.titulo}</div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ justifyContent: "center", padding: 128 }}>
          <div style={{ position: "absolute", left: 56, top: 150, bottom: 150, width: 8, borderRadius: 4, background: color, opacity: 0.85 }} />
          {s.cifra ? (
            <>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 190, lineHeight: 1, color: tema.tinta }}>{s.cifra}</div>
              <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 22 }}>{s.etiqueta}</div>
              <div style={{ fontFamily: tema.sans, fontSize: 34, color: tema.tinta, marginTop: 48, maxWidth: 1150, lineHeight: 1.45 }}>{s.tesis}</div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase", color }}>La idea</div>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 74, color: tema.tinta, maxWidth: 1320, lineHeight: 1.16, marginTop: 26 }}>{s.tesis}</div>
            </>
          )}
          <div style={{ position: "absolute", left: 128, right: 128, bottom: 64, fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.06em", color: tema.gris }}>FUENTE · ejemplo para la prueba de fondos</div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel }}>
    {SECS.map((s, i) => <Seccion key={s.titulo} s={s} desde={i * SEG} />)}
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition id="Fondos" component={Video} width={1920} height={1080} fps={FPS} durationInFrames={SECS.length * SEG * FPS} />
);
registerRoot(Root);
