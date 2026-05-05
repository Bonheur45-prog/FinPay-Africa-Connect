/**
 * AfricaMap3D.jsx
 * ─────────────────────────────────────────────────────────────────
 * True 3D extruded Africa map for CONNECT – Connecting Africa.
 *
 * Each country is a real Three.js ExtrudeGeometry — actual 3D slab
 * with depth, side walls, bevel, lighting, and smooth hover glow.
 *
 * FIXED: Robust ID matching with fallback logic handles string/number IDs
 *
 * Dependencies (npm install):
 *   three  @react-three/fiber  @react-three/drei  topojson-client
 *
 * Props:
 *   countries          {CountryData[]}  controlled list (omit = uncontrolled)
 *   defaultCountries   {CountryData[]}  initial state
 *   onCountriesChange  {fn(list)}       fires on any internal mutation
 *   showLabels         {bool}           toggle connector-line labels (default true)
 *   showLegend         {bool}           toggle bottom-left legend (default true)
 *   mapHeight          {number}         canvas height in px (default 620)
 *   backgroundColor    {string}         canvas bg hex (default '#080101')
 *   onCountryClick     {fn(country)}
 *   onCountryHover     {fn(country|null)}
 *
 * Imperative ref API:
 *   ref.current.addCountry(countryObj)
 *   ref.current.removeCountry(id)
 *   ref.current.shadeCountry(id, '#hexcolor')
 *   ref.current.toggleLabel(id, true|false)
 *   ref.current.resetCamera()
 */

import React, {
  useState, useEffect, useRef, useCallback, useMemo,
  forwardRef, useImperativeHandle, Suspense,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import * as topojson from 'topojson-client';
import CountryModal from './CountryModal';
import styles from './AfricaMap3D.module.css';
import {
  DEFAULT_COUNTRIES,
  AFRICA_NUMERIC_IDS,
  COLOR_PRESETS,
  upsertCountry,
  removeCountry,
  shadeCountry,
} from '../../data/countryData.js';

// ─── Map projection config ────────────────────────────────────────────────────
const GEO_URL      = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const CENTER_LON   = 17;       // Africa longitude center
const CENTER_LAT   = 0;        // Africa latitude center
const DEG_SCALE    = 1 / 18;   // degrees → Three.js units  (Africa ≈ 4 units wide)
const EXTRUDE_DEPTH = 0.1;     // country slab thickness in Three.js units
const LABEL_DIST   = 0.52;     // label distance from centroid

// ─── Geometry helpers ─────────────────────────────────────────────────────────

/** Convert [lon, lat] → THREE.Vector2 in the flat projection */
function ll2v2(lon, lat) {
  return new THREE.Vector2(
    (lon - CENTER_LON) * DEG_SCALE,
    (lat - CENTER_LAT) * DEG_SCALE,
  );
}

/** Convert [lon, lat] → THREE.Vector3 at optional z */
function ll2v3(lon, lat, z = 0) {
  const v = ll2v2(lon, lat);
  return new THREE.Vector3(v.x, v.y, z);
}

/** Mean centroid of a ring [[lon,lat], ...] */
function ringCentroid(ring) {
  const n = ring.length - 1; // last point closes the ring, skip it
  let lo = 0, la = 0;
  for (let i = 0; i < n; i++) { lo += ring[i][0]; la += ring[i][1]; }
  return [lo / n, la / n];
}

/**
 * Build a THREE.ExtrudeGeometry from a GeoJSON polygon coordinates array.
 * polygonCoords = [ outerRing, ...holeRings ]
 * Each ring = [[lon, lat], ...]
 */
function buildExtrudedGeo(polygonCoords) {
  try {
    const outerPts = polygonCoords[0].slice(0, -1).map(([lo, la]) => ll2v2(lo, la));
    if (outerPts.length < 3) return null;

    const shape = new THREE.Shape(outerPts);

    // Add holes (inner rings)
    for (let h = 1; h < polygonCoords.length; h++) {
      const holePts = polygonCoords[h].slice(0, -1).map(([lo, la]) => ll2v2(lo, la));
      if (holePts.length >= 3) shape.holes.push(new THREE.Path(holePts));
    }

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth:          EXTRUDE_DEPTH,
      bevelEnabled:   true,
      bevelThickness: 0.007,
      bevelSize:      0.005,
      bevelSegments:  2,
    });
    geo.computeVertexNormals();
    return geo;
  } catch {
    return null;
  }
}

