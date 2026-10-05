// Piezas fijas de marca e imágenes sueltas (no son video): avatar y banner
// del canal de YouTube, y la miniatura de cada edición. Entrada propia para
// no mezclarlas con el Root del video:
//
//   npx remotion still src/marca.tsx Avatar    out/marca/avatar.png
//   npx remotion still src/marca.tsx Banner    out/marca/banner.png   [--props='{"fondo":"fondos/banner-fondo.png"}']
//   npx remotion still src/marca.tsx Miniatura out/FECHA/miniatura.png --props='{"titulo":"...","cifra":"9,5%","etiqueta":"de desempleo","fecha":"29-08-2026"}'
//
// Mismo sistema visual que las tarjetas (tema.ts): papel, tinta, una pátina.
import React from "react";
import { AbsoluteFill, Composition, Img, registerRoot, staticFile } from "remotion";
import { tema, estiloEyebrow, colorDeSeccion } from "./tema";
import { Picto } from "./pictogramas";

// ayudantes de las carátulas V4 y V5 (23-09)
const COBRE = "#D08A5B";
// mezcla dos hex; t = 0 devuelve a, t = 1 devuelve b
const mezclarHex = (a: string, b: string, t: number) => {
  const h = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const [r1, g1, b1] = h(a); const [r2, g2, b2] = h(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, "0");
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};
// CLIMAS DE CARÁTULA (23-09, decisión de Santiago: "si la noticia es alegre,
// estilo alegre"). La luz la manda la noticia, no el gusto: con un solo tono
// todas las carátulas salían en penumbra y el canal parecía una sola noticia
// repetida, que además es justo lo que la regla 29 manda evitar. El guion
// declara "Clima de carátula:" y de ahí sale esta paleta. Sin línea vale
// "institucional", el tono neutro del informe.
//   haciaTinta: cuánto se oscurece el color de la sección (1 = tinta pura)
//   tinte y peso: color que se mezcla antes de oscurecer, para dar el humor,
//     y cuánto manda sobre el color de la sección. Probado el 23-09: a mitad
//     y mitad, un clima "bueno" dorado sobre una sección azul daba un verde
//     oliva embarrado. El humor tiene que mandar; de la sección queda un
//     resto, que basta para que dos secciones no salgan idénticas.
//   picto: color del pictograma
//
// VOCABULARIO NUEVO (05-10-2026): las seis palabras ya no son las que inventó
// este archivo, son las seis de prompts/caratula-pedido.txt, porque el guion
// declara una sola palabra y esa misma palabra viaja al generador. Tener dos
// listas obligaba a GPT a traducir, que es justo lo que se quitó hoy. Las seis
// viejas quedan como alias para que los guiones de septiembre sigan rindiendo.
const CLIMAS: Record<string, { haciaTinta: number; tinte?: string; peso?: number; picto: string }> = {
  institucional: { haciaTinta: 0.68, picto: COBRE },
  urgente: { haciaTinta: 0.82, picto: COBRE },
  economico: { haciaTinta: 0.52, tinte: "#8C8578", peso: 0.7, picto: "#F4F1EA" },
  "económico": { haciaTinta: 0.52, tinte: "#8C8578", peso: 0.7, picto: "#F4F1EA" },
  policial: { haciaTinta: 0.74, tinte: "#5A2E33", peso: 0.6, picto: COBRE },
  humano: { haciaTinta: 0.30, tinte: "#C08A2E", peso: 0.88, picto: "#FFF8E8" },
  internacional: { haciaTinta: 0.34, tinte: "#2F7263", peso: 0.88, picto: "#FFF1CC" },
  // alias de las seis de septiembre
  grave: { haciaTinta: 0.82, picto: COBRE },
  cotidiano: { haciaTinta: 0.52, tinte: "#8C8578", peso: 0.7, picto: "#F4F1EA" },
  bueno: { haciaTinta: 0.30, tinte: "#C08A2E", peso: 0.88, picto: "#FFF8E8" },
  curioso: { haciaTinta: 0.34, tinte: "#2F7263", peso: 0.88, picto: "#FFF1CC" },
  deporte: { haciaTinta: 0.44, tinte: "#1E5B3A", peso: 0.85, picto: "#FFFFFF" },
};

