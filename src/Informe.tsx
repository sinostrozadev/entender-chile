import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow } from "./tema";
import { Tarjeta, SeccionBanner, CortinaSeccion, Evento, FondoTarjetaContext, ModoFondo } from "./tarjetas";
import { TransicionMosaico, Baldosa } from "./mosaico";
import { EntradaDeMarca } from "./entrada";
import { FondosContext } from "./fondos";
import { Portada } from "./portada";
import { SecuenciaInforme, Plan } from "./secuencia";

export type Timeline = {
  version: number;
  meta: {
    titulo: string;
    descripcion?: string;
    fecha?: string;              // AAAA-MM-DD (Chile), para el sello de inicio
    serie?: string;              // "informe" | "clave"
    inicioNarracion?: number;    // segundos: la voz arranca después del sello
    musica?: string | null;      // ruta en public/, ej. "musica/informe.mp3"
    logo?: string | null;        // logo sonoro del sello (2 s)
    cortinas?: string[] | null;  // melodias de transicion, se van alternando
    cierre?: string | null;      // melodia final
    fondos?: boolean;            // texturas por sección (src/fondos.tsx); apagado = video de siempre
    mosaico?: boolean;           // el mosaico como transición de sección (24-09); apagado = la cortina de siempre
    secciones?: string[];        // qué secciones tienen imagen propia hoy, ej. ["clima.png"]; el resto va a color
    seccionesDir?: string;       // carpeta de public/ con esas imágenes; solo la escribe el modo de prueba (secciones-prueba)
    portada?: string | null;     // el fondo de los primeros 3,5 s, con el título encima (src/portada.tsx)
    portadaSeg?: number;         // cuánto dura esa portada de prueba
    caratula?: string | null;    // la ilustración del día, ej. "caratulas/2026-09-24.png"
    fondoTarjeta?: ModoFondo;    // cómo va el fondo de las tarjetas: imagen | columna | oscurecer | tv | papel
    // LA SECUENCIA DEL 24-09 (ver src/secuencia.tsx). Si el timeline trae el
    // plan, el informe se dibuja entero de esa otra manera y nada de lo de
    // abajo se monta. El timeline de producción no lo trae salvo que se pida
    // con SECUENCIA, así que la edición del día sigue saliendo como siempre.
    secuencia?: Plan;
    selloEn?: number;            // segundos en que entra el sello; 0 = al inicio (apertura en frío: después de la noticia)
    // LA ENTRADA DE MARCA (01-10-2026): el sello y la apertura dejan de ser dos
    // cosas seguidas y pasan a ser un solo movimiento. Ver src/entrada.tsx.
    // Apagada deja el sello de siempre y el video no cambia un píxel.
    entrada?: boolean;
    fps: number;
    width: number;
    height: number;
    duracionSeg: number;
  };
  audio: string | null;
  fuentes: string[];
  eventos: Evento[];
};

// Sello de identidad: 2,8 s al inicio, corre BAJO la narración (nunca la
// retrasa) y se desvanece revelando la primera tarjeta. Marca sin costo de
// retención - jamás una intro larga.
const SELLO_SEG = 2.8;

// Presupuesto duro de la cortina de seccion. No aporta informacion: si alguna
// vez hay que recortar el video, se recorta aqui primero.
const CORTINA_SEG = 1.1;

// El mosaico de transición nunca dura más que esto, ni más que el silencio
// real que hay en ese corte (ev.pausaDur). Entre las dos manda la más corta:
// pisar voz es peor que un viaje apurado.
const MOSAICO_MAX_SEG = 2.4;

// El viaje ARRANCA ANTES de la pausa. La pausa de la narración dura 1,2 s y
// en ese tiempo el viaje se ve apurado (Santiago, 24-09: "es muy rápido el
// cambio"). Alargar la pausa encarecería el informe entero en unos 12 s; en
// cambio el mosaico puede empezar mientras se terminan de decir las últimas
// palabras del bloque anterior, porque esa tarjeta ya se leyó. No se toca el
// audio: se gana tiempo de imagen, no de silencio.
const MOSAICO_ANTICIPO_SEG = 1.0;

