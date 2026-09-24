// TALLER DEL VIDEO (24-09-2026). Banco de pruebas del formato visual del
// informe, NO producción. Sale de dos ideas de Santiago:
//   1. "encerrar el texto en un cuadro, como si estuviera en una tele"
//   2. "al fondo dejar la carátula del día, aunque sea para la principal"
//
// La segunda choca con la regla 29 si se toma literal: las tarjetas de datos
// son tipográficas y ninguna cifra grande lleva textura detrás. La salida es
// la D: la imagen es la PARED y el contenido vive en un panel sólido dentro
// del marco. Se ve la foto, y el número sigue leyéndose sobre papel limpio.
import React from "react";
import { AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, colorDeSeccion } from "./tema";
import { Picto } from "./pictogramas";

const IMG = "caratulas/2026-09-24.png";
const COBRE = "#D08A5B";

const Sello: React.FC<{ claro?: boolean }> = ({ claro }) => (
  <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase",
    color: claro ? "rgba(242,242,239,0.8)" : tema.gris }}>Entender Chile</div>
);

// A · APERTURA: la imagen del día a sangre. El que entró por la carátula
// encuentra exactamente lo que le prometieron.
const Apertura: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 20%, rgba(23,25,28,0.35) 62%, rgba(23,25,28,0.05) 100%)" }} />
    <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
    <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1400 }}>
      <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: 26 }}>
        El informe diario · 24 de septiembre
      </div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 116, lineHeight: 1.02, color: "#F7F6F2" }}>
        ¿Qué comprometió Chile?
      </div>
    </div>
  </AbsoluteFill>
);

// Marco de televisor: barra superior con el sello y la sección, cuerpo con el
// contenido. El borde es lo que identifica al canal en cualquier recorte.
const MarcoTV: React.FC<{ seccion: string; children: React.ReactNode; fondo?: string }> = ({ seccion, children, fondo }) => (
  <div style={{ position: "absolute", inset: 72, borderRadius: 10, overflow: "hidden",
    border: `4px solid ${tema.tinta}`, background: fondo ?? tema.papel, boxShadow: "0 40px 120px rgba(0,0,0,0.45)" }}>
    <div style={{ height: 84, background: tema.tinta, display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 34px" }}>
      <Sello claro />
      <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: COBRE }}>{seccion}</div>
    </div>
    <div style={{ position: "absolute", top: 84, left: 0, right: 0, bottom: 0, padding: "70px 80px" }}>{children}</div>
  </div>
);

const Cifra: React.FC = () => (
  <>
    <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 210, lineHeight: 1.02, color: tema.tinta }}>947,40</div>
    <div style={{ fontFamily: tema.sans, fontSize: 40, color: tema.gris, marginTop: 26 }}>cierre del dólar</div>
    <div style={{ position: "absolute", left: 80, bottom: 54, fontFamily: tema.mono, fontSize: 24, color: tema.gris, letterSpacing: "0.08em" }}>
      La Tercera, 22 sep
    </div>
  </>
);

// B · MARCO SOLO: el recuadro sobre el papel de siempre.
const MarcoSolo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#E7E6E1" }}>
    <MarcoTV seccion="Dólar"><Cifra /></MarcoTV>
  </AbsoluteFill>
);

// D · MARCO SOBRE LA IMAGEN: la foto del día es la pared; el contenido vive
// en un panel sólido dentro del marco. Se ve la imagen y el número se lee.
const MarcoSobreImagen: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "rgba(23,25,28,0.55)", backdropFilter: "blur(3px)" }} />
    <MarcoTV seccion="Dólar"><Cifra /></MarcoTV>
  </AbsoluteFill>
);

// C · CABECERA DE BLOQUE: la imagen vuelve tres segundos al entrar a la
// noticia principal, con el nombre del bloque.
const Cabecera: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", overflow: "hidden" }}>
      <Img src={staticFile(IMG)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: `linear-gradient(90deg, ${tema.tinta} 0%, rgba(23,25,28,0) 42%)` }} />
    </div>
    <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
    <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)", width: "46%" }}>
      <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE, marginBottom: 22 }}>Bloque 2</div>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 92, lineHeight: 1.04, color: "#F7F6F2" }}>Escudo de las Américas</div>
    </div>
  </AbsoluteFill>
);

