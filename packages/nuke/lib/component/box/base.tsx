import {
  type HTMLAttributes,
  type PropsWithChildren,
  forwardRef,
  useMemo,
} from 'react';

import {
  classNames,
  modClassNames,
  modClassNamesObj,
} from '#internal/computil/index.js';

import styles from './styles.module.css';

export enum BoxSize {
  S1 = 's1',
  S1_5 = 's1-5',
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
  readonly paddedSmall?: boolean | undefined;
  readonly center?: boolean | undefined;
  readonly card?: boolean | undefined;
};

export const Box = forwardRef<HTMLDivElement, PropsWithChildren<BoxProps>>(
  (
    {
      size,
      padded = false,
      paddedSmall = false,
      center = false,
      card = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const c = classNames(
      modClassNames(
        styles,
        'box',
        {
          padded: padded === true,
          'padded-lr': padded === BoxPadded.LR,
          'padded-tb': padded === BoxPadded.TB,
          'padded-small': paddedSmall,
          card,
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

export type FlexProps = HTMLAttributes<HTMLDivElement> & {
  readonly dir?: FlexDir | undefined;
  readonly wrap?: FlexWrap | undefined;
  readonly alignItems?: FlexAlignItems | undefined;
  readonly alignContent?: FlexAlignContent | undefined;
  readonly justifyContent?: FlexJustifyContent | undefined;
  readonly gap?: number | undefined;
};

export const Flex = forwardRef<HTMLDivElement, PropsWithChildren<FlexProps>>(
  (
    {
      dir,
      wrap,
      alignItems,
      alignContent,
      justifyContent,
      gap,
      className,
      style,
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
      ),
      className,
    );
    const s = useMemo(() => {
      if (gap === undefined) {
        return style;
      }
      return Object.assign({gap}, style);
    }, [style, gap]);
    return (
      <div ref={ref} style={s} {...props} className={c}>
        {children}
      </div>
    );
  },
);
