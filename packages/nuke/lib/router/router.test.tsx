import assert from 'node:assert/strict';
import test from 'node:test';

import {act, cleanup, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import {isNil} from '#internal/computil/index.js';

import {
  type HistoryAPI,
  NavLink,
  NavLinkClasses,
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
  testHistory.setLocation('http://localhost:3000/base');

  const Comp0 = () => {
    return (
      <div>
        <div>Component 0</div>
        <NavLink href={'comp1/hello'}>comp1</NavLink>
      </div>
    );
  };
  const Comp1 = () => {
    const {url, base, resolve: rootResolve} = useRouter();
    const {params, rest, resolve: subResolve} = useRoute();
    return (
      <div>
        <div>
          Component 1 {params['id'] ?? 'not exist'} {rest}
        </div>
        <NavLink href={'../hello?q=v'} exact>
          go to hello base
        </NavLink>
        <NavLink href={'../../comp2/subcomp/bye'}>go to comp 2</NavLink>
        <NavLink href={'remainder?b=y&a=x#xyz'}>go to hello</NavLink>
        <div>base: {base}</div>
        <div>{rootResolve('root-test')}</div>
        <div>{subResolve('sub-test')}</div>
        <div>{subResolve('/sub-abs-test')}</div>
        <div>query: {url.search}</div>
        <div>hash: {url.hash}</div>
      </div>
    );
  };
  const Comp2 = () => {
    const {params} = useRoute();
    return <div>Component 2 {params['c2'] ?? 'not exist'}</div>;
  };

  const routes = [
    {
      path: '',
      element: <Comp0 />,
      exact: true,
    },
    {
      path: '/comp1/{id}',
      element: <Comp1 />,
    },
    {
      path: '/comp2/subcomp/{c2}',
      element: <Comp2 />,
    },
  ];

  const fallback = <div>404 Not found</div>;

  const user = userEvent.setup();

  render(
    <Router history={testHistory} base="base">
      <div>Router base</div>
      <Routes routes={routes} fallback={fallback} />
    </Router>,
  );

  await t.test('renders when path matches base', () => {
    assert.ok(screen.getByText('Router base'));
    assert.ok(screen.getByText('Component 0'));
  });

  await t.test('renders route when path matches', async () => {
    await user.click(screen.getByRole('link', {name: 'comp1'}));

    assert.ok(screen.getByText('Component 1 hello'));
    assert.ok(screen.getByText('base: /base'));
    assert.ok(screen.getByText('/base/root-test'));
    assert.ok(screen.getByText('/base/comp1/hello/sub-test'));
    assert.ok(screen.getByText('/sub-abs-test'));
    assert.ok(screen.getByText('query:'));
    assert.ok(screen.getByText('hash:'));
  });

  await t.test('nav link matches current route', () => {
    assert.equal(
      screen.getByRole('link', {name: 'go to hello base'}).className,
      NavLinkClasses.Matches,
    );
    assert.equal(screen.getByRole('link', {name: 'go to hello'}).className, '');
    assert.equal(
      screen.getByRole('link', {name: 'go to comp 2'}).className,
      '',
    );
  });

  await t.test('nav link exact only matches full path', async () => {
    await user.click(screen.getByRole('link', {name: 'go to hello'}));

    assert.ok(screen.getByText('Component 1 hello /remainder'));

    assert.equal(
      screen.getByRole('link', {name: 'go to hello base'}).className,
      '',
    );
    assert.equal(
      screen.getByRole('link', {name: 'go to hello'}).className,
      NavLinkClasses.Matches,
    );
    assert.equal(
      screen.getByRole('link', {name: 'go to comp 2'}).className,
      '',
    );
  });

  await t.test('query and hash are correctly parsed', () => {
    assert.ok(screen.getByText('query: ?a=x&b=y'));
    assert.ok(screen.getByText('hash: #xyz'));
  });

  await t.test('routes are checked in order', async () => {
    await user.click(screen.getByRole('link', {name: 'go to comp 2'}));

    assert.ok(screen.getByText('Component 2 bye'));
  });

  await t.test('responds to history api events', () => {
    act(() => {
      testHistory.setLocation('http://localhost:3000/base/comp1/again');
    });

    assert.ok(screen.getByText('Component 1 again'));
  });

  await t.test('renders fallback when no routes match', () => {
    act(() => {
      testHistory.setLocation('http://localhost:3000/base/comp1');
    });

    assert.ok(screen.getByText('404 Not found'));
  });

  await t.test('does not render when path does not match base', () => {
    act(() => {
      testHistory.setLocation('http://localhost:3000/');
    });

    assert.ok(isNil(screen.queryByText('Router base')));
  });
});
