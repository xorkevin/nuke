import React, {lazy} from 'react';
import {Switch, Route, Redirect, useRouteMatch} from 'react-router-dom';

import {
  Container,
  Section,
  Grid,
  Column,
  Sidebar,
  SidebarItem,
  SidebarHeader,
} from '@xorkevin/nuke';

const storiesList = [
  'anchor',
  'article',
  'button',
  'card',
  'chip',
  'comment',
  'container',
  'description',
  'footer',
  'form',
  'grid',
  'image',
  'listgroup',
  'menu',
  'navbar',
  'paginate',
  'popover',
  'section',
  'sidebar',
  'snackbar',
  'tabbar',
  'table',
  'time',
  'tooltip',
  'typography',
];

const storiesComponents = Object.fromEntries(
  storiesList.map((i) => [i, lazy(() => import(`stories/${i}`))]),
);

const Stories = () => {
  const match = useRouteMatch();
  return (
    <Section>
      <Container padded narrow>
        <Grid>
          <Column fullWidth md={6}>
            <Sidebar className="stories-sidebar">
              <SidebarHeader>Stories</SidebarHeader>
              {storiesList.map((i) => (
                <SidebarItem key={i} link={`${match.path}/${i}`} local>
                  {i}
                </SidebarItem>
              ))}
            </Sidebar>
          </Column>
          <Column fullWidth md={18}>
            <Switch>
              {storiesList.map((i) => {
                const Component = storiesComponents[i];
                return (
                  <Route key={i} path={`${match.path}/${i}`}>
                    <h1>{i.charAt(0).toUpperCase() + i.slice(1)}</h1>
                    <hr />
                    <Component />
                  </Route>
                );
              })}
              {storiesList.length > 0 && (
                <Redirect to={`${match.path}/${storiesList[0]}`} />
              )}
            </Switch>
          </Column>
        </Grid>
      </Container>
    </Section>
  );
};

export default Stories;
