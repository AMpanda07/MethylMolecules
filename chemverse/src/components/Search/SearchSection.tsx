'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchSection.module.css';

const QUICK_SEARCHES = ['Oxygen', 'Carbon', 'Water', 'H₂O', 'Sodium'];

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (q: string) => {
    const term = q.trim() || query.trim();
    if (!term) return;
    router.push(`/discover?q=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch(query);
  };

  return (
    <section className={styles.section} aria-label="Search chemistry content">
      <div className={styles.inner}>
        <p className={styles.label} aria-hidden="true">Search anything</p>

        <div
          className={`${styles.searchWrap} ${isFocused ? styles.focused : ''}`}
          role="search"
        >
          <SearchIconLg />

          <input
            id="homepage-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search elements, molecules or topics..."
            className={styles.input}
            aria-label="Search elements, molecules or chemistry topics"
            autoComplete="off"
          />

          <button
            className={styles.searchBtn}
            onClick={() => handleSearch(query)}
            aria-label="Submit search"
            disabled={!query.trim()}
          >
            <ArrowRight />
          </button>
        </div>

        {/* Quick search pills */}
        <div className={styles.quickSearches} aria-label="Quick search suggestions">
          <span className={styles.quickLabel}>Try:</span>
          {QUICK_SEARCHES.map((term) => (
            <button
              key={term}
              className={styles.quickPill}
              onClick={() => handleSearch(term)}
              aria-label={`Search for ${term}`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIconLg() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="searchIcon">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 14L17.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
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
