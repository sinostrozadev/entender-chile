// TALLER DEL VIDEO (24-09-2026). Banco de pruebas del formato visual del
// informe, NO producción. Sale de dos ideas de Santiago:
//   1. "encerrar el texto en un cuadro, como si estuviera en una tele"
//   2. "al fondo dejar la carátula del día, aunque sea para la principal"
//
// La segunda choca con la regla 29 si se toma literal: las tarjetas de datos
// son tipográficas y ninguna cifra grande lleva textura detrás. La salida es
// la D: la imagen es la PARED y el contenido vive en un panel sólido dentro
// del marco. Se ve la foto, y el número sigue leyéndose sobre papel limpio.
import React from "react";
import { AbsoluteFill, Composition, Img, staticFile } from "remotion";
import { tema } from "./tema";

const IMG = "caratulas/2026-09-24.png";
const COBRE = "#D08A5B";

const Sello: React.FC<{ claro?: boolean }> = ({ claro }) => (
  <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase",
    color: claro ? "rgba(242,242,239,0.8)" : tema.gris }}>Entender Chile</div>
);

// A · APERTURA: la imagen del día a sangre. El que entró por la carátula
// encuentra exactamente lo que le prometieron.
const Apertura: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 20%, rgba(23,25,28,0.35) 62%, rgba(23,25,28,0.05) 100%)" }} />
    <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
    <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1400 }}>
      <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: 26 }}>
        El informe diario · 24 de septiembre
      </div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 116, lineHeight: 1.02, color: "#F7F6F2" }}>
        ¿Qué comprometió Chile?
      </div>
    </div>
  </AbsoluteFill>
);

// Marco de televisor: barra superior con el sello y la sección, cuerpo con el
// contenido. El borde es lo que identifica al canal en cualquier recorte.
const MarcoTV: React.FC<{ seccion: string; children: React.ReactNode; fondo?: string }> = ({ seccion, children, fondo }) => (
  <div style={{ position: "absolute", inset: 72, borderRadius: 10, overflow: "hidden",
    border: `4px solid ${tema.tinta}`, background: fondo ?? tema.papel, boxShadow: "0 40px 120px rgba(0,0,0,0.45)" }}>
    <div style={{ height: 84, background: tema.tinta, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 34px" }}>
      <Sello claro />
      <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: COBRE }}>{seccion}</div>
    </div>
    <div style={{ position: "absolute", top: 84, left: 0, right: 0, bottom: 0, padding: "70px 80px" }}>{children}</div>
  </div>
);

const Cifra: React.FC = () => (
  <>
    <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 210, lineHeight: 1.02, color: tema.tinta }}>947,40</div>
    <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 26 }}>cierre del dólar</div>
    <div style={{ position: "absolute", left: 80, bottom: 54, fontFamily: tema.mono, fontSize: 24, color: tema.gris, letterSpacing: "0.08em" }}>
      La Tercera, 22 sep
    </div>
  </>
);

// B · MARCO SOLO: el recuadro sobre el papel de siempre.
const MarcoSolo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#E7E6E1" }}>
    <MarcoTV seccion="Dólar"><Cifra /></MarcoTV>
  </AbsoluteFill>
);

// D · MARCO SOBRE LA IMAGEN: la foto del día es la pared; el contenido vive
// en un panel sólido dentro del marco. Se ve la imagen y el número se lee.
const MarcoSobreImagen: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "rgba(23,25,28,0.55)", backdropFilter: "blur(3px)" }} />
    <MarcoTV seccion="Dólar"><Cifra /></MarcoTV>
  </AbsoluteFill>
);

// C · CABECERA DE BLOQUE: la imagen vuelve tres segundos al entrar a la
// noticia principal, con el nombre del bloque.
const Cabecera: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", overflow: "hidden" }}>
      <Img src={staticFile(IMG)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: `linear-gradient(90deg, ${tema.tinta} 0%, rgba(23,25,28,0) 42%)` }} />
    </div>
    <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
    <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)", width: "46%" }}>
      <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: 22 }}>Bloque 2</div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 92, lineHeight: 1.04, color: "#F7F6F2" }}>Escudo de las Américas</div>
    </div>
  </AbsoluteFill>
);

export const RootTallerVideo: React.FC = () => (
  <>
    <Composition id="Apertura" component={Apertura} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="MarcoSolo" component={MarcoSolo} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="MarcoSobreImagen" component={MarcoSobreImagen} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="Cabecera" component={Cabecera} width={1920} height={1080} fps={1} durationInFrames={1} />
  </>
);
