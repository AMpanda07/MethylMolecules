'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DetailedElement, getAllDetailedElements } from '@/data/elements-data';
import styles from './ElementNavigator.module.css';

interface ElementNavigatorProps {
  currentElement: DetailedElement;
  onTogglePreferences: () => void;
  onToggleCustomization: () => void;
}

export default function ElementNavigator({
  currentElement,
  onTogglePreferences,
  onToggleCustomization,
}: ElementNavigatorProps) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const allElements = getAllDetailedElements();
  const sorted = [...allElements].sort((a, b) => a.atomicNumber - b.atomicNumber);
  const idx = sorted.findIndex((e) => e.symbol === currentElement.symbol);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  // Search filter
  const filtered = query.trim()
    ? sorted.filter(
        (e) =>
          e.name.toLowerCase().includes(query.toLowerCase()) ||
          e.symbol.toLowerCase().includes(query.toLowerCase()) ||
          String(e.atomicNumber) === query.trim()
      )
    : sorted.slice(0, 8);

  // Keyboard navigation (ArrowLeft & ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft' && prev) {
        router.push(`/elements/${prev.symbol}`);
      } else if (e.key === 'ArrowRight' && next) {
        router.push(`/elements/${next.symbol}`);
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, router]);

  return (
    <nav className={styles.navBar}>
      {/* Left: Back Link & Breadcrumb */}
      <div className={styles.leftGroup}>
        <Link href="/elements" className={styles.backBtn}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Periodic Table</span>
        </Link>
        <span className={styles.sep}>/</span>
        <span className={styles.currentName}>
          {currentElement.name} ({currentElement.symbol})
        </span>
      </div>

      {/* Middle: Prev / Search / Next Element Stepper */}
      <div className={styles.centerStepper}>
        {prev ? (
          <Link href={`/elements/${prev.symbol}`} className={styles.stepperBtn} title={`Previous: ${prev.name} (Z=${prev.atomicNumber})`}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{prev.symbol}</span>
          </Link>
        ) : (
          <div className={`${styles.stepperBtn} ${styles.disabled}`}>—</div>
        )}

        {/* Quick Search Launcher */}
        <button className={styles.searchTrigger} onClick={() => setSearchOpen(true)} title="Quick Element Search (Ctrl+K)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className={styles.searchLabel}>Search element...</span>
          <kbd className={styles.kbd}>Ctrl+K</kbd>
        </button>

        {next ? (
          <Link href={`/elements/${next.symbol}`} className={styles.stepperBtn} title={`Next: ${next.name} (Z=${next.atomicNumber})`}>
            <span>{next.symbol}</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <div className={`${styles.stepperBtn} ${styles.disabled}`}>—</div>
        )}
      </div>

      {/* Right: Preferences & Card Customization Action Buttons */}
      <div className={styles.rightTools}>
        <button className={styles.toolBtn} onClick={onTogglePreferences} title="Units & Precision Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
          <span className={styles.toolLabel}>Units</span>
        </button>

        <button className={styles.toolBtn} onClick={onToggleCustomization} title="Customize Periodic Cards">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span className={styles.toolLabel}>Customize Cards</span>
        </button>
      </div>

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className={styles.modalOverlay} onClick={() => setSearchOpen(false)}>
          <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.searchHeader}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Type element name, symbol, or atomic number..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.closeBtn} onClick={() => setSearchOpen(false)}>
                ✕
              </button>
            </div>

            <div className={styles.searchList}>
              {filtered.map((el) => (
                <div
                  key={el.symbol}
                  className={styles.searchItem}
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/elements/${el.symbol}`);
                  }}
                >
                  <span className={styles.itemNumber}>{el.atomicNumber}</span>
                  <span className={styles.itemSymbol}>{el.symbol}</span>
                  <span className={styles.itemName}>{el.name}</span>
                  <span className={styles.itemCategory}>{el.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
