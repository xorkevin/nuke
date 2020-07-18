import React, {Fragment, useState, useCallback} from 'react';
import {Popover, useStateRef} from 'src/component/popover';
import Button from 'src/component/button';

export default {title: 'Popover'};

export const Plain = () => {
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

export const Top = () => {
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

export const Left = () => {
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

export const Right = () => {
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
