import {type FC, Suspense, createElement, lazy} from 'react';
import {Box, BoxSize, Flex, FlexClasses} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';
import {type Route, Routes} from '@xorkevin/nuke/router';

const stories = [
  {
    name: 'Color',
    path: 'color',
    element: createElement(
      lazy(async () => await import('./stories/color.js')),
    ),
    kind: 'foundation',
  },
  {
    name: 'Badge',
    path: 'badge',
    element: createElement(
      lazy(async () => await import('./stories/badge.js')),
    ),
    kind: 'component',
  },
  {
    name: 'Button',
    path: 'button',
    element: createElement(
      lazy(async () => await import('./stories/button.js')),
    ),
    kind: 'component',
  },
  {
    name: 'Card',
    path: 'card',
    element: createElement(lazy(async () => await import('./stories/card.js'))),
    kind: 'component',
  },
  {
    name: 'Form',
    path: 'form',
    element: createElement(lazy(async () => await import('./stories/form.js'))),
    kind: 'component',
  },
  {
    name: 'Navigation',
    path: 'nav',
    element: createElement(lazy(async () => await import('./stories/nav.js'))),
    kind: 'component',
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
    element: <StoriesHome />,
  },
  ...stories.map((v) => ({
    path: `/${v.path}`,
    element: v.element,
  })),
];

const foundationStories = stories.filter((v) => v.kind === 'foundation');
const componentStories = stories.filter((v) => v.kind === 'component');

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
