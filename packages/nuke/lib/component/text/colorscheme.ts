import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {strToEnum} from '#internal/computil/index.js';
import {
  type BodyClassListManager,
  BrowserBodyClassListManager,
  BrowserMediaMatcher,
  type MediaMatcherAPI,
} from '#internal/dom/index.js';
import {BrowserLocalStorage, type StorageAPI} from '#internal/storage/index.js';

export enum ColorScheme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export const ColorSchemeClasses = Object.freeze({
  Light: 'nuke__color-scheme-light',
  Dark: 'nuke__color-scheme-dark',
} as const);

const ColorSchemeChangeEventType = 'colorschemechange';

export type ColorSchemeState = {
  readonly scheme: ColorScheme;
  readonly sysPrefDark: boolean;
};

const isColorSchemeChangeEvent = (
  v: Event,
): v is CustomEvent<ColorSchemeState> => {
  return v.type === ColorSchemeChangeEventType;
};

export interface ColorSchemeManager {
  readonly getState: () => ColorSchemeState;
  readonly setScheme: (v: ColorScheme) => void;
  readonly onSchemeChange: (
    handler: (v: ColorSchemeState) => void,
    signal: AbortSignal,
  ) => void;
}

const colorSchemeStrToEnum = (v: string | null | undefined): ColorScheme =>
  strToEnum(ColorScheme, v ?? ColorScheme.System) ?? ColorScheme.System;

export class BrowserColorSchemeManager implements ColorSchemeManager {
  readonly #localStorageKey: string;
  readonly #localStorageKeys: Set<string>;
  readonly #storage: StorageAPI;
  readonly #mediaMatcher: MediaMatcherAPI;
  readonly #bodyClassList: BodyClassListManager;
  readonly #emitter: EventTarget;
  #state: ColorSchemeState;
  #initted: boolean;

  public constructor(
    storage: StorageAPI,
    mediaMatcher: MediaMatcherAPI,
    bodyClassList: BodyClassListManager,
    localStorageKey = 'nuke:colorscheme',
  ) {
    this.#localStorageKey = localStorageKey;
    this.#localStorageKeys = new Set([localStorageKey]);
    this.#storage = storage;
    this.#mediaMatcher = mediaMatcher;
    this.#bodyClassList = bodyClassList;
    this.#emitter = new EventTarget();
    this.#state = Object.freeze({
      scheme: ColorScheme.System,
      sysPrefDark: false,
    });
    this.#initted = false;
  }

  public init(this: this, signal: AbortSignal): void {
    if (this.#initted) {
      throw new Error('Already inited');
    }

    this.#storage.onStorage(
      this.#localStorageKeys,
      (e) => {
        this.setScheme(colorSchemeStrToEnum(e.newValue));
      },
      signal,
    );

    const sysPrefDark = this.#mediaMatcher.matchMedia(
      '(prefers-color-scheme: dark)',
      {
        handler: (matches) => {
          this.setSysPrefDark(matches);
        },
        signal,
      },
    );

    this.#state = Object.freeze({
      scheme: this.#state.scheme,
      sysPrefDark,
    });
    this.reconcileScheme(
      colorSchemeStrToEnum(this.#storage.getItem(this.#localStorageKey)),
    );

    this.#initted = true;
  }

  public setScheme(this: this, v: ColorScheme): void {
    if (v === this.#state.scheme) {
      return;
    }
    this.reconcileScheme(v);
    this.sendEvent();
  }

  public setSysPrefDark(this: this, v: boolean): void {
    if (v === this.#state.sysPrefDark) {
      return;
    }
    this.#state = Object.freeze({
      scheme: this.#state.scheme,
      sysPrefDark: v,
    });
    this.sendEvent();
  }

  private reconcileScheme(this: this, v: ColorScheme): void {
    this.#state = Object.freeze({
      scheme: v,
      sysPrefDark: this.#state.sysPrefDark,
    });

    if (this.#state.scheme === ColorScheme.System) {
      this.#storage.removeItem(this.#localStorageKey);
    } else {
      this.#storage.setItem(this.#localStorageKey, this.#state.scheme);
    }

    if (this.#state.scheme === ColorScheme.System) {
      this.#bodyClassList.remove(
        ColorSchemeClasses.Light,
        ColorSchemeClasses.Dark,
      );
    } else {
      const next =
        this.#state.scheme === ColorScheme.Dark
          ? ColorSchemeClasses.Dark
          : ColorSchemeClasses.Light;
      const prev =
        this.#state.scheme === ColorScheme.Dark
          ? ColorSchemeClasses.Light
          : ColorSchemeClasses.Dark;
      if (!this.#bodyClassList.replace(prev, next)) {
        this.#bodyClassList.add(next);
      }
    }
  }

  private sendEvent(this: this): void {
    this.#emitter.dispatchEvent(
      new CustomEvent<ColorSchemeState>(ColorSchemeChangeEventType, {
        detail: this.#state,
      }),
    );
  }

  public getState(this: this): ColorSchemeState {
    return this.#state;
  }

  public onSchemeChange(
    handler: (scheme: ColorSchemeState) => void,
    signal: AbortSignal,
  ): void {
    this.#emitter.addEventListener(
      ColorSchemeChangeEventType,
      (v: Event) => {
        if (isColorSchemeChangeEvent(v)) {
          handler(v.detail);
        }
      },
      {signal},
    );
  }
}

export type ColorSchemeCtx = {
  readonly manager: ColorSchemeManager;
};

const defaultColorSchemeManager = new BrowserColorSchemeManager(
  new BrowserLocalStorage(),
  new BrowserMediaMatcher(),
  new BrowserBodyClassListManager(),
);

const ColorSchemeContext = createContext<ColorSchemeCtx>(
  Object.freeze({
    manager: defaultColorSchemeManager,
  }),
);

export const ColorSchemeProvider = ColorSchemeContext.Provider;

export const useColorScheme = (): {
  isDark: boolean;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
} => {
  const {manager} = useContext(ColorSchemeContext);

  const [schemeState, setSchemeState] = useState(() => manager.getState());

  useEffect(() => {
    const controller = new AbortController();
    manager.onSchemeChange((v) => {
      setSchemeState(v);
    }, controller.signal);
    setSchemeState(manager.getState());
    return () => {
      controller.abort();
    };
  }, [manager, setSchemeState]);

  const isDark = useMemo(() => {
    switch (schemeState.scheme) {
      case ColorScheme.System:
        return schemeState.sysPrefDark;
      case ColorScheme.Light:
        return false;
      case ColorScheme.Dark:
        return true;
    }
  }, [schemeState]);

  const setColorScheme = useCallback(
    (scheme: ColorScheme) => {
      manager.setScheme(scheme);
      setSchemeState(manager.getState());
    },
    [manager, setSchemeState],
  );

  const colorScheme = schemeState.scheme;
  const res = useMemo(
    () => ({isDark, colorScheme, setColorScheme}),
    [isDark, colorScheme, setColorScheme],
  );
  return res;
};
