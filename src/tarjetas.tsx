import React, { createContext, useContext } from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema, estiloEyebrow, estiloFuente, colorDeSeccion } from "./tema";
import { Fondo, useFondos } from "./fondos";
import { FondoBiblioteca, tramaDe } from "./fondo-biblioteca";

// LAS TARJETAS Y LOS FONDOS SON DATOS Y NO CÓDIGO (30-09-2026, decisión de
// Santiago). Cada uno de estos números vivía como literal enterrado en este
// archivo, así que moverlo costaba una sesión de trabajo. Ahora salen de
// contenido/config/tarjetas.json y contenido/config/fondos.json, que el taller
// también lee: cambiar cuánto mide un dibujo o de qué tamaño sale una cifra
// deja de ser programar y pasa a ser editar.
//
// SON DOS ARCHIVOS Y NO UNO, y esa es la corrección del día. Nacieron juntos en
// modos.json esa misma mañana, con ocho entradas que parecían del mismo tipo.
// No lo eran: seis decidían qué hay DETRÁS del texto (una propiedad de Marco,
// que envuelve a todas las tarjetas por igual) y dos armaban el cuadro entero
// sin pasar por Marco. O sea que esas dos no eran modos sino tarjetas, y
// meterlas en la misma lista escondía justo la pregunta que importa: qué
// decide lo que el video muestra. Lo decide la TARJETA. El fondo es otra cosa.
//
// Se importan y no se leen en tiempo de render porque Remotion empaqueta el
// bundle: el JSON queda dentro y no hace falta que viaje en el timeline.
import TARJETAS from "../contenido/config/tarjetas.json";
import FONDOS from "../contenido/config/fondos.json";
const COMUN = TARJETAS.comunDibujo;
type Numeros = Record<string, number>;
// n() y no un acceso directo: si un id se escribe mal, un undefined silencioso
// se convierte en un NaN que Remotion arrastra hasta un interpolate y mata el
// render a los diez minutos. Acá revienta al compilar, que es cuando hay
// alguien mirando.
const nums = (id: string): Numeros => {
  const t = TARJETAS.tarjetas.find((x) => x.id === id);
  if (!t) throw new Error(`tarjeta desconocida: ${id}`);
  return (t as unknown as { numeros: Numeros }).numeros;
};
const fondoNums = (id: string): Numeros => {
  const f = FONDOS.fondos.find((x) => x.id === id);
  if (!f) throw new Error(`fondo desconocido: ${id}`);
  return f as unknown as Numeros;
};
const DIBUJO_TEXTO = nums("dibujo-texto");
const DIBUJO_SOLO = nums("dibujo-solo");
const N_PARRAFO = nums("parrafo");
const N_TESIS = nums("tesis");
const N_CITA = nums("cita");
const N_CIFRA = nums("dato-cifra");
const N_COMPARACION = nums("dato-comparacion");
const N_CAMBIO = nums("dato-cambio");
const N_BARRAS = nums("dato-barras");
const N_TABLA = nums("dato-tabla");
const N_MARCADOR = nums("dato-marcador");
const N_ESQUEMA = nums("esquema");
const N_TITULARES = nums("titulares");
const F_COLUMNA = fondoNums("columna");
const F_TV = fondoNums("tv");
const F_IMAGEN = fondoNums("imagen");


// ---------- tipos ----------
// un bloque del párrafo: su texto, dónde empieza dentro del párrafo entero (la
// palabra se ubica en la curva de la voz por esa posición) y el segundo en que
// entra, contado desde que empieza el párrafo
export type BloqueTexto = { texto: string; en: number; desde: number };
export type Tendencia = { dir: "sube" | "baja" | "igual" | null; sentido: "bien" | "mal" | null };
export type Serie = { etiqueta: string; num: number | null; unidad: string; raw: string; tendencia?: Tendencia };
export type Evento = {
  tipo: "tesis" | "narracion" | "cita" | "dato" | "esquema" | "seccion" | "titulares";
  items?: { texto: string; from: number; to: number }[];
  texto?: string;
  textoPantalla?: string;      // el texto con los números en numerales (la voz lee `texto`)
  fuenteSeccion?: string;      // fuente principal del bloque: va al pie de todas sus tarjetas
  automatico?: boolean;        // cifra que el sistema sacó del párrafo (no la eligió el guion)
  etiqueta?: "hecho" | "interpretacion" | null;
  soporte?: boolean;
  // la entrada hablada de una sección: existe en el timeline porque ocupa
  // tiempo de voz y porque el banner se ancla a ella, pero no se pinta (27-09)
  muda?: boolean;
  overlay?: boolean;
  autor?: string;
  fuente?: string;
  grafico?: "barras" | "cifra" | "comparacion" | "lineas" | "marcador" | "tabla" | "cambio";
  seccion?: string;
  categoria?: string;          // la sección DECLARADA por el guion (24-09): elige imagen, color y pictograma
  pausaDur?: number;           // segundos de silencio real en este corte; el mosaico de transición dura eso
  series?: Serie[];
  titulo?: string;
  elementos?: string[];
  caption?: string;
  // SOLO en el video de prueba (scripts/prueba-video.js): el fondo de ESTA
  // tarjeta, por encima de meta.fondoTarjeta. Es lo que deja poner la misma
  // sección dos veces seguidas, primero sobre papel y después sobre su imagen,
  // que es la única manera de compararlas sin rendir dos videos.
  fondo?: ModoFondo;
  // PRUEBA DE BIBLIOTECA (29-09-2026): una imagen de concepto en lugar del
  // párrafo, mientras la voz sigue. Hoy no lo escribe nadie, así que ninguna
  // edición al aire cambia por esto: solo lo pone a mano la muestra que pidió
  // Santiago para ver si veinte dibujos parecidos cansan en movimiento. La
  // biblioteca y su repartidor se archivaron el 01-11-2026 (archivo/); este
  // camino de pintura queda vivo pero sin nadie que lo alimente, y sacarlo es
  // trabajo aparte porque toca el render.
  imagen?: string;             // ruta dentro de public/
  imagenPie?: string;          // rótulo corto al pie, no el párrafo entero
  imagenOrden?: number;        // el lugar que ocupa entre las imágenes seguidas: decide la pose
  // BORRADOR 01-10, párrafo sin cerrar: contra qué se mide la cifra (qué marca
  // rompe, de cuándo viene). Se llama referencia y no "marca" porque en este
  // proyecto la marca es el canal.
  referencia?: string;
  // cuándo la voz dice cada pieza, en segundos desde el inicio de la tarjeta
  // (lo calcula scripts/build-timeline.js con el ritmo del párrafo ancla)
  pasos?: { etiqueta?: number; referencia?: number };
  imagenSola?: boolean;        // sin el texto al lado: el dibujo se queda con el cuadro entero
  // EL TEXTO EN BLOQUES (12-10-2026): el párrafo partido en bloques de ocho o
  // nueve palabras que se relevan con la voz. Lo arma scripts/texto-bloques.js
  // y solo viaja con TEXTO_BLOQUES=1; sin él la tarjeta sale como siempre.
  bloques?: BloqueTexto[];
  // la curva de anclas [fracción del párrafo, segundos desde su inicio] que
  // arma scripts/build-timeline.js con la alineación real de la voz
  ritmo?: [number, number][];
  rotulo?: string;             // rótulo discreto de esa comparación ("papel" / "imagen")
  // También solo en --comparar, y solo en el evento de sección: en qué tramos
  // se parte su banner. La tarjeta de abajo cambia de fondo a mitad de la
  // sección y el banner vive en su propia capa, así que sin esto se quedaría
  // con el color del primer pase y en el segundo no se leería.
  pases?: { from: number; to: number; fondo: ModoFondo }[];
  from: number;
  to: number;
};

