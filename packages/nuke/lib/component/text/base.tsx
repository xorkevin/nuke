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
  BA1: `${styles['ba1']}`,
  BA2: `${styles['ba2']}`,
  BA3: `${styles['ba3']}`,
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
} as const);
