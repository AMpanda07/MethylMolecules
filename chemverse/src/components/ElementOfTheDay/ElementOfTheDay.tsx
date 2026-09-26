import Link from 'next/link';
import styles from './ElementOfTheDay.module.css';

// In production this would come from an API/data layer based on the day
const ELEMENT_OF_THE_DAY = {
  symbol: 'C',
  name: 'Carbon',
  atomicNumber: 6,
  category: 'Non-metal',
  categoryColor: 'green' as const,
  tagline: 'The building block of life and countless compounds.',
  fact1: 'Carbon forms more compounds than any other element.',
  fact2: 'Diamonds and graphite are both pure carbon — just arranged differently.',
  description:
    'Carbon is found in every living organism on Earth. It forms the backbone of organic chemistry and can bond with itself in extraordinary ways — creating everything from the graphite in pencils to the diamonds in jewellery.',
  href: '/elements/C',
};

const CATEGORY_COLORS = {
  green:  { bg: 'var(--green-soft)',  text: 'var(--green)',  border: 'rgba(90,158,74,0.25)' },
  blue:   { bg: 'var(--blue-faint)',  text: 'var(--blue)',   border: 'rgba(30,95,204,0.25)' },
  violet: { bg: 'var(--violet-soft)', text: 'var(--violet)', border: 'rgba(123,94,167,0.25)' },
  red:    { bg: 'var(--red-soft)',    text: 'var(--red)',    border: 'rgba(192,71,58,0.25)' },
};

export default function ElementOfTheDay() {
  const el = ELEMENT_OF_THE_DAY;
  const colors = CATEGORY_COLORS[el.categoryColor];

  return (
    <section className={styles.section} aria-labelledby="eotd-heading">
      <div className={styles.inner}>

        {/* Section label */}
        <div className={styles.sectionLabel}>
          <span className={styles.labelDot} aria-hidden="true"/>
          <span id="eotd-heading">Element of the Day</span>
        </div>

        <article className={styles.card} aria-label={`Element of the Day: ${el.name}`}>
          {/* Left: Identity */}
          <div className={styles.identity}>
            {/* Large tile */}
            <div className={styles.elementTile}
              style={{
                '--tile-bg': colors.bg,
                '--tile-text': colors.text,
                '--tile-border': colors.border,
              } as React.CSSProperties}
            >
              <span className={styles.atomicNumber}>{el.atomicNumber}</span>
              <span className={styles.symbol}>{el.symbol}</span>
              <span className={styles.elementName}>{el.name}</span>
            </div>

            {/* Handwritten annotation */}
            <div className={styles.annotation} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 15 Q6 8 14 2" stroke="#ABA79E" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M10 2 L14 2 L14 6" stroke="#ABA79E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Found in every living thing!</span>
            </div>
          </div>

          {/* Center: Info */}
          <div className={styles.info}>
            <span
              className={styles.categoryBadge}
              style={{
                background: colors.bg,
                color: colors.text,
                borderColor: colors.border,
              } as React.CSSProperties}
            >
              {el.category}
            </span>

            <h3 className={styles.tagline}>{el.tagline}</h3>
            <p className={styles.description}>{el.description}</p>

            <ul className={styles.facts} aria-label="Interesting facts">
              <li className={styles.fact}>
                <span className={styles.factDot} aria-hidden="true">✦</span>
                {el.fact1}
              </li>
              <li className={styles.fact}>
                <span className={styles.factDot} aria-hidden="true">✦</span>
                {el.fact2}
              </li>
            </ul>

            <Link
              href={el.href}
              className={styles.exploreBtn}
              id="eotd-explore-btn"
              aria-label={`Explore ${el.name} in detail`}
            >
              Explore Carbon
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right: Visual representation */}
          <div className={styles.visual} aria-hidden="true">
            <CarbonVisual />
          </div>
        </article>
      </div>
    </section>
  );
}

/**
 * SVG visual representing carbon's allotropes and properties
 */
