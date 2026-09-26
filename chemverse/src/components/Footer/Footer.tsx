import Link from 'next/link';
import AtomIcon from '@/components/icons/AtomIcon';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  Explore: [
    { label: 'Periodic Table', href: '/elements' },
    { label: 'Discover Elements', href: '/discover' },
    { label: 'Molecule Library', href: '/molecules' },
    { label: 'Molecule Lab', href: '/molecule-lab' },
  ],
  Learn: [
    { label: 'Atomic Structure', href: '/learn/atomic-structure' },
    { label: 'Chemical Bonding', href: '/learn/chemical-bonding' },
    { label: 'Organic Chemistry', href: '/learn/organic-chemistry' },
    { label: 'Practice Quizzes', href: '/practice' },
  ],
  Platform: [
    { label: 'About Methyl Orange', href: '/about' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="Methyl Orange home">
              <span className={styles.logoIcon} aria-hidden="true">
                <AtomIcon size={24} />
              </span>
              <span className={styles.logoText}>Methyl Orange</span>
            </Link>
            <p className={styles.tagline}>
              Making chemistry feel understandable — before making it feel advanced.
            </p>
            {/* Periodic table mini-banner */}
            <div className={styles.ptBanner} aria-hidden="true">
              {['H','He','Li','C','N','O','Na','K','Fe','Cu','Au','Hg'].map((s) => (
                <span key={s} className={styles.ptCell}>{s}</span>
              ))}
              <span className={styles.ptEllipsis}>…118 elements</span>
            </div>
          </div>

          {/* Link columns */}
          <nav className={styles.linkColumns} aria-label="Footer navigation">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category} className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>{category}</h3>
                <ul role="list">
                  {links.map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className={styles.footerLink}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className={styles.divider} role="separator" />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Methyl Orange. Built for curious students everywhere.
          </p>
          <p className={styles.madeWith}>
            <span aria-hidden="true">⚗️</span> Open chemistry education
          </p>
        </div>
      </div>
    </footer>
  );
}
