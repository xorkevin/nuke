import {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  forwardRef,
} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export enum ButtonVariant {
  Default = 'default',
  Primary = 'primary',
  Subtle = 'subtle',
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant | undefined;
  paddedSmall?: boolean | undefined;
};

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      variant = ButtonVariant.Default,
      paddedSmall,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const c = classNames(
      modClassNames(styles, 'button', variant, {
        'padded-small': paddedSmall,
      }),
      className,
    );
    return (
      <button ref={ref} {...props} className={c}>
        {children}
      </button>
    );
  },
);

export type ButtonGroupProps = ButtonHTMLAttributes<HTMLDivElement> & {
  gap?: boolean | undefined;
};

export const ButtonGroup = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ButtonGroupProps>
>(({gap, className, children, ...props}, ref) => {
  const c = classNames(
    modClassNames(styles, 'button-group', {
      gap,
    }),
    className,
  );
  return (
    <div ref={ref} {...props} className={c}>
      {children}
    </div>
  );
});
