import '#internal/testutil.js';

import assert from 'node:assert/strict';
import test from 'node:test';

import {cleanup, render, screen} from '@testing-library/react';

import {
  BrowserColorSchemeManager,
  ColorScheme,
  ColorSchemeClasses,
  useColorScheme,
} from './colorscheme.js';
import {MemBodyClassListManager, MemMediaMatcher} from '#internal/dom/index.js';
import {MemStorage} from '#internal/storage/index.js';
import {useCallback} from 'react';

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

  bodyClassList.add(ColorSchemeClasses.Dark);

  const controller = new AbortController();
  manager.init(controller.signal);

  assert.equal(manager.getState().scheme, ColorScheme.System);
  assert.equal(manager.getState().sysPrefDark, false);
  assert.equal(bodyClassList.contains(ColorSchemeClasses.Light), false);
  assert.equal(bodyClassList.contains(ColorSchemeClasses.Dark), false);

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

  render(<Comp />);

  screen.getByText(`light ${ColorScheme.System}`);
});
