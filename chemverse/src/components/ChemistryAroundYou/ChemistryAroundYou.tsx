import Link from 'next/link';
import styles from './ChemistryAroundYou.module.css';

interface DiscoveryItem {
  id: string;
  title: string;
  substance: string;
  formula: string;
  description: string;
  color: 'blue' | 'green' | 'violet' | 'orange' | 'red';
  href: string;
  icon: React.ReactNode;
}

const ITEMS: DiscoveryItem[] = [
  {
    id: 'cay-water',
    title: 'Water',
    substance: 'H₂O',
    formula: 'Hydrogen + Oxygen',
    description:
      'The universal solvent. Two hydrogen atoms bonded to one oxygen atom form the molecule essential to all known life.',
    color: 'blue',
    href: '/molecules/water',
    icon: <WaterIcon />,
  },
  {
    id: 'cay-salt',
    title: 'Table Salt',
    substance: 'NaCl',
    formula: 'Sodium + Chlorine',
    description:
      'An ionic compound formed from a metal and a nonmetal. The electrostatic attraction between Na⁺ and Cl⁻ ions creates a crystalline structure.',
    color: 'orange',
    href: '/molecules/sodium-chloride',
    icon: <SaltIcon />,
  },
  {
    id: 'cay-air',
    title: 'Air',
    substance: 'N₂ · O₂ · Ar',
    formula: '78% N₂, 21% O₂, 1% Ar',
    description:
      'A mixture of gases — mostly nitrogen molecules with oxygen and trace amounts of noble gases. Every breath is a chemistry lesson.',
    color: 'green',
    href: '/discover?q=air',
    icon: <AirIcon />,
  },
  {
    id: 'cay-glass',
    title: 'Glass',
    substance: 'SiO₂',
    formula: 'Silicon + Oxygen',
    description:
      'Silicon dioxide arranged in a non-crystalline (amorphous) solid. Sand melted and cooled into one of civilisation\'s most important materials.',
    color: 'violet',
    href: '/elements/Si',
    icon: <GlassIcon />,
  },
  {
    id: 'cay-aspirin',
    title: 'Aspirin',
    substance: 'C₉H₈O₄',
    formula: 'Acetylsalicylic acid',
    description:
      'An organic compound that relieves pain. Its discovery in the 19th century was a landmark moment in pharmaceutical chemistry.',
    color: 'red',
    href: '/molecules/aspirin',
    icon: <AspirinIcon />,
  },
  {
    id: 'cay-co2',
    title: 'Carbon Dioxide',
    substance: 'CO₂',
    formula: 'Carbon + Oxygen × 2',
    description:
      'A linear triatomic molecule produced by respiration and combustion. Both a greenhouse gas and essential for photosynthesis.',
    color: 'green',
    href: '/molecules/carbon-dioxide',
    icon: <CO2Icon />,
  },
];

const COLOR_MAP = {
  blue:   { bg: 'var(--blue-faint)',   text: 'var(--blue)',   border: 'rgba(30,95,204,0.2)' },
  green:  { bg: 'var(--green-soft)',   text: 'var(--green)',  border: 'rgba(90,158,74,0.2)' },
  violet: { bg: 'var(--violet-soft)',  text: 'var(--violet)', border: 'rgba(123,94,167,0.2)' },
  orange: { bg: 'var(--orange-soft)',  text: 'var(--orange)', border: 'rgba(184,104,32,0.2)' },
  red:    { bg: 'var(--red-soft)',     text: 'var(--red)',    border: 'rgba(192,71,58,0.2)' },
};

