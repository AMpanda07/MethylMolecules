'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import ScientificIllustration from '@/components/Hero/ScientificIllustration';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Staggered entrance animation via class addition
    requestAnimationFrame(() => {
      el.classList.add(styles.heroVisible);
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="hero-headline"
    >
      <div className={styles.heroInner}>
        {/* Text column */}
        <div className={styles.heroContent}>
          <h1 id="hero-headline" className={styles.headline}>
            <span className={styles.brandName}>Methyle Molecule</span>
          </h1>
          <h2 className={styles.sub}>
            Master Chemistry.<br />Visually &amp; Instantly.
          </h2>

          <div className={styles.badgeRow} aria-label="Platform highlights">
            <span className={styles.badge}>118 Elements</span>
            <span className={styles.badge}>3D Models</span>
            <span className={styles.badge}>Free</span>
          </div>

          <div className={styles.heroActions}>
            <Link
              href="/elements"
              className={`btn btn-primary btn-lg ${styles.btnPrimary}`}
              id="hero-cta-primary"
            >
              Start Exploring
              <ArrowRight />
            </Link>
          </div>
        </div>

        {/* Illustration column */}
        <div className={styles.heroVisual} aria-hidden="true">
          <ScientificIllustration />
        </div>
      </div>

      {/* Background decorative molecule orbits */}
      <div className={styles.bgOrbit} aria-hidden="true">
        <div className={styles.orbitRing} />
        <div className={styles.orbitRing} />
        <div className={styles.orbitRing} />
      </div>
    </section>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 9H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 4.5L14.5 9L10 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
