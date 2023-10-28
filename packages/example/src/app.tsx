import {type FC} from 'react';

import Button from '@xorkevin/nuke/component/button';
import {HelloWorld} from '@xorkevin/nuke/hello';

const App: FC = () => {
  return (
    <h1>
      <Button>{HelloWorld}</Button>
    </h1>
  );
};

export default App;
