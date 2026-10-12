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
//
// CON VOZ (12-10-2026, scripts/clave-mural.js) el bloque de texto trae tres
// campos más, todos en segundos: `entra` es cuándo arrancan voz y texto dentro
// del bloque (después del viaje y del tecleo del rótulo), `habla` cuánto dura
// la oración dicha, y `voz` qué tramo del archivo de narración le toca. El
// texto aparece al ritmo de la voz y no de un reloj propio: sin esto la última
// palabra quedaba escrita dos segundos antes o después de oírse. Sin esos
// campos el bloque se comporta como en el taller.
//
// Y el dato puede traer `valores`, uno por columna con su rótulo debajo, y
// `flecha` cuando es un antes y un después de la misma cosa.
export type Bloque =
  | { tipo?: "texto"; rotulo?: string; marca?: "hecho" | "interpretacion"; texto: string; dicho?: string; seg: number; parada: number;
      entra?: number; habla?: number; voz?: [number, number] | number[] }
  | { tipo: "dato"; etiqueta: string; de?: string; a: string; fuente: string; seg: number; parada: number; rotulo?: string;
      valores?: { rotulo: string; valor: string }[]; flecha?: boolean };

export type GuionMural = {
  // uno o varios trozos contiguos. Catorce paneles cosidos dan 27.580 px y los
  // navegadores topan la textura en 16.384: Chromium no avisa, deja el fondo
  // negro. Partido en tres <img> a escala 1:1 no hay costura, porque sin escalado
  // no hay subpíxel que deje una línea entre uno y otro.
  mural: string | string[]; anchoMural: number; viajeSeg?: number;
  // la cama de música, que la genera scripts/clave-musica.js desde este mismo
  // guion. Si falta, la Clave suena como antes y no se rompe nada.
  musica?: string;
  // posición en píxeles del BORDE IZQUIERDO de la cámara en cada parada, una
  // por sección. Si falta, se reparte parejo, que es lo que había antes y lo
  // que estaba mal.
  paradas?: number[]; paso?: number;
  // cuánto velo necesita cada parada, calculado por scripts/mural-velos.js
  // midiendo el mural de verdad. 1 es el velo de siempre.
  velos?: number[];
  // la narración entera (en public/) y cuántos decibeles sube la cama contra
  // ella; ver scripts/clave-mural.js
  voz?: string;
  musicaDb?: number;
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
//
// Y EL VELO DEJA DE SER UNA CONSTANTE (07-10-2026, lo cazó Santiago mirando el
// cuadro del segundo 167). Se había diseñado contra paneles oscuros. El panel 5
// es claro y además rompe la regla 2 del mural, su motivo no está en la mitad
// derecha sino en todo el cuadro, así que el párrafo caía sobre unos papeles
// blancos. Medido daba 4,47:1, que CUMPLE la norma para texto de 48 px y aun
// así se ve mal: la norma mide contraste y no mide que haya un dibujo debajo de
// las letras. Ahora cada parada trae su propia fuerza, calculada midiendo el
// mural, y el objetivo pasa de 4,5:1 a 7:1.
//
// La forma no cambia, solo se empuja hacia el negro con 1-(1-alfa)^k. Con k=1
// queda el velo de siempre y k nunca saca el alfa de 1, así que no hay tope que
// inventar.
const PARADAS_VELO: Array<[number, number]> = [[0, 0.93], [34, 0.88], [50, 0.5], [58, 0.26], [68, 0.08], [80, 0]];

const Velo: React.FC<{ fuerza?: number; k?: number }> = ({ fuerza = 1, k = 1 }) => (
  <AbsoluteFill style={{
    background: `linear-gradient(90deg, ${PARADAS_VELO
      .map(([x, a]) => `rgba(10,12,16,${(1 - Math.pow(1 - a, k)) * fuerza}) ${x}%`)
      .join(", ")})`,
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

const BloqueTexto: React.FC<{ b: Extract<Bloque, { tipo?: "texto" }>; dur: number; voz?: string }> = ({ b, dur, voz }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letras = Array.from(b.texto);
  const conVoz = voz && b.voz && b.entra !== undefined && b.habla !== undefined;
  const desdeF = conVoz ? fps * (b.entra as number) : fps * 0.25;
  const hastaF = conVoz ? fps * ((b.entra as number) + (b.habla as number)) : dur - fps * 0.9;
  const avance = interpolate(frame, [desdeF, Math.max(desdeF + 1, hastaF)], [0, letras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const salida = interpolate(frame, [dur - fps * 0.45, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "52%", justifyContent: "center", opacity: salida }}>
      {conVoz ? (
        <Sequence from={Math.round(desdeF)} durationInFrames={Math.max(1, Math.ceil(((b.voz as number[])[1] - (b.voz as number[])[0]) * fps) + 1)}>
          <Audio src={staticFile(voz as string)} trimBefore={Math.floor((b.voz as number[])[0] * fps)} trimAfter={Math.ceil((b.voz as number[])[1] * fps)} />
        </Sequence>
      ) : null}
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
  const aparece = interpolate(frame, [fps * 0.5, fps * 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // VARIOS VALORES CON SU RÓTULO (12-10-2026). El plano mostraba "19963 ->
  // 7207" sin decir de qué año era cada uno, y la tabla de sumarios salía como
  // un antes y un después que el guion nunca dijo. Cada valor lleva ahora su
  // rótulo debajo, y el tamaño baja si las cifras no caben: "31.572 millones"
  // contra "26.000 millones" a 168 px se salía de la pantalla.
  if (b.valores && b.valores.length > 1) {
    const n = b.valores.length;
    const letras = b.valores.reduce((a, v) => a + Array.from(v.valor).length, 0) + (b.flecha ? 2 : 0);
    const tam = Math.min(168, Math.floor((1640 - 90 * (n - 1)) / (0.62 * letras)));
    return (
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: o }}>
        <div style={{ transform: `scale(${zoom})`, textAlign: "center" }}>
          {b.etiqueta ? (
            <div style={{ fontFamily: tema.mono, fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: tema.patina, marginBottom: 34 }}>
              {b.etiqueta}
            </div>
          ) : null}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 90 }}>
            {b.valores.map((v, i) => (
              <React.Fragment key={i}>
                {i > 0 && b.flecha ? (
                  <span style={{ fontFamily: tema.serif, fontSize: tam * 0.57, lineHeight: `${tam}px`, color: tema.patina, opacity: aparece }}>→</span>
                ) : null}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: b.flecha && i === 0 ? 0.38 : i === 0 ? 1 : aparece }}>
                  <div style={{ fontFamily: tema.serif, fontSize: tam, lineHeight: 1, color: tema.papel, whiteSpace: "nowrap" }}>{v.valor}</div>
                  {v.rotulo ? (
                    <div style={{ fontFamily: tema.mono, fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: tema.patina, marginTop: 26 }}>{v.rotulo}</div>
                  ) : null}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div style={{ fontFamily: tema.mono, fontSize: 24, color: tema.gris, marginTop: 48 }}>{b.fuente}</div>
        </div>
      </AbsoluteFill>
    );
  }
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

export const ClaveMural: React.FC<GuionMural> = ({ mural, anchoMural, paradas, paso, velos, viajeSeg, musica, voz, musicaDb, bloques }) => {
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
      {/* LA CAMA, fuera de toda Sequence porque corre de punta a punta. Ya viene
          mezclada a unos -28 dBFS desde el generador, once decibeles bajo el
          sonido del viaje, así que no hay que bajarla acá: lo que suena fuerte
          tiene que ser el movimiento, no el fondo. Con voz sube `musicaDb`
          (4 dB, medido contra la voz en scripts/mezclar-voz.js), y el nivel del
          conjunto lo fija el loudnorm que corre dia.js después del render. */}
      {musica ? <Audio src={staticFile(musica)} volume={Math.pow(10, (musicaDb ?? 0) / 20)} /> : null}
      <AbsoluteFill style={{ transform: `translateX(${x}px)`, width: anchoMural, display: "flex", flexDirection: "row", filter: `saturate(${1 - 0.75 * apagado}) brightness(${1 - 0.45 * apagado})` }}>
        {trozos.map((t) => (
          <Img key={t} src={staticFile(t)} style={{ height: "100%", width: "auto", flexShrink: 0, display: "block" }} />
        ))}
      </AbsoluteFill>
      {/* EL SONIDO DEL VIAJE YA NO VIVE ACÁ (07-10-2026). Vivía como un Audio
          suelto por viaje, y suelto no se puede mezclar: medido, sonaba 21 dB
          POR ENCIMA de la música, que es lo primero que Santiago reclamó al
          escuchar. Ahora el aire de cada viaje va escrito dentro de la misma
          pista que la cama, en scripts/clave-musica.js, que conoce los tiempos
          exactos de cada parada y puede decidir el nivel mirando la cama que ya
          puso. Un sonido que tiene que convivir con otro no puede nacer aparte. */}
      <Velo fuerza={esDato ? 1 - apagado : 1} k={velos?.[actual.parada] ?? 1} />
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
            : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur - (hayViaje ? viaje : 0)} voz={voz} />}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
