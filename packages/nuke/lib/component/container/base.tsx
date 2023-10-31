import type {FC, PropsWithChildren} from 'react';

import {modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export type ContainerProps = {
  size?: 'large' | 'medium' | 'small';
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
    small: size === 'small',
    medium: size === 'medium',
    large: size === 'large',
  });
  return <div className={c}>{children}</div>;
};
