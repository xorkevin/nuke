import type {FC, PropsWithChildren} from 'react';
import {BoxClasses} from '@xorkevin/nuke/component/box';
import {ColorClasses} from '@xorkevin/nuke/component/text';
import {classNames, modClassNames} from '@xorkevin/nuke/computil';

import styles from './demoutil.module.css';

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
