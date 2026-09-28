import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ElementDetailData } from '../../types';
import { useAppStore } from '../../state/useAppStore';
import { ChevronLeft, ChevronRight, X, Sparkles, Move3d, Loader2 } from 'lucide-react';
import { getElementBlock, resolveElementId } from '../../utils/chemistry';
import { getElementDetails, getCachedElementDetails, prefetchElementDetails } from '../../services/elementService';

// Dynamic Lazy Imports for Heavy Visualization Components
const Atom3DView = lazy(() =>
  import('../../three/Atom3DView').then((m) => ({ default: m.Atom3DView }))
);

const Orbital3DView = lazy(() =>
  import('../../three/Orbital3DView').then((m) => ({ default: m.Orbital3DView }))
);

const ArchiveView = lazy(() =>
  import('./ArchiveView').then((m) => ({ default: m.ArchiveView }))
);

// Fallback Loading Skeleton for Visual Viewport
const ViewportSkeleton: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      minHeight: '320px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(15, 23, 42, 0.95)',
      color: '#ffffff',
      gap: '12px'
    }}
  >
    <Loader2 size={32} className="animate-spin" color="#38bdf8" />
    <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8', letterSpacing: '0.5px' }}>
      Loading {label}...
    </span>
  </div>
);

export const ElementDetailModal: React.FC = () => {
  const {
    selectedElementId,
    setSelectedElementId,
    elementDetailTab,
    setElementDetailTab
  } = useAppStore();

  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [element, setElement] = useState<ElementDetailData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const resolvedId = resolveElementId(selectedElementId);
  const currentId = resolvedId !== null ? Number(resolvedId) : 0;

  // Unconditional Data Loading Effect
  useEffect(() => {
    if (resolvedId === null) {
      setElement(null);
      setIsLoading(false);
      setLoadError(null);
      return;
    }

    // Check in-memory cache first for instant render
    const cached = getCachedElementDetails(resolvedId);
    if (cached) {
      setElement(cached);
      setIsLoading(false);
      setLoadError(null);
      prefetchElementDetails(resolvedId);
      return;
    }

    let isSubscribed = true;
    setIsLoading(true);
    setLoadError(null);

    getElementDetails(resolvedId)
      .then((data) => {
        if (!isSubscribed) return;
        if (data) {
          setElement(data);
          setLoadError(null);
          prefetchElementDetails(resolvedId);
        } else {
          setElement(null);
          setLoadError(`Chemical detail record for atomic number ${resolvedId} not found.`);
        }
      })
      .catch((err) => {
        if (!isSubscribed) return;
        setElement(null);
        setLoadError(`Failed to load element details: ${err.message || err}`);
      })
      .finally(() => {
        if (isSubscribed) setIsLoading(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [resolvedId, selectedElementId]);

  const handleClose = useCallback(() => {
    setSelectedElementId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('element');
    url.searchParams.delete('tab');
    window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
  }, [setSelectedElementId]);

  const getElementUrl = useCallback((symbol: string, tab: string) => {
    return tab === 'structure' ? `?element=${symbol}` : `?element=${symbol}&tab=${tab}`;
  }, []);

  const handlePrev = useCallback(() => {
    if (currentId > 1) {
      const prevId = currentId - 1;
      setSelectedElementId(prevId);
      getElementDetails(prevId).then((prevEl) => {
        if (prevEl) {
          window.history.pushState({}, '', getElementUrl(prevEl.symbol, elementDetailTab));
        }
      });
    }
  }, [currentId, setSelectedElementId, elementDetailTab, getElementUrl]);

  const handleNext = useCallback(() => {
    if (currentId < 118) {
      const nextId = currentId + 1;
      setSelectedElementId(nextId);
      getElementDetails(nextId).then((nextEl) => {
        if (nextEl) {
          window.history.pushState({}, '', getElementUrl(nextEl.symbol, elementDetailTab));
        }
      });
    }
  }, [currentId, setSelectedElementId, elementDetailTab, getElementUrl]);

  const handleTabChange = useCallback((tab: 'structure' | 'orbitals' | 'archive') => {
    setElementDetailTab(tab);
    if (element) {
      window.history.replaceState({}, '', getElementUrl(element.symbol, tab));
    }
  }, [setElementDetailTab, element, getElementUrl]);

  // Keyboard navigation effect
  useEffect(() => {
    if (!selectedElementId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
        } else {
          handleClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === '1') {
        handleTabChange('structure');
      } else if (e.key === '2') {
        handleTabChange('orbitals');
      } else if (e.key === '3') {
        handleTabChange('archive');
      } else if (e.key === '?') {
        setIsHelpOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, currentId, elementDetailTab, isHelpOpen, handleClose, handlePrev, handleNext, handleTabChange]);

  // Conditional JSX Return ONLY after all hooks execute
  if (selectedElementId === null || selectedElementId === undefined || resolvedId === null) {
    return null;
  }

  if (loadError) {
    return (
      <div id="element-modal" className="element-detail-overlay active" onClick={handleClose}>
        <div
          className="element-detail-modal"
          id="modal-content-primary"
          style={{ padding: '40px', textAlign: 'center', maxWidth: '440px', margin: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ef4444' }}>
            Element Record Error
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            {loadError}
          </p>
          <button
            className="nav-pill-btn active"
            onClick={handleClose}
            style={{ padding: '8px 24px', cursor: 'pointer' }}
          >
            Return to Periodic Table
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !element) {
    return (
      <div id="element-modal" className="element-detail-overlay active">
        <div className="element-detail-modal" style={{ padding: '48px', textAlign: 'center', maxWidth: '400px', margin: 'auto' }}>
          <Loader2 size={36} className="animate-spin" color="#0284c7" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Loading Element #{currentId}...
          </h3>
        </div>
      </div>
    );
  }

  const electronBlock = getElementBlock(element.id);

  return (
    <div id="element-modal" className="element-detail-overlay active" onClick={handleClose}>
      <div
        className={`element-detail-modal ${elementDetailTab === 'archive' ? 'archive-lens-active' : ''}`}
        id="modal-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows for Prev / Next Element */}
        <button
          className="elem-nav-btn elem-nav-prev"
          id="elem-nav-prev"
          aria-label="Previous element"
          onClick={handlePrev}
          disabled={currentId <= 1}
        >
          <div className="elem-nav-icon">
            <ChevronLeft size={24} />
          </div>
        </button>

        <button
          className="elem-nav-btn elem-nav-next"
          id="elem-nav-next"
          aria-label="Next element"
          onClick={handleNext}
          disabled={currentId >= 118}
        >
          <div className="elem-nav-icon">
            <ChevronRight size={24} />
          </div>
        </button>

        {/* Modal Top Buttons */}
        <div className="modal-top-buttons">
          <button className="modal-close" id="modal-close" aria-label="Close dialog" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* Modal Help Button with Interactive Guide */}
        <button
          className="modal-help-btn"
          id="modal-help-btn"
          aria-label="Interactive element guide and keyboard shortcuts"
          title="Interactive Guide & Shortcuts"
          onClick={() => setIsHelpOpen(true)}
        >
          ?
        </button>

        {/* Single Authoritative Left Information Pane */}
        <div className="modal-info-pane">
          <div className="level-header">
            <div className="headline-content">
              <div className="headline-left-group">
                <div className="headline-numbers">
                  <span className="headline-mass" id="headline-mass">
                    {Math.round(Number(element.level2_structure?.avgMass || element.id * 2))}
                  </span>
                  <span className="headline-atomic" id="headline-atomic">
                    {element.id}
                  </span>
                </div>
                <div className="headline-symbol" id="headline-symbol">
                  {element.symbol}
                </div>
              </div>
              <div className="headline-name" id="headline-name">
                {element.name}
              </div>
            </div>
          </div>

          {/* Standard Chemical Properties Grid */}
          <div className="card-info-container">
            <div className="info-row">
              <span className="info-label">TYPE</span>
              <span className="info-value" id="l1-type-value">
                {element.level1_basic?.type || 'Other nonmetal'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">GROUP / PERIOD</span>
              <span className="info-value" id="l1-group-period-value">
                {element.level1_basic?.group || '-'} / {element.level1_basic?.period || '-'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">PHASE @ STP</span>
              <span className="info-value" id="l1-phase-value">
                {element.level1_basic?.phaseAtSTP || 'Solid'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">ELECTRON BLOCK</span>
              <span className="info-value" id="l1-electron-block-value">
                {electronBlock}-block
              </span>
            </div>

            <div className="info-divider"></div>

            <div className="ions-section">
              <div className="info-label">COMMON IONS</div>
              <div className="ion-item">
                <span className="ion-symbol">{element.symbol}</span>
                <span className="ion-name">{element.level1_basic?.commonIons || 'No common ions'}</span>
              </div>
            </div>

            {/* Electron Configuration / Shell Summary */}
            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="info-label" style={{ marginBottom: '6px' }}>SHELL CONFIGURATION</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', fontFamily: 'monospace' }}>
                {(element.shellConfiguration || [2, 4]).join(' • ')}
              </div>
            </div>
          </div>

          {/* Left panel footer */}
          <div
            className="left-panel-footer"
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '28px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <div className="pagination-dots" style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: elementDetailTab === 'structure' ? '#0f172a' : 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: elementDetailTab === 'orbitals' ? '#38bdf8' : 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: elementDetailTab === 'archive' ? '#0284c7' : 'rgba(0,0,0,0.15)' }}></span>
            </div>
            <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 600 }}>ZPERIOD CHEMINFORMATICS</span>
          </div>
        </div>

        {/* Right 3D & Visual Pane with Suspense */}
        <div className="modal-visual-pane">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Suspense fallback={<ViewportSkeleton label={elementDetailTab.toUpperCase()} />}>
              {elementDetailTab === 'structure' && <Atom3DView element={element} />}
              {elementDetailTab === 'orbitals' && <Orbital3DView element={element} />}
              {elementDetailTab === 'archive' && <ArchiveView element={element} />}
            </Suspense>
          </div>

          {/* Bottom View Switcher Bar */}
          <div
            className="atom-bottom-controls"
            style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}
          >
            <div className="atom-2d3d-toggle" role="tablist" aria-label="Visual representation mode">
              <button
                role="tab"
                aria-selected={elementDetailTab === 'structure'}
                className={`atom-2d3d-opt ${elementDetailTab === 'structure' ? 'active' : ''}`}
                onClick={() => handleTabChange('structure')}
              >
                Structure
              </button>
              <button
                role="tab"
                aria-selected={elementDetailTab === 'orbitals'}
                className={`atom-2d3d-opt ${elementDetailTab === 'orbitals' ? 'active' : ''}`}
                onClick={() => handleTabChange('orbitals')}
              >
                Orbitals
              </button>
              <button
                role="tab"
                aria-selected={elementDetailTab === 'archive'}
                className={`atom-2d3d-opt ${elementDetailTab === 'archive' ? 'active' : ''}`}
                onClick={() => handleTabChange('archive')}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Interactive Help Modal ─── */}
      {isHelpOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setIsHelpOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
              position: 'relative',
              color: '#0f172a'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="#0284c7" />
                <h3 id="help-dialog-title" style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                  Zperiod Interactive Guide
                </h3>
              </div>
              <button
                onClick={() => setIsHelpOpen(false)}
                aria-label="Close help"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#64748b'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', lineHeight: 1.5 }}>
              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>
                  ⌨️ Keyboard Navigation
                </strong>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px', fontSize: '12px' }}>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>← / →</code>
                  <span>Previous / Next Element</span>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>1 / 2 / 3</code>
                  <span>Switch Structure / Orbitals / Archive tabs</span>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>Esc</code>
                  <span>Close dialog and return to periodic table</span>
                  <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>?</code>
                  <span>Toggle this guide</span>
                </div>
              </div>

              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>
                  <Move3d size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  3D Atom & Orbital Controls
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>
                  Click and drag inside the 3D viewport to freely rotate the nucleus, electron shells, or quantum orbital cloud. On mobile, swipe to rotate.
                </p>
              </div>

              <div>
                <strong style={{ display: 'block', color: '#0f172a', marginBottom: '4px' }}>
                  🪐 Archive Constellation
                </strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#475569' }}>
                  Click any orbiting satellite orb to bring it into the central focus view. Verified Wikimedia and scientific sources can be explored in the source link.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsHelpOpen(false)}
              style={{
                width: '100%',
                marginTop: '20px',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
