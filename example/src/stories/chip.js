import {Fragment} from 'react';

import {Story} from 'docs';

import Chip from '@xorkevin/nuke/src/component/chip';
import ChipPrimary from '@xorkevin/nuke/src/component/chip/primary';
import ChipSuccess from '@xorkevin/nuke/src/component/chip/success';
import ChipDanger from '@xorkevin/nuke/src/component/chip/danger';

const Stories = () => (
  <Fragment>
    <p>
      <code>Chip</code> is used to display metadata.
    </p>
    <Story>
      <Chip>here</Chip>
      <Chip>are</Chip>
      <Chip>some chips</Chip>
    </Story>
    <p>
      Use the <code>chip/primary</code> variant to display important metadata.
    </p>
    <Story>
      <ChipPrimary>here</ChipPrimary>
      <ChipPrimary>are</ChipPrimary>
      <ChipPrimary>some chips</ChipPrimary>
    </Story>
    <p>
      Use the <code>chip/success</code> variant to display success information.
    </p>
    <Story>
      <ChipSuccess>here</ChipSuccess>
      <ChipSuccess>are</ChipSuccess>
      <ChipSuccess>some chips</ChipSuccess>
    </Story>
    <p>
      Use the <code>chip/danger</code> variant to display information that
      requires the user&apos;s immediate attention.
    </p>
    <Story>
      <ChipDanger>here</ChipDanger>
      <ChipDanger>are</ChipDanger>
      <ChipDanger>some chips</ChipDanger>
    </Story>
  </Fragment>
);

export default Stories;
