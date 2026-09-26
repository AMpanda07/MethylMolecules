'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Element } from '@/data/elements';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '@/data/elements';
import styles from './ElementDetail.module.css';

type Tab = 'overview' | 'properties' | 'uses' | 'occurrence' | 'fun-facts';

const TABS: { key: Tab; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'properties', label: 'Properties' },
  { key: 'uses', label: 'Uses' },
  { key: 'occurrence', label: 'Occurrence' },
  { key: 'fun-facts', label: 'Fun Facts' },
];

interface Props {
  el: Element;
  prev: Element | null;
  next: Element | null;
}

export default function ElementDetailClient({ el, prev, next }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const c = CATEGORY_COLORS[el.category];

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/elements" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Periodic Table
        </Link>
      </div>

      {/* Main content */}
      <div className={styles.layout}>
        {/* Left: Identity Panel */}
        <aside className={styles.identityPanel}>
          {/* Element Tile */}
          <div
            className={styles.elementTile}
            style={{ '--el-bg': c.bg, '--el-text': c.text, '--el-border': c.border } as React.CSSProperties}
          >
            <span className={styles.atomicNumber}>{el.atomicNumber}</span>
            <span className={styles.symbol}>{el.symbol}</span>
            <span className={styles.name}>{el.name}</span>
            <span className={styles.mass}>{el.atomicMass}</span>
          </div>

          {/* Category badge */}
          <span
            className={styles.categoryBadge}
            style={{ background: c.bg, color: c.text, borderColor: c.border } as React.CSSProperties}
          >
            {CATEGORY_LABELS[el.category]}
          </span>

          {/* Quick Info */}
          <div className={styles.quickInfo}>
            <h3 className={styles.quickInfoTitle}>Quick Info</h3>
            <div className={styles.quickInfoGrid}>
              <QuickInfoRow label="Atomic Number" value={String(el.atomicNumber)} />
              <QuickInfoRow label="Atomic Mass" value={`${el.atomicMass} u`} />
              <QuickInfoRow label="Period" value={String(el.period <= 7 ? el.period : el.period - 1)} />
              <QuickInfoRow label="Group" value={el.period <= 7 ? String(el.group) : '—'} />
              <QuickInfoRow label="State at Room Temp" value={el.state.charAt(0).toUpperCase() + el.state.slice(1)} />
              {el.meltingPoint !== undefined && (
                <QuickInfoRow label="Melting Point" value={`${el.meltingPoint}°C`} />
              )}
              {el.boilingPoint !== undefined && (
                <QuickInfoRow label="Boiling Point" value={`${el.boilingPoint}°C`} />
              )}
              {el.electronegativity !== undefined && (
                <QuickInfoRow label="Electronegativity" value={String(el.electronegativity)} />
              )}
            </div>
          </div>

          {/* Electron Configuration */}
          <div className={styles.electronConfig}>
            <span className={styles.electronConfigLabel}>Electron Configuration</span>
            <span className={styles.electronConfigValue}>{el.electronConfiguration}</span>
          </div>

          {/* Prev/Next navigation */}
          <div className={styles.elementNav}>
            {prev ? (
              <Link href={`/elements/${prev.symbol}`} className={styles.elementNavBtn}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{prev.symbol}</span>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/elements/${next.symbol}`} className={`${styles.elementNavBtn} ${styles.elementNavBtnRight}`}>
                <span>{next.symbol}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ) : <div />}
          </div>
        </aside>

        {/* Right: Content Panel */}
        <main className={styles.contentPanel}>
          {/* Element title */}
          <div className={styles.contentHeader}>
            <div>
              <h1 className={styles.contentTitle}>{el.name}</h1>
              <p className={styles.contentLead}>{el.description}</p>
            </div>
            {/* Atom diagram */}
            <div className={styles.atomDiagram} aria-hidden="true">
              <AtomDiagram el={el} color={c.text} />
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs} role="tablist">
            {TABS.map(t => (
              <button
                key={t.key}
                role="tab"
                aria-selected={tab === t.key}
                className={`${styles.tab} ${tab === t.key ? styles.tabActive : ''}`}
                onClick={() => setTab(t.key)}
                id={`tab-${t.key}`}
                aria-controls={`panel-${t.key}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div className={styles.tabContent} role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
            {tab === 'overview' && (
              <div className={styles.tabPanel}>
                <Section title="What is it?">
                  <p>{el.description}</p>
                </Section>
                <Section title="Where is it found?">
                  <p>{el.occurrence}</p>
                </Section>
                <Section title="What is it used for?">
                  <ul className={styles.bulletList}>
                    {el.uses.map(u => <li key={u}>{u}</li>)}
                  </ul>
                </Section>
              </div>
            )}
            {tab === 'properties' && (
              <div className={styles.tabPanel}>
                <div className={styles.propertiesGrid}>
                  <PropertyCard label="Atomic Number" value={String(el.atomicNumber)} unit="" />
                  <PropertyCard label="Atomic Mass" value={String(el.atomicMass)} unit="u" />
                  <PropertyCard label="State at 25°C" value={el.state.charAt(0).toUpperCase() + el.state.slice(1)} unit="" />
                  {el.meltingPoint !== undefined &&
                    <PropertyCard label="Melting Point" value={String(el.meltingPoint)} unit="°C" />}
                  {el.boilingPoint !== undefined &&
                    <PropertyCard label="Boiling Point" value={String(el.boilingPoint)} unit="°C" />}
                  {el.density !== undefined &&
                    <PropertyCard label="Density" value={String(el.density)} unit="g/cm³" />}
                  {el.electronegativity !== undefined &&
                    <PropertyCard label="Electronegativity" value={String(el.electronegativity)} unit="(Pauling)" />}
                  <PropertyCard label="Period" value={String(el.period <= 7 ? el.period : el.period - 1)} unit="" />
                  <PropertyCard label="Group" value={el.period <= 7 ? String(el.group) : 'Lanthanide/Actinide'} unit="" />
                  <PropertyCard label="Category" value={CATEGORY_LABELS[el.category]} unit="" />
                  <PropertyCard label="Electron Config" value={el.electronConfiguration} unit="" />
                </div>
              </div>
            )}
            {tab === 'uses' && (
              <div className={styles.tabPanel}>
                <Section title={`Uses of ${el.name}`}>
                  <div className={styles.usesGrid}>
                    {el.uses.map((use, i) => (
                      <div key={i} className={styles.useCard}>
                        <span className={styles.useIcon} aria-hidden="true">⚗️</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            )}
            {tab === 'occurrence' && (
              <div className={styles.tabPanel}>
                <Section title={`Where is ${el.name} found?`}>
                  <p>{el.occurrence}</p>
                </Section>
                <Section title="Abundance">
                  <p className={styles.muted}>
                    {el.atomicNumber <= 26
                      ? `${el.name} is one of the more common elements. It is found ${el.occurrence.toLowerCase()}`
                      : `${el.name} is a rarer element. ${el.occurrence}`
                    }
                  </p>
                </Section>
              </div>
            )}
            {tab === 'fun-facts' && (
              <div className={styles.tabPanel}>
                <Section title={`Fascinating Facts about ${el.name}`}>
                  <div className={styles.factsList}>
                    {el.funFacts.map((fact, i) => (
                      <div key={i} className={styles.factItem}>
                        <span className={styles.factStar} aria-hidden="true">✦</span>
                        <p>{fact}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div className={styles.bottomCta}>
            <Link href="/elements" className={styles.ctaBack}>
              ← All Elements
            </Link>
            <Link href="/molecule-lab" className={styles.ctaPrimary}>
              Build a Molecule with {el.symbol}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function QuickInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.quickInfoRow}>
      <span className={styles.quickInfoLabel}>{label}</span>
      <span className={styles.quickInfoValue}>{value}</span>
    </div>
  );
}

function PropertyCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className={styles.propertyCard}>
      <span className={styles.propLabel}>{label}</span>
      <span className={styles.propValue}>{value} <span className={styles.propUnit}>{unit}</span></span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionIcon} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="8" r="2" fill="currentColor"/>
        </svg>
      </div>
      <div>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <div className={styles.sectionContent}>{children}</div>
      </div>
    </div>
  );
}

function AtomDiagram({ el, color }: { el: Element; color: string }) {
  const shells = parseElectronConfig(el.electronConfiguration);
  const maxR = 52;
  const step = shells.length > 0 ? maxR / (shells.length + 0.5) : maxR;

  return (
    <svg viewBox="0 0 140 140" fill="none" className={styles.atomSvg}>
      {/* Orbital rings */}
      {shells.map((n, i) => {
        const r = step * (i + 1);
        return (
          <circle
            key={i}
            cx="70" cy="70" r={r}
            stroke={color}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            opacity="0.35"
            fill="none"
          />
        );
      })}
      {/* Electrons */}
      {shells.map((count, shellIdx) => {
        const r = step * (shellIdx + 1);
        return Array.from({ length: Math.min(count, 8) }, (_, ei) => {
          const angle = (2 * Math.PI * ei) / Math.min(count, 8) - Math.PI / 2;
          const ex = 70 + r * Math.cos(angle);
          const ey = 70 + r * Math.sin(angle);
          return (
            <circle key={`${shellIdx}-${ei}`} cx={ex} cy={ey} r="2.5"
              fill={color} opacity="0.7" />
          );
        });
      })}
      {/* Nucleus */}
      <circle cx="70" cy="70" r="14" fill={color} opacity="0.15"/>
      <circle cx="70" cy="70" r="9" fill={color} opacity="0.3"/>
      <text x="70" y="74" textAnchor="middle" fontSize="9" fontWeight="700"
        fontFamily="Inter,sans-serif" fill={color}>{el.symbol}</text>
    </svg>
  );
}

function parseElectronConfig(config: string): number[] {
  // Parse config like "[Ne] 3s² 3p⁶" into shell electron counts [2, 8, 8]
  // Simplified: extract all numbers after orbital letters
  const superscripts: Record<string, string> = {
    '¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁰':'0',
    '¹⁰':'10','¹¹':'11','¹²':'12','¹³':'13','¹⁴':'14',
  };

  // Convert superscripts to numbers
  let normalized = config;
  // Replace multi-char superscripts first
  for (const [sup, num] of Object.entries(superscripts)) {
    normalized = normalized.replaceAll(sup, num);
  }

  // Map noble gas to shell electrons
  const nobleGasShells: Record<string, number[]> = {
    '[He]': [2],
    '[Ne]': [2, 8],
    '[Ar]': [2, 8, 8],
    '[Kr]': [2, 8, 18, 8],
    '[Xe]': [2, 8, 18, 18, 8],
    '[Rn]': [2, 8, 18, 32, 18, 8],
  };

  let shells: number[] = [];
  for (const [ng, s] of Object.entries(nobleGasShells)) {
    if (normalized.startsWith(ng)) {
      shells = [...s];
      normalized = normalized.slice(ng.length).trim();
      break;
    }
  }

  // Parse remaining orbital parts like "3s2 3p6"
  const matches = normalized.matchAll(/(\d)([spdf])(\d+)/g);
  const shellElectrons: Record<number, number> = {};
  for (const shell of shells) {
    // Already handled by noble gas
  }
  for (const m of matches) {
    const n = parseInt(m[1]);
    const e = parseInt(m[3]);
    shellElectrons[n] = (shellElectrons[n] || 0) + e;
  }

  const extraShells = Object.entries(shellElectrons)
    .sort(([a],[b]) => parseInt(a) - parseInt(b))
    .map(([,v]) => v);

  return [...shells, ...extraShells];
}
