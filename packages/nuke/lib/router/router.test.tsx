import assert from 'node:assert/strict';
import test from 'node:test';

import '#internal/testutil.js';

import {cleanup, render} from '@testing-library/react';

import {Cancellable, Router, Routes} from './router.js';

class TestHistory {
  location: URL;
  emitter: EventTarget;

  constructor() {
    this.location = new URL('http://localhost:8080');
    this.emitter = new EventTarget();
  }

  url(): string {
    return this.location.href;
  }

  origin(): string {
    return this.location.origin;
  }

  navigate(u: string): void {
    this.location = new URL(u);
  }

  onNavigate(handler: (u: string) => void): Cancellable {
    const controller = new AbortController();
    this.emitter.addEventListener(
      'popstate',
      () => {
        handler(this.location.href);
      },
      {signal: controller.signal},
    );
    return {
      cancel: () => {
        controller.abort();
      },
    };
  }

  setLocation(u: string): void {
    this.location = new URL(u);
    this.emitter.dispatchEvent(new Event('popstate'));
  }
}

await test('Router', async (t) => {
  t.after(() => {
    cleanup();
  });

  const testHistory = new TestHistory();
  testHistory.setLocation('http://localhost:3000/comp1');

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

  const elem = render(
    <Router history={testHistory}>
      <Routes routes={routes} fallback={fallback} />
    </Router>,
  );

  assert.ok(await elem.findByText('Component 1'));

  testHistory.setLocation('http://localhost:3000/comp2');
  elem.rerender(
    <Router history={testHistory}>
      <Routes routes={routes} fallback={fallback} />
    </Router>,
  );

  assert.ok(await elem.findByText('Component 2'));
});
