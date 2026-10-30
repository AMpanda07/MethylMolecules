import { useMemo } from 'react';

/** 3D-looking layered atom model: nucleus of protons/neutrons with orbiting electron shells. */
export const AtomModel = ({ element, paused = false }) => {
  const spinClass = `zp-atom-spin${paused ? ' zp-paused' : ''}`;
  const { shells, rings } = useMemo(() => {
    const s = Array.isArray(element.shells) ? element.shells.slice(0, 5) : [1, 2, 2];
    const r = s.map((_, i) => 56 + i * 40);
    return { shells: s, rings: r };
  }, [element]);

  const protons = element.n;
  const neutrons = Math.max(1, Math.round(parseFloat(element.mass.replace(/[^0-9.]/g, '')) || element.n) - protons);
  const nucleusCount = Math.min(24, Math.max(3, Math.round((protons + neutrons) / 5)));

  // deterministic pseudo-random nucleus cluster layout
  const nucleus = useMemo(() => {
    const pts = [];
    let seed = element.n * 97;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < nucleusCount; i += 1) {
      const a = rand() * Math.PI * 2;
      const rr = Math.sqrt(rand()) * 30;
      pts.push({ x: Math.cos(a) * rr, y: Math.sin(a) * rr, size: 12 + rand() * 8, p: i % 2 === 0 });
    }
    return pts;
  }, [element.n, nucleusCount]);

  return (
    <div className="zp-atom" role="img" aria-label={`${element.name} atom model, ${element.n} protons, shell sizes ${shells.join(', ')}`}>
      <div className="zp-atom-label" aria-hidden="true">{element.sym}</div>
      {rings.map((r, i) => (
        <div
          key={r}
          className={`zp-atom-ring ${spinClass}${i % 2 ? ' reversed' : ''}`}
          style={{
            width: r * 2,
            height: r * 2,
            marginTop: -(Math.abs(Math.sin((i + 1) * 1.1)) * 14),
            marginBottom: Math.abs(Math.sin((i + 1) * 1.1)) * 14,
            rotate: `${(i - shells.length / 2) * 16}deg`,
            scaleY: 0.92 + 0.08 * (i % 3),
          }}
        >
          {Array.from({ length: shells[i] }, (_, k) => (
            <span
              key={k}
              className="zp-atom-e"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${(360 / shells[i]) * k}deg) translateX(${r}px)`,
              }}
            />
          ))}
        </div>
      ))}
      <div className={spinClass} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0 }}>
        {nucleus.map((p, i) => (
          <span
            key={i}
            className={`zp-np ${p.p ? 'p' : 'n'}`}
            style={{ left: p.x, top: p.y, width: p.size, height: p.size, margin: '0 0 0 0', translate: `${p.x - p.size / 2}px ${p.y - p.size / 2}px` }}
          />
        ))}
      </div>
    </div>
  );
};

export default AtomModel;
