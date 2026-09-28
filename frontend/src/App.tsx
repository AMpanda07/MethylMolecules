import React, { useEffect } from 'react';
import { AppProvider, useAppStore } from './state/useAppStore';
import { Header } from './components/Header';
import { PeriodicTable } from './features/periodic-table/PeriodicTable';
import { ElementDetailModal } from './features/element-detail/ElementDetailModal';
import { IonsView } from './features/ions/IonsView';
import { ChemistryTools } from './features/tools/ChemistryTools';
import { WorksheetStudio } from './features/worksheet/WorksheetStudio';
import { SettingsView } from './features/settings/SettingsView';
import { CardCustomizer } from './features/custom-layout/CardCustomizer';
import { SearchModal } from './components/SearchModal';
import elementsGridData from './data/elementsGrid.json';
import { ElementGridItem } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';

const AppContent: React.FC = () => {
  const { currentRoute, setSelectedElementId, setElementDetailTab } = useAppStore();

  useEffect(() => {
    // URL Parameter resolution (?element=C, ?element=H, etc.)
    const syncUrlState = () => {
      const params = new URLSearchParams(window.location.search);
      const elemParam = params.get('element');
      const tabParam = params.get('tab');

      if (tabParam && ['structure', 'orbitals', 'archive'].includes(tabParam.toLowerCase())) {
        setElementDetailTab(tabParam.toLowerCase() as 'structure' | 'orbitals' | 'archive');
      }

      if (elemParam) {
        const gridList = elementsGridData as ElementGridItem[];
        const found = gridList.find(e =>
          e.symbol.toLowerCase() === elemParam.toLowerCase() ||
          e.name.toLowerCase() === elemParam.toLowerCase() ||
          e.number.toString() === elemParam
        );
        if (found) {
          setSelectedElementId(found.number);
        }
      }
    };

    syncUrlState();
    window.addEventListener('popstate', syncUrlState);
    return () => window.removeEventListener('popstate', syncUrlState);
  }, [setSelectedElementId, setElementDetailTab]);

  return (
    <div className="app-main-shell">
      <Header />

      <main className="app-content-stage">
        <ErrorBoundary fallback={<div>Something went wrong in the Periodic Table.</div>}>
          {currentRoute === 'table' && <PeriodicTable />}
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Something went wrong in Ions.</div>}>
          {currentRoute === 'ions' && <IonsView />}
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Something went wrong in Tools.</div>}>
          {currentRoute === 'tools' && <ChemistryTools />}
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Something went wrong in Playground.</div>}>
          {currentRoute === 'playground' && <WorksheetStudio />}
        </ErrorBoundary>
        <ErrorBoundary fallback={<div>Something went wrong in Settings.</div>}>
          {currentRoute === 'settings' && <SettingsView />}
        </ErrorBoundary>
      </main>

      <ErrorBoundary fallback={<div>Element Detail failed.</div>}>
        <ElementDetailModal />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Customizer failed.</div>}>
        <CardCustomizer />
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Search failed.</div>}>
        <SearchModal />
      </ErrorBoundary>
    </div>
  );
};

export const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
