// ENTENDER EL CASO: el largo por tema sobre la página real del diario
// (02-11-2026). Decisión de Santiago del 01-11-2026: el escenario es el diario
// de verdad y no un mural dibujado. Cada hito del caso salió un día en el
// diario escrito; el video muestra esa página tal como se ve en la web, hace
// zoom a la noticia de ese día, narra encima y pasa a la página siguiente.
//
// Por qué la página y no otro mural. El mural costaba un encargo de catorce
// paneles a GPT por Clave, coserlos y medir sus velos, y aun así la imagen era
// una ilustración: decía "algo así pasó". La página del diario es la prueba de
// que el canal lo contó ese día, con su fecha arriba, y sale gratis del repo
// (scripts/diario-captura.js la dibuja desde web/dist).
//
// Lo que se reutiliza del mural, sin copiarlo (src/clave-mural.tsx): los
// bloques de texto y de dato, el rótulo tecleado, el velo, las curvas y la
// cama. El reloj es el mismo (scripts/clave-mural.js), así que voz, texto y
// música se comportan igual que en la Clave; lo único nuevo es la cámara.
//
// LAS DECISIONES DE CÁMARA, y por qué:
//
//   EL PLANO GENERAL ES LA PARTE DE ARRIBA A ESCALA 1, salvo que la página
//   entera quepa en alto a media escala o más. Las páginas del diario miden
//   entre 7.000 y 13.000 px de alto: enteras en 1080 quedarían a escala 0,08,
//   una tira gris donde no se lee nada, ni siquiera que es un diario. Arriba a
//   escala 1 se ve la cabecera "Entender Chile" y el titular de portada, que es
//   lo que hace reconocible la página en un segundo. La regla para una página
//   corta (que quepa a 0,5 o más) queda escrita por si un día la hay.
//
//   EL ZOOM ENCUADRA LA NOTICIA EN LA FRANJA DERECHA, no al centro. El texto
//   narrado ocupa el 52% izquierdo bajo el velo, como en el mural; una noticia
//   centrada quedaría con la mitad tapada por el velo y por las letras. La
//   escala tope es 1,6 con 60 px de margen: más cerca, la letra de la página se
//   pixela (la captura es a escala 1) y deja de leerse.
//
//   ENTRE PÁGINAS, FUNDIDO Y NO DESLIZAMIENTO. Dos páginas de días distintos
//   comparten cabecera y diseño, así que el fundido entre las dos se lee como
//   "pasó el tiempo, es otro día", que es exactamente lo que ocurre. Deslizar
//   en vertical diría que una página sigue a la otra en el mismo papel, que es
//   falso, y además las páginas miden distinto alto y el borde de una se vería
//   entrar. Antes del fundido la página actual se aleja: la cámara suelta la
//   noticia antes de cambiar de día, para que el cambio no sea un tajo.
//
//   EL VELO ES MÁS FUERTE QUE EN EL MURAL (k = 3). El papel del diario es el
//   fondo más claro posible, más que el panel 5 que obligó a medir velos el
//   07-10-2026; con k = 1 la mitad derecha del texto caía sobre gris medio.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";
import { Bloque, BloqueDato, BloqueTexto, Rotulo, Velo, suave, viajeSuave } from "./clave-mural";

export type Caja = { x: number; y: number; ancho: number; alto: number };
// una por sección, indexada como las secciones (la `parada` de cada bloque);
// una sección sin marca DIARIO repite la página y la caja de la anterior
// `trozos`: la misma página cortada en franjas horizontales (ver Pagina, más
// abajo); sin ellos se usa `png` entera, que sirve para el estudio
export type PaginaDiario = { fecha: string; png: string; ancho: number; alto: number; caja: Caja;
  trozos?: Array<{ png: string; y: number; alto: number }> };

// `escena` la pone scripts/largo-diario.js en el primer bloque de cada
// sección: los segundos que la cámara se mueve antes de que el bloque hable.
// Ya vienen sumados a `seg`, igual que el viaje del mural.
export type BloqueDiario = Bloque & { escena?: number; diario?: { fecha: string; slug: string } };