export default function ChemistryAroundYou() {
  return (
    <section className={styles.section} aria-labelledby="cay-heading">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <div className={styles.sectionLabel}>
              <span className={styles.labelDot} aria-hidden="true" />
              Chemistry Around You
            </div>
            <h2 id="cay-heading" className={styles.sectionTitle}>
              Chemistry is Everywhere
            </h2>
            <p className={styles.sectionSub}>
              The substances you encounter every day are fascinating chemical stories.
            </p>
          </div>
          <Link
            href="/discover"
            className={styles.viewAllBtn}
            aria-label="View all everyday chemistry examples"
          >
            Discover more
            <ArrowRight />
          </Link>
        </div>

        <div className={styles.grid} role="list">
          {ITEMS.map((item) => {
            const c = COLOR_MAP[item.color];
            return (
              <Link
                key={item.id}
                href={item.href}
                id={item.id}
                className={styles.card}
                role="listitem"
                style={{
                  '--c-bg': c.bg,
                  '--c-text': c.text,
                  '--c-border': c.border,
                } as React.CSSProperties}
                aria-label={`${item.title} (${item.substance}) — ${item.description}`}
              >
                {/* Icon */}
                <div className={styles.iconArea} aria-hidden="true">
                  {item.icon}
                </div>

                <div className={styles.cardContent}>
                  {/* Formula badge */}
                  <span className={styles.substanceBadge}>
                    {item.substance}
                  </span>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.formulaLine}>{item.formula}</p>
                  <p className={styles.cardDesc}>{item.description}</p>
                </div>

                <span className={styles.cardArrow} aria-hidden="true">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Inline SVG Icons ──────────────────────────────────────────────────────

function WaterIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path d="M24 8 Q34 20 34 30 a10 10 0 1 1 -20 0 Q14 20 24 8Z"
        fill="var(--c-text)" fillOpacity="0.2" stroke="var(--c-text)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M24 20 Q30 28 30 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function SaltIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {[
        [10,10],[22,10],[34,10],
        [10,22],[22,22],[34,22],
        [10,34],[22,34],[34,34],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="10" height="10" rx="2"
          fill="var(--c-text)" fillOpacity={i%2===0 ? 0.35 : 0.18}
          stroke="var(--c-text)" strokeWidth="0.8" strokeOpacity="0.4"/>
      ))}
    </svg>
  );
}

function AirIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {[8,16,24,32,40].map((y, i) => (
        <path key={i}
          d={`M${8+i*2} ${y} Q24 ${y-6} ${44-i*2} ${y}`}
          stroke="var(--c-text)" strokeWidth="1.6" strokeLinecap="round"
          opacity={0.3 + i * 0.12}
        />
      ))}
    </svg>
  );
}

function GlassIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" rx="3"
        fill="var(--c-text)" fillOpacity="0.12"
        stroke="var(--c-text)" strokeWidth="1.5"/>
      <line x1="8" y1="8" x2="40" y2="40" stroke="var(--c-text)" strokeWidth="1" opacity="0.3"/>
      <line x1="40" y1="8" x2="8" y2="40" stroke="var(--c-text)" strokeWidth="1" opacity="0.2"/>
      <rect x="15" y="15" width="18" height="18" rx="2"
        fill="var(--c-text)" fillOpacity="0.15"
        stroke="var(--c-text)" strokeWidth="1" strokeOpacity="0.5"/>
    </svg>
  );
}

function AspirinIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="14" fill="var(--c-text)" fillOpacity="0.15" stroke="var(--c-text)" strokeWidth="1.5"/>
      <text x="24" y="28" textAnchor="middle" fontSize="12" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="var(--c-text)">C₉</text>
      <circle cx="24" cy="24" r="20" stroke="var(--c-text)" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="3 3"/>
    </svg>
  );
}

function CO2Icon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="7" fill="var(--c-text)" fillOpacity="0.9"/>
      <text x="24" y="27.5" textAnchor="middle" fontSize="8" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="white">C</text>
      {/* Double bond left */}
      <line x1="17" y1="22" x2="6" y2="22" stroke="var(--c-text)" strokeWidth="1.5" opacity="0.7"/>
      <line x1="17" y1="26" x2="6" y2="26" stroke="var(--c-text)" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="4" cy="24" r="5" fill="var(--c-text)" fillOpacity="0.35" stroke="var(--c-text)" strokeWidth="1.2"/>
      <text x="4" y="27" textAnchor="middle" fontSize="6.5" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="var(--c-text)" opacity="0.8">O</text>
      {/* Double bond right */}
      <line x1="31" y1="22" x2="42" y2="22" stroke="var(--c-text)" strokeWidth="1.5" opacity="0.7"/>
      <line x1="31" y1="26" x2="42" y2="26" stroke="var(--c-text)" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="44" cy="24" r="5" fill="var(--c-text)" fillOpacity="0.35" stroke="var(--c-text)" strokeWidth="1.2"/>
      <text x="44" y="27" textAnchor="middle" fontSize="6.5" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="var(--c-text)" opacity="0.8">O</text>
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
