import React from 'react';

const gridDirectionSet = new Set([
  'row',
  'row-reverse',
  'column',
  'column-reverse',
]);

const gridJustifySet = new Set([
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
]);

const gridAlignSet = new Set(['flex-start', 'center', 'flex-end', 'stretch']);

const Grid = ({
  className,
  strict,
  fill,
  nowrap,
  direction,
  justify,
  cjustify,
  align,
  onClick,
  forwardedRef,
  children,
}) => {
  const k = ['grid'];
  if (strict) {
    k.push('strict');
  }
  if (fill) {
    k.push('fill');
  }
  if (nowrap) {
    k.push('nowrap');
  }
  if (gridDirectionSet.has(direction)) {
    k.push('direction-' + direction);
  }
  if (gridJustifySet.has(justify)) {
    k.push('justify-' + justify);
  }
  if (gridJustifySet.has(cjustify)) {
    k.push('cjustify-' + cjustify);
  }
  if (gridAlignSet.has(align)) {
    k.push('align-' + align);
  }
  if (className) {
    k.push(className);
  }

  return (
    <div ref={forwardedRef} className={k.join(' ')} onClick={onClick}>
      {children}
    </div>
  );
};

const switchSize = (prefix, number) => {
  if (number < 1) {
    return prefix + '-1';
  } else if (number > 24) {
    return prefix + '-24';
  }
  return prefix + '-' + number;
};

const Column = ({
  className,
  xs,
  sm,
  md,
  lg,
  fullWidth,
  align,
  order,
  basis,
  grow,
  shrink,
  onClick,
  forwardedRef,
  children,
}) => {
  const k = ['col'];
  if (xs) {
    k.push(switchSize('xs', xs));
  }
  if (sm) {
    k.push(switchSize('sm', sm));
  }
  if (md) {
    k.push(switchSize('md', md));
  }
  if (lg) {
    k.push(switchSize('lg', lg));
  }
  if (fullWidth) {
    k.push('full-width');
  }
  if (gridAlignSet.has(align)) {
    k.push('align-' + align);
  }
  if (className) {
    k.push(className);
  }

  const j = {};
  if (order) {
    j.order = order;
  }
  if (basis) {
    j.flexBasis = basis;
  }
  if (grow) {
    j.flexGrow = grow;
  }
  if (shrink) {
    j.flexShrink = shrink;
  }

  return (
    <div ref={forwardedRef} className={k.join(' ')} style={j} onClick={onClick}>
      {children}
    </div>
  );
};

export {Grid as default, Grid, Column};
