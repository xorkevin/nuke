import React, {Fragment, useState, useCallback, useRef} from 'react';
import {Popover, useStateRef} from 'component/popover';
import Button from 'component/button';

export default {title: 'Popover'};

export const plain = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);
  return (
    <Fragment>
      <Button forwardedRef={anchorRef} onClick={handleClick}>
        Anchor
      </Button>
      {show && (
        <Popover anchor={anchor} close={handleClose}>
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Popover>
      )}
    </Fragment>
  );
};

export const top = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);
  return (
    <Fragment>
      <Button forwardedRef={anchorRef} onClick={handleClick}>
        Anchor
      </Button>
      {show && (
        <Popover position="top" anchor={anchor} close={handleClose}>
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Popover>
      )}
    </Fragment>
  );
};

export const left = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);
  return (
    <Fragment>
      <Button forwardedRef={anchorRef} onClick={handleClick}>
        Anchor
      </Button>
      {show && (
        <Popover position="left" anchor={anchor} close={handleClose}>
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Popover>
      )}
    </Fragment>
  );
};

export const right = () => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const handleClick = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);
  return (
    <Fragment>
      <Button forwardedRef={anchorRef} onClick={handleClick}>
        Anchor
      </Button>
      {show && (
        <Popover position="right" anchor={anchor} close={handleClose}>
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Popover>
      )}
    </Fragment>
  );
};
