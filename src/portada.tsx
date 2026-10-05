// LA PORTADA DEL VIDEO: los primeros 3,5 segundos, con el título del día.
//
// SÍ ES PRODUCCIÓN, aunque hasta el 05-10-2026 este archivo se llamaba
// portada-prueba.tsx y su cabecera decía "NO es producción y no cambia nada en
// producción". Era verdad el 27-09, cuando nació para el video de muestra, y
// dejó de serlo al día siguiente sin que nadie corrigiera la frase: desde que
// SecuenciaInforme es el montaje del aire (SECUENCIA=2409), el plan escribe
// plan.portada en toda edición y esto se monta siempre. Un comentario que
// miente sobre si algo sale al aire es peor que no tener comentario.
//
// EL FONDO YA NO ES LA CARÁTULA (05-10-2026, Santiago: "falta un fondo para la
// sección principal, ya que ahora la carátula trae letras, no nos sirve").
// Hasta hoy la ilustración del día se usaba en dos lugares: acá a sangre, y
// como fondo del bloque principal durante toda su duración. Funcionaba mientras
// la ilustración venía sin texto. Desde que el prompt le pide a GPT el gancho
// escrito DENTRO de la imagen, poner el título del video encima deja dos
// titulares de la misma noticia, en dos tipografías, uno sobre otro. Ahora el
// fondo sale de contenido/config/pantallas.json, igual que el de la entrada, y
// el bloque principal usa su imagen de sección como cualquier otro bloque.
import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";
import { paletaDe, Respaldo, type Tono } from "./legible";
import pantallas from "../contenido/config/pantallas.json";

const COBRE = "#D08A5B";

const ELEGIDO = (() => {
  const p = pantallas.pantallas.portada;
  const lista = (p.fondos || []) as Array<{ id: string; imagen: string; tono: Tono; fuerza?: number }>;
  return lista.find((f) => f.id === String(p.activo)) || lista[0];
})();
const TONO: Tono = ELEGIDO?.tono || "oscuro";
const PALETA = paletaDe(TONO);
const FUERZA = typeof ELEGIDO?.fuerza === "number" ? ELEGIDO.fuerza : 0.72;

/** `imagen` la manda el plan; si no viene, se usa la de pantallas.json. */
export const Portada: React.FC<{ imagen?: string | null; titulo?: string; fecha?: string }> =
({ imagen, titulo, fecha }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  // entra y sale con un fundido corto: un corte seco desde la portada a la
  // primera tarjeta es el golpe que ya se pagó en el informe del 24-09
  const entrada = interpolate(frame, [0, 0.4 * fps], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(frame, [durationInFrames - 0.5 * fps, durationInFrames], [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      day: "numeric", month: "long", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = ` · ${txt}`;
  }
  const fondo = imagen || ELEGIDO?.imagen || null;
  return (
    <AbsoluteFill style={{ backgroundColor: TONO === "oscuro" ? tema.tinta : tema.papel,
      opacity: Math.min(entrada, salida) }}>
      {/* EL RESPIRO DE LA PORTADA (27-09-2026). El fondo estaba completamente
          quieto y era lo primero que se veía del video: un cuadro fijo durante
          tres segundos y medio se lee como una foto pegada. El zoom es lento y
          solo mueve la IMAGEN; el título y el nombre del canal van aparte y
          quedan clavados. */}
      {fondo ? (
        <Img src={staticFile(fondo)} style={{ position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${1.02 + frame * 0.00035})` }} />
      ) : null}
      {/* el velo arranca abajo a la izquierda, que es donde vive el título */}
      <Respaldo tono={TONO} lado="izquierda" hasta={0.78} fuerza={FUERZA} />
      <div style={{ position: "absolute", left: 120, top: 92, fontFamily: tema.mono, fontSize: 26,
        letterSpacing: "0.22em", textTransform: "uppercase", color: PALETA.suave }}>
        Entender Chile
      </div>
      <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1420 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em",
          textTransform: "uppercase", color: TONO === "oscuro" ? COBRE : PALETA.acento, marginBottom: 24 }}>
          El informe diario{fechaLarga}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 104, lineHeight: 1.02,
          color: PALETA.texto, textShadow: PALETA.sombra }}>
          {titulo || ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};
