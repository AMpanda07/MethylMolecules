import React from 'react';
import elementsGridData from '../../data/elementsGrid.json';
import { ElementGridItem } from '../../types';
import { ElementCard } from './ElementCard';
import { useAppStore } from '../../state/useAppStore';

export const PeriodicTable: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    setSelectedElementId,
    setIsCustomLayoutOpen
  } = useAppStore();

  const gridElements = elementsGridData as ElementGridItem[];

  const categories = [
    { id: 'Alkali Metal', label: 'Alkali Metal', catClass: 'cat-alkali-metal', color: '#ffcccc' },
    { id: 'Alkaline Earth', label: 'Alkaline Earth', catClass: 'cat-alkaline-earth-metal', color: '#ffe5cc' },
    { id: 'Transition Metal', label: 'Transition Metal', catClass: 'cat-transition-metal', color: '#fff0cc' },
    { id: 'Metalloid', label: 'Metalloid', catClass: 'cat-metalloid', color: '#d6f5e5' },
    { id: 'Halogen', label: 'Halogen', catClass: 'cat-halogen', color: '#e5f5d6' },
    { id: 'Noble Gas', label: 'Noble Gas', catClass: 'cat-noble-gas', color: '#f0d6ff' },
    { id: 'Lanthanides', label: 'Lanthanides', catClass: 'cat-lanthanide', color: '#ffe0d6' },
    { id: 'Actinides', label: 'Actinides', catClass: 'cat-actinide', color: '#ffd6e5' },
    { id: 'Other Nonmetal', label: 'Other Nonmetal', catClass: 'cat-other-nonmetal', color: '#e2ecc8' },
    { id: 'Post-Transition', label: 'Post-Transition', catClass: 'cat-post-transition-metal', color: '#d6e5ff' }
  ];

  return (
    <div className="table-page-shell">
      {/* Top Filter Bar */}
      <div className="table-controls-bar" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          <select
            className="category-dropdown-select"
            value={categoryFilter || ''}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.1)',
              background: 'rgba(255,255,255,0.8)',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="">Category ▾</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>

          <button
            onClick={() => setCategoryFilter(null)}
            disabled={!categoryFilter}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: '1px solid rgba(0,0,0,0.1)',
              background: categoryFilter ? '#ffffff' : 'rgba(0,0,0,0.04)',
              color: categoryFilter ? '#1a1a1a' : '#999',
              fontSize: '13px',
              fontWeight: 600,
              cursor: categoryFilter ? 'pointer' : 'default'
            }}
          >
            Reset
          </button>
        </div>

        {/* Legend Box Pill Grid */}
        <div
          className="legend-pill-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, auto)',
            gap: '8px',
            background: 'rgba(255,255,255,0.7)',
            padding: '10px 14px',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(10px)',
            flexShrink: 1,
            minWidth: 0
          }}
        >
          {categories.map(cat => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(isActive ? null : cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 8px',
                  borderRadius: '14px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  background: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: cat.color,
                    display: 'inline-block',
                    flexShrink: 0
                  }}
                />
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#2c2420' }}>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 18-column Periodic Table Container */}
      <div className="container" id="main-container">
        <div className="periodic-table" id="periodic-table">
          {gridElements.map((el) => {
            const isPlaceholder = el.number === 5771 || el.number === 89103 || el.symbol === 'La-Lu' || el.symbol === 'Ac-Lr';
            return (
              <ElementCard
                key={`${el.row}-${el.column}-${el.number}`}
                element={el}
                isPlaceholder={isPlaceholder}
                onClick={() => {
                  if (isPlaceholder) {
                    setCategoryFilter(el.number === 5771 ? 'Lanthanides' : 'Actinides');
                  } else {
                    setSelectedElementId(el.number);
                    window.history.pushState({}, '', `?element=${el.symbol}`);
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Bar: Customize Layout & Footer */}
      <div className="table-footer-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={() => setIsCustomLayoutOpen(true)}
          style={{
            padding: '10px 20px',
            borderRadius: '24px',
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          <span>Customize Layout</span>
        </button>

        <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          &copy; 2026 Philip. All rights reserved.
        </span>
      </div>
    </div>
  );
};
