import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Indicador } from "./tarjetas";
import type { Timeline } from "./Informe";
import type { Evento } from "./tarjetas";

// El Short diario: 1080x1920, cinco tarjetas (cifra + tesis) narradas, con el
// sello al inicio, cortina en cada cambio y cierre. Mismo timeline que el
// informe (lo arma scripts/short.js); aquí solo cambia la puesta en página.
//
// Dos pieles: "papel" (la del informe) y, si meta.fondo trae una imagen,
// "marino" (fondo oscuro con texto crema y acento cobre).

const SELLO_SEG = 2.8;
const CORTINA_SEG = 1.1;

type Piel = { fondo: string; tinta: string; gris: string; acento: string; linea: string };
const PAPEL: Piel = { fondo: tema.papel, tinta: tema.tinta, gris: tema.gris, acento: tema.patina, linea: tema.linea };
const MARINO: Piel = { fondo: "#0F1A2B", tinta: "#EDE6DA", gris: "#B9B2A6", acento: "#D08A5B", linea: "#2A3648" };

// Zona segura de Shorts: la interfaz de YouTube tapa ~300 px abajo y ~150 px a
// la derecha; arriba hay ~200 px con el título. Todo el contenido va dentro.
const M = 72;
const ARRIBA = 220;
const ABAJO = 340;

const Fecha: React.FC<{ iso?: string }> = ({ iso }) => {
  if (!iso) return null;
  const [a, m, d] = iso.split("-");
  return <>{`${d}-${m}-${a}`}</>;
};

