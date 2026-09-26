'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ELEMENTS, CATEGORY_COLORS, CATEGORY_LABELS, CATEGORIES_IN_LEGEND, type Element, type ElementCategory } from '@/data/elements';
import styles from './PeriodicTable.module.css';

type FilterMode = 'all' | 'metals' | 'non-metals' | 'noble-gases' | 'metalloids';

const METALS: ElementCategory[] = ['alkali-metal', 'alkaline-earth-metal', 'transition-metal', 'post-transition-metal', 'lanthanide', 'actinide'];
const NON_METALS: ElementCategory[] = ['nonmetal', 'halogen'];

function filterMatch(el: Element, mode: FilterMode): boolean {
  if (mode === 'all') return true;
  if (mode === 'metals') return METALS.includes(el.category);
  if (mode === 'non-metals') return NON_METALS.includes(el.category);
  if (mode === 'noble-gases') return el.category === 'noble-gas';
  if (mode === 'metalloids') return el.category === 'metalloid';
  return true;
}

export default function PeriodicTablePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [hovered, setHovered] = useState<Element | null>(null);

  // Separate elements into main table and lanthanide/actinide rows
  const mainElements = useMemo(() => ELEMENTS.filter(el => el.period <= 7), []);
  const lanthanides  = useMemo(() => ELEMENTS.filter(el => el.period === 8).sort((a,b) => a.group - b.group), []);
  const actinides    = useMemo(() => ELEMENTS.filter(el => el.period === 9).sort((a,b) => a.group - b.group), []);

  function isHighlighted(el: Element): boolean {
    if (!filterMatch(el, filter)) return false;
    if (search.trim() === '') return true;
    const s = search.toLowerCase();
    return (
      el.name.toLowerCase().includes(s) ||
      el.symbol.toLowerCase().includes(s) ||
      String(el.atomicNumber).includes(s)
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.title}>Periodic Table of Elements</h1>
            <p className={styles.subtitle}>Explore all 118 elements. Click on any element to learn more.</p>
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
              placeholder="Search element (e.g. Oxygen, O, 8)…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search elements"
              id="pt-search"
            />
          </div>
        </div>
        {/* Filters */}
        <div className={styles.filters} role="group" aria-label="Filter elements">
          {(['all', 'metals', 'non-metals', 'noble-gases', 'metalloids'] as FilterMode[]).map(f => (
            <button
              key={f}
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === 'all' ? 'All' : f.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table container */}
      <div className={styles.tableContainer} role="region" aria-label="Periodic table">
        {/* Group numbers 1-18 */}
        <div className={styles.groupNumbers} aria-hidden="true">
          <div />
          {Array.from({ length: 18 }, (_, i) => (
            <div key={i+1} className={styles.groupNum}>{i + 1}</div>
          ))}
        </div>

        {/* Periods 1-7 */}
        {[1,2,3,4,5,6,7].map(period => (
          <div key={period} className={styles.tableRow}>
            <div className={styles.periodLabel} aria-label={`Period ${period}`}>{period}</div>
            {Array.from({ length: 18 }, (_, colIdx) => {
              const group = colIdx + 1;
              const el = mainElements.find(e => e.period === period && e.group === group);

              // Special placeholder for La/Ac position
              if (period === 6 && group === 3) {
                return (
                  <div key={group} className={styles.cell}>
                    <div className={styles.lanthanidePlaceholder} aria-label="Lanthanides">
                      <span>57–71</span>
                      <span>La–Lu</span>
                    </div>
                  </div>
                );
              }
              if (period === 7 && group === 3) {
                return (
                  <div key={group} className={styles.cell}>
                    <div className={styles.actinidePlaceholder} aria-label="Actinides">
                      <span>89–103</span>
                      <span>Ac–Lr</span>
                    </div>
                  </div>
                );
              }
              if (!el) {
                return <div key={group} className={styles.cell} aria-hidden="true" />;
              }

              const highlighted = isHighlighted(el);
              return (
                <div key={group} className={styles.cell}>
                  <ElementCell
                    el={el}
                    highlighted={highlighted}
                    onHover={setHovered}
                  />
                </div>
              );
            })}
          </div>
        ))}

        {/* Spacer row */}
        <div className={styles.seriesGap} aria-hidden="true" />

        {/* Lanthanides row */}
        <div className={styles.seriesRow}>
          <div className={styles.seriesLabel}>Lanthanides<br/>57–71</div>
          {lanthanides.map(el => (
            <ElementCell
              key={el.symbol}
              el={el}
              highlighted={isHighlighted(el)}
              onHover={setHovered}
            />
          ))}
        </div>

        {/* Actinides row */}
        <div className={styles.seriesRow}>
          <div className={styles.seriesLabel}>Actinides<br/>89–103</div>
          {actinides.map(el => (
            <ElementCell
              key={el.symbol}
              el={el}
              highlighted={isHighlighted(el)}
              onHover={setHovered}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className={styles.legend} aria-label="Element category legend">
        {CATEGORIES_IN_LEGEND.map(cat => {
          const c = CATEGORY_COLORS[cat];
          return (
            <div key={cat} className={styles.legendItem}>
              <span
                className={styles.legendSwatch}
                style={{ background: c.bg, borderColor: c.border }}
                aria-hidden="true"
              />
              <span className={styles.legendLabel}>{CATEGORY_LABELS[cat]}</span>
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {hovered && <ElementTooltip el={hovered} />}
    </div>
  );
}

// ── Element Cell ──────────────────────────────────────────────────────────

function ElementCell({
  el,
  highlighted,
  onHover,
}: {
  el: Element;
  highlighted: boolean;
  onHover: (el: Element | null) => void;
}) {
  const c = CATEGORY_COLORS[el.category];
  return (
    <Link
      href={`/elements/${el.symbol}`}
      className={`${styles.elementCell} ${highlighted ? styles.elementVisible : styles.elementDim}`}
      style={{
        '--el-bg': c.bg,
        '--el-text': c.text,
        '--el-border': c.border,
      } as React.CSSProperties}
      onMouseEnter={() => onHover(el)}
      onMouseLeave={() => onHover(null)}
      aria-label={`${el.name}, atomic number ${el.atomicNumber}, ${CATEGORY_LABELS[el.category]}`}
      title={el.name}
    >
      <span className={styles.atomicNum}>{el.atomicNumber}</span>
      <span className={styles.elSymbol}>{el.symbol}</span>
      <span className={styles.elName}>{el.name}</span>
      <span className={styles.elMass}>{el.atomicMass.toFixed(el.atomicMass < 100 ? 2 : 1)}</span>
    </Link>
  );
}

// ── Element Hover Tooltip ─────────────────────────────────────────────────

function ElementTooltip({ el }: { el: Element }) {
  const c = CATEGORY_COLORS[el.category];
  return (
    <div className={styles.tooltip} role="status" aria-live="polite">
      <div className={styles.tooltipTile} style={{ background: c.bg, borderColor: c.border }}>
        <span className={styles.tooltipAtomicNum} style={{ color: c.text }}>{el.atomicNumber}</span>
        <span className={styles.tooltipSymbol} style={{ color: c.text }}>{el.symbol}</span>
        <span className={styles.tooltipName} style={{ color: c.text }}>{el.name}</span>
        <span className={styles.tooltipMass} style={{ color: c.text }}>{el.atomicMass}</span>
      </div>
      <div className={styles.tooltipInfo}>
        <span className={styles.tooltipCategoryBadge} style={{ background: c.bg, color: c.text, borderColor: c.border }}>
          {CATEGORY_LABELS[el.category]}
        </span>
        <p className={styles.tooltipDesc}>{el.description.slice(0, 120)}…</p>
        <div className={styles.tooltipMeta}>
          <span>State: {el.state.charAt(0).toUpperCase() + el.state.slice(1)}</span>
          {el.meltingPoint !== undefined && <span>MP: {el.meltingPoint}°C</span>}
        </div>
      </div>
    </div>
  );
}
