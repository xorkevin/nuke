const Container = ({className, fill, padded, narrow, children}) => {
  const k = ['container'];
  if (fill) {
    k.push('fill');
  }
  if (padded) {
    k.push('padded');
  }
  if (narrow) {
    k.push('narrow');
  }
  if (className) {
    k.push(className);
  }

  return <div className={k.join(' ')}>{children}</div>;
};

export default Container;
