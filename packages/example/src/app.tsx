import {type FC, Suspense, lazy} from 'react';
import {NavAnchor, type Route, Routes} from '@xorkevin/nuke/router';

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
    <main className={styles['mainapp']}>
      <NavAnchor href="" exact>
        Home
      </NavAnchor>
      <NavAnchor href="stories" exact>
        Stories
      </NavAnchor>
      <Suspense fallback={fallbackView}>
        <Routes routes={routes} />
      </Suspense>
    </main>
  );
};

export default App;
