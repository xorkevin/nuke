import {createRoot} from 'react-dom/client';

import App from './app.js';

const appelement = document.getElementById('app');
if (appelement) {
  const root = createRoot(appelement);
  root.render(<App />);
}
