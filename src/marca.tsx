// Piezas fijas de marca e imágenes sueltas (no son video): avatar y banner
// del canal de YouTube, y la miniatura de cada edición. Entrada propia para
// no mezclarlas con el Root del video:
//
//   npx remotion still src/marca.tsx Avatar    out/marca/avatar.png
//   npx remotion still src/marca.tsx Banner    out/marca/banner.png   [--props='{"fondo":"fondos/banner-fondo.png"}']
//   npx remotion still src/marca.tsx Miniatura out/FECHA/miniatura.png --props='{"titulo":"...","cifra":"9,5%","etiqueta":"de desempleo","fecha":"29-08-2026"}'
//
// Mismo sistema visual que las tarjetas (tema.ts): papel, tinta, una pátina.
import React from "react";
import { AbsoluteFill, Composition, Img, registerRoot, staticFile } from "remotion";
import { tema, estiloEyebrow, colorDeSeccion } from "./tema";

const Avatar: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel, alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 400, lineHeight: 0.95, color: tema.tinta, letterSpacing: "-0.04em" }}>EC</div>
      <div style={{ width: 150, height: 14, backgroundColor: tema.patina, margin: "34px auto 0" }} />
    </div>
  </AbsoluteFill>
);

// Banner de YouTube: 2560x1440 (lo recomendado). Lo que se ve en TODOS los
// dispositivos es solo el rectángulo central de 1546x423, así que el texto va
// ahí. Con --props='{"fondo":"fondos/banner-fondo.png"}' (arte pedido a
// Gemini, ver ideas/fondos-prompts.md) va sobre esa imagen con la piel
// marina; sin props, papel. (Esto corre en el navegador: no hay fs.)
const Banner: React.FC<{ fondo?: string }> = ({ fondo }) => {
  const oscuro = Boolean(fondo);
  const tinta = oscuro ? "#EDE6DA" : tema.tinta;
  const gris = oscuro ? "#B9B2A6" : tema.gris;
  const acento = oscuro ? "#D08A5B" : tema.patina;
  return (
    <AbsoluteFill style={{ backgroundColor: oscuro ? "#0F1A2B" : tema.papel, alignItems: "center", justifyContent: "center" }}>
      {fondo ? <Img src={staticFile(fondo)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      <div style={{ width: 1546, height: 423, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ ...estiloEyebrow, fontSize: 26, color: acento, marginBottom: 26 }}>Las noticias de Chile, cada mañana</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 150, lineHeight: 1, color: tinta }}>Entender Chile</div>
        <div style={{ width: 110, height: 6, backgroundColor: acento, margin: "32px 0 26px" }} />
        <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: gris }}>El resumen sin gritos</div>
      </div>
    </AbsoluteFill>
  );
};

type MiniaturaProps = { titulo: string; cifra?: string; etiqueta?: string; fecha?: string; seccion?: string; estilo?: "papel" | "marino" };
// Miniatura 1280x720: se ve a 200 px de ancho en el celular, así que hay dos
// cosas y nada más: la cifra del día muy grande y el titular en una línea o dos.
const Miniatura: React.FC<MiniaturaProps> = ({ titulo, cifra, etiqueta, fecha, seccion, estilo = "marino" }) => {
  const oscuro = estilo === "marino";
  const color = oscuro ? "#D08A5B" : colorDeSeccion(seccion);
  const tinta = oscuro ? "#EDE6DA" : tema.tinta;
  const gris = oscuro ? "#C7BFB2" : tema.gris;
  return (
    <AbsoluteFill style={{ backgroundColor: oscuro ? "#0F1A2B" : tema.papel, padding: 64, justifyContent: "space-between" }}>
      {oscuro ? (
        <>
          <Img src={staticFile("fondos/banner-fondo.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(10,16,26,0.72) 0%, rgba(10,16,26,0.55) 60%, rgba(10,16,26,0.15) 100%)" }} />
        </>
      ) : (
        <div style={{ position: "absolute", left: 32, top: 90, bottom: 90, width: 10, borderRadius: 5, backgroundColor: color }} />
      )}
      <div style={{ ...estiloEyebrow, fontSize: 28, letterSpacing: "0.26em", color: oscuro ? color : tema.tinta, position: "relative" }}>
        Entender Chile{fecha ? ` · ${fecha}` : ""}
      </div>
      {cifra ? (
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 6 ? 200 : 300, lineHeight: 0.95, color: tinta, letterSpacing: "-0.02em" }}>{cifra}</div>
          {etiqueta ? <div style={{ fontFamily: tema.sans, fontSize: 48, color: gris, marginTop: 14 }}>{etiqueta}</div> : null}
        </div>
      ) : null}
      {/* títulos largos bajan de cuerpo; sin cifra, el título es el protagonista */}
      <div style={{ position: "relative", fontFamily: tema.serif, fontWeight: 600, fontSize: cifra ? (titulo.length > 58 ? 54 : 64) : titulo.length > 58 ? 84 : 104, lineHeight: 1.1, color: tinta, maxWidth: 1050 }}>{titulo}</div>
    </AbsoluteFill>
  );
};

const RootMarca: React.FC = () => (
  <>
    <Composition id="Avatar" component={Avatar} width={800} height={800} fps={1} durationInFrames={1} />
    <Composition id="Banner" component={Banner} width={2560} height={1440} fps={1} durationInFrames={1} defaultProps={{ fondo: "" }} />
    <Composition
      id="Miniatura"
      component={Miniatura}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ titulo: "Desempleo llega a 9,5% y el Gobierno activa subsidios", cifra: "9,5%", etiqueta: "de desempleo, mayo-julio", fecha: "29-08-2026", seccion: "Empleo" }}
    />
  </>
);

registerRoot(RootMarca);
