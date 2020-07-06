import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
  Snackbar,
  SnackbarContainer,
  useSnackbarView,
  SnackbarSurface,
} from 'src/component/snackbar';
import Button from 'src/component/button';

export default {title: 'Snackbar'};

const store = createStore(
  combineReducers({
    Snackbar,
  }),
  applyMiddleware(thunk),
);

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
