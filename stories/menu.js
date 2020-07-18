import React, {Fragment} from 'react';
import {
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
} from 'src/component/menu';
import Button from 'src/component/button';
import FaIcon from 'src/component/faicon';

export default {title: 'Menu'};

export const Plain = () => {
  const menu = useMenu();
  return (
    <Fragment>
      <Button forwardedRef={menu.anchorRef} onClick={menu.toggle}>
        <FaIcon icon="cog" /> Settings
      </Button>
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
  );
};
