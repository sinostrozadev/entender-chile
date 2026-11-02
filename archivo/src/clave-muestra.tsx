// MUESTRA del formato de la Clave: imagen a un lado, texto apareciendo letra a
// letra al otro (06-10-2026, para que Santiago lo vea antes de construirlo en
// serio).
//
// Por qué existe. Las imágenes de sección se pidieron para este formato y no
// había NADA con qué mirarlas en movimiento: la única composición registrada
// era "Informe". Pedir catorce imágenes sin poder verlas montadas es el mismo
// error que ya se evitó el 28-09 con prueba-parrafo.tsx.
//
// VUELTA 2 (06-10, Santiago: "el sonido está horrible"). Lo que cambió y por
// qué, porque la vuelta 1 se equivocó en las tres cosas:
//
//   1. EL SONIDO. Era un golpe grave que quería "sentirse" y quedó un portazo.
//      Ahora es un "fshhs": ruido cuyo brillo CAE de 9 kHz a 700 Hz, que es lo
//      que el oído lee como algo que pasa y se va. Ataque de 180 ms para que
//      no golpee, cola de 900 ms para que la animación lo tape. Uno por
//      transición y nada más: no hay sonido por letra ni por palabra.
//   2. EL CORTE. Era seco. Ahora las secciones se superponen y se funden, y la
//      imagen deriva despacio durante todo el bloque, así que el sonido tiene
//      algo que acompañar en vez de marcar un tajo.
//   3. EL TEXTO. Aparecía por palabra y se veía a saltos. Ahora es por LETRA,
//      y cada letra entra con su propia rampa de cuatro caracteres: no hay un
//      instante en que algo aparezca de golpe en ninguna parte del cuadro.
//
// Es una MUESTRA, no la pieza: sin voz, sin tarjetas de datos, sin marca.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

export type SeccionMuestra = { imagen: string; titulo: string; texto: string; seg: number };

const SOLAPE_SEG = 0.9; // lo que dura la fundido entre secciones

// El texto trae su propio velo porque no se puede confiar en que la imagen
// venga oscura de ese lado: dos de las seis primeras llegaron con el motivo
// cruzando la mitad. Se apaga antes del centro para no ensuciar el motivo.
const Velo: React.FC = () => (
  <AbsoluteFill style={{
    background:
      "linear-gradient(90deg, rgba(10,12,16,0.92) 0%, rgba(10,12,16,0.88) 38%, rgba(10,12,16,0.45) 50%, rgba(10,12,16,0) 62%)",
  }} />
);

const Texto: React.FC<{ titulo: string; texto: string; dur: number }> = ({ titulo, texto, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letras = Array.from(texto);
  const desde = fps * 1.1;             // deja respirar al fundido antes de escribir
  const hasta = dur - fps * 1.2;       // y deja leer lo último antes de irse
  const avance = interpolate(frame, [desde, hasta], [0, letras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const rotulo = interpolate(frame, [fps * 0.35, fps * 1.1], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "50%", justifyContent: "center" }}>
      <div style={{
        fontFamily: tema.mono, fontSize: 24, letterSpacing: 2, textTransform: "uppercase",
        color: tema.patina, marginBottom: 28, opacity: rotulo,
      }}>{titulo}</div>
      <div style={{
        fontFamily: tema.serif, fontSize: 46, lineHeight: 1.42, color: tema.papel,
        textShadow: "0 2px 18px rgba(10,14,22,0.75)",
      }}>
        {letras.map((c, i) => (
          // la rampa de CUATRO caracteres es lo que hace que no se vea a
          // saltos: en cualquier instante hay cuatro letras a media luz, no
          // una apareciendo entera
          <span key={i} style={{ opacity: Math.max(0, Math.min(1, (avance - i) / 4)) }}>{c}</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Seccion: React.FC<{ s: SeccionMuestra; dur: number; solape: number; primera: boolean }> = ({ s, dur, solape, primera }) => {
  const frame = useCurrentFrame();
  // entra fundiéndose (la primera no, que ya nace en negro) y se va igual
  const opacidad = primera
    ? interpolate(frame, [dur - solape, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(frame, [0, solape, dur - solape, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // deriva lentísima: 24 px en todo el bloque. No se mira, se siente.
  const deriva = interpolate(frame, [0, dur], [0, -24], { extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [0, dur], [1.035, 1.0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: opacidad }}>
      <AbsoluteFill style={{ transform: `translateX(${deriva}px) scale(${zoom})` }}>
        <Img src={staticFile(s.imagen)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <Velo />
      <Texto titulo={s.titulo} texto={s.texto} dur={dur} />
    </AbsoluteFill>
  );
};

export const ClaveMuestra: React.FC<{ secciones: SeccionMuestra[] }> = ({ secciones }) => {
  const { fps } = useVideoConfig();
  const solape = Math.round(SOLAPE_SEG * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      {secciones.map((s, i) => {
        const dur = Math.round(s.seg * fps);
        // cada bloque arranca un solape ANTES de que termine el anterior: ahí
        // se cruzan y el fshhs cae justo encima del cruce
        const desde = Math.max(0, i * dur - solape);
        return (
          <Sequence key={i} from={desde} durationInFrames={dur + solape}>
            <Seccion s={s} dur={dur + solape} solape={solape} primera={i === 0} />
            {i > 0 ? <Audio src={staticFile("sonidos/transicion.wav")} volume={0.45} /> : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
