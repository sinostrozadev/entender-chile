import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow, estiloFuente, colorDeSeccion } from "./tema";

// ---------- tipos ----------
export type Serie = { etiqueta: string; num: number | null; unidad: string; raw: string };
export type Evento = {
  tipo: "tesis" | "narracion" | "cita" | "dato" | "esquema" | "seccion";
  texto?: string;
  etiqueta?: "hecho" | "interpretacion" | null;
  soporte?: boolean;
  overlay?: boolean;
  autor?: string;
  fuente?: string;
  grafico?: "barras" | "cifra" | "comparacion" | "lineas" | "marcador" | "tabla";
  seccion?: string;
  series?: Serie[];
  titulo?: string;
  elementos?: string[];
  caption?: string;
  from: number;
  to: number;
};

// ---------- utilidades ----------
const useEntrada = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 } });
  return {
    opacity: e,
    transform: `translateY(${interpolate(e, [0, 1], [26, 0])}px)`,
  };
};

const Marco: React.FC<{ children: React.ReactNode; abajo?: React.ReactNode; seccion?: string }> = ({ children, abajo, seccion }) => (
  <AbsoluteFill style={{ backgroundColor: tema.papel, padding: tema.margen, justifyContent: "center" }}>
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 150,
        bottom: 150,
        width: 8,
        borderRadius: 4,
        backgroundColor: colorDeSeccion(seccion),
        opacity: 0.85,
      }}
    />
    <div style={{ maxWidth: tema.anchoTexto }}>{children}</div>
    {abajo ? (
      <div style={{ position: "absolute", left: tema.margen, right: tema.margen, bottom: 84 }}>{abajo}</div>
    ) : null}
  </AbsoluteFill>
);

const Chip: React.FC<{ etiqueta: "hecho" | "interpretacion" }> = ({ etiqueta }) => {
  const solido = etiqueta === "hecho";
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: tema.mono,
        fontSize: 24,
        letterSpacing: "0.18em",
        padding: "10px 22px",
        borderRadius: 999,
        marginBottom: 34,
        color: solido ? tema.papel : tema.patina,
        backgroundColor: solido ? tema.tinta : "transparent",
        border: solido ? `2px solid ${tema.tinta}` : `2px solid ${tema.patina}`,
      }}
    >
      {solido ? "HECHO" : "INTERPRETACIÓN"}
    </div>
  );
};

const PieFuente: React.FC<{ fuente?: string; caption?: string }> = ({ fuente, caption }) => (
  <div>
    {caption ? (
      <div style={{ fontFamily: tema.sans, fontSize: 28, lineHeight: 1.4, color: tema.gris, maxWidth: 1200, marginBottom: 18 }}>
        {caption}
      </div>
    ) : null}
    {fuente ? <div style={estiloFuente}>FUENTE · {fuente}</div> : null}
  </div>
);

// ---------- tarjetas ----------
export const TarjetaTesis: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion}>
      <div style={{ ...st }}>
        <div style={{ ...estiloEyebrow, marginBottom: 30 }}>La idea</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 76, lineHeight: 1.14, color: tema.tinta }}>
          {ev.texto}
        </div>
      </div>
    </Marco>
  );
};

export const TarjetaParrafo: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion}>
      <div style={{ ...st }}>
        {ev.etiqueta ? <div><Chip etiqueta={ev.etiqueta} /></div> : null}
        <div style={{ fontFamily: tema.sans, fontSize: 42, lineHeight: 1.5, color: tema.tinta }}>{ev.texto}</div>
      </div>
    </Marco>
  );
};

export const TarjetaCita: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} />}>
      <div style={{ ...st }}>
        <div style={{ fontFamily: tema.serif, fontStyle: "italic", fontSize: 58, lineHeight: 1.3, color: tema.tinta }}>
          “{ev.texto}”
        </div>
        <div style={{ fontFamily: tema.mono, fontSize: 28, color: tema.patina, marginTop: 40 }}>— {ev.autor}</div>
      </div>
    </Marco>
  );
};

const tamanoValor = (raw: string, base: number): number => {
  const n = raw.length;
  if (n <= 6) return base;
  if (n <= 12) return Math.round(base * 0.62);
  if (n <= 24) return Math.round(base * 0.4);
  return Math.round(base * 0.3);
};

export const TarjetaDatoBarras: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  if (series.some((s) => s.num == null)) return <TarjetaDatoComparacion ev={ev} />; // valores no numéricos: no hay barra posible
  const max = Math.max(...series.map((s) => Math.abs(s.num ?? 0)), 1);
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} caption={ev.caption} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 6, fps, config: { damping: 200 } });
          const w = interpolate(e, [0, 1], [0, (Math.abs(s.num ?? 0) / max) * 780]);
          const destacada = i === 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <div style={{ width: 470, fontFamily: tema.sans, fontSize: 32, color: tema.tinta, textAlign: "right" }}>
                {s.etiqueta}
              </div>
              <div style={{ width: 800, height: 46, backgroundColor: tema.linea, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ width: w, height: "100%", backgroundColor: destacada ? tema.patina : tema.tinta, borderRadius: 8 }} />
              </div>
              <div style={{ fontFamily: tema.mono, fontSize: 36, color: tema.tinta, opacity: e }}>{s.raw}</div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDatoComparacion: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} caption={ev.caption} />}>
      <div style={{ display: "flex", gap: 90, alignItems: "flex-end" }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 7, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ opacity: e, transform: `translateY(${interpolate(e, [0, 1], [24, 0])}px)` }}>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, 132), lineHeight: 1.05, color: (s.num ?? 0) < 0 ? tema.tinta : tema.patina, maxWidth: 480 }}>
                {s.raw}
              </div>
              <div style={{ fontFamily: tema.sans, fontSize: 32, color: tema.gris, marginTop: 18, maxWidth: 420 }}>{s.etiqueta}</div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDatoCifra: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  const s = (ev.series ?? [])[0];
  if (!s) return null;
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} caption={ev.caption} />}>
      <div style={{ ...st }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, 210), lineHeight: 1.05, color: tema.tinta }}>{s.raw}</div>
        <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 26 }}>{s.etiqueta}</div>
      </div>
    </Marco>
  );
};

