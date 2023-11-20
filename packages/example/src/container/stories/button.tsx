import {type FC, Fragment} from 'react';
import {
  Button,
  ButtonRank,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';

const Story: FC = () => {
  return (
    <Fragment>
      <Button>Default Tertiary</Button>
      <Button variant={ButtonVariant.Accent}>Accent Tertiary</Button>
      <Button rank={ButtonRank.Secondary}>Default Secondary</Button>
      <Button variant={ButtonVariant.Accent} rank={ButtonRank.Secondary}>
        Accent Secondary
      </Button>
      <Button rank={ButtonRank.Primary}>Default Primary</Button>
      <Button variant={ButtonVariant.Accent} rank={ButtonRank.Primary}>
        Accent Primary
      </Button>
    </Fragment>
  );
};

export default Story;
