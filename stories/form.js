import React from 'react';
import {
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
} from 'src/component/form';
import Button from 'src/component/button';
import FaIcon from 'src/component/faicon';

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;

export default {title: 'Form'};

export const plain = () => <Field label="Name" name="name" />;

export const wide = () => <Field wide label="Name" name="name" />;

export const fullWidth = () => <Field fullWidth label="Name" name="name" />;

export const hint = () => (
  <Field label="Hint" name="tagline" hint="What describes you?" />
);

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

const unixToolOpts = unixToolSuggestions.map((i) => ({display: i, value: i}));

export const Validation = () => {
  const form = useForm({
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
  return (
    <Form
      formState={form.state}
      onChange={form.update}
      errCheck={formErrCheck}
      validCheck={formValidCheck}
    >
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
      <Field name="confirm_password" type="password" label="Confirm password" />
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
        options={unixToolOpts}
        icon={<FaIcon icon="terminal" />}
        iconRight={<FaIcon icon="cog" />}
        hint="Your favorite unix tools"
      />
      <FieldMultiSelect
        name="unixtoollist"
        label="Unix tools"
        options={unixToolOpts}
        hint="Your favorite unix tools"
        disabled
      />
      <FieldMultiSelect
        name="unixtoollist"
        label="Unix tools"
        options={unixToolOpts}
        hint="Your favorite unix tools"
        readOnly
      />
      <h3>Form state</h3>
      <pre>{JSON.stringify(form.state, fileStringReplacer, '  ')}</pre>
    </Form>
  );
};
