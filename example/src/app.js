import {Fragment, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {
  useDarkModeValue,
  useSetDarkMode,
  SnackbarContainer,
  MainContent,
  Container,
  Section,
  Navbar,
  NavItem,
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
  Footer,
  Grid,
  Column,
  FaIcon,
} from '@xorkevin/nuke';
import AnchorSecondary from '@xorkevin/nuke/src/component/anchor/secondary';

const HomeContainer = lazy(() => import('container/home'));
const Stories = lazy(() => import('stories'));

const FallbackView = (
  <Container padded>
    <Section>Loading</Section>
  </Container>
);

const App = () => {
  const dark = useDarkModeValue();
  const toggleDark = useSetDarkMode();
  const menu = useMenu();

  return (
    <div>
      <Navbar
        fixed
        hideOnScroll
        right={
          <Fragment>
            <NavItem forwardedRef={menu.anchorRef} onClick={menu.toggle}>
              <FaIcon icon="cog" /> Settings
            </NavItem>
            {menu.show && (
              <Menu size="md" anchor={menu.anchor} close={menu.close}>
                <MenuHeader>Settings</MenuHeader>
                <MenuItem
                  onClick={toggleDark}
                  icon={<FaIcon icon="bolt" />}
                  label="Ctrl+B"
                >
                  {dark ? 'Light' : 'Dark'} Mode
                </MenuItem>
                <MenuDivider />
                <MenuHeader>About</MenuHeader>
                <MenuItem
                  link="https://github.com/xorkevin"
                  ext
                  icon={<FaIcon icon="github" />}
                  label={<FaIcon icon="external-link" />}
                >
                  xorkevin
                </MenuItem>
              </Menu>
            )}
          </Fragment>
        }
      >
        <NavItem local link="/">
          Home
        </NavItem>
        <NavItem local link="/stories">
          Stories
        </NavItem>
      </Navbar>

      <MainContent>
        <Suspense fallback={FallbackView}>
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route path="/stories">
              <Stories />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </MainContent>

      <Footer>
        <Grid className="dark" justify="center" align="center">
          <Column sm={8}>
            <div className="text-center">
              <h4 className="footer-header">Nuke</h4> a reactive frontend
              toolkit
              <ul>
                <li>
                  <AnchorSecondary ext href="https://github.com/xorkevin/nuke">
                    <FaIcon icon="github" /> xorkevin/nuke
                  </AnchorSecondary>
                </li>
                <li>
                  <h5>
                    <FaIcon icon="code" /> with <FaIcon icon="heart-o" /> by{' '}
                    <AnchorSecondary ext href="https://github.com/xorkevin">
                      <FaIcon icon="github" /> xorkevin
                    </AnchorSecondary>
                  </h5>
                </li>
              </ul>
            </div>
          </Column>
        </Grid>
      </Footer>
      <SnackbarContainer />
    </div>
  );
};

export default App;
