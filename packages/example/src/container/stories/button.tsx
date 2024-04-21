import {type FC, Fragment} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';

import {DemoSection, DemoTitle, DemoWell} from './demoutil.js';

const Story: FC = () => {
  return (
    <Fragment>
      <DemoTitle>Buttons</DemoTitle>
      <DemoSection>Variants</DemoSection>
      <DemoWell>
        <ButtonGroup gap>
          <Button>Default</Button>
          <Button variant={ButtonVariant.Subtle}>Subtle</Button>
          <Button variant={ButtonVariant.Primary}>Primary</Button>
        </ButtonGroup>
      </DemoWell>
      <DemoSection>Button group</DemoSection>
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
