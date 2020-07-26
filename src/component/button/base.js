import React from 'react';

const Button = ({
  className,
  fullWidth,
  fixedWidth,
  disabled,
  label,
  onClick,
  forwardedRef,
  children,
}) => {
  const j = [];
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
      className={j.join(' ')}
      disabled={disabled}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
};

const ButtonGroup = ({className, children}) => {
  const j = ['button-group'];
  if (className) {
    j.push(className);
  }
  return <div className={j.join(' ')}>{children}</div>;
};

export {Button as default, Button, ButtonGroup};
