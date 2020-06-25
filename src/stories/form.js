import React, {Fragment, useMemo} from 'react';
import {
  Field,
  FieldTextarea,
  FieldCheckbox,
  Input,
  Form,
  useForm,
  fuzzyFilter,
} from 'component/form';

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]+$/;

export default {title: 'Form'};

export const plain = () => <Field label="Name" name="name" />;

export const wide = () => <Field wide label="Name" name="name" />;

export const fullWidth = () => <Field fullWidth label="Name" name="name" />;

export const hint = () => (
  <Field label="Hint" name="tagline" hint="What describes you?" />
);

const phoneRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const imageSetType = new Set(['image/png', 'image/jpeg']);
const formErrCheck = ({email, phone, password, confirm_password, bio}) => {
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
  return err;
};
const formValidCheck = ({email, phone, password, confirm_password, bio}) => {
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
  return valid;
};

export const validation = () => {
  const [formState, updateForm] = useForm({
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    bio: '',
  });
  return (
    <Form
      formState={formState}
      onChange={updateForm}
      errCheck={formErrCheck}
      validCheck={formValidCheck}
    >
      <Field label="Email" name="email" placeholder="name@example.com" />
      <Field label="Phone" name="phone" placeholder="xxx-xxx-xxxx" />
      <Field
        label="Password"
        type="password"
        name="password"
        hint="Must be at least 10 chars"
        hintRight={
          formState.password.length > 0 ? formState.password.length : ''
        }
      />
      <Field label="Confirm password" type="password" name="confirm_password" />
      <FieldTextarea
        label="Bio"
        name="bio"
        hint="Tell us about yourself"
        hintRight={`${formState.bio.length}/128`}
        wide
      />
      <FieldCheckbox
        label="Check me"
        name="checkbox"
        option="checked1"
        hint="This is a checkbox"
      />
      <FieldCheckbox
        label="Check me"
        name="checkbox"
        option="checked1"
        hint="This is a checkbox"
      />
      <FieldCheckbox
        label="Check me"
        name="checkbox"
        option="checked2"
        hint="This is a checkbox"
      />
    </Form>
  );
};

export const toggle = () => (
  <Input
    label="Toggle me"
    info="This is a toggle"
    type="checkbox"
    toggle
    name="toggle"
  />
);

export const radio = () => {
  const [formState, updateForm] = useForm({
    name: '',
    email: '',
    phone: '',
    tagline: '',
    password: '',
    confirm_password: '',
    checkbox: false,
    checkbox2: false,
    toggle: false,
    radioval: false,
    fileval: undefined,
    lang: '200',
    tool: '',
    tool2: [],
  });

  return (
    <Form formState={formState} onChange={updateForm}>
      <Input
        label="Radio one"
        info="Radio button"
        type="radio"
        name="radioval"
        value="one"
      />
      <Input
        label="Radio two"
        info="Radio button"
        type="radio"
        name="radioval"
        value="two"
      />
      <Input
        label="Radio three"
        info="Radio button"
        type="radio"
        name="radioval"
        value="three"
      />
    </Form>
  );
};

export const file = () => (
  <Input
    label="File"
    type="file"
    name="fileval"
    accept="image/png, image/jpeg"
    info="Choose an image"
  />
);

export const dropdown = () => (
  <Fragment>
    <Input
      label="Language"
      info="Your favorite language"
      dropdown={[
        {text: 'Rust', value: '100'},
        {text: 'Go', value: '200'},
        {text: 'Javascript', value: '300'},
        {text: 'Python', value: '400'},
        {text: 'Prolog', value: '500'},
      ]}
      name="lang"
    />
    <Input
      label="Language"
      info="Your favorite language"
      dropdown={[
        {text: 'Rust', value: '100'},
        {text: 'Go', value: '200'},
        {text: 'Javascript', value: '300'},
        {text: 'Python', value: '400'},
        {text: 'Prolog', value: '500'},
      ]}
      name="lang2"
      error="select error"
    />
    <Input
      label="Language"
      info="Your favorite language"
      dropdown={[
        {text: 'Rust', value: '100'},
        {text: 'Go', value: '200'},
        {text: 'Javascript', value: '300'},
        {text: 'Python', value: '400'},
        {text: 'Prolog', value: '500'},
      ]}
      name="lang3"
      valid
    />
  </Fragment>
);

const Tools = [
  {value: 'man'},
  {value: 'ls'},
  {value: 'pwd'},
  {value: 'cd'},
  {value: 'cat'},
  {value: 'echo'},
  {value: 'tee'},
  {value: 'head'},
  {value: 'tail'},
  {value: 'less'},
  {value: 'more'},
  {value: 'tr'},
  {value: 'cut'},
  {value: 'awk'},
  {value: 'sed'},
  {value: 'sort'},
  {value: 'grep'},
  {value: 'wc'},
  {value: 'bc'},
  {value: 'diff'},
  {value: 'patch'},
  {value: 'chmod'},
  {value: 'chown'},
  {value: 'cp'},
  {value: 'mv'},
  {value: 'rm'},
  {value: 'ln'},
  {value: 'date'},
  {value: 'df'},
  {value: 'du'},
  {value: 'find'},
  {value: 'xargs'},
  {value: 'ed'},
  {value: 'vi'},
  {value: 'vim'},
  {value: 'nvim'},
  {value: 'emacs'},
  {value: 'nano'},
  {value: 'tar'},
];

const getEditorVal = (i) => i.value;

export const dropdownInput = () => {
  const [formState, updateForm] = useForm({
    tool: '',
  });

  const tools = useMemo(
    () => fuzzyFilter(8, Tools, getEditorVal, formState.tool),
    [formState.tool],
  );

  return (
    <Form formState={formState} onChange={updateForm}>
      <Input
        label="Unix tool"
        info="Your favorite unix tool"
        dropdowninput={tools}
        name="tool"
      />
    </Form>
  );
};

export const dropdownInputMultiple = () => {
  const [formState, updateForm] = useForm({
    tool: '',
  });

  const tools = useMemo(
    () => fuzzyFilter(8, Tools, getEditorVal, formState._search_tool),
    [formState._search_tool],
  );

  return (
    <Form formState={formState} onChange={updateForm}>
      <Input
        label="Unix tool"
        info="Your favorite unix tool"
        multiple
        dropdowninput={tools}
        name="tool"
      />
    </Form>
  );
};
