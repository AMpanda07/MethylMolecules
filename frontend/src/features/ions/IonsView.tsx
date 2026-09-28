import React, { useState } from 'react';
import ionsData from '../../data/ionsData.json';
import { IonData } from '../../types';
import { useAppStore } from '../../state/useAppStore';
import { X, Sparkles } from 'lucide-react';

export const IonsView: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('all');
  const [ionSearch, setIonSearch] = useState<string>('');
  const { selectedIonId, setSelectedIonId } = useAppStore();

  const ionsList = ionsData as unknown as IonData[];

  const selectedIon = ionsList.find(i => i.id === selectedIonId);

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Ion Reference Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Comprehensive directory of monatomic and polyatomic cations & anions
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
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

      {/* Interactive Ion Detail Modal */}
      {selectedIon && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={() => setSelectedIonId(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              background: '#ffffff',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
              position: 'relative',
              color: '#0f172a'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '36px', fontWeight: 900, color: selectedIon.type.toLowerCase() === 'cation' ? '#ff3b30' : '#007aff' }}>
                  {selectedIon.symbol}<sup>{selectedIon.charge}</sup>
                </span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>{selectedIon.name}</h3>
                  <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'capitalize' }}>
                    {selectedIon.category} {selectedIon.type}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedIonId(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '50%', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', display: 'block' }}>CHARGE STATE</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: selectedIon.type.toLowerCase() === 'cation' ? '#ff3b30' : '#007aff' }}>
                  {selectedIon.charge || 'Neutral'}
                </span>
              </div>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', display: 'block' }}>CLASSIFICATION</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
                  {selectedIon.category}
                </span>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Sparkles size={16} color="#007aff" />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>COMMON SALTS & REACTIVITY</span>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                {selectedIon.type.toLowerCase() === 'cation'
                  ? `Forms ionic salts with anions like chloride (Cl⁻), sulfate (SO4²⁻), and nitrate (NO3⁻). Highly reactive in aqueous redox processes.`
                  : `Forms ionic salts with alkali metals (Na⁺, K⁺) and alkaline earth cations (Ca²⁺, Mg²⁺). Active in precipitation and acid-base equilibria.`
                }
              </p>
            </div>

            <button
              onClick={() => setSelectedIonId(null)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                background: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Close Reference
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
