import {Fragment} from 'react';

import {Story} from 'docs';

import {Navbar, NavItem, NavDivider} from '@xorkevin/nuke/src/component/navbar';
import {
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
} from '@xorkevin/nuke/src/component/menu';
import Section from '@xorkevin/nuke/src/component/section';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const Stories = () => {
  const menu = useMenu();
  return (
    <Fragment>
      <p>
        <code>Navbar</code> is used to create a navbar.
      </p>
      <Story>
        <Navbar
          right={
            <Fragment>
              <NavItem link="https://github.com/xorkevin" ext>
                <FaIcon icon="user" /> Profile
              </NavItem>
              <NavItem forwardedRef={menu.anchorRef} onClick={menu.toggle}>
                <FaIcon icon="cog" /> Settings
              </NavItem>
              {menu.show && (
                <Menu size="md" anchor={menu.anchor} close={menu.close}>
                  <MenuHeader>Settings</MenuHeader>
                  <MenuItem icon={<FaIcon icon="bolt" />} label="Ctrl+B">
                    Dark Mode
                  </MenuItem>
                  <MenuItem icon={<FaIcon icon="question" />} label="Ctrl+H">
                    Help
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
          <NavItem scroll="section1">Section 1</NavItem>
          <NavItem scroll="section2">Section 2</NavItem>
          <NavDivider />
          <NavItem scroll="section3">Section 3</NavItem>
          <NavItem scroll="section4">Section 4</NavItem>
        </Navbar>
        <Section id="section1">
          <h1>Section Title</h1>
          <hr />
          <p style={{height: '256px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </p>
        </Section>
        <Section id="section2">
          <h1>Section Title</h1>
          <hr />
          <p style={{height: '256px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </p>
        </Section>
        <Section id="section3">
          <h1>Section Title</h1>
          <hr />
          <p style={{height: '256px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </p>
        </Section>
        <Section id="section4">
          <h1>Section Title</h1>
          <hr />
          <p style={{height: '256px'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
            dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
            sit amet, egestas ut risus. In hac habitasse platea dictumst.
            Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
          </p>
        </Section>
      </Story>
      <p>
        The props <code>fixed</code> and <code>hideOnScroll</code> allow the
        navbar to be afixed to the top of the page and hide on scroll
        respectively.
      </p>
    </Fragment>
  );
};

export default Stories;
