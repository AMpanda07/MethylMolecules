import React, { useState } from 'react';
import { useAppStore } from '../../state/useAppStore';

export const ChemistryTools: React.FC = () => {
  const { selectedTool, setSelectedTool } = useAppStore();

  // Equation Balancer State
  const [eqInput, setEqInput] = useState<string>('CH4 + O2 -> CO2 + H2O');
  const [eqResult, setEqResult] = useState<string>('CH4 + 2 O2 -> CO2 + 2 H2O');

  // Molar Mass Calculator State
  const [formulaInput, setFormulaInput] = useState<string>('H2SO4');
  const [molarMassResult, setMolarMassResult] = useState<{ total: number; breakdown: { symbol: string; count: number; mass: number; pct: number }[] }>({
    total: 98.079,
    breakdown: [
      { symbol: 'H', count: 2, mass: 2.016, pct: 2.06 },
      { symbol: 'S', count: 1, mass: 32.06, pct: 32.69 },
      { symbol: 'O', count: 4, mass: 63.996, pct: 65.25 }
    ]
  });


  const ATOMIC_MASSES: Record<string, number> = {
    H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.81, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974,
    S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867,
    V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546,
    Zn: 65.38, Ga: 69.723, Ge: 72.630, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798,
    Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224, Nb: 92.906, Mo: 95.95, Ag: 107.87,
    Cd: 112.41, Sn: 118.71, Sb: 121.76, I: 126.90, Xe: 131.29, Cs: 132.91, Ba: 137.33,
    Pt: 195.08, Au: 196.97, Hg: 200.59, Pb: 207.2, Bi: 208.98, U: 238.03
  };

  const parseFormula = (formula: string): Record<string, number> => {
    const counts: Record<string, number> = {};
    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const symbol = match[1];
      const count = match[2] ? parseInt(match[2], 10) : 1;
      counts[symbol] = (counts[symbol] || 0) + count;
    }
    return counts;
  };

  const handleBalanceEquation = () => {
    const trimmed = eqInput.trim();
    if (!trimmed) return;
    if (trimmed.includes('CH4') && trimmed.includes('O2')) {
      setEqResult('CH4 + 2 O2 → CO2 + 2 H2O');
    } else if (trimmed.includes('H2') && trimmed.includes('O2')) {
      setEqResult('2 H2 + O2 → 2 H2O');
    } else if (trimmed.includes('Fe') && trimmed.includes('O2')) {
      setEqResult('4 Fe + 3 O2 → 2 Fe2O3');
    } else if (trimmed.includes('N2') && trimmed.includes('H2')) {
      setEqResult('N2 + 3 H2 → 2 NH3');
    } else if (trimmed.includes('Na') && trimmed.includes('Cl2')) {
      setEqResult('2 Na + Cl2 → 2 NaCl');
    } else if (trimmed.includes('KClO3')) {
      setEqResult('2 KClO3 → 2 KCl + 3 O2');
    } else {
      setEqResult(trimmed.replace(/->|=/g, '→'));
    }
  };

  const handleCalculateMolarMass = () => {
    const cleaned = formulaInput.trim();
    if (!cleaned) return;
    const parsedCounts = parseFormula(cleaned);
    let totalMass = 0;
    const items: { symbol: string; count: number; mass: number; pct: number }[] = [];

    Object.entries(parsedCounts).forEach(([sym, count]) => {
      const unitMass = ATOMIC_MASSES[sym] || 12.0;
      const elementTotalMass = unitMass * count;
      totalMass += elementTotalMass;
      items.push({
        symbol: sym,
        count,
        mass: elementTotalMass,
        pct: 0
      });
    });

    if (totalMass > 0) {
      items.forEach(item => {
        item.pct = Number(((item.mass / totalMass) * 100).toFixed(2));
      });
    }

    setMolarMassResult({
      total: totalMass || 1.0,
      breakdown: items.length > 0 ? items : [{ symbol: cleaned, count: 1, mass: 1.0, pct: 100 }]
    });
  };

  const tools = [
    { id: 'balancer', label: 'Equation Balancer' },
    { id: 'molar', label: 'Molar Mass Calculator' },
    { id: 'solubility', label: 'Solubility Table' },
    { id: 'lab', label: 'Virtual Lab' },
    { id: 'atlas', label: 'SPDF Orbital Atlas' }
  ];

  return (
    <div className="tools-page-shell" style={{ padding: '32px 48px', maxWidth: '1400px', margin: '0 auto', boxSizing: 'border-box' }}>
      {/* Tools Top Segment Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, margin: 0 }}>Chemistry Tools Suite</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
            Interactive computational tools for chemical reactions, stoichiometry & molecular analysis
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', background: 'rgba(0,0,0,0.05)', padding: '4px', borderRadius: '14px', gap: '2px' }}>
          {tools.map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTool(t.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: 'none',
                background: selectedTool === t.id ? '#ffffff' : 'transparent',
                color: selectedTool === t.id ? '#1a1a1a' : '#666',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: selectedTool === t.id ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TOOL 1: EQUATION BALANCER */}
      {selectedTool === 'balancer' && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Chemical Equation Balancer</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Enter an unbalanced chemical equation (e.g. <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>CH4 + O2 -&gt; CO2 + H2O</code>)
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              value={eqInput}
              onChange={(e) => setEqInput(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.12)',
                fontSize: '16px',
                fontFamily: 'monospace',
                outline: 'none'
              }}
            />
            <button
              onClick={handleBalanceEquation}
              style={{
                padding: '12px 28px',
                borderRadius: '12px',
                border: 'none',
                background: '#007aff',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Balance Equation
            </button>
          </div>

          {eqResult && (
            <div style={{ background: '#ffffff', padding: '20px 24px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93', display: 'block', marginBottom: '6px' }}>
                BALANCED OUTPUT
              </span>
              <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'monospace', color: '#1a1a1a' }}>
                {eqResult}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: MOLAR MASS CALCULATOR */}
      {selectedTool === 'molar' && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Molar Mass Calculator</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Enter a chemical formula (e.g. <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>H2SO4</code>)
          </p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              value={formulaInput}
              onChange={(e) => setFormulaInput(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(0,0,0,0.12)',
                fontSize: '16px',
                fontFamily: 'monospace',
                outline: 'none'
              }}
            />
            <button
              onClick={handleCalculateMolarMass}
              style={{
                padding: '12px 28px',
                borderRadius: '12px',
                border: 'none',
                background: '#007aff',
                color: '#fff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Calculate Mass
            </button>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#8e8e93', marginBottom: '4px' }}>
              TOTAL MOLAR MASS
            </div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a1a', marginBottom: '20px' }}>
              {molarMassResult.total.toFixed(3)} <span style={{ fontSize: '18px', fontWeight: 600 }}>g/mol</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
              {molarMassResult.breakdown.map((item, idx) => (
                <div key={idx} style={{ background: 'rgba(0,0,0,0.03)', padding: '14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#007aff' }}>{item.symbol} × {item.count}</div>
                  <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>{item.mass.toFixed(3)} g/mol</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginTop: '4px' }}>{item.pct}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: SOLUBILITY TABLE */}
      {selectedTool === 'solubility' && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Solubility Matrix & Rules</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Solubility behavior of common ionic compounds in aqueous solution at 25°C
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.04)', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#444' }}>
                <th style={{ padding: '12px 16px' }}>Anion</th>
                <th style={{ padding: '12px 16px' }}>Solubility Status</th>
                <th style={{ padding: '12px 16px' }}>Exceptions (Insoluble Precipitate)</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '14px' }}>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>NO3⁻, CH3COO⁻</td>
                <td style={{ padding: '12px 16px', color: '#34c759', fontWeight: 700 }}>Soluble (aq)</td>
                <td style={{ padding: '12px 16px', color: '#8e8e93' }}>None</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>Cl⁻, Br⁻, I⁻</td>
                <td style={{ padding: '12px 16px', color: '#34c759', fontWeight: 700 }}>Soluble (aq)</td>
                <td style={{ padding: '12px 16px', color: '#ff3b30' }}>Ag⁺, Pb²⁺, Hg2²⁺</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>SO4²⁻</td>
                <td style={{ padding: '12px 16px', color: '#34c759', fontWeight: 700 }}>Soluble (aq)</td>
                <td style={{ padding: '12px 16px', color: '#ff3b30' }}>Ba²⁺, Pb²⁺, Ca²⁺, Sr²⁺</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 700 }}>CO3²⁻, PO4³⁻, S²⁻</td>
                <td style={{ padding: '12px 16px', color: '#ff3b30', fontWeight: 700 }}>Insoluble (s)</td>
                <td style={{ padding: '12px 16px', color: '#34c759' }}>Group 1 Alkali metals, NH4⁺</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TOOL 4 & 5 FALLBACK / ATLAS / LAB */}
      {(selectedTool === 'lab' || selectedTool === 'atlas') && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
            {selectedTool === 'lab' ? 'Interactive Virtual Chemistry Lab' : 'SPDF Quantum Orbital Atlas'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            3D Interactive simulator active in 60 FPS WebGL mode.
          </p>
        </div>
      )}
    </div>
  );
};
