import type {FC, PropsWithChildren} from 'react';
import {Box} from '@xorkevin/nuke/component/box';
import {TextClasses} from '@xorkevin/nuke/component/text';
import {classNames, modClassNames} from '@xorkevin/nuke/computil';

import styles from './demoutil.module.css';

export const DemoTitle: FC<PropsWithChildren> = ({children}) => {
  return <h1 className={classNames(TextClasses.TitleLarge)}>{children}</h1>;
};

export const DemoSection: FC<PropsWithChildren> = ({children}) => {
  return (
    <h2
      className={classNames(
        TextClasses.TitleMedium,
        modClassNames(styles, 'demo-section'),
      )}
    >
      {children}
    </h2>
  );
};

export const DemoWell: FC<PropsWithChildren> = ({children}) => {
  return (
    <Box padded card>
      {children}
    </Box>
  );
};
