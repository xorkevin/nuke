import {useCallback, useEffect, useMemo, useState} from 'react';

import {strToEnum} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const TextClasses = {
  TitleSmall: `${styles['title']} ${styles['small']}`,
  TitleMedium: `${styles['title']} ${styles['medium']}`,
  TitleLarge: `${styles['title']} ${styles['large']}`,
  Subtitle: `${styles['subtitle']}`,
  Display: `${styles['display']}`,
};

export const ColorClasses = {
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
};

export enum ColorFG {
  F1 = 'f1',
  F2 = 'f2',
  F3 = 'f3',
  FI = 'fi',
  FA = 'fa',
}

export const ColorFGClasses = {
  [ColorFG.F1]: ColorClasses.F1,
  [ColorFG.F2]: ColorClasses.F2,
  [ColorFG.F3]: ColorClasses.F3,
  [ColorFG.FI]: ColorClasses.FI,
  [ColorFG.FA]: ColorClasses.FA,
};

export enum ColorBG {
  B1 = 'b1',
  B2 = 'b2',
  B3 = 'b3',
  BI = 'bi',
  BA = 'ba',
}

export const ColorBGClasses = {
  [ColorBG.B1]: ColorClasses.B1,
  [ColorBG.B2]: ColorClasses.B2,
  [ColorBG.B3]: ColorClasses.B3,
  [ColorBG.BI]: ColorClasses.BI,
  [ColorBG.BA]: ColorClasses.BA,
};

export enum ColorScheme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

const cssClassLight = 'light';
const cssClassDark = 'dark';

const isSystemPrefersDark = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const isDocDark = () => {
  if (document.body.classList.contains('light')) {
    return false;
  }
  if (document.body.classList.contains('dark')) {
    return true;
  }
  return isSystemPrefersDark();
};

export const useDarkMode = ({
  persistLocalStorage = false,
  localStorageKey = 'nuke:darkmode',
}: {persistLocalStorage?: boolean; localStorageKey?: string} = {}): {
  isDark: boolean;
  colorScheme: ColorScheme;
  setMode: (mode: ColorScheme) => void;
} => {
  const [isDark, setIsDark] = useState(isDocDark);
  const [colorScheme, setColorScheme] = useState(ColorScheme.System);

  const setScheme = useCallback(
    (mode: ColorScheme) => {
      const dark = (() => {
        switch (mode) {
          case ColorScheme.System:
            return isSystemPrefersDark();
          case ColorScheme.Light:
            return false;
          case ColorScheme.Dark:
            return true;
        }
      })();
      setColorScheme(mode);
      setIsDark(dark);
      if (mode === ColorScheme.System) {
        document.body.classList.remove(cssClassLight, cssClassDark);
      } else {
        const v = dark ? cssClassDark : cssClassLight;
        const alt = dark ? cssClassLight : cssClassDark;
        if (!document.body.classList.replace(alt, v)) {
          document.body.classList.add(v);
        }
      }
      return dark;
    },
    [setColorScheme, setIsDark],
  );

  const setMode = useCallback(
    (mode: ColorScheme) => {
      setScheme(mode);
      if (persistLocalStorage) {
        if (mode === ColorScheme.System) {
          localStorage.removeItem(localStorageKey);
        } else {
          localStorage.setItem(localStorageKey, mode);
        }
      }
    },
    [persistLocalStorage, localStorageKey, setScheme],
  );

  useEffect(() => {
    setScheme(
      strToEnum(
        ColorScheme,
        ColorScheme.System,
        localStorage.getItem(localStorageKey) ?? '',
      ),
    );
  }, [localStorageKey, setScheme]);

  const res = useMemo(
    () => ({isDark, colorScheme, setMode}),
    [isDark, colorScheme, setMode],
  );
  return res;
};
