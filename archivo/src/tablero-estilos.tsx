// TABLERO DE ESTILOS PARA LA BIBLIOTECA (29-09-2026). Regla del repo: lo que
// se ve se muestra con variantes reales y lo elige Santiago. Yo había escrito
// los cuarenta prompts con UN estilo decidido por mí, y su pregunta ("¿qué
// tipo de imágenes pediste?") es la que corresponde.
//
// El dibujo de acá es un SUSTITUTO hecho en código, no la obra final: sirve
// para decidir el TRATAMIENTO (peso de línea, fondo claro u oscuro, relleno o
// no, tamaño en el cuadro), que es lo que hay que fijar antes de pedirle
// cuarenta imágenes a GPT. El motivo es siempre el mismo, una balanza, para
// que lo único que cambie sea el estilo.
//
// El cuadro se dibuja como se vería DE VERDAD: con el pie de fuente y la barra
// cobre que lleva toda tarjeta, porque un estilo se juzga en su contexto y no
// en una lámina suelta.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { tema } from "./tema";

const PAPEL = "#EFEFEC";
const TINTA_OSCURA = "#3A3D42";
const FONDO_OSCURO = "#23262A";
const TINTA_CLARA = "#E8E7E1";

// La balanza, en dos versiones: de línea y maciza. Mismo dibujo, distinto peso.
const Balanza: React.FC<{ color: string; grosor: number; relleno?: boolean; trama?: boolean }> =
({ color, grosor, relleno, trama }) => (
  <svg viewBox="0 0 400 300" style={{ width: "62%", height: "auto" }}>
    <defs>
      <pattern id="rayas" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="6" stroke={color} strokeWidth="2" />
      </pattern>
    </defs>
    <g fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round">
      <line x1="200" y1="46" x2="200" y2="248" />
      <line x1="150" y1="248" x2="250" y2="248" />
      <line x1="72" y1="64" x2="328" y2="52" />
      <circle cx="200" cy="40" r="10" fill={relleno ? color : trama ? "url(#rayas)" : "none"} />
      <line x1="80" y1="60" x2="80" y2="112" />
      <line x1="320" y1="56" x2="320" y2="108" />
      <path d="M 26 112 Q 80 176 134 112 Z" fill={relleno ? color : trama ? "url(#rayas)" : "none"} />
      <path d="M 266 108 Q 320 172 374 108 Z" fill={relleno ? color : trama ? "url(#rayas)" : "none"} />
    </g>
  </svg>
);

type Variante = { id: string; nombre: string; fondo: string; tinta: string; grosor: number;
  nota: string; relleno?: boolean; trama?: boolean; velo?: boolean };
const VARIANTES: Variante[] = [
  { id: "A", nombre: "Grabado fino sobre papel", fondo: PAPEL, tinta: TINTA_OSCURA, grosor: 2.2,
    nota: "Lo que pedí en los cuarenta prompts, sin consultarte. Es el estilo de las imágenes de sección que ya están al aire." },
  { id: "B", nombre: "Grabado fino sobre oscuro", fondo: FONDO_OSCURO, tinta: TINTA_CLARA, grosor: 2.2,
    nota: "El mismo dibujo invertido. El video entero es oscuro: así el párrafo no enciende la pantalla." },
  { id: "C", nombre: "Trazo grueso sobre oscuro", fondo: FONDO_OSCURO, tinta: TINTA_CLARA, grosor: 5,
    nota: "Más peso de línea. Se lee de más lejos y aguanta mejor la compresión de YouTube." },
  { id: "D", nombre: "Silueta maciza", fondo: FONDO_OSCURO, tinta: TINTA_CLARA, grosor: 3, relleno: true,
    nota: "Formas llenas en vez de contorno. Es lo más cerca del pictograma que ya usa el canal." },
  { id: "E", nombre: "Grabado con trama", fondo: PAPEL, tinta: TINTA_OSCURA, grosor: 2.6, trama: true,
    nota: "Contorno con relleno rayado, como un billete antiguo. Da textura sin dejar de ser dibujo." },
  // El caso que decide: el estilo A metido bajo el velo que el video le pone a
  // toda imagen. El brillo vuelve al del video, pero el dibujo se apaga con él.
  { id: "A+", nombre: "Grabado sobre papel, bajo el velo", fondo: PAPEL, tinta: TINTA_OSCURA, grosor: 2.2, velo: true,
    nota: "El estilo A como quedaría si le ponemos el mismo velo que a las imágenes de sección. Deja de encender la pantalla, pero el dibujo se apaga con ella." },
];

export const TableroEstilos: React.FC = () => {
  const f = useCurrentFrame();
  const v = VARIANTES[Math.min(f, VARIANTES.length - 1)];
  return (
    <AbsoluteFill style={{ backgroundColor: v.fondo, alignItems: "center", justifyContent: "center" }}>
      <Balanza color={v.tinta} grosor={v.grosor} relleno={v.relleno} trama={v.trama} />
      {v.velo ? <AbsoluteFill style={{ backgroundColor: "rgba(21,23,26,0.76)" }} /> : null}
      <div style={{ position: "absolute", left: tema.margen - 34, top: 150, bottom: 150, width: 4, backgroundColor: "#D08A5B" }} />
      <div style={{ position: "absolute", left: tema.margen, top: 96, fontFamily: tema.mono, fontSize: 26,
        letterSpacing: "0.22em", textTransform: "uppercase", color: v.velo ? TINTA_CLARA : v.tinta, opacity: 0.75 }}>
        {v.id} · {v.nombre}
      </div>
      <div style={{ position: "absolute", left: tema.margen, right: tema.margen, bottom: 120, fontFamily: tema.sans,
        fontSize: 30, lineHeight: 1.4, color: v.velo ? TINTA_CLARA : v.tinta, opacity: 0.68, maxWidth: 1100 }}>{v.nota}</div>
      <div style={{ position: "absolute", left: tema.margen, bottom: 58, fontFamily: tema.mono, fontSize: 24,
        letterSpacing: "0.14em", color: v.velo ? TINTA_CLARA : v.tinta, opacity: 0.45 }}>FUENTE · Senapred vía La Tercera, 26 sep</div>
    </AbsoluteFill>
  );
};
