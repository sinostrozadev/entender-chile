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
// bloques de texto y de dato, el velo, las curvas, los sonidos del tecleo y
// la cama. El reloj es el mismo (scripts/clave-mural.js), así que voz, texto
// y música se comportan igual que en la Clave; lo nuevo es la cámara y la
// fecha (la tarjeta y la línea de tiempo, más abajo).
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
//   EL CAMBIO DE DÍA SE VE (03-11-2026, pedido de Santiago tras la prueba
//   muda del 02-11-2026: "que se vea el cambio de fecha, para ir siguiendo la
//   cronología"). El fundido entre páginas decía "es otro día" pero no cuál:
//   el rótulo chico de la esquina pasaba en un segundo y nadie lo leía. Ahora
//   hay dos cosas. Una LÍNEA DE TIEMPO fija abajo, con un punto por fecha,
//   que dice en todo momento dónde va el caso y cuánto falta. Y una TARJETA
//   con la fecha grande, sola sobre el velo, en cada cambio de día; después se
//   achica hasta ser el rótulo de la esquina. Es el mismo elemento y no uno
//   nuevo: si la tarjeta desapareciera y el rótulo apareciera, el ojo leería
//   dos fechas distintas. Dentro del mismo día no hay tarjeta, porque no hay
//   fecha nueva que contar.
//
//   EL VELO ES MÁS FUERTE QUE EN EL MURAL (k = 3). El papel del diario es el
//   fondo más claro posible, más que el panel 5 que obligó a medir velos el
//   07-10-2026; con k = 1 la mitad derecha del texto caía sobre gris medio.
import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { tema } from "./tema";
import { Bloque, BloqueDato, BloqueTexto, Velo, suave, viajeSuave } from "./clave-mural";

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
  // (los guiones viejos traen solo alejar, fundido y general: lo que falta
  // sale de PLANOS, abajo)
  planos?: Partial<Planos>;
  // null y no ausente cuando el caso sale sin cama (ver sinCama en
  // scripts/largo-diario.js): ausente, Remotion usaría la del ejemplo
  musica?: string | null;
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
// Las partes de la entrada a una página, en segundos, en el orden en que
// ocurren (el desglose de cada una está en scripts/largo-diario.js, que es
// quien las suma al reloj): alejar la página de ayer, avanzar la línea de
// tiempo, la tarjeta sola, su aterrizaje (con el fundido de la página nueva
// adentro), el plano general con el rótulo ya puesto, y el zoom.
type Planos = { alejarSeg: number; lineaSeg: number; tarjetaSeg: number; aterrizarSeg: number; fundidoSeg: number; generalSeg: number };
const PLANOS: Planos = { alejarSeg: 0.6, lineaSeg: 0.4, tarjetaSeg: 2.5, aterrizarSeg: 0.7, fundidoSeg: 0.5, generalSeg: 0.3 };

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

// "2026-10-30" a "Viernes 30 de octubre", como se dice en Chile. A mano y no
// con toLocaleDateString: el español del navegador pone una coma después del
// día ("viernes, 30 de octubre") y en minúscula, y depende de los datos de
// idioma que traiga el Chromium del render.
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const diaLargo = (f: string) => {
  const [a, m, d] = f.split("-").map(Number);
  return `${DIAS[new Date(Date.UTC(a, m - 1, d)).getUTCDay()]} ${d} de ${MESES[m - 1]}`;
};

