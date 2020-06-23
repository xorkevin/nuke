import React from 'react';

const cardSizeSet = new Set(['sm', 'md', 'lg']);

const Card = ({padded, center, width, height, title, children, bar}) => {
  const k = ['card'];
  if (padded) {
    k.push('padded');
  }
  if (center) {
    k.push('center');
  }
  if (cardSizeSet.has(width)) {
    k.push('width-' + width);
  }
  if (cardSizeSet.has(height)) {
    k.push('height-' + height);
  }

  return (
    <div className={k.join(' ')}>
      {title && <div className="title">{title}</div>}
      <div className="body">{children}</div>
      {bar && <div className="bar">{bar}</div>}
    </div>
  );
};

export default Card;
