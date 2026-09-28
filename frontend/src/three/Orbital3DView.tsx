import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ElementDetailData } from '../types';

interface Orbital3DViewProps {
  element: ElementDetailData;
}

export const Orbital3DView: React.FC<Orbital3DViewProps> = ({ element }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedShell, setSelectedShell] = useState<string>('L');

  const shellLabels = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];
  const shellConfigs = element.shellConfiguration || [2, 4];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060814);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Cloud Geometry
    const particleCount = 25000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cInner = new THREE.Color(0xffff00);
    const cMid = new THREE.Color(0x00f2fe);
    const cOuter = new THREE.Color(0x0040ff);

    for (let i = 0; i < particleCount; i++) {
      const u1 = Math.random();
      const u2 = Math.random();
      const r = 4.5 * Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const dist = Math.abs(r) / 5;
      const col = new THREE.Color();
      if (dist < 0.3) {
        col.lerpColors(cInner, cMid, dist / 0.3);
      } else {
        col.lerpColors(cMid, cOuter, Math.min((dist - 0.3) / 0.7, 1));
      }

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      pointCloud.rotation.y += deltaX * 0.008;
      pointCloud.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      pointCloud.rotation.y += deltaX * 0.008;
      pointCloud.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    domEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    domEl.addEventListener('touchend', handleTouchEnd);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        pointCloud.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };

    animate();

    // ResizeObserver for container resizing
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
      cancelAnimationFrame(animationFrameId);
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
  }, [element, selectedShell]);

  const maxShellPopulations = [2, 8, 18, 32, 32, 18, 8];

  return (
    <div className="orbitals-container">
      {/* Left Panel: Shells and Shell Population Controls */}
      <div className="orbitals-left-panel" style={{ background: '#faf8f5', borderRight: '1px solid rgba(0,0,0,0.06)', boxSizing: 'border-box', padding: '24px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#8e8e93', display: 'block', marginBottom: '10px' }}>
            SHELLS
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {shellLabels.map((lbl, idx) => {
              const hasElectrons = idx < shellConfigs.length;
              return (
                <button
                  key={lbl}
                  disabled={!hasElectrons}
                  onClick={() => setSelectedShell(lbl)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: selectedShell === lbl ? '#0a0c1a' : (hasElectrons ? 'rgba(0,0,0,0.05)' : 'rgba(0,0,0,0.02)'),
                    color: selectedShell === lbl ? '#fff' : (hasElectrons ? '#1a1a1a' : '#ccc'),
                    fontWeight: 700,
                    cursor: hasElectrons ? 'pointer' : 'default',
                    transition: 'all 0.2s'
                  }}
                >
                  {lbl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Shell Population Bars */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#8e8e93' }}>
              SHELL POPULATION
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>
              {element.level2_structure?.electrons || element.id} e⁻
            </span>
          </div>

          {shellConfigs.map((count, idx) => {
            const max = maxShellPopulations[idx] || 8;
            const pct = (count / max) * 100;
            return (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  <span>{shellLabels[idx]}</span>
                  <span>{count}/{max}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(0,0,0,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: '#0a0c1a', borderRadius: '2px' }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 'auto', fontSize: '10px', color: '#8e8e93', letterSpacing: '0.5px' }}>
          ● CONFIGURATION-AVERAGED DENSITY - SCREENED HYDROGENIC MODEL
        </div>
      </div>

      {/* Right 3D Viewport */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: '300px' }} />
      </div>
    </div>
  );
};
