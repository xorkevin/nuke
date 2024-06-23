import type {ForwardedRef, RefCallback} from 'react';

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export const isNil = (v: unknown): v is null | undefined =>
  v === null || v === undefined;

export const isNonNil = <T>(v: T): v is NonNullable<T> => !isNil(v);

export type ResultOk<T> = {value: T; err?: never};
export type ResultErr<U> = {value?: never; err: U};
export type Result<T, U> = NonNullable<ResultErr<U> | ResultOk<T>>;

export const isResOk = <T, U>(v: Result<T, U>): v is ResultOk<T> =>
  isNil(v.err);
export const isResErr = <T, U>(v: Result<T, U>): v is ResultErr<U> =>
  isNonNil(v.err);

export const isArray = (v: unknown): v is unknown[] | readonly unknown[] =>
  Array.isArray(v);

export type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

export type Entries<T> = Entry<T>[];

export const objEntries = <T extends {}>(o: T): Entries<T> =>
  Object.entries(o) as Entries<T>;

type EntryMapFn<T> = {
  [K in keyof T]: (k: K, v: T[K]) => unknown;
}[keyof T];

type MapObjEntries<T, F extends EntryMapFn<T>> = {
  [K in keyof T]: F extends (k: K, v: T[K]) => infer R ? R : never;
};

export const mapObjEntries = <T extends {}, F extends EntryMapFn<T>>(
  o: T,
  f: F,
): MapObjEntries<T, F> => {
  return Object.fromEntries(
    objEntries(o).map(([k, v]) => [k, f(k, v)] as const),
  ) as MapObjEntries<T, F>;
};

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
      [key: string]: boolean | undefined;
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
  if (isArray(arg)) {
    for (const a of arg) {
      classNamesRec(classes, m, a);
    }
    return;
  }
  for (const [k, v] of Object.entries(arg)) {
    if (k !== '' && isNonNil(v) && v) {
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

export const modClassNamesObj = <T extends Record<string, ConditionalClass>>(
  styleMod: {[key: string]: string},
  obj: T,
): {[key in keyof T]: string} => {
  return mapObjEntries(obj, (_k, v) => modClassNames(styleMod, v) ?? '');
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

// isSignalAborted is used to avoid type narrowing
export const isSignalAborted = (s: AbortSignal): boolean => s.aborted;

export const sleep = async (
  ms?: number,
  opts?: {signal?: AbortSignal},
): Promise<void> => {
  await new Promise<void>((resolve) => {
    const controller = new AbortController();
    controller.signal.addEventListener('abort', () => {
      resolve();
    });
    let t: number | undefined;
    if (isNonNil(opts?.signal)) {
      opts.signal.addEventListener(
        'abort',
        () => {
          if (isNonNil(t)) {
            clearTimeout(t);
            controller.abort();
          }
        },
        {signal: controller.signal},
      );
    }
    t = setTimeout(() => {
      t = undefined;
      controller.abort();
    }, ms) as unknown as number;
  });
};

export const parseURL = (
  u: URL | string,
  base?: URL | string | undefined,
): URL | undefined => {
  try {
    return new URL(u, base);
  } catch (err) {
    return undefined;
  }
};
