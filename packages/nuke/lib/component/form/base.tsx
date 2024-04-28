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
}

const FormContext = createContext<FormCtx | undefined>(undefined);

export interface FieldCtx {
  readonly id: string;
}

const FieldContext = createContext<FieldCtx | undefined>(undefined);

export type FormHook<T extends FormState> = {
  readonly state: T;
  readonly setState: Dispatch<SetStateAction<T>>;
  readonly update: <K extends keyof T>(name: K, val: T[K]) => void;
  readonly assign: (vals: Partial<T>) => void;
  readonly reset: () => void;
};

export const useForm = <T extends FormState>(
  initState: T | (() => T),
): FormHook<T> => {
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
        if (e.target instanceof HTMLInputElement) {
          const name = e.target.name;
          if (isNonNil(name) && name !== '') {
            formUpdate(name, e.target.value as T[typeof name]);
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

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({id, type: inputType, name, value, checked, onChange, ...props}, ref) => {
    const form = useContext(FormContext);
    const field = useContext(FieldContext);

    const idProp = id ?? field?.id;

    const isCheckbox = inputType === 'checkbox';
    const isRadio = inputType === 'radio';
    const isFile = inputType === 'file';
    const isOther = !isCheckbox && !isRadio && !isFile;

    const formValue = isNonNil(name) ? form?.state[name] : undefined;
    const valueProp = value ?? (isOther ? formValue : undefined);
    const checkedProp =
      checked ?? (isRadio && isNonNil(value) ? value === formValue : undefined);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (isNonNil(onChange)) {
          onChange(e);
        }
      },
      [onChange],
    );

    return (
      <input
        ref={ref}
        id={idProp}
        type={inputType}
        name={name}
        value={valueProp}
        checked={checkedProp}
        onChange={handleChange}
        {...props}
      />
    );
  },
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({htmlFor, children, ...props}, ref) => {
  const field = useContext(FieldContext);
  const htmlForProp = htmlFor ?? field?.id;
  return (
    <label ref={ref} htmlFor={htmlForProp} {...props}>
      {children}
    </label>
  );
});
