/**
 * AfricaMap.jsx
 * ─────────────────────────────────────────────────────────────────
 * Marketing-page Africa presence map.
 *
 * Architecture:
 *   • D3 (geoMercator + geoPath) for all geographic math only
 *   • React renders the SVG — no direct DOM mutations
 *   • All country data lives in countryData.js
 *   • All styles are isolated in AfricaMap.module.css
 *
 * Fake-3D depth effect:
 *   • N offset copies of each country path (dark fill) = extruded sides
 *   • Top face rendered last in the correct color
 *   • CSS drop-shadow on the whole group for ambient depth
 *
 * Props:
 *   countries      {Array}   override DEFAULT_COUNTRIES
 *   width          {number}  SVG logical width  (default 760)
 *   height         {number}  SVG logical height (default 820)
 *   extrusionDepth {number}  fake-3D depth steps (default 5)
 *   showLegend     {bool}    show bottom-left legend
 *   onCountryClick {fn}      (countryConfig) => void
 *   onCountryHover {fn}      (countryConfig | null) => void
 *
 * Dependencies:
 *   npm install d3 topojson-client
 */

import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import styles from './AfricaMap.module.css';
import CountryModal from './CountryModal';
import {
  DEFAULT_COUNTRIES,
  AFRICA_NUMERIC_IDS,
  COLOR_PRESETS,
} from './countryData';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOPO_URL =
  'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const DEFAULT_WIDTH  = 760;
const DEFAULT_HEIGHT = 820;

// Extrusion: each step shifts by this many SVG units diagonally
const EXTRUSION_STEP_X = 1.2;
const EXTRUSION_STEP_Y = 2.0;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Darken a hex color by multiplying each channel by `factor` (0–1) */
function darkenHex(hex, factor = 0.4) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.round(((n >> 16) & 0xff) * factor);
  const g = Math.round(((n >>  8) & 0xff) * factor);
  const b = Math.round(( n        & 0xff) * factor);
  return `rgb(${r},${g},${b})`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single connector line + dot + label for one labelled country */
