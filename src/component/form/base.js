import {
  createElement,
  createContext,
  Fragment,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
  useRef,
} from 'react';
import {randomID} from '../../utility';
import {Popover, useStateRef} from '../popover';
import {Grid, Column} from '../grid';
import {ListGroup, ListItem} from '../listgroup';
import ButtonSmall from '../button/small';
import Chip from '../chip';
import FaIcon from '../faicon';

const FormContext = createContext();

const Form = ({
  formState,
  onChange,
  onSubmit,
  errCheck,
  validCheck,
  displays,
  addDisplay,
  compactDisplays,
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
    <FormContext.Provider
      value={{
        formState,
        onChange,
        onSubmit,
        error,
        valid,
        displays,
        addDisplay,
        compactDisplays,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const renderNormal = ({
  fieldid,
  type,
  inputMode,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
  forwardedRef,
}) => {
  return (
    <Grid className="field-row" strict nowrap align="center">
      {icon && (
        <Column className="icon left" shrink="0">
          {icon}
        </Column>
      )}
      <Column className="field" fullWidth>
        <input
          ref={forwardedRef}
          className="normal"
          id={fieldid}
          type={type}
          inputMode={inputMode}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          name={name}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          placeholder={placeholder}
        />
      </Column>
      {iconRight && (
        <Column className="icon right" shrink="0">
          {iconRight}
        </Column>
      )}
    </Grid>
  );
};

const preventDefault = (e) => {
  e.preventDefault();
};

const Field = ({
  className,
  render,
  type,
  inputMode,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  onSubmit,
  error,
  valid,
  option,
  onSearch,
  options,
  optionDisplays,
  addDisplay,
  compactDisplays,
  label,
  placeholder,
  icon,
  iconRight,
  hint,
  hintRight,
  nohint,
  disabled,
  readOnly,
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
    if (ctx.displays) {
      optionDisplays = ctx.displays[name];
    }
    if (ctx.addDisplay) {
      addDisplay = ctx.addDisplay;
    }
    if (ctx.compactDisplays) {
      compactDisplays = ctx.compactDisplays;
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

  if (disabled) {
    k.push('disabled');
  }

  let inp = null;
  if (render) {
    inp = createElement(
      render,
      {
        fieldid,
        type,
        inputMode,
        autoFocus,
        autoComplete,
        name,
        value,
        onChange: changeFunc,
        onSubmit: submitFunc,
        option,
        onSearch,
        options,
        optionDisplays,
        addDisplay,
        compactDisplays,
        label,
        placeholder,
        icon,
        iconRight,
        disabled,
        readOnly,
      },
      children,
    );
  } else {
    k.push('normal');
    inp = (
      <Fragment>
        {label && <label htmlFor={fieldid}>{label}</label>}
        {renderNormal({
          fieldid,
          type,
          inputMode,
          autoFocus,
          autoComplete,
          name,
          value,
          onChange: handleChange,
          onKeyDown: handleSubmit,
          placeholder,
          icon,
          iconRight,
          disabled,
          readOnly,
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

const RenderTextarea = ({
  fieldid,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  label,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
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
      <Grid className="field-row" strict nowrap align="center">
        {icon && (
          <Column className="icon left" shrink="0">
            {icon}
          </Column>
        )}
        <Column className="field" fullWidth>
          <textarea
            id={fieldid}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
          />
        </Column>
        {iconRight && (
          <Column className="icon right" shrink="0">
            {iconRight}
          </Column>
        )}
      </Grid>
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
    render: RenderTextarea,
  });
  return <Field {...k} />;
};

const RenderCheckbox = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
  disabled,
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
        disabled={disabled}
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
    render: RenderCheckbox,
  });
  return <Field {...k} />;
};

const RenderToggle = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
  disabled,
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
        disabled={disabled}
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
    render: RenderToggle,
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
    render: RenderToggle,
  });
  return <Field {...k} />;
};

const RenderRadio = ({
  fieldid,
  name,
  value,
  onChange,
  onSubmit,
  option,
  label,
  disabled,
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
        disabled={disabled}
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
    render: RenderRadio,
  });
  return <Field {...k} />;
};

const FileFieldItem = ({index, file, handleDelete}) => {
  const onClick = useCallback(() => {
    handleDelete(index);
  }, [index, handleDelete]);
  return (
    <ListItem>
      <Grid justify="space-between" align="center" nowrap>
        <Column className="file-field-item-name">{file.name}</Column>
        <Column shrink="0">
          <ButtonSmall label="remove file" onClick={onClick}>
            &times;
          </ButtonSmall>
        </Column>
      </Grid>
    </ListItem>
  );
};

const renderFile =
  ({accept, capture, multiple}) =>
  ({fieldid, name, onChange, label, disabled, children}) => {
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
      [onChange, name, files, setFiles],
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
      [onChange, name, files, setFiles],
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
          disabled={disabled}
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
  const render = useMemo(
    () => renderFile({accept, capture, multiple}),
    [accept, capture, multiple],
  );
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

const RenderSelect = ({
  fieldid,
  name,
  value,
  onChange,
  options,
  label,
  icon,
  iconRight,
  disabled,
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
      <Grid className="field-row" strict nowrap align="center">
        {icon && (
          <Column className="icon left" shrink="0">
            {icon}
          </Column>
        )}
        <Column className="field" fullWidth>
          <select
            id={fieldid}
            value={value}
            onChange={handleChange}
            disabled={disabled}
          >
            {options.map((i) => (
              <option key={i.value} value={i.value}>
                {i.display}
              </option>
            ))}
          </select>
          <div className="arrow"></div>
        </Column>
        {iconRight && (
          <Column className="icon right" shrink="0">
            {iconRight}
          </Column>
        )}
      </Grid>
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
    render: RenderSelect,
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

const RenderSuggest = ({
  fieldid,
  type,
  inputMode,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
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
        inputMode,
        autoFocus,
        autoComplete,
        name,
        value,
        onChange: handleChange,
        onKeyDown,
        onFocus: setVisible,
        onBlur: setHidden,
        placeholder,
        icon,
        iconRight,
        disabled,
        readOnly,
        forwardedRef: anchorRef,
      })}
      {show && !disabled && !readOnly && filteredOpts.length > 0 && (
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
    render: RenderSuggest,
  });
  return <Field {...k} />;
};

const MAX_SEARCHSELECT_OPTS = 128;

const searchselectOptMap = (i) => i.display;

const SearchSelectFieldOption = ({
  selected,
  closePopup,
  setValue,
  value,
  display,
}) => {
  const handler = useCallback(() => {
    setValue(value);
    closePopup();
  }, [closePopup, setValue, value]);
  const k = ['option'];
  if (selected) {
    k.push('selected');
  }
  return (
    <div className={k.join(' ')} onClick={handler} onMouseDown={preventDefault}>
      {display}
    </div>
  );
};

const RenderSearchSelect = ({
  fieldid,
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
}) => {
  const [anchor, anchorRef] = useStateRef(null);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const setHidden = useCallback(() => {
    setShow(false);
  }, [setShow]);
  const toggleVisible = useCallback(() => {
    setShow((i) => !i);
  }, [setShow]);
  const closePopup = useCallback(() => {
    setSearch('');
    setHidden();
  }, [setSearch, setHidden]);
  const setValue = useCallback(
    (v) => {
      onChange(name, v);
    },
    [name, onChange],
  );

  const filteredOpts = useMemo(
    () =>
      fuzzyFilter(MAX_SEARCHSELECT_OPTS, options, searchselectOptMap, search),
    [options, search],
  );
  const optionValueToDisplay = useMemo(
    () => Object.fromEntries(options.map((i) => [i.value, i.display])),
    [options],
  );

  const first = filteredOpts.length > 0 ? filteredOpts[0] : null;

  const handleSearch = useCallback(
    (_, value) => {
      setSearch(value);
    },
    [setSearch],
  );
  const onEnter = useCallback(() => {
    if (first !== null && show) {
      setValue(first.value);
      closePopup();
    }
  }, [show, closePopup, setValue, first]);

  const k = ['select-value'];
  if (!value || !value.length || value.length == 0) {
    k.push('placeholder');
  }

  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      <Grid className="field-row" strict nowrap align="center">
        {icon && (
          <Column className="icon left" shrink="0">
            {icon}
          </Column>
        )}
        <Column className="field" fullWidth>
          <Grid
            className="select-anchor"
            strict
            nowrap
            align="center"
            forwardedRef={anchorRef}
            onClick={toggleVisible}
          >
            <Column className={k.join(' ')} fullWidth>
              {optionValueToDisplay[value] || placeholder}
            </Column>
            <Column className="select-button" shrink="0">
              <ButtonSmall id={fieldid} disabled={disabled}>
                <FaIcon icon="angle-down" />
              </ButtonSmall>
            </Column>
          </Grid>
        </Column>
        {iconRight && (
          <Column className="icon right" shrink="0">
            {iconRight}
          </Column>
        )}
      </Grid>
      {show && !disabled && !readOnly && (
        <Popover
          anchor={anchor}
          className="field-searchselect-options"
          close={closePopup}
          matchWidth
        >
          <Field
            className="filter-box"
            noctx
            value={search}
            onChange={handleSearch}
            onSubmit={onEnter}
            placeholder="Filter..."
            nohint
            fullWidth
          />
          {filteredOpts.map((i) => (
            <SearchSelectFieldOption
              key={i.value}
              selected={i.value === value}
              closePopup={closePopup}
              setValue={setValue}
              value={i.value}
              display={i.display}
            />
          ))}
          {filteredOpts.length == 0 && (
            <div className="no-results">No results</div>
          )}
        </Popover>
      )}
    </Fragment>
  );
};

const FieldSearchSelect = (props) => {
  const j = ['searchselect'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: RenderSearchSelect,
  });
  return <Field {...k} />;
};

const MAX_MULTISELECT_OPTS = 128;

const multiselectOptMap = (i) => i.display;

const MultiSelectFieldOption = ({
  selected,
  setSearch,
  addValue,
  rmValue,
  value,
  display,
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
      {display}
    </div>
  );
};

const MultiSelectFieldValue = ({
  rmValue,
  value,
  display,
  disabled,
  readOnly,
}) => {
  const handler = useCallback(() => {
    if (disabled || readOnly) {
      return;
    }
    rmValue(value);
  }, [disabled, readOnly, rmValue, value]);
  return (
    <Chip className="value" onClick={handler}>
      {display} {!disabled && !readOnly && <Fragment>&times;</Fragment>}
    </Chip>
  );
};

const RenderMultiSelect = ({
  fieldid,
  type,
  inputMode,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  options,
  label,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
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
  const optionValueToDisplay = useMemo(
    () => Object.fromEntries(options.map((i) => [i.value, i.display])),
    [options],
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
          addValue(first.value);
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
            <MultiSelectFieldValue
              key={i}
              rmValue={rmValue}
              value={i}
              display={optionValueToDisplay[i]}
              disabled={disabled}
              readOnly={readOnly}
            />
          ))}
        </div>
      )}
      {renderNormal({
        fieldid,
        type,
        inputMode,
        autoFocus,
        autoComplete,
        value: search,
        onChange: handleSearch,
        onKeyDown,
        onFocus: setVisible,
        onBlur: setHidden,
        placeholder,
        icon,
        iconRight,
        disabled,
        readOnly,
        forwardedRef: anchorRef,
      })}
      {show && !disabled && !readOnly && filteredOpts.length > 0 && (
        <Popover
          anchor={anchor}
          className="field-multiselect-options"
          matchWidth
        >
          {filteredOpts.map((i) => (
            <MultiSelectFieldOption
              key={i.value}
              selected={valueSet.has(i.value)}
              setSearch={setSearch}
              addValue={addValue}
              rmValue={rmValue}
              value={i.value}
              display={i.display}
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
    render: RenderMultiSelect,
  });
  return <Field {...k} />;
};

const RenderDynMultiSelect = ({
  fieldid,
  type,
  inputMode,
  autoFocus,
  autoComplete,
  name,
  value,
  onChange,
  onSearch,
  options,
  optionDisplays,
  addDisplay,
  compactDisplays,
  label,
  placeholder,
  icon,
  iconRight,
  disabled,
  readOnly,
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
  const setSearchVal = useCallback(
    (v) => {
      setSearch(v);
      if (onSearch) {
        onSearch(v);
      }
    },
    [setSearch, onSearch],
  );
  const addValue = useCallback(
    (v) => {
      const next = new Set(value);
      next.add(v);
      if (addDisplay && Array.isArray(options)) {
        const k = options.find((i) => i.value === v);
        if (k) {
          addDisplay(name, v, k.display);
        }
      }
      onChange(name, Array.from(next).sort());
    },
    [name, onChange, addDisplay, value, options],
  );
  const rmValue = useCallback(
    (v) => {
      const next = new Set(value);
      next.delete(v);
      const k = Array.from(next).sort();
      onChange(name, k);
      if (compactDisplays) {
        compactDisplays(name, k);
      }
    },
    [name, onChange, compactDisplays, value],
  );

  const first =
    Array.isArray(options) && options.length > 0 ? options[0] : null;

  const handleSearch = useCallback(
    (e) => {
      setSearchVal(e.target.value);
    },
    [setSearchVal],
  );
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (first !== null && show) {
          addValue(first.value);
          setSearchVal('');
        }
      }
    },
    [show, setSearchVal, addValue, first],
  );

  const valueSet = new Set(value);

  return (
    <Fragment>
      {label && <label htmlFor={fieldid}>{label}</label>}
      {Array.isArray(value) && value.length > 0 && (
        <div className="value-list">
          {value.map((i) => (
            <MultiSelectFieldValue
              key={i}
              rmValue={rmValue}
              value={i}
              display={optionDisplays && optionDisplays[i]}
              disabled={disabled}
              readOnly={readOnly}
            />
          ))}
        </div>
      )}
      {renderNormal({
        fieldid,
        type,
        inputMode,
        autoFocus,
        autoComplete,
        value: search,
        onChange: handleSearch,
        onKeyDown,
        onFocus: setVisible,
        onBlur: setHidden,
        placeholder,
        icon,
        iconRight,
        disabled,
        readOnly,
        forwardedRef: anchorRef,
      })}
      {show &&
        !disabled &&
        !readOnly &&
        Array.isArray(options) &&
        options.length > 0 && (
          <Popover
            anchor={anchor}
            className="field-multiselect-options"
            matchWidth
          >
            {options.map((i) => (
              <MultiSelectFieldOption
                key={i.value}
                selected={valueSet.has(i.value)}
                setSearch={setSearchVal}
                addValue={addValue}
                rmValue={rmValue}
                value={i.value}
                display={i.display}
              />
            ))}
          </Popover>
        )}
    </Fragment>
  );
};

const FieldDynMultiSelect = (props) => {
  const j = ['multiselect'];
  if (props.className) {
    j.push(props.className);
  }
  const k = Object.assign({}, props, {
    className: j.join(' '),
    render: RenderDynMultiSelect,
  });
  return <Field {...k} />;
};

const useForm = (initState = {}, initDisplay = {}) => {
  const [state, setState] = useState(initState);
  const update = useCallback(
    (name, val) => setState((prev) => Object.assign({}, prev, {[name]: val})),
    [setState],
  );
  const assign = useCallback(
    (val) => setState((prev) => Object.assign({}, prev, val)),
    [setState],
  );

  const [displays, setDisplays] = useState(initDisplay);
  const addDisplay = useCallback(
    (name, value, display) => {
      setDisplays((prev) =>
        Object.assign({}, prev, {
          [name]: Object.assign({}, prev[name], {[value]: display}),
        }),
      );
    },
    [setDisplays],
  );
  const assignDisplays = useCallback(
    (name, val) => {
      setDisplays((prev) =>
        Object.assign({}, prev, {[name]: Object.assign({}, prev[name], val)}),
      );
    },
    [setDisplays],
  );
  const compactDisplays = useCallback(
    (name, values) => {
      if (!Array.isArray(values)) {
        return;
      }
      setDisplays((prev) => {
        if (!prev) {
          return prev;
        }
        const k = prev[name];
        if (!k) {
          return prev;
        }
        return Object.assign({}, prev, {
          [name]: Object.fromEntries(
            values.filter((i) => k[i]).map((i) => [i, k[i]]),
          ),
        });
      });
    },
    [setDisplays],
  );

  return {
    state,
    setState,
    update,
    assign,
    displays,
    setDisplays,
    addDisplay,
    assignDisplays,
    compactDisplays,
  };
};

const sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const useFormSearch = (searchFn, debounce = 256) => {
  const [search, setSearch] = useState('');
  const [opts, setOpts] = useState([]);
  useEffect(() => {
    if (search === '') {
      setOpts([]);
      return;
    }
    const cancelRef = {current: false};
    (async () => {
      await sleep(debounce);
      if (cancelRef.current) {
        return;
      }
      const res = await searchFn(search);
      if (cancelRef.current) {
        return;
      }
      if (!Array.isArray(res)) {
        return;
      }
      setOpts(res);
    })();
    return () => {
      cancelRef.current = true;
    };
  }, [search, debounce, searchFn, setOpts]);
  return {
    setSearch,
    opts,
  };
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
  FieldSearchSelect,
  FieldMultiSelect,
  FieldDynMultiSelect,
  Form,
  useForm,
  useFormSearch,
  fuzzyFilter,
};
