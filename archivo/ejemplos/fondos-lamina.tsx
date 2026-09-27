// Láminas de presentación de los fondos por sección (iteración con Santiago,
// 02-09). Una lámina = las cuatro familias en grilla 2x2, a una fuerza dada.
//   npx remotion still ejemplos/fondos-lamina.tsx Lamina out/lamina.png --props='{"fuerza":1.6,"modo":"cortina"}'
// modo "cortina": pantalla completa con el título de sección (la tira de capítulos).
// modo "tarjeta": una tarjeta de texto real encima, para juzgar legibilidad.
import React from "react";
import { AbsoluteFill, Composition, registerRoot } from "remotion";
import { Fondo, FondosContext } from "../src/fondos";
import { tema, colorDeSeccion } from "../src/tema";

const SECCIONES: Array<[string, string]> = [
  ["Economía", "pauta de gráfico"],
  ["Seguridad en San Bernardo", "rayado"],
  ["Congreso", "trama de diario"],
  ["Chile en regiones", "topográfica"],
];

const Celda: React.FC<{ seccion: string; etiqueta: string; fuerza: number; modo: string; tono?: "seccion" | "oscuro" | "tinta" }> = ({ seccion, etiqueta, fuerza, modo, tono = "seccion" }) => (
  <div style={{ position: "relative", width: 1920, height: 1080, transform: "scale(0.5)", transformOrigin: "top left", overflow: "hidden" }}>
    <Fondo seccion={seccion} fuerza={fuerza} tono={tono} extractos={modo === "cortina" ? ["El Banco Central atribuyó la caída a la minería y al clima."] : []} />
    {modo === "cortina" ? (
      <AbsoluteFill style={{ alignItems: "flex-start", justifyContent: "center", padding: 120 }}>
        <div style={{ width: 120, height: 10, background: colorDeSeccion(seccion), marginBottom: 28 }} />
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 92, color: tema.tinta }}>{seccion}</div>
        <div style={{ fontFamily: tema.mono, fontSize: 26, color: tema.gris, marginTop: 18, letterSpacing: "0.2em", textTransform: "uppercase" }}>{etiqueta} · fuerza {fuerza}{" · tono "}{tono}</div>
      </AbsoluteFill>
    ) : (
      <AbsoluteFill style={{ justifyContent: "center", padding: 128 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.22em", textTransform: "uppercase", color: colorDeSeccion(seccion) }}>La idea</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 76, color: tema.tinta, maxWidth: 1340, lineHeight: 1.15, marginTop: 24 }}>
          La economía cayó 1,5% y Hacienda ya prepara una nueva proyección.
        </div>
        <div style={{ fontFamily: tema.mono, fontSize: 26, color: tema.gris, marginTop: 30 }}>{etiqueta} · fuerza {fuerza}</div>
      </AbsoluteFill>
    )}
  </div>
);

const Lamina: React.FC<{ fuerza: number; modo: string; tono?: "seccion" | "oscuro" | "tinta" }> = ({ fuerza, modo, tono = "seccion" }) => (
  <FondosContext.Provider value={{ activo: true, fecha: "2026-09-02" }}>
    <AbsoluteFill style={{ background: "#111", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4 }}>
      {SECCIONES.map(([s, e]) => (
        <div key={s} style={{ position: "relative", overflow: "hidden" }}>
          <Celda seccion={s} etiqueta={e} fuerza={fuerza} modo={modo} tono={tono} />
        </div>
      ))}
    </AbsoluteFill>
  </FondosContext.Provider>
);

const RootLaminas: React.FC = () => (
  <Composition id="Lamina" component={Lamina} width={1920} height={1080} fps={1} durationInFrames={1}
    defaultProps={{ fuerza: 1.6, modo: "cortina", tono: "seccion" as const }} />
);
registerRoot(RootLaminas);
