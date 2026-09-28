import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, CardCustomizerSettings } from '../types';

const defaultCustomLayout: CardCustomizerSettings = {
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

const defaultSettings: AppSettings = {
  tempUnit: 'C',
  densityUnit: 'g/cm3',
  energyUnit: 'kJ/mol',
  massPrecision: 3,
  playbackSpeed: 1,
  theme: (localStorage.getItem('zperiod_dark_mode') === 'true' ? 'dark' : 'light'),
  lang: localStorage.getItem('zperiod_lang') || 'en',
  reduceMotion: localStorage.getItem('zperiod_reduce_motion') === 'true'
};

interface AppContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
  selectedElementId: number | null;
  setSelectedElementId: (id: number | null) => void;
  elementDetailTab: 'structure' | 'orbitals' | 'archive';
  setElementDetailTab: (tab: 'structure' | 'orbitals' | 'archive') => void;
  categoryFilter: string | null;
  setCategoryFilter: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCustomLayoutOpen: boolean;
  setIsCustomLayoutOpen: (open: boolean) => void;
  customLayout: CardCustomizerSettings;
  setCustomLayout: React.Dispatch<React.SetStateAction<CardCustomizerSettings>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  selectedIonId: string | null;
  setSelectedIonId: (id: string | null) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<string>('table');
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const [elementDetailTab, setElementDetailTab] = useState<'structure' | 'orbitals' | 'archive'>('structure');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCustomLayoutOpen, setIsCustomLayoutOpen] = useState<boolean>(false);
  
  const [customLayout, setCustomLayout] = useState<CardCustomizerSettings>(() => {
    try {
      const saved = localStorage.getItem('zperiod_custom_layout');
      return saved ? JSON.parse(saved) : defaultCustomLayout;
    } catch {
      return defaultCustomLayout;
    }
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('zperiod_settings');
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [selectedIonId, setSelectedIonId] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('balancer');

  // Persist dark mode class on root html
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('zperiod_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('zperiod_dark_mode', 'false');
    }
  }, [settings.theme]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('zperiod_settings', JSON.stringify(settings));
    localStorage.setItem('zperiod_lang', settings.lang);
  }, [settings]);

  // Persist custom layout
  useEffect(() => {
    localStorage.setItem('zperiod_custom_layout', JSON.stringify(customLayout));
  }, [customLayout]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedElementId,
        setSelectedElementId,
        elementDetailTab,
        setElementDetailTab,
        categoryFilter,
        setCategoryFilter,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isCustomLayoutOpen,
        setIsCustomLayoutOpen,
        customLayout,
        setCustomLayout,
        settings,
        setSettings,
        selectedIonId,
        setSelectedIonId,
        selectedTool,
        setSelectedTool
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