// ---------- utilidades ----------
// LA ENTRADA ESCALONADA (01-10-2026, pedido de Santiago: "que esos datos se
// vayan mostrando a medida que avanza la voz, con efectos suaves, pero que haya
// movimiento"). Cada pieza de la tarjeta entra en su segundo, no todas juntas:
// la voz dice la cifra, después qué es, después contra qué se mide, y la
// pantalla la sigue en ese orden en vez de mostrarlo todo antes de que se diga.
//
// Los retardos son en SEGUNDOS y fijos, no atados a las palabras. El ritmo
// palabra por palabra existe (ev.ritmo) pero solo viaja en los eventos de
// narración, y la tarjeta de dato es otro evento: atarla pediría llevarle el
// ritmo de su párrafo ancla, que es un cambio aparte.
const usePaso = (retardoSeg: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: frame - Math.round(retardoSeg * fps), fps, config: { damping: 200 } });
  return {
    opacity: e,
    transform: `translateY(${interpolate(e, [0, 1], [22, 0])}px)`,
  };
};

const useEntrada = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame, fps, config: { damping: 200 } });
  return {
    opacity: e,
    transform: `translateY(${interpolate(e, [0, 1], [26, 0])}px)`,
  };
};

// ─────────────────────────────────────────────────────────────────────────
// EL FONDO DE LA TARJETA (24-09-2026). Santiago, después de ver el express:
// "lo que no quiero es que cambie a blanco". El contenido dejó de vivir sobre
// papel: cada bloque va sobre SU imagen. La principal sobre la ilustración
// del día (la misma de la carátula, así el que entró por esa imagen la sigue
// viendo) y cada sección sobre la suya.
//
// Tres maneras de dejar leer el texto encima, las tres que propuso él:
//   columna    la imagen se queda a la derecha y a la izquierda se apaga en
//              una banda de bloques, igual que la cabecera de sección;
//   oscurecer  la imagen queda entera de fondo y baja de brillo;
//   tv         la imagen queda entera y el texto va dentro de un cuadro.
//
// imagen es el modo que Santiago mandó activar el 27-09-2026, y es el que
// contaba con las imágenes de sección que llegaron: están dibujadas dejando
// la mitad izquierda vacía a propósito, así que no hace falta ni la banda de
// bloques ni el cuadro. El texto se queda en esa mitad, el motivo sigue
// entero a la derecha y encima va un velo suave, que es la red para cuando la
// imagen sea clara (ver VELO_IMAGEN).
//
// papel es el modo de antes, para poder volver sin tocar nada.
// transparente: la tarjeta no dibuja fondo. Lo pone el BLOQUE, que es quien
// maneja el barrido, porque el oscurecido es de la sección entera y no de
// cada tarjeta: si cada tarjeta barriera, la sección barrería cuatro veces.
// VOLVIÓ A LLAMARSE ModoFondo (30-09-2026, la tarde del mismo día en que se
// había renombrado a ModoCuadro). El renombre de la mañana salió de una
// conclusión equivocada: como TarjetaImagen no pasa por Marco y arma su cuadro
// entero, se dio por hecho que un modo era la composición completa y que el
// dibujo era un modo más. Es al revés. El dibujo no usa Marco justamente
// porque NO es un modo: es una tarjeta, y por eso nunca calzó en esta lista.
// Lo que sí es un modo son estas seis ramas, y las seis solo deciden qué hay
// detrás del texto, que es lo que el nombre viejo decía bien.
//
// Lo destrabó Santiago preguntando qué define lo que muestra el video. Al ir a
// mirarlo aparece que once tarjetas se envuelven en Marco y consultan esto, y
// que TarjetaImagen no. Esa asimetría era la pista y se había leído al revés.
//
// `meta.fondoTarjeta` en el timeline NO se renombró a propósito: es un dato que
// viaja en los JSON ya generados, y cambiarlo rompería el re-render de las
// ediciones viejas a cambio de nada.
export type ModoFondo = "columna" | "oscurecer" | "tv" | "papel" | "transparente" | "imagen";
export type Fondo = {
  modo: ModoFondo; caratula?: string | null; secciones: string[];
  // De qué carpeta de public/ salen las imágenes de sección. "secciones" es
  // la de producción; el video de prueba (scripts/prueba-video.js) manda
  // "secciones-prueba" para no pisarlas mientras Santiago decide.
  dir?: string;
  // EL BARRIDO (24-09, secuencia de Santiago). El oscurecido no aparece de
  // golpe: entra de izquierda a derecha. avance 0 = imagen limpia, 1 = toda
  // oscurecida, 0,5 = hasta la mitad, que es donde se muestra el título.
  // retirando invierte el sentido: la oscuridad se va y la imagen vuelve.
  avance?: number; retirando?: boolean;
};
export const FondoTarjetaContext = createContext<Fondo>({ modo: "papel", secciones: [] });

// Qué imagen le toca a un bloque y, con ella, sobre qué va su tarjeta. Vive
// fuera del Marco porque el banner de sección necesita LA MISMA respuesta: el
// 27-09-2026 el banner se seguía pintando con la tinta oscura y sobre la
// imagen quedaba negro sobre azul noche, invisible. Cuando dos lugares
// deciden lo mismo por separado, tarde o temprano dicen cosas distintas.
export const rutaDeFondo = (fondo: Fondo, categoria?: string | null): string | null => {
  const deSeccion = categoria ? fondo.secciones.find((n) => n.startsWith(`${categoria}.`)) : undefined;
  if (deSeccion) return `${fondo.dir ?? "secciones"}/${deSeccion}`;
  // En modo "imagen" manda la imagen de LA SECCIÓN y nada más: el bloque que
  // no tiene una (Apertura, En titulares, Agenda, Cierre, o una sección cuyo
  // PNG todavía no llega) se queda sobre papel, que es lo que se pidió. Los
  // modos del taller sí caen a la ilustración del día, que es para lo que se
  // hicieron, y por eso la regla no se toca para ellos.
  return fondo.modo === "imagen" ? null : fondo.caratula || null;
};
export const modoDeFondo = (fondo: Fondo, categoria?: string | null): ModoFondo =>
  fondo.modo === "transparente" ? "transparente"
    : rutaDeFondo(fondo, categoria) && fondo.modo !== "papel" ? fondo.modo : "papel";

// Borde suave de 15% del ancho: un filo recto se lee como transición de
// presentación, no como luz que avanza.
const BANDA = F_COLUMNA.banda;
// EL DIFUMINADO EMPIEZA DONDE TERMINA LO OSCURO (27-09-2026, Santiago: "la
// mitad izquierda oscurecida sin difuminado y recién ahí empieza el
// difuminado"). Antes la banda quedaba CENTRADA en el avance, así que al 50%
// lo macizo llegaba solo al 35% de la pantalla y el título, que llega al 45%,
// sobraba por la derecha: "el título queda más ancho que lo oscuro". Ahora el
// avance marca el borde de lo macizo y la banda sale desde ahí hacia afuera,
// que es lo que se pidió y de paso deja al título siempre dentro.
export const velo = (avance: number, retirando: boolean, alfa = F_COLUMNA.alfa) => {
  const v = Math.max(0, Math.min(1, avance));
  const oscuro = `rgba(21,23,26,${alfa})`;
  if (retirando) {
    // el velo se va: la banda corre por delante para que en 0 quede todo
    // oscuro (empalma con avance 1) y en 1 no quede nada
    const q = v * (100 + BANDA);
    return `linear-gradient(90deg, rgba(21,23,26,0) ${q - BANDA}%, ${oscuro} ${q}%)`;
  }
  return `linear-gradient(90deg, ${oscuro} ${v * 100}%, rgba(21,23,26,0) ${v * 100 + BANDA}%)`;
};

