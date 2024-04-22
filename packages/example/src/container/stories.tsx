import {type FC, Suspense, lazy} from 'react';
import {Box, BoxSize, Flex, FlexClasses} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

const foundationStories = [
  {
    name: 'Color',
    path: 'color',
    component: lazy(async () => await import('./stories/color.js')),
  },
];

const componentStories = [
  {
    name: 'Badge',
    path: 'badge',
    component: lazy(async () => await import('./stories/badge.js')),
  },
  {
    name: 'Button',
    path: 'button',
    component: lazy(async () => await import('./stories/button.js')),
  },
  {
    name: 'Card',
    path: 'card',
    component: lazy(async () => await import('./stories/card.js')),
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
        <h1 className={TextClasses.Display}>Stories</h1>
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
  ...foundationStories.concat(componentStories).map((v) => ({
    path: `/${v.path}`,
    component: v.component,
  })),
];

const Stories: FC = () => {
  return (
    <Box size={BoxSize.S6} center>
      <Flex>
        <div className={NavClasses.Sidebar}>
          <Box padded>
            <NavList matchesAriaCurrent="page" aria-label="Stories navigation">
              <NavList.Group heading="Foundations">
                {foundationStories.map((v) => (
                  <NavList.Link key={v.path} href={v.path}>
                    {v.name}
                  </NavList.Link>
                ))}
              </NavList.Group>
              <NavList.Divider />
              <NavList.Group heading="Components">
                {componentStories.map((v) => (
                  <NavList.Link key={v.path} href={v.path}>
                    {v.name}
                  </NavList.Link>
                ))}
              </NavList.Group>
            </NavList>
          </Box>
        </div>
        <Box
          padded
          center
          className={classNames(FlexClasses.Basis0, FlexClasses.Grow)}
        >
          <Suspense fallback={fallbackView}>
            <Routes routes={routes} />
          </Suspense>
        </Box>
      </Flex>
    </Box>
  );
};

export default Stories;
