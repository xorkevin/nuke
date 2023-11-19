import {Fragment, type FC} from 'react';
import {Button, ButtonVariant} from '@xorkevin/nuke/component/button';

const Story: FC = () => {
  return (
    <Fragment>
      <Button>Default</Button>
      <Button variant={ButtonVariant.Accent}>Accent</Button>
    </Fragment>
  );
};

export default Story;
