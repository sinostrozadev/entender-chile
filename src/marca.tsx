// Piezas fijas de marca e imágenes sueltas (no son video): avatar y banner
// del canal de YouTube, y la miniatura de cada edición. Entrada propia para
// no mezclarlas con el Root del video:
//
//   npx remotion still src/marca.tsx Avatar    out/marca/avatar.png
//   npx remotion still src/marca.tsx Banner    out/marca/banner.png
//   npx remotion still src/marca.tsx Miniatura out/FECHA/miniatura.png --props='{"titulo":"...","cifra":"9,5%","etiqueta":"de desempleo","fecha":"29-08-2026"}'
//
// Mismo sistema visual que las tarjetas (tema.ts): papel, tinta, una pátina.
import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { tema, estiloEyebrow, colorDeSeccion } from "./tema";

const Avatar: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel, alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 400, lineHeight: 0.95, color: tema.tinta, letterSpacing: "-0.04em" }}>EC</div>
      <div style={{ width: 150, height: 14, backgroundColor: tema.patina, margin: "34px auto 0" }} />
    </div>
  </AbsoluteFill>
);

// Banner de YouTube: 2048x1152; lo que se ve en todos los dispositivos es el
// rectángulo central de 1235x338, así que todo el contenido va ahí.
const Banner: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel, alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 1235, height: 338, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...estiloEyebrow, fontSize: 22, marginBottom: 22 }}>Las noticias de Chile, cada mañana</div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 120, lineHeight: 1, color: tema.tinta }}>Entender Chile</div>
      <div style={{ width: 96, height: 5, backgroundColor: tema.patina, margin: "28px 0 22px" }} />
      <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.08em", color: tema.gris }}>El resumen sin gritos</div>
    </div>
  </AbsoluteFill>
);

type MiniaturaProps = { titulo: string; cifra?: string; etiqueta?: string; fecha?: string; seccion?: string };
// Miniatura 1280x720: se ve a 200 px de ancho en el celular, así que hay dos
// cosas y nada más: la cifra del día muy grande y el titular en una línea o dos.
const Miniatura: React.FC<MiniaturaProps> = ({ titulo, cifra, etiqueta, fecha, seccion }) => {
  const color = colorDeSeccion(seccion);
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel, padding: 64, justifyContent: "space-between" }}>
      <div style={{ position: "absolute", left: 32, top: 90, bottom: 90, width: 10, borderRadius: 5, backgroundColor: color }} />
      <div style={{ ...estiloEyebrow, fontSize: 26, letterSpacing: "0.26em", color: tema.tinta }}>
        Entender Chile{fecha ? ` · ${fecha}` : ""}
      </div>
      {cifra ? (
        <div>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 6 ? 200 : 300, lineHeight: 0.95, color: tema.tinta, letterSpacing: "-0.02em" }}>{cifra}</div>
          {etiqueta ? <div style={{ fontFamily: tema.sans, fontSize: 46, color: tema.gris, marginTop: 14 }}>{etiqueta}</div> : null}
        </div>
      ) : null}
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra ? 64 : 96, lineHeight: 1.12, color: tema.tinta, maxWidth: 1100 }}>{titulo}</div>
    </AbsoluteFill>
  );
};

const RootMarca: React.FC = () => (
  <>
    <Composition id="Avatar" component={Avatar} width={800} height={800} fps={1} durationInFrames={1} />
    <Composition id="Banner" component={Banner} width={2048} height={1152} fps={1} durationInFrames={1} />
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
