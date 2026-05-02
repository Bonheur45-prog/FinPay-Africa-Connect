/**
 * FintechShowcase.jsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Premium 3D Fintech Product Showcase – Pan-African Edition
 *
 * Dependencies (add to your project):
 *   npm install @react-three/fiber @react-three/drei three
 *
 * Usage:
 *   import FintechShowcase from './FintechShowcase'
 *   <FintechShowcase />                          // full-screen defaults
 *   <FintechShowcase products={myProducts} height="80vh" />
 * ──────────────────────────────────────────────────────────────────────────────
 */

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const RING_RADIUS   = 4.4   // distance of each product from the centre
const BASE_SPEED    = 0.28  // radians / second for Y-rotation
const SCALE_ACTIVE  = 1.35
const SCALE_PASSIVE = 0.82
const LERP_SPEED    = 6     // scale lerp speed (higher = snappier)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEFAULT PRODUCT DATA
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DEFAULT_PRODUCTS = [
  {
    id: 'card',
    label: 'Bank Card',
    type: 'card',
    image: 'https://picsum.photos/400/300?random=1',
    color: '#04070f',
    accentColor: '#c8a94e',
    annotations: [
      { text: 'Secure Chip', dx: 1, dy: 0.5 },
      { text: 'Global Payments', dx: -1, dy: -0.5 },
    ],
  },
  {
    id: 'pos',
    label: 'POS Terminal',
    type: 'pos',
    image: 'https://picsum.photos/400/300?random=2',
    color: '#150505',
    accentColor: '#8C1A13',
    annotations: [
      { text: 'Contactless Payments', dx: 1, dy: 0.5 },
      { text: 'Instant Settlement', dx: -1, dy: -0.5 },
    ],
  },
  {
    id: 'id',
    label: 'Digital ID',
    type: 'id',
    image: 'https://picsum.photos/400/300?random=3',
    color: '#1a0505',
    accentColor: '#af2b21',
    annotations: [
      { text: 'Biometric Verification', dx: 1, dy: 0.5 },
      { text: 'Secure Authentication', dx: -1, dy: -0.5 },
    ],
  },
  {
    id: 'phone',
    label: 'Mobile Banking',
    type: 'phone',
    image: 'https://picsum.photos/400/300?random=4',
    color: '#120404',
    accentColor: '#e4dad9',
    annotations: [
      { text: 'Real-time Transactions', dx: 1, dy: 0.5 },
      { text: 'USSD Integration', dx: -1, dy: -0.5 },
    ],
  },
  {
    id: 'document',
    label: 'Secure Document',
    type: 'document',
    image: 'https://picsum.photos/400/300?random=5',
    color: '#080f08',
    accentColor: '#66bb6a',
    annotations: [
      { text: 'Tamper-Proof Seals', dx: 1, dy: 0.5 },
      { text: 'Digital Signatures', dx: -1, dy: -0.5 },
    ],
  },
  {
    id: 'coin',
    label: 'Crypto Wallet',
    type: 'coin',
    image: 'https://picsum.photos/400/300?random=6',
    color: '#120a00',
    accentColor: '#ffa726',
    annotations: [
      { text: 'Multi-Chain Support', dx: 1, dy: 0.5 },
      { text: 'Self-Custody', dx: -1, dy: -0.5 },
    ],
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRODUCT MESHES  (one component per product type)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Shared material shorthand */
function mat(color, emissive, emissiveIntensity, metalness = 0.7, roughness = 0.25) {
  return { color, emissive, emissiveIntensity, metalness, roughness }
}

// ── Bank Card ────────────────────────────────────────────────────────────────
function CardMesh({ color, accent, active }) {
  const ei = active ? 0.55 : 0.06
  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[1.65, 1.05, 0.045]} />
        <meshStandardMaterial {...mat(color, accent, ei)} />
      </mesh>
      {/* Chip */}
      <mesh position={[-0.42, 0.12, 0.026]}>
        <boxGeometry args={[0.3, 0.23, 0.012]} />
        <meshStandardMaterial {...mat(accent, accent, active ? 0.8 : 0.1, 1, 0.05)} />
      </mesh>
      {/* Chip grid lines */}
      {[-1, 0, 1].map(r => (
        <mesh key={r} position={[-0.42, 0.12 + r * 0.06, 0.034]}>
          <boxGeometry args={[0.26, 0.004, 0.001]} />
          <meshStandardMaterial color="#000" transparent opacity={0.5} />
        </mesh>
      ))}
      {/* NFC arcs */}
      {[0.07, 0.12, 0.17].map((r, i) => (
        <mesh key={i} position={[0.58, 0.22, 0.026]} rotation={[0, 0, 0]}>
          <torusGeometry args={[r, 0.009, 6, 20, Math.PI * 1.3]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1.2 : 0.15} />
        </mesh>
      ))}
      {/* Card number blocks */}
      {[0, 1, 2, 3].map(i => (
        <mesh key={i} position={[-0.6 + i * 0.4, -0.22, 0.026]}>
          <boxGeometry args={[0.3, 0.055, 0.004]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.5 : 0.08} />
        </mesh>
      ))}
      {/* Name line */}
      <mesh position={[-0.3, -0.38, 0.026]}>
        <boxGeometry args={[0.7, 0.04, 0.003]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.35 : 0.06} />
      </mesh>
      {/* Mag stripe on back (visible when rotating) */}
      <mesh position={[0, 0.3, -0.026]}>
        <boxGeometry args={[1.65, 0.25, 0.003]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// ── POS Terminal ─────────────────────────────────────────────────────────────
function POSMesh({ color, accent, active }) {
  const ei = active ? 0.4 : 0.05
  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 1.15, 0.38]} />
        <meshStandardMaterial {...mat(color, accent, ei, 0.5, 0.35)} />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 0.28, 0.194]}>
        <boxGeometry args={[0.56, 0.45, 0.01]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.28, 0.2]}>
        <boxGeometry args={[0.48, 0.38, 0.005]} />
        <meshStandardMaterial color="#001122" emissive={accent} emissiveIntensity={active ? 0.9 : 0.12} roughness={0} metalness={0} />
      </mesh>
      {/* Screen content lines */}
      {[0.12, 0, -0.1].map((y, i) => (
        <mesh key={i} position={[0, 0.28 + y, 0.204]}>
          <boxGeometry args={[i === 0 ? 0.3 : 0.38, 0.025, 0.001]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.6 : 0.05} />
        </mesh>
      ))}
      {/* Keypad */}
      {[0, 1, 2, 3].map(row =>
        [0, 1, 2].map(col => (
          <mesh key={`${row}-${col}`} position={[-0.18 + col * 0.18, -0.05 - row * 0.14, 0.194]}>
            <boxGeometry args={[0.13, 0.095, 0.008]} />
            <meshStandardMaterial color="#0e1b28" emissive={accent} emissiveIntensity={active ? 0.3 : 0.03} metalness={0.3} roughness={0.5} />
          </mesh>
        ))
      )}
      {/* Card slot */}
      <mesh position={[0, -0.62, 0.12]}>
        <boxGeometry args={[0.5, 0.045, 0.12]} />
        <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Receipt slot */}
      <mesh position={[0, 0.58, 0.12]}>
        <boxGeometry args={[0.4, 0.03, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

// ── ID Card ───────────────────────────────────────────────────────────────────
function IDCardMesh({ color, accent, active }) {
  const ei = active ? 0.45 : 0.06
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.65, 1.05, 0.045]} />
        <meshStandardMaterial {...mat(color, accent, ei, 0.4, 0.4)} />
      </mesh>
      {/* Header stripe */}
      <mesh position={[0, 0.4, 0.026]}>
        <boxGeometry args={[1.6, 0.18, 0.004]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.7 : 0.1} metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Photo placeholder */}
      <mesh position={[-0.55, -0.05, 0.026]}>
        <boxGeometry args={[0.42, 0.62, 0.006]} />
        <meshStandardMaterial color="#2d0a0a" emissive="#8C1A13" emissiveIntensity={active ? 0.5 : 0.08} />
      </mesh>
      {/* Photo – face silhouette */}
      <mesh position={[-0.55, 0.02, 0.032]}>
        <circleGeometry args={[0.11, 20]} />
        <meshStandardMaterial color="#8C1A13" emissive="#8C1A13" emissiveIntensity={active ? 0.6 : 0.1} />
      </mesh>
      {/* Text lines */}
      {[0.22, 0.06, -0.08, -0.2].map((y, i) => (
        <mesh key={i} position={[0.18, y, 0.026]}>
          <boxGeometry args={[i % 2 === 0 ? 0.72 : 0.5, 0.042, 0.004]} />
          <meshStandardMaterial color={i === 0 ? accent : '#88aacc'} emissive={accent} emissiveIntensity={active ? (i === 0 ? 0.5 : 0.15) : 0.03} />
        </mesh>
      ))}
      {/* Holographic stripe */}
      <mesh position={[0, -0.42, 0.026]}>
        <boxGeometry args={[1.55, 0.09, 0.003]} />
        <meshStandardMaterial color="#ff7043" emissive="#ff7043" emissiveIntensity={active ? 1.5 : 0.2} metalness={1} roughness={0} />
      </mesh>
    </group>
  )
}

