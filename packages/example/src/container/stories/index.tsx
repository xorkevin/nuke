import type {FC} from 'react';
import {Box, BoxClasses, BoxSize, Flex} from '@xorkevin/nuke/component/box';
import {NavClasses, NavList} from '@xorkevin/nuke/component/nav';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';

import styles from './stories.module.css';

const Stories: FC = () => {
  return (
    <Flex>
      <div className={classNames(NavClasses.Sidebar, BoxClasses.PadSmall)}>
        <NavList matchesAriaCurrent="page" aria-label="Stories navigation">
          <NavList.Group heading="Some components">
            <NavList.Link href="one">One</NavList.Link>
            <NavList.Link href="two">Two</NavList.Link>
          </NavList.Group>
          <NavList.Divider />
          <NavList.Group heading="Moar components">
            <NavList.Link href="three">Three</NavList.Link>
            <NavList.Link href="four">Four</NavList.Link>
          </NavList.Group>
        </NavList>
      </div>
      <Box size={BoxSize.S4} padded center>
        <Box padded>
          <hgroup>
            <h2
              className={classNames(
                TextClasses.Display,
                styles['story-display'],
              )}
            >
              Stories
            </h2>
          </hgroup>
        </Box>
      </Box>
    </Flex>
  );
};

export default Stories;
