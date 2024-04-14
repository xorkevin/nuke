import {type HTMLAttributes, type PropsWithChildren, forwardRef} from 'react';

import {
  classNames,
  modClassNames,
  modClassNamesObj,
  strToEnum,
} from '#internal/computil/index.js';

import styles from './styles.module.css';

export const BoxClasses = Object.freeze(
  modClassNamesObj(styles, {
    PadSmall: ['pad', 'pad-small'],
    PadMedium: ['pad', 'pad-medium'],
    PadLarge: ['pad', 'pad-large'],
    PadLR: 'pad-lr',
    PadTB: 'pad-tb',
    BorderRound: 'border-round',
  } as const),
);

export enum BoxSize {
  S1 = 's1',
  S2 = 's2',
  S3 = 's3',
  S4 = 's4',
  S5 = 's5',
  S6 = 's6',
}

export enum BoxPadded {
  LR = 'lr',
  TB = 'tb',
}

export type BoxProps = HTMLAttributes<HTMLDivElement> & {
  readonly size?: BoxSize | undefined;
  readonly padded?: BoxPadded | boolean | undefined;
  readonly center?: boolean | undefined;
};

export const Box = forwardRef<HTMLDivElement, PropsWithChildren<BoxProps>>(
  (
    {size, padded = false, center = false, className, children, ...props},
    ref,
  ) => {
    const c = classNames(
      modClassNames(
        styles,
        'box',
        {
          padded:
            padded === true ||
            (typeof padded === 'string' &&
              strToEnum(BoxPadded, padded) !== undefined),
          'padded-lr': padded === BoxPadded.LR,
          'padded-tb': padded === BoxPadded.TB,
          center,
        },
        size,
      ),
      className,
    );
    return (
      <div ref={ref} {...props} className={c}>
        {children}
      </div>
    );
  },
);

export const FlexClasses = Object.freeze(
  modClassNamesObj(styles, {
    Flex: 'flex',
    DirRow: 'dir-row',
    DirRowRev: 'dir-row-rev',
    DirCol: 'dir-col',
    DirColRev: 'dir-col-rev',
    Wrap: 'wrap',
    WrapRev: 'wrap-rev',
    NoWrap: 'no-wrap',
    AlignItemsStart: 'align-items-start',
    AlignItemsEnd: 'align-items-end',
    AlignItemsCenter: 'align-items-center',
    AlignItemsStretch: 'align-items-stretch',
    AlignContentStart: 'align-content-start',
    AlignContentEnd: 'align-content-end',
    AlignContentCenter: 'align-content-center',
    AlignContentSpaceBetween: 'align-content-space-between',
    AlignContentSpaceAround: 'align-content-space-around',
    AlignContentSpaceEvenly: 'align-content-space-evenly',
    AlignContentStretch: 'align-content-stretch',
    JustifyContentStart: 'justify-content-start',
    JustifyContentEnd: 'justify-content-end',
    JustifyContentCenter: 'justify-content-center',
    JustifyContentSpaceBetween: 'justify-content-space-between',
    JustifyContentSpaceAround: 'justify-content-space-around',
    JustifyContentSpaceEvenly: 'justify-content-space-evenly',
    JustifyContentStretch: 'justify-content-stretch',
    Grow: 'grow',
    Grow0: 'grow-0',
    Shrink: 'shrink',
    Shrink0: 'shrink-0',
    Basis0: 'basis-0',
  } as const),
);

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

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  readonly dir?: FlexDir | undefined;
  readonly wrap?: FlexWrap | undefined;
  readonly alignItems?: FlexAlignItems | undefined;
  readonly alignContent?: FlexAlignContent | undefined;
  readonly justifyContent?: FlexJustifyContent | undefined;
  readonly grow?: FlexGrow | undefined;
  readonly shrink?: FlexShrink | undefined;
  readonly basis?: FlexBasis | undefined;
};

export const Flex = forwardRef<HTMLDivElement, PropsWithChildren<FlexProps>>(
  (
    {
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
      ...props
    },
    ref,
  ) => {
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
    return (
      <div ref={ref} {...props} className={c}>
        {children}
      </div>
    );
  },
);