// EL VELO DEL MODO "imagen" (27-09-2026). No es un fondo, es una red: las
// imágenes de sección son azul oscuro y el texto blanco ya se lee encima, pero
// las doce definitivas no tienen por qué serlo todas, y una clara dejaría la
// tarjeta ilegible sin que nadie lo revise imagen por imagen. Así que baja
// fuerte sobre la columna del texto y se retira antes del motivo: sube el
// contraste donde hay letras y deja la ilustración a la vista donde no las
// hay. Nada se mueve: el barrido es de los modos del taller, no de este.
const VELO_IMAGEN = "linear-gradient(90deg, rgba(21,23,26,0.62) 0%, rgba(21,23,26,0.58) 38%, " +
  "rgba(21,23,26,0.18) 64%, rgba(21,23,26,0.12) 100%)";

// El texto se queda en la mitad izquierda, que es la que la imagen deja vacía.
// Con tema.anchoTexto (1340) una tesis larga cruzaba por encima del motivo.
const ANCHO_TEXTO_IMAGEN = F_IMAGEN.anchoTexto;

const CLARO = { "--ec-tinta": "#17191C", "--ec-gris": "#6B6E6A", "--ec-linea": "#DDDDD5",
  "--ec-acento": "#2F7263", "--ec-fondo": "#F2F2EF", "--ec-elevado": "#FCFCFA" } as React.CSSProperties;
const OSCURO = { "--ec-tinta": "#F7F6F2", "--ec-gris": "rgba(242,242,239,0.74)",
  "--ec-linea": "rgba(255,255,255,0.20)", "--ec-acento": "#D08A5B",
  "--ec-fondo": "#15171A", "--ec-elevado": "rgba(255,255,255,0.08)" } as React.CSSProperties;

