'use client';

import Link from 'next/link';
import styles from './FeatureCards.module.css';

interface FeatureCard {
  id: string;
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'violet' | 'orange';
  badge?: string;
}

const CARDS: FeatureCard[] = [
  {
    id: 'feature-periodic-table',
    href: '/elements',
    title: 'Periodic Table',
    description:
      'Explore all 118 elements. Filter by category, click to dive deeper into any element.',
    color: 'blue',
    badge: '118 Elements',
    icon: <PeriodicTableIcon />,
  },
  {
    id: 'feature-molecule-lab',
    href: '/molecule-lab',
    title: 'Molecule Lab',
    description:
      'Build and visualise molecules in 3D. Connect atoms and discover molecular structures.',
    color: 'green',
    badge: 'Interactive 3D',
    icon: <MoleculeLabIcon />,
  },
  {
    id: 'feature-molecule-library',
    href: '/molecules',
    title: 'Molecule Library',
    description:
      'Explore common molecules like water, glucose, and benzene. See them in your world.',
    color: 'violet',
    badge: 'Real-world',
    icon: <MoleculeLibraryIcon />,
  },
  {
    id: 'feature-learn',
    href: '/learn',
    title: 'Learn Chemistry',
    description:
      'Study atomic structure, bonding, reactions, and more with visual progressive lessons.',
    color: 'orange',
    badge: '12 Topics',
    icon: <LearnIcon />,
  },
];

export default function FeatureCards() {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <h2 id="features-heading" className={styles.sectionTitle}>
            Start Exploring
          </h2>
          <p className={styles.sectionSub}>
            Four ways to understand the world of chemistry
          </p>
        </div>

        <div className={styles.grid} role="list">
          {CARDS.map((card) => (
            <FeatureCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ card }: { card: FeatureCard }) {
  return (
    <Link
      href={card.href}
      className={`${styles.card} ${styles[`card--${card.color}`]}`}
      id={card.id}
      role="listitem"
      aria-label={`${card.title} — ${card.description}`}
    >
      {/* Icon area */}
      <div className={`${styles.iconWrap} ${styles[`icon--${card.color}`]}`} aria-hidden="true">
        {card.icon}
      </div>

      <div className={styles.cardBody}>
        {/* Badge */}
        {card.badge && (
          <span className={`${styles.badge} ${styles[`badge--${card.color}`]}`}>
            {card.badge}
          </span>
        )}

        {/* Title */}
        <h3 className={styles.cardTitle}>{card.title}</h3>

        {/* Description */}
        <p className={styles.cardDesc}>{card.description}</p>
      </div>

      {/* Arrow */}
      <span className={styles.arrow} aria-hidden="true">
        <ArrowRight />
      </span>
    </Link>
  );
}

// ── Icons ──────────────────────────────────────────────────────────────────

function PeriodicTableIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {[
        [2,2], [12,2], [22,2], [32,2],
        [2,12], [12,12], [22,12], [32,12],
        [2,22], [12,22], [22,22], [32,22],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" rx="1.5"
          fill="currentColor" opacity={i === 5 ? 0.9 : 0.25 + (i % 4) * 0.15} />
      ))}
      {/* Highlight O */}
      <rect x="12" y="12" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.95"/>
      <text x="16" y="18.5" textAnchor="middle" fontSize="5.5" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="white">O</text>
    </svg>
  );
}

function MoleculeLabIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Central O */}
      <circle cx="22" cy="22" r="7" fill="currentColor" opacity="0.9"/>
      <text x="22" y="25.5" textAnchor="middle" fontSize="7" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="white">O</text>
      {/* H left */}
      <line x1="15" y1="22" x2="7" y2="15" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      <circle cx="5" cy="13" r="4.5" fill="currentColor" opacity="0.5"/>
      <text x="5" y="16" textAnchor="middle" fontSize="5" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="white">H</text>
      {/* H right */}
      <line x1="29" y1="22" x2="37" y2="15" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
      <circle cx="39" cy="13" r="4.5" fill="currentColor" opacity="0.5"/>
      <text x="39" y="16" textAnchor="middle" fontSize="5" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="white">H</text>
    </svg>
  );
}

function MoleculeLibraryIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Simple benzene ring representation */}
      {/* Hexagon */}
      <polygon points="22,6 36,14 36,30 22,38 8,30 8,14"
        stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Alternating double bonds (simplified inner hexagon) */}
      <polygon points="22,12 31,17 31,27 22,32 13,27 13,17"
        stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" opacity="0.8" />
      {/* Centre dot */}
      <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function LearnIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      {/* Book */}
      <rect x="8" y="8" width="28" height="34" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.8" opacity="0.8"/>
      {/* Spine */}
      <line x1="16" y1="8" x2="16" y2="42" stroke="currentColor" strokeWidth="1.8" opacity="0.6"/>
      {/* Lines of text */}
      <line x1="20" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="20" y1="21" x2="32" y2="21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="20" y1="26" x2="28" y2="26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
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
