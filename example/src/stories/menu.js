import React, {Fragment} from 'react';

import {Story} from 'docs';

import {
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
} from '@xorkevin/nuke/src/component/menu';
import Button from '@xorkevin/nuke/src/component/button';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const Stories = () => {
  const menu = useMenu();
  return (
    <Fragment>
      <p>
        <code>Menu</code> is used to create menus.
      </p>
      <Story>
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
      </Story>
    </Fragment>
  );
};

export default Stories;