// LA TARJETA DE LA FECHA. Se dibuja grande y se achica con transform: el
// rótulo final es esta misma caja a escala ESCALA_ROTULO, así que letra,
// espaciado y placa llegan exactos a las medidas del rótulo de siempre
// (22 px, espaciado 3, placa 22/30/26) sin un cambio de elemento a mitad.
// 76 px y no más: "Miércoles 30 de septiembre", la fecha más larga posible,
// tiene que caber en los 1920 con su placa.
const TARJETA_PX = 76;
const ESCALA_ROTULO = 22 / TARJETA_PX;
// Teclea más rápido que el rótulo de sección (1,5 cuadros por letra contra
// 2,2): "Viernes 30 de octubre" tiene el doble de letras que "30-10-2026", y
// al ritmo del rótulo la pantalla quedaría dos segundos callada antes de que
// la fecha se lea entera. A 16 letras por segundo se sigue viendo el tecleo.
const RITMO_TARJETA = 1.5;
// el rótulo final queda donde estaba: abajo a la izquierda, con el borde de
// la placa a un margen del borde del cuadro. La línea de tiempo vive más
// abajo, en la franja que el margen deja libre, así que no hubo que subirlo.
const ROTULO_X = tema.margen, ROTULO_Y = ALTO - tema.margen;

const TarjetaFecha: React.FC<{ fecha: string; aterrizaEn: number; aterrizaDur: number; opacidad: number }> = ({ fecha, aterrizaEn, aterrizaDur, opacidad }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const texto = diaLargo(fecha);
  const letras = Array.from(texto);
  const inicio = Math.round(fps * 0.25);
  const escritas = Math.max(0, Math.min(letras.length, Math.floor((frame - inicio) / RITMO_TARJETA)));
  // x: 0 la tarjeta al centro, 1 el rótulo en su esquina. Se mueve el punto de
  // anclaje (del centro de la caja a su esquina inferior izquierda) junto con
  // la posición: así no hace falta medir el ancho del texto y no hay salto.
  const x = suave(Math.min(1, Math.max(0, (frame - aterrizaEn) / aterrizaDur)));
  const px = ANCHO / 2 + (ROTULO_X - ANCHO / 2) * x, py = ALTO / 2 + (ROTULO_Y - ALTO / 2) * x;
  const ax = 0.5 * (1 - x), ay = 0.5 + 0.5 * x;
  const s = Math.exp(Math.log(ESCALA_ROTULO) * x);
  const u = 1 / ESCALA_ROTULO; // medidas del rótulo pasadas a la escala grande
  return (
    <AbsoluteFill style={{ opacity: opacidad }}>
      <div style={{
        position: "absolute", left: 0, top: 0, transformOrigin: "0 0", whiteSpace: "nowrap",
        transform: `translate(${px}px, ${py}px) scale(${s}) translate(${-ax * 100}%, ${-ay * 100}%)`,
      }}>
        {/* la placa es invisible sobre el velo y necesaria sobre el papel: es
            la misma del rótulo, y por eso aterriza con la tarjeta */}
        <div style={{ backgroundColor: "rgba(10,12,16,0.88)", padding: `${22 * u}px ${30 * u}px ${26 * u}px`, borderRadius: 4 * u,
          fontFamily: tema.mono, fontSize: TARJETA_PX, letterSpacing: 3 * u, lineHeight: 1.3, color: tema.papel }}>
          {letras.slice(0, escritas).join("")}
          {/* lo que falta se escribe invisible: la caja tiene desde el primer
              cuadro su ancho final y la fecha crece hacia la derecha, en vez
              de correrse hacia la izquierda con cada letra */}
          <span style={{ position: "relative" }}>
            {escritas < letras.length && frame > inicio ? <span style={{ position: "absolute", left: 0, opacity: 0.55 }}>_</span> : null}
            <span style={{ visibility: "hidden" }}>{letras.slice(escritas).join("")}</span>
          </span>
        </div>
        {/* el año, chico debajo, se va antes de aterrizar: el rótulo de la
            esquina no lo necesita (la línea de tiempo y la tarjeta ya lo
            dijeron) y a esa escala sería ilegible. Va fuera de la caja para
            que su alto no corra el anclaje. */}
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, textAlign: "center", marginTop: 18,
          fontFamily: tema.mono, fontSize: 30, letterSpacing: 8, color: tema.papel,
          opacity: 0.55 * (1 - Math.min(1, x * 2)) * (escritas >= letras.length ? 1 : 0) }}>
          {fecha.slice(0, 4)}
        </div>
      </div>
      {letras.map((c, i) =>
        c === " " ? null : (
          <Sequence key={i} from={inicio + Math.round(i * RITMO_TARJETA)} durationInFrames={4}>
            <Audio src={staticFile(`sonidos/tecla-${(i % 3) + 1}.wav`)} volume={0.5} />
          </Sequence>
        )
      )}
    </AbsoluteFill>
  );
};

