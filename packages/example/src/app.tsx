import {type FC, Suspense, lazy} from 'react';
import {
  Box,
  BoxClasses,
  BoxPadded,
  BoxSize,
  Flex,
  FlexAlignItems,
} from '@xorkevin/nuke/component/box';
import {NavBar, NavClasses} from '@xorkevin/nuke/component/nav';
import {classNames} from '@xorkevin/nuke/computil';
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
    component: lazy(async () => await import('./container/stories/index.js')),
  },
];

const App: FC = () => {
  return (
    <div className={styles['mainapp']}>
      <header className={NavClasses.Banner}>
        <Box
          size={BoxSize.S4}
          padded={BoxPadded.LR}
          className={NavClasses.BannerItem}
        >
          <Flex
            alignItems={FlexAlignItems.Stretch}
            className={classNames(
              NavClasses.BannerItem,
              BoxClasses.PadSmall,
              BoxClasses.PadLR,
            )}
          >
            <NavBar matchesAriaCurrent="page" aria-label="Site navigation">
              <NavBar.Link href="" exact>
                Home
              </NavBar.Link>
              <NavBar.Link href="stories">Stories</NavBar.Link>
            </NavBar>
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
