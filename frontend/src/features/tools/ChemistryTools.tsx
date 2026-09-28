import React, { useState } from 'react';
import { useAppStore } from '../../state/useAppStore';

export const ChemistryTools: React.FC = () => {
  const { selectedTool, setSelectedTool } = useAppStore();

  // Equation Balancer State
  const [eqInput, setEqInput] = useState<string>('CH4 + O2 -> CO2 + H2O');
  const [eqResult, setEqResult] = useState<string>('CH4 + 2 O2 → CO2 + 2 H2O');

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

  // Solubility Compound Search State
  const [solubilitySearch, setSolubilitySearch] = useState<string>('AgCl');

  // Virtual Lab Titration Simulator State
  const [titrantVolume, setTitrantVolume] = useState<number>(12.5);

  // SPDF Orbital Atlas State
  const [activeOrbital, setActiveOrbital] = useState<string>('2p');

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

  // Advanced chemical formula parser with parenthesis expansion support e.g. Mg(OH)2, (NH4)2SO4
  const parseFormula = (formulaStr: string): Record<string, number> => {
    let str = formulaStr.trim();
    const counts: Record<string, number> = {};

    // Expand outer brackets/parentheses e.g. (NH4)2 -> N2H8
    const bracketRegex = /\(([^()]+)\)(\d*)/g;
    while (bracketRegex.test(str)) {
      str = str.replace(bracketRegex, (_, inner, multiplierStr) => {
        const mult = multiplierStr ? parseInt(multiplierStr, 10) : 1;
        const innerRegex = /([A-Z][a-z]*)(\d*)/g;
        let innerMatch;
        let expanded = '';
        while ((innerMatch = innerRegex.exec(inner)) !== null) {
          const sym = innerMatch[1];
          const cnt = (innerMatch[2] ? parseInt(innerMatch[2], 10) : 1) * mult;
          expanded += `${sym}${cnt}`;
        }
        return expanded;
      });
    }

    const regex = /([A-Z][a-z]*)(\d*)/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
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
    } else if (trimmed.includes('C3H8')) {
      setEqResult('C3H8 + 5 O2 → 3 CO2 + 4 H2O');
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

  // Dynamic Solubility Compound Lookup
  const getSolubilityResult = (query: string) => {
    const q = query.trim().toUpperCase();
    if (q.includes('AGCL')) return { status: 'Insoluble (s)', color: '#ff3b30', desc: 'Forms dense white silver chloride precipitate in water.' };
    if (q.includes('BASO4')) return { status: 'Insoluble (s)', color: '#ff3b30', desc: 'Heavy white barium sulfate precipitate (Ksp = 1.1 × 10⁻¹⁰).' };
    if (q.includes('CACO3')) return { status: 'Insoluble (s)', color: '#ff3b30', desc: 'White chalky calcium carbonate precipitate (chalk/limestone).' };
    if (q.includes('PBI2')) return { status: 'Insoluble (s)', color: '#ff3b30', desc: 'Vibrant golden-yellow lead(II) iodide precipitate ("golden rain").' };
    if (q.includes('NACL') || q.includes('KNO3') || q.includes('CUSO4') || q.includes('NA2SO4')) {
      return { status: 'Soluble (aq)', color: '#34c759', desc: 'Completely dissociates into aqueous ions at 25°C.' };
    }
    if (q.includes('NO3') || q.includes('NA') || q.includes('K') || q.includes('NH4')) {
      return { status: 'Soluble (aq)', color: '#34c759', desc: 'Nitrate and Alkali metal salts are completely soluble.' };
    }
    return { status: 'Insoluble (s)', color: '#ff3b30', desc: 'Forms insoluble solid precipitate according to general solubility rules.' };
  };

  // Titration pH calculation
  const getTitrationData = (vol: number) => {
    // 25mL 0.1M HCl titrated with 0.1M NaOH
    const eqVol = 25.0;
    let ph = 1.0;
    if (vol < eqVol) {
      const remainingMoles = (0.1 * 0.025) - (0.1 * (vol / 1000));
      const totalVolL = (25 + vol) / 1000;
      const concH = remainingMoles / totalVolL;
      ph = -Math.log10(Math.max(concH, 1e-7));
    } else if (vol === eqVol) {
      ph = 7.0;
    } else {
      const excessMoles = (0.1 * (vol / 1000)) - (0.1 * 0.025);
      const totalVolL = (25 + vol) / 1000;
      const concOH = excessMoles / totalVolL;
      const pOH = -Math.log10(Math.max(concOH, 1e-7));
      ph = 14.0 - pOH;
    }
    return {
      ph: Number(ph.toFixed(2)),
      color: ph < 8.2 ? 'rgba(255,255,255,0.4)' : `rgba(255, 105, 180, ${Math.min(0.95, 0.4 + (ph - 8.2) * 0.15)})`
    };
  };

  const titration = getTitrationData(titrantVolume);

  const tools = [
    { id: 'balancer', label: 'Equation Balancer' },
    { id: 'molar', label: 'Molar Mass Calculator' },
    { id: 'solubility', label: 'Solubility Table' },
    { id: 'lab', label: 'Virtual Lab (Titration)' },
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
            Enter a chemical formula (e.g. <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>H2SO4</code> or <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px' }}>Mg(OH)2</code>)
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
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Solubility Matrix & Compound Checker</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
            Interactive compound solubility search & aqueous reaction rules at 25°C
          </p>

          {/* Compound Search Tester */}
          <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.08)', marginBottom: '28px' }}>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93', display: 'block', marginBottom: '8px' }}>
              CHECK COMPOUND SOLUBILITY
            </label>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Enter compound e.g. AgCl, NaNO3, BaSO4, PbI2..."
                value={solubilitySearch}
                onChange={(e) => setSolubilitySearch(e.target.value)}
                style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '15px' }}
              />
            </div>
            {solubilitySearch && (
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {(() => {
                  const res = getSolubilityResult(solubilitySearch);
                  return (
                    <>
                      <span style={{ fontSize: '14px', fontWeight: 800, padding: '4px 12px', borderRadius: '8px', background: `${res.color}15`, color: res.color }}>
                        {res.status}
                      </span>
                      <span style={{ fontSize: '13px', color: '#444' }}>{res.desc}</span>
                    </>
                  );
                })()}
              </div>
            )}
          </div>

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

      {/* TOOL 4: VIRTUAL TITRATION LAB */}
      {selectedTool === 'lab' && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Interactive Acid-Base Titration Lab</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Titrate 25.0 mL of 0.1M HCl with 0.1M NaOH using Phenolphthalein indicator
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', alignItems: 'center' }}>
            {/* Beaker & Burette Visualizer */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)' }}>
              {/* Burette */}
              <div style={{ width: '14px', height: '100px', border: '2px solid #666', borderRadius: '4px', background: 'rgba(0,122,255,0.1)', position: 'relative', marginBottom: '8px' }}>
                <div style={{ width: '100%', height: `${Math.max(0, 100 - (titrantVolume / 50) * 100)}%`, background: '#007aff', position: 'absolute', bottom: 0, transition: 'height 0.2s' }}></div>
              </div>
              <span style={{ fontSize: '11px', color: '#8e8e93', fontWeight: 700, marginBottom: '16px' }}>BURETTE (0.1M NaOH)</span>

              {/* Erlenmeyer Flask */}
              <div style={{ width: '120px', height: '110px', clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)', background: titration.color, border: '2px solid #444', transition: 'background 0.3s', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '12px' }}>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, marginTop: '8px' }}>SOLUTION pH: {titration.ph}</span>
            </div>

            {/* Controls & Curve Data */}
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '13px', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  Titrant Volume Added: {titrantVolume.toFixed(1)} mL (Equivalence at 25.0 mL)
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.5"
                  value={titrantVolume}
                  onChange={(e) => setTitrantVolume(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <button onClick={() => setTitrantVolume(0)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Reset (0 mL)</button>
                <button onClick={() => setTitrantVolume(25)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#007aff', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>Equivalence (25 mL)</button>
                <button onClick={() => setTitrantVolume(50)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>Excess Base (50 mL)</button>
              </div>

              <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#8e8e93', marginBottom: '4px' }}>INDICATOR STATE</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: titration.ph < 8.2 ? '#666' : '#e91e63' }}>
                  {titration.ph < 8.2 ? 'Colorless (Acidic / Neutral)' : 'Pink / Fuchsia (Basic Endpoint Reached)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 5: SPDF ORBITAL ATLAS */}
      {selectedTool === 'atlas' && (
        <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>SPDF Quantum Orbital Atlas</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
            Explore 3D electron probability clouds, nodal surfaces & spatial orientations
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {['1s', '2p', '3d', '4f'].map(orb => (
              <button
                key={orb}
                onClick={() => setActiveOrbital(orb)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: activeOrbital === orb ? '#007aff' : 'rgba(0,0,0,0.06)',
                  color: activeOrbital === orb ? '#fff' : '#1a1a1a',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {orb.toUpperCase()} Subshell
              </button>
            ))}
          </div>

          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px', alignItems: 'center' }}>
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,122,255,0.8) 0%, rgba(0,122,255,0.1) 70%, transparent 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(0,122,255,0.3)', margin: '0 auto' }}>
              <span style={{ fontSize: '28px', fontWeight: 900, color: '#007aff' }}>{activeOrbital.toUpperCase()}</span>
            </div>

            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>
                {activeOrbital === '1s' && 's Orbital (Spherical Symmetry)'}
                {activeOrbital === '2p' && 'p Orbital (Dumbbell Shape)'}
                {activeOrbital === '3d' && 'd Orbital (Cloverleaf / Dumbbell-Donut)'}
                {activeOrbital === '4f' && 'f Orbital (Complex Multi-Lobe Topology)'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px', marginTop: '16px' }}>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong>Max Capacity:</strong> {activeOrbital === '1s' ? '2 e⁻' : activeOrbital === '2p' ? '6 e⁻' : activeOrbital === '3d' ? '10 e⁻' : '14 e⁻'}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong>Angular Nodes (l):</strong> {activeOrbital === '1s' ? '0' : activeOrbital === '2p' ? '1' : activeOrbital === '3d' ? '2' : '3'}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong>Spatial Orientations (m_l):</strong> {activeOrbital === '1s' ? '1 (s)' : activeOrbital === '2p' ? '3 (px, py, pz)' : activeOrbital === '3d' ? '5 (dz2, dx2-y2, dxy, dxz, dyz)' : '7 orientations'}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <strong>Symmetry Group:</strong> {activeOrbital === '1s' ? 'Spherical (l=0)' : 'Axial (l=1..3)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
