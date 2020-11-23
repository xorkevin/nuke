import React, {Fragment} from 'react';
import {
  useSnackbarView,
  SnackbarSurface,
  Container,
  Section,
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
  Button,
  Table,
  Tabbar,
  TabItem,
  TabDivider,
  FaIcon,
} from '@xorkevin/nuke';

import {tableData} from 'config';

const FormContainer = () => {
  const displaySnackbar = useSnackbarView(
    <SnackbarSurface>
      <span>Hello, World</span> <Button>Reply</Button>
    </SnackbarSurface>,
  );

  const menu = useMenu();

  return (
    <Container padded narrow>
      <Section id="form">
        <Button onClick={displaySnackbar}>Snackbar</Button>

        <Section id="table">
          <h3>Table</h3>
          <Table
            head={
              <Fragment>
                <th>name</th>
                <th>description</th>
              </Fragment>
            }
          >
            {tableData.map(({name, description}) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{description}</td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section id="tabs">
          <h3>Tabs</h3>
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
        </Section>
      </Section>
    </Container>
  );
};

export default FormContainer;
