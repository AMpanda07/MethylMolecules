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
      } else {
        setSelectedElementId(null);
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
        <ErrorBoundary featureName="Periodic Table">
          {currentRoute === 'table' && <PeriodicTable />}
        </ErrorBoundary>
        <ErrorBoundary featureName="Ions Explorer">
          {currentRoute === 'ions' && <IonsView />}
        </ErrorBoundary>
        <ErrorBoundary featureName="Chemistry Tools">
          {currentRoute === 'tools' && <ChemistryTools />}
        </ErrorBoundary>
        <ErrorBoundary featureName="Worksheet Studio">
          {currentRoute === 'playground' && <WorksheetStudio />}
        </ErrorBoundary>
        <ErrorBoundary featureName="Settings">
          {currentRoute === 'settings' && <SettingsView />}
        </ErrorBoundary>
      </main>

      <ErrorBoundary featureName="Element Detail Modal">
        <ElementDetailModal />
      </ErrorBoundary>
      <ErrorBoundary featureName="Card Customizer">
        <CardCustomizer />
      </ErrorBoundary>
      <ErrorBoundary featureName="Element Search">
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