function CountryLabel({ config, px, py, isHovered }) {
  const lx = px + config.labelOffset[0];
  const ly = py + config.labelOffset[1];

  return (
    <g className={styles.labelGroup}>
      {/* Connector line */}
      <line
        x1={px}
        y1={py}
        x2={lx}
        y2={ly}
        className={`${styles.connector} ${isHovered ? styles.connectorActive : ''}`}
        stroke={config.color}
      />

      {/* Anchor dot on the country surface */}
      <circle
        cx={px}
        cy={py}
        r={isHovered ? 3.8 : 2.6}
        fill={config.color}
        className={styles.anchorDot}
      />

      {/* Tick mark at label end */}
      <circle
        cx={lx}
        cy={ly}
        r={1.4}
        fill={config.color}
        opacity={isHovered ? 1 : 0.7}
      />

      {/* Country name */}
      <text
        x={config.labelAnchor === 'end' ? lx - 5 : lx + 5}
        y={ly}
        textAnchor={config.labelAnchor}
        dominantBaseline="middle"
        className={`
          ${styles.label}
          ${config.status === 'expansion' ? styles.labelExpansion : styles.labelPresence}
          ${isHovered ? styles.labelHovered : ''}
        `}
      >
        {config.name}
      </text>
    </g>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AfricaMap({
  countries      = DEFAULT_COUNTRIES,
  width          = DEFAULT_WIDTH,
  height         = DEFAULT_HEIGHT,
  extrusionDepth = 5,
  showLegend     = true,
  onCountryClick,
  onCountryHover,
}) {
  const [topoData,         setTopoData]         = useState(null);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(null);
  const [hoveredNumericId, setHoveredNumericId] = useState(null);
  const [selectedCountry,  setSelectedCountry]  = useState(null);

  // ── Fetch TopoJSON once ───────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    fetch(TOPO_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => { if (!cancelled) { setTopoData(data); setLoading(false); } })
      .catch(e  => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // ── Build numeric-id → country-config lookup ──────────────────────────────
  const countryByNumId = useMemo(() => {
    const map = new Map();
    countries.forEach(c => map.set(c.numericId, c));
    return map;
  }, [countries]);

  // ── Combined Africa numeric IDs (base set + anything in countries list) ───
  const africaIds = useMemo(() => {
    const combined = new Set(AFRICA_NUMERIC_IDS);
    countries.forEach(c => combined.add(c.numericId));
    return combined;
  }, [countries]);

  // ── Projection + path generator + filtered feature list ──────────────────
  const { projection, pathGen, features } = useMemo(() => {
    if (!topoData) return {};

    const allFeatures = topojson
      .feature(topoData, topoData.objects.countries)
      .features
      .filter(f => africaIds.has(+f.id));

    // Fit the projection so Africa fills the SVG with some padding
    const proj = d3.geoMercator().fitExtent(
      [[24, 16], [width - 24, height - 24]],
      { type: 'FeatureCollection', features: allFeatures },
    );

    const pg = d3.geoPath().projection(proj);

    return { projection: proj, pathGen: pg, features: allFeatures };
  }, [topoData, width, height, africaIds]);

  // ── Projected label anchor points ─────────────────────────────────────────
  const labeledCountries = useMemo(() => {
    if (!projection) return [];
    return countries
      .filter(c => c.showLabel)
      .map(c => {
        const [px, py] = projection(c.coordinates);
        return { config: c, px, py };
      });
  }, [countries, projection]);

  // ── Event handlers ────────────────────────────────────────────────────────
  const handleMouseEnter = (numericId) => {
    setHoveredNumericId(numericId);
    onCountryHover?.(countryByNumId.get(numericId) ?? null);
  };

  const handleMouseLeave = () => {
    setHoveredNumericId(null);
    onCountryHover?.(null);
  };

  const handleClick = (numericId) => {
    const c = countryByNumId.get(numericId);
    if (!c) return;
    setSelectedCountry(c);
    onCountryClick?.(c);
  };

  // ── Loading / error states ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={styles.stateWrapper} style={{ width, height }}>
        <span className={styles.spinner} />
        <span className={styles.stateText}>Loading map…</span>
      </div>
    );
  }

  if (error || !features) {
    return (
      <div className={styles.stateWrapper} style={{ width, height }}>
        <span className={styles.stateText} style={{ color: '#f47c80' }}>
          Failed to load map data.
        </span>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.wrapper} style={{ width, height }}>

      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        aria-label="FINPAY Africa presence map"
        role="img"
      >
        <defs>
          {/* Ambient shadow beneath the whole landmass */}
          <filter id="am-depth" x="-8%" y="-8%" width="120%" height="120%">
            <feDropShadow
              dx="0" dy="14" stdDeviation="22"
              floodColor="#000000" floodOpacity="0.72"
            />
          </filter>

          {/* Subtle bloom on hovered country */}
          <filter id="am-hover-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Layer 1: Extruded sides (fake 3-D depth) ───────────────────
            Render N copies of each path, each shifted slightly down-right
            and filled with a darkened version of the country color.
            The bottom-most copy is darkest — creates a tapered side face.
        ─────────────────────────────────────────────────────────────────── */}
        <g filter="url(#am-depth)">
          {Array.from({ length: extrusionDepth }, (_, step) => {
            const depth      = extrusionDepth - step;          // darkest first
            const darkFactor = 0.18 + (step / extrusionDepth) * 0.22;
            const tx         = EXTRUSION_STEP_X * depth;
            const ty         = EXTRUSION_STEP_Y * depth;

            return (
              <g
                key={`ext-${step}`}
                transform={`translate(${tx}, ${ty})`}
              >
                {features.map(f => {
                  const cfg  = countryByNumId.get(+f.id);
                  const base = cfg ? cfg.color : COLOR_PRESETS.inactive;
                  return (
                    <path
                      key={f.id}
                      d={pathGen(f)}
                      fill={darkenHex(base, darkFactor)}
                      stroke="none"
                    />
                  );
                })}
              </g>
            );
          })}
        </g>

        {/* ── Layer 2: Country top faces ─────────────────────────────────── */}
        <g>
          {features.map(f => {
            const cfg       = countryByNumId.get(+f.id);
            const isHovered = hoveredNumericId === +f.id;
            const hasData   = Boolean(cfg);

            // Compute fill: hovered → brightened; else use config color or inactive default
            let fill = cfg ? cfg.color : COLOR_PRESETS.inactive;
            if (isHovered) fill = COLOR_PRESETS.highlight;

            return (
              <path
                key={f.id}
                d={pathGen(f)}
                fill={fill}
                stroke={COLOR_PRESETS.border}
                strokeWidth={0.5}
                filter={isHovered ? 'url(#am-hover-glow)' : undefined}
                style={{
                  cursor:     hasData ? 'pointer' : 'default',
                  transition: 'fill 0.18s ease',
                }}
                onMouseEnter={() => handleMouseEnter(+f.id)}
                onMouseLeave={handleMouseLeave}
                onClick={hasData ? () => handleClick(+f.id) : undefined}
              />
            );
          })}
        </g>

        {/* ── Layer 3: Connector lines, dots, and labels ─────────────────── */}
        {labeledCountries.map(({ config, px, py }) => (
          <CountryLabel
            key={config.id}
            config={config}
            px={px}
            py={py}
            isHovered={hoveredNumericId === config.numericId}
          />
        ))}
      </svg>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      {showLegend && (
        <div className={styles.legend}>
          <p className={styles.legendTitle}>FINPAY · Connecting Africa</p>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: COLOR_PRESETS.presence }} />
            <span>Active Presence</span>
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: COLOR_PRESETS.expansion }} />
            <span>Expansion Target</span>
          </div>
        </div>
      )}

      {/* ── Interaction hint ─────────────────────────────────────────────── */}
      <p className={styles.hint}>Hover to explore · Click for details</p>

      {/* ── Country detail modal ─────────────────────────────────────────── */}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}
