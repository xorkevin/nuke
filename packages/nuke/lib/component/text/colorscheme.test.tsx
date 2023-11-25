import assert from 'node:assert/strict';
import test from 'node:test';

import {useCallback} from 'react';
import {act, cleanup, render, screen} from '@testing-library/react';
import {userEvent} from '@testing-library/user-event';

import {MemBodyClassListManager, MemMediaMatcher} from '#internal/dom/index.js';
import {MemStorage} from '#internal/storage/index.js';

import {
  BrowserColorSchemeManager,
  ColorScheme,
  ColorSchemeClasses,
  ColorSchemeProvider,
  useColorScheme,
} from './index.js';

await test('useColorScheme', async (t) => {
  t.after(() => {
    cleanup();
  });

  const storage = new MemStorage();
  const mediaMatcher = new MemMediaMatcher();
  const bodyClassList = new MemBodyClassListManager();

  const manager = new BrowserColorSchemeManager(
    storage,
    mediaMatcher,
    bodyClassList,
  );

  const assertManagerState = (scheme: ColorScheme, sysPrefDark: boolean) => {
    assert.equal(manager.getState().scheme, scheme);
    assert.equal(manager.getState().sysPrefDark, sysPrefDark);
    assert.equal(
      storage.getItem('nuke:colorscheme'),
      scheme === ColorScheme.System ? null : scheme,
    );
    assert.equal(
      mediaMatcher.matchMedia('(prefers-color-scheme: dark)'),
      sysPrefDark,
    );
    assert.equal(
      mediaMatcher.matchMedia('(prefers-color-scheme: dark)'),
      sysPrefDark,
    );
    assert.equal(
      bodyClassList.contains(ColorSchemeClasses.Light),
      scheme === ColorScheme.Light,
    );
    assert.equal(
      bodyClassList.contains(ColorSchemeClasses.Dark),
      scheme === ColorScheme.Dark,
    );
  };

  assertManagerState(ColorScheme.System, false);

  storage.setItem('nuke:colorscheme', ColorScheme.Dark);
  bodyClassList.add(ColorSchemeClasses.Light);

  const controller = new AbortController();
  manager.init(controller.signal);

  assertManagerState(ColorScheme.Dark, false);

  const Comp = () => {
    const {isDark, colorScheme, setColorScheme} = useColorScheme();
    const setSys = useCallback(() => {
      setColorScheme(ColorScheme.System);
    }, [setColorScheme]);
    const setLight = useCallback(() => {
      setColorScheme(ColorScheme.Light);
    }, [setColorScheme]);
    const setDark = useCallback(() => {
      setColorScheme(ColorScheme.Dark);
    }, [setColorScheme]);
    return (
      <div>
        <span>
          {isDark ? 'dark' : 'light'} {colorScheme}
        </span>
        <button onClick={setSys}>set sys</button>
        <button onClick={setLight}>set light</button>
        <button onClick={setDark}>set dark</button>
      </div>
    );
  };

  render(
    <ColorSchemeProvider value={manager}>
      <Comp />
    </ColorSchemeProvider>,
  );

  screen.getByText(`dark ${ColorScheme.Dark}`);
  assertManagerState(ColorScheme.Dark, false);

  await userEvent.click(screen.getByRole('button', {name: 'set sys'}));
  screen.getByText(`light ${ColorScheme.System}`);
  assertManagerState(ColorScheme.System, false);

  act(() => {
    mediaMatcher.setMediaQueryMatch('(prefers-color-scheme: dark)', true);
  });
  await screen.findByText(`dark ${ColorScheme.System}`);
  assertManagerState(ColorScheme.System, true);

  await userEvent.click(screen.getByRole('button', {name: 'set light'}));
  screen.getByText(`light ${ColorScheme.Light}`);
  assertManagerState(ColorScheme.Light, true);

  await userEvent.click(screen.getByRole('button', {name: 'set dark'}));
  screen.getByText(`dark ${ColorScheme.Dark}`);
  assertManagerState(ColorScheme.Dark, true);

  act(() => {
    storage.extSetItem('nuke:colorscheme', ColorScheme.Light);
  });
  await screen.findByText(`light ${ColorScheme.Light}`);
  assertManagerState(ColorScheme.Light, true);

  act(() => {
    storage.extClear();
  });
  await screen.findByText(`dark ${ColorScheme.System}`);
  assertManagerState(ColorScheme.System, true);
});
