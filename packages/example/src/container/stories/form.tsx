import {type FC, type FormEvent, Fragment, useCallback} from 'react';
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
  const form2 = useForm({plain: '', radio: 'go'});
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    const submitter =
      'submitter' in e.nativeEvent &&
      e.nativeEvent.submitter instanceof HTMLElement
        ? e.nativeEvent.submitter
        : undefined;
    console.log(new FormData(e.currentTarget, submitter));
  }, []);
  return (
    <Fragment>
      <DemoTitle>Form</DemoTitle>
      <DemoWell>
        <Box size={BoxSize.S1_5} padded paddedSmall center card>
          <hgroup>
            <h3 className={TextClasses.TitleMedium}>Create an account</h3>
            <p className={ColorClasses.F2}>Let&apos;s get started</p>
          </hgroup>
          <Form form={form} onSubmit={handleSubmit}>
            <Box padded={BoxPadded.TB} paddedSmall>
              <Label inputName="username">Username</Label>
              <Input name="username" />
              <Label inputName="password">Password</Label>
              <Input type="password" name="password" />
            </Box>
            <Flex justifyContent={FlexJustifyContent.End}>
              <ButtonGroup gap>
                <Button>Cancel</Button>
                <Button type="reset">Reset</Button>
                <Button
                  variant={ButtonVariant.Primary}
                  type="submit"
                  name="submit"
                  value="true"
                >
                  Submit
                </Button>
              </ButtonGroup>
            </Flex>
          </Form>
        </Box>
      </DemoWell>
      <DemoWell>
        <pre>{JSON.stringify(form.state, undefined, '  ')}</pre>
      </DemoWell>
      <DemoWell>
        <Box padded={BoxPadded.TB}>
          <Form form={form2} onSubmit={handleSubmit}>
            <Label inputName="plain">Plain input</Label>
            <Input name="plain" />
            <Input type="radio" name="radio" value="go" />
            <Label inputType="radio" inputName="radio" inputValue="go">
              Go
            </Label>
            <Input type="radio" name="radio" value="rust" />
            <Label inputType="radio" inputName="radio" inputValue="rust">
              Rust
            </Label>
            <Input type="radio" name="radio" value="typescript" />
            <Label inputType="radio" inputName="radio" inputValue="typescript">
              Typescript
            </Label>
            <ButtonGroup gap>
              <Button type="reset">Reset</Button>
              <Button
                variant={ButtonVariant.Primary}
                type="submit"
                name="submit"
                value="true"
              >
                Submit
              </Button>
            </ButtonGroup>
          </Form>
        </Box>
      </DemoWell>
      <DemoWell>
        <pre>{JSON.stringify(form2.state, undefined, '  ')}</pre>
      </DemoWell>
    </Fragment>
  );
};

export default Story;
