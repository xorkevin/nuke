import '#internal/testutil.js';

import assert from 'node:assert/strict';
import test from 'node:test';

import {act, cleanup, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import {
  AnchorMatchesClassName,
  type HistoryAPI,
  NavLink,
  Router,
  Routes,
  useRoute,
  useRouter,
} from './index.js';

class TestHistory implements HistoryAPI {
  #location: URL;
  readonly #emitter: EventTarget;

  public constructor() {
    this.#location = new URL('http://localhost:8080');
    this.#emitter = new EventTarget();
  }

  public url(this: this): string {
    return this.#location.href;
  }

  public origin(this: this): string {
    return this.#location.origin;
  }

  public navigate(this: this, u: string): void {
    this.#location = new URL(u);
  }

  public onNavigate(
    this: this,
    handler: (u: string) => void,
    signal: AbortSignal,
  ): void {
    this.#emitter.addEventListener(
      'popstate',
      () => {
        handler(this.#location.href);
      },
      {signal},
    );
  }

  public setLocation(u: string): void {
    this.#location = new URL(u);
    this.#emitter.dispatchEvent(new Event('popstate'));
  }
}

await test('Router', async (t) => {
  t.after(() => {
    cleanup();
  });

  const testHistory = new TestHistory();
  testHistory.setLocation('http://localhost:3000/comp1/hello');

  const Comp1 = () => {
    const {base} = useRouter();
    const {params, rest} = useRoute();
    return (
      <div>
        Component 1 {params['id'] ?? 'not exist'} {rest}
        <NavLink href={base + '/comp1/hello'} exact>
          go to hello base
        </NavLink>
        <NavLink href={base + '/comp2/bye'}>go to comp 2</NavLink>
        <NavLink href="remainder">go to hello</NavLink>
      </div>
    );
  };
  const Comp2 = () => {
    const {params} = useRoute();
    return <div>Component 2 {params['c2'] ?? 'not exist'}</div>;
  };

  const routes = [
    {
      path: '/comp1/{id}',
      component: Comp1,
    },
    {
      path: '/comp2/{c2}',
      component: Comp2,
    },
  ];

  const fallback = <div>404 Not found</div>;

  const user = userEvent.setup();

  render(
    <Router history={testHistory}>
      <Routes routes={routes} fallback={fallback} />
    </Router>,
  );

  assert.ok(screen.getByText('Component 1 hello'));

  assert.equal(
    screen.getByRole('link', {name: 'go to hello base'}).className,
    AnchorMatchesClassName,
  );
  assert.equal(screen.getByRole('link', {name: 'go to hello'}).className, '');
  assert.equal(screen.getByRole('link', {name: 'go to comp 2'}).className, '');

  await user.click(screen.getByRole('link', {name: 'go to hello'}));

  assert.ok(await screen.findByText('Component 1 hello /remainder'));

  assert.equal(
    screen.getByRole('link', {name: 'go to hello base'}).className,
    '',
  );
  assert.equal(
    screen.getByRole('link', {name: 'go to hello'}).className,
    AnchorMatchesClassName,
  );
  assert.equal(screen.getByRole('link', {name: 'go to comp 2'}).className, '');

  await user.click(screen.getByRole('link', {name: 'go to comp 2'}));

  assert.ok(await screen.findByText('Component 2 bye'));

  act(() => {
    testHistory.setLocation('http://localhost:3000/comp1/again');
  });

  assert.ok(await screen.findByText('Component 1 again'));
});
