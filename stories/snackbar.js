import React from 'react';
import {RecoilRoot} from 'recoil';
import {
  SnackbarCtx,
  SnackbarContainer,
  useSnackbarView,
  SnackbarSurface,
} from 'src/component/snackbar';
import Button from 'src/component/button';

export default {title: 'Snackbar'};

const PlainInner = () => {
  const snackbar = useSnackbarView(
    <SnackbarSurface>
      <span>Hello, World</span> <Button>Reply</Button>
    </SnackbarSurface>,
  );

  return (
    <div>
      <Button fixedWidth primary onClick={snackbar}>
        Snack
      </Button>
      <SnackbarContainer />
    </div>
  );
};

const snacktimer = {timer: null};

export const plain = () => (
  <RecoilRoot>
    <SnackbarCtx.Provider value={snacktimer}>
      <PlainInner />
    </SnackbarCtx.Provider>
  </RecoilRoot>
);
