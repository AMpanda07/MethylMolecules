'use client';

import React, { useState } from 'react';
import { DetailedElement } from '@/data/elements-data';
import styles from './SubatomicParticles.module.css';

interface SubatomicParticlesProps {
  element: DetailedElement;
}

export default function SubatomicParticles({ element }: SubatomicParticlesProps) {
  const [charge, setCharge] = useState<number>(0);

  const protons = element.protons;
  const neutrons = element.neutrons;
  // Dynamic electron count based on charge: electrons = protons - charge
  const electrons = Math.max(0, protons - charge);

  // Shell electron distribution display
  const shells = element.shellConfiguration;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>Subatomic Structure & Charge</h3>
          <p className={styles.subtitle}>
            Protons determine identity; electrons and charge determine chemical reactivity.
          </p>
        </div>

        {/* Charge Modifier Selector */}
        <div className={styles.chargeSelector}>
          <span className={styles.chargeLabel}>Ion Charge:</span>
          {[-1, 0, 1, 2, 3, 6].map((c) => (
            <button
              key={c}
              className={`${styles.chargeBtn} ${charge === c ? styles.chargeBtnActive : ''}`}
              onClick={() => setCharge(c)}
            >
              {c === 0 ? 'Neutral (0)' : c > 0 ? `+${c}` : `${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Subatomic Counts Cards */}
      <div className={styles.countsGrid}>
        <div className={`${styles.countCard} ${styles.protonCard}`}>
          <div className={styles.countBadge}>p⁺</div>
          <div className={styles.countInfo}>
            <span className={styles.countValue}>{protons}</span>
            <span className={styles.countName}>Protons</span>
            <span className={styles.countDesc}>Atomic Number (Z)</span>
          </div>
        </div>

        <div className={`${styles.countCard} ${styles.neutronCard}`}>
          <div className={styles.countBadge}>n⁰</div>
          <div className={styles.countInfo}>
            <span className={styles.countValue}>{neutrons}</span>
            <span className={styles.countName}>Neutrons</span>
            <span className={styles.countDesc}>Mass Number (A - Z)</span>
          </div>
        </div>

        <div className={`${styles.countCard} ${styles.electronCard}`}>
          <div className={styles.countBadge}>e⁻</div>
          <div className={styles.countInfo}>
            <span className={styles.countValue}>{electrons}</span>
            <span className={styles.countName}>Electrons</span>
            <span className={styles.countDesc}>
              {charge === 0 ? 'Neutral state' : charge > 0 ? `Cation (${charge} e⁻ lost)` : `Anion (${Math.abs(charge)} e⁻ gained)`}
            </span>
          </div>
        </div>
      </div>

      {/* Visual Shell Bar Breakdown */}
      <div className={styles.shellBreakdown}>
        <span className={styles.shellTitle}>Shell Distribution (K → Q):</span>
        <div className={styles.shellBarGrid}>
          {shells.map((count, idx) => {
            const label = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'][idx] || `n=${idx + 1}`;
            return (
              <div key={idx} className={styles.shellPill}>
                <span className={styles.shellName}>{label}</span>
                <span className={styles.shellCount}>{count} e⁻</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
