import {type FC, Suspense, lazy} from 'react';
import {
  Box,
  BoxClasses,
  BoxSize,
  Flex,
  FlexWrap,
} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

import styles from './stories.module.css';

const stories = [
  {
    name: 'Button',
    path: 'button',
    component: lazy(async () => await import('./stories/button.js')),
  },
  {
    name: 'Navigation',
    path: 'nav',
    component: lazy(async () => await import('./stories/nav.js')),
  },
];

const fallbackView = <div>Loading</div>;

const StoriesHome: FC = () => {
  return (
    <Box padded>
      <hgroup>
        <h2
          className={classNames(TextClasses.Display, styles['story-display'])}
        >
          Stories
        </h2>
      </hgroup>
    </Box>
  );
};

const routes: Route[] = [
  {
    path: '',
    exact: true,
    component: StoriesHome,
  },
  ...stories.map((v) => ({
    path: `/${v.path}`,
    component: v.component,
  })),
];

const Stories: FC = () => {
  return (
    <Flex wrap={FlexWrap.Wrap}>
      <div className={classNames(NavClasses.Sidebar, BoxClasses.PadSmall)}>
        <NavList matchesAriaCurrent="page" aria-label="Stories navigation">
          <NavList.Group heading="Components">
            {stories.map((v) => (
              <NavList.Link key={v.path} href={v.path}>
                {v.name}
              </NavList.Link>
            ))}
          </NavList.Group>
        </NavList>
      </div>
      <Box size={BoxSize.S4} padded center>
        <Suspense fallback={fallbackView}>
          <Routes routes={routes} />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default Stories;
