import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import {randomID} from 'utility';
import {Popover, useStateRef} from '../popover';
import {Grid, Column} from '../grid';
import {ListGroup, ListItem} from '../listgroup';
import ButtonSmall from '../button/small';
import Chip from '../chip';
import FaIcon from '../faicon';

const FormContext = React.createContext();

const Form = ({
  formState,
  onChange,
  onSubmit,
  errCheck,
  validCheck,
  children,
}) => {
  let error = useMemo(() => {
    if (errCheck) {
      return errCheck(formState);
    }
    return {};
  }, [errCheck, formState]);
  let valid = useMemo(() => {
    if (validCheck) {
      return validCheck(formState);
    }
    return {};
  }, [validCheck, formState]);
  return (
    <FormContext.Provider value={{formState, onChange, onSubmit, error, valid}}>
      {children}
    </FormContext.Provider>
  );
};

const renderNormal = ({
  fieldid,
  type,
  name,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  forwardedRef,
}) => {
  return (
    <input
      ref={forwardedRef}
      className="normal"
      id={fieldid}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
    />
  );
};

const preventDefault = (e) => {
  e.preventDefault();
};

const Field = ({
  className,
  render,
  type,
  name,
  value,
  onChange,
  onSubmit,
  error,
  valid,
  option,
  options,
  label,
  placeholder,
  hint,
  hintRight,
  nohint,
  wide,
  fullWidth,
  noctx,
  children,
}) => {
  const fieldid = useMemo(randomID, []);

  const ctx = useContext(FormContext);
  if (!noctx && ctx) {
    if (ctx.formState) {
      value = ctx.formState[name];
    }
    if (ctx.onChange) {
      onChange = ctx.onChange;
    }
    if (ctx.onSubmit) {
      onSubmit = ctx.onSubmit;
    }
    if (ctx.error) {
      error = ctx.error[name];
    }
    if (ctx.valid) {
      valid = ctx.valid[name];
    }
  }

  const changeFunc = useMemo(() => {
    if (!onChange) {
      return () => {};
    }
    return onChange;
  }, [onChange]);
  const submitFunc = useMemo(() => {
    if (!onSubmit) {
      return () => {};
    }
    return onSubmit;
  }, [onSubmit]);

  // used for default input
  const handleChange = useCallback(
    (e) => {
      changeFunc(name, e.target.value);
    },
    [name, changeFunc],
  );
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        submitFunc();
      }
    },
    [submitFunc],
  );

  const k = ['formfield'];
  if (fullWidth) {
    k.push('full-width');
  } else if (wide) {
    k.push('wide');
  }

  if (valid) {
    k.push('valid');
  } else if (error) {
    k.push('error');
  }

  if (className) {
    k.push(className);
  }

  const hintClass = ['hint'];
  if (nohint) {
    hintClass.push('no-hint');
  }
  const displayValid = valid && typeof valid !== 'boolean';
  const displayErr = error && typeof error !== 'boolean';
  if (displayValid) {
    hintClass.push('valid');
  } else if (displayErr) {
    hintClass.push('error');
  }

  let inp = null;
  if (render) {
    inp = render({
      fieldid,
      type,
      name,
      value,
      onChange: changeFunc,
      onSubmit: submitFunc,
      option,
      options,
      label,
      placeholder,
      children,
    });
  } else {
    k.push('normal');
    inp = (
      <Fragment>
        {label && <label htmlFor={fieldid}>{label}</label>}
        {renderNormal({
          fieldid,
          type,
          name,
          value,
          onChange: handleChange,
          onKeyDown: handleSubmit,
          placeholder,
        })}
      </Fragment>
    );
  }
  return (
    <div className={k.join(' ')}>
      {inp}
      <Grid strict justify="space-between" className={hintClass.join(' ')}>
        <Column className="left">
          {(displayValid && valid) || (displayErr && error) || hint}
        </Column>
        {hintRight && <Column className="right">{hintRight}</Column>}
      </Grid>
    </div>
  );
};

const renderTextarea = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  label,
  placeholder,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange],
  );
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );

  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      <textarea
        id={fieldid}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder={placeholder}
      />
    </Fragment>
  );
};

const FieldTextarea = (props) => {
  const j = ['textarea'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderTextarea,
  });
  return <Field {...k} />;
};

const renderCheckbox = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
}) => {
  const checked = Array.isArray(value) && new Set(value).has(option);
  const handleChange = useCallback(
    (e) => {
      const v = new Set(value);
      if (e.target.checked) {
        v.add(option);
      } else {
        v.delete(option);
      }
      onChange(name, Array.from(v).sort());
    },
    [name, value, option, onChange],
  );
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );
  return (
    <Fragment>
      <input
        id={fieldid}
        type="checkbox"
        name={name}
        value={option}
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
      {label && <label htmlFor={fieldid}>{label}</label>}
    </Fragment>
  );
};

const FieldCheckbox = (props) => {
  const j = ['checkbox'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderCheckbox,
  });
  return <Field {...k} />;
};

