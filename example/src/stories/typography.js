import React, {Fragment} from 'react';

import {Story} from 'docs';

const Stories = () => (
  <Fragment>
    <Story>
      <h1>
        Heading 1 <small>small</small>
      </h1>
      <h2>
        Heading 2 <small>small</small>
      </h2>
      <h3>
        Heading 3 <small>small</small>
      </h3>
      <h4>
        Heading 4 <small>small</small>
      </h4>
      <h5>
        Heading 5 <small>small</small>
      </h5>
      <h6>
        Heading 6 <small>small</small>
      </h6>
      <div>
        Text <small>small</small>
      </div>
      <div>
        <code>Code: Hello, World</code>
      </div>
    </Story>
  </Fragment>
);

export default Stories;
