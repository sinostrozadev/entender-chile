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
export type Valor = { rotulo: string; valor: string };
export type Bloque =
  // `texto` es lo que lee la voz, en palabras; `textoPantalla` es lo mismo con
  // los números en numerales, que es lo que se ve (regla 36). Si no vienen
  // números, el armador no escribe la segunda y se usa la primera.
  | { tipo?: "texto"; rotulo?: string; marca?: "hecho" | "interpretacion"; tesis?: boolean; fuente?: string; texto: string; textoPantalla?: string; seg: number; parada: number }
  | { tipo: "dato"; rotulo?: string; forma: "flecha" | "lista"; etiqueta?: string; valores: Valor[]; fuente: string; seg: number; parada: number };

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

// LA TESIS SE NARRA Y SE VE (12-10-2026). prompts/guion-claves.md:61 dice "Sí
// se narra" y el armador la descartaba con el resto de los corchetes: catorce
// frases, el 10% de lo hablado, y justo la idea central de cada sección. Va
// más grande que el párrafo porque eso es lo que es, el encabezado de la
// sección, no otra oración más de la fila.
//
// LA FUENTE AL PIE donde hay cifra (reglas 6 y 32): la pieza tiene que
// entenderse con el video en silencio, y una cifra sin fuente a la vista no se
// entiende, se cree. No va en todos los bloques porque una línea que se repite
// en cada plano deja de leerse.
const BloqueTexto: React.FC<{ b: Extract<Bloque, { tipo?: "texto" }>; dur: number }> = ({ b, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const letras = Array.from(b.textoPantalla ?? b.texto);
  const avance = interpolate(frame, [fps * 0.25, dur - fps * 0.9], [0, letras.length], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const salida = interpolate(frame, [dur - fps * 0.45, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pie = interpolate(frame, [fps * 0.9, fps * 1.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ padding: `${tema.margen}px`, width: "52%", justifyContent: "center", opacity: salida }}>
      {b.rotulo ? <Rotulo texto={b.rotulo} /> : null}
      {b.marca ? <Marca marca={b.marca} /> : null}
      <div style={{
        fontFamily: tema.serif, fontSize: b.tesis ? 60 : 48, lineHeight: 1.4,
        color: tema.papel, textShadow: "0 2px 20px rgba(10,14,22,0.8)",
      }}>
        {letras.map((c, i) => (
          <span key={i} style={{ opacity: Math.max(0, Math.min(1, (avance - i) / 4)) }}>{c}</span>
        ))}
      </div>
      {b.fuente ? (
        <div style={{ fontFamily: tema.mono, fontSize: 22, color: tema.gris, marginTop: 28, opacity: pie }}>{b.fuente}</div>
      ) : null}
    </AbsoluteFill>
  );
};

// EL DATO COMO PLANO. El número entra creciendo apenas (1.06 a 1.0): no es un
// efecto, es lo que hace que el ojo lo lea como que llegó y se quedó.
//
// CADA NÚMERO CON SU RÓTULO (12-10-2026, lo cazó Santiago mirando el render).
// Antes esto pintaba dos cifras y una flecha, y la flecha se la ponía a todo:
// al dato de tres valores lo volvía "25352 → 1543", que es un desplome que no
// existió, porque esos tres valores son el desglose de un mismo total. Ahora
// la flecha aparece solo cuando el armador reconoce lo mismo medido en dos
// años, y esos años se escriben bajo cada cifra. Todo lo demás va en lista,
// que no afirma ninguna dirección.
const BloqueDato: React.FC<{ b: Extract<Bloque, { tipo: "dato" }>; dur: number }> = ({ b, dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entra = interpolate(frame, [0, fps * 0.7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sale = interpolate(frame, [dur - fps * 0.5, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const zoom = interpolate(suave(Math.min(1, frame / (fps * 0.9))), [0, 1], [1.06, 1]);
  const flecha = interpolate(frame, [fps * 0.5, fps * 0.9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const esFlecha = b.forma === "flecha" && b.valores.length === 2;
  // la lista entra fila por fila: leer tres pares de un golpe no se puede, y
  // escalonarlas le dice al ojo en qué orden mirarlas
  const fila = (k: number) =>
    interpolate(frame, [fps * (0.35 + 0.3 * k), fps * (0.85 + 0.3 * k)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: entra * sale }}>
      <div style={{ transform: `scale(${zoom})`, textAlign: "center" }}>
        {b.etiqueta ? (
          // LA ETIQUETA TIENE QUE EXPLICAR LA CIFRA SOLA (regla 32). "SERVIDORES
          // 19.963 a 7.207" no dice nada: servidores de qué, contados cómo. Una
          // etiqueta que de verdad da contexto es larga, así que acá se achica
          // en vez de desbordarse, que es lo que hacía antes de medirlo.
          <div style={{
            fontFamily: tema.mono, fontSize: b.etiqueta.length > 30 ? 21 : 26,
            letterSpacing: b.etiqueta.length > 30 ? 2 : 3, textTransform: "uppercase",
            color: tema.patina, marginBottom: 34, maxWidth: 1500, lineHeight: 1.5,
          }}>
            {b.etiqueta}
          </div>
        ) : null}
        {esFlecha ? (
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 46 }}>
            {b.valores.map((v, k) => (
              <React.Fragment key={k}>
                {k > 0 ? (
                  <div style={{ fontFamily: tema.serif, fontSize: 96, lineHeight: 1.75, color: tema.patina, opacity: flecha }}>→</div>
                ) : null}
                <div>
                  <div style={{ fontFamily: tema.serif, fontSize: 168, lineHeight: 1, color: tema.papel, opacity: k === 0 ? 0.38 : 1 }}>{v.valor}</div>
                  <div style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: 2, color: tema.patina, marginTop: 16, opacity: k === 0 ? 0.6 : 1 }}>{v.rotulo}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div style={{ display: "inline-block", textAlign: "left" }}>
            {b.valores.map((v, k) => (
              <div key={k} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 70, opacity: fila(k), marginBottom: k < b.valores.length - 1 ? 26 : 0 }}>
                <span style={{ fontFamily: tema.mono, fontSize: 30, letterSpacing: 2, textTransform: "uppercase", color: tema.patina }}>{v.rotulo}</span>
                <span style={{ fontFamily: tema.serif, fontSize: 86, lineHeight: 1, color: tema.papel }}>{v.valor}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ fontFamily: tema.mono, fontSize: 24, color: tema.gris, marginTop: 44 }}>{b.fuente}</div>
      </div>
    </AbsoluteFill>
  );
};

export const ClaveMural: React.FC<GuionMural> = ({ mural, anchoMural, paradas, paso, velos, viajeSeg, musica, bloques }) => {
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
          tiene que ser el movimiento, no el fondo. */}
      {musica ? <Audio src={staticFile(musica)} /> : null}
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
            : <BloqueTexto b={actual as Extract<Bloque, { tipo?: "texto" }>} dur={dur - (hayViaje ? viaje : 0)} />}
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