function CarbonVisual() {
  return (
    <svg viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.visualSvg}>
      <defs>
        <radialGradient id="carbonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E6F4E0" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#F7F4EC" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <ellipse cx="140" cy="180" rx="110" ry="110" fill="url(#carbonGlow)" />

      {/* Graphene hexagonal lattice (simplified) */}
      <g opacity="0.35" stroke="#5A9E4A" strokeWidth="1.2">
        {/* Row 1 */}
        <polygon points="90,60 110,70 110,90 90,100 70,90 70,70" fill="none"/>
        <polygon points="130,60 150,70 150,90 130,100 110,90 110,70" fill="none"/>
        <polygon points="170,60 190,70 190,90 170,100 150,90 150,70" fill="none"/>
        {/* Row 2 */}
        <polygon points="70,90 90,100 90,120 70,130 50,120 50,100" fill="none"/>
        <polygon points="110,90 130,100 130,120 110,130 90,120 90,100" fill="none"/>
        <polygon points="150,90 170,100 170,120 150,130 130,120 130,100" fill="none"/>
        <polygon points="190,90 210,100 210,120 190,130 170,120 170,100" fill="none"/>
        {/* Row 3 */}
        <polygon points="90,120 110,130 110,150 90,160 70,150 70,130" fill="none"/>
        <polygon points="130,120 150,130 150,150 130,160 110,150 110,130" fill="none"/>
        <polygon points="170,120 190,130 190,150 170,160 150,150 150,130" fill="none"/>
      </g>

      {/* Central large carbon atom */}
      <circle cx="140" cy="160" r="28" fill="#E6F4E0" stroke="#5A9E4A" strokeWidth="2"/>
      <text x="140" y="154" textAnchor="middle" fontSize="22" fontWeight="700"
        fontFamily="Inter,sans-serif" fill="#3D7A30">C</text>
      <text x="140" y="175" textAnchor="middle" fontSize="10" fontFamily="Inter,sans-serif"
        fill="#5A9E4A" fontWeight="500">Carbon</text>

      {/* 4 bonding electrons represented */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const bx = 140 + Math.cos(rad) * 70;
        const by = 160 + Math.sin(rad) * 70;
        return (
          <g key={i}>
            <line
              x1={140 + Math.cos(rad) * 30}
              y1={160 + Math.sin(rad) * 30}
              x2={140 + Math.cos(rad) * 62}
              y2={160 + Math.sin(rad) * 62}
              stroke="#5A9E4A" strokeWidth="1.5" opacity="0.6"
            />
            <circle cx={bx} cy={by} r="8" fill="#F7F4EC" stroke="#5A9E4A" strokeWidth="1.3" opacity="0.8"/>
            <text x={bx} y={by + 4} textAnchor="middle" fontSize="7.5" fontWeight="600"
              fontFamily="Inter,sans-serif" fill="#5A9E4A">e⁻</text>
          </g>
        );
      })}

      {/* Diamond crystal lattice hint bottom right */}
      <g opacity="0.5" transform="translate(185, 220)">
        <text x="0" y="0" fontSize="9" fontFamily="Georgia,serif" fill="#7A766C" fontStyle="italic">
          Diamond
        </text>
        {/* Simple diamond shape */}
        <polygon points="18,8 28,18 18,28 8,18"
          stroke="#ABA79E" strokeWidth="1" fill="none" transform="translate(-2,4)"/>
      </g>

      {/* Graphite hint */}
      <g opacity="0.5" transform="translate(32, 220)">
        <text x="0" y="0" fontSize="9" fontFamily="Georgia,serif" fill="#7A766C" fontStyle="italic">
          Graphite
        </text>
        {/* Simple stacked lines */}
        {[4,8,12,16,20].map((y,i) => (
          <line key={i} x1="0" y1={y+4} x2="22" y2={y+4}
            stroke="#ABA79E" strokeWidth={1 + (i%2)*0.3} strokeLinecap="round" opacity="0.7"/>
        ))}
      </g>

      {/* Atomic number label */}
      <text x="140" y="302" textAnchor="middle" fontSize="11" fontFamily="Inter,sans-serif"
        fill="#ABA79E">Atomic Number 6 · Period 2</text>
    </svg>
  );
}
