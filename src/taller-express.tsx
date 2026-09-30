// TALLER · LOS TRES FONDOS DE TARJETA (24-09-2026).
//
// Santiago, después del express anterior: "lo que no quiero es que cambie a
// blanco". El problema nunca fue la transición, era la TARJETA: el contenido
// vivía sobre papel, así que cada vez que empezaba a hablar la noticia, la
// pantalla se ponía blanca y la imagen desaparecía.
//
// Ahora cada bloque va sobre SU imagen: la principal sobre la ilustración del
// día (la misma de la carátula, así el que entró por esa imagen la sigue
// viendo) y cada sección sobre la suya. Y la principal ABRE, sin cabecera.
//
// Este video muestra el mismo tramo tres veces, una por cada manera de dejar
// leer el texto encima, las tres que propuso él:
//   1. COLUMNA    la imagen se queda a la derecha y a la izquierda se deshace
//                 en bloques hasta el negro donde va el texto;
//   2. OSCURECER  la imagen queda entera de fondo y baja de brillo;
//   3. TV         la imagen queda entera y el texto va dentro de un cuadro.
import React from "react";
import { AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema } from "./tema";
import { Tarjeta, Evento, FondoTarjetaContext, ModoCuadro } from "./tarjetas";
import { TransicionMosaico, Baldosa } from "./mosaico";

const COBRE = "#D08A5B";
const FECHA = "2026-09-24";
const CARATULA = `caratulas/${FECHA}.png`;
const FUENTE = "La Tercera, 23 sep; El Mostrador, 23 sep";

const BALDOSAS: Baldosa[] = [
  { texto: "La noticia del día", categoria: null },
  { texto: "Escudo de las Américas", categoria: "internacional" },
  { texto: "Reforma al sistema político", categoria: "congreso" },
  { texto: "Proyecto Antibarricadas", categoria: "seguridad" },
  { texto: "Sistema frontal en el sur", categoria: "clima" },
  { texto: "Dólar sobre los novecientos sesenta", categoria: "economia" },
];
const I_CLIMA = 4;

const ev = (e: Partial<Evento>): Evento =>
  ({ tipo: "tesis", from: 0, to: 10, fuenteSeccion: FUENTE, ...e } as Evento);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const fade = (d: number, dur = 14) => interpolate(f, [d, d + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <Img src={staticFile(CARATULA)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
        objectFit: "cover", transform: `scale(${interpolate(f, [0, 90], [1, 1.04])})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.94) 22%, rgba(23,25,28,0.32) 68%, rgba(23,25,28,0) 100%)" }} />
      <div style={{ position: "absolute", left: 110, top: 86, fontFamily: tema.mono, fontSize: 24,
        letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.8)", opacity: fade(3) }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 110, bottom: 120, maxWidth: 1350 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.18em", textTransform: "uppercase",
          color: COBRE, marginBottom: 24, opacity: fade(9) }}>El informe diario · 24 de septiembre</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 96, lineHeight: 1.04, color: "#F7F6F2",
          opacity: fade(16, 14) }}>¿Qué comprometió Chile?</div>
      </div>
    </AbsoluteFill>
  );
};

// Un tramo del informe: portada → la principal (abre, sin cabecera) →
// cabecera de clima → clima. 284 cuadros.
const T = 77;
const TRAMO = {
  portada: { from: 0,   dur: 74 },
  ppal:    { from: 74,  dur: 126 },
  trans:   { from: 162, dur: T },
  clima:   { from: 186, dur: 98 },
};
const LARGO = 284;

const Tramo: React.FC<{ modo: ModoCuadro }> = ({ modo }) => (
  <FondoTarjetaContext.Provider value={{ modo, caratula: CARATULA, secciones: ["clima.png"] }}>
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Sequence from={TRAMO.portada.from} durationInFrames={TRAMO.portada.dur}><Portada /></Sequence>
      <Sequence from={TRAMO.ppal.from} durationInFrames={TRAMO.ppal.dur}>
        <Tarjeta ev={ev({ tipo: "tesis",
          texto: "El Congreso interpelará al canciller por la adhesión de Chile al Escudo de las Américas." })} />
      </Sequence>
      <Sequence from={TRAMO.clima.from} durationInFrames={TRAMO.clima.dur}>
        <Tarjeta ev={ev({ tipo: "dato", grafico: "cifra", seccion: "Sistema frontal en el sur", categoria: "clima",
          series: [{ etiqueta: "acumulado proyectado en cordillera", raw: "más de 300 mm", num: 300, unidad: "mm" }] })} />
      </Sequence>
      <Sequence from={TRAMO.trans.from} durationInFrames={TRAMO.trans.dur}>
        <TransicionMosaico baldosas={BALDOSAS} indice={I_CLIMA} dur={T / 24}
          conImagen={["clima.png"]} fecha={FECHA} />
      </Sequence>
    </AbsoluteFill>
  </FondoTarjetaContext.Provider>
);

const MODOS: { modo: ModoCuadro; nombre: string; nota: string }[] = [
  { modo: "columna", nombre: "1 · columna", nota: "la imagen se deshace en bloques hacia la izquierda" },
  { modo: "oscurecer", nombre: "2 · oscurecer", nota: "la imagen entera, más oscura" },
  { modo: "tv", nombre: "3 · cuadro", nota: "la imagen entera y el texto adentro de un cuadro" },
];

const Banda: React.FC<{ n: string; nota: string }> = ({ n, nota }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "16px 56px", backgroundColor: "#15171A",
    display: "flex", alignItems: "baseline", gap: 26 }}>
    <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.1em", color: "#F2F2EF" }}>{n}</div>
    <div style={{ fontFamily: tema.mono, fontSize: 21, color: "rgba(242,242,239,0.6)" }}>{nota}</div>
  </div>
);

const Express: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
    {MODOS.map((m, i) => (
      <Sequence key={m.modo} from={i * LARGO} durationInFrames={LARGO}>
        <Tramo modo={m.modo} />
        <Banda n={m.nombre} nota={m.nota} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const RootExpress: React.FC = () => (
  <Composition id="Express" component={Express} width={1920} height={1080} fps={24}
    durationInFrames={MODOS.length * LARGO} />
);
