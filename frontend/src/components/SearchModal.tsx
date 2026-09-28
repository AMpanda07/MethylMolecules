import React, { useEffect, useRef } from 'react';
import elementsGridData from '../data/elementsGrid.json';
import { ElementGridItem } from '../types';
import { useAppStore } from '../state/useAppStore';
import { Search, X } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    setSelectedElementId
  } = useAppStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const elements = elementsGridData as ElementGridItem[];

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = elements.filter(el => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return el.name.toLowerCase().includes(q) ||
           el.symbol.toLowerCase().includes(q) ||
           el.number.toString() === q;
  });

  return (
    <div className="search-modal-overlay" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-header-input">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search element by name, symbol, or atomic number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsSearchOpen(false)} className="close-search-btn">
            <X size={18} />
          </button>
        </div>

        <div className="search-results-list">
          {results.length === 0 ? (
            <div className="empty-search-state">No matching elements found</div>
          ) : (
            results.map(el => (
              <div
                key={el.number}
                className="search-result-row"
                onClick={() => {
                  setSelectedElementId(el.number);
                  window.history.pushState({}, '', `?element=${el.symbol}`);
                  setIsSearchOpen(false);
                }}
              >
                <span className="res-number">{el.number}</span>
                <span className="res-symbol">{el.symbol}</span>
                <span className="res-name">{el.name}</span>
                <span className="res-category">{el.category}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
