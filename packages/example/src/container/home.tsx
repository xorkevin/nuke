import type {FC} from 'react';
import {Box, BoxSize} from '@xorkevin/nuke/component/box';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames} from '@xorkevin/nuke/computil';

import styles from './home.module.css';

const Home: FC = () => {
  return (
    <Box size={BoxSize.S4} padded center>
      <Box padded>
        <hgroup>
          <h1
            className={classNames(
              TextClasses.Display,
              styles['heading-display'],
            )}
          >
            Nuke
          </h1>
          <p className={TextClasses.Subtitle}>a reactive frontend toolkit</p>
        </hgroup>
      </Box>
    </Box>
  );
};

export default Home;
