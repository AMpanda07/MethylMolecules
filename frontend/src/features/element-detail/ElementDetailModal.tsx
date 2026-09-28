import React from 'react';
import elementsDetailData from '../../data/elementsDetail.json';
import { ElementDetailData } from '../../types';
import { useAppStore } from '../../state/useAppStore';
import { Atom3DView } from '../../three/Atom3DView';
import { Orbital3DView } from '../../three/Orbital3DView';
import { ArchiveView } from './ArchiveView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ElementDetailModal: React.FC = () => {
  const {
    selectedElementId,
    setSelectedElementId,
    elementDetailTab,
    setElementDetailTab
  } = useAppStore();

  if (selectedElementId === null) return null;

  const detailMap = elementsDetailData as unknown as Record<number, ElementDetailData>;
  const element = detailMap[selectedElementId] || detailMap[6];

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

  const handleClose = () => {
    setSelectedElementId(null);
    window.history.pushState({}, '', '/');
  };

  const handleTabChange = (tab: 'structure' | 'orbitals' | 'archive') => {
    setElementDetailTab(tab);
    if (element) {
      window.history.replaceState({}, '', getElementUrl(element.symbol, tab));
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId, elementDetailTab]);

  return (
    <div id="element-modal" className="modal-overlay active" onClick={handleClose}>
      <div
        className="modal-content"
        id="modal-content-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows for Prev / Next Element */}
        <button
          className="elem-nav-btn elem-nav-prev"
          id="elem-nav-prev"
          aria-label="Previous element"
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
          aria-label="Next element"
          onClick={handleNext}
          disabled={selectedElementId >= 118}
        >
          <div className="elem-nav-icon">
            <ChevronRight size={24} />
          </div>
        </button>

        {/* Modal Top Close Button */}
        <div className="modal-top-buttons">
          <button className="modal-close" id="modal-close" aria-label="Close dialog" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* Modal Help Button */}
        <button className="modal-help-btn" aria-label="Help" title="Help">
          ?
        </button>

        {/* Left Information Pane */}
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
                {element.level1_basic?.valenceElectrons ? 'p' : 's'}
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

          {/* Bottom Pagination Dots & Lock indicator */}
          <div className="left-panel-footer" style={{ position: 'absolute', bottom: '16px', left: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="pagination-dots" style={{ display: 'flex', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a1a' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }}></span>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)' }}></span>
            </div>
            <span style={{ fontSize: '13px', opacity: 0.6 }}>🔒</span>
          </div>
        </div>

        {/* Right 3D Visual Pane */}
        <div className="modal-visual-pane">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            {elementDetailTab === 'structure' && <Atom3DView element={element} />}
            {elementDetailTab === 'orbitals' && <Orbital3DView element={element} />}
            {elementDetailTab === 'archive' && <ArchiveView element={element} />}
          </div>

          {/* Bottom View Switcher Bar */}
          <div className="atom-bottom-controls" style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 100 }}>
            <div className="atom-2d3d-toggle">
              <button
                className={`atom-2d3d-opt ${elementDetailTab === 'structure' ? 'active' : ''}`}
                onClick={() => handleTabChange('structure')}
              >
                Structure
              </button>
              <button
                className={`atom-2d3d-opt ${elementDetailTab === 'orbitals' ? 'active' : ''}`}
                onClick={() => handleTabChange('orbitals')}
              >
                Orbitals
              </button>
              <button
                className={`atom-2d3d-opt ${elementDetailTab === 'archive' ? 'active' : ''}`}
                onClick={() => handleTabChange('archive')}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
