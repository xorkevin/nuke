import React, {Fragment} from 'react';

import {Story, action} from 'docs';

import Button from '@xorkevin/nuke/src/component/button';
import ButtonPrimary from '@xorkevin/nuke/src/component/button/primary';
import ButtonSecondary from '@xorkevin/nuke/src/component/button/secondary';
import ButtonTertiary from '@xorkevin/nuke/src/component/button/tertiary';
import ButtonDanger from '@xorkevin/nuke/src/component/button/danger';
import ButtonDangerSecondary from '@xorkevin/nuke/src/component/button/dangersecondary';
import ButtonSmall from '@xorkevin/nuke/src/component/button/small';

const Stories = () => (
  <Fragment>
    <h1>Buttons</h1>
    <hr />

    <p>
      <code>Button</code> is used to create buttons.
    </p>

    <Story>
      <Button onClick={action('button-click')}>Click me</Button>
    </Story>

    <p>
      <code>Button</code> may span the full width of its parent.
    </p>

    <Story>
      <Button fullWidth>Click me</Button>
    </Story>

    <p>
      <code>Button</code> may have a fixed width.
    </p>

    <Story>
      <Button fixedWidth>Click</Button>
      <Button fixedWidth>me</Button>
    </Story>

    <p>
      Use the variant <code>button/primary</code> for primary actions.
    </p>

    <Story>
      <ButtonPrimary>Click me</ButtonPrimary>
    </Story>

    <p>
      Use the variant <code>button/secondary</code> for secondary actions.
    </p>

    <Story>
      <ButtonSecondary>Click me</ButtonSecondary>
    </Story>

    <p>
      Use the variant <code>button/tertiary</code> for tertiary actions.
    </p>

    <Story>
      <ButtonTertiary>Click me</ButtonTertiary>
    </Story>

    <p>
      Use the variant <code>button/danger</code> for actions that the user
      should be cautious towards.
    </p>

    <Story>
      <ButtonDanger>Click me</ButtonDanger>
    </Story>

    <p>
      Use the variant <code>button/dangersecondary</code> for actions that the
      user should be cautious towards.
    </p>

    <Story>
      <ButtonDangerSecondary>Click me</ButtonDangerSecondary>
    </Story>

    <p>
      Use the variant <code>button/small</code> for a less intrusive button.
    </p>

    <Story>
      <ButtonSmall>Click me</ButtonSmall>
    </Story>

    <p>
      A <code>Button</code> may be disabled.
    </p>

    <Story>
      <Button disabled onClick={action('button-click')}>
        Click me
      </Button>
      <ButtonPrimary disabled>Click me</ButtonPrimary>
      <ButtonSecondary disabled>Click me</ButtonSecondary>
      <ButtonTertiary disabled>Click me</ButtonTertiary>
      <ButtonDanger disabled>Click me</ButtonDanger>
      <ButtonDangerSecondary disabled>Click me</ButtonDangerSecondary>
      <ButtonSmall disabled>Click me</ButtonSmall>
    </Story>
  </Fragment>
);

export default Stories;
