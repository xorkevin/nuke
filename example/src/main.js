import 'fork-awesome/css/fork-awesome.min.css';
import 'inter-ui/inter.css';
import 'typeface-merriweather/index.css';
import 'main.scss';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import {
  ComposeMiddleware,
  DarkModeMiddleware,
  SnackbarMiddleware,
} from '@xorkevin/nuke';

import App from 'app';

const Middleware = ComposeMiddleware(
  DarkModeMiddleware(),
  SnackbarMiddleware(),
);

ReactDOM.render(
  <RecoilRoot initializeState={Middleware.initState}>
    <Middleware.ctxProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Middleware.ctxProvider>
  </RecoilRoot>,
  document.getElementById('mount'),
);
