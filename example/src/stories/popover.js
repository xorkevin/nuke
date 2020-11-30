import {Fragment, useState, useCallback} from 'react';

import {Story} from 'docs';

import {Popover, useStateRef} from '@xorkevin/nuke/src/component/popover';
import Button from '@xorkevin/nuke/src/component/button';

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

const Stories = () => (
  <Fragment>
    <p>
      <code>Popover</code> is used to create popovers. The <code>position</code>{' '}
      prop may be used to position it on the <code>bottom</code>,{' '}
      <code>top</code>, <code>left</code>, or <code>right</code> of the anchor.
    </p>
    <Story>
      <Plain />
      <Top />
      <Left />
      <Right />
    </Story>
  </Fragment>
);

export default Stories;