// ─────────────────────────────────────────────────────────────────────────
// MUESTRA: la idea funcionando, 13 segundos sin voz (24-09). Sirve para ver
// el RITMO, que es lo que una imagen fija no muestra: cuánto dura cada cosa,
// cómo entra el texto y cuándo aparece el marco.
const fade = (f: number, desde: number, dur = 14) => interpolate(f, [desde, desde + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const sube = (f: number, desde: number, px = 28, dur = 16) => interpolate(f, [desde, desde + dur], [px, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// la imagen respira: un acercamiento lento que nunca se nota pero mantiene vivo el cuadro
const ImagenViva: React.FC<{ desde?: number; hasta?: number }> = ({ desde = 1, hasta = 1.08 }) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const e = interpolate(f, [0, durationInFrames], [desde, hasta], { extrapolateRight: "clamp" });
  return <Img src={staticFile(IMG)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${e})` }} />;
};

const EscenaApertura: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <ImagenViva />
      <AbsoluteFill style={{ background: "linear-gradient(10deg, rgba(23,25,28,0.92) 20%, rgba(23,25,28,0.35) 62%, rgba(23,25,28,0.05) 100%)" }} />
      <div style={{ position: "absolute", left: 120, top: 92, opacity: fade(f, 6) }}><Sello claro /></div>
      <div style={{ position: "absolute", left: 120, bottom: 120, maxWidth: 1400 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 26, opacity: fade(f, 14), transform: `translateY(${sube(f, 14)}px)` }}>
          El informe diario · 24 de septiembre
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 116, lineHeight: 1.02, color: "#F7F6F2",
          opacity: fade(f, 24, 18), transform: `translateY(${sube(f, 24, 40, 22)}px)` }}>
          ¿Qué comprometió Chile?
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EscenaCabecera: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", overflow: "hidden" }}>
        <ImagenViva desde={1.08} hasta={1} />
        <AbsoluteFill style={{ background: `linear-gradient(90deg, ${tema.tinta} 0%, rgba(23,25,28,0) 42%)` }} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)", width: "46%" }}>
        <div style={{ fontFamily: tema.mono, fontSize: 28, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 22, opacity: fade(f, 4), transform: `translateY(${sube(f, 4)}px)` }}>Bloque 2</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 92, lineHeight: 1.04, color: "#F7F6F2",
          opacity: fade(f, 12, 16), transform: `translateY(${sube(f, 12, 34, 20)}px)` }}>Escudo de las Américas</div>
      </div>
    </AbsoluteFill>
  );
};

const EscenaMarco: React.FC = () => {
  const f = useCurrentFrame();
  // el marco entra creciendo desde el centro: deja ver la pared antes de taparla
  const inset = interpolate(f, [0, 18], [300, 118], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const op = fade(f, 0, 10);
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <ImagenViva desde={1.04} hasta={1.1} />
      <AbsoluteFill style={{ background: "rgba(23,25,28,0.58)" }} />
      <div style={{ position: "absolute", inset, borderRadius: 10, overflow: "hidden", opacity: op,
        border: `4px solid ${tema.tinta}`, background: tema.papel, boxShadow: "0 40px 120px rgba(0,0,0,0.5)" }}>
        <div style={{ height: 84, background: tema.tinta, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 34px" }}>
          <Sello claro />
          <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: "0.16em", textTransform: "uppercase", color: COBRE }}>Dólar</div>
        </div>
        <div style={{ position: "absolute", top: 84, left: 0, right: 0, bottom: 0, padding: "60px 70px" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 190, lineHeight: 1.02, color: tema.tinta,
            opacity: fade(f, 22, 14), transform: `translateY(${sube(f, 22, 26, 16)}px)` }}>947,40</div>
          <div style={{ fontFamily: tema.sans, fontSize: 38, color: tema.gris, marginTop: 22, opacity: fade(f, 34) }}>cierre del dólar</div>
          <div style={{ position: "absolute", left: 70, bottom: 46, fontFamily: tema.mono, fontSize: 22, color: tema.gris,
            letterSpacing: "0.08em", opacity: fade(f, 44) }}>La Tercera, 22 sep</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Muestra: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence durationInFrames={108}><EscenaApertura /></Sequence>
    <Sequence from={108} durationInFrames={72}><EscenaCabecera /></Sequence>
    <Sequence from={180} durationInFrames={132}><EscenaMarco /></Sequence>
  </AbsoluteFill>
);

// ─────────────────────────────────────────────────────────────────────────
// MUESTRA 2 (24-09): la estructura que propuso Santiago. La imagen del día
// manda SOLO en la portada; después cada sección entra con su cabecera a
// media pantalla y la nota vive en el cuadro blanco.
//
// El problema a decidir: con qué imagen entra cada sección. Las láminas de
// public/fondos son texturas al 8% de tinta y en una cabecera difuminada
// desaparecen igual que desaparecían en la carátula. Acá se muestran las dos
// opciones seguidas, con la misma sección, para decidir mirando:
//   A. la lámina tal cual
//   B. el pictograma de la sección sobre el color de la sección

const CabeceraSeccion: React.FC<{ nombre: string; slug: string; conPicto: boolean; etiqueta: string }> =
({ nombre, slug, conPicto, etiqueta }) => {
  const f = useCurrentFrame();
  const color = colorDeSeccion(slug);
  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", overflow: "hidden",
        background: conPicto ? color : tema.papel }}>
        {conPicto ? (
          <div style={{ position: "absolute", inset: "14%" }}><Picto nombre={slug} color="rgba(255,255,255,0.92)" /></div>
        ) : (
          <Img src={staticFile(`fondos/seccion-${slug}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <AbsoluteFill style={{ background: `linear-gradient(90deg, ${tema.tinta} 0%, rgba(23,25,28,0) 45%)` }} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 92 }}><Sello claro /></div>
      <div style={{ position: "absolute", left: 120, top: "50%", transform: "translateY(-50%)", width: "44%" }}>
        <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.18em", textTransform: "uppercase", color: COBRE,
          marginBottom: 20, opacity: fade(f, 3), transform: `translateY(${sube(f, 3)}px)` }}>{etiqueta}</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 88, lineHeight: 1.04, color: "#F7F6F2",
          opacity: fade(f, 10, 14), transform: `translateY(${sube(f, 10, 30, 18)}px)` }}>{nombre}</div>
      </div>
    </AbsoluteFill>
  );
};

