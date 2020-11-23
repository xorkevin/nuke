import React, {Fragment} from 'react';

import {Story} from 'docs';

import Description from '@xorkevin/nuke/src/component/description';

const Stories = () => (
  <Fragment>
    <p>
      <code>Description</code> is a definition list pair.
    </p>
    <Story>
      <Description label="label" item="value" />
      <Description label="another label" item="some value" />
      <Description label="name" item="Kevin Wang" />
      <Description label="project" item="Nuke" />
    </Story>
  </Fragment>
);

export default Stories;
