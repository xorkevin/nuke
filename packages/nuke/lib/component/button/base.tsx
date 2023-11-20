import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export enum ButtonVariant {
  Default = 'default',
  Accent = 'accent',
}

export enum ButtonRank {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant | undefined;
  rank?: ButtonRank | undefined;
};

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      variant = ButtonVariant.Default,
      rank = ButtonRank.Tertiary,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const c = classNames(
      modClassNames(styles, 'button', variant, rank),
      className,
    );
    return (
      <button ref={ref} {...props} className={c}>
        {children}
      </button>
    );
  },
);
