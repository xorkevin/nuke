import {
  type ChangeEventHandler,
  type FC,
  Suspense,
  createElement,
  lazy,
  useCallback,
} from 'react';
import {
  Box,
  BoxPadded,
  BoxSize,
  Flex,
  FlexAlignItems,
  FlexJustifyContent,
} from '@xorkevin/nuke/component/box';
import {Field, Label, Select} from '@xorkevin/nuke/component/form';
import {NavBar, NavClasses} from '@xorkevin/nuke/component/nav';
import {ColorScheme, useColorScheme} from '@xorkevin/nuke/component/text';
import {classNames, valToEnum} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

import styles from './app.module.css';

const fallbackView = <div>Loading</div>;

const routes: Route[] = [
  {
    path: '',
    exact: true,
    element: createElement(
      lazy(async () => await import('./container/home.js')),
    ),
  },
  {
    path: '/stories',
    element: createElement(
      lazy(async () => await import('./container/stories.js')),
    ),
  },
];

const App: FC = () => {
  const {colorScheme, setColorScheme} = useColorScheme();
  const onColorSchemeChange = useCallback<
    ChangeEventHandler<HTMLSelectElement>
  >(
    (e) => {
      setColorScheme(
        valToEnum(ColorScheme, e.target.value) ?? ColorScheme.System,
      );
    },
    [setColorScheme],
  );
  return (
    <div className={styles['mainapp']}>
      <header className={NavClasses.Banner}>
        <Box
          size={BoxSize.S6}
          padded={BoxPadded.LR}
          center
          className={NavClasses.BannerItem}
        >
          <Flex
            justifyContent={FlexJustifyContent.SpaceBetween}
            alignItems={FlexAlignItems.Stretch}
            className={classNames(NavClasses.BannerItem)}
          >
            <NavBar matchesAriaCurrent="page" aria-label="Site navigation">
              <NavBar.Link href="" exact>
                Home
              </NavBar.Link>
              <NavBar.Link href="stories">Stories</NavBar.Link>
            </NavBar>
            <Field>
              <Flex alignItems={FlexAlignItems.Center}>
                <Label>color scheme</Label>
                <Select
                  name="scheme"
                  value={colorScheme}
                  onChange={onColorSchemeChange}
                >
                  <option value={ColorScheme.System}>System</option>
                  <option value={ColorScheme.Light}>Light</option>
                  <option value={ColorScheme.Dark}>Dark</option>
                </Select>
              </Flex>
            </Field>
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
