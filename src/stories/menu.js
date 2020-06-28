import React, {Fragment} from 'react';
import {Menu, MenuItem, MenuHeader, MenuDivider} from 'component/menu';
import Button from 'component/button';
import Anchor from 'component/anchor';
import FaIcon from 'component/faicon';

export default {title: 'Menu'};

export const plain = () => (
  <Menu
    size="md"
    target={
      <Fragment>
        <Button>
          <FaIcon icon="cog" /> Settings
        </Button>
      </Fragment>
    }
  >
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
    >
      xorkevin
    </MenuItem>
  </Menu>
);
