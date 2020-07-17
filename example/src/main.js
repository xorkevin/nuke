import 'fork-awesome/css/fork-awesome.min.css';
import 'inter-ui/inter.css';
import 'typeface-merriweather/index.css';
import '@xorkevin/nuke/main.scss';
import 'main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {
  DarkModeCtx,
  DarkModeDefaultOpts,
  makeInitDarkModeState,
  SnackbarCtx,
  SnackbarDefaultOpts,
} from '@xorkevin/nuke';

import App from 'app';

const darkmodectx = Object.assign({}, DarkModeDefaultOpts);
const snackbarctx = Object.assign({}, SnackbarDefaultOpts);

const initDarkModeState = makeInitDarkModeState(darkmodectx);

const init = (snap) => {
  initDarkModeState(snap);
};

ReactDOM.render(
  <RecoilRoot initializeState={init}>
    <DarkModeCtx.Provider value={darkmodectx}>
      <SnackbarCtx.Provider value={snackbarctx}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarCtx.Provider>
    </DarkModeCtx.Provider>
  </RecoilRoot>,
  document.getElementById('mount'),
);
