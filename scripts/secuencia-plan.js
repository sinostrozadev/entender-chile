#!/usr/bin/env node
/**
 * secuencia-plan.js - Los TIEMPOS de la secuencia del 24-09-2026.
 *
 * Por qué está separado del video (27-09-2026): src/secuencia.tsx dibuja, esto
 * decide cuándo. Así los tiempos se pueden leer en el JSON del timeline y
 * discutir sin rendir nada, que es como ya funciona el resto del pipeline
 * (build-timeline planifica, Remotion pinta). Y así la muestra corta y el
 * informe completo usan EL MISMO plan, en vez de dos cálculos que se separan.
 *
 * Lo que arma, en este orden (bitacora/taller/VISUAL.md, 3b):
 *   1. la portada con la ilustración del día;
 *   2. la noticia principal completa sobre esa misma imagen, SIN cabecera
 *      (Santiago, 24-09: "la principal, no la quiero con cabecera, esa abre");
 *   3. el mosaico como PRESENTACIÓN, recién después de la principal;
 *   4. el recorrido: cada sección con su imagen toda la sección, y el viaje
 *      de la cámara entre una y otra.
 *
 * LA REGLA QUE NO SE PUEDE ROMPER: el plan no mueve ni un evento. Los tiempos
 * de las tarjetas los fija la voz y acá solo se leen. Por eso la cabecera de
 * cada sección se recorta a lo que haya entre el inicio del bloque y su
 * primera tarjeta: si la narración no deja aire, la cabecera dura menos, pero
 * jamás tapa lo que se está diciendo. Quien quiera cabeceras completas tiene
 * que pedirle pausas a la voz, no robárselas al texto.
 */

// El preámbulo COMPLETO de una sección con cabecera, en segundos, tal como
// quedó en el banco (src/taller-secuencia.tsx, cuadros a 24): el título se
// muestra hasta 3,83 s, el barrido de la mitad al final va de 3,83 a 5,5 y la
// primera tarjeta entra en 5,83.
const TITULO_SEG = 3.83;
const BARRIDO_SEG = 1.67;
const AIRE_SEG = 0.33;
const PREAMBULO_SEG = TITULO_SEG + BARRIDO_SEG + AIRE_SEG;
// SIEMPRE HAY TÍTULO (27-09-2026, Santiago: "dejemos siempre el título").
// Antes la cabecera se saltaba cuando la voz no dejaba 1,6 s de aire, y el
// resultado era que unas secciones se presentaban y otras no, sin que el
// espectador pudiera saber por qué. En el informe del 27-09 no la llevó
// NINGUNA. Ahora va siempre, y cuando el aire no alcanza se encoge.
//
// Lo que no se puede hacer es moverle el tiempo a la voz, así que una cabecera
// encogida se superpone al comienzo de la primera tarjeta. Por eso quedó
// pedido que la voz LEA el título de la sección: eso es lo único que crea aire
// de verdad, y es la prueba que Santiago dejó para el final.
// DE DÓNDE SALE EL TIEMPO DEL TÍTULO. No de las tarjetas: los tiempos de la
// voz no se tocan, esa es la regla de este archivo. Sale del VIAJE DE LA
// CÁMARA, que hasta hoy se quedaba con todo el silencio del corte y le dejaba
// a la cabecera las sobras. Por eso el informe del 27-09-2026 no tuvo ninguna:
// no porque no hubiera silencio, sino porque se lo gastaba entero el
// recorrido. Ahora el silencio se reparte y la cabecera cobra primero.
//
// Consecuencia buscada: el preámbulo nunca puede pasarse del aire que tiene,
// así que el título JAMÁS se superpone a la primera tarjeta. Si un corte trae
// poco silencio, el título dura poco; lo que no hace nunca es comerse el
// texto. Que dure lo que debe depende de que el silencio exista, y eso es lo
// que va a resolver que la voz LEA el título, la prueba que quedó para el
// final.
const RESERVA_CABECERA = 0.55;  // del silencio del corte, antes que la cámara
// Lo que el viaje conserva pase lo que pase: por debajo de esto el recorrido
// deja de leerse como un viaje y la presentación del canal desaparece.
const VIAJE_MIN = 1.2;
// Lo mínimo para que un título se vea como título y no como un parpadeo.
const CABECERA_MIN = 0.5;
// Lo minimo que un titular se queda en pantalla (Santiago, 27-09: "tiene que
// tener por lo menos 1 s el titular de minimo en vista, se ve mal que aparezca
// y desaparezca rapido").
const TITULO_MIN = 1.0;
// Y este sigue siendo un mínimo real, pero para OTRA cosa: lo que el viaje de
// la cámara no puede comerse del bloque. Un bloque sin nada de preámbulo
// entraría con el texto ya encima.
const PREAMBULO_MIN = 1.6;

