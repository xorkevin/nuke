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

export const objEntries = <T extends object>(o: T): Entries<T> =>
  Object.entries(o) as Entries<T>;

type EntryMapFn<T, R> = (entry: Entry<T>) => R;

type MappedObjEntries<T, F extends EntryMapFn<T, unknown>> = {
  [K in keyof T]: F extends (entry: [K, T[K]]) => infer R ? R : never;
};

export const mapObjEntries = <
  T extends object,
  F extends EntryMapFn<T, unknown>,
>(
  o: T,
  f: F,
): MappedObjEntries<T, F> => {
  return Object.fromEntries(
    objEntries(o).map(([k, v]) => [k, f([k, v])] as const),
  ) as MappedObjEntries<T, F>;
};

export const isValEnum = <T extends {[key: string]: number | string}>(
  e: T,
  val: number | string,
): val is T[keyof T] => {
  return Object.values(e).includes(val);
};

export const valToEnum = <T extends {[key: string]: number | string}>(
  e: T,
  val: number | string,
): T[keyof T] | undefined => {
  if (isValEnum(e, val)) {
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
  return mapObjEntries(obj, ([, v]) => modClassNames(styleMod, v) ?? '');
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

export const expBackoff = (ms: number, factor: number, max: number): number =>
  Math.min(ms * factor, max);

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

export class TypedEventTarget<T extends {[key in keyof T]: Event}> {
  readonly #eventTarget: EventTarget;

  public constructor() {
    this.#eventTarget = new EventTarget();
  }

  public dispatchEvent<K extends keyof T>(this: this, ev: T[K]): boolean {
    return this.#eventTarget.dispatchEvent(ev);
  }

  public addEventListener<K extends string & keyof T>(
    this: this,
    kind: K,
    listener:
      | ((ev: T[K]) => unknown)
      | {handleEvent: (ev: T[K]) => unknown}
      | null,
    opts?: AddEventListenerOptions | boolean,
  ): void {
    this.#eventTarget.addEventListener(
      kind,
      listener as EventListenerOrEventListenerObject | null,
      opts,
    );
  }

  public removeEventListener(
    kind: string,
    listener: EventListenerOrEventListenerObject | null,
    opts?: EventListenerOptions | boolean,
  ): void {
    this.#eventTarget.removeEventListener(kind, listener, opts);
  }
}

export class RingBuf<T> {
  #buf: T[];
  #r: number;
  #w: number;

  public constructor() {
    this.#buf = new Array<T>(2);
    this.#r = 0;
    this.#w = 0;
  }

  private resize(this: this) {
    const target = this.#buf.length * 2;
    let next: T[];
    if (this.#r <= this.#w) {
      next = this.#buf.slice(this.#r, this.#w);
    } else {
      next = this.#buf.slice(this.#r);
      if (this.#w > 0) {
        next = next.concat(this.#buf.slice(0, this.#w));
      }
    }
    this.#w = next.length;
    const delta = target - next.length;
    if (delta > 0) {
      next = next.concat(new Array(delta));
    }
    this.#buf = next;
    this.#r = 0;
  }

  public write(this: this, m: T): void {
    const next = (this.#w + 1) % this.#buf.length;
    if (next === this.#r) {
      this.resize();
      this.write(m);
      return;
    }
    this.#buf[this.#w] = m;
    this.#w = next;
  }

  public read(this: this): T | undefined {
    if (this.#r === this.#w) {
      return undefined;
    }
    const next = (this.#r + 1) % this.#buf.length;
    const m = this.#buf[this.#r];
    this.#r = next;
    return m;
  }

  public peek(this: this): T | undefined {
    if (this.#r === this.#w) {
      return undefined;
    }
    const m = this.#buf[this.#r];
    return m;
  }
}

type CondVarEventMap = {
  notify: CustomEvent<void>;
};

export class CondVar {
  readonly #eventTarget: TypedEventTarget<CondVarEventMap>;

  public constructor() {
    this.#eventTarget = new TypedEventTarget();
  }

  public notify(): void {
    this.#eventTarget.dispatchEvent(
      new CustomEvent('notify', {detail: undefined}),
    );
  }

  public async wait(opts?: {signal?: AbortSignal}): Promise<void> {
    if (isNonNil(opts?.signal) && isSignalAborted(opts.signal)) {
      return;
    }
    await new Promise<void>((resolve) => {
      const controller = new AbortController();
      controller.signal.addEventListener('abort', () => {
        resolve();
      });
      if (isNonNil(opts?.signal)) {
        opts.signal.addEventListener(
          'abort',
          () => {
            controller.abort();
          },
          {signal: controller.signal},
        );
      }
      this.#eventTarget.addEventListener(
        'notify',
        () => {
          controller.abort();
        },
        {signal: controller.signal},
      );
    });
  }
}
