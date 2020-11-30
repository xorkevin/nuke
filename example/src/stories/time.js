import {Fragment} from 'react';

import {Story} from 'docs';

import Time from '@xorkevin/nuke/src/component/time';

const Stories = () => (
  <Fragment>
    <p>
      <code>Time</code> is used to display time in a human readable format.
    </p>
    <Story>
      <Time value={Date.now() - 86400000} />;
    </Story>
  </Fragment>
);

export default Stories;
