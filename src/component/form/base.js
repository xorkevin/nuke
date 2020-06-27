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
import Popover from '../popover';
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
      {label && <div className="label">{label}</div>}
      <label htmlFor={fieldid}>{children}</label>
      <input
        id={fieldid}
        type="file"
        name={name}
        onChange={handleChange}
        onKeyDown={handleSubmit}
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
      <select
        id={fieldid}
        value={value}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      >
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
  const s = search.toLowerCase();
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
    if (fieldRef.current) {
      fieldRef.current.blur();
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
  const anchor = useRef(null);
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
          if (anchor.current) {
            anchor.current.blur();
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
        forwardedRef: anchor,
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

const OptionsContainer = ({align, position, fixed, reference, children}) => {
  const [bounds, setBounds] = useState(
    reference.current.getBoundingClientRect(),
  );
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    let running = null;
    const handler = () => {
      if (!running) {
        running = window.requestAnimationFrame(() => {
          setBounds(reference.current.getBoundingClientRect());
          setScrollY(window.scrollY);
          running = null;
        });
      }
    };
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler);
      if (running) {
        window.cancelAnimationFrame(running);
      }
    };
  }, [reference, setBounds, setScrollY]);

  const k = ['input-options'];
  const s = {};

  if (align === 'right') {
    s.left = bounds.right;
    k.push('right');
  } else {
    s.left = bounds.left;
    k.push('left');
  }
  if (position === 'top') {
    s.top = bounds.top;
    k.push('top');
  } else {
    s.top = bounds.bottom;
    k.push('bottom');
  }
  if (fixed) {
    k.push('fixed');
  } else {
    s.top += scrollY;
  }

  const so = {
    width: bounds.right - bounds.left,
  };

  return (
    <div className={k.join(' ')} style={s}>
      <div className="options-container" style={so}>
        {children}
      </div>
    </div>
  );
};

const Option = ({close, reference, setValue, value, selected, children}) => {
  const handler = useCallback(() => {
    setValue(value);
    close();
    reference.current.blur();
  }, [close, reference, setValue, value]);

  const k = [];
  if (selected) {
    k.push('selected');
  }

  return (
    <div className={k.join(' ')} onMouseDown={preventDefault} onClick={handler}>
      {children}
    </div>
  );
};

const SelectValue = ({rmValue, value}) => {
  const handler = useCallback(() => {
    rmValue(value);
  }, [rmValue, value]);

  return (
    <span className="select-value" onClick={handler}>
      <Chip>
        {value} <FaIcon icon="times" />
      </Chip>
    </span>
  );
};

const Select = ({
  id,
  type,
  name,
  value,
  multiple,
  onChange,
  align,
  position,
  fixed,
  dropdowninput,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [hidden, setHidden] = useState(true);
  const [index, setIndex] = useState(0);
  const optelem = useRef(null);

  const setHiddenHandler = useCallback(() => {
    setHidden(true);
    setIndex(0);
  }, [setHidden, setIndex]);

  const setVisibleHandler = useCallback(() => {
    setHidden(false);
    setIndex(0);
  }, [setHidden, setIndex]);

  const rmValue = useCallback(
    (v) => {
      const k = new Set(value);
      k.delete(v);
      onChange(name, Array.from(k).sort());
    },
    [onChange, name, value],
  );

  const setValueMultiple = useCallback(
    (v) => {
      const k = new Set(value);
      k.add(v);
      onChange(name, Array.from(k).sort());
      setSearchVal('');
      onChange('_search_' + name, '');
    },
    [setSearchVal, onChange, name, value],
  );

  const setValueSingle = useCallback(
    (v) => {
      onChange(name, v);
    },
    [onChange, name],
  );

  const setValue = multiple ? setValueMultiple : setValueSingle;

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        setIndex((i) => {
          let k = i + 1;
          if (k > dropdowninput.length - 1 || k < 0) {
            k = 0;
          }
          return k;
        });
      } else if (e.key === 'ArrowUp') {
        setIndex((i) => {
          let k = i - 1;
          if (k < 0 || k > dropdowninput.length - 1) {
            k = dropdowninput.length - 1;
          }
          return k;
        });
      } else if (e.key === 'Enter') {
        if (dropdowninput.length > 0 && !hidden) {
          let k = index;
          if (k < 0 || k > dropdowninput.length - 1) {
            k = 0;
          }
          setValue(dropdowninput[k].value);
          setHidden(true);
          setIndex(0);
        }
      }
    },
    [setIndex, setHidden, setValue, dropdowninput, index, hidden],
  );

  const handleChange = useCallback(
    (e) => {
      if (hidden) {
        setHidden(false);
      }
      if (multiple) {
        setSearchVal(e.target.value);
        onChange('_search_' + name, e.target.value);
      } else {
        onChange(name, e.target.value);
      }
    },
    [setHidden, setSearchVal, onChange, name, multiple, hidden],
  );

  const k = [];
  if (multiple && Array.isArray(value) && value.length > 0) {
    k.push('shift');
  }

  return (
    <Fragment>
      {optelem.current &&
        !hidden &&
        ReactDOM.createPortal(
          <OptionsContainer
            align={align}
            position={position}
            fixed={fixed}
            reference={optelem}
          >
            {dropdowninput.map((i, idx) => (
              <Option
                key={i.value}
                close={setHiddenHandler}
                reference={optelem}
                setValue={setValue}
                value={i.value}
                selected={index === idx}
              >
                {i.value}
              </Option>
            ))}
          </OptionsContainer>,
          document.body,
        )}
      {multiple && (
        <span>
          {Array.isArray(value) &&
            value.map((i) => (
              <SelectValue key={i} rmValue={rmValue} value={i} />
            ))}
        </span>
      )}
      <input
        ref={optelem}
        id={id}
        className={k.join(' ')}
        type={type}
        name={name}
        value={multiple ? searchVal : value}
        onChange={handleChange}
        placeholder=" "
        onFocus={setVisibleHandler}
        onBlur={setHiddenHandler}
        onKeyDown={handleKeyDown}
      />
    </Fragment>
  );
};

