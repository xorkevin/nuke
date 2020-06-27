import React from 'react';

const Chip = ({className, onClick, children}) => {
  const k = ['chip'];
  if (className) {
    k.push(className);
  }

  return (
    <span className={k.join(' ')} onClick={onClick}>
      {children}
    </span>
  );
};

export default Chip;
