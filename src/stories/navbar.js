import React, {Fragment} from 'react';
import {Navbar, NavItem} from 'component/navbar';
import {useMenu, Menu, MenuItem, MenuHeader, MenuDivider} from 'component/menu';
import Section from 'component/section';
import FaIcon from 'component/faicon';

export default {title: 'Navbar'};

export const plain = () => {
  const menu = useMenu();
  return (
    <Fragment>
      <Navbar
        hideOnScroll
        styletop={false}
        right={
          <Fragment>
            <NavItem forwardedRef={menu.anchorRef} onClick={menu.toggle}>
              <FaIcon icon="cog" /> Settings
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
            </NavItem>
          </Fragment>
        }
      >
        <NavItem scroll="section1">Section 1</NavItem>
        <NavItem scroll="section2">Section 2</NavItem>
        <NavItem scroll="section3">Section 3</NavItem>
        <NavItem scroll="section4">Section 4</NavItem>
      </Navbar>
      <Section id="section1">
        <h1>Section Title</h1>
        <hr />
        <p style={{height: '256px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </p>
      </Section>
      <Section id="section2">
        <h1>Section Title</h1>
        <hr />
        <p style={{height: '256px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </p>
      </Section>
      <Section id="section3">
        <h1>Section Title</h1>
        <hr />
        <p style={{height: '256px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </p>
      </Section>
      <Section id="section4">
        <h1>Section Title</h1>
        <hr />
        <p style={{height: '256px'}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
          dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit sit
          amet, egestas ut risus. In hac habitasse platea dictumst. Vivamus nibh
          enim, dignissim quis consequat at, sagittis in magna.
        </p>
      </Section>
    </Fragment>
  );
};
