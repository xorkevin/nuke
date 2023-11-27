import {type FC, Fragment} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';

import {DemoWell} from './demoutil.js';

const Story: FC = () => {
  return (
    <Fragment>
      <h1>Buttons</h1>
      <h2>Variants</h2>
      <DemoWell>
        <ButtonGroup gap>
          <Button>Default</Button>
          <Button variant={ButtonVariant.Subtle}>Subtle</Button>
          <Button variant={ButtonVariant.Primary}>Primary</Button>
        </ButtonGroup>
      </DemoWell>
      <h2>Button group</h2>
      <DemoWell>
        <ButtonGroup>
          <Button>Default</Button>
          <Button variant={ButtonVariant.Subtle}>Subtle</Button>
          <Button variant={ButtonVariant.Primary}>Primary</Button>
        </ButtonGroup>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
