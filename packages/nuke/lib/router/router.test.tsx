import test from 'node:test';

import {cleanup, render} from '@testing-library/react';
import globalJsdom from 'global-jsdom';

import {Router} from './router.js';

await test('Router', (t) => {
  const jsdomCleanup = globalJsdom();
  t.after(() => {
    jsdomCleanup();
  });
  t.after(() => {
    cleanup();
  });

  render(<Router />);
});
