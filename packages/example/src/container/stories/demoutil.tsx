import type {FC, PropsWithChildren} from 'react';
import {BoxClasses} from '@xorkevin/nuke/component/box';
import {ColorClasses, TextClasses} from '@xorkevin/nuke/component/text';
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
    <div
      className={classNames(
        ColorClasses.B1,
        BoxClasses.PadSmall,
        BoxClasses.BorderRound,
        modClassNames(styles, 'demo-well'),
      )}
    >
      {children}
    </div>
  );
};
