import type {MouseEventHandler, Ref, ReactNode} from 'react';
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

const Button: React.FC<Props> = ({
  id,
  className,
  fullWidth,
  fixedWidth,
  disabled,
  label,
  onClick,
  forwardedRef,
  children,
}) => {
  const j = [styles['button']];
  if (fullWidth) {
    j.push('full-width');
  }
  if (fixedWidth) {
    j.push('fixed-width');
  }
  if (className) {
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

export default Button;
