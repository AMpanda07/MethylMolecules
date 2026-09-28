import React from 'react';
import { useAppStore } from '../../state/useAppStore';
import { SlidersHorizontal, Moon, Sun, Globe, Zap } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, setSettings, setIsCustomLayoutOpen } = useAppStore();

  const languages = [
    { code: 'en', name: 'English (US)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文 (Chinese)' },
    { code: 'ja', name: '日本語 (Japanese)' }
  ];

  return (
    <div style={{ padding: '32px 48px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '28px' }}>Preferences & Settings</h1>

      <div style={{ background: 'var(--element-bg)', borderRadius: '20px', padding: '32px', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px' }}>Unit & Display Preferences</h2>

        {/* Temperature Unit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Temperature Units</div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              Units used for melting and boiling point values (Preview: 25.0°C = {settings.tempUnit === 'C' ? '25.0°C' : settings.tempUnit === 'K' ? '298.15 K' : '77.0°F'})
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['C', 'K', 'F'].map(u => (
              <button
                key={u}
                onClick={() => setSettings({ ...settings, tempUnit: u as any })}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: settings.tempUnit === u ? '#007aff' : 'rgba(0,0,0,0.06)',
                  color: settings.tempUnit === u ? '#fff' : '#1a1a1a',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                °{u}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={16} /> Language & Localization
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>Interface language preference</div>
          </div>
          <select
            value={settings.lang}
            onChange={(e) => setSettings({ ...settings, lang: e.target.value })}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: '1px solid rgba(0,0,0,0.1)',
              background: '#fff',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>

        {/* Mass Precision Slider */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Atomic Mass Precision</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Decimal places for atomic weight display ({settings.massPrecision || 3} decimals)</div>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            value={settings.massPrecision || 3}
            onChange={(e) => setSettings({ ...settings, massPrecision: Number(e.target.value) })}
            style={{ width: '120px', cursor: 'pointer' }}
          />
        </div>

        {/* Reduced Motion Toggle */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} /> Motion & Animation Effects
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>Enable or reduce 3D orbit animations for performance</div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, reduceMotion: !settings.reduceMotion })}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: settings.reduceMotion ? '#ff9500' : '#34c759',
              color: '#fff',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            {settings.reduceMotion ? 'Reduced Motion' : 'Full Motion (60 FPS)'}
          </button>
        </div>

        {/* Theme Mode */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700 }}>Appearance Theme</div>
            <div style={{ fontSize: '13px', color: '#666' }}>Switch between Light and Dark interface theme</div>
          </div>
          <button
            onClick={() => setSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              border: 'none',
              background: '#007aff',
              color: '#fff',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {settings.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{settings.theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </div>

      {/* About Box */}
      <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', border: '1px solid rgba(0,0,0,0.08)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 8px 0' }}>Zperiod™ v3.0.0</h3>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Precision Lab Edition · Created by Philip Zhao (Aurora High School, Toronto Canada)
        </p>
      </div>
    </div>
  );
};
