import React, {Fragment, useState, useCallback, useRef} from 'react';
import Popover from 'component/popover';
import Button from 'component/button';

export default {title: 'Popover'};

export const plain = () => {
  const anchor = useRef(null);
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);
  return (
    <Fragment>
      <Button forwardedRef={anchor} onClick={handleClick}>
        Anchor
      </Button>
      {show && (
        <Fragment>
          <Popover anchor={anchor} close={handleClose}>
            <div style={{padding: '16px'}}>Hello, world!</div>
          </Popover>
          <Popover position="top" anchor={anchor}>
            <div style={{padding: '16px'}}>Hello, world!</div>
          </Popover>
          <Popover position="left" anchor={anchor}>
            <div style={{padding: '16px'}}>Hello, world!</div>
          </Popover>
          <Popover position="right" anchor={anchor}>
            <div style={{padding: '16px'}}>Hello, world!</div>
          </Popover>
        </Fragment>
      )}
    </Fragment>
  );
};
