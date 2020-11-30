import {createContext, useCallback, useRef, useContext} from 'react';
import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

// Constants

const defaultTimeDisplay = 4000;
const defaultTimeAnimate = 250;

const SnackbarDefaultOpts = Object.freeze({
  timer: null,
});

const SnackbarCtx = createContext(Object.assign({}, SnackbarDefaultOpts));

const defaultState = Object.freeze({
  show: false,
  view: null,
});

const SnackbarState = atom({
  key: 'nuke:snackbar_state',
  default: defaultState,
});

const SnackbarMiddleware = (value) => {
  const v = Object.assign({}, SnackbarDefaultOpts, value);
  return {
    ctxProvider: ({children}) => (
      <SnackbarCtx.Provider value={v}>{children}</SnackbarCtx.Provider>
    ),
  };
};

// Hooks

const useSnackbarValue = () => {
  return useRecoilValue(SnackbarState);
};

const useSnackbar = () => {
  const ctx = useContext(SnackbarCtx);
  const setSnackbar = useSetRecoilState(SnackbarState);

  const snack = useCallback(
    async (fragment, delay = defaultTimeDisplay) => {
      if (delay < defaultTimeAnimate) {
        delay = defaultTimeAnimate;
      }

      if (ctx.timer) {
        window.clearTimeout(ctx.timer);
        ctx.timer = null;
      }

      const display = () => {
        ctx.timer = window.setTimeout(() => {
          ctx.timer = null;
          setSnackbar(({view}) => ({show: false, view}));
        }, delay);
        return {
          show: true,
          view: fragment,
        };
      };

      setSnackbar(({show, view}) => {
        if (show) {
          ctx.timer = window.setTimeout(() => {
            ctx.timer = null;
            setSnackbar(display());
          }, defaultTimeAnimate);
          return {
            show: false,
            view,
          };
        }
        return display();
      });
    },
    [ctx, setSnackbar],
  );

  return snack;
};

const useSnackbarView = (view, delay) => {
  const snack = useSnackbar();
  const viewRef = useRef(view);
  viewRef.current = view;

  const display = useCallback(() => {
    snack(viewRef.current, delay);
  }, [snack, viewRef, delay]);

  return display;
};

// Slot

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

const SnackbarContainer = () => {
  const {show, view} = useSnackbarValue();
  return <SnackbarComponent show={show}>{view}</SnackbarComponent>;
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
  SnackbarContainer as default,
  SnackbarDefaultOpts,
  SnackbarCtx,
  SnackbarState,
  SnackbarMiddleware,
  useSnackbarValue,
  useSnackbar,
  useSnackbarView,
  SnackbarContainer,
  SnackbarSurface,
};