// la banda de bloques, la misma idea que en la cabecera de sección
const COLS = 20, FILAS = 11;
const BandaBloques: React.FC<{ url: string }> = ({ url }) => {
  const bloques: React.ReactNode[] = [];
  for (let c = 0; c < COLS; c++) {
    const t = c / (COLS - 1);
    if (t < 0.26 || t > 0.74) continue;
    const vive = interpolate(t, [0.26, 0.74], [0, 1]);
    for (let r = 0; r < FILAS; r++) {
      const ruido = ((c * 7 + r * 13) % 11) / 11;
      const op = Math.max(0, Math.min(1, (vive - ruido * 0.45) * 1.5));
      if (op <= 0.02) continue;
      bloques.push(<div key={`${c}-${r}`} style={{
        position: "absolute", left: `${(c / COLS) * 100}%`, top: `${(r / FILAS) * 100}%`,
        width: `${100 / COLS}%`, height: `${100 / FILAS}%`, opacity: op,
        backgroundImage: `url(${url})`, backgroundSize: `${COLS * 300}% ${FILAS * 300}%`,
        backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (FILAS - 1)) * 100}%`,
      }} />);
    }
  }
  return <AbsoluteFill style={{ overflow: "hidden" }}>{bloques}</AbsoluteFill>;
};

const Marco: React.FC<{ children: React.ReactNode; abajo?: React.ReactNode; seccion?: string; categoria?: string | null }> =
({ children, abajo, seccion, categoria }) => {
  const fondos = useFondos();
  const fondo = useContext(FondoTarjetaContext);
  const frame = useCurrentFrame();

  // qué imagen le toca a este bloque: la de su sección si existe; si no, la
  // ilustración del día, que sirve para la principal y para los bloques de
  // estructura (Apertura, En titulares, Agenda, Cierre), que son de la
  // edición entera y no de un tema. La regla completa está en rutaDeFondo.
  const ruta = rutaDeFondo(fondo, categoria);
  const url = ruta ? staticFile(ruta) : null;
  const modo = modoDeFondo(fondo, categoria);
  const oscuro = modo !== "papel";

  // imagen viva: el acercamiento lentísimo que ya estaba probado. Nunca se
  // queda del todo quieta una foto de fondo, pero tampoco se nota moverse.
  const escala = 1 + Math.min(frame, 600) * 0.00012;

  return (
  <AbsoluteFill style={{ ...(oscuro ? OSCURO : CLARO),
    backgroundColor: modo === "transparente" ? "transparent" : oscuro ? "#15171A" : tema.papel,
    padding: tema.margen, justifyContent: "center" }}>
    {url && oscuro && modo !== "transparente" ? (
      <>
        <Img src={url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", transform: `scale(${escala})` }} />
        {modo === "columna" ? (
          <>
            <BandaBloques url={url} />
            <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(21,23,26,1) 34%, rgba(21,23,26,0) 66%)" }} />
          </>
        ) : null}
        {modo === "oscurecer" ? (
          <AbsoluteFill style={{ background: velo(fondo.avance ?? 1, !!fondo.retirando) }} />
        ) : null}
        {modo === "tv" ? (
          <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(21,23,26,0.55) 0%, rgba(21,23,26,0.25) 100%)" }} />
        ) : null}
        {modo === "imagen" ? <AbsoluteFill style={{ background: VELO_IMAGEN }} /> : null}
      </>
    ) : null}
    {!oscuro && fondos.activo ? <Fondo seccion={seccion} fuerza={0.7} /> : null}
    <div
      style={{
        position: "absolute",
        left: 56,
        top: 150,
        bottom: 150,
        width: 8,
        borderRadius: 4,
        backgroundColor: colorDeSeccion(categoria || seccion),
        opacity: oscuro ? 0.95 : 0.85,
      }}
    />
    {/* el cuadro: en modo tv el texto vive adentro de un panel sobre la foto */}
    {/* en modo columna el texto tiene que caber en la columna oscura: con el
        ancho de siempre se cruzaba sobre la imagen justo donde más clara es */}
    {/* en modo imagen, lo mismo pero por el lado del dibujo: la mitad
        izquierda está vacía a propósito y el texto no puede invadir el motivo */}
    <div style={{ maxWidth: modo === "tv" ? F_TV.anchoTexto : modo === "columna" ? F_COLUMNA.anchoTexto
      : modo === "imagen" ? ANCHO_TEXTO_IMAGEN : tema.anchoTexto, position: "relative",
      ...(modo === "tv" ? {
        backgroundColor: "rgba(17,19,22,0.88)", padding: "64px 72px", borderRadius: 4,
        border: "1px solid rgba(255,255,255,0.12)",
      } : {}) }}>{children}</div>
    {/* la leyenda del pie también es texto y también tiene que quedarse en la
        mitad izquierda: sobre la imagen cruzaba por encima del motivo y ahí no
        se leía. La línea de FUENTE no se toca, va donde siempre. */}
    {abajo ? (
      <div style={{ position: "absolute", left: tema.margen, right: tema.margen, bottom: 84,
        "--ec-ancho-leyenda": modo === "imagen" ? `${ANCHO_TEXTO_IMAGEN}px` : "1200px" } as React.CSSProperties}>
        {abajo}
      </div>
    ) : null}
  </AbsoluteFill>
  );
};

const Chip: React.FC<{ etiqueta: "hecho" | "interpretacion" }> = ({ etiqueta }) => {
  const solido = etiqueta === "hecho";
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: tema.mono,
        fontSize: 24,
        letterSpacing: "0.18em",
        padding: "10px 22px",
        borderRadius: 999,
        marginBottom: 34,
        color: solido ? "var(--ec-fondo)" : "var(--ec-acento)",
        backgroundColor: solido ? "var(--ec-tinta)" : "transparent",
        border: solido ? `2px solid ${"var(--ec-tinta)"}` : `2px solid ${"var(--ec-acento)"}`,
      }}
    >
      {solido ? "HECHO" : "INTERPRETACIÓN"}
    </div>
  );
};

const PieFuente: React.FC<{ fuente?: string; caption?: string; retardo?: number }> =
({ fuente, caption, retardo }) => {
  // El párrafo al pie entra DESPUÉS de que la voz dijo la cifra: así no es
  // leer lo que uno está oyendo, es confirmar lo que acaba de oír.
  const st = usePaso(retardo ?? 0);
  return (
    <div>
      {caption ? (
        <div style={{ ...(retardo ? st : {}), fontFamily: tema.sans, fontSize: 28, lineHeight: 1.4,
          color: "var(--ec-gris)", maxWidth: "var(--ec-ancho-leyenda, 1200px)", marginBottom: 18 }}>
          {caption}
        </div>
      ) : null}
      {fuente ? <div style={estiloFuente}>FUENTE · {fuente}</div> : null}
    </div>
  );
};

// Indicador junto a una cifra: flecha arriba/abajo, igual, visto o alerta.
// Dibujado en SVG (sin depender de que la fuente traiga el glifo). Verde =
// bien, rojo = mal; por defecto subir es bien y bajar es mal, salvo que el
// guion diga lo contrario ("(baja bien)": bajó el desempleo).
const ROJO = "#B3402F";
export const Indicador: React.FC<{ t?: Tendencia; size?: number }> = ({ t, size = 96 }) => {
  if (!t || (!t.dir && !t.sentido)) return null;
  const sentido = t.sentido ?? (t.dir === "sube" ? "bien" : t.dir === "baja" ? "mal" : null);
  const color = sentido === "bien" ? "var(--ec-acento)" : sentido === "mal" ? ROJO : "var(--ec-gris)";
  const st = { width: size, height: size, flexShrink: 0 } as React.CSSProperties;
  if (t.dir === "sube" || t.dir === "baja") {
    return (
      <svg viewBox="0 0 100 100" style={{ ...st, transform: t.dir === "baja" ? "rotate(180deg)" : undefined }}>
        <path d="M50 12 L84 50 L64 50 L64 88 L36 88 L36 50 L16 50 Z" fill={color} />
      </svg>
    );
  }
  if (t.dir === "igual") {
    return (
      <svg viewBox="0 0 100 100" style={st}>
        <rect x="16" y="42" width="68" height="16" rx="4" fill={color} />
      </svg>
    );
  }
  if (sentido === "bien") {
    return (
      <svg viewBox="0 0 100 100" style={st}>
        <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="8" />
        <path d="M28 52 L44 68 L74 34" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" style={st}>
      <path d="M50 10 L92 86 L8 86 Z" fill="none" stroke={color} strokeWidth="8" strokeLinejoin="round" />
      <rect x="45" y="38" width="10" height="26" rx="3" fill={color} />
      <circle cx="50" cy="74" r="6" fill={color} />
    </svg>
  );
};

// ---------- tarjetas ----------
export const TarjetaTesis: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ ...st }}>
        <div style={{ ...estiloEyebrow, marginBottom: N_TESIS.rotuloAbajo }}>La idea</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoProsa(ev.textoPantalla ?? ev.texto ?? "", N_TESIS.texto), lineHeight: N_TESIS.interlinea, color: "var(--ec-tinta)" }}>
          {ev.textoPantalla ?? ev.texto}
        </div>
      </div>
    </Marco>
  );
};

// La imagen ocupa el cuadro entero, no un recuadro dentro de la tarjeta: si
// se deja enmarcada compite con la imagen de sección que ya está detrás y se
// leen dos fondos a la vez. Acá reemplaza al párrafo y punto.
// EL MOTIVO SE ACHICA Y SE MUEVE (29-09-2026). La primera versión ocupaba el
// cuadro entero y Santiago lo vio de inmediato: leía como una portada, no como
// una imagen que acompaña a alguien que está hablando. Tres portadas seguidas
// pesan. Acá el dibujo baja a poco más de la mitad del alto y el resto es aire.
//
// Y el aire no está vacío: ahí van las tres capas que dan la profundidad, cada
// una a su paso. Al fondo la foto de la SECCIÓN, que deriva unos 6 px y ya
// casi no se ve bajo el velo. Encima la TRAMA de la biblioteca, que va al
// mismo lado que el motivo pero a un tercio de su paso. Y adelante el motivo.
// Un solo plano moviéndose no da efecto, da deriva: lo que se lee como
// profundidad es la diferencia entre los pasos.
//
// SE FUERON EL SCREEN, LA MÁSCARA Y EL CONTRASTE (29-09-2026, tarde). Los tres
// eran parches para esconder el fondo propio de un PNG que no venía recortado.
// Desde que la biblioteca entrega PNG con canal alfa de verdad, y la puerta
// (archivo/scripts/revisar-imagen.js) no deja pasar uno que no lo traiga, los tres
// estorban:
//
//   la MÁSCARA elíptica cortaba el dibujo en un óvalo. Con el PNG recortado no
//   hay rectángulo que esconder, así que lo único que hacía era comerse las
//   esquinas de la escena: en la primera prueba de La Moneda le cortó la
//   explanada y los dos extremos del edificio.
//   el SCREEN ya no hace falta porque no hay fondo que anular, y encima aclara
//   el trazo contra lo que haya debajo.
//   el CONTRASTE a 1,38 aplastaba el achurado, que es justamente donde el
//   grabado guarda su volumen.
//
// Si alguien pone acá un PNG sin recortar, ahora se le va a ver el rectángulo.
// Eso es lo correcto: es la señal de que esa imagen no pasó por la puerta.
const PASEO_SEG = COMUN.paseoSeg;        // lo que dura el párrafo más largo que se ha visto
const CLAMP = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

// LAS POSES (29-09-2026, tercera versión). Lo que no convencía no era el
// tamaño ni la velocidad: era que las tres imágenes seguidas eran la misma
// imagen. Mismo alto, mismo centro, mismo viaje. Tres veces la misma
// composición se lee como una sola repetida, por distintos que sean los
// dibujos, y ahí no hay silueta que salve.
//
// Así que la pose rota: a la derecha y chica, a la izquierda y mediana, al
// centro y grande. Y el viaje va alternado, porque de eso se trata el RELEVO
// que pidió Santiago: si la primera termina yéndose hacia la izquierda, la
// segunda entra por la izquierda y sigue hacia la derecha. No se lee como un
// corte entre dos láminas, se lee como que la cámara nunca paró.
type Pose = { x: number; alto: number; viaje: number; sube: number; dibujoA: "izq" | "der" };
const POSES: Pose[] = COMUN.poses as Pose[];

// EL TEXTO QUE APARECE (29-09-2026, idea de Santiago: "y si dejas el dibujo a
// una orilla y en la otra dejas un texto, y que vaya apareciendo el texto? Lo
// que quiero es ver movimiento, no se ve movimiento").
//
// Tenía razón y el número lo dice: el motivo recorre 86 píxeles en veinte
// segundos, o sea cuatro píxeles por segundo. Eso no se ve. Nadie percibe
// cuatro píxeles por segundo, y subirlo hasta que se note sería una imagen
// deslizándose, que es peor.
//
// El movimiento que SÍ se ve es el que cambia el cuadro todo el tiempo, y
// además no es decorativo: las palabras apareciendo a medida que se hablan.
// Quince segundos de párrafo son unas cuarenta apariciones.
//
// CUÁNDO APARECE CADA PALABRA: con la voz real. `ev.ritmo` trae una curva de
// anclas que arma build-timeline.js desde la alineación de Azure, y acá se
// interpola: la palabra que está al 40% del párrafo aparece en el segundo en
// que la voz iba al 40% del párrafo, no en el 40% del reloj.
//
// La diferencia entre las dos cosas no es teórica. Repartir en partes iguales
// se desarma en cuanto hay una pausa, un nombre largo o una cifra leída
// despacio, que es justo donde la palabra importa.
//
// Sin `ritmo` (timelines viejos, o un evento que no es narración) se reparte
// parejo, que es lo que había antes y sigue sirviendo de red.
//
// Se dibujan TODAS las palabras desde el primer cuadro, las que aún no tocan
// con opacidad cero. Si se fueran agregando, el bloque crecería y el texto
// saltaría en cada palabra.
const ADELANTO_SEG = COMUN.adelantoSeg;   // la palabra aparece un pelo antes de oírse
const PALABRA_SEG = COMUN.palabraSeg;     // lo que tarda en entrar

// en qué segundo iba la voz cuando llevaba la fracción `f` del párrafo
const enCurva = (ritmo: [number, number][] | undefined, f: number, dur: number): number => {
  if (!ritmo || ritmo.length < 2) return f * dur;
  if (f <= ritmo[0][0]) return ritmo[0][1];
  for (let i = 1; i < ritmo.length; i++) {
    const [f1, t1] = ritmo[i];
    if (f <= f1) {
      const [f0, t0] = ritmo[i - 1];
      const k = f1 === f0 ? 0 : (f - f0) / (f1 - f0);
      return t0 + k * (t1 - t0);
    }
  }
  // después del último ancla queda la cola del párrafo: se estira hasta el fin
  const [fu, tu] = ritmo[ritmo.length - 1];
  const resto = Math.max(0.001, 1 - fu);
  return tu + ((f - fu) / resto) * Math.max(0, dur - tu);
};

const Palabras: React.FC<{ texto: string; dur: number; ritmo?: [number, number][] }> = ({ texto, dur, ritmo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps + ADELANTO_SEG;
  const piezas = texto.split(/(\s+)/).filter((p) => p.length > 0);
  const total = Math.max(1, texto.length);
  let recorrido = 0;
  return (
    <>
      {piezas.map((p, i) => {
        const inicio = enCurva(ritmo, recorrido / total, dur);
        recorrido += p.length;
        if (/^\s+$/.test(p)) return <span key={i}> </span>;
        const avance = interpolate(t, [inicio, inicio + PALABRA_SEG], [0, 1], CLAMP);
        return (
          <span key={i} style={{ display: "inline-block", opacity: avance,
            transform: `translateY(${((1 - avance) * 10).toFixed(2)}px)` }}>{p}</span>
        );
      })}
    </>
  );
};

// EL TEXTO SE REEMPLAZA, NO SE ACUMULA (12-10-2026, decisión de Santiago).
// Es la regla de la Clave del mural (cabecera de src/clave-mural.tsx) llevada
// al informe: "un párrafo que crece obliga a leer a nuestra velocidad y el
// espectador siempre va atrasado". En el informe ni siquiera crecía: salía
// entero desde el primer cuadro, un muro de hasta sesenta palabras.
//
// Lo que se reutiliza y lo que no. De la Clave viene el relevo: un bloque a la
// vez, que se apaga antes de que entre el siguiente y nunca convive con él. De
// Palabras, acá arriba, viene CUÁNDO aparece cada palabra: la curva real de la
// voz, no el reloj parejo con que la Clave revela letras (la Clave no tiene
// alineación por palabra; el informe sí, y sería un desperdicio no usarla).
// Dónde se corta cada bloque lo decide scripts/texto-bloques.js.
//
// LA CAJA TIENE ALTO FIJO, el de las líneas que cabe el bloque más largo
// posible (once palabras). Si midiera lo que mide cada bloque, uno de dos
// líneas después de uno de tres haría subir y bajar todo lo que está encima,
// el chip de hecho o interpretación incluido, en cada relevo.
const RELEVO_BLOQUE_SEG = 0.2;
export const Bloques: React.FC<{ texto: string; bloques: BloqueTexto[]; dur: number; ritmo?: [number, number][];
  tam: number; interlinea: number; lineas?: number }> = ({ texto, bloques, dur, ritmo, tam, interlinea, lineas = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ahora = frame / fps;
  let k = 0;
  for (let i = 0; i < bloques.length; i++) if (bloques[i].desde <= ahora) k = i;
  const b = bloques[k];
  const sig = bloques[k + 1];
  // se apaga en el último tramo antes de que entre el siguiente; el tramo nunca
  // es más largo que un tercio del bloque, para que uno cortísimo alcance a leerse
  const tramo = sig ? Math.min(RELEVO_BLOQUE_SEG, Math.max(0.04, (sig.desde - b.desde) / 3)) : 0;
  const sale = sig ? interpolate(ahora, [sig.desde - tramo, sig.desde], [1, 0], CLAMP) : 1;
  const t = ahora + ADELANTO_SEG;
  const total = Math.max(1, texto.length);
  const piezas = b.texto.split(/(\s+)/).filter((p) => p.length > 0);
  let recorrido = b.en;
  return (
    // textWrap balance: sin él, "Uno corresponde a la defensa de Samir Enrique
    // Rivaldo" llenaba la primera línea y dejaba "Hernández" sola en la
    // segunda (cuadro del 12-10-2026). El bloque ya no deja palabras huérfanas,
    // pero el renglón sí podía; repartido parejo, nunca queda una sola abajo.
    <div style={{ height: Math.ceil(tam * interlinea * lineas), opacity: sale, textWrap: "balance" } as React.CSSProperties}>
      {piezas.map((p, i) => {
        const inicio = enCurva(ritmo, recorrido / total, dur);
        recorrido += p.length;
        if (/^\s+$/.test(p)) return <span key={i}> </span>;
        const avance = interpolate(t, [inicio, inicio + PALABRA_SEG], [0, 1], CLAMP);
        return (
          <span key={i} style={{ display: "inline-block", opacity: avance,
            transform: `translateY(${((1 - avance) * 10).toFixed(2)}px)` }}>{p}</span>
        );
      })}
    </div>
  );
};

// el orden lo pone quien arma el timeline; si no lo pone nadie, se reparte por
// el nombre del archivo, que al menos garantiza que dos conceptos distintos
// casi nunca caen en la misma pose
const poseDe = (ev: Evento): Pose => {
  if (typeof ev.imagenOrden === "number") return POSES[Math.abs(ev.imagenOrden) % POSES.length];
  const clave = ev.imagen || "";
  let n = 0;
  for (let i = 0; i < clave.length; i++) n = (n * 31 + clave.charCodeAt(i)) % 9973;
  return POSES[n % POSES.length];
};

export const TarjetaImagen: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const op = spring({ frame, fps, config: { damping: 200 } });
  const pose = poseDe(ev);
  const trama = tramaDe(ev.imagen || "");
  const texto = ev.textoPantalla ?? ev.texto ?? "";
  // con texto al lado el dibujo se va a SU mitad y se achica para caber en
  // ella: 46% de 1920 son 883 px, y un 16:9 de 466 px de alto mide 830 de ancho
  const conTexto = !ev.imagenSola && texto.length > 0;
  const equis = conTexto ? (pose.dibujoA === "der" ? DIBUJO_TEXTO.equisDer : DIBUJO_TEXTO.equisIzq) : pose.x;
  const alto = conTexto ? DIBUJO_TEXTO.alto : pose.alto;
  const avance = interpolate(frame, [0, fps * PASEO_SEG], [0, 1], CLAMP);

  // EL VIAJE. El motivo cruza `pose.viaje` píxeles en veinte segundos, y empieza
  // desplazado media distancia hacia atrás: así entra ya en movimiento y no
  // arranca desde la quietud, que es lo que hacía que pareciera una estampa.
  const viaje = interpolate(avance, [0, 1], [-pose.viaje / 2, pose.viaje / 2]);
  const entra = interpolate(op, [0, 1], [COMUN.entra, 0]);
  const nace = interpolate(op, [0, 1], [COMUN.nace, 1]);
  const respira = 1 + avance * COMUN.respira;

  // TRES VELOCIDADES, que es lo que da profundidad de verdad: la foto de la
  // sección deriva unos 6 px (eso lo hace el bloque), la trama de la
  // biblioteca va al MISMO lado que el motivo pero a un tercio de su paso, y
  // el motivo manda. Si la trama fuera al revés se pelearía con el motivo en
  // vez de quedarse atrás.
  const tramaX = -viaje * COMUN.tramaPaso + avance * COMUN.tramaDeriva;
  const tramaY = avance * COMUN.tramaCaida;

  // EL VELO NO ES PAREJO CUANDO HAY TEXTO (29-09-2026). Parejo y alto dejaba
  // legible la columna pero mataba el fondo de sección entero, y con él lo
  // único del cuadro que hace zoom. Ahora tapa fuerte del lado del texto (que
  // es donde el GRABADO de la sección, que es enorme, cae encima de las
  // letras) y afloja del lado del dibujo, que es donde el acercamiento lento
  // de la foto sí se puede ver. Es el mismo velo haciendo dos trabajos.
  const tapa = interpolate(op, [0, 1], [0, DIBUJO_TEXTO.veloTexto], CLAMP).toFixed(3);
  // 0,78 y no 0,58 del lado del dibujo (29-09, tarde): cuando el motivo es a su
  // vez arquitectura, como La Moneda, la foto de la sección que asoma detrás se
  // lee como un SEGUNDO edificio. Con dibujos de objeto no molestaba.
  const suelta = interpolate(op, [0, 1], [0, DIBUJO_TEXTO.veloDibujo], CLAMP).toFixed(3);
  const velado = interpolate(op, [0, 1], [0, DIBUJO_SOLO.velo], CLAMP);
  const cortina = conTexto
    ? `linear-gradient(${pose.dibujoA === "der" ? 90 : 270}deg, rgba(16,18,21,${tapa}) 0%, rgba(16,18,21,${tapa}) 44%, rgba(16,18,21,${suelta}) 82%, rgba(16,18,21,${suelta}) 100%)`
    : `rgba(16,18,21,${velado.toFixed(3)})`;
  return (
    <AbsoluteFill style={{ opacity: op }}>
      <AbsoluteFill style={{ background: cortina }} />
      {/* la trama también se acerca, y más que la foto: son dos zooms a
          distinta velocidad, que es lo que hace que se noten los dos */}
      <FondoBiblioteca trama={trama} dx={tramaX} dy={tramaY} opacidad={op * COMUN.tramaOpacidad}
        escala={1 + avance * COMUN.tramaEscala} />
      <Img
        src={staticFile(ev.imagen as string)}
        style={{
          position: "absolute", height: `${Math.round(alto * 100)}%`, width: "auto",
          // EL ANCHO TAMBIÉN SE LIMITA (29-09-2026). El dibujo se escala por su
          // ALTO, así que un motivo muy apaisado (La Moneda llegó en 2000x750,
          // que es 2,67 a 1) se pasaba de su mitad e invadía la columna del
          // texto. Con el tope de ancho, una imagen ancha simplemente queda más
          // baja, que es lo correcto: se achica sola en vez de romper el
          // cuadro.
          maxWidth: `${(conTexto ? DIBUJO_TEXTO.anchoMax : DIBUJO_SOLO.anchoMax) * 100}%`,
          objectFit: "contain",
          left: `${equis * 100}%`, top: `${pose.sube * 100}%`,
          transform: `translate(-50%, -50%) translate(${viaje}px, ${entra}px) scale(${nace * respira})`,
        } as React.CSSProperties}
      />
      {conTexto ? (
        <AbsoluteFill style={{ padding: `0 ${tema.margen}px`, alignItems: "center",
          flexDirection: pose.dibujoA === "der" ? "row" : "row-reverse", justifyContent: "space-between" }}>
          <div style={{ width: "46%", fontFamily: tema.sans, fontSize: 40, lineHeight: 1.5,
            color: "#E8E7E1", paddingBottom: 60 }}>
            {ev.bloques && ev.bloques.length
              ? <Bloques texto={texto} bloques={ev.bloques} dur={Math.max(1, ev.to - ev.from)} ritmo={ev.ritmo}
                  tam={40} interlinea={1.5} />
              : <Palabras texto={texto} dur={Math.max(1, ev.to - ev.from)} ritmo={ev.ritmo} />}
          </div>
          <div style={{ width: "46%" }} />
        </AbsoluteFill>
      ) : null}
      <div style={{ position: "absolute", left: 56, top: 150, bottom: 150, width: 8, borderRadius: 4,
        backgroundColor: colorDeSeccion(ev.categoria || ev.seccion), opacity: 0.95 }} />
      {/* con el párrafo en pantalla el rótulo sobra: diría lo mismo dos veces.
          Ahí abajo va la fuente, que es lo que corresponde. */}
      {(conTexto ? ev.fuenteSeccion : ev.imagenPie) ? (
        <div style={{ position: "absolute", left: tema.margen, right: tema.margen, bottom: 84,
          fontFamily: tema.mono, fontSize: conTexto ? 24 : 30, letterSpacing: "0.06em",
          color: "#E8E7E1", opacity: conTexto ? 0.62 : 0.88 }}>
          {conTexto ? ev.fuenteSeccion : ev.imagenPie}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const BLOQUE_TAM = 54;
const BLOQUE_INTERLINEA = 1.4;
export const TarjetaParrafo: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  if (ev.imagen) return <TarjetaImagen ev={ev} />;
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ ...st }}>
        {ev.etiqueta ? <div><Chip etiqueta={ev.etiqueta} /></div> : null}
        {ev.bloques && ev.bloques.length ? (
          // en bloques la letra sube de 42 a 54: con nueve palabras en pantalla
          // sobra cuadro, y el bloque tiene que leerse de una mirada
          <div style={{ fontFamily: tema.sans, fontSize: BLOQUE_TAM, lineHeight: BLOQUE_INTERLINEA, color: "var(--ec-tinta)" }}>
            <Bloques texto={ev.textoPantalla ?? ev.texto ?? ""} bloques={ev.bloques} dur={Math.max(1, ev.to - ev.from)}
              ritmo={ev.ritmo} tam={BLOQUE_TAM} interlinea={BLOQUE_INTERLINEA} />
          </div>
        ) : (
          <div style={{ fontFamily: tema.sans, fontSize: N_PARRAFO.texto, lineHeight: N_PARRAFO.interlinea, color: "var(--ec-tinta)" }}>{ev.textoPantalla ?? ev.texto}</div>
        )}
      </div>
    </Marco>
  );
};

export const TarjetaCita: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente} />}>
      <div style={{ ...st }}>
        <div style={{ fontFamily: tema.serif, fontStyle: "italic", fontSize: N_CITA.texto, lineHeight: N_CITA.interlinea, color: "var(--ec-tinta)" }}>
          “{ev.textoPantalla ?? ev.texto}”
        </div>
        <div style={{ fontFamily: tema.mono, fontSize: N_CITA.autor, color: "var(--ec-acento)", marginTop: N_CITA.autorArriba }}>- {ev.autor}</div>
      </div>
    </Marco>
  );
};

// Prosa: encoge para que una tesis larga no se salga del cuadro (red del
// BUG 1, 02-09). Mismos cortes que en Short.tsx, calibrados a 1920x1080.
export const tamanoProsa = (t: string, base: number): number => {
  const n = (t || "").length;
  if (n <= 90) return base;
  if (n <= 140) return Math.round(base * 0.82);
  if (n <= 200) return Math.round(base * 0.66);
  if (n <= 300) return Math.round(base * 0.52);
  return Math.round(base * 0.42);
};

const tamanoValor = (raw: string, base: number): number => {
  const n = raw.length;
  if (n <= 6) return base;
  if (n <= 12) return Math.round(base * 0.62);
  if (n <= 24) return Math.round(base * 0.4);
  return Math.round(base * 0.3);
};

export const TarjetaDatoBarras: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  if (series.some((s) => s.num == null)) return <TarjetaDatoComparacion ev={ev} />; // valores no numéricos: no hay barra posible
  const max = Math.max(...series.map((s) => Math.abs(s.num ?? 0)), 1);
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 6, fps, config: { damping: 200 } });
          const w = interpolate(e, [0, 1], [0, (Math.abs(s.num ?? 0) / max) * 780]);
          const destacada = i === 0;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 36 }}>
              <div style={{ width: N_BARRAS.anchoEtiqueta, fontFamily: tema.sans, fontSize: N_BARRAS.etiqueta, color: "var(--ec-tinta)", textAlign: "right" }}>
                {s.etiqueta}
              </div>
              <div style={{ width: N_BARRAS.anchoBarra, height: N_BARRAS.altoBarra, backgroundColor: "var(--ec-linea)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ width: w, height: "100%", backgroundColor: destacada ? "var(--ec-acento)" : "var(--ec-tinta)", borderRadius: 8 }} />
              </div>
              <div style={{ fontFamily: tema.mono, fontSize: N_BARRAS.valor, color: "var(--ec-tinta)", opacity: e }}>{s.raw}</div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDatoComparacion: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ display: "flex", gap: 90, alignItems: "flex-end" }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 7, fps, config: { damping: 200 } });
          return (
            <div key={i} style={{ opacity: e, transform: `translateY(${interpolate(e, [0, 1], [24, 0])}px)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, N_COMPARACION.valor), lineHeight: 1.05, color: (s.num ?? 0) < 0 ? "var(--ec-tinta)" : "var(--ec-acento)", maxWidth: 480 }}>
                  {s.raw}
                </div>
                <Indicador t={s.tendencia} size={72} />
              </div>
              <div style={{ fontFamily: tema.sans, fontSize: N_COMPARACION.etiqueta, color: "var(--ec-gris)", marginTop: N_COMPARACION.etiquetaArriba, maxWidth: 420 }}>{s.etiqueta}</div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDatoCifra: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  // el orden en que la voz dice las cosas: la cifra, la flecha, qué es, y al
  // final contra qué se mide
  // LOS RETARDOS SALEN DEL TIMELINE cuando la voz dice esas palabras
  // (ev.pasos). Los números de abajo son la red para cuando no las dice: una
  // pieza que nadie nombra no puede esperar a que la nombren.
  const paso = {
    flecha: usePaso(0.45),
    etiqueta: usePaso(ev.pasos?.etiqueta ?? 0.8),
    referencia: usePaso(ev.pasos?.referencia ?? 1.9),
  };
  const s = (ev.series ?? [])[0];
  if (!s) return null;
  const soloSenal = !s.raw; // "Empleo formal: (baja mal)" -> la etiqueta grande con la flecha
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria}
      // SIN EL PÁRRAFO AL PIE (01-10-2026, decisión de Santiago). Esta tarjeta
      // ya cuenta las tres cosas (la cifra, qué es y contra qué se mide), así
      // que el párrafo de abajo repetía en chico lo que la pantalla decía
      // grande. La fuente se queda: es la firma del canal.
      abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} />}>
      <div style={{ ...st }}>
        {soloSenal ? (
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: N_CIFRA.etiquetaGrande, lineHeight: 1.05, color: "var(--ec-tinta)", maxWidth: 1100 }}>{s.etiqueta}</div>
            <Indicador t={s.tendencia} size={150} />
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 34 }}>
              <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: tamanoValor(s.raw, N_CIFRA.valor), lineHeight: 1.05, color: "var(--ec-tinta)" }}>{s.raw}</div>
              <div style={{ ...paso.flecha }}><Indicador t={s.tendencia} size={110} /></div>
            </div>
            {s.etiqueta ? (
              <div style={{ ...paso.etiqueta, fontFamily: tema.sans, fontSize: 40, color: "var(--ec-gris)", marginTop: 26 }}>
                {s.etiqueta}
              </div>
            ) : null}
            {/* LA REFERENCIA: contra qué se mide la cifra. El árbol del [DATO]
                elige por la FORMA del dato y nunca pregunta qué lo hace
                noticia, así que un número que es récord y uno rutinario salen
                igual. Esta línea es lo único que los distingue. */}
            {ev.referencia ? (
              <div style={{ ...paso.referencia, alignItems: "center", display: "flex", gap: 14, marginTop: 30 }}>
                <div style={{ backgroundColor: "var(--ec-acento)", height: 3, width: 46 }} />
                <div style={{ fontFamily: tema.serif, fontStyle: "italic", fontSize: N_CIFRA.referencia, color: "var(--ec-tinta)" }}>
                  {ev.referencia}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </Marco>
  );
};

