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
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";

// `parada` dice EN QUÉ TRAMO DEL MURAL se lee este bloque. Dos bloques con la
// misma parada se leen sin que la cámara se mueva; cuando cambia, la cámara
// viaja hasta el tramo nuevo y vuelve a quedarse quieta.
//
// Y `paradas` (abajo, en el guion) dice DÓNDE está cada tramo, en píxeles. Eso
// no es un detalle de implementación: es la diferencia entre un mural y un
// fondo. Hasta el 07-10-2026 las paradas se calculaban repartiendo el ancho en
// partes iguales, así que la cámara se detenía donde caía la cuenta y no donde
// estaba el motivo del que se hablaba. Santiago lo cazó mirando: "la imagen
// debería ir aportando a lo que se lee". Ahora cada sección declara en qué
// píxel del mural vive su motivo, y el mural se encarga de GPT para que ese
// motivo esté ahí.
export type Bloque =
  | { tipo?: "texto"; rotulo?: string; marca?: "hecho" | "interpretacion"; texto: string; seg: number; parada: number }
  | { tipo: "dato"; etiqueta: string; de?: string; a: string; fuente: string; seg: number; parada: number };

export type GuionMural = {
  // uno o varios trozos contiguos. Catorce paneles cosidos dan 27.580 px y los
  // navegadores topan la textura en 16.384: Chromium no avisa, deja el fondo
  // negro. Partido en tres <img> a escala 1:1 no hay costura, porque sin escalado
  // no hay subpíxel que deje una línea entre uno y otro.
  mural: string | string[]; anchoMural: number; viajeSeg?: number;
  // posición en píxeles del BORDE IZQUIERDO de la cámara en cada parada, una
  // por sección. Si falta, se reparte parejo, que es lo que había antes y lo
  // que estaba mal.
  paradas?: number[]; paso?: number;
  bloques: Bloque[];
};

const suave = (t: number) => t * t * (3 - 2 * t);
// Para el viaje hace falta una curva MÁS marcada que la anterior: arranca casi
// de cero, cruza rápido y llega frenando. Es la diferencia entre una cámara que
// se desplaza y un carrete que se arrastra.
const viajeSuave = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

// EL VELO TERMINA EN COLA LARGA (07-10-2026). Antes iba de 0,5 a cero entre el
// 50% y el 64% del ancho y ahí se acababa. Con un panel oscuro no se notaba,
// pero en el panel 5, que es claro, aparecía una línea vertical de arriba abajo
// justo donde el degradado dejaba de bajar. Medida, esa línea no existe: el
// mayor salto entre columnas vecinas era 0,017, puro borde de letra. Es banda
// de Mach, el ojo inventa el filo donde se quiebra la pendiente. Por eso ahora
// hay dos paradas más repartiendo la bajada: no se quiebra, no hay filo.
const Velo: React.FC<{ fuerza?: number }> = ({ fuerza = 1 }) => (
  <AbsoluteFill style={{
    background:
      `linear-gradient(90deg, rgba(10,12,16,${0.93 * fuerza}) 0%, rgba(10,12,16,${0.88 * fuerza}) 34%, rgba(10,12,16,${0.5 * fuerza}) 50%, rgba(10,12,16,${0.26 * fuerza}) 58%, rgba(10,12,16,${0.08 * fuerza}) 68%, rgba(10,12,16,0) 80%)`,
  }} />
);

// EL RÓTULO SE TECLEA, y es el único texto del video que puede hacerlo
// (06-10-2026, idea de Santiago). La razón no es estética: el nombre de la
// sección es lo único que la VOZ nunca va a decir, así que es el único lugar
// donde un sonido por letra no choca con nada. En el párrafo narrado sería
// insoportable y además pelearía con el locutor.
//
// Tres muestras alternadas y no una: una sola repetida suena a metrónomo y el
// oído la caza en la tercera letra. Es el truco de los pasos en el cine.
const RITMO_TECLA = 2.2; // cuadros por letra, a 24 fps son 11 letras por segundo

