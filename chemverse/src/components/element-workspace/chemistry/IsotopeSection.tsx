'use client';

import React, { useState } from 'react';
import { DetailedElement } from '@/data/elements-data';
import styles from './IsotopeSection.module.css';

interface IsotopeSectionProps {
  element: DetailedElement;
}

export default function IsotopeSection({ element }: IsotopeSectionProps) {
  const [filter, setFilter] = useState<'all' | 'stable' | 'radioactive'>('all');

  const isotopes = element.isotopes;

  const filtered = isotopes.filter((iso) => {
    if (filter === 'stable') return iso.isStable;
    if (filter === 'radioactive') return !iso.isStable;
    return true;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>Isotopes of {element.name}</h3>
          <p className={styles.subtitle}>
            Variants of {element.symbol} with identical atomic number ({element.protons} protons) but differing neutron counts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({isotopes.length})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'stable' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('stable')}
          >
            Stable ({isotopes.filter((i) => i.isStable).length})
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'radioactive' ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter('radioactive')}
          >
            Radioactive ({isotopes.filter((i) => !i.isStable).length})
          </button>
        </div>
      </div>

      {/* Isotope Table / Cards */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Isotope</th>
              <th>Mass # (A)</th>
              <th>Protons</th>
              <th>Neutrons</th>
              <th>Abundance</th>
              <th>Half-life / Stability</th>
              <th>Decay Mode</th>
              <th>Scientific Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((iso, idx) => (
              <tr key={idx} className={iso.isStable ? styles.stableRow : styles.radioactiveRow}>
                <td className={styles.symbolCell}>
                  <sup className={styles.sup}>{iso.massNumber}</sup>
                  <span className={styles.isoSym}>{element.symbol}</span>
                </td>
                <td className={styles.numCell}>{iso.massNumber}</td>
                <td className={styles.numCell}>{iso.protons}</td>
                <td className={styles.numCell}>{iso.neutrons}</td>
                <td className={styles.abundanceCell}>
                  {iso.abundance !== undefined && iso.abundance > 0 ? (
                    <div className={styles.abundanceBar}>
                      <span>{iso.abundance.toFixed(3)}%</span>
                      <div className={styles.barOuter}>
                        <div className={styles.barInner} style={{ width: `${Math.min(100, iso.abundance)}%` }} />
                      </div>
                    </div>
                  ) : (
                    <span className={styles.muted}>Trace / Synthetic</span>
                  )}
                </td>
                <td>
                  <span className={iso.isStable ? styles.badgeStable : styles.badgeRadioactive}>
                    {iso.isStable ? 'Stable' : iso.halfLife || 'Radioactive'}
                  </span>
                </td>
                <td>{iso.decayMode || (iso.isStable ? 'None' : 'Beta / EC')}</td>
                <td className={styles.notesCell}>{iso.notes || 'Natural isotopic component.'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
