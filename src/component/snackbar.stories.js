import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import store from 'example/store';
import {SnackbarContainer, useSnackbarView} from 'component/snackbar';
import Button from 'component/button';

export default {title: 'Snackbar'};

const PlainInner = () => {
  const displaySnackbar = useSnackbarView(
    <Fragment>
      <span>Hello, World</span>
      <Button>Reply</Button>
    </Fragment>,
  );

  return (
    <div>
      <Button fixedWidth primary onClick={displaySnackbar}>
        Snack
      </Button>
      <SnackbarContainer />
    </div>
  );
};

export const plain = () => (
  <Provider store={store}>
    <PlainInner />
  </Provider>
);