// ── Phone ─────────────────────────────────────────────────────────────────────
function PhoneMesh({ color, accent, active }) {
  const ei = active ? 0.35 : 0.05
  return (
    <group>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.58, 1.18, 0.075]} />
        <meshStandardMaterial {...mat(color, accent, ei, 0.85, 0.08)} />
      </mesh>
      {/* Side buttons */}
      <mesh position={[0.3, 0.22, 0]}>
        <boxGeometry args={[0.012, 0.15, 0.055]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.3, 0.1, 0]}>
        <boxGeometry args={[0.012, 0.08, 0.055]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.02, 0.041]}>
        <boxGeometry args={[0.47, 1.0, 0.005]} />
        <meshStandardMaterial color="#000814" emissive={accent} emissiveIntensity={active ? 0.7 : 0.1} roughness={0} metalness={0.1} />
      </mesh>
      {/* App grid */}
      {[-1, 0, 1].map(row =>
        [-1, 0, 1].map(col => (
          <mesh key={`${row}-${col}`} position={[col * 0.13, 0.18 + row * 0.16, 0.045]}>
            <boxGeometry args={[0.09, 0.09, 0.002]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.4 : 0.04} metalness={0} roughness={0.5} />
          </mesh>
        ))
      )}
      {/* App bar bottom */}
      {[-1, 0, 1].map(i => (
        <mesh key={i} position={[i * 0.14, -0.38, 0.045]}>
          <boxGeometry args={[0.09, 0.09, 0.002]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.55 : 0.07} />
        </mesh>
      ))}
      {/* Camera pill */}
      <mesh position={[0, 0.54, 0.041]}>
        <boxGeometry args={[0.2, 0.06, 0.003]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Home indicator */}
      <mesh position={[0, -0.53, 0.041]}>
        <boxGeometry args={[0.18, 0.018, 0.002]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
      </mesh>
    </group>
  )
}

