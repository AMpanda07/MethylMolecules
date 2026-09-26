'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import { MOLECULES, MOLECULE_BY_SLUG, type Molecule, type AtomPosition, type Bond } from '@/data/molecules';
import styles from './MoleculeLab.module.css';

const COMMON_ATOMS = [
  { symbol: 'H', name: 'Hydrogen', color: '#FFFFFF', bg: '#F8F9FA', radius: 0.5 },
  { symbol: 'C', name: 'Carbon', color: '#404040', bg: '#E9ECEF', radius: 0.77 },
  { symbol: 'O', name: 'Oxygen', color: '#FF0D0D', bg: '#FFE3E3', radius: 0.73 },
  { symbol: 'N', name: 'Nitrogen', color: '#3050F8', bg: '#D0EBFF', radius: 0.75 },
  { symbol: 'S', name: 'Sulfur', color: '#FFFF30', bg: '#FFF3BF', radius: 1.02 },
  { symbol: 'Cl', name: 'Chlorine', color: '#1FF01F', bg: '#D3F9D8', radius: 0.99 },
  { symbol: 'F', name: 'Fluorine', color: '#90E050', bg: '#D8F5A2', radius: 0.71 },
  { symbol: 'P', name: 'Phosphorus', color: '#FF8000', bg: '#FFE8CC', radius: 1.06 },
  { symbol: 'Na', name: 'Sodium', color: '#AB5CF2', bg: '#E5D8F5', radius: 1.54 },
  { symbol: 'K', name: 'Potassium', color: '#8F40D4', bg: '#F3D9FA', radius: 1.96 },
  { symbol: 'Ca', name: 'Calcium', color: '#3DFF00', bg: '#D8F5C4', radius: 1.74 },
  { symbol: 'Fe', name: 'Iron', color: '#E06633', bg: '#EED9C4', radius: 1.25 },
];

const QUICK_MOLECULES = [
  { id: 'water', symbol: 'H₂O', name: 'Water', img: '💧' },
  { id: 'carbon-dioxide', symbol: 'CO₂', name: 'Carbon Dioxide', img: '💨' },
  { id: 'methane', symbol: 'CH₄', name: 'Methane', img: '🔥' },
  { id: 'ammonia', symbol: 'NH₃', name: 'Ammonia', img: '🧼' },
  { id: 'ethanol', symbol: 'C₂H₅OH', name: 'Ethanol', img: '🍷' },
];

