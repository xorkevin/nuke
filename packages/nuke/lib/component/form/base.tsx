import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type FormEvent,
  type FormHTMLAttributes,
  type ForwardedRef,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type PropsWithChildren,
  type SelectHTMLAttributes,
  type SetStateAction,
  type TextareaHTMLAttributes,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  classNames,
  isArray,
  isNil,
  isNonNil,
  mergeRefs,
  modClassNames,
} from '#internal/computil/index.js';

import styles from './styles.module.css';

export type FormValue =
  | File
  | boolean
  | number
  | string
  | readonly File[]
  | readonly string[]
  | undefined;
export type FormState = Record<string, FormValue>;

export interface FormCtx {
  readonly state: FormState;
}

const FormContext = createContext<FormCtx | undefined>(undefined);

export interface FieldCtx {
  readonly id: string;
}

const FieldContext = createContext<FieldCtx | undefined>(undefined);

export type FormHook<T extends FormState> = {
  readonly state: T;
  readonly setState: Dispatch<SetStateAction<T>>;
  readonly update: <K extends keyof T>(
    name: K,
    val: T[K] | ((prev: T[K]) => T[K]),
  ) => void;
  readonly assign: (vals: Partial<T>) => void;
  readonly reset: () => void;
};

export const useForm = <T extends FormState>(
  initState: T | (() => T),
): FormHook<T> => {
  const [state, setState] = useState(initState);
  const update = useCallback(
    <K extends keyof T>(name: K, val: T[K] | ((prev: T[K]) => T[K])) => {
      setState((prev) => {
        const next = typeof val === 'function' ? val(prev[name]) : val;
        return Object.assign({}, prev, {[name]: next});
      });
    },
    [setState],
  );
  const assign = useCallback(
    (vals: Partial<T>) => {
      setState((prev) => Object.assign({}, prev, vals));
    },
    [setState],
  );
  const reset = useCallback(() => {
    setState(initState);
  }, [setState, initState]);
  const form = useMemo(
    () => ({
      state,
      setState,
      update,
      assign,
      reset,
    }),
    [state, setState, update, assign, reset],
  );
  return form;
};

export type FormProps<T extends FormState> =
  FormHTMLAttributes<HTMLFormElement> & {
    readonly form: Pick<FormHook<T>, 'reset' | 'state' | 'update'>;
  };

export const Form = forwardRef(
  <T extends FormState>(
    {
      form,
      onSubmit,
      onChange,
      onReset,
      children,
      ...props
    }: PropsWithChildren<FormProps<T>>,
    ref: ForwardedRef<HTMLFormElement>,
  ) => {
    const handleSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isNonNil(onSubmit)) {
          onSubmit(e);
        }
      },
      [onSubmit],
    );
    const formUpdate = form.update;
    const handleChange = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
        const target = e.target;
        if (target instanceof HTMLInputElement) {
          const name = target.name;
          if (isNonNil(name) && name !== '') {
            if (target.type === 'checkbox') {
              if (isNil(target.value) || target.value === '') {
                formUpdate(name, target.checked as T[typeof name]);
              } else {
                formUpdate(name, (prev: T[typeof name]): T[typeof name] => {
                  const s = new Set(isArray(prev) ? prev : []);
                  if (target.checked) {
                    s.add(target.value);
                  } else {
                    s.delete(target.value);
                  }
                  return Array.from(s) as unknown as T[typeof name];
                });
              }
            } else if (target.type === 'file') {
              const files = Array.from(target.files ?? []);
              if (target.multiple) {
                formUpdate(name, files as unknown as T[typeof name]);
              } else {
                if (files.length === 0) {
                  formUpdate(name, undefined as T[typeof name]);
                } else {
                  formUpdate(name, files[0] as T[typeof name]);
                }
              }
            } else {
              formUpdate(name, target.value as T[typeof name]);
            }
          }
        } else if (target instanceof HTMLTextAreaElement) {
          const name = target.name;
          if (isNonNil(name) && name !== '') {
            formUpdate(name, target.value as T[typeof name]);
          }
        } else if (target instanceof HTMLSelectElement) {
          const name = target.name;
          if (isNonNil(name) && name !== '') {
            const selected = Array.from(target.selectedOptions).map(
              (v) => v.value,
            );
            if (target.multiple) {
              formUpdate(name, selected as unknown as T[typeof name]);
            } else {
              if (selected.length === 0) {
                formUpdate(name, undefined as T[typeof name]);
              } else {
                formUpdate(name, selected[0] as T[typeof name]);
              }
            }
          }
        }
      },
      [formUpdate, onChange],
    );
    const formReset = form.reset;
    const handleReset = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isNonNil(onReset)) {
          onReset(e);
        }
        formReset();
      },
      [formReset, onReset],
    );
    return (
      <FormContext.Provider value={form}>
        <form
          ref={ref}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onReset={handleReset}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);