const renderToggle = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(name, e.target.checked);
    },
    [name, onChange],
  );
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );
  return (
    <Fragment>
      <input
        id={fieldid}
        type="checkbox"
        name={name}
        value={option}
        checked={value}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
      {label && <label htmlFor={fieldid}>{label}</label>}
    </Fragment>
  );
};

const FieldToggle = (props) => {
  const j = ['toggle'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderToggle,
  });
  return <Field {...k} />;
};

const FieldSwitch = (props) => {
  const j = ['toggle switch'];
  if (props.success) {
    j.push('success');
  } else if (props.danger) {
    j.push('danger');
  }
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderToggle,
  });
  return <Field {...k} />;
};

const renderRadio = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
}) => {
  const checked = value === option;
  const handleChange = useCallback(
    (e) => {
      if (e.target.checked) {
        onChange(name, option);
      }
    },
    [name, option, onChange],
  );
  const handleSubmit = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit();
      }
    },
    [onSubmit],
  );
  return (
    <Fragment>
      <input
        id={fieldid}
        type="radio"
        name={name}
        value={option}
        checked={checked}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
      {label && <label htmlFor={fieldid}>{label}</label>}
    </Fragment>
  );
};

const FieldRadio = (props) => {
  const j = ['radio'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderRadio,
  });
  return <Field {...k} />;
};

const FileFieldItem = ({index, file, handleDelete}) => {
  const onClick = useCallback(() => {
    handleDelete(index);
  }, [index, handleDelete]);
  return (
    <ListItem>
      <Grid justify="space-between" align="center">
        <Column>{file.name}</Column>
        <Column>
          <ButtonSmall label="remove file" onClick={onClick}>
            &times;
          </ButtonSmall>
        </Column>
      </Grid>
    </ListItem>
  );
};

const renderFile = ({accept, capture, multiple}) => ({
  fieldid,
  name,
  onChange,
  onSubmit,
  label,
  children,
}) => {
  const fileinput = useRef(null);
  const [files, setFiles] = useState([]);
  const handleDelete = useCallback(
    (index) => {
      if (!multiple) {
        setFiles([]);
        onChange(name, undefined);
        return;
      }
      const next = files.slice(0);
      next.splice(index, 1);
      setFiles(next);
      onChange(
        name,
        next.map((i) => i.file),
      );
    },
    [name, files, setFiles, multiple],
  );
  const handleChange = useCallback(
    (e) => {
      const k = e.target.files;
      if (!multiple) {
        if (k.length < 1) {
          return;
        }
        const next = k[0];
        setFiles([{key: randomID(), file: k[0]}]);
        onChange(name, next);
        return;
      }
      const next = files.slice(0);
      for (let i = 0; i < k.length; i++) {
        next.push({key: randomID(), file: k[i]});
      }
      setFiles(next);
      onChange(
        name,
        next.map((i) => i.file),
      );
    },
    [name, files, setFiles, multiple, onChange],
  );
  const handleClick = useCallback(() => {
    if (fileinput.current) {
      fileinput.current.click();
    }
  }, [fileinput]);
  return (
    <Fragment>
      {label && <div className="label">{label}</div>}
      <label htmlFor={fieldid} onClick={handleClick}>
        {children}
      </label>
      <input
        ref={fileinput}
        id={fieldid}
        tabIndex="-1"
        type="file"
        name={name}
        onChange={handleChange}
        accept={accept}
        capture={capture}
        multiple={multiple}
      />
      {files.length > 0 && (
        <ListGroup className="filelist">
          {files.map((i, index) => (
            <FileFieldItem
              key={i.key}
              index={index}
              file={i.file}
              handleDelete={handleDelete}
            />
          ))}
        </ListGroup>
      )}
    </Fragment>
  );
};

const FieldFile = (props) => {
  const {accept, capture, multiple} = props;
  const render = useMemo(() => renderFile({accept, capture, multiple}), [
    accept,
    capture,
  ]);
  const j = ['file'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render,
  });
  return <Field {...k} />;
};

const renderSelect = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  options,
  label,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(name, e.target.value);
    },
    [name, onChange],
  );
  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      <select id={fieldid} value={value} onChange={handleChange}>
        {options.map((i) => (
          <option key={i.display} value={i.value}>
            {i.display}
          </option>
        ))}
      </select>
      <div className="arrow"></div>
    </Fragment>
  );
};

const FieldSelect = (props) => {
  const j = ['select'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderSelect,
  });
  return <Field {...k} />;
};

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

const MAX_SUGGESTIONS = 128;

const suggestOptMap = (i) => i;

const SuggestFieldOption = ({fieldRef, close, setValue, value}) => {
  const handler = useCallback(() => {
    setValue(value);
    close();
    if (fieldRef) {
      fieldRef.blur();
    }
  }, [fieldRef, close, setValue, value]);

  return (
    <div className="option" onClick={handler} onMouseDown={preventDefault}>
      {value}
    </div>
  );
};

