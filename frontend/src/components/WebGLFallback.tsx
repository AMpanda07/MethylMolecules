import React from 'react';

export const WebGLFallback: React.FC = () => (
  <div className="webgl-fallback" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: 'var(--text-primary)',
    background: 'var(--background-primary)',
    fontSize: '1.2rem',
    textAlign: 'center',
    padding: '2rem'
  }}>
    <p>WebGL is not supported or could not be initialized on this device.</p>
    <p>Please use a modern browser with WebGL enabled.</p>
  </div>
);
