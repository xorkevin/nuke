import {type FC, type PropsWithChildren} from 'react';

import styles from './styles.module.css';

export type ContainerProps = {
  size?: 'small' | 'medium' | 'large';
  padded?: boolean;
};

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  size,
  padded,
  children,
}) => {
  const cn = `${styles['container']} ${padded ? styles['padded'] : ''} ${
    size ? styles[size] : ''
  }`;
  return <div className={cn}>{children}</div>;
};
