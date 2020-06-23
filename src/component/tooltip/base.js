import React from 'react';

const positionSet = new Set(['left', 'right', 'top', 'bottom']);
const positionDefault = 'top';

const Tooltip = ({className, position, tooltip, children}) => {
  const j = ['tooltip'];
  if (className) {
    j.push(className);
  }

  const k = ['text'];
  if (positionSet.has(position)) {
    k.push(position);
  } else {
    k.push(positionDefault);
  }

  return (
    <span className={j.join(' ')}>
      {children}
      <span className={k.join(' ')}>{tooltip}</span>
    </span>
  );
};

export default Tooltip;
