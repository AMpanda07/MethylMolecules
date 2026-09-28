import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ElementDetailData } from '../types';
import { WebGLFallback } from '../components/WebGLFallback';
import { useAppStore } from '../state/useAppStore';

interface Atom3DViewProps {
  element: ElementDetailData;
}

const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const Atom3DView: React.FC<Atom3DViewProps> = ({ element }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLSupported] = useState<boolean>(isWebGLAvailable);
  const { settings } = useAppStore();

  const protonsCount = element.level2_structure?.protons || element.id;
  const neutronsCount =
    element.level2_structure?.neutrons ||
    Math.max(0, Math.round(Number(element.level2_structure?.avgMass || element.id * 2)) - element.id);
  const electronsCount = element.level2_structure?.electrons || element.id;

  const totalNucleons = protonsCount + neutronsCount;
  const isNucleusScaled = totalNucleons > 64;

  useEffect(() => {
    if (!webGLSupported) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const shellConfig = element.shellConfiguration || [2, 4];
    const maxShellRadius = 2.4 + Math.max(0, shellConfig.length - 1) * 1.4;
    const targetZ = Math.max(8.5, maxShellRadius * 1.55);
    camera.position.set(0, 0, targetZ);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    backLight.position.set(-5, -5, -5);
    scene.add(backLight);

    // Root Group for rotation
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus Group
    const nucleusGroup = new THREE.Group();
    atomGroup.add(nucleusGroup);

    const protonMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.35,
      metalness: 0.15
    });
    const neutronMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.45,
      metalness: 0.1
    });

    const sphereGeo = new THREE.SphereGeometry(0.28, 16, 16);

    // Representative or exact nucleon particle count
    const visualNucleonCount = Math.min(totalNucleons, 64);
    const protonRatio = protonsCount / Math.max(1, totalNucleons);

    for (let i = 0; i < visualNucleonCount; i++) {
      // Preserve accurate proton-to-neutron ratio
      const isProton = (i / visualNucleonCount) < protonRatio;
      const mesh = new THREE.Mesh(sphereGeo, isProton ? protonMat : neutronMat);

      const phi = Math.acos(-1 + (2 * i) / Math.max(1, visualNucleonCount));
      const theta = Math.sqrt(visualNucleonCount * Math.PI) * phi;
      const r = 0.42 * Math.cbrt(visualNucleonCount * 0.15) * (0.8 + (i % 3) * 0.15);

      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      nucleusGroup.add(mesh);
    }

    // Electron Shells
    const electronGroup = new THREE.Group();
    atomGroup.add(electronGroup);

    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0369a1,
      roughness: 0.2
    });
    const electronGeo = new THREE.SphereGeometry(0.18, 16, 16);

    const shellMeshes: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      tiltX: number;
      tiltZ: number;
    }[] = [];

    const ringGeometries: THREE.BufferGeometry[] = [];
    const ringMaterials: THREE.LineBasicMaterial[] = [];

    shellConfig.forEach((count, sIdx) => {
      const radius = 2.4 + sIdx * 1.4;

      // Shell Ring Line
      const ringGeo = new THREE.BufferGeometry();
      ringGeometries.push(ringGeo);
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      ringGeo.setFromPoints(points);

      const ringLineMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.4
      });
      ringMaterials.push(ringLineMat);

      const ringMesh = new THREE.Line(ringGeo, ringLineMat);

      const tiltX = sIdx * 0.35 - 0.2;
      const tiltZ = sIdx * 0.25;
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.z = tiltZ;
      electronGroup.add(ringMesh);

      // Electrons on shell
      for (let e = 0; e < count; e++) {
        const eMesh = new THREE.Mesh(electronGeo, electronMat);
        electronGroup.add(eMesh);
        const baseAngle = (e / count) * Math.PI * 2;
        shellMeshes.push({
          mesh: eMesh,
          radius,
          speed: 1.4 + sIdx * 0.25,
          angle: baseAngle,
          tiltX,
          tiltZ
        });
      }
    });

    // Mouse & Touch Drag Interaction
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

      atomGroup.rotation.y += deltaX * 0.01;
      atomGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

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

      atomGroup.rotation.y += deltaX * 0.01;
      atomGroup.rotation.x += deltaY * 0.01;

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

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        const speed = settings.reduceMotion ? 0.03 : 0.22;
        atomGroup.rotation.y += speed * delta;
      }

      shellMeshes.forEach((item) => {
        const speedMultiplier = settings.reduceMotion ? 0.2 : 1;
        item.angle += item.speed * speedMultiplier * delta;
        const x = Math.cos(item.angle) * item.radius;
        const y = Math.sin(item.angle) * item.radius;

        const pos = new THREE.Vector3(x, y, 0);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), item.tiltX);
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), item.tiltZ);

        item.mesh.position.copy(pos);
      });

      renderer.render(scene, camera);
    };

    animate();

    // ResizeObserver
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

      sphereGeo.dispose();
      protonMat.dispose();
      neutronMat.dispose();
      electronMat.dispose();
      electronGeo.dispose();
      ringGeometries.forEach((g) => g.dispose());
      ringMaterials.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [element, webGLSupported, settings.reduceMotion, protonsCount, neutronsCount, totalNucleons]);

  if (!webGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Informative model subtitle documenting representative scale */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(8px)',
          borderRadius: '12px',
          padding: '6px 12px',
          fontSize: '11px',
          color: '#334155',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          pointerEvents: 'none',
          lineHeight: 1.35
        }}
      >
        <div style={{ fontWeight: 700, color: '#0f172a' }}>Bohr-Rutherford Model</div>
        <div>
          <span style={{ color: '#ef4444', fontWeight: 600 }}>● {protonsCount}p⁺</span>{' '}
          <span style={{ color: '#64748b', fontWeight: 600 }}>● {neutronsCount}n⁰</span>{' '}
          <span style={{ color: '#0284c7', fontWeight: 600 }}>● {electronsCount}e⁻</span>
        </div>
        {isNucleusScaled && (
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
            Representative nucleus scale (64 clustered nucleons)
          </div>
        )}
      </div>

      <div
        ref={mountRef}
        className="atom-3d-viewport"
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
      />
    </div>
  );
};
