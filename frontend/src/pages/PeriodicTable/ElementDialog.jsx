import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AtomModel } from './AtomModel';

const EXIT_DELAY_MS = 320;

/**
 * Full-screen morphing element detail dialog.
 * The panel morphs from the clicked tile using a shared layoutId.
 */
export const ElementDialog = ({ element, onClose }) => {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!element) return undefined;
    setStage(0);
    setPlaying(true);
    // Move initial focus into the dialog, onto Close
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const f = dialogRef.current?.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
        if (!f || f.length === 0) return;
        const list = Array.from(f).filter((el) => !el.disabled);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [element, onClose]);

  const stages = ['model'];

  return (
    <AnimatePresence>
      {element && (
        <>
          <motion.div
            className="zp-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <div className="zp-dialog-wrap">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="zp-d-heading"
              className="zp-dialog"
              layoutId={`element-${element.n}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ layout: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }, duration: 0.25 }}
            >
              <div className="zp-d-header">
                <div className="zp-d-nums">
                  {element.n}
                  <br />
                  {element.mass}
                </div>
                <div className="zp-d-sym" style={{ color: `var(--zp-cat-${element.cat}-text)` }}>
                  {element.sym}
                </div>
                <div id="zp-d-heading" className="zp-d-title" style={{ marginLeft: 'auto' }}>
                  {element.name}
                </div>
              </div>

              <div className="zp-d-panel">
                <div className="zp-info-card">
                  <div className="zp-info-row">
                    <span className="zp-info-key">TYPE</span>
                    <span className="zp-info-val">{element.typeLabel}</span>
                  </div>
                  <div className="zp-info-row">
                    <span className="zp-info-key">GROUP / PERIOD</span>
                    <span className="zp-info-val">{element.group}</span>
                  </div>
                  <div className="zp-info-row">
                    <span className="zp-info-key">PHASE @ STP</span>
                    <span className="zp-info-val">{element.phase}</span>
                  </div>
                  <div className="zp-info-row">
                    <span className="zp-info-key">VALENCE ELECTRONS</span>
                    <span className="zp-info-val">{element.valence}</span>
                  </div>
                </div>

                <div className="zp-ions">
                  <div className="zp-ions-title">COMMON IONS</div>
                  {element.ions.length ? (
                    element.ions.slice(0, 3).map((ion) => (
                      <div key={ion.label} className="zp-ion-chip">
                        <span className="zp-ion-sym">{ion.label}</span>
                        <span className="zp-ion-name">{element.name} ion</span>
                      </div>
                    ))
                  ) : (
                    <div className="zp-ions-empty">No stable ions</div>
                  )}
                </div>

                <p className="zp-d-desc">{element.desc}</p>
              </div>

              <div className="zp-d-stage">
                <span className="zp-url-cite">{element.name.toUpperCase()}</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <AtomModel element={element} paused={!playing} />
                  </motion.div>
                </AnimatePresence>
                <div className="zp-d-tabs">
                  {stages.map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      aria-label={`Show ${s}`}
                      aria-pressed={i === stage}
                      className={`zp-d-dot ${i === stage ? 'is-active' : ''}`}
                      onClick={() => setStage(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="zp-d-save"
                  aria-label={playing ? 'Pause atom animation' : 'Play atom animation'}
                  onClick={() => setPlaying((p) => !p)}
                  style={{ right: 52 }}
                >
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M7 4.5v15a1 1 0 0 0 1.53.85l11.14-7.5a1 1 0 0 0 0-1.7L8.53 3.65A1 1 0 0 0 7 4.5z" />
                    </svg>
                  )}
                </button>
                <button type="button" className="zp-d-save" title="Save element" aria-label="Save element">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
                    <path d="M5 21h14" />
                  </svg>
                </button>
              </div>

              <button ref={closeRef} type="button" className="zp-d-close" aria-label="Close dialog" onClick={onClose}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export { EXIT_DELAY_MS };
export default ElementDialog;
