import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../state/useAppStore';
import { CardCustomizerSettings } from '../../types';
import { X, RotateCcw, Check } from 'lucide-react';

export const CardCustomizer: React.FC = () => {
  const {
    isCustomLayoutOpen,
    setIsCustomLayoutOpen,
    customLayout,
    setCustomLayout
  } = useAppStore();

  const [localSettings, setLocalSettings] = useState<CardCustomizerSettings>(customLayout);

  useEffect(() => {
    if (isCustomLayoutOpen) {
      setLocalSettings(customLayout);
    }
  }, [isCustomLayoutOpen, customLayout]);

  if (!isCustomLayoutOpen) return null;

  const handleSave = () => {
    setCustomLayout(localSettings);
    setIsCustomLayoutOpen(false);
  };

  const handleReset = () => {
    const defaultLayout: CardCustomizerSettings = {
      showAtomicNumber: true,
      showSymbol: true,
      symbolFontSize: 22,
      symbolFontWeight: 700,
      symbolColor: '#1a1a1a',
      showMainContent: true,
      mainContentType: 'name',
      secondaryContent: 'atomicMass',
      fontSize: 12,
      fontWeight: 500,
      fontColor: '#4a4a4a',
      borderRadius: 12,
      borderWidth: 1,
      backgroundStyle: 'default',
      cardColorDepth: 1,
      backgroundSaturation: 1,
      backgroundBlur: 10,
      overlayTint: 'rgba(255,255,255,0.8)',
      grayscale: false
    };
    setLocalSettings(defaultLayout);
  };

  return (
    <div className="customizer-modal-overlay" onClick={() => setIsCustomLayoutOpen(false)}>
      <div className="customizer-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="customizer-header">
          <h2>Card Layout Customizer</h2>
          <button onClick={() => setIsCustomLayoutOpen(false)} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="customizer-body">
          {/* Live Card Preview Column */}
          <div className="preview-column">
            <span className="column-title">LIVE PREVIEW</span>
            <div className="preview-card-stage">
              <div
                className="element-card cat-nonmetal"
                style={{
                  width: '120px',
                  height: '140px',
                  borderRadius: `${localSettings.borderRadius}px`,
                  border: `${localSettings.borderWidth}px solid rgba(0,0,0,0.1)`,
                  filter: localSettings.grayscale ? 'grayscale(100%)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '12px',
                  background: '#e2ecc8',
                  position: 'relative'
                }}
              >
                {localSettings.showAtomicNumber && (
                  <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.7 }}>6</span>
                )}
                {localSettings.showSymbol && (
                  <span
                    style={{
                      fontSize: `${localSettings.symbolFontSize}px`,
                      fontWeight: localSettings.symbolFontWeight,
                      color: localSettings.symbolColor !== '#1a1a1a' ? localSettings.symbolColor : '#1a1a1a',
                      textAlign: 'center'
                    }}
                  >
                    C
                  </span>
                )}
                {localSettings.showMainContent && (
                  <span
                    style={{
                      fontSize: `${localSettings.fontSize}px`,
                      fontWeight: localSettings.fontWeight,
                      color: localSettings.fontColor !== '#4a4a4a' ? localSettings.fontColor : '#3c4a22',
                      textAlign: 'center'
                    }}
                  >
                    Carbon
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Controls Column */}
          <div className="controls-column">
            <div className="control-group">
              <label>Symbol Font Size ({localSettings.symbolFontSize}px)</label>
              <input
                type="range"
                min="14"
                max="36"
                value={localSettings.symbolFontSize}
                onChange={(e) => setLocalSettings({ ...localSettings, symbolFontSize: Number(e.target.value) })}
              />
            </div>

            <div className="control-group">
              <label>Symbol Font Weight ({localSettings.symbolFontWeight})</label>
              <input
                type="range"
                min="300"
                max="900"
                step="100"
                value={localSettings.symbolFontWeight}
                onChange={(e) => setLocalSettings({ ...localSettings, symbolFontWeight: Number(e.target.value) })}
              />
            </div>

            <div className="control-group">
              <label>Border Radius ({localSettings.borderRadius}px)</label>
              <input
                type="range"
                min="0"
                max="24"
                value={localSettings.borderRadius}
                onChange={(e) => setLocalSettings({ ...localSettings, borderRadius: Number(e.target.value) })}
              />
            </div>

            <div className="control-group-row">
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.showAtomicNumber}
                  onChange={(e) => setLocalSettings({ ...localSettings, showAtomicNumber: e.target.checked })}
                />
                Show Atomic Number
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={localSettings.grayscale}
                  onChange={(e) => setLocalSettings({ ...localSettings, grayscale: e.target.checked })}
                />
                Grayscale Mode
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="customizer-footer">
          <button onClick={handleReset} className="btn-secondary">
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => setIsCustomLayoutOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              <Check size={16} />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