export const TarjetaEsquema: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elems = ev.elementos ?? [];
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente caption={ev.caption} />}>
      <div style={{ ...estiloEyebrow, marginBottom: 44 }}>{ev.titulo}</div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 26 }}>
        {elems.map((el, i) => {
          const e = spring({ frame: frame - i * 8, fps, config: { damping: 200 } });
          return (
            <React.Fragment key={i}>
              {i > 0 ? (
                <div style={{ fontFamily: tema.mono, fontSize: 44, color: tema.patina, opacity: e }}>→</div>
              ) : null}
              <div
                style={{
                  opacity: e,
                  transform: `translateY(${interpolate(e, [0, 1], [18, 0])}px)`,
                  backgroundColor: tema.papelElevado,
                  border: `2px solid ${tema.tinta}`,
                  borderRadius: 12,
                  padding: "26px 34px",
                  fontFamily: tema.sans,
                  fontSize: 32,
                  color: tema.tinta,
                  maxWidth: 420,
                }}
              >
                {el}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Marco>
  );
};

export const SeccionBanner: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 } });
  const color = colorDeSeccion(texto);
  return (
    <div style={{ position: "absolute", top: 64, left: tema.margen }}>
      <div
        style={{
          fontFamily: tema.mono,
          fontSize: 26,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: tema.tinta,
          opacity: e,
        }}
      >
        {texto}
      </div>
      <div style={{ height: 4, width: interpolate(e, [0, 1], [0, 130]), backgroundColor: color, marginTop: 12 }} />
    </div>
  );
};

export const TarjetaMarcador: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  const s = ev.series ?? [];
  const local = s[0], visita = s[1];
  if (!local || !visita) return <TarjetaDatoCifra ev={ev} />;
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} caption={ev.caption} />}>
      <div style={{ ...st, display: "flex", alignItems: "baseline", gap: 48, flexWrap: "wrap" }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 66, color: tema.tinta }}>{local.etiqueta}</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 120, color: colorDeSeccion(ev.seccion) }}>
          {local.raw}<span style={{ color: tema.gris, padding: "0 22px" }}>–</span>{visita.raw}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 66, color: tema.tinta }}>{visita.etiqueta}</div>
      </div>
    </Marco>
  );
};

export const TarjetaTabla: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente} caption={ev.caption} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 1000 }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 6, fps, config: { damping: 200 } });
          const lider = i === 0;
          return (
            <div
              key={i}
              style={{
                opacity: e,
                transform: `translateY(${interpolate(e, [0, 1], [14, 0])}px)`,
                display: "flex",
                alignItems: "center",
                gap: 40,
                padding: "26px 10px",
                borderBottom: i < series.length - 1 ? `2px solid ${tema.linea}` : "none",
              }}
            >
              <div style={{ fontFamily: tema.mono, fontSize: 30, color: tema.gris, width: 56 }}>{i + 1}</div>
              <div style={{ fontFamily: tema.sans, fontSize: 40, fontWeight: lider ? 600 : 400, color: tema.tinta, flex: 1 }}>
                {s.etiqueta}
              </div>
              <div style={{ fontFamily: tema.mono, fontSize: 40, color: lider ? colorDeSeccion(ev.seccion) : tema.tinta }}>
                {s.raw}
              </div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDato: React.FC<{ ev: Evento }> = ({ ev }) => {
  switch (ev.grafico) {
    case "marcador":
      return <TarjetaMarcador ev={ev} />;
    case "tabla":
      return <TarjetaTabla ev={ev} />;
    case "barras":
      return <TarjetaDatoBarras ev={ev} />;
    case "comparacion":
    case "lineas": // v1: las líneas caen a comparación; componente propio en v2
      return <TarjetaDatoComparacion ev={ev} />;
    case "cifra":
    default:
      return <TarjetaDatoCifra ev={ev} />;
  }
};

export const Tarjeta: React.FC<{ ev: Evento }> = ({ ev }) => {
  switch (ev.tipo) {
    case "tesis":
      return <TarjetaTesis ev={ev} />;
    case "cita":
      return <TarjetaCita ev={ev} />;
    case "dato":
      return <TarjetaDato ev={ev} />;
    case "esquema":
      return <TarjetaEsquema ev={ev} />;
    case "narracion":
    default:
      return <TarjetaParrafo ev={ev} />;
  }
};
