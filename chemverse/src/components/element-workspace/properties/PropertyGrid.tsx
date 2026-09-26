'use client';

import React from 'react';
import { DetailedElement } from '@/data/elements-data';
import {
  UserPreferences,
  formatTemperature,
  formatDensity,
  formatEnergy,
  formatAtomicMass,
} from '@/data/preferences';
import styles from './PropertyGrid.module.css';

interface PropertyGridProps {
  element: DetailedElement;
  preferences: UserPreferences;
}

export default function PropertyGrid({ element, preferences }: PropertyGridProps) {
  const isGas = element.state === 'gas';

  const props = [
    {
      label: 'Atomic Number',
      value: String(element.atomicNumber),
      unit: '',
      category: 'Identity',
    },
    {
      label: 'Atomic Mass',
      value: formatAtomicMass(element.atomicMass, preferences.massPrecision),
      unit: 'u',
      category: 'Identity',
    },
    {
      label: 'Phase at 25°C (STP)',
      value: element.state.charAt(0).toUpperCase() + element.state.slice(1),
      unit: '',
      category: 'Physical',
    },
    {
      label: 'Density',
      value: formatDensity(element.density, preferences.densityUnit, isGas),
      unit: '',
      category: 'Physical',
    },
    {
      label: 'Melting Point',
      value: formatTemperature(element.meltingPoint, preferences.temperatureUnit),
      unit: '',
      category: 'Thermodynamic',
    },
    {
      label: 'Boiling Point',
      value: formatTemperature(element.boilingPoint, preferences.temperatureUnit),
      unit: '',
      category: 'Thermodynamic',
    },
    {
      label: 'Electronegativity',
      value: element.electronegativity ? String(element.electronegativity) : 'Not available',
      unit: element.electronegativity ? '(Pauling)' : '',
      category: 'Atomic',
    },
    {
      label: 'First Ionization Energy',
      value: formatEnergy(element.ionizationEnergy, preferences.energyUnit),
      unit: '',
      category: 'Atomic',
    },
    {
      label: 'Electron Affinity',
      value: formatEnergy(element.electronAffinity, preferences.energyUnit),
      unit: '',
      category: 'Atomic',
    },
    {
      label: 'Atomic Radius',
      value: element.atomicRadius ? String(element.atomicRadius) : 'Not available',
      unit: element.atomicRadius ? 'pm' : '',
      category: 'Atomic',
    },
    {
      label: 'Covalent Radius',
      value: element.covalentRadius ? String(element.covalentRadius) : 'Not available',
      unit: element.covalentRadius ? 'pm' : '',
      category: 'Atomic',
    },
    {
      label: 'Specific Heat',
      value: element.specificHeat ? String(element.specificHeat) : 'Not available',
      unit: element.specificHeat ? 'J/(g·K)' : '',
      category: 'Thermodynamic',
    },
    {
      label: 'Thermal Conductivity',
      value: element.thermalConductivity ? String(element.thermalConductivity) : 'Not available',
      unit: element.thermalConductivity ? 'W/(m·K)' : '',
      category: 'Thermodynamic',
    },
    {
      label: 'Crystal Structure',
      value: element.crystalStructure || 'Not available',
      unit: '',
      category: 'Physical',
    },
    {
      label: 'Electron Configuration',
      value: element.electronConfiguration,
      unit: '',
      category: 'Atomic',
    },
    {
      label: 'Common Oxidation States',
      value: element.commonOxidationStates.map((s) => (s > 0 ? `+${s}` : String(s))).join(', '),
      unit: '',
      category: 'Chemical',
    },
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Physical & Atomic Properties</h3>
      <div className={styles.grid}>
        {props.map((p, i) => (
          <div key={i} className={styles.card}>
            <span className={styles.propLabel}>{p.label}</span>
            <span className={styles.propValue}>
              {p.value} <span className={styles.propUnit}>{p.unit}</span>
            </span>
            <span className={styles.propCategory}>{p.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
