import {
  type ChangeEvent,
  type Dispatch,
  type FormHTMLAttributes,
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

import {isNonNil} from '#internal/computil/index.js';

export type FormValue = number | string | readonly string[] | undefined;
export type FormState = Record<string, FormValue>;

export interface FormCtx {
  readonly state: FormState;
  readonly change: (name: string, val: FormValue) => void;
  readonly inputIDPrefix: string;
}

const FormContext = createContext<FormCtx | undefined>(undefined);

export type FormHookCtx<T extends FormState> = {
  readonly state: T;
  readonly setState: Dispatch<SetStateAction<T>>;
  readonly update: <K extends keyof T>(name: K, val: T[K]) => void;
  readonly assign: (vals: Partial<T>) => void;
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
  const change = useCallback(
    (name: string, val: FormValue) => {
      setState((prev) => Object.assign({}, prev, {[name]: val}));
    },
    [setState],
  );
  const form = useMemo(
    () => ({
      state,
      setState,
      update,
      assign,
      change,
      inputIDPrefix,
    }),
    [state, setState, update, assign, change, inputIDPrefix],
  );
  return form;
};

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  readonly form: FormCtx;
};

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps>>(
  ({form, children, ...props}, ref) => {
    return (
      <FormContext.Provider value={form}>
        <form ref={ref} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    );
  },
);

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({name, value, onChange, id, ...props}, ref) => {
    const form = useContext(FormContext);
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
    const v = value ?? (isNonNil(name) ? form?.state[name] : undefined);
    const idProp =
      id ??
      (isNonNil(form) && isNonNil(name)
        ? `${form.inputIDPrefix}-${name}`
        : undefined);
    return (
      <input
        ref={ref}
        name={name}
        value={v}
        onChange={handleChange}
        id={idProp}
        {...props}
      />
    );
  },
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  readonly inputName?: string | undefined;
};

export const Label = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({inputName, htmlFor, children, ...props}, ref) => {
  const form = useContext(FormContext);
  const htmlForProp =
    htmlFor ??
    (isNonNil(form) && isNonNil(inputName)
      ? `${form.inputIDPrefix}-${inputName}`
      : undefined);
  return (
    <label ref={ref} htmlFor={htmlForProp} {...props}>
      {children}
    </label>
  );
});
