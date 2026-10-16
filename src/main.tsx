import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#f8fafc', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ maxWidth: '480px', width: '100%', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#f43f5e' }}>Application Loading Alert</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '20px' }}>
              The application encountered a client runtime issue. Click below to reload or reset cached session data.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{ padding: '10px 20px', borderRadius: '10px', background: '#6366f1', color: '#ffffff', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Reload Application
              </button>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
                style={{ padding: '10px 20px', borderRadius: '10px', background: '#334155', color: '#ffffff', fontWeight: 600, border: 'none', cursor: 'pointer' }}
              >
                Reset Session
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);