const NotaEnCuadro: React.FC<{ seccion: string; valor: string; etiqueta: string; fuente: string }> =
({ seccion, valor, etiqueta, fuente }) => {
  const f = useCurrentFrame();
  const inset = interpolate(f, [0, 16], [230, 132], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: "#DEDCD6" }}>
      <div style={{ position: "absolute", inset, borderRadius: 10, overflow: "hidden", opacity: fade(f, 0, 10),
        border: `4px solid ${tema.tinta}`, background: tema.papel, boxShadow: "0 40px 120px rgba(0,0,0,0.28)" }}>
        <div style={{ height: 80, background: tema.tinta, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <Sello claro />
          <div style={{ fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: COBRE }}>{seccion}</div>
        </div>
        <div style={{ position: "absolute", top: 80, left: 0, right: 0, bottom: 0, padding: "56px 64px" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 170, lineHeight: 1.02, color: tema.tinta,
            opacity: fade(f, 20, 12), transform: `translateY(${sube(f, 20, 24, 14)}px)` }}>{valor}</div>
          <div style={{ fontFamily: tema.sans, fontSize: 34, color: tema.gris, marginTop: 18, opacity: fade(f, 30) }}>{etiqueta}</div>
          <div style={{ position: "absolute", left: 64, bottom: 40, fontFamily: tema.mono, fontSize: 20, color: tema.gris,
            letterSpacing: "0.08em", opacity: fade(f, 38) }}>{fuente}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Muestra2: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence durationInFrames={80}><EscenaApertura /></Sequence>
    <Sequence from={80} durationInFrames={62}><CabeceraSeccion nombre="Dólar bajo los 950" slug="economia" conPicto={false} etiqueta="Opción A · la lámina de hoy" /></Sequence>
    <Sequence from={142} durationInFrames={62}><CabeceraSeccion nombre="Dólar bajo los 950" slug="economia" conPicto={true} etiqueta="Opción B · el pictograma" /></Sequence>
    <Sequence from={204} durationInFrames={96}><NotaEnCuadro seccion="Economía" valor="947,40" etiqueta="cierre del dólar" fuente="La Tercera, 22 sep" /></Sequence>
    <Sequence from={300} durationInFrames={62}><CabeceraSeccion nombre="Escudo de las Américas" slug="seguridad" conPicto={true} etiqueta="Bloque 3" /></Sequence>
    <Sequence from={362} durationInFrames={86}><NotaEnCuadro seccion="Seguridad" valor="21" etiqueta="países en la iniciativa" fuente="Cancillería, 23 sep" /></Sequence>
  </AbsoluteFill>
);

// ─────────────────────────────────────────────────────────────────────────
// MUESTRA 3 (24-09): la idea completa, con movimiento DENTRO del dato.
//
// Lo que faltaba en las dos anteriores: las tarjetas aparecían y se quedaban
// quietas. En un informe de diez minutos eso es lo que pierde gente. Acá la
// cifra cuenta, las barras crecen escalonadas y la comparación aparece una a
// una. La regla de ritmo: algo cambia en pantalla cada cuatro a seis
// segundos, y el movimiento SIEMPRE explica algo (una barra crece porque
// mide, un número cuenta porque es una cantidad). Nada se mueve de adorno.

// número que cuenta hasta su valor; respeta decimales y separadores chilenos
const Contador: React.FC<{ hasta: number; decimales?: number; desde?: number; dur?: number; style?: React.CSSProperties }> =
({ hasta, decimales = 0, desde = 6, dur = 26, style }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [desde, desde + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const suave = 1 - Math.pow(1 - t, 3); // desacelera al final, como un velocímetro
  const v = hasta * suave;
  return <span style={style}>{v.toLocaleString("es-CL", { minimumFractionDigits: decimales, maximumFractionDigits: decimales })}</span>;
};

const Cuadro: React.FC<{ seccion: string; fuente: string; children: React.ReactNode; fondo?: string }> =
({ seccion, fuente, children, fondo }) => {
  const f = useCurrentFrame();
  const inset = interpolate(f, [0, 16], [220, 132], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: fondo ?? "#DEDCD6" }}>
      <div style={{ position: "absolute", inset, borderRadius: 10, overflow: "hidden", opacity: fade(f, 0, 10),
        border: `4px solid ${tema.tinta}`, background: tema.papel, boxShadow: "0 40px 120px rgba(0,0,0,0.3)" }}>
        <div style={{ height: 80, background: tema.tinta, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
          <Sello claro />
          <div style={{ fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.16em", textTransform: "uppercase", color: COBRE }}>{seccion}</div>
        </div>
        <div style={{ position: "absolute", top: 80, left: 0, right: 0, bottom: 0, padding: "54px 64px" }}>
          {children}
          <div style={{ position: "absolute", left: 64, bottom: 38, fontFamily: tema.mono, fontSize: 20, color: tema.gris,
            letterSpacing: "0.08em", opacity: fade(f, 40) }}>{fuente}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// la cifra cuenta y una línea de cobre la subraya al llegar
const NotaCifra: React.FC = () => {
  const f = useCurrentFrame();
  const raya = interpolate(f, [30, 44], [0, 520], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Cuadro seccion="Economía" fuente="La Tercera, 22 sep">
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 180, lineHeight: 1.02, color: tema.tinta,
        opacity: fade(f, 4, 10) }}>
        <Contador hasta={947.4} decimales={2} />
      </div>
      <div style={{ height: 8, width: raya, background: COBRE, marginTop: 8 }} />
      <div style={{ fontFamily: tema.sans, fontSize: 36, color: tema.gris, marginTop: 24, opacity: fade(f, 34) }}>cierre del dólar</div>
    </Cuadro>
  );
};

// las barras crecen escalonadas: se comparan mientras crecen, no después
const NotaBarras: React.FC = () => {
  const f = useCurrentFrame();
  const datos = [{ e: "A favor", v: 88 }, { e: "En contra", v: 28 }, { e: "Abstenciones", v: 19 }];
  const max = 88;
  return (
    <Cuadro seccion="Congreso" fuente="BioBioChile, 22 sep">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 74, height: 430, paddingTop: 16 }}>
        {datos.map((d, i) => {
          const desde = 8 + i * 12;
          const alto = interpolate(f, [desde, desde + 26], [0, (d.v / max) * 390], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={d.e} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 60, color: tema.tinta, marginBottom: 12,
                opacity: fade(f, desde + 22, 8) }}>
                <Contador hasta={d.v} desde={desde} dur={26} />
              </div>
              <div style={{ width: 168, height: alto, background: i === 0 ? tema.tinta : tema.linea, borderTop: `6px solid ${i === 0 ? COBRE : tema.gris}` }} />
              <div style={{ fontFamily: tema.sans, fontSize: 30, color: tema.gris, marginTop: 18, opacity: fade(f, desde + 26, 8) }}>{d.e}</div>
            </div>
          );
        })}
      </div>
      <div style={{ fontFamily: tema.sans, fontSize: 32, color: tema.tinta, marginTop: 10, opacity: fade(f, 62, 12) }}>
        Faltaba uno para el quórum de cuatro séptimos
      </div>
    </Cuadro>
  );
};

