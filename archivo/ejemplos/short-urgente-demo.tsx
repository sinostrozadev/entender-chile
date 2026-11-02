// Short URGENTE de prueba (piel rojo vino, 03-09). Mudo, para MIRAR:
// cómo se vería la serie de última hora del agente de guardia.
//   REMOTION_FUENTES_LOCALES=1 npx remotion render ejemplos/short-urgente-demo.tsx ShortUrgente out/short-urgente-demo.mp4
import React from "react";
import { AbsoluteFill, Composition, Img, interpolate, registerRoot, staticFile, useCurrentFrame } from "remotion";
import { tema } from "../src/tema";

const FPS = 30;
const CREMA = "#EDE6DA", GRIS = "#C7BFB2", COBRE = "#D08A5B", ALERTA = "#B3402F";

const Escena: React.FC<{ desde: number; hasta: number; children: React.ReactNode }> = ({ desde, hasta, children }) => {
  const f = useCurrentFrame();
  const t0 = desde * FPS, t1 = hasta * FPS;
  if (f < t0 || f >= t1) return null;
  const op = interpolate(f, [t0, t0 + 10, t1 - 8, t1], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: op, padding: "150px 90px", justifyContent: "center" }}>{children}</AbsoluteFill>;
};

const Chip: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
    <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.3em", color: CREMA, background: ALERTA, padding: "10px 26px", borderRadius: 8 }}>URGENTE</div>
    <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase", color: COBRE }}>Entender Chile</div>
  </div>
);

const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#1a0608" }}>
    <Img src={staticFile("fondos/fondo-urgente-vertical.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    {/* 0-3: sello de la serie */}
    <Escena desde={0} hasta={3}>
      <Chip />
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 88, lineHeight: 1.1, color: CREMA, maxWidth: 880 }}>Última hora</div>
      <div style={{ fontFamily: tema.mono, fontSize: 30, color: GRIS, marginTop: 26 }}>miércoles 3 · 10:14</div>
    </Escena>
    {/* 3-10: el titular */}
    <Escena desde={3} hasta={10}>
      <Chip />
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 82, lineHeight: 1.14, color: CREMA, maxWidth: 900 }}>
        La economía cayó 1,5% en julio: la mayor baja desde marzo de 2023
      </div>
    </Escena>
    {/* 10-17: la cifra */}
    <Escena desde={10} hasta={17}>
      <Chip />
      <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 230, lineHeight: 1, color: CREMA }}>-1,5%</div>
        <svg viewBox="0 0 100 100" style={{ width: 110, height: 110, transform: "rotate(180deg)" }}><path d="M50 12 L84 50 L64 50 L64 88 L36 88 L36 50 L16 50 Z" fill={ALERTA} /></svg>
      </div>
      <div style={{ fontFamily: tema.sans, fontSize: 44, color: GRIS, marginTop: 30, maxWidth: 860 }}>actividad económica de julio, en doce meses</div>
      <div style={{ fontFamily: tema.mono, fontSize: 27, letterSpacing: "0.06em", color: COBRE, marginTop: 60 }}>FUENTE · Banco Central, hace minutos</div>
    </Escena>
    {/* 17-23: el cierre de la serie */}
    <Escena desde={17} hasta={23}>
      <Chip />
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 72, lineHeight: 1.18, color: CREMA, maxWidth: 880 }}>
        El detalle y lo que significa, hoy en el canal.
      </div>
      <div style={{ fontFamily: tema.mono, fontSize: 32, color: GRIS, marginTop: 44 }}>@entenderchile · El resumen sin gritos</div>
    </Escena>
  </AbsoluteFill>
);

const Root: React.FC = () => (
  <Composition id="ShortUrgente" component={Video} width={1080} height={1920} fps={FPS} durationInFrames={23 * FPS} />
);
registerRoot(Root);
