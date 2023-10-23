import assert from 'node:assert/strict';
import test from 'node:test';

import {jsdomReconfigure} from '#internal/testutil.js';

import {cleanup, render} from '@testing-library/react';

import {Router, Routes} from './router.js';

await test('Router', async (t) => {
  t.after(() => {
    cleanup();
  });

  const Comp1 = () => <div>Component 1</div>;
  const Comp2 = () => <div>Component 2</div>;

  const routes = [
    {
      path: '/comp1',
      component: Comp1,
    },
    {
      path: '/comp2',
      component: Comp2,
    },
  ];

  const fallback = <div>404 Not found</div>;

  {
    jsdomReconfigure({
      url: 'http://localhost:3000/comp1',
    });

    const elem = render(
      <Router>
        <Routes routes={routes} fallback={fallback} />
      </Router>,
    );

    assert.ok(await elem.findByText('Component 1'));
  }

  {
    jsdomReconfigure({
      url: 'http://localhost:3000/comp2',
    });

    const elem = render(
      <Router>
        <Routes routes={routes} fallback={fallback} />
      </Router>,
    );

    assert.ok(await elem.findByText('Component 2'));
  }
});