// El recorrido entre sección y sección y la presentación, en segundos.
// 4 s desde el 27-09-2026: con 2,5 el viaje de ida y vuelta no se alcanzaba a
// leer como un viaje. Igual no manda este número, manda el silencio real de la
// voz (PAUSA_SECCION_MS en tts-azure.js), que es el techo.
const PASEO_SEG = 4.0;
const PRESENTACION_SEG = 10;   // el intro del banco: alejarse, recorrer la fila y entrar

const imagenDeSeccion = (tl, categoria) => {
  const dir = tl.meta.seccionesDir || "secciones";
  const n = categoria && (tl.meta.secciones || []).find((x) => x.startsWith(`${categoria}.`));
  return n ? `${dir}/${n}` : null;
};

/**
 * @param tl        timeline completo (ya con sus tiempos definitivos)
 * @param opciones  { portada, portadaSeg, paseoSeg, presentacionSeg, holgado }
 *                  holgado = la muestra manda: los tiempos ya vienen hechos a
 *                  la medida y la cabecera puede ocupar su preámbulo entero.
 * @returns el plan para meta.secuencia, o null si esta edición no da (hace
 *          falta al menos una sección después de la principal).
 */
const planear = (tl, opciones = {}) => {
  const overlays = (tl.eventos || []).filter((e) => e.overlay);
  if (overlays.length < 2) return null;
  const tarjetas = (tl.eventos || []).filter((e) => !e.overlay && !e.soporte && !e.muda);
  const portada = opciones.portada || tl.meta.portada || tl.meta.caratula || null;
  const portadaSeg = portada ? (opciones.portadaSeg ?? tl.meta.portadaSeg ?? 3.5) : 0;
  const paseoSeg = opciones.paseoSeg ?? PASEO_SEG;
  const presentacionSeg = opciones.presentacionSeg ?? PRESENTACION_SEG;
  const fin = tl.meta.duracionSeg;

  // la fila del mosaico: una baldosa por sección del día, en el orden del
  // guion. La primera es la principal y lleva la ilustración del día, que es
  // lo que hace que el mosaico salga de lo que estábamos mirando y no de la
  // nada.
  const baldosas = overlays.map((ov, i) => ({
    texto: ov.texto || "",
    categoria: ov.categoria || null,
    imagen: i === 0 ? portada : imagenDeSeccion(tl, ov.categoria),
  }));

  // los bordes de cada bloque: de su overlay al siguiente. El primero arranca
  // cuando termina la portada, no en cero, o la portada taparía su cabecera.
  const bordes = overlays.map((ov, i) => ({
    ov,
    desde: i === 0 ? Math.max(portadaSeg, ov.from) : ov.from,
    hasta: i + 1 < overlays.length ? overlays[i + 1].from : fin,
  }));

  // El mosaico de presentación se come el comienzo del segundo bloque: es el
  // índice, y va DESPUÉS de la principal. Los recorridos hacen lo mismo, más
  // corto, en cada sección siguiente.
  const paseos = [];
  const bloques = [];
  bordes.forEach((b, i) => {
    const previo = i === 0 ? 0 : (i === 1 ? presentacionSeg : paseoSeg);
    // EL VIAJE NO PUEDE TAPAR VOZ. Sale del comienzo de este bloque, nunca del
    // final del anterior (un bloque no puede empezar antes de que la cámara
    // termine de llegar), y dura lo que dura el silencio real de ese corte más
    // el segundo de anticipo y el de cola que ya usa el mosaico de hoy: la
    // última frase del bloque anterior ya se leyó y la nueva todavía no
    // empieza. En la muestra los tiempos son de mentira y se hicieron a la
    // medida, así que ahí el viaje va entero.
    const silencio = Number(b.ov.pausaDur || 0);
    // LA CAMARA VIAJA EN EL SILENCIO Y NADA MAS (27-09-2026). Antes se tomaba
    // el silencio mas dos segundos de anticipo y cola, o sea se metia encima de
    // la voz, y por eso al titular no le quedaba tiempo ni para decirse. Ahora
    // el reparto es limpio y es el que dicto Santiago: la camara va y vuelve
    // mientras nadie habla, y cuando llega empieza a leerse el titular.
    const techo = opciones.holgado ? previo : silencio;
    // el hueco entero del corte: desde que termina la sección anterior hasta
    // que se dice la primera frase de esta. Es lo único que hay para repartir.
    const suyas = tarjetas.filter((c) => c.seccion === b.ov.texto);
    const primeraAbs = suyas.length ? Math.min(...suyas.map((c) => c.from)) : b.hasta;
    const hueco = Math.max(0, primeraAbs - b.desde);
    // ...pero sin dejar al viaje en nada. El 27-09-2026 la primera versión de
    // este reparto dejó la PRESENTACIÓN (el intro del canal, 10 s) en medio
    // segundo, y de paso hizo caer el render por el rango del sello. El viaje
    // conserva VIAJE_MIN antes de que la cabecera cobre.
    // La PRESENTACIÓN no paga: es el intro del canal, pasa una vez y ya venía
    // acotada por el silencio real. Quitarle tiempo para la cabecera de la
    // segunda sección es cambiar algo que funciona por algo que se repite
    // catorce veces más adelante.
    // Lo que no es silencio es del titular: ahi se lo esta diciendo.
    const paraCabecera = opciones.holgado || i === 1 ? 0 : Math.max(0, hueco - silencio);
    // En la muestra (holgado) los tiempos ya vienen hechos a la medida y el
    // viaje va entero: repartir ahí sería recortar dos veces.
    const topes = [previo, techo, Math.max(0, b.hasta - b.desde - PREAMBULO_MIN)];
    if (!opciones.holgado) topes.push(Math.max(0, hueco - paraCabecera));
    const viaje = Math.min(...topes);
    const desde = b.desde + viaje;
    if (viaje > 0.2) {
      paseos.push({ from: Number(b.desde.toFixed(3)), dur: Number(viaje.toFixed(3)),
        desde: i - 1, hasta: i, ...(i === 1 ? { presentacion: true } : {}) });
    }
    // la cabecera ocupa el aire que quedó después del viaje, y nada más
    const aire = opciones.holgado ? PREAMBULO_SEG : Math.max(0, primeraAbs - desde);
    // ...pero una cabecera de dos cuadros no es un título, es un parpadeo, y
    // además produce un rango degenerado ([0,0]) que el 27-09-2026 mató el
    // render en el cuadro 308. Bajo este mínimo la sección entra ya oscura,
    // sin título. Es el gate viejo, pero en 0,5 s en vez de 1,6: con el
    // reparto del silencio, la cabecera ya casi siempre lo supera.
    const cabecera = i > 0 && aire >= CABECERA_MIN;

    // EL BARRIDO ESPERA A QUE TERMINE DE LEERSE EL TITULAR (27-09-2026,
    // Santiago: "desde el momento en que venga de vuelta la seccion puede
    // empezar a leer el titular. Al terminar de leer el titular, el texto del
    // titular se desvanece y se agranda lo oscurecido").
    //
    // Antes el titulo duraba un tiempo fijo, 3,83 s encogidos a lo que hubiera,
    // y el barrido salia cuando le tocaba: la voz y la imagen iban cada una por
    // su lado. Ahora manda el locutor. La entrada hablada existe en el timeline
    // (muda: true) justo para esto: el instante en que termina de decirse el
    // titular es donde empieza el barrido. Y nunca menos de TITULO_MIN en
    // pantalla: un titular que aparece y desaparece se ve peor que no ponerlo.
    const dicha = (tl.eventos || []).find((e) => e.muda && e.seccion === b.ov.texto);
    const leido = dicha ? Math.max(TITULO_MIN, dicha.to - desde) : TITULO_SEG;
    bloques.push({
      texto: b.ov.texto || "",
      categoria: b.ov.categoria || null,
      imagen: i === 0 ? portada : imagenDeSeccion(tl, b.ov.categoria),
      from: Number(desde.toFixed(3)),
      to: Number(Math.max(desde + 0.5, b.hasta).toFixed(3)),
      ...(cabecera ? {
        titulo: b.ov.texto || "",
        // el barrido, en segundos desde el inicio del bloque: arranca cuando se
        // termino de decir el titular y no puede pasarse del aire que hay (si
        // se pasara, taparia la primera tarjeta)
        // El barrido arranca cuando se termino de decir el titular, punto. NO se
        // lo acota al aire: oscurecer el fondo no tapa nada, porque la tarjeta
        // se dibuja encima, asi que puede terminar de agrandarse sobre la
        // entrada de la primera tarjeta. Acotarlo era lo que lo hacia empezar
        // antes de que el locutor terminara la frase.
        lleno: (() => {
          const ini = opciones.holgado ? TITULO_SEG : Math.max(TITULO_MIN, leido);
          return [Number(ini.toFixed(3)), Number((ini + BARRIDO_SEG).toFixed(3))];
        })(),
      } : {}),
    });
  });

  // EL FONDO DEL MOSAICO (27-09-2026). Se elige con la variable FONDO_MOSAICO
  // para poder comparar las dos que hizo Santiago sin tocar codigo: "aire" es
  // la atmosfera abstracta y "sala" es el salon con el nombre del canal en el
  // muro. Vacio = el negro liso de siempre.
  const cual = (process.env.FONDO_MOSAICO || "").trim().toLowerCase();
  const fondo = cual && cual !== "0" ? `fondos/mosaico-${cual}.png` : null;
  return { ...(portada ? { portada, portadaSeg } : {}), ...(fondo ? { fondo } : {}), baldosas, bloques, paseos };
};

module.exports = { planear, PREAMBULO_SEG, PASEO_SEG, PRESENTACION_SEG };
