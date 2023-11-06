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
