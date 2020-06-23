import React from 'react';

const Description = ({className, label, item}) => {
  return (
    <dl className={className}>
      <dt>{label}</dt>
      <dd>{item}</dd>
    </dl>
  );
};

export default Description;
