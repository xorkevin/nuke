import {Fragment} from 'react';

import {Story} from 'docs';

import {Modal, useModal} from '@xorkevin/nuke/src/component/modal';
import Button from '@xorkevin/nuke/src/component/button';

export const Plain = () => {
  const modal = useModal();
  return (
    <Fragment>
      <Button forwardedRef={modal.anchorRef} onClick={modal.toggle}>
        Anchor
      </Button>
      {modal.show && (
        <Modal anchor={modal.anchor} close={modal.close}>
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Modal>
      )}
    </Fragment>
  );
};

export const TopRight = () => {
  const modal = useModal();
  return (
    <Fragment>
      <Button forwardedRef={modal.anchorRef} onClick={modal.toggle}>
        Anchor
      </Button>
      {modal.show && (
        <Modal
          alignx="end"
          aligny="start"
          anchor={modal.anchor}
          close={modal.close}
        >
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Modal>
      )}
    </Fragment>
  );
};

export const BottomLeft = () => {
  const modal = useModal();
  return (
    <Fragment>
      <Button forwardedRef={modal.anchorRef} onClick={modal.toggle}>
        Anchor
      </Button>
      {modal.show && (
        <Modal
          alignx="start"
          aligny="end"
          anchor={modal.anchor}
          close={modal.close}
        >
          <div style={{padding: '16px'}}>Hello, world!</div>
        </Modal>
      )}
    </Fragment>
  );
};

const Stories = () => (
  <Fragment>
    <p>
      <code>Modal</code> is used to create modals. The <code>alignx</code> and{' '}
      <code>aligny</code> props may be used to position it in the{' '}
      <code>center</code>, <code>start</code>, or <code>end</code> of the
      screen.
    </p>
    <Story>
      <Plain />
      <TopRight />
      <BottomLeft />
    </Story>
  </Fragment>
);

export default Stories;
