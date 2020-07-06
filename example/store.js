import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import DarkMode from 'component/darkmode';
import Snackbar from 'component/snackbar';

const store = createStore(
  combineReducers({
    DarkMode,
    Snackbar,
  }),
  applyMiddleware(thunk),
);

export default store;