export type GuionDiario = {
  bloques: BloqueDiario[];
  paginas: PaginaDiario[];
  viajeSeg?: number;
  // cuánto dura cada parte del cambio de página; los fija el script, que es
  // quien suma esos tiempos al reloj (los valores por defecto son los mismos)
  planos?: { alejarSeg: number; fundidoSeg: number; generalSeg: number };
  musica?: string;
  voz?: string;
  musicaDb?: number;
};

const ANCHO = 1920, ALTO = 1080;
const MARGEN = 60;
const ESCALA_TOPE = 1.6;
// la franja donde se encuadra la noticia: lo que el texto narrado deja libre
const FRANJA_X0 = ANCHO * 0.46;
const VELO_K = 3;
// cuánto se aleja la página antes del fundido: lo justo para que se note que
// la cámara suelta la noticia, sin llegar a mostrar los bordes de la página
const ALEJAR = 0.72;
const PLANOS = { alejarSeg: 0.6, fundidoSeg: 0.5, generalSeg: 1.2 };

// Una cámara: la página se dibuja en pantalla en página * s + (tx, ty).
type Camara = { s: number; tx: number; ty: number };

const general = (p: PaginaDiario): Camara => {
  const s = ALTO / p.alto;
  if (s >= 0.5) return { s, tx: (ANCHO - p.ancho * s) / 2, ty: 0 };
  return { s: 1, tx: (ANCHO - p.ancho) / 2, ty: 0 };
};

const zoom = (p: PaginaDiario): Camara => {
  const c = p.caja;
  const s = Math.min(ESCALA_TOPE, (ANCHO - FRANJA_X0) / (c.ancho + 2 * MARGEN), ALTO / (c.alto + 2 * MARGEN));
  const cx = (FRANJA_X0 + ANCHO) / 2, cy = ALTO / 2;
  return { s, tx: cx - (c.x + c.ancho / 2) * s, ty: cy - (c.y + c.alto / 2) * s };
};

// Se interpola el punto de la página que está bajo el centro de la pantalla y
// la escala en logaritmo. Interpolar tx y ty a secas hace que la noticia de
// destino se escape del cuadro a mitad de camino y vuelva: se ve como un
// tropiezo de la cámara.
const entre = (a: Camara, b: Camara, t: number): Camara => {
  const C = [ANCHO / 2, ALTO / 2];
  const pa = [(C[0] - a.tx) / a.s, (C[1] - a.ty) / a.s];
  const pb = [(C[0] - b.tx) / b.s, (C[1] - b.ty) / b.s];
  const s = Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * t);
  const px = pa[0] + (pb[0] - pa[0]) * t, py = pa[1] + (pb[1] - pa[1]) * t;
  return { s, tx: C[0] - px * s, ty: C[1] - py * s };
};

const alejada = (c: Camara): Camara => {
  const C = [ANCHO / 2, ALTO / 2];
  return { s: c.s * ALEJAR, tx: C[0] - (C[0] - c.tx) * ALEJAR, ty: C[1] - (C[1] - c.ty) * ALEJAR };
};

const mismaCaja = (a: Caja, b: Caja) => a.x === b.x && a.y === b.y && a.ancho === b.ancho && a.alto === b.alto;

