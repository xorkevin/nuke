import {type FC, Suspense, lazy} from 'react';

import {type Route, Routes} from '@xorkevin/nuke/router';

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
    <main>
      <Suspense fallback={fallbackView}>
        <Routes routes={routes} />
      </Suspense>
    </main>
  );
};

export default App;
