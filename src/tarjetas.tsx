import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow, estiloFuente, colorDeSeccion } from "./tema";
import { Fondo, useFondos } from "./fondos";

// ---------- tipos ----------
export type Tendencia = { dir: "sube" | "baja" | "igual" | null; sentido: "bien" | "mal" | null };
export type Serie = { etiqueta: string; num: number | null; unidad: string; raw: string; tendencia?: Tendencia };
export type Evento = {
  tipo: "tesis" | "narracion" | "cita" | "dato" | "esquema" | "seccion" | "titulares";
  items?: { texto: string; from: number; to: number }[];
  texto?: string;
  textoPantalla?: string;      // el texto con los números en numerales (la voz lee `texto`)
  fuenteSeccion?: string;      // fuente principal del bloque: va al pie de todas sus tarjetas
  automatico?: boolean;        // cifra que el sistema sacó del párrafo (no la eligió el guion)
  etiqueta?: "hecho" | "interpretacion" | null;
  soporte?: boolean;
  overlay?: boolean;
  autor?: string;
  fuente?: string;
  grafico?: "barras" | "cifra" | "comparacion" | "lineas" | "marcador" | "tabla" | "cambio";
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

const Marco: React.FC<{ children: React.ReactNode; abajo?: React.ReactNode; seccion?: string }> = ({ children, abajo, seccion }) => {
  const fondos = useFondos();
  return (
  <AbsoluteFill style={{ backgroundColor: tema.papel, padding: tema.margen, justifyContent: "center" }}>
    {fondos.activo ? <Fondo seccion={seccion} fuerza={0.7} /> : null}
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
    <div style={{ maxWidth: tema.anchoTexto, position: "relative" }}>{children}</div>
    {abajo ? (
      <div style={{ position: "absolute", left: tema.margen, right: tema.margen, bottom: 84 }}>{abajo}</div>
    ) : null}
  </AbsoluteFill>
  );
};

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

// Indicador junto a una cifra: flecha arriba/abajo, igual, visto o alerta.
// Dibujado en SVG (sin depender de que la fuente traiga el glifo). Verde =
// bien, rojo = mal; por defecto subir es bien y bajar es mal, salvo que el
// guion diga lo contrario ("(baja bien)": bajó el desempleo).
const ROJO = "#B3402F";
export const Indicador: React.FC<{ t?: Tendencia; size?: number }> = ({ t, size = 96 }) => {
  if (!t || (!t.dir && !t.sentido)) return null;
  const sentido = t.sentido ?? (t.dir === "sube" ? "bien" : t.dir === "baja" ? "mal" : null);
  const color = sentido === "bien" ? tema.patina : sentido === "mal" ? ROJO : tema.gris;
  const st = { width: size, height: size, flexShrink: 0 } as React.CSSProperties;
  if (t.dir === "sube" || t.dir === "baja") {
    return (
      <svg viewBox="0 0 100 100" style={{ ...st, transform: t.dir === "baja" ? "rotate(180deg)" : undefined }}>
        <path d="M50 12 L84 50 L64 50 L64 88 L36 88 L36 50 L16 50 Z" fill={color} />
      </svg>
    );
  }
  if (t.dir === "igual") {
    return (
      <svg viewBox="0 0 100 100" style={st}>
        <rect x="16" y="42" width="68" height="16" rx="4" fill={color} />
      </svg>
    );
  }
  if (sentido === "bien") {
    return (
      <svg viewBox="0 0 100 100" style={st}>
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="8" />
        <path d="M28 52 L44 68 L74 34" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" style={st}>
      <path d="M50 10 L92 86 L8 86 Z" fill="none" stroke={color} strokeWidth="8" strokeLinejoin="round" />
      <rect x="45" y="38" width="10" height="26" rx="3" fill={color} />
      <circle cx="50" cy="74" r="6" fill={color} />
    </svg>
  );
};

// ---------- tarjetas ----------
export const TarjetaTesis: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ ...st }}>
        <div style={{ ...estiloEyebrow, marginBottom: 30 }}>La idea</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoProsa(ev.textoPantalla ?? ev.texto ?? "", 76), lineHeight: 1.14, color: tema.tinta }}>
          {ev.textoPantalla ?? ev.texto}
        </div>
      </div>
    </Marco>
  );
};

export const TarjetaParrafo: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ ...st }}>
        {ev.etiqueta ? <div><Chip etiqueta={ev.etiqueta} /></div> : null}
        <div style={{ fontFamily: tema.sans, fontSize: 42, lineHeight: 1.5, color: tema.tinta }}>{ev.textoPantalla ?? ev.texto}</div>
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
          “{ev.textoPantalla ?? ev.texto}”
        </div>
        <div style={{ fontFamily: tema.mono, fontSize: 28, color: tema.patina, marginTop: 40 }}>- {ev.autor}</div>
      </div>
    </Marco>
  );
};

