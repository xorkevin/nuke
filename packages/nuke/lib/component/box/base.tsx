import type {FC, PropsWithChildren} from 'react';

import {classNames, modClassNames} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const BoxClasses = {
  PadSmall: `${styles['pad']} ${styles['pad-small']}`,
  PadMedium: `${styles['pad']} ${styles['pad-medium']}`,
  PadLarge: `${styles['pad']} ${styles['pad-large']}`,
  BorderRound: `${styles['border-round']}`,
};

export enum BoxSize {
  S1 = 's1',
  S2 = 's2',
  S3 = 's3',
  S4 = 's4',
  S5 = 's5',
  S6 = 's6',
}

export type BoxProps = {
  size?: BoxSize;
  padded?: boolean;
  className?: string;
};

export const Box: FC<PropsWithChildren<BoxProps>> = ({
  size,
  padded,
  className,
  children,
}) => {
  const c = classNames(
    modClassNames(
      styles,
      'box',
      {
        padded: padded ?? false,
      },
      size,
    ),
    className,
  );
  return <div className={c}>{children}</div>;
};

export const FlexClasses = {
  Flex: `${styles['flex']}`,
  DirRow: `${styles['dir-row']}`,
  DirRowRev: `${styles['dir-row-rev']}`,
  DirCol: `${styles['dir-col']}`,
  DirColRev: `${styles['dir-col-rev']}`,
  Wrap: `${styles['wrap']}`,
  WrapRev: `${styles['wrap-rev']}`,
  NoWrap: `${styles['no-wrap']}`,
  AlignItemsStart: `${styles['align-items-start']}`,
  AlignItemsEnd: `${styles['align-items-end']}`,
  AlignItemsCenter: `${styles['align-items-center']}`,
  AlignItemsStretch: `${styles['align-items-stretch']}`,
  AlignContentStart: `${styles['align-content-start']}`,
  AlignContentEnd: `${styles['align-content-end']}`,
  AlignContentCenter: `${styles['align-content-center']}`,
  AlignContentSpaceBetween: `${styles['align-content-space-between']}`,
  AlignContentSpaceAround: `${styles['align-content-space-around']}`,
  AlignContentSpaceEvenly: `${styles['align-content-space-evenly']}`,
  AlignContentStretch: `${styles['align-content-stretch']}`,
  JustifyContentStart: `${styles['justify-content-start']}`,
  JustifyContentEnd: `${styles['justify-content-end']}`,
  JustifyContentCenter: `${styles['justify-content-center']}`,
  JustifyContentSpaceBetween: `${styles['justify-content-space-between']}`,
  JustifyContentSpaceAround: `${styles['justify-content-space-around']}`,
  JustifyContentSpaceEvenly: `${styles['justify-content-space-evenly']}`,
  JustifyContentStretch: `${styles['justify-content-stretch']}`,
  Grow: `${styles['grow']}`,
  Grow0: `${styles['grow-0']}`,
  Shrink: `${styles['shrink']}`,
  Shrink0: `${styles['shrink-0']}`,
  Basis0: `${styles['basis-0']}`,
};

export enum FlexDir {
  Row = 'dir-row',
  RowRev = 'dir-row-rev',
  Col = 'dir-col',
  ColRev = 'dir-col-rev',
}

export enum FlexWrap {
  Wrap = 'wrap',
  WrapRev = 'wrap-rev',
  NoWrap = 'no-wrap',
}

export enum FlexAlignItems {
  Start = 'align-items-start',
  End = 'align-items-end',
  Center = 'align-items-center',
  Stretch = 'align-items-stretch',
}

export enum FlexAlignContent {
  Start = 'align-content-start',
  End = 'align-content-end',
  Center = 'align-content-center',
  SpaceBetween = 'align-content-space-between',
  SpaceAround = 'align-content-space-around',
  SpaceEvenly = 'align-content-space-evenly',
  Stretch = 'align-content-stretch',
}

export enum FlexJustifyContent {
  Start = 'justify-content-start',
  End = 'justify-content-end',
  Center = 'justify-content-center',
  SpaceBetween = 'justify-content-space-between',
  SpaceAround = 'justify-content-space-around',
  SpaceEvenly = 'justify-content-space-evenly',
  Stretch = 'justify-content-stretch',
}

export enum FlexGrow {
  Grow = 'grow',
  Grow0 = 'grow-0',
}

export enum FlexShrink {
  Shrink = 'shrink',
  Shrink0 = 'shrink-0',
}

export enum FlexBasis {
  Basis0 = 'basis-0',
}

export type FlexProps = {
  dir?: FlexDir;
  wrap?: FlexWrap;
  alignItems?: FlexAlignItems;
  alignContent?: FlexAlignContent;
  justifyContent?: FlexJustifyContent;
  grow?: FlexGrow;
  shrink?: FlexShrink;
  basis?: FlexBasis;
  className?: string;
};

export const Flex: FC<PropsWithChildren<FlexProps>> = ({
  dir,
  wrap,
  alignItems,
  alignContent,
  justifyContent,
  grow,
  shrink,
  basis,
  className,
  children,
}) => {
  const c = classNames(
    modClassNames(
      styles,
      'flex',
      dir,
      wrap,
      alignItems,
      alignContent,
      justifyContent,
      grow,
      shrink,
      basis,
    ),
    className,
  );
  return <div className={c}>{children}</div>;
};
