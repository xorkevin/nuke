import {modClassNamesObj} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const TextClasses = Object.freeze(
  modClassNamesObj(styles, {
    TitleSmall: ['title', 'title-small'],
    TitleMedium: ['title', 'title-medium'],
    TitleLarge: ['title', 'title-large'],
    Subtitle: 'subtitle',
    Display: 'display',
  }),
);

export const ColorClasses = Object.freeze(
  modClassNamesObj(styles, {
    F1: 'f1',
    F2: 'f2',
    F3: 'f3',
    FI: 'fi',
    FA: 'fa',
    FAI: 'fai',
    B1: 'b1',
    B2: 'b2',
    B3: 'b3',
    BA1: 'ba1',
    BA2: 'ba2',
    BA3: 'ba3',
    AA1: 'aa1',
    AA2: 'aa2',
    AA3: 'aa3',
  }),
);

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
});

export enum ColorBG {
  B1 = 'b1',
  B2 = 'b2',
  B3 = 'b3',
  BA1 = 'ba1',
  BA2 = 'ba2',
  BA3 = 'ba3',
  AA1 = 'aa1',
  AA2 = 'aa2',
  AA3 = 'aa3',
}

export const ColorBGClasses = Object.freeze({
  [ColorBG.B1]: ColorClasses.B1,
  [ColorBG.B2]: ColorClasses.B2,
  [ColorBG.B3]: ColorClasses.B3,
  [ColorBG.BA1]: ColorClasses.BA1,
  [ColorBG.BA2]: ColorClasses.BA2,
  [ColorBG.BA3]: ColorClasses.BA3,
  [ColorBG.AA1]: ColorClasses.AA1,
  [ColorBG.AA2]: ColorClasses.AA2,
  [ColorBG.AA3]: ColorClasses.AA3,
});
