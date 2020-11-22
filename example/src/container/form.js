import React, {Fragment, useCallback} from 'react';
import {
  useSnackbarView,
  SnackbarSurface,
  Container,
  Section,
  Field,
  FieldTextarea,
  FieldCheckbox,
  FieldToggle,
  FieldSwitch,
  FieldRadio,
  FieldFile,
  FieldSelect,
  FieldSuggest,
  FieldMultiSelect,
  Form,
  useForm,
  useMenu,
  Menu,
  MenuItem,
  MenuHeader,
  MenuDivider,
  Card,
  Button,
  ButtonGroup,
  Table,
  Tabbar,
  TabItem,
  TabDivider,
  FaIcon,
} from '@xorkevin/nuke';

import {tableData} from 'config';

const fileStringReplacer = (_k, v) => {
  if (v instanceof File) {
    return `FILE:${v.name}`;
  }
  return v;
};

const languageOpts = [
  {display: 'Rust', value: 'rs'},
  {display: 'Go', value: 'go'},
  {display: 'Javascript', value: 'js'},
  {display: 'Python', value: 'py'},
  {display: 'Erlang', value: 'erl'},
];

const unixToolSuggestions = [
  'man',
  'ls',
  'pwd',
  'cd',
  'cat',
  'echo',
  'tee',
  'head',
  'tail',
  'less',
  'more',
  'tr',
  'cut',
  'awk',
  'sed',
  'sort',
  'grep',
  'wc',
  'bc',
  'diff',
  'patch',
  'chmod',
  'chown',
  'cp',
  'mv',
  'rm',
  'ln',
  'date',
  'df',
  'du',
  'find',
  'xargs',
  'ed',
  'vi',
  'vim',
  'nvim',
  'emacs',
  'nano',
  'tar',
];

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;
const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const formErrCheck = ({
  email,
  phone,
  password,
  confirm_password,
  bio,
  checkbox,
  toggle,
  file2,
}) => {
  const err = {};
  if (email.length > 0 && !emailRegex.test(email)) {
    Object.assign(err, {email: 'Must be a valid email'});
  }
  if (phone.length > 0 && !phoneRegex.test(phone)) {
    Object.assign(err, {phone: true});
  }
  if (password.length > 0 && password.length < 10) {
    Object.assign(err, {password: true});
  }
  if (confirm_password.length > 0 && confirm_password !== password) {
    Object.assign(err, {confirm_password: 'Passwords must match'});
  }
  if (bio.length > 128) {
    Object.assign(err, {bio: 'Max length exceeded'});
  }
  if (new Set(checkbox).has('checked2')) {
    Object.assign(err, {checkbox: 'Cannot have check2'});
  }
  if (toggle) {
    Object.assign(err, {toggle: true});
  }
  if (file2) {
    Object.assign(err, {file2: true});
  }
  return err;
};
const formValidCheck = ({
  name,
  email,
  phone,
  password,
  confirm_password,
  bio,
  checkbox,
  toggle2,
  file3,
}) => {
  const valid = {};
  if (name.length > 0) {
    Object.assign(valid, {name: true});
  }
  if (emailRegex.test(email)) {
    Object.assign(valid, {email: true});
  }
  if (phoneRegex.test(phone)) {
    Object.assign(valid, {phone: true});
  }
  if (password.length > 9) {
    Object.assign(valid, {password: true});
  }
  if (password.length > 0 && confirm_password === password) {
    Object.assign(valid, {confirm_password: 'Passwords match!'});
  }
  if (bio.length > 0 && bio.length <= 128) {
    Object.assign(valid, {bio: true});
  }
  if (new Set(checkbox).has('checked1')) {
    Object.assign(valid, {checkbox: true});
  }
  if (toggle2) {
    Object.assign(valid, {toggle2: true});
  }
  if (file3) {
    Object.assign(valid, {file3: true});
  }
  return valid;
};

