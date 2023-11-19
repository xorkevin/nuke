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

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant | undefined;
};

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(({variant = ButtonVariant.Default, className, children, ...props}, ref) => {
  const c = classNames(modClassNames(styles, 'button', variant), className);
  return (
    <button ref={ref} {...props} className={c}>
      {children}
    </button>
  );
});
