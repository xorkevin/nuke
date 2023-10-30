import {type FC, type PropsWithChildren} from 'react';

import styles from './styles.module.css';

export type ContainerProps = {
  size?: 'small' | 'medium' | 'large';
};

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
  size = 'medium',
  children,
}) => {
  return (
    <div className={`${styles['container']} ${styles[size]}`}>{children}</div>
  );
};
