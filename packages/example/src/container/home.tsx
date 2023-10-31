import type {FC} from 'react';

import {Container} from '@xorkevin/nuke/component/container';
import {TextClasses} from '@xorkevin/nuke/component/text';

const Home: FC = () => {
  return (
    <Container size="large" padded>
      <hgroup>
        <h1
          className={TextClasses.Display}
          style={{'--nuke-text-display-size': '5rem'}}
        >
          Nuke
        </h1>
        <p className={TextClasses.Subtitle}>a reactive frontend toolkit</p>
      </hgroup>
    </Container>
  );
};

export default Home;