// el cuerpo sale del largo de la línea: en Plex Sans 600 mayúsculas cada
// carácter mide ~0,56 em. Mismo criterio que la V3.
const tallaLinea = (s: string, ancho: number, max: number) =>
  Math.max(46, Math.min(max, Math.floor(ancho / (0.56 * Math.max(s.length, 8)))));

const Avatar: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: tema.papel, alignItems: "center", justifyContent: "center" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 400, lineHeight: 0.95, color: tema.tinta, letterSpacing: "-0.04em" }}>EC</div>
      <div style={{ width: 150, height: 14, backgroundColor: tema.patina, margin: "34px auto 0" }} />
    </div>
  </AbsoluteFill>
);

// Banner de YouTube: 2560x1440 (lo recomendado). Lo que se ve en TODOS los
// dispositivos es solo el rectángulo central de 1546x423, así que el texto va
// ahí. Con --props='{"fondo":"fondos/banner-fondo.png"}' (arte pedido a
// Gemini, ver ideas/fondos-prompts.md) va sobre esa imagen con la piel
// marina; sin props, papel. (Esto corre en el navegador: no hay fs.)
const Banner: React.FC<{ fondo?: string }> = ({ fondo }) => {
  const oscuro = Boolean(fondo);
  const tinta = oscuro ? "#EDE6DA" : tema.tinta;
  const gris = oscuro ? "#B9B2A6" : tema.gris;
  const acento = oscuro ? "#D08A5B" : tema.patina;
  return (
    <AbsoluteFill style={{ backgroundColor: oscuro ? "#0F1A2B" : tema.papel, alignItems: "center", justifyContent: "center" }}>
      {fondo ? <Img src={staticFile(fondo)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} /> : null}
      <div style={{ width: 1546, height: 423, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ ...estiloEyebrow, fontSize: 26, color: acento, marginBottom: 26 }}>Las noticias de Chile, cada mañana</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: 150, lineHeight: 1, color: tinta }}>Entender Chile</div>
        <div style={{ width: 110, height: 6, backgroundColor: acento, margin: "32px 0 26px" }} />
        <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: gris }}>El resumen sin gritos</div>
      </div>
    </AbsoluteFill>
  );
};