// Antes → después: "17 → 7 buques por día" con la flecha del sentido. Para
// una variación es más claro que barras o comparación (pedido de Santiago, 29-08).
export const TarjetaDatoCambio: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  const s = ev.series ?? [];
  const antes = s[0], despues = s[1];
  if (!antes || !despues) return <TarjetaDatoCifra ev={ev} />;
  const base = Math.max(antes.raw.length, despues.raw.length) > 8 ? N_CAMBIO.valorLargo : N_CAMBIO.valor;
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...st }}>
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: base, lineHeight: 1.05, color: "var(--ec-gris)" }}>{antes.raw}</div>
          <svg viewBox="0 0 100 100" style={{ width: base * 0.5, height: base * 0.5, flexShrink: 0 }}>
            <path d="M10 50 L70 50 M52 30 L72 50 L52 70" fill="none" stroke={"var(--ec-gris)"} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: base, lineHeight: 1.05, color: "var(--ec-tinta)" }}>{despues.raw}</div>
          <Indicador t={despues.tendencia} size={base * 0.55} />
        </div>
        <div style={{ fontFamily: tema.sans, fontSize: 40, color: "var(--ec-gris)", marginTop: 26 }}>{antes.etiqueta}</div>
      </div>
    </Marco>
  );
};

export const TarjetaEsquema: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elems = ev.elementos ?? [];
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...estiloEyebrow, marginBottom: N_ESQUEMA.tituloAbajo }}>{ev.titulo}</div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 26 }}>
        {elems.map((el, i) => {
          const e = spring({ frame: frame - i * 8, fps, config: { damping: 200 } });
          return (
            <React.Fragment key={i}>
              {i > 0 ? (
                <div style={{ fontFamily: tema.mono, fontSize: N_ESQUEMA.flecha, color: "var(--ec-acento)", opacity: e }}>→</div>
              ) : null}
              <div
                style={{
                  opacity: e,
                  transform: `translateY(${interpolate(e, [0, 1], [18, 0])}px)`,
                  backgroundColor: "var(--ec-elevado)",
                  border: `2px solid ${"var(--ec-tinta)"}`,
                  borderRadius: 12,
                  padding: "26px 34px",
                  fontFamily: tema.sans,
                  fontSize: 32,
                  color: "var(--ec-tinta)",
                  maxWidth: 420,
                }}
              >
                {el}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </Marco>
  );
};

// "Y en titulares": hasta 4 frases por tarjeta; la que la voz está leyendo va
// encendida y las demás atenuadas. El barrido se VE avanzar sin cambiar de
// tarjeta a cada frase (16 tarjetas seguidas eran una cola de 2 minutos).
export const TarjetaTitulares: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = ev.from + frame / fps;
  const items = ev.items ?? [];
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuenteSeccion} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
        {items.map((it, i) => {
          const activa = t >= it.from - 0.15 && t < (items[i + 1]?.from ?? 9e9);
          return (
            <div key={i} style={{ display: "flex", gap: 30, alignItems: "flex-start", opacity: activa ? 1 : 0.38, transition: "opacity 120ms" }}>
              <div style={{ width: 10, alignSelf: "stretch", borderRadius: 5, backgroundColor: activa ? "var(--ec-acento)" : "var(--ec-linea)", flexShrink: 0 }} />
              <div style={{ fontFamily: tema.sans, fontSize: N_TITULARES.titular, lineHeight: N_TITULARES.interlinea, color: "var(--ec-tinta)", maxWidth: N_TITULARES.anchoMax }}>{it.texto}</div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const SeccionBanner: React.FC<{ texto: string; categoria?: string | null; fondo?: ModoFondo; claro?: boolean }> =
({ texto, categoria, fondo, claro }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ctx = useContext(FondoTarjetaContext);
  const e = spring({ frame, fps, config: { damping: 200 } });
  const color = colorDeSeccion(texto);
  // El banner es una capa aparte de la tarjeta, así que tiene que preguntar
  // sobre qué va a caer. Sobre imagen toma el color del papel; sobre papel se
  // queda en la tinta. Antes decía var(--ec-tinta), que fuera del Marco no
  // resuelve nada y terminaba en negro: daba igual sobre papel y desaparecía
  // sobre la imagen. El fondo suelto es el de la muestra --comparar, donde la
  // sección cambia de fondo a la mitad.
  // claro lo fuerza desde arriba: es el tramo que cae sobre una tarjeta de
  // dibujo, que arma su cuadro oscuro sin pasar por el modo de fondo y por eso
  // no se puede deducir preguntando acá.
  const oscuro = claro || modoDeFondo(fondo ? { ...ctx, modo: fondo } : ctx, categoria) !== "papel";
  return (
    <div style={{ position: "absolute", top: 64, left: tema.margen }}>
      <div
        style={{
          fontFamily: tema.mono,
          fontSize: 26,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: oscuro ? tema.papel : tema.tinta,
          opacity: e,
        }}
      >
        {texto}
      </div>
      <div style={{ height: 4, width: interpolate(e, [0, 1], [0, 130]), backgroundColor: color, marginTop: 12 }} />
    </div>
  );
};

export const TarjetaMarcador: React.FC<{ ev: Evento }> = ({ ev }) => {
  const st = useEntrada();
  const s = ev.series ?? [];
  const local = s[0], visita = s[1];
  if (!local || !visita) return <TarjetaDatoCifra ev={ev} />;
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ ...st, display: "flex", alignItems: "baseline", gap: 48, flexWrap: "wrap" }}>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: N_MARCADOR.equipo, color: "var(--ec-tinta)" }}>{local.etiqueta}</div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: N_MARCADOR.marcador, color: colorDeSeccion(ev.seccion) }}>
          {local.raw}<span style={{ color: "var(--ec-gris)", padding: "0 22px" }}>-</span>{visita.raw}
        </div>
        <div style={{ fontFamily: tema.serif, fontWeight: 600, fontSize: N_MARCADOR.equipo, color: "var(--ec-tinta)" }}>{visita.etiqueta}</div>
      </div>
    </Marco>
  );
};

