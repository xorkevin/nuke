import {Fragment} from 'react';

import {Story} from 'docs';

import Tooltip from '@xorkevin/nuke/src/component/tooltip';

const Stories = () => (
  <Fragment>
    <p>
      <code>Tooltip</code> is used to display auxiliary related information on
      hover.
    </p>
    <Story>
      <Tooltip tooltip="some hover text">Hover over me</Tooltip>
    </Story>
    <p>
      <code>Tooltip</code>s may be shown on any of the four sides of an element
      using the <code>position</code> prop.
    </p>
    <Story>
      <div>
        <Tooltip position="top" tooltip="some hover text">
          Hover over me
        </Tooltip>
      </div>
      <div>
        <Tooltip position="left" tooltip="some hover text">
          Hover over me
        </Tooltip>
      </div>
      <div>
        <Tooltip position="right" tooltip="some hover text">
          Hover over me
        </Tooltip>
      </div>
      <div>
        <Tooltip position="bottom" tooltip="some hover text">
          Hover over me
        </Tooltip>
      </div>
    </Story>
  </Fragment>
);

export default Stories;
