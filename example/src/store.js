import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {DarkMode, Snackbar} from '@xorkevin/nuke';

const store = createStore(
  combineReducers({
    DarkMode,
    Snackbar,
  }),
  applyMiddleware(thunk),
);

export default store;
