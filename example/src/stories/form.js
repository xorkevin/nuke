import {Fragment, useCallback} from 'react';

import {Story} from 'docs';

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
  FieldDynSuggest,
  FieldSearchSelect,
  FieldDynSearchSelect,
  FieldMultiSelect,
  FieldDynMultiSelect,
  Form,
  useForm,
  useFormSearch,
  Button,
  FaIcon,
} from '@xorkevin/nuke';

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

const matchChars = (from, to) => {
  let j = 0;
  for (let i = 0; i < from.length; i++) {
    while (j < to.length && to[j] !== from[i]) {
      j++;
    }
    if (j >= to.length) {
      return false;
    }
    j++;
  }
  return true;
};

const fuzzyFilter = (count, options, map, search = '') => {
  const s = typeof search === 'string' ? search.toLowerCase() : '';
  const matches = [];
  for (let i = 0; i < options.length && matches.length < count; i++) {
    const k = options[i];
    if (matchChars(s, map(k).toLowerCase())) {
      matches.push(k);
    }
  }
  return matches;
};

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const searchToolsSuggest = async (search) => {
  await sleep(256);
  return fuzzyFilter(8, unixToolSuggestions, (i) => i, search);
};

const searchTools = async (search) => {
  await sleep(256);
  return fuzzyFilter(8, unixToolOpts, (i) => i.display, search);
};

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

const Stories = () => {
  const form = useForm({
    name: '',
    num: '',
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
    dynunixtool: '',
    unixtoolselect: '',
    dynunixtoolselect: '',
    unixtoollist: [],
    dynunixtoollist: [],
  });

  const logFormState = useCallback(() => {
    console.log(form.state);
  }, [form.state]);

  const toolSearchSuggest = useFormSearch(searchToolsSuggest, 256);
  const toolSearchSelect = useFormSearch(searchTools, 256);
  const toolSearchMulti = useFormSearch(searchTools, 256);

  return (
    <Fragment>
      <Story>
        <Form
          formState={form.state}
          onChange={form.update}
          errCheck={formErrCheck}
          validCheck={formValidCheck}
          displays={form.displays}
          putDisplays={form.putDisplays}
          addDisplay={form.addDisplay}
          compactDisplays={form.compactDisplays}
        >
          <Field name="name" label="Name" />
          <Field name="num" label="Number" inputMode="numeric" />
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
            label="Unix tool suggest"
            options={unixToolSuggestions}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tool"
          />
          <FieldSuggest
            name="unixtool"
            label="Unix tool suggest"
            options={unixToolSuggestions}
            hint="Your favorite unix tool"
            disabled
          />
          <FieldSuggest
            name="unixtool"
            label="Unix tool suggest"
            options={unixToolSuggestions}
            hint="Your favorite unix tool"
            readOnly
          />
          <FieldDynSuggest
            name="dynunixtool"
            label="Unix tool dyn suggest"
            onSearch={toolSearchSuggest.setSearch}
            options={toolSearchSuggest.opts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tool"
          />
          <FieldDynSuggest
            name="dynunixtool"
            label="Unix tool dyn suggest"
            onSearch={toolSearchSuggest.setSearch}
            options={toolSearchSuggest.opts}
            hint="Your favorite unix tool"
            disabled
          />
          <FieldDynSuggest
            name="dynunixtool"
            label="Unix tool dyn suggest"
            onSearch={toolSearchSuggest.setSearch}
            options={toolSearchSuggest.opts}
            hint="Your favorite unix tool"
            readOnly
          />
          <FieldSearchSelect
            name="unixtoolselect"
            label="Unix tool search select"
            placeholder="Choose a tool"
            options={unixToolOpts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tool"
          />
          <FieldSearchSelect
            name="unixtoolselect"
            label="Unix tool search select"
            placeholder="Choose a tool"
            options={unixToolOpts}
            hint="Your favorite unix tool"
            disabled
          />
          <FieldSearchSelect
            name="unixtoolselect"
            label="Unix tool search select"
            placeholder="Choose a tool"
            options={unixToolOpts}
            hint="Your favorite unix tool"
            readOnly
          />
          <FieldDynSearchSelect
            name="dynunixtoolselect"
            label="Unix tool dyn search select"
            placeholder="Choose a tool"
            onSearch={toolSearchSelect.setSearch}
            options={toolSearchSelect.opts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tool"
          />
          <FieldDynSearchSelect
            name="dynunixtoolselect"
            label="Unix tool dyn search select"
            placeholder="Choose a tool"
            onSearch={toolSearchSelect.setSearch}
            options={toolSearchSelect.opts}
            hint="Your favorite unix tool"
            disabled
          />
          <FieldDynSearchSelect
            name="dynunixtoolselect"
            label="Unix tool dyn search select"
            placeholder="Choose a tool"
            onSearch={toolSearchSelect.setSearch}
            options={toolSearchSelect.opts}
            hint="Your favorite unix tool"
            readOnly
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools multiselect"
            options={unixToolOpts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tools"
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools multiselect"
            options={unixToolOpts}
            hint="Your favorite unix tools"
            disabled
          />
          <FieldMultiSelect
            name="unixtoollist"
            label="Unix tools multiselect"
            options={unixToolOpts}
            hint="Your favorite unix tools"
            readOnly
          />
          <FieldDynMultiSelect
            name="dynunixtoollist"
            label="Unix tools dyn multiselect"
            onSearch={toolSearchMulti.setSearch}
            options={toolSearchMulti.opts}
            icon={<FaIcon icon="terminal" />}
            iconRight={<FaIcon icon="cog" />}
            hint="Your favorite unix tools"
          />
          <FieldDynMultiSelect
            name="dynunixtoollist"
            label="Unix tools dyn multiselect"
            onSearch={toolSearchMulti.setSearch}
            options={toolSearchMulti.opts}
            hint="Your favorite unix tools"
            disabled
          />
          <FieldDynMultiSelect
            name="dynunixtoollist"
            label="Unix tools dyn multiselect"
            onSearch={toolSearchMulti.setSearch}
            options={toolSearchMulti.opts}
            hint="Your favorite unix tools"
            readOnly
          />
          <h3>Form state</h3>
          <pre>{JSON.stringify(form.state, fileStringReplacer, '  ')}</pre>
        </Form>
        <Button onClick={logFormState}>Submit</Button>
      </Story>
    </Fragment>
  );
};

export default Stories;
