import React, {useState, useRef} from 'react';
import Popover from 'component/popover';

export default {title: 'Popover'};

export const plain = () => {
  const anchor = useRef(null);
  return (
    <div ref={anchor} style={{border: '1px solid red'}}>
      Anchor
      <Popover anchor={anchor}>
        <div style={{padding: '16px'}}>Hello, world!</div>
      </Popover>
    </div>
  );
};
