import { Suspense } from 'react';
import MoleculeLabClient from './MoleculeLabClient';
import styles from './MoleculeLab.module.css';

export default function MoleculeLabPage() {
  return (
    <div className="protected-playground">
      <Suspense fallback={<div className={styles.page}>Loading Molecule Lab...</div>}>
        <MoleculeLabClient />
      </Suspense>
    </div>
  );
}
