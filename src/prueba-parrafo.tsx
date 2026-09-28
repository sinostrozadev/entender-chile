// PRUEBA: cómo se ve un párrafo hablado cuando el texto se reemplaza por una
// imagen (28-09-2026, idea de Santiago). Es una comparación de composición, no
// una pieza: no entra en ningún video y no la usa nadie más.
//
// Se hizo ANTES de pedirle 40 imágenes a Santiago, porque el riesgo no es que
// el dibujo salga feo sino que el cuadro quede vacío, y eso se ve con
// cualquier imagen. La de sección hace de sustituta.
//
// Los tres estados, uno por cuadro:
//   0  como es hoy: el párrafo entero escrito mientras el locutor lo lee
//   1  solo la imagen: el 65% de los párrafos no lleva cifra y se puede tapar
//   2  la imagen con la cifra y su fuente encima: el 35% que sí la lleva, y
//      que no se puede perder porque la firma del canal es que toda cifra va
//      con su fuente a la vista
//
// LO QUE ENSEÑÓ, y por eso valía la pena hacerla antes de pedir 40 imágenes:
//
//   el estado 2 funciona y se ve MEJOR que el párrafo escrito. Además no
//   necesita ninguna imagen nueva: la cifra sale del propio párrafo y el fondo
//   ya está. Es el 35% de los párrafos y se puede hacer hoy.
//
//   el estado 1 queda VACÍO, y no por culpa del dibujo. Las imágenes de
//   sección están compuestas con la mitad izquierda vacía a propósito, para
//   que ahí quepa el texto; si el texto se va, esa mitad queda muerta. Se
//   probó además corriendo el motivo al centro y quedó peor. O sea: las
//   imágenes de la biblioteca NO pueden componerse como las de sección. Su
//   motivo tiene que ir centrado y ocupar el cuadro, porque no hay nada más
//   en pantalla.
import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { tema } from "./tema";

const PARRAFO =
  "El balance fue actualizado a las 5 y media de la mañana del sábado 26. Además de las personas " +
  "aisladas y damnificadas, había 35 albergados, 209 viviendas con daño mayor, 977 con daño menor " +
  "y más de 1.700 todavía en evaluación.";
const FUENTE = "FUENTE · Senapred vía La Tercera, 26 sep";
const IMAGEN = "secciones/emergencia.jpg";

const Fondo: React.FC = () => (
  <>
    <Img src={staticFile(IMAGEN)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(21,23,26,0.76) 0%, rgba(21,23,26,0.76) 100%)" }} />
  </>
);

const Pie: React.FC = () => (
  <div style={{ position: "absolute", left: tema.margen, bottom: 58, fontFamily: tema.mono, fontSize: 24,
    letterSpacing: "0.14em", color: "rgba(242,242,239,0.55)" }}>{FUENTE}</div>
);

const Barra: React.FC = () => (
  <div style={{ position: "absolute", left: tema.margen - 34, top: 150, bottom: 150, width: 4, backgroundColor: "#D08A5B" }} />
);

export const PruebaParrafo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: "#15171A" }}>
      <Fondo />
      <Barra />
      {f === 0 ? (
        <AbsoluteFill style={{ padding: tema.margen, justifyContent: "center" }}>
          <div style={{ fontFamily: tema.sans, fontSize: 42, lineHeight: 1.5, color: "#F7F6F2", maxWidth: 900 }}>{PARRAFO}</div>
        </AbsoluteFill>
      ) : null}
      {f === 2 ? (
        // la cifra que el párrafo traía, sola y grande, con lo que significa:
        // se pierde la prosa, no el dato
        <AbsoluteFill style={{ padding: tema.margen, justifyContent: "center" }}>
          <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#5BA391", marginBottom: 26 }}>Viviendas con daño</div>
          <div style={{ display: "flex", gap: 90, alignItems: "flex-end" }}>
            {[["209", "daño mayor"], ["977", "daño menor"], ["1.700", "en evaluación"]].map(([n, q]) => (
              <div key={n}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 108, lineHeight: 1, color: "#F7F6F2" }}>{n}</div>
                <div style={{ fontFamily: tema.sans, fontSize: 30, color: "rgba(242,242,239,0.74)", marginTop: 12 }}>{q}</div>
              </div>
            ))}
          </div>
        </AbsoluteFill>
      ) : null}
      <Pie />
    </AbsoluteFill>
  );
};
