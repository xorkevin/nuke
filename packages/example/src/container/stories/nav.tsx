import {type FC, Fragment} from 'react';
import {BoxClasses, Flex, FlexAlignItems} from '@xorkevin/nuke/component/box';
import {NavBar, NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {classNames} from '@xorkevin/nuke/computil';

import {DemoWell} from './demoutil.js';

const Story: FC = () => {
  return (
    <Fragment>
      <h1>Navigation</h1>
      <h2>Nav list</h2>
      <DemoWell>
        <div className={classNames(NavClasses.Sidebar, BoxClasses.PadSmall)}>
          <NavList matchesAriaCurrent="page" aria-label="Test navigation">
            <NavList.Group heading="Some components">
              <NavList.Link href="one">One</NavList.Link>
              <NavList.SubNav heading="Two">
                <NavList.Link href="two/alpha">Two alpha</NavList.Link>
                <NavList.SubNav heading="Two beta">
                  <NavList.Link href="two/beta/1">Two beta 1</NavList.Link>
                  <NavList.Link href="two/beta/2">Two beta 2</NavList.Link>
                </NavList.SubNav>
              </NavList.SubNav>
            </NavList.Group>
            <NavList.Divider />
            <NavList.Group heading="Moar components">
              <NavList.Link href="three">Three</NavList.Link>
              <NavList.Link href="four">Four</NavList.Link>
            </NavList.Group>
          </NavList>
        </div>
      </DemoWell>
      <h2>Nav bar</h2>
      <DemoWell>
        <Flex alignItems={FlexAlignItems.Stretch} style={{height: '56px'}}>
          <NavBar
            collapsible
            matchesAriaCurrent="page"
            aria-label="Test navigation"
          >
            <NavBar.Link href="one">One</NavBar.Link>
            <NavBar.Link href="two">Two</NavBar.Link>
            <NavBar.Divider />
            <NavBar.Link href="three">Three</NavBar.Link>
            <NavBar.Link href="four">Four</NavBar.Link>
          </NavBar>
        </Flex>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
