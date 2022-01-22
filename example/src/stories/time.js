import {Fragment} from 'react';

import {Story} from 'docs';

import Time from '@xorkevin/nuke/src/component/time';

const Stories = () => (
  <Fragment>
    <p>
      <code>Time</code> is used to display time in a human readable format.
    </p>
    <Story>
      <Time value={Date.now() - 86400000} />
    </Story>
    <p>After a duration, the time can be set to an absolute format.</p>
    <Story>
      <Time value={Date.now() - 86400000} relDuration={0} />
    </Story>
    <p>The update interval may be changed.</p>
    <Story>
      <Time value={Date.now()} updateInterval={1000} />
    </Story>
    <p>
      The tooltip may be positioned the same as <code>Tooltip</code>.
    </p>
    <Story>
      <Time position="right" value={Date.now() - 86400000} />
    </Story>
  </Fragment>
);

export default Stories;
