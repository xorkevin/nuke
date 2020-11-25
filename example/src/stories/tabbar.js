import React, {Fragment} from 'react';

import {Story} from 'docs';

import {Tabbar, TabItem, TabDivider} from '@xorkevin/nuke/src/component/tabbar';
import {
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
} from '@xorkevin/nuke/src/component/menu';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const Stories = () => {
  const menu = useMenu();
  return (
    <Fragment>
      <p>
        <code>Tabbar</code> is used to create tab bars.
      </p>
      <Story>
        <Tabbar
          right={
            <Fragment>
              <TabItem link="https://github.com/xorkevin" ext>
                <FaIcon icon="user" /> Profile
              </TabItem>
              <TabItem forwardedRef={menu.anchorRef} onClick={menu.toggle}>
                <FaIcon icon="cog" /> Settings
              </TabItem>
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
          <TabItem className="active">
            <FaIcon icon="newspaper-o" /> Newsfeed
          </TabItem>
          <TabItem>
            <FaIcon icon="fire" /> Popular
          </TabItem>
          <TabDivider />
          <TabItem>
            <FaIcon icon="users" /> Friends
          </TabItem>
          <TabItem>
            <FaIcon icon="paper-plane" /> Post
          </TabItem>
        </Tabbar>
      </Story>
    </Fragment>
  );
};

export default Stories;
