import type {FC, PropsWithChildren} from 'react';

import {modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export enum ContainerSize {
  S1 = 's1',
  S2 = 's2',
  S3 = 's3',
  S4 = 's4',
  S5 = 's5',
  S6 = 's6',
}

export type ContainerProps = {
  size?: ContainerSize;
  padded?: boolean;
};

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  size,
  padded,
  children,
}) => {
  const c = modClassNames(styles, {
    container: true,
    padded: padded ?? false,
    s1: size === ContainerSize.S1,
    s2: size === ContainerSize.S2,
    s3: size === ContainerSize.S3,
    s4: size === ContainerSize.S4,
    s5: size === ContainerSize.S5,
    s6: size === ContainerSize.S6,
  });
  return <div className={c}>{children}</div>;
};
