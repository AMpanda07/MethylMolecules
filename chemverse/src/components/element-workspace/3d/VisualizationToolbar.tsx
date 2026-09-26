'use client';

import React from 'react';
import styles from './VisualizationToolbar.module.css';

export type WorkspaceViewMode = 'structure' | 'orbitals' | 'archive';

interface VisualizationToolbarProps {
  viewMode: WorkspaceViewMode;
  onViewModeChange: (mode: WorkspaceViewMode) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  playbackSpeed: number;
  onChangeSpeed: (speed: number) => void;
  densityMode: boolean;
  onToggleDensity: () => void;
  onResetCamera: () => void;
  selectedShell: number | null;
  shellCount: number;
  onSelectShell: (shell: number) => void;
}

export default function VisualizationToolbar({
  viewMode,
  onViewModeChange,
  isPlaying,
  onTogglePlay,
  playbackSpeed,
  onChangeSpeed,
  densityMode,
  onToggleDensity,
  onResetCamera,
  selectedShell,
  shellCount,
  onSelectShell,
}: VisualizationToolbarProps) {
  const shellNames = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

  return (
    <div className={styles.toolbarContainer}>
      {/* Primary Workspace View Switcher Tabs */}
      <div className={styles.viewModeTabs}>
        <button
          className={`${styles.viewTab} ${viewMode === 'structure' ? styles.viewTabActive : ''}`}
          onClick={() => onViewModeChange('structure')}
          title="3D Atom Nucleus & Electron Shell Structure"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(150 12 12)" />
          </svg>
          <span>Structure</span>
        </button>

        <button
          className={`${styles.viewTab} ${viewMode === 'orbitals' ? styles.viewTabActive : ''}`}
          onClick={() => onViewModeChange('orbitals')}
          title="3D Quantum Atomic Orbital Atlas (s, p, d, f)"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
          </svg>
          <span>Orbitals</span>
        </button>

        <button
          className={`${styles.viewTab} ${viewMode === 'archive' ? styles.viewTabActive : ''}`}
          onClick={() => onViewModeChange('archive')}
          title="Historical & Scientific Image Archive"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>Archive</span>
        </button>
      </div>

      {/* Viewport Specific Controls */}
      {viewMode === 'structure' && (
        <div className={styles.controlsGroup}>
          {/* Shell Selector Buttons */}
          <div className={styles.shellSelector}>
            <span className={styles.label}>Shells:</span>
            {Array.from({ length: shellCount }).map((_, i) => {
              const idx = i + 1;
              const isSelected = selectedShell === idx;
              return (
                <button
                  key={idx}
                  className={`${styles.shellBtn} ${isSelected ? styles.shellBtnActive : ''}`}
                  onClick={() => onSelectShell(idx)}
                >
                  {shellNames[i] || idx}
                </button>
              );
            })}
          </div>

          <div className={styles.divider} />

          {/* Animation Play/Pause & Speed */}
          <div className={styles.animControls}>
            <button className={styles.iconBtn} onClick={onTogglePlay} title={isPlaying ? 'Pause animation' : 'Play animation'}>
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <select
              className={styles.speedSelect}
              value={playbackSpeed}
              onChange={(e) => onChangeSpeed(parseFloat(e.target.value))}
              title="Animation Speed Multiplier"
            >
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="1">1.0x</option>
              <option value="2">2.0x</option>
              <option value="4">4.0x</option>
            </select>
          </div>

          <div className={styles.divider} />

          {/* Mode Toggles */}
          <button
            className={`${styles.toggleBtn} ${densityMode ? styles.toggleBtnActive : ''}`}
            onClick={onToggleDensity}
            title="Toggle Electron Density Cloud View"
          >
            Density
          </button>

          <button className={styles.iconBtn} onClick={onResetCamera} title="Reset 3D Camera">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
