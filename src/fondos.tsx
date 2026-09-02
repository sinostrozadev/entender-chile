// Fondos por sección: textura dibujada en código sobre el papel, nunca fotos.
//
// Cuatro familias, una por tipo de sección, y encima dos capas de variación:
// el papel se tiñe un 3% con el color de la sección, y el azar (ángulo,
// densidad, posición) sale de una semilla = fecha + sección. Sembrado, no
// aleatorio: la misma edición se rinde siempre igual, y dos ediciones nunca
// coinciden. Regla dura: nada pasa de 0,10 de opacidad, y la textura se
// concentra lejos de la zona del texto (una máscara con dirección sembrada).
//
// Se enciende con meta.fondos en el timeline; sin eso, el video es el de
// siempre (decisión del 02-09: nada cambia en producción hasta verlo).
import React, { createContext, useContext } from "react";
import { AbsoluteFill } from "remotion";
import { tema, colorDeSeccion } from "./tema";

export type Familia = "topografica" | "grafico" | "trama" | "rayado";
export const FondosContext = createContext<{ activo: boolean; fecha: string }>({ activo: false, fecha: "" });
export const useFondos = () => useContext(FondosContext);

// FNV-1a + mulberry32: pequeño, estable entre navegadores y suficiente.
const semilla = (txt: string) => {
  let h = 2166136261;
  for (const c of txt) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return h;
};
const azar = (s0: number) => {
  let s = s0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

// Familia por nombre de sección. El orden importa: "Coordinación policial con
// Bolivia" es policial antes que territorial.
const familias: Array<[RegExp, Familia]> = [
  [/seguridad|polic|fiscal|justicia|corte|delito|carabinero|pdi|crimen|homicid|narco|^caso\b|molino/i, "rayado"],
  [/econom|mercado|bolsillo|trabajo|empleo|imacec|hipotec|fondo|pensi|subsidio|inflaci|\bipc\b|cobre|miner|financ|banco|tasa|dólar|dolar/i, "grafico"],
  [/regi|clima|tiempo|medioambiente|incendio|lluvia|alerta|río|rio|volc|sismo|terremoto|comuna|ciudad|vivienda|territor|bolivia|argentina|perú|peru|internacional|mundo|curioso/i, "topografica"],
  [/congreso|senado|cámara|camara|gobierno|reforma|ley|constitu|elecci|presiden|minist|contralor|licencia|derechos|agenda|apertura|cierre|titulares/i, "trama"],
];
export const familiaDe = (seccion: string | undefined, fecha: string): Familia => {
  const s = seccion ?? "";
  for (const [re, f] of familias) if (re.test(s)) return f;
  const todas: Familia[] = ["topografica", "grafico", "trama", "rayado"];
  return todas[semilla(fecha + "|" + s) % 4];
};

const hexRgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mezcla = (a: string, b: string, t: number) => {
  const A = hexRgb(a), B = hexRgb(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
};
export const papelDe = (seccion?: string) => mezcla(tema.papel, colorDeSeccion(seccion), 0.035);

const W = 1920, H = 1080;

// ---- las cuatro texturas ----
const Topografica: React.FC<{ r: () => number; color: string; fuerza: number }> = ({ r, color, fuerza }) => {
  const cx = 1100 + r() * 700, cy = 200 + r() * 700;
  const base = 120 + r() * 80, paso = 62 + r() * 30, n = 7 + Math.floor(r() * 4);
  const f1 = r() * Math.PI * 2, f2 = r() * Math.PI * 2, a1 = 0.14 + r() * 0.1, a2 = 0.06 + r() * 0.08;
  const curvas: string[] = [];
  for (let k = 0; k < n; k++) {
    const rk = base + k * paso;
    const pts: string[] = [];
    for (let i = 0; i <= 90; i++) {
      const th = (i / 90) * Math.PI * 2;
      const rr = rk * (1 + a1 * Math.sin(3 * th + f1) + a2 * Math.sin(5 * th + f2));
      pts.push(`${(cx + rr * Math.cos(th)).toFixed(1)},${(cy + rr * 0.78 * Math.sin(th)).toFixed(1)}`);
    }
    curvas.push("M" + pts.join("L") + "Z");
  }
  return (
    <g fill="none" stroke={color} strokeWidth={1.6} opacity={0.095 * fuerza}>
      {curvas.map((d, i) => <path key={i} d={d} />)}
    </g>
  );
};

const Grafico: React.FC<{ r: () => number; color: string; fuerza: number }> = ({ r, color, fuerza }) => {
  const y0 = 720 + r() * 200, x0 = 220 + r() * 300, x1 = W - 120;
  const paso = 70 + r() * 40;
  const marcas: number[] = [];
  for (let x = x0; x < x1; x += paso) marcas.push(x);
  // una línea de serie, tenue, que sube o baja según la semilla
  const pts: string[] = [];
  let y = y0 - 60 - r() * 200;
  for (let x = x0; x <= x1; x += paso * 1.5) { y += (r() - 0.5) * 70; pts.push(`${x.toFixed(0)},${Math.max(y0 - 420, Math.min(y0 - 20, y)).toFixed(0)}`); }
  return (
    <g stroke={color} fill="none" opacity={0.11 * fuerza}>
      <line x1={x0} y1={y0} x2={x1} y2={y0} strokeWidth={2} />
      {marcas.map((x) => <line key={x} x1={x} y1={y0} x2={x} y2={y0 + 10} strokeWidth={1.5} />)}
      {[1, 2, 3].map((k) => <line key={k} x1={x0} y1={y0 - k * 120} x2={x1} y2={y0 - k * 120} strokeWidth={1} strokeDasharray="2 10" />)}
      <polyline points={pts.join(" ")} strokeWidth={2.2} strokeLinejoin="round" opacity={0.8} />
    </g>
  );
};

const Trama: React.FC<{ r: () => number; color: string; fuerza: number }> = ({ r, color, fuerza }) => {
  const paso = 24 + r() * 8, ang = r() * Math.PI * 2;
  const dx = Math.cos(ang), dy = Math.sin(ang);
  const puntos: React.ReactNode[] = [];
  for (let y = paso / 2; y < H; y += paso)
    for (let x = paso / 2; x < W; x += paso) {
      const t = ((x * dx + y * dy) / (W * Math.abs(dx) + H * Math.abs(dy) || 1) + 1) / 2; // 0..1 a lo largo del ángulo
      const rad = 0.6 + 2.6 * t * t;
      if (rad < 0.9) continue;
      puntos.push(<circle key={`${x}-${y}`} cx={x} cy={y} r={rad} />);
    }
  return <g fill={color} opacity={0.13 * fuerza}>{puntos}</g>;
};

const Rayado: React.FC<{ r: () => number; color: string; fuerza: number }> = ({ r, color, fuerza }) => {
  const ang = 25 + r() * 40, paso = 15 + r() * 8, id = "ray" + Math.floor(r() * 1e6);
  return (
    <>
      <defs>
        <pattern id={id} width={paso} height={paso} patternUnits="userSpaceOnUse" patternTransform={`rotate(${ang.toFixed(1)})`}>
          <line x1={0} y1={0} x2={0} y2={paso} stroke={color} strokeWidth={1.1} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} opacity={0.13 * fuerza} />
    </>
  );
};

// ---- el fondo completo ----
export const Fondo: React.FC<{ seccion?: string; fuerza?: number; extractos?: string[] }> = ({ seccion, fuerza = 1, extractos = [] }) => {
  const { fecha } = useFondos();
  const familia = familiaDe(seccion, fecha);
  const r = azar(semilla(fecha + "|" + (seccion ?? "")));
  const color = colorDeSeccion(seccion);
  // Máscara: la textura es densa lejos del texto (que vive a la izquierda y al
  // centro) y se desvanece hacia él. La dirección varía con la semilla.
  const dir = r();
  // En una tarjeta (fuerza < 1) el texto vive a la izquierda: la textura
  // desaparece del todo en ese 45% y solo queda a la derecha. En la cortina
  // (fuerza >= 1) puede cubrir más, porque solo hay un título.
  const masc = fuerza < 1
    ? "linear-gradient(90deg, transparent 0%, transparent 45%, rgba(0,0,0,0.55) 75%, black 100%)"
    : dir < 0.5
    ? "linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.45) 55%, black 100%)"
    : "linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, black 100%)";
  const idM = "m" + Math.floor(r() * 1e6);
  const textura =
    familia === "topografica" ? <Topografica r={r} color={color} fuerza={fuerza} /> :
    familia === "grafico" ? <Grafico r={r} color={color} fuerza={fuerza} /> :
    familia === "trama" ? <Trama r={r} color={color} fuerza={fuerza} /> :
    <Rayado r={r} color={color} fuerza={fuerza} />;
  return (
    <AbsoluteFill style={{ backgroundColor: papelDe(seccion) }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, WebkitMaskImage: masc, maskImage: masc }} data-familia={familia} data-mask={idM}>
        {textura}
      </svg>
      {extractos.slice(0, 2).map((ex, i) => {
        const top = 120 + r() * 640, left = 880 + r() * 340, ang = (r() - 0.5) * 6;  // siempre entero en pantalla
        return (
          <div key={i} style={{ position: "absolute", top, left, width: 620, transform: `rotate(${ang.toFixed(1)}deg)`, opacity: 0.11 * fuerza,
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)", maskImage: "linear-gradient(90deg, transparent, black 15%, black 85%, transparent)" }}>
            <div style={{ fontFamily: tema.serif, fontSize: 34, lineHeight: 1.3, color: tema.tinta, maxHeight: 135, overflow: "hidden" }}>{ex}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
