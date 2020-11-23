import React, {Fragment} from 'react';

import {Story} from 'docs';

import Container from '@xorkevin/nuke/src/component/container';

export const text = (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla
    aliquet condimentum. Nunc facilisis orci dui, sit amet dictum massa porta
    at. Mauris augue nisi, scelerisque ac suscipit sit amet, egestas ut risus.
    In hac habitasse platea dictumst. Vivamus nibh enim, dignissim quis
    consequat at, sagittis in magna.
  </p>
);

const Stories = () => (
  <Fragment>
    <p>
      <code>Container</code> is used to constrain its contents to a maximum
      width. The red borders below show the width of the <code>Container</code>{' '}
      parent.
    </p>
    <Story>
      <div style={{border: '1px solid red'}}>
        <Container>{text}</Container>
      </div>
    </Story>
    <p>
      Using the <code>fill</code> prop expands the container to take up all the
      space of its parent.
    </p>
    <Story>
      <div style={{height: '256px'}}>
        <Container fill>{text}</Container>
      </div>
    </Story>
    <p>
      The <code>Container</code> may be padded with the <code>padded</code>{' '}
      prop.
    </p>
    <Story>
      <div style={{border: '1px solid red'}}>
        <Container padded>{text}</Container>
      </div>
    </Story>
    <p>
      The width of the <code>Container</code> may be restricted further with the{' '}
      <code>narrow</code> prop.
    </p>
    <Story>
      <div style={{border: '1px solid red'}}>
        <Container narrow>{text}</Container>
      </div>
    </Story>
  </Fragment>
);

export default Stories;