// comparación: el segundo valor entra después, para que el contraste se note
const NotaComparacion: React.FC = () => {
  const f = useCurrentFrame();
  const lado = (etiqueta: string, valor: number, unidad: string, desde: number, fuerte: boolean) => (
    <div style={{ flex: 1, opacity: fade(f, desde, 12), transform: `translateY(${sube(f, desde, 26, 14)}px)` }}>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 132, lineHeight: 1, color: fuerte ? COBRE : tema.tinta }}>
        <Contador hasta={valor} desde={desde} dur={24} />{unidad}
      </div>
      <div style={{ fontFamily: tema.sans, fontSize: 32, color: tema.gris, marginTop: 18, maxWidth: 420 }}>{etiqueta}</div>
    </div>
  );
  return (
    <Cuadro seccion="Clima" fuente="DMC vía BioBioChile, 22 sep">
      <div style={{ display: "flex", gap: 60, alignItems: "flex-start", paddingTop: 30 }}>
        {lado("alerta oficial en algunas zonas", 105, " mm", 6, false)}
        <div style={{ width: 4, height: 230, background: tema.linea, opacity: fade(f, 26) }} />
        {lado("acumulado modelado en cordillera", 200, " mm", 34, true)}
      </div>
      <div style={{ fontFamily: tema.sans, fontSize: 32, color: tema.tinta, marginTop: 40, opacity: fade(f, 62, 12) }}>
        El pronóstico dobla a la alerta
      </div>
    </Cuadro>
  );
};

