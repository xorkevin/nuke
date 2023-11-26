import {
  type ChangeEventHandler,
  type FC,
  Suspense,
  lazy,
  useCallback,
  useId,
} from 'react';
import {
  Box,
  BoxClasses,
  BoxPadded,
  BoxSize,
  Flex,
  FlexAlignItems,
  FlexJustifyContent,
} from '@xorkevin/nuke/component/box';
import {NavBar, NavClasses} from '@xorkevin/nuke/component/nav';
import {ColorScheme, useColorScheme} from '@xorkevin/nuke/component/text';
import {classNames, strToEnum} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

import styles from './app.module.css';

const fallbackView = <div>Loading</div>;

const routes: Route[] = [
  {
    path: '',
    exact: true,
    component: lazy(async () => await import('./container/home.js')),
  },
  {
    path: '/stories',
    component: lazy(async () => await import('./container/stories.js')),
  },
];

const App: FC = () => {
  const {isDark, colorScheme, setColorScheme} = useColorScheme();
  const onColorSchemeChange = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >(
    (e) => {
      setColorScheme(
        strToEnum(ColorScheme, e.target.value) ?? ColorScheme.System,
      );
    },
    [setColorScheme],
  );
  const darkModeSelectorId = useId();
  return (
    <div className={styles['mainapp']}>
      <header className={NavClasses.Banner}>
        <Box
          size={BoxSize.S4}
          padded={BoxPadded.LR}
          center
          className={NavClasses.BannerItem}
        >
          <Flex
            justifyContent={FlexJustifyContent.SpaceBetween}
            alignItems={FlexAlignItems.Stretch}
            className={classNames(
              NavClasses.BannerItem,
              BoxClasses.PadSmall,
              BoxClasses.PadLR,
            )}
          >
            <NavBar
              collapsible
              matchesAriaCurrent="page"
              aria-label="Site navigation"
            >
              <NavBar.Link href="" exact>
                Home
              </NavBar.Link>
              <NavBar.Link href="stories">Stories</NavBar.Link>
            </NavBar>
            <Flex alignItems={FlexAlignItems.Center}>
              <form>
                <label htmlFor={darkModeSelectorId}>color scheme</label>
                <select
                  id={darkModeSelectorId}
                  name="scheme"
                  value={colorScheme}
                  onChange={onColorSchemeChange}
                >
                  <option value={ColorScheme.System}>System</option>
                  <option value={ColorScheme.Light}>Light</option>
                  <option value={ColorScheme.Dark}>Dark</option>
                </select>
                <output name="isDark" htmlFor={darkModeSelectorId}>
                  {isDark ? 'dark' : 'light'}
                </output>
              </form>
            </Flex>
          </Flex>
        </Box>
      </header>
      <main>
        <Suspense fallback={fallbackView}>
          <Routes routes={routes} />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
