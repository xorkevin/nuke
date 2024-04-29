import {type FC, type FormEvent, Fragment, useCallback} from 'react';
import {
  Box,
  BoxPadded,
  BoxSize,
  Flex,
  FlexAlignItems,
  FlexDir,
  FlexJustifyContent,
} from '@xorkevin/nuke/component/box';
import {
  Button,
  ButtonGroup,
  ButtonVariant,
} from '@xorkevin/nuke/component/button';
import {
  Field,
  Form,
  Input,
  Label,
  useForm,
} from '@xorkevin/nuke/component/form';
import {ColorClasses, TextClasses} from '@xorkevin/nuke/component/text';

import {DemoTitle, DemoWell} from './demoutil.js';

const formInitState = () => ({username: '', password: ''});
const form2InitState = () => ({plain: '', radio: 'go', checkbox: []});

const Story: FC = () => {
  const form = useForm(formInitState);
  const form2 = useForm(form2InitState);
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    if (e.nativeEvent instanceof SubmitEvent) {
      console.log(new FormData(e.currentTarget, e.nativeEvent.submitter));
    }
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
              <Flex dir={FlexDir.Col}>
                <Field>
                  <Flex dir={FlexDir.Col}>
                    <Label>Username</Label>
                    <Input name="username" />
                  </Flex>
                </Field>
                <Field>
                  <Flex dir={FlexDir.Col}>
                    <Label>Password</Label>
                    <Input type="password" name="password" />
                  </Flex>
                </Field>
              </Flex>
            </Box>
            <Flex justifyContent={FlexJustifyContent.End}>
              <ButtonGroup gap>
                <Button>Cancel</Button>
                <Button type="reset">Reset</Button>
                <Button
                  variant={ButtonVariant.Primary}
                  type="submit"
                  name="submit"
                  value="submit"
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
            <Box padded={BoxPadded.TB} paddedSmall>
              <Flex dir={FlexDir.Col} alignItems={FlexAlignItems.Start}>
                <Field>
                  <Flex dir={FlexDir.Col}>
                    <Label>Plain input</Label>
                    <Input name="plain" fullWidth />
                  </Flex>
                </Field>
                <Field>
                  <Flex>
                    <Input type="radio" name="radio" value="go" />
                    <Label>Go</Label>
                  </Flex>
                </Field>
                <Field>
                  <Flex>
                    <Input type="radio" name="radio" value="rust" />
                    <Label>Rust</Label>
                  </Flex>
                </Field>
                <Field>
                  <Flex>
                    <Input type="radio" name="radio" value="typescript" />
                    <Label>Typescript</Label>
                  </Flex>
                </Field>
                <Field>
                  <Flex>
                    <Input type="checkbox" name="checkbox" value="vim" />
                    <Label>Vim</Label>
                  </Flex>
                </Field>
                <Field>
                  <Flex>
                    <Input type="checkbox" name="checkbox" value="emacs" />
                    <Label>Emacs</Label>
                  </Flex>
                </Field>
              </Flex>
            </Box>
            <ButtonGroup gap>
              <Button type="reset">Reset</Button>
              <Button
                variant={ButtonVariant.Primary}
                type="submit"
                name="submit"
                value="submit"
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
