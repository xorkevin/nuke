import {createContext, useCallback, useContext} from 'react';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

const valueEnabled = 'enabled';
const valueDisabled = 'disabled';
const darkClassName = 'dark';

const storeDarkMode = (key, dark) => {
  localStorage.setItem(key, dark);
};

const retrieveDarkMode = (key) => {
  return localStorage.getItem(key);
};

const checkDarkMode = (key) => {
  return retrieveDarkMode(key) === valueEnabled;
};

const setBodyDarkMode = (key, dark) => {
  if (dark) {
    storeDarkMode(key, valueEnabled);
    document.body.classList.add(darkClassName);
  } else {
    storeDarkMode(key, valueDisabled);
    document.body.classList.remove(darkClassName);
  }
};

const DarkModeDefaultOpts = Object.freeze({
  storageKey: 'dark_mode',
});

const DarkModeCtx = createContext(DarkModeDefaultOpts);

const defaultDarkMode = Object.freeze({
  dark: false,
});

const DarkModeState = atom({
  key: 'nuke:dark_mode',
  default: defaultDarkMode,
});

const makeInitDarkModeState = ({storageKey}) => ({set}) => {
  const state = Object.assign({}, defaultDarkMode);
  if (checkDarkMode(storageKey)) {
    state.dark = true;
  }
  setBodyDarkMode(storageKey, state.dark);
  return set(DarkModeState, state);
};

const DarkModeMiddleware = (value) => {
  const v = Object.assign({}, DarkModeDefaultOpts, value);
  return {
    ctxProvider: ({children}) => (
      <DarkModeCtx.Provider value={v}>{children}</DarkModeCtx.Provider>
    ),
    initState: makeInitDarkModeState(v),
  };
};

// Hooks

const useDarkModeValue = () => {
  return useRecoilValue(DarkModeState).dark;
};

const useSetDarkMode = () => {
  const ctx = useContext(DarkModeCtx);
  const setDarkMode = useSetRecoilState(DarkModeState);

  const toggle = useCallback(
    (next) => {
      setDarkMode(({dark}) => {
        dark = !dark;
        if (typeof next === 'boolean') {
          dark = next;
        }
        setBodyDarkMode(ctx.storageKey, dark);
        return {
          dark,
        };
      });
    },
    [ctx, setDarkMode],
  );

  return toggle;
};

export {
  DarkModeDefaultOpts,
  DarkModeCtx,
  DarkModeState,
  DarkModeMiddleware,
  useDarkModeValue,
  useSetDarkMode,
};
