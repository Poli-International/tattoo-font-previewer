import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { translateDom, t } from './i18n.ts';

// Translate HTML DOM elements with data-i18n attributes
translateDom();
// The copy button in the static embed tab reads window.t for its 'Copied!' label.
(window as unknown as { t: (key: string) => string }).t = (key: string) => t(key);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
