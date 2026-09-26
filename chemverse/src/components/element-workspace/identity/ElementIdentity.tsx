'use client';

import React from 'react';
import { DetailedElement } from '@/data/elements-data';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/data/elements';
import styles from './ElementIdentity.module.css';

interface ElementIdentityProps {
  element: DetailedElement;
  massPrecision: '3dec' | 'full';
}

export default function ElementIdentity({ element, massPrecision }: ElementIdentityProps) {
  const c = CATEGORY_COLORS[element.category];

  const formattedMass = massPrecision === '3dec' ? element.atomicMass.toFixed(3) : String(element.atomicMass);

  return (
    <div className={styles.identityCard}>
      {/* Large Tile Badge */}
      <div
        className={styles.tile}
        style={{
          backgroundColor: c.bg,
          color: c.text,
          borderColor: c.border,
        }}
      >
        <span className={styles.atomicNumber}>{element.atomicNumber}</span>
        <span className={styles.symbol}>{element.symbol}</span>
        <span className={styles.name}>{element.name}</span>
        <span className={styles.mass}>{formattedMass} u</span>
      </div>

      {/* Primary Details */}
      <div className={styles.details}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>{element.name}</h1>
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge} style={{ background: c.bg, color: c.text, borderColor: c.border }}>
                {CATEGORY_LABELS[element.category]}
              </span>
              <span className={styles.pillBadge}>Group {element.group > 0 ? element.group : '—'}</span>
              <span className={styles.pillBadge}>Period {element.period}</span>
              <span className={styles.pillBadge}>{element.block}-block</span>
              <span className={styles.pillBadge} style={{ textTransform: 'capitalize' }}>
                {element.state} at STP
              </span>
            </div>
          </div>
        </div>

        <p className={styles.description}>{element.description}</p>

        {/* Quick Identity Tags Grid */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Electron Config</span>
            <span className={styles.metaValue}>{element.electronConfiguration}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Shell Breakdown</span>
            <span className={styles.metaValue}>{element.shellConfiguration.join(' - ')}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Valence Electrons</span>
            <span className={styles.metaValue}>{element.valenceElectrons} e⁻</span>
          </div>
        </div>
      </div>
    </div>
  );
}
