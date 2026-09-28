import React, { useState } from 'react';
import ionsData from '../../data/ionsData.json';
import { IonData } from '../../types';
import { useAppStore } from '../../state/useAppStore';

export const IonsView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [ionSearch, setIonSearch] = useState<string>('');
  const { selectedIonId, setSelectedIonId } = useAppStore();

  const ionsList = ionsData as unknown as IonData[];

  const filteredIons = ionsList.filter(ion => {
    const matchesSearch = ion.name.toLowerCase().includes(ionSearch.toLowerCase()) ||
                          ion.symbol.toLowerCase().includes(ionSearch.toLowerCase());
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'cation') return matchesSearch && ion.type.toLowerCase() === 'cation';
    if (filterType === 'anion') return matchesSearch && ion.type.toLowerCase() === 'anion';
    if (filterType === 'monatomic') return matchesSearch && ion.category.toLowerCase() === 'monatomic';
    if (filterType === 'polyatomic') return matchesSearch && ion.category.toLowerCase() === 'polyatomic';
    return matchesSearch;
  });

  return (
    <div className="ions-page-container" style={{ padding: '32px 48px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Ions Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Ion Reference Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Comprehensive directory of monatomic and polyatomic cations & anions
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search ions..."
            value={ionSearch}
            onChange={(e) => setIonSearch(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.1)',
              background: 'var(--modal-bg-glass)',
              fontSize: '14px',
              outline: 'none',
              width: '220px'
            }}
          />

          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.05)', padding: '3px', borderRadius: '12px' }}>
            {['all', 'cation', 'anion', 'monatomic', 'polyatomic'].map(t => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '9px',
                  border: 'none',
                  background: filterType === t ? '#ffffff' : 'transparent',
                  color: filterType === t ? '#1a1a1a' : '#666',
                  fontWeight: 600,
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  boxShadow: filterType === t ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ion Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {filteredIons.map(ion => {
          const isSelected = selectedIonId === ion.id;
          const isCation = ion.type.toLowerCase() === 'cation';
          return (
            <div
              key={ion.id}
              onClick={() => setSelectedIonId(ion.id)}
              style={{
                background: 'var(--element-bg)',
                borderRadius: '16px',
                padding: '20px',
                border: isSelected ? '2px solid #007aff' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 8px 24px rgba(0,122,255,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {ion.symbol}
                  <sup style={{ fontSize: '16px', color: isCation ? '#ff3b30' : '#007aff' }}>{ion.charge}</sup>
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: isCation ? 'rgba(255,59,48,0.1)' : 'rgba(0,122,255,0.1)',
                    color: isCation ? '#ff3b30' : '#007aff'
                  }}
                >
                  {ion.type}
                </span>
              </div>

              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {ion.name}
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {ion.category} · {ion.sectionName || ion.section}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
