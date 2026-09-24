// TALLER · MOSAICO (24-09-2026). La idea de Santiago: después de la portada
// aparece una FILA con todas las secciones del día, moviéndose; se elige una,
// se hace zoom hasta llenar la pantalla, se lee, se aleja, esa se apaga y se
// enciende la siguiente.
//
// Por qué vale la pena: el que mira sabe en todo momento cuánto falta y de
// qué se va a hablar. Eso es de las pocas cosas que de verdad sostienen la
// retención en un video largo, y ningún canal de noticias chileno lo hace.
//
// El zoom es REAL, no un corte: se escala la fila entera y la baldosa
// elegida pasa a ocupar el cuadro. Por eso cada baldosa se dibuja a 480x270
// con las tipografías a un cuarto de su tamaño final; al escalar por cuatro
// quedan nítidas, porque es DOM y no una imagen.
//
// Se retiran dos cosas que Santiago descartó: el cuadro blanco (era marco
// por ser marco, no cumplía función) y el corte duro de dos columnas.
import React from "react";
import { AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Picto } from "./pictogramas";

const COBRE = "#D08A5B";
const IMG = "caratulas/2026-09-24.png";
const ANCHO = 480, ALTO = 270, HUECO = 44;   // baldosa y separación
const ESCALA = 1920 / ANCHO;                  // cuánto hay que crecer para llenar

const sec = [
  { slug: "clima", nombre: "El frente que viene" },
  { slug: "economia", nombre: "Dólar bajo los 950" },
  { slug: "congreso", nombre: "La reforma por un voto" },
  { slug: "seguridad", nombre: "Escudo de las Américas" },
  { slug: "salud", nombre: "Salud mental juvenil" },
  { slug: "regiones", nombre: "Vuelos a Juan Fernández" },
];

const fade = (f: number, d: number, dur = 12) => interpolate(f, [d, d + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// contenido de una baldosa, dibujado a escala 1/4
const Baldosa: React.FC<{ i: number; activa: boolean; leida: boolean; f: number; abierta: boolean }> =
({ i, activa, leida, f, abierta }) => {
  const s = sec[i];
  const color = colorDeSeccion(s.slug);
  return (
    <div style={{ width: ANCHO, height: ALTO, flex: "0 0 auto", position: "relative", overflow: "hidden",
      background: color, filter: leida ? "grayscale(1) brightness(0.45)" : "none",
      opacity: leida ? 0.55 : activa ? 1 : 0.82,
      transition: "none", boxShadow: activa ? `0 0 0 3px ${COBRE}` : "none" }}>
      <div style={{ position: "absolute", right: -26, top: -18, width: 190, height: 190, opacity: 0.9 }}>
        <Picto nombre={s.slug} color="rgba(255,255,255,0.9)" />
      </div>
      <AbsoluteFill style={{ background: "linear-gradient(60deg, rgba(23,25,28,0.86) 26%, rgba(23,25,28,0.1) 78%)" }} />
      <div style={{ position: "absolute", left: 24, top: 20, fontFamily: tema.mono, fontSize: 9,
        letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.75)" }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 24, bottom: abierta ? 150 : 22, width: 300 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: 6 }}>
          Bloque {i + 1}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: abierta ? 26 : 22, lineHeight: 1.06, color: "#F7F6F2" }}>{s.nombre}</div>
      </div>
      {/* el dato solo existe cuando la baldosa está abierta: en la fila sería ruido */}
      {abierta ? (
        <div style={{ position: "absolute", left: 24, bottom: 34, opacity: fade(f, 8, 10) }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 52, lineHeight: 1, color: "#F7F6F2" }}>
            {i === 0 ? "105 mm" : i === 1 ? "947,40" : "88"}
          </div>
          <div style={{ width: interpolate(f, [16, 28], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), height: 3, background: COBRE, marginTop: 5 }} />
          <div style={{ fontFamily: tema.sans, fontSize: 11, color: "rgba(242,242,239,0.72)", marginTop: 9, opacity: fade(f, 22) }}>
            {i === 0 ? "alerta oficial en algunas zonas" : i === 1 ? "cierre del dólar" : "votos a favor, faltaba uno"}
          </div>
        </div>
      ) : null}
    </div>
  );
};

// La fila completa. "foco" = índice abierto (o null); "avance" mueve la fila.
const Fila: React.FC<{ foco: number | null; leidas: number[]; zoom: number; deriva: number; fLocal: number }> =
({ foco, leidas, zoom, deriva, fLocal }) => {
  const paso = ANCHO + HUECO;
  // centro de la baldosa enfocada respecto al centro de la fila
  const centro = (sec.length - 1) / 2;
  const objetivo = foco === null ? 0 : (foco - centro) * paso;
  const escala = 1 + (ESCALA - 1) * zoom;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: HUECO, transform: `scale(${escala}) translateX(${-objetivo - deriva}px)`, transformOrigin: "center center" }}>
        {sec.map((s, i) => (
          <Baldosa key={s.slug} i={i} f={fLocal} activa={foco === i} leida={leidas.includes(i)} abierta={foco === i && zoom > 0.55} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        transform: `scale(${interpolate(f, [0, 72], [1, 1.07])})` }} />
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 20%, rgba(23,25,28,0.3) 66%, rgba(23,25,28,0) 100%)" }} />
      <div style={{ position: "absolute", left: 120, top: 92, fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.8)", opacity: fade(f, 4) }}>Entender Chile</div>
      <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1400 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 24, opacity: fade(f, 12) }}>El informe diario · 24 de septiembre</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 110, lineHeight: 1.02, color: "#F7F6F2", opacity: fade(f, 20, 16) }}>
          ¿Qué comprometió Chile?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// el guion del mosaico: cuándo se abre cada baldosa y cuándo se cierra
const PLAN = [
  { entra: 26, abre: 44, cierra: 150, sale: 168 },
  { entra: 184, abre: 202, cierra: 300, sale: 318 },
  { entra: 334, abre: 352, cierra: 446, sale: 464 },
];

const Recorrido: React.FC = () => {
  const f = useCurrentFrame();
  let foco: number | null = null, zoom = 0, fLocal = 0;
  const leidas: number[] = [];
  PLAN.forEach((p, i) => {
    if (f >= p.sale) leidas.push(i);
    if (f >= p.entra && f < p.sale) {
      foco = i;
      zoom = f < p.abre ? interpolate(f, [p.entra, p.abre], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
        : f < p.cierra ? 1
        : interpolate(f, [p.cierra, p.sale], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      fLocal = f - p.abre;
    }
  });
  // cuando ninguna está enfocada, la fila deriva despacio: está viva
  const deriva = interpolate(f, [0, 480], [0, 90]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Fila foco={foco} leidas={leidas} zoom={zoom} deriva={deriva} fLocal={fLocal} />
      {/* el sello vuelve cuando la fila está a la vista, no sobre la baldosa abierta */}
      <div style={{ position: "absolute", left: 60, top: 54, fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.22em",
        textTransform: "uppercase", color: "rgba(242,242,239,0.5)", opacity: 1 - zoom }}>Entender Chile</div>
    </AbsoluteFill>
  );
};

const Mosaico: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence durationInFrames={80}><Portada /></Sequence>
    <Sequence from={80} durationInFrames={490}><Recorrido /></Sequence>
  </AbsoluteFill>
);

export const RootMosaico: React.FC = () => (
  <Composition id="Mosaico" component={Mosaico} width={1920} height={1080} fps={24} durationInFrames={570} />
);
