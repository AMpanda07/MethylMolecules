'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOLECULES, CATEGORY_LABELS, type MoleculeCategory } from '@/data/molecules';
import styles from './Molecules.module.css';

export default function MoleculesPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MoleculeCategory | 'all'>('all');

  const filteredMolecules = MOLECULES.filter(m => {
    if (filter !== 'all' && !m.category.includes(filter)) return false;
    if (search.trim() === '') return true;
    const s = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(s) ||
      m.formula.toLowerCase().includes(s) ||
      m.description.toLowerCase().includes(s)
    );
  });

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Molecule Library</h1>
            <p className={styles.subtitle}>Discover fascinating compounds, from the water we drink to the DNA in our cells.</p>
          </div>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search molecules (e.g. Water, H2O)…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search molecules"
            />
          </div>
        </div>
        {/* Filters */}
        <div className={styles.filters} role="group" aria-label="Filter molecules">
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.filterActive : ''}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All
          </button>
          {(Object.entries(CATEGORY_LABELS) as [MoleculeCategory, string][]).map(([key, label]) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className={styles.gridContainer}>
        {filteredMolecules.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No molecules found matching your search.</p>
            <button className={styles.resetBtn} onClick={() => { setSearch(''); setFilter('all'); }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredMolecules.map(m => (
              <Link href={`/molecule-lab?mol=${m.slug}`} key={m.slug} className={styles.card}>
                <div className={styles.cardVisual}>
                  {/* Stylized placeholder for 3D thumbnail */}
                  <div className={styles.abstractShapes}>
                    {m.atoms.slice(0, 5).map((a, i) => (
                      <div
                        key={i}
                        className={styles.abstractAtom}
                        style={{
                          backgroundColor: a.color,
                          width: `${a.radius * 30}px`,
                          height: `${a.radius * 30}px`,
                          top: `calc(50% + ${a.y * 20}px)`,
                          left: `calc(50% + ${a.x * 20}px)`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: Math.round((a.z + 2) * 10),
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{m.name}</h3>
                    <span className={styles.cardFormula}>{formatFormula(m.formula)}</span>
                  </div>
                  <p className={styles.cardDesc}>{m.description}</p>
                  <div className={styles.cardTags}>
                    {m.category.slice(0, 2).map(c => (
                      <span key={c} className={styles.tag}>{CATEGORY_LABELS[c]}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Utility to nicely format formulas like H2O into H₂O if they aren't already
function formatFormula(formula: string) {
  return formula.replace(/\d+/g, match => {
    const subs = ['₀','₁','₂','³','₄','₅','₆','₇','₈','₉'];
    return match.split('').map(d => subs[parseInt(d)] || d).join('');
  });
}