const Input = ({
  type,
  name,
  value,
  onChange,
  onEnter,
  label,
  info,
  error,
  valid,
  dropdown,
  multiple,
  dropdowninput,
  textarea,
  toggle,
  accept,
  capture,
  checked,
  wide,
  fullWidth,
}) => {
  const id = useMemo(randomID, []);

  const context = useContext(FormContext);
  if (context) {
    if (context.formState) {
      if (type === 'radio' || type === 'checkbox') {
        checked = checked || context.formState[name];
      } else {
        value = value || context.formState[name];
      }
    }
    onChange = onChange || context.onChange;
    if (!textarea && !dropdowninput) {
      onEnter = onEnter || context.onEnter;
    }
    if (context.error) {
      error = error || context.error[name];
    }
    if (context.valid) {
      valid = valid || context.valid[name];
    }
  }

  const changeFunc = useMemo(() => {
    if (!onChange) {
      return () => {};
    }
    return onChange;
  }, [onChange]);

  const handleChange = useMemo(() => {
    switch (type) {
      case 'file':
        return (e) => {
          if (e.target.files.length < 1) {
            changeFunc(name, undefined);
          } else {
            changeFunc(name, e.target.files[0]);
          }
        };
      case 'checkbox':
        return (e) => {
          changeFunc(name, e.target.checked);
        };
      default:
        return (e) => {
          changeFunc(name, e.target.value);
        };
    }
  }, [type, name, changeFunc]);

  const handleEnter = useMemo(() => {
    if (!onEnter) {
      return () => {};
    }
    return (e) => {
      if (e.key === 'Enter') {
        onEnter();
      }
    };
  }, [onEnter]);

  const k = ['input'];

  if (valid) {
    k.push('valid');
  } else if (error) {
    k.push('invalid');
  }

  switch (type) {
    case 'file':
    case 'radio':
    case 'checkbox':
      k.push(type);
      break;
    default:
      k.push('normal');
  }

  if (toggle) {
    k.push('toggle');
  }

  if (wide) {
    k.push('wide');
  } else if (fullWidth) {
    k.push('full-width');
  }

  let inp = null;
  if (dropdowninput && Array.isArray(dropdowninput)) {
    inp = (
      <Select
        id={id}
        type={type}
        name={name}
        value={value}
        multiple={multiple}
        onChange={changeFunc}
        dropdowninput={dropdowninput}
      />
    );
  } else if (dropdown && Array.isArray(dropdown)) {
    inp = (
      <select
        id={id}
        value={value}
        multiple={multiple}
        onChange={handleChange}
        onKeyDown={handleEnter}
      >
        {dropdown.map((i) => (
          <option key={i.value} value={i.value}>
            {i.text}
          </option>
        ))}
      </select>
    );
  } else if (textarea) {
    inp = (
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleEnter}
        placeholder=" "
      />
    );
  } else {
    switch (type) {
      case 'file':
        inp = (
          <input
            id={id}
            type={type}
            name={name}
            onChange={handleChange}
            onKeyDown={handleEnter}
            accept={accept}
            capture={capture}
            placeholder=" "
          />
        );
        break;
      case 'radio':
        inp = (
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            checked={checked === value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder=" "
          />
        );
        break;
      case 'checkbox':
        inp = (
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            checked={checked}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder=" "
          />
        );
        break;
      default:
        inp = (
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder=" "
          />
        );
    }
  }

  let errDisplay = false;
  if (typeof error !== 'boolean') {
    errDisplay = true;
  }

  return (
    <div className={k.join(' ')}>
      {inp}
      <label htmlFor={id}>{label}</label>
      {dropdown && <div className="dropdown-arrow" />}
      {!error && info && <span className="info">{info}</span>}
      {error && (
        <span className="error">
          {!errDisplay && info}
          {errDisplay && error}
        </span>
      )}
    </div>
  );
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
  Input,
  Form,
  useForm,
  fuzzyFilter,
};
