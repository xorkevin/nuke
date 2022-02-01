import {Fragment} from 'react';

import {Story} from 'docs';

import {
  Sidebar,
  SidebarItem,
  SidebarHeader,
  SidebarDivider,
} from '@xorkevin/nuke/src/component/sidebar';
import {Grid, Column} from '@xorkevin/nuke/src/component/grid';
import FaIcon from '@xorkevin/nuke/src/component/faicon';

const Stories = () => (
  <Fragment>
    <p>
      <code>Sidebar</code> is used to display supplemental actions and
      navigation to the nav and tab bars.
    </p>

    <Story name="sidebar">
      <Grid>
        <Column md={6}>
          <Sidebar>
            <SidebarHeader>Settings</SidebarHeader>
            <SidebarItem
              className="active"
              icon={<FaIcon icon="bolt" />}
              label={<kbd>^B</kbd>}
            >
              Dark Mode
            </SidebarItem>
            <SidebarItem
              icon={<FaIcon icon="question" />}
              label={<kbd>^H</kbd>}
            >
              Help
            </SidebarItem>
            <SidebarDivider />
            <SidebarHeader>About</SidebarHeader>
            <SidebarItem
              link="https://github.com/xorkevin"
              ext
              icon={<FaIcon icon="github" />}
              label={<FaIcon icon="external-link" />}
            >
              xorkevin
            </SidebarItem>
          </Sidebar>
        </Column>
      </Grid>
    </Story>
  </Fragment>
);

export default Stories;
