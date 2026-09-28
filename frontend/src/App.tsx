import React, { useEffect, Suspense, lazy } from 'react';
import { AppProvider, useAppStore } from './state/useAppStore';
import { Header } from './components/Header';
import { PeriodicTable } from './features/periodic-table/PeriodicTable';
import { ElementDetailModal } from './features/element-detail/ElementDetailModal';
import { SearchModal } from './components/SearchModal';
import { GestureController } from './features/gesture/GestureController';
import { ErrorBoundary } from './components/ErrorBoundary';
import { resolveElementId } from './utils/chemistry';
import { Loader2 } from 'lucide-react';

// Lazy-loaded Feature Routes (On-demand Chunking)
const IonsView = lazy(() =>
  import('./features/ions/IonsView').then((m) => ({ default: m.IonsView }))
);

const ChemistryTools = lazy(() =>
  import('./features/tools/ChemistryTools').then((m) => ({ default: m.ChemistryTools }))
);

const WorksheetStudio = lazy(() =>
  import('./features/worksheet/WorksheetStudio').then((m) => ({ default: m.WorksheetStudio }))
);

const SettingsView = lazy(() =>
  import('./features/settings/SettingsView').then((m) => ({ default: m.SettingsView }))
);

const PageFallback: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      padding: '64px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px'
    }}
  >
    <Loader2 size={32} className="animate-spin" color="#0284c7" />
    <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>
      Loading {name}...
    </span>
  </div>
);

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
        const resolved = resolveElementId(elemParam);
        setSelectedElementId(resolved);
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

        <Suspense fallback={<PageFallback name="View" />}>
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
        </Suspense>
      </main>

      <ErrorBoundary featureName="Element Detail Modal">
        <ElementDetailModal />
      </ErrorBoundary>
      <ErrorBoundary featureName="Element Search">
        <SearchModal />
      </ErrorBoundary>
      <ErrorBoundary featureName="Gesture Controller">
        <GestureController />
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