const Cabecera: React.FC<{ piel: Piel; fecha?: string; handle?: string }> = ({ piel, fecha, handle }) => (
  <div style={{ position: "absolute", left: M, right: M, top: ARRIBA - 90, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
    <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.26em", textTransform: "uppercase", color: piel.tinta }}>Entender Chile</div>
    <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.08em", color: piel.gris }}><Fecha iso={fecha} /></div>
  </div>
);

const Pie: React.FC<{ piel: Piel; handle?: string; fuente?: string }> = ({ piel, handle, fuente }) => (
  <div style={{ position: "absolute", left: M, right: M, bottom: ABAJO, display: "flex", flexDirection: "column", gap: 14 }}>
    {fuente ? <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.06em", color: piel.gris }}>FUENTE · {fuente}</div> : null}
    <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.1em", color: piel.acento }}>{handle}</div>
  </div>
);

const Sello: React.FC<{ piel: Piel; fecha?: string }> = ({ piel, fecha }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const salida = interpolate(frame, [(SELLO_SEG - 0.6) * fps, SELLO_SEG * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const entrada = interpolate(frame, [0, 0.35 * fps], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: piel.fondo, opacity: salida, alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: entrada, textAlign: "center", padding: `0 ${M}px` }}>
        <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.26em", textTransform: "uppercase", color: piel.acento, marginBottom: 34 }}>Cinco cosas que hay que saber</div>
        <div style={{ fontFamily: tema.serif, fontSize: 118, fontWeight: 600, color: piel.tinta, lineHeight: 1.02 }}>Entender Chile</div>
        <div style={{ width: 96, height: 5, backgroundColor: piel.acento, margin: "40px auto" }} />
        <div style={{ fontFamily: tema.mono, fontSize: 32, letterSpacing: "0.1em", color: piel.gris }}><Fecha iso={fecha} /></div>
      </div>
    </AbsoluteFill>
  );
};

const tamano = (raw: string, base: number) => (raw.length <= 5 ? base : raw.length <= 9 ? Math.round(base * 0.68) : raw.length <= 16 ? Math.round(base * 0.46) : Math.round(base * 0.34));

const Tarjeta: React.FC<{ piel: Piel; tesis: Evento; dato?: Evento; n: number; total: number }> = ({ piel, tesis, dato, n, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 } });
  const color = piel === PAPEL ? colorDeSeccion(tesis.seccion) : piel.acento;
  const s = dato?.series?.[0];
  const s2 = dato?.series?.[1];
  const esCambio = dato?.grafico === "cambio" && s && s2;
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: M, right: M, top: ARRIBA, bottom: ABAJO + 120, display: "flex", flexDirection: "column", justifyContent: "center", gap: 40, opacity: e, transform: `translateY(${interpolate(e, [0, 1], [30, 0])}px)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 54, height: 6, backgroundColor: color }} />
          <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase", color: color }}>
            {n > 0 ? `${n} de ${total} · ` : ""}{tesis.seccion}
          </div>
        </div>
        {s ? (
          <div>
            {esCambio ? (
              <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamano(s.raw, 150), lineHeight: 1, color: piel.gris }}>{s.raw}</div>
                <svg viewBox="0 0 100 100" style={{ width: 70, height: 70 }}>
                  <path d="M10 50 L70 50 M52 30 L72 50 L52 70" fill="none" stroke={piel.gris} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamano(s2!.raw, 150), lineHeight: 1, color: piel.tinta }}>{s2!.raw}</div>
                <Indicador t={s2!.tendencia} size={84} />
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamano(s.raw, 230), lineHeight: 1, color: piel.tinta, letterSpacing: "-0.02em" }}>{s.raw}</div>
                <Indicador t={s.tendencia} size={96} />
              </div>
            )}
            {s.etiqueta ? <div style={{ fontFamily: tema.sans, fontSize: 40, lineHeight: 1.25, color: piel.gris, marginTop: 14 }}>{s.etiqueta}</div> : null}
          </div>
        ) : null}
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: s ? 66 : 84, lineHeight: 1.12, color: piel.tinta }}>
          {tesis.textoPantalla ?? tesis.texto}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ShortVideo: React.FC<Timeline> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const HOLD = Math.round(fps * 0.3);
  const meta = tl.meta as Timeline["meta"] & { fondo?: string | null; handle?: string };
  const piel = meta.fondo ? MARINO : PAPEL;

  const tesis = tl.eventos.filter((e) => e.tipo === "tesis");
  const datos = tl.eventos.filter((e) => e.tipo === "dato");
  const banners = tl.eventos.filter((e) => e.overlay);
  const noticias = tesis.filter((t) => t.seccion && !/apertura|cierre/i.test(t.seccion));

  return (
    <AbsoluteFill style={{ backgroundColor: piel.fondo }}>
      {meta.fondo ? (
        <>
          {/* un 12% más grande y anclada arriba: recorta el borde inferior (ahí la imagen trae una marca de agua) */}
          <Img src={staticFile(meta.fondo)} style={{ position: "absolute", width: "112%", height: "112%", left: "-6%", top: 0, objectFit: "cover", objectPosition: "center top" }} />
          {/* velo: oscuro donde va el texto (izquierda y abajo), más abierto sobre el mapa */}
          <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(15,26,43,0.88) 0%, rgba(15,26,43,0.72) 55%, rgba(15,26,43,0.38) 100%)" }} />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(15,26,43,0.35) 0%, rgba(15,26,43,0) 30%, rgba(15,26,43,0) 70%, rgba(15,26,43,0.75) 100%)" }} />
        </>
      ) : null}
      {tl.audio ? (
        <Sequence from={f(meta.inicioNarracion ?? 0)}>
          <Audio src={staticFile(tl.audio)} />
        </Sequence>
      ) : null}
      {meta.logo ? (
        <Sequence from={0} durationInFrames={Math.round((SELLO_SEG + 0.4) * fps)}>
          <Audio src={staticFile(meta.logo)} volume={0.5} />
        </Sequence>
      ) : null}
      {tesis.map((t, i) => {
        const dato = datos.find((d) => Math.abs(d.from - t.from) < 0.08);
        const n = noticias.indexOf(t) + 1;
        return (
          <Sequence key={i} from={f(t.from)} durationInFrames={Math.max(1, f(t.to) - f(t.from) + HOLD)}>
            <Tarjeta piel={piel} tesis={t} dato={dato} n={n} total={noticias.length} />
          </Sequence>
        );
      })}
      {meta.cortinas && meta.cortinas.length
        ? banners.filter((ev, i) => i > 0 && ev.from > SELLO_SEG).map((ev, i) => (
            <Sequence key={"cor" + i} from={f(ev.from)} durationInFrames={f(CORTINA_SEG)}>
              <Audio src={staticFile(meta.cortinas![i % meta.cortinas!.length])} volume={0.85} />
            </Sequence>
          ))
        : null}
      {meta.cierre ? (
        <Sequence from={Math.max(0, f(meta.duracionSeg - 3.2))}>
          <Audio src={staticFile(meta.cierre)} volume={0.6} />
        </Sequence>
      ) : null}
      <Cabecera piel={piel} fecha={meta.fecha} handle={meta.handle} />
      <Pie piel={piel} handle={meta.handle ?? "@entenderchile"} />
      <Sequence from={0} durationInFrames={Math.round(SELLO_SEG * fps)}>
        <Sello piel={piel} fecha={meta.fecha} />
      </Sequence>
    </AbsoluteFill>
  );
};