type MiniaturaProps = { titulo: string; cifra?: string; etiqueta?: string; fecha?: string; seccion?: string; estilo?: "papel" | "marino" | "verde"; extractos?: string[] };
// Miniatura 1280x720: se ve a 200 px de ancho en el celular, así que hay dos
// cosas y nada más: la cifra del día muy grande y el titular en una línea o dos.
// hash simple y estable de la fecha: cada día los extractos caen distinto,
// pero la misma edición siempre genera la misma carátula.
const semilla = (txt: string) => { let h = 0; for (const c of txt) h = (h * 31 + c.charCodeAt(0)) % 9973; return h; };
const Miniatura: React.FC<MiniaturaProps> = ({ titulo, cifra, etiqueta, fecha, seccion, estilo = "marino", extractos = [] }) => {
  const oscuro = estilo !== "papel";
  const fondoImg = estilo === "verde" ? "fondos/fondo-clave-vertical.png" : "fondos/banner-fondo.png";
  const base = estilo === "verde" ? "#14332C" : "#0F1A2B";
  const velo = estilo === "verde" ? "20,40,35" : "10,16,26";
  const color = oscuro ? "#D08A5B" : colorDeSeccion(seccion);
  const tinta = oscuro ? "#EDE6DA" : tema.tinta;
  const gris = oscuro ? "#C7BFB2" : tema.gris;
  const h = semilla(fecha || titulo);
  return (
    <AbsoluteFill style={{ backgroundColor: oscuro ? base : tema.papel, padding: 64, justifyContent: "space-between" }}>
      {oscuro ? (
        <>
          <Img src={staticFile(fondoImg)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <AbsoluteFill style={{ background: `linear-gradient(90deg, rgba(${velo},0.72) 0%, rgba(${velo},0.55) 60%, rgba(${velo},0.15) 100%)` }} />
        </>
      ) : (
        <div style={{ position: "absolute", left: 32, top: 90, bottom: 90, width: 10, borderRadius: 5, backgroundColor: color }} />
      )}
      {/* extractos desvanecidos: textura de "hay más adentro", nunca compiten con el titular */}
      {oscuro && extractos.slice(0, 2).map((ex, i) => {
        const ang = ((h >> (i * 3)) % 7) - 3;                       // -3°..3°
        const top = i === 0 ? 70 + (h % 40) : 300 + (h % 60);
        const left = i === 0 ? 620 + (h % 90) : 700 + ((h >> 2) % 80);
        return (
          <div key={i} style={{ position: "absolute", top, left, width: 480, transform: `rotate(${ang}deg)`, opacity: 0.30, WebkitMaskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)", maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)" }}>
            <div style={{ fontFamily: tema.serif, fontSize: 30, lineHeight: 1.35, color: tinta, maxHeight: 120, overflow: "hidden" }}>{ex}</div>
          </div>
        );
      })}
      <div style={{ position: "relative", display: "flex", alignItems: "baseline", gap: 26 }}>
        <div style={{ ...estiloEyebrow, fontSize: 28, letterSpacing: "0.26em", color: oscuro ? color : tema.tinta }}>Entender Chile</div>
        {fecha ? <div style={{ fontFamily: tema.mono, fontSize: 40, letterSpacing: "0.06em", color: tinta }}>{fecha}</div> : null}
      </div>
      {cifra ? (
        <div style={{ position: "relative" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 6 ? 200 : 300, lineHeight: 0.95, color: tinta, letterSpacing: "-0.02em" }}>{cifra}</div>
          {etiqueta ? <div style={{ fontFamily: tema.sans, fontSize: 48, color: gris, marginTop: 14 }}>{etiqueta}</div> : null}
        </div>
      ) : null}
      {/* títulos largos bajan de cuerpo; sin cifra, el título es el protagonista */}
      <div style={{ position: "relative", fontFamily: tema.serif, fontWeight: 600, fontSize: cifra ? (titulo.length > 58 ? 54 : 64) : titulo.length > 58 ? 84 : 104, lineHeight: 1.1, color: tinta, maxWidth: 1050 }}>{titulo}</div>
    </AbsoluteFill>
  );
};

