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

import styles from './styles.module.css';

export const TextClasses = Object.freeze({
  TitleSmall: `${styles['title']} ${styles['title-small']}`,
  TitleMedium: `${styles['title']} ${styles['title-medium']}`,
  TitleLarge: `${styles['title']} ${styles['title-large']}`,
  Subtitle: `${styles['subtitle']}`,
  Display: `${styles['display']}`,
} as const);

export const ColorClasses = Object.freeze({
  F1: `${styles['f1']}`,
  F2: `${styles['f2']}`,
  F3: `${styles['f3']}`,
  FI: `${styles['fi']}`,
  FA: `${styles['fa']}`,
  FAI: `${styles['fai']}`,
  B1: `${styles['b1']}`,
  B2: `${styles['b2']}`,
  B3: `${styles['b3']}`,
  BI1: `${styles['bi1']}`,
  BI2: `${styles['bi2']}`,
  BI3: `${styles['bi3']}`,
  BA1: `${styles['ba1']}`,
  BA2: `${styles['ba2']}`,
  BA3: `${styles['ba3']}`,
  A1: `${styles['a1']}`,
  A2: `${styles['a2']}`,
  A3: `${styles['a3']}`,
  AA1: `${styles['aa1']}`,
  AA2: `${styles['aa2']}`,
  AA3: `${styles['aa3']}`,
} as const);

export enum ColorFG {
  F1 = 'f1',
  F2 = 'f2',
  F3 = 'f3',
  FI = 'fi',
  FA = 'fa',
  FAI = 'fai',
}

export const ColorFGClasses = Object.freeze({
  [ColorFG.F1]: ColorClasses.F1,
  [ColorFG.F2]: ColorClasses.F2,
  [ColorFG.F3]: ColorClasses.F3,
  [ColorFG.FI]: ColorClasses.FI,
  [ColorFG.FA]: ColorClasses.FA,
  [ColorFG.FAI]: ColorClasses.FAI,
} as const);

export enum ColorBG {
  B1 = 'b1',
  B2 = 'b2',
  B3 = 'b3',
  BI1 = 'bi1',
  BI2 = 'bi2',
  BI3 = 'bi3',
  BA1 = 'ba1',
  BA2 = 'ba2',
  BA3 = 'ba3',
  A1 = 'a1',
  A2 = 'a2',
  A3 = 'a3',
  AA1 = 'aa1',
  AA2 = 'aa2',
  AA3 = 'aa3',
}

export const ColorBGClasses = Object.freeze({
  [ColorBG.B1]: ColorClasses.B1,
  [ColorBG.B2]: ColorClasses.B2,
  [ColorBG.B3]: ColorClasses.B3,
  [ColorBG.BI1]: ColorClasses.BI1,
  [ColorBG.BI2]: ColorClasses.BI2,
  [ColorBG.BI3]: ColorClasses.BI3,
  [ColorBG.BA1]: ColorClasses.BA1,
  [ColorBG.BA2]: ColorClasses.BA2,
  [ColorBG.BA3]: ColorClasses.BA3,
  [ColorBG.A1]: ColorClasses.A1,
  [ColorBG.A2]: ColorClasses.A2,
  [ColorBG.A3]: ColorClasses.A3,
  [ColorBG.AA1]: ColorClasses.AA1,
  [ColorBG.AA2]: ColorClasses.AA2,
  [ColorBG.AA3]: ColorClasses.AA3,
} as const);

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
  }, [manager]);

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
    },
    [manager],
  );

  const colorScheme = schemeState.scheme;
  const res = useMemo(
    () => ({isDark, colorScheme, setColorScheme}),
    [isDark, colorScheme, setColorScheme],
  );
  return res;
};
