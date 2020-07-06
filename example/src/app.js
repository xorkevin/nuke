import React, {Fragment, lazy, Suspense} from 'react';
import {Switch, Route, Redirect, NavLink, useLocation} from 'react-router-dom';

import {useDarkMode} from '@xorkevin/nuke/src/component/darkmode';
import {SnackbarContainer} from '@xorkevin/nuke/src/component/snackbar';

import MainContent from '@xorkevin/nuke/src/component/maincontent';
import Section from '@xorkevin/nuke/src/component/section';
import {Navbar, Navitem} from '@xorkevin/nuke/src/component/navbar';
import Menu from '@xorkevin/nuke/src/component/menu';
import Footer from '@xorkevin/nuke/src/component/footer';
import Grid from '@xorkevin/nuke/src/component/grid';
import Anchor from '@xorkevin/nuke/src/component/anchor';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const HomeContainer = lazy(() => import('container/home'));
const FormContainer = lazy(() => import('container/form'));
const CardContainer = lazy(() => import('container/card'));

const FallbackView = (
  <Section container padded narrow>
    Loading
  </Section>
);

const styletoppaths = new Set(['/']);

const App = () => {
  const {pathname} = useLocation();
  const [dark, toggleDark] = useDarkMode();

  return (
    <div>
      <Navbar
        hideOnScroll
        styletop={styletoppaths.has(pathname)}
        left={
          <Fragment>
            <Navitem scroll>
              <NavLink exact to="/">
                Home
              </NavLink>
            </Navitem>
            <Navitem scroll="typography">
              <div>Typography</div>
            </Navitem>
            <Navitem>
              <NavLink to="/form">Form</NavLink>
            </Navitem>
            <Navitem>
              <NavLink to="/cards">Cards</NavLink>
            </Navitem>
          </Fragment>
        }
        right={
          <Fragment>
            <Navitem>
              <Menu
                icon={
                  <Fragment>
                    <FaIcon icon="cog" /> Settings
                  </Fragment>
                }
                size="md"
                fixed
                align="right"
                position="bottom"
              >
                <span onClick={toggleDark}>
                  <FaIcon icon="bolt" /> {dark ? 'Light' : 'Dark'} Mode
                </span>
                <Anchor ext href="https://github.com/xorkevin">
                  <FaIcon icon="github" /> xorkevin
                </Anchor>
              </Menu>
            </Navitem>
          </Fragment>
        }
      />

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
        <Grid center map sm={8}>
          <div className="text-center">
            <h4>Nuke</h4>a reactive frontend for governor
          </div>
          <div className="text-center">
            <ul>
              <li>
                <Anchor noColor ext href="https://github.com/xorkevin/nuke">
                  <FaIcon icon="github" /> Github
                </Anchor>
              </li>
              <li>
                Designed for{' '}
                <Anchor noColor ext href="https://github.com/xorkevin/governor">
                  xorkevin/governor
                </Anchor>
              </li>
            </ul>
          </div>
          <div className="text-center">
            <h5>
              <FaIcon icon="code" /> with <FaIcon icon="heart-o" /> by{' '}
              <Anchor noColor ext href="https://github.com/xorkevin">
                <FaIcon icon="github" /> xorkevin
              </Anchor>
            </h5>
          </div>
        </Grid>
      </Footer>
      <SnackbarContainer />
    </div>
  );
};

export default App;