// ── Document ──────────────────────────────────────────────────────────────────
function DocumentMesh({ color, accent, active }) {
  const ei = active ? 0.35 : 0.05
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[1.2, 1.55, 0.03]} />
        <meshStandardMaterial {...mat(color, accent, ei, 0.15, 0.75)} />
      </mesh>
      {/* Header */}
      <mesh position={[0, 0.63, 0.019]}>
        <boxGeometry args={[1.12, 0.22, 0.004]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.8 : 0.1} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Logo circle in header */}
      <mesh position={[-0.38, 0.63, 0.024]}>
        <circleGeometry args={[0.07, 20]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={active ? 0.5 : 0.05} />
      </mesh>
      {/* Text content lines */}
      {[0.38, 0.24, 0.1, -0.04, -0.18, -0.32].map((y, i) => (
        <mesh key={i} position={[i % 3 === 2 ? -0.1 : 0, y, 0.019]}>
          <boxGeometry args={[i % 3 === 2 ? 0.7 : 0.95, 0.04, 0.003]} />
          <meshStandardMaterial
            color={i === 0 ? accent : '#5a8a8a'}
            emissive={accent}
            emissiveIntensity={active ? (i === 0 ? 0.45 : 0.08) : 0.02}
          />
        </mesh>
      ))}
      {/* Seal */}
      <mesh position={[0.38, -0.54, 0.019]}>
        <circleGeometry args={[0.16, 32]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1.0 : 0.1} metalness={0.8} roughness={0.1} />
      </mesh>
      <mesh position={[0.38, -0.54, 0.024]}>
        <ringGeometry args={[0.12, 0.16, 32]} />
        <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

// ── Crypto Coin ───────────────────────────────────────────────────────────────
function CoinMesh({ color, accent, active }) {
  const ei = active ? 0.7 : 0.12
  return (
    <group>
      {/* Coin body */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.14, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={ei} metalness={1} roughness={0.05} />
      </mesh>
      {/* Inner disc (darker face) */}
      <mesh position={[0, 0, 0.075]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.52, 48]} />
        <meshStandardMaterial color={color} emissive={accent} emissiveIntensity={ei * 0.4} metalness={1} roughness={0.1} />
      </mesh>
      {/* Symbol ring */}
      <mesh position={[0, 0, 0.078]}>
        <ringGeometry args={[0.38, 0.48, 48]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 1.2 : 0.2} metalness={1} roughness={0} />
      </mesh>
      {/* ₿ approximation – vertical bar */}
      <mesh position={[0, 0, 0.082]}>
        <boxGeometry args={[0.04, 0.3, 0.004]} />
        <meshStandardMaterial color={color} emissive={accent} emissiveIntensity={0.2} />
      </mesh>
      {/* ₿ – two horizontal bumps */}
      {[0.09, -0.04].map((y, i) => (
        <mesh key={i} position={[0.06, y, 0.082]}>
          <boxGeometry args={[0.12, 0.07, 0.004]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      {/* Back face (same coin) */}
      <mesh position={[0, 0, -0.075]} rotation={[Math.PI, 0, 0]}>
        <circleGeometry args={[0.52, 48]} />
        <meshStandardMaterial color={color} emissive={accent} emissiveIntensity={ei * 0.4} metalness={1} roughness={0.1} />
      </mesh>
    </group>
  )
}

/** Maps a product type string to its mesh component */
const MESH_MAP = {
  card:     CardMesh,
  pos:      POSMesh,
  id:       IDCardMesh,
  phone:    PhoneMesh,
  document: DocumentMesh,
  coin:     CoinMesh,
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AFRICA CORE  (central static object)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AfricaCore() {
  const coreRef    = useRef()
  const wireRef    = useRef()
  const innerRingRef = useRef()
  const outerRingRef = useRef()
  const glowRef    = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Slow Y spin on the solid core
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.08
      coreRef.current.material.emissiveIntensity =
        0.28 + Math.sin(t * 1.8) * 0.08
    }

    // Wireframe spins a bit faster and slightly out of phase
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.14
      wireRef.current.rotation.x = Math.sin(t * 0.3) * 0.06
    }

    // Orbital rings
    if (innerRingRef.current) innerRingRef.current.rotation.z = t * 0.22
    if (outerRingRef.current) outerRingRef.current.rotation.z = -t * 0.14

    // Glow pulse
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.06 + Math.sin(t * 2.2) * 0.025
    }
  })

  return (
    <group>
      {/* Solid core – stylised globe */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.95, 3]} />
        <meshStandardMaterial
          color="#150202"
          emissive="#8C1A13"
          emissiveIntensity={0.28}
          metalness={0.2}
          roughness={0.65}
        />
      </mesh>

      {/* Wireframe overlay – gives the polygon-globe look from the reference */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.97, 2]} />
        <meshBasicMaterial
          color="#af2b21"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Atmosphere glow (BackSide sphere) */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial
          color="#480707"
          side={THREE.BackSide}
          transparent
          opacity={0.07}
          emissive="#6A1109"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner orbital ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.45, 0.016, 6, 80]} />
        <meshStandardMaterial
          color="#8C1A13"
          emissive="#8C1A13"
          emissiveIntensity={1.2}
        />
      </mesh>

      {/* Outer orbital ring – tilted slightly */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2 + 0.28, 0.1, 0]}>
        <torusGeometry args={[1.78, 0.009, 6, 80]} />
        <meshStandardMaterial
          color="#af2b21"
          emissive="#af2b21"
          emissiveIntensity={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Platform rings (ground ring the products orbit above) */}
      {[3.9, 3.6].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2, 0, 0]} position={[0, -1.25, 0]}>
          <torusGeometry args={[r, i === 0 ? 0.03 : 0.016, 6, 80]} />
          <meshStandardMaterial
            color="#8C1A13"
            emissive="#8C1A13"
            emissiveIntensity={i === 0 ? 0.75 : 0.4}
            transparent
            opacity={i === 0 ? 0.9 : 0.5}
          />
        </mesh>
      ))}

      {/* Subtle floor disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
        <circleGeometry args={[4.2, 64]} />
        <meshStandardMaterial
          color="#150505"
          transparent
          opacity={0.5}
          metalness={0.4}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRODUCT ITEM  (single slot in the ring)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * ProductItem
 *
 * Placed at its initial (x, z) derived from angle; the ProductRing group
 * rotates around Y, so world positions change each frame.
 *
 * Key design choices:
 *  – `scaleRef` is a mutable float that lerps toward the target each frame,
 *    avoiding React state updates inside useFrame.
 *  – Annotations are rendered via <Html> which projects the 3D position to 2D
 *    automatically; they are only mounted for the active item.
 *  – The invisible hit-mesh captures pointer events without interfering with
 *    the visual mesh (avoids z-fighting and material conflicts).
 */
function ProductItem({ product, index, total, isActive, onHover }) {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const scaleRef  = useRef(SCALE_PASSIVE)

  const targetScale = isActive ? SCALE_ACTIVE : SCALE_PASSIVE

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Lerp toward target scale (easing)
    scaleRef.current = THREE.MathUtils.lerp(
      scaleRef.current,
      targetScale,
      1 - Math.exp(-LERP_SPEED * delta) // exponential smoothing
    )
    groupRef.current.scale.setScalar(scaleRef.current)
  })

  // Initial placement angle: evenly distribute items around 360°
  const angle = (index / total) * Math.PI * 2
  const x = Math.sin(angle) * RING_RADIUS
  const z = Math.cos(angle) * RING_RADIUS

  const MeshComponent = MESH_MAP[product.type] ?? CardMesh
  const texture = useTexture(product.image)

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {/* Invisible hit-mesh to capture hover events */}
      <mesh
        visible={false}
        onPointerEnter={() => { if (isActive) onHover(true) }}
        onPointerLeave={() => onHover(false)}
      >
        <boxGeometry args={[2.2, 2, 0.8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Product geometry – rotated to face camera */}
      <mesh ref={meshRef} rotation={[0, angle, 0]}>
        <planeGeometry args={[2, 1.5]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Tooltip label (active only) ──────────────────────────────────── */}
      {isActive && (
        <Html
          position={[0, 1.10, 0]}
          center
          zIndexRange={[100, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              background: 'rgba(26, 5, 5, 0.88)',
              border: `1px solid ${product.accentColor}55`,
              borderRadius: '8px',
              padding: '5px 14px',
              color: '#ddeeff',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
              letterSpacing: '0.07em',
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 24px ${product.accentColor}44, 0 2px 8px rgba(0,0,0,0.6)`,
            }}
          >
            {product.label}
          </div>
        </Html>
      )}

      {/* ── Annotations (active only) ────────────────────────────────────── */}
      {isActive &&
        product.annotations.map((ann, i) => (
          <Html
            key={i}
            position={[ann.dx * 1.15, ann.dy, 0.08]}
            center
            zIndexRange={[100, 0]}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(20, 4, 4, 0.92)',
                border: `1px solid ${product.accentColor}66`,
                borderRadius: '6px',
                padding: '3px 10px 3px 8px',
                color: product.accentColor,
                fontSize: '11px',
                fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
                fontWeight: '700',
                letterSpacing: '0.1em',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)',
                boxShadow: `0 0 14px ${product.accentColor}55`,
                textTransform: 'uppercase',
              }}
            >
              {/* Dot accent */}
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: product.accentColor,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${product.accentColor}`,
                }}
              />
              {ann.text}
            </div>
          </Html>
        ))}
    </group>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILITY: detectActiveItem
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * detectActiveItem
 *
 * The ring group rotates around Y by `groupRotationY`. Each item `i` of `total`
 * is placed at angle baseAngle = (i / total) * 2π from the group origin.
 *
 * World Z of item i:
 *   worldZ = RING_RADIUS * cos(baseAngle + groupRotationY)
 *
 * The camera looks in the -Z direction (fixed at positive Z). The item with
 * the highest worldZ is closest to the camera → that is the active item.
 *
 * @param {number} total          – number of products
 * @param {number} groupRotationY – current Y rotation of the ring group (rad)
 * @returns {number}              – index of the frontmost item
 */
