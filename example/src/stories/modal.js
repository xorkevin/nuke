import {Fragment} from 'react';

import {Story} from 'docs';

import {ModalSurface, useModal} from '@xorkevin/nuke/src/component/modal';
import Button from '@xorkevin/nuke/src/component/button';
import Section from '@xorkevin/nuke/src/component/section';

export const Plain = () => {
  const modal = useModal();
  return (
    <Fragment>
      <Button forwardedRef={modal.anchorRef} onClick={modal.toggle}>
        Anchor
      </Button>
      {modal.show && (
        <ModalSurface size="lg" anchor={modal.anchor} close={modal.close}>
          <Section id="section1">
            <h1>Section Title</h1>
            <hr />
            <p style={{height: '256px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </p>
          </Section>
          <Section id="section2">
            <h1>Section Title</h1>
            <hr />
            <p style={{height: '256px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </p>
          </Section>
          <Section id="section3">
            <h1>Section Title</h1>
            <hr />
            <p style={{height: '256px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </p>
          </Section>
          <Section id="section4">
            <h1>Section Title</h1>
            <hr />
            <p style={{height: '256px'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              fringilla aliquet condimentum. Nunc facilisis orci dui, sit amet
              dictum massa porta at. Mauris augue nisi, scelerisque ac suscipit
              sit amet, egestas ut risus. In hac habitasse platea dictumst.
              Vivamus nibh enim, dignissim quis consequat at, sagittis in magna.
            </p>
          </Section>
        </ModalSurface>
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
        <ModalSurface
          size="md"
          alignx="end"
          aligny="start"
          anchor={modal.anchor}
          close={modal.close}
        >
          {' '}
          Hello, world!
        </ModalSurface>
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
        <ModalSurface
          size="sm"
          alignx="start"
          aligny="end"
          anchor={modal.anchor}
          close={modal.close}
        >
          Hello, world!
        </ModalSurface>
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
