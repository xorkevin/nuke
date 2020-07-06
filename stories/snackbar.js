import React from 'react';
import {Provider} from 'react-redux';
import store from 'example/store';
import {
  SnackbarContainer,
  useSnackbarView,
  SnackbarSurface,
} from 'component/snackbar';
import Button from 'component/button';

export default {title: 'Snackbar'};

const PlainInner = () => {
  const snackbar = useSnackbarView(
    <SnackbarSurface>
      <span>Hello, World</span> <Button>Reply</Button>
    </SnackbarSurface>,
  );

  return (
    <div>
      <Button fixedWidth primary onClick={snackbar}>
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
