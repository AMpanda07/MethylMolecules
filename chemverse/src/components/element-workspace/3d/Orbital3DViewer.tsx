'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { OrbitalDefinition } from '@/data/orbital-data';

interface Orbital3DViewerProps {
  orbital: OrbitalDefinition;
  isPlaying: boolean;
}

// ── 3D Procedural Orbital Geometry Component ─────────────────────────────────
function OrbitalShape({ orbital, isPlaying }: { orbital: OrbitalDefinition; isPlaying: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (isPlaying && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const { type, scale, lobeCount = 4, rotationOffset = [0, 0, 0], hasTorus } = orbital.renderParams;

  // Render shapes based on orbital family & type
  return (
    <group ref={meshRef} rotation={rotationOffset}>
      {/* Type: Spherical (s orbitals) */}
      {type === 'sphere' && (
        <group>
          <mesh>
            <sphereGeometry args={[scale, 32, 32]} />
            <meshStandardMaterial
              color={orbital.colorPrimary}
              emissive={orbital.colorPrimary}
              emissiveIntensity={0.5}
              transparent
              opacity={0.45}
              roughness={0.1}
            />
          </mesh>

          {/* Concentric node shell for 2s / 3s */}
          {orbital.radialNodes > 0 && (
            <mesh>
              <sphereGeometry args={[scale * 0.5, 32, 32]} />
              <meshStandardMaterial
                color={orbital.colorSecondary}
                emissive={orbital.colorSecondary}
                emissiveIntensity={0.8}
                transparent
                opacity={0.7}
              />
            </mesh>
          )}
        </group>
      )}

      {/* Type: Dumbbell (p orbitals) */}
      {type === 'dumbbell' && (
        <group>
          {/* Positive Lobe (Top) */}
          <mesh position={[0, scale * 0.65, 0]}>
            <sphereGeometry args={[scale * 0.55, 32, 32]} />
            <meshStandardMaterial
              color="#3B82F6"
              emissive="#2563EB"
              emissiveIntensity={0.6}
              transparent
              opacity={0.65}
            />
          </mesh>
          {/* Negative Lobe (Bottom) */}
          <mesh position={[0, -scale * 0.65, 0]}>
            <sphereGeometry args={[scale * 0.55, 32, 32]} />
            <meshStandardMaterial
              color="#EC4899"
              emissive="#DB2777"
              emissiveIntensity={0.6}
              transparent
              opacity={0.65}
            />
          </mesh>
          {/* Central Nodal Ring Indicator */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[scale * 0.2, 0.015, 16, 32]} />
            <meshBasicMaterial color="#94A3B8" transparent opacity={0.5} />
          </mesh>
        </group>
      )}

      {/* Type: Donut / z² (3d_z² orbital) */}
      {type === 'donut' && (
        <group>
          {/* Z-axis Lobes */}
          <mesh position={[0, scale * 0.7, 0]}>
            <sphereGeometry args={[scale * 0.5, 32, 32]} />
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.6} transparent opacity={0.65} />
          </mesh>
          <mesh position={[0, -scale * 0.7, 0]}>
            <sphereGeometry args={[scale * 0.5, 32, 32]} />
            <meshStandardMaterial color="#10B981" emissive="#059669" emissiveIntensity={0.6} transparent opacity={0.65} />
          </mesh>
          {/* Equator Donut Torus */}
          {hasTorus && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[scale * 0.6, scale * 0.22, 24, 48]} />
              <meshStandardMaterial color="#F59E0B" emissive="#D97706" emissiveIntensity={0.6} transparent opacity={0.7} />
            </mesh>
          )}
        </group>
      )}

      {/* Type: Clover (3d_xy, 3d_x2-y2) */}
      {type === 'clover' && (
        <group>
          {Array.from({ length: lobeCount }).map((_, i) => {
            const angle = (2 * Math.PI * i) / lobeCount;
            const r = scale * 0.75;
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const isPositive = i % 2 === 0;

            return (
              <mesh key={i} position={[x, y, 0]}>
                <sphereGeometry args={[scale * 0.45, 32, 32]} />
                <meshStandardMaterial
                  color={isPositive ? '#10B981' : '#EC4899'}
                  emissive={isPositive ? '#059669' : '#DB2777'}
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.65}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* Type: Multi-Lobe (4f orbitals) */}
      {type === 'multi-lobe' && (
        <group>
          {Array.from({ length: 8 }).map((_, i) => {
            const phi = Math.floor(i / 4) === 0 ? Math.PI / 4 : (3 * Math.PI) / 4;
            const theta = ((i % 4) * Math.PI) / 2 + Math.PI / 4;
            const r = scale * 0.65;

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            const isPos = i % 2 === 0;

            return (
              <mesh key={i} position={[x, y, z]}>
                <sphereGeometry args={[scale * 0.35, 24, 24]} />
                <meshStandardMaterial
                  color={isPos ? '#8B5CF6' : '#F59E0B'}
                  emissive={isPos ? '#7C3AED' : '#D97706'}
                  emissiveIntensity={0.6}
                  transparent
                  opacity={0.65}
                />
              </mesh>
            );
          })}
        </group>
      )}
    </group>
  );
}

// ── 3D Coordinate Axes Visualizer ───────────────────────────────────────────
function CoordinateAxes() {
  return (
    <group opacity={0.4}>
      {/* X Axis (Red) */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5, 0, 0), new THREE.Vector3(3.5, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#EF4444" opacity={0.4} transparent />
      </line>
      {/* Y Axis (Green) */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -3.5, 0), new THREE.Vector3(0, 3.5, 0)])} />
        <lineBasicMaterial attach="material" color="#22C55E" opacity={0.4} transparent />
      </line>
      {/* Z Axis (Blue) */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -3.5), new THREE.Vector3(0, 0, 3.5)])} />
        <lineBasicMaterial attach="material" color="#3B82F6" opacity={0.4} transparent />
      </line>
    </group>
  );
}

export default function Orbital3DViewer({ orbital, isPlaying }: Orbital3DViewerProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.9} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />

        <CoordinateAxes />

        <Float speed={isPlaying ? 1 : 0} rotationIntensity={0.15} floatIntensity={0.15}>
          <OrbitalShape orbital={orbital} isPlaying={isPlaying} />
        </Float>

        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2.5} maxDistance={14} />
      </Canvas>
    </div>
  );
}
