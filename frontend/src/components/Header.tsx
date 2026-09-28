import React from 'react';
import { useAppStore } from '../state/useAppStore';

export const Header: React.FC = () => {
  const {
    currentRoute,
    setCurrentRoute,
    settings,
    setSettings,
    setIsSearchOpen
  } = useAppStore();

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark'
    }));
  };

  return (
    <nav className="global-nav" id="global-nav">
      {/* Brand Section */}
      <div className="nav-brand-section" onClick={() => setCurrentRoute('table')} style={{ cursor: 'pointer' }}>
        <img src="/logo.svg" alt="Zperiod" className="nav-logo" width="28" height="28" />
        <span className="nav-brand">
          <span className="brand-with-tm">Zperiod</span>
        </span>
      </div>

      {/* Center Group: Navigation Pills */}
      <div className="nav-center-group">
        <div className="global-nav-pill">
          {[
            { id: 'table', label: 'Table' },
            { id: 'ions', label: 'Ions' },
            { id: 'tools', label: 'Tools' },
            { id: 'playground', label: 'Playground' },
            { id: 'settings', label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              className={`nav-pill-btn${currentRoute === item.id ? ' active' : ''}`}
              onClick={() => setCurrentRoute(item.id)}
              aria-current={currentRoute === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: Theme Toggle + Search */}
      <div className="nav-right-section" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          className="nav-theme-toggle"
          id="dark-mode-toggle"
          onClick={toggleTheme}
          aria-label={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {settings.theme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <button
          className="element-search-wrapper"
          id="search-btn"
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search elements"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.1)',
            background: 'rgba(255,255,255,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>
    </nav>
  );
};
