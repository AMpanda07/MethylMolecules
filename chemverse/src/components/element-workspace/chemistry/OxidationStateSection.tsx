'use client';

import React, { useState } from 'react';
import { DetailedElement } from '@/data/elements-data';
import styles from './OxidationStateSection.module.css';

interface OxidationStateSectionProps {
  element: DetailedElement;
}

export default function OxidationStateSection({ element }: OxidationStateSectionProps) {
  const [selectedState, setSelectedState] = useState<number | null>(null);

  const allStates = element.oxidationStates;
  const commonStates = element.commonOxidationStates;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Oxidation States</h3>
      <p className={styles.subtitle}>
        Theoretical or real charges an atom would have if all bonds were purely ionic. Highlighted pills represent common oxidation states.
      </p>

      <div className={styles.pillsRow}>
        {allStates.map((st) => {
          const isCommon = commonStates.includes(st);
          const isSelected = selectedState === st;
          const displayStr = st > 0 ? `+${st}` : String(st);

          return (
            <button
              key={st}
              className={`${styles.pill} ${isCommon ? styles.pillCommon : styles.pillRare} ${
                isSelected ? styles.pillSelected : ''
              }`}
              onClick={() => setSelectedState(selectedState === st ? null : st)}
            >
              <span className={styles.stateNum}>{displayStr}</span>
              <span className={styles.stateLabel}>{isCommon ? 'Common' : 'Rare'}</span>
            </button>
          );
        })}
      </div>

      {selectedState !== null && (
        <div className={styles.stateDetailBox}>
          <span className={styles.detailTitle}>
            Oxidation State {selectedState > 0 ? `+${selectedState}` : selectedState}
          </span>
          <p className={styles.detailDesc}>
            {commonStates.includes(selectedState)
              ? `Major, highly stable oxidation state of ${element.name}. Frequently observed in aqueous ions and solid compounds.`
              : `Secondary or rare oxidation state of ${element.name}, usually existing only under extreme oxidizing or reducing chemical conditions.`}
          </p>
        </div>
      )}
    </div>
  );
}
