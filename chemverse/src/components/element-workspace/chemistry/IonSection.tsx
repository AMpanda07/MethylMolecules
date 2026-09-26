'use client';

import React from 'react';
import { DetailedElement } from '@/data/elements-data';
import styles from './IonSection.module.css';

interface IonSectionProps {
  element: DetailedElement;
}

export default function IonSection({ element }: IonSectionProps) {
  const ions = element.ions;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Common Ions of {element.name}</h3>
      <p className={styles.subtitle}>
        Charged ionic species formed when {element.name} loses or gains valence electrons in aqueous solutions or crystal lattices.
      </p>

      <div className={styles.grid}>
        {ions.map((ion, idx) => (
          <div key={idx} className={styles.ionCard}>
            <div className={styles.header}>
              <span className={styles.symbol} style={{ color: ion.colorHex || 'var(--blue)' }}>
                {ion.symbol}
              </span>
              <span className={styles.typeBadge}>
                {ion.type === 'cation' ? `+${ion.charge} Cation` : `-${Math.abs(ion.charge)} Anion`}
              </span>
            </div>

            <h4 className={styles.name}>{ion.name}</h4>

            <div className={styles.details}>
              <div className={styles.row}>
                <span className={styles.label}>Electron Count:</span>
                <span className={styles.val}>{ion.electronCount} e⁻</span>
              </div>
              <div className={styles.row}>
                <span className={styles.label}>Electron Config:</span>
                <span className={styles.val}>{ion.electronConfiguration}</span>
              </div>
            </div>

            {ion.description && <p className={styles.desc}>{ion.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
