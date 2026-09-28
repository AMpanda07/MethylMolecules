import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ElementDetailData } from '../types';
import { useAppStore } from '../state/useAppStore';

interface Orbital3DViewProps {
  element: ElementDetailData;
}

const SHELL_LABELS = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
const MAX_SHELL_POPULATIONS = [2, 8, 18, 32, 32, 18, 8];

export const Orbital3DView: React.FC<Orbital3DViewProps> = ({ element }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { settings } = useAppStore();

  const shellConfigs = element.shellConfiguration || [2, 4];
  const initialShell = shellConfigs.length > 1 ? 'L' : 'K';
  const [selectedShell, setSelectedShell] = useState<string>(initialShell);

  // References to keep Three.js objects across shell changes without rebuilding
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const particleCountRef = useRef<number>(16000);

  // Generate shell-specific quantum probability particle distribution
  const generateShellParticles = useCallback((shell: string, count: number, positions: Float32Array, colors: Float32Array) => {
    const shellIndex = SHELL_LABELS.indexOf(shell);
    const n = Math.max(1, shellIndex + 1);

    // Shell-specific color palettes
    const palettes: Record<string, { inner: THREE.Color; mid: THREE.Color; outer: THREE.Color }> = {
      K: { inner: new THREE.Color(0xffffff), mid: new THREE.Color(0xfbbf24), outer: new THREE.Color(0xd97706) }, // Gold/Amber core
      L: { inner: new THREE.Color(0x67e8f9), mid: new THREE.Color(0x06b6d4), outer: new THREE.Color(0x0284c7) }, // Cyan/Electric Blue
      M: { inner: new THREE.Color(0xf472b6), mid: new THREE.Color(0xc084fc), outer: new THREE.Color(0x7c3aed) }, // Magenta/Purple cloverleaf
      N: { inner: new THREE.Color(0x34d399), mid: new THREE.Color(0x10b981), outer: new THREE.Color(0x047857) }, // Emerald/Teal
      O: { inner: new THREE.Color(0xa78bfa), mid: new THREE.Color(0x6366f1), outer: new THREE.Color(0x312e81) }, // Sapphire/Indigo
      P: { inner: new THREE.Color(0xf87171), mid: new THREE.Color(0xef4444), outer: new THREE.Color(0x991b1b) }, // Crimson/Ruby
      Q: { inner: new THREE.Color(0xfbcfe8), mid: new THREE.Color(0xdb2777), outer: new THREE.Color(0x831843) }  // Rose
    };

    const palette = palettes[shell] || palettes.L;
    const baseRadius = 1.3 * n;

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, z = 0;

      if (n === 1) {
        // K Shell: Pure 1s Spherical Gaussian Wavefunction |ψ_1s|^2 ~ e^(-2r)
        const u1 = Math.max(1e-6, Math.random());
        const u2 = Math.random();
        const r = 1.6 * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      } else if (n === 2) {
        // L Shell: 2s (sphere with nodal gap) + 2p (3 orthogonal dumbbell lobes along X, Y, Z)
        const mode = Math.random();
        if (mode < 0.25) {
          // 2s radial node
          const r = 2.4 + (Math.random() * 2.2);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
        } else {
          // 2p lobes: dumbbell probability distribution (cos^2 or sin^2)
          const axisChoice = Math.floor(Math.random() * 3);
          const u = (Math.random() * 2 - 1);
          const lobeLen = 3.6 * Math.cbrt(Math.abs(u)) * Math.sign(u);
          const spread = 0.8 * Math.sqrt(Math.max(0, 1 - Math.pow(lobeLen / 3.6, 2)));
          const angle = Math.random() * Math.PI * 2;
          const w1 = spread * Math.cos(angle);
          const w2 = spread * Math.sin(angle);

          if (axisChoice === 0) {
            x = lobeLen; y = w1; z = w2;
          } else if (axisChoice === 1) {
            x = w1; y = lobeLen; z = w2;
          } else {
            x = w1; y = w2; z = lobeLen;
          }
        }
      } else if (n === 3) {
        // M Shell: 3s + 3p + 3d cloverleaf lobes
        const mode = Math.random();
        if (mode < 0.2) {
          const r = 4.2 + Math.random() * 2.5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          x = r * Math.sin(phi) * Math.cos(theta);
          y = r * Math.sin(phi) * Math.sin(theta);
          z = r * Math.cos(phi);
        } else {
          // 3d cloverleaf lobes: 4 lobes in XY plane or donut ring
          const theta = Math.random() * Math.PI * 2;
          const r = 5.2 * (0.6 + 0.4 * Math.sin(2 * theta));
          const zSpread = (Math.random() - 0.5) * 2.2;
          x = r * Math.cos(theta);
          y = r * Math.sin(theta);
          z = zSpread;
        }
      } else {
        // N, O, P, Q Shells: Broad higher-order wavefunctions with radial nodes
        const r = (baseRadius * 0.8) + (Math.random() * baseRadius * 0.7);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Distance-based color interpolation
      const dist = Math.sqrt(x * x + y * y + z * z);
      const normalizedDist = Math.min(dist / (baseRadius * 1.5), 1);
      const color = new THREE.Color();

      if (normalizedDist < 0.4) {
        color.lerpColors(palette.inner, palette.mid, normalizedDist / 0.4);
      } else {
        color.lerpColors(palette.mid, palette.outer, (normalizedDist - 0.4) / 0.6);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
  }, []);

  // Update existing buffer in-place when shell changes without re-initializing WebGL scene
  useEffect(() => {
    const geometry = geometryRef.current;
    if (!geometry) return;

    const positions = geometry.attributes.position.array as Float32Array;
    const colors = geometry.attributes.color.array as Float32Array;
    generateShellParticles(selectedShell, particleCountRef.current, positions, colors);

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  }, [selectedShell, generateShellParticles]);

  // One-time Three.js scene initialization per element
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Detect mobile or low-power device to scale particle count
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 8000 : 16000;
    particleCountRef.current = count;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060814);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    geometryRef.current = geometry;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    generateShellParticles(selectedShell, count, positions, colors);

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.07 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending
    });
    materialRef.current = material;

    const pointCloud = new THREE.Points(geometry, material);
    pointCloudRef.current = pointCloud;
    scene.add(pointCloud);

    // Mouse / Touch Drag Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !pointCloudRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      pointCloudRef.current.rotation.y += deltaX * 0.007;
      pointCloudRef.current.rotation.x += deltaY * 0.007;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !pointCloudRef.current || e.touches.length !== 1) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      pointCloudRef.current.rotation.y += deltaX * 0.007;
      pointCloudRef.current.rotation.x += deltaY * 0.007;

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    domEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    domEl.addEventListener('touchend', handleTouchEnd);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDraggingRef.current && pointCloudRef.current) {
        const speed = settings.reduceMotion ? 0.02 : 0.2;
        pointCloudRef.current.rotation.y += speed * delta;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Container Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      domEl.removeEventListener('touchmove', handleTouchMove);
      domEl.removeEventListener('touchend', handleTouchEnd);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [element, settings.reduceMotion, generateShellParticles]);

  return (
    <div className="orbitals-container" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Top Principal Quantum Shell Selector */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 30,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(10px)',
          borderRadius: '999px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
        role="tablist"
        aria-label="Electron shell selector"
      >
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', paddingRight: '4px', letterSpacing: '0.5px' }}>
          QUANTUM SHELL:
        </span>
        {SHELL_LABELS.map((lbl, idx) => {
          const hasElectrons = idx < shellConfigs.length;
          const isSelected = selectedShell === lbl;
          return (
            <button
              key={lbl}
              role="tab"
              aria-selected={isSelected}
              disabled={!hasElectrons}
              onClick={() => setSelectedShell(lbl)}
              aria-label={`Shell ${lbl} (${hasElectrons ? `${shellConfigs[idx]} electrons` : 'Unoccupied'})`}
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: 'none',
                background: isSelected ? '#38bdf8' : hasElectrons ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                color: isSelected ? '#0f172a' : hasElectrons ? '#ffffff' : '#64748b',
                fontWeight: 800,
                fontSize: '12px',
                cursor: hasElectrons ? 'pointer' : 'not-allowed',
                boxShadow: isSelected ? '0 0 12px rgba(56,189,248,0.5)' : 'none',
                transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {lbl}
            </button>
          );
        })}
      </div>

      {/* Quantum Model Subtitle Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '72px',
          right: '20px',
          zIndex: 20,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '8px 14px',
          fontSize: '11px',
          color: '#e2e8f0',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
          lineHeight: 1.4,
          maxWidth: '240px'
        }}
      >
        <div style={{ fontWeight: 700, color: '#38bdf8' }}>Shell {selectedShell} Quantum Cloud (|ψ|²)</div>
        <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
          Screened Hydrogenic Wavefunction · {shellConfigs[SHELL_LABELS.indexOf(selectedShell)] || 0} e⁻ occupied
        </div>
      </div>

      {/* 3D WebGL Viewport */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: '300px' }} />
    </div>
  );
};