export default function MoleculeLabClient() {
  const searchParams = useSearchParams();
  const initMol = searchParams.get('mol');
  
  const [style, setStyle] = useState<'ball-and-stick' | 'space-filling'>('ball-and-stick');
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [activeTool, setActiveTool] = useState<'select' | 'bond' | 'erase' | 'rotate' | 'zoom' | 'reset'>('rotate');
  const [bondType, setBondType] = useState<'single' | 'double' | 'triple'>('single');
  const [atomFilter, setAtomFilter] = useState<'common' | 'all' | 'organic'>('common');
  const [activeTab, setActiveTab] = useState<'overview' | 'structure' | '3d'>('overview');

  const [customAtoms, setCustomAtoms] = useState<AtomPosition[]>([]);
  const [customBonds, setCustomBonds] = useState<Bond[]>([]);
  
  const [selectedAtomIndex, setSelectedAtomIndex] = useState<number | null>(null);

  const workspaceRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      workspaceRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Load initial molecule
  useEffect(() => {
    let mol = MOLECULES[0];
    if (initMol && MOLECULE_BY_SLUG[initMol]) {
      mol = MOLECULE_BY_SLUG[initMol];
    }
    loadPreset(mol);
  }, [initMol]);

  const loadPreset = (mol: Molecule) => {
    setCustomAtoms(JSON.parse(JSON.stringify(mol.atoms)));
    setCustomBonds(JSON.parse(JSON.stringify(mol.bonds)));
    setSelectedAtomIndex(null);
  };

  const clearCanvas = () => {
    setCustomAtoms([]);
    setCustomBonds([]);
    setSelectedAtomIndex(null);
  };

  const addBenzene = () => {
    const radius = 1.4;
    const newAtoms: AtomPosition[] = [];
    const newBonds: Bond[] = [];
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      newAtoms.push({ element: 'C', x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: 0, radius: 0.77, color: '#404040' });
    }

    const hRadius = radius + 1.08;
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      newAtoms.push({ element: 'H', x: Math.cos(angle) * hRadius, y: Math.sin(angle) * hRadius, z: 0, radius: 0.5, color: '#FFFFFF' });
    }

    for (let i = 0; i < 6; i++) {
      newBonds.push({ from: i, to: (i + 1) % 6, type: i % 2 === 0 ? 'double' : 'single' });
      newBonds.push({ from: i, to: i + 6, type: 'single' });
    }
    
    setCustomAtoms(newAtoms);
    setCustomBonds(newBonds);
    setSelectedAtomIndex(null);
  };

  const addCyclohexane = () => {
    const radius = 1.5;
    const newAtoms: AtomPosition[] = [];
    const newBonds: Bond[] = [];
    
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * (Math.PI / 180);
      newAtoms.push({ element: 'C', x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: i % 2 === 0 ? 0.3 : -0.3, radius: 0.77, color: '#404040' });
    }

    for (let i = 0; i < 6; i++) {
      newBonds.push({ from: i, to: (i + 1) % 6, type: 'single' });
    }
    
    setCustomAtoms(newAtoms);
    setCustomBonds(newBonds);
    setSelectedAtomIndex(null);
  };

  const handleDragStart = (e: React.DragEvent, atom: any) => {
    e.dataTransfer.setData('atomSymbol', atom.symbol);
    e.dataTransfer.setData('atomColor', atom.color);
    e.dataTransfer.setData('atomRadius', atom.radius.toString());
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const symbol = e.dataTransfer.getData('atomSymbol');
    if (!symbol) return;
    
    const color = e.dataTransfer.getData('atomColor');
    const radius = parseFloat(e.dataTransfer.getData('atomRadius'));
    
    const rect = (e.target as HTMLElement).closest(`.${styles.canvasWrapper}`)?.getBoundingClientRect();
    if (!rect) return;

    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Approximate 3D position at z=0 given camera at z=8 and fov=45
    const h = 6.62; // 2 * 8 * Math.tan(45 / 2 * Math.PI / 180)
    const aspect = rect.width / rect.height;
    const w = h * aspect;

    const newAtom = {
      element: symbol,
      x: (nx * w) / 2,
      y: (ny * h) / 2,
      z: 0,
      radius: radius,
      color: color
    };

    setCustomAtoms(prev => [...prev, newAtom]);
  };

  const handleAtomClick = (index: number) => {
    if (activeTool === 'erase') {
      setCustomAtoms(prev => prev.filter((_, i) => i !== index));
      setCustomBonds(prev => prev.filter(b => b.from !== index && b.to !== index).map(b => ({
        ...b,
        from: b.from > index ? b.from - 1 : b.from,
        to: b.to > index ? b.to - 1 : b.to
      })));
      if (selectedAtomIndex === index) setSelectedAtomIndex(null);
    } else if (activeTool === 'select' || activeTool === 'rotate') {
      setSelectedAtomIndex(index);
    } else if (activeTool === 'bond') {
      if (selectedAtomIndex === null) {
        setSelectedAtomIndex(index);
      } else {
        if (selectedAtomIndex !== index) {
          // Check if bond already exists
          const exists = customBonds.find(b => (b.from === selectedAtomIndex && b.to === index) || (b.from === index && b.to === selectedAtomIndex));
          if (!exists) {
            setCustomBonds(prev => [...prev, { from: selectedAtomIndex, to: index, type: bondType }]);
          } else {
            // update type
            setCustomBonds(prev => prev.map(b => b === exists ? { ...b, type: bondType } : b));
          }
        }
        setSelectedAtomIndex(null);
      }
    }
  };

  const handleBondClick = (index: number) => {
    if (activeTool === 'erase') {
      setCustomBonds(prev => prev.filter((_, i) => i !== index));
    } else if (activeTool === 'bond') {
      // Toggle bond type if clicking on it with bond tool
      setCustomBonds(prev => prev.map((b, i) => i === index ? { ...b, type: bondType } : b));
    }
  };

  // Generate a fake formula from customAtoms for the UI
  const getCounts = () => {
    const counts: Record<string, number> = {};
    customAtoms.forEach(a => {
      counts[a.element] = (counts[a.element] || 0) + 1;
    });
    return counts;
  };
  const counts = getCounts();
  const generatedFormula = Object.entries(counts).map(([k, v]) => `${k}${v > 1 ? v : ''}`).join('');
  const generatedMass = customAtoms.reduce((acc, a) => acc + (COMMON_ATOMS.find(ca => ca.symbol === a.element)?.radius || 1) * 12, 0); // very fake mass

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Molecule Playground</h1>
            <p className={styles.subtitle}>Build, edit and explore molecules in 3D. Drag atoms, connect them, and learn their properties in real-time.</p>
          </div>
          <div className={styles.headerGraphics}>
            <div className={styles.sketchContainer}>
              <span className={styles.sketchText}>Explore<br/>Build<br/>Visualize<br/>Learn</span>
              <svg className={styles.sketchArrow} viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 40 Q 20 10 40 20" />
                <path d="M35 15 L 40 20 L 35 25" />
              </svg>
            </div>
            <button className={styles.howToUseBtn}>
              <span className={styles.playIcon}>▶</span> How to use?
            </button>
          </div>
        </div>
      </header>

      <div className={styles.workspace} ref={workspaceRef}>
        {/* Left Sidebar */}
        <aside className={styles.leftSidebar}>
          
          <div className={styles.panelSection}>
            <h2 className={styles.sectionTitle}>1. Choose Atoms</h2>
            <p className={styles.sectionSubtitle}>Drag atoms to the canvas</p>
            
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input type="text" placeholder="Search element..." className={styles.searchInput} />
            </div>

            <div className={styles.filterPills}>
              <button className={`${styles.filterPill} ${atomFilter === 'common' ? styles.filterPillActive : ''}`} onClick={() => setAtomFilter('common')}>Common</button>
              <button className={`${styles.filterPill} ${atomFilter === 'all' ? styles.filterPillActive : ''}`} onClick={() => setAtomFilter('all')}>All Elements</button>
              <button className={`${styles.filterPill} ${atomFilter === 'organic' ? styles.filterPillActive : ''}`} onClick={() => setAtomFilter('organic')}>Organic</button>
            </div>

            <div className={styles.atomGrid}>
              {COMMON_ATOMS.map(atom => (
                <div 
                  key={atom.symbol} 
                  className={styles.atomCard} 
                  style={{ backgroundColor: atom.bg }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, atom)}
                >
                  <span className={styles.atomSymbol} style={{ color: atom.color === '#FFFFFF' ? '#404040' : atom.color }}>{atom.symbol}</span>
                  <span className={styles.atomName}>{atom.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panelSection}>
            <h2 className={styles.sectionTitle}>2. Tools</h2>
            <p className={styles.sectionSubtitle}>Use tools to edit your molecule</p>
            
            <div className={styles.toolsGrid}>
              {[
                { id: 'select', icon: '👆', label: 'Select' },
                { id: 'bond', icon: '🔗', label: 'Bond' },
                { id: 'erase', icon: '🧽', label: 'Erase' },
                { id: 'rotate', icon: '🔄', label: 'Rotate' },
                { id: 'zoom', icon: '🔍', label: 'Zoom' },
              ].map(tool => (
                <button 
                  key={tool.id} 
                  className={`${styles.toolBtn} ${activeTool === tool.id ? styles.toolBtnActive : ''}`}
                  onClick={() => setActiveTool(tool.id as any)}
                >
                  <span className={styles.toolIcon}>{tool.icon}</span>
                  <span className={styles.toolLabel}>{tool.label}</span>
                </button>
              ))}
              <button className={styles.toolBtn} onClick={clearCanvas}>
                <span className={styles.toolIcon}>↺</span>
                <span className={styles.toolLabel}>Reset</span>
              </button>
            </div>

            <h3 className={styles.subLabel}>Bond Type</h3>
            <div className={styles.bondTypeGroup}>
              <button className={`${styles.bondBtn} ${bondType === 'single' ? styles.bondBtnActive : ''}`} onClick={() => setBondType('single')}>
                <span className={styles.bondIcon}>—</span>
                <span className={styles.bondLabel}>Single</span>
              </button>
              <button className={`${styles.bondBtn} ${bondType === 'double' ? styles.bondBtnActive : ''}`} onClick={() => setBondType('double')}>
                <span className={styles.bondIcon}>=</span>
                <span className={styles.bondLabel}>Double</span>
              </button>
              <button className={`${styles.bondBtn} ${bondType === 'triple' ? styles.bondBtnActive : ''}`} onClick={() => setBondType('triple')}>
                <span className={styles.bondIcon}>≡</span>
                <span className={styles.bondLabel}>Triple</span>
              </button>
            </div>
          </div>

        </aside>

        {/* Center Canvas */}
        <main className={styles.canvasArea}>
          
          <div className={styles.canvasHeader}>
            <div className={styles.viewTabs}>
              <button className={`${styles.viewTab} ${viewMode === '3D' ? styles.viewTabActive : ''}`} onClick={() => setViewMode('3D')}>3D View</button>
              <button className={`${styles.viewTab} ${viewMode === '2D' ? styles.viewTabActive : ''}`} onClick={() => setViewMode('2D')}>2D View</button>
            </div>
            
            <div className={styles.canvasControls}>
              <button className={styles.iconBtn} onClick={addCyclohexane} title="Cyclohexane Ring">⬡</button>
              <button className={styles.iconBtn} onClick={addBenzene} title="Benzene Ring">⏣</button>
              
              <div className={styles.spacer}></div>
              
              <select className={styles.styleSelect} value={style} onChange={(e) => setStyle(e.target.value as any)}>
                <option value="ball-and-stick">Ball & Stick</option>
                <option value="space-filling">Space Filling</option>
              </select>
              <button className={styles.iconBtn} onClick={toggleFullscreen}>⛶</button>
            </div>
          </div>

          <div 
            className={styles.canvasWrapper}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className={styles.canvasPaper}>
              {viewMode === '3D' ? (
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <color attach="background" args={['transparent']} />
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
                  <directionalLight position={[-10, -10, -5]} intensity={0.5} />
                  <Environment preset="studio" />
                  <Suspense fallback={null}>
                    <group position={[0, 0, 0]}>
                      {customAtoms.map((atom, i) => (
                        <AtomNode 
                          key={`atom-${i}`} 
                          atom={atom} 
                          style={style} 
                          isSelected={selectedAtomIndex === i}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAtomClick(i);
                          }} 
                        />
                      ))}
                      
                      {style === 'ball-and-stick' && customBonds.map((bond, i) => {
                        const a1 = customAtoms[bond.from];
                        const a2 = customAtoms[bond.to];
                        if (!a1 || !a2) return null;
                        return (
                          <BondCylinder 
                            key={`bond-${i}`} 
                            a1={a1} 
                            a2={a2} 
                            type={bond.type} 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBondClick(i);
                            }}
                          />
                        );
                      })}
                    </group>
                    <ContactShadows position={[0, -3, 0]} opacity={0.2} scale={15} blur={2.5} far={4} />
                  </Suspense>
                  <OrbitControls 
                    enablePan={activeTool === 'select'} 
                    enableRotate={activeTool === 'rotate'}
                    enableZoom={activeTool === 'zoom' || activeTool === 'rotate'}
                    minDistance={2} 
                    maxDistance={20} 
                    autoRotate={false}
                  />
                </Canvas>
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 5 }}>
                  <svg viewBox="-10 -10 20 20" style={{ width: '80%', height: '80%', overflow: 'visible' }}>
                    {customBonds.map((bond, i) => {
                      const a1 = customAtoms[bond.from];
                      const a2 = customAtoms[bond.to];
                      if (!a1 || !a2) return null;
                      return (
                        <g key={`2d-bond-${i}`}>
                          {bond.type === 'single' && <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="var(--ink)" strokeWidth={0.15} />}
                          {bond.type === 'double' && (
                            <>
                              <line x1={a1.x} y1={a1.y - 0.2} x2={a2.x} y2={a2.y - 0.2} stroke="var(--ink)" strokeWidth={0.1} />
                              <line x1={a1.x} y1={a1.y + 0.2} x2={a2.x} y2={a2.y + 0.2} stroke="var(--ink)" strokeWidth={0.1} />
                            </>
                          )}
                          {bond.type === 'triple' && (
                            <>
                              <line x1={a1.x} y1={a1.y - 0.3} x2={a2.x} y2={a2.y - 0.3} stroke="var(--ink)" strokeWidth={0.1} />
                              <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="var(--ink)" strokeWidth={0.1} />
                              <line x1={a1.x} y1={a1.y + 0.3} x2={a2.x} y2={a2.y + 0.3} stroke="var(--ink)" strokeWidth={0.1} />
                            </>
                          )}
                        </g>
                      );
                    })}
                    {customAtoms.map((atom, i) => (
                      <g key={`2d-atom-${i}`} transform={`translate(${atom.x}, ${atom.y})`} style={{ cursor: 'pointer' }} onClick={() => handleAtomClick(i)}>
                        <circle r={0.7} fill={atom.color} stroke={selectedAtomIndex === i ? '#1E5FCC' : '#FFF'} strokeWidth={0.1} />
                        <text textAnchor="middle" dominantBaseline="central" fontSize={0.7} fill={atom.color === '#FFFFFF' ? '#000' : '#FFF'} fontWeight="bold" pointerEvents="none">{atom.element}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              )}
              
              {/* Sketch annotations on canvas */}
              <div className={styles.canvasAnnotations}>
                <div className={styles.sketchTopLeft}>
                  <svg width="80" height="80" viewBox="0 0 100 100" stroke="var(--muted)" fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
                    <path d="M50 20 L20 80 L80 80 Z" />
                    <circle cx="50" cy="20" r="4" />
                    <circle cx="20" cy="80" r="4" />
                    <circle cx="80" cy="80" r="4" />
                    <circle cx="50" cy="50" r="4" />
                    <path d="M50 50 L50 20 M50 50 L20 80 M50 50 L80 80" />
                  </svg>
                </div>
                <div className={styles.sketchBottomRight}>
                  <svg width="60" height="60" viewBox="0 0 100 100" stroke="var(--muted)" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                    <path d="M20 50 Q 50 80 80 20" />
                    <path d="M70 20 L 80 20 L 80 30" />
                  </svg>
                  <span className={styles.handwriting}>Drag to rotate<br/>Scroll to zoom</span>
                </div>
                <div className={styles.sketchTopRight}>
                  <span className={styles.handwritingFormula}>{generatedFormula}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.quickMoleculesStrip}>
            <div className={styles.quickLabel}>
              <span className={styles.quickIcon}>💡</span>
              <span className={styles.quickText}>Quick<br/>Molecules</span>
            </div>
            
            <div className={styles.quickGrid}>
              {QUICK_MOLECULES.map(m => (
                <button 
                  key={m.id} 
                  className={styles.quickCard}
                  onClick={() => {
                    const mol = MOLECULE_BY_SLUG[m.id];
                    if (mol) loadPreset(mol);
                  }}
                >
                  <div className={styles.quickMolImage}>{m.img}</div>
                  <div className={styles.quickMolSymbol}>{m.symbol}</div>
                  <div className={styles.quickMolName}>{m.name}</div>
                </button>
              ))}
              <button className={styles.quickArrowBtn}>›</button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

