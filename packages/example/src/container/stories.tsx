import {lazy, type FC, Suspense} from 'react';
import {Box, BoxClasses, BoxSize, Flex} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

import styles from './stories.module.css';

const storyNames = ['button', 'nav'];

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
  ...storyNames.map((v) => ({
    path: `/${v}`,
    component: lazy(() => import(`./stories/${v}`)),
  })),
];

const Stories: FC = () => {
  return (
    <Flex>
      <div className={classNames(NavClasses.Sidebar, BoxClasses.PadSmall)}>
        <NavList matchesAriaCurrent="page" aria-label="Stories navigation">
          <NavList.Group heading="Components">
            {storyNames.map((v) => (
              <NavList.Link key={v} href={v}>
                {v}
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
