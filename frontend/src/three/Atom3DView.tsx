import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ElementDetailData } from '../types';

interface Atom3DViewProps {
  element: ElementDetailData;
}

export const Atom3DView: React.FC<Atom3DViewProps> = ({ element }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Root Group for rotation
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);

    // Nucleus Group
    const nucleusGroup = new THREE.Group();
    atomGroup.add(nucleusGroup);

    const protonsCount = element.level2_structure?.protons || element.id;
    const neutronsCount = element.level2_structure?.neutrons || Math.round(element.id * 1.2);

    const protonMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      roughness: 0.3,
      metalness: 0.2
    });
    const neutronMat = new THREE.MeshStandardMaterial({
      color: 0x8e8e93,
      roughness: 0.4,
      metalness: 0.1
    });

    const sphereGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const totalParticles = Math.min(protonsCount + neutronsCount, 60);

    for (let i = 0; i < totalParticles; i++) {
      const isProton = i % 2 === 0;
      const mesh = new THREE.Mesh(sphereGeo, isProton ? protonMat : neutronMat);
      
      const phi = Math.acos(-1 + (2 * i) / totalParticles);
      const theta = Math.sqrt(totalParticles * Math.PI) * phi;
      const r = 0.5 * Math.cbrt(totalParticles * 0.1) * (0.8 + Math.random() * 0.4);

      mesh.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      nucleusGroup.add(mesh);
    }

    // Electron Shells
    const shellConfig = element.shellConfiguration || [2, 4];
    const electronGroup = new THREE.Group();
    atomGroup.add(electronGroup);

    const electronMat = new THREE.MeshStandardMaterial({
      color: 0x007aff,
      emissive: 0x0040aa,
      roughness: 0.2
    });
    const electronGeo = new THREE.SphereGeometry(0.18, 16, 16);

    const shellMeshes: { mesh: THREE.Mesh; radius: number; speed: number; angle: number; tiltX: number; tiltZ: number }[] = [];

    shellConfig.forEach((count, sIdx) => {
      const radius = 2.2 + sIdx * 1.5;

      // Shell Ring Line
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segments = 64;
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      ringGeo.setFromPoints(points);

      const ringLineMat = new THREE.LineBasicMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Line(ringGeo, ringLineMat);

      const tiltX = (sIdx * 0.4) - 0.2;
      const tiltZ = (sIdx * 0.3);
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
          speed: 1.5 + (sIdx * 0.3),
          angle: baseAngle,
          tiltX,
          tiltZ
        });
      }
    });

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

      atomGroup.rotation.y += deltaX * 0.01;
      atomGroup.rotation.x += deltaY * 0.01;

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
        atomGroup.rotation.y += 0.2 * delta;
      }

      shellMeshes.forEach(item => {
        item.angle += item.speed * delta;
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

    // ResizeObserver for Container Resizing
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
      renderer.dispose();
    };
  }, [element]);

  return <div ref={mountRef} className="atom-3d-viewport" style={{ width: '100%', height: '100%', minHeight: '300px' }} />;
};
