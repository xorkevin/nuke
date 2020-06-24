import React from 'react';
import Base from './base';

const Anchor = (props) => {
  const j = ['secondary'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
  });
  return <Base {...k} />;
};

export default Anchor;
