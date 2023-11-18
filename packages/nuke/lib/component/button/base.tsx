import type {JSX, MouseEventHandler, ReactNode, Ref} from 'react';

import styles from './styles.module.css';

export type Props = {
  id?: string;
  className?: string;
  fullWidth?: boolean;
  fixedWidth?: boolean;
  disabled?: boolean;
  label?: string;
  onClick?: MouseEventHandler;
  forwardedRef?: Ref<HTMLButtonElement>;
  children?: ReactNode;
};

export const Button = ({
  id,
  className,
  fullWidth,
  fixedWidth,
  disabled,
  label,
  onClick,
  forwardedRef,
  children,
}: Props): JSX.Element => {
  const j = [styles['button']];
  if (fullWidth ?? false) {
    j.push('full-width');
  }
  if (fixedWidth ?? false) {
    j.push('fixed-width');
  }
  if (className !== undefined) {
    j.push(className);
  }
  return (
    <button
      ref={forwardedRef}
      id={id}
      className={j.join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
};