export const TarjetaTabla: React.FC<{ ev: Evento }> = ({ ev }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const series = ev.series ?? [];
  return (
    <Marco seccion={ev.seccion} categoria={ev.categoria} abajo={<PieFuente fuente={ev.fuente ?? ev.fuenteSeccion} caption={ev.caption} />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 1000 }}>
        {series.map((s, i) => {
          const e = spring({ frame: frame - i * 6, fps, config: { damping: 200 } });
          const lider = i === 0;
          return (
            <div
              key={i}
              style={{
                opacity: e,
                transform: `translateY(${interpolate(e, [0, 1], [14, 0])}px)`,
                display: "flex",
                alignItems: "center",
                gap: 40,
                padding: "26px 10px",
                borderBottom: i < series.length - 1 ? `2px solid ${"var(--ec-linea)"}` : "none",
              }}
            >
              <div style={{ fontFamily: tema.mono, fontSize: N_TABLA.numero, color: "var(--ec-gris)", width: N_TABLA.anchoNumero }}>{i + 1}</div>
              <div style={{ fontFamily: tema.sans, fontSize: N_TABLA.nombre, fontWeight: lider ? 600 : 400, color: "var(--ec-tinta)", flex: 1 }}>
                {s.etiqueta}
              </div>
              <div style={{ fontFamily: tema.mono, fontSize: N_TABLA.valor, color: lider ? colorDeSeccion(ev.seccion) : "var(--ec-tinta)" }}>
                {s.raw}
              </div>
            </div>
          );
        })}
      </div>
    </Marco>
  );
};

