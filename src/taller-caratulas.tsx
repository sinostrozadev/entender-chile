// TALLER DE CARÁTULAS (23-09-2026). Banco de pruebas, NO producción: la
// carátula que sale al aire la hace MiniaturaV3 en src/marca.tsx. Acá se
// rinden variantes con el texto real del día para mirarlas y decidir.
// Diagnóstico que las motiva: la V3 deja el 60% del cuadro en papel blanco y
// la lámina de sección se dibuja al 8% de tinta, así que en la grilla de
// YouTube (168 px de ancho en un teléfono) la carátula es "dos cajas de texto
// sobre nada". Las tres variantes atacan eso de tres maneras distintas.
import React from "react";
import { AbsoluteFill, Composition, Img, staticFile } from "remotion";
import { tema, colorDeSeccion } from "./tema";

// mezcla dos hex (0 = a, 1 = b)
const mezclar = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [r1, g1, b1] = h(a); const [r2, g2, b2] = h(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};
const COBRE = "#D08A5B";

type Base = { linea1: string; linea2?: string; imagen: string; seccion?: string; semilla?: number };

// el tamaño sale del largo de la línea (mismo criterio que la V3)
const talla = (s: string, ancho: number, max = 118) =>
  Math.max(46, Math.min(max, Math.floor(ancho / (0.56 * Math.max(s.length, 8)))));

const marca = (color = "rgba(242,242,239,0.72)"): React.CSSProperties => ({
  position: "absolute", right: 44, top: 38, fontFamily: tema.mono, fontSize: 22,
  letterSpacing: "0.22em", textTransform: "uppercase", color,
});

