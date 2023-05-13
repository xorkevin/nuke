import {HelloWorld} from '@xorkevin/nuke/hello';
import Button from '@xorkevin/nuke/component/button';

const App = () => {
  return (
    <h1>
      <Button>{HelloWorld}</Button>
    </h1>
  );
};

export default App;
