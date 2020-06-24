import React from 'react';

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
  column,
  nowrap,
  justify,
  cjustify,
  align,
  children,
}) => {
  const k = ['grid'];
  if (strict) {
    k.push('strict');
  }
  if (column) {
    k.push('column');
  }
  if (nowrap) {
    k.push('nowrap');
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

  return <div className={k.join(' ')}>{children}</div>;
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
  align,
  order,
  basis,
  grow,
  shrink,
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
  } else {
    j.flexGrow = '0';
  }
  if (shrink) {
    j.flexShrink = shrink;
  } else {
    j.flexShrink = '0';
  }

  return (
    <div className={k.join(' ')} style={j}>
      {children}
    </div>
  );
};

export {Grid as default, Grid, Column};
