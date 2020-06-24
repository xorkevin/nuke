import React from 'react';
import Container from '../container';

const cardSizeSet = new Set(['sm', 'md', 'lg']);

const Card = ({center, width, height, title, bar, children}) => {
  const k = ['card'];
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
      {bar && (
        <div className="bar">
          <Container padded>{bar}</Container>
        </div>
      )}
    </div>
  );
};

export default Card;
