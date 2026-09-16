import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { DemoProvider } from './demo';
import { StoreProvider } from './store';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <DemoProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DemoProvider>
    </StoreProvider>
  </React.StrictMode>,
);
