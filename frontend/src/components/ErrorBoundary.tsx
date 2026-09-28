import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  featureName?: string;
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[Zperiod ErrorBoundary] Error caught in feature "${this.props.featureName || 'Component'}":`, error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const featureTitle = this.props.featureName || 'Feature';

      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 24px',
            margin: '20px auto',
            maxWidth: '460px',
            background: 'var(--surface-color, #ffffff)',
            borderRadius: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            textAlign: 'center',
            color: 'var(--text-primary, #0f172a)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}
          >
            <AlertTriangle size={24} color="#ef4444" />
          </div>

          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700 }}>
            {featureTitle} Encountered an Issue
          </h3>

          <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
            An unexpected error occurred while rendering this section. You can try reloading it.
          </p>

          <button
            onClick={this.handleRetry}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              border: 'none',
              background: '#0f172a',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(15,23,42,0.2)'
            }}
          >
            <RotateCcw size={13} />
            <span>Reload {featureTitle}</span>
          </button>

          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <details
              style={{
                marginTop: '16px',
                textAlign: 'left',
                width: '100%',
                fontSize: '11px',
                color: '#ef4444',
                background: '#fef2f2',
                padding: '8px 12px',
                borderRadius: '8px',
                overflowX: 'auto'
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 600 }}>Developer Diagnostic Info</summary>
              <pre style={{ margin: '6px 0 0 0', whiteSpace: 'pre-wrap' }}>
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
