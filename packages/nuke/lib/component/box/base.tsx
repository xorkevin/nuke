import type {FC, PropsWithChildren} from 'react';

import {modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export enum BoxSize {
  S1 = 's1',
  S2 = 's2',
  S3 = 's3',
  S4 = 's4',
  S5 = 's5',
  S6 = 's6',
}

export type BoxProps = {
  size?: BoxSize;
  padded?: boolean;
};

export const Box: FC<PropsWithChildren<BoxProps>> = ({
  size,
  padded,
  children,
}) => {
  const c = modClassNames(styles, [
    {
      container: true,
      padded: padded ?? false,
    },
    size,
  ]);
  return <div className={c}>{children}</div>;
};