const MuestraCompleta: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Sequence durationInFrames={76}><EscenaApertura /></Sequence>
    <Sequence from={76} durationInFrames={56}><CabeceraSeccion nombre="Dólar bajo los 950" slug="economia" conPicto={true} etiqueta="Bloque 1" /></Sequence>
    <Sequence from={132} durationInFrames={110}><NotaCifra /></Sequence>
    <Sequence from={242} durationInFrames={56}><CabeceraSeccion nombre="La reforma por un voto" slug="congreso" conPicto={true} etiqueta="Bloque 2" /></Sequence>
    <Sequence from={298} durationInFrames={130}><NotaBarras /></Sequence>
    <Sequence from={428} durationInFrames={56}><CabeceraSeccion nombre="El frente que viene" slug="clima" conPicto={true} etiqueta="Bloque 3" /></Sequence>
    <Sequence from={484} durationInFrames={126}><NotaComparacion /></Sequence>
  </AbsoluteFill>
);

export const RootTallerVideo: React.FC = () => (
  <>
    <Composition id="MuestraCompleta" component={MuestraCompleta} width={1920} height={1080} fps={24} durationInFrames={610} />
    <Composition id="Muestra2" component={Muestra2} width={1920} height={1080} fps={24} durationInFrames={448} />
    <Composition id="Muestra" component={Muestra} width={1920} height={1080} fps={24} durationInFrames={312} />
    <Composition id="Apertura" component={Apertura} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="MarcoSolo" component={MarcoSolo} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="MarcoSobreImagen" component={MarcoSobreImagen} width={1920} height={1080} fps={1} durationInFrames={1} />
    <Composition id="Cabecera" component={Cabecera} width={1920} height={1080} fps={1} durationInFrames={1} />
  </>
);
