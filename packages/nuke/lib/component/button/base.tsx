import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({className, children, ...props}, ref) => {
    const c = classNames(modClassNames(styles, 'button'), className);
    return (
      <button ref={ref} {...props} className={c}>
        {children}
      </button>
    );
  },
);
