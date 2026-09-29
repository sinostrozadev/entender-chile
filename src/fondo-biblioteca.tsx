// FONDOS PROPIOS DE LA BIBLIOTECA (29-09-2026).
//
// Santiago: "eso es lo que pensaba, crear fondos e imágenes para que se muevan
// entre ellas y dar algún efecto". Hasta acá el fondo que había debajo del
// motivo era la foto de la SECCIÓN, que es fija, no la elegimos para esto y
// además trae su propio dibujo encima (el grabado). Dos dibujos compitiendo.
//
// Estos fondos son de la biblioteca y van dibujados en código, no generados.
// Tres razones, y ninguna es que salga más rápido:
//
//   se mueven de verdad   una trama dibujada se puede desplazar indefinidamente
//                         sin repetirse ni estirarse. Una foto solo se puede
//                         acercar o correr unos píxeles antes de que se note.
//   no pesan              el informe ya paga 227 MB cuando algo no se comprime.
//                         Una trama de líneas es lo más barato que existe para
//                         un codificador: se repite igual cuadro a cuadro.
//   combinan              cuatro tramas por veinte motivos son ochenta fondos
//                         distintos sin pedir una imagen más.
//
// Son DELIBERADAMENTE tenues. No son la imagen, son lo que se mueve detrás de
// la imagen para que haya dos velocidades. Si se notan, están mal.
import React from "react";
import { AbsoluteFill } from "remotion";

export type Trama = "diagonal" | "cuadricula" | "reglones" | "puntos";

export const TRAMAS: Trama[] = ["diagonal", "cuadricula", "reglones", "puntos"];

// qué trama le toca a una imagen, sin que nadie la elija: se reparte por el
// nombre del archivo, así el mismo concepto siempre sale con la misma y dos
// conceptos seguidos casi nunca repiten
export const tramaDe = (clave: string): Trama => {
  let n = 0;
  for (let i = 0; i < clave.length; i++) n = (n * 31 + clave.charCodeAt(i)) % 9973;
  return TRAMAS[n % TRAMAS.length];
};

const Dibujo: React.FC<{ trama: Trama; id: string; color: string }> = ({ trama, id, color }) => {
  const trazo = { stroke: color, fill: "none", strokeWidth: 1.4 };
  switch (trama) {
    case "cuadricula":
      return (
        <pattern id={id} width={104} height={104} patternUnits="userSpaceOnUse">
          <path d="M0 0 H104 M0 0 V104" {...trazo} />
        </pattern>
      );
    case "reglones":
      // ANTES ACÁ HABÍA CURVAS DE NIVEL, círculos concéntricos, y duraron un
      // render: sobre el motivo de las monedas quedaban círculos encima de
      // círculos y el fondo pasaba a ser otro dibujo. Ninguna trama puede
      // tener forma de algo. Reglones: líneas y nada más.
      return (
        <pattern id={id} width={72} height={72} patternUnits="userSpaceOnUse">
          <path d="M0 36 H72" {...trazo} />
        </pattern>
      );
    case "puntos":
      return (
        <pattern id={id} width={62} height={62} patternUnits="userSpaceOnUse">
          <circle cx={31} cy={31} r={2.1} fill={color} stroke="none" />
        </pattern>
      );
    case "diagonal":
    default:
      return (
        <pattern id={id} width={44} height={44} patternUnits="userSpaceOnUse">
          <path d="M-8 52 L52 -8 M-8 8 L8 -8 M36 52 L52 36" {...trazo} />
        </pattern>
      );
  }
};

export const FondoBiblioteca: React.FC<{
  trama: Trama; dx: number; dy: number; opacidad: number; color?: string; escala?: number;
}> = ({ trama, dx, dy, opacidad, color = "#E8E7E1", escala = 1 }) => {
  const id = `trama-${trama}`;
  return (
    <AbsoluteFill style={{ opacity: opacidad }}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs><Dibujo trama={trama} id={id} color={color} /></defs>
        <rect x={-400} y={-400} width={2720} height={1880} fill={`url(#${id})`}
          transform={`translate(${dx} ${dy}) scale(${escala})`} />
      </svg>
    </AbsoluteFill>
  );
};
