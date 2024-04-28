import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type FormHTMLAttributes,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

import {isNil, isNonNil} from '#internal/computil/index.js';

export type FormValue = number | string | readonly string[] | undefined;
export type FormState = Record<string, FormValue>;

export interface FormCtx {
  readonly state: FormState;
  readonly reset: () => void;
  readonly change: (name: string, val: FormValue) => void;
  readonly inputIDPrefix: string;
}

const FormContext = createContext<FormCtx | undefined>(undefined);

export type FormHookCtx<T extends FormState> = {
  readonly state: T;
  readonly initState: T;
  readonly setState: Dispatch<SetStateAction<T>>;
  readonly update: <K extends keyof T>(name: K, val: T[K]) => void;
  readonly assign: (vals: Partial<T>) => void;
  readonly reset: () => void;
  readonly change: (name: string, val: FormValue) => void;
  readonly inputIDPrefix: string;
};

export const useForm = <T extends FormState>(initState: T): FormHookCtx<T> => {
  const inputIDPrefix = useId();
  const [state, setState] = useState(initState);
  const update = useCallback(
    <K extends keyof T>(name: K, val: T[K]) => {
      setState((prev) => Object.assign({}, prev, {[name]: val}));
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
  const change = useCallback(
    (name: string, val: FormValue) => {
      setState((prev) => Object.assign({}, prev, {[name]: val}));
    },
    [setState],
  );
  const form = useMemo(
    () => ({
      state,
      initState,
      setState,
      update,
      assign,
      reset,
      change,
      inputIDPrefix,
    }),
    [state, initState, setState, update, assign, reset, change, inputIDPrefix],
  );
  return form;
};

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  readonly form: FormCtx;
};

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps>>(
  ({form, onSubmit, onReset, children, ...props}, ref) => {
    const handleSubmit = useCallback(
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isNonNil(onSubmit)) {
          onSubmit(e);
        }
      },
      [onSubmit],
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
          onReset={handleReset}
          {...props}
        >
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);

const calcInputID = (
  id: string | undefined,
  form: FormCtx | undefined,
  inputType: HTMLInputTypeAttribute | undefined,
  name: string | undefined,
  value: FormValue,
) => {
  if (isNonNil(id)) {
    return id;
  }

  if (isNil(form) || isNil(name)) {
    return undefined;
  }

  const isRadio = inputType === 'radio';

  if (isRadio) {
    if (typeof value === 'string') {
      return `${form.inputIDPrefix}-${name}-${value}`;
    }
    return undefined;
  }

  return `${form.inputIDPrefix}-${name}`;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({type: inputType, name, value, checked, onChange, id, ...props}, ref) => {
    const form = useContext(FormContext);

    const isCheckbox = inputType === 'checkbox';
    const isRadio = inputType === 'radio';
    const isFile = inputType === 'file';
    const isOther = !isCheckbox && !isRadio && !isFile;

    const formChange = form?.change;
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
        if (isNonNil(name)) {
          formChange?.(name, e.target.value);
        }
      },
      [name, formChange, onChange],
    );

    const formValue = isNonNil(name) ? form?.state[name] : undefined;
    const valueProp = value ?? (isOther ? formValue : undefined);
    const checkedProp =
      checked ?? (isRadio && isNonNil(value) ? value === formValue : undefined);

    const idProp = calcInputID(id, form, inputType, name, value);

    return (
      <input
        ref={ref}
        type={inputType}
        name={name}
        value={valueProp}
        checked={checkedProp}
        onChange={handleChange}
        id={idProp}
        {...props}
      />
    );
  },
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  readonly inputType?: HTMLInputTypeAttribute | undefined;
  readonly inputName?: string | undefined;
  readonly inputValue?: FormValue;
};

export const Label = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({inputType, inputName, inputValue, htmlFor, children, ...props}, ref) => {
  const form = useContext(FormContext);
  const htmlForProp = calcInputID(
    htmlFor,
    form,
    inputType,
    inputName,
    inputValue,
  );
  return (
    <label ref={ref} htmlFor={htmlForProp} {...props}>
      {children}
    </label>
  );
});