const FormContainer = () => {
  const form = useForm({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    code: 'code',
    money: '1000',
    bio: '',
    checkbox: [],
    toggle: false,
    toggle2: false,
    toggle3: false,
    toggle4: false,
    radio: '',
    file: undefined,
    file2: undefined,
    file3: undefined,
    filemulti: [],
    lang: 'rs',
    unixtool: '',
    unixtoollist: [],
  });

  const logFormState = useCallback(() => {
    console.log(form.state);
  }, [form.state]);

  const displaySnackbar = useSnackbarView(
    <SnackbarSurface>
      <span>Hello, World</span> <Button>Reply</Button>
    </SnackbarSurface>,
  );

  const menu = useMenu();

  return (
    <Container padded narrow>
      <Section id="form">
        <h1>Form</h1>
        <hr />
        <Form
          formState={form.state}
          onChange={form.update}
          errCheck={formErrCheck}
          validCheck={formValidCheck}
        >
          <Field name="name" label="Name" />
          <Field name="email" label="Email" placeholder="name@example.com" />
          <Field
            name="email"
            label="Email"
            placeholder="name@example.com"
            disabled
          />
          <Field name="phone" label="Phone" placeholder="xxx-xxx-xxxx" />
          <Field
            name="password"
            type="password"
            label="Password"
            hint="Must be at least 10 chars"
            hintRight={
              form.state.password.length > 0 ? form.state.password.length : ''
            }
          />
          <Field
            name="confirm_password"
            type="password"
            label="Confirm password"
          />
          <Field name="code" label="Code" readOnly />
          <Field
            name="money"
            label="Amount"
            icon={<FaIcon icon="btc" />}
            iconRight="BTC"
          />
          <FieldTextarea
            name="bio"
            label="Bio"
            icon={<FaIcon icon="user" />}
            iconRight={<FaIcon icon="camera" />}
            hint="Tell us about yourself"
            hintRight={`${form.state.bio.length}/128`}
            wide
          />
          <FieldTextarea
            name="bio"
            label="Bio"
            hint="Tell us about yourself"
            hintRight={`${form.state.bio.length}/128`}
            disabled
            wide
          />
          <FieldTextarea
            name="bio"
            label="Bio"
            hint="Tell us about yourself"
            hintRight={`${form.state.bio.length}/128`}
            readOnly
            wide
          />
          <FieldCheckbox
            name="checkbox"
            option="checked1"
            label="Check me"
            hint="This is a checkbox"
          />
          <FieldCheckbox
            name="checkbox"
            option="checked1"
            label="Check me"
            hint="This is a checkbox"
          />
          <FieldCheckbox
            name="checkbox"
            option="checked2"
            label="Check me"
            hint="This is a checkbox"
          />
          <FieldCheckbox
            name="checkbox"
            option="checked2"
            label="Check me"
            hint="This is a checkbox"
            disabled
          />
          <FieldToggle name="toggle" label="Toggle me" nohint />
          <FieldToggle name="toggle" label="Toggle me" nohint disabled />
          <FieldSwitch name="toggle2" label="Toggle me" nohint />
          <FieldSwitch name="toggle2" label="Toggle me" nohint disabled />
          <FieldSwitch name="toggle3" label="Toggle me" success nohint />
          <FieldSwitch name="toggle4" label="Toggle me" danger nohint />
          <FieldRadio
            name="radio"
            option="one"
            label="Radio one"
            hint="Radio button"
          />
          <FieldRadio
            name="radio"
            option="two"
            label="Radio two"
            hint="Radio button"
          />
          <FieldRadio
            name="radio"
            option="three"
            label="Radio three"
            hint="Radio button"
          />
          <FieldRadio
            name="radio"
            option="four"
            label="Radio three"
            hint="Radio button"
            disabled
          />
          <FieldFile
            name="file"
            label="File"
            hint="Choose an image"
            accept="image/png, image/jpeg"
            fullWidth
          >
            <Button>
              <FaIcon icon="cloud-upload" /> Upload
            </Button>
          </FieldFile>
          <FieldFile
            name="file"
            label="File"
            hint="Choose an image"
            accept="image/png, image/jpeg"
            disabled
            fullWidth
          >
            <Button disabled>
              <FaIcon icon="cloud-upload" /> Upload
            </Button>
          </FieldFile>
          <FieldFile
            name="file2"
            label="File"
            hint="Choose an image"
            accept="image/png, image/jpeg"
            fullWidth
          >
            <Button>
              <FaIcon icon="cloud-upload" /> Upload
            </Button>
          </FieldFile>
          <FieldFile
            name="file3"
            label="File"
            hint="Choose an image"
            accept="image/png, image/jpeg"
            fullWidth
          >
            <Button>
              <FaIcon icon="cloud-upload" /> Upload
            </Button>
          </FieldFile>
          <FieldFile
            name="filemulti"
            label="Multiple files"
            hint="Choose images"
            accept="image/png, image/jpeg"
            multiple
            fullWidth
          >
            <Button>
              <FaIcon icon="cloud-upload" /> Upload
            </Button>
          </FieldFile>
          <FieldSelect
            name="lang"
            label="Language"
            options={languageOpts}
            icon={<FaIcon icon="code" />}
            iconRight={`.${form.state.lang}`}
            hint="Your favorite language"
          />
          <FieldSelect
            name="lang"
            label="Language"
            options={languageOpts}
            hint="Your favorite language"
            disabled
          />
          <FieldSuggest
            name="unixtool"
            label="Unix tool"
            options={unixToolSuggestions}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tool"
          />
          <FieldSuggest
            name="unixtool"
            label="Unix tool"
            options={unixToolSuggestions}
            hint="Your favorite unix tool"
            disabled
          />
          <FieldSuggest
            name="unixtool"
            label="Unix tool"
            options={unixToolSuggestions}
            hint="Your favorite unix tool"
            readOnly
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools"
            options={languageOpts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tools"
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools"
            options={languageOpts}
            hint="Your favorite unix tools"
            disabled
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools"
            options={languageOpts}
            hint="Your favorite unix tools"
            readOnly
          />
          <h3>Form state</h3>
          <pre>{JSON.stringify(form.state, fileStringReplacer, '  ')}</pre>
        </Form>
        <Button onClick={logFormState}>Submit</Button>
        <Card
          width="lg"
          title={
            <Container padded>
              <h3>Vivamus nibh enim</h3>
            </Container>
          }
          bar={
            <ButtonGroup>
              <Button fixedWidth>Cancel</Button>
              <Button fixedWidth>Save</Button>
              <Button fixedWidth onClick={displaySnackbar}>
                Submit
              </Button>
            </ButtonGroup>
          }
        >
          <Container padded>
            <FieldTextarea
              label="Biography"
              hint="Tell us about yourself"
              fullWidth
            />
            <FieldTextarea
              label="Biography"
              hint="Tell us about yourself"
              error="textarea error"
              fullWidth
            />
            <FieldTextarea
              label="Biography"
              hint="Tell us about yourself"
              valid
              fullWidth
            />
          </Container>
        </Card>

        <Section id="buttons">
          <h3>Buttons</h3>
          <ButtonGroup>
            <Button fixedWidth>Primary</Button>
            <Button fixedWidth>Secondary</Button>
            <Button fixedWidth>Tertiary</Button>
          </ButtonGroup>
        </Section>

        <Section id="table">
          <h3>Table</h3>
          <Table
            head={
              <Fragment>
                <th>name</th>
                <th>description</th>
              </Fragment>
            }
          >
            {tableData.map(({name, description}) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{description}</td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section id="tabs">
          <h3>Tabs</h3>
          <Tabbar
            right={
              <Fragment>
                <TabItem link="https://github.com/xorkevin" ext>
                  <FaIcon icon="user" /> Profile
                </TabItem>
                <TabItem forwardedRef={menu.anchorRef} onClick={menu.toggle}>
                  <FaIcon icon="cog" /> Settings
                </TabItem>
                {menu.show && (
                  <Menu size="md" anchor={menu.anchor} close={menu.close}>
                    <MenuHeader>Settings</MenuHeader>
                    <MenuItem icon={<FaIcon icon="bolt" />} label="Ctrl+B">
                      Dark Mode
                    </MenuItem>
                    <MenuItem icon={<FaIcon icon="question" />} label="Ctrl+H">
                      Help
                    </MenuItem>
                    <MenuDivider />
                    <MenuHeader>About</MenuHeader>
                    <MenuItem
                      link="https://github.com/xorkevin"
                      ext
                      icon={<FaIcon icon="github" />}
                      label={<FaIcon icon="external-link" />}
                    >
                      xorkevin
                    </MenuItem>
                  </Menu>
                )}
              </Fragment>
            }
          >
            <TabItem className="active">
              <FaIcon icon="newspaper-o" /> Newsfeed
            </TabItem>
            <TabItem>
              <FaIcon icon="fire" /> Popular
            </TabItem>
            <TabDivider />
            <TabItem>
              <FaIcon icon="users" /> Friends
            </TabItem>
            <TabItem>
              <FaIcon icon="paper-plane" /> Post
            </TabItem>
          </Tabbar>
        </Section>
      </Section>
    </Container>
  );
};

export default FormContainer;
