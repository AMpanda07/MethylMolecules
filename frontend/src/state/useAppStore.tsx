import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, CardCustomizerSettings } from '../types';

export const safeLocalStorageGet = (key: string): string | null => {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const safeLocalStorageSet = (key: string, val: string): void => {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, val);
  } catch {
    // Quota or sandbox restrictions ignored safely
  }
};

export const defaultCustomLayout: CardCustomizerSettings = {
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

const getInitialCustomLayout = (): CardCustomizerSettings => {
  const stored = safeLocalStorageGet('zperiod_custom_layout');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...defaultCustomLayout, ...parsed };
    } catch {
      // Ignore corrupted JSON
    }
  }
  return defaultCustomLayout;
};

const getInitialSettings = (): AppSettings => {
  const isDark =
    safeLocalStorageGet('zperiod_dark_mode') === 'true' ||
    (safeLocalStorageGet('zperiod_dark_mode') === null &&
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches);

  const lang = safeLocalStorageGet('zperiod_lang') || 'en';
  const reduceMotion =
    safeLocalStorageGet('zperiod_reduce_motion') === 'true' ||
    (typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

  const base: AppSettings = {
    tempUnit: 'C',
    densityUnit: 'g/cm3',
    energyUnit: 'kJ/mol',
    massPrecision: 3,
    playbackSpeed: 1,
    theme: isDark ? 'dark' : 'light',
    lang,
    reduceMotion
  };

  const stored = safeLocalStorageGet('zperiod_settings');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return { ...base, ...parsed };
    } catch {
      // Ignore corrupted settings
    }
  }
  return base;
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
  const [customLayout, setCustomLayout] = useState<CardCustomizerSettings>(getInitialCustomLayout);
  const [settings, setSettings] = useState<AppSettings>(getInitialSettings);
  const [selectedIonId, setSelectedIonId] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string>('balancer');

  // Synchronize HTML dark mode theme class
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      safeLocalStorageSet('zperiod_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark-theme');
      safeLocalStorageSet('zperiod_dark_mode', 'false');
    }
  }, [settings.theme]);

  // Persist settings safely
  useEffect(() => {
    safeLocalStorageSet('zperiod_settings', JSON.stringify(settings));
    safeLocalStorageSet('zperiod_lang', settings.lang);
    safeLocalStorageSet('zperiod_reduce_motion', settings.reduceMotion ? 'true' : 'false');
  }, [settings]);

  // Persist custom layout safely
  useEffect(() => {
    safeLocalStorageSet('zperiod_custom_layout', JSON.stringify(customLayout));
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
