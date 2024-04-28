import type {ForwardedRef, RefCallback} from 'react';

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export const isNil = (v: unknown): v is null | undefined =>
  v === null || v === undefined;

export const isNonNil = <T>(v: T): v is NonNullable<T> => !isNil(v);

export const isArray = <T, A>(
  v: A[] | T | readonly A[],
): v is A[] | readonly A[] => Array.isArray(v);

export const isStrEnum = <T extends {[key: string]: string}>(
  e: T,
  val: string,
): val is T[keyof T] => {
  return Object.values(e).includes(val);
};

export const strToEnum = <T extends {[key: string]: string}>(
  e: T,
  val: string,
): T[keyof T] | undefined => {
  if (isStrEnum(e, val)) {
    return val;
  }
  return undefined;
};

export type ConditionalClass =
  | ConditionalClass[]
  | string
  | {
      [key: string]: boolean;
    }
  | undefined;

const classNamesRec = (
  classes: string[],
  m: (c: string) => string | undefined,
  arg: ConditionalClass,
): void => {
  if (arg === undefined) {
    return;
  }
  if (typeof arg === 'string') {
    if (arg === '') {
      return;
    }
    const c = m(arg);
    if (c !== undefined && c !== '') {
      classes.push(c);
    }
    return;
  }
  if (Array.isArray(arg)) {
    for (const a of arg) {
      classNamesRec(classes, m, a);
    }
    return;
  }
  for (const [k, v] of Object.entries(arg)) {
    if (k !== '' && v) {
      const c = m(k);
      if (c !== undefined && c !== '') {
        classes.push(c);
      }
    }
  }
};

export const classNames = (...args: ConditionalClass[]): string | undefined => {
  const classes: string[] = [];
  classNamesRec(classes, (c) => c, args);
  if (classes.length === 0) {
    return undefined;
  }
  return classes.join(' ');
};

export const modClassNames = (
  styleMod: {[key: string]: string},
  ...args: ConditionalClass[]
): string | undefined => {
  const classes: string[] = [];
  classNamesRec(classes, (c) => styleMod[c], args);
  if (classes.length === 0) {
    return undefined;
  }
  return classes.join(' ');
};

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const modClassNamesObj = <T extends Record<string, ConditionalClass>>(
  styleMod: {[key: string]: string},
  obj: T,
): {[key in keyof T]: string} => {
  const entries = Object.entries(obj) as Entries<T>;
  return Object.fromEntries(
    entries.map(([k, v]) => [k, modClassNames(styleMod, v) ?? '']),
  ) as {[key in keyof T]: string};
};

export const mergeRefs = <T>(
  ...refs: (ForwardedRef<T> | undefined)[]
): RefCallback<T> => {
  return (e) => {
    for (const v of refs) {
      if (typeof v === 'function') {
        v(e);
      } else if (v !== null && v !== undefined) {
        v.current = e;
      }
    }
  };
};
