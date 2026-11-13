import React, { useMemo } from 'react';
import { Easing, interpolate, spring } from 'remotion';
import { geoBounds, geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { PALETA, SERIES_GRAFICO, TIPO } from '../../../marca/tokens';
import type { VisualChile } from '../visual';
import topo from '../../../../public/geo/regiones-chile.topo.json';

type Region = Feature<Geometry, { codigo: string; nombre: string }>;
const REGIONES: Region[] = (feature(topo as unknown as Topology, (topo as unknown as Topology).objects.Regional as GeometryCollection) as unknown as FeatureCollection<Geometry, { codigo: string; nombre: string }>).features;
/** Chile continental (sin Isla de Pascua ni Juan Fernández, que estiran el encuadre hacia el Pacífico). */
const CONTINENTAL: [[number, number], [number, number]] = [[-76.5, -56.2], [-66.2, -17.4]];
const nombreCorto = (n: string) => n.replace(/^Región (de |del )?/, '').replace(/^Metropolitana.*/, 'Metropolitana');
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const colorDe = (k: number) => (k === 0 ? PALETA.dorado : SERIES_GRAFICO[(k - 1) % SERIES_GRAFICO.length]);

/**
 * Mapa de Chile por regiones para el Short (9:16, alto) y el largo. Chile cabe entero a lo alto en el frame 0 y la
 * cámara se acerca a lo destacado en 2,2 s con easing; mientras tanto el contorno ya se está dibujando. Los alfileres
 * caen con un resorte cuando llega su `dice` (`puntosFrame`, frames locales). Crédito BCN abajo a la derecha.
 */
export const MapaChile: React.FC<{ v: VisualChile; ancho: number; alto: number; frame: number; fps: number; puntosFrame?: (number | undefined)[] }> = ({ v, ancho, alto, frame, fps, puntosFrame = [] }) => {
  const destacadas = v.regiones ?? [];
  const objetivo = useMemo(() => {
    const feats = REGIONES.filter((r) => destacadas.includes(r.properties.codigo as never));
    const pts = (v.puntos ?? []).map((p) => p.en);
    if (!feats.length && !pts.length) return CONTINENTAL;
    let [[x0, y0], [x1, y1]] = feats.length ? geoBounds({ type: 'FeatureCollection', features: feats } as FeatureCollection) : [[pts[0][0], pts[0][1]], [pts[0][0], pts[0][1]]];
    for (const [x, y] of pts) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    // Mínimo de encuadre (una comuna sola no se ve a 0,05°) y margen.
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    const dx = Math.max(1.2, (x1 - x0) * 1.35) / 2, dy = Math.max(1.6, (y1 - y0) * 1.35) / 2;
    return [[cx - dx, cy - dy], [cx + dx, cy + dy]] as [[number, number], [number, number]];
  }, [destacadas.join(','), JSON.stringify(v.puntos ?? [])]);
  const acercar = v.acercar !== false && objetivo !== CONTINENTAL;
  const p = acercar ? interpolate(frame, [0.15 * fps, 2.4 * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic) }) : 0;
  const mezcla = (a: number, b: number) => a + (b - a) * p;
  const caja: [[number, number], [number, number]] = [[mezcla(CONTINENTAL[0][0], objetivo[0][0]), mezcla(CONTINENTAL[0][1], objetivo[0][1])], [mezcla(CONTINENTAL[1][0], objetivo[1][0]), mezcla(CONTINENTAL[1][1], objetivo[1][1])]];
  const t = frame / fps;
  // Deriva lenta: nada queda quieto aunque no haya acercamiento.
  const deriva = 1 + 0.015 * Math.sin(t / 2.1);
  const pie = 44;
  const proy = geoMercator().fitExtent([[24, 24 + (v.titulo ? 70 : 0)], [ancho - 24, alto - pie - 12]], { type: 'MultiPoint', coordinates: [caja[0], caja[1], [caja[0][0], caja[1][1]], [caja[1][0], caja[0][1]]] } as never);
  proy.scale(proy.scale() * deriva);
  const ruta = geoPath(proy);
  const dibujo = clamp01(frame / (0.9 * fps));
  return (
    <div style={{ position: 'relative', width: ancho, height: alto }}>
      <svg width={ancho} height={alto} style={{ position: 'absolute', inset: 0 }}>
        <rect x={0} y={0} width={ancho} height={alto} fill="#0B1524" rx={18} />
        {REGIONES.map((r) => {
          const k = destacadas.indexOf(r.properties.codigo as never);
          const enc = k >= 0 ? clamp01((frame - (0.4 + 0.25 * k) * fps) / (0.5 * fps)) : 0;
          return (
            <path key={r.properties.codigo} d={ruta(r) ?? ''} fill={k >= 0 ? colorDe(k) : '#24364F'} fillOpacity={k >= 0 ? 0.35 + 0.55 * enc : 0.9}
              stroke={k >= 0 ? colorDe(k) : '#4A6283'} strokeWidth={k >= 0 ? 3 : 1.3} strokeOpacity={0.4 + 0.6 * dibujo} />
          );
        })}
        {REGIONES.filter((r) => destacadas.includes(r.properties.codigo as never)).map((r) => {
          const [x, y] = ruta.centroid(r);
          if (!Number.isFinite(x) || x < 0 || x > ancho || y < 0 || y > alto) return null;
          const k = destacadas.indexOf(r.properties.codigo as never);
          const vis = clamp01((frame - (0.8 + 0.25 * k) * fps) / (0.4 * fps));
          return (
            <text key={`n${r.properties.codigo}`} x={x} y={y} textAnchor="middle" fontSize={40} opacity={vis}
              style={{ fontFamily: TIPO.texto, fontWeight: 800, paintOrder: 'stroke' }} stroke="#0B1524" strokeWidth={8} fill={PALETA.tinta}>
              {nombreCorto(r.properties.nombre)}
            </text>
          );
        })}
        {(v.puntos ?? []).map((pt, k) => {
          const f0 = puntosFrame[k] ?? Math.round((1 + 0.6 * k) * fps);
          const s = spring({ frame: frame - f0, fps, config: { damping: 11, stiffness: 160 } });
          if (frame < f0) return null;
          const xy = proy(pt.en as [number, number]);
          if (!xy) return null;
          const [x, y] = xy;
          const izquierda = x > ancho * 0.6;
          return (
            <g key={`p${k}`} transform={`translate(${x},${y - (1 - s) * 60})`} opacity={s}>
              <circle r={18} fill={PALETA.rojo} stroke="#fff" strokeWidth={4} />
              <circle r={18 + 22 * clamp01((frame - f0) / (0.8 * fps))} fill="none" stroke={PALETA.rojo} strokeWidth={3} opacity={1 - clamp01((frame - f0) / (0.8 * fps))} />
              <text x={izquierda ? -30 : 30} y={12} textAnchor={izquierda ? 'end' : 'start'} fontSize={36}
                style={{ fontFamily: TIPO.texto, fontWeight: 800, paintOrder: 'stroke' }} stroke="#0B1524" strokeWidth={8} fill={PALETA.tinta}>{pt.texto}</text>
            </g>
          );
        })}
      </svg>
      {v.titulo && (
        <div style={{ position: 'absolute', left: 28, top: 22, right: 28, fontFamily: TIPO.texto, fontWeight: 800, fontSize: 46, color: PALETA.tinta }}>{v.titulo}</div>
      )}
      <div style={{ position: 'absolute', right: 20, bottom: 8, fontFamily: TIPO.texto, fontWeight: 600, fontSize: 26, color: PALETA.tintaSuave }}>Límites: BCN</div>
    </div>
  );
};
