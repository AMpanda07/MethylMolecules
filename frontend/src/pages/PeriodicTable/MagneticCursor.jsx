import { useEffect, useRef } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/**
 * Custom spring cursor shown across the periodic table surface.
 * Follows the mouse with springy animation and renders the hovered element.
 * Disabled entirely when the user prefers reduced motion.
 */
export const MagneticCursor = ({ hover }) => {
  const orbRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let controlsX;
    let controlsY;
    const onMove = (e) => {
      const orb = orbRef.current;
      if (!orb) return;
      if (controlsX) controlsX.stop();
      if (controlsY) controlsY.stop();
      controlsX = animate(orb, { x: e.clientX }, { type: 'spring', stiffness: 450, damping: 28, mass: 0.6 });
      controlsY = animate(orb, { y: e.clientY }, { type: 'spring', stiffness: 450, damping: 28, mass: 0.6 });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (controlsX) controlsX.stop();
      if (controlsY) controlsY.stop();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div ref={orbRef} className="zp-cursor" style={{ willChange: 'transform' }}>
      {hover ? (
        <>
          <div
            className="zp-cursor-orb"
            style={{ background: hover.color, color: hover.textColor, transition: 'background .18s var(--zp-ease)' }}
            aria-hidden="true"
          >
            {hover.symbol}
          </div>
          <div className="zp-cursor-tag">
            {hover.name} · {hover.type}
          </div>
        </>
      ) : (
        <div className="zp-cursor-orb" style={{ background: '#FFFFFF', border: '1px solid #2E46681F', width: 12, height: 12 }} aria-hidden="true" />
      )}
    </div>
  );
};

export default MagneticCursor;