// LA LÍNEA DE TIEMPO. Un punto por fecha distinta del guion, en orden. `pos`
// es el punto en curso y puede ser fraccionario: es lo que la anima entre dos
// días. Cada punto mezcla su estado de fondo (pasado: relleno y atenuado;
// futuro: hueco) con el encendido, según qué tan cerca está `pos`, así el
// paso de un día al siguiente es un solo movimiento continuo.
// Va en una placa oscura porque se dibuja sobre el papel tanto como sobre el
// velo, y centrada abajo, en el margen inferior que ni el texto narrado ni la
// cifra del dato ocupan (los dos terminan a un margen del borde).
const LineaTiempo: React.FC<{ fechas: string[]; pos: number }> = ({ fechas, pos }) => {
  const n = fechas.length;
  const paso = n > 1 ? Math.min(150, 1300 / (n - 1)) : 0;
  const ancho = paso * (n - 1);
  const papel = (a: number) => `rgba(242,242,239,${a})`;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 26, pointerEvents: "none" }}>
      <div style={{ backgroundColor: "rgba(10,12,16,0.78)", borderRadius: 6, padding: "16px 44px 12px" }}>
        <div style={{ position: "relative", width: ancho, height: 46 }}>
          <div style={{ position: "absolute", left: 0, top: 10, width: ancho, height: 2, backgroundColor: papel(0.25) }} />
          <div style={{ position: "absolute", left: 0, top: 10, width: paso * Math.max(0, Math.min(n - 1, pos)), height: 2, backgroundColor: papel(0.55) }} />
          {fechas.map((f, k) => {
            const e = Math.max(0, 1 - Math.abs(pos - k));
            const pasado = k < pos;
            const d = 12 + 6 * e;
            return (
              <div key={f} style={{ position: "absolute", left: paso * k, top: 0 }}>
                <div style={{ position: "absolute", left: -d / 2, top: 11 - d / 2, width: d, height: d, borderRadius: "50%", boxSizing: "border-box",
                  backgroundColor: pasado ? papel(0.45 * (1 - e)) : "transparent", border: `2px solid ${papel(0.45 * (1 - e))}` }} />
                <div style={{ position: "absolute", left: -d / 2, top: 11 - d / 2, width: d, height: d, borderRadius: "50%",
                  backgroundColor: tema.patina, opacity: e, boxShadow: `0 0 0 4px rgba(47,114,99,0.45)` }} />
                <div style={{ position: "absolute", top: 26, left: -40, width: 80, textAlign: "center",
                  fontFamily: tema.mono, fontSize: 15, letterSpacing: 2, color: papel(0.5 + 0.5 * e) }}>
                  {f.slice(8, 10)}-{f.slice(5, 7)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const LargoDiario: React.FC<GuionDiario> = ({ bloques, paginas, viajeSeg, planos, musica, voz, musicaDb }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const P: Planos = { ...PLANOS, ...(planos ?? {}) };

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
  const conTarjeta = tipo === "cambio" || tipo === "primera";

  const f = (seg: number) => Math.round(seg * fps);
  const fA = f(P.alejarSeg), fL = f(P.lineaSeg), fT = f(P.tarjetaSeg), fD = f(P.aterrizarSeg), fF = f(P.fundidoSeg), fG = f(P.generalSeg);
  const fV = f(viajeSeg ?? 1.5);
  // los hitos de la entrada, contados desde que abre la sección; la primera
  // página del video no tiene página de ayer que alejar ni línea que avanzar
  const inicioTarjeta = tipo === "cambio" ? fA + fL : 0;
  const inicioAterrizaje = inicioTarjeta + fT;
  const inicioZoom = inicioAterrizaje + fD + fG;

  let capas: React.ReactNode = null;
  let velo = 1;
  // la cortina es el velo de pantalla completa sobre el que la tarjeta queda
  // sola: sube mientras la página de ayer se aleja y baja cuando entra la nueva
  let cortina = 0;
  if (enEscena && conTarjeta) {
    if (tipo === "cambio" && anterior && t < fA) {
      // a. la página de ayer suelta la noticia, se aleja y se funde al velo
      const zA = zoom(anterior);
      const x = suave(t / fA);
      capas = <Pagina p={anterior} cam={entre(zA, alejada(zA), x)} />;
      velo = 1 - x;
      cortina = x;
    } else if (t < inicioAterrizaje) {
      // b y c. la línea avanza y la fecha se teclea sola: no hay página que
      // dibujar debajo de un velo opaco
      capas = <></>;
      velo = 0;
      cortina = 1;
    } else if (t < inicioZoom) {
      // d. la página nueva entra en plano general mientras la tarjeta aterriza
      capas = <Pagina p={pagina} cam={general(pagina)} />;
      velo = 0;
      cortina = 1 - suave(Math.min(1, (t - inicioAterrizaje) / fF));
    } else {
      // e. el zoom a la noticia, como siempre
      const x = Math.min(1, (t - inicioZoom) / fV);
      capas = <Pagina p={pagina} cam={entre(general(pagina), zoom(pagina), viajeSuave(x))} />;
      velo = suave(x);
    }
  } else if (enEscena && tipo === "viaje" && anterior) {
    // otra noticia del mismo día: un viaje corto, sin tarjeta ni línea
    const x = Math.min(1, t / fV);
    capas = <Pagina p={pagina} cam={entre(zoom(anterior), zoom(pagina), viajeSuave(x))} />;
  }

  // dónde va la línea de tiempo: en el día de la página, salvo en el paso b
  // de un cambio de día, donde avanza del día de ayer al de hoy
  const fechas = [...new Set(paginas.map((p) => p.fecha))].sort();
  const pos = (() => {
    const hoy = fechas.indexOf(pagina.fecha);
    if (!(enEscena && tipo === "cambio" && anterior)) return hoy;
    const ayer = fechas.indexOf(anterior.fecha);
    if (t < fA) return ayer;
    return ayer + (hoy - ayer) * suave(Math.min(1, (t - fA) / fL));
  })();

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
      {/* la cama corre de punta a punta, como en el mural; sin cama (el
          archivo sin-cama.txt del caso) el largo sale en silencio parejo */}
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
      {/* EL DATO APAGA MÁS EL PAPEL QUE EL MURAL (0,85 contra 0,55). Un panel
          del mural es dibujo; la página es texto, y con 0,55 las líneas de la
          página seguían legibles detrás de la etiqueta en pátina, que quedaba
          leyéndose encima de otra letra (still 3 de la prueba, 02-11-2026).
          Así la página queda como textura y la cifra se lee sola. */}
      <AbsoluteFill style={{ backgroundColor: "rgba(10,12,16,0.85)", opacity: apagado }} />
      {cortina > 0 ? <AbsoluteFill style={{ backgroundColor: "rgb(10,12,16)", opacity: cortina }} /> : null}
      {abreSeccion && conTarjeta ? (
        // LA FECHA: tarjeta grande que aterriza como rótulo (ver TarjetaFecha).
        // La fecha es, como el nombre de la sección, algo que la voz no dice
        // en ese momento, por eso puede teclearse con sonido.
        <Sequence from={desde + inicioTarjeta} durationInFrames={Math.max(1, inicioZoom - inicioTarjeta + Math.round(fps * 0.3))}>
          <TarjetaFecha fecha={pagina.fecha} aterrizaEn={fT} aterrizaDur={fD} opacidad={salidaFecha} />
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
      {/* encima de todo, también del dato: la cronología no se pierde nunca */}
      <LineaTiempo fechas={fechas} pos={pos} />
    </AbsoluteFill>
  );
};
