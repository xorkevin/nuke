import {useCallback, useEffect, useMemo, useState} from 'react';

import {strToEnum} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const TextClasses = {
  TitleSmall: `${styles['title']} ${styles['title-small']}`,
  TitleMedium: `${styles['title']} ${styles['title-medium']}`,
  TitleLarge: `${styles['title']} ${styles['title-large']}`,
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

const cssClassLight = 'nuke__light';
const cssClassDark = 'nuke__dark';

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
      document.body.classList.remove(cssClassLight, cssClassDark);
    } else {
      const v = colorScheme === ColorScheme.Dark ? cssClassDark : cssClassLight;
      const alt =
        colorScheme === ColorScheme.Dark ? cssClassLight : cssClassDark;
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