// Portada cuadrada del podcast por serie (Spotify/Apple piden 1400-3000 px).
// Mismo fondo que las carátulas de YouTube: mapa marino = informe, líneas
// verdes = Claves. Fijas, no cambian por episodio (decisión 30-08).
const PortadaPodcast: React.FC<{ serie?: "informe" | "clave" }> = ({ serie = "informe" }) => {
  const esClave = serie === "clave";
  const fondo = esClave ? "fondos/fondo-clave-vertical.png" : "fondos/fondo-chile-vertical.png";
  const velo = esClave ? "20,40,35" : "10,16,26";
  return (
    <AbsoluteFill style={{ backgroundColor: esClave ? "#14332C" : "#0F1A2B" }}>
      <Img src={staticFile(fondo)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(${velo},0.30) 0%, rgba(${velo},0.55) 55%, rgba(${velo},0.92) 100%)` }} />
      <div style={{ position: "absolute", left: 140, right: 140, bottom: 150 }}>
        <div style={{ fontFamily: tema.mono, fontSize: 56, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D08A5B", marginBottom: 54 }}>Entender Chile</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: esClave ? 170 : 210, lineHeight: 1.05, color: "#EDE6DA", letterSpacing: "-0.01em" }}>
          {esClave ? "Claves para entender las noticias" : "El informe diario"}
        </div>
        <div style={{ width: 220, height: 14, backgroundColor: "#D08A5B", marginTop: 64 }} />
      </div>
    </AbsoluteFill>
  );
};

// MiniaturaV2 (bocetos 05-09, iteración con Santiago): la carátula deja de
// repetir el título del video. Fondo = la imagen de la sección de la portada
// (variedad diaria, identidad por área) + un GANCHO de 3-5 palabras que dice
// lo que el título no dice (la consecuencia, el conflicto), y cifra grande
// solo cuando se entiende en un segundo sin contexto.
type MiniaturaV2Props = { gancho: string; imagen: string; cifra?: string; fecha?: string; modo?: "oscuro" | "velo-seccion" | "papel"; seccion?: string; serie?: "informe" | "clave" };
// mezclar un hex con negro (para el velo teñido del color de la sección)
const oscurecer = (hex: string, f: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (x: number) => Math.round(x * f);
  return `${c((n >> 16) & 255)},${c((n >> 8) & 255)},${c(n & 255)}`;
};
const MiniaturaV2: React.FC<MiniaturaV2Props> = ({ gancho, imagen, cifra, fecha, modo = "oscuro", seccion, serie }) => {
  const cobre = "#D08A5B";
  const largo = gancho.length;
  // Diferenciación por tipo (Santiago, 05-09): el informe varía por sección y
  // lleva fecha; la Clave es serie: SIEMPRE su verde, con etiqueta LA CLAVE.
  const esClave = serie === "clave";
  if (modo === "papel") {
    // claro: mitad papel con tinta, imagen a la derecha sin velo, destaca
    // entre parrillas oscuras justamente por no ser oscura.
    return (
      <AbsoluteFill style={{ backgroundColor: tema.papel }}>
        <Img src={staticFile(imagen)} style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "46%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", left: "50%", right: "46%", top: 0, bottom: 0, background: `linear-gradient(90deg, ${tema.papel} 0%, rgba(240,235,224,0) 100%)`, transform: "translateX(-4%)", width: "12%" }} />
        <div style={{ position: "absolute", left: 64, top: 52, display: "flex", alignItems: "baseline", gap: 24 }}>
          <div style={{ ...estiloEyebrow, fontSize: 30, letterSpacing: "0.26em", color: colorDeSeccion(seccion) }}>Entender Chile</div>
          {fecha ? <div style={{ fontFamily: tema.mono, fontSize: 34, letterSpacing: "0.06em", color: tema.gris }}>{fecha}</div> : null}
        </div>
        <div style={{ position: "absolute", left: 64, width: 640, bottom: 64 }}>
          {cifra ? <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 6 ? 200 : 260, lineHeight: 0.92, color: tema.tinta, letterSpacing: "-0.02em" }}>{cifra}</div> : null}
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra ? 84 : largo > 26 ? 118 : 146, lineHeight: 1.04, color: tema.tinta, marginTop: cifra ? 18 : 0 }}>{gancho}</div>
          <div style={{ width: 150, height: 10, backgroundColor: colorDeSeccion(seccion), marginTop: 34 }} />
        </div>
      </AbsoluteFill>
    );
  }
  const base = esClave ? "16,36,30" : modo === "velo-seccion" ? oscurecer(colorDeSeccion(seccion), 0.30) : "10,13,19";
  const acento = esClave ? cobre : modo === "velo-seccion" ? colorDeSeccion(seccion) : cobre;
  const tinta = "#EDE6DA";
  return (
    <AbsoluteFill style={{ backgroundColor: `rgb(${base})` }}>
      <Img src={staticFile(imagen)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }} />
      {/* velo: oscuro abajo-izquierda donde vive el texto; la imagen respira a la derecha */}
      <AbsoluteFill style={{ background: `linear-gradient(105deg, rgba(${base},0.90) 0%, rgba(${base},0.72) 45%, rgba(${base},0.16) 100%)` }} />
      <AbsoluteFill style={{ background: `linear-gradient(0deg, rgba(${base},0.65) 0%, rgba(${base},0) 45%)` }} />
      <div style={{ position: "absolute", left: 64, top: 52, display: "flex", alignItems: "baseline", gap: 24 }}>
        <div style={{ ...estiloEyebrow, fontSize: 30, letterSpacing: "0.26em", color: acento }}>Entender Chile{esClave ? " · La Clave" : ""}</div>
        {fecha ? <div style={{ fontFamily: tema.mono, fontSize: 34, letterSpacing: "0.06em", color: "#C7BFB2" }}>{fecha}</div> : null}
      </div>
      <div style={{ position: "absolute", left: 64, right: 260, bottom: 64 }}>
        {cifra ? (
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 6 ? 230 : 300, lineHeight: 0.92, color: tinta, letterSpacing: "-0.02em", textShadow: "0 4px 30px rgba(0,0,0,0.55)" }}>{cifra}</div>
        ) : null}
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra ? 92 : largo > 60 ? 84 : largo > 40 ? 104 : largo > 26 ? 128 : 156, lineHeight: 1.06, color: tinta, letterSpacing: "-0.01em", marginTop: cifra ? 18 : 0, textShadow: "0 4px 30px rgba(0,0,0,0.55)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{gancho}</div>
        <div style={{ width: 150, height: 10, backgroundColor: acento, marginTop: 34 }} />
      </div>
    </AbsoluteFill>
  );
};


// MiniaturaV3 (20-09, CARÁTULA 2, prioridad alta de Santiago): la carátula
// tiene que dar la RAZÓN para entrar, no contar la conclusión. Referencia que
// dio como buena: pregunta con algo en juego, dos líneas grandes en cajas de
// alto contraste, un símbolo reconocible del tema. Aquí: la lámina de sección
// a todo el ancho y SIN velo (respira), dos líneas en mayúsculas sobre cajas,
// y el eyebrow del canal en una cinta. Dos paletas para decidir con el
// tablero: "casa" (cobre + tinta, la identidad) y "amarillo" (la referencia
// tal cual, para medir si la identidad nos está costando clics).
type MiniaturaV3Props = { linea1: string; linea2?: string; imagen: string; fecha?: string; paleta?: "casa" | "amarillo" };
const MiniaturaV3: React.FC<MiniaturaV3Props> = ({ linea1, linea2, imagen, fecha, paleta = "casa" }) => {
  const amarillo = paleta === "amarillo";
  const caja1 = { bg: amarillo ? "#F5D33F" : "#D08A5B", tx: tema.tinta };
  const caja2 = { bg: amarillo ? "#FFFFFF" : tema.tinta, tx: amarillo ? tema.tinta : "#F2F2EF" };
  // el tamaño sale del largo de la línea: en Plex Sans 600 mayúsculas cada
  // carácter mide ~0,56 em, y el ancho útil es 1180 px (1280 menos márgenes).
  // Probado el 20-09: a tamaño fijo, "TREN MELIPILLA, A MEDIAS" se salía.
  const talla = (s: string) => Math.max(60, Math.min(124, Math.floor((1180 - 60) / (0.56 * Math.max(s.length, 8)))));
  const caja = (s: string, c: { bg: string; tx: string }): React.CSSProperties => ({
    display: "inline-block", background: c.bg, color: c.tx, fontFamily: tema.sans, fontWeight: 600,
    fontSize: talla(s), lineHeight: 1.0, padding: "10px 30px 14px", textTransform: "uppercase",
    letterSpacing: "-0.015em", boxShadow: "0 14px 40px rgba(0,0,0,0.28)", whiteSpace: "nowrap",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel }}>
      <Img src={staticFile(imagen)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "right center" }} />
      {/* un velo mínimo abajo para que las cajas asienten sobre láminas claras */}
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(23,25,28,0) 55%, rgba(23,25,28,0.22) 100%)" }} />
      <div style={{ position: "absolute", left: 48, top: 40, padding: "10px 20px 12px", background: "rgba(23,25,28,0.88)", color: "#F2F2EF", fontFamily: tema.mono, fontSize: 26, letterSpacing: "0.22em", textTransform: "uppercase" }}>
        Entender Chile{fecha ? <span style={{ color: "#C7BFB2", marginLeft: 18 }}>{fecha}</span> : null}
      </div>
      <div style={{ position: "absolute", left: 48, bottom: 56, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14 }}>
        <div style={caja(linea1, caja1)}>{linea1}</div>
        {linea2 ? <div style={caja(linea2, caja2)}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// MiniaturaV4 (23-09, CARÁTULA 5): la carátula deja de ser "texto sobre
// papel". Fondo lleno del color de la sección oscurecido, el PICTOGRAMA del
// tema dibujado por código saliéndose del cuadro, la cifra del día grande si
// la hay, y los dos banners abajo. El diagnóstico está en src/pictogramas.tsx:
// las láminas de public/fondos son texturas al 8% de tinta y a 168 px (el
// ancho real en un teléfono) la carátula quedaba vacía.
// VARIACIÓN DIARIA POR CÓDIGO (regla 29): la semilla mueve el pictograma, lo
// gira un poco y corre el degradado. Hasta hoy la carátula no variaba y dos
// días seguidos de clima salieron idénticos (22 y 23-09).
type MiniaturaV4Props = { linea1: string; linea2?: string; cifra?: string; etiqueta?: string; seccion?: string; semilla?: number; clima?: string };
const MiniaturaV4: React.FC<MiniaturaV4Props> = ({ linea1, linea2, cifra, etiqueta, seccion, semilla = 0, clima }) => {
  const c = CLIMAS[(clima || "").toLowerCase()] || CLIMAS.institucional;
  const base = c.tinte ? mezclarHex(colorDeSeccion(seccion), c.tinte, c.peso ?? 0.85) : colorDeSeccion(seccion);
  const fondo = mezclarHex(base, tema.tinta, c.haciaTinta);
  // CONTORNO EN CLIMAS CLAROS (23-09): sobre un fondo cálido y claro, el
  // banner de cobre perdía el golpe, que es justo el defecto que la carátula
  // del paraguas dejó en evidencia. Una línea de tinta le devuelve el borde
  // sin tocar el color de la casa. En los climas oscuros no hace falta.
  const contorno = c.haciaTinta < 0.55 ? "3px solid rgba(23,25,28,0.9)" : "none";
  const banner = (s: string, bg: string, tx: string): React.CSSProperties => ({
    display: "inline-block", background: bg, color: tx, fontFamily: tema.sans, fontWeight: 600,
    fontSize: tallaLinea(s, 980, 88), lineHeight: 1, padding: "10px 24px 14px",
    textTransform: "uppercase", letterSpacing: "-0.015em", whiteSpace: "nowrap",
    border: contorno, boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: fondo }}>
      <div style={{ position: "absolute", right: -70 + (semilla % 5) * 12, top: 8 + (semilla % 3) * 14, width: 470, height: 470, opacity: 0.92 }}>
        <Picto nombre={seccion} color={c.picto} giro={-4 + (semilla % 5) * 2} />
      </div>
      {/* la esquina de los banners se oscurece SIEMPRE: con un clima claro el
          banner de papel perdía contraste contra el fondo */}
      <AbsoluteFill style={{ background: "linear-gradient(20deg, rgba(23,25,28,0.62) 8%, rgba(23,25,28,0) 58%)" }} />
      <div style={{ position: "absolute", left: 44, top: 38, fontFamily: tema.mono, fontSize: 22, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(242,242,239,0.72)" }}>Entender Chile</div>
      {cifra ? (
        <div style={{ position: "absolute", left: 48, top: 104 }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: cifra.length > 4 ? 200 : 260, lineHeight: 0.82, color: "#F7F6F2", letterSpacing: "-0.03em" }}>{cifra}</div>
          {etiqueta ? <div style={{ fontFamily: tema.mono, fontSize: 25, letterSpacing: "0.1em", textTransform: "uppercase", color: COBRE, marginTop: 12, maxWidth: 620 }}>{etiqueta}</div> : null}
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 48, bottom: 50, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
        <div style={banner(linea1, COBRE, tema.tinta)}>{linea1}</div>
        {linea2 ? <div style={banner(linea2, "#F7F6F2", tema.tinta)}>{linea2}</div> : null}
      </div>
    </AbsoluteFill>
  );
};

// MiniaturaV5 (23-09, CARÁTULA 5, opción 3): la imagen la genera GPT y la
// deja en contenido/caratulas/FECHA.*; dia.js la copia a public/ y la pasa
// acá.
//
// LA IMAGEN SE MUESTRA COMO SALE (05-10-2026, decisión de Santiago: "cómo
// sale la imagen se muestra"). Hasta hoy esta carátula le pintaba encima tres
// cosas: un velo en diagonal, el rótulo "Entender Chile" arriba a la
// izquierda y los dos banners del gancho abajo. Esos tres existían porque el
// prompt pedía una imagen SIN texto y el gancho lo ponía el código. Desde hoy
// el prompt le pide a GPT el gancho escrito DENTRO de la imagen, con su
// tipografía y su composición, así que pintarlo acá lo duplicaba y el velo
// solo le tapaba el diseño.
//
// Entonces por qué sigue existiendo esta composición y no se copia el archivo:
// porque normaliza. La ilustración llega en lo que el generador quiera (las de
// octubre vienen en 1672x941 y pesan hasta 1,9 MB) y YouTube pide 16:9 y no
// acepta miniaturas de más de 2 MB. Acá sale siempre un PNG de 1280x720.
type MiniaturaV5Props = { imagen: string };
const MiniaturaV5: React.FC<MiniaturaV5Props> = ({ imagen }) => (
  <AbsoluteFill style={{ backgroundColor: tema.tinta }}>
    <Img src={staticFile(imagen)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
  </AbsoluteFill>
);

const RootMarca: React.FC = () => (
  <>
    <Composition id="Avatar" component={Avatar} width={800} height={800} fps={1} durationInFrames={1} />
    <Composition id="Banner" component={Banner} width={2560} height={1440} fps={1} durationInFrames={1} defaultProps={{ fondo: "" }} />
    <Composition id="PortadaPodcast" component={PortadaPodcast} width={2048} height={2048} fps={1} durationInFrames={1} defaultProps={{ serie: "informe" as const }} />
    <Composition
      id="MiniaturaV2"
      component={MiniaturaV2}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ gancho: "", imagen: "fondos/seccion-economia.jpg", cifra: "", fecha: "" }}
    />
    <Composition
      id="MiniaturaV3"
      component={MiniaturaV3}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ linea1: "", linea2: "", imagen: "fondos/seccion-economia.jpg", fecha: "", paleta: "casa" as const }}
    />
    <Composition
      id="MiniaturaV4"
      component={MiniaturaV4}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ linea1: "", linea2: "", cifra: "", etiqueta: "", seccion: "", semilla: 0, clima: "institucional" }}
    />
    <Composition
      id="MiniaturaV5"
      component={MiniaturaV5}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ imagen: "fondos/seccion-economia.jpg" }}
    />
    <Composition
      id="Miniatura"
      component={Miniatura}
      width={1280}
      height={720}
      fps={1}
      durationInFrames={1}
      defaultProps={{ titulo: "", cifra: "", etiqueta: "", fecha: "", seccion: "", estilo: "marino" as const }}
    />
  </>
);

registerRoot(RootMarca);