// Prosa: encoge para que una tesis larga no se salga del cuadro (red del
// BUG 1, 02-09). Mismos cortes que en Short.tsx, calibrados a 1920x1080.
export const tamanoProsa = (t: string, base: number): number => {
  const n = (t || "").length;
  if (n <= 90) return base;
  if (n <= 140) return Math.round(base * 0.82);
  if (n <= 200) return Math.round(base * 0.66);
  if (n <= 300) return Math.round(base * 0.52);
  return Math.round(base * 0.42);
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
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
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
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ display: "flex", gap: 90, alignItems: "flex-end" }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 7, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ opacity: e, transform: `translateY(${interpolate(e, [0, 1], [24, 0])}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, 132), lineHeight: 1.05, color: (s.num ?? 0) < 0 ? tema.tinta : tema.patina, maxWidth: 480 }}>
                  {s.raw}
                </div>
                <Indicador t={s.tendencia} size={72} />
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
  const soloSenal = !s.raw; // "Empleo formal: (baja mal)" -> la etiqueta grande con la flecha
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...st }}>
        {soloSenal ? (
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 120, lineHeight: 1.05, color: tema.tinta, maxWidth: 1100 }}>{s.etiqueta}</div>
            <Indicador t={s.tendencia} size={150} />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, 210), lineHeight: 1.05, color: tema.tinta }}>{s.raw}</div>
              <Indicador t={s.tendencia} size={110} />
            </div>
            {s.etiqueta ? <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 26 }}>{s.etiqueta}</div> : null}
          </>
        )}
      </div>
    </Marco>
  );
};

// Antes → después: "17 → 7 buques por día" con la flecha del sentido. Para
// una variación es más claro que barras o comparación (pedido de Santiago, 29-08).
export const TarjetaDatoCambio: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  const s = ev.series ?? [];
  const antes = s[0], despues = s[1];
  if (!antes || !despues) return <TarjetaDatoCifra ev={ev} />;
  const base = Math.max(antes.raw.length, despues.raw.length) > 8 ? 120 : 190;
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...st }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: base, lineHeight: 1.05, color: tema.gris }}>{antes.raw}</div>
          <svg viewBox="0 0 100 100" style={{ width: base * 0.5, height: base * 0.5, flexShrink: 0 }}>
            <path d="M10 50 L70 50 M52 30 L72 50 L52 70" fill="none" stroke={tema.gris} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: base, lineHeight: 1.05, color: tema.tinta }}>{despues.raw}</div>
          <Indicador t={despues.tendencia} size={base * 0.55} />
        </div>
        <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 26 }}>{antes.etiqueta}</div>
      </div>
    </Marco>
  );
};

export const TarjetaEsquema: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elems = ev.elementos ?? [];
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuenteSeccion} caption={ev.caption} />}>
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

// "Y en titulares": hasta 4 frases por tarjeta; la que la voz está leyendo va
// encendida y las demás atenuadas. El barrido se VE avanzar sin cambiar de
// tarjeta a cada frase (16 tarjetas seguidas eran una cola de 2 minutos).
export const TarjetaTitulares: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ev.from + frame / fps;
  const items = ev.items ?? [];
  return (
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {items.map((it, i) => {
          const activa = t >= it.from - 0.15 && t < (items[i + 1]?.from ?? 9e9);
          return (
            <div key={i} style={{ display: "flex", gap: 30, alignItems: "flex-start", opacity: activa ? 1 : 0.38, transition: "opacity 120ms" }}>
              <div style={{ width: 10, alignSelf: "stretch", borderRadius: 5, backgroundColor: activa ? tema.patina : tema.linea, flexShrink: 0 }} />
              <div style={{ fontFamily: tema.sans, fontSize: 38, lineHeight: 1.35, color: tema.tinta, maxWidth: 1280 }}>{it.texto}</div>
            </div>
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
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...st, display: "flex", alignItems: "baseline", gap: 48, flexWrap: "wrap" }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 66, color: tema.tinta }}>{local.etiqueta}</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 120, color: colorDeSeccion(ev.seccion) }}>
          {local.raw}<span style={{ color: tema.gris, padding: "0 22px" }}>-</span>{visita.raw}
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
    <Marco seccion={ev.seccion} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
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
    case "cambio":
      return <TarjetaDatoCambio ev={ev} />;
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
    case "titulares":
      return <TarjetaTitulares ev={ev} />;
    case "narracion":
    default:
      return <TarjetaParrafo ev={ev} />;
  }
};

// Cortina de sección: 1,1 s a pantalla completa entre bloques, sincronizada con
// la melodía corta. Es lo único del video que no aporta información, así que
// tiene un presupuesto de tiempo duro: si crece, se corta. Sirve para dar aire
// al oído entre temas, no para lucirse.
//
// Requiere que la narración calle ahí. Sin pausa en la voz, esta tarjeta tapa
// contenido hablado y hay que dejarla apagada (ver meta.cortinas en Informe).
export const CortinaSeccion: React.FC<{ texto: string; extracto?: string }> = ({ texto, extracto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fondos = useFondos();
  const color = colorDeSeccion(texto);
  // Con fondos, la cortina nace opaca: el fotograma exacto del inicio del
  // capítulo es el que YouTube muestra en la tira, y un fundido de 0,14 s lo
  // dejaba transparente (revisión del 02-09). Nadie percibe ese fundido.
  const entrada = fondos.activo ? 1 : interpolate(frame, [0, 0.14 * fps], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(frame, [0.85 * fps, 1.1 * fps], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // La línea cruza la pantalla: la transición es el propio trazo, no un efecto.
  const trazo = interpolate(frame, [0.06 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tema.papel,
        opacity: Math.min(entrada, salida),
        justifyContent: "center",
        paddingLeft: tema.margen,
        paddingRight: tema.margen,
      }}
    >
      {fondos.activo ? <Fondo seccion={texto} fuerza={1.6} extractos={extracto ? [extracto] : []} /> : null}
      <div style={{ height: 6, width: `${trazo * 100}%`, backgroundColor: color, marginBottom: 44, position: "relative" }} />
      <div
        style={{
          fontFamily: tema.serif,
          fontSize: 108,
          fontWeight: 600,
          color: tema.tinta,
          lineHeight: 1.02,
          opacity: entrada,
          position: "relative",
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};
