import React, {Fragment, lazy, Suspense} from 'react';
import {Switch, Route, Redirect, NavLink, useLocation} from 'react-router-dom';

import {useDarkMode} from '@xorkevin/nuke/src/component/darkmode';
import {SnackbarContainer} from '@xorkevin/nuke/src/component/snackbar';

import MainContent from '@xorkevin/nuke/src/component/maincontent';
import Container from '@xorkevin/nuke/src/component/container';
import Section from '@xorkevin/nuke/src/component/section';
import {Navbar, NavItem} from '@xorkevin/nuke/src/component/navbar';
import {
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
} from '@xorkevin/nuke/src/component/menu';
import Footer from '@xorkevin/nuke/src/component/footer';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import Anchor from '@xorkevin/nuke/src/component/anchor';
import AnchorSecondary from '@xorkevin/nuke/src/component/anchor/secondary';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const HomeContainer = lazy(() => import('container/home'));
const FormContainer = lazy(() => import('container/form'));
const CardContainer = lazy(() => import('container/card'));

const FallbackView = (
  <Container padded>
    <Section>Loading</Section>
  </Container>
);

const styletoppaths = new Set(['/']);

const App = () => {
  const {pathname} = useLocation();
  const [dark, toggleDark] = useDarkMode();
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
        <NavItem scroll="typography">Typography</NavItem>
        <NavItem local link="/form">
          Form
        </NavItem>
        <NavItem local link="/cards">
          Cards
        </NavItem>
      </Navbar>

      <MainContent>
        <Suspense fallback={FallbackView}>
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route path="/form">
              <FormContainer />
            </Route>
            <Route path="/cards">
              <CardContainer />
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