function detectActiveItem(total, groupRotationY) {
  let maxZ = -Infinity
  let activeIdx = 0
  for (let i = 0; i < total; i++) {
    const baseAngle = (i / total) * Math.PI * 2
    const worldZ = RING_RADIUS * Math.cos(baseAngle + groupRotationY)
    if (worldZ > maxZ) {
      maxZ = worldZ
      activeIdx = i
    }
  }
  return activeIdx
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRODUCT RING  (rotating container for all items)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * ProductRing
 *
 * Owns the rotation logic:
 *  1. `rotationRef` accumulates raw rotation angle (never triggers re-renders).
 *  2. `speedRef` is the current speed, lerped toward BASE_SPEED or 0 based on
 *     hover state.
 *  3. Active item detection runs every frame but calls `setActiveIndex` only
 *     when the index actually changes (prevents cascading re-renders).
 *  4. A "front zone" slow-down could be implemented by checking how close the
 *     front item is to 0° and reducing speed, but for simplicity we handle it
 *     via hover pause instead (cleaner UX).
 */
function ProductRing({ products, isHovered, onActiveChange }) {
  const groupRef    = useRef()
  const rotationRef = useRef(0)
  const speedRef    = useRef(BASE_SPEED)
  const activeRef   = useRef(0)        // ref avoids stale closure in useFrame

  const [activeIndex, setActiveIndex] = useState(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // ── Speed control ──────────────────────────────────────────────────────
    const targetSpeed = isHovered ? 0 : BASE_SPEED
    speedRef.current = THREE.MathUtils.lerp(
      speedRef.current,
      targetSpeed,
      1 - Math.exp(-3.5 * delta) // smooth ease in/out
    )

    // ── Advance rotation ───────────────────────────────────────────────────
    rotationRef.current += speedRef.current * delta
    groupRef.current.rotation.y = rotationRef.current

    // ── Active item detection ──────────────────────────────────────────────
    const newActive = detectActiveItem(products.length, rotationRef.current)
    if (newActive !== activeRef.current) {
      activeRef.current = newActive
      setActiveIndex(newActive)        // trigger re-render only on change
      onActiveChange?.(newActive, products[newActive])
    }
  })

  return (
    <group ref={groupRef}>
      {products.map((product, index) => (
        <ProductItem
          key={product.id}
          product={product}
          index={index}
          total={products.length}
          isActive={index === activeIndex}
          onHover={() => {
            // Hover on active item → pause rotation (handled via isHovered prop)
          }}
        />
      ))}
    </group>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCENE LIGHTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SceneLights() {
  return (
    <>
      {/* Ambient – low to keep depth */}
      <ambientLight intensity={0.12} color="#480707" />

      {/* Key light – upper front-right */}
      <directionalLight
        position={[6, 9, 7]}
        intensity={1.8}
        color="#ffccbc"
        castShadow
      />

      {/* Rim light – upper back-left (creates that cinematic separation) */}
      <directionalLight
        position={[-5, 3, -7]}
        intensity={0.9}
        color="#8C1A13"
      />

      {/* Fill point – above centre, warm-maroon */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.7}
        color="#af2b21"
        distance={14}
        decay={2}
      />

      {/* Floor bounce – subtle warm-maroon glow from below */}
      <pointLight
        position={[0, -3, 0]}
        intensity={0.35}
        color="#6A1109"
        distance={8}
        decay={2}
      />

      {/* Front fill – soft maroon directly in front */}
      <pointLight
        position={[0, 0, 8]}
        intensity={0.45}
        color="#ffccbc"
        distance={12}
        decay={2}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCENE  (assembles everything inside the Canvas)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Scene({ products, isHovered, onActiveChange }) {
  return (
    <>
      <SceneLights />
      <AfricaCore />
      <ProductRing
        products={products}
        isHovered={isHovered}
        onActiveChange={onActiveChange}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2-D OVERLAY COMPONENTS  (rendered outside the Canvas)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** Header bar at the top of the section */
function Header() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: '9px 40px',
        zIndex: 20,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(140,26,19,0.18)',
        background:
          'linear-gradient(to bottom, rgba(26,5,5,0.85) 0%, transparent 100%)',
      }}
    >
      <div>
        <div
          style={{
            color: '#8C1A13',
            fontSize: '10px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            marginBottom: '3px',
          }}
        >
          Pan-African Fintech
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: '21px',
            fontWeight: '700',
            fontFamily: "'Orbitron', sans-serif",
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          Fin<span style={{ color: '#8C1A13' }}>Pay</span>{' '}
          <span style={{ opacity: 0.45, fontSize: '14px' }}>AFRICA</span>
        </div>
      </div>

      <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {['Products', 'Solutions', 'Enterprise'].map((label) => (
          <button
            key={label}
            style={{
              background: 'transparent',
              border: '1px solid rgba(140,26,19,0.25)',
              color: '#af2b21',
              padding: '6px 18px',
              borderRadius: '4px',
              fontSize: '11px',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: '600',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(140,26,19,0.6)'
              e.currentTarget.style.color = '#ffccbc'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(140,26,19,0.25)'
              e.currentTarget.style.color = '#af2b21'
            }}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </nav>
    </div>
  )
}

/** Active product info panel – bottom-left */
function ActiveProductPanel({ product }) {
  if (!product) return null
  return (
    <div
      key={product.id}
      style={{
        position: 'absolute',
        bottom: '48px',
        left: '40px',
        zIndex: 20,
        animation: 'fadeSlideIn 0.35s ease forwards',
      }}
    >
      <div
        style={{
          background: 'rgba(26, 5, 5, 0.82)',
          border: `1px solid ${product.accentColor}44`,
          borderRadius: '10px',
          padding: '14px 20px',
          backdropFilter: 'blur(12px)',
          boxShadow: `0 0 32px ${product.accentColor}22, 0 4px 24px rgba(0,0,0,0.5)`,
          minWidth: '190px',
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: '28px',
            height: '2px',
            background: product.accentColor,
            borderRadius: '1px',
            marginBottom: '10px',
            boxShadow: `0 0 8px ${product.accentColor}`,
          }}
        />
        <div
          style={{
            color: '#fbc9c9',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            marginBottom: '4px',
          }}
        >
          Now Viewing
        </div>
        <div
          style={{
            color: '#ffffff',
            fontSize: '18px',
            fontWeight: '700',
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: '0.04em',
          }}
        >
          {product.label}
        </div>
        {/* Feature pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginTop: '10px',
          }}
        >
          {product.annotations.map((ann, i) => (
            <span
              key={i}
              style={{
                background: `${product.accentColor}18`,
                border: `1px solid ${product.accentColor}44`,
                color: product.accentColor,
                fontSize: '9px',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: '700',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              {ann.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Dot indicator row showing which product is active */
function DotIndicator({ products, activeIndex }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '22px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        zIndex: 20,
      }}
    >
      {products.map((p, i) => (
        <div
          key={p.id}
          style={{
            width: i === activeIndex ? '22px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background:
              i === activeIndex ? p.accentColor : 'rgba(255,255,255,0.2)',
            boxShadow:
              i === activeIndex ? `0 0 8px ${p.accentColor}` : 'none',
            transition: 'all 0.35s ease',
          }}
        />
      ))}
    </div>
  )
}

/** Hover hint – bottom-right */
function HoverHint({ isHovered }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '22px',
        right: '40px',
        zIndex: 20,
        color: 'rgba(140,26,19,0.45)',
        fontSize: '10px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
        transition: 'opacity 0.3s',
        opacity: isHovered ? 0 : 1,
      }}
    >
      Hover to pause
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FINTECH SHOWCASE  (main exported component)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * FintechShowcase
 *
 * @param {object[]} products  – array of product descriptors (see DEFAULT_PRODUCTS)
 * @param {string}   height   – CSS height of the section (default '100vh')
 * @param {function} onProductChange – optional callback(index, product) when active changes
 */
export function FintechShowcase({
  products = DEFAULT_PRODUCTS,
  height = '100vh',
  onProductChange,
}) {
  const [activeIndex, setActiveIndex]   = useState(0)
  const [activeProduct, setActiveProduct] = useState(products[0] ?? null)
  const [isHovered, setIsHovered]       = useState(false)
  const autoPauseTimerRef = useRef(null)

  // Validate products prop
  const safeProducts = useMemo(
    () => products.filter(Boolean).slice(0, 8),
    [products]
  )

  const handleActiveChange = useCallback(
    (index, product) => {
      setActiveIndex(index)
      setActiveProduct(product)
      onProductChange?.(index, product)
      
      // Auto-pause for 5 seconds when product becomes active
      if (autoPauseTimerRef.current) {
        clearTimeout(autoPauseTimerRef.current)
      }
      setIsHovered(true)
      autoPauseTimerRef.current = setTimeout(() => {
        setIsHovered(false)
      }, 5000)
    },
    [onProductChange]
  )

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoPauseTimerRef.current) {
        clearTimeout(autoPauseTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      style={{
        width: '100%',
        height,
        background:
          'radial-gradient(ellipse at 50% 35%, #2a0c0c 0%, #1a0404 55%, #090101 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Rajdhani', 'Exo 2', sans-serif",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Google Fonts ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Orbitron:wght@400;700&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Suppress default pointer cursor inside canvas */
        canvas { outline: none; }
      `}</style>

      {/* ── Background particle dots (CSS-only, no perf cost) ────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(140,26,19,0.18) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── 3-D Canvas ───────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [-3.8, 1.6, 9.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]}
        shadows
        style={{ position: 'absolute', inset: 0, zIndex: 1 }}
      >
        <Scene
          products={safeProducts}
          isHovered={isHovered}
          onActiveChange={handleActiveChange}
        />
      </Canvas>

      {/* ── 2-D Overlays ─────────────────────────────────────────── */}
      <Header />
      <ActiveProductPanel product={activeProduct} />
      <DotIndicator products={safeProducts} activeIndex={activeIndex} />
      <HoverHint isHovered={isHovered} />

      {/* Top vignette */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '130px',
          background:
            'linear-gradient(to bottom, rgba(1,5,9,0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background:
            'linear-gradient(to top, rgba(1,5,9,0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 20,
          color: 'rgba(184, 27, 27, 0.88)',
          fontSize: '9px',
          letterSpacing: '0.45em',
          textTransform: 'uppercase',
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 600,
        }}
      >
        Powering Africa's Financial Future
      </div>
    </div>
  )
}
