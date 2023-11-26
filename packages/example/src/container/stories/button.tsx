import {type FC, Fragment} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonRank,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';

const Story: FC = () => {
  return (
    <Fragment>
      <ButtonGroup>
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
      </ButtonGroup>
      <ButtonGroup gap>
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
      </ButtonGroup>
    </Fragment>
  );
};

export default Story;
