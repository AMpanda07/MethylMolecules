import { useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ELEMENTS, CATEGORY_COLORS } from '../../data/elements';
import Navbar from './Navbar';
import Hero from './Hero';
import ElementTile from './ElementTile';
import ElementDialog from './ElementDialog';
import MagneticCursor from './MagneticCursor';
import './PeriodicTable.css';

const matchQuery = (el, q) =>
  q &&
  (el.name.toLowerCase().includes(q) ||
    el.sym.toLowerCase() === q ||
    el.sym.toLowerCase().startsWith(q));

export const PeriodicTablePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').toLowerCase().trim();
  const category = (searchParams.get('cat') ?? '').toLowerCase();

  const setQuery = useCallback(
    (v) => {
      const q = v.toLowerCase().trim();
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (q) next.set('q', q);
          else next.delete('q');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const setCategory = useCallback(
    (k) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (k) next.set('cat', k);
          else next.delete('cat');
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const [open, setOpen] = useState(null);
  const [hover, setHover] = useState(null);

  const onHoverStart = useCallback((el) => setHover({ symbol: el.sym, name: el.name, type: CATEGORY_COLORS[el.cat].label, color: CATEGORY_COLORS[el.cat].bg, textColor: CATEGORY_COLORS[el.cat].text }), []);
  const onHoverEnd = useCallback(() => setHover(null), []);

  const categories = useMemo(() => Object.entries(CATEGORY_COLORS), []);

  const filtered = useMemo(() => {
    const hasQ = Boolean(query);
    const hasCat = Boolean(category);
    const isMatch = (el) =>
      (hasQ ? matchQuery(el, query) : true) && (hasCat ? el.cat === category : true);
    return { hasQ, hasCat, isMatch };
  }, [query, category]);

  const visibleCount = useMemo(() => ELEMENTS.filter(filtered.isMatch).length, [filtered]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="zp zp-selection">
        <Navbar search={query} onSearch={setQuery} />
        <Hero />

        <section className="zp-table-section" id="table">
          <div className="zp-legend">
            {categories.map(([key, c]) => (
              <button
                key={key}
                type="button"
                aria-pressed={category === key}
                className={[
                  'zp-legend-chip',
                  category === key ? 'is-active' : '',
                  category && category !== key ? 'is-dim' : '',
                ].join(' ')}
                onClick={() => setCategory(category === key ? '' : key)}
              >
                <span className="swatch" style={{ background: c.bg, border: `1px solid ${c.text}33` }} />
                {c.label}
              </button>
            ))}
            {category && (
              <button type="button" className="zp-legend-chip" onClick={() => setCategory('')}>
                Clear Filter ✕
              </button>
            )}
          </div>

          <p className="zp-visually-hidden" aria-live="polite">
            {visibleCount === 0
              ? 'No elements match your search or filter'
              : `${visibleCount} of 118 elements shown`}
          </p>

          <div className="zp-table-wrap">
            {visibleCount === 0 ? (
              <div className="zp-empty">
                <p>
                  No elements found{query ? ` for “${query}”` : ''}
                  {category ? ` in ${CATEGORY_COLORS[category]?.label ?? category}` : ''}. Try a
                  different symbol, name or clear the filters.
                </p>
              </div>
            ) : (
              <div className="zp-table" style={{ gridTemplateRows: 'auto auto auto auto auto auto auto 22px auto auto' }}>
                {ELEMENTS.map((el) => {
                  const matched = filtered.isMatch(el);
                  return (
                    <ElementTile
                      key={el.n}
                      item={el}
                      color={CATEGORY_COLORS[el.cat]}
                      dim={(filtered.hasQ || filtered.hasCat) && !matched}
                      onOpen={setOpen}
                      onHoverStart={onHoverStart}
                      onHoverEnd={onHoverEnd}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <footer className="zp-footer">
          © 2026 Zperiod · Interactive periodic table · Built with the Zperiod design system
        </footer>

        <ElementDialog element={open} onClose={() => setOpen(null)} />
        <MagneticCursor hover={hover} />
      </div>
    </MotionConfig>
  );
};

export default PeriodicTablePage;
