import {createRoot} from 'react-dom/client';

import '@fontsource-variable/inter/standard.css';
import '@xorkevin/nuke/styles/normalize.css';
import '@xorkevin/nuke/styles/typography.css';
import {Router} from '@xorkevin/nuke/router';

import App from './app.js';

const appelement = document.getElementById('app');
if (appelement) {
  const root = createRoot(appelement);
  root.render(
    <Router>
      <App />
    </Router>,
  );
} else {
  console.error('Element with id app missing');
}
