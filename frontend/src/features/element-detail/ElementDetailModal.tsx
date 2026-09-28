import React, { useState, useEffect } from 'react';
import elementsDetailData from '../../data/elementsDetail.json';
import elementsGridData from '../../data/elementsGrid.json';
import { ElementDetailData, ElementGridItem } from '../../types';
import { useAppStore } from '../../state/useAppStore';
import { Atom3DView } from '../../three/Atom3DView';
import { Orbital3DView } from '../../three/Orbital3DView';
import { ArchiveView } from './ArchiveView';
import { ChevronLeft, ChevronRight, HelpCircle, X, Sparkles, Move3d } from 'lucide-react';

import { getElementBlock, normalizeElementDetail } from '../../utils/chemistry.ts';

export const ElementDetailModal: React.FC = () => {
  const {
    selectedElementId,
    setSelectedElementId,
    elementDetailTab,
    setElementDetailTab
  } = useAppStore();

  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  if (selectedElementId === null) return null;

  const detailMap = elementsDetailData as unknown as Record<number, any>;
  let resolvedId = typeof selectedElementId === 'number' ? selectedElementId : Number(selectedElementId);

  // If selectedElementId is a symbol (e.g. "C", "Fe", "Au"), map symbol to atomic number
  if (isNaN(resolvedId) && typeof selectedElementId === 'string') {
    const gridList = elementsGridData as ElementGridItem[];
    const found = gridList.find(e => e.symbol.toLowerCase() === (selectedElementId as string).toLowerCase());
    if (found) {
      resolvedId = found.number;
    }
  }

  const rawElement = detailMap[resolvedId] || detailMap[selectedElementId];
  const element = rawElement ? normalizeElementDetail(rawElement) : null;

  const handleClose = () => {
    setSelectedElementId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('element');
    url.searchParams.delete('tab');
    window.history.pushState({}, '', url.pathname + (url.search ? url.search : ''));
  };

  if (!element) {
    console.error(`[Zperiod] Element data missing for atomic number ${selectedElementId}`);
    return (
      <div id="element-modal" className="modal-overlay active" onClick={handleClose}>
        <div
          className="modal-content"
          id="modal-content-primary"
          style={{ padding: '40px', textAlign: 'center', maxWidth: '440px', margin: 'auto' }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px', color: '#ef4444' }}>
            Element Record Not Found
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
            No chemical data record was found for atomic number {selectedElementId}.
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

  const getElementUrl = (symbol: string, tab: string) => {
    return tab === 'structure' ? `?element=${symbol}` : `?element=${symbol}&tab=${tab}`;
  };

  const handlePrev = () => {
    if (selectedElementId > 1) {
      const prevId = selectedElementId - 1;
      setSelectedElementId(prevId);
      const prevEl = detailMap[prevId];
      if (prevEl) {
        window.history.pushState({}, '', getElementUrl(prevEl.symbol, elementDetailTab));
      }
    }
  };

  const handleNext = () => {
    if (selectedElementId < 118) {
      const nextId = selectedElementId + 1;
      setSelectedElementId(nextId);
      const nextEl = detailMap[nextId];
      if (nextEl) {
        window.history.pushState({}, '', getElementUrl(nextEl.symbol, elementDetailTab));
      }
    }
  };

  const handleTabChange = (tab: 'structure' | 'orbitals' | 'archive') => {
    setElementDetailTab(tab);
    if (element) {
      window.history.replaceState({}, '', getElementUrl(element.symbol, tab));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input or textarea is focused
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
  }, [selectedElementId, elementDetailTab, isHelpOpen]);

  const electronBlock = getElementBlock(element.id);

  return (
    <div id="element-modal" className="modal-overlay active" onClick={handleClose}>
      <div
        className={`modal-content ${elementDetailTab === 'archive' ? 'archive-lens-active' : ''}`}
        id="modal-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows for Prev / Next Element */}
        <button
          className="elem-nav-btn elem-nav-prev"
          id="elem-nav-prev"
          aria-label={`Previous element: ${selectedElementId > 1 ? detailMap[selectedElementId - 1]?.name : ''}`}
          onClick={handlePrev}
          disabled={selectedElementId <= 1}
        >
          <div className="elem-nav-icon">
            <ChevronLeft size={24} />
          </div>
        </button>

        <button
          className="elem-nav-btn elem-nav-next"
          id="elem-nav-next"
          aria-label={`Next element: ${selectedElementId < 118 ? detailMap[selectedElementId + 1]?.name : ''}`}
          onClick={handleNext}
          disabled={selectedElementId >= 118}
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

        {/* Left Information Pane */}
        <div className="modal-info-pane">
          <div className="level-header">
            <div className="headline-content">
              <div className="headline-left-group">
                <div className="headline-numbers">
                  <span className="headline-mass" id="headline-mass">
                    {Number(element.level2_structure?.avgMass || element.id * 2).toFixed(1)}
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
                {element.level1_basic?.group} / {element.level1_basic?.period}
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
          </div>

          {/* Left panel indicator */}
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
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a1a' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }}></span>
            </div>
            <span style={{ fontSize: '11px', opacity: 0.6, fontWeight: 600 }}>ZPERIOD CHEMINFORMATICS</span>
          </div>
        </div>

        {/* Right 3D & Visual Pane */}
        <div className="modal-visual-pane">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {elementDetailTab === 'structure' && <Atom3DView element={element} />}
            {elementDetailTab === 'orbitals' && <Orbital3DView element={element} />}
            {elementDetailTab === 'archive' && <ArchiveView element={element} />}
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