export const Field: FC<PropsWithChildren> = ({children}) => {
  const id = useId();
  const field = useMemo(() => ({id}), [id]);
  return (
    <FieldContext.Provider value={field}>{children}</FieldContext.Provider>
  );
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  toggleSwitch?: boolean | undefined;
  fullWidth?: boolean | undefined;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      toggleSwitch,
      fullWidth,
      id,
      type: inputType,
      name,
      value,
      checked,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const localRef = useRef<HTMLInputElement>(null);
    const mergedInputRef = useMemo(
      () => mergeRefs(ref, localRef),
      [ref, localRef],
    );

    const form = useContext(FormContext);
    const field = useContext(FieldContext);

    const idProp = id ?? field?.id;

    const isCheckbox = inputType === 'checkbox';
    const isRadio = inputType === 'radio';
    const isFile = inputType === 'file';
    const isOther = !isCheckbox && !isRadio && !isFile;

    const formValue = isNonNil(name) ? form?.state[name] : undefined;
    const valueProp = (() => {
      if (isNonNil(value)) {
        return value;
      }
      if (isOther) {
        if (typeof formValue === 'boolean' || typeof formValue === 'object') {
          return undefined;
        }
        return formValue;
      }
      return undefined;
    })();
    const checkedProp = (() => {
      if (isNonNil(checked)) {
        return checked;
      }
      if (isRadio) {
        if (isNil(value)) {
          return undefined;
        }
        return value === formValue;
      }
      if (isCheckbox) {
        if (isNil(value) || value === '') {
          return formValue === true;
        }
        return isArray(formValue) && formValue.some((v) => v === value);
      }
      return undefined;
    })();

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
      },
      [onChange],
    );

    useEffect(() => {
      if (!isFile) {
        return;
      }
      if (isNil(localRef.current)) {
        return;
      }
      const controller = new AbortController();
      localRef.current.addEventListener(
        'cancel',
        (e) => {
          if (e.currentTarget instanceof HTMLInputElement) {
            // clear file input when canceled
            e.currentTarget.value = '';
            e.currentTarget.dispatchEvent(new Event('change', {bubbles: true}));
          }
        },
        {signal: controller.signal},
      );
      return () => {
        controller.abort();
      };
    }, [isFile, localRef]);

    const fileValueIsEmpty =
      isFile &&
      (isNil(formValue) || (isArray(formValue) && formValue.length === 0));
    useEffect(() => {
      if (!fileValueIsEmpty) {
        return;
      }
      if (isNil(localRef.current)) {
        return;
      }
      // clear file input when form value is empty
      localRef.current.value = '';
    }, [localRef, fileValueIsEmpty]);

    const c = classNames(
      modClassNames(styles, {
        input: true,
        'toggle-switch': toggleSwitch,
        'full-width': fullWidth,
      }),
      className,
    );

    return (
      <input
        ref={mergedInputRef}
        id={idProp}
        type={inputType}
        name={name}
        value={valueProp}
        checked={checkedProp}
        onChange={handleChange}
        className={c}
        {...props}
      />
    );
  },
);

export enum TextareaResize {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fullWidth?: boolean | undefined;
  resize?: TextareaResize | boolean | undefined;
  monospace?: boolean | undefined;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      fullWidth,
      resize,
      monospace,
      id,
      name,
      value,
      onChange,
      className,
      ...props
    },
    ref,
  ) => {
    const form = useContext(FormContext);
    const field = useContext(FieldContext);

    const idProp = id ?? field?.id;

    const formValue = isNonNil(name) ? form?.state[name] : undefined;
    const valueProp = (() => {
      if (isNonNil(value)) {
        return value;
      }
      if (typeof formValue === 'boolean' || typeof formValue === 'object') {
        return undefined;
      }
      return formValue;
    })();

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
      },
      [onChange],
    );

    const c = classNames(
      modClassNames(styles, {
        textarea: true,
        'full-width': fullWidth,
        'resize-vertical': resize === TextareaResize.Vertical,
        'resize-horizontal': resize === TextareaResize.Horizontal,
        'resize-none': resize === false,
        monospace,
      }),
      className,
    );

    return (
      <textarea
        ref={ref}
        id={idProp}
        name={name}
        value={valueProp}
        onChange={handleChange}
        className={c}
        {...props}
      />
    );
  },
);

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  fullWidth?: boolean | undefined;
};

export const Select = forwardRef<
  HTMLSelectElement,
  PropsWithChildren<SelectProps>
>(
  (
    {fullWidth, id, name, value, onChange, className, children, ...props},
    ref,
  ) => {
    const form = useContext(FormContext);
    const field = useContext(FieldContext);

    const idProp = id ?? field?.id;

    const formValue = isNonNil(name) ? form?.state[name] : undefined;
    const valueProp = (() => {
      if (isNonNil(value)) {
        return value;
      }
      if (typeof formValue === 'boolean') {
        return undefined;
      }
      if (isArray(formValue)) {
        if (formValue.every((v): v is string => typeof v === 'string')) {
          return formValue;
        }
        return undefined;
      }
      if (typeof formValue === 'object') {
        return undefined;
      }
      return formValue;
    })();

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
      },
      [onChange],
    );

    const c = classNames(
      modClassNames(styles, {
        select: true,
        'full-width': fullWidth,
      }),
      className,
    );

    return (
      <select
        ref={ref}
        id={idProp}
        name={name}
        value={valueProp}
        onChange={handleChange}
        className={c}
        {...props}
      >
        {children}
      </select>
    );
  },
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({htmlFor, className, children, ...props}, ref) => {
  const field = useContext(FieldContext);
  const htmlForProp = htmlFor ?? field?.id;
  const c = classNames(modClassNames(styles, 'label'), className);
  return (
    <label ref={ref} htmlFor={htmlForProp} className={c} {...props}>
      {children}
    </label>
  );
});
