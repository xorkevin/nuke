import React, {Fragment} from 'react';
import {Tabbar, TabItem, TabDivider} from 'component/tabbar';
import {useMenu, Menu, MenuItem, MenuHeader, MenuDivider} from 'component/menu';
import FaIcon from 'component/faicon';

export default {title: 'Tabbar'};

export const plain = () => {
  const menu = useMenu();
  return (
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
  );
};
