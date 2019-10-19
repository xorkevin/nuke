import 'fork-awesome/css/fork-awesome.min.css';
import 'main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from 'example/app';
import store from 'example/store';

ReactDOM.render(
  <div id="mount">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById('mount'),
);
