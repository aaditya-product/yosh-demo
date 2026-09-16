import React from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './Root';
import { DemoProvider } from './demo';
import { StoreProvider } from './store';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <DemoProvider>
        <Root />
      </DemoProvider>
    </StoreProvider>
  </React.StrictMode>,
);