export const TarjetaDato: React.FC<{ ev: Evento }> = ({ ev }) => {
  switch (ev.grafico) {
    case "marcador":
      return <TarjetaMarcador ev={ev} />;
    case "tabla":
      return <TarjetaTabla ev={ev} />;
    case "barras":
      return <TarjetaDatoBarras ev={ev} />;
    case "cambio":
      return <TarjetaDatoCambio ev={ev} />;
    case "comparacion":
    case "lineas": // v1: las líneas caen a comparación; componente propio en v2
      return <TarjetaDatoComparacion ev={ev} />;
    case "cifra":
    default:
      return <TarjetaDatoCifra ev={ev} />;
  }
};

export const Tarjeta: React.FC<{ ev: Evento }> = ({ ev }) => {
  switch (ev.tipo) {
    case "tesis":
      return <TarjetaTesis ev={ev} />;
    case "cita":
      return <TarjetaCita ev={ev} />;
    case "dato":
      return <TarjetaDato ev={ev} />;
    case "esquema":
      return <TarjetaEsquema ev={ev} />;
    case "titulares":
      return <TarjetaTitulares ev={ev} />;
    case "narracion":
    default:
      return <TarjetaParrafo ev={ev} />;
  }
};

// Cortina de sección: 1,1 s a pantalla completa entre bloques, sincronizada con
// la melodía corta. Es lo único del video que no aporta información, así que
// tiene un presupuesto de tiempo duro: si crece, se corta. Sirve para dar aire
// al oído entre temas, no para lucirse.
//
// Requiere que la narración calle ahí. Sin pausa en la voz, esta tarjeta tapa
// contenido hablado y hay que dejarla apagada (ver meta.cortinas en Informe).
export const CortinaSeccion: React.FC<{ texto: string; extracto?: string }> = ({ texto, extracto }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fondos = useFondos();
  const color = colorDeSeccion(texto);
  // Con fondos, la cortina nace opaca: el fotograma exacto del inicio del
  // capítulo es el que YouTube muestra en la tira, y un fundido de 0,14 s lo
  // dejaba transparente (revisión del 02-09). Nadie percibe ese fundido.
  const entrada = fondos.activo ? 1 : interpolate(frame, [0, 0.14 * fps], [0, 1], { extrapolateRight: "clamp" });
  const salida = interpolate(frame, [0.85 * fps, 1.1 * fps], [1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // La línea cruza la pantalla: la transición es el propio trazo, no un efecto.
  const trazo = interpolate(frame, [0.06 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: tema.papel,
        opacity: Math.min(entrada, salida),
        justifyContent: "center",
        paddingLeft: tema.margen,
        paddingRight: tema.margen,
      }}
    >
      {fondos.activo ? <Fondo seccion={texto} fuerza={1.6} extractos={extracto ? [extracto] : []} /> : null}
      <div style={{ height: 6, width: `${trazo * 100}%`, backgroundColor: color, marginBottom: 44, position: "relative" }} />
      <div
        style={{
          fontFamily: tema.serif,
          fontSize: 108,
          fontWeight: 600,
          color: "var(--ec-tinta)",
          lineHeight: 1.02,
          opacity: entrada,
          position: "relative",
        }}
      >
        {texto}
      </div>
    </AbsoluteFill>
  );
};
