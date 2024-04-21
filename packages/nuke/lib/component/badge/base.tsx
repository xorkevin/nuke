import {modClassNamesObj} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const BadgeClasses = Object.freeze(
  modClassNamesObj(styles, {
    Badge: 'badge',
  } as const),
);
