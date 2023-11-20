import {useCallback, useEffect, useMemo, useState} from 'react';

import {strToEnum} from '#internal/computil/index.js';

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
  B1: `${styles['b1']}`,
  B2: `${styles['b2']}`,
  B3: `${styles['b3']}`,
  BI: `${styles['bi']}`,
  BA: `${styles['ba']}`,
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
}

export const ColorFGClasses = Object.freeze({
  [ColorFG.F1]: ColorClasses.F1,
  [ColorFG.F2]: ColorClasses.F2,
  [ColorFG.F3]: ColorClasses.F3,
  [ColorFG.FI]: ColorClasses.FI,
  [ColorFG.FA]: ColorClasses.FA,
} as const);

export enum ColorBG {
  B1 = 'b1',
  B2 = 'b2',
  B3 = 'b3',
  BI = 'bi',
  BA = 'ba',
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
  [ColorBG.BI]: ColorClasses.BI,
  [ColorBG.BA]: ColorClasses.BA,
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

const isSystemPrefersDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const useDarkMode = ({
  localStorageKey = 'nuke:darkmode',
}: {localStorageKey?: string} = {}): {
  isDark: boolean;
  colorScheme: ColorScheme;
  setMode: (mode: ColorScheme) => void;
} => {
  const [sysPref, setSysPref] = useState(isSystemPrefersDark);
  const [colorScheme, setColorScheme] = useState(ColorScheme.System);

  useEffect(() => {
    const controller = new AbortController();
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    match.addEventListener(
      'change',
      (e) => {
        setSysPref(e.matches);
      },
      {signal: controller.signal},
    );
    setSysPref(match.matches);
    return () => {
      controller.abort();
    };
  }, [setSysPref]);

  useEffect(() => {
    const setFromStorage = (v: string | null | undefined) => {
      setColorScheme(
        strToEnum(ColorScheme, v ?? ColorScheme.System) ?? ColorScheme.System,
      );
    };
    const controller = new AbortController();
    window.addEventListener(
      'storage',
      (e) => {
        if (e.storageArea !== localStorage) {
          return;
        }
        // key is null from storage clear method
        if (e.key !== localStorageKey && e.key !== null) {
          return;
        }
        setFromStorage(e.newValue);
      },
      {signal: controller.signal},
    );
    setFromStorage(localStorage.getItem(localStorageKey));
    return () => {
      controller.abort();
    };
  }, [localStorageKey, setColorScheme]);

  useEffect(() => {
    if (colorScheme === ColorScheme.System) {
      document.body.classList.remove(
        ColorSchemeClasses.Light,
        ColorSchemeClasses.Dark,
      );
    } else {
      const v =
        colorScheme === ColorScheme.Dark
          ? ColorSchemeClasses.Dark
          : ColorSchemeClasses.Light;
      const alt =
        colorScheme === ColorScheme.Dark
          ? ColorSchemeClasses.Light
          : ColorSchemeClasses.Dark;
      if (!document.body.classList.replace(alt, v)) {
        document.body.classList.add(v);
      }
    }
  }, [colorScheme]);

  useEffect(() => {
    if (colorScheme === ColorScheme.System) {
      localStorage.removeItem(localStorageKey);
    } else {
      localStorage.setItem(localStorageKey, colorScheme);
    }
  }, [localStorageKey, colorScheme]);

  const isDark = useMemo(() => {
    switch (colorScheme) {
      case ColorScheme.System:
        return sysPref;
      case ColorScheme.Light:
        return false;
      case ColorScheme.Dark:
        return true;
    }
  }, [sysPref, colorScheme]);

  const setMode = useCallback(
    (mode: ColorScheme) => {
      setColorScheme(mode);
    },
    [setColorScheme],
  );

  const res = useMemo(
    () => ({isDark, colorScheme, setMode}),
    [isDark, colorScheme, setMode],
  );
  return res;
};
