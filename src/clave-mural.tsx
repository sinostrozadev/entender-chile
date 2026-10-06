// EL MURAL: la Clave como un solo movimiento continuo, sin un corte en todo
// el video (06-10-2026, idea propuesta y aceptada por Santiago).
//
// De dónde sale. La muestra anterior tenía tres defectos que eran el mismo:
// imagen y texto eran dos videos distintos puestos lado a lado que nunca se
// tocaban, y entre sección y sección había un tajo que ningún sonido lograba
// tapar. La respuesta no era afinar la transición: era que no hubiera
// transiciones. Una sola ilustración larguísima por la que la cámara avanza
// despacio, y cada sección es un tramo del camino. Para esta Clave además es
// literal, porque el guion ES un recorrido: de dónde viene, los hitos, qué es,
// quién paga, qué pasa si te pillan.
//
// Lo que esto borra de un saque: el corte a destiempo, el sonido de
// transición, el problema de "la imagen cambia y el texto no se entera", y la
// exigencia de que cada lámina traiga su mitad izquierda limpia.
//
// TRES COSAS MÁS que vienen con el formato:
//
//   EL DATO ES UN PLANO. Nuestra firma es que toda cifra lleva su fuente a la
//   vista, y en el formato anterior las cifras quedaban enterradas en un
//   párrafo, del mismo tamaño que "el dos de octubre". Acá el mural se apaga,
//   el texto se va, y el número ocupa la pantalla con su fuente abajo.
//
//   EL TEXTO SE REEMPLAZA, NO SE ACUMULA. Un párrafo que crece obliga a leer a
//   nuestra velocidad y el espectador siempre va atrasado. Bloques de ocho o
//   nueve palabras que se relevan: nunca hay un muro y el ojo queda libre para
//   mirar el mural, que es para lo que lo hicimos.
//
//   EL SILENCIO ES EL ÉNFASIS. Antes de la cifra no hay sonido ni movimiento
//   de texto. En un canal que se llama "el resumen sin gritos" el recurso de
//   énfasis no puede ser el volumen.
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

export type Bloque =
  | { tipo?: "texto"; rotulo?: string; texto: string; seg: number }
  | { tipo: "dato"; etiqueta: string; de?: string; a: string; fuente: string; seg: number };

export type GuionMural = { mural: string; anchoMural: number; bloques: Bloque[] };

const suave = (t: number) => t * t * (3 - 2 * t); // arranque y llegada sin tirón

const Velo: React.FC<{ fuerza?: number }> = ({ fuerza = 1 }) => (
  <AbsoluteFill style={{
    background:
      `linear-gradient(90deg, rgba(10,12,16,${0.93 * fuerza}) 0%, rgba(10,12,16,${0.88 * fuerza}) 36%, rgba(10,12,16,${0.5 * fuerza}) 50%, rgba(10,12,16,0) 64%)`,
  }} />
);

const BloqueTexto: React.FC<{ b: Extract<Bloque, { tipo?: "texto" }>; dur: number; frame: number }> = ({ b, dur, frame }) => {
  const { fps } = useVideoConfig();
  const letras = Array.from(b.texto);
  const avance = interpolate(frame, [fps * 0.25, dur - fps * 0.9], [0, letras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const salida = interpolate(frame, [dur - fps * 0.45, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "52%", justifyContent: "center", opacity: salida }}>
      {b.rotulo ? (
        <div style={{ fontFamily: tema.mono, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: tema.patina, marginBottom: 26 }}>
          {b.rotulo}
        </div>
      ) : null}
      <div style={{ fontFamily: tema.serif, fontSize: 48, lineHeight: 1.4, color: tema.papel, textShadow: "0 2px 20px rgba(10,14,22,0.8)" }}>
        {letras.map((c, i) => (
          <span key={i} style={{ opacity: Math.max(0, Math.min(1, (avance - i) / 4)) }}>{c}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// EL DATO COMO PLANO. El número entra creciendo apenas (1.06 a 1.0): no es un
// efecto, es lo que hace que el ojo lo lea como que llegó y se quedó.
const BloqueDato: React.FC<{ b: Extract<Bloque, { tipo: "dato" }>; dur: number; frame: number }> = ({ b, dur, frame }) => {
  const { fps } = useVideoConfig();
  const entra = interpolate(frame, [0, fps * 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sale = interpolate(frame, [dur - fps * 0.5, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(suave(Math.min(1, frame / (fps * 0.9))), [0, 1], [1.06, 1]);
  const o = entra * sale;
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o }}>
      <div style={{ transform: `scale(${zoom})`, textAlign: "center" }}>
        <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: tema.patina, marginBottom: 34 }}>
          {b.etiqueta}
        </div>
        <div style={{ fontFamily: tema.serif, fontSize: 168, lineHeight: 1, color: tema.papel, display: "flex", alignItems: "center", gap: 46 }}>
          {b.de ? (
            <>
              <span style={{ opacity: 0.38 }}>{b.de}</span>
              <span style={{ fontSize: 96, color: tema.patina, opacity: interpolate(frame, [fps * 0.5, fps * 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>→</span>
            </>
          ) : null}
          <span>{b.a}</span>
        </div>
        <div style={{ fontFamily: tema.mono, fontSize: 24, color: tema.gris, marginTop: 40 }}>{b.fuente}</div>
      </div>
    </AbsoluteFill>
  );
};

export const ClaveMural: React.FC<GuionMural> = ({ mural, anchoMural, bloques }) => {
  const frame = useCurrentFrame();
  const { fps, width, durationInFrames } = useVideoConfig();
  // LA CÁMARA NO SE DETIENE NUNCA, ni en el plano del dato. Si se detuviera, el
  // video volvería a tener cortes: un corte es exactamente un cambio sin
  // movimiento que lo explique.
  const recorrido = anchoMural - width;
  const x = -recorrido * suave(frame / durationInFrames);

  // qué bloque toca, y cuánto lleva corriendo
  let t = 0, actual = bloques[0], desde = 0, dur = 1;
  for (const b of bloques) {
    const d = Math.round(b.seg * fps);
    if (frame >= t && frame < t + d) { actual = b; desde = t; dur = d; break; }
    t += d;
  }
  const esDato = actual.tipo === "dato";
  // durante el dato el mural se apaga y pierde color, pero sigue moviéndose
  const apagado = esDato
    ? interpolate(frame - desde, [0, fps * 0.6, dur - fps * 0.5, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <AbsoluteFill style={{ transform: `translateX(${x}px)`, width: anchoMural, filter: `saturate(${1 - 0.75 * apagado}) brightness(${1 - 0.45 * apagado})` }}>
        <Img src={staticFile(mural)} style={{ width: anchoMural, height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <Velo fuerza={esDato ? 1 - apagado : 1} />
      <AbsoluteFill style={{ backgroundColor: "rgba(10,12,16,0.55)", opacity: apagado }} />
      {esDato
        ? <BloqueDato b={actual as Extract<Bloque, { tipo: "dato" }>} dur={dur} frame={frame - desde} key={desde} />
        : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur} frame={frame - desde} key={desde} />}
    </AbsoluteFill>
  );
};
