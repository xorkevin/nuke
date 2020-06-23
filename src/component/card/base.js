import React from 'react';
import Container from '../container';

const cardSizeSet = new Set(['sm', 'md', 'lg']);

const Card = ({center, width, height, title, children, bar}) => {
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
        <Container className="bar" padded>
          {bar}
        </Container>
      )}
    </div>
  );
};

export default Card;
