import 'fork-awesome/css/fork-awesome.min.css';
import 'main.scss';

import React, {Fragment, useCallback} from 'react';
import {Provider} from 'react-redux';

import store from 'example/store';
import {useDarkMode} from 'component/darkmode';
import MainContent from 'component/maincontent';
import Section from 'component/section';
import {Input} from 'component/form';
import FaIcon from 'component/faicon';
import Anchor from 'component/anchor';

const Main = ({children}) => {
  return (
    <Provider store={store}>
      <App>{children}</App>
    </Provider>
  );
};

const App = ({children}) => {
  const [dark, toggleDark] = useDarkMode();
  const toggleMode = useCallback(
    (_name, value) => {
      toggleDark(value);
    },
    [toggleDark],
  );

  return (
    <div>
      <MainContent>
        <Section container padded>
          {children}
        </Section>
      </MainContent>
      <Input
        toggle
        type="checkbox"
        onChange={toggleDark}
        value={dark}
        label={dark ? 'Dark' : 'Light'}
      />
      <Anchor ext href="https://github.com/xorkevin">
        <FaIcon icon="github" /> xorkevin
      </Anchor>
    </div>
  );
};

export const contexts = [
  {
    icon: 'box',
    title: 'Themes',
    components: [Main],
    params: [{name: 'Theme', props: {}, default: true}],
    options: {
      deep: true,
      disable: false,
      cancelable: false,
    },
  },
];
