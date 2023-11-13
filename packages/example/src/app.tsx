import {type FC, Suspense, lazy} from 'react';
import {NavBar, NavClasses} from '@xorkevin/nuke/component/nav';
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
        <NavBar>
          <NavBar.Link href="" exact>
            Home
          </NavBar.Link>
          <NavBar.Link href="stories">Stories</NavBar.Link>
        </NavBar>
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