// ── 3D Molecule Components ────────────────────────────────────────────────

function AtomNode({ atom, style, isSelected, onClick }: { atom: AtomPosition, style: string, isSelected?: boolean, onClick?: (e:any) => void }) {
  const scale = style === 'space-filling' ? atom.radius * 1.5 : atom.radius * 0.7;
  
  const material = new THREE.MeshPhysicalMaterial({
    color: atom.color,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    emissive: isSelected ? '#1E5FCC' : '#000000',
    emissiveIntensity: isSelected ? 0.3 : 0,
  });

  return (
    <mesh 
      position={[atom.x, atom.y, atom.z]} 
      scale={scale} 
      material={material} 
      castShadow 
      receiveShadow
      onClick={onClick}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {style === 'ball-and-stick' && (
        <Text
          position={[0, 0, 1.1]}
          fontSize={0.8}
          color={atom.color === '#FFFFFF' || atom.color === '#EAEAEA' ? '#000000' : '#FFFFFF'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {atom.element}
        </Text>
      )}
    </mesh>
  );
}

function BondCylinder({ a1, a2, type, onClick }: { a1: AtomPosition, a2: AtomPosition, type: 'single' | 'double' | 'triple', onClick?: (e:any) => void }) {
  const start = new THREE.Vector3(a1.x, a1.y, a1.z);
  const end = new THREE.Vector3(a2.x, a2.y, a2.z);
  
  const distance = start.distanceTo(end);
  const position = start.clone().lerp(end, 0.5);
  
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const direction = new THREE.Vector3().subVectors(end, start).normalize();
  quaternion.setFromUnitVectors(up, direction);
  
  const material = new THREE.MeshStandardMaterial({
    color: '#D8D8D8',
    roughness: 0.3,
    metalness: 0.3,
  });

  const radius = 0.15;
  const spacing = 0.35;

  return (
    <group position={position} quaternion={quaternion} onClick={onClick}>
      {type === 'single' && (
        <mesh material={material} castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius, distance, 16]} />
        </mesh>
      )}
      {type === 'double' && (
        <>
          <mesh position={[spacing, 0, 0]} material={material} castShadow receiveShadow>
            <cylinderGeometry args={[radius * 0.8, radius * 0.8, distance, 16]} />
          </mesh>
          <mesh position={[-spacing, 0, 0]} material={material} castShadow receiveShadow>
            <cylinderGeometry args={[radius * 0.8, radius * 0.8, distance, 16]} />
          </mesh>
        </>
      )}
      {type === 'triple' && (
        <>
          <mesh position={[0, 0, spacing]} material={material} castShadow receiveShadow>
            <cylinderGeometry args={[radius * 0.7, radius * 0.7, distance, 16]} />
          </mesh>
          <mesh position={[spacing * 0.866, 0, -spacing * 0.5]} material={material} castShadow receiveShadow>
            <cylinderGeometry args={[radius * 0.7, radius * 0.7, distance, 16]} />
          </mesh>
          <mesh position={[-spacing * 0.866, 0, -spacing * 0.5]} material={material} castShadow receiveShadow>
            <cylinderGeometry args={[radius * 0.7, radius * 0.7, distance, 16]} />
          </mesh>
        </>
      )}
    </group>
  );
}

// ── Utilities ─────────────────────────────────────────────────────────────

function formatFormula(formula: string) {
  return formula.replace(/\d+/g, match => {
    const subs = ['₀','₁','₂','³','₄','₅','₆','₇','₈','₉'];
    return match.split('').map(d => subs[parseInt(d)] || d).join('');
  });
}
