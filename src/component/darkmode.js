import {useCallback} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';

// Actions

const darkModeKeyName = 'dark_mode';
const darkModeValueEnabled = 'enabled';
const darkModeValueDisabled = 'disabled';

const storeDarkMode = (dark) => {
  localStorage.setItem(darkModeKeyName, dark);
};

const retrieveDarkMode = () => {
  return localStorage.getItem(darkModeKeyName);
};

const SET_DARK_MODE = Symbol('SET_DARK_MODE');

const darkModeClassName = 'dark';

const setDarkMode = (dark) => {
  if (dark) {
    storeDarkMode(darkModeValueEnabled);
    document.body.classList.add(darkModeClassName);
  } else {
    storeDarkMode(darkModeValueDisabled);
    document.body.classList.remove(darkModeClassName);
  }
};

const checkDarkMode = () => {
  return retrieveDarkMode() === darkModeValueEnabled;
};

// Reducer

const defaultState = {
  dark: false,
};

const initState = () => {
  const k = {};
  if (checkDarkMode()) {
    k.dark = true;
  }
  const state = Object.assign({}, defaultState, k);
  setDarkMode(state.dark);
  return state;
};

const DarkMode = (state = initState(), action) => {
  switch (action.type) {
    case SET_DARK_MODE:
      return Object.assign({}, state, {
        dark: action.dark,
      });
    default:
      return state;
  }
};

// Hooks

const selectDarkState = (store) => store.DarkMode.dark;

const useDarkMode = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const toggle = useCallback(
    (next) => {
      let dark = !store.getState().DarkMode.dark;
      if (typeof next === 'boolean') {
        dark = next;
      }
      setDarkMode(dark);
      dispatch({
        type: SET_DARK_MODE,
        dark,
      });
    },
    [dispatch, store],
  );

  return [useSelector(selectDarkState), toggle];
};

export {DarkMode as default, DarkMode, useDarkMode};
