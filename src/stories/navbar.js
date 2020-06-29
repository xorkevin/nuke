import React, {Fragment} from 'react';
import {Navbar, NavItem} from 'component/navbar';
import {useMenu, Menu, MenuItem, MenuHeader, MenuDivider} from 'component/menu';
import FaIcon from 'component/faicon';

export default {title: 'Navbar'};

export const plain = () => {
  const menu = useMenu();
  return (
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
      <NavItem>Home</NavItem>
      <NavItem>Typography</NavItem>
      <NavItem>Form</NavItem>
      <NavItem>Cards</NavItem>
    </Navbar>
  );
};
