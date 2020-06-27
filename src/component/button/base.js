import React from 'react';

const Button = ({
  className,
  fullWidth,
  fixedWidth,
  label,
  onClick,
  children,
  forwardedRef,
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
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
};

export default Button;