// LA PÁGINA VA EN TROZOS y solo se montan los que se ven (02-11-2026, medido
// en la primera prueba). Con la captura entera en un solo <img>, 1920 x
// 12.744 px, el render iba a 0,65 s por cuadro con 16 pestañas: decodificada
// pesa unos 100 MB, más que el caché de imágenes del navegador, y la vuelve a
// decodificar en cada cuadro. En trozos de 1024 px el navegador decodifica
// dos o tres por cuadro. Cada trozo trae unos píxeles de más abajo que el
// siguiente tapa: a escala distinta de 1 el borde de dos imágenes cae en un
// subpíxel y sin ese solape se ve una línea clara entre una y otra.
const Pagina: React.FC<{ p: PaginaDiario; cam: Camara; opacidad?: number }> = ({ p, cam, opacidad = 1 }) => {
  const trozos = p.trozos && p.trozos.length ? p.trozos : [{ png: p.png, y: 0, alto: p.alto }];
  // lo que se ve de la página, en sus píxeles, con un margen por si la
  // cámara se mueve dentro del cuadro
  const y0 = (0 - cam.ty) / cam.s - 64, y1 = (ALTO - cam.ty) / cam.s + 64;
  return (
    <div style={{
      position: "absolute", left: 0, top: 0, width: p.ancho, height: p.alto,
      transformOrigin: "0 0", transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})`,
      opacity: opacidad,
    }}>
      {trozos.filter((t) => t.y + t.alto >= y0 && t.y <= y1).map((t) => (
        <Img key={t.png} src={staticFile(t.png)} style={{
          position: "absolute", left: 0, top: t.y, width: p.ancho, height: t.alto, maxWidth: "none", display: "block",
        }} />
      ))}
    </div>
  );
};

// "2026-10-24" a "24-10-2026": la fecha se escribe en pantalla como en la
// prosa del canal (regla 35)
const enProsa = (f: string) => f.split("-").reverse().join("-");

export const LargoDiario: React.FC<GuionDiario> = ({ bloques, paginas, viajeSeg, planos, musica, voz, musicaDb }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const P = planos ?? PLANOS;

  // el bloque del cuadro; si el redondeo deja cuadros de cola, manda el último
  // (el mismo resguardo del mural, que costó un render reventado)
  let indice = bloques.length - 1, desde = 0, dur = Math.round(bloques[indice].seg * fps);
  let acum = 0;
  for (let i = 0; i < bloques.length; i++) {
    const d = Math.round(bloques[i].seg * fps);
    if (frame >= acum && frame < acum + d) { indice = i; desde = acum; dur = d; break; }
    acum += d;
    if (i === bloques.length - 1) desde = acum - d;
  }
  const actual = bloques[indice];
  const seccion = actual.parada;
  const pagina = paginas[Math.min(seccion, paginas.length - 1)];
  const abreSeccion = indice === 0 || bloques[indice - 1].parada !== seccion;
  const escena = abreSeccion ? Math.round((actual.escena ?? 0) * fps) : 0;
  const t = frame - desde;
  const enEscena = t < escena;

  // qué tipo de entrada tiene la sección: la primera del video, un cambio de
  // día, otra noticia de la misma página, o la misma noticia (sin marca)
  const anterior = indice > 0 ? paginas[Math.min(bloques[indice - 1].parada, paginas.length - 1)] : null;
  const tipo = !abreSeccion ? "quieta"
    : !anterior ? "primera"
    : anterior.fecha !== pagina.fecha ? "cambio"
    : !mismaCaja(anterior.caja, pagina.caja) ? "viaje" : "quieta";

  const fA = Math.round(P.alejarSeg * fps), fF = Math.round(P.fundidoSeg * fps), fG = Math.round(P.generalSeg * fps);
  const fV = Math.round((viajeSeg ?? 1.5) * fps);
  // dónde empieza el plano general dentro de la escena (0 en la primera)
  const inicioGeneral = tipo === "cambio" ? fA + fF : 0;
  const inicioZoom = inicioGeneral + fG;

  let capas: React.ReactNode;
  let velo = 1;
  if (enEscena && tipo === "cambio" && anterior && t < fA + fF) {
    // 1. la página de ayer suelta la noticia y se aleja; 2. fundido al día nuevo
    const zA = zoom(anterior);
    const lejos = alejada(zA);
    if (t < fA) {
      const x = suave(t / fA);
      capas = <Pagina p={anterior} cam={entre(zA, lejos, x)} />;
      velo = 1 - x;
    } else {
      const x = suave((t - fA) / fF);
      capas = (
        <>
          <Pagina p={anterior} cam={lejos} opacidad={1 - x} />
          <Pagina p={pagina} cam={general(pagina)} opacidad={x} />
        </>
      );
      velo = 0;
    }
  } else if (enEscena && (tipo === "cambio" || tipo === "primera")) {
    // 3. plano general con la fecha; 4. zoom a la noticia
    if (t < inicioZoom) {
      capas = <Pagina p={pagina} cam={general(pagina)} />;
      velo = 0;
    } else {
      const x = Math.min(1, (t - inicioZoom) / fV);
      capas = <Pagina p={pagina} cam={entre(general(pagina), zoom(pagina), viajeSuave(x))} />;
      velo = suave(x);
    }
  } else if (enEscena && tipo === "viaje" && anterior) {
    // otra noticia del mismo día: un viaje corto, sin plano general
    const x = Math.min(1, t / fV);
    capas = <Pagina p={pagina} cam={entre(zoom(anterior), zoom(pagina), viajeSuave(x))} />;
  } else {
    capas = null;
  }

  const esDato = actual.tipo === "dato";
  // durante el dato la página se apaga, como el mural; se cuenta desde que
  // termina la escena para no oscurecer un plano general
  const apagado = esDato && !enEscena
    ? interpolate(t - escena, [0, fps * 0.6, dur - escena - fps * 0.5, dur - escena], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;
  if (capas === null) capas = <Pagina p={pagina} cam={zoom(pagina)} />;

  // el rótulo de la fecha se va apenas la cámara empieza a acercarse: si se
  // quedara, competiría con el titular de la noticia que entra al cuadro
  const salidaFecha = interpolate(t - inicioZoom, [0, fps * 0.3], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: tema.tinta, overflow: "hidden" }}>
      {/* la cama corre de punta a punta, como en el mural */}
      {musica ? <Audio src={staticFile(musica)} volume={Math.pow(10, (musicaDb ?? 0) / 20)} /> : null}
      {/* EL FONDO ES EL PAPEL y no la tinta: con la noticia encuadrada a
          escala menor que 1 el borde izquierdo de la página queda dentro del
          cuadro, y sobre tinta se veía como un corte vertical en el plano del
          dato, donde el velo se apaga. El filtro del dato va acá, sobre el
          cuadro y no sobre la página, para que apague papel y página por igual
          (y porque sobre la página entera el navegador lo calculaba en cada
          cuadro aunque valiera 1). */}
      <AbsoluteFill style={{ backgroundColor: tema.papel,
        ...(apagado > 0 ? { filter: `saturate(${1 - 0.75 * apagado}) brightness(${1 - 0.45 * apagado})` } : {}) }}>
        {capas}
      </AbsoluteFill>
      <Velo fuerza={(esDato ? 1 - apagado : 1) * velo} k={VELO_K} />
      <AbsoluteFill style={{ backgroundColor: "rgba(10,12,16,0.55)", opacity: apagado }} />
      {abreSeccion && (tipo === "cambio" || tipo === "primera") ? (
        // EL RÓTULO DE LA FECHA va en una placa oscura porque se dibuja sobre
        // el papel sin velo, donde la pátina del rótulo no se lee. Es el mismo
        // Rotulo del mural, con su tecleo y su sonido: la fecha es, como el
        // nombre de la sección, algo que la voz no dice en ese momento.
        <Sequence from={desde + inicioGeneral} durationInFrames={Math.max(1, inicioZoom - inicioGeneral + Math.round(fps * 0.3))}>
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: tema.margen, opacity: salidaFecha }}>
            <div style={{ backgroundColor: "rgba(10,12,16,0.88)", padding: "22px 30px 0", borderRadius: 4 }}>
              <Rotulo texto={enProsa(pagina.fecha)} />
            </div>
          </AbsoluteFill>
        </Sequence>
      ) : null}
      {/* mientras la cámara se mueve no hay texto, la misma regla del mural:
          el movimiento es el acontecimiento y no se lee encima de él */}
      {enEscena ? null : (
        <Sequence from={desde + escena} durationInFrames={Math.max(1, dur - escena)}>
          {esDato
            ? <BloqueDato b={actual as Extract<Bloque, { tipo: "dato" }>} dur={dur - escena} />
            : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur - escena} voz={voz} />}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
