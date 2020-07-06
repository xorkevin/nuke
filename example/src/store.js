import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import DarkMode from '@xorkevin/nuke/src/component/darkmode';
import Snackbar from '@xorkevin/nuke/src/component/snackbar';

const store = createStore(
  combineReducers({
    DarkMode,
    Snackbar,
  }),
  applyMiddleware(thunk),
);

export default store;
