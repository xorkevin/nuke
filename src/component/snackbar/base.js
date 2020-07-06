import React, {useCallback, useRef} from 'react';
import {useSelector, useDispatch, useStore} from 'react-redux';

const SnackbarComponent = ({show, children}) => {
  const k = ['snackbar-container'];
  if (!show) {
    k.push('hidden');
  }
  return (
    <div className={k.join(' ')}>
      <div className="snackbar-inner">{children}</div>
    </div>
  );
};

// Constants

const TIME_DISPLAY = 4000;
const TIME_ANIMATE = 250;

// Actions

const SNACKBAR_SHOW = Symbol('SNACKBAR_SHOW');
const SnackbarShow = (fragment, timer) => ({
  type: SNACKBAR_SHOW,
  fragment,
  timer,
});

const SNACKBAR_HIDE = Symbol('SNACKBAR_HIDE');
const SnackbarHide = (timer) => ({
  type: SNACKBAR_HIDE,
  timer,
});

// Reducer

const defaultState = Object.freeze({
  show: false,
  fragment: null,
  timer: null,
});

const initState = () => {
  return Object.assign({}, defaultState);
};

const Snackbar = (state = initState(), action) => {
  switch (action.type) {
    case SNACKBAR_SHOW:
      return Object.assign({}, state, {
        show: true,
        fragment: action.fragment,
        timer: action.timer,
      });
    case SNACKBAR_HIDE:
      return Object.assign({}, state, {
        show: false,
        timer: action.timer,
      });
    default:
      return state;
  }
};

// Hooks

const selectReducerSnackbar = (store) => store.Snackbar;

const useSnackbarState = () => useSelector(selectReducerSnackbar);

const useSnackbar = () => {
  const dispatch = useDispatch();
  const store = useStore();

  const snackbar = useCallback(
    async (fragment, delay = TIME_DISPLAY) => {
      const {show, timer} = selectReducerSnackbar(store.getState());
      if (timer) {
        window.clearTimeout(timer);
      }

      const display = () => {
        const nextTimer = window.setTimeout(() => {
          dispatch(SnackbarHide(null));
        }, delay);
        dispatch(SnackbarShow(fragment, nextTimer));
      };

      if (show) {
        const nextTimer = window.setTimeout(display, TIME_ANIMATE);
        dispatch(SnackbarHide(nextTimer));
      } else {
        display();
      }
    },
    [dispatch, store],
  );

  return snackbar;
};

const useSnackbarView = (view, delay) => {
  const snackbar = useSnackbar();
  const viewRef = useRef(view);
  viewRef.current = view;

  const display = useCallback(() => {
    snackbar(viewRef.current, delay);
  }, [snackbar, viewRef, delay]);

  return display;
};

// Slot

const SnackbarContainer = () => {
  const {show, fragment} = useSnackbarState();
  return <SnackbarComponent show={show}>{fragment}</SnackbarComponent>;
};

// Style

const SnackbarSurface = ({className, children}) => {
  const k = ['snackbar-surface dark'];
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}>{children}</div>;
};

export {
  Snackbar as default,
  Snackbar,
  useSnackbar,
  useSnackbarView,
  SnackbarContainer,
  SnackbarSurface,
};
