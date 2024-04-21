import {type FC, Suspense, lazy} from 'react';
import {Box, BoxSize, Flex, FlexWrap} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
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
    <Flex wrap={FlexWrap.Wrap}>
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
      <Box size={BoxSize.S4} padded center>
        <Suspense fallback={fallbackView}>
          <Routes routes={routes} />
        </Suspense>
      </Box>
    </Flex>
  );
};

export default Stories;
