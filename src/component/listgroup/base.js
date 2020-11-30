const ListItem = ({children}) => {
  return <div className="item">{children}</div>;
};

const listgroupSizeSet = new Set(['sm', 'md', 'lg']);

const ListGroup = ({className, size, padded, children}) => {
  const k = ['listgroup'];
  if (listgroupSizeSet.has(size)) {
    k.push(size);
  }
  if (padded) {
    k.push('padded');
  }
  if (className) {
    k.push(className);
  }
  return <div className={k.join(' ')}>{children}</div>;
};

export {ListGroup as default, ListGroup, ListItem};
