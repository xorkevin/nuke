import React from 'react';

const Chip = ({className, children}) => {
  const k = ['chip'];
  if (className) {
    k.push(className);
  }

  return <span className={k.join(' ')}>{children}</span>;
};

export default Chip;