const renderSuggest = ({
  fieldid,
  type,
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
}) => {
  const [anchor, anchorRef] = useStateRef(null);
  const [show, setShow] = useState(false);
  const setVisible = useCallback(() => {
    setShow(true);
  }, [setShow]);
  const setHidden = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const setValue = useCallback(
    (v) => {
      onChange(name, v);
    },
    [name, onChange],
  );

  const filteredOpts = useMemo(
    () => fuzzyFilter(MAX_SUGGESTIONS, options, suggestOptMap, value),
    [options, value],
  );

  const first = filteredOpts.length > 0 ? filteredOpts[0] : null;

  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue],
  );
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (first !== null && show) {
          setValue(first);
          setShow(false);
          if (anchor) {
            anchor.blur();
          }
        }
      }
    },
    [anchor, show, setShow, setValue, first],
  );

  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      {renderNormal({
        fieldid,
        type,
        name,
        value,
        onChange: handleChange,
        onKeyDown,
        onFocus: setVisible,
        onBlur: setHidden,
        placeholder,
        forwardedRef: anchorRef,
      })}
      {show && filteredOpts.length > 0 && (
        <Popover anchor={anchor} className="field-suggest-options" matchWidth>
          {filteredOpts.map((i) => (
            <SuggestFieldOption
              key={i}
              fieldRef={anchor}
              close={setHidden}
              setValue={setValue}
              value={i}
            />
          ))}
        </Popover>
      )}
    </Fragment>
  );
};

const FieldSuggest = (props) => {
  const j = ['suggest'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderSuggest,
  });
  return <Field {...k} />;
};

const MAX_MULTISELECT_OPTS = 128;

const multiselectOptMap = (i) => i;

const MultiSelectFieldOption = ({
  selected,
  setSearch,
  addValue,
  rmValue,
  value,
}) => {
  const handler = useCallback(() => {
    if (selected) {
      rmValue(value);
    } else {
      addValue(value);
    }
    setSearch('');
  }, [selected, setSearch, addValue, rmValue, value]);
  const k = ['option'];
  if (selected) {
    k.push('selected');
  }
  return (
    <div className={k.join(' ')} onClick={handler} onMouseDown={preventDefault}>
      {value}
    </div>
  );
};

const MultiSelectFieldValue = ({rmValue, value}) => {
  const handler = useCallback(() => {
    rmValue(value);
  }, [rmValue, value]);
  return (
    <Chip className="value" onClick={handler}>
      {value} &times;
    </Chip>
  );
};

const renderMultiSelect = ({
  fieldid,
  type,
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
}) => {
  const [anchor, anchorRef] = useStateRef(null);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const setVisible = useCallback(() => {
    setShow(true);
  }, [setShow]);
  const setHidden = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const addValue = useCallback(
    (v) => {
      const next = new Set(value);
      next.add(v);
      onChange(name, Array.from(next).sort());
    },
    [name, onChange, value],
  );
  const rmValue = useCallback(
    (v) => {
      const next = new Set(value);
      next.delete(v);
      onChange(name, Array.from(next).sort());
    },
    [name, onChange, value],
  );

  const filteredOpts = useMemo(
    () => fuzzyFilter(MAX_MULTISELECT_OPTS, options, multiselectOptMap, search),
    [options, search],
  );

  const first = filteredOpts.length > 0 ? filteredOpts[0] : null;

  const handleSearch = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (first !== null && show) {
          addValue(first);
          setSearch('');
        }
      }
    },
    [show, setSearch, addValue, first],
  );

  const valueSet = new Set(value);

  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      {Array.isArray(value) && value.length > 0 && (
        <div className="value-list">
          {value.map((i) => (
            <MultiSelectFieldValue key={i} rmValue={rmValue} value={i} />
          ))}
        </div>
      )}
      {renderNormal({
        fieldid,
        type,
        value: search,
        onChange: handleSearch,
        onKeyDown,
        onFocus: setVisible,
        onBlur: setHidden,
        placeholder,
        forwardedRef: anchorRef,
      })}
      {show && filteredOpts.length > 0 && (
        <Popover
          anchor={anchor}
          className="field-multiselect-options"
          matchWidth
        >
          {filteredOpts.map((i) => (
            <MultiSelectFieldOption
              key={i}
              selected={valueSet.has(i)}
              setSearch={setSearch}
              addValue={addValue}
              rmValue={rmValue}
              value={i}
            />
          ))}
        </Popover>
      )}
    </Fragment>
  );
};

const FieldMultiSelect = (props) => {
  const j = ['multiselect'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: renderMultiSelect,
  });
  return <Field {...k} />;
};

const useForm = (initState = {}) => {
  const [formState, setFormState] = useState(initState);
  const updateForm = useCallback(
    (name, val) =>
      setFormState((prev) => Object.assign({}, prev, {[name]: val})),
    [setFormState],
  );
  return [formState, updateForm];
};

export {
  Field as default,
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
  fuzzyFilter,
};
