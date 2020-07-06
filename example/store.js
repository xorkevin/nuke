import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import DarkMode from 'src/component/darkmode';
import Snackbar from 'src/component/snackbar';

const store = createStore(
  combineReducers({
    DarkMode,
    Snackbar,
  }),
  applyMiddleware(thunk),
);

export default store;