// A · CAMPO: el cuadro entero es color de sección oscurecido y la lámina se
// agranda y se invierte, así el dibujo queda claro y grande sobre el color.
// Lo que resuelve: masa de color y un dibujo que se ve a 168 px.
const CaratulaCampo: React.FC<Base> = ({ linea1, linea2, imagen, seccion, semilla = 0 }) => {
  const color = colorDeSeccion(seccion);
  const fondo = mezclar(color, tema.tinta, 0.42);
  const desplazar = `${38 + (semilla % 5) * 8}% center`; // variación diaria por código
  return (
    <AbsoluteFill style={{ backgroundColor: fondo }}>
      <Img src={staticFile(imagen)} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        objectPosition: desplazar, transform: `scale(${1.9 + (semilla % 3) * 0.15})`,
        filter: "invert(1) contrast(1.35)", mixBlendMode: "screen", opacity: 0.55,
      }} />
      <AbsoluteFill style={{ background: `linear-gradient(200deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.35) 100%)` }} />
      <div style={marca()}>Entender Chile</div>
      <div style={{ position: "absolute", left: 46, bottom: 54, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
        <div style={{ display: "inline-block", background: COBRE, color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea1, 1120), lineHeight: 1, padding: "12px 28px 16px", textTransform: "uppercase", letterSpacing: "-0.015em", whiteSpace: "nowrap", boxShadow: "0 16px 44px rgba(0,0,0,0.45)" }}>{linea1}</div>
        {linea2 ? <div style={{ display: "inline-block", background: "#F7F6F2", color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea2, 1120), lineHeight: 1, padding: "12px 28px 16px", textTransform: "uppercase", letterSpacing: "-0.015em", whiteSpace: "nowrap", boxShadow: "0 16px 44px rgba(0,0,0,0.45)" }}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// B · CIFRA: la cifra del día ocupa un tercio del cuadro. Un número se lee a
// cualquier tamaño y dice "pasó algo medible" antes que cualquier palabra.
const CaratulaCifra: React.FC<Base & { cifra: string; etiqueta?: string }> = ({ linea1, linea2, cifra, etiqueta, seccion, imagen, semilla = 0 }) => {
  const color = colorDeSeccion(seccion);
  return (
    <AbsoluteFill style={{ backgroundColor: mezclar(color, tema.tinta, 0.72) }}>
      <Img src={staticFile(imagen)} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        objectPosition: `${60 + (semilla % 4) * 6}% center`, transform: "scale(1.7)",
        filter: "invert(1)", mixBlendMode: "screen", opacity: 0.28,
      }} />
      <div style={marca()}>Entender Chile</div>
      <div style={{ position: "absolute", left: 52, top: 96, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 4 ? 190 : 250, lineHeight: 0.86, color: COBRE, letterSpacing: "-0.03em" }}>{cifra}</div>
        {etiqueta ? <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,242,239,0.8)", marginTop: 14, maxWidth: 560 }}>{etiqueta}</div> : null}
      </div>
      <div style={{ position: "absolute", left: 52, bottom: 52, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
        <div style={{ display: "inline-block", background: "#F7F6F2", color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea1, 1000, 86), lineHeight: 1, padding: "10px 24px 14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{linea1}</div>
        {linea2 ? <div style={{ display: "inline-block", background: COBRE, color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea2, 1000, 86), lineHeight: 1, padding: "10px 24px 14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// C · RETRATO: la estructura del ejemplo que le gustó a Santiago. Panel de
// texto a la izquierda, sujeto a la derecha, borde duro entre los dos. Sin
// foto: el sujeto es la lámina de la sección, grande y recortada.
const CaratulaRetrato: React.FC<Base> = ({ linea1, linea2, imagen, seccion, semilla = 0 }) => {
  const color = colorDeSeccion(seccion);
  return (
    <AbsoluteFill style={{ backgroundColor: mezclar(color, tema.papel, 0.25) }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "46%", overflow: "hidden" }}>
        <Img src={staticFile(imagen)} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          objectPosition: `${45 + (semilla % 4) * 10}% center`, transform: "scale(2.3)", filter: "contrast(1.4)",
        }} />
        <AbsoluteFill style={{ background: `linear-gradient(90deg, ${mezclar(color, tema.tinta, 0.55)} 0%, rgba(0,0,0,0) 38%)` }} />
      </div>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "58%", background: mezclar(color, tema.tinta, 0.62) }} />
      <div style={{ ...marca("rgba(242,242,239,0.7)"), left: 44, right: "auto" }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 44, top: "50%", transform: "translateY(-50%)", width: "54%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        <div style={{ fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea1, 660, 96), lineHeight: 0.98, color: COBRE, textTransform: "uppercase", letterSpacing: "-0.02em" }}>{linea1}</div>
        {linea2 ? <div style={{ fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea2, 660, 96), lineHeight: 0.98, color: "#F7F6F2", textTransform: "uppercase", letterSpacing: "-0.02em" }}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// D · PICTOGRAMA: el hallazgo de la tarde. Las diez láminas de sección son
// texturas de 8% de tinta: agrandarlas no da una imagen, da un vacío blanco.
// Si el canal no puede usar fotos (regla 29), el "sujeto" de la carátula
// tiene que estar DIBUJADO POR CÓDIGO, grande y de un solo color. Acá va el
// prototipo con el pictograma de clima; si la dirección gusta, se dibujan
// los diez (uno por sección) con el mismo trazo.
const PictoLluvia: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }} fill="none"
    stroke={color} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M56 104a30 30 0 0 1 4-59 44 44 0 0 1 83-9 33 33 0 0 1 9 65z" />
    <path d="M70 128l-12 30M104 128l-12 30M138 128l-12 30" />
    <path d="M86 166l-7 18M120 166l-7 18" strokeWidth={7} opacity={0.65} />
  </svg>
);

const CaratulaPicto: React.FC<Base & { cifra?: string; etiqueta?: string }> = ({ linea1, linea2, cifra, etiqueta, seccion, semilla = 0 }) => {
  const color = colorDeSeccion(seccion);
  const fondo = mezclar(color, tema.tinta, 0.68);
  return (
    <AbsoluteFill style={{ backgroundColor: fondo }}>
      {/* el pictograma respira y se sale del cuadro: a 168 px se lee la silueta */}
      <div style={{ position: "absolute", right: -70 + (semilla % 4) * 10, top: 10, width: 470, height: 470, opacity: 0.9 }}>
        <PictoLluvia color={COBRE} />
      </div>
      <div style={{ ...marca("rgba(242,242,239,0.66)"), left: 44, right: "auto" }}>Entender Chile</div>
      {cifra ? (
        <div style={{ position: "absolute", left: 48, top: 104 }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 260, lineHeight: 0.82, color: "#F7F6F2", letterSpacing: "-0.03em" }}>{cifra}</div>
          {etiqueta ? <div style={{ fontFamily: tema.mono, fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase", color: COBRE, marginTop: 12 }}>{etiqueta}</div> : null}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 48, bottom: 50, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
        <div style={{ display: "inline-block", background: COBRE, color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea1, 980, 88), lineHeight: 1, padding: "10px 24px 14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{linea1}</div>
        {linea2 ? <div style={{ display: "inline-block", background: "#F7F6F2", color: tema.tinta, fontFamily: tema.sans, fontWeight: 600, fontSize: talla(linea2, 980, 88), lineHeight: 1, padding: "10px 24px 14px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

const props = { linea1: "¿CUÁNTA LLUVIA VIENE?", linea2: "SEIS REGIONES ALERTADAS", imagen: "fondos/seccion-clima.jpg", seccion: "clima", semilla: 23 };
export const RootTaller: React.FC = () => (
  <>
    <Composition id="CaratulaCampo" component={CaratulaCampo} width={1280} height={720} fps={1} durationInFrames={1} defaultProps={props} />
    <Composition id="CaratulaCifra" component={CaratulaCifra} width={1280} height={720} fps={1} durationInFrames={1} defaultProps={{ ...props, cifra: "105", etiqueta: "milímetros en 24 horas" }} />
    <Composition id="CaratulaPicto" component={CaratulaPicto} width={1280} height={720} fps={1} durationInFrames={1} defaultProps={{ ...props, cifra: "105", etiqueta: "milímetros en 24 horas" }} />
    <Composition id="CaratulaPictoSinCifra" component={CaratulaPicto} width={1280} height={720} fps={1} durationInFrames={1} defaultProps={props} />
    <Composition id="CaratulaRetrato" component={CaratulaRetrato} width={1280} height={720} fps={1} durationInFrames={1} defaultProps={props} />
  </>
);
