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

// `parada` dice EN QUÉ TRAMO DEL MURAL se lee este bloque. Dos bloques con la
// misma parada se leen sin que la cámara se mueva; cuando cambia, la cámara
// viaja hasta el tramo nuevo y vuelve a quedarse quieta.
export type Bloque =
  | { tipo?: "texto"; rotulo?: string; texto: string; seg: number; parada: number }
  | { tipo: "dato"; etiqueta: string; de?: string; a: string; fuente: string; seg: number; parada: number };

export type GuionMural = {
  mural: string; anchoMural: number; paso: number; viajeSeg?: number; bloques: Bloque[];
};

const suave = (t: number) => t * t * (3 - 2 * t);
// Para el viaje hace falta una curva MÁS marcada que la anterior: arranca casi
// de cero, cruza rápido y llega frenando. Es la diferencia entre una cámara que
// se desplaza y un carrete que se arrastra.
const viajeSuave = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

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

export const ClaveMural: React.FC<GuionMural> = ({ mural, anchoMural, paso, viajeSeg, bloques }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  // LA CÁMARA SE MUEVE ENTRE IDEAS Y DESCANSA SOBRE LA IDEA (06-10-2026, idea
  // de Santiago, y es la que endereza todo el formato). La primera versión
  // paneaba sin parar nunca y no servía para ninguna de las dos cosas: con
  // movimiento permanente el ojo nunca se instala a leer, y como nada se
  // detiene tampoco se siente que haya pasado algo. Ahora el viaje ES el signo
  // de puntuación: se lee quieto, se viaja al tramo siguiente, se vuelve a
  // leer quieto. El movimiento dejó de ser decoración.
  // El redondeo por bloque suma un poco menos que durationInFrames, así que los
  // últimos cuadros se caían fuera de todo bloque y quedaban con dur=1, lo que
  // reventaba el render en el cuadro 1636. Si no calza ninguno, manda el
  // último: un video no puede terminar en un estado que no existe.
  let t = 0, indice = bloques.length - 1, desde = 0, dur = Math.round(bloques[indice].seg * fps);
  let acum = 0;
  for (let i = 0; i < bloques.length; i++) {
    const d = Math.round(bloques[i].seg * fps);
    if (frame >= acum && frame < acum + d) { indice = i; desde = acum; dur = d; break; }
    acum += d;
    if (i === bloques.length - 1) desde = acum - d;   // el último, para los cuadros de cola
  }
  const actual = bloques[indice];
  t = desde;
  const paradaAnterior = indice > 0 ? bloques[indice - 1].parada : actual.parada;
  const viaje = Math.round((viajeSeg ?? 1.4) * fps);
  const hayViaje = actual.parada !== paradaAnterior;
  const avanceViaje = hayViaje ? Math.min(1, (frame - desde) / viaje) : 1;
  const xDe = -paradaAnterior * paso;
  const xA = -actual.parada * paso;
  const x = Math.max(-(anchoMural - width), xDe + (xA - xDe) * viajeSuave(avanceViaje));
  // mientras la cámara viaja no hay texto: el viaje es el acontecimiento, y si
  // además hubiera que leer, no se mira ninguna de las dos cosas
  const enViaje = hayViaje && avanceViaje < 1;
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
      {enViaje ? null : esDato
        ? <BloqueDato b={actual as Extract<Bloque, { tipo: "dato" }>} dur={dur - viaje * (hayViaje ? 1 : 0)} frame={frame - desde - (hayViaje ? viaje : 0)} key={desde} />
        : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur - viaje * (hayViaje ? 1 : 0)} frame={frame - desde - (hayViaje ? viaje : 0)} key={desde} />}
    </AbsoluteFill>
  );
};
