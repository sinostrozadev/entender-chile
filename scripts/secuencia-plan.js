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
// Lo mínimo que tiene sentido: por debajo de esto el título no alcanza a
// leerse y es mejor que la sección entre directamente oscura, sin cabecera.
const PREAMBULO_MIN = 1.6;

// El recorrido entre sección y sección y la presentación, en segundos.
const PASEO_SEG = 2.5;         // "pausa de 2,5 s entre secciones", aprobado el 24-09
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
  const tarjetas = (tl.eventos || []).filter((e) => !e.overlay && !e.soporte);
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
    const techo = opciones.holgado ? previo : (silencio > 0 ? Math.min(silencio, 2.4) + 2 : 0);
    const viaje = Math.min(previo, techo, Math.max(0, b.hasta - b.desde - PREAMBULO_MIN));
    const desde = b.desde + viaje;
    if (viaje > 0.2) {
      paseos.push({ from: Number(b.desde.toFixed(3)), dur: Number(viaje.toFixed(3)),
        desde: i - 1, hasta: i, ...(i === 1 ? { presentacion: true } : {}) });
    }
    // la cabecera solo puede ocupar el aire que hay antes de la primera
    // tarjeta de la sección: los tiempos de las tarjetas no se tocan
    const dela = tarjetas.filter((c) => c.seccion === b.ov.texto);
    const primera = dela.length ? Math.min(...dela.map((c) => c.from)) : b.hasta;
    const aire = opciones.holgado ? PREAMBULO_SEG : Math.max(0, primera - desde);
    const cabecera = i > 0 && aire >= PREAMBULO_MIN;
    const p = cabecera ? Math.min(aire, PREAMBULO_SEG) / PREAMBULO_SEG : 0;
    bloques.push({
      texto: b.ov.texto || "",
      categoria: b.ov.categoria || null,
      imagen: i === 0 ? portada : imagenDeSeccion(tl, b.ov.categoria),
      from: Number(desde.toFixed(3)),
      to: Number(Math.max(desde + 0.5, b.hasta).toFixed(3)),
      ...(cabecera ? {
        titulo: b.ov.texto || "",
        // el barrido de la mitad al final, en segundos desde el inicio del
        // bloque; si hubo que encoger la cabecera, encoge proporcional
        lleno: [Number((TITULO_SEG * p).toFixed(3)), Number(((TITULO_SEG + BARRIDO_SEG) * p).toFixed(3))],
      } : {}),
    });
  });

  return { ...(portada ? { portada, portadaSeg } : {}), baldosas, bloques, paseos };
};

module.exports = { planear, PREAMBULO_SEG, PASEO_SEG, PRESENTACION_SEG };
