import React, {Fragment} from 'react';

import {Story} from 'docs';

import {
  useSnackbarView,
  SnackbarSurface,
} from '@xorkevin/nuke/src/component/snackbar';
import Button from '@xorkevin/nuke/src/component/button';

const Stories = () => {
  const snackbar = useSnackbarView(
    <SnackbarSurface>
      <span>Hello, World</span> <Button>Reply</Button>
    </SnackbarSurface>,
  );

  return (
    <Fragment>
      <p>
        <code>useSnackbarView</code> is used to create a snackbar.
      </p>
      <Story>
        <Button fixedWidth primary onClick={snackbar}>
          Snack
        </Button>
      </Story>
    </Fragment>
  );
};

export default Stories;
