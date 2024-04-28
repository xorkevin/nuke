import {type FC, Fragment} from 'react';
import {
  Box,
  BoxPadded,
  BoxSize,
  Flex,
  FlexJustifyContent,
} from '@xorkevin/nuke/component/box';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';
import {Form, Input, Label, useForm} from '@xorkevin/nuke/component/form';
import {ColorClasses, TextClasses} from '@xorkevin/nuke/component/text';

import {DemoTitle, DemoWell} from './demoutil.js';

const Story: FC = () => {
  const form = useForm({username: '', password: ''});
  return (
    <Fragment>
      <DemoTitle>Form</DemoTitle>
      <DemoWell>
        <Box size={BoxSize.S1_5} padded paddedSmall center card>
          <hgroup>
            <h3 className={TextClasses.TitleMedium}>Create an account</h3>
            <p className={ColorClasses.F2}>Let&apos;s get started</p>
          </hgroup>
          <Box padded={BoxPadded.TB} paddedSmall>
            <Form form={form}>
              <Label inputName="username">Username</Label>
              <Input name="username" />
              <Label inputName="password">Password</Label>
              <Input name="password" />
            </Form>
          </Box>
          <Flex justifyContent={FlexJustifyContent.End}>
            <ButtonGroup gap>
              <Button>Cancel</Button>
              <Button variant={ButtonVariant.Primary}>Submit</Button>
            </ButtonGroup>
          </Flex>
        </Box>
      </DemoWell>
      <DemoWell>
        <pre>{JSON.stringify(form.state, undefined, '  ')}</pre>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
