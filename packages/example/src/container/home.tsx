import type {FC} from 'react';

import {Container, ContainerSize} from '@xorkevin/nuke/component/container';
import {TextClasses} from '@xorkevin/nuke/component/text';

const Home: FC = () => {
  return (
    <Container size={ContainerSize.S5} padded>
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
