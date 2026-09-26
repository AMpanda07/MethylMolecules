'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { DetailedElement } from '@/data/elements-data';

interface Structure3DViewerProps {
  element: DetailedElement;
  selectedShell: number | null; // 1-indexed shell index or null
  onSelectShell: (shellIndex: number) => void;
  isPlaying: boolean;
  playbackSpeed: number;
  densityMode: boolean;
  colorHex: string;
}

// ── 3D Nucleus Component ─────────────────────────────────────────────────────
function Nucleus({ protons, neutrons, colorHex }: { protons: number; neutrons: number; colorHex: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate sphere positions for subatomic particles
  const particles = useMemo(() => {
    const total = Math.min(protons + neutrons, 60); // Cap visual particles for high FPS
    const pList: { pos: [number, number, number]; isProton: boolean }[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < total; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
      const r = 0.55 * Math.cbrt(i + 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pList.push({
        pos: [x, y, z],
        isProton: i % 2 === 0
      });
    }
    return pList;
  }, [protons, neutrons]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glow sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial
          color={colorHex}
          emissive={colorHex}
          emissiveIntensity={0.6}
          roughness={0.2}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Proton and Neutron sphere cluster */}
      {particles.map((p, idx) => (
        <mesh key={idx} position={p.pos}>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial
            color={p.isProton ? '#EF4444' : '#3B82F6'}
            emissive={p.isProton ? '#DC2626' : '#2563EB'}
            emissiveIntensity={0.3}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Single Electron Shell Component ──────────────────────────────────────────
function ShellRing({
  shellIndex,
  electronCount,
  radius,
  isSelected,
  onSelect,
  isPlaying,
  playbackSpeed,
  densityMode,
  colorHex
}: {
  shellIndex: number;
  electronCount: number;
  radius: number;
  isSelected: boolean;
  onSelect: () => void;
  isPlaying: boolean;
  playbackSpeed: number;
  densityMode: boolean;
  colorHex: string;
}) {
  const electronsRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Shell tilt angle
  const tiltAngle = useMemo(() => (shellIndex * Math.PI) / 6, [shellIndex]);

  useFrame((_, delta) => {
    if (isPlaying && electronsRef.current) {
      // Inner shells orbit faster
      const speed = (2.5 / (shellIndex + 0.5)) * playbackSpeed;
      electronsRef.current.rotation.z += delta * speed;
    }
  });

  const shellLabels = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

  return (
    <group rotation={[tiltAngle, tiltAngle * 0.5, 0]}>
      {/* 3D Orbit ring geometry */}
      <mesh
        ref={ringRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <torusGeometry args={[radius, isSelected ? 0.04 : 0.02, 16, 64]} />
        <meshStandardMaterial
          color={isSelected ? '#3B82F6' : colorHex}
          emissive={isSelected ? '#60A5FA' : colorHex}
          emissiveIntensity={isSelected ? 0.8 : 0.25}
          transparent
          opacity={isSelected ? 0.9 : 0.4}
        />
      </mesh>

      {/* Orbiting electrons */}
      <group ref={electronsRef}>
        {Array.from({ length: electronCount }).map((_, ei) => {
          const angle = (2 * Math.PI * ei) / electronCount;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <group key={ei} position={[x, y, 0]}>
              <mesh>
                <sphereGeometry args={[densityMode ? 0.22 : 0.14, 16, 16]} />
                <meshStandardMaterial
                  color="#60A5FA"
                  emissive="#3B82F6"
                  emissiveIntensity={densityMode ? 0.9 : 0.6}
                />
              </mesh>
              {/* Electron glow in density mode */}
              {densityMode && (
                <mesh>
                  <sphereGeometry args={[0.38, 16, 16]} />
                  <meshBasicMaterial color="#93C5FD" transparent opacity={0.3} />
                </mesh>
              )}
            </group>
          );
        })}
      </group>

      {/* Interactive Shell Badge */}
      {isSelected && (
        <Html position={[radius + 0.3, 0, 0]} center>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            style={{
              background: '#1E293B',
              color: '#F8FAFC',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              border: '1px solid #3B82F6',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}
          >
            Shell {shellLabels[shellIndex - 1] || shellIndex} ({electronCount} e⁻)
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Main Scene Container ─────────────────────────────────────────────────────
export default function Structure3DViewer({
  element,
  selectedShell,
  onSelectShell,
  isPlaying,
  playbackSpeed,
  densityMode,
  colorHex
}: Structure3DViewerProps) {
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Calculate shell radii
  const shells = element.shellConfiguration;
  const maxRadius = 5.5;
  const step = shells.length > 0 ? maxRadius / (shells.length + 0.8) : 2.5;

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!webGlSupported ? (
        <StaticFallbackAtom element={element} />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          onCreated={() => setWebGlSupported(true)}
          onError={() => setWebGlSupported(false)}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3B82F6" />

          <Float speed={isPlaying ? 1 : 0} rotationIntensity={0.2} floatIntensity={0.2}>
            {/* Nucleus */}
            <Nucleus protons={element.protons} neutrons={element.neutrons} colorHex={colorHex} />

            {/* Electron Shells */}
            {shells.map((count, i) => {
              const shellIdx = i + 1;
              const radius = 1.6 + i * step;
              const isSelected = selectedShell === shellIdx;

              return (
                <ShellRing
                  key={i}
                  shellIndex={shellIdx}
                  electronCount={count}
                  radius={radius}
                  isSelected={isSelected}
                  onSelect={() => onSelectShell(shellIdx)}
                  isPlaying={isPlaying}
                  playbackSpeed={playbackSpeed}
                  densityMode={densityMode}
                  colorHex={colorHex}
                />
              );
            })}
          </Float>

          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={3} maxDistance={18} />
        </Canvas>
      )}
    </div>
  );
}

// ── 2D Static WebGL Fallback ─────────────────────────────────────────────────
function StaticFallbackAtom({ element }: { element: DetailedElement }) {
  const shells = element.shellConfiguration;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '20px' }}>
      <svg viewBox="0 0 200 200" style={{ width: '80%', maxHeight: '280px' }}>
        <circle cx="100" cy="100" r="16" fill="#3B82F6" opacity="0.8" />
        <text x="100" y="104" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
          {element.symbol}
        </text>

        {shells.map((count, i) => {
          const r = 30 + i * 22;
          return (
            <g key={i}>
              <circle cx="100" cy="100" r={r} stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.5" />
              {Array.from({ length: count }).map((_, ei) => {
                const angle = (2 * Math.PI * ei) / count;
                const ex = 100 + r * Math.cos(angle);
                const ey = 100 + r * Math.sin(angle);
                return <circle key={ei} cx={ex} cy={ey} r="4" fill="#2563EB" />;
              })}
            </g>
          );
        })}
      </svg>
      <span style={{ fontSize: '12px', color: '#64748B', marginTop: '8px' }}>
        Interactive 2D Mode (WebGL fallback)
      </span>
    </div>
  );
}