// Y ADEMÁS SE QUEDA UN SEGUNDO DESPUÉS de la pausa (Santiago, 24-09: "gana
// otro segundo más después de la pausa también"). Ese segundo la cabecera ya
// está quieta a pantalla completa y se va desvaneciendo mientras la voz
// arranca el bloque nuevo, que es como entra un titular en televisión. Con el
// anticipo, la transición completa dura 3,2 s sobre una pausa de 1,2.
const MOSAICO_COLA_SEG = 1.0;

const Sello: React.FC<{ fecha?: string; serie?: string }> = ({ fecha, serie }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const salida = interpolate(frame, [(SELLO_SEG - 0.6) * fps, SELLO_SEG * fps], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const entrada = interpolate(frame, [0, 0.35 * fps], [0, 1], { extrapolateRight: "clamp" });
  let fechaLarga = "";
  if (fecha) {
    const txt = new Intl.DateTimeFormat("es-CL", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(new Date(`${fecha}T12:00:00Z`));
    fechaLarga = txt.charAt(0).toUpperCase() + txt.slice(1);
  }
  const eyebrow = serie === "clave" ? "Claves para entender las noticias" : "El informe diario";
  return (
    <AbsoluteFill style={{ backgroundColor: tema.papel, opacity: salida, alignItems: "center", justifyContent: "center" }}>
      <div style={{ opacity: entrada, textAlign: "center" }}>
        <div style={{ ...estiloEyebrow, marginBottom: 30 }}>{eyebrow}</div>
        <div style={{ fontFamily: tema.serif, fontSize: 132, fontWeight: 600, color: tema.tinta, lineHeight: 1.05 }}>
          Entender Chile
        </div>
        <div style={{ width: 96, height: 4, backgroundColor: tema.patina, margin: "38px auto" }} />
        {fechaLarga ? (
          <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: "0.08em", color: tema.gris }}>{fechaLarga}</div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

// EL RÓTULO DE LA MUESTRA (27-09-2026). Solo aparece si el evento lo trae, y
// eso únicamente lo escribe scripts/prueba-video.js con --comparar: en la
// edición real ningún evento tiene rotulo y acá no se monta nada. Va arriba a
// la derecha porque arriba a la izquierda vive el banner de sección, y en
// píldora oscura porque tiene que leerse igual sobre papel que sobre imagen.
const RotuloPrueba: React.FC<{ texto: string }> = ({ texto }) => (
  <div style={{ position: "absolute", top: 58, right: tema.margen,
    fontFamily: tema.mono, fontSize: 20, letterSpacing: "0.2em", textTransform: "uppercase",
    color: "rgba(247,246,242,0.82)", backgroundColor: "rgba(21,23,26,0.55)",
    padding: "6px 16px", borderRadius: 999 }}>
    {texto}
  </div>
);

export const InformeVideo: React.FC<Timeline> = (tl) => {
  // La secuencia del 24-09 no es una capa más encima de este montaje: es otro
  // montaje. Quien la pide se lleva ese, entero, y acá no se monta nada.
  if (tl.meta.secuencia) return <SecuenciaInforme {...tl} />;
  return <InformeTarjetas {...tl} />;
};

const InformeTarjetas: React.FC<Timeline> = (tl) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round(s * fps);
  const HOLD = Math.round(fps * 0.3); // pequeña cola para que no haya huecos entre tarjetas

  const overlays = tl.eventos.filter((e) => e.overlay);
  // LA ENTRADA DE MARCA (01-10-2026). Se arma del timeline y no de una lista a
  // mano: la apertura es el bloque que viene DESPUÉS del sello, y su párrafo es
  // el que cae dentro de él. Si una edición no tiene apertura (una Clave, un
  // urgente), esto queda en null y el video monta el sello de siempre.
  const entrada = (() => {
    const selloEn0 = tl.meta.selloEn ?? 0;
    if (!tl.meta.entrada || !selloEn0) return null;
    const bloque = overlays.find((e) => e.from >= selloEn0 - 1.5 && e.from <= selloEn0 + 1.5);
    if (!bloque) return null;
    const parrafo = tl.eventos.find((e) => e.tipo === "narracion" && !e.muda
      && e.from >= bloque.from - 0.5 && e.from < bloque.to);
    if (!parrafo) return null;
    return {
      bloque,
      texto: parrafo.textoPantalla ?? parrafo.texto ?? "",
      vozEn: Math.max(0, parrafo.from - selloEn0),
      // dura hasta donde termine lo último de la apertura: el bloque o su
      // párrafo, que a veces se pasa unas décimas del cierre del bloque
      // termina DONDE TERMINA EL BLOQUE y no donde termina su párrafo: a partir
      // de ahí manda el mosaico, y si la entrada se estirara unas décimas de más
      // se quedaría encima de él.
      durSeg: bloque.to - selloEn0,
    };
  })();

  // El párrafo de la apertura lo pinta la entrada, así que su tarjeta normal no
  // se monta: si se montaran las dos, al desvanecerse la entrada el texto
  // saltaría de su 70% a la izquierda al centro del cuadro.
  const tarjetas = tl.eventos.filter((e) => !e.overlay && !e.soporte && !e.muda
    && !(entrada && e.tipo === "narracion" && e.from >= entrada.bloque.from - 0.5 && e.from < entrada.bloque.to));
  // EL BANNER SOBRE UN DIBUJO (30-09-2026). El banner es UNA capa por sección y
  // decide su color preguntando sobre qué cae, pero la tarjeta de dibujo arma
  // un cuadro oscuro sin pasar por el modo de fondo, así que la pregunta le
  // contestaba "papel" y el rótulo salía tinta oscura sobre fondo oscuro:
  // ilegible. Se vio en el primer tablero de la regla de dibujos, en la sección
  // Célula del PCC en Chile.
  //
  // No se puede arreglar por sección porque dentro de una misma sección unos
  // párrafos llevan dibujo y otros no. Así que el banner se corta en tramos,
  // con el mismo mecanismo que ya usaba la muestra --comparar: los tramos que
  // caen sobre un dibujo piden tinta clara y los demás quedan como estaban. Una
  // sección sin dibujos produce un solo tramo, igual que antes.
  const tramosDeBanner = (sec: Evento) => {
    const conDibujo = tl.eventos
      .filter((e) => e.imagen && e.from < sec.to && e.to > sec.from)
      .map((e) => ({ from: Math.max(e.from, sec.from), to: Math.min(e.to, sec.to) }))
      .sort((a, b) => a.from - b.from);
    if (!conDibujo.length) return [{ from: sec.from, to: sec.to, fondo: undefined, claro: false }];
    const tramos: { from: number; to: number; fondo: undefined; claro: boolean }[] = [];
    let cursor = sec.from;
    for (const d of conDibujo) {
      if (d.from > cursor) tramos.push({ from: cursor, to: d.from, fondo: undefined, claro: false });
      tramos.push({ from: d.from, to: d.to, fondo: undefined, claro: true });
      cursor = d.to;
    }
    if (cursor < sec.to) tramos.push({ from: cursor, to: sec.to, fondo: undefined, claro: false });
    return tramos;
  };
  // Las baldosas del mosaico son las secciones del día, en el orden del
  // guion. La fila se BARAJA con la fecha adentro del componente; el orden de
  // lectura, que es este, no se toca.
  const baldosas: Baldosa[] = overlays.map((e) => ({ texto: e.texto ?? "", categoria: e.categoria ?? null }));
  const selloEn = tl.meta.selloEn ?? 0;
  // la tesis de cada sección, como texto difuminado en su cortina
  const tesisDe = (nombre: string) => tl.eventos.find((e) => e.tipo === "tesis" && e.seccion === nombre)?.texto;
  // El fondo de las tarjetas es uno solo para el video entero (meta.fondoTarjeta).
  // El video de prueba puede pedir otro para UNA tarjeta (ev.fondo): así la
  // muestra --comparar pone la misma sección sobre papel y enseguida sobre su
  // imagen, en un solo render, que es la única forma de compararlas de verdad.
  const fondoBase = { modo: (tl.meta.fondoTarjeta ?? "papel") as ModoFondo,
    caratula: tl.meta.caratula ?? null, secciones: tl.meta.secciones ?? [],
    dir: tl.meta.seccionesDir ?? "secciones" };

  return (
    <FondosContext.Provider value={{ activo: !!tl.meta.fondos, fecha: tl.meta.fecha ?? "" }}>
    <FondoTarjetaContext.Provider value={fondoBase}>
    <AbsoluteFill style={{ backgroundColor: tema.papel }}>
      {tl.audio ? (
        // la voz entra cuando el sello ya se fue (build-timeline corrió los tiempos)
        <Sequence from={f(tl.meta.inicioNarracion ?? 0)}>
          <Audio src={staticFile(tl.audio)} />
        </Sequence>
      ) : null}
      {tl.meta.musica ? (
        // cama musical: baja bajo la voz, protagonista mientras el video es mudo
        <Audio src={staticFile(tl.meta.musica)} volume={tl.audio ? 0.1 : 0.3} loop />
      ) : null}
      {tl.meta.logo ? (
        // sello sonoro: suena junto al sello de identidad (dura 2,6 s; la
        // ventana debe cubrirlo entero o se corta la cola)
        <Sequence from={f(selloEn)} durationInFrames={Math.round((SELLO_SEG + 0.4) * fps)}>
          <Audio src={staticFile(tl.meta.logo)} volume={0.5} />
        </Sequence>
      ) : null}
      {tarjetas.map((ev, i) => (
        <Sequence key={i} from={f(ev.from)} durationInFrames={Math.max(1, f(ev.to) - f(ev.from) + HOLD)}>
          {ev.fondo ? (
            <FondoTarjetaContext.Provider value={{ ...fondoBase, modo: ev.fondo }}>
              <Tarjeta ev={ev} />
            </FondoTarjetaContext.Provider>
          ) : (
            <Tarjeta ev={ev} />
          )}
          {ev.rotulo ? <RotuloPrueba texto={ev.rotulo} /> : null}
        </Sequence>
      ))}
      {/* El banner de sección se parte en tramos solo en la muestra
          --comparar (ev.pases), donde la tarjeta cambia de fondo a mitad de la
          sección y el banner tiene que cambiar con ella. En la edición real no
          hay pases y sale una sola capa por sección, como siempre. */}
      {overlays.flatMap((ev, i) =>
        (ev.pases ?? tramosDeBanner(ev)).map((p, k) => (
          <Sequence key={"ov" + i + "-" + k} from={f(p.from)} durationInFrames={Math.max(1, f(p.to) - f(p.from))}>
            <SeccionBanner texto={ev.texto ?? ""} categoria={ev.categoria} fondo={p.fondo} claro={p.claro} />
          </Sequence>
        )))}
      {/* TRANSICIÓN DE SECCIÓN. Con meta.mosaico encendido, la cámara se aleja
          del bloque que termina, cruza la fila de secciones del día y entra en
          el que empieza: una sola toma, el mosaico v3 que Santiago aprobó en
          el taller. Apagado, queda la cortina de siempre.

          Las dos comparten la misma regla: solo se encienden donde la
          narración trae silencio, si no taparían voz. La primera sección no
          lleva, porque ahí ya está el sello. La diferencia es que la cortina
          necesitaba una melodía para existir y el mosaico no: la música es
          opcional, el viaje es el que cuenta. */}
      {/* LA ENTRADA DE MARCA. Va ANTES del mosaico en el montaje a propósito: la
          entrada termina donde empieza el viaje del mosaico y los dos se cruzan
          por unas décimas, y en ese cruce tiene que ganar el mosaico, que es el
          que lleva al bloque siguiente. */}
      {entrada ? (
        <Sequence from={f(selloEn)} durationInFrames={Math.max(1, f(entrada.durSeg))}>
          <EntradaDeMarca fecha={tl.meta.fecha} serie={tl.meta.serie} texto={entrada.texto}
            vozEn={entrada.vozEn} durSeg={entrada.durSeg} />
        </Sequence>
      ) : null}
      {tl.meta.mosaico
        ? overlays
            .map((ev, i) => ({ ev, i }))
            // El primer bloque NO lleva cabecera (Santiago, 24-09: "la
            // principal, no la quiero con cabecera, esa abre"). Lo que hacía
            // falta ahí no era una transición: era que la tarjeta dejara de
            // ser blanca, y eso lo resuelve el fondo de la tarjeta.
            .filter(({ ev, i }) => i > 0 && ev.pausaDur
              && (ev.from < selloEn - 0.5 || ev.from > selloEn + SELLO_SEG + 0.5))
            .map(({ ev, i }) => {
              const anticipo = Math.min(MOSAICO_ANTICIPO_SEG, Math.max(0, ev.from - (overlays[i - 1]?.from ?? 0) - 2));
              const dur = Math.min(ev.pausaDur!, MOSAICO_MAX_SEG) + anticipo + MOSAICO_COLA_SEG;
              return (
                <Sequence key={"mos" + i} from={f(ev.from - anticipo)} durationInFrames={Math.max(1, f(dur))}>
                  {/* la melodía NO se adelanta con la imagen: suena en la
                      pausa, que es donde hay silencio. La imagen puede
                      empezar antes, el sonido no. */}
                  {tl.meta.cortinas && tl.meta.cortinas.length ? (
                    <Sequence from={f(anticipo)}>
                      <Audio src={staticFile(tl.meta.cortinas[i % tl.meta.cortinas.length])} volume={0.85} />
                    </Sequence>
                  ) : null}
                  <TransicionMosaico baldosas={baldosas} indice={i} dur={dur}
                    conImagen={tl.meta.secciones ?? []} fecha={tl.meta.fecha}
                    dir={tl.meta.seccionesDir ?? "secciones"} />
                </Sequence>
              );
            })
        : tl.meta.cortinas && tl.meta.cortinas.length
        ? overlays
            .filter((ev, i) => i > 0 && (ev.from < selloEn - 0.5 || ev.from > selloEn + SELLO_SEG + 0.5))
            .map((ev, i) => (
              <Sequence key={"cor" + i} from={f(ev.from)} durationInFrames={f(CORTINA_SEG)}>
                <Audio src={staticFile(tl.meta.cortinas![i % tl.meta.cortinas!.length])} volume={0.85} />
                <CortinaSeccion texto={ev.texto ?? ""} extracto={tesisDe(ev.texto ?? "")} />
              </Sequence>
            ))
        : null}
      {tl.meta.cierre ? (
        <Sequence from={Math.max(0, f(tl.meta.duracionSeg - 3.2))}>
          <Audio src={staticFile(tl.meta.cierre)} volume={0.6} />
        </Sequence>
      ) : null}
      {entrada ? null : (
        <Sequence from={f(selloEn)} durationInFrames={Math.round(SELLO_SEG * fps)}>
          <Sello fecha={tl.meta.fecha} serie={tl.meta.serie} />
        </Sequence>
      )}
      {/* Portada de prueba: solo cuando el timeline la trae (lo hace
          scripts/prueba-video.js). En la edición real meta.portada no existe
          y acá no se monta nada. */}
      {tl.meta.portada ? (
        <Sequence durationInFrames={Math.max(1, f(tl.meta.portadaSeg ?? 3.5))}>
          <Portada imagen={tl.meta.portada} titulo={tl.meta.titulo} fecha={tl.meta.fecha} />
        </Sequence>
      ) : null}
    </AbsoluteFill>
    </FondoTarjetaContext.Provider>
    </FondosContext.Provider>
  );
};