/**
 * Parse a GeoJSON feature → array of ExtrudeGeometry + centroid [lon, lat].
 * Handles both Polygon and MultiPolygon.
 */
function parseFeature(feature) {
  const g = feature.geometry;
  if (!g) return { geos: [], centroid: [CENTER_LON, CENTER_LAT] };

  const polys =
    g.type === 'Polygon'      ? [g.coordinates]  :
    g.type === 'MultiPolygon' ?  g.coordinates   : [];

  const geos = polys.map(poly => buildExtrudedGeo(poly)).filter(Boolean);

  // Centroid from the primary (usually largest) polygon's outer ring
  const primaryRing = polys[0]?.[0] ?? [];
  const centroid    = primaryRing.length > 0 ? ringCentroid(primaryRing) : [CENTER_LON, CENTER_LAT];

  return { geos, centroid };
}

// ─── ConnectorLine — thin 3D line from centroid → label position ──────────────

function ConnectorLine({ startArr, endArr, hovered }) {
  const geo = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...startArr),
      new THREE.Vector3(...endArr),
    ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startArr[0], startArr[1], startArr[2], endArr[0], endArr[1], endArr[2]]);

  useEffect(() => () => geo.dispose(), [geo]);

  const matRef = useRef();

  // Smooth opacity animation on hover
  useFrame(() => {
    if (!matRef.current) return;
    matRef.current.opacity = THREE.MathUtils.lerp(
      matRef.current.opacity,
      hovered ? 0.95 : 0.45,
      0.1,
    );
  });

  return (
    <line geometry={geo}>
      <lineBasicMaterial
        ref={matRef}
        color="#ffffff"
        transparent
        opacity={0.45}
        depthTest={false}
      />
    </line>
  );
}

// ─── Single country — meshes + label + connector ──────────────────────────────

function CountryObject({ config, geos, centroid, showLabel, onHover, onClick }) {
  const [hovered, setHovered] = useState(false);
  const hovRef = useRef(false); // ref copy avoids stale closure in useFrame

  // ── Derived 3D positions ──────────────────────────────────────────────────
  const anchorArr = useMemo(
    () => [
      ll2v3(centroid[0], centroid[1], EXTRUDE_DEPTH + 0.006).x,
      ll2v3(centroid[0], centroid[1], EXTRUDE_DEPTH + 0.006).y,
      EXTRUDE_DEPTH + 0.006,
    ],
    [centroid],
  );

  const labelArr = useMemo(() => {
    const [dx, dy] = config.labelOffset ?? [40, -20];
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const nx = dx / len;
    const ny = dy / len;
    const [cx, cy] = [
      (centroid[0] - CENTER_LON) * DEG_SCALE,
      (centroid[1] - CENTER_LAT) * DEG_SCALE,
    ];
    return [
      cx + nx * LABEL_DIST,
      cy + ny * LABEL_DIST * 0.82,
      EXTRUDE_DEPTH + 0.018,
    ];
  }, [centroid, config.labelOffset]);

  // ── Materials ─────────────────────────────────────────────────────────────
  //  ExtrudeGeometry groups: 0 = front face, 1 = back face, 2 = side walls
  const frontMat = useMemo(() => {
    const bright = new THREE.Color(config.color).multiplyScalar(1.22);
    return new THREE.MeshPhongMaterial({
      color: bright,
      emissive: new THREE.Color(config.color),
      emissiveIntensity: 0.0,
      shininess: 90,
      specular: new THREE.Color('#ff7777'),
    });
  }, [config.color]);

  const sideMat = useMemo(() => {
    const dark = new THREE.Color(config.color).multiplyScalar(0.58);
    return new THREE.MeshPhongMaterial({
      color: dark,
      emissive: new THREE.Color(config.color),
      emissiveIntensity: 0.0,
      shininess: 20,
    });
  }, [config.color]);

  const matsArr = useMemo(
    () => [frontMat, sideMat, sideMat],
    [frontMat, sideMat],
  );

  // Dispose materials on unmount or color change
  useEffect(() => () => { frontMat.dispose(); sideMat.dispose(); }, [frontMat, sideMat]);

  // ── Smooth hover glow (runs every frame inside Canvas) ────────────────────
  useFrame(() => {
    const target = hovRef.current ? 0.48 : 0.0;
    for (const mat of matsArr) {
      // eslint-disable-next-line react-hooks/immutability
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        target,
        0.08,
      );
    }
  });

  // ── Event handlers ────────────────────────────────────────────────────────
  const handlePointerEnter = useCallback(() => {
    hovRef.current = true;
    setHovered(true);
    onHover?.(config);
  }, [config, onHover]);

  const handlePointerLeave = useCallback(() => {
    hovRef.current = false;
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.(config);
  }, [config, onClick]);

  return (
    <>
      {/* ── Country mesh slabs (ExtrudeGeometry per polygon) ────────────────── */}
      {geos.map((geo, idx) => (
        <mesh
          key={idx}
          geometry={geo}
          material={matsArr}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onClick={handleClick}
          castShadow
          receiveShadow
        />
      ))}

      {/* ── Connector line + label (optional) ────────────────────────────────── */}
      {showLabel && (
        <>
          <ConnectorLine startArr={anchorArr} endArr={labelArr} hovered={hovered} />
          <Html
            position={labelArr}
            center
            distanceFactor={1}
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#ffffff',
              textShadow: '0 0 8px rgba(0,0,0,0.8)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {config.name}
          </Html>
        </>
      )}
    </>
  );
}

