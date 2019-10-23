import React, {useCallback} from 'react';
import Button from 'component/button';
import {useDarkMode} from 'component/darkmode';

export default {title: 'DarkMode'};

const DarkModeButtons = () => {
  const [_dark, toggleDark] = useDarkMode();
  const setDark = useCallback(() => {
    toggleDark(true);
  }, [toggleDark]);
  const setLight = useCallback(() => {
    toggleDark(false);
  }, [toggleDark]);
  return (
    <div>
      <Button onClick={toggleDark}>toggle dark</Button>
      <Button onClick={setDark}>set dark</Button>
      <Button onClick={setLight}>set light</Button>
    </div>
  );
};

export const plain = () => <DarkModeButtons />;
