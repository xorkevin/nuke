import {type FC} from 'react';

import {Container} from '@xorkevin/nuke/component/container';
import {TextStyles} from '@xorkevin/nuke/component/text';

const Home: FC = () => {
  return (
    <Container>
      <hgroup>
        <h1
          className={TextStyles.Display}
          style={{'--nuke-text-display-size': '5rem'}}
        >
          Nuke
        </h1>
        <p className={TextStyles.Subtitle}>a reactive frontend toolkit</p>
      </hgroup>
    </Container>
  );
};

export default Home;
