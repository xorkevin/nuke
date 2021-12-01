import {Fragment, lazy} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

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
  'modal',
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
  return (
    <Section>
      <Container padded narrow>
        <Grid>
          <Column fullWidth md={6}>
            <Sidebar className="stories-sidebar">
              <SidebarHeader>Stories</SidebarHeader>
              {storiesList.map((i) => (
                <SidebarItem key={i} link={i} local>
                  {i}
                </SidebarItem>
              ))}
            </Sidebar>
          </Column>
          <Column fullWidth md={18}>
            <Routes>
              {storiesList.map((i) => {
                const Component = storiesComponents[i];
                return (
                  <Route
                    key={i}
                    path={i}
                    element={
                      <Fragment>
                        <h1>{i.charAt(0).toUpperCase() + i.slice(1)}</h1>
                        <hr />
                        <Component />
                      </Fragment>
                    }
                  />
                );
              })}
              {storiesList.length > 0 && (
                <Route
                  path="*"
                  element={<Navigate to={storiesList[0]} replace />}
                />
              )}
            </Routes>
          </Column>
        </Grid>
      </Container>
    </Section>
  );
};

export default Stories;
