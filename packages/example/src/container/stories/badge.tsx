import {type FC, Fragment} from 'react';
import {BadgeClasses} from '@xorkevin/nuke/component/badge';

import {DemoSection, DemoTitle, DemoWell} from './demoutil.js';

const Story: FC = () => {
  return (
    <Fragment>
      <DemoTitle>Badges</DemoTitle>
      <DemoSection>Variants</DemoSection>
      <DemoWell>
        <span className={BadgeClasses.Badge}>Badge</span>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