const Rotulo: React.FC<{ texto: string }> = ({ texto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inicio = Math.round(fps * 0.25);
  const letras = Array.from(texto);
  const escritas = Math.max(0, Math.min(letras.length, Math.floor((frame - inicio) / RITMO_TECLA)));
  return (
    <div style={{ fontFamily: tema.mono, fontSize: 22, letterSpacing: 3, textTransform: "uppercase", color: tema.patina, marginBottom: 26, minHeight: 30 }}>
      {letras.slice(0, escritas).join("")}
      {/* el cursor existe solo mientras se escribe: después estorba */}
      {escritas < letras.length && frame > inicio ? <span style={{ opacity: 0.55 }}>_</span> : null}
      {letras.map((c, i) =>
        c === " " ? null : (
          <Sequence key={i} from={inicio + Math.round(i * RITMO_TECLA)} durationInFrames={4}>
            <Audio src={staticFile(`sonidos/tecla-${(i % 3) + 1}.wav`)} volume={0.5} />
          </Sequence>
        )
      )}
    </div>
  );
};

// EL CHIP DE HECHO O INTERPRETACIÓN. Es la firma del canal y no un adorno:
// `src/tema.ts` lo dice desde el principio, HECHO va sólido en tinta e
// INTERPRETACIÓN va de contorno en pátina. El 07-10-2026 el armador del guion
// se comía las líneas que empezaban con corchete y por eso la sección 12 salía
// SIN UNA SOLA PALABRA: toda su prosa venía marcada. Se perdía el texto y, peor,
// se perdía la distinción, que es justo lo que el canal promete.
const Marca: React.FC<{ marca: "hecho" | "interpretacion" }> = ({ marca }) => {
  const esHecho = marca === "hecho";
  return (
    <div style={{
      fontFamily: tema.mono, fontSize: 20, letterSpacing: 3, textTransform: "uppercase",
      alignSelf: "flex-start", marginBottom: 20, padding: "6px 16px", borderRadius: 4,
      color: esHecho ? tema.papel : tema.patina,
      backgroundColor: esHecho ? "rgba(47,114,99,0.9)" : "transparent",
      border: esHecho ? "1px solid rgba(47,114,99,0.9)" : `1px solid ${tema.patina}`,
    }}>
      {esHecho ? "hecho" : "interpretación"}
    </div>
  );
};

const BloqueTexto: React.FC<{ b: Extract<Bloque, { tipo?: "texto" }>; dur: number }> = ({ b, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letras = Array.from(b.texto);
  const avance = interpolate(frame, [fps * 0.25, dur - fps * 0.9], [0, letras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const salida = interpolate(frame, [dur - fps * 0.45, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "52%", justifyContent: "center", opacity: salida }}>
      {b.rotulo ? <Rotulo texto={b.rotulo} /> : null}
      {b.marca ? <Marca marca={b.marca} /> : null}
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
const BloqueDato: React.FC<{ b: Extract<Bloque, { tipo: "dato" }>; dur: number }> = ({ b, dur }) => {
  const frame = useCurrentFrame();
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

export const ClaveMural: React.FC<GuionMural> = ({ mural, anchoMural, paradas, paso, viajeSeg, bloques }) => {
  const trozos = Array.isArray(mural) ? mural : [mural];
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
  // dónde para la cámara en cada sección: la lista explícita manda, y el
  // reparto parejo queda solo como respaldo
  const dondePara = (i: number) =>
    paradas && paradas[i] !== undefined ? paradas[i] : i * (paso ?? 0);
  const xDe = -dondePara(paradaAnterior);
  const xA = -dondePara(actual.parada);
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
      <AbsoluteFill style={{ transform: `translateX(${x}px)`, width: anchoMural, display: "flex", flexDirection: "row", filter: `saturate(${1 - 0.75 * apagado}) brightness(${1 - 0.45 * apagado})` }}>
        {trozos.map((t) => (
          <Img key={t} src={staticFile(t)} style={{ height: "100%", width: "auto", flexShrink: 0, display: "block" }} />
        ))}
      </AbsoluteFill>
      {/* EL SONIDO DEL VIAJE (06-10-2026). Suena SOLO mientras la cámara se
          mueve, y su amplitud sigue la velocidad de la cámara y no el reloj:
          nace de cero, revienta en la mitad del recorrido y vuelve a cero al
          llegar. Por eso no se oye como un efecto encima del movimiento sino
          como el movimiento mismo. Antes, con el paneo continuo, cualquier
          sonido molestaba porque tapaba un corte que no se podía tapar; ahora
          tiene un acontecimiento real de 1,4 s que acompañar. */}
      {hayViaje ? (
        <Sequence from={desde} durationInFrames={viaje}>
          <Audio src={staticFile("sonidos/viaje.wav")} volume={0.55} />
        </Sequence>
      ) : null}
      <Velo fuerza={esDato ? 1 - apagado : 1} />
      <AbsoluteFill style={{ backgroundColor: "rgba(10,12,16,0.55)", opacity: apagado }} />
      {/* TODO EL BLOQUE VA DENTRO DE UNA Sequence, y no es un detalle: sin ella
          useCurrentFrame() devuelve el cuadro de la composición entera y los
          Sequence de adentro cuentan desde el segundo cero del video. Eso ya
          costó dos bugs hoy: los bloques salieron invisibles la primera vez, y
          el tecleo del rótulo sonó entero al principio en vez de en cada
          sección. Con la Sequence, todo lo de adentro cuenta desde que el
          bloque empieza, que es lo único que tiene sentido. */}
      {enViaje ? null : (
        <Sequence from={desde + (hayViaje ? viaje : 0)} durationInFrames={dur - (hayViaje ? viaje : 0)}>
          {esDato
            ? <BloqueDato b={actual as Extract<Bloque, { tipo: "dato" }>} dur={dur - (hayViaje ? viaje : 0)} />
            : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur - (hayViaje ? viaje : 0)} />}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