// ─── Scene: loads TopoJSON, builds country objects ───────────────────────────

function Scene3D({ countries, topoData, showLabels, onHover, onClick }) {
  // Build per-country geometry data from TopoJSON + config list
  // FIXED: Robust ID matching with proper type coercion and fallback
  const countryObjects = useMemo(() => {
    if (!topoData) return [];

    let features;
    try {
      features = topojson.feature(topoData, topoData.objects.countries).features;
    } catch (err) {
      console.error('Failed to extract features from TopoJSON:', err);
      return [];
    }

    // Create a Map for O(1) lookup by numeric ID
    // This handles the core matching efficiently
    const configMap = new Map(countries.map(c => [c.numericId, c]));
    const result    = [];

    for (const feat of features) {
      if (!feat) continue;

      // FIXED: Extract ID with fallback logic
      // feature.id can be string "646", number 646, or missing
      let numId;
      if (feat.id !== undefined && feat.id !== null) {
        numId = Number(feat.id);
      } else if (feat.properties?.id !== undefined) {
        numId = Number(feat.properties.id);
      } else {
        // Skip features with no identifiable ID
        continue;
      }

      // Check if this is an African country
      if (!AFRICA_NUMERIC_IDS.has(numId)) continue;

      // FIXED: Use Map.get for O(1) lookup with numeric ID
      const config = configMap.get(numId);
      if (!config) {
        // Country is in Africa but not in our config list
        // Skip it (don't render) unless it's present/expansion
        continue;
      }

      const { geos, centroid } = parseFeature(feat);
      if (geos.length === 0) continue;

      result.push({ config, geos, centroid });
    }

    return result;
  }, [topoData, countries]);

  // Dispose geometries when list changes or on unmount
  useEffect(() => {
    return () => countryObjects.forEach(({ geos }) => geos.forEach(g => g.dispose()));
  }, [countryObjects]);

  return (
    <>
      {/* ── Lighting ───────────────────────────────────────────── */}
      {/* Key light: warm directional from top-right */}
      <directionalLight
        position={[4, 6, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* Fill light: cool dark red from opposite side */}
      <directionalLight position={[-4, -3, 3]} intensity={0.28} color="#660010" />
      {/* Ambient: very subtle, prevents total black */}
      <ambientLight intensity={0.38} />
      {/* Accent point: orange glow (brand color) */}
      <pointLight position={[-3.5, 2, 5]}  intensity={1.4} color="#F77F25" decay={2} />
      {/* Accent point: red glow from below */}
      <pointLight position={[3,   -2, 4]}  intensity={0.9} color="#DA1C21" decay={2} />
      {/* Rim light from behind */}
      <pointLight position={[0,    0, -5]} intensity={0.3} color="#441111" decay={2} />

      {/* ── Floor plane — catches shadows ──────────────────────── */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.38, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#060101" roughness={1} metalness={0} />
      </mesh>

      {/* ── Country objects ─────────────────────────────────────── */}
      {countryObjects.map(({ config, geos, centroid }) => (
        <CountryObject
          key={config.id}
          config={config}
          geos={geos}
          centroid={centroid}
          showLabel={showLabels && config.showLabel !== false}
          onHover={onHover}
          onClick={onClick}
        />
      ))}

      {/* ── Orbit controls (zoom / rotate / pan / touch) ─────────── */}
      <OrbitControls
        enableZoom
        enableRotate
        enablePan
        zoomSpeed={0.75}
        rotateSpeed={0.55}
        panSpeed={0.6}
        minDistance={2.5}
        maxDistance={14}
        makeDefault
      />
    </>
  );
}

// ─── Main exported component ──────────────────────────────────────────────────

const AfricaMap3D = forwardRef(function AfricaMap3D(
  {
    countries:        controlledCountries,
    defaultCountries: defaultCountries = DEFAULT_COUNTRIES,
    onCountriesChange,
    showLabels        = true,
    showLegend        = true,
    mapHeight         = 620,
    backgroundColor   = '#080101',
    onCountryClick,
    onCountryHover,
  },
  ref,
) {
  // ── Controlled vs uncontrolled countries state ─────────────────────────────
  const isControlled    = controlledCountries !== undefined;
  const [internal, setInternal] = useState(defaultCountries);
  const countries       = isControlled ? controlledCountries : internal;

  // ── App state ──────────────────────────────────────────────────────────────
  const [topoData,        setTopoData]        = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [loadError,       setLoadError]       = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [canvasKey,       setCanvasKey]       = useState(0); // reset camera by remounting

  // ── Load TopoJSON (world-atlas CDN) ───────────────────────────────────────
  useEffect(() => {
    fetch(GEO_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => { setTopoData(data); setLoading(false); })
      .catch(err  => { 
        console.error('Failed to load TopoJSON:', err);
        setLoadError(err.message); 
        setLoading(false); 
      });
  }, []);

  // ── Immutable mutators ─────────────────────────────────────────────────────
  const mutate = useCallback(next => {
    if (!isControlled) setInternal(next);
    onCountriesChange?.(next);
  }, [isControlled, onCountriesChange]);

  // ── Imperative API via ref ─────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    /** Add or update a country by id */
    addCountry:    (c)           => mutate(upsertCountry(countries, c)),
    /** Remove a country by id string */
    removeCountry: (id)          => mutate(removeCountry(countries, id)),
    /** Change a country's fill color */
    shadeCountry:  (id, color)   => mutate(shadeCountry(countries, id, color)),
    /** Show or hide a single country's label */
    toggleLabel:   (id, visible) => mutate(countries.map(c => c.id === id ? { ...c, showLabel: visible } : c)),
    /** Reset camera to initial position */
    resetCamera:   ()            => setCanvasKey(k => k + 1),
  }), [countries, mutate]);

  // ── Handlers passed into Canvas ────────────────────────────────────────────
  const handleHover = useCallback(country => {
    onCountryHover?.(country);
  }, [onCountryHover]);

  const handleClick = useCallback(country => {
    setSelectedCountry(country);
    onCountryClick?.(country);
  }, [onCountryClick]);

  // ── Error state ────────────────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className={styles.wrapper} style={{ '--map-height': `${mapHeight}px` }}>
        <div className={styles.errorState}>⚠ Failed to load map: {loadError}</div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className={styles.wrapper}
      style={{ '--map-height': `${mapHeight}px` }}
    >
      {/* Loading overlay */}
      {loading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <span>Building 3D map…</span>
        </div>
      )}

      {/* Three.js canvas
          key={canvasKey} remounts to reset OrbitControls camera */}
      <Canvas
        key={canvasKey}
        camera={{ position: [1.2, -1.4, 5.0], fov: 42, near: 0.05, far: 60 }}
        style={{ background: backgroundColor, display: 'block', width: '100%', height: '100%' }}
        shadows
        gl={{ antialias: true, alpha: false, shadowMap: { type: THREE.PCFShadowMap } }}
      >
        <Suspense fallback={null}>
          {topoData && (
            <Scene3D
              countries={countries}
              topoData={topoData}
              showLabels={showLabels}
              onHover={handleHover}
              onClick={handleClick}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Reset camera button */}
      <div className={styles.controls}>
        <button
          className={styles.ctrlBtn}
          onClick={() => setCanvasKey(k => k + 1)}
          title="Reset camera"
          aria-label="Reset camera view"
        >
          ⊙
        </button>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className={styles.legend}>
          <p className={styles.legendTitle}>CONNECT presence</p>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: COLOR_PRESETS.presence }} />
            Active presence
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: COLOR_PRESETS.expansion }} />
            Expansion target
          </div>
          <div className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: COLOR_PRESETS.inactive }} />
            Other African countries
          </div>
        </div>
      )}

      {/* Interaction hint (fades after first interaction — CSS handles) */}
      <div className={styles.hint}>
        Drag to rotate · Scroll to zoom · Click country for details
      </div>

      {/* Country info modal */}
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
});

export default AfricaMap3D;
